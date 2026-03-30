// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
// import { FiUser, FiPhone } from "react-icons/fi";
// import { FaLinkedinIn } from "react-icons/fa";

// const COUNTRY_CODES = [
//   { code: "+1" },{ code: "+44" },{ code: "+91" },{ code: "+61" },
//   { code: "+49" },{ code: "+33" },{ code: "+65" },{ code: "+971" },{ code: "+92" },{ code: "+55" },
// ];
// const ROLES = ["Founder", "Director", "Manager"];

// const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
// const idleField = "border border-gray-200 bg-white";

// const InsightCard = ({ type, children }) => {
//   const s = { success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
//   return <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>{children}</div>;
// };

// const Step2Admin = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [firstName,   setFirstName]   = useState(formData.firstName   || "");
//   const [lastName,    setLastName]    = useState(formData.lastName    || "");
//   const [role,        setRole]        = useState(formData.adminRole   || "");
//   const [countryCode, setCountryCode] = useState(formData.countryCode || "+1");
//   const [phone,       setPhone]       = useState(formData.phone       || "");
//   const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
//   const [verified,    setVerified]    = useState(false);

//   const linkedinFilled = linkedin.trim().length > 0;
//   const phoneFilled    = phone.trim().length >= 7;

//   const handleNext = () => { updateData({ firstName, lastName, adminRole: role, countryCode, phone, linkedin }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Who Controls This Agency?</h2>
//           <p className="text-sm text-gray-500 mb-8">We need one accountable human for legal and dispute purposes</p>

//           {/* Name Row */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">First Name *</label>
//               <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${firstName ? activeField : idleField}`}>
//                 <FiUser className="text-gray-400 text-sm shrink-0" />
//                 <input type="text" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)}
//                   className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name *</label>
//               <input type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)}
//                 className={`${inputBase} ${lastName ? activeField : idleField}`} />
//             </div>
//           </div>

//           {/* Role */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-900 mb-3">Agency Admin Role *</label>
//             <div className="flex gap-3 flex-wrap">
//               {ROLES.map(r => (
//                 <button key={r} onClick={() => setRole(r)}
//                   className={`flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all
//                     ${role === r ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
//                   <div className={`w-4 h-4 rounded-full shrink-0 transition-all ${role === r ? "border-[5px] border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
//                   {r}
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* Phone */}
//           <div className="mb-6">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Admin Phone Number *</label>
//             <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
//               <div className="relative">
//                 <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
//                   className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]">
//                   {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
//                 </select>
//                 <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
//               </div>
//               <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${phone ? activeField : idleField}`}>
//                 <FiPhone className="text-gray-400 text-sm shrink-0" />
//                 <input type="tel" placeholder="1234567890" value={phone} onChange={e => setPhone(e.target.value)}
//                   className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//               </div>
//               <button onClick={() => phoneFilled && setVerified(true)}
//                 className={`px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all
//                   ${verified ? "border-[1.5px] border-green-400 bg-green-50 text-green-600" : "border-[1.5px] border-blue-400 bg-white text-blue-500"}`}>
//                 {verified ? "✓ Verified" : "Verify"}
//               </button>
//             </div>
//           </div>

//           {/* LinkedIn */}
//           <div>
//             <label className="block text-sm font-semibold text-gray-900 mb-2">
//               Admin LinkedIn Profile <span className="text-xs text-gray-400 font-normal">(Optional - helps build trust)</span>
//             </label>
//             <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
//               <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0" />
//               <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={e => setLinkedin(e.target.value)}
//                 className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">← Back</button>
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Business Profile →
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
//             {!linkedinFilled && <InsightCard type="info"><span className="text-base shrink-0">💡</span>Adding your LinkedIn profile helps build trust with potential clients.</InsightCard>}
//             {linkedinFilled && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />LinkedIn added — boosts trust score!</InsightCard>}
//             {verified && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Phone number verified successfully!</InsightCard>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step2Admin;








// // Step2Admin.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
// import { FiUser, FiPhone } from "react-icons/fi";
// import { FaLinkedinIn } from "react-icons/fa";

