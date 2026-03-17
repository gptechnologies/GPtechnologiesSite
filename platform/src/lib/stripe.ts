import Stripe from "stripe";
import { db } from "./db";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function getOrCreateCustomer(
  userId: string,
  email: string
): Promise<string> {
  const existing = await db.billingCustomer.findUnique({
    where: { userId },
  });
  if (existing) return existing.stripeCustomerId;

  const customer = await stripe.customers.create({
    email,
    metadata: { userId },
  });

  await db.billingCustomer.create({
    data: { userId, stripeCustomerId: customer.id },
  });

  return customer.id;
}

export async function createCheckoutSession(
  userId: string,
  email: string,
  creditAmount: number
): Promise<string> {
  const customerId = await getOrCreateCustomer(userId, email);
  const appUrl = process.env.NEXT_PUBLIC_APP_URL!;

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "payment",
    line_items: [
      {
        price: process.env.STRIPE_PRICE_ID!,
        quantity: creditAmount,
      },
    ],
    metadata: { userId, creditAmount: String(creditAmount) },
    success_url: `${appUrl}/dashboard/credits?success=true`,
    cancel_url: `${appUrl}/dashboard/credits?canceled=true`,
  });

  return session.url!;
}

export async function handleWebhookEvent(
  event: Stripe.Event
): Promise<void> {
  const existing = await db.billingEvent.findUnique({
    where: { eventId: event.id },
  });
  if (existing) return;

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const userId = session.metadata?.userId;
    const creditAmount = parseInt(session.metadata?.creditAmount ?? "0", 10);

    if (userId && creditAmount > 0) {
      const { grantCredits } = await import("./credits");
      await grantCredits(
        userId,
        creditAmount,
        "purchase",
        `stripe_${event.id}`
      );
    }
  }

  await db.billingEvent.create({
    data: { eventId: event.id, type: event.type },
  });
}
