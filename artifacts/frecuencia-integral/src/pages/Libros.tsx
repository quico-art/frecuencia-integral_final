import { useState, useEffect, lazy, Suspense } from "react";
import { useLocation } from "wouter";
import { getAuth } from "@/lib/auth";
const BookCoverCanvas = lazy(() => import("@/components/BookCoverCanvas"));

const S = {
  font: "'Plus Jakarta Sans', system-ui, sans-serif",
  serif: "'Playfair Display', Georgia, serif",
  gold: "#795901",
  goldL: "#BC9640",
  text: "#1D1D1F",
  muted: "#6E6E73",
  light: "#F5F5F7",
};

const BOOKS_DETAIL = [
  {
    id: "puerta-blanca",
    title: "TCT · Puerta Blanca",
    sub: "Masaje Vibracional con Cuencos Tibetanos — Taller I",
    tagline: "El cuerpo como primer umbral de consciencia",
    author: "Quico Tent",
    color: "#061817",
    accent: "#2b7d7a",
    tag: "Taller I",
    pages: "88 págs.",
    pdfUrl: "/books/puerta-blanca.pdf",
    coverImg: null as string | null,
    gate: "Puerta Blanca",
    included: "Plan Puerta Blanca · €95",
    topics: [
      "Iniciación al sonido sagrado y la vibración",
      "Anatomía energética y campo vibracional humano",
      "Técnicas de percusión y fricción con cuencos tibetanos",
      "Protocolo de sesión individual de masaje vibracional",
      "La presencia como base del trabajo terapéutico",
      "Integración cuerpo-mente a través del sonido",
    ],
    forWhom: "Principiantes en cuencos tibetanos, terapeutas que quieren integrar el sonido, y cualquier persona que desee aprender a armonizar el sistema nervioso a través de la vibración.",
    desc: "El manual de referencia del Taller I de Masaje Vibracional TCT. En estas 88 páginas encontrarás los fundamentos del trabajo con cuencos tibetanos desde la consciencia: no como técnica mecánica, sino como práctica de presencia viva. Aprenderás el protocolo completo de sesión individual, los principios de la anatomía energética y la relación directa entre vibración y sistema nervioso.",
  },
  {
    id: "puerta-roja",
    title: "TCT · Puerta Roja",
    sub: "Masaje Vibracional con Cuencos Tibetanos — Taller II",
    tagline: "La voz, la energía y el sonido primordial",
    author: "Quico Tent",
    color: "#1f0a08",
    accent: "#C54B3A",
    tag: "Taller II",
    pages: "58 págs.",
    pdfUrl: "/books/puerta-roja.pdf",
    coverImg: null as string | null,
    gate: "Puerta Roja",
    included: "Plan Puerta Roja · €95",
    topics: [
      "La voz como instrumento de sanación primordial",
      "Mantras y su función en el campo energético",
      "Nivel terapéutico: purificación emocional profunda",
      "Los seis reinos del Samsara aplicados al trabajo corporal",
      "Protocolos avanzados de liberación de bloqueos",
      "La alquimia del sonido: transformar sufrimiento en comprensión",
    ],
    forWhom: "Practicantes que han completado el Taller I y desean profundizar en el trabajo terapéutico emocional. Ideal para terapeutas que trabajan con el cuerpo y el campo energético.",
    desc: "El segundo nivel de formación en Masaje Vibracional TCT va más allá de la técnica y entra en el territorio del trabajo emocional y energético profundo. La voz se une a los cuencos como instrumento de resonancia. Los mantras se convierten en herramientas de purificación. El sonido actúa donde las palabras no llegan.",
  },
  {
    id: "puerta-azul",
    title: "TCT · Puerta Azul",
    sub: "Masaje Vibracional con Cuencos Tibetanos — Taller III",
    tagline: "La mente, Rigpa y el corazón de la tradición",
    author: "Quico Tent",
    color: "#060f1f",
    accent: "#2D7DD2",
    tag: "Taller III",
    pages: "81 págs.",
    pdfUrl: "/books/puerta-azul.pdf",
    coverImg: null as string | null,
    gate: "Puerta Azul",
    included: "Plan Puerta Azul · €95",
    topics: [
      "El Dzogchen y la consciencia natural (Rigpa)",
      "Cuencos tibetanos como tecnología espiritual avanzada",
      "La mente: herramienta vs. obstáculo en el trabajo vibracional",
      "Protocolos de apertura y expansión de consciencia",
      "Objetos sagrados, geometría y resonancia simbólica",
      "Síntesis de las tres puertas del sonido",
    ],
    forWhom: "Practicantes avanzados con formación en los Talleres I y II. Para quienes desean integrar la dimensión espiritual profunda en su práctica terapéutica con cuencos tibetanos.",
    desc: "El tercer y más profundo nivel de formación en sonido vibracional TCT. Aquí el cuenco deja de ser solo instrumento para convertirse en portal. La práctica se fundamenta en el Dzogchen — la tradición tibetana más elevada — y en la comprensión de la consciencia natural como base de todo trabajo transformador.",
  },
  {
    id: "tct-anexos",
    title: "TCT · Anexos",
    sub: "EONTOT — Objetos Sagrados y Formación Complementaria",
    tagline: "Profundización en la formación TCT",
    author: "Quico Tent",
    color: "#0f0c02",
    accent: "#BC9640",
    tag: "Anexo TCT",
    pages: "138 págs.",
    pdfUrl: "/books/tct-anexos.pdf",
    coverImg: null as string | null,
    gate: "Todas las Puertas",
    included: "Incluido en todos los planes TCT",
    topics: [
      "EONTOT: sistema de objetos sagrados y su función energética",
      "Geometría sagrada aplicada al trabajo vibracional",
      "Joyería energética: anclar frecuencias en el cuerpo físico",
      "Protocolos complementarios de la formación TCT",
      "Material de referencia y profundización técnica",
      "Recursos avanzados para practicantes certificados",
    ],
    forWhom: "Alumnos en formación TCT que desean material de consulta y profundización. Referencia esencial para practicantes certificados que quieren expandir su comprensión del sistema.",
    desc: "El material complementario más extenso de la formación TCT. Estos 138 páginas contienen los anexos esenciales que enriquecen y completan la trilogía de talleres: desde el sistema EONTOT de objetos sagrados hasta los protocolos complementarios que la experiencia de años de formación ha generado.",
  },
  {
    id: "deportista-consciente",
    title: "El Deportista Consciente",
    sub: "Más allá del resultado",
    tagline: "Alto rendimiento desde la presencia y la consciencia",
    author: "Quico Tent",
    color: "#0d1f1e",
    accent: "#4aaaa6",
    tag: "Libro · Deporte",
    pages: "197 págs.",
    pdfUrl: "/books/deportista-consciente.pdf",
    coverImg: null as string | null,
    gate: "Puerta Blanca",
    included: "Plan Puerta Blanca · €95",
    topics: [
      "El sueño en movimiento: actuar sin estar presente",
      "La fragmentación del yo y el ego bajo presión",
      "El cuerpo como espejo de la consciencia",
      "Presencia, emoción y error como camino de despertar",
      "El entrenamiento como práctica de consciencia",
      "El campo colectivo y la consciencia en el deporte",
    ],
    forWhom: "Deportistas, entrenadores, profesionales de alto rendimiento y cualquier persona que quiera transformar su relación con la acción, el resultado y el éxito desde una perspectiva más profunda.",
    desc: "¿Qué ocurre cuando ganar ya no es suficiente? Este libro explora la vida del deportista y del profesional de alto rendimiento desde un ángulo radical: la presencia como base del verdadero rendimiento. Más que técnicas de rendimiento, es una invitación a replantear el sentido de la acción, el éxito y la identidad que construimos sobre los resultados.",
  },
  {
    id: "ser-consciente",
    title: "El Ser Consciente",
    sub: "Más allá de la acción",
    tagline: "Vivir con presencia en la vida cotidiana",
    author: "Quico Tent",
    color: "#1a1208",
    accent: "#BC9640",
    tag: "Libro · Bienestar",
    pages: "163 págs.",
    pdfUrl: "/books/ser-consciente.pdf",
    coverImg: null as string | null,
    gate: "Puerta Roja · Azul",
    included: "Plan Puerta Roja · €95",
    topics: [
      "La ilusión de la separación cuerpo-mente-consciencia",
      "El ego como estructura: observarlo sin combatirlo",
      "La emoción, el error y la presión como portales",
      "El campo de consciencia colectivo y las relaciones",
      "El ser consciente en la vida y el deporte cotidianos",
      "Herramientas de integración: los diarios de práctica",
    ],
    forWhom: "Para quienes buscan vivir con mayor profundidad y presencia en lo cotidiano. Especialmente útil para personas en procesos de búsqueda interior, terapeutas, y quienes trabajan con grupos.",
    desc: "Si 'El Deportista Consciente' habla del hacer, 'El Ser Consciente' habla del ser. En estas 163 páginas, Quico Tent explora cómo integrar la presencia en la vida de todos los días: las relaciones, las emociones difíciles, los errores, la mente que no para. Un compañero esencial para el camino de transformación.",
  },
  {
    id: "arte-espiritualidad",
    title: "Portales de Luz",
    sub: "Arte, Espiritualidad y los Caminos hacia la Consciencia",
    tagline: "Todos los caminos llevan a Roma",
    author: "Quico Tent",
    color: "#1e2a2e",
    accent: "#2b7d7a",
    tag: "Conferencia",
    pages: "85 págs.",
    pdfUrl: "/books/arte-espiritualidad.pdf",
    coverImg: "/books/portales-de-luz.jpg" as string | null,
    gate: "Puerta Arcoíris",
    included: "Acceso libre para alumnos activos",
    topics: [
      "El arte como lenguaje directo del alma",
      "La convergencia de tradiciones espirituales",
      "Dzogchen, Cuarto Camino, UCDM: un solo destino",
      "La creatividad como práctica de consciencia",
      "Geometría sagrada y simbolismo universal",
      "El artista como portador de luz y presencia",
      "El símbolo como puente entre el alma y la materia",
      "Joyería Energética Sagrada: la luz anclada en la forma",
    ],
    forWhom: "Para amantes del arte, la espiritualidad y la intersección entre ambos. Ideal para comprender cómo distintas tradiciones señalan hacia la misma fuente de consciencia.",
    desc: "Una conferencia en formato visual y escrito donde Quico Tent explora la relación profunda entre el arte y la espiritualidad. Todas las tradiciones —el Dzogchen tibetano, el Cuarto Camino, Un Curso de Milagros, la Cábala— apuntan hacia la misma realidad fundamental. El arte es uno de los portales más directos hacia esa fuente.",
  },
  {
    id: "guerrero-dzogchen",
    title: "El Viaje del Guerrero Dzogchen",
    sub: "Cuencos Tibetanos y el Cuarto Camino",
    tagline: "La puerta del sonido hacia Rigpa",
    author: "Quico Tent",
    color: "#120a1f",
    accent: "#9B6DD4",
    tag: "Formación Avanzada",
    pages: "47 págs.",
    pdfUrl: "/books/guerrero-dzogchen.pdf",
    coverImg: null as string | null,
    gate: "Puerta Azul · Arcoíris",
    included: "Plan Puerta Azul · €95",
    topics: [
      "El guerrero espiritual: presencia sin armadura",
      "Rigpa: la consciencia natural en la tradición Dzogchen",
      "Los cuencos tibetanos como tecnología de apertura",
      "El Cuarto Camino y el recuerdo de sí en la práctica",
      "La integración del sonido y la meditación avanzada",
      "El viaje hacia la no-separación",
    ],
    forWhom: "Practicantes avanzados con base en el Dzogchen, el Cuarto Camino o la formación TCT completa. Para quienes están listos para llevar la práctica a su dimensión más profunda.",
    desc: "Una formación presentada en 47 diapositivas que representa la síntesis más avanzada del camino TCT: el encuentro entre el guerrero del Dzogchen y la tecnología vibracional de los cuencos tibetanos. Aquí el sonido no es herramienta sino espejo. Y el espejo muestra Rigpa — la consciencia que siempre ha estado presente.",
  },
];

