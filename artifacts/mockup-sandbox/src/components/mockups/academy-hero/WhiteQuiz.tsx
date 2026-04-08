import { useState } from "react";

const OPTIONS = [
  {
    id: "bienestar",
    label: "Mi bienestar interior",
    icon: "◎",
    course: "Método TCT",
    sub: "Tu Camino de Transformación",
    desc: "48 semanas de transformación profunda — presencia, emoción, cuerpo y propósito.",
    tag: "Disponible",
    tagColor: "#2b7d7a",
    tagBg: "rgba(43,125,122,.1)",
  },
  {
    id: "rendimiento",
    label: "Mi rendimiento deportivo",
    icon: "◈",
    course: "El Deportista Consciente",
    sub: "Presencia en el Alto Rendimiento",
    desc: "Integra la consciencia en tu entrenamiento. Rinde desde el ser, no desde el ego.",
    tag: "Próximamente",
    tagColor: "#4a7fc1",
    tagBg: "rgba(74,127,193,.1)",
  },
  {
    id: "relaciones",
    label: "Mis relaciones",
    icon: "◉",
    course: "Método TCT",
    sub: "Tu Camino de Transformación",
    desc: "Aprende a relacionarte desde la presencia. Transforma cómo te ves y cómo te ven.",
    tag: "Disponible",
    tagColor: "#2b7d7a",
    tagBg: "rgba(43,125,122,.1)",
  },
];

