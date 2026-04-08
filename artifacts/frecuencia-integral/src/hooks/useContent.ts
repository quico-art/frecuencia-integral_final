import { useState, useEffect } from "react";
import { getContentValue, setDraftValue } from "@/lib/content";

export function useContent(key: string, fallback: string): [string, (v: string) => void] {
  const [value, setValue] = useState(() => getContentValue(key, fallback));

  useEffect(() => {
    function onContent(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (!detail?.key || detail.key === key) {
        setValue(getContentValue(key, fallback));
      }
    }
    function onReset() { setValue(fallback); }
    function onPublished() { setValue(getContentValue(key, fallback)); }

    window.addEventListener("fi:content", onContent);
    window.addEventListener("fi:reset", onReset);
    window.addEventListener("fi:published", onPublished);
    return () => {
      window.removeEventListener("fi:content", onContent);
      window.removeEventListener("fi:reset", onReset);
      window.removeEventListener("fi:published", onPublished);
    };
  }, [key, fallback]);

  return [value, (v) => setDraftValue(key, v)];
}
