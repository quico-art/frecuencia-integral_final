import { useState, useEffect, useRef, useCallback, lazy, Suspense } from "react";
const BookCoverCanvas = lazy(() => import("@/components/BookCoverCanvas"));
import { useLocation } from "wouter";
import { getAuth } from "@/lib/auth";
import { useContent } from "@/hooks/useContent";
import { useContainerStyle } from "@/hooks/useContainerStyle";
import { getContentValue } from "@/lib/content";
import BlockRenderer from "@/components/BlockRenderer";
import { startCheckout, type PlanId } from "@/lib/checkout";

const GATES = [
  { key: "blanca", num: "I", title: "Blanca", sub: "Cimentación", weeks: "S. 1–12", desc: "El despertar de la presencia. Aprendes a observar sin identificarte. El primer contacto real contigo mismo.", price: "95", billing: "Acceso inmediato", color: "#8A7F74", open: true, lockedMsg: "" },
  { key: "roja",   num: "II",  title: "Roja",   sub: "Purificación", weeks: "S. 13–24", desc: "La alquimia emocional. Transformar el sufrimiento en comprensión. El fuego que purifica sin destruir.", price: "95", billing: "Requiere Puerta Blanca", color: "#C54B3A", open: false, lockedMsg: "🔒 Completa la Puerta Blanca para desbloquear" },
  { key: "azul",   num: "III", title: "Azul",   sub: "Maestría", weeks: "S. 25–36", desc: "La mente como instrumento, no como amo. Silencio, claridad y la capacidad de ver sin filtros condicionados.", price: "95", billing: "Requiere Puerta Roja", color: "#2D7DD2", open: false, lockedMsg: "🔒 Completa la Puerta Roja para desbloquear" },
  { key: "arcoiris", num: "IV", title: "Arcoíris", sub: "Integración", weeks: "S. 37–48", desc: "La totalidad. Cuando presencia, emoción y mente se unifican. La vida cotidiana como práctica completa.", price: "95", billing: "Requiere las 3 anteriores", color: "#7B4DAA", open: false, lockedMsg: "🔒 Completa la Puerta Azul para desbloquear" },
];

const PILARS = [
  { num: "I",   title: "Presencia",          desc: "La capacidad de estar aquí, ahora, con plena conciencia. No como concepto sino como estado real y sostenible en cada momento de la vida." },
  { num: "II",  title: "Integración",         desc: "Unir lo que la mente ha separado. Cuerpo, emoción, pensamiento y espíritu como un sistema coherente que actúa en armonía." },
  { num: "III", title: "Transformación",      desc: "El cambio real no viene de la fuerza de voluntad sino de la comprensión profunda. Cuando ves con claridad, la transformación ocurre sola." },
  { num: "IV",  title: "Vibración",           desc: "El sonido como puerta directa al sistema nervioso y a la conciencia. Los cuencos tibetanos como herramienta de reequilibrio profundo." },
  { num: "V",   title: "Tradición Viva",      desc: "Dzogchen, Cuarto Camino, Cábala y UCDM. Sabiduría milenaria no como museo sino como herramienta viva y aplicable hoy." },
  { num: "VI",  title: "Cuerpo Consciente",   desc: "El cuerpo como maestro principal. La sabiduría corporal, el movimiento consciente y el atletismo como vías de conocimiento interior." },
];

const CAMINOS = [
  { title: "Dzogchen",                         sub: "Puerta Azul · Arcoíris",  desc: "La tradición tibetana más elevada. Rigpa — consciencia pura, abierta y luminosa que ya está presente." },
  { title: "El Cuarto Camino · Gurdjieff",     sub: "Puerta Blanca · Roja",   desc: "El despertar en la vida cotidiana. El recuerdo de sí, auto-observación y los tres centros." },
  { title: "Un Curso de Milagros",             sub: "Puerta Roja · Azul",     desc: "Sanación de la mente. El perdón real como herramienta de liberación del ego basado en el miedo." },
  { title: "Cuencos Tibetanos I",              sub: "Puerta Blanca",          desc: "Iniciación al sonido sagrado y la presencia corporal. La tecnología vibracional de la Puerta Blanca." },
  { title: "Cuencos Tibetanos II",             sub: "Puerta Roja",            desc: "Nivel terapéutico. Purificación emocional y liberación de bloqueos energéticos profundos." },
  { title: "Cuencos Tibetanos III",            sub: "Puerta Azul",            desc: "Nivel espiritual avanzado. Apertura de la consciencia y conexión con Rigpa." },
  { title: "Cuencos Tibetanos IV",             sub: "Arcoíris",               desc: "Integración de las tres frecuencias para la transformación completa. Síntesis final del camino." },
  { title: "El Deportista Consciente",         sub: "Puerta Blanca",          desc: "El cuerpo como templo y el rendimiento desde la consciencia. El sentido más allá del resultado." },
  { title: "El Ser Consciente",               sub: "Puerta Roja · Azul",     desc: "Vivir con presencia total. La integración cuerpo-mente-consciencia en lo cotidiano." },
  { title: "Arte & Arteterapia",              sub: "Puerta Blanca · Arcoíris", desc: "La expresión creativa como vía de acceso al alma. La energía interior encuentra su forma visible." },
  { title: "Joyería Energética Sagrada",       sub: "Puerta Oro",             desc: "Cada joya ancla la frecuencia de cada Puerta en el cuerpo físico. Un amuleto vivo de geometría consciente." },
  { title: "Armonización Energética",         sub: "Puerta Roja · Arcoíris",  desc: "A través de la canalización consciente recibimos la guía que necesita el alma en cada etapa." },
];

const VIAJE = [
  { color: "#8A7F74", label: "Semanas 1–12",  title: "Puerta Blanca — Enraizamiento", desc: "Cuerpo y presencia física a través del Cuarto Camino y El Deportista Consciente.", tags: ["Cuarto Camino", "Deportista Consciente", "Cuencos I"] },
  { color: "#C54B3A", label: "Semanas 13–24", title: "Puerta Roja — Purificación",    desc: "Transformación emocional y purificación energética a través de UCDM y el Cuarto Camino emocional.", tags: ["UCDM · El Perdón", "Cuencos II", "Mantras"] },
  { color: "#2D7DD2", label: "Semanas 25–36", title: "Puerta Azul — Maestría",        desc: "Expansión mental y maestría espiritual a través del Dzogchen y El Ser Consciente.", tags: ["Dzogchen · Rigpa", "Cuencos III y IV", "El Ser Consciente"] },
  { color: "#7B4DAA", label: "Semanas 37–48", title: "Puerta Arcoíris — Integración", desc: "Síntesis de las tres puertas. Vivir desde la coherencia, el propósito y la conexión.", tags: ["Integración Total", "Diarios de Práctica", "Maestría Cotidiana"] },
];

const BOOKS = [
  {
    id: "puerta-blanca",
    title: "TCT · Puerta Blanca",
    sub: "Masaje Vibracional — Taller I",
    tagline: "El cuerpo como primer umbral",
    author: "Quico Tent",
    color: "#061817",
    accent: "#2b7d7a",
    tag: "Taller I",
    pages: "88 págs.",
    symbol: "○",
    pdfUrl: "/books/puerta-blanca.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "puerta-roja",
    title: "TCT · Puerta Roja",
    sub: "Masaje Vibracional — Taller II",
    tagline: "La voz, la energía y el sonido primordial",
    author: "Quico Tent",
    color: "#1f0a08",
    accent: "#C54B3A",
    tag: "Taller II",
    pages: "58 págs.",
    symbol: "△",
    pdfUrl: "/books/puerta-roja.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "puerta-azul",
    title: "TCT · Puerta Azul",
    sub: "Masaje Vibracional — Taller III",
    tagline: "La mente, Rigpa y el corazón de la tradición",
    author: "Quico Tent",
    color: "#060f1f",
    accent: "#2D7DD2",
    tag: "Taller III",
    pages: "81 págs.",
    symbol: "□",
    pdfUrl: "/books/puerta-azul.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "tct-anexos",
    title: "TCT · Anexos",
    sub: "EONTOT — Objetos Sagrados",
    tagline: "Profundización en la formación TCT",
    author: "Quico Tent",
    color: "#0f0c02",
    accent: "#BC9640",
    tag: "Anexo TCT",
    pages: "138 págs.",
    symbol: "⊕",
    pdfUrl: "/books/tct-anexos.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "deportista-consciente",
    title: "El Deportista Consciente",
    sub: "Más allá del resultado",
    tagline: "Alto rendimiento desde la consciencia",
    author: "Quico Tent",
    color: "#0d1f1e",
    accent: "#4aaaa6",
    tag: "Libro · Deporte",
    pages: "197 págs.",
    symbol: "⬡",
    pdfUrl: "/books/deportista-consciente.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "ser-consciente",
    title: "El Ser Consciente",
    sub: "Más allá de la acción",
    tagline: "Vivir con presencia en la vida y el deporte",
    author: "Quico Tent",
    color: "#1a1208",
    accent: "#BC9640",
    tag: "Libro · Bienestar",
    pages: "163 págs.",
    symbol: "◎",
    pdfUrl: "/books/ser-consciente.pdf",
    coverImg: null as string | null,
    available: true,
  },
  {
    id: "arte-espiritualidad",
    title: "Portales de Luz",
    sub: "Arte y espiritualidad",
    tagline: "Todos los caminos llevan a Roma",
    author: "Quico Tent",
    color: "#1e2a2e",
    accent: "#2b7d7a",
    tag: "Conferencia",
    pages: "85 págs.",
    symbol: "✧",
    pdfUrl: "/books/arte-espiritualidad.pdf",
    coverImg: "/books/portales-de-luz.jpg" as string | null,
    available: true,
  },
  {
    id: "guerrero-dzogchen",
    title: "El Viaje del Guerrero Dzogchen",
    sub: "Cuencos Tibetanos · 4to Camino",
    tagline: "La puerta del sonido hacia Rigpa",
    author: "Quico Tent",
    color: "#120a1f",
    accent: "#9B6DD4",
    tag: "Formación Avanzada",
    pages: "47 págs.",
    symbol: "✦",
    pdfUrl: "/books/guerrero-dzogchen.pdf",
    coverImg: null as string | null,
    available: true,
  },
];

