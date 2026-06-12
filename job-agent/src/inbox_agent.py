"""Inbox agent: triage new Gmail messages into job-search categories, apply
labels, surface anything urgent, and execute TAILOR requests."""

import email
import email.header
import html
import imaplib
import os
import re

import common
import tailor

TRIAGE_SCHEMA = {
    "type": "object",
    "properties": {
        "messages": {
            "type": "array",
            "items": {
                "type": "object",
                "properties": {
                    "uid": {"type": "string"},
                    "category": {
                        "type": "string",
                        "enum": ["rejection", "interview_invite",
                                 "recruiter_outreach", "application_receipt",
                                 "action_required", "other_job_related",
                                 "not_job_related"],
                    },
                    "company": {"type": "string"},
                    "one_line_summary": {"type": "string"},
                    "suggested_next_step": {"type": "string"},
                },
                "required": ["uid", "category", "company", "one_line_summary",
                             "suggested_next_step"],
                "additionalProperties": False,
            },
        }
    },
    "required": ["messages"],
    "additionalProperties": False,
}

SYSTEM = """You triage a job-seeker's inbox. For each message decide the
category:
- rejection: an application was declined
- interview_invite: invitation to interview, assessment, or a recruiter call
  with a concrete proposed time
- recruiter_outreach: recruiter or hiring manager reaching out about a role
- application_receipt: automated "we received your application" confirmations
- action_required: anything needing a reply or action (offer, references,
  document requests, scheduling links awaiting a choice)
- other_job_related: job alerts, newsletters, job-board digests
- not_job_related: everything else

Be precise: an interview invite that needs the candidate to pick a slot is
action_required AND an invite — prefer action_required in that case.
company: best guess at the employer/agency, or "Unknown".
suggested_next_step: one short imperative sentence ("Reply with availability",
"No action needed")."""


def decode(value: str) -> str:
    parts = email.header.decode_header(value or "")
    return "".join(p.decode(enc or "utf-8", "replace") if isinstance(p, bytes)
                   else p for p, enc in parts)


def body_text(msg, limit: int = 3000) -> str:
    for part in msg.walk():
        if part.get_content_type() == "text/plain":
            payload = part.get_payload(decode=True)
            if payload:
                charset = part.get_content_charset() or "utf-8"
                return payload.decode(charset, "replace")[:limit]
    for part in msg.walk():
        if part.get_content_type() == "text/html":
            payload = part.get_payload(decode=True)
            if payload:
                charset = part.get_content_charset() or "utf-8"
                text = re.sub(r"<[^>]+>", " ", payload.decode(charset, "replace"))
                return re.sub(r"\s+", " ", text)[:limit]
    return ""


MAX_MESSAGES_PER_RUN = 50


def latest_uid(imap) -> int:
    imap.select("INBOX")
    status, data = imap.uid("search", None, "ALL")
    uids = data[0].split() if status == "OK" and data[0] else []
    return int(uids[-1]) if uids else 0


def fetch_new_messages(imap, last_uid: int) -> list[dict]:
    imap.select("INBOX")
    status, data = imap.uid("search", None, f"UID {last_uid + 1}:*")
    if status != "OK" or not data[0]:
        return []
    messages = []
    for uid in data[0].split()[-MAX_MESSAGES_PER_RUN:]:
        uid_int = int(uid)
        if uid_int <= last_uid:  # Gmail returns the last UID even when none are new
            continue
        status, msg_data = imap.uid("fetch", uid, "(BODY.PEEK[])")
        if status != "OK" or not msg_data or msg_data[0] is None:
            continue
        msg = email.message_from_bytes(msg_data[0][1])
        messages.append({
            "uid": str(uid_int),
            "from": decode(msg.get("From", "")),
            "subject": decode(msg.get("Subject", "")),
            "date": msg.get("Date", ""),
            "body": body_text(msg),
        })
    return messages


def ensure_label(imap, label: str) -> None:
    imap.create(f'"{label}"')  # no-op error if it already exists


def apply_label(imap, uid: str, label: str) -> None:
    ensure_label(imap, label)
    imap.uid("copy", uid.encode(), f'"{label}"')


