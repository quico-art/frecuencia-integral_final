import React, { useState, useEffect } from "react";
import { getBlocks, type Block } from "@/lib/blocks";

const GOLD  = "#BC9640";
const GOLDF = "rgba(188,150,64,0.12)";
const SERIF = "'Playfair Display', Georgia, serif";
const SANS  = "'Plus Jakarta Sans', DM Sans, sans-serif";
const DARK  = "#1D1D1F";
const MUTED = "#6E6E73";

/* ─── CARD ───────────────────────────────────────────────── */
function BlockCard({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const icon = block.data.icon;
  const title = block.data.title;
  const body = block.data.body;
  const cta = block.data.cta;

  if (v === "bordered") return (
    <div style={{ borderLeft: `3px solid ${GOLD}`, padding: "20px 24px", background: "#FAFAF8" }}>
      {icon && <div style={{ fontSize: 20, marginBottom: 10 }}>{icon}</div>}
      <h3 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: 17, fontWeight: 400, color: DARK, margin: "0 0 8px" }}>{title}</h3>
      <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 14, color: MUTED, lineHeight: 1.72, margin: 0 }}>{body}</p>
      {cta && <a href={block.data.ctaUrl || "#"} data-fi-block-field={`${block.id}.cta`} style={{ display: "inline-block", marginTop: 12, fontSize: 13, fontWeight: 600, color: GOLD, textDecoration: "none" }}>{cta} →</a>}
    </div>
  );

  if (v === "dark") return (
    <div style={{ background: DARK, borderRadius: 16, padding: "28px 24px" }}>
      {icon && <div style={{ fontSize: 22, marginBottom: 12 }}>{icon}</div>}
      <h3 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 400, color: "#D4AA5A", margin: "0 0 8px" }}>{title}</h3>
      <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 14, color: "rgba(255,255,255,0.6)", lineHeight: 1.72, margin: 0 }}>{body}</p>
      {cta && <a href={block.data.ctaUrl || "#"} data-fi-block-field={`${block.id}.cta`} style={{ display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600, color: GOLD, textDecoration: "none" }}>{cta} →</a>}
    </div>
  );

  if (v === "minimal") return (
    <div style={{ padding: "16px 0", borderBottom: "1px solid #E8E8ED" }}>
      {icon && <span style={{ fontSize: 16, marginRight: 10 }}>{icon}</span>}
      <h3 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: DARK, margin: "0 0 6px", display: "inline" }}>{title}</h3>
      <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: "6px 0 0" }}>{body}</p>
      {cta && <a href={block.data.ctaUrl || "#"} data-fi-block-field={`${block.id}.cta`} style={{ display: "inline-block", marginTop: 10, fontSize: 12, fontWeight: 600, color: GOLD, textDecoration: "none", letterSpacing: ".04em", textTransform: "uppercase" }}>{cta} ↗</a>}
    </div>
  );

  // default
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(0,0,0,0.07)", border: "1px solid #F0F0F0" }}>
      {icon && <div style={{ fontSize: 24, marginBottom: 12 }}>{icon}</div>}
      <h3 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: 18, fontWeight: 400, color: DARK, margin: "0 0 8px" }}>{title}</h3>
      <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 14, color: MUTED, lineHeight: 1.7, margin: 0 }}>{body}</p>
      {cta && <a href={block.data.ctaUrl || "#"} data-fi-block-field={`${block.id}.cta`} style={{ display: "inline-block", marginTop: 14, fontSize: 13, fontWeight: 600, color: GOLD, textDecoration: "none" }}>{cta} →</a>}
    </div>
  );
}

