import { useState } from "react";

const stepLabels = [
  "Account","Verify","Type","Profile","Skills",
  "Portfolio","History","Rates","KYC","Plan","Payment","Trust","Go Live"
];

const paymentMethods = [
  { id:"bank",     name:"Bank Transfer", detail:"3-5 business days • 1% fee",   recommended:true,
    icon: <svg style={{ width:24,height:24,color:"#16a34a" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg> },
  { id:"paypal",   name:"PayPal",        detail:"Instant – 1 day • 2.5% fee",  recommended:false,
    icon: <svg style={{ width:24,height:24,color:"#1B72C0" }} fill="currentColor" viewBox="0 0 24 24"><path d="M7.076 21.337H2.47a.641.641 0 01-.633-.74L4.944.901C5.026.382 5.474 0 5.998 0h7.46c2.57 0 4.578.543 5.69 1.81 1.01 1.15 1.304 2.42 1.012 4.287-.023.143-.047.288-.077.437-.983 5.05-4.349 6.797-8.647 6.797h-2.19c-.524 0-.968.382-1.05.9l-1.12 7.106zm14.146-14.42a3.35 3.35 0 00-.607-.541c-.013.076-.026.175-.041.254-.93 4.778-4.005 7.201-9.138 7.201h-2.19a.563.563 0 00-.556.479l-1.187 7.527h-.506l-.24 1.516a.56.56 0 00.554.647h3.882c.46 0 .85-.334.922-.788.06-.26.76-4.852.816-5.09a.932.932 0 01.923-.788h.58c3.76 0 6.705-1.528 7.565-5.946.36-1.847.174-3.388-.777-4.471z"/></svg> },
  { id:"payoneer", name:"Payoneer",      detail:"1-2 days • 2% fee",            recommended:false,
    icon: <svg style={{ width:24,height:24,color:"#f97316" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg> },
  { id:"wise",     name:"Wise",          detail:"1-3 days • 0.5-1.5% fee",      recommended:false,
    icon: <svg style={{ width:24,height:24,color:"#14b8a6" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
];

const frequencyOptions = ["On request","Weekly","Bi-weekly","Monthly"];

export default function Step11_Payment({ onNext, onBack, currentStep = 11, totalSteps = 13 }) {
  const [selectedMethod, setSelectedMethod] = useState("bank");
  const [bankSaved, setBankSaved]           = useState(false);
  const [savingBank, setSavingBank]         = useState(false);
  const [minPayout, setMinPayout]           = useState(100);
  const [frequency, setFrequency]           = useState("On request");
  const [bankForm, setBankForm] = useState({ accountName:"", bankName:"", accountNumber:"", routingNumber:"", accountType:"Checking", swift:"", currency:"USD" });
  const [bankErrors, setBankErrors] = useState({});

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  const selectedName    = paymentMethods.find(m => m.id === selectedMethod)?.name || "";

  const setBank = (field, val) => { setBankForm(p => ({ ...p, [field]:val })); setBankErrors(p => ({ ...p, [field]:"" })); };
  const validateBank = () => {
    const e = {};
    if (!bankForm.accountName.trim())   e.accountName   = "Required";
    if (!bankForm.bankName.trim())      e.bankName      = "Required";
    if (!bankForm.accountNumber.trim()) e.accountNumber = "Required";
    if (!bankForm.routingNumber.trim()) e.routingNumber = "Required";
    setBankErrors(e);
    return Object.keys(e).length === 0;
  };
  const handleSaveBank = () => { if (!validateBank()) return; setSavingBank(true); setTimeout(() => { setSavingBank(false); setBankSaved(true); }, 1200); };

  const getInsights = () => {
    const ins = [];
    ins.push({ status:"good", msg:`Payout method: ${selectedName}` });
    if (selectedMethod==="bank" && !bankSaved) ins.push({ status:"tip", msg:"Fill in your bank details below to complete setup." });
    if (selectedMethod==="bank" && bankSaved)  ins.push({ status:"good", msg:"Bank Transfer — lowest fee (1%), best for large payouts." });
    if (bankSaved) ins.push({ status:"good", msg:"Bank account verified and saved securely." });
    if (selectedMethod==="paypal") ins.push({ status:"warn", msg:"PayPal has a 2.5% fee — higher than Bank Transfer." });
    if (minPayout<=50) ins.push({ status:"tip", msg:"Low threshold means more frequent transfers — higher fees." });
    return ins;
  };
  const insights = getInsights();

  const inp = (field) => ({
    width:"100%", border:`1.5px solid ${bankErrors[field]?"#f87171":"#e5e7eb"}`,
    borderRadius:12, padding:"10px 14px", fontSize:13, outline:"none",
    background: bankErrors[field]?"#fef2f2":"#f8fafc", boxSizing:"border-box",
    transition:"border-color .2s", fontFamily:"'Plus Jakarta Sans',sans-serif",
  });

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        * { font-family: 'Plus Jakarta Sans', sans-serif; }

        .wbl-bg { background: linear-gradient(135deg,#0D2855 0%,#1B72C0 100%) !important; }
        .wbl-btn-inline {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          background: linear-gradient(135deg,#0D2855 0%,#1B72C0 100%) !important;
          color: #fff !important; border: none; cursor: pointer;
          font-weight: 600; border-radius: 12px; padding: 12px 32px; font-size: 15px;
          box-shadow: 0 3px 18px rgba(13,40,85,0.28); transition: all .2s;
        }
        .wbl-btn-inline:hover { opacity: .9; transform: translateY(-1px); }
        .wbl-text-blue { color: #1B72C0 !important; }
        .wbl-step-active { border-color:#1B72C0 !important; color:#1B72C0 !important; }
        .wbl-step-done   { background:linear-gradient(135deg,#6FDA44,#1B72C0) !important; border-color:transparent !important; }

        /* Payment method cards */
        .pay-method-btn {
          position: relative; text-align: left; padding: 14px 16px;
          border-radius: 12px; border: 2px solid #e5e7eb;
          background: #fff; cursor: pointer; transition: all .18s;
        }
        .pay-method-btn:hover:not(.selected) { border-color: #bfdbfe; background: #f0fdf4; }
        .pay-method-btn.selected { border-color: #22c55e; background: #f0fdf4; }

        /* ══ RESPONSIVE ══ */

        /* Step labels */
        .pay-step-lbl { display: block; }
        @media (max-width: 640px) { .pay-step-lbl { display: none !important; } }

        /* Two-column layout */
        .pay-layout {
          display: flex;
          gap: 24px;
          align-items: flex-start;
          flex-wrap: wrap;
        }
        .pay-main    { flex: 1 1 460px; min-width: 0; }
        .pay-sidebar { width: 288px; flex-shrink: 0; }

        /* Method grid: 2 col → 1 col */
        .pay-methods-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Bank form inner grids */
        .pay-bank-grid2 {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        /* Nav buttons */
        .pay-nav { display: flex; justify-content: space-between; flex-wrap: wrap; gap: 10px; }

        @media (max-width: 900px) {
          .pay-sidebar { width: 100%; position: static !important; }
          .pay-layout  { flex-direction: column; }
        }

        @media (max-width: 640px) {
          .pay-main-card { padding: 20px 16px !important; border-radius: 16px !important; }
          .pay-wrap      { padding: 16px 14px !important; }
          .pay-header    { padding: 10px 14px !important; }
          .pay-progress  { padding: 14px 16px !important; }
          .wbl-btn-inline { padding: 11px 20px !important; font-size: 13px !important; }
        }

        @media (max-width: 480px) {
          .pay-methods-grid { grid-template-columns: 1fr; }
          .pay-bank-grid2   { grid-template-columns: 1fr; }
          .pay-nav .wbl-btn-inline { flex: 1; justify-content: center; }
          .pay-nav .pay-back-btn  { flex: 1; justify-content: center; }
        }

        @media (max-width: 360px) {
          .pay-main-card { padding: 14px 12px !important; }
        }

        /* Range slider */
        input[type=range] { -webkit-appearance: none; appearance: none; width: 100%; height: 6px; border-radius: 99px; outline: none; cursor: pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance: none; width: 18px; height: 18px; border-radius: 50%; background: #3b82f6; cursor: pointer; box-shadow: 0 2px 6px rgba(59,130,246,0.4); }
      `}</style>

      <div style={{ minHeight:"100vh", background:"#F6FEF0", paddingBottom:80 }}>

        {/* Navbar */}
        <header className="pay-header" style={{ background:"#fff", borderBottom:"1px solid #e5e7eb", padding:"10px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
          <button style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, color:"#6b7280", border:"1px solid #e5e7eb", borderRadius:10, padding:"8px 14px", background:"#fff", cursor:"pointer" }}>
            <svg style={{ width:15,height:15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span style={{ display:"none" }} className="pay-save-lbl">Save &amp; Exit</span>
            <style>{`@media(min-width:480px){.pay-save-lbl{display:inline!important}}`}</style>
          </button>
        </header>

        {/* Step progress */}
        <div className="pay-progress" style={{ maxWidth:900, margin:"24px auto 20px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10 }}>
            <span style={{ fontSize:13, fontWeight:500, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontSize:13, fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>

          {/* Dots + line */}
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:14, left:`calc(100% / ${stepLabels.length * 2})`, right:`calc(100% / ${stepLabels.length * 2})`, height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}>
              <div className="wbl-bg" style={{ position:"absolute", top:0, left:0, height:"100%", width:progressWidth, borderRadius:99, transition:"width .5s ease" }} />
            </div>
            {stepLabels.map((label, index) => {
              const isActive = index + 1 === currentStep;
              const isDone   = index + 1 < currentStep;
              return (
                <div key={index} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, zIndex:1, position:"relative", flex:1, minWidth:0 }}>
                  <div className={`${isActive?"wbl-step-active":isDone?"wbl-bg":""}`}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, border: isDone||isActive?"none":"2px solid #d1d5db", background: isDone||isActive ? undefined : "#fff", color: isDone?"#fff":isActive?"#1B72C0":"#9ca3af", flexShrink:0 }}>
                    {isDone ? <svg style={{ width:14,height:14 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : index+1}
                  </div>
                  <span className="pay-step-lbl" style={{ fontSize:9, color:isActive?"#1B72C0":isDone?"#6b7280":"#9ca3af", fontWeight:isActive?700:400, whiteSpace:"nowrap", textAlign:"center" }}>
                    {label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="pay-wrap" style={{ maxWidth:900, margin:"0 auto", padding:"0 24px" }}>
          <div className="pay-layout">

            {/* Main card */}
            <div className="pay-main">
              <div className="pay-main-card" style={{ background:"#fff", borderRadius:20, border:"1px solid #f3f4f6", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", padding:"28px 28px" }}>

                <h1 style={{ fontSize:"clamp(18px,4vw,22px)", fontWeight:800, marginBottom:4, color:"#111827" }}>Set Up Your Payment Method</h1>
                <p style={{ fontSize:13, color:"#6b7280", marginBottom:18 }}>Tell us where to send your earnings</p>

                <div style={{ marginBottom:18 }}>
                  <span style={{ fontSize:10, fontWeight:700, border:"1px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>Payment Setup</span>
                </div>

                {/* Info banner */}
                <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fffbeb", border:"1px solid #fde68a", borderRadius:12, padding:"12px 14px", marginBottom:22 }}>
                  <span style={{ fontSize:18, flexShrink:0 }}>💡</span>
                  <p style={{ fontSize:13, color:"#92400e", margin:0 }}>This is how YOU receive money from clients. Platform pays you directly for completed milestones.</p>
                </div>

                {/* Payment method grid */}
                <div className="pay-methods-grid">
                  {paymentMethods.map((method) => {
                    const isSelected = selectedMethod === method.id;
                    return (
                      <button key={method.id} className={`pay-method-btn ${isSelected?"selected":""}`}
                        onClick={() => { setSelectedMethod(method.id); setBankSaved(false); }}>
                        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                          {method.icon}
                          <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>{method.name}</span>
                        </div>
                        <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>{method.detail}</p>
                        {method.recommended && (
                          <span style={{ display:"inline-block", marginTop:7, fontSize:11, fontWeight:700, color:"#16a34a", background:"#dcfce7", padding:"2px 8px", borderRadius:100 }}>Recommended</span>
                        )}
                        {isSelected && (
                          <div style={{ position:"absolute", top:10, right:10, width:20, height:20, borderRadius:"50%", background:"#22c55e", display:"flex", alignItems:"center", justifyContent:"center" }}>
                            <svg style={{ width:11,height:11,color:"#fff" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Bank Transfer inline form */}
                {selectedMethod === "bank" && (
                  <div style={{ marginTop:16, border:"2px solid #bbf7d0", borderRadius:16, overflow:"hidden" }}>
                    <div style={{ background:"#f0fdf4", padding:"12px 18px", display:"flex", alignItems:"center", gap:10, borderBottom:"1px solid #bbf7d0", flexWrap:"wrap" }}>
                      <div style={{ width:32, height:32, borderRadius:9, background:"#bbf7d0", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                        <svg style={{ width:15,height:15,color:"#15803d" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M3 7l9-4 9 4M4 10h16v11H4V10z"/></svg>
                      </div>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:13, fontWeight:700, color:"#166534", margin:0 }}>Bank Account Details</p>
                        <p style={{ fontSize:11, color:"#22c55e", margin:0 }}>Securely enter your bank information below</p>
                      </div>
                      {bankSaved && (
                        <span style={{ display:"flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, color:"#15803d", background:"#fff", border:"1px solid #bbf7d0", padding:"4px 10px", borderRadius:100, flexShrink:0 }}>
                          <svg style={{ width:11,height:11 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                          Saved
                        </span>
                      )}
                    </div>

                    <div style={{ padding:"18px 20px", background:"#fff", display:"flex", flexDirection:"column", gap:14 }}>
                      {/* SSL note */}
                      <div style={{ display:"flex", alignItems:"center", gap:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"10px 12px" }}>
                        <svg style={{ width:15,height:15,color:"#1B72C0",flexShrink:0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/></svg>
                        <p style={{ fontSize:11, color:"#1d4ed8", fontWeight:500, margin:0 }}>256-bit SSL encrypted — your bank details are never shared with clients.</p>
                      </div>

                      <div>
                        <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Account Holder Name <span style={{color:"#ef4444"}}>*</span></label>
                        <input type="text" value={bankForm.accountName} onChange={e=>setBank("accountName",e.target.value)} placeholder="Full legal name as on bank account" style={inp("accountName")} />
                        {bankErrors.accountName && <p style={{ color:"#ef4444", fontSize:11, marginTop:3 }}>{bankErrors.accountName}</p>}
                      </div>

                      <div>
                        <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Bank Name <span style={{color:"#ef4444"}}>*</span></label>
                        <input type="text" value={bankForm.bankName} onChange={e=>setBank("bankName",e.target.value)} placeholder="e.g. Chase, HDFC, Barclays" style={inp("bankName")} />
                        {bankErrors.bankName && <p style={{ color:"#ef4444", fontSize:11, marginTop:3 }}>{bankErrors.bankName}</p>}
                      </div>

                      <div className="pay-bank-grid2">
                        <div>
                          <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Account Number <span style={{color:"#ef4444"}}>*</span></label>
                          <input type="text" value={bankForm.accountNumber} onChange={e=>setBank("accountNumber",e.target.value.replace(/\D/g,""))} placeholder="••••••••••" style={inp("accountNumber")} />
                          {bankErrors.accountNumber && <p style={{ color:"#ef4444", fontSize:11, marginTop:3 }}>{bankErrors.accountNumber}</p>}
                        </div>
                        <div>
                          <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Account Type</label>
                          <div style={{ position:"relative" }}>
                            <select value={bankForm.accountType} onChange={e=>setBank("accountType",e.target.value)} style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"10px 36px 10px 14px", fontSize:13, background:"#f8fafc", outline:"none", appearance:"none", boxSizing:"border-box" }}>
                              <option>Checking</option><option>Savings</option><option>Business</option>
                            </select>
                            <svg style={{ position:"absolute",right:12,top:13,width:14,height:14,color:"#9ca3af",pointerEvents:"none" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                          </div>
                        </div>
                      </div>

                      <div>
                        <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Routing / IFSC Number <span style={{color:"#ef4444"}}>*</span></label>
                        <input type="text" value={bankForm.routingNumber} onChange={e=>setBank("routingNumber",e.target.value)} placeholder="9-digit routing or IFSC code" style={inp("routingNumber")} />
                        {bankErrors.routingNumber && <p style={{ color:"#ef4444", fontSize:11, marginTop:3 }}>{bankErrors.routingNumber}</p>}
                      </div>

                      <div className="pay-bank-grid2">
                        <div>
                          <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>SWIFT / BIC <span style={{ fontSize:11, color:"#9ca3af", fontWeight:400 }}>(international)</span></label>
                          <input type="text" value={bankForm.swift} onChange={e=>setBank("swift",e.target.value.toUpperCase())} placeholder="e.g. CHASUS33" style={{ ...inp("swift"), border:"1.5px solid #e5e7eb" }} />
                        </div>
                        <div>
                          <label style={{ display:"block", fontSize:13, fontWeight:600, marginBottom:6, color:"#374151" }}>Currency</label>
                          <div style={{ position:"relative" }}>
                            <select value={bankForm.currency} onChange={e=>setBank("currency",e.target.value)} style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"10px 36px 10px 14px", fontSize:13, background:"#f8fafc", outline:"none", appearance:"none", boxSizing:"border-box" }}>
                              {["USD","EUR","GBP","INR","CAD","AUD","SGD"].map(c=><option key={c}>{c}</option>)}
                            </select>
                            <svg style={{ position:"absolute",right:12,top:13,width:14,height:14,color:"#9ca3af",pointerEvents:"none" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                          </div>
                        </div>
                      </div>

                      <div style={{ display:"flex", alignItems:"center", gap:8, background:"#f9fafb", borderRadius:10, padding:"10px 12px", fontSize:11, color:"#6b7280" }}>
                        <svg style={{ width:14,height:14,color:"#22c55e",flexShrink:0 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        3-5 business days · 1% platform fee · Lowest fee of all methods
                      </div>

                      {!bankSaved ? (
                        <button onClick={handleSaveBank} disabled={savingBank}
                          style={{ width:"100%", padding:"12px", borderRadius:12, fontSize:13, fontWeight:700, color:"#fff", background: savingBank?"#86efac":"#22c55e", border:"none", cursor: savingBank?"not-allowed":"pointer", display:"flex", alignItems:"center", justifyContent:"center", gap:8 }}>
                          {savingBank ? <><svg style={{ width:14,height:14,animation:"spin 1s linear infinite" }} fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>Saving...</> : "Save Bank Account"}
                        </button>
                      ) : (
                        <div style={{ display:"flex", alignItems:"center", gap:10, background:"#f0fdf4", border:"1px solid #bbf7d0", borderRadius:12, padding:"12px 14px", flexWrap:"wrap", gap:8 }}>
                          <svg style={{ width:18,height:18,color:"#22c55e",flexShrink:0 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                          <span style={{ fontSize:13, fontWeight:700, color:"#166534", flex:1 }}>Bank account saved securely ✓</span>
                          <button onClick={()=>setBankSaved(false)} style={{ fontSize:12, color:"#1B72C0", background:"none", border:"none", cursor:"pointer", fontWeight:600 }}>Edit</button>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Payout Preferences */}
                <div style={{ borderTop:"1px solid #f3f4f6", paddingTop:22, marginTop:22 }}>
                  <h3 style={{ fontSize:15, fontWeight:800, color:"#111827", marginBottom:18 }}>Payout Preferences</h3>

                  <div style={{ marginBottom:20 }}>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:10 }}>
                      Minimum Payout: <span className="wbl-text-blue">${minPayout}</span>
                    </label>
                    <input type="range" min={25} max={500} step={25} value={minPayout}
                      onChange={e=>setMinPayout(Number(e.target.value))}
                      style={{ background:`linear-gradient(to right,#3b82f6 0%,#3b82f6 ${((minPayout-25)/475)*100}%,#e5e7eb ${((minPayout-25)/475)*100}%,#e5e7eb 100%)` }} />
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginTop:5 }}>
                      <span>$25</span><span>$500</span>
                    </div>
                    <p style={{ fontSize:11, color:"#6b7280", marginTop:6 }}>Earnings below this threshold accumulate until met</p>
                  </div>

                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:600, color:"#374151", marginBottom:7 }}>Payout Frequency</label>
                    <div style={{ position:"relative" }}>
                      <select value={frequency} onChange={e=>setFrequency(e.target.value)} style={{ width:"100%", border:"1.5px solid #e5e7eb", borderRadius:12, padding:"11px 36px 11px 14px", fontSize:13, background:"#f8fafc", outline:"none", appearance:"none", boxSizing:"border-box" }}>
                        {frequencyOptions.map(f=><option key={f}>{f}</option>)}
                      </select>
                      <svg style={{ position:"absolute",right:12,top:13,width:14,height:14,color:"#9ca3af",pointerEvents:"none" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/></svg>
                    </div>
                  </div>
                </div>
              </div>

              {/* Nav buttons */}
              <div className="pay-nav" style={{ marginTop:20 }}>
                <button className="pay-back-btn" onClick={onBack}
                  style={{ display:"flex", alignItems:"center", gap:8, padding:"12px 24px", border:"1.5px solid #e5e7eb", background:"#fff", borderRadius:12, fontSize:13, fontWeight:600, cursor:"pointer", color:"#374151" }}>
                  ← Back
                </button>
                <button className="wbl-btn-inline" onClick={onNext}>
                  Continue to Trust Level
                  <svg style={{ width:15,height:15 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/></svg>
                </button>
              </div>
            </div>

            {/* AI Insights sidebar */}
            <div className="pay-sidebar">
              <div style={{ background:"#fff", borderRadius:20, border:"1px solid #f3f4f6", boxShadow:"0 2px 12px rgba(0,0,0,0.04)", padding:"20px", position:"sticky", top:24 }}>
                <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:16 }}>
                  <div style={{ width:32, height:32, borderRadius:9, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg style={{ width:15,height:15,color:"#9333ea" }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                  </div>
                  <span style={{ fontSize:13, fontWeight:700, color:"#111827" }}>AI Insights</span>
                </div>

                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {insights.map((ins, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500,
                      background: ins.status==="good"?"#f0fdf4":ins.status==="warn"?"#fffbeb":"#f5f3ff",
                      border: `1px solid ${ins.status==="good"?"#bbf7d0":ins.status==="warn"?"#fde68a":"#ddd6fe"}`,
                      color: ins.status==="good"?"#166534":ins.status==="warn"?"#92400e":"#6b21a8" }}>
                      {ins.status==="good"
                        ? <svg style={{ width:14,height:14,flexShrink:0,marginTop:1 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        : ins.status==="warn"
                        ? <svg style={{ width:14,height:14,flexShrink:0,marginTop:1 }} fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>
                        : <svg style={{ width:14,height:14,flexShrink:0,marginTop:1 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>}
                      {ins.msg}
                    </div>
                  ))}
                </div>

                <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f3f4f6" }}>
                  <p style={{ fontSize:11, fontWeight:700, color:"#374151", marginBottom:8 }}>Your payout settings:</p>
                  {[["Method",selectedName],["Min payout",`$${minPayout}`],["Frequency",frequency]].map(([k,v])=>(
                    <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                      <span style={{ fontSize:11, color:"#6b7280" }}>{k}</span>
                      <span style={{ fontSize:11, fontWeight:600, color:"#111827" }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      <style>{`@keyframes spin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}`}</style>
    </>
  );
}