// const COUNTRY_CODES = [
//   { code: "+1" },{ code: "+44" },{ code: "+91" },{ code: "+61" },
//   { code: "+49" },{ code: "+33" },{ code: "+65" },{ code: "+971" },{ code: "+92" },{ code: "+55" },
// ];
// const ROLES = ["Founder", "Director", "Manager"];

// /* ── WebLance 3-color tokens ── */
// const B = {
//   navy:      "#0F1A3B",
//   navyMid:   "#1A2B5E",
//   green:     "#6EC030",
//   greenDark: "#2E7D1F",
//   navyGrad:  "linear-gradient(135deg, #0F1A3B 0%, #1A2B5E 100%)",
//   mixedGrad: "linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   greenBg:   "#f0f7e8",
//   greenBdr:  "#b8e08a",
//   navyBg:    "#eef1f8",
//   navyBdr:   "#c2ccdf",
// };

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// /* Active → Green border like Step1 */
// const activeField = "border-[1.5px] border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.12)]";
// const idleField   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const s = {
//     success: "bg-[#f0f7e8] border-[#b8e08a] text-[#2E7D1F]",
//     info:    "bg-[#eef1f8] border-[#c2ccdf] text-[#1A2B5E]",
//   };
//   return (
//     <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step2Admin = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [firstName,   setFirstName]   = useState(formData.firstName   || "");
//   const [lastName,    setLastName]    = useState(formData.lastName    || "");
//   const [role,        setRole]        = useState(formData.adminRole   || "");
//   const [countryCode, setCountryCode] = useState(formData.countryCode || "+91");
//   const [phone,       setPhone]       = useState(formData.phone       || "");
//   const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
//   const [verified,    setVerified]    = useState(false);

//   const linkedinFilled = linkedin.trim().length > 0;
//   const phoneFilled    = phone.trim().length >= 7;

//   const handleNext = () => {
//     updateData({ firstName, lastName, adminRole: role, countryCode, phone, linkedin });
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
//                 Who Controls This Agency?
//               </h2>
//               <p className="text-sm text-gray-500 mb-8">
//                 We need one accountable human for legal and dispute purposes
//               </p>

//               {/* Name Row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>First Name *</label>
//                   <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${firstName ? activeField : idleField}`}>
//                     <FiUser className="text-gray-400 text-sm shrink-0" />
//                     <input
//                       type="text" placeholder="John" value={firstName}
//                       onChange={e => setFirstName(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"
//                     />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Last Name *</label>
//                   <input
//                     type="text" placeholder="Doe" value={lastName}
//                     onChange={e => setLastName(e.target.value)}
//                     className={`${inputBase} ${lastName ? activeField : idleField}`}
//                   />
//                 </div>
//               </div>

//               {/* Role — active: Green border + bg */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-3" style={{ color: B.navy }}>Agency Admin Role *</label>
//                 <div className="flex gap-3 flex-wrap">
//                   {ROLES.map(r => (
//                     <button
//                       key={r} onClick={() => setRole(r)}
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all"
//                       style={
//                         role === r
//                           ? { border: `2px solid ${B.green}`, background: B.greenBg, color: B.greenDark, fontWeight: 700 }
//                           : { border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151" }
//                       }
//                     >
//                       {/* Radio dot → Green when active, Navy when done */}
//                       <div
//                         className="w-4 h-4 rounded-full shrink-0 transition-all"
//                         style={
//                           role === r
//                             ? { border: `5px solid ${B.green}`, background: "#fff" }
//                             : { border: "2px solid #d1d5db", background: "#fff" }
//                         }
//                       />
//                       {r}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Admin Phone Number *</label>
//                 <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
//                   <div className="relative">
//                     <select
//                       value={countryCode} onChange={e => setCountryCode(e.target.value)}
//                       className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]"
//                     >
//                       {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
//                     </select>
//                     <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
//                   </div>

//                   <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${phone ? activeField : idleField}`}>
//                     <FiPhone className="text-gray-400 text-sm shrink-0" />
//                     <input
//                       type="tel" placeholder="1234567890" value={phone}
//                       onChange={e => setPhone(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"
//                     />
//                   </div>

