import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const ease = [0.08, 0.98, 0.18, 1] as const;

const PARTICLES = [
  { x: 12, y: 30, s: 2 }, { x: 85, y: 20, s: 1.5 }, { x: 45, y: 8, s: 2.5 }, { x: 70, y: 75, s: 1.8 },
  { x: 20, y: 85, s: 1.2 }, { x: 92, y: 60, s: 2 }, { x: 5, y: 55, s: 1.6 }, { x: 60, y: 90, s: 1.4 },
  { x: 35, y: 15, s: 2.2 }, { x: 80, y: 45, s: 1 }, { x: 50, y: 50, s: 1.8 }, { x: 15, y: 70, s: 1.3 },
];

function Comet({ fromX, fromY, delay, color = 'rgba(188,150,64,0.6)', length = 120 }: { fromX: number; fromY: number; delay: number; color?: string; length?: number }) {
  return (
    <motion.div className="absolute pointer-events-none overflow-hidden rounded-full"
      style={{ left: `${fromX}%`, top: `${fromY}%`, width: length, height: 2, rotate: Math.atan2(50 - fromY, 50 - fromX) * (180 / Math.PI), transformOrigin: 'right center', background: `linear-gradient(90deg,transparent,${color})` }}
      initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: [0, 1, 0], opacity: [0, 1, 0] }}
      transition={{ duration: 0.8, delay, ease: 'easeOut' }} />
  );
}

const BULLETS = [
  { e: '💰', t: 'Precio fijo sin comisiones por venta.', d: 0.95 },
  { e: '🎨', t: 'White-label real: tu logo, tu marca, tu dominio.', d: 1.15 },
  { e: '📦', t: 'Todo en un lugar: vídeos, audios, pagos y más.', d: 1.35 },
];

