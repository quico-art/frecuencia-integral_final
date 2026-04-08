import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const E = [0.1, 1, 0.15, 1] as const;
const SHADOW_3D = '1px 1px 0 #3d2000,2px 2px 0 #4a2800,3px 3px 0 #5c3400,4px 4px 0 #6b4000,5px 5px 0 #7a4a00,6px 6px 0 #7a4a00,7px 7px 14px rgba(0,0,0,0.7)';
const LINE1 = 'Una plataforma hecha';
const LINE2 = 'a tu medida';

function DropLetter({ ch, delay, fromY, color, bold, on }: { ch: string; delay: number; fromY: number; color: string; bold?: boolean; on: boolean }) {
  return (
    <motion.span className="inline-block"
      animate={on ? { y: 0, opacity: 1, rotateX: 0, filter: 'blur(0px)' } : { y: fromY, opacity: 0, rotateX: -80, filter: 'blur(6px)' }}
      transition={{ duration: 1.05, ease: E, delay: on ? delay : 0 }}
      style={{ color, fontWeight: bold ? 700 : 400, display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.25em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

function Drop3DLetter({ ch, delay, fromY, on }: { ch: string; delay: number; fromY: number; on: boolean }) {
  return (
    <motion.span className="inline-block"
      animate={on ? { y: 0, opacity: 1, rotateX: 0, scaleY: 1, filter: 'blur(0px)' } : { y: fromY, opacity: 0, rotateX: -90, scaleY: 0.4, filter: 'blur(10px)' }}
      transition={{ duration: 1.2, ease: E, delay: on ? delay : 0 }}
      style={{ color: '#BC9640', textShadow: SHADOW_3D, display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.28em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

export function CascadaLetras() {
  const [on, setOn] = useState(false);

  const replay = useCallback(() => {
    setOn(false);
    setTimeout(() => setOn(true), 80);
  }, []);

  const d1 = 0.05;
  const d2 = d1 + LINE1.length * 0.042 + 0.2;
  const dEnd = d2 + LINE2.length * 0.055 + 0.4;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse 120% 90% at 50% 30%,#040c14 0%,#020407 70%,#010102 100%)' }}>

      <div className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'linear-gradient(90deg,rgba(43,125,122,0.6) 1px,transparent 1px),linear-gradient(rgba(188,150,64,0.4) 1px,transparent 1px)', backgroundSize: '80px 60px' }} />

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(3,12,20,0.75)', backdropFilter: 'blur(4px)' }}>
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

      <div className="relative z-10 max-w-3xl mx-auto px-10 w-full" style={{ perspective: '900px' }}>

        <motion.div animate={on ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -60, filter: 'blur(8px)' }}
          transition={{ duration: 0.7, ease: E, delay: on ? 0 : 0 }} className="mb-5">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(43,125,122,0.18)', color: '#4aaaa6', border: '1px solid rgba(43,125,122,0.35)' }}>
            Nuestra solución
          </span>
        </motion.div>

        <div className="mb-1 overflow-visible" style={{ perspective: '800px' }}>
          <h2 className="font-['Playfair_Display'] text-6xl font-semibold leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE1.split('').map((ch, i) => (
              <DropLetter key={i} ch={ch} delay={d1 + i * 0.042} fromY={-420} color="rgba(255,255,255,0.92)" on={on} />
            ))}
          </h2>
        </div>

        <div className="mb-9 overflow-visible relative" style={{ perspective: '800px' }}>
          <h2 className="font-['Playfair_Display'] text-7xl font-bold leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE2.split('').map((ch, i) => (
              <Drop3DLetter key={i} ch={ch} delay={d2 + i * 0.055} fromY={-520} on={on} />
            ))}
          </h2>
          <motion.div className="h-0.5 mt-1 rounded-full"
            animate={on ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.7, delay: on ? dEnd - 0.1 : 0, ease: E }}
            style={{ background: 'linear-gradient(90deg,transparent,rgba(188,150,64,0.8),rgba(255,220,80,0.5),rgba(188,150,64,0.8),transparent)', transformOrigin: 'left' }} />
        </div>

        {[
          { e: '💰', t: 'Precio fijo sin comisiones por venta.' },
          { e: '🎨', t: 'White-label real: tu logo, tus colores.' },
          { e: '📦', t: 'Todo en un lugar: vídeos, audios, pagos.' },
        ].map((item, i) => (
          <motion.div key={i}
            animate={on ? { opacity: 1, y: 0, filter: 'blur(0px)' } : { opacity: 0, y: -40, filter: 'blur(6px)' }}
            transition={{ duration: 0.7, ease: E, delay: on ? dEnd + i * 0.15 : 0 }}
            className="flex items-center gap-4 px-5 py-3 mb-2 rounded-xl"
            style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xl">{item.e}</span>
            <span className="text-base font-light" style={{ color: 'rgba(255,255,255,0.6)' }}>{item.t}</span>
          </motion.div>
        ))}

        {on && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ delay: dEnd + 0.7 }}
            onClick={replay}
            className="mt-5 text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/25 transition-colors">
            ↺ repetir
          </motion.button>
        )}
      </div>
    </div>
  );
}
