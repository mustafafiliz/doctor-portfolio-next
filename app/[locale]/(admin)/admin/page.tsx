'use client';

import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';

export default function AdminPage() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname?.split('/')[1] || 'tr';

  useEffect(() => {
    router.replace(`/${currentLocale}/admin/dashboard`);
  }, [currentLocale, router]);

  return null;
}

