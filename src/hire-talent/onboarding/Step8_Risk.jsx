import { useState } from "react";

/* ── Risk factor cards data ── */
const RISK_FACTORS = [
  {
    id: "budget",
    icon: "warning",
    title: "Budget vs Scope",
    level: "Medium-Low",
    levelColor: "#f97316",
    rightIcon: "dollar",
    desc: "Your estimated budget ($35K-$50K) is adequate for the described scope, but there's little room for scope changes.",
    points: [
      { type: "ok",      text: "Budget covers core features" },
      { type: "warning", text: "Limited buffer for changes" },
      { type: "warning", text: "Premium add-ons may exceed budget" },
    ],
    tip: "Consider increasing budget to $55K-$65K for flexibility.",
  },
  {
    id: "timeline",
    icon: "warning",
    title: "Timeline Feasibility",
    level: "Medium",
    levelColor: "#f97316",
    rightIcon: "clock",
    desc: "Your desired timeline may be aggressive for this scope. Typical projects of this size take 5-7 months.",
    points: [
      { type: "warning", text: "High pressure on development team" },
      { type: "warning", text: "May compromise quality" },
      { type: "warning", text: "Higher chance of delays" },
    ],
    tip: "Extend timeline to 6 months (recommended).",
  },
  {
    id: "scope",
    icon: "ok",
    title: "Scope vs Talent",
    level: "Low",
    levelColor: "#22c55e",
    rightIcon: "team",
    desc: null,
    points: [],
    tip: null,
  },
  {
    id: "firsttime",
    icon: "info",
    title: "First-Time Client",
    level: "Informational",
    levelColor: "#3b5bdb",
    rightIcon: "info",
    desc: null,
    points: [],
    tip: null,
  },
];

/* ── SVG helpers ── */
const RightIcon = ({ type }) => {
  const s = { fill: "none", stroke: "#94a3b8", strokeWidth: "1.8", strokeLinecap: "round", strokeLinejoin: "round" };
  if (type === "dollar") return (
    <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
      <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" {...s}/>
    </svg>
  );
  if (type === "clock") return (
    <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
      <circle cx="12" cy="12" r="10" {...s}/><path d="M12 6v6l4 2" {...s}/>
    </svg>
  );
  if (type === "team") return (
    <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
      <path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" {...s}/>
    </svg>
  );
  return (
    <svg className="w-5 h-5" fill="none" stroke="#94a3b8" viewBox="0 0 24 24">
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" {...s}/>
    </svg>
  );
};

