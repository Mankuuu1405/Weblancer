// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { MdCheckCircleOutline } from "react-icons/md";

// const TRUST_SCORES = [
//   { label:"Profile",      pct:100, color:"#4f7cff" },
//   { label:"Verification", pct:100, color:"#4f7cff" },
//   { label:"Portfolio",    pct:70,  color:"#a78bfa" },
//   { label:"Team Setup",   pct:80,  color:"#a78bfa" },
// ];

// const GROWTH_STAGES = [
//   { label:"Starter",     sub:"0–5 projects",  price:"$5,000/project",   active:true  },
//   { label:"Growing",     sub:"6–15 projects", price:"$10,000/project",  active:false },
//   { label:"Established", sub:"16+ projects",  price:"$25,000+/project", active:false },
// ];

// const Step9GoLive = ({ formData = {}, prev = () => {} }) => {
//   const navigate = useNavigate();
  
//   const agencyName = formData.agencyName || "TechVision Digital Agency";
//   const firstName  = formData.firstName  || "John";
//   const lastName   = formData.lastName   || "Doe";
//   const trustScore = 65;
//     const handleRole = (role)=>{
//     localStorage.setItem("role",role);
//     navigate('/signin');
//   }

//   return (
//     <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
//       <div className="flex-1 min-w-0">
//         <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-11 py-8 sm:py-10 shadow-sm">
//           <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 sm:mb-8">Agency Activation</h2>

//           {/* Success */}
//           <div className="flex flex-col items-center mb-6 sm:mb-8">
//             <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-[#4f7cff] to-[#7c3aed] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(79,124,255,0.3)]">
//               <MdCheckCircleOutline className="text-white text-3xl sm:text-4xl" />
//             </div>
//             <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1.5 text-center">🎉 Your Agency is Active!</h3>
//             <p className="text-sm text-gray-500 text-center">You're ready to start building your reputation</p>
//           </div>

//           {/* Summary cards row 1 */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
//             {[
//               { label:"Agency", value:agencyName },
//               { label:"Admin",  value:`${firstName} ${lastName}` },
//               { label:"Status", value:"ACTIVE", badge:true, color:"text-green-700", bg:"bg-green-50", border:"border-green-200" },
//             ].map(item => (
//               <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
//                 <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
//                 {item.badge
//                   ? <span className={`text-xs font-bold px-3 py-1 rounded-md border ${item.color} ${item.bg} ${item.border}`}>{item.value}</span>
//                   : <div className="text-xs font-bold text-gray-900 break-words">{item.value}</div>}
//               </div>
//             ))}
//           </div>

//           {/* Summary cards row 2 */}
//           <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
//             {[
//               { label:"Verification", value:"VERIFIED",   color:"text-green-700",  bg:"bg-green-50",  border:"border-green-200"  },
//               { label:"Payment",      value:"READY",      color:"text-blue-700",   bg:"bg-blue-50",   border:"border-blue-200"   },
//               { label:"Permissions",  value:"CONFIGURED", color:"text-violet-700", bg:"bg-violet-50", border:"border-violet-200" },
//             ].map(item => (
//               <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
//                 <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
//                 <span className={`text-xs font-bold px-3 py-1 rounded-md border ${item.color} ${item.bg} ${item.border}`}>{item.value}</span>
//               </div>
//             ))}
//           </div>

//           {/* Growth Path */}
//           <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">
//             <div className="text-sm font-bold text-gray-900 mb-4">📈 Growth Path</div>

//             {/* Progress bar */}
//             <div className="flex mb-4">
//               {GROWTH_STAGES.map((stage, i) => (
//                 <div key={stage.label} className="flex-1">
//                   <div style={{
//                     height: "4px",
//                     background: stage.active ? "#4f7cff" : "#e5e7eb",
//                     borderRadius: i === 0 ? "999px 0 0 999px" : i === GROWTH_STAGES.length - 1 ? "0 999px 999px 0" : "0"
//                   }} />
//                 </div>
//               ))}
//             </div>