//                   {/* Verify button → Navy outline idle, Green when verified */}
//                   <button
//                     onClick={() => phoneFilled && setVerified(true)}
//                     className="px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all"
//                     style={
//                       verified
//                         ? { border: `1.5px solid ${B.green}`, background: B.greenBg, color: B.greenDark }
//                         : { border: `1.5px solid ${B.navyMid}`, background: "#fff", color: B.navyMid }
//                     }
//                   >
//                     {verified ? "✓ Verified" : "Verify"}
//                   </button>
//                 </div>
//               </div>

//               {/* LinkedIn */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Admin LinkedIn Profile{" "}
//                   <span className="text-xs text-gray-400 font-normal">(Optional - helps build trust)</span>
//                 </label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
//                   <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0" />
//                   <input
//                     type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin}
//                     onChange={e => setLinkedin(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"
//                   />
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Nav buttons */}
//           <div className="flex justify-between items-center pt-5">
//             <button
//               onClick={prev}
//               className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
//             >
//               ← Back
//             </button>
//             {/* Continue → Navy gradient like Step1 */}
//             <button
//               onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{
//                 background: B.navyGrad,
//                 boxShadow: "0 4px 14px rgba(15,26,59,0.28)",
//               }}
//             >
//               Continue to Business Profile →
//             </button>
//           </div>
//         </div>

//         {/* ── AI Insights ── */}
//         <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
//           <div className="bg-white border rounded-2xl p-5 shadow-sm" style={{ borderColor: B.greenBdr }}>
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
//               {!linkedinFilled && (
//                 <InsightCard type="info">
//                   <span className="text-base shrink-0">💡</span>
//                   Adding your LinkedIn profile helps build trust with potential clients.
//                 </InsightCard>
//               )}
//               {linkedinFilled && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   LinkedIn added — boosts trust score!
//                 </InsightCard>
//               )}
//               {verified && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Phone number verified successfully!
//                 </InsightCard>
//               )}
//               {!linkedinFilled && !verified && (
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

// export default Step2Admin;







// // Step2Admin.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
// import { FiUser, FiPhone } from "react-icons/fi";
// import { FaLinkedinIn } from "react-icons/fa";

// const COUNTRY_CODES = [
//   { code: "+1" },{ code: "+44" },{ code: "+91" },{ code: "+61" },
//   { code: "+49" },{ code: "+33" },{ code: "+65" },{ code: "+971" },{ code: "+92" },{ code: "+55" },
// ];
// const ROLES = ["Founder", "Director", "Manager"];

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
//     success: "bg-[#f0f7e8] border-[#b8e08a] text-[#2E7D1F]",
//     info:    "bg-[#eef1f8] border-[#c2ccdf] text-[#1A2B5E]",
//   };
//   return (
//     <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step2Admin = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [firstName,   setFirstName]   = useState(formData.firstName   || "");
//   const [lastName,    setLastName]    = useState(formData.lastName    || "");
//   const [role,        setRole]        = useState(formData.adminRole   || "");
//   const [countryCode, setCountryCode] = useState(formData.countryCode || "+91");
//   const [phone,       setPhone]       = useState(formData.phone       || "");
//   const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
//   const [verified,    setVerified]    = useState(false);

//   const linkedinFilled = linkedin.trim().length > 0;
//   const phoneFilled    = phone.trim().length >= 7;

//   const handleNext = () => {
//     updateData({ firstName, lastName, adminRole: role, countryCode, phone, linkedin });
//     next();
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">

//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>
//                 Who Controls This Agency?
//               </h2>
//               <p className="text-sm text-gray-500 mb-8">
//                 We need one accountable human for legal and dispute purposes
//               </p>

//               {/* Name Row */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>First Name *</label>
//                   <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${firstName ? activeField : idleField}`}>
//                     <FiUser className="text-gray-400 text-sm shrink-0" />
//                     <input type="text" placeholder="John" value={firstName}
//                       onChange={e => setFirstName(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Last Name *</label>
//                   <input type="text" placeholder="Doe" value={lastName}
//                     onChange={e => setLastName(e.target.value)}
//                     className={`${inputBase} ${lastName ? activeField : idleField}`} />
//                 </div>
//               </div>

