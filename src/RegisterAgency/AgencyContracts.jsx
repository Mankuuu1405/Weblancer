

import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-con-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-con-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  navy:        "#0D2855",
  blue:        "#1B72C0",
  green:       "#6FDA44",
  greenDark:   "#4db82e",
  grad:        "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
};

const FONT = "'Poppins', sans-serif";

const CONTRACTS = [
  {
    id: "CON-2026-001", proposalId: "PRO-003",
    client: "Vikram Singh", company: "ShopEasy Retail", email: "vikram@shopeasy.com",
    title: "E-Commerce Platform Revamp", service: "Web Development",
    value: 448000, currency: "₹", pricingType: "Hourly", stage: "active",
    signedDate: "Mar 5, 2026", startDate: "Mar 10, 2026", endDate: "Jul 10, 2026",
    progressPct: 18, agencySigned: true, clientSigned: true,
    paymentTerms: "Weekly billing, net 7 days",
    conditions: "Client has existing React codebase. Migration required.",
    doc: "ShopEasy_Contract_v1.pdf",
    milestones: [
      { name: "Discovery & Architecture",  due: "Mar 20, 2026", amount: 60000,  status: "paid",     invoiced: true  },
      { name: "Core Backend Build",         due: "Apr 15, 2026", amount: 140000, status: "invoiced", invoiced: true  },
      { name: "Frontend Integration",       due: "May 20, 2026", amount: 160000, status: "pending",  invoiced: false },
      { name: "QA, Testing & Deployment",  due: "Jun 25, 2026", amount: 88000,  status: "pending",  invoiced: false },
    ],
    deliverables: [
      { name: "UX Wireframes & Prototype", due: "Mar 18, 2026", status: "approved",    revisions: 1 },
      { name: "Backend REST APIs",          due: "Apr 10, 2026", status: "in_progress", revisions: 0 },
      { name: "Product Listing Module",     due: "Apr 28, 2026", status: "not_started", revisions: 0 },
      { name: "Checkout & Payment Flow",    due: "May 15, 2026", status: "not_started", revisions: 0 },
      { name: "Admin Dashboard",            due: "Jun 10, 2026", status: "not_started", revisions: 0 },
    ],
    activity: [
      { event: "Contract created",             date: "Mar 3, 2026",  by: "Raj Kumar"    },
      { event: "Sent to client for signature", date: "Mar 4, 2026",  by: "Raj Kumar"    },
      { event: "Signed by client",             date: "Mar 5, 2026",  by: "Vikram Singh" },
      { event: "Project kickoff",              date: "Mar 10, 2026", by: "Sara M."      },
      { event: "M1 invoice raised — ₹60,000", date: "Mar 20, 2026", by: "Raj Kumar"    },
      { event: "M1 payment received",          date: "Mar 22, 2026", by: "System"       },
    ],
    nextMilestone: "Apr 15, 2026", totalPaid: 60000,
    notes: "Client prefers weekly status calls every Monday. Slack channel active.",
  },
  {
    id: "CON-2026-002", proposalId: "PRO-006",
    client: "Meera Iyer", company: "FinSmart Solutions", email: "meera@finsmart.in",
    title: "Investment Portfolio Tracker", service: "Web Development",
    value: 290000, currency: "₹", pricingType: "Fixed", stage: "awaiting_signature",
    signedDate: null, startDate: "Mar 20, 2026", endDate: "Jun 28, 2026",
    progressPct: 0, agencySigned: true, clientSigned: false,
    paymentTerms: "25% advance, 50% mid, 25% delivery",
    conditions: "NSE & BSE API integration. Compliance review required.",
    doc: "FinSmart_Contract_v1.pdf",
    milestones: [
      { name: "UX Research & Design", due: "Apr 5, 2026",  amount: 50000,  status: "pending", invoiced: false },
      { name: "Backend & APIs",        due: "May 1, 2026",  amount: 120000, status: "pending", invoiced: false },
      { name: "Frontend Build",        due: "Jun 1, 2026",  amount: 90000,  status: "pending", invoiced: false },
      { name: "QA & Launch",           due: "Jun 28, 2026", amount: 30000,  status: "pending", invoiced: false },
    ],
    deliverables: [
      { name: "UI Design System",  due: "Apr 3, 2026",  status: "not_started", revisions: 0 },
      { name: "Portfolio API",      due: "Apr 25, 2026", status: "not_started", revisions: 0 },
      { name: "Tax Report Module",  due: "May 20, 2026", status: "not_started", revisions: 0 },
    ],
    activity: [
      { event: "Contract drafted",             date: "Mar 12, 2026", by: "Raj Kumar" },
      { event: "Agency signed",                date: "Mar 12, 2026", by: "Raj Kumar" },
      { event: "Sent to client for signature", date: "Mar 12, 2026", by: "Raj Kumar" },
      { event: "Reminder sent to client",      date: "Mar 13, 2026", by: "System"    },
    ],
    nextMilestone: "Apr 5, 2026", totalPaid: 0,
    notes: "Finance domain. Awaiting client signature since Mar 12. Follow up needed.",
  },
  {
    id: "CON-2026-003", proposalId: "PRO-007",
    client: "Aditya Bose", company: "TravelNest", email: "aditya@travelnest.in",
    title: "Travel Booking Platform", service: "Web Development",
    value: 520000, currency: "₹", pricingType: "Fixed", stage: "active",
    signedDate: "Mar 8, 2026", startDate: "Mar 12, 2026", endDate: "Aug 15, 2026",
    progressPct: 8, agencySigned: true, clientSigned: true,
    paymentTerms: "20% advance, 4 milestone payments",
    conditions: "GDS integration costs excluded from contract value.",
    doc: "TravelNest_Contract_Signed.pdf",
    milestones: [
      { name: "Discovery & Architecture", due: "Mar 26, 2026", amount: 60000,  status: "invoiced", invoiced: true  },
      { name: "Core Platform Build",       due: "May 10, 2026", amount: 240000, status: "pending",  invoiced: false },
      { name: "Payment & GDS Integration",due: "Jun 20, 2026", amount: 140000, status: "pending",  invoiced: false },
      { name: "Testing & Launch",          due: "Aug 10, 2026", amount: 80000,  status: "pending",  invoiced: false },
    ],
    deliverables: [
      { name: "Architecture Document",    due: "Mar 22, 2026", status: "delivered",   revisions: 0 },
      { name: "Hotel Search Module",       due: "Apr 20, 2026", status: "in_progress", revisions: 0 },
      { name: "Flight Search Integration",due: "May 5, 2026",  status: "not_started", revisions: 0 },
      { name: "Booking & Payment Flow",   due: "Jun 10, 2026", status: "not_started", revisions: 0 },
    ],
    activity: [
      { event: "Contract created",           date: "Mar 6, 2026",  by: "Raj Kumar" },
      { event: "Both parties signed",        date: "Mar 8, 2026",  by: "System"    },
      { event: "Advance invoice raised",     date: "Mar 10, 2026", by: "Raj Kumar" },
      { event: "Advance payment received",   date: "Mar 12, 2026", by: "System"    },
      { event: "Kickoff meeting completed",  date: "Mar 12, 2026", by: "Sara M."   },
      { event: "Architecture doc delivered", date: "Mar 13, 2026", by: "Dev Team"  },
    ],
    nextMilestone: "Mar 26, 2026", totalPaid: 104000,
    notes: "High-value client. Weekly sync every Wednesday. GDS vendor selection pending.",
  },
  {
    id: "CON-2026-004", proposalId: "PRO-002",
    client: "Sneha Kapoor", company: "HealthFirst Clinic", email: "sneha@healthfirst.in",
    title: "Patient Appointment Mobile App", service: "Mobile App",
    value: 320000, currency: "₹", pricingType: "Fixed", stage: "on_hold",
    signedDate: "Feb 20, 2026", startDate: "Feb 25, 2026", endDate: "May 25, 2026",
    progressPct: 35, agencySigned: true, clientSigned: true,
    paymentTerms: "50% advance, 50% delivery",
    conditions: "HIPAA compliance required.", doc: "HealthFirst_Contract.pdf",
    holdReason: "Client awaiting HIPAA compliance audit clearance from their legal team.",
    holdDate: "Mar 8, 2026", holdBy: "Sneha Kapoor",
    milestones: [
      { name: "UI/UX Design",    due: "Mar 10, 2026", amount: 80000,  status: "paid",    invoiced: true  },
      { name: "App Development", due: "Apr 20, 2026", amount: 160000, status: "pending", invoiced: false },
      { name: "Testing & Launch",due: "May 20, 2026", amount: 80000,  status: "pending", invoiced: false },
    ],
    deliverables: [
      { name: "App UI Screens (Figma)", due: "Mar 8, 2026",  status: "approved",    revisions: 2 },
      { name: "Doctor Profile Module",  due: "Apr 10, 2026", status: "in_progress", revisions: 0 },
      { name: "Booking Engine",         due: "Apr 20, 2026", status: "not_started", revisions: 0 },
      { name: "Video Call Integration", due: "May 10, 2026", status: "not_started", revisions: 0 },
    ],
    activity: [
      { event: "Contract signed",            date: "Feb 20, 2026", by: "Both parties" },
      { event: "M1 payment received",        date: "Feb 22, 2026", by: "System"       },
      { event: "UI designs delivered",       date: "Mar 8, 2026",  by: "Design Team"  },
      { event: "Client put project on hold", date: "Mar 8, 2026",  by: "Sneha Kapoor" },
    ],
    nextMilestone: "Apr 20, 2026", totalPaid: 80000,
    notes: "On hold due to client legal. Expected to resume Mar 25. Dev team on standby.",
  },
  {
    id: "CON-2026-005", proposalId: "PRO-OLD-12",
    client: "Neha Gupta", company: "Zestify Foods", email: "neha@zestify.in",
    title: "Food Delivery App — Phase 1", service: "Mobile App",
    value: 180000, currency: "₹", pricingType: "Fixed", stage: "completed",
    signedDate: "Jan 5, 2026", startDate: "Jan 8, 2026", endDate: "Mar 5, 2026",
    progressPct: 100, agencySigned: true, clientSigned: true,
    paymentTerms: "50% advance, 50% delivery",
    conditions: "Source code handover on final payment.", doc: "Zestify_Contract_Final.pdf",
    milestones: [
      { name: "Design & Architecture", due: "Jan 25, 2026", amount: 40000,  status: "paid", invoiced: true },
      { name: "App Development",        due: "Feb 20, 2026", amount: 100000, status: "paid", invoiced: true },
      { name: "Launch & Handover",      due: "Mar 5, 2026",  amount: 40000,  status: "paid", invoiced: true },
    ],
    deliverables: [
      { name: "UI/UX Designs",        due: "Jan 22, 2026", status: "approved", revisions: 1 },
      { name: "iOS & Android App",    due: "Feb 18, 2026", status: "approved", revisions: 0 },
      { name: "Admin Dashboard",      due: "Mar 1, 2026",  status: "approved", revisions: 0 },
      { name: "Source Code Handover", due: "Mar 5, 2026",  status: "approved", revisions: 0 },
    ],
    activity: [
      { event: "Contract signed",          date: "Jan 5, 2026",  by: "Both parties" },
      { event: "All milestones cleared",   date: "Mar 3, 2026",  by: "System"       },
      { event: "Final payment received",   date: "Mar 6, 2026",  by: "System"       },
      { event: "Contract marked complete", date: "Mar 6, 2026",  by: "Raj Kumar"    },
    ],
    nextMilestone: null, totalPaid: 180000,
    notes: "Successfully completed. Client gave 5-star review. Phase 2 discussion pending.",
  },
];

