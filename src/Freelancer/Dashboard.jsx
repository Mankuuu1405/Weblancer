import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
  greenDeep:   "#14532d",
  greenBg:     "#f0fdf4",
  greenBorder: "#bbf7d0",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

// ── Data ─────────────────────────────────────────────────────
const STATS = [
  { icon: "📦", label: "Active Projects",   value: "2",      sub: "On track",          subColor: G.green     },
  { icon: "🔒", label: "In Escrow",         value: "₹1.04L", sub: "Protected funds",   subColor: "#3b82f6"   },
  { icon: "💳", label: "Available Balance", value: "₹1.88L", sub: "Ready to withdraw", subColor: G.greenDark },
  { icon: "🎯", label: "Trust Score",       value: "78/100", sub: "Rising Talent ↑",   subColor: "#7c3aed"   },
  { icon: "📨", label: "Open Proposals",    value: "5",      sub: "2 need action",     subColor: "#f59e0b"   },
  { icon: "⭐", label: "Avg Rating",         value: "4.9",    sub: "Top Rated 🏆",      subColor: "#f59e0b"   },
];

const PROJECTS = [
  { name: "Food Delivery App",    client: "ByteEats Co.",    progress: 40, status: "On Track", milestone: "Core Dev · M2/4", escrow: "₹58K", due: "May 20" },
  { name: "E-commerce Dashboard", client: "GlobalShop Ltd.", progress: 30, status: "On Track", milestone: "API · M1/3",      escrow: "₹42K", due: "Jun 1"  },
];

const PROPOSALS_PREVIEW = [
  { title: "E-Commerce Platform Revamp", company: "ShopEasy Retail",   stage: "accepted",     match: 95 },
  { title: "Travel Booking Frontend",    company: "TravelNest",         stage: "negotiation",  match: 91 },
  { title: "FinTech SaaS Dashboard",     company: "FinSmart Solutions", stage: "under_review", match: 88 },
];

const RECENT_EARNINGS = [
  { label: "M1 — ShopEasy Retail",   amount: "₹56,400", status: "Released" },
  { label: "Advance — TravelNest",   amount: "₹39,480", status: "Released" },
  { label: "M2 — ShopEasy (Escrow)", amount: "₹58,280", status: "Escrow"   },
];

const NOTIFS = [
  { icon: "💰", text: "₹56,400 released — ShopEasy M1",         time: "5m ago",    urgent: false },
  { icon: "🔔", text: "Counter-offer from TravelNest",           time: "1h ago",    urgent: true  },
  { icon: "📋", text: "Contract signed — CON-2026-003",          time: "3h ago",    urgent: false },
  { icon: "⏰", text: "M2 due in 3 days — ShopEasy Core Build", time: "Yesterday", urgent: true  },
];

const STAGE_STYLE = {
  accepted:     { bg: "#f0fdf4", text: "#16a34a", dot: "#22c55e", label: "Accepted"     },
  negotiation:  { bg: "#f5f3ff", text: "#6d28d9", dot: "#7c3aed", label: "Negotiation"  },
  under_review: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b", label: "Under Review" },
};

const MONTHS = [
  { m: "O", v: 88000 }, { m: "N", v: 0     }, { m: "D", v: 52000 },
  { m: "J", v: 35000 }, { m: "F", v: 95000 }, { m: "M", v: 56400 },
];
const maxV = Math.max(...MONTHS.map(m => m.v));

