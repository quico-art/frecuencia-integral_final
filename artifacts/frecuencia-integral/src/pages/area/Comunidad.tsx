import { useState, useRef } from "react";
import { Video, MessageSquare, ExternalLink, X, Lock, Image, Smile } from "lucide-react";
import { getProgress } from "@/lib/auth";
import { useContent } from "@/hooks/useContent";
import BlockRenderer from "@/components/BlockRenderer";

const rules = [
  "Habla desde la experiencia propia. Comparte lo que has vivido, no consejos no pedidos.",
  "Escucha con presencia. En las videollamadas, permite que cada persona se exprese sin interrupciones.",
  "Respeta la confidencialidad. Lo que se comparte en la comunidad, permanece en la comunidad.",
  "Cuida el lenguaje. Esta es una comunidad de consciencia: las palabras crean realidad.",
  "Las salas de videollamada son libres. Cualquier alumno puede abrir una sala e invitar al resto.",
];

const jitsiRooms = [
  { id: "blanca", label: "Puerta Blanca", room: "FrecuenciaIntegralBlanca", emoji: "🌿" },
  { id: "roja", label: "Puerta Roja", room: "FrecuenciaIntegralRoja", emoji: "🔥" },
  { id: "azul", label: "Puerta Azul", room: "FrecuenciaIntegralAzul", emoji: "🔵" },
  { id: "arcoiris", label: "Puerta Arcoíris", room: "FrecuenciaIntegralArcoiris", emoji: "🌈" },
];

const chatMessages = [
  { id: 1, author: "María G.", avatar: "M", time: "hace 2h", text: "¡Semana 1 completada! El ejercicio de reconocimiento de presencia me dejó sin palabras. ¿Cómo os fue a vosotros?" },
  { id: 2, author: "Javier R.", avatar: "J", time: "hace 1h", text: "A mí me costó mucho dejar de 'hacer algo' con ello, como dice el ejercicio. Ese es mi gran reto ahora mismo." },
  { id: 3, author: "Ana P.", avatar: "A", time: "hace 45 min", text: "El mapa del piloto automático me sorprendió. Hay días enteros en los que no recuerdo haber estado presente ni un momento." },
  { id: 4, author: "Carlos M.", avatar: "C", time: "hace 20 min", text: "Gracias por compartir. Eso de la fragmentación del yo me resonó mucho. Seguimos." },
];

const EMOJIS = ["😊","😂","❤️","🙏","👍","🔥","✨","💫","🌟","😍","🤗","💪","🌿","🙌","💙","🌈","🎵","🕊️","⭐","💎","🙂","😌","🫶","🌻","🎯"];

type ChatMessage = { id: number; author: string; avatar: string; time: string; text: string; imageUrl?: string };

