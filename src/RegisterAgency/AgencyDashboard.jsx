import { useNavigate } from "react-router-dom";

(() => {
  if (document.getElementById("wl-dash-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-dash-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#22c55e",  greenDark:   "#16a34a",
  greenBg:     "#f0fdf4",  greenBorder: "#bbf7d0",
  text:        "#111827",  sub:         "#6b7280",
  muted:       "#9ca3af",  border:      "#e5e7eb",
  bg:          "#f9fafb",  white:       "#ffffff",
  red:         "#ef4444",  yellow:      "#f59e0b",
  yellowBg:    "#fffbeb",  blue:        "#3b82f6",
  blueBg:      "#eff6ff",  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const STATS = [
  { icon: "💼", label: "Active Projects",   value: "2",      sub: "+1 this month",     color: G.blue,      bg: G.blueBg   },
  { icon: "📨", label: "Open Proposals",    value: "7",      sub: "3 under review",    color: G.purple,    bg: G.purpleBg },
  { icon: "💰", label: "Available Balance", value: "₹1.88L", sub: "Ready to withdraw", color: G.greenDark, bg: G.greenBg  },
  { icon: "🌟", label: "Avg Rating",         value: "4.7★",   sub: "6 reviews total",   color: G.yellow,    bg: G.yellowBg },
];
const PROJECTS = [
  { id:1, name:"Food Delivery App",   client:"ByteEats Co.", progress:65, risk:"MEDIUM", riskColor:"#f59e0b", riskBg:"#fffbeb",  riskBorder:"#fde68a",     budget:"$42,000", due:"May 30, 2026" },
  { id:2, name:"E-commerce Platform", client:"GlobalShop",   progress:30, risk:"LOW",    riskColor:G.greenDark, riskBg:G.greenBg, riskBorder:G.greenBorder, budget:"$28,000", due:"Jun 15, 2026" },
];
const PROPOSALS = [
  { id:"PRO-001", client:"FoodRush Technologies", title:"Restaurant Dashboard",           amount:"₹1,85,000", stage:"negotiation",  stageColor:"#f97316", stageBg:"#fff7ed" },
  { id:"PRO-006", client:"FinSmart Solutions",    title:"Investment Portfolio Tracker",   amount:"₹2,90,000", stage:"under_review", stageColor:"#92400e", stageBg:"#fef3c7" },
  { id:"PRO-002", client:"HealthFirst Clinic",    title:"Patient Appointment Mobile App", amount:"₹3,20,000", stage:"sent",         stageColor:"#2563eb", stageBg:"#eff6ff" },
];
const TXN = [
  { id:"TXN-002", client:"TravelNest",         amount:"₹97,760", date:"Mar 12", status:"released" },
  { id:"TXN-003", client:"HealthFirst Clinic", amount:"₹75,200", date:"Mar 8",  status:"released" },
  { id:"TXN-004", client:"TravelNest",         amount:"₹56,400", date:"Mar 26", status:"pending"  },
];
const TEAM = [
  { name:"Raj Kumar", role:"Admin",     initial:"R", bg:"#dbeafe", color:"#1d4ed8", status:"available"  },
  { name:"Sara M.",   role:"Developer", initial:"S", bg:"#dbeafe", color:"#1d4ed8", status:"available"  },
  { name:"Dev Mike",  role:"Developer", initial:"D", bg:"#dbeafe", color:"#1d4ed8", status:"on_project" },
  { name:"Priya S.",  role:"Designer",  initial:"P", bg:"#ede9fe", color:"#6d28d9", status:"available"  },
  { name:"James L.",  role:"DevOps",    initial:"J", bg:"#f3f4f6", color:"#374151", status:"on_project" },
];
const KYC_STEPS = [
  { label:"Business Identity", status:"verified"     },
  { label:"Director Identity", status:"verified"     },
  { label:"Bank Verification", status:"verified"     },
  { label:"Business Address",  status:"under_review" },
  { label:"Final Review",      status:"pending"      },
];
const REVIEWS = [
  { client:"Vikram Singh", rating:5, text:"Outstanding e-commerce platform delivery!" },
  { client:"Neha Gupta",   rating:5, text:"Incredible team, delivered on time."       },
  { client:"Aditya Bose",  rating:4, text:"Strong technical skills, great architecture." },
];
const MONTHLY = [
  { month:"Oct", val:120000 }, { month:"Nov", val:85000  },
  { month:"Dec", val:210000 }, { month:"Jan", val:180000 },
  { month:"Feb", val:140000 }, { month:"Mar", val:244000 },
];

export default function AgencyDashboard() {
  const navigate = useNavigate();
  const maxBar   = Math.max(...MONTHLY.map(m => m.val));

  return (
    <div style={{ padding:"20px 24px 40px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>

      {/* ── STAT CARDS ── */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:14, marginBottom:20 }}>
        {STATS.map((s,i) => (
          <div key={i} style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"16px 18px", display:"flex", alignItems:"center", gap:14, boxShadow:"0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width:44, height:44, borderRadius:12, background:s.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, flexShrink:0 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize:20, fontWeight:800, color:s.color, margin:0, letterSpacing:"-0.4px" }}>{s.value}</p>
              <p style={{ fontSize:11, fontWeight:600, color:G.text, margin:"2px 0 1px" }}>{s.label}</p>
              <p style={{ fontSize:10, color:G.muted, margin:0 }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ROW 1: Projects + Revenue ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>

        {/* Active Projects */}
        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Active Projects</p>
              <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0" }}>Click to open ProjectStream</p>
            </div>
            <span style={{ fontSize:11, fontWeight:700, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"3px 10px", borderRadius:99 }}>2 Active</span>
          </div>
          {PROJECTS.map((p,i) => (
            <div key={p.id} onClick={() => navigate(`/agency/project/${p.id}`)}
              style={{ padding:"14px 18px", borderBottom:i<PROJECTS.length-1?`1px solid #f9fafb`:"none", cursor:"pointer", transition:"background 0.12s" }}
              onMouseEnter={e=>e.currentTarget.style.background=G.bg}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:8 }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{p.name}</p>
                  <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0" }}>{p.client} · {p.budget}</p>
                </div>
                <span style={{ fontSize:10, fontWeight:700, background:p.riskBg, color:p.riskColor, border:`1px solid ${p.riskBorder}`, padding:"2px 8px", borderRadius:99, flexShrink:0 }}>{p.risk} RISK</span>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <div style={{ flex:1, background:"#f3f4f6", borderRadius:99, height:5, overflow:"hidden" }}>
                  <div style={{ width:`${p.progress}%`, height:"100%", background:`linear-gradient(90deg,${G.green},#2563eb)`, borderRadius:99 }} />
                </div>
                <span style={{ fontSize:11, fontWeight:700, color:G.text, flexShrink:0 }}>{p.progress}%</span>
              </div>
              <p style={{ fontSize:10, color:G.muted, marginTop:5 }}>Due: {p.due}</p>
            </div>
          ))}
          <div style={{ padding:"12px 18px", background:G.bg, display:"flex", gap:8 }}>
            <button onClick={()=>navigate("/agency-channel-a")}
              style={{ flex:1, fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"7px", cursor:"pointer", fontFamily:FONT }}>
              💬 Client Stream (Ch A)
            </button>
            <button onClick={()=>navigate("/agency/channel2/1")}
              style={{ flex:1, fontSize:11, fontWeight:700, color:"#2563eb", background:G.blueBg, border:`1px solid #bfdbfe`, borderRadius:7, padding:"7px", cursor:"pointer", fontFamily:FONT }}>
              👥 Team Channel (Ch B)
            </button>
          </div>
        </div>

        {/* Revenue Chart */}
        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"16px 18px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Revenue Trend</p>
              <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0" }}>Last 6 months (gross)</p>
            </div>
            <button onClick={()=>navigate("/agency/earnings")}
              style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>
              Full Report →
            </button>
          </div>
          <div style={{ display:"flex", alignItems:"flex-end", gap:8, height:110 }}>
            {MONTHLY.map((m,i) => {
              const h=Math.round((m.val/maxBar)*88), isMax=m.val===maxBar;
              return (
                <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                  <p style={{ fontSize:9, fontWeight:700, color:isMax?G.greenDark:G.muted }}>₹{(m.val/1000).toFixed(0)}K</p>
                  <div style={{ width:"100%", height:h, borderRadius:"5px 5px 0 0", background:isMax?`linear-gradient(180deg,${G.green},${G.greenDark})`:`linear-gradient(180deg,${G.greenBorder},#86efac)` }} />
                  <p style={{ fontSize:9, color:G.sub, fontWeight:500 }}>{m.month}</p>
                </div>
              );
            })}
          </div>
          <div style={{ marginTop:14, padding:"10px 12px", background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>Available Balance</p>
              <p style={{ fontSize:18, fontWeight:800, color:G.green, margin:"2px 0 0", letterSpacing:"-0.4px" }}>₹1,87,960</p>
            </div>
            <button onClick={()=>navigate("/agency/withdrawals")}
              style={{ fontSize:11, fontWeight:700, background:G.green, color:G.white, border:"none", borderRadius:7, padding:"7px 14px", cursor:"pointer", fontFamily:FONT }}>
              Withdraw →
            </button>
          </div>
        </div>
      </div>

      {/* ── ROW 2: Proposals + Transactions ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:16 }}>

        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Recent Proposals</p>
            <button onClick={()=>navigate("/agency/proposals")} style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>View All</button>
          </div>
          {PROPOSALS.map((p,i) => (
            <div key={p.id} style={{ padding:"12px 18px", borderBottom:i<PROPOSALS.length-1?`1px solid #f9fafb`:"none", display:"flex", alignItems:"center", gap:12 }}
              onMouseEnter={e=>e.currentTarget.style.background=G.bg}
              onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.title}</p>
                <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0" }}>{p.client}</p>
              </div>
              <div style={{ textAlign:"right", flexShrink:0 }}>
                <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{p.amount}</p>
                <span style={{ fontSize:10, fontWeight:700, background:p.stageBg, color:p.stageColor, padding:"1px 7px", borderRadius:99, display:"inline-block", marginTop:3 }}>{p.stage.replace("_"," ")}</span>
              </div>
            </div>
          ))}
        </div>

        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Recent Transactions</p>
            <button onClick={()=>navigate("/agency/earnings")} style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>View All</button>
          </div>
          {TXN.map((t,i) => {
            const ok=t.status==="released";
            return (
              <div key={t.id} style={{ padding:"12px 18px", borderBottom:i<TXN.length-1?`1px solid #f9fafb`:"none", display:"flex", alignItems:"center", gap:12 }}
                onMouseEnter={e=>e.currentTarget.style.background=G.bg}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ width:32, height:32, borderRadius:9, background:ok?G.greenBg:G.yellowBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, flexShrink:0 }}>{ok?"✅":"⏳"}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:12, fontWeight:600, color:G.text, margin:0 }}>{t.client}</p>
                  <p style={{ fontSize:10, color:G.muted, margin:"1px 0 0" }}>{t.id} · {t.date}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:13, fontWeight:800, color:ok?G.greenDark:G.yellow, margin:0 }}>{t.amount}</p>
                  <p style={{ fontSize:10, color:G.muted, margin:"1px 0 0" }}>{ok?"Released":"Pending"}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── ROW 3: Team + Reviews + KYC ── */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:16 }}>

        {/* Team */}
        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Team ({TEAM.length})</p>
            <button onClick={()=>navigate("/invite-team")} style={{ fontSize:11, fontWeight:700, color:"#2563eb", background:G.blueBg, border:`1px solid #bfdbfe`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>+ Invite</button>
          </div>
          <div style={{ padding:"8px 0" }}>
            {TEAM.map((m,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"8px 18px" }}
                onMouseEnter={e=>e.currentTarget.style.background=G.bg}
                onMouseLeave={e=>e.currentTarget.style.background="transparent"}>
                <div style={{ width:30, height:30, borderRadius:"50%", background:m.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:m.color, flexShrink:0 }}>{m.initial}</div>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:12, fontWeight:600, color:G.text, margin:0 }}>{m.name}</p>
                  <p style={{ fontSize:10, color:G.muted, margin:0 }}>{m.role}</p>
                </div>
                <span style={{ width:7, height:7, borderRadius:"50%", background:m.status==="available"?G.green:G.blue, flexShrink:0 }} />
              </div>
            ))}
          </div>
        </div>

        {/* Reviews */}
        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Reviews</p>
              <p style={{ fontSize:11, color:G.muted, margin:"1px 0 0" }}>4.7★ avg · 6 total</p>
            </div>
            <button onClick={()=>navigate("/agency/reviews")} style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>View All</button>
          </div>
          <div style={{ padding:"8px 0" }}>
            {REVIEWS.map((r,i) => (
              <div key={i} style={{ padding:"9px 18px", borderBottom:i<REVIEWS.length-1?`1px solid #f9fafb`:"none" }}>
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:3 }}>
                  <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{r.client}</p>
                  <span style={{ fontSize:11, color:G.yellow }}>{"★".repeat(r.rating)}</span>
                </div>
                <p style={{ fontSize:11, color:G.sub, margin:0, lineHeight:1.4 }}>{r.text}</p>
              </div>
            ))}
          </div>
        </div>

        {/* KYC */}
        <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
          <div style={{ padding:"14px 18px 12px", borderBottom:`1px solid #f3f4f6`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>KYC Verification</p>
              <p style={{ fontSize:11, color:G.muted, margin:"1px 0 0" }}>4 of 5 steps done</p>
            </div>
            <button onClick={()=>navigate("/agency/kyc")} style={{ fontSize:11, fontWeight:700, color:"#92400e", background:G.yellowBg, border:`1px solid #fde68a`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>Continue →</button>
          </div>
          <div style={{ padding:"10px 18px" }}>
            <div style={{ marginBottom:12 }}>
              <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                <span style={{ fontSize:11, color:G.sub }}>Overall Progress</span>
                <span style={{ fontSize:11, fontWeight:700, color:G.greenDark }}>75%</span>
              </div>
              <div style={{ background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden" }}>
                <div style={{ width:"75%", height:"100%", background:`linear-gradient(90deg,${G.green},#86efac)`, borderRadius:99 }} />
              </div>
            </div>
            {KYC_STEPS.map((step,i) => {
              const v=step.status==="verified", r=step.status==="under_review";
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                  <div style={{ width:18, height:18, borderRadius:"50%", background:v?G.greenBg:r?G.yellowBg:"#f3f4f6", border:`1.5px solid ${v?G.green:r?G.yellow:G.border}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:v?G.greenDark:r?"#92400e":G.muted, flexShrink:0 }}>
                    {v?"✓":r?"🔍":i+1}
                  </div>
                  <p style={{ fontSize:11, color:v?G.text:G.muted, fontWeight:v?600:400, margin:0, flex:1 }}>{step.label}</p>
                  <span style={{ fontSize:9, fontWeight:700, color:v?G.greenDark:r?"#92400e":G.muted }}>{v?"✓":r?"Pending":"—"}</span>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}