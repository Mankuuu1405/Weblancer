import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, ActionBtn, PageHeader,
  SectionCard, InfoRow, SearchBar, FilterSelect
} from "./AdminComponents";

/* ── Freelancer Contracts theme tokens ───────────────────────
   GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
   NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
   ──────────────────────────────────────────────────────────── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",

  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
};
const FONT = "'Poppins', sans-serif";

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};
const btnGreen = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradGreen, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 2px 10px rgba(46,125,31,0.22)",
  whiteSpace: "nowrap",
};
const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  borderRadius: 100, padding: "8px 18px", cursor: "pointer",
  whiteSpace: "nowrap",
};
const btnWarning = {
  ...btnOutline,
  background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`,
};
const btnDanger = {
  ...btnOutline,
  background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
};


// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockAdmins = [
  {
    id: "ADM-001",
    name: "Prerna Sharma",
    email: "prerna@weblance.com",
    role: "Super Admin",
    status: "Active",
    lastLogin: "Mar 14, 2026 · 10:32 AM",
    lastLoginIp: "192.168.1.1",
    joinedDate: "Jan 1, 2025",
    twoFA: true,
    actionsToday: 12,
    totalActions: 847,
    permissions: ["Full Access"],
    avatar: "PS",
  },
  {
    id: "ADM-002",
    name: "Rahul Kapoor",
    email: "rahul.admin@weblance.com",
    role: "Platform Admin",
    status: "Active",
    lastLogin: "Mar 14, 2026 · 09:15 AM",
    lastLoginIp: "192.168.1.2",
    joinedDate: "Mar 15, 2025",
    twoFA: true,
    actionsToday: 8,
    totalActions: 412,
    permissions: ["Users", "Projects", "Disputes", "KYC"],
    avatar: "RK",
  },
  {
    id: "ADM-003",
    name: "Sneha Verma",
    email: "sneha.finance@weblance.com",
    role: "Finance Admin",
    status: "Active",
    lastLogin: "Mar 13, 2026 · 04:45 PM",
    lastLoginIp: "192.168.1.4",
    joinedDate: "Jun 1, 2025",
    twoFA: true,
    actionsToday: 3,
    totalActions: 289,
    permissions: ["Payments", "Escrow", "Payouts", "Commission"],
    avatar: "SV",
  },
  {
    id: "ADM-004",
    name: "Dev Kumar",
    email: "dev.support@weblance.com",
    role: "Support Admin",
    status: "Active",
    lastLogin: "Mar 12, 2026 · 02:10 PM",
    lastLoginIp: "192.168.1.3",
    joinedDate: "Sep 10, 2025",
    twoFA: false,
    actionsToday: 5,
    totalActions: 134,
    permissions: ["Users (read)", "Disputes (read)", "KYC (read)"],
    avatar: "DK",
  },
  {
    id: "ADM-005",
    name: "Ananya Mishra",
    email: "ananya.aiops@weblance.com",
    role: "AI Ops Admin",
    status: "Inactive",
    lastLogin: "Feb 28, 2026 · 11:00 AM",
    lastLoginIp: "192.168.1.5",
    joinedDate: "Nov 5, 2025",
    twoFA: true,
    actionsToday: 0,
    totalActions: 67,
    permissions: ["AI Settings", "AI Logs", "AI Overrides"],
    avatar: "AM",
  },
];

const mockRoles = [
  {
    id: "ROLE-001",
    name: "Super Admin",
    color: "bg-red-500",
    desc: "Full platform access — all features, all data, all controls",
    admins: 1,
    permissions: {
      "User Management": { view: true, edit: true, delete: true },
      "KYC Verification": { view: true, edit: true, delete: true },
      "Projects": { view: true, edit: true, delete: true },
      "Disputes": { view: true, edit: true, delete: true },
      "Payments & Escrow": { view: true, edit: true, delete: true },
      "AI Settings": { view: true, edit: true, delete: true },
      "Audit Logs": { view: true, edit: false, delete: false },
      "Admin Management": { view: true, edit: true, delete: true },
      "Announcements": { view: true, edit: true, delete: true },
      "Platform Settings": { view: true, edit: true, delete: true },
    },
  },
  {
    id: "ROLE-002",
    name: "Platform Admin",
    color: "bg-green-500",
    desc: "Manages users, projects, disputes & KYC — no financial controls",
    admins: 1,
    permissions: {
      "User Management": { view: true, edit: true, delete: false },
      "KYC Verification": { view: true, edit: true, delete: false },
      "Projects": { view: true, edit: true, delete: false },
      "Disputes": { view: true, edit: true, delete: false },
      "Payments & Escrow": { view: true, edit: false, delete: false },
      "AI Settings": { view: false, edit: false, delete: false },
      "Audit Logs": { view: true, edit: false, delete: false },
      "Admin Management": { view: false, edit: false, delete: false },
      "Announcements": { view: true, edit: true, delete: false },
      "Platform Settings": { view: true, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-003",
    name: "Finance Admin",
    color: "bg-blue-500",
    desc: "Controls all financial operations — escrow, payouts, commission",
    admins: 1,
    permissions: {
      "User Management": { view: true, edit: false, delete: false },
      "KYC Verification": { view: true, edit: true, delete: false },
      "Projects": { view: true, edit: false, delete: false },
      "Disputes": { view: true, edit: false, delete: false },
      "Payments & Escrow": { view: true, edit: true, delete: false },
      "AI Settings": { view: false, edit: false, delete: false },
      "Audit Logs": { view: true, edit: false, delete: false },
      "Admin Management": { view: false, edit: false, delete: false },
      "Announcements": { view: false, edit: false, delete: false },
      "Platform Settings": { view: false, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-004",
    name: "Support Admin",
    color: "bg-yellow-500",
    desc: "Read-only access to users, disputes & KYC for support purposes",
    admins: 1,
    permissions: {
      "User Management": { view: true, edit: false, delete: false },
      "KYC Verification": { view: true, edit: false, delete: false },
      "Projects": { view: true, edit: false, delete: false },
      "Disputes": { view: true, edit: false, delete: false },
      "Payments & Escrow": { view: false, edit: false, delete: false },
      "AI Settings": { view: false, edit: false, delete: false },
      "Audit Logs": { view: true, edit: false, delete: false },
      "Admin Management": { view: false, edit: false, delete: false },
      "Announcements": { view: false, edit: false, delete: false },
      "Platform Settings": { view: false, edit: false, delete: false },
    },
  },
  {
    id: "ROLE-005",
    name: "AI Ops Admin",
    color: "bg-purple-500",
    desc: "Manages AI thresholds, reviews AI decisions & overrides",
    admins: 1,
    permissions: {
      "User Management": { view: true, edit: false, delete: false },
      "KYC Verification": { view: false, edit: false, delete: false },
      "Projects": { view: true, edit: false, delete: false },
      "Disputes": { view: true, edit: false, delete: false },
      "Payments & Escrow": { view: false, edit: false, delete: false },
      "AI Settings": { view: true, edit: true, delete: false },
      "Audit Logs": { view: true, edit: false, delete: false },
      "Admin Management": { view: false, edit: false, delete: false },
      "Announcements": { view: false, edit: false, delete: false },
      "Platform Settings": { view: false, edit: false, delete: false },
    },
  },
];

const mockAuditLogs = [
  { id: "LOG-001", actor: "Super Admin", actorType: "Admin", action: "Suspended account", target: "Priya Menon (FL-004)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 11:42 AM", ip: "192.168.1.1", reason: "High dispute rate + repeated delivery failure" },
  { id: "LOG-002", actor: "AI System", actorType: "AI", action: "Auto-flagged account", target: "FakeUser999 (CL-005)", category: "User", severity: "High", timestamp: "Mar 14, 2026 · 09:15 AM", ip: "system", reason: "Suspicious signup pattern detected" },
  { id: "LOG-003", actor: "Finance Admin", actorType: "Admin", action: "Frozen escrow payment", target: "PAY-007 — Vikram Singh", category: "Payment", severity: "High", timestamp: "Mar 13, 2026 · 03:22 PM", ip: "192.168.1.4", reason: "Dispute DSP-002 raised — payment frozen" },
  { id: "LOG-004", actor: "AI System", actorType: "AI", action: "Auto-reduced visibility", target: "Priya Menon (FL-004)", category: "User", severity: "Medium", timestamp: "Mar 12, 2026 · 07:00 AM", ip: "system", reason: "Dispute rate crossed 30% threshold" },
  { id: "LOG-005", actor: "Platform Admin", actorType: "Admin", action: "Warning message sent", target: "Vikram Singh (CL-002)", category: "User", severity: "Medium", timestamp: "Feb 14, 2026 · 02:10 PM", ip: "192.168.1.2", reason: "Off-platform contact attempt detected" },
  { id: "LOG-006", actor: "AI System", actorType: "AI", action: "Auto-approved milestone", target: "PRJ-004 — Milestone 5", category: "Project", severity: "Low", timestamp: "Feb 28, 2026 · 08:00 AM", ip: "system", reason: "Client silent for 7 days — auto-approval triggered" },
  { id: "LOG-007", actor: "Finance Admin", actorType: "Admin", action: "Milestone released", target: "PAY-002 — TechNova Solutions", category: "Payment", severity: "Low", timestamp: "Feb 15, 2026 · 04:45 PM", ip: "192.168.1.4", reason: "Milestone 1 approved by client" },
  { id: "LOG-008", actor: "Super Admin", actorType: "Admin", action: "AI confidence threshold updated", target: "AI Settings — confidence: 85% → 90%", category: "AI", severity: "Medium", timestamp: "Feb 10, 2026 · 11:00 AM", ip: "192.168.1.1", reason: "Increased to reduce false positives" },
  { id: "LOG-009", actor: "AI System", actorType: "AI", action: "Dispute pre-analysis completed", target: "DSP-001 — E-Commerce Revamp", category: "Dispute", severity: "Medium", timestamp: "Mar 10, 2026 · 05:30 PM", ip: "system", reason: "AI verdict: Partial fault — Freelancer (71%)" },
  { id: "LOG-010", actor: "Support Admin", actorType: "Admin", action: "KYC manually verified", target: "BuildRight Agency (AG-002)", category: "User", severity: "Low", timestamp: "Jul 14, 2024 · 10:00 AM", ip: "192.168.1.3", reason: "Documents reviewed and approved" },
  { id: "LOG-011", actor: "Super Admin", actorType: "Admin", action: "New admin invited", target: "Ananya Mishra — AI Ops Admin", category: "Admin", severity: "Medium", timestamp: "Nov 5, 2025 · 09:00 AM", ip: "192.168.1.1", reason: "New AI operations role created" },
  { id: "LOG-012", actor: "Platform Admin", actorType: "Admin", action: "Project frozen", target: "PRJ-006 — Mobile Banking App", category: "Project", severity: "High", timestamp: "Mar 8, 2026 · 06:00 PM", ip: "192.168.1.2", reason: "Active dispute — chat frozen pending resolution" },
  { id: "LOG-013", actor: "Super Admin", actorType: "Admin", action: "Commission rate confirmed", target: "Platform Settings — Rate: 6%", category: "Admin", severity: "Low", timestamp: "Jan 1, 2026 · 12:00 PM", ip: "192.168.1.1", reason: "Annual rate review — no change" },
  { id: "LOG-014", actor: "AI System", actorType: "AI", action: "Agency overload detected", target: "TechNova Solutions (AG-001)", category: "User", severity: "Medium", timestamp: "Mar 7, 2026 · 07:00 AM", ip: "system", reason: "Team capacity at 95% — project limit warning" },
  { id: "LOG-015", actor: "Finance Admin", actorType: "Admin", action: "Payout approved", target: "Arjun Dev (FL-002) — ₹85,000", category: "Payment", severity: "Low", timestamp: "Mar 13, 2026 · 10:00 AM", ip: "192.168.1.4", reason: "KYC verified — standard withdrawal approved" },
];

const severityStyle = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low: "bg-gray-50 text-gray-500 border border-gray-200",
};

const categoryIcon = {
  User: "◉", Payment: "⊕", Project: "⊟",
  Dispute: "⚑", AI: "◎", Admin: "⊞",
};

const categoryIconBg = {
  User: "bg-green-100 text-green-600", Payment: "bg-blue-100 text-blue-600",
  Project: "bg-purple-100 text-purple-600", Dispute: "bg-red-100 text-red-600",
  AI: "bg-orange-100 text-orange-600", Admin: "bg-gray-100 text-gray-600",
};

const roleColor = {
  "Super Admin": "bg-red-500",
  "Platform Admin": "bg-green-500",
  "Finance Admin": "bg-blue-500",
  "Support Admin": "bg-yellow-500",
  "AI Ops Admin": "bg-purple-500",
};

const roleBadgeStyle = {
  "Super Admin": "bg-red-50 text-red-700 border border-red-200",
  "Platform Admin": "bg-green-50 text-green-700 border border-green-200",
  "Finance Admin": "bg-blue-50 text-blue-700 border border-blue-200",
  "Support Admin": "bg-yellow-50 text-yellow-700 border border-yellow-200",
  "AI Ops Admin": "bg-purple-50 text-purple-700 border border-purple-200",
};

// ─── PAGE 1: /admin/admins — ADMIN ACCOUNTS LIST ─────────────────────────────
export function AdminAdmins() {
  const navigate = useNavigate();
  const [admins, setAdmins] = useState(mockAdmins);
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [selected, setSelected] = useState(null);
  const [showInvite, setShowInvite] = useState(false);
  const [inviteForm, setInviteForm] = useState({ name: "", email: "", role: "Platform Admin" });

  const filtered = admins.filter((a) => {
    const q = search.toLowerCase();
    return (
      (a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)) &&
      (!roleFilter || a.role === roleFilter)
    );
  });

  const handleInvite = () => {
    if (!inviteForm.name || !inviteForm.email) return;
    setAdmins(prev => [...prev, {
      id: `ADM-00${prev.length + 1}`,
      name: inviteForm.name,
      email: inviteForm.email,
      role: inviteForm.role,
      status: "Pending",
      lastLogin: "Never",
      lastLoginIp: "—",
      joinedDate: "Mar 14, 2026",
      twoFA: false,
      actionsToday: 0,
      totalActions: 0,
      permissions: [],
      avatar: inviteForm.name.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase(),
    }]);
    setInviteForm({ name: "", email: "", role: "Platform Admin" });
    setShowInvite(false);
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Admin Accounts"
        subtitle="Manage all admin users, their roles & access levels"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="Role Management →" onClick={() => navigate("/admin/admins/roles")} style={btnNavy} />
            <ActionBtn label="+ Invite Admin" variant="primary" size="md" onClick={() => setShowInvite(true)} style={btnOutline}/>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Admins" value={admins.length} color="gray"  border="gray" bg="gray"/>
        <StatCard label="Active" value={admins.filter(a => a.status === "Active").length} color="green" border="green" bg="green"/>
        <StatCard label="2FA Enabled" value={admins.filter(a => a.twoFA).length} sub={`${admins.filter(a => !a.twoFA).length} without 2FA`} color="blue" border="blue" bg="blue"/>
        <StatCard label="Actions Today" value={admins.reduce((s, a) => s + a.actionsToday, 0)} color="orange" border="orange" bg="orange" />
      </div>

      <div className="flex gap-5">
        {/* Admin List */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
              <SearchBar value={search} onChange={setSearch} placeholder="Search admin name, email...">
                <FilterSelect value={roleFilter} onChange={setRoleFilter} label="All Roles"
                  options={mockRoles.map(r => ({ value: r.name, label: r.name }))} />
              </SearchBar>
              <span className="text-xs text-gray-400">{filtered.length} admins</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filtered.map((admin) => (
                <div
                  key={admin.id}
                  onClick={() => setSelected(selected?.id === admin.id ? null : admin)}
                  className={`flex items-center gap-4 px-5 py-4 cursor-pointer transition-colors hover:bg-gray-50/50 ${selected?.id === admin.id ? "bg-green-50/40" : ""}`}
                >
                  {/* Avatar */}
                  <div className={`w-10 h-10 rounded-full ${roleColor[admin.role] || "bg-gray-400"} flex items-center justify-center text-white text-sm font-bold shrink-0`}>
                    {admin.avatar}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-0.5">
                      <p className="text-sm font-bold text-gray-800">{admin.name}</p>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${roleBadgeStyle[admin.role]}`}>
                        {admin.role}
                      </span>
                      {!admin.twoFA && (
                        <span className="text-[10px] bg-orange-50 text-orange-600 border border-orange-200 px-1.5 py-0.5 rounded-full font-semibold">
                          ⚠ No 2FA
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-400">{admin.email}</p>
                    <p className="text-[10px] text-gray-300 mt-0.5">Last login: {admin.lastLogin}</p>
                  </div>

                  {/* Stats */}
                  <div className="flex items-center gap-6 shrink-0">
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700">{admin.actionsToday}</p>
                      <p className="text-[10px] text-gray-400">Today</p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-bold text-gray-700">{admin.totalActions}</p>
                      <p className="text-[10px] text-gray-400">Total</p>
                    </div>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${admin.status === "Active" ? "bg-green-50 text-green-600 border border-green-200" : admin.status === "Pending" ? "bg-yellow-50 text-yellow-600 border border-yellow-200" : "bg-gray-50 text-gray-500 border border-gray-200"}`}>
                      {admin.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Detail / Invite Panel */}
        <div className="w-72 shrink-0">
          {showInvite ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Invite Admin</h3>
                <button onClick={() => setShowInvite(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Full Name *</label>
                  <input value={inviteForm.name} onChange={e => setInviteForm({ ...inviteForm, name: e.target.value })}
                    placeholder="Admin full name"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Email *</label>
                  <input value={inviteForm.email} onChange={e => setInviteForm({ ...inviteForm, email: e.target.value })}
                    placeholder="admin@weblance.com"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Assign Role</label>
                  <select value={inviteForm.role} onChange={e => setInviteForm({ ...inviteForm, role: e.target.value })}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 text-gray-700">
                    {mockRoles.map(r => <option key={r.id} value={r.name}>{r.name}</option>)}
                  </select>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-500 font-semibold mb-1">Role permissions</p>
                  <p className="text-xs text-gray-400">{mockRoles.find(r => r.name === inviteForm.role)?.desc}</p>
                </div>
                <div className="flex gap-2">
                  <ActionBtn label="Cancel" onClick={() => setShowInvite(false)} />
                  <button onClick={handleInvite} disabled={!inviteForm.name || !inviteForm.email}
                    className="flex-1 py-2 text-sm font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40">
                    Send Invite
                  </button>
                </div>
              </div>
            </div>
          ) : selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Admin Detail</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-3">
                  <div className={`w-12 h-12 rounded-full ${roleColor[selected.role] || "bg-gray-400"} flex items-center justify-center text-white text-base font-bold shrink-0`}>
                    {selected.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{selected.name}</p>
                    <p className="text-xs text-gray-400">{selected.email}</p>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full mt-1 inline-block ${roleBadgeStyle[selected.role]}`}>
                      {selected.role}
                    </span>
                  </div>
                </div>

                <SectionCard title="Account Info">
                  <InfoRow label="Admin ID" value={selected.id} />
                  <InfoRow label="Joined" value={selected.joinedDate} />
                  <InfoRow label="Status" value={<span className={`text-xs font-semibold ${selected.status === "Active" ? "text-green-600" : "text-gray-500"}`}>{selected.status}</span>} />
                  <InfoRow label="2FA" value={selected.twoFA ? <span className="text-green-600 font-semibold text-xs">Enabled ✓</span> : <span className="text-red-500 font-semibold text-xs">Disabled ⚠</span>} />
                  <InfoRow label="Last Login" value={selected.lastLogin} />
                  <InfoRow label="Login IP" value={selected.lastLoginIp} />
                  <InfoRow label="Today" value={`${selected.actionsToday} actions`} />
                  <InfoRow label="Total" value={`${selected.totalActions} actions`} />
                </SectionCard>

                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-2">Permissions</p>
                  <div className="flex flex-wrap gap-1.5">
                    {selected.permissions.map(p => (
                      <span key={p} className="text-[11px] bg-gray-50 text-gray-600 border border-gray-200 px-2 py-0.5 rounded-full">{p}</span>
                    ))}
                  </div>
                </div>

                <div className="space-y-2 pt-2">
                  {[
                    { label: "Change Role", variant: "default" },
                    { label: "Force 2FA Reset", variant: "default" },
                    { label: "Force Logout", variant: "warning" },
                    { label: "Deactivate Account", variant: "danger" },
                  ].map(a => (
                    <button key={a.label} className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium border transition-colors ${a.variant === "danger" ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" : a.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                      {a.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center sticky top-6">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-3">
                <span className="text-gray-400">👤</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Select an admin to view details</p>
              <ActionBtn label="+ Invite Admin" variant="primary" style={btnNavy} onClick={() => setShowInvite(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 2: /admin/admins/roles — ROLE MANAGEMENT ───────────────────────────
export function AdminRoles() {
  const navigate = useNavigate();
  const [selectedRole, setSelectedRole] = useState(mockRoles[0]);
  const [editMode, setEditMode] = useState(false);
  const [permissions, setPermissions] = useState(selectedRole.permissions);

  const selectRole = (role) => {
    setSelectedRole(role);
    setPermissions(role.permissions);
    setEditMode(false);
  };

  const togglePerm = (resource, type) => {
    setPermissions(prev => ({
      ...prev,
      [resource]: { ...prev[resource], [type]: !prev[resource][type] },
    }));
  };

  const permResources = Object.keys(mockRoles[0].permissions);

  return (
    <div className="p-6">
      <PageHeader
        title="Role Management"
        subtitle="Define and manage permission levels for each admin role"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="← Admin Accounts" style={btnNavy} onClick={() => navigate("/admin/admins")} />
            <ActionBtn label="+ Create Role" variant="primary" size="md" style={btnOutline} />
          </div>
        }
      />

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">
        {/* Roles List */}
        <div className="space-y-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Roles ({mockRoles.length})</p>
          {mockRoles.map(role => (
            <div
              key={role.id}
              onClick={() => selectRole(role)}
              className={`bg-white rounded-xl border cursor-pointer transition-all p-4 hover:shadow-md ${selectedRole.id === role.id ? "border-green-300 shadow-md ring-1 ring-green-200" : "border-gray-100 shadow-sm"}`}
            >
              <div className="flex items-center gap-3 mb-2">
                <div className={`w-8 h-8 rounded-lg ${role.color} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
                  {role.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-800">{role.name}</p>
                  <p className="text-[10px] text-gray-400">{role.admins} admin{role.admins !== 1 ? "s" : ""}</p>
                </div>
              </div>
              <p className="text-[11px] text-gray-500 leading-relaxed">{role.desc}</p>
            </div>
          ))}
        </div>

        {/* Permission Matrix */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg ${selectedRole.color} flex items-center justify-center text-white text-xs font-bold`}>
                  {selectedRole.name.split(" ").map(n => n[0]).join("").slice(0, 2)}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-gray-900">{selectedRole.name}</h3>
                  <p className="text-xs text-gray-400">{selectedRole.desc}</p>
                </div>
              </div>
              <div className="flex gap-2">
                {editMode ? (
                  <>
                    <ActionBtn label="Cancel" style={btnOutline} onClick={() => { setEditMode(false); setPermissions(selectedRole.permissions); }} />
                    <ActionBtn label="Save Changes" variant="primary" style={btnNavy} onClick={() => setEditMode(false)} />
                  </>
                ) : (
                  <ActionBtn label="Edit Permissions" variant="primary" style={btnNavy} onClick={() => setEditMode(true)} />
                )}
              </div>
            </div>

            {/* Matrix */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="text-left text-xs font-semibold text-gray-500 px-5 py-3 w-48">Resource</th>
                    {["view", "edit", "delete"].map(col => (
                      <th key={col} className="text-center text-xs font-semibold text-gray-500 px-4 py-3 capitalize">{col}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {permResources.map((resource, i) => (
                    <tr key={resource} className={`border-b border-gray-50 last:border-0 ${i % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                      <td className="px-5 py-3">
                        <div className="flex items-center gap-2">
                          <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs ${categoryIconBg[resource.split(" ")[0]] || "bg-gray-100 text-gray-500"}`}>
                            {categoryIcon[resource.split(" ")[0]] || "◈"}
                          </span>
                          <span className="text-sm font-medium text-gray-700">{resource}</span>
                        </div>
                      </td>
                      {["view", "edit", "delete"].map(type => (
                        <td key={type} className="px-4 py-3 text-center">
                          {editMode ? (
                            <button
                              onClick={() => togglePerm(resource, type)}
                              className={`w-6 h-6 rounded-full flex items-center justify-center mx-auto transition-colors ${permissions[resource]?.[type] ? "bg-green-500 text-white" : "bg-gray-100 text-gray-300 hover:bg-gray-200"}`}
                            >
                              {permissions[resource]?.[type] ? "✓" : "✕"}
                            </button>
                          ) : (
                            <span className={`text-lg ${permissions[resource]?.[type] ? "text-green-500" : "text-gray-200"}`}>
                              {permissions[resource]?.[type] ? "✓" : "✕"}
                            </span>
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Legend */}
            <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
              <div className="flex items-center gap-6 flex-wrap">
                <p className="text-xs font-semibold text-gray-500">Legend:</p>
                {[
                  { label: "View — Can see this section", color: "text-green-500" },
                  { label: "Edit — Can make changes", color: "text-green-500" },
                  { label: "Delete — Can remove data", color: "text-red-400" },
                ].map(l => (
                  <span key={l.label} className={`text-xs ${l.color}`}>{l.label}</span>
                ))}
                <span className="text-xs text-gray-300 ml-auto">✕ = No access &nbsp; ✓ = Has access</span>
              </div>
            </div>
          </div>

          {/* Assigned Admins */}
          <div className="mt-5 bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3.5 border-b border-gray-100">
              <h3 className="text-sm font-semibold text-gray-800">
                Admins with this role ({mockAdmins.filter(a => a.role === selectedRole.name).length})
              </h3>
            </div>
            <div className="p-4">
              {mockAdmins.filter(a => a.role === selectedRole.name).length === 0 ? (
                <p className="text-sm text-gray-400 text-center py-4">No admins assigned to this role</p>
              ) : (
                <div className="flex flex-wrap gap-3">
                  {mockAdmins.filter(a => a.role === selectedRole.name).map(admin => (
                    <div key={admin.id} className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                      <div className={`w-7 h-7 rounded-full ${roleColor[admin.role]} flex items-center justify-center text-white text-[10px] font-bold shrink-0`}>
                        {admin.avatar}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-800">{admin.name}</p>
                        <p className="text-[10px] text-gray-400">{admin.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 3: /admin/audit-logs — ALL AUDIT LOGS ───────────────────────────────
export function AdminAuditLogsPage() {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategory] = useState("");
  const [severityFilter, setSeverity] = useState("");
  const [actorFilter, setActor] = useState("");
  const [dateFilter, setDate] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = mockAuditLogs.filter(l => {
    const q = search.toLowerCase();
    return (
      (l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q) || l.actor.toLowerCase().includes(q) || l.id.toLowerCase().includes(q)) &&
      (!categoryFilter || l.category === categoryFilter) &&
      (!severityFilter || l.severity === severityFilter) &&
      (!actorFilter || l.actorType === actorFilter)
    );
  });


  return (
    <div className="p-6">
      <PageHeader
        title="Audit Logs"
        subtitle="Immutable record of every action — human or AI — on the platform"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="⬇ Export Logs" style={btnNavy} />
            <ActionBtn label="📋 Compliance Report" variant="primary" size="md" style={btnOutline}/>
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
        <StatCard label="Total Logs" value={mockAuditLogs.length} color="gray" />
        <StatCard label="Admin Actions" value={mockAuditLogs.filter(l => l.actorType === "Admin").length} color="green" border="green" bg="green" />
        <StatCard label="AI Actions" value={mockAuditLogs.filter(l => l.actorType === "AI").length} color="blue" border="blue" bg="blue"/>
        <StatCard label="High Severity" value={mockAuditLogs.filter(l => l.severity === "High").length} color="red" border="red" bg="red" />
        <StatCard label="Today" value={mockAuditLogs.filter(l => l.timestamp.includes("Mar 14")).length} color="orange" border="orange" bg="orange" />
      </div>

      {/* Immutability Banner */}
      <div className="bg-gray-50 border border-gray-200 rounded-xl p-3 mb-5 flex items-center gap-3">
        <span className="text-gray-400 text-sm shrink-0">🔒</span>
        <p className="text-xs text-gray-500">
          Audit logs are <strong className="text-gray-700">immutable</strong> — no entry can be edited or deleted. All records are cryptographically signed and retained for legal compliance.
        </p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search action, target, actor, ID...">
            <FilterSelect value={categoryFilter} onChange={setCategory} label="All Categories"
              options={["User", "Payment", "Project", "Dispute", "AI", "Admin"].map(v => ({ value: v, label: v }))} />
            <FilterSelect value={severityFilter} onChange={setSeverity} label="All Severity"
              options={[{ value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }]} />
            <FilterSelect value={actorFilter} onChange={setActor} label="All Actors"
              options={[{ value: "Admin", label: "Admin" }, { value: "AI", label: "AI System" }]} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} of {mockAuditLogs.length} logs</span>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map(log => (
            <div key={log.id} className="hover:bg-gray-50/50 transition-colors">
              <div
                className="flex items-start gap-4 p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}
              >
                {/* Category icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${categoryIconBg[log.category] || "bg-gray-100 text-gray-500"}`}>
                  <span className="text-sm">{categoryIcon[log.category] || "◈"}</span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${log.actorType === "AI" ? "bg-blue-50 text-blue-700 border border-blue-200" : "bg-green-50 text-green-700 border border-green-200"}`}>
                      {log.actorType === "AI" ? "◎ AI" : "👤 Admin"}
                    </span>
                    <span className="text-sm font-semibold text-gray-800">{log.action}</span>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${severityStyle[log.severity]}`}>
                      {log.severity}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 truncate">
                    <span className="font-medium text-gray-600">{log.actor}</span>
                    <span className="text-gray-400"> → </span>
                    {log.target}
                  </p>
                </div>

                {/* Right */}
                <div className="text-right shrink-0">
                  <p className="text-xs text-gray-400">{log.timestamp}</p>
                  <p className="text-[10px] text-gray-300 mt-0.5">{log.id}</p>
                </div>

                <span className={`text-gray-400 text-xs mt-1.5 shrink-0 transition-transform ${expanded === log.id ? "rotate-90" : ""}`}>▶</span>
              </div>

              {/* Expanded detail */}
              {expanded === log.id && (
                <div className="px-4 pb-4 ml-12">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4">
                    <div className="grid grid-cols-2 gap-x-8 gap-y-2">
                      {[
                        { label: "Log ID", value: log.id },
                        { label: "Actor", value: `${log.actor} (${log.actorType})` },
                        { label: "Action", value: log.action },
                        { label: "Target", value: log.target },
                        { label: "Category", value: log.category },
                        { label: "Severity", value: log.severity },
                        { label: "IP Address", value: log.ip },
                        { label: "Timestamp", value: log.timestamp },
                      ].map(item => (
                        <div key={item.label} className="flex items-start gap-2">
                          <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide w-20 shrink-0 pt-0.5">{item.label}</span>
                          <span className="text-xs text-gray-700 font-medium">{item.value}</span>
                        </div>
                      ))}
                    </div>
                    <div className="mt-3 pt-3 border-t border-gray-200">
                      <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide">Reason: </span>
                      <span className="text-xs text-gray-700">{log.reason}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No logs match your filters</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockAuditLogs.length} entries</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs rounded-2xl border border-gray-500 text-gray-600 hover:bg-gray-50" >← Prev</button>
            <button className="px-3 py-1.5 text-xs rounded-2xl border border-gray-500 text-gray-600 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}