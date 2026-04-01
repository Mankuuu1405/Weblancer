// import { useState } from "react";
// import { SearchBar, FilterSelect, ActionBtn, PageHeader, StatCard } from "./AdminComponents";

// const mockLogs = [
//   { id: "LOG-001", actor: "Super Admin", actorType: "Admin", action: "Suspended account", target: "Priya Menon (FL-004)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 11:42 AM", ip: "192.168.1.1", reason: "High dispute rate + repeated delivery failure" },
//   { id: "LOG-002", actor: "AI System", actorType: "AI", action: "Auto-flagged account", target: "FakeUser999 (CL-005)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 09:15 AM", ip: "system", reason: "Suspicious signup pattern detected" },
//   { id: "LOG-003", actor: "Finance Admin", actorType: "Admin", action: "Frozen escrow payment", target: "PAY-007 — Vikram Singh", category: "Payment", severity: "High", timestamp: "Mar 13, 2026 · 03:22 PM", ip: "192.168.1.4", reason: "Dispute DSP-002 raised — payment frozen pending resolution" },
//   { id: "LOG-004", actor: "AI System", actorType: "AI", action: "Auto-reduced visibility", target: "Priya Menon (FL-004)", category: "User", severity: "Medium", timestamp: "Mar 12, 2026 · 07:00 AM", ip: "system", reason: "Dispute rate crossed 30% threshold" },
//   { id: "LOG-005", actor: "Platform Admin", actorType: "Admin", action: "Warning message sent", target: "Vikram Singh (CL-002)", category: "User", severity: "Medium", timestamp: "Feb 14, 2026 · 02:10 PM", ip: "192.168.1.2", reason: "Off-platform contact attempt detected" },
//   { id: "LOG-006", actor: "AI System", actorType: "AI", action: "Auto-approved milestone", target: "PRJ-004 — Milestone 5", category: "Project", severity: "Low", timestamp: "Feb 28, 2026 · 08:00 AM", ip: "system", reason: "Client silent for 7 days — auto-approval triggered" },
//   { id: "LOG-007", actor: "Finance Admin", actorType: "Admin", action: "Milestone released", target: "PAY-002 — TechNova Solutions", category: "Payment", severity: "Low", timestamp: "Feb 15, 2026 · 04:45 PM", ip: "192.168.1.4", reason: "Milestone 1 approved by client" },
//   { id: "LOG-008", actor: "Super Admin", actorType: "Admin", action: "AI confidence threshold updated", target: "AI Settings — autoActionConfidence: 85 → 90", category: "AI", severity: "Medium", timestamp: "Feb 10, 2026 · 11:00 AM", ip: "192.168.1.1", reason: "Increased to reduce false positives" },
//   { id: "LOG-009", actor: "AI System", actorType: "AI", action: "Dispute pre-analysis completed", target: "DSP-001 — E-Commerce Revamp", category: "Dispute", severity: "Medium", timestamp: "Mar 10, 2026 · 05:30 PM", ip: "system", reason: "AI verdict: Partial fault — Freelancer (71% confidence)" },
//   { id: "LOG-010", actor: "Support Admin", actorType: "Admin", action: "KYC manually verified", target: "BuildRight Agency (AG-002)", category: "User", severity: "Low", timestamp: "Jul 14, 2024 · 10:00 AM", ip: "192.168.1.3", reason: "Documents reviewed and approved" },
// ];

// const severityStyle = {
//   High: "bg-red-50 text-red-600 border border-red-200",
//   Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//   Low: "bg-gray-50 text-gray-500 border border-gray-200",
// };

// const actorStyle = {
//   Admin: "bg-green-50 text-green-700 border border-green-200",
//   AI: "bg-blue-50 text-blue-700 border border-blue-200",
// };

// const categoryIcon = {
//   User: "◉",
//   Payment: "⊕",
//   Project: "⊟",
//   Dispute: "⚑",
//   AI: "◎",
// };

