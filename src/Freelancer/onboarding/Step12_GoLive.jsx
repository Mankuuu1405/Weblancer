// import { useEffect, useState } from "react";

// const completedItems = [
//   { label: "Profile",   detail: "Complete"            },
//   { label: "Identity",  detail: "Verified"            },
//   { label: "Payment",   detail: "Ready to receive"    },
//   { label: "Skills",    detail: "Declared & AI-checked"},
//   { label: "Portfolio", detail: "Projects added"      },
// ];

// const whatNext = [
//   "Clients find you through AI matching",
//   "You receive invitations for relevant projects",
//   "Discuss project in ArcLancer ProjectStream chat",
//   "Submit proposal with your terms",
//   "Client funds escrow → work begins",
//   "Complete milestones, earn reviews",
// ];

// /* Confetti particle */
// function Confetti({ show }) {
//   const particles = Array.from({ length: 32 }, (_, i) => ({
//     id: i,
//     x: Math.random() * 100,
//     delay: Math.random() * 0.8,
//     dur: 1.2 + Math.random() * 1,
//     color: ["#3b82f6","#10b981","#f59e0b","#8b5cf6","#ec4899","#06b6d4"][i % 6],
//     size: 6 + Math.random() * 6,
//   }));

//   if (!show) return null;
//   return (
//     <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
//       {particles.map(p => (
//         <div key={p.id}
//           className="absolute rounded-sm animate-bounce"
//           style={{
//             left: `${p.x}%`,
//             top: "-10px",
//             width: p.size,
//             height: p.size,
//             backgroundColor: p.color,
//             animationDelay: `${p.delay}s`,
//             animationDuration: `${p.dur}s`,
//             animation: `fall-${p.id} ${p.dur}s ${p.delay}s forwards`,
//           }}
//         />
//       ))}
//       <style>{`
//         ${particles.map(p => `
//           @keyframes fall-${p.id} {
//             0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
//             100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
//           }
//         `).join("")}
//       `}</style>
//     </div>
//   );
// }

// export default function Step12_GoLive({ onBack, onDashboard }) {
//   const [showConfetti, setShowConfetti] = useState(false);
//   const [checkAnim, setCheckAnim]       = useState(false);
//   const [itemsAnim, setItemsAnim]       = useState(false);

//   useEffect(() => {
//     // Staggered entrance
//     const t1 = setTimeout(() => setCheckAnim(true),  300);
//     const t2 = setTimeout(() => setShowConfetti(true), 600);
//     const t3 = setTimeout(() => setShowConfetti(false), 4000);
//     const t4 = setTimeout(() => setItemsAnim(true),   800);
//     return () => [t1, t2, t3, t4].forEach(clearTimeout);
//   }, []);

//   return (
//     <div className="min-h-screen bg-blue-50 text-gray-900 pb-20">
//       <Confetti show={showConfetti}/>

//       {/* ── Navbar (no Save & Exit on final step) ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
//         <span className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight">ArcLancer</span>
        
//       </header>

//       {/* ── Main content (centered, no two-column layout on final step) ── */}
//       <div className="max-w-2xl mx-auto px-4 sm:px-6">

//         {/* ── Hero section ── */}
//         <div className="flex flex-col items-center text-center mb-8">
//           {/* Animated check circle */}
//           <div className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 transition-all duration-700
//             ${checkAnim ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
//             <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//             </svg>
//           </div>

//           <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
//             🎉 Welcome to ArcLancer!
//           </h1>
//           <p className="text-base text-gray-500">
//             Your freelancer profile is active and ready for projects
//           </p>
//         </div>

//         {/* ── Summary card ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">

//           {/* Checklist */}
//           <div className="space-y-3 mb-6">
//             {completedItems.map((item, i) => (
//               <div key={item.label}
//                 className={`flex items-center gap-3 transition-all duration-500`}
//                 style={{
//                   opacity:    itemsAnim ? 1 : 0,
//                   transform:  itemsAnim ? "translateX(0)" : "translateX(-16px)",
//                   transitionDelay: `${i * 80}ms`
//                 }}>
//                 <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//                 <span className="text-sm text-gray-800">
//                   <span className="font-bold">{item.label}:</span>{" "}
//                   <span className="text-gray-500">{item.detail}</span>
//                 </span>
//               </div>
//             ))}
//           </div>

