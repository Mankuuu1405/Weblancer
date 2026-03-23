




import { useState } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const skillTests = [
  { name: "React.js",    recommended: true,  time: 45, badge: "Verified React Developer",      icon: "code",   iconColor: "#1B72C0", iconBg: "#eff6ff" },
  { name: "Node.js",     recommended: true,  time: 40, badge: "Verified Node Developer",       icon: "code",   iconColor: "#16a34a", iconBg: "#dcfce7" },
  { name: "UI/UX Design",recommended: false, time: 30, badge: "Verified UX Designer",          icon: "design", iconColor: "#9333ea", iconBg: "#f3e8ff" },
  { name: "Python",      recommended: false, time: 40, badge: "Verified Python Developer",     icon: "code",   iconColor: "#ca8a04", iconBg: "#fef9c3" },
  { name: "TypeScript",  recommended: false, time: 35, badge: "Verified TypeScript Developer", icon: "code",   iconColor: "#1d4ed8", iconBg: "#dbeafe" }
];

const badgeLevels = [
  { label: "Elite (90-100)",   bg: "#a855f7", type: "circle" },
  { label: "Pro+ (75-89)",     bg: "linear-gradient(135deg,#0D2855,#1B72C0)", type: "circle" },
  { label: "Verified (60-74)", bg: "#22c55e", type: "check"  },
  { label: "Unverified (<60)", bg: "#d1d5db", type: "box"    }
];

// Quiz questions per skill
const quizData = {
  "React.js": [
    { q: "What hook is used for side effects in React?", options: ["useState", "useEffect", "useRef", "useMemo"], answer: 1 },
    { q: "What does JSX stand for?", options: ["JavaScript XML", "Java Syntax Extension", "JSON XML", "JS Extra"], answer: 0 },
    { q: "Which method re-renders a component?", options: ["forceUpdate()", "setState()", "render()", "update()"], answer: 1 },
  ],
  "Node.js": [
    { q: "What is the Node.js package manager?", options: ["pip", "npm", "gem", "cargo"], answer: 1 },
    { q: "Which module handles HTTP in Node.js?", options: ["fs", "path", "http", "net"], answer: 2 },
    { q: "Node.js runs on which engine?", options: ["SpiderMonkey", "V8", "Chakra", "Nitro"], answer: 1 },
  ],
  "UI/UX Design": [
    { q: "What does UX stand for?", options: ["User Xperience", "User Experience", "Unique Experience", "Unified Experience"], answer: 1 },
    { q: "Which tool is most used for UI design?", options: ["Photoshop", "Figma", "Illustrator", "Sketch"], answer: 1 },
    { q: "What is a wireframe?", options: ["A final design", "A low-fidelity layout", "A style guide", "A prototype"], answer: 1 },
  ],
  "Python": [
    { q: "Which keyword defines a function in Python?", options: ["func", "def", "fn", "function"], answer: 1 },
    { q: "What is PEP 8?", options: ["A Python module", "A style guide", "A compiler", "A framework"], answer: 1 },
    { q: "Which of these is a Python list?", options: ["{1,2,3}", "(1,2,3)", "[1,2,3]", "<1,2,3>"], answer: 2 },
  ],
  "TypeScript": [
    { q: "TypeScript is a superset of?", options: ["Java", "C#", "JavaScript", "Python"], answer: 2 },
    { q: "Which keyword defines a type alias?", options: ["interface", "type", "class", "define"], answer: 1 },
    { q: "What does the '?' operator mean in TS?", options: ["Nullable", "Optional", "Required", "Dynamic"], answer: 1 },
  ],
};

