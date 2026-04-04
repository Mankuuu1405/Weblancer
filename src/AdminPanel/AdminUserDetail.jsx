import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockUsers } from "./mockData";
import { StatusBadge, TrustScore, RiskFlag } from "./AdminComponents";
import {
  ArrowLeft, AlertTriangle, ShieldOff, UserX, RefreshCw,
  MessageSquare, MoreHorizontal, User, Activity, DollarSign,
  ShieldCheck, Clock, Calendar, Mail, Globe, Key,
  CheckCircle, XCircle, Download, Send, Pencil
} from "lucide-react";

// ── Theme ────────────────────────────────────────────────────────────────────
const T = {
  navy:     "#0d1b3e",
  teal:     "#1ab5c8",
  green:    "#3ddc84",
  greenTeal:"linear-gradient(135deg, #3ddc84 0%, #1ab5c8 100%)",
  navyTeal: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
  bg:       "#f0f4ff",
  white:    "#ffffff",
  border:   "#eaeef6",
  muted:    "#8a9ab5",
  textDark: "#0d1b3e",
  textMid:  "#4a5e7a",
};

// ── Btn ───────────────────────────────────────────────────────────────────────
function Btn({ label, icon: Icon, onClick, variant = "default", size = "md" }) {
  const map = {
    primary: { bg: T.greenTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(61,220,132,0.3)" },
    danger:  { bg: "linear-gradient(135deg,#ff4e4e,#e02020)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(255,78,78,0.3)" },
    warning: { bg: "linear-gradient(135deg,#f59e0b,#d97706)", color: "#fff", border: "none", shadow: "0 2px 8px rgba(245,158,11,0.3)" },
    navy:    { bg: T.navyTeal, color: "#fff", border: "none", shadow: "0 2px 8px rgba(10,36,68,0.2)" },
    default: { bg: T.white, color: T.textMid, border: `1px solid ${T.border}`, shadow: "none" },
  };
  const s = map[variant] || map.default;
  const pad = size === "sm" ? "5px 11px" : size === "lg" ? "10px 20px" : "7px 14px";
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 6,
        padding: pad, borderRadius: 8, cursor: "pointer",
        fontSize: size === "sm" ? 11 : size === "lg" ? 14 : 12,
        fontWeight: 600, whiteSpace: "nowrap",
        background: s.bg, color: s.color, border: s.border,
        boxShadow: s.shadow, transition: "opacity 0.15s",
        fontFamily: "'DM Sans','Segoe UI',sans-serif",
      }}
      onMouseOver={e => e.currentTarget.style.opacity = "0.85"}
      onMouseOut={e => e.currentTarget.style.opacity = "1"}
    >
      {Icon && <Icon size={size === "sm" ? 12 : 14} />}
      {label}
    </button>
  );
}

// ── Section Card ──────────────────────────────────────────────────────────────
function SectionCard({ title, children, action }) {
  return (
    <div style={{
      background: T.white, borderRadius: 14,
      border: `1px solid ${T.border}`,
      boxShadow: "0 2px 8px rgba(10,36,68,0.05)",
      overflow: "hidden",
    }}>
      <div style={{
        padding: "14px 18px", borderBottom: `1px solid ${T.border}`,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: "#f8faff",
      }}>
        <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{title}</span>
        {action}
      </div>
      <div style={{ padding: "16px 18px" }}>{children}</div>
    </div>
  );
}

// ── Info Row ──────────────────────────────────────────────────────────────────
function InfoRow({ label, value, icon: Icon }) {
  return (
    <div style={{
      display: "flex", alignItems: "center", justifyContent: "space-between",
      padding: "9px 0", borderBottom: `1px solid ${T.border}`,
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        {Icon && <Icon size={13} color={T.muted} />}
        <span style={{ fontSize: 12, color: T.muted, fontWeight: 500 }}>{label}</span>
      </div>
      <span style={{ fontSize: 13, fontWeight: 600, color: T.navy }}>{value}</span>
    </div>
  );
}

// ── Avatar ────────────────────────────────────────────────────────────────────
function UserAvatar({ name, size = 52 }) {
  const initials = name.split(" ").map(w => w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: T.navyTeal,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: size * 0.28, fontWeight: 800, color: "#fff", flexShrink: 0,
      border: "3px solid #fff",
      boxShadow: "0 4px 16px rgba(10,36,68,0.18)",
    }}>{initials}</div>
  );
}

