import React from "react";
import {
  ChevronRight,
  Settings,
  CreditCard,
  Lock,
  Image as ImageIcon,
  Video,
  Headphones,
  Calendar,
  Book,
  ShieldCheck,
  Smartphone,
  Palette,
  Zap,
  CheckCircle2,
  Play,
  PlayCircle
} from "lucide-react";

export function PropuestaA() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-['Plus_Jakarta_Sans'] selection:bg-[#2b7d7a]/20">
      {/* 1. NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded bg-[#1D1D1F] flex items-center justify-center">
              <span className="text-white font-['Playfair_Display'] font-bold text-xl leading-none italic">L</span>
            </div>
            <span className="font-['Playfair_Display'] font-semibold text-xl tracking-tight">LMS Pro</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#features" className="hover:text-[#1D1D1F] transition-colors">Funcionalidades</a>
            <a href="#audience" className="hover:text-[#1D1D1F] transition-colors">Para quién</a>
            <a href="#pricing" className="hover:text-[#1D1D1F] transition-colors">Precios</a>
            <a href="#contact" className="hover:text-[#1D1D1F] transition-colors">Contacto</a>
          </div>
          <button className="hidden md:flex items-center justify-center px-6 py-2.5 bg-[#1D1D1F] text-white rounded-full text-sm font-medium hover:bg-black transition-colors">
            Solicitar demo
          </button>
        </div>
      </nav>

      {/* 2. HERO */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#2b7d7a]/5 rounded-full blur-3xl -z-10" />
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gray-50 border border-gray-100 text-sm font-medium text-gray-600 mb-8">
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2b7d7a]" /> Sin permanencia</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2b7d7a]" /> Instalación incluida</span>
            <span className="w-1 h-1 rounded-full bg-gray-300" />
            <span className="flex items-center gap-1.5"><CheckCircle2 className="w-4 h-4 text-[#2b7d7a]" /> Soporte personalizado</span>
          </div>
          <h1 className="font-['Playfair_Display'] text-5xl md:text-7xl font-bold tracking-tight leading-[1.1] mb-8 text-balance">
            La plataforma LMS que tu academia merece
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 mb-12 max-w-2xl mx-auto leading-relaxed text-balance">
            Publica tus cursos, gestiona tus alumnos y cobra automáticamente. Todo en un solo lugar, con tu marca.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 bg-[#1D1D1F] text-white rounded-full text-base font-semibold hover:bg-black transition-all hover:scale-105 active:scale-95">
              Solicitar demo gratuita
            </button>
            <a href="#features" className="w-full sm:w-auto px-8 py-4 bg-white text-[#1D1D1F] border border-gray-200 rounded-full text-base font-semibold hover:border-gray-300 transition-colors flex items-center justify-center gap-2">
              Ver funcionalidades <ChevronRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* 3. BARRA DE LOGOS/STATS */}
      <section className="py-12 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-4 text-center">
          <div className="space-y-1">
            <div className="font-['Playfair_Display'] text-3xl font-bold text-[#BC9640]">100%</div>
            <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Personalizable</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="space-y-1">
            <div className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">Pagos</div>
            <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Integrados</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="space-y-1">
            <div className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">Acceso</div>
            <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Inmediato</div>
          </div>
          <div className="hidden md:block w-px h-12 bg-gray-200" />
          <div className="space-y-1">
            <div className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">Ilimitados</div>
            <div className="text-sm font-medium tracking-wide text-gray-500 uppercase">Alumnos</div>
          </div>
        </div>
      </section>

      {/* 4. ¿QUÉ INCLUYE LA PLATAFORMA? */}
      <section id="features" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">¿Qué incluye la plataforma?</h2>
            <p className="text-xl text-gray-500 max-w-2xl">Todo lo que necesitas para operar una academia digital profesional, estructurado para crecer contigo.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            {/* Columna 1 */}
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-[#2b7d7a] uppercase pb-4 border-b border-gray-100">Para el creador (Admin)</h3>
              
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#2b7d7a]/10 flex items-center justify-center shrink-0">
                    <Settings className="w-5 h-5 text-[#2b7d7a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Panel de administración</h4>
                    <p className="text-gray-500 leading-relaxed">Gestiona cursos, alumnos y contenido desde un editor visual de bloques intuitivo.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#2b7d7a]/10 flex items-center justify-center shrink-0">
                    <CreditCard className="w-5 h-5 text-[#2b7d7a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Pagos con Stripe</h4>
                    <p className="text-gray-500 leading-relaxed">Crea planes de membresía, precios y cobra automáticamente sin intermediarios.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#2b7d7a]/10 flex items-center justify-center shrink-0">
                    <Lock className="w-5 h-5 text-[#2b7d7a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Control de acceso</h4>
                    <p className="text-gray-500 leading-relaxed">Define con precisión qué contenido ve cada nivel de suscripción.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#2b7d7a]/10 flex items-center justify-center shrink-0">
                    <ImageIcon className="w-5 h-5 text-[#2b7d7a]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Galería multimedia</h4>
                    <p className="text-gray-500 leading-relaxed">Sube y organiza imágenes, vídeos y audios en tu biblioteca privada.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 2 */}
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-[#2b7d7a] uppercase pb-4 border-b border-gray-100">Para el alumno</h3>
              
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#BC9640]/10 flex items-center justify-center shrink-0">
                    <Video className="w-5 h-5 text-[#795901]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Vídeos en HD</h4>
                    <p className="text-gray-500 leading-relaxed">Reproductor seguro y nativo, sin dependencias de YouTube ni distracciones.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#BC9640]/10 flex items-center justify-center shrink-0">
                    <Headphones className="w-5 h-5 text-[#795901]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Audios y meditaciones</h4>
                    <p className="text-gray-500 leading-relaxed">Mini-player flotante disponible y persistente en toda la plataforma.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#BC9640]/10 flex items-center justify-center shrink-0">
                    <Calendar className="w-5 h-5 text-[#795901]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Programa semanal</h4>
                    <p className="text-gray-500 leading-relaxed">Contenido estructurado semana a semana con seguimiento visual de progreso.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-[#BC9640]/10 flex items-center justify-center shrink-0">
                    <Book className="w-5 h-5 text-[#795901]" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Diario personal</h4>
                    <p className="text-gray-500 leading-relaxed">Espacio integrado de reflexión y journaling privado para cada alumno.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Columna 3 */}
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase pb-4 border-b border-gray-100">Plataforma</h3>
              
              <div className="space-y-10">
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Autenticación segura</h4>
                    <p className="text-gray-500 leading-relaxed">Registro y login fluidos impulsados por tecnología robusta (Supabase Auth).</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Smartphone className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">100% responsive</h4>
                    <p className="text-gray-500 leading-relaxed">Experiencia de usuario perfecta en móvil, tablet y escritorio.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Palette className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">White-label</h4>
                    <p className="text-gray-500 leading-relaxed">Tu logo, tus colores, tu dominio. Completamente bajo tu identidad de marca.</p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <div className="mt-1 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <Zap className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">Alta velocidad</h4>
                    <p className="text-gray-500 leading-relaxed">Arquitectura moderna para carga instantánea, sin dependencias pesadas.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. DENTRO DEL ÁREA DEL ALUMNO */}
      <section className="py-32 bg-[#FAFAF8] px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">Dentro del área del alumno</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Qué ven tus alumnos cuando entran a su panel privado.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Card 1 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-6">
                <Calendar className="w-6 h-6 text-[#1D1D1F]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Mis Semanas</h3>
              <p className="text-gray-500 leading-relaxed mb-8">Accede a los módulos semana a semana. Marca tu progreso y retoma donde lo dejaste.</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                <div className="space-y-4">
                  {[1, 2, 3].map((i) => (
                    <div key={i} className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${i === 1 ? 'bg-[#2b7d7a] text-white' : 'bg-gray-100 text-gray-400'}`}>
                        {i}
                      </div>
                      <div className="flex-1">
                        <div className="h-4 bg-gray-100 rounded w-1/3 mb-2" />
                        <div className="h-2 bg-gray-50 rounded w-1/2" />
                      </div>
                      {i === 1 && <CheckCircle2 className="w-5 h-5 text-[#2b7d7a]" />}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-6">
                <PlayCircle className="w-6 h-6 text-[#1D1D1F]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Multimedia</h3>
              <p className="text-gray-500 leading-relaxed mb-8">Biblioteca de vídeos, audios e imágenes organizados por categoría.</p>
              
              <div className="bg-gray-50 rounded-2xl p-6 border border-gray-100/50">
                <div className="aspect-video bg-gray-200 rounded-xl mb-4 relative overflow-hidden flex items-center justify-center group cursor-pointer">
                   <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center backdrop-blur-sm shadow-lg group-hover:scale-110 transition-transform">
                     <Play className="w-6 h-6 text-[#1D1D1F] ml-1" />
                   </div>
                </div>
                <div className="flex gap-2">
                  <div className="h-16 flex-1 bg-gray-200 rounded-lg" />
                  <div className="h-16 flex-1 bg-gray-200 rounded-lg" />
                  <div className="h-16 flex-1 bg-gray-200 rounded-lg" />
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-6">
                <Book className="w-6 h-6 text-[#1D1D1F]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Mi Diario</h3>
              <p className="text-gray-500 leading-relaxed mb-8">Espacio privado para reflexionar, escribir y guardar aprendizajes.</p>
              
              <div className="bg-[#FAFAF8] rounded-2xl p-6 border border-gray-100/50 relative">
                <div className="absolute top-4 right-4"><span className="text-xs font-medium text-gray-400">Hoy</span></div>
                <div className="h-6 w-3/4 bg-gray-200 rounded mb-4" />
                <div className="space-y-2 mb-6">
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-full" />
                  <div className="h-3 bg-gray-100 rounded w-5/6" />
                </div>
                <div className="w-10 h-10 rounded-full bg-[#1D1D1F] ml-auto flex items-center justify-center">
                   <div className="w-4 h-4 bg-white rounded-sm" />
                </div>
              </div>
            </div>

            {/* Card 4 */}
            <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 rounded-xl bg-[#FAFAF8] flex items-center justify-center mb-6">
                <ImageIcon className="w-6 h-6 text-[#1D1D1F]" />
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">Galería</h3>
              <p className="text-gray-500 leading-relaxed mb-8">Recursos visuales de inspiración y referencia del programa.</p>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square bg-gray-100 rounded-xl" />
                <div className="aspect-square bg-gray-100 rounded-xl" />
                <div className="aspect-square bg-gray-100 rounded-xl" />
                <div className="aspect-square bg-gray-100 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. ¿PARA QUIÉN ES? */}
      <section id="audience" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">¿Para quién es esta plataforma?</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Diseñada para creadores exigentes que buscan algo más que una herramienta genérica.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-[#2b7d7a] rounded-full flex items-center justify-center mb-6 text-white text-3xl font-['Playfair_Display'] group-hover:scale-105 transition-transform">
                C
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">El Coach de Bienestar</h3>
              <p className="text-gray-500 leading-relaxed">"Quiero publicar mis programas de mindfulness con una plataforma que transmita calidad y compromiso a mis alumnos."</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-[#BC9640] rounded-full flex items-center justify-center mb-6 text-white text-3xl font-['Playfair_Display'] group-hover:scale-105 transition-transform">
                F
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">El Formador de Alto Rendimiento</h3>
              <p className="text-gray-500 leading-relaxed">"Necesito que mis alumnos tengan acceso a vídeos, audios y seguimiento de sus rutinas en un solo lugar seguro."</p>
            </div>

            <div className="text-center group">
              <div className="w-24 h-24 mx-auto bg-[#1D1D1F] rounded-full flex items-center justify-center mb-6 text-white text-3xl font-['Playfair_Display'] group-hover:scale-105 transition-transform">
                A
              </div>
              <h3 className="font-['Playfair_Display'] text-2xl font-bold mb-4">La Academia Online</h3>
              <p className="text-gray-500 leading-relaxed">"Buscamos una LMS que podamos presentar verdaderamente como nuestra, sin mencionar tecnología de terceros."</p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. PROCESO CÓMO FUNCIONA */}
      <section className="py-32 bg-white border-t border-gray-100 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold mb-6">Cómo funciona</h2>
            <p className="text-xl text-gray-500 max-w-2xl mx-auto">Tu academia en marcha en 3 pasos simples.</p>
          </div>

          <div className="relative">
            <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gray-200" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-white border-8 border-gray-50 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <span className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">1</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Configuramos tu academia</h3>
                <p className="text-gray-500 leading-relaxed">Personalizamos la plataforma con tu imagen de marca, logotipo, colores corporativos y dominio propio.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-white border-8 border-gray-50 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <span className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">2</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Subes tu contenido</h3>
                <p className="text-gray-500 leading-relaxed">Organizas tus vídeos, audios, PDFs y textos en módulos semanales. Nuestro equipo te guía en todo el proceso.</p>
              </div>

              <div className="text-center">
                <div className="w-24 h-24 mx-auto bg-white border-8 border-gray-50 rounded-full flex items-center justify-center mb-8 relative z-10 shadow-sm">
                  <span className="font-['Playfair_Display'] text-3xl font-bold text-[#1D1D1F]">3</span>
                </div>
                <h3 className="font-bold text-xl mb-4">Tus alumnos entran</h3>
                <p className="text-gray-500 leading-relaxed">Se registran en la página, pagan su suscripción vía Stripe y acceden inmediatamente a su área privada.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 8. CTA FINAL */}
      <section className="bg-[#1D1D1F] text-white py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-['Playfair_Display'] text-5xl md:text-6xl font-bold mb-8 text-balance">
            ¿Listo para lanzar tu academia?
          </h2>
          <p className="text-xl text-gray-400 mb-12 max-w-2xl mx-auto font-light">
            Deja de pelear con plugins y plataformas genéricas. Da el salto a una solución premium diseñada para creadores profesionales.
          </p>
          <button className="px-10 py-5 bg-[#BC9640] text-white rounded-full text-lg font-bold hover:bg-[#795901] transition-colors shadow-lg shadow-[#BC9640]/20 hover:scale-105 active:scale-95">
            Solicitar demo gratuita
          </button>
        </div>
      </section>
      
      {/* FOOTER SIMPLE */}
      <footer className="bg-[#1D1D1F] border-t border-white/10 py-12 px-6 text-center text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-4">
           <div className="w-6 h-6 rounded bg-white/10 flex items-center justify-center">
             <span className="text-white font-['Playfair_Display'] font-bold text-xs italic">L</span>
           </div>
           <span className="font-['Playfair_Display'] font-semibold text-white">LMS Pro</span>
        </div>
        <p>© {new Date().getFullYear()} LMS Pro. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}
