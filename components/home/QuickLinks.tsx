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
    <section className="py-0 -mt-12 relative z-20">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {links.map((link, index) => {
            const Icon = link.icon;
            return (
              <Link
                key={index}
                href={link.href}
                className="group bg-white rounded-sm p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 flex flex-col items-center text-center hover:-translate-y-1"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary group-hover:scale-110 transition-all duration-300">
                  <Icon className="w-7 h-7 text-primary group-hover:text-white transition-colors" />
                </div>
                <span className="text-sm font-semibold text-gray-800 group-hover:text-primary transition-colors">
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

