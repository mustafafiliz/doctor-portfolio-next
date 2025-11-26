// Dynamic theme configuration based on config API
import { SiteConfig } from './config';

export function generateThemeCSS(config: SiteConfig): string {
  const { primary, secondary, accent } = config.colors;
  
  // Convert hex to RGB for CSS variables
  function hexToRgb(hex: string): string {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    if (!result) return '0, 0, 0';
    return `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}`;
  }

  return `
    :root {
      --color-primary: ${primary};
      --color-primary-rgb: ${hexToRgb(primary)};
      --color-secondary: ${secondary};
      --color-secondary-rgb: ${hexToRgb(secondary)};
      --color-accent: ${accent};
      --color-accent-rgb: ${hexToRgb(accent)};
    }
  `;
}

export function applyThemeColors(config: SiteConfig) {
  if (typeof window !== 'undefined') {
    const root = document.documentElement;
    root.style.setProperty('--color-primary', config.colors.primary);
    root.style.setProperty('--color-secondary', config.colors.secondary);
    root.style.setProperty('--color-accent', config.colors.accent);
  }
}

