import { useEffect } from "react";
import { getDraft, getPublished } from "@/lib/content";

function applyAllSectionStyles() {
  const published = getPublished();
  const draft = getDraft();
  const content: Record<string, string> = { ...published, ...draft };

  document.querySelectorAll<HTMLElement>("[data-fi-section]").forEach(el => {
    const sid = el.getAttribute("data-fi-section")!;
    const bgKey  = `section.${sid}.bg`;
    const colKey = `section.${sid}.col`;

    if (content[bgKey]) {
      const val = content[bgKey];
      if (val.startsWith("http") || val.startsWith("/") || val.startsWith("data:")) {
        el.style.backgroundImage    = `url("${val}")`;
        el.style.backgroundSize     = "cover";
        el.style.backgroundPosition = "center";
        el.style.backgroundColor    = "";
      } else {
        el.style.backgroundColor = val;
        el.style.backgroundImage = "";
      }
    } else {
      el.style.backgroundColor = "";
      el.style.backgroundImage = "";
    }

    const gridEl = el.querySelector<HTMLElement>("[data-fi-grid]");
    if (gridEl && content[colKey]) {
      gridEl.style.gridTemplateColumns = content[colKey];
    } else if (gridEl) {
      gridEl.style.gridTemplateColumns = "";
    }
  });
}

export function SectionStyleApplier() {
  useEffect(() => {
    const timer = setTimeout(applyAllSectionStyles, 150);

    const handler = () => setTimeout(applyAllSectionStyles, 50);
    window.addEventListener("fi:content",   handler);
    window.addEventListener("fi:published", handler);
    window.addEventListener("fi:reset",     handler);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("fi:content",   handler);
      window.removeEventListener("fi:published", handler);
      window.removeEventListener("fi:reset",     handler);
    };
  }, []);

  return null;
}
