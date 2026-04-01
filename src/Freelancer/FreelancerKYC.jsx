import { useState } from "react";

(() => {
  if (document.getElementById("wl-fk-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fk-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

/* ── Two color families — green + navy ───────────────────────
   GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
   NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
   ──────────────────────────────────────────────────────────── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:   "#1C1C1C",
  sub:    "#4b5563",
  muted:  "#9ca3af",
  border: "#e5e7eb",
  bg:     "#f9fafb",
  white:  "#ffffff",
};
const FONT = "'Poppins', sans-serif";

const DOC_STYLE = {
  not_uploaded: { bg:"#f3f4f6",  text:G.muted,     dot:G.muted,      label:"Not Uploaded", icon:"📎" },
  uploaded:     { bg:G.navyBg,   text:G.navy,      dot:G.navyLight,  label:"Uploaded",     icon:"📄" },
  under_review: { bg:"#fef3c7",  text:"#92400e",   dot:"#f59e0b",    label:"Under Review", icon:"🔍" },
  verified:     { bg:G.greenBg,  text:G.greenDeep, dot:G.green,      label:"Verified",     icon:"✅" },
  rejected:     { bg:"#fef2f2",  text:"#dc2626",   dot:"#ef4444",    label:"Rejected",     icon:"❌" },
};

const STEP_STATUS_STYLE = {
  verified:     { ring:G.green,      bg:G.greenBg,  icon:"✓",  iconColor:G.greenDeep, label:"Verified",     labelColor:G.greenDeep },
  under_review: { ring:"#f59e0b",    bg:"#fef3c7",  icon:"🔍", iconColor:"#92400e",   label:"Under Review", labelColor:"#92400e"   },
  in_progress:  { ring:G.navyLight,  bg:G.navyBg,   icon:"✏️", iconColor:G.navy,      label:"In Progress",  labelColor:G.navy      },
  pending:      { ring:G.border,     bg:"#f9fafb",  icon:"",   iconColor:G.muted,     label:"Not Started",  labelColor:G.muted     },
  rejected:     { ring:"#ef4444",    bg:"#fef2f2",  icon:"✕",  iconColor:"#dc2626",   label:"Rejected",     labelColor:"#dc2626"   },
};

const STEPS = [
  {
    id:1, title:"Personal Identity", icon:"🪪",
    desc:"Aadhaar, PAN and personal details", status:"verified",
    fields:[
      { label:"Full Name (as per Aadhaar)", value:"Arjun Joshi",        type:"text"                                   },
      { label:"Date of Birth",              value:"Mar 15, 1994",       type:"text"                                   },
      { label:"Gender",                     value:"Male",               type:"select", opts:["Male","Female","Other"] },
      { label:"PAN Number",                 value:"BXPCK3871R",         type:"text",   masked:true                    },
      { label:"Aadhaar Number",             value:"XXXX XXXX 7214",     type:"text",   masked:true                    },
    ],
    docs:[
      { name:"Aadhaar Card (Front)", file:"aadhaar_front.jpg", status:"verified" },
      { name:"Aadhaar Card (Back)",  file:"aadhaar_back.jpg",  status:"verified" },
      { name:"PAN Card",             file:"pan_card.jpg",      status:"verified" },
    ],
  },
  {
    id:2, title:"Address Verification", icon:"📍",
    desc:"Current residential address proof", status:"verified",
    fields:[
      { label:"Current Address", value:"204, Sai Niwas, Goregaon West, Mumbai – 400104", type:"textarea" },
      { label:"City",            value:"Mumbai",                                          type:"text"     },
      { label:"State",           value:"Maharashtra",                                     type:"text"     },
      { label:"PIN Code",        value:"400104",                                          type:"text"     },
    ],
    docs:[
      { name:"Address Proof (Electricity Bill)", file:"electricity_bill.pdf", status:"verified" },
    ],
  },
  {
    id:3, title:"Bank Account Verification", icon:"🏦",
    desc:"Link your bank account for payouts", status:"under_review",
    fields:[
      { label:"Account Number",  value:"••••••••1842",                 type:"text" },
      { label:"IFSC Code",       value:"HDFC0002341",                  type:"text" },
      { label:"Account Holder",  value:"Arjun Joshi",                  type:"text" },
      { label:"Penny Drop Test", value:"⏳ Verification in progress…", type:"text" },
    ],
    docs:[
      { name:"Cancelled Cheque", file:"cancelled_cheque.jpg", status:"under_review" },
    ],
  },
  {
    id:4, title:"Final Review & Submit", icon:"✅",
    desc:"Review everything and submit for approval",
    status:"pending", fields:[], docs:[],
  },
];

const KYC_BENEFITS = [
  { icon:"💸", text:"Unlock withdrawals"            },
  { icon:"🏅", text:"KYC Verified badge on profile" },
  { icon:"📈", text:"Higher search ranking"         },
  { icon:"🤝", text:"Client trust increases"        },
  { icon:"🌟", text:"Access to premium projects"   },
];

export default function FreelancerKYC() {
  const [steps,      setSteps]      = useState(STEPS);
  const [activeStep, setActiveStep] = useState(3);
  const [editStep,   setEditStep]   = useState(null);

  const verifiedCount = steps.filter(s => s.status === "verified").length;

  const overallStatus = (() => {
    const ss = steps.map(s => s.status);
    if (ss.every(s => s === "verified"))    return { label:"Fully Verified",  color:G.greenDeep, bg:G.greenBg,  border:G.greenBorder, icon:"✅" };
    if (ss.some(s => s === "rejected"))     return { label:"Action Required", color:"#dc2626",   bg:"#fef2f2",  border:"#fecaca",     icon:"❌" };
    if (ss.some(s => s === "under_review")) return { label:"Under Review",    color:"#92400e",   bg:"#fef3c7",  border:"#fde68a",     icon:"🔍" };
    return                                          { label:"Incomplete",     color:"#6b7280",   bg:"#f3f4f6",  border:"#e5e7eb",     icon:"⏳" };
  })();

  const uploadDoc = (stepId, docIdx) => {
    setSteps(prev => prev.map(s => s.id === stepId
      ? { ...s, docs: s.docs.map((d, i) => i === docIdx ? { ...d, status:"under_review" } : d) }
      : s));
  };

  const updateField = (stepId, fieldIdx, val) => {
    setSteps(prev => prev.map(s => s.id === stepId
      ? { ...s, fields: s.fields.map((f, i) => i === fieldIdx ? { ...f, value:val } : f) }
      : s));
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6EC030; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #2E7D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6EC030 #f1f1f1; }
      `}</style>

      <Navbar />

      <header style={{ background:G.white, borderBottom:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
        <div style={{ maxWidth:1060, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>KYC Verification</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Complete identity verification to unlock withdrawals and premium features</p>
          </div>

          {/* Status + progress */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between",
            paddingTop:18, paddingBottom:18, marginTop:14, borderTop:`1px solid ${G.greenBorder}` }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", gap:8,
                background:overallStatus.bg, border:`1px solid ${overallStatus.border}`,
                borderRadius:100, padding:"8px 18px" }}>
                <span style={{ fontSize:16 }}>{overallStatus.icon}</span>
                <span style={{ fontSize:14, fontWeight:700, color:overallStatus.color }}>{overallStatus.label}</span>
              </div>
              <p style={{ fontSize:13, color:G.sub }}>{verifiedCount} of {steps.length} steps verified</p>
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <div style={{ width:200, background:"#f3f4f6", borderRadius:99, height:8, overflow:"hidden" }}>
                <div style={{ width:`${(verifiedCount / steps.length) * 100}%`, height:"100%",
                  background:`linear-gradient(90deg, ${G.green}, ${G.greenLight})`,
                  borderRadius:99, transition:"width 0.3s" }} />
              </div>
              <span style={{ fontSize:13, fontWeight:700, color:G.greenDeep }}>{Math.round((verifiedCount / steps.length) * 100)}%</span>
            </div>
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1060, margin:"0 auto", padding:"24px 28px 64px" }}>
        {verifiedCount < 3 && (
          <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12,
            padding:"12px 16px", marginBottom:20, display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:16 }}>🔒</span>
            <span style={{ fontSize:13, color:"#dc2626", fontWeight:500 }}>
              <strong>Withdrawals locked</strong> until Steps 1–3 are verified. Complete bank verification to unlock payouts.
            </span>
          </div>
        )}

        <div style={{ display:"grid", gridTemplateColumns:"260px 1fr", gap:20 }}>

          {/* Stepper nav */}
          <div style={{ display:"flex", flexDirection:"column", gap:0, position:"relative" }}>
            <div style={{ position:"absolute", left:19, top:28, bottom:28, width:2, background:G.greenBorder, zIndex:0 }} />
            {steps.map(step => {
              const ss       = STEP_STATUS_STYLE[step.status] || STEP_STATUS_STYLE.pending;
              const isActive = activeStep === step.id;
              return (
                <button key={step.id} onClick={() => setActiveStep(step.id)}
                  style={{ display:"flex", alignItems:"flex-start", gap:14, padding:"14px 16px",
                    borderRadius:14,
                    border:`1.5px solid ${isActive ? G.green : G.greenBorder}`,
                    background:isActive ? G.greenBg : G.white,
                    cursor:"pointer", marginBottom:6, textAlign:"left",
                    position:"relative", zIndex:1, transition:"all 0.12s", fontFamily:FONT,
                    boxShadow:isActive ? "0 2px 12px rgba(110,192,48,0.10)" : "none",
                  }}>
                  <div style={{ width:24, height:24, borderRadius:"50%",
                    background:ss.bg, border:`2px solid ${ss.ring}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    fontSize:11, fontWeight:700, color:ss.iconColor, flexShrink:0, marginTop:1 }}>
                    {ss.icon || step.id}
                  </div>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:isActive ? 700 : 600, color:isActive ? G.greenDeep : G.text, marginBottom:2 }}>{step.title}</p>
                    <p style={{ fontSize:11, color:G.muted }}>{step.desc}</p>
                    <span style={{ fontSize:10, fontWeight:700, color:ss.labelColor, marginTop:4, display:"block" }}>{ss.label}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Step content */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            {steps.filter(s => s.id === activeStep).map(step => (
              step.id === 4
                ? <FinalStep key={step.id} steps={steps} />
                : <StepPanel key={step.id} step={step}
                    isEditing={editStep === step.id}
                    onEdit={() => setEditStep(editStep === step.id ? null : step.id)}
                    onSave={() => setEditStep(null)}
                    onCancel={() => setEditStep(null)}
                    onUpload={uploadDoc}
                    onFieldChange={updateField} />
            ))}

            {/* Why KYC card — navy tonal */}
            {verifiedCount < steps.length && (
              <div style={{
                background: G.gradNavy,
                borderRadius:16, padding:"18px 20px", position:"relative", overflow:"hidden",
                boxShadow:"0 4px 20px rgba(15,26,59,0.24)",
              }}>
                <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:"rgba(168,224,99,0.10)", pointerEvents:"none" }} />
                <div style={{ position:"absolute", bottom:-20, left:-20, width:70, height:70, borderRadius:"50%", background:"rgba(168,224,99,0.06)", pointerEvents:"none" }} />
                <p style={{ fontSize:13, fontWeight:700, color:G.green, marginBottom:14 }}>Why complete KYC?</p>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                  {KYC_BENEFITS.map((b, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <span style={{ fontSize:16 }}>{b.icon}</span>
                      <span style={{ fontSize:12, color:"rgba(255,255,255,0.65)" }}>{b.text}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Badge preview */}
            {verifiedCount >= steps.length && (
              <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.greenDeep, marginBottom:10 }}>Your Profile Badge</p>
                <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                  <div style={{ width:48, height:48, borderRadius:14,
                    background: G.gradNavy,
                    display:"flex", alignItems:"center", justifyContent:"center", fontSize:18,
                    boxShadow:"0 3px 12px rgba(15,26,59,0.28)",
                  }}>🏅</div>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:G.text }}>Arjun Joshi</p>
                    <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:3 }}>
                      <span style={{ fontSize:11, fontWeight:700, background:G.green, color:G.white, borderRadius:99, padding:"2px 10px" }}>✓ KYC Verified</span>
                      <span style={{ fontSize:11, color:G.sub }}>Visible on your public profile</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Step Panel ─────────────────────────────────────────────── */
function StepPanel({ step, isEditing, onEdit, onSave, onCancel, onUpload, onFieldChange }) {
  const ss = STEP_STATUS_STYLE[step.status] || STEP_STATUS_STYLE.pending;
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>

      {/* Navy tonal header */}
      <div style={{ background: G.gradNavy, padding:"18px 22px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
              <span style={{ fontSize:22 }}>{step.icon}</span>
              <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>
                Step {step.id} — {step.title}
              </p>
              <span style={{ fontSize:11, fontWeight:700, background:ss.bg, color:ss.labelColor, padding:"3px 10px", borderRadius:99 }}>{ss.label}</span>
            </div>
            <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{step.desc}</p>
          </div>
          {(step.status === "verified" || step.status === "in_progress") && !isEditing && (
            <button onClick={onEdit}
              style={{ fontSize:12, fontWeight:700, color:G.green,
                background:"rgba(168,224,99,0.12)", border:"1px solid rgba(168,224,99,0.25)",
                borderRadius:100, padding:"7px 16px", cursor:"pointer", fontFamily:FONT }}>
              ✏️ Edit
            </button>
          )}
        </div>
      </div>

      <div style={{ padding:"22px" }}>
        {step.status === "under_review" && (
          <div style={{ background:"#fef3c7", border:"1px solid #fde68a", borderRadius:12, padding:"12px 16px", marginBottom:20, display:"flex", gap:8 }}>
            <span style={{ fontSize:16 }}>🔍</span>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:2 }}>Documents Under Review</p>
              <p style={{ fontSize:12, color:"#78350f" }}>Our team is verifying your documents. This typically takes 2–3 business days.</p>
            </div>
          </div>
        )}
        {step.status === "rejected" && (
          <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"12px 16px", marginBottom:20, display:"flex", gap:8 }}>
            <span style={{ fontSize:16 }}>❌</span>
            <div>
              <p style={{ fontSize:13, fontWeight:700, color:"#dc2626", marginBottom:2 }}>Step Rejected</p>
              <p style={{ fontSize:12, color:"#6b7280" }}>Please re-upload the required documents with better clarity.</p>
            </div>
          </div>
        )}

        {/* Fields */}
        {step.fields.length > 0 && (
          <div style={{ marginBottom:22 }}>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Details</p>
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
              {step.fields.map((f, i) => (
                <div key={i} style={{ gridColumn:f.type === "textarea" ? "1 / -1" : "auto" }}>
                  <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>{f.label}</label>
                  {isEditing ? (
                    f.type === "textarea"
                      ? <textarea value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} rows={2} style={{ ...finp, resize:"none", width:"100%" }} />
                      : f.type === "select"
                      ? <select value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} style={{ ...finp, background:G.white, width:"100%" }}>
                          {f.opts?.map(o => <option key={o}>{o}</option>)}
                        </select>
                      : <input value={f.value} onChange={e => onFieldChange(step.id, i, e.target.value)} style={{ ...finp, width:"100%" }} />
                  ) : (
                    <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 12px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                      <p style={{ fontSize:13, color:G.text, fontWeight:500 }}>{f.value || "—"}</p>
                      {f.masked && <span style={{ fontSize:10, color:G.muted, background:"#f3f4f6", padding:"2px 7px", borderRadius:99 }}>MASKED</span>}
                    </div>
                  )}
                </div>
              ))}
            </div>
            {isEditing && (
              <div style={{ display:"flex", gap:8, marginTop:14 }}>
                <button onClick={onCancel} style={{ padding:"7px 18px", fontSize:12, fontWeight:600, border:`1px solid ${G.greenBorder}`, background:G.white, color:G.sub, borderRadius:100, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
                <button onClick={onSave} style={{ padding:"7px 18px", fontSize:12, fontWeight:700, border:"none",
                  background: G.gradNavy,
                  color:G.white, borderRadius:100, cursor:"pointer", fontFamily:FONT,
                  boxShadow:"0 2px 10px rgba(15,26,59,0.25)" }}>Save Changes</button>
              </div>
            )}
          </div>
        )}

        {/* Documents */}
        {step.docs.length > 0 && (
          <div>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>Documents</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
              {step.docs.map((doc, i) => {
                const ds = DOC_STYLE[doc.status] || DOC_STYLE.not_uploaded;
                return (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:14,
                    border:`1px solid ${doc.status === "rejected" ? "#fecaca" : doc.status === "verified" ? G.greenBorder : G.border}`,
                    borderRadius:12, padding:"14px 16px",
                    background:doc.status === "rejected" ? "#fef2f2" : doc.status === "verified" ? G.greenBg : G.white }}>
                    <span style={{ fontSize:22 }}>{ds.icon}</span>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:2 }}>{doc.name}</p>
                      {doc.file && <p style={{ fontSize:11, color:G.muted }}>{doc.file}</p>}
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, background:ds.bg, color:ds.text, padding:"3px 10px", borderRadius:99, display:"flex", alignItems:"center", gap:4 }}>
                      <span style={{ width:5, height:5, borderRadius:"50%", background:ds.dot }} />
                      {ds.label}
                    </span>
                    {(doc.status === "not_uploaded" || doc.status === "rejected") && (
                      <label style={{ fontSize:12, fontWeight:700, color:G.greenDeep, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"6px 14px", cursor:"pointer", fontFamily:FONT }}>
                        {doc.status === "rejected" ? "Re-upload" : "Upload"}
                        <input type="file" style={{ display:"none" }} onChange={() => onUpload(step.id, i)} />
                      </label>
                    )}
                    {doc.status === "verified" && <span style={{ fontSize:13, color:G.green, fontWeight:700 }}>✓</span>}
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

/* ── Final Step ─────────────────────────────────────────────── */
function FinalStep({ steps }) {
  const allDone     = steps.slice(0, 3).every(s => s.status === "verified");
  const [done, setDone] = useState(false);

  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
      <div style={{ background: G.gradNavy, padding:"18px 22px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <span style={{ fontSize:22 }}>✅</span>
          <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>Step 4 — Final Review</p>
        </div>
        <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>Review all information and submit for verification</p>
      </div>

      <div style={{ padding:"22px" }}>
        {done ? (
          <div style={{ textAlign:"center", padding:"40px 20px" }}>
            <p style={{ fontSize:48, marginBottom:16 }}>🎉</p>
            <p style={{ fontSize:22, fontWeight:800, color:G.greenDeep, marginBottom:8, fontFamily:FONT }}>KYC Submitted!</p>
            <p style={{ fontSize:14, color:G.sub, lineHeight:1.7, maxWidth:360, margin:"0 auto" }}>
              Our team will review your documents within <strong>2–3 business days</strong>. You'll get an email once verified.
            </p>
            <div style={{ marginTop:20, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"14px 20px", maxWidth:300, margin:"20px auto 0" }}>
              <p style={{ fontSize:12, color:G.sub }}>Reference ID</p>
              <p style={{ fontSize:16, fontWeight:700, color:G.greenDeep, fontFamily:FONT }}>KYC-2026-ARJ-001</p>
            </div>
          </div>
        ) : (
          <>
            <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:16 }}>Summary</p>
            <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:22 }}>
              {steps.slice(0, 3).map(step => {
                const ss = STEP_STATUS_STYLE[step.status] || STEP_STATUS_STYLE.pending;
                return (
                  <div key={step.id} style={{ display:"flex", alignItems:"center", gap:14,
                    border:`1.5px solid ${step.status === "verified" ? G.greenBorder : step.status === "rejected" ? "#fecaca" : G.border}`,
                    borderRadius:12, padding:"14px 16px",
                    background:step.status === "verified" ? G.greenBg : step.status === "rejected" ? "#fef2f2" : G.white }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:ss.bg, border:`2px solid ${ss.ring}`,
                      display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:ss.iconColor, flexShrink:0 }}>
                      {ss.icon || step.id}
                    </div>
                    <div style={{ flex:1 }}>
                      <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{step.title}</p>
                      <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{step.docs.length} doc{step.docs.length !== 1 ? "s" : ""} · {step.fields.length} field{step.fields.length !== 1 ? "s" : ""}</p>
                    </div>
                    <span style={{ fontSize:11, fontWeight:700, color:ss.labelColor, background:ss.bg, padding:"3px 10px", borderRadius:99 }}>{ss.label}</span>
                  </div>
                );
              })}
            </div>
            {!allDone && (
              <div style={{ background:"#fef2f2", border:"1px solid #fecaca", borderRadius:12, padding:"12px 16px", marginBottom:16 }}>
                <p style={{ fontSize:13, color:"#dc2626", fontWeight:600 }}>⚠️ Complete Steps 1–3 before submitting</p>
              </div>
            )}
            <button onClick={() => allDone && setDone(true)} disabled={!allDone}
              style={{ width:"100%", padding:"14px", fontSize:14, fontWeight:700, border:"none", borderRadius:100,
                background: allDone ? G.gradNavy : "#e5e7eb",
                color:allDone ? G.white : G.muted,
                cursor:allDone ? "pointer" : "not-allowed", fontFamily:FONT,
                boxShadow:allDone ? "0 3px 16px rgba(15,26,59,0.28)" : "none",
                transition:"all 0.15s",
              }}>
              {allDone ? "Submit KYC for Verification →" : "Complete all steps first"}
            </button>
            <p style={{ fontSize:11, color:G.muted, textAlign:"center", marginTop:10, lineHeight:1.6 }}>
              Platform review takes 2–3 business days. You'll be notified by email.
            </p>
          </>
        )}
      </div>
    </div>
  );
}

const finp = {
  fontSize:13, border:`1.5px solid ${G.greenBorder}`,
  borderRadius:10, padding:"9px 11px",
  outline:"none", color:G.text,
  fontFamily:FONT, boxSizing:"border-box",
};

function Navbar() {
  return (
    <nav style={{
      height:56, background:G.white,
      borderBottom:`1px solid ${G.greenBorder}`,
      boxShadow:"0 2px 12px rgba(110,192,48,0.08)",
      display:"flex", alignItems:"center",
      padding:"0 28px", gap:12,
      position:"sticky", top:0, zIndex:40,
      overflow:"hidden",
    }}>
      <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", fontFamily:FONT }}>
       <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 65, width: 130, display: "block" }}
              />
            </div>
      </span>
      <div style={{ width:1, height:20, background:G.greenBorder }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.greenBorder }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>KYC Verification</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>💼</span>
        <span style={{ fontSize:11, color:G.greenDeep, fontWeight:700 }}>Freelancer</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{
        width:34, height:34, borderRadius:"50%",
        background: G.gradNavy,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white,
        marginLeft:8, fontFamily:FONT,
        boxShadow:"0 2px 8px rgba(15,26,59,0.28)",
      }}>AJ</div>
    </nav>
  );
}