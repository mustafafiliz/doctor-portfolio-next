"use client";

import { useState, useMemo } from "react";
import { Container } from "@/components/Container";
import {
  GraduationCap,
  ExternalLink,
  FileText,
  BookOpen,
  Users,
  Award,
  Presentation,
  Calendar,
} from "lucide-react";
import { allPublications, type Publication } from "@/data/publications";

type CategoryType =
  | "international-articles"
  | "national-articles"
  | "international-conferences"
  | "national-conferences"
  | "panels"
  | "books"
  | "editorships"
  | "memberships"
  | "other-meetings";

interface Category {
  id: CategoryType;
  title: string;
  subtitle?: string;
  count: number;
  icon: any;
}

export default function MakalelerPage() {
  const [selectedCategory, setSelectedCategory] = useState<CategoryType>(
    "international-articles",
  );
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  // Kategoriler
  const categories: Category[] = [
    {
      id: "international-articles",
      title: "A. Uluslararası Hakemli Dergilerde Yayımlanan Makaleler",
      count: 84,
      icon: FileText,
    },
    {
      id: "national-articles",
      title: "B. Ulusal Hakemli Dergilerde Yayımlanan Makaleler",
      count: 75,
      icon: FileText,
    },
    {
      id: "international-conferences",
      title: "A. Uluslararası Bilimsel Toplantılarda Sunulan Bildiriler",
      count: 47,
      icon: Presentation,
    },
    {
      id: "national-conferences",
      title: "B. Ulusal Bilimsel Toplantılarda Sunulan Bildiriler",
      count: 82,
      icon: Presentation,
    },
    {
      id: "panels",
      title: "Bilimsel Toplantılarda Sunulan Panel ve Kurs Konuşmaları",
      count: 52,
      icon: Award,
    },
    {
      id: "books",
      title: "Yazım Ekibinde Yer Aldığı Kitaplar",
      count: 11,
      icon: BookOpen,
    },
    {
      id: "editorships",
      title: "Editör Yardımcılığı Yaptığım Dergiler",
      count: 1,
      icon: BookOpen,
    },
    {
      id: "memberships",
      title: "Bilimsel Kuruluşlara Üyelikler",
      count: 8,
      icon: Users,
    },
    {
      id: "other-meetings",
      title: "Katıldığım Diğer Uluslararası Toplantılar",
      count: 13,
      icon: Calendar,
    },
  ];

  // Yıllara göre gruplandırma (sadece makaleler için)
  const publicationsByYear = useMemo(() => {
    const grouped: Record<number, Publication[]> = {};
    allPublications.forEach((pub) => {
      if (!grouped[pub.year]) {
        grouped[pub.year] = [];
      }
      grouped[pub.year].push(pub);
    });
    return grouped;
  }, []);

  const years = Object.keys(publicationsByYear)
    .map(Number)
    .sort((a, b) => b - a);

  const statsByYear = useMemo(() => {
    const stats: Record<number, number> = {};
    allPublications.forEach((pub) => {
      stats[pub.year] = (stats[pub.year] || 0) + 1;
    });
    return stats;
  }, []);

  // Ulusal makaleler (placeholder - veriler eklenecek)
  const nationalArticles: Publication[] = [];

  // Uluslararası konferans bildirileri (placeholder - veriler eklenecek)
  const internationalConferencePapers: Publication[] = [];

  // Ulusal konferans bildirileri (placeholder - veriler eklenecek)
  const nationalConferencePapers: Publication[] = [];

  // Panel ve kurs konuşmaları (placeholder - veriler eklenecek)
  const panelAndCoursePresentations: Array<{
    id: string;
    title: string;
    event: string;
    year: number;
    location?: string;
    type?: "panel" | "course";
  }> = [];

  // Kitap bölümleri (placeholder - veriler eklenecek)
  const bookChapters: Array<{
    id: string;
    title: string;
    book: string;
    year: number;
    pages?: string;
    editors?: string;
  }> = [];

  // Seçili kategoriye göre filtreleme
  const filteredPublications = useMemo(() => {
    let filtered: Publication[] = [];

    if (selectedCategory === "international-articles") {
      filtered = allPublications;
    } else if (selectedCategory === "national-articles") {
      filtered = nationalArticles;
    } else if (selectedCategory === "international-conferences") {
      filtered = internationalConferencePapers;
    } else if (selectedCategory === "national-conferences") {
      filtered = nationalConferencePapers;
    }

    if (selectedYear !== null) {
      filtered = filtered.filter((p) => p.year === selectedYear);
    }

    return filtered.sort((a, b) => b.year - a.year);
  }, [
    selectedCategory,
    selectedYear,
    nationalArticles,
    internationalConferencePapers,
    nationalConferencePapers,
  ]);

  const currentCategory = categories.find((c) => c.id === selectedCategory);

  // Bilimsel Kuruluşlara Üyelikler
  const memberships = [
    "Türk Tabipler Birliği",
    "Türk Oftalmoji Derneği",
    "Türk Oftalmoji Derneği Glokom Birimi Aktif Üyeliği",
    "Türk Oftalmoji Derneği Oküler Travmatoloji ve Medikolegal Oftalmoloji Birimi Aktif Üyeliği",
    "Türk Oftalmoji Derneği Oküler Enfeksiyonlar Birimi Aktif Üyeliği",
    "Dünya Glokom Topluluğu (World Glaucoma Society) Üyeliği",
    "Avrupa Glokom Topluluğu (European Glaucoma Society) Üyeliği",
    "Amerikan Oftalmoloji Akademisi (American Academy of Ophthalmology) Üyeliği",
  ];

  // Editör Yardımcılığı
  const editorships = ["Glokom-Katarakt Dergisi"];

  // Katıldığım Diğer Uluslararası Toplantılar
  const otherMeetings = [
    "American Ophthalmology annual meeting Anaheim, CA, 2003",
    "American Ophthalmology annual meeting Chicago, IL, 2005",
    "American Ophthalmology annual meeting Las Vegas, NV, 2006",
    "American Ophthalmology annual meeting San Francisco, CA, 2009",
    "American Ophthalmology annual meeting Chicago, IL, 2010",
    "American Ophthalmology annual meeting Orlando, FL, 2011",
    "American Ophthalmology annual meeting New Orleans, LA, 2013",
    "American Ophthalmology annual meeting Chicago, IL, 2014",
    "American Ophthalmology annual meeting Las Vegas, NV, 2015",
    "American Ophthalmology annual meeting Chicago, IL, 2018",
    "World Glaucoma Congress (WGC), Honolulu, Hawaii, 2025",
    "European Glaucoma Society congress, Dublin, Ireland, 2024",
  ];

  return (
    <Container className="py-12 sm:py-16 md:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4 text-gray-900">
            Bilimsel Makaleler ve Yayınlar
          </h1>
          <p className="text-xl text-gray-600 mb-2">
            Prof. Dr. Kadriye Ufuk Elgin
          </p>
          <div className="mt-6 flex items-center justify-center gap-6 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              <span>159 Makale</span>
            </div>
            <div className="flex items-center gap-2">
              <Presentation className="w-4 h-4" />
              <span>129 Bildiri</span>
            </div>
            <div className="flex items-center gap-2">
              <Award className="w-4 h-4" />
              <span>52 Panel/Kurs</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Sidebar - Categories */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="sticky top-24 space-y-2">
              {/* Ana Kategoriler */}
              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Bilimsel Makaleler
                </h3>
                <div className="space-y-1">
                  {categories.slice(0, 2).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-primary text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 mt-0.5 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium line-clamp-2 leading-snug">
                              {category.title.split(". ")[1] || category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Bilimsel Toplantılar
                </h3>
                <div className="space-y-1">
                  {categories.slice(2, 5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-primary text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-start gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 mt-0.5 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium line-clamp-2 leading-snug">
                              {category.title.split(". ")[1] || category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-3 px-2">
                  Diğer
                </h3>
                <div className="space-y-1">
                  {categories.slice(5).map((category) => {
                    const Icon = category.icon;
                    return (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedYear(null);
                        }}
                        className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-200 ${
                          selectedCategory === category.id
                            ? "bg-primary text-white shadow-md"
                            : "bg-white border border-gray-200 text-gray-700 hover:border-primary/50 hover:bg-gray-50"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <Icon
                              className={`w-4 h-4 shrink-0 ${selectedCategory === category.id ? "text-white" : "text-primary"}`}
                            />
                            <span className="text-sm font-medium truncate">
                              {category.title}
                            </span>
                          </div>
                          <span
                            className={`text-xs font-bold ml-2 shrink-0 ${selectedCategory === category.id ? "text-white" : "text-gray-500"}`}
                          >
                            {category.count}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Google Scholar Link */}
              {(selectedCategory === "international-articles" ||
                selectedCategory === "national-articles") && (
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
              )}
            </div>
          </aside>

          {/* Right Content Area */}
          <div className="flex-1 min-w-0">
            {/* Category Header */}
            <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-primary/10 rounded-lg p-6 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-2">
                {currentCategory && (
                  <>
                    <div className="p-2 bg-primary/10 rounded-lg">
                      <currentCategory.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold text-gray-900">
                        {currentCategory.title}
                      </h2>
                      <p className="text-gray-600 text-sm mt-1">
                        Toplam{" "}
                        <span className="font-bold text-primary">
                          {currentCategory.count}
                        </span>{" "}
                        {currentCategory.title.toLowerCase().includes("makale")
                          ? "makale"
                          : currentCategory.title
                                .toLowerCase()
                                .includes("bildiri")
                            ? "bildiri"
                            : currentCategory.title
                                  .toLowerCase()
                                  .includes("üyelik")
                              ? "kuruluş"
                              : currentCategory.title
                                    .toLowerCase()
                                    .includes("editör")
                                ? "dergi"
                                : "kayıt"}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Year Filter (sadece makaleler için) */}
            {(selectedCategory === "international-articles" ||
              selectedCategory === "national-articles") && (
              <div className="mb-6 bg-white border border-gray-200 rounded-lg p-4">
                <p className="text-sm font-medium text-gray-700 mb-3">
                  Yıla Göre Filtrele:
                </p>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedYear(null)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedYear === null
                        ? "bg-primary text-white shadow-md"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    Tüm Yıllar
                  </button>
                  {years.map((year) => (
                    <button
                      key={year}
                      onClick={() => setSelectedYear(year)}
                      className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                        selectedYear === year
                          ? "bg-primary text-white shadow-md"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {year}{" "}
                      <span className="opacity-75">({statsByYear[year]})</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Content based on category */}
            {selectedCategory === "international-articles" && (
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
            )}

            {selectedCategory === "memberships" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {memberships.map((membership, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Users className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base font-medium">
                        {membership}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategory === "editorships" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {editorships.map((editorship, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <BookOpen className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base font-medium">
                        {editorship}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedCategory === "other-meetings" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                <ul className="space-y-2">
                  {otherMeetings.map((meeting, index) => (
                    <li
                      key={index}
                      className="flex items-center gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                    >
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0">
                        <Calendar className="w-4 h-4 text-primary" />
                      </div>
                      <span className="text-gray-800 text-base">{meeting}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Ulusal Makaleler */}
            {selectedCategory === "national-articles" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
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
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} makale
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Uluslararası Konferans Bildirileri */}
            {selectedCategory === "international-conferences" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
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
                            {pub.location && (
                              <span className="text-sm text-gray-500 font-medium">
                                {pub.location}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} bildiri
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Ulusal Konferans Bildirileri */}
            {selectedCategory === "national-conferences" && (
              <div className="space-y-4">
                {filteredPublications.length > 0 ? (
                  filteredPublications.map((pub) => (
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
                            {pub.location && (
                              <span className="text-sm text-gray-500 font-medium">
                                {pub.location}
                              </span>
                            )}
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-3 leading-snug hover:text-primary transition-colors">
                            {pub.title}
                          </h3>
                          <p className="text-sm text-gray-700 mb-3 leading-relaxed">
                            {pub.authors}
                          </p>
                        </div>
                      </div>
                    </article>
                  ))
                ) : (
                  <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} bildiri
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Panel ve Kurs Konuşmaları */}
            {selectedCategory === "panels" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                {panelAndCoursePresentations.length > 0 ? (
                  <ul className="space-y-2">
                    {panelAndCoursePresentations.map((presentation, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <Award className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-base font-medium mb-1">
                            {presentation.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {presentation.event}
                          </p>
                          {presentation.location && (
                            <p className="text-xs text-gray-500 mt-1">
                              {presentation.location}, {presentation.year}
                            </p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} kayıt
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Kitap Bölümleri */}
            {selectedCategory === "books" && (
              <div className="bg-white rounded-lg border border-gray-200 p-8 shadow-sm">
                {bookChapters.length > 0 ? (
                  <ul className="space-y-2">
                    {bookChapters.map((chapter, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 p-4 rounded-lg hover:bg-primary/5 transition-colors border border-gray-100 hover:border-primary/20"
                      >
                        <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                          <BookOpen className="w-4 h-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-800 text-base font-medium mb-1">
                            {chapter.title}
                          </p>
                          <p className="text-sm text-gray-600">
                            {chapter.book}
                          </p>
                          {chapter.editors && (
                            <p className="text-xs text-gray-500 mt-1">
                              Editörler: {chapter.editors}
                            </p>
                          )}
                          {chapter.pages && (
                            <p className="text-xs text-gray-500">
                              Sayfa: {chapter.pages}
                            </p>
                          )}
                          <p className="text-xs text-gray-500">
                            {chapter.year}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-gray-500 text-lg">
                      Veriler yakında eklenecektir.
                    </p>
                    <p className="text-gray-400 text-sm mt-2">
                      Toplam {currentCategory?.count || 0} kayıt
                    </p>
                  </div>
                )}
              </div>
            )}

            {filteredPublications.length === 0 &&
              selectedCategory === "international-articles" && (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <p className="text-gray-500">
                    Seçilen yıla ait makale bulunamadı.
                  </p>
                </div>
              )}
          </div>
        </div>
      </div>
    </Container>
  );
}
