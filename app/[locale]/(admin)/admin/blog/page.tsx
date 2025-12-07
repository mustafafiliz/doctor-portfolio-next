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
  MoreVertical,
  Calendar,
  Tag,
} from 'lucide-react';

// TODO: API'den blog yazılarını çek
const mockBlogs = [
  {
    id: '1',
    title: 'Glokom Nedir? Belirtileri ve Tedavi Yöntemleri',
    slug: 'glokom-nedir',
    excerpt: 'Glokom, göz içi basıncının artmasıyla ortaya çıkan ve görme sinirini etkileyen ciddi bir göz hastalığıdır...',
    image: '/images/blog/glokom.jpg',
    category: 'Göz Hastalıkları',
    status: 'published',
    createdAt: '2024-01-15',
    views: 1234,
  },
  {
    id: '2',
    title: 'Katarakt Ameliyatı Sonrası Dikkat Edilmesi Gerekenler',
    slug: 'katarakt-ameliyati-sonrasi',
    excerpt: 'Katarakt ameliyatı sonrasında iyileşme sürecini hızlandırmak için dikkat etmeniz gereken önemli noktalar...',
    image: '/images/blog/katarakt.jpg',
    category: 'Ameliyat',
    status: 'published',
    createdAt: '2024-01-10',
    views: 892,
  },
  {
    id: '3',
    title: 'Göz Kuruluğu ve Modern Çözümler',
    slug: 'goz-kurulugu',
    excerpt: 'Dijital çağın en yaygın göz sorunlarından biri olan göz kuruluğu hakkında bilmeniz gerekenler...',
    image: '/images/blog/goz-kurulugu.jpg',
    category: 'Göz Sağlığı',
    status: 'draft',
    createdAt: '2024-01-08',
    views: 0,
  },
];

export default function AdminBlogPage() {
  const [blogs, setBlogs] = useState(mockBlogs);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  useEffect(() => {
    // TODO: API'den blog listesini çek
    // const fetchBlogs = async () => {
    //   const response = await fetch('/api/admin/blogs');
    //   const data = await response.json();
    //   setBlogs(data);
    // };
    // fetchBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || blog.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleDelete = async (id: string) => {
    if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      // TODO: API'ye silme isteği gönder
      // await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Blog Yazıları</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {blogs.length} yazı
          </p>
        </div>
        <Link
          href="/admin/blog/yeni"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Yazı</span>
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-sm border border-gray-200 p-4">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1 relative">
            <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Yazı ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as typeof statusFilter)}
            className="px-4 py-2 border border-gray-300 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none bg-white"
          >
            <option value="all">Tüm Durumlar</option>
            <option value="published">Yayında</option>
            <option value="draft">Taslak</option>
          </select>
        </div>
      </div>

      {/* Blog List */}
      <div className="bg-white rounded-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Yazı</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden md:table-cell">Kategori</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden lg:table-cell">Tarih</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Durum</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBlogs.map((blog) => (
                <tr key={blog.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-gray-100 rounded-sm overflow-hidden flex-shrink-0">
                        {blog.image ? (
                          <Image
                            src={blog.image}
                            alt={blog.title}
                            width={48}
                            height={48}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <Tag size={20} />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/admin/blog/${blog.id}`}
                          className="font-medium text-gray-800 hover:text-[#144793] block truncate"
                        >
                          {blog.title}
                        </Link>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 hidden md:table-cell">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-sm bg-gray-100 text-gray-700 text-xs font-medium">
                      {blog.category}
                    </span>
                  </td>
                  <td className="px-4 py-4 hidden lg:table-cell">
                    <div className="flex items-center gap-1.5 text-sm text-gray-500">
                      <Calendar size={14} />
                      {new Date(blog.createdAt).toLocaleDateString('tr-TR')}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <span
                      className={`inline-flex items-center px-2.5 py-1 rounded-sm text-xs font-medium ${
                        blog.status === 'published'
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}
                    >
                      {blog.status === 'published' ? 'Yayında' : 'Taslak'}
                    </span>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        href={`/tr/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
                        title="Görüntüle"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/admin/blog/${blog.id}`}
                        className="p-2 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
                        title="Düzenle"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog.id)}
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

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Sonuç bulunamadı</p>
          </div>
        )}
      </div>
    </div>
  );
}

