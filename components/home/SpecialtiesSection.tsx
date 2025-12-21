'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPublicSpecialties } from '@/lib/config';
import type { SpecialtyCategory } from '@/lib/types';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: any[];
}

interface SpecialtiesSectionProps {
  initialCategories?: CategoryWithSpecialties[];
  currentLocale?: Locale;
}

export function SpecialtiesSection({ 
  initialCategories, 
  currentLocale: propLocale 
}: SpecialtiesSectionProps = {} as SpecialtiesSectionProps) {
  const t = useTranslations('specialties');
  const pathname = usePathname();
  const currentLocale = propLocale || (pathname?.split('/')[1] || 'tr') as Locale;

  const [categories, setCategories] = useState<CategoryWithSpecialties[]>(initialCategories || []);
  const [isLoading, setIsLoading] = useState(!initialCategories);

  useEffect(() => {
    if (!initialCategories) {
      const fetchSpecialties = async () => {
        try {
          const data = await getPublicSpecialties();
          if (data.categories && Array.isArray(data.categories)) {
            setCategories(data.categories);
          }
        } catch (error) {
          // Hata durumunda sessizce devam et
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpecialties();
    }
  }, [initialCategories]);

  const plugin = Autoplay({
    delay: 5000,
    stopOnInteraction: false,
  });

  if (isLoading) {
    return (
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-white relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('title')}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            {t('subtitle')}
          </p>
        </div>

        {/* Carousel */}
        <Carousel
          plugins={[plugin]}
          className="w-full"
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselContent className="-ml-4">
            {categories.map((category) => {
              const categoryTitle = category.title || category.name || '';
              
              return (
                <CarouselItem key={category._id} className="pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
                  <Link href={`/${currentLocale}/uzmanlik/${category.slug}`} className="block h-full">
                    <div className="group relative bg-white rounded-sm border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
                      {/* Image Section */}
                      <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                        {category.image ? (
                          <Image
                            src={category.image}
                            alt={categoryTitle}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            unoptimized
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center">
                            <span className="text-6xl font-bold text-primary/20">{categoryTitle.charAt(0)}</span>
                          </div>
                        )}
                      </div>

                      {/* Content Section */}
                      <div className="p-5">
                        {/* Title */}
                        <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                          {categoryTitle}
                        </h3>

                        {/* Description */}
                        {category.description && (
                          <p className="text-gray-600 text-sm leading-relaxed line-clamp-2 mb-3">
                            {category.description}
                          </p>
                        )}

                        {/* Link Arrow */}
                        <span className="inline-flex items-center gap-2 text-primary font-medium text-sm">
                          Devamını Oku
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="mt-8 flex justify-center gap-4">
            <CarouselPrevious className="relative static translate-y-0 h-10 w-10 border-2 border-primary text-primary hover:bg-primary hover:text-white" />
            <CarouselNext className="relative static translate-y-0 h-10 w-10 border-2 border-primary text-primary hover:bg-primary hover:text-white" />
          </div>
        </Carousel>

        {/* View All Button */}
        <div className="mt-10 text-center">
          <Link
            href={`/${currentLocale}${getRoute('specialties', currentLocale)}`}
            className="inline-flex items-center gap-2 px-8 py-3 rounded-sm bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
          >
            Tümünü Göster
            <ArrowRight className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
