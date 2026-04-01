import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ActionBtn, PageHeader, StatCard } from "./AdminComponents";

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


const mockNotifications = [
  { id:"N-001", category:"Dispute", priority:"High", title:"New dispute raised — Mobile Banking App", desc:"Vikram Singh raised DSP-002 against TechNova Solutions. Amount: ₹1,40,000. AI confidence: 84%.", time:"2m ago", read:false, actionRoute:"/admin/disputes/DSP-002", actionLabel:"Review Dispute" },
  { id:"N-002", category:"Dispute", priority:"High", title:"Dispute pending decision for 3 days", desc:"DSP-001 (E-Commerce Revamp) has been open for 3 days without admin decision. AI verdict ready.", time:"1h ago", read:false, actionRoute:"/admin/disputes/DSP-001", actionLabel:"Decide Now" },
  { id:"N-003", category:"Payment", priority:"High", title:"Escrow frozen — dispute detected", desc:"PAY-007 (₹1,40,000) frozen automatically due to DSP-002. Admin review required.", time:"3h ago", read:false, actionRoute:"/admin/payments", actionLabel:"View Payment" },
  { id:"N-004", category:"Payment", priority:"Medium", title:"Payout request — Arjun Dev", desc:"Withdrawal of ₹85,000 requested. KYC verified. Awaiting approval.", time:"5h ago", read:false, actionRoute:"/admin/payouts", actionLabel:"Approve Payout" },
  { id:"N-005", category:"Payment", priority:"Low", title:"Commission collected — ₹39,000", desc:"Platform commission auto-collected from HR Automation Dashboard (BuildRight Agency).", time:"1d ago", read:true, actionRoute:"/admin/commission", actionLabel:"View Commission" },
  { id:"N-006", category:"AI Flag", priority:"High", title:"AI flagged suspicious account — FakeUser999", desc:"Duplicate signup pattern detected. Risk score: 10/100. Recommended action: Permanent ban.", time:"30m ago", read:false, actionRoute:"/admin/users/USR-010", actionLabel:"Review Account" },
  { id:"N-007", category:"AI Flag", priority:"Medium", title:"Agency overload detected — TechNova Solutions", desc:"AI detected team capacity at 95%. 4 active projects vs 6 limit. Risk of delivery failure.", time:"4h ago", read:false, actionRoute:"/admin/agencies/AG-001", actionLabel:"View Agency" },
  { id:"N-008", category:"AI Flag", priority:"Medium", title:"High dispute rate — Priya Menon", desc:"Freelancer dispute rate crossed 30% threshold. AI auto-reduced visibility. Review suggested.", time:"6h ago", read:true, actionRoute:"/admin/freelancers/FL-004", actionLabel:"View Freelancer" },
  { id:"N-009", category:"KYC", priority:"Medium", title:"New KYC submission — PixelCraft Studio", desc:"Agency submitted business documents for verification. Waiting 2 days for review.", time:"2d ago", read:false, actionRoute:"/admin/kyc", actionLabel:"Review KYC" },
  { id:"N-010", category:"KYC", priority:"Low", title:"KYC re-upload requested — Meera Joshi", desc:"Client submitted updated identity documents after initial rejection.", time:"3d ago", read:true, actionRoute:"/admin/kyc", actionLabel:"Review KYC" },
  { id:"N-011", category:"Project", priority:"High", title:"Project at risk — E-Commerce Revamp", desc:"PRJ-003 health dropped to Delayed. Deadline Mar 25. Client unresponsive for 5 days.", time:"8h ago", read:false, actionRoute:"/admin/projects/PRJ-003", actionLabel:"View Project" },
  { id:"N-012", category:"Project", priority:"Low", title:"Project completed — HR Automation Dashboard", desc:"PRJ-004 marked complete. All milestones done. Client satisfaction: 4.8/5.", time:"2d ago", read:true, actionRoute:"/admin/projects/PRJ-004", actionLabel:"View Project" },
  { id:"N-013", category:"System", priority:"Low", title:"Daily platform summary ready", desc:"24h summary: 2 new signups, 1 new dispute, ₹2.3L in transactions, 0 system errors.", time:"9h ago", read:true, actionRoute:"/admin/reports/revenue", actionLabel:"View Report" },
  { id:"N-014", category:"System", priority:"Medium", title:"AI settings updated", desc:"autoActionConfidence threshold changed from 85% to 90% by Super Admin.", time:"4d ago", read:true, actionRoute:"/admin/ai/settings", actionLabel:"View Settings" },
];

