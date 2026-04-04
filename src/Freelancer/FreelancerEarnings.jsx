import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fe-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fe-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

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
  { id:"TXN-001", date:"Mar 20, 2026", client:"ShopEasy Retail",    project:"E-Commerce Platform",    milestone:"M1 — Discovery & Architecture", gross:60000, fee:3600, net:56400, status:"released",  contractId:"CON-2026-001" },
  { id:"TXN-002", date:"Mar 18, 2026", client:"TravelNest",         project:"Travel Booking Platform", milestone:"Advance — 30%",                 gross:42000, fee:2520, net:39480, status:"in_escrow", contractId:"CON-2026-003" },
  { id:"TXN-003", date:"Mar 12, 2026", client:"ShopEasy Retail",    project:"E-Commerce Platform",    milestone:"M2 — Core Build",               gross:62000, fee:3720, net:58280, status:"pending",   contractId:"CON-2026-001" },
  { id:"TXN-004", date:"Feb 28, 2026", client:"Zestify Foods",      project:"Food Delivery App",       milestone:"M3 — Final Delivery",           gross:48000, fee:2880, net:45120, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-005", date:"Feb 15, 2026", client:"Zestify Foods",      project:"Food Delivery App",       milestone:"M2 — Backend Integration",      gross:47000, fee:2820, net:44180, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-006", date:"Jan 20, 2026", client:"HealthFirst Clinic", project:"Patient Portal",          milestone:"M1 — Design & Prototype",       gross:38000, fee:2280, net:35720, status:"on_hold",   contractId:"CON-2026-004" },
  { id:"TXN-007", date:"Jan 5, 2026",  client:"Zestify Foods",      project:"Food Delivery App",       milestone:"M1 — UI Design",                gross:35000, fee:2100, net:32900, status:"released",  contractId:"CON-2025-018" },
  { id:"TXN-008", date:"Dec 10, 2025", client:"UrbanRide",          project:"Driver Dashboard UI",     milestone:"Final Delivery",                gross:52000, fee:3120, net:48880, status:"released",  contractId:"CON-2025-014" },
  { id:"TXN-009", date:"Nov 22, 2025", client:"MediCare Plus",      project:"Patient Portal",          milestone:"Full Project",                  gross:85000, fee:5100, net:79900, status:"released",  contractId:"CON-2025-011" },
];

const ESCROW_ITEMS = [
  { client:"ShopEasy Retail", milestone:"M2 — Core Backend Build", amount:62000, due:"Apr 15, 2026", contract:"CON-2026-001" },
  { client:"TravelNest",      milestone:"M1 — Discovery Phase",    amount:42000, due:"Mar 26, 2026", contract:"CON-2026-003" },
];
const HOLD_ITEMS = [
  { client:"HealthFirst Clinic", milestone:"M1 — Design & Prototype", amount:38000, reason:"Contract on hold — client legal review", contract:"CON-2026-004" },
];

const STATUS_STYLE = {
  released:  { bg:G.greenBg,  text:G.greenDeep, dot:G.green,     label:"Released"  },
  pending:   { bg:"#fef3c7",  text:"#92400e",   dot:"#f59e0b",   label:"Pending"   },
  in_escrow: { bg:G.navyBg,   text:G.navy,      dot:G.navyLight, label:"In Escrow" },
  on_hold:   { bg:"#fef2f2",  text:"#dc2626",   dot:"#ef4444",   label:"On Hold"   },
  refunded:  { bg:"#f3f4f6",  text:"#6b7280",   dot:"#9ca3af",   label:"Refunded"  },
};

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

