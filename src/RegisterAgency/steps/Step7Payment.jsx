// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber, MdLockOutline } from "react-icons/md";
// import { BsBank2 } from "react-icons/bs";

// const PAYOUT_METHODS = ["Bank Transfer","PayPal Business","Payoneer","Other"];

// const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
// const idleField = "border border-gray-200 bg-white";

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step7Payment = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const legalName = formData.legalName || "";
//   const [bankName,   setBankName]   = useState(formData.bankName   || "");
//   const [accNumber,  setAccNumber]  = useState(formData.accNumber  || "");
//   const [swiftCode,  setSwiftCode]  = useState(formData.swiftCode  || "");
//   const [holderName, setHolderName] = useState(formData.holderName || "");
//   const [payout,     setPayout]     = useState(formData.payout     || "Bank Transfer");
//   const [taxId,      setTaxId]      = useState(formData.taxId      || "");

//   const holderFilled = holderName.trim().length > 2;
//   const nameMismatch = holderFilled && legalName && !holderName.toLowerCase().includes(legalName.toLowerCase().split(" ")[0]);

//   const handleNext = () => { updateData({ bankName, accNumber, swiftCode, holderName, payout, taxId }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Payment & Finance Setup</h2>
//           <p className="text-sm text-gray-500 mb-4">Configure how your agency receives payments</p>

//           <div className="inline-block bg-blue-50 text-blue-500 text-[11px] font-bold px-3.5 py-1.5 rounded-md border border-blue-200 tracking-wide mb-5">PAYMENT SETUP</div>

//           <div className="flex gap-2.5 items-center bg-sky-50 border border-sky-200 rounded-xl px-4 py-3.5 mb-6">
//             <span className="text-base shrink-0">💵</span>
//             <span className="text-xs text-sky-700">Platform pays only the agency. Team members are paid internally by your agency.</span>
//           </div>

//           {/* Legal Name — disabled */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Legal Entity Name</label>
//             <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
//               <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//               <span className="text-sm text-gray-400">{legalName || "Your Company Ltd."}</span>
//             </div>
//             <div className="text-xs text-gray-400 mt-1">Auto-filled from business profile — must match documents</div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Bank Name *</label>
//               <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${bankName ? activeField : idleField}`}>
//                 <BsBank2 className="text-gray-400 text-sm shrink-0" />
//                 <input type="text" placeholder="e.g., Demo Bank" value={bankName} onChange={e => setBankName(e.target.value)}
//                   className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Account Number *</label>
//               <input type="text" placeholder="1234567890" value={accNumber} onChange={e => setAccNumber(e.target.value)}
//                 className={`${inputBase} ${accNumber ? activeField : idleField}`} />
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Routing / SWIFT Code</label>
//               <input type="text" placeholder="e.g., BOFAUS3N" value={swiftCode} onChange={e => setSwiftCode(e.target.value)}
//                 className={`${inputBase} ${swiftCode ? activeField : idleField}`} />
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Account Holder Name *</label>
//               <input type="text" placeholder="As per bank records" value={holderName} onChange={e => setHolderName(e.target.value)}
//                 className={`${inputBase} ${holderName ? activeField : idleField}`} />
//             </div>
//           </div>

//           {/* Payout Method */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-3">Payout Method *</label>
//             <div className="flex gap-2.5 flex-wrap">
//               {PAYOUT_METHODS.map(m => (
//                 <button key={m} onClick={() => setPayout(m)}
//                   className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all
//                     ${payout === m ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
//                   <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${payout === m ? "border-4 border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
//                   {m}
//                 </button>
//               ))}
//             </div>
//           </div>

//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Tax Identification Number</label>
//             <input type="text" placeholder="e.g., EIN, VAT, GST" value={taxId} onChange={e => setTaxId(e.target.value)}
//               className={`${inputBase} ${taxId ? activeField : idleField}`} />
//           </div>

//           <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
//             <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//             <span className="text-xs text-gray-500">All payment data is encrypted and stored securely</span>
//           </div>
//         </div>

//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Permissions →
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
//             <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Platform pays only the agency. Team members are paid internally.</InsightCard>
//             {holderFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Account holder name will be matched against legal entity.</InsightCard>}
//             {nameMismatch  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Holder name may not match legal entity. Verify before submitting.</InsightCard>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step7Payment;





// // Step7Payment.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber, MdLockOutline } from "react-icons/md";
// import { BsBank2 } from "react-icons/bs";

