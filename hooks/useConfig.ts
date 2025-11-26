'use client';

import { useState, useEffect } from 'react';
import { SiteConfig, defaultConfig } from '@/lib/config';

export function useConfig() {
  const [config, setConfig] = useState<SiteConfig>(defaultConfig);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchConfig() {
      try {
        const response = await fetch('/api/config');
        const data = await response.json();
        setConfig(data);
      } catch (error) {
        console.error('Failed to fetch config:', error);
        setConfig(defaultConfig);
      } finally {
        setLoading(false);
      }
    }

    fetchConfig();
  }, []);

  return { config, loading };
}

