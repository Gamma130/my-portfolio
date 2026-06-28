"use client";

import { useAsk } from "@/app/context/AskContext";
import styles from "./AskButtonFooter.module.css";

export default function AskButton({ className }: { className?: string }) {
  const { toggleAsk } = useAsk();

  return (
    <button className={className ?? styles.button} onClick={toggleAsk}>
      <span className={styles.accent}>$ask</span>
    </button>
  );
}
