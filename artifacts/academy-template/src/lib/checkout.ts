import { getAuth, setAuth } from "./auth";

export type CheckoutPlanKey = string;

export async function startCheckout(planKey: CheckoutPlanKey, priceId: string): Promise<void> {
  const auth = getAuth();
  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId: planKey,
      priceId,
      email: auth.isLoggedIn ? auth.email : undefined,
      userId: auth.isLoggedIn ? auth.userId : undefined,
    }),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.error ?? `Error ${res.status}`);
  }
  const { url } = await res.json();
  if (!url) throw new Error("No se recibió la URL de pago");
  window.location.href = url;
}

export async function activatePlan(sessionId: string, userId: string): Promise<{ plan: string }> {
  const res = await fetch("/api/checkout/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, userId }),
  });
  if (!res.ok) {
    const d = await res.json().catch(() => ({}));
    throw new Error(d.error ?? `Error ${res.status}`);
  }
  return res.json();
}
