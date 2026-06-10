import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { triageEmail } from "@/lib/agents/triage";
import { sendTriageAlert } from "@/lib/email";

export const maxDuration = 120;

/**
 * Inbound email webhook (Postmark inbound format; adapt for your provider).
 * Each user has a unique alias u-<inboundSlug>@<INBOUND_DOMAIN>; mail sent to
 * it is triaged, stored, and alerted on when it needs attention.
 */
export async function POST(req: Request) {
  if (
    req.headers.get("x-webhook-secret") !== process.env.INBOUND_WEBHOOK_SECRET
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const payload = await req.json();
  const to: string = payload.OriginalRecipient ?? payload.ToFull?.[0]?.Email ?? "";
  const slug = to.split("@")[0]?.replace(/^u-/, "");
  const user = slug
    ? await prisma.user.findUnique({ where: { inboundSlug: slug } })
    : null;
  if (!user) {
    // Accept so the provider doesn't retry forever; nothing to do.
    return NextResponse.json({ ok: true, ignored: true });
  }

  const from: string = payload.From ?? "";
  const subject: string = payload.Subject ?? "";
  const body: string = payload.TextBody ?? payload.HtmlBody ?? "";

  const triage = await triageEmail({ from, subject, body });
  await prisma.emailEvent.create({
    data: {
      userId: user.id,
      fromAddr: from,
      subject,
      category: triage.category,
      company: triage.company,
      summary: triage.one_line_summary,
      nextStep: triage.suggested_next_step,
    },
  });

  if (["action_required", "interview_invite"].includes(triage.category)) {
    await sendTriageAlert({
      to: user.email,
      category: triage.category,
      company: triage.company,
      summary: triage.one_line_summary,
      nextStep: triage.suggested_next_step,
    });
  }
  return NextResponse.json({ ok: true, category: triage.category });
}
