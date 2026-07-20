import "./globals.css";

export const metadata = {
  title: "Appixo — Innovate. Build. Elevate.",
  description:
    "Appixo is a software development partner for startups and businesses across the US, UK, Canada, Australia, UAE, India, and Spain — mobile apps, web platforms, and AI-powered solutions.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070B14",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
