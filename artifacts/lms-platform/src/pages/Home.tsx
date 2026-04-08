import React, { useState, useRef, useEffect, useCallback } from 'react';
import {
  Play, Pause, SkipForward, Calendar, Film, Book, Image as ImageIcon, Palette, Globe, Mail,
  Layout, BookOpen, Lock, FolderTree, Users, BarChart3, ArrowRight,
  CheckCircle2, ChevronDown, Menu, X, Check,
  Settings, CreditCard, Headphones, ShieldCheck, Smartphone, Zap, MoveRight,
  Sparkles, Star
} from 'lucide-react';
import {
  motion, AnimatePresence, useScroll, useTransform, useSpring,
  useInView, useMotionValue, animate
} from 'framer-motion';
import { Link } from 'wouter';
import PlatformVideo from '@/components/PlatformVideo';
import { getContentValue } from '@/lib/content';

/** Hook que fuerza re-render cuando el editor actualiza contenido */
function useContentVersion() {
  const [v, setV] = useState(0);
  useEffect(() => {
    const up = () => setV(x => x + 1);
    window.addEventListener('fi:content', up);
    window.addEventListener('fi:published', up);
    window.addEventListener('fi:reset', up);
    return () => {
      window.removeEventListener('fi:content', up);
      window.removeEventListener('fi:published', up);
      window.removeEventListener('fi:reset', up);
    };
  }, []);
  return v;
}

function cv(key: string, fallback: string): string {
  return getContentValue(key, fallback);
}

