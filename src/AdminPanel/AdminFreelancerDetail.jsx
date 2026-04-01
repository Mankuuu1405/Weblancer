// import { useParams, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { mockFreelancers } from "./mockData";
// import {
//   StatusBadge, TrustScore, RiskFlag, Avatar,
//   ActionBtn, SectionCard, InfoRow
// } from "./AdminComponents";

// export default function AdminFreelancerDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("profile");
//   const [note, setNote] = useState("");
//   const [notes, setNotes] = useState([]);

//   const f = mockFreelancers.find((x) => x.id === id);

//   if (!f) return (
//     <div className="p-6 text-center py-24">
//       <p className="text-gray-400">Freelancer not found</p>
//       <ActionBtn label="← Back" onClick={() => navigate("/admin/freelancers")} />
//     </div>
//   );

//   const badgeStyle = {
//     "Elite++": "bg-purple-50 text-purple-700 border border-purple-200",
//     "Pro+": "bg-blue-50 text-blue-700 border border-blue-200",
//     "Verified": "bg-green-50 text-green-700 border border-green-200",
//   };

//   const tabs = ["profile", "performance", "projects", "financials", "behavior", "admin"];

//   return (
//     <div className="p-6">
//       <button onClick={() => navigate("/admin/freelancers")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4">
//         ← All Freelancers
//       </button>

//       {/* Header */}
//       <div className="flex items-start justify-between mb-6">
//         <div className="flex items-center gap-4">
//           <Avatar name={f.name} size="lg" />
//           <div>
//             <div className="flex items-center gap-2.5 flex-wrap">
//               <h1 className="text-xl font-bold text-gray-900">{f.name}</h1>
//               <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle[f.badge]}`}>{f.badge}</span>
//               <StatusBadge status="Active" />
//             </div>
//             <p className="text-sm text-gray-500 mt-0.5">{f.email} · {f.id} · {f.primarySkill}</p>
//             <div className="flex items-center gap-4 mt-2">
//               <TrustScore score={f.trustScore} />
//               <RiskFlag level={f.riskFlag} />
//               <span className="text-xs text-gray-500">Joined {f.joinDate}</span>
//             </div>
//           </div>
//         </div>
//         <div className="flex items-center gap-2">
//           <ActionBtn label="Boost Visibility" variant="primary" size="md" />
//           <ActionBtn label="Send Warning" variant="warning" size="md" />
//           <ActionBtn label="Suspend" variant="danger" size="md" />
//         </div>
//       </div>

//       {/* Quick Stats Bar */}
//       <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
//         {[
//           { label: "Skill Score", value: `${f.skillScore}/100`, color: "text-green-600" },
//           { label: "Active Projects", value: f.activeProjects, color: "text-blue-600" },
//           { label: "Completed", value: f.completedProjects, color: "text-gray-800" },
//           { label: "Dispute Rate", value: f.disputeRate, color: parseInt(f.disputeRate) > 10 ? "text-red-500" : "text-green-600" },
//           { label: "On-Time Delivery", value: f.onTimeDelivery, color: parseInt(f.onTimeDelivery) >= 90 ? "text-green-600" : "text-yellow-600" },
//         ].map((s) => (
//           <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
//             <p className="text-xs text-gray-400 mb-1">{s.label}</p>
//             <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
//           </div>
//         ))}
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 border-b border-gray-100 mb-6 overflow-x-auto">
//         {tabs.map((tab) => (
//           <button
//             key={tab}
//             onClick={() => setActiveTab(tab)}
//             className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap transition-colors ${
//               activeTab === tab ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"
//             }`}
//           >
//             {tab}
//           </button>
//         ))}
//       </div>

//       {/* Profile Tab */}
//       {activeTab === "profile" && (
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
//           <div className="lg:col-span-2 space-y-5">
//             <SectionCard title="Professional Info">
//               <InfoRow label="Full Name" value={f.name} />
//               <InfoRow label="Email" value={f.email} />
//               <InfoRow label="Country" value={f.country} />
//               <InfoRow label="Timezone" value={f.timezone} />
//               <InfoRow label="Availability" value={f.availability} />
//               <InfoRow label="Joined" value={f.joinDate} />
//             </SectionCard>

