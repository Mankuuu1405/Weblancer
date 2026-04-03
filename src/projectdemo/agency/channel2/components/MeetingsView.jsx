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
 
// ── Shared button styles ──
const btnNavy = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradNavy,color:G.white,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",boxShadow:"0 3px 12px rgba(15,26,59,0.25)",whiteSpace:"nowrap" };
const btnGreen= { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradGreen,color:G.white,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",boxShadow:"0 2px 10px rgba(46,125,31,0.22)",whiteSpace:"nowrap" };
const btnOutline={ display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.greenBg,color:G.greenDeep,border:`1px solid ${G.greenBorder}`,borderRadius:100,padding:"8px 18px",cursor:"pointer",whiteSpace:"nowrap" };
 
const labelSty = { fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:6 };
const inputSty = { width:"100%", border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"9px 14px", fontSize:13, fontFamily:FONT, color:G.text, background:G.white, outline:"none", boxSizing:"border-box" };
const badgeSty = { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, padding:"4px 12px", borderRadius:99 };
const STATUS_BADGE = {
  confirmed:   <span style={{ ...badgeSty, background:G.greenBg,  color:G.greenDeep, border:`1px solid ${G.greenBorder}` }}>✓ Confirmed</span>,
  pending:     <span style={{ ...badgeSty, background:G.amberBg,  color:G.amberText, border:`1px solid ${G.amberBorder}` }}>⏳ Pending</span>,
  rescheduled: <span style={{ ...badgeSty, background:G.blueBg,   color:G.blueText,  border:`1px solid ${G.blueBorder}`  }}>↻ Rescheduled</span>,
  completed:   <span style={{ ...badgeSty, background:G.bg,       color:G.sub,       border:`1px solid ${G.border}`      }}>✓ Completed</span>,
  cancelled:   <span style={{ ...badgeSty, background:G.redBg,    color:G.redText,   border:`1px solid ${G.redBorder}`   }}>✕ Cancelled</span>,
};
 
const actionBtnSty = { display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:600, fontFamily:FONT, background:G.white, color:G.sub, border:`1px solid ${G.greenBorder}`, padding:"6px 14px", borderRadius:8, cursor:"pointer" };
 
const dummyMeetings = {
  upcoming: [
    { id:"m1", title:"Project Discussion — Milestone 2 progress check and demo review", date:"Mar 20, 2026", time:"2:00 PM IST", duration:60, status:"confirmed", participants:["Raj Kumar","Sara M.","Platform Admin"], purpose:"Progress Review", agenda:"1. Review Backend API progress\n2. Demo payment integration\n3. Discuss blockers\n4. Set next milestone targets", notes:"Please prepare your progress updates before the meeting.", history:[] },
    { id:"m2", title:"Requirement Clarification — Clarify payment flow requirements", date:"Mar 25, 2026", time:"11:00 AM EST", duration:30, status:"rescheduled", participants:["Sara M.","Dev Mike"], purpose:"Requirement Clarification", agenda:"1. Payment gateway options\n2. Checkout flow UX", notes:"", history:[{ action:"rescheduled", by:"Raj Kumar", at:"Mar 12, 2026 · 10:00 AM", reason:"Rescheduled from Mar 18 to Mar 25 due to team availability." }] },
  ],
  past: [
    { id:"p1", title:"Delivery Review — Feb 18, 2026", date:"Feb 18, 2026", time:"2:00 PM IST", duration:43, status:"completed", participants:["Raj Kumar","Sara M."], summary:"Team reviewed Milestone 1 deliverables. All wireframes approved. Sara committed to delivering updated screens by Feb 20.", history:[] },
  ],
  cancelled: [
    { id:"c1", title:"Sprint Planning — Week 2 kickoff", originalDate:"Mar 8, 2026", originalTime:"10:00 AM IST", cancelledBy:"Raj Kumar", cancelledAt:"Mar 7, 2026 · 9:00 PM", reason:"Agency admin unavailable due to client emergency.", participants:["Raj Kumar","Sara M.","Dev Mike","Priya S."] },
    { id:"c2", title:"Design Review — Mobile screens walkthrough", originalDate:"Mar 10, 2026", originalTime:"3:00 PM IST", cancelledBy:"Priya S.", cancelledAt:"Mar 10, 2026 · 1:30 PM", reason:"Design files not ready. Meeting postponed to next week.", participants:["Raj Kumar","Priya S."] },
  ],
};
 
const purposeIcons = { "Progress Review":"💬", "Requirement Clarification":"🔍", "Delivery Review":"📦", "Team Sync":"👥", "Kickoff Meeting":"🚀", "Issue Resolution":"⚡" };
 
function ModalShell({ title, subtitle, maxWidth=440, onClose, children, footer }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(15,26,59,0.45)", backdropFilter:"blur(4px)", padding:16, fontFamily:FONT }}>
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:20, width:"100%", maxWidth, display:"flex", flexDirection:"column", maxHeight:"90vh", overflow:"hidden", boxShadow:"0 32px 80px rgba(15,26,59,0.22)" }}>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.gradNavy, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div>
            <span style={{ fontSize:14, fontWeight:800, color:G.white, display:"block" }}>{title}</span>
            {subtitle && <span style={{ fontSize:11, color:"rgba(255,255,255,0.45)", fontWeight:500 }}>{subtitle}</span>}
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.08)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)", fontSize:13 }}>✕</button>
        </div>
        <div style={{ padding:20, overflowY:"auto", flex:1 }}>{children}</div>
        {footer && (
          <div style={{ padding:"14px 20px", borderTop:`1px solid ${G.greenBorder}`, background:G.bg, display:"flex", justifyContent:"flex-end", gap:10, flexShrink:0, flexWrap:"wrap" }}>{footer}</div>
        )}
      </div>
    </div>
  );
}
 
