"use client";

import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/useConfig";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Container } from "@/components/Container";
import { getRoute } from "@/lib/routes";
import type { Locale } from "@/lib/i18n";

interface HeroCarouselProps {
  aboutBio?: string | null;
}

export function HeroCarousel({ aboutBio }: HeroCarouselProps) {
  const { config } = useConfig();
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  // NO FALLBACK VALUES - Only use API data
  const heroTitle = config.hero?.title || "";
  const heroSubtitle = config.hero?.subtitle || "";
  const heroDescription = config.hero?.description || "";
  const heroImage = config.hero?.image || "";
  const heroCta = config.hero?.ctaText || "";
  const heroCtaUrl = config.hero?.ctaUrl || "";

  // Hakkımızda bio'sundan özet çıkar (HTML tag'lerini temizle ve ilk 200 karakteri al)
  const getBioSummary = (bio: string | null | undefined): string => {
    if (!bio) return heroDescription;
    
    // HTML tag'lerini temizle
    const textContent = bio.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').trim();
    
    // İlk 200 karakteri al ve son kelimeyi tamamla
    if (textContent.length <= 200) return textContent;
    
    const truncated = textContent.substring(0, 200);
    const lastSpace = truncated.lastIndexOf(' ');
    return lastSpace > 0 ? truncated.substring(0, lastSpace) + '...' : truncated + '...';
  };

  // Öncelik sırası: Hakkımızda bio > Hero description
  const displayDescription = aboutBio ? getBioSummary(aboutBio) : heroDescription;

  return (
    <section className="relative w-full max-w-full overflow-x-hidden from-background via-muted/20 to-background">
      <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Image Section - Left */}
          {heroImage && (
            <div className="relative w-full order-2 lg:order-1">
              <div
                className="relative w-full ml-0 rounded-sm overflow-hidden"
                style={{ aspectRatio: "290/362" }}
              >
                <Image
                  src={heroImage}
                  alt={heroTitle || ""}
                  fill
                  className="object-contain object-left"
                  priority
                  unoptimized={heroImage.startsWith("http")}
                />
                {/* Decorative gradient overlay */}
                <div className="absolute inset-0 from-primary/5 via-transparent to-accent/5 pointer-events-none" />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-sm blur-2xl animate-float hidden md:block" />
              <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-accent/10 rounded-sm blur-2xl animate-float-delayed hidden md:block" />
            </div>
          )}

          {/* Content Section - Right */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Title */}
            {heroTitle && (
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground leading-tight">
                <span className="block animate-fade-in-up">{heroTitle}</span>
                {heroSubtitle && (
                  <span className="block text-base sm:text-lg md:text-xl lg:text-2xl mt-2 sm:mt-3 font-semibold text-primary">
                    {heroSubtitle}
                  </span>
                )}
              </h1>
            )}

            {/* Summary */}
            {displayDescription && (
              <p className="text-xs sm:text-sm md:text-base text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
                {displayDescription}
              </p>
            )}

            {/* CTA Buttons */}
            <div className="pt-2 sm:pt-4 animate-fade-in-up delay-300 flex flex-col sm:flex-row gap-3 sm:gap-4">
              {heroCta && heroCtaUrl && (
                <Link href={heroCtaUrl}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold border-2 transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white w-full sm:w-auto"
                    style={{
                      borderColor: config.colors.primary,
                      color: config.colors.primary
                    }}
                  >
                    {heroCta}
                  </Button>
                </Link>
              )}
              <Link href={`/${currentLocale}${getRoute('about', currentLocale)}`}>
                <Button
                  size="lg"
                  className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold transition-all duration-300 hover:scale-105 w-full sm:w-auto"
                  style={{
                    backgroundColor: config.colors.primary,
                    color: 'white'
                  }}
                >
                  Hakkımda
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </Container>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 1s ease-out forwards;
        }

        .delay-200 {
          animation-delay: 0.2s;
          opacity: 0;
        }

        .delay-300 {
          animation-delay: 0.4s;
          opacity: 0;
        }

        .animate-float {
          animation: float 6s ease-in-out infinite;
        }

        .animate-float-delayed {
          animation: float 8s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
