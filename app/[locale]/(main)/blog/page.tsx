import { notFound } from 'next/navigation';
import { getConfig, getPublicBlogs } from '@/lib/config';
import type { Metadata } from 'next';
import { BlogList } from '@/components/blog/BlogList';
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
    title: `${dict.blog.title} - ${config.meta.siteName}`,
    description: `${dict.blog.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  // SSR: Server-side'da blog listesini çek
  const blogsData = await getPublicBlogs({ limit: 20 });
  const blogs = blogsData.data || [];

  return <BlogList initialBlogs={blogs} currentLocale={validLocale} />;
}
