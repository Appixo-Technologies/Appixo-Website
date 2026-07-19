import { notFound } from "next/navigation";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import { services } from "@/lib/siteData";

export function generateStaticParams() {
  return services.map((sv) => ({ slug: sv.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const service = services.find((sv) => sv.slug === slug);
  if (!service) return {};
  return {
    title: `${service.name} — Appixo`,
    description: service.tagline,
  };
}

export default async function ServicePage({ params }) {
  const { slug } = await params;
  const service = services.find((sv) => sv.slug === slug);
  if (!service) notFound();

  return (
    <div id="appixo-root">
      <Nav />

      <header className="ax-detail-header" style={s("padding:150px 32px 70px;")}>
        <div style={s("max-width:900px; margin:0 auto;")}>
          <div
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:7px 14px; border-radius:999px; border:1px solid var(--border2); background:var(--goldsoft); font-size:12.5px; font-weight:600; letter-spacing:.04em; color:var(--gold2); margin-bottom:22px;"
            )}
          >
            Our Services
          </div>
          <div
            style={s(
              "width:64px; height:64px; border-radius:16px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold); margin-bottom:18px;"
            )}
          >
            {service.icon}
          </div>
          <h1 className="ax-detail-title" style={s("margin:0; font-size:44px; font-weight:800; letter-spacing:-0.03em; color:var(--head);")}>{service.name}</h1>
          <p style={s("margin:18px 0 0; font-size:18px; line-height:1.6; color:var(--text); max-width:640px;")}>{service.tagline}</p>
        </div>
      </header>

      <section style={s("padding:0 32px 90px;")}>
        <div className="ax-detail-grid" style={s("max-width:900px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:40px;")}>
          <div style={s("padding:30px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
            <h2 style={s("margin:0 0 16px; font-size:20px; font-weight:700; color:var(--head);")}>What we cover</h2>
            <div style={s("display:flex; flex-wrap:wrap; gap:8px;")}>
              {service.items.map((it, i) => (
                <span
                  key={i}
                  style={s(
                    "padding:6px 13px; border-radius:999px; font-size:13px; color:var(--text); background:var(--surface2); border:1px solid var(--border);"
                  )}
                >
                  {it}
                </span>
              ))}
            </div>
          </div>
          <div style={s("padding:30px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
            <h2 style={s("margin:0 0 16px; font-size:20px; font-weight:700; color:var(--head);")}>Highlights</h2>
            <div style={s("display:flex; flex-direction:column; gap:16px;")}>
              {service.highlights.map((h, i) => (
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
            Start a project
          </a>
          <a
            href="/services"
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:600; color:var(--head); background:var(--surface); border:1px solid var(--border);"
            )}
          >
            All services
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
