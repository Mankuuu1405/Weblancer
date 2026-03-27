// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";

// const PRIMARY_SERVICES = ["Web Development","Mobile Apps","UI/UX Design","AI/ML","Blockchain","Cloud Services","DevOps","Data Science","Cybersecurity","IoT"];
// const TECH_STACK = ["React","Node.js","Python","TypeScript","AWS","Docker","PostgreSQL","MongoDB","Flutter","Swift","Kotlin","Go","Rust","Vue.js","Angular","Django","Rails"];
// const INDUSTRIES = ["FinTech","HealthTech","E-commerce","Education","Real Estate","Logistics","Media","Government","Retail","SaaS"];
// const MAX_PRIMARY = 5, MAX_TECH = 10, MAX_IND = 5;

// const TagChip = ({ label, selected, onClick }) => (
//   <button onClick={onClick}
//     className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-xs font-medium transition-all
//       ${selected ? "bg-blue-500 text-white border-none" : "bg-white text-gray-700 border-[1.5px] border-gray-200 hover:border-blue-300"}`}>
//     {label}
//     {selected && <span className="text-xs opacity-80">×</span>}
//   </button>
// );

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step4Services = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [services,   setServices]   = useState(formData.services   || []);
//   const [techStack,  setTechStack]  = useState(formData.techStack  || []);
//   const [industries, setIndustries] = useState(formData.industries || []);

//   const toggle = (list, setList, item, max) => {
//     if (list.includes(item)) setList(list.filter(x => x !== item));
//     else if (list.length < max) setList([...list, item]);
//   };

//   const tooManyServices = services.length > 3;
//   const techAligns      = techStack.length >= 3 && services.length >= 1;
//   const focusTip        = services.length >= 1 && services.length <= 3;

//   const handleNext = () => { updateData({ services, techStack, industries }); next(); };

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
//           <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">What You Offer</h2>
//           <p className="text-sm text-gray-500 mb-5">Define your agency's service capabilities</p>

//           <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//             <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//             <span className="text-xs text-amber-800 leading-relaxed">Be strategic: Fewer, accurate services perform better than exaggerated claims.</span>
//           </div>

//           {[
//             { label:"Primary Services *", list:services, setList:setServices, items:PRIMARY_SERVICES, max:MAX_PRIMARY },
//             { label:"Technology Stack *",  list:techStack, setList:setTechStack, items:TECH_STACK, max:MAX_TECH },
//             { label:"Industries Served *", list:industries, setList:setIndustries, items:INDUSTRIES, max:MAX_IND },
//           ].map(({ label, list, setList, items, max }) => (
//             <div key={label} className="mb-7 last:mb-0">
//               <div className="flex justify-between items-center mb-3">
//                 <label className="text-sm font-semibold text-gray-900">{label}</label>
//                 <span className={`text-xs ${list.length >= max ? "text-red-500" : "text-gray-500"}`}>{list.length}/{max} selected</span>
//               </div>
//               <div className="flex flex-wrap gap-2">
//                 {items.map(s => <TagChip key={s} label={s} selected={list.includes(s)} onClick={() => toggle(list, setList, s, max)} />)}
//               </div>
//             </div>
//           ))}
//         </div>

//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
//           <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
//             Continue to Portfolio →
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
//             {tooManyServices && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Be strategic: Fewer, accurate services perform better than exaggerated claims.</InsightCard>}
//             {focusTip        && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Focus on 2–3 core competencies for better results.</InsightCard>}
//             {techAligns      && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Your tech stack selections align well.</InsightCard>}
//             {!tooManyServices && !focusTip && !techAligns && <p className="text-xs text-gray-400 text-center py-2">Start selecting services to see AI suggestions...</p>}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step4Services;







// // Step4Services.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";

// const PRIMARY_SERVICES = ["Web Development","Mobile Apps","UI/UX Design","AI/ML","Blockchain","Cloud Services","DevOps","Data Science","Cybersecurity","IoT"];
// const TECH_STACK = ["React","Node.js","Python","TypeScript","AWS","Docker","PostgreSQL","MongoDB","Flutter","Swift","Kotlin","Go","Rust","Vue.js","Angular","Django","Rails"];
// const INDUSTRIES = ["FinTech","HealthTech","E-commerce","Education","Real Estate","Logistics","Media","Government","Retail","SaaS"];
// const MAX_PRIMARY = 5, MAX_TECH = 10, MAX_IND = 5;

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

