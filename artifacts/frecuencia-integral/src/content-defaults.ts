/**
 * ============================================================
 *  TEXTOS DEL SITIO — ARCHIVO CENTRAL DE CONTENIDO
 *  Edita aquí cualquier texto y se actualiza en toda la web.
 *  Cada clave corresponde a un literal visible en el sitio.
 * ============================================================
 */

const CONTENT: Record<string, string> = {

  // ──────────────────────────────────────────────────────────
  // PÁGINA INICIO / ACADEMIA  (ruta: /)
  // ──────────────────────────────────────────────────────────

  "academy.hero.label":    "Academia de desarrollo consciente",
  "academy.hero.title1":   "La transformación no se aprende.",
  "academy.hero.title2":   "Se vive.",
  "academy.hero.subtitle": "Una escuela de vida donde la sabiduría milenaria y la presencia se integran en cada área de tu existencia.",

  "academy.img.tct": "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=85&fit=crop",
  "academy.img.dep": "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?w=900&q=85&fit=crop",

  "academy.cursos.label": "Cursos",
  "academy.cursos.title": "Elige tu camino",
  "academy.cursos.sub":   "Dos formaciones. Una misma filosofía. Cada una diseñada para un contexto específico de vida.",

  "academy.tct.name":    "Método TCT",
  "academy.tct.tagline": "Tu Camino de Transformación",
  "academy.tct.status":  "Disponible",
  "academy.tct.meta":    "48 semanas",
  "academy.tct.desc":    "Un viaje de 48 semanas a través de 4 puertas progresivas. Del despertar a la integración.",
  "academy.tct.cta":     "Ver el programa →",

  "academy.dep.name":    "El Deportista Consciente",
  "academy.dep.tagline": "Más allá del resultado",
  "academy.dep.status":  "Próximamente",
  "academy.dep.meta":    "Deporte élite",
  "academy.dep.desc":    "Presencia aplicada al deporte de élite. Para deportistas, padres e instituciones.",
  "academy.dep.cta":     "Ver más →",

  "academy.why.title": "Por qué Frecuencia Integral",

  "academy.contact.title": "¿Tienes alguna pregunta?",
  "academy.contact.sub":   "Escríbenos y te respondemos en menos de 24h.",

  "academy.presencia.label":  "La Presencia",
  "academy.presencia.title1": "Estar aquí.",
  "academy.presencia.title2": "Completamente.",
  "academy.presencia.body":   "La transformación no ocurre en el futuro. Ocurre en este momento, en este cuerpo, en esta respiración.",
  "academy.presencia.cta":    "Explorar los cursos →",

  // ── contenedor de cada sección (pos: left|center|right, maxW/padH/padB: px) ──
  "academy.hero.cpos":         "center", "academy.hero.cmaxW":         "560",  "academy.hero.cpadH":         "0",  "academy.hero.cpadB":  "0",
  "academy.cursos.cpos":       "left",   "academy.cursos.cmaxW":       "560",  "academy.cursos.cpadH":       "0",  "academy.cursos.cpadB": "72",
  "academy.equipo.cpos":       "center", "academy.equipo.cmaxW":       "800",  "academy.equipo.cpadH":       "0",  "academy.equipo.cpadB": "0",
  "academy.principios.cpos":   "center", "academy.principios.cmaxW":   "1280", "academy.principios.cpadH":   "0",  "academy.principios.cpadB": "72",
  "academy.testimonios.cpos":  "center", "academy.testimonios.cmaxW":  "960",  "academy.testimonios.cpadH":  "0",  "academy.testimonios.cpadB": "80",
  "academy.contact.cpos":      "left",   "academy.contact.cmaxW":      "600",  "academy.contact.cpadH":      "0",  "academy.contact.cpadB": "0",
  "academy.presencia.cpos":    "left",   "academy.presencia.cmaxW":    "680",  "academy.presencia.cpadH":    "64", "academy.presencia.cpadB": "80",

  // ──────────────────────────────────────────────────────────
  // PÁGINA LANDING / MÉTODO TCT  (ruta: /metodo)
  // ──────────────────────────────────────────────────────────

  "landing.hero.badge": "Método TCT · Frecuencia Integral Academy",

  "landing.sec.camino":      "El Camino",
  "landing.sec.especial":    "Puerta Especial",
  "landing.sec.gratis":      "Sin compromiso · Gratis",
  "landing.sec.libre":       "Acceso libre",
  "landing.sec.metodo":      "El Método",
  "landing.sec.fundamentos": "Fundamentos",
  "landing.sec.viaje":       "El Viaje",
  "landing.sec.formacion":   "Formación",
  "landing.sec.equipo":      "El Equipo",
  "landing.sec.integracion": "La Integración Total",
  "landing.sec.testimonios": "Transformaciones reales",

  // ── contenedores Landing ──
  "landing.hero.cpos":        "left",   "landing.hero.cmaxW":        "560",  "landing.hero.cpadH":        "0", "landing.hero.cpadB":  "0",
  "landing.puertas.cpos":     "left",   "landing.puertas.cmaxW":     "560",  "landing.puertas.cpadH":     "0", "landing.puertas.cpadB": "56",
  "landing.libre.cpos":       "left",   "landing.libre.cmaxW":       "560",  "landing.libre.cpadH":       "0", "landing.libre.cpadB": "56",
  "landing.que.cpos":         "center", "landing.que.cmaxW":         "700",  "landing.que.cpadH":         "0", "landing.que.cpadB": "80",
  "landing.pilares.cpos":     "center", "landing.pilares.cmaxW":     "700",  "landing.pilares.cpadH":     "0", "landing.pilares.cpadB": "80",
  "landing.viaje.cpos":       "center", "landing.viaje.cmaxW":       "700",  "landing.viaje.cpadH":       "0", "landing.viaje.cpadB": "80",
  "landing.caminos.cpos":     "center", "landing.caminos.cmaxW":     "700",  "landing.caminos.cpadH":     "0", "landing.caminos.cpadB": "80",
  "landing.equipo.cpos":      "center", "landing.equipo.cmaxW":      "700",  "landing.equipo.cpadH":      "0", "landing.equipo.cpadB": "80",
  "landing.testimonios.cpos": "center", "landing.testimonios.cmaxW": "700",  "landing.testimonios.cpadH": "0", "landing.testimonios.cpadB": "80",
  "landing.cta.cpos":         "center", "landing.cta.cmaxW":         "900",  "landing.cta.cpadH":         "0", "landing.cta.cpadB": "0",

  // ──────────────────────────────────────────────────────────
  // PÁGINA MÉTODO TCT  (ruta: /metodo-tct)
  // ──────────────────────────────────────────────────────────

  "tct.hero.badge":    "Método TCT",
  "tct.hero.title":    "Técnica de Consciencia Total",
  "tct.hero.subtitle": "El método que integra cuerpo, mente y energía.",
  "tct.hero.cta":      "Descubrir el Método",
  "tct.que.title":     "Un camino de integración",
  "tct.que.body":      "El Método TCT es un sistema estructurado en 48 semanas.",
  "tct.pilares.title": "Los tres pilares",

  // ── contenedores TCT ──
  "tct.hero.cpos":     "center", "tct.hero.cmaxW":     "720",  "tct.hero.cpadH":     "0", "tct.hero.cpadB":  "0",
  "tct.puertas.cpos":  "left",   "tct.puertas.cmaxW":  "560",  "tct.puertas.cpadH":  "0", "tct.puertas.cpadB": "56",
  "tct.que.cpos":      "left",   "tct.que.cmaxW":       "540",  "tct.que.cpadH":      "0", "tct.que.cpadB": "0",
  "tct.pilares.cpos":  "center", "tct.pilares.cmaxW":  "700",  "tct.pilares.cpadH":  "0", "tct.pilares.cpadB": "80",
  "tct.viaje.cpos":    "center", "tct.viaje.cmaxW":    "700",  "tct.viaje.cpadH":    "0", "tct.viaje.cpadB": "80",
  "tct.caminos.cpos":  "center", "tct.caminos.cmaxW":  "700",  "tct.caminos.cpadH":  "0", "tct.caminos.cpadB": "80",

  // ──────────────────────────────────────────────────────────
  // PÁGINA DEPORTISTA  (ruta: /deportista)
  // ──────────────────────────────────────────────────────────

  "dep.hero.badge":    "El Deportista Consciente",
  "dep.hero.title":    "El rendimiento que nace desde adentro",
  "dep.hero.subtitle": "Un programa de consciencia para deportistas de alto rendimiento.",
  "dep.hero.cta":      "Descubrir el Programa",

  // ── contenedores Deportista ──
  "dep.hero.cpos":       "left",   "dep.hero.cmaxW":       "560",  "dep.hero.cpadH":       "0", "dep.hero.cpadB":  "0",
  "dep.paraquien.cpos":  "left",   "dep.paraquien.cmaxW":  "1160", "dep.paraquien.cpadH":  "0", "dep.paraquien.cpadB": "56",
  "dep.metodologia.cpos":"left",   "dep.metodologia.cmaxW":"1280", "dep.metodologia.cpadH":"0", "dep.metodologia.cpadB": "56",
  "dep.practica.cpos":   "left",   "dep.practica.cmaxW":   "1100", "dep.practica.cpadH":   "0", "dep.practica.cpadB": "56",
  "dep.lista.cpos":      "center", "dep.lista.cmaxW":      "720",  "dep.lista.cpadH":      "0", "dep.lista.cpadB": "0",

  // ──────────────────────────────────────────────────────────
  // GALERÍA — Academia en imágenes  (ruta: /)
  // ──────────────────────────────────────────────────────────

  "acad.galeria.label":  "La Academia en imágenes",
  "acad.galeria.title1": "Momentos del",
  "acad.galeria.title2": "proceso",
  "acad.galeria.sub":    "Cuencos, meditación, frecuencias, los 12 caminos. Cada imagen, un pilar real del método.",
  "acad.galeria.note":   "Las imágenes se actualizan con fotos propias de la Academia cuando estén disponibles",

  "acad.galeria.0.img":   "/galeria/cuencos-tibetanos.jpg",
  "acad.galeria.0.title": "Cuencos Tibetanos",
  "acad.galeria.0.cat":   "Sonido Sagrado",
  "acad.galeria.0.desc":  "Siete metales afinados. Jaume y Quico crean un campo sonoro que el cuerpo reconoce antes de que la mente lo comprenda. Cada semana del método abre con los cuencos.",

  "acad.galeria.1.img":   "/galeria/meditacion-guiada.jpg",
  "acad.galeria.1.title": "Meditaciones Guiadas",
  "acad.galeria.1.cat":   "Presencia",
  "acad.galeria.1.desc":  "Quico guía cada práctica. Jaume sostiene el espacio con música binaural. La meditación no como técnica, sino como estado natural recuperado.",

  "acad.galeria.2.img":   "/galeria/frecuencias-binaurales.jpg",
  "acad.galeria.2.title": "Frecuencias Binaurales",
  "acad.galeria.2.cat":   "Vibración",
  "acad.galeria.2.desc":  "Frecuencias Solfeggio y beats binaurales diseñados para inducir estado Alpha-Theta. Ciencia aplicada a la transformación interior.",

  "acad.galeria.3.img":   "/galeria/las-4-puertas.jpg",
  "acad.galeria.3.title": "Las 4 Puertas",
  "acad.galeria.3.cat":   "El Viaje",
  "acad.galeria.3.desc":  "Blanca, Roja, Azul, Arcoíris. Cuatro etapas de 12 semanas cada una. Un mapa interior que lleva del despertar a la integración total.",

  "acad.galeria.4.img":   "/galeria/canalizaciones.jpg",
  "acad.galeria.4.title": "Canalizaciones con Marga",
  "acad.galeria.4.cat":   "Transmisión",
  "acad.galeria.4.desc":  "Sesiones individuales con Marga. Un espacio de escucha donde lo que necesita ser visto, es visto. Disponible en puertas avanzadas del método.",

  "acad.galeria.5.img":   "/galeria/los-12-caminos.jpg",
  "acad.galeria.5.title": "Los 12 Caminos",
  "acad.galeria.5.cat":   "Sabiduría",
  "acad.galeria.5.desc":  "Dzogchen, El Cuarto Camino, UCDM, Cábala, Chamanismo, terapias alternativas varias… Doce tradiciones y enfoques que confluyen en cada Puerta del método.",

  // ──────────────────────────────────────────────────────────
  // NAVEGACIÓN COMPARTIDA
  // ──────────────────────────────────────────────────────────

  "nav.area":    "Mi Área",
  "nav.login":   "Área Alumnos",
  "nav.academy": "Academia",
};

export default CONTENT;
