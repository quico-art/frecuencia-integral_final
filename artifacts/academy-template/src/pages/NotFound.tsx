import { useLocation } from "wouter";
import { ACADEMY } from "@/config";

export default function NotFound() {
  const [, go] = useLocation();
  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", fontFamily: ACADEMY.fonts.body, gap: 24 }}>
      <div style={{ fontFamily: ACADEMY.fonts.heading, fontSize: 96, fontWeight: 300, color: ACADEMY.colors.accentLight, lineHeight: 1 }}>404</div>
      <p style={{ fontSize: 18, color: ACADEMY.colors.muted }}>Página no encontrada</p>
      <button onClick={() => go("/")} style={{ padding: "12px 28px", borderRadius: 9999, background: ACADEMY.colors.primary, color: "#fff", border: "none", fontSize: 14, fontWeight: 600, cursor: "pointer" }}>Volver al inicio</button>
    </div>
  );
}
