import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";
import { getMessages } from "next-intl/server";

type Locale = "tr" | "en";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as Locale)) {
    locale = routing.defaultLocale;
  }

  // next-intl automatically loads messages from messages/{locale}.json
  // This works in both Node.js and Edge Runtime
  const messages = await getMessages({ locale });

  return {
    locale,
    messages
  };
});
