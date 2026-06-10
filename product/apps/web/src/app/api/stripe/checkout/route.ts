import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { stripe, PRICE_ID } from "@/lib/stripe";

const APP_URL = process.env.APP_URL ?? "http://localhost:3000";

/** POST — create a Stripe Checkout session for the subscription. */
export async function POST() {
  const user = await currentUser();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let customerId = user.stripeCustomerId;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email,
      metadata: { userId: user.id },
    });
    customerId = customer.id;
    await prisma.user.update({
      where: { id: user.id },
      data: { stripeCustomerId: customerId },
    });
  }

  const session = await stripe.checkout.sessions.create({
    customer: customerId,
    mode: "subscription",
    line_items: [{ price: PRICE_ID, quantity: 1 }],
    subscription_data: { trial_period_days: 7 },
    success_url: `${APP_URL}/dashboard?checkout=success`,
    cancel_url: `${APP_URL}/settings?checkout=cancelled`,
  });
  return NextResponse.json({ url: session.url });
}
