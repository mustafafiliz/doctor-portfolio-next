import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getPublicCategoryBySlug, getPublicSpecialties, getConfig } from '@/lib/config';
import type { SpecialtyCategory, Specialty } from '@/lib/types';
import type { Metadata } from 'next';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig();

  // Sadece kategoriyi kontrol et (specialty'ler artık /[slug] route'unda)
  const category = await getPublicCategoryBySlug(slug);
  if (category) {
    return {
      title: `${category.title || category.name} - ${config.meta.siteName}`,
      description: category.description || config.meta.defaultDescription,
    };
  }

  return {
    title: `Sayfa Bulunamadı - ${config.meta.siteName}`,
  };
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const currentLocale = (locale || 'tr') as Locale;
  const config = await getConfig();

  // Sadece kategoriyi kontrol et (specialty'ler artık /[slug] route'unda)
  const categoryData = await getPublicCategoryBySlug(slug);

  if (!categoryData) {
    notFound();
  }

  // Kategori bulundu, içindeki specialty'leri de çek
  const allSpecialties = await getPublicSpecialties();
  const categorySpecialties =
    allSpecialties.categories.find((cat: SpecialtyCategory & { specialties?: Specialty[] }) => cat._id === categoryData._id)?.specialties || [];

  const category: CategoryWithSpecialties = {
    ...categoryData,
    specialties: categorySpecialties,
  };

  const primaryColor = config.colors.primary;

  // Kategori sayfası
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
              <Link
                href={`/${currentLocale}/uzmanliklar`}
                className="hover:text-white transition-colors"
              >
                Uzmanlıklar
              </Link>
              <ChevronRight size={14} className="text-white/50" />
              <span className="text-white font-medium">{category.title || category.name}</span>
            </nav>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mt-3">
              {category.title || category.name}
            </h1>
            {category.description && (
              <p className="text-white/80 mt-2 max-w-2xl">{category.description}</p>
            )}
          </Container>
        </div>

        {/* Specialties List */}
        <Container className="py-12">
          {category.specialties && category.specialties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.specialties.map((specialty) => (
                <Link
                  key={specialty._id}
                  href={`/${currentLocale}/${specialty.slug}`}
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
                  <div className="p-5">
                    <h2 className="text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors">
                      {specialty.title}
                    </h2>
                    {specialty.description && (
                      <p className="text-gray-600 text-sm mt-2 line-clamp-2">
                        {specialty.description}
                      </p>
                    )}
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





