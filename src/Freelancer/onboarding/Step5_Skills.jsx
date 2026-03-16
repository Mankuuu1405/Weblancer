// 

import { useState } from "react";
import SkillTestModal from "./SkillTestModal";

const skillTests = [
  { name: "React.js",     recommended: true,  time: 45, badge: "Verified React Developer",      icon: "code",   color: "bg-blue-100 text-blue-600"   },
  { name: "Node.js",      recommended: true,  time: 40, badge: "Verified Node Developer",       icon: "code",   color: "bg-green-100 text-green-600"  },
  { name: "UI/UX Design", recommended: false, time: 30, badge: "Verified UX Designer",          icon: "design", color: "bg-purple-100 text-purple-600" },
  { name: "Python",       recommended: false, time: 40, badge: "Verified Python Developer",     icon: "code",   color: "bg-yellow-100 text-yellow-700" },
  { name: "TypeScript",   recommended: false, time: 35, badge: "Verified TypeScript Developer", icon: "code",   color: "bg-blue-100 text-blue-700"    }
];

const badgeLevels = [
  { label: "Elite (90-100)",   bg: "bg-purple-500", type: "circle" },
  { label: "Pro+ (75-89)",     bg: "bg-blue-500",   type: "circle" },
  { label: "Verified (60-74)", bg: "bg-green-500",  type: "check"  },
  { label: "Unverified (<60)", bg: "bg-gray-300",   type: "box"    }
];

const CodeIcon   = ({ className }) => (
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

  const takenCount  = Object.keys(testStatus).length;
  const passedCount = Object.values(testStatus).filter(s => s === "passed").length;

  const handleTakeTest     = (name) => setActiveModal(name);
  const handleCloseModal   = () => setActiveModal(null);
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
    <div className="flex-1 overflow-y-auto">

      {/* ── Skill Test Modal ── */}
      {activeModal && (
        <SkillTestModal
          skillName={activeModal}
          onClose={handleCloseModal}
          onComplete={handleTestComplete}
        />
      )}

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full xl:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">AI Skill Tests</h1>
              <p className="text-sm text-gray-500 mb-5">Prove your skills — verified freelancers earn 3× more</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Skill Verification Hub
                </span>
              </div>

              {/* Info Banner */}
              <div className="flex items-start gap-3 bg-blue-50 border border-blue-100 rounded-xl px-4 py-3.5 mb-6">
                <span className="text-lg flex-shrink-0">💡</span>
                <p className="text-sm text-blue-800">
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
                        {skill.icon === "code" ? <CodeIcon className="w-5 h-5"/> : <DesignIcon className="w-5 h-5"/>}
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
                            : "border-gray-200 bg-white text-gray-700 hover:text-white"}`}
                        style={!status ? {} : {}}
                        onMouseEnter={e => { if (!status) { e.currentTarget.style.background = "linear-gradient(135deg,#1960d2,#0f44a8)"; e.currentTarget.style.borderColor = "#1960d2"; e.currentTarget.style.color = "#fff"; }}}
                        onMouseLeave={e => { if (!status) { e.currentTarget.style.background = ""; e.currentTarget.style.borderColor = ""; e.currentTarget.style.color = ""; }}}
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
                className="text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm"
                style={{ background: "linear-gradient(135deg,#1960d2,#0f44a8)" }}
                onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg,#0f44a8,#0a2f7a)"}
                onMouseLeave={e => e.currentTarget.style.background = "linear-gradient(135deg,#1960d2,#0f44a8)"}>
                Continue to Portfolio
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── AI Insights Panel ── */}
          <div className="w-full xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 xl:sticky xl:top-6">

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#eef4ff,#e8f9ea)" }}>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                      : "bg-blue-50 border border-blue-100 text-blue-800"}`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#1960d2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                    <span className="font-semibold" style={{ color: "#1960d2" }}>{passedCount} / {skillTests.length}</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div className="h-1.5 rounded-full transition-all duration-300"
                      style={{ width: `${(passedCount / skillTests.length) * 100}%`, background: "linear-gradient(90deg,#1960d2,#2AB836)" }}/>
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