//             <SectionCard title="Bio">
//               <p className="text-sm text-gray-700 leading-relaxed">{f.bio}</p>
//             </SectionCard>

//             <SectionCard title="Skills">
//               <div className="flex flex-wrap gap-2">
//                 {f.skills.map((s) => (
//                   <span key={s} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">
//                     {s}
//                   </span>
//                 ))}
//               </div>
//             </SectionCard>

//             <SectionCard title="Portfolio Links">
//               {f.portfolio.length > 0 ? (
//                 <div className="space-y-2">
//                   {f.portfolio.map((p) => (
//                     <div key={p} className="flex items-center gap-2 p-2 bg-gray-50 rounded-lg">
//                       <span className="text-gray-400 text-sm">🔗</span>
//                       <span className="text-sm text-blue-600 hover:underline cursor-pointer">{p}</span>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-sm text-gray-400 text-center py-4">No portfolio links submitted</p>
//               )}
//             </SectionCard>
//           </div>

//           <div className="space-y-5">
//             <SectionCard title="Skill Confidence Score">
//               <div className="space-y-3">
//                 {f.skills.map((skill, i) => {
//                   const score = Math.max(50, f.skillScore - i * 8);
//                   return (
//                     <div key={skill}>
//                       <div className="flex justify-between text-xs text-gray-600 mb-1">
//                         <span>{skill}</span>
//                         <span className="font-semibold">{score}</span>
//                       </div>
//                       <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
//                         <div className="h-full bg-green-500 rounded-full" style={{ width: `${score}%` }} />
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             </SectionCard>

//             <SectionCard title="Visibility Control">
//               <div className="space-y-2">
//                 {["Boosted", "Normal", "Reduced", "Hidden"].map((v) => (
//                   <button
//                     key={v}
//                     className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors border ${
//                       f.visibility === v ? "border-green-400 bg-green-50 text-green-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"
//                     }`}
//                   >
//                     {v}
//                     {f.visibility === v && <span className="float-right text-green-500">✓</span>}
//                   </button>
//                 ))}
//               </div>
//             </SectionCard>
//           </div>
//         </div>
//       )}

//       {/* Performance Tab */}
//       {activeTab === "performance" && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SectionCard title="Performance Metrics">
//             {[
//               { label: "Response Time Average", value: f.responseTime },
//               { label: "On-Time Delivery", value: f.onTimeDelivery },
//               { label: "Dispute Rate", value: f.disputeRate },
//               { label: "Repeat Hire Rate", value: f.repeatHireRate },
//               { label: "Client Sentiment Score", value: `${f.clientSentiment}/5.0` },
//             ].map((m) => (
//               <div key={m.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
//                 <span className="text-sm text-gray-600">{m.label}</span>
//                 <span className="text-sm font-bold text-gray-800">{m.value}</span>
//               </div>
//             ))}
//           </SectionCard>

//           <SectionCard title="AI Behavior Analysis">
//             <div className="space-y-3">
//               {[
//                 { label: "Communication Tone", status: "Professional", color: "text-green-600" },
//                 { label: "Activity Consistency", status: f.riskFlag === "High" ? "Irregular" : "Consistent", color: f.riskFlag === "High" ? "text-red-500" : "text-green-600" },
//                 { label: "Risk Trajectory", status: f.riskFlag === "High" ? "Deteriorating" : "Stable", color: f.riskFlag === "High" ? "text-red-500" : "text-green-600" },
//                 { label: "Delivery Velocity", status: "Normal", color: "text-gray-700" },
//               ].map((a) => (
//                 <div key={a.label} className="flex items-center justify-between p-2.5 bg-gray-50 rounded-lg">
//                   <span className="text-xs text-gray-500">{a.label}</span>
//                   <span className={`text-xs font-semibold ${a.color}`}>{a.status}</span>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {/* Projects Tab */}
//       {activeTab === "projects" && (
//         <SectionCard title="Project History">
//           <div className="space-y-2">
//             {[
//               { name: "Food Delivery App", client: "ByteEats Co.", status: "In Progress", amount: "₹2,40,000", duration: "12 weeks" },
//               { name: "E-Commerce Dashboard", client: "ShopEasy Retail", status: "Completed", amount: "₹1,85,000", duration: "8 weeks" },
//               { name: "Healthcare Portal", client: "HealthFirst Clinic", status: "Completed", amount: "₹3,20,000", duration: "16 weeks" },
//             ].map((p, i) => (
//               <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
//                 <div>
//                   <p className="text-sm font-semibold text-gray-800">{p.name}</p>
//                   <p className="text-xs text-gray-500">{p.client} · {p.duration}</p>
//                 </div>
//                 <div className="text-right">
//                   <StatusBadge status={p.status} />
//                   <p className="text-sm font-bold text-gray-700 mt-1">{p.amount}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </SectionCard>
//       )}

