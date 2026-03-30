// import { useState, useMemo } from "react";

// (() => {
//   if (document.getElementById("wl-earn-fonts")) return;
//   const l = document.createElement("link");
//   l.id = "wl-earn-fonts"; l.rel = "stylesheet";
//   l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//   document.head.appendChild(l);
// })();

// const G = {
//   green:       "#22c55e",
//   greenDark:   "#16a34a",
//   greenDeep:   "#15803d",
//   greenBg:     "#f0fdf4",
//   greenBorder: "#bbf7d0",
//   text:        "#111827",
//   sub:         "#6b7280",
//   muted:       "#9ca3af",
//   border:      "#e5e7eb",
//   bg:          "#f9fafb",
//   white:       "#ffffff",
// };

// const FONT = "'Plus Jakarta Sans', sans-serif";

// const fmt  = (n, c = "₹") => `${c}${Number(n).toLocaleString("en-IN")}`;
// const fmtL = (n, c = "₹") => `${c}${(n / 100000).toFixed(2)}L`;

// const TRANSACTIONS = [
//   { id:"TXN-001", date:"Mar 22, 2026", contract:"CON-2026-001", client:"ShopEasy Retail",   milestone:"Discovery & Architecture", gross:60000,  fee:3600,  net:56400,  status:"released" },
//   { id:"TXN-002", date:"Mar 12, 2026", contract:"CON-2026-003", client:"TravelNest",         milestone:"Advance Payment",           gross:104000, fee:6240,  net:97760,  status:"released" },
//   { id:"TXN-003", date:"Mar 08, 2026", contract:"CON-2026-004", client:"HealthFirst Clinic", milestone:"UI/UX Design",              gross:80000,  fee:4800,  net:75200,  status:"released" },
//   { id:"TXN-004", date:"Mar 26, 2026", contract:"CON-2026-003", client:"TravelNest",         milestone:"Discovery Architecture",    gross:60000,  fee:3600,  net:56400,  status:"pending"  },
//   { id:"TXN-005", date:"Apr 15, 2026", contract:"CON-2026-001", client:"ShopEasy Retail",   milestone:"Core Backend Build",        gross:140000, fee:8400,  net:131600, status:"pending"  },
//   { id:"TXN-006", date:"Feb 22, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"App Development",           gross:100000, fee:6000,  net:94000,  status:"released" },
//   { id:"TXN-007", date:"Mar 06, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"Launch & Handover",         gross:40000,  fee:2400,  net:37600,  status:"released" },
//   { id:"TXN-008", date:"Jan 25, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"Design & Architecture",     gross:40000,  fee:2400,  net:37600,  status:"released" },
//   { id:"TXN-009", date:"Apr 20, 2026", contract:"CON-2026-004", client:"HealthFirst Clinic", milestone:"App Development",           gross:160000, fee:9600,  net:150400, status:"on_hold"  },
// ];

// const MONTHLY = [
//   { month:"Oct", gross:120000 },
//   { month:"Nov", gross:85000  },
//   { month:"Dec", gross:210000 },
//   { month:"Jan", gross:180000 },
//   { month:"Feb", gross:140000 },
//   { month:"Mar", gross:244000 },
// ];

// const STATUS_STYLE = {
//   released: { bg: G.greenBg,   text: G.greenDark, dot: G.green,    label: "Released" },
//   pending:  { bg: "#fef3c7",   text: "#92400e",   dot: "#f59e0b",  label: "Pending"  },
//   on_hold:  { bg: "#fff7ed",   text: "#c2410c",   dot: "#f97316",  label: "On Hold"  },
//   refunded: { bg: "#fef2f2",   text: "#dc2626",   dot: "#ef4444",  label: "Refunded" },
// };

// /* ════════════════════════════════════════════════════════════════
//    ROOT
// ════════════════════════════════════════════════════════════════ */
// export default function AgencyEarnings() {
//   const [filter,    setFilter]    = useState("all");
//   const [search,    setSearch]    = useState("");
//   const [chartView, setChartView] = useState("gross");

//   const stats = useMemo(() => {
//     const released  = TRANSACTIONS.filter(t => t.status === "released").reduce((s, t) => s + t.net, 0);
//     const pending   = TRANSACTIONS.filter(t => t.status === "pending").reduce((s, t) => s + t.net, 0);
//     const onHold    = TRANSACTIONS.filter(t => t.status === "on_hold").reduce((s, t) => s + t.net, 0);
//     const feePaid   = TRANSACTIONS.filter(t => t.status === "released").reduce((s, t) => s + t.fee, 0);
//     const thisMonth = TRANSACTIONS.filter(t => t.status === "released" && t.date.includes("Mar")).reduce((s, t) => s + t.net, 0);
//     const balance   = released - 135760;
//     return { released, pending, onHold, feePaid, thisMonth, balance };
//   }, []);

