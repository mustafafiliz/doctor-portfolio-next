import trMessages from "../messages/tr.json";
import enMessages from "../messages/en.json";

export const locales = ["tr", "en"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "tr";

export const messages = {
  tr: trMessages,
  en: enMessages
} as const;

export function getMessages(locale: Locale) {
  return messages[locale] || messages[defaultLocale];
}
