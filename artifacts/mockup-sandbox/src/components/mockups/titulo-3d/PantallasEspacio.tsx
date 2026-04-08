import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const STARS = [[8,12,1.5,2.8,0],[18,42,1,3.5,0.4],[32,8,2,2.2,0.8],[45,28,1.2,4,0.2],[60,15,1.8,2.6,1.1],[72,38,1,3.8,0.6],[85,10,2.2,2,0],[90,55,1.4,3.2,0.3],[15,65,1,4.2,0.9],[55,72,1.6,2.8,0.5],[78,80,2,3.5,1.3],[38,85,1.2,2.4,0.7],[25,95,1.8,3.8,0.2],[65,90,1,2.6,1.5],[5,78,2.4,4,0]];
const E = [0.12, 1, 0.2, 1] as const;

function Panel({ children, initial, animate, delay, glow, on }: any) {
  return (
    <motion.div
      animate={on ? animate : initial}
      transition={{ duration: 1.3, ease: E, delay: on ? delay : 0 }}
      style={{ perspective: 1200, transformStyle: 'preserve-3d' }} className="relative">
      <motion.div className="absolute inset-0 rounded-2xl pointer-events-none -z-10"
        animate={on ? { opacity: [0, 0.6, 0], scale: 1.4 } : { opacity: 0 }}
        transition={{ duration: 1.6, delay: on ? delay + 0.15 : 0 }}
        style={{ background: glow, filter: 'blur(40px)' }} />
      <div className="rounded-2xl overflow-hidden" style={{ background: 'rgba(8,12,24,0.88)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(20px)', boxShadow: '0 0 0 1px rgba(255,255,255,0.05),0 40px 80px rgba(0,0,0,0.6)' }}>
        {children}
      </div>
    </motion.div>
  );
}

export function PantallasEspacio() {
  const [on, setOn] = useState(false);
  const replay = useCallback(() => { setOn(false); setTimeout(() => setOn(true), 80); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative"
      style={{ background: 'radial-gradient(ellipse 120% 80% at 50% 40%, #050d18 0%, #020308 60%, #010103 100%)' }}>
      <div className="absolute inset-0 pointer-events-none">
        {STARS.map(([x,y,s,d,dl],i) => (
          <motion.div key={i} className="absolute rounded-full bg-white"
            style={{ left:`${x}%`,top:`${y}%`,width:s,height:s }}
            animate={{ opacity:[0.05,0.7,0.05] }} transition={{ duration:d,repeat:Infinity,delay:dl }} />
        ))}
      </div>
      <motion.div className="absolute pointer-events-none"
        style={{ top:'-8%',left:'15%',right:'15%',height:'75%',background:'linear-gradient(180deg,rgba(43,125,122,0.22) 0%,rgba(188,150,64,0.12) 35%,transparent 75%)',clipPath:'polygon(35% 0%,65% 0%,100% 100%,0% 100%)',filter:'blur(22px)' }}
        animate={{ opacity:[0.6,1,0.6],scaleX:[0.9,1.08,0.9] }} transition={{ duration:6,repeat:Infinity,ease:'easeInOut' }} />

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }} onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(5,13,24,0.80)', backdropFilter: 'blur(4px)' }}>
          <div className="flex flex-col items-center gap-4">
            <motion.div animate={{ scale: [1,1.08,1] }} transition={{ duration: 2, repeat: Infinity }}
              className="w-20 h-20 rounded-full flex items-center justify-center"
              style={{ background: 'linear-gradient(135deg,#BC9640,#795901)', boxShadow: '0 0 40px rgba(188,150,64,0.5),0 0 80px rgba(188,150,64,0.2)' }}>
              <svg viewBox="0 0 24 24" fill="white" className="w-8 h-8 ml-1"><path d="M8 5v14l11-7z"/></svg>
            </motion.div>
            <span className="text-xs tracking-[0.3em] uppercase font-medium" style={{ color: 'rgba(188,150,64,0.9)' }}>VER ANIMACIÓN</span>
          </div>
        </motion.button>
      )}

      <div className="relative z-10 flex flex-col items-start gap-5 max-w-3xl mx-auto px-10 w-full">
        <Panel on={on} delay={0.1}
          initial={{ opacity: 0, scale: 0.06, x: -340, y: -220, rotateX: 45, rotateY: 25, filter: 'blur(30px)' }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, filter: 'blur(0px)' }}
          glow="radial-gradient(ellipse,rgba(43,125,122,0.8),transparent)">
          <div className="px-8 py-5">
            <div className="text-xs font-bold tracking-[0.2em] uppercase mb-2" style={{ color: 'rgba(43,125,122,0.8)' }}>Nuestra solución</div>
            <h2 className="font-['Playfair_Display'] text-4xl font-semibold leading-tight"
              style={{ background:'linear-gradient(180deg,#fff,rgba(255,255,255,0.5))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Una plataforma hecha
            </h2>
          </div>
        </Panel>
        <Panel on={on} delay={0.55}
          initial={{ opacity: 0, scale: 0.04, filter: 'blur(40px)' }}
          animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          glow="radial-gradient(ellipse,rgba(188,150,64,0.9),rgba(188,120,0,0.4),transparent)">
          <div className="px-8 py-5">
            <motion.h2 className="font-['Playfair_Display'] text-5xl font-bold leading-tight"
              style={{ background:'linear-gradient(120deg,#BC9640 0%,#f5d483 40%,#e8c56a 55%,#BC9640 70%,#795901 100%)',backgroundSize:'220% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}
              animate={{ backgroundPosition: ['0% center','220% center'] }}
              transition={{ duration: 3.5, repeat: Infinity, ease: 'linear' }}>
              a tu medida
            </motion.h2>
            <motion.div className="h-px mt-3 rounded-full"
              animate={on ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
              transition={{ duration: 0.8, delay: on ? 1.1 : 0 }}
              style={{ background: 'linear-gradient(90deg,transparent,rgba(188,150,64,0.7),transparent)', transformOrigin: 'left' }} />
          </div>
        </Panel>
        <Panel on={on} delay={1.0}
          initial={{ opacity: 0, scale: 0.08, x: 280, y: 180, rotateX: -30, rotateY: -18, filter: 'blur(25px)' }}
          animate={{ opacity: 1, scale: 1, x: 0, y: 0, rotateX: 0, rotateY: 0, filter: 'blur(0px)' }}
          glow="radial-gradient(ellipse,rgba(255,255,255,0.2),transparent)">
          <div className="px-8 py-5 space-y-3">
            {[{ e:'💰',t:'Precio fijo sin comisiones por venta.' },{ e:'🎨',t:'White-label real: tu logo, tus colores.' },{ e:'📦',t:'Todo en un lugar: vídeos, audios, pagos.' }].map((item,i) => (
              <motion.div key={i} className="flex items-center gap-3"
                animate={on ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
                transition={{ duration: 0.6, delay: on ? 1.2 + i * 0.15 : 0 }}>
                <span className="text-lg">{item.e}</span>
                <span className="text-sm font-light" style={{ color: 'rgba(255,255,255,0.55)' }}>{item.t}</span>
              </motion.div>
            ))}
          </div>
        </Panel>
        {on && (
          <motion.button initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }}
            onClick={replay} className="text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 transition-colors">
            ↺ repetir
          </motion.button>
        )}
      </div>
    </div>
  );
}
