"""Shared plumbing for the job agents: config, state, Claude client, email."""

import json
import os
import smtplib
from email.message import EmailMessage
from email.utils import formataddr
from pathlib import Path

import anthropic
import yaml

ROOT = Path(__file__).resolve().parent.parent
CONFIG_DIR = ROOT / "config"
DATA_DIR = ROOT / "data"


def load_profile() -> dict:
    """Profile from config/profile.yaml, overridable via PROFILE_YAML secret."""
    raw = os.environ.get("PROFILE_YAML")
    if raw:
        return yaml.safe_load(raw)
    return yaml.safe_load((CONFIG_DIR / "profile.yaml").read_text())


def load_cv() -> str:
    """CV markdown from config/cv.md, overridable via CV_MARKDOWN secret."""
    return os.environ.get("CV_MARKDOWN") or (CONFIG_DIR / "cv.md").read_text()


def load_state(name: str, default=None):
    path = DATA_DIR / f"{name}.json"
    if path.exists():
        return json.loads(path.read_text())
    return default if default is not None else {}


def save_state(name: str, data) -> None:
    DATA_DIR.mkdir(parents=True, exist_ok=True)
    (DATA_DIR / f"{name}.json").write_text(json.dumps(data, indent=2, sort_keys=True))


def get_client() -> anthropic.Anthropic:
    return anthropic.Anthropic()  # reads ANTHROPIC_API_KEY


def run_with_tools(client, *, model: str, system: str, messages: list,
                   tools: list, output_schema: dict | None = None,
                   max_tokens: int = 16000, max_continuations: int = 8):
    """Stream a request with server-side tools, resuming across pause_turn.

    Returns the final Message (stop_reason end_turn / refusal / max_tokens).
    """
    params = {
        "model": model,
        "max_tokens": max_tokens,
        "system": system,
        "thinking": {"type": "adaptive"},
        "tools": tools,
    }
    if output_schema:
        params["output_config"] = {
            "format": {"type": "json_schema", "schema": output_schema}
        }

    messages = list(messages)
    for _ in range(max_continuations):
        with client.messages.stream(messages=messages, **params) as stream:
            response = stream.get_final_message()
        if response.stop_reason != "pause_turn":
            return response
        # Server-side tool loop hit its iteration limit — resume.
        messages = messages + [{"role": "assistant", "content": response.content}]
    return response


def response_text(response) -> str:
    return "".join(b.text for b in response.content if b.type == "text")


def response_json(response):
    return json.loads(response_text(response))


def smtp_settings() -> dict:
    return {
        "host": os.environ.get("SMTP_HOST", "smtp.gmail.com"),
        "port": int(os.environ.get("SMTP_PORT", "465")),
        "user": os.environ["GMAIL_ADDRESS"],
        "password": os.environ["GMAIL_APP_PASSWORD"],
    }


def send_email(subject: str, html_body: str, text_body: str = "",
               attachments: list[tuple[str, str]] | None = None,
               to_addr: str | None = None) -> None:
    """Send an HTML email (with plain-text alternative) to the owner.

    attachments: list of (filename, text_content) pairs.
    """
    smtp = smtp_settings()
    to_addr = to_addr or smtp["user"]

    msg = EmailMessage()
    msg["Subject"] = subject
    msg["From"] = formataddr(("Job Agent", smtp["user"]))
    msg["To"] = to_addr
    msg.set_content(text_body or "This email is best viewed in HTML.")
    msg.add_alternative(html_body, subtype="html")
    for filename, content in attachments or []:
        msg.add_attachment(content.encode("utf-8"),
                           maintype="text", subtype="plain", filename=filename)

    with smtplib.SMTP_SSL(smtp["host"], smtp["port"]) as server:
        server.login(smtp["user"], smtp["password"])
        server.send_message(msg)
    print(f"Sent email: {subject!r} -> {to_addr}")
