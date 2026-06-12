# Autonomous Job Search Agent

Three Claude-powered agents that run on GitHub Actions cron:

| Agent | Trigger | What it does |
|---|---|---|
| **Job search** (`src/job_search.py`) | ~05:30 & ~12:00 London time, daily | Searches the live web (LinkedIn, Indeed, eFinancialCareers, company sites…) for new postings matching `config/profile.yaml`, scores each against `config/cv.md`, dedupes against `data/seen_jobs.json`, and emails you an HTML digest. |
| **Tailoring** (`src/tailor.py`) | One click from the digest, or manual workflow run | Fetches the job spec and emails back a tailored CV (markdown), a cover letter, and Workday/ATS-ready cut-and-paste plain text. |
| **Inbox triage** (`src/inbox_agent.py`) | Every 2 hours (06:00–20:00 UTC) | Reads new Gmail messages via IMAP, classifies them (rejection / interview invite / recruiter outreach / receipt / action required), applies **Job Agent/…** labels in Gmail, and emails you only when something needs attention. Also picks up your tailoring requests. |

## How the one-click tailoring works

Each job card in the digest has a **"✉️ Tailor my application"** link. It opens a
pre-filled email **to yourself** with subject `TAILOR: <job>` and the job URL in
the body. Send it; within 2 hours the inbox agent sees it, runs the tailoring
agent, and replies with the full application pack. Add notes for the agent
below the `---` line in that email (e.g. "emphasise the BCBS-239 work").

Want it instantly instead? Run the **"Tailor application (manual)"** workflow
from the Actions tab with the job URL.

## Setup (one-time, ~10 minutes)

1. **Gmail app password** — needs 2-step verification enabled on the Google
   account, then create an app password at
   <https://myaccount.google.com/apppasswords>. Also make sure IMAP is enabled
   (Gmail → Settings → Forwarding and POP/IMAP).

2. **Repository secrets** — in GitHub: *Settings → Secrets and variables →
   Actions → New repository secret*:

   | Secret | Value |
   |---|---|
   | `ANTHROPIC_API_KEY` | From <https://platform.claude.com> |
   | `GMAIL_ADDRESS` | Your Gmail address |
   | `GMAIL_APP_PASSWORD` | The 16-character app password |
   | `PROFILE_YAML` | Your real profile — full YAML matching the structure of `config/profile.yaml` |
   | `CV_MARKDOWN` | Your full CV in markdown |

3. **Config via secrets** — because this repo is public, the committed
   `config/profile.yaml` and `config/cv.md` are sanitised placeholders. The
   real content lives in the `PROFILE_YAML` and `CV_MARKDOWN` secrets, which
   override the files whenever they are set (multi-line secret values are
   fine). The richer the CV, the better the scoring and tailoring. To change
   your preferences later, edit the `PROFILE_YAML` secret — not the file.

4. **Merge to `main`** — GitHub only runs `schedule:` workflows from the
   default branch. Until merged you can still test everything via
   *Actions → run workflow* on this branch.

5. **Smoke test** — Actions tab → *Job search digest* → *Run workflow*. You
   should get a digest email within a few minutes. Then run *Inbox triage
   agent* once to initialise its UID cursor.

## ⚠️ Privacy note

`anwarjkhan.github.io` is a **public** repository. That's why the committed
config files are placeholders and the real profile/CV live in the
`PROFILE_YAML` / `CV_MARKDOWN` secrets (already wired into all three
workflows). Don't commit personal details into `config/` — anything in this
repo is public.

Also note: the inbox agent trusts `TAILOR:` emails whose From address matches
your own. From headers can be spoofed, so the worst case is someone burning a
few API tokens to send *you* a CV pack — but be aware of it.

## State & costs

- `data/seen_jobs.json` and `data/inbox_state.json` are committed back to the
  repo by the workflows so jobs are never repeated across runs.
- Everything defaults to `claude-opus-4-8`. Rough order of magnitude: a few
  pence per inbox-triage run, tens of pence per search/tailor run. To cut
  costs, set `models.triage: claude-sonnet-4-6` in `profile.yaml`.
- Cron times are UTC; the schedule drifts an hour with UK daylight saving.
  Adjust the cron lines in `.github/workflows/*.yml` if you care.
