import { ic } from "@/lib/icons";

export const products = [
  {
    slug: "clinic-click",
    name: "Clinic Click",
    desc: "Healthcare appointment platform connecting patients with doctors.",
    tagline: "Book a doctor in seconds, not phone calls.",
    icon: ic('<path d="M8 2v4M16 2v4M3 10h18"/><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M12 14v4M10 16h4"/>'),
    features: ["Appointment booking", "Patient management", "Doctors dashboard"],
    highlights: [
      "Real-time slot booking across multiple clinics and specialists.",
      "A dashboard doctors actually use — schedules, patient history, and notes in one place.",
      "Automated reminders that cut down no-shows.",
    ],
    badge: "Live",
    badgeBg: "rgba(18,161,80,0.15)",
    badgeFg: "#3ecf8e",
    cta: "Learn more",
    ctaBg: "var(--goldsoft)",
    ctaFg: "var(--gold)",
    ctaBorder: "var(--border2)",
  },
  {
    slug: "raktconnect",
    name: "RaktConnect",
    desc: "Blood donation platform linking donors with those in urgent need.",
    tagline: "Find a donor when every minute counts.",
    icon: ic('<path d="M12 2s6 6.5 6 11a6 6 0 0 1-12 0c0-4.5 6-11 6-11z"/>'),
    features: ["Blood requests", "Donor search", "Emergency alerts"],
    highlights: [
      "Search verified donors by blood group and location instantly.",
      "Emergency broadcast alerts to nearby eligible donors.",
      "Built with NGOs and hospitals to move fast under pressure.",
    ],
    badge: "Live",
    badgeBg: "rgba(18,161,80,0.15)",
    badgeFg: "#3ecf8e",
    cta: "Learn more",
    ctaBg: "var(--goldsoft)",
    ctaFg: "var(--gold)",
    ctaBorder: "var(--border2)",
  },
  {
    slug: "future-ai-product",
    name: "Future AI Product",
    desc: "An AI-powered solution in the making. Details revealed soon.",
    tagline: "Something new is in research — stay tuned.",
    icon: ic(
      '<path d="M12 8V4H8M4 8v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2z"/><path d="M9 13h.01M15 13h.01M9 17h6"/>'
    ),
    features: ["Coming soon", "In research", "Stay tuned"],
    highlights: [
      "We're exploring an AI-powered product from the ground up.",
      "Early access will open to a small group before public launch.",
      "Want in? Reach out and we'll keep you posted.",
    ],
    badge: "Coming Soon",
    badgeBg: "var(--goldsoft)",
    badgeFg: "var(--gold)",
    cta: "Get notified",
    ctaBg: "transparent",
    ctaFg: "var(--text)",
    ctaBorder: "var(--border)",
  },
];

export const whys = [
  { title: "Fast Development", desc: "Rapid, iterative delivery that gets products to market quickly.", icon: ic('<path d="m13 2-3 7h6l-3 13"/>') },
  { title: "Secure Architecture", desc: "Security-first engineering baked into every layer.", icon: ic('<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>') },
  { title: "Cloud Ready", desc: "Deployed on scalable, reliable cloud infrastructure.", icon: ic('<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z"/>') },
  { title: "Cross Platform", desc: "One codebase, native experience across every device.", icon: ic('<rect x="2" y="4" width="20" height="13" rx="2"/><path d="M8 21h8M12 17v4"/>') },
  { title: "High Performance", desc: "Optimized for speed with smooth, responsive interfaces.", icon: ic('<path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 12 16 8"/><circle cx="12" cy="12" r="1.5" fill="currentColor"/>') },
  { title: "Scalable Products", desc: "Built to grow — add products without redesigning.", icon: ic('<path d="M3 3v18h18"/><path d="m7 15 4-4 3 3 5-6"/>') },
];

export const stats = [
  { n: 6, suffix: "+", label: "Countries Served" },
  { n: 1000, suffix: "+", label: "Users" },
  { n: 99, suffix: "%", label: "Uptime" },
  { n: 24, suffix: "/7", label: "Support" },
];

