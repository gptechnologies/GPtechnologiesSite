import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { createCheckoutSession } from "@/lib/stripe";
import { z } from "zod";

const schema = z.object({
  amount: z.number().int().min(1).max(100),
});

export async function POST(req: NextRequest) {
  try {
    const user = await requireAuth();
    const body = await req.json();
    const { amount } = schema.parse(body);

    const url = await createCheckoutSession(user.id, user.email!, amount);
    return NextResponse.json({ url });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Bad request";
    const status = message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ error: message }, { status });
  }
}
