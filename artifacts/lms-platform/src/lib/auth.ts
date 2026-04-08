export type User = {
  name: string;
  email: string;
  isLoggedIn: boolean;
  role: 'user' | 'admin';
};

const AUTH_KEY = "lms_auth";

const DEFAULT_USER: User = {
  name: 'Visitante',
  email: '',
  isLoggedIn: false,
  role: 'user',
};

export function getAuth(): User {
  try {
    const auth = localStorage.getItem(AUTH_KEY);
    if (!auth) return DEFAULT_USER;
    return JSON.parse(auth);
  } catch { return DEFAULT_USER; }
}

export function setAuth(user: User) {
  localStorage.setItem(AUTH_KEY, JSON.stringify(user));
}

/** Activa el modo admin con clave correcta */
export function activateAdmin(key: string): boolean {
  if (key === "aulaos-editor-2024") {
    setAuth({ name: "AulaOS Admin", email: "info@aulaos.com", isLoggedIn: true, role: "admin" });
    return true;
  }
  return false;
}

export function logout() {
  setAuth({ ...getAuth(), isLoggedIn: false, role: "user" });
}
