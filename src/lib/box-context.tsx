"use client";
import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Currency } from "./pricing";
import type { FontKey } from "./products";

export type BoxState = {
  name: string; font: FontKey; textColor: string; boxColor: string; message: string;
  selected: string[]; currency: Currency;
  recipient: string; country: string; city: string; address: string; cardMessage: string;
};

const DEFAULT: BoxState = {
  name: "", font: "chic", textColor: "#7a1f43", boxColor: "#f2a7bb", message: "",
  selected: [], currency: "EUR",
  recipient: "", country: "France", city: "", address: "", cardMessage: "",
};

type Ctx = { box: BoxState; update: (p: Partial<BoxState>) => void; toggleProduct: (id: string) => void };
const BoxContext = createContext<Ctx | null>(null);
const KEY = "daf-box-v1";

export function BoxProvider({ children }: { children: ReactNode }) {
  const [box, setBox] = useState<BoxState>(DEFAULT);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setBox({ ...DEFAULT, ...JSON.parse(raw) });
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try { localStorage.setItem(KEY, JSON.stringify(box)); } catch {}
  }, [box, ready]);

  const update = (p: Partial<BoxState>) => setBox((b) => ({ ...b, ...p }));
  const toggleProduct = (id: string) =>
    setBox((b) => ({ ...b, selected: b.selected.includes(id) ? b.selected.filter((x) => x !== id) : [...b.selected, id] }));

  return <BoxContext.Provider value={{ box, update, toggleProduct }}>{children}</BoxContext.Provider>;
}

export function useBox() {
  const c = useContext(BoxContext);
  if (!c) throw new Error("useBox doit être utilisé dans <BoxProvider>");
  return c;
}
