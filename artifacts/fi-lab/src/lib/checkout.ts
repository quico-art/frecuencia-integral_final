import { getAuth, setAuth } from "./auth";

export type PlanId = "puerta_blanca" | "puerta_oro";

/* Crea sesión de checkout en Stripe y redirige al usuario */
export async function startCheckout(planId: PlanId): Promise<void> {
  const auth = getAuth();

  const res = await fetch("/api/checkout", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      planId,
      email: auth.isLoggedIn ? auth.email : undefined,
      userId: auth.isLoggedIn ? auth.userId : undefined,
    }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Error ${res.status}`);
  }

  const { url } = await res.json();
  if (!url) throw new Error("No se recibió la URL de pago");
  window.location.href = url;
}

/* Verifica el pago y actualiza el plan del usuario en Supabase */
export async function activatePlan(
  sessionId: string,
  userId: string,
): Promise<{ success: boolean; plan: string }> {
  const res = await fetch("/api/checkout/activate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ session_id: sessionId, userId }),
  });

  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error ?? `Error ${res.status}`);
  }

  return res.json();
}
