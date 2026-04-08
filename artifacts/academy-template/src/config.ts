/**
 * ═══════════════════════════════════════════════════════════════════
 *  ACADEMY TEMPLATE — ARCHIVO DE CONFIGURACIÓN CENTRAL
 *  ───────────────────────────────────────────────────────────────────
 *  Este es el ÚNICO archivo que necesitas editar para personalizar
 *  la plataforma completa. Cambia aquí y todo el sitio se actualiza.
 * ═══════════════════════════════════════════════════════════════════
 */

export const ACADEMY = {
  /* ── Identidad ── */
  name: "Academy Name",
  tagline: "Tu academia online",
  slogan: "El aprendizaje no se aprende. Se vive.",
  description: "Una plataforma completa de formación online con acceso por niveles, pagos integrados y área de alumnos.",
  contactEmail: "hola@tuacademia.com",
  socialInstagram: "@tuacademia",
  socialLinkedIn: "tuacademia",

  /* ── Branding & Colores ── */
  colors: {
    primary: "#1D1D1F",        // texto principal, botones oscuros
    accent: "#795901",          // color dorado / color de marca
    accentLight: "#BC9640",     // acento más claro (títulos, detalles)
    muted: "#6E6E73",           // texto secundario
    light: "#F5F5F7",           // fondos claros
    background: "#ffffff",      // fondo base
    error: "#C54B3A",           // errores y alertas
  },

  /* ── Tipografía ── */
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Plus Jakarta Sans', system-ui, sans-serif",
    headingUrl: "https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,300;0,400;0,700;1,300;1,400&display=swap",
    bodyUrl: "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap",
  },

  /* ── Integración Supabase (auth de alumnos) ── */
  supabase: {
    url: import.meta.env.VITE_SUPABASE_URL as string,
    anonKey: import.meta.env.VITE_SUPABASE_ANON_KEY as string,
  },
};

/* ─────────────────────────────────────────────────────────────────
   NIVELES / PUERTAS
   Define cuántos niveles tiene tu programa, su nombre, color,
   precio mensual y el price ID de Stripe correspondiente.
───────────────────────────────────────────────────────────────── */
export const LEVELS = [
  {
    key: "nivel1",
    num: "I",
    title: "Nivel I",
    subtitle: "Fundamentos",
    weeks: "Semanas 1–12",
    description: "Los primeros pasos. El alumno aprende las bases del método y construye sus primeros hábitos de práctica.",
    color: "#8A7F74",
    price: "97",
    billingLabel: "Acceso inmediato",
    stripePriceId: "price_XXXXXXXXXXXXXXXXXX",   // ← reemplaza con tu price ID de Stripe
    stripeMode: "subscription" as const,
    plan: "nivel1",
    open: true,
  },
  {
    key: "nivel2",
    num: "II",
    title: "Nivel II",
    subtitle: "Desarrollo",
    weeks: "Semanas 13–24",
    description: "El alumno profundiza en los contenidos y comienza a aplicar el método en su vida cotidiana.",
    color: "#2D7DD2",
    price: "97",
    billingLabel: "Requiere Nivel I",
    stripePriceId: "price_XXXXXXXXXXXXXXXXXX",
    stripeMode: "subscription" as const,
    plan: "nivel2",
    open: false,
  },
  {
    key: "nivel3",
    num: "III",
    title: "Nivel III",
    subtitle: "Maestría",
    weeks: "Semanas 25–36",
    description: "Integración completa. El alumno trabaja en los niveles más avanzados del programa.",
    color: "#5E4B8B",
    price: "97",
    billingLabel: "Requiere Nivel II",
    stripePriceId: "price_XXXXXXXXXXXXXXXXXX",
    stripeMode: "subscription" as const,
    plan: "nivel3",
    open: false,
  },
];

/* ─────────────────────────────────────────────────────────────────
   OFERTA COMPLETA (Acceso total)
   Producto especial que da acceso a todos los niveles de una vez.
   Puede ser pago único o suscripción.
───────────────────────────────────────────────────────────────── */
export const FULL_ACCESS = {
  enabled: true,
  title: "Acceso Completo",
  description: "Todos los niveles incluidos. El camino completo de transformación desde el primer día.",
  price: "497",
  billingLabel: "Pago único · Acceso total",
  stripePriceId: "price_XXXXXXXXXXXXXXXXXX",
  stripeMode: "subscription" as const,
  plan: "full",
};

