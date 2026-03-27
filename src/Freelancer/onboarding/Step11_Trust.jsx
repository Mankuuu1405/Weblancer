





// import { useEffect, useState } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const SCORE = 78;

// const scoreCategories = [
//   { label: "Profile Completeness",  score: 18, max: 20, color: "bg-green-500" },
//   { label: "Identity Verification", score: 20, max: 20, color: "bg-green-500" },
//   { label: "Skills & Portfolio",    score: 16, max: 20, color: "bg-green-400" },
//   { label: "Payment Setup",         score: 20, max: 20, color: "bg-green-500" },
//   { label: "Social Proof",          score:  4, max: 20, color: "bg-green-400" },
// ];

// const tiers = [
//   { label: "New",       range: "0-40"  },
//   { label: "Basic",     range: "41-60" },
//   { label: "Rising",    range: "61-80" },
//   { label: "Top Rated", range: "81-90" },
//   { label: "Expert",    range: "91-100"},
// ];

// const canDo = [
//   "Apply to projects up to $10,000",
//   "Receive up to 5 invitations/week",
//   "Withdraw earnings (after KYC)",
//   "Use all messaging features",
// ];

// const limitations = [
//   "Projects over $10K require 1 completed project",
//   "Featured in search: Standard position",
//   '"Top Rated" badge: Need 3+ reviews',
// ];

// const topRatedBenefits = [
//   "Featured in AI matching first",
//   "Access enterprise projects",
//   "Reduced platform fee (8%)",
//   "Dedicated account manager",
// ];

// const quickWins = [
//   { label: "Add portfolio website", pts: 10 },
//   { label: "Connect LinkedIn",      pts: 15 },
//   { label: "Add live demo link",    pts:  4 },
//   { label: "Complete first project",pts: 15 },
// ];

// function ScoreGauge({ score, animated }) {
//   const size    = 160;
//   const cx      = size / 2;
//   const cy      = size / 2;
//   const r       = 62;
//   const circum  = 2 * Math.PI * r;
//   const pct     = animated ? score / 100 : 0;
//   const offset  = circum * (1 - pct);

//   const getColor = (s) => {
//     if (s <= 40) return "#6b7280";
//     if (s <= 60) return "#3b82f6";
//     if (s <= 80) return "#10b981";
//     if (s <= 90) return "#f59e0b";
//     return "#8b5cf6";
//   };
//   const color = getColor(score);

//   return (
//     <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
//       <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
//         <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/>
//         <circle
//           cx={cx} cy={cy} r={r}
//           fill="none"
//           stroke={color}
//           strokeWidth={10}
//           strokeLinecap="round"
//           strokeDasharray={circum}
//           strokeDashoffset={offset}
//           style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
//         />
//       </svg>
//       <div className="absolute flex flex-col items-center">
//         <span className="text-4xl font-black text-gray-900" style={{ lineHeight: 1 }}>{score}</span>
//       </div>
//     </div>
//   );
// }

// export default function Step11_Trust({ onNext, onBack, currentStep = 11, totalSteps = 12 }) {
//   const [animated, setAnimated] = useState(false);

