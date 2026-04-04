// ── TimelineView.jsx (Agency version) ─────────────────
import { useState, useRef } from "react";

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
};
const FONT = "'Poppins', sans-serif";

const ALL_EVENTS = [
  { date:"March 1, 2026",  time:"10:00 AM", by:null,             locked:true,  category:"admin",    icon:"🏢", content:"ProjectStream (Channel A) for 'E-Commerce Platform' has been created. All communication, deliverables, decisions, and payments for this project will be tracked here. This space is permanent and legally logged." },
  { date:"March 1, 2026",  time:"10:00 AM", by:null,             locked:true,  category:"payment",  icon:"💰", content:"Escrow funded: $85,000 secured for this project." },
  { date:"March 1, 2026",  time:"11:00 AM", by:"TechCorp Agency",locked:false, category:"milestone",icon:"📋", content:"TechCorp Agency confirmed scope and assigned Maya S. (Frontend Lead) and Dev K. (Backend). Team structure approved." },
  { date:"March 2, 2026",  time:"12:30 PM", by:"TechCorp Agency",locked:true,  category:"decision", icon:"🔒", content:"Persistent filters confirmed as Milestone 1 requirement. Agency Admin commitment logged by system." },
  { date:"March 20, 2026", time:"5:10 PM",  by:"Dev K.",          locked:true,  category:"milestone",icon:"📦", content:"Milestone 1 deliverables submitted by agency. Client has 7 business days to review." },
  { date:"March 22, 2026", time:"2:00 PM",  by:"Alex R.",         locked:false, category:"approval", icon:"✅", content:"Client approved Milestone 1 deliverables. Prototype accepted. Proceeding to Milestone 2 — Backend Integration." },
  { date:"March 22, 2026", time:"2:30 PM",  by:"Platform Admin",  locked:true,  category:"admin",    icon:"🔴", content:"Platform Admin: Milestone 1 officially approved. Payment of $21,250 released from escrow. Decision is final and non-reversible." },
  { date:"March 22, 2026", time:"2:32 PM",  by:null,              locked:true,  category:"payment",  icon:"💰", content:"Client approved Milestone 1 — $21,250 released from escrow. Agency account updated." },
  { date:"April 1, 2026",  time:"10:00 AM", by:"TechCorp Agency", locked:false, category:"milestone",icon:"🚀", content:"Milestone 2 (Backend Integration) officially started. API architecture document submitted to client for review." },
];

const FILTERS = [
  { label: "All Events",       value: "all",       icon: "📋" },
  { label: "Payments & Escrow",value: "payment",   icon: "💰" },
  { label: "Milestones",       value: "milestone", icon: "📦" },
  { label: "Admin Actions",    value: "admin",     icon: "🔴" },
  { label: "Approvals",        value: "approval",  icon: "✅" },
  { label: "Decisions",        value: "decision",  icon: "🔒" },
];

function groupByDate(events) {
  const map = {};
  events.forEach(ev => { if (!map[ev.date]) map[ev.date] = []; map[ev.date].push(ev); });
  return Object.entries(map).map(([date, evs]) => ({ date, events: evs }));
}