// const PAYOUT_METHODS = ["Bank Transfer", "PayPal Business", "Payoneer", "Other"];

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

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]";
// const idleField   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const s = {
//     warn:    "bg-amber-50 border-amber-200 text-amber-800",
//     success: "bg-[#f0f7e8] border-[#b8e08a] text-[#2E7D1F]",
//     info:    "bg-[#eef1f8] border-[#c2ccdf] text-[#1A2B5E]",
//   };
//   return (
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step7Payment = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const legalName = formData.legalName || "";
//   const [bankName,   setBankName]   = useState(formData.bankName   || "");
//   const [accNumber,  setAccNumber]  = useState(formData.accNumber  || "");
//   const [swiftCode,  setSwiftCode]  = useState(formData.swiftCode  || "");
//   const [holderName, setHolderName] = useState(formData.holderName || "");
//   const [payout,     setPayout]     = useState(formData.payout     || "Bank Transfer");
//   const [taxId,      setTaxId]      = useState(formData.taxId      || "");

//   const holderFilled = holderName.trim().length > 2;
//   const nameMismatch = holderFilled && legalName && !holderName.toLowerCase().includes(legalName.toLowerCase().split(" ")[0]);

//   const handleNext = () => { updateData({ bankName, accNumber, swiftCode, holderName, payout, taxId }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>Payment & Finance Setup</h2>
//               <p className="text-sm text-gray-500 mb-4">Configure how your agency receives payments</p>

//               {/* Badge — Navy */}
//               <div
//                 className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
//                 style={{ background: B.navyBg, color: B.navyMid, borderColor: B.navyBdr }}
//               >
//                 PAYMENT SETUP
//               </div>

//               {/* Info banner — Green */}
//               <div
//                 className="flex gap-2.5 items-center rounded-xl px-4 py-3.5 mb-6 border"
//                 style={{ background: B.greenBg, borderColor: B.greenBdr }}
//               >
//                 <span className="text-base shrink-0">💵</span>
//                 <span className="text-xs leading-relaxed" style={{ color: B.greenDark }}>
//                   Platform pays only the agency. Team members are paid internally by your agency.
//                 </span>
//               </div>

//               {/* Legal Name (disabled) */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Legal Entity Name</label>
//                 <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
//                   <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//                   <span className="text-sm text-gray-400">{legalName || "Your Company Ltd."}</span>
//                 </div>
//                 <div className="text-xs text-gray-400 mt-1">Auto-filled from business profile — must match documents</div>
//               </div>

//               {/* Bank Name + Account */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Bank Name *</label>
//                   <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${bankName ? activeField : idleField}`}>
//                     <BsBank2 className="text-gray-400 text-sm shrink-0" />
//                     <input type="text" placeholder="e.g., Demo Bank" value={bankName} onChange={e => setBankName(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Account Number *</label>
//                   <input type="text" placeholder="1234567890" value={accNumber} onChange={e => setAccNumber(e.target.value)}
//                     className={`${inputBase} ${accNumber ? activeField : idleField}`} />
//                 </div>
//               </div>

//               {/* SWIFT + Holder */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Routing / SWIFT Code</label>
//                   <input type="text" placeholder="e.g., BOFAUS3N" value={swiftCode} onChange={e => setSwiftCode(e.target.value)}
//                     className={`${inputBase} ${swiftCode ? activeField : idleField}`} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Account Holder Name *</label>
//                   <input type="text" placeholder="As per bank records" value={holderName} onChange={e => setHolderName(e.target.value)}
//                     className={`${inputBase} ${holderName ? activeField : idleField}`} />
//                 </div>
//               </div>

//               {/* Payout Method — Green active */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-3" style={{ color: B.navy }}>Payout Method *</label>
//                 <div className="flex gap-2.5 flex-wrap">
//                   {PAYOUT_METHODS.map(m => (
//                     <button key={m} onClick={() => setPayout(m)}
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all"
//                       style={
//                         payout === m
//                           ? { border: `2px solid ${B.green}`, background: B.greenBg, color: B.greenDark, fontWeight: 700 }
//                           : { border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151" }
//                       }
//                     >
//                       <div className="rounded-full shrink-0 transition-all"
//                         style={{
//                           width: 14, height: 14,
//                           border: payout === m ? `4px solid ${B.green}` : "2px solid #d1d5db",
//                           background: "#fff",
//                         }} />
//                       {m}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Tax ID */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Tax Identification Number</label>
//                 <input type="text" placeholder="e.g., EIN, VAT, GST" value={taxId} onChange={e => setTaxId(e.target.value)}
//                   className={`${inputBase} ${taxId ? activeField : idleField}`} />
//               </div>

