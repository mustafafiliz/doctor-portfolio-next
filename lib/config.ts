// Config API - Dynamic configuration for the site
import type { Specialty, SpecialtyCategory } from "./types";

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
  site?: {
    name?: string;
    tagline?: string;
    logo?: string;
    favicon?: string;
  };
  workingHours?: {
    day: string;
    hours: string;
  }[];
  maps?: {
    embedUrl?: string;
    latitude?: string;
    longitude?: string;
  };
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    ctaText?: string;
    ctaUrl?: string;
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
    siteName: "Doktor Portfolio",
    defaultTitle: "Doktor Portfolio",
    defaultDescription: "Doktor web sitesi",
    defaultKeywords: "doktor, sağlık"
  },
  contact: {
    phone: "",
    mobile: "",
    email: "",
    address: "",
    whatsapp: ""
  },
  social: {
    facebook: "",
    instagram: "",
    linkedin: "",
    twitter: ""
  }
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.doktorlariniz.com";
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || "";

// Function to fetch config from API (server-side)
export async function getConfig(): Promise<SiteConfig> {
  if (!WEBSITE_ID) {
    return defaultConfig;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}/website/public/${WEBSITE_ID}`,
      {
        next: { revalidate: 60 }, // Revalidate every 60 seconds
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) {
      throw new Error("Failed to fetch config");
    }

    const data = await response.json();

    // Transform API response to match SiteConfig interface
    return {
      colors: {
        primary: data.colors?.primary || defaultConfig.colors.primary,
        secondary: data.colors?.secondary || defaultConfig.colors.secondary,
        accent: data.colors?.accent || defaultConfig.colors.accent
      },
      meta: {
        siteName: data.site?.name || defaultConfig.meta.siteName,
        defaultTitle:
          data.seo?.metaTitle ||
          data.site?.name ||
          defaultConfig.meta.defaultTitle,
        defaultDescription:
          data.seo?.metaDescription ||
          data.site?.tagline ||
          defaultConfig.meta.defaultDescription,
        defaultKeywords:
          data.seo?.keywords || defaultConfig.meta.defaultKeywords
      },
      contact: {
        phone: data.contact?.phone || "",
        mobile: data.contact?.whatsapp || "",
        email: data.contact?.email || "",
        address: data.contact?.address || "",
        whatsapp: data.contact?.whatsapp || ""
      },
      social: {
        facebook: data.social?.facebook || "",
        instagram: data.social?.instagram || "",
        linkedin: data.social?.linkedin || "",
        twitter: data.social?.twitter || ""
      },
      site: data.site || {},
      workingHours: data.workingHours || [],
      maps: data.maps || {},
      hero: data.hero || {}
    };
  } catch (error) {
    console.error("Failed to fetch config:", error);
    return defaultConfig;
  }
}

// Function to get public API data
export async function getPublicData<T>(endpoint: string): Promise<T | null> {
  if (!WEBSITE_ID) {
    return null;
  }

  try {
    const response = await fetch(
      `${API_BASE_URL}${endpoint}/public/${WEBSITE_ID}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch ${endpoint}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Failed to fetch ${endpoint}:`, error);
    return null;
  }
}

// Specific public data fetchers
export async function getPublicBlogs(params?: {
  page?: number;
  limit?: number;
}) {
  const searchParams = new URLSearchParams();
  if (params?.page) searchParams.set("page", params.page.toString());
  if (params?.limit) searchParams.set("limit", params.limit.toString());

  const query = searchParams.toString();

  if (!WEBSITE_ID) return { data: [], total: 0 };

  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/public/${WEBSITE_ID}${query ? `?${query}` : ""}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch blogs");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blogs:", error);
    return { data: [], total: 0 };
  }
}

export async function getPublicBlogBySlug(slug: string) {
  if (!WEBSITE_ID) return null;

  try {
    const response = await fetch(
      `${API_BASE_URL}/blog/public/${WEBSITE_ID}/${slug}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch blog:", error);
    return null;
  }
}

export async function getPublicSpecialties() {
  if (!WEBSITE_ID) return { categories: [], total: 0 };

  try {
    const response = await fetch(
      `${API_BASE_URL}/specialty/public/${WEBSITE_ID}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch specialties");
    const data = await response.json();

    // API direkt array döndürüyorsa veya categories içinde array varsa
    if (Array.isArray(data)) {
      // API direkt array döndürüyor: [{...}, {...}]
      return { categories: data, total: data.length };
    } else if (data.categories && Array.isArray(data.categories)) {
      // API { categories: [...] } formatında döndürüyor
      return {
        categories: data.categories,
        total: data.total || data.categories.length
      };
    } else {
      // Beklenmeyen format
      console.warn("Unexpected API response format:", data);
      return { categories: [], total: 0 };
    }
  } catch (error) {
    console.error("Failed to fetch specialties:", error);
    return { categories: [], total: 0 };
  }
}

export async function getPublicSpecialtyBySlug(slug: string) {
  if (!WEBSITE_ID) return null;

  try {
    const response = await fetch(
      `${API_BASE_URL}/specialty/public/${WEBSITE_ID}/${slug}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch specialty:", error);
    return null;
  }
}

// Kategoriyi slug'a göre bul (tüm kategorileri çekip içinde ara)
export async function getPublicCategoryBySlug(slug: string) {
  if (!WEBSITE_ID) return null;

  try {
    const specialtiesData = await getPublicSpecialties();
    const categories = specialtiesData.categories || [];
    const category = categories.find(
      (cat: SpecialtyCategory & { specialties?: Specialty[] }) =>
        cat.slug === slug
    );
    return category || null;
  } catch (error) {
    console.error("Failed to fetch category:", error);
    return null;
  }
}

export async function getPublicGallery() {
  if (!WEBSITE_ID) return { data: [], total: 0 };

  try {
    const response = await fetch(
      `${API_BASE_URL}/gallery/public/${WEBSITE_ID}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch gallery");
    return await response.json();
  } catch (error) {
    console.error("Failed to fetch gallery:", error);
    return { data: [], total: 0 };
  }
}

export async function getPublicFAQs() {
  if (!WEBSITE_ID) return { data: [] };

  try {
    const response = await fetch(`${API_BASE_URL}/faq/public/${WEBSITE_ID}`, {
      next: { revalidate: 60 },
      headers: {
        "x-website-id": WEBSITE_ID
      }
    });

    if (!response.ok) throw new Error("Failed to fetch FAQs");
    const data = await response.json();

    // API { data: [...], pagination: {...} } formatında döndürüyor
    if (data.data && Array.isArray(data.data)) {
      return { data: data.data };
    } else if (Array.isArray(data)) {
      // API direkt array döndürüyorsa
      return { data };
    } else {
      console.warn("Unexpected FAQ API response format:", data);
      return { data: [] };
    }
  } catch (error) {
    console.error("Failed to fetch FAQs:", error);
    return { data: [] };
  }
}

export async function getPublicAbout() {
  if (!WEBSITE_ID) return null;

  try {
    // About section comes from the website public endpoint
    const response = await fetch(
      `${API_BASE_URL}/website/public/${WEBSITE_ID}`,
      {
        next: { revalidate: 60 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) return null;
    const data = await response.json();
    return data.about || null;
  } catch (error) {
    console.error("Failed to fetch about:", error);
    return null;
  }
}

export function getWebsiteId(): string {
  return WEBSITE_ID;
}
