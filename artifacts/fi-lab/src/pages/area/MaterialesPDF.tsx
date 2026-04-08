import { useState } from "react";
import { FileText, Download, ExternalLink, Lock, ChevronDown, ChevronUp } from "lucide-react";
import { MATERIALES, GATE_ORDER } from "@/lib/data";
import { getProgress, getAuth } from "@/lib/auth";
import UpsellModal from "@/components/UpsellModal";

const GATE_KEYS = ["Blanca", "Roja", "Azul", "Arcoiris"] as const;

const PRUEBA_BASE = "https://jtwbbyjspanirbsuoipa.supabase.co/storage/v1/object/public/materiales/PRUEBA";
const PRUEBA_PDFS = [
  { icon: "📖", name: "El Deportista Consciente — Cap. 1: El Precio Oculto de Vivir Acelerados", url: `${PRUEBA_BASE}/prueba_deportista_sem1_cap1.pdf` },
  { icon: "🌿", name: "TCT-I Puerta Blanca — Vista previa (42 páginas)", url: `${PRUEBA_BASE}/TCT-I-PUERTA-BLANCA%20_Plan%20Prueba_semana%201.pdf` },
];

function gateForWeek(week: number): string {
  if (week <= 12) return "Blanca";
  if (week <= 24) return "Roja";
  if (week <= 36) return "Azul";
  return "Arcoiris";
}

