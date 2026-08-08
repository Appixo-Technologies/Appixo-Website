export default function manifest() {
  return {
    name: "Appixo Technologies",
    short_name: "Appixo",
    description: "Product strategy, design, engineering, cloud, and ongoing software development.",
    start_url: "/",
    display: "standalone",
    background_color: "#070B14",
    theme_color: "#070B14",
    icons: [
      { src: "/icon.png?v=2", sizes: "512x512", type: "image/png", purpose: "any" },
      { src: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png", purpose: "any" },
    ],
  };
}
