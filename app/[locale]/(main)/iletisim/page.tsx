import { notFound } from 'next/navigation';
import { getConfig } from '@/lib/config';
import type { Metadata } from 'next';
import { ContactForm } from '@/components/contact/ContactForm';
import { ContactInfo } from '@/components/contact/ContactInfo';
import { ContactMap } from '@/components/contact/ContactMap';
import { getDictionary } from '../../dictionaries';
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

  const dict = await getDictionary(validLocale);
  const config = await getConfig();

  return {
    title: `${dict.contact.title} - ${config.meta.siteName}`,
    description: `${dict.contact.subtitle} - ${config.meta.siteName}`,
  };
}

export default async function ContactPage({
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
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900">
          {dict.contact.title}
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground px-4">{dict.contact.description}</p>
      </div>

      {/* İletişim Bilgileri ve Form */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 mb-8 sm:mb-12">
        <ContactInfo />
        <ContactForm />
      </div>

      {/* Harita */}
      <div className="mt-8 sm:mt-12">
        <h2 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">{dict.contact.mapTitle}</h2>
        <ContactMap />
      </div>
    </Container>
  );
}
