export function DualNarrative() {
  return (
    <div style={{ minHeight: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", overflow: "hidden" }}>

      {/* LEFT — Emotional / Atmospheric */}
      <div style={{ position: "relative", background: "#0d0d0f", display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Background */}
        <img src="https://images.unsplash.com/photo-1518241353330-0f7941c2d9b5?w=800&q=80&fit=crop" alt="" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", opacity: .12, transform: "scale(1.08)" }} />
        <div style={{ position: "absolute", inset: 0, background: "linear-gradient(135deg,rgba(13,13,15,.9) 40%,rgba(121,89,1,.06) 100%)" }} />

        {/* Nav left */}
        <div style={{ position: "relative", zIndex: 10, padding: "20px 36px", display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#D4AA5A" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity=".9" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.7)", lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 9, color: "rgba(255,255,255,.25)", letterSpacing: ".15em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
          </div>
        </div>

        {/* Center content */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "40px 48px", position: "relative", zIndex: 2 }}>
          {/* Mandala */}
          <svg style={{ width: 180, height: 180, marginBottom: 48, opacity: .6, animation: "spin 90s linear infinite" }} viewBox="0 0 200 200" fill="none">
            <circle cx="100" cy="100" r="96" stroke="#D4AA5A" strokeWidth="1" opacity=".3" />
            <circle cx="100" cy="100" r="60" stroke="#BC9640" strokeWidth="1" opacity=".4" />
            <circle cx="100" cy="100" r="30" stroke="#D4AA5A" strokeWidth="1" opacity=".5" />
            <circle cx="100" cy="100" r="6" fill="#D4AA5A" opacity=".8" />
            {[0,60,120,180,240,300].map(deg => {
              const rad = (deg * Math.PI) / 180;
              const x2 = 100 + 96 * Math.cos(rad);
              const y2 = 100 + 96 * Math.sin(rad);
              return <line key={deg} x1="100" y1="100" x2={x2} y2={y2} stroke="#D4AA5A" strokeWidth=".8" opacity=".25" />;
            })}
          </svg>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>

          <blockquote style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(20px,2.2vw,28px)", fontWeight: 300, color: "rgba(255,255,255,.75)", lineHeight: 1.5, margin: "0 0 24px", fontStyle: "italic", letterSpacing: "-.01em" }}>
            "La frecuencia más alta no se alcanza. Se habita."
          </blockquote>
          <p style={{ fontSize: 13, color: "#D4AA5A", letterSpacing: ".08em", margin: 0 }}>— Quico Esteban, fundador</p>
        </div>

        {/* Bottom left stats */}
        <div style={{ position: "relative", zIndex: 2, padding: "24px 48px", borderTop: "1px solid rgba(255,255,255,.05)", display: "flex", gap: 32 }}>
          {[["48", "Semanas"], ["4", "Puertas"], ["12", "Caminos"]].map(([n, label]) => (
            <div key={label}>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, fontWeight: 600, color: "#D4AA5A", lineHeight: 1 }}>{n}</div>
              <div style={{ fontSize: 9, color: "rgba(255,255,255,.3)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 3 }}>{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* RIGHT — Action / Clarity */}
      <div style={{ background: "#fafaf8", display: "flex", flexDirection: "column" }}>
        {/* Nav right */}
        <div style={{ padding: "20px 36px", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 24, borderBottom: "1px solid rgba(0,0,0,.06)" }}>
          {["El Método", "Cursos", "El Equipo"].map(item => (
            <span key={item} style={{ fontSize: 12, color: "#6E6E73", cursor: "pointer" }}>{item}</span>
          ))}
          <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 700, cursor: "pointer" }}>
            Acceso Alumnos
          </button>
        </div>

        <div style={{ flex: 1, display: "flex", flexDirection: "column", justifyContent: "center", padding: "48px 52px" }}>
          <div style={{ fontSize: 10, color: "#795901", letterSpacing: ".16em", textTransform: "uppercase", fontWeight: 700, marginBottom: 24 }}>
            ✦ &nbsp; Elige tu formación
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,3.2vw,44px)", fontWeight: 400, color: "#1D1D1F", lineHeight: 1.15, letterSpacing: "-.02em", margin: "0 0 40px" }}>
            Vive desde tu<br /><em style={{ color: "#795901", fontStyle: "italic" }}>frecuencia</em> más alta
          </h1>

          {/* Course cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 36 }}>
            {[
              { title: "Método TCT", sub: "Tu Camino de Transformación", tag: "Disponible", color: "#2b7d7a", tagBg: "rgba(43,125,122,.1)" },
              { title: "El Deportista Consciente", sub: "Presencia en el Alto Rendimiento", tag: "Próximamente", color: "#4a7fc1", tagBg: "rgba(74,127,193,.1)" },
            ].map(c => (
              <div key={c.title} style={{ background: "#fff", borderRadius: 14, padding: "20px 24px", border: "1px solid rgba(0,0,0,.07)", boxShadow: "0 2px 12px rgba(0,0,0,.05)", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", transition: "box-shadow .2s" }}
                onMouseEnter={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0,0,0,.1)"}
                onMouseLeave={e => (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(0,0,0,.05)"}
              >
                <div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: "#1D1D1F", fontFamily: "'Playfair Display', serif", marginBottom: 4 }}>{c.title}</div>
                  <div style={{ fontSize: 12, color: "#6E6E73" }}>{c.sub}</div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <span style={{ background: c.tagBg, color: c.color, borderRadius: 9999, padding: "4px 12px", fontSize: 10, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", whiteSpace: "nowrap" }}>{c.tag}</span>
                  <span style={{ color: "#6E6E73", fontSize: 16 }}>→</span>
                </div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button style={{ background: "linear-gradient(135deg,#795901,#bc9640)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 4px 20px rgba(121,89,1,.2)" }}>
              Explorar el programa →
            </button>
            <button style={{ background: "transparent", color: "#6E6E73", border: "1px solid rgba(0,0,0,.12)", padding: "13px 22px", borderRadius: 9999, fontSize: 13, cursor: "pointer" }}>
              Ver el Método
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
