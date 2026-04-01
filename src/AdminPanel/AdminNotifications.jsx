import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ─── Inline replacements for AdminComponents ────────────────────────────────
function PageHeader({ title, subtitle, actions }) {
  return (
    <div className="flex items-start justify-between mb-6 px-0 py-2">
      <div className="flex items-center gap-3">
        <h1 className="text-2xl font-bold tracking-tight" style={{ color: "#111827" }}>{title}</h1>
        {subtitle && (
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: "#22C55E", color: "#fff" }}
          >
            {subtitle}
          </span>
        )}
      </div>
      <div className="flex items-center gap-2">{actions}</div>
    </div>
  );
}

function ActionBtn({ label, onClick }) {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5"
      style={{ background: "#fff", color: "#374151", border: "1px solid #E5E7EB" }}
      onMouseEnter={e => { e.currentTarget.style.background = "#f9fafb"; }}
      onMouseLeave={e => { e.currentTarget.style.background = "#fff"; }}
    >
      {label}
    </button>
  );
}

const statColorMap = {
  gray:   { bg: "#f8fafc", border: "#e2e8f0", val: "#111827", label: "#64748b", glow: "none" },
  red:    { bg: "#fff5f5", border: "#fecaca", val: "#dc2626", label: "#ef4444", glow: "0 0 12px rgba(220,38,38,0.12)" },
  orange: { bg: "#fff7ed", border: "#fed7aa", val: "#ea580c", label: "#f97316", glow: "0 0 12px rgba(234,88,12,0.12)" },
  blue:   { bg: "#eff6ff", border: "#bfdbfe", val: "#2563eb", label: "#3b82f6", glow: "0 0 12px rgba(37,99,235,0.12)" },
};

function StatCard({ label, value, sub, color = "gray" }) {
  const c = statColorMap[color];
  return (
    <div
      className="rounded-xl p-4 border"
      style={{ background: c.bg, borderColor: c.border, boxShadow: c.glow }}
    >
      <p className="text-xs font-semibold uppercase tracking-wide mb-1" style={{ color: c.label }}>{label}</p>
      <p className="text-3xl font-extrabold" style={{ color: c.val }}>{value}</p>
      {sub && <p className="text-xs mt-0.5" style={{ color: c.label }}>{sub}</p>}
    </div>
  );
}
// ────────────────────────────────────────────────────────────────────────────

