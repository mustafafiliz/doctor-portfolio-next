import { notFound } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import {
  getPublicSpecialtyBySlug,
  getPublicSpecialties,
  getConfig,
  getPublicAbout,
} from "@/lib/config";
import type { Specialty, SpecialtyCategory, AboutSection } from "@/lib/types";
import type { Metadata } from "next";
import { SpecialtyContent } from "@/components/specialty/SpecialtyContent";
import { AuthorCard } from "@/components/AuthorCard";

// Rezerve edilmiş slug'lar (diğer sayfalar)
const reservedSlugs = [
  "hakkimda",
  "uzmanliklar",
  "uzmanlik",
  "galeri",
  "videolar",
  "iletisim",
  "sik-sorulan-sorular",
  "blog",
  "basin",
  "admin",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const config = await getConfig();

  // Rezerve edilmiş slug ise 404
  if (reservedSlugs.includes(slug)) {
    return {
      title: `Sayfa Bulunamadı - ${config.meta.siteName}`,
    };
  }

  // Specialty'yi kontrol et
  const specialty = await getPublicSpecialtyBySlug(slug);
  if (specialty) {
    return {
      title: `${specialty.title} - ${config.meta.siteName}`,
      description: specialty.description || config.meta.defaultDescription,
    };
  }

  return {
    title: `Sayfa Bulunamadı - ${config.meta.siteName}`,
  };
}

export default async function SpecialtyPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  const currentLocale = (locale || "tr") as Locale;
  const config = await getConfig();

  // Rezerve edilmiş slug ise 404
  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  // Specialty'yi kontrol et
  let specialty: Specialty | null = await getPublicSpecialtyBySlug(slug);
  const author = (await getPublicAbout()) as AboutSection | null;

  if (!specialty) {
    notFound();
  }

  // Eğer specialty'de category yoksa, kategoriyi bul
  if (!specialty.category) {
    const allSpecialties = await getPublicSpecialties();

    // categoryId varsa onu kullan
    if (specialty.categoryId) {
      const foundCategory = allSpecialties.categories.find(
        (cat: SpecialtyCategory & { specialties?: Specialty[] }) =>
          cat._id === specialty!.categoryId,
      );
      if (foundCategory) {
        specialty.category = foundCategory;
      }
    }

    // categoryId ile bulunamadıysa veya categoryId yoksa, tüm kategorilerde ara
    if (!specialty.category) {
      for (const category of allSpecialties.categories) {
        if (category.specialties && Array.isArray(category.specialties)) {
          const foundSpecialty = category.specialties.find(
            (s: Specialty) =>
              s._id === specialty!._id || s.slug === specialty!.slug,
          );
          if (foundSpecialty) {
            specialty.category = category;
            break;
          }
        }
      }
    }
  }

  // Kategori bilgisini kontrol et
  if (!specialty.category) {
  }

  const primaryColor = config.colors.primary;

  return (
    <>
      {/* Breadcrumb Header */}
      <section
        className="py-6 sm:py-8"
        style={{ backgroundColor: primaryColor }}
      >
        <Container className="hide-scrollbar">
          <nav className="flex items-center gap-2 text-sm text-white/80 flex-wrap">
            <Link
              href={`/${currentLocale}`}
              className="hover:text-white transition-colors"
            >
              Anasayfa
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <Link
              href={`/${currentLocale}/uzmanliklar`}
              className="hover:text-white transition-colors"
            >
              Uzmanlıklar
            </Link>
            {specialty.category && (
              <>
                <ChevronRight size={14} className="text-white/50" />
                <Link
                  href={`/${currentLocale}/uzmanlik/${specialty.category.slug}`}
                  className="hover:text-white transition-colors"
                >
                  {specialty.category.title || specialty.category.name}
                </Link>
                <ChevronRight size={14} className="text-white/50" />
                <span className="text-white font-medium">
                  {specialty.title}
                </span>
              </>
            )}
            {!specialty.category && (
              <>
                <ChevronRight size={14} className="text-white/50" />
                <span className="text-white font-medium">
                  {specialty.title}
                </span>
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
          {/* Back Button & Author */}
          <div className="mb-8 flex items-center justify-between">
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
                : "Tüm Uzmanlıklar"}
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

          {/* Content */}
          {specialty.content && (
            <SpecialtyContent content={specialty.content} />
          )}

          {/* Author Card */}
          <AuthorCard author={author} locale={currentLocale} />
        </div>
      </Container>
    </>
  );
}