// ── Trust Gauge ───────────────────────────────────────────────
function TrustGauge({ score = 78 }) {
  const r = 28, cx = 36, cy = 36;
  const circum = 2 * Math.PI * r;
  const fill   = (score / 100) * circum;
  return (
    <svg width="72" height="72" style={{ flexShrink: 0 }}>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#d1fae5" strokeWidth="5"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke={G.green} strokeWidth="5"
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circum - fill}`}
        strokeDashoffset={circum * 0.25}/>
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="13" fontWeight="800"
        fill={G.greenDeep} fontFamily={FONT}>{score}</text>
    </svg>
  );
}

// ── Dashboard (content only) ──────────────────────────────────
export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');

        .db-stat-card {
          background: ${G.white}; border: 1px solid ${G.border};
          border-radius: 14px; padding: 16px 18px;
          transition: all 0.18s; cursor: default;
        }
        .db-stat-card:hover {
          box-shadow: 0 4px 20px rgba(34,197,94,0.10);
          border-color: ${G.greenBorder};
          transform: translateY(-2px);
        }

        .db-proj-card {
          background: ${G.white}; border: 1px solid ${G.border};
          border-radius: 12px; padding: 14px 16px; transition: all 0.15s;
        }
        .db-proj-card:hover { border-color: ${G.greenBorder}; box-shadow: 0 2px 12px rgba(34,197,94,0.08); }

        .db-notif-row {
          display: flex; align-items: flex-start; gap: 10px;
          padding: 8px 8px; border-radius: 9px;
          cursor: pointer; transition: background 0.12s; margin-bottom: 4px;
        }
        .db-notif-row:hover { background: ${G.greenBg}; }

        .db-qa-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; background: ${G.bg};
          border: 1px solid ${G.border}; border-radius: 9px;
          cursor: pointer; font-size: 12px; font-weight: 600;
          color: ${G.text}; font-family: ${FONT};
          text-align: left; transition: all 0.12s; width: 100%;
        }
        .db-qa-btn:hover { background: ${G.greenBg}; border-color: ${G.greenBorder}; color: ${G.greenDark}; }

        .db-prop-row {
          display: flex; align-items: center; gap: 10px;
          padding: 10px 12px; border: 1px solid ${G.border};
          border-radius: 10px; cursor: pointer; transition: all 0.12s;
        }
        .db-prop-row:hover { border-color: ${G.greenBorder}; background: ${G.greenBg}; }
      `}</style>

      <div style={{ padding: "22px 24px 40px", fontFamily: FONT }}>

        {/* KYC Alert */}
        <div
          style={{ background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 12, padding: "12px 16px", marginBottom: 22, display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }}
          onClick={() => navigate("/freelancer/kyc")}
        >
          <span style={{ fontSize: 18 }}>⚠️</span>
          <div style={{ flex: 1 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: "#92400e" }}>Bank verification pending — withdrawals locked</p>
            <p style={{ fontSize: 11, color: "#78350f", marginTop: 2 }}>Complete KYC Step 3 to unlock full payouts</p>
          </div>
          <span style={{ fontSize: 12, fontWeight: 700, color: "#92400e", flexShrink: 0, whiteSpace: "nowrap" }}>Complete KYC →</span>
        </div>

        {/* 6 Stat Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, marginBottom: 22 }}>
          {STATS.map((s, i) => (
            <div key={i} className="db-stat-card">
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: 10, background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, flexShrink: 0 }}>{s.icon}</div>
                <p style={{ fontSize: 11, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>{s.label}</p>
              </div>
              <p style={{ fontSize: 22, fontWeight: 800, color: G.text, letterSpacing: "-0.5px", fontFamily: FONT }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: s.subColor, marginTop: 4 }}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* 3-column main grid */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 288px", gap: 16 }}>

          {/* ── Col 1: Projects + Trust Score ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Active Projects */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Active Projects</p>
                <button onClick={() => navigate("/freelancer/contracts")}
                  style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
                  View All →
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {PROJECTS.map((p, i) => (
                  <div key={i} className="db-proj-card">
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 2 }}>{p.name}</p>
                        <p style={{ fontSize: 11, color: G.muted }}>{p.client}</p>
                      </div>
                      <span style={{ fontSize: 10, fontWeight: 700, background: G.greenBg, color: G.greenDark, border: `1px solid ${G.greenBorder}`, borderRadius: 99, padding: "2px 8px", flexShrink: 0 }}>{p.status}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                      <div style={{ flex: 1, height: 5, background: "#f3f4f6", borderRadius: 99, overflow: "hidden" }}>
                        <div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg,${G.green},#86efac)`, borderRadius: 99 }} />
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, color: G.greenDark }}>{p.progress}%</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
                      <span style={{ fontSize: 11, color: G.muted }}>{p.milestone}</span>
                      <div style={{ display: "flex", gap: 8 }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: "#2563eb" }}>🔒 {p.escrow}</span>
                        <span style={{ fontSize: 11, color: G.muted }}>📅 {p.due}</span>
                      </div>
                    </div>
                    <div style={{ display: "flex", gap: 6 }}>
                      <button onClick={() => navigate("/freelancer/contracts")}
                        style={{ flex: 1, fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "6px 0", cursor: "pointer", fontFamily: FONT }}>
                        📤 Submit Milestone
                      </button>
                      <button onClick={() => navigate("/project-stream")}
                        style={{ fontSize: 11, fontWeight: 600, color: "#4f46e5", background: "#eef2ff", border: "1px solid #c7d2fe", borderRadius: 7, padding: "6px 10px", cursor: "pointer", fontFamily: FONT }}>
                        💬
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Score */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 12 }}>Trust Score</p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <TrustGauge score={78} />
                <div>
                  <p style={{ fontSize: 15, fontWeight: 800, color: G.text, fontFamily: FONT }}>Rising Talent</p>
                  <p style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>Top 25% of all freelancers</p>
                  <div style={{ marginTop: 8, height: 4, width: 120, background: "#e5e7eb", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{ width: "78%", height: "100%", background: `linear-gradient(90deg,${G.green},#86efac)`, borderRadius: 99 }} />
                  </div>
                  <p style={{ fontSize: 10, color: G.muted, marginTop: 4 }}>Next: Top Rated at 81+</p>
                </div>
              </div>
            </div>
          </div>

          {/* ── Col 2: Proposals + Earnings ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Proposals preview */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>My Proposals</p>
                <button onClick={() => navigate("/freelancer/proposals")}
                  style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
                  View All →
                </button>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
                {PROPOSALS_PREVIEW.map((p, i) => {
                  const ss = STAGE_STYLE[p.stage] || STAGE_STYLE.under_review;
                  return (
                    <div key={i} className="db-prop-row" onClick={() => navigate("/freelancer/proposals")}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 12, fontWeight: 700, color: G.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.title}</p>
                        <p style={{ fontSize: 11, color: G.muted, marginTop: 1 }}>{p.company}</p>
                      </div>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                        <span style={{ fontSize: 10, fontWeight: 700, background: ss.bg, color: ss.text, padding: "2px 8px", borderRadius: 99, display: "flex", alignItems: "center", gap: 3 }}>
                          <span style={{ width: 4, height: 4, borderRadius: "50%", background: ss.dot }} />
                          {ss.label}
                        </span>
                        <span style={{ fontSize: 11, fontWeight: 700, color: G.greenDark }}>{p.match}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <button onClick={() => navigate("/freelancer/proposals")}
                style={{ marginTop: 12, width: "100%", fontSize: 12, fontWeight: 700, color: G.white, background: G.green, border: "none", borderRadius: 9, padding: "9px", cursor: "pointer", fontFamily: FONT }}>
                ✏️ New Proposal
              </button>
            </div>

            {/* Earnings preview */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Earnings</p>
                  <p style={{ fontSize: 11, color: G.muted }}>Last 6 months</p>
                </div>
                <button onClick={() => navigate("/freelancer/earnings")}
                  style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
                  Full Report →
                </button>
              </div>
              {/* Mini bar chart */}
              <div style={{ display: "flex", alignItems: "flex-end", gap: 5, height: 60, marginBottom: 14 }}>
                {MONTHS.map((m, i) => (
                  <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 3, height: "100%", justifyContent: "flex-end" }}>
                    <div style={{
                      width: "100%",
                      height: `${maxV > 0 ? Math.max(m.v / maxV * 100, m.v > 0 ? 5 : 0) : 0}%`,
                      background: i === 5 ? `linear-gradient(180deg,${G.green},${G.greenDark})` : G.greenBg,
                      border: `1px solid ${G.greenBorder}`,
                      borderRadius: "4px 4px 0 0",
                      transition: "height 0.3s",
                    }} />
                    <span style={{ fontSize: 9, color: G.muted, fontWeight: 600 }}>{m.m}</span>
                  </div>
                ))}
              </div>
              {/* Recent transactions */}
              {RECENT_EARNINGS.map((e, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "7px 0", borderBottom: i < 2 ? "1px solid #f9fafb" : "none" }}>
                  <p style={{ fontSize: 12, color: G.text, fontWeight: 500 }}>{e.label}</p>
                  <div style={{ display: "flex", gap: 7, alignItems: "center" }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: G.greenDark }}>{e.amount}</span>
                    <span style={{
                      fontSize: 10, fontWeight: 600,
                      background: e.status === "Released" ? G.greenBg : "#eff6ff",
                      color: e.status === "Released" ? G.greenDark : "#1d4ed8",
                      border: `1px solid ${e.status === "Released" ? G.greenBorder : "#bfdbfe"}`,
                      borderRadius: 99, padding: "1px 7px"
                    }}>{e.status}</span>
                  </div>
                </div>
              ))}
              <button onClick={() => navigate("/freelancer/withdrawals")}
                style={{ marginTop: 12, width: "100%", fontSize: 12, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 9, padding: "9px", cursor: "pointer", fontFamily: FONT }}>
                📤 Withdraw Earnings
              </button>
            </div>
          </div>

          {/* ── Col 3: Notifications + Quick Actions + Month Summary ── */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>

            {/* Notifications */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Notifications</p>
                <button onClick={() => navigate("/freelancer/notifications")}
                  style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
                  All →
                </button>
              </div>
              {NOTIFS.map((n, i) => (
                <div key={i} className="db-notif-row" onClick={() => navigate("/freelancer/notifications")}>
                  <div style={{ width: 32, height: 32, borderRadius: 9, background: n.urgent ? "#fef3c7" : G.greenBg, border: `1px solid ${n.urgent ? "#fde68a" : G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, flexShrink: 0 }}>
                    {n.icon}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: n.urgent ? 700 : 500, color: G.text, lineHeight: 1.4, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>
                      {n.text}
                    </p>
                    <p style={{ fontSize: 10, color: G.muted, marginTop: 2 }}>{n.time}</p>
                  </div>
                  {n.urgent && <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#f59e0b", flexShrink: 0, marginTop: 5 }} />}
                </div>
              ))}
            </div>

            {/* Quick Actions */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 10 }}>Quick Actions</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {[
                  { icon: "🔍", label: "Browse Jobs",         path: "/freelancer/proposals"   },
                  { icon: "📤", label: "Submit Milestone",     path: "/freelancer/contracts"   },
                  { icon: "💰", label: "Withdraw Earnings",    path: "/freelancer/withdrawals" },
                  { icon: "🪪", label: "Complete KYC",         path: "/freelancer/kyc"         },
                  { icon: "💬", label: "ProjectStream",        path: "/project-stream"         },
                  { icon: "📊", label: "Earnings Report",      path: "/freelancer/earnings"    },
                ].map((a, i) => (
                  <button key={i} className="db-qa-btn" onClick={() => navigate(a.path)}>
                    <span style={{ fontSize: 14 }}>{a.icon}</span>
                    {a.label}
                    <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ marginLeft: "auto", opacity: 0.35 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/>
                    </svg>
                  </button>
                ))}
              </div>
            </div>

            {/* This month summary */}
            <div style={{ background: `linear-gradient(135deg,${G.greenDeep},#166534)`, borderRadius: 14, padding: "16px 18px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -20, right: -20, width: 80, height: 80, borderRadius: "50%", background: "rgba(34,197,94,0.08)", pointerEvents: "none" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.35)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 14 }}>This Month</p>
              {[
                ["Net Earned",    "₹56,400",   "#86efac"],
                ["In Escrow",     "₹1,00,000", "#93c5fd"],
                ["Win Rate",      "73%",        "rgba(255,255,255,0.7)"],
                ["Response Time", "1.2h ✓",    "#86efac"],
              ].map(([k, v, c]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.38)" }}>{k}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: c, fontFamily: FONT }}>{v}</span>
                </div>
              ))}
              <button onClick={() => navigate("/freelancer/earnings")}
                style={{ marginTop: 8, width: "100%", fontSize: 11, fontWeight: 700, color: "#86efac", background: "rgba(34,197,94,0.12)", border: "1px solid rgba(34,197,94,0.25)", borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: FONT }}>
                Full Earnings Report →
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}