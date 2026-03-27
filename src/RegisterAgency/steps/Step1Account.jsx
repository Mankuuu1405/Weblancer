// import React, { useState } from "react";
// import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

// const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
// const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

// function getStrength(pwd) {
//   if (!pwd) return { score: 0, label: "", color: "" };
//   let s = 0;
//   if (pwd.length >= 8)          s++;
//   if (pwd.length >= 12)         s++;
//   if (/[A-Z]/.test(pwd))        s++;
//   if (/[0-9]/.test(pwd))        s++;
//   if (/[^A-Za-z0-9]/.test(pwd)) s++;
//   if (s <= 1) return { score: 1, label: "Weak",   color: "#ef4444" };
//   if (s <= 2) return { score: 2, label: "Fair",   color: "#f59e0b" };
//   if (s <= 3) return { score: 3, label: "Good",   color: "#3b82f6" };
//   return       { score: 4, label: "Strong", color: "#22c55e" };
// }

// function isFree(email) {
//   const d = email.split("@")[1];
//   return d && FREE_DOMAINS.includes(d.toLowerCase());
// }

// const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const inputActive = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
// const inputIdle = "border border-gray-200 bg-white";

// const InsightCard = ({ type, children }) => {
//   const styles = {
//     warn:    "bg-amber-50 border-amber-200 text-amber-800",
//     success: "bg-green-50 border-green-200 text-green-800",
//     error:   "bg-red-50 border-red-200 text-red-800",
//     info:    "bg-blue-50 border-blue-200 text-blue-800",
//   };
//   return (
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${styles[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
//   const [agencyName, setAgencyName] = useState(formData.agencyName || "");
//   const [email,      setEmail]      = useState(formData.email      || "");
//   const [country,    setCountry]    = useState(formData.country    || "");
//   const [password,   setPassword]   = useState(formData.password   || "");
//   const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");

//   const strength       = getStrength(password);
//   const passwordsMatch = password && confirm && password === confirm;
//   const tooShort       = password.length > 0 && password.length < 8;
//   const freeEmail      = email.includes("@") && isFree(email);
//   const bizEmail       = email.includes("@") && !isFree(email) && email.split("@")[1]?.includes(".");
//   const nameGood       = agencyName.trim().length >= 5;
//   const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
//   const hasInsights    = freeEmail || nameGood || bizEmail || tooShort;

//   const handleNext = () => { updateData({ agencyName, email, country, password, confirmPassword: confirm }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">

//       {/* Form */}
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Create Your Agency Account</h2>
//           <p className="text-sm text-gray-500 mb-5">Start by setting up your agency's identity on the platform</p>

//           <div className="inline-block bg-gray-100 text-gray-500 text-[11px] font-bold px-3.5 py-1.5 rounded-md border border-gray-200 tracking-wide mb-5">
//             ACCOUNT CREATED – NOT CONFIGURED
//           </div>

//           <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//             <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//             <span className="text-xs text-amber-800 leading-relaxed">After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.</span>
//           </div>

//           {/* Agency Name */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Agency Name (Display Name) *</label>
//             <input type="text" placeholder="e.g., TechVision Digital Agency" value={agencyName} maxLength={50}
//               onChange={e => setAgencyName(e.target.value)}
//               className={`${inputBase} ${agencyName ? inputActive : inputIdle}`} />
//             <div className="text-xs text-gray-400 mt-1">{agencyName.length}/50 characters</div>
//           </div>

//           {/* Email */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Business Email Address *</label>
//             <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all
//               ${freeEmail ? "border-amber-300 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
//                 : bizEmail ? "border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]"
//                 : "border-gray-200 bg-white"}`}>
//               <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
//               <input type="email" placeholder="you@youragency.com" value={email} onChange={e => setEmail(e.target.value)}
//                 className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none" />
//             </div>
//             {freeEmail && (
//               <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
//                 <MdOutlineWarningAmber size={13} /> Business email preferred
//               </div>
//             )}
//           </div>

//           {/* Country */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Country of Registration *</label>
//             <div className="relative">
//               <select value={country} onChange={e => setCountry(e.target.value)}
//                 className={`${inputBase} appearance-none cursor-pointer ${country ? inputActive : inputIdle}`}>
//                 <option value="">Select country</option>
//                 {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
//               </select>
//               <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//             </div>
//           </div>

//           {/* Password Row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
//               <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)}
//                 className={`${inputBase} ${inputIdle}`} />
//               {password && (
//                 <div className="flex items-center gap-2 mt-2">
//                   <div className="flex gap-1 flex-1">
//                     {bars.map((c, i) => <div key={i} style={{ background: c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />)}
//                   </div>
//                   <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
//                 </div>
//               )}
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
//               <input type="password" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)}
//                 className={`${inputBase} ${inputIdle}`} />
//               {passwordsMatch && (
//                 <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1.5">
//                   <MdCheckCircleOutline size={13} /> Passwords match ✓
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-end pt-5">
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Admin Setup →
//           </button>
//         </div>
//       </div>

//       {/* AI Insights */}
//       <div className="w-full lg:w-[290px] lg:shrink-0 lg:sticky lg:top-6">
//         <div className="bg-white border border-violet-200 rounded-2xl p-5 shadow-sm">
//           <div className="flex items-center gap-2 mb-4">
//             <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
//               <MdAutoAwesome className="text-violet-700 text-sm" />
//             </div>
//             <span className="text-sm font-bold text-violet-700">AI Insights</span>
//           </div>
//           <div className="flex flex-col gap-2.5">
//             {freeEmail && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Business email preferred. Free email providers may reduce trust.</InsightCard>}
//             {nameGood && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Agency name looks good.</InsightCard>}
//             {bizEmail && !freeEmail && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Business email detected. Great for client trust!</InsightCard>}
//             {tooShort && <InsightCard type="error"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Password must be at least 8 characters long.</InsightCard>}
//             {!hasInsights && <p className="text-xs text-gray-400 text-center py-2">Start filling the form to see AI suggestions...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step1Account;







// import React, { useState } from "react";
// import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

// const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
// const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

// function getStrength(pwd) {
//   if (!pwd) return { score: 0, label: "", color: "" };
//   let s = 0;
//   if (pwd.length >= 8)          s++;
//   if (pwd.length >= 12)         s++;
//   if (/[A-Z]/.test(pwd))        s++;
//   if (/[0-9]/.test(pwd))        s++;
//   if (/[^A-Za-z0-9]/.test(pwd)) s++;
//   if (s <= 1) return { score: 1, label: "Weak",   color: "#ef4444" };
//   if (s <= 2) return { score: 2, label: "Fair",   color: "#f59e0b" };
//   if (s <= 3) return { score: 3, label: "Good",   color: "#3b82f6" };
//   return       { score: 4, label: "Strong", color: "#22c55e" };
// }

// function isFree(email) {
//   const d = email.split("@")[1];
//   return d && FREE_DOMAINS.includes(d.toLowerCase());
// }

// const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const inputActive = "border-[1.5px] border-[#1B72C0] bg-[#eff6ff] shadow-[0_0_0_3px_rgba(27,114,192,0.1)]";
// const inputIdle = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const styles = {
//     warn:    "bg-amber-50 border-amber-200 text-amber-800",
//     success: "bg-blue-50 border-blue-200 text-blue-800",
//     error:   "bg-red-50 border-red-200 text-red-800",
//     info:    "bg-blue-50 border-blue-200 text-blue-800",
//   };
//   return (
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${styles[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
//   const [agencyName, setAgencyName] = useState(formData.agencyName || "");
//   const [email,      setEmail]      = useState(formData.email      || "");
//   const [country,    setCountry]    = useState(formData.country    || "");
//   const [password,   setPassword]   = useState(formData.password   || "");
//   const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");

//   const strength       = getStrength(password);
//   const passwordsMatch = password && confirm && password === confirm;
//   const tooShort       = password.length > 0 && password.length < 8;
//   const freeEmail      = email.includes("@") && isFree(email);
//   const bizEmail       = email.includes("@") && !isFree(email) && email.split("@")[1]?.includes(".");
//   const nameGood       = agencyName.trim().length >= 5;
//   const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
//   const hasInsights    = freeEmail || nameGood || bizEmail || tooShort;

//   const handleNext = () => {
//     updateData({ agencyName, email, country, password, confirmPassword: confirm });
//     next();
//   };

//   return (
//     /* center karo poora content */
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* top accent bar — Weblance gradient */}
//             <div style={{ height: 3, background: "linear-gradient(90deg,#0D2855,#1B72C0)" }} />

//             <div className="px-6 sm:px-10 py-9">

//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: "#0D2855" }}>
//                 Create Your Agency Account
//               </h2>
//               <p className="text-sm text-gray-500 mb-5">
//                 Start by setting up your agency's identity on the platform
//               </p>

//               <div className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
//                 style={{ background: "#eff6ff", color: "#0D2855", borderColor: "#bfdbfe" }}>
//                 ACCOUNT CREATED – NOT CONFIGURED
//               </div>

//               <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//                 <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//                 <span className="text-xs text-amber-800 leading-relaxed">
//                   After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.
//                 </span>
//               </div>

//               {/* Agency Name */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">Agency Name (Display Name) *</label>
//                 <input type="text" placeholder="e.g., TechVision Digital Agency" value={agencyName} maxLength={50}
//                   onChange={e => setAgencyName(e.target.value)}
//                   className={`${inputBase} ${agencyName ? inputActive : inputIdle}`} />
//                 <div className="text-xs text-gray-400 mt-1">{agencyName.length}/50 characters</div>
//               </div>

//               {/* Email */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">Business Email Address *</label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all
//                   ${freeEmail
//                     ? "border-amber-300 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
//                     : bizEmail
//                     ? "border-[#1B72C0] bg-[#eff6ff] shadow-[0_0_0_3px_rgba(27,114,192,0.1)]"
//                     : "border-gray-200 bg-white"}`}>
//                   <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
//                   <input type="email" placeholder="you@youragency.com" value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none" />
//                 </div>
//                 {freeEmail && (
//                   <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
//                     <MdOutlineWarningAmber size={13} /> Business email preferred
//                   </div>
//                 )}
//               </div>

//               {/* Country */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold text-gray-900 mb-2">Country of Registration *</label>
//                 <div className="relative">
//                   <select value={country} onChange={e => setCountry(e.target.value)}
//                     className={`${inputBase} appearance-none cursor-pointer ${country ? inputActive : inputIdle}`}>
//                     <option value="">Select country</option>
//                     {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                   <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//                 </div>
//               </div>

//               {/* Password Row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
//                   <input type="password" placeholder="Min. 8 characters" value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className={`${inputBase} ${inputIdle}`} />
//                   {password && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <div className="flex gap-1 flex-1">
//                         {bars.map((c, i) => (
//                           <div key={i} style={{ background: c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />
//                         ))}
//                       </div>
//                       <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
//                   <input type="password" placeholder="Re-enter password" value={confirm}
//                     onChange={e => setConfirm(e.target.value)}
//                     className={`${inputBase} ${inputIdle}`} />
//                   {passwordsMatch && (
//                     <div className="flex items-center gap-1 text-xs font-semibold mt-1.5" style={{ color: "#0D2855" }}>
//                       <MdCheckCircleOutline size={13} /> Passwords match ✓
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Continue button */}
//           <div className="flex justify-end pt-5">
//             <button
//               onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{
//                 background: "linear-gradient(135deg,#0D2855 0%,#1B72C0 100%)",
//                 boxShadow: "0 4px 14px rgba(13,40,85,0.25)",
//               }}
//             >
//               Continue to Admin Setup →
//             </button>
//           </div>
//         </div>

//         {/* ── AI Insights ── */}
//         <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
//           <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: "#bfdbfe" }}>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center"
//                 style={{ background: "linear-gradient(135deg,#0D2855,#1B72C0)" }}>
//                 <MdAutoAwesome className="text-white text-sm" />
//               </div>
//               <span className="text-sm font-bold" style={{ color: "#0D2855" }}>AI Insights</span>
//             </div>
//             <div className="flex flex-col gap-2.5">
//               {freeEmail && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Business email preferred. Free email providers may reduce trust.
//                 </InsightCard>
//               )}
//               {nameGood && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Agency name looks good.
//                 </InsightCard>
//               )}
//               {bizEmail && !freeEmail && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Business email detected. Great for client trust!
//                 </InsightCard>
//               )}
//               {tooShort && (
//                 <InsightCard type="error">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Password must be at least 8 characters long.
//                 </InsightCard>
//               )}
//               {!hasInsights && (
//                 <div className="text-center py-4">
//                   <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center"
//                     style={{ background: "#eff6ff" }}>
//                     <MdAutoAwesome style={{ color: "#1B72C0", fontSize: 16 }} />
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">
//                     Start filling the form to see AI suggestions...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Step1Account;








// // RegisterAgency.jsx
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import Step1Account   from "./steps/Step1Account";
// import Step2Admin     from "./steps/Step2Admin";
// import Step3Business  from "./steps/Step3Business";
// import Step4Services  from "./steps/Step4Services";
// import Step5Portfolio from "./steps/Step5Portfolio";
// import Step6Verify    from "./steps/Step6Verify";
// import Step7Payment   from "./steps/Step7Payment";
// import Step8Perms     from "./steps/Step8Perms";
// import Step9GoLive    from "./steps/Step9GoLive";

// /* ── Brand tokens (logo-accurate) ── */
// const B = {
//   navy:       "#0F1A3B",   // logo "lance" / dark navy
//   navyMid:    "#1A2B5E",   // active tab underline
//   blue:       "#1B72C0",   // weblance blue
//   green:      "#6EC030",   // logo "web" green
//   grad:       "linear-gradient(135deg, #0F1A3B 0%, #1B72C0 100%)",
//   activeLine: "#1A2B5E",
// };

// const STEPS = [
//   { id: 1, label: "Account"   },
//   { id: 2, label: "Admin"     },
//   { id: 3, label: "Business"  },
//   { id: 4, label: "Services"  },
//   { id: 5, label: "Portfolio" },
//   { id: 6, label: "Verify"    },
//   { id: 7, label: "Payment"   },
//   { id: 8, label: "Perms"     },
//   { id: 9, label: "Go Live"   },
// ];

// const RegisterAgency = () => {
//   const [currentStep, setCurrentStep] = useState(1);
//   const [formData, setFormData]       = useState({});
//   const navigate = useNavigate();

//   const progress   = Math.round(((currentStep - 1) / (STEPS.length - 1)) * 100);
//   const updateData = (data) => setFormData((prev) => ({ ...prev, ...data }));
//   const next       = () => setCurrentStep((s) => Math.min(s + 1, STEPS.length));
//   const prev       = () => setCurrentStep((s) => Math.max(s - 1, 1));
//   const goTo       = (step) => { if (step <= currentStep) setCurrentStep(step); };
//   const onExit     = () => navigate("/");

//   const renderStep = () => {
//     const props = { formData, updateData, next, prev, currentStep };
//     switch (currentStep) {
//       case 1: return <Step1Account   {...props} />;
//       case 2: return <Step2Admin     {...props} />;
//       case 3: return <Step3Business  {...props} />;
//       case 4: return <Step4Services  {...props} />;
//       case 5: return <Step5Portfolio {...props} />;
//       case 6: return <Step6Verify    {...props} />;
//       case 7: return <Step7Payment   {...props} />;
//       case 8: return <Step8Perms     {...props} />;
//       case 9: return <Step9GoLive    {...props} onExit={onExit} />;
//       default: return <Step1Account  {...props} />;
//     }
//   };

//   return (
//     <div className="min-h-screen flex flex-col font-sans" style={{ background: "#f0f4f8" }}>

//       {/* ── Navbar ── */}
//       <div className="flex justify-between items-center px-6 sm:px-12 py-3 bg-white border-b border-gray-200">
//         <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
//         <button
//           onClick={onExit}
//           className="flex items-center gap-1.5 bg-transparent border-none text-sm font-semibold text-gray-600 hover:text-gray-900 transition-colors cursor-pointer"
//         >
//           <span>⊞</span> Save &amp; Exit
//         </button>
//       </div>

//       {/* ── Progress meta ── */}
//       <div className="flex justify-between items-center px-6 sm:px-12 pt-4 pb-1" style={{ background: "#f0f4f8" }}>
//         <span className="text-xs text-gray-500 font-medium">Step {currentStep} of {STEPS.length}</span>
//         <span className="text-xs font-bold" style={{ color: B.navyMid }}>{progress}% Complete</span>
//       </div>

//       {/* ── Thin progress bar ── */}
//       <div style={{ height: 2, background: "#dde3ed" }}>
//         <div
//           style={{
//             height: "100%",
//             width: `${progress}%`,
//             background: B.grad,
//             transition: "width 0.45s ease-in-out",
//             borderRadius: 99,
//           }}
//         />
//       </div>

//       {/* ── Step circles with connecting lines ── */}
//       <div style={{ background: "#f0f4f8", paddingTop: 18, paddingBottom: 16 }}>
//         <div style={{ display: "flex", justifyContent: "center", overflowX: "auto", padding: "0 16px" }}>
//           <div style={{ display: "flex", alignItems: "flex-start" }}>
//             {STEPS.map((s, idx) => {
//               const isDone   = s.id < currentStep;
//               const isActive = s.id === currentStep;
//               return (
//                 <div key={s.id} style={{ display: "flex", alignItems: "flex-start" }}>

//                   {/* Circle + label */}
//                   <div
//                     onClick={() => goTo(s.id)}
//                     style={{
//                       display: "flex",
//                       flexDirection: "column",
//                       alignItems: "center",
//                       width: 62,
//                       cursor: isDone ? "pointer" : "default",
//                     }}
//                   >
//                     <div style={{
//                       width: 34,
//                       height: 34,
//                       borderRadius: "50%",
//                       display: "flex",
//                       alignItems: "center",
//                       justifyContent: "center",
//                       fontSize: 12,
//                       fontWeight: 600,
//                       transition: "all 0.2s",
//                       ...(isActive ? {
//                         border: `2px solid ${B.navyMid}`,
//                         color: B.navyMid,
//                         background: "#fff",
//                         boxShadow: `0 0 0 3px rgba(26,43,94,0.1)`,
//                       } : isDone ? {
//                         border: "none",
//                         background: B.grad,
//                         color: "#fff",
//                       } : {
//                         border: "1.5px solid #c8d0e0",
//                         color: "#9ca3af",
//                         background: "#f0f4f8",
//                       }),
//                     }}>
//                       {s.id}
//                     </div>
//                     <div style={{
//                       fontSize: 10,
//                       textAlign: "center",
//                       whiteSpace: "nowrap",
//                       marginTop: 6,
//                       color: isActive ? B.navyMid : isDone ? B.navy : "#9ca3af",
//                       fontWeight: isActive ? 700 : isDone ? 600 : 400,
//                     }}>
//                       {s.label}
//                     </div>
//                   </div>

//                   {/* Connecting line */}
//                   {idx < STEPS.length - 1 && (
//                     <div style={{
//                       width: 30,
//                       height: 1.5,
//                       marginTop: 16,
//                       flexShrink: 0,
//                       background: isDone ? B.navyMid : "#c8d0e0",
//                       transition: "background 0.3s",
//                     }} />
//                   )}
//                 </div>
//               );
//             })}
//           </div>
//         </div>
//       </div>

//       {/* ── Step content ── */}
//       <div className="flex-1 px-6 sm:px-12 pt-6 pb-10 w-full">
//         {renderStep()}
//       </div>

//     </div>
//   );
// };

// export default RegisterAgency;




// // Step1Account.jsx
// import React, { useState } from "react";
// import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

// const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
// const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

// /* ── WebLance 3-color tokens ── */
// const B = {
//   navy:      "#0F1A3B",   // "Lance" dark
//   navyMid:   "#1A2B5E",   // "Lance" mid
//   green:     "#6EC030",   // "Web" bright green
//   greenDark: "#2E7D1F",   // "Web" dark green
//   /* Gradients */
//   navyGrad:  "linear-gradient(135deg, #0F1A3B 0%, #1A2B5E 100%)",    // Navy button
//   greenGrad: "linear-gradient(90deg, #6EC030 0%, #2E7D1F 100%)",     // Green accent
//   mixedGrad: "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)", // Logo mixture
//   /* Backgrounds */
//   greenBg:   "#f0f7e8",
//   greenBdr:  "#b8e08a",
//   navyBg:    "#eef1f8",
//   navyBdr:   "#c2ccdf",
// };

// function getStrength(pwd) {
//   if (!pwd) return { score: 0, label: "", color: "" };
//   let s = 0;
//   if (pwd.length >= 8)          s++;
//   if (pwd.length >= 12)         s++;
//   if (/[A-Z]/.test(pwd))        s++;
//   if (/[0-9]/.test(pwd))        s++;
//   if (/[^A-Za-z0-9]/.test(pwd)) s++;
//   if (s <= 1) return { score: 1, label: "Weak",   color: "#ef4444" };
//   if (s <= 2) return { score: 2, label: "Fair",   color: "#f59e0b" };
//   if (s <= 3) return { score: 3, label: "Good",   color: B.navyMid };
//   return       { score: 4, label: "Strong", color: B.green };
// }

// function isFree(email) {
//   const d = email.split("@")[1];
//   return d && FREE_DOMAINS.includes(d.toLowerCase());
// }

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// /* Active input → green border (Web color) */
// const inputActive = "border-[1.5px] border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]";
// const inputIdle   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const styles = {
//     warn:    "bg-amber-50 border-amber-200 text-amber-800",
//     success: "bg-[#f0f7e8] border-[#b8e08a] text-[#2E7D1F]",   // Green success
//     error:   "bg-red-50 border-red-200 text-red-800",
//     info:    "bg-[#eef1f8] border-[#c2ccdf] text-[#1A2B5E]",    // Navy info
//   };
//   return (
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${styles[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
//   const [agencyName, setAgencyName] = useState(formData.agencyName || "");
//   const [email,      setEmail]      = useState(formData.email      || "");
//   const [country,    setCountry]    = useState(formData.country    || "");
//   const [password,   setPassword]   = useState(formData.password   || "");
//   const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");

//   const strength       = getStrength(password);
//   const passwordsMatch = password && confirm && password === confirm;
//   const tooShort       = password.length > 0 && password.length < 8;
//   const freeEmail      = email.includes("@") && isFree(email);
//   const bizEmail       = email.includes("@") && !isFree(email) && email.split("@")[1]?.includes(".");
//   const nameGood       = agencyName.trim().length >= 5;
//   const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
//   const hasInsights    = freeEmail || nameGood || bizEmail || tooShort;

//   const handleNext = () => {
//     updateData({ agencyName, email, country, password, confirmPassword: confirm });
//     next();
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent bar — full logo gradient (Green→DarkGreen→Navy) */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">

//               {/* Heading → Navy */}
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>
//                 Create Your Agency Account
//               </h2>
//               <p className="text-sm text-gray-500 mb-5">
//                 Start by setting up your agency's identity on the platform
//               </p>

//               {/* Badge → Navy bg, Navy text */}
//               <div
//                 className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
//                 style={{ background: B.navyBg, color: B.navyMid, borderColor: B.navyBdr }}
//               >
//                 ACCOUNT CREATED – NOT CONFIGURED
//               </div>

//               {/* Warning */}
//               <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//                 <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//                 <span className="text-xs text-amber-800 leading-relaxed">
//                   After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.
//                 </span>
//               </div>

//               {/* Agency Name */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Agency Name (Display Name) *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., TechVision Digital Agency"
//                   value={agencyName}
//                   maxLength={50}
//                   onChange={e => setAgencyName(e.target.value)}
//                   className={`${inputBase} ${agencyName ? inputActive : inputIdle}`}
//                 />
//                 <div className="text-xs text-gray-400 mt-1">{agencyName.length}/50 characters</div>
//               </div>

//               {/* Email */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Business Email Address *
//                 </label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all ${
//                   freeEmail
//                     ? "border-amber-300 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
//                     : bizEmail
//                     ? "border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]"
//                     : "border-gray-200 bg-white"
//                 }`}>
//                   <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
//                   <input
//                     type="email"
//                     placeholder="you@youragency.com"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none"
//                   />
//                 </div>
//                 {freeEmail && (
//                   <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
//                     <MdOutlineWarningAmber size={13} /> Business email preferred
//                   </div>
//                 )}
//               </div>

//               {/* Country */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Country of Registration *
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={country}
//                     onChange={e => setCountry(e.target.value)}
//                     className={`${inputBase} appearance-none cursor-pointer ${country ? inputActive : inputIdle}`}
//                   >
//                     <option value="">Select country</option>
//                     {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                   <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//                 </div>
//               </div>

//               {/* Password Row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                     Password *
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Min. 8 characters"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className={`${inputBase} ${password ? inputActive : inputIdle}`}
//                   />
//                   {password && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <div className="flex gap-1 flex-1">
//                         {bars.map((c, i) => (
//                           <div key={i} style={{ background: c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />
//                         ))}
//                       </div>
//                       <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                     Confirm Password *
//                   </label>
//                   <input
//                     type="password"
//                     placeholder="Re-enter password"
//                     value={confirm}
//                     onChange={e => setConfirm(e.target.value)}
//                     className={`${inputBase} ${confirm ? inputActive : inputIdle}`}
//                   />
//                   {passwordsMatch && (
//                     <div className="flex items-center gap-1 text-xs font-semibold mt-1.5" style={{ color: B.green }}>
//                       <MdCheckCircleOutline size={13} /> Passwords match ✓
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Continue button → Navy gradient (Lance color) */}
//           <div className="flex justify-end pt-5">
//             <button
//               onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{
//                 background: B.navyGrad,
//                 boxShadow: "0 4px 14px rgba(15,26,59,0.28)",
//               }}
//             >
//               Continue to Admin Setup →
//             </button>
//           </div>
//         </div>

//         {/* ── AI Insights ── */}
//         <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
//           <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: B.greenBdr }}>

//             {/* AI Insights header → mixed gradient icon */}
//             <div className="flex items-center gap-2 mb-4">
//               <div
//                 className="w-8 h-8 rounded-xl flex items-center justify-center"
//                 style={{ background: B.mixedGrad }}
//               >
//                 <MdAutoAwesome className="text-white text-sm" />
//               </div>
//               <span className="text-sm font-bold" style={{ color: B.navy }}>AI Insights</span>
//             </div>

//             <div className="flex flex-col gap-2.5">
//               {freeEmail && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Business email preferred. Free email providers may reduce trust.
//                 </InsightCard>
//               )}
//               {nameGood && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Agency name looks good.
//                 </InsightCard>
//               )}
//               {bizEmail && !freeEmail && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Business email detected. Great for client trust!
//                 </InsightCard>
//               )}
//               {tooShort && (
//                 <InsightCard type="error">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Password must be at least 8 characters long.
//                 </InsightCard>
//               )}
//               {!hasInsights && (
//                 <div className="text-center py-4">
//                   <div
//                     className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center"
//                     style={{ background: B.greenBg }}
//                   >
//                     <MdAutoAwesome style={{ color: B.green, fontSize: 16 }} />
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">
//                     Start filling the form to see AI suggestions...
//                   </p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Step1Account;










// // Step1Account.jsx
// import React, { useState } from "react";
// import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

// const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
// const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

// /* ── WebLance 3-color tokens ── */
// const B = {
//   navy:      "#0F1A3B",
//   navyMid:   "#1A2B5E",
//   green:     "#6EC030",
//   greenDark: "#2E7D1F",
//   mixedGrad: "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   btnGrad:   "linear-gradient(135deg, #6EC030 0%, #2E7D1F 40%, #1A2B5E 100%)",
//   greenBg:   "#f0f7e8",
//   greenBdr:  "#b8e08a",
//   navyBg:    "#eef1f8",
//   navyBdr:   "#c2ccdf",
// };

// function getStrength(pwd) {
//   if (!pwd) return { score: 0, label: "", color: "" };
//   let s = 0;
//   if (pwd.length >= 8)          s++;
//   if (pwd.length >= 12)         s++;
//   if (/[A-Z]/.test(pwd))        s++;
//   if (/[0-9]/.test(pwd))        s++;
//   if (/[^A-Za-z0-9]/.test(pwd)) s++;
//   if (s <= 1) return { score: 1, label: "Weak",   color: "#ef4444" };
//   if (s <= 2) return { score: 2, label: "Fair",   color: "#f59e0b" };
//   if (s <= 3) return { score: 3, label: "Good",   color: B.navyMid };
//   return       { score: 4, label: "Strong", color: B.green };
// }

// function isFree(email) {
//   const d = email.split("@")[1];
//   return d && FREE_DOMAINS.includes(d.toLowerCase());
// }

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const inputActive = "border-[1.5px] border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]";
// const inputIdle   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const styles = {
//     warn:    "bg-amber-50 border-amber-200 text-amber-800",
//     success: "bg-[#f0f7e8] border-[#b8e08a] text-[#2E7D1F]",
//     error:   "bg-red-50 border-red-200 text-red-800",
//     info:    "bg-[#eef1f8] border-[#c2ccdf] text-[#1A2B5E]",
//   };
//   return (
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${styles[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
//   const [agencyName, setAgencyName] = useState(formData.agencyName || "");
//   const [email,      setEmail]      = useState(formData.email      || "");
//   const [country,    setCountry]    = useState(formData.country    || "");
//   const [password,   setPassword]   = useState(formData.password   || "");
//   const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");

//   const strength       = getStrength(password);
//   const passwordsMatch = password && confirm && password === confirm;
//   const tooShort       = password.length > 0 && password.length < 8;
//   const freeEmail      = email.includes("@") && isFree(email);
//   const bizEmail       = email.includes("@") && !isFree(email) && email.split("@")[1]?.includes(".");
//   const nameGood       = agencyName.trim().length >= 5;
//   const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
//   const hasInsights    = freeEmail || nameGood || bizEmail || tooShort;

//   const handleNext = () => {
//     updateData({ agencyName, email, country, password, confirmPassword: confirm });
//     next();
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent — logo mixture */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">

//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>
//                 Create Your Agency Account
//               </h2>
//               <p className="text-sm text-gray-500 mb-5">
//                 Start by setting up your agency's identity on the platform
//               </p>

//               {/* Badge */}
//               <div
//                 className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
//                 style={{ background: B.navyBg, color: B.navyMid, borderColor: B.navyBdr }}
//               >
//                 ACCOUNT CREATED – NOT CONFIGURED
//               </div>

//               {/* Warning */}
//               <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//                 <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//                 <span className="text-xs text-amber-800 leading-relaxed">
//                   After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.
//                 </span>
//               </div>

//               {/* Agency Name */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Agency Name (Display Name) *
//                 </label>
//                 <input
//                   type="text"
//                   placeholder="e.g., TechVision Digital Agency"
//                   value={agencyName}
//                   maxLength={50}
//                   onChange={e => setAgencyName(e.target.value)}
//                   className={`${inputBase} ${agencyName ? inputActive : inputIdle}`}
//                 />
//                 <div className="text-xs text-gray-400 mt-1">{agencyName.length}/50 characters</div>
//               </div>

//               {/* Email */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Business Email Address *
//                 </label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all ${
//                   freeEmail
//                     ? "border-amber-300 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
//                     : bizEmail
//                     ? "border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]"
//                     : "border-gray-200 bg-white"
//                 }`}>
//                   <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
//                   <input
//                     type="email"
//                     placeholder="you@youragency.com"
//                     value={email}
//                     onChange={e => setEmail(e.target.value)}
//                     className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none"
//                   />
//                 </div>
//                 {freeEmail && (
//                   <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
//                     <MdOutlineWarningAmber size={13} /> Business email preferred
//                   </div>
//                 )}
//               </div>

//               {/* Country */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Country of Registration *
//                 </label>
//                 <div className="relative">
//                   <select
//                     value={country}
//                     onChange={e => setCountry(e.target.value)}
//                     className={`${inputBase} appearance-none cursor-pointer ${country ? inputActive : inputIdle}`}
//                   >
//                     <option value="">Select country</option>
//                     {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
//                   </select>
//                   <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//                 </div>
//               </div>

//               {/* Password Row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Password *</label>
//                   <input
//                     type="password"
//                     placeholder="Min. 8 characters"
//                     value={password}
//                     onChange={e => setPassword(e.target.value)}
//                     className={`${inputBase} ${password ? inputActive : inputIdle}`}
//                   />
//                   {password && (
//                     <div className="flex items-center gap-2 mt-2">
//                       <div className="flex gap-1 flex-1">
//                         {bars.map((c, i) => (
//                           <div key={i} style={{ background: c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />
//                         ))}
//                       </div>
//                       <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
//                     </div>
//                   )}
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Confirm Password *</label>
//                   <input
//                     type="password"
//                     placeholder="Re-enter password"
//                     value={confirm}
//                     onChange={e => setConfirm(e.target.value)}
//                     className={`${inputBase} ${confirm ? inputActive : inputIdle}`}
//                   />
//                   {passwordsMatch && (
//                     <div className="flex items-center gap-1 text-xs font-semibold mt-1.5" style={{ color: B.green }}>
//                       <MdCheckCircleOutline size={13} /> Passwords match ✓
//                     </div>
//                   )}
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Continue button → Green→DarkGreen→Navy (same as Step3-9) */}
//           <div className="flex justify-end pt-5">
//             <button
//               onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background: B.btnGrad, boxShadow: "0 4px 16px rgba(46,125,31,0.25)" }}
//             >
//               Continue to Admin Setup →
//             </button>
//           </div>
//         </div>

//         {/* ── AI Insights ── */}
//         <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
//           <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: B.greenBdr }}>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background: B.mixedGrad }}>
//                 <MdAutoAwesome className="text-white text-sm" />
//               </div>
//               <span className="text-sm font-bold" style={{ color: B.navy }}>AI Insights</span>
//             </div>
//             <div className="flex flex-col gap-2.5">
//               {freeEmail && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Business email preferred. Free email providers may reduce trust.
//                 </InsightCard>
//               )}
//               {nameGood && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Agency name looks good.
//                 </InsightCard>
//               )}
//               {bizEmail && !freeEmail && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Business email detected. Great for client trust!
//                 </InsightCard>
//               )}
//               {tooShort && (
//                 <InsightCard type="error">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Password must be at least 8 characters long.
//                 </InsightCard>
//               )}
//               {!hasInsights && (
//                 <div className="text-center py-4">
//                   <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: B.greenBg }}>
//                     <MdAutoAwesome style={{ color: B.green, fontSize: 16 }} />
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">Start filling the form to see AI suggestions...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };

// export default Step1Account;





// Step1Account.jsx
import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af", error:"#ef4444",
};

function getStrength(pwd) {
  if (!pwd) return { score:0, label:"", color:"" };
  let s=0;
  if (pwd.length>=8) s++; if (pwd.length>=12) s++;
  if (/[A-Z]/.test(pwd)) s++; if (/[0-9]/.test(pwd)) s++; if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s<=1) return { score:1, label:"Weak",   color:"#ef4444" };
  if (s<=2) return { score:2, label:"Fair",   color:"#f59e0b" };
  if (s<=3) return { score:3, label:"Good",   color:G.navyLight };
  return           { score:4, label:"Strong", color:G.green };
}
function isFree(email) { const d=email.split("@")[1]; return d&&FREE_DOMAINS.includes(d.toLowerCase()); }
function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]";
const idleField   = "border border-gray-200 bg-white hover:border-gray-300";
const errorField  = "border-[1.5px] border-[#ef4444] bg-[#fff5f5] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]";

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", error:"bg-red-50 border-red-200 text-red-800", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const ErrMsg = ({ msg }) => msg ? <p className="text-xs mt-1 font-medium" style={{ color:G.error }}>⚠ {msg}</p> : null;

const Step1Account = ({ formData={}, updateData=()=>{}, next=()=>{} }) => {
  const [agencyName, setAgencyName] = useState(formData.agencyName || "");
  const [email,      setEmail]      = useState(formData.email      || "");
  const [country,    setCountry]    = useState(formData.country    || "");
  const [password,   setPassword]   = useState(formData.password   || "");
  const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");
  const [touched,    setTouch]      = useState({});

  const touch = f => setTouch(p=>({...p,[f]:true}));

  const errors = {
    agencyName: !agencyName.trim() ? "Agency name is required" : agencyName.trim().length < 3 ? "Minimum 3 characters required" : "",
    email:      !email.trim() ? "Email is required" : !isValidEmail(email) ? "Enter a valid email address" : "",
    country:    !country ? "Please select a country" : "",
    password:   !password ? "Password is required" : password.length < 8 ? "Minimum 8 characters required" : "",
    confirm:    !confirm ? "Please confirm your password" : confirm !== password ? "Passwords do not match" : "",
  };

  const isValid = Object.values(errors).every(e => e === "");

  const handleNext = () => {
    setTouch({ agencyName:true, email:true, country:true, password:true, confirm:true });
    if (!isValid) return;
    updateData({ agencyName, email, country, password, confirmPassword:confirm });
    next();
  };

  const strength       = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;
  const freeEmail      = email.includes("@") && isFree(email);
  const bizEmail       = email.includes("@") && !isFree(email) && isValidEmail(email);
  const nameGood       = agencyName.trim().length >= 5;
  const bars           = [1,2,3,4].map(i => password && i<=strength.score ? strength.color : "#e5e7eb");
  const hasInsights    = freeEmail || nameGood || bizEmail || (password.length > 0 && password.length < 8);

  const getFieldClass = (field, hasValue) => {
    if (touched[field] && errors[field]) return `${inputBase} ${errorField}`;
    if (hasValue) return `${inputBase} ${activeField}`;
    return `${inputBase} ${idleField}`;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />
            <div className="px-6 sm:px-10 py-9">
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Create Your Agency Account</h2>
              <p className="text-sm mb-5" style={{ color:G.sub }}>Start by setting up your agency's identity on the platform</p>

              <div className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
                style={{ background:G.navyBg, color:G.navy, borderColor:G.navyBorder }}>ACCOUNT CREATED – NOT CONFIGURED</div>

              <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
                <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
                <span className="text-xs text-amber-800 leading-relaxed">After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.</span>
              </div>

              {/* Agency Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Agency Name (Display Name) *</label>
                <input type="text" placeholder="e.g., TechVision Digital Agency"
                  value={agencyName} maxLength={50}
                  onChange={e=>setAgencyName(e.target.value)}
                  onBlur={()=>touch("agencyName")}
                  className={getFieldClass("agencyName", !!agencyName)} />
                <div className="flex justify-between mt-1">
                  <ErrMsg msg={touched.agencyName && errors.agencyName} />
                  <span className="text-xs ml-auto" style={{ color:G.muted }}>{agencyName.length}/50</span>
                </div>
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Business Email Address *</label>
                <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all ${
                  touched.email && errors.email ? "border-[#ef4444] bg-[#fff5f5]"
                  : freeEmail ? "border-amber-300 bg-amber-50"
                  : bizEmail  ? "border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]"
                  : "border-gray-200 bg-white"}`}>
                  <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
                  <input type="email" placeholder="you@youragency.com" value={email}
                    onChange={e=>setEmail(e.target.value)} onBlur={()=>touch("email")}
                    className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none" />
                </div>
                <ErrMsg msg={touched.email && errors.email} />
                {!errors.email && freeEmail && <p className="text-xs text-amber-600 font-semibold mt-1"><MdOutlineWarningAmber size={13} className="inline" /> Business email preferred</p>}
              </div>

              {/* Country */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Country of Registration *</label>
                <div className="relative">
                  <select value={country} onChange={e=>setCountry(e.target.value)} onBlur={()=>touch("country")}
                    className={`${getFieldClass("country", !!country)} appearance-none cursor-pointer`}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c=><option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
                </div>
                <ErrMsg msg={touched.country && errors.country} />
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Password *</label>
                  <input type="password" placeholder="Min. 8 characters" value={password}
                    onChange={e=>setPassword(e.target.value)} onBlur={()=>touch("password")}
                    className={getFieldClass("password", !!password)} />
                  {password && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1 flex-1">{bars.map((c,i)=><div key={i} style={{ background:c }} className="h-1.5 flex-1 rounded-full transition-all duration-300"/>)}</div>
                      <span className="text-xs font-semibold" style={{ color:strength.color }}>{strength.label}</span>
                    </div>
                  )}
                  <ErrMsg msg={touched.password && errors.password} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Confirm Password *</label>
                  <input type="password" placeholder="Re-enter password" value={confirm}
                    onChange={e=>setConfirm(e.target.value)} onBlur={()=>touch("confirm")}
                    className={getFieldClass("confirm", !!confirm)} />
                  {passwordsMatch && <p className="text-xs font-semibold mt-1.5 flex items-center gap-1" style={{ color:G.green }}><MdCheckCircleOutline size={13}/> Passwords match ✓</p>}
                  <ErrMsg msg={touched.confirm && errors.confirm} />
                </div>
              </div>

              {/* Global error hint */}
              {!isValid && Object.values(touched).some(Boolean) && (
                <div className="mt-5 flex gap-2.5 items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-red-700 font-medium">Please fill all required fields correctly before continuing.</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end pt-5">
            <button onClick={handleNext}
              className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
              style={{ background: isValid ? G.gradNavy : "#d1d5db", boxShadow: isValid ? "0 3px 14px rgba(15,26,59,0.30)" : "none", cursor: isValid ? "pointer" : "not-allowed" }}
              onMouseEnter={e=>{ if(isValid) e.currentTarget.style.opacity="0.88"; }}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Continue to Admin Setup →
            </button>
          </div>
        </div>

        {/* AI Insights */}
        <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}><MdAutoAwesome className="text-white text-sm"/></div>
              <span className="text-sm font-bold" style={{ color:G.navyDeep }}>AI Insights</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {freeEmail && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>Business email preferred. Free providers may reduce trust.</InsightCard>}
              {nameGood  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Agency name looks good.</InsightCard>}
              {bizEmail && !freeEmail && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Business email detected. Great for client trust!</InsightCard>}
              {password.length>0 && password.length<8 && <InsightCard type="error"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>Password must be at least 8 characters.</InsightCard>}
              {!hasInsights && <div className="text-center py-4">
                <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}><MdAutoAwesome style={{ color:G.green, fontSize:16 }}/></div>
                <p className="text-xs text-center" style={{ color:G.muted }}>Start filling the form to see AI suggestions...</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step1Account;