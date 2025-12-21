'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Stethoscope, BookOpen, PlayCircle, Newspaper } from 'lucide-react';

interface QuickLinksProps {
  currentLocale?: Locale;
}

export function QuickLinks({ currentLocale: propLocale }: QuickLinksProps) {
  const pathname = usePathname();
  const currentLocale = propLocale || (pathname?.split('/')[1] || 'tr') as Locale;

  const links = [
    {
      icon: Stethoscope,
      title: 'Uzmanlıklar',
      href: `/${currentLocale}/uzmanliklar`,
    },
    {
      icon: BookOpen,
      title: 'Blog Yazıları',
      href: `/${currentLocale}/blog`,
    },
    {
      icon: PlayCircle,
      title: 'Galeri',
      href: `/${currentLocale}/galeri`,
    },
    {
      icon: Newspaper,
      title: 'Sık Sorulan Sorular',
      href: `/${currentLocale}/sik-sorulan-sorular`,
    },
  ];

  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="group bg-white rounded-sm p-5 md:p-6 shadow-sm hover:shadow-md transition-all duration-200 border border-gray-200 flex flex-col items-center text-center hover:-translate-y-0.5"
              >
                <div className="w-12 h-12 md:w-14 md:h-14 rounded-full bg-primary/5 flex items-center justify-center mb-3 group-hover:bg-primary/10 transition-all duration-200">
                  <Icon className="w-5 h-5 md:w-6 md:h-6 text-primary transition-colors" />
                </div>
                <span className="text-xs md:text-sm font-medium text-gray-700 group-hover:text-primary transition-colors">
                  {link.title}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

