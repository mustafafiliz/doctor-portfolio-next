'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Calendar, ChevronRight } from 'lucide-react';
import { pressData, type PressItem } from '@/lib/pressData';

interface PressSectionProps {
  currentLocale?: string;
}

export function PressSection({ currentLocale }: PressSectionProps) {
  const t = useTranslations('press');

  const newsItems = pressData.filter(item => item.type === 'news');
  const interviewItems = pressData.filter(item => item.type === 'interview');
  const tvItems = pressData.filter(item => item.type === 'tv');

  const renderPressCard = (item: PressItem) => {
    const detailUrl = `/${currentLocale || 'tr'}/basin/${item.slug}`;
    
    return (
      <Link
        key={item.id}
        href={detailUrl}
        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 block"
      >
        {item.image && (
          <div className="relative w-full h-48 overflow-hidden">
            <Image
              src={item.image}
              alt={item.title}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-6">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <Calendar className="w-4 h-4" />
            <span>{item.date}</span>
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
          <p className="text-gray-600 mb-3">{item.source}</p>
          {item.description && (
            <p className="text-gray-700 text-sm mb-4 line-clamp-3">{item.description}</p>
          )}
          <span className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm">
            {t('readMore')}
            <ChevronRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    );
  };

  return (
    <section className="py-12 md:py-16 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Header */}
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h1>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Haber Linkleri */}
        {newsItems.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('newsLinks')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {newsItems.map(renderPressCard)}
            </div>
          </div>
        )}

        {/* Röportajlar */}
        {interviewItems.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('interviews')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {interviewItems.map(renderPressCard)}
            </div>
          </div>
        )}

        {/* TV Programları */}
        {tvItems.length > 0 && (
          <div className="mb-16">
            <div className="mb-8">
              <h2 className="text-3xl font-bold text-gray-900">{t('tvPrograms')}</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {tvItems.map(renderPressCard)}
            </div>
          </div>
        )}

        {/* Eğer hiç içerik yoksa */}
        {pressData.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">İçerik yakında eklenecektir.</p>
          </div>
        )}
      </div>
    </section>
  );
}