const CATEGORY_CFG = {
  "Dispute": { icon:"⚑", iconBg: G.redBg,    iconColor:"#dc2626", chipBg: G.redBg,    chipBorder: G.redBorder,    chipText:"#dc2626"   },
  "Payment": { icon:"⊕", iconBg: G.blueBg,   iconColor: G.blue,   chipBg: G.blueBg,   chipBorder: G.blueBorder,   chipText: G.blue     },
  "AI Flag": { icon:"◎", iconBg: G.amberBg,  iconColor:"#b45309", chipBg: G.amberBg,  chipBorder: G.amberBorder,  chipText:"#b45309"   },
  "KYC":     { icon:"◉", iconBg: G.purpleBg, iconColor: G.purple, chipBg: G.purpleBg, chipBorder: G.purpleBorder, chipText: G.purple   },
  "Project": { icon:"⊟", iconBg: G.amberBg,  iconColor:"#92400e", chipBg: G.amberBg,  chipBorder: G.amberBorder,  chipText:"#92400e"   },
  "System":  { icon:"⊙", iconBg: G.bg,       iconColor: G.muted,  chipBg: G.bg,       chipBorder: G.border,       chipText: G.muted    },
};

const PRIORITY_DOT = { High: G.red, Medium: G.amber, Low: G.border };

