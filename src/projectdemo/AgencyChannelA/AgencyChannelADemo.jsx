import { useState } from "react";
import ProjectStreamChat from "./ProjectStreamChat";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./MeetingsView";
import SupportView from "./SupportView";
import { ROLES, PARTICIPANTS, VIEWER_OPTIONS, PROJECT_INFO } from "./ProjectData";

function Badge({ role }) {
  const r = ROLES[role];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${r.badgeClass}`}>
      {r.label}
    </span>
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
  const [activeView, setActiveView]     = useState("chat");
  const [viewingAs, setViewingAs]       = useState("client");
  const [leftOpen, setLeftOpen]         = useState(false);  // mobile left drawer
  const [rightOpen, setRightOpen]       = useState(false);  // mobile right drawer

  const escrow    = PROJECT_INFO.escrow;
  const milestone = PROJECT_INFO.milestone;

  // ── Right sidebar content (shared between drawer + desktop panel) ────────────
  function RightSidebarContent() {
    return (
      <>
        {/* Viewing as */}
        <div className="px-4 py-2 border-b border-gray-100 flex items-center justify-between text-sm">
          <span className="text-gray-500 text-xs">Viewing as:</span>
          <Badge role={viewingAs} />
        </div>

        {/* Project Info */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-gray-400 text-sm">📋</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Project Info</span>
          </div>
          <p className="font-bold text-gray-800 text-sm">{PROJECT_INFO.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">Started: {PROJECT_INFO.startDate}</p>
          <div className="mt-2 flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-1 rounded-lg border border-blue-200">
            📢 Channel A — Official Project Channel
          </div>
        </div>

        {/* Escrow */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-yellow-500">💰</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Escrow</span>
          </div>
          <div className="space-y-1.5 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-500">Total:</span>
              <span className="font-semibold">${escrow.total.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Released:</span>
              <span className="font-semibold text-green-600">${escrow.released.toLocaleString()} ✓</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Remaining:</span>
              <span className="font-semibold">${(escrow.total - escrow.released).toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Milestone */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-blue-500">📊</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Milestone</span>
          </div>
          <p className="font-semibold text-sm">Current: {milestone.current} of {milestone.total}</p>
          <p className="text-sm text-gray-700 mt-0.5">{milestone.name}</p>
          <p className="text-xs text-gray-400 mt-0.5">
            Due: {milestone.due} ({milestone.daysLeft} days left)
          </p>
          <div className="mt-2 bg-gray-100 rounded-full h-2">
            <div className="bg-green-500 h-2 rounded-full" style={{ width: `${milestone.progress}%` }} />
          </div>
          <p className="text-xs text-gray-400 mt-1 text-right">{milestone.progress}%</p>
        </div>

        {/* Participants */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-purple-500">👥</span>
            <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Participants</span>
          </div>
          <div className="space-y-2">
            {PARTICIPANTS.map((p) => (
              <div key={p.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${p.online ? ROLES[p.role].dotColor : "bg-gray-300"}`} />
                  <span className="text-sm text-gray-700">{p.name}</span>
                </div>
                <Badge role={p.role} />
              </div>
            ))}
          </div>
          <div className="mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
            <p className="text-xs text-yellow-700">
              <strong>Agency team</strong> can participate, but only <strong>Agency Admin</strong> makes binding commitments.
            </p>
          </div>
        </div>

        {/* Admin monitoring */}
        <div className="p-4">
          <div className="flex items-center gap-2 text-red-600">
            <span className="w-2 h-2 rounded-full bg-red-500 shrink-0" />
            <span className="text-sm font-medium">⚠ Admin is monitoring this project</span>
          </div>
        </div>

        {/* View As — inside right drawer on mobile */}
        <div className="p-4 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-1">View as:</p>
          <select
            value={viewingAs}
            onChange={(e) => setViewingAs(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded px-2 py-1.5 bg-white"
          >
            {VIEWER_OPTIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
      </>
    );
  }

  // ── Left sidebar content ──────────────────────────────────────────────────────
  function LeftSidebarContent() {
    return (
      <>
        <div className="p-4 border-b border-gray-100">
          <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-gray-800">← Back</button>
          <h2 className="font-bold text-sm mt-1 text-gray-800 leading-tight">{PROJECT_INFO.name}</h2>
          <div className="mt-1.5 inline-flex items-center gap-1 bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200">
            📢 Channel A
          </div>
        </div>

        <div className="p-3">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Channels</p>
          <button
            onClick={() => { setActiveView("chat"); setLeftOpen(false); }}
            className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg font-medium ${
              activeView === "chat" ? "bg-green-50 text-green-700" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            <span className="text-green-500">#</span> Project Stream
            <span className="ml-auto bg-green-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">2</span>
          </button>
        </div>

        <div className="p-3 border-t border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Views</p>
          {NAV_ITEMS.filter(i => i.id !== "chat").map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveView(item.id); setLeftOpen(false); }}
              className={`w-full flex items-center gap-2 text-sm px-2 py-1.5 rounded-lg ${
                activeView === item.id ? "bg-green-50 text-green-700 font-medium" : "text-gray-500 hover:bg-gray-50"
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </div>

        {/* View As — desktop only in left sidebar */}
        <div className="mt-auto p-3 border-t border-gray-100">
          <p className="text-xs text-gray-400 mb-1">View as:</p>
          <select
            value={viewingAs}
            onChange={(e) => setViewingAs(e.target.value)}
            className="w-full text-xs border border-gray-200 rounded px-1 py-1 bg-white"
          >
            {VIEWER_OPTIONS.map((v) => (
              <option key={v.value} value={v.value}>{v.label}</option>
            ))}
          </select>
        </div>
      </>
    );
  }

  return (
    <div className="flex h-screen bg-gray-50 font-sans text-gray-800 overflow-hidden">

      {/* ════════════════════════════════════════════════════════════
          DESKTOP LEFT SIDEBAR  (hidden on mobile)
      ════════════════════════════════════════════════════════════ */}
      <aside className="hidden md:flex w-48 bg-white border-r border-gray-200 flex-col shrink-0">
        <LeftSidebarContent />
      </aside>

      {/* ════════════════════════════════════════════════════════════
          MOBILE LEFT DRAWER
      ════════════════════════════════════════════════════════════ */}
      {leftOpen && (
        <div className="fixed inset-0 z-40 flex md:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setLeftOpen(false)} />
          <aside className="relative z-50 w-64 bg-white h-full flex flex-col shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <span className="font-semibold text-sm text-gray-700">Navigation</span>
              <button onClick={() => setLeftOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <LeftSidebarContent />
          </aside>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          MAIN CONTENT
      ════════════════════════════════════════════════════════════ */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">

        {/* ── Mobile top bar ── */}
        <div className="flex md:hidden items-center justify-between px-3 py-2 bg-white border-b border-gray-200 shrink-0">
          <button
            onClick={() => setLeftOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-800">{PROJECT_INFO.name}</span>
            <span className="bg-blue-50 text-blue-700 text-xs font-semibold px-2 py-0.5 rounded-full border border-blue-200">Ch A</span>
          </div>
          <button
            onClick={() => setRightOpen(true)}
            className="p-2 text-gray-500 hover:text-gray-800 hover:bg-gray-100 rounded-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </button>
        </div>

        {/* ── Active view ── */}
        <div className="flex-1 overflow-hidden flex flex-col min-h-0">
          {activeView === "chat"     && <ProjectStreamChat viewingAs={viewingAs} />}
          {activeView === "timeline" && <TimelineView />}
          {activeView === "files"    && <FilesView />}
          {activeView === "meetings" && <MeetingsView />}
          {activeView === "support"  && <SupportView />}
        </div>

        {/* ── Mobile bottom nav ── */}
        <nav className="flex md:hidden items-center justify-around border-t border-gray-200 bg-white shrink-0 py-1">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id)}
              className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-xl transition-colors ${
                activeView === item.id ? "text-green-600" : "text-gray-400 hover:text-gray-600"
              }`}
            >
              <span className="text-xl leading-none">{item.icon}</span>
              <span className="text-xs font-medium">{item.label}</span>
              {item.id === "chat" && (
                <span className="absolute -mt-3 ml-4 bg-green-500 text-white text-xs rounded-full w-3.5 h-3.5 flex items-center justify-center" style={{fontSize:"9px"}}>2</span>
              )}
            </button>
          ))}
        </nav>
      </main>

      {/* ════════════════════════════════════════════════════════════
          DESKTOP RIGHT SIDEBAR  (hidden on mobile)
      ════════════════════════════════════════════════════════════ */}
      <aside className="hidden lg:flex w-72 bg-white border-l border-gray-200 flex-col shrink-0 overflow-y-auto">
        <div className="p-3 border-b border-gray-100 flex justify-end">
          <button className="flex items-center gap-1 text-xs text-gray-400 border border-gray-200 rounded-full px-3 py-1">
            👁 Demo
          </button>
        </div>
        <RightSidebarContent />
      </aside>

      {/* ════════════════════════════════════════════════════════════
          MOBILE RIGHT DRAWER
      ════════════════════════════════════════════════════════════ */}
      {rightOpen && (
        <div className="fixed inset-0 z-40 flex justify-end lg:hidden">
          <div className="absolute inset-0 bg-black/40" onClick={() => setRightOpen(false)} />
          <aside className="relative z-50 w-72 max-w-full bg-white h-full flex flex-col shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-3 border-b border-gray-100">
              <span className="font-semibold text-sm text-gray-700">Project Info</span>
              <button onClick={() => setRightOpen(false)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <RightSidebarContent />
          </aside>
        </div>
      )}
    </div>
  );
}