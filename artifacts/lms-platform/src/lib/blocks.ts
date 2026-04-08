export type BlockType =
  | "text"
  | "heading"
  | "card"
  | "quote"
  | "text_image"
  | "steps"
  | "cards_row"
  | "divider"
  | "cta";

export interface Block {
  id: string;
  type: BlockType;
  /** Arbitrary field storage for the block */
  data: Record<string, string>;
}

const STORE_PREFIX = "lms_blocks_";

function storeKey(zone: string): string {
  return STORE_PREFIX + zone.replace(/[^a-zA-Z0-9_]/g, "_");
}

function loadBlocks(zone: string): Block[] {
  try { return JSON.parse(localStorage.getItem(storeKey(zone)) || "[]"); }
  catch { return []; }
}

function saveBlocks(zone: string, blocks: Block[]): void {
  localStorage.setItem(storeKey(zone), JSON.stringify(blocks));
  window.dispatchEvent(new CustomEvent("fi:blocks", { detail: { zone, blocks } }));
}

export function getBlocks(zone: string): Block[] { return loadBlocks(zone); }

export function addBlock(zone: string, type: BlockType, data: Record<string, string> = {}, insertAt?: number): Block {
  const blocks = loadBlocks(zone);
  const id = `${type}_${Date.now()}`;
  const block: Block = { id, type, data: { ...defaultData(type), ...data } };
  if (insertAt !== undefined && insertAt >= 0 && insertAt <= blocks.length) {
    const next = [...blocks];
    next.splice(insertAt, 0, block);
    saveBlocks(zone, next);
  } else {
    saveBlocks(zone, [...blocks, block]);
  }
  return block;
}

export function duplicateBlock(zone: string, id: string): void {
  const blocks = loadBlocks(zone);
  const idx = blocks.findIndex(b => b.id === id);
  if (idx === -1) return;
  const orig = blocks[idx];
  const copy: Block = { ...orig, id: `${orig.type}_${Date.now()}`, data: { ...orig.data } };
  const next = [...blocks];
  next.splice(idx + 1, 0, copy);
  saveBlocks(zone, next);
}

export function deleteBlock(zone: string, id: string): void {
  saveBlocks(zone, loadBlocks(zone).filter(b => b.id !== id));
}

export function moveBlock(zone: string, id: string, dir: "up" | "down"): void {
  const blocks = loadBlocks(zone);
  const idx = blocks.findIndex(b => b.id === id);
  if (idx === -1) return;
  const next = [...blocks];
  if (dir === "up" && idx > 0) { [next[idx - 1], next[idx]] = [next[idx], next[idx - 1]]; }
  if (dir === "down" && idx < next.length - 1) { [next[idx], next[idx + 1]] = [next[idx + 1], next[idx]]; }
  saveBlocks(zone, next);
}

export function updateBlockField(zone: string, id: string, field: string, value: string): void {
  const blocks = loadBlocks(zone);
  const block = blocks.find(b => b.id === id);
  if (!block) return;
  block.data[field] = value;
  saveBlocks(zone, blocks);
}

function defaultData(type: BlockType): Record<string, string> {
  switch (type) {
    case "text":
      return { text: "Escribe aquí tu texto..." };
    case "heading":
      return { label: "Sección", title: "Tu titular aquí", subtitle: "Subtítulo o descripción breve" };
    case "card":
      return { icon: "✦", title: "Título de la tarjeta", body: "Describe el contenido de esta tarjeta.", cta: "", ctaUrl: "" };
    case "quote":
      return { text: "Tu cita inspiracional aquí.", author: "Frecuencia Integral Academy" };
    case "text_image":
      return { label: "", title: "Título de la sección", body: "Texto descriptivo de la sección.", imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=700&q=80", imageAlt: "Imagen", imagePos: "right" };
    case "steps":
      return { title: "Pasos", step0: "Primer paso", step1: "Segundo paso", step2: "Tercer paso" };
    case "cards_row":
      return {
        col0_icon: "✦", col0_title: "Tarjeta 1", col0_body: "Contenido de la primera tarjeta.",
        col1_icon: "◊", col1_title: "Tarjeta 2", col1_body: "Contenido de la segunda tarjeta.",
        col2_icon: "○", col2_title: "Tarjeta 3", col2_body: "Contenido de la tercera tarjeta.",
      };
    case "divider":
      return { style: "line" };
    case "cta":
      return { label: "", title: "¿Listo para empezar?", subtitle: "Únete a la academia hoy.", btnText: "Comenzar ahora", btnUrl: "/login" };
    default:
      return {};
  }
}

export const BLOCK_LABELS: Record<BlockType, { icon: string; label: string; description: string }> = {
  text:       { icon: "¶",  label: "Texto libre",      description: "Párrafo o bloque de texto" },
  heading:    { icon: "H",  label: "Encabezado",        description: "Título + subtítulo de sección" },
  card:       { icon: "▣",  label: "Tarjeta",           description: "Tarjeta con icono, título y texto" },
  quote:      { icon: "❝",  label: "Cita",              description: "Frase destacada con autor" },
  text_image: { icon: "⊞",  label: "Texto + Imagen",    description: "Columna de texto con imagen" },
  steps:      { icon: "≡",  label: "Pasos / Lista",     description: "Lista numerada de pasos" },
  cards_row:  { icon: "⊟",  label: "Fila de tarjetas",  description: "3 tarjetas en columnas" },
  divider:    { icon: "—",  label: "Separador",         description: "Línea divisora visual" },
  cta:        { icon: "→",  label: "Llamada a acción",  description: "Sección CTA con botón" },
};
