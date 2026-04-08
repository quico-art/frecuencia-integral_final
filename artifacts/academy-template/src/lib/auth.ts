import { createClient } from "@supabase/supabase-js";
import { ACADEMY } from "@/config";

const supabase = createClient(ACADEMY.supabase.url, ACADEMY.supabase.anonKey);

export interface User {
  isLoggedIn: boolean;
  userId: string;
  email: string;
  name: string;
  plan: string;
  role: "admin" | "student";
}

const STORAGE_KEY = "at_auth";

export function getAuth(): User {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {}
  return { isLoggedIn: false, userId: "", email: "", name: "", plan: "free", role: "student" };
}

export function setAuth(user: User) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
}

export async function loginWithEmail(email: string, password: string): Promise<User> {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password });
  if (error) throw new Error(error.message);
  const u = data.user;
  const meta = u.user_metadata ?? {};
  const user: User = {
    isLoggedIn: true,
    userId: u.id,
    email: u.email ?? "",
    name: meta.full_name ?? meta.name ?? email.split("@")[0],
    plan: meta.plan ?? "free",
    role: meta.role ?? "student",
  };
  setAuth(user);
  return user;
}

export async function registerWithEmail(email: string, password: string, name: string): Promise<User> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: { data: { full_name: name, plan: "free", role: "student" } },
  });
  if (error) throw new Error(error.message);
  const u = data.user!;
  const user: User = {
    isLoggedIn: true,
    userId: u.id,
    email: u.email ?? "",
    name,
    plan: "free",
    role: "student",
  };
  setAuth(user);
  return user;
}

export async function logout(): Promise<void> {
  await supabase.auth.signOut();
  localStorage.removeItem(STORAGE_KEY);
}

export function getProgress(): { completedWeeks: number[]; notes: Record<number, string> } {
  try {
    const raw = localStorage.getItem("at_progress");
    if (raw) return JSON.parse(raw);
  } catch {}
  return { completedWeeks: [], notes: {} };
}

export function setProgress(data: { completedWeeks: number[]; notes: Record<number, string> }) {
  localStorage.setItem("at_progress", JSON.stringify(data));
}
