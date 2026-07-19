"use client";

import { useEffect, useRef, useState } from "react";
import { s, svgSpan, ic } from "@/lib/icons";
import { products, whys, stats } from "@/lib/siteData";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import ServiceCategoryGrid from "@/components/ServiceCategoryGrid";

function OfficeCard({ flag, city, address, hq, featured }) {
  return (
    <div
      className="ax-office-card"
      style={s(
        `display:flex; align-items:flex-start; gap:12px; padding:${
          featured ? "16px 18px" : "14px 15px"
        }; border-radius:14px; background:var(--surface2); border:1px solid var(--border);`
      )}
    >
      <div
        style={s(
          "width:34px; height:34px; flex-shrink:0; border-radius:9px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; font-size:16px;"
        )}
      >
        {flag}
      </div>
      <div>
        <div style={s("display:flex; align-items:center; gap:8px; font-size:13.5px; font-weight:700; color:var(--head);")}>
          {city}
          {hq && (
            <span
              style={s(
                "padding:2px 8px; border-radius:999px; font-size:10.5px; font-weight:700; letter-spacing:.03em; background:var(--goldsoft); color:var(--gold2); border:1px solid var(--border2);"
              )}
            >
              HQ
            </span>
          )}
        </div>
        <div style={s("font-size:13px; color:var(--muted); margin-top:3px; line-height:1.4;")}>{address}</div>
      </div>
    </div>
  );
}

