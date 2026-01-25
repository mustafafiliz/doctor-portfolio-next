'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { useConfig } from '@/hooks/useConfig';

interface QuickLinksProps {
  currentLocale?: Locale;
}

export function QuickLinks({ currentLocale: propLocale }: QuickLinksProps) {
  const pathname = usePathname();
  const currentLocale = propLocale || (pathname?.split('/')[1] || 'tr') as Locale;
  const { config } = useConfig();
  const whatsappUrl = config?.contact?.whatsapp
    ? `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`
    : '#';

  const links = [
    {
      icon: '/images/icons/stethoscope.png',
      title: 'Randevu Talebi',
      href: whatsappUrl,
      isExternal: true,
    },
    {
      icon: '/images/icons/makaleler.png',
      title: 'Yayınlanan Makaleler',
      href: `/${currentLocale}/makaleler`,
    },
    {
      icon: '/images/icons/youtube-1.svg',
      title: 'Video İçerikler',
      href: `/${currentLocale}/videolar`,
    },
    {
      icon: '/images/icons/blog-2.png',
      title: 'Blog Yazıları',
      href: `/${currentLocale}/blog`,
    },
  ];

  return (
    <section className="py-12 md:py-16">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-5">
          {links.map((link, index) => {
            const words = link.title.split(' ');
            return (
              <Link
                key={index}
                href={link.href}
                target={link.isExternal ? "_blank" : undefined}
                rel={link.isExternal ? "noopener noreferrer" : undefined}
                className="group flex flex-row items-center text-left gap-4 hover:-translate-y-1 transition-transform duration-300"
              >
                <div className="shrink-0 w-20 h-20 lg:w-24 lg:h-24 rounded-full bg-primary/5 flex items-center justify-center group-hover:bg-primary/10 transition-colors duration-300">
                  <Image
                    src={link.icon}
                    alt={link.title}
                    width={48}
                    height={48}
                    className="w-10 h-10 lg:w-12 lg:h-12 transition-transform duration-300 group-hover:scale-110"
                  />
                </div>
                <div className="flex flex-col justify-center">
                  {words.map((word, i) => (
                    <span key={i} className="text-base lg:text-lg font-semibold text-gray-800 group-hover:text-primary transition-colors leading-tight">
                      {word}
                    </span>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

