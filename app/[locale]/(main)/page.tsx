import { HeroCarousel } from "@/components/home/HeroCarousel";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { HomeFAQSection } from "@/components/home/FAQSection";
import { getConfig, getPublicFAQs, getPublicSpecialties } from "@/lib/config";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { Specialty, SpecialtyCategory } from "@/lib/types";

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

export default async function HomePage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale || 'tr') as Locale;
  
  // Server-side'da tüm verileri fetch et
  const faqsData = await getPublicFAQs();
  const faqs = (faqsData.data || []).slice(0, 4); // İlk 4 soruyu al
  
  const specialtiesData = await getPublicSpecialties();
  // Categories içindeki tüm specialties'i düzleştir
  const allSpecialties = specialtiesData.categories.flatMap(
    (category: SpecialtyCategory & { specialties?: Specialty[] }) => category.specialties || []
  );

  return (
    <div className="flex flex-col w-full">
      <HeroCarousel />
      <SpecialtiesSection 
        initialSpecialties={allSpecialties}
        currentLocale={currentLocale}
      />
      <HomeFAQSection faqs={faqs} />
    </div>
  );
}
