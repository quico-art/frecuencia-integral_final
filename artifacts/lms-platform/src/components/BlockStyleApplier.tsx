import { useEffect } from "react";
import { getDraft, getPublished } from "@/lib/content";

const SHADOW_MAP: Record<string, string> = {
  none: "none",
  sm:   "0 1px 4px rgba(0,0,0,0.08)",
  md:   "0 4px 16px rgba(0,0,0,0.12)",
  lg:   "0 8px 32px rgba(0,0,0,0.18)",
  xl:   "0 16px 48px rgba(0,0,0,0.22)",
};

function applyAllBlockStyles() {
  const published = getPublished();
  const draft = getDraft();
  const content: Record<string, string> = { ...published, ...draft };

  document.querySelectorAll<HTMLElement>("[data-fi-block]").forEach(el => {
    const bid = el.getAttribute("data-fi-block")!;

    const bg  = content[`block.${bid}.bg`]  ?? "";
    const br  = content[`block.${bid}.br`]  ?? "";
    const sh  = content[`block.${bid}.sh`]  ?? "";
    const vis = content[`block.${bid}.vis`] ?? "";
    const pad = content[`block.${bid}.pad`] ?? "";
    const w   = content[`block.${bid}.w`]   ?? "";
    const h   = content[`block.${bid}.h`]   ?? "";

    /* ── Background ── */
    const prevBg = el.hasAttribute("data-fi-bg-set");
    if (bg) {
      el.setAttribute("data-fi-bg-set", "1");
      if (bg.startsWith("http") || bg.startsWith("/") || bg.startsWith("data:")) {
        el.style.backgroundImage    = `url("${bg}")`;
        el.style.backgroundSize     = "cover";
        el.style.backgroundPosition = "center";
        el.style.backgroundColor    = "";
      } else {
        el.style.backgroundColor = bg;
        el.style.backgroundImage = "";
        el.style.backgroundSize  = "";
      }
    } else if (prevBg) {
      el.removeAttribute("data-fi-bg-set");
      el.style.backgroundColor = "";
      el.style.backgroundImage = "";
      el.style.backgroundSize  = "";
      el.style.backgroundPosition = "";
    }

    /* ── Border radius ── */
    const prevBr = el.hasAttribute("data-fi-br-set");
    if (br !== "") {
      el.setAttribute("data-fi-br-set", "1");
      el.style.borderRadius = `${br}px`;
    } else if (prevBr) {
      el.removeAttribute("data-fi-br-set");
      el.style.borderRadius = "";
    }

    /* ── Shadow ── */
    const prevSh = el.hasAttribute("data-fi-sh-set");
    if (sh) {
      el.setAttribute("data-fi-sh-set", "1");
      el.style.boxShadow = SHADOW_MAP[sh] ?? "none";
    } else if (prevSh) {
      el.removeAttribute("data-fi-sh-set");
      el.style.boxShadow = "";
    }

    /* ── Padding ── */
    const prevPad = el.hasAttribute("data-fi-pad-set");
    if (pad) {
      el.setAttribute("data-fi-pad-set", "1");
      el.style.padding = pad;
    } else if (prevPad) {
      el.removeAttribute("data-fi-pad-set");
      el.style.padding = "";
    }

    /* ── Width (max-width) ── */
    const prevW = el.hasAttribute("data-fi-w-set");
    if (w) {
      el.setAttribute("data-fi-w-set", "1");
      el.style.maxWidth = w;
      el.style.width    = "100%";
    } else if (prevW) {
      el.removeAttribute("data-fi-w-set");
      el.style.maxWidth = "";
      el.style.width    = "";
    }

    /* ── Height (min-height) ── */
    const prevH = el.hasAttribute("data-fi-h-set");
    if (h) {
      el.setAttribute("data-fi-h-set", "1");
      el.style.minHeight = h;
    } else if (prevH) {
      el.removeAttribute("data-fi-h-set");
      el.style.minHeight = "";
    }

    /* ── Visibility ── */
    const prevVis = el.hasAttribute("data-fi-vis-set");
    if (vis === "hidden") {
      el.setAttribute("data-fi-vis-set", "1");
      el.style.display = "none";
    } else if (prevVis) {
      el.removeAttribute("data-fi-vis-set");
      el.style.display = "";
    }
  });
}

export function BlockStyleApplier() {
  useEffect(() => {
    const timer = setTimeout(applyAllBlockStyles, 200);

    const handler = () => setTimeout(applyAllBlockStyles, 50);
    window.addEventListener("fi:content",   handler);
    window.addEventListener("fi:published", handler);
    window.addEventListener("fi:reset",     handler);

    const obs = new MutationObserver(() => setTimeout(applyAllBlockStyles, 100));
    obs.observe(document.body, { childList: true, subtree: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener("fi:content",   handler);
      window.removeEventListener("fi:published", handler);
      window.removeEventListener("fi:reset",     handler);
      obs.disconnect();
    };
  }, []);

  return null;
}
