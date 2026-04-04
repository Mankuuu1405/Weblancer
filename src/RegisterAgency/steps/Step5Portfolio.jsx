// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
// import { BsFileText } from "react-icons/bs";

// const CLIENT_TYPES = ["Startup","Mid-size","Enterprise"];
// const emptyCaseStudy = () => ({ id: Date.now(), title:"", clientType:"", problem:"", solution:"", teamSize:"" });

// const inputBase = "w-full px-3.5 py-3 rounded-xl text-xs text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-blue-400 bg-blue-50";
// const idleField = "border border-gray-200 bg-white";

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step5Portfolio = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [caseStudies, setCaseStudies] = useState(formData.caseStudies?.length ? formData.caseStudies : [emptyCaseStudy()]);

//   const updateCS  = (id, field, value) => setCaseStudies(cs => cs.map(c => c.id === id ? { ...c, [field]: value } : c));
//   const addCS     = () => setCaseStudies(cs => [...cs, emptyCaseStudy()]);
//   const removeCS  = id => setCaseStudies(cs => cs.filter(c => c.id !== id));

//   const completedCount = caseStudies.filter(c => c.title && c.clientType && c.problem && c.solution).length;
//   const hasEnterprise  = caseStudies.some(c => c.clientType === "Enterprise");
//   const contentOriginal= completedCount >= 1;
//   const needsMore      = caseStudies.length < 2 && !hasEnterprise;

//   const handleNext = () => { updateData({ caseStudies }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Showcase Your Work</h2>
//           <p className="text-sm text-gray-500 mb-5">Minimum 1 enterprise project or 2 detailed case studies</p>

//           <div className="flex gap-2.5 items-center bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
//             <BsFileText className="text-blue-500 text-sm shrink-0" />
//             <span className="text-xs text-blue-700">Required: Minimum 1 enterprise-level project OR 2 detailed case studies</span>
//           </div>

//           <div className="text-xs text-gray-500 font-medium mb-5">{completedCount}/{caseStudies.length} Case Studies Complete</div>

//           {caseStudies.map((cs, idx) => (
//             <div key={cs.id} className="border border-gray-200 rounded-xl p-6 mb-4">
//               <div className="flex justify-between items-center mb-5">
//                 <span className="text-sm font-bold text-gray-700">Case Study #{idx + 1}</span>
//                 {caseStudies.length > 1 && (
//                   <button onClick={() => removeCS(cs.id)} className="bg-transparent border-none text-gray-400 cursor-pointer text-lg leading-none hover:text-gray-600">×</button>
//                 )}
//               </div>

//               <div className="mb-4">
//                 <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Title *</label>
//                 <input type="text" placeholder="e.g., ByteEats Food Delivery Platform" value={cs.title} onChange={e => updateCS(cs.id, "title", e.target.value)}
//                   className={`${inputBase} ${cs.title ? activeField : idleField}`} />
//               </div>

//               <div className="mb-4">
//                 <label className="block text-xs font-semibold text-gray-700 mb-2">Client Type *</label>
//                 <div className="flex gap-2.5 flex-wrap">
//                   {CLIENT_TYPES.map(ct => (
//                     <button key={ct} onClick={() => updateCS(cs.id, "clientType", ct)}
//                       className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs transition-all
//                         ${cs.clientType === ct ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
//                       <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${cs.clientType === ct ? "border-4 border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
//                       {ct}
//                     </button>
//                   ))}
//                 </div>
//               </div>

//               {[
//                 { field:"problem",  label:"Problem Statement *",  ph:"Describe the client's problem..." },
//                 { field:"solution", label:"Solution Delivered *", ph:"Describe your solution..."        },
//               ].map(({ field, label, ph }) => (
//                 <div key={field} className="mb-4">
//                   <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
//                   <textarea placeholder={ph} value={cs[field]} onChange={e => updateCS(cs.id, field, e.target.value)} rows={3}
//                     className={`${inputBase} resize-y font-[inherit] leading-relaxed ${cs[field] ? activeField : idleField}`} />
//                 </div>
//               ))}

