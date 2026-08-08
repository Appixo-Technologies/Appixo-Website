"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { s, ic } from "@/lib/icons";
import { services } from "@/lib/siteData";

const checkIcon = ic('<path d="M20 6 9 17l-5-5"/>', 2.6);
const mailIcon = ic('<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 6L2 7"/>');
const replyIcon = ic('<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>');
const clockIcon = ic('<circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>');
const shieldIcon = ic('<path d="M12 2 4 6v6c0 5 3.5 8 8 10 4.5-2 8-5 8-10V6z"/>');

const locations = ["United States", "United Kingdom", "Canada", "Australia", "UAE", "India", "Spain", "Other"];

const whatNext = [
  { icon: mailIcon, text: "We'll review your request within one business day." },
  { icon: replyIcon, text: "Our team may follow up by email for a few clarifying details." },
  { icon: clockIcon, text: "You'll receive a tailored proposal or consultation slot." },
  { icon: shieldIcon, text: "Your information stays confidential, always." },
];

const inputStyle =
  "width:100%; padding:13px 16px; border-radius:11px; background:var(--surface2); border:1px solid var(--border); color:var(--head); font-size:14.5px; font-family:inherit;";
const labelStyle = "display:block; font-size:14px; font-weight:600; color:var(--head); margin-bottom:8px;";

