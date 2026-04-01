// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import {
//   Avatar, SearchBar, FilterSelect,
//   ActionBtn, PageHeader, SectionCard
// } from "./AdminComponents";

// // ─── SHARED MOCK DATA (same projects as AdminProjects) ────────────────────────
// const mockProjects = [
//   {
//     id: "PRJ-001", title: "Food Delivery App",
//     client: { name: "ByteEats Co.", id: "CL-004" },
//     talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" },
//     status: "In Progress", health: "On Track",
//     budget: 480000, escrow: 240000,
//     deadline: "Jun 1, 2026", startDate: "Jan 10, 2026",
//     riskLevel: "Low", aiFlag: false, progress: 55,
//     scopeChanges: 1, clientSilenceDays: 0, talentSilenceDays: 0,
//     chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     aiRiskReason: null,
//     participants: 5,
//     lastMessage: { sender: "Raj Kumar", text: "Yes Priya, share them in Channel 1.", time: "5m ago" },
//     messages: [
//       { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "Please ensure all deliverables are uploaded before the deadline.", time: "Mar 14 · 04:30 PM", type: "Normal", msgType: "Normal" },
//       { id: "M2", sender: "Priya S.", role: "team", color: "yellow", text: "UI screens for milestone 3 are ready for review. Should I share in the client channel?", time: "Mar 14 · 05:00 PM", type: "Normal", msgType: "Normal" },
//       { id: "M3", sender: "Raj Kumar", role: "agency", color: "blue", text: "Yes Priya, share them in Channel 1 with the client. Good work!", time: "Mar 14 · 05:15 PM", type: "Normal", msgType: "Normal" },
//     ],
//   },
//   {
//     id: "PRJ-002", title: "Patient Appointment App",
//     client: { name: "HealthFirst Clinic", id: "CL-001" },
//     talent: { name: "Arjun Dev", id: "FL-002", type: "Freelancer" },
//     status: "In Progress", health: "At Risk",
//     budget: 320000, escrow: 160000,
//     deadline: "Apr 25, 2026", startDate: "Feb 3, 2026",
//     riskLevel: "Medium", aiFlag: true, progress: 35,
//     scopeChanges: 3, clientSilenceDays: 8, talentSilenceDays: 0,
//     chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     aiRiskReason: "Client unresponsive for 8 days. Scope changed 3 times. Deadline breach risk: Medium.",
//     participants: 3,
//     lastMessage: { sender: "Weblance Admin", text: "⚠ Client has been unresponsive for 8 days. Reminder sent.", time: "4h ago" },
//     messages: [
//       { id: "M1", sender: "Arjun Dev", role: "talent", color: "blue", text: "Milestone 2 is 60% done. Waiting for client feedback on the appointment flow.", time: "Mar 8 · 10:00 AM", type: "Update", msgType: "Update" },
//       { id: "M2", sender: "Weblance Admin", role: "admin", color: "red", text: "⚠ Client has been unresponsive for 8 days. Reminder has been sent automatically.", time: "Mar 10 · 09:00 AM", type: "Warning", msgType: "Warning" },
//     ],
//   },
//   {
//     id: "PRJ-003", title: "E-Commerce Platform Revamp",
//     client: { name: "ShopEasy Retail", id: "CL-002" },
//     talent: { name: "Rahul Sharma", id: "FL-001", type: "Freelancer" },
//     status: "In Progress", health: "Delayed",
//     budget: 185000, escrow: 92500,
//     deadline: "Apr 10, 2026", startDate: "Jan 20, 2026",
//     riskLevel: "High", aiFlag: true, progress: 28,
//     scopeChanges: 5, clientSilenceDays: 5, talentSilenceDays: 2,
//     chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     aiRiskReason: "Milestone 1 was 13 days late. 5 scope changes without approval. Both parties show inactivity. Dispute risk: HIGH.",
//     participants: 3,
//     lastMessage: { sender: "Weblance Admin", text: "⚠ High risk project flagged. Scope changes must be formally approved.", time: "2d ago" },
//     messages: [
//       { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "⚠ This project has been flagged as high risk. Scope changes must be formally approved going forward.", time: "Mar 10 · 08:00 AM", type: "Warning", msgType: "Warning" },
//       { id: "M2", sender: "Rahul Sharma", role: "talent", color: "blue", text: "I've completed 80% of the backend. Waiting for the updated API spec from the client.", time: "Mar 12 · 02:00 PM", type: "Update", msgType: "Update" },
//     ],
//   },
//   {
//     id: "PRJ-006", title: "Mobile Banking App",
//     client: { name: "Vikram Singh", id: "CL-002" },
//     talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" },
//     status: "Disputed", health: "Disputed",
//     budget: 280000, escrow: 140000,
//     deadline: "Apr 5, 2026", startDate: "Nov 15, 2025",
//     riskLevel: "High", aiFlag: true, progress: 50,
//     scopeChanges: 2, clientSilenceDays: 0, talentSilenceDays: 0,
//     chatFrozen: true,
//     frozenReason: "Active dispute on Milestone 3 — DSP-002",
//     frozenBy: "Weblance Admin",
//     frozenAt: "Mar 8, 2026 · 06:00 PM",
//     aiRiskReason: "Dispute raised by client. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault — 60% Agency, 40% Client.",
//     participants: 5,
//     lastMessage: { sender: "Weblance Admin", text: "🔒 Chat frozen pending dispute resolution.", time: "7d ago" },
//     messages: [
//       { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "🔒 Chat frozen pending dispute resolution. Only official admin messages allowed.", time: "Mar 8 · 06:00 PM", type: "Warning", msgType: "Warning" },
//       { id: "M2", sender: "System", role: "system", color: "gray", text: "Escrow ₹1,40,000 has been frozen automatically due to active dispute DSP-002.", time: "Mar 8 · 06:01 PM", type: "System", msgType: "System" },
//     ],
//   },
//   {
//     id: "PRJ-005", title: "Brand Identity Design",
//     client: { name: "Meera Joshi", id: "CL-003" },
//     talent: { name: "Neha Gupta", id: "FL-005", type: "Freelancer" },
//     status: "Pending", health: "Pending",
//     budget: 45000, escrow: 0,
//     deadline: "Apr 20, 2026", startDate: "Mar 14, 2026",
//     riskLevel: "Low", aiFlag: false, progress: 0,
//     scopeChanges: 0, clientSilenceDays: 0, talentSilenceDays: 0,
//     chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     aiRiskReason: null,
//     participants: 3,
//     lastMessage: { sender: "System", text: "Waiting for client to fund escrow before work begins.", time: "1d ago" },
//     messages: [
//       { id: "M1", sender: "System", role: "system", color: "gray", text: "Project created. Waiting for client to fund escrow before work can begin.", time: "Mar 14 · 12:00 PM", type: "System", msgType: "System" },
//     ],
//   },
// ];

// // ─── SHARED STYLES ─────────────────────────────────────────────────────────────
// const healthStyle = {
//   "On Track": "bg-green-50 text-green-700 border border-green-200",
//   "At Risk": "bg-yellow-50 text-yellow-700 border border-yellow-200",
//   "Delayed": "bg-orange-50 text-orange-700 border border-orange-200",
//   "Disputed": "bg-red-50 text-red-700 border border-red-200",
//   "Completed": "bg-gray-50 text-gray-600 border border-gray-200",
//   "Pending": "bg-blue-50 text-blue-700 border border-blue-200",
// };

// const msgColorMap = {
//   red: "bg-red-50 border-l-4 border-red-400",
//   blue: "bg-blue-50 border-l-4 border-blue-400",
//   yellow: "bg-yellow-50 border-l-4 border-yellow-400",
//   green: "bg-green-50 border-l-4 border-green-400",
//   gray: "bg-gray-50 border-l-4 border-gray-300",
// };

// const roleBadge = {
//   admin: "bg-red-100 text-red-700",
//   agency: "bg-blue-100 text-blue-700",
//   talent: "bg-blue-100 text-blue-700",
//   team: "bg-yellow-100 text-yellow-700",
//   client: "bg-green-100 text-green-700",
//   system: "bg-gray-100 text-gray-500",
// };

// const roleLabel = {
//   admin: "Weblance Admin", agency: "Agency Admin",
//   talent: "Freelancer", team: "Team Member",
//   client: "Client", system: "System",
// };

// // ─── REUSABLE CHAT VIEW ───────────────────────────────────────────────────────
// function ChatView({ project, onFreeze, onUnfreeze, showSend = true }) {
//   const [adminMsg, setAdminMsg] = useState("");
//   const [msgType, setMsgType] = useState("Normal");
//   const [messages, setMessages] = useState(project.messages);

//   const sendMsg = () => {
//     if (!adminMsg.trim()) return;
//     setMessages(prev => [...prev, {
//       id: `NEW-${Date.now()}`, sender: "Weblance Admin", role: "admin",
//       color: "red", text: adminMsg, time: "Just now", type: msgType, msgType,
//     }]);
//     setAdminMsg("");
//   };

//   return (
//     <div className="flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//       {/* Chat Header */}
//       <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between shrink-0">
//         <div>
//           <div className="flex items-center gap-2">
//             <p className="text-sm font-bold text-gray-800">{project.title}</p>
//             <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[project.health]}`}>
//               {project.health}
//             </span>
//             {project.chatFrozen && (
//               <span className="text-[11px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
//                 🔒 Frozen
//               </span>
//             )}
//           </div>
//           <p className="text-xs text-gray-400 mt-0.5">{project.id} · {project.participants} participants · Read-only admin view</p>
//         </div>
//         <div className="flex items-center gap-2">
//           {project.chatFrozen ? (
//             <ActionBtn label="Unfreeze Chat" onClick={onUnfreeze} />
//           ) : (
//             <ActionBtn label="Freeze Chat" variant="warning" onClick={onFreeze} />
//           )}
//         </div>
//       </div>