//               <div>
//                 <label className="block text-xs font-semibold text-gray-700 mb-1.5">Team Size Involved *</label>
//                 <input type="number" placeholder="e.g., 5" value={cs.teamSize} onChange={e => updateCS(cs.id, "teamSize", e.target.value)}
//                   className={`${inputBase} ${cs.teamSize ? activeField : idleField}`} />
//               </div>
//             </div>
//           ))}

//           <button onClick={addCS}
//             className="w-full py-3.5 rounded-xl cursor-pointer border-[1.5px] border-dashed border-gray-300 bg-white text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-gray-400 hover:text-gray-700 transition-all">
//             + Add Another Case Study
//           </button>
//         </div>

//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Verification →
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
//             {contentOriginal && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Content appears original.</InsightCard>}
//             {hasEnterprise   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Enterprise project boosts agency credibility!</InsightCard>}
//             {needsMore && contentOriginal && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Add 1 more case study or mark one as Enterprise to meet requirements.</InsightCard>}
//             {!contentOriginal && caseStudies[0]?.title && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Complete all required fields in the case study.</InsightCard>}
//             {!contentOriginal && !caseStudies[0]?.title && <p className="text-xs text-gray-400 text-center py-2">Start adding your case studies to see AI suggestions...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step5Portfolio;








// // Step5Portfolio.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
// import { BsFileText } from "react-icons/bs";

// const CLIENT_TYPES = ["Startup", "Mid-size", "Enterprise"];
// const emptyCaseStudy = () => ({ id: Date.now(), title: "", clientType: "", problem: "", solution: "", teamSize: "" });

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

// const inputBase   = "w-full px-3.5 py-3 rounded-xl text-xs text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-[#6EC030] bg-[#f0f7e8] shadow-[0_0_0_3px_rgba(110,192,48,0.10)]";
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

// const Step5Portfolio = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [caseStudies, setCaseStudies] = useState(
//     formData.caseStudies?.length ? formData.caseStudies : [emptyCaseStudy()]
//   );

//   const updateCS = (id, field, value) =>
//     setCaseStudies(cs => cs.map(c => c.id === id ? { ...c, [field]: value } : c));
//   const addCS    = () => setCaseStudies(cs => [...cs, emptyCaseStudy()]);
//   const removeCS = id => setCaseStudies(cs => cs.filter(c => c.id !== id));

//   const completedCount = caseStudies.filter(c => c.title && c.clientType && c.problem && c.solution).length;
//   const hasEnterprise  = caseStudies.some(c => c.clientType === "Enterprise");
//   const contentOriginal = completedCount >= 1;
//   const needsMore      = caseStudies.length < 2 && !hasEnterprise;

//   const handleNext = () => { updateData({ caseStudies }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>Showcase Your Work</h2>
//               <p className="text-sm text-gray-500 mb-5">Minimum 1 enterprise project or 2 detailed case studies</p>

//               {/* Info banner — Navy theme */}
//               <div
//                 className="flex gap-2.5 items-center rounded-xl px-4 py-3 mb-4 border"
//                 style={{ background: B.navyBg, borderColor: B.navyBdr }}
//               >
//                 <BsFileText style={{ color: B.navyMid }} className="text-sm shrink-0" />
//                 <span className="text-xs leading-relaxed" style={{ color: B.navyMid }}>
//                   Required: Minimum 1 enterprise-level project OR 2 detailed case studies
//                 </span>
//               </div>

//               <div className="text-xs font-medium mb-5" style={{ color: B.navyMid }}>
//                 {completedCount}/{caseStudies.length} Case Studies Complete
//               </div>

