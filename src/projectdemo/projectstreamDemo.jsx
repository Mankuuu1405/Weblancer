// import React from "react";
// import { useState } from "react";

// const pinnedMessages = [
//   {
//     id: 1,
//     body: "Reviewed all 12 wireframe screens for the food delivery app. Client provided feedback on navigation flow and visual design preferences.",
//     decisions: [
//       "Wireframes approved with 2 minor changes",
//       "Color scheme Option B selected",
//     ],
//     actions: [
//       { text: "Sara M. → Update wireframe screens 5 and 9", due: "Feb 20, 2026" },
//       { text: "Sara M. → Begin Design phase after Feb 20", due: "Feb 21, 2026" },
//     ],
//     seenBy: ["John D.", "Sara M."],
//   },
// ];

// const participants = [
//   { name: "John D.", role: "CLIENT", online: true, roleColor: "bg-green-100 text-green-700" },
//   { name: "Sara M.", role: "FREELANCER", online: true, roleColor: "bg-blue-100 text-blue-700" },
//   { name: "Platform Admin", role: "ADMIN", online: true, roleColor: "bg-yellow-100 text-yellow-700" },
// ];

// const quickActions = [
//   {
//     label: "Submit Milestone",
//     icon: (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
//       </svg>
//     ),
//   },
//   {
//     label: "Request Meeting",
//     icon: (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
//         <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
//       </svg>
//     ),
//   },
//   {
//     label: "Get Support",
//     icon: (
//       <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//         <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//       </svg>
//     ),
//   },
// ];

// const IconHash = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
//     <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
//   </svg>
// );
// const IconTimeline = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" />
//     <line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" />
//   </svg>
// );
// const IconFile = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//   </svg>
// );
// const IconMeetings = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="3" width="18" height="18" rx="2" />
//     <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
//   </svg>
// );
// const IconSupport = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//   </svg>
// );
// const IconBack = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );
// const IconStar = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// );
// const IconSend = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
//   </svg>
// );

// function SectionLabel({ children }) {
//   return (
//     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 px-4 mb-1 mt-2">
//       {children}
//     </p>
//   );
// }

// function SidebarItem({ icon, label, active, badge, onClick }) {
//   return (
//     <button
//       onClick={onClick}
//       className={`w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-all relative
//         ${active ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"}`}
//     >
//       {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-500 rounded-r" />}
//       <span className={active ? "text-blue-500" : "text-gray-400"}>{icon}</span>
//       {label}
//       {badge && (
//         <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">
//           {badge}
//         </span>
//       )}
//     </button>
//   );
// }

// function PinnedCard({ msg, collapsed, onToggle }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//       <button
//         onClick={onToggle}
//         className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors"
//       >
//         <span>📌</span> Pinned (5)
//         <span className="ml-auto text-gray-400 text-xs">{collapsed ? "▼" : "▲"}</span>
//       </button>
//       {!collapsed && (
//         <div className="px-4 py-3">
//           <div className="border-l-2 border-orange-400 pl-3">
//             <p className="text-sm text-gray-600 leading-relaxed">{msg.body}</p>
//             <div className="mt-2.5">
//               <p className="text-xs font-bold text-green-600 mb-1">✅ Decisions Made:</p>
//               <ol className="list-decimal list-inside space-y-0.5">
//                 {msg.decisions.map((d, i) => (
//                   <li key={i} className="text-xs text-gray-600">{d}</li>
//                 ))}
//               </ol>
//             </div>
//             <div className="mt-2.5">
//               <p className="text-xs font-bold text-orange-600 mb-1">📋 Action Items:</p>
//               <ol className="list-decimal list-inside space-y-0.5">
//                 {msg.actions.map((a, i) => (
//                   <li key={i} className="text-xs text-gray-600">
//                     {a.text}{" "}
//                     <span className="text-blue-500 font-semibold text-xs">Due: {a.due}</span>
//                   </li>
//                 ))}
//               </ol>
//             </div>
//             <p className="text-xs text-gray-400 mt-2.5 pt-2 border-t border-gray-100">
//               🔒 This summary is official and locked. It forms part of the project record.
//             </p>
//           </div>
//           <p className="text-xs text-gray-300 mt-2">
//             Seen by:{" "}
//             {msg.seenBy.map((s, i) => (
//               <span key={i} className="text-green-400">{s} ✓{i < msg.seenBy.length - 1 ? " · " : ""}</span>
//             ))}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

