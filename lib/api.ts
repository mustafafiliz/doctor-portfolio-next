// Doktorlariniz Admin API Client
import type {
  LoginRequest,
  LoginResponse,
  User,
  ResetPasswordRequest,
  WebsiteSettings,
  AboutSection,
  UpdateAboutRequest,
  Blog,
  BlogCategory,
  BlogListResponse,
  CreateBlogRequest,
  UpdateBlogRequest,
  Specialty,
  SpecialtyCategory,
  SpecialtyListResponse,
  CreateSpecialtyRequest,
  UpdateSpecialtyRequest,
  GalleryPhoto,
  GalleryListResponse,
  CreateGalleryPhotoRequest,
  UpdateGalleryPhotoRequest,
  ReorderGalleryRequest,
  FAQ,
  CreateFAQRequest,
  UpdateFAQRequest,
  ReorderFAQRequest,
  ContactMessage,
  ContactListResponse,
  ContactSubmitRequest,
  PublicWebsiteResponse,
  PublicBlogListResponse,
  PublicSpecialtyListResponse,
  PublicGalleryResponse,
  PublicFAQResponse
} from "./types";

// API Configuration
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://api.doktorlariniz.com";
const WEBSITE_ID = process.env.NEXT_PUBLIC_WEBSITE_ID || "";

// Token Management
export const getToken = (): string | null => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("admin_token");
};

export const setToken = (token: string): void => {
  if (typeof window === "undefined") return;
  localStorage.setItem("admin_token", token);
};

export const removeToken = (): void => {
  if (typeof window === "undefined") return;
  localStorage.removeItem("admin_token");
};

// API Error Class
export class ApiError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.name = "ApiError";
  }
}

// Base Fetch Function
async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {},
  isPublic: boolean = false
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const headers: Record<string, string> = {};

  // Copy existing headers
  if (options.headers) {
    if (options.headers instanceof Headers) {
      options.headers.forEach((value, key) => {
        headers[key] = value;
      });
    } else if (Array.isArray(options.headers)) {
      options.headers.forEach(([key, value]) => {
        headers[key] = value;
      });
    } else {
      const existingHeaders = options.headers as Record<string, string>;
      Object.keys(existingHeaders).forEach((key) => {
        headers[key] = existingHeaders[key];
      });
    }
  }

  // Add Content-Type for JSON requests (not for FormData)
  if (!(options.body instanceof FormData)) {
    headers["Content-Type"] = "application/json";
  }

  // Add x-website-id header to all requests
  if (WEBSITE_ID) {
    headers["x-website-id"] = WEBSITE_ID;
  }

  // Add Authorization header for authenticated requests
  if (!isPublic) {
    const token = getToken();
    if (token) {
      headers["Authorization"] = `Bearer ${token}`;
    }
  }

  const response = await fetch(url, {
    ...options,
    headers
  });

  // Handle 204 No Content
  if (response.status === 204) {
    return {} as T;
  }

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new ApiError(data.message || "Bir hata oluştu", response.status);
  }

  return data;
}

