import { Link } from "wouter";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Lock, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import BlockRenderer from "@/components/BlockRenderer";
import { getContentValue } from "@/lib/content";

function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { threshold: 0.1 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return { ref, inView };
}

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.65, delay, ease: [0.25, 0.1, 0.25, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

const gates = [
  {
    num: "01", name: "Blanca", weeks: "12 semanas", subtitle: "Cimentación",
    desc: "El despertar de la presencia. Aprendes a observar sin identificarte. El primer contacto real contigo mismo.",
    price: "€95/mes", status: "Acceso inmediato", locked: false,
    accent: "#1D1D1F", bg: "#F5F5F7",
    topics: ["El precio oculto de vivir acelerados", "Cuerpo, mente y consciencia", "El entrenamiento como vía de despertar", "Sonido, vibración y armonización"],
  },
  {
    num: "02", name: "Roja", weeks: "12 semanas", subtitle: "Purificación",
    desc: "La alquimia emocional. Transformar el sufrimiento en comprensión. El fuego que purifica sin destruir.",
    price: "€95/mes", status: "Requiere Puerta Blanca", locked: true,
    accent: "#C54B3A", bg: "#FDF5F4",
    topics: ["Los 6 Reinos del Samsara", "El Cuarto Camino", "UCDM — Gestión emocional", "Alquimia de la energía"],
  },
  {
    num: "03", name: "Azul", weeks: "12 semanas", subtitle: "Claridad",
    desc: "La mente como espejo. Entender su naturaleza para dejar de ser su esclavo. Libertad interior real.",
    price: "€95/mes", status: "Requiere Puerta Roja", locked: true,
    accent: "#2D7DD2", bg: "#F4F8FD",
    topics: ["Dzogchen — La mente natural", "La metáfora del espejo", "Protocolos de sonido", "La noche oscura del alma"],
  },
  {
    num: "04", name: "Arcoíris", weeks: "12 semanas", subtitle: "Integración",
    desc: "Cuando lo aprendido se convierte en modo de vida. La síntesis que abre un nuevo ciclo.",
    price: "€95/mes", status: "Requiere Puerta Azul", locked: true,
    accent: "#7B4DAA", bg: "#F9F4FD",
    topics: ["Síntesis del Método TCT", "El campo invisible", "Maestría en la vida cotidiana", "Cierre y continuación del camino"],
  },
];

const oroPackage = {
  name: "Programa Oro — 4 Puertas Completas",
  price: "€890",
  desc: "Acceso simultáneo a todas las puertas. El camino completo de 48 semanas.",
  includes: [
    "Las 4 Puertas + 48 semanas de contenido",
    "Biblioteca multimedia (cuencos, meditaciones)",
    "Manual de Arteterapia TCT",
    "Materiales PDF de cada puerta",
    "Diario digital personal",
    "Comunidad de alumnos",
    "Acceso de por vida",
  ],
};

export default function Metodo() {
  const [, _refresh] = useState(0);
  useEffect(() => {
    const h = () => _refresh(n => n + 1);
    window.addEventListener("fi:content",   h);
    window.addEventListener("fi:published", h);
    window.addEventListener("fi:reset",     h);
    return () => {
      window.removeEventListener("fi:content",   h);
      window.removeEventListener("fi:published", h);
      window.removeEventListener("fi:reset",     h);
    };
  }, []);

  const dynGates = gates.map((g, i) => ({
    ...g,
    subtitle: getContentValue(`met.gate.${i}.subtitle`, g.subtitle),
    desc:     getContentValue(`met.gate.${i}.desc`,     g.desc),
    weeks:    getContentValue(`met.gate.${i}.weeks`,    g.weeks),
    price:    getContentValue(`met.gate.${i}.price`,    g.price),
    topics:   [
      getContentValue(`met.gate.${i}.t0`, g.topics[0]),
      getContentValue(`met.gate.${i}.t1`, g.topics[1]),
      getContentValue(`met.gate.${i}.t2`, g.topics[2]),
      getContentValue(`met.gate.${i}.t3`, g.topics[3]),
    ],
  }));

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F]">
      <Navbar />

      {/* HERO */}
      <section
        id="met-hero"
        data-fi-section="met-hero"
        data-fi-label="Hero"
        className="relative pt-[68px] min-h-[70vh] flex items-center overflow-hidden"
        style={{ background: "linear-gradient(135deg, #FAF8F5 0%, #FFFFFF 60%, #F5F0EB 100%)" }}
      >
        <div className="absolute right-0 top-0 w-1/2 h-full opacity-60"
          style={{ background: "radial-gradient(circle at 80% 40%, rgba(160,132,92,0.10) 0%, transparent 60%)" }}
        />
        <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full py-24 text-center">
          <motion.div initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}>
            <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.12em] uppercase mb-8 bg-primary/[0.08] px-4 py-2 rounded-full">
              <span>✦</span><span data-fi-key="met.hero.badge">{getContentValue("met.hero.badge", "Presencia Aplicada a la Vida Real")}</span>
            </div>
            <h1 className="text-[52px] md:text-[68px] font-serif leading-[1.08] tracking-[-0.02em] mb-6 text-[#1D1D1F]">
              <span data-fi-key="met.hero.title">{getContentValue("met.hero.title", "La Frecuencia que")}</span>{" "}
              <em data-fi-key="met.hero.title2" className="not-italic text-primary">{getContentValue("met.hero.title2", "Transforma")}</em>{" "}
              <span data-fi-key="met.hero.title3">{getContentValue("met.hero.title3", "tu Realidad")}</span>
            </h1>
            <p data-fi-key="met.hero.desc" className="text-[17px] text-[#424245] max-w-2xl mx-auto leading-[1.65] mb-10">
              {getContentValue("met.hero.desc", "El Método TCT es un camino progresivo de cuatro puertas que integra algunas de las tradiciones más profundas de la consciencia con las herramientas de la vida cotidiana. No es teoría. Es presencia real.")}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <a href="#puertas">
                <button className="px-8 py-3.5 bg-[#1D1D1F] text-white rounded-full font-medium text-[15px] hover:bg-black transition-colors inline-flex items-center gap-2">
                  <span data-fi-key="met.hero.cta1">{getContentValue("met.hero.cta1", "Explorar las Puertas")}</span> <ArrowRight size={15} />
                </button>
              </a>
              <a href="#programa-oro">
                <button className="px-8 py-3.5 border border-black/15 rounded-full font-medium text-[15px] text-[#1D1D1F] hover:bg-black/5 transition-colors">
                  <span data-fi-key="met.hero.cta2">{getContentValue("met.hero.cta2", "Conocer el método")}</span>
                </button>
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* GATES */}
      <section id="puertas" data-fi-section="met-puertas" data-fi-label="Las Puertas" className="py-28 px-5 sm:px-8">
        <div className="max-w-7xl mx-auto">
          <FadeIn className="text-center mb-16">
            <p className="text-xs font-semibold tracking-[0.14em] text-primary uppercase mb-4"><span data-fi-key="met.puertas.label">{getContentValue("met.puertas.label", "Las Cuatro Puertas")}</span></p>
            <h2 className="text-[42px] md:text-[50px] font-serif tracking-[-0.02em] text-[#1D1D1F]"><span data-fi-key="met.puertas.title">{getContentValue("met.puertas.title", "Un camino progresivo")}</span></h2>
          </FadeIn>

          <div className="space-y-5">
            {dynGates.map((gate, i) => (
              <FadeIn key={gate.name} delay={i * 0.06}>
                <div
                  data-fi-block={`met-gate-${i}`} data-fi-label={`Puerta ${gate.name}`}
                  className="rounded-[24px] p-8 md:p-10"
                  style={{ background: gate.bg, boxShadow: "0 1px 4px rgba(0,0,0,0.05)" }}
                  data-testid={`gate-${gate.name.toLowerCase()}`}
                >
                  <div className="flex flex-col md:flex-row md:items-start gap-8">
                    {/* Left */}
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-4">
                        <span className="text-[12px] font-mono text-[#AEAEB2]">{gate.num}</span>
                        <span
                          className="text-[13px] font-semibold px-3 py-1 rounded-full"
                          style={{ background: `${gate.accent}15`, color: gate.accent }}
                        >
                          Puerta {gate.name}
                        </span>
                        {gate.locked && (
                          <span className="flex items-center gap-1 text-[12px] text-[#AEAEB2]">
                            <Lock size={11} /> {gate.status}
                          </span>
                        )}
                      </div>

                      <h3 data-fi-key={`met.gate.${i}.subtitle`} className="text-[28px] md:text-[32px] font-serif tracking-[-0.02em] text-[#1D1D1F] mb-2">
                        {gate.subtitle}
                      </h3>
                      <p data-fi-key={`met.gate.${i}.desc`} className="text-[#424245] text-[16px] leading-[1.65] mb-6 max-w-lg">{gate.desc}</p>

                      <div className="grid sm:grid-cols-2 gap-2">
                        {gate.topics.map((t, ti) => (
                          <div key={ti} className="flex items-center gap-2 text-[13px] text-[#6E6E73]">
                            <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
                            <span data-fi-key={`met.gate.${i}.t${ti}`}>{t}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right */}
                    <div className="md:w-56 md:text-right shrink-0">
                      <div data-fi-key={`met.gate.${i}.weeks`} className="text-[13px] text-[#6E6E73] mb-1">{gate.weeks}</div>
                      <div data-fi-key={`met.gate.${i}.price`} className="text-[32px] font-serif" style={{ color: gate.accent }}>{gate.price}</div>
                      <div className="text-[12px] text-[#AEAEB2] mt-1 mb-5">al mes</div>
                      {!gate.locked ? (
                        <Link href="/login">
                          <button
                            className="px-6 py-2.5 rounded-full text-[13px] font-semibold text-white transition-colors"
                            style={{ background: gate.accent }}
                            data-testid={`button-gate-${gate.name.toLowerCase()}`}
                          >
                            Empezar ahora
                          </button>
                        </Link>
                      ) : (
                        <button
                          disabled
                          className="px-6 py-2.5 rounded-full text-[13px] font-medium text-[#AEAEB2] bg-white border border-black/10 cursor-not-allowed"
                          data-testid={`button-gate-locked-${gate.name.toLowerCase()}`}
                        >
                          Bloqueado
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* PROGRAMA ORO */}
      <section id="programa-oro" data-fi-section="met-programa" data-fi-label="Programa Oro" className="py-28 px-5 sm:px-8 bg-[#F5F5F7]">
        <div className="max-w-3xl mx-auto">
          <FadeIn>
            <div
              data-fi-block="met-oro" data-fi-label="Programa Oro"
              className="bg-white rounded-[28px] p-10 md:p-14"
              style={{ boxShadow: "0 8px 40px rgba(0,0,0,0.08), 0 2px 8px rgba(0,0,0,0.04)" }}
              data-testid="programa-oro"
            >
              <div className="inline-flex items-center gap-2 text-primary text-xs font-semibold tracking-[0.12em] uppercase mb-6 bg-primary/[0.08] px-4 py-2 rounded-full">
                <span>✦</span><span>Programa Completo</span>
              </div>

              <h2 data-fi-key="met.oro.name" className="text-[32px] md:text-[38px] font-serif tracking-[-0.02em] text-[#1D1D1F] mb-3">
                {getContentValue("met.oro.name", oroPackage.name)}
              </h2>
              <p data-fi-key="met.oro.desc" className="text-[16px] text-[#6E6E73] leading-[1.65] mb-8">{getContentValue("met.oro.desc", oroPackage.desc)}</p>

              <ul className="space-y-3 mb-10">
                {oroPackage.includes.map((item) => (
                  <li key={item} className="flex items-center gap-3 text-[15px] text-[#1D1D1F]">
                    <span className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                      <span className="text-primary text-[10px]">✓</span>
                    </span>
                    {item}
                  </li>
                ))}
              </ul>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div>
                  <div data-fi-key="met.oro.price" className="text-[48px] font-serif text-primary leading-none">{getContentValue("met.oro.price", oroPackage.price)}</div>
                  <div className="text-[13px] text-[#6E6E73] mt-1">Pago único · Acceso de por vida</div>
                </div>
                <Link href="/login">
                  <button
                    className="px-8 py-3.5 bg-[#1D1D1F] text-white rounded-full font-medium text-[15px] hover:bg-black transition-colors inline-flex items-center gap-2"
                    data-testid="button-oro"
                  >
                    Acceder al programa completo <ArrowRight size={15} />
                  </button>
                </Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      <div style={{ maxWidth: 920, margin: "0 auto", padding: "0 24px" }}>
        <BlockRenderer zone="metodo-tct" />
      </div>

      <Footer />
    </div>
  );
}
