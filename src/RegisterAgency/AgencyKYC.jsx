




import { useState } from "react";

(() => {
  if (document.getElementById("wl-kyc-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-kyc-fonts"; l.rel = "stylesheet";
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

const STEPS = [
  {
    id:1, title:"Business Identity", icon:"🏢",
    desc:"Legal business details and registration",
    status:"verified",
    fields:[
      { label:"Agency Name",       value:"TechVision Solutions Pvt Ltd", type:"text" },
      { label:"Registration Type", value:"Private Limited",              type:"select", opts:["Pvt Ltd","LLP","Proprietorship","Partnership"] },
      { label:"GST Number",        value:"27AABCT3518Q1Z2",              type:"text" },
      { label:"PAN Number",        value:"AABCT3518Q",                   type:"text", masked:true },
    ],
    docs:[
      { name:"Certificate of Incorporation", file:"COI_TechVision.pdf", status:"verified" },
    ],
  },
  {
    id:2, title:"Director / Owner Identity", icon:"👤",
    desc:"Personal identity of the business owner",
    status:"verified",
    fields:[
      { label:"Full Name",      value:"Raj Kumar",       type:"text" },
      { label:"Date of Birth",  value:"Jan 15, 1988",    type:"text" },
      { label:"Nationality",    value:"Indian",           type:"text" },
      { label:"Aadhaar Number", value:"XXXX XXXX 4821",  type:"text", masked:true },
      { label:"Director PAN",   value:"BXPCK3871R",      type:"text", masked:true },
    ],
    docs:[
      { name:"Aadhaar Card (Front)", file:"aadhaar_front.jpg", status:"verified" },
      { name:"Aadhaar Card (Back)",  file:"aadhaar_back.jpg",  status:"verified" },
    ],
  },
  {
    id:3, title:"Bank Account Verification", icon:"🏦",
    desc:"Verify bank account for payouts",
    status:"verified",
    fields:[
      { label:"Account Number",  value:"••••••••4821",         type:"text" },
      { label:"IFSC Code",       value:"HDFC0001234",           type:"text" },
      { label:"Account Holder",  value:"TechVision Solutions",  type:"text" },
      { label:"Penny Drop",      value:"✅ Verified on Mar 5, 2026", type:"text" },
    ],
    docs:[
      { name:"Cancelled Cheque", file:"cancelled_cheque.pdf", status:"verified" },
    ],
  },
  {
    id:4, title:"Business Address Proof", icon:"📍",
    desc:"Registered office address verification",
    status:"under_review",
    fields:[
      { label:"Registered Address", value:"401, Tech Park, Andheri East, Mumbai – 400069", type:"textarea" },
      { label:"City / State",       value:"Mumbai, Maharashtra", type:"text" },
      { label:"PIN Code",           value:"400069",              type:"text" },
    ],
    docs:[
      { name:"Utility Bill (Electricity)", file:"electricity_bill_feb26.pdf", status:"under_review" },
    ],
  },
  {
    id:5, title:"Final Review & Submit", icon:"✅",
    desc:"Review all documents and submit for platform approval",
    status:"pending",
    fields:[], docs:[],
  },
];

const DOC_STYLE = {
  not_uploaded: { bg:"#f3f4f6",    text:G.muted,    dot:G.muted,    label:"Not Uploaded", icon:"📎" },
  uploaded:     { bg:G.blueBg,     text:"#1d4ed8",  dot:G.blue,     label:"Uploaded",     icon:"📄" },
  under_review: { bg:G.yellowBg,   text:"#92400e",  dot:G.yellow,   label:"Under Review", icon:"🔍" },
  verified:     { bg:G.blueBg,     text:G.navy,     dot:G.blue,     label:"Verified",     icon:"✅" },
  rejected:     { bg:G.redBg,      text:"#dc2626",  dot:G.red,      label:"Rejected",     icon:"❌" },
};

const STEP_STATUS = {
  verified:     { ring:G.blue,         bg:G.blueBg,    icon:"✓", iconColor:G.navy,    label:"Verified",      labelColor:G.navy    },
  under_review: { ring:G.yellow,       bg:G.yellowBg,  icon:"🔍",iconColor:"#92400e", label:"Under Review",  labelColor:"#92400e" },
  in_progress:  { ring:G.blue,         bg:G.blueBg,    icon:"✏️",iconColor:G.navy,    label:"In Progress",   labelColor:G.navy    },
  pending:      { ring:G.border,       bg:G.bg,        icon:"",  iconColor:G.muted,   label:"Not Started",   labelColor:G.muted   },
  rejected:     { ring:G.red,          bg:G.redBg,     icon:"✕", iconColor:"#dc2626", label:"Rejected",      labelColor:"#dc2626" },
};

export default function AgencyKYC() {
  const [steps,      setSteps]      = useState(STEPS);
  const [activeStep, setActiveStep] = useState(4);
  const [editStep,   setEditStep]   = useState(null);

  const overallStatus = (() => {
    const statuses = steps.map(s => s.status);
    if (statuses.every(s => s === "verified"))    return { label:"Fully Verified",  color:G.navy,    bg:G.blueBg,    border:G.blueBorder,   icon:"✅" };
    if (statuses.some(s => s === "rejected"))     return { label:"Action Required", color:"#dc2626", bg:G.redBg,     border:G.redBorder,    icon:"❌" };
    if (statuses.some(s => s === "under_review")) return { label:"Under Review",    color:"#92400e", bg:G.yellowBg,  border:G.yellowBorder, icon:"🔍" };
    return { label:"Incomplete", color:G.sub, bg:"#f3f4f6", border:G.border, icon:"⏳" };
  })();

  const verifiedCount = steps.filter(s => s.status === "verified").length;

  const updateStepField = (stepId, fieldIdx, val) =>
    setSteps(prev => prev.map(s => s.id === stepId
      ? { ...s, fields:s.fields.map((f, i) => i === fieldIdx ? { ...f, value:val } : f) }
      : s));

  const uploadDoc = (stepId, docIdx) =>
    setSteps(prev => prev.map(s => s.id === stepId
      ? { ...s, docs:s.docs.map((d, i) => i === docIdx ? { ...d, status:"under_review", file:d.file || "uploaded_doc.pdf" } : d) }
      : s));

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar page="KYC Verification" />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px" }}>KYC Verification</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Complete identity verification to unlock withdrawals and full platform access</p>
          </div>

          {/* Overall status bar */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", paddingTop:16, paddingBottom:16, marginTop:14, borderTop:`1px solid #f3f4f6` }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8, background:overallStatus.bg, border:`1px solid ${overallStatus.border}`, borderRadius:10, padding:"8px 16px" }}>
                <span style={{ fontSize:15 }}>{overallStatus.icon}</span>
                <span style={{ fontSize:13, fontWeight:700, color:overallStatus.color }}>{overallStatus.label}</span>
              </div>
              <p style={{ fontSize:13, color:G.sub }}>{verifiedCount} of {steps.length} steps verified</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:200, background:"#f3f4f6", borderRadius:99, height:7, overflow:"hidden" }}>
                <div style={{ width:`${(verifiedCount / steps.length) * 100}%`, height:"100%", background:G.grad, borderRadius:99, transition:"width 0.3s" }} />
              </div>
              <span style={{ fontSize:13, fontWeight:700, color:G.navy }}>{Math.round((verifiedCount / steps.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main style={{ maxWidth:1100, margin:"0 auto", padding:"24px 28px 64px" }}>

        {verifiedCount < 3 && (
          <div style={{ background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:16 }}>🔒</span>
            <span style={{ fontSize:13, color:"#dc2626", fontWeight:500 }}>
              <strong>Withdrawals are locked</strong> until Steps 1–3 are verified. Complete bank verification to unlock payouts.
            </span>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:20 }}>

          {/* Step navigator */}
          <div style={{ display:"flex", flexDirection:"column", gap:0, position:"relative" }}>
            <div style={{ position:"absolute", left:19, top:28, bottom:28, width:2, background:"#f3f4f6", zIndex:0 }} />
            {steps.map(step => {
              const ss       = STEP_STATUS[step.status] || STEP_STATUS.pending;
              const isActive = activeStep === step.id;
              return (
                <button key={step.id} onClick={() => setActiveStep(step.id)}
                  style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px", borderRadius:12,
                    border:`1.5px solid ${isActive ? G.blue : G.border}`,
                    background:isActive ? G.blueBg : G.white,
                    cursor:"pointer", marginBottom:6, textAlign:"left", position:"relative", zIndex:1, transition:"all 0.12s", fontFamily:FONT }}>
                  <div style={{ width:24, height:24, borderRadius:"50%", background:ss.bg, border:`2px solid ${ss.ring}`,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:ss.iconColor, flexShrink:0, marginTop:1 }}>
                    {ss.icon || step.id}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:isActive ? 700 : 600, color:isActive ? G.navy : G.text, marginBottom:2 }}>{step.title}</p>
                    <p style={{ fontSize:11, color:G.muted }}>{step.desc}</p>
                    <span style={{ fontSize:10, fontWeight:700, color:ss.labelColor, marginTop:4, display:"block" }}>{ss.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active step panel */}
          <div>
            {steps.filter(s => s.id === activeStep).map(step => (
              <StepPanel key={step.id} step={step}
                onEdit={() => setEditStep(step.id)}
                onUpload={uploadDoc}
                onFieldChange={updateStepField}
                isEditing={editStep === step.id}
                onSave={() => setEditStep(null)}
                onCancelEdit={() => setEditStep(null)}
                allSteps={steps} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── STEP PANEL ── */
function StepPanel({ step, onEdit, onUpload, onFieldChange, isEditing, onSave, onCancelEdit, allSteps }) {
  const ss          = STEP_STATUS[step.status] || STEP_STATUS.pending;
  const isFinalStep = step.id === 5;
  if (isFinalStep) return <FinalReviewPanel steps={allSteps} />;

  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>

      {/* Header — navy-blue gradient */}
      <div style={{ background:G.grad, padding:"18px 22px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:6 }}>
              <span style={{ fontSize:20 }}>{step.icon}</span>
              <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>
                Step {step.id} — {step.title}
              </p>
              <span style={{ fontSize:11, fontWeight:700, background:"rgba(255,255,255,0.15)", color:G.white, borderRadius:99, padding:"3px 10px" }}>
                {ss.label}
              </span>
            </div>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>{step.desc}</p>
          </div>
          {step.status !== "under_review" && step.status !== "pending" && !isEditing && (
            <button onClick={onEdit}
              style={{ fontSize:12, fontWeight:700, color:G.white, background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:8, padding:"7px 14px", cursor:"pointer", fontFamily:FONT }}>
              ✏️ Edit
            </button>
          )}
        </div>
      </div>

      <div style={{ padding:"22px" }}>

        {step.status === "rejected" && (
          <div style={{ background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", gap:10 }}>
            <span style={{ fontSize:16 }}>❌</span>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:3 }}>Step Rejected</p>
              <p style={{ fontSize:12, color:G.sub }}>One or more documents were rejected. Please re-upload clear, valid documents.</p>
            </div>
          </div>
        )}

        {step.status === "under_review" && (
          <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:10, padding:"12px 16px", marginBottom:20, display:"flex", gap:10 }}>
            <span style={{ fontSize:16 }}>🔍</span>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:3 }}>Documents Under Review</p>
              <p style={{ fontSize:12, color:"#78350f" }}>Our team is reviewing your submission. This typically takes 2–3 business days.</p>
            </div>
          </div>
        )}

        {step.fields.length > 0 && (
          <div style={{ marginBottom:24 }}>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Details</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {step.fields.map((f, i) => (
                <div key={i} style={{ gridColumn:f.type === "textarea" ? "1 / -1" : "auto" }}>
                  <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                  {isEditing ? (
                    f.type === "textarea"
                      ? <textarea value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} rows={3} style={{ ...finp, resize:"none", width:"100%" }} />
                      : f.type === "select"
                      ? <select value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} style={{ ...finp, background:G.white, width:"100%" }}>
                          {f.opts?.map(o => <option key={o} value={o}>{o}</option>)}
                        </select>
                      : <input value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} style={{ ...finp, width:"100%" }} />
                  ) : (
                    <div style={{ background:G.bg, border:`1px solid #f3f4f6`, borderRadius:8, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <p style={{ fontSize:13, color:G.text, fontWeight:500 }}>{f.value || "—"}</p>
                      {f.masked && <span style={{ fontSize:10, color:G.muted, background:"#f3f4f6", padding:"2px 7px", borderRadius:99 }}>MASKED</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div style={{ display:"flex", gap:8, marginTop:14 }}>
                <button onClick={onCancelEdit} style={{ padding:"8px 16px", fontSize:13, fontWeight:600, border:`1px solid ${G.border}`, background:G.white, color:G.sub, borderRadius:8, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
                <button onClick={onSave} style={{ padding:"8px 16px", fontSize:13, fontWeight:700, border:"none", background:G.grad, color:G.white, borderRadius:8, cursor:"pointer", fontFamily:FONT }}>Save Changes</button>
              </div>
            )}
          </div>
        )}

        {step.docs.length > 0 && (
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Documents</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {step.docs.map((doc, i) => {
                const ds = DOC_STYLE[doc.status] || DOC_STYLE.not_uploaded;
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14,
                    border:`1px solid ${doc.status === "rejected" ? G.redBorder : doc.status === "verified" ? G.blueBorder : G.border}`,
                    borderRadius:12, padding:"14px 16px",
                    background:doc.status === "rejected" ? G.redBg : doc.status === "verified" ? G.blueBg : G.white }}>
                    <span style={{ fontSize:20 }}>{ds.icon}</span>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:3 }}>{doc.name}</p>
                      {doc.file && <p style={{ fontSize:11, color:G.muted }}>{doc.file}</p>}
                      {doc.rejectReason && <p style={{ fontSize:11, color:G.red, marginTop:3 }}>❌ {doc.rejectReason}</p>}
                    </div>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, background:ds.bg, color:ds.text, padding:"3px 10px", borderRadius:99 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:ds.dot, display:"inline-block" }} />
                      {ds.label}
                    </span>
                    {(doc.status === "not_uploaded" || doc.status === "rejected") && (
                      <label style={{ fontSize:12, fontWeight:700, color:G.navy, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:8, padding:"6px 12px", cursor:"pointer", fontFamily:FONT }}>
                        {doc.status === "rejected" ? "Re-upload" : "Upload"}
                        <input type="file" style={{ display:"none" }} onChange={() => onUpload(step.id, i)} />
                      </label>
                    )}
                    {doc.status === "verified" && <span style={{ fontSize:13, color:G.blue, fontWeight:700 }}>✓</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/* ── FINAL REVIEW PANEL ── */
function FinalReviewPanel({ steps }) {
  const allDone    = steps.slice(0, 4).every(s => s.status === "verified");
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
      <div style={{ background:G.grad, padding:"18px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <span style={{ fontSize:20 }}>✅</span>
          <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>Step 5 — Final Review</p>
        </div>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)" }}>Review all steps and submit for platform approval</p>
      </div>

      <div style={{ padding:"22px" }}>
        {submitted ? (
          <div style={{ textAlign:"center", padding:"40px 20px" }}>
            <p style={{ fontSize:48, marginBottom:16 }}>🎉</p>
            <p style={{ fontSize:22, fontWeight:800, color:G.navy, marginBottom:8, fontFamily:FONT }}>KYC Submitted!</p>
            <p style={{ fontSize:14, color:G.sub, lineHeight:1.7, maxWidth:380, margin:"0 auto" }}>
              Our team will review your documents within <strong>2–3 business days</strong>. You'll receive an email notification once verified.
            </p>
            <div style={{ marginTop:20, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:12, padding:"14px 20px", maxWidth:320, margin:"20px auto 0" }}>
              <p style={{ fontSize:12, color:G.sub }}>Reference ID</p>
              <p style={{ fontSize:16, fontWeight:700, color:G.navy, fontFamily:FONT }}>KYC-2026-TEC-001</p>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:16 }}>All Steps Summary</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
              {steps.slice(0, 4).map(step => {
                const ss = STEP_STATUS[step.status] || STEP_STATUS.pending;
                return (
                  <div key={step.id}
                    style={{ display:"flex", alignItems:"center", gap:14,
                      border:`1.5px solid ${step.status === "verified" ? G.blueBorder : step.status === "rejected" ? G.redBorder : G.border}`,
                      borderRadius:12, padding:"14px 16px",
                      background:step.status === "verified" ? G.blueBg : step.status === "rejected" ? G.redBg : G.white }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:ss.bg, border:`2px solid ${ss.ring}`,
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:ss.iconColor, flexShrink:0 }}>
                      {ss.icon || step.id}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{step.title}</p>
                      <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{step.docs.length} document{step.docs.length !== 1 ? "s" : ""} · {step.fields.length} detail{step.fields.length !== 1 ? "s" : ""}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:ss.labelColor, background:ss.bg, padding:"3px 10px", borderRadius:99 }}>{ss.label}</span>
                  </div>
                );
              })}
            </div>

            {!allDone && (
              <div style={{ background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:10, padding:"12px 16px", marginBottom:16 }}>
                <p style={{ fontSize:13, color:G.red, fontWeight:600 }}>⚠️ Complete all steps before submitting</p>
                <p style={{ fontSize:12, color:G.sub, marginTop:4 }}>Steps 1–4 must be fully verified before final submission.</p>
              </div>
            )}

            <button onClick={() => allDone && setSubmitted(true)} disabled={!allDone}
              style={{ width:"100%", padding:"14px", fontSize:14, fontWeight:700, border:"none", borderRadius:10,
                background:allDone ? G.grad : "#e5e7eb",
                color:allDone ? G.white : G.muted,
                cursor:allDone ? "pointer" : "not-allowed", fontFamily:FONT, transition:"background 0.15s" }}>
              {allDone ? "Submit KYC for Review →" : "Complete all steps first"}
            </button>
            <p style={{ fontSize:11, color:G.muted, textAlign:"center", marginTop:10, lineHeight:1.6 }}>
              By submitting, you confirm all information is accurate.<br />Platform review takes 2–3 business days.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

/* ── NAVBAR ── */
function Navbar({ page }) {
  return (
    <nav style={{ height:56, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block"}} />
      <div style={{ width:1, height:20, background:G.border, marginLeft:4 }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.navy, fontWeight:600 }}>{page}</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span style={{ fontSize:11, color:G.navy, fontWeight:700 }}>Agency Admin only</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.grad,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white, marginLeft:8, fontFamily:FONT }}>
        RK
      </div>
    </nav>
  );
}

const finp = { fontSize:13, border:`1.5px solid ${G.border}`, borderRadius:8, padding:"9px 12px", outline:"none", color:G.text, fontFamily:FONT, boxSizing:"border-box" };