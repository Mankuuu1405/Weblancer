





// import { useState, useRef, useEffect } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const spinKeyframes = `@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`;
// const bounceKeyframes = `
//   @keyframes bounce0 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
//   @keyframes bounce1 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
//   @keyframes bounce2 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
// `;

// function InterviewModal({ mode, onClose, onComplete }) {
//   const [messages, setMessages]     = useState([]);
//   const [input, setInput]           = useState("");
//   const [loading, setLoading]       = useState(false);
//   const [started, setStarted]       = useState(false);
//   const [qCount, setQCount]         = useState(0);
//   const [done, setDone]             = useState(false);
//   const [score, setScore]           = useState(null);
//   const bottomRef                   = useRef(null);
//   const inputRef                    = useRef(null);
//   const TOTAL_Q                     = 8;

//   const SYSTEM_PROMPT = `You are an AI interview assistant for Weblance, a freelancing platform. Your job is to conduct a friendly but professional interview to assess a freelancer's expertise and experience.

// Rules:
// - Ask ONE question at a time. Never ask multiple questions in one message.
// - Start with a warm greeting and your first question immediately.
// - Ask exactly ${TOTAL_Q} questions total, adapting difficulty based on answers (easier if struggling, harder if strong).
// - Questions should cover: years of experience, past projects, technical skills, problem-solving approach, client communication, handling difficult situations, tools/stack, and career goals.
// - After each answer, give very brief (1 sentence) positive acknowledgment, then ask the next question.
// - After the ${TOTAL_Q}th answer, give a brief conclusion (2-3 sentences max praising their responses), then output this exact JSON on a new line: {"interview_complete": true, "score": <number 60-95>}
// - Keep responses concise and conversational.
// - Never break character.`;

//   useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

//   useEffect(() => {
//     if (!started) { setStarted(true); callClaude([], true); }
//   }, []);

//   const callClaude = async (history, isFirst = false) => {
//     setLoading(true);
//     try {
//       const apiMessages = isFirst
//         ? [{ role:"user", content:"Please start the interview now." }]
//         : history.map(m => ({ role:m.role, content:m.content }));

//       const res = await fetch("https://api.anthropic.com/v1/messages", {
//         method: "POST",
//         headers: { "Content-Type":"application/json" },
//         body: JSON.stringify({
//           model: "claude-sonnet-4-20250514",
//           max_tokens: 1000,
//           system: SYSTEM_PROMPT,
//           messages: apiMessages,
//         })
//       });
//       const data = await res.json();
//       const text = data.content?.map(c => c.text || "").join("") || "";

//       const jsonMatch = text.match(/\{"interview_complete":\s*true,\s*"score":\s*(\d+)\}/);
//       if (jsonMatch) {
//         const finalScore = parseInt(jsonMatch[1]);
//         const cleanText  = text.replace(jsonMatch[0], "").trim();
//         setMessages(prev => [...prev, { role:"assistant", content:cleanText }]);
//         setScore(finalScore);
//         setDone(true);
//       } else {
//         setMessages(prev => [...prev, { role:"assistant", content:text }]);
//         if (!isFirst) setQCount(q => q + 1);
//       }
//     } catch {
//       setMessages(prev => [...prev, { role:"assistant", content:"Sorry, I had a connection issue. Please try sending your message again." }]);
//     }
//     setLoading(false);
//     setTimeout(() => inputRef.current?.focus(), 100);
//   };

//   const handleSend = async () => {
//     const trimmed = input.trim();
//     if (!trimmed || loading || done) return;
//     const userMsg    = { role:"user", content:trimmed };
//     const newHistory = [...messages, userMsg];
//     setMessages(newHistory);
//     setInput("");
//     await callClaude(newHistory);
//   };

//   const handleKey = (e) => {
//     if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
//   };

//   const progressPct = Math.min(100, (qCount / TOTAL_Q) * 100);