//   const rows = useMemo(() => TRANSACTIONS.filter(t => {
//     if (filter !== "all" && t.status !== filter) return false;
//     if (search && ![t.client, t.contract, t.milestone].join(" ").toLowerCase().includes(search.toLowerCase())) return false;
//     return true;
//   }), [filter, search]);

//   const maxBar = Math.max(...MONTHLY.map(m => m.gross));

//   return (
//     <div style={{ minHeight: "100vh", background: G.bg, fontFamily: FONT }}>

//       {/* NAVBAR */}
//       <nav style={{ height: 52, background: G.white, borderBottom: `1px solid ${G.border}`,
//         display: "flex", alignItems: "center", padding: "0 28px", gap: 12, position: "sticky", top: 0, zIndex: 40 }}>
//         <span style={{ fontWeight: 800, fontSize: 18, color: G.text, letterSpacing: "-0.5px", fontFamily: FONT }}>
//           <span style={{ color: G.green }}>web</span>lance
//         </span>
//         <div style={{ width: 1, height: 20, background: G.border }} />
//         <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>Agency</span>
//         <span style={{ fontSize: 12, color: G.border }}>/</span>
//         <span style={{ fontSize: 12, color: G.text, fontWeight: 600 }}>Earnings</span>
//         <div style={{ display: "flex", alignItems: "center", gap: 5, background: G.greenBg,
//           border: `1px solid ${G.greenBorder}`, borderRadius: 99, padding: "3px 10px", marginLeft: 4 }}>
//           <svg width="10" height="10" fill={G.greenDark} viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
//           </svg>
//           <span style={{ fontSize: 11, color: G.greenDark, fontWeight: 700 }}>Agency Admin only</span>
//         </div>
//         <div style={{ flex: 1 }} />
//         <div style={{ position: "relative", cursor: "pointer" }}>
//           <span style={{ fontSize: 18 }}>🔔</span>
//           <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%",
//             background: "#ef4444", border: `1.5px solid ${G.white}` }} />
//         </div>
//         <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.greenBg,
//           border: `1.5px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center",
//           fontSize: 12, fontWeight: 700, color: G.greenDark, marginLeft: 8, fontFamily: FONT }}>RK</div>
//       </nav>

//       {/* PAGE HEADER */}
//       <header style={{ background: G.white, borderBottom: `1px solid ${G.border}` }}>
//         <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
//           <div style={{ padding: "20px 0 0" }}>
//             <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Earnings</h1>
//             <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Track income, platform fees and payment status</p>
//           </div>

//           {/* Stats strip */}
//           <div style={{ display: "flex", gap: 0, marginTop: 18, paddingTop: 18, borderTop: "1px solid #f3f4f6" }}>
//             {[
//               { label: "Available Balance",  val: fmt(stats.balance),   accent: G.greenDark, big: true },
//               { label: "This Month (Net)",   val: fmt(stats.thisMonth), accent: G.green               },
//               { label: "Pending Release",    val: fmt(stats.pending),   accent: "#d97706"             },
//               { label: "On Hold",            val: fmt(stats.onHold),    accent: "#c2410c"             },
//               { label: "Platform Fees Paid", val: fmt(stats.feePaid),   accent: G.muted               },
//               { label: "Total Net Earned",   val: fmtL(stats.released), accent: G.greenDark           },
//             ].map((s, i, arr) => (
//               <div key={i} style={{ flex: s.big ? 1.4 : 1, paddingBottom: 16,
//                 borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
//                 paddingLeft: i === 0 ? 0 : 20 }}>
//                 <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
//                 <p style={{ fontSize: s.big ? 26 : 20, fontWeight: 800, color: s.accent, margin: 0, letterSpacing: "-0.4px" }}>{s.val}</p>
//               </div>
//             ))}
//           </div>

