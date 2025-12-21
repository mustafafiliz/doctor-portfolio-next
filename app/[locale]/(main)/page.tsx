import { HeroCarousel } from "@/components/home/HeroCarousel";
import { QuickLinks } from "@/components/home/QuickLinks";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { PopularContents } from "@/components/home/PopularContents";
import { HomeFAQSection } from "@/components/home/FAQSection";
import { getConfig, getPublicFAQs, getPublicSpecialties, getPublicAbout } from "@/lib/config";
import type { Metadata } from "next";
import type { Locale } from "@/lib/i18n";
import type { Specialty, SpecialtyCategory, AboutSection } from "@/lib/types";

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
  // Sadece kategorileri gönder
  const categories = specialtiesData.categories || [];

  // Hakkımızda verisini çek
  const about = await getPublicAbout() as AboutSection | null;

  return (
    <div className="flex flex-col w-full max-w-full overflow-x-hidden">
      <HeroCarousel aboutBio={about?.bio} aboutImage={about?.image} />
      <QuickLinks currentLocale={currentLocale} />
      <SpecialtiesSection 
        initialCategories={categories}
        currentLocale={currentLocale}
      />
      <PopularContents 
        categories={categories}
        currentLocale={currentLocale}
      />
      <HomeFAQSection faqs={faqs} />
    </div>
  );
}