export function WhiteQuiz() {
  const [selected, setSelected] = useState<string | null>(null);
  const chosen = OPTIONS.find(o => o.id === selected);

  return (
    <div style={{
      minHeight: "100vh",
      background: "#ffffff",
      fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
      display: "flex",
      flexDirection: "column",
      position: "relative",
      overflow: "hidden",
    }}>
      {/* Subtle gold wash at top */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(188,150,64,.06) 0%, transparent 60%)", pointerEvents: "none" }} />

      {/* NAV — A style */}
      <nav style={{
        position: "relative", zIndex: 20,
        height: 56, display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 44px",
        borderBottom: "1px solid #f5f5f7",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="1.5" opacity=".4" />
            <circle cx="40" cy="40" r="3.5" fill="#BC9640" opacity=".9" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 13, color: "#6e6e73", cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{ background: "#1d1d1f", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            Acceso Alumnos
          </button>
        </div>
      </nav>

      {/* MAIN */}
      <div style={{
        flex: 1, display: "flex", flexDirection: "column", alignItems: "center",
        justifyContent: "center", padding: "32px 40px 40px",
        position: "relative", zIndex: 10, textAlign: "center",
      }}>

        {/* Mandala ornament — A style, always visible */}
        <div style={{ marginBottom: 20, opacity: .85 }}>
          <svg width="56" height="56" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="1.5" opacity=".35" />
            <circle cx="40" cy="40" r="26" stroke="#D4AA5A" strokeWidth="1.2" opacity=".45" />
            <circle cx="40" cy="40" r="14" stroke="#BC9640" strokeWidth="1" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
            <path d="M40 14 C45 22 66 28 66 40 C66 52 45 58 40 66 C35 58 14 52 14 40 C14 28 35 22 40 14Z" stroke="#D4AA5A" strokeWidth="1" fill="none" opacity=".3" />
          </svg>
        </div>

        {/* Eyebrow — A style */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "rgba(188,150,64,.07)", border: "1px solid rgba(188,150,64,.18)",
          borderRadius: 9999, padding: "5px 16px",
          fontSize: 11, color: "#795901", letterSpacing: ".1em", textTransform: "uppercase",
          marginBottom: 22, fontWeight: 600,
        }}>
          ✦ Una academia de desarrollo consciente
        </div>

        {/* Headline — A style, always visible */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 400,
          fontSize: "clamp(40px,5.5vw,76px)",
          lineHeight: 1.06,
          letterSpacing: "-.025em",
          color: "#1d1d1f",
          margin: "0 0 20px",
          maxWidth: 760,
        }}>
          Vive desde tu <em style={{ fontStyle: "italic", color: "#795901" }}>frecuencia</em> más alta
        </h1>

        {/* Thin gold separator */}
        <div style={{ width: 48, height: 1, background: "rgba(188,150,64,.4)", margin: "0 auto 28px" }} />

        {/* QUIZ STATE — no selection yet */}
        {!selected ? (
          <div style={{ width: "100%", maxWidth: 720 }}>
            <p style={{ fontSize: 15, color: "#6e6e73", marginBottom: 10, lineHeight: 1.6 }}>
              ¿Qué buscas transformar?
            </p>
            <p style={{ fontSize: 13, color: "#86868b", marginBottom: 36, lineHeight: 1.6 }}>
              Elige lo que resuena contigo — te mostraremos tu camino.
            </p>

            {/* Option pills — white/light style */}
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", justifyContent: "center" }}>
              {OPTIONS.map(opt => (
                <button
                  key={opt.id}
                  onClick={() => setSelected(opt.id)}
                  style={{
                    background: "#fafaf8",
                    border: "1.5px solid rgba(0,0,0,.1)",
                    color: "#1d1d1f",
                    padding: "14px 28px",
                    borderRadius: 14,
                    fontSize: 14,
                    fontWeight: 500,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                    gap: 10,
                    transition: "all .2s",
                    minWidth: 200,
                    boxShadow: "0 1px 4px rgba(0,0,0,.05)",
                  }}
                  onMouseEnter={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "rgba(188,150,64,.07)";
                    el.style.borderColor = "rgba(188,150,64,.4)";
                    el.style.color = "#795901";
                    el.style.boxShadow = "0 4px 16px rgba(121,89,1,.12)";
                  }}
                  onMouseLeave={e => {
                    const el = e.currentTarget as HTMLButtonElement;
                    el.style.background = "#fafaf8";
                    el.style.borderColor = "rgba(0,0,0,.1)";
                    el.style.color = "#1d1d1f";
                    el.style.boxShadow = "0 1px 4px rgba(0,0,0,.05)";
                  }}
                >
                  <span style={{ fontSize: 18, color: "#795901" }}>{opt.icon}</span>
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

        ) : (
          /* RESULT STATE */
          <div style={{ width: "100%", maxWidth: 560 }}>
            {/* Revealed course card */}
            <div style={{
              background: "#fafaf8",
              border: "1px solid rgba(0,0,0,.07)",
              borderRadius: 20,
              padding: "32px 36px",
              boxShadow: "0 8px 40px rgba(0,0,0,.06)",
              marginBottom: 24,
              textAlign: "left",
            }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 16 }}>
                <span style={{
                  background: chosen!.tagBg, color: chosen!.tagColor,
                  borderRadius: 9999, padding: "4px 14px",
                  fontSize: 10, fontWeight: 700, letterSpacing: ".08em", textTransform: "uppercase",
                }}>
                  {chosen!.tag}
                </span>
                <span style={{ fontSize: 12, color: "#86868b" }}>48 semanas</span>
              </div>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: 26, fontWeight: 400, color: "#1d1d1f",
                margin: "0 0 6px", letterSpacing: "-.01em",
              }}>
                {chosen!.course}
              </h2>
              <p style={{ fontSize: 13, color: "#6e6e73", fontStyle: "italic", margin: "0 0 16px" }}>{chosen!.sub}</p>
              <p style={{ fontSize: 14, color: "#4e4637", lineHeight: 1.7, margin: 0 }}>{chosen!.desc}</p>
            </div>

            {/* CTAs */}
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button style={{
                background: "linear-gradient(135deg,#795901,#bc9640)",
                color: "#fff", border: "none",
                padding: "13px 30px", borderRadius: 9999,
                fontSize: 14, fontWeight: 700, cursor: "pointer",
                boxShadow: "0 4px 20px rgba(121,89,1,.22)",
              }}>
                Ver el programa →
              </button>
              <button
                onClick={() => setSelected(null)}
                style={{
                  background: "transparent", color: "#6e6e73",
                  border: "1.5px solid rgba(0,0,0,.1)",
                  padding: "13px 24px", borderRadius: 9999,
                  fontSize: 13, cursor: "pointer",
                }}
              >
                ← Cambiar
              </button>
            </div>
          </div>
        )}
      </div>

      {/* STATS strip — A style, always at bottom */}
      <div style={{
        position: "relative", zIndex: 10,
        borderTop: "1px solid #f5f5f7",
        padding: "24px 44px",
        display: "flex", justifyContent: "center", gap: 0,
      }}>
        <div style={{ display: "flex", gap: 0, maxWidth: 480, width: "100%", justifyContent: "space-around" }}>
          {[["48", "Semanas"], ["4", "Puertas"], ["12", "Caminos"]].map(([n, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 30, fontWeight: 600, color: "#1d1d1f", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 10, color: "#86868b", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 5 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
