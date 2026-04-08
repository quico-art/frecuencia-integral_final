import { useState, useRef, useEffect, useCallback } from "react";
import { Play, Pause, SkipBack, SkipForward, Repeat, Maximize2, Minimize2, X } from "lucide-react";
import type { MultimediaItem } from "@/lib/data";

export type Track = MultimediaItem;

const teal  = "#2b7d7a";
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Plus Jakarta Sans', DM Sans, sans-serif";

export function fmt(sec: number): string {
  if (!isFinite(sec)) return "0:00";
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, "0")}`;
}

export function PlayPauseBtn({ isPlaying, onClick, size }: { isPlaying: boolean; onClick: () => void; size: number }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: size, height: size, borderRadius: "50%",
        background: teal, border: "none", cursor: "pointer",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0,
        boxShadow: "0 4px 16px rgba(43,125,122,.5)",
        transition: "transform .15s",
      }}
      onMouseEnter={e => (e.currentTarget.style.transform = "scale(1.07)")}
      onMouseLeave={e => (e.currentTarget.style.transform = "scale(1)")}
    >
      {isPlaying
        ? <Pause size={size * 0.38} color="#fff" />
        : <Play  size={size * 0.38} color="#fff" style={{ marginLeft: 2 }} />}
    </button>
  );
}

export function PlayerBtn({ onClick, disabled, active, large, children }: {
  onClick: () => void; disabled?: boolean; active?: boolean; large?: boolean; children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        background: "none", border: "none", cursor: disabled ? "default" : "pointer",
        color: active ? teal : "rgba(255,255,255,.55)",
        opacity: disabled ? 0.3 : 1,
        padding: large ? 8 : 6,
        display: "flex", alignItems: "center", justifyContent: "center",
        borderRadius: 8,
        transition: "color .15s",
      }}
      onMouseEnter={e => { if (!disabled && !active) (e.currentTarget as HTMLButtonElement).style.color = "rgba(255,255,255,.9)"; }}
      onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.color = active ? teal : "rgba(255,255,255,.55)"; }}
    >
      {children}
    </button>
  );
}

interface PlayerProps {
  track:       Track;
  tracks:      Track[];
  audioRef:    React.MutableRefObject<HTMLAudioElement | null>;
  isPlaying:   boolean;
  onPlayPause: () => void;
  onNext:      () => void;
  onPrev:      () => void;
  onClose:     () => void;
}

export function AudioPlayerModal({
  track, tracks, audioRef, isPlaying,
  onPlayPause, onNext, onPrev, onClose,
}: PlayerProps) {
  const [expanded,    setExpanded]    = useState(false);
  const [repeat,      setRepeat]      = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration,    setDuration]    = useState(0);
  const rafRef = useRef<number | null>(null);

  const tick = useCallback(() => {
    const a = audioRef.current;
    if (a) {
      setCurrentTime(a.currentTime);
      setDuration(isFinite(a.duration) ? a.duration : 0);
    }
    rafRef.current = requestAnimationFrame(tick);
  }, [audioRef]);

  useEffect(() => {
    if (isPlaying) {
      rafRef.current = requestAnimationFrame(tick);
    } else {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    }
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, [isPlaying, tick]);

  useEffect(() => {
    const a = audioRef.current;
    if (!a) return;
    a.loop = repeat;
  }, [repeat, audioRef, track]);

  useEffect(() => {
    setCurrentTime(0);
    setDuration(0);
  }, [track.id]);

  function seek(e: React.ChangeEvent<HTMLInputElement>) {
    const a = audioRef.current;
    if (!a || !duration) return;
    const t = (Number(e.target.value) / 1000) * duration;
    a.currentTime = t;
    setCurrentTime(t);
  }

  const pct = duration ? (currentTime / duration) * 1000 : 0;
  const idx = tracks.findIndex(t => t.id === track.id);

  if (!expanded) {
    return (
      <>
        <style>{`@media(max-width:767px){.fi-mm-mini{bottom:0!important}}`}</style>
        <div className="fi-mm-mini" style={{
          position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 1200,
          background: "rgba(29,29,31,.96)",
          backdropFilter: "blur(20px)",
          boxShadow: "0 -4px 24px rgba(0,0,0,.25)",
          padding: "10px 20px 14px",
        }}>
          <input
            type="range" min={0} max={1000} value={pct}
            onChange={seek}
            style={{
              width: "100%", height: 3, marginBottom: 10,
              appearance: "none",
              background: `linear-gradient(to right, ${teal} ${pct / 10}%, rgba(255,255,255,.18) ${pct / 10}%)`,
              borderRadius: 9999, outline: "none", cursor: "pointer",
            }}
          />
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ fontSize: 28, lineHeight: 1, flexShrink: 0 }}>{track.icon}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <p style={{ fontFamily: SANS, fontSize: 13, fontWeight: 600, color: "#fff", margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{track.title}</p>
              <p style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,.45)", margin: 0 }}>{track.cat} · {fmt(currentTime)} / {fmt(duration)}</p>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
              <PlayerBtn onClick={onPrev}                   disabled={idx === 0}><SkipBack    size={16} /></PlayerBtn>
              <PlayPauseBtn isPlaying={isPlaying} onClick={onPlayPause} size={40} />
              <PlayerBtn onClick={onNext}                   disabled={idx === tracks.length - 1}><SkipForward size={16} /></PlayerBtn>
              <PlayerBtn onClick={() => setRepeat(r => !r)} active={repeat}><Repeat size={15} /></PlayerBtn>
              <PlayerBtn onClick={() => setExpanded(true)}><Maximize2 size={15} /></PlayerBtn>
              <PlayerBtn onClick={onClose}><X size={15} /></PlayerBtn>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (
    <div style={{
      position: "fixed", inset: 0, zIndex: 1300,
      background: "linear-gradient(160deg, #0d1f1f 0%, #1a1a1d 60%, #0d1a1a 100%)",
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
    }}>
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "20px 24px" }}>
        <button onClick={() => setExpanded(false)} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontFamily: SANS }}>
          <Minimize2 size={14} /> Minimizar
        </button>
        <button onClick={onClose} style={{ background: "none", border: "none", cursor: "pointer", color: "rgba(255,255,255,.5)", display: "flex" }}>
          <X size={18} />
        </button>
      </div>

      <div style={{
        width: "min(280px, 65vw)", height: "min(280px, 65vw)",
        borderRadius: 28,
        background: "rgba(255,255,255,.06)",
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "clamp(72px, 18vw, 120px)",
        marginBottom: 36,
        boxShadow: "0 24px 64px rgba(0,0,0,.6), 0 0 0 1px rgba(255,255,255,.06)",
        backdropFilter: "blur(8px)",
      }}>
        {track.icon}
      </div>

      <p style={{ fontFamily: SERIF, fontSize: "clamp(20px,4vw,28px)", fontWeight: 400, color: "#fff", margin: "0 0 6px", textAlign: "center", padding: "0 32px" }}>{track.title}</p>
      <p style={{ fontFamily: SANS, fontSize: 13, color: "rgba(255,255,255,.4)", margin: "0 0 36px", letterSpacing: ".06em", textTransform: "uppercase" }}>{track.cat}</p>

      <div style={{ width: "min(420px, 88vw)", marginBottom: 10 }}>
        <input
          type="range" min={0} max={1000} value={pct}
          onChange={seek}
          style={{
            width: "100%", height: 4,
            appearance: "none",
            background: `linear-gradient(to right, ${teal} ${pct / 10}%, rgba(255,255,255,.15) ${pct / 10}%)`,
            borderRadius: 9999, outline: "none", cursor: "pointer",
          }}
        />
        <div style={{ display: "flex", justifyContent: "space-between", marginTop: 6 }}>
          <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,.35)" }}>{fmt(currentTime)}</span>
          <span style={{ fontFamily: SANS, fontSize: 11, color: "rgba(255,255,255,.35)" }}>{fmt(duration)}</span>
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 20, marginTop: 8 }}>
        <PlayerBtn onClick={() => setRepeat(r => !r)} active={repeat} large><Repeat       size={18} /></PlayerBtn>
        <PlayerBtn onClick={onPrev} disabled={idx === 0}               large><SkipBack     size={22} /></PlayerBtn>
        <PlayPauseBtn isPlaying={isPlaying} onClick={onPlayPause} size={64} />
        <PlayerBtn onClick={onNext} disabled={idx === tracks.length - 1} large><SkipForward size={22} /></PlayerBtn>
        <div style={{ width: 38 }} />
      </div>
    </div>
  );
}