const STAGES = [
  { id: "all",                label: "All Contracts"      },
  { id: "draft",              label: "Draft"              },
  { id: "awaiting_signature", label: "Awaiting Signature" },
  { id: "active",             label: "Active"             },
  { id: "on_hold",            label: "On Hold"            },
  { id: "completed",          label: "Completed"          },
  { id: "disputed",           label: "Disputed"           },
  { id: "terminated",         label: "Terminated"         },
];

const STAGE_STYLE = {
  draft:               { bg: "#f3f4f6",   text: "#6b7280",  dot: "#9ca3af", border: "#e5e7eb"   },
  awaiting_signature:  { bg: "#fef3c7",   text: "#92400e",  dot: "#f59e0b", border: "#fde68a"   },
  active:              { bg: G.blueBg,    text: G.navy,     dot: G.blue,    border: G.blueBorder },
  on_hold:             { bg: "#fff7ed",   text: "#c2410c",  dot: "#f97316", border: "#fed7aa"   },
  completed:           { bg: "#f0fdf4",   text: "#15803d",  dot: G.green,   border: "#bbf7d0"   },
  disputed:            { bg: "#fef2f2",   text: "#dc2626",  dot: "#ef4444", border: "#fecaca"   },
  terminated:          { bg: "#f3f4f6",   text: "#374151",  dot: "#6b7280", border: "#d1d5db"   },
};

