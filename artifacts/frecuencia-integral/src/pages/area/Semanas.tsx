import { useState, useEffect, useRef, useCallback } from "react";
import BlockRenderer from "@/components/BlockRenderer";
import { CheckCircle2, Lock, ChevronRight, CheckCheck, Upload, X, ZoomIn, Save, Trash2, Play, Pause } from "lucide-react";
import { AudioPlayerModal } from "@/components/AudioPlayer";
import { getProgress, setProgress, saveJournalEntry, getAuth } from "@/lib/auth";
import { WEEKS, ALL_WEEK_DETAILS, FREE_WEEKS, WEEK_CHAPTERS, GATE_BOOKS, MULTIMEDIA_ITEMS } from "@/lib/data";
import type { MultimediaItem } from "@/lib/data";
import { useContent } from "@/hooks/useContent";
import { useWeekDetail } from "@/hooks/useWeekDetail";
import type { WeekDetail } from "@/lib/data";
import UpsellModal from "@/components/UpsellModal";
import MarkdownToolbar from "@/components/MarkdownToolbar";
import type { WeekSidebarTab } from "@/pages/Area";
import { loadGalleryByWeek, addToGallery, removeFromGallery, GALLERY_EVENT, compressImage } from "@/lib/gallery";
import type { ArtWork } from "@/lib/gallery";

/* ── Unlock logic ─────────────────────────────────────────────
   libre plan → hard cap at FREE_WEEKS (week 1 only).
   Paid plans (plata, oro, admin) → progressive: completing
               week N unlocks week N+1.
────────────────────────────────────────────────────────────── */
function getMaxUnlockedWeek(plan: string, progress: ReturnType<typeof getProgress>): number {
  // Free/trial plan: always capped at FREE_WEEKS, no progression allowed
  const planNorm = (plan ?? "").toLowerCase();
  if (!planNorm || planNorm === "libre" || planNorm === "prueba") return FREE_WEEKS;

  const completed = progress.completedWeeks;
  const currentWeek = progress.currentWeek ?? 1;

  // Always have at least FREE_WEEKS or currentWeek available
  if (completed.length === 0) return Math.max(FREE_WEEKS, currentWeek);

  const maxDone = Math.max(...completed);
  // One week ahead of the last completed, but never below FREE_WEEKS or currentWeek
  return Math.min(48, Math.max(maxDone + 1, FREE_WEEKS, currentWeek));
}

const SERIF = "'Playfair Display', Georgia, serif";
const GOLD = "#BC9640";

const gateInfo = [
  { key: "blanca",   icon: "🌿", shortLabel: "Blanca",   label: "🌿 Puerta Blanca", range: "Sem. 1–12",  color: "#2b7d7a" },
  { key: "roja",     icon: "🔥", shortLabel: "Roja",     label: "🔥 Puerta Roja",   range: "Sem. 13–24", color: "#C54B3A" },
  { key: "azul",     icon: "🔵", shortLabel: "Azul",     label: "🔵 Puerta Azul",   range: "Sem. 25–36", color: "#2D7DD2" },
  { key: "arcoiris", icon: "🌈", shortLabel: "Arcoíris", label: "🌈 Arcoíris",      range: "Sem. 37–48", color: "#7B4DAA" },
];

function gateColor(gate: string) {
  if (gate === "roja")     return "#C54B3A";
  if (gate === "azul")     return "#2D7DD2";
  if (gate === "arcoiris") return "#7B4DAA";
  return "#8A7F74";
}

