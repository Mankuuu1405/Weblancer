// import React, { useState } from "react";

// const projectsData = [
//   { id: 1, name: "Food Delivery App",      client: "John D.",    freelancer: "TechVision Agency", type: "agency",     amount: 42000, status: "healthy", milestone: "M2 — Core Dev (55%)",        alert: null,                                              tickets: 0, silence: null,       frozen: false },
//   { id: 2, name: "Brand Identity Package", client: "StartupX",   freelancer: "Sara M.",           type: "freelancer", amount: 3500,  status: "warning", milestone: "M1 — Concepts (80%)",        alert: "Silence alert: 5 days no response from freelancer", tickets: 1, silence: "5D SILENCE", frozen: false },
//   { id: 3, name: "API Integration",        client: "DataCo",     freelancer: "Dev Mike",          type: "freelancer", amount: 8000,  status: "healthy", milestone: "M2 — Implementation (30%)", alert: null,                                              tickets: 0, silence: null,       frozen: false },
//   { id: 4, name: "E-commerce Site",        client: "FashionHub", freelancer: "CodeCraft Agency",  type: "agency",     amount: 28000, status: "frozen",  milestone: "M1 — Design (100%)",         alert: "Frozen: Active dispute over milestone scope",       tickets: 2, silence: null,       frozen: true  },
// ];

// const statusIcon = {
//   healthy: <span className="w-[22px] h-[22px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>,
//   warning: <span className="w-[22px] h-[22px] rounded-full bg-amber-100  text-amber-600  flex items-center justify-center text-xs font-bold shrink-0">⚠</span>,
//   frozen:  <span className="w-[22px] h-[22px] rounded-full bg-blue-100   text-blue-600   flex items-center justify-center text-xs font-bold shrink-0">❄</span>,
// };

// const borderColor = { healthy: "border-l-emerald-500", warning: "border-l-amber-400", frozen: "border-l-blue-500" };

// const Projects = () => {
//   const [projects] = useState(projectsData);
//   const healthy = projects.filter((p) => p.status === "healthy").length;
//   const warning = projects.filter((p) => p.status === "warning").length;
//   const frozen  = projects.filter((p) => p.status === "frozen").length;

//   return (
//     <div>
//       {/* Stats */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
//         {[
//           { num: projects.length, label: "Active Projects", color: "text-gray-900"    },
//           { num: healthy,         label: "Healthy",         color: "text-emerald-500" },
//           { num: warning,         label: "Needs Attention", color: "text-amber-400"   },
//           { num: frozen,          label: "Frozen",          color: "text-blue-500"    },
//         ].map((s) => (
//           <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-6 text-center shadow-sm hover:shadow-md transition-shadow">
//             <div className={`text-4xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
//             <div className="text-xs text-gray-500 font-medium">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Project Cards */}
//       {projects.map((p) => (
//         <div
//           key={p.id}
//           className={`bg-white border border-gray-200 border-l-4 ${borderColor[p.status]} rounded-2xl px-5 sm:px-6 py-5 mb-3.5 shadow-sm hover:shadow-md hover:-translate-y-px transition-all`}
//         >
//           {/* Top */}
//           <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
//             <div className="flex-1 min-w-0">
//               <div className="flex items-center gap-2.5 mb-1">
//                 {statusIcon[p.status]}
//                 <h3 className="text-base font-bold text-gray-900">{p.name}</h3>
//               </div>
//               <div className="text-xs text-gray-500 ml-8 mb-2">{p.client} → {p.freelancer} ({p.type})</div>
//               {p.alert && (
//                 <div className="text-xs text-amber-600 ml-8 flex items-center gap-1">⚠ {p.alert}</div>
//               )}
//             </div>
//             <div className="flex items-center gap-2 flex-wrap ml-8 sm:ml-0 shrink-0">
//               <span className="text-base font-bold text-gray-900">${p.amount.toLocaleString()}</span>
//               {p.tickets > 0 && (
//                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
//                   🎫 {p.tickets} TICKET{p.tickets > 1 ? "S" : ""}
//                 </span>
//               )}
//               {p.silence && (
//                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
//                   ⏰ {p.silence}
//                 </span>
//               )}
//               {p.frozen && (
//                 <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
//                   ❄ FROZEN
//                 </span>
//               )}
//             </div>
//           </div>

//           {/* Bottom */}
//           <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
//             <span className="text-xs text-gray-500 ml-8">{p.milestone}</span>
//             <div className="flex gap-2 ml-8 sm:ml-0">
//               <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
//                 👁 Open Stream
//               </button>
//               <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
//                 💬 Post Message
//               </button>
//             </div>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Projects;




import React, { useState } from "react";