const DELIV_STYLE = {
  not_started: { bg: "#f3f4f6", text: "#6b7280", dot: "#9ca3af" },
  in_progress: { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b" },
  delivered:   { bg: G.blueBg,  text: G.navy,    dot: G.blue    },
  approved:    { bg: "#f0fdf4", text: "#15803d", dot: G.green   },
};

const MILESTONE_STYLE = {
  pending:  { bg: "#f3f4f6", text: "#6b7280"  },
  invoiced: { bg: "#fef3c7", text: "#92400e"  },
  paid:     { bg: "#f0fdf4", text: "#15803d"  },
};

const fmt = (n, c = "₹") => `${c}${Number(n).toLocaleString("en-IN")}`;
const pct = (paid, total) => total ? Math.round((paid / total) * 100) : 0;

function Pill({ stage, style: sx = {} }) {
  const s     = STAGE_STYLE[stage] || STAGE_STYLE.draft;
  const label = STAGES.find(x => x.id === stage)?.label || stage;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600,
      padding: "3px 10px", borderRadius: 99, background: s.bg, color: s.text, border: `1px solid ${s.border}`,
      whiteSpace: "nowrap", fontFamily: FONT, ...sx }}>
      <span style={{ width: 6, height: 6, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
      {label}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   ROOT
════════════════════════════════════════════════════════════════ */
export default function AgencyContracts() {
  const [list,    setList]    = useState(CONTRACTS);
  const [stage,   setStage]   = useState("all");
  const [search,  setSearch]  = useState("");
  const [detail,  setDetail]  = useState(null);
  const [showNew, setShowNew] = useState(false);

  const stats = useMemo(() => {
    const active    = list.filter(c => c.stage === "active").length;
    const pending   = list.filter(c => c.stage === "awaiting_signature").length;
    const hold      = list.filter(c => c.stage === "on_hold").length;
    const done      = list.filter(c => c.stage === "completed").length;
    const totalVal  = list.reduce((s, c) => s + c.value, 0);
    const totalPaid = list.reduce((s, c) => s + c.totalPaid, 0);
    return { active, pending, hold, done, totalVal, totalPaid };
  }, [list]);

  const overdue = useMemo(() =>
    list.filter(c => c.stage === "active").flatMap(c =>
      (c.milestones || []).filter(m => m.status === "pending")
    ).length, [list]);

  const rows = useMemo(() => list.filter(c => {
    if (stage !== "all" && c.stage !== stage) return false;
    if (search && !`${c.client} ${c.company} ${c.title} ${c.id}`.toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [list, stage, search]);

  const updateContract = (id, patch) => {
    setList(prev => prev.map(c => c.id === id ? { ...c, ...patch } : c));
    setDetail(prev => prev?.id === id ? { ...prev, ...patch } : prev);
  };

  return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: FONT }}>

      {/* NAVBAR */}
      <nav style={{ height: 56, background: G.white, borderBottom: `1px solid ${G.border}`,
        display: "flex", alignItems: "center", padding: "0 24px", gap: 12, position: "sticky", top: 0, zIndex: 40,
        boxShadow: "0 1px 4px rgba(13,40,85,0.07)" }}>

        {/* Weblance Logo */}
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />

        <div style={{ width: 1, height: 20, background: G.border }} />
        <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>Agency</span>
        <span style={{ fontSize: 12, color: G.border }}>/</span>
        <span style={{ fontSize: 12, color: G.navy, fontWeight: 600 }}>Contracts</span>

        {/* Admin badge */}
        <div style={{ display: "flex", alignItems: "center", gap: 5,
          background: G.blueBg, border: `1px solid ${G.blueBorder}`,
          borderRadius: 99, padding: "3px 10px", marginLeft: 4 }}>
          <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span style={{ fontSize: 11, color: G.navy, fontWeight: 700 }}>Agency Admin only</span>
        </div>

        <div style={{ flex: 1 }} />

        {/* Bell */}
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 18 }}>🔔</span>
          <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%",
            background: "#ef4444", border: `1.5px solid ${G.white}` }} />
        </div>

        {/* Avatar */}
        <div style={{ width: 34, height: 34, borderRadius: "50%",
          background: G.grad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: G.white, marginLeft: 8, fontFamily: FONT }}>RK</div>

        {/* New Contract btn */}
        <button onClick={() => setShowNew(true)} style={{ display: "flex", alignItems: "center", gap: 6,
          background: G.grad, color: G.white, border: "none", borderRadius: 10, padding: "8px 16px",
          fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT, marginLeft: 4,
          boxShadow: "0 3px 10px rgba(13,40,85,0.2)" }}>
          <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          New Contract
        </button>
      </nav>

      {/* PAGE HEADER */}
      <header style={{ background: G.white, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>

          {overdue > 0 && (
            <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8,
              padding: "8px 14px", marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⚠️</span>
              <span style={{ fontSize: 13, color: "#dc2626", fontWeight: 600 }}>
                {overdue} milestone{overdue > 1 ? "s" : ""} pending across active contracts — review payment schedule
              </span>
            </div>
          )}

          <div style={{ padding: "20px 0 0" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: G.navy, margin: 0, letterSpacing: "-0.4px" }}>Contracts</h1>
            <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Manage active contracts, track milestones and payments</p>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 0, marginTop: 18, paddingTop: 18, borderTop: "1px solid #f3f4f6" }}>
            {[
              { label: "Active",        val: stats.active,                                 accent: G.blue    },
              { label: "Awaiting Sign", val: stats.pending,                                accent: "#d97706" },
              { label: "On Hold",       val: stats.hold,                                   accent: "#c2410c" },
              { label: "Completed",     val: stats.done,                                   accent: "#15803d" },
              { label: "Total Value",   val: `₹${(stats.totalVal  / 100000).toFixed(1)}L`, accent: G.navy   },
              { label: "Collected",     val: `₹${(stats.totalPaid / 100000).toFixed(1)}L`, accent: G.blue   },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex: 1, paddingBottom: 16,
                borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                paddingLeft: i === 0 ? 0 : 20 }}>
                <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, marginBottom: 4,
                  textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                <p style={{ fontSize: 22, fontWeight: 800, color: s.accent, margin: 0, letterSpacing: "-0.4px" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Stage tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 4, borderTop: "1px solid #f3f4f6" }}>
            {STAGES.map(s => {
              const cnt    = s.id === "all" ? list.length : list.filter(c => c.stage === s.id).length;
              const active = stage === s.id;
              return (
                <button key={s.id} onClick={() => setStage(s.id)} style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "10px 12px",
                  fontSize: 13, fontWeight: active ? 700 : 400,
                  color: active ? G.navy : G.sub, background: "none", border: "none",
                  borderBottom: active ? `2px solid ${G.blue}` : "2px solid transparent",
                  cursor: "pointer", marginBottom: -1, transition: "all 0.12s", fontFamily: FONT }}>
                  {s.label}
                  <span style={{ fontSize: 11, fontWeight: 700,
                    background: active ? G.grad : "#f3f4f6",
                    color: active ? G.white : G.muted,
                    padding: "1px 7px", borderRadius: 99 }}>{cnt}</span>
                </button>
              );
            })}
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 4 }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: G.muted }}
                  width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search contracts…"
                  style={{ paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                    fontSize: 12, border: `1px solid ${G.border}`, borderRadius: 7, outline: "none",
                    width: 190, color: G.text, background: G.white, fontFamily: FONT }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 28px 64px" }}>
        <p style={{ fontSize: 11, color: G.muted, fontWeight: 700, textTransform: "uppercase",
          letterSpacing: "0.08em", marginBottom: 16 }}>
          {rows.length} contract{rows.length !== 1 ? "s" : ""}{stage !== "all" ? ` · ${STAGES.find(s => s.id === stage)?.label}` : ""}
        </p>

        {rows.length === 0 ? (
          <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14,
            textAlign: "center", padding: "64px 20px" }}>
            <p style={{ fontSize: 36, marginBottom: 12 }}>📋</p>
            <p style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>No contracts found</p>
            <p style={{ fontSize: 13, color: G.muted, marginTop: 4 }}>Adjust filters or create a new contract</p>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {rows.map(c => <ContractRow key={c.id} contract={c} onClick={() => setDetail(c)} />)}
          </div>
        )}
      </main>

      {detail  && <DetailModal  contract={detail} onClose={() => setDetail(null)} onUpdate={updateContract} />}
      {showNew && <NewContractModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════════
   CONTRACT ROW
════════════════════════════════════════════════════════════════ */
function ContractRow({ contract: c, onClick }) {
  const [hov, setHov] = useState(false);
  const paid    = pct(c.totalPaid, c.value);
  const s       = STAGE_STYLE[c.stage] || STAGE_STYLE.draft;
  const sigBoth = c.agencySigned && c.clientSigned;

  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background: G.white, border: `1.5px solid ${hov ? G.blueBorder : G.border}`,
        borderRadius: 14, padding: "18px 22px", cursor: "pointer",
        transition: "all 0.15s", boxShadow: hov ? "0 4px 20px rgba(13,40,85,0.1)" : "none",
        display: "flex", alignItems: "center", gap: 20 }}>

      <div style={{ width: 3, height: 44, borderRadius: 99, background: s.dot, flexShrink: 0 }} />

      <div style={{ width: 160, flexShrink: 0 }}>
        <p style={{ fontSize: 11, color: G.muted, fontWeight: 600, marginBottom: 3 }}>{c.id}</p>
        <p style={{ fontSize: 13, fontWeight: 700, color: G.navy, lineHeight: 1.3 }}>{c.company}</p>
        <p style={{ fontSize: 12, color: G.sub }}>{c.client}</p>
      </div>

      <div style={{ flex: 1 }}>
        <p style={{ fontSize: 14, fontWeight: 700, color: G.text, marginBottom: 3 }}>{c.title}</p>
        <div style={{ display: "flex", gap: 6 }}>
          <Tag>{c.service}</Tag>
          <Tag>from {c.proposalId}</Tag>
          {c.stage === "on_hold" && <Tag color="#c2410c" bg="#fff7ed">⏸ On Hold</Tag>}
        </div>
      </div>

      <div style={{ width: 130, flexShrink: 0 }}>
        <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Timeline</p>
        <p style={{ fontSize: 12, color: G.sub }}>{c.startDate}</p>
        <p style={{ fontSize: 12, color: G.sub }}>→ {c.endDate}</p>
      </div>

      <div style={{ width: 140, flexShrink: 0 }}>
        <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em" }}>Collected</p>
          <p style={{ fontSize: 10, color: G.navy, fontWeight: 700 }}>{paid}%</p>
        </div>
        <div style={{ background: "#f3f4f6", borderRadius: 99, height: 5, overflow: "hidden" }}>
          <div style={{ width: `${paid}%`, height: "100%", background: G.grad, borderRadius: 99, transition: "width 0.3s" }} />
        </div>
        <p style={{ fontSize: 11, color: G.sub, marginTop: 4 }}>{fmt(c.totalPaid)} / {fmt(c.value)}</p>
      </div>

      <div style={{ width: 120, flexShrink: 0 }}>
        <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 4 }}>Next Milestone</p>
        {c.nextMilestone
          ? <p style={{ fontSize: 12, color: G.blue, fontWeight: 700 }}>{c.nextMilestone}</p>
          : <p style={{ fontSize: 12, color: G.muted }}>—</p>}
      </div>

      <div style={{ width: 90, flexShrink: 0, textAlign: "center" }}>
        {sigBoth
          ? <span style={{ fontSize: 11, fontWeight: 700, color: "#15803d", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 7, padding: "4px 8px" }}>✓ Signed</span>
          : <span style={{ fontSize: 11, fontWeight: 700, color: "#92400e", background: "#fef3c7", border: "1px solid #fde68a", borderRadius: 7, padding: "4px 8px" }}>⏳ Pending</span>}
      </div>

      <div style={{ flexShrink: 0 }}><Pill stage={c.stage} /></div>

      <svg width="14" height="14" fill="none" stroke={hov ? G.blue : "#d1d5db"} viewBox="0 0 24 24"
        style={{ flexShrink: 0, transition: "stroke 0.15s" }}>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
      </svg>
    </div>
  );
}