// function SystemCompletedCard() {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//       <div className="flex items-center gap-2 mb-3">
//         <span className="text-lg">🎉</span>
//         <span className="text-xs font-mono font-bold text-gray-400">[SYSTEM]</span>
//         <span className="font-bold text-gray-900 text-base">Project Completed!</span>
//       </div>
//       <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
//         <p>All 4 milestones have been approved.</p>
//         <p>Total paid: <span className="text-green-600 font-bold">$42,000</span> (released from escrow)</p>
//         <p>Project duration: 22 weeks (on schedule ✓)</p>
//       </div>
//       <p className="text-sm font-bold text-gray-800 mt-3 mb-1">Final steps required:</p>
//       <ol className="list-decimal list-inside text-sm text-gray-600 space-y-0.5">
//         <li>Client: Leave a review for Sara M.</li>
//         <li>Provider: Leave a review for John D. (TechVision Co.)</li>
//       </ol>
//       <p className="text-xs text-gray-400 italic mt-3">
//         This ProjectStream will be archived in 48 hours. You'll retain read-only access permanently.
//       </p>
//       <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all hover:-translate-y-0.5 shadow hover:shadow-md">
//         <IconStar /> Leave Review →
//       </button>
//     </div>
//   );
// }

// function Composer() {
//   return (
//     <div className="border-t border-gray-200 bg-white px-4 py-3 flex-shrink-0">
//       <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
//         <span>Type:</span>
//         <select className="border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300">
//           <option>Normal</option>
//           <option>Decision</option>
//           <option>Action Item</option>
//           <option>Question</option>
//         </select>
//       </div>
//       <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 min-h-14 bg-gray-50 cursor-text">
//         Write your message… (Shift+Enter for new line)
//       </div>
//       <div className="flex items-center mt-2.5 gap-3">
//         <div className="flex gap-3 text-gray-400">
//           {[
//             <svg key="a" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
//             <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
//             <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></svg>,
//             <svg key="d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
//           ].map((icon, i) => (
//             <button key={i} className="hover:text-blue-500 transition-colors">{icon}</button>
//           ))}
//         </div>
//         <button className="ml-auto inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg opacity-60 hover:opacity-100 transition-all">
//           <IconSend /> Send
//         </button>
//       </div>
//     </div>
//   );
// }

// function RightSidebar() {
//   const rsLabel = (icon, text) => (
//     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 flex items-center gap-1.5 mb-2">
//       {icon} {text}
//     </p>
//   );
//   return (
//     <aside className="w-64 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
//       {/* Project Info */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>, "Project Info")}
//         <p className="text-sm font-bold text-gray-900">Food Delivery App</p>
//         <p className="text-xs text-gray-400 mt-0.5">Started: Feb 18, 2026</p>
//       </div>

//       {/* Escrow */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>, "Escrow")}
//         {[
//           { label: "Total:", value: "$42,000", cls: "text-gray-800" },
//           { label: "Released:", value: "$8,400 ✓", cls: "text-green-600" },
//           { label: "Remaining:", value: "$33,600", cls: "text-gray-800" },
//         ].map(({ label, value, cls }) => (
//           <div key={label} className="flex justify-between text-xs py-0.5">
//             <span className="text-gray-500">{label}</span>
//             <span className={`font-semibold ${cls}`}>{value}</span>
//           </div>
//         ))}
//       </div>

//       {/* Milestone */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>, "Milestone")}
//         <p className="text-sm font-bold text-gray-900">Current: 2 of 4</p>
//         <p className="text-xs text-gray-500 mt-0.5 mb-2 leading-relaxed">Core Development<br />Due: May 20 (77 days left)</p>
//         <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//           <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }} />
//         </div>
//         <p className="text-xs font-bold text-blue-500 text-right mt-1">40%</p>
//       </div>

//       {/* Participants */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>, "Participants")}
//         <div className="space-y-2">
//           {participants.map((p) => (
//             <div key={p.name} className="flex items-center gap-2">
//               <span className={`w-2 h-2 rounded-full flex-shrink-0 ${p.online ? "bg-green-500" : "bg-gray-300"}`} />
//               <span className="text-xs text-gray-700 font-medium flex-1">{p.name}</span>
//               <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${p.roleColor}`}>{p.role}</span>
//             </div>
//           ))}
//         </div>
//         <p className="text-xs text-red-500 flex items-center gap-1.5 mt-2.5">
//           <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block" />
//           Admin is monitoring this project
//         </p>
//       </div>

