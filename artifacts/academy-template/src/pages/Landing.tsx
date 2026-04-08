import { useState } from "react";
import { useLocation } from "wouter";
import { ACADEMY, LEVELS, FULL_ACCESS, LANDING_COPY, COURSES, COURSES_SECTION } from "@/config";
import { startCheckout } from "@/lib/checkout";
import { getAuth } from "@/lib/auth";

const C = ACADEMY.colors;
const F = ACADEMY.fonts;

function Btn({ children, onClick, variant = "dark", disabled }: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "dark" | "accent" | "outline";
  disabled?: boolean;
}) {
  const bg = variant === "dark" ? C.primary : variant === "accent" ? C.accent : "transparent";
  const color = variant === "outline" ? C.primary : "#fff";
  const border = variant === "outline" ? `1.5px solid ${C.primary}` : "none";
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{ padding: "13px 32px", borderRadius: 9999, background: bg, color, border, fontSize: 13, fontWeight: 600, cursor: disabled ? "default" : "pointer", fontFamily: F.body, opacity: disabled ? 0.7 : 1, letterSpacing: ".03em", whiteSpace: "nowrap" }}>
      {children}
    </button>
  );
}

export default function Landing() {
  const [, go] = useLocation();
  const [loadingPlan, setLoadingPlan] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);
  const auth = getAuth();

  async function handleBuy(planKey: string, priceId: string) {
    if (!auth.isLoggedIn) { go("/login"); return; }
    setLoadingPlan(planKey);
    setCheckoutError(null);
    try {
      await startCheckout(planKey, priceId);
    } catch (err: any) {
      setCheckoutError(err.message);
      setLoadingPlan(null);
    }
  }

  return (
    <div style={{ fontFamily: F.body, color: C.primary, background: C.background, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.92)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 60 }}>
          <div style={{ fontFamily: F.heading, fontSize: 22, fontWeight: 400, color: C.primary }}>{ACADEMY.name}</div>
          <nav style={{ display: "flex", gap: 32, fontSize: 13, color: C.muted }}>
            <a href="#metodo" style={{ textDecoration: "none", color: "inherit" }}>El Método</a>
            <a href="#niveles" style={{ textDecoration: "none", color: "inherit" }}>Niveles</a>
            <a href="#faq" style={{ textDecoration: "none", color: "inherit" }}>FAQ</a>
          </nav>
          <div style={{ display: "flex", gap: 12 }}>
            {auth.isLoggedIn
              ? <Btn onClick={() => go("/area")}>Mi área →</Btn>
              : <>
                  <Btn variant="outline" onClick={() => go("/login")}>Acceder</Btn>
                  <Btn onClick={() => document.getElementById("niveles")?.scrollIntoView({ behavior: "smooth" })}>Empezar</Btn>
                </>
            }
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ padding: "120px 32px 96px", textAlign: "center", background: `linear-gradient(180deg, ${C.light} 0%, ${C.background} 100%)` }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <span style={{ display: "inline-block", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: C.accent, fontWeight: 700, marginBottom: 28, padding: "6px 18px", background: `${C.accent}12`, borderRadius: 9999 }}>
            {LANDING_COPY.hero.badge}
          </span>
          <h1 style={{ fontFamily: F.heading, fontSize: "clamp(48px,6vw,88px)", fontWeight: 300, lineHeight: 1.05, marginBottom: 28, color: C.primary }}>
            {LANDING_COPY.hero.headline}<br />
            <em style={{ fontStyle: "italic", color: C.accent }}>{LANDING_COPY.hero.headlineItalic}</em>
          </h1>
          <p style={{ fontSize: "clamp(15px,2vw,19px)", color: C.muted, lineHeight: 1.75, maxWidth: 580, margin: "0 auto 48px" }}>
            {LANDING_COPY.hero.subheadline}
          </p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <Btn onClick={() => document.getElementById("niveles")?.scrollIntoView({ behavior: "smooth" })}>{LANDING_COPY.hero.ctaPrimary} →</Btn>
            <Btn variant="outline" onClick={() => document.getElementById("metodo")?.scrollIntoView({ behavior: "smooth" })}>{LANDING_COPY.hero.ctaSecondary}</Btn>
          </div>
        </div>
      </section>

      {/* ── MÉTODO ── */}
      <section id="metodo" style={{ padding: "96px 32px", background: C.primary }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 640, marginBottom: 72 }}>
            <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.accentLight, fontWeight: 700, display: "block", marginBottom: 16 }}>{LANDING_COPY.method.label}</span>
            <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
              {LANDING_COPY.method.title}
            </h2>
            <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.8 }}>{LANDING_COPY.method.description}</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 2, background: "rgba(255,255,255,.08)", borderRadius: 20, overflow: "hidden" }}>
            {LANDING_COPY.pillars.map(p => (
              <div key={p.num} style={{ background: C.primary, padding: "36px 28px" }}>
                <div style={{ fontFamily: F.heading, fontSize: 48, fontWeight: 300, color: C.accentLight, lineHeight: 1, marginBottom: 16 }}>{p.num}</div>
                <div style={{ fontSize: 16, fontWeight: 600, color: "#fff", marginBottom: 12 }}>{p.title}</div>
                <p style={{ fontSize: 13, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── NIVELES ── */}
      <section id="niveles" style={{ padding: "96px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <div style={{ maxWidth: 600, marginBottom: 64 }}>
            <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.accent, fontWeight: 700, display: "block", marginBottom: 14 }}>{LANDING_COPY.levels.label}</span>
            <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: C.primary, lineHeight: 1.08, marginBottom: 16 }}>
              {LANDING_COPY.levels.title}
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{LANDING_COPY.levels.description}</p>
          </div>

          {checkoutError && (
            <div style={{ background: "#FFF0EE", border: `1px solid ${C.error}40`, borderRadius: 12, padding: "12px 20px", fontSize: 13, color: C.error, marginBottom: 32 }}>{checkoutError}</div>
          )}

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 2, background: "#f0f0f0", borderRadius: 20, overflow: "hidden" }}>
            {LEVELS.map(lv => (
              <div key={lv.key} style={{ background: "#fff", padding: "32px 28px 36px", opacity: lv.open ? 1 : 0.65 }}>
                <div style={{ height: 3, background: lv.open ? lv.color : "#E5E5EA", borderRadius: 9999, marginBottom: 28 }} />
                <div style={{ fontSize: 10, letterSpacing: ".14em", textTransform: "uppercase", color: C.muted, fontWeight: 700, marginBottom: 6 }}>Nivel {lv.num}</div>
                <div style={{ fontFamily: F.heading, fontSize: 28, fontWeight: 300, color: lv.open ? lv.color : C.primary, lineHeight: 1, marginBottom: 4 }}>{lv.title}</div>
                <div style={{ fontSize: 11, color: C.muted, marginBottom: 20 }}>{lv.subtitle} · {lv.weeks}</div>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, marginBottom: 28, minHeight: 72 }}>{lv.description}</p>
                <div style={{ borderTop: "1px solid #f0f0f0", paddingTop: 20 }}>
                  <div style={{ fontFamily: F.heading, fontSize: 34, fontWeight: 300, lineHeight: 1 }}>€{lv.price}<span style={{ fontSize: 13, color: C.muted, fontWeight: 400 }}>/mes</span></div>
                  <p style={{ fontSize: 11, color: "#AEAEB2", margin: "4px 0 20px" }}>{lv.billingLabel}</p>
                  <button
                    onClick={lv.open ? () => handleBuy(lv.key, lv.stripePriceId) : undefined}
                    disabled={lv.open && loadingPlan === lv.key}
                    style={{ width: "100%", padding: "11px 0", borderRadius: 9999, border: lv.open ? "none" : "1px solid #E5E5EA", fontSize: 12, fontWeight: 600, cursor: lv.open ? "pointer" : "default", background: lv.open ? C.primary : "transparent", color: lv.open ? "#fff" : "#AEAEB2", letterSpacing: ".06em", opacity: loadingPlan === lv.key ? 0.7 : 1 }}>
                    {lv.open ? (loadingPlan === lv.key ? "Redirigiendo…" : "Acceder ahora →") : "🔒 Bloqueado"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ACCESO COMPLETO ── */}
      {FULL_ACCESS.enabled && (
        <section style={{ padding: "80px 32px", background: C.light }}>
          <div style={{ maxWidth: 960, margin: "0 auto", background: `linear-gradient(135deg, ${C.primary} 0%, #2d2d30 100%)`, borderRadius: 24, padding: "56px 64px", display: "flex", flexWrap: "wrap", gap: 40, alignItems: "center", justifyContent: "space-between" }}>
            <div style={{ flex: 1, minWidth: 280, position: "relative", zIndex: 1 }}>
              <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.accentLight, fontWeight: 700, display: "block", marginBottom: 16 }}>{LANDING_COPY.fullAccess.label}</span>
              <h2 style={{ fontFamily: F.heading, fontSize: "clamp(24px,3.5vw,42px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 16 }}>{LANDING_COPY.fullAccess.title}</h2>
              <p style={{ fontSize: 14, color: "rgba(255,255,255,.6)", lineHeight: 1.7, maxWidth: 400 }}>{LANDING_COPY.fullAccess.description}</p>
            </div>
            <div style={{ textAlign: "center", flexShrink: 0 }}>
              <div style={{ fontFamily: F.heading, fontSize: 64, fontWeight: 300, color: "#fff", lineHeight: 1 }}>€{FULL_ACCESS.price}</div>
              <p style={{ fontSize: 11, color: "rgba(255,255,255,.5)", letterSpacing: ".08em", marginBottom: 24, marginTop: 6 }}>{FULL_ACCESS.billingLabel}</p>
              <Btn onClick={() => handleBuy(FULL_ACCESS.plan, FULL_ACCESS.stripePriceId)} disabled={loadingPlan === FULL_ACCESS.plan}>
                {loadingPlan === FULL_ACCESS.plan ? "Redirigiendo…" : "Acceso Completo →"}
              </Btn>
            </div>
          </div>
        </section>
      )}

      {/* ── CURSOS INDIVIDUALES ── */}
      <section style={{ padding: "96px 32px", background: C.light }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <div style={{ maxWidth: 580, marginBottom: 64 }}>
            <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: C.accent, fontWeight: 700, display: "block", marginBottom: 14 }}>{COURSES_SECTION.label}</span>
            <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: C.primary, lineHeight: 1.08, marginBottom: 16 }}>
              {COURSES_SECTION.title}
            </h2>
            <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.75 }}>{COURSES_SECTION.description}</p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(340px, 1fr))", gap: 24 }}>
            {COURSES.map(course => (
              <div key={course.key} style={{ background: "#fff", borderRadius: 24, overflow: "hidden", border: "1px solid rgba(0,0,0,0.06)", display: "flex", flexDirection: "column" }}>
                {/* Color band */}
                <div style={{ height: 6, background: course.color }} />
                <div style={{ padding: "36px 36px 32px", flex: 1, display: "flex", flexDirection: "column" }}>
                  <span style={{ fontSize: 10, letterSpacing: ".16em", textTransform: "uppercase", color: course.color, fontWeight: 700, marginBottom: 14, display: "block" }}>{course.badge}</span>
                  <h3 style={{ fontFamily: F.heading, fontSize: 28, fontWeight: 300, color: C.primary, lineHeight: 1.1, marginBottom: 8 }}>{course.title}</h3>
                  <p style={{ fontSize: 13, fontStyle: "italic", color: course.color, marginBottom: 20 }}>{course.subtitle}</p>
                  <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.75, flex: 1, marginBottom: 28 }}>{course.description}</p>

                  {/* Meta */}
                  <div style={{ display: "flex", gap: 24, marginBottom: 28, paddingBottom: 24, borderBottom: "1px solid #f0f0f0" }}>
                    {[{ label: "Duración", v: course.duration }, { label: "Nivel", v: course.level }].map(m => (
                      <div key={m.label}>
                        <div style={{ fontSize: 10, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 3 }}>{m.label}</div>
                        <div style={{ fontSize: 14, fontWeight: 600, color: C.primary }}>{m.v}</div>
                      </div>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
                    <div>
                      <div style={{ fontFamily: F.heading, fontSize: 38, fontWeight: 300, color: C.primary, lineHeight: 1 }}>€{course.price}</div>
                      <div style={{ fontSize: 11, color: C.muted }}>{course.priceLabel}</div>
                    </div>
                    <button
                      onClick={() => go(course.slug)}
                      style={{ padding: "12px 26px", borderRadius: 9999, background: course.color, color: "#fff", border: "none", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: F.body, whiteSpace: "nowrap" }}>
                      Ver el curso →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIOS ── */}
      <section style={{ padding: "96px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: C.primary, marginBottom: 64, textAlign: "center" }}>Lo que dicen los <em style={{ fontStyle: "italic", color: C.accent }}>alumnos</em></h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 24 }}>
            {LANDING_COPY.testimonials.map((t, i) => (
              <div key={i} style={{ background: C.light, borderRadius: 20, padding: "32px 28px" }}>
                <div style={{ fontSize: 32, color: C.accentLight, marginBottom: 16, fontFamily: F.heading, lineHeight: 1 }}>"</div>
                <p style={{ fontSize: 14, color: C.primary, lineHeight: 1.75, marginBottom: 24 }}>{t.text}</p>
                <div style={{ fontSize: 13, fontWeight: 600, color: C.primary }}>{t.name}</div>
                <div style={{ fontSize: 11, color: C.muted }}>{t.role}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section id="faq" style={{ padding: "96px 32px", background: C.light }}>
        <div style={{ maxWidth: 720, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,48px)", fontWeight: 300, color: C.primary, marginBottom: 64, textAlign: "center" }}>
            Preguntas <em style={{ fontStyle: "italic", color: C.accent }}>frecuentes</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: "#E5E5EA", borderRadius: 20, overflow: "hidden" }}>
            {LANDING_COPY.faq.map((item, i) => (
              <details key={i} style={{ background: "#fff" }}>
                <summary style={{ padding: "22px 28px", fontSize: 15, fontWeight: 600, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ fontSize: 20, color: C.accent, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ padding: "0 28px 22px", fontSize: 14, color: C.muted, lineHeight: 1.75 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "96px 32px", background: C.primary, textAlign: "center" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(28px,4vw,52px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>
            El momento de empezar<br /><em style={{ fontStyle: "italic", color: C.accentLight }}>es ahora.</em>
          </h2>
          <p style={{ fontSize: 15, color: "rgba(255,255,255,.6)", lineHeight: 1.75, marginBottom: 40 }}>
            Únete a los alumnos que ya están en camino. El primer nivel está abierto y disponible hoy.
          </p>
          <Btn variant="accent" onClick={() => document.getElementById("niveles")?.scrollIntoView({ behavior: "smooth" })}>
            Acceder ahora →
          </Btn>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: "40px 32px", background: "#000", color: "rgba(255,255,255,.4)", textAlign: "center", fontSize: 13 }}>
        <div style={{ fontFamily: F.heading, fontSize: 18, color: "rgba(255,255,255,.7)", marginBottom: 8 }}>{ACADEMY.name}</div>
        <p>{ACADEMY.contactEmail}</p>
        <p style={{ marginTop: 16 }}>© {new Date().getFullYear()} {ACADEMY.name}. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
