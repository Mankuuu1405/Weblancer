// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdLocationOn } from "react-icons/md";
// import { BsBuilding, BsGlobe } from "react-icons/bs";

// const BIZ_TYPES = ["Sole Proprietorship","Partnership","Private Limited","LLC","Corporation","LLP"];

// const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
// const idleField = "border border-gray-200 bg-white";

// const InsightCard = ({ type, children }) => {
//   const s = { success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step3Business = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [legalName,   setLegalName]   = useState(formData.legalName   || "");
//   const [bizType,     setBizType]     = useState(formData.bizType     || "");
//   const [incYear,     setIncYear]     = useState(formData.incYear     || "");
//   const [street,      setStreet]      = useState(formData.street      || "");
//   const [city,        setCity]        = useState(formData.city        || "");
//   const [state,       setState]       = useState(formData.state       || "");
//   const [zip,         setZip]         = useState(formData.zip         || "");
//   const [sameAddress, setSameAddress] = useState(formData.sameAddress !== false);
//   const [website,     setWebsite]     = useState(formData.website     || "");

//   const legalNameFilled = legalName.trim().length >= 5;
//   const websiteFilled   = website.trim().length > 5;
//   const emailDomain     = formData.email ? formData.email.split("@")[1] : "";
//   const websiteDomain   = website.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
//   const domainMatches   = websiteFilled && emailDomain && websiteDomain && websiteDomain.includes(emailDomain.split(".")[0]);

//   const handleNext = () => { updateData({ legalName, bizType, incYear, street, city, state, zip, sameAddress, website }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Agency Legal & Business Profile</h2>
//           <p className="text-sm text-gray-500 mb-7">Legal clarity ensures smooth payments and builds trust</p>

//           {/* Legal Name */}
//           <div className="mb-5">
//             <label className="block text-sm font-semibold text-gray-900 mb-2">Legal Company Name *</label>
//             <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${legalName ? activeField : idleField}`}>
//               <BsBuilding className="text-gray-400 text-sm shrink-0" />
//               <input type="text" placeholder="e.g., TechVision Solutions Pvt. Ltd." value={legalName} onChange={e => setLegalName(e.target.value)}
//                 className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//             </div>
//             <div className="text-xs text-gray-400 mt-1">Must match your registration documents</div>
//           </div>

//           {/* Biz Type + Year */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Registered Business Type *</label>
//               <div className="relative">
//                 <select value={bizType} onChange={e => setBizType(e.target.value)}
//                   className={`${inputBase} appearance-none cursor-pointer ${bizType ? activeField : idleField}`}>
//                   <option value="">Select type</option>
//                   {BIZ_TYPES.map(t => <option key={t}>{t}</option>)}
//                 </select>
//                 <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//               </div>
//             </div>
//             <div>
//               <label className="block text-sm font-semibold text-gray-900 mb-2">Year of Incorporation *</label>
//               <input type="text" placeholder="2019" value={incYear} maxLength={4} onChange={e => setIncYear(e.target.value)}
//                 className={`${inputBase} ${incYear ? activeField : idleField}`} />
//             </div>
//           </div>

//           {/* Address */}
//           <div className="mb-5">
//             <div className="flex items-center gap-1.5 mb-3.5">
//               <MdLocationOn className="text-gray-500 text-base" />
//               <span className="text-sm font-bold text-gray-900">Official Registered Address *</span>
//             </div>
//             <input type="text" placeholder="Street address" value={street} onChange={e => setStreet(e.target.value)}
//               className={`${inputBase} mb-2.5 ${street ? activeField : idleField}`} />
//             <div className="grid grid-cols-3 gap-2.5 mb-3">
//               {[{val:city,set:setCity,ph:"City"},{val:state,set:setState,ph:"State"},{val:zip,set:setZip,ph:"ZIP"}].map(({val,set,ph}) => (
//                 <input key={ph} type="text" placeholder={ph} value={val} onChange={e => set(e.target.value)}
//                   className={`${inputBase} ${val ? activeField : idleField}`} />
//               ))}
//             </div>
//             <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSameAddress(!sameAddress)}>
//               <div className={`w-4.5 h-4.5 rounded-md shrink-0 flex items-center justify-center transition-all ${sameAddress ? "bg-blue-500" : "bg-white border-2 border-gray-300"}`}
//                 style={{width:"18px",height:"18px"}}>
//                 {sameAddress && <span className="text-white text-[11px] font-bold">✓</span>}
//               </div>
//               <span className="text-xs text-gray-500">Operating address is the same as registered address</span>
//             </div>
//           </div>

