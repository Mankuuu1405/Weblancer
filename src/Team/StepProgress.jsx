const STEPS = [
  { label: "Invite"   },
  { label: "Account"  },
  { label: "Profile"  },
  { label: "Perms"    },
  { label: "Active"   },
];

export default function StepProgress({ currentStep }) {
  const pct = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);

  return (
    <div className="mb-6 sm:mb-8">
      {/* Top row */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm text-gray-500">Step {currentStep} of {STEPS.length}</span>
        <span className="text-sm font-semibold text-blue-500">{pct}% Complete</span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-5 sm:mb-6">
        <div
          className="h-1.5 rounded-full transition-all duration-500"
          style={{ width:`${pct}%`, background:"linear-gradient(to right, #3b82f6, #8b5cf6)" }}
        />
      </div>

      {/* Step circles — horizontally scrollable on tiny screens */}
      <div className="relative">
        <div className="absolute top-4 left-4 right-4 h-px bg-gray-200 z-0" />
        <div className="flex items-start justify-between overflow-x-auto pb-1 gap-1">
          {STEPS.map((step, i) => {
            const n        = i + 1;
            const isDone   = n < currentStep;
            const isActive = n === currentStep;
            return (
              <div key={i} className="flex flex-col items-center gap-1.5 z-10 min-w-[44px]">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all flex-shrink-0 ${
                  isDone   ? "bg-blue-500 border-blue-500 text-white"  :
                  isActive ? "bg-white   border-blue-500 text-blue-500" :
                             "bg-white   border-gray-200  text-gray-400"
                }`}>
                  {isDone
                    ? <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2.5 7l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    : n}
                </div>
                <span className={`text-xs font-medium whitespace-nowrap ${
                  isActive ? "text-blue-500" : isDone ? "text-gray-500" : "text-gray-400"
                }`}>
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}