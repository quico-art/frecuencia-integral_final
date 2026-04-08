import { getProgress } from "@/lib/auth";
import { FREE_WEEKS } from "@/lib/data";
import { useContent } from "@/hooks/useContent";
import BlockRenderer from "@/components/BlockRenderer";

const gateData = [
  { key: "blanca", label: "🌿 Puerta Blanca", range: [1, 12] as [number, number] },
  { key: "roja", label: "🔥 Puerta Roja", range: [13, 24] as [number, number] },
  { key: "azul", label: "🔵 Puerta Azul", range: [25, 36] as [number, number] },
  { key: "arcoiris", label: "🌈 Puerta Arcoíris", range: [37, 48] as [number, number] },
];

export default function Progreso() {
  const progress = getProgress();
  const [progresoLabel] = useContent("area.progreso.label", "Tu evolución");
  const [progresoTitle] = useContent("area.progreso.title", "Mi Progreso");
  const [progresoSub]   = useContent("area.progreso.sub",   "Avance por Puerta y semanas completadas");

  function gateProgress(start: number, end: number) {
    const completed = progress.completedWeeks.filter((w) => w >= start && w <= end).length;
    return { pct: Math.round((completed / 12) * 100), completed };
  }

  const totalPct = Math.round((progress.completedWeeks.length / 48) * 100);

  const _maxDone = progress.completedWeeks.length > 0 ? Math.max(...progress.completedWeeks) : 0;
  const maxUnlocked = Math.min(48, Math.max(FREE_WEEKS, _maxDone + 1, progress.currentWeek ?? 1));

  const gold = "#BC9640";

  return (
    <div data-fi-section="area-progreso" data-fi-label="Progreso" className="space-y-7">
      <div>
        <p data-fi-key="area.progreso.label" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {progresoLabel}
        </p>
        <h2 data-fi-key="area.progreso.title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          {progresoTitle}
        </h2>
        <p data-fi-key="area.progreso.sub" style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {progresoSub}
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16, marginBottom: 8 }} />
      </div>

      {/* Overall */}
      <div data-fi-block="area-progreso-total" data-fi-label="Progreso Total" className="bg-white rounded-[20px] p-8" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <div className="flex items-center justify-between mb-5">
          <div>
            <h3 className="text-[18px] font-serif text-[#1D1D1F]">Progreso Total</h3>
            <p className="text-sm text-[#6E6E73] mt-1">{progress.completedWeeks.length} de 48 semanas completadas</p>
          </div>
          <span className="text-[44px] font-serif text-primary leading-none">{totalPct}%</span>
        </div>
        <div className="w-full h-2 bg-[#F5F5F7] rounded-full overflow-hidden">
          <div className="h-full bg-primary rounded-full transition-all duration-700" style={{ width: `${totalPct}%` }} />
        </div>
      </div>

      {/* By gate */}
      <div data-fi-section="area-progreso-puertas" data-fi-label="Progreso por Puerta" className="space-y-3">
        <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] px-1">Por Puerta</p>
        {gateData.map((g) => {
          const { pct, completed } = gateProgress(g.range[0], g.range[1]);
          return (
            <div
              key={g.key}
              data-fi-block={`area-progreso-gate-${g.key}`}
              data-fi-label={g.label}
              className="bg-white rounded-[16px] p-6"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.05)" }}
              data-testid={`progress-gate-${g.key}`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-[15px] font-medium text-[#1D1D1F]">{g.label}</span>
                <span className="text-primary font-semibold text-[15px]">{pct}%</span>
              </div>
              <div className="w-full h-1.5 bg-[#F5F5F7] rounded-full overflow-hidden mb-2">
                <div className="h-full bg-primary rounded-full" style={{ width: `${pct}%` }} />
              </div>
              <p className="text-xs text-[#6E6E73]">{completed} / 12 semanas · Sem. {g.range[0]}–{g.range[1]}</p>
            </div>
          );
        })}
      </div>

      {/* Journey map */}
      <div data-fi-block="area-progreso-mapa" data-fi-label="Mapa del Camino" className="bg-white rounded-[20px] p-8" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] mb-5">Mapa del Camino</p>
        <div className="grid grid-cols-8 gap-1.5">
          {Array.from({ length: 48 }, (_, i) => {
            const weekNum = i + 1;
            const isCompleted = progress.completedWeeks.includes(weekNum);
            const isCurrent = weekNum === progress.currentWeek;
            const isUnlocked = weekNum <= maxUnlocked;
            return (
              <div
                key={weekNum}
                className={`aspect-square rounded-lg flex items-center justify-center text-[10px] font-mono transition-all ${
                  isCompleted ? "bg-primary text-white" : ""
                } ${isCurrent && !isCompleted ? "bg-primary/15 text-primary ring-1 ring-primary/30" : ""} ${
                  !isCompleted && !isCurrent && isUnlocked ? "bg-[#F5F5F7] text-[#6E6E73]" : ""
                } ${!isCompleted && !isCurrent && !isUnlocked ? "bg-[#F5F5F7] text-[#D2D2D7]" : ""}`}
                title={`Semana ${weekNum}`}
                data-testid={`journey-week-${weekNum}`}
              >
                {weekNum}
              </div>
            );
          })}
        </div>
        <div className="flex gap-5 mt-5 text-xs text-[#6E6E73]">
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary inline-block" /> Completada</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-primary/15 ring-1 ring-primary/30 inline-block" /> En curso</span>
          <span className="flex items-center gap-1.5"><span className="w-3 h-3 rounded-sm bg-[#F5F5F7] inline-block" /> Disponible</span>
        </div>
      </div>
      <BlockRenderer zone="area-progreso" />
    </div>
  );
}
