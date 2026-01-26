import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { PressSection } from '@/components/press/PressSection';
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
    title: `${dict.press.title} - ${config.meta.siteName}`,
    description: `${dict.press.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function PressPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  return <PressSection currentLocale={validLocale} />;
}
