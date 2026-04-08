import { useState } from "react";

const PUERTAS = [
  {
    num: "I",
    title: "Presencia",
    subtitle: "Semanas 1–12",
    desc: "Aprende a habitar el momento. La base de toda transformación es la atención plena aplicada.",
    color: "#1a2f2e",
    accent: "#2b7d7a",
    light: "rgba(43,125,122,.12)",
    img: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?w=600&q=80&fit=crop",
  },
  {
    num: "II",
    title: "Emoción",
    subtitle: "Semanas 13–24",
    desc: "Integra lo que sientes. Cada emoción es información valiosa, no un obstáculo.",
    color: "#2a1e2e",
    accent: "#9b59b6",
    light: "rgba(155,89,182,.12)",
    img: "https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=600&q=80&fit=crop",
  },
  {
    num: "III",
    title: "Cuerpo",
    subtitle: "Semanas 25–36",
    desc: "El cuerpo es el mapa. A través del movimiento consciente, la sabiduría emerge.",
    color: "#1e2a1a",
    accent: "#795901",
    light: "rgba(121,89,1,.12)",
    img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=600&q=80&fit=crop",
  },
  {
    num: "IV",
    title: "Propósito",
    subtitle: "Semanas 37–48",
    desc: "Actúa desde tu ser más auténtico. El propósito no se busca, se descubre viviendo.",
    color: "#1c1a12",
    accent: "#D4AA5A",
    light: "rgba(212,170,90,.12)",
    img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=80&fit=crop",
  },
];

export function PuertasGrid() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div style={{ minHeight: "100vh", background: "#09090b", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", display: "flex", flexDirection: "column" }}>
      {/* Nav */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 20, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
          </svg>
          <span style={{ fontSize: 13, fontWeight: 600, color: "rgba(255,255,255,.7)", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 12, color: "rgba(255,255,255,.35)", cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{ background: "linear-gradient(135deg,#795901,#bc9640)", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Acceso Alumnos
          </button>
        </div>
      </nav>

      {/* Eyebrow */}
      <div style={{ position: "absolute", top: 80, left: 0, right: 0, zIndex: 10, display: "flex", justifyContent: "center" }}>
        <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(188,150,64,.08)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 9999, padding: "6px 18px", fontSize: 10, color: "#D4AA5A", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700 }}>
          ✦ &nbsp; Las 4 Puertas de Transformación
        </div>
      </div>

      {/* 4-column grid — the product IS the hero */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4,1fr)", marginTop: 64 }}>
        {PUERTAS.map((p, i) => (
          <div
            key={p.num}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            style={{
              position: "relative",
              overflow: "hidden",
              cursor: "pointer",
              transition: "flex .5s ease",
              flex: hovered === i ? 1.8 : 1,
              minHeight: "calc(100vh - 64px)",
            }}
          >
            {/* Bg image */}
            <img src={p.img} alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: hovered === i ? .25 : .1, transition: "opacity .5s ease", transform: "scale(1.05)" }} />
            <div style={{ position: "absolute", inset: 0, background: `linear-gradient(to bottom, ${p.color}cc 0%, ${p.color} 100%)`, transition: "opacity .4s" }} />

            {/* Content */}
            <div style={{ position: "relative", zIndex: 2, height: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "40px 28px" }}>
              {/* Number */}
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: hovered === i ? 80 : 64, fontWeight: 300, color: p.accent, opacity: hovered === i ? 1 : .4, lineHeight: 1, marginBottom: 12, transition: "all .4s ease" }}>
                {p.num}
              </div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 400, color: "#fff", margin: "0 0 4px", letterSpacing: "-.01em" }}>{p.title}</h3>
              <div style={{ fontSize: 10, color: p.accent, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>{p.subtitle}</div>
              {/* Description — visible on hover */}
              <div style={{ overflow: "hidden", maxHeight: hovered === i ? 100 : 0, opacity: hovered === i ? 1 : 0, transition: "all .4s ease" }}>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.65, margin: 0 }}>{p.desc}</p>
              </div>
              {/* CTA line */}
              <div style={{ width: 32, height: 2, background: p.accent, marginTop: 20, transition: "width .4s ease", ...(hovered === i ? { width: 56 } : {}) }} />
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 30, background: "rgba(9,9,11,.85)", backdropFilter: "blur(20px)", borderTop: "1px solid rgba(255,255,255,.06)", padding: "16px 48px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.35)", margin: 0 }}>Elige tu puerta. El camino se revela al caminar.</p>
        <button style={{ background: "linear-gradient(135deg,#795901,#bc9640)", color: "#fff", border: "none", padding: "11px 28px", borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
          Explorar el programa →
        </button>
      </div>
    </div>
  );
}
