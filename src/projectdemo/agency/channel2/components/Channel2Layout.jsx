// ── Channel2Layout.jsx ─────────────────────────────────
import { useState } from "react";
import ChatWindow   from "./ChatWindow";
import RightSidebar from "./RightSidebar";
import LeftNav      from "./LeftNav";
import TimelineView from "./TimelineView";
import FilesView    from "./FilesView";
import MeetingsView from "./MeetingsView";
import SupportView  from "./SupportView";

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

export default function Channel2Layout({
  messages, currentUser, participants, project,
  onSendMessage, isSidebarOpen, setIsSidebarOpen,
}) {
  const [activeView,     setActiveView]     = useState("chat");
  const [leftNavOpen,    setLeftNavOpen]    = useState(false);   // mobile left drawer
  const [rightDrawerOpen,setRightDrawerOpen]= useState(false);   // mobile right drawer

  const isTrack = project.status === "on_track";

  const CloseIcon = () => (
    <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
      <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: G.bg, fontFamily: FONT }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        @media (min-width: 768px)  { .mob-only  { display: none !important; } }
        @media (max-width: 767px)  { .desk-only { display: none !important; } }
        @media (max-width: 1023px) { .hide-sm   { display: none !important; } }
        button:focus, select:focus, input:focus, textarea:focus { outline: none; }
        ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-thumb { background: ${G.greenBorder}; border-radius: 99px; }
      `}</style>

      {/* ── Top Navbar ── */}
      <div style={{
        height: 56, background: G.white, borderBottom: `1px solid ${G.greenBorder}`,
        display: "flex", alignItems: "center", padding: "0 16px", gap: 10,
        flexShrink: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.06)", zIndex: 30,
      }}>

        {/* Mobile hamburger */}
        <button className="mob-only" onClick={() => setLeftNavOpen(true)} style={{
          background: "none", border: "none", cursor: "pointer", color: G.muted,
          display: "flex", alignItems: "center", padding: 4,
        }}>
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {/* Logo */}
        <span style={{ fontSize: 18, fontWeight: 800, color: G.greenDeep, letterSpacing: "-0.02em" }}>
          weblance
        </span>

        <div style={{ height: 20, width: 1, background: G.greenBorder }} className="desk-only" />

        {/* Project info — desktop */}
        <div className="desk-only" style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, background: G.bg, color: G.sub, padding: "3px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em", border: `1px solid ${G.border}` }}>
            Internal
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G.text, maxWidth: 260, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {project.name}
          </span>
          <span style={{
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
            background: isTrack ? G.greenBg : G.redBg,
            color: isTrack ? G.greenDeep : "#dc2626",
            border: `1px solid ${isTrack ? G.greenBorder : G.redBorder}`,
          }}>
            {isTrack ? "On Track" : "At Risk"}
          </span>
        </div>

        {/* Visibility Warning — desktop */}
        <div className="desk-only" style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#92400e", background: G.amberBg, border: `1px solid ${G.amberBorder}`, padding: "3px 10px", borderRadius: 99 }}>
          <svg width="11" height="11" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Agency + Team + Admin only
        </div>

        {/* Mobile project name */}
        <span className="mob-only" style={{ fontSize: 13, fontWeight: 800, color: G.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", maxWidth: 140 }}>
          {project.name}
        </span>

        <div style={{ flex: 1 }} />

        {/* Avatar stack */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 4 }}>
          {participants.slice(0, 4).map((p, i) => {
            const roleBg    = p.role === "platform_admin" ? G.redBg  : p.role === "agency_admin" ? G.blueBg : G.amberBg;
            const roleColor = p.role === "platform_admin" ? "#dc2626": p.role === "agency_admin" ? G.blue   : "#92400e";
            return (
              <div key={p.id} title={p.name} style={{
                width: 26, height: 26, borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700,
                border: `2px solid ${G.white}`, background: roleBg, color: roleColor,
                marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i,
              }}>{p.avatar}</div>
            );
          })}
          {participants.length > 4 && (
            <div style={{
              width: 26, height: 26, borderRadius: "50%",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 10, fontWeight: 700,
              border: `2px solid ${G.white}`, background: G.bg, color: G.muted,
              marginLeft: -8, zIndex: 0,
            }}>+{participants.length - 4}</div>
          )}
        </div>

        {/* Sidebar toggle — desktop */}
        <button className="hide-sm" onClick={() => setIsSidebarOpen(!isSidebarOpen)} style={{
          background: "none", border: "none", cursor: "pointer",
          padding: 6, borderRadius: 8, color: G.sub, display: "flex",
          transition: "background 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
          onMouseLeave={e => e.currentTarget.style.background = "none"}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>

        {/* Mobile info button */}
        <button className="mob-only" onClick={() => setRightDrawerOpen(true)} style={{
          background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 8,
          padding: "5px 8px", cursor: "pointer", color: G.greenDeep, display: "flex",
        }}>
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </button>
      </div>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Desktop Left Nav */}
        <div className="desk-only" style={{ flexShrink: 0 }}>
          <LeftNav activeView={activeView} setActiveView={setActiveView} project={project} messages={messages} />
        </div>

        {/* Mobile Left Drawer */}
        {leftNavOpen && (
          <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }} className="mob-only">
            <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setLeftNavOpen(false)} />
            <div style={{
              position: "relative", zIndex: 51, width: 250,
              background: G.greenBg, height: "100%",
              display: "flex", flexDirection: "column",
              boxShadow: "4px 0 24px rgba(15,26,59,0.15)",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: G.gradNavy, borderBottom: `1px solid ${G.greenBorder}` }}>
                <span style={{ fontWeight: 800, color: G.white, fontSize: 14 }}>Navigation</span>
                <button onClick={() => setLeftNavOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: 4, cursor: "pointer", color: G.white, display: "flex" }}>
                  <CloseIcon />
                </button>
              </div>
              <LeftNav activeView={activeView} setActiveView={(v) => { setActiveView(v); setLeftNavOpen(false); }} project={project} messages={messages} mobile />
            </div>
          </div>
        )}

        {/* Main workspace */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: G.bg, minWidth: 0 }}>
          {activeView === "chat"     && <ChatWindow    messages={messages} currentUser={currentUser} participants={participants} project={project} onSendMessage={onSendMessage} />}
          {activeView === "timeline" && <TimelineView  project={project} />}
          {activeView === "files"    && <FilesView     project={project} />}
          {activeView === "meetings" && <MeetingsView  participants={participants} />}
          {activeView === "support"  && <SupportView />}
        </div>

        {/* Desktop Right Sidebar */}
        {isSidebarOpen && (
          <div className="hide-sm" style={{
            width: 288, flexShrink: 0, borderLeft: `1px solid ${G.greenBorder}`,
            background: G.white, overflowY: "auto",
            boxShadow: "-4px 0 15px rgba(110,192,48,0.04)",
          }}>
            <RightSidebar participants={participants} project={project} currentUser={currentUser} />
          </div>
        )}
      </div>

      {/* Mobile Right Drawer */}
      {rightDrawerOpen && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} className="mob-only">
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setRightDrawerOpen(false)} />
          <div style={{
            position: "relative", zIndex: 51, width: 288, maxWidth: "90vw",
            background: G.white, height: "100%", overflowY: "auto",
            boxShadow: "-4px 0 24px rgba(15,26,59,0.15)",
          }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", background: G.gradNavy, position: "sticky", top: 0, zIndex: 10 }}>
              <span style={{ fontWeight: 800, color: G.white, fontSize: 13 }}>Project Info</span>
              <button onClick={() => setRightDrawerOpen(false)} style={{ background: "rgba(255,255,255,0.15)", border: "none", borderRadius: 6, padding: 4, cursor: "pointer", color: G.white, display: "flex" }}>
                <CloseIcon />
              </button>
            </div>
            <RightSidebar participants={participants} project={project} currentUser={currentUser} />
          </div>
        </div>
      )}

      {/* Mobile bottom nav */}
      <div className="mob-only" style={{
        display: "flex", borderTop: `1px solid ${G.greenBorder}`,
        background: G.white, flexShrink: 0,
        boxShadow: "0 -2px 10px rgba(110,192,48,0.08)",
      }}>
        {[
          { id:"chat",     icon:"💬", label:"Stream"   },
          { id:"timeline", icon:"📅", label:"Timeline" },
          { id:"files",    icon:"📁", label:"Files"    },
          { id:"meetings", icon:"🗓", label:"Meetings" },
          { id:"support",  icon:"🎧", label:"Support"  },
        ].map(item => (
          <button key={item.id} onClick={() => setActiveView(item.id)} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "7px 4px", gap: 2, border: "none",
            background: activeView === item.id ? G.greenBg : "none",
            color: activeView === item.id ? G.greenDeep : G.muted,
            cursor: "pointer", fontFamily: FONT,
            borderTop: `2px solid ${activeView === item.id ? G.green : "transparent"}`,
            transition: "background 0.1s",
          }}>
            <span style={{ fontSize: 17 }}>{item.icon}</span>
            <span style={{ fontSize: 10, fontWeight: activeView === item.id ? 800 : 500 }}>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}