'use client';

import Image from 'next/image';
import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { type Locale } from '@/lib/i18n';

export function SummarySection() {
  const t = useTranslations('about');
  const pathname = usePathname();
  const currentLocale = (pathname?.split('/')[1] || 'tr') as Locale;

  return (
    <section className="pb-8 md:pb-12">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row items-stretch gap-0 overflow-hidden shadow-xl rounded-2xl">

          {/* Left Side - Text Content */}
          <div className="w-full lg:w-1/2 bg-primary text-white p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-2">
              Prof. Dr. Kadriye Ufuk Elgin
            </h2>
            <h3 className="text-xl md:text-2xl font-medium opacity-90 mb-8">
              Göz Hastalıkları Uzmanı
            </h3>

            <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-90">
              <p>
                Tıp eğitimimi, Türkiye’nin en önemli üniversitelerinden biri olan Hacettepe üniversitesi tıp fakültesinde, 1991 yılında tamamladım. Ardından, tıpta uzmanlık sınavı (TUS) 3.sü olarak girdiğim Hacettepe Üniversitesi Tıp Fakültesi Göz Anabilim dalında uzmanlık eğitimimi tamamlayarak, 1996 yılında göz hastalıkları uzmanı oldum.
              </p>
              <p>
                30 yılı aşkın süredir Türkiye’nin en büyük göz hastanelerinde genel oftalmoloji, katarakt cerrahisi ve glokom cerrahisi alanlarında çalışmaktayım. Ayrıca bir eğitimci olarak yüzlerce asistan hekimin yetişmesinde katkıda bulundum. Ulusal ve uluslararası seçkin dergilerde basılmış 150’nin üzerinde{' '}
                <Link href={`/${currentLocale}/makaleler`} className="underline font-semibold hover:opacity-80 transition-opacity">
                  makalem
                </Link>
                {' '}bulunmaktadır.
              </p>

              <Link href="/hakkimda" className='underline font-semibold'>Devamını Oku</Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative min-h-[300px] lg:min-h-full">
            <Image
              src="/images/icons/dr-kadriye-ufuk-elgin-1.png"
              alt="Prof. Dr. Kadriye Ufuk Elgin"
              fill
              className="object-cover object-top"
              unoptimized
            />
          </div>

        </div>
      </div>
    </section>
  );
}
