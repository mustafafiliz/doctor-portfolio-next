import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { SpecialtiesList } from '@/components/specialties/SpecialtiesList';
import { getDictionary } from '../dictionaries';
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
    title: `${dict.specialties.title} - ${config.meta.siteName}`,
    description: `${dict.specialties.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function SpecialtiesPage() {
  return <SpecialtiesList />;
}

