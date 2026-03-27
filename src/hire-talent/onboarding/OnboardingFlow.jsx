// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AccountStep    from "./Step1_Account";
// import VerifyStep     from "./Step2_Verify";
// import TypeStep       from "./Step3_Type";
// import ProfileStep    from "./Step4_Profile";
// import IntentStep     from "./Step5_Intent";
// import AIChatStep     from "./Step6_AIChat";
// import BlueprintStep  from "./Step7_Blueprint";
// import RiskStep       from "./Step8_Risk";
// import PayModelStep   from "./Step9_PayModel";
// import PaySetupStep   from "./Step10_PaySetup";
// import TrustStep      from "./Step11_Trust";
// // import ProfileStep   from "./ProfileStep";
// // import IntentStep    from "./IntentStep";
// // import AIChatStep    from "./AIChatStep";
// // import BlueprintStep from "./BlueprintStep";
// // import RiskStep      from "./RiskStep";
// // import PayModelStep  from "./PayModelStep";
// // import PaySetupStep  from "./PaySetupStep";
// // import TrustStep     from "./TrustStep";

// const STEPS = [
//   { id: 1,  label: "Account"   },
//   { id: 2,  label: "Verify"    },
//   { id: 3,  label: "Type"      },
//   { id: 4,  label: "Profile"   },
//   { id: 5,  label: "Intent"    },
//   { id: 6,  label: "AI Chat"   },
//   { id: 7,  label: "Blueprint" },
//   { id: 8,  label: "Risk"      },
//   { id: 9,  label: "Pay Model" },
//   { id: 10, label: "Pay Setup" },
//   { id: 11, label: "Trust"     },
// ];

// export default function OnboardingFlow() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData]       = useState({});

//   const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
//   const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));
//   const next  = () => {
//     if (currentStep === STEPS.length) {
//       navigate("/hire-talent/dashboard");
//     } else {
//       setCurrentStep((s) => s + 1);
//       window.scrollTo({ top: 0, behavior: "smooth" });
//     }
//   };
//   const prev  = () => { setCurrentStep((s) => Math.max(s - 1, 1));            window.scrollTo({ top: 0, behavior: "smooth" }); };
//   const goTo  = (id) => { if (id <= currentStep) setCurrentStep(id); };
//   const onExit = () => navigate("/hire-talent");

//   const renderStep = () => {
//     const props = { formData, updateData, next, prev, currentStep, totalSteps: STEPS.length };
//     switch (currentStep) {
//       case 1:  return <AccountStep   {...props} />;
//       case 2:  return <VerifyStep    {...props} />;
//       case 3:  return <TypeStep      {...props} />;
//       case 4:  return <ProfileStep   {...props} />;
//       case 5:  return <IntentStep    {...props} />;
//       case 6:  return <AIChatStep    {...props} />;
//       case 7:  return <BlueprintStep {...props} />;
//       case 8:  return <RiskStep      {...props} />;
//       case 9:  return <PayModelStep  {...props} />;
//       case 10: return <PaySetupStep  {...props} />;
//       case 11: return <TrustStep     {...props} />;
//       default: return <AccountStep {...props} />;
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans" style={{ backgroundColor: "#eef2ff" }}>

//       {/* ══ NAVBAR ══════════════════════════════════════════════ */}
//       <nav style={{ backgroundColor: "white", borderBottom: "1px solid #e2e8f0" }}
//            className="sticky top-0 z-50">
//         <div className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
//              style={{ maxWidth: "1280px" }}>
//           <span className="text-2xl font-extrabold cursor-pointer"
//                 style={{ color: "#3b5bdb" }}
//                 onClick={onExit}>
//             ArcLancer
//           </span>
//           <button onClick={onExit}
//                   className="flex items-center gap-2 text-sm font-semibold"
//                   style={{ color: "#374151" }}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
//                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Save &amp; Exit
//           </button>
//         </div>
//       </nav>

//       {/* ══ STEP META + PROGRESS BAR + CIRCLES ════════════════ */}
//       <div className="mx-auto px-6 lg:px-10 pt-5 pb-0" style={{ maxWidth: "1280px" }}>

//         {/* "Step X of 11"  ·  "0% Complete" */}
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium" style={{ color: "#374151" }}>
//             Step {currentStep} of {STEPS.length}
//           </span>
//           <span className="text-sm font-semibold" style={{ color: "#3b5bdb" }}>
//             {progress}% Complete
//           </span>
//         </div>

//         {/* ── Progress bar ──
//             Gray track always visible; blue fill grows with progress */}
//         <div className="w-full" style={{ backgroundColor: "#e2e8f0", height: "3px" }}>
//           <div
//             className="h-full transition-all duration-500"
//             style={{ width: `${progress}%`, backgroundColor: "#3b5bdb" }}
//           />
//         </div>

//         {/* ── Step circles ── */}
//         <div className="flex items-start justify-between overflow-x-auto pt-4 pb-2">
//           {STEPS.map((s) => {
//             const done    = s.id < currentStep;
//             const current = s.id === currentStep;
//             return (
//               <div
//                 key={s.id}
//                 onClick={() => goTo(s.id)}
//                 className={`flex flex-col items-center gap-1.5 flex-1 min-w-0
//                   ${done ? "cursor-pointer" : "cursor-default"}`}
//               >
//                 {/* Circle — w-8/h-8 matches reference size */}
//                 <div
//                   className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all"
//                   style={{
//                     backgroundColor: done    ? "#3b5bdb" : "white",
//                     borderColor:     current ? "#3b5bdb" : done ? "#3b5bdb" : "#d1d5db",
//                     color:           done    ? "white"   : current ? "#3b5bdb" : "#9ca3af",
//                   }}
//                 >
//                   {done ? (
//                     <svg className="w-3.5 h-3.5" fill="none" stroke="white" viewBox="0 0 24 24">
//                       <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   ) : s.id}
//                 </div>

