export type Gate = "blanca" | "roja" | "azul" | "arcoiris";

export interface WeekBasic {
  n: number;
  gate: Gate;
  title: string;
}

export interface WeekDetail {
  n: number;
  gate: Gate;
  title: string;
  message: string;
  concepts: Array<[string, string]>;
  exerciseTitle: string;
  exerciseObjective: string;
  exerciseRef: string;
  exerciseSteps: string[];
  artTitle: string;
  artDesc: string;
  artSteps: string[];
  artReflection?: string;
}

export interface MultimediaItem {
  id: number;
  icon: string;
  title: string;
  cat: "Cuencos" | "Meditación" | "Frecuencias" | "Canalización" | "Teoría";
  duration: string;
  src?: string;
  free: boolean;
  gate: "blanca" | "roja" | "azul" | "arcoiris";
}

export interface PdfItem {
  name: string;
  url: string;
}

export const WEEKS: WeekBasic[] = [
  { n: 1, gate: "blanca", title: "El Precio Oculto de Vivir Acelerados" },
  { n: 2, gate: "blanca", title: "Cuando Ganar Ya No Es Suficiente" },
  { n: 3, gate: "blanca", title: "Cuerpo, Mente y Consciencia: Una Sola Unidad" },
  { n: 4, gate: "blanca", title: "El Ego en la Vida Cotidiana" },
  { n: 5, gate: "blanca", title: "La Emoción, el Error y la Presión como Camino" },
  { n: 6, gate: "blanca", title: "El Entrenamiento como Vía de Despertar" },
  { n: 7, gate: "blanca", title: "El Campo de Consciencia Compartido" },
  { n: 8, gate: "blanca", title: "Sonido, Vibración y Armonización del Sistema" },
  { n: 9, gate: "blanca", title: "Cuando el Sistema No Sostiene lo que Promete" },
  { n: 10, gate: "blanca", title: "El Límite como Punto de Despertar" },
  { n: 11, gate: "blanca", title: "Más Allá del Resultado: El Sentido del Camino" },
  { n: 12, gate: "blanca", title: "Integración de la Puerta Blanca" },
  { n: 13, gate: "roja", title: "Introducción a la Puerta Roja y la Energía" },
  { n: 14, gate: "roja", title: "El Sonido Primordial y los Mantras" },
  { n: 15, gate: "roja", title: "Los 6 Reinos del Samsara y la Gestión Emocional" },
  { n: 16, gate: "roja", title: "El Cuarto Camino - Recuerdo de Sí y Observación" },
  { n: 17, gate: "roja", title: "El Cuarto Camino - Trabajo sobre los Centros" },
  { n: 18, gate: "roja", title: "UCDM - La Paradoja de la Felicidad y el Perdón" },
  { n: 19, gate: "roja", title: "UCDM - Gestión Emocional y el Instante Santo" },
  { n: 20, gate: "roja", title: "Protocolos de Sonido - Purificar el Samsara" },
  { n: 21, gate: "roja", title: "Protocolos de Sonido - El Pilar del Medio" },
  { n: 22, gate: "roja", title: "Alquimia de la Energía - La Cruz Cabalística" },
  { n: 23, gate: "roja", title: "La Fórmula de la Felicidad - Aceptación" },
  { n: 24, gate: "roja", title: "Integración de la Puerta Roja" },
  { n: 25, gate: "azul", title: "Introducción a la Puerta Azul y la Mente" },
  { n: 26, gate: "azul", title: "La Mente según Diversas Tradiciones" },
  { n: 27, gate: "azul", title: "Dzogchen - La Mente Natural (Rigpa)" },
  { n: 28, gate: "azul", title: "La Metáfora del Espejo y la Visión No-Dual" },
  { n: 29, gate: "azul", title: "UCDM en la Puerta Azul - El Testigo Santo" },
  { n: 30, gate: "azul", title: "El Ser Consciente - Vivir con Presencia" },
  { n: 31, gate: "azul", title: "Protocolos de Sonido - Desintoxicación" },
  { n: 32, gate: "azul", title: "Objetos Sagrados y el Proceso de Liberación" },
  { n: 33, gate: "azul", title: "Manifestar la Fuerza Interior" },
  { n: 34, gate: "azul", title: "Transformación de la Mente para la Felicidad" },
  { n: 35, gate: "azul", title: "La Noche Oscura del Alma" },
  { n: 36, gate: "azul", title: "Integración de la Puerta Azul" },
  { n: 37, gate: "arcoiris", title: "Síntesis del Método TCT - Las Tres Puertas" },
  { n: 38, gate: "arcoiris", title: "La Alquimia del Ser" },
  { n: 39, gate: "arcoiris", title: "El Campo Invisible que Todos Sostenemos" },
  { n: 40, gate: "arcoiris", title: "Práctica Integrada - El Diario del Cuarto Camino" },
  { n: 41, gate: "arcoiris", title: "Práctica Integrada - El Diario del Perdón" },
  { n: 42, gate: "arcoiris", title: "Práctica Integrada - El Diario de la Mente Feliz" },
  { n: 43, gate: "arcoiris", title: "El Arte de la No-Interferencia" },
  { n: 44, gate: "arcoiris", title: "El Legado Invisible - La Vida como Servicio" },
  { n: 45, gate: "arcoiris", title: "La Comunicación desde la Fuente" },
  { n: 46, gate: "arcoiris", title: "Maestría en la Vida Cotidiana" },
  { n: 47, gate: "arcoiris", title: "El Ciclo Permanente - La Espiral de Transformación" },
  { n: 48, gate: "arcoiris", title: "Cierre y Continuación del Camino" },
];

