'use client';

import { useConfig } from '@/hooks/useConfig';
import { MessageCircle } from 'lucide-react';
import Link from 'next/link';

export function WhatsAppButton() {
  const { config } = useConfig();

  const whatsappUrl = `https://wa.me/${config.contact.whatsapp.replace(/[^0-9]/g, '')}`;

  return (
    <Link
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex h-12 w-12 sm:h-14 sm:w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-all hover:scale-110 hover:shadow-xl"
      aria-label="WhatsApp ile iletişime geç"
    >
      <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />
    </Link>
  );
}

