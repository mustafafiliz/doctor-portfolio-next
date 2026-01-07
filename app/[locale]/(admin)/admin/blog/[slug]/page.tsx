'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Eye, Trash2, X, Upload, Loader2, AlertCircle } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Editor } from '@/components/admin/Editor';
import { blogApi } from '@/lib/api';
import type { Blog } from '@/lib/types';

export default function EditBlogPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  const fileInputRef = useRef<HTMLInputElement>(null);
  const blogSlug = params.slug as string;
  
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [blogId, setBlogId] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    metaTitle: '',
    metaDescription: '',
    title: '',
    slug: '',
    excerpt: '',
    content: '',
    image: '',
    status: 'draft' as 'draft' | 'published',
    imageUrl: '',
    locale: currentLocale,
  });

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const blogData = await blogApi.getBySlug(blogSlug);
        
        setBlogId(blogData._id); // Update ve delete için _id'yi sakla
        setFormData({
          metaTitle: blogData.metaTitle || '',
          metaDescription: blogData.metaDescription || '',
          title: blogData.title,
          slug: blogData.slug,
          excerpt: blogData.excerpt || '',
          content: blogData.content,
          image: blogData.image || '',
          status: blogData.status,
          imageUrl: blogData.image || '',
          locale: blogData.locale || currentLocale,
        });
        
        if (blogData.image) {
          setImagePreview(blogData.image);
        }
      } catch (err) {
        setError('Blog yazısı yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    if (blogSlug) {
      fetchData();
    }
  }, [blogSlug]);

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
      form.append('excerpt', formData.excerpt);
      form.append('content', formData.content);
      form.append('status', formData.status);
      form.append('locale', formData.locale);
      if (formData.metaTitle) {
        form.append('metaTitle', formData.metaTitle);
      }
      if (formData.metaDescription) {
        form.append('metaDescription', formData.metaDescription);
      }
      if (selectedFile) {
        form.append('image', selectedFile);
      } else if (formData.imageUrl && !formData.image) {
        form.append('imageUrl', formData.imageUrl);
      }

      if (!blogId) {
        setError('Blog ID bulunamadı');
        setIsSaving(false);
        return;
      }
      await blogApi.update(blogId, form);
      router.push(`/${currentLocale}/admin/blog`);
    } catch (err: any) {
      // API'den gelen hata mesajını göster
      const errorMessage = err?.message || '';
      const isImageUpload = selectedFile || (formData.imageUrl && !formData.image);
      
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
      setError('Blog yazısı güncellenirken bir hata oluştu');
      }
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    if (!blogId) {
      setError('Blog ID bulunamadı');
      return;
    }

    setIsDeleting(true);
    try {
      await blogApi.delete(blogId);
      router.push(`/${currentLocale}/admin/blog`);
    } catch (err) {
      setError('Blog silinirken bir hata oluştu');
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
            href={`/${currentLocale}/admin/blog`}
            className="p-2 hover:bg-gray-100 rounded-sm transition-colors"
          >
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Blog Yazısını Düzenle</h1>
            <p className="text-gray-500 text-sm mt-1">{formData.title}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Link
            href={`/${currentLocale}/blog/${formData.slug}`}
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
          <span className="flex-1">{error}</span>
          <button onClick={() => setError(null)} className="ml-auto hover:bg-red-100 rounded-sm p-1 transition-colors">
            <X size={16} />
          </button>
        </div>
      )}

      <form onSubmit={handleSubmit} className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* SEO Meta Fields */}
          <div className="bg-white rounded-sm border border-gray-200 p-6 space-y-4">
            <h3 className="font-medium text-gray-800 border-b border-gray-200 pb-3">SEO Ayarları</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                SEO Meta Başlık (max 70 karakter)
              </label>
              <input
                type="text"
                value={formData.metaTitle}
                onChange={(e) => setFormData({ ...formData, metaTitle: e.target.value })}
                maxLength={70}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                placeholder="SEO için meta başlık"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.metaTitle.length}/70 karakter</p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1.5">
                SEO Meta Açıklama (max 160 karakter)
              </label>
              <textarea
                value={formData.metaDescription}
                onChange={(e) => setFormData({ ...formData, metaDescription: e.target.value })}
                maxLength={160}
                rows={3}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none resize-none"
                placeholder="SEO için meta açıklama"
              />
              <p className="text-xs text-gray-500 mt-1">{formData.metaDescription.length}/160 karakter</p>
            </div>
          </div>

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
              <Select
                value={formData.status}
                onValueChange={(value) => setFormData({ ...formData, status: value as 'draft' | 'published' })}
              >
                <SelectTrigger className="w-full h-11 border-gray-300 focus:ring-2 focus:ring-[#144793]">
                  <SelectValue placeholder="Durum Seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Taslak</SelectItem>
                  <SelectItem value="published">Yayında</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2 pt-2">
              <button
                type="submit"
                disabled={isSaving}
                className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
              >
                {isSaving ? (
                  <Loader2 size={18} className="animate-spin" />
                ) : (
                  <Save size={18} />
                )}
                {isSaving ? 'Kaydediliyor...' : 'Güncelle'}
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
              <div
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
                onClick={() => fileInputRef.current?.click()}
                className={`w-full border-2 border-dashed rounded-sm p-6 text-center cursor-pointer transition-colors ${
                  isDragging
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
