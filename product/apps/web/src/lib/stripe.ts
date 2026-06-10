import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const PRICE_ID = process.env.STRIPE_PRICE_ID!;

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
