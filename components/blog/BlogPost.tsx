'use client';

import { useTranslations } from '@/components/I18nProvider';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Calendar, ArrowLeft } from 'lucide-react';
import { type Locale } from '@/lib/i18n';
import { getRoute } from '@/lib/routes';
import Image from 'next/image';

export function BlogPost({ slug, locale }: { slug: string; locale?: Locale }) {
  const t = useTranslations('blog');
  const pathname = usePathname();
  const currentLocale = locale || (pathname?.split('/')[1] || 'tr') as Locale;

  // In production, fetch blog post data by slug
  const posts: Record<string, any> = {
    'glokom-tedavisi': {
      title: 'Glokom Tedavisi ve Önleme Yöntemleri',
      excerpt: 'Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır. Erken teşhis ve tedavi çok önemlidir.',
      content: `
        <p><strong><u>Glokom Nedir?</u></strong></p>
        <p>Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır. Bu durum zamanla görme kaybına yol açabilir.</p>
        
        <p><strong><u>Glokom Tedavi Süreci</u></strong></p>
        <ol>
          <li><strong>Erken Teşhis</strong>: Düzenli göz muayeneleri ile glokom erken dönemde tespit edilebilir.</li>
          <li><strong>İlaç Tedavisi</strong>: Göz damlaları ile göz içi basıncı kontrol altına alınır.</li>
          <li><strong>Lazer Tedavisi</strong>: İlaç tedavisi yeterli olmadığında lazer uygulanabilir.</li>
          <li><strong>Cerrahi Müdahale</strong>: Gerekli durumlarda cerrahi işlem yapılabilir.</li>
          <li><strong>Düzenli Takip</strong>: Tedavi sonrası düzenli kontroller çok önemlidir.</li>
        </ol>
        
        <p>Glokom tedavisinde erken teşhis ve düzenli takip çok önemlidir. Göz sağlığınız için düzenli muayene olmayı ihmal etmeyin.</p>
      `,
      date: '2024-01-15',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=600&fit=crop',
    },
    'katarakt-cerrahisi': {
      title: 'Katarakt Cerrahisi: Modern Teknikler ve İyileşme Süreci',
      excerpt: 'Katarakt cerrahisi günümüzde çok gelişmiş tekniklerle yapılmaktadır. Ameliyat sonrası hasta aynı gün evine dönebilir.',
      content: `
        <p><strong><u>Katarakt Nedir?</u></strong></p>
        <p>Katarakt, göz merceğinin saydamlığını yitirmesi sonucu görme kaybına neden olan bir hastalıktır. Genellikle yaşlanma ile birlikte ortaya çıkar.</p>
        
        <p><strong><u>Katarakt Cerrahisi Süreci</u></strong></p>
        <ol>
          <li><strong>Ön Muayene</strong>: Detaylı göz muayenesi ve görüntüleme testleri yapılır.</li>
          <li><strong>Ameliyat Öncesi Hazırlık</strong>: Hasta ameliyata hazırlanır ve gerekli önlemler alınır.</li>
          <li><strong>Cerrahi İşlem</strong>: Modern fakoemülsifikasyon tekniği ile bulanık lens çıkarılır ve yerine yapay lens yerleştirilir.</li>
          <li><strong>Ameliyat Sonrası</strong>: Hasta aynı gün evine dönebilir ve günlük aktivitelerine kısa sürede dönebilir.</li>
          <li><strong>Takip</strong>: Düzenli kontroller ile iyileşme süreci takip edilir.</li>
        </ol>
        
        <p>Katarakt cerrahisi günümüzde çok güvenli ve başarılı bir şekilde uygulanmaktadır. Modern teknikler sayesinde hasta konforu maksimum seviyededir.</p>
      `,
      date: '2024-01-10',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=600&fit=crop',
    },
    'akilli-lensler': {
      title: 'Akıllı Lensler ile Yaşam Kalitesi Artışı',
      excerpt: 'Akıllı lensler ile hem uzak hem yakın görme sorunları tek ameliyatla çözülebilir.',
      content: `
        <p><strong><u>Akıllı Lensler Nedir?</u></strong></p>
        <p>Akıllı lensler (premium göz içi lensler), hem uzak hem yakın görme sorunlarını tek ameliyatla çözen gelişmiş lens teknolojisidir.</p>
        
        <p><strong><u>Akıllı Lens Avantajları</u></strong></p>
        <ol>
          <li><strong>Çok Odaklı Görüş</strong>: Uzak, orta ve yakın mesafelerde net görüş sağlar.</li>
          <li><strong>Gözlük Bağımsızlığı</strong>: Ameliyat sonrası gözlük kullanımına gerek kalmaz.</li>
          <li><strong>Yaşam Kalitesi</strong>: Günlük aktivitelerde maksimum konfor sağlar.</li>
          <li><strong>Uzun Ömürlü</strong>: Ömür boyu kullanılabilir.</li>
        </ol>
        
        <p>Akıllı lensler ile yaşam kalitenizi artırın ve gözlük bağımlılığından kurtulun.</p>
      `,
      date: '2024-01-05',
      image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=600&fit=crop',
    },
    'goz-enfeksiyonlari': {
      title: 'Göz Enfeksiyonları: Belirtiler, Tedavi ve Korunma Yöntemleri',
      excerpt: 'Göz enfeksiyonları doğru teşhis ve tedavi ile başarılı bir şekilde tedavi edilebilir. Erken müdahale görme kaybını önler.',
      content: `
        <p><strong><u>Göz Enfeksiyonları Nedir?</u></strong></p>
        <p>Göz enfeksiyonları bakteri, virüs veya mantar kaynaklı olabilir ve uygun tedavi gerektirir.</p>
        
        <p><strong><u>Göz Enfeksiyonu Belirtileri</u></strong></p>
        <ol>
          <li><strong>Kızarıklık</strong>: Gözde kızarıklık ve tahriş</li>
          <li><strong>Kaşıntı</strong>: Sürekli kaşıntı hissi</li>
          <li><strong>Akıntı</strong>: Gözden akıntı ve çapaklanma</li>
          <li><strong>Bulanık Görüş</strong>: Görme kalitesinde azalma</li>
        </ol>
        
        <p>Erken teşhis ve tedavi ile göz enfeksiyonları başarılı bir şekilde tedavi edilebilir.</p>
      `,
      date: '2024-01-01',
      image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=600&fit=crop',
    },
  };

  const post = posts[slug] || posts['glokom-tedavisi'];

  return (
    <main className="container mx-auto px-4 pt-5 pb-16 md:pb-24">
      {/* Back Button */}
      <div className="mb-6 max-w-4xl mx-auto">
        <Link 
          href={`/${currentLocale}${getRoute('blog', currentLocale)}`}
          className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Tüm Blog Yazıları
        </Link>
      </div>

      {/* Article */}
      <article className="max-w-4xl mx-auto">
        <h2 className="text-xl md:text-2xl font-bold mb-6">{post.title}</h2>
        
        {/* Featured Image */}
        <div className="mb-8">
          <div className="relative w-full h-64 md:h-96 rounded-sm shadow-lg overflow-hidden bg-muted">
            {post.image ? (
              <Image
                src={post.image}
                alt={post.title}
                fill
                className="object-cover"
                unoptimized
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-muted-foreground bg-gradient-to-br from-primary/10 to-accent/10">
                <span className="text-2xl">📸</span>
              </div>
            )}
          </div>
        </div>

        {/* Excerpt */}
        <div className="text-lg text-muted-foreground font-medium mb-8 leading-relaxed">
          {post.excerpt}
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <div 
            dangerouslySetInnerHTML={{ __html: post.content }}
            className="text-gray-700 leading-relaxed"
          />
        </div>

        {/* Date */}
        <div className="mt-8 pt-8 border-t flex items-center text-sm text-muted-foreground">
          <Calendar className="h-4 w-4 mr-2" />
          {t('published')}: {new Date(post.date).toLocaleDateString('tr-TR', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
          })}
        </div>
      </article>
    </main>
  );
}
