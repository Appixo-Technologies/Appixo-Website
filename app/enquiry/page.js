import { Suspense } from "react";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import EnquiryForm from "@/components/EnquiryForm";

export const metadata = {
  title: "Start Your Project — Appixo",
  description: "Tell us about your project and we'll get back within one business day.",
};

export default function EnquiryPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header style={s("padding:150px 32px 40px; text-align:center;")}>
        <div style={s("display:flex; align-items:center; justify-content:center; flex-wrap:wrap; gap:7px; font-size:13.5px; color:var(--muted); margin-bottom:22px;")}>
          <a href="/" style={s("color:var(--muted);")}>Home</a>
          <span>›</span>
          <span style={s("color:var(--gold2); font-weight:600;")}>Get a Quote</span>
        </div>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>
          Get Started
        </div>
        <h1
          style={s(
            "margin:14px auto 0; max-width:700px; font-size:42px; font-weight:800; letter-spacing:-0.02em; color:var(--head); line-height:1.15;"
          )}
        >
          Get a Free Quote
        </h1>
        <p style={s("margin:16px auto 0; max-width:560px; font-size:16.5px; line-height:1.6; color:var(--muted);")}>
          Tell us about your project and get a tailored plan within one business day.
        </p>
      </header>

      <section style={s("padding:0 32px 100px;")}>
        <Suspense fallback={null}>
          <EnquiryForm />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
