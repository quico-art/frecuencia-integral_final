import { useState, useEffect } from "react";
import { Link } from "wouter";

const STORAGE_KEY = "fi_cookies";
const GOLD  = "#BC9640";
const TEXT  = "#1D1D1F";
const SANS  = "'Plus Jakarta Sans', DM Sans, sans-serif";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(STORAGE_KEY);
    if (!accepted) setVisible(true);
  }, []);

  function accept() {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setVisible(false);
  }

  function reject() {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Aviso de cookies"
      style={{
        position: "fixed",
        bottom: 24,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 9999,
        width: "min(680px, calc(100vw - 32px))",
        background: "#1D1D1F",
        color: "#fff",
        borderRadius: 18,
        padding: "22px 28px",
        display: "flex",
        alignItems: "center",
        gap: 20,
        flexWrap: "wrap",
        boxShadow: "0 8px 40px rgba(0,0,0,0.28)",
        fontFamily: SANS,
      }}
    >
      {/* Icon */}
      <span style={{ fontSize: 22, flexShrink: 0 }}>🍪</span>

      {/* Text */}
      <p style={{ fontSize: 13, lineHeight: 1.6, color: "rgba(255,255,255,.82)", flex: 1, minWidth: 220, margin: 0 }}>
        Usamos cookies técnicas necesarias para el funcionamiento de la plataforma. Sin analítica ni publicidad.{" "}
        <Link href="/cookies" style={{ color: GOLD, textDecoration: "underline" }}>
          Más información
        </Link>
      </p>

      {/* Buttons */}
      <div style={{ display: "flex", gap: 10, flexShrink: 0, flexWrap: "wrap" }}>
        <button
          onClick={reject}
          style={{
            padding: "9px 20px",
            borderRadius: 9999,
            background: "transparent",
            color: "rgba(255,255,255,.6)",
            border: "1px solid rgba(255,255,255,.2)",
            fontSize: 13,
            fontWeight: 500,
            cursor: "pointer",
            fontFamily: SANS,
            whiteSpace: "nowrap",
          }}
        >
          Solo necesarias
        </button>
        <button
          onClick={accept}
          style={{
            padding: "9px 20px",
            borderRadius: 9999,
            background: GOLD,
            color: TEXT,
            border: "none",
            fontSize: 13,
            fontWeight: 600,
            cursor: "pointer",
            fontFamily: SANS,
            whiteSpace: "nowrap",
          }}
        >
          Aceptar
        </button>
      </div>
    </div>
  );
}
