import { notFound } from 'next/navigation';
import { getDictionary } from '../dictionaries';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  const config = await getConfig();
  const dict = await getDictionary(validLocale);

  return {
    title: `${dict.about.title} - ${config.meta.siteName}`,
    description: config.meta.defaultDescription,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locale as Locale;
  
  if (!locales.includes(validLocale)) {
    notFound();
  }

  const dict = await getDictionary(validLocale);

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-foreground via-primary to-foreground bg-clip-text text-transparent">
            {dict.about.title}
          </h1>
        </div>
        
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-left">
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
            İlköğretimi Kırıkkale Tınaz ilköğretim okulunda, orta öğretimi TED vakfı Ankara Kolejinde, 
            lise öğretimi ise Ankara Fen Lisesinde tamamladım. Tıp Fakültesi lisans eğitimimi 1985-1991 
            yılları arasında Hacettepe Üniversitesi Tıp Fakültesinde gerçekleştirdikten sonra, tıpta 
            uzmanlık eğitimimi ise tıpta uzmanlık sınavı (TUS) 3.sü olarak girdiğim Hacettepe Üniversitesi 
            Tıp Fakültesi Göz Anabilim dalında 1996 yılında tamamladım.
          </p>

          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
            Türkiye&apos;nin en büyük göz hastanelerinde, genel oftalmoloji, katarakt cerrahisi ve glokom 
            cerrahisi alanlarında 25 yılı aşkın süredir çalışmaktayım. Ulusal ve uluslararası seçkin 
            dergilerde basılmış 150&apos;nin üzerinde makalem, editörleri arasında yer aldığım bir glokom 
            kitabı, 12 adet kitap bölümüm ve ulusal ve uluslararası kongrelerde sunulmuş 150&apos;nin üzerinde 
            bildirimim bulunmaktadır. Ayrıca uzun süredir &quot;Glokom Katarakt Dergisi&quot; editör yardımcılığı 
            görevini yürütmekteyim.
          </p>

          <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.education}</h2>
          <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>Hacettepe Üniversitesi Tıp Fakültesi - Lisans (1985-1991)</li>
            <li>Hacettepe Üniversitesi Tıp Fakültesi Göz Anabilim Dalı - Uzmanlık (1996)</li>
            <li>TUS Sınavı 3. sıra</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.experience}</h2>
          <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>SBÜ Ulucanlar Göz Hastanesi - Uzman Hekim</li>
            <li>SBÜ Ulucanlar Göz Hastanesi 1. Göz Kliniği - Şef Yardımcısı (2008-2012)</li>
            <li>SBÜ Ulucanlar Göz Hastanesi - Eğitim Sorumlusu (2013-2021)</li>
            <li>Sağlık Bilimleri Üniversitesi - Profesör Doktor, Öğretim Üyesi (2017-)</li>
            <li>Ankara Tunus Dünya Göz Hastanesi - Profesör Doktor (2021-)</li>
          </ul>

          <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.publications}</h2>
          <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
            <li>150+ ulusal ve uluslararası makale</li>
            <li>Glokom kitabı editörü</li>
            <li>12 kitap bölümü</li>
            <li>150+ kongre bildirimi</li>
            <li>Glokom Katarakt Dergisi Editör Yardımcısı</li>
          </ul>
        </div>
      </div>
    </Container>
  );
}

