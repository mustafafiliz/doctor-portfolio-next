'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { ChevronRight } from 'lucide-react';
import specialtiesData from '@/data/specialties.json';
import { useEffect, useState } from 'react';

interface Config {
  colors: {
    primary: string;
    accent: string;
  };
}

export function SpecialtiesList() {
  const t = useTranslations('specialties');
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);

  const primaryColor = config?.colors?.primary || '#144793';

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {specialtiesData.specialties.map((specialty) => {
            const category = specialtiesData.categories.find(
              (c) => c.id === specialty.categoryId
            );
            
            return (
              <Link
                key={specialty.slug}
                href={`/${currentLocale}/${specialty.slug}`}
                className="group bg-white border border-gray-200 rounded-sm overflow-hidden hover:border-primary hover:shadow-lg transition-all"
              >
                {specialty.image && (
                  <div className="aspect-video relative overflow-hidden bg-gray-100">
                    <Image
                      src={specialty.image}
                      alt={specialty.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  {category && (
                    <span 
                      className="text-xs font-medium px-2 py-1 rounded-sm"
                      style={{ 
                        backgroundColor: `${primaryColor}15`,
                        color: primaryColor 
                      }}
                    >
                      {category.title}
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
      </Container>
    </div>
  );
}
