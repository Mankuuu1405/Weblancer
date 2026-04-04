// import { useState, useEffect, useRef } from "react";

// const COUNTRY_CODES = [
//   { code: "+1",  flag: "🇺🇸", country: "US" },
//   { code: "+44", flag: "🇬🇧", country: "UK" },
//   { code: "+91", flag: "🇮🇳", country: "IN" },
//   { code: "+61", flag: "🇦🇺", country: "AU" },
//   { code: "+49", flag: "🇩🇪", country: "DE" },
//   { code: "+33", flag: "🇫🇷", country: "FR" },
//   { code: "+81", flag: "🇯🇵", country: "JP" },
//   { code: "+86", flag: "🇨🇳", country: "CN" },
//   { code: "+55", flag: "🇧🇷", country: "BR" },
//   { code: "+971",flag: "🇦🇪", country: "AE" },
// ];

// export default function VerifyStep({ formData, updateData, next, prev }) {
//   /* ── Email verify state ── */
//   const [emailVerified, setEmailVerified] = useState(false);

//   /* ── Phone state ── */
//   const [countryCode, setCountryCode] = useState("+1");
//   const [phone, setPhone]             = useState("");
//   const [codeSent, setCodeSent]       = useState(false);
//   const [otp, setOtp]                 = useState(["", "", "", "", "", ""]);
//   const [phoneVerified, setPhoneVerified] = useState(false);
//   const [resendTimer, setResendTimer] = useState(0);
//   const otpRefs = useRef([]);

//   /* ── Resend countdown ── */
//   useEffect(() => {
//     if (resendTimer <= 0) return;
//     const t = setTimeout(() => setResendTimer(s => s - 1), 1000);
//     return () => clearTimeout(t);
//   }, [resendTimer]);

//   /* ── Send OTP ── */
//   const handleSend = () => {
//     if (!phone) return;
//     setCodeSent(true);
//     setResendTimer(60);
//     setOtp(["", "", "", "", "", ""]);
//     setPhoneVerified(false);
//   };

//   /* ── OTP input change ── */
//   const handleOtpChange = (i, val) => {
//     if (!/^\d?$/.test(val)) return;
//     const next_ = [...otp];
//     next_[i] = val;
//     setOtp(next_);
//     if (val && i < 5) otpRefs.current[i + 1]?.focus();
//     // Auto-verify when all 6 digits filled
//     if (next_.every(d => d !== "") && next_.join("").length === 6) {
//       setTimeout(() => setPhoneVerified(true), 300);
//     }
//   };

//   const handleOtpKey = (i, e) => {
//     if (e.key === "Backspace" && !otp[i] && i > 0) {
//       otpRefs.current[i - 1]?.focus();
//     }
//   };

//   const canContinue = emailVerified || phoneVerified;

//   const handleNext = () => {
//     updateData({ emailVerified, phoneVerified, phone: `${countryCode}${phone}` });
//     next();
//   };

//   return (
//     <>
//       {/* ── Two-column wrapper ── */}
//       <div className="flex gap-6 items-start">

//         {/* ══ LEFT: Main card ════════════════════════════════ */}
//         <div className="flex-1 min-w-0">
//           <div className="rounded-2xl p-8 sm:p-10"
//                style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

//             <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
//               Verify Your Identity
//             </h1>
//             <p className="text-sm mb-6" style={{ color: "#64748b" }}>
//               Quick verification to secure your account
//             </p>

//             {/* Badge */}
//             <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
//                   style={{ backgroundColor: "#e0e7ff", color: "#3b5bdb", border: "1px solid #a5b4fc" }}>
//               Verification
//             </span>

//             {/* ── Two verification cards ── */}
//             <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

//               {/* Email Verification */}
//               <div className="rounded-xl p-6 flex flex-col gap-4"
//                    style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                        style={{ backgroundColor: "#e0e7ff" }}>
//                     <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//                       <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                             strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm" style={{ color: "#1e293b" }}>Email Verification</div>
//                     <div className="text-xs" style={{ color: "#94a3b8" }}>Check your inbox for a link</div>
//                   </div>
//                 </div>

