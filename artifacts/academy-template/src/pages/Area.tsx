import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ACADEMY, SECTIONS, TOTAL_WEEKS } from "@/config";
import { getAuth, setAuth, logout, getProgress, setProgress } from "@/lib/auth";
import { activatePlan } from "@/lib/checkout";

const C = ACADEMY.colors;
const F = ACADEMY.fonts;

type Tab = "inicio" | "modulos" | "multimedia" | "materiales" | "progreso" | "diario" | "comunidad";

function NavItem({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ width: "100%", textAlign: "left", padding: "10px 16px", borderRadius: 10, border: "none", background: active ? `${C.accent}12` : "transparent", color: active ? C.accent : C.muted, fontSize: 13, fontWeight: active ? 600 : 400, cursor: "pointer", fontFamily: F.body }}>
      {label}
    </button>
  );
}

function WeekCard({ n, completed, onClick }: { n: number; completed: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{ padding: "18px 20px", borderRadius: 14, border: `1.5px solid ${completed ? C.accent : "#E5E5EA"}`, background: completed ? `${C.accent}08` : "#fff", cursor: "pointer", textAlign: "left", fontFamily: F.body, transition: "all .15s" }}>
      <div style={{ fontSize: 11, color: C.muted, marginBottom: 4 }}>Semana {n}</div>
      <div style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>Módulo {n}</div>
      <div style={{ marginTop: 12, fontSize: 11, color: completed ? C.accent : C.muted, fontWeight: 600 }}>
        {completed ? "✓ Completado" : "Pendiente"}
      </div>
    </button>
  );
}

