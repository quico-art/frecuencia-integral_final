import Stripe from "stripe";

export function getStripeClient(): Stripe {
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey) throw new Error("STRIPE_SECRET_KEY env var is not set");
  return new Stripe(secretKey, { apiVersion: "2026-03-25.dahlia" });
}

export const PLAN_CONFIG: Record<
  string,
  { priceId: string; mode: "subscription" | "payment"; plan: string; label: string }
> = {
  puerta_blanca: {
    priceId: "price_1T2dOo9g6L3yEuP8z4nhJh2N",
    mode: "subscription",
    plan: "blanca",
    label: "Puerta Blanca",
  },
  puerta_oro: {
    priceId: "price_1T2dsD9g6L3yEuP8jX1yHQ35",
    mode: "subscription",
    plan: "oro",
    label: "Puerta Oro",
  },
};
