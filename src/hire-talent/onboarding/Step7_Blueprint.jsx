import { useState } from "react";

const TABS = ["Summary", "Scope", "Talent"];

/* ── Summary tab data ── */
const FEATURES = [
  { name: "User Registration & Login", tag: "essential",    on: true  },
  { name: "Browse & Search",           tag: "essential",    on: true  },
  { name: "Product/Menu Display",      tag: "essential",    on: true  },
  { name: "Shopping Cart",             tag: "essential",    on: true  },
  { name: "Order Placement",           tag: "essential",    on: true  },
  { name: "Real-time Tracking",        tag: "recommended",  on: true  },
  { name: "Push Notifications",        tag: "recommended",  on: true  },
  { name: "Payment Integration",       tag: "essential",    on: true  },
  { name: "In-app Chat",               tag: "optional",     on: false },
  { name: "Reviews & Ratings",         tag: "optional",     on: false },
];

const TAG_STYLE = {
  essential:   { bg: "#fef2f2", color: "#ef4444", border: "#fecaca" },
  recommended: { bg: "#fff7ed", color: "#f97316", border: "#fed7aa" },
  optional:    { bg: "#f0fdf4", color: "#22c55e", border: "#bbf7d0" },
};

/* ── Scope tab data ── */
const TIMELINE = [
  { n: 1, phase: "Discovery & Planning", duration: "2-3 weeks",   pct: 10 },
  { n: 2, phase: "Design",               duration: "4-6 weeks",   pct: 20 },
  { n: 3, phase: "Development",          duration: "12-16 weeks", pct: 50 },
  { n: 4, phase: "Testing & Launch",     duration: "2-4 weeks",   pct: 20 },
];

const BUDGETS = [
  { label: "Conservative", range: "$25K–$35K" },
  { label: "Realistic",    range: "$35K–$50K" },
  { label: "Comfortable",  range: "$50K–$75K" },
];

/* ── Talent tab data ── */
const COMPARISON = [
  { criteria: "Cost",     agency: "$$$",  hybrid: "$$",     freelancer: "$"      },
  { criteria: "Timeline", agency: "Fast", hybrid: "Medium", freelancer: "Slow"   },
  { criteria: "Quality",  agency: "High", hybrid: "Medium", freelancer: "Varies" },
  { criteria: "Risk",     agency: "Low",  hybrid: "Medium", freelancer: "Higher" },
];

