"""Tailoring agent: given a job posting URL, produce a tailored CV, cover
letter, and Workday-ready cut-and-paste text, and email them back."""

import argparse
import html

import common

TAILOR_SCHEMA = {
    "type": "object",
    "properties": {
        "job_title": {"type": "string"},
        "company": {"type": "string"},
        "fit_assessment": {"type": "string"},
        "tailored_cv_markdown": {"type": "string"},
        "cover_letter": {"type": "string"},
        "workday": {
            "type": "object",
            "properties": {
                "professional_summary": {"type": "string"},
                "work_experience_entries": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "job_title": {"type": "string"},
                            "company": {"type": "string"},
                            "from_to": {"type": "string"},
                            "role_description": {"type": "string"},
                        },
                        "required": ["job_title", "company", "from_to",
                                     "role_description"],
                        "additionalProperties": False,
                    },
                },
                "skills_list": {"type": "array", "items": {"type": "string"}},
                "why_this_company": {"type": "string"},
                "screening_answer_tips": {"type": "string"},
            },
            "required": ["professional_summary", "work_experience_entries",
                         "skills_list", "why_this_company",
                         "screening_answer_tips"],
            "additionalProperties": False,
        },
    },
    "required": ["job_title", "company", "fit_assessment",
                 "tailored_cv_markdown", "cover_letter", "workday"],
    "additionalProperties": False,
}

SYSTEM = """You are an expert CV writer and career coach for senior
financial-services delivery and product leaders. Given a job posting URL and
the candidate's master CV, produce application materials precisely aligned to
the job specification.

Rules:
- Fetch the job posting first and base everything on its actual wording.
  If the URL is dead, search for the same posting elsewhere before giving up.
- Never invent experience, employers, dates, or qualifications. Reframe and
  re-prioritise only what is in the master CV.
- Mirror the job spec's key terminology (important for ATS keyword matching)
  wherever the CV genuinely supports it.
- tailored_cv_markdown: the full CV, reordered and reworded for this role,
  achievement-led, ready to export.
- cover_letter: ~300 words, specific to the company and role, no clichés.
- workday: plain text only, no markdown syntax — these blocks get pasted into
  Workday/ATS form fields verbatim. role_description fields should be 3-5
  achievement bullets separated by newlines, each starting with "- ".
- fit_assessment: 2-3 honest sentences on fit, including any gaps and how to
  address them."""


def tailor(client, profile: dict, cv: str, job_url: str, notes: str = "") -> dict:
    prompt = f"""Job posting URL: {job_url}

Candidate notes for this application: {notes or '(none)'}

## Master CV
{cv}

Fetch the posting, then produce the tailored application materials as JSON."""

    response = common.run_with_tools(
        client,
        model=profile.get("models", {}).get("tailor", "claude-opus-4-8"),
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
        tools=[
            {"type": "web_fetch_20260209", "name": "web_fetch"},
            {"type": "web_search_20260209", "name": "web_search"},
        ],
        output_schema=TAILOR_SCHEMA,
        max_tokens=64000,
    )
    if response.stop_reason == "refusal":
        raise RuntimeError("Model refused the tailoring request.")
    return common.response_json(response)


def workday_text(result: dict) -> str:
    w = result["workday"]
    lines = [
        "WORKDAY / ATS CUT-AND-PASTE PACK",
        f"{result['job_title']} — {result['company']}",
        "=" * 60,
        "",
        ">>> PROFESSIONAL SUMMARY",
        w["professional_summary"],
        "",
        ">>> WORK EXPERIENCE ENTRIES",
    ]
    for entry in w["work_experience_entries"]:
        lines += ["", f"Job title : {entry['job_title']}",
                  f"Company   : {entry['company']}",
                  f"Dates     : {entry['from_to']}",
                  "Description:", entry["role_description"]]
    lines += ["", ">>> SKILLS (add individually)",
              "\n".join(w["skills_list"]),
              "", ">>> WHY THIS COMPANY", w["why_this_company"],
              "", ">>> SCREENING QUESTION TIPS", w["screening_answer_tips"]]
    return "\n".join(lines)


def send_pack(profile: dict, result: dict, job_url: str) -> None:
    e = html.escape
    wd = workday_text(result)
    html_body = f"""<html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:680px;margin:auto;color:#111;">
  <h2>Application pack: {e(result['job_title'])} — {e(result['company'])}</h2>
  <p><a href="{e(job_url)}">View the job posting →</a></p>
  <h3>Fit assessment</h3><p>{e(result['fit_assessment'])}</p>
  <h3>Cover letter</h3>
  <pre style="white-space:pre-wrap;background:#f6f6f6;padding:14px;border-radius:8px;">{e(result['cover_letter'])}</pre>
  <h3>Workday-ready text</h3>
  <pre style="white-space:pre-wrap;background:#f6f6f6;padding:14px;border-radius:8px;">{e(wd)}</pre>
  <p>The tailored CV (markdown) and all of the above are attached as files.</p>
</body></html>"""

    safe = "".join(c if c.isalnum() else "_" for c in result["company"])[:30]
    common.send_email(
        f"📄 Application pack: {result['job_title']} — {result['company']}",
        html_body,
        text_body=wd,
        attachments=[
            (f"CV_{safe}.md", result["tailored_cv_markdown"]),
            (f"cover_letter_{safe}.txt", result["cover_letter"]),
            (f"workday_{safe}.txt", wd),
        ],
        to_addr=profile["email"],
    )


def run_tailor(job_url: str, notes: str = "") -> None:
    profile = common.load_profile()
    cv = common.load_cv()
    client = common.get_client()
    result = tailor(client, profile, cv, job_url, notes)
    send_pack(profile, result, job_url)


if __name__ == "__main__":
    parser = argparse.ArgumentParser()
    parser.add_argument("job_url")
    parser.add_argument("--notes", default="")
    args = parser.parse_args()
    run_tailor(args.job_url, args.notes)
