import { useState } from "react";
import { FiCheck, FiArrowUpRight, FiZap } from "react-icons/fi";

const stepLabels = [
  "Account","Verify","Type","Profile","Skills",
  "Portfolio","History","Rates","KYC","Plan","Payment","Trust","Go Live"
];

const PLANS = {
  monthly: [
    { id:"starter-m", name:"Starter", price:2500,  period:"month",    projects:2,  budget:"₹40,000",   proposals:10, popular:false },
    { id:"growth-m",  name:"Growth",  price:5000,  period:"month",    projects:5,  budget:"₹70,000",   proposals:20, popular:true  },
    { id:"pro-m",     name:"Pro",     price:7500,  period:"month",    projects:8,  budget:"₹1,00,000", proposals:40, popular:false },
  ],
  halfYearly: [
    { id:"starter-h", name:"Starter", price:18000, period:"6 months", projects:4,  budget:"₹75,000",   proposals:20, popular:false },
    { id:"growth-h",  name:"Growth",  price:24000, period:"6 months", projects:8,  budget:"₹1,50,000", proposals:35, popular:true  },
    { id:"pro-h",     name:"Pro",     price:35000, period:"6 months", projects:15, budget:"Unlimited",  proposals:60, popular:false },
  ],
  yearly: [
    { id:"starter-y", name:"Starter", price:25000, period:"year",     projects:4,  budget:"₹75,000",   proposals:20, popular:false },
    { id:"growth-y",  name:"Growth",  price:36000, period:"year",     projects:10, budget:"₹3,00,000", proposals:40, popular:true  },
    { id:"pro-y",     name:"Pro",     price:50000, period:"year",     projects:15, budget:"Unlimited",  proposals:60, popular:false },
  ],
};

const BILLING_LABELS = { monthly:"Monthly", halfYearly:"Half Yearly", yearly:"Yearly" };
const SAVINGS = { monthly:null, halfYearly:"Save ~20%", yearly:"Save ~33%" };
const fmt = (n) => `₹${Number(n).toLocaleString("en-IN")}`;