/* ─────────────────────────────────────────────────────────────────
   SECCIONES DEL ÁREA DE ALUMNOS
   Activa o desactiva secciones según lo que ofrezca tu academia.
───────────────────────────────────────────────────────────────── */
export const SECTIONS = {
  semanas: true,       // Módulos / semanas de contenido
  multimedia: true,    // Vídeos y audios
  materiales: true,    // PDFs y recursos descargables
  progreso: true,      // Seguimiento del progreso
  diario: true,        // Diario de práctica personal
  comunidad: true,     // Foro / comunidad
  arteterapia: false,  // Sección de arteterapia (específica)
};

/* ─────────────────────────────────────────────────────────────────
   CONTENIDO DE LA PÁGINA DE INICIO (Landing)
   Edita los textos de marketing sin tocar el código de los componentes.
───────────────────────────────────────────────────────────────── */
export const LANDING_COPY = {
  hero: {
    badge: "Tu academia · Formación online",
    headline: "El aprendizaje no\nse aprende.",
    headlineItalic: "Se vive.",
    subheadline: "Una plataforma completa donde el conocimiento y la práctica se integran en un camino estructurado de crecimiento real.",
    ctaPrimary: "Empezar ahora",
    ctaSecondary: "Ver el programa",
  },

  method: {
    label: "El Método",
    title: "Un sistema diseñado para el cambio real",
    description: "No es un curso más. Es un programa estructurado por niveles donde cada semana construye sobre la anterior. Conocimiento aplicado, comunidad activa y acompañamiento real.",
  },

  pillars: [
    { num: "I",   title: "Estructura",     desc: "Un programa de 36 semanas organizado por niveles con contenido semana a semana, nunca te pierdes ni saltas pasos." },
    { num: "II",  title: "Práctica",       desc: "Cada módulo incluye ejercicios, retos y recursos para aplicar lo aprendido en tu vida real." },
    { num: "III", title: "Comunidad",      desc: "Acceso a un grupo privado de alumnos y sesiones grupales para avanzar en compañía." },
    { num: "IV",  title: "Progreso",       desc: "Sistema de seguimiento que te muestra dónde estás y hacia dónde vas en cada momento." },
  ],

  levels: {
    label: "El Programa",
    title: "Cuatro niveles, un solo camino",
    description: "El programa avanza por niveles. Cada nivel desbloquea el siguiente cuando estás preparado. Sin prisas, sin saltos, sin desorden.",
  },

  fullAccess: {
    label: "Oferta Especial",
    title: "El camino completo desde el primer día",
    description: "Accede a todos los niveles del programa de una sola vez. Ideal para alumnos con experiencia previa o que quieren comprometerse desde el inicio con el proceso completo.",
  },

  testimonials: [
    { name: "Ana M.", role: "Alumna Nivel II", text: "Llevaba años buscando una formación con esta estructura. El nivel de detalle y el acompañamiento son incomparables." },
    { name: "Carlos R.", role: "Alumno Nivel III", text: "Lo que más me sorprendió fue la claridad del método. Todo encaja. Cada semana tiene un propósito claro." },
    { name: "Laura S.", role: "Alumna Nivel I", text: "La plataforma es preciosa y muy fácil de usar. El diario de práctica me ha cambiado la forma de aprender." },
  ],

  faq: [
    { q: "¿Cuánto tiempo necesito por semana?", a: "Con 3-4 horas semanales tienes suficiente para seguir el programa a buen ritmo. Puedes ir a tu propio paso." },
    { q: "¿Qué pasa si me quedo atrás?", a: "El contenido es siempre accesible. No hay fechas límite. Avanzas cuando estás listo." },
    { q: "¿Puedo cancelar la suscripción?", a: "Sí, en cualquier momento desde tu perfil. Sin permanencia ni penalizaciones." },
    { q: "¿Hay garantía de devolución?", a: "Sí. Si en los primeros 14 días no estás satisfecho, te devolvemos el importe íntegro sin preguntas." },
  ],
};