// /* Tag chip — selected: Green bg, unselected: white */
// const TagChip = ({ label, selected, onClick }) => (
//   <button onClick={onClick}
//     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-xs font-medium transition-all"
//     style={
//       selected
//         ? { background: B.green, color: "#fff", border: "none" }
//         : { background: "#fff", color: "#374151", border: "1.5px solid #e5e7eb" }
//     }
//   >
//     {label}
//     {selected && <span className="text-xs opacity-80">×</span>}
//   </button>
// );

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

// const Step4Services = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
//   const [services,   setServices]   = useState(formData.services   || []);
//   const [techStack,  setTechStack]  = useState(formData.techStack  || []);
//   const [industries, setIndustries] = useState(formData.industries || []);

//   const toggle = (list, setList, item, max) => {
//     if (list.includes(item)) setList(list.filter(x => x !== item));
//     else if (list.length < max) setList([...list, item]);
//   };

//   const tooManyServices = services.length > 3;
//   const techAligns      = techStack.length >= 3 && services.length >= 1;
//   const focusTip        = services.length >= 1 && services.length <= 3;

//   const handleNext = () => { updateData({ services, techStack, industries }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Form Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color: B.navy }}>What You Offer</h2>
//               <p className="text-sm text-gray-500 mb-5">Define your agency's service capabilities</p>

//               <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//                 <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//                 <span className="text-xs text-amber-800 leading-relaxed">
//                   Be strategic: Fewer, accurate services perform better than exaggerated claims.
//                 </span>
//               </div>

//               {[
//                 { label: "Primary Services *",  list: services,   setList: setServices,   items: PRIMARY_SERVICES, max: MAX_PRIMARY },
//                 { label: "Technology Stack *",  list: techStack,  setList: setTechStack,  items: TECH_STACK,       max: MAX_TECH    },
//                 { label: "Industries Served *", list: industries, setList: setIndustries, items: INDUSTRIES,       max: MAX_IND     },
//               ].map(({ label, list, setList, items, max }) => (
//                 <div key={label} className="mb-7 last:mb-0">
//                   <div className="flex justify-between items-center mb-3">
//                     <label className="text-sm font-semibold" style={{ color: B.navy }}>{label}</label>
//                     <span
//                       className="text-xs font-semibold"
//                       style={{ color: list.length >= max ? "#ef4444" : B.navyMid }}
//                     >
//                       {list.length}/{max} selected
//                     </span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {items.map(s => (
//                       <TagChip key={s} label={s} selected={list.includes(s)} onClick={() => toggle(list, setList, s, max)} />
//                     ))}
//                   </div>
//                 </div>
//               ))}
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
//               Continue to Portfolio →
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
//               {tooManyServices && (
//                 <InsightCard type="warn">
//                   <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />
//                   Be strategic: Fewer, accurate services perform better.
//                 </InsightCard>
//               )}
//               {focusTip && (
//                 <InsightCard type="info">
//                   <span className="text-sm shrink-0">💡</span>
//                   Focus on 2–3 core competencies for better results.
//                 </InsightCard>
//               )}
//               {techAligns && (
//                 <InsightCard type="success">
//                   <MdCheckCircleOutline className="shrink-0 text-sm" />
//                   Your tech stack selections align well.
//                 </InsightCard>
//               )}
//               {!tooManyServices && !focusTip && !techAligns && (
//                 <div className="text-center py-4">
//                   <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: B.greenBg }}>
//                     <MdAutoAwesome style={{ color: B.green, fontSize: 16 }} />
//                   </div>
//                   <p className="text-xs text-gray-400 text-center">Start selecting services to see AI suggestions...</p>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>

//       </div>
//     </div>
//   );
// };
// export default Step4Services;










// // Step4Services.jsx
// import React, { useState } from "react";
// import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";

// const PRIMARY_SERVICES = ["Web Development","Mobile Apps","UI/UX Design","AI/ML","Blockchain","Cloud Services","DevOps","Data Science","Cybersecurity","IoT"];
// const TECH_STACK = ["React","Node.js","Python","TypeScript","AWS","Docker","PostgreSQL","MongoDB","Flutter","Swift","Kotlin","Go","Rust","Vue.js","Angular","Django","Rails"];
// const INDUSTRIES = ["FinTech","HealthTech","E-commerce","Education","Real Estate","Logistics","Media","Government","Retail","SaaS"];
// const MAX_PRIMARY=5, MAX_TECH=10, MAX_IND=5;

