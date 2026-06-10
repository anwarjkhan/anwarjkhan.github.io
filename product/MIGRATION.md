# Moving JobPilot to a private repo + Vercel (≈5 minutes)

Two things can't be done by the agent from inside a Claude session — the
session's GitHub token can't create repositories, and the sandbox has no
Vercel credentials — so these steps are yours. Everything else is scripted.

## 1. Create the private repo (1 min)

<https://github.com/new> → name `jobpilot` → **Private** → no README →
Create.

## 2. Push the code (1 min, from any machine with git)

```bash
git clone https://github.com/anwarjkhan/anwarjkhan.github.io.git
cd anwarjkhan.github.io
git checkout claude/autonomous-job-search-agent-y37up8
./product/scripts/export-standalone.sh git@github.com:anwarjkhan/jobpilot.git
```

The script flattens the monorepo (web app at the repo root — exactly what
Vercel expects — with the Expo app in `mobile/`) and pushes it as the
initial commit. After this, delete `product/` from this repo so the public
site repo no longer carries the product code.

## 3. See it in Vercel (2 min)

1. <https://vercel.com/new> → **Import Git Repository** → `anwarjkhan/jobpilot`.
2. Framework is auto-detected (Next.js, repo root). No settings to change.
3. Add environment variables (minimum to get a working deploy + sign-in):
   `DATABASE_URL`, `ANTHROPIC_API_KEY`, `AUTH_SECRET`, `AUTH_GOOGLE_ID`,
   `AUTH_GOOGLE_SECRET`, `APP_URL`, `CRON_SECRET`, `RESEND_API_KEY` —
   full list with notes in `.env.example`. (Stripe/inbound-email vars can be
   added later; the app builds and runs without them.)
4. Deploy. The twice-daily search crons in `vercel.json` activate
   automatically (cron + long function durations need the Pro plan).

A free Postgres in 30 seconds: Vercel → Storage → Postgres (or neon.tech),
then run `npx prisma db push` locally with that `DATABASE_URL` to create the
tables.

## 4. Reconnect Claude (optional but recommended)

Add `anwarjkhan/jobpilot` to your Claude Code environment's repository list
so future sessions can develop, fix CI, and manage deployments there
directly. With the Vercel git integration in place, every push deploys —
which means Claude sessions can ship to staging by pushing a branch.
