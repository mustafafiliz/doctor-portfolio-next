# Doktor Portföy Web Sitesi

Prof. Dr. Kadriye Ufuk Elgin için geliştirilmiş modern, çok dilli doktor portföy web sitesi.

## Özellikler

- ✅ Next.js 16 (App Router) ile geliştirilmiş
- ✅ TypeScript desteği
- ✅ Tailwind CSS ile stil yönetimi
- ✅ shadcn/ui component kütüphanesi
- ✅ Çok dilli destek (Türkçe/İngilizce) - next-intl
- ✅ Dinamik config API yönetimi
- ✅ SEO optimizasyonu
- ✅ Responsive tasarım
- ✅ WhatsApp entegrasyonu

## Sayfalar

- **Ana Sayfa**: Hero carousel, özet, uzmanlıklar ve hasta yorumları
- **Hakkımda**: Doktor hakkında detaylı bilgiler
- **Uzmanlıklar**: Göz hastalıkları ve tedavi alanları
- **Galeri**: Foto ve video galeri
- **İletişim**: İletişim formu ve bilgileri
- **SSS**: Sık sorulan sorular
- **Blog**: Blog yazıları

## Kurulum

```bash
npm install
npm run dev
```

## Config API

Site renkleri, meta bilgileri ve iletişim bilgileri `/api/config` endpoint'inden yönetilebilir.

Config dosyası: `lib/config.ts`

## Dil Dosyaları

Dil dosyaları `messages/` klasöründe:

- `tr.json` - Türkçe
- `en.json` - İngilizce

## Dinamik Renk Yönetimi

shadcn/ui componentlerinin renkleri config API'den gelen değerlere göre dinamik olarak ayarlanır. Renkler CSS değişkenleri üzerinden yönetilir.

## Geliştirme

```bash
# Development server
npm run dev

# Production build
npm run build

# Production server
npm start
```

## Lisans

Özel proje - Tüm hakları saklıdır.
