import { notFound } from "next/navigation";
import { ThemeProvider } from "@/components/ThemeProvider";
import { Toaster } from "@/components/ui/toaster";
import { I18nProvider } from "@/components/I18nProvider";
import { ConfigProvider } from "@/contexts/ConfigContext";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import { getConfig } from "@/lib/config";
import { locales, type Locale } from "@/lib/i18n";
import { getDictionary } from "./dictionaries";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"]
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"]
});

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  const dictionary = await getDictionary(validLocale);
  const config = await getConfig();

  console.log("config", config);

  return (
    <html lang={validLocale} className="overflow-x-hidden max-w-full">
      <head>
        <style
          dangerouslySetInnerHTML={{
            __html: `
          :root {
            --color-primary: ${config.colors.primary};
            --color-secondary: ${config.colors.secondary};
            --color-accent: ${config.colors.accent};
          }
        `
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden max-w-full`}
      >
        <ConfigProvider config={config}>
          <I18nProvider locale={validLocale} dictionary={dictionary}>
            <ThemeProvider>
              {children}
              <Toaster />
            </ThemeProvider>
          </I18nProvider>
        </ConfigProvider>
      </body>
    </html>
  );
}
