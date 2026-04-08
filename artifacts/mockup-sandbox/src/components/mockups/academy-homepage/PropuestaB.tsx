import React from 'react';
import { Check, Minus, Zap, Calendar, Unlock, Download, Star, ArrowRight } from 'lucide-react';

export default function PropuestaB() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-['Plus_Jakarta_Sans'] antialiased selection:bg-[#BC9640] selection:text-white">
      {/* Nav */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-[#1D1D1F] flex items-center justify-center">
            <span className="text-white font-['Playfair_Display'] italic font-bold">F</span>
          </div>
          <span className="font-['Playfair_Display'] font-semibold tracking-wide">
            Frecuencia Integral <span className="text-gray-400 font-normal">/ ACADEMY</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-medium">
          <a href="#" className="hover:text-[#BC9640] transition-colors">La Academia</a>
          <a href="#" className="hover:text-[#BC9640] transition-colors">Testimonios</a>
          <a href="#" className="hover:text-[#BC9640] transition-colors">FAQ</a>
        </div>
        <button className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-gray-800 transition-all hover:scale-105 active:scale-95">
          Acceder
        </button>
      </nav>

      {/* Hero */}
      <section className="pt-24 pb-16 px-6 max-w-4xl mx-auto text-center">
        <h1 className="font-['Playfair_Display'] text-5xl md:text-6xl font-medium leading-tight mb-6 tracking-tight">
          Elige tu camino de <br/><span className="italic text-[#BC9640]">transformación</span>
        </h1>
        <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          Dos puertas de entrada a la academia. Mismos principios, diferente nivel de profundidad. Decide cómo quieres empezar tu viaje hacia el bienestar consciente.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full border border-gray-200 text-[#1D1D1F] font-medium hover:border-[#1D1D1F] transition-all flex items-center justify-center gap-2">
            Empezar en Blanca <span className="text-sm text-gray-500 font-normal">€29/mes</span>
          </button>
          <button className="w-full sm:w-auto px-8 py-3.5 rounded-full bg-[#BC9640] text-white font-medium hover:bg-[#795901] shadow-lg shadow-[#BC9640]/20 transition-all flex items-center justify-center gap-2 hover:scale-105">
            Empezar en Oro <span className="text-sm text-white/80 font-normal">€59/mes</span>
          </button>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center divide-x divide-gray-200/50">
          <div>
            <div className="font-['Playfair_Display'] text-4xl mb-1">320+</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Alumnos activos</div>
          </div>
          <div>
            <div className="font-['Playfair_Display'] text-4xl mb-1">2</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Programas base</div>
          </div>
          <div>
            <div className="font-['Playfair_Display'] text-4xl mb-1">12</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Semanas de viaje</div>
          </div>
          <div>
            <div className="font-['Playfair_Display'] text-4xl mb-1">40+</div>
            <div className="text-xs uppercase tracking-wider text-gray-500 font-semibold">Recursos extra</div>
          </div>
        </div>
      </section>

      {/* Pricing Table */}
      <section className="py-24 px-6 max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-4xl mb-4">Elige tu puerta</h2>
          <p className="text-gray-500">Cancela en cualquier momento. Sin permanencia.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 items-stretch">
          {/* Puerta Blanca */}
          <div className="rounded-[2rem] border border-gray-200 p-8 sm:p-10 flex flex-col hover:border-gray-300 transition-colors bg-white">
            <h3 className="font-['Playfair_Display'] text-2xl mb-2">Puerta Blanca</h3>
            <p className="text-gray-500 text-sm mb-6 min-h-[40px]">Para quienes buscan iniciar su camino con los fundamentos del método.</p>
            <div className="mb-8">
              <span className="text-5xl font-['Playfair_Display']">€29</span>
              <span className="text-gray-500">/mes</span>
            </div>
            <button className="w-full py-4 rounded-full border border-gray-200 font-medium hover:bg-gray-50 transition-colors mb-8">
              Empezar en Blanca
            </button>
            
            <div className="space-y-5 flex-1">
              <Feature text="El Deportista Consciente" check />
              <Feature text="Método TCT" check={false} />
              <Feature text="Diario personal" check />
              <Feature text="Programa semanal" check />
              <Feature text="Multimedia exclusiva" value="Limitada" check={false} />
              <Feature text="Meditaciones premium" check={false} />
              <Feature text="Contenido nuevo cada semana" check={false} />
              <Feature text="Soporte" value="Email" check={false} />
            </div>
          </div>

          {/* Puerta Oro */}
          <div className="rounded-[2rem] bg-[#1D1D1F] text-white p-8 sm:p-10 flex flex-col shadow-2xl relative transform md:-translate-y-4">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#BC9640] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
              Más elegido
            </div>
            <h3 className="font-['Playfair_Display'] text-2xl mb-2 text-[#BC9640]">Puerta Oro</h3>
            <p className="text-gray-400 text-sm mb-6 min-h-[40px]">La experiencia completa. Acceso total a todos los recursos y novedades.</p>
            <div className="mb-8">
              <span className="text-5xl font-['Playfair_Display'] text-white">€59</span>
              <span className="text-gray-400">/mes</span>
            </div>
            <button className="w-full py-4 rounded-full bg-[#BC9640] text-white font-medium hover:bg-[#795901] transition-colors mb-8">
              Empezar en Oro
            </button>
            
            <div className="space-y-5 flex-1">
              <Feature text="El Deportista Consciente" check gold />
              <Feature text="Método TCT" check gold />
              <Feature text="Diario personal" check gold />
              <Feature text="Programa semanal" check gold />
              <Feature text="Multimedia exclusiva" value="Completa" check gold />
              <Feature text="Meditaciones premium" check gold />
              <Feature text="Contenido nuevo cada semana" value="Prioritario" check gold />
              <Feature text="Soporte" value="Email prioritario" check gold />
            </div>
          </div>
        </div>
      </section>

      {/* Included */}
      <section className="py-16 border-t border-gray-100">
        <div className="max-w-5xl mx-auto px-6">
          <h3 className="text-center text-sm font-bold uppercase tracking-widest text-gray-400 mb-10">Incluido en todos los planes</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] flex items-center justify-center">
                <Zap size={20} />
              </div>
              <span className="text-sm font-medium">Acceso inmediato</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] flex items-center justify-center">
                <Unlock size={20} />
              </div>
              <span className="text-sm font-medium">Sin permanencia</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] flex items-center justify-center">
                <Calendar size={20} />
              </div>
              <span className="text-sm font-medium">Cancela cuando quieras</span>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] flex items-center justify-center">
                <Download size={20} />
              </div>
              <span className="text-sm font-medium">Contenido descargable</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl mb-4">Lo que dicen los alumnos</h2>
            <p className="text-gray-500">Transformaciones reales de personas como tú.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard 
              initial="M" 
              name="María G." 
              plan="Puerta Oro" 
              quote="Desde que entré a la academia, mi forma de afrontar el día a día ha cambiado por completo. Las meditaciones premium son un antes y un después." 
            />
            <TestimonialCard 
              initial="C" 
              name="Carlos T." 
              plan="Puerta Blanca" 
              quote="El Deportista Consciente me dio las herramientas que necesitaba para salir del bloqueo. El diario personal es ahora mi rutina sagrada." 
            />
            <TestimonialCard 
              initial="L" 
              name="Laura S." 
              plan="Puerta Oro" 
              quote="Vale cada céntimo. El contenido nuevo cada semana me mantiene enfocada y motivada. El soporte es súper cercano." 
            />
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="bg-[#1D1D1F] text-white py-24 px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl mb-6">¿Lista para empezar?</h2>
          <p className="text-gray-400 mb-10 text-lg">Únete a cientos de alumnos que ya están transformando su vida desde dentro hacia afuera.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 rounded-full border border-gray-700 font-medium hover:bg-gray-800 transition-all">
              Ver plan Blanca
            </button>
            <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#BC9640] text-white font-medium hover:bg-[#795901] transition-all flex items-center justify-center gap-2">
              Quiero la Puerta Oro <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

