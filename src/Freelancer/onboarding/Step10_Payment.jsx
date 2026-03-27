




// import { useState } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const paymentMethods = [
//   {
//     id: "bank",
//     name: "Bank Transfer",
//     detail: "3-5 business days • 1% fee",
//     recommended: true,
//     icon: (
//       <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
//       </svg>
//     )
//   },
//   {
//     id: "paypal",
//     name: "PayPal",
//     detail: "Instant – 1 day • 2.5% fee",
//     recommended: false,
//     icon: (
//       <svg className="w-6 h-6 wbl-text-blue" fill="currentColor" viewBox="0 0 24 24">
//         <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
//       </svg>
//     )
//   },
//   {
//     id: "payoneer",
//     name: "Payoneer",
//     detail: "1-2 days • 2% fee",
//     recommended: false,
//     icon: (
//       <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
//       </svg>
//     )
//   },
//   {
//     id: "wise",
//     name: "Wise",
//     detail: "1-3 days • 0.5-1.5% fee",
//     recommended: false,
//     icon: (
//       <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
//       </svg>
//     )
//   }
// ];

// const frequencyOptions = ["On request", "Weekly", "Bi-weekly", "Monthly"];

// export default function Step10_Payment({ onNext, onBack, currentStep = 10, totalSteps = 12 }) {
//   const [selectedMethod, setSelectedMethod] = useState("bank");
//   const [bankSaved, setBankSaved]           = useState(false);
//   const [savingBank, setSavingBank]         = useState(false);
//   const [minPayout, setMinPayout]           = useState(100);
//   const [frequency, setFrequency]           = useState("On request");

//   const [bankForm, setBankForm] = useState({
//     accountName: "", bankName: "", accountNumber: "",
//     routingNumber: "", accountType: "Checking", swift: "", currency: "USD"
//   });
//   const [bankErrors, setBankErrors] = useState({});

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
//   const selectedName    = paymentMethods.find(m => m.id === selectedMethod)?.name || "";

//   const setBank = (field, val) => {
//     setBankForm(p => ({ ...p, [field]: val }));
//     setBankErrors(p => ({ ...p, [field]: "" }));
//   };

//   const validateBank = () => {
//     const e = {};
//     if (!bankForm.accountName.trim())   e.accountName   = "Required";
//     if (!bankForm.bankName.trim())      e.bankName      = "Required";
//     if (!bankForm.accountNumber.trim()) e.accountNumber = "Required";
//     if (!bankForm.routingNumber.trim()) e.routingNumber = "Required";
//     setBankErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const handleSaveBank = () => {
//     if (!validateBank()) return;
//     setSavingBank(true);
//     setTimeout(() => { setSavingBank(false); setBankSaved(true); }, 1200);
//   };

//   const inputCls = (f) =>
//     `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-green-100
//     ${bankErrors[f] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-green-400"}`;

//   const Err = ({ f }) => bankErrors[f]
//     ? <p className="text-red-500 text-xs mt-1">{bankErrors[f]}</p> : null;

//   const getInsights = () => {
//     const insights = [];
//     insights.push({ status: "good", msg: `Payout method: ${selectedName}` });
//     if (selectedMethod === "bank" && !bankSaved)
//       insights.push({ status: "tip", msg: "Fill in your bank details below to complete setup." });
//     if (selectedMethod === "bank" && bankSaved)
//       insights.push({ status: "good", msg: "Bank Transfer — lowest fee (1%), best for large payouts." });
//     if (bankSaved)
//       insights.push({ status: "good", msg: "Bank account verified and saved securely." });
//     if (selectedMethod === "paypal")
//       insights.push({ status: "warn", msg: "PayPal has a 2.5% fee — higher than Bank Transfer." });
//     if (minPayout <= 50)
//       insights.push({ status: "tip", msg: "Low threshold means more frequent transfers — higher fees." });
//     return insights;
//   };
//   const insights = getInsights();

