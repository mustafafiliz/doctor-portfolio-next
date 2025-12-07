import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronRight } from 'lucide-react';
import { Container } from '@/components/Container';
import specialtiesData from '@/data/specialties.json';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  const category = specialtiesData.categories.find((c) => c.slug === slug);
  const config = await getConfig();

  if (!category) {
    return {
      title: `Uzmanlık Bulunamadı - ${config.meta.siteName}`,
    };
  }

  return {
    title: `${category.title} - ${config.meta.siteName}`,
    description: category.description,
  };
}

export async function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  
  for (const locale of locales) {
    for (const category of specialtiesData.categories) {
      params.push({ locale, slug: category.slug });
    }
  }
  
  return params;
}

export default async function SpecialtyCategoryPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  const config = await getConfig();
  
  const category = specialtiesData.categories.find((c) => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const specialties = specialtiesData.specialties.filter(
    (s) => s.categoryId === category.id
  );

  return (
    <div>
      {/* Breadcrumb Header */}
      <div 
        className="py-6 sm:py-8"
        style={{ backgroundColor: config.colors.primary }}
      >
        <Container>
          <nav className="flex items-center gap-2 text-sm text-white/80">
            <Link href={`/${locale}`} className="hover:text-white transition-colors">
              Anasayfa
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <Link href={`/${locale}/uzmanliklar`} className="hover:text-white transition-colors">
              Uzmanlıklar
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <span className="text-white font-medium">{category.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
            {category.title}
          </h1>
          {category.description && (
            <p className="text-white/80 mt-2 max-w-2xl">
              {category.description}
            </p>
          )}
        </Container>
      </div>

      {/* Specialties List */}
      <Container className="py-12">
        {specialties.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {specialties.map((specialty) => (
              <Link
                key={specialty.slug}
                href={`/${locale}/${specialty.slug}`}
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
                <div className="p-5">
                  <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
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
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Bu kategoride henüz içerik bulunmuyor.</p>
          </div>
        )}
      </Container>
    </div>
  );
}

