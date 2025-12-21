'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowRight, Sparkles } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { useConfig } from '@/hooks/useConfig';
import { getRoute } from '@/lib/routes';

export function SummarySection() {
  const t = useTranslations('home');
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;
  const { config } = useConfig();

  return (
    <section className="py-20 md:py-32 bg-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-sm bg-primary/10 mb-6">
              <Sparkles className="h-4 w-4" style={{ color: config.colors.primary }} />
              <span className="text-sm font-medium" style={{ color: config.colors.primary }}>
                Profesyonel Hizmet
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">
              {t('title')}
            </h2>
          </div>
          
          <div className="bg-card/50 backdrop-blur-sm rounded-sm p-8 md:p-12 border border-border/50 shadow-xl">
            <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8 text-center">
              {t('summary')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${currentLocale}${getRoute('about', currentLocale)}`}>
                <Button 
                  size="lg" 
                  className="gap-2 rounded-sm px-8 py-6 text-lg shadow-lg hover:shadow-xl transition-all hover:scale-105"
                  style={{ 
                    backgroundColor: config.colors.primary,
                    color: 'white'
                  }}
                >
                  {t('readMore')}
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