/* ──────────────────────────────────────── */
export default function Step7_Blueprint({ formData, updateData, next, prev }) {
  const [activeTab, setActiveTab]     = useState("Summary");
  const [features,  setFeatures]      = useState(FEATURES);
  const [budgetIdx, setBudgetIdx]     = useState(1); // Realistic selected

  const toggleFeature = (i) =>
    setFeatures(prev => prev.map((f, idx) => idx === i ? { ...f, on: !f.on } : f));

  const handleNext = () => {
    updateData({ blueprint: { features, budgetIdx } });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          {/* Header */}
          <div className="px-8 pt-8 pb-5">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
              Your Project Blueprint
            </h1>
            <p className="text-sm mb-5" style={{ color: "#64748b" }}>
              AI has created a comprehensive project plan based on your conversation
            </p>

            {/* Badge + subtitle */}
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-3"
                  style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb", border: "1px solid #a5b4fc" }}>
              Blueprint
            </span>
            <div className="flex items-center gap-2 text-xs mb-0" style={{ color: "#94a3b8" }}>
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              AI-generated based on your conversation • Fully editable
            </div>
          </div>

          {/* ── Tabs ── */}
          <div className="grid grid-cols-3 mx-6 mb-0 rounded-xl overflow-hidden"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#f8fafc" }}>
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className="py-3 text-sm font-semibold transition-all"
                style={{
                  backgroundColor: activeTab === tab ? "white"   : "transparent",
                  color:           activeTab === tab ? "#1e293b" : "#94a3b8",
                  boxShadow:       activeTab === tab ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                }}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* ── Tab content ── */}
          <div className="px-6 pb-6 pt-5">

            {/* ══ SUMMARY TAB ══ */}
            {activeTab === "Summary" && (
              <div className="flex flex-col gap-6">
                {/* Project Overview */}
                <div className="rounded-xl p-5"
                     style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
                  <h3 className="font-bold mb-2" style={{ color: "#1e293b" }}>Project Overview</h3>
                  <p className="text-sm leading-relaxed" style={{ color: "#475569" }}>
                    A mobile application that connects local restaurants with customers. Users can browse
                    menus, place orders, track deliveries in real-time, and make secure payments. Restaurants
                    will have a separate dashboard to manage orders.
                  </p>
                </div>

                {/* Key Features */}
                <div>
                  <h3 className="font-bold mb-4" style={{ color: "#1e293b" }}>Key Features</h3>
                  <div className="flex flex-col gap-0 divide-y" style={{ borderTop: "1px solid #f1f5f9" }}>
                    {features.map((f, i) => {
                      const ts = TAG_STYLE[f.tag];
                      return (
                        <div key={f.name}
                             className="flex items-center justify-between py-3.5 gap-3">
                          <div className="flex items-center gap-3">
                            <button onClick={() => toggleFeature(i)} className="flex-shrink-0">
                              {f.on ? (
                                <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                              ) : (
                                <div className="w-5 h-5 rounded-full"
                                     style={{ border: "1.5px solid #d1d5db" }}/>
                              )}
                            </button>
                            <span className="text-sm"
                                  style={{
                                    color: f.on ? "#1e293b" : "#94a3b8",
                                    textDecoration: f.on ? "none" : "line-through",
                                  }}>
                              {f.name}
                            </span>
                          </div>
                          <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full flex-shrink-0"
                                style={{ backgroundColor: ts.bg, color: ts.color, border: `1px solid ${ts.border}` }}>
                            {f.tag}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Action buttons */}
                <ActionButtons />
              </div>
            )}

            {/* ══ SCOPE TAB ══ */}
            {activeTab === "Scope" && (
              <div className="flex flex-col gap-6">

                {/* Complexity */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold" style={{ color: "#1e293b" }}>Complexity Level</span>
                    <span className="font-bold text-sm" style={{ color: "#f97316" }}>Medium-High</span>
                  </div>
                  <div className="w-full h-3 rounded-full" style={{ backgroundColor: "#e2e8f0" }}>
                    <div className="h-full rounded-full" style={{ width: "72%", backgroundColor: "#3b5bdb" }}/>
                  </div>
                </div>

                {/* Timeline */}
                <div className="rounded-xl p-5"
                     style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" strokeWidth="1.8"/>
                      <path d="M12 6v6l4 2" strokeWidth="1.8" strokeLinecap="round"/>
                    </svg>
                    <span className="font-bold" style={{ color: "#1e293b" }}>Timeline</span>
                  </div>
                  <div className="flex flex-col gap-0 divide-y" style={{ borderTop: "1px solid #f1f5f9" }}>
                    {TIMELINE.map(t => (
                      <div key={t.n} className="flex items-center gap-4 py-3.5">
                        <div className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0"
                             style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb" }}>
                          {t.n}
                        </div>
                        <div className="flex-1">
                          <div className="text-sm font-semibold" style={{ color: "#1e293b" }}>{t.phase}</div>
                          <div className="text-xs" style={{ color: "#94a3b8" }}>{t.duration}</div>
                        </div>
                        <span className="text-sm font-bold" style={{ color: "#64748b" }}>{t.pct}%</span>
                      </div>
                    ))}
                  </div>
                  <div className="pt-3 mt-1 text-sm" style={{ borderTop: "1px solid #e2e8f0", color: "#475569" }}>
                    Total: <span className="font-bold" style={{ color: "#1e293b" }}>20-29 weeks (5-7 months)</span>
                  </div>
                </div>

                {/* Estimated Budget */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <span className="font-bold" style={{ color: "#1e293b" }}>Estimated Budget</span>
                  </div>
                  <div className="grid grid-cols-3 gap-3">
                    {BUDGETS.map((b, i) => (
                      <button
                        key={b.label}
                        onClick={() => setBudgetIdx(i)}
                        className="flex flex-col items-center gap-1 py-4 rounded-xl transition-all"
                        style={{
                          border:          budgetIdx === i ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                          backgroundColor: budgetIdx === i ? "white"             : "#fafafa",
                        }}
                      >
                        <span className="text-xs" style={{ color: "#94a3b8" }}>{b.label}</span>
                        <span className="text-base font-extrabold" style={{ color: "#1e293b" }}>{b.range}</span>
                      </button>
                    ))}
                  </div>
                </div>

                <ActionButtons />
              </div>
            )}

            {/* ══ TALENT TAB ══ */}
            {activeTab === "Talent" && (
              <div className="flex flex-col gap-6">

                {/* Recommendation card */}
                <div className="rounded-xl p-5"
                     style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
                  <div className="flex items-center gap-2 mb-4">
                    <span className="text-lg">🎯</span>
                    <span className="font-bold" style={{ color: "#1e293b" }}>Recommended: Agency</span>
                  </div>
                  <div className="flex flex-col gap-2">
                    {[
                      "Project complexity requires team coordination",
                      "Multi-platform development needed",
                      "Design services required",
                      "Budget supports agency pricing",
                    ].map(r => (
                      <div key={r} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                          <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                                strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        {r}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Comparison table */}
                <div className="rounded-xl overflow-hidden"
                     style={{ border: "1px solid #e2e8f0" }}>
                  {/* Header */}
                  <div className="grid grid-cols-4 px-4 py-3"
                       style={{ backgroundColor: "#f8fafc", borderBottom: "1px solid #e2e8f0" }}>
                    <span className="text-sm font-semibold" style={{ color: "#94a3b8" }}>Criteria</span>
                    {[
                      { label: "Agency",     icon: "🏢", color: "#3b5bdb" },
                      { label: "Hybrid",     icon: "👥", color: "#f97316" },
                      { label: "Freelancer", icon: "👤", color: "#22c55e" },
                    ].map(col => (
                      <div key={col.label} className="flex flex-col items-center gap-1">
                        <span className="text-lg">{col.icon}</span>
                        <span className="text-xs font-bold" style={{ color: col.color }}>{col.label}</span>
                      </div>
                    ))}
                  </div>
                  {/* Rows */}
                  {COMPARISON.map((row, i) => (
                    <div
                      key={row.criteria}
                      className="grid grid-cols-4 px-4 py-3.5 text-sm"
                      style={{
                        borderBottom: i < COMPARISON.length - 1 ? "1px solid #f1f5f9" : "none",
                        backgroundColor: "white",
                      }}
                    >
                      <span className="font-semibold" style={{ color: "#374151" }}>{row.criteria}</span>
                      <span className="text-center font-bold" style={{ color: "#3b5bdb" }}>{row.agency}</span>
                      <span className="text-center" style={{ color: "#64748b" }}>{row.hybrid}</span>
                      <span className="text-center" style={{ color: "#94a3b8" }}>{row.freelancer}</span>
                    </div>
                  ))}
                </div>

                <ActionButtons />
              </div>
            )}
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
            Looks Good — Continue
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
              Blueprint generated from AI conversation.
            </div>

            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Review features and adjust before continuing.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

/* ── Shared Download PDF / Share Link buttons ── */
function ActionButtons() {
  return (
    <div className="flex items-center gap-3 pt-2">
      <button
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#374151" }}
        onMouseOver={e => e.currentTarget.style.borderColor = "#3b5bdb"}
        onMouseOut={e  => e.currentTarget.style.borderColor = "#e2e8f0"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Download PDF
      </button>
      <button
        className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all"
        style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#374151" }}
        onMouseOver={e => e.currentTarget.style.borderColor = "#3b5bdb"}
        onMouseOut={e  => e.currentTarget.style.borderColor = "#e2e8f0"}
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"
                strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        Share Link
      </button>
    </div>
  );
}
