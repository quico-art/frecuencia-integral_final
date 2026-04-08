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
import { ALL_WEEK_DETAILS } from "@/lib/data";
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
    title: "Inicio — Academia",
    path: "/",
    fields: [
      { key: "academy.hero.label",    label: "Etiqueta del hero",          default: "Academia de desarrollo consciente" },
      { key: "academy.hero.title1",   label: "Titular — línea 1",          default: "La transformación no se aprende." },
      { key: "academy.hero.title2",   label: "Titular — línea 2 (cursiva)",default: "Se vive." },
      { key: "academy.hero.subtitle", label: "Texto descriptivo hero",     default: "Una escuela de vida donde la sabiduría milenaria y la presencia se integran en cada área de tu existencia.", type: "textarea" },
      { key: "academy.img.tct",       label: "Imagen — Método TCT",        default: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&fit=crop", type: "image" },
      { key: "academy.img.dep",       label: "Imagen — Deportista",        default: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&fit=crop", type: "image" },
      { key: "academy.cursos.label",  label: "Sección Cursos — etiqueta",  default: "Formaciones" },
      { key: "academy.cursos.title",  label: "Sección Cursos — título",    default: "Elige tu camino" },
      { key: "academy.cursos.sub",    label: "Sección Cursos — subtítulo", default: "Dos formaciones. Una misma filosofía. Cada una diseñada para un contexto específico de vida.", type: "textarea" },
      { key: "academy.tct.name",      label: "Tarjeta TCT — nombre",       default: "Método TCT" },
      { key: "academy.tct.tagline",   label: "Tarjeta TCT — tagline",      default: "Tu Camino de Transformación" },
      { key: "academy.tct.status",    label: "Tarjeta TCT — badge estado", default: "Disponible" },
      { key: "academy.tct.meta",      label: "Tarjeta TCT — meta (ej. duración)", default: "48 semanas" },
      { key: "academy.tct.desc",      label: "Tarjeta TCT — descripción",  default: "Un viaje de 48 semanas a través de 4 puertas progresivas. Del despertar a la integración.", type: "textarea" },
      { key: "academy.tct.cta",       label: "Tarjeta TCT — enlace",       default: "Ver el programa →" },
      { key: "academy.dep.name",      label: "Tarjeta Deportista — nombre", default: "El Deportista Consciente" },
      { key: "academy.dep.tagline",   label: "Tarjeta Deportista — tagline", default: "Más allá del resultado" },
      { key: "academy.dep.status",    label: "Tarjeta Deportista — badge estado", default: "Próximamente" },
      { key: "academy.dep.meta",      label: "Tarjeta Deportista — meta",  default: "Deporte élite" },
      { key: "academy.dep.desc",      label: "Tarjeta Deportista — descripción", default: "Presencia aplicada al deporte de élite. Para deportistas, padres e instituciones.", type: "textarea" },
      { key: "academy.dep.cta",       label: "Tarjeta Deportista — enlace", default: "Ver más →" },
      { key: "academy.why.title",     label: "Sección «Por qué» — título", default: "Por qué Frecuencia Integral" },
      { key: "academy.contact.title", label: "Sección Contacto — título",  default: "¿Tienes alguna pregunta?" },
      { key: "academy.contact.sub",   label: "Sección Contacto — subtítulo", default: "Escríbenos y te respondemos en menos de 24h.", type: "textarea" },
      { key: "academy.presencia.label",  label: "Presencia — etiqueta",          default: "La Presencia" },
      { key: "academy.presencia.title1", label: "Presencia — título línea 1",    default: "Estar aquí." },
      { key: "academy.presencia.title2", label: "Presencia — título línea 2",    default: "Completamente." },
      { key: "academy.presencia.body",   label: "Presencia — texto descriptivo", default: "La transformación no ocurre en el futuro. Ocurre en este momento, en este cuerpo, en esta respiración.", type: "textarea" },
      { key: "academy.presencia.cta",    label: "Presencia — texto del botón",   default: "Explorar los cursos →" },
      { key: "acad.principios.title",    label: "Principios — título sección",   default: "Los 4 Principios de la Frecuencia" },
      { key: "acad.principio.0.num",     label: "Principio I — numeral",         default: "I" },
      { key: "acad.principio.0.title",   label: "Principio I — título",          default: "Despertar" },
      { key: "acad.principio.0.desc",    label: "Principio I — descripción",     default: "Reconocer el estado automático en el que vivimos. El primer paso es ver lo que no veíamos.", type: "textarea" },
      { key: "acad.principio.1.num",     label: "Principio II — numeral",        default: "II" },
      { key: "acad.principio.1.title",   label: "Principio II — título",         default: "Comprensión" },
      { key: "acad.principio.1.desc",    label: "Principio II — descripción",    default: "Entender los mecanismos internos que nos dirigen. Teoría y práctica integradas semana a semana.", type: "textarea" },
      { key: "acad.principio.2.num",     label: "Principio III — numeral",       default: "III" },
      { key: "acad.principio.2.title",   label: "Principio III — título",        default: "Integración" },
      { key: "acad.principio.2.desc",    label: "Principio III — descripción",   default: "Aplicar lo aprendido en la vida real. Los ejercicios están diseñados para el día a día, no para el retiro.", type: "textarea" },
      { key: "acad.principio.3.num",     label: "Principio IV — numeral",        default: "IV" },
      { key: "acad.principio.3.title",   label: "Principio IV — título",         default: "Presencia" },
      { key: "acad.principio.3.desc",    label: "Principio IV — descripción",    default: "Vivir desde un estado de consciencia más elevado. No como logro, sino como modo natural de ser.", type: "textarea" },
      { key: "acad.test.label",          label: "Testimonios — etiqueta",        default: "Lo que dicen" },
      { key: "acad.test.title",          label: "Testimonios — título",          default: "Transformaciones reales" },
      { key: "acad.test.main.q",         label: "Testimonio destacado — cita",   default: "Frecuencia Integral cambió radicalmente mi forma de entender el deporte. Ya no se trata de «hacer», sino de «ser» mientras actúo.", type: "textarea" },
      { key: "acad.test.main.name",      label: "Testimonio destacado — nombre", default: "María G." },
      { key: "acad.test.main.role",      label: "Testimonio destacado — rol",    default: "Puerta Blanca completada" },
      { key: "acad.test.0.q",            label: "Testimonio 1 — cita",           default: "El Método TCT ha transformado mi forma de competir. Ya no busco resultados, busco presencia. Los resultados han llegado solos.", type: "textarea" },
      { key: "acad.test.0.name",         label: "Testimonio 1 — nombre",         default: "Álex M." },
      { key: "acad.test.0.role",         label: "Testimonio 1 — rol",            default: "Atleta de élite · Puerta Roja" },
      { key: "acad.test.1.q",            label: "Testimonio 2 — cita",           default: "Nunca pensé que una academia online pudiera crear una comunidad tan genuina. El acompañamiento ha sido determinante en mi proceso.", type: "textarea" },
      { key: "acad.test.1.name",         label: "Testimonio 2 — nombre",         default: "Carolina S." },
      { key: "acad.test.1.role",         label: "Testimonio 2 — rol",            default: "Emprendedora · Puerta Azul" },
      { key: "acad.test.2.q",            label: "Testimonio 3 — cita",           default: "La integración de las prácticas en mi vida diaria ha sido gradual pero profunda. Es el trabajo más honesto que he hecho conmigo mismo.", type: "textarea" },
      { key: "acad.test.2.name",         label: "Testimonio 3 — nombre",         default: "Pablo R." },
      { key: "acad.test.2.role",         label: "Testimonio 3 — rol",            default: "Directivo · Puerta Blanca" },
      // ── Galería ──
      { key: "acad.galeria.label",       label: "Galería — etiqueta sección",    default: "La Academia en imágenes" },
      { key: "acad.galeria.title1",      label: "Galería — título parte 1",      default: "Momentos del" },
      { key: "acad.galeria.title2",      label: "Galería — título cursiva",      default: "proceso" },
      { key: "acad.galeria.sub",         label: "Galería — subtítulo",           default: "Cuencos, meditación, frecuencias, los 12 caminos. Cada imagen, un pilar real del método.", type: "textarea" },
      { key: "acad.galeria.note",        label: "Galería — nota al pie",         default: "Las imágenes se actualizan con fotos propias de la Academia cuando estén disponibles" },
      { key: "acad.galeria.0.img",       label: "Foto 1 — imagen (Cuencos)",     default: "/galeria/cuencos-tibetanos.jpg", type: "image" },
      { key: "acad.galeria.0.title",     label: "Foto 1 — título",               default: "Cuencos Tibetanos" },
      { key: "acad.galeria.0.cat",       label: "Foto 1 — categoría badge",      default: "Sonido Sagrado" },
      { key: "acad.galeria.0.desc",      label: "Foto 1 — descripción lightbox", default: "Siete metales afinados. Jaume y Quico crean un campo sonoro que el cuerpo reconoce antes de que la mente lo comprenda.", type: "textarea" },
      { key: "acad.galeria.1.img",       label: "Foto 2 — imagen (Meditación)",  default: "/galeria/meditacion-guiada.jpg", type: "image" },
      { key: "acad.galeria.1.title",     label: "Foto 2 — título",               default: "Meditaciones Guiadas" },
      { key: "acad.galeria.1.cat",       label: "Foto 2 — categoría badge",      default: "Presencia" },
      { key: "acad.galeria.1.desc",      label: "Foto 2 — descripción lightbox", default: "Quico guía cada práctica. Jaume sostiene el espacio con música binaural. La meditación no como técnica, sino como estado natural recuperado.", type: "textarea" },
      { key: "acad.galeria.2.img",       label: "Foto 3 — imagen (Frecuencias)", default: "/galeria/frecuencias-binaurales.jpg", type: "image" },
      { key: "acad.galeria.2.title",     label: "Foto 3 — título",               default: "Frecuencias Binaurales" },
      { key: "acad.galeria.2.cat",       label: "Foto 3 — categoría badge",      default: "Vibración" },
      { key: "acad.galeria.2.desc",      label: "Foto 3 — descripción lightbox", default: "Frecuencias Solfeggio y beats binaurales diseñados para inducir estado Alpha-Theta. Ciencia aplicada a la transformación interior.", type: "textarea" },
      { key: "acad.galeria.3.img",       label: "Foto 4 — imagen (4 Puertas)",   default: "/galeria/las-4-puertas.jpg", type: "image" },
      { key: "acad.galeria.3.title",     label: "Foto 4 — título",               default: "Las 4 Puertas" },
      { key: "acad.galeria.3.cat",       label: "Foto 4 — categoría badge",      default: "El Viaje" },
      { key: "acad.galeria.3.desc",      label: "Foto 4 — descripción lightbox", default: "Blanca, Roja, Azul, Arcoíris. Cuatro etapas de 12 semanas cada una. Un mapa interior que lleva del despertar a la integración total.", type: "textarea" },
      { key: "acad.galeria.4.img",       label: "Foto 5 — imagen (Marga)",       default: "/galeria/canalizaciones.jpg", type: "image" },
      { key: "acad.galeria.4.title",     label: "Foto 5 — título",               default: "Canalizaciones con Marga" },
      { key: "acad.galeria.4.cat",       label: "Foto 5 — categoría badge",      default: "Transmisión" },
      { key: "acad.galeria.4.desc",      label: "Foto 5 — descripción lightbox", default: "Sesiones individuales con Marga. Un espacio de escucha donde lo que necesita ser visto, es visto.", type: "textarea" },
      { key: "acad.galeria.5.img",       label: "Foto 6 — imagen (12 Caminos)",  default: "/galeria/los-12-caminos.jpg", type: "image" },
      { key: "acad.galeria.5.title",     label: "Foto 6 — título",               default: "Los 12 Caminos" },
      { key: "acad.galeria.5.cat",       label: "Foto 6 — categoría badge",      default: "Sabiduría" },
      { key: "acad.galeria.5.desc",      label: "Foto 6 — descripción lightbox", default: "Dzogchen, El Cuarto Camino, UCDM, Cábala, Chamanismo, terapias alternativas varias… Doce tradiciones y enfoques que confluyen en cada Puerta.", type: "textarea" },
      ...cFields("academy.presencia", "Presencia — contenedor", "left", "680", "64", "80"),
      ...cFields("academy.hero",       "Hero — contenedor",        "center", "560"),
      ...cFields("academy.cursos",     "Cursos — contenedor",      "left",   "560", "0", "72"),
      ...cFields("academy.equipo",     "Equipo — contenedor",      "center", "800"),
      ...cFields("academy.principios", "Principios — contenedor",  "center", "1280", "0", "72"),
      ...cFields("academy.testimonios","Testimonios — contenedor", "center", "960", "0", "80"),
      ...cFields("academy.contact",    "Contacto — contenedor",    "left",   "600"),
    ],
  },
  {
    title: "Landing — Método",
    path: "/metodo",
    fields: [
      { key: "landing.hero.badge",       label: "Hero — badge",                    default: "Método TCT · Frecuencia Integral Academy" },
      { key: "landing.sec.camino",       label: "Sección Puertas — etiqueta",      default: "El Camino" },
      { key: "landing.sec.especial",     label: "Puerta Especial — etiqueta",      default: "Puerta Especial" },
      { key: "landing.sec.gratis",       label: "Acceso libre — etiqueta superior", default: "Sin compromiso · Gratis" },
      { key: "landing.sec.libre",        label: "Caja precio gratis — etiqueta",   default: "Acceso libre" },
      { key: "landing.sec.metodo",       label: "Sección Método — etiqueta",       default: "El Método" },
      { key: "landing.sec.fundamentos",  label: "Sección Pilares — etiqueta",      default: "Fundamentos" },
      { key: "landing.sec.viaje",        label: "Sección El Viaje — etiqueta",     default: "El Viaje" },
      { key: "landing.sec.formacion",    label: "Sección 12 Caminos — etiqueta",   default: "Formación" },
      { key: "landing.sec.equipo",         label: "Sección Equipo — etiqueta",                   default: "El Equipo" },
      { key: "landing.sec.integracion",  label: "Sección Mandala — etiqueta",                  default: "La Integración Total" },
      { key: "landing.sec.testimonios",  label: "Sección Testimonios — etiqueta",               default: "Transformaciones reales" },
      { key: "landing.hero.title",       label: "Hero — título parte 1",                        default: "Tu Camino de" },
      { key: "landing.hero.title.em",    label: "Hero — título cursiva (dorado)",               default: "Transformación" },
      { key: "landing.hero.desc",        label: "Hero — descripción",                           default: "48 semanas · 4 Puertas · 12 Caminos de sabiduría milenaria integrados en una metodología práctica para la vida contemporánea.", type: "textarea" },
      { key: "landing.puertas.h2",       label: "Puertas — título parte 1",                    default: "Las cuatro" },
      { key: "landing.puertas.h2em",     label: "Puertas — título cursiva",                    default: "puertas" },
      { key: "landing.puertas.desc",     label: "Puertas — descripción",                       default: "Cada puerta es un ciclo de 12 semanas. Se abre en tu momento. Solo los alumnos que han cruzado una puerta acceden a la siguiente.", type: "textarea" },
      { key: "landing.gate.0.title",     label: "Puerta Blanca — título",                      default: "Blanca" },
      { key: "landing.gate.0.sub",       label: "Puerta Blanca — sub",                         default: "Cimentación" },
      { key: "landing.gate.0.weeks",     label: "Puerta Blanca — semanas",                     default: "S. 1–12" },
      { key: "landing.gate.0.desc",      label: "Puerta Blanca — descripción",                 default: "El despertar de la presencia. Aprendes a observar sin identificarte. El primer contacto real contigo mismo.", type: "textarea" },
      { key: "landing.gate.0.price",     label: "Puerta Blanca — precio",                      default: "95" },
      { key: "landing.gate.0.billing",   label: "Puerta Blanca — facturación",                 default: "Acceso inmediato" },
      { key: "landing.gate.1.title",     label: "Puerta Roja — título",                        default: "Roja" },
      { key: "landing.gate.1.sub",       label: "Puerta Roja — sub",                           default: "Purificación" },
      { key: "landing.gate.1.weeks",     label: "Puerta Roja — semanas",                       default: "S. 13–24" },
      { key: "landing.gate.1.desc",      label: "Puerta Roja — descripción",                   default: "La alquimia emocional. Transformar el sufrimiento en comprensión. El fuego que purifica sin destruir.", type: "textarea" },
      { key: "landing.gate.1.price",     label: "Puerta Roja — precio",                        default: "95" },
      { key: "landing.gate.1.billing",   label: "Puerta Roja — facturación",                   default: "Requiere Puerta Blanca" },
      { key: "landing.gate.2.title",     label: "Puerta Azul — título",                        default: "Azul" },
      { key: "landing.gate.2.sub",       label: "Puerta Azul — sub",                           default: "Maestría" },
      { key: "landing.gate.2.weeks",     label: "Puerta Azul — semanas",                       default: "S. 25–36" },
      { key: "landing.gate.2.desc",      label: "Puerta Azul — descripción",                   default: "La mente como instrumento, no como amo. Silencio, claridad y la capacidad de ver sin filtros condicionados.", type: "textarea" },
      { key: "landing.gate.2.price",     label: "Puerta Azul — precio",                        default: "95" },
      { key: "landing.gate.2.billing",   label: "Puerta Azul — facturación",                   default: "Requiere Puerta Roja" },
      { key: "landing.gate.3.title",     label: "Puerta Arcoíris — título",                    default: "Arcoíris" },
      { key: "landing.gate.3.sub",       label: "Puerta Arcoíris — sub",                       default: "Integración" },
      { key: "landing.gate.3.weeks",     label: "Puerta Arcoíris — semanas",                   default: "S. 37–48" },
      { key: "landing.gate.3.desc",      label: "Puerta Arcoíris — descripción",               default: "La totalidad. Cuando presencia, emoción y mente se unifican. La vida cotidiana como práctica completa.", type: "textarea" },
      { key: "landing.gate.3.price",     label: "Puerta Arcoíris — precio",                    default: "95" },
      { key: "landing.gate.3.billing",   label: "Puerta Arcoíris — facturación",               default: "Requiere las 3 anteriores" },
      { key: "landing.oro.sub",          label: "Programa Oro — sub (mayúsc.)",                default: "Acceso completo · Las cuatro puertas · Todo el camino" },
      { key: "landing.oro.desc",         label: "Programa Oro — descripción",                  default: "Un solo pago que incluye las 48 semanas completas, todos los materiales y la joya que integra todo el proceso. El camino sin interrupciones.", type: "textarea" },
      { key: "landing.oro.price",        label: "Programa Oro — precio",                       default: "€890" },
      { key: "landing.oro.billing",      label: "Programa Oro — nota precio",                  default: "Pago único · Acceso total" },
      { key: "landing.oro.btn",          label: "Programa Oro — botón",                        default: "Acceso Completo →" },
      { key: "landing.libre.h2",         label: "Acceso libre — título parte 1",               default: "¿No estás seguro?" },
      { key: "landing.libre.h2em",       label: "Acceso libre — título cursiva",               default: "Empieza sin riesgo." },
      { key: "landing.libre.desc",       label: "Acceso libre — descripción",                  default: "Accede gratis a la primera semana del Método TCT. Sin tarjeta. Sin presión. Completa la semana y la siguiente se abrirá para ti automáticamente.", type: "textarea" },
      { key: "landing.libre.l0",         label: "Acceso libre — lección 1",                   default: "El Precio Oculto de Vivir Acelerados" },
      { key: "landing.libre.l1",         label: "Acceso libre — lección 2",                   default: "Cuando Ganar Ya No Es Suficiente" },
      { key: "landing.libre.l2",         label: "Acceso libre — lección 3",                   default: "Cuerpo, Mente y Consciencia: Una Sola Unidad" },
      { key: "landing.libre.price",      label: "Acceso libre — precio caja",                  default: "0€" },
      { key: "landing.libre.billing",    label: "Acceso libre — nota precio",                  default: "para siempre" },
      { key: "landing.libre.f0",         label: "Acceso libre — feature 1",                   default: "1 semana completa" },
      { key: "landing.libre.f1",         label: "Acceso libre — feature 2",                   default: "Ejercicios y materiales" },
      { key: "landing.libre.f2",         label: "Acceso libre — feature 3",                   default: "Arteterapia y Diario" },
      { key: "landing.libre.f3",         label: "Acceso libre — feature 4",                   default: "Sin tarjeta de crédito" },
      { key: "landing.libre.btn",        label: "Acceso libre — botón",                        default: "Crear cuenta gratis" },
      { key: "landing.libre.note",       label: "Acceso libre — nota inferior",                default: "Cuando quieras continuar, el curso completo te espera." },
      { key: "landing.quees.h2",         label: "¿Qué es? — título línea 1",                  default: "Un sistema de vida," },
      { key: "landing.quees.h2b",        label: "¿Qué es? — título línea 2",                  default: "no un curso más." },
      { key: "landing.quees.p1",         label: "¿Qué es? — párrafo 1",                       default: "TCT combina el sonido vibracional de los cuencos tibetanos con la sabiduría del Dzogchen, el Cuarto Camino de Gurdjieff y la Cábala Mística — integrados en una metodología práctica para la vida contemporánea.", type: "textarea" },
      { key: "landing.quees.p2",         label: "¿Qué es? — párrafo 2",                       default: "No es espiritualidad de retiro. Es presencia que funciona en el trabajo, las relaciones, el cuerpo y la mente.", type: "textarea" },
      { key: "landing.quees.c0.t",       label: "Característica I — título",                  default: "Progresivo" },
      { key: "landing.quees.c0.d",       label: "Característica I — descripción",             default: "Cuatro puertas de 12 semanas. Cada etapa construye sobre la anterior con intención y estructura.", type: "textarea" },
      { key: "landing.quees.c1.t",       label: "Característica II — título",                 default: "Integrado" },
      { key: "landing.quees.c1.d",       label: "Característica II — descripción",            default: "Tradiciones milenarias + herramientas contemporáneas. Cuerpo, mente, emoción y espíritu en un solo camino.", type: "textarea" },
      { key: "landing.quees.c2.t",       label: "Característica III — título",                default: "Aplicado" },
      { key: "landing.quees.c2.d",       label: "Característica III — descripción",           default: "Cada práctica está diseñada para transformar situaciones reales de tu vida cotidiana.", type: "textarea" },
      { key: "landing.quees.c3.t",       label: "Característica IV — título",                 default: "Individual" },
      { key: "landing.quees.c3.d",       label: "Característica IV — descripción",            default: "Tu ritmo, tu momento. El inicio es personal. La joya de cada puerta se recibe al completarla.", type: "textarea" },
      { key: "landing.pilares.h2",       label: "Pilares — título",                           default: "Los seis pilares del método" },
      { key: "landing.pilar.0.title",    label: "Pilar I — título",                           default: "Presencia" },
      { key: "landing.pilar.0.desc",     label: "Pilar I — descripción",                      default: "La capacidad de estar aquí, ahora, con plena conciencia. No como concepto sino como estado real y sostenible en cada momento de la vida.", type: "textarea" },
      { key: "landing.pilar.1.title",    label: "Pilar II — título",                          default: "Integración" },
      { key: "landing.pilar.1.desc",     label: "Pilar II — descripción",                     default: "Unir lo que la mente ha separado. Cuerpo, emoción, pensamiento y espíritu como un sistema coherente que actúa en armonía.", type: "textarea" },
      { key: "landing.pilar.2.title",    label: "Pilar III — título",                         default: "Transformación" },
      { key: "landing.pilar.2.desc",     label: "Pilar III — descripción",                    default: "El cambio real no viene de la fuerza de voluntad sino de la comprensión profunda. Cuando ves con claridad, la transformación ocurre sola.", type: "textarea" },
      { key: "landing.pilar.3.title",    label: "Pilar IV — título",                          default: "Vibración" },
      { key: "landing.pilar.3.desc",     label: "Pilar IV — descripción",                     default: "El sonido como puerta directa al sistema nervioso y a la conciencia. Los cuencos tibetanos como herramienta de reequilibrio profundo.", type: "textarea" },
      { key: "landing.pilar.4.title",    label: "Pilar V — título",                           default: "Tradición Viva" },
      { key: "landing.pilar.4.desc",     label: "Pilar V — descripción",                      default: "Dzogchen, Cuarto Camino, Cábala y UCDM. Sabiduría milenaria no como museo sino como herramienta viva y aplicable hoy.", type: "textarea" },
      { key: "landing.pilar.5.title",    label: "Pilar VI — título",                          default: "Cuerpo Consciente" },
      { key: "landing.pilar.5.desc",     label: "Pilar VI — descripción",                     default: "El cuerpo como maestro principal. La sabiduría corporal, el movimiento consciente y el atletismo como vías de conocimiento interior.", type: "textarea" },
      { key: "landing.viaje.h2",         label: "El Viaje — título",                          default: "48 semanas, cuatro etapas" },
      { key: "landing.viaje.desc",       label: "El Viaje — subtítulo",                       default: "Un camino progresivo desde el enraizamiento físico hasta la maestría espiritual." },
      { key: "landing.viaje.0.label",    label: "Etapa 1 — etiqueta",                         default: "Semanas 1–12" },
      { key: "landing.viaje.0.title",    label: "Etapa 1 — título",                           default: "Puerta Blanca — Enraizamiento" },
      { key: "landing.viaje.0.desc",     label: "Etapa 1 — descripción",                      default: "Cuerpo y presencia física a través del Cuarto Camino y El Deportista Consciente.", type: "textarea" },
      { key: "landing.viaje.1.label",    label: "Etapa 2 — etiqueta",                         default: "Semanas 13–24" },
      { key: "landing.viaje.1.title",    label: "Etapa 2 — título",                           default: "Puerta Roja — Purificación" },
      { key: "landing.viaje.1.desc",     label: "Etapa 2 — descripción",                      default: "Transformación emocional y purificación energética a través de UCDM y el Cuarto Camino emocional.", type: "textarea" },
      { key: "landing.viaje.2.label",    label: "Etapa 3 — etiqueta",                         default: "Semanas 25–36" },
      { key: "landing.viaje.2.title",    label: "Etapa 3 — título",                           default: "Puerta Azul — Maestría" },
      { key: "landing.viaje.2.desc",     label: "Etapa 3 — descripción",                      default: "Expansión mental y maestría espiritual a través del Dzogchen y El Ser Consciente.", type: "textarea" },
      { key: "landing.viaje.3.label",    label: "Etapa 4 — etiqueta",                         default: "Semanas 37–48" },
      { key: "landing.viaje.3.title",    label: "Etapa 4 — título",                           default: "Puerta Arcoíris — Integración" },
      { key: "landing.viaje.3.desc",     label: "Etapa 4 — descripción",                      default: "Síntesis de las tres puertas. Vivir desde la coherencia, el propósito y la conexión.", type: "textarea" },
      { key: "landing.caminos.h2",       label: "12 Caminos — título parte 1",                default: "12 caminos," },
      { key: "landing.caminos.h2b",      label: "12 Caminos — título parte 2",                default: "una sola transformación" },
      { key: "landing.caminos.desc",     label: "12 Caminos — descripción",                   default: "Tradiciones milenarias e instrumentos vibracionales que convergen en un único sistema de vida.", type: "textarea" },
      { key: "landing.equipo.h2",        label: "Equipo TCT — título parte 1",                default: "Las personas detrás del" },
      { key: "landing.equipo.h2em",      label: "Equipo TCT — título cursiva",                default: "Método TCT" },
      { key: "landing.em0.name",         label: "Quico Tent — nombre",                        default: "Quico Tent" },
      { key: "landing.em0.role",         label: "Quico Tent — rol",                           default: "Maestro Artesano · Terapeuta Vibracional · Co-fundador" },
      { key: "landing.em0.quote",        label: "Quico Tent — cita",                          default: "A través del vehículo del sonido y la vibración tomamos consciencia de nuestra realidad y experimentamos la sabiduría esencial que habita en cada uno de nosotros.", type: "textarea" },
      { key: "landing.em0.bio",          label: "Quico Tent — bio",                           default: "El mundo del Arte, el Diseño, la Joyería y la Espiritualidad se fusionan en Quico en un espacio humanista único.", type: "textarea" },
      { key: "landing.em1.name",         label: "Marga Barceló — nombre",                     default: "Marga Barceló" },
      { key: "landing.em1.role",         label: "Marga Barceló — rol",                        default: "Co-fundadora · Frecuencia Integral" },
      { key: "landing.em1.quote",        label: "Marga Barceló — cita",                       default: "Su historia y visión se presentarán muy pronto." },
      { key: "landing.em1.bio",          label: "Marga Barceló — bio",                        default: "Marga forma parte esencial del alma de Frecuencia Integral Academy desde sus inicios.", type: "textarea" },
      { key: "landing.em2.name",         label: "Jaume Sonomusic — nombre",                   default: "Jaume Sonomusic" },
      { key: "landing.em2.role",         label: "Jaume Sonomusic — rol",                      default: "Músico & Terapeuta Sonoro · Frecuencia Integral" },
      { key: "landing.em2.quote",        label: "Jaume Sonomusic — cita",                     default: "Su historia y visión se presentarán muy pronto." },
      { key: "landing.em2.bio",          label: "Jaume Sonomusic — bio",                      default: "Jaume forma parte esencial del alma de Frecuencia Integral Academy desde sus inicios.", type: "textarea" },
      { key: "landing.integ.h2",         label: "Integración — título parte 1",               default: "12 Herramientas ·" },
      { key: "landing.integ.h2em",       label: "Integración — título cursiva",               default: "Un Solo Ser" },
      { key: "landing.integ.desc",       label: "Integración — descripción",                  default: "Cada tradición ilumina el mismo centro. No hay jerarquía — hay convergencia. Todas las sendas apuntan al mismo punto: tú.", type: "textarea" },
      { key: "landing.test.h2",          label: "Testimonios — título",                       default: "Lo que dicen los alumnos" },
      { key: "landing.test.feat.q",      label: "Testimonio destacado — cita",                default: "El Método TCT me devolvió a mí mismo. No es solo un curso — es un sistema de vida que funciona en el trabajo, en el deporte y en las relaciones.", type: "textarea" },
      { key: "landing.test.feat.name",   label: "Testimonio destacado — nombre",              default: "Jordi M." },
      { key: "landing.test.feat.role",   label: "Testimonio destacado — rol",                 default: "Puerta Blanca completada · Deportista profesional" },
      { key: "landing.test.t0.q",        label: "Testimonio 1 — cita",                        default: "Las 48 semanas son una promesa que cumple. Cada semana construye sobre la anterior.", type: "textarea" },
      { key: "landing.test.t0.n",        label: "Testimonio 1 — nombre",                      default: "Álex R." },
      { key: "landing.test.t0.r",        label: "Testimonio 1 — rol",                         default: "Puerta Roja completada" },
      { key: "landing.test.t1.q",        label: "Testimonio 2 — cita",                        default: "Los cuencos junto a la práctica del Cuarto Camino han transformado mi relación conmigo misma.", type: "textarea" },
      { key: "landing.test.t1.n",        label: "Testimonio 2 — nombre",                      default: "Marta L." },
      { key: "landing.test.t1.r",        label: "Testimonio 2 — rol",                         default: "Puerta Blanca completada" },
      { key: "landing.test.t2.q",        label: "Testimonio 3 — cita",                        default: "Lo que distingue al Método TCT es que no habla de transformación — la produce.", type: "textarea" },
      { key: "landing.test.t2.n",        label: "Testimonio 3 — nombre",                      default: "Carlos V." },
      { key: "landing.test.t2.r",        label: "Testimonio 3 — rol",                         default: "Puerta Azul en curso" },
      { key: "landing.cta.h2",           label: "CTA Final — título parte 1",                 default: "El camino comienza" },
      { key: "landing.cta.h2b",          label: "CTA Final — título parte 2",                 default: "cuando tú decides" },
      { key: "landing.cta.desc",         label: "CTA Final — descripción",                    default: "Empieza con la primera semana gratuita o accede directamente a la Puerta Blanca.", type: "textarea" },
      { key: "landing.cta.btn1",         label: "CTA Final — botón principal",                default: "Empezar gratis →" },
      { key: "landing.cta.btn2",         label: "CTA Final — botón secundario",               default: "Ver las puertas" },
      ...cFields("landing.hero",        "Hero — contenedor",          "left",   "560"),
      ...cFields("landing.puertas",     "Puertas — contenedor",       "left",   "560", "0", "56"),
      ...cFields("landing.libre",       "Acceso libre — contenedor",  "left",   "560", "0", "56"),
      ...cFields("landing.que",         "¿Qué es? — contenedor",      "center", "700", "0", "80"),
      ...cFields("landing.pilares",     "Pilares — contenedor",       "center", "700", "0", "80"),
      ...cFields("landing.viaje",       "El Viaje — contenedor",      "center", "700", "0", "80"),
      ...cFields("landing.caminos",     "12 Caminos — contenedor",    "center", "700", "0", "80"),
      ...cFields("landing.equipo",      "Equipo — contenedor",        "center", "700", "0", "80"),
      ...cFields("landing.testimonios", "Testimonios — contenedor",   "center", "700", "0", "80"),
      ...cFields("landing.cta",         "CTA final — contenedor",     "center", "900"),
    ],
  },
  {
    title: "Método TCT",
    path: "/metodo-tct",
    fields: [
      { key: "tct.hero.badge",    label: "Badge",     default: "Método TCT" },
      { key: "tct.hero.title",    label: "Título",    default: "Técnica de Consciencia Total" },
      { key: "tct.hero.subtitle", label: "Subtítulo", default: "El método que integra cuerpo, mente y energía.", type: "textarea" },
      { key: "tct.hero.cta",      label: "CTA",       default: "Descubrir el Método" },
      { key: "tct.que.title",     label: "¿Qué es? — título", default: "Un camino de integración" },
      { key: "tct.que.body",      label: "¿Qué es? — cuerpo", default: "El Método TCT es un sistema estructurado en 48 semanas.", type: "textarea" },
      { key: "tct.pilares.title", label: "Pilares — título",  default: "Los tres pilares" },
      ...cFields("tct.hero",     "Hero — contenedor",     "center", "720"),
      ...cFields("tct.puertas",  "Puertas — contenedor",  "left",   "560", "0", "56"),
      ...cFields("tct.que",      "¿Qué es? — contenedor", "left",   "540"),
      ...cFields("tct.pilares",  "Pilares — contenedor",  "center", "700", "0", "80"),
      ...cFields("tct.viaje",    "El Viaje — contenedor", "center", "700", "0", "80"),
      ...cFields("tct.caminos",  "Caminos — contenedor",  "center", "700", "0", "80"),
    ],
  },
  {
    title: "Metodo TCT — Puertas",
    path: "/metodo",
    fields: [
      { key: "met.hero.badge",      label: "Hero — badge",              default: "Presencia Aplicada a la Vida Real" },
      { key: "met.hero.title",      label: "Hero — título (parte 1)",   default: "La Frecuencia que" },
      { key: "met.hero.title2",     label: "Hero — título (en dorado)", default: "Transforma" },
      { key: "met.hero.title3",     label: "Hero — título (parte 3)",   default: "tu Realidad" },
      { key: "met.hero.desc",       label: "Hero — descripción",        default: "El Método TCT es un camino progresivo de cuatro puertas que integra algunas de las tradiciones más profundas de la consciencia con las herramientas de la vida cotidiana. No es teoría. Es presencia real.", type: "textarea" },
      { key: "met.hero.cta1",       label: "Hero — CTA principal",      default: "Explorar las Puertas" },
      { key: "met.hero.cta2",       label: "Hero — CTA secundario",     default: "Conocer el método" },
      { key: "met.puertas.label",   label: "Puertas — etiqueta",        default: "Las Cuatro Puertas" },
      { key: "met.puertas.title",   label: "Puertas — título",          default: "Un camino progresivo" },
      { key: "met.gate.0.subtitle", label: "Puerta Blanca — subtítulo", default: "Cimentación" },
      { key: "met.gate.0.desc",     label: "Puerta Blanca — descripción", default: "El despertar de la presencia. Aprendes a observar sin identificarte. El primer contacto real contigo mismo.", type: "textarea" },
      { key: "met.gate.0.weeks",    label: "Puerta Blanca — duración",  default: "12 semanas" },
      { key: "met.gate.0.price",    label: "Puerta Blanca — precio",    default: "€95/mes" },
      { key: "met.gate.0.t0",       label: "Puerta Blanca — tema 1",    default: "El precio oculto de vivir acelerados" },
      { key: "met.gate.0.t1",       label: "Puerta Blanca — tema 2",    default: "Cuerpo, mente y consciencia" },
      { key: "met.gate.0.t2",       label: "Puerta Blanca — tema 3",    default: "El entrenamiento como vía de despertar" },
      { key: "met.gate.0.t3",       label: "Puerta Blanca — tema 4",    default: "Sonido, vibración y armonización" },
      { key: "met.gate.1.subtitle", label: "Puerta Roja — subtítulo",   default: "Purificación" },
      { key: "met.gate.1.desc",     label: "Puerta Roja — descripción", default: "La alquimia emocional. Transformar el sufrimiento en comprensión. El fuego que purifica sin destruir.", type: "textarea" },
      { key: "met.gate.1.weeks",    label: "Puerta Roja — duración",    default: "12 semanas" },
      { key: "met.gate.1.price",    label: "Puerta Roja — precio",      default: "€95/mes" },
      { key: "met.gate.1.t0",       label: "Puerta Roja — tema 1",      default: "Los 6 Reinos del Samsara" },
      { key: "met.gate.1.t1",       label: "Puerta Roja — tema 2",      default: "El Cuarto Camino" },
      { key: "met.gate.1.t2",       label: "Puerta Roja — tema 3",      default: "UCDM — Gestión emocional" },
      { key: "met.gate.1.t3",       label: "Puerta Roja — tema 4",      default: "Alquimia de la energía" },
      { key: "met.gate.2.subtitle", label: "Puerta Azul — subtítulo",   default: "Claridad" },
      { key: "met.gate.2.desc",     label: "Puerta Azul — descripción", default: "La mente como espejo. Entender su naturaleza para dejar de ser su esclavo. Libertad interior real.", type: "textarea" },
      { key: "met.gate.2.weeks",    label: "Puerta Azul — duración",    default: "12 semanas" },
      { key: "met.gate.2.price",    label: "Puerta Azul — precio",      default: "€95/mes" },
      { key: "met.gate.2.t0",       label: "Puerta Azul — tema 1",      default: "Dzogchen — La mente natural" },
      { key: "met.gate.2.t1",       label: "Puerta Azul — tema 2",      default: "La metáfora del espejo" },
      { key: "met.gate.2.t2",       label: "Puerta Azul — tema 3",      default: "Protocolos de sonido" },
      { key: "met.gate.2.t3",       label: "Puerta Azul — tema 4",      default: "La noche oscura del alma" },
      { key: "met.gate.3.subtitle", label: "Puerta Arcoíris — subtítulo", default: "Integración" },
      { key: "met.gate.3.desc",     label: "Puerta Arcoíris — descripción", default: "Cuando lo aprendido se convierte en modo de vida. La síntesis que abre un nuevo ciclo.", type: "textarea" },
      { key: "met.gate.3.weeks",    label: "Puerta Arcoíris — duración", default: "12 semanas" },
      { key: "met.gate.3.price",    label: "Puerta Arcoíris — precio",  default: "€95/mes" },
      { key: "met.gate.3.t0",       label: "Puerta Arcoíris — tema 1",  default: "Síntesis del Método TCT" },
      { key: "met.gate.3.t1",       label: "Puerta Arcoíris — tema 2",  default: "El campo invisible" },
      { key: "met.gate.3.t2",       label: "Puerta Arcoíris — tema 3",  default: "Maestría en la vida cotidiana" },
      { key: "met.gate.3.t3",       label: "Puerta Arcoíris — tema 4",  default: "Cierre y continuación del camino" },
      { key: "met.oro.name",        label: "Programa Oro — nombre",     default: "Programa Oro — 4 Puertas Completas" },
      { key: "met.oro.price",       label: "Programa Oro — precio",     default: "€890" },
      { key: "met.oro.desc",        label: "Programa Oro — descripción", default: "Acceso simultáneo a todas las puertas. El camino completo de 48 semanas.", type: "textarea" },
    ],
  },
  {
    title: "El Deportista",
    path: "/deportista",
    fields: [
      { key: "dep.hero.badge",      label: "Hero — badge",                    default: "🏅 Curso próximamente disponible" },
      { key: "dep.hero.title1",     label: "Hero — título línea 1",           default: "El Deportista" },
      { key: "dep.hero.title2",     label: "Hero — título línea 2 (azul)",    default: "Consciente" },
      { key: "dep.hero.sub",        label: "Hero — subtítulo itálico",        default: "Más allá del resultado" },
      { key: "dep.hero.desc",       label: "Hero — descripción",              default: "Presencia aplicada al deporte de élite. Un programa diseñado para trascender la presión del rendimiento y encontrar la maestría personal en el terreno de juego y en la vida.", type: "textarea" },
      { key: "dep.hero.cta",        label: "Hero — texto del botón",          default: "Unirme a la lista de espera →" },
      { key: "dep.hero.quote",      label: "Hero — cita (imagen)",            default: "\"La verdadera victoria\\nes el dominio de uno mismo.\"", type: "textarea" },
      { key: "dep.hero.chip.name",  label: "Hero — chip nombre",              default: "Nil Tent" },
      { key: "dep.hero.chip.role",  label: "Hero — chip rol",                 default: "LNFS · Selección Española" },
      { key: "dep.paraquien.label", label: "Para quién — etiqueta",           default: "El programa es para" },
      { key: "dep.paraquien.title", label: "Para quién — título",             default: "¿Para quién es?" },
      { key: "dep.card.0.title",    label: "Tarjeta 1 — título",              default: "Deportistas de élite" },
      { key: "dep.card.0.desc",     label: "Tarjeta 1 — descripción",         default: "Que buscan optimizar su rendimiento sin sacrificar su salud mental ni su equilibrio personal bajo la presión constante.", type: "textarea" },
      { key: "dep.card.1.title",    label: "Tarjeta 2 — título",              default: "Padres e hijos deportistas" },
      { key: "dep.card.1.desc",     label: "Tarjeta 2 — descripción",         default: "Acompañamiento consciente para familias que navegan el exigente camino del deporte formativo y profesional.", type: "textarea" },
      { key: "dep.card.2.title",    label: "Tarjeta 3 — título",              default: "Clubes e instituciones" },
      { key: "dep.card.2.desc",     label: "Tarjeta 3 — descripción",         default: "Organizaciones que desean implementar una cultura de consciencia, valores y rendimiento humano integral.", type: "textarea" },
      { key: "dep.met.title",       label: "Metodología — título",            default: "El programa:" },
      { key: "dep.met.title2",      label: "Metodología — subtítulo itálico", default: "Más allá del resultado" },
      { key: "dep.met.0.title",     label: "Módulo 1 — título",               default: "Identidad más allá del rol" },
      { key: "dep.met.0.desc",      label: "Módulo 1 — descripción",          default: "Desvincular el valor personal del éxito o fracaso deportivo para ganar libertad mental.", type: "textarea" },
      { key: "dep.met.1.title",     label: "Módulo 2 — título",               default: "Presencia bajo presión" },
      { key: "dep.met.1.desc",      label: "Módulo 2 — descripción",          default: "Herramientas prácticas para mantener el foco y la calma en los momentos decisivos de la competición.", type: "textarea" },
      { key: "dep.met.2.title",     label: "Módulo 3 — título",               default: "El fracaso como maestro" },
      { key: "dep.met.2.desc",      label: "Módulo 3 — descripción",          default: "Integrar la derrota como un pilar fundamental del crecimiento y la evolución técnica.", type: "textarea" },
      { key: "dep.met.3.title",     label: "Módulo 4 — título",               default: "Integración familia-deporte" },
      { key: "dep.met.3.desc",      label: "Módulo 4 — descripción",          default: "Sinergia entre el entorno personal y la carrera profesional para un soporte sólido.", type: "textarea" },
      { key: "dep.met.quote",       label: "Metodología — cita",              default: "\"El verdadero rendimiento nace cuando el deportista deja de necesitar ganar para sentirse válido.\"", type: "textarea" },
      { key: "dep.retos.title",          label: "Retos — título",                      default: "Los retos del deportista de élite" },
      { key: "dep.metodo.title",         label: "Método — título",                     default: "Cómo trabaja el TCT contigo" },
      { key: "dep.equipo.label",         label: "Equipo — etiqueta",                   default: "El Equipo" },
      { key: "dep.equipo.h2",            label: "Equipo — título (parte 1)",           default: "Las personas detrás del" },
      { key: "dep.equipo.h2em",          label: "Equipo — título (cursiva/azul)",      default: "Deportista Consciente" },
      { key: "dep.equipo.m0.name",       label: "Nil Tent — nombre",                  default: "Nil Tent" },
      { key: "dep.equipo.m0.role",       label: "Nil Tent — rol",                     default: "Futbolista de Élite · Selección Española · Deportista Consciente" },
      { key: "dep.equipo.m0.quote",      label: "Nil Tent — cita",                    default: "La alta competición me enseñó que el rendimiento real nace cuando dejas de necesitar ganar para sentirte válido.", type: "textarea" },
      { key: "dep.equipo.m0.bio",        label: "Nil Tent — bio",                     default: "Pívot de fútbol sala profesional con apenas 20 años, Nil Tent es la voz más joven y más directa de lo que significa competir desde la consciencia.", type: "textarea" },
      { key: "dep.equipo.m0.l0",         label: "Nil Tent — logro 1",                 default: "Mejor Jugador Sub-16 · Minicopa de España Valencia 2019" },
      { key: "dep.equipo.m0.l1",         label: "Nil Tent — logro 2",                 default: "Campeón de España Selecciones Autonómicas Sub-16 · Las Rozas 2020" },
      { key: "dep.equipo.m0.l2",         label: "Nil Tent — logro 3",                 default: "Campeón de la UEFA Futsal Champions League y de la Copa Intercontinental" },
      { key: "dep.equipo.m0.l3",         label: "Nil Tent — logro 4",                 default: "4º jugador en la historia del Palma Futsal en ascender directamente desde la cantera" },
      { key: "dep.equipo.m1.name",       label: "Quico Tent — nombre",                default: "Quico Tent" },
      { key: "dep.equipo.m1.role",       label: "Quico Tent — rol",                   default: "Coach Consciente · Mentor del Deportista" },
      { key: "dep.equipo.m1.quote",      label: "Quico Tent — cita",                  default: "El verdadero rendimiento no se entrena en la pista. Se construye en la relación que tienes contigo mismo cuando nadie está mirando.", type: "textarea" },
      { key: "dep.equipo.m1.bio",        label: "Quico Tent — bio",                   default: "En el contexto del Deportista Consciente, Quico aporta la dimensión interior del rendimiento.", type: "textarea" },
      { key: "dep.lista.title",          label: "Lista espera — título",              default: "Sé el primero en saberlo" },
      { key: "dep.lista.desc",           label: "Lista espera — descripción",         default: "El programa está en desarrollo activo. Únete a nuestra comunidad exclusiva para recibir actualizaciones sobre el lanzamiento.", type: "textarea" },
      { key: "dep.lista.btn",            label: "Lista espera — botón",               default: "Suscribirme" },
      { key: "dep.lista.success",        label: "Lista espera — confirmación",        default: "✦ ¡Suscripción confirmada! Te avisaremos en el lanzamiento." },
      { key: "dep.lista.privacy",        label: "Lista espera — nota de privacidad",  default: "Respetamos tu privacidad. Sin spam, solo consciencia." },
      ...cFields("dep.hero",        "Hero — contenedor",          "left",   "560"),
      ...cFields("dep.paraquien",   "Para quién — contenedor",    "left",   "1160", "0", "56"),
      ...cFields("dep.metodologia", "Metodología — contenedor",   "left",   "1280", "0", "56"),
      ...cFields("dep.practica",    "Práctica — contenedor",      "left",   "1100", "0", "56"),
      ...cFields("dep.lista",       "Lista espera — contenedor",  "center", "720"),
    ],
  },
  {
    title: "Área — Menú lateral",
    path: "/area",
    fields: [
      { key: "area.nav.areaTitle",   label: "Título del área (header)",  default: "Área de Alumnos" },
      { key: "area.nav.inicio",      label: "Menú — Inicio",             default: "Inicio" },
      { key: "area.nav.formaciones", label: "Menú — Formaciones",        default: "Formaciones" },
      { key: "area.nav.arteterapia", label: "Menú — Arteterapia",        default: "Arteterapia" },
      { key: "area.nav.multimedia",  label: "Menú — Multimedia",         default: "Multimedia" },
      { key: "area.nav.materiales",  label: "Menú — Materiales",         default: "Materiales" },
      { key: "area.nav.diario",      label: "Menú — Diario",             default: "Diario" },
      { key: "area.nav.comunidad",   label: "Menú — Comunidad",          default: "Comunidad" },
      { key: "area.nav.progreso",    label: "Menú — Progreso",           default: "Progreso" },
    ],
  },
  {
    title: "Área — Bienvenida",
    path: "/area",
    fields: [
      { key: "area.dashboard.label",   label: "Etiqueta superior",            default: "Método TCT · 48 semanas" },
      { key: "area.dashboard.welcome", label: "Subtítulo de bienvenida",       default: "Tu camino de transformación integral continúa" },
      { key: "area.dashboard.quote",   label: "Cita motivacional",             default: "El camino del TCT no es una carrera. Es un despertar.", type: "textarea" },
      { key: "area.dashboard.quoteBy", label: "Autor de la cita",              default: "Frecuencia Integral Academy" },
      { key: "area.dashboard.cta1",    label: "Acceso rápido — botón 1",       default: "Ver Formaciones" },
      { key: "area.dashboard.cta2",    label: "Acceso rápido — botón 2",       default: "Multimedia" },
      { key: "area.dashboard.cta3",    label: "Acceso rápido — botón 3",       default: "Mi Diario" },
    ],
  },
  {
    title: "Área — Formaciones",
    path: "/area",
    fields: [
      { key: "area.semanas.label",       label: "Etiqueta superior",         default: "Tu programa completo" },
      { key: "area.semanas.title",       label: "Título sección",            default: "Las 48 Semanas" },
      { key: "area.semanas.sub",         label: "Subtítulo sección",         default: "Cuatro Puertas · Un camino de transformación integral", type: "textarea" },
      { key: "area.semanas.blanca.name", label: "Puerta Blanca — nombre",    default: "Puerta Blanca" },
      { key: "area.semanas.blanca.desc", label: "Puerta Blanca — descripción", default: "Cimentación y apertura", type: "textarea" },
      { key: "area.semanas.roja.name",   label: "Puerta Roja — nombre",      default: "Puerta Roja" },
      { key: "area.semanas.roja.desc",   label: "Puerta Roja — descripción", default: "Profundización y expansión", type: "textarea" },
      { key: "area.semanas.azul.name",   label: "Puerta Azul — nombre",      default: "Puerta Azul" },
      { key: "area.semanas.azul.desc",   label: "Puerta Azul — descripción", default: "Integración y maestría", type: "textarea" },
    ],
  },
  {
    title: "Área — Diario",
    path: "/area",
    fields: [
      { key: "area.diario.label", label: "Etiqueta superior", default: "Tu espacio interior" },
      { key: "area.diario.title", label: "Título",            default: "Mi Diario TCT" },
      { key: "area.diario.sub",   label: "Subtítulo",         default: "Reflexiones, observaciones y presencia", type: "textarea" },
    ],
  },
  {
    title: "Área — Arteterapia",
    path: "/area",
    fields: [
      { key: "area.arteterapia.label",       label: "Etiqueta superior",     default: "Manual complementario" },
      { key: "area.arteterapia.title",       label: "Título",                default: "Arteterapia del Sistema TCT" },
      { key: "area.arteterapia.sub",         label: "Subtítulo",             default: "48 semanas de práctica creativa e integración", type: "textarea" },
      { key: "area.arteterapia.intro.title", label: "Intro — título",        default: "Manual de Arteterapia del Sistema TCT: 48 Semanas de Práctica Creativa" },
      { key: "area.arteterapia.intro.body",  label: "Intro — texto",         default: "Este manual complementa el programa del Sistema TCT, ofreciendo un ejercicio de arteterapia semanal diseñado para profundizar e integrar los conceptos de cada etapa. El arte se convierte en un puente entre el entendimiento intelectual y la sabiduría encarnada.", type: "textarea" },
    ],
  },
  {
    title: "Área — Multimedia",
    path: "/area",
    fields: [
      { key: "area.multimedia.label", label: "Etiqueta superior", default: "Tu biblioteca sonora" },
      { key: "area.multimedia.title", label: "Título",            default: "Biblioteca Multimedia" },
      { key: "area.multimedia.sub",   label: "Subtítulo",         default: "Cuencos tibetanos, meditaciones y frecuencias del Método TCT", type: "textarea" },
    ],
  },
  {
    title: "Área — Progreso",
    path: "/area",
    fields: [
      { key: "area.progreso.label", label: "Etiqueta superior", default: "Tu evolución" },
      { key: "area.progreso.title", label: "Título",            default: "Mi Progreso" },
      { key: "area.progreso.sub",   label: "Subtítulo",         default: "Avance por Puerta y semanas completadas", type: "textarea" },
    ],
  },
  {
    title: "Área — Comunidad",
    path: "/area",
    fields: [
      { key: "area.comunidad.label", label: "Etiqueta superior", default: "Tu tribu" },
      { key: "area.comunidad.title", label: "Título",            default: "La Comunidad TCT" },
      { key: "area.comunidad.sub",   label: "Subtítulo",         default: "Chat de la Academia · Videollamadas con Jitsi Meet", type: "textarea" },
      { key: "area.comunidad.forum", label: "Texto foro",        default: "Comparte tus reflexiones con la comunidad" },
    ],
  },
];

