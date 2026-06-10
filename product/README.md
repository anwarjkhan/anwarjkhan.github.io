# JobPilot — autonomous job-search agent (SaaS)

Multi-tenant productisation of the personal `job-agent/`: users sign up,
capture their CV and preferences, subscribe, and get the full agent loop —
twice-daily scored job digests, one-click tailored application packs, and
automatic triage of application email. Web and mobile stay in sync because
both are thin clients over the same API and database.

> **Working name "JobPilot"** — rename before launch (check trademarks and
> domain availability).

## Architecture

```
apps/web     Next.js 15 (App Router, TS) — UI + API + agents. Deploy on Vercel.
apps/mobile  Expo (React Native) skeleton — same API via personal access token.
```

| Concern | Choice |
|---|---|
| Database | Postgres + Prisma (`apps/web/prisma/schema.prisma`) — Neon/Supabase/Vercel Postgres |
| Auth | Auth.js v5, Google sign-in (`src/lib/auth.ts`) |
| Billing | Stripe subscription with 7-day trial (`/api/stripe/checkout` + `/api/stripe/webhook`) |
| Agents | Anthropic API (`claude-opus-4-8`) with server-side web search/fetch tools (`src/lib/agents/`) |
| Scheduling | Vercel Cron (`vercel.json`) → `/api/cron/search` iterates active subscribers |
| Outbound email | Resend (`src/lib/email.ts`) — digests + triage alerts |
| Inbound email | Per-user alias `u-<slug>@<INBOUND_DOMAIN>` → provider webhook → `/api/inbound-email` |

### The email-access decision (important)

Reading a customer's full Gmail requires Google **restricted scopes**, which
means OAuth verification plus an annual CASA security assessment before you
can onboard the public — slow and expensive for an MVP. JobPilot v1 instead
gives every user a **dedicated application email alias**:

- They apply to jobs with the alias (or add a Gmail filter forwarding
  job-related mail to it).
- Everything arriving at the alias hits the inbound webhook, gets classified
  by the triage agent (rejection / interview invite / recruiter outreach /
  receipt / action required), is stored for the dashboard, and triggers an
  immediate alert email when action is needed.

Full Gmail/Outlook OAuth sync is the natural premium upgrade once verification
is done (see Roadmap).

## Local development

```bash
cd apps/web
cp .env.example .env.local   # fill in values
npm install
npx prisma db push           # create tables
npm run dev
```

Trigger a search manually:
`curl -H "Authorization: Bearer $CRON_SECRET" localhost:3000/api/cron/search`

Mobile: `cd apps/mobile && npm install && npx expo start`, then paste a token
from web Settings into the app's Settings tab.

## Deploy checklist

1. Create Postgres DB; set `DATABASE_URL`; run `npx prisma db push`.
2. Google OAuth client (web) → `AUTH_GOOGLE_ID/SECRET`; set `AUTH_SECRET`.
3. Stripe: product + monthly price → `STRIPE_PRICE_ID`; webhook endpoint
   `https://<app>/api/stripe/webhook` (subscription created/updated/deleted)
   → `STRIPE_WEBHOOK_SECRET`.
4. Resend: verify sending domain → `RESEND_API_KEY`, `EMAIL_FROM`.
5. Inbound email: Postmark inbound server (or Cloudflare Email Routing →
   Worker) pointing at `https://<app>/api/inbound-email` with
   `x-webhook-secret: $INBOUND_WEBHOOK_SECRET`; MX records on
   `INBOUND_DOMAIN`.
6. Vercel: import `apps/web` as the project root; set all env vars; crons in
   `vercel.json` activate on deploy. Cron + 800s function durations need the
   Pro plan.

## Unit economics (rough)

Each user costs roughly: 2 search runs/day (web search + ~30K-token Opus
calls) + occasional tailoring runs + lightweight triage calls. Expect low
single-digit £/user/month at Opus pricing — price the subscription well above
it (£15–30/mo is typical for this category). Levers: `MODEL_TRIAGE` /
`MODEL_SEARCH` env overrides (e.g. `claude-sonnet-4-6` is ~40% cheaper), cap
tailor runs per plan tier, batch search runs.

## Compliance before charging money

- **GDPR/UK-GDPR**: CVs and job-application email are personal data. You need
  a privacy policy, lawful basis, data deletion (account delete endpoint —
  not built yet), DPAs with Anthropic/Vercel/Stripe/Resend/DB host.
- **Email**: SPF/DKIM/DMARC on the sending domain; unsubscribe handling for
  digests.
- **Gmail OAuth (roadmap)**: restricted-scope verification + CASA audit.
- **Terms**: make clear the agent drafts materials and the user is
  responsible for accuracy of submitted applications.

## Roadmap (not yet built)

- Account deletion + data export (GDPR) — needed before launch
- Stripe customer portal for cancel/upgrade
- Per-user search schedules & timezones (currently two global UTC crons)
- Queue-based fan-out for the cron (Inngest/QStash) once users > ~20 per run,
  to escape serverless duration limits
- Push notifications to mobile (Expo Push) on digest + urgent triage
- Gmail/Outlook OAuth full-inbox sync (premium tier)
- Job status pipeline UI (applied → interview → offer) and analytics
- Proper design system (currently bare inline styles), marketing site, SEO
- Native auth in mobile (currently token paste), App Store/Play submission
