"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { useConfig } from "@/hooks/useConfig";
import { getRoute } from "@/lib/routes";

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { config } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  // Prevent body scroll when drawer is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navItems = [
    { key: "home" as const, label: t("home") },
    { key: "about" as const, label: t("about") },
    { key: "specialties" as const, label: t("specialties") },
    { key: "gallery" as const, label: t("gallery") },
    { key: "contact" as const, label: t("contact") },
    { key: "blog" as const, label: t("blog") }
  ];

  const basePath = pathname?.replace(/^\/(tr|en)/, "") || "";

  const isActive = (route: string) => {
    if (route === "/") {
      return basePath === "" || basePath === "/";
    }
    return basePath === route;
  };

  const NavLink = ({
    route,
    children,
    className,
    onClick
  }: {
    route: string;
    children: React.ReactNode;
    className?: string;
    onClick?: () => void;
  }) => (
    <Link
      href={`/${currentLocale}${route}`}
      className={className}
      onClick={onClick}
    >
      {children}
    </Link>
  );

  return (
    <>
      <header className="sticky top-0 z-50 w-full">
        {/* Minimalist background - only on desktop */}
        <div className="absolute inset-0 bg-background/95 backdrop-blur-sm border-b border-border/30 lg:bg-gradient-to-r lg:from-background lg:via-background/95 lg:to-background lg:backdrop-blur-2xl lg:border-border/50" />

        {/* Desktop only animated effects */}
        <div
          className="hidden lg:block absolute inset-0 opacity-30 bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 animate-gradient"
          style={{
            backgroundSize: "200% 200%",
            animation: "gradient 8s ease infinite"
          }}
        />
        <div className="hidden lg:block absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-shimmer" />

        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex h-16 sm:h-20 lg:h-24 items-center justify-between">
            {/* Logo Section */}
            <Link href={`/${currentLocale}`} className="flex items-center">
              <Image
                src="/images/logo.webp"
                alt="Prof. Dr. Kadriye Ufuk Elgin Logo"
                width={160}
                height={44}
                className="h-9 sm:h-10 lg:h-12 w-auto object-contain"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-gradient-to-r from-muted/40 via-muted/30 to-muted/40 backdrop-blur-xl rounded-full px-2 xl:px-3 py-2 border border-border/50 shadow-xl shadow-primary/5">
              {navItems.map((item) => {
                const route = getRoute(item.key, currentLocale);
                const active = isActive(route);
                return (
                  <NavLink
                    key={item.key}
                    route={route}
                    className={`relative px-3 xl:px-5 py-2 xl:py-2.5 rounded-full text-xs xl:text-sm font-semibold transition-all duration-300 overflow-hidden group ${
                      active
                        ? "text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {/* Active background gradient */}
                    {active && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-full" />
                        <div className="absolute inset-0 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 blur-xl opacity-50" />
                      </>
                    )}

                    {/* Hover effect */}
                    {!active && (
                      <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/10 to-primary/0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    {/* Text */}
                    <span className="relative z-10 flex items-center gap-2">
                      {item.label}
                      {active && (
                        <div className="h-1.5 w-1.5 rounded-full bg-primary-foreground/80 animate-pulse" />
                      )}
                    </span>
                  </NavLink>
                );
              })}
            </nav>

            {/* Right Section */}
            <div className="flex items-center gap-2">
              <LanguageSwitcher />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden h-9 w-9"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Menu"
              >
                {mobileMenuOpen ? (
                  <X className="h-5 w-5" />
                ) : (
                  <Menu className="h-5 w-5" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-300"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer */}
          <div className="fixed top-0 right-0 h-full w-full bg-background border-l border-border/30 shadow-2xl z-50 lg:hidden transform transition-transform duration-300 ease-out translate-x-0">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-border/30">
              <Link
                href={`/${currentLocale}`}
                className="flex items-center"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Image
                  src="/images/logo.webp"
                  alt="Prof. Dr. Kadriye Ufuk Elgin Logo"
                  width={140}
                  height={38}
                  className="h-9 w-auto object-contain"
                />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="overflow-y-auto h-[calc(100vh-65px)]">
              <nav className="flex flex-col p-3 gap-0.5">
                {navItems.map((item) => {
                  const route = getRoute(item.key, currentLocale);
                  const active = isActive(route);
                  return (
                    <NavLink
                      key={item.key}
                      route={route}
                      className={`relative px-4 py-3 rounded-lg text-base font-medium transition-colors duration-200 ${
                        active
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted/30"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-full" />
                      )}
                      <span className="block">{item.label}</span>
                    </NavLink>
                  );
                })}
              </nav>

              {/* Language Switcher in Drawer */}
              <div className="p-4 border-t border-border/30 mt-2">
                <div className="flex gap-2">
                  {locales.map((locale) => {
                    const isActiveLocale = currentLocale === locale;
                    return (
                      <Button
                        key={locale}
                        variant={isActiveLocale ? "default" : "outline"}
                        size="sm"
                        onClick={() => {
                          window.location.href = `/${locale}${basePath}`;
                        }}
                        className={`flex-1 text-sm ${
                          isActiveLocale
                            ? "bg-primary text-primary-foreground"
                            : ""
                        }`}
                      >
                        {locale.toUpperCase()}
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* CSS Animations - Desktop only */}
      <style jsx>{`
        @keyframes gradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-gradient {
          animation: gradient 8s ease infinite;
        }

        .animate-shimmer {
          animation: shimmer 3s ease-in-out infinite;
        }
      `}</style>
    </>
  );
}

function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;
  const basePath = pathname?.replace(/^\/(tr|en)/, "") || "";

  const switchLocale = (locale: Locale) => {
    window.location.href = `/${locale}${basePath}`;
  };

  return (
    <div className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-muted/50 via-muted/40 to-muted/50 backdrop-blur-xl rounded-full p-1 border border-border/50 shadow-lg shadow-primary/5">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Button
            key={locale}
            variant="ghost"
            size="sm"
            onClick={() => switchLocale(locale)}
            className={`relative px-4 py-2 text-xs font-bold rounded-full transition-all duration-300 overflow-hidden ${
              isActive
                ? "text-primary-foreground shadow-md shadow-primary/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-full" />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/30 via-accent/30 to-primary/30 blur-md opacity-50" />
              </>
            )}
            <span className="relative z-10">{locale.toUpperCase()}</span>
          </Button>
        );
      })}
    </div>
  );
}
