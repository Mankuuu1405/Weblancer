// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { mockUsers } from "./mockData";
// import {
//   StatusBadge, TrustScore, RiskFlag, Avatar,
//   ActionBtn, SectionCard, InfoRow
// } from "./AdminComponents";

// export default function AdminUserDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [note, setNote] = useState("");
//   const [notes, setNotes] = useState([
//     { text: "Account flagged for duplicate signup attempt. Monitoring.", admin: "Super Admin", date: "Mar 10, 2026" },
//   ]);
//   const [activeTab, setActiveTab] = useState("overview");

//   const user = mockUsers.find((u) => u.id === id);

//   if (!user) return (
//     <div className="p-6 flex flex-col items-center justify-center h-96">
//       <span className="text-4xl mb-4">◎</span>
//       <p className="text-gray-500 text-sm">User not found</p>
//       <ActionBtn label="← Back" onClick={() => navigate("/admin/users")} variant="default" size="md" />
//     </div>
//   );

//   const addNote = () => {
//     if (!note.trim()) return;
//     setNotes([{ text: note, admin: "Super Admin", date: "Mar 14, 2026" }, ...notes]);
//     setNote("");
//   };

//   const tabs = ["overview", "activity", "financials", "admin"];

//   const warningHistory = [
//     { type: "Duplicate signup attempt", date: "Mar 8, 2026", action: "Flagged", admin: "AI System" },
//     { type: "Off-platform contact request", date: "Feb 14, 2026", action: "Warning sent", admin: "Platform Admin" },
//   ];

//   return (
//     <div className="p-6">
//       {/* Back + Header */}
//       <div className="mb-5">
//         <button
//           onClick={() => navigate("/admin/users")}
//           className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4 transition-colors"
//         >
//           ← All Users
//         </button>

//         <div className="flex items-start justify-between">
//           <div className="flex items-center gap-4">
//             <Avatar name={user.name} size="lg" />
//             <div>
//               <div className="flex items-center gap-2.5 flex-wrap">
//                 <h1 className="text-xl font-bold text-gray-900">{user.name}</h1>
//                 <StatusBadge status={user.status} />
//                 {user.aiFlag && (
//                   <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
//                     ⚑ AI Flagged
//                   </span>
//                 )}
//               </div>
//               <p className="text-sm text-gray-500 mt-0.5">{user.email} · {user.id} · {user.role}</p>
//               <div className="flex items-center gap-4 mt-2">
//                 <TrustScore score={user.trustScore} />
//                 <RiskFlag level={user.riskLevel} />
//                 <StatusBadge status={user.verification} />
//               </div>
//             </div>
//           </div>

//           {/* Admin Actions */}
//           <div className="flex items-center gap-2 flex-wrap justify-end">
//             <ActionBtn label="Send Warning" variant="warning" size="md" />
//             <ActionBtn label="Restrict Account" size="md" />
//             {user.status === "Active" ? (
//               <ActionBtn label="Suspend" variant="danger" size="md" />
//             ) : (
//               <ActionBtn label="Reinstate" variant="primary" size="md" />
//             )}
//             <ActionBtn label="⋯ More" size="md" />
//           </div>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 border-b border-gray-100 mb-6">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
//               activeTab === tab
//                 ? "text-green-600 border-b-2 border-green-500 -mb-px"
//                 : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Overview Tab */}
//       {activeTab === "overview" && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <div className="lg:col-span-2 space-y-5">
//             <SectionCard title="Identity & Account">
//               <InfoRow label="Full Name" value={user.name} />
//               <InfoRow label="Email" value={user.email} />
//               <InfoRow label="Role" value={user.role} />
//               <InfoRow label="Country" value="India" />
//               <InfoRow label="Auth Method" value="Google OAuth" />
//               <InfoRow label="Joined" value={user.joinDate} />
//               <InfoRow label="Last Active" value={user.lastActive} />
//             </SectionCard>

