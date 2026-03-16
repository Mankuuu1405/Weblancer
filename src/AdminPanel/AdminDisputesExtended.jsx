import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, SectionCard, InfoRow
} from "./AdminComponents";

// ─── RICH MOCK DATA ───────────────────────────────────────────────────────────
export const mockDisputes = [
  {
    id: "DSP-001",
    project: "E-Commerce Platform Revamp", projectId: "PRJ-003",
    client: { name: "Vikram Singh",      id: "CL-002", email: "vikram@shopeasy.com"    },
    talent: { name: "Rahul Sharma",       id: "FL-001", email: "rahul@gmail.com", type: "Freelancer" },
    status: "Open", priority: "High", raisedBy: "Client",
    reason: "Deliverable does not match agreed scope — backend features incomplete",
    amountDisputed: 92500, escrowAvailable: 92500,
    aiVerdict: "Partial fault — Freelancer",
    aiConfidence: 71,
    aiSummary: "Client claims backend features were incomplete. Freelancer submitted partial delivery without milestone sign-off. Timeline shows 2 missed deadlines. Freelancer argues scope was expanded without formal approval.",
    raisedDate: "Mar 10, 2026", lastActivity: "2h ago", daysOpen: 4,
    evidence: [
      { name: "Milestone_2_Delivery.zip",     submittedBy: "Freelancer", date: "Mar 9, 2026",  type: "Deliverable" },
      { name: "Original_Scope_Document.pdf",  submittedBy: "Client",     date: "Mar 10, 2026", type: "Contract"    },
      { name: "Screenshot_Incomplete_UI.png", submittedBy: "Client",     date: "Mar 10, 2026", type: "Proof"       },
      { name: "Chat_Export_Mar2026.pdf",       submittedBy: "System",     date: "Mar 10, 2026", type: "Chat Log"    },
    ],
    timeline: [
      { event: "Milestone 2 submitted by Rahul Sharma",          actor: "Freelancer", time: "Mar 9 · 02:00 PM",  type: "delivery" },
      { event: "Client raised dispute DSP-001",                   actor: "Vikram Singh", time: "Mar 10 · 09:00 AM", type: "alert"    },
      { event: "Escrow ₹92,500 frozen automatically",            actor: "System",     time: "Mar 10 · 09:01 AM", type: "payment"  },
      { event: "AI analysis started",                            actor: "AI System",  time: "Mar 10 · 09:05 AM", type: "action"   },
      { event: "AI pre-analysis completed — 71% confidence",     actor: "AI System",  time: "Mar 10 · 09:30 AM", type: "action"   },
      { event: "Admin notified — pending decision",              actor: "System",     time: "Mar 10 · 10:00 AM", type: "alert"    },
    ],
    messages: [
      { sender: "Vikram Singh",   role: "client",  color: "green", text: "The backend APIs are completely missing. Only the frontend shell was delivered. This is not what was agreed.",    time: "Mar 10 · 09:00 AM" },
      { sender: "Rahul Sharma",   role: "talent",  color: "blue",  text: "I delivered everything in the original scope. The additional API endpoints were added after our agreement.",      time: "Mar 10 · 11:00 AM" },
      { sender: "Weblance Admin", role: "admin",   color: "red",   text: "⚑ Dispute under review. Both parties please submit all relevant evidence within 48 hours.",                       time: "Mar 10 · 12:00 PM" },
    ],
    adminDecision: null, adminNote: "",
  },
  {
    id: "DSP-002",
    project: "Mobile Banking App", projectId: "PRJ-006",
    client: { name: "Vikram Singh",      id: "CL-002", email: "vikram@shopeasy.com"    },
    talent: { name: "TechNova Solutions", id: "AG-001", email: "admin@technova.io", type: "Agency" },
    status: "Under Review", priority: "High", raisedBy: "Client",
    reason: "Project effectively abandoned after 50% delivery — 3 missed deadlines",
    amountDisputed: 140000, escrowAvailable: 140000,
    aiVerdict: "Fault — Agency",
    aiConfidence: 84,
    aiSummary: "Agency failed to deliver Milestone 3 after 3 deadline extensions. Client funded full escrow upfront. Team capacity analysis shows agency was overcommitted at time of acceptance. Strong case for significant client refund.",
    raisedDate: "Mar 8, 2026", lastActivity: "1d ago", daysOpen: 6,
    evidence: [
      { name: "Milestone_3_Contract.pdf",       submittedBy: "Client",  date: "Mar 8, 2026",  type: "Contract"    },
      { name: "Deadline_Extension_Emails.pdf",  submittedBy: "Client",  date: "Mar 8, 2026",  type: "Proof"       },
      { name: "Partial_APK_Build.apk",          submittedBy: "Agency",  date: "Mar 8, 2026",  type: "Deliverable" },
      { name: "Team_Capacity_Report.pdf",       submittedBy: "System",  date: "Mar 9, 2026",  type: "AI Report"   },
      { name: "Chat_Export.pdf",                submittedBy: "System",  date: "Mar 9, 2026",  type: "Chat Log"    },
      { name: "Escrow_Ledger.pdf",              submittedBy: "System",  date: "Mar 9, 2026",  type: "Financial"   },
      { name: "AI_Verdict_Summary.pdf",         submittedBy: "AI",      date: "Mar 9, 2026",  type: "AI Report"   },
    ],
    timeline: [
      { event: "Milestone 3 deadline missed (1st time)",          actor: "AI System",   time: "Feb 15 · 08:00 AM", type: "alert"    },
      { event: "Deadline extension granted — 2 weeks",            actor: "Admin",       time: "Feb 16 · 10:00 AM", type: "action"   },
      { event: "Milestone 3 deadline missed again (2nd time)",    actor: "AI System",   time: "Mar 1 · 08:00 AM",  type: "alert"    },
      { event: "Client raised dispute DSP-002",                   actor: "Vikram Singh",time: "Mar 8 · 11:00 AM",  type: "alert"    },
      { event: "Escrow ₹1,40,000 frozen",                        actor: "System",      time: "Mar 8 · 11:01 AM",  type: "payment"  },
      { event: "AI analysis completed — 84% confidence",          actor: "AI System",   time: "Mar 9 · 09:00 AM",  type: "action"   },
    ],
    messages: [
      { sender: "Vikram Singh",      role: "client", color: "green", text: "We gave 3 extensions and still no delivery. This is unacceptable for an agency of this supposed caliber.", time: "Mar 8 · 11:00 AM" },
      { sender: "Raj Kumar (TechNova)", role: "talent", color: "blue", text: "We apologize for the delays. We had team capacity issues we didn't anticipate. We can deliver in 2 more weeks.", time: "Mar 8 · 02:00 PM" },
      { sender: "Weblance Admin",    role: "admin",  color: "red",   text: "🔒 Chat frozen. Both parties must submit final evidence. Admin will issue decision within 72 hours.", time: "Mar 8 · 06:00 PM" },
    ],
    adminDecision: null, adminNote: "",
  },
  {
    id: "DSP-003",
    project: "Patient Appointment App", projectId: "PRJ-002",
    client: { name: "HealthFirst Clinic", id: "CL-001", email: "sneha@healthfirst.in" },
    talent: { name: "Arjun Dev",          id: "FL-002", email: "arjun@devcraft.io", type: "Freelancer" },
    status: "Open", priority: "Medium", raisedBy: "Talent",
    reason: "Client refusing to approve completed milestone — unresponsive for 8 days",
    amountDisputed: 80000, escrowAvailable: 160000,
    aiVerdict: "Partial fault — Client",
    aiConfidence: 68,
    aiSummary: "Freelancer submitted Milestone 2 on time with full deliverables. Client has not responded for 8 days despite 3 automated reminders. AI flagged client approval delay pattern. This appears to be a client-side inaction issue.",
    raisedDate: "Mar 12, 2026", lastActivity: "5h ago", daysOpen: 2,
    evidence: [
      { name: "Milestone_2_Deliverables.zip", submittedBy: "Freelancer", date: "Mar 4, 2026",  type: "Deliverable" },
      { name: "Reminder_Log.pdf",             submittedBy: "System",     date: "Mar 12, 2026", type: "System Log"  },
      { name: "Chat_Export.pdf",              submittedBy: "System",     date: "Mar 12, 2026", type: "Chat Log"    },
    ],
    timeline: [
      { event: "Milestone 2 delivered by Arjun Dev",             actor: "Freelancer",      time: "Mar 4 · 03:00 PM",  type: "delivery" },
      { event: "Reminder sent to client (1st)",                  actor: "System",          time: "Mar 7 · 09:00 AM",  type: "action"   },
      { event: "Reminder sent to client (2nd)",                  actor: "System",          time: "Mar 10 · 09:00 AM", type: "action"   },
      { event: "Arjun Dev raised dispute DSP-003",               actor: "Freelancer",      time: "Mar 12 · 10:00 AM", type: "alert"    },
      { event: "AI flagged: client silence 8 days",              actor: "AI System",       time: "Mar 12 · 10:30 AM", type: "alert"    },
    ],
    messages: [
      { sender: "Arjun Dev",        role: "talent", color: "blue",  text: "I delivered everything on time. The client has not responded in 8 days. I am raising this to protect my payment.", time: "Mar 12 · 10:00 AM" },
      { sender: "Weblance Admin",   role: "admin",  color: "red",   text: "⚑ Client has been notified. If no response within 48 hours, admin will trigger auto-approval per platform policy.", time: "Mar 12 · 11:00 AM" },
    ],
    adminDecision: null, adminNote: "",
  },
  {
    id: "DSP-004",
    project: "Brand Identity Design", projectId: "PRJ-005",
    client: { name: "Meera Joshi", id: "CL-003", email: "meera@startup.co" },
    talent: { name: "Neha Gupta",   id: "FL-005", email: "neha@designcraft.in", type: "Freelancer" },
    status: "Resolved", priority: "Low", raisedBy: "Client",
    reason: "Design not aligned with initial brief — style mismatch",
    amountDisputed: 22500, escrowAvailable: 0,
    aiVerdict: "Split — 60/40",
    aiConfidence: 90,
    aiSummary: "Client had vague initial brief. Freelancer delivered professionally but style did not match undocumented expectations. Partial refund of ₹9,000 (40%) agreed. Resolved amicably through admin mediation.",
    raisedDate: "Feb 20, 2026", lastActivity: "10d ago", daysOpen: 0,
    evidence: [
      { name: "Design_Deliverables_v3.fig", submittedBy: "Freelancer", date: "Feb 18, 2026", type: "Deliverable" },
      { name: "Original_Brief.pdf",         submittedBy: "Client",     date: "Feb 20, 2026", type: "Brief"       },
      { name: "Chat_Export.pdf",            submittedBy: "System",     date: "Feb 20, 2026", type: "Chat Log"    },
      { name: "AI_Verdict.pdf",             submittedBy: "AI",         date: "Feb 21, 2026", type: "AI Report"   },
      { name: "Refund_Agreement.pdf",       submittedBy: "Admin",      date: "Mar 5, 2026",  type: "Resolution"  },
    ],
    timeline: [
      { event: "Dispute raised by Meera Joshi",       actor: "Client",    time: "Feb 20 · 10:00 AM", type: "alert"   },
      { event: "AI analysis completed — 90% conf.",   actor: "AI System", time: "Feb 21 · 09:00 AM", type: "action"  },
      { event: "Admin mediation session held",        actor: "Admin",     time: "Mar 1 · 02:00 PM",  type: "action"  },
      { event: "Partial refund ₹9,000 agreed",        actor: "Admin",     time: "Mar 5 · 11:00 AM",  type: "payment" },
      { event: "Dispute resolved & closed",           actor: "System",    time: "Mar 5 · 11:30 AM",  type: "system"  },
    ],
    messages: [
      { sender: "Meera Joshi",    role: "client", color: "green", text: "The designs look professional but they are completely different from what I had in mind.", time: "Feb 20 · 10:00 AM" },
      { sender: "Neha Gupta",     role: "talent", color: "blue",  text: "I followed the brief as closely as possible. There were no specific style guidelines provided.", time: "Feb 20 · 12:00 PM" },
      { sender: "Weblance Admin", role: "admin",  color: "red",   text: "✓ Resolution agreed. ₹9,000 partial refund processed. Dispute closed.", time: "Mar 5 · 11:00 AM" },
    ],
    adminDecision: "Split — 40% refund to client (₹9,000)", adminNote: "Both parties agreed. Brief was vague. Fair split applied.",
  },
];

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────
const priorityStyle = {
  High:   "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low:    "bg-green-50 text-green-700 border border-green-200",
};

