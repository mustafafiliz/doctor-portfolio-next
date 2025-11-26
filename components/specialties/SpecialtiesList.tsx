'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import { Container } from '@/components/Container';

export function SpecialtiesList() {
  const t = useTranslations('specialties');

  const specialties = [
    {
      id: 'glaucoma',
      title: t('glaucoma.title'),
      description: t('glaucoma.description'),
      details: 'Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır. Erken teşhis ve tedavi çok önemlidir.',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
    },
    {
      id: 'cataract',
      title: t('cataract.title'),
      description: t('cataract.description'),
      details: 'Katarakt cerrahisi günümüzde çok gelişmiş tekniklerle yapılmaktadır. Ameliyat sonrası hasta aynı gün evine dönebilir.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    },
    {
      id: 'infections',
      title: t('infections.title'),
      description: t('infections.description'),
      details: 'Göz enfeksiyonları doğru teşhis ve tedavi ile başarılı bir şekilde tedavi edilebilir.',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
    },
    {
      id: 'premiumLenses',
      title: t('premiumLenses.title'),
      description: t('premiumLenses.description'),
      details: 'Akıllı lensler ile hem uzak hem yakın görme sorunları tek ameliyatla çözülebilir.',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    },
    {
      id: 'trauma',
      title: t('trauma.title'),
      description: t('trauma.description'),
      details: 'Göz travmalarında zamanında müdahale görme kaybını önlemek için kritik öneme sahiptir.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=600&fit=crop',
    },
    {
      id: 'conjunctiva',
      title: t('conjunctiva.title'),
      description: t('conjunctiva.description'),
      details: 'Konjonktiva hastalıklarının modern cerrahi tekniklerle tedavisi.',
      image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=800&h=600&fit=crop',
    },
    {
      id: 'refractive',
      title: t('refractive.title'),
      description: t('refractive.description'),
      details: 'Refraktif lens cerrahisi ile gözlük ve kontakt lens bağımlılığından kurtulun.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
    },
  ];

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {t('title')}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground px-4">{t('subtitle')}</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {specialties.map((specialty) => {
          return (
            <div 
              key={specialty.id} 
              id={specialty.id} 
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block flex flex-col h-full"
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <div className="w-full h-52 relative bg-muted overflow-hidden">
                  <Image
                    src={specialty.image}
                    alt={specialty.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              
              {/* Content */}
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] group-hover:text-primary transition-colors duration-200">
                  {specialty.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed min-h-[3.5rem] sm:min-h-[4.5rem] flex-1">
                  {specialty.description}
                </p>
                <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">
                  {specialty.details}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </Container>
  );
}
