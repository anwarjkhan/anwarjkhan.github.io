import { randomBytes } from "crypto";
import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** POST — (re)generate the personal access token used by the mobile app. */
export async function POST() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const apiToken = `jp_${randomBytes(24).toString("hex")}`;
  await prisma.user.update({ where: { id: user.id }, data: { apiToken } });
  return NextResponse.json({ apiToken });
}
