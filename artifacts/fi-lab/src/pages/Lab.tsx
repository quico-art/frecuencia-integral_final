import { useRef, useEffect, useState, Suspense, Component, ErrorInfo, ReactNode } from "react";
import { motion, useScroll, useTransform, useInView, useMotionValue, useSpring } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial, Float, Stars, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { useLocation } from "wouter";

// ─── WebGL Error Boundary ───────────────────────────────────────────────────
class WebGLBoundary extends Component<{ children: ReactNode; fallback: ReactNode }, { error: boolean }> {
  state = { error: false };
  static getDerivedStateFromError() { return { error: true }; }
  componentDidCatch(_: Error, __: ErrorInfo) {}
  render() { return this.state.error ? this.props.fallback : this.props.children; }
}

// ─── Design tokens ─────────────────────────────────────────────────────────
const S = {
  bg: "#030306",
  bgLight: "#0d0d14",
  gold: "#BC9640",
  goldL: "#D4AA5A",
  teal: "#2b7d7a",
  tealL: "#4aaaa6",
  white: "#F5F5F7",
  muted: "rgba(255,255,255,.45)",
  serif: "Playfair Display, Georgia, serif",
};

// ─── 1. ANIMACIONES — Framer Motion ────────────────────────────────────────
const ANIM_CARDS = [
  { icon: "🌊", title: "Scroll Reveal", desc: "Elementos que aparecen con física natural al hacer scroll." },
  { icon: "✦", title: "Stagger Cascade", desc: "Tarjetas que entran en cascada con retardo escalonado." },
  { icon: "🎯", title: "Parallax", desc: "Capas a diferente velocidad — profundidad visual real." },
  { icon: "🔄", title: "Hover Physics", desc: "Interacciones con inercia y rebote al pasar el ratón." },
  { icon: "📐", title: "Transiciones", desc: "Cambios de página suaves tipo Apple — sin saltos." },
  { icon: "🌀", title: "Morphing", desc: "Formas que se transforman con animación fluida." },
];

function AnimCard({ card, i }: { card: typeof ANIM_CARDS[0], i: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        background: hovered ? "rgba(188,150,64,.08)" : "rgba(255,255,255,.04)",
        border: `1px solid ${hovered ? "rgba(188,150,64,.3)" : "rgba(255,255,255,.08)"}`,
        borderRadius: 20,
        padding: "24px 22px",
        cursor: "default",
        transition: "background .2s, border-color .2s",
      }}
    >
      <div style={{ fontSize: 28, marginBottom: 12 }}>{card.icon}</div>
      <div style={{ fontFamily: S.serif, fontSize: 16, color: S.white, marginBottom: 8 }}>{card.title}</div>
      <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.5 }}>{card.desc}</div>
    </motion.div>
  );
}

function AnimacionesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);
  return (
    <section ref={ref} style={{ padding: "100px 0", position: "relative", overflow: "hidden" }}>
      <motion.div style={{ y, position: "absolute", inset: 0, background: "radial-gradient(ellipse 60% 50% at 80% 50%, rgba(43,125,122,.12), transparent)", pointerEvents: "none" }} />
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <SectionLabel color={S.teal}>01 — Animaciones fluidas</SectionLabel>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", color: S.white, marginBottom: 16 }}>
          Movimiento con <em style={{ color: S.tealL }}>física real</em>
        </h2>
        <p style={{ color: S.muted, fontSize: 15, maxWidth: 560, lineHeight: 1.7, marginBottom: 56 }}>
          Framer Motion — scroll reveals, stagger en cascada, parallax, hover con inercia y transiciones de página tipo Apple.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px,1fr))", gap: 16 }}>
          {ANIM_CARDS.map((c, i) => <AnimCard key={c.title} card={c} i={i} />)}
        </div>
        {/* Live parallax strip */}
        <motion.div style={{ y: useTransform(scrollYProgress, [0, 1], [-30, 30]), marginTop: 48, display: "flex", gap: 16, overflow: "hidden" }}>
          {["Scroll", "·", "Reveal", "·", "Parallax", "·", "Physics", "·", "Stagger", "·", "Motion"].map((t, i) => (
            <span key={i} style={{ fontFamily: S.serif, fontSize: 22, color: i % 2 === 0 ? S.goldL : S.muted, whiteSpace: "nowrap" }}>{t}</span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 2. COMPONENTES 3D — React Three Fiber ─────────────────────────────────
function MandalaOrb() {
  const meshRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Mesh>(null);
  useFrame(({ clock }) => {
    if (!meshRef.current || !ringRef.current) return;
    meshRef.current.rotation.x = clock.elapsedTime * 0.2;
    meshRef.current.rotation.y = clock.elapsedTime * 0.3;
    ringRef.current.rotation.z = clock.elapsedTime * 0.15;
    ringRef.current.rotation.x = 0.6 + Math.sin(clock.elapsedTime * 0.5) * 0.1;
  });
  return (
    <Float speed={1.4} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef}>
        <Sphere args={[1.4, 128, 128]}>
          <MeshDistortMaterial
            color="#2b7d7a"
            emissive="#1a4f4d"
            emissiveIntensity={0.4}
            distort={0.35}
            speed={1.8}
            roughness={0.1}
            metalness={0.7}
          />
        </Sphere>
      </mesh>
      <mesh ref={ringRef}>
        <torusGeometry args={[2.2, 0.04, 16, 120]} />
        <meshStandardMaterial color="#BC9640" emissive="#BC9640" emissiveIntensity={0.6} />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[2.8, 0.025, 16, 120]} />
        <meshStandardMaterial color="#D4AA5A" emissive="#D4AA5A" emissiveIntensity={0.3} transparent opacity={0.5} />
      </mesh>
    </Float>
  );
}

function ParticleField() {
  const points = useRef<THREE.Points>(null);
  const count = 2000;
  const positions = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 20;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 20;
  }
  useFrame(({ clock }) => {
    if (points.current) points.current.rotation.y = clock.elapsedTime * 0.04;
  });
  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.035} color="#D4AA5A" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
}

