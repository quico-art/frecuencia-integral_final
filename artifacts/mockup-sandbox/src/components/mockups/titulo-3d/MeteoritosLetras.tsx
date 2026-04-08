import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const E = [0.08, 0.98, 0.12, 1] as const;
const SHADOW_3D = '1px 1px 0 #3d2000,2px 2px 0 #4d2c00,3px 3px 0 #5e3800,4px 4px 0 #6f4400,5px 5px 0 #7a4c00,6px 6px 0 #804f00,7px 7px 0 #613d00,8px 8px 18px rgba(0,0,0,0.75)';
const LINE1 = 'Una plataforma hecha';
const LINE2 = 'a tu medida';

function ShotLetter({ ch, delay, fromX, color, on }: { ch: string; delay: number; fromX: number; color: string; on: boolean }) {
  return (
    <motion.span className="inline-block"
      animate={on ? { x: 0, opacity: 1, filter: 'blur(0px)' } : { x: fromX, opacity: 0, filter: 'blur(8px)' }}
      transition={{ duration: 0.65, ease: E, delay: on ? delay : 0 }}
      style={{ color, display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.25em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

function Shot3DLetter({ ch, delay, fromX, on }: { ch: string; delay: number; fromX: number; on: boolean }) {
  return (
    <motion.span className="inline-block"
      animate={on ? { x: 0, opacity: 1, rotateY: 0, filter: 'blur(0px)', scaleX: 1 } : { x: fromX, opacity: 0, rotateY: fromX < 0 ? -60 : 60, filter: 'blur(12px)', scaleX: 1.6 }}
      transition={{ duration: 0.78, ease: E, delay: on ? delay : 0 }}
      style={{ color: '#BC9640', textShadow: SHADOW_3D, display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.28em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

export function MeteoritosLetras() {
  const [on, setOn] = useState(false);

  const replay = useCallback(() => {
    setOn(false);
    setTimeout(() => setOn(true), 80);
  }, []);

  const d1 = 0.05;
  const d2 = d1 + LINE1.length * 0.038 + 0.15;
  const dEnd = d2 + LINE2.length * 0.048 + 0.25;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'linear-gradient(145deg,#02080f 0%,#030510 50%,#050208 100%)' }}>

      <motion.div className="absolute inset-0 pointer-events-none"
        animate={on ? { opacity: 1 } : { opacity: 0 }} transition={{ duration: 1.8, delay: on ? d2 + 0.5 : 0 }}
        style={{ background: 'radial-gradient(ellipse 80% 60% at 30% 50%,rgba(43,125,122,0.1) 0%,transparent 60%)', filter: 'blur(20px)' }} />

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(2,8,15,0.78)', backdropFilter: 'blur(4px)' }}>
          <div className="flex flex-col items-center gap-4">
            <motion.div animate={{ scale: [1, 1.08, 1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#BC9640,#795901)', boxShadow: '0 0 40px rgba(188,150,64,0.5),0 0 80px rgba(188,150,64,0.2)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1"><path d="M8 5v14l11-7z"/></svg>
            </motion.div>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(188,150,64,0.9)' }}>VER ANIMACIÓN</span>
          </div>
        </motion.button>
      )}

      <div className="relative z-10 max-w-3xl mx-auto px-10 w-full" style={{ perspective: '1000px' }}>

        <motion.div
          animate={on ? { x: 0, opacity: 1 } : { x: -400, opacity: 0 }}
          transition={{ duration: 0.6, ease: E, delay: on ? 0 : 0 }} className="mb-5">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(43,125,122,0.18)', color: '#4aaaa6', border: '1px solid rgba(43,125,122,0.35)' }}>
            Nuestra solución
          </span>
        </motion.div>

        {/* Línea 1 — desde la IZQUIERDA letra a letra */}
        <div className="mb-1 overflow-visible relative">
          <h2 className="font-['Playfair_Display'] text-6xl font-semibold leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE1.split('').map((ch, i) => (
              <ShotLetter key={i} ch={ch} delay={d1 + i * 0.038} fromX={-900} color="rgba(255,255,255,0.92)" on={on} />
            ))}
          </h2>
          {/* Rastro de luz que se disuelve */}
          <motion.div className="absolute left-0 top-0 h-full pointer-events-none rounded"
            animate={on ? { width: '0%', opacity: 0 } : { width: '100%', opacity: 0 }}
            transition={{ duration: 0.55, delay: on ? d1 : 0 }}
            style={{ background: 'linear-gradient(90deg,rgba(43,125,122,0.35),transparent)', filter: 'blur(8px)' }} />
        </div>

        {/* Línea 2 — desde la DERECHA letra a letra, 3D */}
        <div className="mb-9 overflow-visible relative">
          <h2 className="font-['Playfair_Display'] text-7xl font-bold leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE2.split('').map((ch, i) => (
              <Shot3DLetter key={i} ch={ch} delay={d2 + i * 0.048} fromX={1000} on={on} />
            ))}
          </h2>
          {/* Rastro dorado desde derecha */}
          <motion.div className="absolute right-0 top-0 h-full pointer-events-none rounded"
            animate={on ? { width: '0%', opacity: 0 } : { width: '0%', opacity: 0 }}
            transition={{ duration: 0.55, delay: on ? d2 : 0 }}
            style={{ background: 'linear-gradient(270deg,rgba(188,150,64,0.45),transparent)', filter: 'blur(10px)' }} />
          <motion.div className="h-0.5 mt-1 rounded-full"
            animate={on ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.6, delay: on ? dEnd - 0.1 : 0, ease: E }}
            style={{ background: 'linear-gradient(90deg,transparent,rgba(188,150,64,0.9),rgba(255,230,80,0.6),rgba(188,150,64,0.9),transparent)', transformOrigin: 'right' }} />
        </div>

        {[
          { e: '💰', t: 'Precio fijo sin comisiones por venta.' },
          { e: '🎨', t: 'White-label real: tu logo, tus colores.' },
          { e: '📦', t: 'Todo en un lugar: vídeos, audios, pagos.' },
        ].map((item, i) => (
          <motion.div key={i}
            animate={on ? { x: 0, opacity: 1 } : { x: -600, opacity: 0 }}
            transition={{ duration: 0.6, ease: E, delay: on ? dEnd + i * 0.13 : 0 }}
            className="flex items-center gap-4 px-5 py-3 mb-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xl">{item.e}</span>
            <span className="text-base font-light" style={{ color: 'rgba(255,255,255,0.62)' }}>{item.t}</span>
          </motion.div>
        ))}

        {on && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: dEnd + 0.7 }}
            onClick={replay}
            className="mt-5 text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/25 transition-colors">
            ↺ repetir
          </motion.button>
        )}
      </div>
    </div>
  );
}
