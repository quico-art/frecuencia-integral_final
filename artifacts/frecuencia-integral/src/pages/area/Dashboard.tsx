import { getProgress } from "@/lib/auth";
import type { User } from "@/lib/auth";
import { useContent } from "@/hooks/useContent";
import BlockRenderer from "@/components/BlockRenderer";

import { ALL_WEEK_DETAILS, FREE_WEEKS } from "@/lib/data";
import type { WeekDetail } from "@/lib/data";

type AreaTab = "dashboard" | "semanas" | "multimedia" | "pdf" | "progreso" | "diario" | "arteterapia" | "comunidad";

interface DashboardProps {
  auth: User;
  onTabChange: (tab: AreaTab) => void;
  onWeekNavigate?: (week: WeekDetail) => void;
}

const gateLabel: Record<string, string> = {
  blanca: "🌿 Blanca",
  roja: "🔥 Roja",
  azul: "🔵 Azul",
  arcoiris: "🌈 Arcoíris",
};

const gold = "#BC9640";
const teal = "#2b7d7a";

export default function Dashboard({ auth, onTabChange, onWeekNavigate }: DashboardProps) {
  const progress = getProgress();
  const pct = Math.round((progress.completedWeeks.length / 48) * 100);

  const [dashLabel]   = useContent("area.dashboard.label",   "Método TCT · 48 semanas");
  const [dashWelcome] = useContent("area.dashboard.welcome", "Tu camino de transformación integral continúa");
  const [dashQuote]   = useContent("area.dashboard.quote",   "El camino del TCT no es una carrera. Es un despertar.");
  const [dashQuoteBy] = useContent("area.dashboard.quoteBy", "Frecuencia Integral Academy");
  const [dashCta1]    = useContent("area.dashboard.cta1",    "Ver Formaciones");
  const [dashCta2]    = useContent("area.dashboard.cta2",    "Multimedia");
  const [dashCta3]    = useContent("area.dashboard.cta3",    "Mi Diario");

  const statCards = [
    {
      label: "Progreso General",
      value: `${pct}%`,
      sub: `${progress.completedWeeks.length} de 48 semanas`,
      barBg: `linear-gradient(90deg,${gold},#D4AA5A)`,
      valueColor: gold,
    },
    {
      label: "Semana Actual",
      value: String(progress.currentWeek),
      sub: "En curso",
      barBg: teal,
      valueColor: teal,
    },
    {
      label: "Puerta Actual",
      value: gateLabel[progress.currentGate] ?? "🌿 Blanca",
      sub: "Cimentación",
      barBg: `linear-gradient(90deg,${gold},${teal})`,
      valueColor: "#1D1D1F",
    },
  ];

  return (
    <div data-fi-section="area-dashboard" data-fi-label="Dashboard" style={{ display: "flex", flexDirection: "column", gap: 28 }}>

      {/* ── Header ── */}
      <div>
        <p data-fi-key="area.dashboard.label" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {dashLabel}
        </p>
        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(28px,4vw,36px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", letterSpacing: "-.01em", lineHeight: 1.2 }}>
          Bienvenido, <span style={{ color: gold }}>{auth.name}</span>{" "}
          <span style={{ color: gold, fontSize: "0.65em", verticalAlign: "middle" }}>✦</span>
        </h1>
        <p data-fi-key="area.dashboard.welcome" style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {dashWelcome}
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16 }} />
      </div>

      {/* ── Stat cards ── */}
      <div data-fi-section="area-dash-stats" data-fi-label="Dashboard — Estadísticas" style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: 14 }}>
        {statCards.map((s, i) => (
          <div
            key={s.label}
            data-fi-block={`area-dash-stat-${i}`}
            data-fi-label={s.label}
            style={{
              background: "#fff",
              borderRadius: 16,
              overflow: "hidden",
              boxShadow: "0 1px 3px rgba(28,24,20,.06), 0 4px 16px rgba(28,24,20,.04)",
              position: "relative",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 24px rgba(28,24,20,.10)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "0 1px 3px rgba(28,24,20,.06), 0 4px 16px rgba(28,24,20,.04)"; }}
          >
            {/* Colored top bar */}
            <div style={{ height: 3, background: s.barBg }} />
            <div style={{ padding: "16px 18px 18px" }}>
              <p style={{ fontSize: 11, fontWeight: 700, color: "#6E6E73", letterSpacing: ".06em", textTransform: "uppercase", marginBottom: 8 }}>{s.label}</p>
              <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: 28, fontWeight: 400, color: s.valueColor, lineHeight: 1, marginBottom: 6 }}>{s.value}</p>
              <p style={{ fontSize: 11, color: "#AEAEB2" }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── Acceso rápido ── */}
      <div data-fi-block="area-dash-acceso" data-fi-label="Acceso rápido" style={{ background: "#FAF8F5", borderRadius: 16, padding: "24px 28px", border: "1px solid #ede8e1" }}>
        <p style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 11, fontWeight: 700, color: gold, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 16 }}>
          Acceso rápido
        </p>
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          {onWeekNavigate && (() => {
            const planNorm = (auth.plan ?? "").toLowerCase();
            // For libre/prueba plan, always cap at FREE_WEEKS to prevent bypassing the lock
            const accessibleWeek = (!planNorm || planNorm === "libre" || planNorm === "prueba")
              ? FREE_WEEKS
              : (progress.currentWeek ?? 1);
            const currentWeekDetail = ALL_WEEK_DETAILS.find(w => w.n === accessibleWeek);
            if (!currentWeekDetail) return null;
            return (
              <button
                onClick={() => onWeekNavigate(currentWeekDetail)}
                data-testid="button-quick-current-week"
                style={{
                  display: "flex", alignItems: "center", gap: 6,
                  padding: "9px 18px", borderRadius: 9999,
                  background: gold, color: "#fff",
                  fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
                  fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", letterSpacing: ".04em",
                  transition: "transform .2s, box-shadow .2s",
                }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 18px rgba(188,150,64,.35)`; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
              >
                <span style={{ fontSize: 15 }}>🗓️</span> <span>Semana {accessibleWeek}</span>
              </button>
            );
          })()}
          <button
            onClick={() => onTabChange("semanas")}
            data-testid="button-quick-semanas"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 18px", borderRadius: 9999,
              background: teal, color: "#fff",
              fontSize: 13, fontWeight: 700, border: "none", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", letterSpacing: ".04em",
              transition: "transform .2s, box-shadow .2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)"; (e.currentTarget as HTMLElement).style.boxShadow = `0 6px 18px rgba(43,125,122,.35)`; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = ""; }}
          >
            <span style={{ fontSize: 15 }}>📚</span> <span data-fi-key="area.dashboard.cta1">{dashCta1}</span>
          </button>
          <button
            onClick={() => onTabChange("multimedia")}
            data-testid="button-quick-multimedia"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 18px", borderRadius: 9999,
              background: "#fff", color: "#3d3730",
              fontSize: 13, fontWeight: 700, border: "1.5px solid #e4ddd3", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", letterSpacing: ".04em",
              transition: "background .2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f7f5f2"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            <span style={{ fontSize: 15 }}>🎵</span> <span data-fi-key="area.dashboard.cta2">{dashCta2}</span>
          </button>
          <button
            onClick={() => onTabChange("diario")}
            data-testid="button-quick-diario"
            style={{
              display: "flex", alignItems: "center", gap: 6,
              padding: "9px 18px", borderRadius: 9999,
              background: "#fff", color: "#3d3730",
              fontSize: 13, fontWeight: 700, border: "1.5px solid #e4ddd3", cursor: "pointer",
              fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", letterSpacing: ".04em",
              transition: "background .2s",
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = "#f7f5f2"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = "#fff"; }}
          >
            <span style={{ fontSize: 15 }}>📔</span> <span data-fi-key="area.dashboard.cta3">{dashCta3}</span>
          </button>
        </div>
      </div>

      {/* ── Cita inspiracional ── */}
      <div data-fi-block="area-dash-cita" data-fi-label="Cita inspiracional" style={{ borderLeft: `3px solid ${gold}`, padding: "16px 20px", background: "transparent" }}>
        <p data-fi-key="area.dashboard.quote" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 15, color: "#3d3730", margin: "0 0 6px", lineHeight: 1.6 }}>
          "{dashQuote}"
        </p>
        <p data-fi-key="area.dashboard.quoteBy" style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 11, color: gold, letterSpacing: ".08em", textTransform: "uppercase", margin: 0 }}>
          {dashQuoteBy}
        </p>
      </div>
      <BlockRenderer zone="area-dashboard" />
    </div>
  );
}
