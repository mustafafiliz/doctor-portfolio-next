"use client";

import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "@/components/I18nProvider";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, X, ChevronDown, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube, Mail } from "lucide-react";
import { useState, useEffect } from "react";
import { locales, type Locale } from "@/lib/i18n";
import { useConfig } from "@/hooks/useConfig";
import { getRoute } from "@/lib/routes";
import { getPublicSpecialties } from "@/lib/config";
import type { SpecialtyCategory, Specialty } from "@/lib/types";

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

// Telefon numarasını formatla
const formatPhone = (phone: string): string => {
  // Sadece rakamları al
  const digits = phone.replace(/\D/g, '');

  // Türk telefon formatı: +90 (5XX) XXX XX XX
  if (digits.length >= 10) {
    const countryCode = digits.startsWith('90') ? '+90' : (digits.startsWith('0') ? '+90' : '+90');
    const cleanDigits = digits.startsWith('90') ? digits.slice(2) : (digits.startsWith('0') ? digits.slice(1) : digits);

    if (cleanDigits.length >= 10) {
      return `${countryCode} (${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)} ${cleanDigits.slice(6, 8)} ${cleanDigits.slice(8, 10)}`;
    }
  }

  return phone;
};

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const { config } = useConfig();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileSpecialtiesOpen, setMobileSpecialtiesOpen] = useState(false);
  const [specialtyCategories, setSpecialtyCategories] = useState<
    CategoryWithSpecialties[]
  >([]);
  const [isLoadingSpecialties, setIsLoadingSpecialties] = useState(true);

  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  // Social media links - only show if URL exists, is not empty, and is not just a base domain
  const isValidSocialUrl = (url: string | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    const trimmed = url.trim();
    // Check if URL is just a base domain (e.g., "https://facebook.com/" or "https://www.facebook.com/")
    const baseDomains = [
      'facebook.com',
      'instagram.com',
      'linkedin.com',
      'twitter.com',
      'x.com',
      'youtube.com',
    ];
    try {
      const urlObj = new URL(trimmed);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      const pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash
      // If it's a base domain and has no meaningful path (just "/" or empty), it's invalid
      const isBaseDomain = baseDomains.some(domain => hostname === domain);
      if (isBaseDomain && (pathname === '' || pathname === '/')) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  const socialLinks = [
    { icon: Facebook, url: config.social?.facebook, label: 'Facebook' },
    { icon: Instagram, url: config.social?.instagram, label: 'Instagram' },
    { icon: Linkedin, url: config.social?.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: config.social?.twitter, label: 'Twitter' },
    { icon: Youtube, url: config.social?.youtube, label: 'YouTube' },
  ].filter(link => isValidSocialUrl(link.url));

  // Uzmanlıkları kategorilere göre grupla
  const groupSpecialtiesByCategory = (
    categories: CategoryWithSpecialties[]
  ): CategoryWithSpecialties[] => {
    const sortedCategories = [...categories].sort((a, b) => {
      const orderA = a.order ?? 999;
      const orderB = b.order ?? 999;
      return orderA - orderB;
    });

    return sortedCategories;
  };

  // API'den uzmanlık verilerini çek
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getPublicSpecialties();
        let categories: CategoryWithSpecialties[] = [];

        if (Array.isArray(data)) {
          categories = data;
        } else if (data.categories && Array.isArray(data.categories)) {
          categories = data.categories;
        } else {
          categories = [];
        }

        const groupedCategories = groupSpecialtiesByCategory(categories);
        setSpecialtyCategories(groupedCategories);
      } catch (error) {
        // Hata durumunda sessizce devam et
      } finally {
        setIsLoadingSpecialties(false);
      }
    };

    fetchSpecialties();
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

  const basePath = pathname?.replace(/^\/(tr|en)/, "") || "";

  const isActive = (route: string) => {
    if (route === "/") {
      return basePath === "" || basePath === "/";
    }
    return basePath.startsWith(route);
  };

  return (
    <>
      {/* Top Bar - Desktop Only */}
      <div className="hidden lg:block bg-[#0f0f1a] text-white border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-between h-10">
            {/* Left Side - Address & Languages */}
            <div className="flex items-center gap-6">
              {config.contact.address && (
                <div className="flex items-center gap-2 text-xs text-white/70">
                  <MapPin className="h-3.5 w-3.5 text-primary" />
                  <span className="truncate max-w-[300px]">{config.contact.address}</span>
                </div>
              )}
              {/* Language Switcher */}
              <div className="flex items-center gap-1 border-l border-white/20 pl-4">
                {locales.map((locale) => {
                  const isActiveLocale = currentLocale === locale;
                  return (
                    <button
                      key={locale}
                      onClick={() => {
                        window.location.href = `/${locale}${basePath}`;
                      }}
                      className={`flex items-center gap-1.5 px-2 py-1 text-xs transition-colors ${isActiveLocale
                        ? "text-white font-medium"
                        : "text-white/60 hover:text-white"
                        }`}
                    >
                      <span className="w-5 h-3.5 rounded-sm overflow-hidden bg-white/20 flex items-center justify-center text-[10px] font-bold">
                        {locale.toUpperCase()}
                      </span>
                      <span>{locale === 'tr' ? 'Türkçe' : 'English'}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Right Side - Phone, Social, Contact */}
            <div className="flex items-center gap-4">
              {/* Phone */}
              {config.contact.phone && (
                <a
                  href={`tel:${config.contact.phone}`}
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-primary transition-colors"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  {formatPhone(config.contact.phone)}
                </a>
              )}

              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div className="flex items-center gap-1 border-l border-white/20 pl-4">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a
                        key={index}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/70 hover:text-primary transition-colors"
                        aria-label={social.label}
                      >
                        <Icon className="h-3.5 w-3.5" />
                      </a>
                    );
                  })}
                </div>
              )}

              {/* Contact Button */}
              <Link
                href={`/${currentLocale}/iletisim`}
                className="bg-primary text-white text-xs font-medium px-4 py-1.5 rounded-sm hover:bg-primary/90 transition-colors"
              >
                İletişim
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 w-full bg-background border-b border-border/30 shadow-sm">
        <div className="container mx-auto px-4 sm:px-6 h-14 lg:h-16">
          <div className="flex h-full items-center justify-between">
            {/* Logo Section */}
            {config.site?.logo && (
              <Link href={`/${currentLocale}`} className="flex items-center shrink-0">
                <Image
                  src={config.site.logo}
                  alt={config.site.name || ""}
                  width={160}
                  height={44}
                  className="h-8 lg:h-10 w-auto object-contain"
                  priority
                />
              </Link>
            )}

            {/* Desktop Navigation - Kategoriler direkt gösteriliyor */}
            <nav className="hidden lg:flex items-center h-full">
              {/* Anasayfa */}
              <Link
                href={`/${currentLocale}`}
                className={`relative px-4 h-full flex items-center text-sm font-medium transition-all duration-200 border-b-2 ${isActive("/") && basePath === ""
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/50"
                  }`}
              >
                {t("home")}
              </Link>

              {/* Kategoriler - Direkt gösteriliyor */}
              {!isLoadingSpecialties && specialtyCategories.slice(0, 5).map((category) => (
                <Link
                  key={category._id}
                  href={`/${currentLocale}/uzmanlik/${category.slug}`}
                  className={`relative px-4 h-full flex items-center text-sm font-medium transition-all duration-200 border-b-2 ${isActive(`/uzmanlik/${category.slug}`)
                    ? "border-primary text-primary"
                    : "border-transparent text-foreground hover:text-primary hover:border-primary/50"
                    }`}
                >
                  {category.title || category.name}
                </Link>
              ))}

              {/* Galeri */}
              <Link
                href={`/${currentLocale}${getRoute("gallery", currentLocale)}`}
                className={`relative px-4 h-full flex items-center text-sm font-medium transition-all duration-200 border-b-2 ${isActive(getRoute("gallery", currentLocale))
                  ? "border-primary text-primary"
                  : "border-transparent text-foreground hover:text-primary hover:border-primary/50"
                  }`}
              >
                {t("gallery")}
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="flex items-center gap-2 lg:hidden">
              {/* Mobile Language Switcher */}
              <div className="flex items-center gap-0.5 bg-muted/50 rounded-sm p-0.5">
                {locales.map((locale) => {
                  const isActiveLocale = currentLocale === locale;
                  return (
                    <button
                      key={locale}
                      onClick={() => {
                        window.location.href = `/${locale}${basePath}`;
                      }}
                      className={`px-2 py-1 text-xs font-medium rounded-sm transition-colors ${isActiveLocale
                        ? "bg-primary text-white"
                        : "text-muted-foreground"
                        }`}
                    >
                      {locale.toUpperCase()}
                    </button>
                  );
                })}
              </div>

              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10"
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

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />

          <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-background border-l border-border shadow-2xl z-50 lg:hidden">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-border">
              {config.site?.logo ? (
                <Link
                  href={`/${currentLocale}`}
                  className="flex items-center"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Image
                    src={config.site.logo}
                    alt={config.site.name || ""}
                    width={120}
                    height={32}
                    className="h-8 w-auto object-contain"
                  />
                </Link>
              ) : (
                <div className="h-8" />
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-9 w-9"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>

            {/* Drawer Content */}
            <div className="overflow-y-auto h-[calc(100vh-65px)]">
              {/* Contact Info */}
              <div className="p-4 border-b border-border bg-muted/30">
                {config.contact.phone && (
                  <a
                    href={`tel:${config.contact.phone}`}
                    className="flex items-center gap-3 text-sm font-medium text-foreground mb-2"
                  >
                    <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Phone className="h-4 w-4 text-primary" />
                    </div>
                    {formatPhone(config.contact.phone)}
                  </a>
                )}
                {config.contact.email && (
                  <a
                    href={`mailto:${config.contact.email}`}
                    className="flex items-center gap-3 text-sm text-muted-foreground"
                  >
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center">
                      <Mail className="h-4 w-4" />
                    </div>
                    {config.contact.email}
                  </a>
                )}
              </div>

              <nav className="flex flex-col p-4 gap-1">
                {/* Anasayfa */}
                <Link
                  href={`/${currentLocale}`}
                  className={`px-4 py-3 rounded-sm text-base font-medium transition-colors ${isActive("/") && basePath === ""
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted/50"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("home")}
                </Link>

                {/* Uzmanlıklar Accordion */}
                <div>
                  <button
                    onClick={() => setMobileSpecialtiesOpen(!mobileSpecialtiesOpen)}
                    className={`w-full px-4 py-3 rounded-sm text-base font-medium transition-colors flex items-center justify-between ${mobileSpecialtiesOpen
                      ? "text-primary bg-primary/10"
                      : "text-foreground hover:bg-muted/50"
                      }`}
                  >
                    <span>{t("specialties")}</span>
                    <ChevronDown
                      className={`h-4 w-4 transition-transform duration-200 ${mobileSpecialtiesOpen ? "rotate-180" : ""
                        }`}
                    />
                  </button>

                  {mobileSpecialtiesOpen && !isLoadingSpecialties && (
                    <div className="ml-4 mt-2 border-l-2 border-primary/20 pl-4 space-y-1">
                      {specialtyCategories.length > 0 ? (
                        specialtyCategories.map((category) => (
                          <Link
                            key={category._id}
                            href={`/${currentLocale}/uzmanlik/${category.slug}`}
                            className="text-sm font-medium text-foreground py-2 block hover:text-primary transition-colors"
                            onClick={() => {
                              setMobileMenuOpen(false);
                              setMobileSpecialtiesOpen(false);
                            }}
                          >
                            {category.title || category.name}
                          </Link>
                        ))
                      ) : (
                        <div className="text-sm text-muted-foreground py-2">
                          Henüz kategori eklenmemiş.
                        </div>
                      )}
                    </div>
                  )}
                </div>

                {/* Galeri */}
                <Link
                  href={`/${currentLocale}${getRoute("gallery", currentLocale)}`}
                  className={`px-4 py-3 rounded-sm text-base font-medium transition-colors ${isActive(getRoute("gallery", currentLocale))
                    ? "text-primary bg-primary/10"
                    : "text-foreground hover:bg-muted/50"
                    }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("gallery")}
                </Link>

                {/* Contact Button */}
                <Link
                  href={`/${currentLocale}/iletisim`}
                  className="mt-4 bg-primary text-white text-center font-medium px-4 py-3 rounded-sm hover:bg-primary/90 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {t("contact")}
                </Link>
              </nav>

              {/* Social Media */}
              {socialLinks.length > 0 && (
                <div className="p-4 border-t border-border mt-auto">
                  <div className="flex justify-center gap-2">
                    {socialLinks.map((social, index) => {
                      const Icon = social.icon;
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-colors"
                          aria-label={social.label}
                        >
                          <Icon className="h-4 w-4" />
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
