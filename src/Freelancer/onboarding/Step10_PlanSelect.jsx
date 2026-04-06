import { useState } from "react";
import { FiCheck, FiArrowUpRight, FiZap } from "react-icons/fi";

/* ─────────────────────────────────────────────────────
   Weblance palette (matches rest of onboarding)
   Navy   : #0D2855
   Blue   : #1B72C0
   Green  : #6FDA44
   ───────────────────────────────────────────────────── */

const stepLabels = [
  "Account","Verify","Type","Profile","Skills",
  "Portfolio","History","Rates","KYC","Plan","Payment","Trust","Go Live"
];

// ── Plan data from Platform_Plans.xlsx (Freelancers sheet) ──────────────────

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

// ── Sub-components ────────────────────────────────────────────────────────────

const PlanCard = ({ plan, selected, onSelect, billing }) => {
  const perMonth = billing === "monthly" ? plan.price
    : billing === "halfYearly" ? Math.round(plan.price / 6)
    : Math.round(plan.price / 12);

  return (
    <div
      onClick={() => onSelect(plan.id)}
      style={{
        flex: "1 1 200px",
        minWidth: 0,
        position: "relative",
        cursor: "pointer",
        borderRadius: 16,
        padding: "22px 18px",
        border: selected
          ? "2px solid #1B72C0"
          : plan.popular
          ? "2px solid #BFDBFE"
          : "2px solid #E5E7EB",
        background: selected
          ? "linear-gradient(145deg,#0D2855 0%,#1B72C0 100%)"
          : "#FFFFFF",
        boxShadow: selected
          ? "0 8px 28px rgba(13,40,85,0.22)"
          : "0 2px 8px rgba(0,0,0,0.04)",
        transition: "all .2s",
      }}
    >
      {/* Popular badge */}
      {plan.popular && !selected && (
        <div style={{
          position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)",
          background:"#6FDA44", color:"#0D2855", fontSize:9, fontWeight:700,
          padding:"3px 12px", borderRadius:100, whiteSpace:"nowrap", letterSpacing:0.6,
          fontFamily:"'Poppins',sans-serif",
        }}>
          MOST POPULAR
        </div>
      )}

      {/* Selected badge */}
      {selected && (
        <div style={{
          position:"absolute", top:-11, left:"50%", transform:"translateX(-50%)",
          background:"#6FDA44", color:"#0D2855", fontSize:9, fontWeight:700,
          padding:"3px 12px", borderRadius:100, whiteSpace:"nowrap", letterSpacing:0.6,
          fontFamily:"'Poppins',sans-serif",
        }}>
          ✓ SELECTED
        </div>
      )}

      {/* Plan name */}
      <div style={{
        fontSize:10, fontWeight:700, letterSpacing:0.8, textTransform:"uppercase",
        color: selected ? "rgba(255,255,255,0.65)" : "#6B7280",
        fontFamily:"'Poppins',sans-serif", marginBottom:4,
      }}>
        {plan.name}
      </div>

      {/* Price */}
      <div style={{
        fontSize:26, fontWeight:800,
        color: selected ? "#FFFFFF" : "#0D2855",
        fontFamily:"'Montserrat',sans-serif", marginBottom:2,
      }}>
        {fmt(plan.price)}
      </div>
      <div style={{
        fontSize:10, color: selected ? "rgba(255,255,255,0.5)" : "#9CA3AF",
        marginBottom:16, fontFamily:"'Poppins',sans-serif",
      }}>
        {billing === "monthly" ? "per month"
          : `per ${plan.period} · ${fmt(perMonth)}/mo`}
      </div>

      {/* Features */}
      {[
        { label:`Up to ${plan.projects} projects` },
        { label:`Max budget: ${plan.budget}` },
        { label:`${plan.proposals} proposals/mo` },
      ].map(({ label }) => (
        <div key={label} style={{ display:"flex", alignItems:"center", gap:7, marginBottom:7 }}>
          <div style={{
            width:16, height:16, borderRadius:"50%", flexShrink:0,
            background: selected ? "rgba(111,218,68,0.25)" : "#DCFCE7",
            display:"flex", alignItems:"center", justifyContent:"center",
          }}>
            <FiCheck size={8} color={selected ? "#6FDA44" : "#2A6020"} strokeWidth={3} />
          </div>
          <span style={{
            fontSize:11.5, fontFamily:"'Poppins',sans-serif",
            color: selected ? "rgba(255,255,255,0.82)" : "#374151",
          }}>{label}</span>
        </div>
      ))}
    </div>
  );
};

// ── Main component ────────────────────────────────────────────────────────────

