"use client";

import { useState, useEffect } from "react";

const SECTIONS = [
  "top",
  "about",
  "projects",
  "skills",
  "experience",
  "contact",
];

export default function ActiveSection({ root }: { root?: string }) {
  const [active, setActive] = useState("");

  useEffect(() => {
    const rootEl = root
      ? (document.querySelector(root) as HTMLElement | null)
      : null;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) {
          setActive(visible[0].target.id);
        }
      },
      {
        root: rootEl,
        rootMargin: "-45% 0px -45% 0px",
        threshold: 0,
      },
    );

    const els = SECTIONS.map((id) => document.getElementById(id)).filter(
      Boolean,
    ) as HTMLElement[];

    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [root]);

  return <span>~/{active === "top" ? "" : active}</span>;
}
