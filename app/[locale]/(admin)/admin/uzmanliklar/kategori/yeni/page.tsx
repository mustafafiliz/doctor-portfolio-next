'use client';

import { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Loader2, AlertCircle } from 'lucide-react';
import { specialtyApi } from '@/lib/api';

export default function NewCategoryPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    order: 0,
  });

  const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/ğ/g, 'g')
      .replace(/ü/g, 'u')
      .replace(/ş/g, 's')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ç/g, 'c')
      .replace(/[^a-z0-9\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  };

  const handleTitleChange = (title: string) => {
    setFormData({
      ...formData,
      title,
      slug: formData.slug || generateSlug(title),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      await specialtyApi.createCategory({
        title: formData.title,
        slug: formData.slug || generateSlug(formData.title),
        description: formData.description || undefined,
        order: formData.order,
      });
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err) {
      console.error('Kategori kaydetme hatası:', err);
      setError('Kategori kaydedilirken bir hata oluştu');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/${currentLocale}/admin/uzmanliklar`}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Yeni Uzmanlık Kategorisi</h1>
            <p className="text-gray-500 text-sm mt-1">Yeni bir uzmanlık kategorisi oluşturun</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="max-w-2xl">
        <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-6">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Başlık *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              placeholder="Kategori başlığı"
              required
            />
          </div>

          {/* Slug */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              URL Slug
            </label>
            <div className="flex items-center">
              <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-sm text-sm text-gray-500">
                /uzmanlik/
              </span>
              <input
                type="text"
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                placeholder="kategori-slug"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Boş bırakılırsa başlıktan otomatik oluşturulur</p>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Açıklama
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
              placeholder="Kategori açıklaması..."
            />
          </div>

          {/* Order */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Sıra
            </label>
            <input
              type="number"
              value={formData.order}
              onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              placeholder="0"
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Kategorilerin görüntülenme sırası (düşük sayı önce gösterilir)</p>
          </div>

          {/* Submit Button */}
          <div className="flex gap-2 pt-4 border-t">
            <button
              type="submit"
              disabled={isLoading}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Kaydet
                </>
              )}
            </button>
            <Link
              href={`/${currentLocale}/admin/uzmanliklar`}
              className="px-4 py-2.5 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
            >
              İptal
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}


