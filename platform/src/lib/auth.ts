import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "./db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(db),
  providers: [GitHub, Google],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    session({ session, user }) {
      session.user.id = user.id;
      return session;
    },
  },
  events: {
    async createUser({ user }) {
      if (!user.id) return;
      const starterCredits = parseInt(process.env.STARTER_CREDITS ?? "3", 10);
      await db.$transaction([
        db.creditWallet.create({
          data: { userId: user.id, balance: starterCredits },
        }),
        db.creditLedger.create({
          data: {
            userId: user.id,
            delta: starterCredits,
            reason: "signup_bonus",
            idempotencyKey: `signup_${user.id}`,
          },
        }),
      ]);
    },
  },
});

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Unauthorized");
  }
  return session.user as { id: string; email: string; name?: string | null };
}
