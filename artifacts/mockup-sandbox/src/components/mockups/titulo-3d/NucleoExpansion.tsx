import { motion } from 'framer-motion';
import { useState, useCallback } from 'react';

const E = [0.16, 1, 0.3, 1] as const;
const LINE2 = 'a tu medida';
const d2 = 0.6;
const dEnd = d2 + LINE2.length * 0.06 + 0.3;

export function NucleoExpansion() {
  const [on, setOn] = useState(false);
  const replay = useCallback(() => { setOn(false); setTimeout(() => setOn(true), 80); }, []);

  return (
    <div className="min-h-screen flex items-center justify-center overflow-hidden relative" style={{ background: '#030307' }}>
      {on && [0.6,1.2,1.9].map((delay,i) => (
        <motion.div key={i} className="absolute rounded-full pointer-events-none"
          style={{ width:4,height:4,left:'50%',top:'50%',transform:'translate(-50%,-50%)', border:`1px solid rgba(${i===1?'188,150,64':'43,125,122'},0.4)` }}
          initial={{ scale:0,opacity:0.8 }} animate={{ scale:[0,60,100],opacity:[0.6,0.2,0] }}
          transition={{ duration:2.5,delay,ease:'easeOut' }} />
      ))}
      {on && <motion.div className="absolute pointer-events-none rounded-full"
        style={{ width:8,height:8,left:'50%',top:'50%',transform:'translate(-50%,-50%)',background:'white' }}
        initial={{ scale:20,opacity:1 }} animate={{ scale:0,opacity:0 }} transition={{ duration:0.7,delay:0.05 }} />}
      {on && <motion.div className="absolute inset-0 pointer-events-none"
        initial={{ opacity:1 }} animate={{ opacity:0 }} transition={{ duration:0.6,delay:0.0 }}
        style={{ background:'radial-gradient(ellipse 50% 40% at 50% 50%,rgba(255,255,255,0.25),rgba(188,150,64,0.12),transparent)' }} />}

      {/* PLAY BUTTON */}
      {!on && (
        <motion.button initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }} onClick={() => setOn(true)}
          className="absolute inset-0 flex items-center justify-center z-50 cursor-pointer"
          style={{ background: 'rgba(3,3,7,0.80)', backdropFilter: 'blur(4px)' }}>
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
        <motion.div animate={on?{opacity:1,y:0,filter:'blur(0px)'}:{opacity:0,y:40,filter:'blur(8px)'}}
          transition={{ duration:0.8,ease:E,delay:on?0.22:0 }} className="mb-4">
          <span className="inline-block text-[11px] font-bold tracking-[0.22em] uppercase px-4 py-1.5 rounded-full"
            style={{ background:'rgba(43,125,122,0.18)',color:'#4aaaa6',border:'1px solid rgba(43,125,122,0.3)' }}>
            Nuestra solución
          </span>
        </motion.div>

        <div className="overflow-visible mb-1">
          <motion.div animate={on?{opacity:1,scale:1,x:0,y:0,rotateX:0,rotateZ:0,filter:'blur(0px)'}:{opacity:0,scale:0.15,x:60,y:60,rotateX:55,rotateZ:8,filter:'blur(20px)'}}
            transition={{ duration:1.1,ease:E,delay:on?0.3:0 }} style={{ perspective:1000 }}>
            <h2 className="font-['Playfair_Display'] text-5xl font-semibold leading-tight"
              style={{ background:'linear-gradient(170deg,#fff 55%,rgba(255,255,255,0.38))',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}>
              Una plataforma hecha
            </h2>
          </motion.div>
        </div>

        <div className="overflow-visible mb-10">
          <motion.div className="relative"
            animate={on?{opacity:1,scale:1,rotateX:0,filter:'blur(0px)'}:{opacity:0,scale:0.04,rotateX:-20,filter:'blur(35px)'}}
            transition={{ duration:1.25,ease:E,delay:on?d2:0 }} style={{ perspective:800 }}>
            {on && <motion.div className="absolute pointer-events-none rounded-full"
              initial={{ scale:0,opacity:0.9 }} animate={{ scale:4,opacity:0 }}
              transition={{ duration:1,delay:0.02,ease:'easeOut' }}
              style={{ width:80,height:30,left:'20%',top:'50%',transform:'translateY(-50%)',border:'2px solid rgba(188,150,64,0.8)',filter:'blur(3px)' }} />}
            <motion.h2 className="font-['Playfair_Display'] text-6xl font-bold leading-tight"
              style={{ background:'linear-gradient(120deg,#BC9640 0%,#f5d483 35%,#fff8e0 50%,#BC9640 65%,#795901 100%)',backgroundSize:'250% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text' }}
              animate={{ backgroundPosition:['0% center','250% center'] }} transition={{ duration:3.5,repeat:Infinity,ease:'linear' }}>
              a tu medida
            </motion.h2>
            <motion.div className="absolute left-0 right-0 bottom-0 h-px"
              animate={on?{scaleX:1,opacity:1}:{scaleX:0,opacity:0}}
              transition={{ duration:0.8,delay:on?dEnd-0.3:0,ease:E }}
              style={{ background:'linear-gradient(90deg,transparent,rgba(188,150,64,0.8),rgba(255,220,100,0.5),rgba(188,150,64,0.8),transparent)',transformOrigin:'center' }} />
          </motion.div>
        </div>

        {[{ e:'💰',t:'Precio fijo sin comisiones por venta.' },{ e:'🎨',t:'White-label real: tu logo, tus colores.' },{ e:'📦',t:'Todo en un lugar: vídeos, audios, pagos.' }].map((item,i) => (
          <motion.div key={i}
            animate={on?{opacity:1,x:0,y:0}:{opacity:0,x:-40,y:-30}}
            transition={{ duration:0.9,ease:E,delay:on?dEnd+i*0.18:0 }}
            className="flex items-center gap-4 px-5 py-3 mb-2 rounded-xl"
            style={{ background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)' }}>
            <span className="text-xl">{item.e}</span>
            <span className="text-sm font-light" style={{ color:'rgba(255,255,255,0.55)' }}>{item.t}</span>
          </motion.div>
        ))}

        {on && <motion.button initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:dEnd+0.8 }}
          onClick={replay} className="mt-4 text-[11px] tracking-widest uppercase font-medium px-5 py-2 rounded-full border border-white/10 text-white/30 hover:text-white/60 transition-colors">
          ↺ repetir
        </motion.button>}
      </div>
    </div>
  );
}
