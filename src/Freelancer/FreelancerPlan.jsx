import { useState } from "react";
import { FiCheck, FiArrowUpRight, FiZap } from "react-icons/fi";
import { BsShieldCheck } from "react-icons/bs";

/* ─────────────────────────────────────
   FreelancerPlan.jsx
   Route: /freelancer/plan
   Shows current plan + upgrade options
   + extra proposals add-ons
   ───────────────────────────────────── */

const G = {
  navy:   "#0D2855",
  blue:   "#1B72C0",
  green:  "#6FDA44",
  border: "#DBEAFE",
  bg:     "#F8FAFC",
  white:  "#FFFFFF",
};

const PLANS = {
  monthly: [
    { id:"starter-m", name:"Starter", price:2500,  projects:2,  budget:"₹40,000",  proposals:10, popular:false },
    { id:"growth-m",  name:"Growth",  price:5000,  projects:5,  budget:"₹70,000",  proposals:20, popular:true  },
    { id:"pro-m",     name:"Pro",     price:7500,  projects:8,  budget:"₹1,00,000",proposals:40, popular:false },
  ],
  halfYearly: [
    { id:"starter-h", name:"Starter", price:18000, projects:4,  budget:"₹75,000",  proposals:20, popular:false },
    { id:"growth-h",  name:"Growth",  price:24000, projects:8,  budget:"₹1,50,000",proposals:35, popular:true  },
    { id:"pro-h",     name:"Pro",     price:35000, projects:15, budget:"Unlimited", proposals:60, popular:false },
  ],
  yearly: [
    { id:"starter-y", name:"Starter", price:25000, projects:4,  budget:"₹75,000",  proposals:20, popular:false },
    { id:"growth-y",  name:"Growth",  price:36000, projects:10, budget:"₹3,00,000",proposals:40, popular:true  },
    { id:"pro-y",     name:"Pro",     price:50000, projects:15, budget:"Unlimited", proposals:60, popular:false },
  ],
};

const BILLING_LABELS = { monthly:"Monthly", halfYearly:"Half Yearly", yearly:"Yearly" };
const SAVINGS = { monthly:null, halfYearly:"Save ~20%", yearly:"Save ~33%" };

const EXTRA_PROPOSALS = [
  { type:"Normal", qty:10, price:500,  altQty:30, altPrice:700,  color:G.blue,  bg:"#EFF6FF", border:"#BFDBFE",
    features:["Standard visibility","Basic bid support"] },
  { type:"Pro",    qty:10, price:2500, color:"#059669", bg:"#F0FDF4", border:"#D1FAE5",
    features:["Platform-preferred listing","60% project allocation chance"] },
  { type:"Elite",  qty:10, price:5000, color:G.navy,    bg:"#EFF6FF", border:"#BFDBFE",
    features:["Direct internal team referral","90% project allocation chance"] },
];

const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

// ── Current plan mock (in real app this comes from API) ──────────────────────
const CURRENT_PLAN = { name:"Growth", billing:"Monthly", price:5000, projects:5, budget:"₹70,000", proposals:20, renewsOn:"May 6, 2026" };

