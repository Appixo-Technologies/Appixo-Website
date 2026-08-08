"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { FiArrowLeft, FiArrowRight, FiCheck, FiTrendingUp } from "react-icons/fi";

const projects = [
  { name:"Clinic Click", sector:"Healthcare platform", summary:"A patient-first appointment and clinic operations platform that makes finding care, booking visits, and managing schedules effortless.", image:"/portfolio/clinic-click.svg", href:"/products/clinic-click", tone:"gold", metrics:["Faster appointment booking","Simplified clinic operations"] },
  { name:"RaktConnect", sector:"Social impact network", summary:"A real-time blood donation network connecting urgent requests with eligible nearby donors and community organizations.", image:"/portfolio/raktconnect.svg", href:"/products/raktconnect", tone:"red", metrics:["Location-aware donor matching","Emergency response workflows"] },
  { name:"Future AI", sector:"AI product platform", summary:"An intelligent product concept that transforms complex data into guided decisions, automations, and useful next actions.", image:"/portfolio/future-ai-product.svg", href:"/products/future-ai-product", tone:"violet", metrics:["Context-aware recommendations","Explainable workflow automation"] },
  { name:"FleetFlow", sector:"Logistics intelligence", summary:"A unified fleet command platform for route visibility, live vehicle telemetry, operational alerts, and delivery performance.", image:"/media/portfolio-fleetflow.png", href:"/enquiry", tone:"amber", metrics:["Live route and fleet visibility","Actionable delivery analytics"] },
  { name:"NexaPay", sector:"Financial operations", summary:"A secure finance workspace that brings transactions, cash-flow intelligence, approvals, and payment operations into one system.", image:"/media/portfolio-nexapay.png", href:"/enquiry", tone:"blue", metrics:["Unified payment operations","Real-time financial insights"] },
  { name:"LearnLoop", sector:"Learning technology", summary:"An intelligent learning platform for tailored course pathways, skills visibility, training delivery, and workforce progress.", image:"/media/portfolio-learnloop.png", href:"/enquiry", tone:"plum", metrics:["Personalized learning pathways","Measurable skill progression"] },
];

