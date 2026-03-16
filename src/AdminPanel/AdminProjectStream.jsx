import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, SectionCard
} from "./AdminComponents";

// ─── SHARED MOCK DATA (same projects as AdminProjects) ────────────────────────
const mockProjects = [
  {
    id: "PRJ-001", title: "Food Delivery App",
    client: { name: "ByteEats Co.", id: "CL-004" },
    talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" },
    status: "In Progress", health: "On Track",
    budget: 480000, escrow: 240000,
    deadline: "Jun 1, 2026", startDate: "Jan 10, 2026",
    riskLevel: "Low", aiFlag: false, progress: 55,
    scopeChanges: 1, clientSilenceDays: 0, talentSilenceDays: 0,
    chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    aiRiskReason: null,
    participants: 5,
    lastMessage: { sender: "Raj Kumar", text: "Yes Priya, share them in Channel 1.", time: "5m ago" },
    messages: [
      { id: "M1", sender: "Weblance Admin", role: "admin", color: "red",    text: "Please ensure all deliverables are uploaded before the deadline.", time: "Mar 14 · 04:30 PM", type: "Normal",   msgType: "Normal"   },
      { id: "M2", sender: "Priya S.",       role: "team",  color: "yellow", text: "UI screens for milestone 3 are ready for review. Should I share in the client channel?", time: "Mar 14 · 05:00 PM", type: "Normal", msgType: "Normal" },
      { id: "M3", sender: "Raj Kumar",      role: "agency",color: "blue",   text: "Yes Priya, share them in Channel 1 with the client. Good work!", time: "Mar 14 · 05:15 PM", type: "Normal", msgType: "Normal" },
    ],
  },
  {
    id: "PRJ-002", title: "Patient Appointment App",
    client: { name: "HealthFirst Clinic", id: "CL-001" },
    talent: { name: "Arjun Dev", id: "FL-002", type: "Freelancer" },
    status: "In Progress", health: "At Risk",
    budget: 320000, escrow: 160000,
    deadline: "Apr 25, 2026", startDate: "Feb 3, 2026",
    riskLevel: "Medium", aiFlag: true, progress: 35,
    scopeChanges: 3, clientSilenceDays: 8, talentSilenceDays: 0,
    chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    aiRiskReason: "Client unresponsive for 8 days. Scope changed 3 times. Deadline breach risk: Medium.",
    participants: 3,
    lastMessage: { sender: "Weblance Admin", text: "⚠ Client has been unresponsive for 8 days. Reminder sent.", time: "4h ago" },
    messages: [
      { id: "M1", sender: "Arjun Dev",      role: "talent", color: "blue", text: "Milestone 2 is 60% done. Waiting for client feedback on the appointment flow.", time: "Mar 8 · 10:00 AM", type: "Update",  msgType: "Update"  },
      { id: "M2", sender: "Weblance Admin", role: "admin",  color: "red",  text: "⚠ Client has been unresponsive for 8 days. Reminder has been sent automatically.", time: "Mar 10 · 09:00 AM", type: "Warning", msgType: "Warning" },
    ],
  },
  {
    id: "PRJ-003", title: "E-Commerce Platform Revamp",
    client: { name: "ShopEasy Retail", id: "CL-002" },
    talent: { name: "Rahul Sharma", id: "FL-001", type: "Freelancer" },
    status: "In Progress", health: "Delayed",
    budget: 185000, escrow: 92500,
    deadline: "Apr 10, 2026", startDate: "Jan 20, 2026",
    riskLevel: "High", aiFlag: true, progress: 28,
    scopeChanges: 5, clientSilenceDays: 5, talentSilenceDays: 2,
    chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    aiRiskReason: "Milestone 1 was 13 days late. 5 scope changes without approval. Both parties show inactivity. Dispute risk: HIGH.",
    participants: 3,
    lastMessage: { sender: "Weblance Admin", text: "⚠ High risk project flagged. Scope changes must be formally approved.", time: "2d ago" },
    messages: [
      { id: "M1", sender: "Weblance Admin", role: "admin",  color: "red",  text: "⚠ This project has been flagged as high risk. Scope changes must be formally approved going forward.", time: "Mar 10 · 08:00 AM", type: "Warning", msgType: "Warning" },
      { id: "M2", sender: "Rahul Sharma",   role: "talent", color: "blue", text: "I've completed 80% of the backend. Waiting for the updated API spec from the client.", time: "Mar 12 · 02:00 PM", type: "Update", msgType: "Update" },
    ],
  },
  {
    id: "PRJ-006", title: "Mobile Banking App",
    client: { name: "Vikram Singh", id: "CL-002" },
    talent: { name: "TechNova Solutions", id: "AG-001", type: "Agency" },
    status: "Disputed", health: "Disputed",
    budget: 280000, escrow: 140000,
    deadline: "Apr 5, 2026", startDate: "Nov 15, 2025",
    riskLevel: "High", aiFlag: true, progress: 50,
    scopeChanges: 2, clientSilenceDays: 0, talentSilenceDays: 0,
    chatFrozen: true,
    frozenReason: "Active dispute on Milestone 3 — DSP-002",
    frozenBy: "Weblance Admin",
    frozenAt: "Mar 8, 2026 · 06:00 PM",
    aiRiskReason: "Dispute raised by client. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault — 60% Agency, 40% Client.",
    participants: 5,
    lastMessage: { sender: "Weblance Admin", text: "🔒 Chat frozen pending dispute resolution.", time: "7d ago" },
    messages: [
      { id: "M1", sender: "Weblance Admin",      role: "admin",  color: "red",  text: "🔒 Chat frozen pending dispute resolution. Only official admin messages allowed.", time: "Mar 8 · 06:00 PM", type: "Warning", msgType: "Warning" },
      { id: "M2", sender: "System",              role: "system", color: "gray", text: "Escrow ₹1,40,000 has been frozen automatically due to active dispute DSP-002.", time: "Mar 8 · 06:01 PM", type: "System", msgType: "System" },
    ],
  },
  {
    id: "PRJ-005", title: "Brand Identity Design",
    client: { name: "Meera Joshi", id: "CL-003" },
    talent: { name: "Neha Gupta", id: "FL-005", type: "Freelancer" },
    status: "Pending", health: "Pending",
    budget: 45000, escrow: 0,
    deadline: "Apr 20, 2026", startDate: "Mar 14, 2026",
    riskLevel: "Low", aiFlag: false, progress: 0,
    scopeChanges: 0, clientSilenceDays: 0, talentSilenceDays: 0,
    chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    aiRiskReason: null,
    participants: 3,
    lastMessage: { sender: "System", text: "Waiting for client to fund escrow before work begins.", time: "1d ago" },
    messages: [
      { id: "M1", sender: "System", role: "system", color: "gray", text: "Project created. Waiting for client to fund escrow before work can begin.", time: "Mar 14 · 12:00 PM", type: "System", msgType: "System" },
    ],
  },
];

