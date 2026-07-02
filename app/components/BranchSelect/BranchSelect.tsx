"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import type { ProfileSummary } from "@/lib/db/queries";
import styles from "./BranchSelect.module.css";

export default function BranchSelect({
  profiles,
}: {
  profiles: ProfileSummary[];
}) {
  const [active, setActive] = useState(0);
  const router = useRouter();
  const rowRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    profiles.forEach((p) => router.prefetch(`/${p.slug}`));
  }, [profiles, router]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (document.activeElement?.tagName ?? "").toUpperCase();
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      const last = profiles.length - 1;

      if (e.key === "ArrowDown" || e.key === "j") {
        e.preventDefault();
        setActive((i) => (i >= last ? 0 : i + 1));
        return;
      }
      if (e.key === "ArrowUp" || e.key === "k") {
        e.preventDefault();
        setActive((i) => (i <= 0 ? last : i - 1));
        return;
      }
      if (e.key === "Enter") {
        e.preventDefault();
        router.push(`/${profiles[active].slug}`);
        return;
      }
      const n = parseInt(e.key, 10);
      if (!Number.isNaN(n) && n >= 1 && n <= profiles.length) {
        e.preventDefault();
        router.push(`/${profiles[n - 1].slug}`);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, profiles, router]);

  return (
    <div className={styles.gate}>
      <div className={styles.inner}>
        <div className={styles.promptLine}>
          <span className={styles.user}>marvin@arch</span>
          <span className={styles.dim}>:~/portfolio $</span> git branch
        </div>

        <p className={styles.explain}>
          Same repo, several branches. Each checks out a different view of my
          work. Pick where to start — you can switch anytime from the{" "}
          <span className={styles.branchGlyph}>⎇</span> branch in the status
          bar.
        </p>

        <div className={styles.rows}>
          {profiles.map((p, i) => (
            <Link
              key={p.id}
              href={`/${p.slug}`}
              ref={(el) => {
                rowRefs.current[i] = el;
              }}
              className={styles.row}
              data-active={i === active}
              onMouseEnter={() => setActive(i)}
            >
              <span className={styles.caret}>▸</span>
              <span className={styles.marker}>{i === active ? "*" : " "}</span>
              <span className={styles.branch}>{p.slug}</span>
              <span className={styles.desc}>{p.jobrole}</span>
            </Link>
          ))}
        </div>

        <div className={styles.hint}>
          <span>
            <span className={styles.key}>↑↓</span> /{" "}
            <span className={styles.key}>j k</span> move
          </span>
          <span>
            <span className={styles.key}>enter</span> checkout
          </span>
          <span>
            <span className={styles.key}>1–{profiles.length}</span> quick pick
          </span>
          <span className={styles.caretBlink} />
        </div>
      </div>
    </div>
  );
}
