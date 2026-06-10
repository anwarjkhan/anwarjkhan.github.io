import Stripe from "stripe";

// Lazy so the app can build/boot without Stripe env vars configured yet.
let client: Stripe | null = null;

export function getStripe(): Stripe {
  if (!client) client = new Stripe(process.env.STRIPE_SECRET_KEY!);
  return client;
}

export const PRICE_ID = process.env.STRIPE_PRICE_ID ?? "";

const STATUS_MAP: Record<string, string> = {
  active: "active",
  trialing: "trialing",
  past_due: "past_due",
  canceled: "canceled",
  unpaid: "canceled",
  incomplete: "inactive",
  incomplete_expired: "inactive",
  paused: "canceled",
};

export function mapSubscriptionStatus(stripeStatus: string): string {
  return STATUS_MAP[stripeStatus] ?? "inactive";
}
