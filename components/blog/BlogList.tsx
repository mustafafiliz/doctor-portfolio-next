'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';
import { Calendar, ArrowRight } from 'lucide-react';
import { Container } from '@/components/Container';

export function BlogList() {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  // Placeholder blog posts - replace with actual data from API/CMS
  const posts = [
    {
      id: 1,
      slug: 'glokom-tedavisi',
      title: 'Glokom Tedavisi ve Önleme Yöntemleri',
      excerpt: 'Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır. Erken teşhis ve tedavi çok önemlidir.',
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
    },
    {
      id: 2,
      slug: 'katarakt-cerrahisi',
      title: 'Katarakt Cerrahisi: Modern Teknikler ve İyileşme Süreci',
      excerpt: 'Katarakt cerrahisi günümüzde çok gelişmiş tekniklerle yapılmaktadır. Ameliyat sonrası hasta aynı gün evine dönebilir.',
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    },
    {
      id: 3,
      slug: 'akilli-lensler',
      title: 'Akıllı Lensler ile Yaşam Kalitesi Artışı',
      excerpt: 'Akıllı lensler ile hem uzak hem yakın görme sorunları tek ameliyatla çözülebilir.',
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    },
    {
      id: 4,
      slug: 'goz-enfeksiyonlari',
      title: 'Göz Enfeksiyonları: Belirtiler, Tedavi ve Korunma Yöntemleri',
      excerpt: 'Göz enfeksiyonları doğru teşhis ve tedavi ile başarılı bir şekilde tedavi edilebilir. Erken müdahale görme kaybını önler.',
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
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
          {posts.map((post) => (
            <Link 
              key={post.id} 
              href={`/${currentLocale}${getRoute('blog', currentLocale)}/${post.slug}`}
              className="group bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 block flex flex-col h-full"
            >
              <div className="relative overflow-hidden">
                <div className="w-full h-52 relative bg-muted overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="p-4 sm:p-6 flex flex-col flex-1">
                <div className="flex items-center text-xs sm:text-sm text-muted-foreground mb-2 sm:mb-3">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2" />
                  {new Date(post.date).toLocaleDateString('tr-TR', { 
                    year: 'numeric', 
                    month: 'long', 
                    day: 'numeric' 
                  })}
                </div>
                <h2 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-gray-800 line-clamp-2 min-h-[3rem] sm:min-h-[3.5rem] group-hover:text-primary transition-colors duration-200">
                  {post.title}
                </h2>
                <p className="text-gray-600 line-clamp-3 mb-3 sm:mb-4 text-xs sm:text-sm leading-relaxed min-h-[3.5rem] sm:min-h-[4.5rem] flex-1">
                  {post.excerpt}
                </p>
                <div className="flex items-center text-black group-hover:text-primary font-medium group-hover:translate-x-2 transition-transform duration-200 mt-auto text-sm sm:text-base">
                  {t('readMore')}
                  <ArrowRight className="h-4 w-4 sm:h-5 sm:w-5 hidden group-hover:block transition-all duration-200 ml-1" />
                </div>
              </div>
            </Link>
          ))}
      </div>
    </Container>
  );
}