//               {/* Security note */}
//               <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
//                 <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//                 <span className="text-xs text-gray-500">All payment data is encrypted and stored securely</span>
//               </div>
//             </div>
//           </div>

//           {/* Nav */}
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">← Back</button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background: B.btnGrad, boxShadow: "0 4px 16px rgba(46,125,31,0.25)" }}
//             >
//               Continue to Permissions →
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
//               <InsightCard type="info">
//                 <span className="text-sm shrink-0">💡</span>
//                 Platform pays only the agency. Team members are paid internally.
//               </InsightCard>
//               {holderFilled && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Account holder name will be matched against legal entity.
//                 </InsightCard>
//               )}
//               {nameMismatch && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Holder name may not match legal entity. Verify before submitting.
//                 </InsightCard>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };
// export default Step7Payment;






// // Step7Payment.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber, MdLockOutline } from "react-icons/md";
// import { BsBank2 } from "react-icons/bs";

// const PAYOUT_METHODS = ["Bank Transfer","PayPal Business","Payoneer","Other"];

// const G = {
//   green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
//   navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
//   gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:"#4b5563", muted:"#9ca3af",
// };

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]";
// const idleField   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step7Payment = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
//   const legalName = formData.legalName || "";
//   const [bankName,   setBankName]   = useState(formData.bankName   || "");
//   const [accNumber,  setAccNumber]  = useState(formData.accNumber  || "");
//   const [swiftCode,  setSwiftCode]  = useState(formData.swiftCode  || "");
//   const [holderName, setHolderName] = useState(formData.holderName || "");
//   const [payout,     setPayout]     = useState(formData.payout     || "Bank Transfer");
//   const [taxId,      setTaxId]      = useState(formData.taxId      || "");

//   const holderFilled = holderName.trim().length > 2;
//   const nameMismatch = holderFilled && legalName && !holderName.toLowerCase().includes(legalName.toLowerCase().split(" ")[0]);
//   const handleNext = () => { updateData({ bankName, accNumber, swiftCode, holderName, payout, taxId }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
//         <div className="flex-1 min-w-0">
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div style={{ height:4, background:G.mixedGrad }} />
//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Payment & Finance Setup</h2>
//               <p className="text-sm mb-4" style={{ color:G.sub }}>Configure how your agency receives payments</p>
//               <div className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
//                 style={{ background:G.navyBg, color:G.navy, borderColor:G.navyBorder }}>PAYMENT SETUP</div>
//               <div className="flex gap-2.5 items-center rounded-xl px-4 py-3.5 mb-6 border"
//                 style={{ background:G.greenBg, borderColor:G.greenBorder }}>
//                 <span className="text-base shrink-0">💵</span>
//                 <span className="text-xs leading-relaxed" style={{ color:G.greenDeep }}>Platform pays only the agency. Team members are paid internally.</span>
//               </div>

//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Legal Entity Name</label>
//                 <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
//                   <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//                   <span className="text-sm text-gray-400">{legalName||"Your Company Ltd."}</span>
//                 </div>
//                 <div className="text-xs mt-1" style={{ color:G.muted }}>Auto-filled — must match documents</div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Bank Name *</label>
//                   <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${bankName ? activeField : idleField}`}>
//                     <BsBank2 className="text-gray-400 text-sm shrink-0" />
//                     <input type="text" placeholder="e.g., Demo Bank" value={bankName} onChange={e=>setBankName(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Account Number *</label>
//                   <input type="text" placeholder="1234567890" value={accNumber} onChange={e=>setAccNumber(e.target.value)}
//                     className={`${inputBase} ${accNumber ? activeField : idleField}`} />
//                 </div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>SWIFT Code</label>
//                   <input type="text" placeholder="e.g., BOFAUS3N" value={swiftCode} onChange={e=>setSwiftCode(e.target.value)}
//                     className={`${inputBase} ${swiftCode ? activeField : idleField}`} />
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Account Holder Name *</label>
//                   <input type="text" placeholder="As per bank records" value={holderName} onChange={e=>setHolderName(e.target.value)}
//                     className={`${inputBase} ${holderName ? activeField : idleField}`} />
//                 </div>
//               </div>

