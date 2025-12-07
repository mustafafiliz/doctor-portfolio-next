'use client';

import { useState, useEffect } from 'react';
import {
  Plus,
  Search,
  Trash2,
  Image as ImageIcon,
  Video,
  X,
  Eye,
  Upload,
  Grid,
  List,
} from 'lucide-react';

// TODO: API'den galeri verilerini çek
const mockGalleryItems = [
  { id: '1', type: 'image', url: '/images/gallery/1.jpg', title: 'Muayene Odası', createdAt: '2024-01-15' },
  { id: '2', type: 'image', url: '/images/gallery/2.jpg', title: 'Ameliyat Salonu', createdAt: '2024-01-14' },
  { id: '3', type: 'image', url: '/images/gallery/3.jpg', title: 'Bekleme Salonu', createdAt: '2024-01-13' },
  { id: '4', type: 'video', url: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ', title: 'Klinik Tanıtım', createdAt: '2024-01-12' },
  { id: '5', type: 'image', url: '/images/gallery/4.jpg', title: 'Cihazlar', createdAt: '2024-01-11' },
  { id: '6', type: 'image', url: '/images/gallery/5.jpg', title: 'Ekip', createdAt: '2024-01-10' },
];

export default function AdminGalleryPage() {
  const [items, setItems] = useState(mockGalleryItems);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<'all' | 'image' | 'video'>('all');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showAddModal, setShowAddModal] = useState(false);
  const [newItem, setNewItem] = useState({ type: 'image' as 'image' | 'video', url: '', title: '' });

  const filteredItems = items.filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Bu öğeyi silmek istediğinizden emin misiniz?')) {
      // TODO: API'ye silme isteği gönder
      // await fetch(`/api/admin/gallery/${id}`, { method: 'DELETE' });
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleAddItem = async () => {
    if (!newItem.url || !newItem.title) return;

    // TODO: API'ye ekleme isteği gönder
    // const response = await fetch('/api/admin/gallery', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify(newItem),
    // });

    const newGalleryItem = {
      id: Date.now().toString(),
      ...newItem,
      createdAt: new Date().toISOString().split('T')[0],
    };

    setItems([newGalleryItem, ...items]);
    setNewItem({ type: 'image', url: '', title: '' });
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Galeri</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {items.length} öğe ({items.filter((i) => i.type === 'image').length} fotoğraf, {items.filter((i) => i.type === 'video').length} video)
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Ekle</span>
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
              <ImageIcon size={20} className="text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{items.filter((i) => i.type === 'image').length}</p>
              <p className="text-sm text-gray-500">Fotoğraf</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-purple-100 rounded-sm flex items-center justify-center">
              <Video size={20} className="text-purple-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{items.filter((i) => i.type === 'video').length}</p>
              <p className="text-sm text-gray-500">Video</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-sm border border-gray-200 p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
              <Grid size={20} className="text-green-600" />
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-800">{items.length}</p>
              <p className="text-sm text-gray-500">Toplam</p>
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value as typeof typeFilter)}
            className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
          >
            <option value="all">Tümü</option>
            <option value="image">Fotoğraflar</option>
            <option value="video">Videolar</option>
          </select>
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
          {filteredItems.map((item) => (
            <div key={item.id} className="group relative bg-white rounded-sm border border-gray-200 overflow-hidden">
              <div className="aspect-square bg-gray-100 relative">
                {item.type === 'image' ? (
                  <img
                    src={item.url}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-gray-900">
                    <Video size={40} className="text-white/50" />
                  </div>
                )}
                <div className="absolute top-2 left-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-sm text-xs font-medium ${
                    item.type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                  }`}>
                    {item.type === 'image' ? <ImageIcon size={12} className="mr-1" /> : <Video size={12} className="mr-1" />}
                    {item.type === 'image' ? 'Foto' : 'Video'}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-2 bg-white rounded-sm text-gray-700 hover:bg-gray-100"
                  >
                    <Eye size={18} />
                  </a>
                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 bg-red-500 rounded-sm text-white hover:bg-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-gray-800 truncate">{item.title}</p>
                <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString('tr-TR')}</p>
              </div>
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
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Tür</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden lg:table-cell">Tarih</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="w-16 h-16 bg-gray-100 rounded-sm overflow-hidden">
                      {item.type === 'image' ? (
                        <img src={item.url} alt={item.title} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-900">
                          <Video size={24} className="text-white/50" />
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-800">{item.title}</p>
                    <p className="text-xs text-gray-500 truncate max-w-xs">{item.url}</p>
                  </td>
                  <td className="px-4 py-3 hidden md:table-cell">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium ${
                      item.type === 'image' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700'
                    }`}>
                      {item.type === 'image' ? 'Fotoğraf' : 'Video'}
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell text-sm text-gray-500">
                    {new Date(item.createdAt).toLocaleDateString('tr-TR')}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center justify-end gap-1">
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
                      >
                        <Eye size={18} />
                      </a>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredItems.length === 0 && (
        <div className="text-center py-12 bg-white rounded-sm border border-gray-200">
          <p className="text-gray-500">Sonuç bulunamadı</p>
        </div>
      )}

      {/* Add Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-sm w-full max-w-md">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-800">Yeni Öğe Ekle</h2>
              <button
                onClick={() => setShowAddModal(false)}
                className="p-1 hover:bg-gray-100 rounded-sm"
              >
                <X size={20} />
              </button>
            </div>
            <div className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Tür</label>
                <select
                  value={newItem.type}
                  onChange={(e) => setNewItem({ ...newItem, type: e.target.value as 'image' | 'video' })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
                >
                  <option value="image">Fotoğraf</option>
                  <option value="video">Video</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">Başlık</label>
                <input
                  type="text"
                  value={newItem.title}
                  onChange={(e) => setNewItem({ ...newItem, title: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder="Öğe başlığı"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  {newItem.type === 'image' ? 'Fotoğraf URL' : 'Video URL (YouTube)'}
                </label>
                <input
                  type="url"
                  value={newItem.url}
                  onChange={(e) => setNewItem({ ...newItem, url: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
                  placeholder={newItem.type === 'image' ? 'https://...' : 'https://youtube.com/watch?v=...'}
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 p-4 border-t border-gray-200">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-sm hover:bg-gray-50"
              >
                İptal
              </button>
              <button
                onClick={handleAddItem}
                disabled={!newItem.url || !newItem.title}
                className="px-4 py-2 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] disabled:opacity-50"
              >
                Ekle
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

