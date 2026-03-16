import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fw-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fw-fonts"; l.rel = "stylesheet";
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

const AVAILABLE = 187960;
const MIN_BANK  = 500;
const MIN_UPI   = 100;
const MAX_UPI   = 50000;

const BANK_ACCOUNTS = [
  { id:"hdfc", bank:"HDFC Bank", masked:"••••4821", type:"Savings", ifsc:"HDFC0002341", holder:"Arjun Joshi", primary:true,  verified:true  },
  { id:"sbi",  bank:"SBI",       masked:"••••7203", type:"Savings", ifsc:"SBIN0001234", holder:"Arjun Joshi", primary:false, verified:true  },
];

const UPI_ID = "arjun.joshi@okhdfc";

const PAYOUTS = [
  { id:"PAY-2026-008", date:"Mar 10, 2026", amount:95000, method:"Bank", account:"HDFC ••••4821",           status:"completed",  ref:"NEFT2026031045892" },
  { id:"PAY-2026-007", date:"Feb 22, 2026", amount:15000, method:"UPI",  account:"arjun.joshi@okhdfc",      status:"completed",  ref:"UPI202602224512"   },
  { id:"PAY-2026-006", date:"Feb 5, 2026",  amount:50000, method:"Bank", account:"HDFC ••••4821",           status:"completed",  ref:"NEFT2026020598321" },
  { id:"PAY-2026-005", date:"Jan 20, 2026", amount:5000,  method:"UPI",  account:"arjun.joshi@okhdfc",      status:"completed",  ref:"UPI202601209871"   },
  { id:"PAY-2026-004", date:"Jan 8, 2026",  amount:75000, method:"Bank", account:"HDFC ••••4821",           status:"completed",  ref:"NEFT2026010832100" },
  { id:"PAY-2026-003", date:"Dec 15, 2025", amount:40000, method:"Bank", account:"SBI ••••7203",            status:"failed",     ref:"NEFT2025121512300" },
  { id:"PAY-2026-002", date:"Dec 2, 2025",  amount:85000, method:"Bank", account:"HDFC ••••4821",           status:"completed",  ref:"NEFT2025120245600" },
  { id:"PAY-2026-001", date:"Nov 18, 2025", amount:10000, method:"UPI",  account:"arjun.joshi@okhdfc",      status:"completed",  ref:"UPI202511183302"   },
];

const PAYOUT_STYLE = {
  completed:  { bg:G.greenBg,  text:G.greenDark, dot:G.green,   label:"Completed"  },
  processing: { bg:"#fef3c7",  text:"#92400e",   dot:"#f59e0b", label:"Processing" },
  failed:     { bg:"#fef2f2",  text:"#dc2626",   dot:"#ef4444", label:"Failed"     },
  cancelled:  { bg:"#f3f4f6",  text:"#6b7280",   dot:"#9ca3af", label:"Cancelled"  },
};

const fmt = (n) => "₹" + Number(n).toLocaleString("en-IN");