//                 {emailVerified ? (
//                   <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
//                        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a" }}>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Email Verified ✓
//                   </div>
//                 ) : (
//                   <>
//                     <p className="text-sm" style={{ color: "#475569" }}>
//                       We sent a verification link to{" "}
//                       <span className="font-bold" style={{ color: "#1e293b" }}>
//                         {formData?.email || "your@email.com"}
//                       </span>
//                     </p>
//                     <button
//                       onClick={() => setEmailVerified(true)}
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-fit transition-all"
//                       style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#374151" }}
//                       onMouseOver={e => e.currentTarget.style.borderColor = "#3b5bdb"}
//                       onMouseOut={e  => e.currentTarget.style.borderColor = "#e2e8f0"}
//                     >
//                       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                               strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                       </svg>
//                       Simulate Verify
//                     </button>
//                     <p className="text-xs" style={{ color: "#94a3b8" }}>
//                       Didn't receive it? Check spam folder or resend.
//                     </p>
//                   </>
//                 )}
//               </div>

//               {/* Phone Verification */}
//               <div className="rounded-xl p-6 flex flex-col gap-4"
//                    style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//                 <div className="flex items-center gap-3">
//                   <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
//                        style={{ backgroundColor: "#e0e7ff" }}>
//                     <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//                       <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                             strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                   </div>
//                   <div>
//                     <div className="font-bold text-sm" style={{ color: "#1e293b" }}>Phone Verification</div>
//                     <div className="text-xs" style={{ color: "#94a3b8" }}>Verify via SMS or WhatsApp</div>
//                   </div>
//                 </div>

//                 {phoneVerified ? (
//                   <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
//                        style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#16a34a" }}>
//                     <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
//                             strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                     </svg>
//                     Phone Verified ✓
//                   </div>
//                 ) : (
//                   <>
//                     {/* Phone input row */}
//                     <div className="flex gap-2">
//                       <select
//                         value={countryCode}
//                         onChange={e => setCountryCode(e.target.value)}
//                         className="px-2 py-3 rounded-xl text-sm outline-none appearance-none"
//                         style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#1e293b", width: "80px" }}
//                       >
//                         {COUNTRY_CODES.map(c => (
//                           <option key={c.code} value={c.code}>{c.code}</option>
//                         ))}
//                       </select>
//                       <input
//                         type="tel"
//                         placeholder="Phone number"
//                         value={phone}
//                         onChange={e => setPhone(e.target.value.replace(/\D/g, ""))}
//                         className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
//                         style={{ border: "1px solid #e2e8f0", backgroundColor: "white", color: "#1e293b" }}
//                       />
//                     </div>

//                     {/* OTP boxes (show after send) */}
//                     {codeSent && (
//                       <div className="flex gap-2 justify-between">
//                         {otp.map((digit, i) => (
//                           <input
//                             key={i}
//                             ref={el => otpRefs.current[i] = el}
//                             type="text"
//                             inputMode="numeric"
//                             maxLength={1}
//                             value={digit}
//                             onChange={e => handleOtpChange(i, e.target.value)}
//                             onKeyDown={e => handleOtpKey(i, e)}
//                             className="w-full aspect-square rounded-xl text-center text-base font-bold outline-none transition-all"
//                             style={{
//                               border: digit ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
//                               backgroundColor: "white",
//                               color: "#1e293b",
//                               maxWidth: "44px",
//                             }}
//                           />
//                         ))}
//                       </div>
//                     )}

//                     {/* Send / Verify button */}
//                     <button
//                       onClick={codeSent ? () => setPhoneVerified(true) : handleSend}
//                       disabled={!phone}
//                       className="w-full py-3 rounded-xl font-bold text-sm text-white transition-all"
//                       style={{
//                         backgroundColor: phone ? "#3b5bdb" : "#93c5fd",
//                         cursor: phone ? "pointer" : "not-allowed",
//                       }}
//                     >
//                       {codeSent ? "Verify Code" : "Send Verification Code"}
//                     </button>

