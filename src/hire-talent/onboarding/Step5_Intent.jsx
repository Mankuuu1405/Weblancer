// import { useState } from "react";

// const TEMPLATES = [
//   {
//     id: "mobile",
//     label: "Mobile App",
//     sub: "iOS/Android application",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="1.8"/>
//         <path d="M12 18h.01" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     template: "I want to build a mobile app for iOS and Android that ",
//   },
//   {
//     id: "website",
//     label: "Website",
//     sub: "Web application or site",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/>
//         <path d="M2 8h20" strokeWidth="1.8" strokeLinecap="round"/>
//         <path d="M6 6h.01M9 6h.01" strokeWidth="2" strokeLinecap="round"/>
//       </svg>
//     ),
//     template: "I want to build a website that ",
//   },
//   {
//     id: "design",
//     label: "Design Work",
//     sub: "UI/UX or branding",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-1.5c0-.83-.67-1.5-1.5-1.5H11c-2.76 0-5-2.24-5-5s2.24-5 5-5h6v1.5c0 .83.67 1.5 1.5 1.5S20 9.33 20 8.5V7c0-2.76-3.58-5-8-5z" strokeWidth="1.8" strokeLinecap="round"/>
//         <circle cx="7.5" cy="11.5" r="1" fill="#3b5bdb"/>
//         <circle cx="12" cy="7.5" r="1" fill="#3b5bdb"/>
//         <circle cx="16.5" cy="11.5" r="1" fill="#3b5bdb"/>
//       </svg>
//     ),
//     template: "I need design work for ",
//   },
//   {
//     id: "automation",
//     label: "Automation/AI",
//     sub: "Process automation",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     template: "I want to automate ",
//   },
//   {
//     id: "ecommerce",
//     label: "E-commerce",
//     sub: "Online store",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     template: "I want to build an online store that ",
//   },
//   {
//     id: "data",
//     label: "Data/Analytics",
//     sub: "Dashboards & tools",
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//         <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     template: "I need a data dashboard or analytics tool that ",
//   },
// ];

// const PROMPTS = [
//   "What problem are you trying to solve?",
//   "Who will use this?",
//   "What's your main goal?",
//   "Do you have examples of similar products you like?",
// ];

// const MAX = 2000;

// export default function Step5_Intent({ formData, updateData, next, prev }) {
//   const [idea, setIdea]     = useState(formData?.idea || "");
//   const [listening, setListening] = useState(false);

//   const handleTemplate = (t) => {
//     setIdea(t.template);
//   };

//   /* Simulated voice input */
//   const handleVoice = () => {
//     setListening(true);
//     setTimeout(() => {
//       setIdea(prev => prev + (prev ? " " : "") + "I want to build a platform that connects clients with talented freelancers.");
//       setListening(false);
//     }, 2000);
//   };

//   const canContinue = idea.trim().length >= 20;

//   const handleNext = () => {
//     updateData({ idea });
//     next();
//   };

//   return (
//     <div className="flex gap-6 items-start">

//       {/* ══ LEFT: Main card ══════════════════════════════════ */}
//       <div className="flex-1 min-w-0">
//         <div className="rounded-2xl p-8 sm:p-10"
//              style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

//           <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
//             What Are You Trying to Build?
//           </h1>
//           <p className="text-sm mb-6" style={{ color: "#64748b" }}>
//             Don't worry about technical details — just describe your idea in plain English
//           </p>

//           {/* Green info box */}
//           <div className="rounded-xl px-5 py-4 mb-6"
//                style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0" }}>
//             {[
//               "You don't need to know technical terms",
//               "AI will help translate your idea",
//               "We'll guide you through details next",
//             ].map(t => (
//               <div key={t} className="text-sm" style={{ color: "#15803d" }}>
//                 ✓ {t}
//               </div>
//             ))}
//           </div>

//           {/* Textarea */}
//           <div className="flex flex-col gap-1.5 mb-2">
//             <div className="flex items-center justify-between">
//               <label className="text-sm font-semibold" style={{ color: "#374151" }}>
//                 Describe your idea
//               </label>
//               <span className="text-sm" style={{ color: "#94a3b8" }}>
//                 {idea.length}/{MAX}
//               </span>
//             </div>
//             <textarea
//               rows={6}
//               placeholder="e.g., I want a food delivery app like Uber Eats for my city..."
//               value={idea}
//               onChange={e => { if (e.target.value.length <= MAX) setIdea(e.target.value); }}
//               className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
//               style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#1e293b" }}
//               onFocus={e => e.target.style.borderColor = "#3b5bdb"}
//               onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
//             />
//           </div>

//           {/* Voice input */}
//           <button
//             onClick={handleVoice}
//             className="flex items-center gap-2 text-sm font-medium mb-6 transition-all"
//             style={{ color: listening ? "#3b5bdb" : "#64748b" }}
//           >
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z"
//                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             {listening ? "Listening..." : "Voice input"}
//           </button>

