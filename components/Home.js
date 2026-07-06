"use client";

import { useEffect, useRef, useState } from "react";

/* Parses a plain CSS declaration string (as used in the original template)
   into a React style object, so every inline style below can stay
   byte-for-byte identical to the original design instead of being
   hand-transcribed into camelCase objects. */
function s(str) {
  const style = {};
  str.split(";").forEach((decl) => {
    const idx = decl.indexOf(":");
    if (idx === -1) return;
    let prop = decl.slice(0, idx).trim();
    const value = decl.slice(idx + 1).trim();
    if (!prop || !value) return;
    if (!prop.startsWith("--")) {
      prop = prop.replace(/-([a-zA-Z])/g, (_, c) => c.toUpperCase());
    }
    style[prop] = value;
  });
  return style;
}

function svgSpan(html) {
  return (
    <span
      style={{ display: "inline-flex", lineHeight: 0 }}
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function ic(path, sw) {
  return svgSpan(
    '<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="' +
      (sw || 2) +
      '" stroke-linecap="round" stroke-linejoin="round">' +
      path +
      "</svg>"
  );
}

export default function Home() {
  const [submitLabel, setSubmitLabel] = useState("Send message");
  const [submitting, setSubmitting] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const navRef = useRef(null);
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
  const menuIcon = ic('<path d="M4 6h16M4 12h16M4 18h16"/>');
  const closeIcon = ic('<path d="M18 6 6 18M6 6l12 12"/>');
  const navLinks = [
    { href: "#top", label: "Home" },
    { href: "#products", label: "Products" },
    { href: "#services", label: "Services" },
    { href: "#about", label: "About" },
    { href: "#careers", label: "Careers" },
    { href: "#contact", label: "Contact" },
  ];
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

  const stats = [
    { n: 3, suffix: "+", label: "Products" },
    { n: 1000, suffix: "+", label: "Users" },
    { n: 99, suffix: "%", label: "Uptime" },
    { n: 24, suffix: "/7", label: "Support" },
  ];

  const products = [
    {
      name: "Clinic Click",
      desc: "Healthcare appointment platform connecting patients with doctors.",
      icon: ic('<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 14v4M10 16h4"/>'),
      features: ["Appointment booking", "Patient management", "Doctors dashboard"],
      badge: "Live",
      badgeBg: "rgba(18,161,80,0.15)",
      badgeFg: "#3ecf8e",
      cta: "Learn more",
      ctaBg: "var(--goldsoft)",
      ctaFg: "var(--gold)",
      ctaBorder: "var(--border2)",
    },
    {
      name: "RaktConnect",
      desc: "Blood donation platform linking donors with those in urgent need.",
      icon: ic('<path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
      features: ["Blood requests", "Donor search", "Emergency alerts"],
      badge: "Live",
      badgeBg: "rgba(18,161,80,0.15)",
      badgeFg: "#3ecf8e",
      cta: "Learn more",
      ctaBg: "var(--goldsoft)",
      ctaFg: "var(--gold)",
      ctaBorder: "var(--border2)",
    },
    {
      name: "Future AI Product",
      desc: "An AI-powered solution in the making. Details revealed soon.",
      icon: ic(
        '<path d="M12 8V4H8M4 8v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M9 13h.01M15 13h.01M9 17h6"/>'
      ),
      features: ["Coming soon", "In research", "Stay tuned"],
      badge: "Coming Soon",
      badgeBg: "var(--goldsoft)",
      badgeFg: "var(--gold)",
      cta: "Get notified",
      ctaBg: "transparent",
      ctaFg: "var(--text)",
      ctaBorder: "var(--border)",
    },
  ];

  const services = [
    {
      name: "Mobile App Development",
      items: ["Android", "iOS", "Flutter", "React Native"],
      icon: ic('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>'),
    },
    {
      name: "Web Development",
      items: ["Backend APIs", "Cloud Solutions", "Next.js"],
      icon: ic('<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>'),
    },
    {
      name: "UI/UX Design",
      items: ["Research", "Prototyping", "Design systems"],
      icon: ic(
        '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'
      ),
    },
    {
      name: "AI Solutions",
      items: ["ML models", "Automation", "Chatbots"],
      icon: ic(
        '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h6"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'
      ),
    },
  ];

  const whys = [
    { title: "Fast Development", desc: "Rapid, iterative delivery that gets products to market quickly.", icon: ic('<path d="m13 2-3 7h6l-3 13"/>') },
    { title: "Secure Architecture", desc: "Security-first engineering baked into every layer.", icon: ic('<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>') },
    { title: "Cloud Ready", desc: "Deployed on scalable, reliable cloud infrastructure.", icon: ic('<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z"/>') },
    { title: "Cross Platform", desc: "One codebase, native experience across every device.", icon: ic('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>') },
    { title: "High Performance", desc: "Optimized for speed with smooth, responsive interfaces.", icon: ic('<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 16 8"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>') },
    { title: "Scalable Products", desc: "Built to grow — add products without redesigning.", icon: ic('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>') },
  ];

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
    { name: "Clinic Click", tag: "Healthcare · Mobile app", bg: "linear-gradient(150deg,#12203a,#0c1526)", badge: "Live", badgeBg: "rgba(18,161,80,0.15)", badgeFg: "#3ecf8e" },
    { name: "RaktConnect", tag: "Blood donation · Platform", bg: "linear-gradient(150deg,#2a1620,#0c1526)", badge: "Live", badgeBg: "rgba(18,161,80,0.15)", badgeFg: "#3ecf8e" },
    { name: "Future Project", tag: "AI · In development", bg: "linear-gradient(150deg,#1e1a10,#0c1526)", badge: "Coming Soon", badgeBg: "var(--goldsoft)", badgeFg: "var(--gold)" },
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

  const socials = [
    {
      label: "Instagram",
      href: "https://www.instagram.com/appixotech/?hl=en",
      icon: ic('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>'),
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/appixotech/about/?viewAsMember=true",
      icon: ic('<path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-9h4v1.5"/><rect x="2" y="9" width="4" height="11"/><circle cx="4" cy="4" r="2"/>'),
    },
    {
      label: "GitHub",
      href: "https://github.com/Appixo-Technologies",
      icon: ic('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8 4.9 4.9 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A4.9 4.9 0 0 0 5 4.8 5.2 5.2 0 0 0 3.7 8.4c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>'),
    },
  ];

  useEffect(() => {
    // NAV solid on scroll
    const nav = navRef.current;
    const onScroll = () => {
      if (nav) {
        if (window.scrollY > 30) {
          nav.style.background = "color-mix(in srgb, var(--bg2) 82%, transparent)";
          nav.style.backdropFilter = "blur(14px)";
          nav.style.borderBottomColor = "var(--border)";
        } else {
          nav.style.background = "transparent";
          nav.style.backdropFilter = "none";
          nav.style.borderBottomColor = "transparent";
        }
      }
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
      {/* ===================== NAV ===================== */}
      <nav
        ref={navRef}
        style={s(
          "position:fixed; top:0; left:0; right:0; z-index:100; transition:background .3s ease, border-color .3s ease, backdrop-filter .3s ease; border-bottom:1px solid transparent;"
        )}
      >
        <div
          className="ax-nav-inner"
          style={s("max-width:1240px; margin:0 auto; padding:16px 32px; display:flex; align-items:center; gap:32px;")}
        >
          <a href="#top" style={s("display:flex; align-items:center; gap:12px; flex-shrink:0; min-width:0;")}>
            <img src="/logo.png" alt="Appixo" style={s("width:38px; height:38px; border-radius:10px; display:block; flex-shrink:0;")} />
            <span className="ax-brand" style={s("font-weight:800; font-size:20px; letter-spacing:.16em; color:var(--head);")}>APPIXO</span>
          </a>
          <div className="ax-nav-links" style={s("display:flex; align-items:center; gap:28px; margin-left:8px;")}>
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
                {l.label}
              </a>
            ))}
          </div>
          <div className="ax-nav-actions" style={s("margin-left:auto; display:flex; align-items:center; gap:14px;")}>
            <button
              className="ax-nav-toggle"
              onClick={() => setMobileOpen((v) => !v)}
              aria-label="Toggle menu"
              aria-expanded={mobileOpen}
              style={s(
                "display:none; width:40px; height:40px; border-radius:10px; border:1px solid var(--border); background:var(--surface); color:var(--gold); align-items:center; justify-content:center; cursor:pointer;"
              )}
            >
              {mobileOpen ? closeIcon : menuIcon}
            </button>
            <a
              href="#contact"
              className="ax-nav-cta"
              style={s(
                "display:inline-flex; align-items:center; gap:8px; padding:11px 20px; border-radius:10px; font-size:14.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 8px 24px -8px rgba(212,175,55,0.5);"
              )}
            >
              Get in Touch
            </a>
          </div>
        </div>
        {mobileOpen && (
          <div
            className="ax-nav-mobile"
            style={s(
              "display:flex; flex-direction:column; padding:6px 20px 18px; gap:2px; border-top:1px solid var(--border); background:var(--bg2);"
            )}
          >
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={s("padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; border-bottom:1px solid var(--border);")}
              >
                {l.label}
              </a>
            ))}
          </div>
        )}
      </nav>

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
              Building digital products that{" "}
              <span
                style={s(
                  "background:linear-gradient(120deg,var(--gold2),var(--gold)); -webkit-background-clip:text; background-clip:text; color:transparent;"
                )}
              >
                solve real problems.
              </span>
            </h1>
            <p style={s("margin:24px 0 0; font-size:18px; line-height:1.6; color:var(--text); max-width:560px;")}>
              We design and develop scalable mobile apps, web applications, SaaS platforms, and AI-powered solutions for businesses worldwide.
            </p>
            <div style={s("display:flex; flex-wrap:wrap; gap:14px; margin-top:36px;")}>
              <a
                href="#products"
                style={s(
                  "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
                )}
              >
                Explore Products {arrowIcon}
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

      {/* ===================== PRODUCTS ===================== */}
      <section id="products" style={s("padding:70px 32px; scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Our Products</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Apps we build & operate</h2>
            <p style={s("margin:14px 0 0; font-size:17px; color:var(--muted);")}>Products designed in-house — each with its own dedicated experience.</p>
          </div>
          <div className="ax-products-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
            {products.map((p, i) => (
              <div
                key={i}
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
                  href="#portfolio"
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

      {/* ===================== SERVICES ===================== */}
      <section id="services" style={s("padding:70px 32px; background:var(--bg2); scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Services</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Full-stack product delivery</h2>
          </div>
          <div className="ax-services-grid" style={s("display:grid; grid-template-columns:repeat(4,1fr); gap:18px;")}>
            {services.map((sv, i) => (
              <div
                key={i}
                data-reveal=""
                className="ax-lift"
                style={s(
                  "padding:26px; border-radius:18px; background:var(--surface); border:1px solid var(--border); transition:transform .25s ease, border-color .25s ease, box-shadow .25s ease;"
                )}
              >
                <div
                  style={s(
                    "width:48px; height:48px; border-radius:13px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold); margin-bottom:18px;"
                  )}
                >
                  {sv.icon}
                </div>
                <h3 style={s("margin:0 0 14px; font-size:18px; font-weight:700; color:var(--head);")}>{sv.name}</h3>
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
                <div style={s(`height:230px; background:${pf.bg}; position:relative; display:flex; align-items:center; justify-content:center;`)}>
                  <div
                    style={s(
                      "width:130px; height:180px; border-radius:20px; background:rgba(7,11,20,0.55); border:1px solid rgba(255,255,255,0.14); backdrop-filter:blur(2px); display:flex; flex-direction:column; padding:14px; gap:8px;"
                    )}
                  >
                    <div style={s("height:8px; width:60%; border-radius:4px; background:var(--gold);")} />
                    <div style={s("height:6px; width:90%; border-radius:4px; background:rgba(255,255,255,0.25);")} />
                    <div style={s("height:6px; width:80%; border-radius:4px; background:rgba(255,255,255,0.18);")} />
                    <div style={s("margin-top:auto; height:34px; border-radius:9px; background:linear-gradient(135deg,var(--gold2),var(--gold));")} />
                  </div>
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
                <a href="mailto:appixotech@gmail.com" style={s("display:flex; align-items:center; gap:14px;")}>
                  <div
                    style={s(
                      "width:44px; height:44px; border-radius:12px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                    )}
                  >
                    {iMail}
                  </div>
                  <div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>Email</div>
                    <div style={s("font-size:15px; font-weight:600; color:var(--head);")}>appixotech@gmail.com</div>
                  </div>
                </a>
                <div style={s("display:flex; align-items:center; gap:14px;")}>
                  <div
                    style={s(
                      "width:44px; height:44px; border-radius:12px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
                    )}
                  >
                    {iPin}
                  </div>
                  <div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>Locations</div>
                    <div style={s("font-size:15px; font-weight:600; color:var(--head); line-height:1.6;")}>
                      Sector 16, Noida, UP 201301 (HQ)
                      <br />
                      Boring Road, Patna 800001
                      <br />
                      Dubai, United Arab Emirates
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit} style={s("display:flex; flex-direction:column; gap:14px;")}>
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

      {/* ===================== FOOTER ===================== */}
      <footer id="careers" style={s("padding:60px 32px 32px; background:var(--bg2); border-top:1px solid var(--border);")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div
            className="ax-footer-grid"
            style={s(
              "display:grid; grid-template-columns:1.6fr 1fr 1fr 1fr; gap:40px; padding-bottom:40px; border-bottom:1px solid var(--border);"
            )}
          >
            <div>
              <div style={s("display:flex; align-items:center; gap:12px; margin-bottom:16px;")}>
                <img src="/logo.png" alt="Appixo" style={s("width:38px; height:38px; border-radius:10px;")} />
                <span style={s("font-weight:800; font-size:20px; letter-spacing:.16em; color:var(--head);")}>APPIXO</span>
              </div>
              <p style={s("margin:0; font-size:14px; color:var(--muted); line-height:1.6; max-width:300px;")}>
                Innovate. Build. Elevate. We craft scalable digital products for businesses worldwide.
              </p>
            </div>
            <div>
              <div style={s("font-size:13px; font-weight:700; color:var(--head); margin-bottom:16px;")}>Company</div>
              <div style={s("display:flex; flex-direction:column; gap:11px;")}>
                <a href="#products" style={s("font-size:14px; color:var(--muted);")}>Products</a>
                <a href="#services" style={s("font-size:14px; color:var(--muted);")}>Services</a>
                <a href="#about" style={s("font-size:14px; color:var(--muted);")}>About</a>
                <a href="#careers" style={s("font-size:14px; color:var(--muted);")}>Careers</a>
              </div>
            </div>
            <div>
              <div style={s("font-size:13px; font-weight:700; color:var(--head); margin-bottom:16px;")}>Legal</div>
              <div style={s("display:flex; flex-direction:column; gap:11px;")}>
                <a href="#" style={s("font-size:14px; color:var(--muted);")}>Privacy Policy</a>
                <a href="#" style={s("font-size:14px; color:var(--muted);")}>Terms</a>
              </div>
            </div>
            <div>
              <div style={s("font-size:13px; font-weight:700; color:var(--head); margin-bottom:16px;")}>Connect</div>
              <div style={s("display:flex; gap:10px;")}>
                {socials.map((so, i) => (
                  <a
                    key={i}
                    href={so.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={so.label}
                    style={s(
                      "width:40px; height:40px; border-radius:11px; border:1px solid var(--border); background:var(--surface); display:flex; align-items:center; justify-content:center; color:var(--text);"
                    )}
                  >
                    {so.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>
          <div style={s("padding-top:24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:12px;")}>
            <div style={s("font-size:13px; color:var(--muted);")}>Copyright © 2026 Appixo Technologies. All rights reserved.</div>
            <div style={s("font-size:13px; color:var(--muted); font-family:'JetBrains Mono',monospace;")}>appixotech.com</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
