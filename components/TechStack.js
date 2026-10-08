"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SiDocker,
  SiGooglecloud,
  SiKubernetes,
  SiCloudflare,
  SiTerraform,
  SiGithubactions,
  SiPytorch,
  SiTensorflow,
  SiHuggingface,
  SiFlutter,
  SiReact,
  SiSwift,
  SiKotlin,
  SiFirebase,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiGraphql,
  SiNodedotjs,
  SiPython,
  SiFastapi,
  SiExpress,
  SiPostgresql,
  SiMongodb,
  SiRedis,
  SiSupabase,
  SiElasticsearch,
  SiRedhat,
  SiAnthropic,
} from "react-icons/si";
import { FaAws, FaSalesforce } from "react-icons/fa";
import { VscAzure } from "react-icons/vsc";
import { TbBrandOpenai } from "react-icons/tb";
import {
  FiArrowRight,
  FiPause,
  FiPlay,
  FiCheckCircle,
  FiLayers,
  FiShield,
  FiZap,
} from "react-icons/fi";

const DOMAINS = [
  { id: "all", name: "All Technologies" },
  { id: "ai", name: "AI & Frontier Models" },
  { id: "cloud", name: "Cloud & DevOps" },
  { id: "mobile", name: "Mobile Engineering" },
  { id: "web", name: "Web & Frontend" },
  { id: "backend", name: "Backend & APIs" },
  { id: "database", name: "Databases & Cache" },
];

const TRACK_1 = [
  {
    id: "docker",
    name: "Docker",
    domain: "cloud",
    category: "Container Runtime",
    icon: SiDocker,
    brandColor: "#2496ED",
    glow: "rgba(36, 150, 237, 0.4)",
  },
  {
    id: "aws",
    name: "Amazon Web Services",
    domain: "cloud",
    category: "Cloud Infrastructure",
    icon: FaAws,
    brandColor: "#FF9900",
    glow: "rgba(255, 153, 0, 0.4)",
  },
  {
    id: "claude",
    name: "Claude",
    domain: "ai",
    category: "Frontier Intelligence",
    icon: SiAnthropic,
    brandColor: "#D97706",
    glow: "rgba(217, 119, 6, 0.45)",
  },
  {
    id: "openai",
    name: "OpenAI",
    domain: "ai",
    category: "Generative AI Models",
    icon: TbBrandOpenai,
    brandColor: "#10A37F",
    glow: "rgba(16, 163, 127, 0.45)",
  },
  {
    id: "gcp",
    name: "Google Cloud Platform",
    domain: "cloud",
    category: "Cloud Analytics & ML",
    icon: SiGooglecloud,
    brandColor: "#4285F4",
    glow: "rgba(66, 133, 244, 0.4)",
  },
  {
    id: "azure",
    name: "Azure",
    domain: "cloud",
    category: "Enterprise Cloud",
    icon: VscAzure,
    brandColor: "#0089D6",
    glow: "rgba(0, 137, 214, 0.4)",
  },
  {
    id: "redhat",
    name: "Red Hat",
    domain: "cloud",
    category: "Enterprise Linux & K8s",
    icon: SiRedhat,
    brandColor: "#EE0000",
    glow: "rgba(238, 0, 0, 0.4)",
  },
  {
    id: "salesforce",
    name: "Salesforce",
    domain: "cloud",
    category: "Enterprise Ecosystem",
    icon: FaSalesforce,
    brandColor: "#00A1E0",
    glow: "rgba(0, 161, 224, 0.4)",
  },
  {
    id: "kubernetes",
    name: "Kubernetes",
    domain: "cloud",
    category: "Cluster Orchestration",
    icon: SiKubernetes,
    brandColor: "#326CE5",
    glow: "rgba(50, 108, 229, 0.4)",
  },
  {
    id: "cloudflare",
    name: "Cloudflare",
    domain: "cloud",
    category: "Edge CDN & Security",
    icon: SiCloudflare,
    brandColor: "#F38020",
    glow: "rgba(243, 128, 32, 0.4)",
  },
  {
    id: "nextjs",
    name: "Next.js",
    domain: "web",
    category: "Full-Stack Web Engine",
    icon: SiNextdotjs,
    brandColor: "#FFFFFF",
    glow: "rgba(255, 255, 255, 0.35)",
  },
  {
    id: "flutter",
    name: "Flutter",
    domain: "mobile",
    category: "Cross-Platform Mobile",
    icon: SiFlutter,
    brandColor: "#54C5F8",
    glow: "rgba(84, 197, 248, 0.4)",
  },
  {
    id: "react",
    name: "React",
    domain: "web",
    category: "Component UI Engine",
    icon: SiReact,
    brandColor: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.4)",
  },
  {
    id: "typescript",
    name: "TypeScript",
    domain: "web",
    category: "Strict Type System",
    icon: SiTypescript,
    brandColor: "#3178C6",
    glow: "rgba(49, 120, 198, 0.4)",
  },
  {
    id: "terraform",
    name: "Terraform",
    domain: "cloud",
    category: "Infrastructure as Code",
    icon: SiTerraform,
    brandColor: "#844FBA",
    glow: "rgba(132, 79, 186, 0.4)",
  },
];

