// ── TimelineView.jsx ──────────────────────────────────
import { useState } from "react";
import { timelineGroups } from "./ProjectData";

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
};
const FONT = "'Poppins', sans-serif";

const IconFilter   = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>);
const IconDownload = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);

export default function TimelineView() {
  const [filter, setFilter] = useState("All Events");

  const filteredGroups = timelineGroups
    .map(group => ({
      ...group,
      events: group.events.filter(ev => {
        if (filter === "All Events") return true;
        if (filter === "Locked")     return ev.locked === true;
        if (filter === "Messages")   return ev.locked === false;
        if (filter === "Milestones") return ev.icon === "📦" || ev.icon === "✅";
        return true;
      }),
    }))
    .filter(group => group.events.length > 0);

  return (
    <div style={{ display:"flex", flexDirection:"column", flex:1, overflow:"hidden", background:G.white, fontFamily:FONT }}>

      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} select{outline:none;}`}</style>

      {/* ── Header ── */}
      <div style={{
        display:"flex", alignItems:"center", justifyContent:"space-between",
        flexWrap:"wrap", gap:10, padding:"14px 24px",
        background:G.white, borderBottom:`1px solid ${G.greenBorder}`, flexShrink:0,
        boxShadow:"0 2px 8px rgba(110,192,48,0.06)",
      }}>
        <h2 style={{ fontSize:16, fontWeight:800, color:G.text, margin:0 }}>Project Timeline</h2>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          {/* Filter pill */}
          <div style={{ position:"relative", display:"flex", alignItems:"center", gap:6, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"6px 14px", background:G.white, cursor:"pointer" }}>
            <span style={{ color:G.greenDeep, display:"flex" }}><IconFilter /></span>
            <select value={filter} onChange={e => setFilter(e.target.value)} style={{ background:"transparent", border:"none", fontSize:12, fontWeight:600, color:G.greenDeep, cursor:"pointer", fontFamily:FONT, paddingRight:16, appearance:"none" }}>
              <option>All Events</option>
              <option>Locked</option>
              <option>Messages</option>
              <option>Milestones</option>
            </select>
            <span style={{ position:"absolute", right:12, top:"50%", transform:"translateY(-50%)", color:G.muted, fontSize:10, pointerEvents:"none" }}>▾</span>
          </div>

          {/* Export pill */}
          <button style={{ display:"flex", alignItems:"center", gap:6, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"6px 16px", fontSize:12, fontWeight:600, fontFamily:FONT, background:G.white, color:G.greenDeep, cursor:"pointer" }}>
            <IconDownload /> Export PDF
          </button>
        </div>
      </div>

      {/* ── Scrollable Timeline ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"24px 28px" }}>
        {filteredGroups.length === 0 ? (
          <div style={{ display:"flex", alignItems:"center", justifyContent:"center", height:160, color:G.muted }}>
            <p style={{ fontSize:13, fontWeight:500 }}>No events found for this filter.</p>
          </div>
        ) : (
          filteredGroups.map(group => (
            <div key={group.date} style={{ marginBottom:28 }}>

              {/* Date header — green dot */}
              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
                <span style={{ width:14, height:14, borderRadius:"50%", background:G.green, flexShrink:0, boxShadow:`0 0 0 3px ${G.greenBorder}` }} />
                <span style={{ fontSize:15, fontWeight:800, color:G.text }}>{group.date}</span>
              </div>

              {/* Events — green left line */}
              <div style={{ marginLeft:6, paddingLeft:28, borderLeft:`2px solid ${G.green}`, display:"flex", flexDirection:"column", gap:12 }}>
                {group.events.map(ev => (
                  <div key={ev.id} style={{
                    position:"relative", background:G.white,
                    border:`1px solid ${G.greenBorder}`, borderRadius:12,
                    padding:"12px 16px",
                    boxShadow:"0 1px 6px rgba(110,192,48,0.07)",
                    transition:"box-shadow 0.12s",
                  }}>
                    {/* Connector dot on the green line */}
                    <span style={{ position:"absolute", left:-22, top:18, width:10, height:10, borderRadius:"50%", background:G.greenBorder, border:`2px solid ${G.white}`, flexShrink:0 }} />

                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", gap:10, flex:1, minWidth:0 }}>
                        <span style={{ fontSize:15, flexShrink:0, marginTop:2 }}>{ev.icon}</span>
                        <p style={{ fontSize:13, color:G.text, lineHeight:1.7, margin:0 }}>{ev.text}</p>
                      </div>
                      {ev.locked && (
                        <span style={{
                          flexShrink:0, display:"inline-flex", alignItems:"center", gap:5,
                          border:`1px solid ${G.amberBorder}`, color:"#92400e",
                          fontSize:10, fontWeight:800, padding:"3px 10px", borderRadius:8,
                          background:G.amberBg, whiteSpace:"nowrap", fontFamily:FONT,
                        }}>🔒 LOCKED</span>
                      )}
                    </div>

                    <div style={{ display:"flex", alignItems:"center", gap:8, marginTop:8, paddingLeft:26 }}>
                      <span style={{ fontSize:11, color:G.muted }}>{ev.time}</span>
                      {ev.by && <>
                        <span style={{ color:G.border, fontSize:11 }}>·</span>
                        <span style={{ fontSize:11, color:G.muted }}>by {ev.by}</span>
                      </>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
        <div style={{ height:16 }} />
      </div>
    </div>
  );
}