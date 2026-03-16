import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fe-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fe-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
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

const MONTHLY = [
  { month:"Apr", gross:42000, fee:2520,  net:39480 },
  { month:"May", gross:68000, fee:4080,  net:63920 },
  { month:"Jun", gross:35000, fee:2100,  net:32900 },
  { month:"Jul", gross:95000, fee:5700,  net:89300 },
  { month:"Aug", gross:72000, fee:4320,  net:67680 },
  { month:"Sep", gross:1,     fee:0,     net:0     },
  { month:"Oct", gross:88000, fee:5280,  net:82720 },
  { month:"Nov", gross:1,     fee:0,     net:0     },
  { month:"Dec", gross:1,     fee:0,     net:0     },
  { month:"Jan", gross:1,     fee:0,     net:0     },
  { month:"Feb", gross:95000, fee:5700,  net:89300 },
  { month:"Mar", gross:60000, fee:3600,  net:56400 },
];

const TXNS = [
  { id:"TXN-001", date:"Mar 20, 2026", client:"ShopEasy Retail",   project:"E-Commerce Platform",    milestone:"M1 — Discovery & Architecture", gross:60000, fee:3600, net:56400, status:"released",  contractId:"CON-2026-001" },
  { id:"TXN-002", date:"Mar 18, 2026", client:"TravelNest",        project:"Travel Booking Platform", milestone:"Advance — 30%",                gross:42000, fee:2520, net:39480, status:"in_escrow", contractId:"CON-2026-003" },
  { id:"TXN-003", date:"Mar 12, 2026", client:"ShopEasy Retail",   project:"E-Commerce Platform",    milestone:"M2 — Core Build",              gross:62000, fee:3720, net:58280, status:"pending",    contractId:"CON-2026-001" },
  { id:"TXN-004", date:"Feb 28, 2026", client:"Zestify Foods",     project:"Food Delivery App",       milestone:"M3 — Final Delivery",          gross:48000, fee:2880, net:45120, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-005", date:"Feb 15, 2026", client:"Zestify Foods",     project:"Food Delivery App",       milestone:"M2 — Backend Integration",     gross:47000, fee:2820, net:44180, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-006", date:"Jan 20, 2026", client:"HealthFirst Clinic", project:"Patient Portal",         milestone:"M1 — Design & Prototype",      gross:38000, fee:2280, net:35720, status:"on_hold",   contractId:"CON-2026-004" },
  { id:"TXN-007", date:"Jan 5, 2026",  client:"Zestify Foods",     project:"Food Delivery App",       milestone:"M1 — UI Design",               gross:35000, fee:2100, net:32900, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-008", date:"Dec 10, 2025", client:"UrbanRide",         project:"Driver Dashboard UI",     milestone:"Final Delivery",               gross:52000, fee:3120, net:48880, status:"released",  contractId:"CON-2025-014" },
  { id:"TXN-009", date:"Nov 22, 2025", client:"MediCare Plus",     project:"Patient Portal",          milestone:"Full Project",                 gross:85000, fee:5100, net:79900, status:"released",  contractId:"CON-2025-011" },
];

const ESCROW_ITEMS = [
  { client:"ShopEasy Retail", milestone:"M2 — Core Backend Build", amount:62000, due:"Apr 15, 2026", contract:"CON-2026-001" },
  { client:"TravelNest",      milestone:"M1 — Discovery Phase",    amount:42000, due:"Mar 26, 2026", contract:"CON-2026-003" },
];
const HOLD_ITEMS = [
  { client:"HealthFirst Clinic", milestone:"M1 — Design & Prototype", amount:38000, reason:"Contract on hold — client legal review", contract:"CON-2026-004" },
];

const STATUS_STYLE = {
  released:  { bg:G.greenBg,  text:G.greenDark, dot:G.green,    label:"Released"  },
  pending:   { bg:"#fef3c7",  text:"#92400e",   dot:"#f59e0b",  label:"Pending"   },
  in_escrow: { bg:"#eff6ff",  text:"#1d4ed8",   dot:"#3b82f6",  label:"In Escrow" },
  on_hold:   { bg:"#fef2f2",  text:"#dc2626",   dot:"#ef4444",  label:"On Hold"   },
  refunded:  { bg:"#f3f4f6",  text:"#6b7280",   dot:"#9ca3af",  label:"Refunded"  },
};

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function FreelancerEarnings() {
  const [chartMode,  setChartMode]  = useState("net");
  const [txnFilter,  setTxnFilter]  = useState("all");
  const [dateRange,  setDateRange]  = useState("all");
  const [search,     setSearch]     = useState("");
  const [expanded,   setExpanded]   = useState(null);
  const [hoveredBar, setHoveredBar] = useState(null);

  const chartMax = useMemo(() => Math.max(...MONTHLY.map(m => m.gross)), []);

  const filteredTxns = useMemo(() => {
    let t = [...TXNS];
    if (txnFilter !== "all") t = t.filter(x => x.status === txnFilter);
    if (search) t = t.filter(x =>
      x.client.toLowerCase().includes(search.toLowerCase()) ||
      x.project.toLowerCase().includes(search.toLowerCase()));
    return t;
  }, [txnFilter, search]);

  const stats = { available:187960, thisMonth:56400, lastMonth:89300, pending:104000, onHold:38000, lifetime:834250, totalFees:53655 };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      {/* ── Wallet Hero — dark green gradient ── */}
      <div style={{ background:"linear-gradient(135deg,#14532d 0%,#166534 55%,#15803d 100%)", padding:"28px 28px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-80, right:-80, width:280, height:280, borderRadius:"50%", background:"rgba(34,197,94,0.07)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, left:60, width:160, height:160, borderRadius:"50%", background:"rgba(34,197,94,0.04)", pointerEvents:"none" }} />

        <div style={{ maxWidth:1160, margin:"0 auto" }}>
          {/* Wallet card */}
          <div style={{ background:"rgba(255,255,255,0.05)", border:"1px solid rgba(255,255,255,0.1)", borderRadius:18, padding:"24px 28px", backdropFilter:"blur(10px)" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Available Balance</p>
                <p style={{ fontSize:44, fontWeight:800, color:G.white, margin:0, letterSpacing:"-1px", fontFamily:FONT }}>{fmt(stats.available)}</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.35)", marginTop:8 }}>6% platform fee auto-deducted · Withdrawals instant via UPI</p>
              </div>
              <div style={{ display:"flex", gap:10, flexShrink:0 }}>
                <a href="/freelancer/withdrawals"
                  style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:700,
                    background:G.green, color:G.white, border:"none", borderRadius:10, padding:"11px 20px",
                    textDecoration:"none", transition:"background 0.15s" }}
                  onMouseEnter={e => e.currentTarget.style.background = G.greenDark}
                  onMouseLeave={e => e.currentTarget.style.background = G.green}>
                  📤 Withdraw Now
                </a>
                <a href="/freelancer/kyc"
                  style={{ display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:700,
                    background:"rgba(255,255,255,0.08)", color:"rgba(255,255,255,0.7)",
                    border:"1px solid rgba(255,255,255,0.15)", borderRadius:10, padding:"11px 18px", textDecoration:"none" }}>
                  🪪 KYC Status
                </a>
              </div>
            </div>

            {/* Sub stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:20 }}>
              {[
                { label:"This Month Net",  val:fmt(stats.thisMonth), accent:"#86efac"               },
                { label:"Pending Release", val:fmt(stats.pending),   accent:"#fbbf24"               },
                { label:"Lifetime Earned", val:fmt(stats.lifetime),  accent:"rgba(255,255,255,0.8)" },
              ].map((s, i) => (
                <div key={i} style={{ paddingLeft:i > 0 ? 24 : 0, borderLeft:i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{s.label}</p>
                  <p style={{ fontSize:22, fontWeight:700, color:s.accent, margin:0, fontFamily:FONT }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:20, borderTop:"1px solid rgba(255,255,255,0.08)", paddingTop:16, paddingBottom:16 }}>
            {[
              { label:"Last Month",     val:fmt(stats.lastMonth), accent:"rgba(255,255,255,0.7)" },
              { label:"On Hold",        val:fmt(stats.onHold),    accent:"#fca5a5"               },
              { label:"Total Fees Paid",val:fmt(stats.totalFees), accent:"rgba(255,255,255,0.4)" },
              { label:"Platform Rate",  val:"6%",                 accent:"#86efac"               },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, paddingLeft:i > 0 ? 20 : 0, borderLeft:i > 0 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{s.label}</p>
                <p style={{ fontSize:18, fontWeight:700, color:s.accent, margin:0, fontFamily:FONT }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Main content ── */}
      <main style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

          {/* Left column */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Chart */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"20px 22px" }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:G.text }}>Monthly Earnings</p>
                  <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>Last 12 months</p>
                </div>
                <div style={{ display:"flex", gap:0 }}>
                  {[["gross","Gross"],["net","Net"],["fee","Fee"]].map(([id, label]) => {
                    const active = chartMode === id;
                    return (
                      <button key={id} onClick={() => setChartMode(id)}
                        style={{ padding:"6px 14px", fontSize:12, fontWeight:active ? 700 : 500,
                          color:active ? G.white : G.sub,
                          background:active ? G.green : "#f3f4f6",
                          border:"none",
                          borderRadius:id === "gross" ? "7px 0 0 7px" : id === "fee" ? "0 7px 7px 0" : "0",
                          cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Bar chart */}
              <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:160, position:"relative" }}>
                {[0,25,50,75,100].map(pct => (
                  <div key={pct} style={{ position:"absolute", left:0, right:0, bottom:`${pct}%`,
                    borderTop:pct === 0 ? "none" : "1px dashed #f3f4f6", display:"flex", alignItems:"center" }}>
                    {pct > 0 && <span style={{ fontSize:9, color:G.muted, marginLeft:-2, lineHeight:1 }}>{(chartMax * (pct / 100) / 1000).toFixed(0)}k</span>}
                  </div>
                ))}

                {MONTHLY.map((m, i) => {
                  const val      = m[chartMode] || 0;
                  const pct      = chartMax > 0 ? (val / chartMax) * 100 : 0;
                  const isHov    = hoveredBar === i;
                  const barColor = chartMode === "fee" ? "#fbbf24" : chartMode === "gross" ? G.green : G.greenDark;
                  return (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, height:"100%", justifyContent:"flex-end", position:"relative" }}
                      onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                      {isHov && (
                        <div style={{ position:"absolute", bottom:"100%", left:"50%", transform:"translateX(-50%)",
                          background:"#1f2937", color:G.white, borderRadius:8, padding:"7px 10px",
                          fontSize:11, whiteSpace:"nowrap", marginBottom:6, zIndex:10, boxShadow:"0 4px 16px rgba(0,0,0,0.15)" }}>
                          <p style={{ fontWeight:700, marginBottom:2 }}>{m.month}</p>
                          <p>Gross: {fmt(m.gross)}</p>
                          <p>Fee: {fmt(m.fee)}</p>
                          <p style={{ color:"#86efac" }}>Net: {fmt(m.net)}</p>
                        </div>
                      )}
                      <div style={{ width:"100%", height:`${Math.max(pct, val > 0 ? 3 : 0)}%`,
                        background:isHov ? "#86efac" : barColor,
                        borderRadius:"5px 5px 0 0", transition:"all 0.15s", minHeight:val > 0 ? 4 : 0 }} />
                      <span style={{ fontSize:9, color:G.muted, marginTop:2 }}>{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transactions table */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:G.text }}>Transaction History</p>
                  <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>{filteredTxns.length} transactions</p>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <div style={{ position:"relative" }}>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client or project…"
                      style={{ fontSize:12, border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 10px 7px 30px",
                        outline:"none", color:G.text, fontFamily:FONT, width:200 }} />
                    <span style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", fontSize:13, color:G.muted }}>🔍</span>
                  </div>
                  <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                    style={{ fontSize:12, fontWeight:600, border:`1px solid ${G.border}`, borderRadius:8, padding:"7px 10px", outline:"none", color:G.text, background:G.white, fontFamily:FONT }}>
                    <option value="all">All Time</option>
                    <option value="this_month">This Month</option>
                    <option value="last_month">Last Month</option>
                    <option value="last_3m">Last 3 Months</option>
                    <option value="last_6m">Last 6 Months</option>
                  </select>
                  <div style={{ display:"flex", gap:0 }}>
                    {[["all","All"],["released","Released"],["pending","Pending"],["in_escrow","Escrow"],["on_hold","On Hold"]].map(([id, label]) => {
                      const active = txnFilter === id;
                      return (
                        <button key={id} onClick={() => setTxnFilter(id)}
                          style={{ padding:"6px 11px", fontSize:11, fontWeight:active ? 700 : 500,
                            color:active ? G.white : G.sub,
                            background:active ? G.green : "#f3f4f6",
                            border:"none",
                            borderRadius:id === "all" ? "7px 0 0 7px" : id === "on_hold" ? "0 7px 7px 0" : "0",
                            cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display:"grid", gridTemplateColumns:"120px 1fr 100px 80px 80px 100px 80px", padding:"10px 20px", background:"#fafafa", borderBottom:"1px solid #f3f4f6" }}>
                {["Date","Project / Client","Milestone","Gross","Fee","Net","Status"].map(h => (
                  <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
                ))}
              </div>

              {/* Rows */}
              {filteredTxns.map((t, i) => {
                const ss    = STATUS_STYLE[t.status] || STATUS_STYLE.released;
                const isExp = expanded === t.id;
                return (
                  <div key={t.id}>
                    <div onClick={() => setExpanded(isExp ? null : t.id)}
                      style={{ display:"grid", gridTemplateColumns:"120px 1fr 100px 80px 80px 100px 80px",
                        padding:"13px 20px", borderBottom:"1px solid #f9fafb",
                        cursor:"pointer", transition:"background 0.1s", alignItems:"center" }}
                      onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <p style={{ fontSize:12, color:G.sub }}>{t.date}</p>
                      <div>
                        <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{t.client}</p>
                        <p style={{ fontSize:11, color:G.muted }}>{t.project}</p>
                      </div>
                      <p style={{ fontSize:11, color:G.sub, paddingRight:8 }}>{t.milestone.split("—")[0]}</p>
                      <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{fmt(t.gross)}</p>
                      <p style={{ fontSize:12, color:"#dc2626" }}>-{fmt(t.fee)}</p>
                      <p style={{ fontSize:13, fontWeight:700, color:G.greenDark }}>{fmt(t.net)}</p>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:ss.bg, color:ss.text, padding:"3px 9px", borderRadius:99 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:ss.dot }} />
                        {ss.label}
                      </span>
                    </div>

                    {/* Expanded row */}
                    {isExp && (
                      <div style={{ padding:"14px 20px 18px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", gap:20, alignItems:"flex-start" }}>
                        <div style={{ flex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                          {[
                            ["Contract ID",  t.contractId],
                            ["Milestone",    t.milestone],
                            ["Gross Amount", fmt(t.gross)],
                            ["Platform Fee", fmt(t.fee) + " (6%)"],
                            ["Net Earned",   fmt(t.net)],
                            ["Status",       ss.label],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{k}</p>
                              <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{v}</p>
                            </div>
                          ))}
                        </div>
                        <div style={{ display:"flex", gap:8, flexShrink:0 }}>
                          <button style={{ fontSize:12, fontWeight:700, color:G.greenDark, background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 14px", cursor:"pointer", fontFamily:FONT }}>
                            📄 Invoice
                          </button>
                          <a href="/freelancer/contracts" style={{ fontSize:12, fontWeight:700, color:"#2563eb", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"6px 14px", textDecoration:"none" }}>
                            View Contract →
                          </a>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredTxns.length === 0 && (
                <div style={{ textAlign:"center", padding:"48px 20px" }}>
                  <p style={{ fontSize:32, marginBottom:8 }}>💸</p>
                  <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No transactions found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Escrow */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"18px 20px" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:4 }}>In Escrow</p>
              <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>Safe — releases after milestone approval</p>
              {ESCROW_ITEMS.map((e, i) => (
                <div key={i} style={{ border:"1px solid #bfdbfe", borderRadius:10, padding:"12px 14px", marginBottom:10, background:"#eff6ff" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#1d4ed8", marginBottom:2 }}>{fmt(e.amount)}</p>
                  <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:2 }}>{e.client}</p>
                  <p style={{ fontSize:11, color:G.muted, marginBottom:2 }}>{e.milestone}</p>
                  <p style={{ fontSize:11, color:"#2563eb", fontWeight:600 }}>📅 Due {e.due}</p>
                </div>
              ))}
              <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:10, marginTop:4 }}>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:12, color:G.sub }}>Total in escrow</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"#1d4ed8" }}>{fmt(ESCROW_ITEMS.reduce((s, e) => s + e.amount, 0))}</span>
                </div>
              </div>
            </div>

            {/* On Hold */}
            {HOLD_ITEMS.length > 0 && (
              <div style={{ background:G.white, border:"1px solid #fecaca", borderRadius:14, padding:"18px 20px" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:4 }}>On Hold</p>
                <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>Requires resolution</p>
                {HOLD_ITEMS.map((h, i) => (
                  <div key={i} style={{ border:"1px solid #fecaca", borderRadius:10, padding:"12px 14px", marginBottom:10, background:"#fef2f2" }}>
                    <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:2 }}>{fmt(h.amount)}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:2 }}>{h.client}</p>
                    <p style={{ fontSize:11, color:G.muted, marginBottom:6 }}>{h.reason}</p>
                    <a href="/freelancer/contracts" style={{ fontSize:11, fontWeight:700, color:"#dc2626", textDecoration:"none" }}>View Contract →</a>
                  </div>
                ))}
              </div>
            )}

            {/* Platform Fee Tracker — dark green gradient */}
            <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:14, padding:"18px 20px", position:"relative", overflow:"hidden" }}>
              <div style={{ position:"absolute", top:-24, right:-24, width:80, height:80, borderRadius:"50%", background:"rgba(34,197,94,0.08)", pointerEvents:"none" }} />
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Platform Fee Tracker</p>
              {[
                ["Fees paid this year", fmt(14340)],
                ["Commission rate",    "6% per milestone"],
                ["Your tier",          "Standard"],
              ].map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:"#86efac" }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Tax info */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"18px 20px" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:14 }}>Tax Information</p>
              {[
                ["TDS deducted (FY 2025-26)", fmt(8342)],
                ["Section",                   "194J"],
                ["Form 26AS updated",         "Yes ✓"],
              ].map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12, color:G.sub }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{v}</span>
                </div>
              ))}
              <button style={{ width:"100%", marginTop:10, padding:"8px", fontSize:12, fontWeight:700,
                color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`,
                borderRadius:8, cursor:"pointer", fontFamily:FONT }}>
                📥 Download TDS Certificate
              </button>
            </div>

            {/* Quick actions */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { icon:"📤", label:"Withdraw Balance",   href:"/freelancer/withdrawals", primary:true  },
                { icon:"📊", label:"Download CSV",        href:"#",                       primary:false },
                { icon:"📄", label:"Download PDF Report", href:"#",                       primary:false },
              ].map((a, i) => (
                <a key={i} href={a.href}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"10px 14px",
                    fontSize:13, fontWeight:700,
                    color:a.primary ? G.white : G.greenDark,
                    background:a.primary ? G.green : G.greenBg,
                    border:`1px solid ${a.primary ? "transparent" : G.greenBorder}`,
                    borderRadius:9, textDecoration:"none", transition:"opacity 0.12s" }}
                  onMouseEnter={e => e.currentTarget.style.opacity = "0.85"}
                  onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                  <span style={{ fontSize:15 }}>{a.icon}</span>{a.label}
                </a>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <span style={{ color:G.green }}>web</span>lance
      </span>
      <div style={{ width:1, height:20, background:G.border }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Earnings</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>💼</span>
        <span style={{ fontSize:11, color:G.greenDark, fontWeight:700 }}>Freelancer</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.greenDark, marginLeft:8, fontFamily:FONT }}>AJ</div>
    </nav>
  );
}