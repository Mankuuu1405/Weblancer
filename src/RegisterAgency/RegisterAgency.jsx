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

  return (
    <div className="min-h-screen bg-[#f0f2f7] flex flex-col font-sans">

      {/* Navbar */}
      <div className="flex justify-between items-center px-6 sm:px-12 py-4 bg-[rgb(249,250,252)] border-b border-gray-300">
        <span className="text-xl font-bold text-[#1960d2] tracking-tight">ArcLancer</span>
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 bg-transparent border-none text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer"
        >
          <span>⊞</span> Save &amp; Exit
        </button>
      </div>

      {/* Progress Meta */}
      <div className="flex justify-between items-center px-6 sm:px-12 pt-4 pb-2 bg-[#f0f2f7]">
        <span className="text-xs text-gray-500 font-medium">Step {currentStep} of {STEPS.length}</span>
        <span className="text-xs font-bold text-[#4f7cff]">{progress}% Complete</span>
      </div>

      {/* Progress Bar */}
      <div className="h-[3px] w-full bg-[#e2e5ef]">
        <div
          className="h-full bg-[#4f7cff] rounded-full transition-all duration-[450ms] ease-in-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step Circles */}
      <div className="flex justify-between items-start px-4 sm:px-12 py-5 bg-[#f0f2f7] overflow-x-auto">
        {STEPS.map((s) => {
          const isDone   = s.id < currentStep;
          const isActive = s.id === currentStep;
          return (
            <div
              key={s.id}
              onClick={() => goTo(s.id)}
              className={`flex flex-col items-center gap-1.5 flex-1 ${isDone ? "cursor-pointer" : "cursor-default"}`}
            >
              <div className={`w-9 h-9 rounded-full border flex items-center justify-center text-xs font-semibold transition-all duration-200
                ${isActive ? "border-2 border-[#4f7cff] text-[#4f7cff] bg-white shadow-[0_0_0_3px_rgba(79,124,255,0.12)]"
                  : isDone  ? "border-[#4f7cff] bg-[#4f7cff] text-white"
                  : "border-gray-300 text-gray-400 bg-[#f0f2f7]"
                }`}
              >
                {s.id}
              </div>
              <div className={`text-[11px] font-medium text-center whitespace-nowrap
                ${isActive ? "text-[#4f7cff] font-bold" : isDone ? "text-[#4f7cff]" : "text-gray-400"}`}
              >
                {s.label}
              </div>
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex-1 px-6 sm:px-12 pt-6 pb-10 w-full">
        {renderStep()}
      </div>

    </div>
  );
};

export default RegisterAgency;
