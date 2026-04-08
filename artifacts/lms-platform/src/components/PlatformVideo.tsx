import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Play, Pause, SkipForward, Calendar, Film, Book,
  Settings, CreditCard, Users, ChevronRight, Check,
  Volume2, BookOpen, ArrowRight, BarChart3, Pencil,
  FileText, Headphones, Download, CheckCircle, AlignLeft
} from 'lucide-react';

const screens = [
  {
    id: 'landing',
    label: 'Tu academia',
    content: () => (
      <div className="h-full bg-white flex flex-col">
        <div className="h-12 bg-white border-b border-gray-100 flex items-center px-6 gap-4 shrink-0">
          <div className="w-5 h-5 rounded bg-[#1D1D1F]" />
          <span className="font-semibold text-sm tracking-tight">AcademiaDemo</span>
          <div className="flex-1" />
          <div className="flex gap-3 text-xs text-gray-500">
            <span>Programa</span><span>Multimedia</span><span>Comunidad</span>
          </div>
          <div className="bg-[#2b7d7a] text-white text-xs px-4 py-1.5 rounded-full font-medium">Entrar</div>
        </div>
        <div className="flex-1 flex flex-col items-center justify-center px-8 text-center bg-gradient-to-b from-[#FAFAF8] to-white">
          <div className="w-12 h-12 rounded-2xl bg-[#1D1D1F] mb-5 flex items-center justify-center">
            <div className="w-5 h-5 rounded-full bg-white" />
          </div>
          <h2 className="font-serif text-2xl font-medium mb-2 text-[#1D1D1F]">Bienvenida a AcademiaDemo</h2>
          <p className="text-gray-500 text-sm mb-8 max-w-xs">Accede a tu formación personalizada y empieza tu transformación hoy.</p>
          <div className="flex gap-3">
            <div className="bg-[#1D1D1F] text-white text-xs px-5 py-2.5 rounded-full font-medium">Plan Básico — €49/mes</div>
            <div className="bg-[#BC9640] text-white text-xs px-5 py-2.5 rounded-full font-medium">Plan Premium — €99/mes</div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'dashboard',
    label: 'Área del alumno',
    content: () => (
      <div className="h-full bg-[#0f0f0f] flex text-white overflow-hidden">
        {/* Sidebar */}
        <div className="w-36 border-r border-gray-800 shrink-0 flex flex-col pt-3 gap-0.5 px-2">
          <div className="text-[8px] text-gray-600 uppercase tracking-widest px-2 mb-1">Mi academia</div>
          {[
            { emoji: '🏠', label: 'Inicio', active: true },
            { emoji: '📚', label: 'Formaciones' },
            { emoji: '🎨', label: 'Arteterapia' },
            { emoji: '🎵', label: 'Multimedia' },
            { emoji: '📄', label: 'Materiales' },
            { emoji: '📝', label: 'Diario' },
            { emoji: '💬', label: 'Comunidad' },
            { emoji: '📊', label: 'Progreso' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-medium ${item.active ? 'bg-[#2b7d7a]/20 text-[#2b7d7a]' : 'text-gray-500'}`}>
              <span className="text-xs">{item.emoji}</span> {item.label}
            </div>
          ))}
        </div>
        {/* Main */}
        <div className="flex-1 p-4 overflow-hidden">
          <h2 className="font-serif text-base font-medium mb-0.5">Bienvenida, María 👋</h2>
          <p className="text-gray-400 text-[10px] mb-3">Semana 4 de 12 · 33% completado</p>
          <div className="bg-gray-800 rounded-full h-1.5 w-full mb-4">
            <div className="bg-[#BC9640] h-1.5 rounded-full w-1/3" />
          </div>
          <div className="grid grid-cols-2 gap-2 mb-3">
            {[
              { emoji: '📚', label: 'Formaciones', active: true },
              { emoji: '🎨', label: 'Arteterapia' },
              { emoji: '🎵', label: 'Multimedia' },
              { emoji: '📝', label: 'Diario' },
            ].map((item, i) => (
              <div key={i} className={`rounded-xl p-2.5 flex items-center gap-2 border ${item.active ? 'bg-[#BC9640]/15 border-[#BC9640]/30' : 'bg-gray-800/50 border-gray-700/50'}`}>
                <span className="text-base">{item.emoji}</span>
                <span className="text-[10px] font-medium text-gray-300">{item.label}</span>
              </div>
            ))}
          </div>
          <div className="bg-[#2b7d7a]/10 border border-[#2b7d7a]/20 rounded-xl p-2.5 mb-2">
            <div className="text-[9px] text-[#2b7d7a] font-semibold mb-0.5">Continúa donde lo dejaste</div>
            <div className="text-[10px] text-gray-300">Semana 4 · Ejercicio 2: Protocolo de anclaje →</div>
          </div>
          <div className="bg-gray-800/60 rounded-xl p-2.5 border border-gray-700/50 flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#BC9640]/20 flex items-center justify-center shrink-0"><Play className="w-3 h-3 text-[#BC9640]" /></div>
            <div className="flex-1 min-w-0">
              <div className="text-[10px] font-medium truncate">Meditación de anclaje — S4</div>
              <div className="w-full bg-gray-700 h-1 rounded-full mt-1"><div className="bg-[#BC9640] w-2/5 h-full rounded-full" /></div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'semanas',
    label: 'Formaciones',
    content: () => (
      <div className="h-full bg-[#0f0f0f] flex text-white overflow-hidden">
        <div className="w-36 border-r border-gray-800 shrink-0 flex flex-col pt-3 gap-0.5 px-2">
          <div className="text-[8px] text-gray-600 uppercase tracking-widest px-2 mb-1">Mi academia</div>
          {[
            { emoji: '🏠', label: 'Inicio' },
            { emoji: '📚', label: 'Formaciones', active: true },
            { emoji: '🎨', label: 'Arteterapia' },
            { emoji: '🎵', label: 'Multimedia' },
            { emoji: '📄', label: 'Materiales' },
            { emoji: '📝', label: 'Diario' },
            { emoji: '💬', label: 'Comunidad' },
            { emoji: '📊', label: 'Progreso' },
          ].map((item, i) => (
            <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg text-[10px] font-medium ${item.active ? 'bg-[#2b7d7a]/20 text-[#2b7d7a]' : 'text-gray-500'}`}>
              <span className="text-xs">{item.emoji}</span> {item.label}
            </div>
          ))}
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-xs font-semibold">Método TCT — 12 semanas</h2>
            <span className="text-[9px] text-gray-500">4 / 12</span>
          </div>
          <div className="space-y-1.5">
            {[
              { w: 'Semana 1', t: 'Fundamentos del Método TCT', done: true, p: 100 },
              { w: 'Semana 2', t: 'Reconocimiento de patrones', done: true, p: 100 },
              { w: 'Semana 3', t: 'Herramientas de integración', done: true, p: 100 },
              { w: 'Semana 4', t: 'Práctica de anclaje profundo', active: true, p: 35 },
              { w: 'Semana 5', t: 'Expansión de conciencia', locked: true, p: 0 },
              { w: 'Semana 6', t: 'Integración y cierre del ciclo', locked: true, p: 0 },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2.5 p-2.5 rounded-xl border ${item.active ? 'border-[#BC9640]/30 bg-[#BC9640]/8' : item.done ? 'border-gray-700/40 bg-gray-800/30' : 'border-gray-800/30 bg-gray-800/10 opacity-50'}`}>
                <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${item.done ? 'bg-[#2b7d7a]' : item.active ? 'bg-[#BC9640]/30' : 'bg-gray-700'}`}>
                  {item.done ? <Check className="w-3 h-3" /> : item.active ? <Play className="w-2.5 h-2.5 text-[#BC9640]" /> : <span className="text-[9px] text-gray-500">{i + 1}</span>}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-gray-500">{item.w}</div>
                  <div className="text-[10px] font-medium text-gray-200 truncate">{item.t}</div>
                  {item.active && <div className="mt-1 w-16 bg-gray-700 h-0.5 rounded-full"><div className="bg-[#BC9640] h-full rounded-full" style={{ width: '35%' }} /></div>}
                </div>
                {(item.done || item.active) && <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'descripcion',
    label: 'Detalle de semana',
    content: () => (
      <div className="h-full bg-[#0f0f0f] flex flex-col text-white overflow-hidden">
        {/* Week header */}
        <div className="px-4 pt-3 pb-2 border-b border-gray-800 shrink-0">
          <div className="text-[9px] text-[#BC9640] font-semibold tracking-widest uppercase mb-1">← Formaciones</div>
          <div className="flex items-center justify-between">
            <div>
              <div className="text-[10px] text-[#BC9640] tracking-widest uppercase">Semana 4</div>
              <div className="font-serif text-sm font-medium">Práctica de anclaje profundo</div>
            </div>
            <div className="text-right">
              <div className="text-[9px] text-gray-500">35%</div>
              <div className="w-14 bg-gray-800 h-1 rounded-full mt-1"><div className="bg-[#BC9640] h-full rounded-full w-[35%]" /></div>
            </div>
          </div>
        </div>
        {/* Week tabs */}
        <div className="flex border-b border-gray-800 shrink-0 overflow-x-hidden">
          {['📋 Descripción', '💡 Conceptos', '📈 Ejercicios', '🎨 Arteterapia', '🎵 Multimedia', '📄 Materiales', '📓 Diario', '✅ Completar'].map((t, i) => (
            <div key={i} className={`px-2.5 py-2 text-[9px] font-medium whitespace-nowrap border-b-2 shrink-0 ${i === 0 ? 'border-[#BC9640] text-[#BC9640]' : 'border-transparent text-gray-600'}`}>{t}</div>
          ))}
        </div>
        {/* Descripción content */}
        <div className="flex-1 p-4 overflow-hidden space-y-3">
          <div className="bg-[#BC9640]/10 border border-[#BC9640]/20 rounded-xl p-3">
            <div className="text-[8px] text-[#BC9640] font-semibold uppercase tracking-widest mb-1">Objetivo de la semana</div>
            <p className="text-[10px] text-gray-200 leading-relaxed">Instalar un anclaje emocional positivo que puedas activar conscientemente en momentos de tensión o desconexión.</p>
          </div>
          <div>
            <div className="text-[8px] text-gray-500 uppercase tracking-widest mb-1.5">Introducción</div>
            <p className="text-[10px] text-gray-400 leading-relaxed">El anclaje es una de las técnicas más potentes del Método TCT. Esta semana pasamos de la comprensión intelectual a la instalación real de un recurso interno...</p>
          </div>
          <div className="grid grid-cols-2 gap-1.5">
            {['3 lecturas + neurociencia', '3 ejercicios (2 pendientes)', '1 clase + 1 meditación', '3 fichas descargables'].map((it, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-gray-800/40 rounded-lg p-2 border border-gray-700/40">
                <Check className="w-2.5 h-2.5 text-[#2b7d7a] shrink-0" />
                <span className="text-[9px] text-gray-300">{it}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-1.5 text-[9px] text-gray-500">
            <Calendar className="w-2.5 h-2.5" /> Dedicación estimada: <span className="text-gray-300">6–8 horas de trabajo personal</span>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'conceptos',
    label: 'Lectura de conceptos',
    content: () => (
      <div className="h-full bg-[#0f0f0f] flex flex-col text-white overflow-hidden">
        <div className="px-4 pt-3 pb-2 border-b border-gray-800 shrink-0">
          <div className="text-[9px] text-gray-500 mb-1">← Semana 4</div>
          <div className="flex items-center justify-between">
            <div className="font-serif text-sm font-medium">Práctica de anclaje profundo</div>
            <div className="text-right"><div className="text-[9px] text-gray-500">35%</div></div>
          </div>
        </div>
        <div className="flex border-b border-gray-800 shrink-0">
          {['📋 Descripción', '💡 Conceptos', '📈 Ejercicios', '🎨 Arteterapia', '🎵 Multimedia', '📄 Materiales'].map((t, i) => (
            <div key={i} className={`px-2.5 py-2 text-[9px] font-medium whitespace-nowrap border-b-2 shrink-0 ${i === 1 ? 'border-[#BC9640] text-[#BC9640]' : 'border-transparent text-gray-600'}`}>{t}</div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden p-4 space-y-2">
          {/* Concepto 1 — done, collapsed */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-3 p-3">
              <div className="w-5 h-5 rounded-full bg-[#2b7d7a] flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-gray-300">¿Qué es el anclaje emocional?</div>
                <div className="text-[9px] text-gray-500">💡 Lectura · 12 min</div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
            </div>
          </div>
          {/* Concepto 2 — done, collapsed */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-800/30">
            <div className="flex items-center gap-3 p-3">
              <div className="w-5 h-5 rounded-full bg-[#2b7d7a] flex items-center justify-center shrink-0"><Check className="w-2.5 h-2.5" /></div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-gray-300">Neurociencia del anclaje</div>
                <div className="text-[9px] text-gray-500">💡 Lectura · 10 min</div>
              </div>
              <ChevronRight className="w-3 h-3 text-gray-600 shrink-0" />
            </div>
          </div>
          {/* Concepto 3 — EXPANDED with reading content */}
          <div className="rounded-xl border border-[#2b7d7a]/25 bg-[#2b7d7a]/5 overflow-hidden">
            <div className="flex items-center gap-3 p-3">
              <div className="w-5 h-5 rounded-full bg-gray-700 border border-gray-600 flex items-center justify-center shrink-0"><span className="text-[8px] text-gray-400">3</span></div>
              <div className="flex-1 min-w-0">
                <div className="text-[10px] font-medium text-gray-100">Los 5 tipos de anclaje TCT</div>
                <div className="text-[9px] text-[#2b7d7a]">💡 Lectura · 18 min · Pendiente</div>
              </div>
              <ChevronRight className="w-3 h-3 text-[#2b7d7a] rotate-90 shrink-0" />
            </div>
            {/* Expanded reading */}
            <div className="px-4 pb-4 pt-1 border-t border-gray-700/40">
              <p className="text-[10px] text-gray-300 leading-relaxed mb-3">Kinestésico, auditivo, visual, olfativo y combinado. Cuál elegir según el perfil sensorial de cada persona y cómo adaptar la técnica a diferentes contextos de vida.</p>
              <div className="bg-gray-900/60 border-l-2 border-[#BC9640] pl-3 py-2 mb-3 rounded-r-lg">
                <p className="text-[9px] text-[#BC9640] italic leading-relaxed">"El anclaje más potente es el que combina al menos dos canales sensoriales simultáneamente."</p>
              </div>
              <button className="bg-[#2b7d7a] text-white text-[9px] px-3 py-1.5 rounded-lg font-medium">Marcar como leído</button>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'ejercicios',
    label: 'Ejercicios semanales',
    content: () => (
      <div className="h-full bg-[#0f0f0f] flex flex-col text-white overflow-hidden">
        <div className="px-4 pt-3 pb-2 border-b border-gray-800 shrink-0">
          <div className="text-[9px] text-gray-500 mb-1">← Semana 4</div>
          <div className="font-serif text-sm font-medium">Práctica de anclaje profundo</div>
        </div>
        <div className="flex border-b border-gray-800 shrink-0">
          {['📋 Descripción', '💡 Conceptos', '📈 Ejercicios', '🎨 Arteterapia', '🎵 Multimedia', '📄 Materiales'].map((t, i) => (
            <div key={i} className={`px-2.5 py-2 text-[9px] font-medium whitespace-nowrap border-b-2 shrink-0 ${i === 2 ? 'border-[#BC9640] text-[#BC9640]' : 'border-transparent text-gray-600'}`}>{t}</div>
          ))}
        </div>
        <div className="flex-1 overflow-hidden p-4 space-y-2.5">
          {/* Ejercicio 1 — done */}
          <div className="rounded-xl border border-gray-700/50 bg-gray-800/30 p-3">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#2b7d7a] flex items-center justify-center shrink-0 mt-0.5"><Check className="w-2.5 h-2.5" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-gray-300 mb-1">Identificación de tu estado recurso</div>
                <div className="text-[9px] text-[#BC9640] uppercase tracking-widest mb-1">Pregunta guía</div>
                <p className="text-[9px] text-gray-500 italic leading-relaxed">Recuerda un momento en tu vida en el que te sentiste completamente seguro, pleno y en tu máximo potencial...</p>
                <div className="flex items-center gap-1 mt-2"><CheckCircle className="w-3 h-3 text-[#2b7d7a]" /><span className="text-[9px] text-[#2b7d7a] font-medium">Completado</span></div>
              </div>
            </div>
          </div>
          {/* Ejercicio 2 — in progress, with text area */}
          <div className="rounded-xl border border-[#BC9640]/25 bg-[#BC9640]/5 p-3">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#BC9640]/20 border border-[#BC9640]/40 flex items-center justify-center shrink-0 mt-0.5"><Pencil className="w-2 h-2 text-[#BC9640]" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-gray-100 mb-1">Protocolo de anclaje kinestésico</div>
                <div className="text-[9px] text-[#BC9640] uppercase tracking-widest mb-1">Pregunta guía</div>
                <p className="text-[9px] text-gray-400 italic leading-relaxed">Siguiendo el audio-guía, realiza el protocolo 3 veces en los próximos 5 días. Después de cada sesión, describe qué observas...</p>
                <div className="mt-2 bg-gray-900/70 rounded-lg p-2.5 border border-gray-700 min-h-[36px]">
                  <p className="text-[9px] text-gray-600 italic">Escribe tu respuesta aquí...</p>
                </div>
              </div>
            </div>
          </div>
          {/* Ejercicio 3 — pending */}
          <div className="rounded-xl border border-[#BC9640]/15 bg-[#BC9640]/3 p-3 opacity-70">
            <div className="flex items-start gap-2.5">
              <div className="w-5 h-5 rounded-full bg-[#BC9640]/15 border border-[#BC9640]/25 flex items-center justify-center shrink-0 mt-0.5"><Pencil className="w-2 h-2 text-[#BC9640]/60" /></div>
              <div className="flex-1">
                <div className="text-[10px] font-semibold text-gray-400">Carta a tu patrón limitante</div>
                <div className="text-[9px] text-gray-600 mt-1">Escríbele una carta en segunda persona al patrón que quieres transformar...</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'video',
    label: 'Multimedia',
    content: () => (
      <div className="h-full bg-[#0a0a0a] flex flex-col text-white">
        <div className="bg-black relative flex items-center justify-center overflow-hidden shrink-0" style={{ height: '52%' }}>
          <div className="absolute inset-0 bg-gradient-to-br from-[#2b7d7a]/20 to-[#BC9640]/10" />
          <div className="relative z-10 text-center">
            <div className="w-12 h-12 rounded-full bg-white/10 backdrop-blur flex items-center justify-center mx-auto mb-2 border border-white/20">
              <Pause className="w-5 h-5 text-white" />
            </div>
            <p className="text-xs text-white/60">Meditación de Anclaje · Semana 4</p>
          </div>
          <div className="absolute bottom-0 left-0 right-0 px-4 pb-3">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[10px] text-white/50">12:40</span>
              <div className="flex-1 bg-white/20 h-1 rounded-full"><div className="bg-[#BC9640] h-full w-2/3 rounded-full" /></div>
              <span className="text-[10px] text-white/50">19:00</span>
            </div>
            <div className="flex items-center gap-3">
              <Play className="w-4 h-4 text-white/70" /><SkipForward className="w-4 h-4 text-white/50" /><Volume2 className="w-4 h-4 text-white/50" />
            </div>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <h3 className="font-serif text-sm font-medium mb-0.5">Meditación de Anclaje Profundo</h3>
          <p className="text-gray-500 text-[10px] mb-3">Semana 4 · Audio · 19 min</p>
          <div className="space-y-1.5">
            {[
              { t: 'Clase magistral — Semana 1', tipo: 'video', done: true },
              { t: 'Meditación apertura — S1', tipo: 'audio', done: true },
              { t: 'Clase — Anclaje profundo', tipo: 'video', done: true },
              { t: 'Tutorial — Protocolo 5 días', tipo: 'video', done: false },
            ].map((m, i) => (
              <div key={i} className={`flex items-center gap-2 p-2 rounded-xl border ${m.done ? 'border-gray-700/40 bg-gray-800/20' : 'border-[#2b7d7a]/20 bg-[#2b7d7a]/5'}`}>
                <div className={`w-6 h-6 rounded-lg flex items-center justify-center shrink-0 ${m.tipo === 'video' ? 'bg-[#2b7d7a]/20' : 'bg-[#BC9640]/20'}`}>
                  {m.tipo === 'video' ? <Film className="w-2.5 h-2.5 text-[#2b7d7a]" /> : <Headphones className="w-2.5 h-2.5 text-[#BC9640]" />}
                </div>
                <div className="flex-1 min-w-0"><div className="text-[9px] font-medium text-gray-300 truncate">{m.t}</div></div>
                {m.done ? <Check className="w-3 h-3 text-[#2b7d7a] shrink-0" /> : <Play className="w-3 h-3 text-gray-500 shrink-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  },
  {
    id: 'admin',
    label: 'Panel admin',
    content: () => (
      <div className="h-full bg-gray-50 flex">
        <div className="w-40 bg-white border-r border-gray-100 flex flex-col shrink-0">
          <div className="h-12 border-b border-gray-100 flex items-center px-3 gap-2">
            <div className="w-5 h-5 rounded bg-[#1D1D1F]" />
            <span className="text-xs font-semibold">Admin</span>
          </div>
          <div className="p-2 space-y-1 text-xs">
            {[
              { icon: BookOpen, label: 'Cursos', active: true },
              { icon: Users, label: 'Alumnos' },
              { icon: Film, label: 'Multimedia' },
              { icon: CreditCard, label: 'Pagos' },
              { icon: BarChart3, label: 'Analíticas' },
              { icon: Settings, label: 'Ajustes' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center gap-2 px-2 py-1.5 rounded-lg cursor-pointer ${item.active ? 'bg-[#2b7d7a]/10 text-[#2b7d7a]' : 'text-gray-500'}`}>
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex-1 p-4 overflow-hidden">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Mis Cursos</h2>
            <div className="bg-[#2b7d7a] text-white text-xs px-3 py-1.5 rounded-lg">+ Nuevo curso</div>
          </div>
          <div className="space-y-2">
            {[
              { title: 'Método TCT — Nivel Inicial', alumnos: 32, estado: 'Publicado' },
              { title: 'Método TCT — Nivel Avanzado', alumnos: 15, estado: 'Publicado' },
              { title: 'Retiro Online Intensivo', alumnos: 8, estado: 'Borrador' },
            ].map((course, i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-100 p-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2b7d7a]/20 to-[#BC9640]/20 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-xs font-medium text-gray-800 truncate">{course.title}</div>
                  <div className="text-[10px] text-gray-400">{course.alumnos} alumnos</div>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${course.estado === 'Publicado' ? 'bg-green-50 text-green-600' : 'bg-gray-100 text-gray-500'}`}>{course.estado}</span>
              </div>
            ))}
          </div>
          <div className="mt-4 grid grid-cols-3 gap-2">
            {[
              { label: 'Alumnos activos', val: '55', color: 'text-[#2b7d7a]' },
              { label: 'Ingresos (mes)', val: '€4.2k', color: 'text-[#BC9640]' },
              { label: 'Módulos totales', val: '48', color: 'text-gray-700' },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl p-3 border border-gray-100 text-center">
                <div className={`text-base font-bold mb-0.5 ${stat.color}`}>{stat.val}</div>
                <div className="text-[9px] text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    )
  }
];

export default function PlatformVideo() {
  const [current, setCurrent] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const DURATION = 4500;

  const next = useCallback(() => {
    setCurrent(c => (c + 1) % screens.length);
    setProgress(0);
  }, []);

  useEffect(() => {
    if (!playing) return;
    const start = performance.now();
    let raf: number;
    const tick = (now: number) => {
      const elapsed = now - start;
      const p = Math.min(elapsed / DURATION, 1);
      setProgress(p);
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        next();
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [current, playing, next]);

  const Screen = screens[current].content;

  return (
    <div className="relative w-full">
      <div className="border border-gray-200/60 rounded-2xl bg-white p-2 shadow-2xl overflow-hidden">
        <div className="rounded-xl overflow-hidden bg-white border border-gray-100">
          {/* Browser chrome */}
          <div className="bg-gray-100 h-8 flex items-center px-3 gap-2 border-b border-gray-200">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4 bg-white rounded-md h-5 flex items-center px-3 border border-gray-200">
              <span className="text-[10px] text-gray-400">academia.tumarca.com</span>
            </div>
          </div>
          {/* Screen area */}
          <div className="h-80 md:h-96 overflow-hidden relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={current}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.35, ease: 'easeInOut' }}
                className="absolute inset-0"
              >
                <Screen />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="mt-4 flex items-center gap-4 px-1">
        <button
          onClick={() => setPlaying(p => !p)}
          className="w-9 h-9 rounded-full bg-[#1D1D1F] flex items-center justify-center text-white hover:bg-black transition-colors shrink-0 cursor-pointer"
        >
          {playing ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
        </button>

        <div className="flex-1 flex gap-1">
          {screens.map((s, i) => (
            <button
              key={s.id}
              onClick={() => { setCurrent(i); setProgress(0); }}
              className="flex-1 group cursor-pointer"
            >
              <div className="h-1 rounded-full bg-gray-200 overflow-hidden">
                <div
                  className="h-full rounded-full transition-none"
                  style={{
                    width: i < current ? '100%' : i === current ? `${progress * 100}%` : '0%',
                    backgroundColor: i === current ? '#2b7d7a' : '#BC9640'
                  }}
                />
              </div>
              <div className="mt-1.5 text-[9px] text-gray-400 text-center hidden sm:block group-hover:text-gray-700 transition-colors truncate">{s.label}</div>
            </button>
          ))}
        </div>

        <button
          onClick={next}
          className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center text-gray-600 hover:border-gray-400 transition-colors shrink-0 cursor-pointer"
        >
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
