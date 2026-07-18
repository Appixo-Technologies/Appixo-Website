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
  { n: 3, suffix: "+", label: "Products" },
  { n: 1000, suffix: "+", label: "Users" },
  { n: 99, suffix: "%", label: "Uptime" },
  { n: 24, suffix: "/7", label: "Support" },
];

export const services = [
  {
    slug: "mobile-app-development",
    name: "Mobile App Development",
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
    slug: "web-development",
    name: "Web Development",
    tagline: "Fast, modern web apps and marketing sites backed by scalable APIs.",
    items: ["Backend APIs", "Cloud Solutions", "Next.js"],
    highlights: [
      "Server-rendered Next.js applications built for speed and SEO.",
      "REST/GraphQL APIs on Node.js with clean, documented contracts.",
      "Cloud infrastructure on AWS, sized to scale with traffic — not before.",
    ],
    icon: ic('<path d="m18 16 4-4-4-4M6 8l-4 4 4 4M14.5 4l-5 16"/>'),
  },
  {
    slug: "ui-ux-design",
    name: "UI/UX Design",
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
    slug: "ai-solutions",
    name: "AI Solutions",
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
