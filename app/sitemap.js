const pages = ["", "/about", "/services", "/case-studies", "/process", "/careers", "/enquiry", "/privacy-policy", "/terms"];

export default function sitemap() {
  const modified = new Date();
  return pages.map((path) => ({
    url: `https://appixotech.com${path}`,
    lastModified: modified,
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/services" || path === "/case-studies" ? 0.9 : 0.7,
  }));
}