export default function Step10_PlanSelect({
  onNext,
  onBack,
  currentStep = 10,
  totalSteps = 13,
}) {
  const [billing, setBilling] = useState("monthly");
  const [selectedId, setSelectedId] = useState("growth-m");
  const plans = PLANS[billing];
  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);

  // Keep selection consistent when billing changes
  const handleBilling = (b) => {
    const suffix = b === "monthly" ? "m" : b === "halfYearly" ? "h" : "y";
    const currentName = selectedId.split("-")[0]; // starter/growth/pro
    setBilling(b);
    setSelectedId(`${currentName}-${suffix}`);
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@700;800;900&family=Poppins:wght@400;500;600;700&display=swap');
        .wbl-plan-card { transition: all .2s; }
        .wbl-plan-card:hover { transform: translateY(-2px); }
        .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
        .wbl-step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; color:#fff !important; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; gap:8px;
          background:linear-gradient(135deg,#0D2855 0%,#1B72C0 100%);
          color:#fff; border:none; cursor:pointer; font-weight:600;
          border-radius:12px; padding:13px 32px; font-size:15px;
          box-shadow:0 3px 18px rgba(13,40,85,0.28); transition:all .2s;
          font-family:'Poppins',sans-serif;
        }
        .wbl-btn-primary:hover { opacity:.9; transform:translateY(-1px); }
        .wbl-btn-back {
          display:inline-flex; align-items:center; gap:6px;
          background:#FFFFFF; color:#6B7280; border:1.5px solid #E5E7EB;
          cursor:pointer; font-weight:500; border-radius:12px;
          padding:13px 24px; font-size:14px; transition:all .2s;
          font-family:'Poppins',sans-serif;
        }
        .wbl-btn-back:hover { border-color:#1B72C0; color:#0D2855; }
        .billing-pill {
          padding:7px 16px; border-radius:100px; font-size:12px;
          font-family:'Poppins',sans-serif; font-weight:500;
          cursor:pointer; border:1.5px solid transparent; transition:all .18s;
          display:flex; align-items:center; gap:5px;
        }
        .billing-pill.active {
          background:#EFF6FF; color:#0D2855; border-color:#BFDBFE; font-weight:600;
        }
        .billing-pill.inactive { background:transparent; color:#9CA3AF; }
        .billing-pill.inactive:hover { color:#1B72C0; }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F8FAFC", fontFamily:"'Poppins',sans-serif" }}>

        {/* ── Progress bar ── */}
        <div style={{ background:"#FFFFFF", borderBottom:"1px solid #E5E7EB", padding:"16px 24px" }}>
          <div style={{ maxWidth:900, margin:"0 auto" }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:12 }}>
              <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>
                Step {currentStep} of {totalSteps}
              </span>
              <span style={{ fontSize:13, fontWeight:700, color:"#1B72C0" }}>
                {percentComplete}% Complete
              </span>
            </div>

            {/* Step dots */}
            <div style={{ display:"flex", alignItems:"center", gap:0, overflowX:"auto", paddingBottom:4 }}>
              {stepLabels.map((label, idx) => {
                const stepNum = idx + 1;
                const isDone = stepNum < currentStep;
                const isActive = stepNum === currentStep;
                return (
                  <div key={label} style={{ display:"flex", alignItems:"center", flexShrink:0 }}>
                    <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                      <div
                        className={isDone ? "wbl-step-done" : isActive ? "wbl-step-active" : ""}
                        style={{
                          width:30, height:30, borderRadius:"50%",
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:11, fontWeight:700,
                          border: isDone || isActive ? "none" : "2px solid #D1D5DB",
                          background: isDone ? undefined : isActive ? undefined : "#FFFFFF",
                          color: isDone ? "#fff" : isActive ? "#1B72C0" : "#9CA3AF",
                        }}
                      >
                        {isDone ? "✓" : stepNum}
                      </div>
                      <span style={{
                        fontSize:9, color: isActive ? "#1B72C0" : isDone ? "#6B7280" : "#9CA3AF",
                        fontWeight: isActive ? 700 : 400, whiteSpace:"nowrap",
                      }}>
                        {label}
                      </span>
                    </div>
                    {idx < stepLabels.length - 1 && (
                      <div style={{
                        width:20, height:2, margin:"0 2px", marginBottom:14,
                        background: isDone ? "#6FDA44" : "#E5E7EB",
                        flexShrink:0,
                      }} />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main content ── */}
        <div style={{ maxWidth:900, margin:"0 auto", padding:"32px 24px", display:"flex", gap:24, flexWrap:"wrap" }}>

          {/* Left panel */}
          <div style={{ flex:"1 1 500px", minWidth:0 }}>
            <div style={{
              background:"#FFFFFF", borderRadius:20, padding:"32px 28px",
              border:"1px solid #E5E7EB", boxShadow:"0 2px 12px rgba(0,0,0,0.04)",
            }}>

              {/* Badge */}
              <div style={{
                display:"inline-flex", alignItems:"center", gap:6,
                background:"#EFF6FF", border:"1px solid #DBEAFE",
                borderRadius:100, padding:"4px 12px", marginBottom:14,
              }}>
                <FiZap size={10} color="#1B72C0" />
                <span style={{ fontSize:10, fontWeight:700, color:"#1B72C0", letterSpacing:0.8, textTransform:"uppercase" }}>
                  Choose Your Plan
                </span>
              </div>

              <h2 style={{
                fontFamily:"'Montserrat',sans-serif", fontWeight:800, fontSize:24,
                color:"#0D2855", marginBottom:6,
              }}>
                Pick a Plan to Get Started
              </h2>
              <p style={{ fontSize:13, color:"#6B7280", marginBottom:24 }}>
                Choose what fits your workload. You can upgrade anytime.
              </p>

              {/* Billing toggle */}
              <div style={{
                display:"flex", alignItems:"center", gap:2,
                background:"#F3F4F6", borderRadius:100, padding:"3px",
                width:"fit-content", marginBottom:28,
              }}>
                {(["monthly","halfYearly","yearly"]).map((b) => (
                  <button
                    key={b}
                    className={`billing-pill ${billing === b ? "active" : "inactive"}`}
                    onClick={() => handleBilling(b)}
                  >
                    {BILLING_LABELS[b]}
                    {SAVINGS[b] && (
                      <span style={{
                        background:"#DCFCE7", color:"#2A6020", fontSize:8,
                        fontWeight:700, padding:"1px 6px", borderRadius:100,
                      }}>
                        {SAVINGS[b]}
                      </span>
                    )}
                  </button>
                ))}
              </div>

              {/* Plan cards */}
              <div style={{ display:"flex", gap:12, flexWrap:"wrap" }}>
                {plans.map((plan) => (
                  <PlanCard
                    key={plan.id}
                    plan={plan}
                    billing={billing}
                    selected={selectedId === plan.id}
                    onSelect={setSelectedId}
                  />
                ))}
              </div>

              {/* Notice */}
              <div style={{
                marginTop:20, padding:"12px 16px", borderRadius:12,
                background:"#FFFBEB", border:"1px solid #FDE68A",
                display:"flex", alignItems:"flex-start", gap:8,
              }}>
                <span style={{ fontSize:14 }}>💡</span>
                <p style={{ fontSize:12, color:"#92400E", margin:0 }}>
                  Your plan activates after Go Live. You won't be charged until your profile is approved.
                </p>
              </div>

              {/* Navigation buttons */}
              <div style={{ display:"flex", justifyContent:"space-between", marginTop:28, flexWrap:"wrap", gap:12 }}>
                <button className="wbl-btn-back" onClick={onBack}>
                  ← Back
                </button>
                <button
                  className="wbl-btn-primary"
                  onClick={onNext}
                  disabled={!selectedId}
                >
                  Continue to Payment <FiArrowUpRight size={14} />
                </button>
              </div>
            </div>
          </div>

          {/* Right panel — AI Insights */}
          <div style={{ width:240, flexShrink:0 }}>
            <div style={{
              background:"#FFFFFF", borderRadius:16, padding:"20px",
              border:"1px solid #E5E7EB", boxShadow:"0 2px 8px rgba(0,0,0,0.04)",
              position:"sticky", top:24,
            }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                <span style={{ fontSize:16 }}>✨</span>
                <span style={{ fontSize:13, fontWeight:700, color:"#0D2855" }}>AI Insights</span>
              </div>

              <div style={{
                background:"#F0FDF4", border:"1px solid #D1FAE5",
                borderRadius:10, padding:"10px 12px", marginBottom:10,
                display:"flex", alignItems:"flex-start", gap:8,
              }}>
                <span style={{ fontSize:14, flexShrink:0 }}>✅</span>
                <p style={{ fontSize:11.5, color:"#065F46", margin:0 }}>
                  Growth plan is best for new freelancers — fits most project budgets.
                </p>
              </div>

              <div style={{
                background:"#EFF6FF", border:"1px solid #DBEAFE",
                borderRadius:10, padding:"10px 12px", marginBottom:10,
                display:"flex", alignItems:"flex-start", gap:8,
              }}>
                <span style={{ fontSize:14, flexShrink:0 }}>✨</span>
                <p style={{ fontSize:11.5, color:"#1E40AF", margin:0 }}>
                  Yearly plans save up to 33% and boost your profile visibility.
                </p>
              </div>

              <div style={{
                background:"#F9FAFB", border:"1px solid #E5E7EB",
                borderRadius:10, padding:"12px",
              }}>
                <p style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8 }}>
                  Plan summary
                </p>
                {(() => {
                  const sel = Object.values(PLANS).flat().find(p => p.id === selectedId);
                  if (!sel) return null;
                  return [
                    ["Plan", sel.name],
                    ["Billing", BILLING_LABELS[billing]],
                    ["Projects", `Up to ${sel.projects}`],
                    ["Proposals", `${sel.proposals}/mo`],
                  ].map(([k, v]) => (
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
    </>
  );
}