// export default function AdminAuditLogs() {
//   const [search, setSearch] = useState("");
//   const [categoryFilter, setCategoryFilter] = useState("");
//   const [severityFilter, setSeverityFilter] = useState("");
//   const [actorFilter, setActorFilter] = useState("");
//   const [expanded, setExpanded] = useState(null);

//   const filtered = mockLogs.filter((l) => {
//     const q = search.toLowerCase();
//     const matchSearch = l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q) || l.actor.toLowerCase().includes(q) || l.id.toLowerCase().includes(q);
//     const matchCat = !categoryFilter || l.category === categoryFilter;
//     const matchSev = !severityFilter || l.severity === severityFilter;
//     const matchActor = !actorFilter || l.actorType === actorFilter;
//     return matchSearch && matchCat && matchSev && matchActor;
//   });

//   return (
//     <div className="p-6">
//       <PageHeader
//         title="Audit Logs"
//         subtitle="Every action — human or AI — is recorded, immutably"
//         actions={
//           <div className="flex gap-2">
//             <ActionBtn label="⬇ Export Logs" />
//             <ActionBtn label="📋 Compliance Report" variant="primary" size="md" />
//           </div>
//         }
//       />

//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <StatCard label="Total Logs" value={mockLogs.length} color="gray" />
//         <StatCard label="Admin Actions" value={mockLogs.filter(l => l.actorType === "Admin").length} color="green" />
//         <StatCard label="AI Actions" value={mockLogs.filter(l => l.actorType === "AI").length} color="blue" />
//         <StatCard label="High Severity" value={mockLogs.filter(l => l.severity === "High").length} color="red" />
//       </div>

//       {/* Immutability Notice */}
//       <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-4 flex items-center gap-3">
//         <span className="text-gray-400 text-sm">🔒</span>
//         <p className="text-xs text-gray-500">
//           Audit logs are <strong className="text-gray-700">immutable</strong> — no log can be edited or deleted. All entries are cryptographically signed and retained for legal compliance.
//         </p>
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//         <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
//           <SearchBar value={search} onChange={setSearch} placeholder="Search action, target, actor...">
//             <FilterSelect value={categoryFilter} onChange={setCategoryFilter} label="All Categories"
//               options={[{ value: "User", label: "User" }, { value: "Payment", label: "Payment" }, { value: "Project", label: "Project" }, { value: "Dispute", label: "Dispute" }, { value: "AI", label: "AI" }]} />
//             <FilterSelect value={severityFilter} onChange={setSeverityFilter} label="All Severity"
//               options={[{ value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }]} />
//             <FilterSelect value={actorFilter} onChange={setActorFilter} label="All Actors"
//               options={[{ value: "Admin", label: "Admin" }, { value: "AI", label: "AI System" }]} />
//           </SearchBar>
//           <span className="text-xs text-gray-400">{filtered.length} results</span>
//         </div>

//         <div className="divide-y divide-gray-50">
//           {filtered.map((log) => (
//             <div key={log.id} className="hover:bg-gray-50/50 transition-colors">
//               <div
//                 className="flex items-start gap-4 p-4 cursor-pointer"
//                 onClick={() => setExpanded(expanded === log.id ? null : log.id)}
//               >
//                 {/* Category Icon */}
//                 <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
//                   <span className="text-gray-500 text-sm">{categoryIcon[log.category]}</span>
//                 </div>

//                 {/* Main Content */}
//                 <div className="flex-1 min-w-0">
//                   <div className="flex items-center gap-2 flex-wrap mb-1">
//                     <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${actorStyle[log.actorType]}`}>
//                       {log.actorType === "AI" ? "◎ AI" : "👤 Admin"}
//                     </span>
//                     <span className="text-sm font-semibold text-gray-800">{log.action}</span>
//                     <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${severityStyle[log.severity]}`}>
//                       {log.severity}
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 truncate">
//                     <span className="font-medium text-gray-700">{log.actor}</span> → {log.target}
//                   </p>
//                 </div>

