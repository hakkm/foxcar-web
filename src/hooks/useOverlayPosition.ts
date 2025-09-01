import { useLayoutEffect, useState } from "react";
import type React from "react";

export function useOverlayPosition(
  ref: React.RefObject<HTMLElement | null>,
  deps: React.DependencyList = []
) {
  const [style, setStyle] = useState<React.CSSProperties | null>(null);

  useLayoutEffect(() => {
    function update() {
      const el = ref?.current;
      if (!el) return setStyle(null);

      const rect = el.getBoundingClientRect();
      const left = rect.left;
      const top = rect.top;
      const width = rect.width;
      const height = Math.max(0, window.innerHeight - rect.top);

      setStyle({
        position: "fixed",
        left: `${left}px`,
        top: `${top}px`,
        width: `${width}px`,
        height: `${height}px`,
        pointerEvents: "auto",
      });
    }

    update();
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, deps); // deps come from caller

  return style;
}