//           {/* Website */}
//           <div>
//             <div className="flex items-center gap-2.5 mb-2">
//               <label className="text-sm font-semibold text-gray-900">Company Website</label>
//               <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">STRONGLY RECOMMENDED</span>
//             </div>
//             <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${website ? activeField : idleField}`}>
//               <BsGlobe className="text-gray-400 text-sm shrink-0" />
//               <input type="url" placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)}
//                 className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//             </div>
//           </div>
//         </div>

//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Services →
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
//             {legalNameFilled && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Legal name recorded. Will be verified against documents.</InsightCard>}
//             {domainMatches   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Website domain matches email domain ✓</InsightCard>}
//             {!websiteFilled && legalNameFilled && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Adding your company website greatly increases trust score.</InsightCard>}
//             {!legalNameFilled && <p className="text-xs text-gray-400 text-center py-2">Start filling the form to see AI suggestions...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step3Business;







// // Step3Business.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdLocationOn } from "react-icons/md";
// import { BsBuilding, BsGlobe } from "react-icons/bs";

// const BIZ_TYPES = ["Sole Proprietorship","Partnership","Private Limited","LLC","Corporation","LLP"];

// /* ── WebLance 3-color tokens ── */
// const B = {
//   navy:      "#0F1A3B",
//   navyMid:   "#1A2B5E",
//   green:     "#6EC030",
//   greenDark: "#2E7D1F",
//   navyGrad:  "linear-gradient(135deg, #0F1A3B 0%, #1A2B5E 100%)",
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
//     <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>
//       {children}
//     </div>
//   );
// };

// const Step3Business = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [legalName,   setLegalName]   = useState(formData.legalName   || "");
//   const [bizType,     setBizType]     = useState(formData.bizType     || "");
//   const [incYear,     setIncYear]     = useState(formData.incYear     || "");
//   const [street,      setStreet]      = useState(formData.street      || "");
//   const [city,        setCity]        = useState(formData.city        || "");
//   const [state,       setState]       = useState(formData.state       || "");
//   const [zip,         setZip]         = useState(formData.zip         || "");
//   const [sameAddress, setSameAddress] = useState(formData.sameAddress !== false);
//   const [website,     setWebsite]     = useState(formData.website     || "");

//   const legalNameFilled = legalName.trim().length >= 5;
//   const websiteFilled   = website.trim().length > 5;
//   const emailDomain     = formData.email ? formData.email.split("@")[1] : "";
//   const websiteDomain   = website.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
//   const domainMatches   = websiteFilled && emailDomain && websiteDomain && websiteDomain.includes(emailDomain.split(".")[0]);

//   const handleNext = () => {
//     updateData({ legalName, bizType, incYear, street, city, state, zip, sameAddress, website });
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
//                 Agency Legal & Business Profile
//               </h2>
//               <p className="text-sm text-gray-500 mb-7">Legal clarity ensures smooth payments and builds trust</p>

//               {/* Legal Name */}
//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Legal Company Name *</label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${legalName ? activeField : idleField}`}>
//                   <BsBuilding className="text-gray-400 text-sm shrink-0" />
//                   <input type="text" placeholder="e.g., TechVision Solutions Pvt. Ltd." value={legalName}
//                     onChange={e => setLegalName(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
//                 <div className="text-xs text-gray-400 mt-1">Must match your registration documents</div>
//               </div>

//               {/* Biz Type + Year */}
//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Registered Business Type *</label>
//                   <div className="relative">
//                     <select value={bizType} onChange={e => setBizType(e.target.value)}
//                       className={`${inputBase} appearance-none cursor-pointer ${bizType ? activeField : idleField}`}>
//                       <option value="">Select type</option>
//                       {BIZ_TYPES.map(t => <option key={t}>{t}</option>)}
//                     </select>
//                     <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color: B.navy }}>Year of Incorporation *</label>
//                   <input type="text" placeholder="2019" value={incYear} maxLength={4}
//                     onChange={e => setIncYear(e.target.value)}
//                     className={`${inputBase} ${incYear ? activeField : idleField}`} />
//                 </div>
//               </div>

