import { NextResponse } from "next/server";
import { currentUser, userFromBearer } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { PreferencesSchema } from "@/lib/agents/types";

/** POST { cvMarkdown, preferences } — create or update the user's profile. */
export async function POST(req: Request) {
  const user = (await currentUser()) ?? (await userFromBearer(req));
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = PreferencesSchema.safeParse(body.preferences);
  if (!parsed.success || typeof body.cvMarkdown !== "string" || !body.cvMarkdown.trim()) {
    return NextResponse.json(
      { error: "Invalid profile", details: parsed.success ? undefined : parsed.error.flatten() },
      { status: 400 },
    );
  }

  await prisma.profile.upsert({
    where: { userId: user.id },
    create: {
      userId: user.id,
      cvMarkdown: body.cvMarkdown,
      preferences: parsed.data,
    },
    update: { cvMarkdown: body.cvMarkdown, preferences: parsed.data },
  });
  return NextResponse.json({ ok: true });
}
