import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useLocation } from "wouter";
import { getAuth } from "@/lib/auth";
import { useContent } from "@/hooks/useContent";
import { useContainerStyle } from "@/hooks/useContainerStyle";
import BlockRenderer from "@/components/BlockRenderer";
import GaleriaAcademia from "@/components/GaleriaAcademia";

export default function Academy() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileCursosOpen, setMobileCursosOpen] = useState(false);
  const [cursosOpen, setCursosOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [contactForm, setContactForm] = useState({ name: "", email: "", curso: "", message: "" });
  const [contactSent, setContactSent] = useState(false);
  const user = getAuth();

  function openCursos() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setCursosOpen(true);
  }
  function closeCursos() {
    closeTimer.current = setTimeout(() => setCursosOpen(false), 130);
  }

  const [heroLabel]    = useContent("academy.hero.label",    "Academia de desarrollo consciente");
  const [heroTitle1]   = useContent("academy.hero.title1",   "La transformación no se aprende.");
  const [heroTitle2]   = useContent("academy.hero.title2",   "Se vive.");
  const [heroSubtitle] = useContent("academy.hero.subtitle", "Una escuela de vida donde la sabiduría milenaria y la presencia se integran en cada área de tu existencia.");
  const [cursosLabel]  = useContent("academy.cursos.label",  "Formaciones");
  const [cursosTitle]  = useContent("academy.cursos.title",  "Elige tu camino");
  const [cursosSub]    = useContent("academy.cursos.sub",    "Dos formaciones. Una misma filosofía. Cada una diseñada para un contexto específico de vida.");
  const [presenciaLabel]  = useContent("academy.presencia.label",  "La Presencia");
  const [presenciaTitle1] = useContent("academy.presencia.title1", "Estar aquí.");
  const [presenciaTitle2] = useContent("academy.presencia.title2", "Completamente.");
  const [presenciaBody]   = useContent("academy.presencia.body",   "La transformación no ocurre en el futuro. Ocurre en este momento, en este cuerpo, en esta respiración.");
  const [presenciaCta]    = useContent("academy.presencia.cta",    "Explorar los cursos →");

  // ── Contenedores de sección ────────────────────────────────────────────────
  const heroCont        = useContainerStyle("academy.hero",        { pos:"center", maxW:"560" });
  const cursosCont      = useContainerStyle("academy.cursos",      { pos:"left",   maxW:"560",  padB:"72" });

  const principiosCont  = useContainerStyle("academy.principios",  { pos:"center", maxW:"1280", padB:"72" });
  const testimoniosCont = useContainerStyle("academy.testimonios", { pos:"center", maxW:"960",  padB:"80" });
  const contactCont     = useContainerStyle("academy.contact",     { pos:"left",   maxW:"600" });
  const presenciaCont   = useContainerStyle("academy.presencia",   { pos:"left",   maxW:"680",  padH:"64", padB:"80" });
  const [tctImgSrc]    = useContent("academy.img.tct",       "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&fit=crop");
  const [depImgSrc]    = useContent("academy.img.dep",       "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&fit=crop");
  const [tctName]      = useContent("academy.tct.name",      "Método TCT");
  const [tctTagline]   = useContent("academy.tct.tagline",   "Tu Camino de Transformación");
  const [tctStatus]    = useContent("academy.tct.status",    "Disponible");
  const [tctMeta]      = useContent("academy.tct.meta",      "48 semanas");
  const [tctDesc]      = useContent("academy.tct.desc",      "Un viaje de 48 semanas a través de 4 puertas progresivas. Del despertar a la integración.");
  const [tctCta]       = useContent("academy.tct.cta",       "Ver el programa →");
  const [depName]      = useContent("academy.dep.name",      "El Deportista Consciente");
  const [depTagline]   = useContent("academy.dep.tagline",   "Más allá del resultado");
  const [depStatus]    = useContent("academy.dep.status",    "Próximamente");
  const [depMeta]      = useContent("academy.dep.meta",      "Deporte élite");
  const [depDesc]      = useContent("academy.dep.desc",      "Presencia aplicada al deporte de élite. Para deportistas, padres e instituciones.");
  const [depCta]       = useContent("academy.dep.cta",       "Ver más →");
  const [contactTitle] = useContent("academy.contact.title", "¿Tienes alguna pregunta?");
  const [contactSub]   = useContent("academy.contact.sub",   "Escríbenos y te respondemos en menos de 24h.");

  const [principiosTitle] = useContent("acad.principios.title", "Los 4 Principios de la Frecuencia");
  const [p0num]   = useContent("acad.principio.0.num",   "I");
  const [p0title] = useContent("acad.principio.0.title", "Despertar");
  const [p0desc]  = useContent("acad.principio.0.desc",  "Reconocer el estado automático en el que vivimos. El primer paso es ver lo que no veíamos.");
  const [p1num]   = useContent("acad.principio.1.num",   "II");
  const [p1title] = useContent("acad.principio.1.title", "Comprensión");
  const [p1desc]  = useContent("acad.principio.1.desc",  "Entender los mecanismos internos que nos dirigen. Teoría y práctica integradas semana a semana.");
  const [p2num]   = useContent("acad.principio.2.num",   "III");
  const [p2title] = useContent("acad.principio.2.title", "Integración");
  const [p2desc]  = useContent("acad.principio.2.desc",  "Aplicar lo aprendido en la vida real. Los ejercicios están diseñados para el día a día, no para el retiro.");
  const [p3num]   = useContent("acad.principio.3.num",   "IV");
  const [p3title] = useContent("acad.principio.3.title", "Presencia");
  const [p3desc]  = useContent("acad.principio.3.desc",  "Vivir desde un estado de consciencia más elevado. No como logro, sino como modo natural de ser.");

  const [testLabel]    = useContent("acad.test.label",    "Lo que dicen");
  const [testTitle]    = useContent("acad.test.title",    "Transformaciones reales");
  const [testMainQ]    = useContent("acad.test.main.q",   "Frecuencia Integral cambió radicalmente mi forma de entender el deporte. Ya no se trata de «hacer», sino de «ser» mientras actúo. Es la diferencia entre vivir y existir.");
  const [testMainName] = useContent("acad.test.main.name","María G.");
  const [testMainRole] = useContent("acad.test.main.role","Puerta Blanca completada");
  const [test0q]    = useContent("acad.test.0.q",    "El Método TCT ha transformado mi forma de competir. Ya no busco resultados, busco presencia. Los resultados han llegado solos.");
  const [test0name] = useContent("acad.test.0.name", "Álex M.");
  const [test0role] = useContent("acad.test.0.role", "Atleta de élite · Puerta Roja");
  const [test1q]    = useContent("acad.test.1.q",    "Nunca pensé que una academia online pudiera crear una comunidad tan genuina. El acompañamiento ha sido determinante en mi proceso.");
  const [test1name] = useContent("acad.test.1.name", "Carolina S.");
  const [test1role] = useContent("acad.test.1.role", "Emprendedora · Puerta Azul");
  const [test2q]    = useContent("acad.test.2.q",    "La integración de las prácticas en mi vida diaria ha sido gradual pero profunda. Es el trabajo más honesto que he hecho conmigo mismo.");
  const [test2name] = useContent("acad.test.2.name", "Pablo R.");
  const [test2role] = useContent("acad.test.2.role", "Directivo · Puerta Blanca");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) { (e.target as HTMLElement).classList.add("fi-visible"); } }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".fi-reveal").forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSent(true);
  };

  const hoverCard = (e: React.MouseEvent, enter: boolean) => {
    const el = e.currentTarget as HTMLElement;
    el.style.transform = enter ? "translateY(-6px)" : "";
    el.style.boxShadow = enter ? "0 20px 60px rgba(0,0,0,.10)" : "0 2px 12px rgba(0,0,0,.06)";
  };

  return (
    <div style={{ fontFamily: "'Plus Jakarta Sans', system-ui, sans-serif", background: "#ffffff", color: "#1D1D1F", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap');
        @keyframes spin { to { transform: rotate(360deg); } }
        @keyframes fadeUp { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
        @keyframes acad-spin-cw  { from { transform: rotate(0deg);    } to { transform: rotate(360deg);   } }
        @keyframes acad-spin-ccw { from { transform: rotate(0deg);    } to { transform: rotate(-360deg);  } }
        @keyframes acad-breathe  { 0%,100%{ opacity:.4; } 50%{ opacity:.9; } }
        @keyframes mandala-breathe { 0%,100%{ opacity:.18; transform:scale(1) rotate(0deg); } 50%{ opacity:.30; transform:scale(1.04) rotate(180deg); } }
        @keyframes mandala-spin-s  { to { transform:rotate(360deg); } }
        @keyframes mandala-spin-r  { to { transform:rotate(-360deg); } }
        .fi-fade-up { animation: fadeUp .7s ease both; }
        .fi-fade-up-d1 { animation: fadeUp .7s .1s ease both; }
        .fi-fade-up-d2 { animation: fadeUp .7s .2s ease both; }
        .fi-fade-up-d3 { animation: fadeUp .7s .3s ease both; }
        .fi-reveal { opacity:0; transform:translateY(36px); transition: opacity .75s cubic-bezier(.22,1,.36,1), transform .75s cubic-bezier(.22,1,.36,1); }
        .fi-reveal.fi-visible { opacity:1; transform:translateY(0); }
        .fi-reveal-d1 { transition-delay:.1s; }
        .fi-reveal-d2 { transition-delay:.2s; }
        .fi-reveal-d3 { transition-delay:.3s; }
        @media(max-width:900px) {
          .acad-nav-desktop { display: none !important; }
          .acad-hamburger { display: flex !important; }
          .acad-hero-grid { grid-template-columns: 1fr !important; }
          .acad-2col { grid-template-columns: 1fr !important; gap: 40px !important; }
          .acad-4col { grid-template-columns: 1fr 1fr !important; }
          .acad-3col { grid-template-columns: 1fr !important; gap: 36px !important; }
          .acad-section { padding: 72px 24px !important; }
          .acad-quiz-pills { flex-direction: column; align-items: stretch; }
          #acad-hero { padding: 88px 24px 56px !important; }
          .acad-nav { padding: 0 20px !important; }
          .acad-presencia-text { padding: 0 24px 48px !important; }
          .acad-footer { padding: 48px 24px 24px !important; }
          .acad-footer-cols { grid-template-columns: 1fr 1fr !important; gap: 32px !important; }
          .acad-contact-card { padding: 28px !important; }
          .acad-footer-bottom { flex-direction: column !important; align-items: flex-start !important; gap: 16px !important; }
        }
        @media(max-width:640px) {
          #acad-hero { padding: 76px 20px 44px !important; }
          .acad-section { padding: 56px 20px !important; }
          .acad-4col { grid-template-columns: 1fr !important; }
          .acad-presencia-text { padding: 0 20px 40px !important; }
          .acad-footer { padding: 36px 20px 20px !important; }
          .acad-footer-cols { grid-template-columns: 1fr !important; gap: 28px !important; }
          .acad-testimonios-col { border-left: none !important; padding: 28px 0 0 0 !important; border-top: 1px solid rgba(121,89,1,.1) !important; }
          .acad-testimonios-col:first-child { border-top: none !important; padding-top: 0 !important; }
          .acad-contact-card { padding: 20px !important; }
          .acad-footer-links { flex-wrap: wrap !important; gap: 12px !important; }
        }
        @media(max-width:480px) {
          #acad-hero { padding: 68px 16px 36px !important; }
          .acad-section { padding: 48px 16px !important; }
          .acad-footer { padding: 28px 16px 16px !important; }
          .acad-presencia-text { padding: 0 16px 32px !important; }
        }
      `}</style>

      {/* ══ NAV ══ */}
      <nav className="acad-nav" style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000,
        height: 60,
        background: scrolled ? "rgba(255,255,255,0.92)" : "rgba(255,255,255,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid #f5f5f7",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 44px", transition: "background .3s",
      }}>
        <button onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <svg width="32" height="32" viewBox="0 0 80 80" fill="none">
            <circle cx="40" cy="40" r="37" stroke="#795901" strokeWidth="3.5" opacity="1" />
            <circle cx="40" cy="40" r="20" stroke="#BC9640" strokeWidth="2.2" opacity="1" />
            <circle cx="40" cy="40" r="3.5" fill="#795901" opacity="1" />
          </svg>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 16, fontWeight: 600, color: "#1D1D1F", lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 9, color: "#6E6E73", letterSpacing: ".14em", textTransform: "uppercase", marginTop: 2 }}>Academy</div>
          </div>
        </button>

        <div className="acad-nav-desktop" style={{ display: "flex", alignItems: "center", gap: 28 }}>

          {/* ── Cursos con dropdown ── */}
          <div
            style={{ position: "relative" }}
            onMouseEnter={openCursos}
            onMouseLeave={closeCursos}
          >
            <button
              onClick={() => scrollTo("acad-cursos")}
              style={{
                display: "flex", alignItems: "center", gap: 4,
                background: "none", border: "none", fontSize: 13,
                color: cursosOpen ? "#1D1D1F" : "#6E6E73",
                cursor: "pointer", fontWeight: 400, letterSpacing: ".01em",
                transition: "color .2s", padding: 0,
              }}
            >
              Cursos
              <ChevronDown
                size={13}
                style={{
                  transition: "transform .2s",
                  transform: cursosOpen ? "rotate(180deg)" : "rotate(0deg)",
                  opacity: .7,
                }}
              />
            </button>

            {/* Dropdown panel */}
            <div
              onMouseEnter={openCursos}
              onMouseLeave={closeCursos}
              style={{
                position: "absolute", top: "calc(100% + 14px)", left: "50%",
                background: "#fff",
                borderRadius: 16,
                boxShadow: "0 8px 40px rgba(0,0,0,.12), 0 1px 4px rgba(0,0,0,.06)",
                border: "1px solid rgba(0,0,0,.06)",
                padding: "6px",
                minWidth: 240,
                zIndex: 200,
                pointerEvents: cursosOpen ? "auto" : "none",
                opacity: cursosOpen ? 1 : 0,
                transform: cursosOpen
                  ? "translateX(-50%) translateY(0)"
                  : "translateX(-50%) translateY(-6px)",
                transition: "opacity .18s ease, transform .18s ease",
              } as React.CSSProperties}
            >
              {/* Pequeña flecha decorativa */}
              <div style={{
                position: "absolute", top: -5, left: "50%",
                transform: "translateX(-50%) rotate(45deg)",
                width: 10, height: 10, background: "#fff",
                borderTop: "1px solid rgba(0,0,0,.06)", borderLeft: "1px solid rgba(0,0,0,.06)",
              }} />

              {/* Curso 1 — Método TCT */}
              <button
                onClick={() => { setCursosOpen(false); setLocation("/metodo"); }}
                style={{
                  width: "100%", display: "block",
                  padding: "11px 18px", border: "none", background: "none",
                  borderRadius: 8, cursor: "pointer", textAlign: "left",
                  fontSize: 14, color: "#1D1D1F", fontWeight: 400,
                  transition: "background .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F7")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                {tctName}
              </button>

              {/* Curso 2 — El Deportista Consciente */}
              <button
                onClick={() => { setCursosOpen(false); setLocation("/deportista"); }}
                style={{
                  width: "100%", display: "block",
                  padding: "11px 18px", border: "none", background: "none",
                  borderRadius: 8, cursor: "pointer", textAlign: "left",
                  fontSize: 14, color: "#1D1D1F", fontWeight: 400,
                  transition: "background .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.background = "#F5F5F7")}
                onMouseLeave={e => (e.currentTarget.style.background = "none")}
              >
                {depName}
              </button>
            </div>
          </div>

          {/* ── Resto del menú ── */}
          {[["La Academia", "acad-que-es"], ["Contacto", "acad-contacto"]].map(([label, id]) => (
            <button key={label as string} onClick={() => scrollTo(id as string)}
              style={{ background: "none", border: "none", fontSize: 13, color: "#6E6E73", cursor: "pointer", fontWeight: 400, letterSpacing: ".01em", transition: "color .2s" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1F")}
              onMouseLeave={e => (e.currentTarget.style.color = "#6E6E73")}
            >
              {label}
            </button>
          ))}

          {user
            ? <button onClick={() => setLocation("/area")} style={{ background: "transparent", border: "1px solid rgba(188,150,64,.4)", color: "#795901", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>↩ Mi Área</button>
            : <button onClick={() => setLocation("/login")} style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "9px 22px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Acceso Alumnos</button>
          }
        </div>

        <button className="acad-hamburger" onClick={() => setMobileMenuOpen(true)} style={{ display: "none", flexDirection: "column", gap: 5, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          <div style={{ width: 22, height: 1.5, background: "#1D1D1F", borderRadius: 2 }} />
          <div style={{ width: 22, height: 1.5, background: "#1D1D1F", borderRadius: 2 }} />
          <div style={{ width: 22, height: 1.5, background: "#1D1D1F", borderRadius: 2 }} />
        </button>
      </nav>

      {/* MOBILE MENU */}
      {mobileMenuOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(255,255,255,0.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 28, padding: "0 24px" }}>
          <button onClick={() => setMobileMenuOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: "#F5F5F7", border: "none", width: 40, height: 40, borderRadius: "50%", fontSize: 18, cursor: "pointer", color: "#6E6E73" }}>✕</button>

          {/* Cursos con dropdown */}
          <div style={{ textAlign: "center" }}>
            <button
              onClick={() => setMobileCursosOpen(o => !o)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#1D1D1F", background: "none", border: "none", cursor: "pointer", display: "flex", alignItems: "center", gap: 8 }}
            >
              Cursos <ChevronDown size={18} style={{ transform: mobileCursosOpen ? "rotate(180deg)" : "rotate(0deg)", transition: "transform .2s", flexShrink: 0 }} />
            </button>
            {mobileCursosOpen && (
              <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
                <button onClick={() => { setMobileMenuOpen(false); setLocation("/metodo"); }}
                  style={{ background: "#F5F5F7", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, color: "#1D1D1F", cursor: "pointer", fontWeight: 500 }}>
                  {tctName}
                </button>
                <button onClick={() => { setMobileMenuOpen(false); setLocation("/deportista"); }}
                  style={{ background: "#F5F5F7", border: "none", borderRadius: 12, padding: "12px 28px", fontSize: 15, color: "#1D1D1F", cursor: "pointer", fontWeight: 500 }}>
                  {depName}
                </button>
              </div>
            )}
          </div>

          {[["La Academia", "acad-que-es"], ["Contacto", "acad-contacto"]].map(([label, id]) => (
            <button key={label as string} onClick={() => scrollTo(id as string)}
              style={{ fontFamily: "'Playfair Display', serif", fontSize: 28, color: "#1D1D1F", background: "none", border: "none", cursor: "pointer" }}>{label}</button>
          ))}
          <button onClick={() => { setMobileMenuOpen(false); setLocation(user ? "/area" : "/login"); }}
            style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "14px 36px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer", marginTop: 8 }}>
            {user ? "↩ Mi Área" : "Acceso Alumnos"}
          </button>
        </div>
      )}

      {/* ══ HERO ══ */}
      <section id="acad-hero" data-fi-section="acad-hero" data-fi-label="Hero" style={{ minHeight: "85svh", background: "#F8F5F2", display: "flex", flexDirection: "column", justifyContent: "center", alignItems: heroCont.justify, padding: "100px 48px 64px", textAlign: heroCont.style.textAlign, position: "relative", overflow: "hidden" }}>

        {/* ── Ambient background mandala ── */}
        <div aria-hidden="true" style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", pointerEvents: "none", zIndex: 0 }}>
          <svg width="900" height="900" viewBox="0 0 900 900" fill="none" style={{ animation: "mandala-breathe 14s ease-in-out infinite", transformOrigin: "center" }}>
            <circle cx="450" cy="450" r="440" stroke="#BC9640" strokeWidth="1"/>
            <circle cx="450" cy="450" r="380" stroke="#BC9640" strokeWidth=".8" strokeDasharray="3 9"/>
            <circle cx="450" cy="450" r="310" stroke="#BC9640" strokeWidth=".6"/>
            <circle cx="450" cy="450" r="240" stroke="#D4AA5A" strokeWidth=".8" strokeDasharray="2 7"/>
            <circle cx="450" cy="450" r="170" stroke="#BC9640" strokeWidth=".6"/>
            <circle cx="450" cy="450" r="100" stroke="#D4AA5A" strokeWidth=".5" strokeDasharray="2 5"/>
            <circle cx="450" cy="450" r="44"  stroke="#BC9640" strokeWidth=".8"/>
          </svg>
          <svg width="680" height="680" viewBox="0 0 680 680" fill="none" style={{ position: "absolute", animation: "mandala-spin-s 90s linear infinite", transformOrigin: "center", opacity: .22 }}>
            {Array.from({ length: 12 }).map((_, i) => {
              const angle = (i * 30 * Math.PI) / 180;
              const x2 = 340 + 320 * Math.cos(angle), y2 = 340 + 320 * Math.sin(angle);
              return <line key={i} x1="340" y1="340" x2={x2} y2={y2} stroke="#BC9640" strokeWidth=".6"/>;
            })}
          </svg>
          <svg width="480" height="480" viewBox="0 0 480 480" fill="none" style={{ position: "absolute", animation: "mandala-spin-r 60s linear infinite", transformOrigin: "center", opacity: .18 }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const a = (i * 45 * Math.PI) / 180;
              const x2 = 240 + 220 * Math.cos(a), y2 = 240 + 220 * Math.sin(a);
              return <line key={i} x1="240" y1="240" x2={x2} y2={y2} stroke="#D4AA5A" strokeWidth=".5"/>;
            })}
          </svg>
        </div>

        {/* Hero content — above mandala */}
        <div style={{ ...heroCont.style, position: "relative", zIndex: 1, display: "flex", flexDirection: "column", alignItems: heroCont.justify }}>

        {/* Animated circular logo */}
        <div className="fi-fade-up" style={{ marginBottom: 32, position: "relative", width: 80, height: 80, flexShrink: 0 }}>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="38" stroke="rgba(188,150,64,.15)" strokeWidth="1"/>
          </svg>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0, animation: "acad-spin-cw 18s linear infinite", transformOrigin: "center" }}>
            <circle cx="40" cy="40" r="34" stroke="rgba(188,150,64,.35)" strokeWidth="1" strokeDasharray="4 8"/>
          </svg>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0, animation: "acad-spin-ccw 12s linear infinite", transformOrigin: "center" }}>
            <circle cx="40" cy="40" r="24" stroke="rgba(212,170,90,.3)" strokeWidth="1" strokeDasharray="2 6"/>
          </svg>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0 }}>
            <circle cx="40" cy="40" r="16" stroke="rgba(188,150,64,.2)" strokeWidth="1"/>
          </svg>
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" style={{ position: "absolute", inset: 0, animation: "acad-breathe 4s ease-in-out infinite" }}>
            <circle cx="40" cy="40" r="3.5" fill="#BC9640"/>
          </svg>
        </div>

        {/* Label */}
        <div className="fi-fade-up-d1" data-fi-key="academy.hero.label" style={{ fontSize: 10, letterSpacing: ".3em", textTransform: "uppercase", color: "#795901", fontWeight: 700, marginBottom: 28 }}>
          {heroLabel}
        </div>

        {/* Headline */}
        <h1 className="fi-fade-up-d2" style={{ margin: "0 0 8px" }}>
          <span data-fi-key="academy.hero.title1" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4.5vw,64px)", fontWeight: 300, lineHeight: 1.06, letterSpacing: "-.02em", color: "#1D1D1F", display: "block" }}>
            {heroTitle1}
          </span>
          <span data-fi-key="academy.hero.title2" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,5.5vw,76px)", fontWeight: 400, fontStyle: "italic", lineHeight: 1.04, letterSpacing: "-.02em", color: "#795901", display: "block" }}>
            {heroTitle2}
          </span>
        </h1>

        {/* Divider */}
        <div className="fi-fade-up-d3" style={{ width: 48, height: 1, background: "rgba(188,150,64,.3)", margin: "28px auto" }}/>

        {/* Sense text */}
        <p className="fi-fade-up-d3" data-fi-key="academy.hero.subtitle" style={{ fontFamily: "'Playfair Display', serif", fontStyle: "italic", fontWeight: 300, fontSize: "clamp(15px,1.4vw,18px)", color: "#6E6E73", lineHeight: 1.75, maxWidth: 520, margin: 0 }}>
          {heroSubtitle}
        </p>
        </div>{/* end hero content */}
      </section>

      {/* ══ CURSOS ══ */}
      <section id="acad-cursos" data-fi-section="acad-cursos" data-fi-label="Cursos" className="acad-section" style={{ padding: "112px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div className="fi-reveal" style={{ ...cursosCont.style }}>
            <span data-fi-key="academy.cursos.label" style={{ fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "#795901", marginBottom: 16, display: "block", fontWeight: 700 }}>{cursosLabel}</span>
            <h2 data-fi-key="academy.cursos.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: "#1D1D1F", margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-.015em" }}>{cursosTitle}</h2>
            <p data-fi-key="academy.cursos.sub" style={{ fontSize: 16, color: "#6E6E73", lineHeight: 1.8, margin: 0, fontWeight: 300 }}>{cursosSub}</p>
          </div>

          <div className="acad-2col fi-reveal fi-reveal-d1" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
            {/* Método TCT */}
            <div data-fi-block="acad-course-tct" data-fi-label="Tarjeta Método TCT" onClick={() => setLocation("/metodo")} style={{ cursor: "pointer", background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,.06)", transition: "transform .25s, box-shadow .25s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = ""; }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img data-fi-img="academy.img.tct" src={tctImgSrc} alt="Método TCT" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
              </div>
              <div style={{ padding: "32px 36px 40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span data-fi-key="academy.tct.status" style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#2b7d7a", fontWeight: 700 }}>{tctStatus}</span>
                  <span data-fi-key="academy.tct.meta" style={{ fontSize: 11, color: "#AEAEB2" }}>{tctMeta}</span>
                </div>
                <h3 data-fi-key="academy.tct.name" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,2vw,30px)", fontWeight: 300, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-.01em" }}>{tctName}</h3>
                <p data-fi-key="academy.tct.tagline" style={{ fontSize: 13, color: "#86868B", fontStyle: "italic", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>{tctTagline}</p>
                <p data-fi-key="academy.tct.desc" style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>{tctDesc}</p>
                <div data-fi-key="academy.tct.cta" style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F" }}>{tctCta}</div>
              </div>
            </div>

            {/* El Deportista Consciente */}
            <div data-fi-block="acad-course-dep" data-fi-label="Tarjeta El Deportista" onClick={() => setLocation("/deportista")} style={{ cursor: "pointer", background: "#fff", borderRadius: 20, overflow: "hidden", border: "1px solid rgba(0,0,0,.06)", transition: "transform .25s, box-shadow .25s" }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = "translateY(-4px)"; el.style.boxShadow = "0 20px 60px rgba(0,0,0,.08)"; }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLDivElement; el.style.transform = ""; el.style.boxShadow = ""; }}>
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <img data-fi-img="academy.img.dep" src={depImgSrc} alt="El Deportista Consciente" style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", filter: "grayscale(10%)" }} />
              </div>
              <div style={{ padding: "32px 36px 40px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
                  <span data-fi-key="academy.dep.status" style={{ fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase", color: "#86868B", fontWeight: 700 }}>{depStatus}</span>
                  <span data-fi-key="academy.dep.meta" style={{ fontSize: 11, color: "#AEAEB2" }}>{depMeta}</span>
                </div>
                <h3 data-fi-key="academy.dep.name" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(22px,2vw,30px)", fontWeight: 300, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.1, letterSpacing: "-.01em" }}>{depName}</h3>
                <p data-fi-key="academy.dep.tagline" style={{ fontSize: 13, color: "#86868B", fontStyle: "italic", marginBottom: 16, fontFamily: "'Playfair Display', serif" }}>{depTagline}</p>
                <p data-fi-key="academy.dep.desc" style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.8, marginBottom: 28, fontWeight: 300 }}>{depDesc}</p>
                <div data-fi-key="academy.dep.cta" style={{ fontSize: 13, fontWeight: 600, color: "#86868B" }}>{depCta}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ QUÉ ES ══ */}
      <section id="acad-que-es" data-fi-section="acad-que-es" data-fi-label="La Academia" className="acad-section" style={{ padding: "112px 48px", background: "#F5F5F7" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-fi-grid="acad-que-es" className="acad-2col" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }}>
            {/* Left — heading block */}
            <div className="fi-reveal">
              <span style={{ fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: "#795901", marginBottom: 20, display: "block", fontWeight: 700 }}>¿Qué es Frecuencia Integral?</span>
              <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, lineHeight: 1.05, color: "#1D1D1F", margin: "0 0 28px", letterSpacing: "-.015em" }}>
                Un espacio de presencia,<br/>transformación y<br/><em style={{ fontStyle: "italic", color: "#BC9640" }}>acción consciente.</em>
              </h2>
              <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.9, margin: "0 0 16px", fontWeight: 300, maxWidth: 400 }}>
                Frecuencia Integral es una academia de desarrollo consciente donde cada curso es un camino — una invitación a despertar la presencia en el día a día y a vivir desde un lugar más profundo y auténtico.
              </p>
              <p style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.9, margin: 0, fontWeight: 300, maxWidth: 400 }}>
                No buscamos añadir más conocimiento. Buscamos que lo que ya sabes se convierta en experiencia real: en cómo te mueves, decides, te relacionas y te encuentras contigo mismo cada día.
              </p>
            </div>

            {/* Right — three features as simple rows */}
            <div className="fi-reveal fi-reveal-d2" style={{ display: "flex", flexDirection: "column", gap: 0, paddingTop: 8 }}>
              {[
                { num: "I",   title: "Presencia",         desc: "El punto de partida de todo lo demás. Estar aquí, ahora, con plena conciencia — no como concepto, sino como experiencia real que se entrena y se vive en lo cotidiano." },
                { num: "II",  title: "Transformación",    desc: "Un proceso interior genuino que no viene de la fuerza de voluntad, sino de ver con claridad. Cada curso ofrece un camino estructurado para que el cambio ocurra desde dentro hacia afuera." },
                { num: "III", title: "Acción Consciente", desc: "La presencia y la transformación no son fines en sí mismos — son el fundamento para actuar con más autenticidad, equilibrio y propósito en cada área de tu vida." },
              ].map((item, i, arr) => (
                <div key={item.num} style={{ display: "flex", gap: 24, padding: "32px 0", borderBottom: i < arr.length - 1 ? "1px solid rgba(0,0,0,.08)" : "none" }}>
                  <span style={{ fontFamily: "'Playfair Display', serif", fontSize: 11, color: "rgba(188,150,64,.45)", fontWeight: 400, letterSpacing: ".05em", paddingTop: 3, minWidth: 20 }}>{item.num}</span>
                  <div>
                    <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 300, color: "#1D1D1F", marginBottom: 8, lineHeight: 1.2 }}>{item.title}</div>
                    <div style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.85, fontWeight: 300 }}>{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ══ PRESENCIA — IMAGEN B + FLOR DE LA VIDA ══ */}
      <section id="acad-presencia" data-fi-section="acad-presencia" data-fi-label="Presencia" style={{
        position:"relative", height:"100vh", overflow:"hidden", display:"flex", alignItems:"flex-end",
        justifyContent: presenciaCont.justify,
      }}>
        <style>{`
          @keyframes ken-burns-b  { 0%{ transform:scale(1) translate(0,0) } 100%{ transform:scale(1.14) translate(-2.5%,-1.8%) } }
          @keyframes caption-in   { from{ opacity:0; transform:translateY(30px) } to{ opacity:1; transform:translateY(0) } }

          /* — Flor de la Vida: cada círculo se dibuja con trazo de luz — */
          @keyframes fol-draw {
            0%   { stroke-dashoffset: 188.5; opacity: 0; }
            5%   { opacity: 1; }
            22%  { stroke-dashoffset: 0; opacity: 1; }
            70%  { stroke-dashoffset: 0; opacity: 1; }
            88%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          @keyframes fol-draw-outer {
            0%   { stroke-dashoffset: 376.99; opacity: 0; }
            5%   { opacity: 0.8; }
            22%  { stroke-dashoffset: 0; opacity: 0.85; }
            70%  { stroke-dashoffset: 0; opacity: 0.85; }
            88%  { stroke-dashoffset: 0; opacity: 0; }
            100% { stroke-dashoffset: 0; opacity: 0; }
          }
          @keyframes fol-center-pulse {
            0%,100%{ r: 3; opacity:.6; }
            50%    { r: 5; opacity:1;  }
          }

          .fol-c { fill:none; stroke:rgba(212,170,90,.80); stroke-width:.65; filter:url(#fol-glow); stroke-dasharray:188.5; }
          .fol-c0 { animation: fol-draw 26s 0s   ease-in-out infinite backwards; }
          .fol-c1 { animation: fol-draw 26s .8s  ease-in-out infinite backwards; }
          .fol-c2 { animation: fol-draw 26s 1.6s ease-in-out infinite backwards; }
          .fol-c3 { animation: fol-draw 26s 2.4s ease-in-out infinite backwards; }
          .fol-c4 { animation: fol-draw 26s 3.2s ease-in-out infinite backwards; }
          .fol-c5 { animation: fol-draw 26s 4.0s ease-in-out infinite backwards; }
          .fol-c6 { animation: fol-draw 26s 4.8s ease-in-out infinite backwards; }
        `}</style>

        {/* ── Imagen de fondo: Yoga en la naturaleza (opción B) con Ken Burns ── */}
        <div style={{ position:"absolute", inset:0, animation:"ken-burns-b 20s ease-in-out infinite alternate", willChange:"transform" }}>
          <img
            src="https://images.unsplash.com/photo-1545389336-cf090694435e?w=1800&q=90&fit=crop"
            alt="Persona en yoga y presencia plena en la naturaleza"
            style={{ width:"100%", height:"100%", objectFit:"cover", objectPosition:"center 18%", display:"block" }}
          />
        </div>

        {/* Velo oscuro tenue para mejorar blend */}
        <div style={{ position:"absolute", inset:0, background:"rgba(6,4,2,.12)" }}/>

        {/* ── Flor de la Vida — SVG con blend screen ── */}
        <div style={{ position:"absolute", inset:0, display:"flex", alignItems:"center", justifyContent:"center", mixBlendMode:"screen", pointerEvents:"none" }}>
          <svg viewBox="0 0 200 200" style={{ width:"min(64vh,560px)", height:"min(64vh,560px)" }}>
            <defs>
              {/* Glow del haz de luz: dos capas de blur + trazo original */}
              <filter id="fol-glow" x="-60%" y="-60%" width="220%" height="220%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="soft"/>
                <feGaussianBlur in="SourceGraphic" stdDeviation="0.8" result="sharp"/>
                <feMerge>
                  <feMergeNode in="soft"/>
                  <feMergeNode in="sharp"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              {/* Clip al medallón */}
              <clipPath id="fol-clip"><circle cx="100" cy="100" r="61"/></clipPath>
            </defs>

            {/* Círculo exterior del medallón */}
            <circle
              fill="none" stroke="rgba(212,170,90,.55)" strokeWidth=".45"
              filter="url(#fol-glow)"
              strokeDasharray="376.99"
              style={{ animation:"fol-draw-outer 26s 5.6s ease-in-out infinite backwards" }}
              cx="100" cy="100" r="60"
            />

            {/* Los 7 círculos de la Flor de la Vida, recortados al medallón */}
            <g clipPath="url(#fol-clip)">
              {/* Centro */}
              <circle className="fol-c fol-c0" cx="100"    cy="100"    r="30"/>
              {/* 6 pétalos a distancia r en ángulos 0°, 60°, 120°, 180°, 240°, 300° */}
              <circle className="fol-c fol-c1" cx="130"    cy="100"    r="30"/>
              <circle className="fol-c fol-c2" cx="115"    cy="74.02"  r="30"/>
              <circle className="fol-c fol-c3" cx="85"     cy="74.02"  r="30"/>
              <circle className="fol-c fol-c4" cx="70"     cy="100"    r="30"/>
              <circle className="fol-c fol-c5" cx="85"     cy="125.98" r="30"/>
              <circle className="fol-c fol-c6" cx="115"    cy="125.98" r="30"/>
            </g>

            {/* Punto central pulsante (origen del haz de luz) */}
            <circle cx="100" cy="100" r="3" fill="rgba(255,240,180,.9)" filter="url(#fol-glow)"
              style={{ animation:"fol-center-pulse 3s ease-in-out infinite" }}/>
          </svg>
        </div>

        {/* Gradiente inferior para texto */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to bottom, rgba(0,0,0,0) 30%, rgba(0,0,0,.42) 68%, rgba(0,0,0,.68) 100%)" }}/>
        {/* Gradiente lateral izquierdo */}
        <div style={{ position:"absolute", inset:0, background:"linear-gradient(to right, rgba(0,0,0,.16) 0%, transparent 52%)" }}/>

        {/* ── Texto ── */}
        <div className="acad-presencia-text" style={{ ...presenciaCont.style, position:"relative", zIndex:1, animation:"caption-in 1.2s .3s ease both" }}>
          <span data-fi-key="academy.presencia.label" style={{ fontSize:10, letterSpacing:".28em", textTransform:"uppercase", color:"rgba(212,170,90,.85)", fontWeight:700, display:"block", marginBottom:20 }}>{presenciaLabel}</span>
          <h2 style={{ fontFamily:"'Playfair Display', serif", fontSize:"clamp(32px,5vw,64px)", fontWeight:300, color:"#ffffff", lineHeight:1.08, margin:"0 0 24px", letterSpacing:"-.02em", textShadow:"0 2px 24px rgba(0,0,0,.5)" }}>
            <span data-fi-key="academy.presencia.title1">{presenciaTitle1}</span><br/>
            <em style={{ fontStyle:"italic", color:"#D4AA5A" }}><span data-fi-key="academy.presencia.title2">{presenciaTitle2}</span></em>
          </h2>
          <p data-fi-key="academy.presencia.body" style={{ fontSize:17, color:"rgba(255,255,255,.72)", lineHeight:1.80, fontWeight:300, margin:"0 0 36px", maxWidth:460, textShadow:"0 1px 8px rgba(0,0,0,.35)", whiteSpace:"pre-wrap" }}>
            {presenciaBody}
          </p>
          <button data-fi-key="academy.presencia.cta" onClick={() => scrollTo("acad-cursos")} style={{ background:"transparent", border:"1px solid rgba(212,170,90,.5)", color:"#D4AA5A", padding:"13px 32px", borderRadius:9999, fontSize:13, fontWeight:600, cursor:"pointer", letterSpacing:".06em", backdropFilter:"blur(8px)", WebkitBackdropFilter:"blur(8px)", transition:"all .25s" }}
            onMouseEnter={e=>{ (e.currentTarget as HTMLButtonElement).style.background="rgba(188,150,64,.15)"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(212,170,90,.9)"; }}
            onMouseLeave={e=>{ (e.currentTarget as HTMLButtonElement).style.background="transparent"; (e.currentTarget as HTMLButtonElement).style.borderColor="rgba(212,170,90,.5)"; }}>
            {presenciaCta}
          </button>
        </div>
      </section>

      {/* ══ GALERÍA ══ */}
      <GaleriaAcademia />

      {/* ══ LOS 4 PRINCIPIOS ══ */}
      <section id="acad-principios" data-fi-section="acad-principios" data-fi-label="Principios" className="acad-section" style={{ padding: "96px 40px", background: "#F2F3F5" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="fi-reveal" style={{ ...principiosCont.style }}>
            <h2 data-fi-key="acad.principios.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 20px" }}>{principiosTitle}</h2>
            <div style={{ height: 3, width: 80, background: "linear-gradient(135deg,#795901,#bc9640)", borderRadius: 9999, margin: "0 auto" }} />
          </div>
          <div className="acad-4col fi-reveal fi-reveal-d1" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#f0f0f0", borderRadius: 16, overflow: "hidden" }}>
            {[
              { num: p0num, title: p0title, desc: p0desc, nk: "acad.principio.0.num", tk: "acad.principio.0.title", dk: "acad.principio.0.desc" },
              { num: p1num, title: p1title, desc: p1desc, nk: "acad.principio.1.num", tk: "acad.principio.1.title", dk: "acad.principio.1.desc" },
              { num: p2num, title: p2title, desc: p2desc, nk: "acad.principio.2.num", tk: "acad.principio.2.title", dk: "acad.principio.2.desc" },
              { num: p3num, title: p3title, desc: p3desc, nk: "acad.principio.3.num", tk: "acad.principio.3.title", dk: "acad.principio.3.desc" },
            ].map((p, i) => (
              <div key={i} data-fi-block={`acad-principio-${i}`} data-fi-label={`Principio ${p.num}`} style={{ padding: "32px 24px", background: "#fff" }}>
                <div data-fi-key={p.nk} style={{ fontFamily: "'Playfair Display', serif", fontSize: 13, color: "rgba(188,150,64,.5)", letterSpacing: ".05em", marginBottom: 10 }}>{p.num}</div>
                <div data-fi-key={p.tk} style={{ fontFamily: "'Playfair Display', serif", fontSize: 20, fontWeight: 400, color: "#1D1D1F", marginBottom: 10 }}>{p.title}</div>
                <div data-fi-key={p.dk} style={{ fontSize: 13, color: "#6E6E73", lineHeight: 1.7 }}>{p.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ TESTIMONIOS ══ */}
      <section id="acad-testimonios" data-fi-section="acad-testimonios" data-fi-label="Testimonios" className="acad-section" style={{ padding: "112px 40px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>

          {/* Header */}
          <div className="fi-reveal" style={{ ...testimoniosCont.style }}>
            <span data-fi-key="acad.test.label" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#795901", marginBottom: 16, display: "block", fontWeight: 600 }}>{testLabel}</span>
            <h2 data-fi-key="acad.test.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(28px,4vw,48px)", fontWeight: 400, color: "#1D1D1F", margin: 0, lineHeight: 1.1 }}>{testTitle}</h2>
          </div>

          {/* Featured quote */}
          <div className="fi-reveal fi-reveal-d1" style={{ maxWidth: 720, margin: "0 auto 80px", textAlign: "center" }}>
            <p data-fi-key="acad.test.main.q" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(19px,2.2vw,26px)", fontStyle: "italic", fontWeight: 300, lineHeight: 1.65, color: "#1D1D1F", margin: "0 0 32px", letterSpacing: "-.01em" }}>
              "{testMainQ}"
            </p>
            <div style={{ height: 1, width: 40, background: "#BC9640", margin: "0 auto 24px", opacity: .6 }} />
            <div data-fi-key="acad.test.main.name" style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F", letterSpacing: ".08em", textTransform: "uppercase" }}>{testMainName}</div>
            <div data-fi-key="acad.test.main.role" style={{ fontSize: 11, color: "#86868B", marginTop: 5, letterSpacing: ".04em" }}>{testMainRole}</div>
          </div>

          {/* Three testimonials — no cards, just text separated by lines */}
          <div className="acad-3col fi-reveal fi-reveal-d2" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 0 }}>
            {[
              { q: test0q, name: test0name, role: test0role, qk: "acad.test.0.q", nk: "acad.test.0.name", rk: "acad.test.0.role" },
              { q: test1q, name: test1name, role: test1role, qk: "acad.test.1.q", nk: "acad.test.1.name", rk: "acad.test.1.role" },
              { q: test2q, name: test2name, role: test2role, qk: "acad.test.2.q", nk: "acad.test.2.name", rk: "acad.test.2.role" },
            ].map((t, i) => (
              <div key={i} data-fi-block={`acad-test-${i}`} data-fi-label={`Testimonio ${i+1}`} className="acad-testimonios-col" style={{ padding: "0 36px", borderLeft: i > 0 ? "1px solid rgba(121,89,1,.12)" : "none" }}>
                <p data-fi-key={t.qk} style={{ fontFamily: "'Playfair Display', serif", fontSize: 15, fontStyle: "italic", fontWeight: 300, color: "#3a3a3c", lineHeight: 1.8, marginBottom: 24 }}>"{t.q}"</p>
                <div data-fi-key={t.nk} style={{ fontSize: 12, fontWeight: 600, color: "#1D1D1F", letterSpacing: ".06em", textTransform: "uppercase" }}>{t.name}</div>
                <div data-fi-key={t.rk} style={{ fontSize: 11, color: "#86868B", marginTop: 4, letterSpacing: ".03em" }}>{t.role}</div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══ CONTACTO ══ */}
      <section id="acad-contacto" data-fi-section="acad-contacto" data-fi-label="Contacto" className="acad-section" style={{ padding: "96px 40px", background: "#F0F4F3" }}>
        <div data-fi-grid="acad-contacto" className="acad-2col" style={{ maxWidth: 1280, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "start" }}>
          <div className="fi-reveal" style={{ ...contactCont.style }}>
            <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#795901", marginBottom: 16, display: "block", fontWeight: 600 }}>Contacto</span>
            <h2 data-fi-key="academy.contact.title" style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(36px,4.5vw,60px)", fontWeight: 400, color: "#1D1D1F", lineHeight: 1.08, margin: "0 0 24px" }}>{contactTitle}</h2>
            <p data-fi-key="academy.contact.sub" style={{ fontSize: 16, color: "#6E6E73", lineHeight: 1.8, marginBottom: 36 }}>{contactSub}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                { icon: "📧", text: "hola@frecuenciaintegral.com" },
                { icon: "⏱", text: "Respondemos en menos de 48h" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 14, color: "#6E6E73" }}>
                  <span style={{ fontSize: 20 }}>{c.icon}</span>
                  {c.text}
                </div>
              ))}
            </div>
          </div>
          <div className="acad-contact-card" style={{ background: "#FAFAF8", borderRadius: 20, padding: 40, boxShadow: "0 8px 40px rgba(0,0,0,.06)", border: "1px solid rgba(0,0,0,.06)" }}>
            {contactSent ? (
              <div style={{ textAlign: "center", padding: "40px 0" }}>
                <div style={{ fontSize: 48, marginBottom: 20 }}>✦</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 24, color: "#1D1D1F", marginBottom: 12 }}>Mensaje recibido</h3>
                <p style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.7 }}>Gracias por tu mensaje. Te responderemos en menos de 48 horas.</p>
              </div>
            ) : (
              <form onSubmit={handleContactSubmit}>
                <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                  <input type="text" placeholder="Tu nombre" value={contactForm.name} onChange={e => setContactForm(p => ({ ...p, name: e.target.value }))} required
                    style={{ padding: "13px 16px", background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, fontSize: 14, color: "#1D1D1F", outline: "none", boxSizing: "border-box", width: "100%" }} />
                  <input type="email" placeholder="Tu email" value={contactForm.email} onChange={e => setContactForm(p => ({ ...p, email: e.target.value }))} required
                    style={{ padding: "13px 16px", background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, fontSize: 14, color: "#1D1D1F", outline: "none", boxSizing: "border-box", width: "100%" }} />
                  <select value={contactForm.curso} onChange={e => setContactForm(p => ({ ...p, curso: e.target.value }))}
                    style={{ padding: "13px 16px", background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, fontSize: 14, color: contactForm.curso ? "#1D1D1F" : "#86868B", outline: "none", boxSizing: "border-box", width: "100%", cursor: "pointer" }}>
                    <option value="">¿Qué curso te interesa?</option>
                    <option value="tct">Método TCT</option>
                    <option value="deportista">El Deportista Consciente (lista de espera)</option>
                    <option value="info">Información general</option>
                  </select>
                  <textarea rows={4} placeholder="Tu mensaje..." value={contactForm.message} onChange={e => setContactForm(p => ({ ...p, message: e.target.value }))} required
                    style={{ padding: "13px 16px", background: "#ffffff", border: "1px solid rgba(0,0,0,.08)", borderRadius: 12, fontSize: 14, color: "#1D1D1F", outline: "none", boxSizing: "border-box", width: "100%", resize: "vertical" }} />
                  <button type="submit" style={{ background: "#1D1D1F", color: "#fff", border: "none", padding: "13px 30px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", alignSelf: "flex-start" }}>
                    Enviar mensaje →
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* ══ FOOTER ══ */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        <BlockRenderer zone="home" />
      </div>

      <footer className="acad-footer" style={{ background: "#1c1814", padding: "64px 40px 32px" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div className="acad-footer-cols" style={{ display: "grid", gridTemplateColumns: "1.5fr 1fr 1fr", gap: 60, marginBottom: 48 }}>
            <div>
              <div style={{ fontFamily: "'Playfair Display', serif", fontSize: 22, color: "#D4AA5A", marginBottom: 8 }}>Frecuencia Integral</div>
              <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)", letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 16 }}>Academy</div>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,.7)", lineHeight: 1.7 }}>Desarrollo consciente aplicado a la vida real. Presencia, transformación y acción desde el ser.</p>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 20 }}>Cursos</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["Método TCT", "/metodo"], ["El Deportista Consciente", "/deportista"], ["Acceso Alumnos", "/login"]].map(([label, href]) => (
                  <button key={label} onClick={() => setLocation(href)} style={{ background: "none", border: "none", fontSize: 13, color: "rgba(255,255,255,.85)", cursor: "pointer", textAlign: "left", padding: 0, transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#D4AA5A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}>{label}</button>
                ))}
              </div>
            </div>
            <div>
              <div style={{ fontSize: 11, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.6)", marginBottom: 20 }}>Academia</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {[["La Academia", "acad-que-es"], ["Los Principios", "acad-principios"], ["Contacto", "acad-contacto"]].map(([label, id]) => (
                  <button key={label as string} onClick={() => id ? scrollTo(id as string) : undefined} style={{ background: "none", border: "none", fontSize: 13, color: "rgba(255,255,255,.85)", cursor: "pointer", textAlign: "left", padding: 0, transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#D4AA5A")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.85)")}>{label as string}</button>
                ))}
              </div>
            </div>
          </div>
          <div className="acad-footer-bottom" style={{ paddingTop: 24, borderTop: "1px solid rgba(255,255,255,.12)", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>© {new Date().getFullYear()} Frecuencia Integral Academy. Todos los derechos reservados.</span>
            <div className="acad-footer-links" style={{ display: "flex", gap: 20, alignItems: "center", flexWrap: "wrap" }}>
              {[["Aviso Legal", "/aviso-legal"], ["Privacidad", "/privacidad"], ["Cookies", "/cookies"]].map(([label, href]) => (
                <button key={label} onClick={() => setLocation(href)}
                  style={{ background: "none", border: "none", fontSize: 12, color: "rgba(255,255,255,.65)", cursor: "pointer", padding: 0, transition: "color .2s", fontFamily: "inherit" }}
                  onMouseEnter={e => (e.currentTarget.style.color = "#D4AA5A")}
                  onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.65)")}>
                  {label}
                </button>
              ))}
              <span style={{ fontSize: 12, color: "rgba(255,255,255,.55)" }}>Hecho con presencia ✦</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