//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Payout Method *</label>
//                 <div className="flex gap-2.5 flex-wrap">
//                   {PAYOUT_METHODS.map(m=>(
//                     <button key={m} onClick={()=>setPayout(m)}
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all"
//                       style={ payout===m
//                         ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
//                         : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
//                       <div className="rounded-full shrink-0" style={{ width:14, height:14,
//                         border: payout===m ? `4px solid ${G.navyLight}` : "2px solid #d1d5db", background:"#fff" }} />
//                       {m}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Tax ID Number</label>
//                 <input type="text" placeholder="e.g., EIN, VAT, GST" value={taxId} onChange={e=>setTaxId(e.target.value)}
//                   className={`${inputBase} ${taxId ? activeField : idleField}`} />
//               </div>

//               <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
//                 <MdLockOutline className="text-gray-400 text-sm shrink-0" />
//                 <span className="text-xs text-gray-500">All payment data is encrypted and stored securely</span>
//               </div>
//             </div>
//           </div>
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer" style={{ color:G.sub }}
//               onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background:G.gradNavy, boxShadow:"0 3px 14px rgba(15,26,59,0.30)" }}
//               onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
//               Continue to Permissions →
//             </button>
//           </div>
//         </div>
//         <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
//           <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div className="flex items-center gap-2 mb-4">
//               <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}>
//                 <MdAutoAwesome className="text-white text-sm" />
//               </div>
//               <span className="text-sm font-bold" style={{ color:G.navyDeep }}>AI Insights</span>
//             </div>
//             <div className="flex flex-col gap-2.5">
//               <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Platform pays only the agency.</InsightCard>
//               {holderFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Holder name will be matched against legal entity.</InsightCard>}
//               {nameMismatch  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Holder name may not match legal entity.</InsightCard>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step7Payment;



// Step7Payment.jsx
import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber, MdLockOutline } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

const PAYOUT_METHODS = ["Bank Transfer","PayPal Business","Payoneer","Other"];

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af", error:"#ef4444",
};

const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]";
const idleField   = "border border-gray-200 bg-white hover:border-gray-300";
const errorField  = "border-[1.5px] border-[#ef4444] bg-[#fff5f5]";