/* ─── HEADING ────────────────────────────────────────────── */
function BlockHeading({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const lbl = block.data.label;
  const title = block.data.title;
  const sub = block.data.subtitle;

  if (v === "centered") return (
    <div style={{ textAlign: "center" }}>
      <div style={{ fontSize: 20, color: GOLD, marginBottom: 10 }}>✦</div>
      {lbl && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 12px" }}>{lbl}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(24px,3.5vw,38px)", fontWeight: 400, color: DARK, margin: "0 0 10px", lineHeight: 1.2 }}>{title}</h2>
      {sub && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontFamily: SANS, fontSize: 15, color: MUTED, margin: "0 auto", maxWidth: 560 }}>{sub}</p>}
    </div>
  );

  if (v === "minimal") return (
    <div>
      {lbl && <p data-fi-block-field={`${block.id}.label`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#AEAEB2", margin: "0 0 10px" }}>{lbl}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(22px,3vw,34px)", fontWeight: 400, color: DARK, margin: "0 0 8px", lineHeight: 1.2 }}>{title}</h2>
      {sub && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontSize: 14, color: MUTED, margin: 0 }}>{sub}</p>}
    </div>
  );

  if (v === "gold") return (
    <div style={{ background: GOLDF, borderRadius: 14, padding: "24px 28px" }}>
      {lbl && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".14em", textTransform: "uppercase", margin: "0 0 8px" }}>{lbl}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(22px,3vw,32px)", fontWeight: 400, color: "#795901", margin: "0 0 8px", lineHeight: 1.25 }}>{title}</h2>
      {sub && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontSize: 14, color: "#6B5C2E", margin: 0 }}>{sub}</p>}
    </div>
  );

  // default
  return (
    <div>
      {lbl && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 13, color: GOLD, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 10px" }}>{lbl}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(22px,3vw,32px)", fontWeight: 400, color: DARK, margin: "0 0 8px", lineHeight: 1.2 }}>{title}</h2>
      {sub && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontFamily: SANS, fontSize: 14, color: MUTED, margin: 0 }}>{sub}</p>}
      <div style={{ width: 40, height: 2, background: `linear-gradient(90deg,${GOLD},#D4AA5A)`, borderRadius: 2, marginTop: 14 }} />
    </div>
  );
}

/* ─── QUOTE ──────────────────────────────────────────────── */
function BlockQuote({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const text = block.data.text;
  const author = block.data.author;

  if (v === "centered") return (
    <div style={{ textAlign: "center", padding: "16px 24px" }}>
      <div style={{ fontFamily: SERIF, fontSize: 56, color: GOLD, lineHeight: 0.7, marginBottom: 16, opacity: 0.4 }}>"</div>
      <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: "clamp(16px,2vw,22px)", color: DARK, lineHeight: 1.65, margin: "0 0 16px" }}>{text}</p>
      {author && <p data-fi-block-field={`${block.id}.author`} style={{ fontFamily: SANS, fontSize: 11, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>— {author}</p>}
    </div>
  );

  if (v === "highlight") return (
    <div style={{ background: GOLDF, border: `1px solid rgba(188,150,64,0.2)`, borderRadius: 14, padding: "24px 28px" }}>
      <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "#795901", lineHeight: 1.72, margin: "0 0 10px" }}>"{text}"</p>
      {author && <p data-fi-block-field={`${block.id}.author`} style={{ fontFamily: SANS, fontSize: 11, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>{author}</p>}
    </div>
  );

  if (v === "dark") return (
    <div style={{ background: DARK, borderRadius: 14, padding: "28px 32px" }}>
      <div style={{ fontFamily: SERIF, fontSize: 36, color: GOLD, opacity: 0.4, lineHeight: 1, marginBottom: 12 }}>"</div>
      <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "rgba(255,255,255,0.88)", lineHeight: 1.72, margin: "0 0 12px" }}>{text}</p>
      {author && <p data-fi-block-field={`${block.id}.author`} style={{ fontFamily: SANS, fontSize: 11, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: 0 }}>{author}</p>}
    </div>
  );

  // default – left border
  return (
    <div style={{ borderLeft: `3px solid ${GOLD}`, padding: "16px 20px" }}>
      <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 16, color: "#3D3730", lineHeight: 1.7, margin: "0 0 8px" }}>"{text}"</p>
      {author && <p data-fi-block-field={`${block.id}.author`} style={{ fontFamily: SANS, fontSize: 11, color: GOLD, letterSpacing: ".08em", textTransform: "uppercase", margin: 0 }}>{author}</p>}
    </div>
  );
}