function Feature({ text, check, gold = false, value }: { text: string; check: boolean; gold?: boolean; value?: string }) {
  return (
    <div className="flex items-center justify-between text-sm">
      <span className={gold ? "text-gray-300" : "text-gray-600"}>{text}</span>
      <div className="flex items-center gap-2">
        {value && <span className={`font-medium ${gold ? "text-[#BC9640]" : "text-[#1D1D1F]"}`}>{value}</span>}
        {check ? (
          <Check size={18} className={gold ? "text-[#BC9640]" : "text-[#2b7d7a]"} />
        ) : !value ? (
          <Minus size={18} className="text-gray-300" />
        ) : null}
      </div>
    </div>
  );
}

function TestimonialCard({ initial, name, plan, quote }: { initial: string; name: string; plan: string; quote: string }) {
  return (
    <div className="bg-[#FAFAF8] p-8 rounded-[2rem] border border-gray-100 flex flex-col h-full hover:shadow-lg transition-shadow duration-300">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 rounded-full bg-[#BC9640]/10 border border-[#BC9640]/20 flex items-center justify-center text-[#BC9640] font-['Playfair_Display'] text-xl">
          {initial}
        </div>
        <div>
          <div className="font-bold text-[#1D1D1F]">{name}</div>
          <div className="text-xs text-gray-500">{plan}</div>
        </div>
      </div>
      <div className="flex text-[#BC9640] gap-1 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={14} fill="currentColor" />
        ))}
      </div>
      <p className="font-['Playfair_Display'] italic text-gray-700 leading-relaxed text-lg flex-1">
        "{quote}"
      </p>
    </div>
  );
}
