'use client';

import { useEffect } from 'react';
import { useConfig } from '@/hooks/useConfig';
import { applyThemeColors } from '@/lib/theme';

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const { config } = useConfig();

  useEffect(() => {
    if (config) {
      applyThemeColors(config);
    }
  }, [config]);

  return <>{children}</>;
}