//       {/* Quick Actions */}
//       <div className="px-4 py-3 border-b border-gray-100">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>, "Quick Actions")}
//         <div className="space-y-1">
//           {quickActions.map((qa) => (
//             <button key={qa.label} className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 font-medium py-1.5 transition-colors text-left">
//               <span className="text-gray-400">{qa.icon}</span> {qa.label}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Next Deadline */}
//       <div className="px-4 py-3">
//         {rsLabel(<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>, "Next Deadline")}
//         <p className="text-sm font-bold text-gray-900">May 20 — Milestone 2</p>
//         <p className="text-xs text-gray-400 mt-0.5">77 days remaining</p>
//       </div>
//     </aside>
//   );
// }

// export default function ProjectStreamDemo() {
//   const [activeView, setActiveView] = useState("Project Stream");
//   const [pinnedCollapsed, setPinnedCollapsed] = useState(false);

//   const navViews = [
//     { label: "Timeline", icon: <IconTimeline /> },
//     { label: "Files", icon: <IconFile /> },
//     { label: "Meetings", icon: <IconMeetings /> },
//     { label: "Support", icon: <IconSupport /> },
//   ];

//   return (
//     <div className="h-screen flex flex-col bg-gray-100 text-sm overflow-hidden">
//       {/* TOP NAV */}
//       <nav className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 flex-shrink-0 z-10">
//         <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors">
//           <IconBack /> Back
//         </button>
//         <span className="font-bold text-gray-900 text-base ml-1">Food Delivery App</span>
//         <div className="flex-1" />
//         <span className="text-xs text-gray-400">
//           Viewing as: <span className="font-semibold text-gray-700">Client</span>
//         </span>
//         <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60">
//             <circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" />
//             <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
//           </svg>
//           Demo
//         </button>
//       </nav>

//       {/* BODY */}
//       <div className="flex flex-1 overflow-hidden">
//         {/* LEFT SIDEBAR */}
//         <aside className="w-52 bg-white border-r border-gray-200 flex flex-col py-3 flex-shrink-0">
//           <SectionLabel>Channels</SectionLabel>
//           <SidebarItem
//             icon={<IconHash />}
//             label="Project Stream"
//             active={activeView === "Project Stream"}
//             badge={2}
//             onClick={() => setActiveView("Project Stream")}
//           />
//           <div className="h-px bg-gray-100 mx-3 my-2" />
//           <SectionLabel>Views</SectionLabel>
//           {navViews.map(({ label, icon }) => (
//             <SidebarItem key={label} icon={icon} label={label} active={activeView === label} onClick={() => setActiveView(label)} />
//           ))}
//         </aside>

//         {/* MAIN */}
//         <main className="flex flex-col flex-1 overflow-hidden bg-gray-50">
//           <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
//             <PinnedCard msg={pinnedMessages[0]} collapsed={pinnedCollapsed} onToggle={() => setPinnedCollapsed((v) => !v)} />
//             <SystemCompletedCard />
//           </div>
//           <Composer />
//         </main>

//         <RightSidebar />
//       </div>
//     </div>
//   );
// }
// import { useState } from "react";
// import { participants, quickActions, pinnedMessages } from "./ProjectData";
// import TimelineView from "./TimelineView";
// import FilesView from "./FilesView";
// import MeetingsView from "./Meetingsview";
// import SupportView from "./SupportView";

// const IconHash = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <line x1="4" y1="9" x2="20" y2="9" /><line x1="4" y1="15" x2="20" y2="15" />
//     <line x1="10" y1="3" x2="8" y2="21" /><line x1="16" y1="3" x2="14" y2="21" />
//   </svg>
// );
// const IconTimeline = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <line x1="8" y1="6" x2="21" y2="6" /><line x1="8" y1="12" x2="21" y2="12" />
//     <line x1="8" y1="18" x2="21" y2="18" /><line x1="3" y1="6" x2="3.01" y2="6" />
//     <line x1="3" y1="12" x2="3.01" y2="12" /><line x1="3" y1="18" x2="3.01" y2="18" />
//   </svg>
// );
// const IconFile = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
//     <polyline points="14 2 14 8 20 8" />
//   </svg>
// );
// const IconMeetings = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <rect x="3" y="3" width="18" height="18" rx="2" />
//     <line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" />
//   </svg>
// );
// const IconSupport = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
//     <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
//   </svg>
// );
// const IconBack = () => (
//   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polyline points="15 18 9 12 15 6" />
//   </svg>
// );
// const IconStar = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
//   </svg>
// );
// const IconSend = () => (
//   <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
//     <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
//   </svg>
// );

