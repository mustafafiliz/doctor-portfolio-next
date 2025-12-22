'use client';

import { useConfig } from '@/hooks/useConfig';
import Image from 'next/image';
import Link from 'next/link';

export function WhatsAppButton() {
  const { config } = useConfig();

  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex items-center justify-center rounded-full shadow-lg transition-all hover:shadow-xl overflow-hidden"
      aria-label="WhatsApp ile iletişime geç"
    >
      <Image src={"/images/whatsapp2.png"} alt="WhatsApp" width={60} height={60} />
    </Link>
  );
}

