import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import { services } from "@/lib/siteData";

export const metadata = {
  title: "Services — Appixo",
  description: "Full-stack product delivery — mobile, web, design, and AI.",
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
        <div className="ax-services-grid" style={s("max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:18px;")}>
          {services.map((sv) => (
            <a
              key={sv.slug}
              href={`/services/${sv.slug}`}
              className="ax-lift"
              style={s(
                "display:block; padding:26px; border-radius:18px; background:var(--surface); border:1px solid var(--border); transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;"
              )}
            >
              <div
                style={s(
                  "width:48px; height:48px; border-radius:13px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold); margin-bottom:18px;"
                )}
              >
                {sv.icon}
              </div>
              <h2 style={s("margin:0 0 8px; font-size:18px; font-weight:700; color:var(--head);")}>{sv.name}</h2>
              <p style={s("margin:0 0 14px; font-size:13.5px; color:var(--muted); line-height:1.5;")}>{sv.tagline}</p>
              <div style={s("display:flex; flex-wrap:wrap; gap:8px;")}>
                {sv.items.map((it, ii) => (
                  <span
                    key={ii}
                    style={s(
                      "padding:5px 11px; border-radius:999px; font-size:12.5px; color:var(--text); background:var(--surface2); border:1px solid var(--border);"
                    )}
                  >
                    {it}
                  </span>
                ))}
              </div>
            </a>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