const WBL_CSS = `
  .wbl-btn { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff !important; border: none; cursor: pointer; }
  .wbl-btn:hover { opacity: 0.88; }
  .wbl-active { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; color: #fff !important; border-color: transparent !important; }
  .wbl-badge { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
  .wbl-unread { border-left-color: #1B72C0 !important; }
  .wbl-tab { border-bottom-color: #1B72C0 !important; color: #0D2855 !important; font-weight: 700 !important; }
`;


const projectsData = [
  { id: 1, name: "Food Delivery App",      client: "John D.",    freelancer: "TechVision Agency", type: "agency",     amount: 42000, status: "healthy", milestone: "M2 — Core Dev (55%)",        alert: null,                                              tickets: 0, silence: null,       frozen: false },
  { id: 2, name: "Brand Identity Package", client: "StartupX",   freelancer: "Sara M.",           type: "freelancer", amount: 3500,  status: "warning", milestone: "M1 — Concepts (80%)",        alert: "Silence alert: 5 days no response from freelancer", tickets: 1, silence: "5D SILENCE", frozen: false },
  { id: 3, name: "API Integration",        client: "DataCo",     freelancer: "Dev Mike",          type: "freelancer", amount: 8000,  status: "healthy", milestone: "M2 — Implementation (30%)", alert: null,                                              tickets: 0, silence: null,       frozen: false },
  { id: 4, name: "E-commerce Site",        client: "FashionHub", freelancer: "CodeCraft Agency",  type: "agency",     amount: 28000, status: "frozen",  milestone: "M1 — Design (100%)",         alert: "Frozen: Active dispute over milestone scope",       tickets: 2, silence: null,       frozen: true  },
];

const statusIcon = {
  healthy: <span className="w-[22px] h-[22px] rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center text-xs font-bold shrink-0">✓</span>,
  warning: <span className="w-[22px] h-[22px] rounded-full bg-amber-100  text-amber-600  flex items-center justify-center text-xs font-bold shrink-0">⚠</span>,
  frozen:  <span className="w-[22px] h-[22px] rounded-full bg-blue-100   text-blue-600   flex items-center justify-center text-xs font-bold shrink-0">❄</span>,
};

const borderColor = { healthy: "border-l-emerald-500", warning: "border-l-amber-400", frozen: "border-l-blue-500" };

const Projects = () => {
  const [projects] = useState(projectsData);
  const healthy = projects.filter((p) => p.status === "healthy").length;
  const warning = projects.filter((p) => p.status === "warning").length;
  const frozen  = projects.filter((p) => p.status === "frozen").length;

  return (
    <div>
      <style>{WBL_CSS}</style>
      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-7">
        {[
          { num: projects.length, label: "Active Projects", color: "text-gray-900"    },
          { num: healthy,         label: "Healthy",         color: "text-emerald-500" },
          { num: warning,         label: "Needs Attention", color: "text-amber-400"   },
          { num: frozen,          label: "Frozen",          color: "text-blue-500"    },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-6 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-4xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Project Cards */}
      {projects.map((p) => (
        <div
          key={p.id}
          className={`bg-white border border-gray-200 border-l-4 ${borderColor[p.status]} rounded-2xl px-5 sm:px-6 py-5 mb-3.5 shadow-sm hover:shadow-md hover:-translate-y-px transition-all`}
        >
          {/* Top */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2.5 mb-1">
                {statusIcon[p.status]}
                <h3 className="text-base font-bold text-gray-900">{p.name}</h3>
              </div>
              <div className="text-xs text-gray-500 ml-8 mb-2">{p.client} → {p.freelancer} ({p.type})</div>
              {p.alert && (
                <div className="text-xs text-amber-600 ml-8 flex items-center gap-1">⚠ {p.alert}</div>
              )}
            </div>
            <div className="flex items-center gap-2 flex-wrap ml-8 sm:ml-0 shrink-0">
              <span className="text-base font-bold text-gray-900">${p.amount.toLocaleString()}</span>
              {p.tickets > 0 && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800">
                  🎫 {p.tickets} TICKET{p.tickets > 1 ? "S" : ""}
                </span>
              )}
              {p.silence && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-orange-100 text-orange-800">
                  ⏰ {p.silence}
                </span>
              )}
              {p.frozen && (
                <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                  ❄ FROZEN
                </span>
              )}
            </div>
          </div>

          {/* Bottom */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mt-4 pt-4 border-t border-gray-100">
            <span className="text-xs text-gray-500 ml-8">{p.milestone}</span>
            <div className="flex gap-2 ml-8 sm:ml-0">
              <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                👁 Open Stream
              </button>
              <button className="flex items-center gap-1.5 px-3.5 py-2 border border-gray-200 rounded-lg bg-white text-xs font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-400 hover:text-blue-500 transition-all cursor-pointer">
                💬 Post Message
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;