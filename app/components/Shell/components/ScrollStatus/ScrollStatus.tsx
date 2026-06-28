"use client";

import { useState, useEffect } from "react";

export default function ScrollPercent({
  scrollSelector,
}: {
  scrollSelector?: string;
}) {
  const [pct, setPct] = useState(0);

  useEffect(() => {
    const el = scrollSelector
      ? (document.querySelector(scrollSelector) as HTMLElement | null)
      : null;

    const target: HTMLElement | Window = el ?? window;

    function compute() {
      if (el) {
        const max = el.scrollHeight - el.clientHeight;
        const p = max > 0 ? (el.scrollTop / max) * 100 : 0;
        setPct(Math.round(p));
      } else {
        const doc = document.documentElement;
        const max = doc.scrollHeight - doc.clientHeight;
        const p = max > 0 ? (window.scrollY / max) * 100 : 0;
        setPct(Math.round(p));
      }
    }

    compute(); // initial
    target.addEventListener("scroll", compute, { passive: true });
    window.addEventListener("resize", compute);

    return () => {
      target.removeEventListener("scroll", compute);
      window.removeEventListener("resize", compute);
    };
  }, [scrollSelector]);

  return <span>{pct}%</span>;
}