//             <SectionCard title="Warning History">
//               {warningHistory.length > 0 ? (
//                 <div className="space-y-3">
//                   {warningHistory.map((w, i) => (
//                     <div key={i} className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg border border-yellow-100">
//                       <span className="text-yellow-500 mt-0.5">⚠</span>
//                       <div className="flex-1">
//                         <p className="text-sm font-medium text-gray-800">{w.type}</p>
//                         <p className="text-xs text-gray-500 mt-0.5">{w.action} · {w.date} · by {w.admin}</p>
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-400 text-center py-4">No warnings on record</p>
//               )}
//             </SectionCard>
//           </div>

//           {/* Right Column */}
//           <div className="space-y-5">
//             <SectionCard title="Account Health">
//               <div className="space-y-3">
//                 <div>
//                   <div className="flex justify-between text-xs text-gray-500 mb-1">
//                     <span>Trust Score</span>
//                     <span className="font-semibold text-gray-700">{user.trustScore}/100</span>
//                   </div>
//                   <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
//                     <div
//                       className={`h-full rounded-full ${user.trustScore >= 75 ? "bg-green-500" : user.trustScore >= 50 ? "bg-yellow-400" : "bg-red-400"}`}
//                       style={{ width: `${user.trustScore}%` }}
//                     />
//                   </div>
//                 </div>
//                 <div className="pt-2 space-y-2">
//                   {[
//                     { label: "Risk Level", val: <RiskFlag level={user.riskLevel} /> },
//                     { label: "KYC Status", val: <StatusBadge status={user.verification} /> },
//                     { label: "Account Status", val: <StatusBadge status={user.status} /> },
//                     { label: "Total Projects", val: <span className="text-sm font-semibold text-gray-800">{user.totalProjects}</span> },
//                   ].map((item) => (
//                     <div key={item.label} className="flex items-center justify-between">
//                       <span className="text-xs text-gray-400">{item.label}</span>
//                       {item.val}
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </SectionCard>

//             <SectionCard title="Admin Notes (Internal)">
//               <div className="space-y-3 mb-3">
//                 {notes.map((n, i) => (
//                   <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
//                     <p className="text-xs text-gray-700">{n.text}</p>
//                     <p className="text-[10px] text-gray-400 mt-1">{n.admin} · {n.date}</p>
//                   </div>
//                 ))}
//               </div>
//               <textarea
//                 value={note}
//                 onChange={(e) => setNote(e.target.value)}
//                 placeholder="Add internal note (not visible to user)..."
//                 className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
//                 rows={3}
//               />
//               <ActionBtn label="Save Note" variant="primary" size="sm" onClick={addNote} />
//             </SectionCard>
//           </div>
//         </div>
//       )}

