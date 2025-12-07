'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
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
  Plus,
} from 'lucide-react';

// TODO: API'den istatistikleri çek
const mockStats = {
  totalBlogs: 12,
  totalSpecialties: 8,
  totalGalleryItems: 24,
  totalFAQ: 15,
  pageViews: 1234,
  monthlyGrowth: 12.5,
};

// TODO: API'den son aktiviteleri çek
const mockRecentActivity = [
  { id: 1, type: 'blog', title: 'Glokom Nedir?', action: 'güncellendi', date: '2 saat önce' },
  { id: 2, type: 'specialty', title: 'Katarakt Ameliyatı', action: 'eklendi', date: '5 saat önce' },
  { id: 3, type: 'gallery', title: 'Yeni fotoğraf', action: 'yüklendi', date: '1 gün önce' },
  { id: 4, type: 'faq', title: 'Ameliyat sonrası bakım', action: 'eklendi', date: '2 gün önce' },
];

const quickActions = [
  { name: 'Yeni Blog Yazısı', href: '/admin/blog/yeni', icon: FileText, color: 'bg-blue-500' },
  { name: 'Yeni Uzmanlık', href: '/admin/uzmanliklar/yeni', icon: Stethoscope, color: 'bg-green-500' },
  { name: 'Fotoğraf Yükle', href: '/admin/galeri', icon: Images, color: 'bg-purple-500' },
  { name: 'Yeni SSS', href: '/admin/faq/yeni', icon: HelpCircle, color: 'bg-orange-500' },
];

export default function AdminDashboardPage() {
  const [stats, setStats] = useState(mockStats);
  const [recentActivity, setRecentActivity] = useState(mockRecentActivity);

  useEffect(() => {
    // TODO: API'den verileri çek
    // const fetchDashboardData = async () => {
    //   const response = await fetch('/api/admin/dashboard');
    //   const data = await response.json();
    //   setStats(data.stats);
    //   setRecentActivity(data.recentActivity);
    // };
    // fetchDashboardData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-[#144793] to-[#1e5ba8] rounded-sm p-6 text-white">
        <h1 className="text-2xl font-bold">Hoş Geldiniz</h1>
        <p className="text-white/80 mt-1">
          Sitenizi buradan yönetebilirsiniz. Hızlı erişim için aşağıdaki kısayolları kullanın.
        </p>
      </div>

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
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-blue-100 rounded-sm flex items-center justify-center">
              <FileText size={20} className="text-blue-600" />
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
              <TrendingUp size={14} />
              +3
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalBlogs}</p>
          <p className="text-sm text-gray-500">Blog Yazısı</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-green-100 rounded-sm flex items-center justify-center">
              <Stethoscope size={20} className="text-green-600" />
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
              <TrendingUp size={14} />
              +1
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalSpecialties}</p>
          <p className="text-sm text-gray-500">Uzmanlık Alanı</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-purple-100 rounded-sm flex items-center justify-center">
              <Images size={20} className="text-purple-600" />
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
              <TrendingUp size={14} />
              +5
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalGalleryItems}</p>
          <p className="text-sm text-gray-500">Galeri Öğesi</p>
        </div>

        <div className="bg-white rounded-sm p-5 border border-gray-200">
          <div className="flex items-center justify-between">
            <div className="w-10 h-10 bg-orange-100 rounded-sm flex items-center justify-center">
              <HelpCircle size={20} className="text-orange-600" />
            </div>
            <span className="text-xs text-green-600 font-medium flex items-center gap-0.5">
              <TrendingUp size={14} />
              +2
            </span>
          </div>
          <p className="text-2xl font-bold text-gray-800 mt-3">{stats.totalFAQ}</p>
          <p className="text-sm text-gray-500">SSS</p>
        </div>
      </div>

      {/* Recent Activity & Site Stats */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Recent Activity */}
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Son Aktiviteler</h2>
            <Link href="#" className="text-sm text-[#144793] hover:underline flex items-center gap-1">
              Tümünü Gör <ArrowUpRight size={14} />
            </Link>
          </div>
          <div className="divide-y divide-gray-100">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-center gap-3 p-4 hover:bg-gray-50">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center ${
                  activity.type === 'blog' ? 'bg-blue-100 text-blue-600' :
                  activity.type === 'specialty' ? 'bg-green-100 text-green-600' :
                  activity.type === 'gallery' ? 'bg-purple-100 text-purple-600' :
                  'bg-orange-100 text-orange-600'
                }`}>
                  {activity.type === 'blog' && <FileText size={16} />}
                  {activity.type === 'specialty' && <Stethoscope size={16} />}
                  {activity.type === 'gallery' && <Images size={16} />}
                  {activity.type === 'faq' && <HelpCircle size={16} />}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">{activity.title}</p>
                  <p className="text-xs text-gray-500">{activity.action}</p>
                </div>
                <span className="text-xs text-gray-400">{activity.date}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Site Stats */}
        <div className="bg-white rounded-sm border border-gray-200">
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2 className="font-semibold text-gray-800">Site İstatistikleri</h2>
            <span className="text-xs text-gray-500">Son 30 gün</span>
          </div>
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#144793] rounded-sm flex items-center justify-center">
                  <Eye size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Sayfa Görüntüleme</p>
                  <p className="text-xl font-bold text-gray-800">{stats.pageViews.toLocaleString()}</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">+{stats.monthlyGrowth}%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#144793] rounded-sm flex items-center justify-center">
                  <Users size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Tekil Ziyaretçi</p>
                  <p className="text-xl font-bold text-gray-800">856</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">+8.3%</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-sm">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#144793] rounded-sm flex items-center justify-center">
                  <Calendar size={20} className="text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Ort. Oturum Süresi</p>
                  <p className="text-xl font-bold text-gray-800">2m 45s</p>
                </div>
              </div>
              <span className="text-sm text-green-600 font-medium">+5.2%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

