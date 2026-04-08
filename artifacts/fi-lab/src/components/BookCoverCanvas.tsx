import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist";
import workerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjsLib.GlobalWorkerOptions.workerSrc = workerUrl;

interface Props {
  pdfUrl: string;
  width: number;
  height: number;
  fallback?: React.ReactNode;
}

export default function BookCoverCanvas({ pdfUrl, width, height, fallback }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");

  useEffect(() => {
    let cancelled = false;
    setStatus("loading");

    const render = async () => {
      try {
        const pdf = await pdfjsLib.getDocument(pdfUrl).promise;
        if (cancelled) return;
        const page = await pdf.getPage(1);
        if (cancelled) return;

        const canvas = canvasRef.current;
        if (!canvas) return;

        const nat   = page.getViewport({ scale: 1 });
        const scale = Math.max(width / nat.width, height / nat.height) * 1.5;
        const vp    = page.getViewport({ scale });
        canvas.width  = vp.width;
        canvas.height = vp.height;

        await page.render({ canvasContext: canvas.getContext("2d")!, viewport: vp }).promise;
        if (!cancelled) setStatus("done");
      } catch {
        if (!cancelled) setStatus("error");
      }
    };

    render();
    return () => { cancelled = true; };
  }, [pdfUrl, width, height]);

  return (
    <div style={{ width: "100%", height: "100%", overflow: "hidden", position: "relative" }}>
      {status !== "done" && (
        <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
          {status === "loading"
            ? <div style={{ width: 20, height: 20, border: "2px solid rgba(255,255,255,.15)", borderTopColor: "#BC9640", borderRadius: "50%", animation: "acad-rotate 0.9s linear infinite" }} />
            : fallback}
        </div>
      )}
      <canvas
        ref={canvasRef}
        style={{
          display: status === "done" ? "block" : "none",
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "50% 8%",
        }}
      />
    </div>
  );
}
