import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/hooks/useContent";

const BASE = import.meta.env.BASE_URL ?? "/";

// ── Accentos por tarjeta (no editables, visuales) ───────────────────────────
const ACCENTS = ["#2b7d7a", "#BC9640", "#795901", "#2b7d7a", "#BC9640", "#4a7a5a"];
const ROWS    = [2, 1, 1, 1, 2, 1]; // masonry row spans

type GItem = {
  idx: number; src: string; title: string; cat: string; desc: string;
  accent: string; rows: number;
};

function LightBox({ item, onClose }: { item: GItem; onClose: () => void }) {
  return (
    <motion.div
      key="lightbox"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        background: "rgba(0,0,0,.82)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        display: "flex", alignItems: "center", justifyContent: "center",
        padding: "32px 24px",
        cursor: "zoom-out",
      }}
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.92, opacity: 0, y: 10 }}
        transition={{ type: "spring", stiffness: 320, damping: 28 }}
        onClick={e => e.stopPropagation()}
        style={{
          width: "min(820px, 92vw)",
          background: "#fff",
          borderRadius: 28,
          overflow: "hidden",
          boxShadow: "0 40px 100px rgba(0,0,0,.5)",
          cursor: "default",
        }}
      >
        {/* Imagen */}
        <div style={{ width: "100%", aspectRatio: "16/9", overflow: "hidden" }}>
          <motion.img
            src={item.src}
            alt={item.title}
            data-fi-img={`acad.galeria.${item.idx}.img`}
            initial={{ scale: 1.06 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        </div>
        {/* Info */}
        <div style={{ padding: "28px 36px 36px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
            <span
              data-fi-key={`acad.galeria.${item.idx}.cat`}
              style={{
                fontSize: 9, letterSpacing: ".18em", textTransform: "uppercase",
                color: item.accent, fontWeight: 700,
                background: `${item.accent}14`,
                padding: "3px 10px", borderRadius: 9999,
                border: `1px solid ${item.accent}30`,
              }}
            >
              {item.cat}
            </span>
            <span style={{ fontSize: 11, color: "#AEAEB2" }}>Frecuencia Integral Academy</span>
          </div>
          <h3
            data-fi-key={`acad.galeria.${item.idx}.title`}
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(22px,3vw,32px)", fontWeight: 300,
              color: "#1D1D1F", margin: "0 0 12px", lineHeight: 1.1,
            }}
          >
            {item.title}
          </h3>
          <p
            data-fi-key={`acad.galeria.${item.idx}.desc`}
            style={{ fontSize: 15, color: "#6E6E73", lineHeight: 1.8, margin: 0, fontWeight: 300 }}
          >
            {item.desc}
          </p>
          <button
            onClick={onClose}
            style={{
              marginTop: 24, fontSize: 12, color: "#86868B",
              background: "#F5F5F7", border: "none",
              padding: "8px 20px", borderRadius: 9999,
              cursor: "pointer", fontWeight: 500,
            }}
          >
            Cerrar ×
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function GaleriaAcademia() {
  const [active, setActive] = useState<GItem | null>(null);

  // ── Cabecera de sección ──────────────────────────────────────────────────
  const [secLabel]  = useContent("acad.galeria.label",  "La Academia en imágenes");
  const [title1]    = useContent("acad.galeria.title1", "Momentos del");
  const [title2]    = useContent("acad.galeria.title2", "proceso");
  const [sub]       = useContent("acad.galeria.sub",    "Cuencos, meditación, frecuencias, los 12 caminos. Cada imagen, un pilar real del método.");
  const [note]      = useContent("acad.galeria.note",   "Las imágenes se actualizan con fotos propias de la Academia cuando estén disponibles");

  // ── Foto 0 — Cuencos Tibetanos ───────────────────────────────────────────
  const [img0]   = useContent("acad.galeria.0.img",   `${BASE}galeria/cuencos-tibetanos.jpg`);
  const [tit0]   = useContent("acad.galeria.0.title", "Cuencos Tibetanos");
  const [cat0]   = useContent("acad.galeria.0.cat",   "Sonido Sagrado");
  const [desc0]  = useContent("acad.galeria.0.desc",  "Siete metales afinados. Jaume y Quico crean un campo sonoro que el cuerpo reconoce antes de que la mente lo comprenda. Cada semana del método abre con los cuencos.");

  // ── Foto 1 — Meditaciones Guiadas ───────────────────────────────────────
  const [img1]   = useContent("acad.galeria.1.img",   `${BASE}galeria/meditacion-guiada.jpg`);
  const [tit1]   = useContent("acad.galeria.1.title", "Meditaciones Guiadas");
  const [cat1]   = useContent("acad.galeria.1.cat",   "Presencia");
  const [desc1]  = useContent("acad.galeria.1.desc",  "Quico guía cada práctica. Jaume sostiene el espacio con música binaural. La meditación no como técnica, sino como estado natural recuperado.");

  // ── Foto 2 — Frecuencias Binaurales ─────────────────────────────────────
  const [img2]   = useContent("acad.galeria.2.img",   `${BASE}galeria/frecuencias-binaurales.jpg`);
  const [tit2]   = useContent("acad.galeria.2.title", "Frecuencias Binaurales");
  const [cat2]   = useContent("acad.galeria.2.cat",   "Vibración");
  const [desc2]  = useContent("acad.galeria.2.desc",  "Frecuencias Solfeggio y beats binaurales diseñados para inducir estado Alpha-Theta. Ciencia aplicada a la transformación interior.");

  // ── Foto 3 — Las 4 Puertas ──────────────────────────────────────────────
  const [img3]   = useContent("acad.galeria.3.img",   `${BASE}galeria/las-4-puertas.jpg`);
  const [tit3]   = useContent("acad.galeria.3.title", "Las 4 Puertas");
  const [cat3]   = useContent("acad.galeria.3.cat",   "El Viaje");
  const [desc3]  = useContent("acad.galeria.3.desc",  "Blanca, Roja, Azul, Arcoíris. Cuatro etapas de 12 semanas cada una. Un mapa interior que lleva del despertar a la integración total.");

  // ── Foto 4 — Canalizaciones con Marga ───────────────────────────────────
  const [img4]   = useContent("acad.galeria.4.img",   `${BASE}galeria/canalizaciones.jpg`);
  const [tit4]   = useContent("acad.galeria.4.title", "Canalizaciones con Marga");
  const [cat4]   = useContent("acad.galeria.4.cat",   "Transmisión");
  const [desc4]  = useContent("acad.galeria.4.desc",  "Sesiones individuales con Marga. Un espacio de escucha donde lo que necesita ser visto, es visto. Disponible en puertas avanzadas del método.");

  // ── Foto 5 — Los 12 Caminos ─────────────────────────────────────────────
  const [img5]   = useContent("acad.galeria.5.img",   `${BASE}galeria/los-12-caminos.jpg`);
  const [tit5]   = useContent("acad.galeria.5.title", "Los 12 Caminos");
  const [cat5]   = useContent("acad.galeria.5.cat",   "Sabiduría");
  const [desc5]  = useContent("acad.galeria.5.desc",  "Dzogchen, El Cuarto Camino, UCDM, Cábala, Chamanismo, terapias alternativas varias… Doce tradiciones y enfoques que confluyen en cada Puerta del método.");

  // ── Construir array ITEMS con los valores del editor ────────────────────
  const ITEMS: GItem[] = [
    { idx: 0, src: img0,  title: tit0,  cat: cat0,  desc: desc0,  accent: ACCENTS[0], rows: ROWS[0] },
    { idx: 1, src: img1,  title: tit1,  cat: cat1,  desc: desc1,  accent: ACCENTS[1], rows: ROWS[1] },
    { idx: 2, src: img2,  title: tit2,  cat: cat2,  desc: desc2,  accent: ACCENTS[2], rows: ROWS[2] },
    { idx: 3, src: img3,  title: tit3,  cat: cat3,  desc: desc3,  accent: ACCENTS[3], rows: ROWS[3] },
    { idx: 4, src: img4,  title: tit4,  cat: cat4,  desc: desc4,  accent: ACCENTS[4], rows: ROWS[4] },
    { idx: 5, src: img5,  title: tit5,  cat: cat5,  desc: desc5,  accent: ACCENTS[5], rows: ROWS[5] },
  ];

  return (
    <>
      <section
        id="acad-galeria"
        data-fi-section="acad-galeria"
        data-fi-label="Galería"
        style={{ padding: "96px 48px", background: "#fff" }}
      >
        <style>{`
          @media (max-width: 900px) {
            .galeria-grid { grid-template-columns: repeat(2,1fr) !important; }
          }
          @media (max-width: 580px) {
            .galeria-grid { grid-template-columns: 1fr !important; }
          }
          .galeria-card-img { transition: transform .55s cubic-bezier(.22,1,.36,1); }
          .galeria-card:hover .galeria-card-img { transform: scale(1.07); }
          .galeria-card-overlay { opacity:0; transition: opacity .3s; }
          .galeria-card:hover .galeria-card-overlay { opacity:1; }
          .galeria-badge { transform: translateY(6px); transition: transform .3s, opacity .3s; opacity:0; }
          .galeria-card:hover .galeria-badge { transform: translateY(0); opacity:1; }
          .galeria-title-text { transform: translateY(8px); transition: transform .35s .04s, opacity .35s .04s; opacity:0; }
          .galeria-card:hover .galeria-title-text { transform: translateY(0); opacity:1; }
        `}</style>

        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          {/* Header */}
          <div style={{ marginBottom: 52, display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: 20 }}>
            <div>
              <span
                data-fi-key="acad.galeria.label"
                style={{
                  fontSize: 10, letterSpacing: ".28em", textTransform: "uppercase",
                  color: "#795901", fontWeight: 700, display: "block", marginBottom: 16,
                }}
              >
                {secLabel}
              </span>
              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(28px,4vw,48px)", fontWeight: 300,
                color: "#1D1D1F", margin: 0, lineHeight: 1.08,
                letterSpacing: "-.015em",
              }}>
                <span data-fi-key="acad.galeria.title1">{title1}</span>{" "}
                <em data-fi-key="acad.galeria.title2" style={{ fontStyle: "italic", color: "#BC9640" }}>{title2}</em>
              </h2>
            </div>
            <p
              data-fi-key="acad.galeria.sub"
              style={{ fontSize: 14, color: "#6E6E73", maxWidth: 340, lineHeight: 1.75, fontWeight: 300, margin: 0 }}
            >
              {sub}
            </p>
          </div>

          {/* Grid masonry */}
          <div
            className="galeria-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gridAutoRows: "140px",
              gap: 14,
            }}
          >
            {ITEMS.map(item => (
              <motion.div
                key={item.idx}
                className="galeria-card"
                data-fi-block={`acad-galeria-card-${item.idx}`}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                onClick={() => setActive(item)}
                style={{
                  gridRow: `span ${item.rows}`,
                  borderRadius: 20,
                  overflow: "hidden",
                  cursor: "zoom-in",
                  position: "relative",
                  background: "#F2F2F2",
                  boxShadow: "0 2px 8px rgba(0,0,0,.06)",
                }}
              >
                {/* Imagen */}
                <img
                  className="galeria-card-img"
                  src={item.src}
                  alt={item.title}
                  data-fi-img={`acad.galeria.${item.idx}.img`}
                  style={{
                    width: "100%", height: "100%",
                    objectFit: "cover", display: "block",
                    transformOrigin: "center",
                  }}
                />

                {/* Overlay en hover */}
                <div
                  className="galeria-card-overlay"
                  style={{
                    position: "absolute", inset: 0,
                    background: "linear-gradient(to top, rgba(0,0,0,.68) 0%, rgba(0,0,0,.18) 50%, transparent 100%)",
                  }}
                />

                {/* Badge de categoría */}
                <div
                  className="galeria-badge"
                  style={{
                    position: "absolute", top: 14, left: 14,
                    fontSize: 9, letterSpacing: ".14em", textTransform: "uppercase",
                    color: "#fff", fontWeight: 700,
                    background: `${item.accent}cc`,
                    backdropFilter: "blur(8px)",
                    padding: "3px 10px", borderRadius: 9999,
                  }}
                >
                  {item.cat}
                </div>

                {/* Título abajo */}
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: item.rows === 2 ? "20px 20px" : "14px 16px",
                  }}
                >
                  <div
                    className="galeria-title-text"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: item.rows === 2 ? 18 : 15,
                      color: "#fff",
                      fontWeight: 300,
                      textShadow: "0 1px 8px rgba(0,0,0,.4)",
                    }}
                  >
                    {item.title}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Nota */}
          <p
            data-fi-key="acad.galeria.note"
            style={{ marginTop: 24, fontSize: 11, color: "#AEAEB2", textAlign: "center", letterSpacing: ".04em" }}
          >
            ✦ {note}
          </p>
        </div>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {active && <LightBox item={active} onClose={() => setActive(null)} />}
      </AnimatePresence>
    </>
  );
}