// const QAIcons = {
//   "Submit Milestone": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" /></svg>,
//   "Request Meeting": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
//   "Get Support": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" /></svg>,
// };

// function RightSidebar() {
//   const Label = ({ icon, text }) => (
//     <p className="text-xs font-bold tracking-widest uppercase text-gray-400 flex items-center gap-1.5 mb-2">
//       {icon} {text}
//     </p>
//   );
//   return (
//     <aside className="w-64 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0">
//       <div className="px-4 py-3 border-b border-gray-100">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="3" y1="9" x2="21" y2="9" /><line x1="9" y1="21" x2="9" y2="9" /></svg>} text="Project Info" />
//         <p className="text-sm font-bold text-gray-900">Food Delivery App</p>
//         <p className="text-xs text-gray-400 mt-0.5">Started: Feb 18, 2026</p>
//       </div>
//       <div className="px-4 py-3 border-b border-gray-100">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" /><path d="M16 7V5a2 2 0 0 0-4 0v2" /></svg>} text="Escrow" />
//         {[["Total:","$42,000","text-gray-800"],["Released:","$8,400 ✓","text-green-600"],["Remaining:","$33,600","text-gray-800"]].map(([l,v,c]) => (
//           <div key={l} className="flex justify-between text-xs py-0.5">
//             <span className="text-gray-500">{l}</span><span className={"font-semibold "+c}>{v}</span>
//           </div>
//         ))}
//       </div>
//       <div className="px-4 py-3 border-b border-gray-100">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" /></svg>} text="Milestone" />
//         <p className="text-sm font-bold text-gray-900">Current: 2 of 4</p>
//         <p className="text-xs text-gray-500 mt-0.5 mb-2 leading-relaxed">Core Development<br />Due: May 20 (77 days left)</p>
//         <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
//           <div className="h-full bg-blue-500 rounded-full" style={{ width: "40%" }} />
//         </div>
//         <p className="text-xs font-bold text-blue-500 text-right mt-1">40%</p>
//       </div>
//       <div className="px-4 py-3 border-b border-gray-100">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 0 0-3-3.87" /></svg>} text="Participants" />
//         <div className="space-y-2">
//           {participants.map((p) => (
//             <div key={p.name} className="flex items-center gap-2">
//               <span className={"w-2 h-2 rounded-full flex-shrink-0 "+(p.online?"bg-green-500":"bg-gray-300")} />
//               <span className="text-xs text-gray-700 font-medium flex-1">{p.name}</span>
//               <span className={"text-xs font-bold px-1.5 py-0.5 rounded "+p.roleColor}>{p.role}</span>
//             </div>
//           ))}
//         </div>
//         <p className="text-xs text-red-500 flex items-center gap-1.5 mt-2.5">
//           <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block" />
//           Admin is monitoring this project
//         </p>
//       </div>
//       <div className="px-4 py-3 border-b border-gray-100">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>} text="Quick Actions" />
//         <div className="space-y-1">
//           {quickActions.map((qa) => (
//             <button key={qa.label} className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 font-medium py-1.5 transition-colors text-left">
//               <span className="text-gray-400">{QAIcons[qa.label]}</span>{qa.label}
//             </button>
//           ))}
//         </div>
//       </div>
//       <div className="px-4 py-3">
//         <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>} text="Next Deadline" />
//         <p className="text-sm font-bold text-gray-900">May 20 - Milestone 2</p>
//         <p className="text-xs text-gray-400 mt-0.5">77 days remaining</p>
//       </div>
//     </aside>
//   );
// }

// function SectionLabel({ children }) {
//   return <p className="text-xs font-bold tracking-widest uppercase text-gray-400 px-4 mb-1 mt-2">{children}</p>;
// }

// function SidebarItem({ icon, label, active, badge, onClick }) {
//   return (
//     <button onClick={onClick} className={"w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-all relative "+(active?"bg-blue-50 text-blue-600 font-semibold":"text-gray-600 hover:bg-gray-50 hover:text-gray-800")}>
//       {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-500 rounded-r" />}
//       <span className={active?"text-blue-500":"text-gray-400"}>{icon}</span>
//       {label}
//       {badge && <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
//     </button>
//   );
// }

