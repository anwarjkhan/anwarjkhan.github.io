import { NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { runSearchForUser } from "@/lib/services";

export const maxDuration = 800; // requires Vercel Pro; lower on Hobby

export async function GET(req: Request) {
  if (
    req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`
  ) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const users = await prisma.user.findMany({
    where: {
      subscriptionStatus: { in: ["active", "trialing"] },
      profile: { isNot: null },
    },
  });

  const results: Record<string, number | string> = {};
  for (const user of users) {
    try {
      results[user.id] = await runSearchForUser(user);
    } catch (err) {
      results[user.id] = `error: ${err instanceof Error ? err.message : err}`;
    }
  }
  return NextResponse.json({ users: users.length, results });
}
