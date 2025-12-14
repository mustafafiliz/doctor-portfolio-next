'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FileText,
  Stethoscope,
  Images,
  HelpCircle,
  Eye,
  TrendingUp,
  Users,
  Calendar,
  ArrowUpRight,
  MessageSquare,
  Loader2,
} from 'lucide-react';
import { blogApi, specialtyApi, galleryApi, faqApi, contactApi } from '@/lib/api';

interface DashboardStats {
  totalBlogs: number;
  totalSpecialties: number;
  totalGalleryItems: number;
  totalFAQ: number;
  unreadMessages: number;
}

export default function AdminDashboardPage() {
  const pathname = usePathname();
  const currentLocale = pathname?.split('/')[1] || 'tr';
  
  const [stats, setStats] = useState<DashboardStats>({
    totalBlogs: 0,
    totalSpecialties: 0,
    totalGalleryItems: 0,
    totalFAQ: 0,
    unreadMessages: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const quickActions = [
    { name: 'Yeni Blog Yazısı', href: `/${currentLocale}/admin/blog/yeni`, icon: FileText, color: 'bg-blue-500' },
    { name: 'Yeni Uzmanlık', href: `/${currentLocale}/admin/uzmanliklar/yeni`, icon: Stethoscope, color: 'bg-green-500' },
    { name: 'Fotoğraf Yükle', href: `/${currentLocale}/admin/galeri`, icon: Images, color: 'bg-purple-500' },
    { name: 'Yeni SSS', href: `/${currentLocale}/admin/faq`, icon: HelpCircle, color: 'bg-orange-500' },
  ];

  useEffect(() => {
    const fetchDashboardData = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        // Fetch all data in parallel
        const [blogsData, specialtiesData, galleryData, faqsData, contactData] = await Promise.all([
          blogApi.list().catch(() => ({ data: [], total: 0 })),
          specialtyApi.list().catch(() => ({ data: [], total: 0 })),
          galleryApi.list().catch(() => ({ data: [], total: 0 })),
          faqApi.list().catch(() => []),
          contactApi.list().catch(() => ({ data: [], unreadCount: 0 })),
        ]);
        
        // Debug: API response'larını kontrol et
        console.log('Dashboard API Responses:', {
          blogsData,
          specialtiesData,
          galleryData,
          faqsData,
          contactData
        });
        
        setStats({
          // total field'ı varsa onu kullan, yoksa data.length kullan
          totalBlogs: blogsData.total ?? (blogsData.data?.length || 0),
          totalSpecialties: specialtiesData.total ?? (specialtiesData.data?.length || 0),
          totalGalleryItems: galleryData.total ?? (galleryData.data?.length || 0),
          totalFAQ: Array.isArray(faqsData) ? faqsData.length : (faqsData?.data?.length || 0),
          unreadMessages: contactData.unreadCount || 0,
        });
      } catch (err) {
        console.error('Dashboard veri yükleme hatası:', err);
        setError('Veriler yüklenirken bir hata oluştu');
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 className="w-8 h-8 animate-spin text-[#144793]" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#144793] to-[#1e5ba8] rounded-sm p-6 text-white">
        <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
        <p className="text-white/80 mt-1">
          Sitenizi buradan yönetebilirsiniz. Hızlı erişim için aşağıdaki kısayolları kullanın.
        </p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
          {error}
        </div>
      )}

      {/* Quick Actions */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {quickActions.map((action) => (
          <Link
            key={action.href}
            href={action.href}
            className="flex flex-col items-center gap-2 p-4 bg-white rounded-sm border border-gray-200 hover:border-[#144793] hover:shadow-md transition-all group"
          >
            <div className={`w-12 h-12 ${action.color} rounded-sm flex items-center justify-center text-white group-hover:scale-110 transition-transform`}>
              <action.icon size={24} />
            </div>
            <span className="text-sm font-medium text-gray-700 text-center">{action.name}</span>
          </Link>
        ))}
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalBlogs}</p>
          <p className="text-sm text-gray-500">Blog Yazısı</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
              <Stethoscope size={20} className="text-green-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalSpecialties}</p>
          <p className="text-sm text-gray-500">Uzmanlık Alanı</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-purple-100 rounded-sm flex items-center justify-center">
              <Images size={20} className="text-purple-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalGalleryItems}</p>
          <p className="text-sm text-gray-500">Galeri Öğesi</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-orange-100 rounded-sm flex items-center justify-center">
              <HelpCircle size={20} className="text-orange-600" />
            </div>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalFAQ}</p>
          <p className="text-sm text-gray-500">SSS</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-red-100 rounded-sm flex items-center justify-center">
              <MessageSquare size={20} className="text-red-600" />
            </div>
            {stats.unreadMessages > 0 && (
              <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded-full">
                Yeni
              </span>
            )}
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.unreadMessages}</p>
          <p className="text-sm text-gray-500">Okunmamış Mesaj</p>
        </div>
      </div>

      {/* Quick Links */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Hızlı Erişim</h2>
          </div>
          <div className="p-4 space-y-2">
            <Link
              href={`/${currentLocale}/admin/blog`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <FileText size={18} className="text-blue-600" />
                <span className="text-gray-700">Blog Yazılarını Yönet</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}/admin/uzmanliklar`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <Stethoscope size={18} className="text-green-600" />
                <span className="text-gray-700">Uzmanlık Alanlarını Yönet</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}/admin/galeri`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <Images size={18} className="text-purple-600" />
                <span className="text-gray-700">Galeriyi Yönet</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}/admin/mesajlar`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <MessageSquare size={18} className="text-red-600" />
                <span className="text-gray-700">Mesajları Görüntüle</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Site Yönetimi</h2>
          </div>
          <div className="p-4 space-y-2">
            <Link
              href={`/${currentLocale}/admin/ayarlar`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <Eye size={18} className="text-[#144793]" />
                <span className="text-gray-700">Site Ayarları</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}/admin/hakkimda`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <Users size={18} className="text-[#144793]" />
                <span className="text-gray-700">Hakkımda Sayfası</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}/admin/faq`}
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <HelpCircle size={18} className="text-orange-600" />
                <span className="text-gray-700">SSS Yönetimi</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
            <Link
              href={`/${currentLocale}`}
              target="_blank"
              className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-sm transition-colors"
            >
              <div className="flex items-center gap-3">
                <Calendar size={18} className="text-gray-600" />
                <span className="text-gray-700">Siteyi Görüntüle</span>
              </div>
              <ArrowUpRight size={16} className="text-gray-400" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
