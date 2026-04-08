export function HeroOpcion2() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#FAFAF8", minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        @keyframes o2fu{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:translateY(0)}}
        .o2a{animation:o2fu .8s ease both}
        .o2b{animation:o2fu .8s .15s ease both}
        .o2c{animation:o2fu .8s .3s ease both}
      `}</style>

      {/* Nav */}
      <div style={{ height: 60, background: "rgba(255,255,255,.9)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.07)", display: "flex", alignItems: "center", padding: "0 48px", gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(188,150,64,.4)" }}/>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#1D1D1F" }}>Frecuencia Integral</div>
        <div style={{ fontSize: 9, color: "#86868B", letterSpacing: ".12em", textTransform: "uppercase" }}>Academy</div>
      </div>

      {/* HERO — split layout */}
      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", maxWidth: 1100, margin: "0 auto", width: "100%", padding: "0 48px", alignItems: "center", gap: 80 }}>
        {/* Left — headline */}
        <div>
          <div className="o2a" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(188,150,64,.08)", border: "1px solid rgba(188,150,64,.18)", borderRadius: 9999, padding: "4px 14px", fontSize: 10, color: "#795901", letterSpacing: ".12em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
            ✦ Academia de desarrollo consciente
          </div>
          <h1 className="o2b" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "#1D1D1F", margin: "0 0 24px", letterSpacing: "-.02em" }}>
            La transformación<br/>
            no se aprende.<br/>
            <em style={{ fontStyle: "italic", color: "#795901", fontWeight: 400 }}>Se vive.</em>
          </h1>
          <p className="o2c" style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.8, maxWidth: 380, marginBottom: 32 }}>
            48 semanas · 4 Puertas · 12 Caminos para integrar la presencia en cada área de tu vida.
          </p>
          <div style={{ display: "flex", gap: 10 }}>
            <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "12px 26px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>Comenzar →</button>
            <button style={{ background: "transparent", color: "#6E6E73", border: "1px solid rgba(0,0,0,.12)", padding: "12px 20px", borderRadius: 9999, fontSize: 13, cursor: "pointer" }}>Acceso gratis</button>
          </div>
        </div>

        {/* Right — quiz card */}
        <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 4px 32px rgba(0,0,0,.07)", border: "1px solid rgba(0,0,0,.06)" }}>
          <p style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", marginBottom: 6 }}>¿Qué buscas transformar?</p>
          <p style={{ fontSize: 12, color: "#86868B", marginBottom: 20 }}>Elige lo que resuena contigo</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {[
              { icon: "○", l: "Mi bienestar interior" },
              { icon: "◇", l: "Mi rendimiento deportivo" },
              { icon: "◉", l: "Mis relaciones y entorno" },
            ].map(o => (
              <button key={o.l} style={{ background: "#FAFAF8", border: "1px solid rgba(0,0,0,.08)", color: "#1D1D1F", padding: "12px 18px", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 10, textAlign: "left" }}>
                <span style={{ color: "#795901", fontSize: 16 }}>{o.icon}</span>{o.l}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid rgba(0,0,0,.07)", padding: "20px 48px", display: "flex", justifyContent: "center", gap: 64, background: "#fff" }}>
        {[["48","Semanas"],["4","Puertas"],["12","Caminos"]].map(([n,l])=>(
          <div key={l} style={{ textAlign: "center" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 26, fontWeight: 300, color: "#1D1D1F", lineHeight: 1 }}>{n}</div>
            <div style={{ fontSize: 9, color: "#AEAEB2", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 4 }}>{l}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
