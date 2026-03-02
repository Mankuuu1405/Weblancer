import React, { useState } from "react";
import "./RegisterAgency.css";
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

const RegisterAgency = ({ onExit }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData]       = useState({});

  const progress = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));

  const next = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
  const prev = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const goTo = (step) => { if (step <= currentStep) setCurrentStep(step); };

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
    <div className="ra-wrapper">

      {/* Top Navbar */}
      <div className="ra-navbar">
        <span className="ra-brand">ArcLancer</span>
        <button className="ra-exit-btn" onClick={onExit}>
          <span className="ra-exit-icon">⊞</span> Save &amp; Exit
        </button>
      </div>

      {/* Main Content */}
      <div className="ra-content">

        {/* Progress meta — sits above the card, left-aligned */}
        <div className="ra-progress-meta">
          <span className="ra-step-label">Step {currentStep} of {STEPS.length}</span>
          <span className="ra-pct">{progress}% Complete</span>
        </div>

        {/* Thin progress bar — only as wide as content column */}
        <div className="ra-progress-bar-wrap">
          <div className="ra-progress-bar-fill" style={{ width: `${progress}%` }} />
        </div>

        {/* Step circles — left-aligned, no background */}
        <div className="ra-steps-row">
          {STEPS.map((s) => (
            <div
              key={s.id}
              className={`ra-step-item ${s.id === currentStep ? "active" : ""} ${s.id < currentStep ? "done" : ""} ${s.id > currentStep ? "locked" : ""}`}
              onClick={() => goTo(s.id)}
            >
              <div className="ra-step-circle">{s.id}</div>
              <div className="ra-step-name">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Step Content */}
        {renderStep()}

      </div>

    </div>
  );
};

export default RegisterAgency;