//   useEffect(() => {
//     const t = setTimeout(() => setAnimated(true), 200);
//     return () => clearTimeout(t);
//   }, []);

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const getTierLabel = (s) => {
//     if (s <= 40) return "New";
//     if (s <= 60) return "Basic";
//     if (s <= 80) return "Rising Talent";
//     if (s <= 90) return "Top Rated";
//     return "Expert";
//   };
//   const tierLabel = getTierLabel(SCORE);

//   const insights = [
//     { status: "good", msg: `Trust score: ${SCORE}/100 — ${tierLabel}` },
//     { status: "tip",  msg: "Complete your first project to boost your score by +15." },
//     { status: "tip",  msg: "Reach 81+ to unlock Top Rated benefits and lower fees." },
//   ];

//   return (
//     <>
//       <style>{`
//         .wbl-bg, .wbl-btn-inline { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
//         .wbl-btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:8px; background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; color:#fff !important; border:none; cursor:pointer; font-weight:600; border-radius:12px; padding:12px 32px; font-size:15px; box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s; }
//         .wbl-btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
//         .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
//         .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
//         .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }
//         .wbl-text-active, .wbl-text-blue { color:#1B72C0 !important; }
//       `}</style>
//     <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F4F9FF" }}>

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
//         <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//             </svg>
//             <span className="hidden sm:inline">Save &amp; Exit</span>
//           </button>
//         </div>
//       </header>

//       {/* ── Progress Steps ── */}
//       <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
//         <div className="flex justify-between text-xs sm:text-sm mb-3">
//           <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
//           <span className="wbl-text-blue font-semibold">{percentComplete}% Complete</span>
//         </div>
//         <div className="relative flex items-start justify-between">
//           <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"/>
//           <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-bg z-0 rounded-full transition-all duration-500"
//             style={{ width: progressWidth }}/>
//           {stepLabels.map((label, index) => {
//             const isActive = index + 1 === currentStep;
//             const isDone   = index + 1 < currentStep;
//             return (
//               <div key={index} className="flex flex-col items-center z-10 relative">
//                 <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
//                   ${isActive ? "bg-white wbl-step-active shadow-md"
//                     : isDone  ? "wbl-bg border-green-400 text-white"
//                     :           "bg-white border-gray-300 text-gray-400"}`}>
//                   {isDone
//                     ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
//                       </svg>
//                     : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
//                 </div>
//                 <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
//                   ${isActive ? "wbl-text-active" : "text-gray-400"}`}>
//                   {label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Two-Column Layout ── */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="flex flex-col lg:flex-row gap-6 items-start">

//           {/* ── Main Card ── */}
//           <div className="w-full lg:flex-1 min-w-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

//               <h1 className="text-xl sm:text-2xl font-bold mb-1">Your Freelancer Trust Score</h1>
//               <p className="text-sm text-gray-500 mb-5">This determines which projects you're shown and how clients find you</p>

//               <div className="mb-7">
//                 <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                   {tierLabel}
//                 </span>
//               </div>

//               <div className="flex flex-col items-center py-4 mb-6">
//                 <ScoreGauge score={SCORE} animated={animated}/>
//                 <p className="text-xl font-bold text-gray-800 mt-3">{tierLabel}</p>

//                 <div className="flex items-center gap-2 sm:gap-4 mt-4 flex-wrap justify-center">
//                   {tiers.map((t) => {
//                     const active = tierLabel.toLowerCase().includes(t.label.toLowerCase()) ||
//                       (t.label === "Rising" && tierLabel === "Rising Talent");
//                     return (
//                       <span key={t.label}
//                         className={`text-xs font-semibold px-2 py-0.5 rounded-full transition
//                           ${active
//                             ? "text-green-700 bg-green-100 border border-green-300"
//                             : "text-gray-400"}`}>
//                         {t.label} ({t.range})
//                       </span>
//                     );
//                   })}
//                 </div>
//               </div>

//               <div className="space-y-4 mb-7">
//                 {scoreCategories.map((cat) => {
//                   const pct = (cat.score / cat.max) * 100;
//                   const full = cat.score === cat.max;
//                   return (
//                     <div key={cat.label}>
//                       <div className="flex items-center gap-2 mb-1.5">
//                         <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
//                           ${full ? "border-green-500 bg-white" : "border-gray-300 bg-white"}`}>
//                           {full && (
//                             <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
//                             </svg>
//                           )}
//                         </div>
//                         <span className="text-sm font-semibold text-gray-700 flex-1">{cat.label}</span>
//                         <span className="text-sm font-bold text-gray-700">{cat.score}/{cat.max}</span>
//                       </div>
//                       <div className="w-full bg-gray-100 rounded-full h-2 ml-7">
//                         <div
//                           className={`h-2 rounded-full transition-all duration-700 ${cat.color}`}
//                           style={{ width: animated ? `${pct}%` : "0%" }}
//                         />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-base">👁</span>
//                     <span className="text-sm font-bold text-gray-800">What You Can Do</span>
//                   </div>
//                   <ul className="space-y-2">
//                     {canDo.map((item) => (
//                       <li key={item} className="flex items-start gap-2 text-xs text-gray-700">
//                         <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>

//                 <div className="border border-gray-200 rounded-xl p-4">
//                   <div className="flex items-center gap-2 mb-3">
//                     <span className="text-base">🔒</span>
//                     <span className="text-sm font-bold text-gray-800">Current Limitations</span>
//                   </div>
//                   <ul className="space-y-2">
//                     {limitations.map((item) => (
//                       <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
//                         <span className="text-yellow-500 flex-shrink-0 mt-0.5">⚠</span>
//                         {item}
//                       </li>
//                     ))}
//                   </ul>
//                 </div>
//               </div>

//               <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 mb-5">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-base">⭐</span>
//                   <span className="text-sm font-bold text-gray-800">Top Rated Benefits (Unlock at 81+)</span>
//                 </div>
//                 <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
//                   {topRatedBenefits.map((b) => (
//                     <p key={b} className="text-xs text-gray-600">• {b}</p>
//                   ))}
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-xl p-4">
//                 <div className="flex items-center gap-2 mb-3">
//                   <span className="text-base">📈</span>
//                   <span className="text-sm font-bold text-gray-800">Quick Wins to Boost Score</span>
//                 </div>
//                 <div className="space-y-2">
//                   {quickWins.map((w) => (
//                     <div key={w.label} className="flex items-center gap-2.5">
//                       <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0"/>
//                       <span className="text-xs text-gray-600 flex-1">{w.label}</span>
//                       <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
//                         +{w.pts} pts
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between mt-6">
//               <button onClick={onBack}
//                 className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//                 ← Back
//               </button>
//               <button onClick={onNext}
//                 className="wbl-btn-inline text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
//                 Continue to Activation
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── AI Insights Panel ── */}
//           <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span className="font-bold text-gray-800 text-sm">AI Insights</span>
//               </div>

