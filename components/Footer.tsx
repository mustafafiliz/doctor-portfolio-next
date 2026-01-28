'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/components/I18nProvider';
import { useConfig } from '@/hooks/useConfig';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube, GraduationCap } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPublicSpecialties } from '@/lib/config';
import type { SpecialtyCategory, Specialty } from '@/lib/types';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

// Telefon numarasını formatla
const formatPhone = (phone: string): string => {
  if (!phone) return '';

  // Sadece rakamları al
  let digits = phone.replace(/\D/g, '');

  // "90" ile başlıyorsa kaldır (ülke kodu)
  if (digits.startsWith('90') && digits.length >= 9) {
    digits = digits.slice(2);
  }
  // "0" ile başlıyorsa kaldır
  else if (digits.startsWith('0')) {
    digits = digits.slice(1);
  }

  // 10 haneli numara: +90 XXX XXXX XXX
  if (digits.length === 10) {
    return `+90 ${digits.slice(0, 3)} ${digits.slice(3, 7)} ${digits.slice(7)}`;
  }

  // 7 haneli numara (444 numaraları vb): +90 XXX XXXX
  if (digits.length === 7) {
    return `+90 ${digits.slice(0, 3)} ${digits.slice(3)}`;
  }

  // Diğer uzunluklar için basit format
  if (digits.length > 0) {
    return `+90 ${digits}`;
  }

  return phone;
};