//                 {/* Label */}
//                 <span
//                   className="text-xs font-medium text-center leading-tight truncate w-full px-0.5"
//                   style={{ color: done || current ? "#3b5bdb" : "#9ca3af" }}
//                 >
//                   {s.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ══ STEP CONTENT ══════════════════════════════════════ */}
//       <div className="mx-auto px-6 lg:px-10 py-6" style={{ maxWidth: "1280px" }}>
//         {renderStep()}
//       </div>

//     </div>
//   );
// }









// // OnboardingFlow.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AccountStep    from "./Step1_Account";
// import VerifyStep     from "./Step2_Verify";
// import TypeStep       from "./Step3_Type";
// import ProfileStep    from "./Step4_Profile";
// import IntentStep     from "./Step5_Intent";
// import AIChatStep     from "./Step6_AIChat";
// import BlueprintStep  from "./Step7_Blueprint";
// import RiskStep       from "./Step8_Risk";
// import PayModelStep   from "./Step9_PayModel";
// import PaySetupStep   from "./Step10_PaySetup";
// import TrustStep      from "./Step11_Trust";

// const STEPS = [
//   { id: 1,  label: "Account"   },
//   { id: 2,  label: "Verify"    },
//   { id: 3,  label: "Type"      },
//   { id: 4,  label: "Profile"   },
//   { id: 5,  label: "Intent"    },
//   { id: 6,  label: "AI Chat"   },
//   { id: 7,  label: "Blueprint" },
//   { id: 8,  label: "Risk"      },
//   { id: 9,  label: "Pay Model" },
//   { id: 10, label: "Pay Setup" },
//   { id: 11, label: "Trust"     },
// ];

// /* ── WebLance tokens ── */
// const G = {
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",
//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   navyBg:      "#e8edf7",
//   navyBorder:  "#b8c6e0",
//   gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
// };

// export default function OnboardingFlow() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData,    setFormData]    = useState({});

//   const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
//   const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));
//   const next = () => {
//     if (currentStep === STEPS.length) { navigate("/hire-talent/dashboard"); }
//     else { setCurrentStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
//   };
//   const prev   = () => { setCurrentStep((s) => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
//   const goTo   = (id) => { if (id <= currentStep) setCurrentStep(id); };
//   const onExit = () => navigate("/hire-talent");

//   const renderStep = () => {
//     const props = { formData, updateData, next, prev, currentStep, totalSteps: STEPS.length };
//     switch (currentStep) {
//       case 1:  return <AccountStep   {...props} />;
//       case 2:  return <VerifyStep    {...props} />;
//       case 3:  return <TypeStep      {...props} />;
//       case 4:  return <ProfileStep   {...props} />;
//       case 5:  return <IntentStep    {...props} />;
//       case 6:  return <AIChatStep    {...props} />;
//       case 7:  return <BlueprintStep {...props} />;
//       case 8:  return <RiskStep      {...props} />;
//       case 9:  return <PayModelStep  {...props} />;
//       case 10: return <PaySetupStep  {...props} />;
//       case 11: return <TrustStep     {...props} />;
//       default: return <AccountStep   {...props} />;
//     }
//   };

//   return (
//     <div className="min-h-screen font-sans" style={{ backgroundColor: "#f9fafb" }}>

//       {/* ══ NAVBAR ══ */}
//       <nav className="sticky top-0 z-50"
//         style={{ backgroundColor: "white", borderBottom: `1px solid ${G.greenBorder}`, boxShadow: "0 2px 12px rgba(110,192,48,0.08)" }}>
//         <div className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between" style={{ maxWidth: "1280px" }}>

//           {/* ── Logo — /weblance.jpeg ── */}
//           <img
//             src="/weblance.jpeg"
//             alt="WebLance"
//             onClick={onExit}
//             className="cursor-pointer"
//             style={{ height: 56, width: 155 }}
//           />

//           <button onClick={onExit}
//             className="flex items-center gap-2 text-sm font-semibold transition-colors"
//             style={{ color: G.sub }}
//             onMouseEnter={e => e.currentTarget.style.color = G.navyDeep}
//             onMouseLeave={e => e.currentTarget.style.color = G.sub}>
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
//                     strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//             </svg>
//             Save &amp; Exit
//           </button>
//         </div>
//       </nav>

//       {/* ══ STEP META + PROGRESS + CIRCLES ══ */}
//       <div className="mx-auto px-6 lg:px-10 pt-5 pb-0" style={{ maxWidth: "1280px" }}>

//         {/* Step X of 11  ·  % Complete */}
//         <div className="flex items-center justify-between mb-2">
//           <span className="text-sm font-medium" style={{ color: G.sub }}>
//             Step {currentStep} of {STEPS.length}
//           </span>
//           {/* % Complete → Green */}
//           <span className="text-sm font-semibold" style={{ color: G.green }}>
//             {progress}% Complete
//           </span>
//         </div>

//         {/* Progress bar — Green→Navy mixed gradient */}
//         <div className="w-full rounded-full overflow-hidden" style={{ backgroundColor: "#e2e8f0", height: "3px" }}>
//           <div className="h-full transition-all duration-500 rounded-full"
//             style={{ width: `${progress}%`, background: G.mixedGrad }}/>
//         </div>

//         {/* Step circles */}
//         <div className="flex items-start justify-between overflow-x-auto pt-4 pb-2">
//           {STEPS.map((s) => {
//             const done    = s.id < currentStep;
//             const current = s.id === currentStep;
//             return (
//               <div key={s.id} onClick={() => goTo(s.id)}
//                 className={`flex flex-col items-center gap-1.5 flex-1 min-w-0 ${done ? "cursor-pointer" : "cursor-default"}`}>

