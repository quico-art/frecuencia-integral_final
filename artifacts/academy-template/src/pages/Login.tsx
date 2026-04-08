import { useState } from "react";
import { useLocation } from "wouter";
import { ACADEMY } from "@/config";
import { loginWithEmail, registerWithEmail } from "@/lib/auth";

export default function Login() {
  const [, go] = useLocation();
  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const C = ACADEMY.colors;
  const F = ACADEMY.fonts;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "login") {
        await loginWithEmail(email, password);
      } else {
        await registerWithEmail(email, password, name);
      }
      go("/area");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div style={{ minHeight: "100vh", display: "flex", background: C.light }}>
      {/* Panel lateral */}
      <div style={{ display: "none", flex: 1, background: C.primary, alignItems: "center", justifyContent: "center", padding: 48 }} className="at-panel">
        <div style={{ maxWidth: 400, color: "#fff" }}>
          <div style={{ fontFamily: F.heading, fontSize: 42, fontWeight: 300, lineHeight: 1.1, marginBottom: 24 }}>
            {ACADEMY.name}
          </div>
          <p style={{ fontSize: 16, opacity: 0.7, lineHeight: 1.7 }}>{ACADEMY.description}</p>
        </div>
      </div>

      {/* Formulario */}
      <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "48px 24px" }}>
        <div style={{ width: "100%", maxWidth: 400 }}>
          {/* Logo / nombre */}
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ fontFamily: F.heading, fontSize: 28, fontWeight: 300, color: C.primary, marginBottom: 4 }}>{ACADEMY.name}</div>
            <p style={{ fontSize: 13, color: C.muted }}>{ACADEMY.tagline}</p>
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", background: "#E5E5EA", borderRadius: 9999, padding: 3, marginBottom: 32 }}>
            {(["login", "register"] as const).map(m => (
              <button
                key={m}
                onClick={() => { setMode(m); setError(null); }}
                style={{ flex: 1, padding: "9px 0", borderRadius: 9999, border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", background: mode === m ? "#fff" : "transparent", color: mode === m ? C.primary : C.muted, transition: "all .2s", boxShadow: mode === m ? "0 1px 4px rgba(0,0,0,.12)" : "none" }}>
                {m === "login" ? "Iniciar sesión" : "Registrarme"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {mode === "register" && (
              <input
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={e => setName(e.target.value)}
                required
                style={{ padding: "14px 18px", borderRadius: 12, border: "1px solid #D2D2D7", fontSize: 14, fontFamily: F.body, outline: "none" }}
              />
            )}
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              style={{ padding: "14px 18px", borderRadius: 12, border: "1px solid #D2D2D7", fontSize: 14, fontFamily: F.body, outline: "none" }}
            />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={8}
              style={{ padding: "14px 18px", borderRadius: 12, border: "1px solid #D2D2D7", fontSize: 14, fontFamily: F.body, outline: "none" }}
            />

            {error && (
              <div style={{ padding: "12px 16px", background: "#FFF0EE", borderRadius: 10, fontSize: 13, color: C.error, border: `1px solid ${C.error}30` }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{ padding: "15px", borderRadius: 9999, background: C.primary, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: loading ? "default" : "pointer", opacity: loading ? 0.7 : 1, fontFamily: F.body, marginTop: 4 }}>
              {loading ? "Cargando…" : mode === "login" ? "Entrar al área de alumnos" : "Crear cuenta"}
            </button>
          </form>

          <p style={{ textAlign: "center", fontSize: 13, color: C.muted, marginTop: 24 }}>
            <span style={{ cursor: "pointer", color: C.accent, fontWeight: 600 }} onClick={() => go("/")}>← Volver al inicio</span>
          </p>
        </div>
      </div>
    </div>
  );
}
