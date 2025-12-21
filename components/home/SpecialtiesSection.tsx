'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { ArrowRight, Loader2, ChevronRight } from 'lucide-react';
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
    // Eğer initialCategories yoksa client-side fetch yap
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
    delay: 4000,
    stopOnInteraction: false,
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 relative z-10">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </div>
      </section>
    );
  }

  if (categories.length === 0) {
    return null; // Kategori yoksa section'ı gösterme
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        <div className="mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground">{t('subtitle')}</p>
          </div>
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
          <CarouselContent className="-ml-2 sm:-ml-4">
            {categories.map((category) => {
              return (
                <CarouselItem key={category._id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link href={`/${currentLocale}/uzmanlik/${category.slug}`}>
                    <div className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 h-full flex flex-col">
                      {/* Image */}
                      {category.image ? (
                        <div className="aspect-video relative overflow-hidden bg-gray-100">
                          <Image
                            src={category.image}
                            alt={category.title || category.name || ''}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                            unoptimized
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                          <span className="text-4xl text-primary/30">{(category.title || category.name || '').charAt(0)}</span>
                        </div>
                      )}
                      {/* Content */}
                      <div className="p-4 sm:p-6 flex flex-col h-full">
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 group-hover:text-primary transition-colors duration-200">
                          {category.title || category.name}
                        </h2>
                        {category.description && (
                          <p className="text-gray-600 line-clamp-3 text-xs sm:text-sm leading-relaxed flex-1 mb-3 sm:mb-4">
                            {category.description}
                          </p>
                        )}
                        <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-auto">
                          Devamını Oku
                          <ChevronRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </span>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <div className="mt-6 sm:mt-8 flex justify-center gap-3 sm:gap-4">
            <CarouselPrevious className="relative static translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
            <CarouselNext className="relative static translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
          </div>
        </Carousel>

        {/* Tümünü Gör Butonu */}
        <div className="mt-6 sm:mt-8 text-center">
          <Link
            href={`/${currentLocale}${getRoute('specialties', currentLocale)}`}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Tümünü Gör
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
