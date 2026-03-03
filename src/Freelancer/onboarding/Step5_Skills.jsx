import { useState } from "react";
import SkillTestModal from "./SkillTestModal";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const skillTests = [
  {
    name: "React.js",
    recommended: true,
    time: 45,
    badge: "Verified React Developer",
    icon: "code",
    color: "bg-blue-100 text-blue-600"
  },
  {
    name: "Node.js",
    recommended: true,
    time: 40,
    badge: "Verified Node Developer",
    icon: "code",
    color: "bg-green-100 text-green-600"
  },
  {
    name: "UI/UX Design",
    recommended: false,
    time: 30,
    badge: "Verified UX Designer",
    icon: "design",
    color: "bg-purple-100 text-purple-600"
  },
  {
    name: "Python",
    recommended: false,
    time: 40,
    badge: "Verified Python Developer",
    icon: "code",
    color: "bg-yellow-100 text-yellow-700"
  },
  {
    name: "TypeScript",
    recommended: false,
    time: 35,
    badge: "Verified TypeScript Developer",
    icon: "code",
    color: "bg-blue-100 text-blue-700"
  }
];

const badgeLevels = [
  { label: "Elite (90-100)",   bg: "bg-purple-500", type: "circle" },
  { label: "Pro+ (75-89)",     bg: "bg-blue-500",   type: "circle" },
  { label: "Verified (60-74)", bg: "bg-green-500",  type: "check"  },
  { label: "Unverified (<60)", bg: "bg-gray-300",   type: "box"    }
];

const CodeIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
  </svg>
);

const DesignIcon = ({ className }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
  </svg>
);

