import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionBtn, PageHeader, StatCard } from "./AdminComponents";

const mockNotifications = [
  // Disputes
  { id: "N-001", category: "Dispute", priority: "High", title: "New dispute raised — Mobile Banking App", desc: "Vikram Singh raised DSP-002 against TechNova Solutions. Amount: ₹1,40,000. AI confidence: 84%.", time: "2m ago", read: false, actionRoute: "/admin/disputes/DSP-002", actionLabel: "Review Dispute" },
  { id: "N-002", category: "Dispute", priority: "High", title: "Dispute pending decision for 3 days", desc: "DSP-001 (E-Commerce Revamp) has been open for 3 days without admin decision. AI verdict ready.", time: "1h ago", read: false, actionRoute: "/admin/disputes/DSP-001", actionLabel: "Decide Now" },

  // Payments
  { id: "N-003", category: "Payment", priority: "High", title: "Escrow frozen — dispute detected", desc: "PAY-007 (₹1,40,000) frozen automatically due to DSP-002. Admin review required.", time: "3h ago", read: false, actionRoute: "/admin/payments", actionLabel: "View Payment" },
  { id: "N-004", category: "Payment", priority: "Medium", title: "Payout request — Arjun Dev", desc: "Withdrawal of ₹85,000 requested. KYC verified. Awaiting approval.", time: "5h ago", read: false, actionRoute: "/admin/payouts", actionLabel: "Approve Payout" },
  { id: "N-005", category: "Payment", priority: "Low", title: "Commission collected — ₹39,000", desc: "Platform commission auto-collected from HR Automation Dashboard (BuildRight Agency).", time: "1d ago", read: true, actionRoute: "/admin/commission", actionLabel: "View Commission" },

  // AI Flags
  { id: "N-006", category: "AI Flag", priority: "High", title: "AI flagged suspicious account — FakeUser999", desc: "Duplicate signup pattern detected. Risk score: 10/100. Recommended action: Permanent ban.", time: "30m ago", read: false, actionRoute: "/admin/users/USR-010", actionLabel: "Review Account" },
  { id: "N-007", category: "AI Flag", priority: "Medium", title: "Agency overload detected — TechNova Solutions", desc: "AI detected team capacity at 95%. 4 active projects vs 6 limit. Risk of delivery failure.", time: "4h ago", read: false, actionRoute: "/admin/agencies/AG-001", actionLabel: "View Agency" },
  { id: "N-008", category: "AI Flag", priority: "Medium", title: "High dispute rate — Priya Menon", desc: "Freelancer dispute rate crossed 30% threshold. AI auto-reduced visibility. Review suggested.", time: "6h ago", read: true, actionRoute: "/admin/freelancers/FL-004", actionLabel: "View Freelancer" },

  // KYC
  { id: "N-009", category: "KYC", priority: "Medium", title: "New KYC submission — PixelCraft Studio", desc: "Agency submitted business documents for verification. Waiting 2 days for review.", time: "2d ago", read: false, actionRoute: "/admin/kyc", actionLabel: "Review KYC" },
  { id: "N-010", category: "KYC", priority: "Low", title: "KYC re-upload requested — Meera Joshi", desc: "Client submitted updated identity documents after initial rejection.", time: "3d ago", read: true, actionRoute: "/admin/kyc", actionLabel: "Review KYC" },

  // Projects
  { id: "N-011", category: "Project", priority: "High", title: "Project at risk — E-Commerce Revamp", desc: "PRJ-003 health dropped to Delayed. Deadline Mar 25. Client unresponsive for 5 days.", time: "8h ago", read: false, actionRoute: "/admin/projects/PRJ-003", actionLabel: "View Project" },
  { id: "N-012", category: "Project", priority: "Low", title: "Project completed — HR Automation Dashboard", desc: "PRJ-004 marked complete. All milestones done. Client satisfaction: 4.8/5.", time: "2d ago", read: true, actionRoute: "/admin/projects/PRJ-004", actionLabel: "View Project" },

  // System
  { id: "N-013", category: "System", priority: "Low", title: "Daily platform summary ready", desc: "24h summary: 2 new signups, 1 new dispute, ₹2.3L in transactions, 0 system errors.", time: "9h ago", read: true, actionRoute: "/admin/reports/revenue", actionLabel: "View Report" },
  { id: "N-014", category: "System", priority: "Medium", title: "AI settings updated", desc: "autoActionConfidence threshold changed from 85% to 90% by Super Admin.", time: "4d ago", read: true, actionRoute: "/admin/ai/settings", actionLabel: "View Settings" },
];