const ErrMsg = ({ msg }) => msg ? <p className="text-xs mt-1 font-medium" style={{ color:G.error }}>⚠ {msg}</p> : null;
const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step7Payment = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
  const legalName = formData.legalName || "";
  const [bankName,   setBankName]   = useState(formData.bankName   || "");
  const [accNumber,  setAccNumber]  = useState(formData.accNumber  || "");
  const [swiftCode,  setSwiftCode]  = useState(formData.swiftCode  || "");
  const [holderName, setHolderName] = useState(formData.holderName || "");
  const [payout,     setPayout]     = useState(formData.payout     || "Bank Transfer");
  const [taxId,      setTaxId]      = useState(formData.taxId      || "");
  const [touched,    setTouch]      = useState({});

  const touch = f => setTouch(p=>({...p,[f]:true}));

  const errors = {
    bankName:   !bankName.trim()   ? "Bank name is required"            : "",
    accNumber:  !accNumber.trim()  ? "Account number is required"       : accNumber.trim().length < 5 ? "Enter a valid account number" : "",
    holderName: !holderName.trim() ? "Account holder name is required"  : holderName.trim().length < 3 ? "Minimum 3 characters" : "",
  };

  const isValid = Object.values(errors).every(e=>e==="");
  const holderFilled = holderName.trim().length > 2;
  const nameMismatch = holderFilled && legalName && !holderName.toLowerCase().includes(legalName.toLowerCase().split(" ")[0]);

  const handleNext = () => {
    setTouch({ bankName:true, accNumber:true, holderName:true });
    if (!isValid) return;
    updateData({ bankName, accNumber, swiftCode, holderName, payout, taxId });
    next();
  };

  const fc = (field, val) => {
    if (touched[field] && errors[field]) return `${inputBase} ${errorField}`;
    if (val) return `${inputBase} ${activeField}`;
    return `${inputBase} ${idleField}`;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />
            <div className="px-6 sm:px-10 py-9">
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Payment & Finance Setup</h2>
              <p className="text-sm mb-4" style={{ color:G.sub }}>Configure how your agency receives payments</p>
              <div className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
                style={{ background:G.navyBg, color:G.navy, borderColor:G.navyBorder }}>PAYMENT SETUP</div>
              <div className="flex gap-2.5 items-center rounded-xl px-4 py-3.5 mb-6 border"
                style={{ background:G.greenBg, borderColor:G.greenBorder }}>
                <span className="text-base shrink-0">💵</span>
                <span className="text-xs leading-relaxed" style={{ color:G.greenDeep }}>Platform pays only the agency. Team members are paid internally.</span>
              </div>

              {/* Legal Name (auto) */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Legal Entity Name</label>
                <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
                  <MdLockOutline className="text-gray-400 text-sm shrink-0"/>
                  <span className="text-sm text-gray-400">{legalName||"Your Company Ltd."}</span>
                </div>
                <p className="text-xs mt-1" style={{ color:G.muted }}>Auto-filled — must match documents</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Bank Name *</label>
                  <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${touched.bankName&&errors.bankName ? errorField : bankName ? activeField : idleField}`}>
                    <BsBank2 className="text-gray-400 text-sm shrink-0"/>
                    <input type="text" placeholder="e.g., HDFC Bank" value={bankName}
                      onChange={e=>setBankName(e.target.value)} onBlur={()=>touch("bankName")}
                      className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"/>
                  </div>
                  <ErrMsg msg={touched.bankName && errors.bankName}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Account Number *</label>
                  <input type="text" placeholder="1234567890" value={accNumber}
                    onChange={e=>setAccNumber(e.target.value)} onBlur={()=>touch("accNumber")}
                    className={fc("accNumber", !!accNumber)}/>
                  <ErrMsg msg={touched.accNumber && errors.accNumber}/>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>SWIFT / Routing Code</label>
                  <input type="text" placeholder="e.g., HDFCINBB" value={swiftCode}
                    onChange={e=>setSwiftCode(e.target.value)}
                    className={`${inputBase} ${swiftCode ? activeField : idleField}`}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Account Holder Name *</label>
                  <input type="text" placeholder="As per bank records" value={holderName}
                    onChange={e=>setHolderName(e.target.value)} onBlur={()=>touch("holderName")}
                    className={fc("holderName", !!holderName)}/>
                  <ErrMsg msg={touched.holderName && errors.holderName}/>
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Payout Method *</label>
                <div className="flex gap-2.5 flex-wrap">
                  {PAYOUT_METHODS.map(m=>(
                    <button key={m} onClick={()=>setPayout(m)}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all"
                      style={ payout===m
                        ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
                        : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
                      <div className="rounded-full shrink-0" style={{ width:14, height:14,
                        border: payout===m?`4px solid ${G.navyLight}`:"2px solid #d1d5db", background:"#fff" }}/>
                      {m}
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Tax Identification Number</label>
                <input type="text" placeholder="e.g., EIN, VAT, GST" value={taxId}
                  onChange={e=>setTaxId(e.target.value)}
                  className={`${inputBase} ${taxId ? activeField : idleField}`}/>
              </div>

              <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
                <MdLockOutline className="text-gray-400 text-sm shrink-0"/>
                <span className="text-xs text-gray-500">All payment data is encrypted and stored securely</span>
              </div>

              {!isValid && Object.values(touched).some(Boolean) && (
                <div className="mt-5 flex gap-2.5 items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-red-700 font-medium">Please fill all required fields correctly.</span>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer" style={{ color:G.sub }}
              onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
            <button onClick={handleNext}
              className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
              style={{ background:isValid?G.gradNavy:"#d1d5db", boxShadow:isValid?"0 3px 14px rgba(15,26,59,0.30)":"none", cursor:isValid?"pointer":"not-allowed" }}
              onMouseEnter={e=>{ if(isValid) e.currentTarget.style.opacity="0.88"; }}
              onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
              Continue to Permissions →
            </button>
          </div>
        </div>

        <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}><MdAutoAwesome className="text-white text-sm"/></div>
              <span className="text-sm font-bold" style={{ color:G.navyDeep }}>AI Insights</span>
            </div>
            <div className="flex flex-col gap-2.5">
              <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Platform pays only the agency.</InsightCard>
              {holderFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Holder name will be matched against legal entity.</InsightCard>}
              {nameMismatch  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>Holder name may not match legal entity.</InsightCard>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step7Payment;