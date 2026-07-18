"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { s, svgSpan, ic } from "@/lib/icons";
import { products, services } from "@/lib/siteData";

const menuIcon = ic('<path d="M4 6h16M4 12h16M4 18h16"/>');
const closeIcon = ic('<path d="M18 6 6 18M6 6l12 12"/>');
const chevronIcon = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
);

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState({ products: false, services: false });
  const navRef = useRef(null);

  useEffect(() => {
    const nav = navRef.current;
    const onScroll = () => {
      if (!nav) return;
      if (window.scrollY > 30) {
        nav.style.background = "color-mix(in srgb, var(--bg2) 82%, transparent)";
        nav.style.backdropFilter = "blur(14px)";
        nav.style.borderBottomColor = "var(--border)";
      } else {
        nav.style.background = "transparent";
        nav.style.backdropFilter = "none";
        nav.style.borderBottomColor = "transparent";
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleMobileSub = (key) => setMobileSub((v) => ({ ...v, [key]: !v[key] }));
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSub({ products: false, services: false });
  };

  return (
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
        <Link href="/" style={s("display:flex; align-items:center; gap:12px; flex-shrink:0; min-width:0;")}>
          <img src="/logo.png" alt="Appixo" style={s("width:38px; height:38px; border-radius:10px; display:block; flex-shrink:0;")} />
          <span className="ax-brand" style={s("font-weight:800; font-size:20px; letter-spacing:.16em; color:var(--head);")}>APPIXO</span>
        </Link>

        <div className="ax-nav-links" style={s("display:flex; align-items:center; gap:28px; margin-left:8px;")}>
          <Link href="/" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            Home
          </Link>

          <div className="ax-dropdown">
            <button type="button" className="ax-dropdown-trigger" style={s("display:flex; align-items:center; gap:5px; font-size:14.5px; color:var(--text); font-weight:500; background:none; border:none; cursor:pointer; font-family:inherit; padding:0;")}>
              Products {chevronIcon}
            </button>
            <div className="ax-dropdown-menu">
              {products.map((p) => (
                <Link key={p.slug} href={`/products/${p.slug}`} className="ax-dropdown-item">
                  {p.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="ax-dropdown">
            <button type="button" className="ax-dropdown-trigger" style={s("display:flex; align-items:center; gap:5px; font-size:14.5px; color:var(--text); font-weight:500; background:none; border:none; cursor:pointer; font-family:inherit; padding:0;")}>
              Services {chevronIcon}
            </button>
            <div className="ax-dropdown-menu">
              {services.map((sv) => (
                <Link key={sv.slug} href={`/services/${sv.slug}`} className="ax-dropdown-item">
                  {sv.name}
                </Link>
              ))}
            </div>
          </div>

          <Link href="/about" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            About
          </Link>
          <Link href="/careers" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            Careers
          </Link>
          <Link href="/#contact" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            Contact
          </Link>
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
          <Link
            href="/#contact"
            className="ax-nav-cta"
            style={s(
              "display:inline-flex; align-items:center; gap:8px; padding:11px 20px; border-radius:10px; font-size:14.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 8px 24px -8px rgba(212,175,55,0.5);"
            )}
          >
            Get in Touch
          </Link>
        </div>
      </div>

      {mobileOpen && (
        <div
          className="ax-nav-mobile"
          style={s(
            "display:flex; flex-direction:column; padding:6px 20px 18px; gap:2px; border-top:1px solid var(--border); background:var(--bg2);"
          )}
        >
          <Link
            href="/"
            onClick={closeMobile}
            style={s("padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; border-bottom:1px solid var(--border);")}
          >
            Home
          </Link>

          <div style={s("border-bottom:1px solid var(--border);")}>
            <button
              type="button"
              onClick={() => toggleMobileSub("products")}
              style={s(
                "width:100%; display:flex; align-items:center; justify-content:space-between; padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; background:none; border:none; font-family:inherit; cursor:pointer;"
              )}
            >
              Products
              <span style={s(`display:inline-flex; transition:transform .2s ease; transform:rotate(${mobileSub.products ? "180deg" : "0deg"});`)}>
                {chevronIcon}
              </span>
            </button>
            {mobileSub.products && (
              <div style={s("display:flex; flex-direction:column; padding:0 0 10px 14px; gap:2px;")}>
                {products.map((p) => (
                  <Link
                    key={p.slug}
                    href={`/products/${p.slug}`}
                    onClick={closeMobile}
                    style={s("padding:10px 4px; font-size:14px; color:var(--muted); font-weight:500;")}
                  >
                    {p.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <div style={s("border-bottom:1px solid var(--border);")}>
            <button
              type="button"
              onClick={() => toggleMobileSub("services")}
              style={s(
                "width:100%; display:flex; align-items:center; justify-content:space-between; padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; background:none; border:none; font-family:inherit; cursor:pointer;"
              )}
            >
              Services
              <span style={s(`display:inline-flex; transition:transform .2s ease; transform:rotate(${mobileSub.services ? "180deg" : "0deg"});`)}>
                {chevronIcon}
              </span>
            </button>
            {mobileSub.services && (
              <div style={s("display:flex; flex-direction:column; padding:0 0 10px 14px; gap:2px;")}>
                {services.map((sv) => (
                  <Link
                    key={sv.slug}
                    href={`/services/${sv.slug}`}
                    onClick={closeMobile}
                    style={s("padding:10px 4px; font-size:14px; color:var(--muted); font-weight:500;")}
                  >
                    {sv.name}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/about"
            onClick={closeMobile}
            style={s("padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; border-bottom:1px solid var(--border);")}
          >
            About
          </Link>
          <Link
            href="/careers"
            onClick={closeMobile}
            style={s("padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; border-bottom:1px solid var(--border);")}
          >
            Careers
          </Link>
          <Link
            href="/#contact"
            onClick={closeMobile}
            style={s("padding:13px 4px; font-size:15px; color:var(--text); font-weight:500; border-bottom:1px solid var(--border);")}
          >
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
