import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { VideosSection } from '@/components/videos/VideosSection';
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
    title: `${dict.videos.title} - ${config.meta.siteName}`,
    description: `${dict.videos.title} - ${config.meta.siteName}`,
  };
}

import { VIDEOS_DATA } from '@/lib/data';

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  return <VideosSection initialVideos={VIDEOS_DATA} />;
}

