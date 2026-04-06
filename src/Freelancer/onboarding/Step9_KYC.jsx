import { useState, useRef } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const idTypes  = ["Passport", "National ID Card", "Driver's License"];
const idConfig = {
  "Passport":         { sides: ["Front"] },
  "National ID Card": { sides: ["Front", "Back"] },
  "Driver's License": { sides: ["Front", "Back"] },
};

const spinKf = `@keyframes spin { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }`;

function DocIcon() {
  return (
    <svg width="40" height="40" fill="none" stroke="#d1d5db" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
    </svg>
  );
}

function UploadSlot({ label, onUpload, uploaded }) {
  const ref = useRef();
  return (
    <div style={{ border:`2px dashed ${uploaded ? "#86efac" : "#e5e7eb"}`, borderRadius:14, padding:20, display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:10, minHeight:160, background: uploaded ? "#f0fdf4" : "white", transition:"all .2s", cursor:"pointer" }}
      onMouseEnter={e => { if (!uploaded) { e.currentTarget.style.borderColor="#93c5fd"; e.currentTarget.style.background="#f0fdf4"; } }}
      onMouseLeave={e => { if (!uploaded) { e.currentTarget.style.borderColor="#e5e7eb"; e.currentTarget.style.background="white"; } }}>
      {uploaded ? (
        <>
          <div style={{ width:48, height:48, borderRadius:"50%", background:"#dcfce7", display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="22" height="22" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p style={{ fontSize:13, fontWeight:700, color:"#16a34a", margin:0 }}>{label} — Uploaded</p>
          <button onClick={() => ref.current.click()} style={{ background:"none", border:"none", cursor:"pointer", fontSize:12, fontWeight:600, color:"#1B72C0" }}>Change file</button>
        </>
      ) : (
        <>
          <DocIcon/>
          <p style={{ fontSize:13, fontWeight:600, color:"#6b7280", margin:0 }}>{label}</p>
          <button onClick={() => ref.current.click()}
            style={{ display:"flex", alignItems:"center", gap:6, padding:"8px 14px", border:"1.5px solid #e5e7eb", borderRadius:10, fontSize:12, fontWeight:600, color:"#374151", background:"white", cursor:"pointer", transition:"all .15s" }}
            onMouseEnter={e => e.currentTarget.style.background="#f3f4f6"}
            onMouseLeave={e => e.currentTarget.style.background="white"}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Upload
          </button>
        </>
      )}
      <input ref={ref} type="file" accept="image/*,.pdf" onChange={() => onUpload()} style={{ display:"none" }}/>
    </div>
  );
}

export default function Step9_KYC({ onNext, onBack, currentStep = 9, totalSteps = 12 }) {
  const [idType, setIdType]                   = useState("");
  const [idOpen, setIdOpen]                   = useState(false);
  const [uploads, setUploads]                 = useState({ front:false, back:false });
  const [addressUploaded, setAddressUploaded] = useState(false);
  const [selfieVerified, setSelfieVerified]   = useState(false);
  const [selfieLoading, setSelfieLoading]     = useState(false);
  const addressRef = useRef();

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const config     = idConfig[idType];
  const needsBack  = config?.sides.length === 2;
  const idSelected = !!idType;
  const idComplete = idSelected && uploads.front && (!needsBack || uploads.back);
  const canSubmit  = idComplete;

  const handleSelfie = () => {
    if (selfieVerified) return;
    setSelfieLoading(true);
    setTimeout(() => { setSelfieVerified(true); setSelfieLoading(false); }, 1800);
  };

  const getInsights = () => {
    const insights = [];
    if (!idSelected) insights.push({ status:"tip",  msg:"Upload a government ID to enable payments." });
    if (idSelected && !idComplete) insights.push({ status:"warn", msg:`Upload your ${idType} to continue.` });
    if (idComplete)  insights.push({ status:"good", msg:`${idType} uploaded successfully.` });
    if (addressUploaded) insights.push({ status:"good", msg:"Address proof verified." });
    if (selfieVerified)  insights.push({ status:"good", msg:"Selfie verified — +20 trust points added!" });
    if (idComplete && addressUploaded && !selfieVerified) {
      insights.push({ status:"tip", msg:"Take a selfie for +20 bonus trust points." });
    }
    return insights;
  };
  const insights = getInsights();

  const checklist = [
    { label:"Government ID", done:idComplete },
    { label:"Address Proof", done:addressUploaded },
    { label:"Selfie Check",  done:selfieVerified, optional:true },
  ];

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing:border-box; }
        ${spinKf}
        .spin { animation: spin 1s linear infinite; }
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
        .step-done   { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
        .action-btn {
          display:flex; align-items:center; gap:6px; padding:8px 14px; border:1.5px solid #e5e7eb;
          border-radius:10px; font-size:12px; font-weight:600; color:#374151;
          background:white; cursor:pointer; flex-shrink:0; transition:all .15s; white-space:nowrap;
        }
        .action-btn:hover:not(:disabled) { background:#f9fafb; border-color:#d1d5db; }
        .action-btn:disabled { opacity:0.5; cursor:not-allowed; }

        /* Responsive */
        .main-layout { display:flex; gap:24px; align-items:flex-start; }
        .main-col { flex:1; min-width:0; }
        .sidebar-col { width:280px; flex-shrink:0; }

        @media (max-width: 900px) {
          .main-layout { flex-direction:column; }
          .sidebar-col { width:100%; }
          .sidebar-inner { position:static !important; }
        }

        @media (max-width: 640px) {
          .main-card { padding:20px !important; }
          .wbl-btn-primary { padding:11px 18px; font-size:13px; }
          .wbl-btn-secondary { padding:11px 16px; font-size:13px; }
          .page-title { font-size:20px !important; }
          .step-label-text { display:none !important; }
          .nav-row { gap:10px; }
          .id-upload-grid { grid-template-columns:1fr !important; }
          .address-row { flex-wrap:wrap; gap:10px; }
          .address-row .action-btn { align-self:flex-start; }
          .kyc-warning-text { font-size:11px !important; }
        }

        @media (max-width: 480px) {
          .page-wrapper { padding:0 14px !important; }
          .progress-wrapper { padding:0 14px !important; margin-top:20px !important; }
          .header-inner { padding:10px 14px !important; }
          .id-upload-grid { max-width:100% !important; }
        }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

        {/* Navbar */}
        <header className="header-inner" style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
          <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save &amp; Exit
          </button>
        </header>

        {/* Step Progress */}
        <div className="progress-wrapper" style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
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
                  <span className="step-label-text" style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="main-layout page-wrapper" style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px" }}>

          {/* Main Card */}
          <div className="main-col">
            <div className="main-card" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  KYC Verification
                </span>
              </div>
              <h1 className="page-title" style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Verify Your Identity</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>Required for receiving payments and accessing premium projects</p>

              {/* Required banner */}
              <div style={{ display:"flex", alignItems:"flex-start", gap:10, background:"#fff7ed", border:"1px solid #fed7aa", borderRadius:12, padding:"14px 16px", marginBottom:24 }}>
                <span style={{ fontSize:16, flexShrink:0 }}>🔒</span>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:"#9a3412", margin:0 }}>Identity verification is required to:</p>
                  <p className="kyc-warning-text" style={{ fontSize:12, color:"#c2410c", margin:0, marginTop:4, lineHeight:1.6 }}>
                    ✓ Receive milestone payments &nbsp;•&nbsp; ✓ Withdraw earnings &nbsp;•&nbsp; ✓ Access $5,000+ projects &nbsp;•&nbsp; ✓ Build client trust
                  </p>
                </div>
              </div>

              {/* ID Type Select */}
              <div style={{ marginBottom:20 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:8 }}>
                  Select ID Type <span style={{ color:"#ef4444" }}>*</span>
                </label>

                <div style={{ position:"relative" }}>
                  <button type="button" onClick={() => setIdOpen(o => !o)}
                    style={{ width:"100%", display:"flex", alignItems:"center", justifyContent:"space-between", border:`2px solid ${idSelected ? "#60a5fa" : "#e5e7eb"}`, borderRadius:12, padding:"12px 16px", fontSize:13, fontWeight: idSelected ? 700 : 400, color: idSelected ? "#1f2937" : "#9ca3af", background: idSelected ? "white" : "#f8fafc", cursor:"pointer", transition:"all .2s" }}>
                    {idType || "Choose document type"}
                    <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
                      style={{ transform: idOpen ? "rotate(180deg)" : "rotate(0deg)", transition:"transform .2s" }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {idOpen && (
                    <div style={{ position:"absolute", left:0, right:0, top:"calc(100% + 4px)", background:"white", border:"1.5px solid #e5e7eb", borderRadius:12, boxShadow:"0 8px 24px rgba(0,0,0,0.1)", zIndex:20, overflow:"hidden" }}>
                      {idTypes.map(opt => (
                        <button key={opt} type="button"
                          onClick={() => { setIdType(opt); setIdOpen(false); setUploads({ front:false, back:false }); }}
                          style={{ width:"100%", textAlign:"left", padding:"12px 18px", fontSize:13, display:"flex", alignItems:"center", gap:8, background: opt === idType ? "#eff6ff" : "white", color: opt === idType ? "#1B72C0" : "#374151", fontWeight: opt === idType ? 700 : 500, cursor:"pointer", border:"none", transition:"background .1s" }}
                          onMouseEnter={e => { if (opt !== idType) e.currentTarget.style.background="#f0fdf4"; }}
                          onMouseLeave={e => { e.currentTarget.style.background = opt === idType ? "#eff6ff" : "white"; }}>
                          {opt === idType
                            ? <svg width="14" height="14" fill="none" stroke="#1B72C0" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/></svg>
                            : <span style={{ width:14, display:"inline-block" }}/>}
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {idSelected && config && (
                  <div className="id-upload-grid" style={{ marginTop:16, display:"grid", gridTemplateColumns: needsBack ? "1fr 1fr" : "1fr", gap:14, maxWidth: needsBack ? "100%" : 280 }}>
                    <UploadSlot label={`${idType} — Front`} uploaded={uploads.front} onUpload={() => setUploads(p => ({ ...p, front:true }))} />
                    {needsBack && <UploadSlot label={`${idType} — Back`} uploaded={uploads.back} onUpload={() => setUploads(p => ({ ...p, back:true }))} />}
                  </div>
                )}
              </div>

              {/* Address Proof */}
              <div style={{ marginBottom:16 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:10 }}>Address Proof</label>
                <div className="address-row" style={{ display:"flex", alignItems:"center", gap:12, border:`1.5px solid ${addressUploaded ? "#86efac" : "#e5e7eb"}`, borderRadius:14, padding:"14px 16px", background: addressUploaded ? "#f0fdf4" : "white", transition:"all .2s" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#eff6ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="18" height="18" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:"#1f2937", margin:0 }}>Utility bill, bank statement, or government letter</p>
                    <p style={{ fontSize:11, color:"#6b7280", margin:0, marginTop:2 }}>Must be issued within the last 3 months</p>
                  </div>
                  {addressUploaded ? (
                    <span style={{ fontSize:11, fontWeight:800, background:"#dcfce7", color:"#166534", padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap", flexShrink:0 }}>✓ UPLOADED</span>
                  ) : (
                    <>
                      <button className="action-btn" onClick={() => addressRef.current.click()}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                        Upload
                      </button>
                      <input ref={addressRef} type="file" accept="image/*,.pdf" onChange={() => setAddressUploaded(true)} style={{ display:"none" }}/>
                    </>
                  )}
                </div>
              </div>

              {/* Selfie */}
              <div style={{ marginBottom:24 }}>
                <label style={{ display:"block", fontSize:13, fontWeight:700, color:"#374151", marginBottom:10 }}>
                  Selfie / Liveness Check <span style={{ fontSize:11, fontWeight:400, color:"#9ca3af" }}>(Optional — +20 trust pts)</span>
                </label>
                <div className="address-row" style={{ display:"flex", alignItems:"center", gap:12, border:`1.5px solid ${selfieVerified ? "#86efac" : "#e5e7eb"}`, borderRadius:14, padding:"14px 16px", background: selfieVerified ? "#f0fdf4" : "white", transition:"all .2s" }}>
                  <div style={{ width:36, height:36, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                    <svg width="18" height="18" fill="none" stroke="#a855f7" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:"#1f2937", margin:0 }}>Quick selfie to confirm your identity</p>
                    <p style={{ fontSize:11, color:"#6b7280", margin:0, marginTop:2 }}>Compared to your ID photo automatically</p>
                  </div>
                  {selfieVerified ? (
                    <span style={{ fontSize:11, fontWeight:800, background:"#dcfce7", color:"#166534", padding:"4px 10px", borderRadius:100, whiteSpace:"nowrap", flexShrink:0 }}>✓ VERIFIED</span>
                  ) : (
                    <button className="action-btn" onClick={handleSelfie} disabled={selfieLoading}>
                      {selfieLoading ? (
                        <svg className="spin" width="14" height="14" fill="none" viewBox="0 0 24 24">
                          <circle cx="12" cy="12" r="10" stroke="#a855f7" strokeWidth="4" opacity="0.25"/>
                          <path fill="#a855f7" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      ) : (
                        <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      )}
                      {selfieLoading ? "Verifying..." : "Take Selfie"}
                    </button>
                  )}
                </div>
              </div>

              {/* Warning box */}
              <div style={{ border:"1px solid #fed7aa", background:"#fff7ed", borderRadius:14, padding:"14px 16px" }}>
                <p style={{ fontSize:13, fontWeight:700, color:"#c2410c", display:"flex", alignItems:"center", gap:6, margin:0, marginBottom:6 }}>
                  <svg width="16" height="16" fill="#f97316" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  Until identity is verified:
                </p>
                <p className="kyc-warning-text" style={{ fontSize:12, color:"#c2410c", margin:0, lineHeight:1.7 }}>
                  ❌ Cannot withdraw earnings &nbsp;•&nbsp; ❌ Cannot access $5,000+ projects &nbsp;•&nbsp; ✓ Can still browse and apply to small projects
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="nav-row" style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
              <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button onClick={onNext} disabled={!canSubmit}
                style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"12px 28px", borderRadius:12, border:"none", fontWeight:700, fontSize:14, cursor: canSubmit ? "pointer" : "not-allowed", transition:"all .2s",
                  background: canSubmit ? "linear-gradient(135deg,#0D2855,#1B72C0)" : "#e5e7eb",
                  color: canSubmit ? "white" : "#9ca3af",
                  boxShadow: canSubmit ? "0 4px 20px rgba(13,40,85,0.3)" : "none" }}>
                Submit for Verification
                <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-col">
            <div className="sidebar-inner" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

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

              {/* Checklist */}
              <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Verification checklist:</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {checklist.map(item => (
                    <div key={item.label} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <div style={{ width:18, height:18, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0,
                        background: item.done ? "#22c55e" : "white", border: item.done ? "none" : "2px solid #d1d5db" }}>
                        {item.done && <svg width="10" height="10" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
                      </div>
                      <span style={{ fontSize:12, color: item.done ? "#16a34a" : "#6b7280", fontWeight: item.done ? 700 : 400 }}>
                        {item.label}
                        {item.optional && <span style={{ color:"#9ca3af", fontWeight:400 }}> (+20 pts)</span>}
                      </span>
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