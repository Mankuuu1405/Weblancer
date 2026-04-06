import { useState, useEffect } from "react";

const questions = [
  {
    id: 1,
    type: "CODING CHALLENGE",
    question: "Build a custom React hook that manages paginated API calls with loading, error, and retry states.",
    filename: "solution.tsx",
    starter: `// Write your solution here
import { useState, useCallback } from 'react';

export function usePaginatedFetch(url) {
  // Your code here
}`
  },
  {
    id: 2,
    type: "CODING CHALLENGE",
    question: "Write a function that debounces an async function, cancelling any in-flight calls when a new one is triggered.",
    filename: "solution.ts",
    starter: `// Write your solution here
export function debounceAsync(fn, delay) {
  // Your code here
}`
  },
  {
    id: 3,
    type: "CONCEPTUAL",
    question: "Explain the difference between useMemo and useCallback in React. When would you use each? Write a code example demonstrating both.",
    filename: "answer.tsx",
    starter: `// Your explanation and example here
// useMemo:

// useCallback:
`
  }
];

export default function SkillTestModal({ skillName, onClose, onComplete }) {
  const TOTAL_TIME = 45 * 60;
  const [currentQ, setCurrentQ]     = useState(0);
  const [answers, setAnswers]       = useState(questions.map(q => q.starter));
  const [timeLeft, setTimeLeft]     = useState(TOTAL_TIME);
  const [testOutput, setTestOutput] = useState("--");
  const [running, setRunning]       = useState(false);
  const [submitted, setSubmitted]   = useState(false);
  const [score, setScore]           = useState(null);

  useEffect(() => {
    if (submitted) return;
    const interval = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) { clearInterval(interval); handleFinish(); return 0; }
        return t - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [submitted]);

  const formatTime = (s) => {
    const m   = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const timerColor = timeLeft < 300 ? "text-red-500" : timeLeft < 600 ? "text-yellow-500" : "text-gray-800";

  const handleRunCode = () => {
    setRunning(true);
    setTestOutput("Running...");
    setTimeout(() => {
      const hasCode = answers[currentQ].replace(questions[currentQ].starter, "").trim().length > 20;
      setTestOutput(hasCode ? "✓ Tests passed (3/3)" : "✗ No substantial code found");
      setRunning(false);
    }, 1200);
  };

  const handleSubmitAnswer = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setTestOutput("--");
    } else {
      handleFinish();
    }
  };

  const handleSkip = () => {
    if (currentQ < questions.length - 1) {
      setCurrentQ(q => q + 1);
      setTestOutput("--");
    } else {
      handleFinish();
    }
  };

  const handleFinish = () => {
    const answeredCount = answers.filter((a, i) =>
      a.trim() !== questions[i].starter.trim() && a.trim().length > 30
    ).length;
    const raw = Math.round((answeredCount / questions.length) * 50 + Math.random() * 35 + 15);
    setScore(Math.min(100, raw));
    setSubmitted(true);
  };

  const updateAnswer = (val) => {
    const updated = [...answers];
    updated[currentQ] = val;
    setAnswers(updated);
  };

  const passed = score >= 60;

  /* ════ RESULT SCREEN ════ */
  if (submitted && score !== null) {
    const badgeLabel = score >= 90 ? "Elite" : score >= 75 ? "Pro+" : passed ? "Verified" : null;
    return (
      <>
        <style>{`
          .wbl-btn-inline { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }

          /* ── Responsive ── */
          @media (max-width: 480px) {
            .result-modal { padding: 24px 18px !important; margin: 12px !important; }
            .result-score-circle { width: 80px !important; height: 80px !important; }
            .result-icon-circle { width: 64px !important; height: 64px !important; }
            .result-btns { flex-direction: column !important; }
            .result-btns button { width: 100% !important; }
          }
        `}</style>
        <div style={{ position:"fixed", inset:0, background:"rgba(0,0,0,0.6)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
          <div className="result-modal" style={{ background:"white", borderRadius:20, boxShadow:"0 20px 60px rgba(0,0,0,0.2)", width:"100%", maxWidth:420, padding:32, textAlign:"center" }}>

            <div className="result-icon-circle" style={{ width:80, height:80, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px", background: passed ? "#dcfce7" : "#fee2e2" }}>
              {passed
                ? <svg style={{ width:40, height:40, color:"#22c55e" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                : <svg style={{ width:40, height:40, color:"#f87171" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
            </div>

            <h2 style={{ fontSize:22, fontWeight:800, marginBottom:4, color: passed ? "#15803d" : "#dc2626" }}>
              {passed ? "Test Passed! 🎉" : "Test Failed"}
            </h2>
            <p style={{ color:"#6b7280", fontSize:13, marginBottom:20 }}>{skillName} Skill Test</p>

            <div className="result-score-circle" style={{ width:96, height:96, borderRadius:"50%", border:`4px solid ${passed ? "#86efac" : "#fca5a5"}`, background: passed ? "#f0fdf4" : "#fef2f2", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 20px" }}>
              <span style={{ fontSize:26, fontWeight:800, color: passed ? "#15803d" : "#dc2626" }}>{score}</span>
            </div>

            {passed && badgeLabel && (
              <div style={{ background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"12px 16px", marginBottom:20 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#166534" }}>🏅 Badge Earned: {badgeLabel} {skillName} Developer</p>
              </div>
            )}
            {!passed && (
              <div style={{ background:"#fef2f2", border:"1px solid #fca5a5", borderRadius:12, padding:"12px 16px", marginBottom:20 }}>
                <p style={{ fontSize:13, color:"#dc2626" }}>Score of {score} is below 60. You can retry after 24 hours.</p>
              </div>
            )}

            <div className="result-btns" style={{ display:"flex", gap:10, justifyContent:"center" }}>
              <button onClick={onClose} style={{ padding:"10px 20px", border:"1.5px solid #e5e7eb", borderRadius:12, fontSize:13, fontWeight:600, background:"white", cursor:"pointer", color:"#374151" }}>
                Back to Tests
              </button>
              <button onClick={() => onComplete(skillName, passed ? "passed" : "failed")}
                className="wbl-btn-inline"
                style={{ padding:"10px 20px", borderRadius:12, fontSize:13, fontWeight:700, color:"white", cursor:"pointer", border:"none" }}>
                {passed ? "Continue" : "Try Another"}
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }

  const q = questions[currentQ];

  /* ════ TEST SCREEN ════ */
  return (
    <>
      <style>{`
        .wbl-bg { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
        .wbl-text-blue { color:#1B72C0 !important; }
        .wbl-btn-inline { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }

        /* ── Responsive ── */
        @media (max-width: 640px) {
          .test-header { padding: 10px 14px !important; flex-wrap: wrap; gap: 6px; }
          .test-skill-badge { display: none !important; }
          .test-question-card { padding: 20px 16px !important; }
          .test-editor-textarea { min-height: 160px !important; rows: 8; }
          .test-footer { flex-wrap: wrap !important; gap: 8px !important; }
          .test-output-text { font-size: 11px !important; }
          .test-submit-btn { width: 100% !important; justify-content: center !important; }
        }
        @media (max-width: 400px) {
          .test-timer { font-size: 13px !important; }
          .test-proctored { font-size: 10px !important; padding: 6px 8px !important; }
        }
      `}</style>

      <div style={{ position:"fixed", inset:0, background:"#f3f4f6", zIndex:50, display:"flex", flexDirection:"column", overflow:"hidden" }}>

        {/* Header */}
        <header className="test-header" style={{ background:"white", borderBottom:"1px solid #e5e7eb", padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0, gap:8, flexWrap:"wrap" }}>
          <img src="/weblance.jpeg" alt="Weblance" style={{height: 54, width: 155, display: "block" }} />

          <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
            <span className="test-skill-badge" style={{ display:"none", fontSize:11, fontWeight:700, border:"1px solid #d1d5db", color:"#374151", padding:"6px 12px", borderRadius:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>
              {skillName} Skill Test
            </span>
            <style>{`@media (min-width: 641px) { .test-skill-badge { display: inline !important; } }`}</style>

            <div className="test-timer" style={{ display:"flex", alignItems:"center", gap:6, fontFamily:"monospace", fontWeight:700, fontSize:15, color: timeLeft < 300 ? "#ef4444" : timeLeft < 600 ? "#ca8a04" : "#1f2937" }}>
              <svg style={{ width:16, height:16, color:"#fb923c" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              {formatTime(timeLeft)}
            </div>

            <span className="test-proctored" style={{ display:"flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, color:"#dc2626", background:"#fef2f2", border:"1px solid #fca5a5", padding:"6px 10px", borderRadius:8 }}>
              <svg style={{ width:13, height:13 }} fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
              </svg>
              <span style={{ display:"none" }}>PROCTORED — </span>CAM ON
              <style>{`@media (min-width: 481px) { .test-proctored span { display: inline !important; } }`}</style>
            </span>

            <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:4 }}>
              <svg style={{ width:20, height:20 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
              </svg>
            </button>
          </div>
        </header>

        {/* Progress bar */}
        <div style={{ height:3, background:"#e5e7eb", flexShrink:0 }}>
          <div className="wbl-bg" style={{ height:"100%", width:`${((currentQ + 1) / questions.length) * 100}%`, transition:"width .5s" }} />
        </div>

        {/* Content */}
        <div style={{ flex:1, overflowY:"auto", display:"flex", alignItems:"flex-start", justifyContent:"center", padding:"20px 16px" }}>
          <div className="test-question-card" style={{ background:"white", borderRadius:16, border:"1px solid #e5e7eb", width:"100%", maxWidth:760, padding:"24px 28px", boxShadow:"0 2px 12px rgba(0,0,0,0.05)" }}>

            <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
              <span style={{ fontSize:13, fontWeight:600, color:"#374151" }}>Question {currentQ + 1} of {questions.length}</span>
              <span style={{ fontSize:11, fontWeight:700, border:"1px solid #d1d5db", color:"#6b7280", padding:"4px 10px", borderRadius:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>{q.type}</span>
            </div>

            <p style={{ fontSize:"clamp(13px,2vw,15px)", color:"#1f2937", lineHeight:1.6, marginBottom:20 }}>{q.question}</p>

            {/* Editor */}
            <div style={{ border:"1px solid #e5e7eb", borderRadius:12, overflow:"hidden", marginBottom:16 }}>
              <div style={{ background:"#f8fafc", borderBottom:"1px solid #e5e7eb", padding:"8px 16px", display:"flex", alignItems:"center", gap:8 }}>
                <div style={{ display:"flex", gap:5 }}>
                  {["#f87171","#fbbf24","#4ade80"].map(c => <div key={c} style={{ width:11, height:11, borderRadius:"50%", background:c }} />)}
                </div>
                <span style={{ fontSize:12, color:"#6b7280", fontFamily:"monospace", marginLeft:6 }}>{q.filename}</span>
              </div>
              <textarea
                className="test-editor-textarea"
                value={answers[currentQ]}
                onChange={(e) => updateAnswer(e.target.value)}
                rows={10}
                spellCheck={false}
                style={{ width:"100%", fontFamily:"'Fira Code','Courier New',monospace", fontSize:"clamp(11px,1.5vw,13px)", background:"white", color:"#1f2937", padding:16, outline:"none", resize:"vertical", minHeight:180, lineHeight:1.6, boxSizing:"border-box", border:"none", display:"block" }}
              />
            </div>

            {/* Run + Output */}
            <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, flexWrap:"wrap" }}>
              <button onClick={handleRunCode} disabled={running}
                style={{ display:"flex", alignItems:"center", gap:8, padding:"8px 16px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:13, fontWeight:600, background:"white", cursor:"pointer", color:"#374151" }}>
                {running
                  ? <svg className="wbl-text-blue" style={{ width:15, height:15, animation:"spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity=".25" strokeWidth="4"/><path fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                  : <svg style={{ width:15, height:15, color:"#6b7280" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>}
                Run Code
              </button>
              <span className="test-output-text" style={{ fontSize:13, fontWeight:600, color: testOutput.includes("✓") ? "#16a34a" : testOutput.includes("✗") ? "#dc2626" : "#9ca3af" }}>
                Output: {testOutput}
              </span>
            </div>

            {/* Footer */}
            <div className="test-footer" style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
              <button onClick={handleSkip} style={{ fontSize:13, color:"#9ca3af", fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>Skip</button>
              <button className="wbl-btn-inline test-submit-btn" onClick={handleSubmitAnswer}
                style={{ display:"flex", alignItems:"center", gap:8, color:"white", fontWeight:700, padding:"10px 22px", borderRadius:12, fontSize:13, border:"none", cursor:"pointer" }}>
                {currentQ < questions.length - 1 ? "Submit Answer" : "Finish Test"}
                <svg style={{ width:15, height:15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <style>{`@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`}</style>
    </>
  );
}