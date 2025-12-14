'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { ChevronRight, Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPublicSpecialties } from '@/lib/config';
import { useConfig } from '@/hooks/useConfig';
import type { Specialty, SpecialtyCategory } from '@/lib/types';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

interface SpecialtiesListProps {
  initialCategories?: CategoryWithSpecialties[];
  currentLocale?: Locale;
  config?: {
    colors: {
      primary: string;
    };
  };
}

export function SpecialtiesList({ 
  initialCategories, 
  currentLocale: propLocale,
  config: propConfig 
}: SpecialtiesListProps = {} as SpecialtiesListProps) {
  const t = useTranslations('specialties');
  const pathname = usePathname();
  const currentLocale = propLocale || (pathname?.split('/')[1] || 'tr') as Locale;
  const { config: contextConfig } = useConfig();
  const config = propConfig || contextConfig;
  
  const [categories, setCategories] = useState<CategoryWithSpecialties[]>(initialCategories || []);
  const [isLoading, setIsLoading] = useState(!initialCategories);

  useEffect(() => {
    // Eğer initialCategories yoksa client-side fetch yap
    if (!initialCategories) {
      const fetchSpecialties = async () => {
        try {
          const data = await getPublicSpecialties();
          setCategories(data.categories || []);
        } catch (error) {
          console.error('Uzmanlık yükleme hatası:', error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchSpecialties();
    }
  }, [initialCategories]);

  const primaryColor = config.colors.primary;

  // Tüm uzmanlıkları düzleştir
  const allSpecialties: (Specialty & { categoryName?: string })[] = [];
  categories.forEach((category) => {
    if (category.specialties) {
      category.specialties.forEach((specialty) => {
        allSpecialties.push({
          ...specialty,
          categoryName: category.name
        });
      });
    }
  });

  if (isLoading) {
    return (
      <div>
        <div 
          className="py-6 sm:py-8"
          style={{ backgroundColor: primaryColor }}
        >
          <Container>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              {t('title')}
            </h1>
          </Container>
        </div>
        <Container className="py-12">
          <div className="flex items-center justify-center min-h-[300px]">
            <Loader2 className="w-8 h-8 animate-spin text-primary" />
          </div>
        </Container>
      </div>
    );
  }

  return (
    <div>
      {/* Breadcrumb Header */}
      <div 
        className="py-6 sm:py-8"
        style={{ backgroundColor: primaryColor }}
      >
        <Container>
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link href={`/${currentLocale}`} className="hover:text-white transition-colors">
              Anasayfa
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <span className="text-white font-medium">Uzmanlıklar</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            {t('title')}
          </h1>
          <p className="text-white/80 mt-2">
            {t('subtitle')}
          </p>
        </Container>
      </div>

      {/* Specialties Grid */}
      <Container className="py-12">
        {allSpecialties.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz uzmanlık eklenmemiş.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allSpecialties.map((specialty) => {
              return (
                <Link
                  key={specialty._id}
                  href={`/${currentLocale}/uzmanlik/${specialty.slug}`}
                  className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-primary hover:shadow-lg transition-all"
                >
                  {specialty.image ? (
                    <div className="aspect-video relative overflow-hidden bg-gray-100">
                      <Image
                        src={specialty.image}
                        alt={specialty.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                        unoptimized
                      />
                    </div>
                  ) : (
                    <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center">
                      <span className="text-4xl text-primary/30">{specialty.title.charAt(0)}</span>
                    </div>
                  )}
                  <div className="p-4">
                    {specialty.categoryName && (
                      <span 
                        className="text-xs font-medium px-2 py-1 rounded-sm"
                        style={{ 
                          backgroundColor: `${primaryColor}15`,
                          color: primaryColor 
                        }}
                      >
                        {specialty.categoryName}
                      </span>
                    )}
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors mt-3">
                      {specialty.title}
                    </h2>
                    <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                      {specialty.description}
                    </p>
                    <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4">
                      Devamını Oku
                      <ChevronRight size={16} />
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </Container>
    </div>
  );
}