//               {/* Role */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-3" style={{ color: B.navy }}>Agency Admin Role *</label>
//                 <div className="flex gap-3 flex-wrap">
//                   {ROLES.map(r => (
//                     <button key={r} onClick={() => setRole(r)}
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all"
//                       style={
//                         role === r
//                           ? { border: `2px solid ${B.green}`, background: B.greenBg, color: B.greenDark, fontWeight: 700 }
//                           : { border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151" }
//                       }
//                     >
//                       <div className="w-4 h-4 rounded-full shrink-0 transition-all"
//                         style={
//                           role === r
//                             ? { border: `5px solid ${B.green}`, background: "#fff" }
//                             : { border: "2px solid #d1d5db", background: "#fff" }
//                         } />
//                       {r}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {/* Phone */}
//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Admin Phone Number *</label>
//                 <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
//                   <div className="relative">
//                     <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
//                       className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]">
//                       {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
//                     </select>
//                     <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
//                   </div>
//                   <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${phone ? activeField : idleField}`}>
//                     <FiPhone className="text-gray-400 text-sm shrink-0" />
//                     <input type="tel" placeholder="1234567890" value={phone}
//                       onChange={e => setPhone(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                   <button onClick={() => phoneFilled && setVerified(true)}
//                     className="px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all"
//                     style={
//                       verified
//                         ? { border: `1.5px solid ${B.green}`, background: B.greenBg, color: B.greenDark }
//                         : { border: `1.5px solid ${B.navyMid}`, background: "#fff", color: B.navyMid }
//                     }>
//                     {verified ? "✓ Verified" : "Verify"}
//                   </button>
//                 </div>
//               </div>

//               {/* LinkedIn */}
//               <div>
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>
//                   Admin LinkedIn Profile{" "}
//                   <span className="text-xs text-gray-400 font-normal">(Optional - helps build trust)</span>
//                 </label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
//                   <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0" />
//                   <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin}
//                     onChange={e => setLinkedin(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
//               </div>

//             </div>
//           </div>

//           {/* Nav — Continue button → Green→DarkGreen→Navy (same as Step3-9) */}
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev}
//               className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
//               ← Back
//             </button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background: B.btnGrad, boxShadow: "0 4px 16px rgba(46,125,31,0.25)" }}
//             >
//               Continue to Business Profile →
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
//               {!linkedinFilled && (
//                 <InsightCard type="info">
//                   <span className="text-base shrink-0">💡</span>
//                   Adding your LinkedIn profile helps build trust with potential clients.
//                 </InsightCard>
//               )}
//               {linkedinFilled && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   LinkedIn added — boosts trust score!
//                 </InsightCard>
//               )}
//               {verified && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Phone number verified successfully!
//                 </InsightCard>
//               )}
//               {!linkedinFilled && !verified && (
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

// export default Step2Admin;







// // Step2Admin.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
// import { FiUser, FiPhone } from "react-icons/fi";
// import { FaLinkedinIn } from "react-icons/fa";

// const COUNTRY_CODES = ["+1","+44","+91","+61","+49","+33","+65","+971","+92","+55"].map(c=>({code:c}));
// const ROLES = ["Founder","Director","Manager"];

// const G = {
//   green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
//   navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
//   gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   gradGreen:"linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
//   mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:"#4b5563", muted:"#9ca3af",
// };

// const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]";
// const idleField   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const s = { success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
//   return <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>{children}</div>;
// };

// const Step2Admin = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
//   const [firstName,   setFirstName]   = useState(formData.firstName   || "");
//   const [lastName,    setLastName]    = useState(formData.lastName    || "");
//   const [role,        setRole]        = useState(formData.adminRole   || "");
//   const [countryCode, setCountryCode] = useState(formData.countryCode || "+91");
//   const [phone,       setPhone]       = useState(formData.phone       || "");
//   const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
//   const [verified,    setVerified]    = useState(false);

