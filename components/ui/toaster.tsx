'use client';

import { useToast } from '@/hooks/use-toast';
import { useEffect, useState } from 'react';

export function Toaster() {
  const { toasts } = useToast();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="fixed bottom-0 right-0 z-[100] flex flex-col gap-2 p-4 max-w-[420px] w-full">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`flex items-center gap-4 rounded-lg border p-4 shadow-lg ${
            toast.variant === 'destructive'
              ? 'bg-destructive text-destructive-foreground'
              : 'bg-background text-foreground'
          }`}
        >
          <div className="flex-1">
            {toast.title && <div className="font-semibold">{toast.title}</div>}
            {toast.description && <div className="text-sm opacity-90">{toast.description}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}