/* ─── TEXT ───────────────────────────────────────────────── */
function BlockText({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const text = block.data.text;

  if (v === "serif") return (
    <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 18, color: "#3D3730", lineHeight: 1.85, margin: 0 }}>{text}</p>
  );
  if (v === "lead") return (
    <p data-fi-block-field={`${block.id}.text`} style={{ fontFamily: SANS, fontSize: 18, color: DARK, lineHeight: 1.78, margin: 0, fontWeight: 400, letterSpacing: "-.01em" }}>{text}</p>
  );
  if (v === "inset") return (
    <div style={{ background: "#F5F5F7", borderRadius: 12, padding: "20px 24px" }}>
      <p data-fi-block-field={`${block.id}.text`} style={{ fontSize: 14, color: "#424245", lineHeight: 1.85, margin: 0 }}>{text}</p>
    </div>
  );
  // default
  return (
    <p data-fi-block-field={`${block.id}.text`} style={{ fontSize: 15, color: "#3A3A3C", lineHeight: 1.85, margin: 0 }}>{text}</p>
  );
}

/* ─── STEPS ──────────────────────────────────────────────── */
function BlockSteps({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const titleText = block.data.title;
  const steps = Object.entries(block.data)
    .filter(([k]) => k.startsWith("step") && k !== "title")
    .sort(([a], [b]) => Number(a.replace("step", "")) - Number(b.replace("step", "")))
    .map(([k, val]) => ({ key: k, val }));

  const titleEl = titleText && (
    <p data-fi-block-field={`${block.id}.title`}
      style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#AEAEB2", marginBottom: 20 }}>
      {titleText}
    </p>
  );

  if (v === "circles") return (
    <div>
      {titleEl}
      {steps.map(({ key, val }, i) => (
        <div key={key} style={{ display: "flex", gap: 16, marginBottom: 18, alignItems: "flex-start" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: GOLDF, border: `1.5px solid ${GOLD}`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <span style={{ fontSize: 12, fontWeight: 700, color: GOLD }}>{i + 1}</span>
          </div>
          <p data-fi-block-field={`${block.id}.${key}`} style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75, margin: "6px 0 0" }}>{val}</p>
        </div>
      ))}
    </div>
  );

  if (v === "cards") return (
    <div>
      {titleEl}
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {steps.map(({ key, val }, i) => (
          <div key={key} style={{ background: "#FFFFFF", border: "1px solid #E8E8ED", borderRadius: 12, padding: "16px 20px", display: "flex", gap: 16, alignItems: "center" }}>
            <span style={{ fontSize: 13, fontWeight: 800, color: GOLD, minWidth: 24 }}>0{i + 1}</span>
            <p data-fi-block-field={`${block.id}.${key}`} style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.7, margin: 0 }}>{val}</p>
          </div>
        ))}
      </div>
    </div>
  );

  if (v === "timeline") return (
    <div style={{ position: "relative" }}>
      {titleEl}
      <div style={{ position: "absolute", left: 11, top: 8, bottom: 8, width: 1, background: `linear-gradient(${GOLD},transparent)` }} />
      {steps.map(({ key, val }, i) => (
        <div key={key} style={{ display: "flex", gap: 16, padding: "0 0 20px", alignItems: "flex-start" }}>
          <div style={{ width: 22, height: 22, borderRadius: "50%", background: "#FFFFFF", border: `2px solid ${GOLD}`, flexShrink: 0, zIndex: 1 }} />
          <div>
            <span style={{ fontSize: 10, fontWeight: 700, color: GOLD, letterSpacing: ".1em" }}>PASO {i + 1}</span>
            <p data-fi-block-field={`${block.id}.${key}`} style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75, margin: "3px 0 0" }}>{val}</p>
          </div>
        </div>
      ))}
    </div>
  );

  // default – numbered list
  return (
    <div>
      {titleEl}
      {steps.map(({ key, val }, i) => (
        <div key={key} style={{ display: "flex", gap: 18, padding: "13px 0", borderBottom: i < steps.length - 1 ? "1px solid #F2F2F2" : "none", alignItems: "flex-start" }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: GOLD, minWidth: 18, paddingTop: 2 }}>{i + 1}</span>
          <p data-fi-block-field={`${block.id}.${key}`} style={{ fontSize: 14, color: "#3A3A3C", lineHeight: 1.75, margin: 0 }}>{val}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── CARDS ROW ──────────────────────────────────────────── */
function BlockCardsRow({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";

  if (v === "white") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ background: "#FFFFFF", borderRadius: 14, padding: "24px 20px", boxShadow: "0 2px 14px rgba(0,0,0,0.08)", border: "1px solid #F0F0F0" }}>
          {block.data[`col${i}_icon`] && <div style={{ fontSize: 22, marginBottom: 10 }}>{block.data[`col${i}_icon`]}</div>}
          <h4 data-fi-block-field={`${block.id}.col${i}_title`} style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: DARK, margin: "0 0 7px" }}>{block.data[`col${i}_title`]}</h4>
          <p data-fi-block-field={`${block.id}.col${i}_body`} style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>{block.data[`col${i}_body`]}</p>
        </div>
      ))}
    </div>
  );

  if (v === "icon") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ textAlign: "center", padding: "28px 20px" }}>
          {block.data[`col${i}_icon`] && <div style={{ fontSize: 36, marginBottom: 14 }}>{block.data[`col${i}_icon`]}</div>}
          <h4 data-fi-block-field={`${block.id}.col${i}_title`} style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: DARK, margin: "0 0 8px" }}>{block.data[`col${i}_title`]}</h4>
          <p data-fi-block-field={`${block.id}.col${i}_body`} style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>{block.data[`col${i}_body`]}</p>
        </div>
      ))}
    </div>
  );

  if (v === "border") return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ borderTop: `3px solid ${GOLD}`, padding: "20px 16px 16px", background: "#FAFAF8" }}>
          {block.data[`col${i}_icon`] && <div style={{ fontSize: 20, marginBottom: 10 }}>{block.data[`col${i}_icon`]}</div>}
          <h4 data-fi-block-field={`${block.id}.col${i}_title`} style={{ fontFamily: SERIF, fontSize: 15, fontWeight: 400, color: DARK, margin: "0 0 6px" }}>{block.data[`col${i}_title`]}</h4>
          <p data-fi-block-field={`${block.id}.col${i}_body`} style={{ fontSize: 13, color: MUTED, lineHeight: 1.6, margin: 0 }}>{block.data[`col${i}_body`]}</p>
        </div>
      ))}
    </div>
  );

  // default – light grey
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 20 }}>
      {[0, 1, 2].map(i => (
        <div key={i} style={{ background: "#FAFAFA", borderRadius: 14, padding: "22px 18px", border: "1px solid #EBEBEB" }}>
          {block.data[`col${i}_icon`] && <div style={{ fontSize: 22, marginBottom: 10 }}>{block.data[`col${i}_icon`]}</div>}
          <h4 data-fi-block-field={`${block.id}.col${i}_title`} style={{ fontFamily: SERIF, fontSize: 16, fontWeight: 400, color: DARK, margin: "0 0 7px" }}>{block.data[`col${i}_title`]}</h4>
          <p data-fi-block-field={`${block.id}.col${i}_body`} style={{ fontSize: 13, color: MUTED, lineHeight: 1.65, margin: 0 }}>{block.data[`col${i}_body`]}</p>
        </div>
      ))}
    </div>
  );
}

