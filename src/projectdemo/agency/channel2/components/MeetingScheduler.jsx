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

import { useState } from "react";
 
export function MeetingScheduler({ onClose, onSchedule, participants }) {
  const [title,       setTitle]       = useState("");
  const [date,        setDate]        = useState("");
  const [time,        setTime]        = useState("");
  const [duration,    setDuration]    = useState("60");
  const [selPartic,   setSelPartic]   = useState(participants.map(p => p.id));
  const [agenda,      setAgenda]      = useState("");
  const [hovField,    setHovField]    = useState(null);
 
  const toggleParticipant = id =>
    setSelPartic(prev => prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]);
 
  const handleSubmit = () => {
    if (!title || !date || !time) return;
    onSchedule({ title, date, time, duration, participants: selPartic, agenda });
    onClose();
  };
 
  const today   = new Date().toISOString().split("T")[0];
  const canSave = !!(title && date && time);
 
  const inp = key => ({
    ...inputSty,
    borderColor: hovField === key ? G.green : G.greenBorder,
    transition:"border-color 0.12s",
  });
 
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(15,26,59,0.45)", backdropFilter:"blur(4px)", padding:16, fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} ::-webkit-scrollbar{width:4px;} ::-webkit-scrollbar-thumb{background:${G.greenBorder};border-radius:10px;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;}`}</style>
 
      <div onClick={e => e.stopPropagation()} style={{ background:G.white, borderRadius:20, width:"100%", maxWidth:440, overflow:"hidden", boxShadow:"0 32px 80px rgba(15,26,59,0.22)", display:"flex", flexDirection:"column", maxHeight:"92vh" }}>
 
        {/* Header */}
        <div style={{ padding:"16px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.gradNavy, display:"flex", alignItems:"center", justifyContent:"space-between", flexShrink:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:10 }}>
            <span style={{ fontSize:18 }}>📅</span>
            <span style={{ fontSize:14, fontWeight:800, color:G.white }}>Schedule Meeting</span>
          </div>
          <button onClick={onClose} style={{ background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)", borderRadius:8, width:28, height:28, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)", fontSize:14 }}>✕</button>
        </div>
 
        {/* Form */}
        <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14, overflowY:"auto", flex:1 }}>
 
          <div>
            <label style={labelSty}>Meeting Title <span style={{ color:G.red }}>*</span></label>
            <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="e.g. Sprint review, API progress check"
              style={inp("title")} onFocus={() => setHovField("title")} onBlur={() => setHovField(null)} />
          </div>
 
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            <div>
              <label style={labelSty}>Date <span style={{ color:G.red }}>*</span></label>
              <input type="date" value={date} min={today} onChange={e => setDate(e.target.value)}
                style={inp("date")} onFocus={() => setHovField("date")} onBlur={() => setHovField(null)} />
            </div>
            <div>
              <label style={labelSty}>Time <span style={{ color:G.red }}>*</span></label>
              <input type="time" value={time} onChange={e => setTime(e.target.value)}
                style={inp("time")} onFocus={() => setHovField("time")} onBlur={() => setHovField(null)} />
            </div>
          </div>
 
          <div>
            <label style={labelSty}>Duration</label>
            <select value={duration} onChange={e => setDuration(e.target.value)} style={inp("dur")} onFocus={() => setHovField("dur")} onBlur={() => setHovField(null)}>
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>
 
          <div>
            <label style={{ ...labelSty, marginBottom:8 }}>Participants ({selPartic.length} selected)</label>
            <div style={{ display:"flex", flexDirection:"column", gap:4, maxHeight:130, overflowY:"auto", paddingRight:4 }}>
              {participants.map(p => (
                <label key={p.id} style={{ display:"flex", alignItems:"center", gap:10, cursor:"pointer", padding:"7px 10px", borderRadius:10, background:selPartic.includes(p.id)?G.greenBg:"transparent", border:`1px solid ${selPartic.includes(p.id)?G.greenBorder:"transparent"}`, transition:"all 0.1s" }}>
                  <input type="checkbox" checked={selPartic.includes(p.id)} onChange={() => toggleParticipant(p.id)} style={{ width:14, height:14, accentColor:G.greenDeep, cursor:"pointer" }} />
                  <span style={{ fontSize:13, fontWeight:600, color:G.text, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.name}</span>
                  <span style={{ fontSize:11, color:G.muted, textTransform:"capitalize", fontWeight:500, flexShrink:0 }}>{p.role?.replace("_", " ")}</span>
                </label>
              ))}
            </div>
          </div>
 
          <div>
            <label style={labelSty}>Agenda <span style={{ fontWeight:500, textTransform:"none", color:G.muted }}>(optional)</span></label>
            <textarea value={agenda} onChange={e => setAgenda(e.target.value)} placeholder="What will be discussed?" rows={2}
              style={{ ...inp("agenda"), resize:"none" }} onFocus={() => setHovField("agenda")} onBlur={() => setHovField(null)} />
          </div>
        </div>
 
        {/* Footer */}
        <div style={{ padding:"14px 20px", borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"flex-end", gap:10, background:G.bg, flexShrink:0 }}>
          <button onClick={onClose} style={btnOutline}>Cancel</button>
          <button onClick={handleSubmit} disabled={!canSave}
            style={{ ...btnNavy, opacity:canSave?1:0.5, cursor:canSave?"pointer":"not-allowed" }}>
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}
 
export default MeetingScheduler;