// ── ProjectStreamDemo.jsx ──────────────────────────────
import { useState } from "react";
import { participants, quickActions } from "./ProjectData";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./Meetingsview";
import SupportView from "./SupportView";
import ProjectStreamChat from "./ProjectStreamChat";

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
  red:         "#ef4444",
  redBg:       "#fef2f2",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
};

const FONT = "'Poppins', sans-serif";

const IconHash     = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="4" y1="9" x2="20" y2="9"/><line x1="4" y1="15" x2="20" y2="15"/><line x1="10" y1="3" x2="8" y2="21"/><line x1="16" y1="3" x2="14" y2="21"/></svg>);
const IconTimeline = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>);
const IconFile     = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const IconMeetings = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>);
const IconSupport  = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>);
const IconBack     = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"/></svg>);
const IconInfo     = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>);
const IconClose    = () => (<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>);
const IconMenu     = () => (<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>);

const QAIcons = {
  "Submit Milestone": <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  "Request Meeting":  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  "Get Support":      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>,
};

const ROLE_BADGE = {
  CLIENT:     { bg: G.greenBg,  text: G.greenDeep },
  FREELANCER: { bg: G.blueBg,   text: G.blue      },
  ADMIN:      { bg: G.amberBg,  text: "#92400e"   },
};

function SectionLabel({ children }) {
  return (
    <p style={{
      fontSize: 10, fontWeight: 800, letterSpacing: "0.1em",
      textTransform: "uppercase", color: G.muted,
      padding: "6px 16px 2px", fontFamily: FONT,
    }}>{children}</p>
  );
}

function SidebarItem({ icon, label, active, badge, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: "100%", display: "flex", alignItems: "center", gap: 10,
      padding: "8px 16px", border: "none", cursor: "pointer",
      background: active ? G.greenBg : "transparent",
      color: active ? G.greenDeep : G.sub,
      fontWeight: active ? 700 : 500, fontSize: 13, fontFamily: FONT,
      position: "relative", transition: "background 0.1s", textAlign: "left",
    }}>
      {active && <span style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 3, background: G.green, borderRadius: "0 3px 3px 0" }} />}
      <span style={{ color: active ? G.green : G.muted, display: "flex" }}>{icon}</span>
      <span style={{ flex: 1 }}>{label}</span>
      {badge && (
        <span style={{ fontSize: 10, fontWeight: 800, background: G.green, color: G.white, padding: "2px 7px", borderRadius: 99, fontFamily: FONT }}>
          {badge}
        </span>
      )}
    </button>
  );
}

function BottomNav({ activeView, setActiveView }) {
  const tabs = [
    { label: "Stream",   view: "Project Stream", icon: <IconHash />     },
    { label: "Timeline", view: "Timeline",        icon: <IconTimeline /> },
    { label: "Files",    view: "Files",           icon: <IconFile />     },
    { label: "Meetings", view: "Meetings",        icon: <IconMeetings /> },
    { label: "Support",  view: "Support",         icon: <IconSupport />  },
  ];
  return (
    <nav style={{
      display: "flex", position: "fixed", bottom: 0, left: 0, right: 0,
      background: G.white, borderTop: `1px solid ${G.greenBorder}`,
      zIndex: 40, fontFamily: FONT,
    }}>
      {tabs.map(({ label, view, icon }) => {
        const active = activeView === view;
        return (
          <button key={view} onClick={() => setActiveView(view)} style={{
            flex: 1, display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center",
            padding: "8px 4px", gap: 3, border: "none",
            background: "none", cursor: "pointer", position: "relative",
            color: active ? G.greenDeep : G.muted, fontFamily: FONT,
          }}>
            {active && <span style={{ position: "absolute", top: 0, left: "50%", transform: "translateX(-50%)", width: 28, height: 3, background: G.green, borderRadius: "0 0 4px 4px" }} />}
            <span style={{ color: active ? G.green : G.muted, display: "flex" }}>{icon}</span>
            <span style={{ fontSize: 10, fontWeight: active ? 800 : 500 }}>{label}</span>
          </button>
        );
      })}
    </nav>
  );
}

