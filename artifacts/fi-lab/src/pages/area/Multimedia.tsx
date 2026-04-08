import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, Lock, ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";
import { MULTIMEDIA_ITEMS, WEEKS, FREE_WEEKS } from "@/lib/data";
import { getAuth, getProgress } from "@/lib/auth";
import UpsellModal from "@/components/UpsellModal";
import { useContent } from "@/hooks/useContent";
import BlockRenderer from "@/components/BlockRenderer";
import { fmt, AudioPlayerModal, PlayPauseBtn, PlayerBtn } from "@/components/AudioPlayer";
import type { Track } from "@/components/AudioPlayer";

const gold  = "#BC9640";
const teal  = "#2b7d7a";
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Plus Jakarta Sans', DM Sans, sans-serif";

type GateKey = "blanca" | "roja" | "azul" | "arcoiris";

const gateInfo = [
  { key: "blanca"   as GateKey, icon: "🌿", shortLabel: "Blanca",   range: "Sem. 1–12",  color: "#2b7d7a", minWeek: 1  },
  { key: "roja"     as GateKey, icon: "🔥", shortLabel: "Roja",     range: "Sem. 13–24", color: "#C54B3A", minWeek: 13 },
  { key: "azul"     as GateKey, icon: "🔵", shortLabel: "Azul",     range: "Sem. 25–36", color: "#2D7DD2", minWeek: 25 },
  { key: "arcoiris" as GateKey, icon: "🌈", shortLabel: "Arcoíris", range: "Sem. 37–48", color: "#7B4DAA", minWeek: 37 },
];

function getMaxUnlockedWeek(plan: string, progress: ReturnType<typeof getProgress>): number {
  const planNorm = plan?.toLowerCase();
  if (!planNorm || planNorm === "libre" || planNorm === "prueba") return FREE_WEEKS;
  const { completedWeeks, currentWeek } = progress;
  if (completedWeeks.length === 0) return Math.max(FREE_WEEKS, currentWeek);
  const maxDone = Math.max(...completedWeeks);
  return Math.min(48, Math.max(maxDone + 1, FREE_WEEKS, currentWeek));
}

const COMING_SOON_CATS: { icon: string; label: string }[] = [];

/* ─────────────────────────────────────────────
   Creative Process data & panel
───────────────────────────────────────────── */
interface CreativeImage { src: string; caption?: string; }
interface CreativeBlock {
  id: string; icon: string; title: string; subtitle: string;
  accentColor: string; text: string;
  images: CreativeImage[]; participants: string[];
}

