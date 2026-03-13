// import { useState } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const categories = [
//   {
//     name: "Development & Engineering",
//     icon: (
//       <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
//       </svg>
//     ),
//     roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer",
//             "Mobile Developer", "DevOps / Cloud Engineer", "AI / ML Engineer",
//             "Blockchain Developer", "QA / Test Engineer"]
//   },
//   {
//     name: "Design & Creative",
//     icon: (
//       <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
//       </svg>
//     ),
//     roles: ["UI/UX Designer", "Graphic Designer", "Brand Identity Designer",
//             "Motion / Video Designer", "3D / AR Designer", "Illustrator"]
//   },
//   {
//     name: "Product & Strategy",
//     icon: (
//       <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
//       </svg>
//     ),
//     roles: ["Product Manager", "Business Analyst", "Scrum Master / Agile Coach", "Technical Writer"]
//   },
//   {
//     name: "Marketing & Growth",
//     icon: (
//       <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//       </svg>
//     ),
//     roles: ["Digital Marketer", "SEO Specialist", "Content Writer / Copywriter",
//             "Social Media Manager", "Performance Marketer"]
//   },
//   {
//     name: "Data & Analytics",
//     icon: (
//       <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
//       </svg>
//     ),
//     roles: ["Data Analyst", "Data Scientist", "BI Developer", "Database Administrator"]
//   }
// ];

// export default function Step3_Type({ onNext, onBack, currentStep = 3, totalSteps = 12 }) {
//   const [selected, setSelected] = useState([]);

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const MAX_SECONDARY = 2;

//   const handleSelect = (role) => {
//     setSelected(prev => {
//       if (prev.includes(role)) return prev.filter(r => r !== role);
//       if (prev.length === 0) return [role];                          // first = primary
//       if (prev.length < 1 + MAX_SECONDARY) return [...prev, role];  // secondary slots
//       return prev; // max reached
//     });
//   };

//   const isPrimary   = (role) => selected[0] === role;
//   const isSecondary = (role) => selected.slice(1).includes(role);

//   /* ── AI Insights ── */
//   const getInsights = () => {
//     const insights = [];
//     if (selected.length === 0) return insights;
//     if (selected.length >= 1) insights.push({ status: "good", msg: `Primary type set: ${selected[0]}` });
//     if (selected.length === 2) insights.push({ status: "good", msg: `Secondary type added: ${selected[1]}` });
//     if (selected.length === 3) insights.push({ status: "good", msg: `Secondary types: ${selected[1]}, ${selected[2]}` });
//     if (selected.length === 1) insights.push({ status: "warn", msg: "You can add up to 2 secondary types (optional)." });
//     return insights;
//   };
//   const insights = getInsights();

//   const canContinue = selected.length >= 1;

//   return (
//     <div className="min-h-screen bg-blue-50 text-gray-900 pb-20">

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
//         <span className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight">ArcLancer</span>
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
//           <span className="text-blue-600 font-semibold">{percentComplete}% Complete</span>
//         </div>
//         <div className="relative flex items-start justify-between">
//           <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
//           <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500"
//             style={{ width: progressWidth }}></div>
//           {stepLabels.map((label, index) => {
//             const isActive = index + 1 === currentStep;
//             const isDone   = index + 1 < currentStep;
//             return (
//               <div key={index} className="flex flex-col items-center z-10 relative">
//                 <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
//                   ${isActive ? "bg-white border-blue-500 text-blue-600 shadow-md"
//                     : isDone  ? "bg-blue-500 border-blue-500 text-white"
//                     :           "bg-white border-gray-300 text-gray-400"}`}>
//                   {isDone
//                     ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
//                       </svg>
//                     : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
//                 </div>
//                 <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
//                   ${isActive ? "text-blue-600" : "text-gray-400"}`}>
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

//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What kind of work do you do?</h1>
//               <p className="text-sm text-gray-500 mb-5">This helps us match you with the right projects and clients</p>