/* ── Artwork gallery — unified storage via fi_art_gallery ── */
function ArtworkGallery({ weekNum, weekTitle, artTitle }: {
  weekNum: number;
  weekTitle: string;
  artTitle: string;
}) {
  const [items, setItems] = useState<ArtWork[]>(() => loadGalleryByWeek(weekNum));
  const [lightbox, setLightbox] = useState<ArtWork | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const refresh = useCallback(() => {
    setItems(loadGalleryByWeek(weekNum));
  }, [weekNum]);

  useEffect(() => {
    window.addEventListener(GALLERY_EVENT, refresh);
    return () => window.removeEventListener(GALLERY_EVENT, refresh);
  }, [refresh]);

  function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async (ev) => {
      const raw = ev.target?.result as string;
      const dataUrl = await compressImage(raw);
      const work: ArtWork = {
        id: Date.now().toString(),
        weekN: weekNum,
        weekTitle,
        artTitle,
        dataUrl,
        uploadedAt: new Date().toLocaleDateString("es-ES", { day: "2-digit", month: "short", year: "numeric" }),
        note: "",
      };
      addToGallery(work);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  return (
    <div>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 18 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", margin: 0 }}>
          🖼 Mi Obra · Semana {weekNum}
        </p>
        <button
          onClick={() => inputRef.current?.click()}
          style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "6px 14px", borderRadius: 9999, background: "#1D1D1F", color: "white", fontSize: 12, fontWeight: 600, border: "none", cursor: "pointer" }}
        >
          <Upload size={11} /> Añadir obra
        </button>
        <input ref={inputRef} type="file" accept="image/*" onChange={handleUpload} style={{ display: "none" }} />
      </div>

      {items.length === 0 ? (
        <div
          onClick={() => inputRef.current?.click()}
          style={{ border: "1.5px dashed #DCDCDC", borderRadius: 14, padding: "36px 24px", textAlign: "center", cursor: "pointer", transition: "border-color .15s" }}
          onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
          onMouseLeave={e => (e.currentTarget.style.borderColor = "#DCDCDC")}
        >
          <div style={{ fontSize: 32, marginBottom: 12 }}>🎨</div>
          <p style={{ fontSize: 14, color: "#86868B", margin: 0, lineHeight: 1.6 }}>
            Añade una foto de tu obra aquí.<br />
            <span style={{ fontSize: 12, color: "#AEAEB2" }}>Toca para seleccionar una imagen</span>
          </p>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))", gap: 10 }}>
          {items.map(item => (
            <div key={item.id} style={{ position: "relative", borderRadius: 12, overflow: "hidden", aspectRatio: "1", background: "#F5F5F7", cursor: "pointer" }}
              onClick={() => setLightbox(item)}>
              <img src={item.dataUrl} alt="Obra" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
              <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0)", transition: "background .2s", display: "flex", alignItems: "center", justifyContent: "center" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,.35)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0)"; }}>
                <ZoomIn size={18} style={{ color: "white" }} />
              </div>
              <button
                onClick={e => { e.stopPropagation(); removeFromGallery(item.id); }}
                style={{ position: "absolute", top: 6, right: 6, width: 22, height: 22, borderRadius: "50%", background: "rgba(0,0,0,.5)", border: "none", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", color: "white" }}>
                <X size={11} />
              </button>
              <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "4px 8px", background: "rgba(0,0,0,.45)", fontSize: 9, color: "rgba(255,255,255,.85)", textAlign: "center" }}>
                {item.uploadedAt}
              </div>
            </div>
          ))}
          <div
            onClick={() => inputRef.current?.click()}
            style={{ borderRadius: 12, border: "1.5px dashed #DCDCDC", aspectRatio: "1", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", transition: "border-color .15s", flexDirection: "column", gap: 6 }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = GOLD)}
            onMouseLeave={e => (e.currentTarget.style.borderColor = "#DCDCDC")}
          >
            <Upload size={18} style={{ color: "#AEAEB2" }} />
            <span style={{ fontSize: 10, color: "#AEAEB2", fontWeight: 600 }}>Añadir</span>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {lightbox && (
        <div onClick={() => setLightbox(null)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,.85)", zIndex: 9999, display: "flex", alignItems: "center", justifyContent: "center", padding: 24 }}>
          <button onClick={() => setLightbox(null)} style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 36, height: 36, cursor: "pointer", color: "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <X size={18} />
          </button>
          <div onClick={e => e.stopPropagation()} style={{ background: "#fff", borderRadius: 20, overflow: "hidden", maxWidth: 560, width: "100%" }}>
            <img src={lightbox.dataUrl} alt={lightbox.artTitle} style={{ width: "100%", maxHeight: "55vh", objectFit: "contain", background: "#F5F5F7" }} />
            <div style={{ padding: "16px 20px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: GOLD, textTransform: "uppercase", letterSpacing: ".1em", margin: "0 0 4px" }}>Semana {lightbox.weekN}</p>
              <p style={{ fontSize: 15, fontWeight: 600, color: "#1D1D1F", margin: "0 0 2px" }}>{lightbox.artTitle}</p>
              <p style={{ fontSize: 12, color: "#AEAEB2", margin: "0 0 8px" }}>{lightbox.weekTitle} · {lightbox.uploadedAt}</p>
              {lightbox.note && <p style={{ fontSize: 13, color: "#424245", fontStyle: "italic", lineHeight: 1.6, margin: 0 }}>"{lightbox.note}"</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Notes area with markdown toolbar, save to Diario, and delete ── */
function NotesArea({
  weekNum,
  tabKey,
  placeholder,
}: {
  weekNum: number;
  tabKey: string;
  placeholder: string;
}) {
  const draftKey = `fi_notes_week_${weekNum}_${tabKey}`;
  const [text, setText] = useState(() => {
    try { return localStorage.getItem(draftKey) ?? ""; } catch { return ""; }
  });
  const [status, setStatus] = useState<"idle" | "saved" | "deleted">("idle");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  /* persist draft on change */
  function handleChange(val: string) {
    setText(val);
    try { localStorage.setItem(draftKey, val); } catch {}
  }

  /* save to Diario journal */
  function handleSave() {
    if (!text.trim()) return;
    saveJournalEntry({
      id: crypto.randomUUID(),
      week: weekNum,
      date: new Date().toISOString().slice(0, 10),
      content: text,
      source: tabKey as "diario" | "ejercicio" | "arteterapia",
    });
    setStatus("saved");
    setTimeout(() => setStatus("idle"), 2500);
  }

  /* clear draft */
  function handleDelete() {
    setText("");
    try { localStorage.removeItem(draftKey); } catch {}
    setStatus("deleted");
    setTimeout(() => setStatus("idle"), 2000);
  }

  const tabLabels: Record<string, string> = { ejercicio: "Ejercicio", arteterapia: "Arteterapia", diario: "Diario" };
  const tabLabel = tabLabels[tabKey] ?? tabKey;

  return (
    <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 28 }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", margin: 0 }}>
          ✏️ Mis notas
        </p>
        {status === "saved"   && <span style={{ fontSize: 11, color: "#34c759",  fontWeight: 600 }}>✓ Guardado en el Diario</span>}
        {status === "deleted" && <span style={{ fontSize: 11, color: "#86868B",  fontWeight: 500 }}>Nota borrada</span>}
      </div>

      {/* Markdown editor (toolbar + textarea/preview) */}
      <div style={{ border: "1.5px solid #EBEBEB", borderRadius: 12, overflow: "hidden" }}>
        <MarkdownToolbar
          textareaRef={textareaRef}
          onChange={handleChange}
          value={text}
          textareaProps={{ placeholder, rows: 5 }}
        />
      </div>

      {/* Action buttons */}
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginTop: 10 }}>
        <button
          onClick={handleSave}
          disabled={!text.trim()}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 18px", borderRadius: 9999,
            background: text.trim() ? "#1D1D1F" : "#E8E8ED",
            color: text.trim() ? "white" : "#AEAEB2",
            fontSize: 12, fontWeight: 600, border: "none",
            cursor: text.trim() ? "pointer" : "default",
            transition: "all .15s",
          }}
        >
          <Save size={12} /> Guardar en Diario
        </button>
        <button
          onClick={handleDelete}
          disabled={!text.trim()}
          style={{
            display: "inline-flex", alignItems: "center", gap: 6,
            padding: "8px 14px", borderRadius: 9999,
            background: "transparent",
            color: text.trim() ? "#C54B3A" : "#AEAEB2",
            fontSize: 12, fontWeight: 600,
            border: `1px solid ${text.trim() ? "#C54B3A30" : "#EBEBEB"}`,
            cursor: text.trim() ? "pointer" : "default",
            transition: "all .15s",
          }}
        >
          <Trash2 size={12} /> Borrar
        </button>
      </div>
      <p style={{ fontSize: 11, color: "#AEAEB2", marginTop: 8 }}>
        Al guardar, esta nota se añade a tu Diario como entrada de <strong>{tabLabel}</strong> · Semana {weekNum}.
      </p>
    </div>
  );
}

/* ─────────────────────────────────────────────
   WeekDetailFull — contenido de la semana
───────────────────────────────────────────── */
/* ── URLs de documentos reducidos para plan Prueba ── */
const PRUEBA_BASE = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PRUEBA";
const PRUEBA_CHAPTER_URLS: Record<number, string> = {
  1: `${PRUEBA_BASE}/prueba_deportista_sem1_cap1.pdf`,
  2: `${PRUEBA_BASE}/prueba_deportista_sem2_cap2.pdf`,
  3: `${PRUEBA_BASE}/prueba_ser_sem3_cap3.pdf`,
};
const PRUEBA_TCT1_URL = `${PRUEBA_BASE}/TCT-I-PUERTA-BLANCA%20_Plan%20Prueba_semana%201.pdf`;

/* ── Materiales tab: capítulo específico + libro de puerta + upsell ── */
function WeekMateriales({ detail, onUpsell }: { detail: WeekDetail; onUpsell: () => void }) {
  const chapter = WEEK_CHAPTERS[detail.n];
  const gateBook = GATE_BOOKS[detail.gate];

  const planNorm = (getAuth().plan ?? "").toLowerCase();
  const isPrueba = !planNorm || planNorm === "prueba" || planNorm === "libre";

  /* Para plan Prueba: usar el PDF reducido del capítulo y el TCT-I de 44 páginas */
  const chapterUrl = isPrueba && PRUEBA_CHAPTER_URLS[detail.n]
    ? PRUEBA_CHAPTER_URLS[detail.n]
    : chapter?.url;
  const gateBookOverride = isPrueba && detail.gate === "blanca" && gateBook
    ? { ...gateBook, url: PRUEBA_TCT1_URL, subtitle: "42 páginas · Vista previa · Solo lectura" }
    : isPrueba ? null : gateBook;

  /* Small row tag: label in muted text */
  function Tag({ text }: { text: string }) {
    return (
      <span style={{ fontSize: 11, color: "#86868B", lineHeight: 1.4 }}>{text}</span>
    );
  }

  /* Clickable document card */
  function DocCard({
    icon,
    title,
    tags,
    url,
    tinted,
  }: {
    icon: string;
    title: string;
    tags: string[];
    url: string;
    tinted?: boolean;
  }) {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 16,
        background: tinted ? "#FFFBF2" : "#fff",
        border: `1px solid ${tinted ? "#E8D9A8" : "#EBEBEB"}`,
        borderRadius: 16, padding: "16px 20px",
        boxShadow: "0 1px 3px rgba(0,0,0,.05)",
      }}>
        {/* Icon */}
        <div style={{
          width: 44, height: 44, borderRadius: 12, flexShrink: 0,
          background: tinted ? "#F5E9C0" : "#F2F2F7",
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 20,
        }}>
          {icon}
        </div>

        {/* Text */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <p style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F", margin: "0 0 4px", lineHeight: 1.3 }}>{title}</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {tags.map((t, i) => <Tag key={i} text={t} />)}
          </div>
        </div>

        {/* Ver button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            padding: "7px 16px", borderRadius: 9999, flexShrink: 0,
            background: tinted ? GOLD : "#1D1D1F",
            color: "#fff",
            fontSize: 12, fontWeight: 600, textDecoration: "none",
            transition: "opacity .15s",
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = "0.82")}
          onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
        >
          👁 Ver
        </a>
      </div>
    );
  }

  return (
    <div data-fi-section="area-semanas" data-fi-label="Semanas" style={{ display: "flex", flexDirection: "column", gap: 14 }}>
      {/* Header */}
      <div style={{ marginBottom: 6 }}>
        <p style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 6px" }}>
          Lectura de la semana
        </p>
        <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 20, color: "#1D1D1F", margin: 0 }}>
          Materiales PDF
        </h3>
      </div>

      {/* Tarjeta 1: capítulo específico de la semana */}
      {chapter && chapterUrl && (
        <DocCard
          icon="📖"
          title={`${chapter.bookTitle} — Cap. ${chapter.chapterNum}: ${chapter.chapterTitle}`}
          tags={[`Semana ${detail.n}`, `· ${chapter.pages}`, `· Solo lectura`]}
          url={chapterUrl}
        />
      )}

      {/* Tarjeta 2: libro completo de la puerta (o versión reducida en prueba) */}
      {gateBookOverride && (
        <DocCard
          icon={gateBookOverride.icon}
          title={gateBookOverride.title}
          tags={[gateBookOverride.subtitle]}
          url={gateBookOverride.url}
          tinted
        />
      )}

      {/* Banner de upsell — libros completos */}
      <div style={{
        marginTop: 8, borderRadius: 16,
        border: "1px solid #E8D9A8",
        background: "linear-gradient(135deg,#FFFBF2 0%,#FFF7E6 100%)",
        padding: "20px 24px",
        display: "flex", flexDirection: "column", alignItems: "center",
        gap: 10, textAlign: "center",
      }}>
        <div style={{ fontSize: 28 }}>📚</div>
        <p style={{ fontSize: 13, fontWeight: 600, color: "#1D1D1F", margin: 0 }}>
          Libros completos en el curso
        </p>
        <p style={{ fontSize: 12, color: "#86868B", margin: 0, lineHeight: 1.6 }}>
          El Deportista Consciente · El Ser Consciente · TCT I–IV · Cuencos Tibetanos I
        </p>
        <button
          onClick={onUpsell}
          style={{
            marginTop: 4,
            padding: "10px 24px", borderRadius: 9999,
            background: `linear-gradient(135deg, ${GOLD}, #D4AA5A)`,
            color: "#fff",
            fontSize: 13, fontWeight: 700, border: "none",
            cursor: "pointer", letterSpacing: ".02em",
          }}
        >
          Desbloquear todo →
        </button>
      </div>
    </div>
  );
}

