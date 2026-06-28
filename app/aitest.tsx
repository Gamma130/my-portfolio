"use client";

import { useEffect } from "react";
import { useAskBot } from "./hooks/useAskBot";

export default function AskTest() {
  const { history, streaming, loading, error, ask } = useAskBot();

  useEffect(() => {
    ask("What projects has Marvin done?");
  }, []); // ← leeres Array: läuft nur EINMAL, beim ersten Mount

  return (
    <section>
      {history.map((m, i) => (
        <div key={i}>
          <strong>{m.role}:</strong> {m.content}
        </div>
      ))}
      {streaming && (
        <div>
          <strong>streaming:</strong> {streaming}
        </div>
      )}
      {loading && <div>loading...</div>}
      {error && <div>error: {error}</div>}
    </section>
  );
}
