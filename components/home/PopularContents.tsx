"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { type Locale } from "@/lib/i18n";
import type { Specialty, SpecialtyCategory } from "@/lib/types";
import { getRoute } from "@/lib/routes";

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

interface PopularContentsProps {
  categories: CategoryWithSpecialties[];
  currentLocale?: Locale;
}

export function PopularContents({
  categories,
  currentLocale: propLocale,
}: PopularContentsProps) {
  const pathname = usePathname();
  const currentLocale =
    propLocale || ((pathname?.split("/")[1] || "tr") as Locale);

  // Tüm uzmanlıkları düzleştir ve ilk 6 tanesini al
  const allSpecialties: (Specialty & {
    categoryName?: string;
    categorySlug?: string;
  })[] = [];
  categories.forEach((category) => {
    if (category.specialties && Array.isArray(category.specialties)) {
      category.specialties.forEach((specialty) => {
        allSpecialties.push({
          ...specialty,
          categoryName: category.title || category.name,
          categorySlug: category.slug,
        });
      });
    }
  });

  // İlk 6 uzmanlık yazısını al
  const popularSpecialties = allSpecialties.slice(0, 6);

  if (popularSpecialties.length === 0) {
    return null;
  }

  return (
    <section className="py-16 md:py-24 bg-[#f8f9fa]">
      <div className="container mx-auto px-4 sm:px-6">
        {/* Section Header - Top Right */}
        <div className="flex flex-col items-start text-left mb-12">
          <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
            Blog Yazıları
          </h2>
          <p className="text-gray-600 max-w-2xl">
            Göz sağlığı, hastalıkları ve tedavi yöntemleri hakkında merak
            ettiğiniz tüm konuları, güncel bilimsel veriler ışığında
            hazırladığım blog yazılarımda bulabilirsiniz.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-4">
          {popularSpecialties.map((specialty) => (
            <article
              key={specialty._id}
              className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100"
            >
              {/* Image */}
              <Link href={`/${currentLocale}/${specialty.slug}`}>
                <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                  {specialty.image ? (
                    <Image
                      src={specialty.image}
                      alt={specialty.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      unoptimized
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                      <span className="text-6xl text-primary/30">
                        {specialty.title.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Category Badge - Top Right */}
                  {specialty.categoryName && specialty.categorySlug && (
                    <span
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/${currentLocale}/uzmanlik/${specialty.categorySlug}`;
                      }}
                      className="absolute top-3 left-3 bg-primary text-white text-xs font-medium px-3 py-1.5 hover:bg-primary/90 transition-colors cursor-pointer shadow-lg"
                    >
                      {specialty.categoryName}
                    </span>
                  )}
                </div>
              </Link>

              {/* Content */}
              <div className="p-4">
                <Link href={`/${currentLocale}/${specialty.slug}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary transition-colors line-clamp-2">
                    {specialty.title}
                  </h3>
                </Link>
                {specialty.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 leading-relaxed">
                    {specialty.description}
                  </p>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* View All Button */}
        <div className="mt-12 text-center flex justify-center">
          <Link
            href={`/${currentLocale}${getRoute("specialties", currentLocale)}`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-sm transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Tümünü Göster
          </Link>
        </div>
      </div>
    </section>
  );
}
