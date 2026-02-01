'use client';

import { Container } from '@/components/Container';
import { type SpecialtyCategory, type Specialty } from '@/lib/types';
import { SpecialtiesSidebar } from './SpecialtiesSidebar';
import { useConfig } from '@/hooks/useConfig';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

interface SpecialtiesLayoutProps {
  categories: CategoryWithSpecialties[];
  children: React.ReactNode;
  currentSlug?: string;
  locale: string;
  title?: string;
  description?: string;
  breadcrumb?: {
    label: string;
    href?: string;
  }[];
}

export function SpecialtiesLayout({
  categories,
  children,
  currentSlug,
  locale,
  title,
  description,
  breadcrumb = []
}: SpecialtiesLayoutProps) {
  const { config } = useConfig();
  const primaryColor = config.colors.primary;

  return (
    <div className="min-h-screen bg-gray-50/50">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="py-8 sm:py-12 relative overflow-hidden">
          <div
            className="absolute inset-0 opacity-5"
            style={{ backgroundColor: primaryColor }}
          />
          <Container className="relative">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4">
              <Link href={`/${locale}`} className="hover:text-primary transition-colors">
                Anasayfa
              </Link>
              <ChevronRight size={14} className="text-gray-400" />
              <Link href={`/${locale}/uzmanliklar`} className="hover:text-primary transition-colors">
                Uzmanlıklar
              </Link>
              {breadcrumb.map((item, index) => (
                <div key={index} className="flex items-center gap-2">
                  <ChevronRight size={14} className="text-gray-400" />
                  {item.href ? (
                    <Link href={item.href} className="hover:text-primary transition-colors">
                      {item.label}
                    </Link>
                  ) : (
                    <span className="text-gray-900 font-medium">{item.label}</span>
                  )}
                </div>
              ))}
            </nav>

            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">
              {title || 'Uzmanlıklar'}
            </h1>
            {description && (
              <p className="text-lg text-gray-600 max-w-3xl">
                {description}
              </p>
            )}
          </Container>
        </div>
      </div>

      <Container className="py-8 sm:py-12">
        <div className="flex flex-col lg:flex-row gap-8 lg:gap-12">
          {/* Sidebar */}
          <SpecialtiesSidebar
            categories={categories}
            currentSlug={currentSlug}
            locale={locale}
          />

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {children}
          </main>
        </div>
      </Container>
    </div>
  );
}