export default function Comunidad() {
  const progress = getProgress();
  const activeGate = progress.currentGate ?? "blanca";

  const [jitsiOpen, setJitsiOpen] = useState(false);
  const [selectedRoom, setSelectedRoom] = useState(jitsiRooms[0]);
  const [chatOpen, setChatOpen] = useState(false);
  const [chatMsg, setChatMsg] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>(chatMessages);
  const [emojiOpen, setEmojiOpen] = useState(false);
  const imgInputRef = useRef<HTMLInputElement>(null);

  function openJitsi(room: typeof jitsiRooms[0]) {
    if (room.id !== activeGate) return;
    setSelectedRoom(room);
    setJitsiOpen(true);
  }

  function sendMessage() {
    if (!chatMsg.trim()) return;
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), author: "Tú", avatar: "T", time: "ahora", text: chatMsg.trim() },
    ]);
    setChatMsg("");
    setEmojiOpen(false);
  }

  function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => {
      setMessages(prev => [...prev, {
        id: Date.now(), author: "Tú", avatar: "T", time: "ahora", text: "", imageUrl: ev.target?.result as string,
      }]);
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  }

  function insertEmoji(emoji: string) {
    setChatMsg(prev => prev + emoji);
  }

  const gold = "#BC9640";
  const [comunLabel]     = useContent("area.comunidad.label",       "Tu tribu");
  const [comunTitle]     = useContent("area.comunidad.title",       "La Comunidad TCT");
  const [comunSub]       = useContent("area.comunidad.sub",         "Chat de la Academia · Videollamadas con Jitsi Meet");
  const [chatCardTitle]  = useContent("area.comunidad.chat.title",  "Chat de la Academia");
  const [chatCardDesc]   = useContent("area.comunidad.chat.desc",   "Debate y comparte experiencias con los alumnos de tu puerta. Un espacio para la reflexión y el apoyo mutuo.");
  const [chatCardCta]    = useContent("area.comunidad.chat.cta",    "Abrir Chat →");
  const [chatCardNote]   = useContent("area.comunidad.chat.note",   "🔒 Solo accesible para alumnos");
  const [videoCardTitle] = useContent("area.comunidad.video.title", "Videollamada en grupo");
  const [videoCardDesc]  = useContent("area.comunidad.video.desc",  "Sin instalación · Únete cuando quieras. Elige la sala de tu puerta.");
  const [videoCardNote]  = useContent("area.comunidad.video.note",  "📅 Sin horario fijo · Abierta a todos los alumnos");
  const [rulesLabel]     = useContent("area.comunidad.rules.label", "Normas de la Comunidad");

  return (
    <div data-fi-section="area-comunidad" data-fi-label="Comunidad" className="space-y-7">
      <div>
        <p data-fi-key="area.comunidad.label" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontStyle: "italic", fontSize: 13, color: gold, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>
          {comunLabel}
        </p>
        <h2 data-fi-key="area.comunidad.title" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "clamp(24px,3.5vw,32px)", fontWeight: 400, color: "#1D1D1F", margin: "0 0 6px", lineHeight: 1.2 }}>
          {comunTitle} <span style={{ color: gold }}>✦</span>
        </h2>
        <p data-fi-key="area.comunidad.sub" style={{ fontFamily: "'Plus Jakarta Sans', DM Sans, sans-serif", fontSize: 14, color: "#6E6E73", margin: 0 }}>
          {comunSub}
        </p>
        <div style={{ width: 48, height: 2, background: `linear-gradient(90deg,${gold},#D4AA5A)`, borderRadius: 2, marginTop: 16, marginBottom: 8 }} />
      </div>

      <div className="grid md:grid-cols-2 gap-5">
        {/* Chat */}
        <div
          className="bg-white rounded-[20px] p-8 flex flex-col"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          data-testid="community-chat-card"
          data-fi-block="area-comunidad-chat"
          data-fi-label="Tarjeta Chat"
        >
          <div className="w-12 h-12 rounded-[14px] bg-primary/8 flex items-center justify-center mb-5">
            <MessageSquare size={20} className="text-primary" />
          </div>
          <h3 data-fi-key="area.comunidad.chat.title" className="text-[18px] font-serif text-[#1D1D1F] mb-2">{chatCardTitle}</h3>
          <p data-fi-key="area.comunidad.chat.desc" className="text-[14px] text-[#6E6E73] leading-[1.65] mb-6 flex-1">
            {chatCardDesc}
          </p>
          <button
            className="px-6 py-2.5 bg-[#1D1D1F] text-white rounded-full text-[13px] font-medium hover:bg-black transition-colors w-fit"
            onClick={() => setChatOpen(true)}
            data-testid="button-open-chat"
          >
            <span data-fi-key="area.comunidad.chat.cta">{chatCardCta}</span>
          </button>
          <p data-fi-key="area.comunidad.chat.note" className="text-[12px] text-[#AEAEB2] mt-3">{chatCardNote}</p>
        </div>

        {/* Video */}
        <div
          className="bg-white rounded-[20px] p-8"
          style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}
          data-testid="community-video-card"
          data-fi-block="area-comunidad-video"
          data-fi-label="Tarjeta Videollamada"
        >
          <div className="w-12 h-12 rounded-[14px] bg-primary/8 flex items-center justify-center mb-5">
            <Video size={20} className="text-primary" />
          </div>
          <h3 data-fi-key="area.comunidad.video.title" className="text-[18px] font-serif text-[#1D1D1F] mb-2">{videoCardTitle}</h3>
          <p data-fi-key="area.comunidad.video.desc" className="text-[14px] text-[#6E6E73] leading-[1.65] mb-5">
            {videoCardDesc}
          </p>
          <div className="grid grid-cols-2 gap-2 mb-4">
            {jitsiRooms.map((room) => {
              const locked = room.id !== activeGate;
              return (
                <button
                  key={room.id}
                  onClick={() => !locked && openJitsi(room)}
                  disabled={locked}
                  className={`flex items-center gap-2 px-3 py-2.5 border border-black/10 rounded-xl text-[12px] font-medium text-left transition-colors ${locked ? "opacity-40 cursor-not-allowed" : "text-[#1D1D1F] hover:bg-black/5 cursor-pointer"}`}
                  data-testid={`button-join-video-${room.id}`}
                  title={locked ? "Disponible cuando llegues a esta puerta" : undefined}
                >
                  <span>{room.emoji}</span>
                  <span className="flex-1">{room.label}</span>
                  {locked && <Lock size={11} className="text-[#AEAEB2] shrink-0" />}
                </button>
              );
            })}
          </div>
          <p data-fi-key="area.comunidad.video.note" className="text-[12px] text-[#AEAEB2]">{videoCardNote}</p>
        </div>
      </div>

      {/* Rules */}
      <div className="bg-white rounded-[20px] p-8" style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }} data-testid="community-rules" data-fi-block="area-comunidad-reglas" data-fi-label="Normas de la Comunidad">
        <p data-fi-key="area.comunidad.rules.label" className="text-xs font-semibold text-[#6E6E73] uppercase tracking-[0.1em] mb-5">{rulesLabel}</p>
        <ul className="space-y-4">
          {rules.map((rule, i) => (
            <li key={i} className="flex gap-3 text-[14px] text-[#424245] leading-[1.65]">
              <span className="text-primary shrink-0 mt-0.5 font-serif">·</span>
              <span>{rule}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Jitsi Modal — full screen on mobile */}
      {jitsiOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-stretch sm:items-center justify-center sm:p-4 p-0">
          <div className="bg-white sm:rounded-[24px] w-full sm:max-w-4xl flex flex-col" style={{ height: "100dvh", maxHeight: "100dvh", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            <div className="flex items-center justify-between px-4 sm:px-6 py-3 sm:py-4 border-b border-black/[0.07] shrink-0">
              <div className="flex items-center gap-3 min-w-0">
                <Video size={16} className="text-primary shrink-0" />
                <div className="min-w-0">
                  <h3 className="font-semibold text-[#1D1D1F] text-[14px] sm:text-[15px] truncate">
                    {selectedRoom.emoji} {selectedRoom.label}
                  </h3>
                  <p className="text-xs text-[#6E6E73] hidden sm:block">Sin instalación requerida</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`https://meet.jit.si/${selectedRoom.room}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 border border-black/10 rounded-full text-[12px] font-medium text-[#1D1D1F] hover:bg-black/5 transition-colors"
                >
                  <ExternalLink size={11} /> Nueva pestaña
                </a>
                <a
                  href={`https://meet.jit.si/${selectedRoom.room}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="sm:hidden flex items-center justify-center w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-[#EBEBEB]"
                  title="Abrir en nueva pestaña"
                >
                  <ExternalLink size={13} className="text-[#6E6E73]" />
                </a>
                <button onClick={() => setJitsiOpen(false)} className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#EBEBEB]">
                  <X size={14} className="text-[#6E6E73]" />
                </button>
              </div>
            </div>
            <iframe
              src={`https://meet.jit.si/${selectedRoom.room}`}
              allow="camera; microphone; fullscreen; display-capture; autoplay"
              style={{ width: "100%", border: "none", flex: 1, minHeight: 0 }}
              title={`Sala ${selectedRoom.label}`}
            />
          </div>
        </div>
      )}

      {/* Chat Modal */}
      {chatOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-end sm:items-center justify-center p-0 sm:p-4">
          <div className="bg-white rounded-t-[24px] sm:rounded-[24px] w-full sm:max-w-lg flex flex-col h-dvh sm:h-[78vh]" style={{ maxHeight: "100dvh", boxShadow: "0 24px 64px rgba(0,0,0,0.2)" }}>
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-black/[0.07] shrink-0">
              <div className="flex items-center gap-3">
                <MessageSquare size={17} className="text-primary" />
                <h3 className="font-semibold text-[#1D1D1F] text-[15px]">Chat · Puerta Blanca</h3>
              </div>
              <button onClick={() => setChatOpen(false)} className="w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center hover:bg-[#EBEBEB]">
                <X size={14} className="text-[#6E6E73]" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-[12px] font-semibold text-primary shrink-0">
                    {msg.avatar}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline gap-2 mb-1">
                      <span className="text-[13px] font-semibold text-[#1D1D1F]">{msg.author}</span>
                      <span className="text-[11px] text-[#AEAEB2]">{msg.time}</span>
                    </div>
                    {msg.imageUrl ? (
                      <img src={msg.imageUrl} alt="Imagen compartida" className="max-w-[220px] rounded-xl mt-1 border border-black/[0.06]" />
                    ) : (
                      <p className="text-[14px] text-[#424245] leading-[1.6] break-words">{msg.text}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Emoji picker */}
            {emojiOpen && (
              <div className="px-4 py-2.5 border-t border-black/[0.06] shrink-0 flex flex-wrap gap-1.5 bg-[#FAFAFA]">
                {EMOJIS.map(em => (
                  <button
                    key={em}
                    type="button"
                    onClick={() => insertEmoji(em)}
                    className="text-[20px] hover:scale-125 transition-transform leading-none p-0.5 rounded cursor-pointer"
                  >{em}</button>
                ))}
              </div>
            )}

            {/* Input */}
            <div className="px-3 pt-2 border-t border-black/[0.07] shrink-0" style={{ paddingBottom: "max(12px, env(safe-area-inset-bottom))" }}>
              <div style={{ display: "flex", gap: 6, alignItems: "flex-end", minWidth: 0 }}>
                <button
                  type="button"
                  onClick={() => setEmojiOpen(o => !o)}
                  style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", flexShrink: 0, cursor: "pointer", background: emojiOpen ? "#1D1D1F" : "#F5F5F7", color: emojiOpen ? "#fff" : "#6E6E73", transition: "background .15s" }}
                  title="Emoji"
                >
                  <Smile size={15} />
                </button>
                <button
                  type="button"
                  onClick={() => imgInputRef.current?.click()}
                  style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", flexShrink: 0, cursor: "pointer", background: "#F5F5F7", color: "#6E6E73" }}
                  title="Adjuntar imagen"
                >
                  <Image size={15} />
                </button>
                <input ref={imgInputRef} type="file" accept="image/*" style={{ display: "none" }} onChange={handleImageUpload} />
                <textarea
                  value={chatMsg}
                  onChange={(e) => setChatMsg(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      setChatMsg(prev => prev + "\n");
                    }
                  }}
                  placeholder="Escribe un mensaje..."
                  rows={1}
                  style={{ flex: 1, minWidth: 0, padding: "9px 12px", borderRadius: 12, background: "#F5F5F7", border: "none", fontSize: 14, color: "#1D1D1F", resize: "none", outline: "none", lineHeight: 1.5, maxHeight: 120, overflowY: "auto", fontFamily: "inherit" }}
                  data-testid="input-chat-message"
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  style={{ width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", border: "none", flexShrink: 0, cursor: "pointer", background: "#1D1D1F", color: "#fff", transition: "background .15s" }}
                  data-testid="button-send-chat"
                  title="Enviar"
                >
                  ➤
                </button>
              </div>
              <p style={{ fontSize: 10, color: "#AEAEB2", marginTop: 5, marginBottom: 0, textAlign: "center" }}>Enter = salto de línea · Botón ➤ = enviar</p>
            </div>
          </div>
        </div>
      )}
      <BlockRenderer zone="area-comunidad" />
    </div>
  );
}