//       {/* Freeze notice */}
//       {project.chatFrozen && (
//         <div className="px-5 py-2.5 bg-red-50 border-b border-red-100 flex items-center gap-2">
//           <span className="text-red-500 text-sm">🔒</span>
//           <div>
//             <p className="text-xs font-semibold text-red-700">Chat frozen — only admin messages visible</p>
//             <p className="text-[10px] text-red-500">{project.frozenReason} · Frozen by {project.frozenBy} · {project.frozenAt}</p>
//           </div>
//         </div>
//       )}

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-5 space-y-3">
//         {messages.map((msg) => (
//           <div key={msg.id} className={`p-3 rounded-xl ${msgColorMap[msg.color] || msgColorMap.gray}`}>
//             <div className="flex items-center gap-2 mb-1.5 flex-wrap">
//               <Avatar name={msg.sender} size="sm" />
//               <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
//               <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[msg.role] || roleBadge.system}`}>
//                 {roleLabel[msg.role] || msg.role}
//               </span>
//               {msg.msgType && msg.msgType !== "Normal" && (
//                 <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full">
//                   {msg.msgType}
//                 </span>
//               )}
//               <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
//             </div>
//             <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
//           </div>
//         ))}
//       </div>

//       {/* Admin Message Input */}
//       {showSend && (
//         <div className="px-5 pb-5 pt-4 border-t border-gray-100 shrink-0">
//           <div className="flex items-center gap-2 mb-2">
//             <p className="text-xs font-semibold text-gray-500">Send Official Admin Message</p>
//             <select
//               value={msgType}
//               onChange={(e) => setMsgType(e.target.value)}
//               className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
//             >
//               {["Normal", "Warning", "Decision", "Notice", "Freeze"].map(t => (
//                 <option key={t} value={t}>{t}</option>
//               ))}
//             </select>
//           </div>
//           <div className="flex gap-2">
//             <input
//               value={adminMsg}
//               onChange={(e) => setAdminMsg(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMsg()}
//               placeholder="Type official message... (Enter to send)"
//               className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
//             />
//             <ActionBtn label="Send" variant="primary" size="md" onClick={sendMsg} />
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// /* ── Freelancer Contracts theme tokens ───────────────────────
//    GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
//    NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
//    ──────────────────────────────────────────────────────────── */
// const G = {
//   greenLight: "#A8E063",
//   green: "#6EC030",
//   greenDeep: "#2E7D1F",
//   greenBg: "#f1fce8",
//   greenBorder: "#d4edbb",

//   navyLight: "#4A6FA5",
//   navy: "#1A2B5E",
//   navyDeep: "#0F1A3B",
//   navyBg: "#e8edf7",
//   navyBorder: "#b8c6e0",

//   gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
//   gradNavy: "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

//   text: "#1C1C1C",
//   sub: "#4b5563",
//   muted: "#9ca3af",
//   border: "#e5e7eb",
//   bg: "#f9fafb",
//   white: "#ffffff",

//   amber: "#f59e0b",
//   amberBg: "#fffbeb",
//   amberBorder: "#fde68a",
//   amberText: "#92400e",
//   red: "#ef4444",
//   redBg: "#fef2f2",
//   redBorder: "#fecaca",
//   redText: "#dc2626",
//   orange: "#f97316",
//   orangeBg: "#fff7ed",
//   orangeBorder: "#fed7aa",
//   orangeText: "#c2410c",
// };
// const FONT = "'Poppins', sans-serif";

// const HEALTH_STYLE = {
//   "At Risk": { bg: G.amberBg, text: G.amberText, dot: G.amber },
//   "Delayed": { bg: G.orangeBg, text: G.orangeText, dot: G.orange },
//   "Disputed": { bg: G.redBg, text: G.redText, dot: G.red },
// };

// /* ── Shared mini-components ── */
// function StatCard({ label, value, sub, color = "gray" }) {
//   const map = {
//     gray: { bg: G.bg, border: G.border, val: G.text, lbl: G.muted },
//     green: { bg: G.greenBg, border: G.greenBorder, val: G.greenDeep, lbl: G.greenDeep },
//     orange: { bg: G.orangeBg, border: G.orangeBorder, val: G.orangeText, lbl: G.orangeText },
//     red: { bg: G.redBg, border: G.redBorder, val: G.redText, lbl: G.redText },
//   };
//   const c = map[color] || map.gray;
//   return (
//     <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", flex: 1, minWidth: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: c.lbl, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
//       <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
//       {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
//     </div>
//   );
// }

// const btnNavy = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "8px 16px", cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)", whiteSpace: "nowrap" };
// const btnGreen = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.gradGreen, color: G.white, border: "none", borderRadius: 100, padding: "8px 16px", cursor: "pointer", boxShadow: "0 2px 10px rgba(46,125,31,0.22)", whiteSpace: "nowrap" };
// const btnOutline = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}`, borderRadius: 100, padding: "8px 16px", cursor: "pointer", whiteSpace: "nowrap" };
// const btnWarn = { ...btnOutline, background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}` };
// const btnDanger = { ...btnOutline, background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}` };

// // /* ── Mock data (same shape as AdminProjects) ── */
// // const mockProjects = [
// //   { id:"PRJ-002", title:"Patient Appointment App", client:{name:"HealthFirst Clinic",id:"CL-001",type:"Startup"}, talent:{name:"Arjun Dev",id:"FL-002",type:"Freelancer"}, status:"In Progress", health:"At Risk", budget:320000, escrow:160000, deadline:"Apr 25, 2026", riskLevel:"Medium", aiFlag:true, progress:35, scopeChanges:3, clientSilenceDays:8, talentSilenceDays:0, chatFrozen:false, aiRiskReason:"Client has been unresponsive for 8 days. Scope changed 3 times. Moderate risk of deadline breach. Admin attention recommended." },
// //   { id:"PRJ-003", title:"E-Commerce Platform Revamp", client:{name:"ShopEasy Retail",id:"CL-002",type:"Enterprise"}, talent:{name:"Rahul Sharma",id:"FL-001",type:"Freelancer"}, status:"In Progress", health:"Delayed", budget:185000, escrow:92500, deadline:"Apr 10, 2026", riskLevel:"High", aiFlag:true, progress:28, scopeChanges:5, clientSilenceDays:5, talentSilenceDays:2, chatFrozen:false, aiRiskReason:"Milestone 1 delivered 13 days late. Scope changed 5 times without approval. Client silence and talent inactivity both detected. High risk of dispute." },
// //   { id:"PRJ-006", title:"Mobile Banking App", client:{name:"Vikram Singh",id:"CL-002",type:"Enterprise"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency"}, status:"Disputed", health:"Disputed", budget:280000, escrow:140000, deadline:"Apr 5, 2026", riskLevel:"High", aiFlag:true, progress:50, scopeChanges:2, clientSilenceDays:0, talentSilenceDays:0, chatFrozen:true, aiRiskReason:"Active dispute on Milestone 3. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault — 60% Agency, 40% Client. Chat frozen pending resolution." },
// // ];

// export function AdminAtRiskProjects() {
//   const navigate = useNavigate();
//   const [search, setSearch] = useState("");
//   const [riskFilter, setRiskFilter] = useState("");
//   const [selected, setSelected] = useState(null);

//   const atRiskProjects = mockProjects.filter(p =>
//     ["At Risk", "Delayed", "Disputed"].includes(p.health)
//   );

//   const filtered = atRiskProjects.filter(p => {
//     const q = search.toLowerCase();
//     return (
//       (p.title.toLowerCase().includes(q) || p.client.name.toLowerCase().includes(q) || p.talent.name.toLowerCase().includes(q)) &&
//       (!riskFilter || p.riskLevel === riskFilter)
//     );
//   });

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//         input, select { outline: none; font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* ── Header ── */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>At-Risk Projects</h1>
//           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Projects flagged by AI — delayed, at risk, or in active dispute</p>
//         </div>
//         <div style={{ display: "flex", gap: 8 }}>
//           <button style={btnOutline} onClick={() => navigate("/admin/projects")}>← All Projects</button>
//           <button style={btnNavy} onClick={() => navigate("/admin/projectstream/freeze")}>Frozen Chats</button>
//         </div>
//       </div>

//       {/* ── Stats ── */}
//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total At Risk" value={atRiskProjects.length} color="orange" />
//         <StatCard label="Delayed" value={atRiskProjects.filter(p => p.health === "Delayed").length} color="orange" />
//         <StatCard label="Disputed" value={atRiskProjects.filter(p => p.health === "Disputed").length} color="red" />
//         <StatCard label="Escrow at Stake" value={`₹${(atRiskProjects.reduce((s, p) => s + p.escrow, 0) / 100000).toFixed(1)}L`} color="red" />
//       </div>

