export interface ArtWork {
  id: string;
  weekN: number;
  weekTitle: string;
  artTitle: string;
  dataUrl: string;
  uploadedAt: string;
  note: string;
}

const KEY = "fi_art_gallery";
const EVENT = "fi:gallery:updated";

export function compressImage(dataUrl: string, maxPx = 900, quality = 0.72): Promise<string> {
  return new Promise((resolve) => {
    const img = new Image();
    img.onload = () => {
      const scale = Math.min(1, maxPx / Math.max(img.width, img.height));
      const w = Math.round(img.width * scale);
      const h = Math.round(img.height * scale);
      const canvas = document.createElement("canvas");
      canvas.width = w;
      canvas.height = h;
      const ctx = canvas.getContext("2d")!;
      ctx.drawImage(img, 0, 0, w, h);
      resolve(canvas.toDataURL("image/jpeg", quality));
    };
    img.onerror = () => resolve(dataUrl);
    img.src = dataUrl;
  });
}

export function loadGallery(): ArtWork[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]"); } catch { return []; }
}

export function saveGallery(works: ArtWork[]) {
  const data = JSON.stringify(works);
  try {
    localStorage.setItem(KEY, data);
  } catch {
    // Quota exceeded — remove oldest items until it fits
    const trimmed = [...works];
    while (trimmed.length > 0) {
      trimmed.pop();
      try {
        localStorage.setItem(KEY, JSON.stringify(trimmed));
        break;
      } catch { /* keep trimming */ }
    }
  }
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function addToGallery(work: ArtWork) {
  saveGallery([work, ...loadGallery()]);
}

export function cleanLegacyStorage() {
  for (let i = 1; i <= 48; i++) {
    localStorage.removeItem(`fi_artwork_week_${i}`);
  }
}

// Auto-clean legacy per-week keys on first import
if (typeof window !== "undefined") {
  cleanLegacyStorage();
}

export function removeFromGallery(id: string) {
  saveGallery(loadGallery().filter(w => w.id !== id));
}

export function loadGalleryByWeek(weekN: number): ArtWork[] {
  return loadGallery().filter(w => w.weekN === weekN);
}

export { EVENT as GALLERY_EVENT };