// ─── SHARED STYLES ─────────────────────────────────────────────────────────────
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
  yellow: "bg-yellow-50 border-l-4 border-yellow-400",
  green:  "bg-green-50 border-l-4 border-green-400",
  gray:   "bg-gray-50 border-l-4 border-gray-300",
};

const roleBadge = {
  admin:    "bg-red-100 text-red-700",
  agency:   "bg-blue-100 text-blue-700",
  talent:   "bg-blue-100 text-blue-700",
  team:     "bg-yellow-100 text-yellow-700",
  client:   "bg-green-100 text-green-700",
  system:   "bg-gray-100 text-gray-500",
};

const roleLabel = {
  admin: "Weblance Admin", agency: "Agency Admin",
  talent: "Freelancer", team: "Team Member",
  client: "Client", system: "System",
};

// ─── REUSABLE CHAT VIEW ───────────────────────────────────────────────────────
function ChatView({ project, onFreeze, onUnfreeze, showSend = true }) {
  const [adminMsg, setAdminMsg] = useState("");
  const [msgType, setMsgType] = useState("Normal");
  const [messages, setMessages] = useState(project.messages);

  const sendMsg = () => {
    if (!adminMsg.trim()) return;
    setMessages(prev => [...prev, {
      id: `NEW-${Date.now()}`, sender: "Weblance Admin", role: "admin",
      color: "red", text: adminMsg, time: "Just now", type: msgType, msgType,
    }]);
    setAdminMsg("");
  };

  return (
    <div className="flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
      {/* Chat Header */}
      <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between shrink-0">
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-gray-800">{project.title}</p>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[project.health]}`}>
              {project.health}
            </span>
            {project.chatFrozen && (
              <span className="text-[11px] bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-semibold">
                🔒 Frozen
              </span>
            )}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">{project.id} · {project.participants} participants · Read-only admin view</p>
        </div>
        <div className="flex items-center gap-2">
          {project.chatFrozen ? (
            <ActionBtn label="Unfreeze Chat" onClick={onUnfreeze} />
          ) : (
            <ActionBtn label="Freeze Chat" variant="warning" onClick={onFreeze} />
          )}
        </div>
      </div>

      {/* Freeze notice */}
      {project.chatFrozen && (
        <div className="px-5 py-2.5 bg-red-50 border-b border-red-100 flex items-center gap-2">
          <span className="text-red-500 text-sm">🔒</span>
          <div>
            <p className="text-xs font-semibold text-red-700">Chat frozen — only admin messages visible</p>
            <p className="text-[10px] text-red-500">{project.frozenReason} · Frozen by {project.frozenBy} · {project.frozenAt}</p>
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-3">
        {messages.map((msg) => (
          <div key={msg.id} className={`p-3 rounded-xl ${msgColorMap[msg.color] || msgColorMap.gray}`}>
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <Avatar name={msg.sender} size="sm" />
              <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
              <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${roleBadge[msg.role] || roleBadge.system}`}>
                {roleLabel[msg.role] || msg.role}
              </span>
              {msg.msgType && msg.msgType !== "Normal" && (
                <span className="text-[10px] text-gray-400 border border-gray-200 px-1.5 py-0.5 rounded-full">
                  {msg.msgType}
                </span>
              )}
              <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
            </div>
            <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
          </div>
        ))}
      </div>

      {/* Admin Message Input */}
      {showSend && (
        <div className="px-5 pb-5 pt-4 border-t border-gray-100 shrink-0">
          <div className="flex items-center gap-2 mb-2">
            <p className="text-xs font-semibold text-gray-500">Send Official Admin Message</p>
            <select
              value={msgType}
              onChange={(e) => setMsgType(e.target.value)}
              className="ml-auto text-xs border border-gray-200 rounded-lg px-2 py-1 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-600"
            >
              {["Normal", "Warning", "Decision", "Notice", "Freeze"].map(t => (
                <option key={t} value={t}>{t}</option>
              ))}
            </select>
          </div>
          <div className="flex gap-2">
            <input
              value={adminMsg}
              onChange={(e) => setAdminMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMsg()}
              placeholder="Type official message... (Enter to send)"
              className="flex-1 text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400"
            />
            <ActionBtn label="Send" variant="primary" size="md" onClick={sendMsg} />
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE 1: /admin/projects/at-risk ─────────────────────────────────────────
export function AdminAtRiskProjects() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const atRiskProjects = mockProjects.filter(p =>
    ["At Risk", "Delayed", "Disputed"].includes(p.health)
  );

  const filtered = atRiskProjects.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.title.toLowerCase().includes(q) || p.client.name.toLowerCase().includes(q) || p.talent.name.toLowerCase().includes(q)) &&
      (!riskFilter || p.riskLevel === riskFilter)
    );
  });

  return (
    <div className="p-6">
      <PageHeader
        title="At-Risk Projects"
        subtitle="Projects flagged by AI — delayed, at risk, or in active dispute"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="← All Projects" onClick={() => navigate("/admin/projects")} />
            <ActionBtn label="Frozen Chats" onClick={() => navigate("/admin/projectstream/freeze")} />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total At Risk"  value={atRiskProjects.length}                                     color="orange" />
        <StatCard label="Delayed"        value={atRiskProjects.filter(p => p.health === "Delayed").length}  color="orange" />
        <StatCard label="Disputed"       value={atRiskProjects.filter(p => p.health === "Disputed").length} color="red"    />
        <StatCard label="Escrow at Stake" value={`₹${(atRiskProjects.reduce((s, p) => s + p.escrow, 0) / 100000).toFixed(1)}L`} color="red" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        <SearchBar value={search} onChange={setSearch} placeholder="Search project, client, talent...">
          <FilterSelect value={riskFilter} onChange={setRiskFilter} label="All Risk"
            options={[{ value: "High", label: "High" }, { value: "Medium", label: "Medium" }]} />
        </SearchBar>
      </div>

      <div className="space-y-4">
        {filtered.map(p => (
          <div
            key={p.id}
            className={`bg-white rounded-xl border shadow-sm transition-all cursor-pointer hover:shadow-md ${selected?.id === p.id ? "border-green-300 ring-1 ring-green-200" : "border-gray-100"}`}
            onClick={() => setSelected(selected?.id === p.id ? null : p)}
          >
            <div className="p-5">
              {/* Top row */}
              <div className="flex items-start justify-between gap-3 mb-3">
                <div>
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <h3 className="text-base font-bold text-gray-900">{p.title}</h3>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span>
                    {p.aiFlag && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">AI⚑</span>}
                  </div>
                  <p className="text-xs text-gray-500">{p.id} · {p.client.name} → {p.talent.name} ({p.talent.type})</p>
                </div>
                <span className={`text-xs font-bold px-2 py-1 rounded-lg shrink-0 ${p.riskLevel === "High" ? "bg-red-50 text-red-600" : "bg-yellow-50 text-yellow-700"}`}>
                  {p.riskLevel} Risk
                </span>
              </div>

              {/* AI Risk Reason */}
              {p.aiRiskReason && (
                <div className="mb-3 p-3 bg-orange-50 rounded-lg border border-orange-100 flex items-start gap-2">
                  <span className="text-orange-500 text-sm shrink-0 mt-0.5">◎</span>
                  <p className="text-xs text-orange-800 leading-relaxed">{p.aiRiskReason}</p>
                </div>
              )}

              {/* Progress + stats */}
              <div className="flex items-center gap-6 mb-4">
                <div className="flex-1">
                  <div className="flex justify-between text-xs text-gray-500 mb-1">
                    <span>Progress</span>
                    <span className="font-semibold">{p.progress}%</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${p.riskLevel === "High" ? "bg-orange-400" : "bg-yellow-400"}`}
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-4 shrink-0">
                  {[
                    { label: "Escrow",  value: p.escrow > 0 ? `₹${(p.escrow / 1000).toFixed(0)}k` : "—",  color: "text-orange-500" },
                    { label: "Deadline",value: p.deadline, color: "text-gray-700" },
                    { label: "Scope Δ", value: p.scopeChanges, color: p.scopeChanges > 2 ? "text-red-500" : "text-gray-600" },
                  ].map(s => (
                    <div key={s.label} className="text-center">
                      <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Silence indicators */}
              <div className="flex items-center gap-3 mb-4 flex-wrap">
                {p.clientSilenceDays > 0 && (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${p.clientSilenceDays > 5 ? "bg-red-50 text-red-600 border border-red-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
                    <span>⏱</span> Client silent {p.clientSilenceDays} days
                  </div>
                )}
                {p.talentSilenceDays > 0 && (
                  <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-xs font-semibold ${p.talentSilenceDays > 2 ? "bg-red-50 text-red-600 border border-red-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
                    <span>⏱</span> Talent silent {p.talentSilenceDays} days
                  </div>
                )}
                {p.chatFrozen && (
                  <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-red-50 text-red-600 border border-red-200 text-xs font-semibold">
                    🔒 Chat frozen
                  </div>
                )}
              </div>

              {/* Quick Actions */}
              <div className="flex items-center gap-2 flex-wrap">
                <ActionBtn
                  label="Monitor Chat"
                  variant="primary"
                  onClick={(e) => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}
                />
                <ActionBtn
                  label="View Project"
                  onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${p.id}`); }}
                />
                <ActionBtn
                  label="Send Warning"
                  variant="warning"
                  onClick={(e) => e.stopPropagation()}
                />
                {p.health === "Disputed" && (
                  <ActionBtn
                    label="View Dispute"
                    variant="danger"
                    onClick={(e) => { e.stopPropagation(); navigate("/admin/disputes"); }}
                  />
                )}
                <ActionBtn
                  label={p.chatFrozen ? "Unfreeze Chat" : "Freeze Chat"}
                  variant={p.chatFrozen ? "default" : "warning"}
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="bg-white rounded-xl border border-gray-100 py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-3">
              <span className="text-green-500 text-xl">✓</span>
            </div>
            <p className="text-gray-500 text-sm font-semibold">No at-risk projects</p>
            <p className="text-gray-400 text-xs mt-1">All projects are on track</p>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGE 2: /admin/projectstream/:id — MONITOR ANY CHAT ─────────────────────
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

  const handleFreeze = () => setShowFreezeModal(true);
  const confirmFreeze = () => {
    setProjects(prev => prev.map(x => x.id === id ? {
      ...x, chatFrozen: true,
      frozenReason: freezeReason || "Frozen by admin",
      frozenBy: "Weblance Admin",
      frozenAt: "Mar 14, 2026 · Now",
    } : x));
    setShowFreezeModal(false);
    setFreezeReason("");
  };
  const handleUnfreeze = () => {
    setProjects(prev => prev.map(x => x.id === id ? {
      ...x, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    } : x));
  };

  const currentProject = projects.find(x => x.id === id);

  const filteredMessages = currentProject.messages.filter(m => {
    if (filterType === "All") return true;
    if (filterType === "Warnings") return m.msgType === "Warning";
    if (filterType === "Admin") return m.role === "admin";
    if (filterType === "Decisions") return m.msgType === "Decision";
    return true;
  });

  return (
    <div className="p-6 h-[calc(100vh-0px)] flex flex-col">
      {/* Back + Header */}
      <div className="flex items-center justify-between mb-4 shrink-0">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors">
          ← Back
        </button>
        <div className="flex items-center gap-2">
          <ActionBtn label="View Project" onClick={() => navigate(`/admin/projects/${p.id}`)} />
          <ActionBtn label="View Client" onClick={() => navigate(`/admin/clients/${p.client.id}`)} />
          <ActionBtn label="At-Risk List" onClick={() => navigate("/admin/projects/at-risk")} />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5 flex-1 min-h-0">
        {/* Main Chat — takes 3 cols */}
        <div className="lg:col-span-3 flex flex-col min-h-0">
          {/* Message filter tabs */}
          <div className="flex gap-1 border-b border-gray-100 mb-3 shrink-0">
            {["All", "Admin", "Warnings", "Decisions"].map(f => (
              <button key={f} onClick={() => setFilterType(f)}
                className={`px-3 py-1.5 text-xs font-medium transition-colors ${filterType === f ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
                {f}
              </button>
            ))}
          </div>

          <div className="flex-1 min-h-0">
            <ChatView
              project={{ ...currentProject, messages: filteredMessages }}
              onFreeze={handleFreeze}
              onUnfreeze={handleUnfreeze}
            />
          </div>
        </div>

        {/* Sidebar — 1 col */}
        <div className="space-y-4 overflow-y-auto">
          {/* Project Info */}
          <SectionCard title="Project Info">
            <div className="space-y-2">
              {[
                { label: "Project",  value: p.title },
                { label: "Health",   value: <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${healthStyle[p.health]}`}>{p.health}</span> },
                { label: "Progress", value: `${p.progress}%` },
                { label: "Deadline", value: p.deadline },
                { label: "Budget",   value: `₹${(p.budget / 1000).toFixed(0)}k` },
                { label: "Escrow",   value: p.escrow > 0 ? `₹${(p.escrow / 1000).toFixed(0)}k` : "Released" },
              ].map(item => (
                <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Participants */}
          <SectionCard title="Participants">
            <div className="space-y-2.5">
              {[
                { name: "Weblance Admin",  role: "Platform", color: "bg-red-500"   },
                { name: p.client.name,     role: "Client",   color: "bg-green-500" },
                { name: p.talent.name,     role: p.talent.type, color: "bg-blue-500" },
              ].map(pt => (
                <div key={pt.name} className="flex items-center gap-2.5">
                  <div className={`w-7 h-7 rounded-full ${pt.color} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                    {pt.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-gray-800">{pt.name}</p>
                    <p className="text-[10px] text-gray-400">{pt.role}</p>
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Admin Actions */}
          <SectionCard title="Chat Actions">
            <div className="space-y-2">
              {[
                { label: currentProject.chatFrozen ? "Unfreeze Chat" : "Freeze Chat", variant: currentProject.chatFrozen ? "default" : "warning", action: currentProject.chatFrozen ? handleUnfreeze : handleFreeze },
                { label: "Export Chat History",    variant: "default",  action: () => {} },
                { label: "Flag Conversation",      variant: "danger",   action: () => {} },
                { label: "View Project Detail",    variant: "default",  action: () => navigate(`/admin/projects/${p.id}`) },
                { label: "Escalate to Dispute",    variant: "danger",   action: () => navigate("/admin/disputes") },
              ].map(a => (
                <button key={a.label} onClick={a.action}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${
                    a.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" :
                    a.variant === "danger"  ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" :
                    "border-gray-200 text-gray-700 hover:bg-gray-50"
                  }`}>
                  {a.label}
                </button>
              ))}
            </div>
          </SectionCard>

          {/* AI Risk */}
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
            <p className="text-sm text-gray-500 mb-4">Only admin messages will be allowed once frozen. Both parties will be notified.</p>
            <div className="mb-4">
              <label className="text-xs font-semibold text-gray-500 block mb-1.5">Reason for freeze *</label>
              <div className="space-y-2 mb-3">
                {["Active dispute — awaiting resolution", "Admin review in progress", "Legal hold", "Suspicious activity detected", "Other"].map(r => (
                  <label key={r} className={`flex items-center gap-2 px-3 py-2 rounded-lg border cursor-pointer text-sm transition-colors ${freezeReason === r ? "border-red-300 bg-red-50 text-red-700" : "border-gray-200 text-gray-600 hover:bg-gray-50"}`}>
                    <input type="radio" name="freezeReason" value={r} checked={freezeReason === r} onChange={() => setFreezeReason(r)} className="accent-red-500" />
                    {r}
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

// ─── PAGE 3: /admin/projectstream/freeze — FROZEN CHATS ──────────────────────
export function AdminFrozenChats() {
  const navigate = useNavigate();
  const [projects, setProjects] = useState(mockProjects);
  const [selected, setSelected] = useState(null);

  const frozenProjects = projects.filter(p => p.chatFrozen);

  const unfreeze = (id) => {
    setProjects(prev => prev.map(p => p.id === id ? {
      ...p, chatFrozen: false, frozenReason: null, frozenBy: null, frozenAt: null,
    } : p));
    if (selected?.id === id) setSelected(null);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Frozen Chats"
        subtitle="All ProjectStream conversations currently frozen by admin"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="← All Projects"   onClick={() => navigate("/admin/projects")} />
            <ActionBtn label="At-Risk Projects" onClick={() => navigate("/admin/projects/at-risk")} />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Frozen Chats"   value={frozenProjects.length}           sub="Currently frozen"   color="red"    />
        <StatCard label="Disputed"       value={frozenProjects.filter(p => p.health === "Disputed").length} color="orange" />
        <StatCard label="Escrow at Stake" value={`₹${(frozenProjects.reduce((s, p) => s + p.escrow, 0) / 1000).toFixed(0)}k`} color="red" />
        <StatCard label="Total Chats"    value={mockProjects.length}             sub="Platform-wide"      color="gray"   />
      </div>

      {frozenProjects.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-2xl">🔓</span>
          </div>
          <p className="text-gray-600 font-semibold text-base">No chats are frozen</p>
          <p className="text-gray-400 text-sm mt-1">All ProjectStream conversations are currently active</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          {/* Left — frozen list */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-600 mb-3">
              {frozenProjects.length} frozen conversation{frozenProjects.length !== 1 ? "s" : ""}
            </h3>
            {frozenProjects.map(p => (
              <div
                key={p.id}
                onClick={() => setSelected(selected?.id === p.id ? null : p)}
                className={`bg-white rounded-xl border shadow-sm cursor-pointer transition-all hover:shadow-md ${selected?.id === p.id ? "border-red-300 ring-1 ring-red-200" : "border-gray-100"}`}
              >
                <div className="p-4">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
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

                  <div className="flex items-center gap-2">
                    <ActionBtn
                      label="Monitor Chat"
                      variant="primary"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/projectstream/${p.id}`); }}
                    />
                    <ActionBtn
                      label="Unfreeze"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); unfreeze(p.id); }}
                    />
                    <ActionBtn
                      label="View Project"
                      size="sm"
                      onClick={(e) => { e.stopPropagation(); navigate(`/admin/projects/${p.id}`); }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right — chat preview */}
          <div>
            {selected ? (
              <div className="sticky top-6">
                <div className="mb-3 flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-700">Chat Preview — {selected.title}</p>
                  <ActionBtn
                    label="Open Full Monitor →"
                    variant="primary"
                    onClick={() => navigate(`/admin/projectstream/${selected.id}`)}
                  />
                </div>
                <div className="h-[480px] flex flex-col">
                  <ChatView
                    project={selected}
                    onFreeze={() => {}}
                    onUnfreeze={() => unfreeze(selected.id)}
                    showSend={false}
                  />
                </div>
                <div className="mt-3 flex gap-2">
                  <button
                    onClick={() => unfreeze(selected.id)}
                    className="flex-1 py-2 text-sm font-bold bg-white border border-gray-200 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Unfreeze This Chat
                  </button>
                  <button
                    onClick={() => navigate(`/admin/projectstream/${selected.id}`)}
                    className="flex-1 py-2 text-sm font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    Full Monitor View →
                  </button>
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

      {/* All active chats reference */}
      <div className="mt-8">
        <h3 className="text-sm font-semibold text-gray-600 mb-3">All Active Chats ({mockProjects.filter(p => !p.chatFrozen).length})</h3>
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="divide-y divide-gray-50">
            {mockProjects.filter(p => !p.chatFrozen).map(p => (
              <div key={p.id} className="flex items-center gap-4 px-5 py-3 hover:bg-gray-50 transition-colors">
                <div className="w-2 h-2 rounded-full bg-green-400 shrink-0" />
                <Avatar name={p.title} size="sm" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{p.title}</p>
                  <p className="text-xs text-gray-400 truncate">{p.lastMessage?.sender}: {p.lastMessage?.text}</p>
                </div>
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${healthStyle[p.health]}`}>{p.health}</span>
                <span className="text-xs text-gray-400 shrink-0">{p.lastMessage?.time}</span>
                <ActionBtn
                  label="Monitor"
                  size="sm"
                  onClick={() => navigate(`/admin/projectstream/${p.id}`)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}