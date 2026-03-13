import { useState } from "react";

const PROJECT_TYPES = [
  {
    id: "fixed",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Fixed-Price",
    desc: "Agreed total price upfront. Scope clearly defined.",
    points: ["Well-defined projects", "Specific deliverables", "Budget certainty"],
    badge: "Best match for your project",
    badgeStyle: { bg: "#e0e7ff", color: "#3b5bdb" },
    recommended: true,
  },
  {
    id: "hourly",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <circle cx="12" cy="12" r="10" strokeWidth="1.8"/>
        <path d="M12 6v6l4 2" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
    label: "Hourly",
    desc: "Pay based on time worked. More flexible scope.",
    points: ["Ongoing development", "Consulting work", "Maintenance projects"],
    badge: null,
  },
  {
    id: "retainer",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Retainer",
    desc: "Ongoing relationship. Monthly commitment.",
    points: ["Continuous development", "Maintenance + updates", "Team augmentation"],
    badge: "Good for post-launch",
    badgeStyle: { bg: "#dcfce7", color: "#16a34a" },
  },
];

const SCHEDULES = [
  {
    id: "milestone",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.8"/>
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="1.8"/>
      </svg>
    ),
    label: "Milestone-Based",
    sub: "Break project into stages, pay as each completes",
    tag: "Recommended",
    disabled: false,
  },
  {
    id: "single",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    label: "Single Payment",
    sub: "Not available for first project",
    tag: null,
    disabled: true,
  },
];

const MILESTONES = [
  { n: 1, phase: "Design & Planning",  desc: "Wireframes, UI/UX designs, Technical architecture",  duration: "3 weeks", pct: "20%",  amount: "$9,000"  },
  { n: 2, phase: "Core Development",   desc: "User auth, Listings, Order system",                   duration: "8 weeks", pct: "40%",  amount: "$18,000" },
  { n: 3, phase: "Advanced Features",  desc: "Payment integration, Real-time tracking, Notifications", duration: "6 weeks", pct: "30%", amount: "$13,500" },
  { n: 4, phase: "Testing & Launch",   desc: "QA testing, Bug fixes, Deployment",                   duration: "2 weeks", pct: "10%",  amount: "$4,500"  },
];