def handle_tailor_requests(messages: list[dict], owner_email: str) -> list[dict]:
    """Run tailoring for self-sent TAILOR emails; return the remaining messages."""
    remaining = []
    for m in messages:
        is_tailor = m["subject"].upper().startswith("TAILOR") and \
            owner_email.lower() in m["from"].lower()
        if not is_tailor:
            remaining.append(m)
            continue
        url_match = re.search(r"https?://\S+", m["body"])
        if not url_match:
            print(f"TAILOR request {m['uid']} has no URL — skipping.")
            continue
        notes = m["body"].split("---", 1)[1].strip() if "---" in m["body"] else ""
        print(f"Tailoring for {url_match.group(0)}")
        try:
            tailor.run_tailor(url_match.group(0), notes)
        except Exception as exc:  # keep triaging even if one pack fails
            print(f"Tailoring failed for {m['uid']}: {exc}")
    return remaining


def triage(client, profile: dict, messages: list[dict]) -> list[dict]:
    listing = "\n\n".join(
        f"[uid {m['uid']}]\nFrom: {m['from']}\nSubject: {m['subject']}\n"
        f"Date: {m['date']}\nBody: {m['body']}"
        for m in messages
    )
    response = client.messages.stream(
        model=profile.get("models", {}).get("triage", "claude-opus-4-8"),
        max_tokens=16000,
        system=SYSTEM,
        thinking={"type": "adaptive"},
        output_config={"format": {"type": "json_schema", "schema": TRIAGE_SCHEMA}},
        messages=[{"role": "user", "content":
                   f"Triage these {len(messages)} messages:\n\n{listing}"}],
    )
    with response as stream:
        final = stream.get_final_message()
    return common.response_json(final)["messages"]


def alert_email(profile: dict, urgent: list[dict], all_triaged: list[dict]) -> None:
    e = html.escape
    rows = "".join(
        f"<tr><td style='padding:6px;border-bottom:1px solid #eee;'>{e(t['company'])}</td>"
        f"<td style='padding:6px;border-bottom:1px solid #eee;'>{e(t['category'].replace('_', ' '))}</td>"
        f"<td style='padding:6px;border-bottom:1px solid #eee;'>{e(t['one_line_summary'])}<br>"
        f"<b>→ {e(t['suggested_next_step'])}</b></td></tr>"
        for t in all_triaged if t["category"] != "not_job_related"
    )
    html_body = f"""<html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:680px;margin:auto;color:#111;">
  <h2>📬 Inbox triage: {len(urgent)} item(s) need your attention</h2>
  <table style="border-collapse:collapse;width:100%;font-size:14px;">
    <tr><th align="left" style="padding:6px;">Company</th><th align="left" style="padding:6px;">Category</th><th align="left" style="padding:6px;">Summary</th></tr>
    {rows}
  </table>
  <p style="color:#666;font-size:13px;">Labels have been applied in Gmail under <b>Job Agent/…</b>.</p>
</body></html>"""
    text_body = "\n".join(
        f"- [{t['category']}] {t['company']}: {t['one_line_summary']} "
        f"(next: {t['suggested_next_step']})"
        for t in all_triaged if t["category"] != "not_job_related")
    common.send_email(f"📬 {len(urgent)} job item(s) need attention",
                      html_body, text_body, to_addr=profile["email"])


def main():
    profile = common.load_profile()
    client = common.get_client()
    state = common.load_state("inbox_state", {"last_uid": 0})
    smtp_user = os.environ["GMAIL_ADDRESS"]

    imap = imaplib.IMAP4_SSL(os.environ.get("IMAP_HOST", "imap.gmail.com"))
    imap.login(smtp_user, os.environ["GMAIL_APP_PASSWORD"])
    try:
        if state["last_uid"] == 0:
            # First run: don't triage history, just set the cursor to "now".
            state["last_uid"] = latest_uid(imap)
            common.save_state("inbox_state", state)
            print(f"Initialized inbox cursor at UID {state['last_uid']}.")
            return

        messages = fetch_new_messages(imap, state["last_uid"])
        print(f"{len(messages)} new message(s) since UID {state['last_uid']}.")
        if not messages:
            return

        max_uid = max(int(m["uid"]) for m in messages)
        messages = handle_tailor_requests(messages, profile["email"])

        if messages:
            triaged = triage(client, profile, messages)
            labels = profile.get("labels", {})
            for t in triaged:
                label = labels.get(t["category"])
                if label:
                    apply_label(imap, t["uid"], label)
                print(f"uid {t['uid']}: {t['category']} — {t['one_line_summary']}")

            urgent = [t for t in triaged
                      if t["category"] in ("action_required", "interview_invite")]
            if urgent:
                alert_email(profile, urgent, triaged)

        state["last_uid"] = max_uid
        common.save_state("inbox_state", state)
    finally:
        imap.logout()


if __name__ == "__main__":
    main()
