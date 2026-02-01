'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ChevronRight, Grid } from 'lucide-react';
import { type SpecialtyCategory, type Specialty } from '@/lib/types';
import { useConfig } from '@/hooks/useConfig';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

interface SpecialtiesSidebarProps {
  categories: CategoryWithSpecialties[];
  currentSlug?: string;
  locale: string;
}

export function SpecialtiesSidebar({ categories, currentSlug, locale }: SpecialtiesSidebarProps) {
  const pathname = usePathname();
  const { config } = useConfig();
  const primaryColor = config.colors.primary;

  return (
    <aside className="w-full lg:w-80 flex-shrink-0 space-y-8">
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden sticky top-0">
        <nav className="p-2">
          <ul className="space-y-1">
            {/* Tümü Linki */}
            <li>
              <Link
                href={`/${locale}/uzmanliklar`}
                className={cn(
                  "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                  !currentSlug
                    ? "bg-primary text-white shadow-md"
                    : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                )}
                style={!currentSlug ? { backgroundColor: primaryColor } : {}}
              >
                <div className="flex items-center gap-3">
                  <Grid className={cn("w-4 h-4", !currentSlug ? "text-white/80" : "text-gray-400 group-hover:text-primary")} />
                  <span>Tümü</span>
                </div>
                <ChevronRight
                  className={cn(
                    "w-4 h-4 transition-transform",
                    !currentSlug ? "text-white/80" : "text-gray-400 group-hover:text-primary/50 group-hover:translate-x-1"
                  )}
                />
              </Link>
            </li>

            {/* Kategoriler */}
            {categories.map((category) => {
              const isActive = currentSlug === category.slug;

              return (
                <li key={category._id}>
                  <Link
                    href={`/${locale}/uzmanlik/${category.slug}`}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
                      isActive
                        ? "bg-primary text-white shadow-md"
                        : "text-gray-600 hover:bg-gray-50 hover:text-primary"
                    )}
                    style={isActive ? { backgroundColor: primaryColor } : {}}
                  >
                    <span>{category.title || category.name}</span>
                    <ChevronRight
                      className={cn(
                        "w-4 h-4 transition-transform",
                        isActive ? "text-white/80" : "text-gray-400 group-hover:text-primary/50 group-hover:translate-x-1"
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