/* ─────────────────────────────────────────────────────────────────
   CURSOS INDIVIDUALES
   Dos formaciones específicas con su propia página de ventas.
   Cada curso puede tener precio, módulos e imagen propia.
───────────────────────────────────────────────────────────────── */
export const COURSES = [
  {
    key: "curso-1",
    slug: "/curso-1",
    badge: "Curso intensivo",
    title: "Fundamentos del Método",
    subtitle: "Aprende las bases en 8 semanas",
    description: "Un recorrido intensivo y estructurado por los principios esenciales del método. Ideal para quienes empiezan desde cero y quieren resultados rápidos y concretos.",
    color: "#2D7DD2",
    colorLight: "#EBF4FF",
    price: "197",
    priceLabel: "Pago único",
    stripePriceId: "price_XXXXXXXXXXXXXXXXXX",
    stripeMode: "payment" as const,
    plan: "curso1",
    duration: "8 semanas",
    level: "Principiante",
    includes: [
      "32 clases en vídeo",
      "8 guías PDF descargables",
      "Acceso al grupo privado",
      "Sesión grupal de preguntas",
      "Acceso de por vida",
    ],
    modules: [
      { num: "01", title: "Introducción y fundamentos",        desc: "Los conceptos clave del método y cómo aplicarlos desde el primer día." },
      { num: "02", title: "Herramientas y práctica diaria",    desc: "Las herramientas esenciales organizadas en una rutina diaria sostenible." },
      { num: "03", title: "Profundización y consolidación",    desc: "Profundizar en los aspectos que más impacto tienen en tu progreso." },
      { num: "04", title: "Integración y cierre del proceso",  desc: "Integrar lo aprendido y diseñar tu plan de continuidad personal." },
    ],
    testimonial: { name: "Marta G.", role: "Alumna del Curso I", text: "En 8 semanas cambié completamente mi manera de aprender. El método es claro, directo y funciona desde el primer día." },
    faq: [
      { q: "¿Necesito experiencia previa?", a: "No. El curso está diseñado para comenzar desde cero con total claridad." },
      { q: "¿Cuánto tiempo necesito?", a: "Unas 2-3 horas semanales son suficientes para avanzar bien." },
      { q: "¿Puedo acceder en cualquier momento?", a: "Sí. El acceso es inmediato y de por vida." },
    ],
  },
  {
    key: "curso-2",
    slug: "/curso-2",
    badge: "Formación avanzada",
    title: "Maestría y Aplicación",
    subtitle: "Lleva el método al siguiente nivel",
    description: "Para quienes ya tienen las bases y quieren profundizar. Una formación avanzada que combina teoría de alto nivel con práctica guiada en escenarios reales.",
    color: "#5E4B8B",
    colorLight: "#F3F0FA",
    price: "397",
    priceLabel: "Pago único",
    stripePriceId: "price_XXXXXXXXXXXXXXXXXX",
    stripeMode: "payment" as const,
    plan: "curso2",
    duration: "12 semanas",
    level: "Avanzado",
    includes: [
      "48 clases en vídeo (HD)",
      "12 guías y plantillas de trabajo",
      "Mentoría grupal mensual en directo",
      "Acceso al grupo VIP de alumnos",
      "Certificado de finalización",
      "Acceso de por vida",
    ],
    modules: [
      { num: "01", title: "Revisión avanzada de los fundamentos", desc: "Repasar y ampliar los conceptos clave con perspectiva de experto." },
      { num: "02", title: "Sistemas y estructuras de alto nivel",  desc: "Crear sistemas personales que funcionan solos sin esfuerzo constante." },
      { num: "03", title: "Casos prácticos y resolución de retos", desc: "Análisis de casos reales y solución guiada de los obstáculos más comunes." },
      { num: "04", title: "Proyecto final y certificación",        desc: "Diseñar y presentar tu proyecto de aplicación personal del método." },
    ],
    testimonial: { name: "Pablo S.", role: "Alumno del Curso II", text: "El nivel de profundidad y el acompañamiento son incomparables. Este curso cambió mi manera de pensar y de trabajar." },
    faq: [
      { q: "¿Necesito haber hecho el Curso I?", a: "Es recomendable tener bases del método, aunque no es obligatorio si tienes experiencia en el ámbito." },
      { q: "¿Hay sesiones en directo?", a: "Sí. Hay una sesión grupal mensual con el formador." },
      { q: "¿Se entrega certificado?", a: "Sí, al completar el proyecto final recibes un certificado firmado." },
    ],
  },
];

/* ─────────────────────────────────────────────────────────────────
   TEXTOS DE LA SECCIÓN DE CURSOS en la Landing principal
───────────────────────────────────────────────────────────────── */
export const COURSES_SECTION = {
  label: "Formaciones",
  title: "Elige tu formación",
  description: "Dos caminos de aprendizaje diseñados para distintos momentos del proceso. Empieza por el que mejor encaje con tu nivel actual.",
};

/* ─────────────────────────────────────────────────────────────────
   ADMIN
   Correo del usuario administrador que puede editar contenidos.
───────────────────────────────────────────────────────────────── */
export const ADMIN_EMAIL = "admin@tuacademia.com";

/* ─────────────────────────────────────────────────────────────────
   SEMANAS / MÓDULOS
   Número total de semanas del programa.
   El contenido de cada semana se gestiona desde el área de admin.
───────────────────────────────────────────────────────────────── */
export const TOTAL_WEEKS = 36;
