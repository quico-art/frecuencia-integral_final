import React, { useState } from 'react';
import {
  Play, Calendar, Film, Book, Image as ImageIcon, Palette, Globe, Mail,
  Layout, BookOpen, Lock, FolderTree, Users, BarChart3, ArrowRight,
  CheckCircle2, ChevronDown, Menu, X, PlayCircle, Check,
  Settings, CreditCard, Headphones, ShieldCheck, Smartphone, Zap
} from 'lucide-react';

export function PropuestaCB() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    { q: "¿Puedo usar mi propio dominio?", a: "Sí, absolutamente. Puedes conectar tu propio dominio (ej. academia.tumarca.com) y nosotros gestionamos el certificado SSL de forma automática y gratuita." },
    { q: "¿Cuántos alumnos puedo tener?", a: "Nuestros planes están diseñados para escalar contigo. Desde los planes iniciales tienes capacidad para miles de alumnos sin impacto en el rendimiento." },
    { q: "¿Cómo funciona el pago de alumnos?", a: "Te conectas directamente con tu cuenta de Stripe. El dinero va directo a tu cuenta bancaria sin comisiones por transacción." },
    { q: "¿Qué pasa si quiero añadir más cursos?", a: "Puedes añadir cursos ilimitados. Nuestro editor permite que tu catálogo crezca sin restricciones." }
  ];

  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] antialiased" style={{ fontFamily: '"Plus Jakarta Sans", sans-serif' }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&display=swap');
        .font-serif { font-family: 'Playfair Display', serif; }
      `}</style>

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#1D1D1F] flex items-center justify-center">
              <div className="w-3 h-3 bg-white rounded-full" />
            </div>
            <span className="font-serif font-semibold text-xl tracking-tight">LMS<span className="text-[#BC9640]">Pro</span></span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#problema" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Por qué nosotros</a>
            <a href="#incluye" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Qué incluye</a>
            <a href="#comparativa" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Comparativa</a>
            <a href="#onboarding" className="text-sm font-medium text-gray-600 hover:text-[#1D1D1F] transition-colors">Proceso</a>
          </div>
          <div className="hidden md:flex items-center gap-4">
            <button className="text-sm font-medium text-gray-900 hover:opacity-70 transition-opacity">Login</button>
            <button className="bg-[#2b7d7a] hover:bg-[#226361] text-white px-6 py-2.5 rounded-full text-sm font-semibold transition-all shadow-sm">
              Empieza hoy
            </button>
          </div>
          <button className="md:hidden p-2" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {/* HERO — single column + video */}
      <section className="pt-24 pb-0 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] text-sm font-semibold mb-8">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b7d7a] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2b7d7a]" />
            </span>
            La alternativa a Moodle, Teachable y Kajabi
          </div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.1] font-medium tracking-tight mb-8">
            Tu academia.<br />
            <span className="text-[#BC9640]">Tu marca.</span><br />
            Nuestra tecnología.
          </h1>
          <p className="text-lg md:text-xl text-gray-500 mb-10 leading-relaxed font-light max-w-2xl mx-auto">
            Lanza tu plataforma de formación online con todos los recursos que tus alumnos necesitan. Precio fijo, sin comisiones por venta, 100% white-label.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-[#1D1D1F] hover:bg-black text-white px-8 py-4 rounded-full text-base font-medium transition-all shadow-lg flex items-center justify-center gap-2">
              Solicitar tu demo <ArrowRight className="w-4 h-4" />
            </button>
            <button className="border border-gray-200 hover:border-gray-300 text-[#1D1D1F] px-8 py-4 rounded-full text-base font-medium transition-all">
              Ver comparativa
            </button>
          </div>
        </div>

        {/* Video mockup */}
        <div className="max-w-5xl mx-auto relative">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b7d7a]/15 to-transparent blur-3xl -z-10 rounded-[3rem]" />
          <div className="border border-gray-200/60 rounded-2xl bg-white/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-gray-100 border border-gray-100 aspect-video relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-gradient-to-br from-[#2b7d7a]/10 to-[#BC9640]/10" />
              <div className="relative z-10 text-center">
                <div className="w-20 h-20 mx-auto rounded-full bg-white/90 backdrop-blur-sm shadow-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <PlayCircle className="w-12 h-12 text-[#2b7d7a]" />
                </div>
                <p className="text-sm font-medium text-gray-600">Ver cómo funciona la plataforma</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* EL PROBLEMA QUE RESOLVEMOS (from B) */}
      <section id="problema" className="py-32 bg-gray-50 px-6 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium text-center mb-4">El problema que resolvemos</h2>
            <p className="text-lg text-gray-500 font-light">Por qué las plataformas actuales se quedan cortas.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "😤",
                title: "Las grandes plataformas son caras y complejas",
                desc: "Moodle requiere mantenimiento técnico constante. Teachable se lleva un porcentaje de cada venta que haces. Kajabi cuesta cientos de euros al mes antes de que vendas tu primer curso.",
                color: "bg-red-50 text-red-900 border-red-100"
              },
              {
                icon: "🎨",
                title: "El diseño genérico no transmite tu marca",
                desc: "Tus alumnos notan cuando la plataforma no es tuya. La confianza empieza en el primer clic, y un diseño pobre disminuye el valor percibido de tu contenido.",
                color: "bg-orange-50 text-orange-900 border-orange-100"
              },
              {
                icon: "🧩",
                title: "El contenido se dispersa en múltiples herramientas",
                desc: "Vídeos en Vimeo, pagos en otra app, notas en Notion, comunidad en Facebook... tus alumnos se pierden y tú pierdes tiempo gestionando el caos.",
                color: "bg-amber-50 text-amber-900 border-amber-100"
              }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${item.color} hover:-translate-y-1 transition-transform`}>
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="font-serif text-xl font-medium mb-4">{item.title}</h3>
                <p className="leading-relaxed opacity-80 font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* NUESTRA SOLUCIÓN (from B) */}
      <section className="py-32 px-6 bg-[#1D1D1F] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2b7d7a] rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="font-serif text-4xl md:text-5xl font-medium mb-8">Nuestra solución</h2>
              <p className="text-xl text-gray-400 mb-10 font-light">Diseñamos una experiencia premium para ti y para tus alumnos, eliminando la fricción técnica y los costes ocultos.</p>
              <ul className="space-y-6">
                {[
                  "Precio fijo sin comisiones por venta. Lo que ganas es tuyo.",
                  "Completamente personalizable con tu marca (white-label real).",
                  "Todo en un solo lugar: vídeos, audios, diario, programa semanal, galería y pagos."
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-4 text-lg">
                    <div className="mt-1 bg-[#2b7d7a] rounded-full p-1 text-white shrink-0">
                      <Check className="w-4 h-4" />
                    </div>
                    <span className="text-gray-200 font-light">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            {/* Visual right side */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#BC9640]/20 to-[#2b7d7a]/20 rounded-3xl blur-2xl" />
              <div className="bg-[#2a2a2c] border border-gray-700 rounded-3xl p-8 relative shadow-2xl">
                <div className="space-y-4">
                  <div className="h-8 w-1/3 bg-gray-700 rounded-lg" />
                  <div className="h-4 w-full bg-gray-700/50 rounded" />
                  <div className="h-4 w-5/6 bg-gray-700/50 rounded" />
                  <div className="h-32 w-full bg-gray-700/30 rounded-xl mt-6 border border-gray-600 flex items-center justify-center">
                    <PlayCircle className="w-10 h-10 text-gray-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="h-20 bg-gray-700/30 rounded-xl border border-gray-600" />
                    <div className="h-20 bg-gray-700/30 rounded-xl border border-gray-600" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STUDENT AREA (from C) */}
      <section id="experiencia" className="py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="max-w-3xl mx-auto text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">El área del alumno que marca la diferencia</h2>
            <p className="text-lg text-gray-600 font-light">Diseñada para maximizar la retención y la transformación de tus estudiantes.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6 lg:gap-10">
            {[
              { icon: Calendar, title: "Programa Semanal", desc: "Tus alumnos acceden al contenido semana a semana, en el orden que diseñas tú. Con sistema de progreso visual y posibilidad de marcar cada módulo como completado." },
              { icon: Film, title: "Biblioteca Multimedia", desc: "Vídeos en HD sin anuncios, audios descargables y galería de recursos visuales. Todo organizado por categorías, sin salir de la plataforma." },
              { icon: Play, title: "Mini-player Flotante", desc: "El reproductor de audio flota sobre toda la plataforma. Tus alumnos pueden navegar, leer o escribir en su diario mientras escuchan una práctica guiada." },
              { icon: Book, title: "Diario Personal", desc: "Un espacio privado donde cada alumno puede escribir reflexiones, guardar insights y llevar un registro de su progreso personal. Diferénciate con una funcionalidad única." },
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 lg:p-10 rounded-3xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <div className="w-14 h-14 rounded-2xl bg-[#FAFAF8] flex items-center justify-center mb-6 text-[#2b7d7a]">
                  <item.icon className="w-7 h-7" />
                </div>
                <h3 className="font-serif text-2xl mb-4 font-medium">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed font-light">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHITE-LABEL (from C) */}
      <section className="py-32 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <h2 className="font-serif text-4xl md:text-5xl mb-6 font-medium">White-label total</h2>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">Tu marca es el centro de la experiencia. Sin dejar rastro de nuestra marca.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-12 text-center">
            {[
              { icon: Palette, color: "bg-[#BC9640]/10 text-[#BC9640]", title: "Tu logo y colores", desc: "Personaliza cada elemento visual. Tus alumnos ven tu marca, tu identidad y tus colores, no los nuestros." },
              { icon: Globe, color: "bg-[#2b7d7a]/10 text-[#2b7d7a]", title: "Tu dominio", desc: "Publica en tuacademia.com con certificado SSL incluido y configuración automática." },
              { icon: Mail, color: "bg-[#1D1D1F]/5 text-[#1D1D1F]", title: "Tus comunicaciones", desc: "Emails transaccionales de bienvenida y avisos con tu remitente y tu diseño personalizado." },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center">
                <div className={`w-20 h-20 rounded-full ${item.color} flex items-center justify-center mb-6`}>
                  <item.icon className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                <p className="text-gray-600 font-light leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* QUÉ INCLUYE LA PLATAFORMA (from A) */}
      <section id="incluye" className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-20">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">¿Qué incluye la plataforma?</h2>
            <p className="text-xl text-gray-500 font-light max-w-2xl">Todo lo que necesitas para operar una academia digital profesional, estructurado para crecer contigo.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-[#2b7d7a] uppercase pb-4 border-b border-gray-100">Para el creador (Admin)</h3>
              <div className="space-y-10">
                {[
                  { icon: Settings, title: "Panel de administración", desc: "Gestiona cursos, alumnos y contenido desde un editor visual de bloques intuitivo." },
                  { icon: CreditCard, title: "Pagos con Stripe", desc: "Crea planes de membresía, precios y cobra automáticamente sin intermediarios." },
                  { icon: Lock, title: "Control de acceso", desc: "Define con precisión qué contenido ve cada nivel de suscripción." },
                  { icon: ImageIcon, title: "Galería multimedia", desc: "Sube y organiza imágenes, vídeos y audios en tu biblioteca privada." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-[#2b7d7a]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#2b7d7a]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-[#BC9640] uppercase pb-4 border-b border-gray-100">Para el alumno</h3>
              <div className="space-y-10">
                {[
                  { icon: Film, title: "Vídeos en HD", desc: "Reproductor seguro y nativo, sin dependencias de YouTube ni distracciones." },
                  { icon: Headphones, title: "Audios y meditaciones", desc: "Mini-player flotante disponible y persistente en toda la plataforma." },
                  { icon: Calendar, title: "Programa semanal", desc: "Contenido estructurado semana a semana con seguimiento visual de progreso." },
                  { icon: Book, title: "Diario personal", desc: "Espacio integrado de reflexión y journaling privado para cada alumno." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-[#BC9640]/10 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-[#795901]" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-12">
              <h3 className="text-sm font-bold tracking-widest text-gray-400 uppercase pb-4 border-b border-gray-100">Plataforma</h3>
              <div className="space-y-10">
                {[
                  { icon: ShieldCheck, title: "Autenticación segura", desc: "Registro y login fluidos impulsados por tecnología robusta (Supabase Auth)." },
                  { icon: Smartphone, title: "100% responsive", desc: "Experiencia de usuario perfecta en móvil, tablet y escritorio." },
                  { icon: Palette, title: "White-label", desc: "Tu logo, tus colores, tu dominio. Completamente bajo tu identidad de marca." },
                  { icon: Zap, title: "Alta velocidad", desc: "Arquitectura moderna para carga instantánea, sin dependencias pesadas." },
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="mt-1 w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                      <item.icon className="w-5 h-5 text-gray-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-lg mb-2">{item.title}</h4>
                      <p className="text-gray-500 leading-relaxed font-light">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* COMPARATIVA DEFINITIVA (from B) */}
      <section id="comparativa" className="py-32 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl font-medium mb-6">La comparativa definitiva</h2>
            <p className="text-lg text-gray-500 font-light">Mira cómo nos comparamos con las opciones tradicionales del mercado.</p>
          </div>
          <div className="overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-left border-b border-gray-200 font-medium text-gray-500 w-1/4">Funcionalidad</th>
                  <th className="p-6 text-center border-b border-gray-200 bg-[#2b7d7a] text-white font-bold rounded-t-2xl w-[22%]">Esta LMS</th>
                  <th className="p-6 text-center border-b border-gray-200 font-medium text-gray-600 w-[18%]">Moodle</th>
                  <th className="p-6 text-center border-b border-gray-200 font-medium text-gray-600 w-[18%]">Teachable</th>
                  <th className="p-6 text-center border-b border-gray-200 font-medium text-gray-600 w-[18%]">Kajabi</th>
                </tr>
              </thead>
              <tbody className="text-sm md:text-base">
                {[
                  ["Precio mensual", "Fijo", "Variable", "+ comisiones", "€150+"],
                  ["White-label completo", true, "Parcial", false, true],
                  ["Diario del alumno", true, false, false, false],
                  ["Programa semanal integrado", true, "Plugin", false, false],
                  ["Mini-player de audio", true, false, false, false],
                  ["Sin comisiones por venta", true, true, false, true],
                  ["Instalación incluida", true, false, true, true],
                  ["Soporte personalizado", true, false, "Email", "Email"]
                ].map((row, i) => (
                  <tr key={i} className="group hover:bg-gray-50 transition-colors">
                    <td className="p-6 border-b border-gray-100 font-medium text-gray-900">{row[0]}</td>
                    <td className="p-6 border-b border-gray-100 text-center bg-[#2b7d7a]/5 group-hover:bg-[#2b7d7a]/10 font-bold text-[#2b7d7a]">
                      {typeof row[1] === "boolean" ? (row[1] ? <Check className="w-5 h-5 mx-auto" /> : <X className="w-5 h-5 mx-auto text-red-300" />) : row[1]}
                    </td>
                    <td className="p-6 border-b border-gray-100 text-center text-gray-500">
                      {typeof row[2] === "boolean" ? (row[2] ? <Check className="w-5 h-5 mx-auto text-gray-400" /> : <X className="w-5 h-5 mx-auto text-gray-300" />) : row[2]}
                    </td>
                    <td className="p-6 border-b border-gray-100 text-center text-gray-500">
                      {typeof row[3] === "boolean" ? (row[3] ? <Check className="w-5 h-5 mx-auto text-gray-400" /> : <X className="w-5 h-5 mx-auto text-gray-300" />) : row[3]}
                    </td>
                    <td className="p-6 border-b border-gray-100 text-center text-gray-500">
                      {typeof row[4] === "boolean" ? (row[4] ? <Check className="w-5 h-5 mx-auto text-gray-400" /> : <X className="w-5 h-5 mx-auto text-gray-300" />) : row[4]}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ADMIN PANEL (from C) */}
      <section className="py-32 bg-[#FAFAF8]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col lg:flex-row gap-16 items-center">
            <div className="lg:w-1/3">
              <h2 className="font-serif text-4xl mb-6 font-medium leading-tight">Tú controlas todo el contenido</h2>
              <p className="text-lg text-gray-600 font-light mb-8">Un panel de administración intuitivo y potente, diseñado para creadores, no para programadores.</p>
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

      {/* STRIPE */}
      <section className="py-24 bg-[#1D1D1F] text-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl mb-4 font-medium">Pagos integrados con Stripe</h2>
            <p className="text-gray-400 font-light">Vende con confianza, automatiza el acceso.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
            <div className="hidden lg:block absolute top-1/2 left-[10%] right-[10%] h-[1px] bg-white/10 -translate-y-1/2" />
            {["Crea tus planes", "Define el precio", "Stripe gestiona el cobro", "Acceso automático al pagar"].map((text, i) => (
              <div key={i} className="relative z-10 flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-[#1D1D1F] border-2 border-[#BC9640] text-[#BC9640] flex items-center justify-center font-serif text-xl mb-6">
                  0{i + 1}
                </div>
                <h4 className="font-medium text-lg">{text}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CÓMO EMPEZAR TU ACADEMIA (from C) */}
      <section id="onboarding" className="py-32 bg-[#FAFAF8]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="font-serif text-4xl mb-4 font-medium">Cómo empezar tu academia</h2>
            <p className="text-gray-600 font-light">Un proceso estructurado para lanzar en 4 semanas.</p>
          </div>
          <div className="space-y-8 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gray-200">
            {[
              { sem: "Semana 1", title: "Configuración y personalización de tu academia" },
              { sem: "Semana 2", title: "Subida de contenido y estructura de cursos" },
              { sem: "Semana 3", title: "Pruebas y primeros alumnos beta" },
              { sem: "Semana 4", title: "Lanzamiento oficial" },
            ].map((item, i) => (
              <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group">
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
          <h2 className="font-serif text-4xl text-center mb-16 font-medium">Preguntas frecuentes</h2>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <div key={i} className="border border-gray-100 rounded-2xl overflow-hidden bg-white shadow-sm">
                <button className="w-full text-left px-6 py-5 flex items-center justify-between" onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span className="font-medium pr-8">{faq.q}</span>
                  <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} />
                </button>
                <div className={`px-6 overflow-hidden transition-all duration-300 ${openFaq === i ? 'max-h-40 pb-5 opacity-100' : 'max-h-0 opacity-0'}`}>
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
          <h2 className="font-serif text-4xl md:text-5xl mb-8 font-medium">¿Lista para lanzar tu academia?</h2>
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
          <div className="text-sm text-gray-500 font-light">© {new Date().getFullYear()} LMSPro. Todos los derechos reservados.</div>
        </div>
      </footer>
    </div>
  );
}
