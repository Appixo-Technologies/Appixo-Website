import Link from "next/link";
import { FiArrowDown, FiArrowUpRight, FiBookOpen, FiCheck, FiCode, FiGlobe, FiMail, FiMessageSquare, FiUsers } from "react-icons/fi";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata = {
  title: "Careers at Appixo — Build Products That Matter",
  description: "Join Appixo's product, design, and engineering team. Work on meaningful software with senior ownership, direct communication, and room to grow.",
};

const values = [
  { Icon:FiCode, number:"01", title:"Craft with purpose", copy:"We care about the reasoning behind the work—not only closing a ticket. Product quality, maintainability, and user outcomes matter." },
  { Icon:FiMessageSquare, number:"02", title:"Communicate clearly", copy:"Good remote collaboration depends on thoughtful writing, honest status, useful questions, and decisions everyone can find." },
  { Icon:FiUsers, number:"03", title:"Own outcomes together", copy:"Design, engineering, product, QA, and cloud work as one team. Responsibility is shared, and expertise is respected." },
  { Icon:FiBookOpen, number:"04", title:"Keep learning", copy:"We make room for research, feedback, experimentation, and the deeper technical work that strengthens future decisions." },
];

const benefits = [
  ["Meaningful product work","Build healthcare, social-impact, business, and AI products used in real situations."],
  ["Senior team access","Work directly with experienced product and engineering people—without unnecessary hierarchy."],
  ["Focused ownership","Take responsibility for coherent product areas instead of disconnected micro-tasks."],
  ["Flexible collaboration","A delivery rhythm designed around trust, clear overlap hours, and documented decisions."],
  ["Visible growth","Regular feedback and opportunities to broaden your product, technical, and leadership range."],
  ["Modern engineering","Practical tools, maintainable systems, automated delivery, and quality built into the workflow."],
];

const hiring = [
  ["01","Introduction","A focused conversation about your experience, interests, and the kind of work you want to do."],
  ["02","Working discussion","A practical review of how you think through a relevant product, design, or engineering problem."],
  ["03","Team conversation","Meet people you would collaborate with and understand expectations on both sides."],
  ["04","Clear decision","We share direct feedback, role context, and next steps without unnecessary rounds."],
];

export default function CareersPage() {
  return <div id="appixo-root" className="ax-careers-page">
    <Nav />

    <header className="ax-careers-hero">
      <img src="/media/careers-team-hero.png" alt="Product designers and software engineers collaborating at Appixo" />
      <div className="ax-careers-hero-shade" />
      <div className="ax-careers-hero-copy">
        <div className="ax-page-kicker">Careers at Appixo</div>
        <h1>Do work you&apos;re proud to <span>put your name on.</span></h1>
        <p>Join a focused product team where thoughtful decisions, dependable engineering, and direct collaboration matter more than titles or theatre.</p>
        <div className="ax-careers-actions"><a href="#opportunities">Explore opportunities <FiArrowDown /></a><Link href="/about">Meet Appixo <FiArrowUpRight /></Link></div>
      </div>
    </header>

    <section className="ax-careers-intro">
      <div><div className="ax-page-kicker">How we work together</div><h2>Small enough for your work to matter. Experienced enough to help it grow.</h2></div>
      <div><p>We build software with international clients across product strategy, experience design, application engineering, cloud, AI, and quality. The best work happens when the team understands the problem, sees the tradeoffs, and has room to contribute.</p><p>At Appixo, you work close to the product and the people making decisions. We value calm execution, thoughtful disagreement, and a clear sense of ownership.</p></div>
    </section>

    <section className="ax-careers-values">
      <div className="ax-careers-section-head"><div className="ax-page-kicker">What we value</div><h2>The habits behind strong teams.</h2><p>These principles influence how we hire, collaborate, review work, and support each other.</p></div>
      <div className="ax-careers-value-grid">{values.map(({Icon,...value}) => <article key={value.number}><div><span>{value.number}</span><Icon /></div><h3>{value.title}</h3><p>{value.copy}</p></article>)}</div>
    </section>

    <section className="ax-careers-benefits">
      <div className="ax-careers-benefit-visual"><img src="/media/process-development-hero.png" alt="Software product engineering workflow" loading="lazy" /><div><FiGlobe /><span>Collaborate across products, disciplines, and markets.</span></div></div>
      <div className="ax-careers-benefit-copy"><div className="ax-page-kicker">Life at Appixo</div><h2>An environment designed for focused product work.</h2><div className="ax-careers-benefit-list">{benefits.map(([title,copy]) => <article key={title}><FiCheck /><div><h3>{title}</h3><p>{copy}</p></div></article>)}</div></div>
    </section>

    <section className="ax-careers-hiring">
      <div className="ax-careers-section-head"><div className="ax-page-kicker">Hiring process</div><h2>Professional, practical, and respectful of your time.</h2><p>No puzzle theatre or endless interviews. We focus on relevant experience, judgment, communication, and how we could work together.</p></div>
      <div className="ax-careers-hiring-grid">{hiring.map(([number,title,copy]) => <article key={number}><span>{number}</span><h3>{title}</h3><p>{copy}</p></article>)}</div>
    </section>

    <section id="opportunities" className="ax-careers-openings">
      <div className="ax-careers-opening-copy"><div className="ax-page-kicker">Current opportunities</div><h2>No listed openings today. The right conversation is still welcome.</h2><p>We do not currently have an advertised role, but we&apos;re always interested in hearing from thoughtful product designers, software engineers, QA specialists, cloud engineers, and delivery professionals.</p><div className="ax-careers-role-tags"><span>Product design</span><span>Web engineering</span><span>Mobile engineering</span><span>Cloud and DevOps</span><span>Quality engineering</span><span>Product delivery</span></div></div>
      <div className="ax-careers-apply"><FiMail /><h3>Introduce yourself</h3><p>Share what you&apos;re good at, the work you&apos;re proud of, and what you&apos;d like to build next. A portfolio, GitHub profile, or concise résumé is helpful.</p><a href="mailto:hello@appixotech.com?subject=Careers%20at%20Appixo">hello@appixotech.com <FiArrowUpRight /></a><small>We review every thoughtful introduction and keep relevant profiles on file.</small></div>
    </section>

    <Footer />
  </div>;
}
