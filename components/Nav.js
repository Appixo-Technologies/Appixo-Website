"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { s, svgSpan, ic } from "@/lib/icons";
import { serviceCategories } from "@/lib/siteData";
import EnquiryForm from "@/components/EnquiryForm";

const menuIcon = ic('<path d="M4 6h16M4 12h16M4 18h16"/>');
const closeIcon = ic('<path d="M18 6 6 18M6 6l12 12"/>');
const chevronIcon = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>'
);
const arrowIcon = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>'
);

const categoryIcons = {
  Development: ic('<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>'),
  Design: ic(
    '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'
  ),
  Solutions: ic('<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>'),
};

function navLinkStyle(active) {
  return `font-size:14.5px; color:var(--text); font-weight:${active ? 700 : 500}; padding-bottom:7px; margin-bottom:-7px; background-image:${active ? "linear-gradient(var(--gold),var(--gold))" : "none"}; background-repeat:no-repeat; background-position:left bottom; background-size:100% 2px;`;
}

function mobileNavLinkStyle(active) {
  return `padding:13px 4px; font-size:15px; color:var(--text); font-weight:${active ? 700 : 500}; border-bottom:1px solid var(--border); box-shadow:${active ? "inset 0 -2px 0 var(--gold)" : "none"};`;
}