//       {/* ── Filter bar ── */}
//       <div style={{
//         display: "flex", gap: 10, alignItems: "center", marginBottom: 20,
//         background: G.white, border: `1px solid ${G.greenBorder}`,
//         borderRadius: 12, padding: "12px 16px",
//         boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
//       }}>
//         <div style={{ position: "relative", flex: "1 1 240px", maxWidth: 320 }}>
//           <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
//           <input
//             value={search} onChange={e => setSearch(e.target.value)}
//             placeholder="Search project, client, talent…"
//             style={{ width: "100%", fontSize: 12, fontWeight: 500, border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "8px 12px 8px 32px", background: G.white, color: G.text, boxSizing: "border-box" }}
//           />
//         </div>
//         <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
//           style={{ fontSize: 12, fontWeight: 600, border: `1.5px solid ${riskFilter ? G.green : G.greenBorder}`, borderRadius: 100, padding: "8px 14px", background: riskFilter ? G.greenBg : G.white, color: riskFilter ? G.greenDeep : G.sub, cursor: "pointer" }}>
//           <option value="">All Risk</option>
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//         </select>
//         <span style={{ fontSize: 11, color: G.muted, fontWeight: 600, marginLeft: "auto" }}>{filtered.length} results</span>
//       </div>

//       {/* ── Cards ── */}
//       <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//         {filtered.map(p => {
//           const hs = HEALTH_STYLE[p.health] || HEALTH_STYLE["At Risk"];
//           const isSelected = selected?.id === p.id;
//           const isHigh = p.riskLevel === "High";

//           return (
//             <div
//               key={p.id}
//               onClick={() => setSelected(isSelected ? null : p)}
//               style={{
//                 background: G.white,
//                 border: `1.5px solid ${isSelected ? G.green : p.health === "Disputed" ? G.redBorder : p.health === "Delayed" ? G.orangeBorder : G.amberBorder}`,
//                 borderRadius: 16,
//                 cursor: "pointer",
//                 transition: "all 0.15s",
//                 boxShadow: isSelected
//                   ? "0 4px 24px rgba(110,192,48,0.14)"
//                   : p.health === "Disputed"
//                     ? "0 2px 12px rgba(239,68,68,0.08)"
//                     : "0 2px 8px rgba(249,115,22,0.07)",
//                 overflow: "hidden",
//               }}
//             >
//               {/* Coloured top stripe */}
//               <div style={{
//                 height: 3,
//                 background: p.health === "Disputed"
//                   ? `linear-gradient(90deg, ${G.red} 0%, ${G.redBorder} 100%)`
//                   : p.health === "Delayed"
//                     ? `linear-gradient(90deg, ${G.orange} 0%, ${G.orangeBorder} 100%)`
//                     : `linear-gradient(90deg, ${G.amber} 0%, ${G.amberBorder} 100%)`,
//               }} />

//               <div style={{ padding: "18px 20px" }}>

//                 {/* ── Top row ── */}
//                 <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
//                       <h3 style={{ fontSize: 15, fontWeight: 700, color: G.text, margin: 0 }}>{p.title}</h3>
//                       {/* Health badge */}
//                       <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: hs.bg, color: hs.text, padding: "3px 10px", borderRadius: 99 }}>
//                         <span style={{ width: 5, height: 5, borderRadius: "50%", background: hs.dot }} />
//                         {p.health}
//                       </span>
//                       {p.aiFlag && (
//                         <span style={{ fontSize: 9, fontWeight: 700, background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`, padding: "1px 7px", borderRadius: 99 }}>AI⚑</span>
//                       )}
//                     </div>
//                     <p style={{ fontSize: 12, color: G.muted, margin: 0 }}>
//                       {p.id} · {p.client.name} → {p.talent.name} ({p.talent.type})
//                     </p>
//                   </div>

//                   {/* Risk pill */}
//                   <span style={{
//                     fontSize: 11, fontWeight: 700, padding: "5px 12px", borderRadius: 10, flexShrink: 0,
//                     background: isHigh ? G.redBg : G.amberBg,
//                     color: isHigh ? G.redText : G.amberText,
//                     border: `1px solid ${isHigh ? G.redBorder : G.amberBorder}`,
//                   }}>
//                     {p.riskLevel} Risk
//                   </span>
//                 </div>

//                 {/* ── AI Risk Reason ── */}
//                 {p.aiRiskReason && (
//                   <div style={{
//                     display: "flex", alignItems: "flex-start", gap: 10,
//                     padding: "10px 14px", marginBottom: 14,
//                     background: G.orangeBg, border: `1px solid ${G.orangeBorder}`,
//                     borderRadius: 10,
//                   }}>
//                     <span style={{ fontSize: 16, color: G.orange, flexShrink: 0, marginTop: 1 }}>◎</span>
//                     <p style={{ fontSize: 12, color: G.orangeText, lineHeight: 1.6, margin: 0 }}>{p.aiRiskReason}</p>
//                   </div>
//                 )}

//                 {/* ── Progress + meta stats ── */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 20, marginBottom: 14 }}>
//                   <div style={{ flex: 1 }}>
//                     <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
//                       <span style={{ fontSize: 11, color: G.muted }}>Progress</span>
//                       <span style={{ fontSize: 11, fontWeight: 700, color: G.sub }}>{p.progress}%</span>
//                     </div>
//                     <div style={{ height: 8, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//                       <div style={{
//                         width: `${p.progress}%`, height: "100%", borderRadius: 99,
//                         background: isHigh ? G.orange : G.amber,
//                         transition: "width 0.3s",
//                       }} />
//                     </div>
//                   </div>

//                   <div style={{ display: "flex", alignItems: "center", gap: 20, flexShrink: 0 }}>
//                     {[
//                       { label: "Escrow", value: p.escrow > 0 ? `₹${(p.escrow / 1000).toFixed(0)}k` : "—", color: G.orangeText },
//                       { label: "Deadline", value: p.deadline, color: G.text },
//                       { label: "Scope Δ", value: p.scopeChanges, color: p.scopeChanges > 2 ? G.redText : G.sub },
//                     ].map(s => (
//                       <div key={s.label} style={{ textAlign: "center" }}>
//                         <p style={{ fontSize: 13, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
//                         <p style={{ fontSize: 10, color: G.muted, marginTop: 2 }}>{s.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* ── Silence / frozen indicators ── */}
//                 {(p.clientSilenceDays > 0 || p.talentSilenceDays > 0 || p.chatFrozen) && (
//                   <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 14 }}>
//                     {p.clientSilenceDays > 0 && (
//                       <span style={{
//                         display: "inline-flex", alignItems: "center", gap: 5,
//                         fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
//                         background: p.clientSilenceDays > 5 ? G.redBg : G.amberBg,
//                         color: p.clientSilenceDays > 5 ? G.redText : G.amberText,
//                         border: `1px solid ${p.clientSilenceDays > 5 ? G.redBorder : G.amberBorder}`,
//                       }}>
//                         ⏱ Client silent {p.clientSilenceDays}d
//                       </span>
//                     )}
//                     {p.talentSilenceDays > 0 && (
//                       <span style={{
//                         display: "inline-flex", alignItems: "center", gap: 5,
//                         fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
//                         background: p.talentSilenceDays > 2 ? G.redBg : G.amberBg,
//                         color: p.talentSilenceDays > 2 ? G.redText : G.amberText,
//                         border: `1px solid ${p.talentSilenceDays > 2 ? G.redBorder : G.amberBorder}`,
//                       }}>
//                         ⏱ Talent silent {p.talentSilenceDays}d
//                       </span>
//                     )}
//                     {p.chatFrozen && (
//                       <span style={{
//                         display: "inline-flex", alignItems: "center", gap: 5,
//                         fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 99,
//                         background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
//                       }}>
//                         🔒 Chat frozen
//                       </span>
//                     )}
//                   </div>
//                 )}

//                 {/* ── Action buttons ── */}
//                 <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
//                   <button style={btnNavy}
//                     onClick={e => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}>
//                     Monitor Chat
//                   </button>
//                   <button style={btnOutline}
//                     onClick={e => { e.stopPropagation(); navigate(`/admin/projects/${p.id}`); }}>
//                     View Project
//                   </button>
//                   <button style={btnWarn}
//                     onClick={e => e.stopPropagation()}>
//                     Send Warning
//                   </button>
//                   {p.health === "Disputed" && (
//                     <button style={btnDanger}
//                       onClick={e => { e.stopPropagation(); navigate("/admin/disputes"); }}>
//                       View Dispute
//                     </button>
//                   )}
//                   <button style={p.chatFrozen ? btnOutline : btnWarn}
//                     onClick={e => e.stopPropagation()}>
//                     {p.chatFrozen ? "Unfreeze Chat" : "Freeze Chat"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           );
//         })}

//         {/* ── Empty state ── */}
//         {filtered.length === 0 && (
//           <div style={{
//             background: G.white, border: `1px solid ${G.greenBorder}`,
//             borderRadius: 16, padding: "56px 20px", textAlign: "center",
//             boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//           }}>
//             <div style={{
//               width: 52, height: 52, borderRadius: "50%",
//               background: G.greenBg, border: `1px solid ${G.greenBorder}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 22, margin: "0 auto 12px",
//             }}>✓</div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 4 }}>No at-risk projects</p>
//             <p style={{ fontSize: 12, color: G.muted }}>All projects are on track</p>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default AdminAtRiskProjects;


// // ─── PAGE 2: /admin/projectstream/:id — MONITOR ANY CHAT ─────────────────────
// export function AdminProjectStreamMonitor() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState(mockProjects);
//   const [filterType, setFilterType] = useState("All");
//   const [showFreezeModal, setShowFreezeModal] = useState(false);
//   const [freezeReason, setFreezeReason] = useState("");

//   const p = projects.find(x => x.id === id);

//   if (!p) return (
//     <div className="p-6 text-center py-24 space-y-3">
//       <p className="text-gray-400">ProjectStream not found</p>
//       <ActionBtn label="← Back" onClick={() => navigate("/admin/projects")} size="md" />
//     </div>
//   );

