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









// OnboardingFlow.jsx
import { useState } from "react";
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

/* ── WebLance tokens ── */
const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:         "#4b5563",
  muted:       "#9ca3af",
};

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
    <div className="min-h-screen font-sans" style={{ backgroundColor: "#f9fafb" }}>

      {/* ══ NAVBAR ══ */}
      <nav className="sticky top-0 z-50"
        style={{ backgroundColor: "white", borderBottom: `1px solid ${G.greenBorder}`, boxShadow: "0 2px 12px rgba(110,192,48,0.08)" }}>
        <div className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between" style={{ maxWidth: "1280px" }}>

          {/* ── Logo — /weblance.jpeg ── */}
          <img
            src="/weblance.jpeg"
            alt="WebLance"
            onClick={onExit}
            className="cursor-pointer"
            style={{ height: 56, width: 155 }}
          />

          <button onClick={onExit}
            className="flex items-center gap-2 text-sm font-semibold transition-colors"
            style={{ color: G.sub }}
            onMouseEnter={e => e.currentTarget.style.color = G.navyDeep}
            onMouseLeave={e => e.currentTarget.style.color = G.sub}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1-4H9m6 0v4H9V3m6 0H9"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Save &amp; Exit
          </button>
        </div>
      </nav>

      {/* ══ STEP META + PROGRESS + CIRCLES ══ */}
      <div className="mx-auto px-6 lg:px-10 pt-5 pb-0" style={{ maxWidth: "1280px" }}>

        {/* Step X of 11  ·  % Complete */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium" style={{ color: G.sub }}>
            Step {currentStep} of {STEPS.length}
          </span>
          {/* % Complete → Green */}
          <span className="text-sm font-semibold" style={{ color: G.green }}>
            {progress}% Complete
          </span>
        </div>

        {/* Progress bar — Green→Navy mixed gradient */}
        <div className="w-full rounded-full overflow-hidden" style={{ backgroundColor: "#e2e8f0", height: "3px" }}>
          <div className="h-full transition-all duration-500 rounded-full"
            style={{ width: `${progress}%`, background: G.mixedGrad }}/>
        </div>

        {/* Step circles */}
        <div className="flex items-start justify-between overflow-x-auto pt-4 pb-2">
          {STEPS.map((s) => {
            const done    = s.id < currentStep;
            const current = s.id === currentStep;
            return (
              <div key={s.id} onClick={() => goTo(s.id)}
                className={`flex flex-col items-center gap-1.5 flex-1 min-w-0 ${done ? "cursor-pointer" : "cursor-default"}`}>

                {/* Circle */}
                <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 flex-shrink-0 transition-all"
                  style={{
                    /* Done → Navy gradient fill */
                    background:   done    ? G.gradNavy : "white",
                    borderColor:  current ? G.navyLight : done ? G.navyLight : "#d1d5db",
                    color:        done    ? "white"     : current ? G.navyLight : G.muted,
                    boxShadow:    current ? `0 0 0 3px rgba(74,111,165,0.18)` : "none",
                  }}>
                  {done ? (
                    <svg className="w-3.5 h-3.5" fill="none" stroke="white" viewBox="0 0 24 24">
                      <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  ) : s.id}
                </div>

                {/* Label */}
                <span className="text-xs font-medium text-center leading-tight truncate w-full px-0.5"
                  style={{ color: current ? G.navyLight : done ? G.navyDeep : G.muted }}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ══ STEP CONTENT ══ */}
      <div className="mx-auto px-6 lg:px-10 py-6" style={{ maxWidth: "1280px" }}>
        {renderStep()}
      </div>

    </div>
  );
}