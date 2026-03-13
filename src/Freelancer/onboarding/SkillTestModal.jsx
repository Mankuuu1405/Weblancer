// import { useState, useEffect } from "react";

// const questions = [
//   {
//     id: 1,
//     type: "CODING CHALLENGE",
//     question: "Build a custom React hook that manages paginated API calls with loading, error, and retry states.",
//     filename: "solution.tsx",
//     starter: `// Write your solution here
// import { useState, useCallback } from 'react';

// export function usePaginatedFetch(url) {
//   // Your code here
// }`
//   },
//   {
//     id: 2,
//     type: "CODING CHALLENGE",
//     question: "Write a function that debounces an async function, cancelling any in-flight calls when a new one is triggered.",
//     filename: "solution.ts",
//     starter: `// Write your solution here
// export function debounceAsync(fn, delay) {
//   // Your code here
// }`
//   },
//   {
//     id: 3,
//     type: "CONCEPTUAL",
//     question: "Explain the difference between useMemo and useCallback in React. When would you use each? Write a code example demonstrating both.",
//     filename: "answer.tsx",
//     starter: `// Your explanation and example here
// // useMemo:

// // useCallback:
// `
//   }
// ];

// export default function SkillTestModal({ skillName, onClose, onComplete }) {
//   const TOTAL_TIME = 45 * 60;
//   const [currentQ, setCurrentQ]     = useState(0);
//   const [answers, setAnswers]       = useState(questions.map(q => q.starter));
//   const [timeLeft, setTimeLeft]     = useState(TOTAL_TIME);
//   const [testOutput, setTestOutput] = useState("--");
//   const [running, setRunning]       = useState(false);
//   const [submitted, setSubmitted]   = useState(false);
//   const [score, setScore]           = useState(null);

//   /* ── Countdown timer ── */
//   useEffect(() => {
//     if (submitted) return;
//     const interval = setInterval(() => {
//       setTimeLeft(t => {
//         if (t <= 1) { clearInterval(interval); handleFinish(); return 0; }
//         return t - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [submitted]);

//   const formatTime = (s) => {
//     const m   = Math.floor(s / 60).toString().padStart(2, "0");
//     const sec = (s % 60).toString().padStart(2, "0");
//     return `${m}:${sec}`;
//   };

//   const timerColor = timeLeft < 300 ? "text-red-500" : timeLeft < 600 ? "text-yellow-500" : "text-gray-800";

//   /* ── Run Code ── */
//   const handleRunCode = () => {
//     setRunning(true);
//     setTestOutput("Running...");
//     setTimeout(() => {
//       const hasCode = answers[currentQ].replace(questions[currentQ].starter, "").trim().length > 20;
//       setTestOutput(hasCode ? "✓ Tests passed (3/3)" : "✗ No substantial code found");
//       setRunning(false);
//     }, 1200);
//   };

//   /* ── Navigate / Submit ── */
//   const handleSubmitAnswer = () => {
//     if (currentQ < questions.length - 1) {
//       setCurrentQ(q => q + 1);
//       setTestOutput("--");
//     } else {
//       handleFinish();
//     }
//   };

//   const handleSkip = () => {
//     if (currentQ < questions.length - 1) {
//       setCurrentQ(q => q + 1);
//       setTestOutput("--");
//     } else {
//       handleFinish();
//     }
//   };

//   const handleFinish = () => {
//     const answeredCount = answers.filter((a, i) =>
//       a.trim() !== questions[i].starter.trim() && a.trim().length > 30
//     ).length;
//     const raw = Math.round((answeredCount / questions.length) * 50 + Math.random() * 35 + 15);
//     setScore(Math.min(100, raw));
//     setSubmitted(true);
//   };

//   const updateAnswer = (val) => {
//     const updated = [...answers];
//     updated[currentQ] = val;
//     setAnswers(updated);
//   };

//   const passed = score >= 60;

//   /* ════════════════════════════════
//      RESULT SCREEN
//   ════════════════════════════════ */
//   if (submitted && score !== null) {
//     const badgeLabel = score >= 90 ? "Elite" : score >= 75 ? "Pro+" : passed ? "Verified" : null;
//     return (
//       <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
//         <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">