/** Genera los campos editables para las 48 semanas */
function makeWeekPages(): PageDef[] {
  return ALL_WEEK_DETAILS.map(wd => {
    const n = wd.n;
    const fields: FieldDef[] = [
      { key: `week.${n}.title`,   label: "Título de la semana", default: wd.title },
      { key: `week.${n}.message`, label: "Descripción",          default: wd.message, type: "textarea" },
      ...wd.concepts.flatMap(([term, def], i) => [
        { key: `week.${n}.concept.${i}.term`, label: `Concepto ${i + 1} — término`,      default: term },
        { key: `week.${n}.concept.${i}.def`,  label: `Concepto ${i + 1} — definición`,   default: def,  type: "textarea" as const },
      ]),
      { key: `week.${n}.exerciseTitle`,     label: "Ejercicio — título",     default: wd.exerciseTitle },
      { key: `week.${n}.exerciseObjective`, label: "Ejercicio — objetivo",   default: wd.exerciseObjective, type: "textarea" },
      { key: `week.${n}.exerciseRef`,       label: "Ejercicio — referencia", default: wd.exerciseRef },
      ...wd.exerciseSteps.map((step, i) => ({
        key: `week.${n}.exerciseStep.${i}`, label: `Ejercicio — paso ${i + 1}`, default: step, type: "textarea" as const,
      })),
      { key: `week.${n}.artTitle`, label: "Arteterapia — título",      default: wd.artTitle },
      { key: `week.${n}.artDesc`,  label: "Arteterapia — descripción", default: wd.artDesc, type: "textarea" as const },
      ...wd.artSteps.map((step, i) => ({
        key: `week.${n}.artStep.${i}`, label: `Arteterapia — paso ${i + 1}`, default: step, type: "textarea" as const,
      })),
      ...(wd.artReflection ? [{ key: `week.${n}.artReflection`, label: "Arteterapia — reflexión", default: wd.artReflection, type: "textarea" as const }] : []),
    ];
    return { title: `Semana ${n} — ${wd.title}`, path: "/area", fields };
  });
}