// function PinnedCard({ msg, collapsed, onToggle }) {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
//       <button onClick={onToggle} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-700 border-b border-gray-100 hover:bg-gray-50 transition-colors">
//         <span>📌</span> Pinned (5)
//         <span className="ml-auto text-gray-400 text-xs">{collapsed?"▼":"▲"}</span>
//       </button>
//       {!collapsed && (
//         <div className="px-4 py-3">
//           <div className="border-l-2 border-orange-400 pl-3">
//             <p className="text-sm text-gray-600 leading-relaxed">{msg.body}</p>
//             <div className="mt-2.5">
//               <p className="text-xs font-bold text-green-600 mb-1">✅ Decisions Made:</p>
//               <ol className="list-decimal list-inside space-y-0.5">{msg.decisions.map((d,i)=><li key={i} className="text-xs text-gray-600">{d}</li>)}</ol>
//             </div>
//             <div className="mt-2.5">
//               <p className="text-xs font-bold text-orange-600 mb-1">📋 Action Items:</p>
//               <ol className="list-decimal list-inside space-y-0.5">{msg.actions.map((a,i)=><li key={i} className="text-xs text-gray-600">{a.text} <span className="text-blue-500 font-semibold text-xs">Due: {a.due}</span></li>)}</ol>
//             </div>
//             <p className="text-xs text-gray-400 mt-2.5 pt-2 border-t border-gray-100">🔒 This summary is official and locked.</p>
//           </div>
//           <p className="text-xs text-gray-300 mt-2">Seen by: {msg.seenBy.map((s,i)=><span key={i} className="text-green-400">{s} ✓{i<msg.seenBy.length-1?" · ":""}</span>)}</p>
//         </div>
//       )}
//     </div>
//   );
// }

// function SystemCompletedCard() {
//   return (
//     <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
//       <div className="flex items-center gap-2 mb-3">
//         <span className="text-lg">🎉</span>
//         <span className="text-xs font-mono font-bold text-gray-400">[SYSTEM]</span>
//         <span className="font-bold text-gray-900 text-base">Project Completed!</span>
//       </div>
//       <div className="text-sm text-gray-600 space-y-1 leading-relaxed">
//         <p>All 4 milestones have been approved.</p>
//         <p>Total paid: <span className="text-green-600 font-bold">$42,000</span> (released from escrow)</p>
//         <p>Project duration: 22 weeks (on schedule)</p>
//       </div>
//       <p className="text-sm font-bold text-gray-800 mt-3 mb-1">Final steps required:</p>
//       <ol className="list-decimal list-inside text-sm text-gray-600 space-y-0.5">
//         <li>Client: Leave a review for Sara M.</li>
//         <li>Provider: Leave a review for John D. (TechVision Co.)</li>
//       </ol>
//       <p className="text-xs text-gray-400 italic mt-3">This ProjectStream will be archived in 48 hours.</p>
//       <button className="mt-4 inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all shadow hover:shadow-md">
//         <IconStar /> Leave Review
//       </button>
//     </div>
//   );
// }

// function Composer() {
//   return (
//     <div className="border-t border-gray-200 bg-white px-4 py-3 flex-shrink-0">
//       <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
//         <span>Type:</span>
//         <select className="border border-gray-200 rounded-md px-2 py-1 text-xs text-gray-700 bg-white cursor-pointer focus:outline-none focus:ring-1 focus:ring-blue-300">
//           <option>Normal</option><option>Decision</option><option>Action Item</option><option>Question</option>
//         </select>
//       </div>
//       <div className="border border-gray-200 rounded-lg px-3 py-2.5 text-sm text-gray-400 min-h-14 bg-gray-50 cursor-text">
//         Write your message... (Shift+Enter for new line)
//       </div>
//       <div className="flex items-center mt-2.5 gap-3">
//         <div className="flex gap-3 text-gray-400">
//           {[
//             <svg key="a" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48" /></svg>,
//             <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="8.5" cy="8.5" r="1.5" /><polyline points="21 15 16 10 5 21" /></svg>,
//             <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4" /><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94" /></svg>,
//             <svg key="d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" /><line x1="16" y1="2" x2="16" y2="6" /><line x1="8" y1="2" x2="8" y2="6" /><line x1="3" y1="10" x2="21" y2="10" /></svg>,
//           ].map((icon,i)=><button key={i} className="hover:text-blue-500 transition-colors">{icon}</button>)}
//         </div>
//         <button className="ml-auto inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-1.5 rounded-lg opacity-60 hover:opacity-100 transition-all">
//           <IconSend /> Send
//         </button>
//       </div>
//     </div>
//   );
// }

