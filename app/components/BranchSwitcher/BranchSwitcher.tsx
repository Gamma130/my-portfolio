"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { ProfileSummary } from "@/lib/db/queries";
import styles from "./BranchSwitcher.module.css";
import { GitBranch } from "lucide-react";

export default function BranchSwitcher({
  current,
  profiles,
}: {
  current: string;
  profiles: ProfileSummary[];
}) {
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);

  // close on outside click + escape
  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (rootRef.current && !rootRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("mousedown", onDown);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div className={styles.wrap} ref={rootRef}>
      <button
        type="button"
        className={styles.trigger}
        onClick={() => setOpen((o) => !o)}
        title="git checkout — switch branch"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className={styles.glyph}>
          <GitBranch size={15} className={styles.branchIcon} />
        </span>{" "}
        {current}
      </button>

      {open && (
        <div className={styles.menu} role="menu">
          <div className={styles.menuHead}>
            <span className={styles.dollar}>$</span> git checkout
          </div>
          {profiles.map((p) => (
            <Link
              key={p.id}
              href={`/${p.slug}`}
              role="menuitem"
              className={styles.item}
              data-current={p.slug === current}
              onClick={() => setOpen(false)}
            >
              <span className={styles.marker}>
                {p.slug === current ? "*" : " "}
              </span>
              <span className={styles.branch}>{p.slug}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
