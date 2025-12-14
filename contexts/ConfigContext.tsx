'use client';

import { createContext, useContext, ReactNode } from 'react';
import { SiteConfig, defaultConfig } from '@/lib/config';

interface ConfigContextType {
  config: SiteConfig;
}

const ConfigContext = createContext<ConfigContextType>({
  config: defaultConfig,
});

export function ConfigProvider({
  children,
  config,
}: {
  children: ReactNode;
  config: SiteConfig;
}) {
  return (
    <ConfigContext.Provider value={{ config }}>
      {children}
    </ConfigContext.Provider>
  );
}

export function useConfigContext() {
  const context = useContext(ConfigContext);
  if (!context) {
    throw new Error('useConfigContext must be used within a ConfigProvider');
  }
  return context;
}