const S = {
  font: "'Plus Jakarta Sans', system-ui, sans-serif",
  serif: "'Playfair Display', Georgia, serif",
  gold: "#795901",
  goldL: "#BC9640",
  text: "#1D1D1F",
  muted: "#6E6E73",
  light: "#F5F5F7",
};

export default function Landing() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user] = useState(getAuth());
  const [checkoutLoading, setCheckoutLoading] = useState<PlanId | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const toastTimer   = useRef<ReturnType<typeof setTimeout> | null>(null);
  const carouselRef  = useRef<HTMLDivElement>(null);
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  const closeLightbox = useCallback(() => setLightboxIdx(null), []);
  const prevBook = useCallback(() => setLightboxIdx(i => i === null ? null : (i - 1 + BOOKS.length) % BOOKS.length), []);
  const nextBook = useCallback(() => setLightboxIdx(i => i === null ? null : (i + 1) % BOOKS.length), []);

  useEffect(() => {
    if (lightboxIdx === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape")      closeLightbox();
      if (e.key === "ArrowLeft")   prevBook();
      if (e.key === "ArrowRight")  nextBook();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [lightboxIdx, closeLightbox, prevBook, nextBook]);

  function showToast(msg: string) {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToastMsg(msg);
    toastTimer.current = setTimeout(() => setToastMsg(null), 3500);
  }

  const scrollBooks = useCallback((dir: 1 | -1) => {
    const el = carouselRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * 320, behavior: "smooth" });
  }, []);
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

  async function handleCheckout(planId: PlanId) {
    setCheckoutLoading(planId);
    setCheckoutError(null);
    try {
      await startCheckout(planId);
    } catch (err: any) {
      setCheckoutError(err.message ?? "Error al iniciar el pago");
      setCheckoutLoading(null);
    }
  }

  const [heroBadge]      = useContent("landing.hero.badge",       "Método TCT · Frecuencia Integral Academy");
  const [secCamino]      = useContent("landing.sec.camino",       "El Camino");
  const [secEspecial]    = useContent("landing.sec.especial",     "Puerta Especial");
  const [secGratis]      = useContent("landing.sec.gratis",       "Sin compromiso · Gratis");
  const [secLibre]       = useContent("landing.sec.libre",        "Acceso libre");
  const [secMetodo]      = useContent("landing.sec.metodo",       "El Método");
  const [secFundamentos] = useContent("landing.sec.fundamentos",  "Fundamentos");
  const [secViaje]       = useContent("landing.sec.viaje",        "El Viaje");
  const [secFormacion]   = useContent("landing.sec.formacion",    "Formación");
  const [secEquipo]      = useContent("landing.sec.equipo",       "El Equipo");
  const [secIntegracion] = useContent("landing.sec.integracion",  "La Integración Total");
  const [secTestimonios] = useContent("landing.sec.testimonios",  "Transformaciones reales");

  // ── Contenedores de sección ──────────────────────────────────────────────
  const heroCont        = useContainerStyle("landing.hero",        { pos:"left",   maxW:"560" });
  const puertasCont     = useContainerStyle("landing.puertas",     { pos:"left",   maxW:"560",  padB:"56" });
  const libreCont       = useContainerStyle("landing.libre",       { pos:"left",   maxW:"560",  padB:"56" });
  const queCont         = useContainerStyle("landing.que",         { pos:"center", maxW:"700",  padB:"80" });
  const pilaresCont     = useContainerStyle("landing.pilares",     { pos:"center", maxW:"700",  padB:"80" });
  const viajeCont       = useContainerStyle("landing.viaje",       { pos:"center", maxW:"700",  padB:"80" });
  const caminosCont     = useContainerStyle("landing.caminos",     { pos:"center", maxW:"700",  padB:"80" });
  const equipoCont      = useContainerStyle("landing.equipo",      { pos:"center", maxW:"700",  padB:"80" });
  const testimoniosCont = useContainerStyle("landing.testimonios", { pos:"center", maxW:"700",  padB:"80" });
  const ctaCont         = useContainerStyle("landing.cta",         { pos:"center", maxW:"900" });

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  return (
    <div style={{ fontFamily: S.font, background: "#fff", color: S.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fu{from{opacity:0;transform:translateY(20px)}to{opacity:1;transform:translateY(0)}}
        @keyframes acad-rotate{to{transform:rotate(360deg)}}
        .fu0{animation:fu .8s ease both}.fu1{animation:fu .8s .12s ease both}.fu2{animation:fu .8s .24s ease both}.fu3{animation:fu .8s .36s ease both}
        .gc{transition:transform .25s,box-shadow .25s}.gc:hover{transform:translateY(-4px);box-shadow:0 16px 40px rgba(0,0,0,.08)!important}
        .pbtn{transition:opacity .2s}.pbtn:hover{opacity:.85}
        @media(max-width:900px){
          .tl{display:none!important}.tm{display:flex!important}
          .land-nav{padding:0 20px!important}
          #land-hero{padding:90px 24px 52px!important}
          .hero-grid{grid-template-columns:1fr!important;gap:36px!important}
          .hero-grid svg{width:200px!important;height:200px!important;order:-1}
          .g2{grid-template-columns:1fr!important;gap:40px!important}
          .g4{grid-template-columns:1fr 1fr!important}
          .g3{grid-template-columns:1fr 1fr!important}
          .g6{grid-template-columns:1fr 1fr!important}
          .sp{padding:72px 24px!important}
          .pg{grid-template-columns:1fr 1fr!important}
          .sticky-col{position:static!important}
          .oro-grid{grid-template-columns:1fr!important;text-align:center!important}
          .oro-grid>div:last-child{width:100%!important}
          .oro-inner{padding:36px 28px!important}
          #land-cta,#land-final{padding:64px 24px!important}
          .land-footer{padding:32px 24px!important}
        }
        @media(max-width:640px){
          #land-hero{padding:76px 20px 44px!important}
          .sp{padding:56px 20px!important}
          .g4{grid-template-columns:1fr!important}
          .pg{grid-template-columns:1fr!important}
          .g3{grid-template-columns:1fr!important}
          .hero-stats{gap:32px!important;justify-content:center!important}
          .hero-stats>div{text-align:center!important}
          .viaje-item{flex-direction:column!important;gap:16px!important;padding:24px 20px!important}
          .viaje-bar{width:48px!important;height:4px!important;min-height:unset!important}
          .equipo-photo{aspect-ratio:3/2!important;max-height:220px!important}
          .land-footer{padding:28px 20px!important}
          #land-cta,#land-final{padding:56px 20px!important}
          .land-footer-bottom{flex-direction:column!important;align-items:flex-start!important;gap:16px!important}
          .land-footer-links{flex-wrap:wrap!important;gap:12px!important}
        }
        @media(max-width:480px){
          #land-hero{padding:68px 16px 36px!important}
          .sp{padding:48px 16px!important}
          .g6{grid-template-columns:1fr!important}
          .viaje-item{padding:20px 16px!important}
          #land-cta,#land-final{padding:48px 16px!important}
          .land-footer{padding:24px 16px!important}
        }
      `}</style>

      {/* NAV */}
      <nav className="land-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 60, background: scrolled ? "rgba(255,255,255,.95)" : "rgba(255,255,255,.88)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "background .3s" }}>
        <button onClick={() => setLocation("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="37" stroke="#795901" strokeWidth="3.5" opacity="1"/><circle cx="40" cy="40" r="20" stroke="#BC9640" strokeWidth="2.2" opacity="1"/><circle cx="40" cy="40" r="3" fill="#795901" opacity="1"/></svg>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: S.serif, fontSize: 14, fontWeight: 400, color: S.text, lineHeight: 1 }}>Método TCT</div>
            <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 2 }}>Frecuencia Integral</div>
          </div>
        </button>
        <div className="tl" style={{ display: "flex", alignItems: "center", gap: 28 }}>
          {[["El Método","tct-que-es"],["Las Puertas","tct-puertas"],["El Viaje","tct-viaje"],["12 Caminos","tct-caminos"]].map(([l,id]) => (
            <button key={l} onClick={() => go(id)} style={{ background: "none", border: "none", fontSize: 13, color: S.muted, cursor: "pointer", fontWeight: 400 }}
              onMouseEnter={e=>(e.currentTarget.style.color=S.text)} onMouseLeave={e=>(e.currentTarget.style.color=S.muted)}>{l}</button>
          ))}
          <button onClick={() => setLocation("/libros")} style={{ background: "none", border: "none", fontSize: 13, color: S.muted, cursor: "pointer" }}
            onMouseEnter={e=>(e.currentTarget.style.color=S.text)} onMouseLeave={e=>(e.currentTarget.style.color=S.muted)}>Libros</button>
          <button onClick={() => setLocation("/")} style={{ background: "none", border: "none", fontSize: 13, color: S.muted, cursor: "pointer" }}>← Academia</button>
          <button onClick={() => setLocation(user.isLoggedIn ? "/area" : "/login?course=tct")} style={{ background: S.text, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Área Alumnos"}
          </button>
        </div>
        <button className="tm" onClick={() => setMobileOpen(true)} style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {[0,1,2].map(i=><div key={i} style={{ width: 20, height: 1.5, background: S.text, borderRadius: 2 }}/>)}
        </button>
      </nav>

      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: S.light, border: "none", width: 36, height: 36, borderRadius: "50%", fontSize: 16, cursor: "pointer" }}>✕</button>
          {/* Nivel 1 — secciones de esta página */}
          {[["El Método","tct-que-es"],["Las Puertas","tct-puertas"],["El Viaje","tct-viaje"],["12 Caminos","tct-caminos"]].map(([l,id]) => (
            <button key={l} onClick={()=>go(id)} style={{ fontFamily: S.serif, fontSize: 26, color: "#1D1D1F", background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>{l}</button>
          ))}
          {/* Separador */}
          <div style={{ width: 48, borderTop: "1px solid rgba(0,0,0,.1)", margin: "4px 0 20px" }} />
          {/* Nivel 2 — página hermana */}
          <button onClick={() => { setMobileOpen(false); setLocation("/libros"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 20, letterSpacing: ".1em", textTransform: "uppercase", color: "#BC9640", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginBottom: 14 }}>→ Libros</button>
          {/* Nivel 3 — raíz */}
          <button onClick={() => { setMobileOpen(false); setLocation("/"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 18, letterSpacing: ".08em", color: "#9E9E9E", background: "none", border: "none", cursor: "pointer", marginBottom: 28 }}>↑ Academia</button>
          {/* CTA */}
          <button onClick={() => { setMobileOpen(false); setLocation(user.isLoggedIn ? "/area" : "/login?course=tct"); }} style={{ background: S.text, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Acceso Alumnos"}
          </button>
        </div>
      )}

      {/* HERO — dark, intentional */}
      <section id="land-hero" data-fi-section="land-hero" data-fi-label="Hero" style={{ minHeight: "100vh", background: "linear-gradient(160deg,#1c1814 0%,#22180e 60%,#1a1208 100%)", position: "relative", overflow: "hidden", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 48px 64px" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 55% 65% at 65% 45%,rgba(188,150,64,.07) 0%,transparent 65%)", pointerEvents: "none" }}/>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }} className="hero-grid">
          {/* Left: text */}
          <div style={{ ...heroCont.style, maxWidth: undefined }}>
            <div data-fi-key="landing.hero.badge" className="fu0" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(188,150,64,.1)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 9999, padding: "5px 16px", fontSize: 10, color: "#D4AA5A", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 40 }}>
              {heroBadge}
            </div>
            <h1 className="fu1" style={{ fontFamily: S.serif, fontSize: "clamp(48px,5.5vw,88px)", fontWeight: 300, lineHeight: 1.03, color: "#FAF8F5", margin: "0 0 24px", letterSpacing: "-.025em" }}>
              <span data-fi-key="landing.hero.title">{getContentValue("landing.hero.title","Tu Camino de")}</span><br/><em data-fi-key="landing.hero.title.em" style={{ fontStyle: "italic", color: "#BC9640" }}>{getContentValue("landing.hero.title.em","Transformación")}</em>
            </h1>
            <p data-fi-key="landing.hero.desc" className="fu2" style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "rgba(250,248,245,.45)", lineHeight: 1.8, maxWidth: 480, marginBottom: 56, fontWeight: 300 }}>
              {getContentValue("landing.hero.desc","48 semanas · 4 Puertas · 12 Caminos de sabiduría milenaria integrados en una metodología práctica para la vida contemporánea.")}
            </p>
            <div className="hero-stats" style={{ display: "flex", gap: 56, flexWrap: "wrap", borderTop: "1px solid rgba(255,255,255,.06)", paddingTop: 40 }}>
              {[["48","Semanas"],["4","Puertas"],["12","Caminos"]].map(([n,l])=>(
                <div key={l}>
                  <div style={{ fontFamily: S.serif, fontSize: 28, fontWeight: 300, color: "#BC9640", lineHeight: 1 }}>{n}</div>
                  <div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 6 }}>{l}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: mandala symbol */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
            <svg style={{ width: "min(42vw,480px)", height: "min(42vw,480px)", animation: "acad-rotate 60s linear infinite", opacity: .88 }} viewBox="0 0 400 400" fill="none">
              <circle cx="200" cy="200" r="196" stroke="#D4AA5A" strokeWidth="2" opacity=".35"/>
              <circle cx="200" cy="200" r="130.9" stroke="#BC9640" strokeWidth="2" opacity=".5"/>
              <circle cx="200" cy="200" r="80.9" stroke="#D4AA5A" strokeWidth="1.8" opacity=".55"/>
              <circle cx="200" cy="200" r="50" stroke="#BC9640" strokeWidth="1.6" opacity=".5"/>
              <line x1="200" y1="200" x2="324.5" y2="240.5" stroke="#D4AA5A" strokeWidth="1.4" opacity=".4"/>
              <line x1="200" y1="200" x2="200.0" y2="330.9" stroke="#D4AA5A" strokeWidth="1.4" opacity=".4"/>
              <line x1="200" y1="200" x2="75.5" y2="240.5" stroke="#D4AA5A" strokeWidth="1.4" opacity=".4"/>
              <line x1="200" y1="200" x2="123.1" y2="94.1" stroke="#D4AA5A" strokeWidth="1.4" opacity=".4"/>
              <line x1="200" y1="200" x2="276.9" y2="94.1" stroke="#D4AA5A" strokeWidth="1.4" opacity=".4"/>
              <line x1="200" y1="200" x2="250.0" y2="200.0" stroke="#D4AA5A" strokeWidth="1.8" opacity=".7"/>
              <line x1="200" y1="200" x2="175.0" y2="243.3" stroke="#D4AA5A" strokeWidth="1.8" opacity=".7"/>
              <line x1="200" y1="200" x2="175.0" y2="156.7" stroke="#D4AA5A" strokeWidth="1.8" opacity=".7"/>
              <line x1="200" y1="200" x2="257.2" y2="257.2" stroke="#BC9640" strokeWidth="1.6" opacity=".65"/>
              <line x1="200" y1="200" x2="142.8" y2="257.2" stroke="#BC9640" strokeWidth="1.6" opacity=".65"/>
              <line x1="200" y1="200" x2="142.8" y2="142.8" stroke="#BC9640" strokeWidth="1.6" opacity=".65"/>
              <line x1="200" y1="200" x2="257.2" y2="142.8" stroke="#BC9640" strokeWidth="1.6" opacity=".65"/>
              <circle cx="200" cy="200" r="12" fill="#D4AA5A" opacity=".95"/>
              <circle cx="250.0" cy="200.0" r="7" fill="#D4AA5A" opacity=".95"/>
              <circle cx="175.0" cy="243.3" r="7" fill="#D4AA5A" opacity=".95"/>
              <circle cx="175.0" cy="156.7" r="7" fill="#D4AA5A" opacity=".95"/>
              <circle cx="257.2" cy="257.2" r="8" fill="#BC9640" opacity=".9"/>
              <circle cx="142.8" cy="257.2" r="8" fill="#BC9640" opacity=".9"/>
              <circle cx="142.8" cy="142.8" r="8" fill="#BC9640" opacity=".9"/>
              <circle cx="257.2" cy="142.8" r="8" fill="#BC9640" opacity=".9"/>
              <circle cx="324.5" cy="240.5" r="9" fill="#D4AA5A" opacity=".8"/>
              <circle cx="200.0" cy="330.9" r="9" fill="#D4AA5A" opacity=".8"/>
              <circle cx="75.5" cy="240.5" r="9" fill="#D4AA5A" opacity=".8"/>
              <circle cx="123.1" cy="94.1" r="9" fill="#D4AA5A" opacity=".8"/>
              <circle cx="276.9" cy="94.1" r="9" fill="#D4AA5A" opacity=".8"/>
              <path d="M200 70 C240 110 330 150 330 200 C330 250 240 290 200 330 C160 290 70 250 70 200 C70 150 160 110 200 70Z" stroke="#D4AA5A" strokeWidth="1.8" fill="none" opacity=".45"/>
              <path d="M70 200 C110 160 150 70 200 70 C250 70 290 160 330 200 C290 240 250 330 200 330 C150 330 110 240 70 200Z" stroke="#BC9640" strokeWidth="1.5" fill="none" opacity=".35"/>
            </svg>
          </div>
        </div>
      </section>

      {/* LAS 4 PUERTAS — Apple white */}
      <section id="tct-puertas" data-fi-section="land-puertas" data-fi-label="Puertas" className="sp" style={{ padding: "96px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...puertasCont.style }}>
            <span data-fi-key="landing.sec.camino" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 14 }}>{secCamino}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,4.5vw,56px)", fontWeight: 300, color: S.text, margin: "0 0 16px", lineHeight: 1.08 }}><span data-fi-key="landing.puertas.h2">{getContentValue("landing.puertas.h2","Las cuatro")}</span> <em data-fi-key="landing.puertas.h2em" style={{ fontStyle: "italic", color: S.gold }}>{getContentValue("landing.puertas.h2em","puertas")}</em></h2>
            <p data-fi-key="landing.puertas.desc" style={{ fontSize: 15, color: S.muted, lineHeight: 1.75, margin: 0 }}>{getContentValue("landing.puertas.desc","Cada puerta es un ciclo de 12 semanas. Se abre en tu momento. Solo los alumnos que han cruzado una puerta acceden a la siguiente.")}</p>
          </div>

          <div className="pg" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 1, background: "#f0f0f0", borderRadius: 20, overflow: "hidden" }}>
            {GATES.map((g,i) => (
              <div key={g.key} data-fi-block={`land-gate-${i}`} data-fi-label={`Puerta ${g.title}`} className="gc"
                onClick={!g.open ? () => showToast(g.lockedMsg) : undefined}
                style={{ background: "#fff", padding: "32px 28px 36px", position: "relative", opacity: g.open ? 1 : .7, cursor: g.open ? "default" : "pointer" }}>
                <div style={{ width: "100%", height: 3, background: g.open ? g.color : "#E5E5EA", borderRadius: 9999, marginBottom: 28 }}/>
                <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: S.muted, fontWeight: 700, marginBottom: 6 }}>Puerta {g.num}</div>
                <div data-fi-key={`landing.gate.${i}.title`} style={{ fontFamily: S.serif, fontSize: 32, fontWeight: 300, color: g.open ? g.color : S.text, lineHeight: 1, marginBottom: 4 }}>{getContentValue(`landing.gate.${i}.title`,g.title)}</div>
                <div style={{ fontSize: 11, color: S.muted, marginBottom: 20 }}><span data-fi-key={`landing.gate.${i}.sub`}>{getContentValue(`landing.gate.${i}.sub`,g.sub)}</span> · <span data-fi-key={`landing.gate.${i}.weeks`}>{getContentValue(`landing.gate.${i}.weeks`,g.weeks)}</span></div>
                <p data-fi-key={`landing.gate.${i}.desc`} style={{ fontSize: 13, color: S.muted, lineHeight: 1.7, marginBottom: 28, minHeight: 76 }}>{getContentValue(`landing.gate.${i}.desc`,g.desc)}</p>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
                  <div style={{ fontFamily: S.serif, fontSize: 36, fontWeight: 300, color: S.text, lineHeight: 1 }}>€<span data-fi-key={`landing.gate.${i}.price`}>{getContentValue(`landing.gate.${i}.price`,g.price)}</span><span style={{ fontSize: 14, color: S.muted, fontWeight: 400 }}>/mes</span></div>
                  <p data-fi-key={`landing.gate.${i}.billing`} style={{ fontSize: 11, color: "#AEAEB2", marginTop: 4, marginBottom: 20 }}>{getContentValue(`landing.gate.${i}.billing`,g.billing)}</p>
                  <button
                    onClick={g.open ? () => handleCheckout("puerta_blanca") : () => showToast(g.lockedMsg)}
                    disabled={g.open && checkoutLoading === "puerta_blanca"}
                    style={{ width: "100%", padding: "11px 0", borderRadius: 9999, border: g.open ? "none" : "1px solid #E5E5EA", fontSize: 12, fontWeight: 600, cursor: g.open ? "pointer" : "pointer", background: g.open ? S.text : "transparent", color: g.open ? "#fff" : "#AEAEB2", letterSpacing: ".06em", opacity: checkoutLoading === "puerta_blanca" ? 0.7 : 1 }}>
                    {g.open ? (checkoutLoading === "puerta_blanca" ? "Redirigiendo…" : "Acceder ahora →") : "🔒 Bloqueada"}
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* PUERTA ORO — light gold tint */}
          <div data-fi-block="land-oro" data-fi-label="Programa Oro" className="oro-grid oro-inner" style={{ display: "grid", gridTemplateColumns: "1fr auto", gap: 64, alignItems: "center", background: "#FAFAF8", border: "1px solid rgba(188,150,64,.15)", borderRadius: 20, padding: "52px 48px", marginTop: 16, position: "relative", overflow: "hidden" }}>
            <div style={{ position: "absolute", right: -10, top: "50%", transform: "translateY(-50%)", fontFamily: S.serif, fontSize: "clamp(100px,18vw,240px)", fontWeight: 300, color: "rgba(188,150,64,.05)", lineHeight: 1, pointerEvents: "none", letterSpacing: "-.05em" }}>Oro</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <span data-fi-key="landing.sec.especial" style={{ fontSize: 10, letterSpacing: ".25em", textTransform: "uppercase", color: S.goldL, fontWeight: 700, marginBottom: 12, display: "block" }}>{secEspecial}</span>
              <div style={{ fontFamily: S.serif, fontSize: "clamp(40px,5vw,72px)", fontWeight: 300, color: S.text, lineHeight: 1, marginBottom: 12 }}>Oro</div>
              <p data-fi-key="landing.oro.sub" style={{ fontSize: 13, letterSpacing: ".08em", textTransform: "uppercase", color: S.muted, marginBottom: 20 }}>{getContentValue("landing.oro.sub","Acceso completo · Las cuatro puertas · Todo el camino")}</p>
              <p data-fi-key="landing.oro.desc" style={{ fontSize: 15, color: S.muted, lineHeight: 1.8, maxWidth: 480 }}>{getContentValue("landing.oro.desc","Un solo pago que incluye las 48 semanas completas, todos los materiales y la joya que integra todo el proceso. El camino sin interrupciones.")}</p>
              <a href="https://quicotp.wixsite.com/quicotent" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: S.gold, textDecoration: "none", fontWeight: 600, letterSpacing: ".06em", display: "inline-block", marginTop: 14 }}>
                Ver joyería energética →
              </a>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0, position: "relative", zIndex: 1 }}>
              <div data-fi-key="landing.oro.price" style={{ fontFamily: S.serif, fontSize: 64, fontWeight: 300, color: S.text, lineHeight: 1 }}>{getContentValue("landing.oro.price","€890")}</div>
              <p data-fi-key="landing.oro.billing" style={{ fontSize: 11, color: S.muted, letterSpacing: ".08em", marginBottom: 24, marginTop: 6 }}>{getContentValue("landing.oro.billing","Pago único · Acceso total")}</p>
              <button
                onClick={() => handleCheckout("puerta_oro")}
                disabled={checkoutLoading === "puerta_oro"}
                className="pbtn"
                style={{ background: S.text, color: "#fff", border: "none", padding: "13px 32px", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap", opacity: checkoutLoading === "puerta_oro" ? 0.7 : 1 }}>
                {checkoutLoading === "puerta_oro" ? "Redirigiendo…" : <span data-fi-key="landing.oro.btn">{getContentValue("landing.oro.btn","Acceso Completo →")}</span>}
              </button>
              {checkoutError && (
                <p style={{ fontSize: 11, color: "#C54B3A", marginTop: 10, textAlign: "center" }}>{checkoutError}</p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ACCESO LIBRE */}
      <section id="tct-libre" data-fi-section="land-libre" data-fi-label="Acceso Libre" className="sp" style={{ padding: "96px 48px", background: S.light }}>
        <div className="g2" style={{ maxWidth: 1100, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 360px", gap: 80, alignItems: "start" }}>
          <div style={{ ...libreCont.style, maxWidth: undefined }}>
            <span data-fi-key="landing.sec.gratis" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#2b7d7a", fontWeight: 700, display: "block", marginBottom: 14 }}>{secGratis}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: S.text, lineHeight: 1.1, margin: "0 0 20px" }}>
              <span data-fi-key="landing.libre.h2">{getContentValue("landing.libre.h2","¿No estás seguro?")}</span><br/><em data-fi-key="landing.libre.h2em" style={{ fontStyle: "italic", color: "#2b7d7a" }}>{getContentValue("landing.libre.h2em","Empieza sin riesgo.")}</em>
            </h2>
            <p data-fi-key="landing.libre.desc" style={{ fontSize: 15, color: S.muted, lineHeight: 1.8, marginBottom: 40, maxWidth: 460 }}>
              {getContentValue("landing.libre.desc","Accede gratis a la primera semana del Método TCT. Sin tarjeta. Sin presión. Completa la semana y la siguiente se abrirá para ti automáticamente.")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[["01","El Precio Oculto de Vivir Acelerados","landing.libre.l0"]].map(([n,t,k])=>(
                <div key={n} style={{ display: "flex", gap: 20, padding: "18px 0", borderBottom: "1px solid rgba(0,0,0,.07)", alignItems: "baseline" }}>
                  <span style={{ fontFamily: S.serif, fontSize: 18, fontWeight: 300, color: "#2b7d7a", minWidth: 28, lineHeight: 1 }}>{n}</span>
                  <span data-fi-key={k} style={{ fontSize: 15, color: S.text }}>{getContentValue(k,t)}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ background: "#fff", borderRadius: 20, padding: "36px 32px", boxShadow: "0 2px 16px rgba(0,0,0,.06)", position: "sticky", top: 80 }}>
            <span data-fi-key="landing.sec.libre" style={{ fontSize: 10, letterSpacing: ".2em", textTransform: "uppercase", color: "#2b7d7a", fontWeight: 700, display: "block", marginBottom: 12 }}>{secLibre}</span>
            <div data-fi-key="landing.libre.price" style={{ fontFamily: S.serif, fontSize: 60, fontWeight: 300, color: S.text, lineHeight: 1 }}>{getContentValue("landing.libre.price","0€")}</div>
            <p data-fi-key="landing.libre.billing" style={{ fontSize: 10, letterSpacing: ".1em", color: "#AEAEB2", textTransform: "uppercase", marginBottom: 24, marginTop: 4 }}>{getContentValue("landing.libre.billing","para siempre")}</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
              {[["1 semana completa","landing.libre.f0"],["Ejercicios y materiales","landing.libre.f1"],["Arteterapia y Diario","landing.libre.f2"],["Sin tarjeta de crédito","landing.libre.f3"]].map(([t,k])=>(
                <div key={k} style={{ fontSize: 14, color: S.text, display: "flex", gap: 10, alignItems: "center" }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: S.goldL, flexShrink: 0 }}/><span data-fi-key={k}>{getContentValue(k,t)}</span>
                </div>
              ))}
            </div>
            <button onClick={() => setLocation("/login?course=tct&tab=register&plan=prueba")} className="pbtn" style={{ width: "100%", padding: "13px", background: "#2b7d7a", color: "#fff", border: "none", borderRadius: 9999, fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
              <span data-fi-key="landing.libre.btn">{getContentValue("landing.libre.btn","Crear cuenta gratis")}</span>
            </button>
            <p data-fi-key="landing.libre.note" style={{ fontSize: 11, color: "#AEAEB2", lineHeight: 1.5, textAlign: "center", marginTop: 12 }}>{getContentValue("landing.libre.note","Cuando quieras continuar, el curso completo te espera.")}</p>
          </div>
        </div>
      </section>

      {/* QUÉ ES */}
      <section id="tct-que-es" data-fi-section="land-que-es" data-fi-label="El Método" className="sp" style={{ padding: "112px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div data-fi-grid="land-que-es" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 96, alignItems: "start" }} className="g2">
            <div style={{ ...queCont.style, maxWidth: undefined }}>
              <span data-fi-key="landing.sec.metodo" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 20 }}>{secMetodo}</span>
              <h2 style={{ fontFamily: S.serif, fontSize: "clamp(32px,4vw,56px)", fontWeight: 300, color: S.text, margin: "0 0 28px", lineHeight: 1.05, letterSpacing: "-.015em" }}>
                <span data-fi-key="landing.quees.h2">{getContentValue("landing.quees.h2","Un sistema de vida,")}</span><br/><span data-fi-key="landing.quees.h2b">{getContentValue("landing.quees.h2b","no un curso más.")}</span>
              </h2>
              <p data-fi-key="landing.quees.p1" style={{ fontSize: 16, color: S.muted, lineHeight: 1.9, margin: "0 0 20px", fontWeight: 300 }}>
                {getContentValue("landing.quees.p1","TCT combina el sonido vibracional de los cuencos tibetanos con la sabiduría del Dzogchen, el Cuarto Camino de Gurdjieff y la Cábala Mística — integrados en una metodología práctica para la vida contemporánea.")}
              </p>
              <p data-fi-key="landing.quees.p2" style={{ fontSize: 16, color: S.muted, lineHeight: 1.9, margin: 0, fontWeight: 300 }}>
                {getContentValue("landing.quees.p2","No es espiritualidad de retiro. Es presencia que funciona en el trabajo, las relaciones, el cuerpo y la mente.")}
              </p>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {[
                { n: "I",   tk: "landing.quees.c0.t", t: "Progresivo",  dk: "landing.quees.c0.d", d: "Cuatro puertas de 12 semanas. Cada etapa construye sobre la anterior con intención y estructura." },
                { n: "II",  tk: "landing.quees.c1.t", t: "Integrado",   dk: "landing.quees.c1.d", d: "Tradiciones milenarias + herramientas contemporáneas. Cuerpo, mente, emoción y espíritu en un solo camino." },
                { n: "III", tk: "landing.quees.c2.t", t: "Aplicado",    dk: "landing.quees.c2.d", d: "Cada práctica está diseñada para transformar situaciones reales de tu vida cotidiana." },
                { n: "IV",  tk: "landing.quees.c3.t", t: "Individual",  dk: "landing.quees.c3.d", d: "Tu ritmo, tu momento. El inicio es personal. La joya de cada puerta se recibe al completarla." },
              ].map((c, i, arr) => (
                <div key={c.n} data-fi-block={`land-c-${i}`} data-fi-label={`Característica ${c.n}`} style={{ display: "flex", gap: 24, padding: "28px 0", borderBottom: i < arr.length - 1 ? "1px solid #f0f0f0" : "none" }}>
                  <span style={{ fontFamily: S.serif, fontSize: 11, color: "rgba(188,150,64,.5)", fontWeight: 400, letterSpacing: ".05em", paddingTop: 3, minWidth: 16 }}>{c.n}</span>
                  <div>
                    <div data-fi-key={c.tk} style={{ fontFamily: S.serif, fontSize: 19, fontWeight: 300, color: S.text, marginBottom: 6 }}>{getContentValue(c.tk,c.t)}</div>
                    <p data-fi-key={c.dk} style={{ fontSize: 13, color: S.muted, lineHeight: 1.75, margin: 0 }}>{getContentValue(c.dk,c.d)}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6 PILARES */}
      <section id="land-pilares" data-fi-section="land-pilares" data-fi-label="Pilares" className="sp" style={{ padding: "112px 48px", background: S.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...pilaresCont.style }}>
            <span data-fi-key="landing.sec.fundamentos" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 16 }}>{secFundamentos}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: S.text, margin: 0, lineHeight: 1.05, letterSpacing: "-.015em" }}>
              <span data-fi-key="landing.pilares.h2">{getContentValue("landing.pilares.h2","Los seis pilares del método")}</span>
            </h2>
          </div>
          <div className="g6" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#e5e5ea", borderRadius: 20, overflow: "hidden" }}>
            {PILARS.map((p,pi)=>(
              <div key={p.num} data-fi-block={`land-pilar-${pi}`} data-fi-label={`Pilar ${p.num}`} style={{ background: "#fff", padding: "40px 36px" }}>
                <div style={{ fontFamily: S.serif, fontSize: 11, fontWeight: 400, color: "rgba(188,150,64,.45)", letterSpacing: ".1em", marginBottom: 14 }}>{p.num}</div>
                <div data-fi-key={`landing.pilar.${pi}.title`} style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 300, color: S.text, marginBottom: 14, lineHeight: 1.2 }}>{getContentValue(`landing.pilar.${pi}.title`,p.title)}</div>
                <p data-fi-key={`landing.pilar.${pi}.desc`} style={{ fontSize: 13, color: S.muted, lineHeight: 1.85, margin: 0 }}>{getContentValue(`landing.pilar.${pi}.desc`,p.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICACIONES — carrusel de libros */}
      <section id="tct-publicaciones" data-fi-section="land-publicaciones" data-fi-label="Publicaciones" style={{ background: "#0f0c06", padding: "96px 0 80px", overflow: "hidden" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 48px" }} className="sp-pub">
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", marginBottom: 52, flexWrap: "wrap", gap: 20 }}>
            <div>
              <span style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: "#BC9640", fontWeight: 700, display: "block", marginBottom: 14 }}>Publicaciones</span>
              <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "#FAF8F5", margin: 0, lineHeight: 1.05 }}>
                El conocimiento <em style={{ fontStyle: "italic", color: "#BC9640" }}>en papel</em>
              </h2>
              <p style={{ fontSize: 14, color: "rgba(250,248,245,.35)", marginTop: 12, lineHeight: 1.75, maxWidth: 480 }}>
                Libros y manuales de formación escritos por Quico Tent. Cada publicación es el mapa de una etapa del camino.
              </p>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => scrollBooks(-1)} aria-label="Anterior" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(188,150,64,.3)", background: "transparent", color: "#BC9640", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(188,150,64,.12)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>←</button>
              <button onClick={() => scrollBooks(1)}  aria-label="Siguiente" style={{ width: 44, height: 44, borderRadius: "50%", border: "1px solid rgba(188,150,64,.3)", background: "transparent", color: "#BC9640", fontSize: 18, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "all .2s" }}
                onMouseEnter={e=>{e.currentTarget.style.background="rgba(188,150,64,.12)";}} onMouseLeave={e=>{e.currentTarget.style.background="transparent";}}>→</button>
            </div>
          </div>
        </div>

        {/* carrusel scroll */}
        <div ref={carouselRef} style={{ display: "flex", gap: 20, overflowX: "auto", paddingLeft: "max(24px, calc((100vw - 1100px)/2 + 48px))", paddingRight: 48, paddingBottom: 8, scrollbarWidth: "none", msOverflowStyle: "none" }}>
          <style>{`.book-card{transition:transform .25s,box-shadow .25s}.book-card:hover{transform:translateY(-6px) !important;box-shadow:0 24px 56px rgba(0,0,0,.5) !important}`}</style>
          {BOOKS.map((b, bi) => (
            <div key={b.id} className="book-card" onClick={() => setLightboxIdx(bi)} style={{ flexShrink: 0, width: 200, cursor: "pointer" }}>
              {/* Badge ENCIMA de la portada */}
              <div style={{ marginBottom: 7 }}>
                <span style={{
                  display: "inline-block",
                  padding: "3px 9px",
                  borderRadius: 4,
                  background: b.accent,
                  fontSize: 7,
                  fontWeight: 800,
                  letterSpacing: ".14em",
                  textTransform: "uppercase",
                  color: "#fff",
                }}>{b.tag}</span>
              </div>
              {/* Portada */}
              <div style={{ width: 200, height: 300, borderRadius: 8, background: b.color, position: "relative", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,.4), 4px 0 0 rgba(0,0,0,.25) inset" }}>
                {/* Cover: imagen JPG si existe, si no PDF canvas */}
                {b.coverImg
                  ? <img src={b.coverImg} alt={b.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", transform: "scale(1.22) translateY(-14%)", transformOrigin: "top center" }} />
                  : <Suspense fallback={
                      <div style={{ width: 200, height: 300, display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,.12)", borderTopColor: b.accent, borderRadius: "50%", animation: "acad-rotate 0.9s linear infinite" }}/>
                      </div>
                    }>
                      <BookCoverCanvas
                        pdfUrl={b.pdfUrl}
                        width={200}
                        height={300}
                        fallback={
                          <div style={{ textAlign: "center", padding: 16 }}>
                            <div style={{ fontSize: 28, color: b.accent, opacity: .6 }}>{b.symbol}</div>
                            <div style={{ fontSize: 10, color: "rgba(255,255,255,.3)", marginTop: 8 }}>{b.title}</div>
                          </div>
                        }
                      />
                    </Suspense>
                }
                {/* Lomo izquierdo */}
                <div style={{ position: "absolute", left: 0, top: 0, width: 8, height: "100%", background: "linear-gradient(90deg,rgba(0,0,0,.45) 0%,transparent 100%)", pointerEvents: "none" }}/>
                {/* Gradiente inferior con título y páginas */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "32px 12px 14px", background: `linear-gradient(to top, ${b.color}f5 40%, ${b.color}80 70%, transparent)`, pointerEvents: "none" }}>
                  <div style={{ fontSize: 7, color: "rgba(250,248,245,.5)", letterSpacing: ".10em", textTransform: "uppercase", marginBottom: 3, fontWeight: 600 }}>{b.pages}</div>
                  <div style={{ fontFamily: S.serif, fontSize: 12, fontWeight: 400, color: "#FAF8F5", lineHeight: 1.25, marginBottom: 2 }}>{b.title}</div>
                  <div style={{ fontSize: 9, color: "rgba(250,248,245,.45)", lineHeight: 1.35 }}>{b.sub}</div>
                </div>
              </div>
              {/* Tagline bajo portada */}
              <div style={{ paddingTop: 10, paddingLeft: 2 }}>
                <p style={{ fontSize: 11, color: "rgba(250,248,245,.75)", lineHeight: 1.55, margin: 0, fontWeight: 400 }}>{b.tagline}</p>
              </div>
            </div>
          ))}
          {/* Espacio final */}
          <div style={{ flexShrink: 0, width: 48 }}/>
        </div>

        {/* Consejo CTA */}
        <div style={{ maxWidth: 1100, margin: "40px auto 0", padding: "0 48px" }} className="sp-pub">
          <div style={{ borderTop: "1px solid rgba(188,150,64,.12)", paddingTop: 32, display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
            <p style={{ fontSize: 13, color: "rgba(250,248,245,.65)", margin: 0, lineHeight: 1.7 }}>
              Los manuales de formación TCT se incluyen en tu acceso a cada Puerta. Los libros están disponibles próximamente en formato digital.
            </p>
            <button onClick={() => setLocation("/libros")} style={{ fontSize: 12, color: "#BC9640", background: "none", border: "1px solid rgba(188,150,64,.35)", padding: "8px 20px", borderRadius: 9999, fontWeight: 600, letterSpacing: ".06em", whiteSpace: "nowrap", cursor: "pointer" }}>
              Ver todos los libros →
            </button>
          </div>
        </div>
      </section>

      {/* EL VIAJE 48 SEMANAS */}
      <section id="tct-viaje" data-fi-section="land-viaje" data-fi-label="El Viaje" className="sp" style={{ padding: "112px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...viajeCont.style }}>
            <span data-fi-key="landing.sec.viaje" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 16 }}>{secViaje}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: S.text, margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-.015em" }}>
              <span data-fi-key="landing.viaje.h2">{getContentValue("landing.viaje.h2","48 semanas, cuatro etapas")}</span>
            </h2>
            <p data-fi-key="landing.viaje.desc" style={{ fontSize: 15, color: S.muted, maxWidth: 480, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>{getContentValue("landing.viaje.desc","Un camino progresivo desde el enraizamiento físico hasta la maestría espiritual.")}</p>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1px", background: "#f0f0f0", borderRadius: 20, overflow: "hidden" }}>
            {VIAJE.map((v,vi)=>(
              <div key={v.label} data-fi-block={`land-viaje-${vi}`} data-fi-label={`Etapa ${vi+1}`} style={{ background: "#fff", padding: "40px 48px", display: "flex", alignItems: "flex-start", gap: 48 }} className="viaje-item">
                <div className="viaje-bar" style={{ width: 3, borderRadius: 9999, background: v.color, alignSelf: "stretch", flexShrink: 0 }}/>
                <div style={{ flex: 1 }}>
                  <div data-fi-key={`landing.viaje.${vi}.label`} style={{ fontSize: 10, fontWeight: 700, color: v.color, letterSpacing: ".12em", textTransform: "uppercase", marginBottom: 8 }}>{getContentValue(`landing.viaje.${vi}.label`,v.label)}</div>
                  <div data-fi-key={`landing.viaje.${vi}.title`} style={{ fontFamily: S.serif, fontSize: 22, fontWeight: 300, color: S.text, marginBottom: 10, lineHeight: 1.2 }}>{getContentValue(`landing.viaje.${vi}.title`,v.title)}</div>
                  <p data-fi-key={`landing.viaje.${vi}.desc`} style={{ fontSize: 14, color: S.muted, lineHeight: 1.75, marginBottom: 16, margin: "0 0 16px" }}>{getContentValue(`landing.viaje.${vi}.desc`,v.desc)}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {v.tags.map(t=>(
                      <span key={t} style={{ background: S.light, color: S.muted, borderRadius: 9999, padding: "4px 14px", fontSize: 11, fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MANDALA — INTACTO */}
      <section id="land-cta" data-fi-section="land-cta" data-fi-label="Integración" style={{ background: "#1c1814", padding: "80px 48px", display:"flex", flexDirection:"column", alignItems: ctaCont.justify }}>
        <div style={{ ...ctaCont.style }}>
          <span data-fi-key="landing.sec.integracion" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: "#BC9640", marginBottom: 16, display: "block", fontWeight: 700 }}>{secIntegracion}</span>
          <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: "#FAF8F5", margin: "0 0 16px", lineHeight: 1.1 }}>
            <span data-fi-key="landing.integ.h2">{getContentValue("landing.integ.h2","12 Herramientas ·")}</span> <em data-fi-key="landing.integ.h2em" style={{ fontStyle: "italic", color: "#BC9640" }}>{getContentValue("landing.integ.h2em","Un Solo Ser")}</em>
          </h2>
          <p data-fi-key="landing.integ.desc" style={{ fontSize: 14, color: "rgba(255,255,255,.3)", maxWidth: 460, margin: "0 auto 52px", lineHeight: 1.8 }}>
            {getContentValue("landing.integ.desc","Cada tradición ilumina el mismo centro. No hay jerarquía — hay convergencia. Todas las sendas apuntan al mismo punto: tú.")}
          </p>
          <div style={{ maxWidth: 520, margin: "0 auto" }}>
            <svg viewBox="50 50 700 700" xmlns="http://www.w3.org/2000/svg" style={{ width: "100%", height: "auto" }}>
              <defs>
                <radialGradient id="mbg2" cx="50%" cy="50%" r="50%"><stop offset="0%" stopColor="#b89558" stopOpacity=".15"/><stop offset="100%" stopColor="#b89558" stopOpacity="0"/></radialGradient>
                <filter id="mglow2"><feGaussianBlur stdDeviation="3" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
              </defs>
              <circle cx="400" cy="400" r="380" fill="url(#mbg2)"/>
              <circle cx="400" cy="400" r="300" fill="none" stroke="rgba(184,149,88,.18)" strokeWidth="1.5"/>
              <circle cx="400" cy="400" r="210" fill="none" stroke="rgba(184,149,88,.07)" strokeWidth="1" strokeDasharray="4,12"/>
              <circle cx="400" cy="400" r="120" fill="none" stroke="rgba(184,149,88,.1)" strokeWidth="1"/>
              <g stroke="rgba(184,149,88,.22)" strokeWidth="1.2">
                {[[400,100],[550,140.2],[659.8,250],[700,400],[659.8,550],[550,659.8],[400,700],[250,659.8],[140.2,550],[100,400],[140.2,250],[250,140.2]].map(([x,y],i)=>(
                  <line key={i} x1="400" y1="400" x2={x} y2={y}/>
                ))}
              </g>
              {[
                [400,100,"🏔️","Dzogchen"],[550,140.2,"⚙️","IV Camino"],[659.8,250,"💛","UCDM"],[700,400,"🌿","Cuencos I"],
                [659.8,550,"🔥","Cuencos II"],[550,659.8,"🔵","Cuencos III"],[400,700,"🌈","Cuencos IV"],[250,659.8,"🏃","Deportista"],
                [140.2,550,"🧘","Ser Consciente"],[100,400,"🌀","Armonización"],[140.2,250,"💎","Joyería"],[250,140.2,"🎨","Arte"],
              ].map(([cx,cy,emoji,label])=>(
                <g key={label as string} filter="url(#mglow2)">
                  <circle cx={cx as number} cy={cy as number} r="38" fill="#2e2820" stroke="#b89558" strokeWidth="1.8"/>
                  <text x={cx as number} y={(cy as number)-10} textAnchor="middle" fontSize="22">{emoji as string}</text>
                  <text x={cx as number} y={(cy as number)+12} textAnchor="middle" fontSize="9" fill="rgba(255,255,255,.65)" fontFamily="Plus Jakarta Sans,sans-serif" fontWeight="500">{label as string}</text>
                </g>
              ))}
              <circle cx="400" cy="400" r="72" fill="#2e2820" stroke="rgba(184,149,88,.45)" strokeWidth="1.5"/>
              <text x="400" y="385" textAnchor="middle" fontSize="12" fill="#d4a85a" fontFamily="Palatino,serif" fontStyle="italic" fontWeight="600">El Ser</text>
              <polygon points="400,393 402,399 408,397 406,403 412,401 407,406 413,408 407,410 409,416 403,414 401,420 399,414 393,416 395,410 389,408 395,406 390,401 396,403 394,397 400,399" fill="#b89558" opacity=".9"/>
              <text x="400" y="432" textAnchor="middle" fontSize="12" fill="#d4a85a" fontFamily="Palatino,serif" fontStyle="italic" fontWeight="600">Humano</text>
            </svg>
          </div>
        </div>
      </section>

      {/* 12 CAMINOS */}
      <section id="tct-caminos" data-fi-section="land-caminos" data-fi-label="12 Caminos" className="sp" style={{ padding: "112px 48px", background: S.light }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ ...caminosCont.style }}>
            <span data-fi-key="landing.sec.formacion" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 16 }}>{secFormacion}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: S.text, margin: "0 0 16px", lineHeight: 1.05, letterSpacing: "-.015em" }}>
              <span data-fi-key="landing.caminos.h2">{getContentValue("landing.caminos.h2","12 caminos,")}</span><br/><span data-fi-key="landing.caminos.h2b">{getContentValue("landing.caminos.h2b","una sola transformación")}</span>
            </h2>
            <p data-fi-key="landing.caminos.desc" style={{ fontSize: 15, color: S.muted, maxWidth: 500, margin: "0 auto", lineHeight: 1.8, fontWeight: 300 }}>
              {getContentValue("landing.caminos.desc","Tradiciones milenarias e instrumentos vibracionales que convergen en un único sistema de vida.")}
            </p>
          </div>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: "1px", background: "#e5e5ea", borderRadius: 20, overflow: "hidden" }}>
            {CAMINOS.map((c,ci)=>(
              <div key={ci} data-fi-block={`land-camino-${ci}`} data-fi-label={`Camino ${ci+1}`} style={{ background: "#fff", padding: "32px 28px" }}>
                <div data-fi-key={`landing.camino.${ci}.title`} style={{ fontFamily: S.serif, fontSize: 17, fontWeight: 300, color: S.text, marginBottom: 8, lineHeight: 1.3 }}>{getContentValue(`landing.camino.${ci}.title`,c.title)}</div>
                <div data-fi-key={`landing.camino.${ci}.sub`} style={{ fontSize: 9, color: S.goldL, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 14 }}>{getContentValue(`landing.camino.${ci}.sub`,c.sub)}</div>
                <p data-fi-key={`landing.camino.${ci}.desc`} style={{ fontSize: 12, color: S.muted, lineHeight: 1.8, margin: 0 }}>{getContentValue(`landing.camino.${ci}.desc`,c.desc)}</p>
                {c.title === "Joyería Energética Sagrada" && (
                  <a href="https://quicotp.wixsite.com/quicotent" target="_blank" rel="noopener noreferrer"
                    style={{ fontSize: 11, color: S.gold, textDecoration: "none", fontWeight: 600, letterSpacing: ".06em", display: "inline-block", marginTop: 14 }}>
                    Ver colección →
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── EL EQUIPO TCT ── */}
      <section id="land-equipo" data-fi-section="land-equipo" data-fi-label="Equipo" className="sp" style={{ padding: "96px 48px", background: "#FAFAF8" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ ...equipoCont.style }}>
            <span data-fi-key="landing.sec.equipo" style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 14 }}>{secEquipo}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: S.text, margin: "0 0 12px", lineHeight: 1.08 }}><span data-fi-key="landing.equipo.h2">{getContentValue("landing.equipo.h2","Las personas detrás del")}</span> <em data-fi-key="landing.equipo.h2em" style={{ fontStyle: "italic", color: S.gold }}>{getContentValue("landing.equipo.h2em","Método TCT")}</em></h2>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {[
              { mk: "em0", name: "Quico Tent", role: "Maestro Artesano · Terapeuta Vibracional · Co-fundador", bio: "El mundo del Arte, el Diseño, la Joyería y la Espiritualidad se fusionan en Quico en un espacio humanista único. Maestro Artesano en Joyería con formación en Massana, Le Arti Orafe de Florencia y la Escola Superior de Disseny, ha recorrido un camino que une la creación artística con el acompañamiento vibracional y la exploración espiritual desde hace más de dos décadas. A través del sonido y la vibración con cuencos tibetanos inicia procesos de re-descubrimiento interior, creando espacios para observar, transformar y equilibrar cuerpo, energía y mente.", tags: ["Cuencos Tibetanos","Dzogchen","Cuarto Camino · Gurdjieff","Cábala Mística","Reiki Usui","UCDM","Registros Akáshicos","Joyería de Autor"], photo: null, initial: "Q", quote: "A través del vehículo del sonido y la vibración tomamos consciencia de nuestra realidad y experimentamos la sabiduría esencial que habita en cada uno de nosotros.", reverse: false },
              { mk: "em1", name: "Marga Barceló", role: "Co-fundadora · Frecuencia Integral", bio: "Marga forma parte esencial del alma de Frecuencia Integral Academy desde sus inicios. Co-creadora de los espacios y procesos que dan vida a cada formación. Su presentación completa estará disponible muy pronto.", tags: ["Próximamente"], photo: null, initial: "M", quote: "Su historia y visión se presentarán muy pronto.", reverse: true },
              { mk: "em2", name: "Jaume Sonomusic", role: "Músico & Terapeuta Sonoro · Frecuencia Integral", bio: "Jaume forma parte esencial del alma de Frecuencia Integral Academy desde sus inicios. Músico y terapeuta sonoro que acompaña los procesos de transformación con el poder del sonido. Su presentación completa estará disponible muy pronto.", tags: ["Próximamente"], photo: null, initial: "J", quote: "Su historia y visión se presentarán muy pronto.", reverse: false },
            ].map((m) => (
              <div key={m.name} data-fi-block={`land-${m.mk}`} data-fi-label={m.name} className="g2" style={{ display: "grid", gridTemplateColumns: "280px 1fr", gap: 64, alignItems: "start", paddingTop: 56, marginTop: 0, borderTop: "1px solid rgba(0,0,0,.07)" }}>
                <div className="equipo-photo" style={{ borderRadius: 16, overflow: "hidden", aspectRatio: "4/5", background: S.light, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
                  {m.photo
                    ? <img src={m.photo} alt={m.name} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}/>
                    : <>
                        <div style={{ fontFamily: S.serif, fontSize: 80, fontWeight: 300, color: "rgba(188,150,64,.2)", lineHeight: 1 }}>{m.initial}</div>
                        <div style={{ fontSize: 10, color: "#AEAEB2", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 8 }}>Foto próximamente</div>
                      </>
                  }
                </div>
                <div>
                  <div data-fi-key={`landing.${m.mk}.name`} style={{ fontFamily: S.serif, fontSize: "clamp(22px,2.5vw,34px)", fontWeight: 400, color: S.text, lineHeight: 1.15, marginBottom: 6 }}>{getContentValue(`landing.${m.mk}.name`,m.name)}</div>
                  <div data-fi-key={`landing.${m.mk}.role`} style={{ fontSize: 12, color: S.gold, fontWeight: 700, letterSpacing: ".04em", textTransform: "uppercase", marginBottom: 24 }}>{getContentValue(`landing.${m.mk}.role`,m.role)}</div>
                  <div style={{ borderLeft: "2px solid rgba(188,150,64,.25)", paddingLeft: 16, marginBottom: 24 }}>
                    <p data-fi-key={`landing.${m.mk}.quote`} style={{ fontFamily: S.serif, fontSize: 15, fontStyle: "italic", color: S.muted, lineHeight: 1.65, margin: 0 }}>"{getContentValue(`landing.${m.mk}.quote`,m.quote)}"</p>
                  </div>
                  <p data-fi-key={`landing.${m.mk}.bio`} style={{ fontSize: 14, color: S.muted, lineHeight: 1.85, marginBottom: 24 }}>{getContentValue(`landing.${m.mk}.bio`,m.bio)}</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                    {m.tags.map(t => <span key={t} style={{ background: S.light, borderRadius: 9999, padding: "4px 12px", fontSize: 11, fontWeight: 500, color: S.muted }}>{t}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIOS */}
      <section id="land-testimonios" data-fi-section="land-testimonios" data-fi-label="Testimonios" className="sp" style={{ padding: "112px 48px", background: "#fff" }}>
        <div style={{ maxWidth: 960, margin: "0 auto" }}>
          <div style={{ ...testimoniosCont.style }}>
            <span data-fi-key="landing.sec.testimonios" style={{ fontSize: 10, letterSpacing: ".22em", textTransform: "uppercase", color: S.gold, fontWeight: 700, display: "block", marginBottom: 16 }}>{secTestimonios}</span>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: S.text, margin: 0, lineHeight: 1.05, letterSpacing: "-.015em" }}><span data-fi-key="landing.test.h2">{getContentValue("landing.test.h2","Lo que dicen los alumnos")}</span></h2>
          </div>
          <blockquote style={{ textAlign: "center", maxWidth: 700, margin: "0 auto 72px", padding: 0, border: "none" }}>
            <p data-fi-key="landing.test.feat.q" style={{ fontFamily: S.serif, fontSize: "clamp(18px,2vw,24px)", fontStyle: "italic", lineHeight: 1.65, color: S.text, margin: "0 0 32px", fontWeight: 300, letterSpacing: "-.01em" }}>
              "{getContentValue("landing.test.feat.q","El Método TCT me devolvió a mí mismo. No es solo un curso — es un sistema de vida que funciona en el trabajo, en el deporte y en las relaciones.")}"
            </p>
            <div data-fi-key="landing.test.feat.name" style={{ fontSize: 13, fontWeight: 600, color: S.text, letterSpacing: ".02em" }}>{getContentValue("landing.test.feat.name","Jordi M.")}</div>
            <div data-fi-key="landing.test.feat.role" style={{ fontSize: 11, color: S.muted, marginTop: 5 }}>{getContentValue("landing.test.feat.role","Puerta Blanca completada · Deportista profesional")}</div>
          </blockquote>
          <div className="g3" style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "#f0f0f0", borderRadius: 20, overflow: "hidden" }}>
            {[
              {qk:"landing.test.t0.q",q:"Las 48 semanas son una promesa que cumple. Cada semana construye sobre la anterior.",nk:"landing.test.t0.n",n:"Álex R.",rk:"landing.test.t0.r",r:"Puerta Roja completada"},
              {qk:"landing.test.t1.q",q:"Los cuencos junto a la práctica del Cuarto Camino han transformado mi relación conmigo misma.",nk:"landing.test.t1.n",n:"Marta L.",rk:"landing.test.t1.r",r:"Puerta Blanca completada"},
              {qk:"landing.test.t2.q",q:"Lo que distingue al Método TCT es que no habla de transformación — la produce.",nk:"landing.test.t2.n",n:"Carlos V.",rk:"landing.test.t2.r",r:"Puerta Azul en curso"},
            ].map(t=>(
              <div key={t.nk} data-fi-block={t.nk.replace("landing.test.","land-test-").replace(".n","")} data-fi-label={`Testimonio ${t.nk.includes("t0")?"1":t.nk.includes("t1")?"2":"3"}`} style={{ background: "#fff", padding: "40px 32px" }}>
                <p data-fi-key={t.qk} style={{ fontFamily: S.serif, fontSize: 15, color: S.text, lineHeight: 1.85, marginBottom: 28, fontStyle: "italic", fontWeight: 300 }}>"{getContentValue(t.qk,t.q)}"</p>
                <div data-fi-key={t.nk} style={{ fontSize: 12, fontWeight: 600, color: S.text, letterSpacing: ".03em" }}>{getContentValue(t.nk,t.n)}</div>
                <div data-fi-key={t.rk} style={{ fontSize: 10, color: S.muted, marginTop: 4, letterSpacing: ".05em", textTransform: "uppercase" }}>{getContentValue(t.rk,t.r)}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section id="land-final" data-fi-section="land-final" data-fi-label="CTA Final" style={{ background: "#F5F5F7", padding: "80px 48px", textAlign: "center" }}>
        <div style={{ maxWidth: 640, margin: "0 auto" }}>
          <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: S.text, margin: "0 0 20px", lineHeight: 1.1 }}>
            <span data-fi-key="landing.cta.h2">{getContentValue("landing.cta.h2","El camino comienza")}</span><br/><span data-fi-key="landing.cta.h2b">{getContentValue("landing.cta.h2b","cuando tú decides")}</span>
          </h2>
          <p data-fi-key="landing.cta.desc" style={{ fontSize: 15, color: S.muted, lineHeight: 1.8, marginBottom: 40 }}>
            {getContentValue("landing.cta.desc","Empieza con la primera semana gratuita o accede directamente a la Puerta Blanca.")}
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => go("tct-libre")} className="pbtn" style={{ background: S.text, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 600, cursor: "pointer" }}><span data-fi-key="landing.cta.btn1">{getContentValue("landing.cta.btn1","Empezar gratis →")}</span></button>
            <button onClick={() => go("tct-puertas")} style={{ background: "transparent", color: S.text, border: "1px solid rgba(0,0,0,.15)", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 500, cursor: "pointer" }}><span data-fi-key="landing.cta.btn2">{getContentValue("landing.cta.btn2","Ver las puertas")}</span></button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        <BlockRenderer zone="metodo" />
      </div>

      <footer className="land-footer" style={{ background: "#111", padding: "40px 48px" }}>
        <div className="land-footer-bottom" style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 20 }}>
          <div>
            <div style={{ fontFamily: S.serif, fontSize: 18, color: "#D4AA5A", marginBottom: 4 }}>Método TCT</div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,.65)", letterSpacing: ".12em", textTransform: "uppercase" }}>Frecuencia Integral Academy</div>
          </div>
          <div className="land-footer-links" style={{ display: "flex", gap: 24, alignItems: "center" }}>
            {[["← Academia","/"],["Deportista","/deportista"],["Acceso Alumnos","/login?course=tct"]].map(([l,h])=>(
              <button key={l} onClick={()=>setLocation(h)} style={{ background: "none", border: "none", color: "rgba(255,255,255,.85)", fontSize: 13, cursor: "pointer" }}
                onMouseEnter={e=>(e.currentTarget.style.color="#D4AA5A")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.85)")}>{l}</button>
            ))}
            <a href="https://quicotp.wixsite.com/quicotent" target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(255,255,255,.85)", fontSize: 13, textDecoration: "none", transition: "color .2s" }}
              onMouseEnter={e=>(e.currentTarget.style.color="#D4AA5A")} onMouseLeave={e=>(e.currentTarget.style.color="rgba(255,255,255,.85)")}>
              Joyería Energética
            </a>
          </div>
          <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>© 2026 Frecuencia Integral Academy</div>
        </div>
      </footer>

      {/* ── Lightbox de libros ── */}
      {lightboxIdx !== null && (() => {
        const lb = BOOKS[lightboxIdx];
        return (
          <div onClick={closeLightbox} style={{
            position: "fixed", inset: 0, zIndex: 10000,
            background: "rgba(0,0,0,.9)",
            backdropFilter: "blur(14px)",
            display: "flex", alignItems: "center", justifyContent: "center",
            animation: "lbFadeIn .2s ease",
          }}>
            <style>{`
              @keyframes lbFadeIn{from{opacity:0}to{opacity:1}}
              @keyframes lbSlide{from{opacity:0;transform:scale(.94)}to{opacity:1;transform:scale(1)}}
              .lb-wrap{display:flex;flex-direction:row;align-items:center;gap:56px;animation:lbSlide .22s ease;padding:0 90px}
              .lb-info{display:flex;flex-direction:column;gap:18px;min-width:260px;max-width:320px}
              .lb-img{width:380px;height:570px;border-radius:14px;overflow:hidden;flex-shrink:0;position:relative;box-shadow:0 40px 100px rgba(0,0,0,.75),8px 0 0 rgba(0,0,0,.3) inset}
              @media(max-width:640px){
                .lb-wrap{flex-direction:column !important;gap:0 !important;padding:0 !important;width:auto !important;align-items:center !important}
                .lb-img{width:78vw !important;height:calc(78vw * 1.5) !important}
                .lb-info{display:none !important}
              }
            `}</style>

            {/* Botón cerrar */}
            <button onClick={closeLightbox} style={{
              position: "fixed", top: 18, right: 18, zIndex: 10001,
              background: "rgba(255,255,255,.12)", border: "none",
              width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
              color: "#fff", fontSize: 16, display: "flex", alignItems: "center", justifyContent: "center",
            }}>✕</button>

            {/* Flecha izquierda */}
            <button onClick={e => { e.stopPropagation(); prevBook(); }} style={{
              position: "fixed", left: 14, top: "50%", transform: "translateY(-50%)", zIndex: 10001,
              background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
              width: 42, height: 42, borderRadius: "50%", cursor: "pointer",
              color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
            }}>‹</button>

            {/* Flecha derecha */}
            <button onClick={e => { e.stopPropagation(); nextBook(); }} style={{
              position: "fixed", right: 14, top: "50%", transform: "translateY(-50%)", zIndex: 10001,
              background: "rgba(255,255,255,.1)", border: "1px solid rgba(255,255,255,.15)",
              width: 42, height: 42, borderRadius: "50%", cursor: "pointer",
              color: "#fff", fontSize: 22, display: "flex", alignItems: "center", justifyContent: "center",
            }}>›</button>

            {/* Contenido principal — no propaga clic */}
            <div onClick={e => e.stopPropagation()} className="lb-wrap">

              {/* Portada */}
              <div className="lb-img" style={{ background: lb.color }}>
                {lb.coverImg
                  ? <img src={lb.coverImg} alt={lb.title} style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center", display: "block", transform: "scale(1.22) translateY(-14%)", transformOrigin: "top center" }} />
                  : <Suspense fallback={
                      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <div style={{ width: 28, height: 28, border: "2px solid rgba(255,255,255,.15)", borderTopColor: lb.accent, borderRadius: "50%", animation: "acad-rotate 0.9s linear infinite" }}/>
                      </div>
                    }>
                      <BookCoverCanvas pdfUrl={lb.pdfUrl} width={380} height={570}
                        fallback={<div style={{ textAlign: "center", padding: 24 }}><div style={{ fontSize: 44, color: lb.accent, opacity: .5 }}>{lb.symbol}</div></div>} />
                    </Suspense>
                }
                <div style={{ position: "absolute", left: 0, top: 0, width: 10, height: "100%", background: "linear-gradient(90deg,rgba(0,0,0,.35) 0%,transparent 100%)", pointerEvents: "none" }} />
              </div>

              {/* Panel de info */}
              <div className="lb-info">
                <span style={{
                  display: "inline-block", padding: "4px 12px", borderRadius: 5,
                  background: lb.accent, fontSize: 8, fontWeight: 800,
                  letterSpacing: ".15em", textTransform: "uppercase", color: "#fff",
                  alignSelf: "flex-start",
                }}>{lb.tag}</span>

                <div style={{ fontFamily: "'Playfair Display',Georgia,serif", fontSize: 26, fontWeight: 400, color: "#FAF8F5", lineHeight: 1.15 }}>{lb.title}</div>
                <div style={{ fontSize: 14, color: "rgba(250,248,245,.5)", lineHeight: 1.5 }}>{lb.sub}</div>
                <div style={{ width: 32, height: 1, background: lb.accent, opacity: .5 }} />
                <div style={{ fontSize: 13, color: lb.accent, fontWeight: 700, letterSpacing: ".06em" }}>{lb.pages}</div>
                <div style={{ fontSize: 13, color: "rgba(250,248,245,.6)", lineHeight: 1.6 }}>{lb.tagline}</div>

                {/* Dots navegación */}
                <div style={{ display: "flex", gap: 7, alignItems: "center", marginTop: 8 }}>
                  {BOOKS.map((_, di) => (
                    <div key={di} onClick={e => { e.stopPropagation(); setLightboxIdx(di); }} style={{
                      width: di === lightboxIdx ? 20 : 6, height: 6, borderRadius: 3,
                      background: di === lightboxIdx ? lb.accent : "rgba(255,255,255,.2)",
                      cursor: "pointer", transition: "all .25s",
                    }} />
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })()}

      {/* ── Toast ── */}
      <div style={{
        position: "fixed", bottom: 28, left: "50%", transform: `translateX(-50%) translateY(${toastMsg ? "0" : "20px"})`,
        background: "#1D1D1F", color: "#fff",
        padding: "13px 22px", borderRadius: 14,
        fontSize: 13, fontWeight: 500, letterSpacing: ".01em",
        boxShadow: "0 8px 32px rgba(0,0,0,.28)",
        opacity: toastMsg ? 1 : 0,
        pointerEvents: "none",
        transition: "opacity .25s, transform .25s",
        zIndex: 9999, whiteSpace: "nowrap",
      }}>
        {toastMsg}
      </div>
    </div>
  );
}