export const ALL_WEEK_DETAILS: WeekDetail[] = [
  {
    n: 1,
    gate: "blanca",
    title: "El Precio Oculto de Vivir Acelerados",
    message: "Esta semana exploramos el estado de \"sueño en movimiento\" en el que vive la mayoría de la gente, un estado de acción constante pero sin presencia real. Analizamos cómo esta forma de vida conduce a la fragmentación del yo, donde la identidad se construye alrededor de roles y funciones, y el \"hacer\" sustituye al \"ser\".",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Deportista Consciente\", Cap. 1:"],
      ["El Sueño en Movimiento", "Actuar de forma automática, con la mente saltando de una cosa a otra, perdiendo la experiencia directa."],
      ["La Fragmentación del Yo", "La división interna en múltiples \"yoes\" (el yo del trabajo, el yo social, etc.) y la creencia de que somos uno de esos roles."],
      ["El Cuerpo como Espejo", "El cuerpo no miente. Tensiones, dolores y fatiga son a menudo reflejos de una desalineación interna y una falta de presencia."],
      ["El Ego como Guardián", "El ego protege una identidad construida y frágil. No hay que combatirlo, sino observarlo para que pierda su rigidez."]
    ],
    exerciseTitle: "Primer Reconocimiento de la Presencia",
    exerciseObjective: "Realizar una pausa consciente para reconocer la presencia que ya está aquí, sin fabricarla.",
    exerciseRef: "\"El Deportista Consciente\", Cap. 1.9.",
    exerciseSteps: [
      "En algún momento del día, detente por unos instantes. No intentes relajarte ni concentrarte.",
      "Simplemente observa: la respiración tal como es, las sensaciones del cuerpo, los pensamientos que aparecen y se van.",
      "Reconoce, sin buscarlo, que hay una  consciencia  que está percibiendo todo eso. No la analices.",
      "Permanece unos segundos sin hacer nada con ello. Un instante de presencia real transforma más que horas de acción inconsciente."
    ],
    artTitle: "El Mapa del Piloto Automático",
    artDesc: "Crear un mapa visual de tus automatismos diarios para observarlos desde la distancia.",
    artSteps: [
      "Toma una hoja grande y divide tu día en 3 franjas: mañana, tarde, noche.",
      "En cada franja escribe o dibuja las acciones que haces en modo automático.",
      "Elige un símbolo o color diferente para cada tipo de automatismo (mental, emocional, corporal).",
      "Al finalizar, observa el mapa desde lejos. ¿Qué ves? ¿Cuánto espacio ocupa la presencia real?",
      "Escribe una sola frase: «Lo que quiero observar esta semana es...»"
    ],
    artReflection: "¿Qué automatismos descubriste en tu mapa? ¿En qué franja del día la presencia ocupa menos espacio? ¿Qué sientes al verlo desde fuera, como observador?",
  },
  {
    n: 2,
    gate: "blanca",
    title: "Cuando Ganar Ya No Es Suficiente",
    message: "Exploramos el \"instante después\" del logro, ese momento de vacío que revela que el resultado externo no puede sostener el sentido de la vida de forma duradera. Analizamos la espiral de la \"búsqueda que no descansa\" (logro → alivio → vacío → nueva búsqueda) y el cansancio del sentido que esto genera.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Deportista Consciente\", Cap. 2:"],
      ["El Instante Después", "El vacío que sigue al éxito enseña sobre la naturaleza impermanente de lo condicionado."],
      ["El Yo que Nunca se Sacia", "La identidad construida sobre el hacer siempre necesita más para sentirse completa."],
      ["Del Logro a la Presencia", "El giro radical donde el sentido deja de buscarse en el resultado y comienza a encontrarse en la calidad de presencia de la acción."],
      ["La Verdadera Competición", "No es contra otros, sino contra nuestros propios automatismos y el olvido de la presencia."]
    ],
    exerciseTitle: "Habitar la Acción sin Buscar Completarte",
    exerciseObjective: "Realizar una acción importante desde la presencia, sin pedirle que defina tu identidad.",
    exerciseRef: "\"El Deportista Consciente\", Cap. 2.12.",
    exerciseSteps: [
      "Antes de una acción importante del día (una reunión, una conversación, una decisión), detente unos instantes.",
      "Reconoce el deseo de hacerlo bien y, si aparece, el miedo a fallar.",
      "Pregúntate en silencio: \"¿Puedo estar plenamente aquí, aunque el resultado sea incierto?\".",
      "Siente el cuerpo. Siente la respiración.",
      "Permite que la acción ocurra sin pedirle que te defina. Un solo gesto vivido desde la presencia vale más que mil acciones hechas desde la carencia."
    ],
    artTitle: "La Espiral del Logro",
    artDesc: "Visualizar la espiral de búsqueda-logro-vacío como diálogo entre el interior y el exterior.",
    artSteps: [
      "Dibuja una espiral en el centro de la hoja, desde el interior hacia afuera.",
      "En cada vuelta escribe un logro que hayas perseguido y la sensación que quedó después.",
      "Usa colores cálidos para el momento del logro y fríos para el instante posterior.",
      "En el centro deja un espacio en blanco. Escribe allí lo que realmente buscas.",
      "Observa el dibujo: ¿qué te dice sobre tu relación con los resultados?"
    ],
    artReflection: "¿Qué sensación quedó después de tu último logro importante? ¿La espiral te resultó familiar? ¿Dónde sientes en el cuerpo ese vacío que describe?",
  },
  {
    n: 3,
    gate: "blanca",
    title: "Cuerpo, Mente y Consciencia: Una Sola Unidad",
    message: "Esta semana abordamos la ilusión de la separación entre cuerpo, mente y consciencia. Comprendemos que no son partes que deban coordinarse, sino una sola realidad que se manifiesta de diferentes formas. Cuando esta unidad se fragmenta, el rendimiento se resiente y aparece el desgaste.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 3 y \"El Deportista Consciente\", Cap. 3:"],
      ["La Ilusión de la Separación", "Vivir fragmentados (pensar una cosa, sentir otra, hacer una tercera) es la fuente de gran parte del malestar cotidiano."],
      ["El Cuerpo como Expresión de la Totalidad", "Cada gesto y postura manifiesta el estado interior completo. Escuchar el cuerpo es habitarlo."],
      ["La Mente como Herramienta, no como Tirana", "El problema no es pensar, sino vivir dominados por el pensamiento, perdiendo la experiencia directa."],
      ["Consciencia", "El Elemento Olvidado:  Es el espacio vivo en el que todo ocurre. Recordarla no añade nada, sino que despierta la experiencia."]
    ],
    exerciseTitle: "Habitar la Unidad en el Movimiento",
    exerciseObjective: "Realizar una acción sencilla permitiendo que la unidad cuerpo-mente-consciencia se manifieste naturalmente.",
    exerciseRef: "\"El Ser Consciente\", Cap. 3.7.",
    exerciseSteps: [
      "Elige una acción sencilla del día: caminar, escribir, lavar los platos.",
      "Antes de empezar, siente el cuerpo completo, reconoce la respiración y observa la mente sin intervenir.",
      "Realiza la acción sin añadir nada. No busques hacerlo mejor, permite hacerlo presente.",
      "Observa si la calidad del gesto cambia, si el cuerpo se organiza solo, si el esfuerzo disminuye."
    ],
    artTitle: "El Árbol de la Unidad",
    artDesc: "Crear una imagen que represente la unidad de los tres niveles del ser: cuerpo, mente y consciencia.",
    artSteps: [
      "Dibuja un árbol. Las raíces representan el cuerpo, el tronco la mente y las ramas la consciencia.",
      "Pinta cada parte con colores que sientas como propios para cada nivel.",
      "Añade símbolos o palabras en cada zona que representen cómo vives ese nivel ahora.",
      "Observa si hay partes más elaboradas. ¿Cuál ha recibido más energía? ¿Cuál más atención?",
      "Escribe en la base: «Esta semana quiero nutrir...»"
    ],
    artReflection: "¿Qué colores o formas surgieron para representar cuerpo, mente y consciencia? ¿Hay tensión o armonía entre ellos en tu dibujo?",
  },
  {
    n: 4,
    gate: "blanca",
    title: "El Ego en la Vida Cotidiana",
    message: "El ego no es un enemigo, es una estructura necesaria. El conflicto surge de la identificación con él. Esta semana, aprendemos a observar el ego sin juicio, reconociendo sus patrones y miedos. La presión del día a día es un campo privilegiado para esta observación, ya que hace visible lo que normalmente se oculta.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 4 y \"El Deportista Consciente\", Cap. 4:"],
      ["Identificación", "Creer que somos nuestros pensamientos, emociones o historia personal. Esto vuelve la vida frágil y defensiva."],
      ["El Ego y el Miedo", "El ego vive del miedo a fallar, a no ser reconocido, a perder el control, que a menudo se disfraza de autoexigencia o necesidad de tener razón."],
      ["El Ego bajo Presión", "La presión no crea el ego, lo muestra. Por eso es un campo de observación tan valioso."],
      ["El Ego Observado desde la Presencia", "Cuando el ego es observado, pierde rigidez. Entre el impulso y la reacción aparece un espacio de libertad."]
    ],
    exerciseTitle: "Observar el Patrón sin Nombrarlo",
    exerciseObjective: "Observar una reacción egoica después de que ocurra, sin juicio ni análisis, para debilitar el automatismo.",
    exerciseRef: "\"El Ser Consciente\", Cap. 4.7.",
    exerciseSteps: [
      "Después de una situación que te haya activado (una discusión, una crítica, un conflicto), recuerda el momento.",
      "Observa la reacción interna: la dirección de la energía, la necesidad que apareció (controlar, defenderte, retirarte).",
      "No le pongas nombre. No intentes corregirlo. No lo justifiques.",
      "Simplemente permite que la memoria de la reacción esté ahí, sin convertirla en tu identidad. Lo que se observa sin juicio, pierde poder."
    ],
    artTitle: "El Retrato del Ego",
    artDesc: "Dar forma visual al ego-observador que actúa por detrás de tus acciones automáticas.",
    artSteps: [
      "Dibuja una figura que represente «tu ego». No es un juicio, es una exploración.",
      "¿Qué rasgos tiene? ¿Cómo viste? ¿Qué actitud tiene en el cuerpo?",
      "Escribe dentro de la figura 3 frases que el ego suele decirte.",
      "Ahora dibuja un pequeño observador tranquilo a su lado. ¿Cómo lo describes?",
      "¿Qué cambia cuando el observador está presente?"
    ],
    artReflection: "¿Qué aspecto de tu ego emergió más claramente en el retrato? ¿Lo reconoces en tu vida cotidiana? ¿Qué sientes al observarlo sin juzgarlo?",
  },
  {
    n: 5,
    gate: "blanca",
    title: "La Emoción, el Error y la Presión como Camino",
    message: "Cambiamos la mirada sobre la emoción, el error y la presión. En lugar de verlos como obstáculos a evitar o controlar, los reconocemos como manifestaciones naturales de la experiencia y como portales hacia una mayor presencia. El sufrimiento no nace de estas experiencias, sino de la forma en que nos relacionamos con ellas.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 5:"],
      ["La Emoción como Energía en Movimiento", "El problema no es sentir, sino identificarse. Cuando una emoción es reconocida sin interferencia, se completa y se disuelve."],
      ["El Error como Colapso de la Ilusión de Control", "El error interrumpe la narrativa del control y abre una puerta a la presencia desnuda, si no se vive desde la culpa o la defensa."],
      ["No-Rechazo y Autoliberación", "Rechazar la experiencia la fija. Reconocerla sin lucha permite que se libere por sí misma."]
    ],
    exerciseTitle: "Reconocer y Auto-liberar la Emoción",
    exerciseObjective: "Permitir que una emoción intensa se mueva y se disuelva sin interferencia mental.",
    exerciseRef: "\"El Ser Consciente\", Cap. 5.7.",
    exerciseSteps: [
      "La próxima vez que aparezca una emoción intensa, detente un instante.",
      "No la nombres ni la expliques. Simplemente siente su energía en el cuerpo. Observa dónde se manifiesta.",
      "Reconoce el espacio de consciencia en el que esa emoción está apareciendo.",
      "No hagas nada con ella. Permite que se mueva, cambie o se disuelva por sí sola."
    ],
    artTitle: "El Mapa Emocional del Cuerpo",
    artDesc: "Localizar en el cuerpo dónde habitan las emociones que aparecen bajo presión.",
    artSteps: [
      "Dibuja el contorno de un cuerpo humano en el centro de la hoja.",
      "Piensa en una situación de presión o error reciente.",
      "Señala con colores o formas en qué zonas del cuerpo sentiste esa emoción.",
      "Escribe el nombre de la emoción junto a cada zona.",
      "Observa el mapa completo: ¿el cuerpo ha sido un aliado o un territorio desconocido?"
    ],
    artReflection: "¿Dónde localizas más tensión en tu mapa corporal? ¿Qué emoción suele habitar ese lugar? ¿Qué necesita ser visto o liberado?",
  },
  {
    n: 6,
    gate: "blanca",
    title: "El Entrenamiento como Vía de Despertar",
    message: "La vida cotidiana, con su repetición, es el espejo más preciso de nuestra forma de estar en el mundo. El entrenamiento diario, ya sea físico, profesional o personal, se convierte en una práctica consciente. La disciplina deja de ser rigidez y se transforma en un compromiso con la presencia.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Deportista Consciente\", Cap. 7:"],
      ["La Repetición como Espejo", "Lo que hacemos cada día revela nuestros automatismos, resistencias y zonas de ausencia."],
      ["Entrenar sin Estar Presente", "El \"hacer mecánico\" produce resultados, pero también desgaste y desconexión."],
      ["La Disciplina Consciente", "No es una imposición externa, sino una alineación interna. No te obligas, te recuerdas."],
      ["El Cansancio como Señal", "A menudo no indica falta de descanso, sino desconexión prolongada."]
    ],
    exerciseTitle: "Entrenar como si Fuera la Primera Vez",
    exerciseObjective: "Romper el automatismo en una actividad habitual a través de la atención plena.",
    exerciseRef: "\"El Deportista Consciente\", Cap. 7.7.",
    exerciseSteps: [
      "Elige una actividad habitual que suelas hacer en automático (conducir, ducharte, una tarea repetitiva del trabajo).",
      "Durante un día, decide hacerla con una atención deliberada.",
      "Realízala un poco más despacio. Observa cada gesto, cada sensación.",
      "Permanece curioso, como si fuera la primera vez que lo haces. No busques cambiarla, solo obsérvala. La frescura no está en lo nuevo, sino en la atención."
    ],
    artTitle: "El Ritual en Detalle",
    artDesc: "Transformar una rutina mecánica en un acto sagrado de presencia a través del arte visual.",
    artSteps: [
      "Piensa en una rutina diaria que sueles hacer en automático (ducharte, comer, preparar el café).",
      "Dibuja esa rutina paso a paso como si fuera un ritual ceremonial.",
      "Usa símbolos, colores y detalles que la eleven a algo especial.",
      "¿Qué cambia cuando lo ves así? ¿Cómo se siente la diferencia entre hábito y ritual?",
      "Escribe debajo: «Esta semana realizaré este ritual con plena presencia»."
    ],
    artReflection: "¿Qué ritual transformaste en acto consciente esta semana? ¿Cómo cambió la experiencia al traerle presencia? ¿Qué detalles nunca habías percibido?",
  },
  {
    n: 7,
    gate: "blanca",
    title: "El Campo de Consciencia Compartido",
    message: "Nadie vive ni despierta aislado. La consciencia es relacional. Nuestras relaciones (familia, equipo, trabajo) son el camino, no un obstáculo. Cada persona influye en el \"campo invisible\" del grupo con su estado interno. La presencia no es solo un acto interior, es un acto relacional.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 8:"],
      ["El Mito del Individuo Aislado", "La vida siempre ocurre en relación. Pensamientos y emociones se contagian y amplifican en el campo colectivo."],
      ["El Ego Colectivo", "Grupos, familias e ideologías construyen identidades compartidas que ofrecen seguridad pero también rigidez."],
      ["La Comunicación como Práctica de Consciencia", "Escuchar sin preparar respuesta, permitir silencios, hablar desde lo verdadero. La comunicación consciente busca contacto, no convencer."]
    ],
    exerciseTitle: "Habitar el Campo Colectivo con Presencia",
    exerciseObjective: "Observar tu influencia en el campo relacional y practicar la presencia no impositiva.",
    exerciseRef: "\"El Ser Consciente\", Cap. 8.11.",
    exerciseSteps: [
      "En tu próxima interacción grupal (una reunión de trabajo, una cena familiar), toma un momento para observar el \"clima\" del encuentro.",
      "Reconoce tu propio estado interno (¿tensión, apertura, defensa?).",
      "Nota cómo tu estado influye en el ambiente y cómo el ambiente influye en ti.",
      "No intentes cambiar a nadie ni dirigir la situación. Simplemente, elige estar presente. Escucha más. Habla menos. La presencia es contagiosa cuando no intenta imponerse."
    ],
    artTitle: "El Campo Compartido",
    artDesc: "Visualizar el espacio invisible que nos conecta con los demás durante una interacción.",
    artSteps: [
      "Dibuja dos círculos que se solapan parcialmente (diagrama de Venn).",
      "En el círculo izquierdo escribe o dibuja lo que «traes tú» a una interacción (emociones, intenciones, estado).",
      "En el círculo derecho, lo que imaginas que trae el otro.",
      "En la zona de intersección, dibuja qué surge cuando ambos se encuentran de verdad.",
      "¿Cómo cambia la interacción cuando eres consciente de este campo compartido?"
    ],
    artReflection: "¿Cómo representaste tu campo de consciencia con los demás? ¿Qué conexiones te sorprendieron? ¿Dónde sientes más resonancia?",
  },
  {
    n: 8,
    gate: "blanca",
    title: "Sonido, Vibración y Armonización del Sistema",
    message: "El ser humano es un campo vibracional. El sonido actúa directamente sobre este campo, ordenando desde la vibración lo que la mente no puede corregir. Los cuencos tibetanos son herramientas de armonización profunda que facilitan la descarga de tensiones y el reordenamiento natural del sistema.",
    concepts: [
      ["Conceptos Clave", "Basado en \"TCT Puerta Blanca-Roja\", pág. 51:"],
      ["El Sonido como Vía Directa a la Presencia", "El sonido rompe la continuidad del diálogo interno y devuelve la atención al presente sin necesidad de interpretación."],
      ["Vibración y Coherencia", "El sonido influye en la respiración, el tono corporal y la regulación emocional, restableciendo la coherencia del sistema nervioso."],
      ["El Sonido como Práctica de No-Hacer", "Escuchar profundamente es una forma de no-hacer. La mente deja de intervenir y la consciencia se amplía."]
    ],
    exerciseTitle: "Equilibrar la Energía con Cuencos",
    exerciseObjective: "Utilizar el sonido de un cuenco para armonizar el campo energético.",
    exerciseRef: "\"TCT Puerta Blanca-Roja\", pág. 51.",
    exerciseSteps: [
      "Siéntate o túmbate en una posición cómoda.",
      "Toma un cuenco tibetano. Si no tienes, puedes usar una grabación de alta calidad.",
      "Percute o fricciona el cuenco suavemente. Cierra los ojos.",
      "En lugar de \"escuchar\" con los oídos, siente la vibración en tu cuerpo. Imagina que el sonido lava y limpia tu campo energético.",
      "Sigue el sonido hasta que se desvanezca por completo en el silencio. Permanece en ese silencio unos instantes."
    ],
    artTitle: "Mandala del Sonido",
    artDesc: "Crear un mandala que represente las frecuencias y vibraciones que resuenan en tu sistema.",
    artSteps: [
      "Dibuja un círculo grande y traza líneas desde el centro para dividirlo.",
      "En cada sección coloca un sonido, frecuencia o vibración que sientas en tu vida ahora.",
      "Usa colores que «suenen» a esas frecuencias.",
      "El centro del mandala: ¿qué frecuencia esencial quieres cultivar?",
      "Deja el mandala visible esta semana como recordatorio de la armonía que buscas."
    ],
    artReflection: "¿Qué sonidos o vibraciones representaste? ¿Hay zonas en tu cuerpo que aún no vibran libremente? ¿Qué color les darías?",
  },
  {
    n: 9,
    gate: "blanca",
    title: "Cuando el Sistema No Sostiene lo que Promete",
    message: "A veces, la herida no es personal, sino sistémica. Exploramos la \"herida invisible\" que se genera cuando un sistema (laboral, familiar, social) promete algo que no sostiene, creando una incoherencia que afecta a la identidad y la confianza del individuo.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Deportista Consciente\", Cap. 10:"],
      ["La Promesa como Acto de Poder", "Las promesas organizan la conducta, pero cuando no se sostienen en la realidad, generan pérdida de confianza."],
      ["La Herida Invisible", "Sensación persistente de no ser suficiente, miedo a fallar, desconfianza. La persona internaliza como culpa lo que es un fallo estructural."],
      ["Transformar la Herida sin Negarla", "Sanar no es borrar, es integrar. La herida reconocida puede volverse sensibilidad y comprensión."]
    ],
    exerciseTitle: "Distinguir el Hecho de la Herida",
    exerciseObjective: "Separar un evento objetivo de la interpretación identitaria y la herida emocional que generó.",
    exerciseRef: "\"El Deportista Consciente\", Cap. 10.11.",
    exerciseSteps: [
      "Piensa en una situación en la que te sentiste decepcionado o traicionado por un sistema o una persona.",
      "Escribe, de la forma más objetiva y concreta posible, el  hecho: qué se dijo, qué ocurrió. (Sin adjetivos, sin juicios, sin \"porqués\").",
      "A continuación, escribe qué apareció en ti a partir de ese hecho: las  emociones  (rabia, tristeza), los  pensamientos  (\"no soy válido\", \"no se puede confiar en nadie\"), las  reacciones corporales.",
      "Observa la diferencia entre el hecho externo y tu reacción interna. Reconoce que la herida no es el hecho en sí, sino la historia que te cuentas sobre él. Esto crea un espacio para no identificarte con la herida."
    ],
    artTitle: "El Sistema que Cruje",
    artDesc: "Dar forma visual a las tensiones del entorno y cómo te afectan energéticamente.",
    artSteps: [
      "Dibuja una estructura (edificio, árbol, red) que represente un sistema al que perteneces.",
      "Señala con colores dónde hay tensión, grietas o zonas que no sostienen.",
      "¿Qué parte de ese sistema te drena? ¿Cuál te nutre?",
      "Dibuja tu figura dentro del sistema: ¿dónde estás? ¿cómo está tu cuerpo?",
      "¿Qué quiere ser rediseñado? Esboza una versión más sostenible."
    ],
    artReflection: "¿Qué ves en tu mapa de grietas y fisuras? ¿Hay grietas que en realidad dejan pasar luz? ¿Cuál de ellas te habla más esta semana?",
  },
  {
    n: 10,
    gate: "blanca",
    title: "El Límite como Punto de Despertar",
    message: "El límite (agotamiento, enfermedad, bloqueo) no es un fracaso, es una señal y una puerta. Interrumpe la inercia y obliga a detenerse. La pausa impuesta, si se acepta conscientemente, se transforma en una práctica de escucha profunda que reordena todo el sistema.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 11:"],
      ["El Límite como Interrupción del Automatismo", "Detiene lo que no podía detenerse voluntariamente."],
      ["Cuando el Cuerpo Toma la Palabra", "La lesión o enfermedad no es castigo, es comunicación. Expresa lo que la mente no ha querido escuchar."],
      ["La Pausa como Práctica Consciente", "La pausa no es tiempo perdido, es espacio para sentir, escuchar y reorganizar."],
      ["Volver sin Regresar al Mismo Lugar", "Tras un límite, no se vuelve al punto anterior. Se vuelve distinto. El límite transforma."]
    ],
    exerciseTitle: "Escuchar el Límite sin Intentar Corregirlo",
    exerciseObjective: "Practicar la aceptación y la escucha frente a una limitación física o mental.",
    exerciseRef: "\"El Ser Consciente\", Cap. 11.8.",
    exerciseSteps: [
      "Busca un momento de quietud. Lleva la atención al cuerpo o a la zona donde sientas el límite (un dolor, cansancio, bloqueo mental).",
      "No intentes cambiar nada. No lo analices. No luches contra la sensación.",
      "En lugar de eso, \"escúchala\". Pregunta internamente: \"¿Qué está pidiendo ser escuchado aquí?\".",
      "Permanece con la sensación, ofreciéndole un espacio de presencia sin juicio. Escuchar es ya una forma de cuidado."
    ],
    artTitle: "La Topografía del Límite",
    artDesc: "Trazar visualmente los bordes y límites que el cuerpo o la vida te están mostrando.",
    artSteps: [
      "Dibuja un paisaje. El territorio que hay dentro es «lo que puedes sostener ahora». Lo que hay fuera, lo que está más allá de tus fuerzas.",
      "¿Cómo es la frontera entre ambos? ¿Dura, borrosa, dolorosa, clara?",
      "Dibuja dónde estás tú en ese paisaje.",
      "Escribe en el borde del territorio: «Lo que este límite me quiere enseñar es...»",
      "¿Qué tipo de terreno quieres cultivar dentro de tu territorio?"
    ],
    artReflection: "¿Dónde está tu límite en el dibujo? ¿Lo representaste como barrera o como umbral? ¿Qué hay al otro lado?",
  },
  {
    n: 11,
    gate: "blanca",
    title: "Más Allá del Resultado: El Sentido del Camino",
    message: "El camino auténtico conduce más allá del resultado. El resultado es una experiencia, no una identidad. El sentido no se construye, se reconoce en la coherencia, en la presencia y en la simplicidad de estar. El \"fracaso\" se integra como parte del camino y el \"éxito\" se vive sin apego.",
    concepts: [
      ["Conceptos Clave", "Basado en \"El Ser Consciente\", Cap. 12:"],
      ["El Resultado como Experiencia, no Identidad", "Cuando el resultado define quiénes somos, la vida se vuelve frágil. Cuando se vive como experiencia, informa, enseña y pasa."],
      ["El Sentido se Reconoce, no se Construye", "Aparece cuando dejamos de huir de lo que está ocurriendo y vivimos desde la presencia."],
      ["El Legado Invisible", "El legado más duradero no son los logros, sino la forma en que escuchamos, atravesamos la dificultad y ofrecimos presencia a otros."]
    ],
    exerciseTitle: "Recordar sin Buscar",
    exerciseObjective: "Experimentar la simplicidad de la presencia sin intención de lograr o mejorar nada.",
    exerciseRef: "\"El Ser Consciente\", Cap. 12.7.",
    exerciseSteps: [
      "No hagas nada especial. Siéntate o permanece de pie unos instantes.",
      "Siente el cuerpo. La respiración. El espacio que te rodea.",
      "No busques un estado de presencia. No intentes comprender nada.",
      "Simplemente permite que lo que ya está aquí se reconozca solo.",
      "Reconoce que ya estás aquí. Eso es suficiente."
    ],
    artTitle: "El Legado Invisible",
    artDesc: "Crear una imagen que represente el impacto que tu presencia deja en los demás, más allá del éxito visible.",
    artSteps: [
      "Dibuja tu figura en el centro, pero pequeña.",
      "A tu alrededor, dibuja líneas o formas que representen la influencia que emanas simplemente siendo quien eres.",
      "¿Qué cualidades irradia tu presencia? Escríbelas a lo largo de esas líneas.",
      "En los bordes exteriores, escribe los nombres de personas que han recibido algo de ti sin que fuera un «logro» planificado.",
      "¿Qué legado invisible estás construyendo ahora mismo?"
    ],
    artReflection: "¿Qué símbolo elegiste para el Ser que ya no necesita demostrar? ¿Te resulta familiar o todavía distante? ¿Cómo se siente en el cuerpo?",
  },
  {
    n: 12,
    gate: "blanca",
    title: "Integración de la Puerta Blanca",
    message: "Esta semana la dedicamos a integrar los aprendizajes de la Puerta Blanca. Repasamos los conceptos clave: la diferencia entre acción mecánica y acción consciente, la observación del ego sin identificación, y el habitar el cuerpo como ancla de la presencia. El objetivo es consolidar la práctica de la \"pausa consciente\" como herramienta fundamental para la vida diaria. Reflexión Final de la Puerta Bl",
    concepts: [
      ["Conceptos Clave", "Integración de la Puerta Blanca, Semanas 1-12:"],
      ["La Pausa Consciente", "Detenerse voluntariamente para reconectar con la presencia antes de actuar. Es la herramienta central de la Puerta Blanca."],
      ["Acción Consciente vs. Mecánica", "La diferencia entre actuar en automático y actuar desde la consciencia plena del momento presente."],
      ["El Cuerpo como Ancla", "Volver al cuerpo es volver al ahora. La sensación física es la puerta más directa para salir del automatismo."],
      ["El Ego Observado", "Observar los patrones del ego sin identificarse con ellos crea un espacio de libertad entre el impulso y la reacción."]
    ],
    exerciseTitle: "de Integración: El Día Consciente",
    exerciseObjective: "Aplicar las herramientas de la Puerta Blanca de forma integrada a lo largo de un día.",
    exerciseRef: "",
    exerciseSteps: [
      "Al Despertar:  Antes de levantarte, dedica un minuto a \"habitar tu cuerpo\". Siente el contacto con la cama, la respiración, la energía presente.",
      "Durante una Tarea Rutinaria:  Elige una tarea (ej. lavarte los dientes) y realízala con plena atención, como si fuera la primera vez (Ejercicio Semana 6).",
      "En una Interacción Social:  Practica la escucha sin preparar respuesta (Ejercicio Semana 7). Observa tu campo emocional y el del grupo.",
      "Cuando Surja una Emoción Fuerte:  Haz una pausa y reconoce la emoción en el cuerpo sin juzgarla (Ejercicio Semana 5).",
      "Antes de Dormir:  Dedica un minuto a \"recordar sin buscar\" (Ejercicio Semana 11). Simplemente, reconoce que estás aquí, concluyendo el día. Anota en un diario cualquier descubrimiento o dificultad. La clave no es la perfección, sino la intención de recordar. Puerta Roja: Purificación (Semanas 13-24)"
    ],
    artTitle: "La Integración: Pintar el Día Consciente",
    artDesc: "Sintetizar visualmente un día vivido con las herramientas de la Puerta Blanca.",
    artSteps: [
      "Divide una hoja en cuatro cuadrantes: Amanecer, Mediodía, Tarde, Noche.",
      "En cada cuadrante dibuja o escribe un momento del día donde hayas aplicado presencia.",
      "¿Qué colores, emociones y sensaciones tienes en cada momento?",
      "Traza una línea suave que conecte los cuatro momentos: esa es tu «línea de presencia» del día.",
      "¿Qué imagen quieres llevar contigo al comenzar la Puerta Roja?"
    ],
    artReflection: "¿Qué permanece después de 12 semanas en tu obra? ¿Qué ha cambiado en cómo te relacionas con tu presencia cotidiana?",
  },
  {
    n: 13,
    gate: "roja",
    title: "Introducción a la Puerta Roja y la Energía",
    message: "La Puerta Roja se asocia con la \"voz-energía\", el centro energético de la garganta (chakra Vishuddha), simbolizado por la sílaba \"A\" y el color rojo. Comprendemos que todo es vibración, sonido y frecuencia. Los bloqueos energéticos, originados en el transgeneracional, el proyecto sentido o nuestra vida cronológica, se manifiestan como desequilibrios en nuestro campo energético antes de afectar al ",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Puerta de la Voz-Energía", "El centro de la garganta como portal para la expresión y transformación de la energía."],
      ["Vibración, Sonido y Frecuencia", "Entender que somos seres vibracionales y que el sonido es una herramienta poderosa para la armonización."],
      ["El Origen de los Bloqueos", "Introducción a los conceptos de transgeneracional, proyecto sentido y bioshock como fuentes de desequilibrios energéticos."],
      ["Un Sonido Relajado, una Mente Libre", "La conexión directa entre nuestro estado vibracional interno y nuestra paz mental."]
    ],
    exerciseTitle: "Sentir la Vibración de la Voz",
    exerciseObjective: "Conectar con el centro energético de la garganta a través de la propia voz.",
    exerciseRef: "",
    exerciseSteps: [
      "Siéntate cómodamente con la espalda recta. Cierra los ojos y realiza tres respiraciones profundas.",
      "Coloca suavemente las yemas de los dedos en tu garganta.",
      "Toma una inhalación profunda y, al exhalar, emite un sonido \"Aaaaaaah\" largo y sostenido, en un tono que te resulte cómodo y natural.",
      "Concéntrate en la vibración que sientes bajo tus dedos. Siente cómo el sonido se origina y se expande desde ese centro.",
      "Repite varias veces, explorando diferentes tonos y volúmenes. Observa cómo cambia la sensación.",
      "Finaliza permaneciendo en silencio, sintiendo la resonancia que queda en tu cuerpo."
    ],
    artTitle: "El Mapa de la Energía",
    artDesc: "Explorar visualmente el flujo de tu energía vital: dónde se acumula y dónde se drena.",
    artSteps: [
      "Dibuja un cuerpo o una forma que te represente.",
      "Con colores cálidos (rojo, naranja, dorado), pinta las zonas donde la energía fluye con fuerza.",
      "Con colores fríos o apagados, las zonas donde la energía se estanca o escapa.",
      "Dibuja flechas que indiquen el movimiento de la energía.",
      "¿Qué quiere reorganizarse para que la energía fluya con más integridad?"
    ],
    artReflection: "¿Qué forma tomó tu energía en el mandala? ¿Hay zonas que fluyen y zonas que se bloquean? ¿Qué observas sin juzgar?",
  },
  {
    n: 14,
    gate: "roja",
    title: "El Sonido Primordial y los Mantras",
    message: "Los mantras son \"tecnologías de la mente\" diseñadas para liberar la mente del pensamiento discursivo a través de la vibración. Estudiamos la diferencia entre mantra y afirmación, y exploramos mantras de diversas tradiciones (budista, chamánica, cabalística) como herramientas para elevar nuestra frecuencia vibratoria y enfocar la intención.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Mantra", "Del sánscrito man (mente) y tra (liberar). Sonidos que crean altas vibraciones para enfocar la mente y catalizar cambios."],
      ["Sonido Primordial (OM/A)", "El sonido del cual emergen todas las demás vibraciones. La sílaba A es fundamental en la Puerta Roja."],
      ["Mantras y Deidades", "Muchos mantras son invocaciones que nos conectan con arquetipos o cualidades energéticas específicas (compasión, sanación, prosperidad)."],
      ["Transmisión Energética", "En algunas tradiciones, la plena activación de un mantra requiere una transmisión de un maestro que ya lo ha realizado."]
    ],
    exerciseTitle: "Meditación con el Mantra \"Om Mani Padme Hum\"",
    exerciseObjective: "Cultivar la compasión y purificar la mente a través del mantra de Avalokiteshvara.",
    exerciseRef: "\"TCT Puerta Blanca-Roja\", pág. 111.",
    exerciseSteps: [
      "Siéntate en una postura de meditación cómoda.",
      "Comienza con unas respiraciones conscientes para calmar la mente.",
      "Empieza a recitar el mantra \"Om Mani Padme Hum\", ya sea en voz alta o mentalmente.",
      "Mientras lo recitas, puedes visualizar una luz blanca y pura que emana de tu corazón y se expande, llenando todo tu ser y extendiéndose a todos los seres sintientes, deseándoles paz y liberación del sufrimiento.",
      "No te preocupes por la pronunciación perfecta. La intención y la repetición son lo más importante."
    ],
    artTitle: "El Mantra Hecho Imagen",
    artDesc: "Transformar un mantra o intención poderosa en una imagen simbólica que anclé en la memoria.",
    artSteps: [
      "Elige un mantra, afirmación o frase que resuene contigo ahora.",
      "Sin pensar demasiado, dibuja la primera imagen que venga al escuchar esa frase.",
      "Añade colores, texturas y símbolos que refuercen su significado.",
      "Escribe el mantra alrededor de la imagen.",
      "Coloca el dibujo en un lugar visible esta semana."
    ],
    artReflection: "¿Qué sensaciones surgieron al trazar el sonido primordial? ¿Qué parte del cuerpo vibró más? ¿Qué palabra o tono quisiste plasmar?",
  },
  {
    n: 15,
    gate: "roja",
    title: "Los 6 Reinos del Samsara y la Gestión Emocional",
    message: "Desde la cosmología budista, exploramos los 6 Reinos o \"Lokas\" como representaciones de estados mentales dominados por una emoción específica (orgullo, celos, deseo, ignorancia, apego, ira). Comprendemos que, aunque vivimos en el reino humano, transitamos por estos estados constantemente. La purificación consiste en reconocer estas emociones en nosotros y, a través de la práctica, disminuir su pod",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Samsara", "El ciclo de existencia condicionada, caracterizado por el sufrimiento y la impermanencia."],
      ["Los 6 Reinos", "Dioses (Orgullo), Semi-dioses (Celos), Humanos (Deseo), Animales (Ignorancia), Pretas (Apego), Infiernos (Ira). Estados mentales que habitamos temporalmente."],
      ["La Preciada Vida Humana", "El reino humano equilibra el placer y el sufrimiento, permitiendo la práctica espiritual y la posibilidad de la iluminación."],
      ["Purificación de los Lokas", "El objetivo no es eliminar los reinos, sino dejar de ser arrastrados por las emociones que los gobiernan."]
    ],
    exerciseTitle: "Meditación de los 6 Reinos con Soporte",
    exerciseObjective: "Observar y comenzar a purificar la influencia de una de las emociones de los 6 reinos.",
    exerciseRef: "\"TCT Puerta Blanca-Roja\", pág. 77-79.",
    exerciseSteps: [
      "Elige uno de los 6 reinos para trabajar durante esta sesión (ej. Reino de los Pretas - Apego).",
      "Siéntate frente a una vela. Percute un cuenco tibetano tres veces y realiza tres respiraciones profundas.",
      "Paso B (5 min):  Con los ojos abiertos, enfoca tu atención en la llama de la vela. Deja que tu mente se calme.",
      "Paso C (5 min):  Cierra los ojos. Dirige tu mirada interna hacia la localización corporal del reino elegido (Pretas: zona del abdomen/plexo solar). Respira hacia esa zona y simplemente observa la emoción del apego en tu vida. ¿A qué te aferras? ¿Qué miedos surgen al pensar en soltar? Observa sin jui",
      "Paso D (5 min):  Abre los ojos y vuelve a enfocar la atención en la vela, pero ahora manteniendo la consciencia de lo que has observado en el paso C. Observa qué cambia en tu percepción."
    ],
    artTitle: "Los Seis Mundos Interiores",
    artDesc: "Mapear los distintos estados emocionales que habitas a lo largo del día como mundos distintos.",
    artSteps: [
      "Dibuja seis burbujas o islas en tu hoja.",
      "Asigna a cada una un estado emocional que conozcas bien: angustia, ansia, rabia, indiferencia, calma, dicha.",
      "¿Cómo es el paisaje de cada burbuja? Dibuja detalles en cada una.",
      "¿Cuál habitas más frecuentemente? Márcala.",
      "Dibuja un puente desde donde estás hacia el estado que más te nutre."
    ],
    artReflection: "¿En qué reino emocional te has movido más esta semana? ¿Cómo lo representaste? ¿Qué te dice ese reino sobre tu estado interior?",
  },
  {
    n: 16,
    gate: "roja",
    title: "El Cuarto Camino - Recuerdo de Sí y Observación",
    message: "Profundizamos en las herramientas prácticas del Cuarto Camino. El ser humano es una \"máquina\" que funciona con patrones automáticos. El trabajo consiste en despertar de este automatismo a través de la \"auto-observación sin juicio\" y el \"recuerdo de sí\".",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Máquina Humana", "Nuestros pensamientos, emociones y acciones son mayormente reacciones mecánicas a estímulos internos y externos."],
      ["Auto-observación sin Juicio", "La práctica de observar nuestros patrones sin intentar cambiarlos, justificarlos o criticarlos."],
      ["Recuerdo de Sí", "El acto de ser consciente de uno mismo y de lo que se hace al mismo tiempo. Una atención dividida que rompe la identificación."],
      ["Choques Conscientes", "Interrupciones deliberadas del automatismo para crear una chispa de consciencia y salir del sueño despierto."]
    ],
    exerciseTitle: "Pausas de Consciencia",
    exerciseObjective: "Introducir \"choques conscientes\" en la rutina diaria para romper el automatismo.",
    exerciseRef: "Anexo VI de \"TCT Puerta Azul\", Semana 1.",
    exerciseSteps: [
      "Programa una alarma en tu teléfono para que suene 3 veces a lo largo del día en momentos inesperados.",
      "Cuando suene la alarma, detén lo que estás haciendo por 30 segundos.",
      "Pregúntate: \"¿Dónde estoy? ¿Qué estoy haciendo? ¿Cuál es mi estado interno (pensamiento, emoción, sensación corporal)?\".",
      "Observa sin juzgar. No necesitas cambiar nada.",
      "Después de los 30 segundos, continúa con tu actividad. El objetivo es simplemente crear una breve interrupción en el \"sueño despierto\"."
    ],
    artTitle: "El Observador Silencioso",
    artDesc: "Dar forma visual al «recordarse a sí mismo» como práctica de presencia.",
    artSteps: [
      "Dibuja tu figura haciendo una actividad cotidiana.",
      "A un lado, dibuja un pequeño testigo silencioso que observa la escena sin juzgar.",
      "¿Qué diferencia hay en la calidad de la acción cuando el observador está presente?",
      "¿Cómo representas visualmente ese estado de «recordarse a sí mismo»?",
      "Escribe bajo el dibujo: «Hoy elegiré recordarme al menos en estos tres momentos: ...»"
    ],
    artReflection: "¿Cuántas capas tienes en tu cebolla del observador? ¿Cuál fue la más difícil de dibujar? ¿Qué encontraste en el centro?",
  },
  {
    n: 17,
    gate: "roja",
    title: "El Cuarto Camino - Trabajo sobre los Centros",
    message: "Gurdjieff describe al ser humano como un carruaje con tres centros principales: Intelectual (la mente pensante), Emocional (sentimientos y reacciones afectivas) y Motor-Instintivo (cuerpo y funciones automáticas). Normalmente, estos centros trabajan de forma desequilibrada. El trabajo consiste en observarlos y armonizarlos.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Centro Intelectual", "Su trabajo correcto es pensar, analizar y planificar. Su trabajo incorrecto es el parloteo mental incesante y la preocupación."],
      ["Centro Emocional", "Su trabajo correcto es sentir emociones superiores. Su trabajo incorrecto es la reactividad de las emociones negativas."],
      ["Armonización de los Centros", "La práctica de observar qué centro está activo en cada momento y evitar que uno haga el trabajo del otro."]
    ],
    exerciseTitle: "Transformación Emocional",
    exerciseObjective: "Observar una emoción negativa sin identificarse y negarse a expresarla mecánicamente.",
    exerciseRef: "Anexo VI de \"TCT Puerta Azul\", Semana 6.",
    exerciseSteps: [
      "La próxima vez que sientas una emoción negativa (irritación, impaciencia, tristeza), haz una pausa.",
      "Reconoce  la emoción internamente: \"Estoy sintiendo irritación\".",
      "No te identifiques:  Recuerda que \"tú\" no eres la irritación; eres la consciencia que la observa.",
      "No la expreses mecánicamente:  Toma la decisión consciente de no actuar desde esa emoción (no levantar la voz, no hacer un gesto brusco).",
      "Observa la energía:  Siente la energía de la emoción en tu cuerpo sin hacer nada con ella. Observa cómo, al no ser alimentada por la reacción, pierde fuerza y se transforma."
    ],
    artTitle: "Los Centros del Ser",
    artDesc: "Explorar visualmente los centros de energía (intelectual, emocional, corporal) y su equilibrio.",
    artSteps: [
      "Dibuja un cuerpo dividido en tres zonas: cabeza, pecho/corazón, vientre/pelvis.",
      "¿Qué color y textura tiene cada centro ahora mismo en tu experiencia?",
      "¿Qué centro domina en tu vida cotidiana? ¿Cuál está más silenciado?",
      "Dibuja una imagen que represente el flujo entre los tres centros cuando están en equilibrio.",
      "¿Qué práctica concreta activarías esta semana para equilibrar el centro menos usado?"
    ],
    artReflection: "¿Qué centro (intelectual, emocional, motor) domina tu obra? ¿Hay equilibrio o desequilibrio? ¿Qué sientes al verlo?",
  },
  {
    n: 18,
    gate: "roja",
    title: "UCDM - La Paradoja de la Felicidad y el Perdón",
    message: "Iniciamos la integración de Un Curso de Milagros. La felicidad, según UCDM, no se encuentra en el mundo, que es una proyección de nuestro pensamiento de separación. La verdadera felicidad es nuestro estado natural en Dios, y se recupera deshaciendo la culpa a través del perdón. El perdón no es condonar un acto, sino reconocer que lo que creíamos que nos hicieron nunca ocurrió realmente en el nivel",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Paradoja de la Felicidad según UCDM", "Buscamos la felicidad donde no se puede encontrar. La verdadera felicidad es un recuerdo de nuestra Identidad en Dios."],
      ["El Perdón como Clave de la Felicidad", "El perdón es la herramienta para liberar la mente de la culpa y el resentimiento, que son los únicos obstáculos para la paz."],
      ["El Testigo Santo", "Invitar al Espíritu Santo a observar nuestros pensamientos de juicio y ataque sin condenarlos."],
      ["El Perdón como Camino Directo", "Aplicar la fórmula del perdón a cualquier situación que nos perturbe la paz."]
    ],
    exerciseTitle: "El Diario del Perdón",
    exerciseObjective: "Aplicar el proceso de perdón de UCDM a una situación específica.",
    exerciseRef: "Anexo V de \"TCT Puerta Azul\".",
    exerciseSteps: [
      "Elige una persona o situación que te cause resentimiento o malestar.",
      "Escribe en un diario: \"Me siento [emoción] por [situación/persona] porque creo que [juicio/ataque]\".",
      "Reconoce que estos pensamientos son del ego y te están robando la paz.",
      "Di (mental o en voz alta): \"Espíritu Santo, veo esto de otra manera. Elijo la paz en lugar de este conflicto. Te entrego estos pensamientos de juicio para que sean corregidos\".",
      "Visualiza a la persona (y a ti mismo) envuelta en una luz sanadora, reconociendo la inocencia que ambos compartís como Hijos de Dios."
    ],
    artTitle: "El Cuadro del Perdón",
    artDesc: "Crear una imagen que simbolice el acto de dejar ir el peso del pasado a través del perdón.",
    artSteps: [
      "Dibuja una carga pesada (una piedra, una mochila, una cadena) que cargas contigo.",
      "¿Qué representa? No necesitas escribirlo si no quieres; basta con sentirlo.",
      "Ahora dibuja esa misma imagen pero transformada: la carga disuelta, liberada, o convertida en algo nuevo.",
      "¿Qué queda en tu cuerpo cuando imaginas soltar ese peso?",
      "Escribe o dibuja lo que aparece en ese espacio de libertad."
    ],
    artReflection: "¿Qué emoción apareció en el cofre que no esperabas? ¿Cómo se transformó al ser nombrada y observada en la obra?",
  },
  {
    n: 19,
    gate: "roja",
    title: "UCDM - Gestión Emocional y el Instante Santo",
    message: "UCDM enseña que todo dolor emocional proviene de un pensamiento de ataque o separación. La gestión emocional no consiste en analizar la emoción, sino en llevar el pensamiento que la causó a la corrección del Espíritu Santo. El \"Instante Santo\" es la práctica de retirar nuestra atención del pasado y el futuro para abrir un momento presente al Amor de Dios.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Proceso UCDM para Emociones", "Cuando surge el dolor, reconocer que es una señal de haber elegido al ego como maestro. El único remedio es cambiar de maestro."],
      ["Meditación del Instante Santo", "Una práctica para aquietar la mente y unirse al Espíritu Santo en el ahora, donde no hay problemas."],
      ["Elección sobre Circunstancia", "La clave de la felicidad constante es recordar que siempre podemos elegir la paz, sin importar las circunstancias externas."],
      ["Amor sobre Miedo", "Cada momento es una elección entre el sistema del ego (miedo) o el del Espíritu Santo (amor)."]
    ],
    exerciseTitle: "Meditación \"El Instante Santo\"",
    exerciseObjective: "Experimentar un momento de paz y conexión más allá del tiempo.",
    exerciseRef: "Anexo V de \"TCT Puerta Azul\".",
    exerciseSteps: [
      "Busca un lugar tranquilo donde no te interrumpan por 5-10 minutos.",
      "Cierra los ojos y di: \"Tengo la voluntad de dejar a un lado todos mis problemas, planes y juicios por un momento. Deseo experimentar este Instante Santo contigo, Espíritu Santo\".",
      "No intentes vaciar tu mente. Simplemente, retira tu interés de los pensamientos que surjan. Déjalos pasar sin engancharte.",
      "Enfoca tu atención en la sensación de paz o quietud que pueda surgir, por sutil que sea.",
      "Descansa en este espacio, sabiendo que en este instante no te falta nada y estás perfectamente a salvo en el Amor de Dios."
    ],
    artTitle: "El Instante Santo",
    artDesc: "Capturar visualmente un momento de paz absoluta que hayas experimentado, por breve que fuera.",
    artSteps: [
      "Recuerda un instante reciente en que te sentiste en paz, aunque solo durara un segundo.",
      "Dibuja ese instante con todos sus detalles: ¿dónde estabas? ¿qué veías? ¿qué sentías?",
      "Usa colores que transmitan esa cualidad de paz.",
      "¿Qué condiciones internas y externas crearon ese instante?",
      "Crea un símbolo pequeño que te recuerde a ese instante. Puedes dibujarlo en cualquier momento para regresar."
    ],
    artReflection: "¿Qué instante santo encontraste en tu línea del tiempo esta semana? ¿Cómo lo representaste? ¿Qué lo hizo diferente?",
  },
  {
    n: 20,
    gate: "roja",
    title: "Protocolos de Sonido - Purificar el Samsara",
    message: "Volvemos a los protocolos de sonido, esta vez con una comprensión más profunda de la energía emocional. El protocolo \"Purificar la Rueda del Samsara\" utiliza los cuencos tibetanos para trabajar directamente sobre los centros energéticos asociados a los 6 Reinos, ayudando a liberar las emociones negativas estancadas.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Masaje Vibracional", "El uso de cuencos directamente sobre el cuerpo o en su campo energético para inducir una relajación profunda y un reequilibrio vibracional."],
      ["Fase 1 - Percusión", "Utiliza golpes continuos para despertar y romper los bloqueos energéticos en cada centro."],
      ["Fase 2 - Fricción", "Utiliza un sonido sostenido para limpiar y armonizar la energía liberada."],
      ["Intención Consciente", "El terapeuta y el receptor mantienen una intención clara de purificación durante toda la sesión."]
    ],
    exerciseTitle: "Autotratamiento con un Cuenco",
    exerciseObjective: "Utilizar un cuenco para limpiar el propio campo energético.",
    exerciseRef: "Adaptado del protocolo \"Rueda del Samsara\".",
    exerciseSteps: [
      "Siéntate cómodamente. Coloca un cuenco tibetano en la palma de tu mano izquierda.",
      "Comienza a friccionar el cuenco con la baqueta en tu mano derecha, generando un sonido continuo.",
      "Lentamente, mueve el cuenco alrededor de tu cuerpo, a unos 10-15 cm de distancia. Comienza por la cabeza y desciende lentamente hacia los pies.",
      "Presta especial atención a las zonas donde sientas tensión o pesadez. Permanece en esas áreas un poco más, permitiendo que la vibración disuelva el bloqueo.",
      "Visualiza que cualquier energía densa se desprende de tu cuerpo y es absorbida por la tierra.",
      "Termina colocando el cuenco sobre tu corazón y percutiéndolo suavemente tres veces."
    ],
    artTitle: "El Protocolo del Sonido",
    artDesc: "Visualizar el efecto purificador del sonido y la vibración sobre el sistema emocional.",
    artSteps: [
      "Dibuja tu silueta. A su alrededor, dibuja ondas concéntricas como cuando una piedra cae al agua.",
      "Cada onda representa una capa de vibración: ¿cuáles traen armonía? ¿cuáles tensión?",
      "Colorea las ondas sanadores de un tono que te transmita paz.",
      "En el centro de la silueta, ¿qué imagen permanece cuando el sonido disuelve lo innecesario?",
      "Escribe: «El sonido que más me sana es...»"
    ],
    artReflection: "¿Qué sonido dejó más huella en tu tejido emocional? ¿De qué color lo pintarías? ¿Dónde lo sientes en el cuerpo?",
  },
  {
    n: 21,
    gate: "roja",
    title: "Protocolos de Sonido - El Pilar del Medio",
    message: "Integramos la sabiduría de la Cábala con el sonido. El \"Pilar del Medio\" es el eje energético central del Árbol de la Vida, que corresponde a nuestra columna vertebral y a los chakras principales. Este protocolo utiliza cuencos afinados con notas específicas para activar y equilibrar cada uno de los centros (Sefirot) de este pilar, promoviendo la alineación entre el cielo y la tierra dentro de nos",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Pilar del Medio", "El eje central de energía que conecta la consciencia cósmica (Keter) con la manifestación terrenal (Malkuth)."],
      ["Sefirot", "Emanaciones o atributos divinos en el Árbol de la Vida, que también son centros de consciencia en el ser humano."],
      ["Correspondencia Nota-Centro", "Cada Sefira del Pilar del Medio resuena con una nota musical específica, que se utiliza para activarla."],
      ["Nombres de Poder", "La recitación de los nombres divinos asociados a cada Sefira potencia el efecto de la vibración sonora."]
    ],
    exerciseTitle: "Meditación del Pilar del Medio",
    exerciseObjective: "Activar y equilibrar el eje energético central a través de la visualización y el sonido (mantra).",
    exerciseRef: "\"TCT Puerta Blanca-Roja\", pág. 135-137.",
    exerciseSteps: [
      "Ponte de pie, con los pies separados a la anchura de los hombros. Cierra los ojos.",
      "Visualiza una esfera de luz blanca brillante por encima de tu cabeza (Keter). Vibra el nombre  \"E-HE-IEH\"  (pronunciado \"Ejeié\"). Siente cómo la luz desciende a tu cabeza.",
      "Visualiza la luz descendiendo hasta tu garganta (Daat). Vibra el nombre  \"YEHOVA-ELOHIM\".",
      "Visualiza la luz descendiendo a tu corazón (Tiferet). Vibra el nombre  \"YEHOVA-ELOAH-VA-DAATH\". Siente cómo la luz se expande desde tu corazón.",
      "Visualiza la luz descendiendo a tu zona genital/base de la columna (Yesod). Vibra el nombre  \"SHADDAI-EL-CHAI\"."
    ],
    artTitle: "El Pilar del Medio",
    artDesc: "Explorar visualmente tu eje central, el pilar de equilibrio que te sostiene entre los extremos.",
    artSteps: [
      "Dibuja una figura vertical en el centro de la hoja: un árbol, una columna, un rayo de luz.",
      "A la izquierda, escribe o dibuja un extremo: exceso, rigidez, acumulación.",
      "A la derecha, el otro extremo: carencia, vacío, dispersión.",
      "El pilar del medio es el punto de equilibrio. ¿Cómo lo describes? ¿Qué cualidades tiene?",
      "¿Cuándo en tu vida has habitado ese pilar? Recuerda y dibuja esa sensación."
    ],
    artReflection: "¿Qué pilar de tu ser necesita más equilibrio? ¿Cómo lo representaste en la escultura de sonido? ¿Qué sostiene tu centro?",
  },
  {
    n: 22,
    gate: "roja",
    title: "Alquimia de la Energía - La Cruz Cabalística",
    message: "La Cruz Cabalística es un ritual que establece un espacio sagrado y equilibra el microcosmos (el ser humano) con el macrocosmos (el universo). A través de la visualización de la luz y la vibración de nombres de poder, se traza una cruz de luz en el campo energético, anclando las energías divinas y creando un centro de poder y equilibrio.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["ATAH (A Ti)", "Se traza la luz desde arriba hasta el pecho, reconociendo la Fuente Divina."],
      ["MALKUTH (El Reino)", "Se baja la luz hasta los pies, anclando la divinidad en la tierra."],
      ["VE-GEVURAH (Y el Poder)", "Se traza la luz hasta el hombro derecho, invocando la fuerza y el rigor."],
      ["VE-GEDULAH (Y la Gloria)", "Se traza la luz hasta el hombro izquierdo, invocando la misericordia y la expansión."]
    ],
    exerciseTitle: "Realizar la Cruz Cabalística",
    exerciseObjective: "Centrar y proteger el campo energético.",
    exerciseRef: "\"TCT Puerta Blanca-Roja\", pág. 138-140.",
    exerciseSteps: [
      "Ponte de pie mirando al Este. Realiza varias respiraciones profundas.",
      "Visualiza una luz brillante sobre tu cabeza. Con tu dedo índice derecho, toca tu frente y vibra  \"ATAH\".",
      "Baja la mano hasta tu pecho, visualizando el rayo de luz descendiendo. Vibra  \"MALKUTH\".",
      "Toca tu hombro derecho, visualizando un rayo de luz desde el centro del pecho. Vibra  \"VE-GEVURAH\".",
      "Toca tu hombro izquierdo, visualizando el rayo de luz cruzando tu pecho. Vibra  \"VE-GEDULAH\"."
    ],
    artTitle: "La Cruz Alquímica",
    artDesc: "Crear una imagen simbólica de la transformación de las energías a través de la práctica espiritual.",
    artSteps: [
      "Dibuja una cruz en el centro de la hoja.",
      "Arriba: el espíritu/consciencia. Abajo: la materia/cuerpo. Izquierda: lo que sueltas. Derecha: lo que integras.",
      "Pinta cada cuadrante con colores y símbolos que representen esa cualidad en tu vida ahora.",
      "En el centro de la cruz, donde todo se encuentra, ¿qué imagen surge?",
      "Contempla la imagen completa: ¿qué alquimia está ocurriendo en tu vida?"
    ],
    artReflection: "¿Qué emoción transformaste esta semana? ¿Cómo es diferente la llama después de haberla observado sin huir de ella?",
  },
  {
    n: 23,
    gate: "roja",
    title: "La Fórmula de la Felicidad - Aceptación",
    message: "Sintetizamos los aprendizajes de las Puertas Blanca y Roja en la \"Fórmula Esencial de la Felicidad\". La felicidad no es una meta, sino la resonancia de un ser en equilibrio. Esta semana nos enfocamos en los dos primeros componentes: Aceptación (el fruto de la Puerta Blanca) y Propósito (el fruto de la Puerta Roja).",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Aceptación", "La paz que surge de estar presente en el ahora y aceptar la realidad tal como es, sin resistencia ni lucha."],
      ["Propósito", "Surge cuando la energía emocional ya no está atrapada en el pasado o en el futuro, y puede dirigirse hacia una acción con sentido."]
    ],
    exerciseTitle: "Clarificando el Propósito",
    exerciseObjective: "Conectar con un sentido de propósito que vaya más allá de las metas del ego.",
    exerciseRef: "",
    exerciseSteps: [
      "Dedica 15 minutos a una escritura reflexiva.",
      "Pregúntate: \"Si el miedo y la necesidad de aprobación no fueran un factor, ¿a qué dedicaría mi energía?\".",
      "Escribe sobre las actividades que te hacen sentir vivo, conectado y expansivo.",
      "Reflexiona: \"¿Cómo puedo traer más de esta energía a mi vida diaria, incluso en pequeños actos?\".",
      "El propósito no tiene que ser una gran misión. Puede ser tan simple como \"ser un espacio de paz para los demás\" o \"crear belleza en mi entorno\"."
    ],
    artTitle: "La Fórmula de mi Felicidad",
    artDesc: "Crear un mapa visual y personal de qué ingredientes construyen tu estado de bienestar auténtico.",
    artSteps: [
      "Dibuja un círculo grande y etiquétalo «mi bienestar auténtico».",
      "Alrededor, dibuja burbujas más pequeñas con los ingredientes que realmente nutren ese estado.",
      "¿Cuáles dependen de ti? ¿Cuáles de factores externos? Diferéncialos con colores.",
      "¿Hay ingredientes que faltan? Dibújalos con un trazo más suave, como invitaciones.",
      "¿Qué pequeño paso esta semana te acerca a esa fórmula?"
    ],
    artReflection: "¿Qué color representa tu campo emocional esta semana? ¿Hay zonas de luz que no esperabas encontrar en tu mapa?",
  },
  {
    n: 24,
    gate: "roja",
    title: "Integración de la Puerta Roja",
    message: "Esta semana consolidamos las prácticas de purificación emocional. Repasamos la transformación de las emociones a través de la observación (Cuarto Camino), el perdón (UCDM) y la vibración (Sonido). El objetivo es desarrollar una maestría emocional que no se basa en el control, sino en la capacidad de permitir que la energía fluya sin que nos secuestre. Reflexión Final de la Puerta Roja: La purifica",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Observación sin Identificación", "Observar las emociones negativas como energías que pasan, sin actuar mecánicamente desde ellas."],
      ["El Perdón como Práctica Diaria", "Herramienta sistemática para disolver el resentimiento y la culpa que bloquean la paz interior."],
      ["Vibración como Alquimia", "El sonido de los cuencos actúa sobre el campo energético, transformando la energía emocional densa en claridad."],
      ["Maestría Emocional", "No se basa en el control, sino en permitir que la energía fluya sin secuestrarnos."]
    ],
    exerciseTitle: "de Integración: El Alquimista Emocional",
    exerciseObjective: "Utilizar una herramienta diferente para cada tipo de perturbación emocional.",
    exerciseRef: "",
    exerciseSteps: [
      "Para la Irritación o la Ira (Cuarto Camino):  La próxima vez que te sientas irritado, practica la \"no-expresión mecánica\". Reconoce la energía, pero elige no actuarla. Obsérvala hasta que se transforme.",
      "Para el Resentimiento o la Culpa (UCDM):  Si un pensamiento sobre el pasado te perturba, realiza el \"Diario del Perdón\". Entrega el juicio al Espíritu Santo y elige la paz.",
      "Para la Ansiedad o el Estrés General (Sonido):  Cuando te sientas abrumado, dedica 5 minutos a escuchar un cuenco tibetano o a cantar un mantra (como \"OM\"). Permite que la vibración re-sintonice tu sistema nervioso. La práctica consiste en reconocer qué herramienta es más adecuada para cada momento,"
    ],
    artTitle: "El Umbral de la Puerta Roja",
    artDesc: "Celebrar visualmente el cruce del umbral al finalizar la Puerta Roja e integrar lo aprendido.",
    artSteps: [
      "Dibuja una puerta o umbral. A la izquierda: lo que traes de la Puerta Blanca. A la derecha: lo que has descubierto en la Roja.",
      "¿Qué has purificado? ¿Qué has soltado? Dibújalo encima del umbral, en el aire.",
      "¿Con qué cualidad nueva cruzas hacia la Puerta Azul? Dibuja esa cualidad como un objeto, animal o luz que llevas contigo.",
      "Escribe en el marco de la puerta una palabra que defina este tránsito.",
      "Coloca el dibujo en un lugar visible como símbolo de completación."
    ],
    artReflection: "¿Qué has aprendido de la Puerta Roja sobre tu relación con la energía y las emociones? ¿Qué patrón quieres seguir observando?",
  },
  {
    n: 25,
    gate: "azul",
    title: "Introducción a la Puerta Azul y la Mente",
    message: "La Puerta Azul corresponde al centro del corazón, simbolizado por la sílaba \"HUM\" y el color azul. Aquí, \"mente\" no se refiere a la mente ordinaria (pensamientos, intelecto), sino a la naturaleza real de la mente: un estado que nunca fue creado, que está más allá de todas las creencias y filosofías. El objetivo es aprender a \"estar relajado y reposar en nuestra condición natural\".",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Puerta de la Mente (Corazón)", "El centro del corazón como sede de la mente no-dual o Rigpa."],
      ["Visión Dualista vs. Visión Total 360", "Pasar de una percepción unidireccional a una visión panorámica y no-dual donde todo está interconectado."],
      ["Ma-rigpa vs. Rigpa", "Ma-rigpa es la ignorancia o el no-reconocimiento de nuestra verdadera condición. Rigpa es el conocimiento directo, la sabiduría primordial."],
      ["Visión Circular", "Todos los conceptos y prácticas de las tres puertas están interconectados. La Puerta Azul integra y culmina las dos anteriores."]
    ],
    exerciseTitle: "La Pregunta \"¿Quién Soy?\"",
    exerciseObjective: "Utilizar la autoindagación para ir más allá de las identificaciones superficiales.",
    exerciseRef: "\"TCT Puerta Azul Anexos\", pág. 99.",
    exerciseSteps: [
      "Siéntate en silencio por unos minutos.",
      "Pregúntate internamente: \"¿Quién soy yo?\".",
      "Observa las respuestas que surgen automáticamente: \"Soy [tu nombre]\", \"Soy [tu profesión]\", \"Soy un padre/madre\", \"Soy mis pensamientos\", \"Soy mis emociones\".",
      "A cada respuesta, reconoce: \"Tengo este rol/pensamiento/cuerpo, pero no soy solo esto\".",
      "Continúa preguntando: \"¿Quién soy yo más allá de todo eso? ¿Quién es el que observa todo esto?\"."
    ],
    artTitle: "El Espacio de la Mente",
    artDesc: "Explorar visualmente la naturaleza del espacio mental: dónde hay claridad y dónde hay niebla.",
    artSteps: [
      "Divide la hoja en zonas de luz y zonas de sombra o niebla.",
      "La luz representa claridad mental, el espacio consciente. La niebla: automatismo, confusión, ruido.",
      "¿Cuánto espacio ocupa cada una en tu mente cotidiana?",
      "En la zona de luz, ¿qué surge? Dibuja imágenes, palabras, insights.",
      "¿Cómo crearías más espacio de luz en tu vida diaria? Esboza una respuesta visual."
    ],
    artReflection: "¿Qué geometría surgió en tu mandala de consciencia? ¿Hay formas que se repiten? ¿Qué te dice eso sobre tu mente?",
  },
  {
    n: 26,
    gate: "azul",
    title: "La Mente según Diversas Tradiciones",
    message: "Para comprender la naturaleza de la mente, primero debemos entender cómo la hemos conceptualizado. Esta semana exploramos diferentes perspectivas sobre la mente: desde la psicología convencional y transpersonal hasta las visiones radicales del hinduismo y los filósofos Jiddu y U.G. Krishnamurti. Esto nos ayuda a ver que nuestras ideas sobre la mente son construcciones, no la realidad última.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Psicología Convencional", "La mente como producto del cerebro: procesos cognitivos de percepción, memoria y pensamiento."],
      ["Psicología Transpersonal", "La mente como algo que trasciende el ego, con niveles pre-egoicos, egoicos y transpersonales."],
      ["Hinduismo", "La mente con sus diferentes niveles que deben purificarse para realizar el verdadero Ser."],
      ["Jiddu Krishnamurti", "La mente está condicionada por el pasado. El verdadero problema es la mente misma, no los problemas que ella crea."]
    ],
    exerciseTitle: "Observando el Condicionamiento",
    exerciseObjective: "Tomar consciencia de cómo la mente está condicionada por el pasado.",
    exerciseRef: "",
    exerciseSteps: [
      "Elige una opinión o creencia fuerte que tengas (política, social, personal).",
      "Siéntate en silencio y rastrea el origen de esa creencia. ¿De dónde vino? ¿La aprendiste de tu familia, de la escuela, de la cultura?",
      "Observa las emociones que están asociadas a esa creencia. ¿Qué sientes cuando alguien la desafía?",
      "Pregúntate: \"¿Quién sería yo sin esta creencia?\".",
      "El objetivo no es cambiar la creencia, sino ver que es algo adquirido, una construcción del pasado, no una verdad absoluta sobre quién eres."
    ],
    artTitle: "La Mente según las Tradiciones",
    artDesc: "Crear un collage visual de las distintas metáforas de la mente que han resonado en esta semana.",
    artSteps: [
      "Elige 3 metáforas de la mente que hayas encontrado (el espejo, el océano, el cielo, etc.).",
      "Dibuja cada una en un panel de la hoja.",
      "¿Cuál resuena más contigo ahora mismo? ¿Por qué?",
      "Crea tu propia metáfora de la mente: dibuja algo que para ti capture su esencia.",
      "Escribe debajo: «La naturaleza de mi mente es como...»"
    ],
    artReflection: "¿Qué símbolo nació para representar tu naturaleza del Ser? ¿Es familiar o sorprendente? ¿Qué sientes al contemplarlo?",
  },
  {
    n: 27,
    gate: "azul",
    title: "Dzogchen - La Mente Natural (Rigpa)",
    message: "El Dzogchen ofrece una visión radical: la mente en su estado natural (Rigpa) es ya pura, lúcida y libre. No es algo que se deba crear o alcanzar, sino reconocer. La \"mente ordinaria\" no es la mente conceptual y ocupada, sino este estado primordial que está siempre presente, como un cielo claro detrás de las nubes de pensamientos y emociones.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Mente Ordinaria/Natural (Rigpa)", "La conciencia primordial, pura, luminosa, espontánea y no-conceptual. Es innata e inmutable."],
      ["Obstáculos a la Mente Natural", "Los conceptos, las emociones negativas y los apegos oscurecen el reconocimiento de Rigpa, pero no pueden manchar su naturaleza."],
      ["La Iluminación como Reconocimiento", "La iluminación no es un estado futuro, sino la realización de nuestra verdadera naturaleza, que es la mente natural, aquí y ahora."]
    ],
    exerciseTitle: "Descansar en la Conciencia",
    exerciseObjective: "Tener un atisbo de la mente natural más allá de los pensamientos.",
    exerciseRef: "Adaptado de las enseñanzas de Dzogchen.",
    exerciseSteps: [
      "Siéntate cómodamente y cierra los ojos.",
      "Permite que tus pensamientos vengan y vayan sin prestarles atención. No los sigas, no los rechaces.",
      "Lleva tu atención no a los pensamientos, sino al  espacio  en el que los pensamientos aparecen.",
      "Date cuenta de que hay una conciencia silenciosa y espaciosa que es consciente de los pensamientos, pero que no es los pensamientos.",
      "Descansa en esa conciencia abierta y receptiva. No intentes \"hacer\" nada. Simplemente, sé esa conciencia que observa."
    ],
    artTitle: "El Rigpa: La Mente Natural",
    artDesc: "Dar forma visual al estado de Rigpa — la consciencia pura, sin artificios ni capas.",
    artSteps: [
      "Busca un momento de quietud antes de empezar.",
      "Dibuja el cielo. No el cielo con nubes, sino la naturaleza del cielo: vasto, abierto, luminoso.",
      "Ahora añade nubes (pensamientos, emociones, distracciones). ¿El cielo cambia o solo se vela?",
      "¿Cómo representas visualmente el regreso al cielo despejado?",
      "Escribe una línea: «Mi mente natural es...»"
    ],
    artReflection: "¿Cómo representaste el espacio entre estímulo y respuesta? ¿Lo pintaste pequeño o amplio? ¿Qué quisieras que fuera?",
  },
  {
    n: 28,
    gate: "azul",
    title: "La Metáfora del Espejo y la Visión No-Dual",
    message: "La metáfora del espejo es central en el Dzogchen para explicar la naturaleza de la mente. La mente natural es como un espejo: claro, puro y capaz de reflejar cualquier cosa sin ser afectado por los reflejos. Los pensamientos, emociones y percepciones son los reflejos. El error (ma-rigpa) es olvidarse de que somos el espejo e identificarnos con los reflejos.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Espejo", "Representa la mente natural, pura e inmutable."],
      ["Los Reflejos", "Simbolizan los pensamientos, emociones y percepciones, que son impermanentes y cambiantes."],
      ["La Práctica", "Consiste en \"limpiar el espejo\" (eliminar los oscurecimientos de la ignorancia y el apego) para reconocer su claridad inherente."],
      ["Beneficios", "Comprender esta analogía nos ayuda a observar nuestros pensamientos sin identificarnos con ellos, reduciendo el sufrimiento."]
    ],
    exerciseTitle: "Ser el Espejo",
    exerciseObjective: "Experimentar la des-identificación de los pensamientos usando la metáfora del espejo.",
    exerciseRef: "",
    exerciseSteps: [
      "Siéntate en meditación.",
      "Visualiza tu mente como un espejo perfectamente limpio y brillante.",
      "Observa cómo los pensamientos, las imágenes y las sensaciones aparecen como reflejos en la superficie del espejo.",
      "Nota que el espejo no juzga los reflejos. No se aferra a los \"buenos\" ni rechaza los \"malos\". Simplemente, refleja.",
      "Cuando aparezca un pensamiento, nómbralo internamente como \"reflejo\" y déjalo pasar.",
      "Identifícate con el espejo, no con los reflejos. Siente la cualidad de calma, claridad e imperturbabilidad del espejo mismo."
    ],
    artTitle: "El Espejo sin Distorsión",
    artDesc: "Explorar visualmente la percepción sin filtros del ego — ver la realidad como es.",
    artSteps: [
      "Dibuja un espejo en el centro. ¿Qué refleja cuando el ego lo contamina? Dibuja esas distorsiones.",
      "Ahora dibuja el mismo espejo limpio y claro. ¿Qué ve cuando no hay filtros?",
      "¿Cuál es la diferencia entre las dos imágenes?",
      "¿Qué tendría que cambiar para que tu espejo interior estuviera más limpio?",
      "Escribe: «Lo que quiero ver con más claridad esta semana es...»"
    ],
    artReflection: "¿Dónde habita el silencio en tu mapa sonoro? ¿Hay zonas de ruido interno que no habías visto? ¿Qué pide ser silenciado?",
  },
  {
    n: 29,
    gate: "azul",
    title: "UCDM en la Puerta Azul - El Testigo Santo",
    message: "Llevamos los principios de UCDM a su nivel más profundo. El \"Testigo Santo\" es la perspectiva del Espíritu Santo en nuestra mente, que observa el mundo del ego sin juicio y con compasión. El objetivo final es trascender la observación y recordar nuestra Unidad con Dios y con toda la Creación. La felicidad no es aceptar \"lo que es\" en el mundo de la ilusión, sino recordar \"lo que siempre ha sido\" e",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Testigo Santo", "La perspectiva del Espíritu Santo que observa el mundo del ego sin juicio y con compasión."],
      ["Corrección de Distorsiones", "UCDM corrige las distorsiones cognitivas reconociendo que solo el Amor es real."],
      ["Solo el Amor es Real", "Práctica para retirar la creencia en la realidad del miedo, el ataque y el sufrimiento."],
      ["Unidad sobre Separación", "La separación es una ilusión. Aplicar consistentemente el principio de que solo la unidad es verdadera."]
    ],
    exerciseTitle: "Meditación \"Solo el Amor es Real\"",
    exerciseObjective: "Retirar la fe en el sistema de pensamiento del ego y descansar en la certeza del Amor.",
    exerciseRef: "Anexo V de \"TCT Puerta Azul\".",
    exerciseSteps: [
      "Siéntate en silencio y trae a la mente una situación de miedo o conflicto.",
      "Observa los pensamientos y emociones asociados a ella.",
      "Ahora, afirma con convicción: \"Esto no es real. Es una sombra del pasado. Solo el Amor es real\".",
      "Visualiza una luz dorada que representa el Amor de Dios disolviendo la situación de miedo.",
      "Repite la lección de UCDM: \"Puedo elegir la paz en lugar de esto\".",
      "Descansa en la sensación de paz que surge al soltar la creencia en el miedo."
    ],
    artTitle: "El Testigo Santo",
    artDesc: "Dar forma visual a la cualidad del Testigo Santo — el observador sin juicio, puro amor.",
    artSteps: [
      "Dibuja tu figura en una situación difícil o de conflicto.",
      "Ahora dibuja, desde arriba o a un lado, el Testigo Santo: una presencia amorosa que observa todo sin juzgar.",
      "¿Cómo cambia la escena cuando el Testigo está presente?",
      "¿Qué siente el Testigo hacia la figura que está en dificultad? Represéntalo visualmente.",
      "Escribe: «Hoy me miraré con los ojos del Testigo en estos momentos: ...»"
    ],
    artReflection: "¿Qué palabras colocaste en las raíces de tu árbol de creencias? ¿Cuáles nutren? ¿Cuáles ya no sirven?",
  },
  {
    n: 30,
    gate: "azul",
    title: "El Ser Consciente - Vivir con Presencia",
    message: "Esta semana nos sumergimos en la esencia del libro \"El Ser Consciente\". La verdadera práctica espiritual no ocurre en el retiro, sino en medio de la vida real: en el trabajo, en las relaciones, en la dificultad. La presencia no es algo que se añade, sino que se recuerda. El objetivo es habitar la vida sin huir de ella ni idealizarla, encontrando el despertar en lo ordinario.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Presencia en la Acción", "El sentido se encuentra en la calidad de presencia con la que se vive cada acción, no en el resultado."],
      ["Flow y Acción sin Esfuerzo", "Cuando dejamos de interferir con el control mental, la acción se ordena sola y surge desde una inteligencia más profunda."],
      ["El Esfuerzo como Señal de Desalineación", "El esfuerzo psicológico excesivo es una señal de lucha interna y olvido de la presencia."],
      ["La Vida como Práctica Consciente", "Cada gesto, conversación y decisión es una oportunidad para recordar."]
    ],
    exerciseTitle: "Una Sola Cosa a la Vez",
    exerciseObjective: "Combatir la multitarea y la fragmentación de la atención, cultivando la presencia en una sola acción.",
    exerciseRef: "Anexo II de \"El Ser Consciente\".",
    exerciseSteps: [
      "Elige una actividad para los próximos 15 minutos (responder un correo, leer un informe, preparar una comida).",
      "Comprométete a hacer  solo eso  durante ese tiempo.",
      "Si tu mente divaga o sientes el impulso de hacer otra cosa (revisar el teléfono, pensar en la siguiente tarea), nótalo amablemente y trae tu atención de vuelta a la única tarea presente.",
      "No lo hagas con tensión, sino con una elección calmada y deliberada.",
      "Observa cómo la simplicidad de hacer una sola cosa ordena la mente y profundiza la calidad de la acción."
    ],
    artTitle: "El Ser en Acción",
    artDesc: "Capturar visualmente qué significa actuar desde el Ser, no desde el ego.",
    artSteps: [
      "Dibuja dos imágenes paralelas de la misma acción: una realizada desde el ego (urgencia, miedo, tensión) y otra desde el Ser (fluidez, presencia, apertura).",
      "¿Cómo cambia el cuerpo, la expresión, el entorno en cada imagen?",
      "¿Qué colores y formas aparecen en cada una?",
      "¿Qué acciones de esta semana quieres realizar desde el Ser?",
      "Marca en tu calendario tres momentos donde lo practicarás."
    ],
    artReflection: "¿Qué ves en el espejo que te refleja el otro? ¿Es cómodo o incómodo? ¿Qué parte de ti reconoces en esa imagen?",
  },
  {
    n: 31,
    gate: "azul",
    title: "Protocolos de Sonido - Desintoxicación",
    message: "Aplicamos los protocolos de sonido más avanzados para la Puerta Azul. El \"Masaje Vibracional de Desintoxicación\" es un protocolo exhaustivo para limpiar el cuerpo físico y energético a través de la percusión y fricción sistemática. El \"Masaje para Despertar la Memoria Ancestral\" utiliza notas y mantras específicos para conectar con la sabiduría profunda que reside en nuestro ADN espiritual.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Desintoxicación Vibracional", "El sonido como medio para liberar toxinas físicas y energéticas acumuladas en los tejidos y el campo áurico."],
      ["Memoria Ancestral", "Llevamos en nosotros una sabiduría innata que puede despertarse a través de frecuencias específicas."],
      ["Sonido y Mantra", "La combinación del cuenco con los mantras Me Veo, Me Reconozco, Me Perdono, Me Amo potencia la sanación."]
    ],
    exerciseTitle: "Despertar la Memoria Ancestral (Adaptado)",
    exerciseObjective: "Realizar una meditación de autosanación y conexión con la sabiduría interna.",
    exerciseRef: "\"TCT Puerta Azul Anexos\", pág. 80-83.",
    exerciseSteps: [
      "Siéntate o túmbate. Coloca tus manos sobre tu corazón.",
      "Respira profundamente y, con cada exhalación, repite internamente el mantra:  \"Me Veo\". Siente que te ves a ti mismo con compasión.",
      "Continúa respirando y cambia el mantra a:  \"Me Reconozco\". Reconoce tu luz, tu fuerza y tu divinidad.",
      "Cambia el mantra a:  \"Me Perdono\". Perdónate por cualquier juicio o error, liberando toda culpa.",
      "Finalmente, cambia el mantra a:  \"Me Amo\". Siente un amor incondicional que nace desde tu corazón y se expande por todo tu ser."
    ],
    artTitle: "La Desintoxicación del Ruido",
    artDesc: "Visualizar el proceso de silenciar el ruido mental y emocional para acceder a la claridad.",
    artSteps: [
      "Dibuja un espacio caótico y ruidoso (líneas, formas superpuestas, colores chillones).",
      "Ahora, en el mismo papel, crea un camino de silencio que atraviesa el caos.",
      "Al final del camino, ¿qué espacio encuentras?",
      "¿Qué prácticas concretas son ese camino para ti? Escríbelas a lo largo del camino.",
      "¿Cómo es la sensación de llegar al silencio después del ruido?"
    ],
    artReflection: "¿Qué puerta de percepción aparece en tu obra? ¿Qué hay al otro lado? ¿Te da miedo o curiosidad cruzarla?",
  },
  {
    n: 32,
    gate: "azul",
    title: "Objetos Sagrados y el Proceso de Liberación",
    message: "Los objetos sagrados (cuencos, mandalas, cristales, estatuillas) actúan como puentes para conectar con estados superiores de conciencia. El Tagdrol (\"liberación a través del contacto\") es un método del budismo tibetano que utiliza estos objetos como catalizadores para despertar recuerdos del alma y liberar bloqueos kármicos. El poder no está en el objeto, sino en nuestra capacidad de resonar con l",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Tagdrol", "Liberación a través del contacto, la visión o el sonido de objetos sagrados."],
      ["El Proceso de 5 Fases", "Reconocimiento, Consagración, Comunicación Sagrada, Liberación e Integración."],
      ["Mecanismos de Sanación", "Los objetos actúan a nivel psicológico, energético (reequilibrio de chakras) y espiritual (reconexión con el Yo Superior)."],
      ["Creación de un Altar Personal", "Un altar es un espacio físico dedicado a anclar nuestra intención espiritual y a trabajar con nuestros objetos sagrados."]
    ],
    exerciseTitle: "El Diálogo con el Objeto Sagrado",
    exerciseObjective: "Establecer una comunicación intuitiva con un objeto personal para recibir guía.",
    exerciseRef: "Anexo III de \"TCT Puerta Azul\", pág. 132.",
    exerciseSteps: [
      "Elige un objeto que tenga un significado especial para ti (un cristal, una joya, una foto, una figura).",
      "Limpia energéticamente el objeto (puedes pasarlo por el humo de incienso o salvia, o usar el sonido de un cuenco).",
      "Siéntate en silencio, sostén el objeto en tus manos y cierra los ojos.",
      "Sincroniza tu respiración con el objeto, imaginando que inhalas su esencia y exhalas tu energía hacia él.",
      "Pregunta mentalmente: \"¿Qué mensaje tienes para mí en este momento de mi vida?\"."
    ],
    artTitle: "Los Objetos Sagrados",
    artDesc: "Crear una naturaleza muerta simbólica de los objetos que sostienen tu práctica espiritual.",
    artSteps: [
      "Dibuja o describe los objetos que tienen valor espiritual o simbólico para ti (no por precio, sino por significado).",
      "¿Qué historia hay detrás de cada uno? Escríbela en pocas palabras cerca de cada dibujo.",
      "¿Cómo te ayudan en tu práctica? ¿Qué cualidad te recuerdan?",
      "¿Falta algún objeto que quisieras incorporar? Dibuja su espacio.",
      "Contempla el conjunto: ¿qué altar interior estás construyendo?"
    ],
    artReflection: "¿Qué paisaje interior emergió en tu meditación visual? ¿Hay zonas que nunca habías explorado? ¿Qué te dicen?",
  },
  {
    n: 33,
    gate: "azul",
    title: "Manifestar la Fuerza Interior",
    message: "El verdadero poder no es el control externo, sino la maestría interior que surge de la conexión con nuestra fuente. Esta fuerza se manifiesta como calma en el caos, decisiones claras y creatividad espontánea. Las prácticas de esta semana se centran en disolver los obstáculos (identificación con el ego, creencias limitantes) y anclarnos en el poder del ahora.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Poder Auténtico", "No es dominio, sino maestría interior. Surge del autoconocimiento y la conciencia expandida."],
      ["Las Tres Fuentes del Poder", "Presencia Consciente, Intuición Profunda y Coherencia Interna (alineación de pensamiento, emoción y acción)."],
      ["Anclaje en el Poder Presencial", "Desarrollar una estabilidad interna que no depende de las circunstancias externas."]
    ],
    exerciseTitle: "Expansión de Conciencia \"El Círculo del Yo Soy\"",
    exerciseObjective: "Experimentar la sensación de unidad con toda la existencia, disolviendo los límites del ego.",
    exerciseRef: "Anexo II de \"TCT Puerta Azul\", pág. 124.",
    exerciseSteps: [
      "Siéntate en meditación y visualiza un punto de luz brillante en el centro de tu corazón.",
      "Con cada respiración, permite que esa luz se expanda, llenando primero todo tu cuerpo.",
      "Continúa expandiendo la luz más allá de tu cuerpo, hasta que llene la habitación, luego el edificio, la ciudad...",
      "Sigue expandiendo tu conciencia hasta que abarque todo el planeta, el sistema solar y finalmente, el cosmos entero.",
      "Permanece en esta sensación de ser el espacio vasto y silencioso que contiene todo el universo."
    ],
    artTitle: "La Fuerza desde el Centro",
    artDesc: "Explorar visualmente la diferencia entre la fuerza del ego y la fuerza que emerge del centro interior.",
    artSteps: [
      "Dibuja dos figuras: una que ejerce fuerza desde la tensión y el control, otra que lo hace desde la raíz y la presencia.",
      "¿Cómo es la postura de cada una? ¿Cómo sostiene el suelo?",
      "¿Qué cualidades tiene la segunda fuerza que no tiene la primera?",
      "¿En qué áreas de tu vida estás usando cada tipo de fuerza?",
      "Escribe: «Esta semana elegiré la fuerza del centro en...»"
    ],
    artReflection: "¿Qué parte de tu sombra encontraste en el autorretrato? ¿Tiene un nombre? ¿Qué necesita ser aceptado sin juicio?",
  },
  {
    n: 34,
    gate: "azul",
    title: "Transformación de la Mente para la Felicidad",
    message: "La felicidad no es algo que se obtiene, sino algo que se reconoce cuando la mente deja de obstaculizarla. Esta semana integramos prácticas específicas para reestructurar la mente y cultivar las virtudes que generan felicidad de forma natural: gratitud, perdón, aceptación y presencia.",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Paradoja de la Felicidad", "La felicidad es el estado natural de una mente en calma, no el resultado de condiciones externas."],
      ["El Proceso RAIN (Tara Brach)", "Una técnica para gestionar emociones: Reconocer, Aceptar, Investigar, No-identificación."],
      ["Tonglen (Dar y Recibir)", "Práctica tibetana para transformar el sufrimiento en compasión, inspirando el dolor y exhalando paz."],
      ["Fórmula Esencial", "Felicidad = Aceptación + Propósito + Conexión."]
    ],
    exerciseTitle: "El Proceso RAIN para una Emoción Difícil",
    exerciseObjective: "Aplicar un método mindfulness para relacionarse con una emoción difícil de forma compasiva.",
    exerciseRef: "Anexo IV de \"TCT Puerta Azul\", pág. 146.",
    exerciseSteps: [
      "Cuando surja una emoción difícil (miedo, enfado, tristeza), haz una pausa.",
      "R - Reconocer:  Nombra la emoción para tus adentros: \"Ah, esto es ansiedad\" o \"Estoy sintiendo tristeza\".",
      "A - Aceptar:  Permite que la emoción esté ahí, sin luchar contra ella ni juzgarte por sentirla. Puedes decirte: \"Está bien sentir esto\".",
      "I - Investigar:  Con una curiosidad amable, explora cómo se siente la emoción en tu cuerpo. ¿Dónde está? ¿Es caliente, fría, tensa, vibrante? ¿Qué creencia está detrás de esta emoción? ¿Qué necesita esta parte herida de ti?",
      "N - No-identificación:  Date cuenta de que tú no eres la emoción. Eres la conciencia espaciosa en la que la emoción está ocurriendo. Descansa en esta conciencia más amplia, viendo la emoción como una nube pasajera."
    ],
    artTitle: "El Jardín de la Mente Transformada",
    artDesc: "Crear una imagen metafórica de la mente cuando ha sido cultivada con presencia y consciencia.",
    artSteps: [
      "Dibuja un jardín que represente el estado de tu mente cuando está en su mejor versión.",
      "¿Qué plantas, flores o árboles hay? ¿Qué crece aquí?",
      "¿Hay zonas que aún necesitan cuidado? Dibújalas también, sin juicio.",
      "¿Qué herramientas del jardinero tienes (prácticas, hábitos, rituales)?",
      "Escribe un compromiso para cultivar tu jardín interior esta semana."
    ],
    artReflection: "¿Qué has integrado de la Puerta Azul? ¿Qué aspecto de tu mente ha cambiado? ¿Qué observas ahora que antes no veías?",
  },
  {
    n: 35,
    gate: "azul",
    title: "La Noche Oscura del Alma",
    message: "El camino del guerrero espiritual implica transitar por la \"noche oscura del alma\", un viaje a las profundidades del ser para enfrentar a nuestros demonios internos (el ego, la sombra). Es en esta aparente oscuridad donde se produce la purificación más profunda y donde la luz de la consciencia puede brillar sin impedimentos. Este proceso requiere la fusión perfecta de las tres puertas: un cuerpo p",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Noche Oscura del Alma", "Un período de desolación espiritual que precede a una profunda transformación y purificación del ego."],
      ["Vencerse a Uno Mismo", "La verdadera batalla no es externa, sino contra nuestros propios automatismos y la identificación con el ego."],
      ["La Fusión de las Tres Puertas", "La maestría se alcanza cuando cuerpo, energía y mente surgen de una única fuente de presencia no-dual."]
    ],
    exerciseTitle: "Contemplación del Proceso Espiritual",
    exerciseObjective: "Reflexionar sobre el propio viaje espiritual utilizando el esquema simbólico presentado.",
    exerciseRef: "\"TCT Puerta Azul Anexos\", pág. 53-68.",
    exerciseSteps: [
      "Observa la secuencia de imágenes que describen el proceso espiritual, desde el espacio vacío hasta la realización del cuerpo de arco iris.",
      "Reflexiona sobre en qué punto del camino te sientes. ¿Estás en la fase de la mente dualista, empezando a purificar la visión, o has tenido atisbos del estado de Rigpa?",
      "Contempla la imagen del \"viaje del guerrero\" y la interacción de las tres puertas (Cuerpo-Movimiento, Voz-Vibración, Mente-Creación).",
      "No se trata de juzgar tu progreso, sino de tomar consciencia de tu proceso con honestidad y compasión. Reconoce que cada paso, incluso los difíciles, forma parte del camino de regreso a casa."
    ],
    artTitle: "La Noche Oscura: Atravesar el Umbral",
    artDesc: "Transformar visualmente la experiencia de la noche oscura del alma en un pasaje iniciático.",
    artSteps: [
      "Dibuja un camino que pasa por la oscuridad. No una oscuridad amenazante, sino una oscuridad fértil.",
      "¿Qué hay en esa oscuridad? ¿Qué se disuelve allí?",
      "Al fondo del camino, ¿qué luz emerge? Puede ser pequeña.",
      "¿Qué has perdido en tu propia noche oscura que en realidad necesitabas soltar?",
      "Escribe en el margen: «Gracias por la noche que me preparó para la luz.»"
    ],
    artReflection: "¿Qué símbolo representa tu camino de consciencia integral? ¿Qué incluye que antes excluías? ¿Qué forma tiene?",
  },
  {
    n: 36,
    gate: "azul",
    title: "Integración de la Puerta Azul",
    message: "La integración de la Puerta Azul es la encarnación de la visión no-dual en la vida diaria. Es dejar de \"hacer\" las prácticas para \"ser\" la práctica. Es vivir como el espejo: reflejando la vida tal como es, con sus alegrías y dolores, sin ser manchado ni definido por ella. La maestría no es la ausencia de reflejos (pensamientos, emociones), sino el reconocimiento ininterrumpido de nuestra naturalez",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Práctica como Ser", "La integración no es hacer prácticas, sino ser la práctica: vivir como el espejo sin ser definido por los reflejos."],
      ["El Espejo en la Vida Cotidiana", "Cada situación, pensamiento o emoción es un reflejo. La maestría es el reconocimiento ininterrumpido de nuestra naturaleza de espejo."],
      ["El Fin de la Búsqueda", "La mente deja de ser un problema a resolver y se revela como la expresión de la conciencia misma."]
    ],
    exerciseTitle: "de Integración: Vivir el Día como el Espejo",
    exerciseObjective: "Mantener el reconocimiento de la mente-espejo durante las actividades cotidianas.",
    exerciseRef: "",
    exerciseSteps: [
      "Comienza el día con la intención: \"Hoy, recuerdo que soy el espejo, no los reflejos\".",
      "Durante el día, cuando surja una situación (agradable o desagradable), un pensamiento o una emoción, nótalo y di internamente: \"Un reflejo\".",
      "Observa la tendencia de la mente a identificarse, a reaccionar, a aferrarse o a rechazar el reflejo.",
      "Amablemente, una y otra vez, trae tu identidad de vuelta al espejo: a la conciencia silenciosa, clara y espaciosa que simplemente observa.",
      "Presta especial atención a los momentos de interacción. ¿Puedes ver a la otra persona como un reflejo en tu espejo, sin juicio? ¿Puedes ver tus propias reacciones como reflejos también?",
      "Al final del día, reflexiona: ¿En qué momentos fue más fácil recordar que eres el espejo? ¿En qué momentos te identificaste más con los reflejos? No hay juicio, solo observación para la próxima práctica. Puerta Integración (Semanas 37-48) Tema Central:  Síntesis y Encarnación. Fuentes Principales:  "
    ],
    artTitle: "La Integración Azul: El Mapa de la Mente",
    artDesc: "Sintetizar visualmente los aprendizajes de la Puerta Azul en un mapa de la mente transformada.",
    artSteps: [
      "Dibuja el contorno de una cabeza, vista de perfil.",
      "Dentro, representa los conceptos, herramientas y experiencias más significativos de la Puerta Azul.",
      "¿Cómo ha cambiado tu mente a lo largo de estas 12 semanas? Representa ese cambio.",
      "¿Qué pensamiento o patrón has disuelto? Dibujalo saliendo de la cabeza, disolviéndose.",
      "¿Qué nueva comprensión habita ahora dentro? Dibujala como una presencia luminosa."
    ],
    artReflection: "¿Qué permanece al integrar las tres puertas anteriores? ¿Qué ofreces al mundo desde ese lugar de mayor presencia?",
  },
  {
    n: 37,
    gate: "arcoiris",
    title: "Síntesis del Método TCT - Las Tres Puertas",
    message: "Repasamos el viaje completo, viendo cómo cada puerta construye sobre la anterior. La Puerta Blanca nos dio el  suelo  (el cuerpo presente). La Puerta Roja nos dio el  corazón  (la energía purificada). La Puerta Azul nos dio el  cielo  (la mente espaciosa). Ahora, en la Puerta de Integración, aprendemos a vivir simultáneamente en el suelo, el corazón y el cielo. Son tres dimensiones de una única Re",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Suelo - Puerta Blanca", "La presencia corporal como base: un cuerpo presente sostiene la alquimia emocional y la claridad mental."],
      ["El Corazón - Puerta Roja", "La energía purificada como motor del propósito: cuando el corazón está libre, la acción surge desde el amor."],
      ["El Cielo - Puerta Azul", "La mente espaciosa como horizonte: la visión no-dual impregna la relación con el cuerpo y las emociones."],
      ["Visión Circular", "Todos los conceptos están interconectados como radios de una rueda que convergen en un punto central de presencia."]
    ],
    exerciseTitle: "Meditación de las Tres Puertas",
    exerciseObjective: "Unificar la conciencia de los tres centros en una sola meditación.",
    exerciseRef: "",
    exerciseSteps: [
      "Siéntate en una postura cómoda.",
      "Puerta Blanca (5 min):  Lleva tu atención a tu cuerpo. Siente el contacto con el suelo, el peso, la postura. Habita tu cuerpo físico plenamente. Siente la presencia sólida y cimentada.",
      "Puerta Roja (5 min):  Lleva tu atención a tu centro energético, al área del corazón y la garganta. Siente la energía vital que pulsa en ti. Con cada respiración, siente cómo esta energía se purifica y se vuelve más sutil y amorosa.",
      "Puerta Azul (5 min):  Expande tu atención para incluir el espacio de la mente. Observa los pensamientos como nubes en un cielo vasto y claro. Descansa en la conciencia espaciosa y no-dual.",
      "Integración (5 min):  Mantén simultáneamente la conciencia del cuerpo (suelo), la energía (corazón) y la mente (cielo). Siente cómo eres las tres cosas a la vez: anclado, vibrante y espacioso."
    ],
    artTitle: "La Síntesis de las Tres Puertas",
    artDesc: "Crear una imagen que integre los aprendizajes esenciales de las tres puertas recorridas.",
    artSteps: [
      "Divide la hoja en tres franjas o círculos: Blanca, Roja, Azul.",
      "En cada zona, dibuja el símbolo o imagen que mejor representa lo aprendido en cada puerta.",
      "En el centro, donde todo converge, ¿qué imagen surge de la síntesis?",
      "¿Qué llevas de cada puerta a la Arcoíris?",
      "Escribe tres palabras, una por puerta, que definan tu transformación."
    ],
    artReflection: "¿Qué colores del arcoíris dominan tu obra? ¿Hay alguno ausente? ¿Qué significa esa ausencia para ti?",
  },
  {
    n: 38,
    gate: "arcoiris",
    title: "La Alquimia del Ser",
    message: "Profundizamos en la \"Fórmula Esencial de la Felicidad\" como el mapa para la integración. La felicidad no es una emoción pasajera, sino la resonancia de un ser en equilibrio. Este equilibrio se sostiene sobre tres pilares que hemos cultivado a lo largo del viaje: Aceptación (Puerta Blanca):  La paz que viene de estar presente en el ahora y aceptar la realidad tal como es, comenzando por nuestro pro",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Aceptación - Puerta Blanca", "La paz que viene de estar presente en el ahora y aceptar la realidad tal como es, comenzando por el propio cuerpo."],
      ["Propósito - Puerta Roja", "La energía que se libera cuando el corazón está purificado y las acciones se alinean con un sentido que trasciende al ego."],
      ["Conexión - Puerta Azul", "La alegría que surge de recordar la unidad con la Fuente, con los demás y con toda la vida."],
      ["La Fórmula Esencial", "Felicidad igual a Aceptación más Propósito más Conexión. La resonancia de un ser en equilibrio."]
    ],
    exerciseTitle: "Reflexión sobre los Tres Pilares",
    exerciseObjective: "Evaluar cómo se manifiestan los tres pilares de la felicidad en tu vida actual.",
    exerciseRef: "",
    exerciseSteps: [
      "Aceptación:  ¿En qué áreas de mi vida estoy practicando la aceptación? ¿En qué áreas todavía hay resistencia y lucha? ¿Cómo es mi relación con mi cuerpo en este momento?",
      "Propósito:  ¿Qué actividades o acciones me dan un sentido de propósito? ¿Mis acciones diarias están alineadas con mis valores más profundos? ¿Cómo puedo expresar mi propósito de formas pequeñas hoy?",
      "Conexión:  ¿Cuándo me siento más conectado conmigo mismo, con los demás y con la vida? ¿Qué hábitos o patrones de pensamiento me hacen sentir separado? ¿Cómo puedo cultivar una mayor sensación de conexión?"
    ],
    artTitle: "El Ser Alquimizado",
    artDesc: "Representar visualmente el proceso de alquimia interior: la transformación del plomo en oro.",
    artSteps: [
      "Dibuja en la mitad izquierda de la hoja lo que eras al inicio: miedos, densidades, patrones.",
      "En la mitad derecha, lo que estás siendo ahora: cualidades emergentes, ligereza, claridad.",
      "Entre los dos, dibuja el proceso alquímico: el fuego, la presión, la disolución.",
      "¿Qué «plomo» se ha convertido en «oro» en ti?",
      "Celebra ese oro dibujando algo luminoso en el centro de la hoja."
    ],
    artReflection: "¿Cómo representaste la síntesis de todos los aprendizajes? ¿Hay un símbolo que los une todos? ¿Cuál emergió?",
  },
  {
    n: 39,
    gate: "arcoiris",
    title: "El Campo Invisible que Todos Sostenemos",
    message: "La maestría no es un logro individualista. Recordamos que cada uno de nosotros, con nuestro estado de conciencia, contribuye al \"campo invisible\" de la humanidad. Una sociedad consciente no es una utopía, sino el resultado de individuos que asumen la responsabilidad de su propia presencia. El gesto más político y transformador es, a menudo, el más silencioso: escuchar de verdad, no reaccionar auto",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Campo Invisible", "Cada uno de nosotros, con su estado de conciencia, contribuye al campo invisible de la humanidad."],
      ["La Responsabilidad Compartida", "No somos responsables de todo el sistema, pero sí del lugar que ocupamos en él. Cada gesto consciente modifica el campo."],
      ["El Gesto más Transformador", "A menudo el acto más transformador es el más silencioso: escuchar de verdad, no reaccionar automáticamente."]
    ],
    exerciseTitle: "Ofrecer Presencia",
    exerciseObjective: "Practicar la contribución consciente al campo colectivo.",
    exerciseRef: "",
    exerciseSteps: [
      "Elige una interacción del día (con un familiar, un colega, un dependiente en una tienda).",
      "Antes de la interacción, toma un momento para centrarte. Conecta con tu cuerpo y tu respiración. Establece la intención de \"ofrecer presencia\".",
      "Durante la interacción, tu único objetivo es estar plenamente presente. Escucha sin interrumpir. Mira a la persona a los ojos. Siente el campo emocional entre vosotros.",
      "No intentes arreglar, aconsejar o cambiar nada. Tu única ofrenda es tu atención plena y tu presencia no-reactiva.",
      "Observa el efecto que este simple acto tiene en la interacción y en tu propio estado interno."
    ],
    artTitle: "El Campo Invisible",
    artDesc: "Visualizar la red de conexión invisible que une a todos los seres conscientes.",
    artSteps: [
      "Dibuja varios puntos de luz dispersos en la hoja.",
      "Traza líneas de conexión entre ellos. Algunas fuertes, otras suaves.",
      "¿Eres consciente de ser uno de esos puntos de luz? Dibuja el tuyo.",
      "¿Con qué otros puntos estás más conectado? ¿Cuáles te nutren y cuáles te drenan?",
      "Escribe en el margen: «Mi contribución al campo colectivo es...»"
    ],
    artReflection: "¿Qué aspecto de tu ser se integra en esta semana? ¿Cómo lo representaste? ¿Qué sientes al verlo unificado?",
  },
  {
    n: 40,
    gate: "arcoiris",
    title: "Práctica Integrada - El Diario del Cuarto Camino",
    message: "Retomamos la herramienta del diario desde la perspectiva del Cuarto Camino, pero ahora con la visión integrada de las tres puertas. El diario se convierte en un laboratorio para la auto-observación de los tres centros en acción y para registrar los momentos de \"recuerdo de sí\" y de \"identificación\". Estructura del Diario Integrado: Observación de los Centros:  Al final del día, anota una situación",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Observación de los Centros", "Anotar situaciones en las que los tres centros (intelectual, emocional, motor) actuaron en desequilibrio o en armonía."],
      ["Momentos de Recuerdo de Sí", "Registrar cualquier instante en el que fuiste consciente de ti mismo y de tu acción simultáneamente."],
      ["Identificaciones Principales", "Anotar el patrón emocional más dominante del día para observar sin juicio los automatismos recurrentes."]
    ],
    exerciseTitle: "Mantener el Diario del Cuarto Camino",
    exerciseObjective: "Utilizar la escritura como una herramienta sistemática para aumentar la autoconciencia.",
    exerciseRef: "",
    exerciseSteps: [

    ],
    artTitle: "El Diario Consciente Ilustrado",
    artDesc: "Crear una entrada visual del diario del Cuarto Camino, integrando imagen y palabra.",
    artSteps: [
      "Elige un momento o experiencia de esta semana que haya sido significativa.",
      "Dibuja esa escena desde la perspectiva del observador, no del protagonista.",
      "¿Qué estaba ocurriendo en los tres centros (mente, emoción, cuerpo) en ese momento?",
      "Añade palabras clave o frases breves que capturen la esencia de lo observado.",
      "¿Qué aprende el observador de esa escena?"
    ],
    artReflection: "¿Qué regalo ves en tu obra para el mundo? ¿Es fácil o difícil mostrarlo? ¿Qué te impide darlo libremente?",
  },
  {
    n: 41,
    gate: "arcoiris",
    title: "Práctica Integrada - El Diario del Perdón",
    message: "La práctica del perdón de UCDM es el corazón de la purificación de la Puerta Roja y la maestría de la Puerta Azul. Esta semana, nos comprometemos a hacer del perdón una práctica diaria y sistemática, utilizando el diario como una herramienta para no dejar que ningún resentimiento o juicio se arraigue en la mente. Estructura del Diario del Perdón: Mañana:  Establece el propósito del día: \"Por encim",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Propósito del Día", "Cada mañana establecer la intención de ver y elegir la paz. La intención diaria como ancla del perdón."],
      ["El Registro del Juicio", "Cada vez que la paz se perturbe, anotar el pensamiento de juicio que la causó. Escribirlo es el primer paso para entregarlo."],
      ["El Proceso de Perdón Nocturno", "Por la noche, reconocer el juicio, entregarlo al Espíritu Santo y pedir ver la inocencia en todos."]
    ],
    exerciseTitle: "Mantener el Diario del Perdón",
    exerciseObjective: "Hacer del perdón una respuesta automática a cualquier forma de conflicto.",
    exerciseRef: "",
    exerciseSteps: [

    ],
    artTitle: "El Jardín del Perdón",
    artDesc: "Crear una imagen metafórica del perdón como acto de liberación y regreso a la paz.",
    artSteps: [
      "Dibuja un jardín con zonas que antes eran áridas (resentimientos, heridas) y ahora florecen.",
      "¿A quién has perdonado (o estás en proceso de perdonar) en este camino? No necesitas escribir el nombre; basta un símbolo.",
      "¿Qué flor o planta representa ese perdón?",
      "¿Cómo se siente el jardín cuando el perdón está presente?",
      "Escribe en el suelo del jardín: «Elijo el amor en lugar de...»"
    ],
    artReflection: "¿Qué patrón de transformación ves en tu obra? ¿Cómo has cambiado desde la Semana 1? ¿Qué imagen lo representa?",
  },
  {
    n: 42,
    gate: "arcoiris",
    title: "Práctica Integrada - El Diario de la Mente Feliz",
    message: "Desde la perspectiva del Dzogchen, la felicidad es nuestro estado natural. El diario se convierte en una herramienta no para \"lograr\" la felicidad, sino para registrar los momentos en que recordamos nuestra naturaleza de espejo y para observar los patrones que oscurecen esa felicidad. Estructura del Diario de la Mente Feliz: Momentos de \"Espejo\":  Anota cualquier momento en que te sentiste como el",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Momentos de Espejo", "Anotar los instantes en que te sentiste como el observador espacioso, viendo los pensamientos pasar como reflejos."],
      ["Observación de la Contracción", "Registrar las situaciones en que te sentiste identificado con un reflejo. La simple observación desde no-juicio ya es mente-espejo."],
      ["Gratitud por la Claridad", "Agradecer no por los buenos reflejos, sino por la capacidad misma de la conciencia de reflejar."]
    ],
    exerciseTitle: "Mantener el Diario de la Mente Feliz",
    exerciseObjective: "Estabilizar el reconocimiento de la mente natural.",
    exerciseRef: "",
    exerciseSteps: [

    ],
    artTitle: "La Mente Feliz",
    artDesc: "Crear una imagen de cómo se siente y se ve la mente cuando está en su estado de bienestar auténtico.",
    artSteps: [
      "Dibuja tu mente feliz. No «feliz» como sonrisa forzada, sino feliz como ecuanimidad, claridad, apertura.",
      "¿Qué colores, texturas y formas tiene ese estado?",
      "¿Qué pensamientos habitan en esa mente? Escribe algunos.",
      "¿Qué condiciones internas y externas crean esa mente feliz?",
      "Dibuja un camino que parte de donde estás ahora y llega a esa mente."
    ],
    artReflection: "¿Qué sientes en el cuerpo al contemplar tu obra de enraizamiento? ¿Estás más aquí ahora que hace 42 semanas?",
  },
  {
    n: 43,
    gate: "arcoiris",
    title: "El Arte de la No-Interferencia",
    message: "La culminación de la práctica es la \"acción sin esfuerzo\" o Wu Wei. No significa pasividad, sino actuar en perfecta armonía con el fluir de la vida. Esto solo es posible cuando el ego, con su necesidad de controlar, planificar y forzar, se ha relajado. La no-interferencia es confiar en la inteligencia más profunda del Ser, que sabe qué hacer y cuándo hacerlo sin necesidad de la deliberación consta",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Wu Wei - Acción sin Esfuerzo", "Actuar en armonía con el fluir de la vida cuando el ego ha relajado su necesidad de controlar."],
      ["Confianza en el Proceso", "Soltar el control sobre el resultado y enfocarse en la calidad de presencia. La inacción consciente es a menudo la más poderosa."],
      ["La Pregunta del Origen", "Antes de actuar: esta acción surge del miedo y la necesidad de controlar, o del flujo natural y la respuesta intuitiva?"]
    ],
    exerciseTitle: "La Danza del No-Esfuerzo",
    exerciseObjective: "Practicar la acción que surge de la quietud en lugar de la urgencia del ego.",
    exerciseRef: "Anexo II de \"TCT Puerta Azul\", pág. 124.",
    exerciseSteps: [
      "Establece la intención para el día: \"Hoy permitiré que la vida fluya a través de mí\".",
      "Ante cada decisión o acción, especialmente si sientes urgencia o ansiedad, haz una pausa.",
      "Respira y conecta con la quietud de tu centro.",
      "Pregúntate: \"¿Esta acción surge del miedo y la necesidad de controlar, o del flujo natural y la respuesta intuitiva?\".",
      "Actúa solo cuando la respuesta venga de la quietud. Si no hay claridad, espera. La inacción consciente es a menudo la acción más poderosa."
    ],
    artTitle: "El Arte de No Intervenir",
    artDesc: "Explorar visualmente la paradoja de la acción sin acción — wu wei — como forma de sabiduría.",
    artSteps: [
      "Dibuja un río en movimiento. A sus orillas, distintas figuras: una que intenta controlar el flujo, otra que simplemente acompaña.",
      "¿Cómo se siente cada una? ¿Cuál requiere más energía?",
      "¿En qué áreas de tu vida estás «remando contra la corriente»?",
      "Dibuja cómo sería soltar los remos y confiar en el flujo.",
      "Escribe: «Donde elegiré no intervenir esta semana: ...»"
    ],
    artReflection: "¿Qué voz interior encontraste en el silencio de la creación? ¿Qué dice ahora que no podía decir antes?",
  },
  {
    n: 44,
    gate: "arcoiris",
    title: "El Legado Invisible - La Vida como Servicio",
    message: "Cuando la búsqueda del ego para \"conseguir algo\" se disuelve, emerge una nueva motivación: el servicio. El servicio no es necesariamente una acción grandiosa, sino la expresión natural de un corazón abierto. Es el reconocimiento de que nuestra paz y nuestra felicidad son inseparables de la paz y la felicidad de todos. Nuestro legado más importante no es lo que logramos, sino la calidad de presenci",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Servicio como Extensión del Ser", "En UCDM el servicio es extensión del amor. En el budismo, manifestación de la compasión. No es un deber, sino una alegría."],
      ["El Legado Invisible", "Nuestro legado más importante no es lo que logramos, sino la calidad de presencia y amor que ofrecimos al mundo."],
      ["Dar sin Reconocimiento", "La alegría del servicio puro viene de la alineación interna con el flujo del amor, no de la gratitud externa."]
    ],
    exerciseTitle: "Un Acto de Servicio Anónimo",
    exerciseObjective: "Experimentar la alegría de dar sin ninguna expectativa de reconocimiento.",
    exerciseRef: "",
    exerciseSteps: [
      "Busca una oportunidad para realizar un pequeño acto de servicio o bondad de forma anónima.",
      "Puede ser algo simple: dejar una nota amable, hacer una pequeña donación, limpiar un espacio compartido sin que nadie te vea, enviar un pensamiento de amor a alguien con quien tienes dificultades.",
      "El único requisito es que nadie sepa que lo hiciste tú.",
      "Observa la sensación que surge. La alegría del servicio puro no viene de la gratitud externa, sino de la alineación interna con el flujo del amor."
    ],
    artTitle: "El Legado que Sembro",
    artDesc: "Crear una imagen del impacto invisible que tu presencia y acción dejan en el mundo.",
    artSteps: [
      "Dibuja un árbol grande con raíces profundas.",
      "En las raíces: lo que te sostiene, tus valores, tu práctica.",
      "En el tronco: quién eres ahora, tu ser esencial.",
      "En las ramas y frutos: el legado que ofreces al mundo, visible e invisible.",
      "En el suelo alrededor: las semillas que ya han germinado en otros."
    ],
    artReflection: "¿Cómo representaste la rendición al río de la vida? ¿Hay control o soltura en los trazos? ¿Qué te dicen?",
  },
  {
    n: 45,
    gate: "arcoiris",
    title: "La Comunicación desde la Fuente",
    message: "La comunicación se convierte en una de las prácticas de maestría más importantes. La comunicación del ego busca tener razón, defenderse o manipular. La comunicación desde la Fuente busca la conexión y la verdad. Implica escuchar desde el silencio, hablar desde el corazón y reconocer al Ser en la otra persona, más allá de su personalidad. Concepto Clave: Escuchar para Conectar, no para Responder La",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Escuchar para Conectar", "La escucha profunda es un acto de presencia total que crea un espacio sagrado donde la verdadera comunicación puede ocurrir."],
      ["Hablar desde la Quietud", "Permitir que las palabras surjan de la honestidad y la quietud interior, no de la reacción automática del ego."],
      ["El Lenguaje del Alma", "Reconocer al Ser en la otra persona más allá de su personalidad. La comunicación desde la Fuente busca conexión y verdad."]
    ],
    exerciseTitle: "La Conversación Consciente",
    exerciseObjective: "Transformar una conversación ordinaria en una práctica de presencia.",
    exerciseRef: "Anexo II de \"TCT Puerta Azul\", pág. 125.",
    exerciseSteps: [
      "Elige una conversación que tendrás hoy.",
      "Antes de empezar, establece la intención de escuchar para conectar, no para ganar.",
      "Durante la conversación, mantén una parte de tu atención en tu propio estado interno. ¿Estás presente? ¿Estás reaccionando?",
      "Cuando la otra persona hable, escucha con todo tu ser. Intenta sentir lo que hay detrás de sus palabras.",
      "Cuando sea tu turno de hablar, haz una pausa. Permite que tus palabras surjan de la quietud y la honestidad, no de la reacción."
    ],
    artTitle: "La Comunicación desde el Ser",
    artDesc: "Representar visualmente la diferencia entre comunicar desde el ego y desde el ser esencial.",
    artSteps: [
      "Dibuja dos conversaciones: una desde el ego (armado, defensivo, reactivo) y otra desde el ser (abierto, escuchando, presente).",
      "¿Cómo es el cuerpo de cada interlocutor en cada escena?",
      "¿Qué espacio hay entre las personas en cada conversación?",
      "¿Qué cambia cuando te comunicas desde el ser?",
      "Escribe el nombre de alguien con quien quieres practicar esta semana."
    ],
    artReflection: "¿Qué ofrenda visual creaste? ¿Qué parte de ti depositas en ella? ¿Qué recibes al hacerlo?",
  },
  {
    n: 46,
    gate: "arcoiris",
    title: "Maestría en la Vida Cotidiana",
    message: "La maestría no es un estado estático, sino una cualidad de serenidad radiante que impregna todas nuestras actividades. Es la capacidad de permanecer centrado y en paz en medio del caos del mundo. No es una paz pasiva, sino una calma activa y dinámica que surge de la confianza inquebrantable en la Realidad. Es el fruto de la integración de las tres puertas: un cuerpo relajado, un corazón abierto y ",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["Serenidad Radiante", "Una calma activa y dinámica que surge de la confianza inquebrantable en la Realidad, independiente de las circunstancias externas."],
      ["La Paz que Sobrepasa Todo Entendimiento", "La paz de Dios no depende de condiciones favorables. Es la paz que hemos aprendido a elegir consistentemente."],
      ["El Ancla de la Serenidad", "Una palabra, imagen o sensación física que nos devuelve al centro de calma disponible debajo del ruido de la superficie."]
    ],
    exerciseTitle: "Anclar la Serenidad",
    exerciseObjective: "Cultivar la serenidad como estado de fondo a lo largo del día.",
    exerciseRef: "",
    exerciseSteps: [
      "Comienza el día con 5 minutos de silencio, conectando con la sensación de paz interior.",
      "A lo largo del día, utiliza un \"ancla\" para volver a esa sensación. Puede ser una palabra (\"Paz\"), una imagen (un lago en calma) o una sensación física (el contacto de tus pies con el suelo).",
      "Cada vez que te sientas arrastrado por el estrés o el drama, utiliza tu ancla para hacer una pausa y reconectar con la serenidad que está siempre disponible debajo del ruido de la superficie.",
      "La práctica es volver, una y otra vez, a este centro de calma, hasta que se convierta en tu forma natural de estar en el mundo."
    ],
    artTitle: "La Maestría Cotidiana",
    artDesc: "Crear un mapa visual de cómo se ve la maestría en lo ordinario — la presencia en los detalles de cada día.",
    artSteps: [
      "Dibuja un día ordinario desde el amanecer hasta la noche.",
      "Señala con un color especial los momentos donde la maestría podría aparecer: la primera taza de té, la conversación de camino al trabajo, el silencio antes de dormir.",
      "¿Qué haría diferente un maestro en esos momentos?",
      "¿Cuál de esos momentos eliges transformar con presencia esta semana?",
      "Escribe: «La maestría de esta semana la busco en...»"
    ],
    artReflection: "¿Qué semilla plantaste en tu obra? ¿Qué quieres que florezca en el próximo ciclo de tu vida?",
  },
  {
    n: 47,
    gate: "arcoiris",
    title: "El Ciclo Permanente - La Espiral de Transformación",
    message: "El camino espiritual no es una línea recta, sino una espiral. Volveremos a enfrentar los mismos temas (el ego, el miedo, el perdón), pero cada vez desde un nivel de conciencia más elevado. La integración no es un final, sino el comienzo de un trabajo continuo, donde cada vuelta de la espiral profundiza nuestra comprensión y encarnación. Concepto Clave: No hay Regresión, solo Profundización Cuando ",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["La Espiral, no la Línea", "El camino espiritual vuelve a los mismos temas desde un nivel de conciencia más elevado. No hay regresión, solo profundización."],
      ["Paciencia con el Proceso", "Cuando un viejo patrón reaparece, es señal de estar listos para sanarlo a un nivel más profundo."],
      ["Transformación como Ciclo Orgánico", "Reconocer el progreso invisible. Cada vuelta de la espiral integra lo anterior con mayor comprensión."]
    ],
    exerciseTitle: "Revisión en Espiral",
    exerciseObjective: "Reconocer el progreso en espiral en tu propio camino.",
    exerciseRef: "",
    exerciseSteps: [
      "Reflexiona sobre un desafío o patrón con el que has trabajado durante este curso.",
      "Recuerda cómo te relacionabas con él al principio (Puerta Blanca). ¿Cómo lo abordaste durante la Puerta Roja? ¿Y desde la perspectiva de la Puerta Azul?",
      "Observa cómo tu comprensión y tu capacidad para manejarlo han cambiado, aunque el tema central sea el mismo.",
      "Reconoce y honra tu progreso. Si el patrón sigue apareciendo, dale la bienvenida como una oportunidad para una sanación aún más profunda, en la siguiente vuelta de la espiral."
    ],
    artTitle: "La Espiral de Transformación",
    artDesc: "Representar visualmente el camino en espiral — siempre regresando, pero desde un nivel más alto.",
    artSteps: [
      "Dibuja una espiral ascendente. Cada vuelta es el mismo tema, pero desde mayor comprensión.",
      "Marca en la espiral los grandes hitos de tu propio proceso de transformación.",
      "¿Dónde estás ahora en la espiral?",
      "¿Qué patrón sientes que regresa? Dibujalo junto a la espiral, pero ya transformado.",
      "Escribe en el centro de la espiral: «Lo que ya no soy» y en el extremo exterior: «Lo que estoy siendo»."
    ],
    artReflection: "¿Qué ve el maestro interior en tu obra de esta semana? ¿Qué reconocimiento se hace a sí mismo?",
  },
  {
    n: 48,
    gate: "arcoiris",
    title: "Cierre y Continuación del Camino",
    message: "El viaje de 48 semanas llega a su fin, pero el verdadero Camino apenas comienza. Hemos recibido un mapa y un conjunto de herramientas, pero ahora nos corresponde caminar. El cierre no es una graduación, sino un compromiso renovado con la práctica de la presencia en cada momento de la vida. Reflexión Final del Método TCT: El objetivo del Método TCT nunca fue convertirte en alguien diferente. Fue ay",
    concepts: [
      ["Texto 1", "Texto 2"],
      ["El Viaje Completo", "Las tres puertas han construido el suelo, el corazón y el cielo de nuestra presencia. Hemos recibido el mapa y las herramientas."],
      ["El Compromiso de Recordar", "No una promesa de perfección, sino de recordar: seguir eligiendo el amor sobre el miedo, la presencia sobre la distracción."],
      ["La Vida como Camino", "El Método TCT nunca buscó convertirte en alguien diferente. Fue ayudarte a recordar quién ya eres."]
    ],
    exerciseTitle: "Final: La Promesa a Ti Mismo",
    exerciseObjective: "Sellar el compromiso con tu propio despertar.",
    exerciseRef: "",
    exerciseSteps: [
      "Busca un momento y un lugar tranquilos.",
      "Escribe una carta a tu Ser futuro (el que leerá esto en un año).",
      "En la carta, describe los aprendizajes más importantes de este viaje. ¿Qué has descubierto sobre ti mismo? ¿Qué prácticas te han servido más?",
      "Hazte una promesa. No una promesa de \"ser perfecto\" o \"no volver a caer\", sino una promesa de \"recordar\". Prométete que seguirás practicando la pausa, que serás amable contigo mismo, que seguirás eligiendo la paz.",
      "Guarda la carta en un lugar seguro y pon un recordatorio en tu calendario para leerla dentro de un año. Será un poderoso recordatorio de tu compromiso y un testimonio de tu continuo viaje en la espiral. \"Sigue tu camino, con tu propio ritmo, vive en paz, con amor... vive. ¡Sé la frecuencia del unive"
    ],
    artTitle: "La Promesa al Ser",
    artDesc: "Crear un símbolo personal y sagrado que selle el compromiso con el camino de transformación.",
    artSteps: [
      "Diseña tu propio símbolo sagrado que represente quién eres después de este viaje.",
      "Puede ser un mandala, un escudo, un sello, cualquier forma que surja de tu interior.",
      "Integra en él elementos de las cuatro puertas: lo que has despertado, purificado, clarificado e integrado.",
      "Escribe alrededor del símbolo: tu promesa al Ser, en pocas palabras.",
      "Enmarca o guarda este símbolo como recordatorio viviente de tu compromiso."
    ],
    artReflection: "¿Qué cierre y qué apertura simultánea ves en tu obra final? ¿Qué lleva contigo de las 48 semanas? ¿Qué suelta?",
  },
];

