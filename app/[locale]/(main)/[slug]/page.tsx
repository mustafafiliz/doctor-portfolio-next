import { notFound } from 'next/navigation';
import { type Locale } from '@/lib/i18n';

// Rezerve edilmiş slug'lar (diğer sayfalar)
const reservedSlugs = [
  'hakkimda',
  'uzmanliklar',
  'uzmanlik',
  'galeri',
  'iletisim',
  'sik-sorulan-sorular',
  'blog',
  'admin',
];

export default async function DynamicPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug } = await params;

  // Rezerve edilmiş slug ise 404
  if (reservedSlugs.includes(slug)) {
    notFound();
  }

  // Bu sayfa artık specialty'leri handle etmiyor
  // Specialty'ler /uzmanlik/[slug] route'unda handle ediliyor
  // Bu sayfa sadece diğer dinamik sayfalar için kullanılıyor
  notFound();
}
