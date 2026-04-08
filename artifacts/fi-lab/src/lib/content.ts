import CONTENT from "@/content-defaults";

export type ContentStore = Record<string, string>;

const DRAFT_KEY  = "fi_draft";
const PUB_KEY    = "fi_published";

function safeGet(key: string): ContentStore {
  try { return JSON.parse(localStorage.getItem(key) || "{}"); }
  catch { return {}; }
}

export function getDraft(): ContentStore { return safeGet(DRAFT_KEY); }
export function getPublished(): ContentStore { return safeGet(PUB_KEY); }

/** Priority: draft > published > content-defaults.ts > hardcoded fallback
 *  Empty strings are treated as "not set" — falls through to the next priority. */
export function getContentValue(key: string, fallback: string): string {
  const d = getDraft(); if (d[key] !== undefined && d[key] !== "") return d[key];
  const p = getPublished(); if (p[key] !== undefined && p[key] !== "") return p[key];
  if (CONTENT[key] !== undefined && CONTENT[key] !== "") return CONTENT[key];
  return fallback;
}

export function setDraftValue(key: string, value: string): void {
  const d = getDraft(); d[key] = value;
  localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  window.dispatchEvent(new CustomEvent("fi:content", { detail: { key, value } }));
}

export function saveDraft(): void {
  const d = getDraft(); d["__savedAt"] = new Date().toISOString();
  localStorage.setItem(DRAFT_KEY, JSON.stringify(d));
  window.dispatchEvent(new CustomEvent("fi:saved"));
}

export function publishDraft(): void {
  const d = getDraft(); d["__publishedAt"] = new Date().toISOString();
  localStorage.setItem(PUB_KEY, JSON.stringify(d));
  localStorage.removeItem(DRAFT_KEY);
  window.dispatchEvent(new CustomEvent("fi:published"));
  window.dispatchEvent(new CustomEvent("fi:content", { detail: {} }));
}

export function resetDraft(): void {
  localStorage.removeItem(DRAFT_KEY);
  window.dispatchEvent(new CustomEvent("fi:reset"));
}

export function resetPublished(): void {
  localStorage.removeItem(PUB_KEY);
  window.dispatchEvent(new CustomEvent("fi:reset"));
}

/** Borra TANTO el borrador como el contenido publicado — restaura el diseño del código */
export function resetAll(): void {
  localStorage.removeItem(DRAFT_KEY);
  localStorage.removeItem(PUB_KEY);
  window.dispatchEvent(new CustomEvent("fi:reset"));
  window.dispatchEvent(new CustomEvent("fi:content", { detail: {} }));
}

export function hasPublishedContent(): boolean {
  const p = getPublished();
  return Object.keys(p).filter(k => !k.startsWith("__")).length > 0;
}

export function hasDraftChanges(): boolean {
  const d = getDraft();
  return Object.keys(d).filter(k => !k.startsWith("__")).length > 0;
}

export function getDraftSavedAt(): string | null {
  return getDraft()["__savedAt"] || null;
}

export function getPublishedAt(): string | null {
  return getPublished()["__publishedAt"] || null;
}
