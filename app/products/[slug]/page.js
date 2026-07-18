import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s, svgSpan } from "@/lib/icons";
import { products } from "@/lib/siteData";

const checkSmall = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
);

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) return {};
  return {
    title: `${product.name} — Appixo`,
    description: product.desc,
  };
}

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 70px;")}>
        <div style={s("max-width:900px; margin:0 auto;")}>
          <div
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:7px 14px; border-radius:999px; border:1px solid var(--border2); background:var(--goldsoft); font-size:12.5px; font-weight:600; letter-spacing:.04em; color:var(--gold2); margin-bottom:22px;"
            )}
          >
            Our Products
          </div>
          <div style={s("display:flex; align-items:center; gap:18px; margin-bottom:18px;")}>
            <div
              style={s(
                "width:64px; height:64px; flex-shrink:0; border-radius:16px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
              )}
            >
              {product.icon}
            </div>
            <span
              style={s(
                `padding:6px 13px; border-radius:999px; font-size:12.5px; font-weight:700; letter-spacing:.03em; background:${product.badgeBg}; color:${product.badgeFg};`
              )}
            >
              {product.badge}
            </span>
          </div>
          <h1 style={s("margin:0; font-size:44px; font-weight:800; letter-spacing:-0.03em; color:var(--head);")}>{product.name}</h1>
          <p style={s("margin:18px 0 0; font-size:18px; line-height:1.6; color:var(--text); max-width:640px;")}>{product.tagline}</p>
        </div>
      </header>

      <section style={s("padding:0 32px 90px;")}>
        <div style={s("max-width:900px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:40px;")}>
          <div style={s("padding:30px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
            <h2 style={s("margin:0 0 16px; font-size:20px; font-weight:700; color:var(--head);")}>Overview</h2>
            <p style={s("margin:0; font-size:15px; line-height:1.65; color:var(--muted);")}>{product.desc}</p>
            <div style={s("display:flex; flex-direction:column; gap:12px; margin-top:22px;")}>
              {product.features.map((f, i) => (
                <div key={i} style={s("display:flex; align-items:center; gap:10px; font-size:14.5px; color:var(--text);")}>
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
          </div>
          <div style={s("padding:30px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
            <h2 style={s("margin:0 0 16px; font-size:20px; font-weight:700; color:var(--head);")}>Highlights</h2>
            <div style={s("display:flex; flex-direction:column; gap:16px;")}>
              {product.highlights.map((h, i) => (
                <p key={i} style={s("margin:0; font-size:14.5px; line-height:1.6; color:var(--muted);")}>{h}</p>
              ))}
            </div>
          </div>
        </div>

        <div style={s("max-width:900px; margin:36px auto 0; display:flex; flex-wrap:wrap; gap:14px;")}>
          <a
            href="/#contact"
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
            )}
          >
            {product.cta}
          </a>
          <a
            href="/products"
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:600; color:var(--head); background:var(--surface); border:1px solid var(--border);"
            )}
          >
            All products
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
