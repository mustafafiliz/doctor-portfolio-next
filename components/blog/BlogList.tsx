'use client';

import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';
import type { Blog } from '@/lib/types';

interface BlogListProps {
  initialBlogs: Blog[];
  currentLocale: Locale;
}

export function BlogList({ initialBlogs, currentLocale }: BlogListProps) {
  const t = useTranslations('blog');
  const posts = initialBlogs;

  if (posts.length === 0) {
    return (
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Henüz blog yazısı eklenmemiş.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {posts.map((post) => (
            <Link 
              key={post._id} 
              href={`/${currentLocale}${getRoute('blog', currentLocale)}/${post.slug}`}
              className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-52 relative bg-muted overflow-hidden">
                  {post.image ? (
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100">
                      <span className="text-gray-400 text-sm">Görsel yok</span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {new Date(post.createdAt).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed min-h-[3.5rem] sm:min-h-[4.5rem] flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-black group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform duration-200 mt-auto text-sm sm:text-base">
                  {t('readMore')}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 hidden group-hover:block transition-all duration-200 ml-1" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </Container>
  );
}