//           {/* Filter tabs */}
//           <div style={{ display: "flex", gap: 0, marginTop: 4, borderTop: "1px solid #f3f4f6" }}>
//             {[["all","All"],["released","Released"],["pending","Pending"],["on_hold","On Hold"],["refunded","Refunded"]].map(([id, label]) => {
//               const cnt    = id === "all" ? TRANSACTIONS.length : TRANSACTIONS.filter(t => t.status === id).length;
//               const active = filter === id;
//               return (
//                 <button key={id} onClick={() => setFilter(id)} style={{
//                   display: "flex", alignItems: "center", gap: 5, padding: "10px 12px",
//                   fontSize: 13, fontWeight: active ? 700 : 400,
//                   color: active ? G.greenDark : G.sub, background: "none", border: "none",
//                   borderBottom: active ? `2px solid ${G.green}` : "2px solid transparent",
//                   cursor: "pointer", marginBottom: -1, transition: "all 0.12s", fontFamily: FONT }}>
//                   {label}
//                   <span style={{ fontSize: 11, fontWeight: 700, background: active ? G.green : "#f3f4f6", color: active ? G.white : G.muted, padding: "1px 7px", borderRadius: 99 }}>{cnt}</span>
//                 </button>
//               );
//             })}
//             <div style={{ flex: 1 }} />
//             <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 4 }}>
//               <div style={{ position: "relative" }}>
//                 <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)", color: G.muted }}
//                   width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
//                 </svg>
//                 <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…"
//                   style={{ paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
//                     fontSize: 12, border: `1px solid ${G.border}`, borderRadius: 7, outline: "none",
//                     width: 200, color: G.text, background: G.white, fontFamily: FONT }} />
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       {/* CONTENT */}
//       <main style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 28px 64px" }}>
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

//           {/* LEFT — Chart + Transactions */}
//           <div>
//             {/* Bar chart */}
//             <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "20px 22px", marginBottom: 20 }}>
//               <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
//                 <div>
//                   <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>Monthly Earnings</p>
//                   <p style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>Last 6 months</p>
//                 </div>
//                 <div style={{ display: "flex", gap: 6 }}>
//                   {[["gross","Gross"],["net","Net"],["fee","Fee"]].map(([id, label]) => (
//                     <button key={id} onClick={() => setChartView(id)}
//                       style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 8,
//                         border: `1px solid ${chartView === id ? G.green : G.border}`,
//                         background: chartView === id ? G.greenBg : G.white,
//                         color: chartView === id ? G.greenDark : G.sub,
//                         cursor: "pointer", fontFamily: FONT }}>{label}</button>
//                   ))}
//                 </div>
//               </div>
//               <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
//                 {MONTHLY.map((m, i) => {
//                   const val   = chartView === "net" ? m.gross * 0.94 : chartView === "fee" ? m.gross * 0.06 : m.gross;
//                   const h     = Math.round((val / maxBar) * 120);
//                   const isMax = val === Math.max(...MONTHLY.map(x => chartView === "net" ? x.gross * 0.94 : chartView === "fee" ? x.gross * 0.06 : x.gross));
//                   return (
//                     <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
//                       <p style={{ fontSize: 10, fontWeight: 700, color: isMax ? G.greenDark : G.muted }}>
//                         {chartView === "fee" ? fmt(val) : fmtL(val)}
//                       </p>
//                       <div style={{ width: "100%", height: h, borderRadius: "6px 6px 0 0",
//                         background: isMax ? `linear-gradient(180deg,${G.green},${G.greenDark})` : `linear-gradient(180deg,${G.greenBorder},#86efac)`,
//                         transition: "height 0.3s" }} />
//                       <p style={{ fontSize: 11, color: G.sub, fontWeight: 500 }}>{m.month}</p>
//                     </div>
//                   );
//                 })}
//               </div>
//             </div>

//             {/* Transactions table */}
//             <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
//               <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
//                 <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>
//                   Transactions <span style={{ fontSize: 12, color: G.muted, fontWeight: 400 }}>({rows.length})</span>
//                 </p>
//               </div>

//               {/* Table head */}
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 90px 90px 90px 100px",
//                 padding: "10px 20px", background: G.bg, borderBottom: "1px solid #f3f4f6" }}>
//                 {["Date / Contract","Milestone","Gross","Fee (6%)","Net","Status"].map(h => (
//                   <p key={h} style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</p>
//                 ))}
//               </div>