const mockNotifications = [
  { id: "N-001", category: "Dispute",  priority: "High",   title: "New dispute raised — Mobile Banking App",            desc: "Vikram Singh raised DSP-002 against TechNova Solutions. Amount: ₹1,40,000. AI confidence: 84%.",           time: "2m ago",  read: false, actionRoute: "/admin/disputes/DSP-002",  actionLabel: "Review Dispute" },
  { id: "N-002", category: "Dispute",  priority: "High",   title: "Dispute pending decision for 3 days",                desc: "DSP-001 (E-Commerce Revamp) has been open for 3 days without admin decision. AI verdict ready.",           time: "1h ago",  read: false, actionRoute: "/admin/disputes/DSP-001",  actionLabel: "Decide Now" },
  { id: "N-003", category: "Payment",  priority: "High",   title: "Escrow frozen — dispute detected",                   desc: "PAY-007 (₹1,40,000) frozen automatically due to DSP-002. Admin review required.",                         time: "3h ago",  read: false, actionRoute: "/admin/payments",          actionLabel: "View Payment" },
  { id: "N-004", category: "Payment",  priority: "Medium", title: "Payout request — Arjun Dev",                         desc: "Withdrawal of ₹85,000 requested. KYC verified. Awaiting approval.",                                        time: "5h ago",  read: false, actionRoute: "/admin/payouts",           actionLabel: "Approve Payout" },
  { id: "N-005", category: "Payment",  priority: "Low",    title: "Commission collected — ₹39,000",                     desc: "Platform commission auto-collected from HR Automation Dashboard (BuildRight Agency).",                      time: "1d ago",  read: true,  actionRoute: "/admin/commission",        actionLabel: "View Commission" },
  { id: "N-006", category: "AI Flag",  priority: "High",   title: "AI flagged suspicious account — FakeUser999",        desc: "Duplicate signup pattern detected. Risk score: 10/100. Recommended action: Permanent ban.",                 time: "30m ago", read: false, actionRoute: "/admin/users/USR-010",     actionLabel: "Review Account" },
  { id: "N-007", category: "AI Flag",  priority: "Medium", title: "Agency overload detected — TechNova Solutions",      desc: "AI detected team capacity at 95%. 4 active projects vs 6 limit. Risk of delivery failure.",                  time: "4h ago",  read: false, actionRoute: "/admin/agencies/AG-001",   actionLabel: "View Agency" },
  { id: "N-008", category: "AI Flag",  priority: "Medium", title: "High dispute rate — Priya Menon",                    desc: "Freelancer dispute rate crossed 30% threshold. AI auto-reduced visibility. Review suggested.",               time: "6h ago",  read: true,  actionRoute: "/admin/freelancers/FL-004",actionLabel: "View Freelancer" },
  { id: "N-009", category: "KYC",      priority: "Medium", title: "New KYC submission — PixelCraft Studio",             desc: "Agency submitted business documents for verification. Waiting 2 days for review.",                          time: "2d ago",  read: false, actionRoute: "/admin/kyc",               actionLabel: "Review KYC" },
  { id: "N-010", category: "KYC",      priority: "Low",    title: "KYC re-upload requested — Meera Joshi",              desc: "Client submitted updated identity documents after initial rejection.",                                      time: "3d ago",  read: true,  actionRoute: "/admin/kyc",               actionLabel: "Review KYC" },
  { id: "N-011", category: "Project",  priority: "High",   title: "Project at risk — E-Commerce Revamp",                desc: "PRJ-003 health dropped to Delayed. Deadline Mar 25. Client unresponsive for 5 days.",                      time: "8h ago",  read: false, actionRoute: "/admin/projects/PRJ-003",  actionLabel: "View Project" },
  { id: "N-012", category: "Project",  priority: "Low",    title: "Project completed — HR Automation Dashboard",        desc: "PRJ-004 marked complete. All milestones done. Client satisfaction: 4.8/5.",                                time: "2d ago",  read: true,  actionRoute: "/admin/projects/PRJ-004",  actionLabel: "View Project" },
  { id: "N-013", category: "System",   priority: "Low",    title: "Daily platform summary ready",                       desc: "24h summary: 2 new signups, 1 new dispute, ₹2.3L in transactions, 0 system errors.",                     time: "9h ago",  read: true,  actionRoute: "/admin/reports/revenue",   actionLabel: "View Report" },
  { id: "N-014", category: "System",   priority: "Medium", title: "AI settings updated",                                desc: "autoActionConfidence threshold changed from 85% to 90% by Super Admin.",                                  time: "4d ago",  read: true,  actionRoute: "/admin/ai/settings",       actionLabel: "View Settings" },
];

const categoryConfig = {
  "Dispute": { icon: "⚑", bg: "#fee2e2", iconColor: "#dc2626", badge: { bg: "#fff0f0", text: "#dc2626", border: "#fecaca" } },
  "Payment": { icon: "⊕", bg: "#dbeafe", iconColor: "#2563eb", badge: { bg: "#eff6ff", text: "#2563eb", border: "#bfdbfe" } },
  "AI Flag": { icon: "◎", bg: "#dcfce7", iconColor: "#15803D", badge: { bg: "#f0fdf4", text: "#15803D", border: "#bbf7d0" } },
  "KYC":     { icon: "◉", bg: "#ede9fe", iconColor: "#7c3aed", badge: { bg: "#f5f3ff", text: "#7c3aed", border: "#ddd6fe" } },
  "Project": { icon: "⊟", bg: "#d1fae5", iconColor: "#059669", badge: { bg: "#ecfdf5", text: "#047857", border: "#a7f3d0" } },
  "System":  { icon: "⊙", bg: "#f1f5f9", iconColor: "#475569", badge: { bg: "#f8fafc", text: "#475569", border: "#cbd5e1" } },
};

const priorityDot = { High: "#ef4444", Medium: "#f59e0b", Low: "#cbd5e1" };

// Light theme palette — matched from hire-talent screenshot
const BRAND = {
  navy:        "#111827",
  green:       "#16A34A",
  greenLight:  "#22C55E",
  greenActive: "#f0fdf4",
  gray:        "#6B7280",
  grayLight:   "#F3F4F6",
  border:      "#E5E7EB",
  white:       "#ffffff",
  urgent:      "#F97316",
};

