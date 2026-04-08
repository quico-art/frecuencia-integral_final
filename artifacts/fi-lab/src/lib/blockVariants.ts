import type { BlockType } from "./blocks";

export type VariantDef = {
  id: string;
  label: string;
  /** CSS thumbnail descriptor – rendered as mini preview */
  preview: VariantPreview;
};

export type VariantPreview = {
  type: "card" | "heading" | "quote" | "text" | "steps" | "cards_row" | "cta" | "divider" | "text_image";
  variant: string;
};

export const BLOCK_VARIANTS: Record<BlockType, VariantDef[]> = {
  card: [
    { id: "default",  label: "Sombra suave",   preview: { type: "card", variant: "default"  } },
    { id: "bordered", label: "Borde dorado",    preview: { type: "card", variant: "bordered" } },
    { id: "dark",     label: "Oscuro",          preview: { type: "card", variant: "dark"     } },
    { id: "minimal",  label: "Minimalista",     preview: { type: "card", variant: "minimal"  } },
  ],
  heading: [
    { id: "default",  label: "Con línea",       preview: { type: "heading", variant: "default"  } },
    { id: "centered", label: "Centrado",        preview: { type: "heading", variant: "centered" } },
    { id: "minimal",  label: "Sin decoración",  preview: { type: "heading", variant: "minimal"  } },
    { id: "gold",     label: "Fondo dorado",    preview: { type: "heading", variant: "gold"     } },
  ],
  quote: [
    { id: "default",   label: "Borde lateral",  preview: { type: "quote", variant: "default"   } },
    { id: "centered",  label: "Centrada",       preview: { type: "quote", variant: "centered"  } },
    { id: "highlight", label: "Destacada",      preview: { type: "quote", variant: "highlight" } },
    { id: "dark",      label: "Oscura",         preview: { type: "quote", variant: "dark"      } },
  ],
  text: [
    { id: "default", label: "Normal",       preview: { type: "text", variant: "default" } },
    { id: "serif",   label: "Serif",        preview: { type: "text", variant: "serif"   } },
    { id: "lead",    label: "Entradilla",   preview: { type: "text", variant: "lead"    } },
    { id: "inset",   label: "Destacado",    preview: { type: "text", variant: "inset"   } },
  ],
  steps: [
    { id: "default",  label: "Numerada",    preview: { type: "steps", variant: "default"  } },
    { id: "circles",  label: "Círculos",    preview: { type: "steps", variant: "circles"  } },
    { id: "cards",    label: "Tarjetas",    preview: { type: "steps", variant: "cards"    } },
    { id: "timeline", label: "Línea",       preview: { type: "steps", variant: "timeline" } },
  ],
  cards_row: [
    { id: "default", label: "Fondo gris",   preview: { type: "cards_row", variant: "default" } },
    { id: "white",   label: "Sombra",       preview: { type: "cards_row", variant: "white"   } },
    { id: "icon",    label: "Icono grande", preview: { type: "cards_row", variant: "icon"    } },
    { id: "border",  label: "Borde top",    preview: { type: "cards_row", variant: "border"  } },
  ],
  cta: [
    { id: "default", label: "Suave",        preview: { type: "cta", variant: "default" } },
    { id: "dark",    label: "Oscuro",       preview: { type: "cta", variant: "dark"    } },
    { id: "gold",    label: "Dorado",       preview: { type: "cta", variant: "gold"    } },
    { id: "minimal", label: "Limpio",       preview: { type: "cta", variant: "minimal" } },
  ],
  divider: [
    { id: "line",       label: "Línea",     preview: { type: "divider", variant: "line"       } },
    { id: "ornamental", label: "Ornamental",preview: { type: "divider", variant: "ornamental" } },
    { id: "spacer",     label: "Espacio",   preview: { type: "divider", variant: "spacer"     } },
  ],
  text_image: [
    { id: "default",  label: "50/50",       preview: { type: "text_image", variant: "default"  } },
    { id: "large_img",label: "Imagen amplia",preview: { type: "text_image", variant: "large_img"} },
    { id: "overlap",  label: "Solapado",    preview: { type: "text_image", variant: "overlap"  } },
  ],
};
