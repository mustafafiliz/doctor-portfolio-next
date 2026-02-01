import { notFound } from 'next/navigation';
import { getConfig, getPublicSpecialties } from '@/lib/config';
import type { Metadata } from 'next';
import { getDictionary } from '../../dictionaries';
import { locales, type Locale } from '@/lib/i18n';
import { SpecialtiesLayout } from '@/components/specialties/SpecialtiesLayout';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { type SpecialtyCategory, type Specialty } from '@/lib/types';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as Locale;

  if (!locales.includes(validLocale)) {
    notFound();
  }

  const dict = await getDictionary(validLocale);
  const config = await getConfig();

  return {
    title: `${dict.specialties.title} - ${config.meta.siteName}`,
    description: `${dict.specialties.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function SpecialtiesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = (locale || 'tr') as Locale;

  // Server-side'da specialties'i fetch et
  const specialtiesData = await getPublicSpecialties();
  const categories = (specialtiesData.categories || []) as CategoryWithSpecialties[];

  // Tüm kategorilerin içindeki specialties'leri topla
  const allSpecialties = categories.flatMap((cat) =>
    cat.specialties || []
  );

  return (
    <SpecialtiesLayout
      categories={categories}
      locale={validLocale}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {allSpecialties.map((specialty) => {
          const title = specialty.title;

          return (
            <Link
              key={specialty._id}
              href={`/${validLocale}/${specialty.slug}`}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all"
            >
              {specialty.image ? (
                <div className="aspect-video relative overflow-hidden bg-gray-100">
                  <Image
                    src={specialty.image}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl text-gray-300 font-bold">{title.charAt(0)}</span>
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {title}
                </h2>
                {specialty.description && (
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {specialty.description}
                  </p>
                )}
                <span className="inline-flex items-center gap-1 text-primary text-sm font-medium mt-4 group-hover:gap-2 transition-all">
                  İncele
                  <ChevronRight size={16} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </SpecialtiesLayout>
  );
}
