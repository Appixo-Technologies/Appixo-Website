import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";

export const metadata = {
  title: "Terms of Service — Appixo",
  description: "The terms that govern your use of the Appixo Technologies website.",
};

const h2 = "margin:40px 0 14px; font-size:21px; font-weight:800; letter-spacing:-0.01em; color:var(--head);";
const p = "margin:0 0 14px; font-size:15px; line-height:1.75; color:var(--text);";
const ul = "margin:0 0 14px; padding-left:22px; display:flex; flex-direction:column; gap:8px;";
const li = "font-size:15px; line-height:1.7; color:var(--text);";

export default function TermsPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 40px; text-align:center;")}>
        <div
          style={s(
            "display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:7px; font-size:13.5px; color:var(--muted); margin-bottom:22px;"
          )}
        >
          <a href="/" style={s("color:var(--muted);")}>
            Home
          </a>
          <span>›</span>
          <span style={s("color:var(--gold2); font-weight:600;")}>Terms</span>
        </div>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Legal</div>
        <h1 style={s("margin:14px 0 0; font-size:42px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Terms of Service</h1>
        <p style={s("margin:14px 0 0; font-size:14.5px; color:var(--muted);")}>Last updated: July 20, 2026</p>
      </header>

      <section style={s("padding:0 32px 100px;")}>
        <div
          style={s(
            "max-width:760px; margin:0 auto; padding:44px; border-radius:20px; background:var(--surface); border:1px solid var(--border);"
          )}
        >
          <p style={s(p)}>
            These Terms of Service (&quot;Terms&quot;) govern your use of this website, operated by Appixo
            Technologies (&quot;Appixo&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). By browsing this
            site or submitting a form on it, you agree to these Terms. If you don't agree, please don't use the
            site.
          </p>

          <h2 style={s(h2)}>1. Use of This Website</h2>
          <p style={s(p)}>You agree to use this site only for lawful purposes. You won't:</p>
          <ul style={s(ul)}>
            <li style={s(li)}>Attempt to gain unauthorized access to any part of the site or its underlying systems.</li>
            <li style={s(li)}>Scrape, copy, or reproduce site content for commercial purposes without our permission.</li>
            <li style={s(li)}>Use the contact or enquiry forms to send spam, malicious content, or fraudulent submissions.</li>
            <li style={s(li)}>Interfere with the site's normal operation or security.</li>
          </ul>

          <h2 style={s(h2)}>2. Intellectual Property</h2>
          <p style={s(p)}>
            The Appixo name, logo, and all site content — text, graphics, and design — are the property of Appixo
            Technologies unless otherwise noted, and may not be copied or reused without written permission.
            Product and client names referenced on this site remain the property of their respective owners.
          </p>

          <h2 style={s(h2)}>3. Services &amp; Engagements</h2>
          <p style={s(p)}>
            The services, timelines, and pricing described on this site are for general information only and don't
            constitute a binding offer. Any actual project — scope, deliverables, pricing, and timeline — is
            defined in a separate agreement signed by both parties before work begins.
          </p>

          <h2 style={s(h2)}>4. Enquiries &amp; Quotes</h2>
          <p style={s(p)}>
            Submitting the contact, enquiry, or quote form does not create a client relationship or guarantee a
            response within any specific time. We aim to reply within one business day, but this is a target, not
            a guarantee. We may decline to take on any enquiry at our discretion.
          </p>

          <h2 style={s(h2)}>5. No Warranty</h2>
          <p style={s(p)}>
            This website is provided &quot;as is&quot; without warranties of any kind, express or implied. We don't
            guarantee the site will be uninterrupted, error-free, or free of viruses or other harmful components.
          </p>

          <h2 style={s(h2)}>6. Limitation of Liability</h2>
          <p style={s(p)}>
            To the fullest extent permitted by law, Appixo Technologies won't be liable for any indirect,
            incidental, or consequential damages arising from your use of this website. Nothing in these Terms
            limits liability that can't be excluded under applicable law.
          </p>

          <h2 style={s(h2)}>7. Third-Party Links</h2>
          <p style={s(p)}>
            This site links to third-party platforms such as Instagram, LinkedIn, and GitHub. We don't control and
            aren't responsible for the content or practices of those external sites.
          </p>

          <h2 style={s(h2)}>8. Governing Law</h2>
          <p style={s(p)}>
            These Terms are governed by applicable law, without regard to conflict-of-law principles, and any
            disputes will be handled in the courts having jurisdiction over Appixo Technologies.
          </p>

          <h2 style={s(h2)}>9. Changes to These Terms</h2>
          <p style={s(p)}>
            We may update these Terms from time to time. Changes take effect as soon as they're posted here, with
            the &quot;Last updated&quot; date above reflecting the most recent revision. Continued use of the site
            after changes means you accept the updated Terms.
          </p>

          <h2 style={s(h2)}>10. Contact Us</h2>
          <p style={s(p + " margin-bottom:0;")}>
            Questions about these Terms? Reach us at{" "}
            <a href="mailto:hello@appixotech.com" style={s("color:var(--gold2);")}>
              hello@appixotech.com
            </a>
            .
          </p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
