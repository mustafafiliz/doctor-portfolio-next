'use client';

import Image from 'next/image';
import { useTranslations } from '@/components/I18nProvider';
import Link from 'next/link';

export function SummarySection() {
  const t = useTranslations('about');

  return (
    <section className="py-16 md:py-24 !pb-5 bg-white">
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
                Tıp Fakültesi lisans eğitimimi 1985-1991 yılları arasında Hacettepe Üniversitesi Tıp Fakültesinde gerçekleştirdikten sonra, tıpta uzmanlık eğitimimi ise tıpta uzmanlık sınavı (TUS) 3. sü olarak girdiğim Hacettepe Üniversitesi Tıp Fakültesi Göz Anabilim dalında 1996 yılında tamamladım.
              </p>
              <p>
                Türkiye nin en büyük göz hastanelerinde, genel oftalmoloji, katarakt cerrahisi ve glokom cerrahisi alanlarında 25 yılı aşkın süredir çalışmaktayım. Ulusal ve uluslararası seçkin dergilerde basılmış 150 nin üzerinde makalem bulunmaktadır.
              </p>

              <Link href="/hakkimda" className='underline font-semibold'>Devamını Oku</Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
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
