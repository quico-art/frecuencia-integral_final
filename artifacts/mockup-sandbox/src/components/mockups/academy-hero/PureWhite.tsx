export function PureWhite() {
  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#ffffff",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        padding: "80px 40px 60px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Very subtle gradient wash */}
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 80% 60% at 50% 0%,rgba(188,150,64,.06) 0%,transparent 65%)", pointerEvents: "none" }} />

      {/* Nav strip */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, height: 52, display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px", borderBottom: "1px solid #f5f5f7" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="1.5" opacity=".4" />
            <circle cx="40" cy="40" r="3.5" fill="#BC9640" opacity=".9" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#1d1d1f", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
        </div>
        <div style={{ display: "flex", gap: 24 }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 13, color: "#6e6e73", cursor: "pointer" }}>{item}</span>
          ))}
        </div>
        <button style={{ background: "#1d1d1f", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer", letterSpacing: ".02em" }}>
          Acceso Alumnos
        </button>
      </nav>

      {/* Small ornament */}
      <div style={{ marginBottom: 28, opacity: .9 }}>
        <svg width="64" height="64" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="1.5" opacity=".35" />
          <circle cx="40" cy="40" r="26" stroke="#D4AA5A" strokeWidth="1.2" opacity=".45" />
          <circle cx="40" cy="40" r="14" stroke="#BC9640" strokeWidth="1" opacity=".5" />
          <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
          <path d="M40 14 C45 22 66 28 66 40 C66 52 45 58 40 66 C35 58 14 52 14 40 C14 28 35 22 40 14Z" stroke="#D4AA5A" strokeWidth="1" fill="none" opacity=".3" />
        </svg>
      </div>

      {/* Eyebrow */}
      <div style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(188,150,64,.07)", border: "1px solid rgba(188,150,64,.18)", borderRadius: 9999, padding: "5px 16px", fontSize: 11, color: "#795901", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 28, fontWeight: 600 }}>
        ✦ Una academia de desarrollo consciente
      </div>

      {/* Headline */}
      <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(52px,7vw,88px)", lineHeight: 1.05, letterSpacing: "-.02em", color: "#1d1d1f", margin: "0 0 24px", maxWidth: 780 }}>
        Vive desde tu<br />
        <em style={{ fontStyle: "italic", color: "#795901" }}>frecuencia</em>
        <span style={{ color: "#1d1d1f" }}> más alta</span>
      </h1>

      {/* Subheadline */}
      <p style={{ fontSize: "clamp(16px,2vw,20px)", color: "#6e6e73", lineHeight: 1.65, maxWidth: 560, margin: "0 0 44px", fontWeight: 400 }}>
        48 semanas de transformación interior. Presencia real, no técnicas — aplicada a tu vida, tu deporte y tus relaciones.
      </p>

      {/* CTAs */}
      <div style={{ display: "flex", gap: 14, justifyContent: "center", marginBottom: 60 }}>
        <button style={{ background: "#1d1d1f", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer", letterSpacing: "-.01em" }}>
          Explorar el programa
        </button>
        <button style={{ background: "transparent", color: "#795901", border: "1.5px solid rgba(188,150,64,.3)", padding: "14px 32px", borderRadius: 9999, fontSize: 15, fontWeight: 500, cursor: "pointer" }}>
          Conocer el método →
        </button>
      </div>

      {/* Stats strip */}
      <div style={{ display: "flex", gap: 0, borderTop: "1px solid #f5f5f7", paddingTop: 32, width: "100%", maxWidth: 480, justifyContent: "space-around" }}>
        {[["48", "Semanas"], ["4", "Puertas de transformación"], ["12", "Tradiciones integradas"]].map(([n, label]) => (
          <div key={label} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 36, fontWeight: 600, color: "#1d1d1f", lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 11, color: "#86868b", letterSpacing: ".06em", textTransform: "uppercase", marginTop: 6, maxWidth: 100 }}>{label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