//       {/* Financials Tab */}
//       {activeTab === "financials" && (
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//           {[
//             { label: "Total Earned", value: `₹${f.totalEarned.toLocaleString()}`, color: "text-green-600" },
//             { label: "Escrow Pending", value: "₹45,000", color: "text-orange-500" },
//             { label: "Withdrawn", value: "₹1,20,000", color: "text-blue-600" },
//           ].map((s) => (
//             <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
//               <p className="text-xs text-gray-400 mb-1">{s.label}</p>
//               <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Behavior Tab */}
//       {activeTab === "behavior" && (
//         <SectionCard title="AI Behavior Report">
//           <div className="space-y-3">
//             <div className="p-4 bg-green-50 rounded-xl border border-green-100">
//               <p className="text-sm font-semibold text-green-800 mb-1">Overall Assessment</p>
//               <p className="text-sm text-green-700">
//                 {f.riskFlag === "High"
//                   ? "This freelancer shows consistent underperformance. High dispute rate and low delivery scores suggest misrepresentation of skills or capacity overcommitment."
//                   : "This freelancer demonstrates consistent professional behavior. Communication is positive and delivery performance is strong."}
//               </p>
//             </div>
//             <InfoRow label="Comm. Tone" value="Professional" />
//             <InfoRow label="Scope Compliance" value="High" />
//             <InfoRow label="Client Relations" value={f.clientSentiment >= 4 ? "Excellent" : f.clientSentiment >= 3 ? "Average" : "Poor"} />
//             <InfoRow label="Platform Policy" value="No violations detected" />
//           </div>
//         </SectionCard>
//       )}

//       {/* Admin Tab */}
//       {activeTab === "admin" && (
//         <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
//           <SectionCard title="Admin Control Panel">
//             <div className="space-y-2">
//               {[
//                 { label: "Override Trust Score", variant: "default" },
//                 { label: "Force Skill Re-verification", variant: "default" },
//                 { label: "Boost / Reduce Visibility", variant: "default" },
//                 { label: "Send Private Warning", variant: "warning" },
//                 { label: "Suspend Account", variant: "danger" },
//               ].map((a) => (
//                 <button key={a.label} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${a.variant === "danger" ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" : a.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
//                   {a.label}
//                 </button>
//               ))}
//             </div>
//           </SectionCard>

//           <SectionCard title="Admin Notes (Internal)">
//             <div className="space-y-2 mb-3">
//               {notes.length === 0 && <p className="text-xs text-gray-400 text-center py-3">No notes yet</p>}
//               {notes.map((n, i) => (
//                 <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
//                   <p className="text-xs text-gray-700">{n.text}</p>
//                   <p className="text-[10px] text-gray-400 mt-0.5">Super Admin · {n.date}</p>
//                 </div>
//               ))}
//             </div>
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Add internal note (not visible to freelancer)..."
//               className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
//               rows={3}
//             />
//             <ActionBtn label="Save Note" variant="primary" onClick={() => { if (note.trim()) { setNotes([{ text: note, date: "Mar 14, 2026" }, ...notes]); setNote(""); } }} />
//           </SectionCard>
//         </div>
//       )}
//     </div>
//   );
// }






