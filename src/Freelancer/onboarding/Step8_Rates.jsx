import { useState, useRef, useEffect } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Plan", "Payment", "Trust", "Go Live"
];

const currencies      = ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "SGD"];
const currencySymbols = { USD:"$", EUR:"€", GBP:"£", INR:"₹", CAD:"CA$", AUD:"A$", SGD:"S$" };
const durationOptions = ["No minimum", "1 week", "2 weeks", "1 month", "3 months+"];

const marketRates = {
  "Full Stack Developer": { low:30, avg:65, high:120 },
  "Frontend Developer":   { low:25, avg:55, high:100 },
  "Backend Developer":    { low:30, avg:60, high:110 },
  "UI/UX Designer":       { low:25, avg:50, high:95  },
  "Data Scientist":       { low:35, avg:75, high:130 },
  "DevOps Engineer":      { low:40, avg:80, high:140 },
};
const ROLE   = "Full Stack Developer";
const market = marketRates[ROLE];

function Dropdown({ options, value, onChange, showCheck = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} style={{ position:"relative" }}>
      <button type="button" onClick={() => setOpen(o => !o)}
        style={{ display:"flex", alignItems:"center", gap:6, border:"1.5px solid #e5e7eb", background:"white", borderRadius:10, padding:"8px 12px", fontSize:13, fontWeight:700, color:"#374151", cursor:"pointer", minWidth:80, justifyContent:"space-between", transition:"all .15s" }}
        onMouseEnter={e => e.currentTarget.style.background="#f9fafb"}
        onMouseLeave={e => e.currentTarget.style.background="white"}>
        {value}
        <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition:"transform .2s" }}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div style={{ position:"absolute", right:0, top:"calc(100% + 4px)", background:"white", border:"1.5px solid #e5e7eb", borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,0.1)", zIndex:30, minWidth:120, overflow:"hidden" }}>
          {options.map(opt => (
            <button key={opt} type="button" onClick={() => { onChange(opt); setOpen(false); }}
              style={{ width:"100%", textAlign:"left", padding:"10px 14px", fontSize:13, display:"flex", alignItems:"center", gap:8, background: opt === value ? "#eff6ff" : "white", color: opt === value ? "#1B72C0" : "#374151", fontWeight: opt === value ? 700 : 500, cursor:"pointer", border:"none", transition:"background .1s" }}
              onMouseEnter={e => { if (opt !== value) e.currentTarget.style.background="#f0fdf4"; }}
              onMouseLeave={e => { e.currentTarget.style.background = opt === value ? "#eff6ff" : "white"; }}>
              {showCheck && (
                opt === value
                  ? <svg width="14" height="14" fill="none" stroke="#1B72C0" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                  : <span style={{ width:14, display:"inline-block" }}/>
              )}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Toggle({ value, onChange }) {
  return (
    <button type="button" onClick={() => onChange(!value)}
      style={{ position:"relative", width:48, height:26, borderRadius:99, border:"none", cursor:"pointer", flexShrink:0, transition:"background .2s",
        background: value ? "linear-gradient(135deg,#0D2855,#1B72C0)" : "#d1d5db" }}>
      <span style={{ position:"absolute", top:3, left: value ? 24 : 3, width:20, height:20, borderRadius:"50%", background:"white", boxShadow:"0 1px 4px rgba(0,0,0,0.2)", transition:"left .2s" }}/>
    </button>
  );
}

export default function Step8_Rates({ onNext, onBack, currentStep = 8, totalSteps = 13 }) {
  const [currency, setCurrency]       = useState("USD");
  const [hourlyRate, setHourlyRate]   = useState(65);
  const [minBudget, setMinBudget]     = useState("");
  const [duration, setDuration]       = useState("No minimum");
  const [showExact, setShowExact]     = useState(true);
  const [allowOffers, setAllowOffers] = useState(true);

  const sym = currencySymbols[currency] || "$";

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  const sliderPct       = ((hourlyRate - 5) / (300 - 5)) * 100;

  const getRateInsight = () => {
    if (hourlyRate < market.low)  return { status:"warn", msg:`Your rate (${sym}${hourlyRate}/hr) is below market low. Consider raising it.` };
    if (hourlyRate > market.high) return { status:"warn", msg:`Your rate (${sym}${hourlyRate}/hr) is above market. May reduce invitations.` };
    if (Math.abs(hourlyRate - market.avg) <= 10) return { status:"good", msg:"Your rate aligns with market averages." };
    if (hourlyRate > market.avg)  return { status:"good", msg:`Your rate is above average — signals strong expertise.` };
    return { status:"good", msg:`Your rate is competitive — good for new freelancers.` };
  };

  const getInsights = () => {
    const insights = [getRateInsight()];
    if (minBudget && parseInt(minBudget) >= 500) insights.push({ status:"good", msg:`Min budget ${sym}${minBudget} filters low-value projects.` });
    if (!showExact) insights.push({ status:"tip", msg:'Hidden rate shows "Budget: Negotiable" to clients.' });
    if (allowOffers) insights.push({ status:"tip", msg:"Allowing offers increases your chances of getting hired." });
    return insights;
  };
  const insights = getInsights();

  const indicatorLeft = `${Math.min(98, Math.max(2, ((hourlyRate - market.low) / (market.high - market.low)) * 100))}%`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
        .wbl-text-blue { color: #1B72C0; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
        .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
        .field-input {
          width:100%; border:1.5px solid #e5e7eb; border-radius:12px;
          padding:10px 14px; font-size:13px; outline:none; background:#f8fafc;
          transition:border-color .2s; box-sizing:border-box;
        }
        .field-input:focus { border-color:#1B72C0; }
        .field-select {
          width:100%; border:1.5px solid #e5e7eb; border-radius:12px;
          padding:10px 14px; font-size:13px; outline:none; background:#f8fafc;
          transition:border-color .2s; appearance:none; cursor:pointer; box-sizing:border-box;
        }
        .field-select:focus { border-color:#1B72C0; }
        .rate-slider {
          width:100%; height:6px; border-radius:99px; appearance:none; cursor:pointer; outline:none;
        }
        .rate-slider::-webkit-slider-thumb {
          appearance:none; width:20px; height:20px; border-radius:50%;
          background:linear-gradient(135deg,#0D2855,#1B72C0); border:2px solid white;
          box-shadow:0 2px 8px rgba(13,40,85,0.3); cursor:pointer;
        }
        .rate-slider::-moz-range-thumb {
          width:20px; height:20px; border-radius:50%;
          background:linear-gradient(135deg,#0D2855,#1B72C0); border:2px solid white;
          box-shadow:0 2px 8px rgba(13,40,85,0.3); cursor:pointer;
        }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

        {/* Navbar */}
<header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
  <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
  <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
    <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
    </svg>
    Save &amp; Exit
  </button>
</header>
        {/* Step Progress */}
        <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
            <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
                  <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
                    {isDone ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i+1}
                  </div>
                  <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* Main Card */}
          <div style={{ flex:1, minWidth:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #1B72C0", color:"#1B72C0", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  Pricing
                </span>
              </div>
              <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Set Your Rates</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>Clear pricing helps you get hired faster</p>

              {/* Info banner */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, padding:"14px 16px", marginBottom:24 }}>
                <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
                <p style={{ fontSize:13, color:"#92400e", margin:0 }}>
                  You can always update rates later. These are starting rates — you can negotiate per project.
                </p>
              </div>

              {/* Hourly Rate */}
              <div style={{ border:"1.5px solid #e5e7eb", borderRadius:16, padding:20, marginBottom:16 }}>

                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:20 }}>
                  <span style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>Hourly Rate</span>
                  <Dropdown options={currencies} value={currency} onChange={setCurrency} showCheck />
                </div>

                {/* Big rate */}
                <div style={{ textAlign:"center", marginBottom:20 }}>
                  <span style={{ fontSize:52, fontWeight:900, color:"#0f172a", letterSpacing:"-2px" }}>{sym}{hourlyRate}</span>
                  <span style={{ fontSize:20, color:"#9ca3af", fontWeight:500 }}>/hr</span>
                </div>

                {/* Slider */}
                <div style={{ marginBottom:8 }}>
                  <input type="range" min={5} max={300} step={5} value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="rate-slider"
                    style={{ background:`linear-gradient(to right, #1B72C0 0%, #1B72C0 ${sliderPct}%, #e5e7eb ${sliderPct}%, #e5e7eb 100%)` }} />
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginTop:4 }}>
                    <span>{sym}5/hr</span>
                    <span>{sym}300/hr</span>
                  </div>
                </div>

                {/* Market rates */}
                <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:14, padding:16, marginTop:12 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
                    <span style={{ fontSize:16 }}>📊</span>
                    <span style={{ fontSize:13, fontWeight:700, color:"#374151" }}>Market Rates for {ROLE}</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:12 }}>
                    {[
                      { label:"Low",     val:market.low,  active: hourlyRate <= market.low },
                      { label:"Average", val:market.avg,  active: Math.abs(hourlyRate - market.avg) <= 10 },
                      { label:"High",    val:market.high, active: hourlyRate >= market.high },
                    ].map(m => (
                      <div key={m.label} style={{ borderRadius:10, padding:"10px 6px", textAlign:"center", transition:"all .2s",
                        background: m.active ? "#eff6ff" : "white",
                        border: m.active ? "1px solid #93c5fd" : "1px solid transparent" }}>
                        <p style={{ fontSize:15, fontWeight:800, margin:0, color: m.active ? "#1d4ed8" : "#1f2937" }}>{sym}{m.val}/hr</p>
                        <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Indicator bar */}
                  <div style={{ position:"relative", height:6, background:"linear-gradient(to right, #e5e7eb, #93c5fd, #e5e7eb)", borderRadius:99 }}>
                    <div style={{ position:"absolute", top:"50%", left:indicatorLeft, transform:"translate(-50%,-50%)", width:14, height:14, borderRadius:"50%", background:"linear-gradient(135deg,#0D2855,#1B72C0)", border:"2px solid white", boxShadow:"0 2px 6px rgba(13,40,85,0.35)", transition:"left .3s" }}/>
                  </div>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginTop:4 }}>
                    <span>{sym}{market.low}</span>
                    <span>{sym}{market.avg} avg</span>
                    <span>{sym}{market.high}</span>
                  </div>
                </div>
              </div>

              {/* Min budget + duration */}
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16, marginBottom:20 }}>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:6 }}>Minimum Project Budget</label>
                  <input className="field-input" type="number" value={minBudget}
                    onChange={e => setMinBudget(e.target.value)} placeholder="e.g. 500" />
                  <p style={{ fontSize:11, color:"#9ca3af", marginTop:5 }}>Projects below this won't be shown to you</p>
                </div>
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:6 }}>Minimum Project Duration</label>
                  <div style={{ position:"relative" }}>
                    <select className="field-select" value={duration} onChange={e => setDuration(e.target.value)}>
                      {durationOptions.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
                      style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* Visibility toggles */}
              <div style={{ borderTop:"1px solid #f0f0f0", paddingTop:20 }}>
                <p style={{ fontSize:14, fontWeight:800, color:"#1f2937", marginBottom:16 }}>Rate Visibility</p>
                <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
                  {[
                    { label:"Show exact rate to clients", sub:'"Off" shows "Budget: Negotiable"', val:showExact, set:setShowExact },
                    { label:"Allow clients to make offers", sub:"Clients can propose a different rate", val:allowOffers, set:setAllowOffers },
                  ].map(row => (
                    <div key={row.label} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:16 }}>
                      <div>
                        <p style={{ fontSize:13, fontWeight:600, color:"#1f2937", margin:0 }}>{row.label}</p>
                        <p style={{ fontSize:11, color:"#9ca3af", margin:0, marginTop:2 }}>{row.sub}</p>
                      </div>
                      <Toggle value={row.val} onChange={row.set} />
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="wbl-btn-primary" onClick={onNext}>
                Continue to Verification
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ width:280, flexShrink:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {insights.map((insight, i) => (
                  <div key={i} className={insight.status === "good" ? "insight-good" : insight.status === "warn" ? "insight-warn" : "insight-tip"}
                    style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                    {insight.status === "good" ? (
                      <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" fill="none" stroke="#9333ea" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {/* Summary */}
              <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Your pricing summary:</p>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {[
                    ["Hourly rate",     `${sym}${hourlyRate}/hr`, "#1f2937"],
                    ...(minBudget ? [["Min budget", `${sym}${minBudget}`, "#1f2937"]] : []),
                    ["Min duration",   duration, "#1f2937"],
                    ["Rate visibility", showExact ? "Visible" : "Negotiable", showExact ? "#16a34a" : "#6b7280"],
                  ].map(([label, val, color]) => (
                    <div key={label} style={{ display:"flex", justifyContent:"space-between", fontSize:12, color:"#6b7280" }}>
                      <span>{label}</span>
                      <span style={{ fontWeight:700, color }}>{val}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}