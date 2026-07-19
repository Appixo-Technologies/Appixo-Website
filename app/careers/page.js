import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s, ic } from "@/lib/icons";

export const metadata = {
  title: "Careers — Appixo",
  description: "There are no open roles right now, but we're always happy to hear from people who want to build with us.",
};

const iMail = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>');

export default function CareersPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 60px; text-align:center;")}>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Careers</div>
        <h1 style={s("margin:14px 0 0; font-size:44px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Build with Appixo</h1>
        <p style={s("margin:18px auto 0; max-width:560px; font-size:17px; line-height:1.65; color:var(--muted);")}>
          We're a small team shipping real products for healthcare, social good, and beyond. There are no open
          roles right now — but we're always happy to hear from people who want to build with us.
        </p>
      </header>

      <section style={s("padding:0 32px 90px;")}>
        <div
          style={s(
            "max-width:640px; margin:0 auto; padding:36px; border-radius:20px; background:var(--surface); border:1px solid var(--border); text-align:center;"
          )}
        >
          <div
            style={s(
              "width:52px; height:52px; margin:0 auto 18px; border-radius:14px; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
            )}
          >
            {iMail}
          </div>
          <h2 style={s("margin:0 0 10px; font-size:20px; font-weight:700; color:var(--head);")}>Send us your resume</h2>
          <p style={s("margin:0 0 22px; font-size:14.5px; color:var(--muted); line-height:1.6;")}>
            Tell us what you're good at and what you'd want to work on. We keep every note on file and reach out
            when something fits.
          </p>
          <a
            href="mailto:hello@appixotech.com"
            style={s(
              "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
            )}
          >
            hello@appixotech.com
          </a>
        </div>
      </section>

      <Footer />
    </div>
  );
}