//   const handleFreeze = () => setShowFreezeModal(true);
//   const confirmFreeze = () => {
//     setProjects(prev => prev.map(x => x.id === id ? {
//       ...x, chatFrozen: true,
//       frozenReason: freezeReason || "Frozen by admin",
//       frozenBy: "Weblance Admin",
//       frozenAt: "Mar 14, 2026 · Now",
//     } : x));
//     setShowFreezeModal(false);
//     setFreezeReason("");
//   };
//   const handleUnfreeze = () => {
//     setProjects(prev => prev.map(x => x.id === id ? {
//       ...x, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     } : x));
//   };

//   const currentProject = projects.find(x => x.id === id);

//   const filteredMessages = currentProject.messages.filter(m => {
//     if (filterType === "All") return true;
//     if (filterType === "Warnings") return m.msgType === "Warning";
//     if (filterType === "Admin") return m.role === "admin";
//     if (filterType === "Decisions") return m.msgType === "Decision";
//     return true;
//   });

//   return (
//     <div className="p-6 h-[calc(100vh-0px)] flex flex-col">
//       {/* Back + Header */}
//       <div className="flex items-center justify-between mb-4 shrink-0">
//         <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
//           ← Back
//         </button>
//         <div className="flex items-center gap-2">
//           <ActionBtn label="View Project" onClick={() => navigate(`/admin/projects/${p.id}`)} />
//           <ActionBtn label="View Client" onClick={() => navigate(`/admin/clients/${p.client.id}`)} />
//           <ActionBtn label="At-Risk List" onClick={() => navigate("/admin/projects/at-risk")} />
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 flex-1 min-h-0">
//         {/* Main Chat — takes 3 cols */}
//         <div className="lg:col-span-3 flex flex-col min-h-0">
//           {/* Message filter tabs */}
//           <div className="flex gap-1 border-b border-gray-100 mb-3 shrink-0">
//             {["All", "Admin", "Warnings", "Decisions"].map(f => (
//               <button key={f} onClick={() => setFilterType(f)}
//                 className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterType === f ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
//                 {f}
//               </button>
//             ))}
//           </div>

//           <div className="flex-1 min-h-0">
//             <ChatView
//               project={{ ...currentProject, messages: filteredMessages }}
//               onFreeze={handleFreeze}
//               onUnfreeze={handleUnfreeze}
//             />
//           </div>
//         </div>

//         {/* Sidebar — 1 col */}
//         <div className="space-y-4 overflow-y-auto">
//           {/* Project Info */}
//           <SectionCard title="Project Info">
//             <div className="space-y-2">
//               {[
//                 { label: "Project", value: p.title },
//                 { label: "Health", value: <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span> },
//                 { label: "Progress", value: `${p.progress}%` },
//                 { label: "Deadline", value: p.deadline },
//                 { label: "Budget", value: `₹${(p.budget / 1000).toFixed(0)}k` },
//                 { label: "Escrow", value: p.escrow > 0 ? `₹${(p.escrow / 1000).toFixed(0)}k` : "Released" },
//               ].map(item => (
//                 <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
//                   <span className="text-xs text-gray-400">{item.label}</span>
//                   <span className="text-xs font-semibold text-gray-700">{item.value}</span>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           {/* Participants */}
//           <SectionCard title="Participants">
//             <div className="space-y-2.5">
//               {[
//                 { name: "Weblance Admin", role: "Platform", color: "bg-red-500" },
//                 { name: p.client.name, role: "Client", color: "bg-green-500" },
//                 { name: p.talent.name, role: p.talent.type, color: "bg-blue-500" },
//               ].map(pt => (
//                 <div key={pt.name} className="flex items-center gap-2.5">
//                   <div className={`w-7 h-7 rounded-full ${pt.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
//                     {pt.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
//                   </div>
//                   <div>
//                     <p className="text-xs font-semibold text-gray-800">{pt.name}</p>
//                     <p className="text-[10px] text-gray-400">{pt.role}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           {/* Admin Actions */}
//           <SectionCard title="Chat Actions">
//             <div className="space-y-2">
//               {[
//                 { label: currentProject.chatFrozen ? "Unfreeze Chat" : "Freeze Chat", variant: currentProject.chatFrozen ? "default" : "warning", action: currentProject.chatFrozen ? handleUnfreeze : handleFreeze },
//                 { label: "Export Chat History", variant: "default", action: () => { } },
//                 { label: "Flag Conversation", variant: "danger", action: () => { } },
//                 { label: "View Project Detail", variant: "default", action: () => navigate(`/admin/projects/${p.id}`) },
//                 { label: "Escalate to Dispute", variant: "danger", action: () => navigate("/admin/disputes") },
//               ].map(a => (
//                 <button key={a.label} onClick={a.action}
//                   className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${a.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" :
//                       a.variant === "danger" ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" :
//                         "border-gray-200 text-gray-700 hover:bg-gray-50"
//                     }`}>
//                   {a.label}
//                 </button>
//               ))}
//             </div>
//           </SectionCard>

//           {/* AI Risk */}
//           {p.aiRiskReason && (
//             <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
//               <p className="text-xs font-bold text-orange-800 mb-1.5">◎ AI Risk Alert</p>
//               <p className="text-xs text-orange-700 leading-relaxed">{p.aiRiskReason}</p>
//             </div>
//           )}
//         </div>
//       </div>

//       {/* Freeze Modal */}
//       {showFreezeModal && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowFreezeModal(false)}>
//           <div className="absolute inset-0 bg-black/30" />
//           <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
//             <h3 className="text-base font-bold text-gray-900 mb-1">Freeze Chat</h3>
//             <p className="text-sm text-gray-500 mb-4">Only admin messages will be allowed once frozen. Both parties will be notified.</p>
//             <div className="mb-4">
//               <label className="text-xs font-semibold text-gray-500 block mb-1.5">Reason for freeze *</label>
//               <div className="space-y-2 mb-3">
//                 {["Active dispute — awaiting resolution", "Admin review in progress", "Legal hold", "Suspicious activity detected", "Other"].map(r => (
//                   <label key={r} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${freezeReason === r ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
//                     <input type="radio" name="freezeReason" value={r} checked={freezeReason === r} onChange={() => setFreezeReason(r)} className="accent-red-500" />
//                     {r}
//                   </label>
//                 ))}
//               </div>
//             </div>
//             <div className="flex gap-2">
//               <ActionBtn label="Cancel" onClick={() => setShowFreezeModal(false)} />
//               <button onClick={confirmFreeze} disabled={!freezeReason}
//                 className="flex-1 py-2 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
//                 Confirm Freeze
//               </button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// // ─── PAGE 3: /admin/projectstream/freeze — FROZEN CHATS ──────────────────────
// export function AdminFrozenChats() {
//   const navigate = useNavigate();
//   const [projects, setProjects] = useState(mockProjects);
//   const [selected, setSelected] = useState(null);

//   const frozenProjects = projects.filter(p => p.chatFrozen);

//   const unfreeze = (id) => {
//     setProjects(prev => prev.map(p => p.id === id ? {
//       ...p, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
//     } : p));
//     if (selected?.id === id) setSelected(null);
//   };

//   return (
//     <div className="p-6">
//       <PageHeader
//         title="Frozen Chats"
//         subtitle="All ProjectStream conversations currently frozen by admin"
//         actions={
//           <div style={{ display: "flex", gap: 8 }}>
//             <button style={btnOutline} onClick={() => navigate("/admin/projects")}>← All Projects</button>
//             <button style={btnNavy} onClick={() => navigate("/admin/projects/at-risk")}>At-Risk Projects</button>
//           </div>
//         }
//       />

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <StatCard label="Frozen Chats" value={frozenProjects.length} sub="Currently frozen" color="red" />
//         <StatCard label="Disputed" value={frozenProjects.filter(p => p.health === "Disputed").length} color="orange" />
//         <StatCard label="Escrow at Stake" value={`₹${(frozenProjects.reduce((s, p) => s + p.escrow, 0) / 1000).toFixed(0)}k`} color="red" />
//         <StatCard label="Total Chats" value={mockProjects.length} sub="Platform-wide" color="gray" />
//       </div>

//       {frozenProjects.length === 0 ? (
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-20 text-center">
//           <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
//             <span className="text-green-500 text-2xl">🔓</span>
//           </div>
//           <p className="text-gray-600 font-semibold text-base">No chats are frozen</p>
//           <p className="text-gray-400 text-sm mt-1">All ProjectStream conversations are currently active</p>
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           {/* Left — frozen list */}
//           <div className="space-y-4">
//             <h3 className="text-sm font-semibold text-gray-600 mb-3">
//               {frozenProjects.length} frozen conversation{frozenProjects.length !== 1 ? "s" : ""}
//             </h3>
//             {frozenProjects.map(p => (
//               <div

//                 key={p.id}
//                 onClick={() => setSelected(selected?.id === p.id ? null : p)}
//                 className={`bg-white rounded-xl border shadow-md cursor-pointer transition-all hover:shadow-lg ${selected?.id === p.id ? "border-red-300 ring-1 ring-red-200" : "border-gray-100"}`
//                 }
//               >
//                 <div className="p-4">
//                   <div className="flex items-start justify-between mb-2">
//                     <div>
//                       <div className="flex items-center gap-2 mb-1">
//                         <span className="text-base">🔒</span>
//                         <p className="text-sm font-bold text-gray-800">{p.title}</p>
//                         <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span>
//                       </div>
//                       <p className="text-xs text-gray-500">{p.id} · {p.client.name} → {p.talent.name}</p>
//                     </div>
//                   </div>