function BookCard({ book, onOpen }: { book: typeof BOOKS_DETAIL[0]; onOpen: () => void }) {
  return (
    <div onClick={onOpen} style={{ cursor: "pointer", display: "flex", gap: 0, borderRadius: 20, overflow: "hidden", background: "#fff", boxShadow: "0 2px 20px rgba(0,0,0,.06)", transition: "transform .25s, box-shadow .25s" }}
      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,.1)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 20px rgba(0,0,0,.06)"; }}
    >
      {/* Cover */}
      <div style={{ width: 100, minHeight: 150, flexShrink: 0, background: book.color, position: "relative" }}>
        {book.coverImg
          ? <img src={book.coverImg} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }} />
          : <Suspense fallback={<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 16, height: 16, border: "2px solid rgba(255,255,255,.15)", borderTopColor: book.accent, borderRadius: "50%", animation: "lb-spin .9s linear infinite" }} /></div>}>
              <BookCoverCanvas pdfUrl={book.pdfUrl} width={100} height={150} />
            </Suspense>
        }
      </div>
      {/* Info */}
      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 6, flex: 1, position: "relative" }}>
        <span style={{ fontSize: 8, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: book.accent }}>{book.tag}</span>
        <div style={{ fontFamily: S.serif, fontSize: 16, fontWeight: 400, color: S.text, lineHeight: 1.25 }}>{book.title}</div>
        <div style={{ fontSize: 11, color: S.muted, lineHeight: 1.5 }}>{book.sub}</div>
        <div style={{ marginTop: "auto", paddingTop: 10, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <span style={{ fontSize: 10, color: book.accent, fontWeight: 600 }}>{book.pages}</span>
          <span style={{ fontSize: 10, color: book.accent, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", opacity: .75 }}>más info →</span>
        </div>
      </div>
    </div>
  );
}

function BookModal({ book, onClose }: { book: typeof BOOKS_DETAIL[0]; onClose: () => void }) {
  const [, setLocation] = useLocation();
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 10000, background: "rgba(0,0,0,.72)", backdropFilter: "blur(16px)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px 20px" }}>
      <style>{`@keyframes lb-spin{to{transform:rotate(360deg)}} @keyframes lb-in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}`}</style>
      <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 24, maxWidth: 820, width: "100%", maxHeight: "92dvh", overflowY: "auto", animation: "lb-in .22s ease", display: "flex", flexDirection: "column" }}>
        {/* Header modal */}
        <div style={{ background: book.color, borderRadius: "24px 24px 0 0", padding: "40px 40px 32px", display: "flex", gap: 32, alignItems: "flex-start", position: "relative" }}>
          <button onClick={onClose} style={{ position: "absolute", top: 18, right: 18, background: "rgba(255,255,255,.12)", border: "none", width: 34, height: 34, borderRadius: "50%", cursor: "pointer", color: "#fff", fontSize: 15, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          {/* Cover */}
          <div style={{ width: 120, height: 180, borderRadius: 10, overflow: "hidden", flexShrink: 0, background: "rgba(255,255,255,.08)", boxShadow: "0 20px 60px rgba(0,0,0,.5)" }}>
            {book.coverImg
              ? <img src={book.coverImg} alt={book.title} style={{ width: "100%", height: "100%", objectFit: "cover", display: "block", transform: "scale(1.22) translateY(-14%)", transformOrigin: "top center" }} />
              : <Suspense fallback={<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,.15)", borderTopColor: book.accent, borderRadius: "50%", animation: "lb-spin .9s linear infinite" }} /></div>}>
                  <BookCoverCanvas pdfUrl={book.pdfUrl} width={120} height={180} />
                </Suspense>
            }
          </div>
          {/* Títulos */}
          <div style={{ flex: 1, paddingTop: 4 }}>
            <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 5, background: book.accent, fontSize: 8, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: "#fff", marginBottom: 14 }}>{book.tag}</span>
            <div style={{ fontFamily: S.serif, fontSize: 26, fontWeight: 400, color: "#FAF8F5", lineHeight: 1.15, marginBottom: 8 }}>{book.title}</div>
            <div style={{ fontSize: 14, color: "rgba(250,248,245,.55)", marginBottom: 12 }}>{book.sub}</div>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <div style={{ fontSize: 12, color: book.accent, fontWeight: 700 }}>{book.pages}</div>
              <div style={{ fontSize: 12, color: "rgba(250,248,245,.4)" }}>· {book.author}</div>
            </div>
          </div>
        </div>

        {/* Cuerpo */}
        <div style={{ padding: "36px 40px", display: "flex", flexDirection: "column", gap: 32 }}>
          {/* Descripción */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: S.muted, marginBottom: 12 }}>Sobre este libro</div>
            <p style={{ fontSize: 16, color: S.text, lineHeight: 1.75, margin: 0, fontWeight: 300 }}>{book.desc}</p>
          </div>

          {/* Temas */}
          <div>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: S.muted, marginBottom: 16 }}>Lo que encontrarás</div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 20px" }}>
              {book.topics.map((t, i) => (
                <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                  <div style={{ width: 4, height: 4, borderRadius: "50%", background: book.accent, flexShrink: 0, marginTop: 7 }} />
                  <span style={{ fontSize: 13, color: S.text, lineHeight: 1.5 }}>{t}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Para quién */}
          <div style={{ background: S.light, borderRadius: 14, padding: "20px 24px" }}>
            <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: S.muted, marginBottom: 8 }}>¿Para quién es?</div>
            <p style={{ fontSize: 14, color: S.text, lineHeight: 1.7, margin: 0 }}>{book.forWhom}</p>
            {book.id === "arte-espiritualidad" && (
              <a href="https://quicotp.wixsite.com/quicotent" target="_blank" rel="noopener noreferrer"
                style={{ fontSize: 12, color: "#9B6DD4", textDecoration: "none", fontWeight: 600, letterSpacing: ".04em", display: "inline-block", marginTop: 14 }}>
                Descubrir la joyería energética →
              </a>
            )}
          </div>

          {/* Acceso */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, flexWrap: "wrap", borderTop: `1px solid ${S.light}`, paddingTop: 28 }}>
            <div>
              <div style={{ fontSize: 11, fontWeight: 700, letterSpacing: ".1em", textTransform: "uppercase", color: S.muted, marginBottom: 6 }}>Incluido en</div>
              <div style={{ fontSize: 15, color: book.accent, fontWeight: 700 }}>{book.included}</div>
              <div style={{ fontSize: 12, color: S.muted, marginTop: 4 }}>Disponible en el Área de Alumnos</div>
            </div>
            <button
              onClick={() => { onClose(); setLocation("/metodo"); }}
              style={{ background: book.accent, color: "#fff", border: "none", padding: "14px 32px", borderRadius: 9999, fontSize: 14, fontWeight: 700, cursor: "pointer", whiteSpace: "nowrap" }}
            >
              Acceder al método →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Libros() {
  const [, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeBook, setActiveBook] = useState<typeof BOOKS_DETAIL[0] | null>(null);
  const [user] = useState(getAuth());

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);

  const go = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }); setMobileOpen(false); };

  const tct = BOOKS_DETAIL.filter(b => b.id.startsWith("puerta") || b.id === "tct-anexos");
  const libros = BOOKS_DETAIL.filter(b => b.id === "deportista-consciente" || b.id === "ser-consciente");
  const otros = BOOKS_DETAIL.filter(b => !tct.includes(b) && !libros.includes(b));

  return (
    <div style={{ fontFamily: S.font, background: "#fff", color: S.text, overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        @keyframes fu{from{opacity:0;transform:translateY(18px)}to{opacity:1;transform:translateY(0)}}
        @keyframes lb-spin{to{transform:rotate(360deg)}}
        @keyframes lb-in{from{opacity:0;transform:scale(.95)}to{opacity:1;transform:scale(1)}}
        .lb-fu0{animation:fu .8s ease both}
        .lb-fu1{animation:fu .8s .1s ease both}
        .lb-fu2{animation:fu .8s .2s ease both}
        .lb-tl{display:flex}.lb-tm{display:none}
        @media(max-width:900px){
          .lb-tl{display:none!important}.lb-tm{display:flex!important}
          .lb-nav{padding:0 20px!important}
          .lb-hero{padding:90px 24px 60px!important}
          .lb-sp{padding:72px 24px!important}
          .lb-grid2{grid-template-columns:1fr!important}
          .lb-topics{grid-template-columns:1fr!important}
        }
        @media(max-width:640px){
          .lb-hero{padding:76px 20px 48px!important}
          .lb-sp{padding:56px 20px!important}
          .lb-modal-body{padding:24px 20px!important}
          .lb-modal-header{padding:28px 20px 24px!important;flex-direction:column!important}
          .lb-modal-access{flex-direction:column!important;align-items:flex-start!important}
          .lb-topics{grid-template-columns:1fr!important}
        }
      `}</style>

      {/* ── NAV ── */}
      <nav className="lb-nav" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 1000, height: 60, background: scrolled ? "rgba(255,255,255,.97)" : "rgba(255,255,255,.9)", backdropFilter: "blur(20px)", WebkitBackdropFilter: "blur(20px)", borderBottom: "1px solid #f0f0f0", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0 48px", transition: "background .3s" }}>
        <button onClick={() => setLocation("/")} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer" }}>
          <svg width="28" height="28" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="37" stroke="#795901" strokeWidth="3.5" opacity="1"/><circle cx="40" cy="40" r="20" stroke="#BC9640" strokeWidth="2.2" opacity="1"/><circle cx="40" cy="40" r="3" fill="#795901" opacity="1"/></svg>
          <div style={{ textAlign: "left" }}>
            <div style={{ fontFamily: S.serif, fontSize: 14, fontWeight: 400, color: S.text, lineHeight: 1 }}>Frecuencia Integral</div>
            <div style={{ fontSize: 9, color: S.muted, letterSpacing: ".12em", textTransform: "uppercase", marginTop: 2 }}>Libros & Formación</div>
          </div>
        </button>

        <div className="lb-tl" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {[["Serie TCT","sec-tct"],["Obras Esenciales","sec-libros"],["Profundización","sec-otros"],["Acceso","sec-acceso"]].map(([l, id]) => (
            <button key={l} onClick={() => go(id)} style={{ background: "none", border: "none", fontSize: 13, color: S.muted, cursor: "pointer", fontWeight: 400 }}
              onMouseEnter={e => (e.currentTarget.style.color = S.text)} onMouseLeave={e => (e.currentTarget.style.color = S.muted)}>{l}</button>
          ))}
          <button onClick={() => setLocation("/metodo")} style={{ background: "none", border: "none", fontSize: 13, color: S.muted, cursor: "pointer" }}>← El Método</button>
          <button onClick={() => setLocation(user.isLoggedIn ? "/area" : "/login")} style={{ background: S.text, color: "#fff", border: "none", padding: "8px 20px", borderRadius: 9999, fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Área Alumnos"}
          </button>
        </div>

        <button className="lb-tm" onClick={() => setMobileOpen(true)} style={{ display: "none", flexDirection: "column", gap: 4, background: "none", border: "none", cursor: "pointer", padding: 8 }}>
          {[0, 1, 2].map(i => <div key={i} style={{ width: 20, height: 1.5, background: S.text, borderRadius: 2 }} />)}
        </button>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(255,255,255,.98)", backdropFilter: "blur(20px)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 0 }}>
          <button onClick={() => setMobileOpen(false)} style={{ position: "absolute", top: 20, right: 20, background: S.light, border: "none", width: 36, height: 36, borderRadius: "50%", fontSize: 16, cursor: "pointer" }}>✕</button>
          {/* Nivel 1 — secciones de esta página */}
          {[["Serie TCT","sec-tct"],["Obras Esenciales","sec-libros"],["Profundización","sec-otros"],["Acceso","sec-acceso"]].map(([l, id]) => (
            <button key={l} onClick={() => go(id)} style={{ fontFamily: S.serif, fontSize: 26, color: "#1D1D1F", background: "none", border: "none", cursor: "pointer", marginBottom: 20 }}>{l}</button>
          ))}
          {/* Separador */}
          <div style={{ width: 48, borderTop: "1px solid rgba(0,0,0,.1)", margin: "4px 0 20px" }} />
          {/* Nivel 2 — página hermana */}
          <button onClick={() => { setMobileOpen(false); setLocation("/metodo"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 20, letterSpacing: ".1em", textTransform: "uppercase", color: "#BC9640", fontWeight: 600, background: "none", border: "none", cursor: "pointer", marginBottom: 14 }}>→ El Método</button>
          {/* Nivel 3 — raíz */}
          <button onClick={() => { setMobileOpen(false); setLocation("/"); }} style={{ fontFamily: "system-ui,-apple-system,sans-serif", fontSize: 18, letterSpacing: ".08em", color: "#9E9E9E", background: "none", border: "none", cursor: "pointer", marginBottom: 28 }}>↑ Academia</button>
          {/* CTA */}
          <button onClick={() => { setMobileOpen(false); setLocation(user.isLoggedIn ? "/area" : "/login"); }} style={{ background: S.text, color: "#fff", border: "none", padding: "14px 36px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer" }}>
            {user.isLoggedIn ? "↩ Mi Área" : "Acceso Alumnos"}
          </button>
        </div>
      )}

      {/* ── HERO ── */}
      <section className="lb-hero" style={{ minHeight: "72vh", background: "linear-gradient(155deg,#0f0c08 0%,#1a1510 55%,#0f1810 100%)", display: "flex", flexDirection: "column", justifyContent: "center", padding: "120px 72px 72px", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 50% 70% at 60% 50%,rgba(188,150,64,.06) 0%,transparent 70%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 780, position: "relative", zIndex: 1 }}>
          <div className="lb-fu0" style={{ display: "inline-flex", alignItems: "center", gap: 7, background: "rgba(188,150,64,.1)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 9999, padding: "5px 16px", fontSize: 10, color: "#D4AA5A", letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 36 }}>
            Frecuencia Integral Academy · Biblioteca
          </div>
          <h1 className="lb-fu1" style={{ fontFamily: S.serif, fontSize: "clamp(40px,5.5vw,76px)", fontWeight: 300, color: "#FAF8F5", lineHeight: 1.06, margin: "0 0 24px", letterSpacing: "-.02em" }}>
            Los libros que<br /><em style={{ fontStyle: "italic", color: "#BC9640" }}>sustentan el camino</em>
          </h1>
          <p className="lb-fu2" style={{ fontSize: "clamp(15px,1.6vw,18px)", color: "rgba(250,248,245,.45)", lineHeight: 1.8, maxWidth: 520, margin: 0, fontWeight: 300 }}>
            Ocho publicaciones que integran décadas de práctica, formación en tradiciones milenarias y experiencia clínica. Material de referencia para alumnos del Método TCT.
          </p>
          <div style={{ display: "flex", gap: 48, marginTop: 52, paddingTop: 40, borderTop: "1px solid rgba(255,255,255,.06)", flexWrap: "wrap" }}>
            {[["8","Publicaciones"],["4","Talleres TCT"],["2","Libros abiertos"],["500+","Páginas de formación"]].map(([n,l]) => (
              <div key={l}>
                <div style={{ fontFamily: S.serif, fontSize: 26, fontWeight: 300, color: "#BC9640", lineHeight: 1 }}>{n}</div>
                <div style={{ fontSize: 10, color: "rgba(255,255,255,.25)", letterSpacing: ".1em", textTransform: "uppercase", marginTop: 5 }}>{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FORMACIÓN TCT ── */}
      <section id="sec-tct" className="lb-sp" style={{ padding: "96px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#2b7d7a", marginBottom: 16 }}>Serie TCT</div>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: S.text, margin: 0, lineHeight: 1.1 }}>
              Cuencos Tibetanos<br /><em style={{ fontStyle: "italic" }}>Masaje Vibracional</em>
            </h2>
            <p style={{ fontSize: 16, color: S.muted, lineHeight: 1.7, maxWidth: 560, marginTop: 16 }}>
              La trilogía de manuales que acompaña la formación oficial en Masaje Vibracional con Cuencos Tibetanos del Método TCT. Cada taller tiene su libro de referencia.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))", gap: 20 }} className="lb-grid2">
            {tct.map(book => (
              <BookCard key={book.id} book={book} onOpen={() => setActiveBook(book)} />
            ))}
          </div>
        </div>
      </section>

      {/* Separator */}
      <div style={{ height: 1, background: "linear-gradient(90deg,transparent,#e5e5e7,transparent)", maxWidth: 800, margin: "0 auto" }} />

      {/* ── LIBROS ── */}
      <section id="sec-libros" className="lb-sp" style={{ padding: "96px 72px", background: S.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#4aaaa6", marginBottom: 16 }}>Obras Esenciales</div>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: S.text, margin: 0, lineHeight: 1.1 }}>
              Consciencia en<br /><em style={{ fontStyle: "italic" }}>la vida y el deporte</em>
            </h2>
            <p style={{ fontSize: 16, color: S.muted, lineHeight: 1.7, maxWidth: 560, marginTop: 16 }}>
              Dos libros que forman la columna vertebral filosófica y práctica del Método TCT. Pueden leerse de forma independiente o como parte del programa completo.
            </p>
          </div>

          {libros.map((book, i) => (
            <div key={book.id} onClick={() => setActiveBook(book)} style={{ cursor: "pointer", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0, borderRadius: 24, overflow: "hidden", marginBottom: i < libros.length - 1 ? 24 : 0, boxShadow: "0 2px 24px rgba(0,0,0,.07)", transition: "transform .25s, box-shadow .25s" }}
              className="lb-grid2"
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 16px 48px rgba(0,0,0,.12)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 24px rgba(0,0,0,.07)"; }}
            >
              {/* Cover side */}
              <div style={{ background: book.color, display: "flex", alignItems: "center", justifyContent: "center", padding: 48, minHeight: 280 }}>
                <div style={{ width: 150, height: 220, borderRadius: 10, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,.5)" }}>
                  <Suspense fallback={<div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}><div style={{ width: 24, height: 24, border: "2px solid rgba(255,255,255,.15)", borderTopColor: book.accent, borderRadius: "50%", animation: "lb-spin .9s linear infinite" }} /></div>}>
                    <BookCoverCanvas pdfUrl={book.pdfUrl} width={150} height={220} />
                  </Suspense>
                </div>
              </div>
              {/* Info side */}
              <div style={{ background: "#fff", padding: "40px 44px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 16, position: "relative" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                  <span style={{ display: "inline-block", padding: "4px 12px", borderRadius: 5, background: "rgba(0,0,0,.06)", fontSize: 8, fontWeight: 800, letterSpacing: ".14em", textTransform: "uppercase", color: book.accent }}>{book.tag}</span>
                  <span style={{ fontSize: 10, color: book.accent, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", opacity: .7, whiteSpace: "nowrap" }}>más info →</span>
                </div>
                <div style={{ fontFamily: S.serif, fontSize: 28, fontWeight: 400, color: S.text, lineHeight: 1.15 }}>{book.title}</div>
                <div style={{ fontSize: 14, color: S.muted }}>{book.sub}</div>
                <p style={{ fontSize: 14, color: S.text, lineHeight: 1.7, margin: 0, fontWeight: 300 }}>{book.desc.slice(0, 180)}…</p>
                <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
                  <span style={{ fontSize: 12, color: book.accent, fontWeight: 700 }}>{book.pages}</span>
                  <span style={{ fontSize: 12, color: S.muted }}>·</span>
                  <span style={{ fontSize: 12, color: S.muted }}>{book.author}</span>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setActiveBook(book); }} style={{ alignSelf: "flex-start", background: "none", border: `1.5px solid ${book.accent}`, color: book.accent, padding: "10px 24px", borderRadius: 9999, fontSize: 13, fontWeight: 700, cursor: "pointer", marginTop: 8 }}>
                  Ver detalles →
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── OTROS ── */}
      <section id="sec-otros" className="lb-sp" style={{ padding: "96px 72px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ marginBottom: 56 }}>
            <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#9B6DD4", marginBottom: 16 }}>Profundización</div>
            <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,3.5vw,48px)", fontWeight: 300, color: S.text, margin: 0, lineHeight: 1.1 }}>
              Arte, espiritualidad<br /><em style={{ fontStyle: "italic" }}>y el camino avanzado</em>
            </h2>
            <p style={{ fontSize: 16, color: S.muted, lineHeight: 1.7, maxWidth: 560, marginTop: 16 }}>
              Publicaciones especiales para alumnos avanzados y para quienes desean explorar la intersección entre arte, espiritualidad y práctica transformadora.
            </p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 20 }}>
            {otros.map(book => (
              <BookCard key={book.id} book={book} onOpen={() => setActiveBook(book)} />
            ))}
          </div>
        </div>
      </section>

      {/* ── CÓMO ACCEDER ── */}
      <section id="sec-acceso" className="lb-sp" style={{ padding: "100px 72px", background: "linear-gradient(170deg,#0f0c08 0%,#1a1510 100%)" }}>
        <div style={{ maxWidth: 1000, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#BC9640", marginBottom: 20 }}>Acceso</div>
          <h2 style={{ fontFamily: S.serif, fontSize: "clamp(30px,4vw,56px)", fontWeight: 300, color: "#FAF8F5", margin: "0 0 20px", lineHeight: 1.1 }}>
            Todos los libros<br /><em style={{ fontStyle: "italic", color: "#BC9640" }}>están incluidos</em>
          </h2>
          <p style={{ fontSize: 17, color: "rgba(250,248,245,.45)", lineHeight: 1.8, maxWidth: 560, margin: "0 auto 64px", fontWeight: 300 }}>
            No se venden por separado. Cada libro forma parte del programa formativo y está incluido en el plan correspondiente. Al inscribirte en una Puerta, recibes acceso completo a su material.
          </p>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16, marginBottom: 56 }} className="lb-grid2">
            {[
              { label: "Puerta Blanca", price: "€95", desc: "TCT I + El Deportista Consciente", color: "#2b7d7a", weeks: "S. 1–12" },
              { label: "Puerta Roja",   price: "€95", desc: "TCT II + El Ser Consciente", color: "#C54B3A", weeks: "S. 13–24" },
              { label: "Puerta Azul",   price: "€95", desc: "TCT III + Guerrero Dzogchen", color: "#2D7DD2", weeks: "S. 25–36" },
              { label: "Puerta Arcoíris", price: "€95", desc: "TCT Anexos + Portales de Luz", color: "#7B4DAA", weeks: "S. 37–48" },
            ].map(p => (
              <div key={p.label} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 16, padding: "28px 20px", textAlign: "center" }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: p.color, margin: "0 auto 16px" }} />
                <div style={{ fontFamily: S.serif, fontSize: 16, color: "#FAF8F5", marginBottom: 6 }}>{p.label}</div>
                <div style={{ fontSize: 11, color: "rgba(250,248,245,.35)", marginBottom: 16 }}>{p.weeks}</div>
                <div style={{ fontFamily: S.serif, fontSize: 28, color: p.color, fontWeight: 300, marginBottom: 8 }}>{p.price}</div>
                <div style={{ fontSize: 11, color: "rgba(250,248,245,.4)", lineHeight: 1.5 }}>{p.desc}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={() => setLocation("/metodo")}
              style={{ background: "#BC9640", color: "#fff", border: "none", padding: "16px 40px", borderRadius: 9999, fontSize: 15, fontWeight: 700, cursor: "pointer" }}
            >
              Ver el Método TCT completo
            </button>
            <button
              onClick={() => setLocation(user.isLoggedIn ? "/area" : "/login")}
              style={{ background: "rgba(255,255,255,.1)", color: "#FAF8F5", border: "1px solid rgba(255,255,255,.15)", padding: "16px 40px", borderRadius: 9999, fontSize: 15, fontWeight: 600, cursor: "pointer" }}
            >
              {user.isLoggedIn ? "↩ Ir a mi área" : "Área de alumnos"}
            </button>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <style>{`
        .lib-footer { background:#0a0a0a; padding:40px 64px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:20px; }
        .lib-footer-links { display:flex; gap:20px; align-items:center; flex-wrap:wrap; }
        @media(max-width:768px){
          .lib-footer { padding:32px 24px; flex-direction:column; align-items:flex-start; gap:20px; }
          .lib-footer-links { gap:16px; }
        }
      `}</style>
      <footer className="lib-footer">
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <svg width="22" height="22" viewBox="0 0 80 80" fill="none"><circle cx="40" cy="40" r="37" stroke="#BC9640" strokeWidth="4" opacity="1"/><circle cx="40" cy="40" r="20" stroke="#D4AA5A" strokeWidth="2.5" opacity="1"/><circle cx="40" cy="40" r="3" fill="#D4AA5A" opacity="1"/></svg>
          <span style={{ fontFamily: S.serif, fontSize: 13, color: "rgba(255,255,255,.75)" }}>Frecuencia Integral Academy</span>
        </div>
        <div className="lib-footer-links">
          <button onClick={() => setLocation("/")} style={{ background: "none", border: "none", fontSize: 12, color: "rgba(255,255,255,.85)", cursor: "pointer", padding: 0 }}>Academia</button>
          <button onClick={() => setLocation("/metodo")} style={{ background: "none", border: "none", fontSize: 12, color: "rgba(255,255,255,.85)", cursor: "pointer", padding: 0 }}>El Método</button>
          <a href="mailto:info@frecuenciaintegral.com" style={{ fontSize: 12, color: "rgba(255,255,255,.85)", textDecoration: "none", wordBreak: "break-all" }}>info@frecuenciaintegral.com</a>
        </div>
        <div style={{ fontSize: 11, color: "rgba(255,255,255,.55)" }}>© 2026 Frecuencia Integral Academy</div>
      </footer>

      {/* ── MODAL ── */}
      {activeBook && <BookModal book={activeBook} onClose={() => setActiveBook(null)} />}
    </div>
  );
}
