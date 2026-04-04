// ── AgencyChannelADemo.jsx ─────────────────────────────
import { useState } from "react";
import ProjectStreamChat from "./ProjectStreamChat";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./MeetingsView";
import SupportView from "./SupportView";
import { ROLES, PARTICIPANTS, VIEWER_OPTIONS, PROJECT_INFO } from "./ProjectData";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
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

const ROLE_STYLE = {
  admin:       { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   },
  agency_admin:{ bg: G.blueBg,   border: G.blueBorder,  text: G.blue      },
  agency_team: { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   },
  client:      { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
};

function Badge({ role }) {
  const r = ROLES[role];
  const s = ROLE_STYLE[role] || { bg: G.bg, border: G.border, text: G.muted };
  return (
    <span style={{
      fontSize: 10, fontWeight: 800, fontFamily: FONT,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 8px", borderRadius: 99,
    }}>{r.label}</span>
  );
}

const NAV_ITEMS = [
  { id: "chat",     icon: "💬", label: "Stream"   },
  { id: "timeline", icon: "📅", label: "Timeline" },
  { id: "files",    icon: "📁", label: "Files"    },
  { id: "meetings", icon: "🗓", label: "Meetings" },
  { id: "support",  icon: "🎧", label: "Support"  },
];

export default function AgencyChannelADemo() {
  const [activeView, setActiveView] = useState("chat");
  const [viewingAs,  setViewingAs]  = useState("client");
  const [leftOpen,   setLeftOpen]   = useState(false);
  const [rightOpen,  setRightOpen]  = useState(false);

  const escrow    = PROJECT_INFO.escrow;
  const milestone = PROJECT_INFO.milestone;

  /* ── Shared section label ── */
  function RSLabel({ icon, text }) {
    return (
      <p style={{
        fontSize: 10, fontWeight: 800, textTransform: "uppercase",
        letterSpacing: "0.08em", color: G.greenDeep,
        display: "flex", alignItems: "center", gap: 6,
        marginBottom: 10, fontFamily: FONT, margin: "0 0 10px",
      }}>
        <span style={{ color: G.green }}>{icon}</span> {text}
      </p>
    );
  }

  function RSSection({ children, last = false }) {
    return (
      <div style={{ padding: "14px 16px", borderBottom: last ? "none" : `1px solid ${G.greenBorder}` }}>
        {children}
      </div>
    );
  }

  /* ── Right sidebar content ── */
  function RightSidebarContent() {
    return (
      <>
        {/* Viewing as */}
        <RSSection>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: G.muted }}>Viewing as:</span>
            <Badge role={viewingAs} />
          </div>
        </RSSection>

        {/* Project Info */}
        <RSSection>
          <RSLabel icon="📋" text="Project Info" />
          <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 3px" }}>{PROJECT_INFO.name}</p>
          <p style={{ fontSize: 11, color: G.muted, margin: "0 0 8px" }}>Started: {PROJECT_INFO.startDate}</p>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: G.greenBg, border: `1px solid ${G.greenBorder}`,
            color: G.greenDeep, fontSize: 11, fontWeight: 700,
            padding: "4px 10px", borderRadius: 99,
          }}>📢 Channel A — Official Project Channel</div>
        </RSSection>

        {/* Escrow */}
        <RSSection>
          <RSLabel icon="💰" text="Escrow" />
          {[
            { label: "Total:",     value: `$${escrow.total.toLocaleString()}`,                        color: G.text      },
            { label: "Released:",  value: `$${escrow.released.toLocaleString()} ✓`,                   color: G.greenDeep },
            { label: "Remaining:", value: `$${(escrow.total - escrow.released).toLocaleString()}`,    color: G.text      },
          ].map(({ label, value, color }) => (
            <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "3px 0" }}>
              <span style={{ color: G.muted }}>{label}</span>
              <span style={{ fontWeight: 700, color }}>{value}</span>
            </div>
          ))}
        </RSSection>

        {/* Milestone */}
        <RSSection>
          <RSLabel icon="📊" text="Milestone" />
          <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 2px" }}>
            Current: {milestone.current} of {milestone.total}
          </p>
          <p style={{ fontSize: 12, color: G.sub, margin: "0 0 2px" }}>{milestone.name}</p>
          <p style={{ fontSize: 11, color: G.muted, margin: "0 0 8px" }}>
            Due: {milestone.due} ({milestone.daysLeft} days left)
          </p>
          <div style={{ height: 6, background: G.border, borderRadius: 99, overflow: "hidden", marginBottom: 4 }}>
            <div style={{ width: `${milestone.progress}%`, height: "100%", background: G.green, borderRadius: 99 }} />
          </div>
          <p style={{ fontSize: 11, fontWeight: 800, color: G.greenDeep, textAlign: "right", margin: 0 }}>{milestone.progress}%</p>
        </RSSection>

        {/* Participants */}
        <RSSection>
          <RSLabel icon="👥" text="Participants" />
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 10 }}>
            {PARTICIPANTS.map((p) => (
              <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.online ? G.green : G.muted, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, color: G.text }}>{p.name}</span>
                </div>
                <Badge role={p.role} />
              </div>
            ))}
          </div>
          <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: "8px 12px" }}>
            <p style={{ fontSize: 11, color: "#92400e", margin: 0, lineHeight: 1.6 }}>
              <strong>Agency team</strong> can participate, but only <strong>Agency Admin</strong> makes binding commitments.
            </p>
          </div>
        </RSSection>

        {/* Admin monitoring */}
        <RSSection>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: G.red, fontWeight: 600 }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.red, flexShrink: 0 }} />
            ⚠ Admin is monitoring this project
          </div>
        </RSSection>

        {/* View As */}
        <RSSection last>
          <p style={{ fontSize: 11, color: G.muted, marginBottom: 6 }}>View as:</p>
          <select value={viewingAs} onChange={(e) => setViewingAs(e.target.value)} style={{
            width: "100%", fontSize: 12, fontFamily: FONT,
            border: `1.5px solid ${G.greenBorder}`, borderRadius: 8,
            padding: "7px 10px", background: G.white, color: G.text, outline: "none",
          }}>
            {VIEWER_OPTIONS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </RSSection>
      </>
    );
  }

  /* ── Left sidebar content ── */
  function LeftSidebarContent() {
    return (
      <>
        {/* Header */}
        <div style={{ padding: "14px 16px", borderBottom: `1px solid ${G.greenBorder}`, background: G.gradNavy }}>
          <button style={{ fontSize: 12, color: "rgba(255,255,255,0.7)", background: "none", border: "none", cursor: "pointer", fontFamily: FONT, marginBottom: 6, display: "flex", alignItems: "center", gap: 4 }}>← Back</button>
          <h2 style={{ fontSize: 13, fontWeight: 800, color: G.white, margin: "0 0 6px", lineHeight: 1.3 }}>{PROJECT_INFO.name}</h2>
          <span style={{
            display: "inline-flex", alignItems: "center", gap: 5,
            background: "rgba(255,255,255,0.15)", color: G.white,
            fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
          }}>📢 Channel A</span>
        </div>

        {/* Channels */}
        <div style={{ padding: "10px 8px", borderBottom: `1px solid ${G.greenBorder}` }}>
          <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, padding: "0 8px", marginBottom: 6 }}>Channels</p>
          <button onClick={() => { setActiveView("chat"); setLeftOpen(false); }} style={{
            width: "100%", display: "flex", alignItems: "center", gap: 8,
            padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: FONT,
            background: activeView === "chat" ? G.greenBg : "transparent",
            color: activeView === "chat" ? G.greenDeep : G.sub,
            fontWeight: activeView === "chat" ? 700 : 500, fontSize: 13,
            position: "relative",
          }}>
            {activeView === "chat" && <span style={{ position: "absolute", left: 0, top: 4, bottom: 4, width: 3, background: G.green, borderRadius: "0 3px 3px 0" }} />}
            <span style={{ color: activeView === "chat" ? G.green : G.muted, fontWeight: 700 }}>#</span>
            Project Stream
            <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 800, background: G.gradNavy, color: G.white, padding: "2px 7px", borderRadius: 99 }}>2</span>
          </button>
        </div>

        {/* Views */}
        <div style={{ padding: "10px 8px", flex: 1 }}>
          <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, padding: "0 8px", marginBottom: 6 }}>Views</p>
          {NAV_ITEMS.filter(i => i.id !== "chat").map((item) => (
            <button key={item.id} onClick={() => { setActiveView(item.id); setLeftOpen(false); }} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 8,
              padding: "8px 10px", borderRadius: 8, border: "none", cursor: "pointer", fontFamily: FONT,
              background: activeView === item.id ? G.greenBg : "transparent",
              color: activeView === item.id ? G.greenDeep : G.sub,
              fontWeight: activeView === item.id ? 700 : 500, fontSize: 13,
              marginBottom: 2, position: "relative",
            }}>
              {activeView === item.id && <span style={{ position: "absolute", left: 0, top: 4, bottom: 4, width: 3, background: G.green, borderRadius: "0 3px 3px 0" }} />}
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* View As */}
        <div style={{ padding: "12px 16px", borderTop: `1px solid ${G.greenBorder}`, marginTop: "auto" }}>
          <p style={{ fontSize: 11, color: G.muted, marginBottom: 6 }}>View as:</p>
          <select value={viewingAs} onChange={(e) => setViewingAs(e.target.value)} style={{
            width: "100%", fontSize: 12, fontFamily: FONT,
            border: `1.5px solid ${G.greenBorder}`, borderRadius: 8,
            padding: "7px 10px", background: G.white, color: G.text, outline: "none",
          }}>
            {VIEWER_OPTIONS.map((v) => <option key={v.value} value={v.value}>{v.label}</option>)}
          </select>
        </div>
      </>
    );
  }

  return (
    <div style={{ display: "flex", height: "100vh", background: G.bg, fontFamily: FONT, overflow: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        @media (min-width:768px)  { .mob-only  { display:none!important; } }
        @media (max-width:767px)  { .desk-only { display:none!important; } }
        @media (max-width:1023px) { .hide-sm   { display:none!important; } }
        button:focus,select:focus { outline:none; }
      `}</style>

      {/* Desktop Left Sidebar */}
      <aside className="desk-only" style={{
        width: 200, background: G.greenBg,
        borderRight: `1px solid ${G.greenBorder}`,
        display: "flex", flexDirection: "column", flexShrink: 0,
        boxShadow: "2px 0 8px rgba(110,192,48,0.07)",
      }}>
        <LeftSidebarContent />
      </aside>

      {/* Mobile Left Drawer */}
      {leftOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex" }} className="mob-only">
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setLeftOpen(false)} />
          <aside style={{
            position: "relative", zIndex: 50, width: 260,
            background: G.greenBg, height: "100%",
            display: "flex", flexDirection: "column",
            boxShadow: "4px 0 24px rgba(15,26,59,0.15)", overflowY: "auto",
          }}>
            <LeftSidebarContent />
          </aside>
        </div>
      )}

      {/* Main */}
      <main style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

        {/* Mobile top bar */}
        <div className="mob-only" style={{
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "10px 14px", background: G.white,
          borderBottom: `1px solid ${G.greenBorder}`, flexShrink: 0,
          boxShadow: "0 2px 8px rgba(110,192,48,0.07)",
        }}>
          <button onClick={() => setLeftOpen(true)} style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, padding: 6, display: "flex" }}>
            <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/></svg>
          </button>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span style={{ fontWeight: 800, fontSize: 13, color: G.text }}>{PROJECT_INFO.name}</span>
            <span style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, color: G.greenDeep, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 99 }}>Ch A</span>
          </div>
          <button onClick={() => setRightOpen(true)} style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 8, padding: "5px 8px", cursor: "pointer", color: G.greenDeep, display: "flex" }}>
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
          </button>
        </div>

        {/* Active view */}
        <div style={{ flex: 1, overflow: "hidden", display: "flex", flexDirection: "column", minHeight: 0 }}>
          {activeView === "chat"     && <ProjectStreamChat viewingAs={viewingAs} />}
          {activeView === "timeline" && <TimelineView />}
          {activeView === "files"    && <FilesView />}
          {activeView === "meetings" && <MeetingsView />}
          {activeView === "support"  && <SupportView />}
        </div>

        {/* Mobile bottom nav */}
        <nav className="mob-only" style={{
          display: "flex", alignItems: "center", justifyContent: "space-around",
          borderTop: `1px solid ${G.greenBorder}`, background: G.white,
          flexShrink: 0, padding: "4px 0",
          boxShadow: "0 -2px 10px rgba(110,192,48,0.08)",
        }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => setActiveView(item.id)} style={{
              display: "flex", flexDirection: "column", alignItems: "center",
              gap: 2, padding: "6px 12px", border: "none", cursor: "pointer",
              background: activeView === item.id ? G.greenBg : "none",
              color: activeView === item.id ? G.greenDeep : G.muted,
              borderRadius: 10, fontFamily: FONT, position: "relative",
              transition: "background 0.1s",
            }}>
              <span style={{ fontSize: 18, lineHeight: 1 }}>{item.icon}</span>
              <span style={{ fontSize: 10, fontWeight: activeView === item.id ? 800 : 500 }}>{item.label}</span>
              {item.id === "chat" && (
                <span style={{ position: "absolute", top: 2, right: 8, background: G.green, color: G.white, fontSize: 9, fontWeight: 800, borderRadius: 99, padding: "1px 5px" }}>2</span>
              )}
            </button>
          ))}
        </nav>
      </main>

      {/* Desktop Right Sidebar */}
      <aside className="hide-sm" style={{
        width: 272, background: G.white,
        borderLeft: `1px solid ${G.greenBorder}`,
        display: "flex", flexDirection: "column",
        flexShrink: 0, overflowY: "auto",
        boxShadow: "-2px 0 8px rgba(110,192,48,0.06)",
      }}>
        <div style={{ padding: "12px 16px", background: G.greenBg, borderBottom: `1px solid ${G.greenBorder}`, display: "flex", justifyContent: "flex-end" }}>
          <button style={{
            display: "flex", alignItems: "center", gap: 6,
            border: `1px solid ${G.greenBorder}`, borderRadius: 100,
            padding: "5px 14px", fontSize: 11, fontWeight: 700, fontFamily: FONT,
            background: G.white, color: G.greenDeep, cursor: "pointer",
          }}>👁 Demo</button>
        </div>
        <RightSidebarContent />
      </aside>

      {/* Mobile Right Drawer */}
      {rightOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 40, display: "flex", justifyContent: "flex-end" }} className="mob-only">
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setRightOpen(false)} />
          <aside style={{
            position: "relative", zIndex: 50, width: 288, maxWidth: "100%",
            background: G.white, height: "100%",
            display: "flex", flexDirection: "column", overflowY: "auto",
            boxShadow: "-4px 0 24px rgba(15,26,59,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${G.greenBorder}`, background: G.gradNavy, position: "sticky", top: 0, zIndex: 10 }}>
              <span style={{ fontWeight: 800, color: G.white, fontSize: 13 }}>Project Info</span>
              <button onClick={() => setRightOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: 4, cursor: "pointer", color: G.white, display: "flex" }}>
                <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
              </button>
            </div>
            <RightSidebarContent />
          </aside>
        </div>
      )}
    </div>
  );
}