export default function AdminNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriority, setActivePriority] = useState("All");
  const [activeRead, setActiveRead] = useState("All");

  const categories = ["All", "Dispute", "Payment", "AI Flag", "KYC", "Project", "System"];
  const unread = notifications.filter((n) => !n.read).length;

  const filtered = notifications.filter((n) => {
    const matchCat  = activeCategory === "All" || n.category === activeCategory;
    const matchPri  = activePriority === "All" || n.priority === activePriority;
    const matchRead = activeRead === "All" || (activeRead === "Unread" ? !n.read : n.read);
    return matchCat && matchPri && matchRead;
  });

  const markRead    = (id) => setNotifications((p) => p.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = ()   => setNotifications((p) => p.map((n) => ({ ...n, read: true })));
  const dismiss     = (id) => setNotifications((p) => p.filter((n) => n.id !== id));
  const dismissAll  = ()   => setNotifications((p) => p.filter((n) => !n.read));

  const countByCategory = (cat) =>
    notifications.filter((n) => !n.read && (cat === "All" ? true : n.category === cat)).length;

  return (
    <div className="p-6" style={{ background: BRAND.grayLight, minHeight: "100vh" }}>

      {/* ── Header ── */}
      <PageHeader
        title="Notifications"
        subtitle={unread > 0 ? `${unread} new` : null}
        actions={
          <div className="flex items-center gap-2">
            {unread > 0 && <ActionBtn label={`✓ Mark all read (${unread})`} onClick={markAllRead} />}
            <ActionBtn label="⊘ Clear read" onClick={dismissAll} />
          </div>
        }
      />

      {/* ── Stats ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total"         value={notifications.length}                                                   color="gray"   />
        <StatCard label="Unread"        value={unread}                sub="Needs attention"                           color="red"    />
        <StatCard label="High Priority" value={notifications.filter(n => n.priority === "High" && !n.read).length}    color="orange" />
        <StatCard label="AI Flags"      value={notifications.filter(n => n.category === "AI Flag" && !n.read).length} color="blue"   />
      </div>

      {/* ── Read / Unread pill tabs — matches screenshot top row ── */}
      <div className="flex items-center gap-2 mb-3">
        {[
          { key: "All",    label: "All",    count: notifications.length },
          { key: "Unread", label: "Unread", count: notifications.filter(n => !n.read).length },
          { key: "Read",   label: "Read",   count: notifications.filter(n => n.read).length },
        ].map(({ key, label, count }) => {
          const isActive = activeRead === key;
          return (
            <button
              key={key}
              onClick={() => setActiveRead(key)}
              className="flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-semibold transition-all"
              style={{
                background: isActive ? BRAND.greenLight : BRAND.white,
                color:      isActive ? BRAND.white       : BRAND.gray,
                border:     isActive ? "none"            : `1px solid ${BRAND.border}`,
              }}
            >
              {label}
              <span
                className="text-xs font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center"
                style={{
                  background: isActive ? "rgba(255,255,255,0.25)" : BRAND.grayLight,
                  color:      isActive ? BRAND.white               : BRAND.gray,
                }}
              >
                {count}
              </span>
            </button>
          );
        })}
      </div>

      {/* ── Category pills + Priority pills ── */}
      <div className="flex items-center gap-2 flex-wrap mb-6">
        {categories.map((cat) => {
          const isActive = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-3 py-1 rounded-full text-sm font-medium transition-all"
              style={{
                background: isActive ? BRAND.greenLight : BRAND.white,
                color:      isActive ? BRAND.white       : BRAND.gray,
                border:     isActive ? "none"            : `1px solid ${BRAND.border}`,
              }}
            >
              {cat}
            </button>
          );
        })}

        <div className="ml-auto flex items-center gap-2">
          {["All", "High", "Medium", "Low"].map((p) => {
            const isActive = activePriority === p;
            return (
              <button
                key={p}
                onClick={() => setActivePriority(p)}
                className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all"
                style={{
                  background: isActive ? BRAND.navy : BRAND.white,
                  color:      isActive ? "#fff"      : BRAND.gray,
                  border:     isActive ? "none"      : `1px solid ${BRAND.border}`,
                }}
              >
                {p !== "All" && (
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: priorityDot[p] }} />
                )}
                {p}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Notification Feed ── */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div
            className="flex flex-col items-center justify-center py-20 rounded-2xl"
            style={{ background: BRAND.white, border: `1px solid ${BRAND.border}` }}
          >
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center mb-3 text-2xl"
              style={{ background: BRAND.greenActive }}
            >🔔</div>
            <p className="text-sm font-medium" style={{ color: "#94a3b8" }}>No notifications here</p>
          </div>
        ) : (
          filtered.map((n) => {
            const cfg = categoryConfig[n.category] || categoryConfig["System"];
            return (
              <div
                key={n.id}
                className="flex items-start gap-4 px-5 py-4 rounded-2xl transition-all"
                style={{
                  background: BRAND.white,
                  border:     `1px solid ${BRAND.border}`,
                  borderLeft: !n.read ? `4px solid ${BRAND.greenLight}` : `1px solid ${BRAND.border}`,
                }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 text-sm mt-0.5"
                  style={{ background: cfg.bg, color: cfg.iconColor }}
                >
                  {cfg.icon}
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">

                  {/* Badges */}
                  <div className="flex items-center gap-2 flex-wrap mb-1">
                    <span
                      className="text-[10px] font-bold px-2 py-0.5 rounded-full border"
                      style={{ background: cfg.badge.bg, color: cfg.badge.text, borderColor: cfg.badge.border }}
                    >
                      {n.category}
                    </span>
                    <span className="flex items-center gap-1 text-[10px] font-semibold">
                      <span className="w-1.5 h-1.5 rounded-full" style={{ background: priorityDot[n.priority] }} />
                      <span style={{ color: BRAND.gray }}>{n.priority}</span>
                    </span>
                    {n.priority === "High" && (
                      <span
                        className="text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1"
                        style={{ background: "#FFF7ED", color: BRAND.urgent, border: "1px solid #FED7AA" }}
                      >
                        ⚡ Urgent
                      </span>
                    )}
                    {!n.read && (
                      <span
                        className="text-[10px] font-black px-1.5 py-0.5 rounded-full"
                        style={{ background: BRAND.greenLight, color: "#fff" }}
                      >NEW</span>
                    )}
                  </div>

                  <p className="text-sm font-bold leading-snug" style={{ color: BRAND.navy }}>{n.title}</p>
                  <p className="text-xs mt-0.5 leading-relaxed" style={{ color: BRAND.gray }}>{n.desc}</p>

                  {/* Actions row */}
                  <div className="flex items-center gap-2 mt-3">
                    <button
                      onClick={() => { markRead(n.id); navigate(n.actionRoute); }}
                      className="px-4 py-1.5 rounded-lg text-sm font-semibold transition-all"
                      style={{ background: BRAND.greenLight, color: "#fff" }}
                      onMouseEnter={e => e.currentTarget.style.background = BRAND.green}
                      onMouseLeave={e => e.currentTarget.style.background = BRAND.greenLight}
                    >
                      {n.actionLabel}
                    </button>

                    {!n.read && (
                      <button
                        onClick={() => markRead(n.id)}
                        className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all"
                        style={{ background: "transparent", color: BRAND.gray, border: `1px solid ${BRAND.border}` }}
                        onMouseEnter={e => e.currentTarget.style.background = BRAND.grayLight}
                        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
                      >
                        👁 Mark read
                      </button>
                    )}

                    <span className="text-[10px] ml-1" style={{ color: "#9CA3AF" }}>{n.time}</span>

                    <button
                      onClick={() => dismiss(n.id)}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium flex items-center gap-1 transition-all ml-auto"
                      style={{ background: "transparent", color: "#9CA3AF", border: `1px solid ${BRAND.border}` }}
                      onMouseEnter={e => { e.currentTarget.style.color = "#EF4444"; e.currentTarget.style.borderColor = "#FECACA"; }}
                      onMouseLeave={e => { e.currentTarget.style.color = "#9CA3AF"; e.currentTarget.style.borderColor = BRAND.border; }}
                    >
                      ✕ Dismiss
                    </button>

                    {/* Unread red dot — matches screenshot */}
                    {!n.read && (
                      <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: "#EF4444" }} />
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}