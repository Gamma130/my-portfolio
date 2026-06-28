"use client";

import { useAsk } from "@/app/context/AskContext";
import { PanelRightOpen, PanelRightClose } from "lucide-react";
import styles from "./AskButtonNav.module.css";

export default function AskButtonNav() {
  const { open, toggleAsk } = useAsk();

  return (
    <button
      className={styles.toggle}
      onClick={toggleAsk}
      aria-label={open ? "Close ask panel" : "Open ask panel"}
      aria-pressed={open}
    >
      {open ? <PanelRightClose size={18} /> : <PanelRightOpen size={18} />}
    </button>
  );
}