const PAGES: PageDef[] = [...PAGES_STATIC, ...makeWeekPages()];

/* ── ALL FIELDS flat map for inline editor lookup ─────────── */
const ALL_FIELDS = PAGES.flatMap(p => p.fields);

/* ── Section panels — Quick Edit map ─────────────────────── */
const SECTION_PANELS: Record<string, { label: string; keys: string[]; hasGrid?: boolean }> = {
  /* ── Academy.tsx ── */
  "acad-hero":        { label: "Hero · Academy",    keys: ["academy.hero.label","academy.hero.title1","academy.hero.title2","academy.hero.subtitle","academy.img.tct","academy.img.dep"] },
  "acad-cursos":      { label: "Cursos",            keys: ["academy.cursos.label","academy.cursos.title","academy.cursos.sub","academy.tct.name","academy.tct.tagline","academy.tct.status","academy.tct.meta","academy.tct.desc","academy.tct.cta","academy.dep.name","academy.dep.tagline","academy.dep.status","academy.dep.meta","academy.dep.desc","academy.dep.cta"] },
  "acad-que-es":      { label: "La Academia",       keys: [], hasGrid: true },
  "acad-presencia":   { label: "Presencia",         keys: ["academy.presencia.label","academy.presencia.title1","academy.presencia.title2","academy.presencia.body","academy.presencia.cta"] },
  "acad-principios":  { label: "Principios",        keys: ["academy.why.title"] },
  "acad-testimonios": { label: "Testimonios",       keys: [] },
  "acad-contacto":    { label: "Contacto",          keys: ["academy.contact.title","academy.contact.sub"], hasGrid: true },
  /* ── Landing.tsx (/metodo) ── */
  "land-hero":        { label: "Hero · Método",     keys: ["landing.hero.badge"], hasGrid: true },
  "land-puertas":     { label: "Las Puertas",       keys: ["landing.sec.camino"] },
  "land-libre":       { label: "Acceso Libre",      keys: ["landing.sec.gratis","landing.sec.libre"] },
  "land-que-es":      { label: "El Método",         keys: ["landing.sec.metodo"], hasGrid: true },
  "land-pilares":     { label: "Seis Pilares",      keys: ["landing.sec.fundamentos"] },
  "land-viaje":       { label: "El Viaje 48s",      keys: ["landing.sec.viaje"] },
  "land-caminos":     { label: "12 Caminos",        keys: ["landing.sec.formacion"] },
  "land-equipo":      { label: "Equipo · Método",   keys: ["landing.sec.equipo"] },
  "land-cta":         { label: "Integración",       keys: ["landing.sec.integracion"] },
  "land-testimonios": { label: "Testimonios",       keys: ["landing.sec.testimonios"] },
  "land-final":       { label: "CTA Final",         keys: [] },
  /* ── Metodo.tsx (/metodo-tct) ── */
  "met-hero":         { label: "Hero · TCT",        keys: ["tct.hero.badge","tct.hero.title","tct.hero.subtitle","tct.hero.cta"] },
  "met-puertas":      { label: "Puertas · TCT",     keys: ["tct.que.title","tct.que.body"] },
  "met-programa":     { label: "Programa Oro",      keys: [] },
  /* ── Deportista.tsx ── */
  "dep-hero":         { label: "Hero · Deportista", keys: ["dep.hero.badge","dep.hero.title","dep.hero.subtitle","dep.hero.cta"] },
  "dep-para-quien":   { label: "¿Para Quién?",      keys: ["dep.retos.title"] },
  "dep-metodologia":  { label: "Metodología",       keys: ["dep.metodo.title"], hasGrid: true },
  "dep-equipo":       { label: "Equipo · Dep.",     keys: [] },
  "dep-lista":        { label: "Lista de Espera",   keys: [] },
  /* ── Área ── */
  "area-dashboard":   { label: "Dashboard",         keys: ["area.dashboard.label","area.dashboard.welcome","area.dashboard.quote","area.dashboard.quoteBy","area.dashboard.cta1","area.dashboard.cta2","area.dashboard.cta3"] },
  "area-diario":      { label: "Diario",            keys: ["area.diario.label","area.diario.title","area.diario.sub"] },
  "area-arteterapia": { label: "Arteterapia",       keys: ["area.arteterapia.label","area.arteterapia.title","area.arteterapia.sub"] },
  "area-multimedia":  { label: "Multimedia",        keys: ["area.multimedia.label","area.multimedia.title","area.multimedia.sub"] },
  "area-progreso":    { label: "Progreso",          keys: ["area.progreso.label","area.progreso.title","area.progreso.sub"] },
  "area-comunidad":   { label: "Comunidad",         keys: ["area.comunidad.label","area.comunidad.title","area.comunidad.sub","area.comunidad.forum"] },
};

