import { notFound } from 'next/navigation';
import { getConfig, getPublicBlogBySlug, getPublicAbout } from '@/lib/config';
import type { Metadata } from 'next';
import { BlogPost } from '@/components/blog/BlogPost';
import { getDictionary } from '../../../dictionaries';
import { locales, type Locale } from '@/lib/i18n';
import type { AboutSection } from '@/lib/types';

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

  // SSR: Blog post'u çek ve metadata için kullan
  const post = await getPublicBlogBySlug(slug);

  return {
    title: post ? `${post.title} - ${config.meta.siteName}` : `Blog - ${config.meta.siteName}`,
    description: post?.excerpt || config.meta.defaultDescription,
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { slug, locale } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  // SSR: Server-side'da blog post'u çek
  const post = await getPublicBlogBySlug(slug);
  const author = await getPublicAbout() as AboutSection | null;

  if (!post) {
    notFound();
  }

  return <BlogPost post={post} locale={validLocale} author={author} />;
}