// export default function ProjectStreamDemo() {
//   const [activeView, setActiveView] = useState("Project Stream");
//   const [pinnedCollapsed, setPinnedCollapsed] = useState(false);
//   const navViews = [
//     { label: "Timeline", icon: <IconTimeline /> },
//     { label: "Files", icon: <IconFile /> },
//     { label: "Meetings", icon: <IconMeetings /> },
//     { label: "Support", icon: <IconSupport /> },
//   ];
//   return (
//     <div className="h-screen flex flex-col bg-gray-100 text-sm overflow-hidden">
//       <nav className="bg-white border-b border-gray-200 flex items-center px-4 py-3 gap-3 flex-shrink-0 z-10">
//         <button className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600 transition-colors"><IconBack /> Back</button>
//         <span className="font-bold text-gray-900 text-base ml-1">Food Delivery App</span>
//         <div className="flex-1" />
//         <span className="text-xs text-gray-400">Viewing as: <span className="font-semibold text-gray-700">Client</span></span>
//         <button className="flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100 transition-colors">
//           <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><circle cx="12" cy="12" r="10" /><line x1="2" y1="12" x2="22" y2="12" /><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" /></svg>
//           Demo
//         </button>
//       </nav>
//       <div className="flex flex-1 overflow-hidden">
//         <aside className="w-52 bg-white border-r border-gray-200 flex flex-col py-3 flex-shrink-0">
//           <SectionLabel>Channels</SectionLabel>
//           <SidebarItem icon={<IconHash />} label="Project Stream" active={activeView==="Project Stream"} badge={2} onClick={()=>setActiveView("Project Stream")} />
//           <div className="h-px bg-gray-100 mx-3 my-2" />
//           <SectionLabel>Views</SectionLabel>
//           {navViews.map(({label,icon})=>(
//             <SidebarItem key={label} icon={icon} label={label} active={activeView===label} onClick={()=>setActiveView(label)} />
//           ))}
//         </aside>
//         {activeView === "Timeline" ? (
//           <TimelineView />
//         ) : activeView === "Files" ? (
//           <FilesView />
//         ) : activeView === "Meetings" ? (
//           <MeetingsView />
//         ) : activeView === "Support" ? (
//           <SupportView />
//         ) : activeView === "Project Stream" ? (
//           <main className="flex flex-col flex-1 overflow-hidden bg-gray-50">
//             <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
//               <PinnedCard msg={pinnedMessages[0]} collapsed={pinnedCollapsed} onToggle={()=>setPinnedCollapsed(v=>!v)} />
//               <SystemCompletedCard />
//             </div>
//             <Composer />
//           </main>
//         ) : (
//           <main className="flex flex-col flex-1 items-center justify-center bg-gray-50 text-gray-400">
//             <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="mb-3 opacity-30"><rect x="3" y="3" width="18" height="18" rx="2" /><line x1="12" y1="8" x2="12" y2="16" /><line x1="8" y1="12" x2="16" y2="12" /></svg>
//             <p className="text-sm font-medium">{activeView} — Coming soon</p>
//           </main>
//         )}
//         <RightSidebar />
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { participants, quickActions } from "./ProjectData";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./Meetingsview";
import SupportView from "./SupportView";
import ProjectStreamChat from "./ProjectStreamChat";

const IconHash = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>);
const IconTimeline = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
const IconFile = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const IconMeetings = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconSupport = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const IconBack = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>);
const IconStar = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const IconSend = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const IconInfo = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>);
const IconClose = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const IconMenu = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>);

