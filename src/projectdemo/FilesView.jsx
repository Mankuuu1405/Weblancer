import { useState } from "react";

/* ── Freelancer Contracts theme tokens ───────────────────────
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
  gradGreen:   "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  amberText:   "#92400e",
};
const FONT = "'Poppins', sans-serif";

/* ── Button styles ── */
const btnNavy   = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradNavy,color:G.white,border:"none",borderRadius:100,padding:"8px 16px",cursor:"pointer",boxShadow:"0 3px 12px rgba(15,26,59,0.25)",whiteSpace:"nowrap" };
const btnOutline= { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.greenBg,color:G.greenDeep,border:`1px solid ${G.greenBorder}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",whiteSpace:"nowrap" };

/* ── Data ── */
const milestones = [
  {
    id: 1,
    label: "MILESTONE 1: DESIGN & PLANNING",
    status: null,
    files: [
      { id:1, name:"wireframes_v2.pdf",     type:"pdf", icon:"doc",     status:"APPROVED", uploadedBy:"Sara M. (freelancer)", date:"Mar 11, 4:20 PM", version:"Version 2 of 2", replaces:"wireframes_v1.pdf",  note:"Updated screens 5 and 9 per meeting notes", hasHistory:true,  older:false },
      { id:2, name:"wireframes_v1.pdf",     type:"pdf", icon:"doc",     status:"REPLACED", uploadedBy:"Sara M. (freelancer)", date:"Mar 9, 2:00 PM",  version:"Version 1 of 2", replaces:null,                note:null,                                        hasHistory:true,  older:true  },
      { id:3, name:"design_system.fig",     type:"fig", icon:"palette", status:"APPROVED", uploadedBy:"Sara M. (freelancer)", date:"Mar 10, 11:00 AM",version:"Version 1 of 1", replaces:null,                note:null,                                        hasHistory:false, older:false },
      { id:4, name:"tech_architecture.pdf", type:"pdf", icon:"doc",     status:"APPROVED", uploadedBy:"Sara M. (freelancer)", date:"Mar 8, 3:30 PM",  version:"Version 1 of 1", replaces:null,                note:null,                                        hasHistory:false, older:false },
    ],
  },
  { id:2, label:"MILESTONE 2: CORE DEVELOPMENT",  status:"IN PROGRESS", files:[] },
  { id:3, label:"MILESTONE 3: ADVANCED FEATURES",  status:null,          files:[] },
  { id:4, label:"MILESTONE 4: TESTING & LAUNCH",   status:null,          files:[] },
];

const projectDocs = [
  { id:1, name:"Contract.pdf (signed)", icon:"doc" },
  { id:2, name:"NDA.pdf (signed)",      icon:"doc" },
];

/* ── SVG Icons ── */
const IconUpload   = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>);
const IconDownload = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const IconEye      = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>);
const IconHistory  = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>);
const IconRequest  = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="12" y1="18" x2="12" y2="12"/><line x1="9" y1="15" x2="15" y2="15"/></svg>);
const IconDoc      = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke={G.muted} strokeWidth="1.5"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const IconPalette  = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5"><circle cx="12" cy="12" r="10"/><circle cx="8" cy="14" r="1.5" fill="#ef4444" stroke="none"/><circle cx="12" cy="8" r="1.5" fill="#3b82f6" stroke="none"/><circle cx="16" cy="14" r="1.5" fill="#22c55e" stroke="none"/></svg>);

/* ── File Row ── */
function FileRow({ file }) {
  const [hov, setHov] = useState(null);

  const actionBtn = (label, icon, key) => (
    <button key={key}
      onMouseEnter={() => setHov(key)} onMouseLeave={() => setHov(null)}
      style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:600, fontFamily:FONT, padding:"6px 12px", borderRadius:8, cursor:"pointer", transition:"all 0.12s", border:`1px solid ${hov===key?G.green:G.greenBorder}`, background:hov===key?G.greenBg:G.white, color:hov===key?G.greenDeep:G.sub }}>
      {icon}{label}
    </button>
  );

  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"14px 18px", opacity:file.older?0.72:1, boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:12 }}>
        {/* Icon */}
        <div style={{ marginTop:2, flexShrink:0 }}>
          {file.icon === "palette" ? <IconPalette /> : <IconDoc />}
        </div>

        {/* Info */}
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:13, fontWeight:700, color:G.text }}>{file.name}</span>

            {file.status === "APPROVED" && (
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:800, background:G.gradGreen, color:G.white, padding:"2px 10px", borderRadius:99 }}>✓ APPROVED</span>
            )}
            {file.status === "REPLACED" && (
              <span style={{ fontSize:10, fontWeight:700, background:G.bg, color:G.muted, border:`1px solid ${G.border}`, padding:"2px 9px", borderRadius:6 }}>REPLACED</span>
            )}
          </div>

          <p style={{ fontSize:11, color:G.muted, margin:"0 0 2px" }}>Uploaded by: {file.uploadedBy} · {file.date}</p>
          <p style={{ fontSize:11, color:G.muted, margin:0 }}>
            {file.version}
            {file.replaces && <span> · Replaces: {file.replaces}</span>}
          </p>

          {file.note && (
            <p style={{ fontSize:11, color:G.sub, fontStyle:"italic", marginTop:5 }}>"{file.note}"</p>
          )}
          {file.older && (
            <p style={{ fontSize:11, color:G.amberText, fontWeight:600, marginTop:5, display:"flex", alignItems:"center", gap:4 }}>⚠ Older version</p>
          )}

          {/* Action buttons */}
          <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:12 }}>
            {actionBtn("Preview",      <IconEye />,     "preview")}
            {actionBtn("Download",     <IconDownload />, "download")}
            {file.hasHistory && actionBtn("View History", <IconHistory />, "history")}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export default function FilesView() {
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.bg, fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>

      {/* ── Header ── */}
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:10, padding:"14px 22px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, flexShrink:0, boxShadow:"0 2px 8px rgba(110,192,48,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>📁</span>
          <h2 style={{ fontSize:15, fontWeight:800, color:G.text, margin:0 }}>Project Files</h2>
        </div>
        <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:8 }}>
          <button style={btnOutline}><IconUpload /> Upload File</button>
          <button style={btnNavy}><IconRequest /> Request Deliverable</button>
        </div>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 22px", display:"flex", flexDirection:"column", gap:28 }}>

        {/* Milestones */}
        {milestones.map(ms => (
          <div key={ms.id}>
            {/* Section label */}
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:G.muted }}>{ms.label}</span>
              {ms.status && (
                <span style={{ fontSize:11, fontWeight:700, color:G.navyLight }}>({ms.status})</span>
              )}
            </div>

            {/* Files or empty state */}
            {ms.files.length === 0 ? (
              <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"14px 18px", display:"flex", alignItems:"center", gap:10 }}>
                <span style={{ fontSize:18 }}>📦</span>
                <span style={{ fontSize:13, color:G.muted }}>No files submitted yet for this milestone.</span>
              </div>
            ) : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {ms.files.map(file => <FileRow key={file.id} file={file} />)}
              </div>
            )}
          </div>
        ))}

        {/* Project Documents */}
        <div>
          <div style={{ marginBottom:12 }}>
            <span style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:G.muted }}>Project Documents</span>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {projectDocs.map(doc => (
              <div key={doc.id} style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"12px 18px", display:"flex", alignItems:"center", gap:12, boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
                <IconDoc />
                <span style={{ fontSize:13, fontWeight:600, color:G.text, flex:1 }}>{doc.name}</span>
                <button style={btnOutline}>View</button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ height:16 }} />
      </div>
    </div>
  );
}