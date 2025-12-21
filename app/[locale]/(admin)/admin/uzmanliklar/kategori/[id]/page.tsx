'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter, useParams, usePathname } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Save, Trash2, Loader2, AlertCircle, X, Upload } from 'lucide-react';
import { specialtyApi } from '@/lib/api';
import type { SpecialtyCategory } from '@/lib/types';

export default function EditCategoryPage() {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  const categoryId = params.id as string;
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    description: '',
    order: 0,
    image: '',
    imageUrl: '',
  });

  useEffect(() => {
    const fetchCategory = async () => {
      setIsLoading(true);
      try {
        const categories = await specialtyApi.listCategories();
        const category = categories.find((c) => c._id === categoryId);
        
        if (category) {
          setFormData({
            title: category.title || category.name || '',
            slug: category.slug || '',
            description: category.description || '',
            order: category.order || 0,
            image: category.image || '',
            imageUrl: category.image || '',
          });
          
          if (category.image) {
            setImagePreview(category.image);
          }
        } else {
          setError('Kategori bulunamadı');
        }
      } catch (err) {
        setError('Kategori yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    if (categoryId) {
      fetchCategory();
    }
  }, [categoryId]);

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
    setFormData({ ...formData, image: '', imageUrl: '' });
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError(null);

    try {
      // Image varsa FormData, yoksa JSON gönder
      if (selectedFile || (formData.imageUrl && !formData.image)) {
        const form = new FormData();
        form.append('title', formData.title);
        form.append('slug', formData.slug || generateSlug(formData.title));
        if (formData.description) {
          form.append('description', formData.description);
        }
        if (formData.order !== undefined && formData.order !== null) {
          form.append('order', String(Number(formData.order)));
        }
        if (selectedFile) {
          form.append('image', selectedFile);
        } else if (formData.imageUrl && !formData.image) {
          form.append('imageUrl', formData.imageUrl);
        }
        await specialtyApi.updateCategoryWithImage(categoryId, form);
      } else {
        await specialtyApi.updateCategory(categoryId, {
          title: formData.title,
          slug: formData.slug || generateSlug(formData.title),
          description: formData.description || undefined,
          order: formData.order,
        });
      }
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err) {
      setError('Kategori güncellenirken bir hata oluştu');
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Bu kategoriyi silmek istediğinizden emin misiniz? Kategoriye ait uzmanlıklar silinmeyecektir.')) {
      return;
    }

    setIsDeleting(true);
    try {
      await specialtyApi.deleteCategory(categoryId);
      router.push(`/${currentLocale}/admin/uzmanliklar`);
    } catch (err) {
      setError('Kategori silinirken bir hata oluştu');
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

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
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

          {/* Featured Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1.5">
              Görsel
            </label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            {imagePreview && (
              <div className="relative mb-3">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="w-full h-40 object-cover rounded-sm"
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600 transition-colors"
                >
                  <X size={16} />
                </button>
              </div>
            )}
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
                {isDragging ? 'Görseli buraya bırakın' : imagePreview ? 'Görseli değiştirmek için tıklayın veya sürükleyin' : 'Görsel yüklemek için tıklayın veya sürükleyin'}
              </p>
              <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
            </div>
            <div className="pt-3 mt-3 border-t border-gray-200">
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

          {/* Submit Button */}
          <div className="flex gap-2 pt-4 border-t">
            <button
              type="submit"
              disabled={isSaving}
              className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 transition-colors"
            >
              {isSaving ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Kaydediliyor...
                </>
              ) : (
                <>
                  <Save size={18} />
                  Güncelle
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