export default function Step5_Skills({ onNext, onBack, currentStep = 5, totalSteps = 12 }) {
  const [testStatus, setTestStatus] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const takenCount  = Object.keys(testStatus).length;
  const passedCount = Object.values(testStatus).filter(s => s === "passed").length;

  const handleTakeTest    = (name) => setActiveModal(name);
  const handleCloseModal  = () => setActiveModal(null);
  const handleTestComplete = (name, result) => {
    setTestStatus(prev => ({ ...prev, [name]: result }));
    setActiveModal(null);
  };

  /* ── AI Insights ── */
  const getInsights = () => {
    const insights = [];
    insights.push({ status: "tip", msg: "Tests are optional but unlock premium project access." });
    if (passedCount >= 1) insights.push({ status: "good", msg: `${passedCount} skill${passedCount > 1 ? "s" : ""} verified — clients can see your badges!` });
    if (passedCount >= 2) insights.push({ status: "good", msg: "Multiple badges boost your ranking significantly." });
    if (takenCount > 0 && passedCount === 0) insights.push({ status: "warn", msg: "No tests passed yet — keep trying!" });
    if (passedCount >= 1 && passedCount < 3) insights.push({ status: "tip", msg: "Verified freelancers earn 3× more on average." });
    if (passedCount === skillTests.length) insights.push({ status: "good", msg: "All skills verified — you're a top-tier freelancer!" });
    return insights;
  };
  const insights = getInsights();

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 pb-20">

      {/* ── Skill Test Modal ── */}
      {activeModal && (
        <SkillTestModal
          skillName={activeModal}
          onClose={handleCloseModal}
          onComplete={handleTestComplete}
        />
      )}

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <span className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight">ArcLancer</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="hidden sm:inline">Save &amp; Exit</span>
          </button>
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
            </svg>
            Demo
          </button>
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-3">
          <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-blue-600 font-semibold">{percentComplete}% Complete</span>
        </div>
        <div className="relative flex items-start justify-between">
          <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}></div>
          {stepLabels.map((label, index) => {
            const isActive = index + 1 === currentStep;
            const isDone   = index + 1 < currentStep;
            return (
              <div key={index} className="flex flex-col items-center z-10 relative">
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
                  ${isActive ? "bg-white border-blue-500 text-blue-600 shadow-md"
                    : isDone  ? "bg-blue-500 border-blue-500 text-white"
                    :           "bg-white border-gray-300 text-gray-400"}`}>
                  {isDone
                    ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                      </svg>
                    : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
                </div>
                <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
                  ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">AI Skill Tests</h1>
              <p className="text-sm text-gray-500 mb-5">Prove your skills — verified freelancers earn 3× more</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Skill Verification Hub
                </span>
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3.5 mb-6">
                <span className="text-lg flex-shrink-0">💡</span>
                <p className="text-sm text-yellow-800">
                  Tests are optional but unlock premium project access. Advanced tests are paid (price shown before entry).
                </p>
              </div>

              {/* Skill Test List */}
              <div className="space-y-3 mb-8">
                {skillTests.map((skill) => {
                  const status = testStatus[skill.name];
                  return (
                    <div key={skill.name}
                      className={`flex items-center gap-4 p-4 rounded-xl border transition-all
                        ${status === "passed"  ? "border-green-200 bg-green-50"
                          : status === "failed" ? "border-red-200 bg-red-50"
                          :                       "border-gray-200 bg-white hover:border-blue-200 hover:bg-blue-50"}`}>

                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${skill.color}`}>
                        {skill.icon === "code"
                          ? <CodeIcon className="w-5 h-5"/>
                          : <DesignIcon className="w-5 h-5"/>}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm font-semibold text-gray-800">{skill.name}</span>
                          {skill.recommended && (
                            <span className="text-xs font-bold text-yellow-600">⭐ Recommended</span>
                          )}
                          {status === "passed" && (
                            <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-0.5 rounded-full">✓ Passed</span>
                          )}
                          {status === "failed" && (
                            <span className="text-xs font-bold bg-red-100 text-red-600 px-2 py-0.5 rounded-full">✗ Failed</span>
                          )}
                        </div>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {status === "passed"
                            ? `Badge earned: ${skill.badge}`
                            : status === "failed"
                            ? `Retry available · Est. time: ${skill.time} min`
                            : `Not taken · Est. time: ${skill.time} min · Badge on pass: ${skill.badge}`}
                        </p>
                      </div>

                      {/* Button */}
                      <button
                        onClick={() => handleTakeTest(skill.name)}
                        className={`flex-shrink-0 px-4 py-2 rounded-xl text-sm font-semibold transition border
                          ${status === "passed"
                            ? "border-green-200 bg-green-100 text-green-700 hover:bg-green-200"
                            : status === "failed"
                            ? "border-red-200 bg-red-100 text-red-600 hover:bg-red-200"
                            : "border-gray-200 bg-white text-gray-700 hover:border-blue-400 hover:bg-blue-50 hover:text-blue-700"}`}
                      >
                        {status === "passed" ? "Retake" : status === "failed" ? "Retry" : "Take Test"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Badge Levels */}
              <div className="border border-gray-200 rounded-xl p-5 bg-gray-50">
                <p className="text-sm font-bold text-gray-700 mb-3">Badge Levels:</p>
                <div className="grid grid-cols-2 gap-2.5">
                  {badgeLevels.map((b) => (
                    <div key={b.label} className="flex items-center gap-2">
                      {b.type === "box" ? (
                        <div className="w-4 h-4 rounded border-2 border-gray-300 flex-shrink-0"></div>
                      ) : b.type === "check" ? (
                        <div className={`w-4 h-4 rounded flex items-center justify-center flex-shrink-0 ${b.bg}`}>
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      ) : (
                        <div className={`w-4 h-4 rounded-full flex-shrink-0 ${b.bg}`}></div>
                      )}
                      <span className="text-xs text-gray-600">{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
                Continue to Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── AI Insights Panel ── */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-sm">AI Insights</span>
              </div>

              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                    ${insight.status === "good"
                      ? "bg-green-50 border border-green-100 text-green-800"
                      : insight.status === "warn"
                      ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
                      : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {/* Tests progress summary */}
              {takenCount > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Tests taken:</p>
                  <div className="space-y-1.5 mb-3">
                    {Object.entries(testStatus).map(([name, status]) => (
                      <div key={name} className="flex items-center justify-between">
                        <span className="text-xs text-gray-600 truncate mr-2">{name}</span>
                        <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded flex-shrink-0
                          ${status === "passed" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"}`}>
                          {status === "passed" ? "✓ PASSED" : "✗ FAILED"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mb-1">
                    <span>Passed</span>
                    <span className="font-semibold text-blue-600">{passedCount} / {skillTests.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="bg-green-500 h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(passedCount / skillTests.length) * 100}%` }}/>
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}