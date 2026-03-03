import { useState } from "react";
import { useNavigate } from "react-router-dom";
import StepProgress from "./StepProgress";
import AIInsights   from "./AIInsights";
import StepInvite   from "./StepInvite";
import StepAccount  from "./StepAccount";
import StepProfile  from "./StepProfile";
import StepPerms    from "./StepPerms";
import StepActive   from "./StepActive";

const TOTAL_STEPS = 5;

export default function TeamOnboarding() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();

  const next = () => setStep(s => Math.min(s + 1, TOTAL_STEPS));
  const back = () => setStep(s => Math.max(s - 1, 1));

  const isLastStep  = step === TOTAL_STEPS;
  const isFirstStep = step === 1;

  const stepContent = () => {
    switch (step) {
      case 1: return <StepInvite />;
      case 2: return <StepAccount onNext={next} />;
      case 3: return <StepProfile />;
      case 4: return <StepPerms />;
      case 5: return <StepActive onGoToDashboard={() => navigate("/dashboard")} />;
      default: return null;
    }
  };

  const nextLabel = () => {
    switch (step) {
      case 1: return "Preview Member Setup →";
      case 2: return "Continue to Profile →";
      case 3: return "Continue →";
      case 4: return "Complete Setup →";
      default: return "Next →";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3 flex items-center justify-between">
        <span className="text-blue-500 font-bold text-xl tracking-tight">ArcLancer</span>
        <button onClick={() => navigate("/")} className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
            <rect x="1" y="1" width="13" height="13" rx="2" stroke="#6b7280" strokeWidth="1.2"/>
            <path d="M4 7h7M8 4l3 3-3 3" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Save & Exit</span>
        </button>
      </header>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8">

        {/* Step Progress */}
        <StepProgress currentStep={step} />

        {/* Content grid */}
        <div className="flex flex-col lg:flex-row gap-5 items-start">

          {/* Main card */}
          <div className="flex-1 min-w-0">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 sm:p-8 shadow-sm">
              {stepContent()}
            </div>

            {/* Navigation footer */}
            {!isLastStep && (
              <div className="flex items-center justify-between mt-5 sm:mt-6">
                {!isFirstStep ? (
                  <button
                    onClick={back}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
                  >
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    Back
                  </button>
                ) : <div />}

                <button
                  onClick={next}
                  className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-5 sm:px-6 py-2.5 rounded-xl transition-colors"
                >
                  {nextLabel()}
                </button>
              </div>
            )}

            {/* Back button on last step */}
            {isLastStep && (
              <div className="mt-4">
                <button
                  onClick={back}
                  className="flex items-center gap-2 text-sm text-gray-600 hover:text-gray-800 transition-colors font-medium"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M9 2L4 7l5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Back
                </button>
              </div>
            )}
          </div>

          {/* AI Insights sidebar */}
          <div className="w-full lg:w-[260px] lg:shrink-0 lg:sticky lg:top-8 flex flex-col gap-4">
            <AIInsights step={step} />

            {/* Step quick-jump */}
            <div className="border border-gray-100 rounded-xl p-4 bg-white">
              <p className="text-xs font-semibold text-gray-400 uppercase mb-3">Jump to Step</p>
              <div className="grid grid-cols-5 lg:grid-cols-1 gap-1.5">
                {[1,2,3,4,5].map(s => (
                  <button
                    key={s}
                    onClick={() => setStep(s)}
                    className={`text-xs text-left px-3 py-1.5 rounded-lg transition-colors ${
                      step === s ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-500 hover:bg-gray-50"
                    }`}
                  >
                    <span className="lg:inline hidden">Step {s}: </span>
                    {["Invite","Account","Profile","Perms","Active"][s-1]}
                  </button>
                ))}
              </div>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
}