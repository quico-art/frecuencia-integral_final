import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const E = [0.16, 1, 0.3, 1] as const;
const SHADOW_3D = '1px 1px 0 #3d2000,2px 2px 0 #512a00,3px 3px 0 #623300,4px 4px 0 #733d00,5px 5px 0 #7f4700,6px 6px 0 #7f4700,7px 7px 0 #5c3400,8px 8px 20px rgba(0,0,0,0.8)';
const LINE1 = 'Una plataforma hecha';
const LINE2 = 'a tu medida';

function WaveLetter({ ch, delay, fromX, idx, total, color, fontSize, on }: {
  ch: string; delay: number; fromX: number; idx: number; total: number; color: string; fontSize: string; on: boolean;
}) {
  const waveY = Math.sin((idx / total) * Math.PI * 2) * 28;
  return (
    <motion.span className="inline-block"
      animate={on
        ? { x: 0, y: 0, opacity: 1, rotateZ: 0, filter: 'blur(0px)' }
        : { x: fromX, y: fromX > 0 ? waveY : -waveY, opacity: 0, rotateZ: fromX > 0 ? 14 : -14, filter: 'blur(8px)' }}
      transition={{ duration: 0.92, ease: E, delay: on ? delay : 0 }}
      style={{ color, fontSize, display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.26em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

function Wave3DLetter({ ch, delay, idx, total, on }: { ch: string; delay: number; idx: number; total: number; on: boolean }) {
  const waveY = Math.sin((idx / (total - 1)) * Math.PI) * 35;
  return (
    <motion.span className="inline-block"
      animate={on
        ? { x: 0, y: 0, opacity: 1, rotateZ: 0, rotateY: 0, filter: 'blur(0px)', scale: 1 }
        : { x: 750, y: waveY, opacity: 0, rotateZ: 22, rotateY: 55, filter: 'blur(14px)', scale: 1.5 }}
      transition={{ duration: 1.1, ease: E, delay: on ? delay : 0 }}
      style={{ color: '#BC9640', textShadow: SHADOW_3D, fontSize: '4.5rem', fontWeight: 700,
        display: ch === ' ' ? 'inline' : 'inline-block', width: ch === ' ' ? '0.28em' : undefined }}>
      {ch === ' ' ? '\u00a0' : ch}
    </motion.span>
  );
}

export function OlaDorada() {
  const [on, setOn] = useState(false);

  const replay = useCallback(() => {
    setOn(false);
    setTimeout(() => setOn(true), 80);
  }, []);

  const d1 = 0.08;
  const d2 = d1 + LINE1.length * 0.045 + 0.22;
  const dEnd = d2 + LINE2.length * 0.06 + 0.2;

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse 100% 80% at 60% 50%,#030c16 0%,#020509 55%,#010102 100%)' }}>

      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{ backgroundImage: 'linear-gradient(rgba(188,150,64,0.8) 1px,transparent 1px),linear-gradient(90deg,rgba(43,125,122,0.6) 1px,transparent 1px)', backgroundSize: '100px 80px' }} />

      {/* Ola de luz que barre de derecha a izquierda al activar */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={on ? { x: [null, '-100%'], opacity: [0, 0.7, 0] } : { x: '100%', opacity: 0 }}
        transition={{ duration: 1.5, delay: on ? d2 : 0, ease: 'easeInOut' }}
        style={{ background: 'linear-gradient(90deg,transparent 0%,rgba(188,150,64,0.15) 40%,rgba(188,150,64,0.25) 50%,rgba(188,150,64,0.15) 60%,transparent 100%)', filter: 'blur(20px)' }} />

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(3,12,22,0.78)', backdropFilter: 'blur(4px)' }}>
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

        <motion.div animate={on ? { y: 0, opacity: 1, filter: 'blur(0px)' } : { y: 40, opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.8, ease: E, delay: on ? 0 : 0 }} className="mb-5">
          <span className="inline-block text-[11px] font-bold tracking-[0.25em] uppercase px-4 py-1.5 rounded-full"
            style={{ background: 'rgba(43,125,122,0.18)', color: '#4aaaa6', border: '1px solid rgba(43,125,122,0.35)' }}>
            Nuestra solución
          </span>
        </motion.div>

        {/* Línea 1 — ola desde la izquierda */}
        <div className="mb-1 overflow-visible">
          <h2 className="font-['Playfair_Display'] font-semibold leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE1.split('').map((ch, i) => (
              <WaveLetter key={i} ch={ch} delay={d1 + i * 0.045} fromX={-750} idx={i} total={LINE1.length}
                color="rgba(255,255,255,0.92)" fontSize="3.6rem" on={on} />
            ))}
          </h2>
        </div>

        {/* Línea 2 — ola 3D desde la derecha */}
        <div className="mb-8 overflow-visible relative" style={{ perspective: '900px' }}>
          <h2 className="font-['Playfair_Display'] leading-tight" style={{ whiteSpace: 'pre' }}>
            {LINE2.split('').map((ch, i) => (
              <Wave3DLetter key={i} ch={ch} delay={d2 + i * 0.06} idx={i} total={LINE2.length} on={on} />
            ))}
          </h2>
          <motion.div className="absolute inset-0 pointer-events-none"
            animate={on ? { opacity: [0, 0.55, 0] } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: on ? dEnd - 0.1 : 0 }}
            style={{ background: 'radial-gradient(ellipse 80% 100% at 50% 50%,rgba(188,150,64,0.3),transparent)', filter: 'blur(20px)' }} />
          <motion.div className="h-px mt-2 rounded-full"
            animate={on ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
            transition={{ duration: 0.8, delay: on ? dEnd : 0, ease: E }}
            style={{ background: 'linear-gradient(90deg,transparent,rgba(188,150,64,1),rgba(255,230,80,0.7),rgba(188,150,64,1),transparent)', transformOrigin: 'right' }} />
        </div>

        {[
          { e: '💰', t: 'Precio fijo sin comisiones por venta.' },
          { e: '🎨', t: 'White-label real: tu logo, tus colores.' },
          { e: '📦', t: 'Todo en un lugar: vídeos, audios, pagos.' },
        ].map((item, i) => (
          <motion.div key={i}
            animate={on ? { x: 0, opacity: 1, rotateY: 0 } : { x: i % 2 === 0 ? -450 : 450, opacity: 0, rotateY: i % 2 === 0 ? -20 : 20 }}
            transition={{ duration: 0.75, ease: E, delay: on ? dEnd + 0.1 + i * 0.14 : 0 }}
            className="flex items-center gap-4 px-5 py-3 mb-2 rounded-xl"
            style={{ perspective: '600px', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xl">{item.e}</span>
            <span className="text-base font-light" style={{ color: 'rgba(255,255,255,0.62)' }}>{item.t}</span>
          </motion.div>
        ))}

        {on && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: dEnd + 0.9 }}
            onClick={replay}
            className="mt-5 text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 hover:border-white/25 transition-colors">
            ↺ repetir
          </motion.button>
        )}
      </div>
    </div>
  );
}