//             {/* Stage labels — stack vertically on mobile, horizontal on sm+ */}
//             <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
//               {GROWTH_STAGES.map((stage, i) => (
//                 <div key={stage.label} className={`flex sm:flex-col sm:flex-1 items-center sm:items-start gap-3 sm:gap-0 sm:pr-2
//                   ${i !== 0 ? "sm:border-l-0 border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0" : ""}`}>
//                   {/* Dot indicator on mobile */}
//                   <div className={`w-2 h-2 rounded-full shrink-0 sm:hidden ${stage.active ? "bg-blue-500" : "bg-gray-300"}`} />
//                   <div>
//                     <div className={`text-xs font-bold mb-0.5 ${stage.active ? "text-blue-500" : "text-gray-700"}`}>{stage.label}</div>
//                     <div className="text-[11px] text-gray-400 mb-0.5">{stage.sub}</div>
//                     <div className={`text-xs font-semibold ${stage.active ? "text-blue-500" : "text-gray-500"}`}>{stage.price}</div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>

//           {/* Trust Score */}
//           <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
//             <div className="text-sm font-bold text-gray-900 mb-4">⭐ Trust Score</div>
//             <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
//               {/* Score number */}
//               <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0 shrink-0">
//                 <div className="flex items-baseline gap-0.5">
//                   <span className="text-4xl sm:text-3xl font-extrabold text-gray-900">{trustScore}</span>
//                   <span className="text-base text-gray-400 font-medium">/100</span>
//                 </div>
//                 {/* Mini ring indicator on mobile */}
//                 <div className="flex-1 sm:hidden h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                   <div style={{ width:`${trustScore}%`, background:"#4f7cff" }} className="h-full rounded-full" />
//                 </div>
//               </div>

//               {/* Score bars */}
//               <div className="flex-1">
//                 {TRUST_SCORES.map(item => (
//                   <div key={item.label} className="flex items-center gap-2.5 mb-2.5">
//                     <div className="text-xs text-gray-500 w-20 shrink-0">{item.label}</div>
//                     <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                       <div style={{ width:`${item.pct}%`, background:item.color }} className="h-full rounded-full transition-all duration-700" />
//                     </div>
//                     <div className="text-xs font-semibold text-gray-700 w-9 text-right">{item.pct}%</div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//          {/* Bottom Bar */}
//         <div className="flex justify-between items-center pt-5">
//           <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">
//             ← Back
//           </button>
//           <button
//             onClick={()=> handleRole("agency")}
//             className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all"
//           >
//            Sign in →
//           </button>
//         </div>
//       </div>

//       {/* Intentionally empty sidebar placeholder */}
//       <div className="hidden lg:block lg:w-[290px] lg:shrink-0" />
//     </div>
//   );
// };

// export default Step9GoLive;






// // Step9GoLive.jsx
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import { MdCheckCircleOutline } from "react-icons/md";

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

// const TRUST_SCORES = [
//   { label:"Profile",      pct:100, color: B.green    },
//   { label:"Verification", pct:100, color: B.green    },
//   { label:"Portfolio",    pct:70,  color: B.navyMid  },
//   { label:"Team Setup",   pct:80,  color: B.navyMid  },
// ];

// const GROWTH_STAGES = [
//   { label:"Starter",     sub:"0–5 projects",  price:"$5,000/project",   active:true  },
//   { label:"Growing",     sub:"6–15 projects", price:"$10,000/project",  active:false },
//   { label:"Established", sub:"16+ projects",  price:"$25,000+/project", active:false },
// ];

// const Step9GoLive = ({ formData = {}, prev = () => {} }) => {
//   const navigate   = useNavigate();
//   const agencyName = formData.agencyName || "TechVision Digital Agency";
//   const firstName  = formData.firstName  || "John";
//   const lastName   = formData.lastName   || "Doe";
//   const trustScore = 65;

//   const handleRole = (role) => {
//     localStorage.setItem("role", role);
//     navigate("/signin");
//   };

//   return (
//     <div className="w-full flex justify-center">
//       <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

//         {/* ── Main Card ── */}
//         <div className="flex-1 min-w-0">
//           <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">

//             {/* Top accent */}
//             <div style={{ height: 4, background: B.mixedGrad }} />

//             <div className="px-5 sm:px-10 py-8 sm:py-10">
//               <h2 className="text-xl sm:text-2xl font-extrabold mb-6 sm:mb-8" style={{ color: B.navy }}>
//                 Agency Activation
//               </h2>

