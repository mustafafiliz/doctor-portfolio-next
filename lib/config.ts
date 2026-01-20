// Config API - Dynamic configuration for the site
import type { Specialty, SpecialtyCategory, FAQ } from "./types";

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
    youtube?: string;
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

// Empty config - No fallback values, only API data
const emptyConfig: SiteConfig = {
  colors: {
    primary: "",
    secondary: "",
    accent: ""
  },
  meta: {
    siteName: "",
    defaultTitle: "",
    defaultDescription: "",
    defaultKeywords: ""
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
    twitter: "",
    youtube: ""
  }
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.doktorlariniz.com";
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || "";

// Function to fetch config from API (server-side)
// NO FALLBACK VALUES - Only returns API data or empty strings
export async function getConfig(): Promise<SiteConfig> {
  if (!WEBSITE_ID) {
    return emptyConfig;
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
      return emptyConfig;
    }

    const data = await response.json();

    // Transform API response to match SiteConfig interface
    // NO FALLBACK VALUES - Only use API data, empty string if not present
    return {
      colors: {
        primary: data.colors?.primary || "",
        secondary: data.colors?.secondary || "",
        accent: data.colors?.accent || ""
      },
      meta: {
        siteName: data.site?.name || "",
        defaultTitle: data.seo?.metaTitle || data.site?.name || "",
        defaultDescription:
          data.seo?.metaDescription || data.site?.tagline || "",
        defaultKeywords: data.seo?.keywords || ""
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
        twitter: data.social?.twitter || "",
        youtube: data.social?.youtube || ""
      },
      site: data.site || {},
      workingHours: data.workingHours || [],
      maps: data.maps || {},
      hero: data.hero || {}
    };
  } catch (error) {
    return emptyConfig;
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
    return null;
  }
}

export async function getPublicSpecialties() {
  if (!WEBSITE_ID) {
    return { categories: [], total: 0 };
  }

  try {
    const url = `${API_BASE_URL}/specialty/public/${WEBSITE_ID}`;

    const response = await fetch(url, {
      next: { revalidate: 60 },
      headers: {
        "x-website-id": WEBSITE_ID
      }
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `Failed to fetch specialties: ${response.status} ${errorText}`
      );
    }

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
      return { categories: [], total: 0 };
    }
  } catch (error) {
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
    const data = await response.json();

    // API response formatını kontrol et ve normalize et
    // Eğer direkt array ise, { data: [...] } formatına çevir
    if (Array.isArray(data)) {
      return { data, total: data.length };
    }

    // Eğer { data: [...], total: ..., limit: ... } formatında ise direkt döndür
    return data;
  } catch (error) {
    return { data: [], total: 0 };
  }
}

export async function getPublicFAQs() {
  if (!WEBSITE_ID) return { data: [] };

  try {
    const response = await fetch(
      `${API_BASE_URL}/faq/public/${WEBSITE_ID}?limit=100`,
      {
        next: { revalidate: 10 },
        headers: {
          "x-website-id": WEBSITE_ID
        }
      }
    );

    if (!response.ok) throw new Error("Failed to fetch FAQs");
    const data = await response.json();

    // API { data: [...], pagination: {...} } formatında döndürüyor
    if (data.data && Array.isArray(data.data)) {
      const sortedData = (data.data as FAQ[]).sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      return { data: sortedData };
    } else if (Array.isArray(data)) {
      // API direkt array döndürüyorsa
      const sortedData = (data as FAQ[]).sort(
        (a, b) => (a.order || 0) - (b.order || 0)
      );
      return { data: sortedData };
    } else {
      return { data: [] };
    }
  } catch (error) {
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
    return null;
  }
}

export function getWebsiteId(): string {
  return WEBSITE_ID;
}
