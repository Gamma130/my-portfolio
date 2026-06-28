"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

interface AskContextValue {
  open: boolean;
  openAsk: () => void;
  closeAsk: () => void;
  toggleAsk: () => void;
}

const AskContext = createContext<AskContextValue | null>(null);

export function AskProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const value: AskContextValue = {
    open,
    openAsk: () => setOpen(true),
    closeAsk: () => setOpen(false),
    toggleAsk: () => setOpen((v) => !v),
  };

  return <AskContext.Provider value={value}>{children}</AskContext.Provider>;
}

export function useAsk() {
  const ctx = useContext(AskContext);
  if (!ctx) throw new Error("useAsk must be used within AskProvider");
  return ctx;
}
