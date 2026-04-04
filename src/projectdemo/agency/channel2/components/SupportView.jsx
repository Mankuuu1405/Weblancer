import { useState } from "react";

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
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";

const dummyTickets = [
  { id:"SUP-20260310-0891", title:"Team member access issue", category:"Team & Access", description:"Dev Mike is unable to access the project files section. Getting a 403 error since yesterday.", urgency:"high", status:"resolved", createdAt:"Mar 10, 2026 · 10:00 AM", resolvedAt:"Mar 11, 2026", by:"Raj Kumar", document:null, adminReply:{ by:"Platform Support", at:"Mar 10, 2026 · 2:30 PM", message:"Hi Raj, we have reviewed Dev Mike's access permissions. The issue was a role mismatch after a recent system update. It has been corrected. Dev Mike should now have full access to project files. Please confirm." } },
  { id:"SUP-20260312-1042", title:"Contract or scope question", category:"Contract & Scope", description:"Need clarification on whether the restaurant management dashboard is within the original scope or requires a separate agreement.", urgency:"normal", status:"open", createdAt:"Mar 12, 2026 · 3:00 PM", resolvedAt:null, by:"Raj Kumar", document:null, adminReply:null },
  { id:"SUP-20260313-1150", title:"Milestone deadline extension request", category:"Milestone & Deadline", description:"Requesting a 3-day extension on Milestone 2 due to API integration complexity. Team needs until March 18 instead of March 15.", urgency:"emergency", status:"under_review", createdAt:"Mar 13, 2026 · 11:50 AM", resolvedAt:null, by:"Raj Kumar", document:null, adminReply:null },
];

const categories = ["Team & Access","Contract & Scope","Milestone & Deadline","Payment Issue","Technical Problem","Policy Clarification","Other"];
const callTypes   = ["Video Call","Audio Call","Screen Share Session"];

const URGENCY = {
  normal:    { label:"Normal",    bg:G.bg,      border:G.border,       text:G.muted    },
  high:      { label:"High",      bg:G.amberBg, border:G.amberBorder,  text:G.amberText},
  emergency: { label:"Emergency", bg:G.redBg,   border:G.redBorder,    text:G.redText  },
};
const STATUS = {
  open:         { label:"Open",         bg:G.amberBg, border:G.amberBorder, text:G.amberText  },
  under_review: { label:"Under Review", bg:G.blueBg,  border:G.blueBorder,  text:G.blueText   },
  resolved:     { label:"Resolved",     bg:G.greenBg, border:G.greenBorder, text:G.greenDeep  },
  closed:       { label:"Closed",       bg:G.bg,      border:G.border,      text:G.muted      },
};
const CATEGORY_ICON = {
  "Team & Access":"👥","Contract & Scope":"📋","Milestone & Deadline":"🏁",
  "Payment Issue":"💳","Technical Problem":"⚙️","Policy Clarification":"📜","Other":"💬",
};

const inputSty = { width:"100%", fontSize:13, fontFamily:FONT, border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"9px 14px", background:G.white, color:G.text, outline:"none", boxSizing:"border-box" };
const labelSty = { fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:6 };

function Chip({ bg, border, text, children }) {
  return <span style={{ fontSize:10, fontWeight:700, background:bg, color:text, border:`1px solid ${border}`, padding:"2px 9px", borderRadius:99, fontFamily:FONT, whiteSpace:"nowrap" }}>{children}</span>;
}

function pillBtn(primary = false, disabled = false) {
  return {
    display:"inline-flex", alignItems:"center", gap:6,
    fontSize:12, fontWeight:700, fontFamily:FONT,
    padding:"7px 14px", borderRadius:100, cursor:disabled?"not-allowed":"pointer",
    whiteSpace:"nowrap",
    ...(primary
      ? { background:disabled?G.border:G.gradNavy, color:disabled?G.muted:G.white, border:"none", boxShadow:disabled?"none":"0 3px 10px rgba(15,26,59,0.2)", opacity:disabled?0.5:1 }
      : { background:G.white, color:G.sub, border:`1px solid ${G.greenBorder}` }),
  };
}

