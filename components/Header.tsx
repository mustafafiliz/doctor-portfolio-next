"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, ChevronRight } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { useConfig } from "@/hooks/useConfig";
import { getRoute } from "@/lib/routes";
import { getPublicSpecialties } from "@/lib/config";
import type { SpecialtyCategory, Specialty } from "@/lib/types";

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { config } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [specialtiesOpen, setSpecialtiesOpen] = useState(false);
  const [mobileSpecialtiesOpen, setMobileSpecialtiesOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [specialtyCategories, setSpecialtyCategories] = useState<
    CategoryWithSpecialties[]
  >([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  // Uzmanlıkları kategorilere göre grupla
  const groupSpecialtiesByCategory = (
    categories: CategoryWithSpecialties[]
  ): CategoryWithSpecialties[] => {
    console.log(
      "🔄 [Header] groupSpecialtiesByCategory çağrıldı, kategoriler:",
      categories
    );

    // Kategorileri order'a göre sırala
    const sortedCategories = [...categories].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });
    console.log("📊 [Header] Sıralanmış kategoriler:", sortedCategories);

    // Her kategori içindeki uzmanlıkları da order'a göre sırala
    const result = sortedCategories.map((category) => {
      const sortedSpecialties = category.specialties
        ? [...category.specialties].sort((a, b) => {
            const orderA = a.order ?? 999;
            const orderB = b.order ?? 999;
            return orderA - orderB;
          })
        : [];

      console.log(
        `📁 [Header] Kategori "${category.title || category.name}":`,
        {
          categoryId: category._id,
          specialtiesCount: sortedSpecialties.length,
          specialties: sortedSpecialties
        }
      );

      return {
        ...category,
        specialties: sortedSpecialties
      };
    });

    console.log("✅ [Header] groupSpecialtiesByCategory sonucu:", result);
    return result;
  };

  // API'den uzmanlık verilerini çek
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        console.log("🔍 [Header] Uzmanlık verileri çekiliyor...");
        const data = await getPublicSpecialties();
        console.log("📦 [Header] API'den gelen veri:", data);
        console.log("📦 [Header] Data type:", typeof data);
        console.log("📦 [Header] Is Array:", Array.isArray(data));
        console.log("📦 [Header] Data.categories:", data.categories);
        console.log(
          "📦 [Header] Data.categories length:",
          data.categories?.length
        );

        // API direkt array döndürüyorsa veya categories içinde array varsa
        let categories: CategoryWithSpecialties[] = [];

        if (Array.isArray(data)) {
          // API direkt array döndürüyor
          console.log("✅ [Header] API direkt array döndürüyor");
          categories = data;
        } else if (data.categories && Array.isArray(data.categories)) {
          // API { categories: [...] } formatında döndürüyor
          console.log("✅ [Header] API categories wrapper içinde döndürüyor");
          categories = data.categories;
        } else {
          console.warn("⚠️ [Header] Beklenmeyen veri formatı:", data);
          categories = [];
        }

        console.log("📋 [Header] İşlenecek kategoriler:", categories);
        console.log("📋 [Header] Kategoriler length:", categories.length);

        // Kategorilere göre grupla ve sırala
        const groupedCategories = groupSpecialtiesByCategory(categories);
        console.log("✅ [Header] Gruplanmış kategoriler:", groupedCategories);
        console.log(
          "✅ [Header] Gruplanmış kategoriler length:",
          groupedCategories.length
        );

        setSpecialtyCategories(groupedCategories);
        console.log("✅ [Header] State güncellendi");
      } catch (error) {
        console.error("❌ [Header] Uzmanlık yükleme hatası:", error);
      } finally {
        setIsLoadingSpecialties(false);
        console.log("🏁 [Header] Loading tamamlandı");
      }
    };

    fetchSpecialties();
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setSpecialtiesOpen(false);
        setActiveCategory(null);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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
    { key: "home" as const, label: t("home"), hasDropdown: false },
    { key: "about" as const, label: t("about"), hasDropdown: false },
    { key: "specialties" as const, label: t("specialties"), hasDropdown: true },
    { key: "gallery" as const, label: t("gallery"), hasDropdown: false },
    { key: "contact" as const, label: t("contact"), hasDropdown: false },
    { key: "blog" as const, label: t("blog"), hasDropdown: false }
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
      <header className="sticky top-0 z-50 w-full border-y border-white">
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

        <div className="container mx-auto px-4 sm:px-6 relative z-10 h-14 sm:h-16 lg:h-18">
          <div className="flex h-full items-center justify-between">
            {/* Logo Section */}
            <Link href={`/${currentLocale}`} className="flex items-center">
              {config.site?.logo ? (
                <Image
                  src={config.site.logo}
                  alt={config.site.name || ""}
                  width={160}
                  height={44}
                  className="h-9 sm:h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              ) : (
                <Image
                  src="/images/logo.webp"
                  alt="Logo"
                  width={160}
                  height={44}
                  className="h-9 sm:h-10 lg:h-12 w-auto object-contain"
                  priority
                />
              )}
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 xl:gap-2 h-full">
              {navItems.map((item) => {
                const route = getRoute(item.key, currentLocale);
                const active = isActive(route);

                // Uzmanlıklar için dropdown
                if (item.hasDropdown && item.key === "specialties") {
                  return (
                    <div
                      key={item.key}
                      className="relative h-full"
                      ref={dropdownRef}
                    >
                      <button
                        onClick={() => {
                          setSpecialtiesOpen(!specialtiesOpen);
                          setActiveCategory(null);
                        }}
                        className={`relative px-4 xl:px-5 h-full flex items-center gap-1 text-sm xl:text-base font-semibold transition-all duration-300 ${
                          active || specialtiesOpen
                            ? "bg-primary text-white"
                            : "text-muted-foreground hover:text-foreground"
                        }`}
                      >
                        <span>{item.label}</span>
                        <ChevronDown
                          className={`h-3 w-3 transition-transform duration-200 ${
                            specialtiesOpen ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      {/* Dropdown Menu */}
                      {specialtiesOpen &&
                        !isLoadingSpecialties &&
                        (() => {
                          console.log("🎨 [Header] Dropdown render ediliyor");
                          console.log(
                            "🎨 [Header] isLoadingSpecialties:",
                            isLoadingSpecialties
                          );
                          console.log(
                            "🎨 [Header] specialtyCategories:",
                            specialtyCategories
                          );
                          console.log(
                            "🎨 [Header] specialtyCategories.length:",
                            specialtyCategories.length
                          );
                          return (
                            <div className="absolute top-full left-0 mt-2 bg-background border border-border/50 rounded-sm shadow-xl min-w-[220px] z-50">
                              {specialtyCategories.length > 0 ? (
                                <>
                                  {specialtyCategories.map((category) => (
                                    <div
                                      key={category._id}
                                      className="relative"
                                      onMouseEnter={() =>
                                        setActiveCategory(category._id)
                                      }
                                      onMouseLeave={() =>
                                        setActiveCategory(null)
                                      }
                                    >
                                      <Link
                                        href={`/${currentLocale}/uzmanlik/${category.slug}`}
                                        className="w-full flex items-center justify-between px-4 py-3 text-sm text-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                        onClick={() => {
                                          setSpecialtiesOpen(false);
                                          setActiveCategory(null);
                                        }}
                                      >
                                        <span>
                                          {category.title || category.name}
                                        </span>
                                        {category.specialties &&
                                          category.specialties.length > 0 && (
                                            <ChevronRight className="h-4 w-4" />
                                          )}
                                      </Link>

                                      {/* Sub-menu */}
                                      {activeCategory === category._id &&
                                        category.specialties &&
                                        category.specialties.length > 0 && (
                                          <div className="absolute left-full top-0 ml-0.5 bg-background border border-border/50 rounded-sm shadow-xl min-w-[200px]">
                                            {category.specialties.map(
                                              (specialty) => (
                                                <Link
                                                  key={specialty._id}
                                                  href={`/${currentLocale}/${specialty.slug}`}
                                                  className="block px-4 py-2.5 text-sm text-muted-foreground hover:bg-primary/10 hover:text-primary transition-colors"
                                                  onClick={() => {
                                                    setSpecialtiesOpen(false);
                                                    setActiveCategory(null);
                                                  }}
                                                >
                                                  {specialty.title}
                                                </Link>
                                              )
                                            )}
                                          </div>
                                        )}
                                    </div>
                                  ))}
                                  {/* Tümünü Gör linki */}
                                  <div className="border-t border-border/30">
                                    <Link
                                      href={`/${currentLocale}${route}`}
                                      className="block px-4 py-3 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                                      onClick={() => {
                                        setSpecialtiesOpen(false);
                                        setActiveCategory(null);
                                      }}
                                    >
                                      Tümünü Gör →
                                    </Link>
                                  </div>
                                </>
                              ) : (
                                <div className="px-4 py-3 text-sm text-muted-foreground">
                                  Henüz kategori eklenmemiş.
                                </div>
                              )}
                            </div>
                          );
                        })()}
                    </div>
                  );
                }

                return (
                  <NavLink
                    key={item.key}
                    route={route}
                    className={`relative px-4 xl:px-5 h-full flex items-center text-sm xl:text-base font-semibold transition-all duration-300 ${
                      active
                        ? "bg-primary text-white"
                        : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    {item.label}
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
                {config.site?.logo ? (
                  <Image
                    src={config.site.logo}
                    alt={config.site.name || ""}
                    width={140}
                    height={38}
                    className="h-9 w-auto object-contain"
                  />
                ) : (
                  <Image
                    src="/images/logo.webp"
                    alt="Logo"
                    width={140}
                    height={38}
                    className="h-9 w-auto object-contain"
                  />
                )}
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

                  // Uzmanlıklar için accordion
                  if (item.hasDropdown && item.key === "specialties") {
                    return (
                      <div key={item.key}>
                        <button
                          onClick={() =>
                            setMobileSpecialtiesOpen(!mobileSpecialtiesOpen)
                          }
                          className={`relative w-full px-4 py-3 rounded-sm text-base font-medium transition-colors duration-200 flex items-center justify-between ${
                            active || mobileSpecialtiesOpen
                              ? "text-primary bg-primary/10"
                              : "text-foreground hover:bg-muted/30"
                          }`}
                        >
                          {(active || mobileSpecialtiesOpen) && (
                            <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-sm" />
                          )}
                          <span>{item.label}</span>
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              mobileSpecialtiesOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>

                        {/* Mobile Accordion Content */}
                        {mobileSpecialtiesOpen && !isLoadingSpecialties && (
                          <div className="ml-4 mt-1 border-l border-border/30 pl-4">
                            {specialtyCategories.length > 0 ? (
                              <>
                                {specialtyCategories.map((category) => (
                                  <div key={category._id} className="mb-3">
                                    <Link
                                      href={`/${currentLocale}/uzmanlik/${category.slug}`}
                                      className="text-sm font-semibold text-foreground py-2 block hover:text-primary transition-colors"
                                      onClick={() => {
                                        setMobileMenuOpen(false);
                                        setMobileSpecialtiesOpen(false);
                                      }}
                                    >
                                      {category.title || category.name}
                                    </Link>
                                    {category.specialties &&
                                      category.specialties.length > 0 && (
                                        <div className="flex flex-col gap-1 pl-3 border-l border-border/30">
                                          {category.specialties.map(
                                            (specialty) => (
                                              <Link
                                                key={specialty._id}
                                                href={`/${currentLocale}/uzmanlik/${specialty.slug}`}
                                                className="text-sm text-muted-foreground hover:text-primary py-1.5 transition-colors"
                                                onClick={() => {
                                                  setMobileMenuOpen(false);
                                                  setMobileSpecialtiesOpen(
                                                    false
                                                  );
                                                }}
                                              >
                                                {specialty.title}
                                              </Link>
                                            )
                                          )}
                                        </div>
                                      )}
                                  </div>
                                ))}
                                {/* Tümünü Gör */}
                                <Link
                                  href={`/${currentLocale}${route}`}
                                  className="block text-sm font-medium text-primary py-2 border-t border-border/30 mt-2"
                                  onClick={() => {
                                    setMobileMenuOpen(false);
                                    setMobileSpecialtiesOpen(false);
                                  }}
                                >
                                  Tümünü Gör →
                                </Link>
                              </>
                            ) : (
                              <div className="text-sm text-muted-foreground py-2">
                                Henüz kategori eklenmemiş.
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    );
                  }

                  return (
                    <NavLink
                      key={item.key}
                      route={route}
                      className={`relative px-4 py-3 rounded-sm text-base font-medium transition-colors duration-200 ${
                        active
                          ? "text-primary bg-primary/10"
                          : "text-foreground hover:bg-muted/30"
                      }`}
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      {active && (
                        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-primary rounded-r-sm" />
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
    <div className="hidden lg:flex items-center gap-1 bg-gradient-to-r from-muted/50 via-muted/40 to-muted/50 backdrop-blur-xl rounded-sm p-1 border border-border/50 shadow-lg shadow-primary/5">
      {locales.map((locale) => {
        const isActive = currentLocale === locale;
        return (
          <Button
            key={locale}
            variant="ghost"
            size="sm"
            onClick={() => switchLocale(locale)}
            className={`relative px-4 py-2 text-xs font-bold rounded-sm transition-all duration-300 overflow-hidden ${
              isActive
                ? "text-primary-foreground shadow-md shadow-primary/30"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {isActive && (
              <>
                <div className="absolute inset-0 bg-gradient-to-r from-primary via-primary/90 to-accent rounded-sm" />
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