//   return (
//     <>
//       <style>{`
//         .wbl-bg, .wbl-btn-inline {
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//         }
//         .wbl-btn-primary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//           color:#fff !important; border:none; cursor:pointer;
//           font-weight:600; border-radius:12px; padding:12px 32px; font-size:15px;
//           box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s;
//         }
//         .wbl-btn-primary:hover { opacity:0.9; transform:translateY(-1px); }
//         .wbl-progress-bar { background:linear-gradient(90deg,#6FDA44,#1B72C0) !important; }
//         .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
//         .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }
//         .wbl-text-active, .wbl-text-blue { color:#1B72C0 !important; }
//       `}</style>
//     <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F4F9FF" }}>

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
//         <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//             </svg>
//             <span className="hidden sm:inline">Save &amp; Exit</span>
//           </button>
//         </div>
//       </header>

//       {/* ── Progress Steps ── */}
//       <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
//         <div className="flex justify-between text-xs sm:text-sm mb-3">
//           <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
//           <span className="wbl-text-blue font-semibold">{percentComplete}% Complete</span>
//         </div>
//         <div className="relative flex items-start justify-between">
//           <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
//           <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-bg z-0 rounded-full transition-all duration-500"
//             style={{ width: progressWidth }}></div>
//           {stepLabels.map((label, index) => {
//             const isActive = index + 1 === currentStep;
//             const isDone   = index + 1 < currentStep;
//             return (
//               <div key={index} className="flex flex-col items-center z-10 relative">
//                 <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
//                   ${isActive ? "bg-white wbl-step-active shadow-md"
//                     : isDone  ? "wbl-bg border-green-400 text-white"
//                     :           "bg-white border-gray-300 text-gray-400"}`}>
//                   {isDone
//                     ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
//                       </svg>
//                     : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
//                 </div>
//                 <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
//                   ${isActive ? "wbl-text-active" : "text-gray-400"}`}>
//                   {label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Two-Column Layout ── */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="flex flex-col lg:flex-row gap-6 items-start">

//           {/* ── Main Card ── */}
//           <div className="w-full lg:flex-1 min-w-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

//               <h1 className="text-xl sm:text-2xl font-bold mb-1">Set Up Your Payment Method</h1>
//               <p className="text-sm text-gray-500 mb-5">Tell us where to send your earnings</p>

//               <div className="mb-6">
//                 <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                   Payment Setup
//                 </span>
//               </div>

//               {/* Info banner */}
//               <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3.5 mb-6">
//                 <span className="text-lg flex-shrink-0">💡</span>
//                 <p className="text-sm text-yellow-800">
//                   This is how YOU receive money from clients. Platform pays you directly for completed milestones.
//                 </p>
//               </div>

//               {/* Payment Method Grid */}
//               <div className="grid grid-cols-2 gap-3">
//                 {paymentMethods.map((method) => {
//                   const isSelected = selectedMethod === method.id;
//                   return (
//                     <button
//                       key={method.id}
//                       onClick={() => { setSelectedMethod(method.id); setBankSaved(false); }}
//                       className={`relative text-left p-4 rounded-xl border-2 transition-all hover:shadow-sm
//                         ${isSelected
//                           ? "border-green-400 bg-green-50"
//                           : "border-gray-200 bg-white hover:border-blue-300 hover:bg-green-50"}`}
//                     >
//                       <div className="flex items-center gap-3 mb-1.5">
//                         {method.icon}
//                         <span className="text-sm font-bold text-gray-800">{method.name}</span>
//                       </div>
//                       <p className="text-xs text-gray-500">{method.detail}</p>
//                       {method.recommended && (
//                         <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
//                           Recommended
//                         </span>
//                       )}
//                       {isSelected && (
//                         <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
//                           <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
//                           </svg>
//                         </div>
//                       )}
//                     </button>
//                   );
//                 })}
//               </div>