function Tres3DSection() {
  return (
    <section style={{ padding: "100px 0", background: S.bgLight }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <SectionLabel color={S.gold}>02 — Componentes 3D</SectionLabel>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", color: S.white, marginBottom: 16 }}>
          Three.js <em style={{ color: S.goldL }}>en tu web</em>
        </h2>
        <p style={{ color: S.muted, fontSize: 15, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
          Esferas distorsionadas, mandalas 3D, campos de partículas, geometría generativa — todo dentro del browser, reactivo al scroll y al ratón.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, alignItems: "center" }}>
          <div style={{ height: 420, borderRadius: 24, overflow: "hidden", background: "#070710" }}>
            <WebGLBoundary fallback={
              <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", background: "radial-gradient(ellipse at 50% 40%, rgba(43,125,122,.25), rgba(188,150,64,.1) 50%, transparent)", position: "relative" }}>
                {/* CSS mandala fallback */}
                {[220, 170, 120, 70].map((size, i) => (
                  <div key={i} style={{ position: "absolute", width: size, height: size, borderRadius: "50%", border: `1px solid ${i % 2 === 0 ? "rgba(188,150,64,.4)" : "rgba(43,125,122,.4)"}`, animation: `spin${i % 2 === 0 ? "" : "Rev"} ${6 + i * 2}s linear infinite` }} />
                ))}
                <div style={{ width: 60, height: 60, borderRadius: "50%", background: "radial-gradient(circle, #2b7d7a, #1a4f4d)", boxShadow: "0 0 40px rgba(43,125,122,.6)" }} />
                <div style={{ position: "absolute", bottom: 20, fontSize: 11, color: "rgba(255,255,255,.4)", letterSpacing: ".08em" }}>Vista 3D activa en tu navegador</div>
                <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} } @keyframes spinRev { from{transform:rotate(0deg)} to{transform:rotate(-360deg)} }`}</style>
              </div>
            }>
              <Canvas camera={{ position: [0, 0, 5.5], fov: 50 }}>
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={1.2} color="#D4AA5A" />
                <pointLight position={[-5, -3, -5]} intensity={0.6} color="#2b7d7a" />
                <Suspense fallback={null}>
                  <MandalaOrb />
                  <ParticleField />
                  <Stars radius={30} depth={50} count={3000} factor={2} saturation={0} fade speed={0.5} />
                </Suspense>
                <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.4} />
              </Canvas>
            </WebGLBoundary>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {[
              { t: "Mandala orbital", d: "Esfera distorsionada con anillos áureos en órbita. Se puede colocar en el hero de la Academia.", icon: "🔮" },
              { t: "Campo de partículas", d: "2000 puntos flotantes que rotan lentamente. Perfecto como fondo de sección oscura.", icon: "✨" },
              { t: "Geometría generativa", d: "Formas que mutan con el tiempo. Reactivas al scroll y al movimiento del ratón.", icon: "🌀" },
              { t: "Control de órbita", d: "El usuario puede girar el objeto con el ratón. Drag interactivo 360°.", icon: "🖱️" },
            ].map(item => (
              <div key={item.t} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontSize: 24, flexShrink: 0, marginTop: 2 }}>{item.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600, color: S.white, marginBottom: 4 }}>{item.t}</div>
                  <div style={{ fontSize: 13, color: S.muted, lineHeight: 1.5 }}>{item.d}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── 3. GALERÍAS AVANZADAS ─────────────────────────────────────────────────
const GALLERY_ITEMS = [
  { id: 1, title: "Cuencos Tibetanos", cat: "Sonido", col: "#2b7d7a", rows: 2 },
  { id: 2, title: "Meditación Guiada", cat: "Presencia", col: "#BC9640", rows: 1 },
  { id: 3, title: "Arteterapia", cat: "Creación", col: "#7a4a8a", rows: 1 },
  { id: 4, title: "Trabajo Corporal", cat: "Movimiento", col: "#2b7d7a", rows: 1 },
  { id: 5, title: "Proceso Interior", cat: "Integración", col: "#BC9640", rows: 2 },
  { id: 6, title: "Frecuencias", cat: "Vibración", col: "#4a7a5a", rows: 1 },
];

function GalleryCard({ item }: { item: typeof GALLERY_ITEMS[0] }) {
  const [hov, setHov] = useState(false);
  const [open, setOpen] = useState(false);
  return (
    <>
      <motion.div
        whileHover={{ scale: 1.02 }}
        onHoverStart={() => setHov(true)}
        onHoverEnd={() => setHov(false)}
        onClick={() => setOpen(true)}
        style={{
          gridRow: `span ${item.rows}`,
          borderRadius: 20,
          overflow: "hidden",
          cursor: "pointer",
          position: "relative",
          background: `linear-gradient(135deg, ${item.col}40, ${item.col}15)`,
          border: `1px solid ${item.col}30`,
          minHeight: item.rows === 2 ? 280 : 130,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding: 20,
        }}
      >
        {/* Pattern overlay */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: `radial-gradient(circle at 30% 30%, ${item.col}20, transparent 60%)`, opacity: hov ? 1 : 0.5, transition: "opacity .3s" }} />
        <motion.div animate={{ opacity: hov ? 1 : 0, y: hov ? 0 : 8 }} transition={{ duration: 0.2 }}
          style={{ fontSize: 11, color: item.col, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 4, fontWeight: 700 }}>
          {item.cat}
        </motion.div>
        <div style={{ fontFamily: S.serif, fontSize: item.rows === 2 ? 20 : 16, color: S.white }}>{item.title}</div>
        <motion.div animate={{ opacity: hov ? 1 : 0 }} style={{ fontSize: 12, color: "rgba(255,255,255,.5)", marginTop: 4 }}>
          Click para ampliar →
        </motion.div>
      </motion.div>
      {open && (
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={() => setOpen(false)}
          style={{ position: "fixed", inset: 0, zIndex: 9999, background: "rgba(0,0,0,.88)", backdropFilter: "blur(20px)", display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <motion.div initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 300, damping: 25 }}
            style={{ background: `linear-gradient(135deg, ${item.col}30, #0d0d1490)`, border: `1px solid ${item.col}40`, borderRadius: 28, padding: "60px 48px", textAlign: "center", maxWidth: 500 }}>
            <div style={{ fontFamily: S.serif, fontSize: 32, color: S.white, marginBottom: 12 }}>{item.title}</div>
            <div style={{ fontSize: 13, color: item.col, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 20 }}>{item.cat}</div>
            <div style={{ fontSize: 14, color: S.muted, lineHeight: 1.7 }}>
              Lightbox fluido con blur de fondo, animación spring y cierre al click. Funciona con fotos, vídeos y contenido custom.
            </div>
            <div style={{ marginTop: 28, fontSize: 12, color: "rgba(255,255,255,.3)" }}>Click para cerrar</div>
          </motion.div>
        </motion.div>
      )}
    </>
  );
}

function GaleriasSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  return (
    <section ref={ref} style={{ padding: "100px 0" }}>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <SectionLabel color={S.tealL}>03 — Galerías avanzadas</SectionLabel>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", color: S.white, marginBottom: 16 }}>
          Galería masonry con <em style={{ color: S.tealL }}>lightbox</em>
        </h2>
        <p style={{ color: S.muted, fontSize: 15, maxWidth: 560, lineHeight: 1.7, marginBottom: 48 }}>
          Grid de altura variable con hover reveal, lightbox con blur y animación spring. Toca cualquier card para verlo.
        </p>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridAutoRows: "130px", gap: 14 }}
        >
          {GALLERY_ITEMS.map(item => <GalleryCard key={item.id} item={item} />)}
        </motion.div>
      </div>
    </section>
  );
}

// ─── 4. COMPONENTES DE NIVEL SUPERIOR ──────────────────────────────────────
function AnimCounter({ from, to, suffix = "" }: { from: number, to: number, suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true });
  const count = useMotionValue(from);
  const rounded = useSpring(count, { stiffness: 60, damping: 15 });
  useEffect(() => {
    if (isInView) count.set(to);
  }, [isInView, count, to]);
  useEffect(() => {
    return rounded.on("change", v => {
      if (ref.current) ref.current.textContent = Math.round(v) + suffix;
    });
  }, [rounded, suffix]);
  return <span ref={ref}>{from}{suffix}</span>;
}

function GlassCard({ icon, title, value, suffix, sub, color }: { icon: string, title: string, value: number, suffix: string, sub: string, color: string }) {
  const [hov, setHov] = useState(false);
  return (
    <motion.div
      whileHover={{ y: -8, rotateX: 4, rotateY: -4 }}
      onHoverStart={() => setHov(true)}
      onHoverEnd={() => setHov(false)}
      style={{
        background: hov ? `rgba(255,255,255,.07)` : "rgba(255,255,255,.03)",
        backdropFilter: "blur(20px)",
        border: `1px solid ${hov ? color + "60" : "rgba(255,255,255,.08)"}`,
        borderRadius: 24,
        padding: "32px 28px",
        textAlign: "center",
        boxShadow: hov ? `0 24px 60px ${color}25, inset 0 1px 0 rgba(255,255,255,.1)` : "none",
        transition: "background .2s, border-color .2s, box-shadow .3s",
        transformStyle: "preserve-3d",
        cursor: "default",
      }}
    >
      <div style={{ fontSize: 32, marginBottom: 16 }}>{icon}</div>
      <div style={{ fontFamily: S.serif, fontSize: 42, color, fontWeight: 700, lineHeight: 1 }}>
        <AnimCounter from={0} to={value} suffix={suffix} />
      </div>
      <div style={{ fontSize: 14, color: S.white, fontWeight: 600, marginTop: 8 }}>{title}</div>
      <div style={{ fontSize: 12, color: S.muted, marginTop: 4 }}>{sub}</div>
    </motion.div>
  );
}

