export function Alternativa() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#F8F6F1", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600&display=swap');
        @keyframes fadeUp{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
        .dep-alt-btn:hover { background: #1D1D1F !important; }
      `}</style>

      {/* Nav — frosted glass clara */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, height: 56, background: "rgba(248,246,241,0.88)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,.06)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 44px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="2" opacity=".6" />
            <circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="1.5" opacity=".5" />
            <circle cx="40" cy="40" r="3.5" fill="#BC9640" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 400, color: "#1D1D1F", lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 8, color: "#86868B", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <span style={{ fontSize: 12, color: "#86868B", cursor: "pointer" }}>← Academia</span>
          <span style={{ fontSize: 12, color: "#86868B", cursor: "pointer" }}>Método TCT</span>
          <button style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "7px 18px", borderRadius: 9999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            Área Alumnos
          </button>
        </div>
      </nav>

      {/* Hero — split layout claro */}
      <div style={{ height: "100vh", display: "grid", gridTemplateColumns: "1fr 1fr", position: "relative" }}>

        {/* Columna izquierda — texto */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", padding: "80px 56px 60px 64px", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36, animation: "fadeUp .6s ease both" }}>
            <span style={{ fontSize: 10, letterSpacing: ".18em", textTransform: "uppercase", color: "#BC9640", fontWeight: 700 }}>🏅 Curso próximamente disponible</span>
          </div>

          {/* Headline */}
          <div style={{ animation: "fadeUp .7s .1s ease both", opacity: 0 }}>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 300, lineHeight: 1.05, color: "#1D1D1F", margin: "0 0 6px", letterSpacing: "-.5px" }}>
              El Deportista
            </h1>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: 56, fontWeight: 300, fontStyle: "italic", lineHeight: 1.05, color: "#2D7DD2", margin: "0 0 20px", letterSpacing: "-.5px" }}>
              Consciente
            </h1>
          </div>

          {/* Subtítulo */}
          <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, fontStyle: "italic", color: "#86868B", margin: "0 0 28px", fontWeight: 300, animation: "fadeUp .7s .2s ease both", opacity: 0 }}>
            Más allá del resultado
          </p>

          {/* Separador */}
          <div style={{ width: 48, height: 1, background: "#BC9640", marginBottom: 28, opacity: .5, animation: "fadeUp .7s .25s ease both" }} />

          {/* Descripción */}
          <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.8, maxWidth: 420, margin: "0 0 40px", fontWeight: 400, animation: "fadeUp .7s .3s ease both", opacity: 0 }}>
            Presencia aplicada al deporte de élite. Un programa diseñado para trascender la presión del rendimiento y encontrar la maestría personal en el terreno de juego y en la vida.
          </p>

          {/* CTA */}
          <div style={{ animation: "fadeUp .7s .4s ease both", opacity: 0 }}>
            <button className="dep-alt-btn" style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "background .2s", letterSpacing: ".01em" }}>
              Unirme a la lista de espera →
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 40, marginTop: 52, animation: "fadeUp .7s .5s ease both", opacity: 0 }}>
            {[["Élite", "Formación"], ["Sesiones", "En vivo"], ["Comunidad", "Exclusiva"]].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#1D1D1F" }}>{n}</div>
                <div style={{ fontSize: 10, color: "#86868B", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — imagen */}
        <div style={{ position: "relative", overflow: "hidden" }}>
          {/* Foto de fondo */}
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&fit=crop"
            alt="Deportista consciente"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) brightness(.95)" }}
          />
          {/* Overlay gradiente lateral para fusión */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #F8F6F1 0%, transparent 18%)" }} />
          {/* Overlay inferior oscuro */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(248,246,241,.9) 0%, transparent 100%)" }} />

          {/* Cita sobre la foto */}
          <div style={{ position: "absolute", bottom: 52, left: 48, right: 32 }}>
            <div style={{ width: 36, height: 1, background: "#BC9640", marginBottom: 16, opacity: .7 }} />
            <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "#1D1D1F", lineHeight: 1.6, fontWeight: 300 }}>
              "La verdadera victoria<br />es el dominio de uno mismo."
            </p>
          </div>

          {/* Chip "Nil Tent" */}
          <div style={{ position: "absolute", top: 88, right: 32, background: "rgba(248,246,241,.92)", backdropFilter: "blur(12px)", borderRadius: 14, padding: "12px 18px", border: "1px solid rgba(0,0,0,.07)" }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: "#1D1D1F" }}>Nil Tent</div>
            <div style={{ fontSize: 10, color: "#86868B", marginTop: 2 }}>LNFS · Selección Española</div>
          </div>
        </div>
      </div>
    </div>
  );
}
