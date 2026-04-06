import { useState } from "react";

// ── Import all steps ──
import Step1_Account    from "./Step1_Account";
import Step2_Verify     from "./Step2_Verify";
import Step3_Type       from "./Step3_Type";
import Step4_Profile    from "./Step4_Profile";
import Step5_Skills     from "./Step5_Skills";
import Step6_Portfolio  from "./Step6_Portfolio";
import Step7_History    from "./Step7_History";
import Step8_Rates      from "./Step8_Rates";
import Step9_KYC        from "./Step9_KYC";
import Step10_PlanSelect from "./Step10_PlanSelect";
import Step11_Payment   from "./Step11_Payment";
import Step12_Trust     from "./Step12_Trust";
import Step13_GoLive    from "./Step13_GoLive";
import Dashboard        from "../Dashboard";

const TOTAL_STEPS = 13;

const STEP_COMPONENTS = [
  Step1_Account,    // Step 1
  Step2_Verify,     // Step 2
  Step3_Type,       // Step 3
  Step4_Profile,    // Step 4
  Step5_Skills,     // Step 5
  Step6_Portfolio,  // Step 6
  Step7_History,    // Step 7
  Step8_Rates,      // Step 8
  Step9_KYC,        // Step 9
  Step10_PlanSelect, // Step 10
  Step11_Payment,   // Step 11
  Step12_Trust,     // Step 12
  Step13_GoLive,    // Step 13
];

export default function OnboardingFlow() {
  // currentStep: 1–13 = onboarding steps, "dashboard" = main dashboard
  const [currentStep, setCurrentStep] = useState(1);

  const goNext = () => {
    if (currentStep < TOTAL_STEPS) {
      setCurrentStep(s => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goBack = () => {
    if (currentStep > 1) {
      setCurrentStep(s => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const goToDashboard = () => {
    setCurrentStep("dashboard");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ── Render Dashboard ──
  if (currentStep === "dashboard") {
    return <Dashboard />;
  }

  // ── Render onboarding step ──
  const StepComponent = STEP_COMPONENTS[currentStep - 1];

  // Step 13 gets special props (no onNext, but onDashboard)
  if (currentStep === TOTAL_STEPS) {
    return (
    <>
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

        
`}</style>
      <Step13_GoLive
        onBack={goBack}
        onDashboard={goToDashboard}
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
    </>
    );
  }

  return (
    <StepComponent
      onNext={goNext}
      onBack={goBack}
      currentStep={currentStep}
      totalSteps={TOTAL_STEPS}
    />
  );
}