const categoryConfig = {
  "Dispute":  { icon: "⚑", bg: "bg-red-100",    text: "text-red-600",    badge: "bg-red-50 text-red-600 border border-red-200"    },
  "Payment":  { icon: "⊕", bg: "bg-blue-100",   text: "text-blue-600",   badge: "bg-blue-50 text-blue-700 border border-blue-200"  },
  "AI Flag":  { icon: "◎", bg: "bg-orange-100", text: "text-orange-600", badge: "bg-orange-50 text-orange-700 border border-orange-200" },
  "KYC":      { icon: "◉", bg: "bg-purple-100", text: "text-purple-600", badge: "bg-purple-50 text-purple-700 border border-purple-200" },
  "Project":  { icon: "⊟", bg: "bg-yellow-100", text: "text-yellow-700", badge: "bg-yellow-50 text-yellow-700 border border-yellow-200" },
  "System":   { icon: "⊙", bg: "bg-gray-100",   text: "text-gray-500",   badge: "bg-gray-50 text-gray-500 border border-gray-200"   },
};

const priorityDot = {
  High:   "bg-red-500",
  Medium: "bg-yellow-400",
  Low:    "bg-gray-300",
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
    const matchCat = activeCategory === "All" || n.category === activeCategory;
    const matchPri = activePriority === "All" || n.priority === activePriority;
    const matchRead = activeRead === "All" || (activeRead === "Unread" ? !n.read : n.read);
    return matchCat && matchPri && matchRead;
  });

  const markRead = (id) => setNotifications((prev) => prev.map((n) => n.id === id ? { ...n, read: true } : n));
  const markAllRead = () => setNotifications((prev) => prev.map((n) => ({ ...n, read: true })));
  const dismiss = (id) => setNotifications((prev) => prev.filter((n) => n.id !== id));
  const dismissAll = () => setNotifications((prev) => prev.filter((n) => !n.read));

  const countByCategory = (cat) => notifications.filter((n) => !n.read && (cat === "All" ? true : n.category === cat)).length;

  return (
    <div className="p-6">
      <PageHeader
        title="Notifications"
        subtitle="All system alerts, AI flags & action items for admin"
        actions={
          <div className="flex items-center gap-2">
            {unread > 0 && (
              <ActionBtn label={`Mark all read (${unread})`} onClick={markAllRead} />
            )}
            <ActionBtn label="Clear read" onClick={dismissAll} />
          </div>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total" value={notifications.length} color="gray" />
        <StatCard label="Unread" value={unread} sub="Needs attention" color="red" />
        <StatCard label="High Priority" value={notifications.filter(n => n.priority === "High" && !n.read).length} color="orange" />
        <StatCard label="AI Flags" value={notifications.filter(n => n.category === "AI Flag" && !n.read).length} color="blue" />
      </div>

      <div className="flex gap-5">
        {/* Left — Category Filter */}
        <div className="w-48 shrink-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-4 py-3 border-b border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Categories</p>
            </div>
            <div className="p-2">
              {categories.map((cat) => {
                const cfg = categoryConfig[cat];
                const count = countByCategory(cat);
                return (
                  <button
                    key={cat}
                    onClick={() => setActiveCategory(cat)}
                    className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors mb-0.5 ${
                      activeCategory === cat ? "bg-green-50 text-green-700 font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {cfg ? (
                      <span className={`w-6 h-6 rounded-md flex items-center justify-center text-xs shrink-0 ${cfg.bg} ${cfg.text}`}>
                        {cfg.icon}
                      </span>
                    ) : (
                      <span className="w-6 h-6 rounded-md bg-gray-100 flex items-center justify-center text-xs text-gray-500 shrink-0">◈</span>
                    )}
                    <span className="flex-1 text-left">{cat}</span>
                    {count > 0 && (
                      <span className="text-[10px] font-bold bg-red-500 text-white px-1.5 py-0.5 rounded-full">
                        {count}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Priority Filter */}
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Priority</p>
              <div className="flex flex-col gap-1">
                {["All", "High", "Medium", "Low"].map((p) => (
                  <button key={p} onClick={() => setActivePriority(p)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      activePriority === p ? "bg-green-50 text-green-700 font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    {p !== "All" && <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[p]}`} />}
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Read Filter */}
            <div className="px-4 py-3 border-t border-gray-100">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Status</p>
              <div className="flex flex-col gap-1">
                {["All", "Unread", "Read"].map((r) => (
                  <button key={r} onClick={() => setActiveRead(r)}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm transition-colors ${
                      activeRead === r ? "bg-green-50 text-green-700 font-semibold" : "text-gray-600 hover:bg-gray-50"
                    }`}>
                    {r === "Unread" && <span className="w-2 h-2 rounded-full bg-green-500 shrink-0" />}
                    {r === "Read" && <span className="w-2 h-2 rounded-full bg-gray-300 shrink-0" />}
                    {r}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Right — Notification Feed */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="px-5 py-3 border-b border-gray-100 flex items-center justify-between">
              <p className="text-sm font-semibold text-gray-700">
                {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && <span className="text-gray-400 font-normal"> in {activeCategory}</span>}
              </p>
              <span className="text-xs text-gray-400">Sorted by latest</span>
            </div>

            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
                  <span className="text-gray-400 text-xl">🔔</span>
                </div>
                <p className="text-gray-500 text-sm">No notifications here</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filtered.map((n) => {
                  const cfg = categoryConfig[n.category] || categoryConfig["System"];
                  return (
                    <div
                      key={n.id}
                      className={`flex items-start gap-4 px-5 py-4 transition-colors hover:bg-gray-50/50 ${!n.read ? "bg-green-50/30" : ""}`}
                    >
                      {/* Unread dot */}
                      <div className="mt-1.5 shrink-0">
                        <div className={`w-2 h-2 rounded-full ${!n.read ? "bg-green-500" : "bg-transparent"}`} />
                      </div>

                      {/* Icon */}
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${cfg.bg}`}>
                        <span className={`text-sm ${cfg.text}`}>{cfg.icon}</span>
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-0.5">
                          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${cfg.badge}`}>
                            {n.category}
                          </span>
                          <span className={`flex items-center gap-1 text-[10px] font-semibold`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${priorityDot[n.priority]}`} />
                            <span className="text-gray-500">{n.priority}</span>
                          </span>
                          {!n.read && (
                            <span className="text-[10px] font-bold text-green-600">NEW</span>
                          )}
                        </div>
                        <p className="text-sm font-semibold text-gray-800 leading-snug">{n.title}</p>
                        <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{n.desc}</p>
                        <div className="flex items-center gap-3 mt-2">
                          <span className="text-[10px] text-gray-400">{n.time}</span>
                          <button
                            onClick={() => { markRead(n.id); navigate(n.actionRoute); }}
                            className="text-xs font-semibold text-green-600 hover:text-green-700 transition-colors"
                          >
                            {n.actionLabel} →
                          </button>
                          {!n.read && (
                            <button onClick={() => markRead(n.id)} className="text-xs text-gray-400 hover:text-gray-600">
                              Mark read
                            </button>
                          )}
                          <button onClick={() => dismiss(n.id)} className="text-xs text-gray-300 hover:text-red-400 transition-colors ml-auto">
                            Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}