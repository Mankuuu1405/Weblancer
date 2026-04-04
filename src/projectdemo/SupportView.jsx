// ── SupportView.jsx ───────────────────────────────────
import { useState } from "react";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
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
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};
const FONT = "'Poppins', sans-serif";

const supportTickets = [
  { id:1, icon:"💰", title:"Payment or escrow issue", ticketNo:"#SUP-20260212-0891", date:"Feb 12, 2026", time:"10:00 AM", priority:"High", status:"Resolved", body:"Milestone 1 payment was approved 3 days ago but has not appeared in my account yet. Need confirmation on payment processing timeline.", reply:{ from:"Platform Support", time:"Feb 12, 2:30 PM", text:"Hi John, we have reviewed your case. The payment release for Milestone 1 is currently processing. It will appear in the agency account within 24 business hours. No action needed on your end. If not resolved by Feb 14, please reply here." }, resolvedOn:"Feb 14, 2026" },
  { id:2, icon:"📋", title:"Contract or scope question", ticketNo:"#SUP-20260318-1042", date:"Mar 18, 2026", time:"3:00 PM", priority:"Normal", status:"Open", body:"Need clarification on whether the restaurant management dashboard is within the original scope or requires a separate agreement.", reply:null, resolvedOn:null },
];

const IconHistory = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>);
const IconPhone   = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/></svg>);
const IconPlus    = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>);
const IconShield  = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill={G.greenDeep} stroke={G.greenDeep} strokeWidth="1"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>);

function PriorityBadge({ priority }) {
  if (priority === "High") return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:G.redBg, color:"#dc2626", border:`1px solid ${G.redBorder}`, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, fontFamily:FONT }}>
      🔴 High
    </span>
  );
  return (
    <span style={{ display:"inline-flex", alignItems:"center", background:G.bg, color:G.muted, border:`1px solid ${G.border}`, fontSize:11, fontWeight:600, padding:"3px 10px", borderRadius:99, fontFamily:FONT }}>
      Normal
    </span>
  );
}

function StatusBadge({ status }) {
  if (status === "Resolved") return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, fontFamily:FONT }}>
      ✓ Resolved
    </span>
  );
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:5, background:G.amberBg, color:"#92400e", border:`1px solid ${G.amberBorder}`, fontSize:11, fontWeight:700, padding:"3px 10px", borderRadius:99, fontFamily:FONT }}>
      ⏳ Open
    </span>
  );
}

function TicketCard({ ticket }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", boxShadow:"0 2px 8px rgba(110,192,48,0.06)" }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, flexWrap:"wrap", marginBottom:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:18 }}>{ticket.icon}</span>
            <span style={{ fontSize:14, fontWeight:700, color:G.text }}>{ticket.title}</span>
          </div>
          <p style={{ fontSize:11, color:G.muted, margin:0 }}>{ticket.ticketNo} · {ticket.date} · {ticket.time}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge   status={ticket.status}   />
        </div>
      </div>

      <p style={{ fontSize:13, color:G.sub, lineHeight:1.7, margin:"0 0 12px" }}>{ticket.body}</p>

      {/* Reply */}
      {ticket.reply && (
        <div style={{ background:G.greenBg, borderLeft:`4px solid ${G.green}`, borderRadius:"0 10px 10px 0", padding:"12px 16px", marginBottom:10 }}>
          <p style={{ fontSize:11, fontWeight:700, color:G.greenDeep, display:"flex", alignItems:"center", gap:6, margin:"0 0 6px" }}>
            <IconShield /> Platform Support · {ticket.reply.time}
          </p>
          <p style={{ fontSize:13, color:G.text, lineHeight:1.7, margin:0 }}>{ticket.reply.text}</p>
        </div>
      )}

      {ticket.resolvedOn && (
        <p style={{ fontSize:12, color:G.greenDeep, fontWeight:700, margin:"8px 0 0" }}>Resolved on {ticket.resolvedOn}</p>
      )}

      {/* Open reply box */}
      {ticket.status === "Open" && (
        <div style={{ marginTop:14 }}>
          <textarea rows={2} placeholder="Write a reply..." style={{
            width:"100%", border:`1.5px solid ${G.greenBorder}`, borderRadius:10,
            padding:"8px 12px", fontSize:13, fontFamily:FONT,
            color:G.text, background:G.bg, resize:"none", outline:"none", boxSizing:"border-box",
          }} />
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:8 }}>
            <button style={{
              background:G.gradNavy, color:G.white,
              border:"none", borderRadius:100, padding:"7px 18px",
              fontSize:12, fontWeight:700, fontFamily:FONT, cursor:"pointer",
              boxShadow:"0 3px 10px rgba(15,26,59,0.2)",
            }}>Send Reply</button>
          </div>
        </div>
      )}
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div style={{ position:"fixed", inset:0, background:"rgba(15,26,59,0.35)", zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", padding:16 }}>
      <div style={{ background:G.white, borderRadius:20, boxShadow:"0 8px 40px rgba(15,26,59,0.18)", width:"100%", maxWidth:440, overflow:"hidden" }}>
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <span style={{ fontSize:14, fontWeight:800, color:G.greenDeep }}>{title}</span>
          <button onClick={onClose} style={{ background:"none", border:"none", fontSize:18, color:G.muted, cursor:"pointer" }}>✕</button>
        </div>
        <div style={{ padding:20 }}>{children}</div>
      </div>
    </div>
  );
}