export default function FreelancerPlan() {
  const [billing, setBilling]         = useState("monthly");
  const [selectedId, setSelectedId]   = useState("growth-m");
  const [showUpgrade, setShowUpgrade] = useState(false);
  const plans = PLANS[billing];

  const handleBilling = (b) => {
    const suffix = b === "monthly" ? "m" : b === "halfYearly" ? "h" : "y";
    const name = selectedId.split("-")[0];
    setBilling(b);
    setSelectedId(`${name}-${suffix}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800&family=Poppins:wght@400;500;600;700&display=swap');
        .plan-card-hover { transition: all .2s; cursor: pointer; }
        .plan-card-hover:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(27,114,192,0.14) !important; }
        .billing-pill {
          padding: 7px 15px; border-radius: 100px; font-size: 12px;
          font-family: 'Poppins',sans-serif; font-weight: 500;
          cursor: pointer; border: 1.5px solid transparent; transition: all .18s;
          display: flex; align-items: center; gap: 5px; background: transparent; color: #9CA3AF;
        }
        .billing-pill.active { background: #EFF6FF; color: #0D2855; border-color: #BFDBFE; font-weight: 600; }
        .billing-pill:hover:not(.active) { color: #1B72C0; }
        .extra-card { transition: all .2s; }
        .extra-card:hover { transform: translateY(-2px); box-shadow: 0 6px 20px rgba(0,0,0,0.08) !important; }
        .wbl-upgrade-btn {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#0D2855,#1B72C0); color: #fff;
          border: none; cursor: pointer; font-weight: 600; border-radius: 12px;
          padding: 12px 24px; font-size: 14px; font-family: 'Poppins',sans-serif;
          box-shadow: 0 3px 16px rgba(13,40,85,0.25); transition: all .2s;
        }
        .wbl-upgrade-btn:hover { opacity: .9; transform: translateY(-1px); }
        .wbl-outline-btn {
          display: inline-flex; align-items: center; gap: 6px;
          background: #fff; color: #1B72C0; border: 1.5px solid #BFDBFE;
          cursor: pointer; font-weight: 600; border-radius: 12px;
          padding: 11px 20px; font-size: 13px; font-family: 'Poppins',sans-serif; transition: all .2s;
        }
        .wbl-outline-btn:hover { border-color: #1B72C0; background: #EFF6FF; }
      `}</style>

      <div style={{ padding:"28px 28px", background:G.bg, minHeight:"100%", fontFamily:"'Poppins',sans-serif" }}>
        <div style={{ maxWidth:900, margin:"0 auto" }}>

          {/* ── Current Plan Card ── */}
          <div style={{
            background:"linear-gradient(135deg,#0D2855 0%,#1B72C0 100%)",
            borderRadius:20, padding:"28px 32px", marginBottom:28,
            boxShadow:"0 6px 28px rgba(13,40,85,0.22)",
            display:"flex", flexWrap:"wrap", alignItems:"center", gap:20,
          }}>
            <div style={{ flex:1, minWidth:200 }}>
              <div style={{
                display:"inline-flex", alignItems:"center", gap:5,
                background:"rgba(111,218,68,0.18)", borderRadius:100,
                padding:"3px 12px", marginBottom:12,
              }}>
                <span style={{ width:6, height:6, borderRadius:"50%", background:G.green, display:"inline-block" }} />
                <span style={{ fontSize:10, fontWeight:700, color:G.green, letterSpacing:0.8, textTransform:"uppercase" }}>
                  Active Plan
                </span>
              </div>
              <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:26, color:"#fff", marginBottom:4 }}>
                {CURRENT_PLAN.name} — {CURRENT_PLAN.billing}
              </h2>
              <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginBottom:16 }}>
                Renews on {CURRENT_PLAN.renewsOn}
              </p>
              <div style={{ display:"flex", flexWrap:"wrap", gap:10 }}>
                {[
                  `Up to ${CURRENT_PLAN.projects} projects`,
                  `Max ${CURRENT_PLAN.budget}`,
                  `${CURRENT_PLAN.proposals} proposals/mo`,
                ].map(t => (
                  <span key={t} style={{
                    fontSize:11.5, fontWeight:600, color:"rgba(255,255,255,0.85)",
                    background:"rgba(255,255,255,0.1)", borderRadius:100, padding:"4px 12px",
                    display:"flex", alignItems:"center", gap:5,
                  }}>
                    <FiCheck size={9} color={G.green} strokeWidth={3} /> {t}
                  </span>
                ))}
              </div>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:10, alignItems:"flex-end" }}>
              <div style={{ textAlign:"right" }}>
                <p style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:32, color:"#fff" }}>
                  {fmt(CURRENT_PLAN.price)}
                </p>
                <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)" }}>per month</p>
              </div>
              <button className="wbl-outline-btn" style={{ background:"rgba(255,255,255,0.08)", borderColor:"rgba(255,255,255,0.2)", color:"#fff" }}
                onClick={() => setShowUpgrade(u => !u)}>
                {showUpgrade ? "Hide Plans" : "Upgrade Plan"} <FiArrowUpRight size={13} />
              </button>
            </div>
          </div>

          {/* ── Plan Upgrade Section (toggle) ── */}
          {showUpgrade && (
            <div style={{
              background:G.white, borderRadius:20, padding:"28px",
              border:"1px solid #DBEAFE", marginBottom:28,
              boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
            }}>
              <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:17, color:G.navy, marginBottom:6 }}>
                Change Your Plan
              </h3>
              <p style={{ fontSize:13, color:"#6B7280", marginBottom:20 }}>
                Switching takes effect at your next billing cycle.
              </p>

              {/* Billing toggle */}
              <div style={{
                display:"flex", gap:2, background:"#F3F4F6", borderRadius:100,
                padding:"3px", width:"fit-content", marginBottom:24,
              }}>
                {["monthly","halfYearly","yearly"].map(b => (
                  <button key={b} className={`billing-pill ${billing===b?"active":""}`} onClick={() => handleBilling(b)}>
                    {BILLING_LABELS[b]}
                    {SAVINGS[b] && (
                      <span style={{ background:"#DCFCE7", color:"#2A6020", fontSize:8, fontWeight:700, padding:"1px 6px", borderRadius:100 }}>
                        {SAVINGS[b]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Plan cards */}
              <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
                {plans.map(plan => {
                  const isCurrent = plan.name === CURRENT_PLAN.name && billing === "monthly";
                  const isSelected = selectedId === plan.id;
                  return (
                    <div
                      key={plan.id}
                      className="plan-card-hover"
                      onClick={() => setSelectedId(plan.id)}
                      style={{
                        flex:"1 1 200px", minWidth:0, position:"relative",
                        borderRadius:16, padding:"20px 16px",
                        border: isSelected ? `2px solid ${G.blue}` : isCurrent ? `2px solid ${G.green}` : "2px solid #E5E7EB",
                        background: isSelected ? "linear-gradient(145deg,#0D2855,#1B72C0)" : G.white,
                        boxShadow: isSelected ? "0 6px 22px rgba(13,40,85,0.2)" : "0 1px 6px rgba(0,0,0,0.04)",
                      }}
                    >
                      {plan.popular && !isSelected && (
                        <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:G.green, color:G.navy, fontSize:9, fontWeight:700, padding:"2px 12px", borderRadius:100, whiteSpace:"nowrap" }}>
                          MOST POPULAR
                        </div>
                      )}
                      {isCurrent && (
                        <div style={{ position:"absolute", top:-10, left:"50%", transform:"translateX(-50%)", background:"#E5E7EB", color:"#374151", fontSize:9, fontWeight:700, padding:"2px 12px", borderRadius:100, whiteSpace:"nowrap" }}>
                          CURRENT
                        </div>
                      )}
                      <div style={{ fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", color: isSelected?"rgba(255,255,255,0.6)":"#6B7280", marginBottom:4 }}>
                        {plan.name}
                      </div>
                      <div style={{ fontSize:24, fontWeight:800, fontFamily:"'Montserrat',sans-serif", color: isSelected?"#fff":G.navy, marginBottom:14 }}>
                        {fmt(plan.price)}
                      </div>
                      {[
                        `Up to ${plan.projects} projects`,
                        `Max budget: ${plan.budget}`,
                        `${plan.proposals} proposals/mo`,
                      ].map(f => (
                        <div key={f} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
                          <FiCheck size={9} color={isSelected?G.green:"#2A6020"} strokeWidth={3} />
                          <span style={{ fontSize:11.5, color: isSelected?"rgba(255,255,255,0.82)":"#374151" }}>{f}</span>
                        </div>
                      ))}
                    </div>
                  );
                })}
              </div>

              <div style={{ marginTop:20, display:"flex", justifyContent:"flex-end" }}>
                <button className="wbl-upgrade-btn">
                  Confirm Plan Change <FiArrowUpRight size={13} />
                </button>
              </div>
            </div>
          )}

          {/* ── Extra Proposals ── */}
          <div style={{
            background:G.white, borderRadius:20, padding:"28px",
            border:"1px solid #E5E7EB", marginBottom:24,
            boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6 }}>
              <div style={{ width:28, height:28, borderRadius:8, background:"#EFF6FF", border:"1px solid #DBEAFE", display:"flex", alignItems:"center", justifyContent:"center" }}>
                <FiZap size={13} color={G.blue} />
              </div>
              <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:16, color:G.navy, margin:0 }}>
                Buy Extra Proposals
              </h3>
            </div>
            <p style={{ fontSize:13, color:"#6B7280", marginBottom:20 }}>
              Need more bids this month? Top up instantly — no plan change needed.
            </p>

            <div style={{ display:"flex", gap:14, flexWrap:"wrap" }}>
              {EXTRA_PROPOSALS.map(ep => (
                <div
                  key={ep.type}
                  className="extra-card"
                  style={{
                    flex:"1 1 200px", minWidth:0,
                    background:ep.bg, border:`1px solid ${ep.border}`,
                    borderRadius:16, padding:"18px 20px",
                    boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
                  }}
                >
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12 }}>
                    <div>
                      <div style={{ fontSize:10, fontWeight:700, color:ep.color, letterSpacing:0.8, textTransform:"uppercase", marginBottom:2 }}>
                        {ep.type}
                      </div>
                      <div style={{ fontSize:20, fontWeight:800, color:G.navy, fontFamily:"'Montserrat',sans-serif" }}>
                        {ep.qty} proposals
                      </div>
                    </div>
                    <div style={{ background:ep.color, color:"#fff", fontSize:13, fontWeight:700, padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap" }}>
                      {fmt(ep.price)}
                    </div>
                  </div>
                  {ep.altQty && (
                    <p style={{ fontSize:11, color:"#6B7280", marginBottom:10 }}>
                      Also: {ep.altQty} for {fmt(ep.altPrice)}
                    </p>
                  )}
                  <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:16 }}>
                    {ep.features.map(f => (
                      <div key={f} style={{ display:"flex", alignItems:"flex-start", gap:6 }}>
                        <FiCheck size={10} color={ep.color} strokeWidth={3} style={{ marginTop:2, flexShrink:0 }} />
                        <span style={{ fontSize:11.5, color:"#374151" }}>{f}</span>
                      </div>
                    ))}
                  </div>
                  <button style={{
                    width:"100%", padding:"9px", borderRadius:10, border:`1.5px solid ${ep.border}`,
                    background:G.white, color:ep.color, fontWeight:700, fontSize:12,
                    fontFamily:"'Poppins',sans-serif", cursor:"pointer", transition:"all .18s",
                  }}>
                    Buy Now
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* ── Usage summary ── */}
          <div style={{
            background:G.white, borderRadius:20, padding:"24px 28px",
            border:"1px solid #E5E7EB",
            boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
          }}>
            <h3 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:700, fontSize:15, color:G.navy, marginBottom:16 }}>
              This Month's Usage
            </h3>
            <div style={{ display:"flex", flexWrap:"wrap", gap:16 }}>
              {[
                { label:"Proposals used",   used:8,  total:20, color:G.blue  },
                { label:"Active projects",  used:2,  total:5,  color:"#059669" },
                { label:"Proposals left",   used:12, total:20, color:G.navy  },
              ].map(({ label, used, total, color }) => (
                <div key={label} style={{ flex:"1 1 160px", minWidth:0 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                    <span style={{ fontSize:12, color:"#6B7280" }}>{label}</span>
                    <span style={{ fontSize:12, fontWeight:700, color }}>{used}/{total}</span>
                  </div>
                  <div style={{ height:6, background:"#F3F4F6", borderRadius:100, overflow:"hidden" }}>
                    <div style={{
                      height:"100%", borderRadius:100,
                      width:`${(used/total)*100}%`,
                      background: color,
                      transition:"width .4s ease",
                    }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}