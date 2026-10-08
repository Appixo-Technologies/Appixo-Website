"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import {
  FiArrowLeft,
  FiArrowRight,
  FiArrowUpRight,
  FiCheckCircle,
} from "react-icons/fi";

const projects = [
  {
    id: "raktconnect",
    name: "RaktConnect",
    tag: "EMERGENCY HEALTHCARE",
    summary:
      "Engineered a real-time blood donation and donor matching network connecting urgent hospital requests across cities.",
    metrics: [
      { stat: "120k+", label: "verified donors connected in live network" },
      { stat: "15 min", label: "average emergency match turnaround" },
    ],
    image: "/media/portfolio-raktconnect.jpg",
    href: "/products/raktconnect",
    theme: "red",
    bg: "linear-gradient(155deg, #e11d48 0%, #be123c 55%, #881337 100%)",
    cardClass: "theme-red",
    isLight: false,
    badgeBg: "#ffffff",
    badgeColor: "#be123c",
    badgeText: "RC",
    accent: "#ff4d6d",
  },
  {
    id: "nexapay",
    name: "NexaPay",
    tag: "FINANCIAL OPERATIONS",
    summary:
      "Architected a unified digital treasury and financial operations workspace for automated settlement, escrow, and multi-tier approvals.",
    metrics: [
      { stat: "$480M+", label: "monthly payments routed and audited" },
      { stat: "0.02s", label: "instant settlement verification latency" },
    ],
    image: "/media/portfolio-nexapay.png",
    href: "/enquiry",
    theme: "white",
    bg: "#ffffff",
    cardClass: "theme-white",
    isLight: true,
    badgeBg: "#0f172a",
    badgeColor: "#ffffff",
    badgeText: "NP",
    accent: "#0f172a",
  },
  {
    id: "clinic-click",
    name: "Clinic Click",
    tag: "DIGITAL HEALTH PLATFORM",
    summary:
      "Developed a patient-first clinic management and appointment ecosystem simplifying care discovery and multi-clinic scheduling.",
    metrics: [
      { stat: "99.4%", label: "appointment booking platform uptime" },
      { stat: "45%", label: "reduction in outpatient waiting times" },
    ],
    image: "/media/portfolio-clinicclick.jpg",
    href: "/products/clinic-click",
    theme: "sapphire",
    bg: "linear-gradient(155deg, #0e1726 0%, #07101b 100%)",
    cardClass: "theme-sapphire",
    isLight: false,
    badgeBg: "rgba(6,182,212,0.18)",
    badgeColor: "#22d3ee",
    badgeText: "CC",
    accent: "#06b6d4",
  },
  {
    id: "future-ai",
    name: "Future AI",
    tag: "AUTONOMOUS AGENT PLATFORM",
    summary:
      "Architected a multi-agent decision intelligence system that converts complex business telemetry into explainable automated actions.",
    metrics: [
      { stat: "3.8x", label: "faster autonomous decision cycles" },
      { stat: "94%", label: "predictive workflow automation rate" },
    ],
    image: "/media/portfolio-futureai.jpg",
    href: "/products/future-ai-product",
    theme: "violet",
    bg: "linear-gradient(155deg, #161028 0%, #0d0918 100%)",
    cardClass: "theme-violet",
    isLight: false,
    badgeBg: "rgba(139,92,246,0.22)",
    badgeColor: "#c084fc",
    badgeText: "AI",
    accent: "#8b5cf6",
  },
  {
    id: "fleetflow",
    name: "FleetFlow",
    tag: "LOGISTICS & TELEMETRY",
    summary:
      "Modernized legacy telemetry infrastructure into a unified fleet command center with live vehicle telemetry and predictive route alerts.",
    metrics: [
      { stat: "1,200+", label: "active vehicles with unified data visibility" },
      { stat: "32%", label: "reduction in route fuel and idle waste" },
    ],
    image: "/media/portfolio-fleetflow.png",
    href: "/enquiry",
    theme: "carbon",
    bg: "linear-gradient(155deg, #171618 0%, #0e0d0f 100%)",
    cardClass: "theme-carbon",
    isLight: false,
    badgeBg: "rgba(245,158,11,0.2)",
    badgeColor: "#fbbf24",
    badgeText: "FF",
    accent: "#f59e0b",
  },
  {
    id: "omniretail",
    name: "OmniRetail",
    tag: "COMMERCE ECOSYSTEM",
    summary:
      "Designed an immersive direct-to-consumer mobile shopping application driving personalized discovery and one-tap checkout conversions.",
    metrics: [
      { stat: "50%", label: "of total orders now routed via native app" },
      { stat: "22%", label: "increase in digital conversion rates" },
    ],
    image: "/media/portfolio-omniretail.jpg",
    href: "/enquiry",
    theme: "coral",
    bg: "linear-gradient(155deg, #221016 0%, #12090d 100%)",
    cardClass: "theme-coral",
    isLight: false,
    badgeBg: "rgba(255,77,77,0.2)",
    badgeColor: "#ff6b6b",
    badgeText: "OR",
    accent: "#ff4d4d",
  },
  {
    id: "learnloop",
    name: "LearnLoop",
    tag: "WORKFORCE LEARNING",
    summary:
      "Built an intelligent workforce learning platform delivering adaptive skill pathways, real-time training telemetry, and cohort analytics.",
    metrics: [
      { stat: "85%", label: "increase in modular course completion" },
      { stat: "4.9 / 5", label: "learner satisfaction rating across 50k+ users" },
    ],
    image: "/media/portfolio-learnloop.png",
    href: "/enquiry",
    theme: "plum",
    bg: "linear-gradient(155deg, #1e112d 0%, #11091a 100%)",
    cardClass: "theme-plum",
    isLight: false,
    badgeBg: "rgba(236,72,153,0.2)",
    badgeColor: "#f472b6",
    badgeText: "LL",
    accent: "#ec4899",
  },
  {
    id: "cloudpulse",
    name: "CloudPulse",
    tag: "CLOUD OBSERVABILITY",
    summary:
      "Engineered high-throughput Kubernetes observability and microservice health mesh delivering instant anomaly alerts.",
    metrics: [
      { stat: "99.99%", label: "enterprise uptime SLA guaranteed" },
      { stat: "65%", label: "faster mean-time-to-incident recovery" },
    ],
    image: "/media/portfolio-cloudpulse.jpg",
    href: "/enquiry",
    theme: "cyan",
    bg: "linear-gradient(155deg, #091a27 0%, #050d14 100%)",
    cardClass: "theme-cyan",
    isLight: false,
    badgeBg: "rgba(6,182,212,0.2)",
    badgeColor: "#38bdf8",
    badgeText: "CP",
    accent: "#00f0ff",
  },
  {
    id: "skyroute",
    name: "SkyRoute",
    tag: "AVIATION MOBILITY",
    summary:
      "Re-engineered passenger mobile itinerary flows with AI gate tracking, dynamic seat upgrades, and offline boarding passes.",
    metrics: [
      { stat: "4.2M+", label: "itineraries booked and synced in real-time" },
      { stat: "3x", label: "boost in self-service passenger check-ins" },
    ],
    image: "/media/portfolio-fleetflow.png",
    href: "/enquiry",
    theme: "navy",
    bg: "linear-gradient(155deg, #0f1c32 0%, #09101d 100%)",
    cardClass: "theme-navy",
    isLight: false,
    badgeBg: "rgba(59,130,246,0.2)",
    badgeColor: "#60a5fa",
    badgeText: "SR",
    accent: "#3b82f6",
  },
  {
    id: "aerotelemetry",
    name: "AeroTelemetry",
    tag: "IOT SENSOR CLOUD",
    summary:
      "Industrial telemetry infrastructure streaming low-latency vibration, temperature, and maintenance telemetry from connected machines.",
    metrics: [
      { stat: "10M+", label: "telemetry events processed per second" },
      { stat: "90%", label: "faster analytics report generation time" },
    ],
    image: "/media/portfolio-futureai.jpg",
    href: "/enquiry",
    theme: "dark",
    bg: "linear-gradient(155deg, #13171b 0%, #0b0d0f 100%)",
    cardClass: "theme-dark",
    isLight: false,
    badgeBg: "rgba(16,185,129,0.2)",
    badgeColor: "#34d399",
    badgeText: "AT",
    accent: "#10b981",
  },
  {
    id: "medisync",
    name: "MediSync",
    tag: "CLINICAL INTELLIGENCE",
    summary:
      "HIPAA-compliant decentralized clinical platform standardizing electronic patient records and trial workflows across hospital networks.",
    metrics: [
      { stat: "100%", label: "audit readiness with zero data leakage" },
      { stat: "40%", label: "shortened clinical trial onboarding cycle" },
    ],
    image: "/media/portfolio-clinicclick.jpg",
    href: "/enquiry",
    theme: "emerald",
    bg: "linear-gradient(155deg, #0d1e19 0%, #07120e 100%)",
    cardClass: "theme-emerald",
    isLight: false,
    badgeBg: "rgba(16,185,129,0.2)",
    badgeColor: "#6ee7b7",
    badgeText: "MS",
    accent: "#10b981",
  },
  {
    id: "vaultkey",
    name: "VaultKey",
    tag: "SECURITY & IDENTITY",
    summary:
      "Zero-knowledge cryptographic access gateway securing enterprise secrets, multi-cloud vault keys, and biometric authentication.",
    metrics: [
      { stat: "0", label: "security incidents or credential breaches" },
      { stat: "15ms", label: "biometric cryptographic auth latency" },
    ],
    image: "/media/portfolio-nexapay.png",
    href: "/enquiry",
    theme: "gold",
    bg: "linear-gradient(155deg, #1c1810 0%, #0e0c07 100%)",
    cardClass: "theme-gold",
    isLight: false,
    badgeBg: "rgba(212,175,55,0.22)",
    badgeColor: "#fbbf24",
    badgeText: "VK",
    accent: "#d4af37",
  },
];

