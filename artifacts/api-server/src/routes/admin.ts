import { Router, type IRouter, type Request, type Response } from "express";
import { createClient } from "@supabase/supabase-js";

const router: IRouter = Router();

function getAdminClient() {
  const url = process.env["VITE_SUPABASE_URL"] ?? "";
  const key = process.env["SUPABASE_SERVICE_ROLE_KEY"] ?? "";
  if (!url || !key) throw new Error("Missing Supabase admin credentials");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

/* GET /api/admin/users — list all auth users */
router.get("/admin/users", async (req: Request, res: Response) => {
  try {
    const supabase = getAdminClient();
    const { data, error } = await supabase.auth.admin.listUsers({
      page: 1,
      perPage: 1000,
    });
    if (error) throw error;

    const users = (data.users ?? []).map((u) => ({
      id: u.id,
      email: u.email ?? "",
      name: u.user_metadata?.full_name ?? u.user_metadata?.name ?? "",
      role: u.user_metadata?.role ?? "user",
      plan: u.user_metadata?.plan ?? "libre",
      createdAt: u.created_at,
      lastSignIn: u.last_sign_in_at ?? null,
      emailConfirmed: !!u.email_confirmed_at,
      currentWeek: u.user_metadata?.currentWeek ?? null,
      totalCompleted: u.user_metadata?.totalCompleted ?? null,
      completedWeeks: (u.user_metadata?.completedWeeks ?? []) as number[],
    }));

    res.json({ users, total: users.length });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? "Internal error" });
  }
});

/* PATCH /api/admin/users/:id — update user metadata */
router.patch("/admin/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { plan, role, name } = req.body as { plan?: string; role?: string; name?: string };
    const supabase = getAdminClient();

    const { data: existing } = await supabase.auth.admin.getUserById(id);
    const meta = existing.user?.user_metadata ?? {};

    const { data, error } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: {
        ...meta,
        ...(plan !== undefined && { plan }),
        ...(role !== undefined && { role }),
        ...(name !== undefined && { full_name: name }),
      },
    });
    if (error) throw error;
    res.json({ ok: true, user: data.user });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? "Internal error" });
  }
});

/* POST /api/admin/users/:id/reset-progress — reset completed weeks */
router.post("/admin/users/:id/reset-progress", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    /* keepWeeks: array of week numbers to KEEP as completed; [] = reset all */
    const { keepWeeks = [] } = req.body as { keepWeeks?: number[] };
    const supabase = getAdminClient();

    const { data: existing } = await supabase.auth.admin.getUserById(id);
    const meta = existing.user?.user_metadata ?? {};

    const newCompleted = keepWeeks;
    const newCurrentWeek = newCompleted.length === 0
      ? 1
      : Math.min(48, Math.max(...newCompleted) + 1);

    const { data, error } = await supabase.auth.admin.updateUserById(id, {
      user_metadata: {
        ...meta,
        completedWeeks:  newCompleted,
        totalCompleted:  newCompleted.length,
        currentWeek:     newCurrentWeek,
      },
    });
    if (error) throw error;
    res.json({ ok: true, completedWeeks: newCompleted, currentWeek: newCurrentWeek });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? "Internal error" });
  }
});

/* DELETE /api/admin/users/:id */
router.delete("/admin/users/:id", async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const supabase = getAdminClient();
    const { error } = await supabase.auth.admin.deleteUser(id);
    if (error) throw error;
    res.json({ ok: true });
  } catch (err: any) {
    res.status(500).json({ error: err.message ?? "Internal error" });
  }
});

export default router;