export default function PortfolioCarousel() {
  const trackRef = useRef(null);
  const dragging = useRef({ active:false, x:0, left:0 });
  const touchStartX = useRef(null);
  const normalizeTimer = useRef(null);
  const [active, setActive] = useState(1);
  const [activeDom, setActiveDom] = useState(2);

  const centerCard = (card, behavior = "smooth") => {
    const track = trackRef.current;
    if (!track || !card) return;
    track.scrollTo({ left:card.offsetLeft - (track.clientWidth - card.offsetWidth) / 2, behavior });
  };

  const goTo = (index) => {
    const next = (index + projects.length) % projects.length;
    const domIndex = index >= projects.length ? projects.length + 1 : index < 0 ? 0 : index + 1;
    const card = trackRef.current?.children[domIndex];
    centerCard(card);
    setActive(next);
    setActiveDom(domIndex);
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const initialCard = track.children[2];
    if (initialCard) {
      track.scrollLeft = initialCard.offsetLeft - (track.clientWidth - initialCard.offsetWidth) / 2;
    }
    let frame;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const center = track.scrollLeft + track.clientWidth / 2;
        let closest = 0;
        let distance = Infinity;
        let closestCard = null;
        let closestDom = 0;
        [...track.children].forEach((card,domIndex) => {
          const delta = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
          if (delta < distance) { distance = delta; closestCard = card; closestDom = domIndex; }
        });
        if (!closestCard) return;
        closest = Number(closestCard.dataset.projectIndex);
        setActive(closest);
        setActiveDom(closestDom);
        window.clearTimeout(normalizeTimer.current);
        if (closestCard.dataset.clone === "first") {
          normalizeTimer.current = window.setTimeout(() => { centerCard(track.children[1], "auto"); setActiveDom(1); }, 180);
        } else if (closestCard.dataset.clone === "last") {
          normalizeTimer.current = window.setTimeout(() => { centerCard(track.children[projects.length], "auto"); setActiveDom(projects.length); }, 180);
        }
      });
    };
    track.addEventListener("scroll", update, { passive:true });
    update();
    return () => { track.removeEventListener("scroll", update); cancelAnimationFrame(frame); window.clearTimeout(normalizeTimer.current); };
  }, []);

  const onWheel = (event) => {
    if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const track = trackRef.current;
    const atEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 3;
    const atStart = track.scrollLeft <= 3;
    if (event.deltaY > 0 && atEnd) { goTo(0); return; }
    if (event.deltaY < 0 && atStart) { goTo(projects.length - 1); return; }
    trackRef.current.scrollLeft += event.deltaY;
  };
  const onPointerDown = (event) => {
    if (event.pointerType === "touch") return;
    dragging.current = { active:true, x:event.clientX, left:trackRef.current.scrollLeft };
    trackRef.current.setPointerCapture(event.pointerId);
    trackRef.current.classList.add("is-dragging");
  };
  const onPointerMove = (event) => {
    if (!dragging.current.active) return;
    trackRef.current.scrollLeft = dragging.current.left - (event.clientX - dragging.current.x) * 1.15;
  };
  const stopDrag = (event) => {
    if (dragging.current.active && typeof event?.clientX === "number") {
      const distance = event.clientX - dragging.current.x;
      if (active === projects.length - 1 && distance < -45) goTo(0);
      if (active === 0 && distance > 45) goTo(projects.length - 1);
    }
    dragging.current.active = false;
    trackRef.current?.classList.remove("is-dragging");
  };
  const onTouchStart = (event) => { touchStartX.current = event.touches[0]?.clientX ?? null; };
  const onTouchEnd = (event) => {
    if (touchStartX.current === null) return;
    const distance = (event.changedTouches[0]?.clientX ?? touchStartX.current) - touchStartX.current;
    if (active === projects.length - 1 && distance < -45) goTo(0);
    if (active === 0 && distance > 45) goTo(projects.length - 1);
    touchStartX.current = null;
  };

  return (
    <section id="portfolio" className="ax-portfolio-showcase">
      <div className="ax-portfolio-head">
        <div><span>Selected work</span><h2>Products built to make an impact.</h2></div>
        <p>Explore platforms we have designed and engineered across healthcare, social impact, AI, logistics, finance, and learning.</p>
      </div>

      <div className="ax-portfolio-tabs-wrap">
        <button onClick={() => goTo(active - 1)} aria-label="Previous project"><FiArrowLeft /></button>
        <div className="ax-portfolio-tabs" role="tablist" aria-label="Portfolio projects">
          {projects.map((project,index) => <button key={project.name} className={index === active ? "is-active" : ""} onClick={() => goTo(index)} role="tab" aria-selected={index === active}>{project.name}</button>)}
        </div>
        <button onClick={() => goTo(active + 1)} aria-label="Next project"><FiArrowRight /></button>
      </div>

      <div
        ref={trackRef}
        className="ax-portfolio-track"
        onWheel={onWheel}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={stopDrag}
        onPointerCancel={stopDrag}
        onPointerLeave={stopDrag}
        onTouchStart={onTouchStart}
        onTouchEnd={onTouchEnd}
      >
        {[projects.at(-1), ...projects, projects[0]].map((project,domIndex) => {
          const index = domIndex === 0 ? projects.length - 1 : domIndex === projects.length + 1 ? 0 : domIndex - 1;
          const clone = domIndex === 0 ? "last" : domIndex === projects.length + 1 ? "first" : "";
          const position = domIndex - activeDom;
          return (
          <article data-project-index={index} data-clone={clone} className={`ax-case-card ax-case-${project.tone} ${position === 0 ? "is-active" : position < 0 ? "is-before" : "is-after"} ${Math.abs(position) === 1 ? "is-near" : "is-far"}`} key={`${project.name}-${domIndex}`} aria-hidden={Boolean(clone)}>
            <div className="ax-case-copy">
              <div className="ax-case-top"><span>{String(index + 1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span><Link href={project.href}>View case study <FiArrowRight /></Link></div>
              <p className="ax-case-sector">{project.sector}</p>
              <h3>{project.name}</h3>
              <p className="ax-case-summary">{project.summary}</p>
              <div className="ax-case-metrics">
                <div><FiCheck /><span>{project.metrics[0]}</span></div>
                <div><FiTrendingUp /><span>{project.metrics[1]}</span></div>
              </div>
            </div>
            <div className="ax-case-visual"><img src={project.image} alt={`${project.name} product case study`} loading="lazy" draggable="false" /></div>
          </article>
          );
        })}
      </div>
      <div className="ax-portfolio-mobile-hint"><span>Swipe to explore</span><b>{String(active + 1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</b></div>
    </section>
  );
}