// ============ Authentication API ============
export const authApi = {
  login: (credentials: LoginRequest): Promise<LoginResponse> =>
    apiFetch("/user/login", {
      method: "POST",
      body: JSON.stringify(credentials)
    }),

  getMe: (): Promise<User> => apiFetch("/user/me"),

  resetPassword: (data: ResetPasswordRequest): Promise<{ message: string }> =>
    apiFetch("/user/reset-password", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  logout: (): void => {
    removeToken();
  }
};

// ============ Website Settings API ============
export const websiteApi = {
  get: (): Promise<WebsiteSettings> => apiFetch("/website"),

  update: (data: Partial<WebsiteSettings>): Promise<WebsiteSettings> =>
    apiFetch("/website", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateSite: (data: FormData): Promise<WebsiteSettings> =>
    apiFetch("/website/site", {
      method: "PUT",
      body: data
    }),

  updateColors: (data: WebsiteSettings["colors"]): Promise<WebsiteSettings> =>
    apiFetch("/website/colors", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateContact: (data: WebsiteSettings["contact"]): Promise<WebsiteSettings> =>
    apiFetch("/website/contact", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateWorkingHours: (
    data: WebsiteSettings["workingHours"]
  ): Promise<WebsiteSettings> =>
    apiFetch("/website/working-hours", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateSocial: (data: WebsiteSettings["social"]): Promise<WebsiteSettings> =>
    apiFetch("/website/social", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateMaps: (data: WebsiteSettings["maps"]): Promise<WebsiteSettings> =>
    apiFetch("/website/maps", {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateSeo: (data: FormData): Promise<WebsiteSettings> =>
    apiFetch("/website/seo", {
      method: "PUT",
      body: data
    }),

  updateHero: (data: FormData): Promise<WebsiteSettings> =>
    apiFetch("/website/hero", {
      method: "PUT",
      body: data
    }),

  // About Section
  getAbout: (): Promise<AboutSection> => apiFetch("/website/about"),

  updateAbout: (data: FormData): Promise<AboutSection> =>
    apiFetch("/website/about", {
      method: "PUT",
      body: data
    }),

  updateAboutJson: (data: UpdateAboutRequest): Promise<AboutSection> =>
    apiFetch("/website/about", {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    })
};

// ============ Blog API ============
export const blogApi = {
  // Categories
  listCategories: (): Promise<BlogCategory[]> =>
    apiFetch("/blog/category/list"),

  createCategory: (data: { name: string }): Promise<BlogCategory> =>
    apiFetch("/blog/category", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  updateCategory: (id: string, data: { name: string }): Promise<BlogCategory> =>
    apiFetch(`/blog/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  deleteCategory: (id: string): Promise<void> =>
    apiFetch(`/blog/category/${id}`, {
      method: "DELETE"
    }),

  // Blogs
  list: (params?: {
    page?: number;
    limit?: number;
    status?: string;
    categoryId?: string;
  }): Promise<BlogListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.status) searchParams.set("status", params.status);
    if (params?.categoryId) searchParams.set("categoryId", params.categoryId);

    const query = searchParams.toString();
    return apiFetch(`/blog${query ? `?${query}` : ""}`);
  },

  getBySlug: (slug: string): Promise<Blog> => apiFetch(`/blog/${slug}`),

  create: (data: FormData): Promise<Blog> =>
    apiFetch("/blog", {
      method: "POST",
      body: data
    }),

  update: (id: string, data: FormData): Promise<Blog> =>
    apiFetch(`/blog/${id}`, {
      method: "PUT",
      body: data
    }),

  delete: (id: string): Promise<void> =>
    apiFetch(`/blog/${id}`, {
      method: "DELETE"
    })
};

// ============ Specialty API ============
export const specialtyApi = {
  // Categories
  listCategories: (): Promise<SpecialtyCategory[]> =>
    apiFetch("/specialty/category/list"),

  createCategory: (data: {
    title: string;
    slug?: string;
    description?: string;
    order?: number;
  }): Promise<SpecialtyCategory> =>
    apiFetch("/specialty/category", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  createCategoryWithImage: (data: FormData): Promise<SpecialtyCategory> =>
    apiFetch("/specialty/category", {
      method: "POST",
      body: data
    }),

  updateCategory: (
    id: string,
    data: {
      title?: string;
      slug?: string;
      description?: string;
      order?: number;
    }
  ): Promise<SpecialtyCategory> =>
    apiFetch(`/specialty/category/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  updateCategoryWithImage: (
    id: string,
    data: FormData
  ): Promise<SpecialtyCategory> =>
    apiFetch(`/specialty/category/${id}`, {
      method: "PUT",
      body: data
    }),

  deleteCategory: (id: string): Promise<void> =>
    apiFetch(`/specialty/category/${id}`, {
      method: "DELETE"
    }),

  // Specialties
  list: (params?: {
    page?: number;
    limit?: number;
    categoryId?: string;
  }): Promise<SpecialtyListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());
    if (params?.categoryId) searchParams.set("categoryId", params.categoryId);

    const query = searchParams.toString();
    return apiFetch(`/specialty${query ? `?${query}` : ""}`);
  },

  getBySlug: (slug: string): Promise<Specialty> =>
    apiFetch(`/specialty/${slug}`),

  create: (data: FormData): Promise<Specialty> =>
    apiFetch("/specialty", {
      method: "POST",
      body: data
    }),

  createJson: (data: CreateSpecialtyRequest): Promise<Specialty> =>
    apiFetch("/specialty", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }),

  update: (id: string, data: FormData): Promise<Specialty> =>
    apiFetch(`/specialty/${id}`, {
      method: "PUT",
      body: data
    }),

  updateJson: (id: string, data: UpdateSpecialtyRequest): Promise<Specialty> =>
    apiFetch(`/specialty/${id}`, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    }),

  delete: (id: string): Promise<void> =>
    apiFetch(`/specialty/${id}`, {
      method: "DELETE"
    })
};

// ============ Gallery API ============
export const galleryApi = {
  list: (): Promise<GalleryListResponse> => apiFetch("/gallery"),

  create: (data: FormData): Promise<GalleryPhoto> =>
    apiFetch("/gallery", {
      method: "POST",
      body: data
    }),

  update: (id: string, data: FormData): Promise<GalleryPhoto> =>
    apiFetch(`/gallery/${id}`, {
      method: "PUT",
      body: data
    }),

  delete: (id: string): Promise<void> =>
    apiFetch(`/gallery/${id}`, {
      method: "DELETE"
    }),

  reorder: (data: ReorderGalleryRequest): Promise<void> =>
    apiFetch("/gallery/reorder", {
      method: "PUT",
      body: JSON.stringify(data)
    })
};

// ============ FAQ API ============
export const faqApi = {
  list: (): Promise<FAQ[]> => apiFetch("/faq?limit=100"),

  create: (data: CreateFAQRequest): Promise<FAQ> =>
    apiFetch("/faq", {
      method: "POST",
      body: JSON.stringify(data)
    }),

  update: (id: string, data: UpdateFAQRequest): Promise<FAQ> =>
    apiFetch(`/faq/${id}`, {
      method: "PUT",
      body: JSON.stringify(data)
    }),

  delete: (id: string): Promise<void> =>
    apiFetch(`/faq/${id}`, {
      method: "DELETE"
    }),

  reorder: (data: ReorderFAQRequest): Promise<void> =>
    apiFetch("/faq/reorder", {
      method: "PUT",
      body: JSON.stringify(data)
    })
};

// ============ Contact API ============
export const contactApi = {
  // Public endpoint - submit form
  submit: (
    websiteId: string,
    data: ContactSubmitRequest
  ): Promise<{ message: string }> =>
    apiFetch(
      `/contact/submit/${websiteId}`,
      {
        method: "POST",
        body: JSON.stringify(data)
      },
      true
    ),

  // Admin endpoints
  list: (params?: {
    page?: number;
    limit?: number;
  }): Promise<ContactListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const query = searchParams.toString();
    return apiFetch(`/contact${query ? `?${query}` : ""}`);
  },

  get: (id: string): Promise<ContactMessage> => apiFetch(`/contact/${id}`),

  delete: (id: string): Promise<void> =>
    apiFetch(`/contact/${id}`, {
      method: "DELETE"
    }),

  markAsRead: (id: string): Promise<ContactMessage> =>
    apiFetch(`/contact/${id}/read`, {
      method: "PUT"
    }),

  markAsReplied: (id: string): Promise<ContactMessage> =>
    apiFetch(`/contact/${id}/reply`, {
      method: "PUT"
    })
};

// ============ Public API (No Authentication Required) ============
export const publicApi = {
  getWebsite: (websiteId: string): Promise<PublicWebsiteResponse> =>
    apiFetch(`/website/public/${websiteId}`, {}, true),

  getGallery: (websiteId: string): Promise<PublicGalleryResponse> =>
    apiFetch(`/gallery/public/${websiteId}`, {}, true),

  getBlogs: (
    websiteId: string,
    params?: { page?: number; limit?: number }
  ): Promise<PublicBlogListResponse> => {
    const searchParams = new URLSearchParams();
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.limit) searchParams.set("limit", params.limit.toString());

    const query = searchParams.toString();
    return apiFetch(
      `/blog/public/${websiteId}${query ? `?${query}` : ""}`,
      {},
      true
    );
  },

  getBlogBySlug: (websiteId: string, slug: string): Promise<Blog> =>
    apiFetch(`/blog/public/${websiteId}/${slug}`, {}, true),

  getSpecialties: (websiteId: string): Promise<PublicSpecialtyListResponse> =>
    apiFetch(`/specialty/public/${websiteId}`, {}, true),

  getSpecialtyBySlug: (websiteId: string, slug: string): Promise<Specialty> =>
    apiFetch(`/specialty/public/${websiteId}/${slug}`, {}, true),

  getFAQs: (websiteId: string): Promise<PublicFAQResponse> =>
    apiFetch(`/faq/public/${websiteId}`, {}, true)
};

// Helper function to get website ID
export const getWebsiteId = (): string => {
  return WEBSITE_ID;
};
