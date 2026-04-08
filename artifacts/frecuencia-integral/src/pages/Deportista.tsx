import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { subscribeEmail, getAuth } from "@/lib/auth";
import { useContainerStyle } from "@/hooks/useContainerStyle";
import { getContentValue } from "@/lib/content";
import BlockRenderer from "@/components/BlockRenderer";

export default function Deportista() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useState(getAuth());

  const heroCont      = useContainerStyle("dep.hero");
  const paraquienCont = useContainerStyle("dep.paraquien");
  const listaCont     = useContainerStyle("dep.lista");

  const [, _refresh] = useState(0);
  useEffect(() => {
    const h = () => _refresh(n => n + 1);
    window.addEventListener("fi:content",   h);
    window.addEventListener("fi:published", h);
    window.addEventListener("fi:reset",     h);
    return () => {
      window.removeEventListener("fi:content",   h);
      window.removeEventListener("fi:published", h);
      window.removeEventListener("fi:reset",     h);
    };
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function handleSubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    subscribeEmail(email);
    setSubscribed(true);
    setEmail("");
  }

  const hoverCard = (e: React.MouseEvent, enter: boolean) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = enter ? "translateY(-6px)" : "";
    el.style.boxShadow = enter ? "0 20px 60px rgba(0,0,0,.10)" : "0 2px 12px rgba(0,0,0,.06)";
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#ffffff", color: "#1D1D1F", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,600;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fadeUp { from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)} }
        .dep-fade { animation: fadeUp .8s ease both; }
        .dep-alt-btn:hover { background: #333 !important; }
        .dep-hamburger{display:none!important}
        @media(max-width:900px){
          .dep-nav-links{display:none!important}
          .dep-hamburger{display:flex!important}
          .dep-hero-grid{grid-template-columns:1fr!important}
          .dep-hero-img{display:none!important}
          .dep-3col{grid-template-columns:1fr!important}
          .dep-section{padding:72px 24px!important}
          .dep-hero-col{padding:60px 24px 48px!important}
          .dep-nav{padding:0 20px!important}
          .g2{grid-template-columns:1fr!important;gap:32px!important}
        }
        @media(max-width:640px){
          .dep-section{padding:56px 20px!important}
          .dep-hero-col{padding:48px 20px 40px!important}
        }
        @media(max-width:480px){
          .dep-section{padding:48px 16px!important}
          .dep-hero-col{padding:40px 16px 32px!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="dep-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 60, background: scrolled ? "rgba(255,255,255,0.94)" : "rgba(255,255,255,0.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #f5f5f7", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 44px", transition: "background .3s" }}>
        <button onClick={() => setLocation("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <svg width="30" height="30" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#795901" strokeWidth="3.5" opacity="1" />
            <circle cx="40" cy="40" r="20" stroke="#BC9640" strokeWidth="2.2" opacity="1" />
            <circle cx="40" cy="40" r="3.5" fill="#795901" opacity="1" />
          </svg>
          <div>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontWeight: 600, color: "#1D1D1F", lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 9, color: "#6E6E73", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
          </div>
        </button>
        <div className="dep-nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <button onClick={() => setLocation("/")} style={{ background: "none", border: "none", fontSize: 13, color: "#6E6E73", cursor: "pointer" }}>← Academia</button>
          <button onClick={() => setLocation("/metodo")} style={{ background: "none", border: "none", fontSize: 13, color: "#6E6E73", cursor: "pointer" }}>Método TCT</button>
          <button onClick={() => setLocation(user.isLoggedIn ? "/area" : "/login?course=deportista")} style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Área Alumnos"}
          </button>
        </div>
        <button className="dep-hamburger" onClick={() => setMobileOpen(true)} style={{ flexDirection: "column", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {[0,1,2].map(i => <div key={i} style={{ width: 20, height: 1.5, background: "#1D1D1F", borderRadius: 2 }} />)}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "#F5F5F7", border: "none", width: 36, height: 36, borderRadius: "50%", fontSize: 16, cursor: "pointer" }}>✕</button>
          {/* Nivel 2 — páginas hermanas (sin secciones propias en este menú) */}
          <button onClick={() => { setMobileOpen(false); setLocation("/metodo"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 20, letterSpacing: ".1em", textTransform: "uppercase", color: "#BC9640", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginBottom: 14 }}>→ Método TCT</button>
          <button onClick={() => { setMobileOpen(false); setLocation("/libros"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 20, letterSpacing: ".1em", textTransform: "uppercase", color: "#BC9640", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>→ Libros</button>
          {/* Nivel 3 — raíz */}
          <button onClick={() => { setMobileOpen(false); setLocation("/"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 18, letterSpacing: ".08em", color: "#9E9E9E", background: "none", border: "none", cursor: "pointer", marginBottom: 28 }}>↑ Academia</button>
          {/* CTA */}
          <button onClick={() => { setMobileOpen(false); setLocation(user.isLoggedIn ? "/area" : "/login?course=deportista"); }} style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Acceso Alumnos"}
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section id="dep-hero" data-fi-section="dep-hero" data-fi-label="Hero" className="dep-hero-grid" style={{ position: "relative", minHeight: "100vh", background: "#F8F6F1", display: "grid", gridTemplateColumns: "1fr 1fr", paddingTop: 60 }}>

        {/* Columna izquierda — texto */}
        <div className="dep-hero-col" style={{ display: "flex", flexDirection: "column", justifyContent: heroCont.justify, padding: "60px 56px 60px 64px", position: "relative", zIndex: 1 }}>

          {/* Badge */}
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 36, animation: "fadeUp .6s ease both" }}>
            <span data-fi-key="dep.hero.badge" style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#BC9640", fontWeight: 700 }}>{getContentValue("dep.hero.badge", "🏅 Curso próximamente disponible")}</span>
          </div>

          {/* Headline */}
          <div style={{ animation: "fadeUp .7s .1s ease both" }}>
            <h1 data-fi-key="dep.hero.title1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,4.5vw,60px)", fontWeight: 300, lineHeight: 1.05, color: "#1D1D1F", margin: "0 0 6px", letterSpacing: "-.5px" }}>
              {getContentValue("dep.hero.title1", "El Deportista")}
            </h1>
            <h1 data-fi-key="dep.hero.title2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(40px,4.5vw,60px)", fontWeight: 300, fontStyle: "italic", lineHeight: 1.05, color: "#2D7DD2", margin: "0 0 24px", letterSpacing: "-.5px" }}>
              {getContentValue("dep.hero.title2", "Consciente")}
            </h1>
          </div>

          {/* Subtítulo */}
          <p data-fi-key="dep.hero.sub" style={{ fontFamily: "'Playfair Display', serif", fontSize: 19, fontStyle: "italic", color: "#86868B", margin: "0 0 28px", fontWeight: 300, animation: "fadeUp .7s .2s ease both" }}>
            {getContentValue("dep.hero.sub", "Más allá del resultado")}
          </p>

          {/* Separador dorado */}
          <div style={{ width: 48, height: 1, background: "#BC9640", marginBottom: 28, opacity: .5, animation: "fadeUp .7s .25s ease both" }} />

          {/* Descripción */}
          <p data-fi-key="dep.hero.desc" style={{ fontSize: 16, color: "#6E6E73", lineHeight: 1.8, maxWidth: 440, margin: "0 0 40px", fontWeight: 400, animation: "fadeUp .7s .3s ease both" }}>
            {getContentValue("dep.hero.desc", "Presencia aplicada al deporte de élite. Un programa diseñado para trascender la presión del rendimiento y encontrar la maestría personal en el terreno de juego y en la vida.")}
          </p>

          {/* CTA */}
          <div style={{ animation: "fadeUp .7s .4s ease both" }}>
            <button className="dep-alt-btn" data-testid="button-waitlist-hero"
              onClick={() => document.getElementById("depo-lista")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 600, cursor: "pointer", transition: "background .2s", letterSpacing: ".01em" }}>
              <span data-fi-key="dep.hero.cta">{getContentValue("dep.hero.cta", "Unirme a la lista de espera →")}</span>
            </button>
          </div>

          {/* Stats row */}
          <div style={{ display: "flex", gap: 40, marginTop: 52, animation: "fadeUp .7s .5s ease both" }}>
            {[["Élite", "Formación"], ["Sesiones", "En vivo"], ["Comunidad", "Exclusiva"]].map(([n, l]) => (
              <div key={n}>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#1D1D1F" }}>{n}</div>
                <div style={{ fontSize: 10, color: "#86868B", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 2 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna derecha — imagen full bleed */}
        <div className="dep-hero-img" style={{ position: "relative", overflow: "hidden" }}>
          <img
            src="https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&fit=crop"
            alt="Deportista consciente"
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover", filter: "grayscale(20%) brightness(.95)" }}
          />
          {/* Fusión lateral izquierda */}
          <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to right, #F8F6F1 0%, transparent 18%)" }} />
          {/* Overlay inferior */}
          <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, height: "45%", background: "linear-gradient(to top, rgba(248,246,241,.9) 0%, transparent 100%)" }} />

          {/* Cita */}
          <div style={{ position: "absolute", bottom: 52, left: 48, right: 32 }}>
            <div style={{ width: 36, height: 1, background: "#BC9640", marginBottom: 16, opacity: .7 }} />
            <p data-fi-key="dep.hero.quote" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontSize: 16, color: "#1D1D1F", lineHeight: 1.6, fontWeight: 300, margin: 0 }}>
              {getContentValue("dep.hero.quote", '"La verdadera victoria es el dominio de uno mismo."')}
            </p>
          </div>

          {/* Chip Nil Tent */}
          <div style={{ position: "absolute", top: 80, right: 32, background: "rgba(248,246,241,.92)", backdropFilter: "blur(12px)", WebkitBackdropFilter: "blur(12px)", borderRadius: 14, padding: "12px 18px", border: "1px solid rgba(0,0,0,.07)" }}>
            <div data-fi-key="dep.hero.chip.name" style={{ fontSize: 12, fontWeight: 700, color: "#1D1D1F" }}>{getContentValue("dep.hero.chip.name", "Nil Tent")}</div>
            <div data-fi-key="dep.hero.chip.role" style={{ fontSize: 10, color: "#86868B", marginTop: 2 }}>{getContentValue("dep.hero.chip.role", "LNFS · Selección Española")}</div>
          </div>
        </div>
      </section>

      {/* ── ¿PARA QUIÉN ES? ── */}
      <section id="depo-para-quien" data-fi-section="dep-para-quien" data-fi-label="Para Quién" className="dep-section" style={{ padding: "96px 40px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto" }}>
          <div style={{ ...paraquienCont.style }}>
            <span data-fi-key="dep.paraquien.label" style={{ fontSize: 11, letterSpacing: ".15em", textTransform: "uppercase", color: "#4a7fc1", fontWeight: 700, display: "block", marginBottom: 14 }}>{getContentValue("dep.paraquien.label", "El programa es para")}</span>
            <h2 data-fi-key="dep.paraquien.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,52px)", color: "#1D1D1F", margin: 0, fontWeight: 300, lineHeight: 1.1 }}>{getContentValue("dep.paraquien.title", "¿Para quién es?")}</h2>
          </div>
          <div className="dep-3col" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
            {[
              { icon: "🏅", accent: "linear-gradient(90deg,#2c5f9e,#6a9fd4)", tk: "dep.card.0.title", dk: "dep.card.0.desc", tDef: "Deportistas de élite", dDef: "Que buscan optimizar su rendimiento sin sacrificar su salud mental ni su equilibrio personal bajo la presión constante." },
              { icon: "👨‍👩‍👧", accent: "linear-gradient(90deg,#4a7fc1,#8ab4e0)", tk: "dep.card.1.title", dk: "dep.card.1.desc", tDef: "Padres e hijos deportistas", dDef: "Acompañamiento consciente para familias que navegan el exigente camino del deporte formativo y profesional." },
              { icon: "🏛️", accent: "linear-gradient(90deg,#2c5f9e,#6a9fd4)", tk: "dep.card.2.title", dk: "dep.card.2.desc", tDef: "Clubes e instituciones", dDef: "Organizaciones que desean implementar una cultura de consciencia, valores y rendimiento humano integral." },
            ].map((item, ci) => (
              <div key={item.tk}
                data-fi-block={`dep-card-${ci}`} data-fi-label={item.tDef}
                style={{ background: "#F5F5F7", borderRadius: 20, border: "1px solid rgba(0,0,0,.05)", boxShadow: "0 2px 16px rgba(0,0,0,.04)", overflow: "hidden", transition: "transform .35s cubic-bezier(.22,1,.36,1), box-shadow .35s" }}
                onMouseEnter={e => { (e.currentTarget as HTMLDivElement).style.transform = "translateY(-8px)"; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 56px rgba(44,95,158,.13)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLDivElement).style.transform = ""; (e.currentTarget as HTMLDivElement).style.boxShadow = "0 2px 16px rgba(0,0,0,.05)"; }}>
                <div style={{ height: 3, background: item.accent }} />
                <div style={{ padding: "36px 36px 40px" }}>
                  <div style={{ display: "inline-flex", alignItems: "center", justifyContent: "center", width: 48, height: 48, borderRadius: 14, background: "rgba(44,95,158,.06)", border: "1px solid rgba(44,95,158,.09)", fontSize: 22, marginBottom: 28 }}>
                    {item.icon}
                  </div>
                  <h3 data-fi-key={item.tk} style={{ fontFamily: "'Playfair Display', serif", fontSize: 21, fontWeight: 400, color: "#1D1D1F", marginBottom: 12, lineHeight: 1.2 }}>{getContentValue(item.tk, item.tDef)}</h3>
                  <p data-fi-key={item.dk} style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.8, margin: 0 }}>{getContentValue(item.dk, item.dDef)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL PROGRAMA ── */}
      <section id="dep-metodologia" data-fi-section="dep-metodologia" data-fi-label="Metodología" className="dep-section" style={{ padding: "96px 40px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", display: "flex", flexDirection: "column", gap: 40 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#1D1D1F", margin: 0, lineHeight: 1.15 }}>
            <span data-fi-key="dep.met.title">{getContentValue("dep.met.title", "El programa:")}</span><br />
            <em data-fi-key="dep.met.title2" style={{ fontStyle: "italic", color: "#4a7fc1", fontWeight: 300 }}>{getContentValue("dep.met.title2", "Más allá del resultado")}</em>
          </h2>

          <div style={{ background: "#ffffff", borderRadius: 16, padding: "28px 32px", borderLeft: "4px solid #4a7fc1" }}>
            <p data-fi-key="dep.met.quote" style={{ fontFamily: "'Playfair Display', serif", fontSize: 17, fontStyle: "italic", lineHeight: 1.65, color: "#1D1D1F", margin: 0 }}>
              {getContentValue("dep.met.quote", "\"El verdadero rendimiento nace cuando el deportista deja de necesitar ganar para sentirse válido.\"")}
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 0, background: "#ffffff", borderRadius: 16, overflow: "hidden" }}>
            {[
              { num: "01", tk: "dep.met.0.title", dk: "dep.met.0.desc", tDef: "Identidad más allá del rol", dDef: "Desvincular el valor personal del éxito o fracaso deportivo para ganar libertad mental." },
              { num: "02", tk: "dep.met.1.title", dk: "dep.met.1.desc", tDef: "Presencia bajo presión", dDef: "Herramientas prácticas para mantener el foco y la calma en los momentos decisivos de la competición." },
              { num: "03", tk: "dep.met.2.title", dk: "dep.met.2.desc", tDef: "El fracaso como maestro", dDef: "Integrar la derrota como un pilar fundamental del crecimiento y la evolución técnica." },
              { num: "04", tk: "dep.met.3.title", dk: "dep.met.3.desc", tDef: "Integración familia-deporte", dDef: "Sinergia entre el entorno personal y la carrera profesional para un soporte sólido." },
            ].map((s, si) => (
              <div key={s.num} data-fi-block={`dep-mod-${si}`} data-fi-label={`Módulo ${s.num}`} style={{ display: "flex", gap: 24, padding: "28px 32px", borderTop: si > 0 ? "1px solid rgba(0,0,0,.07)" : "none" }}>
                <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, fontWeight: 700, color: "#4a7fc1", opacity: .4, flexShrink: 0, lineHeight: 1.2 }}>{s.num}</span>
                <div>
                  <h4 data-fi-key={s.tk} style={{ fontSize: 16, fontWeight: 700, color: "#1D1D1F", marginBottom: 8 }}>{getContentValue(s.tk, s.tDef)}</h4>
                  <p data-fi-key={s.dk} style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.7, margin: 0 }}>{getContentValue(s.dk, s.dDef)}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL EQUIPO ── */}
      <section id="dep-equipo" data-fi-section="dep-equipo" data-fi-label="Equipo" className="dep-section" style={{ padding: "96px 40px", background: "#ffffff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 64 }}>
            <span data-fi-key="dep.equipo.label" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#2c5f9e", fontWeight: 700, display: "block", marginBottom: 14 }}>{getContentValue("dep.equipo.label","El Equipo")}</span>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "#1D1D1F", margin: 0, lineHeight: 1.08 }}>
              <span data-fi-key="dep.equipo.h2">{getContentValue("dep.equipo.h2","Las personas detrás del")}</span> <em data-fi-key="dep.equipo.h2em" style={{ fontStyle: "italic", color: "#2c5f9e" }}>{getContentValue("dep.equipo.h2em","Deportista Consciente")}</em>
            </h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              {
                mk: "m0", name: "Nil Tent", initial: "N", reverse: false,
                role: "Futbolista de Élite · Selección Española · Deportista Consciente",
                tags: ["LNFS 1ª División","Selección España","UEFA Futsal Champions League","Copa Intercontinental","Alta Competición","Consciencia & Deporte"],
                bio: "Pívot de fútbol sala profesional con apenas 20 años, Nil Tent es la voz más joven y más directa de lo que significa competir desde la consciencia. Desde los 3 años en la cantera del Palma Futsal hasta debutar en la LNFS 1ª División con 17, su trayectoria es un mapa de exigencia, talento y aprendizaje interior. Internacional con la Selección Española en Sub-17, Sub-18, Sub-19 y Sub-21. Campeón de la UEFA Futsal Champions League y de la Copa Intercontinental.",
                quote: "La alta competición me enseñó que el rendimiento real nace cuando dejas de necesitar ganar para sentirte válido.",
                logros: ["Mejor Jugador Sub-16 · Minicopa de España Valencia 2019","Campeón de España Selecciones Autonómicas Sub-16 · Las Rozas 2020","Campeón de la UEFA Futsal Champions League y de la Copa Intercontinental","4º jugador en la historia del Palma Futsal en ascender directamente desde la cantera"],
              },
              {
                mk: "m1", name: "Quico Tent", initial: "Q", reverse: true,
                role: "Coach Consciente · Mentor del Deportista",
                tags: ["Coaching Consciente","Bioneuroemoción","Cuencos Tibetanos","Presencia en el Deporte"],
                bio: "En el contexto del Deportista Consciente, Quico aporta la dimensión interior del rendimiento: cómo la presencia, la vibración y el trabajo sobre las creencias limitantes se convierten en herramientas reales para el deportista de élite y su entorno. Padre de Nil y testigo directo de su trayectoria deportiva, su visión integra el acompañamiento emocional, espiritual y energético desde dentro del sistema del alto rendimiento.",
                quote: "El verdadero rendimiento no se entrena en la pista. Se construye en la relación que tienes contigo mismo cuando nadie está mirando.",
                logros: [] as string[],
              },
            ].map((m) => (
              <div key={m.name} data-fi-block={`dep-member-${m.mk}`} data-fi-label={m.name} className="g2" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 64, alignItems: "start", paddingTop: 56, marginTop: 0, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <div style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/5", background: "#FAFAF8", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  <div style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 80, fontWeight: 300, color: "rgba(44,95,158,.2)", lineHeight: 1 }}>{m.initial}</div>
                  <div style={{ fontSize: 10, color: "#AEAEB2", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 8 }}>Foto próximamente</div>
                </div>
                <div>
                  <div data-fi-key={`dep.equipo.${m.mk}.name`} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 400, color: "#1D1D1F", lineHeight: 1.15, marginBottom: 6 }}>{getContentValue(`dep.equipo.${m.mk}.name`, m.name)}</div>
                  <div data-fi-key={`dep.equipo.${m.mk}.role`} style={{ fontSize: 12, color: "#2c5f9e", fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 24 }}>{getContentValue(`dep.equipo.${m.mk}.role`, m.role)}</div>
                  <div style={{ borderLeft: "2px solid rgba(44,95,158,.25)", paddingLeft: 16, marginBottom: 24 }}>
                    <p data-fi-key={`dep.equipo.${m.mk}.quote`} style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 15, fontStyle: "italic", color: "#6E6E73", lineHeight: 1.65, margin: 0 }}>"{getContentValue(`dep.equipo.${m.mk}.quote`, m.quote)}"</p>
                  </div>
                  <p data-fi-key={`dep.equipo.${m.mk}.bio`} style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.85, marginBottom: m.logros.length ? 20 : 24 }}>{getContentValue(`dep.equipo.${m.mk}.bio`, m.bio)}</p>
                  {m.logros.length > 0 && (
                    <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 24 }}>
                      {m.logros.map((l, li) => (
                        <div key={li} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                          <span style={{ color: "#2c5f9e", fontSize: 10, marginTop: 3, flexShrink: 0 }}>🏅</span>
                          <span data-fi-key={`dep.equipo.${m.mk}.l${li}`} style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.6 }}>{getContentValue(`dep.equipo.${m.mk}.l${li}`, l)}</span>
                        </div>
                      ))}
                    </div>
                  )}
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {m.tags.map(t => (
                      <span key={t} style={{ background: "#fff", borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: "#6E6E73" }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── LISTA DE ESPERA ── */}
      <section id="depo-lista" data-fi-section="dep-lista" data-fi-label="Lista Espera" className="dep-section" style={{ padding: "80px 40px", background: "linear-gradient(135deg,#795901,#bc9640)", display:"flex", flexDirection:"column", alignItems: listaCont.justify }}>
        <div style={{ ...listaCont.style, textAlign: "center" }}>
          <div style={{ fontSize: 48, marginBottom: 24 }}>📬</div>
          <h2 data-fi-key="dep.lista.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,44px)", color: "#1c1814", marginBottom: 20, fontWeight: 400 }}>{getContentValue("dep.lista.title","Sé el primero en saberlo")}</h2>
          <p data-fi-key="dep.lista.desc" style={{ fontSize: 16, color: "rgba(28,24,20,.7)", lineHeight: 1.75, maxWidth: 560, margin: "0 auto 36px" }}>
            {getContentValue("dep.lista.desc","El programa está en desarrollo activo. Únete a nuestra comunidad exclusiva para recibir actualizaciones sobre el lanzamiento y contenido preliminar sobre consciencia deportiva.")}
          </p>

          {subscribed ? (
            <div style={{ padding: "20px 32px", background: "rgba(28,24,20,.12)", borderRadius: 14, color: "#1c1814", fontWeight: 700, fontSize: 15 }}>
              <span data-fi-key="dep.lista.success">{getContentValue("dep.lista.success","✦ ¡Suscripción confirmada! Te avisaremos en el lanzamiento.")}</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} style={{ display: "flex", gap: 12, maxWidth: 520, margin: "0 auto", flexWrap: "wrap", justifyContent: "center" }}>
              <input type="email" placeholder="Tu correo electrónico" value={email} onChange={e => setEmail(e.target.value)} required data-testid="input-waitlist-email"
                style={{ flex: 1, minWidth: 240, background: "rgba(255,255,255,.25)", border: "1px solid rgba(28,24,20,.18)", borderRadius: 9999, padding: "14px 24px", fontSize: 14, color: "#1c1814", outline: "none" }} />
              <button type="submit" data-testid="button-waitlist-submit"
                style={{ background: "#1c1814", color: "#fff", border: "none", padding: "14px 28px", borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
                <span data-fi-key="dep.lista.btn">{getContentValue("dep.lista.btn","Suscribirme")}</span>
              </button>
            </form>
          )}

          <p data-fi-key="dep.lista.privacy" style={{ fontSize: 12, color: "rgba(28,24,20,.5)", marginTop: 16 }}>{getContentValue("dep.lista.privacy","Respetamos tu privacidad. Sin spam, solo consciencia.")}</p>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        <BlockRenderer zone="deportista" />
      </div>

      <footer style={{ background: "#1c1814", padding: "40px 44px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 18, color: "#D4AA5A" }}>Frecuencia Integral</span>
            <span style={{ fontSize: 10, color: "rgba(255,255,255,.65)", letterSpacing: ".15em", textTransform: "uppercase" }}>Academy</span>
          </div>
          <div style={{ display: "flex", gap: 24, alignItems: "center" }}>
            <button onClick={() => setLocation("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.85)", fontSize: 13, cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4AA5A")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}>← Academia</button>
            <button onClick={() => setLocation("/metodo")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.85)", fontSize: 13, cursor: "pointer", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#D4AA5A")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}>Método TCT</button>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>© 2026 Frecuencia Integral</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
