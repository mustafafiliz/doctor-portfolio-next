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
              Prof. Dr. Sirel Gür Güngör
            </h2>
            <h3 className="text-xl md:text-2xl font-medium opacity-90 mb-8">
              Göz Hastalıkları Uzmanı
            </h3>

            <div className="space-y-6 text-base md:text-lg leading-relaxed opacity-90">
              <p>
                1997–2003 yılları arasında Ankara Üniversitesi Tıp Fakültesinde aldığım tıp eğitimini dönem birincisi olarak tamamladım. Ardından, 2003–2008 yılları arasında Başkent Üniversitesi Tıp Fakültesi Göz Hastalıkları Anabilim Dalında tıpta uzmanlık eğitimimi tamamlayarak göz hastalıkları uzmanı oldum.
              </p>
              <p>
                2009–2011 yılları arasında, Çankırı Devlet Hastanesinde Devlet Hizmeti Yükümlülüğü kapsamında görev yaptım. 2011 yılında Başkent Üniversitesi Tıp Fakültesi Göz Hastalıkları A.B.D.’da Uzman Doktor olarak göreve başladım.
              </p>
              <p>
                2012 yılında Öğretim Görevlisi, 2015 yılında Doktor Öğretim Üyesi, 2018 yılında Doçent oldum. 2023 tarihinde Profesör unvanı aldım. Akademik ve klinik çalışmalarımı özellikle üveit ve oküler inflamasyon hastalıkları, glokom, katarakt ve medikal retina alanlarında sürdürmekteyim.
              </p>

              <Link href="/hakkimda" className='underline font-semibold'>Devamını Oku</Link>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="w-full lg:w-1/2 relative min-h-[400px] lg:min-h-full">
            <Image
              src="/images/icons/dr-kadriye-ufuk-elgin-1.png"
              alt="Prof. Dr. Sirel Gür Güngör"
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