function Tag({ children, color = G.sub, bg = "#f3f4f6" }) {
  return (
    <span style={{ fontSize: 11, fontWeight: 500, background: bg, color, padding: "2px 8px", borderRadius: 6, fontFamily: FONT }}>
      {children}
    </span>
  );
}

/* ════════════════════════════════════════════════════════════════
   DETAIL MODAL
════════════════════════════════════════════════════════════════ */
function DetailModal({ contract: c, onClose, onUpdate }) {
  const [tab, setTab] = useState("overview");
  const paid = pct(c.totalPaid, c.value);

  const markMilestone = (idx, status) => {
    const updated = c.milestones.map((m, i) => i === idx ? { ...m, status } : m);
    const newPaid  = updated.filter(m => m.status === "paid").reduce((s, m) => s + m.amount, 0);
    onUpdate(c.id, { milestones: updated, totalPaid: newPaid });
  };

  const markDeliverable = (idx, status) => {
    const updated = c.deliverables.map((d, i) => i === idx ? { ...d, status } : d);
    onUpdate(c.id, { deliverables: updated });
  };

  return (
    <Overlay onClose={onClose}>
      <div style={{ width: "100%", maxWidth: 760, maxHeight: "90vh", background: G.white, borderRadius: 18,
        display: "flex", flexDirection: "column", overflow: "hidden",
        boxShadow: "0 32px 80px rgba(0,0,0,0.2)" }}>

        {/* Navy→Blue gradient header */}
        <div style={{ background: G.grad, padding: "20px 26px 0" }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 600 }}>{c.id}</span>
                <span style={{ color: "rgba(255,255,255,0.2)" }}>·</span>
                <span style={{ fontSize: 11, color: "#93c5fd", fontWeight: 600 }}>← {c.proposalId}</span>
                <Pill stage={c.stage} style={{ marginLeft: 4 }} />
              </div>
              <p style={{ fontSize: 19, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>{c.title}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 4 }}>
                {c.client} · {c.company} · Signed {c.signedDate || "—"}
              </p>
            </div>
            <button onClick={onClose} style={{ width: 30, height: 30, borderRadius: 8,
              border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)", flexShrink: 0 }}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Payment health */}
          <div style={{ background: "rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 14px", marginBottom: 16 }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span style={{ fontSize: 11, color: "rgba(255,255,255,0.45)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em" }}>Payment Health</span>
              <span style={{ fontSize: 12, color: "#93c5fd", fontWeight: 700 }}>{paid}% collected · {fmt(c.totalPaid)} / {fmt(c.value)}</span>
            </div>
            <div style={{ background: "rgba(255,255,255,0.12)", borderRadius: 99, height: 6, overflow: "hidden" }}>
              <div style={{ width: `${paid}%`, height: "100%", background: "linear-gradient(90deg,#6FDA44,#93c5fd)", borderRadius: 99, transition: "width 0.4s" }} />
            </div>
          </div>

          {/* Signature status */}
          <div style={{ display: "flex", gap: 10, marginBottom: 18 }}>
            {[{ label: "Agency Signed", ok: c.agencySigned }, { label: "Client Signed", ok: c.clientSigned }].map(sig => (
              <div key={sig.label} style={{ display: "flex", alignItems: "center", gap: 6,
                background: sig.ok ? "rgba(111,218,68,0.12)" : "rgba(245,158,11,0.12)",
                border: `1px solid ${sig.ok ? "rgba(111,218,68,0.25)" : "rgba(245,158,11,0.25)"}`,
                borderRadius: 8, padding: "5px 12px" }}>
                <span style={{ fontSize: 12 }}>{sig.ok ? "✅" : "⏳"}</span>
                <span style={{ fontSize: 12, color: sig.ok ? "#86efac" : "#fcd34d", fontWeight: 600 }}>{sig.label}</span>
              </div>
            ))}
            {!c.clientSigned && (
              <div style={{ display: "flex", alignItems: "center", gap: 6,
                background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)",
                borderRadius: 8, padding: "5px 12px" }}>
                <span style={{ fontSize: 12, color: "#fca5a5", fontWeight: 600 }}>⚡ Send reminder</span>
              </div>
            )}
          </div>

          {c.stage === "on_hold" && (
            <div style={{ background: "rgba(249,115,22,0.12)", border: "1px solid rgba(249,115,22,0.25)",
              borderRadius: 8, padding: "8px 14px", marginBottom: 16, display: "flex", gap: 8 }}>
              <span style={{ fontSize: 14 }}>⏸</span>
              <div>
                <p style={{ fontSize: 12, color: "#fdba74", fontWeight: 700, marginBottom: 2 }}>On Hold — {c.holdDate}</p>
                <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)" }}>{c.holdReason}</p>
              </div>
            </div>
          )}

          {/* Tabs */}
          <div style={{ display: "flex" }}>
            {["overview", "milestones", "deliverables", "activity"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{
                padding: "10px 14px", fontSize: 13, fontWeight: tab === t ? 700 : 400,
                color: tab === t ? G.white : "rgba(255,255,255,0.45)",
                background: "none", border: "none",
                borderBottom: tab === t ? `2px solid ${G.green}` : "2px solid transparent",
                cursor: "pointer", textTransform: "capitalize", marginBottom: -1, transition: "all 0.12s", fontFamily: FONT }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex: 1, overflowY: "auto", padding: "22px 26px" }}>

          {tab === "overview" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <SBox>
                  <SLabel>Client Details</SLabel>
                  <p style={{ fontSize: 14, fontWeight: 700, color: G.navy }}>{c.client}</p>
                  <p style={{ fontSize: 13, color: G.sub }}>{c.company}</p>
                  <p style={{ fontSize: 13, color: G.sub }}>{c.email}</p>
                </SBox>
                <SBox style={{ background: G.blueBg, border: `1px solid ${G.blueBorder}` }}>
                  <SLabel>Contract Value</SLabel>
                  <p style={{ fontSize: 24, fontWeight: 800, color: G.navy, letterSpacing: "-0.5px" }}>{fmt(c.value)}</p>
                  <p style={{ fontSize: 12, color: G.sub, marginTop: 4 }}>{c.pricingType} · {c.paymentTerms}</p>
                </SBox>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
                <SBox>
                  <SLabel>Key Dates</SLabel>
                  {[["Start Date", c.startDate], ["End Date", c.endDate], ["Signed On", c.signedDate || "—"]].map(([k, v]) => (
                    <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <span style={{ fontSize: 12, color: G.muted }}>{k}</span>
                      <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{v}</span>
                    </div>
                  ))}
                </SBox>
                <SBox>
                  <SLabel>Progress</SLabel>
                  <div style={{ marginBottom: 8 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                      <span style={{ fontSize: 12, color: G.muted }}>Project completion</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: G.navy }}>{c.progressPct}%</span>
                    </div>
                    <div style={{ background: "#f3f4f6", borderRadius: 99, height: 7, overflow: "hidden" }}>
                      <div style={{ width: `${c.progressPct}%`, height: "100%", background: G.grad, borderRadius: 99 }} />
                    </div>
                  </div>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: 12, color: G.muted }}>Deliverables done</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>
                      {c.deliverables.filter(d => d.status === "approved").length} / {c.deliverables.length}
                    </span>
                  </div>
                </SBox>
              </div>
              <SBox><SLabel>Conditions & Scope</SLabel><p style={{ fontSize: 13, color: G.sub, lineHeight: 1.7 }}>{c.conditions}</p></SBox>
              {c.notes && (
                <div style={{ background: "#fffbeb", border: "1px solid #fde68a", borderRadius: 10, padding: "14px 16px" }}>
                  <SLabel style={{ color: "#b45309" }}>🔒 Internal Notes</SLabel>
                  <p style={{ fontSize: 13, color: "#78350f", lineHeight: 1.7 }}>{c.notes}</p>
                </div>
              )}
              {c.doc && (
                <div style={{ display: "flex", alignItems: "center", gap: 12, border: `1px solid ${G.border}`, borderRadius: 10, padding: "12px 16px" }}>
                  <span style={{ fontSize: 22 }}>📄</span>
                  <div style={{ flex: 1 }}>
                    <p style={{ fontSize: 13, fontWeight: 600, color: G.text }}>{c.doc}</p>
                    <p style={{ fontSize: 11, color: G.muted }}>Signed contract document</p>
                  </div>
                  <button style={{ fontSize: 12, color: G.blue, fontWeight: 700, background: "none", border: "none", cursor: "pointer" }}>Download</button>
                </div>
              )}
            </div>
          )}

          {tab === "milestones" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10, marginBottom: 6 }}>
                {[
                  { label: "Total",   val: fmt(c.value),              color: G.navy    },
                  { label: "Paid",    val: fmt(c.totalPaid),          color: "#15803d" },
                  { label: "Pending", val: fmt(c.value - c.totalPaid),color: "#c2410c" },
                ].map(s => (
                  <SBox key={s.label} style={{ textAlign: "center" }}>
                    <SLabel>{s.label}</SLabel>
                    <p style={{ fontSize: 18, fontWeight: 800, color: s.color }}>{s.val}</p>
                  </SBox>
                ))}
              </div>
              {c.milestones.map((m, i) => {
                const ms = MILESTONE_STYLE[m.status] || MILESTONE_STYLE.pending;
                return (
                  <div key={i} style={{ border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 16px",
                    background: m.status === "paid" ? "#f0fdf4" : G.white }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700, color: G.muted }}>M{i + 1}</span>
                          <p style={{ fontSize: 14, fontWeight: 600, color: G.text }}>{m.name}</p>
                          <span style={{ fontSize: 11, fontWeight: 600, background: ms.bg, color: ms.text, padding: "2px 8px", borderRadius: 99 }}>
                            {m.status.charAt(0).toUpperCase() + m.status.slice(1)}
                          </span>
                          {m.invoiced && <span style={{ fontSize: 11, fontWeight: 600, background: G.blueBg, color: G.navy, border: `1px solid ${G.blueBorder}`, padding: "2px 8px", borderRadius: 99 }}>📄 Invoiced</span>}
                        </div>
                        <p style={{ fontSize: 12, color: G.sub }}>Due: {m.due}</p>
                      </div>
                      <div style={{ textAlign: "right", marginLeft: 16 }}>
                        <p style={{ fontSize: 16, fontWeight: 700, color: m.status === "paid" ? "#15803d" : G.text }}>{fmt(m.amount)}</p>
                        {m.status !== "paid" && (
                          <div style={{ display: "flex", gap: 6, marginTop: 6, justifyContent: "flex-end" }}>
                            {m.status === "pending"  && <Mbtn onClick={() => markMilestone(i, "invoiced")} color={G.sub}>Raise Invoice</Mbtn>}
                            {m.status === "invoiced" && <Mbtn onClick={() => markMilestone(i, "paid")} color={G.navy} border={G.blueBorder} bg={G.blueBg}>Mark Paid ✓</Mbtn>}
                          </div>
                        )}
                        {m.status === "paid" && <p style={{ fontSize: 11, color: "#15803d", fontWeight: 700, marginTop: 4 }}>✓ Cleared</p>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "deliverables" && (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                <p style={{ fontSize: 13, color: G.sub }}>{c.deliverables.filter(d => d.status === "approved").length} of {c.deliverables.length} approved</p>
              </div>
              {c.deliverables.map((d, i) => {
                const ds = DELIV_STYLE[d.status] || DELIV_STYLE.not_started;
                return (
                  <div key={i} style={{ border: `1px solid ${G.border}`, borderRadius: 12, padding: "14px 16px",
                    background: d.status === "approved" ? "#f0fdf4" : G.white, borderLeft: `3px solid ${ds.dot}` }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                          <p style={{ fontSize: 14, fontWeight: 600, color: G.text }}>{d.name}</p>
                          <span style={{ fontSize: 11, fontWeight: 600, background: ds.bg, color: ds.text, padding: "2px 8px", borderRadius: 99 }}>
                            {d.status.replace("_", " ")}
                          </span>
                          {d.revisions > 0 && (
                            <span style={{ fontSize: 11, color: G.muted, background: "#f3f4f6", padding: "2px 7px", borderRadius: 99 }}>
                              {d.revisions} revision{d.revisions > 1 ? "s" : ""}
                            </span>
                          )}
                        </div>
                        <p style={{ fontSize: 12, color: G.sub }}>Due: {d.due}</p>
                      </div>
                      <div style={{ display: "flex", gap: 6 }}>
                        {d.status === "not_started" && <Mbtn onClick={() => markDeliverable(i, "in_progress")}>Start</Mbtn>}
                        {d.status === "in_progress" && <Mbtn onClick={() => markDeliverable(i, "delivered")} color={G.navy} bg={G.blueBg} border={G.blueBorder}>Mark Delivered</Mbtn>}
                        {d.status === "delivered"   && <Mbtn onClick={() => markDeliverable(i, "approved")} color={G.navy} bg={G.blueBg} border={G.blueBorder}>Client Approved ✓</Mbtn>}
                        {d.status === "approved"    && <span style={{ fontSize: 12, color: "#15803d", fontWeight: 700 }}>✓ Approved</span>}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {tab === "activity" && (
            <div style={{ position: "relative", paddingLeft: 24 }}>
              <div style={{ position: "absolute", left: 8, top: 0, bottom: 0, width: 2, background: "#f3f4f6" }} />
              {c.activity.map((a, i) => (
                <div key={i} style={{ paddingBottom: 22, position: "relative" }}>
                  <div style={{ width: 12, height: 12, borderRadius: "50%", background: G.blue,
                    border: `3px solid ${G.white}`, boxShadow: `0 0 0 2px ${G.blue}`,
                    position: "absolute", left: -20, top: 2, zIndex: 1 }} />
                  <p style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 2 }}>{a.event}</p>
                  <p style={{ fontSize: 12, color: G.muted }}>{a.date} · {a.by}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "14px 26px", borderTop: "1px solid #f3f4f6",
          display: "flex", justifyContent: "space-between", alignItems: "center", background: G.bg }}>
          <div style={{ display: "flex", gap: 8 }}>
            <FBtn>📋 Duplicate</FBtn>
            <FBtn>⬇ Download PDF</FBtn>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {c.stage === "active"             && <FBtn style={{ color: "#c2410c", borderColor: "#fed7aa" }}>⏸ Put On Hold</FBtn>}
            {c.stage === "on_hold"            && <FBtn style={{ color: G.navy, borderColor: G.blueBorder, background: G.blueBg }}>▶ Resume</FBtn>}
            {c.stage === "active"             && <FBtn style={{ background: G.grad, color: G.white, border: "none" }}>✓ Mark Completed</FBtn>}
            {c.stage === "awaiting_signature" && <FBtn style={{ background: G.grad, color: G.white, border: "none" }}>📤 Resend to Client</FBtn>}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ════════════════════════════════════════════════════════════════
   NEW CONTRACT MODAL
════════════════════════════════════════════════════════════════ */
function NewContractModal({ onClose }) {
  const [step, setStep] = useState(1);
  const TOTAL  = 3;
  const titles = ["Link Proposal", "Contract Terms", "Review & Send"];
  const [f, setF] = useState({ proposalId: "", client: "", company: "", value: "", currency: "₹", startDate: "", endDate: "", paymentTerms: "", conditions: "" });
  const u = (k, v) => setF(p => ({ ...p, [k]: v }));

  return (
    <Overlay onClose={onClose}>
      <div style={{ width: "100%", maxWidth: 480, maxHeight: "88vh", background: G.white, borderRadius: 16,
        display: "flex", flexDirection: "column", overflow: "hidden",
        boxShadow: "0 24px 64px rgba(0,0,0,0.18)" }}>

        <div style={{ background: G.grad, padding: "18px 22px 0" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 14 }}>
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>New Contract</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.45)", marginTop: 3 }}>Step {step} of {TOTAL} — {titles[step - 1]}</p>
            </div>
            <button onClick={onClose} style={{ width: 28, height: 28, borderRadius: 7,
              border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.1)",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", color: "rgba(255,255,255,0.7)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          <div style={{ display: "flex", gap: 4, paddingBottom: 18 }}>
            {Array.from({ length: TOTAL }).map((_, i) => (
              <div key={i} style={{ flex: 1, height: 3, borderRadius: 99,
                background: i < step ? G.green : "rgba(255,255,255,0.15)", transition: "background 0.3s" }} />
            ))}
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px" }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {step === 1 && <>
              <NF label="Linked Proposal ID"><input value={f.proposalId} onChange={e => u("proposalId", e.target.value)} placeholder="e.g. PRO-001" style={ninp} /></NF>
              <NF label="Client Name"><input value={f.client} onChange={e => u("client", e.target.value)} placeholder="e.g. Vikram Singh" style={ninp} /></NF>
              <NF label="Company"><input value={f.company} onChange={e => u("company", e.target.value)} placeholder="e.g. ShopEasy Retail" style={ninp} /></NF>
            </>}
            {step === 2 && <>
              <NF label="Contract Value">
                <div style={{ display: "flex", gap: 8 }}>
                  <select value={f.currency} onChange={e => u("currency", e.target.value)} style={{ ...ninp, width: 60, background: G.white }}>
                    {["₹", "$", "€"].map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="number" value={f.value} onChange={e => u("value", e.target.value)} placeholder="0" style={{ ...ninp, flex: 1 }} />
                </div>
              </NF>
              <NF label="Start Date"><input type="date" value={f.startDate} onChange={e => u("startDate", e.target.value)} style={ninp} /></NF>
              <NF label="End Date"><input type="date" value={f.endDate} onChange={e => u("endDate", e.target.value)} style={ninp} /></NF>
              <NF label="Payment Terms"><input value={f.paymentTerms} onChange={e => u("paymentTerms", e.target.value)} placeholder="e.g. 30% advance…" style={ninp} /></NF>
              <NF label="Conditions"><textarea value={f.conditions} onChange={e => u("conditions", e.target.value)} placeholder="Any special conditions…" rows={3} style={{ ...ninp, resize: "none" }} /></NF>
            </>}
            {step === 3 && (
              <div style={{ background: G.blueBg, border: `1px solid ${G.blueBorder}`, borderRadius: 12, padding: 18 }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: G.navy, marginBottom: 14, fontFamily: FONT }}>Review Contract</p>
                {[["Proposal", f.proposalId || "—"], ["Client", f.client || "—"], ["Company", f.company || "—"],
                  ["Value", f.value ? `${f.currency}${Number(f.value).toLocaleString("en-IN")}` : "—"],
                  ["Start", f.startDate || "—"], ["End", f.endDate || "—"],
                  ["Payment Terms", f.paymentTerms || "—"]].map(([k, v]) => (
                  <div key={k} style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: G.muted }}>{k}</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{v}</span>
                  </div>
                ))}
                <div style={{ borderTop: `1px solid ${G.blueBorder}`, paddingTop: 12, marginTop: 4 }}>
                  <p style={{ fontSize: 12, color: G.sub, lineHeight: 1.6 }}>{f.conditions || "No special conditions."}</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding: "14px 22px", borderTop: "1px solid #f3f4f6",
          display: "flex", justifyContent: "space-between", background: G.bg }}>
          <FBtn onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Cancel" : "← Back"}</FBtn>
          {step < TOTAL
            ? <FBtn onClick={() => setStep(step + 1)} style={{ background: G.grad, color: G.white, border: "none" }}>Next →</FBtn>
            : <FBtn style={{ background: G.grad, color: G.white, border: "none" }}>Send for Signature 📤</FBtn>}
        </div>
      </div>
    </Overlay>
  );
}

/* ════════════════════════════════════════════════════════════════
   SHARED PRIMITIVES
════════════════════════════════════════════════════════════════ */
const ninp = { width: "100%", fontSize: 13, border: `1.5px solid ${G.border}`, borderRadius: 8, padding: "9px 12px", outline: "none", color: G.text, boxSizing: "border-box", fontFamily: FONT };

function SBox({ children, style: sx = {} }) {
  return <div style={{ background: G.bg, border: "1px solid #f3f4f6", borderRadius: 12, padding: "14px 16px", ...sx }}>{children}</div>;
}
function SLabel({ children, style: sx = {} }) {
  return <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8, ...sx }}>{children}</p>;
}
function NF({ label, children }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 700, color: "#374151", display: "block", marginBottom: 6, fontFamily: FONT }}>{label}</label>
      {children}
    </div>
  );
}
function FBtn({ children, onClick, style: sx = {} }) {
  return (
    <button onClick={onClick} style={{ fontSize: 13, fontWeight: 600, border: `1px solid ${G.border}`,
      background: G.white, color: "#374151", borderRadius: 8, padding: "8px 14px",
      cursor: "pointer", fontFamily: FONT, ...sx }}>{children}</button>
  );
}
function Mbtn({ children, onClick, color = G.sub, bg = G.bg, border = G.border }) {
  return (
    <button onClick={e => { e.stopPropagation(); onClick?.(); }} style={{ fontSize: 11, fontWeight: 700,
      background: bg, color, border: `1px solid ${border}`, borderRadius: 7, padding: "5px 10px",
      cursor: "pointer", fontFamily: FONT }}>{children}</button>
  );
}
function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 50,
      display: "flex", alignItems: "center", justifyContent: "center",
      background: "rgba(13,40,85,0.45)", backdropFilter: "blur(4px)", padding: 20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width: "100%", display: "contents" }}>{children}</div>
    </div>
  );
}