// ── Main ──────────────────────────────────────────────────────────────────────
export default function AdminUserDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote]           = useState("");
  const [activeTab, setActiveTab] = useState("overview");
  const [notes, setNotes]         = useState([
    { text: "Account flagged for duplicate signup attempt. Monitoring.", admin: "Super Admin", date: "Mar 10, 2026" },
  ]);

  const user = mockUsers.find(u => u.id === id);

  if (!user) return (
    <div style={{ padding: 48, textAlign: "center", fontFamily: "'DM Sans',sans-serif" }}>
      <p style={{ color: T.muted, fontSize: 14 }}>User not found</p>
      <Btn label="← Back to Users" onClick={() => navigate("/admin/users")} />
    </div>
  );

  const addNote = () => {
    if (!note.trim()) return;
    const d = new Date().toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" });
    setNotes([{ text: note, admin: "Super Admin", date: d }, ...notes]);
    setNote("");
  };

  const tabs = [
    { key: "overview",   label: "Overview",   icon: User },
    { key: "activity",   label: "Activity",   icon: Activity },
    { key: "financials", label: "Financials", icon: DollarSign },
    { key: "admin",      label: "Admin",      icon: ShieldCheck },
  ];

  const warningHistory = [
    { type: "Duplicate signup attempt",    date: "Mar 8, 2026",  action: "Flagged",      admin: "AI System" },
    { type: "Off-platform contact request",date: "Feb 14, 2026", action: "Warning sent", admin: "Platform Admin" },
  ];

  const activityLog = [
    { action: "Submitted delivery for Milestone 2", time: "2h ago",  type: "delivery" },
    { action: "Opened ProjectStream chat",          time: "3h ago",  type: "chat"     },
    { action: "Login via Google OAuth",             time: "1d ago",  type: "auth"     },
    { action: "Accepted project invite from ByteEats Co.", time: "3d ago", type: "project" },
    { action: "Profile updated — skills added",     time: "5d ago",  type: "profile"  },
  ];

  const typeColor = { delivery: T.green, chat: T.teal, auth: "#6366f1", project: "#f59e0b", profile: "#8b5cf6" };

  const auditLog = [
    { action: "AI flagged for suspicious activity", admin: "AI System",      date: "Mar 10, 2026", type: "flag"    },
    { action: "Warning message sent",               admin: "Platform Admin", date: "Feb 14, 2026", type: "warning" },
    { action: "KYC verified",                       admin: "Finance Admin",  date: "Jan 20, 2026", type: "kyc"     },
  ];
  const auditColor = { flag: "#ef4444", warning: "#f59e0b", kyc: T.green };

  const adminActions = [
    { label: "Send Warning Message",       icon: MessageSquare, variant: "warning", desc: "Send an official warning visible to user" },
    { label: "Force Re-verification (KYC)",icon: RefreshCw,     variant: "default", desc: "Require user to re-submit identity documents" },
    { label: "Override AI Trust Score",    icon: Pencil,        variant: "default", desc: "Manually adjust trust score with reason" },
    { label: "Restrict Account",           icon: ShieldOff,     variant: "default", desc: "Limit posting, hiring, or messaging abilities" },
    { label: "Suspend Account",            icon: XCircle,       variant: "danger",  desc: "Freeze all activity and payments" },
    { label: "Permanent Ban",              icon: UserX,         variant: "danger",  desc: "Permanently remove from platform" },
  ];

  return (
    <div style={{ padding: 24, background: T.bg, minHeight: "100%", fontFamily: "'DM Sans','Segoe UI',sans-serif" }}>

      {/* ── Back ── */}
      <button
        onClick={() => navigate("/admin/users")}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 13, color: T.muted, fontWeight: 500, cursor: "pointer",
          background: "none", border: "none", padding: 0, marginBottom: 18,
          fontFamily: "'DM Sans',sans-serif",
        }}
        onMouseOver={e => e.currentTarget.style.color = T.navy}
        onMouseOut={e => e.currentTarget.style.color = T.muted}
      >
        <ArrowLeft size={15} /> All Users
      </button>

      {/* ── Hero card ── */}
      <div style={{
        background: T.white, borderRadius: 16, border: `1px solid ${T.border}`,
        boxShadow: "0 2px 12px rgba(10,36,68,0.07)",
        padding: "22px 24px", marginBottom: 20,
        display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <UserAvatar name={user.name} size={56} />
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 20, fontWeight: 800, color: T.navy }}>{user.name}</h1>
              <StatusBadge status={user.status} />
              {user.aiFlag && (
                <span style={{ fontSize: 10, fontWeight: 700, color: "#ef4444", background: "#fef2f2", border: "1px solid #fecaca", padding: "2px 8px", borderRadius: 20 }}>
                  ⚑ AI Flagged
                </span>
              )}
            </div>
            <p style={{ margin: "0 0 8px", fontSize: 12, color: T.muted }}>
              {user.email} · {user.id} · {user.role}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap" }}>
              <TrustScore score={user.trustScore} />
              <RiskFlag level={user.riskLevel} />
              <StatusBadge status={user.verification} />
            </div>
          </div>
        </div>

        {/* Actions — always visible */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <Btn label="Send Warning"      icon={AlertTriangle}  variant="warning" />
          <Btn label="Restrict"          icon={ShieldOff}      variant="default" />
          {user.status === "Active"
            ? <Btn label="Suspend"       icon={XCircle}        variant="danger"  />
            : <Btn label="Reinstate"     icon={CheckCircle}    variant="primary" />
          }
          <Btn label="More"              icon={MoreHorizontal} variant="default" />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{
        display: "flex", gap: 2, marginBottom: 20,
        background: T.white, borderRadius: 12, padding: 4,
        border: `1px solid ${T.border}`, width: "fit-content",
        boxShadow: "0 1px 4px rgba(10,36,68,0.05)",
      }}>
        {tabs.map(tab => {
          const Icon = tab.icon;
          const active = activeTab === tab.key;
          return (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key)}
              style={{
                display: "flex", alignItems: "center", gap: 6,
                padding: "7px 16px", borderRadius: 9, fontSize: 13, fontWeight: 600, cursor: "pointer",
                background: active ? T.greenTeal : "transparent",
                color: active ? "#fff" : T.muted,
                border: "none",
                boxShadow: active ? "0 2px 8px rgba(61,220,132,0.25)" : "none",
                transition: "all 0.15s",
                fontFamily: "'DM Sans',sans-serif",
              }}
            >
              <Icon size={13} />{tab.label}
            </button>
          );
        })}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 18, alignItems: "start" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard title="Identity & Account">
              <InfoRow label="Full Name"    value={user.name}         icon={User}     />
              <InfoRow label="Email"        value={user.email}        icon={Mail}     />
              <InfoRow label="Role"         value={user.role}         icon={Key}      />
              <InfoRow label="Country"      value="India"             icon={Globe}    />
              <InfoRow label="Auth Method"  value="Google OAuth"      icon={Key}      />
              <InfoRow label="Joined"       value={user.joinDate}     icon={Calendar} />
              <InfoRow label="Last Active"  value={user.lastActive}   icon={Clock}    />
            </SectionCard>

            <SectionCard title="Warning History">
              {warningHistory.map((w, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "10px 12px", background: "#fffbeb",
                  borderRadius: 10, border: "1px solid #fde68a",
                  marginBottom: i < warningHistory.length-1 ? 8 : 0,
                }}>
                  <AlertTriangle size={15} color="#f59e0b" style={{ flexShrink: 0, marginTop: 1 }} />
                  <div>
                    <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: T.navy }}>{w.type}</p>
                    <p style={{ margin: 0, fontSize: 11, color: T.muted }}>{w.action} · {w.date} · by {w.admin}</p>
                  </div>
                </div>
              ))}
            </SectionCard>
          </div>

          {/* Right column */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <SectionCard title="Account Health">
              <div style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                  <span style={{ fontSize: 12, color: T.muted }}>Trust Score</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{user.trustScore}/100</span>
                </div>
                <div style={{ height: 8, background: T.border, borderRadius: 10, overflow: "hidden" }}>
                  <div style={{
                    height: "100%", borderRadius: 10,
                    width: `${user.trustScore}%`,
                    background: user.trustScore >= 75 ? T.greenTeal : user.trustScore >= 50 ? "linear-gradient(90deg,#f59e0b,#d97706)" : "linear-gradient(90deg,#ff4e4e,#e02020)",
                    transition: "width 0.6s ease",
                  }} />
                </div>
              </div>
              {[
                { label: "Risk Level",      val: <RiskFlag level={user.riskLevel} /> },
                { label: "KYC Status",      val: <StatusBadge status={user.verification} /> },
                { label: "Account Status",  val: <StatusBadge status={user.status} /> },
                { label: "Total Projects",  val: <span style={{ fontSize: 13, fontWeight: 700, color: T.navy }}>{user.totalProjects}</span> },
              ].map(item => (
                <div key={item.label} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "7px 0", borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 12, color: T.muted }}>{item.label}</span>
                  {item.val}
                </div>
              ))}
            </SectionCard>

            <SectionCard title="Admin Notes (Internal)">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 12 }}>
                {notes.map((n, i) => (
                  <div key={i} style={{ padding: "10px 12px", background: "#f8faff", borderRadius: 10, border: `1px solid ${T.border}` }}>
                    <p style={{ margin: "0 0 4px", fontSize: 12, color: T.navy }}>{n.text}</p>
                    <p style={{ margin: 0, fontSize: 10, color: T.muted }}>{n.admin} · {n.date}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={note}
                onChange={e => setNote(e.target.value)}
                placeholder="Add internal note (not visible to user)…"
                style={{
                  width: "100%", fontSize: 12, border: `1px solid ${T.border}`, borderRadius: 10,
                  padding: "10px 12px", resize: "none", outline: "none",
                  color: T.navy, background: "#f8faff", boxSizing: "border-box",
                  fontFamily: "'DM Sans',sans-serif",
                }}
                rows={3}
                onFocus={e => e.target.style.borderColor = T.teal}
                onBlur={e => e.target.style.borderColor = T.border}
              />
              <div style={{ marginTop: 8 }}>
                <Btn label="Save Note" icon={Send} variant="primary" size="sm" onClick={addNote} />
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── ACTIVITY ── */}
      {activeTab === "activity" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionCard title="Activity Summary">
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
              {[
                { label: "Total Projects", value: user.totalProjects,                                               color: T.navy   },
                { label: "Total Earned",   value: user.totalEarned ? `₹${(user.totalEarned/1000).toFixed(0)}k` : "—", color: "#059669" },
                { label: "Total Spent",    value: user.totalSpent  ? `₹${(user.totalSpent /1000).toFixed(0)}k` : "—", color: T.teal   },
                { label: "Disputes",       value: "2",                                                              color: "#f59e0b" },
              ].map(s => (
                <div key={s.label} style={{ padding: "14px 16px", background: "#f8faff", borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <p style={{ margin: "0 0 4px", fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6 }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: 24, fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Recent Activity Log">
            {activityLog.map((log, i) => (
              <div key={i} style={{
                display: "flex", alignItems: "center", gap: 12,
                padding: "10px 0",
                borderBottom: i < activityLog.length-1 ? `1px solid ${T.border}` : "none",
              }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: typeColor[log.type] || T.muted, flexShrink: 0 }} />
                <p style={{ margin: 0, fontSize: 13, color: T.navy, flex: 1 }}>{log.action}</p>
                <span style={{ fontSize: 11, color: T.muted, flexShrink: 0 }}>{log.time}</span>
              </div>
            ))}
          </SectionCard>
        </div>
      )}

      {/* ── FINANCIALS ── */}
      {activeTab === "financials" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <SectionCard
            title="Financial Overview"
            action={<Btn label="Export" icon={Download} size="sm" variant="default" onClick={() => {
              const csv = "Label,Value\n" + [
                ["Total Earned", user.totalEarned || 0],
                ["Total Spent",  user.totalSpent  || 0],
                ["Escrow Locked","45000"],
                ["Pending Payouts","12000"],
                ["Platform Commission","8880"],
                ["Refunds Issued","0"],
              ].map(r => r.join(",")).join("\n");
              const blob = new Blob([csv],{type:"text/csv"});
              const a = document.createElement("a"); a.href=URL.createObjectURL(blob); a.download="financials.csv"; a.click();
            }} />}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12 }}>
              {[
                { label: "Total Earned",        value: user.totalEarned ? `₹${user.totalEarned.toLocaleString()}` : "—", color: "#059669" },
                { label: "Total Spent",         value: user.totalSpent  ? `₹${user.totalSpent.toLocaleString()}`  : "—", color: T.teal   },
                { label: "Escrow Locked",       value: "₹45,000",   color: "#f59e0b"  },
                { label: "Pending Payouts",     value: "₹12,000",   color: "#8b5cf6"  },
                { label: "Platform Commission", value: "₹8,880",    color: T.muted    },
                { label: "Refunds Issued",      value: "₹0",        color: T.muted    },
              ].map(s => (
                <div key={s.label} style={{ padding: "14px 16px", background: "#f8faff", borderRadius: 12, border: `1px solid ${T.border}` }}>
                  <p style={{ margin: "0 0 4px", fontSize: 11, color: T.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6 }}>{s.label}</p>
                  <p style={{ margin: 0, fontSize: 22, fontWeight: 800, color: s.color }}>{s.value}</p>
                </div>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Transaction History">
            <p style={{ textAlign: "center", color: T.muted, fontSize: 13, padding: "32px 0" }}>No transaction data available in demo</p>
          </SectionCard>
        </div>
      )}

      {/* ── ADMIN ── */}
      {activeTab === "admin" && (
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 18, alignItems: "start" }}>
          <SectionCard title="Admin Actions">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {adminActions.map(action => {
                const Icon = action.icon;
                return (
                  <div key={action.label} style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "12px 14px", borderRadius: 10,
                    border: `1px solid ${T.border}`, background: "#f8faff",
                    transition: "background 0.12s",
                  }}
                    onMouseOver={e => e.currentTarget.style.background = "#f0f4ff"}
                    onMouseOut={e => e.currentTarget.style.background = "#f8faff"}
                  >
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                      <Icon size={15} color={action.variant === "danger" ? "#ef4444" : action.variant === "warning" ? "#f59e0b" : T.teal} style={{ marginTop: 2, flexShrink: 0 }} />
                      <div>
                        <p style={{ margin: "0 0 2px", fontSize: 13, fontWeight: 600, color: T.navy }}>{action.label}</p>
                        <p style={{ margin: 0, fontSize: 11, color: T.muted }}>{action.desc}</p>
                      </div>
                    </div>
                    <Btn label="Execute" variant={action.variant} size="sm" />
                  </div>
                );
              })}
            </div>
          </SectionCard>

          <SectionCard title="Audit Log (Admin Actions)">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {auditLog.map((log, i) => (
                <div key={i} style={{
                  display: "flex", alignItems: "flex-start", gap: 10,
                  padding: "10px 12px", background: "#f8faff",
                  borderRadius: 10, border: `1px solid ${T.border}`,
                }}>
                  <div style={{ width: 8, height: 8, borderRadius: "50%", background: auditColor[log.type] || T.muted, flexShrink: 0, marginTop: 4 }} />
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: "0 0 3px", fontSize: 13, fontWeight: 600, color: T.navy }}>{log.action}</p>
                    <p style={{ margin: 0, fontSize: 11, color: T.muted }}>by {log.admin} · {log.date}</p>
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