import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import { whys, stats } from "@/lib/siteData";

export const metadata = {
  title: "About — Appixo",
  description: "We design and develop scalable mobile apps, web applications, SaaS platforms, and AI-powered solutions for businesses worldwide.",
};

export default function AboutPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 60px; text-align:center;")}>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>About Appixo</div>
        <h1 style={s("margin:14px auto 0; max-width:760px; font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--head); line-height:1.1;")}>
          Building digital products that solve real problems.
        </h1>
        <p style={s("margin:20px auto 0; max-width:620px; font-size:17px; line-height:1.65; color:var(--muted);")}>
          Appixo is a product studio designing and developing scalable mobile apps, web applications, SaaS
          platforms, and AI-powered solutions for businesses worldwide — from first sketch to production support.
        </p>
      </header>

      <section style={s("padding:0 32px 70px;")}>
        <div className="ax-stats-grid" style={s("max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:18px;")}>
          {stats.map((st, i) => (
            <div key={i} style={s("padding:30px 24px; border-radius:18px; background:var(--surface); border:1px solid var(--border); text-align:center;")}>
              <div style={s("font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--gold); font-family:'JetBrains Mono',monospace;")}>
                {st.n}{st.suffix}
              </div>
              <div style={s("font-size:14.5px; color:var(--muted); margin-top:6px; font-weight:500;")}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      <section style={s("padding:0 32px 90px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Why Appixo</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Built to scale with you</h2>
          </div>
          <div className="ax-whys-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:20px;")}>
            {whys.map((w, i) => (
              <div key={i} style={s("display:flex; gap:16px; padding:24px; border-radius:18px; background:var(--surface); border:1px solid var(--border);")}>
                <div
                  style={s(
                    "width:46px; height:46px; flex-shrink:0; border-radius:12px; background:linear-gradient(135deg,var(--goldsoft),transparent); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                  )}
                >
                  {w.icon}
                </div>
                <div>
                  <h3 style={s("margin:0 0 6px; font-size:17px; font-weight:700; color:var(--head);")}>{w.title}</h3>
                  <p style={s("margin:0; font-size:14px; color:var(--muted); line-height:1.55;")}>{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section style={s("padding:0 32px 90px; text-align:center;")}>
        <a
          href="/#contact"
          style={s(
            "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
          )}
        >
          Get in touch
        </a>
      </section>

      <Footer />
    </div>
  );
}