//   return (
//     <>
//       <style>{`
//         ${spinKeyframes}
//         ${bounceKeyframes}
//         .bounce-dot-0 { animation: bounce0 1.2s ease-in-out 0s infinite; }
//         .bounce-dot-1 { animation: bounce1 1.2s ease-in-out 0.15s infinite; }
//         .bounce-dot-2 { animation: bounce2 1.2s ease-in-out 0.30s infinite; }
//         .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:1000; display:flex; align-items:center; justify-content:center; padding:16px; }
//         .modal-box { background:white; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.25); width:100%; max-width:640px; display:flex; flex-direction:column; height:min(700px,90vh); overflow:hidden; }
//         .msg-area { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:16px; }
//         .msg-bubble-ai { background:#f8fafc; border:1px solid #e5e7eb; color:#1f2937; border-radius:16px 16px 16px 4px; padding:12px 16px; font-size:13px; line-height:1.6; max-width:80%; }
//         .msg-bubble-user { background:linear-gradient(135deg,#0D2855,#1B72C0); color:white; border-radius:16px 16px 4px 16px; padding:12px 16px; font-size:13px; line-height:1.6; max-width:80%; }
//         .chat-input { flex:1; border:1.5px solid #e5e7eb; border-radius:12px; padding:10px 14px; font-size:13px; outline:none; resize:none; background:#f8fafc; transition:border-color .2s; font-family:inherit; }
//         .chat-input:focus { border-color:#1B72C0; }
//         .chat-input:disabled { opacity:0.5; }
//         .send-btn { width:40px; height:40px; border-radius:10px; background:linear-gradient(135deg,#0D2855,#1B72C0); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; transition:opacity .2s; }
//         .send-btn:disabled { opacity:0.4; cursor:not-allowed; }
//         .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
//       `}</style>

//       <div className="modal-overlay">
//         <div className="modal-box">

//           {/* Header */}
//           <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 20px", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
//             <div style={{ width:40, height:40, borderRadius:12, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//               <svg width="20" height="20" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
//               </svg>
//             </div>
//             <div style={{ flex:1, minWidth:0 }}>
//               <p style={{ fontWeight:800, fontSize:14, color:"#1f2937", margin:0 }}>AI Interview Assistant</p>
//               <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
//                 <div style={{ flex:1, background:"#f3f4f6", borderRadius:99, height:5, maxWidth:120 }}>
//                   <div style={{ background:"#a855f7", height:"100%", borderRadius:99, width:`${progressPct}%`, transition:"width .5s" }}/>
//                 </div>
//                 <span style={{ fontSize:11, color:"#9ca3af" }}>{qCount}/{TOTAL_Q} questions</span>
//               </div>
//             </div>
//             <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
//               <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:100,
//                 background: mode === "voice" ? "#fff7ed" : "#eff6ff",
//                 color:      mode === "voice" ? "#ea580c"  : "#1B72C0",
//                 border:     mode === "voice" ? "1px solid #fed7aa" : "1px solid #bfdbfe" }}>
//                 {mode === "voice" ? "🎤 Voice" : "💬 Text"}
//               </span>
//               <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:4, display:"flex" }}>
//                 <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Messages */}
//           <div className="msg-area">
//             {messages.map((msg, i) => (
//               <div key={i} style={{ display:"flex", gap:10, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
//                 {msg.role === "assistant" && (
//                   <div style={{ width:32, height:32, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
//                     <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
//                     </svg>
//                   </div>
//                 )}
//                 <div className={msg.role === "assistant" ? "msg-bubble-ai" : "msg-bubble-user"}>
//                   {msg.content}
//                 </div>
//               </div>
//             ))}

//             {loading && (
//               <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
//                 <div style={{ width:32, height:32, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                   <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
//                   </svg>
//                 </div>
//                 <div style={{ background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:"16px 16px 16px 4px", padding:"12px 16px", display:"flex", gap:5, alignItems:"center" }}>
//                   {[0,1,2].map(i => (
//                     <div key={i} className={`bounce-dot-${i}`} style={{ width:8, height:8, borderRadius:"50%", background:"#9ca3af" }}/>
//                   ))}
//                 </div>
//               </div>
//             )}
//             <div ref={bottomRef}/>
//           </div>

