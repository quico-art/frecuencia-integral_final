import { useState, useEffect, useLayoutEffect, useRef, useCallback, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useLocation } from "wouter";
import {
  Type, Image, Palette, Navigation2, Zap, Users,
  Save, X, Globe, RotateCcw, CheckCircle2, Pencil,
  ChevronRight, Eye, Monitor, AlertCircle, ExternalLink,
  LogIn, Plus, Link, Copy, Trash2, MousePointer,
  Move, RefreshCw, Search, Layers,
} from "lucide-react";
import {
  getDraft, setDraftValue, saveDraft, publishDraft, resetDraft, resetAll,
  hasDraftChanges, hasPublishedContent, getDraftSavedAt, getPublishedAt,
} from "@/lib/content";
import { getAuth } from "@/lib/auth";
import {
  getBlocks, addBlock, duplicateBlock, deleteBlock, moveBlock, updateBlockField,
  BLOCK_LABELS, type Block, type BlockType,
} from "@/lib/blocks";
import { BLOCK_VARIANTS } from "@/lib/blockVariants";

/* ── Design tokens ────────────────────────────────────────── */
const D1    = "#141414";
const D2    = "#1E1E1E";
const D3    = "#282828";
const D4    = "#313131";
const GOLD  = "#BC9640";
const GOLDF = "rgba(188,150,64,0.25)";
const RED   = "#F08080";
const REDF  = "rgba(240,128,128,0.15)";
const TEAL  = "#2B7D7A";
const TEXT  = "rgba(255,255,255,0.88)";
const MUTED = "rgba(255,255,255,0.38)";
const BRD   = "rgba(255,255,255,0.07)";
const SEM   = "'Playfair Display', Georgia, serif";
const SANS  = "'Plus Jakarta Sans', system-ui, sans-serif";

const ICON_W = 56;
const P2_W   = 310;

/* ── Page field definitions ───────────────────────────────── */
type FieldType = "text" | "textarea" | "url" | "image";
type FieldDef  = { key: string; label: string; default: string; type?: FieldType };
type PageDef   = { title: string; path: string; fields: FieldDef[] };

/** Genera los 4 campos de layout para un contenedor de sección */
function cFields(prefix: string, label: string, dPos: string, dMaxW: string, dPadH = "0", dPadB = "0"): FieldDef[] {
  return [
    { key: `${prefix}.cpos`,  label: `${label} — posición (left · center · right)`, default: dPos  },
    { key: `${prefix}.cmaxW`, label: `${label} — ancho máximo (px)`,                default: dMaxW },
    { key: `${prefix}.cpadH`, label: `${label} — separación lateral (px)`,          default: dPadH },
    { key: `${prefix}.cpadB`, label: `${label} — separación inferior (px)`,         default: dPadB },
  ];
}

const PAGES_STATIC: PageDef[] = [
  {
    title: "Home — Hero",
    path: "/",
    fields: [
      { key: "home.hero.badge",         label: "Hero — badge (etiqueta superior)",  default: "Plataforma White-Label para Academias Online" },
      { key: "home.hero.title1",        label: "Hero — título línea 1",             default: "Tu Academia." },
      { key: "home.hero.title2",        label: "Hero — título línea 2 (dorada)",    default: "Tu Marca." },
      { key: "home.hero.subtitle",      label: "Hero — subtítulo descriptivo",      default: "AulaOS es la plataforma LMS que te permite lanzar tu academia online con tu identidad corporativa en menos de 72 horas.", type: "textarea" },
      { key: "home.hero.cta.primary",   label: "Hero — CTA principal",             default: "Ver planes y precios" },
      { key: "home.hero.cta.secondary", label: "Hero — CTA secundario",            default: "Solicitar demo en vivo" },
      { key: "home.hero.proof",         label: "Hero — prueba social (debajo CTA)", default: "Más de 50 academias activas · Soporte en español · Sin permanencia" },
    ],
  },
  {
    title: "Home — El Problema",
    path: "/",
    fields: [
      { key: "home.problema.label",   label: "Problema — etiqueta",     default: "El problema del mercado" },
      { key: "home.problema.title",   label: "Problema — título",       default: "Crear tu academia online no debería ser esto difícil" },
      { key: "home.problema.sub",     label: "Problema — subtítulo",    default: "La mayoría de emprendedores del conocimiento pierden meses y miles de euros antes de tener algo funcional.", type: "textarea" },
      { key: "home.problema.p0.title", label: "Pain point 1 — título",  default: "Meses de desarrollo" },
      { key: "home.problema.p0.body",  label: "Pain point 1 — texto",   default: "Contratar un desarrollador, esperar, pagar por adelantado… y aún así el resultado no es lo que esperabas.", type: "textarea" },
      { key: "home.problema.p1.title", label: "Pain point 2 — título",  default: "Plataformas genéricas" },
      { key: "home.problema.p1.body",  label: "Pain point 2 — texto",   default: "Teachable, Thinkific, Kajabi… perfectas para USA. Caras, en inglés, sin personalización real de marca.", type: "textarea" },
      { key: "home.problema.p2.title", label: "Pain point 3 — título",  default: "Tu marca, diluida" },
      { key: "home.problema.p2.body",  label: "Pain point 3 — texto",   default: "Cuando tus alumnos entran al área privada, ven la marca de la plataforma, no la tuya. Eso rompe la confianza.", type: "textarea" },
      { key: "home.problema.p3.title", label: "Pain point 4 — título",  default: "Soporte inexistente" },
      { key: "home.problema.p3.body",  label: "Pain point 4 — texto",   default: "Un ticket de soporte, una FAQ en inglés, y buena suerte. Sin alguien que te entienda y te ayude en español.", type: "textarea" },
    ],
  },
  {
    title: "Home — La Solución",
    path: "/",
    fields: [
      { key: "home.solucion.label", label: "Solución — etiqueta",    default: "La solución AulaOS" },
      { key: "home.solucion.title", label: "Solución — título",      default: "Todo lo que necesitas para lanzar tu academia, listo en 72 horas" },
      { key: "home.solucion.sub",   label: "Solución — subtítulo",   default: "Una plataforma completa, con tu branding, tu dominio y tus colores.", type: "textarea" },
      { key: "home.solucion.f0.title", label: "Feature 1 — título",  default: "Editor visual sin código" },
      { key: "home.solucion.f0.body",  label: "Feature 1 — texto",   default: "Cambia textos, imágenes, colores y estructura desde un editor lateral.", type: "textarea" },
      { key: "home.solucion.f1.title", label: "Feature 2 — título",  default: "Área privada para alumnos" },
      { key: "home.solucion.f1.body",  label: "Feature 2 — texto",   default: "Contenido por módulos y semanas, progreso individual, diario personal, multimedia y comunidad.", type: "textarea" },
      { key: "home.solucion.f2.title", label: "Feature 3 — título",  default: "Pagos integrados" },
      { key: "home.solucion.f2.body",  label: "Feature 3 — texto",   default: "Stripe nativo con planes mensuales o de pago único. Tus alumnos pagan directamente a tu cuenta.", type: "textarea" },
      { key: "home.solucion.f3.title", label: "Feature 4 — título",  default: "Tu dominio, tu marca" },
      { key: "home.solucion.f3.body",  label: "Feature 4 — texto",   default: "Desplegamos en tu dominio personalizado. Tus alumnos nunca ven ninguna referencia a AulaOS.", type: "textarea" },
      { key: "home.solucion.f4.title", label: "Feature 5 — título",  default: "Soporte en español" },
      { key: "home.solucion.f4.body",  label: "Feature 5 — texto",   default: "Equipo humano en España. Respondemos en menos de 24h por WhatsApp, email y videollamada.", type: "textarea" },
      { key: "home.solucion.f5.title", label: "Feature 6 — título",  default: "SEO y rendimiento" },
      { key: "home.solucion.f5.body",  label: "Feature 6 — texto",   default: "Páginas estáticas ultra-rápidas con Vite. Puntuación 95+ en PageSpeed.", type: "textarea" },
    ],
  },
  {
    title: "Home — Caso Real (FI Academy)",
    path: "/",
    fields: [
      { key: "home.caso.label",         label: "Caso real — etiqueta",         default: "Caso real de uso" },
      { key: "home.caso.badge",         label: "Caso real — badge",            default: "Academia en producción" },
      { key: "home.caso.name",          label: "Caso real — nombre",           default: "Frecuencia Integral Academy" },
      { key: "home.caso.desc",          label: "Caso real — descripción",      default: "Academia de bienestar y desarrollo personal con el Método TCT. Lanzada con AulaOS en menos de 72 horas.", type: "textarea" },
      { key: "home.caso.stat0.value",   label: "Estadística 1 — valor",        default: "48" },
      { key: "home.caso.stat0.label",   label: "Estadística 1 — etiqueta",     default: "Semanas de contenido" },
      { key: "home.caso.stat1.value",   label: "Estadística 2 — valor",        default: "3" },
      { key: "home.caso.stat1.label",   label: "Estadística 2 — etiqueta",     default: "Planes de acceso" },
      { key: "home.caso.stat2.value",   label: "Estadística 3 — valor",        default: "72h" },
      { key: "home.caso.stat2.label",   label: "Estadística 3 — etiqueta",     default: "Tiempo de lanzamiento" },
      { key: "home.caso.cta",           label: "Caso real — enlace",           default: "Ver Frecuencia Integral →" },
    ],
  },
  {
    title: "Home — Experiencia del Alumno",
    path: "/",
    fields: [
      { key: "home.alumno.label",   label: "Experiencia — etiqueta",      default: "Experiencia del alumno" },
      { key: "home.alumno.title",   label: "Experiencia — título",        default: "Una experiencia premium que tus alumnos van a amar" },
      { key: "home.alumno.sub",     label: "Experiencia — subtítulo",     default: "Diseñada pensando en la retención y el progreso real.", type: "textarea" },
      { key: "home.alumno.e0.title", label: "Tarjeta 1 — título",         default: "Área privada elegante" },
      { key: "home.alumno.e0.body",  label: "Tarjeta 1 — texto",          default: "Dashboard personalizado con progreso visual, accesos rápidos y bienvenida con el nombre del alumno.", type: "textarea" },
      { key: "home.alumno.e1.title", label: "Tarjeta 2 — título",         default: "Contenido estructurado" },
      { key: "home.alumno.e1.body",  label: "Tarjeta 2 — texto",          default: "Módulos, semanas o lecciones. Con bloqueo progresivo o acceso libre.", type: "textarea" },
      { key: "home.alumno.e2.title", label: "Tarjeta 3 — título",         default: "Multimedia y recursos" },
      { key: "home.alumno.e2.body",  label: "Tarjeta 3 — texto",          default: "Vídeos, audios, PDFs, guías y materiales descargables organizados por módulo.", type: "textarea" },
      { key: "home.alumno.e3.title", label: "Tarjeta 4 — título",         default: "Comunidad y diario" },
      { key: "home.alumno.e3.body",  label: "Tarjeta 4 — texto",          default: "Foro de comunidad integrado y diario personal para que el alumno registre su transformación.", type: "textarea" },
    ],
  },
  {
    title: "Home — White Label",
    path: "/",
    fields: [
      { key: "home.wl.label",  label: "White Label — etiqueta",    default: "White Label total" },
      { key: "home.wl.title",  label: "White Label — título",      default: "100% tu marca. 0% AulaOS visible." },
      { key: "home.wl.sub",    label: "White Label — subtítulo",   default: "Tus alumnos solo ven tu academia. Tu logo, tus colores, tu dominio.", type: "textarea" },
      { key: "home.wl.i0",     label: "Ítem 1",                    default: "Tu logo en header y favicon" },
      { key: "home.wl.i1",     label: "Ítem 2",                    default: "Tu paleta de colores exacta" },
      { key: "home.wl.i2",     label: "Ítem 3",                    default: "Tu dominio personalizado (academia.tudominio.com)" },
      { key: "home.wl.i3",     label: "Ítem 4",                    default: "Emails transaccionales con tu nombre" },
      { key: "home.wl.i4",     label: "Ítem 5",                    default: "Sin menciones a AulaOS en ningún lado" },
      { key: "home.wl.i5",     label: "Ítem 6",                    default: "Panel de control con tu nombre" },
    ],
  },
  {
    title: "Home — Cómo funciona",
    path: "/",
    fields: [
      { key: "home.como.label",      label: "Proceso — etiqueta",       default: "El proceso" },
      { key: "home.como.title",      label: "Proceso — título",         default: "De cero a academia en 72 horas" },
      { key: "home.como.s0.num",     label: "Paso 1 — número",          default: "01" },
      { key: "home.como.s0.title",   label: "Paso 1 — título",          default: "Briefing de marca" },
      { key: "home.como.s0.body",    label: "Paso 1 — texto",           default: "Nos mandas tu logo, colores, estructura de curso y contenido. 30 minutos de llamada.", type: "textarea" },
      { key: "home.como.s1.num",     label: "Paso 2 — número",          default: "02" },
      { key: "home.como.s1.title",   label: "Paso 2 — título",          default: "Configuración y despliegue" },
      { key: "home.como.s1.body",    label: "Paso 2 — texto",           default: "Configuramos tu plataforma, integramos Stripe y desplegamos en tu dominio. 48 horas.", type: "textarea" },
      { key: "home.como.s2.num",     label: "Paso 3 — número",          default: "03" },
      { key: "home.como.s2.title",   label: "Paso 3 — título",          default: "Revisión y ajustes" },
      { key: "home.como.s2.body",    label: "Paso 3 — texto",           default: "Revisión conjunta por videollamada. Ajustes finos hasta que quede perfecto.", type: "textarea" },
      { key: "home.como.s3.num",     label: "Paso 4 — número",          default: "04" },
      { key: "home.como.s3.title",   label: "Paso 4 — título",          default: "Lanzamiento y soporte" },
      { key: "home.como.s3.body",    label: "Paso 4 — texto",           default: "Tu academia live. Soporte continuo incluido en el plan mensual.", type: "textarea" },
    ],
  },
  {
    title: "Home — Precios",
    path: "/",
    fields: [
      { key: "home.precios.label",   label: "Precios — etiqueta",   default: "Planes y precios" },
      { key: "home.precios.title",   label: "Precios — título",     default: "Sin sorpresas. Sin letra pequeña." },
      { key: "home.precios.sub",     label: "Precios — subtítulo",  default: "Elige la opción que mejor se adapta a tu proyecto.", type: "textarea" },
      { key: "home.precio.gestionado.name",   label: "Plan Gestionado — nombre",    default: "Plataforma Gestionada" },
      { key: "home.precio.gestionado.price",  label: "Plan Gestionado — precio",    default: "€147" },
      { key: "home.precio.gestionado.period", label: "Plan Gestionado — período",   default: "/mes" },
      { key: "home.precio.gestionado.desc",   label: "Plan Gestionado — descripción", default: "Para creadores que quieren centrarse en su contenido. Nosotros nos encargamos de todo lo técnico.", type: "textarea" },
      { key: "home.precio.gestionado.cta",    label: "Plan Gestionado — CTA",       default: "Empezar ahora" },
      { key: "home.precio.gestionado.badge",  label: "Plan Gestionado — badge",     default: "Más popular" },
      { key: "home.precio.template.name",     label: "Template — nombre",           default: "Template Tu Academia" },
      { key: "home.precio.template.price",    label: "Template — precio",           default: "€597" },
      { key: "home.precio.template.period",   label: "Template — período",          default: "pago único" },
      { key: "home.precio.template.desc",     label: "Template — descripción",      default: "Para equipos técnicos que prefieren el control total. Código completo, despliega donde quieras.", type: "textarea" },
      { key: "home.precio.template.cta",      label: "Template — CTA",             default: "Comprar template" },
    ],
  },
  {
    title: "Home — FAQ",
    path: "/",
    fields: [
      { key: "home.faq.label",  label: "FAQ — etiqueta",  default: "Preguntas frecuentes" },
      { key: "home.faq.title",  label: "FAQ — título",    default: "Resolvemos tus dudas" },
      { key: "home.faq.q0",     label: "Pregunta 1",      default: "¿Cuánto tiempo se tarda en tener la academia lista?" },
      { key: "home.faq.a0",     label: "Respuesta 1",     default: "Para el plan Gestionado, el proceso completo de briefing, configuración y despliegue tarda entre 48 y 72 horas.", type: "textarea" },
      { key: "home.faq.q1",     label: "Pregunta 2",      default: "¿Mis alumnos verán la marca de AulaOS?" },
      { key: "home.faq.a1",     label: "Respuesta 2",     default: "No, en absoluto. La plataforma es 100% white-label. Tu dominio, tu logo, tus colores. Ni una mención a AulaOS.", type: "textarea" },
      { key: "home.faq.q2",     label: "Pregunta 3",      default: "¿Puedo migrar mi contenido existente?" },
      { key: "home.faq.a2",     label: "Respuesta 3",     default: "Sí. Si ya tienes contenido en Teachable, Kajabi, Notion o cualquier otro formato, te ayudamos a migrarlo.", type: "textarea" },
      { key: "home.faq.q3",     label: "Pregunta 4",      default: "¿Cómo funcionan los pagos de mis alumnos?" },
      { key: "home.faq.a3",     label: "Respuesta 4",     default: "Integramos Stripe directamente con tu cuenta. Los pagos van directamente a ti. Nosotros no tocamos ni un euro.", type: "textarea" },
      { key: "home.faq.q4",     label: "Pregunta 5",      default: "¿Qué pasa si quiero cancelar el plan mensual?" },
      { key: "home.faq.a4",     label: "Respuesta 5",     default: "Sin permanencia. Puedes cancelar cuando quieras con 30 días de aviso. Te entregamos todos tus datos.", type: "textarea" },
      { key: "home.faq.q5",     label: "Pregunta 6",      default: "¿Incluye soporte técnico?" },
      { key: "home.faq.a5",     label: "Respuesta 6",     default: "El plan Gestionado incluye soporte continuo en español por WhatsApp, email y videollamada.", type: "textarea" },
    ],
  },
  {
    title: "Home — CTA Final",
    path: "/",
    fields: [
      { key: "home.cta.title",     label: "CTA Final — título",      default: "¿Listo para lanzar tu academia?" },
      { key: "home.cta.sub",       label: "CTA Final — subtítulo",   default: "Más de 50 academias ya confían en AulaOS. La tuya puede ser la próxima.", type: "textarea" },
      { key: "home.cta.primary",   label: "CTA Final — botón principal",  default: "Solicitar demo gratuita" },
      { key: "home.cta.secondary", label: "CTA Final — botón secundario", default: "Ver plantilla en vivo" },
      { key: "home.cta.note",      label: "CTA Final — nota",        default: "Sin compromiso · Respuesta en menos de 24h · Soporte en español" },
    ],
  },
];

