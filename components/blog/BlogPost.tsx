'use client';

import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, ArrowLeft, Loader2 } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { getPublicBlogBySlug } from '@/lib/config';
import type { Blog } from '@/lib/types';

export function BlogPost({ slug, locale }: { slug: string; locale?: Locale }) {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const currentLocale = locale || (pathname?.split('/')[1] || 'tr') as Locale;

  const [post, setPost] = useState<Blog | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getPublicBlogBySlug(slug);
        if (data) {
          setPost(data);
        } else {
          setError(true);
        }
      } catch (err) {
        console.error('Blog yükleme hatası:', err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [slug]);

  if (isLoading) {
    return (
      <main className="container mx-auto px-4 pt-5 pb-16 md:pb-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="container mx-auto px-4 pt-5 pb-16 md:pb-24">
        <div className="mb-6 max-w-4xl mx-auto">
          <Link 
            href={`/${currentLocale}${getRoute('blog', currentLocale)}`}
            className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Tüm Blog Yazıları
          </Link>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Blog yazısı bulunamadı.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 pt-5 pb-16 md:pb-24">
      {/* Back Button */}
      <div className="mb-6 max-w-4xl mx-auto">
        <Link 
          href={`/${currentLocale}${getRoute('blog', currentLocale)}`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Tüm Blog Yazıları
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{post.title}</h2>
        
        {/* Featured Image */}
        <div className="mb-8">
          <div className="relative w-full h-64 md:h-96 rounded-sm shadow-lg overflow-hidden bg-muted">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-accent/10">
                <span className="text-2xl">📸</span>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        {post.excerpt && (
          <div className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">
            {post.excerpt}
          </div>
        )}

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Date */}
        <div className="mt-8 pt-8 border-t flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {t('published')}: {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </article>
    </main>
  );
}