//           {/* Footer */}
//           {done ? (
//             <div style={{ padding:"16px 20px", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
//               <div style={{ display:"flex", alignItems:"center", gap:12, borderRadius:12, padding:"12px 16px", marginBottom:12,
//                 background: score >= 75 ? "#f0fdf4" : "#fffbeb",
//                 border:     score >= 75 ? "1px solid #86efac" : "1px solid #fde68a" }}>
//                 <div style={{ width:40, height:40, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, flexShrink:0,
//                   background: score >= 75 ? "#22c55e" : "#f59e0b", color:"white" }}>
//                   {score}
//                 </div>
//                 <div>
//                   <p style={{ fontSize:13, fontWeight:800, color: score >= 75 ? "#166534" : "#92400e", margin:0 }}>
//                     Interview Complete! Score: {score}/100
//                   </p>
//                   <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>
//                     {score >= 90 ? "Exceptional — Expert tier unlocked!" :
//                      score >= 75 ? "Strong — Top Rated candidate!" :
//                      score >= 60 ? "Good — Rising Talent confirmed!" :
//                      "Keep improving — retry anytime!"}
//                   </p>
//                 </div>
//               </div>
//               <div style={{ display:"flex", gap:8 }}>
//                 <button onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"white", fontWeight:600, fontSize:13, cursor:"pointer", color:"#374151" }}>
//                   Back
//                 </button>
//                 <button onClick={() => onComplete(score)} style={{ flex:1, padding:"11px", borderRadius:12, background:"linear-gradient(135deg,#0D2855,#1B72C0)", color:"white", fontWeight:700, fontSize:13, border:"none", cursor:"pointer" }}>
//                   Continue →
//                 </button>
//               </div>
//             </div>
//           ) : (
//             <div style={{ padding:"16px 20px", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
//               <div style={{ display:"flex", gap:8 }}>
//                 <textarea className="chat-input" ref={inputRef} value={input}
//                   onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
//                   placeholder={loading ? "AI is typing..." : "Type your answer... (Enter to send)"}
//                   disabled={loading || done} rows={2} />
//                 <button className="send-btn" onClick={handleSend} disabled={!input.trim() || loading || done}>
//                   <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default function Step7_History({ onNext, onBack, currentStep = 7, totalSteps = 12 }) {
//   const [selectedMode, setSelectedMode]   = useState("text");
//   const [showModal, setShowModal]         = useState(false);
//   const [interviewDone, setInterviewDone] = useState(false);
//   const [interviewScore, setInterviewScore] = useState(null);

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const handleInterviewComplete = (score) => {
//     setInterviewScore(score);
//     setInterviewDone(true);
//     setShowModal(false);
//   };

//   const getInsights = () => {
//     const insights = [];
//     insights.push({ status: "tip", msg: "This step is optional but significantly boosts your trust score." });
//     if (interviewDone && interviewScore) {
//       insights.push({ status: "good", msg: `Interview complete! Score: ${interviewScore}/100` });
//       if (interviewScore >= 75) insights.push({ status: "good", msg: "Strong score — clients will see your interview badge!" });
//     }
//     return insights;
//   };
//   const insights = getInsights();

//   const scoringBars = [
//     { label:"Accuracy",   pct:40, color:"linear-gradient(135deg,#0D2855,#1B72C0)" },
//     { label:"Clarity",    pct:30, color:"#a855f7" },
//     { label:"Confidence", pct:30, color:"#22c55e" },
//   ];

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif; }
//         .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
//         .wbl-text-blue { color: #1B72C0; }
//         .wbl-btn-primary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color:#fff; border:none; cursor:pointer;
//           font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
//           box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
//         }
//         .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
//         .wbl-btn-secondary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
//           font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
//         }
//         .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
//         .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
//         .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
//         .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
//         .mode-btn { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:12px; border:2px solid #e5e7eb; background:white; cursor:pointer; font-size:13px; font-weight:600; color:#6b7280; transition:all .2s; }
//         .mode-btn.text-active  { border-color:#1B72C0; color:#1d4ed8; box-shadow:0 2px 8px rgba(27,114,192,0.12); }
//         .mode-btn.voice-active { border-color:#f97316; color:#ea580c; box-shadow:0 2px 8px rgba(249,115,22,0.12); }
//         .mode-btn:not(.text-active):not(.voice-active):hover { border-color:#93c5fd; }
//         .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
//         .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
//       `}</style>

//       <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

//         {showModal && (
//           <InterviewModal mode={selectedMode} onClose={() => setShowModal(false)} onComplete={handleInterviewComplete} />
//         )}
//  {/* Navbar */}
// <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//   <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
//   <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
//     <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//     </svg>
//     Save &amp; Exit
//   </button>
// </header>
//         {/* Step Progress */}
//         <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
//           <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
//             <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
//             <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
//           </div>
//           <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//             <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
//             <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
//             {stepLabels.map((label, i) => {
//               const isActive = i + 1 === currentStep;
//               const isDone   = i + 1 < currentStep;
//               return (
//                 <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
//                   <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
//                     style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
//                     {isDone ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i+1}
//                   </div>
//                   <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Layout */}
//         <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

//           {/* Main Card */}
//           <div style={{ flex:1, minWidth:0 }}>
//             <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

//               <div style={{ marginBottom:16 }}>
//                 <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #a855f7", color:"#9333ea", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
//                   AI Interview
//                 </span>
//               </div>
//               <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Talk to Our AI Interviewer</h1>
//               <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>5-minute adaptive conversation about your expertise</p>

