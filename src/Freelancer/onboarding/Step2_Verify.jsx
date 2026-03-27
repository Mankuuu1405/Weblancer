


// import { useState } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// export default function Step2_Verify({ onNext, onBack, currentStep = 2, totalSteps = 12 }) {
//   const [emailVerified, setEmailVerified] = useState(false);
//   const [phone, setPhone]                 = useState("");
//   const [codeSent, setCodeSent]           = useState(false);
//   const [code, setCode]                   = useState("");
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [codeError, setCodeError]         = useState("");

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const getInsights = () => {
//     const insights = [];
//     if (emailVerified) insights.push({ status: "good", msg: "Email verified successfully." });
//     if (phone.length >= 10 && !codeSent) insights.push({ status: "good", msg: "Phone number looks valid." });
//     if (codeSent && !phoneVerified) insights.push({ status: "warn", msg: "Enter the 6-digit code sent to your phone." });
//     if (phoneVerified) insights.push({ status: "good", msg: "Phone verified! Identity confirmed." });
//     if (emailVerified && phoneVerified) insights.push({ status: "good", msg: "Both verified — you're ready to continue!" });
//     return insights;
//   };

//   const insights = getInsights();

//   const handleSendCode = () => {
//     if (phone.length >= 6) { setCodeSent(true); setCodeError(""); }
//   };

//   const handleVerifyCode = () => {
//     if (code.length === 6) { setPhoneVerified(true); setCodeError(""); }
//     else setCodeError("Please enter the complete 6-digit code.");
//   };

//   const verifyPercent = emailVerified && phoneVerified ? 100 : emailVerified || phoneVerified ? 50 : 0;

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
//           font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px;
//           transition:all .2s;
//         }
//         .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
//         .wbl-btn-small {
//           display:inline-flex; align-items:center; justify-content:center; gap:6px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color:#fff; border:none; cursor:pointer;
//           font-weight:600; border-radius:10px; padding:10px 16px; font-size:13px;
//           transition:all .2s; width:100%;
//         }
//         .wbl-btn-small:disabled { opacity:0.4; cursor:not-allowed; transform:none; }
//         .wbl-btn-small:not(:disabled):hover { opacity:0.9; }
//         .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
//         .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
//         .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
//         .verify-card { background:white; border:1.5px solid #e5e7eb; border-radius:16px; padding:20px; transition:border-color .2s; }
//         .verify-card.verified { border-color:#22c55e; background:#f0fdf4; }
//         .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
//         .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
//         .code-input {
//           width:100%; border:2px solid #60a5fa; border-radius:12px;
//           padding:10px; font-size:20px; text-align:center; letter-spacing:0.6em;
//           font-weight:800; outline:none; background:#eff6ff; box-sizing:border-box;
//           transition:border-color .2s;
//         }
//         .code-input:focus { border-color:#1B72C0; background:#dbeafe; }
//       `}</style>

//       <div className="min-h-screen pb-20" style={{ background: "#F4F9FF" }}>

//       {/* Navbar */}
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
//                     {isDone
//                       ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
//                       : i + 1}
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

//               <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Verify Your Identity</h1>
//               <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>Email &amp; phone verification builds trust with clients</p>

//               {/* Verification Cards */}
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:24 }}>

//                 {/* Email Card */}
//                 <div className={`verify-card ${emailVerified ? "verified" : ""}`}>
//                   <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
//                     <div style={{ width:32, height:32, borderRadius:8, background: emailVerified ? "#dcfce7" : "#eff6ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                       <svg width="16" height="16" fill="none" stroke={emailVerified ? "#16a34a" : "#60a5fa"} viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
//                       </svg>
//                     </div>
//                     <span style={{ fontWeight:700, fontSize:13, color:"#1f2937" }}>Email Verification</span>
//                   </div>