/* ═══════════════════════════════════════════
   INTRO LOADER
═══════════════════════════════════════════ */
function IntroLoader({ onDone }: { onDone: () => void }) {
  const [pct, setPct] = useState(0);
  const [gone, setGone] = useState(false);
  useEffect(() => {
    let f = 0; const total = 80;
    const tick = () => {
      f++;
      const t = f / total;
      const e = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      setPct(Math.min(100, Math.round(e * 100)));
      if (f < total) requestAnimationFrame(tick);
      else setTimeout(() => { setGone(true); setTimeout(onDone, 650); }, 180);
    };
    requestAnimationFrame(tick);
  }, [onDone]);
  return (
    <AnimatePresence>
      {!gone && (
        <motion.div initial={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.65 }}
          className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
          style={{ background: 'radial-gradient(ellipse 100% 80% at 50% 0%,rgba(43,125,122,0.2) 0%,transparent 55%),radial-gradient(ellipse 60% 40% at 80% 100%,rgba(188,150,64,0.12) 0%,transparent 50%),#030306' }}>
          <motion.div animate={{ rotate: 360 }} transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
            className="absolute inset-0 pointer-events-none"
            style={{ background: 'conic-gradient(from 120deg,transparent 0deg,rgba(255,255,255,0.025) 60deg,transparent 120deg)' }} />
          <div className="relative z-10 text-center max-w-xs">
            <div className="font-serif text-4xl font-semibold tracking-tight mb-2"
              style={{ background: 'linear-gradient(135deg,#fff 0%,rgba(255,255,255,0.45) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              Aula<span style={{ WebkitTextFillColor: '#BC9640' }}>OS</span>
            </div>
            <motion.div className="text-[13px] tracking-[0.22em] uppercase mb-10 font-medium"
              initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.7 }}
              style={{ color: 'rgba(255,255,255,0.72)' }}>
              Tu academia.&nbsp;<span style={{ color: '#BC9640' }}>Tu marca.</span>
            </motion.div>
            <div className="font-mono text-[5.5rem] leading-none font-bold tracking-tight text-white mb-5"
              style={{ textShadow: '0 0 60px rgba(255,255,255,0.08)' }}>
              {String(pct).padStart(3, '0')}<span className="text-[2.5rem]" style={{ color: 'rgba(255,255,255,0.3)' }}>%</span>
            </div>
            <div className="w-[240px] h-[3px] rounded-full overflow-hidden mx-auto mb-4" style={{ background: 'rgba(255,255,255,0.08)' }}>
              <motion.div style={{ width: `${pct}%`, background: 'linear-gradient(90deg,rgba(255,255,255,0.7),#fff)', boxShadow: '0 0 20px rgba(255,255,255,0.3)' }} className="h-full rounded-full" />
            </div>
            <div className="flex gap-1.5 justify-center mt-5">
              {[0, 1, 2].map(i => (
                <motion.span key={i} animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.15, 1] }}
                  transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.15 }}
                  className="w-1.5 h-1.5 rounded-full inline-block" style={{ background: 'rgba(255,255,255,0.3)' }} />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════
   CUSTOM CURSOR
═══════════════════════════════════════════ */
function CustomCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: -100, y: -100 });
  const rp = useRef({ x: -100, y: -100 });
  useEffect(() => {
    const mv = (e: MouseEvent) => { pos.current = { x: e.clientX, y: e.clientY }; };
    window.addEventListener('mousemove', mv);
    let raf: number;
    const tick = () => {
      if (dot.current) dot.current.style.transform = `translate3d(${pos.current.x - 3}px,${pos.current.y - 3}px,0)`;
      if (ring.current) {
        rp.current.x += (pos.current.x - rp.current.x) * 0.12;
        rp.current.y += (pos.current.y - rp.current.y) * 0.12;
        ring.current.style.transform = `translate3d(${rp.current.x - 22}px,${rp.current.y - 22}px,0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => { window.removeEventListener('mousemove', mv); cancelAnimationFrame(raf); };
  }, []);
  return (
    <>
      <div ref={dot} className="fixed top-0 left-0 w-1.5 h-1.5 bg-white rounded-full pointer-events-none z-[9998]" style={{ mixBlendMode: 'difference' }} />
      <div ref={ring} className="fixed top-0 left-0 w-11 h-11 rounded-full pointer-events-none z-[9998]" style={{ border: '1px solid rgba(255,255,255,0.5)', mixBlendMode: 'difference' }} />
    </>
  );
}

/* ═══════════════════════════════════════════
   PARTICLE CANVAS
═══════════════════════════════════════════ */
function ParticleCanvas() {
  const cvs = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = cvs.current!; const ctx = c.getContext('2d')!;
    let raf: number; let W = 0, H = 0;
    const dots: { x: number; y: number; vx: number; vy: number; r: number }[] = [];
    const N = 80;
    const resize = () => { W = c.width = c.offsetWidth; H = c.height = c.offsetHeight; };
    const init = () => { dots.length = 0; for (let i = 0; i < N; i++) dots.push({ x: Math.random() * W, y: Math.random() * H, vx: (Math.random() - 0.5) * 0.28, vy: (Math.random() - 0.5) * 0.28, r: Math.random() * 1.4 + 0.4 }); };
    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const d of dots) { d.x += d.vx; d.y += d.vy; if (d.x < 0) d.x = W; if (d.x > W) d.x = 0; if (d.y < 0) d.y = H; if (d.y > H) d.y = 0; }
      const D = 120;
      for (let i = 0; i < dots.length; i++) for (let j = i + 1; j < dots.length; j++) {
        const dx = dots[i].x - dots[j].x, dy = dots[i].y - dots[j].y, dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < D) { ctx.beginPath(); ctx.strokeStyle = `rgba(43,125,122,${(1 - dist / D) * 0.15})`; ctx.lineWidth = 0.7; ctx.moveTo(dots[i].x, dots[i].y); ctx.lineTo(dots[j].x, dots[j].y); ctx.stroke(); }
      }
      for (const d of dots) { ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fillStyle = 'rgba(43,125,122,0.45)'; ctx.fill(); }
      raf = requestAnimationFrame(draw);
    };
    resize(); init(); draw();
    const ro = new ResizeObserver(() => { resize(); init(); }); ro.observe(c);
    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);
  return <canvas ref={cvs} className="absolute inset-0 w-full h-full pointer-events-none" />;
}

/* ═══════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════ */
function Counter({ to, suffix = '' }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  useEffect(() => {
    if (!inView || !ref.current) return;
    const ctrl = animate(0, to, { duration: 1.8, ease: 'easeOut', onUpdate(v) { if (ref.current) ref.current.textContent = Math.round(v) + suffix; } });
    return () => ctrl.stop();
  }, [inView, to, suffix]);
  return <span ref={ref}>0{suffix}</span>;
}

function Card3D({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const rx = useSpring(useTransform(y, [-0.5, 0.5], [7, -7]), { stiffness: 300, damping: 30 });
  const ry = useSpring(useTransform(x, [-0.5, 0.5], [-7, 7]), { stiffness: 300, damping: 30 });
  const hm = useCallback((e: React.MouseEvent<HTMLDivElement>) => { const r = ref.current!.getBoundingClientRect(); x.set((e.clientX - r.left) / r.width - 0.5); y.set((e.clientY - r.top) / r.height - 0.5); }, [x, y]);
  const reset = useCallback(() => { x.set(0); y.set(0); }, [x, y]);
  return (
    <motion.div ref={ref} onMouseMove={hm} onMouseLeave={reset}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 800, transformStyle: 'preserve-3d' }}
      className={`cursor-none ${className}`}>{children}</motion.div>
  );
}

function Reveal({ children, delay = 0, className = '', style }: { children: React.ReactNode; delay?: number; className?: string; style?: React.CSSProperties }) {
  return (
    <motion.div initial={{ opacity: 0, y: 44 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }} className={className} style={style}>
      {children}
    </motion.div>
  );
}

function AnimWords({ text, delay = 0 }: { text: string; delay?: number }) {
  return (
    <>
      {text.split(' ').map((w, i) => (
        <motion.span key={i} initial={{ opacity: 0, y: 20, filter: 'blur(5px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.5, delay: delay + i * 0.055, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block mr-[0.25em]">{w}</motion.span>
      ))}
    </>
  );
}

/* Gradient text dark→dim for dark sections */
const gradStyle: React.CSSProperties = { background: 'linear-gradient(180deg,#fff 0%,rgba(255,255,255,0.78) 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' };

/* Pill badge */
function Pill({ label, dark = false }: { label: string; dark?: boolean }) {
  return (
    <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.14em] uppercase mb-5 px-4 py-1.5 rounded-full"
      style={dark ? { color: 'rgba(255,255,255,0.65)', border: '1px solid rgba(255,255,255,0.2)' } : { color: '#2b7d7a', border: '1px solid rgba(43,125,122,0.2)', background: 'rgba(43,125,122,0.06)' }}>
      {label}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════
   HOME PAGE
═══════════════════════════════════════════════════════════════ */
export default function Home() {
  useContentVersion();
  const [loaded, setLoaded] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  /* Scroll-driven hero parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: hs } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(hs, [0, 1], ['0%', '20%']);
  const heroOp = useTransform(hs, [0, 0.7], [1, 0]);

  /* Solución section in-view trigger for comets */
  const solucionRef = useRef<HTMLElement>(null);
  const solucionInView = useInView(solucionRef, { once: true, margin: '-120px' });

  /* Scroll-driven 3D platform reveal — like Apple/Aura pattern */
  const platformRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: ps } = useScroll({ target: platformRef, offset: ['start end', 'center center'] });
  const platRotX = useTransform(ps, [0, 1], [24, 0]);
  const platScale = useTransform(ps, [0, 1], [0.72, 1]);
  const platOp = useTransform(ps, [0, 0.3], [0, 1]);
  const smoothRotX = useSpring(platRotX, { stiffness: 80, damping: 22 });
  const smoothScale = useSpring(platScale, { stiffness: 80, damping: 22 });

  const faqs = [
    { q: '¿Puedo usar mi propio dominio?', a: 'Sí. Puedes conectar tu propio dominio (ej. academia.tumarca.com) y gestionamos el SSL automáticamente y gratis.' },
    { q: '¿Cuántos alumnos puedo tener?', a: 'Nuestros planes escalan contigo. Desde los planes iniciales tienes capacidad para miles de alumnos sin impacto en el rendimiento.' },
    { q: '¿Cómo funciona el pago de alumnos?', a: 'Te conectas directamente con tu cuenta de Stripe. El dinero va directo a tu cuenta bancaria sin comisiones por transacción.' },
    { q: '¿Qué pasa si quiero añadir más cursos?', a: 'Puedes añadir cursos ilimitados. Nuestro editor permite que tu catálogo crezca sin restricciones.' },
  ];

  return (
    <>
      <CustomCursor />
      {!loaded && <IntroLoader onDone={() => setLoaded(true)} />}

      <div className="min-h-screen bg-white text-[#1D1D1F] antialiased overflow-x-hidden" style={{ cursor: 'none' }}>

        {/* ═══ NAVBAR — full width ═══════════════════════════════════ */}
        <motion.nav
          initial={{ y: -70, opacity: 0 }}
          animate={loaded ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="fixed top-0 inset-x-0 z-50 h-[64px] flex items-center"
          style={{ background: 'rgba(3,3,6,0.82)', backdropFilter: 'blur(24px)', WebkitBackdropFilter: 'blur(24px)', borderBottom: '1px solid rgba(255,255,255,0.06)' }}
        >
          <div className="max-w-7xl mx-auto px-6 w-full flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center gap-2.5">
              <div className="w-7 h-7 rounded-lg bg-white flex items-center justify-center">
                <div className="w-2.5 h-2.5 bg-[#030306] rounded-full" />
              </div>
              <span className="font-serif font-semibold text-[1.15rem] tracking-tight text-white">Aula<span className="text-[#BC9640]">OS</span></span>
            </div>

            {/* Center links */}
            <div className="hidden md:flex items-center gap-1">
              {[['#problema', 'Por qué nosotros'], ['#incluye', 'Qué incluye'], ['#comparativa', 'Comparativa'], ['#precios', 'Precios'], ['#onboarding', 'Cómo funciona']].map(([href, label]) => (
                <a key={href} href={href} className="px-3.5 py-1.5 text-[13px] font-medium rounded-full transition-colors cursor-none"
                  style={{ color: 'rgba(255,255,255,0.5)' }}
                  onMouseEnter={e => (e.currentTarget.style.color = 'white')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(255,255,255,0.5)')}>
                  {label}
                </a>
              ))}
            </div>

            {/* Right CTAs */}
            <div className="hidden md:flex items-center gap-3">
              <Link href="/demo" className="text-[13px] font-medium cursor-none transition-colors" style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={e => ((e.currentTarget as HTMLElement).style.color = 'white')}
                onMouseLeave={e => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.5)')}>
                Ver demo
              </Link>
              <Link href="/demo" className="bg-white text-[#030306] px-5 py-2 rounded-full text-[13px] font-semibold cursor-none transition-all hover:bg-white/90"
                style={{ boxShadow: '0 0 20px rgba(255,255,255,0.1)' }}>
                Empieza hoy →
              </Link>
            </div>

            <button className="md:hidden p-1.5 cursor-none text-white" onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.nav>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
              className="fixed top-16 left-4 right-4 z-40 rounded-2xl p-4 flex flex-col gap-1.5"
              style={{ background: 'rgba(8,8,12,0.97)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.09)' }}>
              {[['#problema', 'Por qué nosotros'], ['#incluye', 'Qué incluye'], ['#comparativa', 'Comparativa'], ['#precios', 'Precios'], ['#onboarding', 'Cómo funciona']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setMenuOpen(false)}
                  className="px-4 py-3 text-sm rounded-xl transition-colors" style={{ color: 'rgba(255,255,255,0.55)' }}>
                  {label}
                </a>
              ))}
            </motion.div>
          )}
        </AnimatePresence>

        {/* ═══ HERO — DARK ══════════════════════════════════════════ */}
        <section ref={heroRef} data-fi-section="home-hero" data-fi-label="Hero" className="relative flex flex-col items-center justify-center pt-28 pb-16 px-6 overflow-hidden bg-[#030306]">
          <ParticleCanvas />
          {/* Orbs */}
          <motion.div animate={{ y: [0, -26, 0], scale: [1, 1.07, 1] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full blur-3xl pointer-events-none w-[700px] h-[700px] -top-40 -left-40"
            style={{ background: 'rgba(43,125,122,0.14)' }} />
          <motion.div animate={{ y: [0, -20, 0], scale: [1, 1.05, 1] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] -bottom-48 -right-32"
            style={{ background: 'rgba(188,150,64,0.09)' }} />
          <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 80% 50% at 50% -10%,rgba(43,125,122,0.22) 0%,transparent 62%)' }} />

          <motion.div style={{ y: heroY, opacity: heroOp }} className="max-w-5xl mx-auto text-center relative z-10">
            {/* Badge */}
            <motion.div initial={{ opacity: 0, scale: 0.85 }} animate={loaded ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.05 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-semibold"
              style={{ background: 'rgba(43,125,122,0.18)', border: '1px solid rgba(43,125,122,0.45)', color: '#4aaaa6' }}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#4aaaa6] opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#4aaaa6]" />
              </span>
              <span data-fi-key="home.hero.badge">{cv('home.hero.badge', 'La alternativa a Moodle, Teachable y Kajabi')}</span>
            </motion.div>

            {/* Headline */}
            <h1 className="font-serif text-[2.6rem] sm:text-6xl md:text-[5.5rem] lg:text-[6.5rem] leading-[1.06] sm:leading-[1.04] font-semibold tracking-tight mb-5 text-white">
              <span data-fi-key="home.hero.title1" className="block text-white">{cv('home.hero.title1', 'Tu academia.')}</span>
              <motion.span data-fi-key="home.hero.title2" className="block" style={{ color: '#BC9640' }}
                initial={{ opacity: 0, y: 18, filter: 'blur(5px)' }}
                animate={loaded ? { opacity: 1, y: 0, filter: 'blur(0px)' } : {}}
                transition={{ duration: 0.45, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}>{cv('home.hero.title2', 'Tu marca.')}</motion.span>
              <span className="block" style={gradStyle}>
                <AnimWords text="Nuestra tecnología." delay={loaded ? 0.32 : 99} />
              </span>
            </h1>

            <motion.p initial={{ opacity: 0, y: 18 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.52 }}
              data-fi-key="home.hero.subtitle"
              className="text-lg md:text-xl mb-7 font-light max-w-2xl mx-auto leading-relaxed"
              style={{ color: 'rgba(255,255,255,0.75)' }}>
              {cv('home.hero.subtitle', 'Lanza tu plataforma de formación online con todos los recursos que tus alumnos necesitan. Precio fijo, sin comisiones, 100% white-label.')}
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 14 }} animate={loaded ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.62 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <Link href="/demo"
                className="group bg-white text-[#030306] px-8 py-4 rounded-full text-base font-semibold transition-all hover:bg-white/90 shadow-2xl flex items-center justify-center gap-2 cursor-none"
                style={{ boxShadow: '0 0 40px rgba(255,255,255,0.1),0 8px 32px rgba(0,0,0,0.5)' }}>
                Explorar la demo
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>
                  <ArrowRight className="w-4 h-4" />
                </motion.span>
              </Link>
              <a href="#comparativa"
                className="border text-white/60 hover:text-white hover:border-white/30 px-8 py-4 rounded-full text-base font-medium transition-all cursor-none flex items-center justify-center"
                style={{ borderColor: 'rgba(255,255,255,0.14)', backdropFilter: 'blur(12px)' }}>
                Ver comparativa
              </a>
            </motion.div>

          </motion.div>

          {/* Scroll hint */}
          <motion.div initial={{ opacity: 0 }} animate={loaded ? { opacity: 1 } : {}} transition={{ delay: 1.4 }}
            className="mt-6 flex flex-col items-center gap-2">
            <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              className="w-5 h-8 rounded-full flex items-start justify-center pt-1.5"
              style={{ border: '1px solid rgba(255,255,255,0.15)' }}>
              <div className="w-1 h-2 rounded-full bg-white/35" />
            </motion.div>
          </motion.div>
        </section>

        {/* ═══ PLATFORM VIDEO — SCROLL 3D (estilo Aura/Apple) ════════ */}
        <section className="bg-[#030306] pb-8 md:pb-14 px-6 relative overflow-hidden">
          {/* fade del hero */}
          <div className="absolute top-0 inset-x-0 h-20 pointer-events-none" style={{ background: 'linear-gradient(to bottom,rgba(3,3,6,0) 0%,rgba(3,3,6,0) 100%)' }} />

          <div className="max-w-6xl mx-auto relative z-10">
            {/* Label central */}
            <Reveal className="text-center mb-12">
              <Pill label="La plataforma" dark />
              <h2 className="font-serif text-4xl md:text-5xl font-semibold mb-4" style={gradStyle}>
                Así se ve por dentro
              </h2>
              <p className="text-lg font-light" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Navega por las 8 secciones del área del alumno
              </p>
            </Reveal>

            {/* Video con scroll 3D — ref aquí, bien visible */}
            <div ref={platformRef} style={{ position: 'relative' }}>
              <motion.div
                style={{
                  rotateX: smoothRotX,
                  scale: smoothScale,
                  opacity: platOp,
                  transformPerspective: 1200,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Glow detrás */}
                <div className="absolute -inset-16 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 55% at 50% 60%,rgba(43,125,122,0.22) 0%,rgba(188,150,64,0.1) 50%,transparent 75%)', filter: 'blur(40px)' }} />
                {/* Borde gradiente */}
                <div className="absolute -inset-px rounded-3xl pointer-events-none" style={{ background: 'linear-gradient(135deg,rgba(43,125,122,0.35) 0%,transparent 45%,rgba(188,150,64,0.25) 100%)' }} />
                <PlatformVideo />
              </motion.div>
            </div>
          </div>

          {/* Degradado de transición dark→white hacia el siguiente bloque */}
          <div className="absolute bottom-0 inset-x-0 h-40 pointer-events-none" style={{ background: 'linear-gradient(to bottom,transparent 0%,#ffffff 100%)' }} />
        </section>

        {/* ═══ EL PROBLEMA — CINEMATIC ════════════════════════════ */}
        <section id="problema" data-fi-section="home-problema" data-fi-label="El Problema" className="py-10 md:py-16 px-6 bg-white relative overflow-hidden">
          {/* orb rojo difuso de fondo */}
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 700, height: 700, background: 'rgba(220,38,38,0.05)', top: '10%', left: '-18%' }}
            animate={{ x: [0, 40, 0], y: [0, -30, 0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 500, height: 500, background: 'rgba(234,88,12,0.05)', bottom: '5%', right: '-15%' }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 3 }} />

          <div className="max-w-7xl mx-auto relative z-10">

            {/* HEADER dramático */}
            <motion.div className="text-center mb-10"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Pill label="El problema" />
              <h2 data-fi-key="home.problema.title" className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] mb-6 leading-[1.05]">
                {cv('home.problema.title', 'Por qué las plataformas de siempre no funcionan')}
              </h2>
              <p data-fi-key="home.problema.sub" className="text-xl text-[#6E6E73] font-light max-w-2xl mx-auto leading-relaxed">
                {cv('home.problema.sub', 'Las soluciones existentes no fueron diseñadas para formadores independientes con una marca que cuidar.')}
              </p>
            </motion.div>

            {/* CARDS — stagger desde ángulos distintos */}
            <div className="grid md:grid-cols-3 gap-8 items-start">

              {/* CARD 1 — Costes ocultos */}
              <motion.div initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: 0, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8, rotate: 0.5 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-red-50 cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(220,38,38,0.08), 0 4px 16px rgba(0,0,0,0.06)' }}>
                  {/* Cabecera roja */}
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#fef2f2,#fff5f5)' }}>
                    <div className="w-9 h-9 rounded-xl bg-red-100 flex items-center justify-center">
                      <span className="text-lg">💸</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-red-400">Costes reales</div>
                      <div className="text-sm font-semibold text-red-900">Lo que realmente pagas</div>
                    </div>
                  </div>
                  {/* Mockup: desglose de factura */}
                  <div className="px-6 pt-5 pb-2">
                    <div className="space-y-2.5 mb-4">
                      {[
                        { label: 'Plataforma base (Kajabi)', val: '€149/mes' },
                        { label: 'Comisión por venta (5%)', val: '€240/mes', red: true },
                        { label: 'Plugin comunidad', val: '€29/mes' },
                        { label: 'Email marketing', val: '€49/mes' },
                      ].map((row, i) => (
                        <motion.div key={i} className="flex items-center justify-between text-sm"
                          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.07 }}>
                          <span className={row.red ? 'text-red-600 font-medium' : 'text-[#6E6E73]'}>{row.label}</span>
                          <span className={`font-semibold tabular-nums ${row.red ? 'text-red-600' : 'text-[#1D1D1F]'}`}>{row.val}</span>
                        </motion.div>
                      ))}
                    </div>
                    <div className="h-px bg-red-100 mb-3" />
                    <div className="flex items-center justify-between mb-5">
                      <span className="text-sm font-bold text-[#1D1D1F]">Total mensual</span>
                      <motion.span className="text-xl font-bold tabular-nums text-red-600"
                        initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.65, type: 'spring' }}>
                        €467<span className="text-sm font-normal text-red-400">/mes</span>
                      </motion.span>
                    </div>
                    {/* Barra de "dolor" */}
                    <div className="h-1.5 bg-red-50 rounded-full overflow-hidden mb-5">
                      <motion.div className="h-full bg-gradient-to-r from-red-400 to-red-600 rounded-full"
                        initial={{ width: '0%' }} whileInView={{ width: '87%' }}
                        viewport={{ once: true }} transition={{ delay: 0.7, duration: 1, ease: 'easeOut' }} />
                    </div>
                  </div>
                  {/* Footer */}
                  <div className="px-6 pb-6">
                    <div className="bg-red-50 rounded-2xl px-4 py-3">
                      <p className="text-sm text-red-700 leading-relaxed font-medium">
                        Antes de ganar un euro, ya estás pagando <strong>€5.604 al año</strong> en herramientas.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 2 — Diseño genérico */}
              <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-orange-50 cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(234,88,12,0.07), 0 4px 16px rgba(0,0,0,0.06)' }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#fff7ed,#fffbf5)' }}>
                    <div className="w-9 h-9 rounded-xl bg-orange-100 flex items-center justify-center">
                      <span className="text-lg">🎨</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-orange-400">Identidad perdida</div>
                      <div className="text-sm font-semibold text-orange-900">Lo que ven tus alumnos</div>
                    </div>
                  </div>
                  <div className="px-5 pt-5 pb-4">
                    {/* URL bar falsa — mal */}
                    <motion.div className="flex items-center gap-2 bg-gray-100 rounded-lg px-3 py-2 mb-3"
                      animate={{ x: [0, -2, 2, -1, 0] }} transition={{ duration: 0.4, delay: 1.8, repeat: 1 }}>
                      <div className="w-3 h-3 rounded-full bg-red-400 shrink-0" />
                      <span className="text-xs text-gray-400 font-mono truncate">teachable.com/<strong className="text-gray-600">tu-academia</strong></span>
                      <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 1.2 }}
                        className="ml-auto shrink-0 bg-red-100 text-red-600 text-[9px] font-bold px-1.5 py-0.5 rounded">✕ No es tuya</motion.div>
                    </motion.div>
                    {/* Fake generic platform preview */}
                    <div className="rounded-xl overflow-hidden border border-gray-100 mb-3">
                      <div className="h-8 bg-gray-200 flex items-center px-3 gap-2">
                        <div className="w-16 h-2.5 bg-gray-400 rounded-full" />
                        <div className="flex-1" />
                        <div className="w-8 h-2 bg-gray-300 rounded" />
                        <div className="w-8 h-2 bg-gray-300 rounded" />
                      </div>
                      <div className="bg-gray-50 p-3 space-y-2">
                        <div className="h-3 w-3/4 bg-gray-200 rounded" />
                        <div className="h-2.5 w-full bg-gray-100 rounded" />
                        <div className="h-2.5 w-5/6 bg-gray-100 rounded" />
                        <div className="h-7 w-28 bg-gray-300 rounded-lg mt-3" />
                      </div>
                    </div>
                    {/* URL bar buena */}
                    <motion.div className="flex items-center gap-2 rounded-lg px-3 py-2 mb-3"
                      style={{ background: 'linear-gradient(135deg,#f0fdf4,#f7fef7)', border: '1px solid #bbf7d0' }}
                      initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }} transition={{ delay: 1.4 }}>
                      <div className="w-3 h-3 rounded-full bg-green-400 shrink-0" />
                      <span className="text-xs text-gray-500 font-mono truncate">academia.<strong className="text-green-700">tumarca.com</strong></span>
                      <div className="ml-auto shrink-0 bg-green-100 text-green-700 text-[9px] font-bold px-1.5 py-0.5 rounded">✓ 100% tuya</div>
                    </motion.div>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="bg-orange-50 rounded-2xl px-4 py-3">
                      <p className="text-sm text-orange-700 leading-relaxed font-medium">
                        Tus alumnos ven el logo de otra empresa, no el tuyo. Eso erosiona la confianza.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 3 — Caos de herramientas */}
              <motion.div initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.85, delay: 0.28, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8, rotate: -0.5 }} transition={{ type: 'spring', stiffness: 280, damping: 22 }}
                  className="bg-white rounded-3xl overflow-hidden shadow-xl border border-amber-50 cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(217,119,6,0.07), 0 4px 16px rgba(0,0,0,0.06)' }}>
                  <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg,#fffbeb,#fefce8)' }}>
                    <div className="w-9 h-9 rounded-xl bg-amber-100 flex items-center justify-center">
                      <span className="text-lg">🔗</span>
                    </div>
                    <div>
                      <div className="text-xs font-bold tracking-widest uppercase text-amber-500">Fragmentación</div>
                      <div className="text-sm font-semibold text-amber-900">Tu stack actual</div>
                    </div>
                  </div>
                  <div className="px-5 pt-5 pb-4">
                    {/* Mapa de caos de herramientas */}
                    <div className="relative h-[160px] mb-3">
                      {[
                        { label: 'Vimeo', x: '10%', y: '5%', delay: 0.2, color: '#1ab7ea' },
                        { label: 'Stripe', x: '60%', y: '0%', delay: 0.35, color: '#635bff' },
                        { label: 'Notion', x: '78%', y: '38%', delay: 0.5, color: '#1D1D1F' },
                        { label: 'Mailchimp', x: '55%', y: '72%', delay: 0.6, color: '#ffe01b' },
                        { label: 'Facebook', x: '8%', y: '68%', delay: 0.45, color: '#1877f2' },
                        { label: 'Zoom', x: '28%', y: '42%', delay: 0.3, color: '#2d8cff' },
                        { label: 'Drive', x: '35%', y: '80%', delay: 0.55, color: '#34a853' },
                      ].map((tool, ti) => (
                        <motion.div key={ti}
                          initial={{ opacity: 0, scale: 0 }}
                          whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.4 + tool.delay, type: 'spring', stiffness: 300, damping: 18 }}
                          animate={{ y: [0, ti % 2 === 0 ? -4 : 4, 0] }}
                          style={{ position: 'absolute', left: tool.x, top: tool.y }}
                          className="bg-white border border-gray-100 rounded-xl px-2.5 py-1.5 shadow-sm flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full shrink-0" style={{ background: tool.color }} />
                          <span className="text-[10px] font-semibold text-gray-600 whitespace-nowrap">{tool.label}</span>
                        </motion.div>
                      ))}
                      {/* Líneas de conexión caóticas con SVG */}
                      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 320 160">
                        {[['60,20', '210,10'], ['210,10', '265,65'], ['265,65', '200,120'], ['200,120', '120,130'], ['120,130', '40,115'], ['40,115', '100,68'], ['100,68', '60,20'], ['100,68', '265,65']].map(([from, to], li) => (
                          <motion.line key={li} x1={from.split(',')[0]} y1={from.split(',')[1]} x2={to.split(',')[0]} y2={to.split(',')[1]}
                            stroke="#DC2626" strokeWidth="1" strokeDasharray="4 3"
                            initial={{ pathLength: 0, opacity: 0 }} whileInView={{ pathLength: 1, opacity: 1 }}
                            viewport={{ once: true }} transition={{ delay: 0.8 + li * 0.07, duration: 0.4 }} />
                        ))}
                      </svg>
                    </div>
                    {/* Contador de herramientas */}
                    <div className="flex items-center gap-3 bg-amber-50 rounded-2xl px-4 py-3 mb-3">
                      <span className="font-serif text-3xl font-bold text-amber-600">7</span>
                      <div>
                        <div className="text-sm font-bold text-amber-800">herramientas distintas</div>
                        <div className="text-xs text-amber-600">para una sola academia</div>
                      </div>
                    </div>
                  </div>
                  <div className="px-6 pb-6">
                    <div className="bg-amber-50 rounded-2xl px-4 py-3">
                      <p className="text-sm text-amber-700 leading-relaxed font-medium">
                        Cuando algo falla, no sabes por dónde empezar. Tus alumnos se frustran y se van.
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

            </div>

            {/* CTA de transición hacia la solución */}
            <motion.div className="text-center mt-20"
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="inline-flex items-center gap-3 text-[#6E6E73] text-lg font-light">
                <div className="h-px w-16 bg-gray-200" />
                Existe una forma mejor
                <div className="h-px w-16 bg-gray-200" />
              </div>
              <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }} className="mt-4">
                <ChevronDown className="w-6 h-6 mx-auto text-gray-300" />
              </motion.div>
            </motion.div>

          </div>
        </section>

        {/* ═══ NUESTRA SOLUCIÓN — DARK ══════════════════════════════ */}
        <section ref={solucionRef} data-fi-section="home-solucion" data-fi-label="Nuestra Solución" className="py-10 md:py-16 px-6 bg-[#030306] relative overflow-hidden">
          <motion.div animate={{ y: [0, -26, 0] }} transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full blur-3xl pointer-events-none w-[700px] h-[700px] top-0 right-0 translate-x-1/3 -translate-y-1/4"
            style={{ background: 'rgba(43,125,122,0.14)' }} />
          <motion.div animate={{ y: [0, 22, 0] }} transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] bottom-0 left-0 -translate-x-1/4 translate-y-1/4"
            style={{ background: 'rgba(188,150,64,0.08)' }} />

          {/* ── COMETAS — aparecen al entrar en pantalla ── */}
          {solucionInView && [
            { fromX: '5%', fromY: '8%', angle: 42, color: 'rgba(43,125,122,0.65)', len: 180, delay: 0.1 },
            { fromX: '88%', fromY: '5%', angle: 128, color: 'rgba(188,150,64,0.80)', len: 210, delay: 0.55 },
            { fromX: '3%', fromY: '62%', angle: 35, color: 'rgba(255,255,255,0.28)', len: 150, delay: 0.95 },
            { fromX: '85%', fromY: '78%', angle: 220, color: 'rgba(188,150,64,0.45)', len: 140, delay: 1.35 },
          ].map((c, i) => (
            <motion.div key={i} className="absolute pointer-events-none rounded-full"
              style={{ left: c.fromX, top: c.fromY, width: c.len, height: 1.5,
                rotate: c.angle, transformOrigin: 'right center',
                background: `linear-gradient(90deg,transparent,${c.color})` }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 0.85, delay: c.delay, ease: 'easeOut' }} />
          ))}

          {/* Flash dorado al aparecer "a tu medida" */}
          {solucionInView && (
            <motion.div className="absolute inset-0 pointer-events-none"
              initial={{ opacity: 0 }} animate={{ opacity: [0, 0.12, 0] }}
              transition={{ duration: 0.55, delay: 0.6 }}
              style={{ background: 'radial-gradient(ellipse 55% 35% at 30% 50%,rgba(188,150,64,0.5),transparent)' }} />
          )}

          <div className="max-w-7xl mx-auto relative z-10" style={{ perspective: '1400px' }}>
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center" style={{ transformStyle: 'preserve-3d' }}>

              {/* ── COLUMNA IZQUIERDA — Tormenta Dorada ── */}
              <div style={{ transformStyle: 'preserve-3d' }}>

                {/* Pill — cae desde arriba */}
                <motion.div
                  initial={{ opacity: 0, y: -55, filter: 'blur(10px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.7, ease: [0.08, 0.98, 0.18, 1], delay: 0.05 }}>
                  <Pill label="Nuestra solución" dark />
                </motion.div>

                {/* Línea 1 — vuela desde la izquierda */}
                <motion.div
                  initial={{ opacity: 0, x: -60, y: -10, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ duration: 0.9, ease: [0.08, 0.98, 0.18, 1], delay: 0.15 }}>
                  <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl font-semibold leading-tight mb-1 md:mb-2" style={gradStyle}>
                    Una plataforma hecha
                  </h2>
                </motion.div>

                {/* Línea 2 — "a tu medida" vuela desde la derecha */}
                <motion.div className="relative mb-3 md:mb-5"
                  initial={{ opacity: 0, x: 60, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ duration: 1.0, ease: [0.08, 0.98, 0.18, 1], delay: 0.4 }}
                  style={{ perspective: 1000 }}>
                  <h2 className="font-serif text-6xl md:text-7xl font-bold leading-tight">
                    <motion.span
                      style={{
                        background: 'linear-gradient(120deg,#BC9640 0%,#f5d483 35%,#e8c56a 50%,#BC9640 65%,#795901 100%)',
                        backgroundSize: '250% auto',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text',
                        display: 'inline-block',
                      }}
                      animate={{ backgroundPosition: ['0% center', '250% center'] }}
                      transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}>
                      a tu medida
                    </motion.span>
                  </h2>
                  {/* Partículas doradas de impacto */}
                  {solucionInView && [...Array(8)].map((_, i) => (
                    <motion.div key={i} className="absolute w-1 h-1 rounded-full pointer-events-none"
                      style={{ left: '35%', top: '55%', background: '#BC9640' }}
                      initial={{ opacity: 0, x: 0, y: 0, scale: 0 }}
                      animate={{ opacity: [0, 1, 0], x: Math.cos((i / 8) * Math.PI * 2) * 55, y: Math.sin((i / 8) * Math.PI * 2) * 38, scale: [0, 2.2, 0] }}
                      transition={{ duration: 0.75, delay: 0.62 + i * 0.02 }} />
                  ))}
                  {/* Línea dorada de aterrizaje */}
                  <motion.div className="absolute left-0 right-0 bottom-0 h-px"
                    initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.9, delay: 1.0, ease: [0.08, 0.98, 0.18, 1] }}
                    style={{ background: 'linear-gradient(90deg,transparent,rgba(188,150,64,0.7),rgba(255,220,80,0.4),rgba(188,150,64,0.7),transparent)', transformOrigin: 'left' }} />
                </motion.div>

                {/* Párrafo */}
                <motion.div
                  initial={{ opacity: 0, y: 20, filter: 'blur(6px)' }}
                  whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  viewport={{ once: true, margin: '0px' }}
                  transition={{ duration: 0.75, ease: [0.08, 0.98, 0.18, 1], delay: 0.6 }}
                  className="mb-4 md:mb-6">
                  <p className="text-xl font-light leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    Diseñamos una experiencia premium para ti y tus alumnos, eliminando la fricción técnica y los costes ocultos.
                  </p>
                </motion.div>

                {/* Bullets — disparan desde la izquierda con perspectiva */}
                <div className="space-y-4">
                  {[
                    { emoji: '💰', text: 'Precio fijo sin comisiones por venta. Lo que ganas es tuyo.' },
                    { emoji: '🎨', text: 'Completamente personalizable con tu marca (white-label real).' },
                    { emoji: '📦', text: 'Todo en un solo lugar: vídeos, audios, diario, programa semanal y pagos.' },
                  ].map((item, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '0px' }}
                      transition={{ duration: 0.6, ease: [0.08, 0.98, 0.18, 1], delay: 0.75 + i * 0.12 }}
                      style={{ perspective: 800 }}
                      className="relative overflow-hidden">
                      {/* Rastro de luz que se disuelve */}
                      {solucionInView && (
                        <motion.div className="absolute left-0 top-0 h-full w-full pointer-events-none rounded-2xl"
                          initial={{ scaleX: 1.4, opacity: 0.35 }} animate={{ scaleX: 0, opacity: 0 }}
                          transition={{ duration: 0.55, delay: 1.1 + i * 0.15 }}
                          style={{ background: 'linear-gradient(90deg,rgba(43,125,122,0.4),transparent)', transformOrigin: 'left' }} />
                      )}
                      <div className="flex items-start gap-4 group p-4 rounded-2xl cursor-none hover:bg-white/[0.04] transition-colors">
                        <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 text-xl"
                          style={{ background: 'rgba(43,125,122,0.12)', border: '1px solid rgba(43,125,122,0.2)' }}>{item.emoji}</div>
                        <p className="text-lg font-medium leading-relaxed pt-2.5" style={{ color: 'rgba(255,255,255,0.88)' }}>{item.text}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* SPATIAL DEPTH VISUAL — entra desde el fondo del espacio */}
              <motion.div className="relative hidden lg:block" style={{ height: 560 }}
                initial={{ opacity: 0, scale: 0.5, rotateY: -22, rotateX: 14, x: 100, filter: 'blur(24px)' }}
                whileInView={{ opacity: 1, scale: 1, rotateY: 0, rotateX: 0, x: 0, filter: 'blur(0px)' }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}>

                {/* ── ESPACIO PROFUNDO: fondo oscuro ── */}
                <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none"
                  style={{ background: 'radial-gradient(ellipse 90% 70% at 50% 50%,rgba(5,18,24,0.98) 0%,#030306 80%)' }}>
                  {/* Estrellas fijas */}
                  {[[8,12],[18,42],[32,8],[45,28],[60,15],[72,38],[85,10],[90,55],[15,65],[55,72],[78,80],[38,85],[25,95],[65,90],[5,78]].map(([x,y],i) => (
                    <motion.div key={i} className="absolute rounded-full bg-white"
                      style={{ left:`${x}%`, top:`${y}%`, width: i%3===0?2:1.5, height: i%3===0?2:1.5 }}
                      animate={{ opacity:[0.08,0.6,0.08] }}
                      transition={{ duration:2.5+i*0.3, repeat:Infinity, delay:i*0.18 }} />
                  ))}
                </div>

                {/* ── RAYO DE LUZ central — efecto cónico ── */}
                <motion.div className="absolute pointer-events-none"
                  style={{ top:'-8%', left:'15%', right:'15%', height:'75%',
                    background:'linear-gradient(180deg,rgba(43,125,122,0.22) 0%,rgba(188,150,64,0.12) 35%,transparent 75%)',
                    clipPath:'polygon(35% 0%,65% 0%,100% 100%,0% 100%)', filter:'blur(22px)' }}
                  animate={{ opacity:[0.6,1,0.6], scaleX:[0.9,1.08,0.9] }}
                  transition={{ duration:6, repeat:Infinity, ease:'easeInOut' }} />

                {/* ── HALO CENTRAL ── */}
                <motion.div className="absolute inset-0 pointer-events-none rounded-3xl"
                  style={{ background:'radial-gradient(ellipse 65% 45% at 50% 50%,rgba(43,125,122,0.18) 0%,rgba(188,150,64,0.1) 35%,transparent 65%)', filter:'blur(28px)' }}
                  animate={{ scale:[1,1.1,1], opacity:[0.75,1,0.75] }}
                  transition={{ duration:5, repeat:Infinity, ease:'easeInOut' }} />

                {/* ── FRAME LEJANO (túnel, plano –2) ── */}
                <motion.div className="absolute rounded-2xl pointer-events-none"
                  style={{ inset:'12% 20%', border:'1px solid rgba(43,125,122,0.12)', opacity:0.18,
                    boxShadow:'0 0 40px rgba(43,125,122,0.08) inset', filter:'blur(2px)' }}
                  animate={{ scale:[1,1.025,1] }} transition={{ duration:8, repeat:Infinity, ease:'easeInOut' }} />

                {/* ── FRAME MEDIO (plano –1) ── */}
                <motion.div className="absolute rounded-2xl pointer-events-none"
                  style={{ inset:'6% 10%', border:'1px solid rgba(188,150,64,0.15)', opacity:0.28,
                    boxShadow:'0 0 60px rgba(188,150,64,0.06) inset', filter:'blur(1px)' }}
                  animate={{ scale:[1,1.018,1] }} transition={{ duration:6, repeat:Infinity, ease:'easeInOut', delay:1 }} />

                {/* ── MOCKUP PRINCIPAL (plano 0 — frente) ── */}
                <motion.div className="absolute" style={{ top:'14%', left:'8%', right:'8%' }}
                  animate={{ y:[0,-12,0] }} transition={{ duration:7, repeat:Infinity, ease:'easeInOut', delay:0.5 }}>
                  {/* Glow detrás del mockup */}
                  <div className="absolute -inset-6 pointer-events-none rounded-3xl"
                    style={{ background:'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(43,125,122,0.22) 0%,rgba(188,150,64,0.12) 40%,transparent 70%)', filter:'blur(20px)' }} />

                  <motion.div whileHover={{ rotateY:-3, rotateX:1, scale:1.015 }}
                    transition={{ type:'spring', stiffness:200, damping:22 }}
                    style={{ perspective:1000, transformStyle:'preserve-3d' }}
                    className="relative rounded-2xl overflow-hidden shadow-2xl"
                    >
                    {/* Borde con glow */}
                    <div className="absolute inset-0 rounded-2xl pointer-events-none z-20"
                      style={{ boxShadow:'0 0 0 1px rgba(255,255,255,0.1),0 0 30px rgba(43,125,122,0.15) inset' }} />
                    <div className="relative z-10" style={{ background:'rgba(10,10,18,0.97)' }}>
                      {/* Barra de ventana */}
                      <div className="h-9 flex items-center px-4 gap-3" style={{ borderBottom:'1px solid rgba(255,255,255,0.05)', background:'rgba(255,255,255,0.02)' }}>
                        <div className="flex gap-1.5">{['rgba(255,95,87,0.7)','rgba(255,189,68,0.7)','rgba(40,200,64,0.7)'].map((c,i)=><div key={i} className="w-2.5 h-2.5 rounded-full" style={{background:c}}/>)}</div>
                        <span className="flex-1 text-[10px] text-center" style={{color:'rgba(255,255,255,0.18)'}}>academia.tumarca.com</span>
                        <div className="w-5 h-5 rounded-full flex items-center justify-center text-[8px] font-bold" style={{background:'linear-gradient(135deg,#BC9640,#795901)'}}>M</div>
                      </div>
                      <div className="flex">
                        {/* Sidebar */}
                        <div className="w-24 pt-2.5 pb-2.5 flex flex-col gap-0.5 px-1.5 shrink-0" style={{borderRight:'1px solid rgba(255,255,255,0.04)'}}>
                          {[{e:'🏠',l:'Inicio'},{e:'📚',l:'Formaciones',a:true},{e:'🎨',l:'Arteterapia'},{e:'🎵',l:'Multimedia'},{e:'📝',l:'Diario'},{e:'💬',l:'Comunidad'},{e:'📊',l:'Progreso'}].map((it,i)=>(
                            <div key={i} className="flex items-center gap-1.5 px-2 py-1.5 rounded-lg text-[9px] font-medium"
                              style={it.a?{background:'rgba(43,125,122,0.18)',color:'#2b7d7a'}:{color:'rgba(255,255,255,0.2)'}}>
                              <span className="text-[10px]">{it.e}</span>{it.l}
                            </div>
                          ))}
                        </div>
                        {/* Contenido */}
                        <div className="flex-1 p-3.5 min-w-0">
                          <div className="text-[9px] mb-2" style={{color:'rgba(255,255,255,0.25)'}}>Método TCT — 12 semanas</div>
                          <div className="space-y-1.5">
                            {[{label:'Semana 1 — Fundamentos del Método TCT',done:true},{label:'Semana 2 — Reconocimiento de patrones',done:true},{label:'Semana 3 — Herramientas de integración',done:true},{label:'Semana 4 — Práctica de anclaje profundo',active:true},{label:'Semana 5 — Expansión de conciencia',locked:true}].map((it,i)=>(
                              <div key={i} className="flex items-center gap-2 p-2 rounded-lg text-[9px]"
                                style={{border:`1px solid ${it.active?'rgba(188,150,64,0.25)':it.done?'rgba(255,255,255,0.06)':'rgba(255,255,255,0.02)'}`,background:it.active?'rgba(188,150,64,0.06)':it.done?'rgba(255,255,255,0.025)':'transparent',opacity:it.locked?0.3:1}}>
                                <div className="w-4 h-4 rounded-full flex items-center justify-center shrink-0" style={{background:it.done?'#2b7d7a':it.active?'rgba(188,150,64,0.25)':'rgba(255,255,255,0.07)'}}>
                                  {it.done?<Check className="w-2 h-2 text-white"/>:it.active?<Play className="w-1.5 h-1.5" style={{color:'#BC9640'}}/>:<Lock className="w-1.5 h-1.5" style={{color:'rgba(255,255,255,0.3)'}}/>}
                                </div>
                                <span className="flex-1 min-w-0 truncate" style={{color:it.active?'rgba(255,255,255,0.75)':'rgba(255,255,255,0.32)'}}>{it.label}</span>
                                {it.active&&<span className="shrink-0 font-medium text-[9px]" style={{color:'#BC9640'}}>35%</span>}
                              </div>
                            ))}
                          </div>
                          <div className="mt-3 pt-2.5" style={{borderTop:'1px solid rgba(255,255,255,0.05)'}}>
                            <div className="flex justify-between mb-1">
                              <span className="text-[9px]" style={{color:'rgba(255,255,255,0.22)'}}>Progreso general</span>
                              <span className="text-[9px] font-medium" style={{color:'#BC9640'}}>33%</span>
                            </div>
                            <div className="h-1 rounded-full" style={{background:'rgba(255,255,255,0.06)'}}>
                              <div className="h-1 rounded-full w-1/3" style={{background:'linear-gradient(90deg,#2b7d7a,#BC9640)'}}/>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* ── FLOATING: audio — bottom-left ── */}
                <motion.div initial={{opacity:0,y:12,x:-10}} whileInView={{opacity:1,y:0,x:0}}
                  viewport={{once:true}} transition={{delay:0.6,type:'spring'}}
                  className="absolute flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl cursor-none"
                  style={{bottom:'4%',left:'2%',background:'rgba(14,14,22,0.96)',border:'1px solid rgba(255,255,255,0.1)',backdropFilter:'blur(20px)'}}>
                  <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{background:'rgba(188,150,64,0.18)'}}>
                    <Headphones className="w-3.5 h-3.5" style={{color:'#BC9640'}}/>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[11px] font-medium" style={{color:'rgba(255,255,255,0.65)'}}>Meditación de anclaje</div>
                    <div className="flex items-center gap-2 mt-1">
                      <div className="flex-1 h-0.5 rounded-full" style={{background:'rgba(255,255,255,0.1)'}}><div className="w-2/5 h-full rounded-full" style={{background:'#BC9640'}}/></div>
                      <span className="text-[9px]" style={{color:'rgba(255,255,255,0.22)'}}>19:00</span>
                    </div>
                  </div>
                </motion.div>

                {/* ── FLOATING: alumnos — top-right ── */}
                <motion.div initial={{opacity:0,y:-12}} whileInView={{opacity:1,y:0}}
                  viewport={{once:true}} transition={{delay:0.75,type:'spring'}}
                  className="absolute flex items-center gap-3 px-4 py-3 rounded-2xl shadow-2xl cursor-none"
                  style={{top:'4%',right:'2%',background:'rgba(255,255,255,0.97)',color:'#0a0a14'}}>
                  <div className="flex -space-x-2">
                    {['#2b7d7a','#BC9640','#7c3aed','#db2777'].map((c,i)=>(
                      <div key={i} className="w-7 h-7 rounded-full border-2 border-white flex items-center justify-center text-[9px] text-white font-bold" style={{background:c}}>{['L','S','C','M'][i]}</div>
                    ))}
                  </div>
                  <div><div className="text-xs font-bold">55 alumnos activos</div><div className="text-[10px] text-gray-400">este mes</div></div>
                </motion.div>

                {/* ── FLOATING: ingresos ── */}
                <motion.div initial={{opacity:0,x:14}} whileInView={{opacity:1,x:0}}
                  viewport={{once:true}} transition={{delay:0.85,type:'spring'}}
                  className="absolute text-white px-4 py-3 rounded-2xl shadow-xl cursor-none"
                  style={{top:'22%',right:'0%',background:'linear-gradient(135deg,#BC9640,#795901)',boxShadow:'0 8px 30px rgba(188,150,64,0.45)'}}>
                  <div className="text-[10px] opacity-75 mb-0.5">Ingresos este mes</div>
                  <div className="text-xl font-bold font-serif">€4.280</div>
                  <div className="text-[10px] opacity-60">↑ 18% vs anterior</div>
                </motion.div>

              </motion.div>
            </div>
          </div>
        </section>

        {/* ═══ EXPERIENCIA DEL ALUMNO — CINEMATIC ══════════════════ */}
        <section id="experiencia" data-fi-section="home-alumno" data-fi-label="Experiencia Alumno" className="py-10 md:py-16 px-6 bg-[#F5F5F7] relative overflow-hidden" style={{ overflowX: 'hidden' }}>
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 600, height: 600, background: 'rgba(43,125,122,0.06)', top: '-10%', right: '-15%' }}
            animate={{ x: [0, -30, 0], y: [0, 20, 0] }} transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }} />
          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Pill label="Experiencia del alumno" />
              <h2 data-fi-key="home.alumno.title" className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] mb-6 leading-[1.05]">
                {cv('home.alumno.title', 'El área del alumno que lo cambia todo')}
              </h2>
              <p data-fi-key="home.alumno.sub" className="text-xl text-[#6E6E73] font-light max-w-2xl mx-auto">{cv('home.alumno.sub', 'Diseñada para la retención, la transformación y el regreso.')}</p>
            </motion.div>

            {/* Swipe hint — mobile only */}
            <div className="flex items-center justify-end gap-1.5 mb-3 md:hidden">
              <span className="text-sm text-[#6E6E73] font-medium">Desliza para ver más</span>
              <motion.div animate={{ x: [0, 4, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                <ArrowRight className="w-3.5 h-3.5 text-[#6E6E73]" />
              </motion.div>
            </div>

            <div className="relative">
              {/* Fade derecho — indica que hay más contenido */}
              <div className="absolute right-0 top-0 bottom-4 w-14 pointer-events-none z-10 md:hidden"
                style={{ background: 'linear-gradient(90deg, transparent, rgba(245,245,247,0.95))' }} />

              <div className="flex gap-4 overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0 md:grid md:grid-cols-2 md:gap-7 pb-4 md:pb-0" style={{ scrollbarWidth: 'none' }}>

              {/* CARD 1 — Programa Semanal */}
              <motion.div initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[80vw] md:min-w-0 shrink-0 md:shrink">
                <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-2xl overflow-hidden cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(43,125,122,0.1), 0 4px 20px rgba(0,0,0,0.06)' }}>
                  {/* Header */}
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#2b7d7a,#1a5c5a)' }}>
                      <Calendar className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base font-semibold text-[#1D1D1F]">Programa Semanal</div>
                      <div className="text-[11px] text-[#6E6E73]">Acceso progresivo · 12 semanas</div>
                    </div>
                    <div className="hidden sm:block bg-teal-50 text-teal-700 text-[10px] font-bold px-2 py-1 rounded-full border border-teal-100 shrink-0">Sem. 4 activa</div>
                  </div>
                  {/* Mockup programa */}
                  <div className="px-3 pb-4">
                    <div className="bg-[#F5F5F7] rounded-xl p-2 space-y-1">
                      {[
                        { n: 1, t: 'Fundamentos del Método', done: true },
                        { n: 2, t: 'Reconocimiento de patrones', done: true },
                        { n: 3, t: 'Herramientas de integración', done: true },
                        { n: 4, t: 'Práctica de anclaje profundo', active: true, pct: 35 },
                        { n: 5, t: 'Expansión de conciencia', locked: true },
                      ].map((w, wi) => (
                        <div key={wi}
                          className="flex items-center gap-2 rounded-lg px-2.5 py-2"
                          style={{
                            background: w.active ? 'white' : 'transparent',
                            boxShadow: w.active ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                            opacity: w.locked ? 0.38 : 1,
                          }}>
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-[9px] font-bold"
                            style={{ background: w.done ? '#2b7d7a' : w.active ? 'rgba(43,125,122,0.12)' : 'rgba(0,0,0,0.06)', color: w.done ? 'white' : w.active ? '#2b7d7a' : '#aaa' }}>
                            {w.done ? '✓' : w.n}
                          </div>
                          <span className="flex-1 text-xs font-medium truncate" style={{ color: w.active ? '#1D1D1F' : w.locked ? '#aaa' : '#6E6E73' }}>Sem. {w.n} — {w.t}</span>
                          {w.active && (
                            <div className="flex items-center gap-1.5 shrink-0">
                              <div className="w-12 h-1 rounded-full bg-gray-100 overflow-hidden">
                                <div className="h-full rounded-full w-[35%]" style={{ background: '#2b7d7a' }} />
                              </div>
                              <span className="text-[10px] font-semibold text-[#2b7d7a]">35%</span>
                            </div>
                          )}
                          {w.locked && <Lock className="w-3 h-3 text-gray-300 shrink-0" />}
                        </div>
                      ))}
                    </div>
                    <p className="mt-2.5 text-xs text-[#6E6E73] font-light leading-relaxed">
                      Cada semana se desbloquea cuando el alumno decide. Estructura y propósito.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 2 — Biblioteca Multimedia */}
              <motion.div initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[80vw] md:min-w-0 shrink-0 md:shrink">
                <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-2xl overflow-hidden cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(59,130,246,0.08), 0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#3b82f6,#1d4ed8)' }}>
                      <Film className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base font-semibold text-[#1D1D1F]">Biblioteca Multimedia</div>
                      <div className="text-[11px] text-[#6E6E73]">Vídeos · Audios · Galería</div>
                    </div>
                    <div className="hidden sm:block bg-blue-50 text-blue-700 text-[10px] font-bold px-2 py-1 rounded-full border border-blue-100 shrink-0">24 recursos</div>
                  </div>
                  <div className="px-3 pb-4">
                    {/* Tabs */}
                    <div className="flex gap-1.5 mb-2.5">
                      {['Vídeos', 'Audios', 'Galería'].map((tab, ti) => (
                        <div key={ti} className="px-2.5 py-1 rounded-full text-[11px] font-semibold cursor-none"
                          style={ti === 0 ? { background: '#1D1D1F', color: 'white' } : { background: '#F5F5F7', color: '#6E6E73' }}>
                          {tab}
                        </div>
                      ))}
                    </div>
                    {/* Grid 2x2 en desktop, lista compacta en mobile */}
                    <div className="hidden sm:grid sm:grid-cols-2 gap-2 mb-3">
                      {[
                        { title: 'Introducción al Método', dur: '18:42', new: true },
                        { title: 'Práctica de respiración', dur: '12:15' },
                        { title: 'Meditación de anclaje', dur: '24:30' },
                        { title: 'Ejercicio de integración', dur: '08:55' },
                      ].map((vid, vi) => (
                        <div key={vi} className="rounded-xl overflow-hidden cursor-none aspect-video flex items-end relative"
                          style={{ background: `linear-gradient(135deg, hsl(${220 + vi * 15},60%,${88 - vi * 4}%), hsl(${230 + vi * 12},55%,${82 - vi * 3}%))` }}>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 rounded-full bg-white/80 flex items-center justify-center shadow-md">
                              <Play className="w-3.5 h-3.5 text-[#1D1D1F] ml-0.5" />
                            </div>
                            {vid.new && <div className="absolute top-2 right-2 bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">NUEVO</div>}
                          </div>
                          <div className="relative px-2.5 py-2">
                            <div className="text-[11px] font-semibold text-[#1D1D1F] truncate">{vid.title}</div>
                            <div className="text-[10px] text-[#6E6E73]">{vid.dur}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Mobile: lista horizontal compacta */}
                    <div className="sm:hidden space-y-1.5 mb-2.5">
                      {[
                        { title: 'Introducción al Método', dur: '18:42', new: true, vi: 0 },
                        { title: 'Práctica de respiración', dur: '12:15', vi: 1 },
                        { title: 'Meditación de anclaje', dur: '24:30', vi: 2 },
                      ].map((vid) => (
                        <div key={vid.vi} className="flex items-center gap-2.5 rounded-xl px-2.5 py-2"
                          style={{ background: `linear-gradient(135deg, hsl(${220 + vid.vi * 15},60%,${88 - vid.vi * 4}%), hsl(${230 + vid.vi * 12},55%,${82 - vid.vi * 3}%))` }}>
                          <div className="w-7 h-7 rounded-full bg-white/80 flex items-center justify-center shadow shrink-0">
                            <Play className="w-3 h-3 text-[#1D1D1F] ml-0.5" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-[11px] font-semibold text-[#1D1D1F] truncate">{vid.title}</div>
                            <div className="text-[10px] text-[#6E6E73]">{vid.dur}</div>
                          </div>
                          {vid.new && <div className="bg-blue-500 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full shrink-0">NUEVO</div>}
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-[#6E6E73] font-light leading-relaxed">
                      Vídeos HD, audios descargables y galería de recursos. Sin salir de la plataforma.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 3 — Mini-player flotante */}
              <motion.div initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[80vw] md:min-w-0 shrink-0 md:shrink">
                <motion.div whileHover={{ y: -7, rotate: 0.4 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-2xl overflow-hidden cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(217,119,6,0.09), 0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}>
                      <Headphones className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base font-semibold text-[#1D1D1F]">Mini-player Flotante</div>
                      <div className="text-[11px] text-[#6E6E73]">Siempre visible · No interrumpe</div>
                    </div>
                  </div>
                  <div className="px-3 pb-4">
                    {/* Simulación compacta */}
                    <div className="rounded-xl overflow-hidden border border-gray-100 relative mb-3" style={{ background: '#FAFAF8' }}>
                      <div className="h-6 bg-white border-b border-gray-100 flex items-center px-2.5 gap-2">
                        <div className="w-8 h-1 bg-gray-200 rounded" />
                        <div className="flex-1" />
                        <div className="w-4 h-1 bg-gray-100 rounded" />
                      </div>
                      <div className="p-2.5 space-y-1.5 pb-10">
                        <div className="h-1.5 w-1/2 bg-gray-200 rounded" />
                        <div className="h-1 w-4/5 bg-gray-100 rounded" />
                        <div className="h-1 w-3/4 bg-gray-100 rounded" />
                        <div className="h-1 w-5/6 bg-gray-100 rounded" />
                      </div>
                      <motion.div
                        animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                        className="absolute bottom-1.5 left-1.5 right-1.5 rounded-lg px-2.5 py-2 flex items-center gap-2"
                        style={{ background: 'rgba(10,10,14,0.92)', backdropFilter: 'blur(16px)', boxShadow: '0 6px 24px rgba(0,0,0,0.25)' }}>
                        <div className="w-5 h-5 rounded-md shrink-0 flex items-center justify-center" style={{ background: 'rgba(245,158,11,0.2)' }}>
                          <Headphones className="w-2.5 h-2.5 text-amber-400" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="text-[9px] font-semibold text-white truncate">Meditación de anclaje profundo</div>
                          <div className="flex items-center gap-1 mt-0.5">
                            <div className="flex-1 h-0.5 rounded-full bg-white/10">
                              <motion.div className="h-full rounded-full bg-amber-400" style={{ width: '42%' }}
                                animate={{ width: ['42%', '48%', '42%'] }} transition={{ duration: 6, repeat: Infinity }} />
                            </div>
                            <span className="text-[8px] text-white/40">09:14</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 shrink-0">
                          <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                            <Pause className="w-2 h-2 text-white" />
                          </div>
                          <SkipForward className="w-2.5 h-2.5 text-white/40" />
                        </div>
                      </motion.div>
                    </div>
                    <p className="text-xs text-[#6E6E73] font-light leading-relaxed">
                      Navega, lee o escribe en el diario mientras la práctica suena de fondo.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD 4 — Diario Personal */}
              <motion.div initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.85, delay: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="min-w-[80vw] md:min-w-0 shrink-0 md:shrink">
                <motion.div whileHover={{ y: -7 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-2xl overflow-hidden cursor-none"
                  style={{ boxShadow: '0 20px 60px rgba(139,92,246,0.09), 0 4px 20px rgba(0,0,0,0.06)' }}>
                  <div className="px-4 pt-4 pb-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'linear-gradient(135deg,#8b5cf6,#6d28d9)' }}>
                      <Book className="w-4 h-4 text-white" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-serif text-base font-semibold text-[#1D1D1F]">Diario Personal</div>
                      <div className="text-[11px] text-[#6E6E73]">Privado · Solo para el alumno</div>
                    </div>
                    <div className="hidden sm:block bg-purple-50 text-purple-700 text-[10px] font-bold px-2 py-1 rounded-full border border-purple-100 shrink-0">12 entradas</div>
                  </div>
                  <div className="px-3 pb-4">
                    <div className="bg-[#F5F5F7] rounded-xl p-2 space-y-1.5 mb-2.5">
                      {[
                        { date: 'Hoy, 9:14', preview: 'Durante la meditación sentí una claridad que no había experimentado…', mood: '🌊' },
                        { date: 'Ayer', preview: 'La semana 3 me ha removido mucho. El ejercicio de integración fue…', mood: '🌿' },
                        { date: 'Mar 28', preview: 'Empiezo a entender el patrón de respuesta del vídeo…', mood: '✨' },
                      ].map((entry, ei) => (
                        <div key={ei} className="bg-white rounded-lg px-2.5 py-2 flex items-start gap-2 cursor-none">
                          <span className="text-base shrink-0">{entry.mood}</span>
                          <div className="flex-1 min-w-0">
                            <div className="text-[10px] text-[#6E6E73] font-medium">{entry.date}</div>
                            <p className="text-[11px] text-[#1D1D1F] leading-snug line-clamp-1 mt-0.5">{entry.preview}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                    {/* Input simulado */}
                    <motion.div className="rounded-xl border border-purple-100 px-3 py-2 flex items-center gap-2.5 cursor-none mb-2.5"
                      style={{ background: 'rgba(139,92,246,0.03)' }}
                      animate={{ borderColor: ['rgba(139,92,246,0.15)', 'rgba(139,92,246,0.4)', 'rgba(139,92,246,0.15)'] }}
                      transition={{ duration: 3, repeat: Infinity }}>
                      <span className="text-sm">📝</span>
                      <span className="text-xs text-gray-300 font-light italic flex-1">¿Qué quieres anotar hoy?</span>
                      <motion.div className="w-0.5 h-3 bg-purple-400"
                        animate={{ opacity: [1, 0, 1] }} transition={{ duration: 1, repeat: Infinity }} />
                    </motion.div>
                    <p className="text-xs text-[#6E6E73] font-light leading-relaxed">
                      Un espacio privado de reflexión. Fomenta la retención y el compromiso del alumno.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              </div>{/* end overflow-x-auto */}
            </div>{/* end relative */}
          </div>
        </section>

        {/* ═══ WHITE-LABEL — CINEMATIC ══════════════════════════════ */}
        <section data-fi-section="home-wl" data-fi-label="White Label" className="py-10 md:py-16 px-6 bg-white relative overflow-hidden">
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 700, height: 700, background: 'rgba(188,150,64,0.06)', top: '-20%', left: '40%' }}
            animate={{ x: [0, 30, 0], y: [0, -25, 0] }} transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }} />

          <div className="max-w-7xl mx-auto relative z-10">
            <motion.div className="text-center mb-10"
              initial={{ opacity: 0, y: 55 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}>
              <Pill label="White-label total" />
              <h2 data-fi-key="home.wl.title" className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold text-[#1D1D1F] mb-6 leading-[1.05]">
                {cv('home.wl.title', 'Tu marca en el centro. Sin rastro del proveedor.')}
              </h2>
              <p data-fi-key="home.wl.sub" className="text-xl text-[#6E6E73] font-light max-w-2xl mx-auto">{cv('home.wl.sub', 'Cada píxel lleva tu identidad. Tus alumnos nunca sabrán qué tecnología hay detrás.')}</p>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-7">

              {/* CARD WL-1 — Tu logo y colores */}
              <motion.div initial={{ opacity: 0, y: 70, rotate: -1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-3xl overflow-hidden border border-amber-50 cursor-none h-full"
                  style={{ boxShadow: '0 20px 60px rgba(188,150,64,0.1), 0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#BC9640,#795901)' }}>
                      <Palette className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-semibold text-[#1D1D1F]">Tu logo y colores</div>
                      <div className="text-xs text-[#6E6E73]">Identidad visual completa</div>
                    </div>
                  </div>
                  <div className="px-5 pb-6">
                    {/* Simulación panel branding */}
                    <div className="bg-[#F5F5F7] rounded-2xl p-4 mb-4">
                      {/* Preview header de academia */}
                      <div className="bg-white rounded-xl overflow-hidden border border-gray-100 mb-4 shadow-sm">
                        <div className="h-10 flex items-center px-4 gap-3" style={{ background: 'linear-gradient(90deg,#1D1D1F 0%,#2d2d2d 100%)' }}>
                          <div className="w-6 h-6 rounded-lg bg-amber-400 flex items-center justify-center text-[10px] font-bold text-black">A</div>
                          <span className="text-white text-xs font-semibold">AcademiaDemo</span>
                          <div className="flex-1" />
                          <div className="w-16 h-5 rounded-full bg-amber-400 flex items-center justify-center text-[9px] font-bold text-black">Entrar</div>
                        </div>
                        <div className="p-3 space-y-2">
                          <div className="h-2 w-2/3 rounded" style={{ background: '#1D1D1F' }} />
                          <div className="h-1.5 w-full rounded bg-gray-100" />
                          <div className="h-1.5 w-4/5 rounded bg-gray-100" />
                        </div>
                      </div>
                      {/* Paleta de colores */}
                      <div className="text-[10px] text-[#6E6E73] mb-2 font-medium uppercase tracking-wider">Colores de marca</div>
                      <div className="flex gap-2 mb-3">
                        {[
                          { c: '#1D1D1F', label: 'Principal' },
                          { c: '#BC9640', label: 'Acento' },
                          { c: '#F5F5F7', label: 'Fondo' },
                          { c: '#2b7d7a', label: 'CTA' },
                        ].map((sw, si) => (
                          <motion.div key={si} whileHover={{ scale: 1.15, y: -2 }}
                            className="flex-1 rounded-lg cursor-none"
                            style={{ background: sw.c, aspectRatio: '1', boxShadow: '0 2px 8px rgba(0,0,0,0.15)' }}
                            title={sw.label} />
                        ))}
                      </div>
                      {/* Tipografía */}
                      <div className="text-[10px] text-[#6E6E73] mb-1 font-medium uppercase tracking-wider">Tipografía</div>
                      <div className="bg-white rounded-xl px-3 py-2 flex items-center justify-between">
                        <span className="font-serif text-base font-semibold text-[#1D1D1F]">Playfair Display</span>
                        <span className="text-[10px] text-green-600 font-semibold bg-green-50 px-2 py-0.5 rounded-full">Activa</span>
                      </div>
                    </div>
                    <p className="text-sm text-[#6E6E73] font-light leading-relaxed">
                      Personaliza cada elemento visual desde el panel. Tus alumnos ven tu marca en cada pantalla.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD WL-2 — Tu dominio */}
              <motion.div initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-3xl overflow-hidden border border-teal-50 cursor-none h-full"
                  style={{ boxShadow: '0 20px 60px rgba(43,125,122,0.1), 0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg,#2b7d7a,#1a5c5a)' }}>
                      <Globe className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-semibold text-[#1D1D1F]">Tu dominio propio</div>
                      <div className="text-xs text-[#6E6E73]">SSL incluido · Configuración en 5 min</div>
                    </div>
                  </div>
                  <div className="px-5 pb-6">
                    <div className="bg-[#F5F5F7] rounded-2xl p-4 mb-4 space-y-3">
                      {/* URL antes */}
                      <div>
                        <div className="text-[10px] text-red-400 font-bold uppercase tracking-wider mb-1.5">❌ Sin AulaOS</div>
                        <div className="bg-white rounded-xl px-3 py-2.5 flex items-center gap-2 border border-red-100">
                          <span className="text-red-400 text-xs">⚠</span>
                          <span className="text-xs text-gray-400 font-mono">teachable.com/<strong className="text-gray-600">tu-academia</strong></span>
                        </div>
                      </div>
                      {/* URL después */}
                      <motion.div initial={{ opacity: 0, scale: 0.96 }} whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }} transition={{ delay: 0.4 }}>
                        <div className="text-[10px] text-green-600 font-bold uppercase tracking-wider mb-1.5">✓ Con AulaOS</div>
                        <div className="rounded-xl px-3 py-2.5 flex items-center gap-2 border border-green-200" style={{ background: 'linear-gradient(135deg,#f0fdf4,#f7fef7)' }}>
                          <span className="text-green-500 text-xs">🔒</span>
                          <span className="text-xs font-mono"><strong className="text-green-700">academia.tumarca.com</strong></span>
                        </div>
                      </motion.div>
                      {/* SSL badge */}
                      <motion.div className="flex items-center gap-3 bg-white rounded-xl px-4 py-3 border border-gray-100"
                        initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.55 }}>
                        <ShieldCheck className="w-6 h-6 text-green-500 shrink-0" />
                        <div>
                          <div className="text-xs font-bold text-[#1D1D1F]">SSL Certificado</div>
                          <div className="text-[10px] text-[#6E6E73]">Renovación automática · Let's Encrypt</div>
                        </div>
                        <motion.div className="ml-auto w-2 h-2 rounded-full bg-green-400"
                          animate={{ scale: [1, 1.4, 1], opacity: [1, 0.5, 1] }} transition={{ duration: 2, repeat: Infinity }} />
                      </motion.div>
                    </div>
                    <p className="text-sm text-[#6E6E73] font-light leading-relaxed">
                      Configura tu DNS en minutos. Certificado SSL gratuito y renovación automática incluidos.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* CARD WL-3 — Tus comunicaciones */}
              <motion.div initial={{ opacity: 0, y: 70, rotate: 1.5 }}
                whileInView={{ opacity: 1, y: 0, rotate: 0 }} viewport={{ once: true, margin: '-50px' }}
                transition={{ duration: 0.85, delay: 0.22, ease: [0.22, 1, 0.36, 1] }}>
                <motion.div whileHover={{ y: -8 }} transition={{ type: 'spring', stiffness: 260, damping: 20 }}
                  className="bg-white rounded-3xl overflow-hidden border border-gray-100 cursor-none h-full"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.06), 0 4px 20px rgba(0,0,0,0.05)' }}>
                  <div className="px-6 pt-6 pb-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-2xl bg-[#1D1D1F] flex items-center justify-center">
                      <Mail className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <div className="font-serif text-xl font-semibold text-[#1D1D1F]">Emails con tu marca</div>
                      <div className="text-xs text-[#6E6E73]">Bienvenida · Recordatorios · Avisos</div>
                    </div>
                  </div>
                  <div className="px-5 pb-6">
                    {/* Preview email */}
                    <motion.div className="rounded-2xl overflow-hidden border border-gray-100 mb-4 shadow-sm"
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.3 }}>
                      {/* Email header */}
                      <div className="bg-gray-50 px-4 py-2.5 border-b border-gray-100">
                        <div className="flex items-center gap-2 text-[11px] text-gray-500">
                          <span className="font-medium">De:</span>
                          <span className="text-[#1D1D1F] font-semibold">Academia Demo &lt;hola@academiAdemo.com&gt;</span>
                        </div>
                        <div className="flex items-center gap-2 text-[11px] text-gray-500 mt-0.5">
                          <span className="font-medium">Asunto:</span>
                          <span>¡Bienvenida, María! Tu acceso está listo 🎉</span>
                        </div>
                      </div>
                      {/* Email body */}
                      <div className="bg-white px-4 py-4">
                        <div className="flex items-center gap-2 mb-3">
                          <div className="w-7 h-7 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
                            <div className="w-3 h-3 rounded-full bg-amber-400" />
                          </div>
                          <span className="font-serif font-semibold text-sm text-[#1D1D1F]">AcademiaDemo</span>
                        </div>
                        <div className="space-y-1.5">
                          <div className="h-2 w-4/5 bg-gray-100 rounded" />
                          <div className="h-2 w-full bg-gray-100 rounded" />
                          <div className="h-2 w-3/4 bg-gray-100 rounded" />
                        </div>
                        <motion.div className="mt-3 bg-[#1D1D1F] rounded-lg px-4 py-2 inline-flex items-center gap-2 text-white text-xs font-semibold"
                          animate={{ boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 4px 20px rgba(0,0,0,0.2)', '0 0 0 rgba(0,0,0,0)'] }}
                          transition={{ duration: 2.5, repeat: Infinity }}>
                          Acceder a mi academia →
                        </motion.div>
                      </div>
                    </motion.div>
                    {/* Email types */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {['Bienvenida', 'Nueva semana', 'Pago recibido', 'Recordatorio'].map((tag, ti) => (
                        <motion.div key={ti}
                          initial={{ opacity: 0, scale: 0.8 }} whileInView={{ opacity: 1, scale: 1 }}
                          viewport={{ once: true }} transition={{ delay: 0.4 + ti * 0.07 }}
                          className="text-[11px] font-medium px-2.5 py-1 rounded-full bg-gray-50 border border-gray-100 text-[#6E6E73]">
                          {tag}
                        </motion.div>
                      ))}
                    </div>
                    <p className="text-sm text-[#6E6E73] font-light leading-relaxed">
                      Todos los emails salen desde tu dirección, con tu nombre y tu diseño. Sin mencionar AulaOS.
                    </p>
                  </div>
                </motion.div>
              </motion.div>

            </div>
          </div>
        </section>

        {/* ═══ QUÉ INCLUYE — LIGHT GRAY ════════════════════════════ */}
        <section id="incluye" className="py-10 md:py-16 px-6 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto">
            <Reveal className="mb-8">
              <Pill label="Todo incluido" />
              <h2 className="font-serif text-5xl font-semibold text-[#1D1D1F] mb-5">¿Qué incluye la plataforma?</h2>
              <p className="text-xl text-[#6E6E73] font-light max-w-2xl">Todo lo que necesitas para operar una academia digital profesional, estructurado para crecer contigo.</p>
            </Reveal>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { col: 'Para el creador', accent: 'text-[#2b7d7a]', border: 'border-t-[#2b7d7a]', items: [{ icon: Settings, t: 'Panel de administración', d: 'Gestiona cursos, alumnos y contenido desde un editor visual.' }, { icon: CreditCard, t: 'Pagos con Stripe', d: 'Crea planes de membresía y cobra automáticamente.' }, { icon: Lock, t: 'Control de acceso', d: 'Define qué contenido ve cada nivel de suscripción.' }, { icon: ImageIcon, t: 'Galería multimedia', d: 'Sube y organiza imágenes, vídeos y audios.' }, { icon: Layout, t: 'Edición de la plataforma', d: 'Personaliza colores, textos, secciones y estructura sin tocar código.' }] },
                { col: 'Para el alumno', accent: 'text-[#BC9640]', border: 'border-t-[#BC9640]', items: [{ icon: Film, t: 'Vídeos en HD', d: 'Reproductor seguro y nativo, sin distracciones.' }, { icon: Headphones, t: 'Audios y meditaciones', d: 'Mini-player flotante persistente.' }, { icon: Calendar, t: 'Programa semanal', d: 'Contenido estructurado con seguimiento de progreso.' }, { icon: Book, t: 'Diario personal', d: 'Espacio privado de reflexión y journaling.' }, { icon: Users, t: 'Comunidad de alumnos', d: 'Espacio compartido para interactuar, compartir y crecer juntos.' }] },
                { col: 'Plataforma', accent: 'text-[#6E6E73]', border: 'border-t-gray-300', items: [{ icon: ShieldCheck, t: 'Autenticación segura', d: 'Registro y login con Supabase Auth.' }, { icon: Smartphone, t: '100% responsive', d: 'Perfecto en móvil, tablet y escritorio.' }, { icon: Palette, t: 'White-label', d: 'Tu logo, tus colores, tu dominio.' }, { icon: Zap, t: 'Alta velocidad', d: 'Arquitectura moderna, carga instantánea.' }, { icon: Mail, t: 'Emails automáticos', d: 'Bienvenidas, pagos, recordatorios y acceso enviados desde tu dominio.' }] },
              ].map((col, ci) => (
                <Reveal key={ci} delay={ci * 0.1}>
                  <div className={`bg-white rounded-3xl p-8 shadow-sm border-t-4 ${col.border} h-full`}>
                    <div className={`text-sm font-bold tracking-wider uppercase mb-8 ${col.accent}`}>{col.col}</div>
                    <div className="space-y-5">
                      {col.items.map((item, i) => (
                        <motion.div key={i} initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: ci * 0.08 + i * 0.06 }}
                          className="flex gap-4 group cursor-none p-2 rounded-xl hover:bg-gray-50 transition-colors">
                          <div className="mt-0.5 w-10 h-10 rounded-xl bg-gray-50 group-hover:bg-white border border-gray-100 flex items-center justify-center shrink-0 transition-colors shadow-sm">
                            <item.icon className="w-4 h-4 text-gray-500" />
                          </div>
                          <div>
                            <div className="font-semibold text-[#1D1D1F] mb-1">{item.t}</div>
                            <p className="text-sm text-[#6E6E73] font-light leading-relaxed">{item.d}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ COMPARATIVA — WHITE ══════════════════════════════════ */}
        <section id="comparativa" className="py-10 md:py-16 px-6 bg-white">
          <div className="max-w-6xl mx-auto">
            <Reveal className="text-center mb-8">
              <Pill label="Comparativa" />
              <h2 className="font-serif text-5xl md:text-6xl font-semibold text-[#1D1D1F] mb-5">La comparativa definitiva</h2>
              <p className="text-xl text-[#6E6E73] font-light">Mira cómo nos comparamos con las opciones tradicionales.</p>
            </Reveal>
            <Reveal delay={0.1}>
              {/* Hint de deslizamiento — solo visible en mobile */}
              <div className="flex items-center justify-end gap-1.5 mb-2 md:hidden">
                <span className="text-xs text-[#6E6E73] font-medium">Desliza para ver más</span>
                <motion.div animate={{ x: [0, 5, 0] }} transition={{ duration: 1.2, repeat: Infinity, ease: 'easeInOut' }}>
                  <ArrowRight className="w-3.5 h-3.5 text-[#6E6E73]" />
                </motion.div>
              </div>
              <div className="relative">
                {/* Gradient fade derecho — indica que hay más contenido */}
                <div className="absolute right-0 top-0 bottom-0 w-12 pointer-events-none z-10 md:hidden rounded-r-3xl"
                  style={{ background: 'linear-gradient(90deg, transparent, rgba(245,245,247,0.9))' }} />
                <div className="overflow-x-auto -mx-6 px-6 rounded-3xl">
                <table className="w-full min-w-[800px] border-collapse rounded-3xl overflow-hidden shadow-sm border border-gray-100">
                  <thead>
                    <tr className="bg-gray-50">
                      <th className="p-5 text-left text-sm font-medium text-[#6E6E73] w-1/4">Funcionalidad</th>
                      <th className="p-5 text-center font-bold w-[22%] bg-[#2b7d7a] text-white rounded-t-2xl">
                        <div className="flex items-center justify-center gap-2"><Sparkles className="w-4 h-4 text-[#BC9640]" /> Esta LMS</div>
                      </th>
                      {['Moodle', 'Teachable', 'Kajabi'].map(h => <th key={h} className="p-5 text-center font-medium text-[#6E6E73] w-[18%]">{h}</th>)}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Precio mensual', 'Fijo', 'Variable', '+ comisiones', '€150+'],
                      ['White-label completo', true, 'Parcial', false, true],
                      ['Diario del alumno', true, false, false, false],
                      ['Programa semanal integrado', true, 'Plugin', false, false],
                      ['Mini-player de audio', true, false, false, false],
                      ['Sin comisiones por venta', true, true, false, true],
                      ['Instalación incluida', true, false, true, true],
                      ['Soporte personalizado', true, false, 'Email', 'Email'],
                    ].map((row, i) => (
                      <motion.tr key={i} initial={{ opacity: 0, y: 6 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.04 }}
                        className="group hover:bg-gray-50 transition-colors border-b border-gray-100">
                        <td className="p-5 font-medium text-[#1D1D1F]">{row[0]}</td>
                        <td className="p-5 text-center font-bold bg-[#2b7d7a]/5 group-hover:bg-[#2b7d7a]/10 text-[#2b7d7a] transition-colors">
                          {typeof row[1] === 'boolean' ? (row[1] ? <Check className="w-5 h-5 mx-auto" /> : <X className="w-5 h-5 mx-auto text-red-300" />) : row[1]}
                        </td>
                        {[row[2], row[3], row[4]].map((cell, j) => (
                          <td key={j} className="p-5 text-center text-[#6E6E73]">
                            {typeof cell === 'boolean' ? (cell ? <Check className="w-4 h-4 mx-auto text-gray-400" /> : <X className="w-4 h-4 mx-auto text-gray-200" />) : cell}
                          </td>
                        ))}
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ ADMIN + PAGOS — LIGHT ════════════════════════════════ */}
        <section className="py-10 md:py-16 px-6 bg-[#F5F5F7]">
          <div className="max-w-7xl mx-auto space-y-10 md:space-y-16">
            {/* Admin */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <Reveal className="lg:w-1/3">
                <Pill label="Panel admin" />
                <h2 className="font-serif text-4xl font-semibold text-[#1D1D1F] mb-5 leading-tight">Tú controlas todo el contenido</h2>
                <p className="text-lg text-[#6E6E73] font-light leading-relaxed">Un panel intuitivo y potente, diseñado para creadores, no para programadores.</p>
              </Reveal>
              <Reveal delay={0.12} className="lg:w-2/3">
                <div className="grid sm:grid-cols-2 gap-3 bg-white p-8 md:p-10 rounded-3xl border border-gray-100 shadow-sm">
                  {[{ icon: Layout, t: 'Editor de bloques visual' }, { icon: BookOpen, t: 'Gestión de cursos y módulos' }, { icon: Lock, t: 'Control de acceso por plan' }, { icon: FolderTree, t: 'Galería multimedia centralizada' }, { icon: Users, t: 'Gestión de alumnos y suscripciones' }, { icon: BarChart3, t: 'Métricas de progreso y retención' }].map((f, i) => (
                    <motion.div key={i} initial={{ opacity: 0, scale: 0.93 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
                      whileHover={{ x: 5 }} className="flex items-center gap-4 group cursor-none p-3 rounded-2xl hover:bg-gray-50 transition-colors">
                      <div className="w-11 h-11 rounded-xl bg-gray-50 group-hover:bg-[#2b7d7a]/10 border border-gray-100 flex items-center justify-center transition-colors">
                        <f.icon className="w-4 h-4 text-gray-500 group-hover:text-[#2b7d7a] transition-colors" />
                      </div>
                      <span className="font-medium text-[#1D1D1F]">{f.t}</span>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>

            {/* Pagos */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 items-center">
              <Reveal delay={0.1} className="lg:w-1/2 order-2 lg:order-1">
                <Card3D>
                  <div className="relative bg-white rounded-3xl border border-gray-100 p-8 shadow-xl">
                    <div className="absolute inset-0 rounded-3xl" style={{ background: 'linear-gradient(135deg,rgba(43,125,122,0.04) 0%,transparent 60%)' }} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
                        <div className="font-medium text-[#1D1D1F]">Plan Premium</div>
                        <div className="font-serif text-2xl font-bold text-[#1D1D1F]">€99<span className="text-sm font-sans font-normal text-gray-400">/mes</span></div>
                      </div>
                      <div className="space-y-4 mb-8">
                        {[1, 2, 3].map((_, i) => (
                          <div key={i} className="flex gap-3 items-center">
                            <CheckCircle2 className="w-5 h-5 text-[#2b7d7a]" />
                            <div className="h-2 w-32 bg-gray-100 rounded-full" />
                          </div>
                        ))}
                      </div>
                      <button className="w-full py-4 bg-[#1D1D1F] hover:bg-black text-white rounded-xl font-semibold flex items-center justify-center gap-2 cursor-none transition-colors">
                        Pagar con Stripe <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
              <Reveal className="lg:w-1/2 order-1 lg:order-2">
                <Pill label="Stripe integrado" />
                <h2 className="font-serif text-4xl font-semibold text-[#1D1D1F] mb-5 leading-tight">Pagos directos a tu cuenta</h2>
                <p className="text-lg text-[#6E6E73] font-light mb-10 leading-relaxed">Conecta Stripe en un clic. Cobra suscripciones, pagos únicos o cuotas. Sin comisiones por nuestra parte.</p>
                <div className="space-y-5">
                  {[{ s: '01', t: 'Conecta tu Stripe' }, { s: '02', t: 'Crea tus planes de precios' }, { s: '03', t: 'Los alumnos pagan en tu academia' }, { s: '04', t: 'El dinero va a tu banco' }].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -18 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="flex gap-5 items-center">
                      <div className="font-serif text-3xl italic text-[#BC9640]/60 w-10 shrink-0">{item.s}</div>
                      <div className="text-lg font-medium text-[#1D1D1F]">{item.t}</div>
                    </motion.div>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ PRECIOS — DARK + CINEMATIC 3D ═══════════════════════════ */}
        <section id="precios" data-fi-section="home-precios" data-fi-label="Precios" className="py-10 md:py-16 px-6 bg-[#030306] relative overflow-hidden">
          {/* Orbs de fondo */}
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 700, height: 700, background: 'rgba(188,150,64,0.12)', top: '-15%', right: '-10%' }}
            animate={{ x: [0,-35,0], y: [0,25,0] }} transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }} />
          <motion.div className="absolute rounded-full blur-3xl pointer-events-none"
            style={{ width: 500, height: 500, background: 'rgba(43,125,122,0.1)', bottom: '-10%', left: '-10%' }}
            animate={{ x: [0,28,0], y: [0,-20,0] }} transition={{ duration: 11, repeat: Infinity, ease: 'easeInOut', delay: 2 }} />
          {/* Grid pattern sutil */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.025]"
            style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.5) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.5) 1px,transparent 1px)', backgroundSize: '80px 80px' }} />

          <div className="max-w-7xl mx-auto relative z-10">
            {/* Header */}
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
              <Pill label="Precios" dark />
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl font-semibold mb-6 leading-[1.04]" style={gradStyle}>
                Elige tu camino
              </h2>
              <p className="text-xl font-light max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.72)' }}>
                Dos formas de lanzar tu academia. Misma tecnología, distinto nivel de acompañamiento.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto items-start">

              {/* ── CARD: TEMPLATE TU ACADEMIA ────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, ease: [0.22,1,0.36,1] }}>
                <motion.div
                  whileHover={{ y: -8, rotateY: 2, rotateX: -1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  style={{ transformPerspective: 1000, transformStyle: 'preserve-3d', background: 'rgba(20,20,28,0.9)', border: '1px solid rgba(255,255,255,0.09)', boxShadow: '0 30px 80px rgba(0,0,0,0.5)' }}
                  className="rounded-3xl overflow-hidden cursor-none relative">
                  {/* Badge lanzamiento */}
                  <div className="absolute top-5 right-5 z-20 bg-[#BC9640] text-[#030306] text-[10px] font-black tracking-widest uppercase px-3 py-1.5 rounded-full">
                    Precio Lanzamiento
                  </div>
                  {/* Top accent */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#BC9640,#795901)' }} />
                  <div className="p-8">
                    {/* Plan name */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(188,150,64,0.15)', border: '1px solid rgba(188,150,64,0.25)' }}>
                        <span className="text-xl">🗂️</span>
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#BC9640' }}>Autónomo · Una sola vez</div>
                        <div data-fi-key="home.precio.template.name" className="font-serif text-2xl font-semibold text-white">{cv('home.precio.template.name', 'Template Tu Academia')}</div>
                      </div>
                    </div>
                    {/* Precio */}
                    <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-end gap-3 mb-2">
                        <span data-fi-key="home.precio.template.price" className="font-serif text-6xl font-bold text-white leading-none">{cv('home.precio.template.price', '€597')}</span>
                        <div className="mb-2 flex flex-col gap-1">
                          <span className="text-sm line-through" style={{ color: 'rgba(255,255,255,0.50)' }}>€997</span>
                          <span data-fi-key="home.precio.template.period" className="text-xs font-bold text-[#BC9640]">{cv('home.precio.template.period', 'pago único')}</span>
                        </div>
                      </div>
                      <p data-fi-key="home.precio.template.desc" className="text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>
                        {cv('home.precio.template.desc', 'Recibes el código completo. Tú gestionas hosting, soporte y actualizaciones.')}
                      </p>
                    </div>
                    {/* Incluye */}
                    <div className="space-y-3 mb-8">
                      {[
                        { t: 'Código fuente completo (React + Node + Supabase)', star: false },
                        { t: 'Template basado en Frecuencia Integral Academy', star: true },
                        { t: 'Panel de administración listo para usar', star: false },
                        { t: 'Integración Stripe configurada', star: false },
                        { t: 'Manual del Administrador (9 capítulos)', star: true },
                        { t: 'Variables de entorno documentadas', star: false },
                        { t: 'Guía de deploy en Vercel/Netlify', star: false },
                        { t: 'Soporte por email durante 30 días', star: false },
                      ].map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.055 }}
                          className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(188,150,64,0.15)', border: '1px solid rgba(188,150,64,0.25)' }}>
                            <Check className="w-3 h-3" style={{ color: '#BC9640' }} />
                          </div>
                          <span className="text-sm leading-relaxed" style={{ color: item.star ? '#fff' : 'rgba(255,255,255,0.92)' }}>
                            {item.star && <span className="text-[#BC9640] mr-1.5">✦</span>}{item.t}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Manual preview */}
                    <motion.div className="rounded-2xl mb-8 overflow-hidden"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.7 }}>
                      <div className="px-4 py-3 flex items-center gap-2.5" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)', background: 'rgba(188,150,64,0.06)' }}>
                        <span className="text-base">📖</span>
                        <span className="text-sm font-semibold" style={{ color: '#BC9640' }}>Manual del Administrador</span>
                        <span className="ml-auto text-[10px] font-medium" style={{ color: 'rgba(255,255,255,0.60)' }}>9 capítulos · PDF</span>
                      </div>
                      <div className="p-4 grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {[
                          'Instalación y variables de entorno',
                          'Personalización de marca',
                          'Gestión de semanas y módulos',
                          'Biblioteca multimedia',
                          'Configuración de Stripe',
                          'Panel de alumnos y roles',
                          'Arteterapia y comunidad',
                          'Diario personal del alumno',
                          'Deploy y actualizaciones',
                        ].map((cap, ci) => (
                          <motion.div key={ci}
                            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                            viewport={{ once: true }} transition={{ delay: 0.75 + ci * 0.04 }}
                            className="flex items-center gap-2">
                            <span className="text-[10px] font-bold tabular-nums" style={{ color: '#BC9640' }}>
                              {String(ci + 1).padStart(2,'0')}
                            </span>
                            <span className="text-[11px] font-medium truncate" style={{ color: 'rgba(255,255,255,0.90)' }}>{cap}</span>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA */}
                    <motion.a href="mailto:info@aulaos.com?subject=Quiero el Template Tu Academia&body=Hola, quiero adquirir el Template Tu Academia."
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="block w-full py-4 rounded-2xl text-center font-semibold text-base cursor-none transition-all"
                      style={{ background: 'rgba(188,150,64,0.14)', border: '1px solid rgba(188,150,64,0.35)', color: '#BC9640' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(188,150,64,0.22)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'rgba(188,150,64,0.14)'; }}>
                      Obtener Template Tu Academia →
                    </motion.a>
                    <p className="text-center text-[11px] mt-3" style={{ color: 'rgba(255,255,255,0.72)' }}>Pago único · Sin suscripción · Entrega en 24–48h</p>
                  </div>
                </motion.div>
              </motion.div>

              {/* ── CARD: PLATAFORMA GESTIONADA ───────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.9, delay: 0.1, ease: [0.22,1,0.36,1] }}>
                <motion.div
                  whileHover={{ y: -8, rotateY: -2, rotateX: -1 }}
                  transition={{ type: 'spring', stiffness: 220, damping: 22 }}
                  style={{ transformPerspective: 1000, transformStyle: 'preserve-3d', background: 'rgba(10,10,18,0.95)', border: '1px solid rgba(43,125,122,0.35)', boxShadow: '0 30px 80px rgba(0,0,0,0.5),0 0 60px rgba(43,125,122,0.1)' }}
                  className="rounded-3xl overflow-hidden cursor-none relative">
                  {/* RECOMENDADO badge */}
                  <div className="absolute top-5 right-5 z-20 flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[10px] font-black tracking-widest uppercase"
                    style={{ background: 'linear-gradient(135deg,#2b7d7a,#1a5c5a)', color: 'white' }}>
                    <Sparkles className="w-3 h-3" /> Recomendado
                  </div>
                  {/* Top accent glow */}
                  <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg,#2b7d7a,#4db6ac)' }} />
                  {/* Glow interior */}
                  <div className="absolute top-0 inset-x-0 h-40 pointer-events-none" style={{ background: 'radial-gradient(ellipse 70% 50% at 50% 0%,rgba(43,125,122,0.12) 0%,transparent 70%)' }} />
                  <div className="p-8 relative z-10">
                    {/* Plan name */}
                    <div className="flex items-center gap-3 mb-7">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(43,125,122,0.15)', border: '1px solid rgba(43,125,122,0.3)' }}>
                        <Zap className="w-6 h-6" style={{ color: '#2b7d7a' }} />
                      </div>
                      <div>
                        <div className="text-xs font-bold tracking-widest uppercase mb-0.5" style={{ color: '#2b7d7a' }}>Gestión completa · Sin comisiones</div>
                        <div data-fi-key="home.precio.gestionado.name" className="font-serif text-2xl font-semibold text-white">{cv('home.precio.gestionado.name', 'Plataforma Gestionada')}</div>
                      </div>
                    </div>
                    {/* Precio */}
                    <div className="mb-8 pb-8" style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="flex items-end gap-3 mb-2">
                        <span data-fi-key="home.precio.gestionado.price" className="font-serif text-6xl font-bold text-white leading-none">{cv('home.precio.gestionado.price', '€147')}</span>
                        <div className="mb-2">
                          <span data-fi-key="home.precio.gestionado.period" className="text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>{cv('home.precio.gestionado.period', '/mes')}</span>
                        </div>
                      </div>
                      {/* Oferta lanzamiento */}
                      <motion.div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold mb-3"
                        style={{ background: 'rgba(43,125,122,0.18)', border: '1px solid rgba(43,125,122,0.4)', color: '#4aaaa6' }}
                        animate={{ opacity: [1,0.7,1] }} transition={{ duration: 2, repeat: Infinity }}>
                        <span className="w-1.5 h-1.5 rounded-full bg-[#4aaaa6] inline-block" />
                        Primeros 3 meses a €97/mes — oferta lanzamiento
                      </motion.div>
                      <p className="text-sm" style={{ color: 'rgba(255,255,255,0.88)' }}>
                        Nosotros instalamos, gestionamos y actualizamos. Tú solo creas contenido.
                      </p>
                    </div>
                    {/* Incluye */}
                    <div className="space-y-3 mb-8">
                      {[
                        { t: 'Instalación y configuración completa (sem. 1–4)', star: true },
                        { t: 'Tu dominio + SSL gestionado por nosotros', star: true },
                        { t: 'White-label 100%: tu logo, colores, tipografía', star: false },
                        { t: 'Stripe conectado a tu cuenta bancaria', star: false },
                        { t: 'Actualizaciones automáticas incluidas', star: false },
                        { t: 'Soporte por email prioritario (48h)', star: false },
                        { t: 'Panel admin + manual de uso incluido', star: true },
                        { t: 'Sin comisiones por venta. Cancela cuando quieras.', star: false },
                      ].map((item, i) => (
                        <motion.div key={i}
                          initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.055 }}
                          className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5" style={{ background: 'rgba(43,125,122,0.18)', border: '1px solid rgba(43,125,122,0.3)' }}>
                            <Check className="w-3 h-3 text-[#2b7d7a]" />
                          </div>
                          <span className="text-sm leading-relaxed" style={{ color: item.star ? '#fff' : 'rgba(255,255,255,0.92)' }}>
                            {item.star && <span className="text-[#4aaaa6] mr-1.5">✦</span>}{item.t}
                          </span>
                        </motion.div>
                      ))}
                    </div>

                    {/* Timeline 4 semanas compacto */}
                    <motion.div className="rounded-2xl p-4 mb-8"
                      style={{ background: 'rgba(43,125,122,0.06)', border: '1px solid rgba(43,125,122,0.15)' }}
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.75 }}>
                      <div className="text-xs font-bold tracking-widest uppercase mb-3" style={{ color: 'rgba(43,125,122,0.8)' }}>🗓 Proceso de lanzamiento</div>
                      <div className="grid grid-cols-2 gap-1 sm:grid-cols-4">
                        {[['S1','Setup'], ['S2','Contenido'], ['S3','Pagos'], ['S4','🚀 Live']].map(([s,l], si) => (
                          <motion.div key={si}
                            initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }} transition={{ delay: 0.85 + si * 0.07 }}
                            className="text-center p-2 rounded-xl"
                            style={si === 3 ? { background: 'rgba(43,125,122,0.2)', border: '1px solid rgba(43,125,122,0.3)' } : { background: 'rgba(255,255,255,0.04)' }}>
                            <div className="text-xs font-bold" style={{ color: si === 3 ? '#4aaaa6' : 'rgba(255,255,255,0.75)' }}>{s}</div>
                            <div className="text-[10px] mt-0.5" style={{ color: si === 3 ? 'rgba(255,255,255,0.80)' : 'rgba(255,255,255,0.65)' }}>{l}</div>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>

                    {/* CTA principal */}
                    <motion.a href="mailto:info@aulaos.com?subject=Quiero empezar con la Plataforma Gestionada&body=Hola, quiero lanzar mi academia con la Plataforma Gestionada."
                      whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      className="block w-full py-4 rounded-2xl text-center font-semibold text-base cursor-none text-white transition-all"
                      style={{ background: 'linear-gradient(135deg,#2b7d7a,#1a5c5a)', boxShadow: '0 8px 32px rgba(43,125,122,0.3)' }}
                      onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(43,125,122,0.5)'; }}
                      onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(43,125,122,0.3)'; }}>
                      Empezar hoy — €97/mes los primeros 3 meses →
                    </motion.a>
                    <p className="text-center text-[11px] mt-3" style={{ color: 'rgba(255,255,255,0.65)' }}>Sin permanencia · Cancela cuando quieras · Setup incluido</p>
                  </div>
                </motion.div>
              </motion.div>

            </div>

            {/* Nota comparativa */}
            <motion.div className="text-center mt-14"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <p className="text-sm" style={{ color: 'rgba(255,255,255,0.50)' }}>
                Kajabi: €149/mes · Teachable Pro: €99/mes + comisiones · Desarrollo a medida: €5.000–€20.000
              </p>
              <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
                ¿Tienes dudas sobre qué plan es el tuyo? <a href="mailto:info@aulaos.com?subject=¿Qué plan me recomiendas?" className="underline cursor-none" style={{ color: 'rgba(255,255,255,0.65)' }}>Escríbenos</a> y te orientamos sin compromiso.
              </p>
            </motion.div>
          </div>
        </section>


        {/* ═══ TIMELINE — WHITE ═════════════════════════════════════ */}
        <section id="onboarding" data-fi-section="home-como" data-fi-label="Cómo Funciona" className="py-10 md:py-16 px-6 bg-white border-t border-gray-100 relative overflow-hidden">
          <div className="max-w-6xl mx-auto relative z-10">
            <motion.div className="text-center mb-8"
              initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }} transition={{ duration: 0.8, ease: [0.22,1,0.36,1] }}>
              <Pill label="Cómo funciona" />
              <h2 data-fi-key="home.como.title" className="font-serif text-5xl md:text-6xl font-semibold mb-5 leading-[1.04] text-[#1D1D1F]">
                {cv('home.como.title', 'Tu academia lista en 4 semanas')}
              </h2>
              <p data-fi-key="home.como.label" className="text-xl font-light max-w-xl mx-auto text-[#6E6E73]">
                {cv('home.como.label', 'Un proceso claro, sin sorpresas. Tú te centras en el contenido, nosotros en la tecnología.')}
              </p>
            </motion.div>

            {/* Barra de progreso visual — igual que la tarjeta de precios */}
            <motion.div className="flex items-center gap-0 max-w-2xl mx-auto mb-16"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.2 }}>
              {[
                { s: 'S1', l: 'Setup', c: '#2b7d7a' },
                { s: 'S2', l: 'Contenido', c: '#4a9d9a' },
                { s: 'S3', l: 'Pagos', c: '#BC9640' },
                { s: 'S4', l: '🚀 Live', c: '#BC9640', highlight: true },
              ].map((step, si) => (
                <div key={si} className="flex items-center flex-1">
                  <motion.div
                    initial={{ scale: 0.7, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }} transition={{ delay: 0.3 + si * 0.1, type: 'spring', stiffness: 220 }}
                    className="flex flex-col items-center"
                    style={{ minWidth: 56 }}>
                    <div className="w-12 h-12 rounded-2xl flex flex-col items-center justify-center mb-2 font-bold text-sm"
                      style={step.highlight
                        ? { background: 'linear-gradient(135deg,#BC9640,#795901)', color: '#fff', boxShadow: '0 4px 20px rgba(188,150,64,0.35)' }
                        : { background: 'rgba(0,0,0,0.04)', border: '1px solid rgba(0,0,0,0.08)', color: step.c }}>
                      {step.s}
                    </div>
                    <span className="text-[11px] font-medium" style={{ color: step.highlight ? '#BC9640' : '#6E6E73' }}>
                      {step.l}
                    </span>
                  </motion.div>
                  {si < 3 && (
                    <motion.div className="flex-1 h-px mx-1"
                      initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.45 + si * 0.1, duration: 0.5 }}
                      style={{ background: 'linear-gradient(90deg,rgba(43,125,122,0.4),rgba(188,150,64,0.4))', transformOrigin: 'left' }} />
                  )}
                </div>
              ))}
            </motion.div>

            {/* Cuatro cards en grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
              {[
                {
                  n: '01', week: 'Semana 1', t: 'Setup y Diseño',
                  d: 'Instalamos la plataforma en tu dominio con tu logo, tipografías y paleta de colores.',
                  items: ['Dominio + SSL', 'Logo y colores', 'Tipografía', 'Panel admin'],
                  color: '#2b7d7a', bg: 'rgba(43,125,122,0.08)', border: 'rgba(43,125,122,0.2)',
                },
                {
                  n: '02', week: 'Semana 2', t: 'Estructura de contenidos',
                  d: 'Creamos tus cursos, semanas y módulos. Subimos el contenido junto contigo.',
                  items: ['Módulos y semanas', 'Vídeos y audios', 'Materiales PDF', 'Control de acceso'],
                  color: '#4a9d9a', bg: 'rgba(43,125,122,0.06)', border: 'rgba(43,125,122,0.15)',
                },
                {
                  n: '03', week: 'Semana 3', t: 'Pagos y pruebas',
                  d: 'Conectamos tu Stripe, creamos los planes de precios y hacemos compras de prueba reales.',
                  items: ['Stripe conectado', 'Planes de precios', 'Emails automáticos', 'Test de compra'],
                  color: '#BC9640', bg: 'rgba(188,150,64,0.07)', border: 'rgba(188,150,64,0.2)',
                },
                {
                  n: '04', week: 'Semana 4', t: '🚀 Lanzamiento',
                  d: 'Abrimos las puertas. Acompañamos tus primeros días con alumnos reales.',
                  items: ['Apertura oficial', 'Primeras ventas', 'Soporte en vivo', 'Métricas activas'],
                  color: '#BC9640', bg: 'rgba(188,150,64,0.1)', border: 'rgba(188,150,64,0.3)',
                  highlight: true,
                },
              ].map((step, i) => (
                <motion.div key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '-40px' }}
                  transition={{ delay: i * 0.1, duration: 0.7, ease: [0.22,1,0.36,1] }}
                  whileHover={{ y: -6 }}
                  className="rounded-2xl p-6 cursor-none"
                  style={{ background: step.bg, border: `1px solid ${step.border}`, boxShadow: step.highlight ? `0 8px 40px rgba(188,150,64,0.15)` : 'none' }}>
                  {/* Número */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[11px] font-bold tracking-widest uppercase" style={{ color: step.color }}>{step.week}</span>
                    <span className="font-mono text-xs font-bold" style={{ color: 'rgba(0,0,0,0.1)' }}>{step.n}</span>
                  </div>
                  <h3 className="font-serif text-xl font-semibold text-[#1D1D1F] mb-3 leading-snug">{step.t}</h3>
                  <p className="text-sm font-light leading-relaxed mb-5 text-[#6E6E73]">{step.d}</p>
                  {/* Mini checklist */}
                  <div className="space-y-2">
                    {step.items.map((item, ii) => (
                      <motion.div key={ii}
                        initial={{ opacity: 0, x: -8 }} whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.08 + ii * 0.04 }}
                        className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: step.color }} />
                        <span className="text-[12px] text-[#6E6E73]">{item}</span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* CTA debajo */}
            <motion.div className="text-center mt-14"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: 0.4 }}>
              <a href="#precios"
                className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base cursor-none transition-all text-white"
                style={{ background: 'linear-gradient(135deg,#2b7d7a,#1a5c5a)', boxShadow: '0 8px 32px rgba(43,125,122,0.25)' }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(43,125,122,0.45)'; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.boxShadow = '0 8px 32px rgba(43,125,122,0.25)'; }}>
                Ver planes y precios <MoveRight className="w-4 h-4" />
              </a>
            </motion.div>
          </div>
        </section>

        {/* ═══ CASO DE ÉXITO — DARK ═════════════════════════════════ */}
        <section data-fi-section="home-caso" data-fi-label="Caso de Éxito" className="py-10 md:py-16 px-6 bg-[#030306] relative overflow-hidden">
          <motion.div animate={{ y: [0, -22, 0] }} transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute rounded-full blur-3xl pointer-events-none w-[500px] h-[500px] bottom-0 right-0 translate-x-1/3 translate-y-1/3"
            style={{ background: 'rgba(188,150,64,0.1)' }} />
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
              <Reveal className="lg:w-1/2">
                <Pill label="Caso real" dark />
                <h2 data-fi-key="home.caso.name" className="font-serif text-5xl font-semibold mb-6 leading-tight" style={gradStyle}>{cv('home.caso.name', 'Frecuencia Integral Academy')}</h2>
                <p data-fi-key="home.caso.desc" className="text-lg font-light mb-12 leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                  {cv('home.caso.desc', 'Frecuencia Integral Academy — Método TCT — es el primer cliente real de AulaOS. Una academia de desarrollo consciente con alumnos activos, pagos con Stripe y contenido multimedia completo.')}
                </p>
                <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-12">
                  {[{ to: 47, suf: '+', label: 'Alumnos activos', c: '#2b7d7a' }, { to: 12, suf: '', label: 'Semanas de contenido', c: '#BC9640' }, { to: 3, suf: '', label: 'Semanas para lanzar', c: 'rgba(255,255,255,0.8)' }].map((s, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                      className="p-5 rounded-2xl text-center cursor-none"
                      style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                      <div className="text-4xl font-bold font-serif mb-2" style={{ color: s.c }}><Counter to={s.to} suffix={s.suf} /></div>
                      <div className="text-xs" style={{ color: 'rgba(255,255,255,0.68)' }}>{s.label}</div>
                    </motion.div>
                  ))}
                </div>
                <Reveal delay={0.1}>
                  <div className="relative p-8 rounded-2xl mb-8 cursor-none" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
                    <span className="text-7xl absolute top-3 left-4 font-serif leading-none" style={{ color: 'rgba(255,255,255,0.07)' }}>"</span>
                    <p className="relative z-10 font-serif text-lg leading-relaxed italic pt-4" style={{ color: 'rgba(255,255,255,0.88)' }}>
                      Lancé mi academia en 3 semanas con mi marca, mis colores y mis precios. Mis alumnos no saben que la tecnología es externa.
                    </p>
                    <div className="mt-4 text-sm font-semibold not-italic" style={{ color: '#BC9640' }}>— Equipo Frecuencia Integral Academy</div>
                  </div>
                </Reveal>
                <a href="/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold cursor-none transition-colors" style={{ color: '#2b7d7a' }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#4db6ac')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#2b7d7a')}>
                  Ver la academia en vivo <MoveRight className="w-5 h-5" />
                </a>
              </Reveal>

              <Reveal delay={0.2} className="lg:w-1/2">
                <Card3D>
                  <div className="rounded-3xl p-8 relative overflow-hidden cursor-none" style={{ background: 'rgba(13,13,20,0.9)', border: '1px solid rgba(255,255,255,0.08)' }}>
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full -translate-y-1/2 translate-x-1/4" style={{ background: 'rgba(188,150,64,0.12)', filter: 'blur(60px)' }} />
                    <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full translate-y-1/2 -translate-x-1/4" style={{ background: 'rgba(43,125,122,0.08)', filter: 'blur(60px)' }} />
                    <div className="relative z-10">
                      <div className="flex items-center justify-between mb-7">
                        <div>
                          <h3 className="font-serif text-2xl font-semibold text-white mb-1">Bienvenida, María</h3>
                          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.62)' }}>Continúa tu proceso de transformación</p>
                        </div>
                        <div className="w-11 h-11 rounded-full flex items-center justify-center text-lg" style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.1)' }}>👩</div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mb-5">
                        {[{ e: '📅', l: 'Programa', a: true }, { e: '🎥', l: 'Multimedia' }, { e: '📓', l: 'Mi Diario' }, { e: '📚', l: 'Materiales' }].map((it, i) => (
                          <motion.div key={i} whileHover={{ scale: 1.03 }} className="rounded-xl p-4 flex flex-col items-center gap-2.5 cursor-none"
                            style={it.a ? { background: 'rgba(188,150,64,0.18)', border: '1px solid rgba(188,150,64,0.28)' } : { background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                            <span className="text-2xl">{it.e}</span>
                            <span className="text-xs font-medium" style={{ color: 'rgba(255,255,255,0.5)' }}>{it.l}</span>
                          </motion.div>
                        ))}
                      </div>
                      <div className="rounded-xl p-4 flex items-center gap-4" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
                        <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ background: 'rgba(255,255,255,0.06)' }}>
                          <Play className="w-4 h-4" style={{ color: 'rgba(255,255,255,0.4)' }} />
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.65)' }}>Meditación de anclaje</div>
                          <div className="h-1.5 rounded-full" style={{ background: 'rgba(255,255,255,0.08)' }}>
                            <div className="w-1/3 h-full rounded-full" style={{ background: '#BC9640' }} />
                          </div>
                        </div>
                        <div className="text-xs" style={{ color: 'rgba(255,255,255,0.22)' }}>04:20</div>
                      </div>
                    </div>
                  </div>
                </Card3D>
              </Reveal>
            </div>
          </div>
        </section>

        {/* ═══ CONTACTO — WHITE ═════════════════════════════════════ */}
        <section className="py-10 md:py-16 px-6 bg-white border-t border-gray-100">
          <div className="max-w-2xl mx-auto text-center">
            <Reveal>
              <Pill label="Contacto" />
              <h2 className="font-serif text-5xl font-semibold text-[#1D1D1F] mb-5">¿Hablamos?</h2>
              <p className="text-lg text-[#6E6E73] font-light mb-12">Cuéntanos tu proyecto y te preparamos una demo personalizada en 24h.</p>
            </Reveal>
            <Reveal delay={0.1}>
              <form onSubmit={(e) => {
                e.preventDefault(); const fd = new FormData(e.currentTarget);
                const subject = encodeURIComponent(`Nuevo proyecto de ${fd.get('name')}`);
                const body = encodeURIComponent(`Email: ${fd.get('email')}\n\n${fd.get('description')}`);
                window.location.href = `mailto:info@aulaos.com?subject=${subject}&body=${body}`;
              }} className="text-left space-y-4">
                {[{ id: 'name', label: 'Nombre', type: 'text', ph: 'Tu nombre completo' }, { id: 'email', label: 'Email', type: 'email', ph: 'tu@email.com' }].map(f => (
                  <div key={f.id}>
                    <label htmlFor={f.id} className="block text-sm font-medium text-[#1D1D1F] mb-2">{f.label}</label>
                    <input type={f.type} id={f.id} name={f.id} required placeholder={f.ph}
                      className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[#1D1D1F] focus:outline-none focus:border-[#2b7d7a] focus:ring-2 focus:ring-[#2b7d7a]/20 transition-all cursor-none placeholder:text-gray-400" />
                  </div>
                ))}
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#1D1D1F] mb-2">Descripción del proyecto</label>
                  <textarea id="description" name="description" required rows={4} placeholder="Cuéntanos un poco sobre tu academia..."
                    className="w-full px-4 py-3.5 rounded-xl border border-gray-200 text-[#1D1D1F] focus:outline-none focus:border-[#2b7d7a] focus:ring-2 focus:ring-[#2b7d7a]/20 transition-all resize-none cursor-none placeholder:text-gray-400" />
                </div>
                <motion.button type="submit" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#1D1D1F] hover:bg-black text-white py-4 rounded-xl font-semibold cursor-none transition-colors shadow-lg">
                  Enviar solicitud
                </motion.button>
              </form>
              <div className="mt-10 pt-8 border-t border-gray-100">
                <p className="text-[#6E6E73] mb-3">O escríbenos directamente a:</p>
                <a href="mailto:info@aulaos.com" className="text-xl font-medium text-[#2b7d7a] hover:text-[#1a5c5a] transition-colors cursor-none">info@aulaos.com</a>
              </div>
            </Reveal>
          </div>
        </section>

        {/* ═══ FAQ — LIGHT GRAY ═════════════════════════════════════ */}
        <section data-fi-section="home-faq" data-fi-label="FAQ" className="py-8 md:py-12 px-6 bg-[#F5F5F7]">
          <div className="max-w-3xl mx-auto">
            <Reveal className="text-center mb-8">
              <h2 className="font-serif text-4xl font-semibold text-[#1D1D1F]">Preguntas frecuentes</h2>
            </Reveal>
            <div className="space-y-3">
              {faqs.map((faq, i) => (
                <Reveal key={i} delay={i * 0.06}>
                  <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm cursor-none hover:shadow-md transition-shadow">
                    <button onClick={() => setOpenFaq(openFaq === i ? null : i)}
                      className="w-full px-6 py-5 text-left flex justify-between items-center cursor-none">
                      <span className="font-medium text-[#1D1D1F] pr-8">{faq.q}</span>
                      <motion.div animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.25 }}>
                        <ChevronDown className="w-5 h-5 text-gray-400 shrink-0" />
                      </motion.div>
                    </button>
                    <AnimatePresence>
                      {openFaq === i && (
                        <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden">
                          <div className="px-6 pb-6 pt-2 text-[#6E6E73] font-light leading-relaxed border-t border-gray-100">{faq.a}</div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* ═══ CTA FINAL — DARK + GOLD ══════════════════════════════ */}
        <section data-fi-section="home-cta" data-fi-label="CTA Final" className="relative py-24 px-6 overflow-hidden flex items-center justify-center text-center">
          <div className="absolute inset-0">
            <motion.div className="absolute inset-0"
              animate={{ background: ['radial-gradient(ellipse 80% 60% at 50% 50%,rgba(188,150,64,0.85) 0%,rgba(121,89,1,0.7) 40%,#030306 78%)', 'radial-gradient(ellipse 100% 80% at 50% 50%,rgba(188,150,64,0.9) 0%,rgba(121,89,1,0.75) 50%,#030306 82%)', 'radial-gradient(ellipse 80% 60% at 50% 50%,rgba(188,150,64,0.85) 0%,rgba(121,89,1,0.7) 40%,#030306 78%)'] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }} />
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top,#030306 0%,transparent 50%)' }} />
          </div>
          <div className="relative z-10 max-w-3xl mx-auto">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}>
              <div className="flex justify-center mb-8">
                {[...Array(5)].map((_, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                    <Star className="w-5 h-5 mx-0.5 fill-white text-white" />
                  </motion.div>
                ))}
              </div>
              <h2 data-fi-key="home.cta.title" className="font-serif text-5xl md:text-7xl font-semibold text-white mb-8 leading-tight">
                {cv('home.cta.title', 'Construye la academia que tu marca merece')}
              </h2>
              <p data-fi-key="home.cta.sub" className="text-xl mb-14 font-light" style={{ color: 'rgba(255,255,255,0.75)' }}>{cv('home.cta.sub', 'Explora la demo interactiva o agenda una sesión personalizada de 30 minutos.')}</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/demo" className="bg-white text-[#030306] px-10 py-5 rounded-full text-lg font-semibold hover:bg-white/90 cursor-none transition-all inline-flex items-center gap-2"
                  style={{ boxShadow: '0 8px 40px rgba(0,0,0,0.5)' }}>
                  <span data-fi-key="home.cta.primary">{cv('home.cta.primary', 'Ver demo interactiva')}</span>
                  <motion.span animate={{ x: [0, 4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}><ArrowRight className="w-5 h-5" /></motion.span>
                </Link>
                <a href="mailto:info@aulaos.com?subject=Solicito una demo personalizada"
                  className="border-2 text-white hover:bg-white/8 px-10 py-5 rounded-full text-lg font-semibold transition-all cursor-none inline-flex items-center gap-2"
                  style={{ borderColor: 'rgba(255,255,255,0.35)' }}>
                  <span data-fi-key="home.cta.secondary">{cv('home.cta.secondary', 'Solicitar demo por email')}</span>
                </a>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ═══ FOOTER ═══════════════════════════════════════════════ */}
        <footer className="py-10 px-6 text-sm font-light" style={{ background: '#030306', color: 'rgba(255,255,255,0.50)', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="w-5 h-5 rounded-md bg-white flex items-center justify-center"><div className="w-1.5 h-1.5 bg-[#030306] rounded-full" /></div>
              <span className="font-serif" style={{ color: 'rgba(255,255,255,0.75)' }}>Aula<span style={{ color: '#BC9640' }}>OS</span></span>
              <span className="ml-2">© {new Date().getFullYear()} Todos los derechos reservados.</span>
            </div>
            <div className="flex gap-6">
              {['Privacidad', 'Términos', 'Aviso Legal'].map(l => (
                <a key={l} href="#" className="cursor-none transition-colors hover:text-white/70">{l}</a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}
