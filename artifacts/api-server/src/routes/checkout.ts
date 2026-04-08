import { Router, type Request, type Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { getStripeClient, PLAN_CONFIG } from "../stripe";

const router = Router();

function getAdminClient() {
  const url = process.env["VITE_SUPABASE_URL"] ?? "";
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  if (!url || !key) throw new Error("Missing Supabase admin credentials");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

function getBaseUrl(req: Request): string {
  const domains = process.env.REPLIT_DOMAINS?.split(",")[0];
  if (domains) return `https://${domains}`;
  return `${req.protocol}://${req.get("host")}`;
}

/* ── POST /api/checkout ─────────────────────────────────── */
router.post("/checkout", async (req: Request, res: Response) => {
  const { planId, email, userId } = req.body as {
    planId?: string;
    email?: string;
    userId?: string;
  };

  if (!planId) {
    return res.status(400).json({ error: "planId es requerido" });
  }

  const config = PLAN_CONFIG[planId];
  if (!config) {
    return res.status(400).json({ error: `Plan desconocido: ${planId}` });
  }

  try {
    const stripe = getStripeClient();
    const base = getBaseUrl(req);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [{ price: config.priceId, quantity: 1 }],
      mode: config.mode,
      success_url: `${base}/area?paid=ok&plan=${config.plan}&session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${base}/metodo#tct-puertas`,
      customer_email: email || undefined,
      client_reference_id: userId || undefined,
      metadata: { planId, plan: config.plan },
      locale: "es",
    });

    res.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe checkout error:", err.message);
    res.status(500).json({ error: err.message ?? "Error al crear sesión de pago" });
  }
});

/* ── POST /api/checkout/activate ───────────────────────── */
/* Verifica el pago y actualiza el plan del usuario en Supabase */
router.post("/checkout/activate", async (req: Request, res: Response) => {
  const { session_id, userId } = req.body as {
    session_id?: string;
    userId?: string;
  };

  if (!session_id) return res.status(400).json({ error: "session_id requerido" });
  if (!userId)     return res.status(400).json({ error: "userId requerido" });

  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(session_id);

    const paid =
      session.payment_status === "paid" ||
      session.status === "complete";

    if (!paid) {
      return res.status(402).json({ error: "El pago no se ha completado" });
    }

    const plan = session.metadata?.plan ?? "blanca";

    const supabase = getAdminClient();
    const { data: existing } = await supabase.auth.admin.getUserById(userId);
    const meta = existing?.user?.user_metadata ?? {};

    await supabase.auth.admin.updateUserById(userId, {
      user_metadata: { ...meta, plan },
    });

    res.json({ success: true, plan });
  } catch (err: any) {
    console.error("activate error:", err.message);
    res.status(500).json({ error: err.message ?? "Error al activar el plan" });
  }
});

/* ── GET /api/checkout/verify ───────────────────────────── */
router.get("/checkout/verify", async (req: Request, res: Response) => {
  const { session_id } = req.query;
  if (!session_id || typeof session_id !== "string") {
    return res.status(400).json({ error: "session_id requerido" });
  }
  try {
    const stripe = getStripeClient();
    const session = await stripe.checkout.sessions.retrieve(session_id);
    const paid = session.payment_status === "paid" || session.status === "complete";
    res.json({
      paid,
      plan: session.metadata?.plan ?? null,
      email: session.customer_email,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
