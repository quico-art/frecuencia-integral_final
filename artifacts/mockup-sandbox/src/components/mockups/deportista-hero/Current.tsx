export function Current() {
  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#fff", height: "100vh", overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes depo-pulse{0%,100%{opacity:.4}50%{opacity:.8}}
        @keyframes fadeUp{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
      `}</style>

      {/* Nav */}
      <nav style={{ position: "absolute", top: 0, left: 0, right: 0, zIndex: 10, height: 56, background: "rgba(255,255,255,0.06)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.07)", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 40px" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="26" height="26" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="2" opacity=".5" />
            <circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="1.5" opacity=".4" />
            <circle cx="40" cy="40" r="3.5" fill="#BC9640" opacity=".9" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, fontWeight: 600, color: "#fff", lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 8, color: "rgba(255,255,255,.4)", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", cursor: "pointer" }}>← Academia</span>
          <span style={{ fontSize: 12, color: "rgba(255,255,255,.5)", cursor: "pointer" }}>Método TCT</span>
          <button style={{ background: "rgba(255,255,255,.12)", color: "#fff", border: "1px solid rgba(255,255,255,.15)", padding: "6px 18px", borderRadius: 9999, fontSize: 11, fontWeight: 600, cursor: "pointer" }}>
            Área Alumnos
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ position: "relative", height: "100vh", background: "linear-gradient(135deg,#1a2035 0%,#1c1814 50%,#0d1a2e 100%)", display: "flex", alignItems: "center", padding: "0 40px", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 700, height: 700, borderRadius: "50%", border: "1px solid rgba(106,159,212,.08)", animation: "depo-pulse 4s ease-in-out infinite" }} />
          <div style={{ position: "absolute", top: "50%", left: "50%", transform: "translate(-50%,-50%)", width: 480, height: 480, borderRadius: "50%", border: "1px solid rgba(106,159,212,.06)", animation: "depo-pulse 4s ease-in-out infinite .8s" }} />
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 60% at 70% 50%,rgba(44,95,158,.12) 0%,transparent 65%)" }} />
        </div>

        <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 56, alignItems: "center" }}>
          <div style={{ animation: "fadeUp .8s ease both" }}>
            <div style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(188,150,64,.1)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 9999, padding: "5px 14px", fontSize: 10, color: "#D4AA5A", letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, marginBottom: 28 }}>
              🏅 Curso próximamente disponible
            </div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5vw,62px)", fontWeight: 400, lineHeight: 1.06, color: "#fff", margin: "0 0 14px" }}>
              El Deportista<br /><em style={{ fontStyle: "italic", color: "#6a9fd4" }}>Consciente</em>
            </h1>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontStyle: "italic", color: "rgba(255,255,255,.45)", margin: "0 0 20px", fontWeight: 300 }}>Más allá del resultado</p>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.45)", lineHeight: 1.8, maxWidth: 460, margin: "0 0 36px" }}>
              Presencia aplicada al deporte de élite. Un programa diseñado para trascender la presión del rendimiento y encontrar la maestría personal en el terreno de juego y en la vida.
            </p>
            <button style={{ background: "linear-gradient(135deg,#2c5f9e,#4a7fc1)", color: "#fff", border: "none", padding: "13px 28px", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", boxShadow: "0 8px 24px rgba(44,95,158,.35)" }}>
              Unirme a la lista de espera →
            </button>
          </div>

          <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
            <div style={{ position: "relative", width: 340, height: 340, borderRadius: "50%", border: "1px solid rgba(106,159,212,.25)", overflow: "hidden" }}>
              <div style={{ width: "100%", height: "100%", padding: 12, boxSizing: "border-box" }}>
                <div style={{ width: "100%", height: "100%", borderRadius: "50%", overflow: "hidden", border: "2px solid rgba(106,159,212,.18)", position: "relative" }}>
                  <img src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=800&q=80&fit=crop" alt="Deportista" style={{ width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(40%)", opacity: .7 }} />
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top,rgba(28,24,20,.7) 0%,transparent 55%)" }} />
                </div>
              </div>
              <div style={{ position: "absolute", bottom: "16%", left: "50%", transform: "translateX(-50%)", textAlign: "center", width: "70%", zIndex: 2 }}>
                <div style={{ height: 1, width: 40, background: "#6a9fd4", margin: "0 auto 12px", opacity: .6 }} />
                <p style={{ color: "rgba(255,255,255,.8)", fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 13, lineHeight: 1.5 }}>
                  "La verdadera victoria<br />es el dominio de uno mismo."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