export default function Step9_PayModel({ formData, updateData, next, prev }) {
  const [projectType, setProjectType] = useState("fixed");
  const [schedule,    setSchedule]    = useState("milestone");

  const handleNext = () => {
    updateData({ projectType, schedule });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl p-8 sm:p-10"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
            How Do You Want to Structure This Project?
          </h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            Choose the payment model that matches your needs
          </p>

          {/* Badge */}
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-7"
                style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb", border: "1px solid #a5b4fc" }}>
            Payment Model
          </span>

          {/* ── Project Type ── */}
          <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>Project Type</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {PROJECT_TYPES.map(t => {
              const sel = projectType === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setProjectType(t.id)}
                  className="relative flex flex-col gap-3 p-5 rounded-2xl text-left transition-all"
                  style={{
                    border:          sel ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                    backgroundColor: sel ? "#f5f7ff" : "white",
                  }}
                >
                  {sel && (
                    <span className="absolute top-3 right-3" style={{ color: "#3b5bdb" }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}

                  <div className="w-10 h-10 rounded-xl flex items-center justify-center"
                       style={{ backgroundColor: "#e0e7ff" }}>
                    {t.icon}
                  </div>

                  <div className="font-extrabold text-sm" style={{ color: "#1e293b" }}>{t.label}</div>
                  <div className="text-xs" style={{ color: "#64748b" }}>{t.desc}</div>

                  <div className="flex flex-col gap-1">
                    {t.points.map(p => (
                      <div key={p} className="flex items-center gap-1.5 text-xs" style={{ color: "#22c55e" }}>
                        <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ color: "#475569" }}>{p}</span>
                      </div>
                    ))}
                  </div>

                  {t.badge && (
                    <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full w-fit"
                          style={{ backgroundColor: t.badgeStyle.bg, color: t.badgeStyle.color }}>
                      {t.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ── Payment Schedule ── */}
          <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>Payment Schedule</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
            {SCHEDULES.map(s => {
              const sel = schedule === s.id && !s.disabled;
              return (
                <button
                  key={s.id}
                  onClick={() => !s.disabled && setSchedule(s.id)}
                  disabled={s.disabled}
                  className="flex items-start gap-3 p-5 rounded-xl text-left transition-all"
                  style={{
                    border:          sel ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                    backgroundColor: sel ? "#f5f7ff" : s.disabled ? "#f8fafc" : "white",
                    cursor:          s.disabled ? "not-allowed" : "pointer",
                    opacity:         s.disabled ? 0.7 : 1,
                  }}
                >
                  <div className="mt-0.5 flex-shrink-0">{s.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-sm font-bold" style={{ color: s.disabled ? "#94a3b8" : "#1e293b" }}>
                        {s.label}
                      </span>
                      {s.tag && (
                        <span className="text-xs font-semibold px-2 py-0.5 rounded-full"
                              style={{ backgroundColor: "#dcfce7", color: "#16a34a" }}>
                          {s.tag}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center gap-1.5 text-xs" style={{ color: "#64748b" }}>
                      {s.disabled && (
                        <svg className="w-3.5 h-3.5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
                          <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                      {s.sub}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* ── Milestone Breakdown ── */}
          <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>Milestone Breakdown</h2>
          <div className="rounded-xl overflow-hidden mb-2"
               style={{ border: "1px solid #e2e8f0" }}>
            {MILESTONES.map((m, i) => (
              <div key={m.n}
                   className="flex items-center gap-4 px-5 py-4"
                   style={{
                     borderBottom: i < MILESTONES.length - 1 ? "1px solid #f1f5f9" : "none",
                     backgroundColor: "white",
                   }}>
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                     style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb" }}>
                  {m.n}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-bold" style={{ color: "#1e293b" }}>{m.phase}</div>
                  <div className="text-xs truncate" style={{ color: "#94a3b8" }}>{m.desc}</div>
                  <div className="text-xs mt-0.5" style={{ color: "#64748b" }}>
                    {m.duration} • {m.pct}
                  </div>
                </div>
                <div className="text-sm font-extrabold flex-shrink-0" style={{ color: "#1e293b" }}>
                  {m.amount}
                </div>
              </div>
            ))}
            {/* Total row */}
            <div className="flex justify-end px-5 py-3"
                 style={{ backgroundColor: "#f8fafc", borderTop: "1px solid #e2e8f0" }}>
              <span className="text-sm" style={{ color: "#64748b" }}>
                Total: <span className="font-extrabold text-base" style={{ color: "#1e293b" }}>$45,000</span>
              </span>
            </div>
          </div>

          {/* ── How Escrow Works ── */}
          <div className="rounded-xl px-6 py-5 mt-6"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="font-bold text-sm" style={{ color: "#1e293b" }}>How Escrow Works</span>
            </div>
            <ol className="flex flex-col gap-2 mb-4">
              {[
                "Your money goes into secure escrow (not to the provider)",
                "Work begins on each milestone",
                "You review and approve deliverables",
                "Payment released from escrow upon approval",
              ].map((s, i) => (
                <li key={i} className="flex items-start gap-2 text-sm" style={{ color: "#475569" }}>
                  <span className="font-semibold flex-shrink-0" style={{ color: "#3b5bdb" }}>{i + 1}.</span>
                  {s}
                </li>
              ))}
            </ol>
            <div className="flex items-center gap-2 flex-wrap">
              {["🔒 PCI DSS Compliant", "🔒 256-bit Encryption"].map(b => (
                <span key={b} className="text-xs font-semibold px-3 py-1 rounded-full"
                      style={{ backgroundColor: "#fefce8", color: "#854d0e", border: "1px solid #fde68a" }}>
                  {b}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev}
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#374151" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm"
            style={{ backgroundColor: "#3b5bdb" }}
          >
            Confirm Payment Structure
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT: AI Insights ══════════════════════════════ */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-sm" style={{ color: "#1e293b" }}>AI Insights</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Fixed-price with milestones is ideal for your project.
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Projects with milestones have 94% completion rate.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