const CREATIVE_BLOCKS: CreativeBlock[] = [
  {
    id: "cuencos",
    icon: "🎵",
    title: "Cuencos Tibetanos",
    subtitle: "La resonancia que transforma",
    accentColor: "#BC9640",
    text: "Cuencos tibetanos de 7 metales —uno por chakra, cada uno afinado a su nota y frecuencia correspondiente— cuencos de cuarzo, tambor chamánico, palo de lluvia y otros instrumentos sagrados componen la Biblioteca Sonora. Han sido seleccionados y grabados por Jaume y Quico tras años de práctica e investigación. Cada instrumento emite armónicos específicos que actúan sobre el sistema nervioso y el campo energético del oyente. Las sesiones de grabación se realizan en silencio profundo, permitiendo captar los sobretonos naturales de los instrumentos sin interferencias digitales.",
    images: [],
    participants: ["Jaume", "Quico"],
  },
  {
    id: "frecuencias",
    icon: "〰️",
    title: "Frecuencias & Binaural",
    subtitle: "Ondas que reconfiguran",
    accentColor: "#2b7d7a",
    text: "Las frecuencias Hz integradas en los audios del Método TCT siguen los principios de la escala de Solfeggio y los ritmos binaurales. Cada audio es diseñado para actuar en un estado específico de consciencia: desde la relajación profunda (theta) hasta el enfoque activo (alfa). Jaume diseña la arquitectura frecuencial y las capas instrumentales acústicas sobre esa base.",
    images: [],
    participants: ["Jaume"],
  },
  {
    id: "proceso",
    icon: "🎙️",
    title: "El Proceso Creativo",
    subtitle: "De la intención al audio",
    accentColor: "#7B4DAA",
    text: "Cada pieza nace de una intención terapéutica concreta, vinculada a la semana y la puerta del Método. Quico aporta la ejecución instrumental y la sensibilidad a través de los instrumentos sagrados. Jaume trabaja la perspectiva de composición estructural, la producción final y su experiencia en la fusión de frecuencias — qué frecuencia, qué estado, qué momento del camino. El resultado es un audio que no solo se escucha: se siente.",
    images: [],
    participants: ["Quico", "Jaume"],
  },
  {
    id: "canalizaciones",
    icon: "🌙",
    title: "Canalizaciones",
    subtitle: "Mensajes desde el interior",
    accentColor: "#C06B8A",
    text: "En cada puerta del Método se programan tres videollamadas individuales: una al inicio (semana 1), otra a mitad del recorrido (semana 6) y otra al cierre de las 12 semanas. Durante la sesión, alumno y Marga comparten el espacio. Después, Marga recibe y graba el mensaje canalizado — una transmisión de consciencia expandida que emerge en estado de presencia total. Ese audio queda disponible de forma permanente en este apartado de Canalizaciones: una experiencia sonora de apoyo y orientación, específica para ese momento del camino.",
    images: [],
    participants: ["Marga"],
  },
  {
    id: "meditacion",
    icon: "🧘",
    title: "Meditación",
    subtitle: "Música como guía interior",
    accentColor: "#4aaaa6",
    text: "Los audios de Meditación utilizan la música del proceso creativo de la academia como base sonora: frecuencias, cuencos y capas instrumentales construidas específicamente para acompañar un estado meditativo. Cada pieza incluye indicaciones a seguir mientras se escucha — con auriculares recomendados para la experiencia binaural completa. La música no decora la meditación: la crea.",
    images: [],
    participants: ["Quico", "Jaume"],
  },
  {
    id: "teoria",
    icon: "📚",
    title: "Teoría",
    subtitle: "El saber que suena",
    accentColor: "#8B6E4E",
    text: "Los recursos de Teoría presentan el contenido conceptual del Método con una música de fondo ligera — los mismos sonidos del proceso creativo de la academia, a bajo volumen — mientras Quico narra los fundamentos teóricos en audio. Una forma de aprender que implica simultáneamente el intelecto y el sistema nervioso.",
    images: [],
    participants: ["Quico", "Jaume"],
  },
];