//           {/* Trust Score + Badges row */}
//           <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100">
//             <span className="text-sm font-semibold text-gray-700">Trust Score: <span className="text-gray-900">78/100</span></span>
//             <div className="flex items-center gap-2 flex-wrap">
//               <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                 Rising Talent
//               </span>
//               <span className="text-xs font-bold bg-blue-500 text-white px-3 py-1 rounded-full uppercase tracking-wide">
//                 Active &amp; Searchable ✓
//               </span>
//             </div>
//           </div>
//         </div>

//         {/* ── What Happens Next ── */}
//         <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
//           <h2 className="text-base font-bold text-gray-800 mb-4">What Happens Next</h2>
//           <div className="space-y-3">
//             {whatNext.map((step, i) => (
//               <div key={i} className="flex items-start gap-3"
//                 style={{
//                   opacity:   itemsAnim ? 1 : 0,
//                   transform: itemsAnim ? "translateY(0)" : "translateY(8px)",
//                   transition: "all 0.4s ease",
//                   transitionDelay: `${600 + i * 80}ms`
//                 }}>
//                 <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
//                   <span className="text-xs font-bold text-blue-600">{i + 1}</span>
//                 </div>
//                 <p className="text-sm text-gray-700 pt-0.5">{step}</p>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* ── CTA Buttons ── */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
//           <button className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-3.5 rounded-xl transition shadow-sm text-sm">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
//             </svg>
//             Browse Available Projects →
//           </button>
//           <button onClick={onDashboard} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
//             </svg>
//             Go to My Dashboard
//           </button>
//         </div>

//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
//           <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
//             </svg>
//             Set Availability Calendar
//           </button>
//           <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
//             </svg>
//             View Dashboard Tutorial
//           </button>
//         </div>

//         {/* Back link */}
//         <div className="flex justify-start">
//           <button onClick={onBack}
//             className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition font-medium">
//             ← Back
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useEffect, useState } from "react";

const completedItems = [
  { label: "Profile",   detail: "Complete"            },
  { label: "Identity",  detail: "Verified"            },
  { label: "Payment",   detail: "Ready to receive"    },
  { label: "Skills",    detail: "Declared & AI-checked"},
  { label: "Portfolio", detail: "Projects added"      },
];

const whatNext = [
  "Clients find you through AI matching",
  "You receive invitations for relevant projects",
  "Discuss project in Weblance ProjectStream chat",
  "Submit proposal with your terms",
  "Client funds escrow → work begins",
  "Complete milestones, earn reviews",
];

/* Confetti particle */
function Confetti({ show }) {
  const particles = Array.from({ length: 32 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    delay: Math.random() * 0.8,
    dur: 1.2 + Math.random() * 1,
    color: ["#3b82f6","#10b981","#f59e0b","#8b5cf6","#ec4899","#06b6d4"][i % 6],
    size: 6 + Math.random() * 6,
  }));

  if (!show) return null;
  return (
    <div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
      {particles.map(p => (
        <div key={p.id}
          className="absolute rounded-sm animate-bounce"
          style={{
            left: `${p.x}%`,
            top: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: p.color,
            animationDelay: `${p.delay}s`,
            animationDuration: `${p.dur}s`,
            animation: `fall-${p.id} ${p.dur}s ${p.delay}s forwards`,
          }}
        />
      ))}
      <style>{`
        /* ── Weblance Theme ── */
        .wbl-bg, .wbl-btn-inline {
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
        }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
          color:#fff !important; border:none; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 32px; font-size:15px;
          box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
        .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
        .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
        .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }
        .wbl-text-active, .wbl-text-blue { color:#1B72C0 !important; }
        /* ───────────────────── */

        

        ${particles.map(p => `
          @keyframes fall-${p.id} {
            0%   { transform: translateY(-20px) rotate(0deg);   opacity: 1; }
            100% { transform: translateY(110vh) rotate(720deg); opacity: 0; }
          }
        `).join("")}
      `}</style>
    </div>
  );
}