//               {selectedMethod === "bank" && (
//                 <div className="mt-4 border-2 border-green-200 rounded-2xl overflow-hidden">
//                   <div className="bg-green-50 px-5 py-3.5 flex items-center gap-3 border-b border-green-200">
//                     <div className="w-8 h-8 rounded-lg bg-green-200 flex items-center justify-center flex-shrink-0">
//                       <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
//                       </svg>
//                     </div>
//                     <div>
//                       <p className="text-sm font-bold text-green-800">Bank Account Details</p>
//                       <p className="text-xs text-green-600">Securely enter your bank information below</p>
//                     </div>
//                     {bankSaved && (
//                       <span className="ml-auto flex items-center gap-1.5 text-xs font-bold text-green-700 bg-white border border-green-300 px-2.5 py-1 rounded-full">
//                         <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
//                         </svg>
//                         Saved
//                       </span>
//                     )}
//                   </div>

//                   <div className="px-5 py-5 space-y-4 bg-white">
//                     <div className="flex items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-2.5">
//                       <svg className="w-4 h-4 wbl-text-blue flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
//                       </svg>
//                       <p className="text-xs text-blue-700 font-medium">
//                         256-bit SSL encrypted — your bank details are never shared with clients.
//                       </p>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                         Account Holder Name <span className="text-red-500">*</span>
//                       </label>
//                       <input type="text" value={bankForm.accountName}
//                         onChange={e => setBank("accountName", e.target.value)}
//                         placeholder="Full legal name as on bank account"
//                         className={inputCls("accountName")}/>
//                       <Err f="accountName"/>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                         Bank Name <span className="text-red-500">*</span>
//                       </label>
//                       <input type="text" value={bankForm.bankName}
//                         onChange={e => setBank("bankName", e.target.value)}
//                         placeholder="e.g. Chase, HDFC, Barclays"
//                         className={inputCls("bankName")}/>
//                       <Err f="bankName"/>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                           Account Number <span className="text-red-500">*</span>
//                         </label>
//                         <input type="text" value={bankForm.accountNumber}
//                           onChange={e => setBank("accountNumber", e.target.value.replace(/\D/g, ""))}
//                           placeholder="••••••••••"
//                           className={inputCls("accountNumber")}/>
//                         <Err f="accountNumber"/>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1.5">Account Type</label>
//                         <div className="relative">
//                           <select value={bankForm.accountType}
//                             onChange={e => setBank("accountType", e.target.value)}
//                             className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
//                             <option>Checking</option>
//                             <option>Savings</option>
//                             <option>Business</option>
//                           </select>
//                           <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                           </svg>
//                         </div>
//                       </div>
//                     </div>

//                     <div>
//                       <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                         Routing / IFSC Number <span className="text-red-500">*</span>
//                       </label>
//                       <input type="text" value={bankForm.routingNumber}
//                         onChange={e => setBank("routingNumber", e.target.value)}
//                         placeholder="9-digit routing or IFSC code"
//                         className={inputCls("routingNumber")}/>
//                       <Err f="routingNumber"/>
//                     </div>

//                     <div className="grid grid-cols-2 gap-3">
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1.5">
//                           SWIFT / BIC
//                           <span className="text-gray-400 font-normal text-xs ml-1">(international)</span>
//                         </label>
//                         <input type="text" value={bankForm.swift}
//                           onChange={e => setBank("swift", e.target.value.toUpperCase())}
//                           placeholder="e.g. CHASUS33"
//                           className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"/>
//                       </div>
//                       <div>
//                         <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency</label>
//                         <div className="relative">
//                           <select value={bankForm.currency}
//                             onChange={e => setBank("currency", e.target.value)}
//                             className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
//                             {["USD", "EUR", "GBP", "INR", "CAD", "AUD", "SGD"].map(c => <option key={c}>{c}</option>)}
//                           </select>
//                           <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                           </svg>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="flex items-center gap-2 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-500">
//                       <svg className="w-4 h-4 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                       </svg>
//                       3-5 business days · 1% platform fee · Lowest fee of all methods
//                     </div>

