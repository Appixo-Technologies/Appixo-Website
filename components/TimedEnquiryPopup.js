"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import EnquiryForm from "@/components/EnquiryForm";

const SUBMITTED_KEY = "appixo_enquiry_submitted_v1";
const DISMISSED_KEY = "appixo_enquiry_dismissed_at_v1";
const FIRST_DELAY = 10 * 1000;
const REPEAT_DELAY = 5 * 60 * 1000;

export default function TimedEnquiryPopup() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const timerRef = useRef(null);

  useEffect(() => {
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready || pathname === "/enquiry") return;
    if (window.localStorage.getItem(SUBMITTED_KEY) === "true") return;

    const dismissedAt = Number(window.localStorage.getItem(DISMISSED_KEY) || 0);
    const elapsed = Date.now() - dismissedAt;
    const delay = dismissedAt ? Math.max(1500, REPEAT_DELAY - elapsed) : FIRST_DELAY;

    const schedule = (wait) => {
      window.clearTimeout(timerRef.current);
      timerRef.current = window.setTimeout(() => {
        if (document.querySelector(".ax-modal-shell") || document.visibilityState !== "visible") {
          schedule(60 * 1000);
          return;
        }
        setOpen(true);
      }, wait);
    };
    schedule(delay);
    return () => window.clearTimeout(timerRef.current);
  }, [pathname, ready]);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    const onKey = (event) => { if (event.key === "Escape") dismiss(); };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = previous; window.removeEventListener("keydown", onKey); };
  }, [open]);

  const dismiss = () => {
    window.localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setOpen(false);
    window.clearTimeout(timerRef.current);
    timerRef.current = window.setTimeout(() => {
      if (window.localStorage.getItem(SUBMITTED_KEY) !== "true" && pathname !== "/enquiry") setOpen(true);
    }, REPEAT_DELAY);
  };

  const completed = () => {
    window.localStorage.setItem(SUBMITTED_KEY, "true");
    window.localStorage.removeItem(DISMISSED_KEY);
    window.clearTimeout(timerRef.current);
    window.setTimeout(() => setOpen(false), 2400);
  };

  if (!ready || !open || pathname === "/enquiry") return null;

  return (
    <div className="ax-timed-popup" role="dialog" aria-modal="true" aria-labelledby="timed-enquiry-title" onMouseDown={(event) => { if (event.target === event.currentTarget) dismiss(); }}>
      <div className="ax-timed-popup-inner">
        <div className="ax-timed-popup-head">
          <div><span>Have a project in mind?</span><h2 id="timed-enquiry-title">Let&apos;s understand what you&apos;re building.</h2></div>
          <button type="button" onClick={dismiss} aria-label="Close enquiry form"><FiX /></button>
        </div>
        <div className="ax-timed-popup-body">
          <aside className="ax-timed-popup-visual">
            <img src="/media/enquiry-popup-workspace.png" alt="Product strategy and software planning workspace" />
            <div><span>A useful first conversation</span><h3>Bring the idea. We&apos;ll help shape the path.</h3><p>Get a senior-led response grounded in your goals, users, constraints, and timeline.</p></div>
          </aside>
          <div className="ax-timed-popup-scroll">
            <Suspense fallback={<div className="ax-timed-popup-loading">Preparing the form…</div>}>
              <EnquiryForm onSuccess={completed} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}