function RightSidebarContent() {
  const Label = ({ icon, text }) => (
    <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.muted, display: "flex", alignItems: "center", gap: 6, marginBottom: 10, fontFamily: FONT }}>
      <span style={{ color: G.greenDeep }}>{icon}</span> {text}
    </p>
  );

  const section = (children) => ({
    padding: "14px 16px", borderBottom: `1px solid ${G.greenBorder}`,
  });

  return (
    <>
      {/* Project Info */}
      <div style={section()}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="3" y1="9" x2="21" y2="9"/><line x1="9" y1="21" x2="9" y2="9"/></svg>} text="Project Info " />
        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>Food Delivery App</p>
        <p style={{ fontSize: 11, color: G.muted, marginTop: 3 }}>Started: Feb 18, 2026</p>
      </div>

      {/* Escrow */}
      <div style={section()}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 0 0-4 0v2"/></svg>} text="Escrow" />
        {[
          { label:"Total:",     value:"$42,000",    color: G.text      },
          { label:"Released:",  value:"$8,400 ✓",   color: G.greenDeep },
          { label:"Remaining:", value:"$33,600",    color: G.text      },
        ].map(({ label, value, color }) => (
          <div key={label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, padding: "3px 0" }}>
            <span style={{ color: G.muted }}>{label}</span>
            <span style={{ fontWeight: 700, color }}>{value}</span>
          </div>
        ))}
      </div>

      {/* Milestone */}
      <div style={section()}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>} text="Milestone" />
        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>Current: 2 of 4</p>
        <p style={{ fontSize: 11, color: G.muted, margin: "0 0 8px", lineHeight: 1.6 }}>Core Development<br/>Due: May 20 (77 days left)</p>
        <div style={{ height: 6, background: G.border, borderRadius: 99, overflow: "hidden" }}>
          <div style={{ width: "40%", height: "100%", background: G.green, borderRadius: 99 }} />
        </div>
        <p style={{ fontSize: 11, fontWeight: 800, color: G.greenDeep, textAlign: "right", marginTop: 4 }}>40%</p>
      </div>

      {/* Participants */}
      <div style={section()}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/></svg>} text="Participants" />
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {participants.map((p) => {
            const badge = ROLE_BADGE[p.role] || { bg: G.bg, text: G.muted };
            return (
              <div key={p.name} style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: p.online ? G.green : G.muted, flexShrink: 0 }} />
                <span style={{ fontSize: 12, color: G.text, fontWeight: 500, flex: 1 }}>{p.name}</span>
                <span style={{ fontSize: 10, fontWeight: 800, background: badge.bg, color: badge.text, padding: "2px 8px", borderRadius: 6, fontFamily: FONT }}>{p.role}</span>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 10, fontSize: 11, color: G.red }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: G.red, flexShrink: 0 }} />
          Admin is monitoring this project
        </div>
      </div>

      {/* Quick Actions */}
      <div style={section()}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>} text="Quick Actions" />
        <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
          {quickActions.map((qa) => (
            <button key={qa.label} style={{
              width: "100%", display: "flex", alignItems: "center", gap: 8,
              fontSize: 12, color: G.sub, fontWeight: 600, fontFamily: FONT,
              padding: "6px 0", background: "none", border: "none", cursor: "pointer", textAlign: "left",
              transition: "color 0.1s",
            }}
              onMouseEnter={e => e.currentTarget.style.color = G.greenDeep}
              onMouseLeave={e => e.currentTarget.style.color = G.sub}
            >
              <span style={{ color: G.muted }}>{QAIcons[qa.label]}</span>{qa.label}
            </button>
          ))}
        </div>
      </div>

      {/* Next Deadline */}
      <div style={{ padding: "14px 16px" }}>
        <Label icon={<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>} text="Next Deadline" />
        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>May 20 — Milestone 2</p>
        <p style={{ fontSize: 11, color: G.muted, marginTop: 3 }}>77 days remaining</p>
      </div>
    </>
  );
}

const navViews = [
  { label: "Timeline", icon: <IconTimeline /> },
  { label: "Files",    icon: <IconFile />     },
  { label: "Meetings", icon: <IconMeetings /> },
  { label: "Support",  icon: <IconSupport />  },
];

