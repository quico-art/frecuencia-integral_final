import React, { useState, useRef } from "react";
import { getJournal, saveJournalEntry, getProgress } from "@/lib/auth";
import BlockRenderer from "@/components/BlockRenderer";
import type { JournalEntry } from "@/lib/auth";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Trash2, Edit2 } from "lucide-react";
import { WEEKS, FREE_WEEKS } from "@/lib/data";
import MarkdownToolbar from "@/components/MarkdownToolbar";
import { useContent } from "@/hooks/useContent";

function computeMaxUnlocked(): number {
  const progress = getProgress();
  const completed = progress.completedWeeks;
  const currentWeek = progress.currentWeek ?? 1;
  if (completed.length === 0) return Math.max(FREE_WEEKS, currentWeek);
  const maxDone = Math.max(...completed);
  return Math.min(48, Math.max(maxDone + 1, FREE_WEEKS, currentWeek));
}
const gold = "#BC9640";
const teal = "#2b7d7a";
const SERIF = "'Playfair Display', Georgia, serif";

/* Source badge config */
const SOURCE_BADGE: Record<string, { label: string; bg: string; color: string }> = {
  diario:      { label: "Diario",      bg: "#EFF6FF", color: "#2D7DD2" },
  ejercicio:   { label: "Ejercicio",   bg: "#F0FFF4", color: "#2E7D52" },
  arteterapia: { label: "Arteterapia", bg: "#FFFBF2", color: "#BC9640" },
};

function SourceBadge({ source }: { source?: string }) {
  const cfg = SOURCE_BADGE[source ?? "diario"] ?? SOURCE_BADGE.diario;
  return (
    <span style={{
      display: "inline-block",
      fontSize: 10, fontWeight: 700,
      letterSpacing: ".08em", textTransform: "uppercase",
      background: cfg.bg, color: cfg.color,
      padding: "2px 8px", borderRadius: 9999,
      marginLeft: 8,
    }}>
      {cfg.label}
    </span>
  );
}

