'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, ExternalLink, Video, FileText } from 'lucide-react';
import { Container } from '@/components/Container';
import { pressData, type PressItem } from '@/lib/pressData';
import { type Locale } from '@/lib/i18n';

interface PressDetailProps {
  slug: string;
  currentLocale: Locale;
}

export function PressDetail({ slug, currentLocale }: PressDetailProps) {
  const t = useTranslations('press');
  
  const item = pressData.find(p => p.slug === slug);

  if (!item) {
    return (
      <Container className="py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">İçerik Bulunamadı</h1>
          <Link 
            href={`/${currentLocale}/basin`} 
            className="text-primary hover:underline"
          >
            Basından Haberler sayfasına dön
          </Link>
        </div>
      </Container>
    );
  }

  const getTypeIcon = () => {
    switch (item.type) {
      case 'tv':
        return <Video className="w-6 h-6" />;
      case 'interview':
        return <FileText className="w-6 h-6" />;
      default:
        return <ExternalLink className="w-6 h-6" />;
    }
  };

  const getTypeLabel = () => {
    switch (item.type) {
      case 'tv':
        return t('tvPrograms');
      case 'interview':
        return t('interviews');
      default:
        return t('newsLinks');
    }
  };

  return (
    <>
      {/* Breadcrumb Header */}
      <section className="relative py-6 sm:py-8 md:py-10 bg-gradient-to-r from-primary to-primary/90">
        <Container>
          <div className="text-white">
            <div className="flex items-center gap-2 text-sm text-white/80 mb-2">
              <Link href={`/${currentLocale}`} className="hover:text-white">
                Ana Sayfa
              </Link>
              <span>-</span>
              <Link href={`/${currentLocale}/basin`} className="hover:text-white">
                Basından Haberler
              </Link>
              <span>-</span>
              <span>{getTypeLabel()}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {item.title}
            </h1>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Container className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <Link
            href={`/${currentLocale}/basin`}
            className="inline-flex items-center gap-2 text-gray-600 hover:text-primary mb-8 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Geri Dön</span>
          </Link>

          {/* Main Content */}
          <article className="bg-white rounded-lg shadow-lg overflow-hidden">
            {/* Image */}
            {item.image && (
              <div className="relative w-full h-64 md:h-96 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
              </div>
            )}

            <div className="p-6 md:p-8">
              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-4 mb-6 pb-6 border-b">
                <div className="flex items-center gap-2 text-gray-600">
                  {getTypeIcon()}
                  <span className="font-semibold">{getTypeLabel()}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Calendar className="w-4 h-4" />
                  <span>{t('publishedDate')}: {item.date}</span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{t('source')}: </span>
                  {item.source}
                </div>
              </div>

              {/* Title */}
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                {item.title}
              </h2>

              {/* Description */}
              {item.description && (
                <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                  {item.description}
                </p>
              )}

              {/* Full Content */}
              {item.fullContent && (
                <div className="prose prose-lg max-w-none mb-8">
                  <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {item.fullContent}
                  </div>
                </div>
              )}

              {/* External Link Button */}
              {item.externalLink && (
                <div className="mt-8 pt-6 border-t">
                  <Link
                    href={item.externalLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors font-semibold"
                  >
                    {item.type === 'tv' ? (
                      <>
                        <Video className="w-5 h-5" />
                        {t('goToPress')} - {t('watchVideo')}
                      </>
                    ) : (
                      <>
                        <ExternalLink className="w-5 h-5" />
                        {t('goToPress')} - {t('viewArticle')}
                      </>
                    )}
                  </Link>
                </div>
              )}
            </div>
          </article>
        </div>
      </Container>
    </>
  );
}
