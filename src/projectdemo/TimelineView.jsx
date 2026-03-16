// import { useState } from "react";
// import { timelineGroups } from "./ProjectData";

// const IconFilter = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
//   </svg>
// );

// const IconDownload = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
//     <polyline points="7 10 12 15 17 10" />
//     <line x1="12" y1="15" x2="12" y2="3" />
//   </svg>
// );

// export default function TimelineView() {
//   const [filter, setFilter] = useState("All Events");

//   const filteredGroups = timelineGroups
//     .map((group) => ({
//       ...group,
//       events: group.events.filter((ev) => {
//         if (filter === "All Events") return true;
//         if (filter === "Locked") return ev.locked === true;
//         if (filter === "Messages") return ev.locked === false;
//         if (filter === "Milestones") return ev.icon === "📦" || ev.icon === "✅";
//         return true;
//       }),
//     }))
//     .filter((group) => group.events.length > 0);

//   return (
//     <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">

//       {/* Header */}
//       <div className="flex flex-wrap items-center justify-between gap-2 px-3 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 flex-shrink-0">
//         <h2 className="text-sm md:text-base font-bold text-gray-900">Project Timeline</h2>
//         <div className="flex flex-wrap items-center gap-2 md:gap-3">
//           <div className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50">
//             <IconFilter />
//             <select
//               value={filter}
//               onChange={(e) => setFilter(e.target.value)}
//               className="bg-transparent outline-none cursor-pointer text-xs text-gray-600"
//             >
//               <option>All Events</option>
//               <option>Locked</option>
//               <option>Messages</option>
//               <option>Milestones</option>
//             </select>
//           </div>
//           <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
//             <IconDownload /> Export PDF
//           </button>
//         </div>
//       </div>

//       {/* Scrollable Timeline */}
//       <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-5 md:space-y-6">
//         {filteredGroups.length === 0 ? (
//           <div className="flex flex-col items-center justify-center h-40 text-gray-400">
//             <p className="text-sm font-medium">No events found for this filter.</p>
//           </div>
//         ) : (
//           filteredGroups.map((group) => (
//             <div key={group.date}>
//               {/* Date header */}
//               <div className="flex items-center gap-3 mb-3">
//                 <span className="w-3 h-3 rounded-full bg-blue-500 flex-shrink-0" />
//                 <span className="text-sm font-bold text-gray-800">{group.date}</span>
//               </div>

//               {/* Events */}
//               <div className="ml-1.5 border-l-2 border-gray-200 pl-4 md:pl-6 space-y-3">
//                 {group.events.map((ev) => (
//                   <div
//                     key={ev.id}
//                     className="relative bg-white border border-gray-200 rounded-xl px-3 md:px-4 py-2.5 md:py-3 shadow-sm hover:shadow-md transition-shadow"
//                   >
//                     <span className="absolute -left-[33px] top-4 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white" />
//                     <div className="flex items-start justify-between gap-3">
//                       <div className="flex items-start gap-2.5 flex-1 min-w-0">
//                         <span className="text-base flex-shrink-0 mt-0.5">{ev.icon}</span>
//                         <p className="text-sm text-gray-700 leading-relaxed">{ev.text}</p>
//                       </div>
//                       {ev.locked && (
//                         <span className="flex-shrink-0 inline-flex items-center gap-1 bg-orange-50 border border-orange-200 text-orange-600 text-xs font-bold px-2 py-1 rounded-md whitespace-nowrap">
//                           🔒 LOCKED
//                         </span>
//                       )}
//                     </div>
//                     <div className="flex items-center gap-2 mt-2">
//                       <span className="text-xs text-gray-400">{ev.time}</span>
//                       {ev.by && (
//                         <>
//                           <span className="text-gray-300 text-xs">·</span>
//                           <span className="text-xs text-gray-400">by {ev.by}</span>
//                         </>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// }


import { useState } from "react";
import { timelineGroups } from "./ProjectData";

const IconFilter = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
  </svg>
);

const IconDownload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const IconChevron = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

export default function TimelineView() {
  const [filter, setFilter] = useState("All Events");

  const filteredGroups = timelineGroups
    .map((group) => ({
      ...group,
      events: group.events.filter((ev) => {
        if (filter === "All Events") return true;
        if (filter === "Locked")     return ev.locked === true;
        if (filter === "Messages")   return ev.locked === false;
        if (filter === "Milestones") return ev.icon === "📦" || ev.icon === "✅";
        return true;
      }),
    }))
    .filter((group) => group.events.length > 0);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-4 md:px-8 py-4 bg-white border-b border-gray-100 flex-shrink-0">
        <h2 className="text-lg font-bold text-gray-900">Project Timeline</h2>
        <div className="flex flex-wrap items-center gap-2">

          {/* Filter dropdown — pill style */}
          <div className="relative flex items-center gap-1.5 border border-gray-200 rounded-full px-3 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 cursor-pointer">
            <IconFilter />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-transparent outline-none cursor-pointer text-xs text-gray-700 pr-4 appearance-none"
            >
              <option>All Events</option>
              <option>Locked</option>
              <option>Messages</option>
              <option>Milestones</option>
            </select>
            <span className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400">
              <IconChevron />
            </span>
          </div>

          {/* Export PDF button — pill style */}
          <button className="flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-600 bg-white hover:bg-gray-50 transition-colors">
            <IconDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* ── Scrollable Timeline ── */}
      <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 space-y-6">
        {filteredGroups.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-40 text-gray-400">
            <p className="text-sm font-medium">No events found for this filter.</p>
          </div>
        ) : (
          filteredGroups.map((group) => (
            <div key={group.date}>

              {/* ── Date header — green dot ── */}
              <div className="flex items-center gap-3 mb-4">
                {/* Green filled circle — matches screenshot */}
                <span className="w-3.5 h-3.5 rounded-full bg-green-500 flex-shrink-0 shadow-sm" />
                <span className="text-base font-bold text-gray-900">{group.date}</span>
              </div>

              {/* ── Events list — green left line ── */}
              <div
                className="ml-1.5 pl-5 md:pl-8 space-y-3"
                style={{ borderLeft: "2px solid #22c55e" }}   /* green-500 line */
              >
                {group.events.map((ev) => (
                  <div
                    key={ev.id}
                    className="relative bg-white border border-gray-200 rounded-xl px-4 md:px-5 py-3 md:py-4"
                    style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
                  >
                    {/* Small gray dot on the green line */}
                    <span className="absolute -left-[29px] top-5 w-2.5 h-2.5 rounded-full bg-gray-300 border-2 border-white flex-shrink-0" />

                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-3 flex-1 min-w-0">
                        <span className="text-base flex-shrink-0 mt-0.5">{ev.icon}</span>
                        <p className="text-sm text-gray-800 leading-relaxed">{ev.text}</p>
                      </div>

                      {/* LOCKED badge — orange, matching screenshot */}
                      {ev.locked && (
                        <span className="flex-shrink-0 inline-flex items-center gap-1 border border-orange-300 text-orange-500 text-xs font-bold px-2.5 py-1 rounded-lg whitespace-nowrap bg-white">
                          🔒 LOCKED
                        </span>
                      )}
                    </div>

                    {/* Time + by */}
                    <div className="flex items-center gap-2 mt-2 ml-7">
                      <span className="text-xs text-gray-400">{ev.time}</span>
                      {ev.by && (
                        <>
                          <span className="text-gray-300 text-xs">·</span>
                          <span className="text-xs text-gray-400">by {ev.by}</span>
                        </>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </div>
          ))
        )}

        <div className="h-4" />
      </div>
    </div>
  );
}
