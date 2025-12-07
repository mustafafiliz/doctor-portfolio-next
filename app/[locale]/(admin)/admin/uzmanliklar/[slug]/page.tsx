'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Trash2, X, Image as ImageIcon, Plus } from 'lucide-react';
import { Editor } from '@/components/admin/Editor';
import specialtiesData from '@/data/specialties.json';

export default function EditSpecialtyPage() {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    categoryId: '',
    relatedSlugs: [] as string[],
    metaTitle: '',
    metaDescription: '',
  });
  const [newRelatedSlug, setNewRelatedSlug] = useState('');

  useEffect(() => {
    // TODO: API'den veriyi çek
    const specialty = specialtiesData.specialties.find((s) => s.slug === params.slug);
    if (specialty) {
      setFormData({
        title: specialty.title,
        slug: specialty.slug,
        description: specialty.description,
        content: specialty.content,
        image: specialty.image,
        categoryId: specialty.categoryId,
        relatedSlugs: specialty.relatedSlugs || [],
        metaTitle: '',
        metaDescription: '',
      });
    }
  }, [params.slug]);

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
      slug: generateSlug(title),
    });
  };

  const addRelatedSlug = () => {
    if (newRelatedSlug && !formData.relatedSlugs.includes(newRelatedSlug)) {
      setFormData({
        ...formData,
        relatedSlugs: [...formData.relatedSlugs, newRelatedSlug],
      });
      setNewRelatedSlug('');
    }
  };

  const removeRelatedSlug = (index: number) => {
    setFormData({
      ...formData,
      relatedSlugs: formData.relatedSlugs.filter((_, i) => i !== index),
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // TODO: API'ye güncelleme isteği gönder
    // const response = await fetch(`/api/admin/specialties/${params.slug}`, {
    //   method: 'PUT',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(formData),
    // });

    setTimeout(() => {
      alert('Uzmanlık alanı güncellendi! (Demo)');
      setIsLoading(false);
    }, 1000);
  };

  const handleDelete = async () => {
    if (confirm('Bu uzmanlık alanını silmek istediğinizden emin misiniz?')) {
      // TODO: API'ye silme isteği gönder
      // await fetch(`/api/admin/specialties/${params.slug}`, { method: 'DELETE' });
      router.push('/admin/uzmanliklar');
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href="/admin/uzmanliklar"
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Uzmanlık Düzenle</h1>
            <p className="text-gray-500 text-sm mt-1">{formData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/tr/${formData.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
          >
            <Eye size={18} />
            <span className="hidden sm:inline">Önizle</span>
          </Link>
          <button
            onClick={handleDelete}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-sm hover:bg-red-50 transition-colors"
          >
            <Trash2 size={18} />
            <span className="hidden sm:inline">Sil</span>
          </button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Title & Slug */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Başlık *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                placeholder="Uzmanlık alanı başlığı"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-sm text-sm text-gray-500">
                  /
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="uzmanlik-alani"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Kısa Açıklama
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                placeholder="Uzmanlık alanının kısa açıklaması..."
              />
            </div>
          </div>

          {/* Editor */}
          <div className="bg-white rounded-sm border border-gray-200 p-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              İçerik *
            </label>
            <Editor
              content={formData.content}
              onChange={(content) => setFormData({ ...formData, content })}
              placeholder="Uzmanlık alanı içeriğini buraya yazın..."
            />
          </div>

          {/* Related Slugs */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">İlgili Yazılar</h3>
            
            {formData.relatedSlugs.length > 0 && (
              <div className="space-y-2">
                {formData.relatedSlugs.map((slug, index) => (
                  <div key={index} className="flex items-center gap-2 p-3 bg-gray-50 rounded-sm">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-800 truncate">/{slug}</p>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeRelatedSlug(index)}
                      className="p-1.5 text-red-500 hover:bg-red-50 rounded-sm"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            <div className="flex gap-2">
              <input
                type="text"
                placeholder="slug (örn: glokom-nedir)"
                value={newRelatedSlug}
                onChange={(e) => setNewRelatedSlug(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
              <button
                type="button"
                onClick={addRelatedSlug}
                className="px-3 py-2 bg-gray-100 text-gray-700 rounded-sm hover:bg-gray-200"
              >
                <Plus size={18} />
              </button>
            </div>
          </div>

          {/* SEO */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">SEO Ayarları</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meta Başlık
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                placeholder="SEO için başlık"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Meta Açıklama
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                placeholder="SEO için açıklama"
              />
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Box */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
            >
              <Save size={18} />
              {isLoading ? 'Kaydediliyor...' : 'Güncelle'}
            </button>
          </div>

          {/* Category */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Kategori *</h3>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              required
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
            >
              <option value="">Kategori Seçin</option>
              {specialtiesData.categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Görsel</h3>
            {formData.image ? (
              <div className="relative">
                <img
                  src={formData.image}
                  alt="Featured"
                  className="w-full h-40 object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, image: '' })}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <div className="border-2 border-dashed border-gray-300 rounded-sm p-6 text-center">
                <ImageIcon size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500 mb-2">Görsel URL&apos;si girin</p>
                <input
                  type="url"
                  placeholder="https://..."
                  onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                />
              </div>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}