//                   {emailVerified ? (
//                     <div style={{ display:"flex", alignItems:"center", gap:6, color:"#16a34a", fontWeight:700, fontSize:13, marginTop:8 }}>
//                       <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                       </svg>
//                       Email Verified ✓
//                     </div>
//                   ) : (
//                     <>
//                       <p style={{ fontSize:12, color:"#64748b", marginBottom:14 }}>We sent a verification link to your email address.</p>
//                       <button onClick={() => setEmailVerified(true)}
//                         style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:10, border:"1.5px solid #e5e7eb", fontSize:12, fontWeight:600, background:"white", cursor:"pointer", color:"#374151", transition:"all .2s" }}
//                         onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
//                         onMouseLeave={e => e.currentTarget.style.background = "white"}>
//                         <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
//                         </svg>
//                         Simulate Verify
//                       </button>
//                     </>
//                   )}
//                 </div>

//                 {/* Phone Card */}
//                 <div className={`verify-card ${phoneVerified ? "verified" : ""}`}>
//                   <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
//                     <div style={{ width:32, height:32, borderRadius:8, background: phoneVerified ? "#dcfce7" : "#eff6ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
//                       <svg width="16" height="16" fill="none" stroke={phoneVerified ? "#16a34a" : "#60a5fa"} viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
//                       </svg>
//                     </div>
//                     <span style={{ fontWeight:700, fontSize:13, color:"#1f2937" }}>Phone Verification</span>
//                   </div>

//                   {phoneVerified ? (
//                     <div style={{ display:"flex", alignItems:"center", gap:6, color:"#16a34a", fontWeight:700, fontSize:13, marginTop:8 }}>
//                       <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
//                       </svg>
//                       Phone Verified ✓
//                     </div>
//                   ) : (
//                     <>
//                       <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6 }}>
//                         Phone Number <span style={{color:"#ef4444"}}>*</span>
//                       </label>
//                       <input type="tel" placeholder="+1 (555) 000-0000" value={phone}
//                         onChange={e => { setPhone(e.target.value); setCodeSent(false); setCode(""); }}
//                         style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"9px 12px", fontSize:13, outline:"none", marginBottom:10, boxSizing:"border-box", transition:"border-color .2s", background:"#f8fafc" }}
//                         onFocus={e => e.target.style.borderColor = "#1B72C0"}
//                         onBlur={e => e.target.style.borderColor = "#e5e7eb"} />

//                       {!codeSent && (
//                         <button className="wbl-btn-small" onClick={handleSendCode} disabled={phone.length < 6}>
//                           Send Verification Code
//                         </button>
//                       )}

//                       {codeSent && (
//                         <>
//                           <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6 }}>
//                             Enter 6-digit code
//                           </label>
//                           <input type="text" inputMode="numeric" maxLength={6} placeholder="_ _ _ _ _ _"
//                             value={code}
//                             onChange={e => { setCode(e.target.value.replace(/\D/g,"")); setCodeError(""); }}
//                             className="code-input" style={{ marginBottom: codeError ? 6 : 10 }} />
//                           {codeError && <p style={{ color:"#ef4444", fontSize:11, marginBottom:8 }}>{codeError}</p>}
//                           <div style={{ display:"flex", gap:8 }}>
//                             <button className="wbl-btn-small" onClick={handleVerifyCode} style={{ flex:1 }}>
//                               Verify Code
//                             </button>
//                             <button onClick={() => { setCodeSent(false); setCode(""); setCodeError(""); }}
//                               style={{ padding:"9px 12px", borderRadius:10, border:"1.5px solid #e5e7eb", fontSize:12, fontWeight:600, background:"white", cursor:"pointer", color:"#6b7280", flexShrink:0 }}>
//                               Resend
//                             </button>
//                           </div>
//                         </>
//                       )}
//                     </>
//                   )}
//                 </div>
//               </div>

//               {/* Why we verify */}
//               <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:14, padding:"16px 20px", marginBottom:24 }}>
//                 <p style={{ fontSize:13, fontWeight:700, color:"#1e40af", marginBottom:10 }}>Why we verify:</p>
//                 <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                   {["Prevent fake accounts", "Enable important notifications", "Required for secure payments"].map((item, i) => (
//                     <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#1d4ed8" }}>
//                       <span style={{ color:"#1B72C0", fontWeight:800, fontSize:15 }}>✓</span> {item}
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust badge */}
//               <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:16 }}>
//                 <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", color:"#94a3b8", textTransform:"uppercase" }}>
//                   🔒 Account Trust: Identity Verified
//                 </span>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
//               <button className="wbl-btn-secondary" onClick={onBack}>
//                 ← Back
//               </button>
//               <button className="wbl-btn-primary" onClick={onNext}>
//                 Continue to Profile Setup
//                 <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* AI Insights Sidebar */}
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