//                     {/* Resend timer */}
//                     {codeSent && (
//                       <p className="text-xs text-center" style={{ color: "#94a3b8" }}>
//                         {resendTimer > 0 ? (
//                           `Resend in ${resendTimer}s`
//                         ) : (
//                           <button
//                             onClick={handleSend}
//                             className="underline font-semibold"
//                             style={{ color: "#3b5bdb" }}
//                           >
//                             Resend code
//                           </button>
//                         )}
//                       </p>
//                     )}
//                   </>
//                 )}
//               </div>
//             </div>

//             {/* ── Why we need verification ── */}
//             <div className="rounded-xl px-6 py-5 mb-6"
//                  style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
//               <div className="flex items-center gap-2 mb-4">
//                 <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//                   <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 <span className="font-bold text-sm" style={{ color: "#1e293b" }}>
//                   Why we need verification:
//                 </span>
//               </div>
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
//                 {[
//                   "Prevent fake clients",
//                   "Enable notifications",
//                   "Required for payments",
//                   "Admin communication",
//                 ].map(item => (
//                   <div key={item} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
//                     <span style={{ color: "#3b5bdb", fontWeight: 600 }}>✓</span>
//                     {item}
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Account Trust level */}
//             <div className="flex items-center gap-2 text-sm" style={{ color: "#64748b" }}>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
//                       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Account Trust:{" "}
//               <span className="font-semibold" style={{ color: emailVerified && phoneVerified ? "#16a34a" : "#f59e0b" }}>
//                 {emailVerified && phoneVerified ? "Verified" : emailVerified || phoneVerified ? "Basic" : "Unverified"}
//               </span>
//             </div>
//           </div>

//           {/* ── Nav buttons ── */}
//           <div className="flex items-center justify-between mt-6 pb-10">
//             <button
//               onClick={prev}
//               className="flex items-center gap-2 text-sm font-semibold"
//               style={{ color: "#374151" }}
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               Back
//             </button>

//             <button
//               onClick={handleNext}
//               disabled={!canContinue}
//               className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
//               style={{
//                 backgroundColor: canContinue ? "#3b5bdb" : "#93c5fd",
//                 cursor: canContinue ? "pointer" : "not-allowed",
//               }}
//             >
//               Continue to Profile Setup
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//             </button>
//           </div>
//         </div>

//         {/* ══ RIGHT: AI Insights ══════════════════════════════ */}
//         <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
//           <div className="rounded-2xl p-5"
//                style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>
//             <div className="flex items-center gap-2 mb-4">
//               <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
//                 <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                       strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//               </svg>
//               <span className="font-bold text-sm" style={{ color: "#1e293b" }}>AI Insights</span>
//             </div>

//             <div className="flex flex-col gap-2">
//               {/* Static tip */}
//               <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
//                    style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
//                 <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
//                         strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//                 </svg>
//                 Complete both verifications to increase your trust level.
//               </div>

//               {/* Dynamic feedback */}
//               {emailVerified && (
//                 <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
//                      style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
//                   <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   Email verified successfully.
//                 </div>
//               )}
//               {phoneVerified && (
//                 <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
//                      style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
//                   <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
//                     <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
//                   </svg>
//                   Phone verified successfully.
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </>
//   );
// }











// VerifyStep.jsx
import { useState, useEffect, useRef } from "react";

const COUNTRY_CODES = [
  { code:"+1",  flag:"🇺🇸", country:"US" },{ code:"+44", flag:"🇬🇧", country:"UK" },
  { code:"+91", flag:"🇮🇳", country:"IN" },{ code:"+61", flag:"🇦🇺", country:"AU" },
  { code:"+49", flag:"🇩🇪", country:"DE" },{ code:"+33", flag:"🇫🇷", country:"FR" },
  { code:"+81", flag:"🇯🇵", country:"JP" },{ code:"+86", flag:"🇨🇳", country:"CN" },
  { code:"+55", flag:"🇧🇷", country:"BR" },{ code:"+971",flag:"🇦🇪", country:"AE" },
];

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af",
};

