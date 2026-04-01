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
 
/* ── Event type → tonal style ── */
const TYPE_STYLE = {
  system:       { bg: G.bg,       text: G.muted,      border: G.border,       dot: G.muted     },
  admin_action: { bg: G.redBg,    text: G.redText,    border: G.redBorder,    dot: G.red       },
  milestone:    { bg: G.greenBg,  text: G.greenDeep,  border: G.greenBorder,  dot: G.green     },
  approval:     { bg: G.blueBg,   text: G.blueText,   border: G.blueBorder,   dot: G.blue      },
  decision:     { bg: G.purpleBg, text: G.purpleText, border: G.purpleBorder, dot: G.purple    },
  update:       { bg: G.amberBg,  text: G.amberText,  border: G.amberBorder,  dot: G.amber     },
};
 
const FILTER_OPTIONS = [
  { value: "all",          label: "All Events"    },
  { value: "milestone",    label: "Milestones"    },
  { value: "decision",     label: "Decisions"     },
  { value: "approval",     label: "Approvals"     },
  { value: "admin_action", label: "Admin Actions" },
  { value: "update",       label: "Team Updates"  },
];
 
const timelineEvents = [
  { id:"t1",  date:"2026-03-10", time:"09:00 AM", type:"system",       icon:"🔔", content:"Internal governance channel created for Food Delivery App project.",                                                                        by:"Platform Admin", locked:true  },
  { id:"t2",  date:"2026-03-10", time:"09:30 AM", type:"admin_action", icon:"🔐", content:"Agency Admin (Raj Kumar) assigned team members to the project.",                                                                           by:"Raj Kumar",      locked:true  },
  { id:"t3",  date:"2026-03-10", time:"10:00 AM", type:"milestone",    icon:"🏁", content:"Milestone 1 (UI Design) marked as completed and submitted for review.",                                                                    by:"Sara M.",        locked:false },
  { id:"t4",  date:"2026-03-10", time:"10:30 AM", type:"approval",     icon:"✅", content:"UI Design milestone deliverables approved by Agency Admin.",                                                                               by:"Raj Kumar",      locked:true  },
  { id:"t5",  date:"2026-03-11", time:"09:15 AM", type:"milestone",    icon:"🏁", content:"Milestone 2 (Backend API) started. Team assigned: Sara M. and Dev Mike.",                                                                  by:"Raj Kumar",      locked:false },
  { id:"t6",  date:"2026-03-11", time:"11:00 AM", type:"decision",     icon:"⚖️", content:"Decision: Sara M. will own payment integration. Dev Mike will complete order management APIs. Deadline set to March 15.",                 by:"Raj Kumar",      locked:true  },
  { id:"t7",  date:"2026-03-11", time:"02:00 PM", type:"admin_action", icon:"🔐", content:"Platform Admin flagged Milestone 2 deadline as critical — team notified.",                                                                 by:"Platform Admin", locked:true  },
  { id:"t8",  date:"2026-03-12", time:"10:00 AM", type:"update",       icon:"📋", content:"Dev Mike submitted progress update: Database schema complete, order APIs 70% done.",                                                       by:"Dev Mike",       locked:false },
  { id:"t9",  date:"2026-03-12", time:"11:30 AM", type:"update",       icon:"📋", content:"Sara M. submitted progress update: Authentication done, payment integration in progress.",                                                 by:"Sara M.",        locked:false },
  { id:"t10", date:"2026-03-13", time:"09:00 AM", type:"admin_action", icon:"🔐", content:"Platform Admin joined channel monitoring. All decisions are being recorded.",                                                              by:"Platform Admin", locked:true  },
];
 
