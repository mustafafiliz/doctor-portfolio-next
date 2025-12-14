'use client';

import { useTranslations } from '@/components/I18nProvider';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import { Container } from '@/components/Container';
import { ArrowRight } from 'lucide-react';
import type { FAQ } from '@/lib/types';

interface HomeFAQSectionProps {
  faqs: FAQ[];
}

export function HomeFAQSection({ faqs }: HomeFAQSectionProps) {
  const t = useTranslations('faq');
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  if (faqs.length === 0) {
    return null; // FAQ yoksa section'ı gösterme
  }

  return (
    <section className="py-12 sm:py-16 md:py-24 lg:py-32 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <Container className="relative z-10">
        <div className="text-center mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {t('title')}
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
        </div>

        <div className="max-w-3xl mx-auto mb-6 sm:mb-8">
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq._id} value={`item-${faq._id}`} className="border-border/50">
                <AccordionTrigger className="text-left text-sm sm:text-base font-semibold hover:text-primary transition-colors px-4 sm:px-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed px-4 sm:px-6">
                  {faq.answer}
                </AccordionContent>
            </AccordionItem>
            ))}
          </Accordion>
        </div>

        <div className="text-center">
          <Link
            href={`/${currentLocale}${getRoute('faq', currentLocale)}`}
            className="inline-flex items-center gap-2 px-5 sm:px-6 py-2.5 sm:py-3 rounded-sm bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground text-sm sm:text-base font-semibold shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-105"
          >
            Tümünü Gör
            <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </Link>
        </div>
      </Container>
    </section>
  );
}
