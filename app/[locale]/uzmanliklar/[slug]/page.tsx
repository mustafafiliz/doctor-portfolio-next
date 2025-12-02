'use client';

import { useTranslations } from '@/components/I18nProvider';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Calendar, ArrowRight } from 'lucide-react';
import { use } from 'react';

// Uzmanlık kategorileri ve detayları
const specialtyData: Record<string, {
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  relatedPosts: { title: string; slug: string; }[];
}> = {
  // Glokom kategorisi
  'glokom-nedir': {
    category: 'Glokom (Göz Tansiyonu)',
    categorySlug: 'glokom',
    title: 'Glokom Nedir?',
    description: 'Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır.',
    content: `
      <h2>Glokom Nedir?</h2>
      <p>Glokom, göz içi basıncının yükselmesi sonucu görme sinirinde hasar oluşmasıdır. Bu durum zamanla görme kaybına yol açabilir. Glokom, dünya genelinde körlüğün önde gelen nedenlerinden biridir.</p>
      
      <h2>Glokom Belirtileri</h2>
      <p>Glokomun erken evreleri genellikle belirtisiz seyreder. Bu nedenle düzenli göz muayeneleri çok önemlidir. İleri evrelerde şu belirtiler görülebilir:</p>
      <ul>
        <li>Çevresel görme kaybı</li>
        <li>Tünel görüşü</li>
        <li>Göz ağrısı ve baş ağrısı</li>
        <li>Bulantı ve kusma</li>
        <li>Işık çevresinde haleler görme</li>
      </ul>
      
      <h2>Risk Faktörleri</h2>
      <p>Glokom için risk faktörleri arasında yaş, aile öyküsü, yüksek göz içi basıncı, miyopi, diyabet ve uzun süreli kortikosteroid kullanımı sayılabilir.</p>
    `,
    image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Glokom Tedavisi', slug: 'glokom-tedavisi' },
      { title: 'Glokom Lazer Tedavisi', slug: 'glokom-lazer-tedavisi' },
    ]
  },
  'glokom-tedavisi': {
    category: 'Glokom (Göz Tansiyonu)',
    categorySlug: 'glokom',
    title: 'Glokom Tedavisi',
    description: 'Glokom tedavisinde göz damlaları, lazer ve cerrahi yöntemler kullanılmaktadır.',
    content: `
      <h2>Glokom Tedavi Yöntemleri</h2>
      <p>Glokom tedavisinde amaç, göz içi basıncını düşürerek görme sinirindeki hasarı durdurmak veya yavaşlatmaktır.</p>
      
      <h2>İlaç Tedavisi</h2>
      <p>Glokom tedavisinde ilk tercih genellikle göz damlaları olur. Bu damlalar göz içi basıncını düşürmeye yardımcı olur. Düzenli kullanım çok önemlidir.</p>
      
      <h2>Lazer Tedavisi</h2>
      <p>İlaç tedavisinin yeterli olmadığı durumlarda lazer tedavisi uygulanabilir. SLT (Selektif Lazer Trabeküloplasti) en yaygın kullanılan lazer yöntemidir.</p>
      
      <h2>Cerrahi Tedavi</h2>
      <p>İlaç ve lazer tedavilerinin yeterli olmadığı durumlarda cerrahi müdahale gerekebilir. Trabekülektomi ve tüp şant ameliyatları en sık uygulanan cerrahi yöntemlerdir.</p>
    `,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Glokom Nedir?', slug: 'glokom-nedir' },
      { title: 'Glokom Lazer Tedavisi', slug: 'glokom-lazer-tedavisi' },
    ]
  },
  'glokom-lazer-tedavisi': {
    category: 'Glokom (Göz Tansiyonu)',
    categorySlug: 'glokom',
    title: 'Glokom Lazer Tedavisi (SLT)',
    description: 'SLT, glokom tedavisinde kullanılan etkili ve güvenli bir lazer yöntemidir.',
    content: `
      <h2>SLT Lazer Tedavisi Nedir?</h2>
      <p>Selektif Lazer Trabeküloplasti (SLT), glokom tedavisinde kullanılan modern bir lazer yöntemidir. Göz içi sıvısının drenajını iyileştirerek göz içi basıncını düşürür.</p>
      
      <h2>İşlem Nasıl Yapılır?</h2>
      <p>SLT işlemi poliklinikte, lokal anestezi ile yapılır. İşlem yaklaşık 5-10 dakika sürer ve ağrısızdır. Hasta aynı gün evine dönebilir.</p>
      
      <h2>Avantajları</h2>
      <ul>
        <li>Güvenli ve etkili</li>
        <li>Tekrarlanabilir</li>
        <li>Göz damlası kullanımını azaltabilir</li>
        <li>Minimal yan etki</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Glokom Nedir?', slug: 'glokom-nedir' },
      { title: 'Glokom Tedavisi', slug: 'glokom-tedavisi' },
    ]
  },
  
  // Katarakt kategorisi
  'katarakt-nedir': {
    category: 'Katarakt',
    categorySlug: 'katarakt',
    title: 'Katarakt Nedir?',
    description: 'Katarakt, göz merceğinin saydamlığını yitirmesi sonucu görme kaybına neden olan bir hastalıktır.',
    content: `
      <h2>Katarakt Nedir?</h2>
      <p>Katarakt, göz merceğinin saydamlığını yitirmesi sonucu görme kaybına neden olan bir hastalıktır. Genellikle yaşlanma ile birlikte ortaya çıkar ancak travma, diyabet veya bazı ilaçlar da katarakta neden olabilir.</p>
      
      <h2>Katarakt Belirtileri</h2>
      <ul>
        <li>Bulanık veya sisli görme</li>
        <li>Gece görüşünde zorluk</li>
        <li>Işığa hassasiyet</li>
        <li>Renklerin soluk görünmesi</li>
        <li>Çift görme</li>
      </ul>
      
      <h2>Tedavi</h2>
      <p>Kataraktın tek tedavisi cerrahidir. Modern katarakt cerrahisi çok gelişmiş ve güvenli bir işlemdir. Ameliyat sonrası hasta aynı gün evine dönebilir.</p>
    `,
    image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Katarakt Ameliyatı', slug: 'katarakt-ameliyati' },
      { title: 'Akıllı Lensler', slug: 'akilli-lensler' },
    ]
  },
  'katarakt-ameliyati': {
    category: 'Katarakt',
    categorySlug: 'katarakt',
    title: 'Katarakt Ameliyatı',
    description: 'Katarakt ameliyatı, bulanık göz merceğinin çıkarılıp yerine yapay lens yerleştirilmesi işlemidir.',
    content: `
      <h2>Katarakt Ameliyatı Nasıl Yapılır?</h2>
      <p>Katarakt ameliyatı, fakoemülsifikasyon yöntemi ile yapılır. Bu yöntemde ultrasonik dalgalar kullanılarak bulanık mercek parçalanır ve emilir. Ardından yerine yapay göz içi lensi (IOL) yerleştirilir.</p>
      
      <h2>Ameliyat Süreci</h2>
      <ul>
        <li>Ameliyat yaklaşık 15-20 dakika sürer</li>
        <li>Lokal anestezi ile yapılır</li>
        <li>Hasta aynı gün evine döner</li>
        <li>İyileşme süreci hızlıdır</li>
      </ul>
      
      <h2>Ameliyat Sonrası</h2>
      <p>Ameliyat sonrası birkaç gün göz damlası kullanılır. Çoğu hasta birkaç gün içinde normal aktivitelerine dönebilir. Tam iyileşme 4-6 hafta sürer.</p>
    `,
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Katarakt Nedir?', slug: 'katarakt-nedir' },
      { title: 'Akıllı Lensler', slug: 'akilli-lensler' },
    ]
  },
  'akilli-lensler': {
    category: 'Katarakt',
    categorySlug: 'katarakt',
    title: 'Akıllı Lensler (Premium IOL)',
    description: 'Akıllı lensler, katarakt ameliyatında kullanılan ve hem uzak hem yakın görmeyi düzelten premium lenslerdir.',
    content: `
      <h2>Akıllı Lensler Nedir?</h2>
      <p>Akıllı lensler (Premium IOL), katarakt ameliyatında standart lenslerin yerine kullanılabilen gelişmiş göz içi lensleridir. Bu lensler hem uzak hem yakın görmeyi düzeltebilir.</p>
      
      <h2>Lens Çeşitleri</h2>
      <ul>
        <li><strong>Multifokal Lensler:</strong> Uzak, orta ve yakın mesafelerde net görüş sağlar</li>
        <li><strong>EDOF Lensler:</strong> Genişletilmiş odak derinliği sunar</li>
        <li><strong>Torik Lensler:</strong> Astigmatı da düzeltir</li>
        <li><strong>Trifocal Lensler:</strong> Üç farklı mesafede net görüş</li>
      </ul>
      
      <h2>Avantajları</h2>
      <p>Akıllı lensler ile ameliyat sonrası gözlük bağımlılığı önemli ölçüde azalır veya tamamen ortadan kalkar.</p>
    `,
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Katarakt Nedir?', slug: 'katarakt-nedir' },
      { title: 'Katarakt Ameliyatı', slug: 'katarakt-ameliyati' },
    ]
  },
  
  // Retina kategorisi
  'sari-nokta-hastaligi': {
    category: 'Retina Hastalıkları',
    categorySlug: 'retina',
    title: 'Sarı Nokta Hastalığı (Maküla Dejenerasyonu)',
    description: 'Sarı nokta hastalığı, retinanın merkezi bölgesinin hasar görmesi sonucu görme kaybına neden olur.',
    content: `
      <h2>Sarı Nokta Hastalığı Nedir?</h2>
      <p>Sarı nokta hastalığı (Yaşa Bağlı Maküla Dejenerasyonu - YBMD), retinanın merkezi bölgesi olan makülada hasar oluşması sonucu merkezi görmenin bozulmasıdır.</p>
      
      <h2>Tipleri</h2>
      <ul>
        <li><strong>Kuru Tip:</strong> Daha yaygın, yavaş ilerler</li>
        <li><strong>Yaş Tip:</strong> Daha az yaygın ama daha agresif</li>
      </ul>
      
      <h2>Belirtiler</h2>
      <ul>
        <li>Merkezi görme kaybı</li>
        <li>Düz çizgilerin eğri görünmesi</li>
        <li>Okuma güçlüğü</li>
        <li>Yüz tanıma zorluğu</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Diyabetik Retinopati', slug: 'diyabetik-retinopati' },
      { title: 'Retina Dekolmanı', slug: 'retina-dekolmani' },
    ]
  },
  'diyabetik-retinopati': {
    category: 'Retina Hastalıkları',
    categorySlug: 'retina',
    title: 'Diyabetik Retinopati',
    description: 'Diyabetik retinopati, şeker hastalığının gözde yol açtığı damar hasarıdır.',
    content: `
      <h2>Diyabetik Retinopati Nedir?</h2>
      <p>Diyabetik retinopati, şeker hastalığının retina damarlarında yol açtığı hasardır. Diyabetin en önemli göz komplikasyonudur ve tedavi edilmezse körlüğe yol açabilir.</p>
      
      <h2>Evreleri</h2>
      <ul>
        <li>Hafif nonproliferatif</li>
        <li>Orta nonproliferatif</li>
        <li>Şiddetli nonproliferatif</li>
        <li>Proliferatif</li>
      </ul>
      
      <h2>Tedavi</h2>
      <p>Tedavi seçenekleri arasında lazer tedavisi, göz içi iğne uygulamaları ve vitrektomi cerrahisi bulunur. En önemli tedavi ise kan şekerinin kontrol altında tutulmasıdır.</p>
    `,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Sarı Nokta Hastalığı', slug: 'sari-nokta-hastaligi' },
      { title: 'Retina Dekolmanı', slug: 'retina-dekolmani' },
    ]
  },
  'retina-dekolmani': {
    category: 'Retina Hastalıkları',
    categorySlug: 'retina',
    title: 'Retina Dekolmanı',
    description: 'Retina dekolmanı, retinanın altındaki dokudan ayrılmasıdır ve acil tedavi gerektirir.',
    content: `
      <h2>Retina Dekolmanı Nedir?</h2>
      <p>Retina dekolmanı, retinanın altındaki pigment epitelinden ayrılmasıdır. Bu durum acil tedavi gerektiren ciddi bir göz problemidir.</p>
      
      <h2>Belirtiler</h2>
      <ul>
        <li>Ani şimşek çakması görme</li>
        <li>Uçuşan cisimler (floaters)</li>
        <li>Görme alanında perde inmesi</li>
        <li>Ani görme kaybı</li>
      </ul>
      
      <h2>Tedavi</h2>
      <p>Retina dekolmanı tedavisi cerrahidir. Pnömatik retinopeksi, skleral çökertme veya vitrektomi yöntemleri uygulanabilir. Erken tedavi görme kaybını önlemek için kritiktir.</p>
    `,
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Sarı Nokta Hastalığı', slug: 'sari-nokta-hastaligi' },
      { title: 'Diyabetik Retinopati', slug: 'diyabetik-retinopati' },
    ]
  },
  
  // Göz Rahatsızlıkları kategorisi
  'kuru-goz-tedavisi': {
    category: 'Göz Rahatsızlıkları',
    categorySlug: 'goz-rahatsizliklari',
    title: 'Kuru Göz Tedavisi',
    description: 'Kuru göz sendromu, gözyaşı üretiminin yetersiz olması veya gözyaşının hızlı buharlaşması sonucu oluşur.',
    content: `
      <h2>Kuru Göz Sendromu Nedir?</h2>
      <p>Kuru göz sendromu, gözyaşı filminin yeterli olmaması veya kalitesinin bozulması sonucu gözlerin yeterince nemlenmemesidir.</p>
      
      <h2>Belirtiler</h2>
      <ul>
        <li>Yanma ve batma hissi</li>
        <li>Kızarıklık</li>
        <li>Bulanık görme</li>
        <li>Işığa hassasiyet</li>
        <li>Göz yorgunluğu</li>
      </ul>
      
      <h2>Tedavi Seçenekleri</h2>
      <ul>
        <li>Suni gözyaşı damlaları</li>
        <li>Gözyaşı kanalı tıkaçları</li>
        <li>Isıtma ve masaj tedavisi</li>
        <li>Omega-3 takviyeleri</li>
        <li>Yaşam tarzı değişiklikleri</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Göz Enfeksiyonları', slug: 'goz-enfeksiyonlari' },
      { title: 'Göz Alerjisi', slug: 'goz-alerjisi' },
    ]
  },
  'goz-enfeksiyonlari': {
    category: 'Göz Rahatsızlıkları',
    categorySlug: 'goz-rahatsizliklari',
    title: 'Göz Enfeksiyonları',
    description: 'Göz enfeksiyonları bakteri, virüs veya mantar kaynaklı olabilir ve uygun tedavi gerektirir.',
    content: `
      <h2>Göz Enfeksiyonları</h2>
      <p>Göz enfeksiyonları, gözün farklı bölgelerini etkileyebilen bakteri, virüs veya mantar kaynaklı hastalıklardır.</p>
      
      <h2>Yaygın Enfeksiyon Tipleri</h2>
      <ul>
        <li><strong>Konjonktivit:</strong> Göz akı iltihabı</li>
        <li><strong>Blefarit:</strong> Göz kapağı iltihabı</li>
        <li><strong>Keratit:</strong> Kornea iltihabı</li>
        <li><strong>Arpacık:</strong> Göz kapağında iltihaplı şişlik</li>
      </ul>
      
      <h2>Tedavi</h2>
      <p>Tedavi enfeksiyonun türüne göre değişir. Antibiyotik, antiviral veya antifungal ilaçlar kullanılabilir. Erken tedavi komplikasyonları önler.</p>
    `,
    image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Kuru Göz Tedavisi', slug: 'kuru-goz-tedavisi' },
      { title: 'Göz Alerjisi', slug: 'goz-alerjisi' },
    ]
  },
  'goz-alerjisi': {
    category: 'Göz Rahatsızlıkları',
    categorySlug: 'goz-rahatsizliklari',
    title: 'Göz Alerjisi',
    description: 'Göz alerjisi, alerjenlerle temas sonucu gözlerde kaşıntı, kızarıklık ve sulanma ile karakterizedir.',
    content: `
      <h2>Göz Alerjisi Nedir?</h2>
      <p>Göz alerjisi (alerjik konjonktivit), polen, toz, hayvan tüyü gibi alerjenlerle temas sonucu oluşan bir reaksiyondur.</p>
      
      <h2>Belirtiler</h2>
      <ul>
        <li>Şiddetli kaşıntı</li>
        <li>Kızarıklık</li>
        <li>Sulanma</li>
        <li>Şişlik</li>
        <li>Yanma hissi</li>
      </ul>
      
      <h2>Tedavi ve Korunma</h2>
      <ul>
        <li>Alerjenlerden kaçınma</li>
        <li>Antihistaminik göz damlaları</li>
        <li>Soğuk kompres</li>
        <li>Suni gözyaşı damlaları</li>
        <li>Gerekirse sistemik antihistaminikler</li>
      </ul>
    `,
    image: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=600&fit=crop',
    relatedPosts: [
      { title: 'Kuru Göz Tedavisi', slug: 'kuru-goz-tedavisi' },
      { title: 'Göz Enfeksiyonları', slug: 'goz-enfeksiyonlari' },
    ]
  },
};

export default function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const pathname = usePathname();
  const currentLocale = (locale || pathname?.split('/')[1] || 'tr') as Locale;
  
  const specialty = specialtyData[slug];
  
  if (!specialty) {
    return (
      <Container className="py-20">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Sayfa Bulunamadı</h1>
          <Link href={`/${currentLocale}/uzmanliklar`} className="text-primary hover:underline">
            Uzmanlıklar sayfasına dön
          </Link>
        </div>
      </Container>
    );
  }

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-10" style={{ backgroundColor: '#144793' }}>
        <Container>
          <div className="text-white">
            <p className="text-sm text-white/80 mb-2">{specialty.category}</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {specialty.title}
            </h1>
            <p className="text-white/80 flex items-center gap-2 text-sm">
              <Link href={`/${currentLocale}`} className="hover:text-white">Anasayfa</Link>
              <span>-</span>
              <Link href={`/${currentLocale}/uzmanliklar`} className="hover:text-white">Uzmanlıklar</Link>
              <span>-</span>
              <span>{specialty.category}</span>
            </p>
          </div>
        </Container>
      </section>

      {/* Content Section */}
      <Container className="py-12 sm:py-16 md:py-20">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href={`/${currentLocale}/uzmanliklar`}
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Tüm Uzmanlıklar
            </Link>
          </div>

          {/* Featured Image */}
          <div className="relative w-full h-64 sm:h-80 md:h-96 rounded-sm overflow-hidden mb-8">
            <Image
              src={specialty.image}
              alt={specialty.title}
              fill
              className="object-cover"
              unoptimized
            />
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            {specialty.description}
          </p>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: specialty.content }}
          />

          {/* Related Posts */}
          {specialty.relatedPosts.length > 0 && (
            <div className="border-t border-border/50 pt-8">
              <h3 className="text-xl font-bold mb-6">İlgili Konular</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialty.relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${currentLocale}/uzmanliklar/${post.slug}`}
                    className="flex items-center justify-between p-4 rounded-sm border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </>
  );
}