export function AdminNotifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState(mockNotifications);
  const [activeCategory, setActiveCategory] = useState("All");
  const [activePriority, setActivePriority] = useState("All");
  const [activeRead,     setActiveRead]     = useState("All");

  const categories = ["All","Dispute","Payment","AI Flag","KYC","Project","System"];
  const unread = notifications.filter(n => !n.read).length;

  const filtered = notifications.filter(n => {
    const matchCat  = activeCategory === "All" || n.category === activeCategory;
    const matchPri  = activePriority === "All" || n.priority === activePriority;
    const matchRead = activeRead === "All" || (activeRead === "Unread" ? !n.read : n.read);
    return matchCat && matchPri && matchRead;
  });

  const markRead   = (id) => setNotifications(p => p.map(n => n.id === id ? { ...n, read:true } : n));
  const markAllRead= ()   => setNotifications(p => p.map(n => ({ ...n, read:true })));
  const dismiss    = (id) => setNotifications(p => p.filter(n => n.id !== id));
  const dismissAll = ()   => setNotifications(p => p.filter(n => !n.read));

  const countByCategory = (cat) => notifications.filter(n => !n.read && (cat === "All" || n.category === cat)).length;

  const sideNavBtn = (active) => ({
    width: "100%", display: "flex", alignItems: "center", gap: 10,
    padding: "8px 12px", borderRadius: 8, marginBottom: 2,
    background: active ? G.greenBg : "none", border: "none",
    color: active ? G.greenDeep : G.sub,
    fontWeight: active ? 700 : 500, fontSize: 13, fontFamily: FONT,
    cursor: "pointer", textAlign: "left", transition: "background 0.1s",
  });

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
      `}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Notifications</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>All system alerts, AI flags & action items for admin</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {unread > 0 && (
            <button onClick={markAllRead} style={{
              fontSize: 12, fontWeight: 700, fontFamily: FONT,
              background: G.greenBg, color: G.greenDeep,
              border: `1px solid ${G.greenBorder}`, borderRadius: 100,
              padding: "8px 16px", cursor: "pointer",
            }}>Mark all read ({unread})</button>
          )}
          <button onClick={dismissAll} style={{
            fontSize: 12, fontWeight: 700, fontFamily: FONT,
            background: G.bg, color: G.sub,
            border: `1px solid ${G.border}`, borderRadius: 100,
            padding: "8px 16px", cursor: "pointer",
          }}>Clear read</button>
        </div>
      </div>

      {/* Stats */}
      <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
        <StatCard label="Total"         value={notifications.length}                                              color="gray"   />
        <StatCard label="Unread"        value={unread}                          sub="Needs attention"             color="red"    />
        <StatCard label="High Priority" value={notifications.filter(n=>n.priority==="High"&&!n.read).length}     color="orange" />
        <StatCard label="AI Flags"      value={notifications.filter(n=>n.category==="AI Flag"&&!n.read).length}  color="blue"   />
      </div>

      <div style={{ display: "flex", gap: 20 }}>

        {/* ── Sidebar ── */}
        <div style={{ width: 200, flexShrink: 0 }}>
          <div style={{
            background: G.white, border: `1px solid ${G.greenBorder}`,
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
          }}>
            {/* Categories */}
            <div style={{ padding: "12px 16px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: G.greenDeep, margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>Categories</p>
            </div>
            <div style={{ padding: 8 }}>
              {categories.map(cat => {
                const cfg = CATEGORY_CFG[cat];
                const count = countByCategory(cat);
                return (
                  <button key={cat} onClick={() => setActiveCategory(cat)} style={sideNavBtn(activeCategory === cat)}>
                    {cfg
                      ? <span style={{ width: 24, height: 24, borderRadius: 6, background: cfg.iconBg, color: cfg.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>{cfg.icon}</span>
                      : <span style={{ width: 24, height: 24, borderRadius: 6, background: G.bg, color: G.muted, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, flexShrink: 0 }}>◈</span>
                    }
                    <span style={{ flex: 1 }}>{cat}</span>
                    {count > 0 && (
                      <span style={{ fontSize: 10, fontWeight: 800, background: G.red, color: G.white, padding: "1px 6px", borderRadius: 99 }}>{count}</span>
                    )}
                  </button>
                );
              })}
            </div>

            {/* Priority filter */}
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${G.greenBorder}` }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: G.greenDeep, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Priority</p>
              {["All","High","Medium","Low"].map(p => (
                <button key={p} onClick={() => setActivePriority(p)} style={sideNavBtn(activePriority === p)}>
                  {p !== "All" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_DOT[p], flexShrink: 0 }} />}
                  {p}
                </button>
              ))}
            </div>

            {/* Read filter */}
            <div style={{ padding: "12px 16px", borderTop: `1px solid ${G.greenBorder}` }}>
              <p style={{ fontSize: 10, fontWeight: 800, color: G.greenDeep, margin: "0 0 8px", textTransform: "uppercase", letterSpacing: "0.07em" }}>Status</p>
              {["All","Unread","Read"].map(r => (
                <button key={r} onClick={() => setActiveRead(r)} style={sideNavBtn(activeRead === r)}>
                  {r === "Unread" && <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, flexShrink: 0 }} />}
                  {r === "Read"   && <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.border, flexShrink: 0 }} />}
                  {r}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Feed ── */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            background: G.white, border: `1px solid ${G.greenBorder}`,
            borderRadius: 16, overflow: "hidden",
            boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
          }}>
            {/* Feed header */}
            <div style={{
              padding: "12px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg,
              display: "flex", alignItems: "center", justifyContent: "space-between",
            }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>
                {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
                {activeCategory !== "All" && <span style={{ color: G.muted, fontWeight: 400 }}> in {activeCategory}</span>}
              </p>
              <span style={{ fontSize: 11, color: G.muted }}>Sorted by latest</span>
            </div>

            {filtered.length === 0 ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>🔔</div>
                <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No notifications here</p>
              </div>
            ) : (
              <div>
                {filtered.map((n, idx) => {
                  const cfg = CATEGORY_CFG[n.category] || CATEGORY_CFG["System"];
                  return (
                    <div key={n.id} style={{
                      display: "flex", alignItems: "flex-start", gap: 14,
                      padding: "16px 20px",
                      background: !n.read ? G.greenBg + "88" : G.white,
                      borderBottom: idx < filtered.length - 1 ? `1px solid ${G.border}` : "none",
                      transition: "background 0.1s",
                    }}>
                      {/* Unread dot */}
                      <div style={{ marginTop: 6, flexShrink: 0 }}>
                        <div style={{ width: 7, height: 7, borderRadius: "50%", background: !n.read ? G.green : "transparent" }} />
                      </div>
                      {/* Category icon */}
                      <div style={{ width: 36, height: 36, borderRadius: 10, background: cfg.iconBg, color: cfg.iconColor, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                        {cfg.icon}
                      </div>
                      {/* Content */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap", marginBottom: 4 }}>
                          <span style={{ fontSize: 10, fontWeight: 700, background: cfg.chipBg, color: cfg.chipText, border: `1px solid ${cfg.chipBorder}`, padding: "2px 8px", borderRadius: 99 }}>{n.category}</span>
                          <span style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 600, color: G.muted }}>
                            <span style={{ width: 6, height: 6, borderRadius: "50%", background: PRIORITY_DOT[n.priority] }} />
                            {n.priority}
                          </span>
                          {!n.read && <span style={{ fontSize: 10, fontWeight: 800, color: G.greenDeep }}>NEW</span>}
                        </div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 3px", lineHeight: 1.4 }}>{n.title}</p>
                        <p style={{ fontSize: 12, color: G.muted, margin: "0 0 8px", lineHeight: 1.6 }}>{n.desc}</p>
                        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                          <span style={{ fontSize: 11, color: G.muted }}>{n.time}</span>
                          <button onClick={() => { markRead(n.id); navigate(n.actionRoute); }} style={{ fontSize: 12, fontWeight: 700, color: G.greenDeep, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, padding: 0 }}>
                            {n.actionLabel} →
                          </button>
                          {!n.read && (
                            <button onClick={() => markRead(n.id)} style={{ fontSize: 12, color: G.muted, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, padding: 0 }}>
                              Mark read
                            </button>
                          )}
                          <button onClick={() => dismiss(n.id)} style={{ fontSize: 12, color: G.border, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, padding: 0, marginLeft: "auto" }}>
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

export default AdminNotifications;