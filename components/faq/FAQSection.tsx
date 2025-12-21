'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Container } from '@/components/Container';
import { useEffect, useState } from 'react';
import { Loader2 } from 'lucide-react';
import { getPublicFAQs } from '@/lib/config';
import type { FAQ } from '@/lib/types';

interface FAQSectionProps {
  initialFAQs?: FAQ[];
  currentLocale?: string;
  config?: {
    colors: {
      primary: string;
    };
  };
}

export function FAQSection({ 
  initialFAQs, 
  currentLocale: propLocale,
  config: propConfig 
}: FAQSectionProps = {} as FAQSectionProps) {
  const t = useTranslations('faq');

  const [faqs, setFaqs] = useState<FAQ[]>(initialFAQs || []);
  const [isLoading, setIsLoading] = useState(!initialFAQs);

  useEffect(() => {
    // Eğer initialFAQs yoksa client-side fetch yap
    if (!initialFAQs) {
      const fetchFAQs = async () => {
        try {
          const data = await getPublicFAQs();
          setFaqs(data.data || []);
        } catch (error) {
          // Hata durumunda sessizce devam et
        } finally {
          setIsLoading(false);
        }
      };

      fetchFAQs();
    }
  }, [initialFAQs]);

  if (isLoading) {
    return (
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="w-8 h-8 animate-spin text-primary" />
        </div>
      </Container>
    );
  }

  if (faqs.length === 0) {
    return (
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
              {t('title')}
            </h1>
            <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
          </div>
          <div className="text-center py-12">
            <p className="text-muted-foreground">Henüz soru eklenmemiş.</p>
          </div>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            {t('title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq) => (
            <div 
              key={faq._id} 
              className="border border-border/50 rounded-sm bg-card/50 p-4 sm:p-6 hover:bg-card/80 transition-colors"
            >
              <h3 className="text-base sm:text-lg font-semibold mb-3 text-foreground">
                {faq.question}
              </h3>
              <div className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {faq.answer}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Container>
  );
}