//       {/* Activity Tab */}
//       {activeTab === "activity" && (
//         <div className="space-y-5">
//           <SectionCard title="Activity Summary">
//             <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//               {[
//                 { label: "Total Projects", value: user.totalProjects, color: "text-gray-800" },
//                 { label: "Total Earned", value: user.totalEarned ? `₹${(user.totalEarned / 1000).toFixed(0)}k` : "—", color: "text-green-600" },
//                 { label: "Total Spent", value: user.totalSpent ? `₹${(user.totalSpent / 1000).toFixed(0)}k` : "—", color: "text-blue-600" },
//                 { label: "Disputes", value: "2", color: "text-orange-500" },
//               ].map((s) => (
//                 <div key={s.label} className="p-3 bg-gray-50 rounded-lg">
//                   <p className="text-xs text-gray-400 mb-1">{s.label}</p>
//                   <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           <SectionCard title="Recent Activity Log">
//             <div className="space-y-2">
//               {[
//                 { action: "Submitted delivery for Milestone 2", time: "2h ago", type: "delivery" },
//                 { action: "Opened ProjectStream chat", time: "3h ago", type: "chat" },
//                 { action: "Login via Google OAuth", time: "1d ago", type: "auth" },
//                 { action: "Accepted project invite from ByteEats Co.", time: "3d ago", type: "project" },
//                 { action: "Profile updated — skills added", time: "5d ago", type: "profile" },
//               ].map((log, i) => (
//                 <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
//                   <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
//                   <p className="text-sm text-gray-700 flex-1">{log.action}</p>
//                   <span className="text-xs text-gray-400 shrink-0">{log.time}</span>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {/* Financials Tab */}
//       {activeTab === "financials" && (
//         <div className="space-y-5">
//           <SectionCard title="Financial Overview">
//             <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
//               {[
//                 { label: "Total Earned", value: user.totalEarned ? `₹${user.totalEarned.toLocaleString()}` : "—", color: "text-green-600" },
//                 { label: "Total Spent", value: user.totalSpent ? `₹${user.totalSpent.toLocaleString()}` : "—", color: "text-blue-600" },
//                 { label: "Escrow Locked", value: "₹45,000", color: "text-orange-500" },
//                 { label: "Pending Payouts", value: "₹12,000", color: "text-purple-600" },
//                 { label: "Platform Commission", value: "₹8,880", color: "text-gray-600" },
//                 { label: "Refunds Issued", value: "₹0", color: "text-gray-600" },
//               ].map((s) => (
//                 <div key={s.label} className="p-3 bg-gray-50 rounded-lg">
//                   <p className="text-xs text-gray-400 mb-1">{s.label}</p>
//                   <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           <SectionCard title="Transaction History">
//             <p className="text-sm text-gray-400 text-center py-8">No transaction data available in demo</p>
//           </SectionCard>
//         </div>
//       )}

//       {/* Admin Tab */}
//       {activeTab === "admin" && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SectionCard title="Admin Actions">
//             <div className="space-y-2.5">
//               {[
//                 { label: "Send Warning Message", variant: "warning", desc: "Send an official warning visible to user" },
//                 { label: "Force Re-verification (KYC)", variant: "default", desc: "Require user to re-submit identity documents" },
//                 { label: "Override AI Trust Score", variant: "default", desc: "Manually adjust trust score with reason" },
//                 { label: "Restrict Account", variant: "default", desc: "Limit posting, hiring, or messaging abilities" },
//                 { label: "Suspend Account", variant: "danger", desc: "Freeze all activity and payments" },
//                 { label: "Permanent Ban", variant: "danger", desc: "Permanently remove from platform" },
//               ].map((action) => (
//                 <div key={action.label} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
//                   <div>
//                     <p className="text-sm font-medium text-gray-800">{action.label}</p>
//                     <p className="text-xs text-gray-400 mt-0.5">{action.desc}</p>
//                   </div>
//                   <ActionBtn label="Execute" variant={action.variant} />
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           <SectionCard title="Audit Log (Admin Actions)">
//             <div className="space-y-2">
//               {[
//                 { action: "AI flagged for suspicious activity", admin: "AI System", date: "Mar 10, 2026", type: "flag" },
//                 { action: "Warning message sent", admin: "Platform Admin", date: "Feb 14, 2026", type: "warning" },
//                 { action: "KYC verified", admin: "Finance Admin", date: "Jan 20, 2026", type: "kyc" },
//               ].map((log, i) => (
//                 <div key={i} className="flex items-start gap-3 p-2.5 bg-gray-50 rounded-lg border border-gray-100">
//                   <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.type === "flag" ? "bg-red-400" : log.type === "warning" ? "bg-yellow-400" : "bg-green-400"}`} />
//                   <div className="flex-1">
//                     <p className="text-xs font-medium text-gray-700">{log.action}</p>
//                     <p className="text-[10px] text-gray-400 mt-0.5">by {log.admin} · {log.date}</p>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>
//         </div>
//       )}
//     </div>
//   );
// }