export function TormentaDorada() {
  const [on, setOn] = useState(false);
  const replay = useCallback(() => { setOn(false); setTimeout(() => setOn(true), 80); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'linear-gradient(160deg,#01060f 0%,#020a08 40%,#03020a 100%)' }}>

      {/* Partículas de fondo — siempre visibles */}
      <div className="absolute inset-0 pointer-events-none">
        {PARTICLES.map((p, i) => (
          <motion.div key={i} className="absolute rounded-full"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.s, height: p.s, background: i % 3 === 0 ? '#BC9640' : 'white' }}
            animate={{ opacity: [0.05, 0.5, 0.05], scale: [1, 1.5, 1] }}
            transition={{ duration: 2.5 + i * 0.2, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>

      {/* Estelas de cometas — solo cuando on */}
      {on && <>
        <Comet fromX={5} fromY={5} delay={0.05} color="rgba(43,125,122,0.7)" length={160} />
        <Comet fromX={95} fromY={10} delay={0.5} color="rgba(188,150,64,0.8)" length={180} />
        <Comet fromX={2} fromY={60} delay={0.95} color="rgba(255,255,255,0.3)" length={140} />
        <Comet fromX={90} fromY={80} delay={1.3} color="rgba(188,150,64,0.5)" length={120} />
      </>}

      {on && <motion.div className="absolute inset-0 pointer-events-none"
        initial={{ opacity: 0 }} animate={{ opacity: [0, 0.15, 0] }}
        transition={{ duration: 0.4, delay: 0.55 }}
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%,rgba(188,150,64,0.4),transparent)' }} />}

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }} onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(1,6,15,0.80)', backdropFilter: 'blur(4px)' }}>
          <div className="flex flex-col items-center gap-4">
            <motion.div animate={{ scale:[1,1.08,1] }} transition={{ duration:2,repeat:Infinity }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background:'linear-gradient(135deg,#BC9640,#795901)',boxShadow:'0 0 40px rgba(188,150,64,0.5),0 0 80px rgba(188,150,64,0.2)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1"><path d="M8 5v14l11-7z"/></svg>
            </motion.div>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color:'rgba(188,150,64,0.9)' }}>VER ANIMACIÓN</span>
          </div>
        </motion.button>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-10 w-full">

        {/* Pill */}
        <motion.div animate={on?{opacity:1,y:0}:{opacity:0,y:-20}}
          transition={{ duration:0.6,ease,delay:on?0:0 }} className="mb-5">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
            style={{ background:'rgba(43,125,122,0.18)',color:'#4aaaa6',border:'1px solid rgba(43,125,122,0.35)' }}>
            Nuestra solución
          </span>
        </motion.div>

        {/* LÍNEA 1 — entra desde arriba-izquierda */}
        <div className="overflow-visible mb-2 relative">
          <motion.div
            animate={on?{opacity:1,x:0,y:0,rotateZ:0,rotateX:0,scale:1,filter:'blur(0px)'}:{opacity:0,x:-600,y:-200,rotateZ:-12,rotateX:30,scale:1.8,filter:'blur(8px)'}}
            transition={{ duration:0.85,ease,delay:on?0.05:0 }}
            style={{ transformOrigin:'left center' }}>
            <h2 className="font-['Playfair_Display'] text-5xl font-semibold leading-tight"
              style={{ background:'linear-gradient(175deg,#fff 60%,rgba(255,255,255,0.35))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Una plataforma hecha
            </h2>
            {on && <motion.div className="absolute left-0 top-0 w-full h-full pointer-events-none rounded-xl"
              initial={{ opacity:0 }} animate={{ opacity:[0,0.4,0] }}
              transition={{ duration:0.4,delay:0.88 }}
              style={{ background:'linear-gradient(90deg,rgba(43,125,122,0.3),transparent)',filter:'blur(8px)' }} />}
          </motion.div>
        </div>

        {/* LÍNEA 2 — "a tu medida" desde la derecha */}
        <div className="overflow-visible mb-8 relative">
          <motion.div
            animate={on?{opacity:1,x:0,rotateY:0,scale:1,filter:'blur(0px)'}:{opacity:0,x:700,rotateY:-35,scale:1.4,filter:'blur(12px)'}}
            transition={{ duration:0.9,ease,delay:on?0.5:0 }}
            style={{ perspective:800,transformOrigin:'right center' }}
            className="relative">
            <motion.h2 className="font-['Playfair_Display'] text-6xl font-bold leading-tight"
              style={{ background:'linear-gradient(120deg,#BC9640 0%,#f5d483 35%,#fff8e0 50%,#BC9640 65%,#795901 100%)',backgroundSize:'250% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}
              animate={{ backgroundPosition:['0% center','250% center'] }}
              transition={{ duration:3.5,repeat:Infinity,ease:'linear' }}>
              a tu medida
            </motion.h2>
            {on && [...Array(8)].map((_,i) => (
              <motion.div key={i} className="absolute w-1 h-1 rounded-full pointer-events-none"
                style={{ left:'40%',top:'50%',background:'#BC9640' }}
                initial={{ opacity:0,x:0,y:0,scale:0 }}
                animate={{ opacity:[0,1,0],x:Math.cos((i/8)*Math.PI*2)*60,y:Math.sin((i/8)*Math.PI*2)*40,scale:[0,2,0] }}
                transition={{ duration:0.8,delay:0.52+i*0.02 }} />
            ))}
            {on && <motion.div className="absolute inset-0 pointer-events-none rounded-xl"
              initial={{ opacity:0 }} animate={{ opacity:[0,0.5,0] }}
              transition={{ duration:0.6,delay:0.52 }}
              style={{ background:'radial-gradient(ellipse,rgba(188,150,64,0.35),transparent)',filter:'blur(20px)' }} />}
          </motion.div>
        </div>

        {/* BULLETS */}
        <div className="space-y-3">
          {BULLETS.map((item,i) => (
            <motion.div key={i}
              animate={on?{opacity:1,x:0,rotateY:0,scale:1}:{opacity:0,x:-500,rotateY:20,scale:1.2}}
              transition={{ duration:0.65,ease,delay:on?item.d:0 }}
              className="relative flex items-center gap-4 px-5 py-3 rounded-xl overflow-hidden"
              style={{ background:'rgba(255,255,255,0.035)',border:'1px solid rgba(255,255,255,0.07)' }}>
              {on && <motion.div className="absolute left-0 top-0 h-full w-full rounded-xl pointer-events-none"
                initial={{ scaleX:1.5,opacity:0.4 }} animate={{ scaleX:0,opacity:0 }}
                transition={{ duration:0.5,delay:item.d }}
                style={{ background:'linear-gradient(90deg,rgba(43,125,122,0.4),transparent)',transformOrigin:'left' }} />}
              <span className="text-xl">{item.e}</span>
              <span className="text-sm font-light" style={{ color:'rgba(255,255,255,0.55)' }}>{item.t}</span>
            </motion.div>
          ))}
        </div>

        {on && <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:2.1 }}
          onClick={replay}
          className="mt-6 text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/20 transition-colors">
          ↺ repetir
        </motion.button>}
      </div>
    </div>
  );
}