const PAGES: PageDef[] = PAGES_STATIC;

/* ── ALL FIELDS flat map for inline editor lookup ─────────── */
const ALL_FIELDS = PAGES.flatMap(p => p.fields);

/* ── Section panels — Quick Edit map ─────────────────────── */
const SECTION_PANELS: Record<string, { label: string; keys: string[]; hasGrid?: boolean }> = {
  "home-hero":      { label: "Hero",              keys: ["home.hero.badge","home.hero.title1","home.hero.title2","home.hero.subtitle","home.hero.cta.primary","home.hero.cta.secondary","home.hero.proof"] },
  "home-problema":  { label: "El Problema",       keys: ["home.problema.label","home.problema.title","home.problema.sub","home.problema.p0.title","home.problema.p0.body","home.problema.p1.title","home.problema.p1.body","home.problema.p2.title","home.problema.p2.body","home.problema.p3.title","home.problema.p3.body"] },
  "home-solucion":  { label: "La Solución",       keys: ["home.solucion.label","home.solucion.title","home.solucion.sub"] },
  "home-caso":      { label: "Caso Real",         keys: ["home.caso.label","home.caso.badge","home.caso.name","home.caso.desc","home.caso.stat0.value","home.caso.stat0.label","home.caso.stat1.value","home.caso.stat1.label","home.caso.stat2.value","home.caso.stat2.label","home.caso.cta"] },
  "home-alumno":    { label: "Experiencia Alumno", keys: ["home.alumno.label","home.alumno.title","home.alumno.sub"] },
  "home-wl":        { label: "White Label",       keys: ["home.wl.label","home.wl.title","home.wl.sub","home.wl.i0","home.wl.i1","home.wl.i2","home.wl.i3","home.wl.i4","home.wl.i5"] },
  "home-como":      { label: "Cómo Funciona",     keys: ["home.como.label","home.como.title","home.como.s0.title","home.como.s0.body","home.como.s1.title","home.como.s1.body","home.como.s2.title","home.como.s2.body","home.como.s3.title","home.como.s3.body"] },
  "home-precios":   { label: "Precios",           keys: ["home.precios.label","home.precios.title","home.precios.sub","home.precio.gestionado.name","home.precio.gestionado.price","home.precio.gestionado.period","home.precio.gestionado.desc","home.precio.gestionado.cta","home.precio.template.name","home.precio.template.price","home.precio.template.desc","home.precio.template.cta"] },
  "home-faq":       { label: "FAQ",              keys: ["home.faq.label","home.faq.title","home.faq.q0","home.faq.a0","home.faq.q1","home.faq.a1","home.faq.q2","home.faq.a2","home.faq.q3","home.faq.a3","home.faq.q4","home.faq.a4","home.faq.q5","home.faq.a5"] },
  "home-cta":       { label: "CTA Final",        keys: ["home.cta.title","home.cta.sub","home.cta.primary","home.cta.secondary","home.cta.note"] },
};

/* ── Panel IDs ────────────────────────────────────────────── */
type PanelId = "texto" | "diseno" | "nav" | "acciones" | "elementos" | "seccion" | "bloque";

const PANEL_ICONS: Array<{ id: PanelId; icon: React.ReactNode; label: string }> = [
  { id: "texto",     icon: <Type size={16} />,         label: "Textos" },
  { id: "diseno",    icon: <Palette size={16} />,      label: "Diseño" },
  { id: "nav",       icon: <Navigation2 size={16} />,  label: "Páginas" },
  { id: "elementos", icon: <Plus size={16} />,         label: "Añadir" },
  { id: "acciones",  icon: <Zap size={16} />,          label: "Acciones" },
];

/* ── Inline edit state type ───────────────────────────────── */
type InlineEdit = {
  key: string;
  value: string;
  label: string;
  rect: DOMRect;
  isTextarea: boolean;
  isImage: boolean;
};

/* ── Utility sub-components ───────────────────────────────── */
function IconBtn({
  onClick, title, active, style: s, children,
}: {
  onClick?: () => void; title?: string; active?: boolean;
  style?: React.CSSProperties; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      title={title}
      style={{
        width: 38, height: 38, borderRadius: 10,
        background: active ? "rgba(188,150,64,0.22)" : "rgba(255,255,255,0.04)",
        border: `1px solid ${active ? GOLDF : BRD}`,
        color: active ? GOLD : TEXT,
        display: "flex", alignItems: "center", justifyContent: "center",
        cursor: "pointer", transition: "all .15s", flexShrink: 0,
        ...s,
      }}
    >
      {children}
    </button>
  );
}

function SecTitle({ children, style: s }: { children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <div style={{
      fontSize: 9, fontWeight: 800, color: MUTED, textTransform: "uppercase",
      letterSpacing: ".12em", padding: "14px 0 6px",
      display: "flex", alignItems: "center", gap: 8, ...s,
    }}>
      {children}
      <div style={{ flex: 1, height: 1, background: BRD }} />
    </div>
  );
}

function P2Btn({
  icon, label, sublabel, onClick, variant,
}: {
  icon: React.ReactNode; label: string; sublabel?: string;
  onClick?: () => void; variant?: "gold" | "red" | "green" | "teal";
}) {
  const colors: Record<string, { border: string; color: string; hover: string }> = {
    gold:  { border: "rgba(188,150,64,.35)", color: GOLD, hover: "rgba(188,150,64,.12)" },
    red:   { border: "rgba(240,128,128,.3)", color: RED,  hover: REDF },
    green: { border: "rgba(52,199,89,.3)",   color: "#34c759", hover: "rgba(52,199,89,.1)" },
    teal:  { border: "rgba(43,125,122,.35)", color: TEAL, hover: "rgba(43,125,122,.1)" },
  };
  const c = variant ? colors[variant] : null;
  const [hov, setHov] = useState(false);
  return (
    <button
      onClick={onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", alignItems: "center", gap: 12,
        background: hov ? (c?.hover ?? "rgba(255,255,255,.07)") : "rgba(255,255,255,.04)",
        border: `1px solid ${hov ? (c?.border ?? "rgba(255,255,255,.15)") : BRD}`,
        borderRadius: 10, padding: "11px 13px",
        color: c?.color ?? TEXT, cursor: "pointer", width: "100%", textAlign: "left",
        transition: "all .15s", fontFamily: SANS,
        transform: hov ? "translateX(1px)" : "none",
      }}
    >
      <span style={{ fontSize: 17, width: 24, textAlign: "center", flexShrink: 0 }}>{icon}</span>
      <span style={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <b style={{ fontSize: 13, fontWeight: 600 }}>{label}</b>
        {sublabel && <span style={{ fontSize: 10, color: MUTED, fontWeight: 400 }}>{sublabel}</span>}
      </span>
      <ChevronRight size={12} style={{ marginLeft: "auto", opacity: 0.3 }} />
    </button>
  );
}

/* ── Field editor ─────────────────────────────────────────── */
function FieldEditor({
  field, value, onChange,
}: {
  field: FieldDef; value: string; onChange: (v: string) => void;
}) {
  const isModified = value !== field.default;
  const isImage = field.type === "image";
  return (
    <div style={{ marginBottom: 14 }}>
      <label style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        fontSize: 10, fontWeight: 700, color: MUTED, textTransform: "uppercase",
        letterSpacing: ".08em", marginBottom: 5,
      }}>
        {field.label}
        {isModified && (
          <span style={{ background: GOLDF, color: GOLD, borderRadius: 4, padding: "1px 6px", fontSize: 9, fontWeight: 700 }}>
            Editado
          </span>
        )}
      </label>
      {isImage ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {value && (
            <img src={value} alt="preview" style={{ width: "100%", borderRadius: 8, objectFit: "cover", height: 80, border: `1px solid ${BRD}` }} />
          )}
          <input
            type="url"
            value={value}
            onChange={e => onChange(e.target.value)}
            placeholder="https://..."
            style={{
              width: "100%", background: D1, color: TEXT,
              border: `1px solid ${isModified ? "rgba(188,150,64,.4)" : BRD}`,
              borderRadius: 9, padding: "9px 11px", fontSize: 12.5,
              fontFamily: SANS, outline: "none", boxSizing: "border-box",
            }}
          />
        </div>
      ) : field.type === "textarea" ? (
        <textarea
          value={value}
          onChange={e => onChange(e.target.value)}
          rows={4}
          style={{
            width: "100%", background: D1, color: TEXT,
            border: `1px solid ${isModified ? "rgba(188,150,64,.4)" : BRD}`,
            borderRadius: 9, padding: "9px 11px", fontSize: 12.5,
            fontFamily: SANS, resize: "vertical", outline: "none",
            lineHeight: 1.6, boxSizing: "border-box",
            transition: "border-color .15s",
          }}
        />
      ) : (
        <input
          type={field.type ?? "text"}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", background: D1, color: TEXT,
            border: `1px solid ${isModified ? "rgba(188,150,64,.4)" : BRD}`,
            borderRadius: 9, padding: "9px 11px", fontSize: 12.5,
            fontFamily: SANS, outline: "none", boxSizing: "border-box",
            transition: "border-color .15s",
          }}
        />
      )}
    </div>
  );
}

