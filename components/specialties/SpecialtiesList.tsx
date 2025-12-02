'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import Link from 'next/link';
import { Container } from '@/components/Container';
import { useState, useEffect } from 'react';
import { usePathname, useSearchParams, useRouter } from 'next/navigation';
import { type Locale } from '@/lib/i18n';
import { ChevronRight, Filter, X } from 'lucide-react';
import specialtiesData from '@/data/specialties.json';

export function SpecialtiesList() {
  const t = useTranslations('specialties');
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const router = useRouter();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;
  
  // URL'den kategori parametresini al
  const categoryFromUrl = searchParams.get('kategori');
  const initialCategory = categoryFromUrl 
    ? specialtiesData.categories.find(c => c.slug === categoryFromUrl)?.id || null
    : null;
  
  const [selectedCategory, setSelectedCategory] = useState<string | null>(initialCategory);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // URL değiştiğinde kategoriyi güncelle
  useEffect(() => {
    const categorySlug = searchParams.get('kategori');
    if (categorySlug) {
      const category = specialtiesData.categories.find(c => c.slug === categorySlug);
      setSelectedCategory(category?.id || null);
    } else {
      setSelectedCategory(null);
    }
  }, [searchParams]);

  // JSON'dan kategorileri ve uzmanlıkları al
  const categories = specialtiesData.categories;
  const allSpecialties = specialtiesData.specialties;

  // Filtrelenmiş uzmanlıklar
  const filteredSpecialties = selectedCategory
    ? allSpecialties.filter(s => s.categoryId === selectedCategory)
    : allSpecialties;

  // Kategori seçimi - URL'i de güncelle
  const handleCategorySelect = (categoryId: string | null) => {
    setSelectedCategory(categoryId);
    setMobileFilterOpen(false);
    
    // URL'i güncelle
    if (categoryId) {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        router.push(`/${currentLocale}/uzmanliklar?kategori=${category.slug}`, { scroll: false });
      }
    } else {
      router.push(`/${currentLocale}/uzmanliklar`, { scroll: false });
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-6 sm:py-8 md:py-10" style={{ backgroundColor: '#144793' }}>
        <Container>
          <div className="text-white">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4">
              {t('title')}
            </h1>
            <p className="text-white/80 flex items-center gap-2 text-sm">
              <Link href={`/${currentLocale}`} className="hover:text-white">Anasayfa</Link>
              <span>-</span>
              <span>Uzmanlıklar</span>
            </p>
          </div>
        </Container>
      </section>

      <Container className="py-8 sm:py-12 md:py-16">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Mobile Filter Button */}
          <button
            onClick={() => setMobileFilterOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-sm font-medium"
          >
            <Filter className="h-4 w-4" />
            Kategorileri Filtrele
          </button>

          {/* Mobile Filter Overlay */}
          {mobileFilterOpen && (
            <div className="fixed inset-0 z-50 lg:hidden">
              <div 
                className="absolute inset-0 bg-black/50"
                onClick={() => setMobileFilterOpen(false)}
              />
              <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-background p-6 shadow-xl overflow-y-auto">
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-lg font-bold">Kategoriler</h3>
                  <button
                    onClick={() => setMobileFilterOpen(false)}
                    className="p-1 hover:bg-muted rounded-sm"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-2">
                  <button
                    onClick={() => handleCategorySelect(null)}
                    className={`w-full text-left px-4 py-3 rounded-sm transition-colors ${
                      selectedCategory === null
                        ? 'bg-primary text-white'
                        : 'hover:bg-muted'
                    }`}
                  >
                    Tümü ({allSpecialties.length})
                  </button>
                  {categories.map((category) => {
                    const count = allSpecialties.filter(s => s.categoryId === category.id).length;
                    return (
                      <button
                        key={category.id}
                        onClick={() => handleCategorySelect(category.id)}
                        className={`w-full text-left px-4 py-3 rounded-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-primary text-white'
                            : 'hover:bg-muted'
                        }`}
                      >
                        {category.title} ({count})
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* Desktop Sidebar Filter */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <div className="sticky top-28 bg-background border border-border/50 rounded-sm p-6">
              <h3 className="text-lg font-bold mb-4">Kategoriler</h3>
              <div className="space-y-1">
                <button
                  onClick={() => handleCategorySelect(null)}
                  className={`w-full text-left px-4 py-2.5 rounded-sm transition-colors text-sm ${
                    selectedCategory === null
                      ? 'bg-primary text-white'
                      : 'hover:bg-muted'
                  }`}
                >
                  Tümü ({allSpecialties.length})
                </button>
                {categories.map((category) => {
                  const count = allSpecialties.filter(s => s.categoryId === category.id).length;
                  return (
                    <button
                      key={category.id}
                      onClick={() => handleCategorySelect(category.id)}
                      className={`w-full text-left px-4 py-2.5 rounded-sm transition-colors text-sm ${
                        selectedCategory === category.id
                          ? 'bg-primary text-white'
                          : 'hover:bg-muted'
                      }`}
                    >
                      {category.title} ({count})
                    </button>
                  );
                })}
              </div>

              {/* Category Description */}
              {selectedCategory && (
                <div className="mt-6 pt-6 border-t border-border/50">
                  <p className="text-sm text-muted-foreground">
                    {categories.find(c => c.id === selectedCategory)?.description}
                  </p>
                </div>
              )}
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-muted-foreground">
                <span className="font-semibold text-foreground">{filteredSpecialties.length}</span> sonuç bulundu
                {selectedCategory && (
                  <span className="ml-2">
                    - <span className="text-primary">{categories.find(c => c.id === selectedCategory)?.title}</span>
                  </span>
                )}
              </p>
              {selectedCategory && (
                <button
                  onClick={() => setSelectedCategory(null)}
                  className="text-sm text-primary hover:underline"
                >
                  Filtreyi Temizle
                </button>
              )}
            </div>

            {/* Specialties Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4 sm:gap-6">
              {filteredSpecialties.map((specialty) => {
                const category = categories.find(c => c.id === specialty.categoryId);
                return (
                  <Link
                    key={specialty.slug}
                    href={`/${currentLocale}/${specialty.slug}`}
                    className="group bg-white rounded-sm shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 flex flex-col h-full"
                  >
                    {/* Image */}
                    <div className="relative overflow-hidden">
                      <div className="w-full h-48 relative bg-muted overflow-hidden">
                        <Image
                          src={specialty.image}
                          alt={specialty.title}
                          fill
                          className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                          unoptimized
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                      {/* Category Badge */}
                      <div className="absolute top-3 left-3">
                        <span className="px-2 py-1 bg-primary/90 text-white text-xs rounded-sm">
                          {category?.title}
                        </span>
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="p-4 sm:p-5 flex flex-col flex-1">
                      <h2 className="text-base sm:text-lg font-semibold mb-2 text-gray-800 line-clamp-2 group-hover:text-primary transition-colors duration-200">
                        {specialty.title}
                      </h2>
                      <p className="text-gray-600 line-clamp-3 text-sm leading-relaxed flex-1">
                        {specialty.description}
                      </p>
                      <div className="mt-4 flex items-center text-primary text-sm font-medium">
                        Detaylı Bilgi
                        <ChevronRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* Empty State */}
            {filteredSpecialties.length === 0 && (
              <div className="text-center py-12">
                <p className="text-muted-foreground">Bu kategoride henüz içerik bulunmuyor.</p>
              </div>
            )}
          </div>
        </div>
      </Container>
    </>
  );
}