/* ── CompletarTab ───────────────────────────────────────── */
const COMPLETAR_ITEMS = [
  "He leído el material de estudio.",
  "He realizado el ejercicio práctico.",
  "He escuchado el audio de la semana.",
  "He anotado mis reflexiones.",
];

function CompletarTab({
  detail,
  isCompleted,
  onComplete,
  onGoBack,
}: {
  detail: WeekDetail;
  isCompleted: boolean;
  onComplete: () => void;
  onGoBack: () => void;
}) {
  const nextWeek = Math.min(48, detail.n + 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>

      {/* ── Info list (always visible, no checkboxes) ── */}
      <div style={{ borderRadius: 16, border: "1px solid #E8E8ED", overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: "#F5F5F7", borderBottom: "1px solid #E8E8ED", padding: "12px 20px" }}>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".12em", textTransform: "uppercase", color: "#86868B", margin: 0 }}>
            Acciones de esta semana
          </p>
        </div>
        {/* Items */}
        <div style={{ background: "#fff" }}>
          {COMPLETAR_ITEMS.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", alignItems: "center", gap: 14,
                padding: "14px 20px",
                borderBottom: i < COMPLETAR_ITEMS.length - 1 ? "1px solid #F2F2F7" : "none",
              }}
            >
              <div style={{
                width: 24, height: 24, borderRadius: "50%", flexShrink: 0,
                background: "#F5F5F7",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: "#86868B" }}>{i + 1}</span>
              </div>
              <span style={{ fontSize: 14, color: "#1D1D1F", lineHeight: 1.5 }}>{item}</span>
            </div>
          ))}
        </div>
      </div>

      {/* ── Completion state ── */}
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 12, gap: 18, textAlign: "center" }}>
        <div style={{
          width: 72, height: 72, borderRadius: "50%",
          background: isCompleted ? "#f0fdf4" : "#F5F5F7",
          border: isCompleted ? "2px solid #bbf7d0" : "2px solid #E8E8ED",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <CheckCircle2 size={32} style={{ color: isCompleted ? "#34c759" : "#AEAEB2" }} />
        </div>
        <div>
          <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, color: "#1D1D1F", margin: "0 0 8px" }}>
            {isCompleted ? "Semana completada" : "¿Has terminado la semana?"}
          </h3>
          <p style={{ fontSize: 14, color: "#86868B", lineHeight: 1.72, margin: 0, maxWidth: 340 }}>
            {isCompleted
              ? `Has completado la Semana ${detail.n}. ¡Continúa adelante!`
              : "Márcala como completada cuando hayas practicado todas las acciones anteriores."}
          </p>
        </div>

        {/* ── Buttons ── */}
        {isCompleted ? (
          <button
            onClick={onGoBack}
            style={{
              display: "flex", flexDirection: "column", alignItems: "center", gap: 3,
              padding: "14px 32px",
              background: "transparent", color: "#2b7d7a",
              border: "2px solid #2b7d7a",
              borderRadius: 9999, fontSize: 14, fontWeight: 600,
              cursor: "pointer", letterSpacing: ".01em",
              transition: "all .15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.background = "#2b7d7a"; (e.currentTarget as HTMLButtonElement).style.color = "#fff"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = "transparent"; (e.currentTarget as HTMLButtonElement).style.color = "#2b7d7a"; }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
              ← Volver a las semanas
            </span>
            {detail.n < 48 && (
              <span style={{ fontSize: 11, fontWeight: 400, opacity: 0.8 }}>
                accede a la Semana {nextWeek}
              </span>
            )}
          </button>
        ) : (
          <button
            onClick={onComplete}
            data-testid={`button-complete-week-modal-${detail.n}`}
            style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "14px 32px",
              background: "#1D1D1F", color: "#fff",
              borderRadius: 9999, fontSize: 14, fontWeight: 600, border: "none",
              cursor: "pointer", letterSpacing: ".01em",
              transition: "opacity .15s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLButtonElement).style.opacity = ".8"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.opacity = "1"; }}
          >
            <CheckCheck size={15} /> Completar Semana {detail.n}
          </button>
        )}
      </div>
    </div>
  );
}