export const MULTIMEDIA_ITEMS: MultimediaItem[] = [
  {
    id: 1,
    icon: "🎵",
    title: "Bowls Tibetanos 7 Chakras",
    cat: "Cuencos",
    duration: "45 min",
    src: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/MULTIMEDIA/bowls%20tibetanos%207%20chakras.mp3",
    free: true,
    gate: "blanca",
  },
  {
    id: 2,
    icon: "🧘",
    title: "Meditación Guiada · Prueba 1",
    cat: "Meditación",
    duration: "",
    src: "/meditacion-guiada-prueba-1.mp3",
    free: true,
    gate: "blanca",
  },
  {
    id: 3,
    icon: "🌿",
    title: "Frecuencia 432Hz — Armonía Natural",
    cat: "Frecuencias",
    duration: "40 min",
    free: true,
    gate: "blanca",
  },
  {
    id: 4,
    icon: "🌸",
    title: "Canalización Marga — Puerta Blanca",
    cat: "Canalización",
    duration: "18 min",
    free: false,
    gate: "blanca",
  },
  {
    id: 5,
    icon: "🔥",
    title: "741 Hz Detox · Cleanse Aura",
    cat: "Frecuencias",
    duration: "71 min",
    src: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/MULTIMEDIA/741_Hz_DETOX_CLEANSE_AURA_Remove_Toxins_Negative_Blocks.mp3",
    free: true,
    gate: "blanca",
  },
  {
    id: 6,
    icon: "💫",
    title: "UCDM — Introducción al Perdón",
    cat: "Teoría",
    duration: "28 min",
    free: false,
    gate: "roja",
  },
  {
    id: 7,
    icon: "🔵",
    title: "Dzogchen — Introducción a Rigpa",
    cat: "Teoría",
    duration: "35 min",
    free: false,
    gate: "azul",
  },
  {
    id: 8,
    icon: "✨",
    title: "Frecuencia 963Hz — La Luz",
    cat: "Frecuencias",
    duration: "48 min",
    free: false,
    gate: "azul",
  },
  {
    id: 10,
    icon: "🕊️",
    title: "Meditación del Testigo Interior",
    cat: "Meditación",
    duration: "22 min",
    free: false,
    gate: "roja",
  },
  {
    id: 11,
    icon: "🌊",
    title: "Canalización — La Puerta Roja",
    cat: "Canalización",
    duration: "25 min",
    free: false,
    gate: "roja",
  },
  {
    id: 12,
    icon: "🎶",
    title: "Mantras del Cuarto Camino",
    cat: "Teoría",
    duration: "42 min",
    free: false,
    gate: "arcoiris",
  },
];