//                 {/* Circle */}
//                 <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all"
//                   style={{
//                     /* Done → Navy gradient fill */
//                     background:   done    ? G.gradNavy : "white",
//                     borderColor:  current ? G.navyLight : done ? G.navyLight : "#d1d5db",
//                     color:        done    ? "white"     : current ? G.navyLight : G.muted,
//                     boxShadow:    current ? `0 0 0 3px rgba(74,111,165,0.18)` : "none",
//                   }}>
//                   {done ? (
//                     <svg className="w-3.5 h-3.5" fill="none" stroke="white" viewBox="0 0 24 24">
//                       <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   ) : s.id}
//                 </div>

//                 {/* Label */}
//                 <span className="text-xs font-medium text-center leading-tight truncate w-full px-0.5"
//                   style={{ color: current ? G.navyLight : done ? G.navyDeep : G.muted }}>
//                   {s.label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ══ STEP CONTENT ══ */}
//       <div className="mx-auto px-6 lg:px-10 py-6" style={{ maxWidth: "1280px" }}>
//         {renderStep()}
//       </div>

//     </div>
//   );
// }







// // OnboardingFlow.jsx
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AccountStep    from "./Step1_Account";
// import VerifyStep     from "./Step2_Verify";
// import TypeStep       from "./Step3_Type";
// import ProfileStep    from "./Step4_Profile";
// import IntentStep     from "./Step5_Intent";
// import AIChatStep     from "./Step6_AIChat";
// import BlueprintStep  from "./Step7_Blueprint";
// import RiskStep       from "./Step8_Risk";
// import PayModelStep   from "./Step9_PayModel";
// import PaySetupStep   from "./Step10_PaySetup";
// import TrustStep      from "./Step11_Trust";

// const STEPS = [
//   { id: 1,  label: "Account"   },
//   { id: 2,  label: "Verify"    },
//   { id: 3,  label: "Type"      },
//   { id: 4,  label: "Profile"   },
//   { id: 5,  label: "Intent"    },
//   { id: 6,  label: "AI Chat"   },
//   { id: 7,  label: "Blueprint" },
//   { id: 8,  label: "Risk"      },
//   { id: 9,  label: "Pay Model" },
//   { id: 10, label: "Pay Setup" },
//   { id: 11, label: "Trust"     },
// ];

// /* ── WebLance tokens ── */
// const G = {
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",
//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   navyBg:      "#e8edf7",
//   navyBorder:  "#b8c6e0",
//   gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
// };

// export default function OnboardingFlow() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData,    setFormData]    = useState({});

//   const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
//   const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));

//   const next = () => {
//     if (currentStep === STEPS.length) { navigate("/hire-talent/dashboard"); }
//     else { setCurrentStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
//   };
//   const prev   = () => { setCurrentStep((s) => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
//   const goTo   = (id) => { if (id <= currentStep) setCurrentStep(id); };
//   const onExit = () => navigate("/hire-talent");

//   const renderStep = () => {
//     const props = { formData, updateData, next, prev, currentStep, totalSteps: STEPS.length };
//     switch (currentStep) {
//       case 1:  return <AccountStep   {...props} />;
//       case 2:  return <VerifyStep    {...props} />;
//       case 3:  return <TypeStep      {...props} />;
//       case 4:  return <ProfileStep   {...props} />;
//       case 5:  return <IntentStep    {...props} />;
//       case 6:  return <AIChatStep    {...props} />;
//       case 7:  return <BlueprintStep {...props} />;
//       case 8:  return <RiskStep      {...props} />;
//       case 9:  return <PayModelStep  {...props} />;
//       case 10: return <PaySetupStep  {...props} />;
//       case 11: return <TrustStep     {...props} />;
//       default: return <AccountStep   {...props} />;
//     }
//   };

//   return (
//     <>
//       <style>{`
//         /* ─────────────────────────────────────
//            STEP STRIP  — connecting line layout
//         ───────────────────────────────────── */

//         .step-strip-wrap {
//           position: relative;
//           display: flex;
//           align-items: flex-start;
//           padding-top: 16px;
//           padding-bottom: 10px;
//           overflow-x: auto;
//           -webkit-overflow-scrolling: touch;
//           scrollbar-width: none;
//         }
//         .step-strip-wrap::-webkit-scrollbar { display: none; }

//         /*
//           The horizontal line passes through the CENTER of all circles.
//           Circle height = 32px, so center = 16px from top of circle area.
//           With padding-top:16px the absolute top = 16 + 16 = 32px.
//         */
//         .step-track {
//           position: absolute;
//           top: 32px;
//           left: calc(100% / (11 * 2));   /* start at center of first circle */
//           right: calc(100% / (11 * 2));  /* end at center of last circle */
//           height: 2px;
//           background: #e2e8f0;
//           z-index: 0;
//           border-radius: 2px;
//         }

//         /* Filled (completed) portion */
//         .step-track-fill {
//           position: absolute;
//           top: 0;
//           left: 0;
//           height: 100%;
//           border-radius: 2px;
//           background: linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%);
//           transition: width 0.5s ease;
//         }

//         /* Each step column */
//         .step-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 7px;
//           flex: 1;
//           min-width: 0;
//           position: relative;
//           z-index: 1;
//         }

//         /* Circle */
//         .step-circle {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 12px;
//           font-weight: 700;
//           border: 2px solid #d1d5db;
//           flex-shrink: 0;
//           transition: all 0.25s ease;
//           background: white;
//         }

//         /* Label under circle */
//         .step-lbl {
//           font-size: 11px;
//           font-weight: 500;
//           text-align: center;
//           line-height: 1.25;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           width: 100%;
//           padding: 0 2px;
//           transition: color 0.2s;
//         }

//         /* ─── Responsive ─── */

