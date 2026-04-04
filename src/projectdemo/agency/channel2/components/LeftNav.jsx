// ── LeftNav.jsx ────────────────────────────────────────
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
};
const FONT = "'Poppins', sans-serif";

export default function LeftNav({ activeView, setActiveView, project, messages, mobile = false }) {
  const [hovered, setHovered] = useState(null);
  const unreadCount = messages?.filter(m => !m.is_system).length || 0;

  const navItems = [
    { id:"chat",     label:"Project Stream", badge: unreadCount, icon: <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/></svg> },
    { id:"timeline", label:"Timeline",       icon: <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/></svg> },
    { id:"files",    label:"Files",          icon: <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"/></svg> },
    { id:"meetings", label:"Meetings",       icon: <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg> },
    { id:"support",  label:"Support",        icon: <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z"/></svg> },
  ];

  return (
    <div style={{
      width: mobile ? "100%" : 240,
      flexShrink: 0,
      borderRight: mobile ? "none" : `1px solid ${G.greenBorder}`,
      background: G.greenBg,
      display: "flex", flexDirection: "column",
      overflowY: "auto", fontFamily: FONT,
      height: mobile ? "100%" : "100%",
    }}>

      {/* Section label */}
      <div style={{ padding: "16px 16px 8px", borderBottom: `1px solid ${G.greenBorder}` }}>
        <p style={{ fontSize: 10, fontWeight: 800, color: G.greenDeep, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>
          Channels
        </p>
      </div>

      {/* Nav items */}
      <nav style={{ display: "flex", flexDirection: "column", gap: 3, padding: "10px 8px" }}>
        {navItems.map(item => {
          const isActive  = activeView === item.id;
          const isHovered = hovered === item.id;
          return (
            <button key={item.id} onClick={() => setActiveView(item.id)}
              onMouseEnter={() => setHovered(item.id)}
              onMouseLeave={() => setHovered(null)}
              style={{
                width: "100%", display: "flex", alignItems: "center", gap: 10,
                padding: "9px 12px", borderRadius: 10, border: "none", cursor: "pointer",
                textAlign: "left", transition: "all 0.15s", fontFamily: FONT,
                background: isActive ? G.white : isHovered ? "rgba(255,255,255,0.5)" : "transparent",
                color: isActive ? G.greenDeep : G.sub, fontWeight: isActive ? 700 : 600,
                position: "relative",
                boxShadow: isActive ? "0 2px 8px rgba(110,192,48,0.1)" : "none",
              }}>
              {isActive && <span style={{ position: "absolute", left: 0, top: 5, bottom: 5, width: 3, background: G.green, borderRadius: "0 3px 3px 0" }} />}
              <span style={{ display: "flex", color: isActive ? G.green : G.muted }}>{item.icon}</span>
              <span style={{ flex: 1, fontSize: 13, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.label}</span>
              {item.badge > 0 && (
                <span style={{ background: G.gradNavy, color: G.white, fontSize: 10, fontWeight: 800, padding: "2px 8px", borderRadius: 100, boxShadow: "0 2px 6px rgba(15,26,59,0.2)" }}>
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}
      </nav>

      <div style={{ flex: 1 }} />

      {/* Project progress */}
      <div style={{ margin: "12px", padding: "14px", background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 14, boxShadow: "0 2px 8px rgba(110,192,48,0.06)" }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: "0 0 8px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {project?.name || "Current Project"}
        </p>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div style={{ flex: 1, height: 5, background: G.greenBorder, borderRadius: 99, overflow: "hidden" }}>
            <div style={{ height: "100%", background: G.green, borderRadius: 99, width: `${project?.progress || 0}%`, transition: "width 0.3s ease" }} />
          </div>
          <span style={{ fontSize: 11, fontWeight: 800, color: G.greenDeep }}>{project?.progress || 0}%</span>
        </div>
      </div>
    </div>
  );
}