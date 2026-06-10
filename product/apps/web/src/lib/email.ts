import { Resend } from "resend";
import type { FoundJob } from "./agents/types";

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM = process.env.EMAIL_FROM ?? "JobPilot <digest@jobpilot.app>";
const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

export async function sendDigestEmail(args: {
  to: string;
  jobs: (FoundJob & { id: string })[];
  marketNotes: string;
}) {
  const { to, jobs, marketNotes } = args;
  const cards = jobs
    .map(
      (job, i) => `
  <div style="border:1px solid #e2e2e2;border-radius:10px;padding:16px;margin:14px 0;">
    <div style="font-size:16px;font-weight:700;">
      ${i + 1}. <a href="${esc(job.url)}" style="color:#1a56db;">${esc(job.title)}</a>
      <span style="float:right;background:${job.match_score >= 80 ? "#16a34a" : "#ca8a04"};color:#fff;border-radius:999px;padding:2px 10px;font-size:13px;">${job.match_score}% match</span>
    </div>
    <div style="color:#444;margin:4px 0;">${esc(job.company)} · ${esc(job.location)} · ${esc(job.salary)} · ${esc(job.posted)} · via ${esc(job.source)}</div>
    <div style="margin:8px 0;">${esc(job.summary)}</div>
    <ul style="margin:6px 0 10px 18px;color:#333;">${job.match_reasons.map((r) => `<li>${esc(r)}</li>`).join("")}</ul>
    <a href="${esc(job.url)}" style="margin-right:14px;">View posting →</a>
    <a href="${APP_URL}/dashboard?tailor=${job.id}" style="font-weight:600;">✨ Tailor my application →</a>
  </div>`,
    )
    .join("");

  await resend.emails.send({
    from: FROM,
    to,
    subject: `🎯 ${jobs.length} new job match(es)${jobs[0] ? ` — top: ${jobs[0].title} @ ${jobs[0].company}` : ""}`,
    html: `<html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:680px;margin:auto;color:#111;">
  <h2 style="margin-bottom:4px;">Your job digest</h2>
  <p style="color:#555;margin-top:0;">${jobs.length} new match(es). Click <b>Tailor my application</b> to get a tailored CV, cover letter and ATS-ready text in the app.</p>
  ${cards || "<p>No new matches this run.</p>"}
  <p style="color:#666;font-size:13px;border-top:1px solid #eee;padding-top:10px;"><b>Market notes:</b> ${esc(marketNotes)}</p>
</body></html>`,
  });
}

export async function sendTriageAlert(args: {
  to: string;
  category: string;
  company: string;
  summary: string;
  nextStep: string;
}) {
  await resend.emails.send({
    from: FROM,
    to: args.to,
    subject: `📬 ${args.category.replace(/_/g, " ")}: ${args.company}`,
    html: `<html><body style="font-family:-apple-system,Segoe UI,Arial,sans-serif;max-width:680px;margin:auto;color:#111;">
  <h2>${esc(args.company)} — ${esc(args.category.replace(/_/g, " "))}</h2>
  <p>${esc(args.summary)}</p>
  <p><b>Suggested next step:</b> ${esc(args.nextStep)}</p>
  <p><a href="${APP_URL}/dashboard">Open JobPilot →</a></p>
</body></html>`,
  });
}
