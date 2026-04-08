import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ACADEMY, COURSES } from "@/config";
import { startCheckout } from "@/lib/checkout";
import { getAuth } from "@/lib/auth";

const C = ACADEMY.colors;
const F = ACADEMY.fonts;

interface Props { courseKey: string }

function Check() {
  return <span style={{ color: C.accent, fontWeight: 700, marginRight: 10 }}>✓</span>;
}

export default function CourseLanding({ courseKey }: Props) {
  const [, go] = useLocation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const auth = getAuth();

  useEffect(() => {
    const timer = setTimeout(() => {
      window.scrollTo({ top: document.body.scrollHeight, behavior: "instant" });
    }, 50);
    return () => clearTimeout(timer);
  }, [courseKey]);

  const course = COURSES.find(c => c.key === courseKey);
  if (!course) return <div style={{ padding: 48, fontFamily: F.body }}>Curso no encontrado.</div>;

  async function handleBuy() {
    if (!auth.isLoggedIn) { go("/login"); return; }
    setLoading(true);
    setError(null);
    try {
      await startCheckout(course!.plan, course!.stripePriceId);
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }

  return (
    <div style={{ fontFamily: F.body, color: C.primary, background: C.background, overflowX: "hidden" }}>

      {/* ── NAV ── */}
      <header style={{ position: "sticky", top: 0, zIndex: 50, background: "rgba(255,255,255,.94)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(0,0,0,0.06)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 32px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 58 }}>
          <button onClick={() => go("/")} style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: C.muted, fontFamily: F.body, display: "flex", alignItems: "center", gap: 6 }}>
            ← {ACADEMY.name}
          </button>
          <div style={{ fontFamily: F.heading, fontSize: 17, color: C.primary }}>{course.title}</div>
          <button
            onClick={handleBuy}
            disabled={loading}
            style={{ padding: "9px 22px", borderRadius: 9999, background: course.color, color: "#fff", border: "none", fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: F.body, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Redirigiendo…" : `Inscribirme — €${course.price}`}
          </button>
        </div>
      </header>

      {/* ── HERO ── */}
      <section style={{ background: course.colorLight, padding: "88px 32px 80px" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", textAlign: "center" }}>
          <span style={{ display: "inline-block", fontSize: 11, letterSpacing: ".16em", textTransform: "uppercase", color: course.color, fontWeight: 700, marginBottom: 24, padding: "6px 18px", background: `${course.color}18`, borderRadius: 9999 }}>
            {course.badge}
          </span>
          <h1 style={{ fontFamily: F.heading, fontSize: "clamp(36px,5.5vw,72px)", fontWeight: 300, lineHeight: 1.08, color: C.primary, marginBottom: 20 }}>
            {course.title}
          </h1>
          <p style={{ fontFamily: F.heading, fontSize: "clamp(18px,2.5vw,26px)", fontWeight: 300, fontStyle: "italic", color: course.color, marginBottom: 28 }}>
            {course.subtitle}
          </p>
          <p style={{ fontSize: "clamp(14px,1.8vw,17px)", color: C.muted, lineHeight: 1.75, maxWidth: 600, margin: "0 auto 48px" }}>
            {course.description}
          </p>

          {/* Meta tags */}
          <div style={{ display: "inline-flex", gap: 32, flexWrap: "wrap", justifyContent: "center", marginBottom: 48 }}>
            {[
              { label: "Duración", value: course.duration },
              { label: "Nivel", value: course.level },
              { label: "Precio", value: `€${course.price}` },
            ].map(m => (
              <div key={m.label} style={{ textAlign: "center" }}>
                <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 4 }}>{m.label}</div>
                <div style={{ fontSize: 18, fontWeight: 700, color: C.primary }}>{m.value}</div>
              </div>
            ))}
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
            <button
              onClick={handleBuy}
              disabled={loading}
              style={{ padding: "15px 40px", borderRadius: 9999, background: course.color, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.body, opacity: loading ? 0.7 : 1 }}>
              {loading ? "Redirigiendo…" : "Inscribirme ahora →"}
            </button>
            <button
              onClick={() => document.getElementById("programa")?.scrollIntoView({ behavior: "smooth" })}
              style={{ padding: "15px 40px", borderRadius: 9999, background: "transparent", color: C.primary, border: `1.5px solid ${C.primary}`, fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.body }}>
              Ver el programa
            </button>
          </div>
          {error && <p style={{ marginTop: 16, fontSize: 13, color: C.error }}>{error}</p>}
        </div>
      </section>

      {/* ── QUÉ INCLUYE ── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: course.color, fontWeight: 700, display: "block", marginBottom: 16 }}>Lo que incluye</span>
            <h2 style={{ fontFamily: F.heading, fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 300, color: C.primary, lineHeight: 1.1, marginBottom: 32 }}>
              Todo lo que necesitas<br /><em style={{ fontStyle: "italic", color: course.color }}>para avanzar de verdad</em>
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {course.includes.map((item, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", fontSize: 15, color: C.primary }}>
                  <Check />{item}
                </div>
              ))}
            </div>
          </div>
          {/* Price card */}
          <div style={{ background: C.light, borderRadius: 24, padding: "40px 36px", textAlign: "center" }}>
            <div style={{ fontSize: 11, color: C.muted, textTransform: "uppercase", letterSpacing: ".1em", marginBottom: 8 }}>{course.priceLabel}</div>
            <div style={{ fontFamily: F.heading, fontSize: 72, fontWeight: 300, color: C.primary, lineHeight: 1 }}>€{course.price}</div>
            <div style={{ fontSize: 13, color: C.muted, marginTop: 8, marginBottom: 32 }}>Acceso inmediato · Sin cuotas</div>
            <button
              onClick={handleBuy}
              disabled={loading}
              style={{ width: "100%", padding: "16px", borderRadius: 9999, background: course.color, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer", fontFamily: F.body, opacity: loading ? 0.7 : 1, marginBottom: 16 }}>
              {loading ? "Redirigiendo…" : "Acceder al curso →"}
            </button>
            <p style={{ fontSize: 11, color: C.muted }}>Garantía de devolución 14 días sin preguntas</p>
          </div>
        </div>
      </section>

      {/* ── PROGRAMA ── */}
      <section id="programa" style={{ padding: "80px 32px", background: C.light }}>
        <div style={{ maxWidth: 760, margin: "0 auto" }}>
          <span style={{ fontSize: 11, letterSpacing: ".14em", textTransform: "uppercase", color: course.color, fontWeight: 700, display: "block", marginBottom: 16 }}>El programa</span>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(26px,3.5vw,44px)", fontWeight: 300, color: C.primary, lineHeight: 1.08, marginBottom: 48 }}>
            Lo que vas a aprender
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {course.modules.map((mod, i) => (
              <div key={i} style={{ background: "#fff", borderRadius: i === 0 ? "16px 16px 4px 4px" : i === course.modules.length - 1 ? "4px 4px 16px 16px" : 4, padding: "28px 32px", display: "flex", gap: 24, alignItems: "flex-start" }}>
                <div style={{ fontFamily: F.heading, fontSize: 32, fontWeight: 300, color: course.color, lineHeight: 1, flexShrink: 0, width: 48 }}>{mod.num}</div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: C.primary, marginBottom: 6 }}>{mod.title}</div>
                  <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7 }}>{mod.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIO ── */}
      <section style={{ padding: "80px 32px", background: course.color }}>
        <div style={{ maxWidth: 680, margin: "0 auto", textAlign: "center" }}>
          <div style={{ fontFamily: F.heading, fontSize: 64, color: "rgba(255,255,255,.4)", lineHeight: 1, marginBottom: 24 }}>"</div>
          <p style={{ fontFamily: F.heading, fontSize: "clamp(18px,2.5vw,28px)", fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.5, marginBottom: 32 }}>
            {course.testimonial.text}
          </p>
          <div style={{ fontSize: 14, fontWeight: 600, color: "rgba(255,255,255,.9)" }}>{course.testimonial.name}</div>
          <div style={{ fontSize: 12, color: "rgba(255,255,255,.6)", marginTop: 4 }}>{course.testimonial.role}</div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section style={{ padding: "80px 32px", background: "#fff" }}>
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(24px,3.5vw,40px)", fontWeight: 300, color: C.primary, marginBottom: 48, textAlign: "center" }}>
            Preguntas <em style={{ fontStyle: "italic", color: course.color }}>frecuentes</em>
          </h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 2, background: C.light, borderRadius: 20, overflow: "hidden" }}>
            {course.faq.map((item, i) => (
              <details key={i} style={{ background: "#fff" }}>
                <summary style={{ padding: "20px 28px", fontSize: 14, fontWeight: 600, cursor: "pointer", listStyle: "none", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  {item.q}
                  <span style={{ fontSize: 20, color: course.color, flexShrink: 0 }}>+</span>
                </summary>
                <p style={{ padding: "0 28px 20px", fontSize: 13, color: C.muted, lineHeight: 1.75 }}>{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA FINAL ── */}
      <section style={{ padding: "80px 32px", background: C.light, textAlign: "center" }}>
        <div style={{ maxWidth: 560, margin: "0 auto" }}>
          <h2 style={{ fontFamily: F.heading, fontSize: "clamp(26px,4vw,48px)", fontWeight: 300, color: C.primary, marginBottom: 24, lineHeight: 1.1 }}>
            ¿Listo para<br /><em style={{ fontStyle: "italic", color: course.color }}>dar el paso?</em>
          </h2>
          <p style={{ fontSize: 14, color: C.muted, marginBottom: 36, lineHeight: 1.7 }}>
            {course.duration} · {course.level} · €{course.price} pago único · Acceso inmediato
          </p>
          <button
            onClick={handleBuy}
            disabled={loading}
            style={{ padding: "16px 48px", borderRadius: 9999, background: course.color, color: "#fff", border: "none", fontSize: 15, fontWeight: 600, cursor: "pointer", fontFamily: F.body, opacity: loading ? 0.7 : 1 }}>
            {loading ? "Redirigiendo…" : "Inscribirme ahora →"}
          </button>
          {error && <p style={{ marginTop: 16, fontSize: 13, color: C.error }}>{error}</p>}
          <p style={{ fontSize: 12, color: C.muted, marginTop: 20 }}>
            ¿Tienes dudas? Escríbenos a{" "}
            <a href={`mailto:${ACADEMY.contactEmail}`} style={{ color: course.color }}>{ACADEMY.contactEmail}</a>
          </p>
        </div>
      </section>

      {/* ── FOOTER mini ── */}
      <footer style={{ padding: "32px", background: C.primary, color: "rgba(255,255,255,.4)", textAlign: "center", fontSize: 12 }}>
        <button onClick={() => go("/")} style={{ background: "none", border: "none", color: "rgba(255,255,255,.5)", cursor: "pointer", fontSize: 13, fontFamily: F.body, marginBottom: 8, display: "block", margin: "0 auto 8px" }}>
          ← Volver a {ACADEMY.name}
        </button>
        © {new Date().getFullYear()} {ACADEMY.name}
      </footer>
    </div>
  );
}
