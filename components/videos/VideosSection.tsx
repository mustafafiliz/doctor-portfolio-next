'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import { useEffect, useMemo, useState, useCallback } from 'react';
import { Container } from '@/components/Container';
import Link from 'next/link';
import { getRoute } from '@/lib/routes';
import { usePathname } from 'next/navigation';
import type { Locale } from '@/lib/i18n';
import { X, ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoItem {
  url: string;
  title?: string;
}

interface VideosSectionProps {
  initialVideos: VideoItem[];
  limit?: number;
  showViewAll?: boolean;
}

function getYouTubeId(url: string): string {
  try {
    const u = new URL(url);
    if (u.hostname.includes('youtu.be')) {
      return u.pathname.replace('/', '');
    }
    if (u.pathname.startsWith('/shorts/')) {
      return u.pathname.split('/')[2] || '';
    }
    if (u.pathname === '/watch') {
      return u.searchParams.get('v') || '';
    }
    const parts = u.pathname.split('/');
    const idx = parts.findIndex((p) => p === 'embed');
    if (idx !== -1 && parts[idx + 1]) return parts[idx + 1];
    return '';
  } catch {
    return '';
  }
}

export function VideosSection({ initialVideos, limit, showViewAll = false }: VideosSectionProps) {
  const t = useTranslations('videos');
  const pathname = usePathname();
  const currentLocale = (pathname?.split("/")[1] || "tr") as Locale;

  const videos = useMemo(() => {
    return limit ? initialVideos.slice(0, limit) : initialVideos;
  }, [initialVideos, limit]);

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => {
    setSelectedIndex(index);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = useCallback(() => {
    setSelectedIndex(null);
    document.body.style.overflow = 'unset';
  }, []);

  const nextVideo = useCallback(() => {
    setSelectedIndex((prev: number | null) => {
      if (prev === null) return null;
      return prev < videos.length - 1 ? prev + 1 : 0;
    });
  }, [videos.length]);

  const prevVideo = useCallback(() => {
    setSelectedIndex((prev: number | null) => {
      if (prev === null) return null;
      return prev > 0 ? prev - 1 : videos.length - 1;
    });
  }, [videos.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedIndex === null) return;

      if (e.key === 'Escape') closeModal();
      if (e.key === 'ArrowRight') nextVideo();
      if (e.key === 'ArrowLeft') prevVideo();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedIndex, closeModal, nextVideo, prevVideo]);

  return (
    <Container className="py-8 md:py-16">
      <div className="text-left mb-12">
        <h2 className="text-3xl md:text-3xl font-bold text-gray-900 mb-4">
          {t('title')}
        </h2>
        <p className="text-gray-600 max-w-3xl text-lg">
          Prof. Dr. Kadriye Ufuk Elgin’in 25 yılı aşkın tecrübesiyle glokom, katarakt ve genel göz sağlığı üzerine hazırladığı bilgilendirici videoları bu bölümde bulabilirsiniz.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-6">
        {videos.map((item, idx) => {
          const id = getYouTubeId(item.url);
          const thumb = id ? `https://img.youtube.com/vi/${id}/hqdefault.jpg` : '';

          return (
            <div key={idx} className="flex flex-col gap-2 group">
              <div
                onClick={() => openModal(idx)}
                className="relative overflow-hidden rounded-sm bg-muted cursor-pointer hover:shadow-xl transition-all duration-300 aspect-video block w-full group"
              >
                {thumb ? (
                  <Image
                    src={thumb}
                    alt={item.title || 'Video'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                ) : (
                  <div className="flex items-center justify-center w-full h-full bg-muted text-muted-foreground">Video</div>
                )}

                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />

                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 scale-75 group-hover:scale-100">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm shadow-lg">
                    <Play className="w-5 h-5 text-primary ml-1 fill-current" />
                  </div>
                </div>
              </div>

              {item.title && (
                <div className="px-1">
                  <p className="text-base font-semibold text-gray-900 line-clamp-2 group-hover:text-primary transition-colors cursor-pointer" onClick={() => openModal(idx)}>
                    {item.title}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {showViewAll && (
        <div className="text-left mt-10 flex justify-center">
          <Link
            href={`/${currentLocale}${getRoute("videos", currentLocale)}`}
            className="inline-flex items-center justify-center px-8 py-3 text-base font-medium text-white bg-primary hover:bg-primary/90 rounded-sm transition-colors duration-200 shadow-sm hover:shadow-md"
          >
            Tümünü Göster
          </Link>
        </div>
      )}

      {/* Video Modal */}
      {selectedIndex !== null && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm animate-in fade-in duration-200">
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 text-white/70 hover:text-white transition-colors z-[101] p-2"
          >
            <X className="w-8 h-8" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); prevVideo(); }}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hidden sm:block"
          >
            <ChevronLeft className="w-10 h-10" />
          </button>

          <button
            onClick={(e) => { e.stopPropagation(); nextVideo(); }}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white/70 hover:text-white transition-colors p-2 hidden sm:block"
          >
            <ChevronRight className="w-10 h-10" />
          </button>

          <div className="w-full max-w-5xl aspect-video px-4 sm:px-12 relative" onClick={(e) => e.stopPropagation()}>
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(videos[selectedIndex].url)}?autoplay=1&rel=0`}
              className="w-full h-full rounded-lg shadow-2xl bg-black"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            {videos[selectedIndex].title && (
              <div className="absolute -bottom-12 left-0 right-0 text-center px-4">
                <p className="text-white text-lg font-medium line-clamp-1">
                  {videos[selectedIndex].title}
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </Container>
  );
}