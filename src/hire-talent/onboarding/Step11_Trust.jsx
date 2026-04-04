// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// const SCORE_BREAKDOWN = [
//   { label: "Account Verification", score: 20, max: 20 },
//   { label: "Profile Completeness",  score: 18, max: 20 },
//   { label: "Payment Readiness",     score: 20, max: 20 },
//   { label: "Project Definition",    score: 15, max: 20 },
//   { label: "Behavioral Score",      score:  2, max: 20 },
// ];

// const WHAT_YOU_CAN = [
//   { ok: true,  text: "Max Project Budget: $75,000" },
//   { ok: true,  text: "Up to 5 concurrent projects" },
//   { ok: true,  text: "Browse all service providers" },
//   { ok: true,  text: "Direct messaging" },
//   { ok: true,  text: "Milestone payments" },
//   { ok: false, text: "Single payment (< $5,000 only)" },
// ];

// const QUICK_WINS = [
//   {
//     label: "+2 points",
//     title: "Add LinkedIn Profile",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//         <circle cx="4" cy="4" r="2" strokeWidth="1.8"/>
//       </svg>
//     ),
//   },
//   {
//     label: "+3 points",
//     title: "Complete Company Verification",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//   },
//   {
//     label: "+3 points",
//     title: "Add Project References",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//   },
// ];

// /* Trust gauge using CSS conic-gradient — clockwise from top (12 o'clock) */
// function TrustGauge({ score = 75 }) {
//   const size      = 150;
//   const thickness = 14;
//   const inner     = size / 2 - thickness;
//   // Start at top (270deg in conic), clockwise
//   // Full circle = 360°, score/100 * 360 = fill
//   const fillDeg = (score / 100) * 360;

//   const gradient = `conic-gradient(
//     from 270deg,
//     #3b5bdb 0deg ${fillDeg}deg,
//     #e2e8f0 ${fillDeg}deg 360deg
//   )`;

//   const mask = `radial-gradient(circle, transparent ${inner}px, black ${inner + 1}px, black ${size / 2}px, transparent ${size / 2 + 1}px)`;

//   return (
//     <div style={{ position: "relative", width: size, height: size }}>
//       <div style={{
//         width: size, height: size,
//         borderRadius: "50%",
//         background: gradient,
//         WebkitMask: mask,
//         mask,
//       }} />
//       <div style={{
//         position: "absolute", inset: 0,
//         display: "flex", flexDirection: "column",
//         alignItems: "center", justifyContent: "center",
//       }}>
//         <span style={{ fontSize: 32, fontWeight: 800, color: "#1e293b", lineHeight: 1 }}>{score}</span>
//         <span style={{ fontSize: 13, color: "#94a3b8" }}>/100</span>
//       </div>
//     </div>
//   );
// }

// export default function Step11_Trust({ updateData, next, prev }) {
//   const [canContinue] = useState(true);

//   const navigate = useNavigate();

//    const handleRole = (role)=>{
//     localStorage.setItem("role",role);
//     navigate('/signin');
//   }

//   return (
//     <div className="flex gap-6 items-start">

//       {/* ══ LEFT ════════════════════════════════════════════ */}
//       <div className="flex-1 min-w-0">
//         <div className="rounded-2xl p-8 sm:p-10"
//              style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

//           <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
//             Your Account Trust Level
//           </h1>
//           <p className="text-sm mb-6" style={{ color: "#64748b" }}>
//             Based on your profile and verification, here's your current standing
//           </p>

//           {/* Badge */}
//           <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-7"
//                 style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb", border: "1px solid #a5b4fc" }}>
//             Trusted Client
//           </span>

//           {/* ── Trust gauge card ── */}
//           <div className="rounded-2xl p-8 mb-8 flex flex-col items-center gap-4"
//                style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//             <TrustGauge score={75} />

//             {/* Badge + level label */}
//             <div className="flex flex-col items-center gap-1">
//               <div className="flex items-center gap-2">
//                 <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
//                         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 <span className="font-extrabold text-base" style={{ color: "#1e293b" }}>Trusted Client</span>
//               </div>