//               {insights.length === 0 ? (
//                 <div style={{ textAlign:"center", padding:"24px 8px", color:"#94a3b8", fontSize:12 }}>
//                   <svg width="32" height="32" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ margin:"0 auto 8px", display:"block" }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                   Verify your email or phone to see AI feedback.
//                 </div>
//               ) : (
//                 <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                   {insights.map((insight, i) => (
//                     <div key={i} className={insight.status === "good" ? "insight-good" : "insight-warn"}
//                       style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
//                       {insight.status === "good" ? (
//                         <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                       ) : (
//                         <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                         </svg>
//                       )}
//                       {insight.msg}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {insights.length > 0 && (
//                 <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
//                   <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:6 }}>
//                     <span>Verification progress</span>
//                     <span className="wbl-text-blue" style={{ fontWeight:800 }}>{verifyPercent}%</span>
//                   </div>
//                   <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
//                     <div className="wbl-gradient" style={{ width:`${verifyPercent}%`, height:"100%", borderRadius:100, transition:"width .5s ease" }} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }








import { useState } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

export default function Step2_Verify({ onNext, onBack, currentStep = 2, totalSteps = 12 }) {
  const [emailVerified, setEmailVerified] = useState(false);
  const [phone, setPhone]                 = useState("");
  const [codeSent, setCodeSent]           = useState(false);
  const [code, setCode]                   = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [codeError, setCodeError]         = useState("");

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const getInsights = () => {
    const insights = [];
    if (emailVerified) insights.push({ status: "good", msg: "Email verified successfully." });
    if (phone.length >= 10 && !codeSent) insights.push({ status: "good", msg: "Phone number looks valid." });
    if (codeSent && !phoneVerified) insights.push({ status: "warn", msg: "Enter the 6-digit code sent to your phone." });
    if (phoneVerified) insights.push({ status: "good", msg: "Phone verified! Identity confirmed." });
    if (emailVerified && phoneVerified) insights.push({ status: "good", msg: "Both verified — you're ready to continue!" });
    return insights;
  };

  const insights = getInsights();

  const handleSendCode = () => {
    if (phone.length >= 6) { setCodeSent(true); setCodeError(""); }
  };

  const handleVerifyCode = () => {
    if (code.length === 6) { setPhoneVerified(true); setCodeError(""); }
    else setCodeError("Please enter the complete 6-digit code.");
  };

  const verifyPercent = emailVerified && phoneVerified ? 100 : emailVerified || phoneVerified ? 50 : 0;

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
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px;
          transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }

        .wbl-btn-small {
          display:inline-flex; align-items:center; justify-content:center; gap:6px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:600; border-radius:10px; padding:10px 16px; font-size:13px;
          transition:all .2s; width:100%;
        }
        .wbl-btn-small:disabled { opacity:0.4; cursor:not-allowed; transform:none; }
        .wbl-btn-small:not(:disabled):hover { opacity:0.9; }

        .step-done   { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }

        .verify-card { background:white; border:1.5px solid #e5e7eb; border-radius:16px; padding:20px; transition:border-color .2s; }
        .verify-card.verified { border-color:#22c55e; background:#f0fdf4; }

        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }

        .code-input {
          width:100%; border:2px solid #60a5fa; border-radius:12px;
          padding:10px; font-size:20px; text-align:center; letter-spacing:0.6em;
          font-weight:800; outline:none; background:#eff6ff; box-sizing:border-box;
          transition:border-color .2s;
        }
        .code-input:focus { border-color:#1B72C0; background:#dbeafe; }

        /* ── Step progress ── */
        .step-progress-wrap {
          position:relative; display:flex; align-items:flex-start;
          justify-content:space-between; overflow-x:auto;
          padding-bottom:4px;
        }
        .step-dot-wrap {
          display:flex; flex-direction:column; align-items:center;
          z-index:10; position:relative; flex-shrink:0;
        }
        .step-label {
          font-size:10px; margin-top:5px; font-weight:600;
        }

        /* ── Layout ── */
        .wbl-layout {
          max-width:1100px; margin:0 auto; padding:0 24px;
          display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap;
        }
        .wbl-main  { flex:1; min-width:0; }
        .wbl-sidebar { width:280px; flex-shrink:0; }

        /* ── Verify cards grid ── */
        .verify-grid {
          display:grid; grid-template-columns:1fr 1fr; gap:16px; margin-bottom:24px;
        }

        /* ── Nav row ── */
        .nav-row {
          display:flex; justify-content:space-between; margin-top:20px;
        }

        /* ────────────────────────────
           RESPONSIVE
        ──────────────────────────── */
        @media (max-width: 900px) {
          .wbl-sidebar { width:100%; }
        }

        @media (max-width: 640px) {
          /* Header */
          .wbl-header-img { height:36px !important; }
          .wbl-header-btn { padding:6px 12px !important; font-size:12px !important; }

          /* Progress section */
          .wbl-progress-section { padding:0 16px !important; margin-top:20px !important; }
          .step-dot-wrap .step-label { display:none; }
          .step-progress-wrap { gap:0; }

          /* Layout */
          .wbl-layout { padding:0 16px; gap:16px; }

          /* Main card */
          .wbl-main-card { padding:20px !important; }

          /* Verify grid → 1 col */
          .verify-grid { grid-template-columns:1fr; }

          /* Nav buttons → full width */
          .nav-row { flex-direction:column-reverse; gap:10px; }
          .nav-row .wbl-btn-primary,
          .nav-row .wbl-btn-secondary { width:100%; justify-content:center; }

          /* Typography */
          .wbl-main-card h1 { font-size:20px !important; }
        }

        @media (max-width: 400px) {
          .step-dot-wrap { min-width:18px; }
          .step-done, .step-active, .step-inactive {
            width:22px !important; height:22px !important; font-size:9px !important;
          }
        }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background: "#F4F9FF" }}>

        {/* Navbar */}
        <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img className="wbl-header-img" src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
          <button className="wbl-btn-secondary wbl-header-btn" style={{ padding:"8px 18px", fontSize:13 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save &amp; Exit
          </button>
        </header>

        {/* Step Progress */}
        <div className="wbl-progress-section" style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div className="step-progress-wrap">
            <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
            <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} className="step-dot-wrap">
                  <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
                    {isDone
                      ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      : i + 1}
                  </div>
                  <span className="step-label" style={{ color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="wbl-layout">

          {/* Main Card */}
          <div className="wbl-main">
            <div className="wbl-main-card" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Verify Your Identity</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>Email &amp; phone verification builds trust with clients</p>

              {/* Verification Cards */}
              <div className="verify-grid">

                {/* Email Card */}
                <div className={`verify-card ${emailVerified ? "verified" : ""}`}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background: emailVerified ? "#dcfce7" : "#eff6ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="16" height="16" fill="none" stroke={emailVerified ? "#16a34a" : "#60a5fa"} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                      </svg>
                    </div>
                    <span style={{ fontWeight:700, fontSize:13, color:"#1f2937" }}>Email Verification</span>
                  </div>

                  {emailVerified ? (
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:"#16a34a", fontWeight:700, fontSize:13, marginTop:8 }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Email Verified ✓
                    </div>
                  ) : (
                    <>
                      <p style={{ fontSize:12, color:"#64748b", marginBottom:14 }}>We sent a verification link to your email address.</p>
                      <button onClick={() => setEmailVerified(true)}
                        style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", borderRadius:10, border:"1.5px solid #e5e7eb", fontSize:12, fontWeight:600, background:"white", cursor:"pointer", color:"#374151", transition:"all .2s" }}
                        onMouseEnter={e => e.currentTarget.style.background = "#f9fafb"}
                        onMouseLeave={e => e.currentTarget.style.background = "white"}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Simulate Verify
                      </button>
                    </>
                  )}
                </div>

                {/* Phone Card */}
                <div className={`verify-card ${phoneVerified ? "verified" : ""}`}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <div style={{ width:32, height:32, borderRadius:8, background: phoneVerified ? "#dcfce7" : "#eff6ff", display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <svg width="16" height="16" fill="none" stroke={phoneVerified ? "#16a34a" : "#60a5fa"} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                      </svg>
                    </div>
                    <span style={{ fontWeight:700, fontSize:13, color:"#1f2937" }}>Phone Verification</span>
                  </div>

                  {phoneVerified ? (
                    <div style={{ display:"flex", alignItems:"center", gap:6, color:"#16a34a", fontWeight:700, fontSize:13, marginTop:8 }}>
                      <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Phone Verified ✓
                    </div>
                  ) : (
                    <>
                      <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6 }}>
                        Phone Number <span style={{color:"#ef4444"}}>*</span>
                      </label>
                      <input type="tel" placeholder="+1 (555) 000-0000" value={phone}
                        onChange={e => { setPhone(e.target.value); setCodeSent(false); setCode(""); }}
                        style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:10, padding:"9px 12px", fontSize:13, outline:"none", marginBottom:10, boxSizing:"border-box", transition:"border-color .2s", background:"#f8fafc" }}
                        onFocus={e => e.target.style.borderColor = "#1B72C0"}
                        onBlur={e => e.target.style.borderColor = "#e5e7eb"} />

                      {!codeSent && (
                        <button className="wbl-btn-small" onClick={handleSendCode} disabled={phone.length < 6}>
                          Send Verification Code
                        </button>
                      )}

                      {codeSent && (
                        <>
                          <label style={{ display:"block", fontSize:11, fontWeight:700, color:"#374151", marginBottom:6 }}>
                            Enter 6-digit code
                          </label>
                          <input type="text" inputMode="numeric" maxLength={6} placeholder="_ _ _ _ _ _"
                            value={code}
                            onChange={e => { setCode(e.target.value.replace(/\D/g,"")); setCodeError(""); }}
                            className="code-input" style={{ marginBottom: codeError ? 6 : 10 }} />
                          {codeError && <p style={{ color:"#ef4444", fontSize:11, marginBottom:8 }}>{codeError}</p>}
                          <div style={{ display:"flex", gap:8 }}>
                            <button className="wbl-btn-small" onClick={handleVerifyCode} style={{ flex:1 }}>
                              Verify Code
                            </button>
                            <button onClick={() => { setCodeSent(false); setCode(""); setCodeError(""); }}
                              style={{ padding:"9px 12px", borderRadius:10, border:"1.5px solid #e5e7eb", fontSize:12, fontWeight:600, background:"white", cursor:"pointer", color:"#6b7280", flexShrink:0 }}>
                              Resend
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Why we verify */}
              <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:14, padding:"16px 20px", marginBottom:24 }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#1e40af", marginBottom:10 }}>Why we verify:</p>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {["Prevent fake accounts", "Enable important notifications", "Required for secure payments"].map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#1d4ed8" }}>
                      <span style={{ color:"#1B72C0", fontWeight:800, fontSize:15 }}>✓</span> {item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust badge */}
              <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:16 }}>
                <span style={{ fontSize:11, fontWeight:800, letterSpacing:"0.08em", color:"#94a3b8", textTransform:"uppercase" }}>
                  🔒 Account Trust: Identity Verified
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="nav-row">
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="wbl-btn-primary" onClick={onNext}>
                Continue to Profile Setup
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* AI Insights Sidebar */}
          <div className="wbl-sidebar">
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              {insights.length === 0 ? (
                <div style={{ textAlign:"center", padding:"24px 8px", color:"#94a3b8", fontSize:12 }}>
                  <svg width="32" height="32" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ margin:"0 auto 8px", display:"block" }}>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  Verify your email or phone to see AI feedback.
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {insights.map((insight, i) => (
                    <div key={i} className={insight.status === "good" ? "insight-good" : "insight-warn"}
                      style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                      {insight.status === "good" ? (
                        <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {insight.msg}
                    </div>
                  ))}
                </div>
              )}

              {insights.length > 0 && (
                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:6 }}>
                    <span>Verification progress</span>
                    <span className="wbl-text-blue" style={{ fontWeight:800 }}>{verifyPercent}%</span>
                  </div>
                  <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
                    <div className="wbl-gradient" style={{ width:`${verifyPercent}%`, height:"100%", borderRadius:100, transition:"width .5s ease" }} />
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