import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockFreelancers } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, Avatar,
  ActionBtn, SectionCard, InfoRow
} from "./AdminComponents";

export default function AdminFreelancerDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const f = mockFreelancers.find((x) => x.id === id);

  if (!f) return (
    <div style={{ padding: 24, textAlign: "center", paddingTop: 96 }}>
      <p style={{ color: "#9ca3af" }}>Freelancer not found</p>
      <ActionBtn label="← Back" onClick={() => navigate("/admin/freelancers")} />
    </div>
  );

  const badgeStyle = {
    "Elite++": "bg-purple-50 text-purple-700 border border-purple-200",
    "Pro+": "bg-blue-50 text-blue-700 border border-blue-200",
    "Verified": "bg-green-50 text-green-700 border border-green-200",
  };

  const tabs = ["profile", "performance", "projects", "financials", "behavior", "admin"];

  return (
    <div className="wl-page-padding" style={{ padding: "24px 24px 64px" }}>

      <style>{`
        .wl-page-padding { padding: 24px 24px 64px; }

        /* Header row */
        .wl-fl-detail-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          margin-bottom: 24px;
          gap: 16px;
        }
        .wl-fl-detail-header-left {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }
        .wl-fl-detail-header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
          flex-shrink: 0;
          flex-wrap: wrap;
        }

        /* Stats bar */
        .wl-fl-quick-stats {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 12px;
          margin-bottom: 24px;
        }

        /* Tabs */
        .wl-fl-tabs {
          display: flex;
          gap: 4px;
          border-bottom: 1px solid #e5e7eb;
          margin-bottom: 24px;
          overflow-x: auto;
          -webkit-overflow-scrolling: touch;
        }

        /* Content grids */
        .wl-fl-profile-grid {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 20px;
        }
        .wl-fl-profile-main { grid-column: span 2; }
        .wl-fl-profile-aside { grid-column: span 1; }

        .wl-fl-perf-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        .wl-fl-admin-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }

        /* Tablet */
        @media (max-width: 1024px) {
          .wl-fl-quick-stats {
            grid-template-columns: repeat(3, 1fr);
          }
          .wl-fl-profile-grid {
            grid-template-columns: 1fr 1fr;
          }
          .wl-fl-profile-main { grid-column: span 1; }
          .wl-fl-profile-aside { grid-column: span 1; }
        }

        /* Mobile */
        @media (max-width: 640px) {
          .wl-page-padding { padding: 16px 16px 64px !important; }

          .wl-fl-detail-header {
            flex-direction: column;
            align-items: flex-start;
          }
          .wl-fl-detail-header-left {
            flex-wrap: wrap;
            align-items: flex-start;
          }
          .wl-fl-detail-header-actions {
            width: 100%;
            justify-content: flex-start;
          }
          .wl-fl-detail-header-actions button {
            flex: 1 1 auto;
            text-align: center;
            justify-content: center;
          }

          .wl-fl-quick-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .wl-fl-profile-grid {
            grid-template-columns: 1fr;
          }
          .wl-fl-profile-main { grid-column: span 1; }
          .wl-fl-profile-aside { grid-column: span 1; }

          .wl-fl-perf-grid {
            grid-template-columns: 1fr;
          }
          .wl-fl-admin-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>

      {/* Back button */}
      <button
        onClick={() => navigate("/admin/freelancers")}
        style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: "#6b7280", background: "none", border: "none", cursor: "pointer", marginBottom: 16, padding: 0, fontFamily: "'Poppins', sans-serif" }}
      >
        ← All Freelancers
      </button>

      {/* Header */}
      <div className="wl-fl-detail-header">
        <div className="wl-fl-detail-header-left">
          <Avatar name={f.name} size="lg" />
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
              <h1 style={{ fontSize: 20, fontWeight: 800, color: "#1C1C1C", margin: 0 }}>{f.name}</h1>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle[f.badge]}`}>{f.badge}</span>
              <StatusBadge status="Active" />
            </div>
            <p style={{ fontSize: 12, color: "#9ca3af", margin: "0 0 8px", overflow: "hidden", textOverflow: "ellipsis" }}>{f.email} · {f.id} · {f.primarySkill}</p>
            <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
              <TrustScore score={f.trustScore} />
              <RiskFlag level={f.riskFlag} />
              <span style={{ fontSize: 11, color: "#6b7280" }}>Joined {f.joinDate}</span>
            </div>
          </div>
        </div>
        <div className="wl-fl-detail-header-actions">
          <ActionBtn label="Boost Visibility" variant="primary" size="md" />
          <ActionBtn label="Send Warning" variant="warning" size="md" />
          <ActionBtn label="Suspend" variant="danger" size="md" />
        </div>
      </div>

      {/* Quick Stats Bar */}
      <div className="wl-fl-quick-stats">
        {[
          { label: "Skill Score", value: `${f.skillScore}/100`, color: "text-green-600" },
          { label: "Active Projects", value: f.activeProjects, color: "text-blue-600" },
          { label: "Completed", value: f.completedProjects, color: "text-gray-800" },
          { label: "Dispute Rate", value: f.disputeRate, color: parseInt(f.disputeRate) > 10 ? "text-red-500" : "text-green-600" },
          { label: "On-Time Delivery", value: f.onTimeDelivery, color: parseInt(f.onTimeDelivery) >= 90 ? "text-green-600" : "text-yellow-600" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center" style={{ minWidth: 0 }}>
            <p className="text-xs text-gray-400 mb-1" style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis", fontSize: 10 }}>{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`} style={{ fontSize: 16 }}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="wl-fl-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            style={{
              padding: "8px 14px",
              fontSize: 12,
              fontWeight: activeTab === tab ? 700 : 500,
              color: activeTab === tab ? "#6EC030" : "#6b7280",
              borderBottom: activeTab === tab ? "2px solid #6EC030" : "2px solid transparent",
              background: "none",
              border: "none",
              borderBottom: activeTab === tab ? "2px solid #6EC030" : "none",
              marginBottom: activeTab === tab ? "-1px" : 0,
              cursor: "pointer",
              whiteSpace: "nowrap",
              fontFamily: "'Poppins', sans-serif",
              textTransform: "capitalize",
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Profile Tab */}
      {activeTab === "profile" && (
        <div className="wl-fl-profile-grid">
          <div className="wl-fl-profile-main" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionCard title="Professional Info">
              <InfoRow label="Full Name" value={f.name} />
              <InfoRow label="Email" value={f.email} />
              <InfoRow label="Country" value={f.country} />
              <InfoRow label="Timezone" value={f.timezone} />
              <InfoRow label="Availability" value={f.availability} />
              <InfoRow label="Joined" value={f.joinDate} />
            </SectionCard>
            <SectionCard title="Bio">
              <p style={{ fontSize: 13, color: "#374151", lineHeight: 1.6, margin: 0 }}>{f.bio}</p>
            </SectionCard>
            <SectionCard title="Skills">
              <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                {f.skills.map((s) => (
                  <span key={s} style={{
                    fontSize: 11, background: "#f1fce8", color: "#2E7D1F",
                    border: "1px solid #d4edbb", padding: "4px 10px", borderRadius: 99, fontWeight: 600,
                  }}>{s}</span>
                ))}
              </div>
            </SectionCard>
            <SectionCard title="Portfolio Links">
              {f.portfolio.length > 0 ? (
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                  {f.portfolio.map((p) => (
                    <div key={p} style={{ display: "flex", alignItems: "center", gap: 8, padding: 8, background: "#f9fafb", borderRadius: 8 }}>
                      <span style={{ color: "#9ca3af", fontSize: 13 }}>🔗</span>
                      <span style={{ fontSize: 12, color: "#2563eb", cursor: "pointer" }}>{p}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ fontSize: 12, color: "#9ca3af", textAlign: "center", padding: "16px 0", margin: 0 }}>No portfolio links submitted</p>
              )}
            </SectionCard>
          </div>

          <div className="wl-fl-profile-aside" style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionCard title="Skill Confidence Score">
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                {f.skills.map((skill, i) => {
                  const score = Math.max(50, f.skillScore - i * 8);
                  return (
                    <div key={skill}>
                      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "#374151", marginBottom: 4 }}>
                        <span>{skill}</span>
                        <span style={{ fontWeight: 700 }}>{score}</span>
                      </div>
                      <div style={{ height: 6, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ height: "100%", background: "#6EC030", borderRadius: 99, width: `${score}%` }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            </SectionCard>

            <SectionCard title="Visibility Control">
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {["Boosted", "Normal", "Reduced", "Hidden"].map((v) => (
                  <button key={v} style={{
                    width: "100%", textAlign: "left", padding: "8px 12px", borderRadius: 8, fontSize: 13,
                    fontWeight: 600, cursor: "pointer",
                    border: f.visibility === v ? "1.5px solid #6EC030" : "1px solid #e5e7eb",
                    background: f.visibility === v ? "#f1fce8" : "#fff",
                    color: f.visibility === v ? "#2E7D1F" : "#374151",
                    fontFamily: "'Poppins', sans-serif",
                  }}>
                    {v}
                    {f.visibility === v && <span style={{ float: "right", color: "#6EC030" }}>✓</span>}
                  </button>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* Performance Tab */}
      {activeTab === "performance" && (
        <div className="wl-fl-perf-grid">
          <SectionCard title="Performance Metrics">
            {[
              { label: "Response Time Average", value: f.responseTime },
              { label: "On-Time Delivery", value: f.onTimeDelivery },
              { label: "Dispute Rate", value: f.disputeRate },
              { label: "Repeat Hire Rate", value: f.repeatHireRate },
              { label: "Client Sentiment Score", value: `${f.clientSentiment}/5.0` },
            ].map((m) => (
              <div key={m.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 0", borderBottom: "1px solid #f9fafb" }}>
                <span style={{ fontSize: 12, color: "#374151" }}>{m.label}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: "#1C1C1C" }}>{m.value}</span>
              </div>
            ))}
          </SectionCard>
          <SectionCard title="AI Behavior Analysis">
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Communication Tone", status: "Professional", color: "#2E7D1F" },
                { label: "Activity Consistency", status: f.riskFlag === "High" ? "Irregular" : "Consistent", color: f.riskFlag === "High" ? "#dc2626" : "#2E7D1F" },
                { label: "Risk Trajectory", status: f.riskFlag === "High" ? "Deteriorating" : "Stable", color: f.riskFlag === "High" ? "#dc2626" : "#2E7D1F" },
                { label: "Delivery Velocity", status: "Normal", color: "#374151" },
              ].map((a) => (
                <div key={a.label} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 12px", background: "#f9fafb", borderRadius: 8 }}>
                  <span style={{ fontSize: 11, color: "#6b7280" }}>{a.label}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: a.color }}>{a.status}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}

      {/* Projects Tab */}
      {activeTab === "projects" && (
        <SectionCard title="Project History">
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { name: "Food Delivery App", client: "ByteEats Co.", status: "In Progress", amount: "₹2,40,000", duration: "12 weeks" },
              { name: "E-Commerce Dashboard", client: "ShopEasy Retail", status: "Completed", amount: "₹1,85,000", duration: "8 weeks" },
              { name: "Healthcare Portal", client: "HealthFirst Clinic", status: "Completed", amount: "₹3,20,000", duration: "16 weeks" },
            ].map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: "#f9fafb", borderRadius: 10, border: "1px solid #e5e7eb", flexWrap: "wrap", gap: 8 }}>
                <div style={{ minWidth: 0 }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#1C1C1C", margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: "#6b7280", margin: 0 }}>{p.client} · {p.duration}</p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <StatusBadge status={p.status} />
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#374151", marginTop: 4 }}>{p.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* Financials Tab */}
      {activeTab === "financials" && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 16 }}>
          {[
            { label: "Total Earned", value: `₹${f.totalEarned.toLocaleString()}`, color: "#2E7D1F" },
            { label: "Escrow Pending", value: "₹45,000", color: "#f59e0b" },
            { label: "Withdrawn", value: "₹1,20,000", color: "#2563eb" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5e7eb", borderRadius: 14, padding: 16 }}>
              <p style={{ fontSize: 11, color: "#9ca3af", marginBottom: 4 }}>{s.label}</p>
              <p style={{ fontSize: 22, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {/* Behavior Tab */}
      {activeTab === "behavior" && (
        <SectionCard title="AI Behavior Report">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ padding: 16, background: "#f1fce8", borderRadius: 12, border: "1px solid #d4edbb" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: "#2E7D1F", marginBottom: 6 }}>Overall Assessment</p>
              <p style={{ fontSize: 12, color: "#2E7D1F", lineHeight: 1.6, margin: 0 }}>
                {f.riskFlag === "High"
                  ? "This freelancer shows consistent underperformance. High dispute rate and low delivery scores suggest misrepresentation of skills or capacity overcommitment."
                  : "This freelancer demonstrates consistent professional behavior. Communication is positive and delivery performance is strong."}
              </p>
            </div>
            <InfoRow label="Comm. Tone" value="Professional" />
            <InfoRow label="Scope Compliance" value="High" />
            <InfoRow label="Client Relations" value={f.clientSentiment >= 4 ? "Excellent" : f.clientSentiment >= 3 ? "Average" : "Poor"} />
            <InfoRow label="Platform Policy" value="No violations detected" />
          </div>
        </SectionCard>
      )}

      {/* Admin Tab */}
      {activeTab === "admin" && (
        <div className="wl-fl-admin-grid">
          <SectionCard title="Admin Control Panel">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Override Trust Score", variant: "default" },
                { label: "Force Skill Re-verification", variant: "default" },
                { label: "Boost / Reduce Visibility", variant: "default" },
                { label: "Send Private Warning", variant: "warning" },
                { label: "Suspend Account", variant: "danger" },
              ].map((a) => (
                <button key={a.label} style={{
                  width: "100%", textAlign: "left", padding: "10px 12px", borderRadius: 8, fontSize: 12,
                  fontWeight: 600, cursor: "pointer", fontFamily: "'Poppins', sans-serif",
                  border: a.variant === "danger" ? "1px solid #fecaca" : a.variant === "warning" ? "1px solid #fde68a" : "1px solid #e5e7eb",
                  color: a.variant === "danger" ? "#dc2626" : a.variant === "warning" ? "#92400e" : "#374151",
                  background: a.variant === "danger" ? "#fef2f2" : a.variant === "warning" ? "#fffbeb" : "#fff",
                }}>
                  {a.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Admin Notes (Internal)">
            <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
              {notes.length === 0 && <p style={{ fontSize: 11, color: "#9ca3af", textAlign: "center", padding: 12, margin: 0 }}>No notes yet</p>}
              {notes.map((n, i) => (
                <div key={i} style={{ padding: 10, background: "#f9fafb", borderRadius: 8, border: "1px solid #e5e7eb" }}>
                  <p style={{ fontSize: 11, color: "#374151", margin: 0 }}>{n.text}</p>
                  <p style={{ fontSize: 10, color: "#9ca3af", marginTop: 4, margin: 0 }}>Super Admin · {n.date}</p>
                </div>
              ))}
            </div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add internal note (not visible to freelancer)..."
              style={{
                width: "100%", fontSize: 11, border: "1px solid #e5e7eb", borderRadius: 8,
                padding: 10, outline: "none", resize: "none", boxSizing: "border-box",
                fontFamily: "'Poppins', sans-serif", marginBottom: 8,
              }}
              rows={3}
            />
            <ActionBtn label="Save Note" variant="primary" onClick={() => {
              if (note.trim()) { setNotes([{ text: note, date: "Mar 14, 2026" }, ...notes]); setNote(""); }
            }} />
          </SectionCard>
        </div>
      )}
    </div>
  );
}