//               {/* Level progression */}
//               <div className="flex items-center gap-2 text-sm mt-1">
//                 {["New", "Basic", "Trusted", "Elite"].map((lvl, i, arr) => (
//                   <span key={lvl} className="flex items-center gap-2">
//                     <span
//                       style={{
//                         color: lvl === "Trusted" ? "#3b5bdb" : "#94a3b8",
//                         fontWeight: lvl === "Trusted" ? 700 : 400,
//                         textDecoration: lvl === "Trusted" ? "underline" : "none",
//                       }}
//                     >
//                       {lvl}
//                     </span>
//                     {i < arr.length - 1 && <span style={{ color: "#cbd5e1" }}>→</span>}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>

//           {/* ── Score Breakdown ── */}
//           <h2 className="text-base font-bold mb-5" style={{ color: "#1e293b" }}>Score Breakdown</h2>
//           <div className="flex flex-col gap-4 mb-8">
//             {SCORE_BREAKDOWN.map(s => (
//               <div key={s.label}>
//                 <div className="flex items-center justify-between mb-1.5">
//                   <span className="text-sm" style={{ color: "#374151" }}>{s.label}</span>
//                   <span className="text-sm font-bold" style={{ color: "#3b5bdb" }}>
//                     {s.score}/{s.max}
//                   </span>
//                 </div>
//                 <div className="w-full h-2 rounded-full" style={{ backgroundColor: "#e2e8f0" }}>
//                   <div
//                     className="h-full rounded-full"
//                     style={{
//                       width: `${(s.score / s.max) * 100}%`,
//                       backgroundColor: "#3b5bdb",
//                     }}
//                   />
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* ── What You Can Do ── */}
//           <div className="rounded-xl px-6 py-5 mb-6"
//                style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//             <h3 className="font-bold mb-4 text-sm" style={{ color: "#1e293b" }}>What You Can Do</h3>
//             <div className="flex flex-col gap-2.5">
//               {WHAT_YOU_CAN.map(w => (
//                 <div key={w.text} className="flex items-center gap-2 text-sm"
//                      style={{ color: w.ok ? "#475569" : "#f97316" }}>
//                   {w.ok ? (
//                     <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
//                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   ) : (
//                     <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24">
//                       <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   )}
//                   {w.text}
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* ── First Project Restrictions ── */}
//           <div className="rounded-xl px-6 py-5 mb-8"
//                style={{ border: "1px solid #fde68a", backgroundColor: "#fffbeb" }}>
//             <div className="flex items-center gap-2 mb-3">
//               <span>🛡️</span>
//               <span className="font-bold text-sm" style={{ color: "#1e293b" }}>First Project Restrictions</span>
//             </div>
//             <div className="flex items-center flex-wrap gap-1 text-sm mb-2" style={{ color: "#78350f" }}>
//               <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24">
//                 <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
//                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <span>Admin auto-monitoring • Milestone payments only • Budget cap: $50,000</span>
//             </div>
//             <p className="text-xs" style={{ color: "#92400e" }}>
//               These lift after 1 successful project completion.
//             </p>
//           </div>

//           {/* ── Quick Wins ── */}
//           <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>
//             Quick Wins to Improve Score
//           </h2>
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//             {QUICK_WINS.map(w => (
//               <button
//                 key={w.title}
//                 className="flex flex-col gap-3 p-5 rounded-xl text-left transition-all"
//                 style={{ border: "1px solid #e2e8f0", backgroundColor: "white" }}
//                 onMouseOver={e => { e.currentTarget.style.borderColor = "#3b5bdb"; e.currentTarget.style.backgroundColor = "#f5f7ff"; }}
//                 onMouseOut={e  => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.backgroundColor = "white"; }}
//               >
//                 {w.icon}
//                 <div>
//                   <div className="text-sm font-bold" style={{ color: "#1e293b" }}>{w.title}</div>
//                   <div className="text-xs font-semibold mt-0.5" style={{ color: "#3b5bdb" }}>{w.label}</div>
//                 </div>
//               </button>
//             ))}
//           </div>
//         </div>

//         {/* Nav buttons */}
//        <div className="flex items-center justify-between mt-6 pb-10">
//           <button onClick={prev}
//                   className="flex items-center gap-2 text-sm font-semibold"
//                   style={{ color: "#374151" }}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Back
//           </button>

//           <button
//             onClick={()=>handleRole("Hire_talent")}
//             disabled={!canContinue}
//             className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
//             style={{
//               backgroundColor: canContinue ? "#3b5bdb" : "#93c5fd",
//               cursor: canContinue ? "pointer" : "not-allowed",
//             }}
//           >
//            Sign in →
//           </button>
//         </div>
//       </div>

