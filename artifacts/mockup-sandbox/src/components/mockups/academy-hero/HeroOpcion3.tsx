export function HeroOpcion3() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#fff", minHeight: "100vh", display: "flex", flexDirection: "column", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        @keyframes o3fu{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
        @keyframes spin-cw  { from { transform: rotate(0deg);   } to { transform: rotate(360deg);  } }
        @keyframes spin-ccw { from { transform: rotate(0deg);   } to { transform: rotate(-360deg); } }
        @keyframes breathe  { 0%,100%{opacity:.35} 50%{opacity:.7} }
        .o3a{animation:o3fu .7s ease both}
        .o3b{animation:o3fu .7s .12s ease both}
        .o3c{animation:o3fu .7s .24s ease both}
        .o3d{animation:o3fu .7s .36s ease both}
        .spin-cw  { animation: spin-cw  18s linear infinite; transform-origin: center; }
        .spin-ccw { animation: spin-ccw 12s linear infinite; transform-origin: center; }
        .breathe  { animation: breathe  4s ease-in-out infinite; }
      `}</style>

      {/* ── NAV ── */}
      <div style={{ height: 60, borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", padding: "0 48px", gap: 10 }}>
        {/* Logo SVG — same as codebase */}
        <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
          <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="2" opacity=".5"/>
          <circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="1.5" opacity=".4"/>
          <circle cx="40" cy="40" r="3.5" fill="#BC9640" opacity=".9"/>
        </svg>
        <div style={{ textAlign: "left" }}>
          <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#1D1D1F", lineHeight: 1 }}>Frecuencia Integral</div>
          <div style={{ fontSize: 9, color: "#6E6E73", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
        </div>
        <div style={{ flex: 1 }}/>
        <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "7px 18px", borderRadius: 9999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>Acceso Alumnos</button>
      </div>

      {/* ── HERO ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "40px 64px 32px", textAlign: "center" }}>

        {/* ANIMATED CIRCULAR LOGO SVG */}
        <div className="o3a" style={{ marginBottom: 32, position: "relative", width: 80, height: 80 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0 }}>
            {/* Static outer ring */}
            <circle cx="40" cy="40" r="38" stroke="rgba(188,150,64,.15)" strokeWidth="1"/>
          </svg>
          {/* Rotating outer dashed ring */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="spin-cw" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="34" stroke="rgba(188,150,64,.35)" strokeWidth="1" strokeDasharray="4 8"/>
          </svg>
          {/* Rotating inner ring (opposite) */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="spin-ccw" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="24" stroke="rgba(212,170,90,.3)" strokeWidth="1" strokeDasharray="2 6"/>
          </svg>
          {/* Static middle ring */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="16" stroke="rgba(188,150,64,.2)" strokeWidth="1"/>
          </svg>
          {/* Center dot breathing */}
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" className="breathe" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="3.5" fill="#BC9640"/>
          </svg>
        </div>

        {/* Label */}
        <div className="o3a" style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#795901", fontWeight: 700, marginBottom: 28 }}>
          Academia de desarrollo consciente
        </div>

        {/* HEADLINE */}
        <h1 className="o3b" style={{ margin: "0 0 8px" }}>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,5vw,68px)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-.02em", color: "#1D1D1F", display: "block" }}>
            La transformación no se aprende.
          </span>
          <span style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,6vw,80px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.02, letterSpacing: "-.02em", color: "#795901", display: "block" }}>
            Se vive.
          </span>
        </h1>

        {/* Divider */}
        <div className="o3c" style={{ width: 48, height: 1, background: "rgba(188,150,64,.3)", margin: "28px auto" }}/>

        {/* SHORT TEXT — sentido de la academia */}
        <p className="o3d" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(15px,1.5vw,18px)", color: "#6E6E73", lineHeight: 1.75, maxWidth: 520, margin: 0 }}>
          Una escuela de vida donde la sabiduría milenaria y la presencia<br/>
          se integran en cada área de tu existencia.
        </p>
      </div>

    </div>
  );
}
