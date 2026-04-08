export function HeroOpcion1() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#ffffff", minHeight: "100vh", display: "flex", flexDirection: "column", position: "relative", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        @keyframes fu{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .o1-a{animation:fu .7s ease both}
        .o1-b{animation:fu .7s .1s ease both}
        .o1-c{animation:fu .7s .2s ease both}
        .o1-d{animation:fu .7s .3s ease both}
      `}</style>

      {/* Nav placeholder */}
      <div style={{ height: 60, borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", padding: "0 48px", gap: 8 }}>
        <div style={{ width: 24, height: 24, borderRadius: "50%", border: "1px solid rgba(188,150,64,.4)" }}/>
        <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, color: "#1D1D1F" }}>Frecuencia Integral</div>
        <div style={{ fontSize: 9, color: "#86868B", letterSpacing: ".12em", textTransform: "uppercase" }}>Academy</div>
      </div>

      {/* HERO */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "48px 48px 32px", textAlign: "center", gap: 0 }}>
        {/* Eyebrow */}
        <div className="o1-a" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#795901", fontWeight: 700, marginBottom: 36 }}>
          Una academia de desarrollo consciente
        </div>

        {/* Headline — stacked, large, editorial */}
        <h1 className="o1-b" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(44px,6vw,80px)", fontWeight: 300, lineHeight: 1.08, letterSpacing: "-.025em", color: "#1D1D1F", margin: "0 0 32px", maxWidth: 800 }}>
          La transformación<br/>
          no se <em style={{ fontStyle: "italic", color: "#795901" }}>aprende.</em><br/>
          Se <em style={{ fontStyle: "italic", fontWeight: 400 }}>vive.</em>
        </h1>

        {/* Thin separator */}
        <div className="o1-c" style={{ width: 1, height: 48, background: "rgba(188,150,64,.3)", margin: "0 auto 32px" }}/>

        {/* Quiz label */}
        <p className="o1-c" style={{ fontSize: 14, color: "#6E6E73", marginBottom: 20 }}>¿Qué buscas transformar?</p>

        {/* Pills */}
        <div className="o1-d" style={{ display: "flex", gap: 10, flexWrap: "wrap", justifyContent: "center" }}>
          {["Mi bienestar interior", "Mi rendimiento deportivo", "Mis relaciones y entorno"].map(l => (
            <button key={l} style={{ background: "#FAFAF8", border: "1px solid rgba(0,0,0,.1)", color: "#1D1D1F", padding: "12px 22px", borderRadius: 12, fontSize: 13, fontWeight: 500, cursor: "pointer" }}>{l}</button>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div style={{ borderTop: "1px solid #f5f5f7", padding: "20px 48px", display: "flex", justifyContent: "center", gap: 64 }}>
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