export default function Home() {
  const [submitLabel, setSubmitLabel] = useState("Send message");
  const [submitting, setSubmitting] = useState(false);

  const blobA = useRef(null);
  const blobB = useRef(null);
  const heroArt = useRef(null);

  const resetLabelAfter = (ms) => {
    setTimeout(() => setSubmitLabel("Send message"), ms);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.target;
    const data = new FormData(form);
    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: data.get("message"),
    };

    setSubmitting(true);
    setSubmitLabel("Sending...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Failed to send message.");

      setSubmitLabel("Message sent ✓");
      form.reset();
      resetLabelAfter(2600);
    } catch (err) {
      setSubmitLabel(err.message || "Something went wrong — try again");
      resetLabelAfter(3200);
    } finally {
      setSubmitting(false);
    }
  };

  const arrowIcon = ic('<path d="M5 12h14M13 6l6 6-6 6"/>');
  const arrowIconSm = svgSpan(
    '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></svg>'
  );
  const checkSmall = svgSpan(
    '<svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  );
  const iActivity = ic('<path d="M22 12h-4l-3 9L9 3l-3 9H2"/>');
  const iCheck = svgSpan(
    '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg>'
  );
  const iMail = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>');
  const iPin = ic(
    '<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>'
  );

  const steps = [
    { num: "01", name: "Idea", icon: ic('<path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z"/>') },
    { num: "02", name: "Research", icon: ic('<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>') },
    { num: "03", name: "Design", icon: ic('<circle cx="13.5" cy="6.5" r="2.5"/><circle cx="6.5" cy="12" r="2.5"/><circle cx="17" cy="15" r="2.5"/>') },
    { num: "04", name: "Development", icon: ic('<path d="m8 6-6 6 6 6M16 6l6 6-6 6"/>') },
    { num: "05", name: "Testing", icon: ic('<path d="M9 2v6l-5 9a2 2 0 0 0 2 3h12a2 2 0 0 0 2-3l-5-9V2"/><path d="M8 2h8"/>') },
    { num: "06", name: "Launch", icon: ic('<path d="M4.5 16.5 3 22l5.5-1.5M12 15l-3-3a11 11 0 0 1 8-8 11 11 0 0 1-8 8z"/><circle cx="15" cy="9" r="1.5"/>') },
    { num: "07", name: "Support", icon: ic('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>') },
  ];

  // Repeated enough times (8x the base 6-item list) so a single "copy" of the
  // strip is always wider than the viewport - otherwise the -50% translate
  // loop trick runs out of content mid-cycle and leaves a blank gap on one side.
  const techBaseA = ["Flutter", "React Native", "React", "Next.js", "Node.js", "Express"];
  const techBaseB = ["Firebase", "MongoDB", "PostgreSQL", "Docker", "AWS", "GitHub"];
  const techsLoopA = Array(8).fill(techBaseA).flat();
  const techsLoopB = Array(8).fill(techBaseB).flat();

  const portfolio = [
    { name: "Clinic Click", tag: "Healthcare · Mobile app", img: "/portfolio/clinic-click.svg", bg: "linear-gradient(150deg,#12203a,#0c1526)", badge: "Live", badgeBg: "rgba(18,161,80,0.15)", badgeFg: "#3ecf8e" },
    { name: "RaktConnect", tag: "Blood donation · Platform", img: "/portfolio/raktconnect.svg", bg: "linear-gradient(150deg,#2a1620,#0c1526)", badge: "Live", badgeBg: "rgba(18,161,80,0.15)", badgeFg: "#3ecf8e" },
    { name: "Future Project", tag: "AI · In development", img: "/portfolio/future-ai-product.svg", bg: "linear-gradient(150deg,#1e1a10,#0c1526)", badge: "Coming Soon", badgeBg: "var(--goldsoft)", badgeFg: "var(--gold)" },
  ];

  const testimonials = [
    { quote: "The team shipped our appointment platform faster than we thought possible, and it just works. Patients love how simple booking is.", initials: "RM", name: "Dr. Rahul Mehta", role: "Clinic partner" },
    { quote: "RaktConnect helped us reach donors in emergencies within minutes. The impact on the ground has been real.", initials: "SK", name: "Sunita Kumari", role: "NGO coordinator" },
    { quote: "Clear communication, clean code, and a product that scales. Appixo felt like an in-house team, not a vendor.", initials: "AV", name: "Arjun Verma", role: "Startup founder" },
  ];

  const faqs = [
    { q: "Do you build custom apps?", a: "Yes. We design and develop custom mobile and web apps tailored to your business needs, from concept to launch." },
    { q: "Do you build websites?", a: "Yes. We build fast, modern web applications and marketing sites using Next.js, React, and a scalable backend." },
    { q: "Can you maintain existing apps?", a: "Yes. We take over, stabilize, and improve existing codebases, and provide ongoing support and feature development." },
    { q: "Which technologies do you use?", a: "Flutter, React Native, React, Next.js, Node.js, Express, and databases like PostgreSQL and MongoDB — deployed on cloud infrastructure." },
  ];

  useEffect(() => {
    const onScroll = () => {
      // parallax
      const y = window.scrollY;
      if (blobA.current) blobA.current.style.marginTop = y * 0.12 + "px";
      if (blobB.current) blobB.current.style.marginTop = y * -0.08 + "px";
      document.querySelectorAll("#appixo-root .ax-parallax").forEach((el) => {
        const d = parseFloat(el.getAttribute("data-depth")) || 0.1;
        el.style.transform = "translateY(" + y * -d + "px)";
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    // REVEAL on view
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = document.querySelectorAll("#appixo-root [data-reveal]");
    let io;
    if (reduce) {
      items.forEach((el) => {
        el.style.opacity = "1";
      });
    } else {
      items.forEach((el) => {
        el.style.opacity = "0";
        el.style.transform = "translateY(26px)";
        el.style.transition = "opacity .7s cubic-bezier(.22,1,.36,1), transform .7s cubic-bezier(.22,1,.36,1)";
      });
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((en) => {
            if (en.isIntersecting) {
              en.target.style.opacity = "1";
              en.target.style.transform = "translateY(0)";
              io.unobserve(en.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
      );
      items.forEach((el) => io.observe(el));
    }

    // COUNTERS
    const counters = document.querySelectorAll("#appixo-root [data-count]");
    const cio = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            const el = en.target;
            const target = parseFloat(el.getAttribute("data-count")) || 0;
            const suffix = el.getAttribute("data-suffix") || "";
            const dur = 1400;
            const start = performance.now();
            const tick = (now) => {
              const p = Math.min(1, (now - start) / dur);
              const e = 1 - Math.pow(1 - p, 3);
              const val = Math.round(target * e);
              el.textContent = (target >= 1000 ? val.toLocaleString() : val) + suffix;
              if (p < 1) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
            cio.unobserve(el);
          }
        });
      },
      { threshold: 0.5 }
    );
    counters.forEach((el) => cio.observe(el));

    return () => {
      window.removeEventListener("scroll", onScroll);
      if (io) io.disconnect();
      cio.disconnect();
    };
  }, []);

  return (
    <div id="appixo-root">
      <Nav />

      {/* ===================== HERO ===================== */}
      <header id="top" className="ax-hero" style={s("position:relative; padding:150px 32px 90px; overflow:hidden;")}>
        <div
          ref={blobA}
          style={s(
            "position:absolute; top:-120px; right:-60px; width:620px; height:620px; border-radius:50%; background:radial-gradient(circle at 30% 30%, rgba(212,175,55,0.22), transparent 62%); filter:blur(20px); animation:ax-blob 18s ease-in-out infinite; pointer-events:none;"
          )}
        />
        <div
          ref={blobB}
          style={s(
            "position:absolute; bottom:-160px; left:-120px; width:560px; height:560px; border-radius:50%; background:radial-gradient(circle at 50% 50%, rgba(27,38,59,0.9), transparent 65%); filter:blur(10px); animation:ax-blob 22s ease-in-out infinite reverse; pointer-events:none;"
          )}
        />
        <div
          style={s(
            "position:absolute; inset:0; background:radial-gradient(1200px 500px at 70% -10%, rgba(212,175,55,0.06), transparent 60%); pointer-events:none;"
          )}
        />

        <div
          className="ax-hero-grid"
          style={s(
            "position:relative; max-width:1240px; margin:0 auto; display:grid; grid-template-columns:1.05fr 0.95fr; gap:48px; align-items:center;"
          )}
        >
          <div data-reveal="">
            <div
              style={s(
                "display:inline-flex; align-items:center; gap:9px; padding:7px 14px; border-radius:999px; border:1px solid var(--border2); background:var(--goldsoft); font-size:12.5px; font-weight:600; letter-spacing:.04em; color:var(--gold2); margin-bottom:26px;"
              )}
            >
              <span
                style={s(
                  "width:7px; height:7px; border-radius:50%; background:var(--gold); box-shadow:0 0 0 4px rgba(212,175,55,0.18);"
                )}
              />
              INNOVATE · BUILD · ELEVATE
            </div>
            <h1
              className="ax-hero-title"
              style={s(
                "margin:0; font-size:58px; line-height:1.05; font-weight:800; letter-spacing:-0.03em; color:var(--head); text-wrap:balance;"
              )}
            >
              A software development partner that{" "}
              <span
                style={s(
                  "background:linear-gradient(120deg,var(--gold2),var(--gold)); -webkit-background-clip:text; background-clip:text; color:transparent;"
                )}
              >
                ships like an in-house team.
              </span>
            </h1>
            <p style={s("margin:24px 0 0; font-size:18px; line-height:1.6; color:var(--text); max-width:560px;")}>
              We design and build mobile apps, web platforms, and AI-powered products for startups and businesses across the US, UK, Canada, Australia, UAE, and Spain — with overlapping working hours and clear, direct communication.
            </p>
            <div style={s("display:flex; flex-wrap:wrap; gap:14px; margin-top:36px;")}>
              <a
                href="#services"
                style={s(
                  "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
                )}
              >
                Explore Services {arrowIcon}
              </a>
              <a
                href="#contact"
                style={s(
                  "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:600; color:var(--head); background:var(--surface); border:1px solid var(--border);"
                )}
              >
                Contact Us
              </a>
            </div>
          </div>

          {/* floating UI cards */}
          <div ref={heroArt} className="ax-hero-art" style={s("position:relative; height:460px;")}>
            <div
              style={s(
                "position:absolute; inset:14% 8%; border-radius:24px; background:linear-gradient(160deg,var(--surface2),var(--surface)); border:1px solid var(--border); box-shadow:var(--shadow);"
              )}
            />
            <div
              className="ax-parallax"
              data-depth="0.10"
              style={s(
                "position:absolute; top:24px; left:0; width:230px; padding:16px; border-radius:16px; background:var(--surface); border:1px solid var(--border2); box-shadow:var(--shadow); animation:ax-float 6s ease-in-out infinite;"
              )}
            >
              <div style={s("display:flex; align-items:center; gap:10px;")}>
                <div
                  style={s(
                    "width:34px; height:34px; border-radius:9px; background:var(--goldsoft); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                  )}
                >
                  {iActivity}
                </div>
                <div>
                  <div style={s("font-size:12px; color:var(--muted);")}>Active users</div>
                  <div style={s("font-size:18px; font-weight:700; color:var(--head); font-family:'JetBrains Mono',monospace;")}>1,024</div>
                </div>
              </div>
              <div style={s("display:flex; align-items:flex-end; gap:5px; height:44px; margin-top:14px;")}>
                <div style={s("flex:1; height:40%; border-radius:4px; background:var(--border2);")} />
                <div style={s("flex:1; height:65%; border-radius:4px; background:var(--border2);")} />
                <div style={s("flex:1; height:52%; border-radius:4px; background:var(--border2);")} />
                <div style={s("flex:1; height:88%; border-radius:4px; background:linear-gradient(180deg,var(--gold2),var(--gold));")} />
                <div style={s("flex:1; height:70%; border-radius:4px; background:var(--border2);")} />
                <div style={s("flex:1; height:100%; border-radius:4px; background:linear-gradient(180deg,var(--gold2),var(--gold));")} />
              </div>
            </div>
            <div
              className="ax-parallax"
              data-depth="0.20"
              style={s(
                "position:absolute; bottom:34px; right:0; width:246px; padding:16px; border-radius:16px; background:var(--surface); border:1px solid var(--border); box-shadow:var(--shadow); animation:ax-float2 7s ease-in-out infinite;"
              )}
            >
              <div style={s("font-size:12px; color:var(--muted); margin-bottom:12px;")}>Appointment booked</div>
              <div style={s("display:flex; align-items:center; gap:11px;")}>
                <div
                  style={s(
                    "width:40px; height:40px; border-radius:50%; background:linear-gradient(135deg,var(--gold2),var(--gold)); display:flex; align-items:center; justify-content:center; color:#0A0F1A; font-weight:700;"
                  )}
                >
                  CC
                </div>
                <div style={s("flex:1;")}>
                  <div style={s("font-size:14px; font-weight:600; color:var(--head);")}>Clinic Click</div>
                  <div style={s("font-size:12px; color:var(--muted);")}>Dr. Mehta · 4:30 PM</div>
                </div>
                <div
                  style={s(
                    "width:24px; height:24px; border-radius:50%; background:rgba(18,161,80,0.16); color:#3ecf8e; display:flex; align-items:center; justify-content:center;"
                  )}
                >
                  {iCheck}
                </div>
              </div>
            </div>
            <div
              className="ax-parallax"
              data-depth="0.32"
              style={s(
                "position:absolute; top:44%; right:-6px; width:150px; padding:14px 16px; border-radius:14px; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 16px 40px -12px rgba(212,175,55,0.6); animation:ax-float 5.5s ease-in-out infinite; animation-delay:-2s;"
              )}
            >
              <div style={s("font-size:12px; color:rgba(10,15,26,0.7); font-weight:600;")}>Uptime</div>
              <div style={s("font-size:26px; font-weight:800; color:#0A0F1A; font-family:'JetBrains Mono',monospace;")}>99%</div>
            </div>
          </div>
        </div>
      </header>

      {/* ===================== TRUST STRIP ===================== */}
      <section style={s("padding:0 32px 56px;")}>
        <div
          data-reveal=""
          style={s(
            "max-width:1240px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:14px 28px; padding:22px 28px; border-radius:16px; background:var(--surface); border:1px solid var(--border);"
          )}
        >
          <span style={s("font-size:13px; font-weight:600; letter-spacing:.04em; color:var(--muted);")}>
            Serving clients across
          </span>
          {[
            { flag: "🇺🇸", name: "United States" },
            { flag: "🇬🇧", name: "United Kingdom" },
            { flag: "🇨🇦", name: "Canada" },
            { flag: "🇦🇺", name: "Australia" },
            { flag: "🇦🇪", name: "UAE" },
            { flag: "🇪🇸", name: "Spain" },
          ].map((c) => (
            <span
              key={c.name}
              style={s(
                "display:inline-flex; align-items:center; gap:8px; font-size:14.5px; font-weight:600; color:var(--head);"
              )}
            >
              <span style={s("font-size:18px; line-height:1;")}>{c.flag}</span>
              {c.name}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== STATS ===================== */}
      <section style={s("padding:10px 32px 70px;")}>
        <div
          data-reveal=""
          className="ax-stats-grid"
          style={s("max-width:1240px; margin:0 auto; display:grid; grid-template-columns:repeat(4,1fr); gap:18px;")}
        >
          {stats.map((st, i) => (
            <div
              key={i}
              style={s("padding:30px 24px; border-radius:18px; background:var(--surface); border:1px solid var(--border); text-align:center;")}
            >
              <div style={s("font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--gold); font-family:'JetBrains Mono',monospace;")}>
                <span data-count={st.n} data-suffix={st.suffix}>0</span>
              </div>
              <div style={s("font-size:14.5px; color:var(--muted); margin-top:6px; font-weight:500;")}>{st.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ===================== SERVICES ===================== */}
      <section id="services" style={s("padding:70px 32px; scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Services</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Full-stack product delivery</h2>
            <p style={s("margin:14px 0 0; font-size:17px; color:var(--muted);")}>
              We partner with startups and businesses across the US, UK, Canada, Australia, UAE, and Spain — from idea to launch and beyond.
            </p>
          </div>
          <ServiceCategoryGrid />
        </div>
      </section>

      {/* ===================== PRODUCTS (CASE STUDIES) ===================== */}
      <section id="products" style={s("padding:70px 32px; background:var(--bg2); scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Case Studies</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Products we've built ourselves</h2>
            <p style={s("margin:14px 0 0; font-size:17px; color:var(--muted);")}>Proof of how we build — real products, designed and shipped in-house.</p>
          </div>
          <div className="ax-products-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
            {products.map((p) => (
              <div
                key={p.slug}
                data-reveal=""
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
                <h3 style={s("margin:0; font-size:22px; font-weight:700; color:var(--head);")}>{p.name}</h3>
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
        </div>
      </section>

      {/* ===================== WHY APPIXO ===================== */}
      <section id="about" style={s("padding:80px 32px; scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Why Appixo</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Built to scale with you</h2>
          </div>
          <div className="ax-whys-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:20px;")}>
            {whys.map((w, i) => (
              <div key={i} data-reveal="" style={s("display:flex; gap:16px; padding:24px; border-radius:18px; background:var(--surface); border:1px solid var(--border);")}>
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

      {/* ===================== PROCESS ===================== */}
      <section style={s("padding:70px 32px; background:var(--bg2);")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 56px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>How we work</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Development process</h2>
          </div>
          <div data-reveal="" className="ax-process-grid" style={s("position:relative; display:grid; grid-template-columns:repeat(7,1fr); gap:12px;")}>
            <div className="ax-process-line" style={s("position:absolute; top:26px; left:6%; right:6%; height:2px; background:linear-gradient(90deg,transparent,var(--border2),transparent);")} />
            {steps.map((st, i) => (
              <div key={i} style={s("position:relative; text-align:center;")}>
                <div
                  style={s(
                    "width:54px; height:54px; margin:0 auto 14px; border-radius:16px; background:var(--surface); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold); box-shadow:var(--shadow);"
                  )}
                >
                  {st.icon}
                </div>
                <div style={s("font-size:11px; font-weight:700; color:var(--gold); font-family:'JetBrains Mono',monospace;")}>{st.num}</div>
                <div style={s("font-size:14px; font-weight:600; color:var(--head); margin-top:3px;")}>{st.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TECHNOLOGIES ===================== */}
      <section style={s("padding:70px 0;")}>
        <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 44px; padding:0 32px;")}>
          <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Technologies</div>
          <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Our stack</h2>
        </div>
        <div
          style={s(
            "position:relative; overflow:hidden; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);"
          )}
        >
          <div className="ax-marquee-track" style={s("display:flex; gap:16px; width:max-content; animation:ax-marquee 34s linear infinite; padding:0 8px;")}>
            {techsLoopA.map((t, i) => (
              <div
                key={i}
                style={s(
                  "display:flex; align-items:center; gap:10px; padding:14px 22px; border-radius:14px; background:var(--surface); border:1px solid var(--border); white-space:nowrap;"
                )}
              >
                <span style={s("width:9px; height:9px; border-radius:50%; background:var(--gold);")} />
                <span style={s("font-size:15px; font-weight:600; color:var(--head);")}>{t}</span>
              </div>
            ))}
          </div>
          <div className="ax-marquee-track" style={s("display:flex; gap:16px; width:max-content; animation:ax-marquee-r 30s linear infinite; padding:16px 8px 0;")}>
            {techsLoopB.map((t, i) => (
              <div
                key={i}
                style={s(
                  "display:flex; align-items:center; gap:10px; padding:14px 22px; border-radius:14px; background:var(--surface); border:1px solid var(--border); white-space:nowrap;"
                )}
              >
                <span style={s("width:9px; height:9px; border-radius:50%; background:var(--gold2);")} />
                <span style={s("font-size:15px; font-weight:600; color:var(--head);")}>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO ===================== */}
      <section id="portfolio" style={s("padding:70px 32px; background:var(--bg2); scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Portfolio</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Selected work</h2>
          </div>
          <div className="ax-portfolio-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
            {portfolio.map((pf, i) => (
              <div
                key={i}
                data-reveal=""
                className="ax-port"
                style={s("position:relative; border-radius:20px; overflow:hidden; border:1px solid var(--border); background:var(--surface); cursor:pointer;")}
              >
                <div style={s(`height:230px; background:${pf.bg}; position:relative; overflow:hidden;`)}>
                  <img
                    src={pf.img}
                    alt={`${pf.name} — ${pf.tag}`}
                    loading="lazy"
                    style={s("position:absolute; inset:0; width:100%; height:100%; object-fit:cover;")}
                  />
                  <div
                    className="ax-port-ov"
                    style={s(
                      "position:absolute; inset:0; background:linear-gradient(180deg,transparent,rgba(7,11,20,0.86)); opacity:0; transition:opacity .3s ease; display:flex; align-items:flex-end; padding:22px;"
                    )}
                  >
                    <span style={s("display:inline-flex; align-items:center; gap:8px; font-size:14px; font-weight:700; color:#fff;")}>
                      View project {arrowIconSm}
                    </span>
                  </div>
                </div>
                <div style={s("padding:20px 22px; display:flex; align-items:center; justify-content:space-between;")}>
                  <div>
                    <div style={s("font-size:17px; font-weight:700; color:var(--head);")}>{pf.name}</div>
                    <div style={s("font-size:13px; color:var(--muted); margin-top:3px;")}>{pf.tag}</div>
                  </div>
                  <span style={s(`padding:5px 11px; border-radius:999px; font-size:11px; font-weight:700; background:${pf.badgeBg}; color:${pf.badgeFg};`)}>
                    {pf.badge}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== TESTIMONIALS ===================== */}
      <section style={s("padding:80px 32px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Testimonials</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>What people say</h2>
          </div>
          <div className="ax-testimonials-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
            {testimonials.map((tm, i) => (
              <div key={i} data-reveal="" style={s("display:flex; flex-direction:column; padding:28px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
                <div style={s("color:var(--gold); font-size:34px; line-height:1; font-family:Georgia,serif;")}>&ldquo;</div>
                <p style={s("margin:8px 0 22px; font-size:15px; line-height:1.65; color:var(--text);")}>{tm.quote}</p>
                <div style={s("margin-top:auto; display:flex; align-items:center; gap:12px;")}>
                  <div
                    style={s(
                      "width:44px; height:44px; border-radius:50%; background:linear-gradient(135deg,var(--gold2),var(--gold)); display:flex; align-items:center; justify-content:center; color:#0A0F1A; font-weight:700;"
                    )}
                  >
                    {tm.initials}
                  </div>
                  <div>
                    <div style={s("font-size:14.5px; font-weight:600; color:var(--head);")}>{tm.name}</div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>{tm.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== FAQ ===================== */}
      <section style={s("padding:70px 32px; background:var(--bg2);")}>
        <div style={s("max-width:820px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; margin:0 auto 48px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>FAQ</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Common questions</h2>
          </div>
          <div data-reveal="" style={s("display:flex; flex-direction:column; gap:12px;")}>
            {faqs.map((fq, i) => (
              <details key={i} style={s("border-radius:14px; background:var(--surface); border:1px solid var(--border); overflow:hidden;")}>
                <summary
                  style={s(
                    "list-style:none; cursor:pointer; padding:20px 22px; display:flex; align-items:center; justify-content:space-between; gap:16px; font-size:16px; font-weight:600; color:var(--head);"
                  )}
                >
                  {fq.q}
                  <span className="ax-faq-caret" style={s("flex-shrink:0; color:var(--gold); font-size:22px; line-height:1; transition:transform .25s ease;")}>
                    +
                  </span>
                </summary>
                <div style={s("padding:0 22px 20px; font-size:14.5px; color:var(--muted); line-height:1.6;")}>{fq.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== CONTACT ===================== */}
      <section id="contact" style={s("padding:80px 32px; scroll-margin-top:80px;")}>
        <div
          data-reveal=""
          style={s(
            "max-width:1100px; margin:0 auto; border-radius:28px; overflow:hidden; border:1px solid var(--border2); background:linear-gradient(150deg,var(--surface),var(--bg2)); position:relative;"
          )}
        >
          <div
            style={s(
              "position:absolute; top:-120px; right:-80px; width:420px; height:420px; border-radius:50%; background:radial-gradient(circle,rgba(212,175,55,0.16),transparent 65%); pointer-events:none;"
            )}
          />
          <div className="ax-contact-grid" style={s("position:relative; display:grid; grid-template-columns:1fr 1fr; gap:40px; padding:52px;")}>
            <div>
              <h2 style={s("margin:0; font-size:38px; font-weight:800; letter-spacing:-0.02em; color:var(--head); line-height:1.1;")}>
                Let&apos;s build something amazing.
              </h2>
              <p style={s("margin:18px 0 32px; font-size:16px; color:var(--muted); line-height:1.6;")}>
                Tell us about your idea. We&apos;ll get back within one business day.
              </p>
              <div style={s("display:flex; flex-direction:column; gap:18px;")}>
                <a href="mailto:hello@appixotech.com" style={s("display:flex; align-items:center; gap:14px;")}>
                  <div
                    style={s(
                      "width:44px; height:44px; border-radius:12px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                    )}
                  >
                    {iMail}
                  </div>
                  <div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>Email</div>
                    <div style={s("font-size:15px; font-weight:600; color:var(--head);")}>hello@appixotech.com</div>
                  </div>
                </a>
                <div>
                  <div style={s("display:flex; align-items:center; gap:14px; margin-bottom:14px;")}>
                    <div
                      style={s(
                        "width:44px; height:44px; flex-shrink:0; border-radius:12px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                      )}
                    >
                      {iPin}
                    </div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>Locations</div>
                  </div>
                  <div style={s("display:flex; flex-direction:column; gap:10px;")}>
                    <OfficeCard flag="🇮🇳" city="Noida" hq address="Sector 16, Noida, UP 201301" featured />
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit} style={s("display:flex; flex-direction:column; justify-content:center; gap:14px;")}>
              <input
                required
                name="name"
                placeholder="Your name"
                disabled={submitting}
                style={s(
                  "padding:14px 16px; border-radius:11px; border:1px solid var(--border); background:var(--bg2); color:var(--head); font-family:inherit; font-size:14.5px; outline:none;"
                )}
              />
              <input
                required
                name="email"
                type="email"
                placeholder="Email address"
                disabled={submitting}
                style={s(
                  "padding:14px 16px; border-radius:11px; border:1px solid var(--border); background:var(--bg2); color:var(--head); font-family:inherit; font-size:14.5px; outline:none;"
                )}
              />
              <textarea
                required
                name="message"
                rows={4}
                placeholder="Tell us about your project"
                disabled={submitting}
                style={s(
                  "padding:14px 16px; border-radius:11px; border:1px solid var(--border); background:var(--bg2); color:var(--head); font-family:inherit; font-size:14.5px; outline:none; resize:vertical;"
                )}
              />
              <button
                type="submit"
                disabled={submitting}
                style={s(
                  "padding:15px; border-radius:11px; border:none; cursor:pointer; font-size:15px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 12px 30px -10px rgba(212,175,55,0.5);"
                )}
              >
                {submitLabel}
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