//               {/* Address */}
//               <div className="mb-5">
//                 <div className="flex items-center gap-1.5 mb-3.5">
//                   <MdLocationOn style={{ color: B.green }} className="text-base" />
//                   <span className="text-sm font-bold" style={{ color: B.navy }}>Official Registered Address *</span>
//                 </div>
//                 <input type="text" placeholder="Street address" value={street}
//                   onChange={e => setStreet(e.target.value)}
//                   className={`${inputBase} mb-2.5 ${street ? activeField : idleField}`} />
//                 <div className="grid grid-cols-3 gap-2.5 mb-3">
//                   {[{val:city,set:setCity,ph:"City"},{val:state,set:setState,ph:"State"},{val:zip,set:setZip,ph:"ZIP"}].map(({val,set,ph}) => (
//                     <input key={ph} type="text" placeholder={ph} value={val}
//                       onChange={e => set(e.target.value)}
//                       className={`${inputBase} ${val ? activeField : idleField}`} />
//                   ))}
//                 </div>
//                 {/* Checkbox → Green when checked */}
//                 <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSameAddress(!sameAddress)}>
//                   <div
//                     className="shrink-0 flex items-center justify-center rounded-md transition-all"
//                     style={{
//                       width: 18, height: 18,
//                       background: sameAddress ? B.green : "#fff",
//                       border: sameAddress ? `2px solid ${B.green}` : "2px solid #d1d5db",
//                     }}
//                   >
//                     {sameAddress && <span className="text-white text-[11px] font-bold">✓</span>}
//                   </div>
//                   <span className="text-xs text-gray-500">Operating address is the same as registered address</span>
//                 </div>
//               </div>

//               {/* Website */}
//               <div>
//                 <div className="flex items-center gap-2.5 mb-2">
//                   <label className="text-sm font-semibold" style={{ color: B.navy }}>Company Website</label>
//                   <span
//                     className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
//                     style={{ color: B.greenDark, background: B.greenBg, borderColor: B.greenBdr }}
//                   >
//                     STRONGLY RECOMMENDED
//                   </span>
//                 </div>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${website ? activeField : idleField}`}>
//                   <BsGlobe className="text-gray-400 text-sm shrink-0" />
//                   <input type="url" placeholder="https://yourcompany.com" value={website}
//                     onChange={e => setWebsite(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Nav buttons */}
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
//               ← Back
//             </button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background: B.btnGrad, boxShadow: "0 4px 16px rgba(46,125,31,0.25)" }}
//             >
//               Continue to Services →
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
//               {legalNameFilled && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />
//                   Legal name recorded. Will be verified against documents.
//                 </InsightCard>
//               )}
//               {domainMatches && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />
//                   Website domain matches email domain ✓
//                 </InsightCard>
//               )}
//               {!websiteFilled && legalNameFilled && (
//                 <InsightCard type="info">
//                   <span className="text-sm shrink-0">💡</span>
//                   Adding your company website greatly increases trust score.
//                 </InsightCard>
//               )}
//               {!legalNameFilled && (
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
// export default Step3Business;







// // Step3Business.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdLocationOn } from "react-icons/md";
// import { BsBuilding, BsGlobe } from "react-icons/bs";

// const BIZ_TYPES = ["Sole Proprietorship","Partnership","Private Limited","LLC","Corporation","LLP"];

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
//   const s = { success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step3Business = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
//   const [legalName,   setLegalName]   = useState(formData.legalName   || "");
//   const [bizType,     setBizType]     = useState(formData.bizType     || "");
//   const [incYear,     setIncYear]     = useState(formData.incYear     || "");
//   const [street,      setStreet]      = useState(formData.street      || "");
//   const [city,        setCity]        = useState(formData.city        || "");
//   const [state,       setState]       = useState(formData.state       || "");
//   const [zip,         setZip]         = useState(formData.zip         || "");
//   const [sameAddress, setSameAddress] = useState(formData.sameAddress !== false);
//   const [website,     setWebsite]     = useState(formData.website     || "");