//               {caseStudies.map((cs, idx) => (
//                 <div key={cs.id} className="border border-gray-200 rounded-xl p-6 mb-4">
//                   <div className="flex justify-between items-center mb-5">
//                     <span className="text-sm font-bold" style={{ color: B.navy }}>Case Study #{idx + 1}</span>
//                     {caseStudies.length > 1 && (
//                       <button onClick={() => removeCS(cs.id)}
//                         className="bg-transparent border-none text-gray-400 cursor-pointer text-lg leading-none hover:text-gray-600">
//                         ×
//                       </button>
//                     )}
//                   </div>

//                   {/* Title */}
//                   <div className="mb-4">
//                     <label className="block text-xs font-semibold mb-1.5" style={{ color: B.navy }}>Project Title *</label>
//                     <input type="text" placeholder="e.g., ByteEats Food Delivery Platform"
//                       value={cs.title} onChange={e => updateCS(cs.id, "title", e.target.value)}
//                       className={`${inputBase} ${cs.title ? activeField : idleField}`} />
//                   </div>

//                   {/* Client Type — Green when selected */}
//                   <div className="mb-4">
//                     <label className="block text-xs font-semibold mb-2" style={{ color: B.navy }}>Client Type *</label>
//                     <div className="flex gap-2.5 flex-wrap">
//                       {CLIENT_TYPES.map(ct => (
//                         <button key={ct} onClick={() => updateCS(cs.id, "clientType", ct)}
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs transition-all"
//                           style={
//                             cs.clientType === ct
//                               ? { border: `2px solid ${B.green}`, background: B.greenBg, color: B.greenDark, fontWeight: 700 }
//                               : { border: "1.5px solid #e5e7eb", background: "#fff", color: "#374151" }
//                           }
//                         >
//                           <div
//                             className="rounded-full shrink-0 transition-all"
//                             style={{
//                               width: 14, height: 14,
//                               border: cs.clientType === ct ? `4px solid ${B.green}` : "2px solid #d1d5db",
//                               background: "#fff",
//                             }}
//                           />
//                           {ct}
//                         </button>
//                       ))}
//                     </div>
//                   </div>

//                   {/* Problem + Solution */}
//                   {[
//                     { field: "problem",  label: "Problem Statement *",  ph: "Describe the client's problem..." },
//                     { field: "solution", label: "Solution Delivered *", ph: "Describe your solution..."        },
//                   ].map(({ field, label, ph }) => (
//                     <div key={field} className="mb-4">
//                       <label className="block text-xs font-semibold mb-1.5" style={{ color: B.navy }}>{label}</label>
//                       <textarea placeholder={ph} value={cs[field]}
//                         onChange={e => updateCS(cs.id, field, e.target.value)} rows={3}
//                         className={`${inputBase} resize-y font-[inherit] leading-relaxed ${cs[field] ? activeField : idleField}`} />
//                     </div>
//                   ))}

//                   {/* Team Size */}
//                   <div>
//                     <label className="block text-xs font-semibold mb-1.5" style={{ color: B.navy }}>Team Size Involved *</label>
//                     <input type="number" placeholder="e.g., 5" value={cs.teamSize}
//                       onChange={e => updateCS(cs.id, "teamSize", e.target.value)}
//                       className={`${inputBase} ${cs.teamSize ? activeField : idleField}`} />
//                   </div>
//                 </div>
//               ))}

//               {/* Add Case Study button — dashed Green border */}
//               <button onClick={addCS}
//                 className="w-full py-3.5 rounded-xl cursor-pointer text-sm font-semibold flex items-center justify-center gap-2 transition-all"
//                 style={{
//                   border: `1.5px dashed ${B.green}`,
//                   background: "#fff",
//                   color: B.greenDark,
//                 }}
//                 onMouseEnter={e => e.currentTarget.style.background = B.greenBg}
//                 onMouseLeave={e => e.currentTarget.style.background = "#fff"}
//               >
//                 + Add Another Case Study
//               </button>
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
//               Continue to Verification →
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
//               {contentOriginal && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Content appears original.
//                 </InsightCard>
//               )}
//               {hasEnterprise && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Enterprise project boosts agency credibility!
//                 </InsightCard>
//               )}
//               {needsMore && contentOriginal && (
//                 <InsightCard type="info">
//                   <span className="text-sm shrink-0">💡</span>
//                   Add 1 more case study or mark one as Enterprise to meet requirements.
//                 </InsightCard>
//               )}
//               {!contentOriginal && caseStudies[0]?.title && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Complete all required fields in the case study.
//                 </InsightCard>
//               )}
//               {!contentOriginal && !caseStudies[0]?.title && (
//                 <div className="text-center py-4">
//                   <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: B.greenBg }}>
//                     <MdAutoAwesome style={{ color: B.green, fontSize: 16 }} />
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">Start adding your case studies to see AI suggestions...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };
// export default Step5Portfolio;






