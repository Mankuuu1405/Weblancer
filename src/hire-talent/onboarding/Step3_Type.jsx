import { useState } from "react";

const TYPES = [
  {
    id: "individual",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Individual",
    desc: "Personal projects, side hustles, or one-time needs",
    examples: "Portfolio website, mobile app idea, design work",
    badge: "Simplified process",
    badgeColor: { bg: "#e0e7ff", color: "#3b5bdb" },
    insight: "Individual accounts have a simplified, faster process.",
  },
  {
    id: "startup",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Startup / Small Business",
    desc: "Growing business with ongoing or scalable needs",
    examples: "MVP development, brand identity, marketing platform",
    badge: "Growth-focused",
    badgeColor: { bg: "#dcfce7", color: "#16a34a" },
    insight: "Startup accounts get access to vetted growth-focused freelancers.",
  },
  {
    id: "enterprise",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Enterprise / Company",
    desc: "Established organization with complex requirements",
    examples: "Enterprise software, internal tools, large-scale projects",
    badge: "Priority support",
    badgeColor: { bg: "#fef3c7", color: "#d97706" },
    insight: "Enterprise clients get a dedicated account manager and priority support.",
  },
];

const HOW_HELPS = [
  {
    text: "Better project complexity matching",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: "Accurate budget recommendations",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    text: "Appropriate talent suggestions",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.8"/>
        <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="1.8"/>
      </svg>
    ),
  },
  {
    text: "Faster admin response",
    icon: (
      <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
        <path d="M13 10V3L4 14h7v7l9-11h-7z"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
];

export default function Step3_Type({ formData, updateData, next, prev }) {
  const [selected, setSelected] = useState(formData?.clientType || "");

  const selectedType = TYPES.find(t => t.id === selected);

  const handleNext = () => {
    updateData({ clientType: selected });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT: Main card ══════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl p-8 sm:p-10"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
            Help Us Understand Your Needs
          </h1>
          <p className="text-sm mb-8" style={{ color: "#64748b" }}>
            This helps us recommend the right talent and support level
          </p>

          {/* ── 3 Type cards ── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {TYPES.map((t) => {
              const isSelected = selected === t.id;
              return (
                <button
                  key={t.id}
                  onClick={() => setSelected(t.id)}
                  className="relative flex flex-col gap-3 p-6 rounded-2xl text-left transition-all"
                  style={{
                    border:          isSelected ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                    backgroundColor: isSelected ? "#f5f7ff"           : "white",
                  }}
                >
                  {/* Selected tick */}
                  {isSelected && (
                    <span className="absolute top-3 right-3" style={{ color: "#3b5bdb" }}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                              strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </span>
                  )}

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                       style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb" }}>
                    {t.icon}
                  </div>

                  {/* Title */}
                  <div className="font-extrabold text-base" style={{ color: "#1e293b" }}>
                    {t.title}
                  </div>

                  {/* Description */}
                  <div className="text-sm" style={{ color: "#475569" }}>
                    {t.desc}
                  </div>

                  {/* Examples (italic) */}
                  <div className="text-xs italic" style={{ color: "#94a3b8" }}>
                    {t.examples}
                  </div>

                  {/* Badge */}
                  <span
                    className="inline-block text-xs font-semibold px-3 py-1 rounded-full w-fit mt-1"
                    style={{ backgroundColor: t.badgeColor.bg, color: t.badgeColor.color }}
                  >
                    {t.badge}
                  </span>
                </button>
              );
            })}
          </div>

          {/* ── How this helps you ── */}
          <div className="rounded-xl px-6 py-5"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
            <p className="text-sm font-bold mb-4" style={{ color: "#1e293b" }}>
              How this helps you:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {HOW_HELPS.map((h) => (
                <div key={h.text} className="flex items-center gap-2.5 text-sm" style={{ color: "#475569" }}>
                  {h.icon}
                  {h.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Nav buttons ── */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button
            onClick={prev}
            className="flex items-center gap-2 text-sm font-semibold"
            style={{ color: "#374151" }}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!selected}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
            style={{
              backgroundColor: selected ? "#3b5bdb" : "#93c5fd",
              cursor:          selected ? "pointer" : "not-allowed",
            }}
          >
            Continue to Profile
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

          {!selected ? (
            <p className="text-xs" style={{ color: "#94a3b8" }}>
              Select your client type to see tailored recommendations.
            </p>
          ) : (
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              {selectedType?.insight}
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