//   const legalNameFilled = legalName.trim().length >= 5;
//   const websiteFilled   = website.trim().length > 5;
//   const emailDomain     = formData.email ? formData.email.split("@")[1] : "";
//   const websiteDomain   = website.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
//   const domainMatches   = websiteFilled && emailDomain && websiteDomain.includes(emailDomain.split(".")[0]);
//   const handleNext = () => { updateData({ legalName, bizType, incYear, street, city, state, zip, sameAddress, website }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
//         <div className="flex-1 min-w-0">
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div style={{ height:4, background:G.mixedGrad }} />
//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Agency Legal & Business Profile</h2>
//               <p className="text-sm mb-7" style={{ color:G.sub }}>Legal clarity ensures smooth payments and builds trust</p>

//               <div className="mb-5">
//                 <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Legal Company Name *</label>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${legalName ? activeField : idleField}`}>
//                   <BsBuilding className="text-gray-400 text-sm shrink-0" />
//                   <input type="text" placeholder="e.g., TechVision Solutions Pvt. Ltd." value={legalName} onChange={e=>setLegalName(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
//                 <div className="text-xs mt-1" style={{ color:G.muted }}>Must match your registration documents</div>
//               </div>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Registered Business Type *</label>
//                   <div className="relative">
//                     <select value={bizType} onChange={e=>setBizType(e.target.value)}
//                       className={`${inputBase} appearance-none cursor-pointer ${bizType ? activeField : idleField}`}>
//                       <option value="">Select type</option>
//                       {BIZ_TYPES.map(t=><option key={t}>{t}</option>)}
//                     </select>
//                     <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
//                   </div>
//                 </div>
//                 <div>
//                   <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Year of Incorporation *</label>
//                   <input type="text" placeholder="2019" value={incYear} maxLength={4} onChange={e=>setIncYear(e.target.value)}
//                     className={`${inputBase} ${incYear ? activeField : idleField}`} />
//                 </div>
//               </div>

//               <div className="mb-5">
//                 <div className="flex items-center gap-1.5 mb-3.5">
//                   <MdLocationOn style={{ color:G.navyLight }} className="text-base" />
//                   <span className="text-sm font-bold" style={{ color:G.navyDeep }}>Official Registered Address *</span>
//                 </div>
//                 <input type="text" placeholder="Street address" value={street} onChange={e=>setStreet(e.target.value)}
//                   className={`${inputBase} mb-2.5 ${street ? activeField : idleField}`} />
//                 <div className="grid grid-cols-3 gap-2.5 mb-3">
//                   {[{val:city,set:setCity,ph:"City"},{val:state,set:setState,ph:"State"},{val:zip,set:setZip,ph:"ZIP"}].map(({val,set,ph})=>(
//                     <input key={ph} type="text" placeholder={ph} value={val} onChange={e=>set(e.target.value)}
//                       className={`${inputBase} ${val ? activeField : idleField}`} />
//                   ))}
//                 </div>
//                 <div className="flex items-center gap-2 cursor-pointer" onClick={()=>setSameAddress(!sameAddress)}>
//                   <div className="shrink-0 flex items-center justify-center rounded-md transition-all"
//                     style={{ width:18, height:18,
//                       background: sameAddress ? G.navy : "#fff",
//                       border: sameAddress ? `2px solid ${G.navy}` : "2px solid #d1d5db" }}>
//                     {sameAddress && <span className="text-white text-[11px] font-bold">✓</span>}
//                   </div>
//                   <span className="text-xs" style={{ color:G.muted }}>Operating address same as registered address</span>
//                 </div>
//               </div>