export default function EnquiryForm() {
  const searchParams = useSearchParams();
  const preselected = services.some((sv) => sv.slug === searchParams.get("service")) ? searchParams.get("service") : "";

  const [mode, setMode] = useState("quote");
  const [location, setLocation] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    if (submitting) return;

    if (!location) {
      setError("Please select your location.");
      return;
    }

    const form = e.target;
    const data = new FormData(form);

    const message =
      mode === "quote"
        ? data.get("message")
        : `Preferred date: ${data.get("preferredDate") || "—"}\nPreferred time: ${data.get("preferredTime") || "—"}\n\n${data.get("notes") || ""}`.trim();

    const payload = {
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      company: data.get("company"),
      location,
      inquiryType: data.get("inquiryType"),
      mode,
      message,
    };

    setSubmitting(true);
    setError("");

    try {
      const res = await fetch("/api/enquiry", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(result.error || "Failed to send your enquiry.");
      setSubmitted(true);
    } catch (err) {
      setError(err.message || "Something went wrong — please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        style={s(
          "max-width:640px; margin:0 auto; padding:52px 32px; border-radius:20px; background:var(--surface); border:1px solid var(--border2); text-align:center;"
        )}
      >
        <div
          style={s(
            "width:56px; height:56px; margin:0 auto 22px; border-radius:50%; background:var(--goldsoft); border:1px solid var(--border2); display:flex; align-items:center; justify-content:center; color:var(--gold);"
          )}
        >
          {checkIcon}
        </div>
        <h2 style={s("margin:0 0 10px; font-size:24px; font-weight:800; color:var(--head);")}>Thanks — message received.</h2>
        <p style={s("margin:0; font-size:15px; color:var(--muted); line-height:1.6;")}>
          We&apos;ve got your details and will get back to you within one business day.
        </p>
      </div>
    );
  }

  return (
    <div className="ax-quote-grid" style={s("max-width:1080px; margin:0 auto; display:grid; grid-template-columns:1.45fr .75fr; gap:28px; align-items:start;")}>
      <form
        onSubmit={onSubmit}
        className="ax-enquiry-form"
        style={s(
          "padding:38px; border-radius:22px; background:linear-gradient(155deg,rgba(16,26,43,.96),rgba(10,15,26,.98)); border:1px solid var(--border); box-shadow:0 28px 70px -38px rgba(0,0,0,.75); display:flex; flex-direction:column; gap:22px;"
        )}
      >
        <div style={s("display:flex; gap:4px; border-bottom:1px solid var(--border); margin:-4px -4px 4px;")}>
          {[
            { key: "quote", label: "Share Project Brief" },
            { key: "consultation", label: "Book a Consultation" },
          ].map((tab) => (
            <button
              key={tab.key}
              type="button"
              onClick={() => setMode(tab.key)}
              style={s(
                `padding:12px 6px; margin-right:22px; background:none; border:none; border-bottom:2px solid ${mode === tab.key ? "var(--gold)" : "transparent"}; color:${mode === tab.key ? "var(--head)" : "var(--muted)"}; font-size:14.5px; font-weight:700; font-family:inherit; cursor:pointer;`
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div style={s("font-size:13px; font-weight:700; letter-spacing:.06em; text-transform:uppercase; color:var(--gold);")}>
          Your Details
        </div>

        <div className="ax-form-row-2" style={s("display:grid; grid-template-columns:1fr 1fr; gap:18px;")}>
          <div>
            <label style={s(labelStyle)}>
              Full Name <span style={s("color:var(--gold);")}>*</span>
            </label>
            <input required name="name" type="text" placeholder="John Doe" style={s(inputStyle)} disabled={submitting} />
          </div>
          <div>
            <label style={s(labelStyle)}>
              Email <span style={s("color:var(--gold);")}>*</span>
            </label>
            <input required name="email" type="email" placeholder="john@example.com" style={s(inputStyle)} disabled={submitting} />
          </div>
        </div>

        <div className="ax-form-row-2" style={s("display:grid; grid-template-columns:1fr 1fr; gap:18px;")}>
          <div>
            <label style={s(labelStyle)}>Phone</label>
            <input name="phone" type="tel" placeholder="+1 234 567 8900" style={s(inputStyle)} disabled={submitting} />
          </div>
          <div>
            <label style={s(labelStyle)}>Company</label>
            <input name="company" type="text" placeholder="Company name" style={s(inputStyle)} disabled={submitting} />
          </div>
        </div>

        <div>
          <label style={s(labelStyle)}>
            Location <span style={s("color:var(--gold);")}>*</span>
          </label>
          <select value={location} onChange={(e) => setLocation(e.target.value)} style={s(inputStyle)} disabled={submitting}>
            <option value="" disabled>Select your country or region</option>
            {locations.map((name) => <option key={name} value={name}>{name}</option>)}
          </select>
        </div>

        <div>
          <label style={s(labelStyle)}>
            Type of Inquiry <span style={s("color:var(--gold);")}>*</span>
          </label>
          <select required name="inquiryType" defaultValue={preselected} style={s(inputStyle)} disabled={submitting}>
            <option value="" disabled>
              Select type of inquiry
            </option>
            {["Development", "Design", "Solutions"].map((cat) => (
              <optgroup key={cat} label={cat}>
                {services
                  .filter((sv) => sv.category === cat)
                  .map((sv) => (
                    <option key={sv.slug} value={sv.slug}>
                      {sv.name}
                    </option>
                  ))}
              </optgroup>
            ))}
            <option value="general">General Inquiry</option>
            <option value="other">Other</option>
          </select>
        </div>

        {mode === "quote" ? (
          <div>
            <label style={s(labelStyle)}>
              Project Context <span style={s("color:var(--gold);")}>*</span>
            </label>
            <textarea
              required
              name="message"
              rows={5}                    
              placeholder="What are you building, who is it for, and what outcome matters most?"
              style={s(inputStyle + " resize:vertical;")}
              disabled={submitting}
            />
          </div>
        ) : (
          <>
            <div className="ax-form-row-2" style={s("display:grid; grid-template-columns:1fr 1fr; gap:18px;")}>
              <div>
                <label style={s(labelStyle)}>
                  Preferred Date <span style={s("color:var(--gold);")}>*</span>
                </label>
                <input required name="preferredDate" type="date" style={s(inputStyle)} disabled={submitting} />
              </div>
              <div>
                <label style={s(labelStyle)}>
                  Preferred Time <span style={s("color:var(--gold);")}>*</span>
                </label>
                <input required name="preferredTime" type="time" style={s(inputStyle)} disabled={submitting} />
              </div>
            </div>
            <div>
              <label style={s(labelStyle)}>Notes</label>
              <textarea
                name="notes"
                rows={4}
                placeholder="Anything you'd like us to know before the call..."
                style={s(inputStyle + " resize:vertical;")}
                disabled={submitting}
              />
            </div>
          </>
        )}

        {error && (
          <div
            style={s(
              "padding:12px 16px; border-radius:10px; background:rgba(220,38,38,0.12); border:1px solid rgba(220,38,38,0.3); color:#f87171; font-size:13.5px;"
            )}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          style={s(
            "padding:15px 26px; border-radius:12px; font-size:15.5px; font-weight:700; color:#0A0F1A; background:linear-gradient(135deg,var(--gold2),var(--gold)); box-shadow:0 14px 34px -12px rgba(212,175,55,0.55); border:none; cursor:pointer; font-family:inherit;"
          )}
        >
          {submitting ? "Sending..." : mode === "quote" ? "Submit Project Brief" : "Request Consultation"}
        </button>

        <p style={s("margin:0; font-size:12.5px; color:var(--muted); text-align:center;")}>
          By submitting this form, you agree to our{" "}
          <a href="/privacy-policy" style={s("color:var(--gold2);")}>
            Privacy Policy
          </a>
          .
        </p>
      </form>

      <aside className="ax-enquiry-aside" style={s("display:flex; flex-direction:column; gap:18px;")}>
        <div className="ax-enquiry-visual" style={s("position:relative; min-height:230px; overflow:hidden; border-radius:18px; border:1px solid var(--border);")}>
          <img src="/media/hero-product-studio.png" alt="Product engineering workspace" style={s("position:absolute; inset:0; width:100%; height:100%; object-fit:cover;")} />
          <div style={s("position:absolute; inset:0; background:linear-gradient(180deg,transparent 20%,rgba(5,9,16,.92));")} />
          <div style={s("position:absolute; left:22px; right:22px; bottom:20px;")}>
            <div style={s("font-size:11px; font-weight:700; letter-spacing:.12em; text-transform:uppercase; color:var(--gold);")}>A senior-led first response</div>
            <p style={s("margin:7px 0 0; color:#fff; font-size:14px; line-height:1.5;")}>No sales script. We review the brief before we reply.</p>
          </div>
        </div>
        <div style={s("padding:26px; border-radius:18px; background:var(--surface); border:1px solid var(--border);")}>
          <h3 style={s("margin:0 0 16px; font-size:16px; font-weight:700; color:var(--head);")}>What happens next</h3>
          <div style={s("display:flex; flex-direction:column; gap:14px;")}>
            {whatNext.map((item, i) => (
              <div key={i} style={s("display:flex; align-items:flex-start; gap:12px;")}>
                <span style={s("flex-shrink:0; color:var(--gold); margin-top:1px;")}>{item.icon}</span>
                <p style={s("margin:0; font-size:13.5px; color:var(--muted); line-height:1.55;")}>{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div style={s("padding:26px; border-radius:18px; background:var(--surface); border:1px solid var(--border);")}>
          <h3 style={s("margin:0 0 14px; font-size:16px; font-weight:700; color:var(--head);")}>Other Ways to Reach Us</h3>
          <a href="mailto:hello@appixotech.com" style={s("display:flex; align-items:center; gap:10px; font-size:14px; color:var(--gold2); font-weight:600;")}>
            <span style={s("color:var(--gold);")}>{mailIcon}</span>
            hello@appixotech.com
          </a>
        </div>
      </aside>
    </div>
  );
}
