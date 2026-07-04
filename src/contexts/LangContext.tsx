"use client";
import { createContext, useContext, useState, ReactNode } from "react";
import { fr } from "@/lib/translations/fr";
import { ar } from "@/lib/translations/ar";

type Lang = "ar" | "fr";
type Translations = typeof fr;

interface LangContextType {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: keyof Translations) => string;
  dir: "rtl" | "ltr";
}

const LangContext = createContext<LangContextType | null>(null);

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>("ar");
  const translations = lang === "ar" ? ar : fr;
  const t = (key: keyof Translations) => translations[key] ?? key;
  const dir = lang === "ar" ? "rtl" : "ltr";
  return (
    <LangContext.Provider value={{ lang, setLang, t, dir }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LangProvider");
  return ctx;
}