const LeftIcon = ({ type, color }) => {
  if (type === "ok") return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={color} viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (type === "info") return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={color} viewBox="0 0 24 24">
      <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke={color} viewBox="0 0 24 24">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

const PointIcon = ({ type }) => {
  if (type === "ok") return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24">
      <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
};

/* ── Circular risk gauge — clockwise fill from 7:30 position ── */
function RiskGauge({ score = 6.5 }) {
  const cx = 90, cy = 90, r = 70;
  const TOTAL   = 270; // total arc degrees
  const START   = 135; // degrees clockwise from 3 o'clock (= 7:30 position)
  const fillDeg = (score / 10) * TOTAL;

  const toRad = d => (d * Math.PI) / 180;
  const pt = angle => ({
    x: +(cx + r * Math.cos(toRad(angle))).toFixed(2),
    y: +(cy + r * Math.sin(toRad(angle))).toFixed(2),
  });

  const s        = pt(START);
  const trackEnd = pt(START + TOTAL);    // 4:30 position
  const fillEnd  = pt(START + fillDeg);

  // sweep-flag = 1 → clockwise; large-arc depends on angle > 180
  const arc = (from, to, angle) =>
    `M ${from.x} ${from.y} A ${r} ${r} 0 ${angle > 180 ? 1 : 0} 1 ${to.x} ${to.y}`;

  return (
    <svg width="180" height="160" viewBox="0 0 180 160">
      {/* Gray track */}
      <path d={arc(s, trackEnd, TOTAL)}
            fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round"/>
      {/* Orange fill — clockwise from 7:30 upward */}
      <path d={arc(s, fillEnd, fillDeg)}
            fill="none" stroke="#f97316" strokeWidth="14" strokeLinecap="round"/>
      {/* Score text */}
      <text x={cx} y={cy - 4} textAnchor="middle"
            fontSize="28" fontWeight="800" fill="#1e293b">{score}</text>
      <text x={cx} y={cy + 16} textAnchor="middle"
            fontSize="13" fill="#94a3b8">/10</text>
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════ */
export default function Step8_Risk({ formData, updateData, next, prev }) {
  const [acknowledged, setAcknowledged] = useState(false);

  const handleNext = () => {
    updateData({ riskAcknowledged: acknowledged });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl p-8 sm:p-10"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
            Reality Check
          </h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            AI has analyzed your project for potential risks
          </p>

          {/* Badge */}
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
                style={{ backgroundColor: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa" }}>
            Risk Assessment
          </span>

          {/* ── Circular gauge ── */}
          <div className="rounded-2xl p-6 mb-6 flex flex-col items-center"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
            <p className="text-sm font-semibold mb-2" style={{ color: "#64748b" }}>Overall Risk Score</p>
            <RiskGauge score={6.5} />
            <span className="text-sm font-bold px-4 py-1 rounded-full mt-1"
                  style={{ backgroundColor: "#fff7ed", color: "#f97316", border: "1px solid #fed7aa" }}>
              Medium Risk
            </span>
          </div>

          {/* ── Risk factor cards ── */}
          <div className="flex flex-col gap-4 mb-6">
            {RISK_FACTORS.map(rf => (
              <div key={rf.id} className="rounded-xl p-5"
                   style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>

                {/* Card header */}
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <LeftIcon type={rf.icon} color={rf.levelColor} />
                    <div>
                      <span className="text-sm font-bold" style={{ color: "#1e293b" }}>{rf.title}</span>
                    </div>
                  </div>
                  <RightIcon type={rf.rightIcon} />
                </div>
                <span className="text-xs font-semibold ml-7" style={{ color: rf.levelColor }}>
                  {rf.level}
                </span>

                {/* Description */}
                {rf.desc && (
                  <p className="text-sm mt-3 mb-3" style={{ color: "#475569" }}>{rf.desc}</p>
                )}

                {/* Points */}
                {rf.points.length > 0 && (
                  <div className="flex flex-col gap-2 mb-3">
                    {rf.points.map(p => (
                      <div key={p.text} className="flex items-center gap-2 text-sm"
                           style={{ color: p.type === "ok" ? "#16a34a" : "#f97316" }}>
                        <PointIcon type={p.type} />
                        {p.text}
                      </div>
                    ))}
                  </div>
                )}

                {/* Tip box */}
                {rf.tip && (
                  <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm mt-2"
                       style={{ backgroundColor: "#fffbeb", border: "1px solid #fde68a", color: "#92400e" }}>
                    <span className="flex-shrink-0">💡</span>
                    {rf.tip}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Proceed with Adjustments card ── */}
          <div className="rounded-xl p-6 mb-6"
               style={{ border: "1px solid #fde68a", backgroundColor: "#fffbeb" }}>
            <div className="flex items-center gap-2 mb-3">
              <span>⚠️</span>
              <span className="font-bold" style={{ color: "#1e293b" }}>Proceed with Adjustments</span>
            </div>
            <p className="text-sm mb-4" style={{ color: "#78350f" }}>
              Your project has some risk factors. Consider the suggestions before continuing.
            </p>
            <ul className="flex flex-col gap-2">
              {[
                "Increase budget by 20% for flexibility",
                "Extend timeline by 6-8 weeks",
                "Reduce initial feature set",
              ].map(s => (
                <li key={s} className="flex items-start gap-2 text-sm" style={{ color: "#78350f" }}>
                  <span className="mt-0.5 flex-shrink-0">•</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Acknowledge + Go Back row */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <button
              onClick={prev}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all flex-shrink-0"
              style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#374151" }}
              onMouseOver={e => e.currentTarget.style.borderColor = "#3b5bdb"}
              onMouseOut={e  => e.currentTarget.style.borderColor = "#e2e8f0"}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Go Back &amp; Edit
            </button>

            <label className="flex items-center gap-3 text-sm cursor-pointer flex-1"
                   style={{ color: "#374151" }}>
              <input
                type="checkbox"
                checked={acknowledged}
                onChange={e => setAcknowledged(e.target.checked)}
                className="w-4 h-4 rounded flex-shrink-0"
                style={{ accentColor: "#3b5bdb" }}
              />
              I understand the risks and want to proceed as-is
            </label>
          </div>
        </div>

        {/* ── Bottom nav ── */}
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
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
            style={{ backgroundColor: "#3b5bdb" }}
          >
            Apply AI Recommendations
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
                 style={{ backgroundColor: "#fff7ed", border: "1px solid #fed7aa", color: "#c2410c" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24">
                <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Project has some risk factors. Review suggestions below.
            </div>

            <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Talent type matches project complexity.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
