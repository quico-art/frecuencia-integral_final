import type { RefObject } from "react";
import { useState } from "react";
import { marked } from "marked";
import { Eye, Edit3 } from "lucide-react";

interface Props {
  textareaRef: RefObject<HTMLTextAreaElement>;
  onChange: (val: string) => void;
  value?: string;
  /** Extra props forwarded to the <textarea> */
  textareaProps?: React.TextareaHTMLAttributes<HTMLTextAreaElement>;
}

/* Apply inline markdown (bold, italic, strikethrough) */
function applyInline(ta: HTMLTextAreaElement, before: string, after: string, sample: string, onChange: (v: string) => void) {
  const start = ta.selectionStart;
  const end   = ta.selectionEnd;
  const selected = ta.value.substring(start, end);
  const insert = selected || sample;
  const next = ta.value.substring(0, start) + before + insert + after + ta.value.substring(end);
  onChange(next);
  requestAnimationFrame(() => {
    ta.focus();
    const s = start + before.length;
    ta.setSelectionRange(s, s + insert.length);
  });
}

/* Toggle line prefix (heading, bullet, blockquote) */
function applyLinePrefix(ta: HTMLTextAreaElement, prefix: string, sample: string, onChange: (v: string) => void) {
  const start     = ta.selectionStart;
  const lineStart = ta.value.lastIndexOf("\n", start - 1) + 1;
  const lineEnd   = ta.value.indexOf("\n", start);
  const lineText  = ta.value.substring(lineStart, lineEnd === -1 ? undefined : lineEnd);
  const hasPrefix = lineText.startsWith(prefix);
  const newLine   = hasPrefix ? lineText.substring(prefix.length) : prefix + (lineText || sample);
  const next      = ta.value.substring(0, lineStart) + newLine + (lineEnd === -1 ? "" : ta.value.substring(lineEnd));
  onChange(next);
  requestAnimationFrame(() => {
    ta.focus();
    ta.setSelectionRange(lineStart + newLine.length, lineStart + newLine.length);
  });
}

/* Insert a horizontal rule block */
function insertHr(ta: HTMLTextAreaElement, onChange: (v: string) => void) {
  const pos  = ta.selectionStart;
  const next = ta.value.substring(0, pos) + "\n\n---\n\n" + ta.value.substring(pos);
  onChange(next);
  requestAnimationFrame(() => { ta.focus(); ta.setSelectionRange(pos + 7, pos + 7); });
}

/* Render markdown to HTML */
function renderMarkdown(md: string): string {
  try { return marked.parse(md, { breaks: true, async: false }) as string; }
  catch { return md; }
}

/* Single toolbar button */
function Btn({ label, title, fw, fi, onClick }: {
  label: string; title: string;
  fw?: number; fi?: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button" title={title} onClick={onClick}
      style={{
        minWidth: 26, height: 26, padding: "0 6px", borderRadius: 5,
        border: "none", background: "transparent", color: "#3A3A3C",
        fontSize: 12, fontWeight: fw ?? 500,
        fontStyle: fi ?? "normal",
        cursor: "pointer", display: "flex",
        alignItems: "center", justifyContent: "center",
        transition: "background .1s", flexShrink: 0, lineHeight: 1,
      }}
      onMouseEnter={e => (e.currentTarget.style.background = "#D8D8DF")}
      onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
    >
      {label}
    </button>
  );
}

function Sep() {
  return <div style={{ width: 1, height: 16, background: "#DCDCDC", margin: "0 3px", flexShrink: 0 }} />;
}

