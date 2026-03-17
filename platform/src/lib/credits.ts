import { db } from "./db";

export async function getBalance(userId: string): Promise<number> {
  const wallet = await db.creditWallet.findUnique({ where: { userId } });
  return wallet?.balance ?? 0;
}

export async function reserveCredits(
  userId: string,
  amount: number,
  reason: string,
  referenceId: string
): Promise<{ success: boolean; balance: number }> {
  return db.$transaction(async (tx) => {
    const wallet = await tx.creditWallet.findUnique({
      where: { userId },
    });

    if (!wallet || wallet.balance < amount) {
      return { success: false, balance: wallet?.balance ?? 0 };
    }

    const updated = await tx.creditWallet.update({
      where: { userId },
      data: { balance: { decrement: amount } },
    });

    await tx.creditLedger.create({
      data: {
        userId,
        delta: -amount,
        reason,
        runId: reason === "generation" ? referenceId : undefined,
        editRequestId: reason === "edit" ? referenceId : undefined,
        idempotencyKey: `${reason}_${referenceId}`,
      },
    });

    return { success: true, balance: updated.balance };
  });
}

export async function refundCredits(
  userId: string,
  amount: number,
  reason: string,
  referenceId: string
): Promise<void> {
  await db.$transaction([
    db.creditWallet.update({
      where: { userId },
      data: { balance: { increment: amount } },
    }),
    db.creditLedger.create({
      data: {
        userId,
        delta: amount,
        reason: `refund_${reason}`,
        idempotencyKey: `refund_${reason}_${referenceId}`,
      },
    }),
  ]);
}

export async function grantCredits(
  userId: string,
  amount: number,
  reason: string,
  idempotencyKey: string
): Promise<void> {
  const existing = await db.creditLedger.findUnique({
    where: { idempotencyKey },
  });
  if (existing) return;

  await db.$transaction([
    db.creditWallet.upsert({
      where: { userId },
      create: { userId, balance: amount },
      update: { balance: { increment: amount } },
    }),
    db.creditLedger.create({
      data: { userId, delta: amount, reason, idempotencyKey },
    }),
  ]);
}
