'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Autoplay from 'embla-carousel-autoplay';
import Image from 'next/image';
import { Container } from '@/components/Container';
import { ArrowRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPublicSpecialties } from '@/lib/config';
import type { Specialty } from '@/lib/types';

interface SpecialtiesSectionProps {
  initialSpecialties?: Specialty[];
  currentLocale?: Locale;
}

export function SpecialtiesSection({ 
  initialSpecialties, 
  currentLocale: propLocale 
}: SpecialtiesSectionProps = {} as SpecialtiesSectionProps) {
  const t = useTranslations('specialties');
  const pathname = usePathname();
  const currentLocale = propLocale || (pathname?.split('/')[1] || 'tr') as Locale;

  const [specialties, setSpecialties] = useState<Specialty[]>(initialSpecialties || []);
  const [isLoading, setIsLoading] = useState(!initialSpecialties);

  useEffect(() => {
    // Eğer initialSpecialties yoksa client-side fetch yap
    if (!initialSpecialties) {
      const fetchSpecialties = async () => {
        try {
          const data = await getPublicSpecialties();
          // Categories içindeki tüm specialties'i düzleştir
          const allSpecialties: Specialty[] = [];
          if (data.categories) {
            data.categories.forEach((category: { specialties?: Specialty[] }) => {
              if (category.specialties) {
                allSpecialties.push(...category.specialties);
              }
            });
          }
          setSpecialties(allSpecialties);
        } catch (error) {
          console.error('Uzmanlık yükleme hatası:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpecialties();
    }
  }, [initialSpecialties]);

  const plugin = Autoplay({
    delay: 4000,
    stopOnInteraction: false,
  });

  if (isLoading) {
    return (
      <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
        <Container className="relative z-10">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </Container>
      </section>
    );
  }

  if (specialties.length === 0) {
    return null; // Uzmanlık yoksa section'ı gösterme
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="w-full px-0 relative z-10">
        <Container className="mb-8 sm:mb-12">
          <div className="text-center">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
              {t('title')}
            </h2>
            <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
          </div>
        </Container>

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
            {specialties.map((specialty) => {
              return (
                <CarouselItem key={specialty._id} className="pl-2 sm:pl-4 basis-full sm:basis-1/2 md:basis-1/2 lg:basis-1/3 xl:basis-1/4">
                  <Link href={`/${currentLocale}/uzmanlik/${specialty.slug}`}>
                    <div className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block flex flex-col h-full">
                      {/* Image */}
                      <div className="relative overflow-hidden">
                        <div className="w-full h-52 relative bg-muted overflow-hidden">
                          {specialty.image ? (
                            <Image
                              src={specialty.image}
                              alt={specialty.title}
                              fill
                              className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                              unoptimized
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/10 to-accent/10">
                              <span className="text-primary font-semibold">{specialty.title.charAt(0)}</span>
                            </div>
                          )}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>
                      </div>
                      
                      {/* Content */}
                      <div className="p-4 sm:p-6 flex flex-col flex-1">
                        <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] group-hover:text-primary transition-colors duration-200">
                          {specialty.title}
                        </h2>
                        <p className="text-gray-600 line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed min-h-[3.5rem] sm:min-h-[4.5rem] flex-1">
                          {specialty.description}
                        </p>
                      </div>
                    </div>
                  </Link>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          
          <Container className="mt-6 sm:mt-8 flex justify-center gap-3 sm:gap-4">
            <CarouselPrevious className="relative static translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
            <CarouselNext className="relative static translate-y-0 h-8 w-8 sm:h-10 sm:w-10" />
          </Container>
        </Carousel>

        {/* Tümünü Gör Butonu */}
        <Container className="mt-6 sm:mt-8 text-center">
          <Link
            href={`/${currentLocale}${getRoute('specialties', currentLocale)}`}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Tümünü Gör
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </Container>
      </div>
    </section>
  );
}