// const G = {
//   green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
//   navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
//   gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
//   mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
//   sub:"#4b5563", muted:"#9ca3af",
// };

// /* Tag → Navy when selected (matches Invite button style) */
// const TagChip = ({ label, selected, onClick }) => (
//   <button onClick={onClick}
//     className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-xs font-medium transition-all"
//     style={ selected
//       ? { background:G.gradNavy, color:"#fff", border:"none" }
//       : { background:"#fff", color:"#374151", border:"1.5px solid #e5e7eb" } }>
//     {label}{selected && <span className="text-xs opacity-80">×</span>}
//   </button>
// );

// const InsightCard = ({ type, children }) => {
//   const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
//   return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
// };

// const Step4Services = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
//   const [services,   setServices]   = useState(formData.services   || []);
//   const [techStack,  setTechStack]  = useState(formData.techStack  || []);
//   const [industries, setIndustries] = useState(formData.industries || []);

//   const toggle = (list, setList, item, max) => {
//     if (list.includes(item)) setList(list.filter(x=>x!==item));
//     else if (list.length < max) setList([...list, item]);
//   };

//   const tooMany  = services.length > 3;
//   const aligned  = techStack.length >= 3 && services.length >= 1;
//   const focusTip = services.length >= 1 && services.length <= 3;
//   const handleNext = () => { updateData({ services, techStack, industries }); next(); };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
//         <div className="flex-1 min-w-0">
//           <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
//             <div style={{ height:4, background:G.mixedGrad }} />
//             <div className="px-6 sm:px-10 py-9">
//               <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>What You Offer</h2>
//               <p className="text-sm mb-5" style={{ color:G.sub }}>Define your agency's service capabilities</p>
//               <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
//                 <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
//                 <span className="text-xs text-amber-800 leading-relaxed">Be strategic: Fewer, accurate services perform better.</span>
//               </div>
//               {[
//                 { label:"Primary Services *",  list:services,   setList:setServices,   items:PRIMARY_SERVICES, max:MAX_PRIMARY },
//                 { label:"Technology Stack *",  list:techStack,  setList:setTechStack,  items:TECH_STACK,       max:MAX_TECH    },
//                 { label:"Industries Served *", list:industries, setList:setIndustries, items:INDUSTRIES,       max:MAX_IND     },
//               ].map(({ label, list, setList, items, max }) => (
//                 <div key={label} className="mb-7 last:mb-0">
//                   <div className="flex justify-between items-center mb-3">
//                     <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>{label}</label>
//                     <span className="text-xs font-semibold" style={{ color: list.length>=max ? "#ef4444" : G.navy }}>{list.length}/{max}</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2">
//                     {items.map(s=><TagChip key={s} label={s} selected={list.includes(s)} onClick={()=>toggle(list,setList,s,max)} />)}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer" style={{ color:G.sub }}
//               onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
//             <button onClick={handleNext}
//               className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background:G.gradNavy, boxShadow:"0 3px 14px rgba(15,26,59,0.30)" }}
//               onMouseEnter={e=>e.currentTarget.style.opacity="0.88"} onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
//               Continue to Portfolio →
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
//               {tooMany  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Too many services selected.</InsightCard>}
//               {focusTip && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Focus on 2–3 core competencies.</InsightCard>}
//               {aligned  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Tech stack aligns well.</InsightCard>}
//               {!tooMany && !focusTip && !aligned && <div className="text-center py-4">
//                 <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}>
//                   <MdAutoAwesome style={{ color:G.green, fontSize:16 }} />
//                 </div>
//                 <p className="text-xs text-center" style={{ color:G.muted }}>Start selecting services...</p>
//               </div>}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };
// export default Step4Services;






// Step4Services.jsx
import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";

const PRIMARY_SERVICES = ["Web Development","Mobile Apps","UI/UX Design","AI/ML","Blockchain","Cloud Services","DevOps","Data Science","Cybersecurity","IoT"];
const TECH_STACK = ["React","Node.js","Python","TypeScript","AWS","Docker","PostgreSQL","MongoDB","Flutter","Swift","Kotlin","Go","Rust","Vue.js","Angular","Django","Rails"];
const INDUSTRIES = ["FinTech","HealthTech","E-commerce","Education","Real Estate","Logistics","Media","Government","Retail","SaaS"];
const MAX_PRIMARY=5, MAX_TECH=10, MAX_IND=5;

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af", error:"#ef4444",
};

