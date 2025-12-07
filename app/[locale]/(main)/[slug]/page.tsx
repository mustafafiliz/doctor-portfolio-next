'use client';

import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';
import { use, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import specialtiesData from '@/data/specialties.json';

interface Config {
  colors: {
    primary: string;
  };
}

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

// Rezerve edilmiş slug'lar (diğer sayfalar)
const reservedSlugs = ['hakkimda', 'uzmanliklar', 'uzmanlik', 'galeri', 'iletisim', 'sik-sorulan-sorular', 'blog', 'admin'];

export default function SpecialtyDetailPage({ params }: { params: Promise<{ slug: string; locale: string }> }) {
  const { slug, locale } = use(params);
  const pathname = usePathname();
  const currentLocale = (locale || pathname?.split('/')[1] || 'tr') as Locale;
  const [config, setConfig] = useState<Config | null>(null);

  useEffect(() => {
    fetch('/api/config')
      .then((res) => res.json())
      .then((data) => setConfig(data));
  }, []);
  
  // Rezerve edilmiş slug ise 404
  if (reservedSlugs.includes(slug)) {
    notFound();
  }
  
  const specialty = specialtyData[slug];
  
  // Geçersiz slug ise 404
  if (!specialty) {
    notFound();
  }

  const primaryColor = config?.colors?.primary || '#144793';

  return (
    <>
      {/* Breadcrumb Header */}
      <section 
        className="py-6 sm:py-8"
        style={{ backgroundColor: primaryColor }}
      >
        <Container>
          <nav className="flex items-center gap-2 text-sm text-white/80 flex-wrap">
            <Link href={`/${currentLocale}`} className="hover:text-white transition-colors">
              Anasayfa
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <Link href={`/${currentLocale}/uzmanliklar`} className="hover:text-white transition-colors">
              Uzmanlıklar
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <Link 
              href={`/${currentLocale}/uzmanlik/${specialty.categorySlug}`} 
              className="hover:text-white transition-colors"
            >
              {specialty.category}
            </Link>
            <ChevronRight size={14} className="text-white/50" />
            <span className="text-white font-medium">{specialty.title}</span>
          </nav>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mt-3">
            {specialty.title}
          </h1>
        </Container>
      </section>

      {/* Content Section */}
      <Container className="py-12 sm:py-16">
        <div className="max-w-4xl mx-auto">
          {/* Back Button */}
          <div className="mb-8">
            <Link 
              href={`/${currentLocale}/uzmanlik/${specialty.categorySlug}`}
              className="inline-flex items-center text-gray-600 hover:text-primary transition-colors"
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
          <p className="text-lg text-gray-600 mb-8 leading-relaxed">
            {specialty.description}
          </p>

          {/* Content */}
          <div 
            className="prose prose-lg max-w-none mb-12"
            dangerouslySetInnerHTML={{ __html: specialty.content }}
          />

          {/* Related Posts */}
          {specialty.relatedPosts.length > 0 && (
            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-xl font-bold mb-6">Ilgili Konular</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {specialty.relatedPosts.map((post) => (
                  <Link
                    key={post.slug}
                    href={`/${currentLocale}/${post.slug}`}
                    className="flex items-center justify-between p-4 rounded-sm border border-gray-200 hover:border-primary/50 hover:bg-primary/5 transition-all group"
                  >
                    <span className="font-medium group-hover:text-primary transition-colors">
                      {post.title}
                    </span>
                    <ArrowRight className="h-4 w-4 text-gray-400 group-hover:text-primary transition-colors" />
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