//         /* Tablet (≤900px): compact labels */
//         @media (max-width: 900px) {
//           .step-lbl { font-size: 10px; }
//           .step-circle { width: 28px; height: 28px; font-size: 11px; }
//           .step-track  { top: 30px; }
//         }

//         /* Small tablet / large phone (≤640px): hide labels */
//         @media (max-width: 640px) {
//           .step-lbl    { display: none; }
//           .step-circle { width: 26px; height: 26px; font-size: 10px; }
//           .step-track  { top: 29px; }
//           .step-strip-wrap { padding-top: 12px; }
//         }

//         /* Small phone (≤420px): even more compact */
//         @media (max-width: 420px) {
//           .step-circle { width: 22px; height: 22px; font-size: 9px; }
//           .step-track  { top: 23px; }
//         }

//         /* ─── Navbar responsive ─── */
//         @media (max-width: 480px) {
//           .nav-logo     { height: 38px !important; width: 105px !important; }
//           .nav-exit-lbl { display: none !important; }
//           .nav-exit     { gap: 0 !important; }
//         }
//       `}</style>

//       <div style={{ minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>

//         {/* ══ NAVBAR ══ */}
//         <nav style={{
//           position: "sticky", top: 0, zIndex: 50,
//           backgroundColor: "white",
//           borderBottom: `1px solid ${G.greenBorder}`,
//           boxShadow: "0 2px 12px rgba(110,192,48,0.08)",
//         }}>
//           <div style={{ maxWidth: 1280, margin: "0 auto", padding: "0 24px", height: 64, display: "flex", alignItems: "center", justifyContent: "space-between" }}>

//             <img
//               src="/weblance.jpeg"
//               alt="WebLance"
//               onClick={onExit}
//               className="nav-logo"
//               style={{ height: 56, width: 155, cursor: "pointer", objectFit: "contain", display: "block" }}
//             />

//             <button
//               className="nav-exit"
//               onClick={onExit}
//               style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 600, color: G.sub, background: "none", border: "none", cursor: "pointer", transition: "color 0.2s", padding: 0 }}
//               onMouseEnter={e => e.currentTarget.style.color = G.navyDeep}
//               onMouseLeave={e => e.currentTarget.style.color = G.sub}
//             >
//               <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
//                       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <span className="nav-exit-lbl">Save &amp; Exit</span>
//             </button>
//           </div>
//         </nav>

//         {/* ══ PROGRESS SECTION ══ */}
//         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 0" }}>

//           {/* Step X of 11  ·  % Complete */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
//             <span style={{ fontSize: 14, fontWeight: 500, color: G.sub }}>
//               Step {currentStep} of {STEPS.length}
//             </span>
//             <span style={{ fontSize: 14, fontWeight: 600, color: G.green }}>
//               {progress}% Complete
//             </span>
//           </div>

//           {/* Thin animated progress bar */}
//           <div style={{ width: "100%", borderRadius: 99, overflow: "hidden", backgroundColor: "#e2e8f0", height: 3 }}>
//             <div style={{
//               width: `${progress}%`,
//               height: "100%",
//               background: G.mixedGrad,
//               transition: "width 0.5s ease",
//               borderRadius: 99,
//             }} />
//           </div>

//           {/* ── Step circles + connecting line ── */}
//           <div className="step-strip-wrap">

//             {/* The grey track + colored fill behind all circles */}
//             <div className="step-track">
//               <div className="step-track-fill" style={{ width: `${progress}%` }} />
//             </div>

//             {STEPS.map((s) => {
//               const done    = s.id < currentStep;
//               const current = s.id === currentStep;

//               return (
//                 <div
//                   key={s.id}
//                   className="step-item"
//                   onClick={() => goTo(s.id)}
//                   style={{ cursor: done ? "pointer" : "default" }}
//                 >
//                   {/* Circle */}
//                   <div
//                     className="step-circle"
//                     style={{
//                       background:  done    ? G.gradNavy  : "white",
//                       borderColor: current ? G.navyLight : done ? G.navyLight : "#d1d5db",
//                       color:       done    ? "white"     : current ? G.navyLight : G.muted,
//                       boxShadow:   current ? `0 0 0 3px rgba(74,111,165,0.18)` : "none",
//                     }}
//                   >
//                     {done ? (
//                       <svg style={{ width: 13, height: 13 }} fill="none" stroke="white" viewBox="0 0 24 24">
//                         <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     ) : s.id}
//                   </div>

//                   {/* Label */}
//                   <span
//                     className="step-lbl"
//                     style={{
//                       color:      current ? G.navyLight : done ? G.navyDeep : G.muted,
//                       fontWeight: current ? 700 : 500,
//                     }}
//                   >
//                     {s.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ══ STEP CONTENT ══ */}
//         <div style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px" }}>
//           {renderStep()}
//         </div>

//       </div>
//     </>
//   );
// }








// // OnboardingFlow.jsx  —  Hire-Talent flow
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import AccountStep    from "./Step1_Account";
// import VerifyStep     from "./Step2_Verify";
// import TypeStep       from "./Step3_Type";
// import ProfileStep    from "./Step4_Profile";
// import IntentStep     from "./Step5_Intent";
// import AIChatStep     from "./Step6_AIChat";
// import BlueprintStep  from "./Step7_Blueprint";
// import RiskStep       from "./Step8_Risk";
// import PayModelStep   from "./Step9_PayModel";
// import PaySetupStep   from "./Step10_PaySetup";
// import TrustStep      from "./Step11_Trust";

// const STEPS = [
//   { id: 1,  label: "Account"   },
//   { id: 2,  label: "Verify"    },
//   { id: 3,  label: "Type"      },
//   { id: 4,  label: "Profile"   },
//   { id: 5,  label: "Intent"    },
//   { id: 6,  label: "AI Chat"   },
//   { id: 7,  label: "Blueprint" },
//   { id: 8,  label: "Risk"      },
//   { id: 9,  label: "Pay Model" },
//   { id: 10, label: "Pay Setup" },
//   { id: 11, label: "Trust"     },
// ];