export default function Step12_GoLive({ onBack, onDashboard }) {
  const [showConfetti, setShowConfetti] = useState(false);
  const [checkAnim, setCheckAnim]       = useState(false);
  const [itemsAnim, setItemsAnim]       = useState(false);

  useEffect(() => {
    // Staggered entrance
    const t1 = setTimeout(() => setCheckAnim(true),  300);
    const t2 = setTimeout(() => setShowConfetti(true), 600);
    const t3 = setTimeout(() => setShowConfetti(false), 4000);
    const t4 = setTimeout(() => setItemsAnim(true),   800);
    return () => [t1, t2, t3, t4].forEach(clearTimeout);
  }, []);

  return (
    <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F6FEF0" }}>
      <Confetti show={showConfetti}/>

      {/* ── Navbar (no Save & Exit on final step) ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
        
      </header>

      {/* ── Main content (centered, no two-column layout on final step) ── */}
      <div className="max-w-2xl mx-auto px-4 sm:px-6">

        {/* ── Hero section ── */}
        <div className="flex flex-col items-center text-center mb-8">
          {/* Animated check circle */}
          <div className={`w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-5 transition-all duration-700
            ${checkAnim ? "scale-100 opacity-100" : "scale-50 opacity-0"}`}>
            <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-gray-900 mb-2">
            🎉 Welcome to Weblance!
          </h1>
          <p className="text-base text-gray-500">
            Your freelancer profile is active and ready for projects
          </p>
        </div>

        {/* ── Summary card ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">

          {/* Checklist */}
          <div className="space-y-3 mb-6">
            {completedItems.map((item, i) => (
              <div key={item.label}
                className={`flex items-center gap-3 transition-all duration-500`}
                style={{
                  opacity:    itemsAnim ? 1 : 0,
                  transform:  itemsAnim ? "translateX(0)" : "translateX(-16px)",
                  transitionDelay: `${i * 80}ms`
                }}>
                <svg className="w-6 h-6 text-green-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                <span className="text-sm text-gray-800">
                  <span className="font-bold">{item.label}:</span>{" "}
                  <span className="text-gray-500">{item.detail}</span>
                </span>
              </div>
            ))}
          </div>

          {/* Trust Score + Badges row */}
          <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-gray-100">
            <span className="text-sm font-semibold text-gray-700">Trust Score: <span className="text-gray-900">78/100</span></span>
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                Rising Talent
              </span>
              <span className="text-xs font-bold wbl-bg text-white px-3 py-1 rounded-full uppercase tracking-wide">
                Active &amp; Searchable ✓
              </span>
            </div>
          </div>
        </div>

        {/* ── What Happens Next ── */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8 mb-6">
          <h2 className="text-base font-bold text-gray-800 mb-4">What Happens Next</h2>
          <div className="space-y-3">
            {whatNext.map((step, i) => (
              <div key={i} className="flex items-start gap-3"
                style={{
                  opacity:   itemsAnim ? 1 : 0,
                  transform: itemsAnim ? "translateY(0)" : "translateY(8px)",
                  transition: "all 0.4s ease",
                  transitionDelay: `${600 + i * 80}ms`
                }}>
                <div className="w-7 h-7 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-xs font-bold wbl-text-blue">{i + 1}</span>
                </div>
                <p className="text-sm text-gray-700 pt-0.5">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── CTA Buttons ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
          <button className="flex items-center justify-center gap-2 wbl-btn-primary">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/>
            </svg>
            Browse Available Projects →
          </button>
          <button onClick={onDashboard} className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-700 font-semibold px-6 py-3.5 rounded-xl hover:bg-gray-50 transition text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
            </svg>
            Go to My Dashboard
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            </svg>
            Set Availability Calendar
          </button>
          <button className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-gray-600 font-medium px-6 py-3 rounded-xl hover:bg-gray-50 transition text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"/>
            </svg>
            View Dashboard Tutorial
          </button>
        </div>

        {/* Back link */}
        <div className="flex justify-start">
          <button onClick={onBack}
            className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 transition font-medium">
            ← Back
          </button>
        </div>
      </div>
    </div>
  );
}