const QAIcons = {
  "Submit Milestone": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  "Request Meeting": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  "Get Support": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

function RightSidebarContent() {
  const Label = ({ icon, text }) => (
    <p className="text-xs font-bold tracking-widest uppercase text-gray-400 flex items-center gap-1.5 mb-2">{icon} {text}</p>
  );
  return (
    <>
      <div className="px-4 py-3 border-b border-gray-100">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>} text="Project Info" />
        <p className="text-sm font-bold text-gray-900">Food Delivery App</p>
        <p className="text-xs text-gray-400 mt-0.5">Started: Feb 18, 2026</p>
      </div>
      <div className="px-4 py-3 border-b border-gray-100">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/></svg>} text="Escrow" />
        {[["Total:","$42,000","text-gray-800"],["Released:","$8,400 ✓","text-green-600"],["Remaining:","$33,600","text-gray-800"]].map(([l,v,c]) => (
          <div key={l} className="flex justify-between text-xs py-0.5">
            <span className="text-gray-500">{l}</span><span className={"font-semibold "+c}>{v}</span>
          </div>
        ))}
      </div>
      <div className="px-4 py-3 border-b border-gray-100">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} text="Milestone" />
        <p className="text-sm font-bold text-gray-900">Current: 2 of 4</p>
        <p className="text-xs text-gray-500 mt-0.5 mb-2 leading-relaxed">Core Development<br/>Due: May 20 (77 days left)</p>
        <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full" style={{width:"40%"}}/>
        </div>
        <p className="text-xs font-bold text-blue-500 text-right mt-1">40%</p>
      </div>
      <div className="px-4 py-3 border-b border-gray-100">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>} text="Participants" />
        <div className="space-y-2">
          {participants.map((p) => (
            <div key={p.name} className="flex items-center gap-2">
              <span className={"w-2 h-2 rounded-full flex-shrink-0 "+(p.online?"bg-green-500":"bg-gray-300")}/>
              <span className="text-xs text-gray-700 font-medium flex-1">{p.name}</span>
              <span className={"text-xs font-bold px-1.5 py-0.5 rounded "+p.roleColor}>{p.role}</span>
            </div>
          ))}
        </div>
        <p className="text-xs text-red-500 flex items-center gap-1.5 mt-2.5">
          <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block"/>Admin is monitoring this project
        </p>
      </div>
      <div className="px-4 py-3 border-b border-gray-100">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>} text="Quick Actions" />
        <div className="space-y-1">
          {quickActions.map((qa) => (
            <button key={qa.label} className="w-full flex items-center gap-2 text-xs text-gray-600 hover:text-blue-600 font-medium py-1.5 transition-colors text-left">
              <span className="text-gray-400">{QAIcons[qa.label]}</span>{qa.label}
            </button>
          ))}
        </div>
      </div>
      <div className="px-4 py-3">
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} text="Next Deadline" />
        <p className="text-sm font-bold text-gray-900">May 20 - Milestone 2</p>
        <p className="text-xs text-gray-400 mt-0.5">77 days remaining</p>
      </div>
    </>
  );
}

function SectionLabel({ children }) {
  return <p className="text-xs font-bold tracking-widest uppercase text-gray-400 px-4 mb-1 mt-2">{children}</p>;
}

function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button onClick={onClick} className={"w-full flex items-center gap-2.5 px-4 py-2 text-sm font-medium transition-all relative "+(active?"bg-blue-50 text-blue-600 font-semibold":"text-gray-600 hover:bg-gray-50 hover:text-gray-800")}>
      {active && <span className="absolute left-0 top-2 bottom-2 w-0.5 bg-blue-500 rounded-r"/>}
      <span className={active?"text-blue-500":"text-gray-400"}>{icon}</span>
      {label}
      {badge && <span className="ml-auto bg-blue-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full leading-none">{badge}</span>}
    </button>
  );
}

