import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { GallerySection } from '@/components/gallery/GallerySection';
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
    title: `${dict.gallery.title} - ${config.meta.siteName}`,
    description: `${dict.gallery.title} - ${config.meta.siteName}`,
  };
}

export default async function GalleryPage() {
  return <GallerySection />;
}