export function Footer() {
  const t = useTranslations('nav');
  const { config } = useConfig();
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;
  const [categories, setCategories] = useState<CategoryWithSpecialties[]>([]);

  // Fetch categories with specialties
  useEffect(() => {
    const fetchSpecialties = async () => {
      try {
        const data = await getPublicSpecialties();
        const cats = Array.isArray(data) ? data : (data.categories || []);
        // Order'a göre sırala ve boş kategorileri filtrele
        const sortedCats = cats
          .filter((cat: CategoryWithSpecialties) => cat.specialties && cat.specialties.length > 0)
          .sort((a: CategoryWithSpecialties, b: CategoryWithSpecialties) => (a.order || 0) - (b.order || 0));
        setCategories(sortedCats);
      } catch (error) {
        // Silently fail
      }
    };
    fetchSpecialties();
  }, []);

  // Social media links from config - only show if URL exists, is not empty, and is not just a base domain
  const isValidSocialUrl = (url: string | undefined): boolean => {
    if (!url || url.trim() === '') return false;
    const trimmed = url.trim();
    // Check if URL is just a base domain (e.g., "https://facebook.com/" or "https://www.facebook.com/")
    const baseDomains = [
      'facebook.com',
      'instagram.com',
      'linkedin.com',
      'twitter.com',
      'x.com',
      'youtube.com',
    ];
    try {
      const urlObj = new URL(trimmed);
      const hostname = urlObj.hostname.replace(/^www\./, '');
      const pathname = urlObj.pathname.replace(/\/$/, ''); // Remove trailing slash
      // If it's a base domain and has no meaningful path (just "/" or empty), it's invalid
      const isBaseDomain = baseDomains.some(domain => hostname === domain);
      if (isBaseDomain && (pathname === '' || pathname === '/')) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  };

  // Sabit linkler (config'den bağımsız)
  const fixedLinks = [
    { icon: Linkedin, url: 'https://www.linkedin.com/in/ufuk-elgin-96380b3a6/', label: 'LinkedIn', isExternal: true },
    { icon: GraduationCap, url: `/${currentLocale}/makaleler`, label: 'Makaleler', isExternal: false },
  ];

  // Config'den gelen sosyal medya linkleri (LinkedIn hariç - sabit link kullanacağız)
  const configSocialLinks = [
    { icon: Facebook, url: config.social?.facebook, label: 'Facebook' },
    { icon: Instagram, url: config.social?.instagram, label: 'Instagram' },
    { icon: Twitter, url: config.social?.twitter, label: 'Twitter' },
    { icon: Youtube, url: config.social?.youtube, label: 'YouTube' },
  ].filter(link => isValidSocialUrl(link.url));

  // Tüm linkleri birleştir: config linkleri (YouTube hariç) + YouTube + Google Akademik + LinkedIn
  const socialLinks = [
    ...configSocialLinks.filter(link => link.label !== 'YouTube'),
    ...configSocialLinks.filter(link => link.label === 'YouTube'),
    fixedLinks[1], // Google Akademik
    fixedLinks[0], // LinkedIn
  ];

  return (
    <footer className="bg-white text-black relative overflow-hidden">
      {/* Top Contact Section */}
      <section className="bg-primary border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 py-4 md:py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-base md:text-lg font-bold text-white">Beni Takip Edin</span>
              {socialLinks.length > 0 && (
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    const isExternal = (social as any).isExternal !== false;

                    if (!social.url) return null;

                    const commonProps = {
                      'aria-label': social.label,
                      className: 'w-10 h-10 rounded-full bg-white flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-black border border-gray-200',
                    };

                    if (isExternal) {
                      return (
                        <a
                          key={index}
                          href={social.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          {...commonProps}
                        >
                          <Icon className="h-5 w-5" />
                        </a>
                      );
                    } else {
                      return (
                        <Link
                          key={index}
                          href={social.url as string}
                          {...commonProps}
                        >
                          <Icon className="h-5 w-5" />
                        </Link>
                      );
                    }
                  })}
                </div>
              )}
            </div>

            {/* Info Text */}
            <p className="text-lg font-medium text-white text-center">
              Bilgilendirici postlar, videolar ve çok daha fazlası...
            </p>

            {/* Phone */}
            {config.contact.phone && (
              <a
                href={`tel:${config.contact.phone.replace(' 90', '').replace('+90', '')}`}
                className="flex items-center gap-3 text-white hover:opacity-80 transition-opacity"
              >
                <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center border border-gray-200">
                  <Phone className="h-6 w-6 text-primary" />
                </div>
                <span className="font-bold text-xl">{formatPhone(config.contact.phone).replace(' 90', '').replace('+90', '')}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-32">

          {/* Brand & Contact Section */}
          <div className="lg:col-span-4 flex flex-col-reverse lg:flex-col gap-6 md:gap-8 order-last lg:order-first text-center lg:text-left items-center lg:items-start">
            {/* Logo & Brand */}
            <Link href={`/${currentLocale}`} className="inline-block">
              {config.site?.logo ? (
                <Image
                  src={config.site.logo}
                  alt={config.site?.name || ''}
                  width={240}
                  height={65}
                  className="h-auto w-full max-w-[240px] object-contain"
                  unoptimized
                />
              ) : (
                <div className="text-2xl font-bold">
                  <span className="text-black">{config.site?.name || ''}</span>
                  <span className="block text-lg font-normal text-gray-800 mt-2">
                    {config.site?.tagline || ''}
                  </span>
                </div>
              )}
            </Link>

            {/* Contact Info */}
            <div className="space-y-5 text-base">
              {config.contact.address && (
                <div className="flex items-start gap-3 text-gray-900">
                  <span className="font-bold text-black lg:min-w-[80px] text-lg whitespace-nowrap">Adres:</span>
                  <span className="font-medium leading-relaxed text-left">{config.contact.address}</span>
                </div>
              )}
              {config.contact.email && (
                <div className="flex items-center gap-3 text-gray-900 lg:mb-0 mb-5">
                  <span className="font-bold text-black min-w-[80px] text-lg whitespace-nowrap">E-Posta:</span>
                  <a href={`mailto:${config.contact.email}`} className="hover:text-primary transition-colors font-medium">
                    {config.contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Categories & Specialties Links */}
          <div className="lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
              {/* Dynamic Categories */}
              {categories.slice(0, 2).map((category) => (
                <div key={category._id}>
                  <Link
                    href={`/${currentLocale}/uzmanlik/${category.slug}`}
                    className="text-base md:text-lg font-extrabold text-black hover:text-primary transition-colors block mb-3 md:mb-5 uppercase tracking-wide"
                  >
                    {category.title || category.name}
                  </Link>
                  {category.specialties && category.specialties.length > 0 && (
                    <ul className="space-y-2 md:space-y-3">
                      {category.specialties.slice(0, 3).map((specialty) => (
                        <li key={specialty._id}>
                          <Link
                            href={`/${currentLocale}/${specialty.slug}`}
                            className="text-sm md:text-base text-gray-800 hover:text-primary transition-colors block leading-relaxed font-semibold"
                          >
                            {specialty.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Hakkımda Section */}
              <div>
                <Link
                  href={`/${currentLocale}/hakkimda`}
                  className="text-base md:text-lg font-extrabold text-black hover:text-primary transition-colors block mb-3 md:mb-5 uppercase tracking-wide"
                >
                  Hakkımda
                </Link>
                <ul className="space-y-2 md:space-y-3">
                  <li>
                    <Link
                      href={`/${currentLocale}/hakkimda`}
                      className="text-sm md:text-base text-gray-800 hover:text-primary transition-colors block leading-relaxed font-semibold"
                    >
                      {config.site?.name || 'Hakkımda'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/galeri`}
                      className="text-sm md:text-base text-gray-800 hover:text-primary transition-colors block leading-relaxed font-semibold"
                    >
                      Galeri
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/sik-sorulan-sorular`}
                      className="text-sm md:text-base text-gray-800 hover:text-primary transition-colors block leading-relaxed font-semibold"
                    >
                      S.S.S.
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/iletisim`}
                      className="text-sm md:text-base text-gray-800 hover:text-primary transition-colors block leading-relaxed font-semibold"
                    >
                      İletişim
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Copyright Section */}
      <div className="border-t border-gray-200 bg-primary">
        <div className="container mx-auto px-4 sm:px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-base text-white font-medium">
            <p>
              Copyright © {new Date().getFullYear()} <span className="text-white font-bold">{config.site?.name || ''}</span>. Tüm Hakları Saklıdır!
            </p>
            <p className="text-white">
              Web sitemizin içeriği bilgilendirme amaçlıdır, tedavi yerine geçmez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
