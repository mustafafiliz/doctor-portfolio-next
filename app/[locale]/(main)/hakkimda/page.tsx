import { notFound } from 'next/navigation';
import { getDictionary } from '../../dictionaries';
import { getConfig, getPublicAbout } from '@/lib/config';
import type { Metadata } from 'next';
import { locales, type Locale } from '@/lib/i18n';
import { Container } from '@/components/Container';
import Image from 'next/image';
import type { AboutSection } from '@/lib/types';

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
  const about = await getPublicAbout() as AboutSection | null;

  return {
    title: `${about?.title || dict.about.title} - ${config.meta.siteName}`,
    description: about?.bio?.substring(0, 160) || config.meta.defaultDescription,
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
  const about = await getPublicAbout() as AboutSection | null;

  return (
    <Container className="py-12 sm:py-16 md:py-20 lg:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8 sm:mb-12">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
            {about?.title || dict.about.title}
          </h1>
          {about?.subtitle && (
            <p className="text-lg text-muted-foreground">{about.subtitle}</p>
          )}
        </div>

        {/* Profile Image */}
        {about?.image && (
          <div className="flex justify-center mb-8">
            <div className="relative w-48 h-48 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 border-primary/20">
              <Image
                src={about.image}
                alt={about.title || 'Profil'}
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
        )}
        
        <div className="prose prose-sm sm:prose-base md:prose-lg max-w-none text-left">
          {/* Bio */}
          {about?.bio ? (
            <div 
              className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-6 sm:mb-8"
              dangerouslySetInnerHTML={{ __html: about.bio }}
            />
          ) : (
            <p className="text-base sm:text-lg text-muted-foreground leading-relaxed mb-4 sm:mb-6">
              Henüz hakkımda bilgisi eklenmemiş.
            </p>
          )}

          {/* Education */}
          {about?.education && about.education.length > 0 && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.education}</h2>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                {about.education.map((edu, index) => (
                  <li key={edu._id || index}>
                    <strong>{edu.year}</strong> - {edu.title}, {edu.institution}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Experience */}
          {about?.experience && about.experience.length > 0 && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.experience}</h2>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                {about.experience.map((exp, index) => (
                  <li key={exp._id || index}>
                    <strong>{exp.years}</strong> - {exp.title}, {exp.institution}
                  </li>
                ))}
              </ul>
            </>
          )}

          {/* Certifications */}
          {about?.certifications && about.certifications.length > 0 && (
            <>
              <h2 className="text-xl sm:text-2xl font-bold mt-6 sm:mt-8 mb-3 sm:mb-4">{dict.about.certifications || 'Sertifikalar'}</h2>
              <ul className="list-disc list-inside space-y-1.5 sm:space-y-2 text-sm sm:text-base text-muted-foreground">
                {about.certifications.map((cert, index) => (
                  <li key={index}>{cert}</li>
                ))}
              </ul>
            </>
          )}
        </div>
      </div>
    </Container>
  );
}
