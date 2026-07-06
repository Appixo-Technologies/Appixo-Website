import "./globals.css";

export const metadata = {
  title: "Appixo — Innovate. Build. Elevate.",
  description:
    "We design and develop scalable mobile apps, web applications, SaaS platforms, and AI-powered solutions for businesses worldwide.",
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
