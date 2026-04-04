import { useState } from "react";

/* ── Freelancer Contracts theme tokens ── */
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
};
const FONT = "'Poppins', sans-serif";

const btnNavy   = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradNavy,color:G.white,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",boxShadow:"0 3px 12px rgba(15,26,59,0.25)",whiteSpace:"nowrap" };
const btnGreen  = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradGreen,color:G.white,border:"none",borderRadius:100,padding:"8px 16px",cursor:"pointer",boxShadow:"0 2px 10px rgba(46,125,31,0.22)",whiteSpace:"nowrap" };
const btnOutline= { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.greenBg,color:G.greenDeep,border:`1px solid ${G.greenBorder}`,borderRadius:8,padding:"7px 14px",cursor:"pointer",whiteSpace:"nowrap" };
const btnDanger = { ...btnOutline, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}` };

/* ── SVG Icons ── */
const IconCalendar = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconPlus     = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const IconDownload = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const IconDoc      = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);

/* ── Data ── */
const upcomingMeetings = [
  { id:1, icon:"💬", title:"Project Discussion",       desc:"Milestone 2 progress check and demo review",            date:"Mar 20, 2026", time:"2:00 PM IST", participants:["John D.","Sara M.","Platform Admin"], status:"Confirmed", canJoin:true  },
  { id:2, icon:"🔍", title:"Requirement Clarification", desc:"Clarify payment flow requirements for checkout module", date:"Mar 25, 2026", time:"11:00 AM EST",participants:["Sara M.","John D."],                    status:"Pending",   canJoin:false },
];
const pastMeetings = [
  { id:3, icon:"📦", title:"Delivery Review", subtitle:"Feb 18, 2026", duration:"43 min", participants:2, summary:true, status:"Completed" },
];

/* ── Status Badge ── */
function StatusBadge({ status }) {
  const map = {
    Confirmed: { bg:G.gradGreen, text:G.white,     border:"none"            },
    Pending:   { bg:G.amberBg,   text:G.amberText, border:`1px solid ${G.amberBorder}` },
    Completed: { bg:G.gradGreen, text:G.white,     border:"none"            },
  };
  const s = map[status] || { bg:G.bg, text:G.muted, border:`1px solid ${G.border}` };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, background:s.bg, color:s.text, border:s.border, padding:"4px 12px", borderRadius:99, whiteSpace:"nowrap", boxShadow:status==="Confirmed"||status==="Completed"?"0 2px 8px rgba(46,125,31,0.2)":"none" }}>
      {status === "Confirmed" ? "✓ Confirmed" : status === "Pending" ? "⏳ Pending" : "✓ Completed"}
    </span>
  );
}

/* ── Upcoming Card ── */
function UpcomingCard({ meeting }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:8, marginBottom:4, flexWrap:"wrap" }}>
            <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{meeting.icon}</span>
            <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, lineHeight:1.4 }}>
              {meeting.title}{" "}
              <span style={{ fontWeight:500, color:G.sub }}>— {meeting.desc}</span>
            </p>
          </div>
          <p style={{ fontSize:11, color:G.muted, margin:"0 0 2px", paddingLeft:24 }}>{meeting.date} · {meeting.time}</p>
          <p style={{ fontSize:11, color:G.muted, margin:0, paddingLeft:24 }}>Participants: {meeting.participants.join(" · ")}</p>
        </div>
        <div style={{ flexShrink:0 }}><StatusBadge status={meeting.status} /></div>
      </div>

      {/* Actions */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14, paddingLeft:24 }}>
        {meeting.canJoin && (
          <button style={btnGreen}>Join</button>
        )}
        <button style={btnOutline}>View Agenda</button>
        <button style={btnOutline}>Reschedule</button>
        <button style={{ ...btnDanger, borderRadius:8, fontSize:12, padding:"7px 14px" }}>Cancel</button>
      </div>
    </div>
  );
}

/* ── Past Card ── */
function PastCard({ meeting }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
        <div style={{ flex:1 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:16 }}>{meeting.icon}</span>
            <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>
              {meeting.title}{" "}
              <span style={{ fontWeight:500, color:G.sub }}>— {meeting.subtitle}</span>
            </p>
          </div>
          <p style={{ fontSize:11, color:G.muted, margin:0, paddingLeft:24 }}>
            Duration: {meeting.duration} · Participants: {meeting.participants} · Summary: Posted ✓
          </p>
        </div>
        <div style={{ flexShrink:0 }}><StatusBadge status={meeting.status} /></div>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:14, paddingLeft:24 }}>
        <button style={btnOutline}><IconDoc /> View Summary</button>
        <button style={btnOutline}><IconDownload /> Download PDF</button>
      </div>
    </div>
  );
}

/* ── Main Export ── */
export default function MeetingsView() {
  const [showModal, setShowModal] = useState(false);
  const [hovField,  setHovField]  = useState(null);

  const inputStyle = (key) => ({
    width:"100%", fontSize:13, fontWeight:500,
    border:`1.5px solid ${hovField===key ? G.green : G.greenBorder}`,
    borderRadius:10, padding:"9px 12px",
    background:G.white, color:G.text,
    boxSizing:"border-box", fontFamily:FONT,
    transition:"border-color 0.12s",
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.bg, fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;}`}</style>

      {/* ── Header ── */}
      <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", justifyContent:"space-between", gap:10, padding:"14px 22px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, flexShrink:0, boxShadow:"0 2px 8px rgba(110,192,48,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10, color:G.text }}>
          <IconCalendar />
          <h2 style={{ fontSize:15, fontWeight:800, color:G.text, margin:0 }}>Meetings</h2>
        </div>
        <button style={btnNavy} onClick={() => setShowModal(true)}>
          <IconPlus /> Schedule New Meeting
        </button>
      </div>

      {/* ── Scrollable content ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px 22px", display:"flex", flexDirection:"column", gap:24 }}>

        {/* Upcoming */}
        <div>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:G.muted, marginBottom:12 }}>Upcoming</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {upcomingMeetings.map(m => <UpcomingCard key={m.id} meeting={m} />)}
          </div>
        </div>

        {/* Past Meetings */}
        <div>
          <p style={{ fontSize:10, fontWeight:700, letterSpacing:"0.1em", textTransform:"uppercase", color:G.muted, marginBottom:12 }}>Past Meetings</p>
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {pastMeetings.map(m => <PastCard key={m.id} meeting={m} />)}
          </div>
        </div>

        <div style={{ height:16 }} />
      </div>

      {/* ── Schedule Modal ── */}
      {showModal && (
        <div onClick={() => setShowModal(false)} style={{ position:"fixed", inset:0, background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
          <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:480, background:G.white, borderRadius:20, overflow:"hidden", boxShadow:"0 32px 80px rgba(15,26,59,0.22)" }}>

            {/* Modal header — navy gradient */}
            <div style={{ background:G.gradNavy, padding:"18px 22px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
              <p style={{ fontSize:16, fontWeight:800, color:G.white, margin:0 }}>Schedule New Meeting</p>
              <button onClick={() => setShowModal(false)}
                style={{ width:28, height:28, borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)", fontSize:13 }}>✕</button>
            </div>

            {/* Modal body */}
            <div style={{ padding:"22px" }}>
              <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

                {/* Title */}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Meeting Title</label>
                  <input type="text" placeholder="e.g. Milestone 3 Review"
                    style={inputStyle("title")}
                    onFocus={() => setHovField("title")} onBlur={() => setHovField(null)} />
                </div>

                {/* Date + Time */}
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                  <div>
                    <label style={{ fontSize:10, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Date</label>
                    <input type="date" style={inputStyle("date")} onFocus={() => setHovField("date")} onBlur={() => setHovField(null)} />
                  </div>
                  <div>
                    <label style={{ fontSize:10, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Time</label>
                    <input type="time" style={inputStyle("time")} onFocus={() => setHovField("time")} onBlur={() => setHovField(null)} />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label style={{ fontSize:10, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Description</label>
                  <textarea rows={3} placeholder="What will be discussed?"
                    style={{ ...inputStyle("desc"), resize:"none" }}
                    onFocus={() => setHovField("desc")} onBlur={() => setHovField(null)} />
                </div>
              </div>

              {/* Footer */}
              <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:20 }}>
                <button onClick={() => setShowModal(false)}
                  style={{ fontSize:13, fontWeight:600, fontFamily:FONT, padding:"9px 18px", border:`1px solid ${G.greenBorder}`, background:G.white, color:G.sub, borderRadius:100, cursor:"pointer" }}>
                  Cancel
                </button>
                <button onClick={() => setShowModal(false)} style={btnNavy}>
                  Schedule Meeting
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}