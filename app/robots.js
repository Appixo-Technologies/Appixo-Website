export default function robots() {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: "https://appixotech.com/sitemap.xml",
    host: "https://appixotech.com",
  };
}
