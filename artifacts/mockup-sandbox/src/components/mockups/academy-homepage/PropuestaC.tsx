import React from "react";
import { 
  Menu, X, PlayCircle, Music, BookOpen, Star, 
  Leaf, Zap, RefreshCw, Sparkles, Check, 
  ArrowRight, Video
} from "lucide-react";

export function PropuestaC() {
  const [isScrolled, setIsScrolled] = React.useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-['Plus_Jakarta_Sans'] selection:bg-[#2b7d7a]/20">
      {/* 1. NAV simplificado */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-12 flex justify-between items-center">
          <div className="font-['Playfair_Display'] text-2xl font-bold tracking-tight">
            Frecuencia<span className="text-[#BC9640] italic">Integral</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-10 text-sm font-medium tracking-wide">
            <a href="#filosofia" className="hover:text-[#BC9640] transition-colors">Filosofía</a>
            <a href="#metodo" className="hover:text-[#BC9640] transition-colors">El Método</a>
            <a href="#programas" className="hover:text-[#BC9640] transition-colors">Programas</a>
            <button className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full hover:bg-[#BC9640] transition-colors duration-300">
              Acceder
            </button>
          </div>

          <button className="md:hidden text-[#1D1D1F]" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-white pt-24 px-6">
          <div className="flex flex-col space-y-6 text-xl font-['Playfair_Display']">
            <a href="#filosofia" onClick={() => setMobileMenuOpen(false)}>Filosofía</a>
            <a href="#metodo" onClick={() => setMobileMenuOpen(false)}>El Método</a>
            <a href="#programas" onClick={() => setMobileMenuOpen(false)}>Programas</a>
            <button className="bg-[#1D1D1F] text-white px-8 py-4 rounded-full mt-4 w-full">
              Acceder
            </button>
          </div>
        </div>
      )}

      {/* 2. HERO FILOSÓFICO */}
      <section className="relative pt-40 pb-32 md:pt-56 md:pb-48 px-6 overflow-hidden flex flex-col items-center text-center">
        {/* Subtle background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#BC9640]/5 rounded-full blur-[100px] pointer-events-none"></div>

        <div className="max-w-4xl mx-auto relative z-10 flex flex-col items-center">
          <span className="text-[#BC9640] text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-8 md:mb-12">
            Una Escuela de Vida
          </span>
          
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.1] font-medium tracking-tight mb-6">
            Si ya lo has intentado todo,<br />
            y aún algo falta,
          </h1>
          
          <p className="font-['Playfair_Display'] text-[#BC9640] italic text-2xl md:text-4xl mt-2 mb-16">
            quizás no falta información. Falta presencia.
          </p>
          
          <button className="bg-[#1D1D1F] text-white px-10 py-4 md:px-12 md:py-5 rounded-full text-sm md:text-base font-medium hover:bg-[#BC9640] hover:scale-105 transition-all duration-500 shadow-xl shadow-black/5 flex items-center gap-3 group">
            Descubre el método
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>

          {/* Minimalist decorative line */}
          <div className="mt-32 w-full max-w-[200px] flex items-center justify-center opacity-40">
            <div className="h-[1px] flex-1 bg-gradient-to-r from-transparent via-[#1D1D1F] to-[#1D1D1F]"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-[#1D1D1F] mx-4"></div>
            <div className="h-[1px] flex-1 bg-gradient-to-l from-transparent via-[#1D1D1F] to-[#1D1D1F]"></div>
          </div>
        </div>
      </section>

      {/* 3. POR QUÉ NO SOMOS UNA PLATAFORMA DE CURSOS */}
      <section id="filosofia" className="py-24 md:py-40 bg-[#FAFAF8] px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20 md:mb-32">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-6">
              Por qué no somos una plataforma
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              La sobreinformación paraliza. Nuestra metodología está diseñada para la integración profunda, no para el consumo masivo.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 md:gap-8 lg:gap-16">
            {/* Column 1 */}
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-4">
                <span className="text-gray-400 font-medium line-through decoration-gray-300 flex items-center gap-3">
                  <X size={18} className="text-gray-400" />
                  Solo contenido
                </span>
                <span className="text-[#2b7d7a] font-medium text-xl md:text-2xl font-['Playfair_Display'] flex items-start gap-3">
                  <Check size={24} className="text-[#2b7d7a] shrink-0 mt-1" />
                  Método integrado semana a semana
                </span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>

            {/* Column 2 */}
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-4">
                <span className="text-gray-400 font-medium line-through decoration-gray-300 flex items-center gap-3">
                  <X size={18} className="text-gray-400" />
                  Información
                </span>
                <span className="text-[#2b7d7a] font-medium text-xl md:text-2xl font-['Playfair_Display'] flex items-start gap-3">
                  <Check size={24} className="text-[#2b7d7a] shrink-0 mt-1" />
                  Transformación vivida
                </span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>

            {/* Column 3 */}
            <div className="flex flex-col space-y-8">
              <div className="flex flex-col space-y-4">
                <span className="text-gray-400 font-medium line-through decoration-gray-300 flex items-center gap-3">
                  <X size={18} className="text-gray-400" />
                  Consumir vídeos
                </span>
                <span className="text-[#2b7d7a] font-medium text-xl md:text-2xl font-['Playfair_Display'] flex items-start gap-3">
                  <Check size={24} className="text-[#2b7d7a] shrink-0 mt-1" />
                  Practicar, sentir, integrar
                </span>
              </div>
              <div className="h-px bg-gray-200 w-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. EL MÉTODO TCT */}
      <section id="metodo" className="py-24 md:py-0 px-6 md:px-0">
        <div className="max-w-7xl mx-auto md:min-h-screen flex flex-col md:flex-row">
          
          <div className="md:w-1/3 md:py-40 md:pr-12 lg:pr-24 flex flex-col justify-center mb-16 md:mb-0">
            <span className="text-[#BC9640] text-xs font-bold tracking-[0.2em] uppercase mb-6">
              El Método TCT
            </span>
            <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium leading-tight mb-8">
              Cuatro pilares para una vida con sentido.
            </h2>
            <p className="text-gray-600 leading-relaxed text-lg">
              No es magia, es estructura. Un diseño pedagógico meticuloso que te acompaña paso a paso hacia tu verdadera esencia.
            </p>
          </div>

          <div className="md:w-2/3 grid grid-cols-1 md:grid-cols-2">
            {/* Pilar 1 */}
            <div className="bg-white p-12 md:p-16 lg:p-20 relative overflow-hidden group border-b md:border-b-0 md:border-r border-gray-100 flex flex-col justify-center">
              <div className="absolute -right-8 -bottom-12 text-[12rem] font-['Playfair_Display'] font-bold text-[#BC9640]/5 group-hover:text-[#BC9640]/10 transition-colors duration-500 select-none">1</div>
              <Leaf className="text-[#BC9640] w-8 h-8 md:w-10 md:h-10 mb-8 relative z-10" />
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium mb-4 relative z-10">Conciencia</h3>
              <p className="text-gray-600 relative z-10 text-sm md:text-base leading-relaxed">Observar sin juzgar lo que eres en este momento exacto. El punto de partida innegociable.</p>
            </div>

            {/* Pilar 2 */}
            <div className="bg-[#FAFAF8] p-12 md:p-16 lg:p-20 relative overflow-hidden group border-b border-gray-100 flex flex-col justify-center">
              <div className="absolute -right-8 -bottom-12 text-[12rem] font-['Playfair_Display'] font-bold text-[#BC9640]/5 group-hover:text-[#BC9640]/10 transition-colors duration-500 select-none">2</div>
              <Zap className="text-[#BC9640] w-8 h-8 md:w-10 md:h-10 mb-8 relative z-10" />
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium mb-4 relative z-10">Técnica</h3>
              <p className="text-gray-600 relative z-10 text-sm md:text-base leading-relaxed">Herramientas prácticas, tangibles y aplicables a tu día a día, lejos del misticismo vacío.</p>
            </div>

            {/* Pilar 3 */}
            <div className="bg-[#FAFAF8] p-12 md:p-16 lg:p-20 relative overflow-hidden group border-b md:border-b-0 border-gray-100 flex flex-col justify-center">
              <div className="absolute -right-8 -bottom-12 text-[12rem] font-['Playfair_Display'] font-bold text-[#BC9640]/5 group-hover:text-[#BC9640]/10 transition-colors duration-500 select-none">3</div>
              <RefreshCw className="text-[#BC9640] w-8 h-8 md:w-10 md:h-10 mb-8 relative z-10" />
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium mb-4 relative z-10">Continuidad</h3>
              <p className="text-gray-600 relative z-10 text-sm md:text-base leading-relaxed">Semana a semana, sin saltos. La repetición espaciada que forja nuevos surcos neuronales.</p>
            </div>

            {/* Pilar 4 */}
            <div className="bg-white p-12 md:p-16 lg:p-20 relative overflow-hidden group border-gray-100 flex flex-col justify-center">
              <div className="absolute -right-8 -bottom-12 text-[12rem] font-['Playfair_Display'] font-bold text-[#BC9640]/5 group-hover:text-[#BC9640]/10 transition-colors duration-500 select-none">4</div>
              <Sparkles className="text-[#BC9640] w-8 h-8 md:w-10 md:h-10 mb-8 relative z-10" />
              <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-medium mb-4 relative z-10">Transformación</h3>
              <p className="text-gray-600 relative z-10 text-sm md:text-base leading-relaxed">El cambio que no se va. Una nueva forma de habitarte y de relacionarte con el mundo.</p>
            </div>
          </div>

        </div>
      </section>

      {/* 5. UNA SEMANA EN EL ÁREA */}
      <section className="py-24 md:py-40 bg-[#1D1D1F] text-white px-6 overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-24 md:mb-32">
            <h2 className="font-['Playfair_Display'] text-3xl md:text-5xl font-medium mb-6">
              El ritmo que sana
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">
              Así fluye una semana dentro de la academia. Sin agobios.
            </p>
          </div>

          <div className="relative">
            {/* Timeline Line (Desktop) */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-white/10 -translate-y-1/2"></div>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-6 relative z-10">
              
              {/* Lunes */}
              <div className="flex flex-col items-center text-center group">
                <span className="text-[#BC9640] font-bold text-sm tracking-widest uppercase mb-6 md:mb-12">Lunes</span>
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-white/10 transition-colors">
                  <Video className="text-white/80 w-6 h-6" />
                </div>
                <h4 className="font-['Playfair_Display'] text-xl mb-2">Apertura</h4>
                <p className="text-sm text-gray-400">Vídeo conceptual de la semana</p>
              </div>

              {/* Miércoles */}
              <div className="flex flex-col items-center text-center group md:mt-16">
                <span className="text-[#BC9640] font-bold text-sm tracking-widest uppercase mb-6 md:mb-12 md:hidden">Miércoles</span>
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-white/10 transition-colors">
                  <Music className="text-white/80 w-6 h-6" />
                </div>
                <h4 className="font-['Playfair_Display'] text-xl mb-2">Práctica</h4>
                <p className="text-sm text-gray-400">Audio guiado para encarnar</p>
                <span className="hidden md:block text-[#BC9640] font-bold text-sm tracking-widest uppercase mt-12">Miércoles</span>
              </div>

              {/* Viernes */}
              <div className="flex flex-col items-center text-center group">
                <span className="text-[#BC9640] font-bold text-sm tracking-widest uppercase mb-6 md:mb-12">Viernes</span>
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-white/10 transition-colors">
                  <BookOpen className="text-white/80 w-6 h-6" />
                </div>
                <h4 className="font-['Playfair_Display'] text-xl mb-2">Reflexión</h4>
                <p className="text-sm text-gray-400">Ejercicio escrito en tu Diario</p>
              </div>

              {/* Domingo */}
              <div className="flex flex-col items-center text-center group md:mt-16">
                <span className="text-[#BC9640] font-bold text-sm tracking-widest uppercase mb-6 md:mb-12 md:hidden">Domingo</span>
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6 md:mb-8 group-hover:bg-[#BC9640]/20 border-[#BC9640]/30 transition-colors">
                  <Star className="text-[#BC9640] w-6 h-6" />
                </div>
                <h4 className="font-['Playfair_Display'] text-xl mb-2">Integración</h4>
                <p className="text-sm text-gray-400">Cierre y reposo consciente</p>
                <span className="hidden md:block text-[#BC9640] font-bold text-sm tracking-widest uppercase mt-12">Domingo</span>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 6. LOS PROGRAMAS */}
      <section id="programas" className="py-24 md:py-40 bg-white px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16 md:mb-24">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-6xl font-medium mb-6">
              Elige tu puerta de entrada
            </h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10">
            {/* Tarjeta 1 */}
            <div className="group rounded-[2rem] bg-gradient-to-br from-[#1D1D1F] to-[#2a2a2d] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#2b7d7a]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#2b7d7a]/40 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                <span className="inline-block py-1.5 px-4 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase mb-8">
                  Suscripción Mensual
                </span>
                <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium mb-4">Método TCT</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  El camino central de la academia. Un viaje continuo hacia el autoconocimiento.
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  Avanza a tu ritmo
                </div>
                <button className="bg-white text-[#1D1D1F] w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[#BC9640] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </button>
              </div>
            </div>

            {/* Tarjeta 2 */}
            <div className="group rounded-[2rem] bg-gradient-to-br from-[#1D1D1F] to-[#2a2a2d] p-10 md:p-14 text-white relative overflow-hidden flex flex-col justify-between min-h-[400px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#BC9640]/20 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2 group-hover:bg-[#BC9640]/40 transition-colors duration-700"></div>
              
              <div className="relative z-10">
                <span className="inline-block py-1.5 px-4 rounded-full border border-white/20 text-xs font-bold tracking-widest uppercase mb-8">
                  Programa Cerrado
                </span>
                <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-medium mb-4">El Deportista Consciente</h3>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Gestión emocional y mentalidad para el alto rendimiento deportivo. 8 semanas.
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <div className="text-sm text-gray-300">
                  Duración: 8 Semanas
                </div>
                <button className="bg-white text-[#1D1D1F] w-12 h-12 rounded-full flex items-center justify-center group-hover:bg-[#BC9640] group-hover:text-white transition-colors duration-300">
                  <ArrowRight size={20} className="-rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. VOCES DE ALUMNOS */}
      <section className="py-24 md:py-40 bg-[#FAFAF8] px-6">
        <div className="max-w-4xl mx-auto flex flex-col space-y-24 md:space-y-32">
          
          {/* Quote 1 */}
          <div className="relative pl-8 md:pl-16 md:ml-12 border-l-2 border-[#BC9640]">
            <span className="absolute -left-4 -top-8 text-[#BC9640] opacity-20 text-8xl font-['Playfair_Display'] leading-none">"</span>
            <p className="font-['Playfair_Display'] italic text-2xl md:text-4xl md:leading-tight text-[#1D1D1F] mb-8">
              No es otro curso más para almacenar en el disco duro mental. Es un espacio que te obliga, con mucha suavidad, a mirarte al espejo y hacerte cargo.
            </p>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
              <div>
                <p className="font-bold text-sm uppercase tracking-wider">María Teresa</p>
                <p className="text-sm text-gray-500">Alumna Método TCT</p>
              </div>
            </div>
          </div>

          {/* Quote 2 */}
          <div className="relative pr-8 md:pr-16 md:mr-12 border-r-2 border-[#2b7d7a] text-right ml-auto">
            <span className="absolute -right-4 -top-8 text-[#2b7d7a] opacity-20 text-8xl font-['Playfair_Display'] leading-none">"</span>
            <p className="font-['Playfair_Display'] italic text-2xl md:text-4xl md:leading-tight text-[#1D1D1F] mb-8">
              Llevaba años meditando sin constancia. La estructura de semanas ha sido el ancla que necesitaba para dejar de evadirme.
            </p>
            <div className="flex items-center justify-end gap-4">
              <div className="text-right">
                <p className="font-bold text-sm uppercase tracking-wider">David G.</p>
                <p className="text-sm text-gray-500">Alumno El Deportista Consciente</p>
              </div>
              <div className="w-12 h-12 rounded-full bg-gray-200"></div>
            </div>
          </div>

        </div>
      </section>

      {/* 8. CTA FINAL SENCILLO */}
      <section className="py-32 md:py-48 bg-white px-6 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium mb-8">
            ¿Lista para empezar?
          </h2>
          <p className="text-xl text-gray-500 mb-12 max-w-lg mx-auto leading-relaxed">
            Tu transformación te está esperando. Únete hoy y da el primer paso hacia una vida con mayor sentido.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto bg-[#1D1D1F] text-white px-10 py-4 rounded-full text-base font-medium hover:bg-[#BC9640] transition-colors duration-300">
              Ver programas
            </button>
            <button className="w-full sm:w-auto bg-transparent text-[#1D1D1F] border border-gray-200 px-10 py-4 rounded-full text-base font-medium hover:border-[#1D1D1F] transition-colors duration-300">
              Tengo dudas
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER Básico */}
      <footer className="bg-[#1D1D1F] text-white py-12 px-6 text-center text-sm text-gray-400">
        <div className="font-['Playfair_Display'] text-xl font-bold tracking-tight text-white mb-6">
          Frecuencia<span className="text-[#BC9640] italic">Integral</span>
        </div>
        <p>© {new Date().getFullYear()} Frecuencia Integral. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