function SkillTestModal({ skillName, onClose, onComplete }) {
  const questions = quizData[skillName] || [];
  const [current, setCurrent]   = useState(0);
  const [answers, setAnswers]   = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleAnswer = (idx) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [current]: idx }));
  };

  const handleNext = () => {
    if (current < questions.length - 1) setCurrent(c => c + 1);
  };

  const handleSubmit = () => setSubmitted(true);

  const score = submitted
    ? questions.filter((q, i) => answers[i] === q.answer).length
    : 0;
  const percent = submitted ? Math.round((score / questions.length) * 100) : 0;
  const passed  = percent >= 60;

  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.55)", zIndex:1000, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:"white", borderRadius:20, width:"100%", maxWidth:480, boxShadow:"0 20px 60px rgba(0,0,0,0.2)", overflow:"hidden" }}>

        {/* Header */}
        <div style={{ background:"linear-gradient(135deg,#0D2855,#1B72C0)", padding:"20px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div>
            <p style={{ color:"rgba(255,255,255,0.7)", fontSize:12, marginBottom:2 }}>Skill Test</p>
            <h2 style={{ color:"white", fontWeight:800, fontSize:18, margin:0 }}>{skillName}</h2>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.15)", border:"none", borderRadius:8, width:32, height:32, cursor:"pointer", display:"flex", alignItems:"center", justifyContent:"center", color:"white", fontSize:18 }}>✕</button>
        </div>

        <div style={{ padding:24 }}>
          {!submitted ? (
            <>
              {/* Progress */}
              <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280", marginBottom:8 }}>
                <span>Question {current + 1} of {questions.length}</span>
                <span style={{ fontWeight:700, color:"#1B72C0" }}>{Object.keys(answers).length} answered</span>
              </div>
              <div style={{ background:"#f3f4f6", borderRadius:99, height:4, marginBottom:20 }}>
                <div style={{ background:"linear-gradient(90deg,#6FDA44,#1B72C0)", height:"100%", borderRadius:99, width:`${((current+1)/questions.length)*100}%`, transition:"width .3s" }} />
              </div>

              <p style={{ fontSize:15, fontWeight:700, color:"#1f2937", marginBottom:16, lineHeight:1.4 }}>{questions[current].q}</p>

              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:20 }}>
                {questions[current].options.map((opt, i) => (
                  <button key={i} onClick={() => handleAnswer(i)}
                    style={{
                      padding:"11px 16px", borderRadius:10, border:`2px solid ${answers[current] === i ? "#1B72C0" : "#e5e7eb"}`,
                      background: answers[current] === i ? "#eff6ff" : "white",
                      color: answers[current] === i ? "#1d4ed8" : "#374151",
                      fontWeight: answers[current] === i ? 700 : 500,
                      fontSize:13, textAlign:"left", cursor:"pointer", transition:"all .15s"
                    }}>
                    <span style={{ marginRight:8, fontWeight:800, color:"#9ca3af" }}>{String.fromCharCode(65+i)}.</span>
                    {opt}
                  </button>
                ))}
              </div>

              <div style={{ display:"flex", gap:8 }}>
                {current < questions.length - 1 ? (
                  <button onClick={handleNext} disabled={answers[current] === undefined}
                    style={{ flex:1, padding:"12px", borderRadius:12, background: answers[current] !== undefined ? "linear-gradient(135deg,#0D2855,#1B72C0)" : "#f3f4f6", color: answers[current] !== undefined ? "white" : "#9ca3af", fontWeight:700, fontSize:14, border:"none", cursor: answers[current] !== undefined ? "pointer" : "not-allowed", transition:"all .2s" }}>
                    Next →
                  </button>
                ) : (
                  <button onClick={handleSubmit} disabled={Object.keys(answers).length < questions.length}
                    style={{ flex:1, padding:"12px", borderRadius:12, background: Object.keys(answers).length === questions.length ? "linear-gradient(135deg,#0D2855,#1B72C0)" : "#f3f4f6", color: Object.keys(answers).length === questions.length ? "white" : "#9ca3af", fontWeight:700, fontSize:14, border:"none", cursor: Object.keys(answers).length === questions.length ? "pointer" : "not-allowed" }}>
                    Submit Test
                  </button>
                )}
              </div>
            </>
          ) : (
            <div style={{ textAlign:"center", padding:"8px 0" }}>
              <div style={{ width:72, height:72, borderRadius:"50%", background: passed ? "#dcfce7" : "#fee2e2", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", fontSize:32 }}>
                {passed ? "🏆" : "😔"}
              </div>
              <h3 style={{ fontSize:20, fontWeight:800, color: passed ? "#16a34a" : "#dc2626", marginBottom:6 }}>
                {passed ? "Test Passed!" : "Not Passed"}
              </h3>
              <p style={{ fontSize:13, color:"#6b7280", marginBottom:20 }}>
                You scored <strong>{score}/{questions.length}</strong> ({percent}%)
                {passed ? " — Badge earned!" : " — 60% required to pass"}
              </p>

              {/* Score bar */}
              <div style={{ background:"#f3f4f6", borderRadius:99, height:8, marginBottom:20, overflow:"hidden" }}>
                <div style={{ background: passed ? "#22c55e" : "#ef4444", height:"100%", borderRadius:99, width:`${percent}%`, transition:"width 1s ease" }} />
              </div>

              {passed && (
                <div style={{ background:"linear-gradient(135deg,#f0fdf4,#dcfce7)", border:"1px solid #bbf7d0", borderRadius:12, padding:"12px 16px", marginBottom:20 }}>
                  <p style={{ fontSize:12, fontWeight:800, color:"#166534" }}>🏅 Badge Earned</p>
                  <p style={{ fontSize:13, color:"#15803d", fontWeight:600, marginTop:4 }}>
                    {skillTests.find(s => s.name === skillName)?.badge}
                  </p>
                </div>
              )}

              <div style={{ display:"flex", gap:8 }}>
                <button onClick={onClose} style={{ flex:1, padding:"12px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"white", fontWeight:600, fontSize:13, cursor:"pointer", color:"#374151" }}>
                  Close
                </button>
                <button onClick={() => onComplete(skillName, passed ? "passed" : "failed")}
                  style={{ flex:1, padding:"12px", borderRadius:12, background:"linear-gradient(135deg,#0D2855,#1B72C0)", color:"white", fontWeight:700, fontSize:13, border:"none", cursor:"pointer" }}>
                  Save Result
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Step5_Skills({ onNext, onBack, currentStep = 5, totalSteps = 12 }) {
  const [testStatus, setTestStatus] = useState({});
  const [activeModal, setActiveModal] = useState(null);

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const takenCount  = Object.keys(testStatus).length;
  const passedCount = Object.values(testStatus).filter(s => s === "passed").length;

  const handleTakeTest     = (name) => setActiveModal(name);
  const handleCloseModal   = () => setActiveModal(null);
  const handleTestComplete = (name, result) => {
    setTestStatus(prev => ({ ...prev, [name]: result }));
    setActiveModal(null);
  };

  const getInsights = () => {
    const insights = [];
    insights.push({ status: "tip", msg: "Tests are optional but unlock premium project access." });
    if (passedCount >= 1) insights.push({ status: "good", msg: `${passedCount} skill${passedCount > 1 ? "s" : ""} verified — clients can see your badges!` });
    if (passedCount >= 2) insights.push({ status: "good", msg: "Multiple badges boost your ranking significantly." });
    if (takenCount > 0 && passedCount === 0) insights.push({ status: "warn", msg: "No tests passed yet — keep trying!" });
    if (passedCount >= 1 && passedCount < skillTests.length) insights.push({ status: "tip", msg: "Verified freelancers earn 3× more on average." });
    if (passedCount === skillTests.length) insights.push({ status: "good", msg: "All skills verified — you're a top-tier freelancer!" });
    return insights;
  };
  const insights = getInsights();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
        .wbl-text-blue { color: #1B72C0; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
        .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
        .skill-row { display:flex; align-items:center; gap:14px; padding:14px 16px; border-radius:14px; border:1.5px solid #e5e7eb; background:white; transition:all .18s; }
        .skill-row:hover { border-color:#93c5fd; background:#f0f9ff; }
        .skill-row.passed { border-color:#86efac; background:#f0fdf4; }
        .skill-row.failed { border-color:#fca5a5; background:#fef2f2; }
        .test-btn { padding:8px 16px; border-radius:10px; font-size:12px; font-weight:700; border:1.5px solid; cursor:pointer; flex-shrink:0; transition:all .15s; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

        {activeModal && (
          <SkillTestModal
            skillName={activeModal}
            onClose={handleCloseModal}
            onComplete={handleTestComplete}
          />
        )}

        {/* Navbar */}
        <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", alignItems:"center", gap:8 }}>
            <div className="wbl-gradient" style={{ width:32, height:32, borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
              </svg>
            </div>
            <span style={{ fontWeight:800, fontSize:18, background:"linear-gradient(135deg,#0D2855,#1B72C0)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent" }}>Weblance</span>
          </div>
          <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save &amp; Exit
          </button>
        </header>

        {/* Step Progress */}
        <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
            <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
                  <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
                    {isDone ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i+1}
                  </div>
                  <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* Main Card */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  Skill Verification Hub
                </span>
              </div>

              <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>AI Skill Tests</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>Prove your skills — verified freelancers earn 3× more</p>

              {/* Info Banner */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, padding:"14px 16px", marginBottom:24 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
                <p style={{ fontSize:13, color:"#92400e", margin:0 }}>
                  Tests are optional but unlock premium project access. Advanced tests are paid (price shown before entry).
                </p>
              </div>

              {/* Skill List */}
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:28 }}>
                {skillTests.map((skill) => {
                  const status = testStatus[skill.name];
                  return (
                    <div key={skill.name} className={`skill-row ${status || ""}`}>
                      {/* Icon */}
                      <div style={{ width:40, height:40, borderRadius:12, background:skill.iconBg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {skill.icon === "code" ? (
                          <svg width="18" height="18" fill="none" stroke={skill.iconColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"/>
                          </svg>
                        ) : (
                          <svg width="18" height="18" fill="none" stroke={skill.iconColor} viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"/>
                          </svg>
                        )}
                      </div>

                      {/* Info */}
                      <div style={{ flex:1, minWidth:0 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:3 }}>
                          <span style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>{skill.name}</span>
                          {skill.recommended && <span style={{ fontSize:11, fontWeight:700, color:"#ca8a04" }}>⭐ Recommended</span>}
                          {status === "passed" && <span style={{ fontSize:10, fontWeight:800, background:"#dcfce7", color:"#16a34a", padding:"2px 8px", borderRadius:100 }}>✓ Passed</span>}
                          {status === "failed" && <span style={{ fontSize:10, fontWeight:800, background:"#fee2e2", color:"#dc2626", padding:"2px 8px", borderRadius:100 }}>✗ Failed</span>}
                        </div>
                        <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>
                          {status === "passed" ? `Badge: ${skill.badge}`
                            : status === "failed" ? `Retry available · ~${skill.time} min`
                            : `~${skill.time} min · Badge on pass: ${skill.badge}`}
                        </p>
                      </div>

                      {/* Button */}
                      <button className="test-btn" onClick={() => handleTakeTest(skill.name)}
                        style={{
                          borderColor: status === "passed" ? "#86efac" : status === "failed" ? "#fca5a5" : "#e5e7eb",
                          background:  status === "passed" ? "#dcfce7"  : status === "failed" ? "#fee2e2"  : "white",
                          color:       status === "passed" ? "#16a34a"  : status === "failed" ? "#dc2626"  : "#374151",
                        }}>
                        {status === "passed" ? "Retake" : status === "failed" ? "Retry" : "Take Test"}
                      </button>
                    </div>
                  );
                })}
              </div>

              {/* Badge Levels */}
              <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:14, padding:"16px 18px" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#374151", marginBottom:12 }}>Badge Levels:</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:8 }}>
                  {badgeLevels.map((b) => (
                    <div key={b.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      {b.type === "box" ? (
                        <div style={{ width:16, height:16, borderRadius:4, border:"2px solid #d1d5db", flexShrink:0 }}></div>
                      ) : b.type === "check" ? (
                        <div style={{ width:16, height:16, borderRadius:4, background:b.bg, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                          <svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                        </div>
                      ) : (
                        <div style={{ width:16, height:16, borderRadius:"50%", background:b.bg, flexShrink:0 }}></div>
                      )}
                      <span style={{ fontSize:12, color:"#6b7280" }}>{b.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="wbl-btn-primary" onClick={onNext}>
                Continue to Portfolio
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width:280, flexShrink:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {insights.map((insight, i) => (
                  <div key={i} className={insight.status === "good" ? "insight-good" : insight.status === "warn" ? "insight-warn" : "insight-tip"}
                    style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                    {insight.status === "good" ? (
                      <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" fill="none" stroke="#9333ea" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {takenCount > 0 && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Tests taken:</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:12 }}>
                    {Object.entries(testStatus).map(([name, status]) => (
                      <div key={name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <span style={{ fontSize:12, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", marginRight:8 }}>{name}</span>
                        <span style={{ fontSize:10, fontWeight:800, padding:"2px 6px", borderRadius:6, flexShrink:0,
                          background: status === "passed" ? "#dcfce7" : "#fee2e2",
                          color:      status === "passed" ? "#16a34a" : "#dc2626" }}>
                          {status === "passed" ? "✓ PASSED" : "✗ FAILED"}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginBottom:5 }}>
                    <span>Passed</span>
                    <span className="wbl-text-blue" style={{ fontWeight:800 }}>{passedCount} / {skillTests.length}</span>
                  </div>
                  <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
                    <div style={{ background:"#22c55e", height:"100%", borderRadius:100, width:`${(passedCount/skillTests.length)*100}%`, transition:"width .3s ease" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}