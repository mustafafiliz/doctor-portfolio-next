"use client";

import { createContext, useContext, ReactNode } from "react";

interface Dictionary {
  [key: string]: string | Dictionary;
}

const I18nContext = createContext<{
  locale: string;
  dictionary: Dictionary;
} | null>(null);

export function I18nProvider({
  children,
  locale,
  dictionary
}: {
  children: ReactNode;
  locale: string;
  dictionary: Dictionary;
}) {
  return (
    <I18nContext.Provider value={{ locale, dictionary }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error("useI18n must be used within I18nProvider");
  }
  return context;
}

export function useTranslations(namespace?: string) {
  const { dictionary } = useI18n();

  return (key: string) => {
    const keys = namespace ? `${namespace}.${key}` : key;
    const keysArray = keys.split(".");
    let value: string | Dictionary | undefined = dictionary;

    for (const k of keysArray) {
      if (typeof value === "object" && value !== null) {
        value = value[k] as string | Dictionary | undefined;
      } else {
        value = undefined;
      }
      if (value === undefined) return keys;
    }

    return typeof value === "string" ? value : keys;
  };
}