/* ── Panel IDs ────────────────────────────────────────────── */
type PanelId = "texto" | "diseno" | "nav" | "acciones" | "elementos" | "admin" | "seccion" | "bloque";

const PANEL_ICONS: Array<{ id: PanelId; icon: React.ReactNode; label: string }> = [
  { id: "texto",     icon: <Type size={16} />,         label: "Textos" },
  { id: "diseno",    icon: <Palette size={16} />,      label: "Diseño" },
  { id: "nav",       icon: <Navigation2 size={16} />,  label: "Páginas" },
  { id: "elementos", icon: <Plus size={16} />,         label: "Añadir" },
  { id: "acciones",  icon: <Zap size={16} />,          label: "Acciones" },
  { id: "admin",     icon: <Users size={16} />,        label: "Admin" },
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
    { path: "/",           label: "Inicio — Academia",   icon: "🏠" },
    { path: "/metodo",     label: "Landing — Método",    icon: "✨" },
    { path: "/metodo-tct", label: "Método TCT",          icon: "🌀" },
    { path: "/deportista", label: "El Deportista",       icon: "⚡" },
    { path: "/area",       label: "Área de Alumnos",     icon: "🎓" },
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
type AdminUser = {
  id: string; email: string; name: string;
  role: string; plan: string; createdAt: string; lastSignIn: string | null;
  currentWeek: number | null; totalCompleted: number | null;
  completedWeeks: number[];
};

function weekGate(w: number): { label: string; color: string } {
  if (w <= 12)  return { label: "Blanca",   color: "#8BC34A" };
  if (w <= 24)  return { label: "Roja",     color: "#E57373" };
  if (w <= 36)  return { label: "Azul",     color: "#64B5F6" };
  return             { label: "Arcoíris",  color: "#CE93D8" };
}

function PlanBadge({ plan }: { plan: string }) {
  const map: Record<string, { label: string; bg: string; color: string }> = {
    oro:   { label: "✦ Oro",  bg: "rgba(188,150,64,.22)", color: "#D4AA5A" },
    plata: { label: "Plata",  bg: "rgba(180,180,180,.15)", color: "#AEAEB2" },
    libre: { label: "Libre",  bg: "rgba(255,255,255,.08)", color: "rgba(255,255,255,.5)" },
    admin: { label: "Admin",  bg: "rgba(188,150,64,.12)", color: GOLD },
  };
  const p = map[plan] ?? map["libre"];
  return (
    <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, background: p.bg, color: p.color, whiteSpace: "nowrap" }}>
      {p.label}
    </span>
  );
}