const ErrMsg = ({ msg }) => msg ? <p className="text-xs mt-2 font-medium" style={{ color:G.error }}>⚠ {msg}</p> : null;

const TagChip = ({ label, selected, onClick }) => (
  <button onClick={onClick}
    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-xs font-medium transition-all"
    style={ selected
      ? { background:G.gradNavy, color:"#fff", border:"none" }
      : { background:"#fff", color:"#374151", border:"1.5px solid #e5e7eb" } }>
    {label}{selected&&<span className="text-xs opacity-80">×</span>}
  </button>
);

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]", info:"bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step4Services = ({ formData={}, updateData=()=>{}, next=()=>{}, prev=()=>{} }) => {
  const [services,   setServices]   = useState(formData.services   || []);
  const [techStack,  setTechStack]  = useState(formData.techStack  || []);
  const [industries, setIndustries] = useState(formData.industries || []);
  const [submitted,  setSubmitted]  = useState(false);

  const toggle = (list, setList, item, max) => {
    if (list.includes(item)) setList(list.filter(x=>x!==item));
    else if (list.length<max) setList([...list,item]);
  };

  const errors = {
    services:   services.length   === 0 ? "Select at least 1 primary service"  : "",
    techStack:  techStack.length  === 0 ? "Select at least 1 technology"        : "",
    industries: industries.length === 0 ? "Select at least 1 industry"          : "",
  };

  const isValid = Object.values(errors).every(e=>e==="");

  const handleNext = () => {
    setSubmitted(true);
    if (!isValid) return;
    updateData({ services, techStack, industries });
    next();
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />
            <div className="px-6 sm:px-10 py-9">
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>What You Offer</h2>
              <p className="text-sm mb-5" style={{ color:G.sub }}>Define your agency's service capabilities</p>
              <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
                <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5"/>
                <span className="text-xs text-amber-800 leading-relaxed">Be strategic: Fewer, accurate services perform better.</span>
              </div>

              {[
                { label:"Primary Services *",  list:services,   setList:setServices,   items:PRIMARY_SERVICES, max:MAX_PRIMARY, field:"services"   },
                { label:"Technology Stack *",  list:techStack,  setList:setTechStack,  items:TECH_STACK,       max:MAX_TECH,    field:"techStack"  },
                { label:"Industries Served *", list:industries, setList:setIndustries, items:INDUSTRIES,       max:MAX_IND,     field:"industries" },
              ].map(({ label, list, setList, items, max, field }) => (
                <div key={label} className="mb-7 last:mb-0">
                  <div className="flex justify-between items-center mb-3">
                    <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>{label}</label>
                    <span className="text-xs font-semibold" style={{ color:list.length>=max?"#ef4444":G.navy }}>{list.length}/{max}</span>
                  </div>
                  <div className={`flex flex-wrap gap-2 p-3 rounded-xl transition-all ${submitted&&errors[field] ? "border-[1.5px] border-[#ef4444] bg-[#fff5f5]" : "border border-transparent"}`}>
                    {items.map(s=><TagChip key={s} label={s} selected={list.includes(s)} onClick={()=>toggle(list,setList,s,max)}/>)}
                  </div>
                  <ErrMsg msg={submitted && errors[field]}/>
                </div>
              ))}

              {!isValid && submitted && (
                <div className="mt-2 flex gap-2.5 items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-red-700 font-medium">Please select at least one option in each required section.</span>
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
              Continue to Portfolio →
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
              {services.length>3  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>Too many services may reduce trust.</InsightCard>}
              {services.length>=1 && services.length<=3 && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Focus on 2–3 core competencies.</InsightCard>}
              {techStack.length>=3&&services.length>=1 && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm"/>Tech stack aligns well.</InsightCard>}
              {services.length===0&&techStack.length===0&&industries.length===0 && <div className="text-center py-4">
                <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}><MdAutoAwesome style={{ color:G.green, fontSize:16 }}/></div>
                <p className="text-xs text-center" style={{ color:G.muted }}>Start selecting services...</p>
              </div>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step4Services;