/* ── Shared sub-components (must be module-level to avoid React reconciliation errors) ── */
function Steps({ steps, color, fiKeys }: { steps: string[]; color: string; fiKeys?: string[] }) {
  return (
    <div>
      {steps.map((step, i) => (
        <div key={i} style={{ display: "flex", gap: 20, padding: "15px 0", borderBottom: i < steps.length - 1 ? "1px solid #F2F2F2" : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: 13, fontWeight: 700, color, minWidth: 20, paddingTop: 2, flexShrink: 0 }}>{i + 1}</span>
          <p data-fi-key={fiKeys?.[i]} style={{ fontSize: 15, color: "#3A3A3C", lineHeight: 1.75, margin: 0 }}>{step}</p>
        </div>
      ))}
    </div>
  );
}

function ContentCard({
  label,
  icon,
  title,
  body,
  extra,
  accentColor,
  bgColor,
  borderColor,
  titleKey,
  bodyKey,
}: {
  label: string;
  icon: string;
  title: string;
  body: string;
  extra?: React.ReactNode;
  accentColor: string;
  bgColor: string;
  borderColor: string;
  titleKey?: string;
  bodyKey?: string;
}) {
  return (
    <div style={{ borderRadius: 16, overflow: "hidden", border: `1px solid ${borderColor}` }}>
      <div style={{ height: 4, background: `linear-gradient(90deg, ${accentColor}, ${accentColor}80)` }} />
      <div style={{ padding: "24px 28px", background: bgColor }}>
        <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: accentColor, marginBottom: 14 }}>
          {icon} {label}
        </p>
        <h3 data-fi-key={titleKey} style={{ fontFamily: SERIF, fontSize: "clamp(20px,2.4vw,26px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 14px", lineHeight: 1.3 }}>
          {title}
        </h3>
        <p data-fi-key={bodyKey} style={{ fontSize: 14, color: "#4A4A4A", lineHeight: 1.78, margin: 0 }}>{body}</p>
        {extra}
      </div>
    </div>
  );
}

/* ── Multimedia player dentro de la semana ── */
type MediaCat = "cuencos" | "meditacion" | "frecuencias" | "canalizacion" | "teoria";
const MEDIA_CATS: { id: MediaCat; label: string; icon: string }[] = [
  { id: "cuencos",      label: "Cuencos",      icon: "🎵" },
  { id: "meditacion",   label: "Meditación",   icon: "🧘" },
  { id: "frecuencias",  label: "Frecuencias",  icon: "〰️" },
  { id: "canalizacion", label: "Canalización", icon: "🌙" },
  { id: "teoria",       label: "Teoría",       icon: "📚" },
];
const CAT_MAP: Record<MediaCat, string> = {
  cuencos:      "Cuencos",
  meditacion:   "Meditación",
  frecuencias:  "Frecuencias",
  canalizacion: "Canalización",
  teoria:       "Teoría",
};