//                   <div className="bg-red-50 rounded-lg p-2.5 border border-red-100 mb-3">
//                     <p className="text-xs font-semibold text-red-700 mb-0.5">Freeze Reason</p>
//                     <p className="text-xs text-red-600">{p.frozenReason}</p>
//                     <p className="text-[10px] text-red-400 mt-1">Frozen by {p.frozenBy} · {p.frozenAt}</p>
//                   </div>

//                   <div className="flex items-center gap-2">
//                     <div style={{ display: "flex", gap: 8 }}>

//                       <button style={btnNavy} onClick={(e) => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}>Monitor Chat</button>
//                     </div>
//                     <button style={btnOutline} onClick={() => navigate("/admin/projects")}>Unfreeze</button>
//                     <button style={btnWarn}
//                      onClick={(e) => { e.stopPropagation(); unfreeze(p.id); }}>
//                     View Project
//                   </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Right — chat preview */}
//           <div>
//             {selected ? (
//               <div className="sticky top-6">
//                 <div className="mb-3 flex items-center justify-between">
//                   <p className="text-sm font-semibold text-gray-700">Chat Preview — {selected.title}</p>
//                   <button style={btnNavy}
//                     onClick={() => navigate(`/admin/projectstream/${selected.id}`)}
//                    >
//                   Open Full Monitor →
//                   </button>
//                 </div>
//                 <div className="h-[480px] flex flex-col">
//                   <ChatView
//                     project={selected}
//                     onFreeze={() => { }}
//                     onUnfreeze={() => unfreeze(selected.id)}
//                     showSend={false}
//                   />
//                 </div>
//                 <div className="mt-3 flex gap-2">
//                   <button style={btnOutline}
                  
//                     >
//                                 Unfreeze This Chat     </button>

//                  <button style={btnNavy}
//                   onClick={() => navigate(`/admin/projectstream/${selected.id}`)}
//                    >
//                    Full Monitor View →
//                   </button>
//                 </div>
//               </div>
//             ) : (
//               <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-64 flex flex-col items-center justify-center text-center p-6">
//                 <span className="text-3xl mb-3">💬</span>
//                 <p className="text-sm font-semibold text-gray-500">Select a frozen chat</p>
//                 <p className="text-xs text-gray-400 mt-1">Click any chat on the left to preview</p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}

//       {/* All active chats reference */}
//       <div className="mt-8">
//         <h3 className="text-sm font-semibold text-gray-600 mb-3">All Active Chats ({mockProjects.filter(p => !p.chatFrozen).length})</h3>
//         <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
//           <div className="divide-y divide-gray-50">
//             {mockProjects.filter(p => !p.chatFrozen).map(p => (
//               <div key={p.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
//                 <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
//                 <Avatar name={p.title} size="sm" />
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
//                   <p className="text-xs text-gray-400 truncate">{p.lastMessage?.sender}: {p.lastMessage?.text}</p>
//                 </div>
//                 <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${healthStyle[p.health]}`}>{p.health}</span>
//                 <span className="text-xs text-gray-400 shrink-0">{p.lastMessage?.time}</span>
//                <button style={btnNavy}  onClick={() => navigate(`/admin/projectstream/${p.id}`)}>Monitor Chat</button>
    
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }




















import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, SectionCard
} from "./AdminComponents";

const RESPONSIVE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Poppins', sans-serif; }
  input, select, textarea { outline: none; font-family: 'Poppins', sans-serif; }

  /* ── Stats row ── */
  .ps-stats-row { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 24px; }
  .ps-stats-row > * { flex: 1 1 130px; min-width: 0; }

  /* ── Header row ── */
  .ps-header-row {
    display: flex; align-items: flex-start;
    justify-content: space-between; margin-bottom: 24px;
    flex-wrap: wrap; gap: 12px;
  }
  .ps-header-actions { display: flex; gap: 8px; flex-wrap: wrap; }

  /* ── Filter bar ── */
  .ps-filter-bar {
    display: flex; gap: 10px; align-items: center;
    flex-wrap: wrap; margin-bottom: 20px;
    background: white; border: 1px solid #d4edbb;
    border-radius: 12px; padding: 12px 16px;
    box-shadow: 0 2px 8px rgba(110,192,48,0.05);
  }

  /* ── Card action buttons ── */
  .ps-card-actions { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }

  /* ── Card meta stats ── */
  .ps-card-meta { display: flex; align-items: center; gap: 20px; margin-bottom: 14px; }
  .ps-card-stats { display: flex; align-items: center; gap: 20px; flex-shrink: 0; }

  /* ── Stream monitor layout ── */
  .ps-monitor-grid {
    display: grid;
    grid-template-columns: 1fr 260px;
    gap: 20px;
    flex: 1;
    min-height: 0;
  }

  /* ── Frozen chats grid ── */
  .ps-frozen-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Grid stats (frozen) ── */
  .ps-frozen-stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; margin-bottom: 24px; }

  /* ─────────────────────────────────
     TABLET  ≤1024px
  ───────────────────────────────── */
  @media (max-width: 1024px) {
    .ps-monitor-grid { grid-template-columns: 1fr 220px; }
  }

  /* ─────────────────────────────────
     MOBILE  ≤768px
  ───────────────────────────────── */
  @media (max-width: 768px) {
    .ps-monitor-grid { grid-template-columns: 1fr; }
    .ps-monitor-sidebar { display: none; }
    .ps-frozen-grid { grid-template-columns: 1fr; }
    .ps-frozen-stats { grid-template-columns: repeat(2, 1fr); }
    .ps-card-stats { display: none; }
  }

  /* ─────────────────────────────────
     SMALL PHONE  ≤480px
  ───────────────────────────────── */
  @media (max-width: 480px) {
    .ps-padding { padding: 16px 14px 48px !important; }
    .ps-stats-row > * { flex: 1 1 100%; }
    .ps-frozen-stats { grid-template-columns: 1fr 1fr; }
    .ps-card-actions > button:nth-child(n+4) { display: none; }
  }