const statusStyle = {
  Open:           "bg-red-50 text-red-600 border border-red-200",
  "Under Review": "bg-blue-50 text-blue-700 border border-blue-200",
  Resolved:       "bg-green-50 text-green-700 border border-green-200",
  Closed:         "bg-gray-50 text-gray-600 border border-gray-200",
};

const msgColor = {
  red:   "bg-red-50 border-l-4 border-red-400",
  blue:  "bg-blue-50 border-l-4 border-blue-400",
  green: "bg-green-50 border-l-4 border-green-400",
};

const msgBadge = {
  admin:  "bg-red-100 text-red-700",
  talent: "bg-blue-100 text-blue-700",
  client: "bg-green-100 text-green-700",
};

const timelineIcon = {
  alert:   { icon: "⚑", bg: "bg-red-100",    text: "text-red-600"    },
  action:  { icon: "◎", bg: "bg-blue-100",   text: "text-blue-600"   },
  payment: { icon: "⊕", bg: "bg-green-100",  text: "text-green-600"  },
  delivery:{ icon: "⊟", bg: "bg-purple-100", text: "text-purple-600" },
  system:  { icon: "⊙", bg: "bg-gray-100",   text: "text-gray-500"   },
};

const evidenceIcon = {
  Deliverable: "📦", Contract: "📄", Proof: "🖼", "Chat Log": "💬",
  "AI Report": "◎", "System Log": "⊙", Brief: "📋",
  Financial: "💰", Resolution: "✅", "AI Report": "🤖",
};

