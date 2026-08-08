import "./globals.css";
import TimedEnquiryPopup from "@/components/TimedEnquiryPopup";

export const metadata = {
  metadataBase: new URL("https://appixotech.com"),
  title: "Appixo — Innovate. Build. Elevate.",
  description:
    "Appixo is a software development partner for startups and businesses across the US, UK, Canada, Australia, UAE, India, and Spain — mobile apps, web platforms, and AI-powered solutions.",
  icons: {
    icon: [
      { url: "/favicon-48x48.png", sizes: "48x48", type: "image/png" },
      { url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
      { url: "/favicon.ico?v=2", sizes: "16x16 32x32 48x48", type: "image/x-icon" },
      { url: "/icon.png?v=2", sizes: "512x512", type: "image/png" },
    ],
    shortcut: "/favicon-48x48.png",
    apple: [{ url: "/apple-icon.png?v=2", sizes: "180x180", type: "image/png" }],
  },
  manifest: "/manifest.webmanifest",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070B14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}<TimedEnquiryPopup /></body>
    </html>
  );
}
