export function Cinematic() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#09090b",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Atmospheric layered background */}
      <div style={{ position: "absolute", inset: 0 }}>
        {/* Base image */}
        <img
          src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=1600&q=80&fit=crop"
          alt=""
          style={{ width: "100%", height: "100%", objectFit: "cover", opacity: .14, transform: "scale(1.05)" }}
        />
        {/* Gradient layers */}
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom,rgba(9,9,11,.6) 0%,rgba(9,9,11,.2) 40%,rgba(9,9,11,.85) 100%)" }} />
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 50% 30%,rgba(188,150,64,.08) 0%,transparent 60%)" }} />
        {/* Noise/grain texture via box-shadow grid */}
      </div>

      {/* Nav */}
      <nav style={{ position: "relative", zIndex: 10, height: 64, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="30" height="30" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
          </svg>
          <span style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.75)", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
        </div>
        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 13, color: "rgba(255,255,255,.4)", cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{
            background: "rgba(255,255,255,.06)",
            backdropFilter: "blur(16px)",
            color: "rgba(255,255,255,.75)",
            border: "1px solid rgba(255,255,255,.1)",
            padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer"
          }}>
            Acceso Alumnos
          </button>
        </div>
      </nav>

      {/* Main content — centered vertically */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", zIndex: 10, padding: "20px 48px 140px", textAlign: "center" }}>
        {/* Eyebrow tag */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          background: "rgba(188,150,64,.08)", border: "1px solid rgba(188,150,64,.2)",
          borderRadius: 9999, padding: "6px 18px", marginBottom: 36,
          fontSize: 10, color: "#D4AA5A", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700
        }}>
          ✦ &nbsp; Frecuencia Integral Academy
        </div>

        {/* Headline — massive, almost full-width */}
        <h1 style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontWeight: 300,
          fontSize: "clamp(56px,9vw,120px)",
          lineHeight: .98,
          letterSpacing: "-.03em",
          color: "#ffffff",
          margin: "0 0 28px",
          maxWidth: 960,
        }}>
          Vive desde tu<br />
          <em style={{ fontStyle: "italic", color: "#D4AA5A", fontWeight: 400 }}>frecuencia</em><br />
          más alta
        </h1>

        {/* Thin separator */}
        <div style={{ width: 48, height: 1, background: "rgba(212,170,90,.35)", margin: "0 auto 28px" }} />

        <p style={{ fontSize: 16, color: "rgba(255,255,255,.4)", lineHeight: 1.7, maxWidth: 480, margin: "0 0 0" }}>
          48 semanas · 4 puertas · Una transformación que no se aprende, se vive
        </p>
      </div>

      {/* Bottom glass bar */}
      <div style={{
        position: "absolute", bottom: 0, left: 0, right: 0,
        background: "rgba(255,255,255,.04)",
        backdropFilter: "blur(24px)",
        borderTop: "1px solid rgba(255,255,255,.07)",
        padding: "20px 48px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        zIndex: 20,
      }}>
        {/* Stats */}
        <div style={{ display: "flex", gap: 36 }}>
          {[["48", "Semanas"], ["4", "Puertas"], ["12", "Caminos"]].map(([n, label]) => (
            <div key={label} style={{ textAlign: "center" }}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, fontWeight: 600, color: "#D4AA5A", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>

        {/* Center divider */}
        <div style={{ width: 1, height: 32, background: "rgba(255,255,255,.1)" }} />

        {/* CTAs */}
        <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
          <button style={{
            background: "linear-gradient(135deg,#795901,#bc9640)",
            color: "#fff", border: "none",
            padding: "12px 28px", borderRadius: 9999,
            fontSize: 13, fontWeight: 700, cursor: "pointer",
            boxShadow: "0 4px 24px rgba(121,89,1,.3)"
          }}>
            Explorar el programa →
          </button>
          <button style={{
            background: "transparent",
            color: "rgba(255,255,255,.45)",
            border: "1px solid rgba(255,255,255,.12)",
            padding: "12px 24px", borderRadius: 9999,
            fontSize: 13, fontWeight: 500, cursor: "pointer",
          }}>
            Ver el Método
          </button>
        </div>

        {/* Mandala small */}
        <svg width="44" height="44" viewBox="0 0 80 80" fill="none" style={{ opacity: .5 }}>
          <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="1.5" />
          <circle cx="40" cy="40" r="20" stroke="#BC9640" strokeWidth="1" />
          <circle cx="40" cy="40" r="3.5" fill="#D4AA5A" />
        </svg>
      </div>
    </div>
  );
}
