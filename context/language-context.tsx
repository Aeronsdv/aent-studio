"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { en } from "../locales/en";
import { tr } from "../locales/tr";

export type Language = "en" | "tr";

const dictionaries = { en, tr };

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // Detect preferred language from localStorage or browser settings
    const savedLang = localStorage.getItem("aent_lang") as Language;
    if (savedLang === "en" || savedLang === "tr") {
      setLanguageState(savedLang);
    } else {
      const browserLang = navigator.language.split("-")[0];
      const defaultLang: Language = browserLang === "tr" ? "tr" : "en";
      setLanguageState(defaultLang);
      localStorage.setItem("aent_lang", defaultLang);
    }
    setMounted(true);
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("aent_lang", lang);
  };

  const t = (path: string): string => {
    const activeDict = dictionaries[language] || en;
    const parts = path.split(".");
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let current: any = activeDict;
    for (const part of parts) {
      if (current && typeof current === "object" && part in current) {
        current = current[part];
      } else {
        // Fallback to English dictionary if not found in active dictionary
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let enFallback: any = en;
        for (const enPart of parts) {
          if (enFallback && typeof enFallback === "object" && enPart in enFallback) {
            enFallback = enFallback[enPart];
          } else {
            return path; // Return the path itself as a last resort
          }
        }
        return typeof enFallback === "string" ? enFallback : path;
      }
    }
    
    return typeof current === "string" ? current : path;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}
