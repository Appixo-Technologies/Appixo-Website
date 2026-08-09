"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { s, svgSpan } from "@/lib/icons";

const arrow = svgSpan('<svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7M7 7h10v10"/></svg>');
const up = svgSpan('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m18 15-6-6-6 6"/></svg>');
const down = svgSpan('<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m6 9 6 6 6-6"/></svg>');

const slides = [
  { title:"Application Development", eyebrow:"Ship applications people keep using.", desc:"Native, cross-platform, and web products backed by clean architecture and dependable release practices.", image:"/media/development-services.png", links:[["Mobile App Development","/services/mobile-app-development"],["Web App Development","/services/web-development"],["Custom Software","/services/custom-software"],["API Development","/services/api-integration"]] },
  { title:"Consulting Services", eyebrow:"Plan before you build.", desc:"Product strategy, technical discovery, and architecture decisions grounded in your goals, budget, and timeline.", image:"/media/services-ai.png", links:[["Product Consulting","/services/custom-software"],["Technical Discovery","/services/web-development"],["Architecture Planning","/services/cloud-solutions"],["Integration Strategy","/services/api-integration"]] },
  { title:"UI/UX Design", eyebrow:"Design decisions that survive contact with engineering.", desc:"Research-backed interfaces and reusable design systems built to stay consistent as your product grows.", image:"/media/services-design.png", links:[["UI/UX Design","/services/ui-ux-design"],["Product Design","/services/product-design"],["Design Systems","/services/ui-ux-design"],["Brand Identity","/services/branding"]] },
  { title:"Cloud Engineering", eyebrow:"Infrastructure ready for real growth.", desc:"Secure, cost-aware cloud platforms, migrations, and delivery pipelines designed around your actual workload.", image:"/media/services-cloud.png", links:[["Cloud Solutions","/services/cloud-solutions"],["Cloud Migration","/services/cloud-solutions"],["DevOps Automation","/services/devops"],["API Integration","/services/api-integration"]] },
  { title:"Data & AI", eyebrow:"Practical intelligence, connected to your workflow.", desc:"AI features and automation that solve measurable business problems without adding unnecessary complexity.", image:"/media/services-data-ai-team.png", links:[["AI Solutions","/services/ai-solutions"],["Workflow Automation","/services/ai-solutions"],["Intelligent Integrations","/services/api-integration"],["Custom Platforms","/services/custom-software"]] },
  { title:"Quality Engineering", eyebrow:"Confidence in every release.", desc:"Structured testing, performance checks, and release safeguards that catch issues before your customers do.", image:"/media/services-quality-engineering-team.png", links:[["Product Testing","/services/maintenance"],["Performance Review","/services/maintenance"],["Release Readiness","/services/devops"],["Codebase Review","/services/custom-software"]] },
  { title:"DevOps & Platform Engineering", eyebrow:"Release faster without losing control.", desc:"Automated delivery, observable infrastructure, and repeatable environments that make shipping routine.", image:"/media/services-devops-team.png", links:[["DevOps","/services/devops"],["CI/CD Pipelines","/services/devops"],["Cloud Infrastructure","/services/cloud-solutions"],["System Integrations","/services/api-integration"]] },
  { title:"Managed Support", eyebrow:"A dependable team after launch.", desc:"Ongoing monitoring, maintenance, improvements, and technical support for products already in production.", image:"/media/services-managed-support-team.png", links:[["Maintenance","/services/maintenance"],["Performance Optimization","/services/maintenance"],["Feature Development","/services/custom-software"],["Cloud Support","/services/cloud-solutions"]] },
];

export default function ServicesShowcase() {
  const [active, setActive] = useState(0);
  const [showNav, setShowNav] = useState(false);
  const refs = useRef([]);
  const endRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        entry.target.classList.toggle("is-visible", entry.isIntersecting);
        if (entry.isIntersecting) { setActive(Number(entry.target.dataset.index)); setShowNav(true); }
      });
    }, { threshold:.3 });
    refs.current.filter(Boolean).forEach((node) => observer.observe(node));
    const endObserver = new IntersectionObserver(([entry]) => setShowNav(!entry.isIntersecting));
    if (endRef.current) endObserver.observe(endRef.current);
    return () => { observer.disconnect(); endObserver.disconnect(); };
  }, []);

  const go = (index) => refs.current[index]?.scrollIntoView({ block:"start" });

  return (
    <div className="ax-service-story">
      <header className="ax-services-intro">
        <div className="ax-services-intro-bg" />
        <div className="ax-services-intro-inner">
          <div className="ax-services-intro-copy">
            <div className="ax-services-kicker">From first decision to long-term growth</div>
            <h1>Plan it. Build it.<br /><span>Make it matter.</span></h1>
            <p>Strategy, product design, engineering, cloud, and ongoing support—one accountable team from discovery through production.</p>
            <div className="ax-services-intro-actions">
              <Link href="/enquiry">Start a conversation {arrow}</Link>
              <a href="#service-portfolio">Explore our services</a>
            </div>
          </div>
          <div className="ax-services-path" aria-label="Our delivery path">
            {[
              ["01","Plan","Clarify the opportunity, risks, scope, and technical direction."],
              ["02","Design","Shape flows and interfaces around real user behavior."],
              ["03","Build","Engineer, test, and release a dependable production product."],
              ["04","Grow","Monitor, improve, and scale what works after launch."],
            ].map(([number,title,copy]) => (
              <div className="ax-services-path-card" key={title}>
                <span>{number}</span><div><h2>{title}</h2><p>{copy}</p></div>
              </div>
            ))}
          </div>
        </div>
        <a className="ax-services-scroll" href="#service-portfolio"><span /> Scroll to explore</a>
      </header>

      <div id="service-portfolio" style={{ position:"absolute", top:"100svh" }} />
      {slides.map((slide, index) => (
        <section
          key={slide.title}
          ref={(node) => (refs.current[index] = node)}
          data-index={index}
          className="ax-service-slide"
          style={{ backgroundImage: `url("${slide.image}")` }}
        >
          <div className="ax-service-shade" />
          <article className="ax-service-panel">
            <div className="ax-service-count">{String(index + 1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</div>
            <h1>{slide.title}</h1>
            <p className="ax-service-eyebrow">{slide.eyebrow}</p>
            <p className="ax-service-desc">{slide.desc}</p>
            <div className="ax-service-panel-links">
              {slide.links.map(([label, href]) => <Link key={label} href={href}>{label}{arrow}</Link>)}
            </div>
            <div className="ax-service-actions">
              <Link href="/case-studies" className="ax-service-primary">See Similar Builds</Link>
              <Link href="/enquiry" className="ax-service-secondary">Request a Consultation</Link>
            </div>
          </article>
        </section>
      ))}
      <div ref={endRef} style={{ height:1 }} />

      {showNav && <><Link href="/enquiry" className="ax-all-services">☰ Discuss a Service</Link>
      <div className="ax-service-dock">
        <span>{slides[active].title}</span><b>{String(active + 1).padStart(2,"0")} / {String(slides.length).padStart(2,"0")}</b>
        <button onClick={() => go(Math.max(0,active - 1))} disabled={active === 0} aria-label="Previous service">{up}</button>
        <button onClick={() => go(Math.min(slides.length - 1,active + 1))} disabled={active === slides.length - 1} aria-label="Next service">{down}</button>
      </div>
      </>}
    </div>
  );
}
