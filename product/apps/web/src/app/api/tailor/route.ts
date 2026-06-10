import { NextResponse } from "next/server";
import { currentUser, userFromBearer, hasActiveSubscription } from "@/lib/auth";
import { runTailorForUser } from "@/lib/services";

export const maxDuration = 600;

/** POST { jobId?, jobUrl?, notes? } — works for web (session) and mobile (bearer). */
export async function POST(req: Request) {
  const user = (await currentUser()) ?? (await userFromBearer(req));
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  if (!hasActiveSubscription(user)) {
    return NextResponse.json({ error: "Subscription required" }, { status: 402 });
  }

  const body = await req.json();
  try {
    const pack = await runTailorForUser(user, {
      jobId: body.jobId,
      jobUrl: body.jobUrl,
      notes: body.notes,
    });
    return NextResponse.json({ packId: pack.id });
  } catch (err) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Tailoring failed" },
      { status: 400 },
    );
  }
}