export const services = [
  // ---- Development ----
  {
    slug: "web-development",
    category: "Development",
    name: "Web Development",
    blurb: "Custom web development.",
    tagline: "Fast, modern web apps and marketing sites backed by scalable APIs.",
    items: ["Next.js", "React", "Node.js", "REST/GraphQL APIs"],
    highlights: [
      "Server-rendered Next.js applications built for speed and SEO.",
      "REST/GraphQL APIs on Node.js with clean, documented contracts.",
      "Cloud infrastructure on AWS, sized to scale with traffic — not before.",
    ],
    icon: ic('<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>'),
  },
  {
    slug: "mobile-app-development",
    category: "Development",
    name: "Mobile App Development",
    blurb: "iOS & Android development.",
    tagline: "Native-feel apps for Android and iOS, built once, shipped everywhere.",
    items: ["Android", "iOS", "Flutter", "React Native"],
    highlights: [
      "Cross-platform apps with Flutter and React Native that feel native on both platforms.",
      "Offline-first architecture, push notifications, and in-app payments handled end to end.",
      "App Store and Play Store submission, versioning, and release management.",
    ],
    icon: ic('<rect x="5" y="2" width="14" height="20" rx="2"/><path d="M12 18h.01"/>'),
  },
  {
    slug: "cloud-solutions",
    category: "Development",
    name: "Cloud Solutions",
    blurb: "Scalable cloud infrastructure.",
    tagline: "Seamlessly transition to world-class cloud infrastructure — from consulting to migration, we've got you covered.",
    items: ["AWS", "GCP", "Azure", "Terraform"],
    highlights: [
      "Cloud architecture designed for your actual traffic, not hypothetical scale.",
      "Migration from on-prem or legacy hosting with zero-downtime cutover plans.",
      "Cost-optimized infrastructure — reserved instances, autoscaling, and right-sized resources.",
    ],
    icon: ic('<path d="M17.5 19a4.5 4.5 0 0 0 0-9 6 6 0 0 0-11.6 1.5A4 4 0 0 0 6 19z"/>'),
  },
  {
    slug: "custom-software",
    category: "Development",
    name: "Custom Software",
    blurb: "Tailored business solutions.",
    tagline: "Bespoke internal tools and platforms built around how your business actually operates.",
    items: ["Internal tools", "Automation", "Legacy modernization", "Integrations"],
    highlights: [
      "Custom-built software that fits your workflow instead of forcing you into someone else's.",
      "Modernize legacy systems without disrupting the business that depends on them.",
      "Built to hand off cleanly — documented, tested, and yours to maintain or extend.",
    ],
    icon: ic(
      '<circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82A1.65 1.65 0 0 0 3 13.09H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/>'
    ),
  },

  // ---- Design ----
  {
    slug: "ui-ux-design",
    category: "Design",
    name: "UI/UX Design",
    blurb: "User-centered interfaces.",
    tagline: "Research-driven design systems that make products easy to use.",
    items: ["Research", "Prototyping", "Design systems"],
    highlights: [
      "User research and journey mapping before a single pixel is drawn.",
      "Interactive prototypes you can test with real users pre-build.",
      "Reusable design systems that keep every screen consistent as the product grows.",
    ],
    icon: ic(
      '<path d="M12 19l7-7 3 3-7 7-3-3z"/><path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z"/><path d="M2 2l7.586 7.586"/><circle cx="11" cy="11" r="2"/>'
    ),
  },
  {
    slug: "branding",
    category: "Design",
    name: "Branding",
    blurb: "Brand identity & strategy.",
    tagline: "Brand identity that gives your product a voice before a single word is written.",
    items: ["Logo & identity", "Brand guidelines", "Naming", "Positioning"],
    highlights: [
      "A visual identity system — logo, color, type — built to hold up across every touchpoint.",
      "Brand guidelines your team can actually follow without a designer in the room.",
      "Positioning and messaging that make the product easier to sell.",
    ],
    icon: ic(
      '<circle cx="13.5" cy="6.5" r=".5" fill="currentColor"/><circle cx="17.5" cy="10.5" r=".5" fill="currentColor"/><circle cx="8.5" cy="7.5" r=".5" fill="currentColor"/><circle cx="6.5" cy="12.5" r=".5" fill="currentColor"/><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10c.9 0 1.5-.7 1.5-1.5 0-.4-.2-.8-.4-1.1-.2-.3-.4-.6-.4-1 0-.8.7-1.4 1.5-1.4H16c3.3 0 6-2.7 6-6 0-4.9-4.5-9-10-9z"/>'
    ),
  },
  {
    slug: "product-design",
    category: "Design",
    name: "Product Design",
    blurb: "Digital product innovation.",
    tagline: "End-to-end product design — from the first wireframe to a polished, ready-to-build UI.",
    items: ["Wireframing", "UI design", "Design systems", "Handoff to dev"],
    highlights: [
      "Wireframes and flows that settle the hard product decisions before development starts.",
      "Pixel-accurate UI, delivered in a format your dev team can build from directly.",
      "One design system shared across web, iOS, and Android — no drift between platforms.",
    ],
    icon: ic('<path d="M12 2 2 7l10 5 10-5-10-5z"/><path d="m2 17 10 5 10-5"/><path d="m2 12 10 5 10-5"/>'),
  },

  // ---- Solutions ----
  {
    slug: "devops",
    category: "Solutions",
    name: "DevOps",
    blurb: "Automated development ops.",
    tagline: "CI/CD pipelines and infrastructure automation that get releases out safely, every time.",
    items: ["CI/CD", "Docker", "Kubernetes", "Monitoring"],
    highlights: [
      "Automated build, test, and deploy pipelines — ship multiple times a day, not once a month.",
      "Infrastructure as code, so environments are reproducible instead of hand-tuned.",
      "Monitoring and alerting that catches problems before your users do.",
    ],
    icon: ic('<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>'),
  },
  {
    slug: "api-integration",
    category: "Solutions",
    name: "API Integration",
    blurb: "Seamless system connections.",
    tagline: "Connect your product to the tools and platforms it needs to talk to — cleanly, without breaking on the next update.",
    items: ["REST", "GraphQL", "Webhooks", "Third-party APIs"],
    highlights: [
      "Integrations with payment providers, CRMs, and internal systems, built to fail gracefully.",
      "Clean, versioned API contracts instead of tightly-coupled, brittle connections.",
      "Documentation handed over so your team isn't locked into us to maintain it.",
    ],
    icon: ic(
      '<ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/><path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"/>'
    ),
  },
  {
    slug: "maintenance",
    category: "Solutions",
    name: "Maintenance",
    blurb: "Ongoing system support.",
    tagline: "Ongoing support and iteration once your product is live — bug fixes, updates, and new features.",
    items: ["Bug fixes", "Updates", "Performance", "24/7 support"],
    highlights: [
      "SLA-backed support, so issues get triaged and fixed on a timeline you can rely on.",
      "Regular dependency and security updates — nobody wants a 3-year-old unpatched stack.",
      "New features shipped incrementally, without a full re-engagement each time.",
    ],
    icon: ic('<circle cx="12" cy="5" r="2"/><circle cx="5" cy="19" r="2"/><circle cx="19" cy="19" r="2"/><path d="M12 7v4M12 11 6.5 17M12 11l5.5 6"/>'),
  },
  {
    slug: "ai-solutions",
    category: "Solutions",
    name: "AI Solutions",
    blurb: "Practical AI & automation.",
    tagline: "Practical AI — models and automation that solve real problems.",
    items: ["ML models", "Automation", "Chatbots"],
    highlights: [
      "Custom ML models trained on your data, not generic off-the-shelf demos.",
      "Workflow automation that removes repetitive manual work.",
      "Conversational chatbots wired into your existing support and product stack.",
    ],
    icon: ic(
      '<rect x="4" y="4" width="16" height="16" rx="3"/><path d="M9 9h.01M15 9h.01M9 15h6"/><path d="M12 1v3M12 20v3M1 12h3M20 12h3"/>'
    ),
  },
];

export const serviceCategoryNames = ["Development", "Design", "Solutions"];

export const serviceCategories = serviceCategoryNames.map((name) => ({
  name,
  services: services.filter((sv) => sv.category === name),
}));