export const MATERIALES: Record<
  string,
  { icon: string; color: string; pdfs: PdfItem[] }
> = {
  Blanca: {
    icon: "🌿",
    color: "#6E6E73",
    pdfs: [
      {
        name: "El Deportista Consciente — Más allá del resultado",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20%20BLANCA/El-deportista-consciente-Mas-alla-del-resultado.pdf",
      },
      {
        name: "TCT-I — Puerta Blanca",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20%20BLANCA/TCT-I-PUERTA-BLANCA.pdf",
      },
    ],
  },
  Roja: {
    icon: "🔥",
    color: "#C54B3A",
    pdfs: [
      {
        name: "TCT-II — Puerta Roja",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ROJA/TCT-II-PUERTA-ROJA.pdf",
      },
      {
        name: "El Deportista Consciente — Más allá del resultado",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ROJA/El-deportista-consciente-Mas-alla-del-resultado.pdf",
      },
      {
        name: "El Ser Consciente — Más allá de la acción",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ROJA/El-Ser-Consciente-Mas-alla-de-la-accion-Vivir-con-presencia-en-la-vida-cotidiana.pdf",
      },
    ],
  },
  Azul: {
    icon: "🔵",
    color: "#2D7DD2",
    pdfs: [
      {
        name: "TCT-III — Puerta Azul",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/TCT-III-PUERTA-AZUL.pdf",
      },
      {
        name: "TCT-IV — Anexos",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/TCT-IV-PUERTA-ANEXOS.pdf",
      },
      {
        name: "El Deportista Consciente — Más allá del resultado",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/El-deportista-consciente-Mas-alla-del-resultado.pdf",
      },
      {
        name: "El Ser Consciente — Más allá de la acción",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/El-Ser-Consciente-Mas-alla-de-la-accion-Vivir-con-presencia-en-la-vida-cotidiana.pdf",
      },
    ],
  },
  Arcoiris: {
    icon: "🌈",
    color: "#7B4DAA",
    pdfs: [
      {
        name: "TCT-I — Puerta Blanca",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-I-PUERTA-BLANCA.pdf",
      },
      {
        name: "TCT-II — Puerta Roja",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-II-PUERTA-ROJA.pdf",
      },
      {
        name: "TCT-III — Puerta Azul",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-III-PUERTA-AZUL.pdf",
      },
      {
        name: "TCT-IV — Anexos",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-IV-PUERTA-ANEXOS.pdf",
      },
      {
        name: "El Ser Consciente — Más allá de la acción",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/El-Ser-Consciente-Mas-alla-de-la-accion-Vivir-con-presencia-en-la-vida-cotidiana.pdf",
      },
      {
        name: "El Deportista Consciente — Más allá del resultado",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/El-deportista-consciente-Mas-alla-del-resultado.pdf",
      },
    ],
  },
  Oro: {
    icon: "✨",
    color: "#B89040",
    pdfs: [
      {
        name: "TCT-I — Puerta Blanca",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-I-PUERTA-BLANCA.pdf",
      },
      {
        name: "TCT-II — Puerta Roja",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-II-PUERTA-ROJA.pdf",
      },
      {
        name: "TCT-III — Puerta Azul",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-III-PUERTA-AZUL.pdf",
      },
      {
        name: "TCT-IV — Anexos",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/TCT-IV-PUERTA-ANEXOS.pdf",
      },
      {
        name: "El Ser Consciente — Más allá de la acción",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/El-Ser-Consciente-Mas-alla-de-la-accion-Vivir-con-presencia-en-la-vida-cotidiana.pdf",
      },
      {
        name: "El Deportista Consciente — Más allá del resultado",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ARCOIRIS/El-deportista-consciente-Mas-alla-del-resultado.pdf",
      },
      {
        name: "Presentación PDL — Arte y Espiritualidad",
        url: "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ORO/PRESENTACION-PDL-ARTE-Y-ESPIRITUALIDAD.pdf",
      },
    ],
  },
};

