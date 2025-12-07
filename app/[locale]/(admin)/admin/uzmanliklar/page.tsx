'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  FolderOpen,
  ChevronRight,
} from 'lucide-react';
import specialtiesData from '@/data/specialties.json';

export default function AdminSpecialtiesPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [specialties, setSpecialties] = useState(specialtiesData.specialties);

  const filteredSpecialties = specialties.filter((specialty) => {
    const matchesSearch = specialty.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || specialty.categoryId === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const getCategoryName = (categoryId: string) => {
    return specialtiesData.categories.find((c) => c.id === categoryId)?.title || categoryId;
  };

  const handleDelete = async (slug: string) => {
    if (confirm('Bu uzmanlık alanını silmek istediğinizden emin misiniz?')) {
      // TODO: API'ye silme isteği gönder
      // await fetch(`/api/admin/specialties/${slug}`, { method: 'DELETE' });
      setSpecialties(specialties.filter((s) => s.slug !== slug));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Uzmanlık Alanları</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {specialties.length} uzmanlık alanı
          </p>
        </div>
        <Link
          href="/admin/uzmanliklar/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Uzmanlık</span>
        </Link>
      </div>

      {/* Categories Overview */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {specialtiesData.categories.map((category) => {
          const count = specialties.filter((s) => s.categoryId === category.id).length;
          return (
            <button
              key={category.id}
              onClick={() => setCategoryFilter(categoryFilter === category.id ? 'all' : category.id)}
              className={`p-4 rounded-sm border transition-all ${
                categoryFilter === category.id
                  ? 'border-[#144793] bg-[#144793]/5'
                  : 'border-gray-200 bg-white hover:border-[#144793]'
              }`}
            >
              <div className="text-2xl font-bold text-[#144793]">{count}</div>
              <div className="text-xs text-gray-600 mt-1 truncate">{category.title}</div>
            </button>
          );
        })}
      </div>

      {/* Filters */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Uzmanlık ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
          >
            <option value="all">Tüm Kategoriler</option>
            {specialtiesData.categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Specialties List */}
      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Uzmanlık</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden lg:table-cell">İlgili Yazılar</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSpecialties.map((specialty) => (
                <tr key={specialty.slug} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                        {specialty.image ? (
                          <Image
                            src={specialty.image}
                            alt={specialty.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <FolderOpen size={20} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/admin/uzmanliklar/${specialty.slug}`}
                          className="font-medium text-gray-800 hover:text-[#144793] block truncate"
                        >
                          {specialty.title}
                        </Link>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{specialty.description}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-gray-100 text-gray-700 text-xs font-medium">
                      {getCategoryName(specialty.categoryId)}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <span className="text-sm text-gray-500">
                      {specialty.relatedSlugs?.length || 0} yazı
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/tr/${specialty.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
                        title="Görüntüle"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/uzmanliklar/${specialty.slug}`}
                        className="p-2 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
                        title="Düzenle"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(specialty.slug)}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm"
                        title="Sil"
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

        {filteredSpecialties.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Sonuç bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}