//       {/* ══ RIGHT: AI Insights ══════════════════════════════ */}
//       <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
//         <div className="rounded-2xl p-5"
//              style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>
//           <div className="flex items-center gap-2 mb-4">
//             <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//               <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             <span className="font-bold text-sm" style={{ color: "#1e293b" }}>AI Insights</span>
//           </div>
//           <div className="flex flex-col gap-3">
//             <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
//                  style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
//               <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
//                 <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                       strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Trust score: 75/100 — Trusted Client level.
//             </div>
//             <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
//                  style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
//               <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               You're in the top 25% of new clients!
//             </div>
//           </div>
//         </div>
//       </div>

//     </div>
//   );
// }









// Step11_Trust.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  gradGreen:"linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af",
};

const SCORE_BREAKDOWN = [
  { label:"Account Verification", score:20, max:20 },
  { label:"Profile Completeness",  score:18, max:20 },
  { label:"Payment Readiness",     score:20, max:20 },
  { label:"Project Definition",    score:15, max:20 },
  { label:"Behavioral Score",      score:2,  max:20 },
];

const WHAT_YOU_CAN = [
  { ok:true,  text:"Max Project Budget: $75,000"  },
  { ok:true,  text:"Up to 5 concurrent projects"  },
  { ok:true,  text:"Browse all service providers" },
  { ok:true,  text:"Direct messaging"             },
  { ok:true,  text:"Milestone payments"           },
  { ok:false, text:"Single payment (< $5,000 only)" },
];