//               {/* Completed banner */}
//               {interviewDone && interviewScore && (
//                 <div style={{ display:"flex", alignItems:"center", gap:12, background:"#f0fdf4", border:"1px solid #86efac", borderRadius:14, padding:"14px 16px", marginBottom:20 }}>
//                   <svg width="20" height="20" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0 }}>
//                     <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                   </svg>
//                   <div style={{ flex:1 }}>
//                     <p style={{ fontSize:13, fontWeight:800, color:"#166534", margin:0 }}>Interview Completed! Score: {interviewScore}/100</p>
//                     <p style={{ fontSize:12, color:"#16a34a", margin:0 }}>Your interview badge has been added to your profile.</p>
//                   </div>
//                   <button onClick={() => setShowModal(true)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:"#1B72C0" }}>View</button>
//                 </div>
//               )}

//               {/* Centre card */}
//               <div style={{ border:"1px solid #f0f0f0", borderRadius:16, background:"#f8fafc", padding:"40px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
//                 <div style={{ width:80, height:80, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
//                   <svg width="40" height="40" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth="1.5">
//                     <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
//                   </svg>
//                 </div>

//                 <h2 style={{ fontSize:18, fontWeight:800, color:"#1f2937", marginBottom:8 }}>AI Interview Assistant</h2>
//                 <p style={{ fontSize:13, color:"#6b7280", maxWidth:380, lineHeight:1.6, marginBottom:24 }}>
//                   I'll ask you practical questions about your expertise. Take your time — there are no trick questions. I want to understand how you think and work.
//                 </p>

//                 {/* Mode toggles */}
//                 <div style={{ display:"flex", gap:12, marginBottom:20 }}>
//                   <button className={`mode-btn ${selectedMode === "text" ? "text-active" : ""}`} onClick={() => setSelectedMode("text")}>
//                     <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
//                     </svg>
//                     Text Chat
//                   </button>
//                   <button className={`mode-btn ${selectedMode === "voice" ? "voice-active" : ""}`} onClick={() => setSelectedMode("voice")}>
//                     <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
//                     </svg>
//                     Voice <span style={{ fontWeight:400, fontSize:11, opacity:0.7 }}>(Recommended)</span>
//                   </button>
//                 </div>

//                 {/* Info bullets */}
//                 <div style={{ textAlign:"left", fontSize:12, color:"#6b7280", lineHeight:1.8, marginBottom:24 }}>
//                   <p style={{ margin:0 }}>• 8 adaptive questions (difficulty adjusts based on answers)</p>
//                   <p style={{ margin:0 }}>• Scoring: Accuracy (40%) · Clarity (30%) · Confidence (30%)</p>
//                   <p style={{ margin:0 }}>• Takes approximately 5-10 minutes</p>
//                 </div>

//                 {/* Start button */}
//                 <button className="wbl-btn-primary" onClick={() => setShowModal(true)}>
//                   {interviewDone ? "Retake Interview" : "Start Interview"}
//                   <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                   </svg>
//                 </button>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
//               <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
//               <button className="wbl-btn-primary" onClick={onNext}>
//                 {interviewDone ? "Continue to Rates" : "Skip Interview"}
//                 <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div style={{ width:280, flexShrink:0 }}>
//             <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

//               <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
//                 <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                   <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
//               </div>

//               <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                 {insights.map((insight, i) => (
//                   <div key={i} className={insight.status === "good" ? "insight-good" : "insight-tip"}
//                     style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
//                     {insight.status === "good" ? (
//                       <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                       </svg>
//                     ) : (
//                       <svg width="15" height="15" fill="none" stroke="#9333ea" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                       </svg>
//                     )}
//                     {insight.msg}
//                   </div>
//                 ))}
//               </div>

//               {/* Scoring breakdown */}
//               <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
//                 <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Interview scoring:</p>
//                 {scoringBars.map(s => (
//                   <div key={s.label} style={{ marginBottom:10 }}>
//                     <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:4 }}>
//                       <span>{s.label}</span>
//                       <span style={{ fontWeight:700 }}>{s.pct}%</span>
//                     </div>
//                     <div style={{ background:"#f3f4f6", borderRadius:99, height:5 }}>
//                       <div style={{ background:s.color, height:"100%", borderRadius:99, width:`${s.pct}%` }}/>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {!interviewDone && (
//                 <div style={{ marginTop:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12, padding:"10px 12px", fontSize:12, color:"#1d4ed8", fontWeight:600 }}>
//                   🎯 Completing interview can add up to +20 trust points.
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }








import { useState, useRef, useEffect } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const spinKeyframes = `@keyframes spin { from { transform:rotate(0deg); } to { transform:rotate(360deg); } }`;
const bounceKeyframes = `
  @keyframes bounce0 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  @keyframes bounce1 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
  @keyframes bounce2 { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-6px)} }
`;

