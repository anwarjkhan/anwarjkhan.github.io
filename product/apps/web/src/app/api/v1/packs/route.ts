import { NextResponse } from "next/server";
import { userFromBearer } from "@/lib/auth";
import { prisma } from "@/lib/db";

/** GET — application packs for the mobile app (bearer token auth). */
export async function GET(req: Request) {
  const user = await userFromBearer(req);
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const packs = await prisma.applicationPack.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    take: 50,
  });
  return NextResponse.json({ packs });
}