const PlanCard = ({ plan, selected, onSelect, billing }) => {
  const perMonth = billing === "monthly" ? plan.price
    : billing === "halfYearly" ? Math.round(plan.price / 6)
    : Math.round(plan.price / 12);

  return (
    <div
      onClick={() => onSelect(plan.id)}
      className="wbl-plan-card"
      style={{
        flex: "1 1 160px",
        minWidth: 0,
        position: "relative",
        cursor: "pointer",
        borderRadius: 16,
        padding: "22px 18px",
        border: selected ? "2px solid #1B72C0" : plan.popular ? "2px solid #BFDBFE" : "2px solid #E5E7EB",
        background: selected ? "linear-gradient(145deg,#0D2855 0%,#1B72C0 100%)" : "#FFFFFF",
        boxShadow: selected ? "0 8px 28px rgba(13,40,85,0.22)" : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all .2s",
      }}
    >
      {(plan.popular && !selected) && (
        <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:"#6FDA44", color:"#0D2855", fontSize:9, fontWeight:700, padding:"3px 12px", borderRadius:100, whiteSpace:"nowrap", letterSpacing:0.6 }}>
          MOST POPULAR
        </div>
      )}
      {selected && (
        <div style={{ position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)", background:"#6FDA44", color:"#0D2855", fontSize:9, fontWeight:700, padding:"3px 12px", borderRadius:100, whiteSpace:"nowrap", letterSpacing:0.6 }}>
          ✓ SELECTED
        </div>
      )}

      <div style={{ fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase", color: selected ? "rgba(255,255,255,0.65)" : "#6B7280", marginBottom:4 }}>
        {plan.name}
      </div>
      <div style={{ fontSize:"clamp(20px,3vw,26px)", fontWeight:800, color: selected ? "#FFFFFF" : "#0D2855", fontFamily:"'Montserrat',sans-serif", marginBottom:2 }}>
        {fmt(plan.price)}
      </div>
      <div style={{ fontSize:10, color: selected ? "rgba(255,255,255,0.5)" : "#9CA3AF", marginBottom:16 }}>
        {billing === "monthly" ? "per month" : `per ${plan.period} · ${fmt(perMonth)}/mo`}
      </div>

      {[
        `Up to ${plan.projects} projects`,
        `Max budget: ${plan.budget}`,
        `${plan.proposals} proposals/mo`,
      ].map((label) => (
        <div key={label} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
          <div style={{ width:16, height:16, borderRadius:"50%", flexShrink:0, background: selected ? "rgba(111,218,68,0.25)" : "#DCFCE7", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <FiCheck size={8} color={selected ? "#6FDA44" : "#2A6020"} strokeWidth={3} />
          </div>
          <span style={{ fontSize:"clamp(10px,1.5vw,11.5px)", color: selected ? "rgba(255,255,255,0.82)" : "#374151" }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

export default function Step10_PlanSelect({ onNext, onBack, currentStep = 10, totalSteps = 13 }) {
  const [billing, setBilling]     = useState("monthly");
  const [selectedId, setSelectedId] = useState("growth-m");
  const plans = PLANS[billing];
  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);

  const handleBilling = (b) => {
    const suffix = b === "monthly" ? "m" : b === "halfYearly" ? "h" : "y";
    const currentName = selectedId.split("-")[0];
    setBilling(b);
    setSelectedId(`${currentName}-${suffix}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        * { font-family: 'Poppins', sans-serif; }

        .wbl-plan-card { transition: all .2s; }
        .wbl-plan-card:hover { transform: translateY(-2px); }

        .wbl-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg,#0D2855 0%,#1B72C0 100%);
          color: #fff; border: none; cursor: pointer; font-weight: 600;
          border-radius: 12px; padding: 13px 32px; font-size: 15px;
          box-shadow: 0 3px 18px rgba(13,40,85,0.28); transition: all .2s;
          font-family: 'Poppins',sans-serif; white-space: nowrap;
        }
        .wbl-btn-primary:hover { opacity: .9; transform: translateY(-1px); }
        .wbl-btn-primary:disabled { opacity: .5; cursor: not-allowed; transform: none; }

        .wbl-btn-back {
          display: inline-flex; align-items: center; gap: 6px;
          background: #FFFFFF; color: #6B7280; border: 1.5px solid #E5E7EB;
          cursor: pointer; font-weight: 500; border-radius: 12px;
          padding: 13px 24px; font-size: 14px; transition: all .2s;
          font-family: 'Poppins',sans-serif;
        }
        .wbl-btn-back:hover { border-color: #1B72C0; color: #0D2855; }

        .billing-pill {
          padding: 7px 16px; border-radius: 100px; font-size: 12px;
          font-family: 'Poppins',sans-serif; font-weight: 500;
          cursor: pointer; border: 1.5px solid transparent; transition: all .18s;
          display: flex; align-items: center; gap: 5px;
        }
        .billing-pill.active { background: #EFF6FF; color: #0D2855; border-color: #BFDBFE; font-weight: 600; }
        .billing-pill.inactive { background: transparent; color: #9CA3AF; }
        .billing-pill.inactive:hover { color: #1B72C0; }

        /* Step dots */
        .wbl-step-active { border-color: #1B72C0 !important; color: #1B72C0 !important; }
        .wbl-step-done   { background: linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color: transparent !important; color: #fff !important; }

        /* ══ RESPONSIVE ══ */

        /* Progress strip: hide step labels on small screens */
        .plan-step-lbl { display: block; }
        @media (max-width: 640px) { .plan-step-lbl { display: none; } }

        /* Main two-column layout */
        .plan-layout {
          display: flex;
          gap: 24px;
          flex-wrap: wrap;
          align-items: flex-start;
        }
        .plan-main   { flex: 1 1 460px; min-width: 0; }
        .plan-sidebar { width: 240px; flex-shrink: 0; }

        /* Plan cards: stay flex-row but allow wrap */
        .plan-cards-row { display: flex; gap: 12px; flex-wrap: wrap; }

        /* Billing toggle: allow wrap on very small screens */
        .billing-toggle { display: flex; align-items: center; gap: 2px; background: #F3F4F6; border-radius: 100px; padding: 3px; width: fit-content; flex-wrap: wrap; }

        /* Nav buttons */
        .plan-nav-btns { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 12px; }

        @media (max-width: 900px) {
          .plan-sidebar { width: 100%; position: static !important; }
          .plan-layout  { flex-direction: column; }
        }

        @media (max-width: 640px) {
          .plan-main-card  { padding: 20px 16px !important; border-radius: 16px !important; }
          .plan-progress   { padding: 12px 16px !important; }
          .plan-content    { padding: 20px 16px !important; }
          .billing-pill    { padding: 6px 10px !important; font-size: 11px !important; }
          .plan-cards-row  { gap: 8px; }
        }

        @media (max-width: 480px) {
          .plan-nav-btns .wbl-btn-primary { flex: 1; justify-content: center; }
          .plan-nav-btns .wbl-btn-back    { flex: 1; justify-content: center; }
          .wbl-btn-primary { padding: 12px 16px !important; font-size: 13px !important; }
          .wbl-btn-back    { padding: 12px 16px !important; font-size: 13px !important; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F8FAFC" }}>

        {/* Progress bar */}
        <div className="plan-progress" style={{ background:"#FFFFFF", borderBottom:"1px solid #E5E7EB", padding:"16px 24px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
              <span style={{ fontSize:13, fontWeight:700, color:"#1B72C0" }}>{percentComplete}% Complete</span>
            </div>

            {/* Step dots with connecting lines */}
            <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
              {/* Track */}
              <div style={{ position:"absolute", top:14, left:`calc(100% / ${stepLabels.length * 2})`, right:`calc(100% / ${stepLabels.length * 2})`, height:2, background:"#E5E7EB", zIndex:0, borderRadius:99 }}>
                <div style={{ position:"absolute", top:0, left:0, height:"100%", width:`${percentComplete}%`, background:"linear-gradient(90deg,#6FDA44,#1B72C0)", borderRadius:99, transition:"width .5s ease" }} />
              </div>

              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isDone   = stepNum < currentStep;
                const isActive = stepNum === currentStep;
                return (
                  <div key={label} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, zIndex:1, position:"relative", flex:1, minWidth:0 }}>
                    <div
                      className={isDone ? "wbl-step-done" : isActive ? "wbl-step-active" : ""}
                      style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, border: isDone||isActive ? "none" : "2px solid #D1D5DB", background: isDone||isActive ? undefined : "#FFFFFF", color: isDone ? "#fff" : isActive ? "#1B72C0" : "#9CA3AF", flexShrink:0 }}
                    >
                      {isDone ? "✓" : stepNum}
                    </div>
                    <span className="plan-step-lbl" style={{ fontSize:9, color: isActive?"#1B72C0":isDone?"#6B7280":"#9CA3AF", fontWeight: isActive?700:400, whiteSpace:"nowrap", textAlign:"center", overflow:"hidden", textOverflow:"ellipsis", width:"100%", paddingLeft:2, paddingRight:2 }}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="plan-content" style={{ maxWidth:900, margin:"0 auto", padding:"32px 24px" }}>
          <div className="plan-layout">

            {/* Left panel */}
            <div className="plan-main">
              <div className="plan-main-card" style={{ background:"#FFFFFF", borderRadius:20, padding:"32px 28px", border:"1px solid #E5E7EB", boxShadow:"0 2px 12px rgba(0,0,0,0.04)" }}>

                {/* Badge */}
                <div style={{ display:"inline-flex", alignItems:"center", gap:6, background:"#EFF6FF", border:"1px solid #DBEAFE", borderRadius:100, padding:"4px 12px", marginBottom:14 }}>
                  <FiZap size={10} color="#1B72C0" />
                  <span style={{ fontSize:10, fontWeight:700, color:"#1B72C0", letterSpacing:0.8, textTransform:"uppercase" }}>Choose Your Plan</span>
                </div>

                <h2 style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:"clamp(18px,4vw,24px)", color:"#0D2855", marginBottom:6 }}>
                  Pick a Plan to Get Started
                </h2>
                <p style={{ fontSize:13, color:"#6B7280", marginBottom:24 }}>Choose what fits your workload. You can upgrade anytime.</p>

                {/* Billing toggle */}
                <div className="billing-toggle" style={{ marginBottom:28 }}>
                  {["monthly","halfYearly","yearly"].map((b) => (
                    <button key={b} className={`billing-pill ${billing===b?"active":"inactive"}`} onClick={() => handleBilling(b)}>
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
                <div className="plan-cards-row">
                  {plans.map((plan) => (
                    <PlanCard key={plan.id} plan={plan} billing={billing} selected={selectedId===plan.id} onSelect={setSelectedId} />
                  ))}
                </div>

                {/* Notice */}
                <div style={{ marginTop:20, padding:"12px 16px", borderRadius:12, background:"#FFFBEB", border:"1px solid #FDE68A", display:"flex", alignItems:"flex-start", gap:8 }}>
                  <span style={{ fontSize:14, flexShrink:0 }}>💡</span>
                  <p style={{ fontSize:12, color:"#92400E", margin:0 }}>
                    Your plan activates after Go Live. You won't be charged until your profile is approved.
                  </p>
                </div>

                {/* Navigation */}
                <div className="plan-nav-btns" style={{ marginTop:28 }}>
                  <button className="wbl-btn-back" onClick={onBack}>← Back</button>
                  <button className="wbl-btn-primary" onClick={onNext} disabled={!selectedId}>
                    Continue to Payment <FiArrowUpRight size={14} />
                  </button>
                </div>
              </div>
            </div>

            {/* Right panel — AI Insights */}
            <div className="plan-sidebar">
              <div style={{ background:"#FFFFFF", borderRadius:16, padding:"20px", border:"1px solid #E5E7EB", boxShadow:"0 2px 8px rgba(0,0,0,0.04)", position:"sticky", top:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <span style={{ fontSize:16 }}>✨</span>
                  <span style={{ fontSize:13, fontWeight:700, color:"#0D2855" }}>AI Insights</span>
                </div>

                <div style={{ background:"#F0FDF4", border:"1px solid #D1FAE5", borderRadius:10, padding:"10px 12px", marginBottom:10, display:"flex", alignItems:"flex-start", gap:8 }}>
                  <span style={{ fontSize:14, flexShrink:0 }}>✅</span>
                  <p style={{ fontSize:11.5, color:"#065F46", margin:0 }}>Growth plan is best for new freelancers — fits most project budgets.</p>
                </div>
                <div style={{ background:"#EFF6FF", border:"1px solid #DBEAFE", borderRadius:10, padding:"10px 12px", marginBottom:10, display:"flex", alignItems:"flex-start", gap:8 }}>
                  <span style={{ fontSize:14, flexShrink:0 }}>✨</span>
                  <p style={{ fontSize:11.5, color:"#1E40AF", margin:0 }}>Yearly plans save up to 33% and boost your profile visibility.</p>
                </div>

                <div style={{ background:"#F9FAFB", border:"1px solid #E5E7EB", borderRadius:10, padding:"12px" }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8 }}>Plan summary</p>
                  {(() => {
                    const sel = Object.values(PLANS).flat().find(p => p.id === selectedId);
                    if (!sel) return null;
                    return [["Plan",sel.name],["Billing",BILLING_LABELS[billing]],["Projects",`Up to ${sel.projects}`],["Proposals",`${sel.proposals}/mo`]].map(([k,v]) => (
                      <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}>
                        <span style={{ fontSize:11, color:"#6B7280" }}>{k}</span>
                        <span style={{ fontSize:11, fontWeight:600, color:"#0D2855" }}>{v}</span>
                      </div>
                    ));
                  })()}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}