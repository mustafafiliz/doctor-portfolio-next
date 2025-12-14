'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Image as ImageIcon, X, Upload, Loader2 } from 'lucide-react';
import { Editor } from '@/components/admin/Editor';
import { blogApi } from '@/lib/api';

export default function NewBlogPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    status: 'draft' as 'draft' | 'published',
    imageUrl: '',
    locale: currentLocale,
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
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const form = new FormData();
      form.append('title', formData.title);
      form.append('slug', formData.slug);
      form.append('excerpt', formData.excerpt);
      form.append('content', formData.content);
      form.append('status', formData.status);
      form.append('locale', formData.locale);
      if (selectedFile) {
        form.append('image', selectedFile);
      } else if (formData.imageUrl) {
        form.append('imageUrl', formData.imageUrl);
      }

      await blogApi.create(form);
      router.push(`/${currentLocale}/admin/blog`);
    } catch (err) {
      console.error('Blog kaydetme hatası:', err);
      setError('Blog yazısı kaydedilirken bir hata oluştu');
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link
            href={`/${currentLocale}/admin/blog`}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Yeni Blog Yazısı</h1>
            <p className="text-gray-500 text-sm mt-1">Yeni bir blog yazısı oluşturun</p>
          </div>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
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
                placeholder="Blog yazısı başlığı"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                URL Slug
              </label>
              <div className="flex items-center">
                <span className="px-3 py-2.5 bg-gray-100 border border-r-0 border-gray-300 rounded-l-sm text-sm text-gray-500">
                  /blog/
                </span>
                <input
                  type="text"
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                  className="flex-1 px-4 py-2.5 border border-gray-300 rounded-r-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="blog-yazisi-basligi"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Özet
              </label>
              <textarea
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                placeholder="Blog yazısının kısa özeti..."
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
              placeholder="Blog yazısı içeriğini buraya yazın..."
            />
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Publish Box */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Yayın Durumu</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                Durum
              </label>
              <select
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
              >
                <option value="draft">Taslak</option>
                <option value="published">Yayında</option>
              </select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
              >
                {isLoading ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isLoading ? 'Kaydediliyor...' : 'Kaydet'}
              </button>
            </div>
          </div>

          {/* Featured Image */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800">Öne Çıkan Görsel</h3>
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
