"use client";

import { useState, useEffect, useRef } from "react";
import { useAsk } from "@/app/context/AskContext";
import { useAskBot } from "@/app/hooks/useAskBot";
import styles from "./AskPanel.module.css";

const SUGGESTIONS = [
  "What projects has Marvin worked on?",
  "What's his background?",
];

export default function AskPanel() {
  const { open, closeAsk } = useAsk();
  const { history, streaming, loading, error, ask } = useAskBot();
  const [input, setInput] = useState("");

  const inputRef = useRef<HTMLInputElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Focus the input whenever the panel opens.
  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  // Escape closes the panel.
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") closeAsk();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [closeAsk]);

  // Auto-scroll to the bottom as the conversation grows / streams.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history, streaming]);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (loading) return;
    const q = input.trim();
    if (!q) return;
    ask(q);
    setInput("");
  }

  return (
    <div className={styles.root} data-open={open} aria-hidden={!open}>
      {/* scrim (mobile only, via CSS) */}
      <div className={styles.scrim} onClick={closeAsk} />

      {/* panel */}
      <div className={styles.panel} role="dialog" aria-label="ask() assistant">
        {/* conversation */}
        <div className={styles.conversation} ref={scrollRef}>
          <div className={styles.intro}>
            // a terminal assistant trained on Marvin&apos;s work. ask about
            projects, background, or availability.
          </div>

          {history.map((m, i) =>
            m.role === "user" ? (
              <div key={i} className={styles.userMsg}>
                <span className={styles.accent}>&gt; ask</span> {m.content}
              </div>
            ) : (
              <div key={i} className={styles.botMsg}>
                {m.content}
              </div>
            ),
          )}

          {/* the answer currently streaming in */}
          {streaming && <div className={styles.botMsg}>{streaming}</div>}

          {loading && !streaming && (
            <div className={styles.botMsg}>
              <span className={styles.dot} />
              <span className={styles.dot} />
              <span className={styles.dot} />
            </div>
          )}

          {error && <div className={styles.error}>{error}</div>}

          {/* suggestion chips — only before any conversation */}
          {history.length === 0 && !loading && (
            <>
              <div className={styles.tryLabel}>try:</div>
              <div className={styles.chips}>
                {SUGGESTIONS.map((q) => (
                  <button
                    key={q}
                    className={styles.chip}
                    onClick={() => ask(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* prompt */}
        <form className={styles.prompt} onSubmit={submit}>
          <span className={styles.accent}>&gt; ask</span>
          <input
            ref={inputRef}
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={SUGGESTIONS[0]}
            autoComplete="off"
          />
        </form>
      </div>
    </div>
  );
}
