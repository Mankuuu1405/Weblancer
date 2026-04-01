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
  orange:      "#f97316",
  orangeBg:    "#fff7ed",
  orangeBorder:"#fed7aa",
  orangeText:  "#c2410c",
};
const FONT = "'Poppins', sans-serif";

/* ── Role → border/bg colours ── */
const ROLE_STYLE = {
  ADMIN:      { border:G.red,   bg:G.redBg,   badgeBg:G.gradNavy,  badgeText:G.white   },
  CLIENT:     { border:G.green, bg:G.greenBg, badgeBg:G.gradGreen, badgeText:G.white   },
  FREELANCER: { border:G.green, bg:G.greenBg, badgeBg:G.gradGreen, badgeText:G.white   },
  SUPPORT:    { border:G.red,   bg:G.redBg,   badgeBg:G.gradNavy,  badgeText:G.white   },
};

/* ── Type badge colours ── */
const TYPE_STYLE = {
  DECISION: { bg:G.orangeBg,  text:G.orangeText, border:G.orangeBorder, icon:"🔒" },
  APPROVAL: { bg:G.greenBg,   text:G.greenDeep,  border:G.greenBorder,  icon:"✅" },
  DELIVERY: { bg:G.orangeBg,  text:G.orangeText, border:G.orangeBorder,  icon:"📦" },
  WARNING:  { bg:G.amberBg,   text:G.amberText,  border:G.amberBorder,  icon:"⚠️" },
  UPDATE:   { bg:G.navyBg,    text:G.navy,       border:G.navyBorder,   icon:"📋" },
};

/* ── SVG Icons ── */
const IconPin    = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
const IconSend   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const IconStar   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const IconDl     = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const IconFile   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const IconCheck  = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>);
const IconDots   = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>);
const IconLock   = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const IconPinMsg = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>);

