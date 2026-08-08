import Link from "next/link";
import { s, svgSpan, ic } from "@/lib/icons";

const arrow = svgSpan(
  '<svg xmlns="http://www.w3.org/2000/svg" width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>'
);

const mailIcon = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>');
const pinIcon = ic('<path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0z"/><circle cx="12" cy="10" r="3"/>');
const socials = [
  { label: "Instagram", href: "https://www.instagram.com/appixotech/?hl=en", icon: ic('<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>') },
  { label: "LinkedIn", href: "https://www.linkedin.com/company/appixotech/about/?viewAsMember=true", icon: ic('<path d="M16 8a6 6 0 0 1 6 6v6h-4v-6a2 2 0 0 0-4 0v6h-4v-9h4v1.5"/><rect x="2" y="9" width="4" height="11"/><circle cx="4" cy="4" r="2"/>') },
  { label: "GitHub", href: "https://github.com/Appixo-Technologies", icon: ic('<path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.9a3.4 3.4 0 0 0-.9-2.6c3-.3 6.2-1.5 6.2-6.7A5.2 5.2 0 0 0 20 4.8 4.9 4.9 0 0 0 19.9 1S18.7.6 16 2.5a13.4 13.4 0 0 0-7 0C6.3.6 5.1 1 5.1 1A4.9 4.9 0 0 0 5 4.8 5.2 5.2 0 0 0 3.7 8.4c0 5.2 3.2 6.4 6.2 6.7a3.4 3.4 0 0 0-.9 2.6V22"/>') },
];

const columns = [
  {
    title: "Our Company",
    links: [
      ["About Us", "/about"],
      ["Our Approach", "/about"],
      ["Process", "/process"],
      ["Careers", "/careers"],
      ["FAQ", "/#faq"],
    ],
  },
  {
    title: "Services",
    links: [
      ["Web Development", "/services/web-development"],
      ["Mobile App Development", "/services/mobile-app-development"],
      ["UI/UX Design", "/services/ui-ux-design"],
      ["Cloud Solutions", "/services/cloud-solutions"],
      ["AI Solutions", "/services/ai-solutions"],
    ],
    more: ["View More", "/services"],
  },
  {
    title: "Portfolio",
    links: [
      ["Case Studies", "/case-studies"],
      ["Clinic Click", "/products/clinic-click"],
      ["RaktConnect", "/products/raktconnect"],
      ["Future AI Product", "/products/future-ai-product"],
    ],
    more: ["View More", "/products"],
  },
  {
    title: "Technologies",
    links: [
      ["React & Next.js", "/#technologies"],
      ["Flutter & React Native", "/#technologies"],
      ["Node.js & Express", "/#technologies"],
      ["Cloud & DevOps", "/services/devops"],
      ["Data & AI", "/services/ai-solutions"],
    ],
    more: ["View More", "/#technologies"],
  },
  {
    title: "Industries",
    links: [
      ["Healthcare", "/products/clinic-click"],
      ["Social Impact", "/products/raktconnect"],
      ["Startups", "/case-studies"],
      ["Ecommerce", "/services/web-development"],
    ],
    more: ["View More", "/#contact"],
  },
];

export default function Footer() {
  return (
    <footer className="ax-footer" style={s("padding:64px 32px 28px; background:#000000; border-top:1px solid var(--border);")}>
      <div style={s("max-width:1400px; margin:0 auto;")}>
        <div className="ax-footer-grid" style={s("display:grid; grid-template-columns:repeat(5,minmax(0,1fr)); gap:44px; padding-bottom:52px; border-bottom:1px solid var(--border);")}>
          {columns.map((column) => (
            <div key={column.title} className="ax-footer-column">
              <h2 style={s("margin:0 0 28px; font-size:22px; line-height:1.2; font-weight:700; color:var(--head);")}>
                {column.title}
              </h2>
              <div style={s("display:flex; flex-direction:column; align-items:flex-start; gap:17px;")}>
                {column.links.map(([label, href]) => (
                  <Link key={label} href={href} className="ax-footer-link" style={s("font-size:14px; line-height:1.45; color:var(--text); transition:color .2s ease;")}>
                    {label}
                  </Link>
                ))}
                {column.more && (
                  <Link href={column.more[1]} className="ax-footer-more" style={s("display:inline-flex; align-items:center; gap:9px; margin-top:5px; padding-bottom:4px; border-bottom:1px solid currentColor; font-size:14px; font-weight:600; color:var(--head);")}>
                    {column.more[0]} {arrow}
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="ax-footer-contact" style={s("display:grid; grid-template-columns:1fr 1fr auto; gap:28px; align-items:center; padding:28px 0; border-bottom:1px solid var(--border);")}>
          <a href="mailto:hello@appixotech.com" style={s("display:flex; align-items:center; gap:13px;")}>
            <span style={s("width:20px; height:20px; flex-shrink:0; display:flex; align-items:center; justify-content:center; color:var(--muted);")}>{mailIcon}</span>
            <span><span style={s("display:block; margin-bottom:3px; font-size:11.5px; color:var(--muted);")}>Email us</span><span style={s("display:block; font-size:14px; font-weight:600; color:var(--head);")}>hello@appixotech.com</span></span>
          </a>
          <div style={s("display:flex; align-items:center; gap:13px;")}>
            <span style={s("width:20px; height:20px; flex-shrink:0; display:flex; align-items:center; justify-content:center; color:var(--muted);")}>{pinIcon}</span>
            <span><span style={s("display:block; margin-bottom:3px; font-size:11.5px; color:var(--muted);")}>Our location</span><span style={s("display:block; font-size:14px; font-weight:600; color:var(--head);")}>Noida, Uttar Pradesh, India</span></span>
          </div>
          <div>
            <div style={s("margin-bottom:8px; font-size:11.5px; color:var(--muted);")}>Connect with us</div>
            <div style={s("display:flex; gap:9px;")}>
              {socials.map((social) => (
                <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" aria-label={social.label} className="ax-social-link" style={s("width:42px; height:42px; border-radius:11px; border:1px solid var(--border); background:var(--surface); display:flex; align-items:center; justify-content:center; color:var(--text); transition:color .2s ease,border-color .2s ease;")}>{social.icon}</a>
              ))}
            </div>
          </div>
        </div>

        <div className="ax-footer-bottom" style={s("padding-top:24px; display:flex; align-items:center; justify-content:space-between; flex-wrap:wrap; gap:18px;")}>
          <Link href="/" style={s("display:flex; align-items:center; gap:10px;")}>
            <img src="/logo.png" alt="Appixo" style={s("width:34px; height:34px; border-radius:9px; object-fit:contain;")} />
            <span style={s("font-weight:800; font-size:17px; letter-spacing:.16em; color:var(--head);")}>APPIXO</span>
          </Link>
          <div style={s("font-size:12.5px; color:var(--muted);")}>Copyright © 2026 Appixo Technologies. All rights reserved.</div>
          <div style={s("display:flex; gap:18px; font-size:12.5px; color:var(--muted);")}>
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
