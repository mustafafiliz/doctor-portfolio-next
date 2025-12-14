'use client';

import { useTranslations } from '@/components/I18nProvider';
import Image from 'next/image';
import { useEffect } from 'react';
import { Fancybox } from '@fancyapps/ui';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { Container } from '@/components/Container';
import type { GalleryPhoto } from '@/lib/types';

interface GallerySectionProps {
  initialPhotos: GalleryPhoto[];
}

export function GallerySection({ initialPhotos }: GallerySectionProps) {
  const t = useTranslations('gallery');
  const photos = initialPhotos;

  useEffect(() => {
    if (photos.length > 0) {
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
    }
  }, [photos]);

  // Fotoğraf kartı component'i
  const PhotoCard = ({ photo, className = '' }: { photo: GalleryPhoto; className?: string }) => {
    return (
      <a
        href={photo.url}
        data-fancybox="gallery"
        data-caption={photo.title || ''}
        className={`group relative overflow-hidden rounded-sm bg-muted cursor-pointer hover:shadow-2xl transition-all duration-300 hover:scale-[1.02] ${className}`}
      >
        <Image
          src={photo.url}
          alt={photo.title || ''}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {photo.title && (
          <div className="absolute bottom-0 left-0 right-0 p-3 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-2 group-hover:translate-y-0">
            <p className="text-xs font-semibold drop-shadow-lg">{photo.title}</p>
          </div>
        )}
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-7 h-7 bg-white/90 rounded-sm flex items-center justify-center backdrop-blur-sm">
            <svg className="w-4 h-4 text-gray-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </a>
    );
  };

  if (photos.length === 0) {
    return (
      <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {t('title')}
          </h1>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Henüz galeri fotoğrafı eklenmemiş.</p>
        </div>
      </Container>
    );
  }

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
          {t('title')}
        </h1>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 sm:gap-4">
        {photos.map((photo) => (
          <PhotoCard key={photo._id} photo={photo} className="aspect-square" />
        ))}
      </div>
    </Container>
  );
}
