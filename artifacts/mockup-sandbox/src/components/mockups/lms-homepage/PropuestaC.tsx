import React, { useState } from 'react';
import { 
  Play, 
  Calendar, 
  Film, 
  Book, 
  Image as ImageIcon,
  Palette,
  Globe,
  Mail,
  Layout,
  BookOpen,
  Lock,
  FolderTree,
  Users,
  BarChart3,
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  Volume2,
  Menu,
  X
} from 'lucide-react';

export function PropuestaC() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: "¿Puedo usar mi propio dominio?",
      a: "Sí, absolutamente. Puedes conectar tu propio dominio (ej. academia.tumarca.com) y nosotros nos encargamos de gestionar el certificado SSL de forma automática y gratuita."
    },
    {
      q: "¿Cuántos alumnos puedo tener?",
      a: "Nuestros planes están diseñados para escalar contigo. Desde los planes iniciales tienes capacidad para miles de alumnos sin impacto en el rendimiento de tu plataforma."
    },
    {
      q: "¿Cómo funciona el pago de alumnos?",
      a: "Te conectas directamente con tu cuenta de Stripe. El dinero va directo a tu cuenta bancaria, nosotros no cobramos comisiones por transacción. Tú tienes el control total de tus ingresos."
    },
    {
      q: "¿Qué pasa si quiero añadir más cursos?",
      a: "Puedes añadir cursos ilimitados. Nuestro editor está pensado para que tu catálogo crezca sin restricciones, organizando el contenido por categorías o rutas de aprendizaje."
    }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased selection:bg-[#BC9640]/30 selection:text-[#1D1D1F]" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <style>
        {`
          @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
          
          .font-serif {
            font-family: 'Playfair Display', serif;
          }
        `}
      </style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-serif font-semibold text-xl tracking-tight">LMS<span className="text-[#BC9640]">Pro</span></span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#experiencia" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Experiencia</a>
            <a href="#whitelabel" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">White-label</a>
            <a href="#admin" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Administración</a>
            <a href="#onboarding" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Proceso</a>
          </div>

          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity">Login</button>
            <button className="bg-[#2b7d7a] hover:bg-[#226361] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm shadow-[#2b7d7a]/20">
              Empieza hoy
            </button>
          </div>

          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden pt-20 pb-32">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-b from-[#FAFAF8] to-white -z-10" />
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-center">
          
          {/* Left: Content */}
          <div className="max-w-xl">
            <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] font-medium tracking-tight mb-8">
              Tu academia.<br />
              <span className="text-[#BC9640]">Tu marca.</span><br />
              Nuestra tecnología.
            </h1>
            <p className="text-lg md:text-xl text-gray-600 mb-10 leading-relaxed font-light">
              Lanza tu plataforma de formación online con todos los recursos que tus alumnos necesitan para transformar su aprendizaje. 100% white-label.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-[#1D1D1F] hover:bg-black text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg flex items-center justify-center gap-2">
                Solicitar tu demo
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Right: Mockup */}
          <div className="relative">
            {/* Decorative elements behind mockup */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-[#2b7d7a]/20 to-[#BC9640]/20 blur-3xl rounded-full opacity-50" />
            
            <div className="relative bg-[#FAFAF8] rounded-[2rem] shadow-2xl shadow-black/5 border border-gray-100 overflow-hidden flex flex-col h-[600px] w-full max-w-md mx-auto transform rotate-1 md:rotate-2 hover:rotate-0 transition-transform duration-700 ease-out">
              
              {/* Header */}
              <div className="bg-[#1D1D1F] p-6 text-white shrink-0">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-sm font-medium border border-white/20">M</div>
                  <div>
                    <h3 className="font-serif text-xl tracking-wide">Bienvenida, María ✨</h3>
                    <p className="text-xs text-gray-400 font-medium">Programa de Transformación Personal</p>
                  </div>
                </div>
                
                {/* Progress bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-400 font-medium">
                    <span>Progreso general</span>
                    <span>34%</span>
                  </div>
                  <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                    <div className="h-full bg-[#BC9640] w-[34%] rounded-full" />
                  </div>
                </div>
              </div>

              {/* Grid Content */}
              <div className="p-6 grid grid-cols-2 gap-4 flex-1 overflow-hidden">
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center gap-3 hover:border-[#BC9640]/30 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#2b7d7a] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Calendar className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Mis Semanas</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center gap-3 hover:border-[#BC9640]/30 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#2b7d7a] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Film className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Multimedia</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center gap-3 hover:border-[#BC9640]/30 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#2b7d7a] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Book className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Mi Diario</span>
                </div>
                <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-center items-center text-center gap-3 hover:border-[#BC9640]/30 transition-colors group cursor-pointer">
                  <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] text-[#2b7d7a] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <ImageIcon className="w-6 h-6" />
                  </div>
                  <span className="text-sm font-medium text-gray-900">Galería</span>
                </div>
              </div>

              {/* Mini Player */}
              <div className="bg-white border-t border-gray-100 p-4 shrink-0 flex items-center gap-4">
                <button className="w-10 h-10 rounded-full bg-[#1D1D1F] text-white flex items-center justify-center shrink-0 hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 ml-0.5" />
                </button>
                <div className="flex-1">
                  <p className="text-xs font-semibold text-gray-900 mb-0.5">Meditación de anclaje</p>
                  <p className="text-[10px] text-gray-500">Módulo 2 • 15:00</p>
                </div>
                <Volume2 className="w-4 h-4 text-gray-400" />
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* STUDENT AREA FEATURES */}
      <section id="experiencia" className="py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">El área del alumno que marca la diferencia</h2>
            <p className="text-lg text-gray-600 font-light">Diseñada para maximizar la retención y la transformación de tus estudiantes, combinando contenido estructurado con herramientas de introspección.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {/* Block 1 */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 text-[#2b7d7a]">
                <Calendar className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Programa Semanal</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Tus alumnos acceden al contenido semana a semana, en el orden que diseñas tú. Con sistema de progreso visual y posibilidad de marcar cada módulo como completado. Nunca más alumnos perdidos en el contenido.
              </p>
            </div>

            {/* Block 2 */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 text-[#2b7d7a]">
                <Film className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Biblioteca Multimedia</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Vídeos en HD sin anuncios, audios descargables y galería de recursos visuales. Todo organizado por categorías. Tus alumnos consumen el contenido sin salir de la plataforma.
              </p>
            </div>

            {/* Block 3 */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 text-[#2b7d7a]">
                <Play className="w-7 h-7 ml-1" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Mini-player Flotante</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                El reproductor de audio flota sobre toda la plataforma. Tus alumnos pueden navegar, leer o escribir en su diario mientras escuchan una práctica guiada. Una experiencia que no encontrarán en ningún otro LMS.
              </p>
            </div>

            {/* Block 4 */}
            <div className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 text-[#2b7d7a]">
                <Book className="w-7 h-7" />
              </div>
              <h3 className="font-serif text-2xl mb-4">Diario Personal</h3>
              <p className="text-gray-600 leading-relaxed font-light">
                Un espacio privado dentro de la plataforma donde cada alumno puede escribir reflexiones, guardar insights y llevar un registro de su progreso personal. Diferénciate con una funcionalidad única.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WHITE-LABEL */}
      <section id="whitelabel" className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6">White-label total</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">Tu marca es el centro de la experiencia. Construimos la tecnología para que tú brilles, sin dejar rastro de nuestra marca.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 text-center">
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#BC9640]/10 text-[#BC9640] flex items-center justify-center mb-6">
                <Palette className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tu logo y colores</h3>
              <p className="text-gray-600 font-light leading-relaxed">Personaliza cada elemento visual. Tus alumnos ven tu marca, tu identidad y tus colores, no los nuestros.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] flex items-center justify-center mb-6">
                <Globe className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tu dominio</h3>
              <p className="text-gray-600 font-light leading-relaxed">Publica en tuacademia.com o cursos.tumarca.com con certificado SSL incluido y configuración automática.</p>
            </div>

            <div className="flex flex-col items-center">
              <div className="w-20 h-20 rounded-full bg-[#1D1D1F]/5 text-[#1D1D1F] flex items-center justify-center mb-6">
                <Mail className="w-10 h-10" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Tus comunicaciones</h3>
              <p className="text-gray-600 font-light leading-relaxed">Emails transaccionales de bienvenida, recibos y avisos con tu remitente y tu diseño personalizado.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ADMIN PANEL */}
      <section id="admin" className="py-32">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="font-serif text-4xl mb-6 leading-tight">Tú controlas todo el contenido</h2>
              <p className="text-lg text-gray-600 font-light mb-8">
                Un panel de administración intuitivo y potente, diseñado para creadores, no para programadores. Gestiona tu academia con total autonomía.
              </p>
            </div>
            
            <div className="lg:w-2/3 grid sm:grid-cols-2 gap-x-8 gap-y-6 bg-white p-8 md:p-12 rounded-[2rem] border border-gray-100 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)]">
              {[
                { icon: Layout, text: "Editor de bloques visual" },
                { icon: BookOpen, text: "Gestión de cursos y módulos" },
                { icon: Lock, text: "Control de acceso por plan" },
                { icon: FolderTree, text: "Galería multimedia centralizada" },
                { icon: Users, text: "Gestión de alumnos y roles" },
                { icon: BarChart3, text: "Estadísticas de uso y progreso" }
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 p-4 rounded-xl hover:bg-[#FAFAF8] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-gray-50 flex items-center justify-center text-[#1D1D1F]">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <span className="font-medium">{item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* STRIPE INTEGRATION */}
      <section className="py-24 bg-[#1D1D1F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4">Pagos integrados con Stripe</h2>
            <p className="text-gray-400 font-light">Vende con confianza, automatiza el acceso.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/10 -translate-y-1/2" />
            
            {[
              { step: "01", text: "Crea tus planes" },
              { step: "02", text: "Define el precio" },
              { step: "03", text: "Stripe gestiona el cobro" },
              { step: "04", text: "Acceso automático al pagar" }
            ].map((item, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1D1D1F] border-2 border-[#BC9640] text-[#BC9640] flex items-center justify-center font-serif text-xl mb-6">
                  {item.step}
                </div>
                <h4 className="font-medium text-lg">{item.text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ONBOARDING */}
      <section id="onboarding" className="py-32 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4">Cómo empezar tu academia</h2>
            <p className="text-gray-600 font-light">Un proceso estructurado para lanzar en 4 semanas.</p>
          </div>

          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
            {[
              { sem: "Semana 1", title: "Configuración y personalización de tu academia" },
              { sem: "Semana 2", title: "Subida de contenido y estructura de cursos" },
              { sem: "Semana 3", title: "Pruebas y primeros alumnos beta" },
              { sem: "Semana 4", title: "Lanzamiento oficial" },
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-4 border-[#FAFAF8] bg-[#2b7d7a] text-white shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-sm z-10">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
                  <div className="text-sm text-[#BC9640] font-bold mb-1 tracking-wider uppercase">{item.sem}</div>
                  <div className="text-gray-900 font-medium">{item.title}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32">
        <div className="max-w-3xl mx-auto px-6">
          <h2 className="font-serif text-4xl text-center mb-16">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button 
                  className="w-full text-left px-6 py-5 flex items-center justify-between focus:outline-none"
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                >
                  <span className="font-medium pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ease-in-out ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
                  <p className="text-gray-600 font-light">{faq.a}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto bg-[#BC9640]/5 rounded-[3rem] p-12 md:p-20 text-center border border-[#BC9640]/10">
          <h2 className="font-serif text-4xl md:text-5xl mb-8">¿Lista para lanzar tu academia?</h2>
          <button className="bg-[#1D1D1F] hover:bg-black text-white px-8 py-4 rounded-full text-lg font-medium transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1">
            Pedir demo gratuita
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded bg-[#1D1D1F] flex items-center justify-center">
              <div className="w-2 h-2 bg-white rounded-full" />
            </div>
            <span className="font-serif font-semibold text-lg tracking-tight">LMS<span className="text-[#BC9640]">Pro</span></span>
          </div>
          <div className="text-sm text-gray-500 font-light">
            © {new Date().getFullYear()} LMSPro. Todos los derechos reservados.
          </div>
        </div>
      </footer>
    </div>
  );
}