function ModalShell({ title, subtitle, onClose, children, footer }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(15,26,59,0.45)", backdropFilter:"blur(4px)", padding:16, fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:20, boxShadow:"0 32px 80px rgba(15,26,59,0.22)", width:"100%", maxWidth:480, display:"flex", flexDirection:"column", maxHeight:"90vh", overflow:"hidden" }}>
        {/* Header */}
        <div style={{ padding:"16px 20px", background:G.gradNavy, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <p style={{ fontSize:14, fontWeight:800, color:G.white, margin:"0 0 3px" }}>{title}</p>
            {subtitle && <p style={{ fontSize:11, color:"rgba(255,255,255,0.45)", margin:0 }}>{subtitle}</p>}
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)", fontSize:13 }}>✕</button>
        </div>
        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:20 }}>{children}</div>
        {/* Footer */}
        {footer && (
          <div style={{ padding:"12px 20px", borderTop:`1px solid ${G.greenBorder}`, background:G.bg, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:10, flexShrink:0, flexWrap:"wrap" }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── Ticket Card ── */
function TicketCard({ ticket, isExpanded, onToggle }) {
  const u = URGENCY[ticket.urgency] || URGENCY.normal;
  const s = STATUS[ticket.status]   || STATUS.open;
  const cardBorder = ticket.urgency==="emergency" ? G.redBorder : ticket.urgency==="high" ? G.amberBorder : G.greenBorder;

  return (
    <div style={{ background:G.white, border:`1px solid ${cardBorder}`, borderRadius:14, overflow:"hidden", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      {/* Always-visible header */}
      <div style={{ padding:"12px 16px", cursor:"pointer", transition:"background 0.1s" }}
        onClick={onToggle}
        onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
        onMouseLeave={e => e.currentTarget.style.background = "transparent"}
      >
        {/* Title row */}
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:6 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:8, flex:1, minWidth:0 }}>
            <span style={{ fontSize:16, flexShrink:0 }}>{CATEGORY_ICON[ticket.category] || "🎫"}</span>
            <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, lineHeight:1.4, overflow:"hidden", textOverflow:"ellipsis", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>{ticket.title}</p>
          </div>
          {/* Badges — wrap on small screens */}
          <div style={{ display:"flex", alignItems:"center", gap:6, flexShrink:0, flexWrap:"wrap", justifyContent:"flex-end" }}>
            <Chip bg={u.bg} border={u.border} text={u.text}>{u.label}</Chip>
            <Chip bg={s.bg} border={s.border} text={s.text}>{s.label}</Chip>
            <svg style={{ width:13, height:13, color:G.muted, transform:isExpanded?"rotate(180deg)":"rotate(0deg)", transition:"transform 0.2s", flexShrink:0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </div>
        </div>
        <p style={{ fontSize:11, color:G.muted, margin:"0 0 6px" }}>{ticket.id} · {ticket.createdAt}</p>
        <p style={{ fontSize:12, color:G.sub, margin:0, lineHeight:1.6 }}>{ticket.description}</p>
        {ticket.status==="resolved" && ticket.resolvedAt && (
          <p style={{ fontSize:11, color:G.greenDeep, fontWeight:700, marginTop:6 }}>✓ Resolved on {ticket.resolvedAt}</p>
        )}
      </div>

      {/* Expanded content */}
      {isExpanded && (
        <div style={{ borderTop:`1px solid ${G.greenBorder}` }}>
          {ticket.adminReply ? (
            <div style={{ padding:"12px 16px", background:G.greenBg, borderLeft:`4px solid ${G.green}` }}>
              <p style={{ fontSize:11, fontWeight:800, color:G.greenDeep, margin:"0 0 6px" }}>🛡️ {ticket.adminReply.by} · {ticket.adminReply.at}</p>
              <p style={{ fontSize:13, color:G.text, margin:0, lineHeight:1.7 }}>{ticket.adminReply.message}</p>
            </div>
          ) : (
            <div style={{ padding:"12px 16px", background:G.bg }}>
              <p style={{ fontSize:11, color:G.muted, fontStyle:"italic", margin:0 }}>No admin response yet. We typically respond within 24 hours.</p>
            </div>
          )}
          {/* Meta footer */}
          <div style={{ padding:"10px 16px", borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", gap:16, background:G.white, flexWrap:"wrap" }}>
            {[
              { label: ticket.category },
              { label: `Raised by ${ticket.by}` },
            ].map(({ label }) => (
              <span key={label} style={{ fontSize:11, color:G.muted }}>{label}</span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ── New Request Modal ── */
function NewRequestModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({ title:"", category:"", description:"", urgency:"normal", document:null });
  const [step, setStep] = useState(1);
  const update  = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const isValid = !!(form.title && form.category && form.description);

  return (
    <ModalShell title="New Support Request" subtitle={`Step ${step} of 2 — ${step===1?"Details":"Review & Submit"}`} onClose={onClose}
      footer={<>
        <button onClick={step===1 ? onClose : () => setStep(1)} style={pillBtn()}>
          {step===1 ? "Cancel" : "Back"}
        </button>
        {step===1
          ? <button onClick={() => setStep(2)} disabled={!isValid} style={pillBtn(true, !isValid)}>Review →</button>
          : <button onClick={() => onSubmit(form)} style={pillBtn(true)}>Submit Request ✓</button>
        }
      </>}
    >
      {/* Progress */}
      <div style={{ display:"flex", gap:6, marginBottom:20 }}>
        {[1,2].map(s => <div key={s} style={{ flex:1, height:4, borderRadius:99, background:s<=step?G.green:G.border }} />)}
      </div>

      {step===1 ? (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div>
            <label style={labelSty}>Title <span style={{ color:G.red }}>*</span></label>
            <input type="text" value={form.title} onChange={e => update("title",e.target.value)} placeholder="Brief title of your issue" style={inputSty} />
          </div>
          <div>
            <label style={labelSty}>Category <span style={{ color:G.red }}>*</span></label>
            <select value={form.category} onChange={e => update("category",e.target.value)} style={inputSty}>
              <option value="">Select category</option>
              {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelSty}>Description <span style={{ color:G.red }}>*</span></label>
            <textarea value={form.description} onChange={e => update("description",e.target.value)} placeholder="Describe your issue in detail..." rows={4} style={{ ...inputSty, resize:"none" }} />
          </div>
          {/* Urgency */}
          <div>
            <label style={labelSty}>Urgency Level</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {Object.entries(URGENCY).map(([key, val]) => (
                <button key={key} onClick={() => update("urgency", key)} style={{ flex:"1 1 80px", padding:"8px 4px", fontSize:11, fontWeight:700, fontFamily:FONT, borderRadius:10, cursor:"pointer", border:`1.5px solid ${form.urgency===key?val.border:G.greenBorder}`, background:form.urgency===key?val.bg:G.white, color:form.urgency===key?val.text:G.muted }}>
                  {key==="emergency"?"🚨":key==="high"?"🔴":"⚪"} {val.label}
                </button>
              ))}
            </div>
            {form.urgency==="emergency" && (
              <p style={{ fontSize:11, color:G.redText, marginTop:6 }}>⚠ Emergency tickets are escalated immediately to senior admins.</p>
            )}
          </div>
          {/* Upload */}
          <div>
            <label style={labelSty}>Upload Document <span style={{ fontWeight:400, textTransform:"none" }}>(optional)</span></label>
            <label style={{ display:"flex", alignItems:"center", gap:12, border:`1.5px dashed ${G.greenBorder}`, borderRadius:10, padding:"12px 16px", cursor:"pointer", background:G.greenBg, flexWrap:"wrap" }}>
              <svg style={{ width:18, height:18, color:G.muted, flexShrink:0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/>
              </svg>
              <span style={{ fontSize:12, color:form.document?G.greenDeep:G.muted, fontWeight:form.document?700:400 }}>
                {form.document ? `✓ ${form.document}` : "Click to upload screenshot or document"}
              </span>
              <input type="file" style={{ display:"none" }} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" onChange={e => { if(e.target.files[0]) update("document",e.target.files[0].name); }} />
            </label>
          </div>
        </div>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:16 }}>
            <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:12, flexWrap:"wrap", gap:8 }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0, flex:1 }}>{form.title}</p>
              <Chip bg={URGENCY[form.urgency].bg} border={URGENCY[form.urgency].border} text={URGENCY[form.urgency].text}>{URGENCY[form.urgency].label}</Chip>
            </div>
            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              <div><span style={{ fontSize:10, color:G.muted }}>Category</span><p style={{ fontSize:13, color:G.text, margin:"2px 0 0" }}>{form.category}</p></div>
              <div><span style={{ fontSize:10, color:G.muted }}>Description</span><p style={{ fontSize:13, color:G.text, margin:"2px 0 0", lineHeight:1.6 }}>{form.description}</p></div>
              {form.document && <div><span style={{ fontSize:10, color:G.muted }}>Attachment</span><p style={{ fontSize:13, color:G.blueText, margin:"2px 0 0" }}>📎 {form.document}</p></div>}
            </div>
          </div>
          <div style={{ background:G.amberBg, border:`1px solid ${G.amberBorder}`, borderRadius:10, padding:"10px 14px" }}>
            <p style={{ fontSize:12, fontWeight:700, color:G.amberText, margin:"0 0 3px" }}>A ticket will be generated</p>
            <p style={{ fontSize:11, color:"#b45309", margin:0 }}>Platform Admin typically responds within 24 hours.</p>
          </div>
        </div>
      )}
    </ModalShell>
  );
}

/* ── Request Call Modal ── */
function RequestCallModal({ onClose }) {
  const [form,      setForm]      = useState({ callType:"", preferredDate:"", preferredTime:"", agenda:"", notes:"" });
  const [submitted, setSubmitted] = useState(false);
  const [hovField,  setHovField]  = useState(null);
  const update  = (k, v) => setForm(p => ({ ...p, [k]: v }));
  const isValid = !!(form.callType && form.preferredDate && form.preferredTime && form.agenda);
  const inp = key => ({ ...inputSty, borderColor: hovField===key ? G.green : G.greenBorder, transition:"border-color 0.12s" });

  if (submitted) return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(15,26,59,0.45)", backdropFilter:"blur(4px)", padding:16, fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:20, boxShadow:"0 32px 80px rgba(15,26,59,0.22)", padding:40, textAlign:"center", maxWidth:340, width:"100%" }}>
        <div style={{ width:56, height:56, background:G.greenBg, border:`2px solid ${G.greenBorder}`, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
          <svg style={{ width:28, height:28, color:G.greenDeep }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
        </div>
        <p style={{ fontSize:14, fontWeight:800, color:G.text, margin:"0 0 6px" }}>Call Request Submitted!</p>
        <p style={{ fontSize:12, color:G.muted, margin:"0 0 20px", lineHeight:1.6 }}>Platform Admin will confirm your {form.callType} request within 24 hours.</p>
        <button onClick={onClose} style={pillBtn(true)}>Done</button>
      </div>
    </div>
  );

  return (
    <ModalShell title="Request a Call" subtitle="Schedule a call with Platform Support" onClose={onClose}
      footer={<>
        <button onClick={onClose} style={pillBtn()}>Cancel</button>
        <button onClick={() => setSubmitted(true)} disabled={!isValid} style={pillBtn(true, !isValid)}>Submit Request</button>
      </>}
    >
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        {/* Call type — wraps on small screens */}
        <div>
          <label style={labelSty}>Call Type <span style={{ color:G.red }}>*</span></label>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
            {callTypes.map(type => (
              <button key={type} onClick={() => update("callType", type)} style={{ flex:"1 1 80px", padding:"8px 6px", fontSize:11, fontWeight:700, fontFamily:FONT, borderRadius:10, cursor:"pointer", border:`1.5px solid ${form.callType===type?G.green:G.greenBorder}`, background:form.callType===type?G.greenBg:G.white, color:form.callType===type?G.greenDeep:G.muted, whiteSpace:"nowrap" }}>
                {type==="Video Call"?"📹":type==="Audio Call"?"📞":"🖥️"} {type}
              </button>
            ))}
          </div>
        </div>
        {/* Date + Time — responsive grid */}
        <div style={{ display:"grid", gridTemplateColumns:"repeat(auto-fit, minmax(140px, 1fr))", gap:12 }}>
          <div>
            <label style={labelSty}>Preferred Date <span style={{ color:G.red }}>*</span></label>
            <input type="date" value={form.preferredDate} onChange={e => update("preferredDate",e.target.value)} style={inp("date")} onFocus={() => setHovField("date")} onBlur={() => setHovField(null)} />
          </div>
          <div>
            <label style={labelSty}>Preferred Time <span style={{ color:G.red }}>*</span></label>
            <input type="time" value={form.preferredTime} onChange={e => update("preferredTime",e.target.value)} style={inp("time")} onFocus={() => setHovField("time")} onBlur={() => setHovField(null)} />
          </div>
        </div>
        <div>
          <label style={labelSty}>Agenda <span style={{ color:G.red }}>*</span></label>
          <textarea value={form.agenda} onChange={e => update("agenda",e.target.value)} placeholder="What would you like to discuss?" rows={3} style={{ ...inp("agenda"), resize:"none" }} onFocus={() => setHovField("agenda")} onBlur={() => setHovField(null)} />
        </div>
        <div>
          <label style={labelSty}>Additional Notes <span style={{ fontWeight:400, textTransform:"none" }}>(optional)</span></label>
          <textarea value={form.notes} onChange={e => update("notes",e.target.value)} placeholder="Any context or documents to share..." rows={2} style={{ ...inp("notes"), resize:"none" }} onFocus={() => setHovField("notes")} onBlur={() => setHovField(null)} />
        </div>
        <div style={{ background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:10, padding:"10px 14px" }}>
          <p style={{ fontSize:11, color:G.blueText, margin:0 }}>Platform Support will confirm availability and send a meeting link within 24 hours.</p>
        </div>
      </div>
    </ModalShell>
  );
}

/* ── History Modal ── */
function HistoryModal({ tickets, onClose }) {
  return (
    <ModalShell title="Support History" subtitle={`${tickets.length} resolved tickets`} onClose={onClose}
      footer={<button onClick={onClose} style={pillBtn()}>Close</button>}
    >
      {tickets.length === 0 ? (
        <p style={{ fontSize:13, color:G.muted, textAlign:"center", padding:"24px 0" }}>No resolved tickets yet</p>
      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {tickets.map(t => (
            <div key={t.id} style={{ border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:"12px 16px", background:G.greenBg }}>
              <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:4, flexWrap:"wrap" }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, flex:1 }}>{t.title}</p>
                <Chip bg={G.greenBg} border={G.greenBorder} text={G.greenDeep}>Resolved</Chip>
              </div>
              <p style={{ fontSize:11, color:G.muted, margin:"0 0 3px" }}>{t.id} · {t.createdAt}</p>
              <p style={{ fontSize:11, color:G.greenDeep, fontWeight:700, margin:0 }}>✓ Resolved on {t.resolvedAt}</p>
            </div>
          ))}
        </div>
      )}
    </ModalShell>
  );
}

/* ══════════════════════════════════════════════════════════
   MAIN EXPORT
══════════════════════════════════════════════════════════ */
export default function SupportView() {
  const [tickets,        setTickets]        = useState(dummyTickets);
  const [activeTab,      setActiveTab]      = useState("active");
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showCallModal,  setShowCallModal]  = useState(false);
  const [showHistory,    setShowHistory]    = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);

  const activeTickets  = tickets.filter(t => t.status !== "resolved" && t.status !== "closed");
  const historyTickets = tickets.filter(t => t.status === "resolved"  || t.status === "closed");
  const displayTickets = activeTab === "active" ? activeTickets : historyTickets;

  const handleNewRequest = data => {
    setTickets(prev => [{
      id:`SUP-${Date.now()}`, ...data, status:"open",
      createdAt:new Date().toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}),
      resolvedAt:null, by:"Raj Kumar", adminReply:null,
    }, ...prev]);
    setShowNewRequest(false);
  };

  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        input, select, textarea { outline: none; font-family: 'Poppins', sans-serif; }
        textarea { resize: none; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: ${G.greenBorder}; border-radius: 10px; }
      `}</style>

      {/* ── Header — wraps on small screens ── */}
      <div style={{ padding:"12px 16px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", gap:10, flexShrink:0, boxShadow:"0 2px 8px rgba(110,192,48,0.07)", flexWrap:"wrap" }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:2 }}>
            <span style={{ fontSize:18 }}>🎫</span>
            <p style={{ fontSize:14, fontWeight:800, color:G.text, margin:0 }}>Support</p>
          </div>
          <p style={{ fontSize:11, color:G.muted, margin:0 }}>{activeTickets.length} active · {historyTickets.length} resolved</p>
        </div>
        {/* Action buttons — wrap on narrow screens */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          <button onClick={() => setShowHistory(true)}    style={pillBtn()}>
            <svg style={{ width:13, height:13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
            History
          </button>
          <button onClick={() => setShowCallModal(true)}  style={pillBtn()}>
            <svg style={{ width:13, height:13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
            Request Call
          </button>
          <button onClick={() => setShowNewRequest(true)} style={pillBtn(true)}>
            <svg style={{ width:13, height:13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
            New Request
          </button>
        </div>
      </div>

      {/* ── Tabs ── */}
      <div style={{ display:"flex", borderBottom:`2px solid ${G.greenBorder}`, background:G.white, padding:"0 16px", flexShrink:0, overflowX:"auto" }}>
        {[
          { id:"active",   label:"Active",   count:activeTickets.length  },
          { id:"resolved", label:"Resolved", count:historyTickets.length },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{
            display:"flex", alignItems:"center", gap:7, padding:"10px 4px",
            marginRight:20, fontSize:13, fontWeight:700, fontFamily:FONT,
            border:"none", cursor:"pointer", background:"none", whiteSpace:"nowrap",
            borderBottom:`2px solid ${activeTab===tab.id ? G.green : "transparent"}`,
            color:activeTab===tab.id ? G.greenDeep : G.muted,
            marginBottom:-2, transition:"color 0.15s",
          }}>
            {tab.label}
            <span style={{ fontSize:10, fontWeight:800, background:activeTab===tab.id?G.greenBg:G.bg, color:activeTab===tab.id?G.greenDeep:G.muted, border:`1px solid ${activeTab===tab.id?G.greenBorder:G.border}`, padding:"1px 7px", borderRadius:99 }}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* ── Tickets list ── */}
      <div style={{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12, background:G.bg }}>
        {displayTickets.length === 0 ? (
          <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"32px 20px", textAlign:"center" }}>
            <div style={{ width:44, height:44, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, margin:"0 auto 10px" }}>◎</div>
            <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>No {activeTab} tickets</p>
            <p style={{ fontSize:11, color:G.muted, margin:0 }}>{activeTab==="active" ? "All issues resolved!" : "No resolved tickets yet"}</p>
          </div>
        ) : displayTickets.map(ticket => (
          <TicketCard key={ticket.id} ticket={ticket} isExpanded={expandedTicket===ticket.id} onToggle={() => setExpandedTicket(expandedTicket===ticket.id ? null : ticket.id)} />
        ))}
      </div>

      {showNewRequest && <NewRequestModal onClose={() => setShowNewRequest(false)} onSubmit={handleNewRequest} />}
      {showCallModal  && <RequestCallModal onClose={() => setShowCallModal(false)} />}
      {showHistory    && <HistoryModal tickets={historyTickets} onClose={() => setShowHistory(false)} />}
    </div>
  );
}