'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useEffect, useState } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Container } from '@/components/Container';

export function GallerySection() {
  const t = useTranslations('gallery');
  const [activeTab, setActiveTab] = useState('photos');

  // Mock gerçek resimler - Özel grid layout için
  const photos = [
    {
      id: 1,
      src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=1200&fit=crop',
      alt: 'Göz muayenesi',
      thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 2,
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=1200&fit=crop',
      alt: 'Göz cerrahisi',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 3,
      src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=1200&fit=crop',
      alt: 'Katarakt tedavisi',
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 4,
      src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=1200&fit=crop',
      alt: 'Göz sağlığı',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 5,
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=1200&fit=crop',
      alt: 'Göz lensleri',
      thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=1200&fit=crop',
      size: 'tall', // Dikey - 2 satır kaplayacak
    },
    {
      id: 6,
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=1200&fit=crop',
      alt: 'Göz travması tedavisi',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 7,
      src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=1200&fit=crop',
      alt: 'Göz muayene odası',
      thumbnail: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 8,
      src: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&h=1200&fit=crop',
      alt: 'Göz cerrahi ekipmanları',
      thumbnail: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 9,
      src: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=1200&h=1200&fit=crop',
      alt: 'Modern göz kliniği',
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=1200&fit=crop',
      size: 'tall',
    },
    {
      id: 10,
      src: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=1200&h=1200&fit=crop',
      alt: 'Göz muayene cihazı',
      thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 11,
      src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=1200&h=1200&fit=crop',
      alt: 'Göz cerrahisi operasyonu',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 12,
      src: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=1200&fit=crop',
      alt: 'Göz sağlığı kontrolü',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 13,
      src: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=1200&h=1200&fit=crop',
      alt: 'Göz lensleri',
      thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=600&h=1200&fit=crop',
      size: 'tall',
    },
    {
      id: 14,
      src: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=1200&h=1200&fit=crop',
      alt: 'Göz travması tedavisi',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=600&fit=crop',
      size: 'square',
    },
    {
      id: 15,
      src: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=1200&h=1200&fit=crop',
      alt: 'Göz muayene odası',
      thumbnail: 'https://images.unsplash.com/photo-1551601651-2a8555f1a136?w=600&h=600&fit=crop',
      size: 'square',
    },
  ];

  const videos = [
    {
      id: 1,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=450&fit=crop',
      title: 'Göz Sağlığı Hakkında',
    },
    {
      id: 2,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=800&h=450&fit=crop',
      title: 'Katarakt Cerrahisi',
    },
    {
      id: 3,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=450&fit=crop',
      title: 'Glokom Tedavisi',
    },
    {
      id: 4,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=800&h=450&fit=crop',
      title: 'Göz Muayenesi',
    },
    {
      id: 5,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?w=800&h=450&fit=crop',
      title: 'Akıllı Lensler',
    },
    {
      id: 6,
      src: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
      thumbnail: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=800&h=450&fit=crop',
      title: 'Göz Travmaları',
    },
  ];

  useEffect(() => {
    // Initialize Fancybox
    // @ts-expect-error - Fancybox options type definitions may not be complete
    Fancybox.bind('[data-fancybox]', {
      Toolbar: {
        display: {
          left: ['infobar'],
          middle: [],
          right: ['slideshow', 'download', 'thumbs', 'close'],
        },
      },
      Thumbs: {
        autoStart: false,
      },
    });

    return () => {
      Fancybox.unbind('[data-fancybox]');
      Fancybox.close();
    };
  }, []);

  // Fotoğraf kartı component'i
  const PhotoCard = ({ photo, className = '' }: { photo: typeof photos[0]; className?: string }) => {
    // Dikey görseller için özel yükseklik hesaplama
    const isTall = className.includes('aspect-[2/3]');
    
    return (
      <a
        href={photo.src}
        data-fancybox="gallery"
        data-caption={photo.alt}
        className={`group relative overflow-hidden rounded-xl bg-muted cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className} ${isTall ? 'w-full' : ''}`}
      >
        <Image
          src={photo.thumbnail}
          alt={photo.alt}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
          <p className="text-xs font-semibold drop-shadow-lg">{photo.alt}</p>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-7 h-7 bg-white/90 rounded-full flex items-center justify-center backdrop-blur-sm">
            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </a>
    );
  };

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {t('title')}
        </h1>
      </div>

      <Tabs defaultValue="photos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6 sm:mb-8 h-12 sm:h-14 bg-gradient-to-r from-muted/50 via-muted/30 to-muted/50 backdrop-blur-xl rounded-2xl p-1 sm:p-1.5 border border-border/50 shadow-xl">
          <TabsTrigger 
            value="photos" 
            className={`rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === 'photos' 
                ? 'bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground shadow-lg shadow-primary/30' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('photos')}
          </TabsTrigger>
          <TabsTrigger 
            value="videos"
            className={`rounded-xl text-sm sm:text-base font-semibold transition-all duration-300 ${
              activeTab === 'videos' 
                ? 'bg-gradient-to-r from-primary via-primary/90 to-accent text-primary-foreground shadow-lg shadow-primary/30' 
                : 'text-muted-foreground hover:text-foreground'
            }`}
          >
            {t('videos')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="photos" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
            {photos.map((photo) => (
              <PhotoCard key={photo.id} photo={photo} className="aspect-square" />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="videos" className="mt-6 sm:mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {videos.map((video) => (
              <a
                key={video.id}
                href={video.src}
                data-fancybox="videos"
                data-caption={video.title}
                className="group relative aspect-video overflow-hidden rounded-xl bg-muted cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02]"
              >
                <Image
                  src={video.thumbnail}
                  alt={video.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  unoptimized
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors duration-300">
                  <div className="w-20 h-20 rounded-full bg-white/95 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-xl">
                    <svg
                      className="w-10 h-10 text-primary ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-sm font-semibold text-white">{video.title}</p>
                </div>
              </a>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </Container>
  );
}
