import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft } from 'lucide-react';
import { getPublicSpecialtyBySlug, getPublicCategoryBySlug, getPublicSpecialties, getConfig } from '@/lib/config';
import type { Specialty, SpecialtyCategory } from '@/lib/types';
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

  // Önce specialty'yi kontrol et
  const specialty = await getPublicSpecialtyBySlug(slug);
  if (specialty) {
    return {
      title: `${specialty.title} - ${config.meta.siteName}`,
      description: specialty.description || config.meta.defaultDescription,
    };
  }

  // Specialty bulunamadı, kategoriyi kontrol et
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

export default async function SpecialtyOrCategoryPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const currentLocale = (locale || 'tr') as Locale;
  const config = await getConfig();

  // Önce specialty'yi kontrol et
  let specialty: Specialty | null = null;
  let category: CategoryWithSpecialties | null = null;

  specialty = await getPublicSpecialtyBySlug(slug);

  if (specialty) {
    // Specialty bulundu
    // Eğer specialty'de category yoksa, kategoriyi bul
    if (!specialty.category) {
      const allSpecialties = await getPublicSpecialties();
      
      // categoryId varsa onu kullan
      if (specialty.categoryId) {
        const foundCategory = allSpecialties.categories.find(
          (cat: SpecialtyCategory & { specialties?: Specialty[] }) => cat._id === specialty!.categoryId
        );
        if (foundCategory) {
          specialty.category = foundCategory;
        }
      } else {
        // categoryId yoksa, tüm kategorilerde ara
        for (const category of allSpecialties.categories) {
          const foundSpecialty = category.specialties?.find(
            (s: Specialty) => s._id === specialty!._id || s.slug === specialty!.slug
          );
          if (foundSpecialty) {
            specialty.category = category;
            break;
          }
        }
      }
    }
  } else {
    // Specialty bulunamadı, kategoriyi kontrol et
    const categoryData = await getPublicCategoryBySlug(slug);

    if (categoryData) {
      // Kategori bulundu, içindeki specialty'leri de çek
      const allSpecialties = await getPublicSpecialties();
      const categorySpecialties =
        allSpecialties.categories.find((cat: SpecialtyCategory & { specialties?: Specialty[] }) => cat._id === categoryData._id)?.specialties || [];

      category = {
        ...categoryData,
        specialties: categorySpecialties,
      };
    }
  }

  // Hiçbiri bulunamadı
  if (!specialty && !category) {
    notFound();
  }

  const primaryColor = config.colors.primary;

  // Specialty sayfası
  if (specialty) {
    return (
      <>
        {/* Breadcrumb Header */}
        <section
          className="py-6 sm:py-8"
          style={{ backgroundColor: primaryColor }}
        >
          <Container>
            <nav className="flex items-center gap-2 text-sm text-white/80 flex-wrap">
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
              {specialty.category ? (
                <>
                  <ChevronRight size={14} className="text-white/50" />
                  <Link
                    href={`/${currentLocale}/uzmanlik/${specialty.category.slug}`}
                    className="hover:text-white transition-colors"
                  >
                    {specialty.category.title || specialty.category.name}
                  </Link>
                  <ChevronRight size={14} className="text-white/50" />
                  <span className="text-white font-medium">{specialty.title}</span>
                </>
              ) : (
                <>
                  <ChevronRight size={14} className="text-white/50" />
                  <span className="text-white font-medium">{specialty.title}</span>
                </>
              )}
            </nav>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
              {specialty.title}
            </h1>
          </Container>
        </section>

        {/* Content Section */}
        <Container className="py-12 sm:py-16">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <div className="mb-8">
              <Link
                href={
                  specialty.category
                    ? `/${currentLocale}/uzmanlik/${specialty.category.slug}`
                    : `/${currentLocale}/uzmanliklar`
                }
                className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                {specialty.category
                  ? specialty.category.title || specialty.category.name
                  : 'Tüm Uzmanlıklar'}
              </Link>
            </div>

            {/* Featured Image */}
            {specialty.image && (
              <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-sm overflow-hidden mb-8">
                <Image
                  src={specialty.image}
                  alt={specialty.title}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            )}

            {/* Description */}
            {specialty.description && (
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {specialty.description}
              </p>
            )}

            {/* Content */}
            {specialty.content && (
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: specialty.content }}
              />
            )}
          </div>
        </Container>
      </>
    );
  }

  // Kategori sayfası
  if (category) {
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

  return null;
}
