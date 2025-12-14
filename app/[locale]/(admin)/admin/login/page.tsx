"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

export default function AdminLoginPage() {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = pathname?.split("/")[1] || "tr";
  const currentYear = new Date().getFullYear();

  const {
    login,
    isAuthenticated,
    isLoading: authLoading,
    error: authError,
    clearError
  } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated && !authLoading) {
      router.push(`/${currentLocale}/admin/dashboard`);
    }
  }, [isAuthenticated, authLoading, router, currentLocale]);

  // Show auth error
  useEffect(() => {
    if (authError) {
      setError(authError);
      clearError();
    }
  }, [authError, clearError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");

    try {
      await login({ email, password });
      router.push(`/${currentLocale}/admin/dashboard`);
    } catch {
      // Error is handled by auth context
      setIsSubmitting(false);
    }
  };

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#144793]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Sol Taraf - Görsel */}
      <div className="hidden lg:flex lg:w-1/2 relative bg-[#144793]">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <svg
            className="w-full h-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <defs>
              <pattern
                id="grid"
                width="10"
                height="10"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 10 0 L 0 0 0 10"
                  fill="none"
                  stroke="white"
                  strokeWidth="0.5"
                />
              </pattern>
            </defs>
            <rect width="100" height="100" fill="url(#grid)" />
          </svg>
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col justify-between w-full p-12">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-white rounded-sm flex items-center justify-center">
              <span className="text-[#144793] font-bold text-xl">DR</span>
            </div>
          </div>

          {/* Center Content */}
          <div className="flex-1 flex items-center justify-center py-12">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-8 -left-8 w-32 h-32 bg-white/10 rounded-full blur-3xl"></div>
              <div className="absolute -bottom-8 -right-8 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>

              <div className="relative bg-white/10 backdrop-blur-sm rounded-sm p-8 border border-white/20 text-center">
                <div className="w-20 h-20 mx-auto mb-6 bg-white/20 rounded-full flex items-center justify-center">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                    />
                  </svg>
                </div>
                <h3 className="text-white text-2xl font-bold mb-2">
                  Güvenli Giriş
                </h3>
                <p className="text-white/70">
                  Yönetim paneline erişim için kimlik doğrulaması yapın
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="text-white/50 text-sm">
            <p>© {currentYear} Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>

      {/* Sağ Taraf - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12 bg-gray-50">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-[#144793] rounded-sm mb-4">
              <span className="text-white font-bold text-2xl">DR</span>
            </div>
            <h1 className="text-2xl font-bold text-gray-800">Admin Panel</h1>
          </div>

          {/* Welcome Text */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Hoş Geldiniz</h1>
            <p className="text-gray-500 mt-2">
              Yönetim paneline erişmek için giriş yapın
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-50 text-red-600 px-4 py-3 rounded-sm text-sm border border-red-100">
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Email Adresi
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail size={18} className="text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none transition-all bg-white"
                  placeholder="ornek@email.com"
                  required
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Şifre
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-400" />
                </div>
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-12 py-3 border border-gray-200 rounded-sm focus:ring-2 focus:ring-[#144793] focus:border-transparent outline-none transition-all bg-white"
                  placeholder="Şifrenizi girin"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-gray-300 text-[#144793] focus:ring-[#144793]"
                />
                <span className="text-sm text-gray-600">Beni hatırla</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#144793] text-white py-3 rounded-sm font-medium hover:bg-[#0f3a7a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Giriş yapılıyor...
                </span>
              ) : (
                "Giriş Yap"
              )}
            </button>
          </form>

          {/* Footer for mobile */}
          <div className="lg:hidden mt-8 text-center text-sm text-gray-400">
            <p>© {currentYear} Tüm hakları saklıdır.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