//               <div className="mb-6">
//                 <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                   Freelancer Type
//                 </span>
//               </div>

//               {/* Categories */}
//               <div className="space-y-7">
//                 {categories.map((cat) => (
//                   <div key={cat.name}>
//                     {/* Category Header */}
//                     <div className="flex items-center gap-2 mb-3">
//                       {cat.icon}
//                       <h3 className="text-sm font-bold text-gray-800">{cat.name}</h3>
//                     </div>

//                     {/* Role Cards */}
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                       {cat.roles.map((role) => {
//                         const primary   = isPrimary(role);
//                         const secondary = isSecondary(role);
//                         const maxed     = selected.length >= 3 && !primary && !secondary;

//                         return (
//                           <button
//                             key={role}
//                             type="button"
//                             onClick={() => !maxed && handleSelect(role)}
//                             className={`relative text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
//                               ${primary
//                                 ? "bg-blue-500 border-blue-500 text-white shadow-sm"
//                                 : secondary
//                                 ? "bg-blue-50 border-blue-300 text-blue-700"
//                                 : maxed
//                                 ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
//                                 : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-blue-50"}`}
//                           >
//                             {role}
//                             {primary && (
//                               <span className="absolute top-1 right-1 text-[9px] bg-white text-blue-600 font-bold px-1 rounded">
//                                 PRIMARY
//                               </span>
//                             )}
//                             {secondary && (
//                               <span className="absolute top-1 right-1 text-[9px] bg-blue-200 text-blue-700 font-bold px-1 rounded">
//                                 2ND
//                               </span>
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Selection Rules */}
//               <div className="mt-8 border border-gray-200 rounded-xl px-5 py-4 bg-gray-50">
//                 <p className="text-sm font-bold text-gray-700 mb-1">Selection rules:</p>
//                 <p className="text-sm text-gray-500">
//                   Primary type: Select 1 (required) &bull; Secondary: Up to 2 (optional)
//                 </p>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between mt-6">
//               <button onClick={onBack}
//                 className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//                 ← Back
//               </button>
//               <button onClick={onNext} disabled={!canContinue}
//                 className="bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
//                 Continue
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

//               {insights.length === 0 ? (
//                 <div className="text-xs text-gray-400 text-center py-8 px-2">
//                   <svg className="w-8 h-8 mx-auto mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                   Select your primary type to see AI feedback.
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {insights.map((insight, i) => (
//                     <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
//                       ${insight.status === "good"
//                         ? "bg-green-50 border border-green-100 text-green-800"
//                         : "bg-yellow-50 border border-yellow-100 text-yellow-800"}`}>
//                       {insight.status === "good" ? (
//                         <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                         </svg>
//                       )}
//                       {insight.msg}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Selected Summary */}
//               {selected.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <p className="text-xs font-semibold text-gray-600 mb-2">Your selections:</p>
//                   <div className="space-y-1.5">
//                     {selected.map((role, i) => (
//                       <div key={role} className="flex items-center justify-between">
//                         <span className="text-xs text-gray-700 truncate mr-2">{role}</span>
//                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0
//                           ${i === 0 ? "bg-blue-100 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
//                           {i === 0 ? "PRIMARY" : "2ND"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3">
//                     <div className="flex justify-between text-xs text-gray-400 mb-1">
//                       <span>Slots used</span>
//                       <span className="font-semibold text-blue-600">{selected.length} / 3</span>
//                     </div>
//                     <div className="w-full bg-gray-100 rounded-full h-1.5">
//                       <div className="bg-blue-500 h-1.5 rounded-full transition-all duration-300"
//                         style={{ width: `${(selected.length / 3) * 100}%` }} />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }









// import { useState } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const categories = [
//   {
//     name: "Development & Engineering",
//     icon: (
//       <svg className="w-5 h-5 wbl-text-blue" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
//       </svg>
//     ),
//     roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer",
//             "Mobile Developer", "DevOps / Cloud Engineer", "AI / ML Engineer",
//             "Blockchain Developer", "QA / Test Engineer"]
//   },
//   {
//     name: "Design & Creative",
//     icon: (
//       <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
//       </svg>
//     ),
//     roles: ["UI/UX Designer", "Graphic Designer", "Brand Identity Designer",
//             "Motion / Video Designer", "3D / AR Designer", "Illustrator"]
//   },
//   {
//     name: "Product & Strategy",
//     icon: (
//       <svg className="w-5 h-5 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"/>
//       </svg>
//     ),
//     roles: ["Product Manager", "Business Analyst", "Scrum Master / Agile Coach", "Technical Writer"]
//   },
//   {
//     name: "Marketing & Growth",
//     icon: (
//       <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
//       </svg>
//     ),
//     roles: ["Digital Marketer", "SEO Specialist", "Content Writer / Copywriter",
//             "Social Media Manager", "Performance Marketer"]
//   },
//   {
//     name: "Data & Analytics",
//     icon: (
//       <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4"/>
//       </svg>
//     ),
//     roles: ["Data Analyst", "Data Scientist", "BI Developer", "Database Administrator"]
//   }
// ];

// export default function Step3_Type({ onNext, onBack, currentStep = 3, totalSteps = 12 }) {
//   const [selected, setSelected] = useState([]);

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const MAX_SECONDARY = 2;

//   const handleSelect = (role) => {
//     setSelected(prev => {
//       if (prev.includes(role)) return prev.filter(r => r !== role);
//       if (prev.length === 0) return [role];                          // first = primary
//       if (prev.length < 1 + MAX_SECONDARY) return [...prev, role];  // secondary slots
//       return prev; // max reached
//     });
//   };

//   const isPrimary   = (role) => selected[0] === role;
//   const isSecondary = (role) => selected.slice(1).includes(role);

//   /* ── AI Insights ── */
//   const getInsights = () => {
//     const insights = [];
//     if (selected.length === 0) return insights;
//     if (selected.length >= 1) insights.push({ status: "good", msg: `Primary type set: ${selected[0]}` });
//     if (selected.length === 2) insights.push({ status: "good", msg: `Secondary type added: ${selected[1]}` });
//     if (selected.length === 3) insights.push({ status: "good", msg: `Secondary types: ${selected[1]}, ${selected[2]}` });
//     if (selected.length === 1) insights.push({ status: "warn", msg: "You can add up to 2 secondary types (optional)." });
//     return insights;
//   };
//   const insights = getInsights();

//   const canContinue = selected.length >= 1;

//   return (
//     <>
//       <style>{`
//         /* ── Weblance Theme ── */
//         .wbl-bg, .wbl-btn-inline {
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//         }
//         .wbl-btn-primary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//           color:#fff !important; border:none; cursor:pointer;
//           font-weight:600; border-radius:12px; padding:12px 32px; font-size:15px;
//           box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s;
//         }
//         .wbl-btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
//         .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
//         .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
//         .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }
//         .wbl-text-active, .wbl-text-blue { color:#1B72C0 !important; }
//         /* ───────────────────── */

        
// `}</style>
//     <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F6FEF0" }}>

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
//           <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
//           <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-bg z-0 rounded-full transition-all duration-500"
//             style={{ width: progressWidth }}></div>
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

//               <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">What kind of work do you do?</h1>
//               <p className="text-sm text-gray-500 mb-5">This helps us match you with the right projects and clients</p>

//               <div className="mb-6">
//                 <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                   Freelancer Type
//                 </span>
//               </div>

//               {/* Categories */}
//               <div className="space-y-7">
//                 {categories.map((cat) => (
//                   <div key={cat.name}>
//                     {/* Category Header */}
//                     <div className="flex items-center gap-2 mb-3">
//                       {cat.icon}
//                       <h3 className="text-sm font-bold text-gray-800">{cat.name}</h3>
//                     </div>

//                     {/* Role Cards */}
//                     <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
//                       {cat.roles.map((role) => {
//                         const primary   = isPrimary(role);
//                         const secondary = isSecondary(role);
//                         const maxed     = selected.length >= 3 && !primary && !secondary;

//                         return (
//                           <button
//                             key={role}
//                             type="button"
//                             onClick={() => !maxed && handleSelect(role)}
//                             className={`relative text-left px-3 py-2.5 rounded-xl border text-sm font-medium transition-all
//                               ${primary
//                                 ? "wbl-bg border-green-400 text-white shadow-sm"
//                                 : secondary
//                                 ? "bg-blue-50 border-blue-300 text-blue-700"
//                                 : maxed
//                                 ? "bg-gray-50 border-gray-200 text-gray-300 cursor-not-allowed"
//                                 : "bg-white border-gray-200 text-gray-700 hover:border-blue-300 hover:bg-green-50"}`}
//                           >
//                             {role}
//                             {primary && (
//                               <span className="absolute top-1 right-1 text-[9px] bg-white wbl-text-blue font-bold px-1 rounded">
//                                 PRIMARY
//                               </span>
//                             )}
//                             {secondary && (
//                               <span className="absolute top-1 right-1 text-[9px] bg-blue-200 text-blue-700 font-bold px-1 rounded">
//                                 2ND
//                               </span>
//                             )}
//                           </button>
//                         );
//                       })}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Selection Rules */}
//               <div className="mt-8 border border-gray-200 rounded-xl px-5 py-4 bg-gray-50">
//                 <p className="text-sm font-bold text-gray-700 mb-1">Selection rules:</p>
//                 <p className="text-sm text-gray-500">
//                   Primary type: Select 1 (required) &bull; Secondary: Up to 2 (optional)
//                 </p>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between mt-6">
//               <button onClick={onBack}
//                 className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//                 ← Back
//               </button>
//               <button onClick={onNext} disabled={!canContinue}
//                 className="wbl-btn-inline disabled:opacity-40 disabled:cursor-not-allowed text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
//                 Continue
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

//               {insights.length === 0 ? (
//                 <div className="text-xs text-gray-400 text-center py-8 px-2">
//                   <svg className="w-8 h-8 mx-auto mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                   Select your primary type to see AI feedback.
//                 </div>
//               ) : (
//                 <div className="space-y-2">
//                   {insights.map((insight, i) => (
//                     <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
//                       ${insight.status === "good"
//                         ? "bg-green-50 border border-green-100 text-green-800"
//                         : "bg-yellow-50 border border-yellow-100 text-yellow-800"}`}>
//                       {insight.status === "good" ? (
//                         <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                       ) : (
//                         <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                         </svg>
//                       )}
//                       {insight.msg}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {/* Selected Summary */}
//               {selected.length > 0 && (
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <p className="text-xs font-semibold text-gray-600 mb-2">Your selections:</p>
//                   <div className="space-y-1.5">
//                     {selected.map((role, i) => (
//                       <div key={role} className="flex items-center justify-between">
//                         <span className="text-xs text-gray-700 truncate mr-2">{role}</span>
//                         <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0
//                           ${i === 0 ? "bg-blue-50 text-blue-700" : "bg-gray-100 text-gray-500"}`}>
//                           {i === 0 ? "PRIMARY" : "2ND"}
//                         </span>
//                       </div>
//                     ))}
//                   </div>
//                   <div className="mt-3">
//                     <div className="flex justify-between text-xs text-gray-400 mb-1">
//                       <span>Slots used</span>
//                       <span className="font-semibold wbl-text-blue">{selected.length} / 3</span>
//                     </div>
//                     <div className="w-full bg-gray-100 rounded-full h-1.5">
//                       <div className="wbl-bg h-1.5 rounded-full transition-all duration-300"
//                         style={{ width: `${(selected.length / 3) * 100}%` }} />
//                     </div>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }










import { useState } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const categories = [
  {
    name: "Development & Engineering",
    iconColor: "#1B72C0",
    iconPath: "M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4",
    roles: ["Frontend Developer", "Backend Developer", "Full Stack Developer",
            "Mobile Developer", "DevOps / Cloud Engineer", "AI / ML Engineer",
            "Blockchain Developer", "QA / Test Engineer"]
  },
  {
    name: "Design & Creative",
    iconColor: "#ec4899",
    iconPath: "M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01",
    roles: ["UI/UX Designer", "Graphic Designer", "Brand Identity Designer",
            "Motion / Video Designer", "3D / AR Designer", "Illustrator"]
  },
  {
    name: "Product & Strategy",
    iconColor: "#f97316",
    iconPath: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2",
    roles: ["Product Manager", "Business Analyst", "Scrum Master / Agile Coach", "Technical Writer"]
  },
  {
    name: "Marketing & Growth",
    iconColor: "#22c55e",
    iconPath: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6",
    roles: ["Digital Marketer", "SEO Specialist", "Content Writer / Copywriter",
            "Social Media Manager", "Performance Marketer"]
  },
  {
    name: "Data & Analytics",
    iconColor: "#a855f7",
    iconPath: "M4 7v10c0 2.21 3.582 4 8 4s8-1.79 8-4V7M4 7c0 2.21 3.582 4 8 4s8-1.79 8-4M4 7c0-2.21 3.582-4 8-4s8 1.79 8 4",
    roles: ["Data Analyst", "Data Scientist", "BI Developer", "Database Administrator"]
  }
];

export default function Step3_Type({ onNext, onBack, currentStep = 3, totalSteps = 12 }) {
  const [selected, setSelected] = useState([]);

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  const MAX_SECONDARY   = 2;

  const handleSelect = (role) => {
    setSelected(prev => {
      if (prev.includes(role)) return prev.filter(r => r !== role);
      if (prev.length === 0) return [role];
      if (prev.length < 1 + MAX_SECONDARY) return [...prev, role];
      return prev;
    });
  };

  const isPrimary   = (role) => selected[0] === role;
  const isSecondary = (role) => selected.slice(1).includes(role);

  const getInsights = () => {
    const insights = [];
    if (selected.length === 0) return insights;
    if (selected.length >= 1) insights.push({ status: "good", msg: `Primary type set: ${selected[0]}` });
    if (selected.length === 2) insights.push({ status: "good", msg: `Secondary type added: ${selected[1]}` });
    if (selected.length === 3) insights.push({ status: "good", msg: `Secondary types: ${selected[1]}, ${selected[2]}` });
    if (selected.length === 1) insights.push({ status: "warn", msg: "You can add up to 2 secondary types (optional)." });
    return insights;
  };
  const insights    = getInsights();
  const canContinue = selected.length >= 1;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
        .wbl-text-blue { color: #1B72C0; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
        .wbl-btn-primary:disabled { opacity:0.4; cursor:not-allowed; transform:none; box-shadow:none; }
        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px;
          transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
        .role-btn {
          position:relative; text-align:left; padding:10px 12px; border-radius:12px;
          border:1.5px solid #e5e7eb; font-size:13px; font-weight:600;
          background:white; cursor:pointer; color:#374151; transition:all .18s;
          line-height:1.3;
        }
        .role-btn:hover { border-color:#93c5fd; background:#f0f9ff; }
        .role-btn.primary { background:linear-gradient(135deg,#0D2855,#1B72C0); border-color:transparent; color:white; box-shadow:0 3px 12px rgba(13,40,85,0.25); }
        .role-btn.secondary { background:#eff6ff; border-color:#93c5fd; color:#1d4ed8; }
        .role-btn.maxed { opacity:0.35; cursor:not-allowed; background:#f9fafb; }
        .badge-primary { position:absolute; top:5px; right:5px; font-size:9px; font-weight:800; background:rgba(255,255,255,0.25); color:white; padding:2px 5px; border-radius:5px; letter-spacing:0.03em; }
        .badge-secondary { position:absolute; top:5px; right:5px; font-size:9px; font-weight:800; background:#bfdbfe; color:#1d4ed8; padding:2px 5px; border-radius:5px; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background: "#F4F9FF" }}>

        {/* Navbar */}
<header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
  <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
  <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
    </svg>
    Save &amp; Exit
  </button>
</header>

        {/* Step Progress */}
        <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
            <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
                  <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
                    {isDone
                      ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      : i + 1}
                  </div>
                  <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* Main Card */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  Freelancer Type
                </span>
              </div>

              <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>What kind of work do you do?</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>This helps us match you with the right projects and clients</p>

              {/* Categories */}
              <div style={{ display:"flex", flexDirection:"column", gap:28 }}>
                {categories.map((cat) => (
                  <div key={cat.name}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                      <div style={{ width:28, height:28, borderRadius:8, background:`${cat.iconColor}15`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg width="15" height="15" fill="none" stroke={cat.iconColor} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={cat.iconPath}/>
                        </svg>
                      </div>
                      <span style={{ fontSize:13, fontWeight:800, color:"#1f2937" }}>{cat.name}</span>
                    </div>

                    <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
                      {cat.roles.map((role) => {
                        const primary   = isPrimary(role);
                        const secondary = isSecondary(role);
                        const maxed     = selected.length >= 3 && !primary && !secondary;
                        return (
                          <button key={role} type="button"
                            className={`role-btn ${primary ? "primary" : secondary ? "secondary" : maxed ? "maxed" : ""}`}
                            onClick={() => !maxed && handleSelect(role)}>
                            {role}
                            {primary   && <span className="badge-primary">PRIMARY</span>}
                            {secondary && <span className="badge-secondary">2ND</span>}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Rules */}
              <div style={{ marginTop:28, background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:14, padding:"14px 18px" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:4 }}>Selection rules:</p>
                <p style={{ fontSize:13, color:"#64748b" }}>
                  Primary type: Select 1 (required) &bull; Secondary: Up to 2 (optional)
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="wbl-btn-primary" onClick={onNext} disabled={!canContinue}>
                Continue
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width:280, flexShrink:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              {insights.length === 0 ? (
                <div style={{ textAlign:"center", padding:"24px 8px", color:"#94a3b8", fontSize:12 }}>
                  <svg width="32" height="32" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ margin:"0 auto 8px", display:"block" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  Select your primary type to see AI feedback.
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {insights.map((insight, i) => (
                    <div key={i} className={insight.status === "good" ? "insight-good" : "insight-warn"}
                      style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                      {insight.status === "good" ? (
                        <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {insight.msg}
                    </div>
                  ))}
                </div>
              )}

              {selected.length > 0 && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Your selections:</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                    {selected.map((role, i) => (
                      <div key={role} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontSize:12, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginRight:8 }}>{role}</span>
                        <span style={{ fontSize:10, fontWeight:800, padding:"2px 6px", borderRadius:6, flexShrink:0,
                          background: i === 0 ? "#dbeafe" : "#f3f4f6",
                          color: i === 0 ? "#1d4ed8" : "#6b7280" }}>
                          {i === 0 ? "PRIMARY" : "2ND"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:12 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginBottom:5 }}>
                      <span>Slots used</span>
                      <span className="wbl-text-blue" style={{ fontWeight:800 }}>{selected.length} / 3</span>
                    </div>
                    <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
                      <div className="wbl-gradient" style={{ width:`${(selected.length/3)*100}%`, height:"100%", borderRadius:100, transition:"width .3s ease" }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}