export const GATE_ORDER = ["Blanca", "Roja", "Azul", "Arcoiris", "Oro"] as const;

export const FREE_WEEKS = 1;

/* ─────────────────────────────────────────────────────────────
   CAPÍTULOS POR SEMANA — primer documento de referencia
   ───────────────────────────────────────────────────────────── */
export interface WeekChapter {
  bookTitle: string;     // Nombre corto del libro
  chapterNum: number;    // Número de capítulo
  chapterTitle: string;  // Título del capítulo (= title de la semana)
  pages: string;         // Estimación de páginas del capítulo
  url: string;           // URL del PDF completo del libro
}

const DEP_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20%20BLANCA/El-deportista-consciente-Mas-alla-del-resultado.pdf";
const SER_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ROJA/El-Ser-Consciente-Mas-alla-de-la-accion-Vivir-con-presencia-en-la-vida-cotidiana.pdf";
const TCT1_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20%20BLANCA/TCT-I-PUERTA-BLANCA.pdf";
const TCT2_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20ROJA/TCT-II-PUERTA-ROJA.pdf";
const TCT3_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/TCT-III-PUERTA-AZUL.pdf";
const TCT4_URL = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PUERTA%20AZUL/TCT-IV-PUERTA-ANEXOS.pdf";

export const WEEK_CHAPTERS: Record<number, WeekChapter> = {
  1:  { bookTitle: "El Deportista Consciente", chapterNum: 1,  chapterTitle: "El Precio Oculto de Vivir Acelerados",          pages: "18 páginas", url: DEP_URL },
  2:  { bookTitle: "El Deportista Consciente", chapterNum: 2,  chapterTitle: "Cuando Ganar Ya No Es Suficiente",              pages: "14 páginas", url: DEP_URL },
  3:  { bookTitle: "El Ser Consciente",        chapterNum: 3,  chapterTitle: "Cuerpo, Mente y Consciencia: Una Sola Unidad",  pages: "16 páginas", url: SER_URL },
  4:  { bookTitle: "El Ser Consciente",        chapterNum: 4,  chapterTitle: "El Ego en la Vida Cotidiana",                   pages: "15 páginas", url: SER_URL },
  5:  { bookTitle: "El Ser Consciente",        chapterNum: 5,  chapterTitle: "La Emoción, el Error y la Presión como Camino", pages: "13 páginas", url: SER_URL },
  6:  { bookTitle: "El Deportista Consciente", chapterNum: 7,  chapterTitle: "El Entrenamiento como Vía de Despertar",        pages: "17 páginas", url: DEP_URL },
  7:  { bookTitle: "El Ser Consciente",        chapterNum: 8,  chapterTitle: "El Campo de Consciencia Compartido",            pages: "20 páginas", url: SER_URL },
  8:  { bookTitle: "El Ser Consciente",        chapterNum: 9,  chapterTitle: "Sonido, Vibración y Armonización del Sistema",  pages: "14 páginas", url: SER_URL },
  9:  { bookTitle: "El Ser Consciente",        chapterNum: 10, chapterTitle: "Cuando el Sistema No Sostiene lo que Promete",  pages: "12 páginas", url: SER_URL },
  10: { bookTitle: "El Ser Consciente",        chapterNum: 11, chapterTitle: "El Límite como Punto de Despertar",             pages: "15 páginas", url: SER_URL },
  11: { bookTitle: "El Deportista Consciente", chapterNum: 11, chapterTitle: "Más Allá del Resultado: El Sentido del Camino", pages: "16 páginas", url: DEP_URL },
  12: { bookTitle: "El Deportista Consciente", chapterNum: 12, chapterTitle: "Integración de la Puerta Blanca",               pages: "22 páginas", url: DEP_URL },
  13: { bookTitle: "El Ser Consciente",        chapterNum: 1,  chapterTitle: "Introducción a la Puerta Roja y la Energía",    pages: "19 páginas", url: SER_URL },
  14: { bookTitle: "El Ser Consciente",        chapterNum: 2,  chapterTitle: "El Sonido Primordial y los Mantras",            pages: "17 páginas", url: SER_URL },
  15: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 1,  chapterTitle: "Los 6 Reinos del Samsara y la Gestión Emocional", pages: "21 páginas", url: TCT2_URL },
  16: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 2,  chapterTitle: "El Cuarto Camino — Recuerdo de Sí y Observación", pages: "18 páginas", url: TCT2_URL },
  17: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 3,  chapterTitle: "El Cuarto Camino — Trabajo sobre los Centros",    pages: "16 páginas", url: TCT2_URL },
  18: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 4,  chapterTitle: "UCDM — La Paradoja de la Felicidad y el Perdón",  pages: "20 páginas", url: TCT2_URL },
  19: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 5,  chapterTitle: "UCDM — Gestión Emocional y el Instante Santo",    pages: "15 páginas", url: TCT2_URL },
  20: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 6,  chapterTitle: "Protocolos de Sonido — Purificar el Samsara",     pages: "14 páginas", url: TCT2_URL },
  21: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 7,  chapterTitle: "Protocolos de Sonido — El Pilar del Medio",       pages: "13 páginas", url: TCT2_URL },
  22: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 8,  chapterTitle: "Alquimia de la Energía — La Cruz Cabalística",    pages: "18 páginas", url: TCT2_URL },
  23: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 9,  chapterTitle: "La Fórmula de la Felicidad — Aceptación",         pages: "17 páginas", url: TCT2_URL },
  24: { bookTitle: "TCT-II · Puerta Roja",     chapterNum: 10, chapterTitle: "Integración de la Puerta Roja",                   pages: "22 páginas", url: TCT2_URL },
  25: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 1,  chapterTitle: "Introducción a la Puerta Azul y la Mente",        pages: "20 páginas", url: TCT3_URL },
  26: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 2,  chapterTitle: "La Mente según Diversas Tradiciones",             pages: "18 páginas", url: TCT3_URL },
  27: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 3,  chapterTitle: "Dzogchen — La Mente Natural (Rigpa)",             pages: "16 páginas", url: TCT3_URL },
  28: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 4,  chapterTitle: "La Metáfora del Espejo y la Visión No-Dual",      pages: "14 páginas", url: TCT3_URL },
  29: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 5,  chapterTitle: "UCDM en la Puerta Azul — El Testigo Santo",       pages: "17 páginas", url: TCT3_URL },
  30: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 6,  chapterTitle: "El Ser Consciente — Vivir con Presencia",         pages: "15 páginas", url: TCT3_URL },
  31: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 7,  chapterTitle: "Protocolos de Sonido — Desintoxicación",          pages: "13 páginas", url: TCT3_URL },
  32: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 8,  chapterTitle: "Objetos Sagrados y el Proceso de Liberación",     pages: "19 páginas", url: TCT3_URL },
  33: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 9,  chapterTitle: "Manifestar la Fuerza Interior",                   pages: "16 páginas", url: TCT3_URL },
  34: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 10, chapterTitle: "Transformación de la Mente para la Felicidad",    pages: "18 páginas", url: TCT3_URL },
  35: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 11, chapterTitle: "La Noche Oscura del Alma",                        pages: "20 páginas", url: TCT3_URL },
  36: { bookTitle: "TCT-III · Puerta Azul",    chapterNum: 12, chapterTitle: "Integración de la Puerta Azul",                   pages: "22 páginas", url: TCT3_URL },
  37: { bookTitle: "TCT-IV · Anexos",          chapterNum: 1,  chapterTitle: "Síntesis del Método TCT — Las Tres Puertas",       pages: "24 páginas", url: TCT4_URL },
  38: { bookTitle: "TCT-IV · Anexos",          chapterNum: 2,  chapterTitle: "La Alquimia del Ser",                             pages: "18 páginas", url: TCT4_URL },
  39: { bookTitle: "TCT-IV · Anexos",          chapterNum: 3,  chapterTitle: "El Campo Invisible que Todos Sostenemos",         pages: "16 páginas", url: TCT4_URL },
  40: { bookTitle: "TCT-IV · Anexos",          chapterNum: 4,  chapterTitle: "Práctica Integrada — El Diario del Cuarto Camino", pages: "14 páginas", url: TCT4_URL },
  41: { bookTitle: "TCT-IV · Anexos",          chapterNum: 5,  chapterTitle: "Práctica Integrada — El Diario del Perdón",        pages: "15 páginas", url: TCT4_URL },
  42: { bookTitle: "TCT-IV · Anexos",          chapterNum: 6,  chapterTitle: "Práctica Integrada — El Diario de la Mente Feliz", pages: "16 páginas", url: TCT4_URL },
  43: { bookTitle: "TCT-IV · Anexos",          chapterNum: 7,  chapterTitle: "El Arte de la No-Interferencia",                  pages: "17 páginas", url: TCT4_URL },
  44: { bookTitle: "TCT-IV · Anexos",          chapterNum: 8,  chapterTitle: "El Legado Invisible — La Vida como Servicio",     pages: "19 páginas", url: TCT4_URL },
  45: { bookTitle: "TCT-IV · Anexos",          chapterNum: 9,  chapterTitle: "La Comunicación desde la Fuente",                 pages: "18 páginas", url: TCT4_URL },
  46: { bookTitle: "TCT-IV · Anexos",          chapterNum: 10, chapterTitle: "Maestría en la Vida Cotidiana",                   pages: "20 páginas", url: TCT4_URL },
  47: { bookTitle: "TCT-IV · Anexos",          chapterNum: 11, chapterTitle: "El Ciclo Permanente — La Espiral de Transformación", pages: "22 páginas", url: TCT4_URL },
  48: { bookTitle: "TCT-IV · Anexos",          chapterNum: 12, chapterTitle: "Cierre y Continuación del Camino",                pages: "26 páginas", url: TCT4_URL },
};