//                 {/* Right side */}
//                 <div className="text-right shrink-0">
//                   <p className="text-xs text-gray-400">{log.timestamp}</p>
//                   <span className="text-[10px] text-gray-300">{log.id}</span>
//                 </div>

//                 <span className={`text-gray-400 text-xs mt-1 shrink-0 transition-transform ${expanded === log.id ? "rotate-90" : ""}`}>▶</span>
//               </div>

//               {/* Expanded Detail */}
//               {expanded === log.id && (
//                 <div className="px-4 pb-4 ml-12">
//                   <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2.5">
//                     {[
//                       { label: "Log ID", value: log.id },
//                       { label: "Actor", value: `${log.actor} (${log.actorType})` },
//                       { label: "Action", value: log.action },
//                       { label: "Target", value: log.target },
//                       { label: "Category", value: log.category },
//                       { label: "Reason", value: log.reason },
//                       { label: "IP Address", value: log.ip },
//                       { label: "Timestamp", value: log.timestamp },
//                     ].map((item) => (
//                       <div key={item.label} className="flex items-start gap-3">
//                         <span className="text-[10px] text-gray-400 font-medium w-24 shrink-0 pt-0.5 uppercase tracking-wide">{item.label}</span>
//                         <span className="text-xs text-gray-700 font-medium">{item.value}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <div className="py-16 text-center"><p className="text-gray-400 text-sm">No logs match your filters</p></div>
//         )}
//         <div className="px-4 py-3 border-t border-gray-100">
//           <span className="text-xs text-gray-400">Showing {filtered.length} of {mockLogs.length} entries</span>
//         </div>
//       </div>
//     </div>
//   );
// }







import { useState } from "react";
import { SearchBar, FilterSelect, ActionBtn, PageHeader, StatCard } from "./AdminComponents";

const mockLogs = [
  { id: "LOG-001", actor: "Super Admin", actorType: "Admin", action: "Suspended account", target: "Priya Menon (FL-004)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 11:42 AM", ip: "192.168.1.1", reason: "High dispute rate + repeated delivery failure" },
  { id: "LOG-002", actor: "AI System", actorType: "AI", action: "Auto-flagged account", target: "FakeUser999 (CL-005)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 09:15 AM", ip: "system", reason: "Suspicious signup pattern detected" },
  { id: "LOG-003", actor: "Finance Admin", actorType: "Admin", action: "Frozen escrow payment", target: "PAY-007 — Vikram Singh", category: "Payment", severity: "High", timestamp: "Mar 13, 2026 · 03:22 PM", ip: "192.168.1.4", reason: "Dispute DSP-002 raised — payment frozen pending resolution" },
  { id: "LOG-004", actor: "AI System", actorType: "AI", action: "Auto-reduced visibility", target: "Priya Menon (FL-004)", category: "User", severity: "Medium", timestamp: "Mar 12, 2026 · 07:00 AM", ip: "system", reason: "Dispute rate crossed 30% threshold" },
  { id: "LOG-005", actor: "Platform Admin", actorType: "Admin", action: "Warning message sent", target: "Vikram Singh (CL-002)", category: "User", severity: "Medium", timestamp: "Feb 14, 2026 · 02:10 PM", ip: "192.168.1.2", reason: "Off-platform contact attempt detected" },
  { id: "LOG-006", actor: "AI System", actorType: "AI", action: "Auto-approved milestone", target: "PRJ-004 — Milestone 5", category: "Project", severity: "Low", timestamp: "Feb 28, 2026 · 08:00 AM", ip: "system", reason: "Client silent for 7 days — auto-approval triggered" },
  { id: "LOG-007", actor: "Finance Admin", actorType: "Admin", action: "Milestone released", target: "PAY-002 — TechNova Solutions", category: "Payment", severity: "Low", timestamp: "Feb 15, 2026 · 04:45 PM", ip: "192.168.1.4", reason: "Milestone 1 approved by client" },
  { id: "LOG-008", actor: "Super Admin", actorType: "Admin", action: "AI confidence threshold updated", target: "AI Settings — autoActionConfidence: 85 → 90", category: "AI", severity: "Medium", timestamp: "Feb 10, 2026 · 11:00 AM", ip: "192.168.1.1", reason: "Increased to reduce false positives" },
  { id: "LOG-009", actor: "AI System", actorType: "AI", action: "Dispute pre-analysis completed", target: "DSP-001 — E-Commerce Revamp", category: "Dispute", severity: "Medium", timestamp: "Mar 10, 2026 · 05:30 PM", ip: "system", reason: "AI verdict: Partial fault — Freelancer (71% confidence)" },
  { id: "LOG-010", actor: "Support Admin", actorType: "Admin", action: "KYC manually verified", target: "BuildRight Agency (AG-002)", category: "User", severity: "Low", timestamp: "Jul 14, 2024 · 10:00 AM", ip: "192.168.1.3", reason: "Documents reviewed and approved" },
];

