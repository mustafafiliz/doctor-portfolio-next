'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Trash2, X, Upload, Loader2, AlertCircle } from 'lucide-react';
import { Editor } from '@/components/admin/Editor';
import { specialtyApi } from '@/lib/api';
import type { SpecialtyCategory } from '@/lib/types';

export default function EditSpecialtyPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const specialtySlug = params.slug as string;
  
  const [specialtyId, setSpecialtyId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [categories, setCategories] = useState<SpecialtyCategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    image: '',
    categoryId: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [specialtyData, categoriesData] = await Promise.all([
          specialtyApi.getBySlug(specialtySlug),
          specialtyApi.listCategories(),
        ]);
        
        setSpecialtyId(specialtyData._id); // Update ve delete için _id'yi sakla
        setFormData({
          title: specialtyData.title,
          slug: specialtyData.slug,
          description: specialtyData.description || '',
          content: specialtyData.content,
          image: specialtyData.image || '',
          categoryId: specialtyData.categoryId || '',
        });
        
        if (specialtyData.image) {
          setImagePreview(specialtyData.image);
        }
        
        setCategories(categoriesData || []);
      } catch (err) {
        console.error('Uzmanlık yükleme hatası:', err);
        setError('Uzmanlık alanı yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    if (specialtySlug) {
      fetchData();
    }
  }, [specialtySlug]);

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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
    setFormData({ ...formData, image: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('slug', formData.slug);
      form.append('description', formData.description);
      form.append('content', formData.content);
      if (formData.categoryId) {
        form.append('categoryId', formData.categoryId);
      }
      if (selectedFile) {
        form.append('image', selectedFile);
      }

      if (!specialtyId) {
        setError('Uzmanlık ID bulunamadı');
        setIsSaving(false);
        return;
      }
      await specialtyApi.update(specialtyId, form);
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err) {
      console.error('Uzmanlık güncelleme hatası:', err);
      setError('Uzmanlık alanı güncellenirken bir hata oluştu');
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu uzmanlık alanını silmek istediğinizden emin misiniz?')) {
      return;
    }

    if (!specialtyId) {
      setError('Uzmanlık ID bulunamadı');
      return;
    }

    setIsDeleting(true);
    try {
      await specialtyApi.delete(specialtyId);
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err) {
      console.error('Uzmanlık silme hatası:', err);
      setError('Uzmanlık silinirken bir hata oluştu');
      setIsDeleting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#144793]" />
      </div>
    );
  }

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
            <h1 className="text-2xl font-bold text-gray-800">Uzmanlık Düzenle</h1>
            <p className="text-gray-500 text-sm mt-1">{formData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${currentLocale}/${formData.slug}`}
            target="_blank"
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50 transition-colors"
          >
            <Eye size={18} />
            <span className="hidden sm:inline">Önizle</span>
          </Link>
          <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="inline-flex items-center gap-2 px-4 py-2.5 border border-red-300 text-red-600 rounded-sm hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            {isDeleting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
            <span className="hidden sm:inline">Sil</span>
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

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
                  /uzmanlik/
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
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Save Box */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <button
              type="submit"
              disabled={isSaving}
              className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
            >
              {isSaving ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isSaving ? 'Kaydediliyor...' : 'Güncelle'}
            </button>
          </div>

          {/* Category */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Kategori</h3>
            <select
              value={formData.categoryId}
              onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
            >
              <option value="">Kategori Seçin</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Görsel</h3>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {imagePreview ? (
              <div className="relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600"
                >
                  <X size={16} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full border-2 border-dashed border-gray-300 rounded-sm p-6 text-center hover:border-[#144793] transition-colors"
              >
                <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                <p className="text-sm text-gray-500">Görsel yüklemek için tıklayın</p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
              </button>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
