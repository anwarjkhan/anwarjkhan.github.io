"""Job search agent: find new postings with web search, score against the CV,
and email a digest with one-click tailoring links."""

import datetime
import hashlib
import html
import urllib.parse
import yaml

import common

JOBS_SCHEMA = {
    "type": "object",
    "properties": {
        "jobs": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "title": {"type": "string"},
                    "company": {"type": "string"},
                    "location": {"type": "string"},
                    "salary": {"type": "string"},
                    "url": {"type": "string"},
                    "source": {"type": "string"},
                    "posted": {"type": "string"},
                    "summary": {"type": "string"},
                    "match_score": {"type": "integer"},
                    "match_reasons": {"type": "array", "items": {"type": "string"}},
                },
                "required": ["title", "company", "location", "salary", "url",
                             "source", "posted", "summary", "match_score",
                             "match_reasons"],
                "additionalProperties": False,
            },
        },
        "market_notes": {"type": "string"},
    },
    "required": ["jobs", "market_notes"],
    "additionalProperties": False,
}

SYSTEM = """You are an expert job-search agent working for one candidate.
You search the live web for job postings that match the candidate's profile
and CV, then return a structured shortlist.

Rules:
- Search multiple sources: LinkedIn, Indeed, eFinancialCareers, company career
  pages, Otta/Welcome to the Jungle, CWJobs. Run several distinct searches.
- Only include postings that appear to be live and recent (last ~14 days).
- The url field MUST be the direct link to the specific posting, never a
  search-results page. Keep URL query parameters intact.
- Score match_score 0-100 against the CV and preferences: seniority fit,
  domain fit, location, salary vs the stated floor. Be honest, not generous.
- match_reasons: 2-4 short bullets explaining the score, referencing the CV.
- salary: as advertised; "Not stated" if absent.
- Exclude obvious duplicates and anything in the provided already-seen list.
- market_notes: 2-3 sentences on what you observed in the market today."""


def job_key(job: dict) -> str:
    basis = (job.get("company", "") + "|" + job.get("title", "")).lower().strip()
    return hashlib.sha256(basis.encode()).hexdigest()[:16]


def find_jobs(client, profile: dict, cv: str, seen: dict) -> dict:
    seen_list = "\n".join(
        f"- {v['title']} at {v['company']}" for v in list(seen.values())[-150:]
    ) or "(none yet)"
    prompt = f"""Find current job postings for this candidate.

## Preferences
{yaml.safe_dump({k: profile[k] for k in ('target_titles', 'target_industries', 'location', 'compensation', 'job_types') if k in profile}, sort_keys=False)}
## Additional guidance
{profile.get('search_notes', '')}

## CV
{cv}

## Already seen — do NOT include these again
{seen_list}

Today is {datetime.date.today().isoformat()}. Search now and return the
shortlist as JSON."""

    response = common.run_with_tools(
        client,
        model=profile.get("models", {}).get("search", "claude-opus-4-8"),
        system=SYSTEM,
        messages=[{"role": "user", "content": prompt}],
        tools=[
            {"type": "web_search_20260209", "name": "web_search"},
            {"type": "web_fetch_20260209", "name": "web_fetch"},
        ],
        output_schema=JOBS_SCHEMA,
        max_tokens=32000,
    )
    if response.stop_reason == "refusal":
        raise RuntimeError("Model refused the search request.")
    return common.response_json(response)


def tailor_mailto(owner_email: str, job: dict) -> str:
    subject = f"TAILOR: {job['title']} at {job['company']}"
    body = (f"Job URL: {job['url']}\n\n"
            "Send this email and the agent will reply with a tailored CV, "
            "cover letter and Workday-ready text.\n"
            "Optionally add notes for the agent below this line.\n---\n")
    return ("mailto:" + urllib.parse.quote(owner_email)
            + "?subject=" + urllib.parse.quote(subject)
            + "&body=" + urllib.parse.quote(body))


def render_digest(profile: dict, jobs: list[dict], market_notes: str) -> tuple[str, str]:
    e = html.escape
    owner = profile["email"]
    cards = []
    for i, job in enumerate(jobs, 1):
        reasons = "".join(f"<li>{e(r)}</li>" for r in job["match_reasons"])
        cards.append(f"""
  <div style="border:1px solid #e2e2e2;border-radius:10px;padding:16px;margin:14px 0;">
    <div style="font-size:16px;font-weight:700;">
      {i}. <a href="{e(job['url'])}" style="color:#1a56db;">{e(job['title'])}</a>
      <span style="float:right;background:{'#16a34a' if job['match_score'] >= 80 else '#ca8a04'};color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;">{job['match_score']}% match</span>
    </div>
    <div style="color:#444;margin:4px 0;">{e(job['company'])} · {e(job['location'])} · {e(job['salary'])} · {e(job['posted'])} · via {e(job['source'])}</div>
    <div style="margin:8px 0;">{e(job['summary'])}</div>
    <ul style="margin:6px 0 10px 18px;color:#333;">{reasons}</ul>
    <a href="{e(job['url'])}" style="margin-right:14px;">View posting →</a>
    <a href="{tailor_mailto(owner, job)}" style="font-weight:600;">✉️ Tailor my application →</a>
  </div>""")

    html_body = f"""<html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:680px;margin:auto;color:#111;">
  <h2 style="margin-bottom:4px;">Job digest — {datetime.date.today().strftime('%A %d %B %Y')}</h2>
  <p style="color:#555;margin-top:0;">{len(jobs)} new match{'es' if len(jobs) != 1 else ''} for you.
  Click <b>Tailor my application</b> on any job and send the pre-filled email —
  the agent will reply with a tailored CV, cover letter and Workday-ready text.</p>
  {''.join(cards) or '<p>No new matches this run.</p>'}
  <p style="color:#666;font-size:13px;border-top:1px solid #eee;padding-top:10px;"><b>Market notes:</b> {e(market_notes)}</p>
</body></html>"""

    text_body = "\n\n".join(
        f"{i}. {j['title']} at {j['company']} ({j['location']}, {j['salary']}) "
        f"[{j['match_score']}%]\n{j['url']}"
        for i, j in enumerate(jobs, 1)
    ) or "No new matches this run."
    return html_body, text_body


def main():
    profile = common.load_profile()
    cv = common.load_cv()
    client = common.get_client()
    seen = common.load_state("seen_jobs", {})

    result = find_jobs(client, profile, cv, seen)
    min_score = profile.get("min_match_score", 60)
    fresh = []
    for job in result.get("jobs", []):
        key = job_key(job)
        if key in seen or job["match_score"] < min_score:
            continue
        seen[key] = {"title": job["title"], "company": job["company"],
                     "url": job["url"],
                     "first_seen": datetime.date.today().isoformat()}
        fresh.append(job)

    fresh.sort(key=lambda j: j["match_score"], reverse=True)
    fresh = fresh[: profile.get("max_jobs_per_digest", 10)]
    print(f"Found {len(fresh)} new job(s) above threshold.")

    if fresh or profile.get("email_when_empty", False):
        html_body, text_body = render_digest(profile, fresh,
                                             result.get("market_notes", ""))
        top = f" — top: {fresh[0]['title']} @ {fresh[0]['company']}" if fresh else ""
        send_subject = f"🎯 {len(fresh)} new job match(es){top}"
        common.send_email(send_subject, html_body, text_body,
                          to_addr=profile["email"])
    common.save_state("seen_jobs", seen)


if __name__ == "__main__":
    main()
