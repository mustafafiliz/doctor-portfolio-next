"use client";

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

  // Note: heroDescription and bio summary logic removed as per new layout requirements
  // focusing on title/subtitle and stats around the centered image.

  return (
    <section className="relative w-full bg-gray-100 overflow-hidden">
      <div className="container mx-auto px-4 h-full">
        <div className="flex flex-col lg:flex-row-reverse justify-between h-full pt-12 lg:pt-0">

          {/* Left: Title & Subtitle */}
          <div className="w-full lg:w-[50%] lg:pb-20 text-center lg:text-left z-10 mb-8 lg:mb-0 order-1 flex flex-col justify-center lg:pt-0">
            {heroTitle && (
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black leading-tight mb-6">
                Prof. Dr. <br />
                {heroTitle.replace("Prof. Dr.", "")}
              </h1>
            )}
            {heroSubtitle && (
              <p className="text-xl sm:text-2xl text-black/90 font-medium mb-10">
                {heroSubtitle}
              </p>
            )}

            {/* Right: Stats */}
            <div className="flex flex-row flex-wrap justify-center lg:justify-start gap-4 sm:gap-8 items-center lg:items-start text-black z-10 order-3 pb-12 lg:pb-0">
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-4xl font-bold mb-1 text-nowrap">10.000 +</div>
                <div className="text-black/80 text-sm sm:text-lg">Katarakt Ameliyatı</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-4xl font-bold mb-1 text-nowrap">5.000 +</div>
                <div className="text-black/80 text-sm sm:text-lg">Glokom Ameliyatı</div>
              </div>
              <div className="text-center lg:text-left">
                <div className="text-2xl sm:text-4xl font-bold mb-1 text-nowrap">30.000 +</div>
                <div className="text-black/80 text-sm sm:text-lg">Cerrahi Müdahale</div>
              </div>
            </div>
          </div>

          {/* Center: Image */}
          <div className="w-full lg:w-[50%] relative h-[300px] sm:h-[400px] lg:h-[550px] flex justify-center items-end order-2 lg:order-2 mt-auto">
            <div className="relative w-full h-full lg:-ml-40">
              <Image
                src="/images/icons/me-1.png"
                alt={heroTitle || ""}
                fill
                className="object-contain object-bottom"
                priority
                unoptimized
              />
            </div>
          </div>



        </div>
      </div>
    </section>
  );
}
