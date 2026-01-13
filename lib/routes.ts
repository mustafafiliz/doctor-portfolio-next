// All routes are in Turkish for SEO - content changes based on locale
export const routes = {
  home: "/",
  about: "/hakkimda",
  specialties: "/uzmanliklar",
  gallery: "/galeri",
  videos: "/videolar",
  contact: "/iletisim",
  faq: "/sik-sorulan-sorular",
  blog: "/blog"
} as const;

// All routes use Turkish URLs regardless of locale
export function getRoute(
  key: keyof typeof routes,
  locale: "tr" | "en"
): string {
  // Always return Turkish route - content will be in the selected language
  return routes[key];
}