//               {/* Success icon — mixed gradient */}
//               <div className="flex flex-col items-center mb-6 sm:mb-8">
//                 <div
//                   className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center mb-4"
//                   style={{ background: B.mixedGrad, boxShadow: "0 8px 24px rgba(110,192,48,0.30)" }}
//                 >
//                   <MdCheckCircleOutline className="text-white text-3xl sm:text-4xl" />
//                 </div>
//                 <h3 className="text-lg sm:text-xl font-extrabold mb-1.5 text-center" style={{ color: B.navy }}>
//                   🎉 Your Agency is Active!
//                 </h3>
//                 <p className="text-sm text-gray-500 text-center">You're ready to start building your reputation</p>
//               </div>

//               {/* Summary row 1 */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
//                 {[
//                   { label:"Agency", value: agencyName },
//                   { label:"Admin",  value: `${firstName} ${lastName}` },
//                   { label:"Status", value:"ACTIVE", badge:true,
//                     style:{ color: B.greenDark, background: B.greenBg, border:`1px solid ${B.greenBdr}` } },
//                 ].map(item => (
//                   <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
//                     <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
//                     {item.badge
//                       ? <span className="text-xs font-bold px-3 py-1 rounded-md" style={item.style}>{item.value}</span>
//                       : <div className="text-xs font-bold text-gray-900 break-words">{item.value}</div>}
//                   </div>
//                 ))}
//               </div>

//               {/* Summary row 2 */}
//               <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
//                 {[
//                   { label:"Verification", value:"VERIFIED",   style:{ color:B.greenDark, background:B.greenBg,  border:`1px solid ${B.greenBdr}` } },
//                   { label:"Payment",      value:"READY",      style:{ color:B.navyMid,   background:B.navyBg,   border:`1px solid ${B.navyBdr}`  } },
//                   { label:"Permissions",  value:"CONFIGURED", style:{ color:B.navyMid,   background:B.navyBg,   border:`1px solid ${B.navyBdr}`  } },
//                 ].map(item => (
//                   <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
//                     <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
//                     <span className="text-xs font-bold px-3 py-1 rounded-md" style={item.style}>{item.value}</span>
//                   </div>
//                 ))}
//               </div>

//               {/* Growth Path */}
//               <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">
//                 <div className="text-sm font-bold mb-4" style={{ color: B.navy }}>📈 Growth Path</div>
//                 {/* Progress bar — Green for active */}
//                 <div className="flex mb-4">
//                   {GROWTH_STAGES.map((stage, i) => (
//                     <div key={stage.label} className="flex-1">
//                       <div style={{
//                         height: 4,
//                         background: stage.active ? B.green : "#e5e7eb",
//                         borderRadius: i === 0 ? "999px 0 0 999px" : i === GROWTH_STAGES.length - 1 ? "0 999px 999px 0" : "0",
//                       }} />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
//                   {GROWTH_STAGES.map((stage, i) => (
//                     <div
//                       key={stage.label}
//                       className={`flex sm:flex-col sm:flex-1 items-center sm:items-start gap-3 sm:gap-0 sm:pr-2
//                         ${i !== 0 ? "border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0" : ""}`}
//                     >
//                       <div className="w-2 h-2 rounded-full shrink-0 sm:hidden"
//                         style={{ background: stage.active ? B.green : "#d1d5db" }} />
//                       <div>
//                         <div className="text-xs font-bold mb-0.5" style={{ color: stage.active ? B.green : "#374151" }}>{stage.label}</div>
//                         <div className="text-[11px] text-gray-400 mb-0.5">{stage.sub}</div>
//                         <div className="text-xs font-semibold" style={{ color: stage.active ? B.greenDark : "#6b7280" }}>{stage.price}</div>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               {/* Trust Score */}
//               <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
//                 <div className="text-sm font-bold mb-4" style={{ color: B.navy }}>⭐ Trust Score</div>
//                 <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
//                   <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0 shrink-0">
//                     <div className="flex items-baseline gap-0.5">
//                       <span className="text-4xl sm:text-3xl font-extrabold" style={{ color: B.navy }}>{trustScore}</span>
//                       <span className="text-base text-gray-400 font-medium">/100</span>
//                     </div>
//                     <div className="flex-1 sm:hidden h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                       <div style={{ width:`${trustScore}%`, background: B.green }} className="h-full rounded-full" />
//                     </div>
//                   </div>
//                   <div className="flex-1">
//                     {TRUST_SCORES.map(item => (
//                       <div key={item.label} className="flex items-center gap-2.5 mb-2.5">
//                         <div className="text-xs text-gray-500 w-20 shrink-0">{item.label}</div>
//                         <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                           <div style={{ width:`${item.pct}%`, background: item.color }} className="h-full rounded-full transition-all duration-700" />
//                         </div>
//                         <div className="text-xs font-semibold text-gray-700 w-9 text-right">{item.pct}%</div>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Nav */}
//           <div className="flex justify-between items-center pt-5">
//             <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">← Back</button>
//             <button
//               onClick={() => handleRole("agency")}
//               className="hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
//               style={{ background: B.btnGrad, boxShadow: "0 4px 16px rgba(46,125,31,0.25)" }}
//             >
//               Sign in →
//             </button>
//           </div>
//         </div>

