import { useState, useEffect, useRef, useCallback } from "react";
import { ChevronDown, ChevronUp, Upload, Image, X, Lock } from "lucide-react";
import { ALL_WEEK_DETAILS, FREE_WEEKS } from "@/lib/data";
import { getProgress } from "@/lib/auth";
import UpsellModal from "@/components/UpsellModal";
import BlockRenderer from "@/components/BlockRenderer";
import { useContent } from "@/hooks/useContent";
import { loadGallery, loadGalleryByWeek, addToGallery, removeFromGallery, GALLERY_EVENT, compressImage } from "@/lib/gallery";
import type { ArtWork } from "@/lib/gallery";

function computeMaxUnlocked(): number {
  const progress = getProgress();
  const completed = progress.completedWeeks;
  const currentWeek = progress.currentWeek ?? 1;
  if (completed.length === 0) return Math.max(FREE_WEEKS, currentWeek);
  const maxDone = Math.max(...completed);
  return Math.min(48, Math.max(maxDone + 1, FREE_WEEKS, currentWeek));
}

const gateSections = [
  { key: "blanca", emoji: "🌿", gate: "Puerta Blanca", range: "S. 1–12", desc: "Materiales táctiles y primarios — arcilla, carboncillo, pasteles. Reconectar con la experiencia sensorial directa.", color: "#8A7F74" },
  { key: "roja", emoji: "🔥", gate: "Puerta Roja", range: "S. 13–24", desc: "Color y medios fluidos — acuarelas, tintas, acrílicos. Explorar la energía emocional y la transformación.", color: "#C54B3A" },
  { key: "azul", emoji: "🔵", gate: "Puerta Azul", range: "S. 25–36", desc: "Medios conceptuales y simbólicos — collage, fotografía, mandalas. Explorar la naturaleza de la mente.", color: "#2D7DD2" },
  { key: "arcoiris", emoji: "🌈", gate: "Puerta Arcoíris", range: "S. 37–48", desc: "Técnica mixta, diarios visuales, arte efímero. Tejer los hilos de las tres puertas en una vida integrada.", color: "#7B4DAA" },
];


function UploadWidget({ weekN, weekTitle, artTitle, onUploaded }: {
  weekN: number; weekTitle: string; artTitle: string; onUploaded: () => void;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [note, setNote] = useState("");
  const [saved, setSaved] = useState(false);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const raw = ev.target?.result as string;
      const compressed = await compressImage(raw);
      setPreview(compressed);
    };
    reader.readAsDataURL(file);
  }

  function handleSave() {
    if (!preview) return;
    const work: ArtWork = {
      id: Date.now().toString(),
      weekN,
      weekTitle,
      artTitle,
      dataUrl: preview,
      uploadedAt: new Date().toLocaleDateString("es-ES"),
      note,
    };
    addToGallery(work);
    setSaved(true);
    setTimeout(() => { setSaved(false); setPreview(null); setNote(""); onUploaded(); }, 1200);
  }

  if (saved) {
    return (
      <div className="bg-green-50 rounded-[14px] p-4 text-center">
        <p className="text-green-700 font-semibold text-sm">✓ Obra guardada en tu galería</p>
      </div>
    );
  }

  return (
    <div className="space-y-3 mt-3">
      {!preview ? (
        <button
          onClick={() => fileRef.current?.click()}
          className="w-full border-2 border-dashed border-primary/20 rounded-[14px] p-5 flex flex-col items-center gap-2 hover:border-primary/40 hover:bg-primary/5 transition-all cursor-pointer"
        >
          <Upload size={20} className="text-primary opacity-60" />
          <p className="text-[13px] text-primary font-semibold">Subir tu obra</p>
          <p className="text-[11px] text-[#AEAEB2]">JPG, PNG, WebP · máx. 5 MB</p>
        </button>
      ) : (
        <div className="space-y-3">
          <div className="relative rounded-[14px] overflow-hidden">
            <img src={preview} alt="Vista previa" className="w-full max-h-56 object-contain bg-[#F5F5F7]" />
            <button onClick={() => setPreview(null)} className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/50 flex items-center justify-center">
              <X size={12} className="text-white" />
            </button>
          </div>
          <textarea
            value={note}
            onChange={e => setNote(e.target.value)}
            placeholder="Reflexión personal sobre esta obra (opcional)..."
            className="w-full bg-[#F5F5F7] rounded-[12px] p-3 text-[13px] text-[#1D1D1F] placeholder:text-[#AEAEB2] outline-none resize-none border-0"
            rows={2}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              className="flex-1 bg-primary text-primary-foreground rounded-full py-2.5 text-[13px] font-semibold hover:bg-primary/90 transition-colors"
            >
              Guardar en mi galería
            </button>
            <button onClick={() => fileRef.current?.click()} className="px-4 bg-[#F5F5F7] rounded-full py-2.5 text-[13px] text-[#6E6E73] hover:bg-[#EBEBEB] transition-colors">
              Cambiar
            </button>
          </div>
        </div>
      )}
      <input ref={fileRef} type="file" accept="image/*" onChange={handleFile} className="hidden" />
    </div>
  );
}