/* ── Avatar ── */
function Avatar({ name, role }) {
  const color = role === "ADMIN" ? G.red : G.green;
  return (
    <div style={{ width:34, height:34, borderRadius:"50%", background:color+"20", border:`2px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color, flexShrink:0 }}>
      {name[0]}
    </div>
  );
}

/* ── Role Badge ── */
function RoleBadge({ role }) {
  const s = ROLE_STYLE[role] || { badgeBg:G.bg, badgeText:G.muted };
  return (
    <span style={{ fontSize:10, fontWeight:800, background:s.badgeBg, color:s.badgeText, padding:"2px 8px", borderRadius:6 }}>{role}</span>
  );
}

/* ── Type Badge ── */
function TypeBadge({ type }) {
  const s = TYPE_STYLE[type];
  if (!s) return null;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:800, background:s.bg, color:s.text, border:`1px solid ${s.border}`, padding:"2px 8px", borderRadius:6 }}>
      {s.icon} {type}
    </span>
  );
}

/* ── System Message ── */
function SystemMsg({ icon, text, date, green }) {
  return (
    <div style={{ display:"flex", justifyContent:"center", margin:"12px 0" }}>
      <div style={{ maxWidth:480, textAlign:"center", padding:"10px 20px", borderRadius:16, background:green?G.greenBg:G.bg, border:`1px solid ${green?G.greenBorder:G.border}` }}>
        <p style={{ fontSize:13, color:G.sub, margin:0 }}>{icon} {text}</p>
        {date && <p style={{ fontSize:11, color:G.muted, marginTop:4 }}>{date}</p>}
      </div>
    </div>
  );
}

/* ── Date Divider ── */
function DateDivider({ label }) {
  return (
    <div style={{ display:"flex", alignItems:"center", gap:12, margin:"16px 0" }}>
      <div style={{ flex:1, height:1, background:G.greenBorder }} />
      <span style={{ fontSize:11, color:G.muted, fontWeight:600 }}>{label}</span>
      <div style={{ flex:1, height:1, background:G.greenBorder }} />
    </div>
  );
}

/* ── Chat Message ── */
function ChatMessage({ msg }) {
  const s = ROLE_STYLE[msg.role] || ROLE_STYLE.CLIENT;
  return (
    <div style={{ borderRadius:14, borderLeft:`4px solid ${s.border}`, padding:"12px 16px", marginBottom:10, background:s.bg, border:`1px solid ${s.border}33` }}>
      {/* Header */}
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, marginBottom:10, flexWrap:"wrap" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
          <Avatar name={msg.author} role={msg.role} />
          <span style={{ fontSize:13, fontWeight:700, color:G.text }}>{msg.author}</span>
          <RoleBadge role={msg.role} />
          {msg.msgType && <TypeBadge type={msg.msgType} />}
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:8, color:G.muted }}>
          {msg.pinned  && <span style={{ color:G.muted }}><IconPinMsg /></span>}
          {msg.locked  && <span style={{ color:G.amber }}><IconLock /></span>}
          <span style={{ fontSize:11 }}>{msg.time}</span>
          {msg.hasMenu && <button style={{ background:"none", border:"none", cursor:"pointer", color:G.muted, display:"flex" }}><IconDots /></button>}
        </div>
      </div>

      {/* Locked decision */}
      {msg.lockedDecision && (
        <p style={{ fontSize:11, color:G.amberText, fontWeight:700, marginBottom:8, marginLeft:42, display:"flex", alignItems:"center", gap:5 }}>
          🔒 LOCKED DECISION — Cannot be edited or reversed
        </p>
      )}

      <div style={{ marginLeft:42 }}>
        <p style={{ fontSize:13, color:G.text, lineHeight:1.6, margin:0, whiteSpace:"pre-line" }}>{msg.body}</p>

        {/* Attachments */}
        {msg.attachments && (
          <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:8 }}>
            {msg.attachments.map((a, i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:10, background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:10, padding:"8px 14px" }}>
                <IconFile />
                <span style={{ fontSize:13, color:G.text, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{a.name}</span>
                <span style={{ fontSize:11, color:G.muted, flexShrink:0 }}>{a.size}</span>
                <button style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, color:G.greenDeep, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"4px 10px", cursor:"pointer", flexShrink:0 }}>
                  <IconDl /> Download
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Acknowledge */}
        {msg.acknowledge && (
          <div style={{ marginTop:12, border:`1px solid ${G.amberBorder}`, borderRadius:12, padding:"12px 14px", background:G.amberBg }}>
            <p style={{ fontSize:11, color:G.amberText, fontWeight:700, marginBottom:10 }}>⚠️ Certain actions are blocked until acknowledged.</p>
            <button style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:8, width:"100%", background:G.amber, color:G.white, border:"none", borderRadius:12, padding:"10px", fontSize:13, fontWeight:700, fontFamily:FONT, cursor:"pointer" }}>
              <IconCheck /> I have read and understood this message
            </button>
          </div>
        )}

        {/* Commitment */}
        {msg.commitment && (
          <p style={{ fontSize:11, color:G.redText, fontWeight:600, marginTop:8, display:"flex", alignItems:"center", gap:4 }}>
            📌 Commitment logged by system
          </p>
        )}

        {/* Seen by */}
        {msg.seenBy && (
          <p style={{ fontSize:11, color:G.muted, marginTop:8, display:"flex", alignItems:"center", gap:4 }}>
            <IconCheck /> Seen by: {msg.seenBy}
          </p>
        )}
      </div>
    </div>
  );
}

/* ── Support Card ── */
function SupportCard() {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:16 }}>🎫</span>
        <span style={{ fontSize:10, fontFamily:"monospace", fontWeight:700, color:G.muted }}>[SYSTEM]</span>
        <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Support Request Opened</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, fontSize:13, color:G.sub, marginBottom:12 }}>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Ticket:</span> <b>#SUP-20260318-1042</b></p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Category:</span> 📋 Contract or scope question</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Urgency:</span> Normal</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Submitted by:</span> Sara M. (freelancer)</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Status:</span> ⏳ Awaiting admin</p>
      </div>
      <div style={{ borderTop:`1px solid ${G.border}`, paddingTop:8, marginBottom:14 }}>
        <p style={{ fontSize:11, color:G.muted, margin:"0 0 2px" }}>This ticket is visible to all project participants.</p>
        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Admin response expected within 4 hours.</p>
      </div>
      {/* Support reply */}
      <div style={{ borderLeft:`4px solid ${G.red}`, paddingLeft:14, background:G.redBg, borderRadius:"0 10px 10px 0", padding:"12px 14px 12px 16px" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
          <span style={{ fontSize:12, fontWeight:700, color:G.navyLight }}>🛡️ Platform Support</span>
          <RoleBadge role="SUPPORT" />
          <span style={{ fontSize:11, color:G.muted, marginLeft:"auto" }}>Feb 12, 2:30 PM</span>
        </div>
        <p style={{ fontSize:11, color:G.muted, margin:"0 0 8px" }}>Re: Ticket #SUP-20260212-0891 — Payment or escrow issue</p>
        <p style={{ fontSize:13, color:G.text, lineHeight:1.6, margin:"0 0 8px" }}>Hi John, we have reviewed your case. The payment release for Milestone 1 is currently processing. It will appear in the agency account within 24 business hours. No action needed on your end. If not resolved by Feb 14, please reply here.</p>
        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Ticket remains open until confirmed resolved.</p>
        <p style={{ fontSize:11, color:G.muted, margin:"2px 0 0" }}>Seen by: Client ✓ · Agency Admin ✓</p>
      </div>
    </div>
  );
}

/* ── Meeting Request Card ── */
function MeetingRequestCard() {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:16 }}>🗓️</span>
        <span style={{ fontSize:10, fontFamily:"monospace", fontWeight:700, color:G.muted }}>[SYSTEM]</span>
        <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Meeting Requested</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, fontSize:13, color:G.sub, marginBottom:12 }}>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Type:</span> 🔍 Requirement Clarification</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Requested by:</span> Sara M. (freelancer)</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Date:</span> <b>Wednesday, Mar 25, 2026 · 11:00 AM EST</b></p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Duration:</span> 30 minutes</p>
      </div>
      <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:8 }}>Participants:</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
        {[{ name:"Sara M.", role:"FREELANCER", st:"Confirmed", ic:"✅" },{ name:"John D.", role:"CLIENT", st:"Pending", ic:"⏳" }].map(p => (
          <div key={p.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span>{p.ic}</span>
            <span style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.name}</span>
            <RoleBadge role={p.role} />
            <span style={{ marginLeft:"auto", fontSize:11, color:G.muted }}>{p.st}</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:12 }}>
        <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:4 }}>Agenda:</p>
        <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>Clarify payment flow requirements for checkout module</p>
        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Topics: Payment gateway preferences · Guest checkout vs. registered users</p>
      </div>
      <div style={{ marginBottom:14 }}>
        <span style={{ fontSize:11, fontWeight:700, color:G.amberText, background:G.amberBg, border:`1px solid ${G.amberBorder}`, padding:"4px 12px", borderRadius:99 }}>⏳ PENDING — Awaiting confirmation</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        <button style={{ fontSize:12, fontWeight:700, fontFamily:FONT, background:G.gradGreen, color:G.white, border:"none", borderRadius:100, padding:"8px 20px", cursor:"pointer" }}>Accept ✅</button>
        <button style={{ fontSize:12, fontWeight:700, fontFamily:FONT, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, borderRadius:100, padding:"8px 20px", cursor:"pointer" }}>Decline ✕</button>
        <button style={{ fontSize:12, fontWeight:600, fontFamily:FONT, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"8px 16px", cursor:"pointer" }}>Propose New Time 🕐</button>
      </div>
    </div>
  );
}

/* ── Meeting Confirmed Card ── */
function MeetingConfirmedCard() {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:16 }}>🗓️</span>
        <span style={{ fontSize:10, fontFamily:"monospace", fontWeight:700, color:G.muted }}>[SYSTEM]</span>
        <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Meeting Confirmed ✅</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, fontSize:13, color:G.sub, marginBottom:12 }}>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Type:</span> 💬 Project Discussion</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Requested by:</span> John D. (client)</p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Date:</span> <b>Friday, Mar 20, 2026 · 2:00 PM IST</b></p>
        <p style={{ margin:0 }}><span style={{ color:G.muted }}>Duration:</span> 60 minutes</p>
      </div>
      <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:8 }}>Participants:</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:12 }}>
        {[{ name:"John D.", role:"CLIENT" },{ name:"Sara M.", role:"FREELANCER" },{ name:"Platform Admin", role:"ADMIN" }].map(p => (
          <div key={p.name} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span>✅</span>
            <span style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.name}</span>
            <RoleBadge role={p.role} />
            <span style={{ marginLeft:"auto", fontSize:11, color:G.muted }}>Confirmed</span>
          </div>
        ))}
      </div>
      <div style={{ marginBottom:12 }}>
        <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:4 }}>Agenda:</p>
        <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>Milestone 2 progress check and demo review</p>
        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Topics: Review order tracking module demo · Discuss API integration progress · Plan remaining sprint work</p>
      </div>
      <div style={{ marginBottom:14 }}>
        <span style={{ fontSize:11, fontWeight:800, color:G.white, background:G.gradGreen, padding:"4px 14px", borderRadius:99, boxShadow:"0 2px 8px rgba(46,125,31,0.2)" }}>✅ CONFIRMED</span>
      </div>
      <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
        {["Add to Google Calendar","Add to Outlook","Add to Apple Calendar"].map(l => (
          <button key={l} style={{ fontSize:11, fontWeight:600, fontFamily:FONT, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 12px", cursor:"pointer" }}>{l}</button>
        ))}
      </div>
    </div>
  );
}

/* ── Meeting Starting Soon ── */
function MeetingStartingSoonCard() {
  return (
    <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", marginBottom:10 }}>
      <p style={{ fontSize:14, fontWeight:800, color:G.text, margin:"0 0 6px" }}>🗓️ Meeting Starting Soon!</p>
      <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 2px" }}>💬 Project Discussion — Mar 20, 2:00 PM IST</p>
      <p style={{ fontSize:11, color:G.muted, margin:"0 0 16px" }}>Starts in: 15,554 minutes</p>
      <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:8 }}>Participants joining:</p>
      <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:16 }}>
        {["John D.","Sara M.","Platform Admin"].map(name => (
          <div key={name} style={{ display:"flex", alignItems:"center", gap:8 }}>
            <span>⏳</span>
            <span style={{ fontSize:13, color:G.text }}>{name}</span>
            <span style={{ marginLeft:"auto", fontSize:11, color:G.muted }}>Not joined yet</span>
          </div>
        ))}
      </div>
      <button style={{ width:"100%", background:G.gradGreen, color:G.white, border:"none", borderRadius:14, padding:"13px", fontSize:14, fontWeight:800, fontFamily:FONT, cursor:"pointer", marginBottom:16, boxShadow:"0 4px 16px rgba(46,125,31,0.25)" }}>
        Join Meeting Now →
      </button>
      <p style={{ fontSize:11, color:G.muted, fontWeight:700, marginBottom:6 }}>Meeting Agenda (quick reference):</p>
      {["Review order tracking module demo","Discuss API integration progress","Plan remaining sprint work"].map(i => (
        <p key={i} style={{ fontSize:12, color:G.sub, margin:"0 0 3px" }}>• {i}</p>
      ))}
    </div>
  );
}

/* ── Meeting Notes Card ── */
function MeetingNotesCard() {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, overflow:"hidden", marginBottom:10 }}>
      {/* Admin header */}
      <div style={{ borderLeft:`4px solid ${G.red}`, padding:"12px 16px", display:"flex", alignItems:"center", justifyContent:"space-between", background:G.redBg }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <div style={{ width:34, height:34, borderRadius:"50%", background:G.red, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:800, color:G.white }}>P</div>
          <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Platform Admin</span>
          <RoleBadge role="ADMIN" />
        </div>
        <span style={{ fontSize:11, color:G.muted }}>Feb 18, 4:45 PM</span>
      </div>

      <div style={{ padding:"16px 20px" }}>
        <p style={{ fontSize:10, fontWeight:800, color:G.muted, letterSpacing:"0.1em", textTransform:"uppercase", marginBottom:14 }}>[OFFICIAL MEETING NOTES]</p>
        <div style={{ border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:"14px 16px", marginBottom:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
            <span style={{ fontSize:16 }}>📋</span>
            <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>Meeting Summary — Delivery Review</p>
          </div>
          <p style={{ fontSize:11, color:G.muted, margin:"0 0 12px" }}>Feb 18, 2026 · 3:00 PM · Duration: 43 min · Attendees: John D. · Sara M.</p>
          <div style={{ borderTop:`1px solid ${G.border}`, paddingTop:12 }}>
            <p style={{ fontSize:11, color:G.muted, fontWeight:600, marginBottom:6 }}>What was discussed:</p>
            <p style={{ fontSize:13, color:G.text, lineHeight:1.6, marginBottom:12 }}>Reviewed all 12 wireframe screens for the food delivery app. Client provided feedback on navigation flow and visual design preferences.</p>
            <p style={{ fontSize:11, color:G.greenDeep, fontWeight:700, marginBottom:5 }}>✅ Decisions Made:</p>
            <ol style={{ paddingLeft:18, fontSize:13, color:G.text, marginBottom:12 }}>
              <li>Wireframes approved with 2 minor changes</li>
              <li>Color scheme Option B selected</li>
            </ol>
            <p style={{ fontSize:11, color:G.orangeText, fontWeight:700, marginBottom:5 }}>📋 Action Items:</p>
            <ol style={{ paddingLeft:18, fontSize:13, color:G.text, marginBottom:12 }}>
              <li>Sara M. → Update wireframe screens 5 and 9 <span style={{ color:G.navyLight, fontWeight:700 }}>Due: Feb 20, 2026</span></li>
              <li>Sara M. → Begin Design phase after Feb 20 <span style={{ color:G.navyLight, fontWeight:700 }}>Due: Feb 21, 2026</span></li>
            </ol>
            <p style={{ fontSize:11, color:G.amberText, display:"flex", alignItems:"center", gap:4 }}>🔒 This summary is official and locked. It forms part of the project record.</p>
          </div>
        </div>
        <p style={{ fontSize:11, color:G.muted, margin:0 }}>Seen by: John D. ✓ · Sara M. ✓</p>
      </div>
    </div>
  );
}

/* ── Project Completed ── */
function ProjectCompletedCard() {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px 20px", marginBottom:10 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
        <span style={{ fontSize:16 }}>🎉</span>
        <span style={{ fontSize:10, fontFamily:"monospace", fontWeight:700, color:G.muted }}>[SYSTEM]</span>
        <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Project Completed!</span>
      </div>
      <div style={{ display:"flex", flexDirection:"column", gap:5, fontSize:13, color:G.sub, marginBottom:12 }}>
        <p style={{ margin:0 }}>All 4 milestones have been approved.</p>
        <p style={{ margin:0 }}>Total paid: <span style={{ color:G.greenDeep, fontWeight:800 }}>$42,000</span> (released from escrow)</p>
        <p style={{ margin:0 }}>Project duration: 22 weeks (on schedule ✓)</p>
      </div>
      <div style={{ borderTop:`1px solid ${G.greenBorder}`, paddingTop:12, marginBottom:12 }}>
        <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:6 }}>Final steps required:</p>
        <ol style={{ paddingLeft:18, fontSize:13, color:G.sub }}>
          <li>Client: Leave a review for Sara M.</li>
          <li>Provider: Leave a review for John D. (TechVision Co.)</li>
        </ol>
      </div>
      <p style={{ fontSize:11, color:G.muted, fontStyle:"italic", marginBottom:14 }}>This ProjectStream will be archived in 48 hours. You'll retain read-only access permanently.</p>
      <button style={{ display:"inline-flex", alignItems:"center", gap:8, background:G.gradGreen, color:G.white, border:"none", borderRadius:100, padding:"10px 22px", fontSize:13, fontWeight:700, fontFamily:FONT, cursor:"pointer", boxShadow:"0 4px 16px rgba(46,125,31,0.25)" }}>
        <IconStar /> Leave Review →
      </button>
    </div>
  );
}

/* ── Pinned Banner ── */
function PinnedBanner({ collapsed, onToggle }) {
  return (
    <div onClick={onToggle} style={{ background:G.white, borderBottom:`1px solid ${G.greenBorder}`, padding:"10px 18px", display:"flex", alignItems:"center", gap:8, flexShrink:0, cursor:"pointer", transition:"background 0.12s" }}
      onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
      onMouseLeave={e => e.currentTarget.style.background = G.white}
    >
      <span style={{ color:G.red }}><IconPin /></span>
      <span style={{ fontSize:13, fontWeight:700, color:G.text }}>📌 Pinned (5)</span>
      <span style={{ marginLeft:"auto", fontSize:11, color:G.muted }}>{collapsed ? "▼" : "▲"}</span>
    </div>
  );
}

/* ── Composer ── */
function Composer() {
  const [focusInput, setFocusInput] = useState(false);
  return (
    <div style={{ borderTop:`1px solid ${G.greenBorder}`, background:G.white, padding:"12px 16px", flexShrink:0 }}>
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8, fontSize:12, color:G.muted }}>
        <span style={{ fontWeight:600 }}>Type:</span>
        <select style={{ border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"4px 10px", fontSize:12, color:G.sub, background:G.white, fontFamily:FONT, cursor:"pointer", outline:"none" }}>
          <option>Normal</option><option>Decision</option><option>Action Item</option><option>Question</option>
        </select>
      </div>
      <div style={{ border:`1.5px solid ${focusInput?G.green:G.greenBorder}`, borderRadius:14, padding:"10px 16px", background:G.bg, minHeight:56, fontSize:13, color:G.muted, cursor:"text", transition:"border-color 0.12s" }}
        onClick={() => setFocusInput(true)} onBlur={() => setFocusInput(false)}>
        Write your message... (Shift+Enter for new line)
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:10 }}>
        <div style={{ display:"flex", gap:12, color:G.muted }}>
          {[
            <svg key="a" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
            <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
            <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>,
            <svg key="d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
          ].map((icon, i) => (
            <button key={i} style={{ background:"none", border:"none", cursor:"pointer", color:G.muted, display:"flex", padding:2 }}
              onMouseEnter={e => e.currentTarget.style.color = G.green}
              onMouseLeave={e => e.currentTarget.style.color = G.muted}
            >{icon}</button>
          ))}
        </div>
        <button style={{ display:"inline-flex", alignItems:"center", gap:6, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"8px 20px", fontSize:13, fontWeight:700, fontFamily:FONT, cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)" }}>
          <IconSend /> Send
        </button>
      </div>
    </div>
  );
}

/* ── Messages Data ── */
const MESSAGES = [
  { id:"s1",  kind:"sys",  icon:"📌", text:'ProjectStream for "Food Delivery App" has been created. All communication, deliverables, decisions, and payments for this project will be tracked here. This space is permanent and legally logged.', date:"Feb 11, 2026 · 2:14 PM" },
  { id:"s2",  kind:"sys",  icon:"💰", text:"Escrow funded: $42,000 secured for this project.", date:"Feb 11, 2026 · 2:14 PM" },
  { id:"d1",  kind:"date", label:"February 11, 2026" },
  { id:"m1",  kind:"msg",  author:"Platform Admin", role:"ADMIN",      time:"2:30 PM",  body:"Welcome to the Food Delivery App project. I'm your platform admin and will be monitoring this project to ensure everything runs smoothly. Please keep all communication within ProjectStream.", seenBy:"John D. · Sara M." },
  { id:"m2",  kind:"msg",  author:"John D.",        role:"CLIENT",     time:"9:15 AM",  body:"Hi Sara! Excited to get started. I've shared additional wireframe references in the files section. Let me know if you have any questions about the requirements.", seenBy:"Sara M. · Admin" },
  { id:"m3",  kind:"msg",  author:"Sara M.",        role:"FREELANCER", time:"10:30 AM", msgType:"DECISION", pinned:true, body:"I will deliver the complete UI designs by this Friday, Feb 14 by 6pm EST. All 12 screens will be included.", commitment:true, seenBy:"John D. · Admin" },
  { id:"d2",  kind:"date", label:"March 11, 2026" },
  { id:"m4",  kind:"msg",  author:"Sara M.",        role:"FREELANCER", time:"4:20 PM",  msgType:"DELIVERY", pinned:true, hasMenu:true, body:"Milestone 1 deliverables have been submitted for your review. Please find the wireframes, UI designs, and technical architecture document attached.", attachments:[{name:"wireframes_v2.pdf",size:"2.4 MB"},{name:"design_system.fig",size:"8.1 MB"},{name:"tech_architecture.pdf",size:"1.2 MB"}], seenBy:"John D. · Admin" },
  { id:"s3",  kind:"sys",  icon:"📦", text:"Freelancer submitted Milestone 1 deliverables. Client has 7 business days to review.", date:"Mar 11, 2026 · 4:20 PM" },
  { id:"d3",  kind:"date", label:"March 13, 2026" },
  { id:"m5",  kind:"msg",  author:"John D.",        role:"CLIENT",     time:"3:45 PM",  msgType:"APPROVAL", pinned:true, body:"The wireframes look great! Approved. Please proceed to the design phase.", seenBy:"Sara M. · Admin" },
  { id:"m6",  kind:"msg",  author:"Platform Admin", role:"ADMIN",      time:"4:00 PM",  msgType:"DECISION", locked:true, lockedDecision:true, hasMenu:true, body:"Milestone 1 has been officially approved. Payment of $8,400 will release within 24h. This decision is final and non-reversible.", seenBy:"John D. · Sara M." },
  { id:"s4",  kind:"sys",  icon:"✅", text:"Client approved Milestone 1 — $8,400 released from escrow.", date:"Mar 13, 2026 · 4:02 PM", green:true },
  { id:"d4",  kind:"date", label:"March 15, 2026" },
  { id:"m7",  kind:"msg",  author:"Platform Admin", role:"ADMIN",      time:"2:00 PM",  msgType:"WARNING", pinned:true, hasMenu:true, body:'Your project "Food Delivery App" has been flagged for scope creep. The following requests fall outside the original agreement:\n\n1. Restaurant management dashboard\n2. Real-time analytics panel\n\nPlease review and confirm you understand.', acknowledge:true, seenBy:"John D." },
  { id:"d5",  kind:"date", label:"March 18, 2026" },
  { id:"m8",  kind:"msg",  author:"Sara M.",        role:"FREELANCER", time:"11:00 AM", msgType:"UPDATE", hasMenu:true, body:"Working on the order tracking module now. The API integration is going smoothly. Should have a demo ready by end of this week.", seenBy:"John D. · Admin" },
  { id:"sp1", kind:"support" },
  { id:"mr1", kind:"meetrequest" },
  { id:"mc1", kind:"meetconfirmed" },
  { id:"ms1", kind:"meetingsoon" },
  { id:"mn1", kind:"meetingnotes" },
  { id:"pc1", kind:"completed" },
];

/* ── Main Export ── */
export default function ProjectStreamChat() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.bg, fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} select{outline:none;}`}</style>
      <PinnedBanner collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      <div style={{ flex:1, overflowY:"auto", padding:"12px 16px" }}>
        {MESSAGES.map(m => {
          if (m.kind === "sys")           return <SystemMsg            key={m.id} icon={m.icon} text={m.text} date={m.date} green={m.green} />;
          if (m.kind === "date")          return <DateDivider          key={m.id} label={m.label} />;
          if (m.kind === "msg")           return <ChatMessage          key={m.id} msg={m} />;
          if (m.kind === "support")       return <SupportCard          key={m.id} />;
          if (m.kind === "meetrequest")   return <MeetingRequestCard   key={m.id} />;
          if (m.kind === "meetconfirmed") return <MeetingConfirmedCard key={m.id} />;
          if (m.kind === "meetingsoon")   return <MeetingStartingSoonCard key={m.id} />;
          if (m.kind === "meetingnotes")  return <MeetingNotesCard     key={m.id} />;
          if (m.kind === "completed")     return <ProjectCompletedCard key={m.id} />;
          return null;
        })}
        <div style={{ height:16 }} />
      </div>
      <Composer />
    </div>
  );
}