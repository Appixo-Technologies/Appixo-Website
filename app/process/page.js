import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiCheck } from "react-icons/fi";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Our Software Development Process — Appixo",
  description: "See how Appixo moves from product idea and research through design, development, testing, launch, and ongoing improvement.",
};

const phases = [
  { number:"01", title:"Idea and alignment", label:"Define the right problem", summary:"We turn initial context into a shared product direction before scope or technology hardens around assumptions.", deliverables:["Business and user goals","Success measures","Constraints and decision owners"], image:"/media/why-fast-development.png" },
  { number:"02", title:"Research and discovery", label:"Replace assumptions with evidence", summary:"Stakeholder insight, user needs, market context, existing systems, and technical risks shape a realistic path forward.", deliverables:["Discovery findings","Risk and dependency map","Prioritized opportunity areas"], image:"/media/why-secure-architecture.png" },
  { number:"03", title:"Experience design", label:"Make the product understandable", summary:"We model journeys, information, interactions, and visual foundations—testing important decisions before engineering cost increases.", deliverables:["User flows and wireframes","Interactive prototypes","Scalable UI foundations"], image:"/media/services-design.png" },
  { number:"04", title:"Product engineering", label:"Build in visible increments", summary:"The team develops small, production-ready slices with continuous review, clear ownership, and architecture that supports the roadmap.", deliverables:["Working product increments","Documented technical decisions","Reviewable delivery cadence"], image:"/media/development-services.png" },
  { number:"05", title:"Quality engineering", label:"Protect critical journeys", summary:"Quality is built into delivery through automated checks, structured reviews, real-device validation, and focused non-functional testing.", deliverables:["Functional and integration coverage","Performance and security review","Release-readiness evidence"], image:"/media/why-high-performance.png" },
  { number:"06", title:"Launch and transition", label:"Release with control", summary:"We prepare production environments, observability, data, rollout decisions, documentation, and stakeholder readiness for go-live.", deliverables:["Controlled deployment plan","Monitoring and response setup","Team and operational handover"], image:"/media/services-cloud.png" },
  { number:"07", title:"Measure and improve", label:"Keep the product moving", summary:"Usage, reliability, feedback, and roadmap priorities inform a focused cycle of optimization, support, and new capability.", deliverables:["Product health reviews","Prioritized improvement backlog","Ongoing engineering support"], image:"/media/why-scalable-products.png" },
];

export default function ProcessPage() {
  return <div id="appixo-root" className="ax-process-page">
    <Nav />
    <header className="ax-process-page-hero">
      <img src="/media/process-development-hero.png" alt="Software product process from strategy and design through engineering, cloud release, and growth" />
      <div className="ax-process-page-shade" />
      <div className="ax-process-page-hero-copy">
        <div className="ax-page-kicker">How we work</div>
        <h1>Clarity at every stage. <span>Momentum all the way through.</span></h1>
        <p>A senior, cross-functional delivery model that keeps product, design, engineering, quality, and business decisions connected.</p>
        <a href="#phases">Explore the process <FiArrowDown /></a>
      </div>
    </header>

    <section className="ax-process-principles">
      <article><span>01</span><h2>One accountable team</h2><p>The people making product and technical decisions work together throughout delivery.</p></article>
      <article><span>02</span><h2>Working software early</h2><p>Frequent, reviewable increments keep progress real and feedback useful.</p></article>
      <article><span>03</span><h2>Decisions stay visible</h2><p>Scope, risks, tradeoffs, and next actions are documented and easy to follow.</p></article>
      <article><span>04</span><h2>Quality throughout</h2><p>Security, performance, accessibility, and maintainability are continuous concerns.</p></article>
    </section>

    <main id="phases" className="ax-process-phases">
      <div className="ax-process-page-intro"><div className="ax-page-kicker">Seven connected phases</div><h2>A path that adapts without losing control.</h2><p>The activities change with product maturity, but the principles remain consistent: evidence before commitment, visible progress, and deliberate release decisions.</p></div>
      {phases.map((phase,index) => <article className="ax-process-phase" key={phase.number}>
        <div className="ax-process-phase-image"><img src={phase.image} alt="" loading="lazy" /></div>
        <div className="ax-process-phase-copy">
          <div className="ax-process-phase-number">{phase.number} / 07</div>
          <span>{phase.label}</span><h2>{phase.title}</h2><p>{phase.summary}</p>
          <div className="ax-process-deliverables"><b>What this stage produces</b>{phase.deliverables.map(item => <div key={item}><FiCheck />{item}</div>)}</div>
        </div>
        {index < phases.length - 1 && <i className="ax-process-continuation" aria-hidden="true" />}
      </article>)}
    </main>

    <section className="ax-process-collaboration"><div><div className="ax-page-kicker">Built for international teams</div><h2>Direct communication. Documented decisions. Predictable reviews.</h2></div><p>We establish overlap hours, a concise weekly rhythm, clear decision owners, and demonstrations of working software—so distance never becomes ambiguity.</p></section>
    <section className="ax-process-page-cta"><div><div className="ax-page-kicker">Start with context</div><h2>Tell us where the product is today. We&apos;ll define the most useful next step.</h2></div><Link href="/enquiry">Plan your project <FiArrowUpRight /></Link></section>
    <Footer />
  </div>;
}