function CancelModal({ meeting, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  return (
    <ModalShell title="Cancel Meeting" subtitle={meeting.title} onClose={onClose} footer={<>
      <button onClick={onClose} style={btnOutline}>Keep Meeting</button>
      <button onClick={() => onConfirm(meeting, reason)} style={{ ...btnNavy, background:G.redText, boxShadow:"none" }}>Yes, Cancel</button>
    </>}>
      <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
        <div style={{ background:G.amberBg, border:`1px solid ${G.amberBorder}`, borderRadius:10, padding:"10px 14px", display:"flex", gap:8 }}>
          <span>⚠️</span>
          <p style={{ fontSize:11, fontWeight:700, color:G.amberText, margin:0 }}>This will be permanently recorded in the cancelled meetings log.</p>
        </div>
        <div>
          <label style={labelSty}>Reason for cancellation</label>
          <textarea value={reason} onChange={e => setReason(e.target.value)} placeholder="Why is this meeting being cancelled?" rows={3} style={{ ...inputSty, resize:"none" }} />
        </div>
      </div>
    </ModalShell>
  );
}
 
function AgendaModal({ meeting, onClose }) {
  return (
    <ModalShell title="Meeting Agenda" subtitle={`${meeting.date} · ${meeting.time}`} onClose={onClose} footer={<button onClick={onClose} style={btnOutline}>Close</button>}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <p style={{ fontSize:16, fontWeight:800, color:G.text, margin:0 }}>{meeting.title}</p>
        <div><p style={labelSty}>Purpose</p><p style={{ fontSize:13, color:G.text, margin:0 }}>{meeting.purpose}</p></div>
        <div><p style={labelSty}>Participants</p><p style={{ fontSize:13, color:G.text, margin:0 }}>{meeting.participants.join(", ")}</p></div>
        {meeting.agenda && <div><p style={labelSty}>Agenda</p><p style={{ fontSize:13, color:G.text, margin:0, whiteSpace:"pre-line" }}>{meeting.agenda}</p></div>}
        {meeting.notes && (
          <div style={{ background:G.amberBg, border:`1px solid ${G.amberBorder}`, borderRadius:10, padding:14 }}>
            <p style={{ fontSize:10, fontWeight:700, color:G.amberText, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 4px" }}>Notes for participants</p>
            <p style={{ fontSize:12, color:G.sub, fontStyle:"italic", margin:0 }}>{meeting.notes}</p>
          </div>
        )}
      </div>
    </ModalShell>
  );
}
 
function SummaryModal({ meeting, onClose }) {
  return (
    <ModalShell title="Meeting Summary" subtitle={`${meeting.date} · ${meeting.duration} min`} onClose={onClose} footer={<>
      <button onClick={onClose} style={btnOutline}>Close</button>
      <button style={btnNavy}>Download PDF</button>
    </>}>
      <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
        <p style={{ fontSize:16, fontWeight:800, color:G.text, margin:0 }}>{meeting.title}</p>
        <p style={{ fontSize:12, color:G.muted, margin:0 }}>Participants: {meeting.participants.join(", ")}</p>
        <div style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:14, padding:16 }}>
          <p style={{ fontSize:13, color:G.text, lineHeight:1.6, margin:0 }}>{meeting.summary}</p>
        </div>
      </div>
    </ModalShell>
  );
}
 
export function MeetingsView({ participants }) {
  const [meetings,       setMeetings]       = useState(dummyMeetings);
  const [showSchedule,   setShowSchedule]   = useState(false);
  const [showAgenda,     setShowAgenda]     = useState(null);
  const [showSummary,    setShowSummary]    = useState(null);
  const [editMeeting,    setEditMeeting]    = useState(null);
  const [showCancelModal,setShowCancelModal]= useState(null);
  const [activeTab,      setActiveTab]      = useState("upcoming");
 
  const handleCancel = (meeting, reason) => {
    setMeetings(prev => ({
      ...prev,
      upcoming: prev.upcoming.filter(m => m.id !== meeting.id),
      cancelled: [{ id:meeting.id, title:meeting.title, originalDate:meeting.date, originalTime:meeting.time, cancelledBy:"Raj Kumar", cancelledAt:new Date().toLocaleString("en-IN",{day:"numeric",month:"short",year:"numeric",hour:"2-digit",minute:"2-digit"}), reason:reason||"No reason provided.", participants:meeting.participants }, ...prev.cancelled],
    }));
    setShowCancelModal(null);
  };
 
  const handleSchedule = data => {
    setMeetings(prev => ({ ...prev, upcoming:[{ id:`m${Date.now()}`, ...data, status:"pending", history:[] }, ...prev.upcoming] }));
    setShowSchedule(false);
  };
 
  const tabs = [
    { id:"upcoming",  label:"Upcoming",  count:meetings.upcoming.length  },
    { id:"past",      label:"Past",      count:meetings.past.length      },
    { id:"cancelled", label:"Cancelled", count:meetings.cancelled.length },
  ];
 
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.bg, fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:${G.greenBorder};border-radius:10px;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;} textarea{resize:none;}`}</style>
 
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", padding:"14px 16px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, flexShrink:0, gap:10, boxShadow:"0 2px 8px rgba(110,192,48,0.06)", flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, flex:1, minWidth:0 }}>
          <span style={{ fontSize:20, flexShrink:0 }}>📅</span>
          <div style={{ minWidth:0 }}>
            <h2 style={{ fontSize:14, fontWeight:800, color:G.text, margin:0 }}>Meetings</h2>
            <p style={{ fontSize:11, color:G.muted, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>
              {meetings.upcoming.length} upcoming · {meetings.past.length} past · {meetings.cancelled.length} cancelled
            </p>
          </div>
        </div>
        <button onClick={() => setShowSchedule(true)} style={btnNavy}>
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
          <span style={{ display:"none" }}>Schedule </span>New Meeting
        </button>
      </div>
 
      {/* Tabs */}
      <div style={{ display:"flex", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, padding:"0 16px", flexShrink:0, overflowX:"auto" }}>
        {tabs.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={() => setActiveTab(tab.id)}
              style={{ display:"flex", alignItems:"center", gap:8, padding:"11px 14px", background:"none", border:"none", borderBottom:`2px solid ${active?G.greenDeep:"transparent"}`, color:active?G.greenDeep:G.sub, fontWeight:active?700:600, fontSize:13, cursor:"pointer", transition:"all 0.15s", whiteSpace:"nowrap", fontFamily:FONT }}>
              {tab.label}
              <span style={{ background:active?G.greenBg:G.bg, color:active?G.greenDeep:G.muted, padding:"2px 8px", borderRadius:100, fontSize:10, fontWeight:800 }}>{tab.count}</span>
            </button>
          );
        })}
      </div>
 
      {/* Content */}
      <div style={{ flex:1, overflowY:"auto", padding:16, display:"flex", flexDirection:"column", gap:12 }}>
 
        {/* ── Upcoming ── */}
        {activeTab === "upcoming" && (
          meetings.upcoming.length === 0
            ? <div style={{ background:G.white, border:`1px dashed ${G.greenBorder}`, borderRadius:14, padding:32, textAlign:"center" }}>
                <p style={{ fontSize:13, fontWeight:600, color:G.sub, margin:0 }}>No upcoming meetings</p>
                <p style={{ fontSize:11, color:G.muted, margin:"4px 0 0" }}>Schedule one using the button above</p>
              </div>
            : meetings.upcoming.map(m => (
                <div key={m.id} style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"14px 16px", boxShadow:"0 2px 8px rgba(110,192,48,0.04)" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, flexWrap:"wrap", marginBottom:10 }}>
                    <div style={{ flex:1, minWidth:0 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:5 }}>
                        <span style={{ fontSize:16, flexShrink:0 }}>{purposeIcons[m.purpose] || "📅"}</span>
                        <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, lineHeight:1.4 }}>{m.title}</p>
                      </div>
                      <p style={{ fontSize:11, color:G.sub, margin:"0 0 2px 24px", fontWeight:500 }}>{m.date} · {m.time} · {m.duration} min</p>
                      <p style={{ fontSize:11, color:G.muted, margin:"0 0 0 24px" }}>Participants: {m.participants.join(" · ")}</p>
                      {m.history?.length > 0 && (
                        <div style={{ margin:"8px 0 0 24px", display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:600, color:G.blueText, background:G.blueBg, border:`1px solid ${G.blueBorder}`, padding:"4px 10px", borderRadius:8 }}>
                          ↻ Rescheduled {m.history.length}x — {m.history[m.history.length - 1].reason}
                        </div>
                      )}
                    </div>
                    <div style={{ flexShrink:0 }}>{STATUS_BADGE[m.status]}</div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                    {m.status === "confirmed" && (
                      <button style={{ ...actionBtnSty, background:G.gradGreen, color:G.white, border:"none", boxShadow:"0 2px 8px rgba(46,125,31,0.22)" }}>Join</button>
                    )}
                    <button onClick={() => setShowAgenda(m)} style={actionBtnSty}>Agenda</button>
                    <button onClick={() => setEditMeeting(m)} style={actionBtnSty}>Reschedule</button>
                    <button onClick={() => setShowCancelModal(m)} style={{ ...actionBtnSty, color:G.redText, borderColor:G.redBorder, background:G.redBg }}>Cancel</button>
                  </div>
                </div>
              ))
        )}
 
        {/* ── Past ── */}
        {activeTab === "past" && meetings.past.map(m => (
          <div key={m.id} style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"14px 16px" }}>
            <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:12, flexWrap:"wrap" }}>
              <div style={{ flex:1, minWidth:0 }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>{m.title}</p>
                <p style={{ fontSize:11, color:G.muted, margin:0 }}>Duration: {m.duration} min · Participants: {m.participants.length} · Summary: Posted ✓</p>
              </div>
              <div style={{ flexShrink:0 }}>{STATUS_BADGE[m.status]}</div>
            </div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              <button onClick={() => setShowSummary(m)} style={actionBtnSty}>View Summary</button>
              <button style={actionBtnSty}>Download PDF</button>
            </div>
          </div>
        ))}
 
        {/* ── Cancelled ── */}
        {activeTab === "cancelled" && (
          meetings.cancelled.length === 0
            ? <div style={{ background:G.white, border:`1px dashed ${G.greenBorder}`, borderRadius:14, padding:32, textAlign:"center" }}>
                <p style={{ fontSize:13, fontWeight:600, color:G.sub, margin:0 }}>No cancelled meetings</p>
              </div>
            : <>
                <div style={{ display:"flex", alignItems:"center", gap:8, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:10, padding:"10px 14px" }}>
                  <span style={{ color:G.redText, fontSize:14 }}>ℹ</span>
                  <p style={{ fontSize:11, fontWeight:700, color:G.redText, margin:0 }}>Cancelled meetings are kept for audit purposes and cannot be deleted.</p>
                </div>
                {meetings.cancelled.map(m => (
                  <div key={m.id} style={{ background:G.white, border:`1px solid ${G.redBorder}`, borderRadius:14, padding:"14px 16px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:10, marginBottom:12, flexWrap:"wrap" }}>
                      <div style={{ flex:1, minWidth:0 }}>
                        <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>{m.title}</p>
                        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Was: {m.originalDate} · {m.originalTime}</p>
                        <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Participants: {m.participants.join(", ")}</p>
                      </div>
                      <div style={{ flexShrink:0 }}>{STATUS_BADGE["cancelled"]}</div>
                    </div>
                    <div style={{ background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:10, padding:"10px 14px" }}>
                      <p style={{ fontSize:11, fontWeight:700, color:G.redText, margin:"0 0 4px" }}>✕ Cancelled by {m.cancelledBy} on {m.cancelledAt}</p>
                      <p style={{ fontSize:12, color:G.sub, fontStyle:"italic", margin:0 }}>"{m.reason}"</p>
                    </div>
                  </div>
                ))}
              </>
        )}
      </div>
 
      {showSchedule    && <MeetingScheduler participants={participants || []} onClose={() => setShowSchedule(false)}    onSchedule={handleSchedule} />}
      {editMeeting     && <MeetingScheduler participants={participants || []} onClose={() => setEditMeeting(null)}       onSchedule={d => { setMeetings(prev => ({ ...prev, upcoming:prev.upcoming.map(m => m.id===d.id?{...m,...d,status:"rescheduled"}:m) })); setEditMeeting(null); }} existing={editMeeting} />}
      {showAgenda      && <AgendaModal  meeting={showAgenda}      onClose={() => setShowAgenda(null)}      />}
      {showSummary     && <SummaryModal meeting={showSummary}     onClose={() => setShowSummary(null)}     />}
      {showCancelModal && <CancelModal  meeting={showCancelModal} onClose={() => setShowCancelModal(null)} onConfirm={handleCancel} />}
    </div>
  );
}
 
export default MeetingsView;