//           {/* Icon */}
//           <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
//             ${passed ? "bg-green-100" : "bg-red-100"}`}>
//             {passed
//               ? <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>
//               : <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                 </svg>}
//           </div>

//           <h2 className={`text-2xl font-bold mb-1 ${passed ? "text-green-700" : "text-red-600"}`}>
//             {passed ? "Test Passed! 🎉" : "Test Failed"}
//           </h2>
//           <p className="text-gray-500 text-sm mb-5">{skillName} Skill Test</p>

//           {/* Score circle */}
//           <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-5
//             ${passed ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50"}`}>
//             <span className={`text-2xl font-bold ${passed ? "text-green-700" : "text-red-600"}`}>
//               {score}
//             </span>
//           </div>

//           {passed && badgeLabel && (
//             <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
//               <p className="text-sm font-semibold text-green-800">
//                 🏅 Badge Earned: {badgeLabel} {skillName} Developer
//               </p>
//             </div>
//           )}

//           {!passed && (
//             <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
//               <p className="text-sm text-red-700">
//                 Score of {score} is below 60. You can retry after 24 hours.
//               </p>
//             </div>
//           )}

//           <div className="flex gap-3 justify-center">
//             <button onClick={onClose}
//               className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//               Back to Tests
//             </button>
//             <button onClick={() => onComplete(skillName, passed ? "passed" : "failed")}
//               className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition
//                 ${passed ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"}`}>
//               {passed ? "Continue" : "Try Another"}
//             </button>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const q = questions[currentQ];

//   /* ════════════════════════════════
//      TEST SCREEN
//   ════════════════════════════════ */
//   return (
//     <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col overflow-hidden">

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
//         <span className="text-blue-600 font-bold text-lg tracking-tight">ArcLancer</span>

//         <div className="flex items-center gap-2 sm:gap-4">
//           {/* Skill badge */}
//           <span className="hidden sm:inline text-xs font-bold border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg uppercase tracking-wide">
//             {skillName} Skill Test
//           </span>

//           {/* Timer */}
//           <div className={`flex items-center gap-1.5 font-mono font-bold text-base ${timerColor}`}>
//             <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
//             </svg>
//             {formatTime(timeLeft)}
//           </div>

//           {/* Proctored */}
//           <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
//             <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
//               <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
//             </svg>
//             <span className="hidden sm:inline">PROCTORED — CAMERA ON</span>
//             <span className="sm:hidden">PROCTORED</span>
//           </span>

//           {/* Close */}
//           <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1">
//             <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//             </svg>
//           </button>
//         </div>
//       </header>

//       {/* Question progress bar */}
//       <div className="h-1 bg-gray-200 flex-shrink-0">
//         <div className="h-1 bg-blue-500 transition-all duration-500"
//           style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}/>
//       </div>

//       {/* ── Question Area ── */}
//       <div className="flex-1 overflow-y-auto flex items-start justify-center py-6 px-4">
//         <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-3xl p-6 sm:p-8">

//           {/* Header */}
//           <div className="flex items-center justify-between mb-4">
//             <span className="text-sm font-semibold text-gray-700">
//               Question {currentQ + 1} of {questions.length}
//             </span>
//             <span className="text-xs font-bold border border-gray-300 text-gray-600 px-3 py-1 rounded-lg uppercase tracking-wide">
//               {q.type}
//             </span>
//           </div>

//           {/* Question */}
//           <p className="text-gray-800 text-base leading-relaxed mb-5">{q.question}</p>

//           {/* Code Editor */}
//           <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
//             {/* Editor top bar */}
//             <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
//               <div className="flex gap-1.5">
//                 <div className="w-3 h-3 rounded-full bg-red-400"></div>
//                 <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
//                 <div className="w-3 h-3 rounded-full bg-green-400"></div>
//               </div>
//               <span className="text-xs text-gray-500 font-mono ml-2">{q.filename}</span>
//             </div>