//               <div>
//                 <div className="flex items-center gap-2.5 mb-2">
//                   <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>Company Website</label>
//                   <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
//                     style={{ color:G.greenDeep, background:G.greenBg, borderColor:G.greenBorder }}>STRONGLY RECOMMENDED</span>
//                 </div>
//                 <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${website ? activeField : idleField}`}>
//                   <BsGlobe className="text-gray-400 text-sm shrink-0" />
//                   <input type="url" placeholder="https://yourcompany.com" value={website} onChange={e=>setWebsite(e.target.value)}
//                     className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
//                 </div>
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
//               Continue to Services →
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
//               {legalNameFilled && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Legal name recorded.</InsightCard>}
//               {domainMatches   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Website domain matches email ✓</InsightCard>}
//               {!websiteFilled && legalNameFilled && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Adding website greatly increases trust score.</InsightCard>}
//               {!legalNameFilled && <div className="text-center py-4">
//                 <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}>
//                   <MdAutoAwesome style={{ color:G.green, fontSize:16 }} />
//                 </div>
//                 <p className="text-xs text-center" style={{ color:G.muted }}>Start filling the form...</p>
//               </div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step3Business;




// Step3Business.jsx
import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdLocationOn } from "react-icons/md";
import { BsBuilding, BsGlobe } from "react-icons/bs";