//               {rows.length === 0 ? (
//                 <div style={{ padding: "48px 20px", textAlign: "center" }}>
//                   <p style={{ fontSize: 32, marginBottom: 8 }}>📭</p>
//                   <p style={{ fontSize: 14, color: G.sub }}>No transactions found</p>
//                 </div>
//               ) : rows.map((t, i) => {
//                 const ss = STATUS_STYLE[t.status] || STATUS_STYLE.pending;
//                 return (
//                   <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 90px 90px 90px 100px",
//                     padding: "14px 20px", borderBottom: i < rows.length - 1 ? "1px solid #f9fafb" : "none", transition: "background 0.12s" }}
//                     onMouseEnter={e => e.currentTarget.style.background = G.bg}
//                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
//                     <div>
//                       <p style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{t.date}</p>
//                       <p style={{ fontSize: 11, color: G.greenDark, marginTop: 2 }}>{t.contract}</p>
//                       <p style={{ fontSize: 11, color: G.muted }}>{t.client}</p>
//                     </div>
//                     <p style={{ fontSize: 13, color: G.sub, lineHeight: 1.5, paddingRight: 12, alignSelf: "center" }}>{t.milestone}</p>
//                     <p style={{ fontSize: 13, fontWeight: 600, color: G.text, alignSelf: "center" }}>{fmt(t.gross)}</p>
//                     <p style={{ fontSize: 13, color: "#dc2626", alignSelf: "center" }}>−{fmt(t.fee)}</p>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.greenDark, alignSelf: "center" }}>{fmt(t.net)}</p>
//                     <div style={{ alignSelf: "center" }}>
//                       <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600,
//                         padding: "3px 9px", borderRadius: 99, background: ss.bg, color: ss.text }}>
//                         <span style={{ width: 5, height: 5, borderRadius: "50%", background: ss.dot }} />
//                         {ss.label}
//                       </span>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>

//           {/* RIGHT — Wallet + Summary */}
//           <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

//             {/* Wallet card — dark green gradient */}
//             <div style={{ background: "linear-gradient(145deg,#14532d,#166534)", borderRadius: 16, padding: "22px", position: "relative", overflow: "hidden" }}>
//               <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(34,197,94,0.1)", pointerEvents: "none" }} />
//               <div style={{ position: "absolute", bottom: -40, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(34,197,94,0.06)", pointerEvents: "none" }} />
//               <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Available Balance</p>
//               <p style={{ fontSize: 32, fontWeight: 800, color: "#86efac", marginBottom: 4, letterSpacing: "-0.5px", fontFamily: FONT }}>{fmt(stats.balance)}</p>
//               <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Last payout: ₹1,35,760 on Mar 1, 2026</p>
//               <a href="/agency/withdrawals" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
//                 background: G.green, color: G.white, border: "none", borderRadius: 9, padding: "11px 0",
//                 fontSize: 13, fontWeight: 700, cursor: "pointer", textDecoration: "none", width: "100%",
//                 fontFamily: FONT, boxSizing: "border-box" }}>
//                 Withdraw Funds →
//               </a>
//               <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
//                 {[{ label: "Pending", val: fmt(stats.pending), c: "#fcd34d" }, { label: "On Hold", val: fmt(stats.onHold), c: "#fb923c" }].map(s => (
//                   <div key={s.label} style={{ background: "rgba(255,255,255,0.07)", borderRadius: 10, padding: "10px 12px" }}>
//                     <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 4 }}>{s.label}</p>
//                     <p style={{ fontSize: 14, fontWeight: 700, color: s.c, fontFamily: FONT }}>{s.val}</p>
//                   </div>
//                 ))}
//               </div>
//             </div>

//             {/* Platform fee tracker */}
//             <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 20px" }}>
//               <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 2 }}>Platform Fee Tracker</p>
//               <p style={{ fontSize: 12, color: G.muted, marginBottom: 16 }}>Weblance charges 6% per transaction</p>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
//                 <span style={{ fontSize: 12, color: G.sub }}>Total fees paid (FY 2025-26)</span>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{fmt(stats.feePaid)}</span>
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
//                 <span style={{ fontSize: 12, color: G.sub }}>This month</span>
//                 <span style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>
//                   {fmt(TRANSACTIONS.filter(t => t.status === "released" && t.date.includes("Mar")).reduce((s, t) => s + t.fee, 0))}
//                 </span>
//               </div>
//               <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, padding: "10px 12px" }}>
//                 <p style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, marginBottom: 4 }}>Fee deducted automatically</p>
//                 <p style={{ fontSize: 11, color: G.sub, lineHeight: 1.5 }}>Platform fee of 6% is deducted before funds are released to your wallet.</p>
//               </div>
//             </div>

//             {/* Earnings summary */}
//             <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 20px" }}>
//               <p style={{ fontSize: 13, fontWeight: 700, color: G.text, marginBottom: 14 }}>Earnings Summary</p>
//               {[
//                 ["Total Gross Earned", fmt(TRANSACTIONS.reduce((s, t) => s + t.gross, 0))],
//                 ["Total Fees Paid",    fmt(TRANSACTIONS.reduce((s, t) => s + t.fee,   0))],
//                 ["Total Net Earned",   fmt(TRANSACTIONS.reduce((s, t) => s + t.net,   0))],
//                 ["Total Withdrawn",    "₹1,35,760"],
//                 ["Available Balance",  fmt(stats.balance)],
//               ].map(([k, v], i, arr) => (
//                 <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10,
//                   borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
//                   <span style={{ fontSize: 12, color: G.sub }}>{k}</span>
//                   <span style={{ fontSize: 13, fontWeight: 700, color: i === arr.length - 1 ? G.greenDark : G.text }}>{v}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }







import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-earn-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-earn-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  navy:        "#0D2855",
  blue:        "#1B72C0",
  grad:        "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
};

const FONT = "'Plus Jakarta Sans', sans-serif";
const fmt  = (n, c = "₹") => `${c}${Number(n).toLocaleString("en-IN")}`;
const fmtL = (n, c = "₹") => `${c}${(n / 100000).toFixed(2)}L`;

const TRANSACTIONS = [
  { id:"TXN-001", date:"Mar 22, 2026", contract:"CON-2026-001", client:"ShopEasy Retail",   milestone:"Discovery & Architecture", gross:60000,  fee:3600,  net:56400,  status:"released" },
  { id:"TXN-002", date:"Mar 12, 2026", contract:"CON-2026-003", client:"TravelNest",         milestone:"Advance Payment",           gross:104000, fee:6240,  net:97760,  status:"released" },
  { id:"TXN-003", date:"Mar 08, 2026", contract:"CON-2026-004", client:"HealthFirst Clinic", milestone:"UI/UX Design",              gross:80000,  fee:4800,  net:75200,  status:"released" },
  { id:"TXN-004", date:"Mar 26, 2026", contract:"CON-2026-003", client:"TravelNest",         milestone:"Discovery Architecture",    gross:60000,  fee:3600,  net:56400,  status:"pending"  },
  { id:"TXN-005", date:"Apr 15, 2026", contract:"CON-2026-001", client:"ShopEasy Retail",   milestone:"Core Backend Build",        gross:140000, fee:8400,  net:131600, status:"pending"  },
  { id:"TXN-006", date:"Feb 22, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"App Development",           gross:100000, fee:6000,  net:94000,  status:"released" },
  { id:"TXN-007", date:"Mar 06, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"Launch & Handover",         gross:40000,  fee:2400,  net:37600,  status:"released" },
  { id:"TXN-008", date:"Jan 25, 2026", contract:"CON-2026-005", client:"Zestify Foods",      milestone:"Design & Architecture",     gross:40000,  fee:2400,  net:37600,  status:"released" },
  { id:"TXN-009", date:"Apr 20, 2026", contract:"CON-2026-004", client:"HealthFirst Clinic", milestone:"App Development",           gross:160000, fee:9600,  net:150400, status:"on_hold"  },
];

const MONTHLY = [
  { month:"Oct", gross:120000 },
  { month:"Nov", gross:85000  },
  { month:"Dec", gross:210000 },
  { month:"Jan", gross:180000 },
  { month:"Feb", gross:140000 },
  { month:"Mar", gross:244000 },
];

const STATUS_STYLE = {
  released: { bg: G.blueBg,  text: "#1e40af", dot: G.blue,    label: "Released" },
  pending:  { bg: "#fef3c7", text: "#92400e", dot: "#f59e0b", label: "Pending"  },
  on_hold:  { bg: "#fff7ed", text: "#c2410c", dot: "#f97316", label: "On Hold"  },
  refunded: { bg: G.redBg,   text: "#dc2626", dot: G.red,     label: "Refunded" },
};

export default function AgencyEarnings() {
  const [filter,    setFilter]    = useState("all");
  const [search,    setSearch]    = useState("");
  const [chartView, setChartView] = useState("gross");

  const stats = useMemo(() => {
    const released  = TRANSACTIONS.filter(t => t.status === "released").reduce((s, t) => s + t.net, 0);
    const pending   = TRANSACTIONS.filter(t => t.status === "pending").reduce((s, t) => s + t.net, 0);
    const onHold    = TRANSACTIONS.filter(t => t.status === "on_hold").reduce((s, t) => s + t.net, 0);
    const feePaid   = TRANSACTIONS.filter(t => t.status === "released").reduce((s, t) => s + t.fee, 0);
    const thisMonth = TRANSACTIONS.filter(t => t.status === "released" && t.date.includes("Mar")).reduce((s, t) => s + t.net, 0);
    const balance   = released - 135760;
    return { released, pending, onHold, feePaid, thisMonth, balance };
  }, []);

  const rows = useMemo(() => TRANSACTIONS.filter(t => {
    if (filter !== "all" && t.status !== filter) return false;
    if (search && ![t.client, t.contract, t.milestone].join(" ").toLowerCase().includes(search.toLowerCase())) return false;
    return true;
  }), [filter, search]);

  const maxBar = Math.max(...MONTHLY.map(m => m.gross));

  return (
    <div style={{ minHeight: "100vh", background: G.bg, fontFamily: FONT }}>

      {/* NAVBAR */}
      <nav style={{ height: 56, background: G.white, borderBottom: `1px solid ${G.border}`,
        display: "flex", alignItems: "center", padding: "0 28px", gap: 12, position: "sticky", top: 0, zIndex: 40 }}>
        <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
        <div style={{ width: 1, height: 20, background: G.border }} />
        <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>Agency</span>
        <span style={{ fontSize: 12, color: G.border }}>/</span>
        <span style={{ fontSize: 12, color: G.navy, fontWeight: 600 }}>Earnings</span>
        <div style={{ display: "flex", alignItems: "center", gap: 5, background: G.blueBg,
          border: `1px solid ${G.blueBorder}`, borderRadius: 99, padding: "3px 10px", marginLeft: 4 }}>
          <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span style={{ fontSize: 11, color: G.navy, fontWeight: 700 }}>Agency Admin only</span>
        </div>
        <div style={{ flex: 1 }} />
        <div style={{ position: "relative", cursor: "pointer" }}>
          <span style={{ fontSize: 18 }}>🔔</span>
          <div style={{ position: "absolute", top: -1, right: -1, width: 8, height: 8, borderRadius: "50%",
            background: G.red, border: `1.5px solid ${G.white}` }} />
        </div>
        <div style={{ width: 32, height: 32, borderRadius: "50%", background: G.grad,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontSize: 12, fontWeight: 700, color: G.white, marginLeft: 8, fontFamily: FONT }}>RK</div>
      </nav>

      {/* PAGE HEADER */}
      <header style={{ background: G.white, borderBottom: `1px solid ${G.border}` }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 28px" }}>
          <div style={{ padding: "20px 0 0" }}>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: G.navy, margin: 0, letterSpacing: "-0.4px" }}>Earnings</h1>
            <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Track income, platform fees and payment status</p>
          </div>

          {/* Stats strip */}
          <div style={{ display: "flex", gap: 0, marginTop: 18, paddingTop: 18, borderTop: "1px solid #f3f4f6" }}>
            {[
              { label: "Available Balance",  val: fmt(stats.balance),   accent: G.navy,   big: true },
              { label: "This Month (Net)",   val: fmt(stats.thisMonth), accent: G.blue              },
              { label: "Pending Release",    val: fmt(stats.pending),   accent: "#d97706"            },
              { label: "On Hold",            val: fmt(stats.onHold),    accent: "#c2410c"            },
              { label: "Platform Fees Paid", val: fmt(stats.feePaid),   accent: G.muted              },
              { label: "Total Net Earned",   val: fmtL(stats.released), accent: G.navy               },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex: s.big ? 1.4 : 1, paddingBottom: 16,
                borderRight: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                paddingLeft: i === 0 ? 0 : 20 }}>
                <p style={{ fontSize: 10, color: G.muted, fontWeight: 700, marginBottom: 4, textTransform: "uppercase", letterSpacing: "0.07em" }}>{s.label}</p>
                <p style={{ fontSize: s.big ? 26 : 20, fontWeight: 800, color: s.accent, margin: 0, letterSpacing: "-0.4px" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div style={{ display: "flex", gap: 0, marginTop: 4, borderTop: "1px solid #f3f4f6" }}>
            {[["all","All"],["released","Released"],["pending","Pending"],["on_hold","On Hold"],["refunded","Refunded"]].map(([id, label]) => {
              const cnt    = id === "all" ? TRANSACTIONS.length : TRANSACTIONS.filter(t => t.status === id).length;
              const active = filter === id;
              return (
                <button key={id} onClick={() => setFilter(id)} style={{
                  display: "flex", alignItems: "center", gap: 5, padding: "10px 12px",
                  fontSize: 13, fontWeight: active ? 700 : 400,
                  color: active ? G.navy : G.sub, background: "none", border: "none",
                  borderBottom: active ? `2px solid ${G.blue}` : "2px solid transparent",
                  cursor: "pointer", marginBottom: -1, transition: "all 0.12s", fontFamily: FONT }}>
                  {label}
                  <span style={{ fontSize: 11, fontWeight: 700,
                    background: active ? G.blue : "#f3f4f6",
                    color: active ? G.white : G.muted,
                    padding: "1px 7px", borderRadius: 99 }}>{cnt}</span>
                </button>
              );
            })}
            <div style={{ flex: 1 }} />
            <div style={{ display: "flex", alignItems: "center", gap: 8, paddingBottom: 4 }}>
              <div style={{ position: "relative" }}>
                <svg style={{ position: "absolute", left: 9, top: "50%", transform: "translateY(-50%)" }}
                  width="13" height="13" fill="none" stroke={G.muted} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search transactions…"
                  style={{ paddingLeft: 28, paddingRight: 10, paddingTop: 6, paddingBottom: 6,
                    fontSize: 12, border: `1px solid ${G.border}`, borderRadius: 7, outline: "none",
                    width: 200, color: G.text, background: G.white, fontFamily: FONT }} />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* CONTENT */}
      <main style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 28px 64px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 20 }}>

          {/* LEFT */}
          <div>
            {/* Bar chart */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "20px 22px", marginBottom: 20 }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
                <div>
                  <p style={{ fontSize: 14, fontWeight: 700, color: G.navy }}>Monthly Earnings</p>
                  <p style={{ fontSize: 12, color: G.muted, marginTop: 2 }}>Last 6 months</p>
                </div>
                <div style={{ display: "flex", gap: 6 }}>
                  {[["gross","Gross"],["net","Net"],["fee","Fee"]].map(([id, label]) => (
                    <button key={id} onClick={() => setChartView(id)}
                      style={{ fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 8,
                        border: `1px solid ${chartView === id ? G.blue : G.border}`,
                        background: chartView === id ? G.blueBg : G.white,
                        color: chartView === id ? G.navy : G.sub,
                        cursor: "pointer", fontFamily: FONT }}>{label}</button>
                  ))}
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "flex-end", gap: 12, height: 140 }}>
                {MONTHLY.map((m, i) => {
                  const val   = chartView === "net" ? m.gross * 0.94 : chartView === "fee" ? m.gross * 0.06 : m.gross;
                  const h     = Math.round((val / maxBar) * 120);
                  const isMax = val === Math.max(...MONTHLY.map(x => chartView === "net" ? x.gross * 0.94 : chartView === "fee" ? x.gross * 0.06 : x.gross));
                  return (
                    <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                      <p style={{ fontSize: 10, fontWeight: 700, color: isMax ? G.navy : G.muted }}>
                        {chartView === "fee" ? fmt(val) : fmtL(val)}
                      </p>
                      <div style={{ width: "100%", height: h, borderRadius: "6px 6px 0 0",
                        background: isMax ? G.grad : `linear-gradient(180deg,${G.blueBorder},#93c5fd)`,
                        transition: "height 0.3s" }} />
                      <p style={{ fontSize: 11, color: G.sub, fontWeight: 500 }}>{m.month}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transactions table */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid #f3f4f6" }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.navy }}>
                  Transactions <span style={{ fontSize: 12, color: G.muted, fontWeight: 400 }}>({rows.length})</span>
                </p>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 90px 90px 90px 100px",
                padding: "10px 20px", background: G.bg, borderBottom: "1px solid #f3f4f6" }}>
                {["Date / Contract","Milestone","Gross","Fee (6%)","Net","Status"].map(h => (
                  <p key={h} style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.07em" }}>{h}</p>
                ))}
              </div>
              {rows.length === 0 ? (
                <div style={{ padding: "48px 20px", textAlign: "center" }}>
                  <p style={{ fontSize: 32, marginBottom: 8 }}>📭</p>
                  <p style={{ fontSize: 14, color: G.sub }}>No transactions found</p>
                </div>
              ) : rows.map((t, i) => {
                const ss = STATUS_STYLE[t.status] || STATUS_STYLE.pending;
                return (
                  <div key={t.id} style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr 90px 90px 90px 100px",
                    padding: "14px 20px", borderBottom: i < rows.length - 1 ? "1px solid #f9fafb" : "none", transition: "background 0.12s" }}
                    onMouseEnter={e => e.currentTarget.style.background = G.bg}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div>
                      <p style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{t.date}</p>
                      <p style={{ fontSize: 11, color: G.blue, marginTop: 2 }}>{t.contract}</p>
                      <p style={{ fontSize: 11, color: G.muted }}>{t.client}</p>
                    </div>
                    <p style={{ fontSize: 13, color: G.sub, lineHeight: 1.5, paddingRight: 12, alignSelf: "center" }}>{t.milestone}</p>
                    <p style={{ fontSize: 13, fontWeight: 600, color: G.text, alignSelf: "center" }}>{fmt(t.gross)}</p>
                    <p style={{ fontSize: 13, color: "#dc2626", alignSelf: "center" }}>−{fmt(t.fee)}</p>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G.navy, alignSelf: "center" }}>{fmt(t.net)}</p>
                    <div style={{ alignSelf: "center" }}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600,
                        padding: "3px 9px", borderRadius: 99, background: ss.bg, color: ss.text }}>
                        <span style={{ width: 5, height: 5, borderRadius: "50%", background: ss.dot }} />
                        {ss.label}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>

            {/* Wallet card — navy-blue gradient */}
            <div style={{ background: G.grad, borderRadius: 16, padding: "22px", position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: -30, right: -30, width: 120, height: 120, borderRadius: "50%", background: "rgba(255,255,255,0.07)", pointerEvents: "none" }} />
              <div style={{ position: "absolute", bottom: -40, left: -20, width: 100, height: 100, borderRadius: "50%", background: "rgba(255,255,255,0.04)", pointerEvents: "none" }} />
              <p style={{ fontSize: 11, color: "rgba(255,255,255,0.5)", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 8 }}>Available Balance</p>
              <p style={{ fontSize: 32, fontWeight: 800, color: "#bfdbfe", marginBottom: 4, letterSpacing: "-0.5px", fontFamily: FONT }}>{fmt(stats.balance)}</p>
              <p style={{ fontSize: 12, color: "rgba(255,255,255,0.4)", marginBottom: 20 }}>Last payout: ₹1,35,760 on Mar 1, 2026</p>
              <a href="/agency/withdrawals" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                background: "rgba(255,255,255,0.15)", color: G.white, border: "1px solid rgba(255,255,255,0.25)",
                borderRadius: 9, padding: "11px 0", fontSize: 13, fontWeight: 700, cursor: "pointer",
                textDecoration: "none", width: "100%", fontFamily: FONT, boxSizing: "border-box" }}>
                Withdraw Funds →
              </a>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginTop: 14 }}>
                {[{ label: "Pending", val: fmt(stats.pending), c: "#fcd34d" }, { label: "On Hold", val: fmt(stats.onHold), c: "#fb923c" }].map(s => (
                  <div key={s.label} style={{ background: "rgba(255,255,255,0.10)", borderRadius: 10, padding: "10px 12px" }}>
                    <p style={{ fontSize: 10, color: "rgba(255,255,255,0.4)", fontWeight: 600, marginBottom: 4 }}>{s.label}</p>
                    <p style={{ fontSize: 14, fontWeight: 700, color: s.c, fontFamily: FONT }}>{s.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Platform fee tracker */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 20px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.navy, marginBottom: 2 }}>Platform Fee Tracker</p>
              <p style={{ fontSize: 12, color: G.muted, marginBottom: 16 }}>Weblance charges 6% per transaction</p>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                <span style={{ fontSize: 12, color: G.sub }}>Total fees paid (FY 2025-26)</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{fmt(stats.feePaid)}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
                <span style={{ fontSize: 12, color: G.sub }}>This month</span>
                <span style={{ fontSize: 13, fontWeight: 700, color: "#dc2626" }}>
                  {fmt(TRANSACTIONS.filter(t => t.status === "released" && t.date.includes("Mar")).reduce((s, t) => s + t.fee, 0))}
                </span>
              </div>
              <div style={{ background: G.blueBg, border: `1px solid ${G.blueBorder}`, borderRadius: 8, padding: "10px 12px" }}>
                <p style={{ fontSize: 11, color: G.navy, fontWeight: 600, marginBottom: 4 }}>Fee deducted automatically</p>
                <p style={{ fontSize: 11, color: G.sub, lineHeight: 1.5 }}>Platform fee of 6% is deducted before funds are released to your wallet.</p>
              </div>
            </div>

            {/* Earnings summary */}
            <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "18px 20px" }}>
              <p style={{ fontSize: 13, fontWeight: 700, color: G.navy, marginBottom: 14 }}>Earnings Summary</p>
              {[
                ["Total Gross Earned", fmt(TRANSACTIONS.reduce((s, t) => s + t.gross, 0))],
                ["Total Fees Paid",    fmt(TRANSACTIONS.reduce((s, t) => s + t.fee,   0))],
                ["Total Net Earned",   fmt(TRANSACTIONS.reduce((s, t) => s + t.net,   0))],
                ["Total Withdrawn",    "₹1,35,760"],
                ["Available Balance",  fmt(stats.balance)],
              ].map(([k, v], i, arr) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", paddingBottom: 10, marginBottom: 10,
                  borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                  <span style={{ fontSize: 12, color: G.sub }}>{k}</span>
                  <span style={{ fontSize: 13, fontWeight: 700, color: i === arr.length - 1 ? G.navy : G.text }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}