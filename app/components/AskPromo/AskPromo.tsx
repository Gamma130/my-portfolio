"use client";

import { useAsk } from "@/app/context/AskContext";
import styles from "./AskPromo.module.css";

export default function AskPromo() {
  const { openAsk } = useAsk();

  return (
    <section className={styles.promo}>
      <p className={styles.text}>
        <span className={styles.accent}>$ask</span> - a terminal assistant
        trained on my work:
      </p>
      <div className={styles.buttonWrap}>
        <button className={styles.button} onClick={openAsk}>
          <span className={styles.accent}>$ask</span> a question
        </button>
      </div>
    </section>
  );
}