//               <div className="space-y-2">
//                 {insights.map((insight, i) => (
//                   <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium
//                     ${insight.status === "good"
//                       ? "bg-green-50 border border-green-100 text-green-800"
//                       : insight.status === "warn"
//                       ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
//                       : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
//                     {insight.status === "good" ? (
//                       <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                       </svg>
//                     )}
//                     {insight.msg}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <p className="text-xs font-semibold text-gray-600 mb-2">Score breakdown:</p>
//                 <div className="space-y-1.5">
//                   {scoreCategories.map((cat) => (
//                     <div key={cat.label} className="flex items-center justify-between text-xs">
//                       <span className="text-gray-500 truncate mr-2">{cat.label}</span>
//                       <span className={`font-bold flex-shrink-0 ${cat.score === cat.max ? "text-green-600" : "text-yellow-600"}`}>
//                         {cat.score}/{cat.max}
//                       </span>
//                     </div>
//                   ))}
//                 </div>
//                 <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs font-bold">
//                   <span className="text-gray-600">Total</span>
//                   <span className="text-green-600">{SCORE}/100</span>
//                 </div>
//                 <div className="mt-2 text-xs text-purple-700 bg-purple-50 border border-purple-100 rounded-lg px-2.5 py-2">
//                   🎯 Only <strong>{81 - SCORE} pts</strong> away from Top Rated!
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//     </>
//   );
// }








import { useEffect, useState } from "react";

