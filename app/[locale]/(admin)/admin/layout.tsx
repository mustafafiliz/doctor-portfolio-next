'use client';

import { useState, useEffect, useMemo } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  Stethoscope,
  Images,
  Settings,
  HelpCircle,
  User,
  LogOut,
  Menu,
  X,
  ChevronDown,
  Home,
} from 'lucide-react';

// TODO: API'den kullanıcı bilgilerini çek
const mockUser = {
  name: 'Admin',
  email: 'admin@example.com',
  avatar: null,
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Locale'i pathname'den al
  const currentLocale = pathname?.split('/')[1] || 'tr';

  const sidebarItems = useMemo(() => [
    { name: 'Dashboard', href: `/${currentLocale}/admin/dashboard`, icon: LayoutDashboard },
    { name: 'Blog Yazıları', href: `/${currentLocale}/admin/blog`, icon: FileText },
    { name: 'Uzmanlıklar', href: `/${currentLocale}/admin/uzmanliklar`, icon: Stethoscope },
    { name: 'Galeri', href: `/${currentLocale}/admin/galeri`, icon: Images },
    { name: 'SSS (FAQ)', href: `/${currentLocale}/admin/faq`, icon: HelpCircle },
    { name: 'Hakkımda', href: `/${currentLocale}/admin/hakkimda`, icon: User },
    { name: 'Site Ayarları', href: `/${currentLocale}/admin/ayarlar`, icon: Settings },
  ], [currentLocale]);

  // Login sayfasında layout gösterme
  const isLoginPage = pathname?.includes('/admin/login');

  useEffect(() => {
    // TODO: API ile authentication kontrolü yap
    const checkAuth = () => {
      const token = localStorage.getItem('admin_token');
      if (token) {
        setIsAuthenticated(true);
      } else if (!isLoginPage) {
        router.push(`/${currentLocale}/admin/login`);
      }
      setIsLoading(false);
    };
    checkAuth();
  }, [isLoginPage, router, currentLocale]);

  const handleLogout = () => {
    // TODO: API'ye logout isteği gönder
    localStorage.removeItem('admin_token');
    router.push(`/${currentLocale}/admin/login`);
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-64 bg-[#144793] text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between h-16 px-4 border-b border-white/10">
          <Link href={`/${currentLocale}/admin/dashboard`} className="flex items-center gap-2">
            <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
              <span className="text-[#144793] font-bold text-sm">DR</span>
            </div>
            <span className="font-semibold">Admin Panel</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-1 hover:bg-white/10 rounded-sm"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {sidebarItems.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(item.href + '/');
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-sm transition-colors ${
                  isActive
                    ? 'bg-white text-[#144793] font-medium'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
              >
                <item.icon size={20} />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 px-3 py-2.5 text-white/80 hover:bg-white/10 hover:text-white rounded-sm transition-colors"
          >
            <Home size={20} />
            <span>Siteyi Görüntüle</span>
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-64">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white border-b border-gray-200 h-16">
          <div className="flex items-center justify-between h-full px-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 hover:bg-gray-100 rounded-sm"
            >
              <Menu size={24} />
            </button>

            <div className="hidden lg:block">
              <h1 className="text-lg font-semibold text-gray-800">
                {sidebarItems.find((item) => pathname === item.href || pathname?.startsWith(item.href + '/'))?.name || 'Dashboard'}
              </h1>
            </div>

            <div className="flex items-center gap-4">
              <div className="relative group">
                <button className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-sm">
                  <div className="w-8 h-8 bg-[#144793] text-white rounded-full flex items-center justify-center text-sm font-medium">
                    {mockUser.name.charAt(0)}
                  </div>
                  <span className="hidden sm:block text-sm font-medium text-gray-700">
                    {mockUser.name}
                  </span>
                  <ChevronDown size={16} className="text-gray-500" />
                </button>

                <div className="absolute right-0 mt-1 w-48 bg-white rounded-sm shadow-lg border border-gray-200 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all">
                  <div className="p-3 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-800">{mockUser.name}</p>
                    <p className="text-xs text-gray-500">{mockUser.email}</p>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="w-full flex items-center gap-2 px-3 py-2.5 text-sm text-red-600 hover:bg-red-50 transition-colors"
                  >
                    <LogOut size={16} />
                    <span>Çıkış Yap</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}

