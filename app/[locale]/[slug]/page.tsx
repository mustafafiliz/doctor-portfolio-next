'use client';

import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { use } from 'react';
import { notFound } from 'next/navigation';
import specialtiesData from '@/data/specialties.json';

// JSON'dan uzmanlık verilerini al
const specialtyData: Record<string, {
  category: string;
  categorySlug: string;
  title: string;
  description: string;
  content: string;
  image: string;
  relatedPosts: { title: string; slug: string; }[];
}> = {};

// JSON'dan veriyi dönüştür
specialtiesData.specialties.forEach((specialty) => {
  const category = specialtiesData.categories.find(c => c.id === specialty.categoryId);
  specialtyData[specialty.slug] = {
    category: category?.title || '',
    categorySlug: category?.slug || '',
    title: specialty.title,
    description: specialty.description,
    content: specialty.content,
    image: specialty.image,
    relatedPosts: specialty.relatedSlugs.map(slug => {
      const related = specialtiesData.specialties.find(s => s.slug === slug);
      return { title: related?.title || '', slug };
    })
  };
});

// Geçerli slug'ları al (diğer sayfalarla çakışmaması için)
const validSlugs = specialtiesData.specialties.map(s => s.slug);

// Rezerve edilmiş slug'lar (diğer sayfalar)
const reservedSlugs = ['hakkimda', 'uzmanliklar', 'galeri', 'iletisim', 'sik-sorulan-sorular', 'blog'];

export default function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const pathname = usePathname();
  const currentLocale = (locale || pathname?.split('/')[1] || 'tr') as Locale;
  
  // Rezerve edilmiş slug ise 404
  if (reservedSlugs.includes(slug)) {
    notFound();
  }
  
  const specialty = specialtyData[slug];
  
  // Geçersiz slug ise 404
  if (!specialty) {
    notFound();
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
            <p className="text-white/80 flex items-center gap-2 text-sm flex-wrap">
              <Link href={`/${currentLocale}`} className="hover:text-white">Anasayfa</Link>
              <span>-</span>
              <Link href={`/${currentLocale}/uzmanliklar`} className="hover:text-white">Uzmanlıklar</Link>
              <span>-</span>
              <Link href={`/${currentLocale}/uzmanliklar?kategori=${specialty.categorySlug}`} className="hover:text-white">{specialty.category}</Link>
              <span>-</span>
              <span className="text-white">{specialty.title}</span>
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
              href={`/${currentLocale}/uzmanliklar?kategori=${specialty.categorySlug}`}
              className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              {specialty.category}
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
                    href={`/${currentLocale}/${post.slug}`}
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