export default function MaterialesPDF() {
  const progress = getProgress();
  const planNorm = (getAuth().plan ?? "").toLowerCase();
  const isPrueba = !planNorm || planNorm === "prueba" || planNorm === "libre";
  const unlockedGate = gateForWeek(progress.currentWeek);
  const [open, setOpen] = useState<string | null>("Blanca");
  const [upsellOpen, setUpsellOpen] = useState(false);

  const unlockedIndex = GATE_KEYS.indexOf(unlockedGate as typeof GATE_KEYS[number]);

  function isGateUnlocked(gate: string) {
    const idx = GATE_KEYS.indexOf(gate as typeof GATE_KEYS[number]);
    return idx <= unlockedIndex;
  }

  const gold = "#BC9640";

  return (
    <div className="space-y-7">
      <div>
        <p style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          Tu biblioteca
        </p>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          Materiales PDF
        </h2>
        <p style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 14, color: "#6E6E73", margin: 0 }}>
          Descarga o visualiza los libros y documentos de tu programa
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16, marginBottom: 8 }} />
      </div>

      {/* ── Plan Prueba: mostrar solo los documentos reducidos de Sem. 1 ── */}
      {isPrueba && (
        <div className="space-y-3">
          {/* Puerta Blanca preview */}
          <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
            <button className="w-full flex items-center gap-4 px-6 py-5 text-left" onClick={() => setOpen(open === "Blanca" ? null : "Blanca")}>
              <span className="text-2xl shrink-0">🌿</span>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-[15px] text-[#1D1D1F]">
                  Puerta Blanca <span className="ml-2 text-xs text-[#AEAEB2] font-normal">Vista previa · 2 documentos</span>
                </p>
              </div>
              {open === "Blanca" ? <ChevronUp size={16} className="text-[#6E6E73] shrink-0" /> : <ChevronDown size={16} className="text-[#6E6E73] shrink-0" />}
            </button>
            {open === "Blanca" && (
              <div className="border-t border-black/[0.05] px-6 pb-5 pt-4 space-y-3">
                {PRUEBA_PDFS.map((pdf, idx) => (
                  <div key={idx} className="flex items-center gap-3 p-4 rounded-[14px] bg-[#F5F5F7] hover:bg-[#EFEFEF] transition-colors">
                    <div className="w-9 h-9 rounded-[9px] bg-white flex items-center justify-center shrink-0 text-[18px]" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                      {pdf.icon}
                    </div>
                    <p className="flex-1 text-[13px] font-medium text-[#1D1D1F] min-w-0 leading-snug">{pdf.name}</p>
                    <a href={pdf.url} target="_blank" rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-2.5 py-2 text-[12px] font-medium rounded-full border border-black/10 text-[#1D1D1F] hover:bg-white transition-colors"
                      title="Ver documento"
                    >
                      👁 <span className="hidden sm:inline">Ver</span>
                    </a>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Puertas bloqueadas */}
          {(["Roja", "Azul", "Arcoiris"] as const).map(gate => (
            <div key={gate} className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <button className="w-full flex items-center gap-4 px-6 py-5 text-left" onClick={() => setUpsellOpen(true)}>
                <span className="text-2xl shrink-0">{MATERIALES[gate].icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] text-[#1D1D1F]">Puerta {gate}</p>
                  <p className="text-xs text-[#AEAEB2] mt-0.5">Requiere plan Puerta Blanca o superior</p>
                </div>
                <Lock size={14} className="text-[#AEAEB2] shrink-0" />
              </button>
            </div>
          ))}

          <div className="bg-[#F5F5F7] rounded-[20px] p-6">
            <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] mb-2">📖 Vista previa</p>
            <p className="text-[14px] text-[#424245] leading-[1.65]">
              Estás viendo los documentos de la Semana 1. Activa un plan para acceder a todos los materiales del programa.
            </p>
          </div>
        </div>
      )}

      {/* ── Plan pagado: vista completa por puertas ── */}
      {!isPrueba && <div className="space-y-3">
        {GATE_KEYS.map((gate) => {
          const m = MATERIALES[gate];
          const unlocked = isGateUnlocked(gate);
          const isOpen = open === gate;

          return (
            <div key={gate} className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
              <button
                className="w-full flex items-center gap-4 px-6 py-5 text-left"
                onClick={() => {
                  if (!unlocked) { setUpsellOpen(true); return; }
                  setOpen(isOpen ? null : gate);
                }}
                data-testid={`pdf-gate-${gate.toLowerCase()}`}
              >
                <span className="text-2xl shrink-0">{m.icon}</span>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-[15px] text-[#1D1D1F]">
                    Puerta {gate}
                    <span className="ml-2 text-xs text-[#AEAEB2] font-normal">
                      {m.pdfs.length} {m.pdfs.length === 1 ? "documento" : "documentos"}
                    </span>
                  </p>
                  {!unlocked && (
                    <p className="text-xs text-[#AEAEB2] mt-0.5">Requiere completar la puerta anterior</p>
                  )}
                </div>
                {!unlocked ? (
                  <Lock size={14} className="text-[#AEAEB2] shrink-0" />
                ) : isOpen ? (
                  <ChevronUp size={16} className="text-[#6E6E73] shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-[#6E6E73] shrink-0" />
                )}
              </button>

              {unlocked && isOpen && (
                <div className="border-t border-black/[0.05] px-6 pb-5 pt-4 space-y-3">
                  {m.pdfs.map((pdf, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-4 rounded-[14px] bg-[#F5F5F7] hover:bg-[#EFEFEF] transition-colors"
                      data-testid={`pdf-item-${gate.toLowerCase()}-${idx}`}
                    >
                      <div className="w-9 h-9 rounded-[9px] bg-white flex items-center justify-center shrink-0" style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}>
                        <FileText size={15} className="text-primary" />
                      </div>
                      <p className="flex-1 text-[13px] font-medium text-[#1D1D1F] min-w-0 leading-snug">{pdf.name}</p>
                      <div className="flex items-center gap-2 shrink-0">
                        <a
                          href={pdf.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-1.5 px-2.5 py-2 text-[12px] font-medium rounded-full border border-black/10 text-[#1D1D1F] hover:bg-white transition-colors"
                          data-testid={`button-view-pdf-${idx}`}
                          title="Ver documento"
                        >
                          <ExternalLink size={13} /> <span className="hidden sm:inline">Ver</span>
                        </a>
                        <a
                          href={pdf.url}
                          download
                          className="flex items-center gap-1.5 px-2.5 py-2 text-[12px] font-medium rounded-full bg-[#1D1D1F] text-white hover:bg-black transition-colors"
                          data-testid={`button-download-pdf-${idx}`}
                          title="Descargar"
                        >
                          <Download size={13} /> <span className="hidden sm:inline">Descargar</span>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Puerta Oro — special pack */}
        <div className="bg-white rounded-[20px] overflow-hidden" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
          <div className="px-6 py-5 flex items-center gap-4">
            <span className="text-2xl">✨</span>
            <div className="flex-1">
              <p className="font-medium text-[15px] text-[#1D1D1F]">
                Puerta Oro{" "}
                <span className="ml-2 text-xs text-[#AEAEB2] font-normal">Pack completo · 7 documentos</span>
              </p>
              <p className="text-xs text-[#AEAEB2] mt-0.5">Incluye todos los materiales + PDL Arte y Espiritualidad</p>
            </div>
            <span className="text-xs font-semibold text-primary bg-primary/8 px-3 py-1 rounded-full">€890 pack</span>
          </div>
        </div>
      </div>}

      {!isPrueba && <div className="bg-[#F5F5F7] rounded-[20px] p-6">
        <p className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] mb-2">ℹ️ Acceso progresivo</p>
        <p className="text-[14px] text-[#424245] leading-[1.65]">
          Los materiales de cada puerta se desbloquean cuando comienzas esa puerta. Para acceder a las puertas superiores, debes completar las anteriores.
        </p>
      </div>}

      <UpsellModal open={upsellOpen} onOpenChange={setUpsellOpen} />
    </div>
  );
}