/* ─── TEXT + IMAGE ───────────────────────────────────────── */
function BlockTextImage({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const imageRight = block.data.imagePos !== "left";
  const ratio = v === "large_img" ? "3fr 4fr" : "1fr 1fr";

  if (v === "overlap") return (
    <div style={{ position: "relative", padding: "32px 0" }}>
      <img src={block.data.imageUrl} alt={block.data.imageAlt || ""}
        style={{ width: "60%", borderRadius: 16, objectFit: "cover", aspectRatio: "4/3", display: "block",
          [imageRight ? "marginLeft" : "marginRight"]: "auto" }} />
      <div style={{
        position: "absolute", [imageRight ? "left" : "right"]: "0", top: "50%", transform: "translateY(-50%)",
        width: "48%", background: "#FFFFFF", borderRadius: 14,
        padding: "28px 24px", boxShadow: "0 8px 32px rgba(0,0,0,0.12)",
      }}>
        {block.data.label && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 11, color: GOLD, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 8px" }}>{block.data.label}</p>}
        <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: DARK, margin: "0 0 10px", lineHeight: 1.25 }}>{block.data.title}</h2>
        <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 13, color: MUTED, lineHeight: 1.78, margin: 0 }}>{block.data.body}</p>
      </div>
    </div>
  );

  // default + large_img
  return (
    <div style={{ display: "grid", gridTemplateColumns: ratio, gap: 40, alignItems: "center" }}>
      <div style={{ order: imageRight ? 1 : 2 }}>
        {block.data.label && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 8px" }}>{block.data.label}</p>}
        <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(20px,2.5vw,28px)", fontWeight: 400, color: DARK, margin: "0 0 12px", lineHeight: 1.25 }}>{block.data.title}</h2>
        <p data-fi-block-field={`${block.id}.body`} style={{ fontSize: 14, color: MUTED, lineHeight: 1.8, margin: 0 }}>{block.data.body}</p>
      </div>
      <div style={{ order: imageRight ? 2 : 1 }}>
        <img src={block.data.imageUrl} alt={block.data.imageAlt || ""}
          style={{ width: "100%", borderRadius: 16, objectFit: "cover", aspectRatio: "4/3", display: "block" }} />
      </div>
    </div>
  );
}

