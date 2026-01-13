"use client";

import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/useConfig";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { getRoute } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

interface HeroCarouselProps {
  aboutBio?: string | null;
  aboutImage?: string | null;
}

export function HeroCarousel({ aboutBio, aboutImage }: HeroCarouselProps) {
  const { config } = useConfig();
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  const heroTitle = config.hero?.title || "";
  const heroSubtitle = config.hero?.subtitle || "";
  const heroDescription = config.hero?.description || "";
  const heroCta = config.hero?.ctaText || "";
  const heroCtaUrl = config.hero?.ctaUrl || "";

  const heroImage = aboutImage || config.hero?.image || "";

  const getBioSummary = (bio: string | null | undefined): string => {
    if (!bio) return heroDescription;

    const textContent = bio.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();

    if (textContent.length <= 250) return textContent;

    const truncated = textContent.substring(0, 200);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  const displayDescription = aboutBio ? getBioSummary(aboutBio) : heroDescription;

  return (
    <section className="relative w-full">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Left - Full height, flush to edge */}
        {heroImage && (
          <div className="relative w-full lg:w-[45%] aspect-4/3">
            <Image
              src={heroImage}
              alt={heroTitle || ""}
              fill
              className="object-cover object-top"
              priority
              unoptimized={heroImage.startsWith("http")}
            />
          </div>
        )}

        {/* Content Section - Right - With background color */}
        <div
          className="w-full flex-1 flex items-center"
          style={{ backgroundColor: config.colors.primary + '10' }}
        >
          <div className="px-6 sm:px-10 lg:px-16 py-10 max-w-3xl">
            {/* Title */}
            {heroTitle && (
              <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-gray-900 leading-tight mb-4">
                {heroTitle}
              </h1>
            )}

            {/* Subtitle */}
            {heroSubtitle && (
              <p
                className="text-lg sm:text-xl lg:text-2xl font-semibold mb-6"
                style={{ color: config.colors.primary }}
              >
                {heroSubtitle}
              </p>
            )}


            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
              <div className="space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-bold text-gray-800"
                >
                  10.000 +
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  Katarakt Ameliyatı
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-bold text-gray-800"
                >
                  5.000 +
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  Glokom Ameliyatı
                </div>
              </div>
              <div className="space-y-1">
                <div
                  className="text-3xl sm:text-4xl font-bold text-gray-800"
                >
                  30.000 +
                </div>
                <div className="text-gray-700 text-sm sm:text-base">
                  Cerrahi Müdahale
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