//   const linkedinFilled = linkedin.trim().length > 0;
//   const phoneFilled    = phone.trim().length >= 7;
//   const handleNext = () => { updateData({ firstName, lastName, adminRole:role, countryCode, phone, linkedin }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
//         <div className="flex-1 min-w-0">
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div style={{ height:4, background:G.mixedGrad }} />
//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Who Controls This Agency?</h2>
//               <p className="text-sm mb-8" style={{ color:G.sub }}>We need one accountable human for legal and dispute purposes</p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>First Name *</label>
//                   <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${firstName ? activeField : idleField}`}>
//                     <FiUser className="text-gray-400 text-sm shrink-0" />
//                     <input type="text" placeholder="John" value={firstName} onChange={e=>setFirstName(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Last Name *</label>
//                   <input type="text" placeholder="Doe" value={lastName} onChange={e=>setLastName(e.target.value)}
//                     className={`${inputBase} ${lastName ? activeField : idleField}`} />
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Agency Admin Role *</label>
//                 <div className="flex gap-3 flex-wrap">
//                   {ROLES.map(r => (
//                     <button key={r} onClick={()=>setRole(r)}
//                       className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all"
//                       style={ role===r
//                         ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
//                         : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
//                       <div className="w-4 h-4 rounded-full shrink-0"
//                         style={ role===r
//                           ? { border:`5px solid ${G.navyLight}`, background:"#fff" }
//                           : { border:"2px solid #d1d5db", background:"#fff" } } />
//                       {r}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               <div className="mb-6">
//                 <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Admin Phone Number *</label>
//                 <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
//                   <div className="relative">
//                     <select value={countryCode} onChange={e=>setCountryCode(e.target.value)}
//                       className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]">
//                       {COUNTRY_CODES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}
//                     </select>
//                     <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
//                   </div>
//                   <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${phone ? activeField : idleField}`}>
//                     <FiPhone className="text-gray-400 text-sm shrink-0" />
//                     <input type="tel" placeholder="1234567890" value={phone} onChange={e=>setPhone(e.target.value)}
//                       className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                   </div>
//                   <button onClick={()=>phoneFilled&&setVerified(true)}
//                     className="px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all"
//                     style={ verified
//                       ? { border:`1.5px solid ${G.green}`, background:G.greenBg, color:G.greenDeep }
//                       : { border:`1.5px solid ${G.navyLight}`, background:"#fff", color:G.navy } }>
//                     {verified ? "✓ Verified" : "Verify"}
//                   </button>
//                 </div>
//               </div>

//               <div>
//                 <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
//                   Admin LinkedIn Profile <span className="text-xs font-normal" style={{ color:G.muted }}>(Optional)</span>
//                 </label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
//                   <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0" />
//                   <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={e=>setLinkedin(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer transition-colors" style={{ color:G.sub }}
//               onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background:G.gradNavy, boxShadow:"0 3px 14px rgba(15,26,59,0.30)" }}
//               onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
//               Continue to Business Profile →
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
//               {!linkedinFilled && <InsightCard type="info"><span className="text-base shrink-0">💡</span>Adding LinkedIn helps build trust.</InsightCard>}
//               {linkedinFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />LinkedIn added — boosts trust score!</InsightCard>}
//               {verified        && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Phone verified successfully!</InsightCard>}
//               {!linkedinFilled && !verified && (
//                 <div className="text-center py-4">
//                   <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}>
//                     <MdAutoAwesome style={{ color:G.green, fontSize:16 }} />
//                   </div>
//                   <p className="text-xs text-center" style={{ color:G.muted }}>Start filling the form to see AI suggestions...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step2Admin;






// Step2Admin.jsx
import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
import { FiUser, FiPhone } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const COUNTRY_CODES = ["+1","+44","+91","+61","+49","+33","+65","+971","+92","+55"].map(c=>({code:c}));
const ROLES = ["Founder","Director","Manager"];

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
  const s = { success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
  return <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>{children}</div>;
};