const fieldLabel = { fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:6, fontFamily:FONT };
const inputSty   = { width:"100%", border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"9px 14px", fontSize:13, fontFamily:FONT, color:G.text, background:G.white, outline:"none", boxSizing:"border-box" };

export default function SupportView() {
  const [showModal,   setShowModal]   = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  const pillBtn = (primary = false) => ({
    display:"inline-flex", alignItems:"center", gap:6,
    fontSize:12, fontWeight:700, fontFamily:FONT,
    padding:"7px 16px", borderRadius:100, cursor:"pointer",
    ...(primary
      ? { background:G.gradNavy, color:G.white, border:"none", boxShadow:"0 3px 12px rgba(15,26,59,0.25)" }
      : { background:G.white, color:G.sub, border:`1px solid ${G.greenBorder}` }),
  });

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.bg, fontFamily:FONT }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;}`}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 20px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, flexShrink:0, flexWrap:"wrap", gap:10, boxShadow:"0 2px 8px rgba(110,192,48,0.06)" }}>
        <div style={{ display:"flex", alignItems:"center", gap:10 }}>
          <span style={{ fontSize:20 }}>🎫</span>
          <h2 style={{ fontSize:16, fontWeight:800, color:G.text, margin:0 }}>Support</h2>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <button onClick={() => setShowHistory(true)} style={pillBtn()}>
            <IconHistory /> History
          </button>
          <button style={pillBtn()}>
            <IconPhone /> Request Call
          </button>
          <button onClick={() => setShowModal(true)} style={pillBtn(true)}>
            <IconPlus /> New Support Request
          </button>
        </div>
      </div>

      {/* Ticket list */}
      <div style={{ flex:1, overflowY:"auto", padding:"20px", display:"flex", flexDirection:"column", gap:14 }}>
        {supportTickets.map(t => <TicketCard key={t.id} ticket={t} />)}
        <div style={{ height:16 }} />
      </div>

      {/* New Request Modal */}
      {showModal && (
        <Modal title="New Support Request" onClose={() => setShowModal(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <div>
              <label style={fieldLabel}>Issue Type</label>
              <select style={inputSty}>
                <option>Payment or escrow issue</option>
                <option>Contract or scope question</option>
                <option>Technical problem</option>
                <option>Dispute</option>
                <option>Other</option>
              </select>
            </div>
            <div>
              <label style={fieldLabel}>Priority</label>
              <select style={inputSty}>
                <option>Normal</option>
                <option>High</option>
                <option>Urgent</option>
              </select>
            </div>
            <div>
              <label style={fieldLabel}>Description</label>
              <textarea rows={4} placeholder="Describe your issue in detail..." style={{ ...inputSty, resize:"none" }} />
            </div>
            <div style={{ display:"flex", justifyContent:"flex-end", gap:8, marginTop:4 }}>
              <button onClick={() => setShowModal(false)} style={pillBtn()}>Cancel</button>
              <button onClick={() => setShowModal(false)} style={pillBtn(true)}>Submit Request</button>
            </div>
          </div>
        </Modal>
      )}

      {/* History Modal */}
      {showHistory && (
        <Modal title="Support History" onClose={() => setShowHistory(false)}>
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {supportTickets.filter(t => t.status === "Resolved").map(t => (
              <div key={t.id} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"10px 0", borderBottom:`1px solid ${G.border}` }}>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{t.title}</p>
                  <p style={{ fontSize:11, color:G.muted, margin:"3px 0 0" }}>{t.ticketNo} · {t.date}</p>
                </div>
                <span style={{ fontSize:12, fontWeight:700, color:G.greenDeep }}>Resolved</span>
              </div>
            ))}
            {supportTickets.filter(t => t.status === "Resolved").length === 0 && (
              <p style={{ fontSize:13, color:G.muted, textAlign:"center", padding:"24px 0" }}>No resolved tickets yet.</p>
            )}
          </div>
          <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16 }}>
            <button onClick={() => setShowHistory(false)} style={pillBtn()}>Close</button>
          </div>
        </Modal>
      )}
    </div>
  );
}