// ─── PAGE 1: /admin/disputes/:id — SINGLE DISPUTE DETAIL ─────────────────────
export function AdminDisputeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("summary");
  const [decision, setDecision] = useState("");
  const [decisionNote, setDecisionNote] = useState("");
  const [disputes, setDisputes] = useState(mockDisputes);

  const d = disputes.find(x => x.id === id);

  if (!d) return (
    <div className="p-6 text-center py-24 space-y-3">
      <p className="text-gray-400">Dispute not found</p>
      <ActionBtn label="← Back to Disputes" onClick={() => navigate("/admin/disputes")} size="md" />
    </div>
  );

  const isPending = d.status === "Open" || d.status === "Under Review";
  const tabs = ["summary", "evidence", "chat", "timeline", "decision"];

  const confirmDecision = () => {
    if (!decision) return;
    setDisputes(prev => prev.map(x => x.id === id ? {
      ...x, status: "Resolved", adminDecision: decision, adminNote: decisionNote,
    } : x));
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate("/admin/disputes")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5 transition-colors">
        ← All Disputes
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-5">
        <div>
          <div className="flex items-center gap-2.5 flex-wrap mb-1">
            <h1 className="text-xl font-bold text-gray-900">{d.id}</h1>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[d.status]}`}>{d.status}</span>
            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[d.priority]}`}>{d.priority} Priority</span>
            {d.daysOpen > 0 && (
              <span className="text-[11px] bg-gray-50 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full font-semibold">
                {d.daysOpen}d open
              </span>
            )}
          </div>
          <p className="text-sm text-gray-500">{d.project} · Raised by {d.raisedBy} · {d.raisedDate}</p>
        </div>
        <div className="flex items-center gap-2">
          <ActionBtn label="View Project" onClick={() => navigate(`/admin/projects/${d.projectId}`)} />
          {isPending && <ActionBtn label="Pending Decisions" variant="warning" onClick={() => navigate("/admin/disputes/pending")} />}
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-5">
        {[
          { label: "Amount Disputed",    value: `₹${d.amountDisputed.toLocaleString()}`,  color: "text-orange-500" },
          { label: "Escrow Available",   value: d.escrowAvailable > 0 ? `₹${d.escrowAvailable.toLocaleString()}` : "Released", color: "text-blue-600" },
          { label: "AI Confidence",      value: `${d.aiConfidence}%`,                     color: d.aiConfidence >= 80 ? "text-green-600" : d.aiConfidence >= 60 ? "text-yellow-600" : "text-red-500" },
          { label: "Evidence Files",     value: d.evidence.length,                        color: "text-gray-800" },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* AI Summary Banner */}
      <div className={`p-4 rounded-xl border mb-5 flex items-start gap-3 ${d.aiConfidence >= 80 ? "bg-green-50 border-green-100" : d.aiConfidence >= 60 ? "bg-yellow-50 border-yellow-100" : "bg-orange-50 border-orange-100"}`}>
        <span className={`text-lg mt-0.5 shrink-0 ${d.aiConfidence >= 80 ? "text-green-500" : d.aiConfidence >= 60 ? "text-yellow-500" : "text-orange-500"}`}>◎</span>
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-1">
            <p className={`text-sm font-bold ${d.aiConfidence >= 80 ? "text-green-800" : d.aiConfidence >= 60 ? "text-yellow-800" : "text-orange-800"}`}>
              AI Verdict: {d.aiVerdict}
            </p>
            <div className="flex items-center gap-1.5">
              <div className="w-20 h-1.5 bg-white/60 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${d.aiConfidence >= 80 ? "bg-green-500" : d.aiConfidence >= 60 ? "bg-yellow-400" : "bg-orange-400"}`}
                  style={{ width: `${d.aiConfidence}%` }} />
              </div>
              <span className={`text-xs font-bold ${d.aiConfidence >= 80 ? "text-green-700" : d.aiConfidence >= 60 ? "text-yellow-700" : "text-orange-700"}`}>
                {d.aiConfidence}%
              </span>
            </div>
          </div>
          <p className={`text-xs leading-relaxed ${d.aiConfidence >= 80 ? "text-green-700" : d.aiConfidence >= 60 ? "text-yellow-700" : "text-orange-700"}`}>
            {d.aiSummary}
          </p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-100 mb-6 overflow-x-auto">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize whitespace-nowrap transition-colors ${activeTab === tab ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
            {tab}{tab === "evidence" ? ` (${d.evidence.length})` : tab === "decision" && isPending ? " ⚡" : ""}
          </button>
        ))}
      </div>

      {/* ── SUMMARY ── */}
      {activeTab === "summary" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <SectionCard title="Dispute Details">
              <InfoRow label="Dispute ID"  value={d.id} />
              <InfoRow label="Project"     value={d.project} />
              <InfoRow label="Raised By"   value={d.raisedBy} />
              <InfoRow label="Reason"      value={d.reason} />
              <InfoRow label="Raised Date" value={d.raisedDate} />
              <InfoRow label="Last Activity" value={d.lastActivity} />
              <InfoRow label="Days Open"   value={d.daysOpen > 0 ? `${d.daysOpen} days` : "Resolved"} />
            </SectionCard>

            {d.adminDecision && (
              <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                <p className="text-sm font-bold text-green-800 mb-1">✓ Admin Decision</p>
                <p className="text-sm text-green-700">{d.adminDecision}</p>
                {d.adminNote && <p className="text-xs text-green-600 mt-1 italic">"{d.adminNote}"</p>}
              </div>
            )}
          </div>

          <div className="space-y-5">
            <SectionCard title="Client">
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={d.client.name} size="md" />
                <div>
                  <p className="text-sm font-bold text-gray-800">{d.client.name}</p>
                  <p className="text-xs text-gray-400">Client</p>
                </div>
              </div>
              <InfoRow label="Email" value={d.client.email} />
              <InfoRow label="ID"    value={d.client.id}    />
              <div className="mt-2"><ActionBtn label="View Client" onClick={() => navigate(`/admin/clients/${d.client.id}`)} /></div>
            </SectionCard>

            <SectionCard title={d.talent.type}>
              <div className="flex items-center gap-3 mb-3">
                <Avatar name={d.talent.name} size="md" />
                <div>
                  <p className="text-sm font-bold text-gray-800">{d.talent.name}</p>
                  <p className="text-xs text-gray-400">{d.talent.type}</p>
                </div>
              </div>
              <InfoRow label="Email" value={d.talent.email} />
              <InfoRow label="ID"    value={d.talent.id}    />
              <div className="mt-2">
                <ActionBtn label={`View ${d.talent.type}`}
                  onClick={() => navigate(`/admin/${d.talent.type === "Agency" ? "agencies" : "freelancers"}/${d.talent.id}`)} />
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── EVIDENCE ── */}
      {activeTab === "evidence" && (
        <SectionCard title={`Evidence Files (${d.evidence.length})`}>
          <div className="space-y-3">
            {d.evidence.map((ev, i) => (
              <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
                <div className="w-10 h-10 bg-white rounded-lg border border-gray-200 flex items-center justify-center text-xl shrink-0">
                  {evidenceIcon[ev.type] || "📄"}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-800 truncate">{ev.name}</p>
                  <p className="text-xs text-gray-400">Submitted by {ev.submittedBy} · {ev.date}</p>
                </div>
                <div className="flex items-center gap-3 shrink-0">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${
                    ev.submittedBy === "Client"     ? "bg-green-50 text-green-700 border border-green-200" :
                    ev.submittedBy === "Freelancer" || ev.submittedBy === "Agency" ? "bg-blue-50 text-blue-700 border border-blue-200" :
                    ev.submittedBy === "AI"         ? "bg-purple-50 text-purple-700 border border-purple-200" :
                    "bg-gray-50 text-gray-500 border border-gray-200"
                  }`}>
                    {ev.type}
                  </span>
                  <div className="flex gap-1.5">
                    <ActionBtn label="View" />
                    <ActionBtn label="Download" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {/* ── CHAT ── */}
      {activeTab === "chat" && (
        <SectionCard title="ProjectStream — Chat History (Read-only)">
          <div className="space-y-3 mb-4">
            {d.messages.map((msg, i) => (
              <div key={i} className={`p-3 rounded-xl ${msgColor[msg.color]}`}>
                <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                  <Avatar name={msg.sender} size="sm" />
                  <span className="text-sm font-bold text-gray-800">{msg.sender}</span>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${msgBadge[msg.role]}`}>
                    {msg.role === "admin" ? "Weblance Admin" : msg.role === "client" ? "Client" : d.talent.type}
                  </span>
                  <span className="text-[10px] text-gray-400 ml-auto">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">{msg.text}</p>
              </div>
            ))}
          </div>
          <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-700 font-medium">
              Full chat history is available in ProjectStream. Use the <span className="font-bold">Monitor Chat</span> button to review all messages.
            </p>
            <ActionBtn label="Monitor Full Chat →" size="sm"
              onClick={() => navigate(`/admin/projectstream/${d.projectId}`)} />
          </div>
        </SectionCard>
      )}

      {/* ── TIMELINE ── */}
      {activeTab === "timeline" && (
        <SectionCard title="Dispute Timeline (Auto-Generated)">
          <div className="relative">
            <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-gray-100" />
            <div className="space-y-4">
              {d.timeline.map((t, i) => {
                const cfg = timelineIcon[t.type] || timelineIcon.system;
                return (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm shrink-0 z-10 ${cfg.bg} ${cfg.text}`}>
                      {cfg.icon}
                    </div>
                    <div className="flex-1 pb-4 border-b border-gray-50 last:border-0">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-gray-800">{t.event}</p>
                        <span className="text-xs text-gray-400 shrink-0">{t.time}</span>
                      </div>
                      <p className="text-xs text-gray-500 mt-0.5">by {t.actor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── DECISION ── */}
      {activeTab === "decision" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <div className="space-y-5">
            {d.adminDecision ? (
              <div className="bg-green-50 border border-green-200 rounded-xl p-5">
                <p className="text-base font-bold text-green-800 mb-2">✓ Decision Already Made</p>
                <p className="text-sm text-green-700 mb-2">{d.adminDecision}</p>
                {d.adminNote && <p className="text-xs text-green-600 italic">Admin note: "{d.adminNote}"</p>}
              </div>
            ) : (
              <SectionCard title="Make Admin Decision">
                <div className="space-y-2 mb-4">
                  {[
                    { key: `Rule in favor of Client — Full refund (₹${d.amountDisputed.toLocaleString()})`,  label: "Rule in favor of Client — Full refund",     color: "green"  },
                    { key: `Rule in favor of ${d.talent.type} — Full release`,                               label: `Rule in favor of ${d.talent.type} — Full release`, color: "blue" },
                    { key: `Split — Follow AI verdict: ${d.aiVerdict}`,                                      label: `Split — Follow AI: ${d.aiVerdict}`,         color: "yellow" },
                    { key: "Request more evidence from both parties",                                         label: "Request more evidence",                      color: "orange" },
                    { key: "Mediation — schedule a meeting with both parties",                                label: "Mediation — schedule meeting",               color: "purple" },
                    { key: "Close dispute — no action required",                                              label: "Close — no action required",                 color: "gray"   },
                  ].map(opt => (
                    <button key={opt.key}
                      onClick={() => setDecision(decision === opt.key ? "" : opt.key)}
                      className={`w-full text-left px-3 py-2.5 rounded-lg border text-sm font-medium transition-colors ${
                        decision === opt.key
                          ? "border-green-400 bg-green-50 text-green-700"
                          : "border-gray-200 text-gray-700 hover:bg-gray-50"
                      }`}>
                      {decision === opt.key && <span className="mr-1.5">✓</span>}
                      {opt.label}
                    </button>
                  ))}
                </div>

                <div className="mb-4">
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">
                    Decision note (sent to both parties) *
                  </label>
                  <textarea
                    value={decisionNote}
                    onChange={e => setDecisionNote(e.target.value)}
                    placeholder="Explain your decision clearly — this will be sent to both the client and talent..."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
                    rows={4}
                  />
                </div>

                <button
                  onClick={confirmDecision}
                  disabled={!decision || !decisionNote.trim()}
                  className="w-full py-2.5 text-sm font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                >
                  Confirm & Send Decision
                </button>
              </SectionCard>
            )}
          </div>

          <SectionCard title="AI Analysis Summary">
            <div className="mb-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
              <div className="flex items-center justify-between mb-2">
                <p className="text-xs font-bold text-blue-800">AI Verdict</p>
                <span className={`text-xs font-bold ${d.aiConfidence >= 80 ? "text-green-600" : d.aiConfidence >= 60 ? "text-yellow-600" : "text-orange-600"}`}>
                  {d.aiConfidence}% confidence
                </span>
              </div>
              <p className="text-sm font-semibold text-blue-700 mb-2">{d.aiVerdict}</p>
              <p className="text-xs text-blue-700 leading-relaxed">{d.aiSummary}</p>
            </div>
            <div>
              <p className="text-xs font-semibold text-gray-500 mb-2">Suggested resolution</p>
              {[
                { label: "Escrow available",  value: d.escrowAvailable > 0 ? `₹${d.escrowAvailable.toLocaleString()}` : "None" },
                { label: "Amount disputed",   value: `₹${d.amountDisputed.toLocaleString()}` },
                { label: "Days open",         value: d.daysOpen > 0 ? `${d.daysOpen} days` : "Resolved" },
              ].map(item => (
                <div key={item.label} className="flex justify-between py-1.5 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400">{item.label}</span>
                  <span className="text-xs font-semibold text-gray-700">{item.value}</span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      )}
    </div>
  );
}

// ─── PAGE 2: /admin/disputes/pending — PENDING DECISIONS ──────────────────────
export function AdminDisputesPending() {
  const navigate = useNavigate();
  const pending = mockDisputes.filter(d => d.status === "Open" || d.status === "Under Review");

  return (
    <div className="p-6">
      <PageHeader
        title="Pending Decisions"
        subtitle="Disputes requiring admin decision — sorted by urgency"
        actions={<ActionBtn label="← All Disputes" onClick={() => navigate("/admin/disputes")} />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Awaiting Decision"  value={pending.length}                                      sub="Admin action needed" color="red"    />
        <StatCard label="High Priority"      value={pending.filter(d => d.priority === "High").length}   color="orange" />
        <StatCard label="AI Ready (≥80%)"    value={pending.filter(d => d.aiConfidence >= 80).length}    sub="Can auto-follow AI"  color="green"  />
        <StatCard label="Total at Stake"     value={`₹${(pending.reduce((s, d) => s + d.amountDisputed, 0) / 1000).toFixed(0)}k`} color="orange" />
      </div>

      {pending.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm py-20 text-center">
          <div className="w-14 h-14 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-4">
            <span className="text-green-500 text-2xl">✓</span>
          </div>
          <p className="text-gray-600 font-semibold text-base">No pending decisions</p>
          <p className="text-gray-400 text-sm mt-1">All disputes have been resolved</p>
        </div>
      ) : (
        <div className="space-y-4">
          {pending
            .sort((a, b) => {
              const priorityOrder = { High: 0, Medium: 1, Low: 2 };
              return priorityOrder[a.priority] - priorityOrder[b.priority];
            })
            .map(d => (
              <div key={d.id} className="bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all">
                <div className="p-5">
                  {/* Header */}
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2.5 flex-wrap mb-1">
                        <span className="text-xs font-mono font-semibold text-gray-400">{d.id}</span>
                        <h3 className="text-base font-bold text-gray-900">{d.project}</h3>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[d.status]}`}>{d.status}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[d.priority]}`}>{d.priority}</span>
                      </div>
                      <p className="text-xs text-gray-500">
                        {d.client.name} vs {d.talent.name} ({d.talent.type}) · Raised {d.raisedDate} · {d.daysOpen} days open
                      </p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-xl font-black text-orange-500">₹{(d.amountDisputed / 1000).toFixed(0)}k</p>
                      <p className="text-[10px] text-gray-400">disputed</p>
                    </div>
                  </div>

                  {/* AI Banner */}
                  <div className={`mb-4 p-3 rounded-xl border flex items-start gap-2.5 ${d.aiConfidence >= 80 ? "bg-green-50 border-green-100" : d.aiConfidence >= 60 ? "bg-yellow-50 border-yellow-100" : "bg-orange-50 border-orange-100"}`}>
                    <span className={`text-sm shrink-0 ${d.aiConfidence >= 80 ? "text-green-500" : d.aiConfidence >= 60 ? "text-yellow-500" : "text-orange-500"}`}>◎</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className={`text-xs font-bold ${d.aiConfidence >= 80 ? "text-green-800" : d.aiConfidence >= 60 ? "text-yellow-800" : "text-orange-800"}`}>
                          AI: {d.aiVerdict}
                        </span>
                        <div className="flex items-center gap-1">
                          <div className="w-16 h-1.5 bg-white/60 rounded-full overflow-hidden">
                            <div className={`h-full rounded-full ${d.aiConfidence >= 80 ? "bg-green-500" : d.aiConfidence >= 60 ? "bg-yellow-400" : "bg-orange-400"}`}
                              style={{ width: `${d.aiConfidence}%` }} />
                          </div>
                          <span className={`text-[10px] font-bold ${d.aiConfidence >= 80 ? "text-green-700" : d.aiConfidence >= 60 ? "text-yellow-700" : "text-orange-700"}`}>
                            {d.aiConfidence}%
                          </span>
                        </div>
                      </div>
                      <p className={`text-xs leading-relaxed line-clamp-2 ${d.aiConfidence >= 80 ? "text-green-700" : d.aiConfidence >= 60 ? "text-yellow-700" : "text-orange-700"}`}>
                        {d.aiSummary}
                      </p>
                    </div>
                  </div>

                  {/* Parties */}
                  <div className="grid grid-cols-2 gap-3 mb-4">
                    <div className="flex items-center gap-2 bg-green-50 rounded-lg p-2.5 border border-green-100">
                      <Avatar name={d.client.name} size="sm" />
                      <div>
                        <p className="text-[10px] text-gray-400">CLIENT</p>
                        <p className="text-xs font-semibold text-gray-800">{d.client.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                      <Avatar name={d.talent.name} size="sm" />
                      <div>
                        <p className="text-[10px] text-gray-400">{d.talent.type.toUpperCase()}</p>
                        <p className="text-xs font-semibold text-gray-800">{d.talent.name}</p>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-wrap">
                    <ActionBtn
                      label="Review & Decide"
                      variant="primary"
                      size="md"
                      onClick={() => navigate(`/admin/disputes/${d.id}`)}
                    />
                    <ActionBtn
                      label="Follow AI Verdict"
                      variant={d.aiConfidence >= 80 ? "primary" : "default"}
                      size="md"
                      onClick={() => navigate(`/admin/disputes/${d.id}`)}
                    />
                    <ActionBtn
                      label="View Project"
                      size="md"
                      onClick={() => navigate(`/admin/projects/${d.projectId}`)}
                    />
                    <ActionBtn
                      label="Monitor Chat"
                      size="md"
                      onClick={() => navigate(`/admin/projectstream/${d.projectId}`)}
                    />
                    <div className="ml-auto flex items-center gap-1.5 text-xs text-gray-400">
                      <span>{d.evidence.length} evidence files</span>
                      <span>·</span>
                      <span>{d.messages.length} messages</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
}