const STEP_ANGLE = 30; // 360 / 12 = 30 degrees per clock hour
const TOTAL_ITEMS = projects.length; // 12

export default function PortfolioCarousel() {
  const stageRef = useRef(null);
  const cardRefs = useRef([]);
  const tabsRef = useRef(null);
  const followerRef = useRef(null);

  // Continuous rotation angle in degrees
  const rotationRef = useRef(0);
  const targetRotationRef = useRef(0);
  const animFrameRef = useRef(null);
  const isDraggingRef = useRef(false);
  const dragStartRef = useRef({ x: 0, y: 0, rot: 0, time: 0 });
  const lastPointerRef = useRef({ x: 0, time: 0 });
  const velocityRef = useRef(0);
  const dragDistanceRef = useRef(0);
  const justDraggedRef = useRef(false);
  const dragDirectionDetectedRef = useRef(false);
  const isHorizontalDragRef = useRef(false);
  const lastActiveRef = useRef(0);

  const [activeStation, setActiveStation] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [isInteracting, setIsInteracting] = useState(false);

  // Dynamic 360-degree clock wheel geometry parameters tailored for each device size
  const getGeometryParams = useCallback(() => {
    if (typeof window === "undefined") {
      return {
        radius: 1180,
        angFactor: 0.80,
        yFactor: 1.0,
        rotZFactor: 0.72,
        sensitivity: 0.088,
      };
    }
    const w = window.innerWidth;
    if (w <= 380) {
      return {
        radius: 520,
        angFactor: 0.88,
        yFactor: 0.52,
        rotZFactor: 0.52,
        sensitivity: 0.16,
      };
    }
    if (w <= 480) {
      return {
        radius: 580,
        angFactor: 0.86,
        yFactor: 0.58,
        rotZFactor: 0.56,
        sensitivity: 0.15,
      };
    }
    if (w <= 680) {
      return {
        radius: 680,
        angFactor: 0.82,
        yFactor: 0.68,
        rotZFactor: 0.60,
        sensitivity: 0.13,
      };
    }
    if (w < 1024) {
      return {
        radius: 880,
        angFactor: 0.80,
        yFactor: 0.85,
        rotZFactor: 0.68,
        sensitivity: 0.10,
      };
    }
    return {
      radius: 1180,
      angFactor: 0.80,
      yFactor: 1.0,
      rotZFactor: 0.72,
      sensitivity: 0.088,
    };
  }, []);

  // Update card DOM transforms directly for 60/120fps fluid rotation
  const applyTransforms = useCallback(
    (currentRotation) => {
      const { radius, angFactor, yFactor, rotZFactor } = getGeometryParams();

      const activeIdx =
        ((Math.round(currentRotation / STEP_ANGLE) % TOTAL_ITEMS) + TOTAL_ITEMS) %
        TOTAL_ITEMS;

      if (activeIdx !== lastActiveRef.current) {
        lastActiveRef.current = activeIdx;
        setActiveStation(activeIdx);
      }

      cardRefs.current.forEach((card, i) => {
        if (!card) return;
        const baseAngle = i * STEP_ANGLE;
        // diff in [-180, 180]
        const diff = ((baseAngle - currentRotation) % 360 + 540) % 360 - 180;
        const absDiff = Math.abs(diff);

        // Hide cards on the far rear side of the 360-degree clock wheel
        if (absDiff > 76) {
          card.style.display = "none";
          card.style.opacity = "0";
          card.style.pointerEvents = "none";
          return;
        }

        card.style.display = "flex";

        // Angular spacing factor matching Appinventiv's adjacent overlap
        const visualDeg = diff * angFactor;
        const rad = (visualDeg * Math.PI) / 180;

        const x = radius * Math.sin(rad);
        const y = radius * (1 - Math.cos(rad)) * yFactor;
        const rotZ = diff * rotZFactor; // Tilted along the circle arc
        const rotY = -diff * 0.12; // 3D cylindrical depth
        const z = -absDiff * 2.2;
        const scale = Math.max(0.85, 1 - absDiff * 0.0025);

        let opacity = 1;
        if (absDiff > 24) {
          opacity = Math.max(0.18, 1 - (absDiff - 24) * 0.016);
        }

        const zIndex = Math.round(100 - absDiff);

        card.style.transform = `translate3d(${x.toFixed(2)}px, ${y.toFixed(
          2
        )}px, ${z.toFixed(2)}px) rotateZ(${rotZ.toFixed(
          2
        )}deg) rotateY(${rotY.toFixed(2)}deg) scale(${scale.toFixed(3)})`;
        card.style.opacity = opacity.toFixed(3);
        card.style.zIndex = zIndex;
        card.style.pointerEvents = absDiff < 38 ? "auto" : "none";

        if (absDiff < 8) {
          card.classList.add("is-active-clock");
        } else {
          card.classList.remove("is-active-clock");
        }
      });
    },
    [getGeometryParams]
  );

  // Smooth easing animation to target station
  const animateToRotation = useCallback(
    (targetRot, duration = 520) => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      const startRot = rotationRef.current;
      const startTime = performance.now();

      const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);

      const loop = (currentTime) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(1, elapsed / duration);
        const eased = easeOutCubic(progress);

        rotationRef.current = startRot + (targetRot - startRot) * eased;
        applyTransforms(rotationRef.current);

        if (progress < 1) {
          animFrameRef.current = requestAnimationFrame(loop);
        } else {
          rotationRef.current = targetRot;
          applyTransforms(targetRot);
        }
      };

      animFrameRef.current = requestAnimationFrame(loop);
    },
    [applyTransforms]
  );

  // Snap to nearest 30 degree clock station
  const snapToNearest = useCallback(() => {
    const nearest = Math.round(rotationRef.current / STEP_ANGLE) * STEP_ANGLE;
    animateToRotation(nearest, 420);
  }, [animateToRotation]);

  // Navigate to specific project station along shortest 360-degree arc
  const goToStation = useCallback(
    (targetIndex) => {
      const currentStation = Math.round(rotationRef.current / STEP_ANGLE);
      const currentMod =
        ((currentStation % TOTAL_ITEMS) + TOTAL_ITEMS) % TOTAL_ITEMS;
      let diff = targetIndex - currentMod;
      if (diff > TOTAL_ITEMS / 2) diff -= TOTAL_ITEMS;
      if (diff < -TOTAL_ITEMS / 2) diff += TOTAL_ITEMS;

      const targetAngle = (currentStation + diff) * STEP_ANGLE;
      animateToRotation(targetAngle, 520);
    },
    [animateToRotation]
  );

  const prevStation = useCallback(() => {
    const nextAngle =
      (Math.round(rotationRef.current / STEP_ANGLE) - 1) * STEP_ANGLE;
    animateToRotation(nextAngle, 460);
  }, [animateToRotation]);

  const nextStation = useCallback(() => {
    const nextAngle =
      (Math.round(rotationRef.current / STEP_ANGLE) + 1) * STEP_ANGLE;
    animateToRotation(nextAngle, 460);
  }, [animateToRotation]);

  // Initialize transforms on mount and on window resize / orientation change
  useEffect(() => {
    applyTransforms(rotationRef.current);

    const onResize = () => applyTransforms(rotationRef.current);
    window.addEventListener("resize", onResize);
    window.addEventListener("orientationchange", onResize);
    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [applyTransforms]);


  // Pointer drag event handlers - only drag and rotate horizontally, never on vertical scroll
  const handlePointerDown = (e) => {
    if (e.button !== 0 && e.pointerType === "mouse") return;
    if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);

    dragDirectionDetectedRef.current = e.pointerType !== "touch";
    isHorizontalDragRef.current = e.pointerType !== "touch";

    isDraggingRef.current = true;
    dragDistanceRef.current = 0;
    dragStartRef.current = {
      x: e.clientX,
      y: e.clientY,
      rot: rotationRef.current,
      time: performance.now(),
    };
    lastPointerRef.current = { x: e.clientX, time: performance.now() };
    velocityRef.current = 0;

    if (e.pointerType !== "touch" && stageRef.current) {
      try {
        stageRef.current.setPointerCapture(e.pointerId);
        setIsInteracting(true);
      } catch (_) {}
    }
  };

  const handlePointerMove = (e) => {
    // Update custom drag cursor position
    if (followerRef.current && isHovered) {
      followerRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
    }

    if (!isDraggingRef.current) return;

    const totalDx = e.clientX - dragStartRef.current.x;
    const totalDy = e.clientY - dragStartRef.current.y;

    // Detect if movement is a vertical page scroll or horizontal drag
    if (!dragDirectionDetectedRef.current) {
      if (Math.abs(totalDx) > 8 || Math.abs(totalDy) > 8) {
        dragDirectionDetectedRef.current = true;
        if (Math.abs(totalDy) > Math.abs(totalDx)) {
          // Vertical scroll: do NOT drag or rotate! Let page scroll normally.
          isDraggingRef.current = false;
          setIsInteracting(false);
          return;
        } else {
          // Horizontal drag: engage carousel rotation
          isHorizontalDragRef.current = true;
          setIsInteracting(true);
          if (stageRef.current) {
            try {
              stageRef.current.setPointerCapture(e.pointerId);
            } catch (_) {}
          }
        }
      } else {
        return;
      }
    }

    if (!isHorizontalDragRef.current) return;

    const { sensitivity } = getGeometryParams();
    const dx = e.clientX - lastPointerRef.current.x;
    dragDistanceRef.current += Math.abs(dx);

    // Dynamic drag sensitivity tailored to screen size: moving left advances clockwise
    const dRot = -dx * sensitivity;
    rotationRef.current += dRot;
    applyTransforms(rotationRef.current);

    const now = performance.now();
    const dt = Math.max(1, now - lastPointerRef.current.time);
    const v = (-dx / dt) * 16.67 * sensitivity;
    velocityRef.current = velocityRef.current * 0.35 + v * 0.65;

    lastPointerRef.current = { x: e.clientX, time: now };
  };

  const handlePointerUp = (e) => {
    if (!isDraggingRef.current) {
      setIsInteracting(false);
      return;
    }
    isDraggingRef.current = false;
    setIsInteracting(false);

    if (stageRef.current && e?.pointerId !== undefined) {
      try {
        if (stageRef.current.hasPointerCapture(e.pointerId)) {
          stageRef.current.releasePointerCapture(e.pointerId);
        }
      } catch (_) {}
    }

    if (dragDistanceRef.current > 6) {
      justDraggedRef.current = true;
      setTimeout(() => {
        justDraggedRef.current = false;
      }, 180);
    }

    // Momentum physics & snap to station
    const v = velocityRef.current;
    if (Math.abs(v) > 0.25) {
      let currentVelocity = v;
      let rot = rotationRef.current;

      const momentumLoop = () => {
        rot += currentVelocity;
        currentVelocity *= 0.91;
        rotationRef.current = rot;
        applyTransforms(rot);

        if (Math.abs(currentVelocity) > 0.15) {
          animFrameRef.current = requestAnimationFrame(momentumLoop);
        } else {
          snapToNearest();
        }
      };
      animFrameRef.current = requestAnimationFrame(momentumLoop);
    } else {
      snapToNearest();
    }
  };

  // Click side card to rotate to center
  const handleCardClick = (e, index) => {
    if (justDraggedRef.current || dragDistanceRef.current > 8) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }
    if (index !== activeStation) {
      e.preventDefault();
      goToStation(index);
    }
  };

  return (
    <section
      id="portfolio"
      className="ax-portfolio-showcase ax-clock-portfolio"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        setIsInteracting(false);
      }}
    >
      {/* Floating Appinventiv style mouse follower */}
      <div
        ref={followerRef}
        className={`ax-portfolio-mouse-follower ${
          isHovered ? "is-visible" : ""
        } ${isInteracting ? "is-dragging" : ""}`}
        aria-hidden="true"
      >
        <span>DRAG</span>
      </div>

      {/* Header section matching Appinventiv */}
      <div className="ax-portfolio-head">
        <div>
          <span>Selected work</span>
          <h2>Products built to make an impact.</h2>
        </div>
        <p>
          Explore platforms we have designed and engineered across healthcare,
          social impact, AI, logistics, finance, and learning.
        </p>
      </div>

      {/* Appinventiv navigation row: [ < ] [Americana Group] [Flynas] ... [ > ] */}
      <div className="ax-portfolio-tabs-wrap">
        <button
          className="ax-clock-arrow-btn"
          onClick={prevStation}
          aria-label="Previous project"
        >
          <FiArrowLeft />
        </button>

        <div
          ref={tabsRef}
          className="ax-portfolio-tabs"
          role="tablist"
          aria-label="Portfolio projects"
        >
          {projects.map((project, index) => {
            const isActive = index === activeStation;
            return (
              <button
                key={project.id}
                className={`ax-clock-tab-pill ${isActive ? "is-active" : ""}`}
                onClick={() => goToStation(index)}
                role="tab"
                aria-selected={isActive}
              >
                <span>{project.name}</span>
              </button>
            );
          })}
        </div>

        <button
          className="ax-clock-arrow-btn"
          onClick={nextStation}
          aria-label="Next project"
        >
          <FiArrowRight />
        </button>
      </div>

      {/* 360-Degree Clock Drag Carousel Stage */}
      <div
        ref={stageRef}
        className={`ax-clock-stage ${isInteracting ? "is-dragging" : ""}`}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
      >
        {projects.map((project, index) => {
          const isActive = index === activeStation;
          return (
            <article
              key={project.id}
              ref={(el) => (cardRefs.current[index] = el)}
              className={`ax-clock-card ${project.cardClass} ${
                isActive ? "is-active-clock" : ""
              }`}
              style={{
                background: project.bg,
                color: project.isLight ? "#0f172a" : "#ffffff",
              }}
              onClick={(e) => handleCardClick(e, index)}
            >
              {/* Card Header matching Appinventiv */}
              <div className="ax-clock-card-top">
                <div className="ax-clock-card-brand">
                  <div
                    className="ax-clock-card-badge"
                    style={{
                      background: project.badgeBg,
                      color: project.badgeColor,
                    }}
                  >
                    <span>{project.badgeText}</span>
                  </div>
                  <h3
                    className="ax-clock-card-name"
                    style={{ color: project.isLight ? "#0f172a" : "#ffffff" }}
                  >
                    {project.name}
                  </h3>
                </div>

                <Link
                  href={project.href}
                  className={`ax-clock-card-cta ${
                    project.isLight ? "cta-dark" : "cta-light"
                  }`}
                  onClick={(e) => {
                    if (justDraggedRef.current || !isActive) {
                      e.preventDefault();
                      if (!isActive) goToStation(index);
                    }
                  }}
                >
                  <span>View case study</span>
                  <FiArrowRight />
                </Link>
              </div>

              {/* Pitch Description */}
              <p
                className="ax-clock-card-summary"
                style={{
                  color: project.isLight
                    ? "#334155"
                    : "rgba(255, 255, 255, 0.92)",
                }}
              >
                {project.summary}
              </p>

              {/* High-impact Metrics Callouts */}
              <div
                className="ax-clock-card-metrics"
                style={{
                  borderColor: project.isLight
                    ? "rgba(15, 23, 42, 0.12)"
                    : "rgba(255, 255, 255, 0.15)",
                }}
              >
                {project.metrics.map((m, mIdx) => (
                  <div key={mIdx} className="ax-clock-metric-item">
                    <span
                      className="ax-clock-metric-stat"
                      style={{
                        color: project.isLight ? "#0f172a" : "#ffffff",
                      }}
                    >
                      {m.stat}
                    </span>
                    <span
                      className="ax-clock-metric-label"
                      style={{
                        color: project.isLight
                          ? "#64748b"
                          : "rgba(255, 255, 255, 0.78)",
                      }}
                    >
                      {m.label}
                    </span>
                  </div>
                ))}
              </div>

              {/* Realistic 3D device render at base */}
              <div className="ax-clock-card-visual">
                <img
                  src={project.image}
                  alt={`${project.name} product interface`}
                  loading={index < 4 ? "eager" : "lazy"}
                  draggable="false"
                />
              </div>
            </article>
          );
        })}
      </div>

      {/* Indicator HUD */}
      <div className="ax-clock-hud">
        <div className="ax-clock-hud-left">
          <span>DRAG</span>
        </div>

        <div className="ax-clock-hud-ticks" aria-hidden="true">
          {projects.map((_, i) => (
            <button
              key={i}
              className={`ax-clock-tick ${
                i === activeStation ? "is-active-tick" : ""
              }`}
              onClick={() => goToStation(i)}
              aria-label={`Position ${i + 1}`}
            />
          ))}
        </div>

        <div className="ax-clock-hud-right">
          <span className="ax-clock-hud-station">
            {String(activeStation + 1).padStart(2, "0")} /{" "}
            {String(TOTAL_ITEMS).padStart(2, "0")}
          </span>
        </div>
      </div>

      {/* Footer link to all case studies */}
      <div className="ax-portfolio-all">
        <Link href="/case-studies">
          Explore all case studies <FiArrowRight />
        </Link>
      </div>
    </section>
  );
}
