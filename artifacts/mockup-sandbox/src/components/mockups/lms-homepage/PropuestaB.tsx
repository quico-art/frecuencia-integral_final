import React from "react";
import { 
  CheckCircle2, 
  XCircle, 
  Video, 
  Music, 
  CalendarDays, 
  BookOpen, 
  ArrowRight, 
  Check, 
  X,
  PlayCircle
} from "lucide-react";
import { Link } from "wouter";

export function PropuestaB() {
  return (
    <div className="min-h-screen bg-white text-[#1D1D1F] font-sans selection:bg-[#2b7d7a] selection:text-white pb-20 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-[#2b7d7a] flex items-center justify-center">
              <span className="text-white font-serif font-bold text-xl leading-none">A</span>
            </div>
            <span className="font-serif font-bold text-xl tracking-tight">Academia</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-600">
            <a href="#problema" className="hover:text-[#1D1D1F] transition-colors">Beneficios</a>
            <a href="#comparativa" className="hover:text-[#1D1D1F] transition-colors">Comparativa</a>
            <a href="#precios" className="hover:text-[#1D1D1F] transition-colors">Precios</a>
          </div>
          <button className="bg-[#1D1D1F] text-white px-6 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-all transform hover:scale-105">
            Hablar con el equipo
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-40 pb-20 px-6 max-w-5xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2b7d7a]/10 text-[#2b7d7a] text-sm font-semibold mb-8">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#2b7d7a] opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#2b7d7a]"></span>
          </span>
          La alternativa a Moodle, Teachable y Kajabi
        </div>
        <h1 className="text-5xl md:text-7xl font-serif font-bold tracking-tight leading-[1.1] mb-8 text-balance">
          Deja de pagar por funciones que <span className="text-gray-400 italic">no usas</span>.
        </h1>
        <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed font-light text-balance">
          Una plataforma LMS construida para creadores que quieren lanzar rápido, cobrar automáticamente y ofrecer una experiencia de aprendizaje de primera clase.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="w-full sm:w-auto bg-[#2b7d7a] text-white px-8 py-4 rounded-full text-lg font-medium hover:bg-[#236664] transition-all flex items-center justify-center gap-2 group">
            Ver cómo funciona
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </button>
          <p className="text-sm text-gray-500 sm:hidden">Sin tarjeta de crédito requerida</p>
        </div>
        
        {/* Mockup Preview UI */}
        <div className="mt-20 relative mx-auto max-w-4xl">
          <div className="absolute inset-0 bg-gradient-to-b from-[#2b7d7a]/20 to-transparent blur-3xl -z-10 rounded-[3rem]"></div>
          <div className="border border-gray-200/60 rounded-2xl bg-white/50 backdrop-blur-sm p-2 shadow-2xl">
            <div className="rounded-xl overflow-hidden bg-gray-50 border border-gray-100 aspect-video relative flex items-center justify-center group cursor-pointer">
              <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors"></div>
              <PlayCircle className="w-20 h-20 text-[#2b7d7a] opacity-80 group-hover:opacity-100 group-hover:scale-110 transition-all" />
            </div>
          </div>
        </div>
      </section>

      {/* Problema */}
      <section id="problema" className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
            El problema que resolvemos
          </h2>
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
                desc: "Vídeos en Vimeo, pagos en Stripe o PayPal, notas en Notion, comunidad en Facebook... tus alumnos se pierden y tú pierdes tiempo gestionando el caos.",
                color: "bg-amber-50 text-amber-900 border-amber-100"
              }
            ].map((item, i) => (
              <div key={i} className={`p-8 rounded-3xl border ${item.color} transition-transform hover:-translate-y-1`}>
                <div className="text-4xl mb-6">{item.icon}</div>
                <h3 className="text-xl font-bold mb-4">{item.title}</h3>
                <p className="opacity-80 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solución */}
      <section className="py-24 px-6 bg-[#1D1D1F] text-white overflow-hidden relative">
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#2b7d7a] rounded-full blur-[120px] opacity-20 translate-x-1/3 -translate-y-1/3"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl md:text-5xl font-serif font-bold mb-8 text-white">
                Nuestra Solución
              </h2>
              <p className="text-xl text-gray-400 mb-10 text-balance font-light">
                Diseñamos una experiencia premium para ti y para tus alumnos, eliminando la fricción técnica y los costes ocultos.
              </p>
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
                    <span className="text-gray-200">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-[#BC9640]/20 to-[#2b7d7a]/20 rounded-3xl blur-2xl"></div>
              <div className="bg-[#2a2a2c] border border-gray-700 rounded-3xl p-8 relative shadow-2xl">
                <div className="space-y-4">
                  <div className="h-8 w-1/3 bg-gray-700 rounded-lg animate-pulse"></div>
                  <div className="h-4 w-full bg-gray-700/50 rounded flex gap-2"></div>
                  <div className="h-4 w-5/6 bg-gray-700/50 rounded flex gap-2"></div>
                  <div className="h-32 w-full bg-gray-700/30 rounded-xl mt-6 border border-gray-600 flex items-center justify-center">
                    <Video className="w-8 h-8 text-gray-500" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-4">
                    <div className="h-20 bg-gray-700/30 rounded-xl border border-gray-600"></div>
                    <div className="h-20 bg-gray-700/30 rounded-xl border border-gray-600"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Comparativa */}
      <section id="comparativa" className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              La comparativa definitiva
            </h2>
            <p className="text-xl text-gray-500">Mira cómo nos comparamos con las opciones tradicionales.</p>
          </div>

          <div className="overflow-x-auto pb-8 -mx-6 px-6 sm:mx-0 sm:px-0">
            <table className="w-full min-w-[800px] border-collapse">
              <thead>
                <tr>
                  <th className="p-6 text-left border-b border-gray-200 bg-white font-medium text-gray-500 w-1/4">Funcionalidad</th>
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

      {/* Qué obtienen tus alumnos */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
            Qué obtienen tus alumnos
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Video, title: "Vídeos sin anuncios", desc: "Alojamiento premium integrado sin distracciones." },
              { icon: Music, title: "Audio player flotante", desc: "Para que escuchen mientras navegan por la plataforma." },
              { icon: CalendarDays, title: "Programa semanal", desc: "Estructura clara para mantener la motivación." },
              { icon: BookOpen, title: "Diario personal", desc: "Espacio privado para reflexiones y ejercicios." }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm text-center group hover:border-[#2b7d7a]/30 transition-colors">
                <div className="w-16 h-16 mx-auto bg-[#2b7d7a]/10 text-[#2b7d7a] rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#2b7d7a] group-hover:text-white transition-all">
                  <item.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonios */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-serif font-bold text-center mb-16">
            Historias de éxito
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "Por fin una plataforma que parece mía. Mis alumnos no saben que es white-label y eso da muchísima profesionalidad.",
                name: "Laura M.",
                role: "Coach de bienestar"
              },
              {
                quote: "La integración con Stripe fue inmediata. No tuve que programar nada. Lancé mi primer curso en 2 semanas.",
                name: "Marcos R.",
                role: "Formador deportivo"
              },
              {
                quote: "El diario del alumno es algo que no he visto en ninguna otra plataforma. Mis pacientes adoran poder escribir ahí.",
                name: "Ana P.",
                role: "Psicóloga"
              }
            ].map((item, i) => (
              <div key={i} className="bg-white p-8 rounded-3xl border border-gray-100 shadow-sm relative">
                <div className="text-4xl text-[#BC9640] absolute top-6 left-6 opacity-20 font-serif">"</div>
                <p className="text-lg text-gray-700 mb-8 relative z-10 pt-4 font-medium italic">"{item.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center font-bold text-gray-400">
                    {item.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900">{item.name}</h4>
                    <p className="text-sm text-gray-500">{item.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Precios */}
      <section id="precios" className="py-24 bg-gray-50 px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-serif font-bold mb-6">
              Precios simples y transparentes
            </h2>
            <p className="text-xl text-gray-500">Sin comisiones ocultas. Cancela cuando quieras.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto items-center">
            {/* Esencial */}
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-200 shadow-sm">
              <h3 className="text-2xl font-bold mb-2">Esencial</h3>
              <p className="text-gray-500 mb-6">Para empezar tu academia</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">€49</span>
                <span className="text-gray-500">/mes</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["1 curso activo", "Hasta 100 alumnos", "Pagos con Stripe", "Soporte básico"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-700">
                    <CheckCircle2 className="w-5 h-5 text-[#2b7d7a]" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl font-bold border-2 border-gray-200 text-gray-900 hover:border-[#2b7d7a] hover:text-[#2b7d7a] transition-colors">
                Empezar gratis
              </button>
            </div>

            {/* Pro */}
            <div className="bg-[#1D1D1F] text-white p-10 rounded-[2.5rem] shadow-2xl relative transform md:scale-105 border border-gray-800">
              <div className="absolute top-0 right-8 transform -translate-y-1/2 bg-[#BC9640] text-white text-xs font-bold uppercase tracking-wider py-1 px-3 rounded-full">
                Más popular
              </div>
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <p className="text-gray-400 mb-6">Para creadores establecidos</p>
              <div className="mb-8">
                <span className="text-4xl font-bold">€99</span>
                <span className="text-gray-400">/mes</span>
              </div>
              <ul className="space-y-4 mb-10">
                {["Cursos ilimitados", "Alumnos ilimitados", "Multimedia completa", "Soporte prioritario", "White-label total"].map((feat, i) => (
                  <li key={i} className="flex items-center gap-3 text-gray-200">
                    <CheckCircle2 className="w-5 h-5 text-[#BC9640]" />
                    {feat}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl font-bold bg-[#BC9640] text-white hover:bg-[#a38237] transition-colors shadow-lg shadow-[#BC9640]/20">
                Comenzar prueba
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 bg-[#2b7d7a] text-white text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-serif font-bold mb-8 text-balance">
            Lanza tu academia esta semana
          </h2>
          <p className="text-xl text-teal-100 mb-10 font-light">
            Únete a cientos de creadores que ya han recuperado el control de su contenido y sus ingresos.
          </p>
          <button className="bg-white text-[#2b7d7a] px-8 py-4 rounded-full text-lg font-bold hover:bg-gray-100 transition-all shadow-xl shadow-teal-900/20 transform hover:-translate-y-1">
            Solicitar demo gratuita
          </button>
        </div>
      </section>
    </div>
  );
}
