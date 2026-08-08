import Link from "next/link";
import { FiArrowUpRight, FiCheckCircle } from "react-icons/fi";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Software Product Case Studies — Appixo",
  description: "Explore mobile, web, AI, healthcare, logistics, finance, and learning products designed and engineered by Appixo.",
};

const projects = [
  { name:"Clinic Click", industry:"Healthcare", type:"Patient and clinic platform", image:"/portfolio/clinic-click.svg", href:"/products/clinic-click", intro:"A patient-first product that removes friction from discovering clinics, booking care, and managing everyday operations.", outcomes:["Simpler appointment journeys","Connected clinic workflows","A foundation ready for new locations"], theme:"navy" },
  { name:"RaktConnect", industry:"Social impact", type:"Real-time donor network", image:"/portfolio/raktconnect.svg", href:"/products/raktconnect", intro:"A location-aware platform designed to connect urgent blood requests with eligible donors and community partners quickly.", outcomes:["Faster donor discovery","Clear emergency request flows","Community-ready coordination"], theme:"red" },
  { name:"Future AI", industry:"Artificial intelligence", type:"Decision intelligence product", image:"/portfolio/future-ai-product.svg", href:"/products/future-ai-product", intro:"An evolving AI platform concept that turns complex information into guided decisions, automations, and clear next actions.", outcomes:["Context-aware recommendations","Human-readable AI outputs","Modular automation foundation"], theme:"violet" },
  { name:"FleetFlow", industry:"Logistics", type:"Fleet intelligence platform", image:"/media/portfolio-fleetflow.png", href:"/enquiry", intro:"A unified operations workspace for route visibility, live vehicle signals, delivery performance, and actionable alerts.", outcomes:["Unified fleet visibility","Operational exception alerts","Decision-ready route analytics"], theme:"amber" },
  { name:"NexaPay", industry:"Financial technology", type:"Financial operations workspace", image:"/media/portfolio-nexapay.png", href:"/enquiry", intro:"A secure product experience bringing transactions, approvals, cash-flow insight, and payment operations into one coherent system.", outcomes:["Connected payment operations","Clear approval journeys","Real-time financial visibility"], theme:"blue" },
  { name:"LearnLoop", industry:"Learning technology", type:"Workforce learning platform", image:"/media/portfolio-learnloop.png", href:"/enquiry", intro:"An intelligent learning experience for tailored pathways, content delivery, skills visibility, and measurable workforce progress.", outcomes:["Personalized learning paths","Visible skill progression","Reusable course delivery system"], theme:"plum" },
];

export default function CaseStudiesPage() {
  return <div id="appixo-root" className="ax-cases-page">
    <Nav />
    <header className="ax-cases-hero">
      <div className="ax-cases-hero-glow" />
      <div className="ax-cases-hero-inner">
        <div className="ax-page-kicker">Case studies</div>
        <h1>Products shaped around <span>real outcomes.</span></h1>
        <p>Selected mobile, web, cloud, and AI work across industries where reliability, clarity, and thoughtful product decisions matter.</p>
        <div className="ax-cases-proof"><span>Strategy</span><span>Product design</span><span>Engineering</span><span>Cloud and release</span></div>
      </div>
    </header>

    <main className="ax-cases-list">
      {projects.map((project,index) => <article className={`ax-cases-project ax-cases-${project.theme}`} key={project.name}>
        <div className="ax-cases-visual"><img src={project.image} alt={`${project.name} ${project.type}`} /></div>
        <div className="ax-cases-copy">
          <div className="ax-cases-meta"><span>{String(index + 1).padStart(2,"0")} / {String(projects.length).padStart(2,"0")}</span><b>{project.industry}</b></div>
          <h2>{project.name}</h2>
          <h3>{project.type}</h3>
          <p>{project.intro}</p>
          <ul>{project.outcomes.map(outcome => <li key={outcome}><FiCheckCircle />{outcome}</li>)}</ul>
          <Link href={project.href}>{index < 3 ? "View product story" : "Discuss a similar product"}<FiArrowUpRight /></Link>
        </div>
      </article>)}
    </main>

    <section className="ax-cases-cta"><div><div className="ax-page-kicker">Your product could be next</div><h2>Have a complex idea that needs a practical delivery team?</h2></div><Link href="/enquiry">Start a project <FiArrowUpRight /></Link></section>
    <Footer />
  </div>;
}
