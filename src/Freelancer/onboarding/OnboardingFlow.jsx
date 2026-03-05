import { useState } from "react";

// ── Import all steps ──
import Step1_Account   from "./Step1_Account";
import Step2_Verify    from "./Step2_Verify";
import Step3_Type      from "./Step3_Type";
import Step4_Profile   from "./Step4_Profile";
import Step5_Skills    from "./Step5_Skills";
import Step6_Portfolio from "./Step6_Portfolio";
import Step7_History   from "./Step7_History";
import Step8_Rates     from "./Step8_Rates";
import Step9_KYC       from "./Step9_KYC";
import Step10_Payment  from "./Step10_Payment";
import Step11_Trust    from "./Step11_Trust";
import Step12_GoLive   from "./Step12_GoLive";
import Dashboard       from "../Dashboard";

const TOTAL_STEPS = 12;

const STEP_COMPONENTS = [
  Step1_Account,
  Step2_Verify,
  Step3_Type,
  Step4_Profile,
  Step5_Skills,
  Step6_Portfolio,
  Step7_History,
  Step8_Rates,
  Step9_KYC,
  Step10_Payment,
  Step11_Trust,
  Step12_GoLive,
];

export default function OnboardingFlow() {
  // currentStep: 1–12 = onboarding steps, "dashboard" = main dashboard
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

  // Step 12 gets special props (no onNext, but onDashboard)
  if (currentStep === TOTAL_STEPS) {
    return (
      <Step12_GoLive
        onBack={goBack}
        onDashboard={goToDashboard}
        currentStep={currentStep}
        totalSteps={TOTAL_STEPS}
      />
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