//                     {!bankSaved ? (
//                       <button onClick={handleSaveBank} disabled={savingBank}
//                         className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 disabled:opacity-60 flex items-center justify-center gap-2 transition shadow-sm">
//                         {savingBank ? (
//                           <>
//                             <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                               <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                               <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                             </svg>
//                             Saving...
//                           </>
//                         ) : "Save Bank Account"}
//                       </button>
//                     ) : (
//                       <div className="flex items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
//                         <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                         <span className="text-sm font-semibold text-green-800 flex-1">Bank account saved securely ✓</span>
//                         <button onClick={() => setBankSaved(false)}
//                           className="text-xs wbl-text-blue hover:underline font-medium">Edit</button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}

//               {/* ── Payout Preferences ── */}
//               <div className="border-t border-gray-100 pt-6 mt-6">
//                 <h3 className="text-base font-bold text-gray-800 mb-5">Payout Preferences</h3>

//                 <div className="mb-6">
//                   <label className="block text-sm font-semibold text-gray-700 mb-3">
//                     Minimum Payout: <span className="wbl-text-active">${minPayout}</span>
//                   </label>
//                   <input
//                     type="range" min={25} max={500} step={25} value={minPayout}
//                     onChange={e => setMinPayout(Number(e.target.value))}
//                     className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
//                     style={{
//                       background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((minPayout - 25) / 475) * 100}%, #e5e7eb ${((minPayout - 25) / 475) * 100}%, #e5e7eb 100%)`
//                     }}
//                   />
//                   <div className="flex justify-between text-xs text-gray-400 mt-1.5">
//                     <span>$25</span><span>$500</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mt-2">Earnings below this threshold accumulate until met</p>
//                 </div>

//                 <div>
//                   <label className="block text-sm font-semibold text-gray-700 mb-2">Payout Frequency</label>
//                   <div className="relative">
//                     <select value={frequency} onChange={e => setFrequency(e.target.value)}
//                       className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
//                       {frequencyOptions.map(f => <option key={f}>{f}</option>)}
//                     </select>
//                     <svg className="absolute right-4 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
//                     </svg>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between mt-6">
//               <button onClick={onBack}
//                 className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//                 ← Back
//               </button>
//               <button onClick={onNext}
//                 className="wbl-btn-inline text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
//                 Continue to Trust Level
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── AI Insights Panel ── */}
//           <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span className="font-bold text-gray-800 text-sm">AI Insights</span>
//               </div>

//               <div className="space-y-2">
//                 {insights.map((insight, i) => (
//                   <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
//                     ${insight.status === "good" ? "bg-green-50 border border-green-100 text-green-800"
//                       : insight.status === "warn" ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
//                       : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
//                     {insight.status === "good"
//                       ? <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
//                       : insight.status === "warn"
//                       ? <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
//                       : <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
//                     }
//                     {insight.msg}
//                   </div>
//                 ))}
//               </div>

//               <div className="mt-4 pt-4 border-t border-gray-100">
//                 <p className="text-xs font-semibold text-gray-600 mb-2">Your payout settings:</p>
//                 <div className="space-y-1.5 text-xs text-gray-600">
//                   <div className="flex justify-between">
//                     <span>Method</span>
//                     <span className="font-semibold text-gray-800">{selectedName}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Min payout</span>
//                     <span className="font-semibold text-gray-800">${minPayout}</span>
//                   </div>
//                   <div className="flex justify-between">
//                     <span>Frequency</span>
//                     <span className="font-semibold text-gray-800">{frequency}</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//     </>
//   );
// }











import { useState } from "react";

