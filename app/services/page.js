import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";

export const metadata = {
  title: "Services — Appixo",
  description: "Full-stack product delivery — development, design, and solutions for startups and businesses across the US, UK, Canada, Australia, UAE, and Spain.",
};

export default function ServicesPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 60px; text-align:center;")}>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Services</div>
        <h1 style={s("margin:14px 0 0; font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Full-stack product delivery</h1>
      </header>

      <section style={s("padding:0 32px 90px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <ServiceCategoryGrid />
        </div>
      </section>

      <Footer />
    </div>
  );
}
