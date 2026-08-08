import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServicesShowcase from "@/components/ServicesShowcase";

export const metadata = {
  title: "Services — Appixo",
  description: "Full-stack product delivery — development, design, and solutions for startups and businesses across the US, UK, Canada, Australia, UAE, India, and Spain.",
};

export default function ServicesPage() {
  return (
    <div id="appixo-root">
      <Nav />
      <ServicesShowcase />
      <Footer />
    </div>
  );
}