const TRACK_2 = [
  {
    id: "pytorch",
    name: "PyTorch",
    domain: "ai",
    category: "Neural Architecture",
    icon: SiPytorch,
    brandColor: "#EE4C2C",
    glow: "rgba(238, 76, 44, 0.4)",
  },
  {
    id: "tensorflow",
    name: "TensorFlow",
    domain: "ai",
    category: "Production ML Serving",
    icon: SiTensorflow,
    brandColor: "#FF6F00",
    glow: "rgba(255, 111, 0, 0.4)",
  },
  {
    id: "huggingface",
    name: "Hugging Face",
    domain: "ai",
    category: "Transformers & LLMs",
    icon: SiHuggingface,
    brandColor: "#FFD21E",
    glow: "rgba(255, 210, 30, 0.4)",
  },
  {
    id: "postgresql",
    name: "PostgreSQL",
    domain: "database",
    category: "Relational ACID DB",
    icon: SiPostgresql,
    brandColor: "#4169E1",
    glow: "rgba(65, 105, 225, 0.4)",
  },
  {
    id: "mongodb",
    name: "MongoDB",
    domain: "database",
    category: "NoSQL Document DB",
    icon: SiMongodb,
    brandColor: "#47A248",
    glow: "rgba(71, 162, 72, 0.4)",
  },
  {
    id: "redis",
    name: "Redis",
    domain: "database",
    category: "In-Memory Sub-ms Cache",
    icon: SiRedis,
    brandColor: "#DC382D",
    glow: "rgba(220, 56, 45, 0.4)",
  },
  {
    id: "supabase",
    name: "Supabase",
    domain: "database",
    category: "Real-time Cloud Postgres",
    icon: SiSupabase,
    brandColor: "#3ECF8E",
    glow: "rgba(62, 207, 142, 0.4)",
  },
  {
    id: "nodejs",
    name: "Node.js",
    domain: "backend",
    category: "Event-Driven Runtime",
    icon: SiNodedotjs,
    brandColor: "#339933",
    glow: "rgba(51, 153, 51, 0.4)",
  },
  {
    id: "python",
    name: "Python",
    domain: "backend",
    category: "Data & Systems Core",
    icon: SiPython,
    brandColor: "#3776AB",
    glow: "rgba(55, 118, 171, 0.4)",
  },
  {
    id: "fastapi",
    name: "FastAPI",
    domain: "backend",
    category: "Async Python Engine",
    icon: SiFastapi,
    brandColor: "#009688",
    glow: "rgba(0, 150, 136, 0.4)",
  },
  {
    id: "swift",
    name: "Swift & iOS",
    domain: "mobile",
    category: "Native Apple Platform",
    icon: SiSwift,
    brandColor: "#F05138",
    glow: "rgba(240, 81, 56, 0.4)",
  },
  {
    id: "kotlin",
    name: "Kotlin & Android",
    domain: "mobile",
    category: "Native Android Platform",
    icon: SiKotlin,
    brandColor: "#7F52FF",
    glow: "rgba(127, 82, 255, 0.4)",
  },
  {
    id: "react-native",
    name: "React Native",
    domain: "mobile",
    category: "Native Mobile Bridge",
    icon: SiReact,
    brandColor: "#61DAFB",
    glow: "rgba(97, 218, 251, 0.4)",
  },
  {
    id: "graphql",
    name: "GraphQL",
    domain: "backend",
    category: "Federated API Schema",
    icon: SiGraphql,
    brandColor: "#E10098",
    glow: "rgba(225, 0, 152, 0.4)",
  },
  {
    id: "elasticsearch",
    name: "Elasticsearch",
    domain: "database",
    category: "Distributed Full-Text",
    icon: SiElasticsearch,
    brandColor: "#005571",
    glow: "rgba(0, 85, 113, 0.4)",
  },
];

// Duplicated arrays for seamless -50% CSS infinite marquee loop
const LOOP_TRACK_1 = [...TRACK_1, ...TRACK_1];
const LOOP_TRACK_2 = [...TRACK_2, ...TRACK_2];