const BIZ_TYPES = ["Sole Proprietorship","Partnership","Private Limited","LLC","Corporation","LLP"];

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
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step3Business = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
  const [legalName,   setLegalName]   = useState(formData.legalName   || "");
  const [bizType,     setBizType]     = useState(formData.bizType     || "");
  const [incYear,     setIncYear]     = useState(formData.incYear     || "");
  const [street,      setStreet]      = useState(formData.street      || "");
  const [city,        setCity]        = useState(formData.city        || "");
  const [state,       setState]       = useState(formData.state       || "");
  const [zip,         setZip]         = useState(formData.zip         || "");
  const [sameAddress, setSameAddress] = useState(formData.sameAddress !== false);
  const [website,     setWebsite]     = useState(formData.website     || "");
  const [touched,     setTouch]       = useState({});

  const touch = f => setTouch(p=>({...p,[f]:true}));
  const currentYear = new Date().getFullYear();

  const errors = {
    legalName: !legalName.trim() ? "Legal company name is required" : legalName.trim().length < 3 ? "Minimum 3 characters" : "",
    bizType:   !bizType          ? "Please select a business type"  : "",
    incYear:   !incYear.trim()   ? "Year of incorporation is required" : !/^\d{4}$/.test(incYear) ? "Enter a valid 4-digit year" : +incYear < 1900 || +incYear > currentYear ? `Year must be between 1900–${currentYear}` : "",
    street:    !street.trim()    ? "Street address is required"     : "",
    city:      !city.trim()      ? "City is required"               : "",
    state:     !state.trim()     ? "State is required"              : "",
    zip:       !zip.trim()       ? "ZIP code is required"           : "",
  };

  const isValid = Object.values(errors).every(e=>e==="");

  const handleNext = () => {
    setTouch({ legalName:true, bizType:true, incYear:true, street:true, city:true, state:true, zip:true });
    if (!isValid) return;
    updateData({ legalName, bizType, incYear, street, city, state, zip, sameAddress, website });
    next();
  };

  const fc = (field, val) => {
    if (touched[field] && errors[field]) return `${inputBase} ${errorField}`;
    if (val) return `${inputBase} ${activeField}`;
    return `${inputBase} ${idleField}`;
  };

  const websiteFilled = website.trim().length > 5;
  const emailDomain   = formData.email ? formData.email.split("@")[1] : "";
  const websiteDomain = website.replace(/https?:\/\//,"").split("/")[0].replace("www.","");
  const domainMatches = websiteFilled && emailDomain && websiteDomain.includes(emailDomain.split(".")[0]);

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />
            <div className="px-6 sm:px-10 py-9">
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Agency Legal & Business Profile</h2>
              <p className="text-sm mb-7" style={{ color:G.sub }}>Legal clarity ensures smooth payments and builds trust</p>

              {/* Legal Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Legal Company Name *</label>
                <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${touched.legalName&&errors.legalName ? errorField : legalName ? activeField : idleField}`}>
                  <BsBuilding className="text-gray-400 text-sm shrink-0"/>
                  <input type="text" placeholder="e.g., TechVision Solutions Pvt. Ltd." value={legalName}
                    onChange={e=>setLegalName(e.target.value)} onBlur={()=>touch("legalName")}
                    className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700"/>
                </div>
                <ErrMsg msg={touched.legalName && errors.legalName}/>
                {!errors.legalName && legalName && <p className="text-xs mt-1" style={{ color:G.muted }}>Must match your registration documents</p>}
              </div>

              {/* Biz Type + Year */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Registered Business Type *</label>
                  <div className="relative">
                    <select value={bizType} onChange={e=>setBizType(e.target.value)} onBlur={()=>touch("bizType")}
                      className={`${fc("bizType", !!bizType)} appearance-none cursor-pointer`}>
                      <option value="">Select type</option>
                      {BIZ_TYPES.map(t=><option key={t}>{t}</option>)}
                    </select>
                    <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
                  </div>
                  <ErrMsg msg={touched.bizType && errors.bizType}/>
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Year of Incorporation *</label>
                  <input type="text" placeholder="e.g., 2019" value={incYear} maxLength={4}
                    onChange={e=>setIncYear(e.target.value)} onBlur={()=>touch("incYear")}
                    className={fc("incYear", !!incYear)}/>
                  <ErrMsg msg={touched.incYear && errors.incYear}/>
                </div>
              </div>

              {/* Address */}
              <div className="mb-5">
                <div className="flex items-center gap-1.5 mb-3.5">
                  <MdLocationOn style={{ color:G.navyLight }} className="text-base"/>
                  <span className="text-sm font-bold" style={{ color:G.navyDeep }}>Official Registered Address *</span>
                </div>
                <input type="text" placeholder="Street address" value={street}
                  onChange={e=>setStreet(e.target.value)} onBlur={()=>touch("street")}
                  className={`${fc("street", !!street)} mb-1`}/>
                <ErrMsg msg={touched.street && errors.street}/>
                <div className="grid grid-cols-3 gap-2.5 mt-2.5 mb-1">
                  {[{val:city,set:setCity,ph:"City",f:"city"},{val:state,set:setState,ph:"State",f:"state"},{val:zip,set:setZip,ph:"ZIP",f:"zip"}].map(({val,set,ph,f})=>(
                    <div key={f}>
                      <input type="text" placeholder={ph} value={val}
                        onChange={e=>set(e.target.value)} onBlur={()=>touch(f)}
                        className={touched[f]&&errors[f] ? `${inputBase} ${errorField}` : val ? `${inputBase} ${activeField}` : `${inputBase} ${idleField}`}/>
                      <ErrMsg msg={touched[f] && errors[f]}/>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 cursor-pointer mt-3" onClick={()=>setSameAddress(!sameAddress)}>
                  <div className="shrink-0 flex items-center justify-center rounded-md transition-all"
                    style={{ width:18, height:18, background:sameAddress?G.navy:"#fff", border:sameAddress?`2px solid ${G.navy}`:"2px solid #d1d5db" }}>
                    {sameAddress && <span className="text-white text-[11px] font-bold">✓</span>}
                  </div>
                  <span className="text-xs" style={{ color:G.muted }}>Operating address same as registered address</span>
                </div>
              </div>

              {/* Website (optional) */}
              <div>
                <div className="flex items-center gap-2.5 mb-2">
                  <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>Company Website</label>
                  <span className="text-xs font-bold px-2.5 py-0.5 rounded-full border"
                    style={{ color:G.greenDeep, background:G.greenBg, borderColor:G.greenBorder }}>STRONGLY RECOMMENDED</span>
                </div>
                <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${website ? activeField : idleField}`}>
                  <BsGlobe className="text-gray-400 text-sm shrink-0"/>
                  <input type="url" placeholder="https://yourcompany.com" value={website}
                    onChange={e=>setWebsite(e.target.value)}
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
              Continue to Services →
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
              {legalName.trim().length>=5 && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm"/>Legal name recorded.</InsightCard>}
              {domainMatches && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm"/>Website domain matches email ✓</InsightCard>}
              {!websiteFilled && legalName.trim().length>=5 && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Adding website greatly increases trust score.</InsightCard>}
              {!legalName && <div className="text-center py-4">
                <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}><MdAutoAwesome style={{ color:G.green, fontSize:16 }}/></div>
                <p className="text-xs text-center" style={{ color:G.muted }}>Start filling the form...</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step3Business;