export function Manifesto() {
  const lines = [
    { text: "La transformación", align: "left" as const },
    { text: "no se aprende.", align: "right" as const },
    { text: "Se vive.", align: "center" as const, gold: true },
  ];

  return (
    <div style={{ minHeight: "100vh", background: "#fafaf8", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", display: "flex", flexDirection: "column", position: "relative" }}>
      {/* Nav — ultra minimal */}
      <nav style={{ padding: "0 48px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", borderBottom: "1px solid rgba(0,0,0,.05)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#795901" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#795901" opacity=".9" />
          </svg>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1D1D1F", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
        </div>
        <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 13, color: "#6E6E73", cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "9px 22px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: ".01em" }}>
            Acceso Alumnos
          </button>
        </div>
      </nav>

      {/* Main — typographic manifesto */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 64px" }}>
        {/* Eyebrow */}
        <div style={{ fontSize: 11, color: "#795901", letterSpacing: ".2em", textTransform: "uppercase", fontWeight: 700, marginBottom: 48 }}>
          ✦ &nbsp;Academia de Desarrollo Consciente
        </div>

        {/* Manifesto lines */}
        <div style={{ marginBottom: 60 }}>
          {lines.map((line, i) => (
            <div key={i} style={{
              textAlign: line.align,
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(52px,7.5vw,104px)",
              fontWeight: 300,
              lineHeight: 1.0,
              letterSpacing: "-.03em",
              color: line.gold ? "#795901" : "#1D1D1F",
              fontStyle: line.gold ? "italic" : "normal",
              marginBottom: "0.05em",
            }}>
              {line.text}
            </div>
          ))}
        </div>

        {/* Gold separator */}
        <div style={{ width: "100%", height: 1, background: "linear-gradient(to right, transparent, #D4AA5A 20%, #D4AA5A 80%, transparent)", marginBottom: 48 }} />

        {/* Below fold — info + CTA */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
            <p style={{ fontSize: 16, color: "#6E6E73", lineHeight: 1.7, maxWidth: 420, margin: "0 0 32px" }}>
              48 semanas. 4 puertas. Una guía para vivir desde tu frecuencia más alta — en el deporte, las relaciones y la vida cotidiana.
            </p>
            <div style={{ display: "flex", gap: 48 }}>
              {[["48", "Semanas"], ["4", "Puertas"], ["12", "Caminos"]].map(([n, label]) => (
                <div key={label}>
                  <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 600, color: "#795901", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, color: "#6E6E73", letterSpacing: ".12em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
              Explorar el programa →
            </button>
            <button style={{ background: "transparent", color: "#1D1D1F", border: "1.5px solid rgba(0,0,0,.15)", padding: "14px 28px", borderRadius: 9999, fontSize: 14, fontWeight: 500, cursor: "pointer" }}>
              Ver el Método
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
