import { useState } from "react";
import ChatWindow from "./ChatWindow";
import RightSidebar from "./RightSidebar";
import LeftNav from "./LeftNav";
import TimelineView from "./TimelineView";
import FilesView from "./FilesView";
import MeetingsView from "./MeetingsView";
import SupportView from "./SupportView";

export default function Channel2Layout({
  messages, currentUser, participants, project,
  onSendMessage, isSidebarOpen, setIsSidebarOpen,
}) {
  const [activeView, setActiveView] = useState("chat");

  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-50">

      {/* Top Navbar */}
      <div className="h-14 bg-white border-b border-gray-200 flex items-center px-5 gap-3 shrink-0">
        <span className="text-xl font-bold text-green-700 tracking-tight mr-1">weblance</span>
        <div className="h-5 w-px bg-gray-200" />
        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold bg-gray-100 text-gray-500 px-2 py-1 rounded-md uppercase tracking-wide">Internal</span>
          <span className="text-sm font-semibold text-gray-800 truncate max-w-xs">{project.name}</span>
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium border ${
            project.status === "on_track" ? "bg-green-50 text-green-700 border-green-200" : "bg-red-50 text-red-700 border-red-200"
          }`}>
            {project.status === "on_track" ? "On Track" : "At Risk"}
          </span>
        </div>
        <div className="flex items-center gap-1 text-xs text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          Agency + Team + Admin only
        </div>
        <div className="flex-1" />
        <div className="flex items-center -space-x-2 mr-2">
          {participants.slice(0, 4).map((p) => (
            <div key={p.id} title={p.name}
              className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold border-2 border-white ${
                p.role === "platform_admin" ? "bg-red-100 text-red-700" :
                p.role === "agency_admin" ? "bg-blue-100 text-blue-700" : "bg-yellow-100 text-yellow-700"
              }`}>
              {p.avatar}
            </div>
          ))}
          {participants.length > 4 && (
            <div className="w-7 h-7 rounded-full bg-gray-100 border-2 border-white flex items-center justify-center text-xs text-gray-500 font-medium">
              +{participants.length - 4}
            </div>
          )}
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-400 hover:text-gray-600 transition-colors">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
        </button>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        <LeftNav activeView={activeView} setActiveView={setActiveView} project={project} messages={messages} />
        <div className="flex-1 flex flex-col overflow-hidden">
          {activeView === "chat" && <ChatWindow messages={messages} currentUser={currentUser} participants={participants} project={project} onSendMessage={onSendMessage} />}
          {activeView === "timeline" && <TimelineView project={project} />}
          {activeView === "files" && <FilesView project={project} />}
          {activeView === "meetings" && <MeetingsView participants={participants} />}
          {activeView === "support" && <SupportView />}
        </div>
        {isSidebarOpen && (
          <div className="w-72 shrink-0 border-l border-gray-200 bg-white overflow-y-auto">
            <RightSidebar participants={participants} project={project} currentUser={currentUser} />
          </div>
        )}
      </div>
    </div>
  );
}