export default function Diario() {
  const [diarioLabel] = useContent("area.diario.label", "Tu espacio interior");
  const [diarioTitle] = useContent("area.diario.title", "Mi Diario TCT");
  const [diarioSub]   = useContent("area.diario.sub",   "Reflexiones, observaciones y presencia");

  const [entries, setEntries] = useState<JournalEntry[]>(getJournal);
  const [selectedWeek, setSelectedWeek] = useState<string>("");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [content, setContent] = useState("");
  const [saved, setSaved] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"escribir" | "entradas">("escribir");
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const unlockedWeeks = WEEKS.filter((w) => w.n <= computeMaxUnlocked());

  function handleSave() {
    if (!content.trim() || !selectedWeek) return;
    const entry: JournalEntry = {
      id: editingId || crypto.randomUUID(),
      week: parseInt(selectedWeek),
      date,
      content,
      source: "diario",
    };
    saveJournalEntry(entry);
    setEntries(getJournal());
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
    if (!editingId) { setContent(""); setSelectedWeek(""); }
    setEditingId(null);
  }

  function handleEdit(entry: JournalEntry) {
    setEditingId(entry.id);
    setSelectedWeek(String(entry.week));
    setDate(entry.date);
    setContent(entry.content);
    setActiveTab("escribir");
  }

  function handleDelete(id: string) {
    const updated = entries.filter((e) => e.id !== id);
    localStorage.setItem("journal", JSON.stringify(updated));
    setEntries(updated);
  }

  /* Refresh from localStorage (in case notes were saved from Semanas) */
  function refreshEntries() {
    setEntries(getJournal());
  }

  const weekTitle = (n: number) => WEEKS.find((w) => w.n === n)?.title ?? "";
  const sortedEntries = entries.slice().sort((a, b) => b.date.localeCompare(a.date));

  return (
    <div data-fi-section="area-diario" data-fi-label="Diario" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
        <div>
          <p data-fi-key="area.diario.label" style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
            {diarioLabel}
          </p>
          <h2 data-fi-key="area.diario.title" style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
            {diarioTitle}
          </h2>
          <p data-fi-key="area.diario.sub" style={{ fontSize: 14, color: "#6E6E73", margin: 0 }}>
            {diarioSub}
          </p>
          <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16 }} />
        </div>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 4 }}>
          <button
            onClick={() => setActiveTab("escribir")}
            data-testid="tab-escribir"
            style={{
              padding: "8px 18px", borderRadius: 9999,
              border: `1.5px solid ${activeTab === "escribir" ? teal : "#e4ddd3"}`,
              background: activeTab === "escribir" ? teal : "#fff",
              color: activeTab === "escribir" ? "#fff" : "#6E6E73",
              fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em",
            }}
          >
            ✏️ Escribir
          </button>
          <button
            onClick={() => { setActiveTab("entradas"); refreshEntries(); }}
            data-testid="tab-entradas"
            style={{
              padding: "8px 18px", borderRadius: 9999,
              border: `1.5px solid ${activeTab === "entradas" ? teal : "#e4ddd3"}`,
              background: activeTab === "entradas" ? teal : "#fff",
              color: activeTab === "entradas" ? "#fff" : "#6E6E73",
              fontSize: 12, fontWeight: 700, cursor: "pointer", letterSpacing: ".04em",
            }}
          >
            📅 Entradas ({sortedEntries.length})
          </button>
        </div>
      </div>

      {/* ── Escribir ── */}
      {activeTab === "escribir" && (
        <div data-fi-block="area-diario-form" data-fi-label="Formulario Diario" style={{ background: "#ffffff", borderRadius: 20, padding: 24, display: "flex", flexDirection: "column", gap: 20, boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#1D1D1F", textTransform: "uppercase", letterSpacing: ".05em" }}>Semana</label>
              <Select value={selectedWeek} onValueChange={setSelectedWeek}>
                <SelectTrigger className="bg-[#F5F5F7] border-0 h-11 rounded-xl text-[#1D1D1F]" data-testid="select-journal-week">
                  <SelectValue placeholder="— Selecciona semana —" />
                </SelectTrigger>
                <SelectContent className="max-w-[calc(100vw-40px)]" style={{ maxWidth: "min(340px, calc(100vw - 40px))" }}>
                  {unlockedWeeks.map((w) => (
                    <SelectItem key={w.n} value={String(w.n)} className="whitespace-normal break-words" style={{ whiteSpace: "normal", wordBreak: "break-word" }}>
                      Sem. {w.n} — {w.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label style={{ fontSize: 10, fontWeight: 700, color: "#1D1D1F", textTransform: "uppercase", letterSpacing: ".05em" }}>Fecha</label>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                style={{ height: 44, padding: "0 16px", borderRadius: 12, background: "#F5F5F7", border: "none", fontSize: 14, color: "#1D1D1F", outline: "none" }}
                data-testid="input-journal-date"
              />
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <label style={{ fontSize: 10, fontWeight: 700, color: "#1D1D1F", textTransform: "uppercase", letterSpacing: ".05em" }}>Reflexión</label>
            <div style={{ border: "1.5px solid #E8E8ED", borderRadius: 12, overflow: "hidden" }}>
              <MarkdownToolbar
                textareaRef={textareaRef}
                onChange={setContent}
                value={content}
                textareaProps={{
                  placeholder: "Escribe tu reflexión de hoy... ¿Qué observaste? ¿Qué sentiste? ¿Qué descubriste?",
                  rows: 8,
                  "data-testid": "textarea-journal-content",
                  style: {
                    width: "100%", boxSizing: "border-box",
                    padding: "14px 16px", border: "none",
                    fontSize: 15, color: "#1D1D1F", lineHeight: "1.75",
                    fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif",
                    resize: "vertical", outline: "none",
                    background: "#F5F5F7", display: "block",
                  } as React.CSSProperties,
                }}
              />
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <button
              onClick={handleSave}
              disabled={!content.trim() || !selectedWeek}
              data-testid="button-save-journal"
              style={{
                padding: "10px 24px", borderRadius: 9999,
                background: content.trim() && selectedWeek ? "#1D1D1F" : "#E8E8ED",
                color: content.trim() && selectedWeek ? "white" : "#AEAEB2",
                fontSize: 13, fontWeight: 600, border: "none",
                cursor: content.trim() && selectedWeek ? "pointer" : "default",
                transition: "all .15s",
              }}
            >
              {editingId ? "Actualizar entrada" : "Guardar entrada"}
            </button>
            {editingId && (
              <button
                onClick={() => { setEditingId(null); setContent(""); setSelectedWeek(""); }}
                style={{ fontSize: 13, color: "#6E6E73", background: "none", border: "none", cursor: "pointer" }}
              >
                Cancelar
              </button>
            )}
            {saved && <span style={{ fontSize: 12, color: "#34c759", fontWeight: 600 }}>✓ Guardado</span>}
          </div>
          <p style={{ fontSize: 12, color: "#AEAEB2", margin: 0 }}>
            Las semanas 4–48 se desbloquean al activar tu puerta.
          </p>
        </div>
      )}

      {/* ── Entradas ── */}
      {activeTab === "entradas" && (
        <div data-fi-section="area-diario-entradas" data-fi-label="Entradas del Diario" style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {sortedEntries.length === 0 ? (
            <div style={{ background: "#ffffff", borderRadius: 20, padding: "64px 24px", textAlign: "center", boxShadow: "0 1px 4px rgba(0,0,0,.06)" }}>
              <div style={{ fontSize: 40, marginBottom: 16 }}>✎</div>
              <p style={{ color: "#6E6E73", fontSize: 15, marginBottom: 8 }}>Aún no tienes entradas</p>
              <p style={{ fontSize: 13, color: "#AEAEB2", marginBottom: 20 }}>Escribe desde el Diario o guarda notas desde un ejercicio</p>
              <button
                onClick={() => setActiveTab("escribir")}
                style={{ padding: "10px 22px", background: "#1D1D1F", color: "white", borderRadius: 9999, fontSize: 13, fontWeight: 600, border: "none", cursor: "pointer" }}
              >
                Empezar a escribir
              </button>
            </div>
          ) : (
            sortedEntries.map((entry) => (
              <div
                key={entry.id}
                data-testid={`journal-entry-${entry.id}`}
                style={{ background: "#ffffff", borderRadius: 16, padding: 24, boxShadow: "0 1px 3px rgba(0,0,0,.05)" }}
              >
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 600, color: "#1D1D1F", margin: 0 }}>
                      Semana {entry.week}
                      {weekTitle(entry.week) && (
                        <span style={{ fontWeight: 400, color: "#6E6E73", marginLeft: 6 }}>— {weekTitle(entry.week)}</span>
                      )}
                      <SourceBadge source={entry.source} />
                    </p>
                    <p style={{ fontSize: 11, color: "#AEAEB2", marginTop: 4 }}>
                      {new Date(entry.date + "T12:00:00").toLocaleDateString("es-ES", {
                        weekday: "long", year: "numeric", month: "long", day: "numeric",
                      })}
                    </p>
                  </div>
                  <div style={{ display: "flex", gap: 6 }}>
                    <button
                      onClick={() => handleEdit(entry)}
                      data-testid={`button-edit-entry-${entry.id}`}
                      title="Editar"
                      style={{ color: "#AEAEB2", background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, transition: "color .12s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#1D1D1F")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#AEAEB2")}
                    >
                      <Edit2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDelete(entry.id)}
                      data-testid={`button-delete-entry-${entry.id}`}
                      title="Eliminar"
                      style={{ color: "#AEAEB2", background: "none", border: "none", cursor: "pointer", padding: 6, borderRadius: 8, transition: "color .12s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = "#C54B3A")}
                      onMouseLeave={e => (e.currentTarget.style.color = "#AEAEB2")}
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p style={{ fontSize: 14, color: "#424245", lineHeight: 1.78, whiteSpace: "pre-wrap", margin: 0 }}>
                  {entry.content}
                </p>
              </div>
            ))
          )}
        </div>
      )}
      <BlockRenderer zone="area-diario" />
    </div>
  );
}