function CreativeProcessPanel() {
  const [open,        setOpen]        = useState(false);
  const [activeBlock, setActiveBlock] = useState(0);
  const [carouselMap, setCarouselMap] = useState<Record<number, number>>({});

  function imgIdx(blockIdx: number) { return carouselMap[blockIdx] ?? 0; }
  function imgNext(blockIdx: number, max: number) {
    setCarouselMap(m => ({ ...m, [blockIdx]: Math.min((m[blockIdx] ?? 0) + 1, max - 1) }));
  }
  function imgPrev(blockIdx: number) {
    setCarouselMap(m => ({ ...m, [blockIdx]: Math.max((m[blockIdx] ?? 0) - 1, 0) }));
  }

  const block   = CREATIVE_BLOCKS[activeBlock];
  const currImg = imgIdx(activeBlock);

  return (
    <>
    <style>{`
      @media (max-width: 767px) {
        .fi-cp-grid { grid-template-columns: 1fr !important; }
        .fi-cp-tabs button { padding: 10px 14px !important; font-size: 12px !important; }
      }
    `}</style>
    <div style={{ borderRadius: 16, border: "1px solid #EDE8E1", overflow: "hidden", background: "#fff", boxShadow: "0 1px 6px rgba(0,0,0,.05)" }}>

      {/* ── Header bar (always visible) ── */}
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          all: "unset", display: "flex", alignItems: "center", justifyContent: "space-between",
          width: "100%", boxSizing: "border-box", padding: "16px 20px", cursor: "pointer",
          background: open ? "#FAF8F5" : "#fff",
          borderBottom: open ? "1px solid #EDE8E1" : "none",
          transition: "background .15s",
        } as React.CSSProperties}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 10,
            background: "linear-gradient(135deg,rgba(188,150,64,.12),rgba(212,170,90,.12))",
            border: "1px solid rgba(188,150,64,.2)",
            display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18,
          }}>🎼</div>
          <div>
            <p style={{ margin: 0, fontFamily: SERIF, fontSize: 15, color: "#1D1D1F" }}>Cómo se crea la música</p>
            <p style={{ margin: "2px 0 0", fontFamily: SANS, fontSize: 11, color: "#9E9E9E" }}>Cuencos · Frecuencias · Proceso creativo · Canalizaciones · Meditación · Teoría</p>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: gold, fontWeight: 600 }}>{open ? "Cerrar" : "Ver más"}</span>
          {open ? <ChevronUp size={17} color={gold} /> : <ChevronDown size={17} color={gold} />}
        </div>
      </button>

      {/* ── Expanded content ── */}
      {open && (
        <div>
          {/* Block tabs */}
          <div className="fi-cp-tabs" style={{ display: "flex", borderBottom: "1px solid #EDE8E1", overflowX: "auto" }}>
            {CREATIVE_BLOCKS.map((b, i) => (
              <button
                key={b.id}
                onClick={() => setActiveBlock(i)}
                style={{
                  all: "unset", display: "flex", alignItems: "center", gap: 6,
                  padding: "12px 22px", whiteSpace: "nowrap", cursor: "pointer",
                  fontFamily: SANS, fontSize: 13,
                  fontWeight: activeBlock === i ? 700 : 400,
                  color: activeBlock === i ? b.accentColor : "#6E6E73",
                  borderBottom: activeBlock === i ? `2.5px solid ${b.accentColor}` : "2.5px solid transparent",
                  transition: "color .15s",
                } as React.CSSProperties}
              >
                <span style={{ fontSize: 16 }}>{b.icon}</span>
                {b.title}
              </button>
            ))}
          </div>

          {/* Block body */}
          <div style={{ padding: "24px 24px 28px" }}>
            <div className="fi-cp-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "start" }}>

              {/* Carousel */}
              <div>
                <div style={{
                  position: "relative", borderRadius: 12, overflow: "hidden",
                  aspectRatio: "4/3", background: "#F5F2EC",
                  border: "1px solid #EDE8E1", display: "flex",
                  alignItems: "center", justifyContent: "center",
                }}>
                  {block.images.length === 0 ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8, opacity: .4 }}>
                      <span style={{ fontSize: 40 }}>🖼</span>
                      <p style={{ margin: 0, fontFamily: SANS, fontSize: 12, color: "#6E6E73", textAlign: "center" }}>
                        Imágenes del proceso<br/>· próximamente ·
                      </p>
                    </div>
                  ) : (
                    <>
                      <img
                        src={block.images[currImg].src}
                        alt={block.images[currImg].caption ?? ""}
                        style={{ width: "100%", height: "100%", objectFit: "cover" }}
                      />
                      {block.images[currImg].caption && (
                        <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(transparent, rgba(0,0,0,.55))", padding: "20px 12px 10px" }}>
                          <p style={{ margin: 0, fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,.9)", textAlign: "center" }}>{block.images[currImg].caption}</p>
                        </div>
                      )}
                      {block.images.length > 1 && (
                        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, transform: "translateY(-50%)", display: "flex", justifyContent: "space-between", padding: "0 8px", pointerEvents: "none" }}>
                          <button
                            onClick={(e) => { e.stopPropagation(); imgPrev(activeBlock); }}
                            disabled={currImg === 0}
                            style={{ pointerEvents: "all", width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,.85)", border: "none", cursor: currImg === 0 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: currImg === 0 ? .3 : 1 }}
                          ><ChevronLeft size={14} /></button>
                          <button
                            onClick={(e) => { e.stopPropagation(); imgNext(activeBlock, block.images.length); }}
                            disabled={currImg === block.images.length - 1}
                            style={{ pointerEvents: "all", width: 28, height: 28, borderRadius: "50%", background: "rgba(255,255,255,.85)", border: "none", cursor: currImg === block.images.length - 1 ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", opacity: currImg === block.images.length - 1 ? .3 : 1 }}
                          ><ChevronRight size={14} /></button>
                        </div>
                      )}
                    </>
                  )}
                </div>
                {block.images.length > 1 && (
                  <div style={{ display: "flex", justifyContent: "center", gap: 5, marginTop: 8 }}>
                    {block.images.map((_, i) => (
                      <button
                        key={i}
                        onClick={() => setCarouselMap(m => ({ ...m, [activeBlock]: i }))}
                        style={{ width: i === currImg ? 16 : 6, height: 6, borderRadius: 3, border: "none", cursor: "pointer", background: i === currImg ? block.accentColor : "#DDD", transition: "all .2s", padding: 0 }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Text */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <div>
                  <h3 style={{ fontFamily: SERIF, fontSize: 20, fontWeight: 400, color: "#1D1D1F", margin: "0 0 4px", lineHeight: 1.3 }}>{block.title}</h3>
                  <p style={{ fontFamily: SANS, fontSize: 11, color: block.accentColor, letterSpacing: ".1em", textTransform: "uppercase", fontWeight: 700, margin: 0 }}>{block.subtitle}</p>
                </div>
                <div style={{ width: 36, height: 2, borderRadius: 2, background: block.accentColor, opacity: .4 }} />
                <p style={{ fontFamily: SANS, fontSize: 14, color: "#3A3A3C", lineHeight: 1.75, margin: 0 }}>{block.text}</p>
                <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
                  {block.participants.map(p => (
                    <span key={p} style={{
                      background: `${block.accentColor}14`, color: block.accentColor,
                      border: `1px solid ${block.accentColor}30`,
                      borderRadius: 9999, padding: "5px 14px",
                      fontFamily: SANS, fontSize: 12, fontWeight: 600,
                    }}>{p}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

/* ─────────────────────────────────────────────
   Main page
───────────────────────────────────────────── */
export default function Multimedia() {
  const auth     = getAuth();
  const progress = getProgress();
  const plan     = auth.plan ?? "libre";

  const maxUnlocked = getMaxUnlockedWeek(plan, progress);

  /* Gate of the user's current week — pre-selects the active gate card */
  const currentGate = (WEEKS.find(w => w.n === (progress.currentWeek ?? 1))?.gate ?? "blanca") as GateKey;
  const [gateFilter, setGateFilter] = useState<GateKey>(currentGate);

  const [activeTab,    setActiveTab]    = useState<"cuencos" | "meditacion" | "frecuencias">("cuencos");
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);
  const [isPlaying,    setIsPlaying]    = useState(false);
  const [upsellOpen,   setUpsellOpen]   = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const [multimediaLabel] = useContent("area.multimedia.label", "Tu biblioteca sonora");
  const [multimediaTitle] = useContent("area.multimedia.title", "Biblioteca Multimedia");
  const [multimediaSub]   = useContent("area.multimedia.sub",   "Cuencos tibetanos, meditaciones y frecuencias del Método TCT");

  function isGateUnlocked(gateKey: GateKey): boolean {
    const info = gateInfo.find(g => g.key === gateKey);
    return info ? maxUnlocked >= info.minWeek : false;
  }

  /* Only show published items (with src uploaded) */
  const byGate           = MULTIMEDIA_ITEMS.filter(i => i.gate === gateFilter && !!i.src);
  const cuencosItems     = byGate.filter(i => i.cat === "Cuencos");
  const meditacionItems  = byGate.filter(i => i.cat === "Meditación");
  const frecuenciasItems = byGate.filter(i => i.cat === "Frecuencias");
  const activeItems      = activeTab === "frecuencias" ? frecuenciasItems
                         : activeTab === "meditacion"  ? meditacionItems
                         : cuencosItems;

  /* ── Load & play a track ── */
  const loadTrack = useCallback((item: Track, autoPlay = true) => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = "";
    }
    if (!item.src) return;
    const a = new Audio(item.src);
    a.addEventListener("ended", () => {
      if (!a.loop) {
        const playlist = MULTIMEDIA_ITEMS.filter(t => t.cat === item.cat);
        const idx = playlist.findIndex(t => t.id === item.id);
        if (idx < playlist.length - 1) {
          loadTrack(playlist[idx + 1]);
        } else {
          setIsPlaying(false);
        }
      }
    });
    audioRef.current = a;
    setCurrentTrack(item);
    if (autoPlay) {
      a.play().catch(() => {});
      setIsPlaying(true);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleCardPlay(item: Track) {
    if (!isGateUnlocked(item.gate)) { setUpsellOpen(true); return; }
    if (currentTrack?.id === item.id) {
      togglePlayPause();
      return;
    }
    loadTrack(item, true);
  }

  function togglePlayPause() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else           { a.play().catch(() => {}); setIsPlaying(true); }
  }

  function handleNext() {
    if (!currentTrack) return;
    const idx = activeItems.findIndex(t => t.id === currentTrack.id);
    if (idx < activeItems.length - 1) loadTrack(activeItems[idx + 1]);
  }

  function handlePrev() {
    if (!currentTrack) return;
    const idx = activeItems.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) loadTrack(activeItems[idx - 1]);
  }

  function handleClose() {
    audioRef.current?.pause();
    audioRef.current = null;
    setCurrentTrack(null);
    setIsPlaying(false);
  }

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  return (
    <div data-fi-section="area-multimedia" data-fi-label="Multimedia" style={{ display: "flex", flexDirection: "column", gap: 24, paddingBottom: currentTrack ? 80 : 0 }}>

      {/* ── Header ── */}
      <div>
        <p data-fi-key="area.multimedia.label" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {multimediaLabel}
        </p>
        <h2 data-fi-key="area.multimedia.title" style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          {multimediaTitle}
        </h2>
        <p data-fi-key="area.multimedia.sub" style={{ fontFamily: SANS, fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {multimediaSub}
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16 }} />
      </div>

      {/* ── Proceso Creativo (desplegable) ── */}
      <CreativeProcessPanel />

      {/* ── Gate selector cards ── */}
      <style>{`
        @media (max-width: 767px) {
          .fi-mm-gate-cards { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
      <div style={{ background: "#FAF8F5", borderRadius: 16, padding: "16px 18px", border: "1px solid #EDE8E1" }}>
        <div className="fi-mm-gate-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {gateInfo.map(g => {
            const isActive   = gateFilter === g.key;
            const isRainbow  = g.key === "arcoiris";
            const unlocked   = isGateUnlocked(g.key);
            const itemCount  = MULTIMEDIA_ITEMS.filter(i => i.gate === g.key && !!i.src).length;
            const rainbowGrad = "linear-gradient(90deg,#2c5f9e,#7b4fa6,#e8401a,#f5a623,#f5e642)";
            const activeBg   = g.key === "blanca" ? "#ffffff"
                             : isRainbow           ? "#F5F2FC"
                             : `${g.color}14`;

            /* Rainbow wrapper only when unlocked — avoids opacity bleed-through */
            const useRainbowBorder = isRainbow && isActive && unlocked;
            const labelColor = isActive ? (isRainbow ? "#7b4fa6" : g.color) : "#3A3A3C";
            const countColor = isActive ? (isRainbow ? "#7b4fa6" : g.color) : "#6E6E73";

            const btn = (
              <button
                onClick={() => setGateFilter(g.key)}
                style={{
                  all: "unset",
                  display: "flex", flexDirection: "row", alignItems: "center",
                  gap: 10, padding: "12px 14px",
                  borderRadius: useRainbowBorder ? 11 : 12,
                  border: useRainbowBorder
                    ? "none"
                    : isActive
                      ? `2px solid ${g.color}`
                      : "1.5px solid #E5E5EA",
                  background: isActive ? activeBg : "#F5F5F7",
                  cursor: "pointer",
                  transition: "all .15s",
                  boxShadow: (isActive && !useRainbowBorder) ? `0 3px 12px ${g.color}28` : "none",
                  flex: 1, minWidth: 0, boxSizing: "border-box",
                } as React.CSSProperties}
              >
                <span style={{ fontSize: 22, lineHeight: 1, flexShrink: 0, opacity: unlocked ? 1 : 0.5 }}>{g.icon}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0, opacity: unlocked ? 1 : 0.6 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: labelColor, letterSpacing: ".01em", whiteSpace: "nowrap" }}>
                    {g.shortLabel}
                  </span>
                  <span style={{ fontSize: 11, color: "#AEAEB2" }}>{g.range}</span>
                </div>
                <div style={{ marginLeft: "auto", flexShrink: 0, display: "flex", alignItems: "center", gap: 4, opacity: unlocked ? 1 : 0.6 }}>
                  {!unlocked && <Lock size={11} color="#AEAEB2" />}
                  <span style={{ fontSize: 11, fontWeight: 600, color: countColor }}>
                    {itemCount} audios
                  </span>
                </div>
              </button>
            );

            return (
              <div
                key={g.key}
                style={{
                  display: "flex",
                  background: useRainbowBorder ? rainbowGrad : "transparent",
                  padding: useRainbowBorder ? 2 : 0,
                  borderRadius: useRainbowBorder ? 14 : 0,
                  boxShadow: useRainbowBorder ? "0 3px 14px rgba(124,79,166,0.22)" : "none",
                  transition: "all .15s",
                }}
              >
                {btn}
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Category tabs ── */}
      {(() => {
        const gateUnlocked = isGateUnlocked(gateFilter);
        const proxyStyle: React.CSSProperties = {
          padding: "7px 16px", borderRadius: 9999,
          border: "1.5px solid #ede9e3", background: "#f5f3f0", color: "#c0b9b0",
          fontSize: 12, fontWeight: 700, cursor: "not-allowed",
          fontFamily: SANS, letterSpacing: ".04em",
          display: "inline-flex", alignItems: "center", gap: 5,
        };
        const proxBadge = (
          <span style={{ fontSize: 9, background: "#e8e3dc", color: "#a09890", borderRadius: 20, padding: "1px 6px", fontWeight: 700, letterSpacing: ".04em" }}>
            Próx.
          </span>
        );
        const activeTabs: { id: "cuencos" | "meditacion" | "frecuencias"; icon: string; label: string }[] = [
          { id: "cuencos",     icon: "🎵", label: "Cuencos"    },
          { id: "meditacion",  icon: "🧘", label: "Meditación" },
          { id: "frecuencias", icon: "🌿", label: "Frecuencias"},
        ];
        return (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {activeTabs.map(tab => (
              gateUnlocked ? (
                <button
                  key={tab.id}
                  data-testid={`multimedia-cat-${tab.id}`}
                  onClick={() => setActiveTab(tab.id)}
                  style={{
                    padding: "7px 16px", borderRadius: 9999,
                    border: `1.5px solid ${teal}`,
                    background: activeTab === tab.id ? teal : "transparent",
                    color: activeTab === tab.id ? "#fff" : teal,
                    fontSize: 12, fontWeight: 700, cursor: "pointer",
                    fontFamily: SANS, letterSpacing: ".04em",
                    transition: "background .18s, color .18s",
                  }}
                >
                  {tab.icon} {tab.label}
                </button>
              ) : (
                <span key={tab.id} title="Desbloquea esta puerta para acceder" style={proxyStyle}>
                  {tab.icon} {tab.label}{proxBadge}
                </span>
              )
            ))}
            {COMING_SOON_CATS.map((c) => (
              <span
                key={c.label}
                title="Disponible próximamente"
                style={proxyStyle}
              >
                {c.icon} {c.label}{proxBadge}
              </span>
            ))}
          </div>
        );
      })()}

      {/* ── Audio list (compact rows) ── */}
      {activeItems.length === 0 ? (
        <div style={{ background: "#fff", borderRadius: 16, padding: "48px 32px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
          <p style={{ color: "#6E6E73", fontSize: 13 }}>No hay contenido en esta categoría todavía.</p>
        </div>
      ) : (
        <div data-fi-section="area-multimedia-audio" style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {activeItems.map((item) => {
            const isActive      = currentTrack?.id === item.id;
            const isThisPlaying = isActive && isPlaying;
            const locked        = !isGateUnlocked(item.gate);

            return (
              <div
                key={item.id}
                data-fi-block={`area-multimedia-track-${item.id}`}
                data-fi-label={item.title}
                data-testid={`audio-track-${item.id}`}
                style={{
                  background: "#fff",
                  borderRadius: 14,
                  padding: "12px 14px",
                  boxShadow: isActive ? `0 2px 12px rgba(43,125,122,.15)` : "0 1px 3px rgba(0,0,0,.06)",
                  outline: isActive ? `2px solid ${teal}` : "none",
                  display: "flex", alignItems: "center", gap: 12,
                  opacity: locked ? 0.72 : 1,
                  transition: "box-shadow .2s, outline .2s",
                  cursor: locked ? "default" : "pointer",
                }}
                onClick={() => !locked && handleCardPlay(item)}
                onMouseEnter={e => !locked && !isActive && ((e.currentTarget as HTMLElement).style.boxShadow = "0 3px 12px rgba(0,0,0,.10)")}
                onMouseLeave={e => !isActive && ((e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(0,0,0,.06)")}
              >
                {/* Icon */}
                <div style={{
                  width: 44, height: 44, borderRadius: 11, flexShrink: 0,
                  background: isActive ? "linear-gradient(135deg,#0d1f1f,#1a3535)" : "#F5F2EC",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: 22, position: "relative", transition: "background .3s",
                }}>
                  {isThisPlaying ? (
                    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 18 }}>
                      {[1,2,3].map(b => (
                        <div key={b} style={{ width: 3, background: teal, borderRadius: 2, height: `${40 + b * 20}%`, animation: `mmBounce ${0.4 + b * 0.12}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  ) : item.icon}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1D1D1F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#AEAEB2" }}>{item.cat} · {item.duration}</p>
                </div>

                {/* Play / Lock button */}
                <button
                  onClick={e => { e.stopPropagation(); handleCardPlay(item); }}
                  data-testid={`button-play-${item.id}`}
                  style={{
                    flexShrink: 0, width: 38, height: 38, borderRadius: 9999, border: "none",
                    background: locked ? "#F5F5F7" : isThisPlaying ? teal : "#1D1D1F",
                    color: locked ? "#AEAEB2" : "#fff",
                    cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center",
                    transition: "background .2s",
                  }}
                >
                  {locked
                    ? <Lock size={13} />
                    : isThisPlaying
                      ? <Pause size={14} />
                      : <Play size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* ── Player Modal ── */}
      {currentTrack && (
        <AudioPlayerModal
          track={currentTrack}
          tracks={activeItems}
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      )}

      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />

      <style>{`
        @keyframes mmBounce {
          from { transform: scaleY(0.4); }
          to   { transform: scaleY(1); }
        }
        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          box-shadow: 0 1px 4px rgba(0,0,0,.3);
        }
        input[type=range]::-moz-range-thumb {
          width: 14px; height: 14px;
          border-radius: 50%;
          background: #fff;
          cursor: pointer;
          border: none;
          box-shadow: 0 1px 4px rgba(0,0,0,.3);
        }
      `}</style>
      <BlockRenderer zone="area-multimedia" />
    </div>
  );
}