const stepLabels =[
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const paymentMethods =[
  {
    id: "bank",
    name: "Bank Transfer",
    detail: "3-5 business days • 1% fee",
    recommended: true,
    icon: (
      <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
      </svg>
    )
  },
  {
    id: "paypal",
    name: "PayPal",
    detail: "Instant – 1 day • 2.5% fee",
    recommended: false,
    icon: (
      <svg className="w-6 h-6 wbl-text-blue" fill="currentColor" viewBox="0 0 24 24">
        <path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/>
      </svg>
    )
  },
  {
    id: "payoneer",
    name: "Payoneer",
    detail: "1-2 days • 2% fee",
    recommended: false,
    icon: (
      <svg className="w-6 h-6 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/>
      </svg>
    )
  },
  {
    id: "wise",
    name: "Wise",
    detail: "1-3 days • 0.5-1.5% fee",
    recommended: false,
    icon: (
      <svg className="w-6 h-6 text-teal-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
      </svg>
    )
  }
];

const frequencyOptions =["On request", "Weekly", "Bi-weekly", "Monthly"];

export default function Step10_Payment({ onNext, onBack, currentStep = 10, totalSteps = 12 }) {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [bankSaved, setBankSaved]           = useState(false);
  const[savingBank, setSavingBank]         = useState(false);
  const [minPayout, setMinPayout]           = useState(100);
  const [frequency, setFrequency]           = useState("On request");

  const [bankForm, setBankForm] = useState({
    accountName: "", bankName: "", accountNumber: "",
    routingNumber: "", accountType: "Checking", swift: "", currency: "USD"
  });
  const [bankErrors, setBankErrors] = useState({});

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  const selectedName    = paymentMethods.find(m => m.id === selectedMethod)?.name || "";

  const setBank = (field, val) => {
    setBankForm(p => ({ ...p, [field]: val }));
    setBankErrors(p => ({ ...p, [field]: "" }));
  };

  const validateBank = () => {
    const e = {};
    if (!bankForm.accountName.trim())   e.accountName   = "Required";
    if (!bankForm.bankName.trim())      e.bankName      = "Required";
    if (!bankForm.accountNumber.trim()) e.accountNumber = "Required";
    if (!bankForm.routingNumber.trim()) e.routingNumber = "Required";
    setBankErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSaveBank = () => {
    if (!validateBank()) return;
    setSavingBank(true);
    setTimeout(() => { setSavingBank(false); setBankSaved(true); }, 1200);
  };

  const inputCls = (f) =>
    `w-full border rounded-xl px-3 py-2.5 text-sm outline-none transition focus:ring-2 focus:ring-green-100
    ${bankErrors[f] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-green-400"}`;

  const Err = ({ f }) => bankErrors[f]
    ? <p className="text-red-500 text-xs mt-1">{bankErrors[f]}</p> : null;

  const getInsights = () => {
    const insights =[];
    insights.push({ status: "good", msg: `Payout method: ${selectedName}` });
    if (selectedMethod === "bank" && !bankSaved)
      insights.push({ status: "tip", msg: "Fill in your bank details below to complete setup." });
    if (selectedMethod === "bank" && bankSaved)
      insights.push({ status: "good", msg: "Bank Transfer — lowest fee (1%), best for large payouts." });
    if (bankSaved)
      insights.push({ status: "good", msg: "Bank account verified and saved securely." });
    if (selectedMethod === "paypal")
      insights.push({ status: "warn", msg: "PayPal has a 2.5% fee — higher than Bank Transfer." });
    if (minPayout <= 50)
      insights.push({ status: "tip", msg: "Low threshold means more frequent transfers — higher fees." });
    return insights;
  };
  const insights = getInsights();

  return (
    <>
      <style>{`
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
        /* Hide scrollbar for progress bar on mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F4F9FF" }}>

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <img src="/weblance.jpeg" alt="Weblance" style={{height: 54, width: 155, display: "block" }} />
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="hidden sm:inline">Save &amp; Exit</span>
          </button>
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-3">
          <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="wbl-text-blue font-semibold">{percentComplete}% Complete</span>
        </div>
        
        {/* Responsive Progress Bar Wrapper */}
        <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
          <div className="relative flex items-start justify-between min-w-[500px] sm:min-w-0">
            <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
            <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-bg z-0 rounded-full transition-all duration-500"
              style={{ width: progressWidth }}></div>
            {stepLabels.map((label, index) => {
              const isActive = index + 1 === currentStep;
              const isDone   = index + 1 < currentStep;
              return (
                <div key={index} className="flex flex-col items-center z-10 relative">
                  <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
                    ${isActive ? "bg-white wbl-step-active shadow-md"
                      : isDone  ? "wbl-bg border-green-400 text-white"
                      :           "bg-white border-gray-300 text-gray-400"}`}>
                    {isDone
                      ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
                  </div>
                  <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
                    ${isActive ? "wbl-text-active" : "text-gray-400"}`}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Set Up Your Payment Method</h1>
              <p className="text-sm text-gray-500 mb-5">Tell us where to send your earnings</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Payment Setup
                </span>
              </div>

              {/* Info banner */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3.5 mb-6">
                <span className="text-lg flex-shrink-0">💡</span>
                <p className="text-sm text-yellow-800">
                  This is how YOU receive money from clients. Platform pays you directly for completed milestones.
                </p>
              </div>

              {/* Payment Method Grid (Responsive) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                {paymentMethods.map((method) => {
                  const isSelected = selectedMethod === method.id;
                  return (
                    <button
                      key={method.id}
                      onClick={() => { setSelectedMethod(method.id); setBankSaved(false); }}
                      className={`relative text-left p-4 rounded-xl border-2 transition-all hover:shadow-sm
                        ${isSelected
                          ? "border-green-400 bg-green-50"
                          : "border-gray-200 bg-white hover:border-blue-300 hover:bg-green-50"}`}
                    >
                      <div className="flex items-center gap-3 mb-1.5">
                        {method.icon}
                        <span className="text-sm font-bold text-gray-800">{method.name}</span>
                      </div>
                      <p className="text-xs text-gray-500">{method.detail}</p>
                      {method.recommended && (
                        <span className="inline-block mt-2 text-xs font-bold text-green-600 bg-green-100 px-2 py-0.5 rounded-full">
                          Recommended
                        </span>
                      )}
                      {isSelected && (
                        <div className="absolute top-2.5 right-2.5 w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                          <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        </div>
                      )}
                    </button>
                  );
                })}
              </div>

              {selectedMethod === "bank" && (
                <div className="mt-5 sm:mt-6 border-2 border-green-200 rounded-2xl overflow-hidden">
                  <div className="bg-green-50 px-4 sm:px-5 py-3.5 flex flex-col sm:flex-row sm:items-center gap-3 border-b border-green-200">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-8 h-8 rounded-lg bg-green-200 flex items-center justify-center flex-shrink-0">
                        <svg className="w-4 h-4 text-green-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/>
                        </svg>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-green-800 truncate">Bank Account Details</p>
                        <p className="text-xs text-green-600 truncate">Securely enter your bank information below</p>
                      </div>
                    </div>
                    {bankSaved && (
                      <span className="sm:ml-auto inline-flex items-center gap-1.5 text-xs font-bold text-green-700 bg-white border border-green-300 px-2.5 py-1 rounded-full w-max">
                        <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        Saved
                      </span>
                    )}
                  </div>

                  <div className="px-4 sm:px-5 py-5 space-y-4 bg-white">
                    <div className="flex items-start sm:items-center gap-2.5 bg-blue-50 border border-blue-100 rounded-xl px-3.5 py-2.5">
                      <svg className="w-4 h-4 wbl-text-blue flex-shrink-0 mt-0.5 sm:mt-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                      </svg>
                      <p className="text-xs text-blue-700 font-medium">
                        256-bit SSL encrypted — your bank details are never shared with clients.
                      </p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Account Holder Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={bankForm.accountName}
                        onChange={e => setBank("accountName", e.target.value)}
                        placeholder="Full legal name as on bank account"
                        className={inputCls("accountName")}/>
                      <Err f="accountName"/>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Bank Name <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={bankForm.bankName}
                        onChange={e => setBank("bankName", e.target.value)}
                        placeholder="e.g. Chase, HDFC, Barclays"
                        className={inputCls("bankName")}/>
                      <Err f="bankName"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          Account Number <span className="text-red-500">*</span>
                        </label>
                        <input type="text" value={bankForm.accountNumber}
                          onChange={e => setBank("accountNumber", e.target.value.replace(/\D/g, ""))}
                          placeholder="••••••••••"
                          className={inputCls("accountNumber")}/>
                        <Err f="accountNumber"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Account Type</label>
                        <div className="relative">
                          <select value={bankForm.accountType}
                            onChange={e => setBank("accountType", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
                            <option>Checking</option>
                            <option>Savings</option>
                            <option>Business</option>
                          </select>
                          <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                        Routing / IFSC Number <span className="text-red-500">*</span>
                      </label>
                      <input type="text" value={bankForm.routingNumber}
                        onChange={e => setBank("routingNumber", e.target.value)}
                        placeholder="9-digit routing or IFSC code"
                        className={inputCls("routingNumber")}/>
                      <Err f="routingNumber"/>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">
                          SWIFT / BIC
                          <span className="text-gray-400 font-normal text-xs ml-1">(international)</span>
                        </label>
                        <input type="text" value={bankForm.swift}
                          onChange={e => setBank("swift", e.target.value.toUpperCase())}
                          placeholder="e.g. CHASUS33"
                          className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition"/>
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1.5">Currency</label>
                        <div className="relative">
                          <select value={bankForm.currency}
                            onChange={e => setBank("currency", e.target.value)}
                            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
                            {["USD", "EUR", "GBP", "INR", "CAD", "AUD", "SGD"].map(c => <option key={c}>{c}</option>)}
                          </select>
                          <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                          </svg>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-start sm:items-center gap-2 bg-gray-50 rounded-xl px-3.5 py-2.5 text-xs text-gray-500">
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5 sm:mt-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                      3-5 business days · 1% platform fee · Lowest fee of all methods
                    </div>

                    {!bankSaved ? (
                      <button onClick={handleSaveBank} disabled={savingBank}
                        className="w-full py-3 rounded-xl text-sm font-semibold text-white bg-green-500 hover:bg-green-600 disabled:opacity-60 flex items-center justify-center gap-2 transition shadow-sm">
                        {savingBank ? (
                          <>
                            <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                            </svg>
                            Saving...
                          </>
                        ) : "Save Bank Account"}
                      </button>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 bg-green-50 border border-green-200 rounded-xl px-4 py-3">
                        <div className="flex items-center gap-2 flex-1">
                          <svg className="w-5 h-5 text-green-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                          <span className="text-sm font-semibold text-green-800">Bank account saved securely ✓</span>
                        </div>
                        <button onClick={() => setBankSaved(false)}
                          className="text-xs wbl-text-blue hover:underline font-medium text-left sm:text-right pl-7 sm:pl-0">Edit</button>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Payout Preferences ── */}
              <div className="border-t border-gray-100 pt-6 mt-6">
                <h3 className="text-base font-bold text-gray-800 mb-5">Payout Preferences</h3>

                <div className="mb-6">
                  <label className="block text-sm font-semibold text-gray-700 mb-3">
                    Minimum Payout: <span className="wbl-text-active">${minPayout}</span>
                  </label>
                  <input
                    type="range" min={25} max={500} step={25} value={minPayout}
                    onChange={e => setMinPayout(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((minPayout - 25) / 475) * 100}%, #e5e7eb ${((minPayout - 25) / 475) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>$25</span><span>$500</span>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Earnings below this threshold accumulate until met</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payout Frequency</label>
                  <div className="relative">
                    <select value={frequency} onChange={e => setFrequency(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm bg-gray-50 outline-none appearance-none focus:border-green-400 focus:ring-2 focus:ring-green-100 transition">
                      {frequencyOptions.map(f => <option key={f}>{f}</option>)}
                    </select>
                    <svg className="absolute right-4 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation (Responsive) */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-6">
              <button onClick={onBack}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext}
                className="w-full sm:w-auto wbl-btn-inline text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm">
                Continue to Trust Level
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
                    ${insight.status === "good" ? "bg-green-50 border border-green-100 text-green-800"
                      : insight.status === "warn" ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
                      : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
                    {insight.status === "good"
                      ? <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                      : insight.status === "warn"
                      ? <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                      : <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                    }
                    {insight.msg}
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">Your payout settings:</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Method</span>
                    <span className="font-semibold text-gray-800">{selectedName}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Min payout</span>
                    <span className="font-semibold text-gray-800">${minPayout}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Frequency</span>
                    <span className="font-semibold text-gray-800">{frequency}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
    </>
  );
}