import { useContent } from "./useContent";

export interface ContainerDefaults {
  pos?:  string; // "left" | "center" | "right"
  maxW?: string; // px as string, e.g. "800"
  padH?: string; // horizontal padding px
  padB?: string; // bottom padding px
}

/** Returns inline style for the text container div, reactive to editor changes */
export function useContainerStyle(prefix: string, defs: ContainerDefaults = {}) {
  const [pos]  = useContent(`${prefix}.cpos`,  defs.pos  ?? "center");
  const [maxW] = useContent(`${prefix}.cmaxW`, defs.maxW ?? "800");
  const [padH] = useContent(`${prefix}.cpadH`, defs.padH ?? "40");
  const [padB] = useContent(`${prefix}.cpadB`, defs.padB ?? "0");

  const w   = Number(maxW) || 800;
  const ph  = Number(padH);
  const pb  = Number(padB);
  const isC = pos === "center";
  const isR = pos === "right";

  const style: React.CSSProperties = {
    maxWidth:    w,
    padding:     pb > 0 ? `0 ${ph}px ${pb}px` : `0 ${ph}px`,
    marginLeft:  isC || isR ? "auto" : undefined,
    marginRight: isC ? "auto" : isR ? 0 : undefined,
    textAlign:   isC ? "center" : isR ? "right" : "left",
    width:       "100%",
  };

  /** For flex/grid parents: justifyContent value */
  const justify = isC ? "center" : isR ? "flex-end" : "flex-start";

  return { style, justify, pos, maxW, padH, padB };
}