const stepLabels =[
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const SCORE = 78;

const scoreCategories =[
  { label: "Profile Completeness",  score: 18, max: 20, color: "bg-green-500" },
  { label: "Identity Verification", score: 20, max: 20, color: "bg-green-500" },
  { label: "Skills & Portfolio",    score: 16, max: 20, color: "bg-green-400" },
  { label: "Payment Setup",         score: 20, max: 20, color: "bg-green-500" },
  { label: "Social Proof",          score:  4, max: 20, color: "bg-green-400" },
];

const tiers =[
  { label: "New",       range: "0-40"  },
  { label: "Basic",     range: "41-60" },
  { label: "Rising",    range: "61-80" },
  { label: "Top Rated", range: "81-90" },
  { label: "Expert",    range: "91-100"},
];

const canDo =[
  "Apply to projects up to $10,000",
  "Receive up to 5 invitations/week",
  "Withdraw earnings (after KYC)",
  "Use all messaging features",
];

const limitations =[
  "Projects over $10K require 1 completed project",
  "Featured in search: Standard position",
  '"Top Rated" badge: Need 3+ reviews',
];

const topRatedBenefits =[
  "Featured in AI matching first",
  "Access enterprise projects",
  "Reduced platform fee (8%)",
  "Dedicated account manager",
];

const quickWins =[
  { label: "Add portfolio website", pts: 10 },
  { label: "Connect LinkedIn",      pts: 15 },
  { label: "Add live demo link",    pts:  4 },
  { label: "Complete first project",pts: 15 },
];

function ScoreGauge({ score, animated }) {
  const size    = 160;
  const cx      = size / 2;
  const cy      = size / 2;
  const r       = 62;
  const circum  = 2 * Math.PI * r;
  const pct     = animated ? score / 100 : 0;
  const offset  = circum * (1 - pct);

  const getColor = (s) => {
    if (s <= 40) return "#6b7280";
    if (s <= 60) return "#3b82f6";
    if (s <= 80) return "#10b981";
    if (s <= 90) return "#f59e0b";
    return "#8b5cf6";
  };
  const color = getColor(score);

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth={10}/>
        <circle
          cx={cx} cy={cy} r={r}
          fill="none"
          stroke={color}
          strokeWidth={10}
          strokeLinecap="round"
          strokeDasharray={circum}
          strokeDashoffset={offset}
          style={{ transition: "stroke-dashoffset 1.2s ease-out" }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-4xl font-black text-gray-900" style={{ lineHeight: 1 }}>{score}</span>
      </div>
    </div>
  );
}

export default function Step11_Trust({ onNext, onBack, currentStep = 11, totalSteps = 12 }) {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setAnimated(true), 200);
    return () => clearTimeout(t);
  },[]);

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const getTierLabel = (s) => {
    if (s <= 40) return "New";
    if (s <= 60) return "Basic";
    if (s <= 80) return "Rising Talent";
    if (s <= 90) return "Top Rated";
    return "Expert";
  };
  const tierLabel = getTierLabel(SCORE);

  const insights =[
    { status: "good", msg: `Trust score: ${SCORE}/100 — ${tierLabel}` },
    { status: "tip",  msg: "Complete your first project to boost your score by +15." },
    { status: "tip",  msg: "Reach 81+ to unlock Top Rated benefits and lower fees." },
  ];

  return (
    <>
      <style>{`
        .wbl-bg, .wbl-btn-inline { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
        .wbl-btn-primary { display:inline-flex; align-items:center; justify-content:center; gap:8px; background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; color:#fff !important; border:none; cursor:pointer; font-weight:600; border-radius:12px; padding:12px 32px; font-size:15px; box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s; }
        .wbl-btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
        .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
        .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
        .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }
        .wbl-text-active, .wbl-text-blue { color:#1B72C0 !important; }
        /* Hide scrollbar for progress bar on mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F4F9FF" }}>

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="hidden sm:inline">Save &amp; Exit</span>
          </button>
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-3">
          <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="wbl-text-blue font-semibold">{percentComplete}% Complete</span>
        </div>
        
        {/* Responsive Progress Bar Wrapper */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
          <div className="relative flex items-start justify-between min-w-[500px] sm:min-w-0">
            <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"/>
            <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-bg z-0 rounded-full transition-all duration-500"
              style={{ width: progressWidth }}/>
            {stepLabels.map((label, index) => {
              const isActive = index + 1 === currentStep;
              const isDone   = index + 1 < currentStep;
              return (
                <div key={index} className="flex flex-col items-center z-10 relative">
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
                    ${isActive ? "bg-white wbl-step-active shadow-md"
                      : isDone  ? "wbl-bg border-green-400 text-white"
                      :           "bg-white border-gray-300 text-gray-400"}`}>
                    {isDone
                      ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
                  </div>
                  <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
                    ${isActive ? "wbl-text-active" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Your Freelancer Trust Score</h1>
              <p className="text-sm text-gray-500 mb-5">This determines which projects you're shown and how clients find you</p>

              <div className="mb-7">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  {tierLabel}
                </span>
              </div>

              <div className="flex flex-col items-center py-4 mb-6">
                <ScoreGauge score={SCORE} animated={animated}/>
                <p className="text-xl font-bold text-gray-800 mt-3 text-center">{tierLabel}</p>

                <div className="flex items-center gap-2 sm:gap-4 mt-4 flex-wrap justify-center">
                  {tiers.map((t) => {
                    const active = tierLabel.toLowerCase().includes(t.label.toLowerCase()) ||
                      (t.label === "Rising" && tierLabel === "Rising Talent");
                    return (
                      <span key={t.label}
                        className={`text-xs font-semibold px-2 py-0.5 rounded-full transition
                          ${active
                            ? "text-green-700 bg-green-100 border border-green-300"
                            : "text-gray-400"}`}>
                        {t.label} ({t.range})
                      </span>
                    );
                  })}
                </div>
              </div>

              <div className="space-y-4 mb-7">
                {scoreCategories.map((cat) => {
                  const pct = (cat.score / cat.max) * 100;
                  const full = cat.score === cat.max;
                  return (
                    <div key={cat.label}>
                      <div className="flex items-center gap-2 mb-1.5">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
                          ${full ? "border-green-500 bg-white" : "border-gray-300 bg-white"}`}>
                          {full && (
                            <svg className="w-3 h-3 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                            </svg>
                          )}
                        </div>
                        <span className="text-xs sm:text-sm font-semibold text-gray-700 flex-1">{cat.label}</span>
                        <span className="text-xs sm:text-sm font-bold text-gray-700">{cat.score}/{cat.max}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2 ml-7">
                        <div
                          className={`h-2 rounded-full transition-all duration-700 ${cat.color}`}
                          style={{ width: animated ? `${pct}%` : "0%" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Status Grid (Responsive) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">👁</span>
                    <span className="text-sm font-bold text-gray-800">What You Can Do</span>
                  </div>
                  <ul className="space-y-2">
                    {canDo.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-700">
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">🔒</span>
                    <span className="text-sm font-bold text-gray-800">Current Limitations</span>
                  </div>
                  <ul className="space-y-2">
                    {limitations.map((item) => (
                      <li key={item} className="flex items-start gap-2 text-xs text-gray-600">
                        <span className="text-yellow-500 flex-shrink-0 mt-0.5">⚠</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Top Rated Benefits (Responsive Grid) */}
              <div className="border border-yellow-200 bg-yellow-50 rounded-xl p-4 mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">⭐</span>
                  <span className="text-sm font-bold text-gray-800">Top Rated Benefits (Unlock at 81+)</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2">
                  {topRatedBenefits.map((b) => (
                    <p key={b} className="text-xs text-gray-600">• {b}</p>
                  ))}
                </div>
              </div>

              <div className="border border-gray-200 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-3">
                  <span className="text-base">📈</span>
                  <span className="text-sm font-bold text-gray-800">Quick Wins to Boost Score</span>
                </div>
                <div className="space-y-2">
                  {quickWins.map((w) => (
                    <div key={w.label} className="flex items-center gap-2.5">
                      <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0"/>
                      <span className="text-xs text-gray-600 flex-1">{w.label}</span>
                      <span className="text-xs font-bold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full whitespace-nowrap">
                        +{w.pts} pts
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* Navigation (Responsive Buttons) */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-6">
              <button onClick={onBack}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext}
                className="w-full sm:w-auto wbl-btn-inline text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm">
                Continue to Activation
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── AI Insights Panel ── */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-sm">AI Insights</span>
              </div>

              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium
                    ${insight.status === "good"
                      ? "bg-green-50 border border-green-100 text-green-800"
                      : insight.status === "warn"
                      ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
                      : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">Score breakdown:</p>
                <div className="space-y-1.5">
                  {scoreCategories.map((cat) => (
                    <div key={cat.label} className="flex items-center justify-between text-xs">
                      <span className="text-gray-500 truncate mr-2">{cat.label}</span>
                      <span className={`font-bold flex-shrink-0 ${cat.score === cat.max ? "text-green-600" : "text-yellow-600"}`}>
                        {cat.score}/{cat.max}
                      </span>
                    </div>
                  ))}
                </div>
                <div className="mt-3 pt-2 border-t border-gray-100 flex justify-between text-xs font-bold">
                  <span className="text-gray-600">Total</span>
                  <span className="text-green-600">{SCORE}/100</span>
                </div>
                <div className="mt-2 text-xs text-purple-700 bg-purple-50 border border-purple-100 rounded-lg px-2.5 py-2">
                  🎯 Only <strong>{81 - SCORE} pts</strong> away from Top Rated!
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}