export default function TimelineView() {
  const [filter,             setFilter]             = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [exporting,          setExporting]          = useState(false);
  const printRef = useRef(null);

  const activeFilter = FILTERS.find(f => f.value === filter);
  const filtered = filter === "all" ? ALL_EVENTS : ALL_EVENTS.filter(ev => ev.category === filter);
  const grouped  = groupByDate(filtered);

  function handleExportPDF() {
    setExporting(true);
    setTimeout(() => {
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`<html><head><title>Project Timeline</title>
        <style>body{font-family:Arial,sans-serif;padding:32px;color:#1f2937}h1{font-size:22px;font-weight:bold}
        .date{font-weight:bold;font-size:15px;margin:20px 0 8px;border-bottom:1px solid #e5e7eb;padding-bottom:4px}
        .event{border:1px solid #e5e7eb;border-radius:8px;padding:12px 16px;margin-bottom:8px;background:#f9fafb}
        .locked{background:#fff7ed;border-color:#fed7aa}
        .meta{font-size:11px;color:#9ca3af;margin-top:6px}
        </style></head><body>
        <h1>📋 Project Timeline — E-Commerce Platform</h1>
        ${grouped.map(g => `<div class="date">${g.date}</div>${g.events.map(ev => `
          <div class="event ${ev.locked ? "locked" : ""}">
            <div>${ev.icon} ${ev.content}</div>
            <div class="meta">${ev.time}${ev.by ? ` · by ${ev.by}` : ""}${ev.locked ? " · 🔒 LOCKED" : ""}</div>
          </div>`).join("")}`).join("")}
        </body></html>`);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => { printWindow.print(); printWindow.close(); setExporting(false); }, 500);
    }, 100);
  }

  return (
    <div ref={printRef} style={{ flex: 1, overflowY: "auto", padding: 24, fontFamily: FONT, background: G.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} button:focus{outline:none;}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: 0 }}>Project Timeline</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          {/* Filter dropdown */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowFilterDropdown(!showFilterDropdown)} style={{
              display: "flex", alignItems: "center", gap: 8, fontSize: 12, fontWeight: 600, fontFamily: FONT,
              border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "7px 14px",
              background: G.white, color: G.greenDeep, cursor: "pointer", minWidth: 180,
            }}>
              <span>{activeFilter.icon}</span>
              <span style={{ flex: 1, textAlign: "left" }}>{activeFilter.label}</span>
              <span style={{ fontSize: 10, color: G.muted }}>▾</span>
            </button>
            {showFilterDropdown && (
              <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 12, boxShadow: "0 4px 20px rgba(110,192,48,0.12)", zIndex: 20, minWidth: 200, padding: "6px 0" }}>
                {FILTERS.map(f => (
                  <button key={f.value} onClick={() => { setFilter(f.value); setShowFilterDropdown(false); }} style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "9px 16px", fontSize: 13, fontFamily: FONT, background: "none", border: "none", cursor: "pointer",
                    color: filter === f.value ? G.greenDeep : G.sub,
                    fontWeight: filter === f.value ? 700 : 500,
                    transition: "background 0.1s",
                  }}
                    onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                    onMouseLeave={e => e.currentTarget.style.background = "none"}
                  >
                    {filter === f.value && <span style={{ color: G.green, fontSize: 11 }}>✓</span>}
                    {filter !== f.value && <span style={{ width: 14 }} />}
                    <span>{f.icon}</span><span>{f.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export */}
          <button onClick={handleExportPDF} disabled={exporting} style={{
            display: "flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT,
            border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "7px 16px",
            background: exporting ? G.bg : G.white, color: exporting ? G.muted : G.greenDeep,
            cursor: exporting ? "not-allowed" : "pointer",
          }}>
            {exporting ? "⏳ Generating..." : "⬇ Export PDF"}
          </button>
        </div>
      </div>

      {/* Active filter badge */}
      {filter !== "all" && (
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
          <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}`, fontSize: 11, fontWeight: 700, padding: "3px 12px", borderRadius: 99 }}>
            {activeFilter.icon} {activeFilter.label}
            <button onClick={() => setFilter("all")} style={{ background: "none", border: "none", color: G.greenDeep, cursor: "pointer", fontSize: 12, padding: 0, marginLeft: 2 }}>✕</button>
          </span>
          <span style={{ fontSize: 11, color: G.muted }}>{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Empty state */}
      {grouped.length === 0 && (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "64px 20px", textAlign: "center" }}>
          <span style={{ fontSize: 40, marginBottom: 12 }}>📭</span>
          <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: "0 0 6px" }}>No {activeFilter.label.toLowerCase()} yet</p>
          <p style={{ fontSize: 12, color: G.muted, margin: "0 0 16px" }}>Events will appear here as the project progresses</p>
          <button onClick={() => setFilter("all")} style={{ fontSize: 13, fontWeight: 700, color: G.greenDeep, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>Show all events</button>
        </div>
      )}

      {/* Timeline */}
      <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
        {grouped.map((group, gi) => (
          <div key={gi}>
            {/* Date header */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
              <span style={{ width: 13, height: 13, borderRadius: "50%", background: G.green, flexShrink: 0, boxShadow: `0 0 0 3px ${G.greenBorder}` }} />
              <span style={{ fontSize: 14, fontWeight: 800, color: G.text }}>{group.date}</span>
            </div>

            {/* Events */}
            <div style={{ marginLeft: 6, paddingLeft: 24, borderLeft: `2px solid ${G.green}`, display: "flex", flexDirection: "column", gap: 10 }}>
              {group.events.map((ev, ei) => (
                <div key={ei} style={{ position: "relative" }}>
                  <span style={{ position: "absolute", left: -31, top: 16, width: 10, height: 10, borderRadius: "50%", background: G.greenBorder, border: `2px solid ${G.white}` }} />
                  <div style={{
                    background: G.white,
                    border: `1px solid ${ev.locked ? G.amberBorder : G.greenBorder}`,
                    borderRadius: 12, padding: "12px 16px",
                    boxShadow: "0 1px 6px rgba(110,192,48,0.06)",
                  }}>
                    <p style={{ fontSize: 13, color: G.text, lineHeight: 1.7, margin: "0 0 8px" }}>
                      <span style={{ marginRight: 6 }}>{ev.icon}</span>{ev.content}
                    </p>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 11, color: G.muted }}>
                        <span>{ev.time}</span>
                        {ev.by && <><span style={{ color: G.border }}>·</span><span>by <strong style={{ color: G.sub }}>{ev.by}</strong></span></>}
                      </div>
                      {ev.locked && (
                        <span style={{ fontSize: 10, fontWeight: 700, background: G.amberBg, color: "#92400e", border: `1px solid ${G.amberBorder}`, padding: "2px 9px", borderRadius: 99, fontFamily: FONT }}>
                          🔒 LOCKED
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}