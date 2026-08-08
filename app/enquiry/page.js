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

      <header className="ax-enquiry-header" style={s("padding:150px 32px 52px;")}>
        <div style={s("max-width:1080px; margin:0 auto;")}>
        <div style={s("display:flex; align-items:center; flex-wrap:wrap; gap:7px; font-size:13px; color:var(--muted); margin-bottom:28px;")}>
          <a href="/" style={s("color:var(--muted);")}>Home</a>
          <span>›</span>
          <span style={s("color:var(--gold2); font-weight:600;")}>Start a Project</span>
        </div>
        <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>
          Project Enquiry
        </div>
        <h1
          style={s(
            "margin:14px 0 0; max-width:760px; font-size:48px; font-weight:800; letter-spacing:-0.035em; color:var(--head); line-height:1.1;"
          )}
        >
          Tell us what you&apos;re building.
        </h1>
        <p style={s("margin:18px 0 0; max-width:650px; font-size:16.5px; line-height:1.7; color:var(--muted);")}>
          Share the context, goals, and stage of your project. A senior team member will review it and respond with practical next steps within one business day.
        </p>
        </div>
      </header>

      <section className="ax-enquiry-section" style={s("padding:0 32px 100px;")}>
        <Suspense fallback={null}>
          <EnquiryForm />
        </Suspense>
      </section>

      <Footer />
    </div>
  );
}