const severityStyle = {
  High:   "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low:    "bg-gray-50 text-gray-500 border border-gray-200",
};

const actorStyle = {
  Admin: "bg-green-50 text-green-700 border border-green-200",
  AI:    "bg-blue-50 text-blue-700 border border-blue-200",
};

const categoryIcon = {
  User:    "◉",
  Payment: "⊕",
  Project: "⊟",
  Dispute: "⚑",
  AI:      "◎",
};

export default function AdminAuditLogs() {
  const [search,          setSearch]          = useState("");
  const [categoryFilter,  setCategoryFilter]  = useState("");
  const [severityFilter,  setSeverityFilter]  = useState("");
  const [actorFilter,     setActorFilter]     = useState("");
  const [expanded,        setExpanded]        = useState(null);

  const filtered = mockLogs.filter((l) => {
    const q = search.toLowerCase();
    const matchSearch = l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q) || l.actor.toLowerCase().includes(q) || l.id.toLowerCase().includes(q);
    const matchCat   = !categoryFilter || l.category === categoryFilter;
    const matchSev   = !severityFilter || l.severity === severityFilter;
    const matchActor = !actorFilter    || l.actorType === actorFilter;
    return matchSearch && matchCat && matchSev && matchActor;
  });

  return (
    <div className="p-3 sm:p-5 lg:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; }
      `}</style>

      <PageHeader
        title="Audit Logs"
        subtitle="Every action — human or AI — is recorded, immutably"
        actions={
          <div className="flex gap-2 flex-wrap">
            <ActionBtn label="⬇ Export" />
            <ActionBtn label="📋 Report" variant="primary" size="md" />
          </div>
        }
      />

      {/* Stats — 2-col on mobile, 4-col on tablet+ */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard label="Total Logs"     value={mockLogs.length}                                    color="gray"  bg="gray"  border="gray"  />
        <StatCard label="Admin Actions"  value={mockLogs.filter(l => l.actorType === "Admin").length} color="green" bg="green" border="green" />
        <StatCard label="AI Actions"     value={mockLogs.filter(l => l.actorType === "AI").length}  color="blue"  bg="blue"  border="blue"  />
        <StatCard label="High Severity"  value={mockLogs.filter(l => l.severity === "High").length} color="red"   bg="red"   border="red"   />
      </div>

      {/* Immutability Notice */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-2.5 sm:p-3 mb-3 sm:mb-4 flex items-start sm:items-center gap-2 sm:gap-3">
        <span className="text-gray-400 text-xs sm:text-sm mt-0.5 sm:mt-0 shrink-0">🔒</span>
        <p className="text-[10px] sm:text-xs text-gray-500">
          Audit logs are <strong className="text-gray-700">immutable</strong> — no log can be edited or deleted. All entries are cryptographically signed and retained for legal compliance.
        </p>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-3 sm:p-4 border-b border-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <SearchBar value={search} onChange={setSearch} placeholder="Search action, target, actor...">
              <FilterSelect value={categoryFilter} onChange={setCategoryFilter} label="Category"
                options={[{ value:"User",label:"User" },{ value:"Payment",label:"Payment" },{ value:"Project",label:"Project" },{ value:"Dispute",label:"Dispute" },{ value:"AI",label:"AI" }]} />
              <FilterSelect value={severityFilter} onChange={setSeverityFilter} label="Severity"
                options={[{ value:"High",label:"High" },{ value:"Medium",label:"Medium" },{ value:"Low",label:"Low" }]} />
              <FilterSelect value={actorFilter} onChange={setActorFilter} label="Actor"
                options={[{ value:"Admin",label:"Admin" },{ value:"AI",label:"AI System" }]} />
            </SearchBar>
            <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">{filtered.length} results</span>
          </div>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map((log) => (
            <div key={log.id} className="hover:bg-gray-50/50 transition-colors">
              <div
                className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              >
                {/* Category Icon */}
                <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-gray-100 flex items-center justify-center shrink-0 mt-0.5">
                  <span className="text-gray-500 text-xs sm:text-sm">{categoryIcon[log.category]}</span>
                </div>

                {/* Main Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap mb-1">
                    <span className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${actorStyle[log.actorType]}`}>
                      {log.actorType === "AI" ? "◎ AI" : "👤 Admin"}
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-gray-800 truncate max-w-[140px] sm:max-w-none">{log.action}</span>
                    <span className={`text-[9px] sm:text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${severityStyle[log.severity]}`}>
                      {log.severity}
                    </span>
                  </div>
                  <p className="text-[10px] sm:text-xs text-gray-500 truncate">
                    <span className="font-medium text-gray-700">{log.actor}</span> → {log.target}
                  </p>
                </div>

                {/* Right side */}
                <div className="text-right shrink-0 hidden sm:block">
                  <p className="text-xs text-gray-400">{log.timestamp}</p>
                  <span className="text-[10px] text-gray-300">{log.id}</span>
                </div>

                <span className={`text-gray-400 text-xs mt-1 shrink-0 transition-transform duration-200 ${expanded === log.id ? "rotate-90" : ""}`}>▶</span>
              </div>

              {/* Timestamp on mobile */}
              <div className="sm:hidden px-3 pb-2 ml-10">
                <p className="text-[10px] text-gray-400">{log.timestamp} · <span className="text-gray-300">{log.id}</span></p>
              </div>

              {/* Expanded Detail */}
              {expanded === log.id && (
                <div className="px-3 sm:px-4 pb-3 sm:pb-4 ml-8 sm:ml-12">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-3 sm:p-4 space-y-2 sm:space-y-2.5">
                    {[
                      { label: "Log ID",     value: log.id                         },
                      { label: "Actor",      value: `${log.actor} (${log.actorType})` },
                      { label: "Action",     value: log.action                     },
                      { label: "Target",     value: log.target                     },
                      { label: "Category",   value: log.category                   },
                      { label: "Reason",     value: log.reason                     },
                      { label: "IP Address", value: log.ip                         },
                      { label: "Timestamp",  value: log.timestamp                  },
                    ].map((item) => (
                      <div key={item.label} className="flex items-start gap-2 sm:gap-3">
                        <span className="text-[9px] sm:text-[10px] text-gray-400 font-medium w-20 sm:w-24 shrink-0 pt-0.5 uppercase tracking-wide">{item.label}</span>
                        <span className="text-[10px] sm:text-xs text-gray-700 font-medium break-words">{item.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 sm:py-16 text-center px-4">
            <p className="text-gray-400 text-xs sm:text-sm">No logs match your filters</p>
          </div>
        )}

        <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100">
          <span className="text-[10px] sm:text-xs text-gray-400">Showing {filtered.length} of {mockLogs.length} entries</span>
        </div>
      </div>
    </div>
  );
}