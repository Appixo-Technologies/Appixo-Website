import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s, svgSpan } from "@/lib/icons";
import { products } from "@/lib/siteData";

export const metadata = {
  title: "Products — Appixo",
  description: "Apps we design and operate in-house — each with its own dedicated experience.",
};

const arrowIconSm = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
);
const checkSmall = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
);

export default function ProductsPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 60px; text-align:center;")}>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Our Products</div>
        <h1 style={s("margin:14px 0 0; font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Apps we build & operate</h1>
        <p style={s("margin:14px auto 0; font-size:17px; color:var(--muted); max-width:560px;")}>
          Products designed in-house — each with its own dedicated experience.
        </p>
      </header>

      <section style={s("padding:0 32px 90px;")}>
        <div className="ax-products-grid" style={s("max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
          {products.map((p) => (
            <div
              key={p.slug}
              className="ax-lift"
              style={s(
                "display:flex; flex-direction:column; padding:26px; border-radius:20px; background:var(--surface); border:1px solid var(--border); transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;"
              )}
            >
              <div style={s("display:flex; align-items:center; justify-content:space-between; margin-bottom:18px;")}>
                <div
                  style={s(
                    "width:52px; height:52px; border-radius:14px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                  )}
                >
                  {p.icon}
                </div>
                <span
                  style={s(
                    `padding:5px 11px; border-radius:999px; font-size:11.5px; font-weight:700; letter-spacing:.03em; background:${p.badgeBg}; color:${p.badgeFg};`
                  )}
                >
                  {p.badge}
                </span>
              </div>
              <h2 style={s("margin:0; font-size:22px; font-weight:700; color:var(--head);")}>{p.name}</h2>
              <p style={s("margin:8px 0 18px; font-size:14.5px; color:var(--muted); line-height:1.55;")}>{p.desc}</p>
              <div style={s("display:flex; flex-direction:column; gap:10px; margin-bottom:22px;")}>
                {p.features.map((f, fi) => (
                  <div key={fi} style={s("display:flex; align-items:center; gap:10px; font-size:14px; color:var(--text);")}>
                    <span
                      style={s(
                        "width:18px; height:18px; border-radius:50%; background:var(--goldsoft); color:var(--gold); display:flex; align-items:center; justify-content:center; flex-shrink:0;"
                      )}
                    >
                      {checkSmall}
                    </span>
                    {f}
                  </div>
                ))}
              </div>
              <a
                href={`/products/${p.slug}`}
                style={s(
                  `margin-top:auto; display:inline-flex; align-items:center; justify-content:center; gap:8px; padding:12px; border-radius:11px; font-size:14.5px; font-weight:600; color:${p.ctaFg}; background:${p.ctaBg}; border:1px solid ${p.ctaBorder};`
                )}
              >
                {p.cta} {arrowIconSm}
              </a>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  );
}
