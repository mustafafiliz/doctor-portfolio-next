'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useTranslations } from '@/components/I18nProvider';
import { useConfig } from '@/hooks/useConfig';
import { usePathname } from 'next/navigation';
import { locales, type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin } from 'lucide-react';

function NavLink({ href, currentLocale, children, className }: { href: string; currentLocale: Locale; children: React.ReactNode; className?: string }) {
  const fullHref = href === '/' ? `/${currentLocale}` : `/${currentLocale}${href}`;
  return (
    <Link href={fullHref} className={className}>
      {children}
    </Link>
  );
}

export function Footer() {
  const t = useTranslations('nav');
  const { config } = useConfig();
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  return (
    <footer className="border-t bg-gradient-to-b from-background to-muted/30 relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-16 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10">
          {/* Brand Section */}
          <div className="space-y-3 sm:space-y-4">
            <Link href={`/${currentLocale}`} className="inline-block">
              <Image
                src="/images/logo.webp"
                alt="Prof. Dr. Kadriye Ufuk Elgin Logo"
                width={200}
                height={54}
                className="h-auto w-full max-w-[180px] sm:max-w-[200px] object-contain"
              />
            </Link>
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
              Göz sağlığınız için 25+ yıllık deneyim ve profesyonel hizmet
            </p>
            <div className="flex space-x-3 sm:space-x-4">
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Facebook className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Instagram className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
              <a href="#" className="w-9 h-9 sm:w-10 sm:h-10 rounded-sm bg-muted flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors">
                <Linkedin className="h-4 w-4 sm:h-5 sm:w-5" />
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Menü</h4>
            <nav className="flex flex-col space-y-2 sm:space-y-3">
              <NavLink href={getRoute('home', currentLocale)} currentLocale={currentLocale} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('home')}
              </NavLink>
              <NavLink href={getRoute('about', currentLocale)} currentLocale={currentLocale} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('about')}
              </NavLink>
              <NavLink href={getRoute('specialties', currentLocale)} currentLocale={currentLocale} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('specialties')}
              </NavLink>
              <NavLink href={getRoute('gallery', currentLocale)} currentLocale={currentLocale} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('gallery')}
              </NavLink>
              <NavLink href={getRoute('contact', currentLocale)} currentLocale={currentLocale} className="text-xs sm:text-sm text-muted-foreground hover:text-primary transition-colors">
                {t('contact')}
              </NavLink>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">İletişim</h4>
            <div className="flex flex-col space-y-2 sm:space-y-3 text-xs sm:text-sm text-muted-foreground">
              <div className="flex items-start space-x-2 sm:space-x-3">
                <MapPin className="h-4 w-4 sm:h-5 sm:w-5 mt-0.5 flex-shrink-0" style={{ color: config.colors.primary }} />
                <span className="leading-relaxed">{config.contact.address}</span>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: config.colors.primary }} />
                <a href={`tel:${config.contact.phone}`} className="hover:text-primary transition-colors break-all">
                  {config.contact.phone}
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: config.colors.primary }} />
                <a href={`tel:${config.contact.mobile}`} className="hover:text-primary transition-colors break-all">
                  {config.contact.mobile}
                </a>
              </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
                <Mail className="h-4 w-4 sm:h-5 sm:w-5 flex-shrink-0" style={{ color: config.colors.primary }} />
                <a href={`mailto:${config.contact.email}`} className="hover:text-primary transition-colors break-all">
                  {config.contact.email}
                </a>
              </div>
            </div>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold mb-3 sm:mb-4">Yasal Uyarı</h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              Web sitemizin içeriği, ziyaretçiyi bilgilendirmeye yönelik hazırlanmıştır. 
              Sitede yer alan bilgiler, hiçbir zaman bir hekim tedavisinin ya da konsültasyonunun yerini alamaz.
            </p>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t text-center text-xs sm:text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Prof. Dr. Kadriye Ufuk Elgin. Tüm hakları saklıdır.</p>
        </div>
      </div>
    </footer>
  );
}
