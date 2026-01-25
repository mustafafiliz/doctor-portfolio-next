'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, X, Upload, Loader2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Editor } from '@/components/admin/Editor';
import { specialtyApi } from '@/lib/api';
import type { SpecialtyCategory } from '@/lib/types';

export default function NewSpecialtyPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<SpecialtyCategory[]>([]);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    content: '',
    categoryId: '',
    imageUrl: '',
    locale: currentLocale,
    relatedSlugs: [] as string[],
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await specialtyApi.listCategories();
        setCategories(data || []);
      } catch (err) {
        // Hata durumunda sessizce devam et
      }
    };
    fetchCategories();
  }, []);

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

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Slug boşsa title'dan otomatik üret
      const finalSlug = formData.slug.trim() || generateSlug(formData.title);
      if (!finalSlug) {
        setError('Başlık veya slug alanı doldurulmalıdır');
        setIsLoading(false);
        return;
      }

      // Image varsa FormData, yoksa JSON gönder
      if (selectedFile || formData.imageUrl) {
        const form = new FormData();
        form.append('title', formData.title);
        form.append('slug', finalSlug);
        form.append('description', formData.description);
        form.append('content', formData.content);
        form.append('locale', formData.locale);
        if (formData.categoryId) {
          // categoryId'nin string olduğundan emin ol
          const categoryIdValue = typeof formData.categoryId === 'string'
            ? formData.categoryId
            : String(formData.categoryId);
          form.append('categoryId', categoryIdValue);
        }
        if (selectedFile) {
          form.append('image', selectedFile);
        } else if (formData.imageUrl) {
          form.append('imageUrl', formData.imageUrl);
        }
        if (formData.relatedSlugs && formData.relatedSlugs.length > 0) {
          // relatedSlugs'u tek bir string olarak gönder (virgülle ayrılmış)
          form.append('relatedSlugs', formData.relatedSlugs.join(','));
        }
        await specialtyApi.create(form);
      } else {
        // Image yoksa JSON gönder (order number olarak gider)
        const jsonData: any = {
          title: formData.title,
          slug: finalSlug,
          description: formData.description,
          content: formData.content,
          locale: formData.locale,
        };
        if (formData.categoryId) {
          // categoryId'nin string olduğundan emin ol
          jsonData.categoryId = typeof formData.categoryId === 'string'
            ? formData.categoryId
            : String(formData.categoryId);
        }
        if (formData.relatedSlugs && formData.relatedSlugs.length > 0) {
          jsonData.relatedSlugs = formData.relatedSlugs;
        }
        await specialtyApi.createJson(jsonData);
      }
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err: any) {
      // API'den gelen hata mesajını göster
      const errorMessage = err?.message || '';
      const isImageUpload = selectedFile || formData.imageUrl;

      // 413 Request Entity Too Large veya failed to fetch (görsel yükleme sırasında)
      if (err?.statusCode === 413 ||
        (isImageUpload && (errorMessage.toLowerCase().includes('failed to fetch') ||
          errorMessage.toLowerCase().includes('network') ||
          !errorMessage))) {
        setError('Görsel dosyası çok büyük. Lütfen daha küçük bir dosya seçin.');
      } else if (err?.statusCode === 415) {
        setError('Desteklenmeyen dosya formatı. Lütfen PNG, JPG veya WebP formatında bir görsel seçin.');
      } else if (isImageUpload && (errorMessage.toLowerCase().includes('image') ||
        errorMessage.toLowerCase().includes('görsel') ||
        errorMessage.toLowerCase().includes('file') ||
        errorMessage.toLowerCase().includes('upload'))) {
        setError(`Görsel yüklenirken bir hata oluştu: ${errorMessage}`);
      } else if (errorMessage) {
        setError(errorMessage);
      } else {
        setError('Uzmanlık kaydedilirken bir hata oluştu');
      }
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
            <h1 className="text-2xl font-bold text-gray-800">Yeni Uzmanlık Yazısı</h1>
            <p className="text-gray-500 text-sm mt-1">Yeni bir uzmanlık oluşturun</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto hover:bg-red-100 rounded-sm p-1 transition-colors">
            <X size={16} />
          </button>
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
                placeholder="Uzmanlık başlığı"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-sm text-sm text-gray-500">
                  {typeof window !== 'undefined' ? window.location.origin : ''}/
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
                placeholder="Uzmanlık kısa açıklaması..."
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
              placeholder="Uzmanlık içeriğini buraya yazın..."
            />
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
              {isLoading ? (
                <Loader2 size={18} className="animate-spin" />
              ) : (
                <Save size={18} />
              )}
              {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
            </button>
          </div>

          {/* Category */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Uzmanlık</h3>
            <Select
              value={formData.categoryId || undefined}
              onValueChange={(value) => setFormData({ ...formData, categoryId: value })}
            >
              <SelectTrigger className="w-full h-11 border-gray-300 focus:ring-2 focus:ring-[#144793]">
                <SelectValue placeholder="Uzmanlık Seçin" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category._id} value={category._id}>
                    {category.title || category.name || category._id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${isDragging
                  ? 'border-[#144793] bg-blue-50'
                  : 'border-gray-300 hover:border-[#144793]'
                  }`}
              >
                <Upload size={32} className={`mx-auto mb-2 ${isDragging ? 'text-[#144793]' : 'text-gray-400'}`} />
                <p className={`text-sm ${isDragging ? 'text-[#144793] font-medium' : 'text-gray-500'}`}>
                  {isDragging ? 'Görseli buraya bırakın' : 'Görsel yüklemek için tıklayın veya sürükleyin'}
                </p>
                <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
              </div>
            )}
            <div className="pt-2 border-t border-gray-200">
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Veya Görsel URL'si
              </label>
              <input
                type="url"
                value={formData.imageUrl}
                onChange={(e) => {
                  setFormData({ ...formData, imageUrl: e.target.value });
                  if (e.target.value) {
                    setImagePreview(e.target.value);
                    setSelectedFile(null);
                  }
                }}
                placeholder="https://example.com/image.jpg"
                className="w-full px-3 py-2 border border-gray-300 rounded-sm text-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
