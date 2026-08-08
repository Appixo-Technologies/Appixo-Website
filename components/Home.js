"use client";

import { useEffect, useState } from "react";
import { s, ic } from "@/lib/icons";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import {
  SiFlutter,
  SiReact,
  SiNextdotjs,
  SiNodedotjs,
  SiExpress,
  SiFirebase,
  SiMongodb,
  SiPostgresql,
  SiDocker,
  SiGithub,
} from "react-icons/si";
import { FaAws, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import { FiActivity, FiCompass, FiEdit3, FiFlag, FiSearch, FiTool, FiMessageSquare } from "react-icons/fi";

const techStack = [
  { name: "Flutter", Icon: SiFlutter, color: "#54C5F8" },
  { name: "React Native", Icon: SiReact, color: "#61DAFB" },
  { name: "React", Icon: SiReact, color: "#61DAFB" },
  { name: "Next.js", Icon: SiNextdotjs, color: "#111827" },
  { name: "Node.js", Icon: SiNodedotjs, color: "#68A063" },
  { name: "Express", Icon: SiExpress, color: "#111827" },
  { name: "Firebase", Icon: SiFirebase, color: "#FFCA28" },
  { name: "MongoDB", Icon: SiMongodb, color: "#47A248" },
  { name: "PostgreSQL", Icon: SiPostgresql, color: "#6699CC" },
  { name: "Docker", Icon: SiDocker, color: "#2496ED" },
  { name: "AWS", Icon: FaAws, color: "#FF9900" },
  { name: "GitHub", Icon: SiGithub, color: "#111827" },
];

// Repeated enough times so a single "copy" of the strip is always wider than
// the viewport - otherwise the -50% translate loop trick runs out of content
// mid-cycle and leaves a blank gap on one side.
const techBaseA = techStack.slice(0, 6);
const techBaseB = techStack.slice(6, 12);
const techLoopA = Array(6).fill(techBaseA).flat();
const techLoopB = Array(6).fill(techBaseB).flat();

export default function Home() {
  const [submitLabel, setSubmitLabel] = useState("Send message");
  const [submitting, setSubmitting] = useState(false);
  const [activeProcess, setActiveProcess] = useState(2);
  const [processPaused, setProcessPaused] = useState(false);

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
  const processIcons = [FiCompass, FiSearch, FiEdit3, FiTool, FiActivity, FiFlag, FiMessageSquare];
  const steps = [
    { num: "01", name: "Idea", detail: "Vision and opportunity", description: "We align the product idea with the business outcome, user need, constraints, and measures of success." },
    { num: "02", name: "Research", detail: "Users, market and risk", description: "Evidence replaces assumptions through stakeholder workshops, user insight, competitor review, and technical discovery." },
    { num: "03", name: "Design", detail: "Wireframing and UI/UX", description: "Journeys, prototypes, and a scalable design system turn the strategy into an experience people understand immediately." },
    { num: "04", name: "Development", detail: "Iterative product engineering", description: "Senior engineers ship secure, maintainable increments with visible progress and continuous product feedback." },
    { num: "05", name: "Testing", detail: "Quality at every layer", description: "Functional, integration, performance, security, and usability checks protect the journeys that matter most." },
    { num: "06", name: "Launch", detail: "A controlled production release", description: "We prepare environments, data, monitoring, rollout plans, and your team for a confident go-live." },
    { num: "07", name: "Support", detail: "Measure, learn and evolve", description: "After launch, we monitor product health, learn from usage, resolve issues, and prioritize the next improvements." },
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

  const whyDetails = [
    { title:"Fast Development", image:"/media/why-fast-development.png", lead:"Move from decision to working software without sacrificing engineering discipline.", body:"We reduce waiting and rework through small releases, early technical validation, reusable foundations, and short feedback loops with the people who make decisions.", points:["Short, visible delivery cycles","Early prototypes and technical validation","Production-ready increments—not demo-only work"] },
    { title:"Secure Architecture", image:"/media/why-secure-architecture.png", lead:"Security is an architecture input, not a checklist before launch.", body:"Access, data handling, dependencies, environments, and failure paths are considered from the start so security grows with the product instead of becoming an expensive retrofit.", points:["Least-privilege access patterns","Secure API and data boundaries","Dependency and environment controls"] },
    { title:"Cloud Ready", image:"/media/why-cloud-ready.png", lead:"Infrastructure designed for reliability, visibility, and sensible cost.", body:"We build deployable environments, automated delivery paths, monitoring, and recovery considerations around your real workload—then evolve capacity as usage grows.", points:["Repeatable cloud environments","Monitoring and operational visibility","Cost-aware scaling decisions"] },
    { title:"Cross Platform", image:"/media/why-cross-platform.png", lead:"One product experience, thoughtfully adapted to every screen.", body:"Shared systems and reusable foundations keep behavior consistent across web, iOS, and Android while leaving room for the interaction patterns each platform expects.", points:["Consistent design foundations","Shared logic where it creates value","Platform-aware interactions"] },
    { title:"High Performance", image:"/media/why-high-performance.png", lead:"Speed is engineered through the entire system—not patched into the interface.", body:"We profile critical journeys, control payloads, choose sensible rendering and caching strategies, and monitor production behavior so performance remains measurable.", points:["Performance budgets for key journeys","Efficient rendering, APIs, and data access","Production monitoring and iteration"] },
    { title:"Scalable Products", image:"/media/why-scalable-products.png", lead:"A foundation that can accept new users, workflows, and integrations cleanly.", body:"Modular architecture, clear contracts, documented decisions, and maintainable code help the product expand without forcing a rewrite every time the roadmap changes.", points:["Modular product architecture","Clear service and integration boundaries","Documentation for long-term ownership"] },
  ];

  useEffect(() => {
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

    return () => {
      if (io) io.disconnect();
    };
  }, []);

  useEffect(() => {
    if (processPaused || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveProcess((step) => (step + 1) % steps.length), 1800);
    return () => window.clearInterval(timer);
  }, [processPaused, steps.length]);

  return (
    <div id="appixo-root">
      <Nav />

      {/* ===================== HERO ===================== */}
      <header id="top" className="ax-hero" style={s("position:relative; min-height:100vh; display:flex; align-items:flex-end; overflow:hidden;")}>
        <img
          className="ax-hero-bg"
          src="/media/hero-product-studio.png"
          alt=""
          style={s("position:absolute; inset:0; width:100%; height:100%; object-fit:cover; z-index:0;")}
        />
        <div
          style={s(
            "position:absolute; inset:0; background:linear-gradient(180deg, rgba(7,11,20,0.05) 0%, rgba(7,11,20,0.20) 58%, rgba(7,11,20,0.84) 100%); z-index:1;"
          )}
        />
        <div
          style={s(
            "position:absolute; inset:0; background:linear-gradient(90deg, rgba(7,11,20,0.55) 0%, rgba(7,11,20,0.12) 48%, transparent 72%); z-index:1;"
          )}
        />

        <div
          className="ax-hero-grid"
          style={s("position:relative; z-index:2; max-width:1240px; margin:0 auto; width:100%; padding:150px 32px 90px;")}
        >
          <div data-reveal="" style={s("max-width:600px;")}>
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
              PRODUCT STRATEGY · DESIGN · ENGINEERING
            </div>
            <h1
              className="ax-hero-title"
              style={s(
                "margin:0; font-size:52px; line-height:1.08; font-weight:800; letter-spacing:-0.03em; color:var(--head); text-wrap:balance;"
              )}
            >
              Software products, engineered for{" "}
              <span
                style={s(
                  "background:linear-gradient(120deg,var(--gold2),var(--gold)); -webkit-background-clip:text; background-clip:text; color:transparent;"
                )}
              >
                real-world growth.
              </span>
            </h1>
            <p style={s("margin:22px 0 0; font-size:17px; line-height:1.6; color:var(--text);")}>
              One senior product team for strategy, design, engineering, cloud, and ongoing improvement—from the first decision to a dependable production launch.
            </p>
            <div style={s("display:flex; flex-wrap:wrap; gap:14px; margin-top:36px;")}>
              <a
                href="/enquiry"
                style={s(
                  "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55);"
                )}
              >
                Start a Project {arrowIcon}
              </a>
              <a
                href="/case-studies"
                style={s(
                  "display:inline-flex; align-items:center; gap:9px; padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:600; color:var(--head); background:rgba(16,26,43,0.55); backdrop-filter:blur(6px); border:1px solid var(--border);"
                )}
              >
                View Our Work
              </a>
            </div>
            <div className="ax-hero-proof" style={s("display:flex; flex-wrap:wrap; gap:10px 20px; margin-top:28px; padding-top:22px; border-top:1px solid rgba(255,255,255,.12);")}>
              {["End-to-end delivery", "Senior engineering", "Clear weekly updates"].map((item) => (
                <span key={item} style={s("display:inline-flex; align-items:center; gap:8px; color:#AEB7C6; font-size:12.5px; font-weight:600;")}>
                  <i style={s("width:5px; height:5px; border-radius:50%; background:var(--gold); box-shadow:0 0 0 3px rgba(212,175,55,.13);")} />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>
      </header>

      {/* ===================== TRUST STRIP ===================== */}
      <section style={s("padding:40px 32px 56px;")}>
        <div
          data-reveal=""
          style={s(
            "max-width:1240px; margin:0 auto; display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:14px 26px; padding:22px 28px; border-top:1px solid var(--border); border-bottom:1px solid var(--border);"
          )}
        >
          <span style={s("font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--gold);")}>
            Working across
          </span>
          {[
            "United States", "United Kingdom", "Canada", "Australia", "UAE", "India", "Spain",
          ].map((name) => (
            <span
              key={name}
              style={s("display:inline-flex; align-items:center; gap:8px; font-size:13px; font-weight:600; color:var(--text);")}
            >
              <i style={s("width:3px; height:3px; border-radius:50%; background:var(--gold);")} />
              {name}
            </span>
          ))}
        </div>
      </section>

      {/* ===================== WHY APPIXO ===================== */}
      <section id="about" className="ax-why-section" style={s("scroll-margin-top:80px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" className="ax-why-heading">
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Why Appixo</div>
            <h2>Engineering decisions that keep paying off.</h2>
            <p>Explore the principles behind how we build products that move quickly today and remain dependable tomorrow.</p>
          </div>
          <div className="ax-why-story">
            {whyDetails.map((item, index) => (
              <article key={item.title} className="ax-why-feature">
                <div className="ax-why-image"><img src={item.image} alt={`${item.title} engineering concept`} /></div>
                <div className="ax-why-copy">
                  <span>{String(index + 1).padStart(2,"0")} / {String(whyDetails.length).padStart(2,"0")}</span>
                  <h3>{item.title}</h3><h4>{item.lead}</h4><p>{item.body}</p>
                  <ul>{item.points.map((point) => <li key={point}>{point}</li>)}</ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PROCESS ===================== */}
      <section id="process" className="ax-process-section">
        <div className="ax-process-atmosphere" aria-hidden="true" />
        <div className="ax-process-shell">
          <div data-reveal="" className="ax-process-heading">
            <div className="ax-process-kicker">How we work</div>
            <h2>Development process</h2>
            <p>A transparent, seven-stage path from an ambitious idea to a dependable product—built around evidence, visible progress, and measurable outcomes.</p>
          </div>
          <div
            data-reveal=""
            className="ax-process-stage"
            onMouseEnter={() => setProcessPaused(true)}
            onMouseLeave={() => setProcessPaused(false)}
          >
            <div className="ax-process-track" aria-hidden="true"><i style={{ width: `${(activeProcess / (steps.length - 1)) * 100}%` }} /></div>
            <div className="ax-process-modules" role="tablist" aria-label="Development process steps">
              {steps.map((step, index) => {
                const StepIcon = processIcons[index] || FiActivity;
                const state = index === activeProcess ? "is-active" : index < activeProcess ? "is-complete" : "is-pending";
                return (
                  <button
                    key={step.num}
                    className={`ax-process-module ${state}`}
                    onClick={() => setActiveProcess(index)}
                    role="tab"
                    aria-selected={index === activeProcess}
                    aria-controls="process-detail"
                  >
                    <span className="ax-process-icon"><StepIcon size={25} strokeWidth={1.55} aria-hidden="true" /></span>
                    <span className="ax-process-number">{step.num}</span>
                    <strong>{step.name}</strong>
                    <small>{step.detail}</small>
                  </button>
                );
              })}
            </div>
            <div id="process-detail" className="ax-process-detail" role="tabpanel" key={activeProcess}>
              <div><span>Current phase</span><b>{steps[activeProcess].num}</b></div>
              <div><h3>{steps[activeProcess].name}</h3><p>{steps[activeProcess].description}</p></div>
              <span className="ax-process-status">{steps[activeProcess].detail}</span>
            </div>
            <a className="ax-process-full-link" href="/process">Explore our complete delivery process →</a>
          </div>
        </div>
      </section>

      {/* ===================== TECHNOLOGIES ===================== */}
      <section id="technologies" className="ax-light-section ax-technologies" style={s("padding:70px 0; scroll-margin-top:80px;")}>
        <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 44px; padding:0 32px;")}>
          <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Technologies</div>
          <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>Our stack</h2>
        </div>
        <div
          style={s(
            "position:relative; overflow:hidden; -webkit-mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent); mask-image:linear-gradient(90deg,transparent,#000 8%,#000 92%,transparent);"
          )}
        >
          <div className="ax-marquee-track" style={s("display:flex; gap:20px; width:max-content; animation:ax-marquee 38s linear infinite; padding:0 10px;")}>
            {techLoopA.map((t, i) => (
              <div
                key={i}
                className="ax-lift ax-light-card"
                style={s(
                  "flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:16px; padding:34px 20px; border-radius:20px; background:var(--surface); border:1px solid var(--border); text-align:center; transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;"
                )}
              >
                <t.Icon size={46} color={t.color} />
                <span style={s("font-size:15.5px; font-weight:700; color:var(--head); white-space:nowrap;")}>{t.name}</span>
              </div>
            ))}
          </div>
          <div className="ax-marquee-track" style={s("display:flex; gap:20px; width:max-content; animation:ax-marquee-r 34s linear infinite; padding:20px 10px 0;")}>
            {techLoopB.map((t, i) => (
              <div
                key={i}
                className="ax-lift ax-light-card"
                style={s(
                  "flex-shrink:0; display:flex; flex-direction:column; align-items:center; gap:16px; padding:34px 20px; border-radius:20px; background:var(--surface); border:1px solid var(--border); text-align:center; transition:transform .3s ease, border-color .3s ease, box-shadow .3s ease;"
                )}
              >
                <t.Icon size={46} color={t.color} />
                <span style={s("font-size:15.5px; font-weight:700; color:var(--head); white-space:nowrap;")}>{t.name}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== PORTFOLIO ===================== */}
      <PortfolioCarousel />

      {/* ===================== TESTIMONIALS ===================== */}
      <section className="ax-light-section ax-testimonials" style={s("padding:80px 32px;")}>
        <div style={s("max-width:1240px; margin:0 auto;")}>
          <div data-reveal="" style={s("text-align:center; max-width:660px; margin:0 auto 52px;")}>
            <div style={s("font-size:13px; font-weight:700; letter-spacing:.14em; color:var(--gold); text-transform:uppercase;")}>Testimonials</div>
            <h2 style={s("margin:14px 0 0; font-size:40px; font-weight:800; letter-spacing:-0.02em; color:var(--head);")}>What people say</h2>
          </div>
          <div className="ax-testimonials-grid" style={s("display:grid; grid-template-columns:repeat(3,1fr); gap:22px;")}>
            {testimonials.map((tm, i) => (
              <div key={i} data-reveal="" className="ax-light-card" style={s("display:flex; flex-direction:column; padding:28px; border-radius:20px; background:var(--surface); border:1px solid var(--border);")}>
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
      <section id="faq" style={s("padding:70px 32px; scroll-margin-top:80px;")}>
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
      <section id="contact" className="ax-light-section ax-contact-section" style={s("padding:80px 32px; scroll-margin-top:80px;")}>
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
                <a href="mailto:hello@appixotech.com" style={s("display:flex; align-items:center; gap:14px;")}>
                  <FaEnvelope size={19} color="var(--gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                  <div>
                    <div style={s("font-size:12.5px; color:var(--muted);")}>Email</div>
                    <div style={s("font-size:15px; font-weight:600; color:var(--head);")}>hello@appixotech.com</div>
                  </div>
                </a>
                <div style={s("display:flex; align-items:center; gap:14px;")}>
                  <FaMapMarkerAlt size={20} color="var(--gold)" style={{ flexShrink: 0 }} aria-hidden="true" />
                  <div>
                    <div style={s("font-size:12.5px; color:var(--muted); margin-bottom:3px;")}>Our location</div>
                    <div style={s("font-size:15px; font-weight:600; color:var(--head);")}>Noida, Uttar Pradesh, India</div>
                  </div>
                </div>
              </div>
            </div>
            <form onSubmit={onSubmit} style={s("display:flex; flex-direction:column; justify-content:center; gap:14px;")}>
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

      <Footer />
    </div>
  );
}