//             {/* Code textarea */}
//             <textarea
//               value={answers[currentQ]}
//               onChange={(e) => updateAnswer(e.target.value)}
//               rows={12}
//               spellCheck={false}
//               className="w-full font-mono text-sm bg-white text-gray-800 p-4 outline-none resize-y min-h-[200px] leading-relaxed"
//               style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
//             />
//           </div>

//           {/* Run Code */}
//           <div className="flex items-center gap-4 mb-6">
//             <button onClick={handleRunCode} disabled={running}
//               className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50">
//               {running
//                 ? <svg className="w-4 h-4 animate-spin text-blue-500" fill="none" viewBox="0 0 24 24">
//                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                   </svg>
//                 : <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                   </svg>}
//               Run Code
//             </button>
//             <span className={`text-sm font-medium
//               ${testOutput.includes("✓") ? "text-green-600"
//                 : testOutput.includes("✗") ? "text-red-500"
//                 : "text-gray-400"}`}>
//               Test Output: {testOutput}
//             </span>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-between">
//             <button onClick={handleSkip}
//               className="text-sm text-gray-400 hover:text-gray-600 transition font-medium px-2 py-1">
//               Skip
//             </button>
//             <button onClick={handleSubmitAnswer}
//               className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition shadow-sm">
//               {currentQ < questions.length - 1 ? "Submit Answer" : "Finish Test"}
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//               </svg>
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






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

  /* ── Countdown timer ── */
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

  /* ── Run Code ── */
  const handleRunCode = () => {
    setRunning(true);
    setTestOutput("Running...");
    setTimeout(() => {
      const hasCode = answers[currentQ].replace(questions[currentQ].starter, "").trim().length > 20;
      setTestOutput(hasCode ? "✓ Tests passed (3/3)" : "✗ No substantial code found");
      setRunning(false);
    }, 1200);
  };

  /* ── Navigate / Submit ── */
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

  /* ════════════════════════════════
     RESULT SCREEN
  ════════════════════════════════ */
  if (submitted && score !== null) {
    const badgeLabel = score >= 90 ? "Elite" : score >= 75 ? "Pro+" : passed ? "Verified" : null;
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
      <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-8 text-center">

          {/* Icon */}
          <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4
            ${passed ? "bg-green-100" : "bg-red-100"}`}>
            {passed
              ? <svg className="w-10 h-10 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
              : <svg className="w-10 h-10 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>}
          </div>

          <h2 className={`text-2xl font-bold mb-1 ${passed ? "text-green-700" : "text-red-600"}`}>
            {passed ? "Test Passed! 🎉" : "Test Failed"}
          </h2>
          <p className="text-gray-500 text-sm mb-5">{skillName} Skill Test</p>

          {/* Score circle */}
          <div className={`w-24 h-24 rounded-full border-4 flex items-center justify-center mx-auto mb-5
            ${passed ? "border-green-400 bg-green-50" : "border-red-300 bg-red-50"}`}>
            <span className={`text-2xl font-bold ${passed ? "text-green-700" : "text-red-600"}`}>
              {score}
            </span>
          </div>

          {passed && badgeLabel && (
            <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm font-semibold text-green-800">
                🏅 Badge Earned: {badgeLabel} {skillName} Developer
              </p>
            </div>
          )}

          {!passed && (
            <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 mb-5">
              <p className="text-sm text-red-700">
                Score of {score} is below 60. You can retry after 24 hours.
              </p>
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button onClick={onClose}
              className="px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
              Back to Tests
            </button>
            <button onClick={() => onComplete(skillName, passed ? "passed" : "failed")}
              className={`px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition
                ${passed ? "bg-green-500 hover:bg-green-600" : "wbl-btn-inline"}`}>
              {passed ? "Continue" : "Try Another"}
            </button>
          </div>
        </div>
      </div>
    </>
    );
  }

  const q = questions[currentQ];

  /* ════════════════════════════════
     TEST SCREEN
  ════════════════════════════════ */
  return (
    <>
      <style>{`
        .wbl-bg, .wbl-btn-inline { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
        .wbl-text-blue { color:#1B72C0 !important; }
        .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
      `}</style>
    <div className="fixed inset-0 bg-gray-100 z-50 flex flex-col overflow-hidden">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between flex-shrink-0">
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 40, width: "auto" }} />

        <div className="flex items-center gap-2 sm:gap-4">
          {/* Skill badge */}
          <span className="hidden sm:inline text-xs font-bold border border-gray-300 text-gray-700 px-3 py-1.5 rounded-lg uppercase tracking-wide">
            {skillName} Skill Test
          </span>

          {/* Timer */}
          <div className={`flex items-center gap-1.5 font-mono font-bold text-base ${timerColor}`}>
            <svg className="w-4 h-4 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
            {formatTime(timeLeft)}
          </div>

          {/* Proctored */}
          <span className="flex items-center gap-1.5 text-xs font-bold text-red-600 bg-red-50 border border-red-200 px-3 py-1.5 rounded-lg">
            <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z"/>
            </svg>
            <span className="hidden sm:inline">PROCTORED — CAMERA ON</span>
            <span className="sm:hidden">PROCTORED</span>
          </span>

          {/* Close */}
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition p-1">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
            </svg>
          </button>
        </div>
      </header>

      {/* Question progress bar */}
      <div className="h-1 bg-gray-200 flex-shrink-0">
        <div className="h-1 wbl-bg transition-all duration-500"
          style={{ width: `${((currentQ + 1) / questions.length) * 100}%` }}/>
      </div>

      {/* ── Question Area ── */}
      <div className="flex-1 overflow-y-auto flex items-start justify-center py-6 px-4">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 w-full max-w-3xl p-6 sm:p-8">

          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold text-gray-700">
              Question {currentQ + 1} of {questions.length}
            </span>
            <span className="text-xs font-bold border border-gray-300 text-gray-600 px-3 py-1 rounded-lg uppercase tracking-wide">
              {q.type}
            </span>
          </div>

          {/* Question */}
          <p className="text-gray-800 text-base leading-relaxed mb-5">{q.question}</p>

          {/* Code Editor */}
          <div className="border border-gray-200 rounded-xl overflow-hidden mb-4">
            {/* Editor top bar */}
            <div className="bg-gray-50 border-b border-gray-200 px-4 py-2 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-400"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                <div className="w-3 h-3 rounded-full bg-green-400"></div>
              </div>
              <span className="text-xs text-gray-500 font-mono ml-2">{q.filename}</span>
            </div>

            {/* Code textarea */}
            <textarea
              value={answers[currentQ]}
              onChange={(e) => updateAnswer(e.target.value)}
              rows={12}
              spellCheck={false}
              className="w-full font-mono text-sm bg-white text-gray-800 p-4 outline-none resize-y min-h-[200px] leading-relaxed"
              style={{ fontFamily: "'Fira Code', 'Courier New', monospace" }}
            />
          </div>

          {/* Run Code */}
          <div className="flex items-center gap-4 mb-6">
            <button onClick={handleRunCode} disabled={running}
              className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-xl text-sm font-medium hover:bg-gray-50 transition disabled:opacity-50">
              {running
                ? <svg className="w-4 h-4 animate-spin wbl-text-blue" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                  </svg>
                : <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>}
              Run Code
            </button>
            <span className={`text-sm font-medium
              ${testOutput.includes("✓") ? "text-green-600"
                : testOutput.includes("✗") ? "text-red-500"
                : "text-gray-400"}`}>
              Test Output: {testOutput}
            </span>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between">
            <button onClick={handleSkip}
              className="text-sm text-gray-400 hover:text-gray-600 transition font-medium px-2 py-1">
              Skip
            </button>
            <button onClick={handleSubmitAnswer}
              className="wbl-btn-inline text-white font-semibold px-6 py-2.5 rounded-xl text-sm flex items-center gap-2 transition shadow-sm">
              {currentQ < questions.length - 1 ? "Submit Answer" : "Finish Test"}
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}