//           {/* Not sure prompts */}
//           <div className="rounded-xl px-6 py-5 mb-6"
//                style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//             <p className="text-sm font-semibold mb-3" style={{ color: "#1e293b" }}>
//               Not sure what to write? Answer these:
//             </p>
//             <ul className="flex flex-col gap-2">
//               {PROMPTS.map(p => (
//                 <li key={p} className="flex items-start gap-2 text-sm" style={{ color: "#64748b" }}>
//                   <span className="mt-0.5" style={{ color: "#3b5bdb" }}>•</span>
//                   {p}
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Templates */}
//           <div className="mb-6">
//             <p className="text-sm font-semibold mb-3" style={{ color: "#374151" }}>
//               Or start from a template:
//             </p>
//             <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
//               {TEMPLATES.map(t => (
//                 <button
//                   key={t.id}
//                   onClick={() => handleTemplate(t)}
//                   className="flex flex-col gap-2 p-4 rounded-xl text-left transition-all"
//                   style={{ border: "1px solid #e2e8f0", backgroundColor: "white" }}
//                   onMouseOver={e => { e.currentTarget.style.borderColor = "#3b5bdb"; e.currentTarget.style.backgroundColor = "#f5f7ff"; }}
//                   onMouseOut={e  => { e.currentTarget.style.borderColor = "#e2e8f0"; e.currentTarget.style.backgroundColor = "white"; }}
//                 >
//                   {t.icon}
//                   <div>
//                     <div className="text-sm font-bold" style={{ color: "#1e293b" }}>{t.label}</div>
//                     <div className="text-xs" style={{ color: "#94a3b8" }}>{t.sub}</div>
//                   </div>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* AI ready notice */}
//           <div className="flex items-center gap-2 text-sm" style={{ color: "#3b5bdb" }}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             <span>AI is ready to help refine your idea</span>
//           </div>
//         </div>

//         {/* ── Nav buttons ── */}
//         <div className="flex items-center justify-between mt-6 pb-10">
//           <button onClick={prev}
//                   className="flex items-center gap-2 text-sm font-semibold"
//                   style={{ color: "#374151" }}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Back
//           </button>

//           <button
//             onClick={handleNext}
//             disabled={!canContinue}
//             className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
//             style={{
//               backgroundColor: canContinue ? "#3b5bdb" : "#93c5fd",
//               cursor: canContinue ? "pointer" : "not-allowed",
//             }}
//           >
//             Continue with AI Assistant
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
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

//           {idea.trim().length < 20 ? (
//             <p className="text-xs" style={{ color: "#94a3b8" }}>
//               Start describing your idea to get AI-powered suggestions.
//             </p>
//           ) : (
//             <div className="flex flex-col gap-2">
//               <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
//                    style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
//                 <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Great! Your idea is ready for AI refinement.
//               </div>
//               {idea.length > 100 && (
//                 <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
//                      style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
//                   <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   Detailed descriptions lead to better talent matches.
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>

//     </div>
//   );
// }







// Step5_Intent.jsx
import { useState } from "react";

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af",
};

