'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Plus,
  Search,
  Trash2,
  Image as ImageIcon,
  X,
  Eye,
  Upload,
  Grid,
  List,
  Loader2,
  AlertCircle,
  GripVertical,
} from 'lucide-react';
import { galleryApi } from '@/lib/api';
import type { GalleryPhoto } from '@/lib/types';

export default function AdminGalleryPage() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [limit, setLimit] = useState(100);

  useEffect(() => {
    fetchPhotos();
  }, []);

  const fetchPhotos = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await galleryApi.list();
      setPhotos(data.data || []);
      setLimit(data.limit || 100);
    } catch (err) {
      setError('Galeri yüklenirken bir hata oluştu');
    } finally {
      setIsLoading(false);
    }
  };

  const filteredPhotos = photos
    .filter((photo) => {
      if (!searchQuery) return true;
      return photo.title?.toLowerCase().includes(searchQuery.toLowerCase());
    })
    .sort((a, b) => a.order - b.order);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddPhoto = async () => {
    if (!selectedFile) return;

    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append('photo', selectedFile);
      if (newPhotoTitle) {
        formData.append('title', newPhotoTitle);
      }
      formData.append('order', String(photos.length));

      const newPhoto = await galleryApi.create(formData);
      setPhotos([...photos, newPhoto]);
      
      // Reset modal
      setShowAddModal(false);
      setSelectedFile(null);
      setUploadPreview(null);
      setNewPhotoTitle('');
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    } catch (err) {
      setError('Fotoğraf yüklenirken bir hata oluştu');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Bu fotoğrafı silmek istediğinizden emin misiniz?')) {
      return;
    }

    setDeletingId(id);
    try {
      await galleryApi.delete(id);
      setPhotos(photos.filter((photo) => photo._id !== id));
    } catch (err) {
      setError('Fotoğraf silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  const closeModal = () => {
    setShowAddModal(false);
    setSelectedFile(null);
    setUploadPreview(null);
    setNewPhotoTitle('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
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
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {photos.length} fotoğraf (Limit: {limit})
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          disabled={photos.length >= limit}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus size={20} />
          <span>Yeni Ekle</span>
        </button>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
          <button onClick={() => setError(null)} className="ml-auto">
            <X size={16} />
          </button>
        </div>
      )}

      {photos.length >= limit && (
        <div className="flex items-center gap-2 bg-yellow-50 text-yellow-700 px-4 py-3 rounded-sm text-sm border border-yellow-100">
          <AlertCircle size={18} />
          Galeri limitine ulaştınız. Yeni fotoğraf eklemek için mevcut fotoğrafları silin.
        </div>
      )}

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
              <ImageIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{photos.length}</p>
              <p className="text-sm text-gray-500">Fotoğraf</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
              <Grid size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{limit - photos.length}</p>
              <p className="text-sm text-gray-500">Kalan Slot</p>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
            />
          </div>
          <div className="flex border border-gray-300 rounded-sm overflow-hidden">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 ${viewMode === 'grid' ? 'bg-[#144793] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <Grid size={20} />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 ${viewMode === 'list' ? 'bg-[#144793] text-white' : 'bg-white text-gray-600 hover:bg-gray-50'}`}
            >
              <List size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* Gallery Grid/List */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {filteredPhotos.map((photo) => (
            <div key={photo._id} className="group relative bg-white rounded-sm border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                <img
                  src={photo.url}
                  alt={photo.title || 'Galeri fotoğrafı'}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={photo.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(photo._id)}
                    disabled={deletingId === photo._id}
                    className="p-2 bg-red-500 rounded-sm text-white hover:bg-red-600 disabled:opacity-50"
                  >
                    {deletingId === photo._id ? (
                      <Loader2 size={18} className="animate-spin" />
                    ) : (
                      <Trash2 size={18} />
                    )}
                  </button>
                </div>
              </div>
              {photo.title && (
                <div className="p-3">
                  <p className="text-sm font-medium text-gray-800 truncate">{photo.title}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Önizleme</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Başlık</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden lg:table-cell">Sıra</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredPhotos.map((photo) => (
                <tr key={photo._id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-sm overflow-hidden">
                      <img src={photo.url} alt={photo.title || ''} className="w-full h-full object-cover" />
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{photo.title || '-'}</p>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm text-gray-500">
                    {photo.order + 1}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={photo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
                      >
                        <Eye size={18} />
                      </a>
                      <button
                        onClick={() => handleDelete(photo._id)}
                        disabled={deletingId === photo._id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
                      >
                        {deletingId === photo._id ? (
                          <Loader2 size={18} className="animate-spin" />
                        ) : (
                          <Trash2 size={18} />
                        )}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPhotos.length === 0 && !isLoading && (
        <div className="text-center py-12 bg-white rounded-sm border border-gray-200">
          <ImageIcon size={48} className="mx-auto text-gray-300 mb-3" />
          <p className="text-gray-500">Henüz fotoğraf eklenmemiş</p>
          <button
            onClick={() => setShowAddModal(true)}
            className="mt-4 text-[#144793] hover:underline text-sm"
          >
            İlk fotoğrafı ekleyin
          </button>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Yeni Fotoğraf Ekle</h2>
              <button
                onClick={closeModal}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadPreview ? (
                <div className="relative">
                  <img
                    src={uploadPreview}
                    alt="Preview"
                    className="w-full h-48 object-cover rounded-sm"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedFile(null);
                      setUploadPreview(null);
                      if (fileInputRef.current) {
                        fileInputRef.current.value = '';
                      }
                    }}
                    className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-sm hover:bg-red-600"
                  >
                    <X size={16} />
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="w-full border-2 border-dashed border-gray-300 rounded-sm p-8 text-center hover:border-[#144793] transition-colors"
                >
                  <Upload size={32} className="mx-auto text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500">Fotoğraf yüklemek için tıklayın</p>
                  <p className="text-xs text-gray-400 mt-1">PNG, JPG, WebP (max 10MB)</p>
                </button>
              )}

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık (Opsiyonel)</label>
                <input
                  type="text"
                  value={newPhotoTitle}
                  onChange={(e) => setNewPhotoTitle(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="Fotoğraf başlığı"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={closeModal}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleAddPhoto}
                disabled={!selectedFile || isUploading}
                className="px-4 py-2 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50 inline-flex items-center gap-2"
              >
                {isUploading && <Loader2 size={16} className="animate-spin" />}
                {isUploading ? 'Yükleniyor...' : 'Ekle'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
