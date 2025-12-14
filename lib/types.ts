// API Response Types for Doktorlariniz Admin API

// ============ Common Types ============
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface ApiError {
  message: string;
  statusCode: number;
  error?: string;
}

// ============ User Types ============
export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'user' | 'admin';
  websiteId?: string;
  mustResetPassword?: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

export interface ResetPasswordRequest {
  currentPassword: string;
  newPassword: string;
}

// ============ Website Types ============
export interface WorkingHour {
  day: string;
  hours: string;
}

export interface WebsiteSettings {
  _id: string;
  userId: string;
  
  // Site Info
  site: {
    name: string;
    tagline: string;
    logo?: string;
    favicon?: string;
  };
  
  // Colors
  colors: {
    primary: string;
    accent: string;
    secondary?: string;
  };
  
  // Contact Info
  contact: {
    email: string;
    phone: string;
    whatsapp?: string;
    address: string;
  };
  
  // Working Hours
  workingHours: WorkingHour[];
  
  // Social Media
  social: {
    facebook?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
  
  // Maps
  maps: {
    embedUrl?: string;
    latitude?: string;
    longitude?: string;
  };
  
  // SEO
  seo: {
    metaTitle?: string;
    metaDescription?: string;
    keywords?: string;
    ogImage?: string;
  };
  
  // Hero Section
  hero?: {
    title?: string;
    subtitle?: string;
    description?: string;
    image?: string;
    ctaText?: string;
    ctaUrl?: string;
  };
  
  createdAt: string;
  updatedAt: string;
}

// ============ About Types ============
export interface Education {
  _id?: string;
  year: string;
  title: string;
  institution: string;
}

export interface Experience {
  _id?: string;
  years: string;
  title: string;
  institution: string;
}

export interface AboutSection {
  _id: string;
  websiteId: string;
  title: string;
  subtitle?: string;
  image?: string;
  bio: string;
  education: Education[];
  experience: Experience[];
  certifications: string[];
  createdAt: string;
  updatedAt: string;
}

export interface UpdateAboutRequest {
  title?: string;
  subtitle?: string;
  image?: string;
  bio?: string;
  education?: Education[];
  experience?: Experience[];
  certifications?: string[];
}

// ============ Blog Types ============
export interface BlogCategory {
  _id: string;
  name: string;
  slug: string;
  websiteId: string;
  blogCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Blog {
  _id: string;
  websiteId: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  image?: string;
  categoryId?: string;
  category?: BlogCategory;
  tags?: string[];
  status: 'draft' | 'published';
  publishedAt?: string;
  views?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateBlogRequest {
  title: string;
  slug?: string;
  excerpt?: string;
  content: string;
  image?: File;
  categoryId?: string;
  tags?: string[];
  status?: 'draft' | 'published';
}

export interface UpdateBlogRequest extends Partial<CreateBlogRequest> {}

export interface BlogListResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============ Specialty Types ============
export interface SpecialtyCategory {
  _id: string;
  name: string;
  title?: string;
  slug: string;
  description?: string;
  order?: number;
  websiteId: string;
  specialtyCount?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpecialtyCategoryRequest {
  title: string;
  slug?: string;
  description?: string;
  order?: number;
}

export interface UpdateSpecialtyCategoryRequest {
  title?: string;
  slug?: string;
  description?: string;
  order?: number;
}

export interface Specialty {
  _id: string;
  websiteId: string;
  title: string;
  slug: string;
  description?: string;
  content: string;
  image?: string;
  categoryId?: string;
  category?: SpecialtyCategory;
  relatedSlugs?: string[];
  order?: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateSpecialtyRequest {
  title: string;
  slug?: string;
  description?: string;
  content: string;
  image?: File;
  categoryId?: string;
  order?: number;
}

export interface UpdateSpecialtyRequest extends Partial<CreateSpecialtyRequest> {}

export interface SpecialtyListResponse {
  data: Specialty[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// ============ Gallery Types ============
export interface GalleryPhoto {
  _id: string;
  websiteId: string;
  url: string;
  title?: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateGalleryPhotoRequest {
  photo: File;
  title?: string;
  order?: number;
}

export interface UpdateGalleryPhotoRequest {
  photo?: File;
  title?: string;
  order?: number;
}

export interface GalleryListResponse {
  data: GalleryPhoto[];
  total: number;
  limit: number;
}

export interface ReorderGalleryRequest {
  items: { _id: string; order: number }[];
}

// ============ FAQ Types ============
export interface FAQ {
  _id: string;
  websiteId: string;
  question: string;
  answer: string;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateFAQRequest {
  question: string;
  answer: string;
  order?: number;
}

export interface UpdateFAQRequest extends Partial<CreateFAQRequest> {}

export interface ReorderFAQRequest {
  items: { _id: string; order: number }[];
}

// ============ Contact Types ============
export interface ContactMessage {
  _id: string;
  websiteId: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  isRead: boolean;
  isReplied: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ContactSubmitRequest {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
}

export interface ContactListResponse {
  data: ContactMessage[];
  total: number;
  unreadCount: number;
  page: number;
  limit: number;
}

// ============ Public API Response Types ============
export interface PublicWebsiteResponse extends WebsiteSettings {
  about?: AboutSection;
}

export interface PublicBlogListResponse {
  data: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

export interface PublicSpecialtyListResponse {
  categories: (SpecialtyCategory & { specialties: Specialty[] })[];
  total: number;
}

export interface PublicGalleryResponse {
  data: GalleryPhoto[];
  total: number;
}

export interface PublicFAQResponse {
  data: FAQ[];
}