function InterviewModal({ mode, onClose, onComplete }) {
  const [messages, setMessages]     = useState([]);
  const [input, setInput]           = useState("");
  const [loading, setLoading]       = useState(false);
  const [started, setStarted]       = useState(false);
  const [qCount, setQCount]         = useState(0);
  const [done, setDone]             = useState(false);
  const [score, setScore]           = useState(null);
  const bottomRef                   = useRef(null);
  const inputRef                    = useRef(null);
  const TOTAL_Q                     = 8;

  const SYSTEM_PROMPT = `You are an AI interview assistant for Weblance, a freelancing platform. Your job is to conduct a friendly but professional interview to assess a freelancer's expertise and experience.

Rules:
- Ask ONE question at a time. Never ask multiple questions in one message.
- Start with a warm greeting and your first question immediately.
- Ask exactly ${TOTAL_Q} questions total, adapting difficulty based on answers (easier if struggling, harder if strong).
- Questions should cover: years of experience, past projects, technical skills, problem-solving approach, client communication, handling difficult situations, tools/stack, and career goals.
- After each answer, give very brief (1 sentence) positive acknowledgment, then ask the next question.
- After the ${TOTAL_Q}th answer, give a brief conclusion (2-3 sentences max praising their responses), then output this exact JSON on a new line: {"interview_complete": true, "score": <number 60-95>}
- Keep responses concise and conversational.
- Never break character.`;

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior:"smooth" }); }, [messages]);

  useEffect(() => {
    if (!started) { setStarted(true); callClaude([], true); }
  }, []);

  const callClaude = async (history, isFirst = false) => {
    setLoading(true);
    try {
      const apiMessages = isFirst
        ? [{ role:"user", content:"Please start the interview now." }]
        : history.map(m => ({ role:m.role, content:m.content }));

      const res = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: { "Content-Type":"application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 1000,
          system: SYSTEM_PROMPT,
          messages: apiMessages,
        })
      });
      const data = await res.json();
      const text = data.content?.map(c => c.text || "").join("") || "";

      const jsonMatch = text.match(/\{"interview_complete":\s*true,\s*"score":\s*(\d+)\}/);
      if (jsonMatch) {
        const finalScore = parseInt(jsonMatch[1]);
        const cleanText  = text.replace(jsonMatch[0], "").trim();
        setMessages(prev => [...prev, { role:"assistant", content:cleanText }]);
        setScore(finalScore);
        setDone(true);
      } else {
        setMessages(prev => [...prev, { role:"assistant", content:text }]);
        if (!isFirst) setQCount(q => q + 1);
      }
    } catch {
      setMessages(prev => [...prev, { role:"assistant", content:"Sorry, I had a connection issue. Please try sending your message again." }]);
    }
    setLoading(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if (!trimmed || loading || done) return;
    const userMsg    = { role:"user", content:trimmed };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setInput("");
    await callClaude(newHistory);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const progressPct = Math.min(100, (qCount / TOTAL_Q) * 100);

  return (
    <>
      <style>{`
        ${spinKeyframes}
        ${bounceKeyframes}
        .bounce-dot-0 { animation: bounce0 1.2s ease-in-out 0s infinite; }
        .bounce-dot-1 { animation: bounce1 1.2s ease-in-out 0.15s infinite; }
        .bounce-dot-2 { animation: bounce2 1.2s ease-in-out 0.30s infinite; }
        .modal-overlay { position:fixed; inset:0; background:rgba(0,0,0,0.6); z-index:1000; display:flex; align-items:center; justify-content:center; padding:16px; }
        .modal-box { background:white; border-radius:20px; box-shadow:0 20px 60px rgba(0,0,0,0.25); width:100%; max-width:640px; display:flex; flex-direction:column; height:min(700px,90vh); overflow:hidden; }
        .msg-area { flex:1; overflow-y:auto; padding:20px; display:flex; flex-direction:column; gap:16px; }
        .msg-bubble-ai { background:#f8fafc; border:1px solid #e5e7eb; color:#1f2937; border-radius:16px 16px 16px 4px; padding:12px 16px; font-size:13px; line-height:1.6; max-width:80%; }
        .msg-bubble-user { background:linear-gradient(135deg,#0D2855,#1B72C0); color:white; border-radius:16px 16px 4px 16px; padding:12px 16px; font-size:13px; line-height:1.6; max-width:80%; }
        .chat-input { flex:1; border:1.5px solid #e5e7eb; border-radius:12px; padding:10px 14px; font-size:13px; outline:none; resize:none; background:#f8fafc; transition:border-color .2s; font-family:inherit; }
        .chat-input:focus { border-color:#1B72C0; }
        .chat-input:disabled { opacity:0.5; }
        .send-btn { width:40px; height:40px; border-radius:10px; background:linear-gradient(135deg,#0D2855,#1B72C0); border:none; cursor:pointer; display:flex; align-items:center; justify-content:center; flex-shrink:0; align-self:flex-end; transition:opacity .2s; }
        .send-btn:disabled { opacity:0.4; cursor:not-allowed; }
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }

        @media (max-width: 480px) {
          .modal-box { border-radius:16px; height:95vh; }
          .msg-area { padding:14px; }
          .msg-bubble-ai, .msg-bubble-user { max-width:90%; font-size:12px; }
        }
      `}</style>

      <div className="modal-overlay">
        <div className="modal-box">

          {/* Header */}
          <div style={{ display:"flex", alignItems:"center", gap:12, padding:"16px 20px", borderBottom:"1px solid #f0f0f0", flexShrink:0 }}>
            <div style={{ width:40, height:40, borderRadius:12, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
              <svg width="20" height="20" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
              </svg>
            </div>
            <div style={{ flex:1, minWidth:0 }}>
              <p style={{ fontWeight:800, fontSize:14, color:"#1f2937", margin:0 }}>AI Interview Assistant</p>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:4 }}>
                <div style={{ flex:1, background:"#f3f4f6", borderRadius:99, height:5, maxWidth:120 }}>
                  <div style={{ background:"#a855f7", height:"100%", borderRadius:99, width:`${progressPct}%`, transition:"width .5s" }}/>
                </div>
                <span style={{ fontSize:11, color:"#9ca3af" }}>{qCount}/{TOTAL_Q} questions</span>
              </div>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexShrink:0 }}>
              <span style={{ fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:100,
                background: mode === "voice" ? "#fff7ed" : "#eff6ff",
                color:      mode === "voice" ? "#ea580c"  : "#1B72C0",
                border:     mode === "voice" ? "1px solid #fed7aa" : "1px solid #bfdbfe" }}>
                {mode === "voice" ? "🎤 Voice" : "💬 Text"}
              </span>
              <button onClick={onClose} style={{ background:"none", border:"none", cursor:"pointer", color:"#9ca3af", padding:4, display:"flex" }}>
                <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Messages */}
          <div className="msg-area">
            {messages.map((msg, i) => (
              <div key={i} style={{ display:"flex", gap:10, flexDirection: msg.role === "user" ? "row-reverse" : "row" }}>
                {msg.role === "assistant" && (
                  <div style={{ width:32, height:32, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:2 }}>
                    <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
                    </svg>
                  </div>
                )}
                <div className={msg.role === "assistant" ? "msg-bubble-ai" : "msg-bubble-user"}>
                  {msg.content}
                </div>
              </div>
            ))}

            {loading && (
              <div style={{ display:"flex", gap:10, alignItems:"flex-end" }}>
                <div style={{ width:32, height:32, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
                  </svg>
                </div>
                <div style={{ background:"#f8fafc", border:"1px solid #e5e7eb", borderRadius:"16px 16px 16px 4px", padding:"12px 16px", display:"flex", gap:5, alignItems:"center" }}>
                  {[0,1,2].map(i => (
                    <div key={i} className={`bounce-dot-${i}`} style={{ width:8, height:8, borderRadius:"50%", background:"#9ca3af" }}/>
                  ))}
                </div>
              </div>
            )}
            <div ref={bottomRef}/>
          </div>

          {/* Footer */}
          {done ? (
            <div style={{ padding:"16px 20px", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
              <div style={{ display:"flex", alignItems:"center", gap:12, borderRadius:12, padding:"12px 16px", marginBottom:12,
                background: score >= 75 ? "#f0fdf4" : "#fffbeb",
                border:     score >= 75 ? "1px solid #86efac" : "1px solid #fde68a" }}>
                <div style={{ width:40, height:40, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontWeight:800, fontSize:13, flexShrink:0,
                  background: score >= 75 ? "#22c55e" : "#f59e0b", color:"white" }}>
                  {score}
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:800, color: score >= 75 ? "#166534" : "#92400e", margin:0 }}>
                    Interview Complete! Score: {score}/100
                  </p>
                  <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>
                    {score >= 90 ? "Exceptional — Expert tier unlocked!" :
                     score >= 75 ? "Strong — Top Rated candidate!" :
                     score >= 60 ? "Good — Rising Talent confirmed!" :
                     "Keep improving — retry anytime!"}
                  </p>
                </div>
              </div>
              <div style={{ display:"flex", gap:8 }}>
                <button onClick={onClose} style={{ flex:1, padding:"11px", borderRadius:12, border:"1.5px solid #e5e7eb", background:"white", fontWeight:600, fontSize:13, cursor:"pointer", color:"#374151" }}>
                  Back
                </button>
                <button onClick={() => onComplete(score)} style={{ flex:1, padding:"11px", borderRadius:12, background:"linear-gradient(135deg,#0D2855,#1B72C0)", color:"white", fontWeight:700, fontSize:13, border:"none", cursor:"pointer" }}>
                  Continue →
                </button>
              </div>
            </div>
          ) : (
            <div style={{ padding:"16px 20px", borderTop:"1px solid #f0f0f0", flexShrink:0 }}>
              <div style={{ display:"flex", gap:8 }}>
                <textarea className="chat-input" ref={inputRef} value={input}
                  onChange={e => setInput(e.target.value)} onKeyDown={handleKey}
                  placeholder={loading ? "AI is typing..." : "Type your answer... (Enter to send)"}
                  disabled={loading || done} rows={2} />
                <button className="send-btn" onClick={handleSend} disabled={!input.trim() || loading || done}>
                  <svg width="16" height="16" fill="none" stroke="white" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
                  </svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default function Step7_History({ onNext, onBack, currentStep = 7, totalSteps = 12 }) {
  const [selectedMode, setSelectedMode]   = useState("text");
  const [showModal, setShowModal]         = useState(false);
  const [interviewDone, setInterviewDone] = useState(false);
  const [interviewScore, setInterviewScore] = useState(null);

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const handleInterviewComplete = (score) => {
    setInterviewScore(score);
    setInterviewDone(true);
    setShowModal(false);
  };

  const getInsights = () => {
    const insights = [];
    insights.push({ status: "tip", msg: "This step is optional but significantly boosts your trust score." });
    if (interviewDone && interviewScore) {
      insights.push({ status: "good", msg: `Interview complete! Score: ${interviewScore}/100` });
      if (interviewScore >= 75) insights.push({ status: "good", msg: "Strong score — clients will see your interview badge!" });
    }
    return insights;
  };
  const insights = getInsights();

  const scoringBars = [
    { label:"Accuracy",   pct:40, color:"linear-gradient(135deg,#0D2855,#1B72C0)" },
    { label:"Clarity",    pct:30, color:"#a855f7" },
    { label:"Confidence", pct:30, color:"#22c55e" },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing:border-box; }
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
        .mode-btn { display:flex; align-items:center; gap:8px; padding:10px 20px; border-radius:12px; border:2px solid #e5e7eb; background:white; cursor:pointer; font-size:13px; font-weight:600; color:#6b7280; transition:all .2s; }
        .mode-btn.text-active  { border-color:#1B72C0; color:#1d4ed8; box-shadow:0 2px 8px rgba(27,114,192,0.12); }
        .mode-btn.voice-active { border-color:#f97316; color:#ea580c; box-shadow:0 2px 8px rgba(249,115,22,0.12); }
        .mode-btn:not(.text-active):not(.voice-active):hover { border-color:#93c5fd; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }

        /* Responsive */
        .main-layout { display:flex; gap:24px; align-items:flex-start; }
        .main-col { flex:1; min-width:0; }
        .sidebar-col { width:280px; flex-shrink:0; }

        @media (max-width: 900px) {
          .main-layout { flex-direction:column; }
          .sidebar-col { width:100%; }
          .sidebar-inner { position:static !important; }
        }

        @media (max-width: 640px) {
          .main-card { padding:20px !important; }
          .wbl-btn-primary { padding:11px 18px; font-size:13px; }
          .wbl-btn-secondary { padding:11px 16px; font-size:13px; }
          .page-title { font-size:20px !important; }
          .mode-row { gap:8px; }
          .mode-btn { padding:9px 14px; font-size:12px; }
          .step-label-text { display:none !important; }
          .nav-row { gap:10px; }
        }

        @media (max-width: 480px) {
          .page-wrapper { padding:0 14px !important; }
          .progress-wrapper { padding:0 14px !important; margin-top:20px !important; }
          .header-inner { padding:10px 14px !important; }
          .center-card { padding:24px 16px !important; }
          .mode-row { flex-wrap:wrap; justify-content:center; }
        }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

        {showModal && (
          <InterviewModal mode={selectedMode} onClose={() => setShowModal(false)} onComplete={handleInterviewComplete} />
        )}

        {/* Navbar */}
        <header className="header-inner" style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
          <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save &amp; Exit
          </button>
        </header>

        {/* Step Progress */}
        <div className="progress-wrapper" style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
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
                  <span className="step-label-text" style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="main-layout page-wrapper" style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>

          {/* Main Card */}
          <div className="main-col">
            <div className="main-card" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #a855f7", color:"#9333ea", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  AI Interview
                </span>
              </div>
              <h1 className="page-title" style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Talk to Our AI Interviewer</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>5-minute adaptive conversation about your expertise</p>

              {/* Completed banner */}
              {interviewDone && interviewScore && (
                <div style={{ display:"flex", alignItems:"center", gap:12, background:"#f0fdf4", border:"1px solid #86efac", borderRadius:14, padding:"14px 16px", marginBottom:20 }}>
                  <svg width="20" height="20" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0 }}>
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                  </svg>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:800, color:"#166534", margin:0 }}>Interview Completed! Score: {interviewScore}/100</p>
                    <p style={{ fontSize:12, color:"#16a34a", margin:0 }}>Your interview badge has been added to your profile.</p>
                  </div>
                  <button onClick={() => setShowModal(true)} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:"#1B72C0" }}>View</button>
                </div>
              )}

              {/* Centre card */}
              <div className="center-card" style={{ border:"1px solid #f0f0f0", borderRadius:16, background:"#f8fafc", padding:"40px 24px", display:"flex", flexDirection:"column", alignItems:"center", textAlign:"center" }}>
                <div style={{ width:80, height:80, borderRadius:"50%", background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", marginBottom:20 }}>
                  <svg width="40" height="40" fill="none" stroke="#a855f7" viewBox="0 0 24 24" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17H3a2 2 0 01-2-2V5a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2"/>
                  </svg>
                </div>

                <h2 style={{ fontSize:18, fontWeight:800, color:"#1f2937", marginBottom:8 }}>AI Interview Assistant</h2>
                <p style={{ fontSize:13, color:"#6b7280", maxWidth:380, lineHeight:1.6, marginBottom:24 }}>
                  I'll ask you practical questions about your expertise. Take your time — there are no trick questions. I want to understand how you think and work.
                </p>

                {/* Mode toggles */}
                <div className="mode-row" style={{ display:"flex", gap:12, marginBottom:20 }}>
                  <button className={`mode-btn ${selectedMode === "text" ? "text-active" : ""}`} onClick={() => setSelectedMode("text")}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                    Text Chat
                  </button>
                  <button className={`mode-btn ${selectedMode === "voice" ? "voice-active" : ""}`} onClick={() => setSelectedMode("voice")}>
                    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/>
                    </svg>
                    Voice <span style={{ fontWeight:400, fontSize:11, opacity:0.7 }}>(Recommended)</span>
                  </button>
                </div>

                {/* Info bullets */}
                <div style={{ textAlign:"left", fontSize:12, color:"#6b7280", lineHeight:1.8, marginBottom:24 }}>
                  <p style={{ margin:0 }}>• 8 adaptive questions (difficulty adjusts based on answers)</p>
                  <p style={{ margin:0 }}>• Scoring: Accuracy (40%) · Clarity (30%) · Confidence (30%)</p>
                  <p style={{ margin:0 }}>• Takes approximately 5-10 minutes</p>
                </div>

                {/* Start button */}
                <button className="wbl-btn-primary" onClick={() => setShowModal(true)}>
                  {interviewDone ? "Retake Interview" : "Start Interview"}
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </div>
            </div>

            {/* Navigation */}
            <div className="nav-row" style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="wbl-btn-primary" onClick={onNext}>
                {interviewDone ? "Continue to Rates" : "Skip Interview"}
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-col">
            <div className="sidebar-inner" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

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
                  <div key={i} className={insight.status === "good" ? "insight-good" : "insight-tip"}
                    style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                    {insight.status === "good" ? (
                      <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
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

              {/* Scoring breakdown */}
              <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Interview scoring:</p>
                {scoringBars.map(s => (
                  <div key={s.label} style={{ marginBottom:10 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:4 }}>
                      <span>{s.label}</span>
                      <span style={{ fontWeight:700 }}>{s.pct}%</span>
                    </div>
                    <div style={{ background:"#f3f4f6", borderRadius:99, height:5 }}>
                      <div style={{ background:s.color, height:"100%", borderRadius:99, width:`${s.pct}%` }}/>
                    </div>
                  </div>
                ))}
              </div>

              {!interviewDone && (
                <div style={{ marginTop:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12, padding:"10px 12px", fontSize:12, color:"#1d4ed8", fontWeight:600 }}>
                  🎯 Completing interview can add up to +20 trust points.
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}