function WeekMultimedia({ gate }: { gate: "blanca" | "roja" | "azul" | "arcoiris" }) {
  const teal = "#2b7d7a";
  const [activeTab,     setActiveTab]     = useState<MediaCat>("cuencos");
  const [currentTrack,  setCurrentTrack]  = useState<MultimediaItem | null>(null);
  const [isPlaying,     setIsPlaying]     = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const published = MULTIMEDIA_ITEMS.filter(i => i.gate === gate && !!i.src);
  const inTab     = published.filter(i => i.cat === CAT_MAP[activeTab]);

  const loadTrack = useCallback((item: MultimediaItem, autoPlay = true) => {
    if (audioRef.current) { audioRef.current.pause(); audioRef.current.src = ""; }
    if (!item.src) return;
    const a = new Audio(item.src);
    a.addEventListener("ended", () => {
      if (a.loop) return;
      const playlist = published.filter(t => t.cat === item.cat);
      const idx = playlist.findIndex(t => t.id === item.id);
      if (idx < playlist.length - 1) loadTrack(playlist[idx + 1]);
      else setIsPlaying(false);
    });
    audioRef.current = a;
    setCurrentTrack(item);
    if (autoPlay) { a.play().catch(() => {}); setIsPlaying(true); }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gate]);

  function handleCardPlay(item: MultimediaItem) {
    if (currentTrack?.id === item.id) { togglePlayPause(); return; }
    loadTrack(item, true);
  }

  function togglePlayPause() {
    const a = audioRef.current;
    if (!a) return;
    if (isPlaying) { a.pause(); setIsPlaying(false); }
    else { a.play().catch(() => {}); setIsPlaying(true); }
  }

  function handleNext() {
    if (!currentTrack) return;
    const playlist = published.filter(t => t.cat === currentTrack.cat);
    const idx = playlist.findIndex(t => t.id === currentTrack.id);
    if (idx < playlist.length - 1) loadTrack(playlist[idx + 1]);
  }

  function handlePrev() {
    if (!currentTrack) return;
    const playlist = published.filter(t => t.cat === currentTrack.cat);
    const idx = playlist.findIndex(t => t.id === currentTrack.id);
    if (idx > 0) loadTrack(playlist[idx - 1]);
  }

  function handleClose() {
    audioRef.current?.pause();
    audioRef.current = null;
    setCurrentTrack(null);
    setIsPlaying(false);
  }

  useEffect(() => () => { audioRef.current?.pause(); }, []);

  if (published.length === 0) {
    return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", paddingTop: 56, gap: 14, textAlign: "center" }}>
        <div style={{ width: 64, height: 64, borderRadius: 16, background: "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 28 }}>🎵</div>
        <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 20, color: "#1D1D1F", margin: 0 }}>Sin recursos publicados</h3>
        <p style={{ fontSize: 13, color: "#86868B", lineHeight: 1.7, maxWidth: 320, margin: 0 }}>Los audios de esta puerta estarán disponibles próximamente.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16, paddingBottom: currentTrack ? 84 : 0 }}>
      {/* Tabs */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {MEDIA_CATS.map(cat => {
          const count = published.filter(i => i.cat === CAT_MAP[cat.id]).length;
          const isActive = activeTab === cat.id;
          if (count === 0) {
            return (
              <span key={cat.id} style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 9999, background: "#F5F5F7", color: "#AEAEB2", fontSize: 12, fontWeight: 600, cursor: "default" }}>
                {cat.icon} {cat.label}
                <span style={{ fontSize: 9, background: "#EAEAEC", color: "#AEAEB2", borderRadius: 20, padding: "1px 6px", fontWeight: 700, letterSpacing: ".05em" }}>Próx.</span>
              </span>
            );
          }
          return (
            <button key={cat.id} onClick={() => setActiveTab(cat.id)}
              style={{ display: "inline-flex", alignItems: "center", gap: 5, padding: "6px 14px", borderRadius: 9999, border: `1.5px solid ${isActive ? teal : "#E5E5EA"}`, background: isActive ? teal : "#fff", color: isActive ? "#fff" : "#3A3A3C", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>
              {cat.icon} {cat.label}
            </button>
          );
        })}
      </div>

      {/* Items */}
      {inTab.length === 0 ? (
        <p style={{ fontSize: 13, color: "#86868B", padding: "32px 0", textAlign: "center" }}>No hay contenido en esta categoría todavía.</p>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {inTab.map(item => {
            const isActive      = currentTrack?.id === item.id;
            const isThisPlaying = isActive && isPlaying;
            return (
              <div key={item.id}
                onClick={() => handleCardPlay(item)}
                style={{ background: "#fff", borderRadius: 14, padding: "12px 14px", boxShadow: isActive ? `0 2px 12px rgba(43,125,122,.15)` : "0 1px 3px rgba(0,0,0,.06)", outline: isActive ? `2px solid ${teal}` : "none", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", transition: "box-shadow .2s" }}>
                <div style={{ width: 44, height: 44, borderRadius: 11, background: isActive ? "linear-gradient(135deg,#0d1f1f,#1a3535)" : "#F5F5F7", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                  {isThisPlaying ? (
                    <div style={{ display: "flex", gap: 2, alignItems: "flex-end", height: 18 }}>
                      {[1,2,3].map(b => (
                        <div key={b} style={{ width: 3, background: teal, borderRadius: 2, height: `${40 + b * 20}%`, animation: `mmBounce ${0.4 + b * 0.12}s ease-in-out infinite alternate` }} />
                      ))}
                    </div>
                  ) : item.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p style={{ margin: 0, fontWeight: 600, fontSize: 13, color: "#1D1D1F", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.title}</p>
                  <p style={{ margin: "2px 0 0", fontSize: 11, color: "#AEAEB2" }}>{item.cat} · {item.duration}</p>
                </div>
                <button onClick={e => { e.stopPropagation(); handleCardPlay(item); }}
                  style={{ flexShrink: 0, width: 38, height: 38, borderRadius: 9999, border: "none", background: isThisPlaying ? teal : "#1D1D1F", color: "#fff", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", transition: "background .2s" }}>
                  {isThisPlaying ? <Pause size={14} /> : <Play size={14} />}
                </button>
              </div>
            );
          })}
        </div>
      )}

      {/* Reproductor completo (mini barra + pantalla completa) */}
      {currentTrack && (
        <AudioPlayerModal
          track={currentTrack}
          tracks={published.filter(t => t.cat === currentTrack.cat)}
          audioRef={audioRef}
          isPlaying={isPlaying}
          onPlayPause={togglePlayPause}
          onNext={handleNext}
          onPrev={handlePrev}
          onClose={handleClose}
        />
      )}
    </div>
  );
}

const WEEK_TABS: { id: WeekSidebarTab; label: string; icon: string }[] = [
  { id: "descripcion", label: "Descripción",  icon: "📋" },
  { id: "conceptos",   label: "Conceptos",    icon: "💡" },
  { id: "ejercicio",   label: "Ejercicios",   icon: "📈" },
  { id: "arteterapia", label: "Arteterapia",  icon: "🎨" },
  { id: "multimedia",  label: "Multimedia",   icon: "🎵" },
  { id: "materiales",  label: "Materiales",   icon: "📄" },
  { id: "diario",      label: "Diario",       icon: "📓" },
  { id: "completar",   label: "Completar",    icon: "✅" },
];

function WeekDetailFull({
  detail: rawDetailProp,
  isCompleted,
  onComplete,
  onGoBack,
  weekSidebarTab,
  onTabChange,
}: {
  detail: WeekDetail;
  isCompleted: boolean;
  onComplete: () => void;
  onGoBack: () => void;
  weekSidebarTab: WeekSidebarTab;
  onTabChange: (t: WeekSidebarTab) => void;
}) {
  /* Safety net: if the prop arrived as a WeekBasic (missing message/concepts/…),
     look up the full WeekDetail from the source array so content is never blank. */
  const rawDetail: WeekDetail =
    rawDetailProp.message && rawDetailProp.message.trim()
      ? rawDetailProp
      : (ALL_WEEK_DETAILS.find(w => w.n === rawDetailProp.n) ?? rawDetailProp);

  const cmsDetail = useWeekDetail(rawDetail);
  const weekTabsRef = useRef<HTMLDivElement>(null);
  const [tabScroll, setTabScroll] = useState({ ratio: 0, thumbW: 0.3 });

  const measureTabs = () => {
    const el = weekTabsRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setTabScroll({
      ratio: max > 0 ? el.scrollLeft / max : 0,
      thumbW: max > 0 ? el.clientWidth / el.scrollWidth : 1,
    });
  };

  useEffect(() => {
    // Measure after paint so scrollWidth is correct
    const id = requestAnimationFrame(measureTabs);
    return () => cancelAnimationFrame(id);
  }, []);

  const scrollWeekTabs = (dir: -1 | 1) => {
    if (weekTabsRef.current) weekTabsRef.current.scrollBy({ left: dir * 130, behavior: "smooth" });
  };

  /* Guarantee: always use raw code data when CMS has blank/missing values */
  const pick = (cms: string | undefined, raw: string | undefined) =>
    (cms && cms.trim()) ? cms : (raw ?? "");
  const pickArr = <T,>(cms: T[], raw: T[] | undefined): T[] =>
    (cms && cms.length > 0) ? cms : (raw ?? []);

  const detail = {
    ...cmsDetail,
    title:             pick(cmsDetail.title,             rawDetail.title),
    message:           pick(cmsDetail.message,           rawDetail.message),
    concepts:          pickArr(cmsDetail.concepts ?? [], rawDetail.concepts),
    exerciseTitle:     pick(cmsDetail.exerciseTitle,     rawDetail.exerciseTitle),
    exerciseObjective: pick(cmsDetail.exerciseObjective, rawDetail.exerciseObjective),
    exerciseRef:       pick(cmsDetail.exerciseRef,       rawDetail.exerciseRef),
    exerciseSteps:     pickArr(cmsDetail.exerciseSteps ?? [], rawDetail.exerciseSteps),
    artTitle:          pick(cmsDetail.artTitle,          rawDetail.artTitle),
    artDesc:           pick(cmsDetail.artDesc,           rawDetail.artDesc),
    artSteps:          pickArr(cmsDetail.artSteps ?? [], rawDetail.artSteps),
    artReflection:     (cmsDetail.artReflection && cmsDetail.artReflection.trim())
                         ? cmsDetail.artReflection
                         : rawDetail.artReflection,
  };

  const [upsellOpen, setUpsellOpen] = useState(false);
  const gc = gateColor(detail.gate);
  const gateLabel = detail.gate.charAt(0).toUpperCase() + detail.gate.slice(1);
  const n = detail.n;

  /* Notify editor sidebar of current page title for block zone targeting */
  useEffect(() => {
    window.dispatchEvent(new CustomEvent("fi:pagetitle", { detail: { title: `Semana ${n} — ${detail.title}` } }));
    return () => {
      window.dispatchEvent(new CustomEvent("fi:pagetitle", { detail: { title: undefined } }));
    };
  }, [n, detail.title]);

  return (
    <div style={{ maxWidth: 700, margin: "0 auto", width: "100%", paddingBottom: 60 }}>

      {/* ── Sticky tab strip (mobile only) ── */}
      <div className="fi-week-sticky-header" style={{
        display: "none",
        position: "sticky", top: -16, zIndex: 60,
        marginLeft: -16, marginRight: -16, marginTop: -16,
        background: "rgba(255,255,255,.96)",
        backdropFilter: "blur(14px)",
        WebkitBackdropFilter: "blur(14px)",
        borderBottom: "1px solid rgba(0,0,0,.08)",
      }}>
        {/* Row 1: pills (native scrollbar hidden) */}
        <div
          ref={weekTabsRef}
          className="fi-week-tabs"
          onScroll={measureTabs}
          style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" as any, scrollbarWidth: "none" as any, paddingLeft: 16, paddingRight: 12, paddingTop: 10, paddingBottom: 6 }}
        >
          <div style={{ display: "flex", gap: 6, paddingRight: 16 }}>
            <button onClick={onGoBack} style={{ flexShrink: 0, padding: "7px 13px", borderRadius: 9999, border: "none", background: "#F2F2F7", color: "#6E6E73", fontSize: 12, fontWeight: 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
              🏠 Inicio
            </button>
            {WEEK_TABS.map(tab => (
              <button key={tab.id} onClick={() => onTabChange(tab.id)} style={{ flexShrink: 0, padding: "7px 13px", borderRadius: 9999, border: "none", background: weekSidebarTab === tab.id ? GOLD : "#F2F2F7", color: weekSidebarTab === tab.id ? "#fff" : "#6E6E73", fontSize: 12, fontWeight: weekSidebarTab === tab.id ? 600 : 500, cursor: "pointer", display: "flex", alignItems: "center", gap: 5, whiteSpace: "nowrap" }}>
                <span>{tab.icon}</span> {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Row 2: custom scrollbar — ‹ [track+thumb] › */}
        <div style={{ display: "flex", alignItems: "center", padding: "0 4px 7px", gap: 2 }}>
          <button onClick={() => scrollWeekTabs(-1)} style={{ flexShrink: 0, width: 22, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "#8E8E93", fontSize: 15, lineHeight: 1, padding: 0 }}>‹</button>
          <div style={{ flex: 1, height: 5, background: "#EBEBEB", borderRadius: 3, position: "relative", overflow: "hidden" }}>
            <div style={{
              position: "absolute", top: 0, height: "100%",
              left: `${tabScroll.ratio * (1 - tabScroll.thumbW) * 100}%`,
              width: `${Math.max(tabScroll.thumbW * 100, 15)}%`,
              background: "#8E8E93", borderRadius: 3,
              transition: "left .08s",
            }} />
          </div>
          <button onClick={() => scrollWeekTabs(1)} style={{ flexShrink: 0, width: 22, height: 18, display: "flex", alignItems: "center", justifyContent: "center", border: "none", background: "transparent", cursor: "pointer", color: "#8E8E93", fontSize: 15, lineHeight: 1, padding: 0 }}>›</button>
        </div>
      </div>

      <style>{`
        @media (max-width: 767px) {
          .fi-week-sticky-header { display: block !important; }
          .fi-gate-labels        { display: none  !important; }
          .fi-week-content-pad   { padding-top: 20px !important; }
        }
        .fi-week-tabs::-webkit-scrollbar { display: none; }
      `}</style>

      {/* ── Week header ── */}
      <div className="fi-week-content-pad" style={{ marginBottom: 36, paddingBottom: 28, borderBottom: "1px solid #EBEBEB" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 14 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: gc }} />
          <span style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: gc }}>
            Semana {n} · Puerta {gateLabel}
          </span>
          <span style={{
            marginLeft: "auto",
            display: "inline-flex", alignItems: "center", gap: 5,
            fontSize: 11, fontWeight: 600, color: "#34c759",
            background: "#f0fdf4", padding: "3px 10px", borderRadius: 9999, border: "1px solid #bbf7d0",
            opacity: isCompleted ? 1 : 0,
            pointerEvents: isCompleted ? "auto" : "none",
            transition: "opacity .2s",
          }}>
            <CheckCircle2 size={11} /> Completada
          </span>
        </div>
        <h2 data-fi-key={`week.${n}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.2vw,36px)", fontWeight: 400, color: "#1D1D1F", margin: 0, lineHeight: 1.2, letterSpacing: "-.02em" }}>
          {detail.title}
        </h2>
      </div>

      {/* ══ DESCRIPCIÓN ══ */}
      {weekSidebarTab === "descripcion" && (
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 22 }}>
            Descripción de la semana
          </p>
          <div style={{ borderLeft: `3px solid ${gc}`, paddingLeft: 24 }}>
            <p data-fi-key={`week.${n}.message`} style={{ fontSize: 16.5, color: "#3A3A3C", lineHeight: 1.9, margin: 0 }}>{detail.message}</p>
          </div>
        </div>
      )}

      {/* ══ CONCEPTOS ══ */}
      {weekSidebarTab === "conceptos" && (
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 22 }}>
            Conceptos clave
          </p>
          {detail.concepts.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {detail.concepts.map(([term, def], i) => (
                <div key={i} style={{
                  borderLeft: `3px solid ${i === 0 ? gc : "#DCDCDC"}`,
                  background: i === 0 ? `${gc}09` : "#FAFAFA",
                  borderRadius: "0 10px 10px 0",
                  padding: "16px 20px",
                }}>
                  <p data-fi-key={`week.${n}.concept.${i}.term`} style={{ fontSize: 14, fontWeight: 600, color: i === 0 ? gc : "#1D1D1F", marginBottom: 5 }}>{term}</p>
                  <p data-fi-key={`week.${n}.concept.${i}.def`} style={{ fontSize: 14, color: "#6E6E73", lineHeight: 1.7, margin: 0 }}>{def}</p>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 15, color: "#86868B", lineHeight: 1.75 }}>Los conceptos se desarrollan en la descripción.</p>
          )}
        </div>
      )}

      {/* ══ EJERCICIO — mismo estilo de tarjeta que Arteterapia, color de puerta ══ */}
      {weekSidebarTab === "ejercicio" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <ContentCard
            label="Ejercicio de la Semana"
            icon="✦"
            title={detail.exerciseTitle}
            body={detail.exerciseObjective}
            accentColor={gc}
            bgColor={`${gc}09`}
            borderColor={`${gc}30`}
            titleKey={`week.${n}.exerciseTitle`}
            bodyKey={`week.${n}.exerciseObjective`}
            extra={detail.exerciseRef ? (
              <p data-fi-key={`week.${n}.exerciseRef`} style={{ fontSize: 11, color: "#AEAEB2", marginTop: 12, fontStyle: "italic" }}>📎 {detail.exerciseRef}</p>
            ) : undefined}
          />
          <div>
            <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 18 }}>
              Contexto
            </p>
            <Steps
              steps={detail.exerciseSteps}
              color={gc}
              fiKeys={detail.exerciseSteps.map((_, i) => `week.${n}.exerciseStep.${i}`)}
            />
          </div>
          <NotesArea
            weekNum={n}
            tabKey="ejercicio"
            placeholder="Escribe aquí tus pensamientos, sensaciones o emociones durante el ejercicio..."
          />
        </div>
      )}

      {/* ══ ARTETERAPIA — tarjeta cálida dorada + reflexión + galería ══ */}
      {weekSidebarTab === "arteterapia" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
          <ContentCard
            label="Ejercicio de Arteterapia"
            icon="◊"
            title={detail.artTitle}
            body={detail.artDesc}
            accentColor={GOLD}
            bgColor="#FFFBF2"
            borderColor="#EDE0C8"
            titleKey={`week.${n}.artTitle`}
            bodyKey={`week.${n}.artDesc`}
          />

          {detail.artSteps.length > 1 && (
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 18 }}>
                Proceso Creativo
              </p>
              <Steps
                steps={detail.artSteps}
                color={GOLD}
                fiKeys={detail.artSteps.map((_, i) => `week.${n}.artStep.${i}`)}
              />
            </div>
          )}

          {/* ── Reflexión para el Diario ── */}
          {detail.artReflection && (
            <div style={{ background: "#FFFBF2", borderRadius: 14, padding: "20px 24px", border: "1px solid #EDE0C8" }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: GOLD, marginBottom: 12 }}>
                ✍️ Reflexión para el Diario
              </p>
              <p data-fi-key={`week.${n}.artReflection`} style={{ fontSize: 15, color: "#4A3A1A", lineHeight: 1.8, margin: 0, fontStyle: "italic" }}>
                {detail.artReflection}
              </p>
            </div>
          )}

          <NotesArea
            weekNum={detail.n}
            tabKey="arteterapia"
            placeholder="Escribe aquí tus pensamientos, sensaciones o emociones mientras creas tu obra..."
          />

          {/* ── Galería de obras ── */}
          <div style={{ borderTop: "1px solid #F0F0F0", paddingTop: 28 }}>
            <ArtworkGallery weekNum={detail.n} weekTitle={detail.title} artTitle={detail.artTitle} />
          </div>
        </div>
      )}

      {/* ══ MULTIMEDIA ══ */}
      {weekSidebarTab === "multimedia" && (
        <WeekMultimedia gate={detail.gate as "blanca" | "roja" | "azul" | "arcoiris"} />
      )}

      {/* ══ MATERIALES ══ */}
      {weekSidebarTab === "materiales" && (
        <>
          <WeekMateriales detail={detail} onUpsell={() => setUpsellOpen(true)} />
          <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
        </>
      )}

      {/* ══ DIARIO ══ */}
      {weekSidebarTab === "diario" && (
        <div>
          <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".16em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 22 }}>
            📓 Mi Diario · Semana {n}
          </p>
          <NotesArea
            weekNum={n}
            tabKey="diario"
            placeholder={`Escribe tu reflexión de la Semana ${n}. ¿Qué has vivido? ¿Qué has aprendido? ¿Qué quieres recordar?`}
          />
        </div>
      )}

      {/* ══ COMPLETAR ══ */}
      {weekSidebarTab === "completar" && (
        <CompletarTab
          key={`completar-${detail.n}`}
          detail={detail}
          isCompleted={isCompleted}
          onComplete={onComplete}
          onGoBack={onGoBack}
        />
      )}

      <BlockRenderer zone={`week_${n}`} />
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Semanas Component
───────────────────────────────────────────── */
interface SemanasProps {
  selectedWeek: WeekDetail | null;
  onWeekSelect: (w: WeekDetail | null) => void;
  weekSidebarTab: WeekSidebarTab;
  onWeekSidebarTabChange: (t: WeekSidebarTab) => void;
}

export default function Semanas({ selectedWeek, onWeekSelect, weekSidebarTab, onWeekSidebarTabChange }: SemanasProps) {
  const progress = getProgress();
  const auth = getAuth();
  const plan = auth.plan ?? "libre";

  /* Pre-select the filter tab for the user's current active gate */
  const activeGate = WEEKS.find(w => w.n === (progress.currentWeek ?? 1))?.gate ?? "blanca";
  const [filter, setFilter] = useState(activeGate);
  const [upsellOpen, setUpsellOpen] = useState(false);
  const [, forceUpdate] = useState(0);

  const [semanasLabel] = useContent("area.semanas.label", "Tu programa completo");
  const [semanasTitle] = useContent("area.semanas.title", "Las 48 Semanas");
  const [semanasSub]   = useContent("area.semanas.sub",   "Cuatro Puertas · Un camino de transformación integral");

  const maxUnlocked = getMaxUnlockedWeek(plan, progress);
  const filteredWeeks = filter === "todas" ? WEEKS : WEEKS.filter(w => w.gate === filter);

  function handleWeekClick(weekNum: number) {
    if (weekNum > maxUnlocked) { setUpsellOpen(true); return; }
    const detail = ALL_WEEK_DETAILS.find(d => d.n === weekNum);
    if (detail) onWeekSelect(detail);
  }

  function markComplete(weekNum: number) {
    const p = getProgress();
    if (!p.completedWeeks.includes(weekNum)) {
      p.completedWeeks.push(weekNum);
      if (weekNum === p.currentWeek && weekNum < 48) p.currentWeek = weekNum + 1;
      setProgress(p);
      forceUpdate(n => n + 1);
    }
  }

  if (selectedWeek) {
    return (
      <WeekDetailFull
        key={selectedWeek.n}
        detail={selectedWeek}
        isCompleted={progress.completedWeeks.includes(selectedWeek.n)}
        onComplete={() => markComplete(selectedWeek.n)}
        onGoBack={() => onWeekSelect(null)}
        weekSidebarTab={weekSidebarTab}
        onTabChange={onWeekSidebarTabChange}
      />
    );
  }

  return (
    <div data-fi-section="area-semanas" data-fi-label="Semanas" style={{ display: "flex", flexDirection: "column", gap: 20 }}>

      {/* Header */}
      <div>
        <p data-fi-key="area.semanas.label" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: GOLD, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {semanasLabel}
        </p>
        <h2 data-fi-key="area.semanas.title" style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          {semanasTitle}
        </h2>
        <p data-fi-key="area.semanas.sub" style={{ fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {semanasSub}
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${GOLD},#D4AA5A)`, borderRadius: 2, marginTop: 16 }} />
      </div>

      {/* ── Unified gate selector: filter + progress in one card ── */}
      <style>{`
        @media (max-width: 767px) {
          .fi-gate-bar { display: none !important; }
          .fi-gate-cards { grid-template-columns: 1fr !important; gap: 8px !important; }
        }
      `}</style>
      <div data-fi-block="area-semanas-puertas" data-fi-label="Puertas — Filtro y Progreso"
        style={{ background: "#FAF8F5", borderRadius: 16, padding: "16px 18px", border: "1px solid #EDE8E1" }}>

        {/* Gradient bar — desktop only */}
        <div className="fi-gate-bar" style={{ display: "flex", height: 7, borderRadius: 7, overflow: "hidden", marginBottom: 14 }}>
          <div style={{ flex: 1, background: "white", border: "2px solid #2b7d7a", borderRight: "none", borderRadius: "7px 0 0 7px" }} />
          <div style={{ flex: 1, background: "#e8401a" }} />
          <div style={{ flex: 1, background: "#2c5f9e" }} />
          <div style={{ flex: 1, background: "linear-gradient(90deg,#2c5f9e,#7b4fa6,#e8401a,#f5a623,#f5e642)", borderRadius: "0 7px 7px 0" }} />
        </div>

        {/* Gate cards — each is the filter button */}
        <div className="fi-gate-cards" style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 10 }}>
          {gateInfo.map(g => {
            const isActive    = filter === g.key;
            const isRainbow   = g.key === "arcoiris";
            const rainbowGrad = "linear-gradient(90deg,#2c5f9e,#7b4fa6,#e8401a,#f5a623,#f5e642)";
            const completedInGate = progress.completedWeeks.filter(w => {
              const week = WEEKS.find(wk => wk.n === w);
              return week?.gate === g.key;
            }).length;

            const activeBg = g.key === "blanca"    ? "#ffffff"
                           : isRainbow             ? "#F5F2FC"
                           : `${g.color}14`;

            const btn = (
              <button
                data-testid={`filter-${g.key}`}
                onClick={() => setFilter(isActive ? "todas" : g.key)}
                style={{
                  all: "unset",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 10,
                  padding: "12px 14px",
                  borderRadius: (isRainbow && isActive) ? 11 : 12,
                  border: (isRainbow && isActive)
                    ? "none"
                    : isActive
                      ? `2px solid ${g.color}`
                      : "1.5px solid #E5E5EA",
                  background: isActive ? activeBg : "#F5F5F7",
                  cursor: "pointer",
                  transition: "all .15s",
                  boxShadow: (isActive && !isRainbow) ? `0 3px 12px ${g.color}28` : "none",
                  flex: 1,
                  minWidth: 0,
                  boxSizing: "border-box",
                }}
              >
                <span style={{ fontSize: 24, lineHeight: 1, flexShrink: 0 }}>{g.icon}</span>
                <div style={{ display: "flex", flexDirection: "column", gap: 1, minWidth: 0 }}>
                  <span style={{ fontSize: 13, fontWeight: 700, color: isActive ? (isRainbow ? "#7b4fa6" : g.color) : "#3A3A3C", letterSpacing: ".01em", whiteSpace: "nowrap" }}>
                    {g.shortLabel}
                  </span>
                  <span style={{ fontSize: 11, color: "#AEAEB2" }}>{g.range}</span>
                </div>
                <span style={{ fontSize: 15, fontWeight: 700, color: isActive ? (isRainbow ? "#7b4fa6" : g.color) : "#6E6E73", marginLeft: "auto", flexShrink: 0 }}>
                  {completedInGate}/12
                </span>
              </button>
            );

            return (
              <div
                key={g.key}
                style={{
                  display: "flex",
                  background: (isRainbow && isActive) ? rainbowGrad : "transparent",
                  padding: (isRainbow && isActive) ? 2 : 0,
                  borderRadius: (isRainbow && isActive) ? 14 : 0,
                  boxShadow: (isRainbow && isActive) ? "0 3px 14px rgba(124,79,166,0.22)" : "none",
                  transition: "all .15s",
                }}
              >
                {btn}
              </div>
            );
          })}
        </div>
      </div>

      {/* Week grid */}
      <div data-fi-section="area-semanas-grid" data-fi-label="Lista de Semanas" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 8 }}>
        {filteredWeeks.map(w => {
          const isUnlocked  = w.n <= maxUnlocked;
          const isCurrent   = w.n === progress.currentWeek;
          const isCompleted = progress.completedWeeks.includes(w.n);
          const color       = gateColor(w.gate);

          return (
            <div
              key={w.n}
              onClick={() => handleWeekClick(w.n)}
              data-testid={`week-item-${w.n}`}
              style={{
                background: "#ffffff",
                borderRadius: 12,
                padding: "13px 16px",
                display: "flex",
                alignItems: "center",
                gap: 12,
                cursor: "pointer",
                border: isCurrent && !isCompleted ? `1px solid ${color}55` : "1px solid #EBEBEB",
                opacity: isUnlocked ? 1 : 0.5,
                transition: "all .15s",
              }}
              onMouseEnter={e => isUnlocked && ((e.currentTarget as HTMLElement).style.borderColor = color + "44")}
              onMouseLeave={e => (e.currentTarget as HTMLElement).style.borderColor = (isCurrent && !isCompleted) ? color + "55" : "#EBEBEB"}
            >
              <div style={{
                width: 32, height: 32, borderRadius: "50%", flexShrink: 0,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700,
                background: isCompleted ? "#f0fdf4" : isCurrent ? color : "#F5F5F7",
                color: isCompleted ? "#34c759" : isCurrent ? "#fff" : "#6E6E73",
              }}>
                {isCompleted ? <CheckCircle2 size={14} /> : w.n}
              </div>
              <div style={{ width: 3, height: 24, borderRadius: 99, background: color, opacity: isUnlocked ? 0.6 : 0.3, flexShrink: 0 }} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: isUnlocked ? "#1D1D1F" : "#6E6E73", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  S.{w.n} · {w.title}
                </p>
                <p style={{ fontSize: 11, marginTop: 2 }}>
                  {isCompleted && <span style={{ color: "#34c759" }}>✓ Completada</span>}
                  {isCurrent && !isCompleted && <span style={{ color }}>▶ En curso</span>}
                  {!isCompleted && !isCurrent && isUnlocked && <span style={{ color: "#AEAEB2" }}>Disponible</span>}
                  {!isUnlocked && <span style={{ color: "#AEAEB2" }}>Bloqueada</span>}
                </p>
              </div>
              {!isUnlocked
                ? <Lock size={12} style={{ color: "#AEAEB2", flexShrink: 0 }} />
                : <ChevronRight size={14} style={{ color: "#AEAEB2", flexShrink: 0 }} />}
            </div>
          );
        })}
      </div>

      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