// /* ── WebLance colour tokens ── */
// const G = {
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",
//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
// };

// export default function OnboardingFlow() {
//   const navigate = useNavigate();
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData,    setFormData]    = useState({});

//   const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
//   const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));

//   const next = () => {
//     if (currentStep === STEPS.length) { navigate("/hire-talent/dashboard"); }
//     else { setCurrentStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
//   };
//   const prev   = () => { setCurrentStep((s) => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
//   const goTo   = (id) => { if (id <= currentStep) setCurrentStep(id); };
//   const onExit = () => navigate("/hire-talent");

//   const renderStep = () => {
//     const props = { formData, updateData, next, prev, currentStep, totalSteps: STEPS.length };
//     switch (currentStep) {
//       case 1:  return <AccountStep   {...props} />;
//       case 2:  return <VerifyStep    {...props} />;
//       case 3:  return <TypeStep      {...props} />;
//       case 4:  return <ProfileStep   {...props} />;
//       case 5:  return <IntentStep    {...props} />;
//       case 6:  return <AIChatStep    {...props} />;
//       case 7:  return <BlueprintStep {...props} />;
//       case 8:  return <RiskStep      {...props} />;
//       case 9:  return <PayModelStep  {...props} />;
//       case 10: return <PaySetupStep  {...props} />;
//       case 11: return <TrustStep     {...props} />;
//       default: return <AccountStep   {...props} />;
//     }
//   };

//   return (
//     <>
//       <style>{`
//         /* ═══════════════════════════════════════════
//            STEP STRIP  —  circles + connecting line
//         ═══════════════════════════════════════════ */

//         .wbl-step-strip {
//           position: relative;
//           display: flex;
//           align-items: flex-start;
//           padding-top: 16px;
//           padding-bottom: 10px;
//           /* NO overflow-x scroll — circles shrink to fit instead */
//         }

//         /*
//           Horizontal track through circle centres.
//           Circle height = 32px → centre = 16px from top.
//           With padding-top:16px → absolute top = 16+16 = 32px.
//           left/right offset = half of (100% / number_of_steps)
//           so the line starts and ends exactly at the centre of
//           the first and last circles.
//         */
//         .wbl-step-track {
//           position: absolute;
//           top: 32px;
//           left:  calc(100% / ${STEPS.length * 2});
//           right: calc(100% / ${STEPS.length * 2});
//           height: 2px;
//           background: #e2e8f0;
//           border-radius: 2px;
//           z-index: 0;
//         }

//         /* Coloured fill — grows as steps are completed */
//         .wbl-step-fill {
//           position: absolute;
//           top: 0; left: 0;
//           height: 100%;
//           border-radius: 2px;
//           background: ${G.mixedGrad};
//           transition: width 0.5s ease;
//         }

//         /* Each step column */
//         .wbl-step-item {
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 7px;
//           flex: 1;
//           min-width: 0;
//           position: relative;
//           z-index: 1;
//         }

//         /* Circle */
//         .wbl-step-circle {
//           width: 32px;
//           height: 32px;
//           border-radius: 50%;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//           font-size: 12px;
//           font-weight: 700;
//           border: 2px solid #d1d5db;
//           flex-shrink: 0;
//           transition: all 0.25s ease;
//           background: white;
//           /* Prevent circle from squishing */
//           min-width: 32px;
//         }

//         /* Label under circle */
//         .wbl-step-lbl {
//           font-size: 11px;
//           font-weight: 500;
//           text-align: center;
//           line-height: 1.25;
//           white-space: nowrap;
//           overflow: hidden;
//           text-overflow: ellipsis;
//           width: 100%;
//           padding: 0 2px;
//           transition: color 0.2s;
//         }

//         /* ═══════════════════════════════════════
//            RESPONSIVE  BREAKPOINTS
//         ═══════════════════════════════════════ */

//         /* Tablet  640–900px: smaller text, smaller circles */
//         @media (max-width: 900px) {
//           .wbl-step-lbl    { font-size: 10px; }
//           .wbl-step-circle { width: 28px; height: 28px; min-width: 28px; font-size: 11px; }
//           .wbl-step-track  { top: 30px; }
//         }

//         /* Large phone  480–640px: hide labels entirely */
//         @media (max-width: 640px) {
//           .wbl-step-lbl    { display: none; }
//           .wbl-step-circle { width: 26px; height: 26px; min-width: 26px; font-size: 10px; }
//           .wbl-step-track  { top: 29px; }
//           .wbl-step-strip  { padding-top: 12px; padding-bottom: 6px; }
//         }

//         /* Small phone  ≤420px */
//         @media (max-width: 420px) {
//           .wbl-step-circle { width: 22px; height: 22px; min-width: 22px; font-size: 9px; }
//           .wbl-step-item   { gap: 5px; }
//           .wbl-step-track  { top: 23px; }
//           .wbl-step-strip  { padding-top: 10px; }
//         }

//         /* Very small phone  ≤360px */
//         @media (max-width: 360px) {
//           .wbl-step-circle { width: 20px; height: 20px; min-width: 20px; font-size: 8px; border-width: 1.5px; }
//           .wbl-step-track  { top: 21px; height: 1.5px; }
//         }

//         /* ── Navbar compact ── */
//         @media (max-width: 480px) {
//           .wbl-nav-logo     { height: 40px !important; width: 112px !important; }
//           .wbl-nav-exit-lbl { display: none !important; }
//         }
//         @media (max-width: 360px) {
//           .wbl-nav-logo { height: 34px !important; width: 95px !important; }
//         }