export default function MarkdownToolbar({ textareaRef, onChange, value = "", textareaProps }: Props) {
  const [preview, setPreview] = useState(false);

  const ta = () => textareaRef.current;
  const inline = (b: string, a: string, s: string) => () => { const t = ta(); if (t) applyInline(t, b, a, s, onChange); };
  const prefix = (p: string, s: string) => () => { const t = ta(); if (t) applyLinePrefix(t, p, s, onChange); };

  return (
    <div>
      {/* ── Toolbar ── */}
      <div style={{
        display: "flex", flexWrap: "wrap", alignItems: "center", gap: 1,
        padding: "4px 8px", background: "#F2F2F7",
        borderBottom: "1px solid #E0E0E5", userSelect: "none",
      }}>

        {/* Format buttons — faded when in preview so user knows they're inactive */}
        <div style={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap", opacity: preview ? 0.35 : 1, pointerEvents: preview ? "none" : "auto" }}>
          <Btn label="N"  title="Negrita"    fw={800}  onClick={inline("**", "**", "negrita")} />
          <Btn label="C"  title="Cursiva"    fi="italic" onClick={inline("*", "*", "cursiva")} />
          <Btn label="~~" title="Tachado"    fw={400}  onClick={inline("~~", "~~", "tachado")} />

          <Sep />

          <Btn label="H1" title="Título 1 — el más grande" fw={800} onClick={prefix("# ",    "Título")} />
          <Btn label="H2" title="Título 2"                 fw={700} onClick={prefix("## ",   "Título")} />
          <Btn label="H3" title="Título 3"                 fw={600} onClick={prefix("### ",  "Título")} />
          <Btn label="H4" title="Título 4"                 fw={600} onClick={prefix("#### ", "Título")} />

          <Sep />

          <Btn label="•"  title="Lista de puntos"   onClick={prefix("- ",   "elemento")} />
          <Btn label="1." title="Lista numerada" fw={600} onClick={prefix("1. ",  "elemento")} />
          <Btn label="❝"  title="Cita"              onClick={prefix("> ",   "cita")} />
          <Btn label="—"  title="Línea separadora"  onClick={() => { const t = ta(); if (t) insertHr(t, onChange); }} />
        </div>

        {/* Spacer */}
        <div style={{ flex: 1 }} />

        {/* Preview toggle — always clickable */}
        <button
          type="button"
          onClick={() => setPreview(p => !p)}
          title={preview ? "Editar" : "Vista previa"}
          style={{
            display: "flex", alignItems: "center", gap: 5,
            padding: "4px 10px", borderRadius: 6, border: "none",
            background: preview ? "#1D1D1F" : "transparent",
            color: preview ? "#fff" : "#6E6E73",
            fontSize: 11, fontWeight: 600, cursor: "pointer",
            transition: "all .15s",
          }}
          onMouseEnter={e => { if (!preview) e.currentTarget.style.background = "#D8D8DF"; }}
          onMouseLeave={e => { if (!preview) e.currentTarget.style.background = "transparent"; }}
        >
          {preview ? <Edit3 size={11} /> : <Eye size={11} />}
          {preview ? "Editar" : "Vista previa"}
        </button>
      </div>

      {/* ── Preview pane (replaces textarea) ── */}
      {preview ? (
        <div
          className="fi-md-preview"
          style={{
            padding: "14px 16px", minHeight: 120,
            background: "#fff",
            fontSize: 14, color: "#3A3A3C",
            lineHeight: 1.8,
            fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif",
          }}
          dangerouslySetInnerHTML={{
            __html: value.trim()
              ? renderMarkdown(value)
              : '<p style="color:#AEAEB2;font-style:italic">La vista previa aparecerá aquí…</p>',
          }}
        />
      ) : (
        /* ── Editable textarea ── */
        <textarea
          ref={textareaRef}
          value={value}
          onChange={e => onChange(e.target.value)}
          style={{
            width: "100%", boxSizing: "border-box",
            padding: "14px 16px", border: "none",
            fontSize: 14, color: "#3A3A3C", lineHeight: 1.8,
            fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif",
            resize: "vertical", outline: "none",
            background: "#FAFAFA", display: "block",
          }}
          {...textareaProps}
        />
      )}
    </div>
  );
}
