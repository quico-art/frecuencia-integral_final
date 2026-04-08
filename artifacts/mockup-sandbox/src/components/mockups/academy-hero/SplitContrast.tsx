export function SplitContrast() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "grid",
        gridTemplateColumns: "1fr 1fr",
        fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Nav — floats over both halves */}
      <nav style={{
        position: "absolute", top: 0, left: 0, right: 0, zIndex: 100, height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 48px",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="34" height="34" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="2" opacity=".6" />
            <circle cx="40" cy="40" r="3.5" fill="#D4AA5A" opacity=".9" />
          </svg>
          <span style={{ fontSize: 15, fontWeight: 600, color: "#fff", letterSpacing: "-.01em" }}>Frecuencia Integral</span>
          <span style={{ fontSize: 8, color: "rgba(255,255,255,.35)", letterSpacing: ".15em", textTransform: "uppercase", marginLeft: 2 }}>Academy</span>
        </div>
        <button style={{ background: "rgba(255,255,255,.1)", backdropFilter: "blur(8px)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
          Acceso Alumnos
        </button>
      </nav>

      {/* LEFT — dark */}
      <div style={{
        background: "#1a1714",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "120px 60px 80px",
        position: "relative",
        overflow: "hidden",
      }}>
        {/* Subtle radial glow */}
        <div style={{ position: "absolute", bottom: -120, right: -120, width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle,rgba(188,150,64,.12) 0%,transparent 70%)", pointerEvents: "none" }} />

        <div style={{ display: "inline-block", fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: "#BC9640", fontWeight: 700, marginBottom: 28, background: "rgba(188,150,64,.08)", border: "1px solid rgba(188,150,64,.15)", borderRadius: 9999, padding: "5px 14px" }}>
          ✦ Desarrollo Consciente
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontWeight: 400, fontSize: "clamp(40px,5.5vw,68px)", lineHeight: 1.08, letterSpacing: "-.01em", color: "#ffffff", margin: "0 0 20px" }}>
          Vive desde<br />tu{" "}
          <em style={{ fontStyle: "italic", color: "#D4AA5A" }}>frecuencia</em><br />
          más alta
        </h1>

        <p style={{ fontSize: 16, color: "rgba(255,255,255,.45)", lineHeight: 1.7, maxWidth: 360, margin: "0 0 44px" }}>
          48 semanas. 4 puertas. Una transformación real — no una técnica, sino un camino de vida.
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <button style={{ background: "linear-gradient(135deg,#795901,#bc9640)", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: "pointer", alignSelf: "flex-start", boxShadow: "0 8px 24px rgba(121,89,1,.25)" }}>
            Explorar el programa →
          </button>
          <button style={{ background: "transparent", color: "rgba(255,255,255,.5)", border: "none", padding: "4px 0", fontSize: 13, fontWeight: 500, cursor: "pointer", textAlign: "left", textDecoration: "underline", textDecorationColor: "rgba(255,255,255,.2)" }}>
            Ver el Método
          </button>
        </div>

        {/* Stat strip vertical */}
        <div style={{ display: "flex", gap: 28, marginTop: 56, paddingTop: 32, borderTop: "1px solid rgba(255,255,255,.07)" }}>
          {[["48", "Semanas"], ["4", "Puertas"], ["12", "Caminos"]].map(([n, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 600, color: "#D4AA5A", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", letterSpacing: ".08em", textTransform: "uppercase", marginTop: 4 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — off-white */}
      <div style={{
        background: "#faf7f2",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "80px 48px",
        position: "relative",
      }}>
        {/* Floating mandala */}
        <div style={{ position: "relative", marginBottom: 32 }}>
          <svg width="260" height="260" viewBox="0 0 400 400" fill="none" style={{ animation: "spin 60s linear infinite" }}>
            <circle cx="200" cy="200" r="196" stroke="#BC9640" strokeWidth="2" opacity=".25" />
            <circle cx="200" cy="200" r="130" stroke="#BC9640" strokeWidth="1.5" opacity=".35" />
            <circle cx="200" cy="200" r="80" stroke="#D4AA5A" strokeWidth="1.5" opacity=".4" />
            <circle cx="200" cy="200" r="48" stroke="#BC9640" strokeWidth="1.2" opacity=".45" />
            <circle cx="200" cy="200" r="10" fill="#D4AA5A" opacity=".9" />
            {[0,60,120,180,240,300].map(deg => {
              const rad = (deg * Math.PI) / 180;
              const x1 = 200 + 130 * Math.cos(rad);
              const y1 = 200 + 130 * Math.sin(rad);
              return <line key={deg} x1="200" y1="200" x2={x1} y2={y1} stroke="#D4AA5A" strokeWidth="1" opacity=".35" />;
            })}
            {[0,60,120,180,240,300].map(deg => {
              const rad = (deg * Math.PI) / 180;
              const x = 200 + 130 * Math.cos(rad);
              const y = 200 + 130 * Math.sin(rad);
              return <circle key={`c${deg}`} cx={x} cy={y} r="7" fill="#BC9640" opacity=".7" />;
            })}
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>

        {/* Card pills */}
        <div style={{ display: "flex", flexDirection: "column", gap: 14, width: "100%", maxWidth: 280 }}>
          {[
            { icon: "🌿", label: "Puerta Blanca", sub: "Semanas 1–12 · Despertar" },
            { icon: "🔥", label: "Puerta Roja", sub: "Semanas 13–24 · Purificación" },
            { icon: "🔵", label: "Puerta Azul", sub: "Semanas 25–36 · Integración" },
            { icon: "🌈", label: "Puerta Arcoíris", sub: "Semanas 37–48 · Expresión" },
          ].map((item, i) => (
            <div key={item.label} style={{
              background: "#fff",
              borderRadius: 12,
              padding: "14px 18px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              boxShadow: "0 2px 12px rgba(28,24,20,.06)",
              border: "1px solid rgba(209,197,178,.3)",
              transform: `translateX(${i % 2 === 0 ? "-8px" : "8px"})`,
            }}>
              <span style={{ fontSize: 20 }}>{item.icon}</span>
              <div>
                <div style={{ fontSize: 13, fontWeight: 700, color: "#1d1d1f" }}>{item.label}</div>
                <div style={{ fontSize: 11, color: "#86868b", marginTop: 2 }}>{item.sub}</div>
              </div>
              <div style={{ marginLeft: "auto", width: 6, height: 6, borderRadius: "50%", background: "#D4AA5A", opacity: .7 }} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
