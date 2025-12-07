import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { HomeFAQSection } from "@/components/home/FAQSection";
import { getConfig } from "@/lib/config";
import type { Metadata } from "next";

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const config = await getConfig();

  return {
    title: config.meta.defaultTitle,
    description: config.meta.defaultDescription,
    keywords: config.meta.defaultKeywords
  };
}

export default async function HomePage() {
  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <SpecialtiesSection />
      <HomeFAQSection />
    </div>
  );
}
