"use client";

import { useTranslations } from "@/components/I18nProvider";
import { Button } from "@/components/ui/button";
import { useConfig } from "@/hooks/useConfig";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { getRoute } from "@/lib/routes";
import { Container } from "@/components/Container";

export function HeroCarousel() {
  const t = useTranslations("home");
  const { config } = useConfig();
  const pathname = usePathname();
  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  return (
    <section className="relative w-full overflow-hidden bg-gradient-to-br from-background via-muted/20 to-background">
      <Container className="py-8 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
          {/* Image Section - Left */}
          <div className="relative w-full order-2 lg:order-1">
            <div
              className="relative w-full ml-0 rounded-lg overflow-hidden"
              style={{ aspectRatio: "290/362" }}
            >
              <Image
                src="/images/me.jpg"
                alt="Prof. Dr. Kadriye Ufuk Elgin"
                fill
                className="object-contain object-left"
                priority
              />
              {/* Decorative gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
            </div>

            {/* Floating decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 sm:w-24 sm:h-24 bg-primary/10 rounded-full blur-2xl animate-float hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-24 h-24 sm:w-32 sm:h-32 bg-accent/10 rounded-full blur-2xl animate-float-delayed hidden md:block" />
          </div>

          {/* Content Section - Right */}
          <div className="order-1 lg:order-2 space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
              <span className="block animate-fade-in-up">
                {t("hero.title")}
              </span>
              <span className="block text-2xl sm:text-3xl md:text-4xl mt-2 sm:mt-3 font-light text-primary">
                {t("hero.subtitle")}
              </span>
            </h1>

            {/* Summary */}
            <p className="text-sm sm:text-base md:text-lg text-muted-foreground leading-relaxed animate-fade-in-up delay-200">
              {t("summary")}
            </p>

            {/* CTA Button */}
            <div className="pt-2 sm:pt-4 animate-fade-in-up delay-300">
              <Link
                href={`/${currentLocale}${getRoute("about", currentLocale)}`}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="group h-12 sm:h-14 px-6 sm:px-8 text-base sm:text-lg font-semibold border-2 transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-white w-full sm:w-auto"
                  style={{
                    borderColor: config.colors.primary,
                    color: config.colors.primary
                  }}
                >
                  {t("hero.learnMore")}
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