const btnOutline = {
  display:"inline-flex", alignItems:"center", gap:6,
  fontSize:12, fontWeight:700, fontFamily:FONT,
  background:G.greenBg, color:G.greenDeep,
  border:`1px solid ${G.greenBorder}`,
  borderRadius:100, padding:"7px 14px",
  cursor:"pointer", transition:"all 0.15s",
  textDecoration:"none",
};

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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6EC030; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #2E7D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6EC030 #f1f1f1; }

        /* ── Hero: true full-bleed, 100vw, zero margin ── */
        .hero-bleed {
          width: 100vw;
          position: relative;
          left: 50%;
          right: 50%;
          margin-left: -50vw;
          margin-right: -50vw;

          /* Richer layered background */
          background:
            /* subtle grid lines */
            repeating-linear-gradient(
              90deg,
              rgba(168,224,99,0.04) 0px,
              rgba(168,224,99,0.04) 1px,
              transparent 1px,
              transparent 80px
            ),
            repeating-linear-gradient(
              0deg,
              rgba(168,224,99,0.03) 0px,
              rgba(168,224,99,0.03) 1px,
              transparent 1px,
              transparent 80px
            ),
            /* diagonal shimmer */
            linear-gradient(
              118deg,
              #0F1A3B 0%,
              #1A2B5E 35%,
              #162550 55%,
              #0a1228 80%,
              #060d1e 100%
            );
          overflow: hidden;
          box-shadow: 0 6px 40px rgba(6,13,30,0.45);
        }

        /* Glowing orbs via pseudo/divs — done in JSX */
        .hero-orb-1 {
          position: absolute;
          top: -100px; right: -100px;
          width: 420px; height: 420px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(110,192,48,0.18) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-orb-2 {
          position: absolute;
          bottom: -60px; left: -60px;
          width: 300px; height: 300px;
          border-radius: 50%;
          background: radial-gradient(circle, rgba(74,111,165,0.22) 0%, transparent 70%);
          pointer-events: none;
        }
        .hero-orb-3 {
          position: absolute;
          top: 50%; left: 38%;
          transform: translate(-50%, -50%);
          width: 500px; height: 240px;
          border-radius: 50%;
          background: radial-gradient(ellipse, rgba(168,224,99,0.06) 0%, transparent 70%);
          pointer-events: none;
        }
        /* Faint diagonal streak */
        .hero-streak {
          position: absolute;
          top: -40px; left: 20%;
          width: 2px; height: 200%;
          background: linear-gradient(180deg, transparent, rgba(168,224,99,0.08), transparent);
          transform: rotate(25deg);
          pointer-events: none;
        }
        .hero-streak-2 {
          position: absolute;
          top: -40px; left: 55%;
          width: 1px; height: 200%;
          background: linear-gradient(180deg, transparent, rgba(168,224,99,0.05), transparent);
          transform: rotate(25deg);
          pointer-events: none;
        }

        /* Inner content wrapper — recenters within the bleed */
        .hero-inner {
          max-width: 1160px;
          margin: 0 auto;
          padding: 28px 28px 0;
        }
      `}</style>

      <Navbar />

      {/* ── Wallet Hero — true full-bleed ── */}
      <div className="hero-bleed">
        {/* Decorative layers */}
        <div className="hero-orb-1" />
        <div className="hero-orb-2" />
        <div className="hero-orb-3" />
        <div className="hero-streak" />
        <div className="hero-streak-2" />

        <div className="hero-inner">
          {/* Wallet card */}
          <div style={{
            background:"rgba(255,255,255,0.055)",
            border:"1px solid rgba(255,255,255,0.10)",
            borderRadius:18, padding:"24px 28px",
            backdropFilter:"blur(14px)",
            WebkitBackdropFilter:"blur(14px)",
          }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
              <div>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.38)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>Available Balance</p>
                <p style={{ fontSize:44, fontWeight:800, color:G.white, margin:0, letterSpacing:"-1px", fontFamily:FONT }}>{fmt(stats.available)}</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.32)", marginTop:8 }}>6% platform fee auto-deducted · Withdrawals instant via UPI</p>
              </div>
              <div style={{ display:"flex", gap:10, flexShrink:0 }}>
                <a href="/freelancer/withdrawals" style={{
                  display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:700,
                  background: G.gradGreen, color:G.white,
                  border:"none", borderRadius:100,
                  padding:"11px 20px", textDecoration:"none",
                  boxShadow:"0 3px 14px rgba(46,125,31,0.35)",
                  transition:"opacity 0.15s",
                }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}>
                  📤 Withdraw Now
                </a>
                <a href="/freelancer/kyc" style={{
                  display:"flex", alignItems:"center", gap:7, fontSize:13, fontWeight:700,
                  background:"rgba(255,255,255,0.07)", color:"rgba(255,255,255,0.72)",
                  border:"1px solid rgba(255,255,255,0.15)", borderRadius:100,
                  padding:"10px 18px", textDecoration:"none",
                }}>
                  🪪 KYC Status
                </a>
              </div>
            </div>

            {/* Sub stats */}
            <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:0, borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:20 }}>
              {[
                { label:"This Month Net",  val:fmt(stats.thisMonth), accent:G.green                  },
                { label:"Pending Release", val:fmt(stats.pending),   accent:"#fbbf24"                },
                { label:"Lifetime Earned", val:fmt(stats.lifetime),  accent:"rgba(255,255,255,0.85)" },
              ].map((s, i) => (
                <div key={i} style={{ paddingLeft:i > 0 ? 24 : 0, borderLeft:i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.32)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{s.label}</p>
                  <p style={{ fontSize:22, fontWeight:700, color:s.accent, margin:0, fontFamily:FONT }}>{s.val}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:20, borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:16, paddingBottom:16 }}>
            {[
              { label:"Last Month",      val:fmt(stats.lastMonth), accent:"rgba(255,255,255,0.75)" },
              { label:"On Hold",         val:fmt(stats.onHold),    accent:"#fca5a5"                },
              { label:"Total Fees Paid", val:fmt(stats.totalFees), accent:"rgba(255,255,255,0.38)"  },
              { label:"Platform Rate",   val:"6%",                 accent:G.green                  },
            ].map((s, i) => (
              <div key={i} style={{ flex:1, paddingLeft:i > 0 ? 20 : 0, borderLeft:i > 0 ? "1px solid rgba(255,255,255,0.07)" : "none" }}>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.32)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{s.label}</p>
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
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"20px 22px", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
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
                        style={{
                          padding:"6px 14px", fontSize:12, fontWeight:active ? 700 : 500,
                          color:active ? G.white : G.sub,
                          background:active ? G.gradNavy : "#f3f4f6",
                          border:"none",
                          borderRadius:id === "gross" ? "100px 0 0 100px" : id === "fee" ? "0 100px 100px 0" : "0",
                          cursor:"pointer", fontFamily:FONT, transition:"all 0.12s",
                          boxShadow:active ? "0 2px 8px rgba(15,26,59,0.22)" : "none",
                        }}>
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
                    borderTop:pct === 0 ? "none" : `1px dashed ${G.greenBorder}`, display:"flex", alignItems:"center" }}>
                    {pct > 0 && <span style={{ fontSize:9, color:G.muted, marginLeft:-2, lineHeight:1 }}>{(chartMax * (pct / 100) / 1000).toFixed(0)}k</span>}
                  </div>
                ))}

                {MONTHLY.map((m, i) => {
                  const val      = m[chartMode] || 0;
                  const pct      = chartMax > 0 ? (val / chartMax) * 100 : 0;
                  const isHov    = hoveredBar === i;
                  const barColor = chartMode === "fee" ? "#fbbf24" : chartMode === "gross" ? G.green : G.greenDeep;
                  return (
                    <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4, height:"100%", justifyContent:"flex-end", position:"relative" }}
                      onMouseEnter={() => setHoveredBar(i)} onMouseLeave={() => setHoveredBar(null)}>
                      {isHov && (
                        <div style={{
                          position:"absolute", bottom:"100%", left:"50%", transform:"translateX(-50%)",
                          background: G.gradNavy,
                          color:G.white, borderRadius:10, padding:"8px 12px",
                          fontSize:11, whiteSpace:"nowrap", marginBottom:6, zIndex:10,
                          boxShadow:"0 4px 16px rgba(15,26,59,0.28)",
                        }}>
                          <p style={{ fontWeight:700, marginBottom:2 }}>{m.month}</p>
                          <p>Gross: {fmt(m.gross)}</p>
                          <p>Fee: {fmt(m.fee)}</p>
                          <p style={{ color:G.greenLight }}>Net: {fmt(m.net)}</p>
                        </div>
                      )}
                      <div style={{
                        width:"100%", height:`${Math.max(pct, val > 0 ? 3 : 0)}%`,
                        background:isHov ? G.greenLight : barColor,
                        borderRadius:"5px 5px 0 0", transition:"all 0.15s", minHeight:val > 0 ? 4 : 0,
                      }} />
                      <span style={{ fontSize:9, color:G.muted, marginTop:2 }}>{m.month}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Transactions table */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:G.text }}>Transaction History</p>
                  <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>{filteredTxns.length} transactions</p>
                </div>
                <div style={{ display:"flex", gap:8, alignItems:"center" }}>
                  <div style={{ position:"relative" }}>
                    <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search client or project…"
                      style={{ fontSize:12, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 10px 7px 30px", outline:"none", color:G.text, fontFamily:FONT, width:200 }} />
                    <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:13, color:G.muted }}>🔍</span>
                  </div>
                  <select value={dateRange} onChange={e => setDateRange(e.target.value)}
                    style={{ fontSize:12, fontWeight:600, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 12px", outline:"none", color:G.text, background:G.white, fontFamily:FONT }}>
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
                          style={{
                            padding:"6px 11px", fontSize:11, fontWeight:active ? 700 : 500,
                            color:active ? G.white : G.sub,
                            background:active ? G.gradNavy : "#f3f4f6",
                            border:"none",
                            borderRadius:id === "all" ? "100px 0 0 100px" : id === "on_hold" ? "0 100px 100px 0" : "0",
                            cursor:"pointer", fontFamily:FONT, transition:"all 0.12s",
                          }}>
                          {label}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display:"grid", gridTemplateColumns:"120px 1fr 100px 80px 80px 100px 80px", padding:"10px 20px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}` }}>
                {["Date","Project / Client","Milestone","Gross","Fee","Net","Status"].map(h => (
                  <p key={h} style={{ fontSize:10, fontWeight:700, color:G.greenDeep, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
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
                        padding:"13px 20px", borderBottom:`1px solid ${G.greenBorder}`,
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
                      <p style={{ fontSize:13, fontWeight:700, color:G.greenDeep }}>{fmt(t.net)}</p>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:ss.bg, color:ss.text, padding:"3px 9px", borderRadius:99 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:ss.dot }} />
                        {ss.label}
                      </span>
                    </div>

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
                          <button style={{ ...btnOutline }}>📄 Invoice</button>
                          <a href="/freelancer/contracts" style={{ ...btnOutline, color:G.navy, background:G.navyBg, border:`1px solid ${G.navyBorder}` }}>
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
            <div style={{ background:G.white, border:`1px solid ${G.navyBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 12px rgba(15,26,59,0.06)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:4 }}>In Escrow</p>
              <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>Safe — releases after milestone approval</p>
              {ESCROW_ITEMS.map((e, i) => (
                <div key={i} style={{ border:`1px solid ${G.navyBorder}`, borderRadius:12, padding:"12px 14px", marginBottom:10, background:G.navyBg }}>
                  <p style={{ fontSize:13, fontWeight:700, color:G.navy, marginBottom:2 }}>{fmt(e.amount)}</p>
                  <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:2 }}>{e.client}</p>
                  <p style={{ fontSize:11, color:G.muted, marginBottom:2 }}>{e.milestone}</p>
                  <p style={{ fontSize:11, color:G.navy, fontWeight:600 }}>📅 Due {e.due}</p>
                </div>
              ))}
              <div style={{ borderTop:`1px solid ${G.greenBorder}`, paddingTop:10, marginTop:4 }}>
                <div style={{ display:"flex", justifyContent:"space-between" }}>
                  <span style={{ fontSize:12, color:G.sub }}>Total in escrow</span>
                  <span style={{ fontSize:13, fontWeight:700, color:G.navy }}>{fmt(ESCROW_ITEMS.reduce((s, e) => s + e.amount, 0))}</span>
                </div>
              </div>
            </div>

            {/* On Hold */}
            {HOLD_ITEMS.length > 0 && (
              <div style={{ background:G.white, border:"1px solid #fecaca", borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 8px rgba(239,68,68,0.06)" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:4 }}>On Hold</p>
                <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>Requires resolution</p>
                {HOLD_ITEMS.map((h, i) => (
                  <div key={i} style={{ border:"1px solid #fecaca", borderRadius:12, padding:"12px 14px", marginBottom:10, background:"#fef2f2" }}>
                    <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:2 }}>{fmt(h.amount)}</p>
                    <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:2 }}>{h.client}</p>
                    <p style={{ fontSize:11, color:G.muted, marginBottom:6 }}>{h.reason}</p>
                    <a href="/freelancer/contracts" style={{ fontSize:11, fontWeight:700, color:"#dc2626", textDecoration:"none" }}>View Contract →</a>
                  </div>
                ))}
              </div>
            )}

            {/* Platform Fee Tracker */}
            <div style={{
              background: G.gradNavy,
              borderRadius:16, padding:"18px 20px", position:"relative", overflow:"hidden",
              boxShadow:"0 4px 20px rgba(15,26,59,0.28)",
            }}>
              <div style={{ position:"absolute", top:-24, right:-24, width:80, height:80, borderRadius:"50%", background:"rgba(168,224,99,0.10)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-16, left:-16, width:60, height:60, borderRadius:"50%", background:"rgba(168,224,99,0.06)", pointerEvents:"none" }} />
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Platform Fee Tracker</p>
              {[
                ["Fees paid this year", fmt(14340)],
                ["Commission rate",    "6% per milestone"],
                ["Your tier",          "Standard"],
              ].map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                  <span style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:G.green }}>{v}</span>
                </div>
              ))}
            </div>

            {/* Tax info */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
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
              <button style={{ ...btnOutline, width:"100%", marginTop:10, padding:"9px", justifyContent:"center", borderRadius:100 }}>
                📥 Download TDS Certificate
              </button>
            </div>

            {/* Quick actions */}
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { icon:"📤", label:"Withdraw Balance",    href:"/freelancer/withdrawals", primary:true  },
                { icon:"📊", label:"Download CSV",         href:"#",                       primary:false },
                { icon:"📄", label:"Download PDF Report",  href:"#",                       primary:false },
              ].map((a, i) => (
                <a key={i} href={a.href}
                  style={{
                    display:"flex", alignItems:"center", gap:8, padding:"10px 16px",
                    fontSize:13, fontWeight:700, fontFamily:FONT,
                    color:a.primary ? G.white : G.greenDeep,
                    background:a.primary ? G.gradNavy : G.greenBg,
                    border:a.primary ? "none" : `1px solid ${G.greenBorder}`,
                    borderRadius:100, textDecoration:"none", transition:"opacity 0.12s",
                    boxShadow:a.primary ? "0 3px 16px rgba(15,26,59,0.28)" : "none",
                  }}
                  onMouseEnter={e => e.currentTarget.style.opacity="0.88"}
                  onMouseLeave={e => e.currentTarget.style.opacity="1"}>
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
    <nav style={{
      height:56, background:G.white,
      borderBottom:`1px solid ${G.greenBorder}`,
      boxShadow:"0 2px 12px rgba(110,192,48,0.08)",
      display:"flex", alignItems:"center",
      padding:"0 28px", gap:12,
      position:"sticky", top:0, zIndex:40,
      overflow:"hidden"
    }}>
      <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <div style={{ flexShrink:0, cursor:"pointer" }}>
          <img
            src="/weblance.jpeg"
            alt="Weblance"
            style={{ height:65, width:130, display:"block" }}
          />
        </div>
      </span>
      <div style={{ width:1, height:20, background:G.greenBorder }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.greenBorder }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Earnings</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>💼</span>
        <span style={{ fontSize:11, color:G.greenDeep, fontWeight:700 }}>Freelancer</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{
        width:34, height:34, borderRadius:"50%",
        background: G.gradNavy,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white,
        marginLeft:8, fontFamily:FONT,
        boxShadow:"0 2px 8px rgba(15,26,59,0.28)",
      }}>AJ</div>
    </nav>
  );
}