/* ── PANEL: Textos ────────────────────────────────────────── */
function PanelTexto({
  location, draft, onChange,
}: {
  location: string; draft: Record<string, string>;
  onChange: (k: string, v: string) => void;
}) {
  const pagesForLocation = PAGES.filter(p => p.path === location);
  const [pageIdx, setPageIdx] = useState(0);

  /* Reset tab index whenever the page changes */
  const prevLocRef = useRef(location);
  if (prevLocRef.current !== location) {
    prevLocRef.current = location;
    if (pageIdx !== 0) setPageIdx(0);
  }

  if (pagesForLocation.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "40px 0", color: MUTED, fontSize: 13 }}>
        <Monitor size={32} style={{ margin: "0 auto 12px", display: "block", opacity: 0.3 }} />
        Esta página no tiene contenido editable configurado.
      </div>
    );
  }

  const pageDef = pagesForLocation[Math.min(pageIdx, pagesForLocation.length - 1)];
  const modCount = pageDef.fields.filter(f => draft[f.key] !== undefined).length;

  return (
    <div>
      {/* Tab selector if multiple page sections */}
      {pagesForLocation.length > 1 && (
        <div style={{ display: "flex", gap: 4, marginBottom: 12, flexWrap: "wrap" }}>
          {pagesForLocation.map((p, i) => (
            <button key={i} onClick={() => setPageIdx(i)}
              style={{
                fontSize: 10, fontWeight: 700, padding: "5px 10px", borderRadius: 8,
                background: pageIdx === i ? GOLDF : "rgba(255,255,255,.04)",
                border: `1px solid ${pageIdx === i ? "rgba(188,150,64,.4)" : BRD}`,
                color: pageIdx === i ? GOLD : MUTED, cursor: "pointer", fontFamily: SANS,
              }}>
              {p.title.split("—")[1]?.trim() ?? p.title}
            </button>
          ))}
        </div>
      )}

      <div style={{ background: D3, borderRadius: 12, padding: "11px 13px", marginBottom: 14 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, marginBottom: 2 }}>{pageDef.title}</div>
        <div style={{ fontSize: 11, color: MUTED }}>
          {modCount === 0 ? "Sin cambios" : `${modCount} campo${modCount > 1 ? "s" : ""} editado${modCount > 1 ? "s" : ""}`}
        </div>
      </div>
      {pageDef.fields.map(f => (
        <FieldEditor
          key={f.key}
          field={f}
          value={draft[f.key] ?? f.default}
          onChange={v => onChange(f.key, v)}
        />
      ))}
    </div>
  );
}

/* ── PANEL: Quick Edit (Edición Rápida por Sección) ─────── */
const COL_OPTIONS = [
  { label: "50·50", val: "1fr 1fr" },
  { label: "60·40", val: "3fr 2fr" },
  { label: "40·60", val: "2fr 3fr" },
  { label: "66·33", val: "2fr 1fr" },
  { label: "33·66", val: "1fr 2fr" },
  { label: "75·25", val: "3fr 1fr" },
];

