import { supabase } from "./supabase";

export type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin';
  plan?: string;
  course?: string;
};

export type Progress = {
  currentWeek: number;
  completedWeeks: number[];
  currentGate: 'blanca' | 'roja' | 'azul' | 'arcoiris';
  unlockedGates: string[];
};

export type JournalEntry = {
  id: string;
  week: number;
  date: string;
  content: string;
  source?: "diario" | "ejercicio" | "arteterapia";
};

const DEFAULT_USER: User = {
  name: 'Alumno Demo',
  email: 'alumno@test.com',
  isLoggedIn: false,
  role: 'user',
};

const DEFAULT_PROGRESS: Progress = {
  currentWeek: 1,
  completedWeeks: [],
  currentGate: 'blanca',
  unlockedGates: ['blanca'],
};

export function getAuth(): User {
  const auth = localStorage.getItem('auth');
  if (!auth) return DEFAULT_USER;
  return JSON.parse(auth);
}

export function setAuth(user: User) {
  localStorage.setItem('auth', JSON.stringify(user));
}

export async function logout() {
  await supabase.auth.signOut();
  const user = getAuth();
  setAuth({ ...user, isLoggedIn: false });
}

export function getProgress(): Progress {
  const prog = localStorage.getItem('progress');
  if (!prog) return DEFAULT_PROGRESS;
  return JSON.parse(prog);
}

export function setProgress(progress: Progress) {
  localStorage.setItem('progress', JSON.stringify(progress));
  syncProgressToSupabase(progress).catch(() => {});
}

async function syncProgressToSupabase(progress: Progress) {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;
  await supabase.auth.updateUser({
    data: {
      currentWeek: progress.currentWeek,
      completedWeeks: progress.completedWeeks,
      totalCompleted: progress.completedWeeks.length,
    }
  });
}

export function getJournal(): JournalEntry[] {
  const journal = localStorage.getItem('journal');
  if (!journal) return [];
  return JSON.parse(journal);
}

export function saveJournalEntry(entry: JournalEntry) {
  const journal = getJournal();
  const existing = journal.findIndex(e => e.id === entry.id);
  if (existing >= 0) {
    journal[existing] = entry;
  } else {
    journal.push(entry);
  }
  localStorage.setItem('journal', JSON.stringify(journal));
}

export function subscribeEmail(email: string) {
  const subs = JSON.parse(localStorage.getItem('subscriptions') || '[]');
  subs.push(email);
  localStorage.setItem('subscriptions', JSON.stringify(subs));
}