//         {/* Empty sidebar placeholder to maintain layout */}
//         <div className="hidden lg:block lg:w-[280px] lg:shrink-0" />

//       </div>
//     </div>
//   );
// };
// export default Step9GoLive;







// Step9GoLive.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckCircleOutline } from "react-icons/md";

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  gradGreen:"linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af",
};

const TRUST_SCORES = [
  { label:"Profile",      pct:100, color:G.green     },
  { label:"Verification", pct:100, color:G.green     },
  { label:"Portfolio",    pct:70,  color:G.navyLight  },
  { label:"Team Setup",   pct:80,  color:G.navyLight  },
];

const GROWTH_STAGES = [
  { label:"Starter",     sub:"0–5 projects",  price:"$5,000/project",   active:true  },
  { label:"Growing",     sub:"6–15 projects", price:"$10,000/project",  active:false },
  { label:"Established", sub:"16+ projects",  price:"$25,000+/project", active:false },
];

const Step9GoLive = ({ formData={}, prev=()=>{} }) => {
  const navigate   = useNavigate();
  const agencyName = formData.agencyName || "TechVision Digital Agency";
  const firstName  = formData.firstName  || "John";
  const lastName   = formData.lastName   || "Doe";
  const trustScore = 65;

  const handleRole = role => { localStorage.setItem("role",role); navigate("/signin"); };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />
            <div className="px-5 sm:px-10 py-8 sm:py-10">
              <h2 className="text-xl sm:text-2xl font-extrabold mb-6 sm:mb-8" style={{ color:G.navyDeep }}>Agency Activation</h2>

              {/* Success — Navy gradient circle (matches Avatar) */}
              <div className="flex flex-col items-center mb-6 sm:mb-8">
                <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full flex items-center justify-center mb-4"
                  style={{ background:G.gradNavy, boxShadow:"0 8px 24px rgba(15,26,59,0.30)" }}>
                  <MdCheckCircleOutline className="text-white text-3xl sm:text-4xl" />
                </div>
                <h3 className="text-lg sm:text-xl font-extrabold mb-1.5 text-center" style={{ color:G.navyDeep }}>🎉 Your Agency is Active!</h3>
                <p className="text-sm text-center" style={{ color:G.sub }}>You're ready to start building your reputation</p>
              </div>

              {/* Summary row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
                {[
                  { label:"Agency", value:agencyName },
                  { label:"Admin",  value:`${firstName} ${lastName}` },
                  { label:"Status", value:"ACTIVE", badge:true, style:{ color:G.greenDeep, background:G.greenBg, border:`1px solid ${G.greenBorder}` } },
                ].map(item=>(
                  <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
                    <div className="text-[11px] font-medium mb-1.5" style={{ color:G.muted }}>{item.label}</div>
                    {item.badge
                      ? <span className="text-xs font-bold px-3 py-1 rounded-md" style={item.style}>{item.value}</span>
                      : <div className="text-xs font-bold text-gray-900 break-words">{item.value}</div>}
                  </div>
                ))}
              </div>

              {/* Summary row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
                {[
                  { label:"Verification", value:"VERIFIED",   style:{ color:G.greenDeep, background:G.greenBg, border:`1px solid ${G.greenBorder}` } },
                  { label:"Payment",      value:"READY",      style:{ color:G.navy,      background:G.navyBg,  border:`1px solid ${G.navyBorder}`  } },
                  { label:"Permissions",  value:"CONFIGURED", style:{ color:G.navy,      background:G.navyBg,  border:`1px solid ${G.navyBorder}`  } },
                ].map(item=>(
                  <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
                    <div className="text-[11px] font-medium mb-1.5" style={{ color:G.muted }}>{item.label}</div>
                    <span className="text-xs font-bold px-3 py-1 rounded-md" style={item.style}>{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Growth Path */}
              <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">
                <div className="text-sm font-bold mb-4" style={{ color:G.navyDeep }}>📈 Growth Path</div>
                <div className="flex mb-4">
                  {GROWTH_STAGES.map((stage,i)=>(
                    <div key={stage.label} className="flex-1">
                      <div style={{ height:4,
                        background: stage.active ? G.green : "#e5e7eb",
                        borderRadius: i===0?"999px 0 0 999px":i===GROWTH_STAGES.length-1?"0 999px 999px 0":"0" }} />
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
                  {GROWTH_STAGES.map((stage,i)=>(
                    <div key={stage.label} className={`flex sm:flex-col sm:flex-1 items-center sm:items-start gap-3 sm:gap-0 sm:pr-2 ${i!==0?"border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0":""}`}>
                      <div className="w-2 h-2 rounded-full shrink-0 sm:hidden" style={{ background: stage.active ? G.green : "#d1d5db" }} />
                      <div>
                        <div className="text-xs font-bold mb-0.5" style={{ color: stage.active ? G.green : "#374151" }}>{stage.label}</div>
                        <div className="text-[11px] text-gray-400 mb-0.5">{stage.sub}</div>
                        <div className="text-xs font-semibold" style={{ color: stage.active ? G.greenDeep : "#6b7280" }}>{stage.price}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Trust Score */}
              <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
                <div className="text-sm font-bold mb-4" style={{ color:G.navyDeep }}>⭐ Trust Score</div>
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
                  <div className="flex sm:flex-col items-center gap-2 sm:gap-0 shrink-0">
                    <div className="flex items-baseline gap-0.5">
                      <span className="text-4xl sm:text-3xl font-extrabold" style={{ color:G.navyDeep }}>{trustScore}</span>
                      <span className="text-base font-medium" style={{ color:G.muted }}>/100</span>
                    </div>
                    <div className="flex-1 sm:hidden h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div style={{ width:`${trustScore}%`, background:G.gradNavy }} className="h-full rounded-full" />
                    </div>
                  </div>
                  <div className="flex-1">
                    {TRUST_SCORES.map(item=>(
                      <div key={item.label} className="flex items-center gap-2.5 mb-2.5">
                        <div className="text-xs w-20 shrink-0" style={{ color:G.muted }}>{item.label}</div>
                        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                          <div style={{ width:`${item.pct}%`, background:item.color }} className="h-full rounded-full transition-all duration-700" />
                        </div>
                        <div className="text-xs font-semibold text-gray-700 w-9 text-right">{item.pct}%</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-5">
            <button onClick={prev} className="bg-transparent border-none text-sm font-semibold cursor-pointer" style={{ color:G.sub }}
              onMouseEnter={e=>e.currentTarget.style.color=G.navyDeep} onMouseLeave={e=>e.currentTarget.style.color=G.sub}>← Back</button>
            {/* Sign In → gradGreen (matches View Portfolio button in PublicProfile) */}
            <button onClick={()=>handleRole("agency")}
              className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
              style={{ background:G.gradGreen, boxShadow:"0 3px 14px rgba(46,125,31,0.24)" }}
              onMouseEnter={e=>{ e.currentTarget.style.opacity="0.88"; e.currentTarget.style.boxShadow="0 5px 20px rgba(46,125,31,0.36)"; }}
              onMouseLeave={e=>{ e.currentTarget.style.opacity="1"; e.currentTarget.style.boxShadow="0 3px 14px rgba(46,125,31,0.24)"; }}>
              Sign in →
            </button>
          </div>
        </div>
        <div className="hidden lg:block lg:w-[280px] lg:shrink-0" />
      </div>
    </div>
  );
};
export default Step9GoLive;