function PanelAdmin() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [error, setError] = useState<string | null>(null);

  /* plan editing */
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editPlan, setEditPlan] = useState("");
  const [saving, setSaving] = useState(false);

  /* progress reset */
  const [resetId, setResetId] = useState<string | null>(null);
  const [resetSel, setResetSel] = useState<number[]>([]);
  const [resetSaving, setResetSaving] = useState(false);
  const [resetDone, setResetDone] = useState<string | null>(null);

  async function loadUsers() {
    setLoading(true); setError(null);
    try {
      const r = await fetch(`/api/admin/users`);
      if (!r.ok) throw new Error(await r.text());
      const d = await r.json();
      setUsers(d.users ?? []);
    } catch (e: any) {
      setError(e.message ?? "Error cargando usuarios");
    } finally { setLoading(false); }
  }

  useEffect(() => { loadUsers(); }, []);

  async function savePlan(id: string) {
    setSaving(true);
    try {
      await fetch(`/api/admin/users/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ plan: editPlan }),
      });
      setEditingId(null);
      await loadUsers();
    } finally { setSaving(false); }
  }

  function openReset(u: AdminUser) {
    setResetId(u.id);
    setResetSel([...u.completedWeeks].sort((a,b)=>a-b));
    setResetDone(null);
    setEditingId(null);
  }

  function toggleResetWeek(w: number) {
    setResetSel(prev => prev.includes(w) ? prev.filter(x => x !== w) : [...prev, w]);
  }

  async function applyReset(keepWeeks: number[]) {
    if (!resetId) return;
    setResetSaving(true);
    try {
      const r = await fetch(`/api/admin/users/${resetId}/reset-progress`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ keepWeeks }),
      });
      if (!r.ok) throw new Error(await r.text());
      const originalCount = users.find(u => u.id === resetId)?.completedWeeks.length ?? 0;
      const resetCount = originalCount - keepWeeks.length;
      setResetDone(keepWeeks.length === 0 ? "Progreso reseteado a cero" : `${resetCount} semana(s) reseteadas`);
      await loadUsers();
      setTimeout(() => { setResetId(null); setResetDone(null); }, 2000);
    } catch (e: any) {
      setResetDone("Error: " + e.message);
    } finally { setResetSaving(false); }
  }

  const filtered = users.filter(u =>
    search === "" ||
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  const thisMonth = users.filter(u => {
    const d = new Date(u.createdAt);
    const now = new Date();
    return d.getFullYear() === now.getFullYear() && d.getMonth() === now.getMonth();
  }).length;

  function fmtDate(iso: string | null): string {
    if (!iso) return "—";
    return new Date(iso).toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "2-digit" });
  }

  return (
    <div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 6, marginBottom: 12 }}>
        {[
          { label: "Total", value: loading ? "…" : users.length },
          { label: "Este mes", value: loading ? "…" : thisMonth },
          { label: "Con plan oro", value: loading ? "…" : users.filter(u => u.plan === "oro").length },
        ].map(s => (
          <div key={s.label} style={{ background: D3, borderRadius: 10, padding: "10px 8px", textAlign: "center" }}>
            <div style={{ fontFamily: SEM, fontSize: 22, fontWeight: 300, color: "white" }}>{s.value}</div>
            <div style={{ fontSize: 8, fontWeight: 700, color: MUTED, textTransform: "uppercase", letterSpacing: ".08em", marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      <div style={{ position: "relative", marginBottom: 8 }}>
        <Search size={11} style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: MUTED }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Buscar alumno…"
          style={{ width: "100%", background: D1, color: TEXT, border: `1px solid ${BRD}`, borderRadius: 9, padding: "8px 10px 8px 28px", fontSize: 12, fontFamily: SANS, outline: "none", boxSizing: "border-box" }} />
      </div>

      <button onClick={loadUsers} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: MUTED, background: "none", border: `1px solid ${BRD}`, borderRadius: 8, padding: "5px 10px", cursor: "pointer", fontFamily: SANS, marginBottom: 10, width: "100%" }}>
        <RefreshCw size={11} /> Actualizar lista
      </button>

      {error && (
        <div style={{ background: REDF, border: `1px solid ${RED}44`, borderRadius: 9, padding: "8px 10px", fontSize: 11, color: RED, marginBottom: 10 }}>
          {error}
        </div>
      )}

      {loading ? (
        <div style={{ textAlign: "center", padding: "24px 0", color: MUTED, fontSize: 12 }}>Cargando…</div>
      ) : filtered.length === 0 ? (
        <div style={{ textAlign: "center", padding: "24px 0", color: MUTED, fontSize: 12 }}>Sin resultados</div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
          {filtered.map(u => {
            const completedSorted = [...u.completedWeeks].sort((a,b)=>a-b);
            const progPct = u.totalCompleted != null ? Math.round((u.totalCompleted / 48) * 100) : null;
            const isResetting = resetId === u.id;

            return (
              <div key={u.id} style={{ background: D3, borderRadius: 10, padding: "11px 12px" }}>
                {/* Header row */}
                <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 6 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", flexShrink: 0, background: "rgba(188,150,64,.3)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: GOLD }}>
                    {(u.name || u.email).charAt(0).toUpperCase()}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: TEXT, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.name || "—"}</div>
                    <div style={{ fontSize: 10, color: MUTED, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{u.email}</div>
                  </div>
                  <PlanBadge plan={u.plan} />
                </div>

                {/* Progress bar */}
                {progPct != null && (
                  <div style={{ marginBottom: 6 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 3 }}>
                      <span style={{ fontSize: 9, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em" }}>Progreso — Sem. {u.currentWeek ?? "?"}</span>
                      <span style={{ fontSize: 9, color: GOLD, fontWeight: 700 }}>{progPct}%</span>
                    </div>
                    <div style={{ height: 3, background: "rgba(255,255,255,.08)", borderRadius: 9999, overflow: "hidden" }}>
                      <div style={{ height: "100%", background: GOLD, borderRadius: 9999, width: `${progPct}%` }} />
                    </div>
                  </div>
                )}

                {/* Action row: dates + buttons */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 4 }}>
                  <div style={{ fontSize: 10, color: MUTED }}>
                    📅 {fmtDate(u.createdAt)}
                    {u.lastSignIn && <span style={{ marginLeft: 6 }}>🔑 {fmtDate(u.lastSignIn)}</span>}
                  </div>

                  <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                    {/* Plan editing */}
                    {!isResetting && (editingId === u.id ? (
                      <div style={{ display: "flex", gap: 4, alignItems: "center" }}>
                        <select value={editPlan} onChange={e => setEditPlan(e.target.value)}
                          style={{ background: D1, color: TEXT, border: `1px solid ${BRD}`, borderRadius: 6, fontSize: 10, padding: "3px 6px", fontFamily: SANS }}>
                          {["libre", "plata", "oro", "admin"].map(p => <option key={p} value={p}>{p}</option>)}
                        </select>
                        <button onClick={() => savePlan(u.id)} disabled={saving}
                          style={{ background: GOLD, color: "#1D1D1F", border: "none", borderRadius: 6, fontSize: 10, fontWeight: 700, padding: "3px 8px", cursor: "pointer" }}>
                          {saving ? "…" : "✓"}
                        </button>
                        <button onClick={() => setEditingId(null)}
                          style={{ background: "rgba(255,255,255,.08)", color: MUTED, border: "none", borderRadius: 6, fontSize: 10, padding: "3px 6px", cursor: "pointer" }}>✕</button>
                      </div>
                    ) : (
                      <>
                        <button onClick={() => { setEditingId(u.id); setEditPlan(u.plan); setResetId(null); }}
                          style={{ fontSize: 10, color: MUTED, background: "rgba(255,255,255,.05)", border: `1px solid ${BRD}`, borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontFamily: SANS }}>
                          Editar plan
                        </button>
                        {completedSorted.length > 0 && (
                          <button onClick={() => openReset(u)}
                            style={{ fontSize: 10, color: "#E57373", background: "rgba(229,115,115,.1)", border: "1px solid rgba(229,115,115,.3)", borderRadius: 6, padding: "3px 8px", cursor: "pointer", fontFamily: SANS }}>
                            Resetear sem.
                          </button>
                        )}
                      </>
                    ))}
                  </div>
                </div>

                {/* ── Reset panel ── */}
                {isResetting && (
                  <div style={{ marginTop: 10, borderTop: `1px solid ${BRD}`, paddingTop: 10 }}>
                    {resetDone ? (
                      <div style={{ textAlign: "center", fontSize: 11, color: "#8BC34A", padding: "8px 0", fontWeight: 700 }}>
                        ✓ {resetDone}
                      </div>
                    ) : (
                      <>
                        <div style={{ fontSize: 10, color: MUTED, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".07em", marginBottom: 6 }}>
                          Semanas completadas — toca para desmarcar
                        </div>

                        {/* Week pills grouped by gate */}
                        {(["Blanca","Roja","Azul","Arcoíris"] as const).map(gate => {
                          const gateWeeks = completedSorted.filter(w => weekGate(w).label === gate);
                          if (gateWeeks.length === 0) return null;
                          const gateColor = weekGate(gateWeeks[0]).color;
                          return (
                            <div key={gate} style={{ marginBottom: 6 }}>
                              <div style={{ fontSize: 9, color: gateColor, fontWeight: 700, textTransform: "uppercase", letterSpacing: ".06em", marginBottom: 3 }}>
                                {gate}
                              </div>
                              <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                                {gateWeeks.map(w => {
                                  const kept = resetSel.includes(w);
                                  return (
                                    <button key={w} onClick={() => toggleResetWeek(w)}
                                      title={kept ? "Mantener completada" : "Marcar para resetear"}
                                      style={{
                                        fontSize: 10, fontWeight: 700, padding: "3px 9px", borderRadius: 9999,
                                        cursor: "pointer", border: `1px solid ${kept ? gateColor : "rgba(255,255,255,.15)"}`,
                                        background: kept ? `${gateColor}22` : "rgba(255,255,255,.04)",
                                        color: kept ? gateColor : "rgba(255,255,255,.35)",
                                        transition: "all .15s",
                                        textDecoration: kept ? "none" : "line-through",
                                      }}>
                                      S.{w}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          );
                        })}

                        <div style={{ fontSize: 10, color: MUTED, marginBottom: 8, marginTop: 4 }}>
                          {resetSel.length === completedSorted.length
                            ? "Ninguna semana marcada para resetear"
                            : `Se resetearán ${completedSorted.length - resetSel.length} semana(s)`}
                        </div>

                        <div style={{ display: "flex", gap: 6 }}>
                          <button onClick={() => applyReset([])} disabled={resetSaving}
                            style={{ flex: 1, fontSize: 10, fontWeight: 700, padding: "6px 0", borderRadius: 8, cursor: "pointer", background: "rgba(229,115,115,.15)", color: "#E57373", border: "1px solid rgba(229,115,115,.35)", fontFamily: SANS }}>
                            {resetSaving ? "…" : "Resetear todo"}
                          </button>
                          <button onClick={() => applyReset(resetSel)} disabled={resetSaving || resetSel.length === completedSorted.length}
                            style={{ flex: 1, fontSize: 10, fontWeight: 700, padding: "6px 0", borderRadius: 8, cursor: resetSel.length === completedSorted.length ? "default" : "pointer", background: resetSel.length === completedSorted.length ? "rgba(255,255,255,.04)" : GOLD, color: resetSel.length === completedSorted.length ? MUTED : "#1D1D1F", border: "none", fontFamily: SANS, opacity: resetSaving ? .5 : 1 }}>
                            {resetSaving ? "…" : "Aplicar selección"}
                          </button>
                          <button onClick={() => setResetId(null)}
                            style={{ fontSize: 10, padding: "6px 10px", borderRadius: 8, cursor: "pointer", background: "rgba(255,255,255,.06)", color: MUTED, border: `1px solid ${BRD}`, fontFamily: SANS }}>
                            Cancelar
                          </button>
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      <SecTitle>Acceso rápido</SecTitle>
      <P2Btn icon={<LogIn size={16} />} label="Área de alumnos" sublabel="Ver como alumno" onClick={() => window.location.href = "/area"} />
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
  if (location === "/login") return null;

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
            ED<br />FI
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
              {activePanel === "admin" && <PanelAdmin />}
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