import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockUsers } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, Avatar,
  ActionBtn, SectionCard, InfoRow
} from "./AdminComponents";

export default function AdminUserDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [note,       setNote]      = useState("");
  const [notes,      setNotes]     = useState([
    { text:"Account flagged for duplicate signup attempt. Monitoring.", admin:"Super Admin", date:"Mar 10, 2026" },
  ]);
  const [activeTab,  setActiveTab] = useState("overview");

  const user = mockUsers.find(u => u.id === id);

  if (!user) return (
    <div className="p-6 flex flex-col items-center justify-center h-96 gap-4">
      <span className="text-4xl">◎</span>
      <p className="text-gray-500 text-sm">User not found</p>
      <ActionBtn label="← Back" onClick={()=>navigate("/admin/users")} variant="default" size="md" />
    </div>
  );

  const addNote = () => {
    if (!note.trim()) return;
    setNotes([{ text:note, admin:"Super Admin", date:"Mar 14, 2026" }, ...notes]);
    setNote("");
  };

  const tabs = ["overview","activity","financials","admin"];

  const warningHistory = [
    { type:"Duplicate signup attempt",      date:"Mar 8, 2026",  action:"Flagged",      admin:"AI System"       },
    { type:"Off-platform contact request",  date:"Feb 14, 2026", action:"Warning sent", admin:"Platform Admin"  },
  ];

  return (
    <div className="p-3 sm:p-5 lg:p-6 pb-16">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        input,select,textarea { outline:none; font-family:'Poppins',sans-serif; }

        .ud-tabs { display:flex; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .ud-tabs::-webkit-scrollbar { display:none; }
        .ud-tabs button { flex-shrink:0; }

        .ud-overview { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:1024px) { .ud-overview { display:grid; grid-template-columns:1fr 320px; gap:20px; } }

        .ud-admin-grid { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:768px) { .ud-admin-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; } }

        .ud-actions-wrap { display:flex; align-items:center; gap:6px; flex-wrap:wrap; }
      `}</style>

      {/* Back */}
      <button onClick={()=>navigate("/admin/users")}
        className="flex items-center gap-1.5 text-xs sm:text-sm text-gray-500 hover:text-gray-800 mb-3 sm:mb-4 transition-colors">
        ← All Users
      </button>

      {/* Profile header */}
      <div className="mb-4 sm:mb-5 bg-white border border-green-100 rounded-2xl p-4 sm:p-5 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
          {/* Identity */}
          <div className="flex items-start gap-3 sm:gap-4">
            <Avatar name={user.name} size="lg" />
            <div>
              <div className="flex items-center gap-2 flex-wrap mb-1">
                <h1 className="text-lg sm:text-xl font-bold text-gray-900">{user.name}</h1>
                <StatusBadge status={user.status} />
                {user.aiFlag && (
                  <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-semibold">⚑ AI Flagged</span>
                )}
              </div>
              <p className="text-xs sm:text-sm text-gray-500">{user.email} · {user.id} · {user.role}</p>
              <div className="flex items-center gap-3 mt-2 flex-wrap">
                <TrustScore score={user.trustScore} />
                <RiskFlag level={user.riskLevel} />
                <StatusBadge status={user.verification} />
              </div>
            </div>
          </div>

          {/* Admin Actions */}
          <div className="ud-actions-wrap">
            <ActionBtn label="Send Warning" variant="warning" size="md" />
            <ActionBtn label="Restrict"     size="md" />
            {user.status==="Active"
              ? <ActionBtn label="Suspend"  variant="danger"  size="md" />
              : <ActionBtn label="Reinstate" variant="primary" size="md" />
            }
            <ActionBtn label="⋯ More" size="md" />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="ud-tabs border-b border-gray-200 mb-4 sm:mb-5 -mx-3 sm:mx-0 px-3 sm:px-0">
        {tabs.map(tab => (
          <button key={tab} onClick={()=>setActiveTab(tab)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium capitalize transition-colors ${
              activeTab===tab ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab==="overview" && (
        <div className="ud-overview">
          <div className="space-y-4">
            <SectionCard title="Identity & Account">
              <InfoRow label="Full Name"   value={user.name}        />
              <InfoRow label="Email"       value={user.email}       />
              <InfoRow label="Role"        value={user.role}        />
              <InfoRow label="Country"     value="India"            />
              <InfoRow label="Auth Method" value="Google OAuth"     />
              <InfoRow label="Joined"      value={user.joinDate}    />
              <InfoRow label="Last Active" value={user.lastActive}  />
            </SectionCard>

            <SectionCard title="Warning History">
              {warningHistory.length>0 ? (
                <div className="space-y-2.5">
                  {warningHistory.map((w,i) => (
                    <div key={i} className="flex items-start gap-3 p-2.5 sm:p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                      <span className="text-yellow-500 mt-0.5 shrink-0">⚠</span>
                      <div className="flex-1">
                        <p className="text-xs sm:text-sm font-medium text-gray-800">{w.type}</p>
                        <p className="text-[10px] sm:text-xs text-gray-500 mt-0.5">{w.action} · {w.date} · by {w.admin}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs sm:text-sm text-gray-400 text-center py-4">No warnings on record</p>
              )}
            </SectionCard>
          </div>

          {/* Right column */}
          <div className="space-y-4">
            <SectionCard title="Account Health">
              <div className="space-y-3">
                <div>
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Trust Score</span>
                    <span className="font-semibold text-gray-700">{user.trustScore}/100</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${user.trustScore>=75?"bg-green-500":user.trustScore>=50?"bg-yellow-400":"bg-red-400"}`}
                      style={{ width:`${user.trustScore}%` }} />
                  </div>
                </div>
                <div className="pt-2 space-y-2.5">
                  {[
                    { label:"Risk Level",      val:<RiskFlag   level={user.riskLevel}   /> },
                    { label:"KYC Status",       val:<StatusBadge status={user.verification} /> },
                    { label:"Account Status",   val:<StatusBadge status={user.status}       /> },
                    { label:"Total Projects",   val:<span className="text-xs sm:text-sm font-semibold text-gray-800">{user.totalProjects}</span> },
                  ].map(item => (
                    <div key={item.label} className="flex items-center justify-between">
                      <span className="text-[10px] sm:text-xs text-gray-400">{item.label}</span>
                      {item.val}
                    </div>
                  ))}
                </div>
              </div>
            </SectionCard>

            <SectionCard title="Admin Notes (Internal)">
              <div className="space-y-2.5 mb-3">
                {notes.map((n,i) => (
                  <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-700">{n.text}</p>
                    <p className="text-[10px] text-gray-400 mt-1">{n.admin} · {n.date}</p>
                  </div>
                ))}
              </div>
              <textarea value={note} onChange={e=>setNote(e.target.value)}
                placeholder="Add internal note (not visible to user)..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400 mb-2"
                rows={3} />
              <ActionBtn label="Save Note" variant="primary" size="sm" onClick={addNote} />
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── ACTIVITY ── */}
      {activeTab==="activity" && (
        <div className="space-y-4">
          <SectionCard title="Activity Summary">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { label:"Total Projects", value:user.totalProjects,                                                          color:"text-gray-800"   },
                { label:"Total Earned",   value:user.totalEarned?`₹${(user.totalEarned/1000).toFixed(0)}k`:"—",             color:"text-green-600"  },
                { label:"Total Spent",    value:user.totalSpent?`₹${(user.totalSpent/1000).toFixed(0)}k`:"—",               color:"text-blue-600"   },
                { label:"Disputes",       value:"2",                                                                          color:"text-orange-500" },
              ].map(s => (
                <div key={s.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-lg sm:text-xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Activity Log">
            <div className="space-y-2">
              {[
                { action:"Submitted delivery for Milestone 2",          time:"2h ago"  },
                { action:"Opened ProjectStream chat",                    time:"3h ago"  },
                { action:"Login via Google OAuth",                       time:"1d ago"  },
                { action:"Accepted project invite from ByteEats Co.",    time:"3d ago"  },
                { action:"Profile updated — skills added",               time:"5d ago"  },
              ].map((log,i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
                  <p className="text-xs sm:text-sm text-gray-700 flex-1">{log.action}</p>
                  <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">{log.time}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── FINANCIALS ── */}
      {activeTab==="financials" && (
        <div className="space-y-4">
          <SectionCard title="Financial Overview">
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {[
                { label:"Total Earned",         value:user.totalEarned?`₹${user.totalEarned.toLocaleString()}`:"—", color:"text-green-600"  },
                { label:"Total Spent",          value:user.totalSpent?`₹${user.totalSpent.toLocaleString()}`:"—",   color:"text-blue-600"   },
                { label:"Escrow Locked",        value:"₹45,000",                                                     color:"text-orange-500" },
                { label:"Pending Payouts",      value:"₹12,000",                                                     color:"text-purple-600" },
                { label:"Platform Commission",  value:"₹8,880",                                                      color:"text-gray-600"   },
                { label:"Refunds Issued",       value:"₹0",                                                          color:"text-gray-600"   },
              ].map(s => (
                <div key={s.label} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <p className="text-[10px] sm:text-xs text-gray-400 mb-1">{s.label}</p>
                  <p className={`text-lg sm:text-xl font-bold ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Transaction History">
            <p className="text-xs sm:text-sm text-gray-400 text-center py-8">No transaction data available in demo</p>
          </SectionCard>
        </div>
      )}

      {/* ── ADMIN ── */}
      {activeTab==="admin" && (
        <div className="ud-admin-grid">
          <SectionCard title="Admin Actions">
            <div className="space-y-2">
              {[
                { label:"Send Warning Message",         variant:"warning", desc:"Send an official warning visible to user"           },
                { label:"Force Re-verification (KYC)",  variant:"default", desc:"Require user to re-submit identity documents"        },
                { label:"Override AI Trust Score",      variant:"default", desc:"Manually adjust trust score with reason"            },
                { label:"Restrict Account",             variant:"default", desc:"Limit posting, hiring, or messaging abilities"       },
                { label:"Suspend Account",              variant:"danger",  desc:"Freeze all activity and payments"                   },
                { label:"Permanent Ban",                variant:"danger",  desc:"Permanently remove from platform"                   },
              ].map(action => (
                <div key={action.label} className="flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-gray-100 hover:bg-gray-50 transition-colors gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs sm:text-sm font-medium text-gray-800">{action.label}</p>
                    <p className="text-[10px] sm:text-xs text-gray-400 mt-0.5 hidden sm:block">{action.desc}</p>
                  </div>
                  <ActionBtn label="Execute" variant={action.variant} />
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Audit Log (Admin Actions)">
            <div className="space-y-2">
              {[
                { action:"AI flagged for suspicious activity", admin:"AI System",       date:"Mar 10, 2026", type:"flag"    },
                { action:"Warning message sent",               admin:"Platform Admin",  date:"Feb 14, 2026", type:"warning" },
                { action:"KYC verified",                       admin:"Finance Admin",   date:"Jan 20, 2026", type:"kyc"     },
              ].map((log,i) => (
                <div key={i} className="flex items-start gap-2.5 sm:gap-3 p-2.5 bg-gray-50 rounded-xl border border-gray-100">
                  <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${log.type==="flag"?"bg-red-400":log.type==="warning"?"bg-yellow-400":"bg-green-400"}`} />
                  <div className="flex-1">
                    <p className="text-xs font-medium text-gray-700">{log.action}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">by {log.admin} · {log.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}