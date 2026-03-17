import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth";
import { getBalance } from "@/lib/credits";

export async function GET() {
  try {
    const user = await requireAuth();
    const balance = await getBalance(user.id);
    return NextResponse.json({ balance });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}