export default function Area() {
  const [, go] = useLocation();
  const [auth, setAuthState] = useState(getAuth());
  const [tab, setTab] = useState<Tab>("inicio");
  const [paidBanner, setPaidBanner] = useState<string | null>(null);
  const [paidError, setPaidError] = useState<string | null>(null);
  const [journalText, setJournalText] = useState("");
  const progress = getProgress();

  useEffect(() => {
    if (!auth.isLoggedIn) go("/login");
  }, [auth.isLoggedIn]);

  /* Handle Stripe return */
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("paid") !== "ok") return;
    const sessionId = params.get("session_id") ?? "";
    const curr = getAuth();
    if (!curr.isLoggedIn || !curr.userId) return;
    activatePlan(sessionId, curr.userId)
      .then(({ plan }) => {
        const updated = { ...curr, plan };
        setAuth(updated);
        setAuthState(updated);
        setPaidBanner(plan);
        window.history.replaceState({}, "", window.location.pathname);
      })
      .catch(() => {
        setPaidError("No se pudo activar el plan. Contacta con soporte.");
        window.history.replaceState({}, "", window.location.pathname);
      });
  }, []);

  function toggleWeek(n: number) {
    const p = getProgress();
    const done = p.completedWeeks.includes(n);
    const updated = done
      ? { ...p, completedWeeks: p.completedWeeks.filter(w => w !== n) }
      : { ...p, completedWeeks: [...p.completedWeeks, n] };
    setProgress(updated);
  }

  async function handleLogout() {
    await logout();
    go("/");
  }

  const pct = Math.round((progress.completedWeeks.length / TOTAL_WEEKS) * 100);

  const tabs: { key: Tab; label: string; enabled: boolean }[] = [
    { key: "inicio",      label: "Inicio",      enabled: true },
    { key: "modulos",     label: "Módulos",     enabled: SECTIONS.semanas },
    { key: "multimedia",  label: "Multimedia",  enabled: SECTIONS.multimedia },
    { key: "materiales",  label: "Materiales",  enabled: SECTIONS.materiales },
    { key: "progreso",    label: "Progreso",    enabled: SECTIONS.progreso },
    { key: "diario",      label: "Diario",      enabled: SECTIONS.diario },
    { key: "comunidad",   label: "Comunidad",   enabled: SECTIONS.comunidad },
  ].filter(t => t.enabled);

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", fontFamily: F.body, background: C.light }}>

      {/* ── Banners ── */}
      {paidBanner && (
        <div style={{ background: C.primary, color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 13 }}>✅ ¡Acceso activado! Plan <strong style={{ textTransform: "capitalize" }}>{paidBanner}</strong> activo.</span>
          <button onClick={() => setPaidBanner(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
      )}
      {paidError && (
        <div style={{ background: C.error, color: "#fff", padding: "12px 24px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <span style={{ fontSize: 13 }}>{paidError}</span>
          <button onClick={() => setPaidError(null)} style={{ background: "none", border: "none", color: "#fff", fontSize: 20, cursor: "pointer" }}>×</button>
        </div>
      )}

      {/* ── Header ── */}
      <header style={{ background: "rgba(255,255,255,.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)", flexShrink: 0, zIndex: 30 }}>
        <div style={{ padding: "0 28px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 56 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ cursor: "pointer", fontSize: 13, color: C.muted }} onClick={() => go("/")}>← Academia</span>
            <div style={{ fontFamily: F.heading, fontSize: 18, color: C.primary }}>{ACADEMY.name}</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <span style={{ fontSize: 13, color: C.muted }}>{auth.name} · <span style={{ color: C.accent, fontWeight: 600, textTransform: "capitalize" }}>{auth.plan}</span></span>
            <button onClick={handleLogout} style={{ background: "none", border: "1px solid #E5E5EA", padding: "6px 14px", borderRadius: 9999, fontSize: 12, cursor: "pointer", color: C.muted, fontFamily: F.body }}>Salir</button>
          </div>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>

        {/* Sidebar */}
        <aside style={{ width: 220, flexShrink: 0, borderRight: "1px solid rgba(0,0,0,0.06)", background: "#fff", padding: "24px 12px", display: "flex", flexDirection: "column", gap: 4 }}>
          {tabs.map(t => (
            <NavItem key={t.key} label={t.label} active={tab === t.key} onClick={() => setTab(t.key)} />
          ))}
          <div style={{ flex: 1 }} />
          {/* Barra de progreso mini */}
          <div style={{ padding: "12px 4px" }}>
            <div style={{ fontSize: 11, color: C.muted, marginBottom: 6 }}>Progreso global: {pct}%</div>
            <div style={{ height: 4, background: "#E5E5EA", borderRadius: 9999 }}>
              <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 9999, transition: "width .3s" }} />
            </div>
          </div>
        </aside>

        {/* Content */}
        <main style={{ flex: 1, overflowY: "auto", padding: "40px 48px" }}>

          {/* INICIO */}
          {tab === "inicio" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 40, fontWeight: 300, color: C.primary, marginBottom: 8 }}>
                Hola, <em style={{ fontStyle: "italic", color: C.accent }}>{auth.name}</em>
              </h1>
              <p style={{ fontSize: 15, color: C.muted, marginBottom: 40 }}>Bienvenido a tu área de alumnos. Continúa donde lo dejaste.</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20, marginBottom: 48 }}>
                {[
                  { label: "Semanas completadas", value: progress.completedWeeks.length, sub: `de ${TOTAL_WEEKS} totales` },
                  { label: "Progreso", value: `${pct}%`, sub: "del programa" },
                  { label: "Plan activo", value: auth.plan, sub: "acceso actual" },
                ].map((s, i) => (
                  <div key={i} style={{ background: "#fff", borderRadius: 16, padding: "28px 24px", border: "1px solid rgba(0,0,0,0.06)" }}>
                    <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 10 }}>{s.label}</div>
                    <div style={{ fontFamily: F.heading, fontSize: 42, fontWeight: 300, color: C.primary, lineHeight: 1, textTransform: "capitalize" }}>{s.value}</div>
                    <div style={{ fontSize: 12, color: C.muted, marginTop: 6 }}>{s.sub}</div>
                  </div>
                ))}
              </div>
              <h2 style={{ fontFamily: F.heading, fontSize: 22, fontWeight: 300, marginBottom: 20 }}>Continuar aprendiendo</h2>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {Array.from({ length: Math.min(6, TOTAL_WEEKS) }, (_, i) => i + 1).map(n => (
                  <WeekCard key={n} n={n} completed={progress.completedWeeks.includes(n)} onClick={() => setTab("modulos")} />
                ))}
              </div>
            </div>
          )}

          {/* MÓDULOS */}
          {tab === "modulos" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 8 }}>Módulos del programa</h1>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 36 }}>{progress.completedWeeks.length} de {TOTAL_WEEKS} semanas completadas</p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 12 }}>
                {Array.from({ length: TOTAL_WEEKS }, (_, i) => i + 1).map(n => (
                  <WeekCard key={n} n={n} completed={progress.completedWeeks.includes(n)} onClick={() => toggleWeek(n)} />
                ))}
              </div>
            </div>
          )}

          {/* MULTIMEDIA */}
          {tab === "multimedia" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 8 }}>Multimedia</h1>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 36 }}>Vídeos, audios y grabaciones del programa.</p>
              <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>🎬</div>
                <p style={{ color: C.muted, fontSize: 14 }}>El contenido multimedia se añade desde el panel de administración.</p>
              </div>
            </div>
          )}

          {/* MATERIALES */}
          {tab === "materiales" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 8 }}>Materiales</h1>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 36 }}>PDFs, guías y recursos descargables.</p>
              <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                <p style={{ color: C.muted, fontSize: 14 }}>Los materiales se añaden desde el panel de administración.</p>
              </div>
            </div>
          )}

          {/* PROGRESO */}
          {tab === "progreso" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 36 }}>Tu progreso</h1>
              <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", border: "1px solid rgba(0,0,0,0.06)", marginBottom: 24 }}>
                <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 16 }}>
                  <span style={{ fontFamily: F.heading, fontSize: 64, fontWeight: 300, color: C.primary }}>{pct}%</span>
                  <span style={{ color: C.muted, fontSize: 14 }}>completado</span>
                </div>
                <div style={{ height: 8, background: "#E5E5EA", borderRadius: 9999 }}>
                  <div style={{ height: "100%", width: `${pct}%`, background: C.accent, borderRadius: 9999, transition: "width .4s" }} />
                </div>
                <p style={{ fontSize: 13, color: C.muted, marginTop: 12 }}>{progress.completedWeeks.length} de {TOTAL_WEEKS} semanas completadas</p>
              </div>
              <h3 style={{ fontSize: 14, fontWeight: 600, color: C.primary, marginBottom: 16 }}>Semanas completadas</h3>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {progress.completedWeeks.sort((a, b) => a - b).map(w => (
                  <span key={w} style={{ background: `${C.accent}12`, color: C.accent, padding: "6px 14px", borderRadius: 9999, fontSize: 12, fontWeight: 600 }}>S.{w}</span>
                ))}
                {progress.completedWeeks.length === 0 && <p style={{ color: C.muted, fontSize: 14 }}>Aún no has marcado ninguna semana como completada.</p>}
              </div>
            </div>
          )}

          {/* DIARIO */}
          {tab === "diario" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 8 }}>Diario de práctica</h1>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 36 }}>Escribe tus reflexiones, aprendizajes y experiencias de hoy.</p>
              <div style={{ background: "#fff", borderRadius: 20, padding: "32px 36px", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 12 }}>{new Date().toLocaleDateString("es-ES", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}</div>
                <textarea
                  value={journalText}
                  onChange={e => setJournalText(e.target.value)}
                  placeholder="¿Qué has aprendido o vivido hoy?..."
                  rows={12}
                  style={{ width: "100%", border: "none", outline: "none", fontSize: 15, lineHeight: 1.8, color: C.primary, fontFamily: F.body, resize: "vertical" }}
                />
                <div style={{ marginTop: 20, display: "flex", justifyContent: "flex-end" }}>
                  <button
                    onClick={() => {
                      const key = new Date().toISOString().split("T")[0];
                      const all = JSON.parse(localStorage.getItem("at_journal") ?? "{}");
                      all[key] = journalText;
                      localStorage.setItem("at_journal", JSON.stringify(all));
                      alert("Guardado ✓");
                    }}
                    style={{ padding: "10px 24px", borderRadius: 9999, background: C.primary, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.body }}>
                    Guardar
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* COMUNIDAD */}
          {tab === "comunidad" && (
            <div>
              <h1 style={{ fontFamily: F.heading, fontSize: 36, fontWeight: 300, color: C.primary, marginBottom: 8 }}>Comunidad</h1>
              <p style={{ fontSize: 14, color: C.muted, marginBottom: 36 }}>Conecta con otros alumnos del programa.</p>
              <div style={{ background: "#fff", borderRadius: 20, padding: 40, textAlign: "center", border: "1px solid rgba(0,0,0,0.06)" }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>👥</div>
                <p style={{ color: C.muted, fontSize: 14 }}>El espacio de comunidad se activa cuando el grupo alcanza el mínimo de alumnos.</p>
              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  );
}
