import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Calendar, Film, Book, Play, Pause, Volume2, ChevronRight,
  Check, Settings, BookOpen, Users, CreditCard, BarChart3,
  CheckCircle2, ArrowLeft, ArrowRight, Lock, Globe, Palette,
  Mail, SkipForward, Home, Image as ImageIcon, Plus, FolderTree,
  FileText, Pencil, Headphones, Download, Circle, CheckCircle,
  AlignLeft, ListChecks, Mic, BookMarked, Lightbulb
} from 'lucide-react';
import { Link } from 'wouter';

type Tab = 'alumno' | 'admin' | 'pagos';

const tabConfig: { id: Tab; label: string; emoji: string; desc: string }[] = [
  { id: 'alumno', label: 'Como alumno', emoji: '👩‍💻', desc: 'Lo que ven tus estudiantes cuando entran a la plataforma' },
  { id: 'admin', label: 'Panel de administración', emoji: '⚙️', desc: 'Tu centro de control para gestionar cursos y contenido' },
  { id: 'pagos', label: 'Pagos con Stripe', emoji: '💳', desc: 'Cobra directamente a tu cuenta sin intermediarios' },
];

const semanas = [
  {
    num: 1, label: 'Semana 1', titulo: 'Fundamentos del Método TCT', done: true, active: false, locked: false,
    progreso: 100,
    descripcion: {
      objetivo: 'Comprender los principios filosóficos del Método TCT y establecer las bases conceptuales para el trabajo de las próximas semanas.',
      duracion: '5–7 horas de trabajo personal',
      intro: 'Esta semana inauguramos el proceso con los fundamentos teóricos que sostienen todo el método. No hay práctica sin comprensión profunda del terreno en el que vamos a trabajar.',
      items: ['3 lecturas teóricas', '2 ejercicios de reflexión', '1 clase magistral + 1 meditación', '2 documentos descargables'],
    },
    conceptos: [
      { titulo: 'Introducción al Método TCT', tipo: 'lectura', duracion: '10 min', done: true, desc: 'Origen y principios filosóficos del método. Qué es la Transformación Consciente Total y por qué funciona de forma diferente a otras metodologías de desarrollo personal.' },
      { titulo: 'Las 3 capas de la conciencia', tipo: 'lectura', duracion: '15 min', done: true, desc: 'Teoría de los tres niveles: consciente, subconsciente y supraconsciente. Cómo cada capa almacena experiencias y de qué modo podemos acceder a ellas para transformarlas.' },
      { titulo: 'El cuerpo como mapa emocional', tipo: 'lectura', duracion: '8 min', done: true, desc: 'Relación entre emociones, tensiones físicas y patrones de comportamiento. La biología del trauma y cómo libera el cuerpo lo que la mente no procesa.' },
    ],
    ejercicios: [
      { titulo: 'Mapa corporal inicial', done: true, prompt: 'Dibuja (o describe) las zonas de tu cuerpo donde sientes mayor tensión o bloqueo habitual. Anota qué emoción asocias a cada zona y en qué situaciones de tu vida aparece.' },
      { titulo: 'Diario de patrones', done: true, prompt: '¿Qué patrón de pensamiento o comportamiento has identificado esta semana que se repite en tu vida? Descríbelo sin juzgarlo, observándolo desde fuera.' },
    ],
    arteterapia: {
      titulo: 'Mandala del yo interior',
      instrucciones: 'Dibuja un círculo y divídelo en 4 secciones. En cada sección, representa visualmente (sin palabras) un aspecto de ti mismo: quién eres, quién querías ser, quién crees que deberías ser y quién quieres llegar a ser. Usa color, formas y símbolos. No hay respuestas correctas.',
      tipo: 'dibujo',
      duracion: '20–30 min',
      done: true,
    },
    multimedia: [
      { titulo: 'Clase magistral — Introducción al Método', tipo: 'video', duracion: '22:15', done: true },
      { titulo: 'Meditación de apertura · Semana 1', tipo: 'audio', duracion: '14:30', done: true },
    ],
    materiales: [
      { titulo: 'Guía de inicio — Método TCT', formato: 'PDF', paginas: '18 págs' },
      { titulo: 'Glosario de términos', formato: 'PDF', paginas: '4 págs' },
    ],
    diario: [
      { fecha: '7 Ene 2026', texto: 'La lectura sobre las 3 capas de la conciencia me ha removido algo. Nunca había pensado que el cuerpo guarda memorias que la mente no recuerda. Quiero profundizar en esto.' },
      { fecha: '9 Ene 2026', texto: 'El mapa corporal me sorprendió. Hay mucha tensión acumulada en el cuello y mandíbula que no había reconocido como emocional. Ahora lo veo diferente.' },
    ],
    completado: true,
  },
  {
    num: 4, label: 'Semana 4', titulo: 'Práctica de anclaje profundo', done: false, active: true, locked: false,
    progreso: 35,
    descripcion: {
      objetivo: 'Instalar un anclaje emocional positivo que puedas activar conscientemente en momentos de tensión o desconexión.',
      duracion: '6–8 horas de trabajo personal',
      intro: 'El anclaje es una de las técnicas más potentes del Método TCT. Esta semana pasamos de la comprensión intelectual a la instalación real de un recurso interno que te acompañará durante todo el proceso.',
      items: ['3 lecturas + neurociencia', '3 ejercicios (2 pendientes)', '1 clase + 1 meditación en curso + 1 tutorial', '3 fichas de práctica descargables'],
    },
    conceptos: [
      { titulo: '¿Qué es el anclaje emocional?', tipo: 'lectura', duracion: '12 min', done: true, desc: 'El anclaje es el proceso por el que un estímulo sensorial queda asociado a un estado emocional. En el Método TCT usamos este mecanismo de forma consciente para crear nuevas respuestas automáticas positivas.' },
      { titulo: 'Neurociencia del anclaje', tipo: 'lectura', duracion: '10 min', done: true, desc: 'Plasticidad neuronal y cómo el cerebro crea y consolida patrones. Por qué repetir el anclaje en el momento de máxima intensidad emocional multiplica su eficacia a largo plazo.' },
      { titulo: 'Los 5 tipos de anclaje TCT', tipo: 'lectura', duracion: '18 min', done: false, desc: 'Kinestésico, auditivo, visual, olfativo y combinado. Cuál elegir según el perfil sensorial de cada persona y cómo adaptar la técnica a diferentes contextos de vida.' },
    ],
    ejercicios: [
      { titulo: 'Identificación de tu estado recurso', done: true, prompt: 'Recuerda un momento en tu vida en el que te sentiste completamente seguro, pleno y en tu máximo potencial. Descríbelo con el mayor detalle posible: dónde estabas, qué veías, qué sentías en el cuerpo, qué pensamientos tenías.' },
      { titulo: 'Protocolo de anclaje kinestésico', done: false, prompt: 'Siguiendo el audio-guía de la práctica de esta semana, realiza el protocolo de anclaje 3 veces en los próximos 5 días (mañana al despertar). Después de cada sesión, describe aquí qué has observado: ¿ha cambiado la intensidad del estado? ¿Qué diferencias notas?' },
      { titulo: 'Carta a tu patrón limitante', done: false, prompt: 'Identifica el patrón que más quieres transformar este mes. Escríbele una carta en segunda persona (como si fuera una persona). Agradécele lo que te ha protegido y comunícale que ya no lo necesitas para estar seguro/a.' },
    ],
    arteterapia: {
      titulo: 'El río de tu vida',
      instrucciones: 'Dibuja un río que represente el flujo de tu vida hasta hoy. Señala los momentos de caudal fuerte (épocas de abundancia y expansión), los remansos (calma y reflexión), las cascadas (crisis y transformaciones) y los obstáculos (piedras o represas). Añade desde dónde fluye el río y hacia dónde va.',
      tipo: 'dibujo / collage',
      duracion: '30–45 min',
      done: false,
    },
    multimedia: [
      { titulo: 'Clase — Técnica de anclaje profundo', tipo: 'video', duracion: '31:45', done: true },
      { titulo: 'Meditación de anclaje · Semana 4', tipo: 'audio', duracion: '19:00', done: false, current: true },
      { titulo: 'Tutorial — Protocolo de 5 días', tipo: 'video', duracion: '08:20', done: false },
    ],
    materiales: [
      { titulo: 'Ficha de práctica — Anclaje kinestésico', formato: 'PDF', paginas: '2 págs' },
      { titulo: 'Registro de sesiones (7 días)', formato: 'PDF', paginas: '1 pág' },
      { titulo: 'Mapa de los 5 tipos de anclaje', formato: 'PDF', paginas: '3 págs' },
    ],
    diario: [
      { fecha: '1 Apr 2026', texto: 'Hoy la meditación de anclaje fue diferente. Sentí cómo mis tensiones se disolvían capa a capa. Necesito repetir este proceso mañana por la mañana antes de empezar el día.' },
    ],
    completado: false,
  },
];

