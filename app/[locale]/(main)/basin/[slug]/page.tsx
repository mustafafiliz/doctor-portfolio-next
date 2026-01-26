import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { PressDetail } from '@/components/press/PressDetail';
import { getDictionary } from '../../../dictionaries';
import { locales, type Locale } from '@/lib/i18n';
import { pressData } from '@/lib/pressData';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  const config = await getConfig();
  const dict = await getDictionary(validLocale);
  const item = pressData.find(p => p.slug === slug);

  if (!item) {
    return {
      title: `${dict.press.title} - ${config.meta.siteName}`,
    };
  }

  return {
    title: `${item.title} - ${dict.press.title} - ${config.meta.siteName}`,
    description: item.description || `${dict.press.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function PressDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  const item = pressData.find(p => p.slug === slug);

  if (!item) {
    notFound();
  }

  return <PressDetail slug={slug} currentLocale={validLocale} />;
}