export default function VerifyStep({ formData, updateData, next, prev }) {
  const [emailVerified,  setEmailVerified]  = useState(false);
  const [countryCode,    setCountryCode]    = useState("+91");
  const [phone,          setPhone]          = useState("");
  const [codeSent,       setCodeSent]       = useState(false);
  const [otp,            setOtp]            = useState(["","","","","",""]);
  const [phoneVerified,  setPhoneVerified]  = useState(false);
  const [resendTimer,    setResendTimer]    = useState(0);
  const otpRefs = useRef([]);

  useEffect(()=>{
    if (resendTimer<=0) return;
    const t = setTimeout(()=>setResendTimer(s=>s-1),1000);
    return ()=>clearTimeout(t);
  },[resendTimer]);

  const handleSend = () => {
    if (!phone) return;
    setCodeSent(true); setResendTimer(60);
    setOtp(["","","","","",""]); setPhoneVerified(false);
  };

  const handleOtpChange = (i, val) => {
    if (!/^\d?$/.test(val)) return;
    const n=[...otp]; n[i]=val; setOtp(n);
    if (val && i<5) otpRefs.current[i+1]?.focus();
    if (n.every(d=>d!=="")&&n.join("").length===6) setTimeout(()=>setPhoneVerified(true),300);
  };

  const handleOtpKey = (i,e) => {
    if (e.key==="Backspace"&&!otp[i]&&i>0) otpRefs.current[i-1]?.focus();
  };

  const canContinue = emailVerified || phoneVerified;
  const handleNext = () => { updateData({ emailVerified, phoneVerified, phone:`${countryCode}${phone}` }); next(); };

  const trustLevel = emailVerified&&phoneVerified?"Verified":emailVerified||phoneVerified?"Basic":"Unverified";
  const trustColor = emailVerified&&phoneVerified?G.green:emailVerified||phoneVerified?"#f59e0b":"#ef4444";

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ══ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 4px 24px rgba(110,192,48,0.08)" }}>
          <div style={{ height:4, background:G.mixedGrad }}/>
          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color:G.navyDeep }}>Verify Your Identity</h1>
            <p className="text-sm mb-6" style={{ color:G.sub }}>Quick verification to secure your account</p>

            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
              style={{ backgroundColor:G.navyBg, color:G.navy, border:`1px solid ${G.navyBorder}` }}>
              Verification
            </span>

            {/* Two verification cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

              {/* Email */}
              <div className="rounded-xl p-6 flex flex-col gap-4"
                style={{ border:`1px solid ${emailVerified?G.greenBorder:G.navyBorder}`, backgroundColor:emailVerified?G.greenBg:G.navyBg }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:G.gradNavy }}>
                    <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color:G.navyDeep }}>Email Verification</div>
                    <div className="text-xs" style={{ color:G.muted }}>Check your inbox for a link</div>
                  </div>
                </div>
                {emailVerified
                  ? <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                      style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Email Verified ✓
                    </div>
                  : <>
                    <p className="text-sm" style={{ color:G.sub }}>
                      We sent a link to{" "}
                      <span className="font-bold" style={{ color:G.navyDeep }}>{formData?.email||"your@email.com"}</span>
                    </p>
                    <button onClick={()=>setEmailVerified(true)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold w-fit transition-all"
                      style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:"white", color:G.navy }}
                      onMouseOver={e=>e.currentTarget.style.borderColor=G.navyLight}
                      onMouseOut={e=>e.currentTarget.style.borderColor=G.navyBorder}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Simulate Verify
                    </button>
                    <p className="text-xs" style={{ color:G.muted }}>Didn't receive it? Check spam folder.</p>
                  </>
                }
              </div>

              {/* Phone */}
              <div className="rounded-xl p-6 flex flex-col gap-4"
                style={{ border:`1px solid ${phoneVerified?G.greenBorder:G.navyBorder}`, backgroundColor:phoneVerified?G.greenBg:G.navyBg }}>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background:G.gradNavy }}>
                    <svg className="w-5 h-5" fill="none" stroke="white" viewBox="0 0 24 24"><path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                  <div>
                    <div className="font-bold text-sm" style={{ color:G.navyDeep }}>Phone Verification</div>
                    <div className="text-xs" style={{ color:G.muted }}>Verify via SMS or WhatsApp</div>
                  </div>
                </div>
                {phoneVerified
                  ? <div className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold"
                      style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      Phone Verified ✓
                    </div>
                  : <>
                    <div className="flex gap-2">
                      <select value={countryCode} onChange={e=>setCountryCode(e.target.value)}
                        className="px-2 py-3 rounded-xl text-sm outline-none appearance-none"
                        style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:"white", color:"#1e293b", width:"80px" }}>
                        {COUNTRY_CODES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}
                      </select>
                      <input type="tel" placeholder="Phone number" value={phone}
                        onChange={e=>setPhone(e.target.value.replace(/\D/g,""))}
                        className="flex-1 px-4 py-3 rounded-xl text-sm outline-none"
                        style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:"white", color:"#1e293b" }}/>
                    </div>

                    {codeSent && (
                      <div className="flex gap-2 justify-between">
                        {otp.map((digit,i)=>(
                          <input key={i} ref={el=>otpRefs.current[i]=el}
                            type="text" inputMode="numeric" maxLength={1} value={digit}
                            onChange={e=>handleOtpChange(i,e.target.value)}
                            onKeyDown={e=>handleOtpKey(i,e)}
                            className="w-full aspect-square rounded-xl text-center text-base font-bold outline-none transition-all"
                            style={{ border:digit?`2px solid ${G.navyLight}`:`1px solid ${G.navyBorder}`, backgroundColor:"white", color:"#1e293b", maxWidth:"44px" }}/>
                        ))}
                      </div>
                    )}

                    <button onClick={codeSent?()=>setPhoneVerified(true):handleSend} disabled={!phone}
                      className="w-full py-3 rounded-full font-bold text-sm text-white transition-all"
                      style={{ background:phone?G.gradNavy:"#d1d5db", cursor:phone?"pointer":"not-allowed" }}
                      onMouseEnter={e=>{ if(phone) e.currentTarget.style.opacity="0.88"; }}
                      onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
                      {codeSent?"Verify Code":"Send Verification Code"}
                    </button>

                    {codeSent && (
                      <p className="text-xs text-center" style={{ color:G.muted }}>
                        {resendTimer>0
                          ? `Resend in ${resendTimer}s`
                          : <button onClick={handleSend} className="underline font-semibold" style={{ color:G.navy }}>Resend code</button>}
                      </p>
                    )}
                  </>
                }
              </div>
            </div>

            {/* Why we verify */}
            <div className="rounded-xl px-6 py-5 mb-6"
              style={{ border:`1px solid ${G.navyBorder}`, backgroundColor:G.navyBg }}>
              <div className="flex items-center gap-2 mb-4">
                <svg className="w-5 h-5" fill="none" stroke={G.navyLight} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                <span className="font-bold text-sm" style={{ color:G.navyDeep }}>Why we need verification:</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {["Prevent fake clients","Enable notifications","Required for payments","Admin communication"].map(item=>(
                  <div key={item} className="flex items-center gap-2 text-sm" style={{ color:G.sub }}>
                    <span style={{ color:G.green, fontWeight:600 }}>✓</span>{item}
                  </div>
                ))}
              </div>
            </div>

            {/* Trust level */}
            <div className="flex items-center gap-2 text-sm" style={{ color:G.sub }}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Account Trust:{" "}
              <span className="font-semibold" style={{ color:trustColor }}>{trustLevel}</span>
            </div>
          </div>
        </div>

        {/* Nav buttons */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev} className="flex items-center gap-2 text-sm font-semibold" style={{ color:G.sub }}
            onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Back
          </button>
          <button onClick={handleNext} disabled={!canContinue}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-all"
            style={{ background:canContinue?G.gradNavy:"#d1d5db", boxShadow:canContinue?"0 3px 14px rgba(15,26,59,0.30)":"none", cursor:canContinue?"pointer":"not-allowed" }}
            onMouseEnter={e=>{ if(canContinue) e.currentTarget.style.opacity="0.88"; }}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Continue to Profile Setup
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT: AI Insights ══ */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}>
              <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-bold text-sm" style={{ color:G.navyDeep }}>AI Insights</span>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
              style={{ backgroundColor:G.navyBg, border:`1px solid ${G.navyBorder}`, color:G.navy }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke={G.navyLight} viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Complete both verifications to increase your trust level.
            </div>
            {emailVerified && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Email verified successfully.
              </div>
            )}
            {phoneVerified && (
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                Phone verified successfully.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}