/* ─── DIVIDER ────────────────────────────────────────────── */
function BlockDivider({ block }: { block: Block }) {
  const v = block.data.variant ?? "line";
  if (v === "ornamental") return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,transparent,${GOLD})` }} />
      <span style={{ fontSize: 14, color: GOLD, opacity: 0.6 }}>✦</span>
      <div style={{ flex: 1, height: 1, background: `linear-gradient(90deg,${GOLD},transparent)` }} />
    </div>
  );
  if (v === "spacer") return <div style={{ height: 48 }} />;
  // line
  return <div style={{ width: "100%", height: 1, background: "linear-gradient(90deg,transparent,#DDD,transparent)" }} />;
}

/* ─── CTA ────────────────────────────────────────────────── */
function BlockCta({ block }: { block: Block }) {
  const v = block.data.variant ?? "default";
  const label = block.data.label;
  const title = block.data.title;
  const subtitle = block.data.subtitle;
  const btnText = block.data.btnText;
  const btnUrl = block.data.btnUrl || "#";

  if (v === "dark") return (
    <div style={{ textAlign: "center", padding: "48px 32px", background: DARK, borderRadius: 20 }}>
      {label && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: "#D4AA5A", letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 12px" }}>{label}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(20px,3vw,32px)", fontWeight: 400, color: "#FFFFFF", margin: "0 0 10px" }}>{title}</h2>
      {subtitle && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontSize: 14, color: "rgba(255,255,255,.5)", margin: "0 0 26px" }}>{subtitle}</p>}
      <a href={btnUrl} style={{ display: "inline-block", padding: "12px 32px", background: GOLD, color: DARK, borderRadius: 9999, fontSize: 14, fontWeight: 700, textDecoration: "none", letterSpacing: ".02em" }}>
        <span data-fi-block-field={`${block.id}.btnText`}>{btnText}</span>
      </a>
    </div>
  );

  if (v === "gold") return (
    <div style={{ textAlign: "center", padding: "40px 32px", background: GOLDF, border: `1px solid rgba(188,150,64,0.2)`, borderRadius: 20 }}>
      {label && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".12em", textTransform: "uppercase", margin: "0 0 12px" }}>{label}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(20px,3vw,30px)", fontWeight: 400, color: "#795901", margin: "0 0 10px" }}>{title}</h2>
      {subtitle && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontSize: 14, color: "#6B5C2E", margin: "0 0 24px" }}>{subtitle}</p>}
      <a href={btnUrl} style={{ display: "inline-block", padding: "12px 28px", background: "#795901", color: "#FFFFFF", borderRadius: 9999, fontSize: 14, fontWeight: 700, textDecoration: "none" }}>
        <span data-fi-block-field={`${block.id}.btnText`}>{btnText}</span>
      </a>
    </div>
  );

  if (v === "minimal") return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, padding: "28px 32px", borderTop: "1px solid #E8E8ED", borderBottom: "1px solid #E8E8ED" }}>
      <div>
        {label && <p data-fi-block-field={`${block.id}.label`} style={{ fontSize: 10, fontWeight: 700, letterSpacing: ".14em", textTransform: "uppercase", color: "#AEAEB2", margin: "0 0 4px" }}>{label}</p>}
        <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(18px,2vw,24px)", fontWeight: 400, color: DARK, margin: 0 }}>{title}</h2>
      </div>
      <a href={btnUrl} style={{ flexShrink: 0, display: "inline-block", padding: "11px 24px", background: DARK, color: "#fff", borderRadius: 9999, fontSize: 13, fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
        <span data-fi-block-field={`${block.id}.btnText`}>{btnText}</span>
      </a>
    </div>
  );

  // default – warm gradient
  return (
    <div style={{ textAlign: "center", padding: "40px 24px", background: "linear-gradient(135deg,#FAF8F5,#F5F0E8)", borderRadius: 20 }}>
      {label && <p data-fi-block-field={`${block.id}.label`} style={{ fontFamily: SERIF, fontStyle: "italic", fontSize: 12, color: GOLD, letterSpacing: ".1em", textTransform: "uppercase", margin: "0 0 10px" }}>{label}</p>}
      <h2 data-fi-block-field={`${block.id}.title`} style={{ fontFamily: SERIF, fontSize: "clamp(20px,3vw,30px)", fontWeight: 400, color: DARK, margin: "0 0 10px" }}>{title}</h2>
      {subtitle && <p data-fi-block-field={`${block.id}.subtitle`} style={{ fontSize: 14, color: MUTED, margin: "0 0 24px" }}>{subtitle}</p>}
      <a href={btnUrl} style={{ display: "inline-block", padding: "12px 28px", background: DARK, color: "#fff", borderRadius: 9999, fontSize: 14, fontWeight: 600, textDecoration: "none", letterSpacing: ".02em" }}>
        <span data-fi-block-field={`${block.id}.btnText`}>{btnText}</span>
      </a>
    </div>
  );
}

/* ─── Dispatcher ─────────────────────────────────────────── */
function RenderBlock({ block }: { block: Block }) {
  switch (block.type) {
    case "text":       return <BlockText       block={block} />;
    case "heading":    return <BlockHeading    block={block} />;
    case "card":       return <BlockCard       block={block} />;
    case "quote":      return <BlockQuote      block={block} />;
    case "text_image": return <BlockTextImage  block={block} />;
    case "steps":      return <BlockSteps      block={block} />;
    case "cards_row":  return <BlockCardsRow   block={block} />;
    case "divider":    return <BlockDivider    block={block} />;
    case "cta":        return <BlockCta        block={block} />;
    default:           return null;
  }
}

/* ─── Main export ────────────────────────────────────────── */
export default function BlockRenderer({ zone }: { zone: string }) {
  const [blocks, setBlocks] = useState<Block[]>(() => getBlocks(zone));

  useEffect(() => { setBlocks(getBlocks(zone)); }, [zone]);

  useEffect(() => {
    function onBlocks(e: Event) {
      const d = (e as CustomEvent).detail;
      if (d?.zone === zone) setBlocks([...d.blocks]);
    }
    window.addEventListener("fi:blocks", onBlocks);
    return () => window.removeEventListener("fi:blocks", onBlocks);
  }, [zone]);

  if (blocks.length === 0) return null;

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 28, marginTop: 24 }}>
      {blocks.map(block => (
        <div key={block.id} data-fi-block={block.id} data-fi-block-type={block.type}>
          <RenderBlock block={block} />
        </div>
      ))}
    </div>
  );
}
