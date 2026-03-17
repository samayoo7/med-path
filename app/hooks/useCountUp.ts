"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function useCountUp(target: number, durationMs = 1200) {
  const [value, setValue] = useState(0);
  const ref = useRef<HTMLSpanElement | null>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    if (!inView) return;
    let frameId: number;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frameId = requestAnimationFrame(tick);
      }
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [inView, target, durationMs]);

  return { ref, value };
}
