import Link from "next/link";
import { s, ic } from "@/lib/icons";

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

export default function Footer() {
  return (
    <footer style={s("padding:60px 32px 32px; background:var(--bg2); border-top:1px solid var(--border);")}>
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
              <Link href="/#products" style={s("font-size:14px; color:var(--muted);")}>Products</Link>
              <Link href="/#services" style={s("font-size:14px; color:var(--muted);")}>Services</Link>
              <Link href="/about" style={s("font-size:14px; color:var(--muted);")}>About</Link>
              <Link href="/careers" style={s("font-size:14px; color:var(--muted);")}>Careers</Link>
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
  );
}
