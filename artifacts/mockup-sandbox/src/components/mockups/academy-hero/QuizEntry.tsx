import { useState } from "react";

const OPTIONS = [
  { id: "bienestar", label: "Mi bienestar interior", icon: "◎", course: "Método TCT", desc: "48 semanas de transformación profunda — presencia, emoción, cuerpo y propósito.", color: "#2b7d7a" },
  { id: "rendimiento", label: "Mi rendimiento deportivo", icon: "◈", course: "El Deportista Consciente", desc: "Integra la consciencia en tu entrenamiento. Rinde desde el ser, no desde el ego.", color: "#4a7fc1" },
  { id: "relaciones", label: "Mis relaciones", icon: "◉", course: "Método TCT", desc: "Aprende a relacionarte desde la presencia. Transforma cómo te ves y cómo te ven.", color: "#9b59b6" },
];

export function QuizEntry() {
  const [selected, setSelected] = useState<string | null>(null);

  const chosen = OPTIONS.find(o => o.id === selected);

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", position: "relative", overflow: "hidden" }}>
      {/* Subtle background radial */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 50% 60%, rgba(188,150,64,.06) 0%, transparent 70%)", pointerEvents: "none" }} />

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)" }}>Frecuencia Integral</span>
        </div>
        <button style={{ background: "rgba(255,255,255,.06)", backdropFilter: "blur(16px)", color: "rgba(255,255,255,.6)", border: "1px solid rgba(255,255,255,.1)", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Acceso Alumnos
        </button>
      </nav>

      {/* Center content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "20px 48px", position: "relative", zIndex: 10 }}>
        {!selected ? (
          <>
            {/* Question */}
            <div style={{ fontSize: 11, color: "#D4AA5A", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
              ✦ &nbsp; Encuentra tu camino
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4.5vw,60px)", fontWeight: 400, color: "#ffffff", textAlign: "center", lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 16px" }}>
              ¿Qué buscas transformar?
            </h1>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.35)", textAlign: "center", marginBottom: 52, lineHeight: 1.6 }}>
              Elige lo que resuena contigo ahora mismo.
            </p>

            {/* Options */}
            <div style={{ display: "flex", gap: 16, flexWrap: "wrap", justifyContent: "center", maxWidth: 800 }}>
              {OPTIONS.map(opt => (
                <button key={opt.id} onClick={() => setSelected(opt.id)} style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.1)",
                  backdropFilter: "blur(12px)",
                  color: "rgba(255,255,255,.75)",
                  padding: "18px 32px",
                  borderRadius: 16,
                  fontSize: 15,
                  fontWeight: 500,
                  cursor: "pointer",
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  transition: "all .25s",
                  minWidth: 220,
                }}
                  onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(188,150,64,.1)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(188,150,64,.3)"; (e.currentTarget as HTMLButtonElement).style.color = "#D4AA5A"; }}
                  onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,.04)"; (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,.1)"; (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.75)"; }}
                >
                  <span style={{ fontSize: 20 }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </>
        ) : (
          <>
            {/* Result reveal */}
            <div style={{ fontSize: 11, color: "#D4AA5A", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 20 }}>
              ✦ &nbsp; Tu camino
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,52px)", fontWeight: 400, color: "#ffffff", textAlign: "center", margin: "0 0 8px", lineHeight: 1.2 }}>
              {chosen!.course}
            </h2>
            <p style={{ fontSize: 16, color: "rgba(255,255,255,.45)", textAlign: "center", maxWidth: 480, lineHeight: 1.7, margin: "0 0 48px" }}>
              {chosen!.desc}
            </p>
            <div style={{ display: "flex", gap: 12 }}>
              <button style={{ background: "linear-gradient(135deg,#795901,#bc9640)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 24px rgba(121,89,1,.3)" }}>
                Ver el programa →
              </button>
              <button onClick={() => setSelected(null)} style={{ background: "transparent", color: "rgba(255,255,255,.4)", border: "1px solid rgba(255,255,255,.1)", padding: "14px 24px", borderRadius: 9999, fontSize: 13, cursor: "pointer" }}>
                ← Volver
              </button>
            </div>
          </>
        )}
      </div>

      {/* Bottom hint */}
      <div style={{ position: "relative", zIndex: 10, padding: "20px 48px", display: "flex", justifyContent: "center" }}>
        <p style={{ fontSize: 12, color: "rgba(255,255,255,.2)", margin: 0 }}>48 semanas · 4 puertas · Una transformación que no se aprende, se vive</p>
      </div>
    </div>
  );
}
