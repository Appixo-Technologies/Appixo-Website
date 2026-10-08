"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { s, ic } from "@/lib/icons";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import PortfolioCarousel from "@/components/PortfolioCarousel";
import TechStack from "@/components/TechStack";
import { FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";
import {
  FiActivity,
  FiCompass,
  FiEdit3,
  FiFlag,
  FiSearch,
  FiTool,
  FiMessageSquare,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiLock,
} from "react-icons/fi";

const PROJECT_TOPICS = [
  "Mobile App",
  "Web Platform",
  "AI & ML",
  "Cloud & DevOps",
  "Custom Software",
  "Other",
];

export default function Home() {
  const [submitLabel, setSubmitLabel] = useState("Send message");
  const [submitting, setSubmitting] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState("Mobile App");
  const [activeProcess, setActiveProcess] = useState(2);
  const [processPaused, setProcessPaused] = useState(false);
  const processModulesRef = useRef(null);

  const resetLabelAfter = (ms) => {
    setTimeout(() => setSubmitLabel("Send message"), ms);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    const form = e.target;
    const data = new FormData(form);
    const userMsg = (data.get("message") || "").toString().trim();
    const finalMsg = selectedTopic
      ? `[Project Interest: ${selectedTopic}]\n${userMsg}`
      : userMsg;

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      message: finalMsg,
    };

    setSubmitting(true);
    setSubmitLabel("Sending message...");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Failed to send message.");

      setSubmitLabel("Message sent successfully ✓");
      form.reset();
      resetLabelAfter(3000);
    } catch (err) {
      setSubmitLabel(err.message || "Failed to send — please try again");
      resetLabelAfter(3500);
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
    { title: "Fast Development", image: "/media/why-fast-development.jpg", lead: "Move from decision to working software without sacrificing engineering discipline.", body: "We reduce waiting and rework through small releases, early technical validation, reusable foundations, and short feedback loops with the people who make decisions.", points: ["Short, visible delivery cycles", "Early prototypes and technical validation", "Production-ready increments—not demo-only work"] },
    { title: "Secure Architecture", image: "/media/why-secure-architecture.jpg", lead: "Security is an architecture input, not a checklist before launch.", body: "Access, data handling, dependencies, environments, and failure paths are considered from the start so security grows with the product instead of becoming an expensive retrofit.", points: ["Least-privilege access patterns", "Secure API and data boundaries", "Dependency and environment controls"] },
    { title: "Cloud Ready", image: "/media/why-cloud-ready.jpg", lead: "Infrastructure designed for reliability, visibility, and sensible cost.", body: "We build deployable environments, automated delivery paths, monitoring, and recovery considerations around your real workload—then evolve capacity as usage grows.", points: ["Repeatable cloud environments", "Monitoring and operational visibility", "Cost-aware scaling decisions"] },
    { title: "Cross Platform", image: "/media/why-cross-platform.jpg", lead: "One product experience, thoughtfully adapted to every screen.", body: "Shared systems and reusable foundations keep behavior consistent across web, iOS, and Android while leaving room for the interaction patterns each platform expects.", points: ["Consistent design foundations", "Shared logic where it creates value", "Platform-aware interactions"] },
    { title: "High Performance", image: "/media/why-high-performance.jpg", lead: "Speed is engineered through the entire system—not patched into the interface.", body: "We profile critical journeys, control payloads, choose sensible rendering and caching strategies, and monitor production behavior so performance remains measurable.", points: ["Performance budgets for key journeys", "Efficient rendering, APIs, and data access", "Production monitoring and iteration"] },
    { title: "Scalable Products", image: "/media/why-scalable-products.jpg", lead: "A foundation that can accept new users, workflows, and integrations cleanly.", body: "Modular architecture, clear contracts, documented decisions, and maintainable code help the product expand without forcing a rewrite every time the roadmap changes.", points: ["Modular product architecture", "Clear service and integration boundaries", "Documentation for long-term ownership"] },
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

  useEffect(() => {
    const modules = processModulesRef.current;
    if (!modules || !window.matchMedia("(max-width: 760px)").matches) return;

    const activeModule = modules.children[activeProcess];
    if (!activeModule) return;

    const centeredLeft = activeModule.offsetLeft - (modules.clientWidth - activeModule.offsetWidth) / 2;
    modules.scrollTo({ left: centeredLeft, behavior: "smooth" });
  }, [activeProcess]);

  return (
    <div id="appixo-root">
      <Nav />

      {/* ===================== HERO ===================== */}
      <header id="top" className="ax-hero" style={s("position:relative; min-height:100vh; display:flex; align-items:flex-end; overflow:hidden;")}>
        <img
          className="ax-hero-bg"
          src="/media/hero-product-studio.jpg"
          alt=""
          fetchPriority="high"
          decoding="async"
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
                <div className="ax-why-image"><img src={item.image} alt={`${item.title} engineering concept`} loading="lazy" decoding="async" width={768} height={512} /></div>
                <div className="ax-why-copy">
                  <span>{String(index + 1).padStart(2, "0")} / {String(whyDetails.length).padStart(2, "0")}</span>
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
            <div ref={processModulesRef} className="ax-process-modules" role="tablist" aria-label="Development process steps">
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
            <Link className="ax-process-full-link" href="/process" prefetch={true}>Explore our complete delivery process →</Link>
          </div>
        </div>
      </section>

      {/* ===================== TECHNOLOGIES ===================== */}
      <TechStack />

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
      <section id="contact" className="ax-fresh-contact-section">
        <div data-reveal="" className="ax-fresh-contact-shell">
          <div className="ax-fresh-contact-grid">
            {/* Left Column: Executive Value & Direct Channels */}
            <div className="ax-fresh-contact-left">
              <div className="ax-fresh-contact-badge">
                <span className="ax-fresh-status-dot" aria-hidden="true" />
                <span>Accepting New Projects • 24h Response</span>
              </div>

              <h2 className="ax-fresh-contact-title">
                Let&apos;s build something <span className="ax-fresh-gold-gradient">amazing.</span>
              </h2>
              <p className="ax-fresh-contact-desc">
                Have a new product, custom platform, or enterprise migration in mind? Share your goals with our engineering leads and receive an actionable scoping roadmap within 24 hours.
              </p>

              <div className="ax-fresh-channels">
                <a
                  href="mailto:hello@appixotech.com"
                  className="ax-fresh-channel-card"
                  aria-label="Send direct email to hello@appixotech.com"
                >
                  <div className="ax-fresh-channel-icon">
                    <FaEnvelope aria-hidden="true" />
                  </div>
                  <div className="ax-fresh-channel-body">
                    <span className="ax-fresh-channel-label">Direct Engineering Desk</span>
                    <span className="ax-fresh-channel-val">hello@appixotech.com</span>
                    <span className="ax-fresh-channel-sub">Guaranteed response within 1 business day</span>
                  </div>
                  <FiArrowUpRight className="ax-fresh-channel-arrow" aria-hidden="true" />
                </a>

                <div className="ax-fresh-channel-card">
                  <div className="ax-fresh-channel-icon">
                    <FaMapMarkerAlt aria-hidden="true" />
                  </div>
                  <div className="ax-fresh-channel-body">
                    <span className="ax-fresh-channel-label">Global Delivery Hub</span>
                    <span className="ax-fresh-channel-val">Noida, Uttar Pradesh, India</span>
                    <span className="ax-fresh-channel-sub">Serving clients worldwide (EST, GMT, IST)</span>
                  </div>
                </div>
              </div>

              <div className="ax-fresh-trust-row">
                <span className="ax-fresh-trust-pill">
                  <FiClock className="ax-fresh-trust-icon" aria-hidden="true" />
                  <span>24h Response SLA</span>
                </span>
                <span className="ax-fresh-trust-pill">
                  <FiLock className="ax-fresh-trust-icon" aria-hidden="true" />
                  <span>Strict NDA Protected</span>
                </span>
                <span className="ax-fresh-trust-pill">
                  <FiCheckCircle className="ax-fresh-trust-icon" aria-hidden="true" />
                  <span>Senior Engineering Leads</span>
                </span>
              </div>
            </div>

            {/* Right Column: Clean, Modern Form */}
            <div className="ax-fresh-contact-right">
              <form onSubmit={onSubmit} className="ax-fresh-form">
                <div className="ax-fresh-topic-picker">
                  <label className="ax-fresh-topic-label">What are you looking to build?</label>
                  <div className="ax-fresh-topic-chips" role="radiogroup" aria-label="Project Type">
                    {PROJECT_TOPICS.map((topic) => {
                      const isSelected = selectedTopic === topic;
                      return (
                        <button
                          key={topic}
                          type="button"
                          role="radio"
                          aria-checked={isSelected}
                          className={`ax-fresh-topic-btn ${isSelected ? "is-selected" : ""}`}
                          onClick={() => setSelectedTopic(topic)}
                        >
                          {topic}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <div className="ax-fresh-field-wrap">
                  <label htmlFor="contact-name" className="ax-fresh-label">Your Name</label>
                  <input
                    id="contact-name"
                    required
                    name="name"
                    placeholder="e.g. Alex Morgan"
                    disabled={submitting}
                    className="ax-fresh-input"
                  />
                </div>

                <div className="ax-fresh-field-wrap">
                  <label htmlFor="contact-email" className="ax-fresh-label">Work Email</label>
                  <input
                    id="contact-email"
                    required
                    name="email"
                    type="email"
                    placeholder="alex@company.com"
                    disabled={submitting}
                    className="ax-fresh-input"
                  />
                </div>

                <div className="ax-fresh-field-wrap">
                  <label htmlFor="contact-message" className="ax-fresh-label">Project Overview</label>
                  <textarea
                    id="contact-message"
                    required
                    name="message"
                    rows={4}
                    placeholder="Tell us about your timeline, tech requirements, or goals..."
                    disabled={submitting}
                    className="ax-fresh-textarea"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="ax-fresh-submit-btn"
                >
                  <span>{submitLabel}</span>
                  <FiArrowRight className="ax-fresh-submit-arrow" aria-hidden="true" />
                </button>

                <div className="ax-fresh-assurance">
                  <FiLock size={12} aria-hidden="true" />
                  <span>No spam. Your information is 100% confidential under NDA.</span>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
