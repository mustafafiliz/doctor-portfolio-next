import { notFound } from 'next/navigation';
import { getConfig, getPublicFAQs } from '@/lib/config';
import type { Metadata } from 'next';
import { FAQSection } from '@/components/faq/FAQSection';
import { getDictionary } from '../../dictionaries';
import { locales, type Locale } from '@/lib/i18n';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  const dict = await getDictionary(validLocale);
  const config = await getConfig();

  return {
    title: `${dict.faq.title} - ${config.meta.siteName}`,
    description: `${dict.faq.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function FAQPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const currentLocale = (locale || 'tr') as Locale;
  
  // Server-side'da FAQs'i fetch et
  const faqsData = await getPublicFAQs();
  const faqs = faqsData.data || [];
  const config = await getConfig();

  return (
    <FAQSection 
      initialFAQs={faqs}
      currentLocale={currentLocale}
      config={config}
    />
  );
}

