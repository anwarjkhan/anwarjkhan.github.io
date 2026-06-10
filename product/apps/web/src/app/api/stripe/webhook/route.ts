import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { prisma } from "@/lib/db";
import { stripe, mapSubscriptionStatus } from "@/lib/stripe";

export async function POST(req: Request) {
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  switch (event.type) {
    case "customer.subscription.created":
    case "customer.subscription.updated":
    case "customer.subscription.deleted": {
      const sub = event.data.object as Stripe.Subscription;
      const customerId =
        typeof sub.customer === "string" ? sub.customer : sub.customer.id;
      const periodEnd = sub.items.data[0]?.current_period_end;
      await prisma.user.updateMany({
        where: { stripeCustomerId: customerId },
        data: {
          subscriptionStatus:
            event.type === "customer.subscription.deleted"
              ? "canceled"
              : mapSubscriptionStatus(sub.status),
          currentPeriodEnd: periodEnd ? new Date(periodEnd * 1000) : null,
        },
      });
      break;
    }
  }
  return NextResponse.json({ received: true });
}