const QUICK_WINS = [
  { label:"+2 points", title:"Add LinkedIn Profile",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/><circle cx="4" cy="4" r="2" strokeWidth="1.8"/></svg> },
  { label:"+3 points", title:"Complete Company Verification",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { label:"+3 points", title:"Add Project References",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

function TrustGauge({ score=75 }) {
  const size=150, thickness=14, inner=size/2-thickness;
  const fillDeg = (score/100)*360;
  const gradient = `conic-gradient(from 270deg, #4A6FA5 0deg ${fillDeg}deg, #e2e8f0 ${fillDeg}deg 360deg)`;
  const mask = `radial-gradient(circle, transparent ${inner}px, black ${inner+1}px, black ${size/2}px, transparent ${size/2+1}px)`;
  return (
    <div style={{ position:"relative", width:size, height:size }}>
      <div style={{ width:size, height:size, borderRadius:"50%", background:gradient, WebkitMask:mask, mask }}/>
      <div style={{ position:"absolute", inset:0, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center" }}>
        <span style={{ fontSize:32, fontWeight:800, color:G.navyDeep, lineHeight:1 }}>{score}</span>
        <span style={{ fontSize:13, color:G.muted }}>/100</span>
      </div>
    </div>
  );
}

export default function Step11_Trust({ updateData, next, prev }) {
  const [canContinue] = useState(true);
  const navigate = useNavigate();
  const handleRole = role => { localStorage.setItem("role", role); navigate("/signin"); };

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 4px 24px rgba(110,192,48,0.08)" }}>
          <div style={{ height:4, background:G.mixedGrad }}/>
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color:G.navyDeep }}>Your Account Trust Level</h1>
            <p className="text-sm mb-6" style={{ color:G.sub }}>Based on your profile and verification, here's your current standing</p>

            {/* Badge — Navy */}
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-7"
              style={{ backgroundColor:G.navyBg, color:G.navy, border:`1px solid ${G.navyBorder}` }}>Trusted Client</span>

            {/* Trust gauge */}
            <div className="rounded-2xl p-8 mb-8 flex flex-col items-center gap-4"
              style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:G.navyBg }}>
              <TrustGauge score={75}/>
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-2">
                  <svg className="w-5 h-5" fill="none" stroke={G.navyLight} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  <span className="font-extrabold text-base" style={{ color:G.navyDeep }}>Trusted Client</span>
                </div>
                <div className="flex items-center gap-2 text-sm mt-1">
                  {["New","Basic","Trusted","Elite"].map((lvl,i,arr)=>(
                    <span key={lvl} className="flex items-center gap-2">
                      <span style={{ color:lvl==="Trusted"?G.navyLight:G.muted, fontWeight:lvl==="Trusted"?700:400, textDecoration:lvl==="Trusted"?"underline":"none" }}>{lvl}</span>
                      {i<arr.length-1 && <span style={{ color:"#cbd5e1" }}>→</span>}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Score Breakdown */}
            <h2 className="text-base font-bold mb-5" style={{ color:G.navyDeep }}>Score Breakdown</h2>
            <div className="flex flex-col gap-4 mb-8">
              {SCORE_BREAKDOWN.map(s=>(
                <div key={s.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-sm" style={{ color:G.sub }}>{s.label}</span>
                    <span className="text-sm font-bold" style={{ color:G.navyLight }}>{s.score}/{s.max}</span>
                  </div>
                  <div className="w-full h-2 rounded-full" style={{ backgroundColor:"#e2e8f0" }}>
                    <div className="h-full rounded-full" style={{ width:`${(s.score/s.max)*100}%`, background:G.gradNavy }}/>
                  </div>
                </div>
              ))}
            </div>

            {/* What You Can Do */}
            <div className="rounded-xl px-6 py-5 mb-6" style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:G.navyBg }}>
              <h3 className="font-bold mb-4 text-sm" style={{ color:G.navyDeep }}>What You Can Do</h3>
              <div className="flex flex-col gap-2.5">
                {WHAT_YOU_CAN.map(w=>(
                  <div key={w.text} className="flex items-center gap-2 text-sm" style={{ color:w.ok?G.sub:"#f97316" }}>
                    {w.ok
                      ? <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    {w.text}
                  </div>
                ))}
              </div>
            </div>

            {/* First Project Restrictions */}
            <div className="rounded-xl px-6 py-5 mb-8" style={{ border:"1px solid #fde68a", backgroundColor:"#fffbeb" }}>
              <div className="flex items-center gap-2 mb-3"><span>🛡️</span><span className="font-bold text-sm" style={{ color:G.navyDeep }}>First Project Restrictions</span></div>
              <div className="flex items-center flex-wrap gap-1 text-sm mb-2" style={{ color:"#78350f" }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#f97316" viewBox="0 0 24 24"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span>Admin auto-monitoring • Milestone payments only • Budget cap: $50,000</span>
              </div>
              <p className="text-xs" style={{ color:"#92400e" }}>These lift after 1 successful project completion.</p>
            </div>

            {/* Quick Wins */}
            <h2 className="text-base font-bold mb-4" style={{ color:G.navyDeep }}>Quick Wins to Improve Score</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {QUICK_WINS.map(w=>(
                <button key={w.title} className="flex flex-col gap-3 p-5 rounded-xl text-left transition-all"
                  style={{ border:`1px solid ${G.greenBorder}`, backgroundColor:"white" }}
                  onMouseOver={e=>{ e.currentTarget.style.borderColor=G.navyLight; e.currentTarget.style.backgroundColor=G.navyBg; }}
                  onMouseOut={e=>{ e.currentTarget.style.borderColor=G.greenBorder; e.currentTarget.style.backgroundColor="white"; }}>
                  {w.icon}
                  <div>
                    <div className="text-sm font-bold" style={{ color:G.navyDeep }}>{w.title}</div>
                    <div className="text-xs font-semibold mt-0.5" style={{ color:G.navyLight }}>{w.label}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev} className="flex items-center gap-2 text-sm font-semibold" style={{ color:G.sub }}
            onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          {/* Sign in → gradGreen (matches "View Portfolio" in PublicProfile) */}
          <button onClick={()=>handleRole("Hire_talent")} disabled={!canContinue}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-all"
            style={{ background:canContinue?G.gradGreen:"#d1d5db", boxShadow:canContinue?"0 3px 14px rgba(46,125,31,0.24)":"none", cursor:canContinue?"pointer":"not-allowed" }}
            onMouseEnter={e=>{ if(canContinue) e.currentTarget.style.opacity="0.88"; }}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Sign in →
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}>
              <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-bold text-sm" style={{ color:G.navyDeep }}>AI Insights</span>
          </div>
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Trust score: 75/100 — Trusted Client level.
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor:G.navyBg, border:`1px solid ${G.navyBorder}`, color:G.navy }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={G.navyLight} viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              You're in the top 25% of new clients!
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}