type WeekSection = 'descripcion' | 'conceptos' | 'ejercicios' | 'arteterapia' | 'multimedia' | 'materiales' | 'diario' | 'completar';

function SemanaDetalle({ semana, onBack }: { semana: typeof semanas[0]; onBack: () => void }) {
  const [activeSection, setActiveSection] = useState<WeekSection>('descripcion');
  const [expandedItem, setExpandedItem] = useState<number | null>(0);

  const tabs: { id: WeekSection; label: string; emoji: string }[] = [
    { id: 'descripcion', label: 'Descripción', emoji: '📋' },
    { id: 'conceptos',   label: 'Conceptos',   emoji: '💡' },
    { id: 'ejercicios',  label: 'Ejercicios',   emoji: '📈' },
    { id: 'arteterapia', label: 'Arteterapia',  emoji: '🎨' },
    { id: 'multimedia',  label: 'Multimedia',   emoji: '🎵' },
    { id: 'materiales',  label: 'Materiales',   emoji: '📄' },
    { id: 'diario',      label: 'Diario',       emoji: '📓' },
    { id: 'completar',   label: 'Completar',    emoji: '✅' },
  ];

  return (
    <motion.div key="detalle" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="px-4 pt-3 pb-2 border-b border-gray-800 shrink-0">
        <button onClick={onBack} className="flex items-center gap-1.5 text-[10px] text-gray-500 hover:text-gray-300 mb-2 cursor-pointer transition-colors">
          <ArrowLeft className="w-3 h-3" /> Formaciones
        </button>
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#BC9640] font-semibold tracking-widest uppercase">{semana.label}</div>
            <h3 className="font-serif text-sm font-medium leading-snug">{semana.titulo}</h3>
          </div>
          <div className="shrink-0 text-right">
            <div className="text-[10px] text-gray-500 mb-1">{semana.progreso}%</div>
            <div className="w-16 bg-gray-800 rounded-full h-1.5">
              <div className="bg-[#BC9640] h-1.5 rounded-full" style={{ width: `${semana.progreso}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-800 shrink-0 overflow-x-auto scrollbar-hide">
        {tabs.map(t => (
          <button
            key={t.id}
            onClick={() => { setActiveSection(t.id); setExpandedItem(null); }}
            className={`flex items-center gap-1 px-3 py-2 text-[11px] font-medium whitespace-nowrap border-b-2 transition-colors cursor-pointer shrink-0 ${activeSection === t.id ? 'border-[#BC9640] text-[#BC9640]' : 'border-transparent text-gray-500 hover:text-gray-300'}`}
          >
            <span>{t.emoji}</span> {t.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-auto">
        <AnimatePresence mode="wait">

          {activeSection === 'descripcion' && (
            <motion.div key="desc" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="overflow-hidden">
              {/* Visual week banner */}
              <div className="relative h-28 bg-gradient-to-br from-gray-900 via-[#0f1f1e] to-[#0f0f0f] flex flex-col justify-end px-4 pb-4 overflow-hidden">
                <div className="absolute inset-0 opacity-20" style={{ background: 'radial-gradient(ellipse at 80% 20%, #2b7d7a 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, #BC9640 0%, transparent 60%)' }} />
                <div className="absolute top-4 right-4 text-4xl opacity-30">⚓</div>
                <div className="relative z-10">
                  <div className="text-[9px] text-[#BC9640] tracking-widest uppercase font-semibold mb-0.5">{semana.label}</div>
                  <div className="font-serif text-base font-medium text-white leading-snug">{semana.titulo}</div>
                </div>
              </div>
              {/* Stats row */}
              <div className="grid grid-cols-4 divide-x divide-gray-800 border-b border-gray-800">
                {[
                  { val: `${semana.progreso}%`, label: 'Completado' },
                  { val: semana.conceptos.length.toString(), label: 'Lecturas' },
                  { val: semana.ejercicios.length.toString(), label: 'Ejercicios' },
                  { val: semana.multimedia.length.toString(), label: 'Audios/vídeos' },
                ].map((s, i) => (
                  <div key={i} className="py-2.5 text-center">
                    <div className={`text-sm font-bold ${i === 0 ? 'text-[#BC9640]' : 'text-gray-200'}`}>{s.val}</div>
                    <div className="text-[9px] text-gray-600 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>
              <div className="p-4 space-y-4">
                <div className="bg-[#BC9640]/10 border border-[#BC9640]/20 rounded-xl p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-[#BC9640]/20 flex items-center justify-center shrink-0 text-base">🎯</div>
                    <div>
                      <div className="text-[10px] text-[#BC9640] font-semibold uppercase tracking-widest mb-1">Objetivo de la semana</div>
                      <p className="text-xs text-gray-200 leading-relaxed">{semana.descripcion.objetivo}</p>
                    </div>
                  </div>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Sobre esta semana</div>
                  <p className="text-[11px] text-gray-400 leading-relaxed">{semana.descripcion.intro}</p>
                </div>
                <div>
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Contenido incluido</div>
                  <div className="grid grid-cols-2 gap-2">
                    {semana.descripcion.items.map((it, i) => (
                      <div key={i} className="flex items-center gap-2 bg-gray-800/40 rounded-xl p-3 border border-gray-700/40">
                        <Check className="w-3 h-3 text-[#2b7d7a] shrink-0" />
                        <span className="text-[10px] text-gray-300">{it}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-gray-800/30 rounded-xl p-3 border border-gray-700/30">
                  <Calendar className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                  <span className="text-[10px] text-gray-500">Dedicación estimada:</span>
                  <span className="text-[10px] text-gray-300 font-medium">{semana.descripcion.duracion}</span>
                </div>
              </div>
            </motion.div>
          )}

          {activeSection === 'conceptos' && (
            <motion.div key="conceptos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-2">
              {/* Progress header */}
              <div className="flex items-center justify-between mb-3">
                <p className="text-[10px] text-gray-500">Lecturas de esta semana</p>
                <div className="flex items-center gap-1.5">
                  {semana.conceptos.map((c, i) => (
                    <div key={i} className={`w-2 h-2 rounded-full ${c.done ? 'bg-[#2b7d7a]' : 'bg-gray-700'}`} />
                  ))}
                  <span className="text-[10px] text-gray-500 ml-1">{semana.conceptos.filter(c => c.done).length}/{semana.conceptos.length}</span>
                </div>
              </div>
              {semana.conceptos.map((item, i) => (
                <div key={i} className={`rounded-xl border overflow-hidden transition-colors ${item.done ? 'border-gray-700/50 bg-gray-800/30' : 'border-[#2b7d7a]/20 bg-[#2b7d7a]/5'}`}>
                  <button onClick={() => setExpandedItem(expandedItem === i ? null : i)} className="w-full flex items-center gap-3 p-3 text-left cursor-pointer">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-[#2b7d7a]' : 'bg-gray-700 border border-gray-600'}`}>
                      {item.done ? <Check className="w-3.5 h-3.5" /> : <span className="text-[11px] text-gray-400 font-medium">{i + 1}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs font-medium text-gray-200 leading-snug">{item.titulo}</div>
                      <div className="flex items-center gap-2 text-[10px] text-gray-500 mt-0.5">
                        <span className="text-[#2b7d7a]">💡</span>
                        {item.tipo === 'lectura' ? 'Lectura' : 'Vídeo'} · {item.duracion}
                        {item.done && <span className="text-[#2b7d7a]">· Leído ✓</span>}
                      </div>
                    </div>
                    <ChevronRight className={`w-3.5 h-3.5 text-gray-600 shrink-0 transition-transform ${expandedItem === i ? 'rotate-90' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {expandedItem === i && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                        <div className="border-t border-gray-700/50">
                          {/* Article-style reading view */}
                          <div className="px-4 py-4 space-y-3">
                            <p className="text-[11px] text-gray-300 leading-relaxed">{item.desc}</p>
                            {/* Pull quote */}
                            <div className="border-l-2 border-[#BC9640] pl-3 py-1">
                              <p className="text-[11px] text-[#BC9640] italic leading-relaxed">
                                {i === 0 && '"El estímulo sensorial se convierte en la llave de acceso al estado emocional deseado."'}
                                {i === 1 && '"La plasticidad neuronal demuestra que el cerebro puede reprogramarse a cualquier edad."'}
                                {i === 2 && '"El anclaje más potente combina al menos dos canales sensoriales simultáneamente."'}
                              </p>
                            </div>
                            {/* Key concept chips */}
                            <div className="flex flex-wrap gap-1.5">
                              {i === 0 && ['Estímulo-respuesta', 'Asociación sensorial', 'Estado emocional'].map((t, k) => (
                                <span key={k} className="text-[9px] bg-[#2b7d7a]/15 text-[#2b7d7a] px-2 py-0.5 rounded-full border border-[#2b7d7a]/20">{t}</span>
                              ))}
                              {i === 1 && ['Neuroplasticidad', 'Patrones neuronales', 'Repetición consciente'].map((t, k) => (
                                <span key={k} className="text-[9px] bg-[#2b7d7a]/15 text-[#2b7d7a] px-2 py-0.5 rounded-full border border-[#2b7d7a]/20">{t}</span>
                              ))}
                              {i === 2 && ['Kinestésico', 'Auditivo', 'Visual', 'Combinado'].map((t, k) => (
                                <span key={k} className="text-[9px] bg-[#2b7d7a]/15 text-[#2b7d7a] px-2 py-0.5 rounded-full border border-[#2b7d7a]/20">{t}</span>
                              ))}
                            </div>
                            {!item.done && (
                              <button className="mt-1 bg-[#2b7d7a] text-white text-[10px] px-4 py-2 rounded-xl font-medium cursor-pointer hover:bg-[#226361] transition-colors w-full text-center">
                                ✓ Marcar como leído
                              </button>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'ejercicios' && (
            <motion.div key="ejercicios" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-3">
              {/* Progress tracker */}
              <div className="flex items-center gap-3 mb-2">
                <div className="flex-1 flex gap-1">
                  {semana.ejercicios.map((ej, i) => (
                    <div key={i} className={`flex-1 h-1.5 rounded-full ${ej.done ? 'bg-[#2b7d7a]' : 'bg-gray-800'}`} />
                  ))}
                </div>
                <span className="text-[10px] text-gray-500 shrink-0">
                  {semana.ejercicios.filter(e => e.done).length} de {semana.ejercicios.length} completados
                </span>
              </div>

              {semana.ejercicios.map((ej, i) => (
                <div key={i} className={`rounded-2xl border overflow-hidden ${ej.done ? 'border-gray-700/40 bg-gray-800/20' : 'border-[#BC9640]/25 bg-[#BC9640]/5'}`}>
                  {/* Exercise header */}
                  <div className={`px-4 py-3 flex items-center gap-3 ${ej.done ? 'border-b border-gray-700/30' : 'border-b border-[#BC9640]/15'}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 font-bold text-sm ${ej.done ? 'bg-[#2b7d7a] text-white' : 'bg-[#BC9640]/20 border border-[#BC9640]/40 text-[#BC9640]'}`}>
                      {ej.done ? <Check className="w-4 h-4" /> : (i + 1).toString()}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className={`text-xs font-semibold leading-snug ${ej.done ? 'text-gray-400' : 'text-gray-100'}`}>{ej.titulo}</div>
                      <div className={`text-[10px] mt-0.5 ${ej.done ? 'text-[#2b7d7a]' : 'text-gray-500'}`}>
                        {ej.done ? '✓ Completado' : '✎ Pendiente de respuesta'}
                      </div>
                    </div>
                  </div>
                  {/* Exercise body */}
                  <div className="px-4 py-3">
                    <div className={`text-[9px] uppercase tracking-widest font-bold mb-2 ${ej.done ? 'text-gray-600' : 'text-[#BC9640]'}`}>Pregunta guía</div>
                    <p className="text-[11px] text-gray-400 leading-relaxed italic mb-3">{ej.prompt}</p>
                    {ej.done ? (
                      /* Completed — show preview of response */
                      <div className="bg-gray-900/50 border border-gray-700/40 rounded-xl p-3">
                        <div className="text-[9px] text-gray-600 uppercase tracking-widest mb-2">Tu respuesta</div>
                        <p className="text-[10px] text-gray-400 leading-relaxed line-clamp-3">
                          {i === 0
                            ? 'Era una mañana de agosto, en la montaña. Recuerdo el olor a pino y la luz entre los árboles. Sentía el cuerpo completamente relajado y al mismo tiempo lleno de energía. Pensaba que podía con todo...'
                            : 'Mi respuesta personal guardada el 28 de marzo...'}
                        </p>
                        <button className="mt-2 text-[10px] text-gray-500 hover:text-gray-300 transition-colors cursor-pointer">Editar respuesta →</button>
                      </div>
                    ) : (
                      /* Pending — show text area */
                      <div>
                        <div className="bg-gray-900/60 rounded-xl p-3 border border-gray-700 min-h-[72px] mb-3 cursor-text">
                          <p className="text-[10px] text-gray-600 italic">Escribe tu respuesta aquí... No hay respuestas correctas ni incorrectas.</p>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] text-gray-600">Tu respuesta es privada</span>
                          <button className="bg-[#BC9640] text-white text-[10px] px-4 py-2 rounded-xl font-semibold cursor-pointer hover:bg-[#a07830] transition-colors">
                            Guardar respuesta
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'arteterapia' && (
            <motion.div key="arteterapia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
              <div className={`rounded-xl border p-4 ${semana.arteterapia.done ? 'border-gray-700/50 bg-gray-800/30' : 'border-purple-500/20 bg-purple-500/5'}`}>
                <div className="flex items-start gap-3 mb-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl shrink-0 ${semana.arteterapia.done ? 'bg-gray-700' : 'bg-purple-500/15'}`}>🎨</div>
                  <div>
                    <div className="text-[10px] text-purple-400 font-semibold uppercase tracking-widest mb-1">Ejercicio de Arteterapia</div>
                    <div className="text-sm font-semibold text-gray-100">{semana.arteterapia.titulo}</div>
                    <div className="text-[10px] text-gray-500 mt-1">{semana.arteterapia.tipo} · {semana.arteterapia.duracion}</div>
                  </div>
                </div>
                <div className="bg-gray-900/50 border border-gray-700/40 rounded-xl p-3 mb-4">
                  <div className="text-[10px] text-purple-400 uppercase tracking-widest font-bold mb-2">Instrucciones</div>
                  <p className="text-[11px] text-gray-300 leading-relaxed">{semana.arteterapia.instrucciones}</p>
                </div>
                {!semana.arteterapia.done && (
                  <>
                    <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center mb-3 cursor-pointer hover:border-purple-500/40 transition-colors">
                      <div className="text-2xl mb-2">📎</div>
                      <div className="text-[11px] text-gray-400">Sube una foto de tu ejercicio</div>
                      <div className="text-[10px] text-gray-600 mt-1">JPG, PNG o PDF · máx. 10MB</div>
                    </div>
                    <button className="w-full bg-purple-600/20 border border-purple-500/30 text-purple-300 text-xs py-2.5 rounded-xl font-medium cursor-pointer hover:bg-purple-600/30 transition-colors">
                      Marcar ejercicio como completado
                    </button>
                  </>
                )}
                {semana.arteterapia.done && (
                  <div className="flex items-center gap-2 text-[11px] text-[#2b7d7a]"><CheckCircle className="w-4 h-4" /> Ejercicio de arteterapia completado</div>
                )}
              </div>
              <div className="mt-4 bg-gray-800/30 border border-gray-700/30 rounded-xl p-3">
                <div className="text-[10px] text-gray-500 leading-relaxed">💡 <span className="text-gray-400">La arteterapia no evalúa habilidades artísticas. El proceso creativo es el trabajo, no el resultado. No hay respuestas correctas ni incorrectas.</span></div>
              </div>
            </motion.div>
          )}

          {activeSection === 'multimedia' && (
            <motion.div key="multimedia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-2">
              {semana.multimedia.map((m, i) => (
                <div key={i} className={`rounded-xl border p-3 flex items-center gap-3 cursor-pointer transition-colors ${'current' in m && m.current ? 'border-[#BC9640]/40 bg-[#BC9640]/8' : m.done ? 'border-gray-700/50 bg-gray-800/30 hover:border-gray-600' : 'border-gray-700/30 bg-gray-800/20 hover:border-gray-600'}`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${m.tipo === 'video' ? 'bg-[#2b7d7a]/20' : 'bg-[#BC9640]/20'}`}>
                    {m.tipo === 'video' ? <Film className="w-4 h-4 text-[#2b7d7a]" /> : <Headphones className="w-4 h-4 text-[#BC9640]" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-200 leading-snug truncate">{m.titulo}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">
                      <span className={m.tipo === 'video' ? 'text-[#2b7d7a]' : 'text-[#BC9640]'}>{m.tipo === 'video' ? 'Vídeo' : 'Audio'}</span> · {m.duracion}
                    </div>
                    {'current' in m && m.current && <div className="mt-1.5 w-full bg-gray-700 h-1 rounded-full"><div className="bg-[#BC9640] h-full w-2/5 rounded-full" /></div>}
                  </div>
                  {m.done ? <div className="w-6 h-6 rounded-full bg-[#2b7d7a] flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div> : <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 flex items-center justify-center shrink-0"><Play className="w-3 h-3" /></div>}
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'materiales' && (
            <motion.div key="materiales" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4 space-y-2">
              <p className="text-[10px] text-gray-500 mb-2">Descarga los materiales de apoyo para esta semana.</p>
              {semana.materiales.map((mat, i) => (
                <div key={i} className="rounded-xl border border-gray-700/40 bg-gray-800/30 p-3 flex items-center gap-3 cursor-pointer hover:border-gray-600 transition-colors">
                  <div className="w-10 h-10 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-red-400" /></div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-medium text-gray-200">{mat.titulo}</div>
                    <div className="text-[10px] text-gray-500 mt-0.5">{mat.formato} · {mat.paginas}</div>
                  </div>
                  <button className="w-7 h-7 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-[#2b7d7a] transition-colors cursor-pointer"><Download className="w-3.5 h-3.5 text-gray-300" /></button>
                </div>
              ))}
            </motion.div>
          )}

          {activeSection === 'diario' && (
            <motion.div key="diario-semana" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="text-[10px] text-gray-500">Entradas de esta semana</div>
                <button className="bg-[#BC9640]/15 text-[#BC9640] text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"><Plus className="w-3 h-3" /> Nueva</button>
              </div>
              {semana.diario.length > 0 ? (
                <div className="space-y-3">
                  {semana.diario.map((entry, i) => (
                    <div key={i} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors">
                      <div className="text-[10px] text-gray-500 mb-2">📓 {entry.fecha}</div>
                      <p className="text-[11px] text-gray-300 leading-relaxed">{entry.texto}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <div className="text-2xl mb-2">📓</div>
                  <p className="text-[11px] text-gray-500">Aún no has escrito en el diario esta semana.<br />Añade tu primera reflexión.</p>
                </div>
              )}
            </motion.div>
          )}

          {activeSection === 'completar' && (
            <motion.div key="completar" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-4">
              {semana.completado ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-[#2b7d7a] flex items-center justify-center mx-auto mb-4"><CheckCircle className="w-8 h-8 text-white" /></div>
                  <h3 className="font-serif text-base font-medium mb-1">¡Semana completada!</h3>
                  <p className="text-[11px] text-gray-400">Has finalizado todos los contenidos de esta semana.</p>
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Resumen de progreso</div>
                    {[
                      { label: 'Descripción leída', done: true },
                      { label: 'Conceptos completados', done: semana.conceptos.every(c => c.done) },
                      { label: 'Ejercicios realizados', done: semana.ejercicios.every(e => e.done) },
                      { label: 'Arteterapia completada', done: semana.arteterapia.done },
                      { label: 'Multimedia escuchada / vista', done: semana.multimedia.filter(m => m.done).length === semana.multimedia.length },
                      { label: 'Materiales revisados', done: false },
                      { label: 'Entrada de diario', done: semana.diario.length > 0 },
                    ].map((it, i) => (
                      <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-800/60 last:border-0">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 ${it.done ? 'bg-[#2b7d7a]' : 'border border-gray-600 bg-gray-800'}`}>
                          {it.done && <Check className="w-3 h-3" />}
                        </div>
                        <span className={`text-xs ${it.done ? 'text-gray-300' : 'text-gray-500'}`}>{it.label}</span>
                      </div>
                    ))}
                  </div>
                  <button className="w-full bg-[#BC9640] text-white text-sm py-3 rounded-xl font-semibold cursor-pointer hover:bg-[#a07830] transition-colors">
                    Marcar semana como completada ✓
                  </button>
                  <p className="text-[10px] text-gray-600 text-center mt-2">Podrás seguir accediendo a este contenido después de completarla.</p>
                </>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
}

type MainView = 'dashboard' | 'semanas' | 'semana-detalle' | 'arteterapia' | 'multimedia' | 'materiales' | 'diario' | 'comunidad' | 'progreso';

const mainNav: { id: MainView; label: string; emoji: string }[] = [
  { id: 'dashboard',   label: 'Inicio',       emoji: '🏠' },
  { id: 'semanas',     label: 'Formaciones',   emoji: '📚' },
  { id: 'arteterapia', label: 'Arteterapia',   emoji: '🎨' },
  { id: 'multimedia',  label: 'Multimedia',    emoji: '🎵' },
  { id: 'materiales',  label: 'Materiales',    emoji: '📄' },
  { id: 'diario',      label: 'Diario',        emoji: '📝' },
  { id: 'comunidad',   label: 'Comunidad',     emoji: '💬' },
  { id: 'progreso',    label: 'Progreso',      emoji: '📊' },
];

function AlumnoDemo() {
  const [view, setView] = useState<MainView>('dashboard');
  const [selectedSemana, setSelectedSemana] = useState<typeof semanas[0] | null>(null);

  const todasSemanas = [
    semanas[0],
    { ...semanas[0], num: 2, label: 'Semana 2', titulo: 'Reconocimiento de patrones', active: false, progreso: 100, completado: true, diario: [] },
    { ...semanas[0], num: 3, label: 'Semana 3', titulo: 'Herramientas de integración', active: false, progreso: 100, completado: true, diario: [] },
    semanas[1],
    { ...semanas[1], num: 5, label: 'Semana 5', titulo: 'Expansión de conciencia', done: false, active: false, locked: true, progreso: 0, completado: false, diario: [] },
    { ...semanas[1], num: 6, label: 'Semana 6', titulo: 'Integración y cierre del ciclo', done: false, active: false, locked: true, progreso: 0, completado: false, diario: [] },
  ];

  const openSemana = (s: typeof semanas[0]) => {
    if (s.locked) return;
    setSelectedSemana(s);
    setView('semana-detalle');
  };

  const activeNavId: MainView = view === 'semana-detalle' ? 'semanas' : view;

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      {/* Sidebar nav */}
      <div className="md:w-44 shrink-0">
        <p className="text-[10px] font-semibold text-gray-500 uppercase tracking-widest mb-2 px-1">Mi academia</p>
        <div className="space-y-0.5">
          {mainNav.map(item => (
            <button
              key={item.id}
              onClick={() => setView(item.id)}
              className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-left text-xs font-medium transition-all cursor-pointer ${activeNavId === item.id ? 'bg-[#2b7d7a]/15 text-[#2b7d7a]' : 'text-gray-500 hover:bg-gray-100 hover:text-gray-700'}`}
            >
              <span className="text-sm">{item.emoji}</span>
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Content pane */}
      <div className="flex-1 bg-[#0f0f0f] rounded-2xl overflow-hidden text-white flex flex-col min-h-0">
        {/* Topbar */}
        <div className="h-9 border-b border-gray-800 flex items-center px-4 gap-3 shrink-0">
          <div className="w-3.5 h-3.5 rounded bg-gray-700" />
          <span className="text-[11px] text-gray-400 font-medium">AcademiaDemo</span>
          <div className="flex-1" />
          <div className="w-6 h-6 rounded-full bg-gradient-to-br from-[#BC9640] to-[#795901] text-[10px] flex items-center justify-center font-semibold">M</div>
        </div>

        <AnimatePresence mode="wait">

          {/* ─── INICIO (DASHBOARD) ──────────────────────────── */}
          {view === 'dashboard' && (
            <motion.div key="dashboard" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-5 overflow-auto">
              <div className="mb-5">
                <h2 className="font-serif text-base font-medium mb-0.5">Bienvenida de nuevo, María 👋</h2>
                <p className="text-gray-400 text-[11px] mb-3">Semana 4 de 12 · 33% del programa completado</p>
                <div className="bg-gray-800 rounded-full h-1.5 w-full">
                  <div className="bg-[#BC9640] h-1.5 rounded-full w-1/3" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2.5 mb-4">
                {[
                  { emoji: '📚', label: 'Formaciones', id: 'semanas' as MainView },
                  { emoji: '🎨', label: 'Arteterapia', id: 'arteterapia' as MainView },
                  { emoji: '🎵', label: 'Multimedia', id: 'multimedia' as MainView },
                  { emoji: '📝', label: 'Diario', id: 'diario' as MainView },
                  { emoji: '📄', label: 'Materiales', id: 'materiales' as MainView },
                  { emoji: '📊', label: 'Mi progreso', id: 'progreso' as MainView },
                ].map((item) => (
                  <button key={item.id} onClick={() => setView(item.id)} className="bg-gray-800/50 border border-gray-700/50 rounded-xl p-3.5 flex items-center gap-3 hover:bg-gray-700/50 transition-colors cursor-pointer text-left">
                    <span className="text-lg">{item.emoji}</span>
                    <span className="text-[11px] font-medium text-gray-300">{item.label}</span>
                  </button>
                ))}
              </div>
              <div className="bg-[#2b7d7a]/10 border border-[#2b7d7a]/20 rounded-xl p-3 mb-3">
                <div className="text-[10px] text-[#2b7d7a] font-semibold mb-1">Continúa donde lo dejaste</div>
                <button className="text-[11px] text-gray-300 cursor-pointer hover:text-white transition-colors" onClick={() => openSemana(semanas[1])}>
                  Semana 4 · Ejercicio 2: Protocolo de anclaje →
                </button>
              </div>
              <div className="bg-gray-800/60 rounded-xl p-3 border border-gray-700/50 flex items-center gap-3 cursor-pointer hover:bg-gray-800 transition-colors" onClick={() => setView('multimedia')}>
                <div className="w-9 h-9 rounded-xl bg-[#BC9640]/20 flex items-center justify-center shrink-0"><Play className="w-4 h-4 text-[#BC9640]" /></div>
                <div className="flex-1 min-w-0">
                  <div className="text-[11px] font-medium mb-1.5 truncate">Meditación de anclaje — Semana 4</div>
                  <div className="w-full bg-gray-700 h-1 rounded-full"><div className="bg-[#BC9640] w-2/5 h-full rounded-full" /></div>
                </div>
                <Volume2 className="w-4 h-4 text-gray-500 shrink-0" />
              </div>
            </motion.div>
          )}

          {/* ─── FORMACIONES ─────────────────────────────────── */}
          {view === 'semanas' && (
            <motion.div key="semanas" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-xs font-semibold text-gray-200">Método TCT — 12 semanas</h2>
                <span className="text-[10px] text-gray-500">4 / 12</span>
              </div>
              <div className="space-y-2">
                {todasSemanas.map((item, i) => (
                  <div
                    key={i}
                    onClick={() => openSemana(item as any)}
                    className={`flex items-center gap-3 p-3 rounded-xl border transition-all ${item.locked ? 'border-gray-800/30 bg-gray-800/10 opacity-50 cursor-not-allowed' : item.active ? 'border-[#BC9640]/30 bg-[#BC9640]/5 cursor-pointer hover:border-[#BC9640]/50' : item.done ? 'border-gray-700/40 bg-gray-800/30 cursor-pointer hover:border-gray-600' : 'border-gray-800 bg-gray-800/20 cursor-not-allowed opacity-60'}`}
                  >
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm ${item.done ? 'bg-[#2b7d7a]' : item.active ? 'bg-[#BC9640]/25 border border-[#BC9640]/40' : 'bg-gray-700'}`}>
                      {item.done ? <Check className="w-3.5 h-3.5" /> : item.active ? <Play className="w-3 h-3 text-[#BC9640]" /> : item.locked ? <Lock className="w-3 h-3 text-gray-600" /> : <span className="text-[10px] text-gray-400">{item.num}</span>}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-500">{item.label}</div>
                      <div className="text-[11px] font-medium text-gray-200 truncate">{item.titulo}</div>
                      {!item.locked && item.progreso > 0 && item.progreso < 100 && (
                        <div className="mt-1 w-20 bg-gray-700 h-1 rounded-full"><div className="bg-[#BC9640] h-full rounded-full" style={{ width: `${item.progreso}%` }} /></div>
                      )}
                    </div>
                    <div className="shrink-0 flex flex-col items-end gap-1">
                      {item.done && <span className="text-[9px] text-[#2b7d7a] font-medium">Completada</span>}
                      {item.active && <span className="text-[9px] text-[#BC9640] font-medium">En curso</span>}
                      {!item.locked && <ChevronRight className="w-3.5 h-3.5 text-gray-600" />}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── DETALLE SEMANA ───────────────────────────────── */}
          {view === 'semana-detalle' && selectedSemana && (
            <SemanaDetalle semana={selectedSemana} onBack={() => setView('semanas')} />
          )}

          {/* ─── ARTETERAPIA ─────────────────────────────────── */}
          {view === 'arteterapia' && (
            <motion.div key="arteterapia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <h2 className="font-serif text-sm font-medium mb-1">Arteterapia</h2>
              <p className="text-[10px] text-gray-500 mb-4">Ejercicios creativos semanales para la integración emocional</p>
              <div className="space-y-3">
                {[
                  { semana: 'Semana 1', titulo: 'Mandala del yo interior', tipo: 'Dibujo · 20–30 min', done: true, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { semana: 'Semana 2', titulo: 'Collage de sombras y luz', tipo: 'Collage · 30–40 min', done: true, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { semana: 'Semana 3', titulo: 'Carta visual a mi yo pasado', tipo: 'Escritura creativa · 25 min', done: true, color: 'text-purple-400', bg: 'bg-purple-500/10' },
                  { semana: 'Semana 4', titulo: 'El río de tu vida', tipo: 'Dibujo / collage · 30–45 min', done: false, active: true, color: 'text-[#BC9640]', bg: 'bg-[#BC9640]/10' },
                  { semana: 'Semana 5', titulo: 'Mapa de tus vínculos', tipo: 'Mapa visual · 20 min', done: false, locked: true, color: 'text-gray-600', bg: 'bg-gray-800/30' },
                ].map((item, i) => (
                  <div key={i} className={`rounded-xl border p-3.5 flex items-center gap-3 ${item.done ? 'border-gray-700/40 bg-gray-800/30' : item.active ? 'border-[#BC9640]/30 bg-[#BC9640]/5 cursor-pointer' : 'border-gray-800/30 opacity-50 cursor-not-allowed'}`}>
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg shrink-0 ${item.bg}`}>🎨</div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-gray-500">{item.semana}</div>
                      <div className="text-[11px] font-medium text-gray-200">{item.titulo}</div>
                      <div className={`text-[10px] mt-0.5 ${item.color}`}>{item.tipo}</div>
                    </div>
                    {item.done && <div className="w-6 h-6 rounded-full bg-[#2b7d7a] flex items-center justify-center shrink-0"><Check className="w-3 h-3" /></div>}
                    {item.active && <span className="text-[9px] text-[#BC9640] font-semibold shrink-0">Pendiente</span>}
                    {item.locked && <Lock className="w-3.5 h-3.5 text-gray-600 shrink-0" />}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── MULTIMEDIA ──────────────────────────────────── */}
          {view === 'multimedia' && (
            <motion.div key="multimedia-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 flex flex-col">
              <div className="bg-black relative flex items-center justify-center shrink-0" style={{ aspectRatio: '16/9', maxHeight: '52%' }}>
                <div className="absolute inset-0 bg-gradient-to-br from-[#2b7d7a]/20 to-[#BC9640]/10" />
                <div className="relative z-10"><div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto border border-white/20"><Pause className="w-5 h-5 text-white" /></div></div>
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className="text-[10px] text-white/50">12:40</span>
                    <div className="flex-1 bg-white/20 h-1 rounded-full"><div className="bg-[#BC9640] h-full w-2/3 rounded-full" /></div>
                    <span className="text-[10px] text-white/50">19:00</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Play className="w-4 h-4 text-white/70 cursor-pointer" /><SkipForward className="w-4 h-4 text-white/50 cursor-pointer" /><Volume2 className="w-4 h-4 text-white/50 cursor-pointer" />
                    <div className="flex-1" /><span className="text-[10px] text-white/40">HD</span>
                  </div>
                </div>
              </div>
              <div className="flex-1 p-4 overflow-auto">
                <h3 className="font-serif text-sm font-medium mb-0.5">Meditación de Anclaje Profundo</h3>
                <p className="text-gray-500 text-[10px] mb-3">Semana 4 · Audio · 19 min</p>
                <div className="text-[11px] text-gray-400 leading-relaxed mb-4">En esta práctica profunda conectarás con las capas más sutiles de tu conciencia a través de la técnica de anclaje del Método TCT...</div>
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Más contenido</div>
                <div className="space-y-2">
                  {[
                    { titulo: 'Clase magistral — Semana 1', tipo: 'video', duracion: '22:15', done: true },
                    { titulo: 'Meditación apertura — Semana 1', tipo: 'audio', duracion: '14:30', done: true },
                    { titulo: 'Clase — Anclaje profundo', tipo: 'video', duracion: '31:45', done: true },
                    { titulo: 'Tutorial — Protocolo 5 días', tipo: 'video', duracion: '08:20', done: false },
                  ].map((m, i) => (
                    <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${m.done ? 'border-gray-700/40 bg-gray-800/20 hover:border-gray-600' : 'border-[#2b7d7a]/20 bg-[#2b7d7a]/5 hover:border-[#2b7d7a]/40'}`}>
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 ${m.tipo === 'video' ? 'bg-[#2b7d7a]/20' : 'bg-[#BC9640]/20'}`}>
                        {m.tipo === 'video' ? <Film className="w-3.5 h-3.5 text-[#2b7d7a]" /> : <Headphones className="w-3.5 h-3.5 text-[#BC9640]" />}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="text-[10px] font-medium text-gray-300 truncate">{m.titulo}</div>
                        <div className="text-[9px] text-gray-600">{m.duracion}</div>
                      </div>
                      {m.done ? <Check className="w-3.5 h-3.5 text-[#2b7d7a] shrink-0" /> : <Play className="w-3.5 h-3.5 text-gray-500 shrink-0" />}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ─── MATERIALES ──────────────────────────────────── */}
          {view === 'materiales' && (
            <motion.div key="materiales-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <h2 className="font-serif text-sm font-medium mb-0.5">Biblioteca de materiales</h2>
              <p className="text-[10px] text-gray-500 mb-4">Todos los documentos descargables de tu formación</p>
              {[
                { semana: 'Semana 1', docs: [{ titulo: 'Guía de inicio — Método TCT', paginas: '18 págs' }, { titulo: 'Glosario de términos', paginas: '4 págs' }] },
                { semana: 'Semana 2', docs: [{ titulo: 'Fichas de patrones cognitivos', paginas: '6 págs' }] },
                { semana: 'Semana 3', docs: [{ titulo: 'Protocolo de integración diaria', paginas: '3 págs' }, { titulo: 'Guía de herramientas TCT', paginas: '12 págs' }] },
                { semana: 'Semana 4', docs: [{ titulo: 'Ficha de práctica — Anclaje kinestésico', paginas: '2 págs' }, { titulo: 'Registro de sesiones (7 días)', paginas: '1 pág' }, { titulo: 'Mapa de los 5 tipos de anclaje', paginas: '3 págs' }] },
              ].map((group, gi) => (
                <div key={gi} className="mb-5">
                  <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">{group.semana}</div>
                  <div className="space-y-2">
                    {group.docs.map((doc, di) => (
                      <div key={di} className="flex items-center gap-3 p-3 rounded-xl border border-gray-700/40 bg-gray-800/30 cursor-pointer hover:border-gray-600 transition-colors">
                        <div className="w-9 h-9 rounded-xl bg-red-500/10 flex items-center justify-center shrink-0"><FileText className="w-4 h-4 text-red-400" /></div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[11px] font-medium text-gray-200">{doc.titulo}</div>
                          <div className="text-[10px] text-gray-500">PDF · {doc.paginas}</div>
                        </div>
                        <button className="w-7 h-7 rounded-lg bg-gray-700 flex items-center justify-center hover:bg-[#2b7d7a] transition-colors cursor-pointer"><Download className="w-3.5 h-3.5 text-gray-300" /></button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ─── DIARIO ──────────────────────────────────────── */}
          {view === 'diario' && (
            <motion.div key="diario-main" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-serif text-sm font-medium">Mi Diario Personal</h2>
                <button className="bg-[#BC9640]/15 text-[#BC9640] text-[10px] px-2.5 py-1.5 rounded-lg flex items-center gap-1 cursor-pointer"><Plus className="w-3 h-3" /> Nueva entrada</button>
              </div>
              <div className="space-y-3">
                {[
                  { date: '2 Abr 2026', semana: 'Semana 4', text: 'Hoy la meditación de anclaje fue diferente. Sentí cómo mis tensiones se disolvían capa a capa. Necesito repetir este proceso mañana por la mañana antes de empezar el día.' },
                  { date: '31 Mar 2026', semana: 'Semana 3', text: 'Semana 3 completada. El módulo de integración me ha dado herramientas concretas. La práctica de 7 días consecutivos ha marcado una diferencia real en cómo reacciono al estrés.' },
                  { date: '24 Mar 2026', semana: 'Semana 3', text: 'El ejercicio de arteterapia de esta semana (la carta visual) me hizo conectar con una versión de mí misma que había olvidado. Guardé el dibujo en un marco.' },
                  { date: '9 Ene 2026', semana: 'Semana 1', text: 'El mapa corporal me sorprendió. Hay mucha tensión acumulada en el cuello y mandíbula que no había reconocido como emocional. Ahora lo veo diferente.' },
                ].map((entry, i) => (
                  <div key={i} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-[10px] text-gray-500">{entry.date}</span>
                      <span className="text-[9px] bg-gray-700 text-gray-400 px-1.5 py-0.5 rounded-md">{entry.semana}</span>
                    </div>
                    <p className="text-[11px] text-gray-300 leading-relaxed line-clamp-3">{entry.text}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ─── COMUNIDAD ───────────────────────────────────── */}
          {view === 'comunidad' && (
            <motion.div key="comunidad" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <h2 className="font-serif text-sm font-medium mb-0.5">Comunidad</h2>
              <p className="text-[10px] text-gray-500 mb-4">Comparte con otros alumnos del programa</p>
              <div className="space-y-3">
                {[
                  { user: 'Lucía R.', ini: 'L', time: 'hace 2 h', msg: '¿Alguien más sintió que el ejercicio de anclaje de la semana 4 fue muy intenso al principio? Yo tardé 3 días en notar la diferencia pero luego fue tremendo.', replies: 4, bg: 'bg-[#2b7d7a]' },
                  { user: 'Sara M.', ini: 'S', time: 'hace 5 h', msg: 'Acabo de terminar la semana 3 y el mandala de arteterapia me pareció lo más poderoso hasta ahora. No esperaba que un dibujo me mostrara tanto.', replies: 7, bg: 'bg-[#BC9640]' },
                  { user: 'Carmen T.', ini: 'C', time: 'ayer', msg: 'Empezando la semana 2. ¿Algún consejo para el diario de patrones? Me cuesta no juzgar lo que escribo.', replies: 12, bg: 'bg-purple-600' },
                  { user: 'Isabel F.', ini: 'I', time: 'hace 3 días', msg: 'Termino hoy el programa completo 🥲 Ha sido un año de transformación profunda. Gracias a todos los que compartieron el camino.', replies: 23, bg: 'bg-pink-600' },
                ].map((post, i) => (
                  <div key={i} className="bg-gray-800/40 border border-gray-700/30 rounded-xl p-4 cursor-pointer hover:border-gray-600 transition-colors">
                    <div className="flex items-start gap-3">
                      <div className={`w-7 h-7 rounded-full ${post.bg} flex items-center justify-center text-[11px] font-bold text-white shrink-0`}>{post.ini}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1.5">
                          <span className="text-[11px] font-semibold text-gray-200">{post.user}</span>
                          <span className="text-[10px] text-gray-600">{post.time}</span>
                        </div>
                        <p className="text-[11px] text-gray-300 leading-relaxed">{post.msg}</p>
                        <div className="mt-2 flex items-center gap-1 text-[10px] text-gray-500">
                          <span className="cursor-pointer hover:text-[#2b7d7a] transition-colors">💬 {post.replies} respuestas</span>
                          <span className="mx-2">·</span>
                          <span className="cursor-pointer hover:text-[#BC9640] transition-colors">❤️ Me resonó</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-3 w-full border border-gray-700 rounded-xl p-3 text-[11px] text-gray-400 text-left cursor-pointer hover:border-gray-500 hover:bg-gray-800/30 transition-colors">
                + Compartir algo con la comunidad...
              </button>
            </motion.div>
          )}

          {/* ─── PROGRESO ────────────────────────────────────── */}
          {view === 'progreso' && (
            <motion.div key="progreso" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex-1 p-4 overflow-auto">
              <h2 className="font-serif text-sm font-medium mb-4">Mi progreso</h2>
              <div className="grid grid-cols-3 gap-2.5 mb-5">
                {[
                  { label: 'Semanas completadas', value: '3', sub: 'de 12', color: 'text-[#2b7d7a]' },
                  { label: 'Ejercicios realizados', value: '7', sub: 'de 21', color: 'text-[#BC9640]' },
                  { label: 'Días de práctica', value: '24', sub: 'días', color: 'text-purple-400' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-800/50 border border-gray-700/40 rounded-xl p-3 text-center">
                    <div className={`text-xl font-bold font-serif ${stat.color}`}>{stat.value}</div>
                    <div className="text-[9px] text-gray-500 leading-tight mt-0.5">{stat.label}<br /><span className="text-gray-600">{stat.sub}</span></div>
                  </div>
                ))}
              </div>
              <div className="mb-5">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-3">Avance por semana</div>
                <div className="space-y-2.5">
                  {[
                    { label: 'S1 — Fundamentos', pct: 100, color: 'bg-[#2b7d7a]' },
                    { label: 'S2 — Patrones', pct: 100, color: 'bg-[#2b7d7a]' },
                    { label: 'S3 — Integración', pct: 100, color: 'bg-[#2b7d7a]' },
                    { label: 'S4 — Anclaje', pct: 35, color: 'bg-[#BC9640]' },
                    { label: 'S5 — Expansión', pct: 0, color: 'bg-gray-600' },
                    { label: 'S6 — Cierre', pct: 0, color: 'bg-gray-600' },
                  ].map((s, i) => (
                    <div key={i} className="flex items-center gap-3">
                      <div className="text-[10px] text-gray-500 w-28 shrink-0 truncate">{s.label}</div>
                      <div className="flex-1 bg-gray-800 rounded-full h-1.5">
                        <div className={`${s.color} h-1.5 rounded-full transition-all`} style={{ width: `${s.pct}%` }} />
                      </div>
                      <div className="text-[10px] text-gray-500 w-8 text-right shrink-0">{s.pct}%</div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mb-4">
                <div className="text-[10px] text-gray-500 uppercase tracking-widest mb-2">Logros</div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { emoji: '🌱', label: 'Primera semana', done: true },
                    { emoji: '🔥', label: '7 días seguidos', done: true },
                    { emoji: '⚓', label: 'Anclaje instalado', done: false },
                    { emoji: '📓', label: '10 entradas diario', done: true },
                    { emoji: '🎨', label: '3 arteterapias', done: true },
                    { emoji: '💬', label: 'Primera aportación', done: false },
                  ].map((b, i) => (
                    <div key={i} className={`rounded-xl border p-2.5 text-center ${b.done ? 'border-[#BC9640]/30 bg-[#BC9640]/8' : 'border-gray-800 bg-gray-800/20 opacity-40'}`}>
                      <div className="text-lg mb-1">{b.emoji}</div>
                      <div className={`text-[9px] font-medium leading-tight ${b.done ? 'text-gray-300' : 'text-gray-600'}`}>{b.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}

function AdminDemo() {
  const [section, setSection] = useState<'cursos' | 'alumnos' | 'multimedia' | 'ajustes'>('cursos');

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      <div className="md:w-48 space-y-1 shrink-0">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">Panel Admin</p>
        {([
          { id: 'cursos', label: 'Cursos', icon: BookOpen },
          { id: 'alumnos', label: 'Alumnos', icon: Users },
          { id: 'multimedia', label: 'Multimedia', icon: Film },
          { id: 'ajustes', label: 'Marca y diseño', icon: Palette },
        ] as const).map(item => (
          <button
            key={item.id}
            onClick={() => setSection(item.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left text-sm font-medium transition-all cursor-pointer ${section === item.id ? 'bg-[#2b7d7a]/10 text-[#2b7d7a]' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <item.icon className="w-4 h-4 shrink-0" />
            {item.label}
          </button>
        ))}
      </div>

      <div className="flex-1 bg-white rounded-2xl border border-gray-100 overflow-hidden min-h-0">
        <AnimatePresence mode="wait">
          {section === 'cursos' && (
            <motion.div key="cursos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 h-full overflow-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Mis Cursos</h2>
                <button className="bg-[#2b7d7a] text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#226361] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Nuevo curso
                </button>
              </div>
              <div className="space-y-3 mb-6">
                {[
                  { title: 'Método TCT — Nivel Inicial', alumnos: 32, semanas: 12, estado: 'Publicado', ingresos: '€3.168' },
                  { title: 'Método TCT — Nivel Avanzado', alumnos: 15, semanas: 8, estado: 'Publicado', ingresos: '€2.235' },
                  { title: 'Retiro Online Intensivo', alumnos: 8, semanas: 4, estado: 'Borrador', ingresos: '€792' },
                ].map((course, i) => (
                  <div key={i} className="flex items-center gap-4 p-4 border border-gray-100 rounded-xl hover:border-gray-200 transition-colors cursor-pointer">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#2b7d7a]/20 to-[#BC9640]/20 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800 mb-0.5">{course.title}</div>
                      <div className="text-xs text-gray-400">{course.alumnos} alumnos · {course.semanas} semanas</div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm font-semibold text-[#2b7d7a] mb-0.5">{course.ingresos}</div>
                      <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${course.estado === 'Publicado' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{course.estado}</span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-3 gap-4">
                {[
                  { label: 'Alumnos activos', val: '55', color: 'text-[#2b7d7a]' },
                  { label: 'Ingresos totales', val: '€6.2k', color: 'text-[#BC9640]' },
                  { label: 'Módulos publicados', val: '48', color: 'text-gray-700' },
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-4 text-center">
                    <div className={`text-xl font-bold mb-1 ${stat.color}`}>{stat.val}</div>
                    <div className="text-xs text-gray-400">{stat.label}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'alumnos' && (
            <motion.div key="alumnos" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 h-full overflow-auto">
              <h2 className="font-semibold text-gray-800 mb-5">Gestión de Alumnos</h2>
              <div className="space-y-2">
                {[
                  { name: 'María García', plan: 'Plan Premium', acceso: 'Activo', última: 'Hoy' },
                  { name: 'Laura Martínez', plan: 'Plan Premium', acceso: 'Activo', última: 'Ayer' },
                  { name: 'Ana López', plan: 'Plan Básico', acceso: 'Activo', última: 'Hace 3 días' },
                  { name: 'Carmen Ruiz', plan: 'Plan Premium', acceso: 'Activo', última: 'Hace 5 días' },
                  { name: 'Elena Torres', plan: 'Plan Básico', acceso: 'Inactivo', última: 'Hace 2 semanas' },
                ].map((alumno, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#2b7d7a]/30 to-[#BC9640]/30 flex items-center justify-center text-sm font-medium shrink-0">
                      {alumno.name[0]}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-medium text-gray-800">{alumno.name}</div>
                      <div className="text-xs text-gray-400">{alumno.plan} · Última visita: {alumno.última}</div>
                    </div>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium shrink-0 ${alumno.acceso === 'Activo' ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-500'}`}>{alumno.acceso}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'multimedia' && (
            <motion.div key="multimedia" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 h-full overflow-auto">
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-semibold text-gray-800">Galería Multimedia</h2>
                <button className="bg-[#2b7d7a] text-white text-xs px-4 py-2 rounded-lg flex items-center gap-1.5 cursor-pointer hover:bg-[#226361] transition-colors">
                  <Plus className="w-3.5 h-3.5" /> Subir archivo
                </button>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { type: 'video', label: 'Intro Semana 1', duration: '18:42', color: 'from-[#2b7d7a]/30' },
                  { type: 'audio', label: 'Meditación anclaje', duration: '19:00', color: 'from-[#BC9640]/30' },
                  { type: 'video', label: 'Práctica semana 2', duration: '24:15', color: 'from-[#2b7d7a]/30' },
                  { type: 'audio', label: 'Respiración profunda', duration: '12:30', color: 'from-[#BC9640]/30' },
                  { type: 'image', label: 'Mapa del método', color: 'from-gray-200' },
                  { type: 'image', label: 'Diagrama TCT', color: 'from-gray-200' },
                ].map((file, i) => (
                  <div key={i} className={`aspect-video rounded-xl bg-gradient-to-br ${file.color} to-gray-100 flex flex-col items-center justify-center gap-2 border border-gray-100 cursor-pointer hover:border-gray-200 transition-colors`}>
                    {file.type === 'video' && <Film className="w-6 h-6 text-[#2b7d7a]" />}
                    {file.type === 'audio' && <Volume2 className="w-6 h-6 text-[#BC9640]" />}
                    {file.type === 'image' && <ImageIcon className="w-6 h-6 text-gray-400" />}
                    <span className="text-[10px] text-gray-600 font-medium text-center px-2 leading-tight">{file.label}</span>
                    {file.duration && <span className="text-[9px] text-gray-400">{file.duration}</span>}
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {section === 'ajustes' && (
            <motion.div key="ajustes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="p-6 h-full overflow-auto">
              <h2 className="font-semibold text-gray-800 mb-6">Personalización de Marca</h2>
              <div className="space-y-6">
                <div className="flex items-center gap-6 p-5 border border-gray-100 rounded-2xl">
                  <div className="w-16 h-16 rounded-2xl bg-[#1D1D1F] flex items-center justify-center shrink-0">
                    <div className="w-6 h-6 rounded-full bg-white" />
                  </div>
                  <div>
                    <div className="font-medium text-sm mb-1">Logo de la academia</div>
                    <div className="text-xs text-gray-400 mb-3">Tu logo aparece en la nav, login y emails.</div>
                    <button className="text-xs text-[#2b7d7a] font-medium cursor-pointer hover:underline">Cambiar logo</button>
                  </div>
                </div>
                <div className="p-5 border border-gray-100 rounded-2xl">
                  <div className="font-medium text-sm mb-3">Colores de marca</div>
                  <div className="flex gap-3">
                    {['#2b7d7a', '#BC9640', '#1D1D1F', '#FAFAF8'].map(c => (
                      <div key={c} className="w-10 h-10 rounded-full border-2 border-white shadow-md cursor-pointer hover:scale-110 transition-transform" style={{ background: c }} />
                    ))}
                    <div className="w-10 h-10 rounded-full border-2 border-dashed border-gray-200 flex items-center justify-center cursor-pointer hover:border-gray-400">
                      <Plus className="w-4 h-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                <div className="p-5 border border-gray-100 rounded-2xl">
                  <div className="font-medium text-sm mb-1">Dominio personalizado</div>
                  <div className="text-xs text-gray-400 mb-3">Publica en academia.tumarca.com con SSL automático.</div>
                  <div className="flex gap-2">
                    <input defaultValue="academia.frecuenciaintegral.com" className="flex-1 border border-gray-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-[#2b7d7a]/30" readOnly />
                    <button className="bg-[#2b7d7a] text-white text-xs px-4 py-2 rounded-lg cursor-pointer">Verificar</button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function PagosDemo() {
  const [step, setStep] = useState(0);
  const steps = [
    {
      num: '01', title: 'Conecta tu Stripe',
      content: (
        <div className="space-y-4">
          <div className="bg-white border border-gray-100 rounded-2xl p-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-12 bg-[#635bff]/10 rounded-xl flex items-center justify-center shrink-0">
                <span className="font-bold text-[#635bff] text-lg">S</span>
              </div>
              <div>
                <div className="font-semibold text-gray-800">Stripe Connect</div>
                <div className="text-sm text-gray-400">Vincula tu cuenta de pagos en 1 clic</div>
              </div>
            </div>
            <button className="w-full bg-[#635bff] text-white py-3 rounded-xl font-medium text-sm hover:bg-[#4f46e5] transition-colors cursor-pointer flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4" /> Conectar con Stripe
            </button>
          </div>
          <div className="text-xs text-gray-400 text-center">El dinero de cada venta va directamente a tu cuenta bancaria. Sin intermediarios.</div>
        </div>
      )
    },
    {
      num: '02', title: 'Crea tus planes de precios',
      content: (
        <div className="space-y-3">
          {[
            { name: 'Puerta Blanca', price: '€49', period: '/mes', features: ['Acceso Semana por semana', 'Área multimedia', 'Mi diario'], color: 'border-gray-200' },
            { name: 'Puerta Oro', price: '€99', period: '/mes', features: ['Todo lo anterior', 'Acceso completo al programa', 'Soporte prioritario'], color: 'border-[#BC9640] bg-[#BC9640]/5', badge: 'Recomendado' },
          ].map((plan, i) => (
            <div key={i} className={`border-2 rounded-2xl p-5 relative ${plan.color}`}>
              {plan.badge && <span className="absolute -top-3 left-4 bg-[#BC9640] text-white text-xs px-3 py-1 rounded-full font-medium">{plan.badge}</span>}
              <div className="flex items-start justify-between mb-3">
                <div>
                  <div className="font-semibold text-gray-800">{plan.name}</div>
                  <div className="text-2xl font-bold mt-1">{plan.price}<span className="text-sm text-gray-400 font-normal">{plan.period}</span></div>
                </div>
              </div>
              <ul className="space-y-1.5">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-center gap-2 text-sm text-gray-600">
                    <CheckCircle2 className="w-4 h-4 text-[#2b7d7a] shrink-0" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )
    },
    {
      num: '03', title: 'El alumno paga en tu academia',
      content: (
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
          <div className="text-center mb-5">
            <div className="font-semibold text-gray-800 mb-1">Completa tu suscripción</div>
            <div className="text-sm text-gray-400">Acceso inmediato tras el pago</div>
          </div>
          <div className="space-y-3 mb-5">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Número de tarjeta</label>
              <div className="border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-400 bg-gray-50">4242 4242 4242 4242</div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Caducidad</label>
                <div className="border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-400 bg-gray-50">12/28</div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">CVC</label>
                <div className="border border-gray-200 rounded-xl px-3 py-3 text-sm text-gray-400 bg-gray-50">•••</div>
              </div>
            </div>
          </div>
          <button className="w-full bg-[#1D1D1F] text-white py-3 rounded-xl font-medium text-sm cursor-pointer hover:bg-black transition-colors">
            Pagar €99/mes
          </button>
          <div className="flex items-center justify-center gap-2 mt-3">
            <div className="w-4 h-4 text-gray-300"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/></svg></div>
            <span className="text-[10px] text-gray-400">Pago seguro con Stripe</span>
          </div>
        </div>
      )
    },
    {
      num: '04', title: 'El dinero llega a tu banco',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 border border-green-100 rounded-2xl p-6 text-center">
            <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8 text-green-600" />
            </div>
            <div className="font-semibold text-green-800 text-lg mb-1">¡Pago recibido!</div>
            <div className="text-green-600 text-sm">€99 → Tu cuenta bancaria</div>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-5">
            <div className="text-sm font-semibold text-gray-700 mb-3">Resumen del mes</div>
            <div className="space-y-2">
              {[
                { label: 'Nuevas suscripciones', val: '8', color: 'text-[#2b7d7a]' },
                { label: 'Ingresos recurrentes', val: '€4.218', color: 'text-[#BC9640]' },
                { label: 'Próxima transferencia', val: '7 Abr', color: 'text-gray-700' },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-500">{stat.label}</span>
                  <span className={`text-sm font-semibold ${stat.color}`}>{stat.val}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex flex-col md:flex-row h-full gap-6">
      <div className="md:w-48 shrink-0 space-y-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-3 px-1">Proceso</p>
        {steps.map((s, i) => (
          <button
            key={i}
            onClick={() => setStep(i)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all cursor-pointer ${step === i ? 'bg-[#2b7d7a]/10 text-[#2b7d7a]' : 'text-gray-500 hover:bg-gray-100'}`}
          >
            <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${step === i ? 'bg-[#2b7d7a] text-white' : i < step ? 'bg-[#BC9640] text-white' : 'bg-gray-100 text-gray-400'}`}>
              {i < step ? <Check className="w-3.5 h-3.5" /> : s.num}
            </div>
            <span className="text-sm">{s.title}</span>
          </button>
        ))}
        <div className="pt-2">
          <div className="text-xs text-gray-400 px-3">0% de comisión por venta</div>
        </div>
      </div>
      <div className="flex-1 overflow-auto min-h-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <div className="mb-4">
              <div className="text-[#BC9640] font-bold text-sm mb-1">{steps[step].num}</div>
              <h3 className="font-serif text-xl font-medium text-gray-800">{steps[step].title}</h3>
            </div>
            {steps[step].content}
            <div className="flex gap-3 mt-6">
              {step > 0 && (
                <button onClick={() => setStep(s => s - 1)} className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm text-gray-600 hover:border-gray-400 transition-colors cursor-pointer">
                  <ArrowLeft className="w-4 h-4" /> Anterior
                </button>
              )}
              {step < steps.length - 1 && (
                <button onClick={() => setStep(s => s + 1)} className="flex items-center gap-2 px-6 py-2 bg-[#1D1D1F] text-white rounded-full text-sm font-medium hover:bg-black transition-colors cursor-pointer ml-auto">
                  Siguiente <ArrowRight className="w-4 h-4" />
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default function Demo() {
  const [activeTab, setActiveTab] = useState<Tab>('alumno');
  const active = tabConfig.find(t => t.id === activeTab)!;

  return (
    <div className="min-h-screen bg-[#FAFAF8] text-[#1D1D1F] antialiased">
      {/* Mini nav */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity">
            <div className="w-7 h-7 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-serif font-semibold text-lg">Aula<span className="text-[#BC9640]">OS</span></span>
          </Link>
          <div className="flex items-center gap-3">
            <Link href="/" className="text-sm text-gray-500 hover:text-gray-800 transition-colors cursor-pointer hidden sm:block">← Volver al sitio</Link>
            <a href="mailto:info@aulaos.com" className="bg-[#2b7d7a] hover:bg-[#226361] text-white px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer">
              Solicitar demo real
            </a>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] text-sm font-semibold mb-6">
            Demo interactiva
          </div>
          <h1 className="font-serif text-4xl md:text-5xl font-medium mb-4">
            Explora la plataforma<br />por dentro
          </h1>
          <p className="text-lg text-gray-500 font-light max-w-2xl mx-auto">
            Navega por las tres vistas principales: lo que ven tus alumnos, lo que controla el admin y cómo fluyen los pagos.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-10">
          {tabConfig.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-3 px-6 py-3.5 rounded-2xl border text-sm font-medium transition-all cursor-pointer ${activeTab === tab.id ? 'bg-[#1D1D1F] text-white border-[#1D1D1F] shadow-lg' : 'bg-white text-gray-600 border-gray-200 hover:border-gray-400'}`}
            >
              <span>{tab.emoji}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Active tab description */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <p className="text-center text-gray-400 text-sm mb-8">{active.desc}</p>

            {/* Demo panel */}
            <div className="bg-white rounded-3xl border border-gray-100 shadow-xl p-6 md:p-8" style={{ minHeight: '480px' }}>
              {activeTab === 'alumno' && <AlumnoDemo />}
              {activeTab === 'admin' && <AdminDemo />}
              {activeTab === 'pagos' && <PagosDemo />}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* CTA bottom */}
        <div className="mt-16 text-center">
          <p className="text-gray-400 text-sm mb-4">¿Quieres ver esto con tu marca y tu contenido?</p>
          <a
            href="mailto:info@aulaos.com?subject=Solicito una demo personalizada de AulaOS"
            className="inline-flex items-center gap-2 bg-[#BC9640] hover:bg-[#a07d2e] text-white px-8 py-4 rounded-full text-base font-semibold transition-all shadow-lg cursor-pointer"
          >
            Solicitar demo personalizada <ArrowRight className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
}