function BottomNav({ activeView, setActiveView }) {
  const tabs = [
    { label: "Stream", view: "Project Stream", icon: <IconHash /> },
    { label: "Timeline", view: "Timeline", icon: <IconTimeline /> },
    { label: "Files", view: "Files", icon: <IconFile /> },
    { label: "Meetings", view: "Meetings", icon: <IconMeetings /> },
    { label: "Support", view: "Support", icon: <IconSupport /> },
  ];
  return (
    <nav className="flex md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-40 safe-area-pb">
      {tabs.map(({ label, view, icon }) => {
        const active = activeView === view;
        return (
          <button key={view} onClick={() => setActiveView(view)}
            className={"relative flex-1 flex flex-col items-center justify-center py-2 gap-0.5 " + (active ? "text-blue-600" : "text-gray-400")}>
            {active && <span className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-0.5 bg-blue-500 rounded-b-full"/>}
            <span>{icon}</span>
            <span className={"text-xs " + (active ? "font-bold" : "font-medium")}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function ProjectStreamDemo() {
  const [activeView, setActiveView] = useState("Project Stream");
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [showLeftDrawer, setShowLeftDrawer] = useState(false);

  const navViews = [
    { label: "Timeline", icon: <IconTimeline /> },
    { label: "Files", icon: <IconFile /> },
    { label: "Meetings", icon: <IconMeetings /> },
    { label: "Support", icon: <IconSupport /> },
  ];

  return (
    <div className="h-[100dvh] flex flex-col bg-gray-100 text-sm overflow-hidden">

      {/* Top Nav */}
      <nav className="bg-white border-b border-gray-200 flex items-center px-3 md:px-4 py-2.5 gap-2 flex-shrink-0 z-30">
        <button onClick={() => setShowLeftDrawer(true)} className="md:hidden p-1.5 text-gray-500 rounded-lg">
          <IconMenu />
        </button>
        <button className="hidden md:flex items-center gap-1.5 text-sm text-gray-600 hover:text-blue-600">
          <IconBack /> Back
        </button>
        <span className="font-bold text-gray-900 text-sm md:text-base truncate max-w-[140px] md:max-w-none">Food Delivery App</span>
        <div className="flex-1"/>
        <span className="hidden md:inline text-xs text-gray-400">Viewing as: <span className="font-semibold text-gray-700">Client</span></span>
        <button onClick={() => setShowRightDrawer(true)} className="lg:hidden p-1.5 text-gray-500 rounded-lg border border-gray-200 hover:bg-gray-50">
          <IconInfo />
        </button>
        <button className="hidden md:flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-100">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="opacity-60"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Demo
        </button>
      </nav>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">

        {/* Desktop Left Sidebar */}
        <aside className="hidden md:flex w-52 bg-white border-r border-gray-200 flex-col py-3 flex-shrink-0">
          <SectionLabel>Channels</SectionLabel>
          <SidebarItem icon={<IconHash />} label="Project Stream" active={activeView==="Project Stream"} badge={2} onClick={() => setActiveView("Project Stream")} />
          <div className="h-px bg-gray-100 mx-3 my-2"/>
          <SectionLabel>Views</SectionLabel>
          {navViews.map(({label,icon}) => (
            <SidebarItem key={label} icon={icon} label={label} active={activeView===label} onClick={() => setActiveView(label)} />
          ))}
        </aside>

        {/* Main Content */}
        <div className="flex flex-1 overflow-hidden pb-14 md:pb-0">
          {activeView==="Timeline"       ? <TimelineView /> :
           activeView==="Files"          ? <FilesView /> :
           activeView==="Meetings"       ? <MeetingsView /> :
           activeView==="Support"        ? <SupportView /> :
           activeView==="Project Stream" ? <ProjectStreamChat /> :
           <div className="flex flex-1 items-center justify-center text-gray-400">
             <p className="text-sm font-medium">{activeView} — Coming soon</p>
           </div>}
        </div>

        {/* Desktop Right Sidebar */}
        <aside className="hidden lg:flex w-64 bg-white border-l border-gray-200 overflow-y-auto flex-shrink-0 flex-col">
          <RightSidebarContent />
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <BottomNav activeView={activeView} setActiveView={setActiveView} />

      {/* Mobile Left Drawer */}
      {showLeftDrawer && (
        <div className="fixed inset-0 z-50 flex md:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowLeftDrawer(false)}/>
          <div className="relative w-64 bg-white h-full flex flex-col shadow-2xl animate-slide-in-left">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
              <span className="font-bold text-gray-900">Food Delivery App</span>
              <button onClick={() => setShowLeftDrawer(false)} className="text-gray-400 hover:text-gray-600"><IconClose /></button>
            </div>
            <div className="flex-1 overflow-y-auto py-3">
              <SectionLabel>Channels</SectionLabel>
              <SidebarItem icon={<IconHash />} label="Project Stream" active={activeView==="Project Stream"} badge={2} onClick={() => { setActiveView("Project Stream"); setShowLeftDrawer(false); }} />
              <div className="h-px bg-gray-100 mx-3 my-2"/>
              <SectionLabel>Views</SectionLabel>
              {navViews.map(({label,icon}) => (
                <SidebarItem key={label} icon={icon} label={label} active={activeView===label} onClick={() => { setActiveView(label); setShowLeftDrawer(false); }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Right Drawer (Project Info) */}
      {showRightDrawer && (
        <div className="fixed inset-0 z-50 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black bg-opacity-40" onClick={() => setShowRightDrawer(false)}/>
          <div className="relative w-72 max-w-full bg-white h-full flex flex-col shadow-2xl overflow-y-auto">
            <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100 sticky top-0 bg-white z-10">
              <span className="font-bold text-gray-900 text-sm">Project Info</span>
              <button onClick={() => setShowRightDrawer(false)} className="text-gray-400 hover:text-gray-600"><IconClose /></button>
            </div>
            <RightSidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}