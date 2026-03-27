



import { useState } from "react";

(() => {
  if (document.getElementById("wl-wd-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-wd-fonts"; l.rel = "stylesheet";
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
  yellow:      "#f59e0b",
  yellowBg:    "#fffbeb",
  yellowBorder:"#fde68a",
};

const FONT = "'Plus Jakarta Sans', sans-serif";
const fmt = (n, c = "₹") => `${c}${Number(n).toLocaleString("en-IN")}`;

const ACCOUNTS = [
  { id:"ACC-001", nick:"Primary — HDFC",  bank:"HDFC Bank",  last4:"4821", type:"Savings", holder:"TechVision Solutions", ifsc:"HDFC0001234", primary:true  },
  { id:"ACC-002", nick:"ICICI Current",   bank:"ICICI Bank", last4:"9034", type:"Current", holder:"TechVision Solutions", ifsc:"ICIC0005678", primary:false },
];

const PAYOUTS = [
  { id:"PAY-2026-008", date:"Mar 1, 2026",  amount:135760, account:"HDFC ••••4821",  status:"completed", arrival:"Mar 4, 2026",  note:null },
  { id:"PAY-2026-007", date:"Feb 10, 2026", amount:94000,  account:"HDFC ••••4821",  status:"completed", arrival:"Feb 13, 2026", note:null },
  { id:"PAY-2026-006", date:"Jan 28, 2026", amount:75000,  account:"ICICI ••••9034", status:"failed",    arrival:null,           note:"Bank account verification failed" },
  { id:"PAY-2026-005", date:"Jan 28, 2026", amount:75000,  account:"HDFC ••••4821",  status:"completed", arrival:"Feb 1, 2026",  note:"Retry after failed PAY-2026-006" },
  { id:"PAY-2026-004", date:"Jan 5, 2026",  amount:37600,  account:"HDFC ••••4821",  status:"completed", arrival:"Jan 8, 2026",  note:null },
  { id:"PAY-2026-003", date:"Dec 20, 2025", amount:56400,  account:"HDFC ••••4821",  status:"completed", arrival:"Dec 23, 2025", note:null },
];

const STATUS_STYLE = {
  completed:  { bg:G.blueBg,   text:"#1e40af",  dot:G.blue,    label:"Completed"  },
  processing: { bg:"#f5f3ff",  text:"#6d28d9",  dot:"#8b5cf6", label:"Processing" },
  failed:     { bg:G.redBg,    text:G.red,      dot:G.red,     label:"Failed"     },
  cancelled:  { bg:"#f3f4f6",  text:G.muted,    dot:G.muted,   label:"Cancelled"  },
};

const AVAILABLE_BALANCE = 187960;
const MIN_WITHDRAWAL    = 1000;

const inp = {
  width:"100%", fontSize:13, border:`1.5px solid ${G.border}`,
  borderRadius:8, padding:"9px 12px", outline:"none",
  color:G.text, boxSizing:"border-box", fontFamily:FONT,
  background:G.white,
};

export default function AgencyWithdrawals() {
  const [accounts,    setAccounts]    = useState(ACCOUNTS);
  const [amount,      setAmount]      = useState("");
  const [selAcc,      setSelAcc]      = useState("ACC-001");
  const [showSuccess, setShowSuccess] = useState(false);
  const [showNewAcc,  setShowNewAcc]  = useState(false);

  const totalWithdrawn = PAYOUTS.filter(p => p.status === "completed").reduce((s, p) => s + p.amount, 0);
  const pending        = PAYOUTS.filter(p => p.status === "processing").reduce((s, p) => s + p.amount, 0);
  const amtNum         = Number(amount.replace(/,/g, ""));
  const isValid        = amtNum >= MIN_WITHDRAWAL && amtNum <= AVAILABLE_BALANCE && selAcc;

  const handleWithdraw = () => {
    if (!isValid) return;
    setShowSuccess(true);
    setAmount("");
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const setPrimary = (id) => setAccounts(prev => prev.map(a => ({ ...a, primary: a.id === id })));
  const deleteAcc  = (id) => setAccounts(prev => prev.filter(a => a.id !== id));

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar page="Withdrawals" />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1240, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px" }}>Withdrawals</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Request payouts to your bank account</p>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6`, paddingBottom:20 }}>
            {[
              { label:"Available to Withdraw", val:fmt(AVAILABLE_BALANCE), color:G.navy,   big:true },
              { label:"Total Withdrawn",        val:fmt(totalWithdrawn),    color:G.text            },
              { label:"Pending Payout",         val:fmt(pending),           color:G.yellow          },
              { label:"Last Payout",            val:"Mar 1, 2026",          color:G.text            },
              { label:"Min. Withdrawal",        val:fmt(MIN_WITHDRAWAL),    color:G.muted           },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:s.big ? 1.3 : 1, borderRight:i < arr.length - 1 ? `1px solid #f3f4f6` : "none", paddingLeft:i === 0 ? 0 : 22, paddingRight:22 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:s.big ? 22 : 17, fontWeight:800, color:s.color, margin:0, letterSpacing:"-0.4px" }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth:1240, margin:"0 auto", padding:"24px 28px 64px" }}>

        {/* KYC notice */}
        <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:10, padding:"10px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:15 }}>🔐</span>
          <span style={{ fontSize:13, color:"#92400e", fontWeight:500 }}>
            Ensure your <strong>KYC is verified</strong> before requesting a payout.{" "}
            <a href="/agency/kyc" style={{ color:G.navy, fontWeight:700 }}>Check KYC status →</a>
          </span>
        </div>

        <div style={{ display:"grid", gridTemplateColumns:"1fr 370px", gap:20 }}>

          {/* ── Left panel ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Success banner */}
            {showSuccess && (
              <div style={{ background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:10, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>✅</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:G.navy }}>Withdrawal request submitted!</p>
                  <p style={{ fontSize:12, color:G.sub, marginTop:2 }}>Expected arrival in 2–3 business days.</p>
                </div>
              </div>
            )}

            {/* Saved bank accounts */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <div>
                  <p style={{ fontSize:14, fontWeight:700, color:G.navy }}>Saved Bank Accounts</p>
                  <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>Manage your payout destinations</p>
                </div>
                <button onClick={() => setShowNewAcc(true)}
                  style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, color:G.navy, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:8, padding:"7px 14px", cursor:"pointer", fontFamily:FONT }}>
                  <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
                  Add Account
                </button>
              </div>

              {accounts.map((a, i) => (
                <div key={a.id} style={{ padding:"15px 20px", borderBottom:i < accounts.length - 1 ? `1px solid #f9fafb` : "none", display:"flex", alignItems:"center", gap:14 }}>
                  <div style={{ width:40, height:40, borderRadius:10, background:G.blueBg, border:`1px solid ${G.blueBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>🏦</div>
                  <div style={{ flex:1 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:3 }}>
                      <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{a.nick}</p>
                      {a.primary && <span style={{ fontSize:10, fontWeight:700, background:G.blueBg, color:G.navy, border:`1px solid ${G.blueBorder}`, padding:"2px 8px", borderRadius:99 }}>PRIMARY</span>}
                    </div>
                    <p style={{ fontSize:12, color:G.sub }}>{a.bank} · {a.type} · ••••{a.last4}</p>
                    <p style={{ fontSize:11, color:G.muted, marginTop:1 }}>{a.holder} · IFSC: {a.ifsc}</p>
                  </div>
                  <div style={{ display:"flex", gap:8 }}>
                    {!a.primary && (
                      <>
                        <button onClick={() => setPrimary(a.id)}
                          style={{ fontSize:11, fontWeight:600, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontFamily:FONT }}>
                          Set Primary
                        </button>
                        <button onClick={() => deleteAcc(a.id)}
                          style={{ fontSize:11, fontWeight:600, color:G.red, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontFamily:FONT }}>
                          Remove
                        </button>
                      </>
                    )}
                    {a.primary && <span style={{ fontSize:11, color:G.muted }}>Default</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* Add account form */}
            {showNewAcc && (
              <AddAccountForm
                onClose={() => setShowNewAcc(false)}
                onAdd={(a) => { setAccounts(prev => [...prev, { ...a, id:`ACC-00${prev.length + 1}`, primary:false }]); setShowNewAcc(false); }}
              />
            )}

            {/* Payout history */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
              <div style={{ padding:"16px 20px", borderBottom:`1px solid #f3f4f6` }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.navy }}>Payout History</p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 110px 120px 100px", padding:"10px 20px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                {["Request ID","Amount / Account","Status","Arrival",""].map(h => (
                  <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
                ))}
              </div>
              {PAYOUTS.map((p, i) => {
                const ps = STATUS_STYLE[p.status] || STATUS_STYLE.processing;
                return (
                  <div key={p.id}
                    style={{ display:"grid", gridTemplateColumns:"1fr 1fr 110px 120px 100px", padding:"14px 20px", borderBottom:i < PAYOUTS.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center", transition:"background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <div>
                      <p style={{ fontSize:12, fontWeight:600, color:G.text }}>{p.id}</p>
                      <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{p.date}</p>
                    </div>
                    <div>
                      <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{fmt(p.amount)}</p>
                      <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{p.account}</p>
                    </div>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:99, background:ps.bg, color:ps.text, width:"fit-content" }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:ps.dot }} />
                      {ps.label}
                    </span>
                    <p style={{ fontSize:12, color:G.sub }}>{p.arrival || "—"}</p>
                    <div>
                      {p.status === "failed" && (
                        <div>
                          <p style={{ fontSize:11, color:G.red, marginBottom:4 }}>{p.note}</p>
                          <button style={{ fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:6, padding:"3px 8px", cursor:"pointer", fontFamily:FONT }}>Retry</button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* ── Right panel — Withdraw form ── */}
          <div>
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden", position:"sticky", top:72 }}>

              {/* Navy-blue gradient header */}
              <div style={{ background:G.grad, padding:"20px 22px" }}>
                <p style={{ fontSize:16, fontWeight:800, color:G.white, marginBottom:4 }}>Request Payout</p>
                <p style={{ fontSize:12, color:"rgba(255,255,255,0.45)" }}>Funds arrive in 2–3 business days</p>
                <div style={{ marginTop:16, background:"rgba(255,255,255,0.10)", borderRadius:10, padding:"12px 16px" }}>
                  <p style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>Available Balance</p>
                  <p style={{ fontSize:28, fontWeight:800, color:"#bfdbfe", letterSpacing:"-0.5px" }}>{fmt(AVAILABLE_BALANCE)}</p>
                </div>
              </div>

              <div style={{ padding:"20px 22px", display:"flex", flexDirection:"column", gap:16 }}>

                {/* Amount input */}
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:G.sub, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                    Withdrawal Amount <span style={{ color:G.red }}>*</span>
                  </label>
                  <div style={{ position:"relative" }}>
                    <span style={{ position:"absolute", left:12, top:"50%", transform:"translateY(-50%)", fontSize:16, fontWeight:700, color:G.sub }}>₹</span>
                    <input
                      type="number" value={amount}
                      onChange={e => setAmount(e.target.value)}
                      placeholder="0" min={MIN_WITHDRAWAL} max={AVAILABLE_BALANCE}
                      style={{ width:"100%", paddingLeft:28, paddingRight:12, paddingTop:12, paddingBottom:12, fontSize:18, fontWeight:800, border:`1.5px solid ${amtNum > 0 && !isValid ? G.red : amtNum > 0 && isValid ? G.blue : G.border}`, borderRadius:10, outline:"none", color:G.text, boxSizing:"border-box", fontFamily:FONT, transition:"border-color 0.15s" }}
                    />
                  </div>
                  {amtNum > 0 && amtNum < MIN_WITHDRAWAL && <p style={{ fontSize:11, color:G.red, marginTop:5 }}>Minimum withdrawal is ₹{MIN_WITHDRAWAL.toLocaleString("en-IN")}</p>}
                  {amtNum > AVAILABLE_BALANCE && <p style={{ fontSize:11, color:G.red, marginTop:5 }}>Amount exceeds available balance</p>}
                  {isValid && <p style={{ fontSize:11, color:G.navy, marginTop:5, fontWeight:600 }}>✓ Valid amount</p>}

                  {/* Quick pick */}
                  <div style={{ display:"flex", gap:6, marginTop:8 }}>
                    {[50000, 100000, AVAILABLE_BALANCE].map(v => (
                      <button key={v} onClick={() => setAmount(String(v))}
                        style={{ flex:1, padding:"6px", fontSize:11, fontWeight:700, borderRadius:7, border:`1.5px solid ${G.border}`, background:G.bg, color:G.sub, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = G.blue; e.currentTarget.style.color = G.navy; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = G.border; e.currentTarget.style.color = G.sub; }}>
                        {v === AVAILABLE_BALANCE ? "Max" : fmt(v)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Account selector */}
                <div>
                  <label style={{ fontSize:12, fontWeight:700, color:G.sub, display:"block", marginBottom:8, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                    Destination Account <span style={{ color:G.red }}>*</span>
                  </label>
                  <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                    {accounts.map(a => (
                      <div key={a.id} onClick={() => setSelAcc(a.id)}
                        style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:10, border:`1.5px solid ${selAcc === a.id ? G.blue : G.border}`, background:selAcc === a.id ? G.blueBg : G.white, cursor:"pointer", transition:"all 0.12s" }}>
                        <div style={{ width:18, height:18, borderRadius:"50%", border:`2px solid ${selAcc === a.id ? G.blue : G.border}`, background:selAcc === a.id ? G.blue : G.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, transition:"all 0.15s" }}>
                          {selAcc === a.id && <div style={{ width:6, height:6, borderRadius:"50%", background:G.white }} />}
                        </div>
                        <div style={{ flex:1 }}>
                          <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{a.nick}</p>
                          <p style={{ fontSize:11, color:G.muted }}>{a.bank} ••••{a.last4}</p>
                        </div>
                        {a.primary && <span style={{ fontSize:10, fontWeight:700, background:G.blueBg, color:G.navy, border:`1px solid ${G.blueBorder}`, padding:"2px 7px", borderRadius:99 }}>PRIMARY</span>}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Summary */}
                {isValid && (
                  <div style={{ background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:10, padding:"12px 14px" }}>
                    {[
                      ["You receive",  fmt(amtNum)],
                      ["Account",      accounts.find(a => a.id === selAcc)?.nick || "—"],
                      ["Arrival",      "2–3 business days"],
                      ["Transfer fee", "₹0 (Free)"],
                    ].map(([k, v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                        <span style={{ fontSize:12, color:G.sub }}>{k}</span>
                        <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{v}</span>
                      </div>
                    ))}
                  </div>
                )}

                <button onClick={handleWithdraw} disabled={!isValid}
                  style={{ background:isValid ? G.grad : "#e5e7eb", color:isValid ? G.white : G.muted, border:"none", borderRadius:10, padding:"13px", fontSize:14, fontWeight:700, cursor:isValid ? "pointer" : "not-allowed", fontFamily:FONT, transition:"background 0.15s" }}>
                  {isValid ? `Withdraw ${fmt(amtNum)} →` : "Enter valid amount"}
                </button>

                <p style={{ fontSize:11, color:G.muted, textAlign:"center", lineHeight:1.6 }}>
                  No withdrawal fee · Min ₹1,000 · KYC must be verified
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Add Account Form ── */
function AddAccountForm({ onClose, onAdd }) {
  const [f, setF] = useState({ nick:"", bank:"", accNum:"", ifsc:"", holder:"", type:"Savings" });
  const u  = (k, v) => setF(p => ({ ...p, [k]:v }));
  const ok = f.nick && f.bank && f.accNum && f.ifsc && f.holder;

  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
      <div style={{ background:G.grad, padding:"15px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
        <p style={{ fontSize:15, fontWeight:700, color:G.white, fontFamily:FONT }}>Add New Bank Account</p>
        <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"none", borderRadius:7, width:28, height:28, cursor:"pointer", color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
        </button>
      </div>
      <div style={{ padding:"18px 20px", display:"flex", flexDirection:"column", gap:12 }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <FRow label="Nickname"><input value={f.nick} onChange={e => u("nick", e.target.value)} placeholder="e.g. Primary HDFC" style={inp} /></FRow>
          <FRow label="Bank Name"><input value={f.bank} onChange={e => u("bank", e.target.value)} placeholder="e.g. HDFC Bank" style={inp} /></FRow>
        </div>
        <FRow label="Account Holder Name"><input value={f.holder} onChange={e => u("holder", e.target.value)} placeholder="As per bank records" style={inp} /></FRow>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
          <FRow label="Account Number"><input value={f.accNum} onChange={e => u("accNum", e.target.value)} placeholder="••••••••••" style={inp} /></FRow>
          <FRow label="IFSC Code"><input value={f.ifsc} onChange={e => u("ifsc", e.target.value)} placeholder="e.g. HDFC0001234" style={inp} /></FRow>
        </div>
        <FRow label="Account Type">
          <div style={{ display:"flex", gap:8 }}>
            {["Savings","Current"].map(t => (
              <button key={t} onClick={() => u("type", t)}
                style={{ flex:1, padding:"8px", fontSize:12, fontWeight:700, borderRadius:8, border:`1.5px solid ${f.type === t ? G.blue : G.border}`, background:f.type === t ? G.blueBg : G.white, color:f.type === t ? G.navy : G.sub, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                {t}
              </button>
            ))}
          </div>
        </FRow>
        <div style={{ display:"flex", gap:8, marginTop:4 }}>
          <button onClick={onClose}
            style={{ flex:1, padding:"10px", fontSize:13, fontWeight:600, border:`1px solid ${G.border}`, background:G.white, color:G.sub, borderRadius:9, cursor:"pointer", fontFamily:FONT }}>
            Cancel
          </button>
          <button onClick={() => ok && onAdd({ ...f, last4:f.accNum.slice(-4) })} disabled={!ok}
            style={{ flex:1, padding:"10px", fontSize:13, fontWeight:700, border:"none", background:ok ? G.grad : "#e5e7eb", color:ok ? G.white : G.muted, borderRadius:9, cursor:ok ? "pointer" : "not-allowed", fontFamily:FONT }}>
            Save Account
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Primitives ── */
function FRow({ label, children }) {
  return (
    <div>
      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>{label}</label>
      {children}
    </div>
  );
}

function Navbar({ page }) {
  return (
    <nav style={{ height:56, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block"}} />
      <div style={{ width:1, height:20, background:G.border, marginLeft:4 }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.navy, fontWeight:600 }}>{page}</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/></svg>
        <span style={{ fontSize:11, color:G.navy, fontWeight:700 }}>Agency Admin only</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.white, marginLeft:8, fontFamily:FONT }}>
        RK
      </div>
    </nav>
  );
}