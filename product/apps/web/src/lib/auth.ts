import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: "database" },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
});

/** Resolve the signed-in user for an App Router request, or null. */
export async function currentUser() {
  const session = await auth();
  if (!session?.user?.id) return null;
  return prisma.user.findUnique({ where: { id: session.user.id } });
}

/** Resolve a user from an `Authorization: Bearer <apiToken>` header (mobile). */
export async function userFromBearer(req: Request) {
  const header = req.headers.get("authorization") ?? "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : null;
  if (!token) return null;
  return prisma.user.findUnique({ where: { apiToken: token } });
}

export function hasActiveSubscription(user: {
  subscriptionStatus: string;
}): boolean {
  return ["active", "trialing"].includes(user.subscriptionStatus);
}
