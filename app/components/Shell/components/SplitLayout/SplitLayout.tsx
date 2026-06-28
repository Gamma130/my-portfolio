"use client";

import { useAsk } from "@/app/context/AskContext";
import AskPanel from "@/app/components/AskPanel/AskPanel";
import styles from "./SplitLayout.module.css";

export default function SplitLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { open } = useAsk();

  return (
    <div className={styles.grid} data-ask-open={open}>
      <main className={styles.content} data-scroll-container>
        <div className={styles.contentInner}>{children}</div>
      </main>
      <AskPanel />
    </div>
  );
}