export default function FreelancerWithdrawals() {
  const [method,       setMethod]       = useState("bank");
  const [selectedBank, setSelectedBank] = useState("hdfc");
  const [amount,       setAmount]       = useState("");
  const [payouts,      setPayouts]      = useState(PAYOUTS);
  const [payFilter,    setPayFilter]    = useState("all");
  const [expanded,     setExpanded]     = useState(null);
  const [showSuccess,  setShowSuccess]  = useState(false);
  const [showAddBank,  setShowAddBank]  = useState(false);

  const kycDone = true;

  const numAmt = Number(amount.replace(/,/g, "")) || 0;
  const minAmt = method === "upi" ? MIN_UPI : MIN_BANK;
  const maxAmt = method === "upi" ? Math.min(MAX_UPI, AVAILABLE) : AVAILABLE;

  const amtError = useMemo(() => {
    if (!amount) return null;
    if (numAmt < minAmt) return `Minimum withdrawal is ${fmt(minAmt)}`;
    if (numAmt > maxAmt) return method === "upi" ? `UPI limit is ${fmt(MAX_UPI)} per transaction` : "Exceeds available balance";
    return null;
  }, [amount, numAmt, minAmt, maxAmt, method]);

  const canWithdraw = kycDone && numAmt >= minAmt && numAmt <= maxAmt && !amtError;

  const handleWithdraw = () => {
    if (!canWithdraw) return;
    setShowSuccess(true);
    setAmount("");
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const filteredPayouts = useMemo(() => {
    if (payFilter === "all") return payouts;
    return payouts.filter(p => p.status === payFilter);
  }, [payouts, payFilter]);

  const totalWithdrawn = payouts.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const lastPayout     = payouts.find(p => p.status === "completed");

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      {/* Success toast */}
      {showSuccess && (
        <div style={{ position:"fixed", top:68, right:24, zIndex:100,
          background:G.greenBg, border:`1px solid ${G.greenBorder}`,
          borderRadius:12, padding:"14px 20px",
          boxShadow:"0 8px 32px rgba(34,197,94,0.2)",
          display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:22 }}>🎉</span>
          <div>
            <p style={{ fontSize:13, fontWeight:700, color:G.greenDark }}>Withdrawal Initiated!</p>
            <p style={{ fontSize:12, color:G.muted }}>{method === "upi" ? "Arrives in seconds" : "1–3 business days"}</p>
          </div>
        </div>
      )}

      {/* Header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1060, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Withdrawals</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Request payouts to your bank or UPI</p>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:18, paddingBottom:18, borderTop:"1px solid #f3f4f6" }}>
            {[
              { label:"Available to Withdraw", val:fmt(AVAILABLE),       accent:G.greenDark, big:true },
              { label:"Total Withdrawn",        val:fmt(totalWithdrawn),  accent:G.text                },
              { label:"Pending Payout",         val:fmt(0),               accent:G.muted               },
              { label:"Last Payout",            val:lastPayout?.date||"—",accent:G.sub                 },
              { label:"Min Bank / UPI",         val:"₹500 / ₹100",        accent:G.sub                 },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:s.big ? 1.4 : 1,
                borderRight:i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
                paddingLeft:i === 0 ? 0 : 20 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:s.big ? 22 : 18, fontWeight:800, color:s.accent, margin:0, letterSpacing:"-0.3px" }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1060, margin:"0 auto", padding:"24px 28px 64px" }}>
        {!kycDone && (
          <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:18 }}>🔒</span>
            <span style={{ fontSize:13, color:"#dc2626" }}>
              <strong>Withdrawals locked.</strong> Complete KYC Step 3 (Bank Verification) to enable payouts.{" "}
              <a href="/freelancer/kyc" style={{ color:"#dc2626", fontWeight:700 }}>Complete KYC →</a>
            </span>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"1fr 340px", gap:20 }}>

          {/* Left — accounts + history */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Method selector */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"20px" }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:16 }}>Withdrawal Method</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:20 }}>
                {[
                  { id:"bank", icon:"🏦", title:"Bank Transfer", sub:"NEFT / IMPS · 1–3 days",     badge:null      },
                  { id:"upi",  icon:"⚡", title:"UPI Instant",   sub:"Arrives in seconds · Max ₹50K", badge:"INSTANT" },
                ].map(opt => {
                  const active = method === opt.id;
                  return (
                    <button key={opt.id} onClick={() => setMethod(opt.id)}
                      style={{ display:"flex", alignItems:"flex-start", gap:12, padding:"14px 16px",
                        border:`2px solid ${active ? G.green : G.border}`,
                        borderRadius:12, background:active ? G.greenBg : G.white,
                        cursor:"pointer", textAlign:"left", transition:"all 0.12s", fontFamily:FONT }}>
                      <span style={{ fontSize:22, lineHeight:1 }}>{opt.icon}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                          <p style={{ fontSize:14, fontWeight:700, color:active ? G.greenDark : G.text }}>{opt.title}</p>
                          {opt.badge && <span style={{ fontSize:9, fontWeight:700, background:G.green, color:G.white, borderRadius:99, padding:"2px 7px" }}>{opt.badge}</span>}
                        </div>
                        <p style={{ fontSize:11, color:G.muted, marginTop:3 }}>{opt.sub}</p>
                      </div>
                      <div style={{ width:18, height:18, borderRadius:"50%",
                        border:`2px solid ${active ? G.green : G.border}`,
                        background:active ? G.green : G.white,
                        display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        {active && <div style={{ width:8, height:8, borderRadius:"50%", background:G.white }} />}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Bank accounts */}
              {method === "bank" && (
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Saved Accounts</p>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {BANK_ACCOUNTS.map(acc => {
                      const sel = selectedBank === acc.id;
                      return (
                        <div key={acc.id} onClick={() => setSelectedBank(acc.id)}
                          style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                            border:`2px solid ${sel ? G.green : G.border}`,
                            borderRadius:12, background:sel ? G.greenBg : G.white,
                            cursor:"pointer", transition:"all 0.12s" }}>
                          <div style={{ width:36, height:36, borderRadius:10,
                            background:sel ? G.greenBorder : "#f3f4f6",
                            display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>🏦</div>
                          <div style={{ flex:1 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                              <p style={{ fontSize:14, fontWeight:700, color:G.text }}>{acc.bank} {acc.masked}</p>
                              {acc.primary && <span style={{ fontSize:10, fontWeight:700, background:G.green, color:G.white, borderRadius:99, padding:"2px 8px" }}>Primary</span>}
                              {acc.verified && <span style={{ fontSize:10, fontWeight:700, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"2px 8px" }}>✓ Verified</span>}
                            </div>
                            <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>{acc.type} · IFSC {acc.ifsc}</p>
                          </div>
                          <div style={{ display:"flex", gap:6 }}>
                            {!acc.primary && (
                              <button onClick={e => e.stopPropagation()} style={{ fontSize:11, color:G.sub, background:"#f3f4f6", border:"none", borderRadius:7, padding:"4px 8px", cursor:"pointer", fontFamily:FONT }}>Set Primary</button>
                            )}
                            <button onClick={e => e.stopPropagation()} style={{ fontSize:11, color:"#dc2626", background:"#fef2f2", border:"none", borderRadius:7, padding:"4px 8px", cursor:"pointer", fontFamily:FONT }}>Remove</button>
                          </div>
                        </div>
                      );
                    })}
                    <button onClick={() => setShowAddBank(true)}
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"12px 16px",
                        border:`2px dashed ${G.greenBorder}`, borderRadius:12, background:G.greenBg,
                        cursor:"pointer", color:G.greenDark, fontSize:13, fontWeight:700, fontFamily:FONT }}>
                      <span style={{ fontSize:18 }}>➕</span> Add New Bank Account
                    </button>
                  </div>
                </div>
              )}

              {/* UPI */}
              {method === "upi" && (
                <div>
                  <p style={{ fontSize:12, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>UPI Details</p>
                  <div style={{ display:"flex", alignItems:"center", gap:14, padding:"14px 16px",
                    border:`2px solid ${G.green}`, borderRadius:12, background:G.greenBg }}>
                    <div style={{ width:36, height:36, borderRadius:10, background:G.greenBorder, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18 }}>⚡</div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:14, fontWeight:700, color:G.greenDark }}>{UPI_ID}</p>
                      <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>Linked to HDFC Bank ••••4821 · Instant transfer</p>
                    </div>
                    <span style={{ fontSize:10, fontWeight:700, background:G.green, color:G.white, borderRadius:99, padding:"3px 10px" }}>Active</span>
                  </div>
                  <div style={{ background:"#fef3c7", border:"1px solid #fde68a", borderRadius:9, padding:"10px 14px", marginTop:10 }}>
                    <p style={{ fontSize:12, color:"#92400e" }}>⚡ UPI transfers are limited to <strong>₹50,000</strong> per transaction per NPCI guidelines. For larger amounts, use Bank Transfer.</p>
                  </div>
                </div>
              )}
            </div>

            {/* Payout history */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:"1px solid #f3f4f6", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:G.text }}>Payout History</p>
                  <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>{filteredPayouts.length} payouts</p>
                </div>
                <div style={{ display:"flex", gap:0 }}>
                  {[["all","All"],["completed","Done"],["processing","Processing"],["failed","Failed"]].map(([id, label]) => {
                    const active = payFilter === id;
                    return (
                      <button key={id} onClick={() => setPayFilter(id)}
                        style={{ padding:"6px 11px", fontSize:11, fontWeight:active ? 700 : 500,
                          color:active ? G.white : G.sub,
                          background:active ? G.green : "#f3f4f6",
                          border:"none",
                          borderRadius:id === "all" ? "7px 0 0 7px" : id === "failed" ? "0 7px 7px 0" : "0",
                          cursor:"pointer", fontFamily:FONT }}>
                        {label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Column headers */}
              <div style={{ display:"grid", gridTemplateColumns:"110px 100px 100px 1fr 100px 80px 80px", padding:"10px 20px", background:"#fafafa", borderBottom:"1px solid #f3f4f6" }}>
                {["Date","Amount","Method","Account / UPI","Status","Ref ID",""].map(h => (
                  <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
                ))}
              </div>

              {filteredPayouts.map(p => {
                const ps    = PAYOUT_STYLE[p.status] || PAYOUT_STYLE.completed;
                const isExp = expanded === p.id;
                return (
                  <div key={p.id}>
                    <div onClick={() => setExpanded(isExp ? null : p.id)}
                      style={{ display:"grid", gridTemplateColumns:"110px 100px 100px 1fr 100px 80px 80px",
                        padding:"13px 20px", borderBottom:"1px solid #f9fafb",
                        cursor:"pointer", alignItems:"center", transition:"background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <p style={{ fontSize:12, color:G.sub }}>{p.date}</p>
                      <p style={{ fontSize:13, fontWeight:700, color:G.greenDark }}>{fmt(p.amount)}</p>
                      <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                        <span style={{ fontSize:13 }}>{p.method === "UPI" ? "⚡" : "🏦"}</span>
                        <span style={{ fontSize:12, color:G.sub }}>{p.method}</span>
                      </div>
                      <p style={{ fontSize:12, color:G.sub, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", paddingRight:8 }}>{p.account}</p>
                      <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:ps.bg, color:ps.text, padding:"3px 9px", borderRadius:99 }}>
                        <span style={{ width:5, height:5, borderRadius:"50%", background:ps.dot }} />
                        {ps.label}
                      </span>
                      <p style={{ fontSize:10, color:G.muted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.ref.slice(0, 10)}…</p>
                      {p.status === "failed" ? (
                        <button onClick={e => e.stopPropagation()} style={{ fontSize:11, fontWeight:700, color:"#dc2626", background:"#fef2f2", border:"1px solid #fecaca", borderRadius:7, padding:"4px 8px", cursor:"pointer", fontFamily:FONT }}>Retry</button>
                      ) : (
                        <button onClick={e => e.stopPropagation()} style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 8px", cursor:"pointer", fontFamily:FONT }}>📄</button>
                      )}
                    </div>

                    {/* Expanded row */}
                    {isExp && (
                      <div style={{ padding:"14px 20px 18px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", gap:20 }}>
                        <div style={{ flex:1, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:14 }}>
                          {[
                            ["Payout ID", p.id],
                            ["Method",    p.method],
                            ["Account",   p.account],
                            ["Amount",    fmt(p.amount)],
                            ["Status",    ps.label],
                            ["Reference", p.ref],
                          ].map(([k, v]) => (
                            <div key={k}>
                              <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{k}</p>
                              <p style={{ fontSize:12, fontWeight:600, color:G.text, wordBreak:"break-all" }}>{v}</p>
                            </div>
                          ))}
                        </div>
                        <button style={{ alignSelf:"flex-start", fontSize:12, fontWeight:700, color:G.greenDark, background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"7px 14px", cursor:"pointer", flexShrink:0, fontFamily:FONT }}>
                          📄 Receipt
                        </button>
                      </div>
                    )}
                  </div>
                );
              })}

              {filteredPayouts.length === 0 && (
                <div style={{ textAlign:"center", padding:"48px 20px" }}>
                  <p style={{ fontSize:32, marginBottom:8 }}>📤</p>
                  <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No payouts found</p>
                </div>
              )}
            </div>
          </div>

          {/* Right — withdrawal form (sticky) */}
          <div>
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden", position:"sticky", top:72 }}>

              {/* Dark green gradient header */}
              <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"16px 20px" }}>
                <p style={{ fontSize:16, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>
                  {method === "upi" ? "⚡ Instant UPI Withdrawal" : "🏦 Bank Transfer"}
                </p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", marginTop:4 }}>
                  {method === "upi" ? "Arrives in seconds · Max ₹50,000" : "1–3 business days · No fee"}
                </p>
              </div>

              <div style={{ padding:"18px 20px" }}>
                {/* Available */}
                <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:10, padding:"12px 14px", marginBottom:18 }}>
                  <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.06em" }}>Available Balance</p>
                  <p style={{ fontSize:24, fontWeight:800, color:G.greenDark, fontFamily:FONT }}>{fmt(AVAILABLE)}</p>
                </div>

                {/* Amount input */}
                <div style={{ marginBottom:14 }}>
                  <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:7, textTransform:"uppercase", letterSpacing:"0.06em" }}>Amount</label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:15, fontWeight:700, color:G.greenDark }}>₹</span>
                    <input value={amount} onChange={e => setAmount(e.target.value.replace(/[^0-9]/g, ""))}
                      placeholder="0"
                      style={{ width:"100%", fontSize:20, fontWeight:700,
                        border:`2px solid ${amtError ? "#ef4444" : amount ? G.green : G.border}`,
                        borderRadius:10, padding:"11px 12px 11px 28px", outline:"none",
                        color:G.text, fontFamily:FONT, boxSizing:"border-box", transition:"border-color 0.15s" }} />
                  </div>
                  {amtError && <p style={{ fontSize:11, color:"#dc2626", marginTop:5, fontWeight:600 }}>⚠ {amtError}</p>}
                </div>

                {/* Quick amounts */}
                <div style={{ display:"flex", gap:6, marginBottom:18 }}>
                  {(method === "upi"
                    ? [["₹1K",1000],["₹5K",5000],["₹10K",10000],["₹50K",50000]]
                    : [["₹10K",10000],["₹25K",25000],["₹50K",50000],["Max",AVAILABLE]]
                  ).map(([label, val]) => (
                    <button key={label} onClick={() => setAmount(String(val))}
                      style={{ flex:1, padding:"7px 4px", fontSize:11, fontWeight:700,
                        color:numAmt === val ? G.greenDark : G.sub,
                        background:numAmt === val ? G.greenBorder : "#f3f4f6",
                        border:`1.5px solid ${numAmt === val ? G.green : G.border}`,
                        borderRadius:8, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                      {label}
                    </button>
                  ))}
                </div>

                {/* Selected method summary */}
                <div style={{ background:G.bg, borderRadius:10, padding:"12px 14px", marginBottom:18 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:G.muted, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>
                    {method === "upi" ? "UPI Details" : "Withdraw To"}
                  </p>
                  {method === "upi" ? (
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:20 }}>⚡</span>
                      <div>
                        <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{UPI_ID}</p>
                        <p style={{ fontSize:11, color:G.muted }}>Instant · HDFC Bank</p>
                      </div>
                    </div>
                  ) : (() => {
                    const acc = BANK_ACCOUNTS.find(a => a.id === selectedBank);
                    return acc ? (
                      <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                        <span style={{ fontSize:20 }}>🏦</span>
                        <div>
                          <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{acc.bank} {acc.masked}</p>
                          <p style={{ fontSize:11, color:G.muted }}>{acc.type} · {acc.ifsc}</p>
                        </div>
                      </div>
                    ) : null;
                  })()}
                </div>

                {/* Summary */}
                <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:14, marginBottom:18 }}>
                  {[
                    ["Amount",         numAmt > 0 ? fmt(numAmt) : "—"],
                    ["Processing Fee", "₹0 (Free)"],
                    ["You Receive",    numAmt > 0 ? fmt(numAmt) : "—"],
                    ["Arrives",        method === "upi" ? "In seconds" : "1–3 business days"],
                  ].map(([k, v], i) => (
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
                      <span style={{ fontSize:12, color:G.sub }}>{k}</span>
                      <span style={{ fontSize:12, fontWeight:i === 2 ? 700 : 600, color:i === 2 ? G.greenDark : G.text }}>{v}</span>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <button onClick={handleWithdraw} disabled={!canWithdraw}
                  style={{ width:"100%", padding:"13px", fontSize:14, fontWeight:700, border:"none", borderRadius:10,
                    background:canWithdraw ? G.green : "#e5e7eb",
                    color:canWithdraw ? G.white : G.muted,
                    cursor:canWithdraw ? "pointer" : "not-allowed", fontFamily:FONT, transition:"all 0.15s" }}>
                  {!kycDone ? "🔒 Complete KYC First" : canWithdraw
                    ? `${method === "upi" ? "⚡ Withdraw Instantly" : "📤 Request Withdrawal"}`
                    : "Enter amount to withdraw"}
                </button>

                {kycDone && (
                  <p style={{ fontSize:11, color:G.muted, textAlign:"center", marginTop:10, lineHeight:1.6 }}>
                    {method === "upi" ? "Instant transfer · Available 24/7" : "Processed on business days · NEFT/IMPS"}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>

      {showAddBank && <AddBankModal onClose={() => setShowAddBank(false)} />}
    </div>
  );
}

/* ── Add Bank Modal ─────────────────────────────────────────── */
function AddBankModal({ onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:480, background:G.white, borderRadius:18, overflow:"hidden", boxShadow:"0 32px 80px rgba(0,0,0,0.18)" }}>
        <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"18px 22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <p style={{ fontSize:17, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>Add Bank Account</p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:3 }}>Savings account only · Must match your KYC name</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>
        <div style={{ padding:"20px 22px", display:"flex", flexDirection:"column", gap:14 }}>
          {[
            { label:"Account Holder Name", ph:"As per bank records",     type:"text"     },
            { label:"Account Number",      ph:"Enter account number",    type:"password" },
            { label:"Confirm Account No.", ph:"Re-enter account number", type:"text"     },
            { label:"IFSC Code",           ph:"e.g. HDFC0002341",        type:"text"     },
          ].map(f => (
            <div key={f.label}>
              <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
              <input type={f.type} placeholder={f.ph} style={{ width:"100%", fontSize:13, border:`1.5px solid ${G.border}`, borderRadius:9, padding:"10px 12px", outline:"none", color:G.text, fontFamily:FONT, boxSizing:"border-box" }} />
            </div>
          ))}
          <div style={{ background:"#fef3c7", border:"1px solid #fde68a", borderRadius:9, padding:"10px 14px" }}>
            <p style={{ fontSize:12, color:"#92400e" }}>💡 A ₹1 penny drop verification will be done to confirm your account. The amount will be credited back immediately.</p>
          </div>
          <div style={{ display:"flex", gap:8, paddingTop:4 }}>
            <button onClick={onClose} style={{ flex:1, padding:"10px", fontSize:13, fontWeight:600, border:`1px solid ${G.border}`, background:G.white, color:G.sub, borderRadius:9, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
            <button style={{ flex:1, padding:"10px", fontSize:13, fontWeight:700, border:"none", background:G.green, color:G.white, borderRadius:9, cursor:"pointer", fontFamily:FONT }}>Add Account</button>
          </div>
        </div>
      </div>
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
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Withdrawals</span>
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