export default function TechStack() {
  const [activeDomain, setActiveDomain] = useState("all");
  const [isPaused, setIsPaused] = useState(false);

  return (
    <section id="technologies" className="ax-alliance-section">
      {/* Background Ambient Glow */}
      <div className="ax-alliance-ambient-glow" aria-hidden="true" />

      <div className="ax-alliance-container">
        {/* Header matching user reference */}
        <div className="ax-alliance-header">
          <div className="ax-alliance-eyebrow">
            <span>ENGINEERING & TECHNOLOGY ECOSYSTEM</span>
          </div>

          <h2 className="ax-alliance-title">
            Strategic Technologies that<br />
            Power Innovation
          </h2>

          <p className="ax-alliance-subtitle">
            Engineered with battle-tested frameworks, resilient cloud infrastructure,
            and frontier AI systems — built for speed, security, and enterprise scale.
          </p>

          {/* Key Engineering Pillars */}
          <div className="ax-alliance-pillars">
            <div className="ax-alliance-pillar-item">
              <FiLayers className="ax-alliance-pillar-icon" />
              <span>30+ Production Stacks</span>
            </div>
            <div className="ax-alliance-pillar-dot" />
            <div className="ax-alliance-pillar-item">
              <FiShield className="ax-alliance-pillar-icon" />
              <span>99.99% High Availability</span>
            </div>
            <div className="ax-alliance-pillar-dot" />
            <div className="ax-alliance-pillar-item">
              <FiZap className="ax-alliance-pillar-icon" />
              <span>Zero-Downtime Deployments</span>
            </div>
          </div>
        </div>

        {/* Domain Filter Bar & Motion Control */}
        <div className="ax-alliance-toolbar">
          <div className="ax-alliance-filter-pills" role="tablist">
            {DOMAINS.map((dom) => {
              const isActive = activeDomain === dom.id;
              return (
                <button
                  key={dom.id}
                  role="tab"
                  aria-selected={isActive}
                  className={`ax-alliance-pill-btn ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveDomain(dom.id)}
                >
                  <span>{dom.name}</span>
                </button>
              );
            })}
          </div>

          <button
            className={`ax-alliance-motion-toggle ${isPaused ? "is-paused" : ""}`}
            onClick={() => setIsPaused(!isPaused)}
            title={isPaused ? "Resume automatic scrolling" : "Pause automatic scrolling"}
            aria-label={isPaused ? "Resume auto-moving" : "Pause auto-moving"}
          >
            {isPaused ? <FiPlay /> : <FiPause />}
            <span>{isPaused ? "Resume Stream" : "Pause Stream"}</span>
          </button>
        </div>
      </div>

      {/* Infinite Auto-Moving Marquee Stage */}
      <div
        className={`ax-alliance-stage ${isPaused ? "is-user-paused" : ""}`}
        aria-label="Technologies Marquee Showcase"
      >
        {/* Track 1: Moving smoothly to the left */}
        <div className="ax-alliance-track ax-alliance-track-left">
          {LOOP_TRACK_1.map((item, idx) => {
            const Icon = item.icon;
            const isMatch = activeDomain === "all" || item.domain === activeDomain;
            return (
              <div
                key={`${item.id}-${idx}`}
                className={`ax-alliance-card ${isMatch ? "is-match" : "is-dimmed"}`}
                style={{
                  "--tech-brand": item.brandColor,
                  "--tech-glow": item.glow,
                }}
              >
                <div className="ax-alliance-card-logo">
                  <Icon size={46} className="ax-alliance-logo-icon" />
                </div>
                <div className="ax-alliance-card-info">
                  <span className="ax-alliance-card-name">{item.name}</span>
                  <span className="ax-alliance-card-category">{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Track 2: Moving smoothly to the right */}
        <div className="ax-alliance-track ax-alliance-track-right">
          {LOOP_TRACK_2.map((item, idx) => {
            const Icon = item.icon;
            const isMatch = activeDomain === "all" || item.domain === activeDomain;
            return (
              <div
                key={`${item.id}-${idx}`}
                className={`ax-alliance-card ${isMatch ? "is-match" : "is-dimmed"}`}
                style={{
                  "--tech-brand": item.brandColor,
                  "--tech-glow": item.glow,
                }}
              >
                <div className="ax-alliance-card-logo">
                  <Icon size={46} className="ax-alliance-logo-icon" />
                </div>
                <div className="ax-alliance-card-info">
                  <span className="ax-alliance-card-name">{item.name}</span>
                  <span className="ax-alliance-card-category">{item.category}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
