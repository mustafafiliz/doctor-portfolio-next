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
    
    const truncated = textContent.substring(0, 250);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  const displayDescription = aboutBio ? getBioSummary(aboutBio) : heroDescription;

  return (
    <section className="relative w-full min-h-[500px] lg:min-h-[600px]">
      <div className="flex flex-col lg:flex-row">
        {/* Image Section - Left - Full height, flush to edge */}
        {heroImage && (
          <div className="relative w-full lg:w-[45%] h-[400px] lg:h-auto lg:min-h-[600px]">
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
          className="w-full lg:w-[55%] flex items-center"
          style={{ backgroundColor: config.colors.primary + '10' }}
        >
          <div className="px-6 sm:px-10 lg:px-16 py-12 lg:py-16 max-w-2xl">
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

            {/* Description */}
            {displayDescription && (
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed mb-8">
                {displayDescription}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              {heroCta && heroCtaUrl && (
                <Link href={heroCtaUrl}>
                  <Button
                    size="lg"
                    className="h-12 px-8 text-base font-semibold transition-all duration-300 hover:opacity-90 w-full sm:w-auto"
                    style={{
                      backgroundColor: config.colors.primary,
                      color: 'white'
                    }}
                  >
                    {heroCta}
                  </Button>
                </Link>
              )}
              <Link href={`/${currentLocale}${getRoute('about', currentLocale)}`}>
                <Button
                  size="lg"
                  variant="outline"
                  className="h-12 px-8 text-base font-semibold border-2 transition-all duration-300 hover:bg-gray-900 hover:text-white hover:border-gray-900 w-full sm:w-auto"
                >
                  Hakkımda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
