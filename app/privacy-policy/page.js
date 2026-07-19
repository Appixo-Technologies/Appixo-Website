import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";

export const metadata = {
  title: "Privacy Policy — Appixo",
  description: "How Appixo Technologies collects, uses, and protects the information you share with us.",
};

const h2 = "margin:40px 0 14px; font-size:21px; font-weight:800; letter-spacing:-0.01em; color:var(--head);";
const p = "margin:0 0 14px; font-size:15px; line-height:1.75; color:var(--text);";
const ul = "margin:0 0 14px; padding-left:22px; display:flex; flex-direction:column; gap:8px;";
const li = "font-size:15px; line-height:1.7; color:var(--text);";
const strong = "color:var(--head); font-weight:700;";

export default function PrivacyPolicyPage() {
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
          <span style={s("color:var(--gold2); font-weight:600;")}>Privacy Policy</span>
        </div>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Legal</div>
        <h1 style={s("margin:14px 0 0; font-size:42px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Privacy Policy</h1>
        <p style={s("margin:14px 0 0; font-size:14.5px; color:var(--muted);")}>Last updated: July 20, 2026</p>
      </header>

      <section style={s("padding:0 32px 100px;")}>
        <div
          style={s(
            "max-width:760px; margin:0 auto; padding:44px; border-radius:20px; background:var(--surface); border:1px solid var(--border);"
          )}
        >
          <p style={s(p)}>
            Appixo Technologies (&quot;Appixo&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) builds software for
            clients across the US, UK, Canada, Australia, UAE, and Spain. This Privacy Policy explains what
            information we collect through this website, how we use it, and the choices you have. By using this
            site or submitting a form on it, you agree to the practices described below.
          </p>

          <h2 style={s(h2)}>1. Information We Collect</h2>
          <p style={s(p)}>We collect information you choose to give us directly, through:</p>
          <ul style={s(ul)}>
            <li style={s(li)}>
              <span style={s(strong)}>The contact form</span> — your name, email address, and message.
            </li>
            <li style={s(li)}>
              <span style={s(strong)}>The enquiry / get a quote form</span> — your name, email, phone number,
              company, location, type of inquiry, project details, and, if you request a consultation, your
              preferred date and time.
            </li>
            <li style={s(li)}>
              <span style={s(strong)}>Careers submissions</span> — anything you choose to send us by email, such as
              your resume and contact details.
            </li>
          </ul>
          <p style={s(p)}>
            We do not use advertising or tracking cookies on this site, and we do not currently run third-party
            analytics. Our hosting provider may process standard technical data (such as IP address and browser
            type) purely to serve the site — we do not use this to identify individual visitors.
          </p>

          <h2 style={s(h2)}>2. How We Use Your Information</h2>
          <ul style={s(ul)}>
            <li style={s(li)}>To respond to your enquiry, quote request, or consultation booking.</li>
            <li style={s(li)}>To communicate with you about a potential or ongoing project.</li>
            <li style={s(li)}>To maintain internal records of client and prospect communication.</li>
            <li style={s(li)}>To comply with legal obligations where applicable.</li>
          </ul>
          <p style={s(p)}>We do not use your information for advertising, and we do not sell it to anyone.</p>

          <h2 style={s(h2)}>3. How Your Information Is Stored</h2>
          <p style={s(p)}>
            Form submissions are stored in a private Google Sheet, accessible only to Appixo team members. Google
            acts as our data processor for this storage. We take reasonable technical and organizational measures
            to protect your information, but no method of storage or transmission over the internet is 100%
            secure.
          </p>

          <h2 style={s(h2)}>4. Sharing Your Information</h2>
          <p style={s(p)}>We do not sell or rent your personal information. We may share it only:</p>
          <ul style={s(ul)}>
            <li style={s(li)}>With service providers who help us operate this site (for example, Google, for form storage).</li>
            <li style={s(li)}>If required by law, regulation, or a valid legal request.</li>
            <li style={s(li)}>To protect the rights, safety, or property of Appixo or others.</li>
          </ul>

          <h2 style={s(h2)}>5. Your Rights</h2>
          <p style={s(p)}>
            Depending on where you're located, you may have rights over the personal information we hold about
            you.
          </p>
          <ul style={s(ul)}>
            <li style={s(li)}>
              <span style={s(strong)}>UK &amp; Spain (UK GDPR / EU GDPR).</span> You have the right to access,
              correct, delete, or export your data, to object to or restrict our processing of it, and to lodge a
              complaint with your local data protection authority.
            </li>
            <li style={s(li)}>
              <span style={s(strong)}>United States.</span> Depending on your state, you may have the right to know
              what personal information we hold, request its deletion, and opt out of its sale — though we do not
              sell personal information in the first place.
            </li>
            <li style={s(li)}>
              <span style={s(strong)}>Canada, Australia &amp; UAE.</span> We extend the same access, correction, and
              deletion rights described above to you, regardless of local requirements.
            </li>
          </ul>
          <p style={s(p)}>
            To exercise any of these rights, email us at{" "}
            <a href="mailto:hello@appixotech.com" style={s("color:var(--gold2);")}>
              hello@appixotech.com
            </a>
            . We'll respond within a reasonable timeframe.
          </p>

          <h2 style={s(h2)}>6. Data Retention</h2>
          <p style={s(p)}>
            We keep the information you submit for as long as it's reasonably needed to respond to your enquiry,
            maintain business records, or as required by law — and delete or anonymize it after that.
          </p>

          <h2 style={s(h2)}>7. Children's Privacy</h2>
          <p style={s(p)}>
            This site is intended for businesses and professionals. We do not knowingly collect information from
            anyone under 16.
          </p>

          <h2 style={s(h2)}>8. Third-Party Links</h2>
          <p style={s(p)}>
            Our site links to third-party platforms (like Instagram, LinkedIn, and GitHub). We aren't responsible
            for the privacy practices of those sites — please review their own policies.
          </p>

          <h2 style={s(h2)}>9. Changes to This Policy</h2>
          <p style={s(p)}>
            We may update this policy from time to time. Changes take effect as soon as they're posted here, with
            the &quot;Last updated&quot; date above reflecting the most recent revision.
          </p>

          <h2 style={s(h2)}>10. Contact Us</h2>
          <p style={s(p + " margin-bottom:0;")}>
            Questions about this policy or your data? Reach us at{" "}
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
