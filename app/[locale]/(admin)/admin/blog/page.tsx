'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  Plus,
  Search,
  Edit,
  Trash2,
  Eye,
  Calendar,
  Tag,
  Loader2,
  AlertCircle,
} from 'lucide-react';
import { blogApi } from '@/lib/api';
import type { Blog } from '@/lib/types';

export default function AdminBlogPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'published' | 'draft'>('all');
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const blogsData = await blogApi.list({ 
          page, 
          limit: 20,
          status: statusFilter !== 'all' ? statusFilter : undefined,
        });
        
        setBlogs(blogsData.data || []);
        setTotalPages(blogsData.totalPages || 1);
      } catch (err) {
        setError('Blog verileri yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [page, statusFilter]);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesSearch;
  });

  const handleDelete = async (id: string) => {
    if (!confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
      return;
    }

    setIsDeleting(id);
    try {
      await blogApi.delete(id);
      setBlogs(blogs.filter((blog) => blog._id !== id));
    } catch (err) {
      alert('Blog silinirken bir hata oluştu');
    } finally {
      setIsDeleting(null);
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
          <h1 className="text-2xl font-bold text-gray-800">Blog Yazıları</h1>
          <p className="text-gray-500 text-sm mt-1">
            Toplam {blogs.length} yazı
          </p>
        </div>
        <Link
          href={`/${currentLocale}/admin/blog/yeni`}
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#144793] text-white rounded-sm hover:bg-[#0f3a7a] transition-colors"
        >
          <Plus size={20} />
          <span>Yeni Yazı</span>
        </Link>
      </div>

      {error && (
        <div className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

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
            onChange={(e) => {
              setStatusFilter(e.target.value as typeof statusFilter);
              setPage(1);
            }}
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
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600 hidden lg:table-cell">Tarih</th>
                <th className="text-left px-4 py-3 text-sm font-medium text-gray-600">Durum</th>
                <th className="text-right px-4 py-3 text-sm font-medium text-gray-600">İşlemler</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredBlogs.map((blog) => (
                <tr key={blog._id} className="hover:bg-gray-50">
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
                          href={`/${currentLocale}/admin/blog/${blog.slug}`}
                          className="font-medium text-gray-800 hover:text-[#144793] block truncate"
                        >
                          {blog.title}
                        </Link>
                        <p className="text-sm text-gray-500 truncate max-w-xs">{blog.excerpt}</p>
                      </div>
                    </div>
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
                        href={`/${currentLocale}/blog/${blog.slug}`}
                        target="_blank"
                        className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-sm"
                        title="Görüntüle"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link
                        href={`/${currentLocale}/admin/blog/${blog.slug}`}
                        className="p-2 text-gray-400 hover:text-[#144793] hover:bg-gray-100 rounded-sm"
                        title="Düzenle"
                      >
                        <Edit size={18} />
                      </Link>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        disabled={isDeleting === blog._id}
                        className="p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-sm disabled:opacity-50"
                        title="Sil"
                      >
                        {isDeleting === blog._id ? (
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

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">Sonuç bulunamadı</p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1 border border-gray-300 rounded-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Önceki
          </button>
          <span className="text-sm text-gray-600">
            Sayfa {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="px-3 py-1 border border-gray-300 rounded-sm disabled:opacity-50 hover:bg-gray-50"
          >
            Sonraki
          </button>
        </div>
      )}
    </div>
  );
}