// // Step5Portfolio.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
// import { BsFileText } from "react-icons/bs";

// const CLIENT_TYPES = ["Startup","Mid-size","Enterprise"];
// const emptyCaseStudy = () => ({ id:Date.now(), title:"", clientType:"", problem:"", solution:"", teamSize:"" });

// const G = {
//   green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
//   navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
//   gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:"#4b5563", muted:"#9ca3af",
// };

// const inputBase   = "w-full px-3.5 py-3 rounded-xl text-xs text-gray-700 outline-none transition-all";
// const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.10)]";
// const idleField   = "border border-gray-200 bg-white hover:border-gray-300";

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step5Portfolio = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
//   const [caseStudies, setCaseStudies] = useState(formData.caseStudies?.length ? formData.caseStudies : [emptyCaseStudy()]);
//   const updateCS = (id,field,val) => setCaseStudies(cs=>cs.map(c=>c.id===id?{...c,[field]:val}:c));
//   const addCS    = () => setCaseStudies(cs=>[...cs,emptyCaseStudy()]);
//   const removeCS = id => setCaseStudies(cs=>cs.filter(c=>c.id!==id));

//   const completedCount = caseStudies.filter(c=>c.title&&c.clientType&&c.problem&&c.solution).length;
//   const hasEnterprise  = caseStudies.some(c=>c.clientType==="Enterprise");
//   const contentOk      = completedCount >= 1;
//   const needsMore      = caseStudies.length < 2 && !hasEnterprise;
//   const handleNext = () => { updateData({ caseStudies }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
//         <div className="flex-1 min-w-0">
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div style={{ height:4, background:G.mixedGrad }} />
//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Showcase Your Work</h2>
//               <p className="text-sm mb-5" style={{ color:G.sub }}>Minimum 1 enterprise project or 2 detailed case studies</p>
//               <div className="flex gap-2.5 items-center rounded-xl px-4 py-3 mb-4 border"
//                 style={{ background:G.navyBg, borderColor:G.navyBorder }}>
//                 <BsFileText style={{ color:G.navy }} className="text-sm shrink-0" />
//                 <span className="text-xs leading-relaxed" style={{ color:G.navy }}>Required: Min 1 enterprise-level project OR 2 detailed case studies</span>
//               </div>
//               <div className="text-xs font-medium mb-5" style={{ color:G.navy }}>{completedCount}/{caseStudies.length} Case Studies Complete</div>