export default function ProjectStreamDemo() {
  const [activeView,      setActiveView]      = useState("Project Stream");
  const [showRightDrawer, setShowRightDrawer] = useState(false);
  const [showLeftDrawer,  setShowLeftDrawer]  = useState(false);

  return (
    <div style={{ height: "100dvh", display: "flex", flexDirection: "column", background: G.bg, fontSize: 13, overflow: "hidden", fontFamily: FONT }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        @media (min-width: 768px) { .mobile-only { display: none !important; } }
        @media (max-width: 767px) { .desktop-only { display: none !important; } }
        @media (max-width: 1024px) { .hide-sm { display: none !important; } }
        @media (min-width: 1024px) { .hide-lg { display: none !important; } }
      `}</style>

      {/* ── Top Nav ── */}
      <nav style={{
        background: G.white, borderBottom: `1px solid ${G.greenBorder}`,
        display: "flex", alignItems: "center", padding: "10px 16px",
        gap: 10, flexShrink: 0, zIndex: 30,
        boxShadow: "0 2px 8px rgba(110,192,48,0.07)",
      }}>
        <button className="mobile-only" onClick={() => setShowLeftDrawer(true)} style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, padding: 4, display: "flex" }}>
          <IconMenu />
        </button>
        <button className="desktop-only" style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, color: G.muted, background: "none", border: "none", cursor: "pointer", fontWeight: 600, fontFamily: FONT }}
          onMouseEnter={e => e.currentTarget.style.color = G.greenDeep}
          onMouseLeave={e => e.currentTarget.style.color = G.muted}
        >
          <IconBack /> Back
        </button>
        <span style={{ fontWeight: 800, color: G.text, fontSize: 15 }}>Food Delivery App</span>
        <div style={{ flex: 1 }} />
        <span className="desktop-only" style={{ fontSize: 11, color: G.muted }}>
          Viewing as: <strong style={{ color: G.text }}>Client</strong>
        </span>
        <button className="hide-lg" onClick={() => setShowRightDrawer(true)} style={{
          background: "none", border: `1px solid ${G.greenBorder}`, borderRadius: 8,
          padding: "5px 8px", cursor: "pointer", color: G.muted, display: "flex",
        }}>
          <IconInfo />
        </button>
        <button className="desktop-only" style={{
          display: "flex", alignItems: "center", gap: 6,
          border: `1px solid ${G.greenBorder}`, borderRadius: 100,
          padding: "6px 14px", fontSize: 12, fontWeight: 700, fontFamily: FONT,
          background: G.white, color: G.greenDeep, cursor: "pointer",
        }}>
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ opacity: 0.6 }}><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>
          Demo
        </button>
      </nav>

      {/* ── Body ── */}
      <div style={{ display: "flex", flex: 1, overflow: "hidden" }}>

        {/* Desktop Left Sidebar */}
        <aside className="desktop-only" style={{
          width: 210, background: G.white,
          borderRight: `1px solid ${G.greenBorder}`,
          display: "flex", flexDirection: "column",
          paddingTop: 12, flexShrink: 0,
        }}>
          <SectionLabel>Channels</SectionLabel>
          <SidebarItem icon={<IconHash />} label="Project Stream" active={activeView === "Project Stream"} badge={2} onClick={() => setActiveView("Project Stream")} />
          <div style={{ height: 1, background: G.greenBorder, margin: "8px 12px" }} />
          <SectionLabel>Views</SectionLabel>
          {navViews.map(({ label, icon }) => (
            <SidebarItem key={label} icon={icon} label={label} active={activeView === label} onClick={() => setActiveView(label)} />
          ))}
        </aside>

        {/* Main content */}
        <div style={{ display: "flex", flex: 1, overflow: "hidden", paddingBottom: "56px" }} className="mobile-padding">
          {activeView === "Timeline"       ? <TimelineView />      :
           activeView === "Files"          ? <FilesView />         :
           activeView === "Meetings"       ? <MeetingsView />      :
           activeView === "Support"        ? <SupportView />       :
           activeView === "Project Stream" ? <ProjectStreamChat /> :
           <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", color: G.muted }}>
             <p style={{ fontSize: 13, fontWeight: 500 }}>{activeView} — Coming soon</p>
           </div>}
        </div>

        {/* Desktop Right Sidebar */}
        <aside style={{
          width: 256, background: G.white,
          borderLeft: `1px solid ${G.greenBorder}`,
          overflowY: "auto", flexShrink: 0,
          display: "flex", flexDirection: "column",
        }} className="hide-sm">
          <RightSidebarContent />
        </aside>
      </div>

      {/* Mobile Bottom Nav */}
      <div className="mobile-only">
        <BottomNav activeView={activeView} setActiveView={setActiveView} />
      </div>

      {/* Mobile Left Drawer */}
      {showLeftDrawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex" }} className="mobile-only">
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setShowLeftDrawer(false)} />
          <div style={{ position: "relative", width: 240, background: G.white, height: "100%", display: "flex", flexDirection: "column", boxShadow: "4px 0 24px rgba(15,26,59,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
              <span style={{ fontWeight: 800, color: G.text, fontSize: 14 }}>Food Delivery App</span>
              <button onClick={() => setShowLeftDrawer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, display: "flex" }}><IconClose /></button>
            </div>
            <div style={{ flex: 1, overflowY: "auto", paddingTop: 8 }}>
              <SectionLabel>Channels</SectionLabel>
              <SidebarItem icon={<IconHash />} label="Project Stream" active={activeView === "Project Stream"} badge={2} onClick={() => { setActiveView("Project Stream"); setShowLeftDrawer(false); }} />
              <div style={{ height: 1, background: G.greenBorder, margin: "8px 12px" }} />
              <SectionLabel>Views</SectionLabel>
              {navViews.map(({ label, icon }) => (
                <SidebarItem key={label} icon={icon} label={label} active={activeView === label} onClick={() => { setActiveView(label); setShowLeftDrawer(false); }} />
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Mobile Right Drawer */}
      {showRightDrawer && (
        <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} className="mobile-only">
          <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.4)" }} onClick={() => setShowRightDrawer(false)} />
          <div style={{ position: "relative", width: 288, maxWidth: "100%", background: G.white, height: "100%", display: "flex", flexDirection: "column", overflowY: "auto", boxShadow: "-4px 0 24px rgba(15,26,59,0.15)" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 16px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg, position: "sticky", top: 0, zIndex: 10 }}>
              <span style={{ fontWeight: 800, color: G.text, fontSize: 13 }}>Project Info</span>
              <button onClick={() => setShowRightDrawer(false)} style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, display: "flex" }}><IconClose /></button>
            </div>
            <RightSidebarContent />
          </div>
        </div>
      )}
    </div>
  );
}