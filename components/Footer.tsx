'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/components/I18nProvider';
import { useConfig } from '@/hooks/useConfig';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import { useEffect, useState } from 'react';
import { getPublicSpecialties } from '@/lib/config';
import type { SpecialtyCategory, Specialty } from '@/lib/types';

interface CategoryWithSpecialties extends SpecialtyCategory {
  specialties?: Specialty[];
}

// Telefon numarasını formatla
const formatPhone = (phone: string): string => {
  const digits = phone.replace(/\D/g, '');
  
  if (digits.length >= 10) {
    const countryCode = digits.startsWith('90') ? '+90' : (digits.startsWith('0') ? '+90' : '+90');
    const cleanDigits = digits.startsWith('90') ? digits.slice(2) : (digits.startsWith('0') ? digits.slice(1) : digits);
    
    if (cleanDigits.length >= 10) {
      return `${countryCode} (${cleanDigits.slice(0, 3)}) ${cleanDigits.slice(3, 6)} ${cleanDigits.slice(6, 8)} ${cleanDigits.slice(8, 10)}`;
    }
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
        // Order'a göre sırala
        const sortedCats = cats.sort((a: CategoryWithSpecialties, b: CategoryWithSpecialties) => (a.order || 0) - (b.order || 0));
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

  const socialLinks = [
    { icon: Facebook, url: config.social?.facebook, label: 'Facebook' },
    { icon: Instagram, url: config.social?.instagram, label: 'Instagram' },
    { icon: Linkedin, url: config.social?.linkedin, label: 'LinkedIn' },
    { icon: Twitter, url: config.social?.twitter, label: 'Twitter' },
    { icon: Youtube, url: config.social?.youtube, label: 'YouTube' },
  ].filter(link => isValidSocialUrl(link.url));

  return (
    <footer className="bg-[#1a1a2e] text-white relative overflow-hidden">
      {/* Top Contact Section */}
      <section className="bg-[#0f0f1a] border-b border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Social Media */}
            <div className="flex items-center gap-4">
              <span className="text-sm font-medium text-white/80">Beni Takip Edin</span>
              {socialLinks.length > 0 && (
                <div className="flex gap-2">
                  {socialLinks.map((social, index) => {
                    const Icon = social.icon;
                    return (
                      <a 
                        key={index}
                        href={social.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={social.label}
                        className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-primary transition-colors"
                      >
                        <Icon className="h-4 w-4" />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {/* Info Text */}
            <p className="text-sm text-white/60 text-center">
              Bilgilendirici postlar, videolar ve çok daha fazlası...
            </p>

            {/* Phone */}
            {config.contact.phone && (
              <a 
                href={`tel:${config.contact.phone}`}
                className="flex items-center gap-2 text-white hover:text-primary transition-colors"
              >
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <span className="font-semibold">{formatPhone(config.contact.phone)}</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Brand & Contact Section */}
          <div className="lg:col-span-3 space-y-6">
            {/* Logo & Brand */}
            <Link href={`/${currentLocale}`} className="inline-block">
              {config.site?.logo ? (
                <Image
                  src={config.site.logo}
                  alt={config.site?.name || ''}
                  width={200}
                  height={54}
                  className="h-auto w-full max-w-[200px] object-contain brightness-0 invert"
                  unoptimized
                />
              ) : (
                <div className="text-xl font-bold">
                  <span className="text-white">{config.site?.name || ''}</span>
                  <span className="block text-sm font-normal text-white/60 mt-1">
                    {config.site?.tagline || ''}
                  </span>
                </div>
              )}
            </Link>

            {/* Contact Info */}
            <div className="space-y-3 text-sm">
              {config.contact.address && (
                <div className="flex items-start gap-2 text-white/70">
                  <span className="font-medium text-white">Adres:</span>
                  <span>{config.contact.address}</span>
                </div>
              )}
              {config.contact.email && (
                <div className="flex items-center gap-2 text-white/70">
                  <span className="font-medium text-white">E-Posta:</span>
                  <a href={`mailto:${config.contact.email}`} className="hover:text-primary transition-colors">
                    {config.contact.email}
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Categories & Specialties Links */}
          <div className="lg:col-span-9">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 lg:gap-8">
              {/* Dynamic Categories */}
              {categories.slice(0, 5).map((category) => (
                <div key={category._id}>
                  <Link 
                    href={`/${currentLocale}/uzmanlik/${category.slug}`}
                    className="text-sm font-semibold text-white hover:text-primary transition-colors block mb-4"
                  >
                    {category.title || category.name}
                  </Link>
                  {category.specialties && category.specialties.length > 0 && (
                    <ul className="space-y-2">
                      {category.specialties.slice(0, 5).map((specialty) => (
                        <li key={specialty._id}>
                          <Link
                            href={`/${currentLocale}/${specialty.slug}`}
                            className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
                          >
                            {specialty.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              {/* Blog Section */}
              <div>
                <Link 
                  href={`/${currentLocale}/blog`}
                  className="text-sm font-semibold text-white hover:text-primary transition-colors block mb-4"
                >
                  Blog
                </Link>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/${currentLocale}/blog`}
                      className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
                    >
                      Tüm Yazılar
                    </Link>
                  </li>
                </ul>
              </div>

              {/* Hakkımda Section */}
              <div>
                <Link 
                  href={`/${currentLocale}/hakkimda`}
                  className="text-sm font-semibold text-white hover:text-primary transition-colors block mb-4"
                >
                  Hakkımda
                </Link>
                <ul className="space-y-2">
                  <li>
                    <Link
                      href={`/${currentLocale}/hakkimda`}
                      className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
                    >
                      {config.site?.name || 'Hakkımda'}
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/galeri`}
                      className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
                    >
                      Galeri
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/sik-sorulan-sorular`}
                      className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
                    >
                      S.S.S.
                    </Link>
                  </li>
                  <li>
                    <Link
                      href={`/${currentLocale}/iletisim`}
                      className="text-xs text-white/60 hover:text-primary transition-colors block leading-relaxed"
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
      <div className="border-t border-white/10">
        <div className="container mx-auto px-4 sm:px-6 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-white/50">
            <p>
              Copyright © {new Date().getFullYear()} <span className="text-white/70">{config.site?.name || ''}</span>. Tüm Hakları Saklıdır!
            </p>
            <p className="text-white/40">
              Web sitemizin içeriği bilgilendirme amaçlıdır, tedavi yerine geçmez.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