//               {caseStudies.map((cs,idx) => (
//                 <div key={cs.id} className="border border-gray-200 rounded-xl p-6 mb-4">
//                   <div className="flex justify-between items-center mb-5">
//                     <span className="text-sm font-bold" style={{ color:G.navyDeep }}>Case Study #{idx+1}</span>
//                     {caseStudies.length > 1 && <button onClick={()=>removeCS(cs.id)} className="bg-transparent border-none text-gray-400 cursor-pointer text-lg">×</button>}
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>Project Title *</label>
//                     <input type="text" placeholder="e.g., ByteEats Food Delivery" value={cs.title} onChange={e=>updateCS(cs.id,"title",e.target.value)}
//                       className={`${inputBase} ${cs.title ? activeField : idleField}`} />
//                   </div>
//                   <div className="mb-4">
//                     <label className="block text-xs font-semibold mb-2" style={{ color:G.navyDeep }}>Client Type *</label>
//                     <div className="flex gap-2.5 flex-wrap">
//                       {CLIENT_TYPES.map(ct=>(
//                         <button key={ct} onClick={()=>updateCS(cs.id,"clientType",ct)}
//                           className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs transition-all"
//                           style={ cs.clientType===ct
//                             ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
//                             : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
//                           <div className="rounded-full shrink-0" style={{ width:14, height:14,
//                             border: cs.clientType===ct ? `4px solid ${G.navyLight}` : "2px solid #d1d5db", background:"#fff" }} />
//                           {ct}
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                   {[{field:"problem",label:"Problem Statement *",ph:"Describe the client's problem..."},
//                     {field:"solution",label:"Solution Delivered *",ph:"Describe your solution..."}].map(({field,label,ph})=>(
//                     <div key={field} className="mb-4">
//                       <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>{label}</label>
//                       <textarea placeholder={ph} value={cs[field]} onChange={e=>updateCS(cs.id,field,e.target.value)} rows={3}
//                         className={`${inputBase} resize-y font-[inherit] leading-relaxed ${cs[field] ? activeField : idleField}`} />
//                     </div>
//                   ))}
//                   <div>
//                     <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>Team Size *</label>
//                     <input type="number" placeholder="e.g., 5" value={cs.teamSize} onChange={e=>updateCS(cs.id,"teamSize",e.target.value)}
//                       className={`${inputBase} ${cs.teamSize ? activeField : idleField}`} />
//                   </div>
//                 </div>
//               ))}

//               <button onClick={addCS}
//                 className="w-full py-3.5 rounded-xl cursor-pointer text-sm font-semibold flex items-center justify-center gap-2 transition-all bg-white"
//                 style={{ border:`1.5px dashed ${G.navyLight}`, color:G.navy }}
//                 onMouseEnter={e=>e.currentTarget.style.background=G.navyBg}
//                 onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
//                 + Add Another Case Study
//               </button>
//             </div>
//           </div>
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer" style={{ color:G.sub }}
//               onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background:G.gradNavy, boxShadow:"0 3px 14px rgba(15,26,59,0.30)" }}
//               onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
//               Continue to Verification →
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
//               {contentOk    && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Content appears original.</InsightCard>}
//               {hasEnterprise && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Enterprise project boosts credibility!</InsightCard>}
//               {needsMore && contentOk && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Add 1 more or mark one as Enterprise.</InsightCard>}
//               {!contentOk && caseStudies[0]?.title && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Complete all required fields.</InsightCard>}
//               {!contentOk && !caseStudies[0]?.title && <div className="text-center py-4">
//                 <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}>
//                   <MdAutoAwesome style={{ color:G.green, fontSize:16 }} />
//                 </div>
//                 <p className="text-xs text-center" style={{ color:G.muted }}>Start adding case studies...</p>
//               </div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step5Portfolio;





// Step5Portfolio.jsx
import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { BsFileText } from "react-icons/bs";

const CLIENT_TYPES = ["Startup","Mid-size","Enterprise"];
const emptyCaseStudy = () => ({ id:Date.now(), title:"", clientType:"", problem:"", solution:"", teamSize:"" });

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af", error:"#ef4444",
};

const inputBase   = "w-full px-3.5 py-3 rounded-xl text-xs text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7]";
const idleField   = "border border-gray-200 bg-white hover:border-gray-300";
const errorField  = "border-[1.5px] border-[#ef4444] bg-[#fff5f5]";

const ErrMsg = ({ msg }) => msg ? <p className="text-xs mt-1 font-medium" style={{ color:G.error }}>⚠ {msg}</p> : null;
const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const validateCS = cs => ({
  title:      !cs.title.trim()      ? "Project title is required"    : "",
  clientType: !cs.clientType        ? "Please select a client type"  : "",
  problem:    !cs.problem.trim()    ? "Problem statement is required" : cs.problem.trim().length < 20 ? "Minimum 20 characters" : "",
  solution:   !cs.solution.trim()   ? "Solution is required"          : cs.solution.trim().length < 20 ? "Minimum 20 characters" : "",
  teamSize:   !cs.teamSize          ? "Team size is required"          : isNaN(+cs.teamSize)||+cs.teamSize<1 ? "Enter a valid number" : "",
});

const Step5Portfolio = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
  const [caseStudies, setCaseStudies] = useState(formData.caseStudies?.length ? formData.caseStudies : [emptyCaseStudy()]);
  const [touchedCS,   setTouchedCS]   = useState({});
  const [submitted,   setSubmitted]   = useState(false);

  const updateCS = (id,field,val) => setCaseStudies(cs=>cs.map(c=>c.id===id?{...c,[field]:val}:c));
  const addCS    = () => setCaseStudies(cs=>[...cs,emptyCaseStudy()]);
  const removeCS = id => setCaseStudies(cs=>cs.filter(c=>c.id!==id));
  const touchCS  = (id,f) => setTouchedCS(p=>({...p,[`${id}_${f}`]:true}));

  const allErrors   = caseStudies.map(cs=>validateCS(cs));
  const allValid    = allErrors.every(errs=>Object.values(errs).every(e=>e===""));
  const hasEnterprise = caseStudies.some(c=>c.clientType==="Enterprise");
  const completedCount = caseStudies.filter(c=>c.title&&c.clientType&&c.problem&&c.solution&&c.teamSize).length;
  const requirementMet = hasEnterprise || caseStudies.length >= 2;

  const isValid = allValid && requirementMet;

  const handleNext = () => {
    setSubmitted(true);
    const allT = {};
    caseStudies.forEach(cs => ["title","clientType","problem","solution","teamSize"].forEach(f=>{ allT[`${cs.id}_${f}`]=true; }));
    setTouchedCS(allT);
    if (!isValid) return;
    updateData({ caseStudies });
    next();
  };

  const fc = (id, field, val) => {
    const key = `${id}_${field}`;
    const err = validateCS(caseStudies.find(c=>c.id===id)||{})[field];
    if (touchedCS[key] && err) return `${inputBase} ${errorField}`;
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
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>Showcase Your Work</h2>
              <p className="text-sm mb-5" style={{ color:G.sub }}>Minimum 1 enterprise project or 2 detailed case studies</p>
              <div className="flex gap-2.5 items-center rounded-xl px-4 py-3 mb-4 border" style={{ background:G.navyBg, borderColor:G.navyBorder }}>
                <BsFileText style={{ color:G.navy }} className="text-sm shrink-0"/>
                <span className="text-xs" style={{ color:G.navy }}>Required: Min 1 enterprise-level project OR 2 detailed case studies</span>
              </div>
              <div className="text-xs font-medium mb-5" style={{ color:G.navy }}>{completedCount}/{caseStudies.length} Case Studies Complete</div>

              {caseStudies.map((cs,idx) => {
                const errs = validateCS(cs);
                return (
                  <div key={cs.id} className="border border-gray-200 rounded-xl p-6 mb-4">
                    <div className="flex justify-between items-center mb-5">
                      <span className="text-sm font-bold" style={{ color:G.navyDeep }}>Case Study #{idx+1}</span>
                      {caseStudies.length>1 && <button onClick={()=>removeCS(cs.id)} className="bg-transparent border-none text-gray-400 cursor-pointer text-lg">×</button>}
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>Project Title *</label>
                      <input type="text" placeholder="e.g., ByteEats Food Delivery" value={cs.title}
                        onChange={e=>updateCS(cs.id,"title",e.target.value)} onBlur={()=>touchCS(cs.id,"title")}
                        className={fc(cs.id,"title",cs.title)}/>
                      <ErrMsg msg={touchedCS[`${cs.id}_title`] && errs.title}/>
                    </div>

                    <div className="mb-4">
                      <label className="block text-xs font-semibold mb-2" style={{ color:G.navyDeep }}>Client Type *</label>
                      <div className="flex gap-2.5 flex-wrap">
                        {CLIENT_TYPES.map(ct=>(
                          <button key={ct} onClick={()=>{ updateCS(cs.id,"clientType",ct); touchCS(cs.id,"clientType"); }}
                            className="flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs transition-all"
                            style={ cs.clientType===ct
                              ? { border:`2px solid ${G.navyLight}`, background:G.navyBg, color:G.navy, fontWeight:700 }
                              : touchedCS[`${cs.id}_clientType`]&&errs.clientType
                              ? { border:"2px solid #ef4444", background:"#fff5f5", color:"#374151" }
                              : { border:"1.5px solid #e5e7eb", background:"#fff", color:"#374151" } }>
                            <div className="rounded-full shrink-0" style={{ width:14, height:14,
                              border: cs.clientType===ct?`4px solid ${G.navyLight}`:"2px solid #d1d5db", background:"#fff" }}/>
                            {ct}
                          </button>
                        ))}
                      </div>
                      <ErrMsg msg={touchedCS[`${cs.id}_clientType`] && errs.clientType}/>
                    </div>

                    {[{field:"problem",label:"Problem Statement *",ph:"Describe the client's problem... (min 20 chars)"},
                      {field:"solution",label:"Solution Delivered *",ph:"Describe your solution... (min 20 chars)"}].map(({field,label,ph})=>(
                      <div key={field} className="mb-4">
                        <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>{label}</label>
                        <textarea placeholder={ph} value={cs[field]} rows={3}
                          onChange={e=>updateCS(cs.id,field,e.target.value)} onBlur={()=>touchCS(cs.id,field)}
                          className={`${fc(cs.id,field,cs[field])} resize-y font-[inherit] leading-relaxed`}/>
                        <ErrMsg msg={touchedCS[`${cs.id}_${field}`] && errs[field]}/>
                      </div>
                    ))}

                    <div>
                      <label className="block text-xs font-semibold mb-1.5" style={{ color:G.navyDeep }}>Team Size *</label>
                      <input type="number" placeholder="e.g., 5" value={cs.teamSize}
                        onChange={e=>updateCS(cs.id,"teamSize",e.target.value)} onBlur={()=>touchCS(cs.id,"teamSize")}
                        className={fc(cs.id,"teamSize",cs.teamSize)}/>
                      <ErrMsg msg={touchedCS[`${cs.id}_teamSize`] && errs.teamSize}/>
                    </div>
                  </div>
                );
              })}

              <button onClick={addCS}
                className="w-full py-3.5 rounded-xl cursor-pointer text-sm font-semibold flex items-center justify-center gap-2 transition-all bg-white"
                style={{ border:`1.5px dashed ${G.navyLight}`, color:G.navy }}
                onMouseEnter={e=>e.currentTarget.style.background=G.navyBg}
                onMouseLeave={e=>e.currentTarget.style.background="#fff"}>
                + Add Another Case Study
              </button>

              {submitted && !requirementMet && allValid && (
                <div className="mt-4 flex gap-2.5 items-center bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                  <span className="text-amber-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-amber-700 font-medium">Add 1 more case study OR mark one as Enterprise to meet requirements.</span>
                </div>
              )}
              {submitted && !allValid && (
                <div className="mt-4 flex gap-2.5 items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-red-700 font-medium">Please fill all required fields in every case study.</span>
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
              Continue to Verification →
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
              {completedCount>=1  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Content appears original.</InsightCard>}
              {hasEnterprise      && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Enterprise project boosts credibility!</InsightCard>}
              {!hasEnterprise && caseStudies.length<2 && completedCount>=1 && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Add 1 more or mark one as Enterprise.</InsightCard>}
              {completedCount===0 && <div className="text-center py-4">
                <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}><MdAutoAwesome style={{ color:G.green, fontSize:16 }}/></div>
                <p className="text-xs text-center" style={{ color:G.muted }}>Start adding case studies...</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step5Portfolio;