function PanelQuickEdit({
  sectionId, draft, onChange, onBack,
}: {
  sectionId: string;
  draft: Record<string, string>;
  onChange: (k: string, v: string) => void;
  onBack: () => void;
}) {
  const sp = SECTION_PANELS[sectionId];
  const fields = sp
    ? sp.keys.map(k => ALL_FIELDS.find(f => f.key === k)).filter(Boolean) as FieldDef[]
    : [];

  const bgKey  = `section.${sectionId}.bg`;
  const colKey = `section.${sectionId}.col`;
  const bgVal  = draft[bgKey]  ?? "";
  const colVal = draft[colKey] ?? "";

  const allSecKeys = [...fields.map(f => f.key), bgKey, colKey];
  const modCount = fields.filter(f => draft[f.key] !== undefined).length
    + (draft[bgKey] !== undefined ? 1 : 0)
    + (draft[colKey] !== undefined ? 1 : 0);

  function handleBgChange(val: string) {
    onChange(bgKey, val);
  }

  function handleColChange(val: string) {
    onChange(colKey, val === colVal ? "" : val);
  }

  function resetSection() { allSecKeys.forEach(k => onChange(k, "")); }

  const isImageUrl = bgVal.startsWith("http") || bgVal.startsWith("/") || bgVal.startsWith("data:");

  return (
    <div>
      {/* Cabecera de sección */}
      <div style={{
        background: "rgba(188,150,64,0.12)",
        border: "1px solid rgba(188,150,64,0.3)",
        borderRadius: 12, padding: "13px 14px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: GOLD, textTransform: "uppercase", letterSpacing: ".12em" }}>
            Edición Rápida
          </div>
          {modCount > 0 && (
            <span style={{ background: GOLDF, color: GOLD, borderRadius: 6, padding: "2px 7px", fontSize: 9, fontWeight: 700 }}>
              {modCount} editado{modCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: SEM }}>
          {sp?.label ?? sectionId}
        </div>
        <div style={{ fontSize: 11, color: MUTED, marginTop: 3 }}>
          {modCount === 0 ? "Sin cambios en esta sección" : `${modCount} campo${modCount > 1 ? "s" : ""} con cambios`}
        </div>
      </div>

      {/* Botón eliminar cambios sección */}
      {modCount > 0 && (
        <button
          onClick={resetSection}
          style={{
            width: "100%", marginBottom: 14,
            background: "rgba(255,50,50,0.07)", border: `1px solid rgba(200,50,50,0.22)`,
            borderRadius: 9, padding: "8px 12px",
            color: "#C0392B", fontSize: 11, fontWeight: 700, cursor: "pointer",
            fontFamily: SANS, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 6, transition: "all .15s",
          }}
        >
          <RotateCcw size={11} /> Eliminar cambios de esta sección
        </button>
      )}

      {/* ── Fondo de sección ── */}
      <SecTitle>Fondo de sección</SecTitle>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <div style={{ position: "relative", flexShrink: 0 }}>
          <input
            type="color"
            value={bgVal.startsWith("#") ? bgVal : "#FFFFFF"}
            onChange={e => handleBgChange(e.target.value)}
            style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${BRD}`, cursor: "pointer", padding: 3, background: "transparent" }}
            title="Color de fondo"
          />
        </div>
        <input
          type="text"
          placeholder="Color hex (#fff) o URL de imagen…"
          value={bgVal}
          onChange={e => handleBgChange(e.target.value)}
          style={{
            flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${BRD}`,
            borderRadius: 8, padding: "6px 10px", color: TEXT, fontSize: 11,
            fontFamily: SANS, outline: "none",
          }}
        />
        {bgVal && (
          <button
            onClick={() => handleBgChange("")}
            title="Limpiar fondo"
            style={{
              width: 24, height: 24, borderRadius: 6, border: `1px solid ${BRD}`,
              background: "rgba(255,255,255,.04)", color: MUTED, cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
            }}
          >
            <X size={11} />
          </button>
        )}
      </div>
      {bgVal && (
        <div style={{
          borderRadius: 8, height: 36, marginBottom: 10,
          background: isImageUrl ? `url("${bgVal}") center/cover no-repeat` : bgVal,
          border: `1px solid ${BRD}`,
        }} />
      )}

      {/* ── Proporción de columnas ── */}
      {sp?.hasGrid && (
        <>
          <SecTitle>Proporción de columnas</SecTitle>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 6, marginBottom: 16 }}>
            {COL_OPTIONS.map(opt => {
              const active = colVal === opt.val;
              return (
                <button
                  key={opt.val}
                  onClick={() => handleColChange(opt.val)}
                  title={opt.val}
                  style={{
                    background: active ? GOLDF : "rgba(255,255,255,.04)",
                    border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                    borderRadius: 8, padding: "8px 4px",
                    color: active ? GOLD : MUTED,
                    cursor: "pointer", fontSize: 10, fontWeight: 700,
                    fontFamily: SANS, transition: "all .15s",
                    display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
                  }}
                >
                  <div style={{ display: "flex", gap: 2, width: "100%", justifyContent: "center" }}>
                    {opt.val.split(" ").map((fr, i) => {
                      const n = parseFloat(fr);
                      const total = opt.val.split(" ").reduce((a, f) => a + parseFloat(f), 0);
                      return (
                        <div key={i} style={{
                          height: 10, borderRadius: 2,
                          background: active ? GOLD : BRD,
                          width: `${(n / total) * 48}px`, flexShrink: 0,
                        }} />
                      );
                    })}
                  </div>
                  {opt.label}
                </button>
              );
            })}
          </div>
          {colVal && (
            <button
              onClick={() => onChange(colKey, "")}
              style={{
                width: "100%", marginBottom: 12,
                background: "rgba(255,255,255,.03)", border: `1px solid ${BRD}`,
                borderRadius: 8, padding: "7px", color: MUTED, fontSize: 10,
                cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
              onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
            >
              Restablecer proporción
            </button>
          )}
        </>
      )}

      {/* ── Campos de texto ── */}
      {fields.length > 0 && <SecTitle>Textos de la sección</SecTitle>}
      {fields.length === 0 && !sp?.hasGrid ? (
        <div style={{ textAlign: "center", padding: "24px 0", color: MUTED, fontSize: 12, lineHeight: 1.9 }}>
          <Eye size={24} style={{ display: "block", margin: "0 auto 10px", opacity: 0.2 }} />
          Ajusta el fondo con los controles de arriba.<br/>No hay campos de texto aquí.
        </div>
      ) : (
        fields.map(f => (
          <FieldEditor
            key={f.key}
            field={f}
            value={draft[f.key] ?? f.default}
            onChange={v => onChange(f.key, v)}
          />
        ))
      )}

      {/* Volver */}
      <button
        onClick={onBack}
        style={{
          width: "100%", marginTop: 18,
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${BRD}`,
          borderRadius: 9, padding: "9px 12px",
          color: MUTED, fontSize: 11, cursor: "pointer",
          fontFamily: SANS, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 6, transition: "all .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
      >
        <ChevronRight size={11} style={{ transform: "rotate(180deg)" }} />
        Ver todos los textos
      </button>
    </div>
  );
}

/* ── PANEL: Bloque/Tarjeta ───────────────────────────────── */
const BR_OPTIONS = [
  { val: "",     label: "Auto" },
  { val: "0",    label: "0" },
  { val: "8",    label: "8" },
  { val: "12",   label: "12" },
  { val: "16",   label: "16" },
  { val: "24",   label: "24" },
  { val: "32",   label: "32" },
  { val: "9999", label: "•••" },
];
const SH_OPTIONS = [
  { val: "",   label: "Auto" },
  { val: "none", label: "Sin" },
  { val: "sm",   label: "XS" },
  { val: "md",   label: "SM" },
  { val: "lg",   label: "MD" },
  { val: "xl",   label: "LG" },
];
const W_OPTIONS = [
  { val: "", label: "Auto" },
  { val: "100%", label: "100%" },
  { val: "80%",  label: "80%" },
  { val: "60%",  label: "60%" },
  { val: "50%",  label: "50%" },
  { val: "33%",  label: "33%" },
];
const H_OPTIONS = [
  { val: "",      label: "Auto" },
  { val: "160px", label: "160" },
  { val: "240px", label: "240" },
  { val: "320px", label: "320" },
  { val: "400px", label: "400" },
  { val: "500px", label: "500" },
];
function PanelBlockEdit({
  blockId, draft, onChange, onBack,
}: {
  blockId: string;
  draft: Record<string, string>;
  onChange: (k: string, v: string) => void;
  onBack: () => void;
}) {
  const bgKey  = `block.${blockId}.bg`;
  const brKey  = `block.${blockId}.br`;
  const shKey  = `block.${blockId}.sh`;
  const visKey = `block.${blockId}.vis`;
  const padKey = `block.${blockId}.pad`;
  const wKey   = `block.${blockId}.w`;
  const hKey   = `block.${blockId}.h`;

  const bgVal  = draft[bgKey]  ?? "";
  const brVal  = draft[brKey]  ?? "";
  const shVal  = draft[shKey]  ?? "";
  const visVal = draft[visKey] ?? "";
  const padVal = draft[padKey] ?? "";
  const wVal   = draft[wKey]   ?? "";
  const hVal   = draft[hKey]   ?? "";

  const ALL_KEYS = [bgKey, brKey, shKey, visKey, padKey, wKey, hKey];
  const modCount = ALL_KEYS.filter(k => draft[k] !== undefined && draft[k] !== "").length;

  const blockEl = document.querySelector(`[data-fi-block="${blockId}"]`) as HTMLElement | null;
  const label   = blockEl?.getAttribute("data-fi-label") ?? blockId;

  const isImageUrl = bgVal.startsWith("http") || bgVal.startsWith("/") || bgVal.startsWith("data:");

  function resetAll() { ALL_KEYS.forEach(k => onChange(k, "")); }

  return (
    <div>
      {/* Cabecera de bloque */}
      <div style={{
        background: "rgba(43,125,122,0.12)",
        border: "1px solid rgba(43,125,122,0.3)",
        borderRadius: 12, padding: "13px 14px", marginBottom: 10,
      }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 4 }}>
          <div style={{ fontSize: 9, fontWeight: 800, color: "#2B7D7A", textTransform: "uppercase", letterSpacing: ".12em" }}>
            Estilo de bloque
          </div>
          {modCount > 0 && (
            <span style={{ background: "rgba(43,125,122,0.12)", color: "#2B7D7A", borderRadius: 6, padding: "2px 7px", fontSize: 9, fontWeight: 700 }}>
              {modCount} editado{modCount > 1 ? "s" : ""}
            </span>
          )}
        </div>
        <div style={{ fontSize: 15, fontWeight: 700, color: TEXT, fontFamily: SEM }}>{label}</div>
        <div style={{ fontSize: 10, color: MUTED, marginTop: 2, fontFamily: "monospace", opacity: 0.6 }}>{blockId}</div>
      </div>

      {/* Botón restablecer — siempre visible arriba */}
      {modCount > 0 && (
        <button
          onClick={resetAll}
          style={{
            width: "100%", marginBottom: 14,
            background: "rgba(255,50,50,0.07)", border: `1px solid rgba(200,50,50,0.22)`,
            borderRadius: 9, padding: "8px 12px",
            color: "#C0392B", fontSize: 11, fontWeight: 700, cursor: "pointer",
            fontFamily: SANS, display: "flex", alignItems: "center",
            justifyContent: "center", gap: 6, transition: "all .15s",
          }}
        >
          <RotateCcw size={11} /> Eliminar cambios del bloque
        </button>
      )}

      {/* Visibilidad */}
      <SecTitle>Visibilidad</SecTitle>
      <div style={{ display: "flex", gap: 6, marginBottom: 14 }}>
        {[{ val: "", label: "Visible" }, { val: "hidden", label: "Oculto" }].map(opt => {
          const active = visVal === opt.val;
          return (
            <button
              key={opt.val}
              onClick={() => onChange(visKey, opt.val)}
              style={{
                flex: 1, padding: "8px 4px",
                background: active ? (opt.val === "hidden" ? "rgba(180,50,50,0.15)" : GOLDF) : "rgba(255,255,255,.04)",
                border: `1px solid ${active ? (opt.val === "hidden" ? "rgba(180,50,50,0.4)" : "rgba(188,150,64,.5)") : BRD}`,
                borderRadius: 8, color: active ? (opt.val === "hidden" ? "#C0392B" : GOLD) : MUTED,
                fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
            >{opt.label}</button>
          );
        })}
      </div>

      {/* Anchura máxima */}
      <SecTitle>Anchura máxima</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 14 }}>
        {W_OPTIONS.map(opt => {
          const active = wVal === opt.val;
          return (
            <button key={opt.val} onClick={() => onChange(wKey, opt.val)}
              style={{
                padding: "7px 4px",
                background: active ? GOLDF : "rgba(255,255,255,.04)",
                border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                borderRadius: 8, color: active ? GOLD : MUTED,
                fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
            >{opt.label}</button>
          );
        })}
      </div>

      {/* Altura mínima */}
      <SecTitle>Altura mínima (px)</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 14 }}>
        {H_OPTIONS.map(opt => {
          const active = hVal === opt.val;
          return (
            <button key={opt.val} onClick={() => onChange(hKey, opt.val)}
              style={{
                padding: "7px 4px",
                background: active ? GOLDF : "rgba(255,255,255,.04)",
                border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                borderRadius: 8, color: active ? GOLD : MUTED,
                fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
            >{opt.label}</button>
          );
        })}
      </div>

      {/* Fondo */}
      <SecTitle>Fondo del bloque</SecTitle>
      <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 8 }}>
        <input
          type="color"
          value={bgVal.startsWith("#") ? bgVal : "#FFFFFF"}
          onChange={e => onChange(bgKey, e.target.value)}
          style={{ width: 32, height: 32, borderRadius: 8, border: `1px solid ${BRD}`, cursor: "pointer", padding: 3, background: "transparent", flexShrink: 0 }}
          title="Color de fondo"
        />
        <input
          type="text"
          placeholder="Color hex (#fff) o URL de imagen…"
          value={bgVal}
          onChange={e => onChange(bgKey, e.target.value)}
          style={{
            flex: 1, background: "rgba(255,255,255,.04)", border: `1px solid ${BRD}`,
            borderRadius: 8, padding: "6px 10px", color: TEXT, fontSize: 11,
            fontFamily: SANS, outline: "none",
          }}
        />
        {bgVal && (
          <button onClick={() => onChange(bgKey, "")} title="Limpiar"
            style={{ width: 24, height: 24, borderRadius: 6, border: `1px solid ${BRD}`, background: "rgba(255,255,255,.04)", color: MUTED, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
          ><X size={11} /></button>
        )}
      </div>
      {bgVal && (
        <div style={{ borderRadius: 8, height: 28, marginBottom: 8, background: isImageUrl ? `url("${bgVal}") center/cover no-repeat` : bgVal, border: `1px solid ${BRD}` }} />
      )}
      <div style={{ display: "flex", gap: 5, flexWrap: "wrap", marginBottom: 14 }}>
        {["#FFFFFF","#F5F5F7","#FAFAF8","#F2F3F5","#1D1D1F","#1c1814","#F5F0E8","#E8EDF5"].map(c => (
          <button key={c} onClick={() => onChange(bgKey, c)} title={c}
            style={{ width: 22, height: 22, borderRadius: 6, background: c, border: bgVal === c ? "2px solid #2B7D7A" : `1px solid ${BRD}`, cursor: "pointer", flexShrink: 0 }}
          />
        ))}
      </div>

      {/* Border radius */}
      <SecTitle>Radio de esquinas (px)</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 5, marginBottom: 14 }}>
        {BR_OPTIONS.map(opt => {
          const active = brVal === opt.val;
          return (
            <button key={opt.val} onClick={() => onChange(brKey, opt.val)}
              style={{
                padding: "7px 4px",
                background: active ? GOLDF : "rgba(255,255,255,.04)",
                border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                borderRadius: 8, color: active ? GOLD : MUTED,
                fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
            >{opt.label}</button>
          );
        })}
      </div>

      {/* Sombra */}
      <SecTitle>Sombra</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 5, marginBottom: 14 }}>
        {SH_OPTIONS.map(opt => {
          const active = shVal === opt.val;
          return (
            <button key={opt.val} onClick={() => onChange(shKey, opt.val)}
              style={{
                padding: "7px 4px",
                background: active ? GOLDF : "rgba(255,255,255,.04)",
                border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                borderRadius: 8, color: active ? GOLD : MUTED,
                fontSize: 10, fontWeight: 700, cursor: "pointer", fontFamily: SANS, transition: "all .15s",
              }}
            >{opt.label}</button>
          );
        })}
      </div>

      {/* Padding personalizado */}
      <SecTitle>Padding personalizado</SecTitle>
      <input
        type="text"
        placeholder="Ej: 24px 32px ó 40px"
        value={padVal}
        onChange={e => onChange(padKey, e.target.value)}
        style={{
          width: "100%", background: "rgba(255,255,255,.04)", border: `1px solid ${BRD}`,
          borderRadius: 8, padding: "7px 10px", color: TEXT, fontSize: 11,
          fontFamily: SANS, outline: "none", marginBottom: 14, boxSizing: "border-box",
        }}
      />

      {/* Volver */}
      <button
        onClick={onBack}
        style={{
          width: "100%", marginTop: 4,
          background: "rgba(255,255,255,.04)",
          border: `1px solid ${BRD}`,
          borderRadius: 9, padding: "9px 12px",
          color: MUTED, fontSize: 11, cursor: "pointer",
          fontFamily: SANS, display: "flex", alignItems: "center",
          justifyContent: "center", gap: 6, transition: "all .15s",
        }}
        onMouseEnter={e => (e.currentTarget.style.color = TEXT)}
        onMouseLeave={e => (e.currentTarget.style.color = MUTED)}
      >
        <ChevronRight size={11} style={{ transform: "rotate(180deg)" }} />
        Ver todos los textos
      </button>
    </div>
  );
}

/* ── PANEL: Diseño ────────────────────────────────────────── */
const THEMES = [
  { id: "blanco", label: "Blanco · Gold",  bg: "#FFFFFF", accent: "#BC9640" },
  { id: "marfil", label: "Marfil · Gold",  bg: "#FAF8F4", accent: "#BC9640" },
  { id: "oscuro", label: "Noche · Gold",   bg: "#1D1D1F", accent: "#BC9640" },
  { id: "bosque", label: "Bosque · Teal",  bg: "#F2F6F4", accent: "#2B7D7A" },
];

function PanelDiseno({ draft, onChange }: { draft: Record<string, string>; onChange: (k: string, v: string) => void }) {
  const currentTheme = draft["site.theme"] ?? "blanco";
  return (
    <div>
      <SecTitle>Tema visual</SecTitle>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 20 }}>
        {THEMES.map(t => (
          <button key={t.id} onClick={() => onChange("site.theme", t.id)}
            style={{
              background: t.bg, borderRadius: 10, padding: "14px 10px",
              border: `2px solid ${currentTheme === t.id ? t.accent : "rgba(0,0,0,0.08)"}`,
              cursor: "pointer", textAlign: "center", transition: "all .15s",
              boxShadow: currentTheme === t.id ? `0 0 0 3px ${t.accent}33` : "none",
            }}>
            <div style={{ width: 20, height: 20, borderRadius: "50%", background: t.accent, margin: "0 auto 6px" }} />
            <div style={{ fontSize: 10, fontWeight: 700, color: "#1D1D1F", opacity: 0.7 }}>{t.label}</div>
          </button>
        ))}
      </div>
      <SecTitle>Tipografía</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {["Playfair + Jakarta", "Cormorant + DM Sans", "Libre Baskerville + Lato"].map(f => {
          const active = (draft["site.fonts"] ?? "Playfair + Jakarta") === f;
          return (
            <button key={f} onClick={() => onChange("site.fonts", f)}
              style={{
                background: active ? GOLDF : "rgba(255,255,255,0.04)",
                border: `1px solid ${active ? "rgba(188,150,64,.5)" : BRD}`,
                borderRadius: 9, padding: "10px 12px",
                color: active ? GOLD : TEXT, cursor: "pointer",
                fontFamily: SANS, fontSize: 12, textAlign: "left", transition: "all .15s",
              }}>
              {f}
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── PANEL: Nav ───────────────────────────────────────────── */
function PanelNav({ location, onNavigate }: { location: string; onNavigate: (p: string) => void }) {
  const links = [
    { path: "/",     label: "Home — AulaOS",    icon: "🏠" },
    { path: "/demo", label: "Demo en vivo",     icon: "🎓" },
  ];
  return (
    <div>
      <SecTitle>Páginas del sitio</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        {links.map(l => (
          <button key={l.path} onClick={() => onNavigate(l.path)}
            style={{
              display: "flex", alignItems: "center", gap: 12,
              background: location === l.path ? GOLDF : "rgba(255,255,255,0.04)",
              border: `1px solid ${location === l.path ? "rgba(188,150,64,.4)" : BRD}`,
              borderRadius: 10, padding: "11px 13px",
              color: location === l.path ? GOLD : TEXT,
              cursor: "pointer", fontFamily: SANS, fontSize: 13,
              fontWeight: location === l.path ? 700 : 400,
              transition: "all .15s", textAlign: "left", width: "100%",
            }}>
            <span style={{ fontSize: 16, width: 24 }}>{l.icon}</span>
            <span style={{ flex: 1 }}>{l.label}</span>
            {location === l.path && <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: ".08em", opacity: 0.6 }}>ACTUAL</span>}
          </button>
        ))}
      </div>
      <div style={{ marginTop: 16, padding: "12px", background: D3, borderRadius: 10, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
        <MousePointer size={11} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
        Con el editor abierto, haz clic en cualquier texto de la página para editarlo directamente.
      </div>
    </div>
  );
}

/* ── PANEL: Bloques — constructor de contenido ────────────── */

const BLOCK_TYPES_ORDERED: BlockType[] = [
  "heading", "text", "card", "cards_row", "text_image", "quote", "steps", "cta", "divider",
];

/** Calcula la zona para la página/semana actual */
function zoneForLocation(location: string, pageTitle?: string): string {
  if (pageTitle && pageTitle.includes("Semana")) {
    const m = pageTitle.match(/Semana (\d+)/);
    if (m) return `week_${m[1]}`;
  }
  return location.replace(/\//g, "_").replace(/^_/, "") || "home";
}

function BlockFieldEditor({
  label, value, multiline, onChange,
}: { label: string; value: string; multiline?: boolean; onChange: (v: string) => void }) {
  const base: React.CSSProperties = {
    width: "100%", background: D1, color: TEXT,
    border: `1px solid ${BRD}`, borderRadius: 7,
    padding: "7px 9px", fontSize: 11.5, fontFamily: SANS,
    outline: "none", boxSizing: "border-box", resize: "vertical",
  };
  return (
    <div style={{ marginBottom: 8 }}>
      <div style={{ fontSize: 10, color: MUTED, marginBottom: 3, fontWeight: 600 }}>{label}</div>
      {multiline
        ? <textarea value={value} onChange={e => onChange(e.target.value)} style={{ ...base, minHeight: 56 }} />
        : <input value={value} onChange={e => onChange(e.target.value)} style={base} />}
    </div>
  );
}

function BlockItem({
  zone, block, idx, total, onRefresh,
}: { zone: string; block: Block; idx: number; total: number; onRefresh: () => void }) {
  const [open, setOpen] = useState(false);
  const meta = BLOCK_LABELS[block.type];

  function field(key: string, label: string, multiline?: boolean) {
    return (
      <BlockFieldEditor
        key={key}
        label={label}
        value={block.data[key] ?? ""}
        multiline={multiline}
        onChange={v => { updateBlockField(zone, block.id, key, v); onRefresh(); }}
      />
    );
  }

  function renderFields() {
    switch (block.type) {
      case "text":       return <>{field("text", "Texto", true)}</>;
      case "heading":    return <>{field("label", "Etiqueta (opcional)")}{field("title", "Título")}{field("subtitle", "Subtítulo", true)}</>;
      case "card":       return <>{field("icon", "Icono / emoji")}{field("title", "Título")}{field("body", "Cuerpo", true)}{field("cta", "Texto del enlace (opcional)")}{field("ctaUrl", "URL del enlace")}</>;
      case "quote":      return <>{field("text", "Cita", true)}{field("author", "Autor")}</>;
      case "text_image": return <>{field("label", "Etiqueta (opcional)")}{field("title", "Título")}{field("body", "Cuerpo", true)}{field("imageUrl", "URL imagen")}{field("imageAlt", "Texto alternativo")}<div style={{ marginBottom: 8 }}><div style={{ fontSize: 10, color: MUTED, marginBottom: 3, fontWeight: 600 }}>Posición imagen</div><div style={{ display: "flex", gap: 6 }}>{["left", "right"].map(p => (<button key={p} onClick={() => { updateBlockField(zone, block.id, "imagePos", p); onRefresh(); }} style={{ flex: 1, padding: "6px", fontSize: 11, borderRadius: 7, border: `1px solid ${block.data.imagePos === p ? "rgba(188,150,64,.5)" : BRD}`, background: block.data.imagePos === p ? GOLDF : D1, color: block.data.imagePos === p ? GOLD : MUTED, cursor: "pointer" }}>{p === "left" ? "← Izquierda" : "Derecha →"}</button>))}</div></div></>;
      case "steps":      return <>{field("title", "Título sección (opcional)")}{[0,1,2,3,4].filter(i => i < 3 || block.data[`step${i}`] !== undefined).map(i => field(`step${i}`, `Paso ${i+1}`, true))}<button onClick={() => { const n = Object.keys(block.data).filter(k => k.startsWith("step")).length; updateBlockField(zone, block.id, `step${n}`, "Nuevo paso"); onRefresh(); }} style={{ fontSize: 11, background: D3, color: MUTED, border: `1px solid ${BRD}`, borderRadius: 7, padding: "5px 10px", cursor: "pointer", marginBottom: 8 }}>+ Añadir paso</button></>;
      case "cards_row":  return <>{[0,1,2].map(i => <div key={i} style={{ borderTop: `1px solid ${BRD}`, paddingTop: 8, marginTop: 4 }}><div style={{ fontSize: 10, color: GOLD, fontWeight: 700, marginBottom: 6 }}>Col. {i+1}</div>{field(`col${i}_icon`, "Icono / emoji")}{field(`col${i}_title`, "Título")}{field(`col${i}_body`, "Descripción", true)}</div>)}</>;
      case "cta":        return <>{field("label", "Etiqueta (opcional)")}{field("title", "Título")}{field("subtitle", "Subtítulo", true)}{field("btnText", "Texto del botón")}{field("btnUrl", "URL del botón")}</>;
      case "divider":    return <div style={{ fontSize: 11, color: MUTED }}>Separador visual — sin campos editables.</div>;
      default:           return null;
    }
  }

  return (
    <div style={{ background: D3, borderRadius: 11, overflow: "hidden", border: `1px solid ${BRD}` }}>
      {/* Header row */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 11px", cursor: "pointer" }} onClick={() => setOpen(o => !o)}>
        <span style={{ fontSize: 13, width: 22, textAlign: "center", color: GOLD }}>{meta.icon}</span>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11.5, fontWeight: 700, color: TEXT }}>{meta.label}</div>
          {!open && (
            <div style={{ fontSize: 10, color: MUTED, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
              {block.data.title || block.data.text || block.data.btnText || meta.description}
            </div>
          )}
        </div>
        <div style={{ display: "flex", gap: 3 }}>
          <button
            onClick={e => { e.stopPropagation(); moveBlock(zone, block.id, "up"); onRefresh(); }}
            disabled={idx === 0}
            style={{ background: "none", border: "none", color: idx === 0 ? BRD : MUTED, cursor: idx === 0 ? "default" : "pointer", padding: 3 }}
            title="Subir">▲</button>
          <button
            onClick={e => { e.stopPropagation(); moveBlock(zone, block.id, "down"); onRefresh(); }}
            disabled={idx === total - 1}
            style={{ background: "none", border: "none", color: idx === total - 1 ? BRD : MUTED, cursor: idx === total - 1 ? "default" : "pointer", padding: 3 }}
            title="Bajar">▼</button>
          <button
            onClick={e => { e.stopPropagation(); duplicateBlock(zone, block.id); onRefresh(); }}
            style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", padding: 3 }}
            title="Duplicar"><Copy size={11} /></button>
          <button
            onClick={e => { e.stopPropagation(); if (confirm("¿Eliminar este bloque?")) { deleteBlock(zone, block.id); onRefresh(); } }}
            style={{ background: "none", border: "none", color: RED, cursor: "pointer", padding: 3, opacity: 0.7 }}
            title="Eliminar"><Trash2 size={11} /></button>
        </div>
      </div>

      {/* Fields */}
      {open && (
        <div style={{ padding: "4px 12px 12px", borderTop: `1px solid ${BRD}` }}>
          {renderFields()}
        </div>
      )}
    </div>
  );
}

/* ─── Miniaturas CSS para cada variante ──────────────────── */
const GV = "#BC9640";
const GVF = "rgba(188,150,64,0.14)";
const BAR = (w: string, h: number, bg: string, radius?: number) => (
  <div style={{ width: w, height: h, background: bg, borderRadius: radius ?? 2, flexShrink: 0 }} />
);
const BARS = (n: number, bg: string, w = "100%", h = 3) =>
  Array.from({ length: n }, (_, i) => (
    <div key={i} style={{ width: i === n - 1 ? "70%" : w, height: h, background: bg, borderRadius: 2, marginBottom: 3 }} />
  ));

function VariantMiniPreview({ type, variant }: { type: string; variant: string }) {
  const s: CSSProperties = {
    width: 88, height: 56, borderRadius: 7, overflow: "hidden", position: "relative",
    border: "1px solid #2A2A2A", flexShrink: 0,
  };
  const col = { text: "#555", gold: GV, bar: "#363636", light: "#464646", white: "#fff", dark: "#1D1D1F" };

  /* CARD */
  if (type === "card") {
    if (variant === "bordered") return <div style={{ ...s, background: "#1a1a1a", display: "flex", padding: 8, gap: 6 }}>
      <div style={{ width: 3, background: GV, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        {BAR("65%", 4, "#fff", 2)}<div style={{ height: 3 }} />{BARS(2, col.light, "100%", 3)}
      </div>
    </div>;
    if (variant === "dark") return <div style={{ ...s, background: "#1D1D1F", padding: 9 }}>
      <div style={{ display: "flex", gap: 6, alignItems: "center", marginBottom: 6 }}>
        <div style={{ width: 12, height: 12, background: GVF, border: `1px solid ${GV}`, borderRadius: 3 }} />
        {BAR("50%", 4, GV, 2)}
      </div>
      {BARS(2, "#3A3A3C", "100%", 3)}
    </div>;
    if (variant === "minimal") return <div style={{ ...s, background: "#191919", padding: "8px 9px 0" }}>
      <div style={{ borderBottom: "1px solid #2a2a2a", paddingBottom: 8 }}>
        {BAR("60%", 4, "#ccc", 2)}<div style={{ height: 4 }} />{BARS(2, col.light, "100%", 3)}
      </div>
    </div>;
    /* default */ return <div style={{ ...s, background: "#fff", padding: 9 }}>
      <div style={{ background: "#f0f0f0", borderRadius: 6, width: "100%", height: "100%", padding: 8, boxSizing: "border-box" }}>
        {BAR("60%", 4, "#333", 2)}<div style={{ height: 4 }} />{BARS(2, "#aaa")}
      </div>
    </div>;
  }

  /* HEADING */
  if (type === "heading") {
    if (variant === "centered") return <div style={{ ...s, background: "#191919", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <div style={{ color: GV, fontSize: 10, lineHeight: 1 }}>✦</div>
      {BAR("55%", 5, "#fff", 2)}<div style={{ height: 1 }} />{BAR("40%", 3, col.light, 2)}
    </div>;
    if (variant === "minimal") return <div style={{ ...s, background: "#191919", padding: "10px 10px" }}>
      {BAR("35%", 3, col.light, 1)}<div style={{ height: 4 }} />{BAR("72%", 5, "#fff", 2)}<div style={{ height: 4 }} />{BAR("50%", 3, col.light, 1)}
    </div>;
    if (variant === "gold") return <div style={{ ...s, background: GVF, border: `1px solid rgba(188,150,64,0.25)`, padding: "8px 10px" }}>
      {BAR("40%", 3, "rgba(188,150,64,.5)", 1)}<div style={{ height: 4 }} />{BAR("70%", 5, GV, 2)}<div style={{ height: 4 }} />{BAR("50%", 3, "rgba(188,150,64,.4)", 1)}
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", padding: "8px 10px" }}>
      {BAR("35%", 3, GV, 1)}<div style={{ height: 4 }} />{BAR("72%", 5, "#fff", 2)}<div style={{ height: 4 }} />{BAR("50%", 3, col.light, 1)}<div style={{ height: 5 }} />{BAR("32%", 2, GV, 1)}
    </div>;
  }

  /* QUOTE */
  if (type === "quote") {
    if (variant === "centered") return <div style={{ ...s, background: "#191919", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 4 }}>
      <div style={{ fontSize: 18, color: GV, lineHeight: 1, opacity: 0.5 }}>"</div>
      {BAR("65%", 3, "#888", 2)}<div style={{ height: 1 }} />{BAR("50%", 3, "#888", 2)}<div style={{ height: 3 }} />{BAR("30%", 2, GV, 1)}
    </div>;
    if (variant === "highlight") return <div style={{ ...s, background: GVF, border: `1px solid rgba(188,150,64,.2)`, padding: "8px 10px" }}>
      {BAR("70%", 4, "rgba(188,150,64,.5)", 2)}<div style={{ height: 3 }} />{BARS(2, "rgba(188,150,64,.3)", "100%", 3)}<div style={{ height: 3 }} />{BAR("28%", 2, GV, 1)}
    </div>;
    if (variant === "dark") return <div style={{ ...s, background: "#1D1D1F", padding: "9px 10px" }}>
      <div style={{ fontSize: 14, color: GV, lineHeight: 1, opacity: 0.4, marginBottom: 4 }}>"</div>
      {BARS(2, "#3A3A3C")}<div style={{ height: 3 }} />{BAR("28%", 2, GV, 1)}
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", display: "flex", padding: 8, gap: 5 }}>
      <div style={{ width: 3, background: GV, borderRadius: 2, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>{BARS(3, col.light)}</div>
    </div>;
  }

  /* TEXT */
  if (type === "text") {
    if (variant === "serif") return <div style={{ ...s, background: "#191919", padding: "12px 10px", display: "flex", flexDirection: "column", gap: 4 }}>
      {BAR("100%", 4, "#ccc", 2)}{BAR("90%", 4, "#ccc", 2)}{BAR("70%", 4, "#ccc", 2)}
    </div>;
    if (variant === "lead") return <div style={{ ...s, background: "#191919", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 5 }}>
      {BAR("100%", 5, "#ddd", 2)}{BAR("85%", 5, "#ddd", 2)}
    </div>;
    if (variant === "inset") return <div style={{ ...s, background: "#191919", padding: 8 }}>
      <div style={{ background: "#2A2A2A", borderRadius: 6, padding: "8px 8px", height: "100%", boxSizing: "border-box" }}>
        {BARS(3, "#444")}
      </div>
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", padding: "10px 10px", display: "flex", flexDirection: "column", gap: 3 }}>
      {BARS(4, col.light)}
    </div>;
  }

  /* STEPS */
  if (type === "steps") {
    if (variant === "circles") return <div style={{ ...s, background: "#191919", padding: "7px 9px", display: "flex", flexDirection: "column", gap: 5 }}>
      {[0,1,2].map(i => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: GVF, border: `1px solid ${GV}`, flexShrink: 0 }} />
        {BAR("65%", 3, col.light, 2)}
      </div>)}
    </div>;
    if (variant === "cards") return <div style={{ ...s, background: "#191919", padding: "6px 8px", display: "flex", flexDirection: "column", gap: 4 }}>
      {[0,1,2].map(i => <div key={i} style={{ background: "#2a2a2a", borderRadius: 5, padding: "4px 6px", display: "flex", alignItems: "center", gap: 5 }}>
        <div style={{ fontSize: 8, color: GV, fontWeight: 700, width: 10 }}>0{i+1}</div>
        {BAR("60%", 3, col.light, 2)}
      </div>)}
    </div>;
    if (variant === "timeline") return <div style={{ ...s, background: "#191919", padding: "6px 9px", position: "relative" }}>
      <div style={{ position: "absolute", left: 12, top: 12, bottom: 12, width: 1, background: `linear-gradient(${GV},transparent)` }} />
      {[0,1,2].map(i => <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 8, marginBottom: i < 2 ? 6 : 0 }}>
        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#191919", border: `1.5px solid ${GV}`, flexShrink: 0, zIndex: 1, marginTop: 1 }} />
        {BAR("55%", 3, col.light, 2)}
      </div>)}
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", padding: "7px 9px", display: "flex", flexDirection: "column", gap: 5 }}>
      {[0,1,2].map(i => <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, borderBottom: i < 2 ? "1px solid #222" : "none", paddingBottom: i < 2 ? 5 : 0 }}>
        <div style={{ fontSize: 8, color: GV, fontWeight: 700, width: 8 }}>{i+1}</div>
        {BAR("65%", 3, col.light, 2)}
      </div>)}
    </div>;
  }

  /* CARDS ROW */
  if (type === "cards_row") {
    if (variant === "white") return <div style={{ ...s, background: "#222", display: "flex", gap: 4, padding: 8 }}>
      {[0,1,2].map(i => <div key={i} style={{ flex: 1, background: "#fff", borderRadius: 5, padding: 5, boxShadow: "0 1px 4px rgba(0,0,0,.3)" }}>
        {BAR("70%", 3, "#444", 2)}<div style={{ height: 3 }} />{BAR("55%", 2, "#aaa", 1)}
      </div>)}
    </div>;
    if (variant === "icon") return <div style={{ ...s, background: "#191919", display: "flex", gap: 4, padding: 7 }}>
      {[0,1,2].map(i => <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3 }}>
        <div style={{ width: 16, height: 16, background: GVF, borderRadius: "50%" }} />
        {BAR("80%", 3, "#555", 2)}{BAR("55%", 2, col.light, 1)}
      </div>)}
    </div>;
    if (variant === "border") return <div style={{ ...s, background: "#191919", display: "flex", gap: 4, padding: 8 }}>
      {[0,1,2].map(i => <div key={i} style={{ flex: 1, borderTop: `2px solid ${GV}`, background: "#1e1e1e", borderRadius: "0 0 5px 5px", padding: "5px 4px" }}>
        {BAR("70%", 3, "#777", 2)}<div style={{ height: 3 }} />{BAR("55%", 2, col.light, 1)}
      </div>)}
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", display: "flex", gap: 4, padding: 8 }}>
      {[0,1,2].map(i => <div key={i} style={{ flex: 1, background: "#2A2A2A", borderRadius: 5, padding: 5 }}>
        {BAR("70%", 3, "#666", 2)}<div style={{ height: 3 }} />{BAR("55%", 2, col.light, 1)}
      </div>)}
    </div>;
  }

  /* CTA */
  if (type === "cta") {
    if (variant === "dark") return <div style={{ ...s, background: "#1D1D1F", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {BAR("55%", 5, "#fff", 2)}<div style={{ height: 1 }} />{BAR("42%", 3, "#555", 2)}<div style={{ height: 2 }} />
      <div style={{ background: GV, borderRadius: 10, padding: "2px 12px" }}>{BAR("28%", 3, "#1D1D1F", 1)}</div>
    </div>;
    if (variant === "gold") return <div style={{ ...s, background: GVF, border: `1px solid rgba(188,150,64,.2)`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {BAR("55%", 5, GV, 2)}<div style={{ height: 1 }} />{BAR("42%", 3, "rgba(188,150,64,.4)", 2)}<div style={{ height: 2 }} />
      <div style={{ background: "#795901", borderRadius: 10, padding: "2px 12px" }}>{BAR("28%", 3, "rgba(255,255,255,.4)", 1)}</div>
    </div>;
    if (variant === "minimal") return <div style={{ ...s, background: "#191919", padding: "0 8px", display: "flex", alignItems: "center", justifyContent: "space-between", borderTop: "1px solid #2A2A2A", borderBottom: "1px solid #2A2A2A" }}>
      <div style={{ flex: 1 }}>{BAR("60%", 5, "#ccc", 2)}</div>
      <div style={{ background: "#1D1D1F", border: "1px solid #555", borderRadius: 10, padding: "3px 8px", flexShrink: 0 }}>{BAR("24px", 3, "#888", 2)}</div>
    </div>;
    /* default */ return <div style={{ ...s, background: "linear-gradient(135deg,#262620,#1e1c17)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 5 }}>
      {BAR("50%", 5, "#e0d5b8", 2)}<div style={{ height: 1 }} />{BAR("38%", 3, "#888", 2)}<div style={{ height: 2 }} />
      <div style={{ background: "#1D1D1F", borderRadius: 10, padding: "2px 10px" }}>{BAR("24px", 3, "#aaa", 2)}</div>
    </div>;
  }

  /* DIVIDER */
  if (type === "divider") {
    if (variant === "ornamental") return <div style={{ ...s, background: "#191919", display: "flex", alignItems: "center", justifyContent: "center", gap: 6 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GV})` }} />
      <div style={{ fontSize: 10, color: GV, opacity: 0.7 }}>✦</div>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GV},transparent)` }} />
    </div>;
    if (variant === "spacer") return <div style={{ ...s, background: "#191919", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "70%", height: "60%", border: "1px dashed #333", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 9, color: "#444" }}>espacio</span>
      </div>
    </div>;
    /* line */ return <div style={{ ...s, background: "#191919", display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ width: "80%", height: 1, background: "linear-gradient(90deg,transparent,#555,transparent)" }} />
    </div>;
  }

  /* TEXT IMAGE */
  if (type === "text_image") {
    if (variant === "large_img") return <div style={{ ...s, background: "#191919", display: "flex", padding: 7, gap: 5 }}>
      <div style={{ width: "30%", display: "flex", flexDirection: "column", gap: 3 }}>{BARS(3, "#444")}</div>
      <div style={{ flex: 1, background: "#2A2A2A", borderRadius: 5 }} />
    </div>;
    if (variant === "overlap") return <div style={{ ...s, background: "#191919", padding: 7, position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", right: 7, top: 7, bottom: 7, width: "65%", background: "#2A2A2A", borderRadius: 5 }} />
      <div style={{ position: "absolute", left: 5, top: "50%", transform: "translateY(-50%)", width: "50%", background: "#222", borderRadius: 5, padding: "5px 6px", boxShadow: "0 2px 6px rgba(0,0,0,.5)" }}>
        {BAR("60%", 3, "#999", 2)}<div style={{ height: 2 }} />{BAR("80%", 2, "#555", 2)}
      </div>
    </div>;
    /* default */ return <div style={{ ...s, background: "#191919", display: "flex", padding: 7, gap: 5 }}>
      <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 3 }}>{BARS(3, "#444")}</div>
      <div style={{ flex: 1, background: "#2A2A2A", borderRadius: 5 }} />
    </div>;
  }

  return <div style={{ ...s, background: "#1a1a1a" }} />;
}

function PanelElementos({ location, draft, onChange, currentPageTitle }: {
  location: string; draft: Record<string, string>; onChange: (k: string, v: string) => void; currentPageTitle?: string;
}) {
  const zone = zoneForLocation(location, currentPageTitle);
  const [blocks, setBlocks] = useState<Block[]>(() => getBlocks(zone));
  const [showPicker, setShowPicker] = useState(false);
  const [pickerType, setPickerType] = useState<BlockType | null>(null);
  const [pickerVariant, setPickerVariant] = useState<string | null>(null);
  const [insertPos, setInsertPos] = useState<number | "end">("end");

  function refresh() {
    setBlocks([...getBlocks(zone)]);
  }

  useEffect(() => {
    function onBlocks(e: Event) {
      const d = (e as CustomEvent).detail;
      if (d?.zone === zone) setBlocks([...d.blocks]);
    }
    window.addEventListener("fi:blocks", onBlocks);
    return () => window.removeEventListener("fi:blocks", onBlocks);
  }, [zone]);

  /* refresh when zone changes (page navigation) */
  const prevZone = useRef(zone);
  if (prevZone.current !== zone) {
    prevZone.current = zone;
    setBlocks(getBlocks(zone));
  }

  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <SecTitle>Bloques de contenido</SecTitle>
        <button
          onClick={() => setShowPicker(p => !p)}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: showPicker ? GOLDF : D3, border: `1px solid ${showPicker ? "rgba(188,150,64,.4)" : BRD}`,
            borderRadius: 8, padding: "5px 10px", cursor: "pointer",
            fontSize: 11, fontWeight: 700, color: showPicker ? GOLD : TEXT,
          }}>
          <Plus size={12} /> Añadir
        </button>
      </div>

      {/* Block type picker — step 1: elegir tipo */}
      {showPicker && !pickerType && (
        <div style={{ background: D3, borderRadius: 12, padding: 10, marginBottom: 14, border: `1px solid ${BRD}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, marginBottom: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Elige el tipo de bloque
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5 }}>
            {BLOCK_TYPES_ORDERED.map(type => {
              const m = BLOCK_LABELS[type];
              return (
                <button key={type}
                  onClick={() => setPickerType(type)}
                  style={{
                    display: "flex", alignItems: "center", gap: 10,
                    background: "rgba(255,255,255,.03)", border: `1px solid ${BRD}`,
                    borderRadius: 9, padding: "8px 12px", cursor: "pointer", textAlign: "left", width: "100%",
                  }}
                  onMouseEnter={e => (e.currentTarget.style.background = GOLDF)}
                  onMouseLeave={e => (e.currentTarget.style.background = "rgba(255,255,255,.03)")}>
                  <span style={{ fontSize: 14, width: 22, textAlign: "center", color: GOLD }}>{m.icon}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: TEXT }}>{m.label}</div>
                    <div style={{ fontSize: 10, color: MUTED }}>{m.description}</div>
                  </div>
                  <ChevronRight size={12} color={MUTED} />
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Block variant picker — step 2: elegir diseño */}
      {showPicker && pickerType && (
        <div style={{ background: D3, borderRadius: 12, padding: 10, marginBottom: 14, border: `1px solid ${BRD}` }}>
          {/* Cabecera con botón volver */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
            <button
              onClick={() => setPickerType(null)}
              style={{ background: "none", border: "none", cursor: "pointer", color: MUTED, padding: 0, display: "flex", alignItems: "center", gap: 4, fontSize: 11 }}>
              ← Volver
            </button>
            <span style={{ fontSize: 10, color: MUTED }}>|</span>
            <span style={{ fontSize: 11, fontWeight: 700, color: TEXT }}>
              {BLOCK_LABELS[pickerType].icon} {BLOCK_LABELS[pickerType].label}
            </span>
          </div>

          <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, marginBottom: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>
            Elige un diseño
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
            {(BLOCK_VARIANTS[pickerType] ?? []).map(v => (
              <button
                key={v.id}
                onClick={() => {
                  setPickerVariant(v.id);
                  setInsertPos("end");
                }}
                style={{
                  display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 7,
                  background: pickerVariant === v.id ? GOLDF : "rgba(255,255,255,.03)",
                  border: `1px solid ${pickerVariant === v.id ? "rgba(188,150,64,.5)" : BRD}`,
                  borderRadius: 10, padding: "9px 9px 10px", cursor: "pointer", textAlign: "left",
                }}
                onMouseEnter={e => { if (pickerVariant !== v.id) { e.currentTarget.style.borderColor = GV; e.currentTarget.style.background = "rgba(188,150,64,.05)"; } }}
                onMouseLeave={e => { if (pickerVariant !== v.id) { e.currentTarget.style.borderColor = BRD; e.currentTarget.style.background = "rgba(255,255,255,.03)"; } }}>
                <VariantMiniPreview type={v.preview.type} variant={v.preview.variant} />
                <span style={{ fontSize: 11, fontWeight: 600, color: TEXT, lineHeight: 1.3 }}>{v.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* ── Paso 3: Elegir posición ── */}
      {showPicker && pickerType && pickerVariant && (
        <div style={{ background: D3, borderRadius: 12, padding: 12, marginBottom: 14, border: `1px solid ${BRD}` }}>
          <div style={{ fontSize: 10, fontWeight: 700, color: GOLD, marginBottom: 10, letterSpacing: ".08em", textTransform: "uppercase" }}>
            ¿Dónde insertar?
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 5, marginBottom: 12 }}>
            {[
              { val: 0,     label: "Al inicio — antes de todos" },
              ...blocks.map((b, i) => ({ val: i + 1, label: `Después de: ${BLOCK_LABELS[b.type]?.label ?? b.type} #${i + 1}` })),
              { val: "end" as const, label: "Al final — después de todos" },
            ].map(opt => (
              <button
                key={String(opt.val)}
                onClick={() => setInsertPos(opt.val)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: insertPos === opt.val ? GOLDF : "rgba(255,255,255,.03)",
                  border: `1px solid ${insertPos === opt.val ? "rgba(188,150,64,.5)" : BRD}`,
                  borderRadius: 8, padding: "7px 10px", cursor: "pointer", textAlign: "left", width: "100%",
                  color: insertPos === opt.val ? GOLD : MUTED, fontSize: 11, fontFamily: SANS, transition: "all .1s",
                }}
              >{opt.label}</button>
            ))}
          </div>
          <button
            onClick={() => {
              const pos = insertPos === "end" ? undefined : (insertPos as number);
              addBlock(zone, pickerType!, { variant: pickerVariant! }, pos);
              refresh();
              setShowPicker(false);
              setPickerType(null);
              setPickerVariant(null);
              setInsertPos("end");
            }}
            style={{
              width: "100%",
              background: GOLD, color: "#1D1D1F",
              border: "none", borderRadius: 9, padding: "10px 12px",
              fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: SANS,
              display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
            }}
          >
            <Plus size={13} /> Insertar bloque
          </button>
        </div>
      )}

      {/* Blocks list */}
      {blocks.length === 0 ? (
        <div style={{ textAlign: "center", padding: "28px 0", color: MUTED, fontSize: 12, lineHeight: 1.7 }}>
          <div style={{ fontSize: 28, marginBottom: 8, opacity: 0.3 }}>▣</div>
          No hay bloques en esta zona.<br />
          Pulsa <strong style={{ color: GOLD }}>Añadir</strong> para insertar uno.
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {blocks.map((b, i) => (
            <BlockItem key={b.id} zone={zone} block={b} idx={i} total={blocks.length} onRefresh={refresh} />
          ))}
        </div>
      )}

      <div style={{ marginTop: 16, padding: "12px", background: D3, borderRadius: 10, fontSize: 11, color: MUTED, lineHeight: 1.6 }}>
        <MousePointer size={11} style={{ display: "inline", marginRight: 5, verticalAlign: "middle" }} />
        Los bloques aparecen al final de cada página/semana. Puedes reordenarlos, duplicarlos o eliminarlos.
      </div>

      {/* Images from content system */}
      {PAGES.filter(p => p.path === location).flatMap(p => p.fields.filter(f => f.type === "image")).length > 0 && (
        <>
          <SecTitle style={{ marginTop: 16 }}>Imágenes de la página</SecTitle>
          {PAGES.filter(p => p.path === location).flatMap(p => p.fields.filter(f => f.type === "image")).map(f => (
            <FieldEditor key={f.key} field={f} value={draft[f.key] ?? f.default} onChange={v => onChange(f.key, v)} />
          ))}
        </>
      )}
    </div>
  );
}

/* ── PANEL: Acciones ──────────────────────────────────────── */
function PanelAcciones({
  isDirty, savedAt, publishedAt, onSave, onPublish, onReset, onRestoreAll,
}: {
  isDirty: boolean; savedAt: string | null; publishedAt: string | null;
  onSave: () => void; onPublish: () => void; onReset: () => void; onRestoreAll: () => void;
}) {
  function fmt(iso: string | null): string {
    if (!iso) return "Nunca";
    const d = new Date(iso);
    return d.toLocaleTimeString("es-ES", { hour: "2-digit", minute: "2-digit" }) +
      " · " + d.toLocaleDateString("es-ES", { day: "2-digit", month: "short" });
  }
  return (
    <div>
      <div style={{ background: D3, borderRadius: 12, padding: "14px", marginBottom: 14 }}>
        <div style={{ display: "flex", gap: 10, marginBottom: 8 }}>
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: MUTED, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>Guardado</div>
            <div style={{ fontSize: 11, color: TEXT }}>{fmt(savedAt)}</div>
          </div>
          <div style={{ width: 1, background: BRD }} />
          <div style={{ flex: 1, textAlign: "center" }}>
            <div style={{ fontSize: 10, color: MUTED, fontWeight: 700, letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 4 }}>Publicado</div>
            <div style={{ fontSize: 11, color: TEXT }}>{fmt(publishedAt)}</div>
          </div>
        </div>
        {isDirty && (
          <div style={{ background: "rgba(188,150,64,.1)", border: "1px solid rgba(188,150,64,.2)", borderRadius: 8, padding: "7px 10px", fontSize: 11, color: GOLD, display: "flex", gap: 7, alignItems: "center" }}>
            <AlertCircle size={12} /> Tienes cambios sin publicar
          </div>
        )}
      </div>
      <SecTitle>Publicar</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 6 }}>
        <P2Btn icon={<Save size={16} />}    label="Guardar borrador" sublabel="Guarda sin publicar" onClick={onSave} variant="gold" />
        <P2Btn icon={<Globe size={16} />}   label="Publicar en el sitio" sublabel="Los visitantes verán los cambios" onClick={onPublish} variant="green" />
      </div>
      <SecTitle>Restablecer</SecTitle>
      <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
        {isDirty && (
          <P2Btn icon={<RotateCcw size={16} />} label="Descartar borrador" sublabel="Descarta los cambios no publicados" onClick={onReset} variant="red" />
        )}
        <P2Btn icon={<RefreshCw size={16} />} label="Restaurar diseño original" sublabel="Borra TODO el contenido guardado — vuelve al código" onClick={onRestoreAll} variant="red" />
      </div>
      <SecTitle>Vista previa</SecTitle>
      <P2Btn icon={<Eye size={16} />} label="Vista de visitante" sublabel="Abre en nueva pestaña"
        onClick={() => window.open(window.location.href.replace(/#.*/, ""), "_blank")} />
    </div>
  );
}

/* ── PANEL: Admin ─────────────────────────────────────────── */
function PanelAdmin() {
  return (
    <div>
      <div style={{ background: D3, borderRadius: 12, padding: 16, marginBottom: 14, textAlign: "center" }}>
        <div style={{ fontSize: 28, marginBottom: 8 }}>🔧</div>
        <div style={{ fontSize: 13, fontWeight: 700, color: TEXT, marginBottom: 6 }}>Modo Admin AulaOS</div>
        <div style={{ fontSize: 11, color: MUTED, lineHeight: 1.6, marginBottom: 14 }}>
          Tienes acceso completo al editor.<br />
          Usa los paneles de la izquierda para editar contenido, diseño y bloques.
        </div>
        <button
          onClick={() => {
            localStorage.removeItem("lms_auth");
            window.location.reload();
          }}
          style={{ fontSize: 11, fontWeight: 700, padding: "8px 16px", borderRadius: 8, cursor: "pointer", background: REDF, color: RED, border: `1px solid rgba(240,128,128,.3)`, fontFamily: SANS }}
        >
          Salir del modo admin
        </button>
      </div>
      <SecTitle>Acceso rápido</SecTitle>
      <P2Btn icon={<ExternalLink size={16} />} label="Abrir demo" sublabel="Ver página de demo" onClick={() => window.open("/demo", "_blank")} variant="teal" />
    </div>
  );
}

/* ── Toast ────────────────────────────────────────────────── */
function Toast({ msg, offsetLeft }: { msg: string; offsetLeft: number }) {
  return (
    <div style={{
      position: "fixed", bottom: 24, left: offsetLeft + 16, zIndex: 99995,
      background: "#1D1D1F", color: "white",
      padding: "10px 18px", borderRadius: 12,
      fontSize: 13, fontWeight: 600,
      boxShadow: "0 4px 20px rgba(0,0,0,0.45)",
      border: `1px solid ${BRD}`,
      display: "flex", alignItems: "center", gap: 8,
      animation: "fadeUp .2s ease both",
      fontFamily: SANS,
    }}>
      <CheckCircle2 size={14} style={{ color: "#34c759" }} />
      {msg}
    </div>
  );
}

/* ── Inline edit popup ────────────────────────────────────── */
function InlineEditPopup({
  ie, offsetLeft, onSave, onClose, onValChange,
}: {
  ie: InlineEdit; offsetLeft: number;
  onSave: (key: string, val: string) => void;
  onClose: () => void;
  onValChange: (v: string) => void;
}) {
  const [val, setVal] = useState(ie.value);
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);

  useEffect(() => { inputRef.current?.focus(); }, []);

  function handleChange(v: string) {
    setVal(v);
    onValChange(v);
  }

  const rect = ie.rect;
  const popW = 300;
  const left = Math.max(offsetLeft + 8, Math.min(rect.left, window.innerWidth - popW - 12));
  const top  = rect.bottom + 10 > window.innerHeight - 180
    ? Math.max(60, rect.top - 200)
    : rect.bottom + 10;

  const inputStyle: React.CSSProperties = {
    width: "100%", background: D1, color: TEXT, border: `1px solid rgba(188,150,64,.4)`,
    borderRadius: 8, padding: "9px 11px", fontSize: 13, fontFamily: SANS,
    outline: "none", boxSizing: "border-box", lineHeight: 1.5,
    resize: "vertical" as const,
  };

  return (
    <div id="fi-inline-popup" style={{
      position: "fixed", left, top, zIndex: 99999,
      background: D2, border: `1px solid rgba(188,150,64,.25)`,
      borderRadius: 14, padding: 14, width: popW,
      boxShadow: "0 12px 40px rgba(0,0,0,.7)",
      fontFamily: SANS,
    }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
        <label style={{ fontSize: 10, fontWeight: 800, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase" }}>
          {ie.isImage ? "🖼 URL de imagen" : `✏️ ${ie.label}`}
        </label>
        <button onClick={onClose} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 16, lineHeight: 1, padding: 2 }}>×</button>
      </div>

      {ie.isImage && val && (
        <img src={val} alt="" style={{ width: "100%", height: 70, objectFit: "cover", borderRadius: 8, marginBottom: 8, border: `1px solid ${BRD}` }} />
      )}

      {ie.isTextarea ? (
        <textarea
          ref={inputRef as React.RefObject<HTMLTextAreaElement>}
          value={val} onChange={e => handleChange(e.target.value)}
          rows={4} style={inputStyle}
          onKeyDown={e => { if (e.key === "Escape") onClose(); }}
        />
      ) : (
        <input
          ref={inputRef as React.RefObject<HTMLInputElement>}
          type={ie.isImage ? "url" : "text"}
          value={val} onChange={e => handleChange(e.target.value)}
          style={{ ...inputStyle, resize: undefined }}
          onKeyDown={e => { if (e.key === "Enter") { onSave(ie.key, val); } else if (e.key === "Escape") onClose(); }}
          placeholder={ie.isImage ? "https://..." : ""}
        />
      )}

      <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
        <button
          onClick={() => { onSave(ie.key, val); }}
          style={{ background: GOLD, color: "#1D1D1F", border: "none", borderRadius: 8, padding: "9px 0", fontSize: 12, fontWeight: 700, cursor: "pointer", flex: 1 }}
        >
          Guardar
        </button>
        <button onClick={onClose}
          style={{ background: "rgba(255,255,255,.07)", color: MUTED, border: `1px solid ${BRD}`, borderRadius: 8, padding: "9px 14px", fontSize: 12, cursor: "pointer" }}>
          Cancelar
        </button>
      </div>
      <div style={{ marginTop: 8, fontSize: 10, color: MUTED, textAlign: "center" }}>
        {ie.isTextarea ? "" : "Enter para guardar · Esc para cancelar"}
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════════ */
export function EditorSidebar() {
  const auth = getAuth();
  const [location, setLocation] = useLocation();
  const [open, setOpen]               = useState(false);
  const [activePanel, setActivePanel] = useState<PanelId | null>(null);
  const [quickSectionId, setQuickSectionId] = useState<string | null>(null);
  const [quickBlockId, setQuickBlockId] = useState<string | null>(null);
  const [draft, setDraft]             = useState<Record<string, string>>(getDraft);
  const [savedAt, setSavedAt]         = useState<string | null>(getDraftSavedAt);
  const [publishedAt, setPublishedAt] = useState<string | null>(getPublishedAt);
  const [toast, setToast]             = useState<string | null>(null);
  const [inlineEdit, setInlineEdit]   = useState<InlineEdit | null>(null);
  const [currentPageTitle, setCurrentPageTitle] = useState<string | undefined>(undefined);

  const isAdmin = auth.isLoggedIn && auth.role === "admin";

  /* Stable portal element — must be at top level (Rules of Hooks) */
  const portalElRef = useRef<HTMLElement | null>(null);
  if (!portalElRef.current) {
    portalElRef.current = document.getElementById("fi-editor-portal")
      ?? (() => {
           const el = document.createElement("div");
           el.id = "fi-editor-portal";
           document.body.appendChild(el);
           return el;
         })();
  }

  /* ── Editor mode: push page body to the right of the sidebar ── */
  useEffect(() => {
    const sidebarW = open ? (activePanel !== null ? ICON_W + P2_W : ICON_W) : 0;
    document.documentElement.style.setProperty("--fi-editor-w", `${sidebarW}px`);
    if (sidebarW > 0) {
      document.body.classList.add("fi-editor-mode");
    } else {
      document.body.classList.remove("fi-editor-mode");
    }
    return () => {
      document.documentElement.style.setProperty("--fi-editor-w", "0px");
      document.body.classList.remove("fi-editor-mode");
    };
  }, [open, activePanel]);

  /* Listen for page title changes from Semanas.tsx */
  useEffect(() => {
    function onPageTitle(e: Event) {
      setCurrentPageTitle((e as CustomEvent).detail?.title);
    }
    window.addEventListener("fi:pagetitle", onPageTitle);
    return () => window.removeEventListener("fi:pagetitle", onPageTitle);
  }, []);

  /* Reset page title when location changes */
  const prevLocationRef = useRef(location);
  if (prevLocationRef.current !== location) {
    prevLocationRef.current = location;
    if (currentPageTitle !== undefined) setCurrentPageTitle(undefined);
  }

  /* Sync draft state */
  useEffect(() => {
    const onContent = () => setDraft(getDraft());
    const onReset   = () => setDraft({});
    const onPub     = () => { setDraft({}); setPublishedAt(getPublishedAt()); };
    window.addEventListener("fi:content",   onContent);
    window.addEventListener("fi:reset",     onReset);
    window.addEventListener("fi:published", onPub);
    return () => {
      window.removeEventListener("fi:content",   onContent);
      window.removeEventListener("fi:reset",     onReset);
      window.removeEventListener("fi:published", onPub);
    };
  }, []);

  /* Keep a stable ref to the latest inlineEdit value so the click handler
     never needs to be re-registered just because inlineEdit changed. */
  const inlineEditRef = useRef<InlineEdit | null>(null);
  useEffect(() => { inlineEditRef.current = inlineEdit; }, [inlineEdit]);

  /* Track the current typed value inside the popup so we can auto-save on dismiss */
  const currentInlineValueRef = useRef<string>("");

  /* Stable ref to latest callbacks — updated every render, so the one-time-registered
     click handler always calls fresh functions without stale closure state. */
  const cbRef = useRef({ handleFieldChange: (_k: string, _v: string) => {}, handleInlineSave: (_k: string, _v: string) => {} });
  /* Sync cbRef with freshest function references after every render */
  useLayoutEffect(() => {
    cbRef.current.handleFieldChange = handleFieldChange;
    cbRef.current.handleInlineSave  = handleInlineSave;
  });

  /* ── Global inline click-to-edit ── */
  useEffect(() => {
    if (!open || !isAdmin) {
      document.getElementById("fi-editor-css")?.remove();
      return;
    }

    let styleEl = document.getElementById("fi-editor-css") as HTMLStyleElement | null;
    if (!styleEl) {
      styleEl = document.createElement("style");
      styleEl.id = "fi-editor-css";
      document.head.appendChild(styleEl);
    }
    styleEl.textContent = `
      [data-fi-key]:not(#fi-editor-root *) {
        cursor: text !important;
        transition: outline 0.1s !important;
      }
      [data-fi-key]:not(#fi-editor-root *):hover {
        outline: 2px solid rgba(188,150,64,0.65) !important;
        outline-offset: 3px !important;
      }
      [data-fi-img]:not(#fi-editor-root *) {
        cursor: pointer !important;
        transition: outline 0.1s !important;
      }
      [data-fi-img]:not(#fi-editor-root *):hover {
        outline: 2px solid rgba(43,125,122,0.7) !important;
        outline-offset: 3px !important;
      }
      [data-fi-section]:not(#fi-editor-root *) {
        cursor: pointer !important;
        position: relative !important;
      }
      [data-fi-section]:not(#fi-editor-root *):hover {
        outline: 2px dashed rgba(188,150,64,0.45) !important;
        outline-offset: -2px !important;
      }
      [data-fi-section]:not(#fi-editor-root *):hover::before {
        content: "⚡ " attr(data-fi-label) " — Edición Rápida" !important;
        position: absolute !important;
        top: 0 !important;
        left: 0 !important;
        z-index: 9000 !important;
        background: rgba(188,150,64,0.93) !important;
        color: #1D1D1F !important;
        font-size: 10px !important;
        font-weight: 800 !important;
        padding: 5px 16px !important;
        letter-spacing: .07em !important;
        text-transform: uppercase !important;
        border-radius: 0 0 10px 0 !important;
        pointer-events: none !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        white-space: nowrap !important;
      }
      [data-fi-block]:not(#fi-editor-root *) {
        cursor: pointer !important;
        position: relative !important;
        transition: outline 0.1s !important;
      }
      [data-fi-block]:not(#fi-editor-root *):hover {
        outline: 2px solid rgba(43,125,122,0.6) !important;
        outline-offset: -2px !important;
      }
      [data-fi-block]:not(#fi-editor-root *):hover::after {
        content: "⬛ " attr(data-fi-label) !important;
        position: absolute !important;
        top: 0 !important;
        right: 0 !important;
        z-index: 8999 !important;
        background: rgba(43,125,122,0.93) !important;
        color: #fff !important;
        font-size: 9px !important;
        font-weight: 800 !important;
        padding: 4px 12px !important;
        letter-spacing: .07em !important;
        text-transform: uppercase !important;
        border-radius: 0 0 0 10px !important;
        pointer-events: none !important;
        font-family: 'Plus Jakarta Sans', sans-serif !important;
        white-space: nowrap !important;
      }
    `;

    function handleGlobalClick(e: MouseEvent) {
      const target = e.target as Element;

      /* Ignore clicks inside the editor sidebar */
      if (target.closest("#fi-editor-root") || target.closest("#fi-inline-popup")) return;

      /* Click on a text element with data-fi-key */
      const textEl = target.closest("[data-fi-key]") as HTMLElement | null;
      if (textEl) {
        e.preventDefault();
        e.stopPropagation();
        /* Auto-save any open popup before switching to a different element */
        if (inlineEditRef.current) {
          cbRef.current.handleFieldChange(inlineEditRef.current.key, currentInlineValueRef.current);
        }
        const key = textEl.getAttribute("data-fi-key")!;
        const field = ALL_FIELDS.find(f => f.key === key);
        const currentVal = getDraft()[key] ?? field?.default ?? textEl.textContent ?? "";
        currentInlineValueRef.current = currentVal;
        setInlineEdit({
          key,
          value: currentVal,
          label: field?.label ?? key,
          rect: textEl.getBoundingClientRect(),
          isTextarea: field?.type === "textarea",
          isImage: false,
        });
        return;
      }

      /* Click on an image with data-fi-img */
      const imgEl = target.closest("[data-fi-img]") as HTMLElement | null;
      if (imgEl) {
        e.preventDefault();
        e.stopPropagation();
        /* Auto-save any open popup before switching */
        if (inlineEditRef.current) {
          cbRef.current.handleFieldChange(inlineEditRef.current.key, currentInlineValueRef.current);
        }
        const key = imgEl.getAttribute("data-fi-img")!;
        const field = ALL_FIELDS.find(f => f.key === key);
        const imgSrc = (imgEl as HTMLImageElement).src ?? getDraft()[key] ?? field?.default ?? "";
        currentInlineValueRef.current = imgSrc;
        setInlineEdit({
          key,
          value: imgSrc,
          label: field?.label ?? "URL de imagen",
          rect: imgEl.getBoundingClientRect(),
          isTextarea: false,
          isImage: true,
        });
        return;
      }

      /* Click on a block (card/tarjeta) — handled before section */
      const blockEl = target.closest("[data-fi-block]") as HTMLElement | null;
      if (blockEl) {
        e.preventDefault();
        e.stopPropagation();
        if (inlineEditRef.current) {
          cbRef.current.handleFieldChange(inlineEditRef.current.key, currentInlineValueRef.current);
          setInlineEdit(null);
        }
        const bid = blockEl.getAttribute("data-fi-block")!;
        setQuickBlockId(bid);
        setActivePanel("bloque");
        return;
      }

      /* Click on a section (not on a text/image child) */
      const sectionEl = target.closest("[data-fi-section]") as HTMLElement | null;
      if (sectionEl) {
        e.preventDefault();
        e.stopPropagation();
        if (inlineEditRef.current) {
          cbRef.current.handleFieldChange(inlineEditRef.current.key, currentInlineValueRef.current);
          setInlineEdit(null);
        }
        const sid = sectionEl.getAttribute("data-fi-section")!;
        setQuickSectionId(sid);
        setActivePanel("seccion");
        return;
      }

      /* Click outside popup → auto-save and close */
      if (inlineEditRef.current) {
        cbRef.current.handleInlineSave(inlineEditRef.current.key, currentInlineValueRef.current);
      }
    }

    document.addEventListener("click", handleGlobalClick, true);
    return () => {
      document.removeEventListener("click", handleGlobalClick, true);
      document.getElementById("fi-editor-css")?.remove();
    };
  }, [open, isAdmin]); /* ← stable: only re-registers when editor opens/closes or auth changes */

  function showToast(msg: string) {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }

  function handleSave() {
    saveDraft();
    setSavedAt(new Date().toISOString());
    showToast("Borrador guardado ✓");
  }

  function handlePublish() {
    publishDraft();
    setPublishedAt(new Date().toISOString());
    setDraft({});
    showToast("¡Publicado en el sitio! ✓");
  }

  function handleReset() {
    if (!confirm("¿Descartar todos los cambios no publicados? Esta acción no se puede deshacer.")) return;
    resetDraft();
    setDraft({});
    showToast("Cambios descartados");
  }

  function handleRestoreAll() {
    if (!confirm("¿Restaurar el diseño original del código?\n\nEsto borrará TODOS los cambios: tanto los borradores como el contenido publicado localmente. La página volverá exactamente a como está en el código fuente.\n\nEsta acción no se puede deshacer.")) return;
    resetAll();
    setDraft({});
    setPublishedAt(null);
    showToast("Diseño restaurado al original del código ✓");
  }

  function handleFieldChange(key: string, value: string) {
    setDraftValue(key, value);
    setDraft(prev => ({ ...prev, [key]: value }));
  }

  function handleInlineSave(key: string, value: string) {
    handleFieldChange(key, value);
    setInlineEdit(null);
    showToast("Texto actualizado ✓");
  }

  function togglePanel(id: PanelId) {
    setActivePanel(prev => prev === id ? null : id);
  }

  /* Only show to admins; NOT on login page */
  if (!isAdmin) return null;

  const portalEl = portalElRef.current;

  const isDirty      = hasDraftChanges();
  const panel2Open   = activePanel !== null;
  const toastOffset  = ICON_W + (panel2Open ? P2_W : 0);

  /* ── CLOSED: floating button ── */
  if (!open) {
    return createPortal(
      <>
        <button
          onClick={() => setOpen(true)}
          style={{
            position: "fixed", bottom: 28, left: 24, zIndex: 99990,
            background: "#1D1D1F", color: "white",
            border: `2px solid ${isDirty ? GOLD : "rgba(255,255,255,0.18)"}`,
            padding: "10px 20px", borderRadius: 9999,
            fontSize: 12, fontWeight: 700, cursor: "pointer",
            fontFamily: SANS,
            display: "flex", alignItems: "center", gap: 8,
            boxShadow: "0 4px 24px rgba(0,0,0,0.55)",
            transition: "all 0.2s",
          }}
          onMouseEnter={e => { (e.currentTarget as HTMLElement).style.opacity = ".85"; }}
          onMouseLeave={e => { (e.currentTarget as HTMLElement).style.opacity = "1"; }}
        >
          <Pencil size={13} />
          Editor
          {isDirty && (
            <span style={{ background: GOLD, color: "#1D1D1F", borderRadius: 9999, fontSize: 9, fontWeight: 800, padding: "2px 7px", letterSpacing: ".06em" }}>
              CAMBIOS
            </span>
          )}
        </button>
        <style>{`@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}`}</style>
      </>,
      portalEl
    );
  }

  /* ── OPEN: sidebar ── */
  return createPortal(
    <>
      <div id="fi-editor-root">
        {/* ── Icon bar ─────────────────────────────────────── */}
        <div style={{
          position: "fixed", top: 0, left: 0, bottom: 0, zIndex: 99990,
          width: ICON_W, background: D1,
          display: "flex", flexDirection: "column", alignItems: "center",
          padding: "14px 0", gap: 6,
          boxShadow: "2px 0 20px rgba(0,0,0,0.6)",
          fontFamily: SANS,
        }}>
          <div style={{ fontSize: 8, fontWeight: 900, color: GOLD, textAlign: "center", marginBottom: 4, letterSpacing: ".1em", lineHeight: 1.3 }}>
            ED<br />OS
          </div>
          <div style={{ width: 30, height: 1, background: BRD, marginBottom: 2 }} />

          {PANEL_ICONS.map(({ id, icon, label }) => (
            <IconBtn key={id} active={activePanel === id} title={label} onClick={() => togglePanel(id)}>
              {icon}
            </IconBtn>
          ))}

          <div style={{ flex: 1 }} />

          {/* Inline edit mode indicator */}
          <div style={{ fontSize: 8, color: MUTED, textAlign: "center", padding: "0 4px", lineHeight: 1.4 }}>
            <MousePointer size={12} style={{ margin: "0 auto 2px", display: "block", color: GOLD, opacity: 0.7 }} />
            click<br/>to edit
          </div>

          <div style={{ width: 30, height: 1, background: BRD }} />

          {/* Restaurar diseño original — siempre visible */}
          <IconBtn
            title="Restaurar diseño original (borra TODO el contenido guardado)"
            onClick={handleRestoreAll}
            style={{ color: "rgba(255,120,80,0.9)", borderColor: "rgba(255,120,80,.22)", marginTop: 2, background: "rgba(255,100,60,0.07)" }}
          >
            <RefreshCw size={13} />
          </IconBtn>

          {isDirty && (
            <IconBtn
              title="Descartar cambios no publicados"
              onClick={() => { if (confirm("¿Descartar todos los cambios no publicados?")) handleReset(); }}
              style={{ color: "#e55", borderColor: "rgba(220,80,80,.25)", marginTop: 0, background: "rgba(220,50,50,0.07)" }}
            >
              <RotateCcw size={14} />
            </IconBtn>
          )}
          <IconBtn title="Guardar borrador" onClick={handleSave} style={{ color: GOLD, borderColor: "rgba(188,150,64,.3)", marginTop: isDirty ? 0 : 4 }}>
            <Save size={15} />
          </IconBtn>
          <div style={{ position: "relative" }}>
            <IconBtn title="Publicar en el sitio" onClick={handlePublish}
              style={{ color: isDirty ? "#22c55e" : MUTED, borderColor: isDirty ? "rgba(34,197,94,.35)" : BRD, marginTop: 0, background: isDirty ? "rgba(34,197,94,.1)" : "transparent" }}>
              <Globe size={15} />
            </IconBtn>
            {isDirty && (
              <span style={{ position: "absolute", top: -2, right: -2, width: 7, height: 7, background: "#22c55e", borderRadius: "50%", border: "1.5px solid #1D1D1F", pointerEvents: "none" }} />
            )}
          </div>
          <IconBtn title="Cerrar editor" onClick={() => { setOpen(false); setActivePanel(null); setInlineEdit(null); }}
            style={{ color: RED, borderColor: "rgba(240,128,128,.2)", marginTop: 4 }}>
            <X size={15} />
          </IconBtn>
        </div>

        {/* ── Secondary panel ───────────────────────────────── */}
        {panel2Open && activePanel && (
          <div style={{
            position: "fixed", top: 0, left: ICON_W, bottom: 0, zIndex: 99989,
            width: P2_W, background: D2,
            display: "flex", flexDirection: "column",
            boxShadow: "2px 0 24px rgba(0,0,0,0.5)",
            fontFamily: SANS,
            animation: "slideIn .18s ease both",
          }}>
            <div style={{
              padding: "16px 14px 12px", borderBottom: `1px solid ${BRD}`,
              display: "flex", alignItems: "center", justifyContent: "space-between",
              position: "sticky", top: 0, background: D2, zIndex: 2, flexShrink: 0,
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                {activePanel === "seccion" ? (
                  <>
                    <Layers size={16} style={{ color: GOLD, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
                      {quickSectionId && SECTION_PANELS[quickSectionId]
                        ? SECTION_PANELS[quickSectionId].label
                        : "Edición Rápida"}
                    </span>
                  </>
                ) : activePanel === "bloque" ? (
                  <>
                    <div style={{ width: 16, height: 16, borderRadius: 4, background: "#2B7D7A", flexShrink: 0 }} />
                    <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>
                      {quickBlockId ?? "Bloque"}
                    </span>
                  </>
                ) : (
                  <>
                    <span style={{ fontSize: 18 }}>{PANEL_ICONS.find(p => p.id === activePanel)?.icon}</span>
                    <span style={{ fontSize: 13, fontWeight: 700, color: "white" }}>{PANEL_ICONS.find(p => p.id === activePanel)?.label}</span>
                  </>
                )}
              </div>
              <button onClick={() => setActivePanel(null)} style={{ background: "none", border: "none", color: MUTED, cursor: "pointer", fontSize: 18, padding: "2px 6px", lineHeight: 1 }}>×</button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: "12px 14px" }}>
              {activePanel === "texto" && (
                <PanelTexto location={location} draft={draft} onChange={handleFieldChange} />
              )}
              {activePanel === "diseno" && (
                <PanelDiseno draft={draft} onChange={handleFieldChange} />
              )}
              {activePanel === "nav" && (
                <PanelNav location={location} onNavigate={(p) => { setLocation(p); setActivePanel(null); }} />
              )}
              {activePanel === "elementos" && (
                <PanelElementos location={location} draft={draft} onChange={handleFieldChange} currentPageTitle={currentPageTitle} />
              )}
              {activePanel === "acciones" && (
                <PanelAcciones isDirty={isDirty} savedAt={savedAt} publishedAt={publishedAt}
                  onSave={handleSave} onPublish={handlePublish} onReset={handleReset} onRestoreAll={handleRestoreAll} />
              )}
              {activePanel === "seccion" && quickSectionId && (
                <PanelQuickEdit
                  sectionId={quickSectionId}
                  draft={draft}
                  onChange={handleFieldChange}
                  onBack={() => setActivePanel("texto")}
                />
              )}
              {activePanel === "bloque" && quickBlockId && (
                <PanelBlockEdit
                  blockId={quickBlockId}
                  draft={draft}
                  onChange={handleFieldChange}
                  onBack={() => setActivePanel("texto")}
                />
              )}
            </div>
          </div>
        )}
      </div>

      {/* ── Inline edit popup ────────────────────────────── */}
      {inlineEdit && (
        <InlineEditPopup
          ie={inlineEdit}
          offsetLeft={ICON_W + (panel2Open ? P2_W : 0)}
          onSave={handleInlineSave}
          onClose={() => setInlineEdit(null)}
          onValChange={(v) => { currentInlineValueRef.current = v; }}
        />
      )}

      {/* ── Toast ─────────────────────────────────────────── */}
      {toast && <Toast msg={toast} offsetLeft={toastOffset} />}

      <style>{`
        @keyframes slideIn { from { opacity:0; transform:translateX(-8px); } to { opacity:1; transform:translateX(0); } }
        @keyframes fadeUp  { from { opacity:0; transform:translateY(6px);  } to { opacity:1; transform:translateY(0); } }
      `}</style>
    </>,
    portalEl
  );
}