const Step2Admin = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
  const [firstName,   setFirstName]   = useState(formData.firstName   || "");
  const [lastName,    setLastName]    = useState(formData.lastName    || "");
  const [role,        setRole]        = useState(formData.adminRole   || "");
  const [countryCode, setCountryCode] = useState(formData.countryCode || "+91");
  const [phone,       setPhone]       = useState(formData.phone       || "");
  const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
  const [verified,    setVerified]    = useState(false);
  const [touched,     setTouch]       = useState({});

  const touch = f => setTouch(p=>({...p,[f]:true}));

  const errors = {
    firstName: !firstName.trim() ? "First name is required" : "",
    lastName:  !lastName.trim()  ? "Last name is required"  : "",
    role:      !role              ? "Please select a role"   : "",
    phone:     !phone.trim()      ? "Phone number is required" : phone.trim().length < 7 ? "Enter a valid phone number" : "",
  };

  const isValid = Object.values(errors).every(e=>e==="");
  const linkedinFilled = linkedin.trim().length > 0;
  const phoneFilled    = phone.trim().length >= 7;

  const handleNext = () => {
    setTouch({ firstName:true, lastName:true, role:true, phone:true });
    if (!isValid) return;
    updateData({ firstName, lastName, adminRole:role, countryCode, phone, linkedin });
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
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Who Controls This Agency?</h2>
              <p className="text-sm mb-8" style={{ color:G.sub }}>We need one accountable human for legal and dispute purposes</p>

              {/* Name Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>First Name *</label>
                  <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${touched.firstName&&errors.firstName ? errorField : firstName ? activeField : idleField}`}>
                    <FiUser className="text-gray-400 text-sm shrink-0"/>
                    <input type="text" placeholder="John" value={firstName}
                      onChange={e=>setFirstName(e.target.value)} onBlur={()=>touch("firstName")}
                      className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"/>
                  </div>
                  <ErrMsg msg={touched.firstName && errors.firstName}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Last Name *</label>
                  <input type="text" placeholder="Doe" value={lastName}
                    onChange={e=>setLastName(e.target.value)} onBlur={()=>touch("lastName")}
                    className={fc("lastName", !!lastName)}/>
                  <ErrMsg msg={touched.lastName && errors.lastName}/>
                </div>
              </div>

              {/* Role */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>Agency Admin Role *</label>
                <div className="flex gap-3 flex-wrap">
                  {ROLES.map(r=>(
                    <button key={r} onClick={()=>{ setRole(r); touch("role"); }}
                      className="flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all"
                      style={ role===r
                        ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
                        : touched.role && errors.role
                        ? { border:"2px solid #ef4444", background:"#fff5f5", color:"#374151" }
                        : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
                      <div className="w-4 h-4 rounded-full shrink-0"
                        style={ role===r ? { border:`5px solid ${G.navyLight}`, background:"#fff" } : { border:"2px solid #d1d5db", background:"#fff" } }/>
                      {r}
                    </button>
                  ))}
                </div>
                <ErrMsg msg={touched.role && errors.role}/>
              </div>

              {/* Phone */}
              <div className="mb-6">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Admin Phone Number *</label>
                <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
                  <div className="relative">
                    <select value={countryCode} onChange={e=>setCountryCode(e.target.value)}
                      className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]">
                      {COUNTRY_CODES.map(c=><option key={c.code} value={c.code}>{c.code}</option>)}
                    </select>
                    <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
                  </div>
                  <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${touched.phone&&errors.phone ? errorField : phone ? activeField : idleField}`}>
                    <FiPhone className="text-gray-400 text-sm shrink-0"/>
                    <input type="tel" placeholder="1234567890" value={phone}
                      onChange={e=>setPhone(e.target.value)} onBlur={()=>touch("phone")}
                      className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"/>
                  </div>
                  <button onClick={()=>phoneFilled&&setVerified(true)}
                    className="px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all"
                    style={ verified
                      ? { border:`1.5px solid ${G.green}`, background:G.greenBg, color:G.greenDeep }
                      : { border:`1.5px solid ${G.navyLight}`, background:"#fff", color:G.navy } }>
                    {verified ? "✓ Verified" : "Verify"}
                  </button>
                </div>
                <ErrMsg msg={touched.phone && errors.phone}/>
              </div>

              {/* LinkedIn (optional) */}
              <div>
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
                  Admin LinkedIn Profile <span className="text-xs font-normal" style={{ color:G.muted }}>(Optional)</span>
                </label>
                <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
                  <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0"/>
                  <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin}
                    onChange={e=>setLinkedin(e.target.value)}
                    className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"/>
                </div>
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
              Continue to Business Profile →
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
              {!linkedinFilled && <InsightCard type="info"><span className="text-base shrink-0">💡</span>Adding LinkedIn helps build trust.</InsightCard>}
              {linkedinFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>LinkedIn added — boosts trust score!</InsightCard>}
              {verified        && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Phone verified successfully!</InsightCard>}
              {!linkedinFilled && !verified && <div className="text-center py-4">
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
export default Step2Admin;
