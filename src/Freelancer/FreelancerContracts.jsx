import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fc-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fc-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

/* ── Two color families — green + navy ───────────────────────
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

  text:   "#1C1C1C",
  sub:    "#4b5563",
  muted:  "#9ca3af",
  border: "#e5e7eb",
  bg:     "#f9fafb",
  white:  "#ffffff",
};
const FONT = "'Poppins', sans-serif";

const STAGE_STYLE = {
  active:             { bg: G.greenBg,  text: G.greenDeep, dot: G.green,    label: "Active"             },
  awaiting_signature: { bg: "#fef3c7",  text: "#92400e",   dot: "#f59e0b",  label: "Awaiting Signature" },
  completed:          { bg: G.navyBg,   text: G.navy,      dot: G.navyLight,label: "Completed"          },
  on_hold:            { bg: "#fff7ed",  text: "#c2410c",   dot: "#f97316",  label: "On Hold"            },
  disputed:           { bg: "#fef2f2",  text: "#dc2626",   dot: "#ef4444",  label: "Disputed"           },
  terminated:         { bg: "#f3f4f6",  text: "#6b7280",   dot: "#9ca3af",  label: "Terminated"         },
};

const MS_STYLE = {
  released:    { bg: G.greenBg,  text: G.greenDeep, dot: G.green,    label: "Released ✅"  },
  in_escrow:   { bg: G.navyBg,   text: G.navy,      dot: G.navyLight,label: "In Escrow 🔵" },
  pending:     { bg: "#fef3c7",  text: "#92400e",   dot: "#f59e0b",  label: "Pending ⏳"   },
  not_started: { bg: "#f3f4f6",  text: "#6b7280",   dot: "#9ca3af",  label: "Not Started"  },
  disputed:    { bg: "#fef2f2",  text: "#dc2626",   dot: "#ef4444",  label: "Disputed 🔴"  },
};

const DL_STYLE = {
  not_started: { bg: "#f3f4f6",  text: G.muted,     label: "Not Started" },
  in_progress: { bg: "#fef3c7",  text: "#92400e",   label: "In Progress" },
  submitted:   { bg: G.navyBg,   text: G.navy,      label: "Submitted"   },
  approved:    { bg: G.greenBg,  text: G.greenDeep, label: "Approved ✅" },
};

const CONTRACTS = [
  {
    id: "CON-2026-001", title: "E-Commerce Platform Revamp",
    client: "Vikram Singh", company: "ShopEasy Retail", avatarColor: "#3b82f6", avatar: "VS",
    service: "Web Development", stage: "active",
    start: "Mar 10, 2026", end: "Jul 10, 2026",
    total: 220000, earned: 56400, escrow: 62000, onHold: 0,
    clientVerified: true,
    signatures: { freelancer: true, client: true },
    milestones: [
      { id: "M1", name: "Discovery & Architecture", amount: 60000, due: "Mar 20, 2026", status: "released",    invoiceRaised: true  },
      { id: "M2", name: "Core Development",         amount: 80000, due: "Apr 15, 2026", status: "in_escrow",   invoiceRaised: false },
      { id: "M3", name: "Testing & QA",             amount: 50000, due: "May 10, 2026", status: "pending",     invoiceRaised: false },
      { id: "M4", name: "Deployment & Handover",    amount: 30000, due: "Jun 1, 2026",  status: "not_started", invoiceRaised: false },
    ],
    deliverables: [
      { name: "UX Wireframes & Prototype", desc: "Figma prototype for all screens", status: "approved"    },
      { name: "Product Listing Module",    desc: "Frontend code + responsive",      status: "in_progress" },
      { name: "Cart & Checkout Flow",      desc: "Full cart to payment flow",       status: "not_started" },
      { name: "Admin Dashboard",           desc: "Order management dashboard",      status: "not_started" },
    ],
    activity: [
      "Mar 10 — Contract signed by both parties",
      "Mar 11 — Kickoff call completed",
      "Mar 15 — Deliverable 'UX Wireframes' submitted",
      "Mar 17 — Client approved UX Wireframes",
      "Mar 20 — M1 invoice raised",
      "Mar 21 — M1 payment released (₹56,400 net)",
    ],
    dispute: null, hold: null,
  },
  {
    id: "CON-2026-003", title: "Travel Booking Platform Frontend",
    client: "Aditya Bose", company: "TravelNest", avatarColor: "#f59e0b", avatar: "AB",
    service: "Web Development", stage: "active",
    start: "Mar 12, 2026", end: "Aug 15, 2026",
    total: 120000, earned: 39480, escrow: 42000, onHold: 0,
    clientVerified: true,
    signatures: { freelancer: true, client: true },
    milestones: [
      { id: "M1", name: "Discovery & Architecture", amount: 42000, due: "Mar 26, 2026", status: "in_escrow",   invoiceRaised: true  },
      { id: "M2", name: "Hotel Search UI",          amount: 40000, due: "Apr 25, 2026", status: "not_started", invoiceRaised: false },
      { id: "M3", name: "Flight & Booking Flow",    amount: 38000, due: "Jun 15, 2026", status: "not_started", invoiceRaised: false },
    ],
    deliverables: [
      { name: "Architecture Document", desc: "Tech stack and component design", status: "approved"    },
      { name: "Hotel Search Module",   desc: "Search UI with filters",          status: "in_progress" },
      { name: "Flight Integration UI", desc: "Flight search and booking",       status: "not_started" },
    ],
    activity: [
      "Mar 12 — Contract signed",
      "Mar 14 — Architecture document submitted",
      "Mar 16 — Client approved architecture",
      "Mar 17 — M1 invoice raised",
    ],
    dispute: null, hold: null,
  },
  {
    id: "CON-2026-004", title: "Patient Portal Frontend",
    client: "Sneha Kapoor", company: "HealthFirst Clinic", avatarColor: "#ef4444", avatar: "SK",
    service: "Web Development", stage: "on_hold",
    start: "Feb 20, 2026", end: "May 20, 2026",
    total: 140000, earned: 0, escrow: 0, onHold: 38000,
    clientVerified: false,
    signatures: { freelancer: true, client: true },
    milestones: [
      { id: "M1", name: "UI Design & Prototype", amount: 38000, due: "Mar 15, 2026", status: "disputed",    invoiceRaised: true  },
      { id: "M2", name: "Patient Module",        amount: 50000, due: "Apr 10, 2026", status: "not_started", invoiceRaised: false },
      { id: "M3", name: "Admin & Reports",       amount: 52000, due: "May 5, 2026",  status: "not_started", invoiceRaised: false },
    ],
    deliverables: [
      { name: "UI Design System",  desc: "Component library and design tokens", status: "submitted"   },
      { name: "Patient Dashboard", desc: "Patient-facing portal",               status: "not_started" },
    ],
    activity: [
      "Feb 20 — Contract signed",
      "Mar 10 — UI Design submitted",
      "Mar 10 — Client put project on hold",
    ],
    dispute: { amount: 38000, claim: "M1 work completed and submitted but payment not released", status: "Platform Review — response in 3–5 days", filed: "Mar 8, 2026" },
    hold: { reason: "Legal review pending", date: "Mar 10, 2026", client: "Sneha Kapoor" },
  },
  {
    id: "CON-2025-018", title: "Food Delivery App — React Native",
    client: "Neha Gupta", company: "Zestify Foods", avatarColor: "#8b5cf6", avatar: "NG",
    service: "Mobile Development", stage: "completed",
    start: "Jan 10, 2026", end: "Feb 28, 2026",
    total: 110000, earned: 103400, escrow: 0, onHold: 0,
    clientVerified: true,
    signatures: { freelancer: true, client: true },
    milestones: [
      { id: "M1", name: "UI Design",    amount: 30000, due: "Jan 25, 2026", status: "released", invoiceRaised: true },
      { id: "M2", name: "App Build",    amount: 50000, due: "Feb 15, 2026", status: "released", invoiceRaised: true },
      { id: "M3", name: "Testing & QA", amount: 30000, due: "Feb 28, 2026", status: "released", invoiceRaised: true },
    ],
    deliverables: [
      { name: "iOS App",     desc: "App Store ready build",  status: "approved" },
      { name: "Android App", desc: "Play Store ready build", status: "approved" },
    ],
    activity: ["Jan 10 — Signed", "Feb 28 — All milestones completed", "Feb 28 — Contract closed"],
    dispute: null, hold: null,
  },
];

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

const btnPrimary = {
  display: "inline-flex", alignItems: "center", gap: 8,
  fontSize: 13, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy,
  color: G.white, border: "none", borderRadius: 100,
  padding: "10px 20px", cursor: "pointer",
  boxShadow: "0 3px 16px rgba(15,26,59,0.30)",
  transition: "all 0.2s", whiteSpace: "nowrap",
};

const btnGreen = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradGreen, color: G.white,
  border: "none", borderRadius: 8,
  padding: "7px 14px", cursor: "pointer",
  boxShadow: "0 2px 10px rgba(46,125,31,0.22)",
  transition: "all 0.15s",
};

const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  borderRadius: 8, padding: "7px 14px", cursor: "pointer",
  transition: "all 0.15s",
};

export default function FreelancerContracts() {
  const [tab,        setTab]        = useState("all");
  const [contracts,  setContracts]  = useState(CONTRACTS);
  const [detail,     setDetail]     = useState(null);
  const [showNew,    setShowNew]    = useState(false);
  const [invoiceFor, setInvoiceFor] = useState(null);

  const stats = useMemo(() => ({
    active:    contracts.filter(c => c.stage === "active").length,
    completed: contracts.filter(c => c.stage === "completed").length,
    total:     contracts.reduce((s, c) => s + c.total, 0),
    earned:    contracts.reduce((s, c) => s + c.earned, 0),
    pending:   contracts.reduce((s, c) => s + c.milestones.filter(m => m.status === "pending" || m.status === "in_escrow").length, 0),
    disputed:  contracts.filter(c => c.stage === "disputed" || c.dispute).length,
  }), [contracts]);

  const TABS = [
    { id: "all",                label: "All"                },
    { id: "active",             label: "Active"             },
    { id: "awaiting_signature", label: "Awaiting Signature" },
    { id: "completed",          label: "Completed"          },
    { id: "on_hold",            label: "On Hold"            },
    { id: "disputed",           label: "Disputed"           },
  ];

  const rows = useMemo(() => tab === "all" ? contracts : contracts.filter(c => c.stage === tab), [contracts, tab]);

  const allDeadlines = useMemo(() =>
    contracts.filter(c => c.stage === "active")
      .flatMap(c => c.milestones.filter(m => m.status !== "released").map(m => ({ ...m, contract: c.title, contractId: c.id })))
      .sort((a, b) => a.due.localeCompare(b.due))
  , [contracts]);

  return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6EC030; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #2E7D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6EC030 #f1f1f1; }
      `}</style>

      <Navbar />

      <header style={{ background: G.white, borderBottom: `1px solid ${G.greenBorder}`, boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
        <div style={{ maxWidth: 1160, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", padding: "20px 0 0" }}>
            <div>
              <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>My Contracts</h1>
              <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Manage active projects and track payments</p>
            </div>
            <button onClick={() => setShowNew(true)} style={{ ...btnPrimary, marginBottom: 4 }}>
              + New Contract
            </button>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 0, marginTop: 18, paddingTop: 18, borderTop: `1px solid ${G.greenBorder}` }}>
            {[
              { label: "Active",               val: stats.active,      accent: G.greenDeep  },
              { label: "Completed",            val: stats.completed,   accent: G.navy       },
              { label: "Total Contract Value", val: fmt(stats.total),  accent: G.text, big: true },
              { label: "Earned So Far",        val: fmt(stats.earned), accent: G.green      },
              { label: "Pending Milestones",   val: stats.pending,     accent: "#d97706"    },
              { label: "Disputes",             val: stats.disputed,    accent: "#dc2626"    },
            ].map((s, i, arr) => (
              <div key={i} style={{
                flex: s.big ? 1.4 : 1, paddingBottom: 16,
                borderRight: i < arr.length - 1 ? `1px solid ${G.greenBorder}` : "none",
                paddingLeft: i === 0 ? 0 : 20,
              }}>
                <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                <p style={{ fontSize: s.big ? 22 : 20, fontWeight: 800, color: s.accent, margin: 0 }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display: "flex", marginTop: 4, borderTop: `1px solid ${G.greenBorder}` }}>
            {TABS.map(t => {
              const cnt    = t.id === "all" ? contracts.length : contracts.filter(c => c.stage === t.id).length;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{
                    display: "flex", alignItems: "center", gap: 6,
                    padding: "10px 12px", fontSize: 13,
                    fontWeight: active ? 700 : 500,
                    color: active ? G.navy : G.sub,
                    background: "none", border: "none",
                    borderBottom: active ? `2px solid ${G.navy}` : "2px solid transparent",
                    cursor: "pointer", marginBottom: -1,
                    transition: "all 0.12s", fontFamily: FONT,
                  }}>
                  {t.label}
                  <span style={{
                    fontSize: 11, fontWeight: 700,
                    background: active ? G.navy : "#f3f4f6",
                    color: active ? G.white : G.muted,
                    padding: "1px 7px", borderRadius: 99,
                  }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main style={{ maxWidth: 1160, margin: "0 auto", padding: "24px 28px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 20 }}>

          {/* Left — contract cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {rows.map(c => (
              <ContractCard key={c.id} contract={c}
                onOpen={() => setDetail(c)}
                onRaiseInvoice={() => setInvoiceFor(c)} />
            ))}
            {rows.length === 0 && (
              <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, textAlign: "center", padding: "56px 20px", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
                <p style={{ fontSize: 36, marginBottom: 8 }}>📋</p>
                <p style={{ fontSize: 15, fontWeight: 700, color: G.text }}>No contracts here</p>
                <p style={{ fontSize: 13, color: G.muted, marginTop: 4 }}>Accept a proposal to create your first contract</p>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Earnings summary — navy tonal gradient */}
            <div style={{
              background: G.gradNavy,
              borderRadius: 16, padding: "18px 20px", position: "relative", overflow: "hidden",
              boxShadow: "0 4px 24px rgba(15,26,59,0.28)",
            }}>
              <div style={{ position: "absolute", top: -24, right: -24, width: 80, height: 80, borderRadius: "50%", background: "rgba(168,224,99,0.10)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -16, left: -16, width: 60, height: 60, borderRadius: "50%", background: "rgba(168,224,99,0.06)", pointerEvents: "none" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 14 }}>Earnings Summary</p>
              {[
                ["Released",    fmt(stats.earned),                                             G.green                ],
                ["In Escrow",   fmt(CONTRACTS.reduce((s, c) => s + c.escrow, 0)),              G.greenLight           ],
                ["On Hold",     fmt(CONTRACTS.reduce((s, c) => s + c.onHold, 0)),              "#fca5a5"              ],
                ["Total Value", fmt(stats.total),                                              "rgba(255,255,255,0.9)"],
              ].map(([k, v, color]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 9 }}>
                  <span style={{ fontSize: 12, color: "rgba(255,255,255,0.45)" }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color }}>{v}</span>
                </div>
              ))}
              <a href="/freelancer/earnings" style={{
                display: "block", textAlign: "center", marginTop: 12,
                fontSize: 12, fontWeight: 700, color: G.green, textDecoration: "none",
              }}>View Full Earnings →</a>
            </div>

            {/* Upcoming milestones */}
            <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 14 }}>Upcoming Milestones</p>
              {allDeadlines.slice(0, 4).map((m, i) => {
                const ms = MS_STYLE[m.status] || MS_STYLE.not_started;
                return (
                  <div key={i} style={{ display: "flex", gap: 10, marginBottom: 12, alignItems: "flex-start" }}>
                    <div style={{ width: 8, height: 8, borderRadius: "50%", background: ms.dot, flexShrink: 0, marginTop: 4 }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: 12, fontWeight: 600, color: G.text, marginBottom: 1 }}>{m.name}</p>
                      <p style={{ fontSize: 11, color: G.muted }}>{m.contract}</p>
                      <p style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, marginTop: 2 }}>📅 {m.due}</p>
                    </div>
                    <span style={{ fontSize: 12, fontWeight: 700, color: G.greenDeep }}>{fmt(m.amount)}</span>
                  </div>
                );
              })}
            </div>

            {/* Quick actions */}
            <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, padding: "18px 20px", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 12 }}>Quick Actions</p>
              {[
                { icon: "💰", label: "Raise Invoice",     href: "#"                       },
                { icon: "💬", label: "Message Client",    href: "/project-stream"         },
                { icon: "🪪", label: "Check KYC Status",  href: "/freelancer/kyc"         },
                { icon: "📤", label: "Withdraw Earnings", href: "/freelancer/withdrawals" },
              ].map((a, i) => (
                <a key={i} href={a.href}
                  style={{
                    display: "flex", alignItems: "center", gap: 9, padding: "9px 12px",
                    fontSize: 13, fontWeight: 600, color: G.greenDeep,
                    background: G.greenBg, border: `1px solid ${G.greenBorder}`,
                    borderRadius: 100, textDecoration: "none", marginBottom: 8, transition: "all 0.12s",
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = G.greenBorder; e.currentTarget.style.borderColor = G.green; }}
                  onMouseLeave={e => { e.currentTarget.style.background = G.greenBg; e.currentTarget.style.borderColor = G.greenBorder; }}>
                  <span style={{ fontSize: 16 }}>{a.icon}</span>{a.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>

      {detail     && <DetailModal    contract={detail}     onClose={() => setDetail(null)}     onRaiseInvoice={() => { setDetail(null); setInvoiceFor(detail); }} />}
      {invoiceFor && <InvoiceModal   contract={invoiceFor} onClose={() => setInvoiceFor(null)} />}
      {showNew    && <NewContractModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

/* ── Contract Card ──────────────────────────────────────────── */
function ContractCard({ contract: c, onOpen, onRaiseInvoice }) {
  const [hov, setHov] = useState(false);
  const ss              = STAGE_STYLE[c.stage] || STAGE_STYLE.active;
  const releasedPct     = Math.round((c.earned / c.total) * 100);
  const escrowPct       = Math.round((c.escrow / c.total) * 100);
  const activeMilestone = c.milestones.find(m => m.status === "in_escrow" || m.status === "pending");
  const canInvoice      = c.milestones.some(m => m.status === "pending" && !m.invoiceRaised);

  return (
    <div style={{
      background: G.white,
      border: `1.5px solid ${c.stage === "disputed" ? "#ef4444" : c.stage === "on_hold" ? "#f97316" : hov ? G.green : G.greenBorder}`,
      borderRadius: 16, overflow: "hidden", transition: "all 0.15s",
      boxShadow: hov ? "0 4px 24px rgba(110,192,48,0.13)" : "0 2px 8px rgba(110,192,48,0.05)",
    }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {c.stage === "on_hold" && c.hold && (
        <div style={{ background: "#fff7ed", borderBottom: "1px solid #fed7aa", padding: "8px 20px", display: "flex", gap: 8, alignItems: "center" }}>
          <span>⚠️</span>
          <p style={{ fontSize: 12, color: "#c2410c", fontWeight: 600 }}>On Hold — {c.hold.reason} · Since {c.hold.date}</p>
        </div>
      )}
      {c.dispute && (
        <div style={{ background: "#fef2f2", borderBottom: "1px solid #fecaca", padding: "8px 20px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <p style={{ fontSize: 12, color: "#dc2626", fontWeight: 600 }}>🔴 Dispute Filed · {c.dispute.status}</p>
          <span style={{ fontSize: 11, color: "#dc2626" }}>{c.dispute.filed}</span>
        </div>
      )}

      <div style={{ padding: "18px 20px" }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 12 }}>
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <p style={{ fontSize: 15, fontWeight: 700, color: G.text }}>{c.title}</p>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, background: ss.bg, color: ss.text, padding: "3px 10px", borderRadius: 99 }}>
                <span style={{ width: 5, height: 5, borderRadius: "50%", background: ss.dot }} />{ss.label}
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 26, height: 26, borderRadius: 8, background: c.avatarColor + "20", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, color: c.avatarColor }}>{c.avatar}</div>
              <p style={{ fontSize: 12, color: G.sub }}>{c.client} · {c.company}</p>
              {c.clientVerified && (
                <span style={{ fontSize: 10, fontWeight: 700, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}`, padding: "1px 8px", borderRadius: 99 }}>✓ Verified</span>
              )}
            </div>
          </div>
          <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
            <p style={{ fontSize: 20, fontWeight: 800, color: G.greenDeep }}>{fmt(c.total)}</p>
            <p style={{ fontSize: 11, color: G.muted, marginTop: 2 }}>{c.id}</p>
          </div>
        </div>

        {/* Payment health bar */}
        <div style={{ marginBottom: 14 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
            <span style={{ fontSize: 11, color: G.muted }}>Payment health</span>
            <span style={{ fontSize: 11, color: G.sub }}>{fmt(c.earned)} released of {fmt(c.total)}</span>
          </div>
          <div style={{ background: "#f3f4f6", borderRadius: 99, height: 8, overflow: "hidden", display: "flex" }}>
            <div style={{ width: `${releasedPct}%`, height: "100%", background: G.green, borderRadius: "99px 0 0 99px", transition: "width 0.3s" }} />
            <div style={{ width: `${escrowPct}%`, height: "100%", background: G.navy, transition: "width 0.3s" }} />
          </div>
          <div style={{ display: "flex", gap: 12, marginTop: 5 }}>
            <span style={{ fontSize: 10, color: G.muted, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: G.green }} /> Released</span>
            <span style={{ fontSize: 10, color: G.muted, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: G.navy }} /> Escrow</span>
            <span style={{ fontSize: 10, color: G.muted, display: "flex", alignItems: "center", gap: 4 }}><span style={{ width: 7, height: 7, borderRadius: "50%", background: "#f3f4f6", border: "1px solid #d1d5db" }} /> Remaining</span>
          </div>
        </div>

        {/* Meta row */}
        <div style={{ display: "flex", gap: 16, marginBottom: 14 }}>
          <div>
            <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Timeline</p>
            <p style={{ fontSize: 12, color: G.sub }}>{c.start} → {c.end}</p>
          </div>
          {activeMilestone && (
            <div>
              <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Active Milestone</p>
              <p style={{ fontSize: 12, color: G.greenDeep, fontWeight: 600 }}>{activeMilestone.name} · {activeMilestone.due}</p>
            </div>
          )}
          <div>
            <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 2 }}>Milestones</p>
            <p style={{ fontSize: 12, color: G.sub }}>{c.milestones.filter(m => m.status === "released").length}/{c.milestones.length} released</p>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          <button onClick={onOpen} style={{ ...btnOutline }}>View Details →</button>
          {canInvoice && <button onClick={onRaiseInvoice} style={{ ...btnGreen }}>💰 Raise Invoice</button>}
          <a href="/project-stream" style={{ ...btnOutline, color: G.navy, background: G.navyBg, border: `1px solid ${G.navyBorder}`, textDecoration: "none" }}>💬 Message</a>
          {c.dispute && (
            <button onClick={onOpen} style={{ fontSize: 12, fontWeight: 700, color: "#dc2626", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: FONT }}>🔴 View Dispute</button>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Detail Modal ───────────────────────────────────────────── */
function DetailModal({ contract: c, onClose, onRaiseInvoice }) {
  const [tab, setTab] = useState("overview");
  const ss = STAGE_STYLE[c.stage] || STAGE_STYLE.active;

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 720, maxHeight: "90vh", background: G.white, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 32px 80px rgba(15,26,59,0.22)" }}>

        {/* Navy tonal header */}
        <div style={{ background: G.gradNavy, padding: "20px 24px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 14 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <p style={{ fontSize: 18, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>{c.title}</p>
                <span style={{ fontSize: 11, fontWeight: 700, background: ss.bg, color: ss.text, padding: "3px 10px", borderRadius: 99 }}>{ss.label}</span>
              </div>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)" }}>{c.client} · {c.company} · {c.id}</p>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
          <div style={{ display: "flex", gap: 20, paddingBottom: 14 }}>
            {[["Total", fmt(c.total), G.green], ["Earned", fmt(c.earned), "rgba(255,255,255,0.8)"], ["Escrow", fmt(c.escrow), G.greenLight], ["Timeline", c.start + " → " + c.end, "rgba(255,255,255,0.5)"]].map(([k, v, col]) => (
              <div key={k}>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 3 }}>{k}</p>
                <p style={{ fontSize: 13, fontWeight: 700, color: col }}>{v}</p>
              </div>
            ))}
          </div>
          <div style={{ display: "flex" }}>
            {["overview", "milestones", "deliverables", "activity"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding: "10px 14px", fontSize: 13, fontWeight: tab === t ? 700 : 400, color: tab === t ? G.white : "rgba(255,255,255,0.4)", background: "none", border: "none", borderBottom: tab === t ? `2px solid ${G.green}` : "2px solid transparent", cursor: "pointer", textTransform: "capitalize", marginBottom: -1, fontFamily: FONT }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px" }}>
          {tab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              {c.dispute && (
                <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 12, padding: "14px 16px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#dc2626", marginBottom: 6 }}>🔴 Dispute Filed — {c.dispute.filed}</p>
                  <p style={{ fontSize: 12, color: G.sub, marginBottom: 4 }}>Claim: {c.dispute.claim}</p>
                  <p style={{ fontSize: 12, color: G.sub, marginBottom: 4 }}>Amount: <strong>{fmt(c.dispute.amount)}</strong></p>
                  <p style={{ fontSize: 12, color: "#dc2626", fontWeight: 600 }}>Status: {c.dispute.status}</p>
                </div>
              )}
              {c.hold && (
                <div style={{ background: "#fff7ed", border: "1px solid #fed7aa", borderRadius: 12, padding: "14px 16px" }}>
                  <p style={{ fontSize: 13, fontWeight: 700, color: "#c2410c", marginBottom: 4 }}>⚠️ Project On Hold</p>
                  <p style={{ fontSize: 12, color: G.sub }}>Reason: {c.hold.reason}</p>
                  <p style={{ fontSize: 12, color: G.sub }}>Since: {c.hold.date}</p>
                </div>
              )}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                {[
                  ["Contract ID", c.id], ["Service Type", c.service], ["Total Value", fmt(c.total)],
                  ["Start Date", c.start], ["End Date", c.end], ["Client", c.client + " · " + c.company],
                  ["Freelancer Signed", c.signatures.freelancer ? "✅ Yes" : "⏳ Pending"],
                  ["Client Signed",     c.signatures.client     ? "✅ Yes" : "⏳ Pending"],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding: "11px 14px", border: `1px solid ${G.greenBorder}`, borderRadius: 10 }}>
                    <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>{k}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "milestones" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.milestones.map(m => {
                const ms             = MS_STYLE[m.status] || MS_STYLE.not_started;
                const canInvoiceThis = m.status === "pending" && !m.invoiceRaised;
                return (
                  <div key={m.id} style={{ border: `1px solid ${m.status === "disputed" ? "#fecaca" : m.status === "released" ? G.greenBorder : G.border}`, borderRadius: 12, padding: "14px 16px", background: m.status === "released" ? G.greenBg : m.status === "disputed" ? "#fef2f2" : G.white }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: G.muted }}>{m.id}</span>
                          <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>{m.name}</p>
                          <span style={{ fontSize: 11, fontWeight: 700, background: ms.bg, color: ms.text, padding: "2px 9px", borderRadius: 99 }}>{ms.label}</span>
                        </div>
                        <p style={{ fontSize: 12, color: G.muted }}>Due {m.due}</p>
                      </div>
                      <div style={{ textAlign: "right", flexShrink: 0, marginLeft: 12 }}>
                        <p style={{ fontSize: 16, fontWeight: 800, color: G.greenDeep }}>{fmt(m.amount)}</p>
                        <p style={{ fontSize: 10, color: G.muted }}>-6% fee = {fmt(Math.round(m.amount * 0.94))} net</p>
                      </div>
                    </div>
                    {(canInvoiceThis || m.status === "in_escrow") && (
                      <div style={{ marginTop: 10, display: "flex", gap: 8 }}>
                        {canInvoiceThis && <button onClick={onRaiseInvoice} style={{ ...btnGreen }}>💰 Raise Invoice</button>}
                        {m.status === "in_escrow" && (
                          <button style={{ fontSize: 12, fontWeight: 700, color: G.navy, background: G.navyBg, border: `1px solid ${G.navyBorder}`, borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: FONT }}>✓ Mark as Complete</button>
                        )}
                        <button style={{ fontSize: 12, fontWeight: 600, color: G.sub, background: "#f3f4f6", border: "none", borderRadius: 8, padding: "7px 14px", cursor: "pointer", fontFamily: FONT }}>Request Extension</button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "deliverables" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {c.deliverables.map((d, i) => {
                const ds = DL_STYLE[d.status] || DL_STYLE.not_started;
                return (
                  <div key={i} style={{ border: `1px solid ${G.greenBorder}`, borderRadius: 12, padding: "14px 16px", borderLeft: `3px solid ${ds.text}` }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 4 }}>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 2 }}>{d.name}</p>
                        <p style={{ fontSize: 12, color: G.muted }}>{d.desc}</p>
                      </div>
                      <span style={{ fontSize: 11, fontWeight: 700, background: ds.bg, color: ds.text, padding: "3px 10px", borderRadius: 99, flexShrink: 0, marginLeft: 12 }}>{ds.label}</span>
                    </div>
                    {(d.status === "in_progress" || d.status === "not_started") && (
                      <button style={{ ...btnOutline, marginTop: 8 }}>📤 Submit Deliverable</button>
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {tab === "activity" && (
            <div style={{ position: "relative", paddingLeft: 20 }}>
              <div style={{ position: "absolute", left: 6, top: 0, bottom: 0, width: 2, background: G.greenBorder }} />
              {c.activity.map((a, i) => (
                <div key={i} style={{ paddingBottom: 18, position: "relative" }}>
                  <div style={{ width: 10, height: 10, borderRadius: "50%", background: G.green, border: "2px solid #fff", boxShadow: `0 0 0 2px ${G.green}`, position: "absolute", left: -16, top: 3 }} />
                  <p style={{ fontSize: 13, color: G.text, fontWeight: 500, lineHeight: 1.5 }}>{a}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── Invoice Modal ──────────────────────────────────────────── */
function InvoiceModal({ contract: c, onClose }) {
  const [workSummary, setWorkSummary] = useState("");
  const milestone = c.milestones.find(m => m.status === "pending" && !m.invoiceRaised) || c.milestones[0];
  const net       = Math.round(milestone.amount * 0.94);

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 500, background: G.white, borderRadius: 20, overflow: "hidden", boxShadow: "0 32px 80px rgba(15,26,59,0.22)" }}>
        <div style={{ background: G.gradNavy, padding: "18px 22px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>Raise Invoice</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginTop: 3 }}>{c.title} · {milestone.id} — {milestone.name}</p>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", color: "rgba(255,255,255,0.6)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
            </button>
          </div>
        </div>
        <div style={{ padding: "20px 22px" }}>
          <div style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 12, padding: "16px", marginBottom: 16 }}>
            {[["Milestone", milestone.name], ["Gross Amount", fmt(milestone.amount)], ["Platform Fee", "-" + fmt(Math.round(milestone.amount * 0.06)) + " (6%)"], ["You Receive", fmt(net)]].map(([k, v], i) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: i < 3 ? 8 : 0 }}>
                <span style={{ fontSize: 12, color: G.sub }}>{k}</span>
                <span style={{ fontSize: 12, fontWeight: i === 3 ? 800 : 600, color: i === 3 ? G.greenDeep : i === 2 ? "#dc2626" : G.text }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ marginBottom: 14 }}>
            <label style={{ fontSize: 11, fontWeight: 700, color: G.sub, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Work Summary</label>
            <textarea value={workSummary} onChange={e => setWorkSummary(e.target.value)} placeholder="Describe what you completed for this milestone…" rows={4}
              style={{ width: "100%", fontSize: 13, border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "10px 12px", outline: "none", resize: "none", fontFamily: FONT, boxSizing: "border-box" }} />
          </div>
          <div style={{ border: `1.5px dashed ${G.green}`, borderRadius: 12, padding: "16px", textAlign: "center", marginBottom: 16, cursor: "pointer", background: G.greenBg }}>
            <p style={{ fontSize: 13, color: G.greenDeep, fontWeight: 600 }}>📎 Attach proof of work (optional)</p>
            <p style={{ fontSize: 11, color: G.muted, marginTop: 3 }}>Screenshots, files, links</p>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ flex: 1, padding: "11px", fontSize: 13, fontWeight: 600, border: `1px solid ${G.greenBorder}`, background: G.white, color: G.sub, borderRadius: 100, cursor: "pointer", fontFamily: FONT }}>Cancel</button>
            <button style={{ ...btnPrimary, flex: 2, justifyContent: "center", borderRadius: 100, padding: "11px" }}>💰 Send Invoice to Client</button>
          </div>
          <p style={{ fontSize: 11, color: G.muted, textAlign: "center", marginTop: 10 }}>Client will be notified · Payment releases after approval</p>
        </div>
      </div>
    </div>
  );
}

/* ── New Contract Modal ─────────────────────────────────────── */
function NewContractModal({ onClose }) {
  const [step,       setStep]       = useState(1);
  const [milestones, setMilestones] = useState([{ name: "", amount: "", due: "" }]);
  const STEPS = ["Details", "Milestones", "Review"];

  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(4px)", display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", maxWidth: 580, maxHeight: "90vh", background: G.white, borderRadius: 20, display: "flex", flexDirection: "column", overflow: "hidden", boxShadow: "0 32px 80px rgba(15,26,59,0.22)" }}>
        <div style={{ background: G.gradNavy, padding: "18px 24px" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
            <p style={{ fontSize: 17, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>New Contract — Step {step} of {STEPS.length}</p>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 8, border: "1px solid rgba(255,255,255,0.15)", background: "rgba(255,255,255,0.08)", cursor: "pointer", color: "rgba(255,255,255,0.6)", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </div>
          <div style={{ display: "flex", gap: 4 }}>
            {STEPS.map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 99, background: i < step ? G.green : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "22px 24px" }}>
          {step === 1 && (
            <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
              <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>Contract Details</p>
              {[["Project Name", "e.g. E-Commerce Platform Revamp"], ["Client Name", "Full name"], ["Client Email", "client@company.com"]].map(([label, ph]) => (
                <div key={label}>
                  <label style={{ fontSize: 11, fontWeight: 700, color: G.sub, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                  <input placeholder={ph} style={finp} />
                </div>
              ))}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {[["Start Date"], ["End Date"]].map(([label]) => (
                  <div key={label}>
                    <label style={{ fontSize: 11, fontWeight: 700, color: G.sub, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>{label}</label>
                    <input type="date" style={finp} />
                  </div>
                ))}
              </div>
              <div>
                <label style={{ fontSize: 11, fontWeight: 700, color: G.sub, display: "block", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.06em" }}>Service Type</label>
                <select style={{ ...finp, background: G.white }}>
                  {["Web Development", "Mobile Development", "UI/UX Design", "Full Stack", "Other"].map(s => <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 14 }}>Milestones & Payment</p>
              {milestones.map((m, i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 110px 110px 32px", gap: 8, marginBottom: 10 }}>
                  <input value={m.name} onChange={e => setMilestones(prev => prev.map((x, j) => j === i ? { ...x, name: e.target.value } : x))} placeholder={`Milestone ${i + 1}`} style={finp} />
                  <input value={m.amount} onChange={e => setMilestones(prev => prev.map((x, j) => j === i ? { ...x, amount: e.target.value } : x))} placeholder="₹ amount" style={finp} />
                  <input type="date" value={m.due} onChange={e => setMilestones(prev => prev.map((x, j) => j === i ? { ...x, due: e.target.value } : x))} style={finp} />
                  {milestones.length > 1 && (
                    <button onClick={() => setMilestones(prev => prev.filter((_, j) => j !== i))} style={{ fontSize: 16, background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, cursor: "pointer", color: "#dc2626" }}>✕</button>
                  )}
                </div>
              ))}
              {milestones.length < 8 && (
                <button onClick={() => setMilestones(p => [...p, { name: "", amount: "", due: "" }])} style={{ ...btnOutline, fontSize: 12 }}>+ Add Milestone</button>
              )}
              <div style={{ marginTop: 14, padding: "12px 14px", background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: 12, color: G.sub }}>Total Contract Value</span>
                  <span style={{ fontSize: 14, fontWeight: 700, color: G.greenDeep }}>{fmt(milestones.reduce((s, m) => s + (Number(m.amount) || 0), 0))}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                  <span style={{ fontSize: 11, color: G.muted }}>You receive (after 6% fee)</span>
                  <span style={{ fontSize: 12, fontWeight: 600, color: G.sub }}>{fmt(Math.round(milestones.reduce((s, m) => s + (Number(m.amount) || 0), 0) * 0.94))}</span>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 14 }}>Review & Send</p>
              <div style={{ background: G.bg, borderRadius: 12, padding: "16px", marginBottom: 14 }}>
                <p style={{ fontSize: 13, color: G.sub, lineHeight: 1.7 }}>Review all contract details before sending to the client for signature. The client will receive an email with a link to review and sign.</p>
              </div>
              <div style={{ border: `1px solid ${G.greenBorder}`, background: G.greenBg, borderRadius: 12, padding: "14px", marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.greenDeep, marginBottom: 8 }}>Contract Summary</p>
                <p style={{ fontSize: 12, color: G.sub }}>Milestones: {milestones.filter(m => m.name).length}</p>
                <p style={{ fontSize: 12, color: G.sub, marginTop: 4 }}>Total Value: {fmt(milestones.reduce((s, m) => s + (Number(m.amount) || 0), 0))}</p>
                <p style={{ fontSize: 12, color: G.sub, marginTop: 4 }}>Your net (after 6%): {fmt(Math.round(milestones.reduce((s, m) => s + (Number(m.amount) || 0), 0) * 0.94))}</p>
              </div>
            </div>
          )}
        </div>

        <div style={{ padding: "14px 24px", borderTop: `1px solid ${G.greenBorder}`, display: "flex", justifyContent: "space-between", background: G.bg }}>
          <button onClick={() => step > 1 && setStep(s => s - 1)} disabled={step === 1}
            style={{ fontSize: 13, fontWeight: 600, padding: "9px 18px", border: `1px solid ${G.greenBorder}`, background: G.white, color: step === 1 ? G.muted : G.text, borderRadius: 100, cursor: step === 1 ? "not-allowed" : "pointer", fontFamily: FONT }}>← Back</button>
          {step < STEPS.length
            ? <button onClick={() => setStep(s => s + 1)} style={{ ...btnPrimary }}>Next →</button>
            : <button style={{ ...btnPrimary }}>📋 Send to Client</button>
          }
        </div>
      </div>
    </div>
  );
}

const finp = { width: "100%", fontSize: 13, border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "9px 11px", outline: "none", color: G.text, fontFamily: FONT, boxSizing: "border-box" };

function Navbar() {
  return (
    <nav style={{ height: 56, background: G.white, borderBottom: `1px solid ${G.greenBorder}`, boxShadow: "0 2px 12px rgba(110,192,48,0.08)", display: "flex", alignItems: "center", padding: "0 28px", gap: 12, position: "sticky", top: 0, zIndex: 40 ,overflow:"hidden"}}>
      <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", fontFamily: FONT }}>
           <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 65, width: 130, display: "block" }}
              />
            </div>
      </span>
      <div style={{ width: 1, height: 20, background: G.greenBorder }} />
      <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>Freelancer</span>
      <span style={{ fontSize: 12, color: G.greenBorder }}>/</span>
      <span style={{ fontSize: 12, color: G.text, fontWeight: 600 }}>Contracts</span>
      <div style={{ display: "flex", alignItems: "center", gap: 5, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 99, padding: "3px 10px", marginLeft: 4 }}>
        <span style={{ fontSize: 10 }}>💼</span>
        <span style={{ fontSize: 11, color: G.greenDeep, fontWeight: 700 }}>Freelancer</span>
      </div>
      <div style={{ flex: 1 }} />
      <div style={{ position: "relative", cursor: "pointer" }}>
        <span style={{ fontSize: 18 }}>🔔</span>
        <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%", background: "#ef4444", border: `1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width: 34, height: 34, borderRadius: "50%", background: G.gradNavy, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: G.white, marginLeft: 8, fontFamily: FONT, boxShadow: "0 2px 8px rgba(15,26,59,0.28)" }}>AJ</div>
    </nav>
  );
}