/* ══════════════════════════════════════════════════════════
   TIMELINE VIEW
══════════════════════════════════════════════════════════ */
export default function TimelineView({ project }) {
  const [filter,       setFilter]       = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [hovRow,       setHovRow]       = useState(null);
  const [hovFilter,    setHovFilter]    = useState(null);
 
  const filtered = filter === "all"
    ? timelineEvents
    : timelineEvents.filter(e => e.type === filter);
 
  const grouped = filtered.reduce((acc, event) => {
    const date = new Date(event.date).toLocaleDateString("en-IN", { day:"numeric", month:"long", year:"numeric" });
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});
 
  const activeLabel = FILTER_OPTIONS.find(f => f.value === filter)?.label;
 
  const handleExportPDF = () => {
    const printContent = `
      <html><head><title>Timeline — ${project?.name}</title>
      <style>
        body { font-family: 'Poppins', Arial, sans-serif; padding: 32px; color: #1C1C1C; }
        h1 { font-size: 20px; margin-bottom: 4px; color: #1A2B5E; }
        .subtitle { font-size: 13px; color: #9ca3af; margin-bottom: 24px; }
        .date-group { margin-bottom: 20px; }
        .date-label { font-size: 13px; font-weight: bold; color: #2E7D1F; border-bottom: 2px solid #d4edbb; padding-bottom: 6px; margin-bottom: 10px; }
        .event { padding: 10px 14px; border: 1px solid #e5e7eb; border-radius: 10px; margin-bottom: 8px; background: #f9fafb; }
        .event-content { font-size: 13px; color: #1C1C1C; }
        .event-meta { font-size: 11px; color: #9ca3af; margin-top: 4px; }
        .locked { float: right; font-size: 11px; color: #92400e; background: #fffbeb; border: 1px solid #fde68a; padding: 2px 8px; border-radius: 99px; }
        .filter-note { font-size: 12px; color: #9ca3af; margin-bottom: 16px; }
      </style></head><body>
        <h1>Project Timeline — ${project?.name || ""}</h1>
        <div class="subtitle">Generated: ${new Date().toLocaleString("en-IN")}</div>
        <div class="filter-note">Filter: ${activeLabel}</div>
        ${Object.entries(grouped).map(([date, events]) => `
          <div class="date-group">
            <div class="date-label">${date}</div>
            ${events.map(e => `
              <div class="event">
                ${e.locked ? '<span class="locked">🔒 LOCKED</span>' : ''}
                <div class="event-content">${e.icon} ${e.content}</div>
                <div class="event-meta">${e.time} · by ${e.by}</div>
              </div>
            `).join("")}
          </div>`).join("")}
      </body></html>`;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };
 
  return (
    <div style={{ flex:1, display:"flex", flexDirection:"column", overflow:"hidden", fontFamily:FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>
 
      {/* ── Header ── */}
      <div style={{ padding:"14px 22px", background:G.white, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", gap:12, flexShrink:0, boxShadow:"0 2px 8px rgba(110,192,48,0.06)" }}>
        {/* Icon + title */}
        <div style={{ display:"flex", alignItems:"center", gap:10, flex:1 }}>
          <div style={{ width:34, height:34, borderRadius:10, background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center" }}>
            <svg width="16" height="16" fill="none" stroke={G.greenDeep} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
            </svg>
          </div>
          <div>
            <p style={{ fontSize:14, fontWeight:800, color:G.text, margin:0 }}>Project Timeline</p>
            <p style={{ fontSize:11, color:G.muted, margin:0 }}>{project?.name} · Internal View · {filtered.length} events</p>
          </div>
        </div>
 
        {/* Filter dropdown */}
        <div style={{ position:"relative" }}>
          <button onClick={() => setDropdownOpen(!dropdownOpen)}
            style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:12, fontWeight:700, fontFamily:FONT, background:dropdownOpen?G.greenBg:G.white, color:G.greenDeep, border:`1.5px solid ${dropdownOpen?G.green:G.greenBorder}`, borderRadius:100, padding:"7px 14px", cursor:"pointer", transition:"all 0.12s" }}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z"/>
            </svg>
            {activeLabel}
            <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
            </svg>
          </button>
 
          {dropdownOpen && (
            <div style={{ position:"absolute", right:0, top:"calc(100% + 6px)", background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:12, boxShadow:"0 8px 32px rgba(15,26,59,0.10)", zIndex:50, width:180, padding:"6px 0", overflow:"hidden" }}>
              {FILTER_OPTIONS.map(opt => {
                const active = filter === opt.value;
                return (
                  <button key={opt.value}
                    onClick={() => { setFilter(opt.value); setDropdownOpen(false); }}
                    onMouseEnter={() => setHovFilter(opt.value)}
                    onMouseLeave={() => setHovFilter(null)}
                    style={{ width:"100%", display:"flex", alignItems:"center", gap:8, padding:"9px 16px", background:active?G.greenBg:hovFilter===opt.value?G.bg:"none", border:"none", cursor:"pointer", fontSize:13, fontWeight:active?700:500, color:active?G.greenDeep:G.text, fontFamily:FONT, textAlign:"left", transition:"background 0.1s" }}>
                    {active
                      ? <svg width="13" height="13" fill={G.green} viewBox="0 0 20 20"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/></svg>
                      : <span style={{ width:13, flexShrink:0 }} />
                    }
                    {opt.label}
                  </button>
                );
              })}
            </div>
          )}
        </div>
 
        {/* Export PDF */}
        <button onClick={handleExportPDF}
          style={{ display:"inline-flex", alignItems:"center", gap:7, fontSize:12, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"7px 16px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.22)", whiteSpace:"nowrap" }}>
          <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/>
          </svg>
          Export PDF
        </button>
      </div>
 
      {/* ── Timeline content ── */}
      <div style={{ flex:1, overflowY:"auto", padding:"24px 22px" }}>
        {Object.keys(grouped).length === 0 ? (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", height:192, textAlign:"center" }}>
            <div style={{ width:52, height:52, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:12 }}>🔍</div>
            <p style={{ fontSize:14, fontWeight:700, color:G.text }}>No events found</p>
            <p style={{ fontSize:12, color:G.muted, marginTop:4 }}>Try a different filter</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, events]) => (
            <div key={date} style={{ marginBottom:32 }}>
 
              {/* Date header */}
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:10, height:10, borderRadius:"50%", background:G.gradGreen, flexShrink:0, boxShadow:`0 0 0 3px ${G.greenBorder}` }} />
                <h3 style={{ fontSize:13, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.2px" }}>{date}</h3>
                <div style={{ flex:1, height:1, background:G.greenBorder }} />
              </div>
 
              {/* Events */}
              <div style={{ marginLeft:20, borderLeft:`2px solid ${G.greenBorder}`, paddingLeft:20, display:"flex", flexDirection:"column", gap:10 }}>
                {events.map(event => {
                  const ts = TYPE_STYLE[event.type] || TYPE_STYLE.system;
                  const isHov = hovRow === event.id;
                  return (
                    <div key={event.id}
                      onMouseEnter={() => setHovRow(event.id)}
                      onMouseLeave={() => setHovRow(null)}
                      style={{ position:"relative", background:G.white, border:`1px solid ${isHov?G.green:G.greenBorder}`, borderRadius:14, padding:"13px 16px", transition:"all 0.12s", boxShadow:isHov?"0 4px 16px rgba(110,192,48,0.10)":"0 2px 6px rgba(110,192,48,0.04)" }}>
 
                      {/* Timeline dot */}
                      <div style={{ position:"absolute", left:-28, top:16, width:10, height:10, borderRadius:"50%", background:ts.dot, border:`2px solid ${G.white}`, boxShadow:`0 0 0 2px ${ts.dot}` }} />
 
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12 }}>
                        <div style={{ display:"flex", alignItems:"flex-start", gap:10, flex:1, minWidth:0 }}>
                          <span style={{ fontSize:16, flexShrink:0, marginTop:1 }}>{event.icon}</span>
                          <div style={{ flex:1, minWidth:0 }}>
                            <p style={{ fontSize:13, color:G.text, lineHeight:1.6, margin:"0 0 8px" }}>{event.content}</p>
                            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              <span style={{ fontSize:11, color:G.muted }}>{event.time}</span>
                              {event.by && (
                                <>
                                  <span style={{ color:G.greenBorder, fontSize:11 }}>·</span>
                                  <span style={{ fontSize:11, color:G.sub }}>by {event.by}</span>
                                </>
                              )}
                              {/* Type badge */}
                              <span style={{ fontSize:10, fontWeight:700, background:ts.bg, color:ts.text, border:`1px solid ${ts.border}`, padding:"2px 9px", borderRadius:99 }}>
                                {FILTER_OPTIONS.find(f => f.value === event.type)?.label || event.type}
                              </span>
                            </div>
                          </div>
                        </div>
 
                        {/* Locked badge */}
                        {event.locked && (
                          <div style={{ display:"flex", alignItems:"center", gap:5, flexShrink:0, background:G.amberBg, border:`1px solid ${G.amberBorder}`, borderRadius:99, padding:"3px 10px" }}>
                            <svg width="11" height="11" fill={G.amber} viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
                            </svg>
                            <span style={{ fontSize:10, fontWeight:700, color:G.amberText }}>Locked</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}