//         /* ── Progress section padding ── */
//         @media (max-width: 640px) {
//           .wbl-progress-wrap { padding: 14px 16px 0 !important; }
//         }
//         @media (max-width: 480px) {
//           .wbl-progress-wrap { padding: 12px 14px 0 !important; }
//         }

//         /* ── Step content padding ── */
//         @media (max-width: 640px) {
//           .wbl-content-wrap { padding: 16px 16px !important; }
//         }
//         @media (max-width: 480px) {
//           .wbl-content-wrap { padding: 14px 12px !important; }
//         }
//       `}</style>

//       <div style={{ minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>

//         {/* ══ NAVBAR ══ */}
//         <nav style={{
//           position: "sticky", top: 0, zIndex: 50,
//           backgroundColor: "white",
//           borderBottom: `1px solid ${G.greenBorder}`,
//           boxShadow: "0 2px 12px rgba(110,192,48,0.08)",
//         }}>
//           <div style={{
//             maxWidth: 1280, margin: "0 auto",
//             padding: "0 24px", height: 64,
//             display: "flex", alignItems: "center", justifyContent: "space-between",
//           }}>
//             <img
//               src="/weblance.jpeg"
//               alt="WebLance"
//               onClick={onExit}
//               className="wbl-nav-logo"
//               style={{ height: 56, width: 155, cursor: "pointer", objectFit: "contain", display: "block" }}
//             />
//             <button
//               onClick={onExit}
//               style={{
//                 display: "flex", alignItems: "center", gap: 8,
//                 fontSize: 14, fontWeight: 600, color: G.sub,
//                 background: "none", border: "none", cursor: "pointer",
//                 transition: "color 0.2s", padding: 0,
//               }}
//               onMouseEnter={e => e.currentTarget.style.color = G.navyDeep}
//               onMouseLeave={e => e.currentTarget.style.color = G.sub}
//             >
//               <svg style={{ width: 16, height: 16, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
//                       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <span className="wbl-nav-exit-lbl">Save &amp; Exit</span>
//             </button>
//           </div>
//         </nav>

//         {/* ══ PROGRESS + STEP CIRCLES ══ */}
//         <div
//           className="wbl-progress-wrap"
//           style={{ maxWidth: 1280, margin: "0 auto", padding: "20px 24px 0" }}
//         >
//           {/* Step X of N  ·  % Complete */}
//           <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
//             <span style={{ fontSize: 14, fontWeight: 500, color: G.sub }}>
//               Step {currentStep} of {STEPS.length}
//             </span>
//             <span style={{ fontSize: 14, fontWeight: 700, color: G.green }}>
//               {progress}% Complete
//             </span>
//           </div>

//           {/* Thin animated progress bar */}
//           <div style={{ width: "100%", height: 3, borderRadius: 99, background: "#e2e8f0", overflow: "hidden" }}>
//             <div style={{
//               width: `${progress}%`, height: "100%",
//               background: G.mixedGrad,
//               borderRadius: 99, transition: "width 0.5s ease",
//             }} />
//           </div>

//           {/* ── Circles row ── */}
//           <div className="wbl-step-strip">

//             {/* Grey track + coloured fill */}
//             <div className="wbl-step-track">
//               <div className="wbl-step-fill" style={{ width: `${progress}%` }} />
//             </div>

//             {STEPS.map((s) => {
//               const done    = s.id < currentStep;
//               const current = s.id === currentStep;
//               return (
//                 <div
//                   key={s.id}
//                   className="wbl-step-item"
//                   onClick={() => goTo(s.id)}
//                   style={{ cursor: done ? "pointer" : "default" }}
//                 >
//                   {/* Circle */}
//                   <div
//                     className="wbl-step-circle"
//                     style={{
//                       background:  done    ? G.gradNavy  : "white",
//                       borderColor: current ? G.navyLight : done ? G.navyLight : "#d1d5db",
//                       color:       done    ? "white"     : current ? G.navyLight : G.muted,
//                       boxShadow:   current ? `0 0 0 3px rgba(74,111,165,0.18)` : "none",
//                     }}
//                   >
//                     {done ? (
//                       <svg style={{ width: 12, height: 12 }} fill="none" stroke="white" viewBox="0 0 24 24">
//                         <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                     ) : s.id}
//                   </div>

//                   {/* Label */}
//                   <span
//                     className="wbl-step-lbl"
//                     style={{
//                       color:      current ? G.navyLight : done ? G.navyDeep : G.muted,
//                       fontWeight: current ? 700 : 500,
//                     }}
//                   >
//                     {s.label}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* ══ STEP CONTENT ══ */}
//         <div
//           className="wbl-content-wrap"
//           style={{ maxWidth: 1280, margin: "0 auto", padding: "24px 24px" }}
//         >
//           {renderStep()}
//         </div>

//       </div>
//     </>
//   );
// }






// OnboardingFlow.jsx  —  Hire-Talent flow
import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import AccountStep    from "./Step1_Account";
import VerifyStep     from "./Step2_Verify";
import TypeStep       from "./Step3_Type";
import ProfileStep    from "./Step4_Profile";
import IntentStep     from "./Step5_Intent";
import AIChatStep     from "./Step6_AIChat";
import BlueprintStep  from "./Step7_Blueprint";
import RiskStep       from "./Step8_Risk";
import PayModelStep   from "./Step9_PayModel";
import PaySetupStep   from "./Step10_PaySetup";
import TrustStep      from "./Step11_Trust";

const STEPS = [
  { id: 1,  label: "Account"   },
  { id: 2,  label: "Verify"    },
  { id: 3,  label: "Type"      },
  { id: 4,  label: "Profile"   },
  { id: 5,  label: "Intent"    },
  { id: 6,  label: "AI Chat"   },
  { id: 7,  label: "Blueprint" },
  { id: 8,  label: "Risk"      },
  { id: 9,  label: "Pay Model" },
  { id: 10, label: "Pay Setup" },
  { id: 11, label: "Trust"     },
];

