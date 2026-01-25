'use client';

import { useState, useMemo } from 'react';
import { Container } from '@/components/Container';
import { GraduationCap, ExternalLink, FileText, BookOpen, Users, Award } from 'lucide-react';
import { allPublications, type Publication } from '@/data/publications';

type ActiveTab = 'international' | 'memberships' | 'editorships' | 'info';

export default function MakalelerPage() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<ActiveTab>('international');

  // Yıllara göre gruplandırma
  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, Publication[]> = {};
    allPublications.forEach(pub => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, []);

  // Yıl listesi (azalan sırada)
  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  // Seçili yıla göre filtreleme
  const filteredPublications = useMemo(() => {
    if (selectedYear === null) {
      return allPublications.sort((a, b) => b.year - a.year);
    }
    return publicationsByYear[selectedYear] || [];
  }, [selectedYear, publicationsByYear]);

  // Yıllara göre istatistikler
  const statsByYear = useMemo(() => {
    const stats: Record<number, number> = {};
    allPublications.forEach(pub => {
      stats[pub.year] = (stats[pub.year] || 0) + 1;
    });
    return stats;
  }, []);

  // Bilimsel Kuruluşlara Üyelikler
  const memberships = [
    'Türk Tabipler Birliği',
    'Türk Oftalmoji Derneği',
    'Türk Oftalmoji Derneği Glokom Birimi Aktif Üyeliği',
    'Türk Oftalmoji Derneği Oküler Travmatoloji ve Medikolegal Oftalmoloji Birimi Aktif Üyeliği',
    'Türk Oftalmoji Derneği Oküler Enfeksiyonlar Birimi Aktif Üyeliği',
    'Dünya Glokom Topluluğu (World Glaucoma Society) Üyeliği',
    'Avrupa Glokom Topluluğu (European Glaucoma Society) Üyeliği',
    'Amerikan Oftalmoloji Akademisi (American Academy of Ophthalmology) Üyeliği',
  ];

  // Editör Yardımcılığı
  const editorships = [
    'Glokom-Katarakt Dergisi',
  ];

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Yayınlanan Makaleler
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Prof. Dr. Kadriye Ufuk Elgin
          </p>
          <p className="text-lg text-gray-500">
            Toplam <span className="font-bold text-primary">{allPublications.length}</span> uluslararası hakemli makale
          </p>
        </div>

        {/* Modern Navigation Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          <button
            onClick={() => setActiveTab('international')}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              activeTab === 'international'
                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <FileText className={`w-8 h-8 ${activeTab === 'international' ? 'text-white' : 'text-primary'}`} />
              {activeTab === 'international' && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${activeTab === 'international' ? 'text-white' : 'text-gray-900'}`}>
              Uluslararası
            </h3>
            <p className={`text-sm ${activeTab === 'international' ? 'text-white/90' : 'text-gray-600'}`}>
              {allPublications.length} Makale
            </p>
          </button>

          <button
            onClick={() => setActiveTab('memberships')}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              activeTab === 'memberships'
                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <Users className={`w-8 h-8 ${activeTab === 'memberships' ? 'text-white' : 'text-primary'}`} />
              {activeTab === 'memberships' && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${activeTab === 'memberships' ? 'text-white' : 'text-gray-900'}`}>
              Üyelikler
            </h3>
            <p className={`text-sm ${activeTab === 'memberships' ? 'text-white/90' : 'text-gray-600'}`}>
              {memberships.length} Kuruluş
            </p>
          </button>

          <button
            onClick={() => setActiveTab('editorships')}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              activeTab === 'editorships'
                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <BookOpen className={`w-8 h-8 ${activeTab === 'editorships' ? 'text-white' : 'text-primary'}`} />
              {activeTab === 'editorships' && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${activeTab === 'editorships' ? 'text-white' : 'text-gray-900'}`}>
              Editörlük
            </h3>
            <p className={`text-sm ${activeTab === 'editorships' ? 'text-white/90' : 'text-gray-600'}`}>
              {editorships.length} Dergi
            </p>
          </button>

          <button
            onClick={() => setActiveTab('info')}
            className={`group relative p-6 rounded-xl border-2 transition-all duration-300 text-left ${
              activeTab === 'info'
                ? 'border-primary bg-primary text-white shadow-lg shadow-primary/20'
                : 'border-gray-200 bg-white hover:border-primary/50 hover:shadow-md'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <Award className={`w-8 h-8 ${activeTab === 'info' ? 'text-white' : 'text-primary'}`} />
              {activeTab === 'info' && (
                <span className="absolute top-3 right-3 w-2 h-2 bg-white rounded-full"></span>
              )}
            </div>
            <h3 className={`font-bold text-lg mb-1 ${activeTab === 'info' ? 'text-white' : 'text-gray-900'}`}>
              Bilgiler
            </h3>
            <p className={`text-sm ${activeTab === 'info' ? 'text-white/90' : 'text-gray-600'}`}>
              Erişim Adresleri
            </p>
          </button>
        </div>

        {/* Content Area */}
        {activeTab === 'international' && (
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar - Yıllara göre gruplandırma */}
              <aside className="lg:col-span-1">
                <div className="sticky top-24 bg-white rounded-lg border border-gray-200 p-6 shadow-sm">
                  <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                    <GraduationCap className="w-5 h-5 text-primary" />
                    Yıllara Göre
                  </h3>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto pr-2">
                    <button
                      onClick={() => setSelectedYear(null)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                        selectedYear === null
                          ? 'bg-primary text-white shadow-md'
                          : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Tüm Yıllar</span>
                        <span className={`text-sm font-semibold ${selectedYear === null ? 'text-white' : 'text-gray-600'}`}>
                          {allPublications.length}
                        </span>
                      </div>
                    </button>
                    {years.map(year => (
                      <button
                        key={year}
                        onClick={() => setSelectedYear(year)}
                        className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
                          selectedYear === year
                            ? 'bg-primary text-white shadow-md'
                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{year}</span>
                          <span className={`text-sm font-semibold ${selectedYear === year ? 'text-white' : 'text-gray-600'}`}>
                            {statsByYear[year]}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>

                  {/* Google Scholar Link */}
                  <div className="mt-6 pt-6 border-t border-gray-200">
                    <a
                      href="https://scholar.google.com/citations?hl=tr&user=rXphPsUAAAAJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-primary hover:text-primary/80 font-semibold text-sm transition-colors group"
                    >
                      <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                      Google Akademik Profili
                    </a>
                  </div>
                </div>
              </aside>

              {/* Main Content */}
              <div className="lg:col-span-3">
                {/* Selected Year Info */}
                {selectedYear && (
                  <div className="mb-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold text-primary">{selectedYear}</span> yılında{' '}
                      <span className="font-semibold">{statsByYear[selectedYear]}</span> makale yayınlanmıştır.
                    </p>
                  </div>
                )}

                {/* Publications List */}
                <div className="space-y-4">
                  {filteredPublications.map((pub) => (
                    <article
                      key={pub.id}
                      className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-lg transition-all duration-200 hover:border-primary/30"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <span className="px-3 py-1 bg-primary text-white text-sm font-bold rounded-full">
                              {pub.year}
                            </span>
                            {pub.journal && (
                              <span className="text-sm text-gray-500 italic font-medium">
                                {pub.journal}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                          {pub.volume && pub.pages && (
                            <p className="text-xs text-gray-500 font-medium">
                              {pub.volume}, {pub.pages}
                            </p>
                          )}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>

                {filteredPublications.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                    <p className="text-gray-500">Seçilen yıla ait makale bulunamadı.</p>
                  </div>
                )}
              </div>
            </div>
        )}

        {activeTab === 'memberships' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Users className="w-6 h-6 text-primary" />
                Bilimsel Kuruluşlara Üyelikler
              </h2>
              <ul className="space-y-3">
                {memberships.map((membership, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700 text-lg">{membership}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}

        {activeTab === 'editorships' && (
            <div className="bg-white rounded-lg border border-gray-200 p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <BookOpen className="w-6 h-6 text-primary" />
                Editör Yardımcılığı Yaptığım Dergiler
              </h2>
              <ul className="space-y-3">
                {editorships.map((editorship, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                    <span className="w-2 h-2 bg-primary rounded-full mt-2 shrink-0"></span>
                    <span className="text-gray-700 text-lg font-medium">{editorship}</span>
                  </li>
                ))}
              </ul>
            </div>
        )}

        {activeTab === 'info' && (
            <div className="space-y-6">
              <div className="bg-white rounded-lg border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <ExternalLink className="w-6 h-6 text-primary" />
                  Erişim Adresleri
                </h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">Google Akademik</h3>
                    <a
                      href="https://scholar.google.com/citations?hl=tr&user=rXphPsUAAAAJ"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2"
                    >
                      https://scholar.google.com/citations?hl=tr&user=rXphPsUAAAAJ
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-800 mb-2">LinkedIn</h3>
                    <a
                      href="https://www.linkedin.com/in/ufuk-elgin-96380b3a6/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 font-medium text-sm flex items-center gap-2"
                    >
                      https://www.linkedin.com/in/ufuk-elgin-96380b3a6/
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              </div>
            </div>
        )}
      </div>
    </Container>
  );
}