export default function Nav() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isServices = pathname.startsWith("/services");
  const isAbout = pathname === "/about";
  const isCareers = pathname === "/careers";

  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSub, setMobileSub] = useState({ products: false, services: false });
  const [enquiryOpen, setEnquiryOpen] = useState(false);

  const toggleMobileSub = (key) => setMobileSub((v) => ({ ...v, [key]: !v[key] }));
  const closeMobile = () => {
    setMobileOpen(false);
    setMobileSub({ products: false, services: false });
  };

  useEffect(() => {
    if (!enquiryOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setEnquiryOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [enquiryOpen]);

  return (
    <nav style={s("position:fixed; top:0; left:0; right:0; z-index:100; padding:18px 24px 0;")}>
      <div
        className="ax-nav-inner"
        style={s(
          "max-width:1240px; margin:0 auto; padding:10px 10px 10px 24px; display:flex; align-items:center; gap:32px; border-radius:999px; background:color-mix(in srgb, var(--surface) 90%, transparent); backdrop-filter:blur(16px); border:1px solid var(--border); box-shadow:var(--shadow);"
        )}
      >
        <Link href="/" style={s("display:flex; align-items:center; gap:12px; flex-shrink:0; min-width:0;")}>
          <img
            src="/logo.png"
            alt="Appixo"
            className="ax-logo"
            style={s("width:38px; height:38px; border-radius:10px; display:block; flex-shrink:0; object-fit:contain;")}
          />
          <span className="ax-brand" style={s("font-weight:800; font-size:20px; letter-spacing:.16em; color:var(--head);")}>APPIXO</span>
        </Link>

        <div className="ax-nav-links" style={s("display:flex; align-items:center; gap:28px; margin-left:8px;")}>
          <Link href="/" style={s(navLinkStyle(isHome))}>
            Home
          </Link>

          <Link href="/about" style={s(navLinkStyle(isAbout))}>
            About
          </Link>

          <div className="ax-dropdown">
            <Link href="/services" className="ax-dropdown-trigger" style={s(`display:flex; align-items:center; gap:5px; ${navLinkStyle(isServices)}`)}>
              Services {chevronIcon}
            </Link>
            <div className="ax-dropdown-menu ax-mega-menu">
              <div className="ax-mega-cols">
                {serviceCategories.map((cat) => (
                  <div key={cat.name} className="ax-mega-col">
                    <div className="ax-mega-col-title">
                      <span className="ax-mega-col-icon">{categoryIcons[cat.name]}</span>
                      {cat.name}
                    </div>
                    {cat.services.map((sv) => (
                      <Link key={sv.slug} href={`/services/${sv.slug}`} className="ax-mega-item">
                        {sv.name}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
              <div className="ax-mega-banner">
                <span>Didn&apos;t find what you need? Tell us and we&apos;ll tailor a plan.</span>
                <button
                  type="button"
                  onClick={() => setEnquiryOpen(true)}
                  style={s(
                    "display:inline-flex; align-items:center; gap:8px; padding:10px 18px; border-radius:999px; font-size:13.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); border:none; cursor:pointer; font-family:inherit; white-space:nowrap;"
                  )}
                >
                  Get in Touch
                </button>
              </div>
            </div>
          </div>

          <Link href="/#portfolio" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            Case Studies
          </Link>
          <Link href="/#process" style={s("font-size:14.5px; color:var(--text); font-weight:500;")}>
            Process
          </Link>
          <Link href="/careers" style={s(navLinkStyle(isCareers))}>
            Careers
          </Link>
        </div>

        <div className="ax-nav-actions" style={s("margin-left:auto; display:flex; align-items:center; gap:14px;")}>
          <button
            className="ax-nav-toggle"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={mobileOpen}
            style={s(
              "display:none; width:40px; height:40px; border-radius:50%; border:1px solid var(--border); background:var(--surface2); color:var(--gold); align-items:center; justify-content:center; cursor:pointer;"
            )}
          >
            {mobileOpen ? closeIcon : menuIcon}
          </button>
          <button
            type="button"
            onClick={() => setEnquiryOpen(true)}
            className="ax-nav-cta"
            style={s(
              "display:inline-flex; align-items:center; gap:10px; padding:6px 6px 6px 20px; border-radius:999px; font-size:14.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 8px 24px -8px rgba(212,175,55,0.5); border:none; cursor:pointer; font-family:inherit;"
            )}
          >
            Get in Touch
            <span style={s("width:32px; height:32px; border-radius:50%; background:rgba(10,15,26,0.16); display:flex; align-items:center; justify-content:center; flex-shrink:0;")}>
              {arrowIcon}
            </span>
          </button>
        </div>
      </div>

      {enquiryOpen && (
        <div
          className="ax-modal-shell"
          onClick={() => setEnquiryOpen(false)}
          style={s(
            "position:fixed; inset:0; z-index:200; background:rgba(7,11,20,0.78); backdrop-filter:blur(6px); display:flex; justify-content:center; overflow-y:auto; padding:110px 20px 40px;"
          )}
        >
          <div onClick={(e) => e.stopPropagation()} style={s("position:relative; width:100%; max-width:1080px; height:fit-content;")}>
            <button
              className="ax-modal-close"
              type="button"
              onClick={() => setEnquiryOpen(false)}
              aria-label="Close"
              style={s(
                "position:absolute; top:-14px; right:-14px; width:38px; height:38px; border-radius:50%; background:var(--surface2); border:1px solid var(--border); color:var(--head); display:flex; align-items:center; justify-content:center; cursor:pointer; z-index:1;"
              )}
            >
              {closeIcon}
            </button>
            <Suspense fallback={null}>
              <EnquiryForm />
            </Suspense>
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          className="ax-nav-mobile"
          style={s(
            "max-width:1240px; margin:10px auto 0; display:flex; flex-direction:column; padding:6px 20px 12px; gap:2px; border-radius:24px; background:var(--surface); border:1px solid var(--border); box-shadow:var(--shadow);"
          )}
        >
          <Link
            href="/"
            onClick={closeMobile}
            style={s(mobileNavLinkStyle(isHome))}
          >
            Home
          </Link>

          <Link
            href="/about"
            onClick={closeMobile}
            style={s(mobileNavLinkStyle(isAbout))}
          >
            About
          </Link>

          <div style={s("border-bottom:1px solid var(--border);")}>
            <button
              type="button"
              onClick={() => toggleMobileSub("services")}
              style={s(
                `width:100%; display:flex; align-items:center; justify-content:space-between; padding:13px 4px; background:none; border:none; font-family:inherit; cursor:pointer; font-size:15px; color:var(--text); font-weight:${isServices ? 700 : 500}; box-shadow:${isServices ? "inset 0 -2px 0 var(--gold)" : "none"};`
              )}
            >
              Services
              <span style={s(`display:inline-flex; transition:transform .2s ease; transform:rotate(${mobileSub.services ? "180deg" : "0deg"});`)}>
                {chevronIcon}
              </span>
            </button>
            {mobileSub.services && (
              <div style={s("display:flex; flex-direction:column; padding:0 0 10px 14px; gap:10px;")}>
                {serviceCategories.map((cat) => (
                  <div key={cat.name}>
                    <div style={s("padding:6px 4px 4px; font-size:11px; font-weight:700; letter-spacing:.08em; text-transform:uppercase; color:var(--gold);")}>
                      {cat.name}
                    </div>
                    <div style={s("display:flex; flex-direction:column; gap:2px;")}>
                      {cat.services.map((sv) => (
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
                  </div>
                ))}
              </div>
            )}
          </div>

          <Link
            href="/#portfolio"
            onClick={closeMobile}
            style={s(mobileNavLinkStyle(false))}
          >
            Case Studies
          </Link>
          <Link
            href="/#process"
            onClick={closeMobile}
            style={s(mobileNavLinkStyle(false))}
          >
            Process
          </Link>
          <Link
            href="/careers"
            onClick={closeMobile}
            style={s(mobileNavLinkStyle(isCareers))}
          >
            Careers
          </Link>
        </div>
      )}
    </nav>
  );
}
