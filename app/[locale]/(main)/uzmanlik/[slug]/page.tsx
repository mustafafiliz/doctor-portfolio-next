import { notFound } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import { Container } from "@/components/Container";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, ArrowLeft } from "lucide-react";
import {
  getPublicCategoryBySlug,
  getPublicSpecialties,
  getConfig,
} from "@/lib/config";
import type { SpecialtyCategory, Specialty } from "@/lib/types";
import type { Metadata } from "next";
import { SpecialtiesLayout } from "@/components/specialties/SpecialtiesLayout";

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
  const currentLocale = (locale || "tr") as Locale;
  const config = await getConfig();

  // Tüm specialty'leri çek (Sidebar için)
  const allSpecialties = await getPublicSpecialties();
  const categories = allSpecialties.categories || [];

  // Mevcut kategoriyi bul
  const categoryData = await getPublicCategoryBySlug(slug);

  if (!categoryData) {
    notFound();
  }

  const categorySpecialties =
    categories.find(
      (cat: SpecialtyCategory & { specialties?: Specialty[] }) =>
        cat._id === categoryData._id,
    )?.specialties || [];

  const category: CategoryWithSpecialties = {
    ...categoryData,
    specialties: categorySpecialties,
  };

  const primaryColor = config.colors.primary;
  const title = category.title || category.name;

  return (
    <SpecialtiesLayout
      categories={categories}
      currentSlug={slug}
      locale={currentLocale}
      title={title}
      description={category.description}
      breadcrumb={[
        { label: title }
      ]}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {categorySpecialties.length > 0 ? (
          categorySpecialties.map((specialty: Specialty) => (
            <Link
              key={specialty._id}
              href={`/${currentLocale}/${specialty.slug}`}
              className="group bg-white border border-gray-100 rounded-xl overflow-hidden hover:border-primary hover:shadow-lg transition-all"
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
                <div className="aspect-video bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
                  <span className="text-4xl text-gray-300 font-bold">{specialty.title.charAt(0)}</span>
                </div>
              )}
              <div className="p-5">
                <h2 className="text-lg font-bold text-gray-900 group-hover:text-primary transition-colors">
                  {specialty.title}
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
          ))
        ) : (
          <div className="col-span-2 text-center py-12 bg-white rounded-xl border border-gray-100">
            <p className="text-gray-500">Bu kategoride henüz içerik bulunmuyor.</p>
          </div>
        )}
      </div>
    </SpecialtiesLayout>
  );
}