const TEMPLATES = [
  { id:"mobile",     label:"Mobile App",      sub:"iOS/Android application",  template:"I want to build a mobile app for iOS and Android that ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><rect x="5" y="2" width="14" height="20" rx="2" strokeWidth="1.8"/><path d="M12 18h.01" strokeWidth="2" strokeLinecap="round"/></svg> },
  { id:"website",    label:"Website",          sub:"Web application or site",  template:"I want to build a website that ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><rect x="2" y="4" width="20" height="16" rx="2" strokeWidth="1.8"/><path d="M2 8h20M6 6h.01M9 6h.01" strokeWidth="1.8" strokeLinecap="round"/></svg> },
  { id:"design",     label:"Design Work",      sub:"UI/UX or branding",        template:"I need design work for ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10c1.1 0 2-.9 2-2v-1.5c0-.83-.67-1.5-1.5-1.5H11c-2.76 0-5-2.24-5-5s2.24-5 5-5h6v1.5c0 .83.67 1.5 1.5 1.5S20 9.33 20 8.5V7c0-2.76-3.58-5-8-5z" strokeWidth="1.8" strokeLinecap="round"/><circle cx="7.5" cy="11.5" r="1" fill="#4A6FA5"/><circle cx="12" cy="7.5" r="1" fill="#4A6FA5"/><circle cx="16.5" cy="11.5" r="1" fill="#4A6FA5"/></svg> },
  { id:"automation", label:"Automation/AI",    sub:"Process automation",       template:"I want to automate ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M9 3H5a2 2 0 00-2 2v4m6-6h10a2 2 0 012 2v4M9 3v18m0 0h10a2 2 0 002-2V9M9 21H5a2 2 0 01-2-2V9m0 0h18" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id:"ecommerce",  label:"E-commerce",       sub:"Online store",             template:"I want to build an online store that ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
  { id:"data",       label:"Data/Analytics",   sub:"Dashboards & tools",       template:"I need a data dashboard or analytics tool that ",
    icon:<svg className="w-6 h-6" fill="none" stroke="#4A6FA5" viewBox="0 0 24 24"><path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg> },
];

const PROMPTS = [
  "What problem are you trying to solve?",
  "Who will use this?",
  "What's your main goal?",
  "Do you have examples of similar products you like?",
];
const MAX = 2000;

export default function Step5_Intent({ formData, updateData, next, prev }) {
  const [idea,      setIdea]      = useState(formData?.idea || "");
  const [listening, setListening] = useState(false);

  const handleTemplate = t => setIdea(t.template);

  const handleVoice = () => {
    setListening(true);
    setTimeout(()=>{ setIdea(p=>p+(p?" ":"")+"I want to build a platform that connects clients with talented freelancers."); setListening(false); }, 2000);
  };

  const canContinue = idea.trim().length >= 20;
  const handleNext  = () => { updateData({ idea }); next(); };

  return (
    <div className="flex gap-6 items-start">
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 4px 24px rgba(110,192,48,0.08)" }}>
          <div style={{ height:4, background:G.mixedGrad }}/>
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color:G.navyDeep }}>What Are You Trying to Build?</h1>
            <p className="text-sm mb-6" style={{ color:G.sub }}>Don't worry about technical details — just describe your idea in plain English</p>

            {/* Green info box */}
            <div className="rounded-xl px-5 py-4 mb-6" style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}` }}>
              {["You don't need to know technical terms","AI will help translate your idea","We'll guide you through details next"].map(t=>(
                <div key={t} className="text-sm" style={{ color:G.greenDeep }}>✓ {t}</div>
              ))}
            </div>

            {/* Textarea */}
            <div className="flex flex-col gap-1.5 mb-2">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>Describe your idea</label>
                <span className="text-sm" style={{ color:G.muted }}>{idea.length}/{MAX}</span>
              </div>
              <textarea rows={6} placeholder="e.g., I want a food delivery app like Uber Eats for my city..."
                value={idea} onChange={e=>{ if(e.target.value.length<=MAX) setIdea(e.target.value); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={{ border:`1px solid ${G.greenBorder}`, backgroundColor:"white", color:"#1e293b" }}
                onFocus={e=>e.target.style.borderColor=G.navyLight} onBlur={e=>e.target.style.borderColor=G.greenBorder}/>
            </div>

            {/* Voice */}
            <button onClick={handleVoice} className="flex items-center gap-2 text-sm font-medium mb-6 transition-all"
              style={{ color:listening?G.navyLight:G.sub }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4M12 3a4 4 0 014 4v4a4 4 0 01-8 0V7a4 4 0 014-4z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              {listening?"Listening...":"Voice input"}
            </button>

            {/* Prompts */}
            <div className="rounded-xl px-6 py-5 mb-6" style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:G.navyBg }}>
              <p className="text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Not sure what to write? Answer these:</p>
              <ul className="flex flex-col gap-2">
                {PROMPTS.map(p=>(
                  <li key={p} className="flex items-start gap-2 text-sm" style={{ color:G.sub }}>
                    <span className="mt-0.5" style={{ color:G.navyLight }}>•</span>{p}
                  </li>
                ))}
              </ul>
            </div>

            {/* Templates */}
            <div className="mb-6">
              <p className="text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Or start from a template:</p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {TEMPLATES.map(t=>(
                  <button key={t.id} onClick={()=>handleTemplate(t)}
                    className="flex flex-col gap-2 p-4 rounded-xl text-left transition-all"
                    style={{ border:`1px solid ${G.greenBorder}`, backgroundColor:"white" }}
                    onMouseOver={e=>{ e.currentTarget.style.borderColor=G.navyLight; e.currentTarget.style.backgroundColor=G.navyBg; }}
                    onMouseOut={e=>{ e.currentTarget.style.borderColor=G.greenBorder; e.currentTarget.style.backgroundColor="white"; }}>
                    {t.icon}
                    <div>
                      <div className="text-sm font-bold" style={{ color:G.navyDeep }}>{t.label}</div>
                      <div className="text-xs" style={{ color:G.muted }}>{t.sub}</div>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* AI ready */}
            <div className="flex items-center gap-2 text-sm" style={{ color:G.navy }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span>AI is ready to help refine your idea</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev} className="flex items-center gap-2 text-sm font-semibold" style={{ color:G.sub }}
            onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <button onClick={handleNext} disabled={!canContinue}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-all"
            style={{ background:canContinue?G.gradNavy:"#d1d5db", boxShadow:canContinue?"0 3px 14px rgba(15,26,59,0.30)":"none", cursor:canContinue?"pointer":"not-allowed" }}
            onMouseEnter={e=>{ if(canContinue) e.currentTarget.style.opacity="0.88"; }}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Continue with AI Assistant
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
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
          {idea.trim().length<20
            ? <p className="text-xs" style={{ color:G.muted }}>Start describing your idea to get AI-powered suggestions.</p>
            : <div className="flex flex-col gap-2">
                <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                  <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  Great! Your idea is ready for AI refinement.
                </div>
                {idea.length>100 && (
                  <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm" style={{ backgroundColor:G.navyBg, border:`1px solid ${G.navyBorder}`, color:G.navy }}>
                    <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={G.navyLight} viewBox="0 0 24 24"><path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    Detailed descriptions lead to better talent matches.
                  </div>
                )}
              </div>
          }
        </div>
      </div>
    </div>
  );
}