function GradientText({ text }: { text: string }) {
  return (
    <span style={{
      background: `linear-gradient(135deg, ${S.goldL}, ${S.tealL}, ${S.goldL})`,
      backgroundSize: "200% 200%",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent",
      backgroundClip: "text",
      animation: "gradientShift 4s ease infinite",
    }}>
      {text}
    </span>
  );
}

function ComponentesSection() {
  return (
    <section style={{ padding: "100px 0", background: S.bgLight }}>
      <style>{`
        @keyframes gradientShift {
          0% { background-position: 0% 50% }
          50% { background-position: 100% 50% }
          100% { background-position: 0% 50% }
        }
      `}</style>
      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 32px" }}>
        <SectionLabel color={S.goldL}>04 — Componentes premium</SectionLabel>
        <h2 style={{ fontFamily: S.serif, fontSize: "clamp(28px,4vw,48px)", color: S.white, marginBottom: 16 }}>
          <GradientText text="Glassmorphism" /> · contadores · depth
        </h2>
        <p style={{ color: S.muted, fontSize: 15, maxWidth: 560, lineHeight: 1.7, marginBottom: 52 }}>
          Tarjetas con efecto cristal y depth 3D en hover, contadores que animan al entrar en pantalla, texto con gradiente animado.
        </p>

        {/* Glassmorphism cards with animated counters */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px,1fr))", gap: 20, marginBottom: 60 }}>
          <GlassCard icon="🌿" title="Semanas" value={48} suffix="" sub="de transformación" color={S.teal} />
          <GlassCard icon="👥" title="Alumnos" value={320} suffix="+" sub="ya en el método" color={S.gold} />
          <GlassCard icon="🎵" title="Audios" value={96} suffix="" sub="prácticas y meditaciones" color={S.tealL} />
          <GlassCard icon="⭐" title="Valoración" value={4.9} suffix="/5" sub="media de alumnos" color={S.goldL} />
        </div>

        {/* Gradient text showcase */}
        <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 24, padding: "40px 36px", marginBottom: 24 }}>
          <div style={{ fontSize: 11, color: S.muted, letterSpacing: ".1em", textTransform: "uppercase", marginBottom: 20 }}>Efecto gradiente animado</div>
          <div style={{ fontFamily: S.serif, fontSize: "clamp(24px,4vw,52px)", lineHeight: 1.2 }}>
            La transformación no se aprende.{" "}
            <GradientText text="Se vive." />
          </div>
        </div>

        {/* Hover depth demo row */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { emoji: "🔮", label: "Depth 3D en hover", sub: "RotateX + RotateY + shadow dinámica" },
            { emoji: "💎", label: "Glassmorphism", sub: "Backdrop blur + border luminoso" },
            { emoji: "🎨", label: "Color reactivo", sub: "El borde cambia de color al hacer hover" },
          ].map(item => (
            <motion.div
              key={item.label}
              whileHover={{ rotateX: 6, rotateY: -6, scale: 1.04 }}
              style={{
                background: "rgba(255,255,255,.04)",
                backdropFilter: "blur(16px)",
                border: "1px solid rgba(255,255,255,.1)",
                borderRadius: 20,
                padding: "28px 22px",
                textAlign: "center",
                transformStyle: "preserve-3d",
                cursor: "default",
              }}
            >
              <div style={{ fontSize: 32, marginBottom: 12 }}>{item.emoji}</div>
              <div style={{ fontSize: 14, color: S.white, fontWeight: 600, marginBottom: 6 }}>{item.label}</div>
              <div style={{ fontSize: 12, color: S.muted }}>{item.sub}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Utils ──────────────────────────────────────────────────────────────────
function SectionLabel({ children, color }: { children: React.ReactNode, color: string }) {
  return (
    <div style={{ fontSize: 11, color, letterSpacing: ".14em", textTransform: "uppercase", fontWeight: 700, marginBottom: 18, display: "flex", alignItems: "center", gap: 10 }}>
      <div style={{ width: 24, height: 1.5, background: color, borderRadius: 2 }} />
      {children}
    </div>
  );
}

// ─── Page ───────────────────────────────────────────────────────────────────
export default function Lab() {
  const [, setLocation] = useLocation();
  return (
    <div style={{ background: S.bg, minHeight: "100vh", color: S.white }}>
      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, background: "rgba(3,3,6,.85)", backdropFilter: "blur(20px)", borderBottom: "1px solid rgba(255,255,255,.06)", padding: "0 32px", height: 60, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <span style={{ fontFamily: S.serif, color: S.goldL, fontSize: 16 }}>FI Lab</span>
          <span style={{ fontSize: 10, color: S.muted, letterSpacing: ".1em", textTransform: "uppercase", background: "rgba(188,150,64,.15)", padding: "2px 8px", borderRadius: 20, border: "1px solid rgba(188,150,64,.2)" }}>Pruebas 3D</span>
        </div>
        <button onClick={() => setLocation("/")} style={{ fontSize: 12, color: S.muted, background: "none", border: "1px solid rgba(255,255,255,.12)", borderRadius: 20, padding: "6px 16px", cursor: "pointer" }}>
          ← Volver a la Academy
        </button>
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: 60 }}>
        <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", textAlign: "center", padding: "80px 32px 60px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 40%, rgba(43,125,122,.15), rgba(188,150,64,.05) 50%, transparent)", pointerEvents: "none" }} />
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
            <div style={{ fontSize: 11, color: S.gold, letterSpacing: ".16em", textTransform: "uppercase", marginBottom: 24 }}>Laboratorio de Componentes</div>
            <h1 style={{ fontFamily: S.serif, fontSize: "clamp(36px,6vw,72px)", lineHeight: 1.1, marginBottom: 24 }}>
              Todo lo que podemos<br />
              <em style={{ color: S.goldL }}>añadir a tu web</em>
            </h1>
            <p style={{ color: S.muted, fontSize: 16, maxWidth: 560, margin: "0 auto 40px", lineHeight: 1.7 }}>
              Demos en vivo de animaciones, 3D, galerías y componentes premium. Haz scroll para explorar cada categoría.
            </p>
            <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
              {["01 Animaciones", "02 Three.js 3D", "03 Galerías", "04 Componentes"].map((label, i) => (
                <span key={i} style={{ fontSize: 12, color: S.muted, background: "rgba(255,255,255,.05)", border: "1px solid rgba(255,255,255,.1)", borderRadius: 20, padding: "6px 16px" }}>
                  {label}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <AnimacionesSection />
        <Tres3DSection />
        <GaleriasSection />
        <ComponentesSection />

        {/* CTA final */}
        <section style={{ padding: "100px 32px", textAlign: "center" }}>
          <div style={{ fontFamily: S.serif, fontSize: "clamp(24px,4vw,44px)", marginBottom: 20 }}>
            ¿Cuál integramos<br /><em style={{ color: S.goldL }}>en la web real?</em>
          </div>
          <p style={{ color: S.muted, fontSize: 15, marginBottom: 36 }}>Todos los ejemplos están probados aquí — sin tocar Frecuencia Integral Academy.</p>
          <button onClick={() => setLocation("/")} style={{ fontFamily: S.serif, fontSize: 16, color: S.bg, background: S.goldL, border: "none", borderRadius: 50, padding: "16px 40px", cursor: "pointer", fontWeight: 600 }}>
            ← Volver a la Academy
          </button>
        </section>
      </div>
    </div>
  );
}