/* ── WebLance colour tokens ── */
const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:         "#4b5563",
  muted:       "#9ca3af",
};

/* ── Draggable scrollable step strip ── */
function DraggableStepStrip({ steps, currentStep, onGoTo, progress }) {
  const stripRef    = useRef(null);
  const isDragging  = useRef(false);
  const startX      = useRef(0);
  const scrollStart = useRef(0);
  const hasDragged  = useRef(false);

  /* Auto-scroll active step into view */
  useEffect(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const activeEl = strip.querySelector("[data-active='true']");
    if (activeEl) {
      const stripLeft   = strip.getBoundingClientRect().left;
      const elLeft      = activeEl.getBoundingClientRect().left;
      const elCenter    = elLeft - stripLeft + activeEl.offsetWidth / 2;
      const stripCenter = strip.clientWidth / 2;
      strip.scrollTo({ left: strip.scrollLeft + elCenter - stripCenter, behavior: "smooth" });
    }
  }, [currentStep]);

  /* ── Pointer (mouse + touch) drag handlers ── */
  const onPointerDown = useCallback((e) => {
    isDragging.current  = true;
    hasDragged.current  = false;
    startX.current      = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    scrollStart.current = stripRef.current?.scrollLeft ?? 0;
    stripRef.current?.setPointerCapture?.(e.pointerId);
  }, []);

  const onPointerMove = useCallback((e) => {
    if (!isDragging.current) return;
    const x    = e.clientX ?? e.touches?.[0]?.clientX ?? 0;
    const diff = startX.current - x;
    if (Math.abs(diff) > 4) hasDragged.current = true;
    if (stripRef.current) stripRef.current.scrollLeft = scrollStart.current + diff;
  }, []);

  const onPointerUp = useCallback(() => { isDragging.current = false; }, []);

  /* Track width = full scrollWidth of items; fill = proportion */
  const CIRCLE_W  = 48; // item min-width in px (circle + padding)
  const totalW    = steps.length * CIRCLE_W;
  const fillWidth = `${Math.max(0, Math.min(100, progress))}%`;

  return (
    <div style={{ position: "relative" }}>

      {/* ── scrollable container ── */}
      <div
        ref={stripRef}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
        /* touch fallback */
        onTouchStart={e => onPointerDown(e.touches[0])}
        onTouchMove={e  => onPointerMove(e.touches[0])}
        onTouchEnd={onPointerUp}
        style={{
          display:          "flex",
          overflowX:        "auto",
          overflowY:        "visible",
          cursor:           "grab",
          userSelect:       "none",
          WebkitOverflowScrolling: "touch",
          scrollbarWidth:   "none",        /* Firefox */
          msOverflowStyle:  "none",        /* IE/Edge */
          paddingTop:       18,
          paddingBottom:    12,
          paddingLeft:      4,
          paddingRight:     4,
          position:         "relative",
        }}
      >
        {/* hide scrollbar WebKit */}
        <style>{`
          .wbl-strip::-webkit-scrollbar { display: none; }
        `}</style>

        {/* Grey track sits INSIDE the scroll container so it stretches with content */}
        <div
          style={{
            position:     "absolute",
            top:          34,   /* 18px paddingTop + 16px half-circle height */
            left:         "calc(100% / " + (steps.length * 2) + ")",
            right:        "calc(100% / " + (steps.length * 2) + ")",
            height:       2,
            background:   "#e2e8f0",
            borderRadius: 2,
            zIndex:       0,
            pointerEvents:"none",
          }}
        >
          {/* Coloured fill */}
          <div style={{
            position:     "absolute",
            top: 0, left: 0,
            height:       "100%",
            width:        fillWidth,
            background:   G.mixedGrad,
            borderRadius: 2,
            transition:   "width 0.5s ease",
          }} />
        </div>

        {/* Step items */}
        {steps.map((s) => {
          const done    = s.id < currentStep;
          const current = s.id === currentStep;
          return (
            <div
              key={s.id}
              data-active={current ? "true" : "false"}
              onClick={() => { if (!hasDragged.current) onGoTo(s.id); }}
              style={{
                display:       "flex",
                flexDirection: "column",
                alignItems:    "center",
                gap:           7,
                flex:          "0 0 auto",
                width:         `calc(100% / ${steps.length})`,
                minWidth:      52,
                position:      "relative",
                zIndex:        1,
                cursor:        done ? "pointer" : "default",
              }}
            >
              {/* Circle */}
              <div style={{
                width:       32,
                height:      32,
                minWidth:    32,
                borderRadius:"50%",
                display:     "flex",
                alignItems:  "center",
                justifyContent:"center",
                fontSize:    12,
                fontWeight:  700,
                border:      `2px solid ${current ? G.navyLight : done ? G.navyLight : "#d1d5db"}`,
                background:  done ? G.gradNavy : "white",
                color:       done ? "white" : current ? G.navyLight : G.muted,
                boxShadow:   current ? `0 0 0 3px rgba(74,111,165,0.18)` : "none",
                transition:  "all 0.25s ease",
                flexShrink:  0,
              }}>
                {done ? (
                  <svg style={{ width:12, height:12 }} fill="none" stroke="white" viewBox="0 0 24 24">
                    <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                ) : s.id}
              </div>

              {/* Label */}
              <span style={{
                fontSize:   11,
                fontWeight: current ? 700 : 500,
                color:      current ? G.navyLight : done ? G.navyDeep : G.muted,
                textAlign:  "center",
                lineHeight: 1.25,
                whiteSpace: "nowrap",
                width:      "100%",
                paddingLeft:2,
                paddingRight:2,
                overflow:   "hidden",
                textOverflow:"ellipsis",
              }}>
                {s.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function OnboardingFlow() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData,    setFormData]    = useState({});

  const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
  const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const next = () => {
    if (currentStep === STEPS.length) { navigate("/hire-talent/dashboard"); }
    else { setCurrentStep((s) => s + 1); window.scrollTo({ top: 0, behavior: "smooth" }); }
  };
  const prev   = () => { setCurrentStep((s) => Math.max(s - 1, 1)); window.scrollTo({ top: 0, behavior: "smooth" }); };
  const goTo   = (id) => { if (id <= currentStep) setCurrentStep(id); };
  const onExit = () => navigate("/hire-talent");

  const renderStep = () => {
    const props = { formData, updateData, next, prev, currentStep, totalSteps: STEPS.length };
    switch (currentStep) {
      case 1:  return <AccountStep   {...props} />;
      case 2:  return <VerifyStep    {...props} />;
      case 3:  return <TypeStep      {...props} />;
      case 4:  return <ProfileStep   {...props} />;
      case 5:  return <IntentStep    {...props} />;
      case 6:  return <AIChatStep    {...props} />;
      case 7:  return <BlueprintStep {...props} />;
      case 8:  return <RiskStep      {...props} />;
      case 9:  return <PayModelStep  {...props} />;
      case 10: return <PaySetupStep  {...props} />;
      case 11: return <TrustStep     {...props} />;
      default: return <AccountStep   {...props} />;
    }
  };

  return (
    <>
      <style>{`
        * { box-sizing: border-box; }

        /* ── hide webkit scrollbar on strip ── */
        .wbl-strip-scroll::-webkit-scrollbar { display: none; }

        /* ── Navbar ── */
        .wbl-navbar {
          position: sticky;
          top: 0;
          z-index: 50;
          background: white;
          border-bottom: 1px solid ${G.greenBorder};
          box-shadow: 0 2px 12px rgba(110,192,48,0.08);
        }
        .wbl-navbar-inner {
          max-width: 1280px;
          margin: 0 auto;
          padding: 0 24px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .wbl-logo {
          height: 56px;
          width: auto;
          cursor: pointer;
          object-fit: contain;
          display: block;
        }
        .wbl-exit-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 14px;
          font-weight: 600;
          color: ${G.sub};
          background: none;
          border: none;
          cursor: pointer;
          transition: color 0.2s;
          padding: 0;
          white-space: nowrap;
        }
        .wbl-exit-btn:hover { color: ${G.navyDeep}; }
        .wbl-exit-icon {
          width: 16px;
          height: 16px;
          flex-shrink: 0;
        }

        /* Responsive navbar */
        @media (max-width: 480px) {
          .wbl-navbar-inner { padding: 0 16px; height: 56px; }
          .wbl-logo { height: 40px; }
          .wbl-exit-label { display: none; }
        }
        @media (max-width: 360px) {
          .wbl-navbar-inner { padding: 0 12px; height: 50px; }
          .wbl-logo { height: 34px; }
        }

        /* ── Progress wrap ── */
        .wbl-progress-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 20px 24px 0;
        }
        @media (max-width: 640px) {
          .wbl-progress-wrap { padding: 14px 16px 0; }
        }
        @media (max-width: 480px) {
          .wbl-progress-wrap { padding: 12px 14px 0; }
        }

        /* ── Content wrap ── */
        .wbl-content-wrap {
          max-width: 1280px;
          margin: 0 auto;
          padding: 24px;
        }
        @media (max-width: 640px) {
          .wbl-content-wrap { padding: 16px; }
        }
        @media (max-width: 480px) {
          .wbl-content-wrap { padding: 14px 12px; }
        }

        /* ── Step text row ── */
        .wbl-step-meta {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        .wbl-step-of {
          font-size: 14px;
          font-weight: 500;
          color: ${G.sub};
        }
        .wbl-step-pct {
          font-size: 14px;
          font-weight: 700;
          color: ${G.green};
        }
        @media (max-width: 480px) {
          .wbl-step-of  { font-size: 13px; }
          .wbl-step-pct { font-size: 13px; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", fontFamily: "sans-serif", backgroundColor: "#f9fafb" }}>

        {/* ══ NAVBAR ══ */}
        <nav className="wbl-navbar">
          <div className="wbl-navbar-inner">

            <img
              src="/weblance.jpeg"
              alt="WebLance"
              onClick={onExit}
              className="wbl-logo"
            />

            <button className="wbl-exit-btn" onClick={onExit}>
              <svg className="wbl-exit-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
                  strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
                />
              </svg>
              <span className="wbl-exit-label">Save &amp; Exit</span>
            </button>

          </div>
        </nav>

        {/* ══ PROGRESS + STEP CIRCLES ══ */}
        <div className="wbl-progress-wrap">

          {/* Step X of N  ·  % Complete */}
          <div className="wbl-step-meta">
            <span className="wbl-step-of">Step {currentStep} of {STEPS.length}</span>
            <span className="wbl-step-pct">{progress}% Complete</span>
          </div>

          {/* Thin animated progress bar */}
          <div style={{ width:"100%", height:3, borderRadius:99, background:"#e2e8f0", overflow:"hidden" }}>
            <div style={{
              width:`${progress}%`, height:"100%",
              background: G.mixedGrad,
              borderRadius:99, transition:"width 0.5s ease",
            }} />
          </div>

          {/* ── Draggable / scrollable step circles ── */}
          <DraggableStepStrip
            steps={STEPS}
            currentStep={currentStep}
            onGoTo={goTo}
            progress={progress}
          />
        </div>

        {/* ══ STEP CONTENT ══ */}
        <div className="wbl-content-wrap">
          {renderStep()}
        </div>

      </div>
    </>
  );
}
