import { useState } from "react";
import ChatWindow from "./ChatWindow";
import RightSidebar from "./RightSidebar";
import LeftNav from "./LeftNav";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./MeetingsView";
import SupportView from "./SupportView";

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
  const [activeView, setActiveView] = useState("chat");

  const isTrack = project.status === "on_track";

  return (
    <div style={{ height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", background: G.bg, fontFamily: FONT }}>
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>

      {/* Top Navbar */}
      <div style={{ 
        height: 56, background: G.white, borderBottom: `1px solid ${G.greenBorder}`, 
        display: "flex", alignItems: "center", padding: "0 20px", gap: 12, 
        flexShrink: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.06)" 
      }}>
        
        {/* Logo */}
        <span style={{ fontSize: 20, fontWeight: 800, color: G.greenDeep, letterSpacing: "-0.02em", marginRight: 4 }}>
          weblance
        </span>
        
        {/* Divider */}
        <div style={{ height: 20, width: 1, background: G.greenBorder }} />
        
        {/* Project Details */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, fontWeight: 700, background: G.bg, color: G.sub, padding: "4px 8px", borderRadius: 6, textTransform: "uppercase", letterSpacing: "0.05em", border: `1px solid ${G.border}` }}>
            Internal
          </span>
          <span style={{ fontSize: 14, fontWeight: 700, color: G.text, maxWidth: 320, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            {project.name}
          </span>
          <span style={{ 
            fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99,
            background: isTrack ? G.greenBg : G.redBg, 
            color: isTrack ? G.greenDeep : "#dc2626", 
            border: `1px solid ${isTrack ? G.greenBorder : G.redBorder}` 
          }}>
            {isTrack ? "On Track" : "At Risk"}
          </span>
        </div>

        {/* Visibility Warning */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, color: "#92400e", background: G.amberBg, border: `1px solid ${G.amberBorder}`, padding: "3px 10px", borderRadius: 99 }}>
          <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Agency + Team + Admin only
        </div>

        <div style={{ flex: 1 }} />

        {/* Avatars */}
        <div style={{ display: "flex", alignItems: "center", marginRight: 8 }}>
          {participants.slice(0, 4).map((p, i) => {
            const roleBg = p.role === "platform_admin" ? G.redBg : p.role === "agency_admin" ? G.blueBg : G.amberBg;
            const roleColor = p.role === "platform_admin" ? "#dc2626" : p.role === "agency_admin" ? G.blue : "#92400e";
            
            return (
              <div key={p.id} title={p.name} style={{
                width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 11, fontWeight: 700, border: `2px solid ${G.white}`, background: roleBg, color: roleColor,
                marginLeft: i > 0 ? -8 : 0, zIndex: 10 - i
              }}>
                {p.avatar}
              </div>
            );
          })}
          {participants.length > 4 && (
            <div style={{
              width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 11, fontWeight: 700, border: `2px solid ${G.white}`, background: G.bg, color: G.muted,
              marginLeft: -8, zIndex: 0
            }}>
              +{participants.length - 4}
            </div>
          )}
        </div>

        {/* Sidebar Toggle Button */}
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          style={{ 
            background: "none", border: "none", cursor: "pointer", padding: "6px", 
            borderRadius: 8, color: G.sub, display: "flex", alignItems: "center", justifyContent: "center",
            transition: "background 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = G.border}
          onMouseLeave={(e) => e.currentTarget.style.background = "none"}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      </div>

      {/* Body Area */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>
        
        {/* Left Nav */}
        <LeftNav activeView={activeView} setActiveView={setActiveView} project={project} messages={messages} />
        
        {/* Main Workspace */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", background: G.bg }}>
          {activeView === "chat" && <ChatWindow messages={messages} currentUser={currentUser} participants={participants} project={project} onSendMessage={onSendMessage} />}
          {activeView === "timeline" && <TimelineView project={project} />}
          {activeView === "files" && <FilesView project={project} />}
          {activeView === "meetings" && <MeetingsView participants={participants} />}
          {activeView === "support" && <SupportView />}
        </div>

        {/* Right Sidebar */}
        {isSidebarOpen && (
          <div style={{ 
            width: 288, flexShrink: 0, borderLeft: `1px solid ${G.greenBorder}`, 
            background: G.white, overflowY: "auto", boxShadow: "-4px 0 15px rgba(110,192,48,0.03)" 
          }}>
            <RightSidebar participants={participants} project={project} currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
}