/* ─────────────────────────────────────────────────────────────
   LIBRO DE PUERTA — segunda tarjeta (manual de la puerta)
   ───────────────────────────────────────────────────────────── */
export interface GateBook {
  title: string;    // "TCT I · Puerta Blanca — Libro completo de la 1ª Puerta"
  subtitle: string; // "Portada · Págs. 1–48 · Solo lectura · Sin descarga"
  url: string;
  icon: string;
}

export const GATE_BOOKS: Record<string, GateBook> = {
  blanca: {
    title: "TCT I · Puerta Blanca — Libro completo de la 1ª Puerta",
    subtitle: "Portada · Págs. 1–48 · Solo lectura · Sin descarga",
    url: TCT1_URL,
    icon: "🌿",
  },
  roja: {
    title: "TCT II · Puerta Roja — Libro completo de la 2ª Puerta",
    subtitle: "Portada · Págs. 1–52 · Solo lectura · Sin descarga",
    url: TCT2_URL,
    icon: "🔥",
  },
  azul: {
    title: "TCT III · Puerta Azul — Libro completo de la 3ª Puerta",
    subtitle: "Portada · Págs. 1–56 · Solo lectura · Sin descarga",
    url: TCT3_URL,
    icon: "🔵",
  },
  arcoiris: {
    title: "TCT IV · Anexos — Síntesis e Integración",
    subtitle: "Portada · Págs. 1–60 · Solo lectura · Sin descarga",
    url: TCT4_URL,
    icon: "🌈",
  },
};