function ArtworkLightbox({ work, onClose }: { work: ArtWork; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-[20px] max-w-2xl w-full overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="relative">
          <img src={work.dataUrl} alt={work.artTitle} className="w-full max-h-[60vh] object-contain bg-[#F5F5F7]" />
          <button onClick={onClose} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/50 flex items-center justify-center">
            <X size={14} className="text-white" />
          </button>
        </div>
        <div className="p-5">
          <p className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-1">Semana {work.weekN}</p>
          <h3 className="text-[18px] font-serif text-[#1D1D1F] mb-1">{work.artTitle}</h3>
          <p className="text-[13px] text-[#6E6E73]">{work.weekTitle}</p>
          {work.note && <p className="text-[13px] text-[#424245] mt-3 italic leading-[1.6]">"{work.note}"</p>}
          <p className="text-[11px] text-[#AEAEB2] mt-2">Subido el {work.uploadedAt}</p>
        </div>
      </div>
    </div>
  );
}

function GallerySection() {
  const [gallery, setGallery] = useState<ArtWork[]>(() => loadGallery());
  const [lightbox, setLightbox] = useState<ArtWork | null>(null);

  const refresh = useCallback(() => setGallery(loadGallery()), []);

  useEffect(() => {
    window.addEventListener(GALLERY_EVENT, refresh);
    return () => window.removeEventListener(GALLERY_EVENT, refresh);
  }, [refresh]);

  if (gallery.length === 0) {
    return (
      <div className="bg-white rounded-[20px] p-8 text-center" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <Image size={32} className="mx-auto text-[#AEAEB2] mb-3" />
        <p className="text-[14px] text-[#6E6E73]">Tu galería está vacía</p>
        <p className="text-[12px] text-[#AEAEB2] mt-1">Sube tus obras desde los ejercicios semanales de arteterapia</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] px-1">Mi Galería · {gallery.length} obra{gallery.length !== 1 ? "s" : ""}</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {gallery.map(work => (
          <div key={work.id} className="group relative bg-white rounded-[14px] overflow-hidden cursor-pointer" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.07)" }}
            onClick={() => setLightbox(work)}>
            <div className="aspect-square overflow-hidden bg-[#F5F5F7]">
              <img src={work.dataUrl} alt={work.artTitle} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
            </div>
            <div className="p-2.5">
              <p className="text-[11px] font-semibold text-[#1D1D1F] truncate">{work.artTitle}</p>
              <p className="text-[10px] text-[#AEAEB2] mt-0.5">S.{work.weekN} · {work.uploadedAt}</p>
            </div>
            <button
              onClick={e => { e.stopPropagation(); removeFromGallery(work.id); }}
              className="absolute top-2 right-2 w-6 h-6 rounded-full bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity"
            >
              <X size={10} className="text-white" />
            </button>
          </div>
        ))}
      </div>
      {lightbox && <ArtworkLightbox work={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

function WeekGallery({ weekN }: { weekN: number }) {
  const [items, setItems] = useState<ArtWork[]>(() => loadGalleryByWeek(weekN));
  const [lightbox, setLightbox] = useState<ArtWork | null>(null);

  const refresh = useCallback(() => setItems(loadGalleryByWeek(weekN)), [weekN]);

  useEffect(() => {
    window.addEventListener(GALLERY_EVENT, refresh);
    return () => window.removeEventListener(GALLERY_EVENT, refresh);
  }, [refresh]);

  if (items.length === 0) return null;

  return (
    <div className="mt-3 space-y-2">
      <p className="text-[11px] font-semibold text-[#AEAEB2] uppercase tracking-[0.1em]">🖼 Obras subidas esta semana</p>
      <div className="flex gap-2 flex-wrap">
        {items.map(work => (
          <div key={work.id} className="relative rounded-[10px] overflow-hidden cursor-pointer bg-[#F5F5F7]"
            style={{ width: 72, height: 72 }} onClick={() => setLightbox(work)}>
            <img src={work.dataUrl} alt={work.artTitle} className="w-full h-full object-cover hover:scale-105 transition-transform duration-200" />
            <button
              onClick={e => { e.stopPropagation(); removeFromGallery(work.id); }}
              className="absolute top-1 right-1 w-4 h-4 rounded-full bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity"
            >
              <X size={8} className="text-white" />
            </button>
          </div>
        ))}
      </div>
      {lightbox && <ArtworkLightbox work={lightbox} onClose={() => setLightbox(null)} />}
    </div>
  );
}

export default function Arteterapia() {
  const [arteLabel]      = useContent("area.arteterapia.label",       "Manual complementario");
  const [arteTitle]      = useContent("area.arteterapia.title",       "Arteterapia del Sistema TCT");
  const [arteSub]        = useContent("area.arteterapia.sub",         "48 semanas de práctica creativa e integración");
  const [arteIntroTitle] = useContent("area.arteterapia.intro.title", "Manual de Arteterapia del Sistema TCT: 48 Semanas de Práctica Creativa");
  const [arteIntroBody]  = useContent("area.arteterapia.intro.body",  "Este manual complementa el programa del Sistema TCT, ofreciendo un ejercicio de arteterapia semanal diseñado para profundizar e integrar los conceptos de cada etapa. El arte se convierte en un puente entre el entendimiento intelectual y la sabiduría encarnada.");

  const [expanded, setExpanded] = useState<number | null>(null);
  const [upsellOpen, setUpsellOpen] = useState(false);

  const maxUnlocked = computeMaxUnlocked();

  function handleWeekClick(n: number) {
    if (n > maxUnlocked) { setUpsellOpen(true); return; }
    setExpanded(expanded === n ? null : n);
  }

  return (
    <div data-fi-section="area-arteterapia" data-fi-label="Arteterapia" className="space-y-6">
      {/* Header */}
      <div>
        <p data-fi-key="area.arteterapia.label" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: "#BC9640", letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {arteLabel}
        </p>
        <h2 data-fi-key="area.arteterapia.title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          {arteTitle}
        </h2>
        <p data-fi-key="area.arteterapia.sub" style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {arteSub}
        </p>
        <div style={{ width: 48, height: 2, background: "linear-gradient(90deg,#BC9640,#D4AA5A)", borderRadius: 2, marginTop: 16, marginBottom: 8 }} />
      </div>

      {/* Intro */}
      <div className="bg-white rounded-[20px] p-7" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }} data-fi-block="area-arte-intro" data-fi-label="Presentación del Manual">
        <p className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-3">✦ Presentación del Manual</p>
        <h3 data-fi-key="area.arteterapia.intro.title" className="text-[20px] font-serif tracking-[-0.01em] text-[#1D1D1F] mb-3 leading-snug">
          {arteIntroTitle}
        </h3>
        <p data-fi-key="area.arteterapia.intro.body" className="text-[14px] text-[#424245] leading-[1.7]">
          {arteIntroBody}
        </p>
      </div>

      {/* Gate overview */}
      <div data-fi-section="area-arte-puertas" data-fi-label="Arteterapia — Puertas" className="grid sm:grid-cols-2 gap-4">
        {gateSections.map(s => (
          <div key={s.gate} className="bg-white rounded-[20px] p-6" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }} data-testid={`arteterapia-gate-${s.key}`} data-fi-block={`area-arte-gate-${s.key}`} data-fi-label={s.gate}>
            <div className="text-3xl mb-3">{s.emoji}</div>
            <h3 className="font-serif text-[17px] tracking-[-0.01em] text-[#1D1D1F] mb-1">
              {s.gate} <span className="text-[13px] text-[#6E6E73] font-sans">({s.range})</span>
            </h3>
            <p className="text-[13px] text-[#6E6E73] leading-[1.65]">{s.desc}</p>
          </div>
        ))}
      </div>

      {/* Mi galería */}
      <div data-fi-section="area-arte-galeria" data-fi-label="Mi Galería">
        <GallerySection />
      </div>

      {/* Weekly exercises — 3 columns */}
      <div data-fi-section="area-arte-ejercicios" data-fi-label="Ejercicios disponibles" className="space-y-3">
        <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] px-1">
          Ejercicios disponibles — Puerta Blanca
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 items-start">
          {ALL_WEEK_DETAILS.filter(d => d.n <= 12).map(detail => {
            const unlocked = detail.n <= maxUnlocked;
            const isExpanded = expanded === detail.n;

            return (
              <div key={detail.n} className="flex flex-col gap-1">
                <div
                  onClick={() => handleWeekClick(detail.n)}
                  className={`bg-white rounded-[16px] px-4 py-3.5 flex items-center gap-3 cursor-pointer transition-all ${
                    unlocked ? "hover:bg-[#FAFAFA]" : "opacity-55"
                  }`}
                  style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
                  data-testid={`arteterapia-week-${detail.n}`}
                >
                  <div className="w-7 h-7 rounded-full bg-[#FFF0DC] flex items-center justify-center text-[11px] font-semibold text-primary shrink-0">
                    {detail.n}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-[#1D1D1F] leading-snug" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>{detail.artTitle}</p>
                    <p className="text-[11px] text-[#AEAEB2] mt-0.5 truncate">S.{detail.n} · {detail.title}</p>
                  </div>
                  {unlocked ? (
                    isExpanded ? <ChevronUp size={13} className="text-[#6E6E73] shrink-0" /> : <ChevronDown size={13} className="text-[#6E6E73] shrink-0" />
                  ) : (
                    <Lock size={11} className="text-[#AEAEB2] shrink-0" />
                  )}
                </div>

                {isExpanded && unlocked && (
                  <div className="bg-white rounded-[16px] p-5 space-y-4" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}>
                    <div className="bg-[#FFF8F0] border border-primary/20 rounded-[12px] p-4">
                      <p className="text-xs font-semibold text-primary uppercase tracking-[0.1em] mb-1.5">◊ Ejercicio</p>
                      <h4 className="text-[15px] font-serif text-[#1D1D1F] mb-2 leading-snug">{detail.artTitle}</h4>
                      <p className="text-[13px] text-[#6E6E73] leading-[1.65]">{detail.artDesc}</p>
                    </div>

                    {detail.artSteps.length > 1 && (
                      <div className="space-y-2">
                        <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em]">Proceso creativo</p>
                        {detail.artSteps.map((step, i) => (
                          <div key={i} className="flex gap-2.5 text-[13px] text-[#424245] leading-[1.65]">
                            <span className="w-5 h-5 rounded-full bg-[#FFF0DC] text-primary text-[10px] font-semibold flex items-center justify-center shrink-0 mt-0.5">
                              {i + 1}
                            </span>
                            <span>{step}</span>
                          </div>
                        ))}
                      </div>
                    )}

                    <div>
                      <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] mb-2">📸 Comparte tu obra</p>
                      <UploadWidget
                        weekN={detail.n}
                        weekTitle={detail.title}
                        artTitle={detail.artTitle}
                        onUploaded={() => {}}
                      />
                      <WeekGallery weekN={detail.n} />
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <BlockRenderer zone="area-arteterapia" />
      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