`;

const mockProjects = [
  { id: "PRJ-001", title: "Food Delivery App", client: { name: "ByteEats Co.", id: "CL-004" }, talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" }, status: "In Progress", health: "On Track", budget: 480000, escrow: 240000, deadline: "Jun 1, 2026", startDate: "Jan 10, 2026", riskLevel: "Low", aiFlag: false, progress: 55, scopeChanges: 1, clientSilenceDays: 0, talentSilenceDays: 0, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null, aiRiskReason: null, participants: 5, lastMessage: { sender: "Raj Kumar", text: "Yes Priya, share them in Channel 1.", time: "5m ago" }, messages: [ { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "Please ensure all deliverables are uploaded before the deadline.", time: "Mar 14 · 04:30 PM", type: "Normal", msgType: "Normal" }, { id: "M2", sender: "Priya S.", role: "team", color: "yellow", text: "UI screens for milestone 3 are ready for review.", time: "Mar 14 · 05:00 PM", type: "Normal", msgType: "Normal" }, { id: "M3", sender: "Raj Kumar", role: "agency", color: "blue", text: "Yes Priya, share them in Channel 1 with the client.", time: "Mar 14 · 05:15 PM", type: "Normal", msgType: "Normal" } ] },
  { id: "PRJ-002", title: "Patient Appointment App", client: { name: "HealthFirst Clinic", id: "CL-001" }, talent: { name: "Arjun Dev", id: "FL-002", type: "Freelancer" }, status: "In Progress", health: "At Risk", budget: 320000, escrow: 160000, deadline: "Apr 25, 2026", startDate: "Feb 3, 2026", riskLevel: "Medium", aiFlag: true, progress: 35, scopeChanges: 3, clientSilenceDays: 8, talentSilenceDays: 0, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null, aiRiskReason: "Client unresponsive for 8 days. Scope changed 3 times. Deadline breach risk: Medium.", participants: 3, lastMessage: { sender: "Weblance Admin", text: "⚠ Client has been unresponsive for 8 days.", time: "4h ago" }, messages: [ { id: "M1", sender: "Arjun Dev", role: "talent", color: "blue", text: "Milestone 2 is 60% done. Waiting for client feedback.", time: "Mar 8 · 10:00 AM", type: "Update", msgType: "Update" }, { id: "M2", sender: "Weblance Admin", role: "admin", color: "red", text: "⚠ Client has been unresponsive for 8 days.", time: "Mar 10 · 09:00 AM", type: "Warning", msgType: "Warning" } ] },
  { id: "PRJ-003", title: "E-Commerce Platform Revamp", client: { name: "ShopEasy Retail", id: "CL-002" }, talent: { name: "Rahul Sharma", id: "FL-001", type: "Freelancer" }, status: "In Progress", health: "Delayed", budget: 185000, escrow: 92500, deadline: "Apr 10, 2026", startDate: "Jan 20, 2026", riskLevel: "High", aiFlag: true, progress: 28, scopeChanges: 5, clientSilenceDays: 5, talentSilenceDays: 2, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null, aiRiskReason: "Milestone 1 was 13 days late. 5 scope changes without approval. Dispute risk: HIGH.", participants: 3, lastMessage: { sender: "Weblance Admin", text: "⚠ High risk project flagged.", time: "2d ago" }, messages: [ { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "⚠ This project has been flagged as high risk.", time: "Mar 10 · 08:00 AM", type: "Warning", msgType: "Warning" }, { id: "M2", sender: "Rahul Sharma", role: "talent", color: "blue", text: "I've completed 80% of the backend.", time: "Mar 12 · 02:00 PM", type: "Update", msgType: "Update" } ] },
  { id: "PRJ-006", title: "Mobile Banking App", client: { name: "Vikram Singh", id: "CL-002" }, talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" }, status: "Disputed", health: "Disputed", budget: 280000, escrow: 140000, deadline: "Apr 5, 2026", startDate: "Nov 15, 2025", riskLevel: "High", aiFlag: true, progress: 50, scopeChanges: 2, clientSilenceDays: 0, talentSilenceDays: 0, chatFrozen: true, frozenReason: "Active dispute on Milestone 3 — DSP-002", frozenBy: "Weblance Admin", frozenAt: "Mar 8, 2026 · 06:00 PM", aiRiskReason: "Dispute raised. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault.", participants: 5, lastMessage: { sender: "Weblance Admin", text: "🔒 Chat frozen pending dispute resolution.", time: "7d ago" }, messages: [ { id: "M1", sender: "Weblance Admin", role: "admin", color: "red", text: "🔒 Chat frozen pending dispute resolution.", time: "Mar 8 · 06:00 PM", type: "Warning", msgType: "Warning" }, { id: "M2", sender: "System", role: "system", color: "gray", text: "Escrow ₹1,40,000 frozen due to dispute DSP-002.", time: "Mar 8 · 06:01 PM", type: "System", msgType: "System" } ] },
  { id: "PRJ-005", title: "Brand Identity Design", client: { name: "Meera Joshi", id: "CL-003" }, talent: { name: "Neha Gupta", id: "FL-005", type: "Freelancer" }, status: "Pending", health: "Pending", budget: 45000, escrow: 0, deadline: "Apr 20, 2026", startDate: "Mar 14, 2026", riskLevel: "Low", aiFlag: false, progress: 0, scopeChanges: 0, clientSilenceDays: 0, talentSilenceDays: 0, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null, aiRiskReason: null, participants: 3, lastMessage: { sender: "System", text: "Waiting for client to fund escrow.", time: "1d ago" }, messages: [ { id: "M1", sender: "System", role: "system", color: "gray", text: "Project created. Waiting for client to fund escrow.", time: "Mar 14 · 12:00 PM", type: "System", msgType: "System" } ] },
];

const healthStyle = {
  "On Track": "bg-green-50 text-green-700 border border-green-200",
  "At Risk":  "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "Delayed":  "bg-orange-50 text-orange-700 border border-orange-200",
  "Disputed": "bg-red-50 text-red-700 border border-red-200",
  "Completed":"bg-gray-50 text-gray-600 border border-gray-200",
  "Pending":  "bg-blue-50 text-blue-700 border border-blue-200",
};

const msgColorMap = {
  red:  "bg-red-50 border-l-4 border-red-400",
  blue: "bg-blue-50 border-l-4 border-blue-400",
  yellow:"bg-yellow-50 border-l-4 border-yellow-400",
  green:"bg-green-50 border-l-4 border-green-400",
  gray: "bg-gray-50 border-l-4 border-gray-300",
};

const roleBadge = {
  admin:  "bg-red-100 text-red-700",
  agency: "bg-blue-100 text-blue-700",
  talent: "bg-blue-100 text-blue-700",
  team:   "bg-yellow-100 text-yellow-700",
  client: "bg-green-100 text-green-700",
  system: "bg-gray-100 text-gray-500",
};

const roleLabel = {
  admin:"Weblance Admin", agency:"Agency Admin", talent:"Freelancer",
  team:"Team Member", client:"Client", system:"System",
};

const FONT = "'Poppins', sans-serif";
const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navy:"#1A2B5E", navyDeep:"#0F1A3B", gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  gradGreen:"linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  text:"#1C1C1C", sub:"#4b5563", muted:"#9ca3af", border:"#e5e7eb", bg:"#f9fafb", white:"#ffffff",
  amber:"#f59e0b", amberBg:"#fffbeb", amberBorder:"#fde68a", amberText:"#92400e",
  red:"#ef4444", redBg:"#fef2f2", redBorder:"#fecaca", redText:"#dc2626",
  orange:"#f97316", orangeBg:"#fff7ed", orangeBorder:"#fed7aa", orangeText:"#c2410c",
};

const HEALTH_STYLE = {
  "At Risk":  { bg: G.amberBg,  text: G.amberText,  dot: G.amber  },
  "Delayed":  { bg: G.orangeBg, text: G.orangeText, dot: G.orange },
  "Disputed": { bg: G.redBg,    text: G.redText,    dot: G.red    },
};

function StatCard({ label, value, sub, color = "gray" }) {
  const map = {
    gray:  { bg: G.bg,       border: G.border,       val: G.text,      lbl: G.muted      },
    green: { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, lbl: G.greenDeep  },
    orange:{ bg: G.orangeBg, border: G.orangeBorder, val: G.orangeText,lbl: G.orangeText },
    red:   { bg: G.redBg,    border: G.redBorder,    val: G.redText,   lbl: G.redText    },
  };
  const c = map[color] || map.gray;
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", flex: 1, minWidth: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.lbl, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

const btnNavy    = { display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"8px 16px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)", whiteSpace:"nowrap" };
const btnGreen   = { display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, fontFamily:FONT, background:G.gradGreen, color:G.white, border:"none", borderRadius:100, padding:"8px 16px", cursor:"pointer", whiteSpace:"nowrap" };
const btnOutline = { display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, fontFamily:FONT, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"8px 16px", cursor:"pointer", whiteSpace:"nowrap" };
const btnWarn    = { ...btnOutline, background:G.amberBg, color:G.amberText, border:`1px solid ${G.amberBorder}` };
const btnDanger  = { ...btnOutline, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}` };

