import React, { useState } from 'react';
import { 
  Menu, X, ChevronRight, PlayCircle, Clock, Headphones, 
  Key, Leaf, Sparkles, Video, Book, Calendar, Image as ImageIcon, RotateCw,
  Plus, Minus
} from 'lucide-react';

export function PropuestaA() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Puedo empezar con Puerta Blanca y pasar a Oro después?",
      a: "Sí, puedes hacer el upgrade en cualquier momento desde tu área de alumno. El progreso que hayas hecho se mantendrá intacto y se desbloquearán inmediatamente los nuevos contenidos."
    },
    {
      q: "¿Qué pasa si cancelo mi membresía?",
      a: "No hay permanencia. Si decides cancelar, mantendrás el acceso hasta el final de tu ciclo de facturación actual. Una vez finalizado, perderás el acceso al área privada y sus contenidos."
    },
    {
      q: "¿Las clases son en directo?",
      a: "Todos los programas están pregrabados en alta calidad para que puedas hacerlos a tu propio ritmo. Sin embargo, en Puerta Oro incluimos sesiones de resolución de dudas en directo mensualmente."
    },
    {
      q: "¿Cuánto tiempo tengo para ver el contenido?",
      a: "Mientras tu membresía esté activa, tienes acceso 24/7 a todo el contenido correspondiente a tu nivel (Blanca u Oro). No hay límite de visualizaciones."
    },
    {
      q: "¿En qué se diferencia de otras plataformas de cursos?",
      a: "Frecuencia Integral no es solo información, es transformación. Nuestro enfoque une el alto rendimiento con el desarrollo de la consciencia, apoyado en un método estructurado, un diario personal integrado y una comunidad que vive lo que aprende."
    }
  ];

  return (
    <div className="min-h-[100dvh] bg-[#fff] text-[#1D1D1F] font-['Plus_Jakarta_Sans'] overflow-y-auto selection:bg-[#BC9640] selection:text-white pb-24">
      {/* 1. NAV simplificado */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-['Playfair_Display'] font-semibold text-xl tracking-tight">Frecuencia Integral</span>
            <span className="text-[10px] tracking-widest font-semibold uppercase text-[#BC9640] mt-1">Academy</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8 text-sm font-medium">
            <a href="#" className="hover:text-[#BC9640] transition-colors">Cursos</a>
            <a href="#" className="hover:text-[#BC9640] transition-colors">La Academia</a>
            <a href="#" className="hover:text-[#BC9640] transition-colors">Contacto</a>
          </div>

          <div className="hidden md:flex items-center">
            <button className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-colors">
              Acceso Alumnos
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        
        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-20 left-0 w-full bg-white border-b border-gray-100 p-6 flex flex-col gap-4 shadow-xl">
            <a href="#" className="text-lg font-medium">Cursos</a>
            <a href="#" className="text-lg font-medium">La Academia</a>
            <a href="#" className="text-lg font-medium">Contacto</a>
            <button className="bg-[#1D1D1F] text-white px-6 py-3 rounded-full text-center font-medium mt-4">
              Acceso Alumnos
            </button>
          </div>
        )}
      </nav>

      {/* 2. BARRA DE CONFIANZA */}
      <div className="bg-[#FAFAF8] border-b border-gray-100 py-3 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center items-center gap-x-8 gap-y-2 text-xs font-medium text-gray-600 uppercase tracking-wider">
          <div className="flex items-center gap-2">
            <span className="text-[#BC9640]">✦</span>
            <span>+320 alumnos</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#BC9640]">✦</span>
            <span>Acceso inmediato</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#BC9640]">✦</span>
            <span>Contenido nuevo cada semana</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[#BC9640]">✦</span>
            <span>Sin permanencia</span>
          </div>
        </div>
      </div>

      {/* 3. HERO */}
      <header className="relative pt-24 pb-32 px-6 flex flex-col items-center text-center max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FAFAF8] border border-gray-200 text-xs font-medium mb-8">
          <span className="w-2 h-2 rounded-full bg-[#2b7d7a] animate-pulse"></span>
          Matrículas Abiertas
        </div>
        <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-medium leading-[1.1] mb-6 text-[#1D1D1F]">
          La transformación no se aprende.<br className="hidden md:block"/> Se vive.
        </h1>
        <p className="text-lg md:text-xl text-gray-500 font-light max-w-2xl mb-10 leading-relaxed">
          Una academia de desarrollo consciente diseñada para el alto rendimiento y la paz mental. Tu propio ritmo, tu propia puerta.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
          <button className="w-full sm:w-auto bg-[#BC9640] hover:bg-[#795901] text-white px-8 py-4 rounded-full font-medium transition-all shadow-lg shadow-[#BC9640]/20">
            Empieza en Puerta Blanca
          </button>
          <button className="w-full sm:w-auto group flex items-center justify-center gap-2 text-[#1D1D1F] bg-[#FAFAF8] hover:bg-gray-100 px-8 py-4 rounded-full font-medium transition-colors">
            Descubre el Método 
            <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </header>

      {/* 4. CARDS DE CURSOS */}
      <section className="px-6 py-24 bg-[#FAFAF8]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl font-medium mb-4">Nuestros programas</h2>
            <p className="text-gray-500">Diseñados con precisión para resultados profundos.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
              <div className="h-48 w-full bg-gradient-to-br from-[#f3e9d2] via-[#e5d5b5] to-[#BC9640] opacity-90 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6">
                  <span className="bg-white/90 backdrop-blur text-[#795901] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Plan Oro
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">Método TCT</h3>
                <p className="font-['Playfair_Display'] text-lg text-gray-500 italic mb-8">"El camino de regreso a ti"</p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <Clock size={16} className="text-[#BC9640]"/> 12 semanas
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <PlayCircle size={16} className="text-[#BC9640]"/> 40 vídeos
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <Headphones size={16} className="text-[#BC9640]"/> Meditaciones
                  </div>
                </div>

                <button className="w-full py-4 rounded-full border border-gray-200 font-medium hover:border-[#1D1D1F] transition-colors">
                  Ver programa
                </button>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 group hover:shadow-xl transition-all duration-500">
              <div className="h-48 w-full bg-gradient-to-br from-[#d4e4e3] via-[#a3c9c7] to-[#2b7d7a] opacity-90 relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute bottom-4 left-6 flex gap-2">
                  <span className="bg-white/90 backdrop-blur text-[#2b7d7a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Blanca
                  </span>
                  <span className="bg-white/90 backdrop-blur text-[#2b7d7a] text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                    Oro
                  </span>
                </div>
              </div>
              <div className="p-8 md:p-10">
                <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-2">El Deportista Consciente</h3>
                <p className="font-['Playfair_Display'] text-lg text-gray-500 italic mb-8">"Alto rendimiento desde la presencia"</p>
                
                <div className="flex flex-wrap gap-3 mb-10">
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <Clock size={16} className="text-[#2b7d7a]"/> 8 semanas
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <PlayCircle size={16} className="text-[#2b7d7a]"/> 24 vídeos
                  </div>
                  <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full text-sm font-medium text-gray-700">
                    <Headphones size={16} className="text-[#2b7d7a]"/> Prácticas
                  </div>
                </div>

                <button className="w-full py-4 rounded-full border border-gray-200 font-medium hover:border-[#1D1D1F] transition-colors">
                  Ver programa
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. TU RECORRIDO */}
      <section className="py-24 px-6 overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl font-medium mb-4">Tu recorrido</h2>
            <p className="text-gray-500">Un proceso claro, diseñado para que no te pierdas.</p>
          </div>

          <div className="relative">
            {/* Line connecting steps */}
            <div className="hidden md:block absolute top-1/2 left-0 w-full h-px bg-gray-200 -z-10"></div>
            
            <div className="grid md:grid-cols-3 gap-12 md:gap-6">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center bg-white">
                <div className="w-20 h-20 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 shadow-sm border border-gray-100 rotate-3 transition-transform hover:rotate-0">
                  <Key size={32} className="text-[#BC9640]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-gray-400 mb-3">PASO 1</span>
                <h3 className="font-['Playfair_Display'] text-2xl font-medium mb-3">Elige tu puerta</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Blanca u Oro, según el nivel de inmersión que necesites en este momento vital.</p>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center bg-white">
                <div className="w-20 h-20 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 shadow-sm border border-gray-100 -rotate-3 transition-transform hover:rotate-0">
                  <Leaf size={32} className="text-[#2b7d7a]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-gray-400 mb-3">PASO 2</span>
                <h3 className="font-['Playfair_Display'] text-2xl font-medium mb-3">Entra a tu área</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Accede a tus cursos, tu diario personal y tu programa de práctica semanal.</p>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center bg-white">
                <div className="w-20 h-20 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 shadow-sm border border-gray-100 rotate-3 transition-transform hover:rotate-0">
                  <Sparkles size={32} className="text-[#BC9640]" />
                </div>
                <span className="text-xs font-bold tracking-widest text-gray-400 mb-3">PASO 3</span>
                <h3 className="font-['Playfair_Display'] text-2xl font-medium mb-3">Transforma tu vida</h3>
                <p className="text-gray-500 text-sm leading-relaxed">Avanza semana a semana, a tu propio ritmo, integrando el aprendizaje en tu día a día.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. INCLUIDO EN TU MEMBRESÍA */}
      <section className="py-24 px-6 bg-[#1D1D1F] text-white rounded-[3rem] mx-4 md:mx-8 mb-24">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-['Playfair_Display'] text-4xl font-medium mb-4">Incluido en tu membresía</h2>
            <p className="text-gray-400">Todo lo que necesitas para tu desarrollo, en un solo lugar.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <Video className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Vídeos HD 24h</h4>
              <p className="text-sm text-gray-400">Acceso ilimitado a todas las lecciones desde cualquier dispositivo.</p>
            </div>
            
            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <Headphones className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Prácticas guiadas</h4>
              <p className="text-sm text-gray-400">Audios y meditaciones para integrar el conocimiento.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <Book className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Diario integrado</h4>
              <p className="text-sm text-gray-400">Tu espacio personal para reflexiones y seguimiento de progreso.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <Calendar className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Programa semanal</h4>
              <p className="text-sm text-gray-400">Estructura paso a paso para no perder el foco.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <ImageIcon className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Galería exclusiva</h4>
              <p className="text-sm text-gray-400">Recursos descargables, esquemas y materiales de apoyo.</p>
            </div>

            <div className="bg-white/5 p-6 rounded-3xl border border-white/10 hover:bg-white/10 transition-colors">
              <RotateCw className="text-[#BC9640] mb-4" size={28}/>
              <h4 className="font-medium text-lg mb-2">Contenido fresco</h4>
              <p className="text-sm text-gray-400">Nuevas clases, recursos y actualizaciones cada semana.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. FAQ */}
      <section className="py-24 px-6 max-w-3xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-['Playfair_Display'] text-4xl font-medium mb-4">Preguntas Frecuentes</h2>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index} 
              className="border border-gray-200 rounded-3xl overflow-hidden transition-all duration-300 bg-white"
            >
              <button 
                onClick={() => setOpenFaq(openFaq === index ? null : index)}
                className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
              >
                <span className="font-medium text-lg pr-8">{faq.q}</span>
                <span className="text-[#BC9640] flex-shrink-0">
                  {openFaq === index ? <Minus size={20} /> : <Plus size={20} />}
                </span>
              </button>
              
              <div 
                className={`px-8 overflow-hidden transition-all duration-300 ease-in-out ${
                  openFaq === index ? "max-h-96 pb-6 opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <p className="text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
