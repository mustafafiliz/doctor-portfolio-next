// Config API - Dynamic configuration for the site
export interface SiteConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  meta: {
    siteName: string;
    defaultTitle: string;
    defaultDescription: string;
    defaultKeywords: string;
  };
  contact: {
    phone: string;
    mobile: string;
    email: string;
    address: string;
    whatsapp: string;
  };
  social: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
}

// Default config - This can be replaced with an API call
export const defaultConfig: SiteConfig = {
  colors: {
    primary: "#144793", // Dark blue
    secondary: "#64748b", // Slate
    accent: "#1e5ba8" // Lighter blue accent
  },
  meta: {
    siteName: "Prof. Dr. Kadriye Ufuk Elgin",
    defaultTitle: "Prof. Dr. Kadriye Ufuk Elgin - Göz Doktoru",
    defaultDescription:
      "Prof. Dr. Kadriye Ufuk Elgin - Göz Hastalıkları Uzmanı. Katarakt, Glokom ve Göz Cerrahisi alanında uzman doktor.",
    defaultKeywords:
      "göz doktoru, katarakt, glokom, göz cerrahisi, ankara göz doktoru"
  },
  contact: {
    phone: "+90 312 416 70 00",
    mobile: "+90 544 156 57 55",
    email: "info@kadriyeufukelgin.com",
    address:
      "Dünyagöz Tunus Hastanesi, Tunus Cd. No:28 Kavaklıdere Çankaya/Ankara",
    whatsapp: "+905441565755"
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: ""
  }
};

// Function to fetch config from API (for future use)
export async function getConfig(): Promise<SiteConfig> {
  // In production, this would fetch from an API endpoint
  // For now, return default config
  try {
    // const response = await fetch('/api/config');
    // return await response.json();
    return defaultConfig;
  } catch (error) {
    console.error("Failed to fetch config:", error);
    return defaultConfig;
  }
}