function ChatView({ project, onFreeze, onUnfreeze, showSend = true }) {
  const [adminMsg, setAdminMsg] = useState("");
  const [msgType, setMsgType] = useState("Normal");
  const [messages, setMessages] = useState(project.messages);

  const sendMsg = () => {
    if (!adminMsg.trim()) return;
    setMessages(prev => [...prev, { id:`NEW-${Date.now()}`, sender:"Weblance Admin", role:"admin", color:"red", text:adminMsg, time:"Just now", type:msgType, msgType }]);
    setAdminMsg("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between shrink-0 flex-wrap gap-2">
        <div>
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-bold text-gray-800">{project.title}</p>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[project.health]}`}>{project.health}</span>
            {project.chatFrozen && <span className="text-[11px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">🔒 Frozen</span>}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{project.id} · {project.participants} participants</p>
        </div>
        <div>
          {project.chatFrozen
            ? <ActionBtn label="Unfreeze Chat" onClick={onUnfreeze} />
            : <ActionBtn label="Freeze Chat" variant="warning" onClick={onFreeze} />}
        </div>
      </div>

      {project.chatFrozen && (
        <div className="px-5 py-2.5 bg-red-50 border-b border-red-100 flex items-center gap-2">
          <span className="text-red-500 text-sm">🔒</span>
          <div>
            <p className="text-xs font-semibold text-red-700">Chat frozen — only admin messages visible</p>
            <p className="text-[10px] text-red-500">{project.frozenReason} · {project.frozenBy} · {project.frozenAt}</p>
          </div>
        </div>
      )}

      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map(msg => (
          <div key={msg.id} className={`p-3 rounded-xl ${msgColorMap[msg.color] || msgColorMap.gray}`}>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Avatar name={msg.sender} size="sm" />
              <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[msg.role] || roleBadge.system}`}>{roleLabel[msg.role] || msg.role}</span>
              {msg.msgType && msg.msgType !== "Normal" && <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full">{msg.msgType}</span>}
              <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
          </div>
        ))}
      </div>

      {showSend && (
        <div className="px-5 pb-5 pt-4 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold text-gray-500">Send Official Admin Message</p>
            <select value={msgType} onChange={e => setMsgType(e.target.value)}
              className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600">
              {["Normal","Warning","Decision","Notice","Freeze"].map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="flex gap-2">
            <input value={adminMsg} onChange={e => setAdminMsg(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
              placeholder="Type official message... (Enter to send)"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
            <ActionBtn label="Send" variant="primary" size="md" onClick={sendMsg} />
          </div>
        </div>
      )}
    </div>
  );
}

// ── PAGE 1: AdminAtRiskProjects ───────────────────────────────────────────────
export function AdminAtRiskProjects() {
  const navigate  = useNavigate();
  const [search, setSearch]       = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [selected, setSelected]   = useState(null);

  const atRisk = mockProjects.filter(p => ["At Risk","Delayed","Disputed"].includes(p.health));
  const filtered = atRisk.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.title.toLowerCase().includes(q) || p.client.name.toLowerCase().includes(q) || p.talent.name.toLowerCase().includes(q)) &&
      (!riskFilter || p.riskLevel === riskFilter)
    );
  });

  return (
    <div className="ps-padding" style={{ padding:"28px 28px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{RESPONSIVE_CSS}</style>

      <div className="ps-header-row">
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>At-Risk Projects</h1>
          <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Projects flagged by AI — delayed, at risk, or in active dispute</p>
        </div>
        <div className="ps-header-actions">
          <button style={btnOutline} onClick={() => navigate("/admin/projects")}>← All Projects</button>
          <button style={btnNavy} onClick={() => navigate("/admin/projectstream/freeze")}>Frozen Chats</button>
        </div>
      </div>

      <div className="ps-stats-row">
        <StatCard label="Total At Risk"   value={atRisk.length} color="orange" />
        <StatCard label="Delayed"         value={atRisk.filter(p=>p.health==="Delayed").length} color="orange" />
        <StatCard label="Disputed"        value={atRisk.filter(p=>p.health==="Disputed").length} color="red" />
        <StatCard label="Escrow at Stake" value={`₹${(atRisk.reduce((s,p)=>s+p.escrow,0)/100000).toFixed(1)}L`} color="red" />
      </div>

      {/* Filter bar */}
      <div className="ps-filter-bar">
        <div style={{ position:"relative", flex:"1 1 200px", maxWidth:320 }}>
          <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:G.muted }}>🔍</span>
          <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search project, client, talent…"
            style={{ width:"100%", fontSize:12, fontWeight:500, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"8px 12px 8px 32px", background:G.white, color:G.text, boxSizing:"border-box" }}
          />
        </div>
        <select value={riskFilter} onChange={e => setRiskFilter(e.target.value)}
          style={{ fontSize:12, fontWeight:600, border:`1.5px solid ${riskFilter?G.green:G.greenBorder}`, borderRadius:100, padding:"8px 14px", background:riskFilter?G.greenBg:G.white, color:riskFilter?G.greenDeep:G.sub, cursor:"pointer" }}>
          <option value="">All Risk</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>
        <span style={{ fontSize:11, color:G.muted, fontWeight:600, marginLeft:"auto" }}>{filtered.length} results</span>
      </div>

      {/* Cards */}
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {filtered.map(p => {
          const hs       = HEALTH_STYLE[p.health] || HEALTH_STYLE["At Risk"];
          const isSelected = selected?.id === p.id;
          const isHigh   = p.riskLevel === "High";
          return (
            <div key={p.id} onClick={() => setSelected(isSelected ? null : p)}
              style={{
                background:G.white,
                border:`1.5px solid ${isSelected ? G.green : p.health==="Disputed" ? G.redBorder : p.health==="Delayed" ? G.orangeBorder : G.amberBorder}`,
                borderRadius:16, cursor:"pointer", transition:"all 0.15s",
                boxShadow: isSelected ? "0 4px 24px rgba(110,192,48,0.14)" : "0 2px 8px rgba(0,0,0,0.05)",
                overflow:"hidden",
              }}>
              <div style={{ height:3, background: p.health==="Disputed" ? `linear-gradient(90deg,${G.red},${G.redBorder})` : p.health==="Delayed" ? `linear-gradient(90deg,${G.orange},${G.orangeBorder})` : `linear-gradient(90deg,${G.amber},${G.amberBorder})` }} />
              <div style={{ padding:"18px 20px" }}>

                {/* Top row */}
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:12, flexWrap:"wrap" }}>
                  <div style={{ flex:1, minWidth:0 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:4 }}>
                      <h3 style={{ fontSize:15, fontWeight:700, color:G.text, margin:0 }}>{p.title}</h3>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, background:hs.bg, color:hs.text, padding:"3px 10px", borderRadius:99 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:hs.dot }} />{p.health}
                      </span>
                      {p.aiFlag && <span style={{ fontSize:9, fontWeight:700, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, padding:"1px 7px", borderRadius:99 }}>AI⚑</span>}
                    </div>
                    <p style={{ fontSize:12, color:G.muted, margin:0 }}>{p.id} · {p.client.name} → {p.talent.name} ({p.talent.type})</p>
                  </div>
                  <span style={{ fontSize:11, fontWeight:700, padding:"5px 12px", borderRadius:10, flexShrink:0, background:isHigh?G.redBg:G.amberBg, color:isHigh?G.redText:G.amberText, border:`1px solid ${isHigh?G.redBorder:G.amberBorder}` }}>
                    {p.riskLevel} Risk
                  </span>
                </div>

                {/* AI Risk reason */}
                {p.aiRiskReason && (
                  <div style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 14px", marginBottom:14, background:G.orangeBg, border:`1px solid ${G.orangeBorder}`, borderRadius:10 }}>
                    <span style={{ fontSize:16, color:G.orange, flexShrink:0, marginTop:1 }}>◎</span>
                    <p style={{ fontSize:12, color:G.orangeText, lineHeight:1.6, margin:0 }}>{p.aiRiskReason}</p>
                  </div>
                )}

                {/* Progress + meta */}
                <div className="ps-card-meta">
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                      <span style={{ fontSize:11, color:G.muted }}>Progress</span>
                      <span style={{ fontSize:11, fontWeight:700, color:G.sub }}>{p.progress}%</span>
                    </div>
                    <div style={{ height:8, background:G.border, borderRadius:99, overflow:"hidden" }}>
                      <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background:isHigh?G.orange:G.amber, transition:"width 0.3s" }} />
                    </div>
                  </div>
                  <div className="ps-card-stats">
                    {[
                      { label:"Escrow",   value:p.escrow>0?`₹${(p.escrow/1000).toFixed(0)}k`:"—", color:G.orangeText },
                      { label:"Deadline", value:p.deadline, color:G.text },
                      { label:"Scope Δ",  value:p.scopeChanges, color:p.scopeChanges>2?G.redText:G.sub },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign:"center" }}>
                        <p style={{ fontSize:13, fontWeight:800, color:s.color, margin:0 }}>{s.value}</p>
                        <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Silence indicators */}
                {(p.clientSilenceDays>0 || p.talentSilenceDays>0 || p.chatFrozen) && (
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginBottom:14 }}>
                    {p.clientSilenceDays>0 && <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, background:p.clientSilenceDays>5?G.redBg:G.amberBg, color:p.clientSilenceDays>5?G.redText:G.amberText, border:`1px solid ${p.clientSilenceDays>5?G.redBorder:G.amberBorder}` }}>⏱ Client silent {p.clientSilenceDays}d</span>}
                    {p.talentSilenceDays>0 && <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, background:p.talentSilenceDays>2?G.redBg:G.amberBg, color:p.talentSilenceDays>2?G.redText:G.amberText, border:`1px solid ${p.talentSilenceDays>2?G.redBorder:G.amberBorder}` }}>⏱ Talent silent {p.talentSilenceDays}d</span>}
                    {p.chatFrozen && <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"4px 10px", borderRadius:99, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}` }}>🔒 Chat frozen</span>}
                  </div>
                )}

                {/* Actions */}
                <div className="ps-card-actions">
                  <button style={btnNavy} onClick={e => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}>Monitor Chat</button>
                  <button style={btnOutline} onClick={e => { e.stopPropagation(); navigate(`/admin/projects/${p.id}`); }}>View Project</button>
                  <button style={btnWarn} onClick={e => e.stopPropagation()}>Send Warning</button>
                  {p.health==="Disputed" && <button style={btnDanger} onClick={e => { e.stopPropagation(); navigate("/admin/disputes"); }}>View Dispute</button>}
                  <button style={p.chatFrozen?btnOutline:btnWarn} onClick={e => e.stopPropagation()}>{p.chatFrozen?"Unfreeze Chat":"Freeze Chat"}</button>
                </div>
              </div>
            </div>
          );
        })}

        {filtered.length===0 && (
          <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"56px 20px", textAlign:"center" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>✓</div>
            <p style={{ fontSize:14, fontWeight:700, color:G.text }}>No at-risk projects</p>
            <p style={{ fontSize:12, color:G.muted }}>All projects are on track</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AdminAtRiskProjects;

// ── PAGE 2: AdminProjectStreamMonitor ────────────────────────────────────────
export function AdminProjectStreamMonitor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [filterType, setFilterType] = useState("All");
  const [showFreezeModal, setShowFreezeModal] = useState(false);
  const [freezeReason, setFreezeReason] = useState("");

  const p = projects.find(x => x.id === id);

  if (!p) return (
    <div className="p-6 text-center py-24 space-y-3">
      <p className="text-gray-400">ProjectStream not found</p>
      <ActionBtn label="← Back" onClick={() => navigate("/admin/projects")} size="md" />
    </div>
  );

  const handleFreeze   = () => setShowFreezeModal(true);
  const confirmFreeze  = () => {
    setProjects(prev => prev.map(x => x.id===id ? { ...x, chatFrozen:true, frozenReason:freezeReason||"Frozen by admin", frozenBy:"Weblance Admin", frozenAt:"Mar 14, 2026 · Now" } : x));
    setShowFreezeModal(false); setFreezeReason("");
  };
  const handleUnfreeze = () => setProjects(prev => prev.map(x => x.id===id ? { ...x, chatFrozen:false, frozenReason:null, frozenBy:null, frozenAt:null } : x));

  const currentProject = projects.find(x => x.id === id);
  const filteredMessages = currentProject.messages.filter(m => {
    if (filterType==="All")      return true;
    if (filterType==="Warnings") return m.msgType==="Warning";
    if (filterType==="Admin")    return m.role==="admin";
    if (filterType==="Decisions")return m.msgType==="Decision";
    return true;
  });

  return (
    <div className="p-6 flex flex-col" style={{ minHeight:"calc(100vh - 0px)" }}>
      <style>{RESPONSIVE_CSS}</style>

      <div className="flex items-center justify-between mb-4 shrink-0 flex-wrap gap-2">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">← Back</button>
        <div className="ps-header-actions">
          <ActionBtn label="View Project" onClick={() => navigate(`/admin/projects/${p.id}`)} />
          <ActionBtn label="View Client"  onClick={() => navigate(`/admin/clients/${p.client.id}`)} />
          <ActionBtn label="At-Risk List" onClick={() => navigate("/admin/projects/at-risk")} />
        </div>
      </div>

      <div className="ps-monitor-grid" style={{ flex:1, minHeight:0 }}>
        {/* Main Chat */}
        <div style={{ display:"flex", flexDirection:"column", minHeight:0 }}>
          <div className="flex gap-1 border-b border-gray-100 mb-3 shrink-0">
            {["All","Admin","Warnings","Decisions"].map(f => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterType===f?"text-green-600 border-b-2 border-green-500 -mb-px":"text-gray-500 hover:text-gray-700"}`}>
                {f}
              </button>
            ))}
          </div>
          <div style={{ flex:1, minHeight:0 }}>
            <ChatView project={{ ...currentProject, messages:filteredMessages }} onFreeze={handleFreeze} onUnfreeze={handleUnfreeze} />
          </div>
        </div>

        {/* Sidebar */}
        <div className="ps-monitor-sidebar space-y-4 overflow-y-auto">
          <SectionCard title="Project Info">
            <div className="space-y-2">
              {[
                { label:"Project",  value:p.title },
                { label:"Health",   value:<span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span> },
                { label:"Progress", value:`${p.progress}%` },
                { label:"Deadline", value:p.deadline },
                { label:"Budget",   value:`₹${(p.budget/1000).toFixed(0)}k` },
                { label:"Escrow",   value:p.escrow>0?`₹${(p.escrow/1000).toFixed(0)}k`:"Released" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Participants">
            <div className="space-y-2.5">
              {[
                { name:"Weblance Admin", role:"Platform",    color:"bg-red-500"   },
                { name:p.client.name,    role:"Client",      color:"bg-green-500" },
                { name:p.talent.name,    role:p.talent.type, color:"bg-blue-500"  },
              ].map(pt => (
                <div key={pt.name} className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${pt.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{pt.name}</p>
                    <p className="text-[10px] text-gray-400">{pt.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Chat Actions">
            <div className="space-y-2">
              {[
                { label:currentProject.chatFrozen?"Unfreeze Chat":"Freeze Chat", variant:currentProject.chatFrozen?"default":"warning", action:currentProject.chatFrozen?handleUnfreeze:handleFreeze },
                { label:"Export Chat History", variant:"default", action:()=>{} },
                { label:"Flag Conversation",   variant:"danger",  action:()=>{} },
                { label:"View Project Detail", variant:"default", action:()=>navigate(`/admin/projects/${p.id}`) },
                { label:"Escalate to Dispute", variant:"danger",  action:()=>navigate("/admin/disputes") },
              ].map(a => (
                <button key={a.label} onClick={a.action}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${a.variant==="warning"?"border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100":a.variant==="danger"?"border-red-200 text-red-600 bg-red-50 hover:bg-red-100":"border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                  {a.label}
                </button>
              ))}
            </div>
          </SectionCard>

          {p.aiRiskReason && (
            <div className="bg-orange-50 border border-orange-100 rounded-xl p-4">
              <p className="text-xs font-bold text-orange-800 mb-1.5">◎ AI Risk Alert</p>
              <p className="text-xs text-orange-700 leading-relaxed">{p.aiRiskReason}</p>
            </div>
          )}
        </div>
      </div>

      {/* Freeze Modal */}
      {showFreezeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowFreezeModal(false)}>
          <div className="absolute inset-0 bg-black/30" />
          <div className="relative bg-white rounded-2xl shadow-2xl p-6 w-full max-w-md mx-4" onClick={e => e.stopPropagation()}>
            <h3 className="text-base font-bold text-gray-900 mb-1">Freeze Chat</h3>
            <p className="text-sm text-gray-500 mb-4">Only admin messages will be allowed once frozen.</p>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">Reason for freeze *</label>
              <div className="space-y-2 mb-3">
                {["Active dispute — awaiting resolution","Admin review in progress","Legal hold","Suspicious activity detected","Other"].map(r => (
                  <label key={r} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${freezeReason===r?"border-red-300 bg-red-50 text-red-700":"border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    <input type="radio" name="freezeReason" value={r} checked={freezeReason===r} onChange={() => setFreezeReason(r)} className="accent-red-500" />{r}
                  </label>
                ))}
              </div>
            </div>
            <div className="flex gap-2">
              <ActionBtn label="Cancel" onClick={() => setShowFreezeModal(false)} />
              <button onClick={confirmFreeze} disabled={!freezeReason}
                className="flex-1 py-2 text-sm font-bold bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed">
                Confirm Freeze
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ── PAGE 3: AdminFrozenChats ──────────────────────────────────────────────────
export function AdminFrozenChats() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [selected, setSelected] = useState(null);

  const frozenProjects = projects.filter(p => p.chatFrozen);

  const unfreeze = (id) => {
    setProjects(prev => prev.map(p => p.id===id ? { ...p, chatFrozen:false, frozenReason:null, frozenBy:null, frozenAt:null } : p));
    if (selected?.id===id) setSelected(null);
  };

  return (
    <div className="p-6">
      <style>{RESPONSIVE_CSS}</style>

      <PageHeader
        title="Frozen Chats"
        subtitle="All ProjectStream conversations currently frozen by admin"
        actions={
          <div className="ps-header-actions">
            <button style={btnOutline} onClick={() => navigate("/admin/projects")}>← All Projects</button>
            <button style={btnNavy} onClick={() => navigate("/admin/projects/at-risk")}>At-Risk Projects</button>
          </div>
        }
      />

      <div className="ps-frozen-stats">
        <StatCard label="Frozen Chats"    value={frozenProjects.length} sub="Currently frozen" color="red" />
        <StatCard label="Disputed"        value={frozenProjects.filter(p=>p.health==="Disputed").length} color="orange" />
        <StatCard label="Escrow at Stake" value={`₹${(frozenProjects.reduce((s,p)=>s+p.escrow,0)/1000).toFixed(0)}k`} color="red" />
        <StatCard label="Total Chats"     value={mockProjects.length} sub="Platform-wide" color="gray" />
      </div>

      {frozenProjects.length===0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-2xl">🔓</span>
          </div>
          <p className="text-gray-600 font-semibold text-base">No chats are frozen</p>
          <p className="text-gray-400 text-sm mt-1">All ProjectStream conversations are currently active</p>
        </div>
      ) : (
        <div className="ps-frozen-grid">
          {/* Left — frozen list */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">{frozenProjects.length} frozen conversation{frozenProjects.length!==1?"s":""}</h3>
            {frozenProjects.map(p => (
              <div key={p.id} onClick={() => setSelected(selected?.id===p.id?null:p)}
                className={`bg-white rounded-xl border shadow-md cursor-pointer transition-all hover:shadow-lg ${selected?.id===p.id?"border-red-300 ring-1 ring-red-200":"border-gray-100"}`}>
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="text-base">🔒</span>
                        <p className="text-sm font-bold text-gray-800">{p.title}</p>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span>
                      </div>
                      <p className="text-xs text-gray-500">{p.id} · {p.client.name} → {p.talent.name}</p>
                    </div>
                  </div>
                  <div className="bg-red-50 rounded-lg p-2.5 border border-red-100 mb-3">
                    <p className="text-xs font-semibold text-red-700 mb-0.5">Freeze Reason</p>
                    <p className="text-xs text-red-600">{p.frozenReason}</p>
                    <p className="text-[10px] text-red-400 mt-1">Frozen by {p.frozenBy} · {p.frozenAt}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <button style={btnNavy} onClick={e => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}>Monitor Chat</button>
                    <button style={btnOutline} onClick={e => { e.stopPropagation(); navigate("/admin/projects"); }}>View Project</button>
                    <button style={btnWarn} onClick={e => { e.stopPropagation(); unfreeze(p.id); }}>Unfreeze</button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — chat preview */}
          <div>
            {selected ? (
              <div className="sticky top-6">
                <div className="mb-3 flex items-center justify-between flex-wrap gap-2">
                  <p className="text-sm font-semibold text-gray-700">Chat Preview — {selected.title}</p>
                  <button style={btnNavy} onClick={() => navigate(`/admin/projectstream/${selected.id}`)}>Open Full Monitor →</button>
                </div>
                <div style={{ height:480, display:"flex", flexDirection:"column" }}>
                  <ChatView project={selected} onFreeze={()=>{}} onUnfreeze={() => unfreeze(selected.id)} showSend={false} />
                </div>
                <div className="mt-3 flex gap-2 flex-wrap">
                  <button style={btnOutline} onClick={() => unfreeze(selected.id)}>Unfreeze This Chat</button>
                  <button style={btnNavy} onClick={() => navigate(`/admin/projectstream/${selected.id}`)}>Full Monitor View →</button>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-xl border border-gray-100 shadow-sm h-64 flex flex-col items-center justify-center text-center p-6">
                <span className="text-3xl mb-3">💬</span>
                <p className="text-sm font-semibold text-gray-500">Select a frozen chat</p>
                <p className="text-xs text-gray-400 mt-1">Click any chat on the left to preview</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* All active chats */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">All Active Chats ({mockProjects.filter(p => !p.chatFrozen).length})</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {mockProjects.filter(p => !p.chatFrozen).map(p => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors flex-wrap">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <Avatar name={p.title} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 truncate">{p.lastMessage?.sender}: {p.lastMessage?.text}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${healthStyle[p.health]}`}>{p.health}</span>
                <span className="text-xs text-gray-400 shrink-0 hidden sm:block">{p.lastMessage?.time}</span>
                <button style={btnNavy} onClick={() => navigate(`/admin/projectstream/${p.id}`)}>Monitor</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}