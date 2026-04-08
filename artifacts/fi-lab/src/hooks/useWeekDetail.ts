import { useState, useEffect } from "react";
import { getContentValue } from "@/lib/content";
import type { WeekDetail } from "@/lib/data";

function buildOverriddenDetail(def: WeekDetail): WeekDetail {
  const n = def.n;
  /* Always prefer the fallback if the stored value is blank */
  const cv = (key: string, fallback: string): string => {
    const stored = getContentValue(key, fallback);
    return stored && stored.trim() ? stored : fallback;
  };

  return {
    ...def,
    title:             cv(`week.${n}.title`,             def.title),
    message:           cv(`week.${n}.message`,           def.message),
    concepts:          (def.concepts ?? []).map(([term, dfn], i) => [
      cv(`week.${n}.concept.${i}.term`, term),
      cv(`week.${n}.concept.${i}.def`,  dfn),
    ] as [string, string]),
    exerciseTitle:     cv(`week.${n}.exerciseTitle`,     def.exerciseTitle ?? ""),
    exerciseObjective: cv(`week.${n}.exerciseObjective`, def.exerciseObjective ?? ""),
    exerciseRef:       cv(`week.${n}.exerciseRef`,       def.exerciseRef ?? ""),
    exerciseSteps:     (def.exerciseSteps ?? []).map((s, i) => cv(`week.${n}.exerciseStep.${i}`, s)),
    artTitle:          cv(`week.${n}.artTitle`,          def.artTitle ?? ""),
    artDesc:           cv(`week.${n}.artDesc`,           def.artDesc ?? ""),
    artSteps:          (def.artSteps ?? []).map((s, i) => cv(`week.${n}.artStep.${i}`, s)),
    artReflection:     def.artReflection
      ? cv(`week.${n}.artReflection`, def.artReflection)
      : undefined,
  };
}

export function useWeekDetail(defaultDetail: WeekDetail): WeekDetail {
  const n = defaultDetail.n;
  const [detail, setDetail] = useState<WeekDetail>(() => buildOverriddenDetail(defaultDetail));

  useEffect(() => {
    const refresh = () => setDetail(buildOverriddenDetail(defaultDetail));
    window.addEventListener("fi:content",   refresh);
    window.addEventListener("fi:saved",     refresh);
    window.addEventListener("fi:published", refresh);
    window.addEventListener("fi:reset",     refresh);
    return () => {
      window.removeEventListener("fi:content",   refresh);
      window.removeEventListener("fi:saved",     refresh);
      window.removeEventListener("fi:published", refresh);
      window.removeEventListener("fi:reset",     refresh);
    };
  }, [n]);

  return detail;
}
