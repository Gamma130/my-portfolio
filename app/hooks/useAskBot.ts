"use client";

import { useState } from "react";

export type Message = { role: "user" | "assistant"; content: string };

export function useAskBot() {
  const [history, setHistory] = useState<Message[]>([]);
  const [streaming, setStreaming] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function ask(question: string) {
    const trimmed = question.trim();
    if (!trimmed || loading) return;

    setError("");
    setLoading(true);
    setStreaming("");

    const userMessage: Message = { role: "user", content: trimmed };
    const sentMessages = [...history, userMessage];

    setHistory(sentMessages);

    try {
      const res = await fetch("/api/ask", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: sentMessages }),
      });

      if (!res.ok || !res.body) {
        const data = await res.json().catch(() => ({}));
        const msg = data.message ?? data.error ?? "Something went wrong.";

        setError(msg);
        setLoading(false);
        return;
      }

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        const chunk = decoder.decode(value);
        answer += chunk;
        setStreaming(answer);
      }

      setHistory((prev) => [...prev, { role: "assistant", content: answer }]);
      setStreaming("");
    } catch {
      setError("Connection error. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setHistory([]);
    setStreaming("");
    setError("");
  }

  return { history, streaming, loading, error, ask, reset };
}
