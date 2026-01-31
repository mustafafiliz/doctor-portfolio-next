'use client';

import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import Image from 'next/image';
import { Loader2 } from 'lucide-react';
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

  if (isLoading) {
    return (
      <section className="py-8 md:py-16 bg-white">
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
    <section className="pt-0 pb-0 bg-white relative">
      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Göz Hastalıkları Uzmanı Ankara
          </h2>
          <p className="text-gray-600 leading-relaxed text-lg">
            Ankara’da Göz Hastalıkları Uzmanı olarak kendi özel muayenehanemde aktif olarak görev yapmaktayım. Göz sağlığı alanında
            tanı, tedavi ve takip süreçlerinin yanı sıra, üveit, glokom, katarakt, retina hastalıkları ve diğer göz rahatsızlıklarıyla ilgileniyorum.
            Bilimsel ve etik ilkelere dayalı, hasta odaklı yaklaşımım ile akademik ve klinik tecrübemi birleştirerek hastalarıma güncel ve
            güvenilir sağlık hizmeti sunmaktayım.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {categories.slice(0, 4).map((category) => {
            const categoryTitle = category.title || category.name || '';

            return (
              <Link
                key={category._id}
                href={`/${currentLocale}/uzmanlik/${category.slug}`}
                className="flex flex-col group border border-gray-200 rounded-2xl px-6 py-6 bg-gray-50 hover:shadow-lg transition-all duration-300 cursor-pointer"
                title={categoryTitle}
              >
                <div className="flex items-center gap-4 mb-4">
                  <span className="shrink-0 relative w-[60px] h-[60px]">
                    <Image
                      src="/images/icons/icon-content.jpg"
                      alt={categoryTitle}
                      width={60}
                      height={60}
                      className="object-contain"
                    />
                  </span>
                  <strong className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors">
                    {categoryTitle}
                  </strong>
                </div>
                {category.description && (
                  <p className="text-gray-700 text-base leading-relaxed">
                    {category.description}
                  </p>
                )}
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
