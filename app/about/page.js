import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { s } from "@/lib/icons";
import { whys, stats } from "@/lib/siteData";

export const metadata = {
  title: "About Appixo — Global Product Engineering Partner",
  description: "Meet Appixo, a senior-led software product team helping international clients plan, design, build, launch, and improve digital products.",
};

const regions = ["United States", "United Kingdom", "Canada", "Australia", "UAE", "India", "Spain"];
const operatingPrinciples = [
  ["01", "Clarity before code", "We align goals, users, risks, scope, and technical direction before committing the team to a build."],
  ["02", "One accountable team", "Product, design, engineering, cloud, and QA work as one delivery unit—not a chain of disconnected vendors."],
  ["03", "Visible progress", "Short delivery cycles, working software, direct access to the team, and concise weekly updates keep decisions grounded."],
  ["04", "Continuity after launch", "We remain available for monitoring, iteration, performance work, and the next phase of the roadmap."],
];

export default function AboutPage() {
  return (
    <div id="appixo-root">
      <Nav />

      <header className="ax-about-hero">
        <img src="/media/about-global-delivery.png" alt="Global software delivery workspace" />
        <div className="ax-about-hero-shade" />
        <div className="ax-about-hero-copy ax-about-reveal">
          <div className="ax-about-kicker">About Appixo</div>
          <h1>A product engineering partner built for <span>ambitious teams everywhere.</span></h1>
          <p>We help startups and businesses turn complex ideas into dependable mobile, web, cloud, and AI products—with senior ownership and direct communication from discovery through support.</p>
          <div className="ax-about-actions">
            <Link href="/enquiry">Start a conversation →</Link>
            <Link href="/services">Explore our capabilities</Link>
          </div>
        </div>
      </header>

      <section className="ax-about-stats">
        <div className="ax-stats-grid">
          {stats.map((stat) => <div key={stat.label} className="ax-stat-card"><strong>{stat.n}{stat.suffix}</strong><span>{stat.label}</span></div>)}
        </div>
      </section>

      <section className="ax-about-global ax-light-section">
        <div className="ax-about-global-grid ax-about-reveal">
          <div>
            <div className="ax-about-kicker">International by design</div>
            <h2>Distance should not feel like distance.</h2>
          </div>
          <div>
            <p>Our delivery model is designed for international collaboration: overlapping working hours, documented decisions, predictable review points, and communication that does not disappear behind layers of account management.</p>
            <p>We adapt the cadence to your team while keeping ownership clear, so stakeholders always know what is moving, what needs a decision, and what comes next.</p>
          </div>
        </div>
        <div className="ax-about-regions" aria-label="Regions we serve">
          {regions.map((region) => <span key={region}>{region}</span>)}
        </div>
        <div className="ax-about-global-cards">
          <article><b>Overlap that works</b><p>Planned collaboration windows for reviews, decisions, and live working sessions across time zones.</p></article>
          <article><b>Written by default</b><p>Clear scopes, decisions, demos, and technical documentation reduce ambiguity between meetings.</p></article>
          <article><b>Direct team access</b><p>Speak with the people designing and building the product—not only a project coordinator.</p></article>
        </div>
      </section>

      <section className="ax-about-operating">
        <div className="ax-about-section-head ax-about-reveal"><div className="ax-about-kicker">How we operate</div><h2>Good delivery is a system, not a promise.</h2><p>These principles shape every engagement, whether we are validating an MVP or improving a live platform.</p></div>
        <div className="ax-about-principles">
          {operatingPrinciples.map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}
        </div>
      </section>

      <section className="ax-about-why ax-light-section">
        <div className="ax-about-section-head"><div className="ax-about-kicker">Why Appixo</div><h2>Engineering foundations that support growth.</h2></div>
        <div className="ax-whys-grid">
          {whys.map((item) => <article key={item.title}><div className="ax-about-why-icon">{item.icon}</div><div><h3>{item.title}</h3><p>{item.desc}</p></div></article>)}
        </div>
      </section>

      <section className="ax-about-cta">
        <div><div className="ax-about-kicker">Have a product in mind?</div><h2>Bring us the context. We&apos;ll bring a practical path forward.</h2></div>
        <Link href="/enquiry">Start your project →</Link>
      </section>

      <Footer />
    </div>
  );
}
