"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { useConfig } from "@/hooks/useConfig";
import { useState, useRef, useEffect } from "react";
import { Phone, MessageCircle } from "lucide-react";

interface QuickLinksProps {
  currentLocale?: Locale;
}

export function QuickLinks({ currentLocale: propLocale }: QuickLinksProps) {
  const pathname = usePathname();
  const currentLocale =
    propLocale || ((pathname?.split("/")[1] || "tr") as Locale);
  const { config } = useConfig();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const getWhatsappUrl = (phone?: string) => {
    if (!phone) return "#";
    let cleaned = phone.replace(/[^0-9]/g, "");
    // Fix: Remove extra 90 if present (e.g. 9090532... -> 90532...)
    if (cleaned.startsWith("9090")) {
      cleaned = cleaned.substring(2);
    }
    return `https://wa.me/${cleaned}`;
  };

  const whatsappUrl = getWhatsappUrl(config?.contact?.whatsapp);

  const links = [
    {
      icon: "/images/icons/stethoscope.png",
      title: "Randevu Talebi",
      lines: ["Randevu", "Talebi"],
      href: "#",
      isDropdown: true,
    },
    {
      icon: "/images/icons/makaleler.png",
      title: "Bilimsel Makaleler ve Yayınlar",
      lines: ["Bilimsel Makaleler", "ve Yayınlar"],
      href: `/${currentLocale}/makaleler`,
    },
    {
      icon: "/images/icons/youtube-1.svg",
      title: "Video İçerikler",
      lines: ["Video", "İçerikler"],
      href: `/${currentLocale}/videolar`,
    },
    {
      icon: "/images/icons/journalism_16067463.png",
      title: "Basından Haberler",
      lines: ["Basından", "Haberler"],
      href: `/${currentLocale}/basin`,
    },
  ];

  return (
    <section className="py-8 md:py-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {links.map((link, index) => {
            if (link.isDropdown) {
              return (
                <div
                  key={index}
                  ref={dropdownRef}
                  className="relative group flex flex-col items-center sm:block"
                >
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="w-full flex flex-row items-center justify-center text-left gap-3 lg:gap-4 hover:-translate-y-1 transition-transform duration-300 cursor-pointer"
                  >
                    <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                      <Image
                        src={link.icon}
                        alt={link.title}
                        width={48}
                        height={48}
                        className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110"
                      />
                    </div>
                    <div className="flex flex-col justify-center">
                      {link.lines.map((line, i) => (
                        <span
                          key={i}
                          className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors leading-tight"
                        >
                          {line}
                        </span>
                      ))}
                    </div>
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-xl shadow-xl border border-gray-100 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-2 space-y-1">
                        <Link
                          href="https://www.dunyagoz.com/tr/islemler/randevu-doktor?DoctorId=16594"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors group/item"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="p-2 bg-primary/10 rounded-full group-hover/item:bg-primary/20 transition-colors shrink-0">
                            <Phone className="w-5 h-5 text-primary" />
                          </div>
                          <span className="text-base font-semibold text-gray-900 group-hover/item:text-primary leading-tight">
                            Dünya Göz Hastanesi Randevu
                          </span>
                        </Link>

                        <Link
                          href={whatsappUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-3 p-4 rounded-lg hover:bg-[#25D366]/5 transition-colors group/item"
                          onClick={() => setIsDropdownOpen(false)}
                        >
                          <div className="p-2 bg-[#25D366]/10 rounded-full group-hover/item:bg-[#25D366]/20 transition-colors shrink-0">
                            <MessageCircle className="w-5 h-5 text-[#25D366]" />
                          </div>
                          <span className="text-base font-semibold text-gray-900 group-hover/item:text-[#25D366] leading-tight">
                            Prof. Dr. Ufuk Elgin’e WhatsApp ile Ulaş
                          </span>
                        </Link>
                      </div>
                    </div>
                  )}
                </div>
              );
            }

            return (
              <Link
                key={index}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="group flex flex-row items-center justify-center text-left gap-3 lg:gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="shrink-0 w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <Image
                    src={link.icon}
                    alt={link.title}
                    width={48}
                    height={48}
                    className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  {link.lines.map((line, i) => (
                    <span
                      key={i}
                      className="text-sm sm:text-base lg:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors leading-tight"
                    >
                      {line}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
