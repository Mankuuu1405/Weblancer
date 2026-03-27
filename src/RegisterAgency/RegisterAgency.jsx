



// RegisterAgency.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Step1Account   from "./steps/Step1Account";
import Step2Admin     from "./steps/Step2Admin";
import Step3Business  from "./steps/Step3Business";
import Step4Services  from "./steps/Step4Services";
import Step5Portfolio from "./steps/Step5Portfolio";
import Step6Verify    from "./steps/Step6Verify";
import Step7Payment   from "./steps/Step7Payment";
import Step8Perms     from "./steps/Step8Perms";
import Step9GoLive    from "./steps/Step9GoLive";

const STEPS = [
  { id: 1, label: "Account"   },
  { id: 2, label: "Admin"     },
  { id: 3, label: "Business"  },
  { id: 4, label: "Services"  },
  { id: 5, label: "Portfolio" },
  { id: 6, label: "Verify"    },
  { id: 7, label: "Payment"   },
  { id: 8, label: "Perms"     },
  { id: 9, label: "Go Live"   },
];

/* ── PublicProfile-matching tokens ── */
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
  gradGreen:   "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  mixedGrad:   "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
};

const RegisterAgency = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData]       = useState({});
  const navigate = useNavigate();

  const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
  const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));
  const next       = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const prev       = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const goTo       = (step) => { if (step <= currentStep) setCurrentStep(step); };
  const onExit     = () => navigate("/");

  const renderStep = () => {
    const props = { formData, updateData, next, prev, currentStep };
    switch (currentStep) {
      case 1: return <Step1Account   {...props} />;
      case 2: return <Step2Admin     {...props} />;
      case 3: return <Step3Business  {...props} />;
      case 4: return <Step4Services  {...props} />;
      case 5: return <Step5Portfolio {...props} />;
      case 6: return <Step6Verify    {...props} />;
      case 7: return <Step7Payment   {...props} />;
      case 8: return <Step8Perms     {...props} />;
      case 9: return <Step9GoLive    {...props} onExit={onExit} />;
      default: return <Step1Account  {...props} />;
    }
  };

  const circleStyle = (isActive, isDone) => {
    if (isActive) return {
      /* Active → Navy border (matches tab underline in PublicProfile) */
      border: `2px solid ${G.navy}`,
      color: G.navy,
      background: "#fff",
      boxShadow: `0 0 0 3px rgba(74,111,165,0.18)`,
    };
    if (isDone) return {
      /* Done → Navy gradient (matches Avatar + Invite button) */
      border: "none",
      background: G.gradNavy,
      color: "#fff",
    };
    return {
      border: "1.5px solid #d1d5db",
      color: "#9ca3af",
      background: "#f9fafb",
    };
  };

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ background: "#f9fafb" }}>

      {/* ── Navbar ── */}
      <div className="flex justify-between items-center px-6 sm:px-12 py-3 bg-white"
        style={{ borderBottom: `1px solid ${G.greenBorder}`, boxShadow: "0 2px 12px rgba(110,192,48,0.08)" }}>
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block"}} />
        <button onClick={onExit}
          className="flex items-center gap-1.5 bg-transparent border-none text-sm font-semibold cursor-pointer transition-colors"
          style={{ color: "#4b5563" }}
          onMouseEnter={e => e.currentTarget.style.color = G.navyDeep}
          onMouseLeave={e => e.currentTarget.style.color = "#4b5563"}>
          <span>⊞</span> Save &amp; Exit
        </button>
      </div>

      {/* ── Step counter + % Complete — max-w-4xl ── */}
      <div className="px-6 sm:px-12 pt-4 pb-2" style={{ background: "#f9fafb" }}>
        <div className="flex justify-between items-center w-full max-w-4xl mx-auto">
          <span className="text-xs font-medium" style={{ color: "#9ca3af" }}>
            Step {currentStep} of {STEPS.length}
          </span>
          {/* % Complete → Navy (matches active tab color) */}
          <span className="text-xs font-bold" style={{ color: G.navy }}>
            {progress}% Complete
          </span>
        </div>
      </div>

      {/* ── Progress Bar — Navy→Green gradient ── */}
      <div className="px-6 sm:px-12" style={{ background: "#f9fafb" }}>
        <div className="w-full max-w-4xl mx-auto">
          <div className="h-[3px] w-full rounded-full overflow-hidden" style={{ background: "#e5e7eb" }}>
            <div
              className="h-full rounded-full transition-all duration-[450ms] ease-in-out"
              style={{ width: `${progress}%`, background: G.mixedGrad }}
            />
          </div>
        </div>
      </div>

      {/* ── Step Circles — max-w-4xl ── */}
      <div className="py-4 px-6 sm:px-12 overflow-x-auto" style={{ background: "#f9fafb" }}>
        <div className="flex items-start w-full max-w-4xl mx-auto">
          {STEPS.map((s, idx) => {
            const isDone   = s.id < currentStep;
            const isActive = s.id === currentStep;
            return (
              <React.Fragment key={s.id}>
                <div
                  onClick={() => goTo(s.id)}
                  className={`flex flex-col items-center flex-shrink-0 ${isDone ? "cursor-pointer" : "cursor-default"}`}
                  style={{ minWidth: 48 }}
                >
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold transition-all duration-200"
                    style={circleStyle(isActive, isDone)}
                  >
                    {s.id}
                  </div>
                  <div className="text-[10px] text-center whitespace-nowrap mt-1.5" style={{
                    /* Active → Navy (tab color), Done → navyDeep, Pending → gray */
                    color:      isActive ? G.navy : isDone ? G.navyDeep : "#9ca3af",
                    fontWeight: isActive ? 700    : isDone ? 600        : 400,
                  }}>
                    {s.label}
                  </div>
                </div>

                {/* Line → Green when done (matches scrollbar color in PublicProfile) */}
                {idx < STEPS.length - 1 && (
                  <div style={{
                    flex: 1, height: 1.5, marginTop: 13,
                    background: isDone ? G.green : "#e5e7eb",
                    transition: "background 0.3s",
                  }} />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ── Content ── */}
      <div className="flex-1 px-6 sm:px-12 pt-6 pb-10 w-full">
        {renderStep()}
      </div>

    </div>
  );
};

export default RegisterAgency;