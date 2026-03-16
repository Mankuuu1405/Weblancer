// src/Team/TeamMemberDashboard.jsx
import { useState } from "react";


/* ── DATA ── */
const TASKS = [
  { id: 1, text: "Implement checkout API integration", priority: "high", done: false, due: "Today"    },
  { id: 2, text: "Fix cart UI bug on mobile",          priority: "high", done: false, due: "Today"    },
  { id: 3, text: "Write unit tests for auth module",   priority: "med",  done: false, due: "Tomorrow" },
  { id: 4, text: "Code review: Sara's PR #47",         priority: "med",  done: true,  due: "Done"     },
  { id: 5, text: "Update README for payment service",  priority: "low",  done: true,  due: "Done"     },
];

const PROJECTS = [
  { name: "Food Delivery App",   client: "ByteEats Co.", budget: "$42K", progress: 65, role: "Backend Dev", status: "ON TRACK", riskColor: "bg-yellow-50 border-yellow-300 text-yellow-700" },
  { name: "E-commerce Platform", client: "GlobalShop",   budget: "$28K", progress: 30, role: "Full Stack",  status: "ON TRACK", riskColor: "bg-green-50 border-green-300 text-green-700"   },
];

const TEAM = [
  { name: "Raj Kumar", role: "ADMIN",     roleColor: "bg-red-100 text-red-500",       initial: "R", bg: "bg-red-100"    },
  { name: "Sara M.",   role: "DEVELOPER", roleColor: "bg-blue-100 text-blue-600",     initial: "S", bg: "bg-blue-100"   },
  { name: "Dev Mike",  role: "DEVELOPER", roleColor: "bg-blue-100 text-blue-600",     initial: "D", bg: "bg-blue-100",  me: true },
  { name: "Priya S.",  role: "DESIGNER",  roleColor: "bg-purple-100 text-purple-600", initial: "P", bg: "bg-purple-100" },
  { name: "James L.",  role: "DEVOPS",    roleColor: "bg-gray-100 text-gray-600",     initial: "J", bg: "bg-gray-100"   },
];

const ACTIVITIES = [
  { text: "You uploaded deliverable: checkout-api-v2.zip", time: "2 hours ago", dot: "bg-green-500"  },
  { text: "PM assigned you: Fix cart UI bug",              time: "4 hours ago", dot: "bg-blue-400"   },
  { text: "Sara M. commented on your PR #47",              time: "Yesterday",   dot: "bg-yellow-400" },
  { text: "Milestone approved: Authentication Module",     time: "2 days ago",  dot: "bg-green-400"  },
  { text: "You joined Food Delivery App project",          time: "1 week ago",  dot: "bg-gray-300"   },
];

const SKILLS = [
  { label: "React",      pct: 90 },
  { label: "Node.js",    pct: 82 },
  { label: "PostgreSQL", pct: 70 },
  { label: "Docker",     pct: 60 },
];

const PERMISSIONS = [
  { label: "Chat with Client",   allowed: true  },
  { label: "Upload Files",       allowed: true  },
  { label: "Approve Milestones", allowed: false },
  { label: "View Finance",       allowed: false },
  { label: "View Tasks",         allowed: true  },
  { label: "Change Scope",       allowed: false },
];

const TABS = ["Overview", "Tasks", "Projects", "Messages", "Time Logs"];

const STATS = [
  { icon: "📋", value: "2/5",  label: "Tasks Done",      bg: "bg-green-50",  iconColor: "text-green-500"  },
  { icon: "🗂️", value: "2",    label: "Active Projects", bg: "bg-blue-50",   iconColor: "text-blue-500"   },
  { icon: "⏱️", value: "28h",  label: "Hours This Week", bg: "bg-yellow-50", iconColor: "text-yellow-500" },
  { icon: "⭐", value: "4.9",  label: "Perf. Score",     bg: "bg-purple-50", iconColor: "text-purple-500" },
];

/* ── MAIN COMPONENT ── */
export default function TeamMemberDashboard() {
  const [activeTab,     setActiveTab]     = useState("Overview");
  const [taskList,      setTaskList]      = useState(TASKS);
  const [mobileTabOpen, setMobileTabOpen] = useState(false);

  const toggleTask = (id) =>
    setTaskList((p) => p.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  const pending = taskList.filter((t) => !t.done).length;

  return (
    <div className="min-h-screen bg-gray-50 font-sans">

      {/* ── NAVBAR — identical structure to AgencyDashboard ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-8 py-4 flex items-center justify-between" style={{ minHeight: 72 }}>
        <img src="/weblance-logo.png.jpeg" alt="WebLance" style={{ height: 64, width: "auto", objectFit: "contain" }} />
        <div className="flex items-center gap-2 sm:gap-4">
          <span className="hidden sm:inline border border-gray-300 text-gray-600 text-xs font-semibold px-3 py-1 rounded-full">
            MEMBER
          </span>
          <span className="hidden sm:flex items-center gap-1 text-sm text-gray-600 cursor-pointer hover:text-blue-500">
            👤 Public Profile
          </span>
          <div style={{ position: "relative" }}>
            <div className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-base cursor-pointer">
              🔔
            </div>
            <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white" style={{ top: 2, right: 2 }} />
          </div>
          <div
            className="w-8 h-8 rounded-full text-white flex items-center justify-center font-bold text-sm"
            style={{ background: "#3db54a" }}
          >
            D
          </div>
        </div>
      </header>

      {/* ── MAIN CONTENT — max-w-6xl like AgencyDashboard ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-8 py-6 sm:py-8">

        {/* Welcome */}
        <div className="mb-5 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Welcome back, Dev Mike</h1>
          <p className="text-gray-500 text-sm mt-1">Here's your member overview</p>
        </div>

        {/* ── STATS — same grid as AgencyDashboard ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-5 sm:mb-6">
          {STATS.map((s, i) => (
            <div key={i} className="bg-white rounded-xl border border-gray-100 p-4 sm:p-5 flex items-center gap-3 sm:gap-4 shadow-sm">
              <div className={`w-9 h-9 sm:w-11 sm:h-11 rounded-lg ${s.bg} flex items-center justify-center text-base sm:text-lg`}>
                <span className={s.iconColor}>{s.icon}</span>
              </div>
              <div>
                <div className="text-xl sm:text-2xl font-bold text-gray-900">{s.value}</div>
                <div className="text-xs text-gray-500 leading-tight">{s.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* ── TAB PANEL — same white card as AgencyDashboard ── */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm mb-6">

          {/* Mobile tab dropdown */}
          <div className="sm:hidden px-4 py-3 border-b border-gray-100 relative">
            <button
              onClick={() => setMobileTabOpen(!mobileTabOpen)}
              className="w-full flex items-center justify-between border border-gray-200 rounded-lg px-4 py-2.5 text-sm font-semibold text-gray-800 bg-white"
            >
              {activeTab}
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 5l5 5 5-5" stroke="#6b7280" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            {mobileTabOpen && (
              <div className="absolute left-4 right-4 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 py-1">
                {TABS.map(tab => (
                  <button
                    key={tab}
                    onClick={() => { setActiveTab(tab); setMobileTabOpen(false); }}
                    className={`w-full text-left px-4 py-3 text-sm transition-colors ${activeTab === tab ? "bg-blue-50 text-blue-600 font-semibold" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {tab}{tab === "Messages" && <span className="ml-1 bg-red-500 text-white text-xs rounded-full px-1.5 py-0.5">3</span>}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop tabs — identical style to AgencyDashboard */}
          <div className="hidden sm:flex gap-0 border-b border-gray-100 px-4 overflow-x-auto">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-medium relative flex items-center gap-1.5 transition-colors whitespace-nowrap ${activeTab === tab ? "text-gray-900 border-b-2 border-gray-900" : "text-gray-500 hover:text-gray-700"}`}
              >
                {tab}
                {tab === "Messages" && (
                  <span className="bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center leading-none">3</span>
                )}
              </button>
            ))}
          </div>

          {/* ── OVERVIEW TAB ── */}
          {activeTab === "Overview" && (
            <div className="p-4 sm:p-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left col (2/3) */}
                <div className="lg:col-span-2 flex flex-col gap-6">

                
                  <div>
                    <h2 className="font-semibold text-gray-900 mb-4">Active Projects</h2>
                    <div className="flex flex-col gap-3">
                      {PROJECTS.map((p, i) => (
                        <div key={i} className="border border-gray-200 rounded-lg px-4 py-4 hover:border-green-300 hover:shadow-sm transition-all cursor-pointer group">
                          <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                            <div>
                              <div className="font-semibold text-gray-900 text-sm group-hover:text-green-700 transition-colors">{p.name}</div>
                              <div className="text-xs text-gray-400 mt-0.5">{p.client} · {p.budget} · <span className="text-blue-500">{p.role}</span></div>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-sm text-gray-600 font-medium">{p.progress}%</span>
                              <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${p.riskColor}`}>{p.status}</span>
                            </div>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, background: "linear-gradient(90deg,#3db54a,#2563eb)" }} />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* My Tasks */}
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h2 className="font-semibold text-gray-900">My Tasks</h2>
                      <span className="bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-2.5 py-1 rounded-full">{pending} pending</span>
                    </div>
                    <div className="border border-gray-200 rounded-xl overflow-hidden">
                      {taskList.map((task, i) => (
                        <div
                          key={task.id}
                          onClick={() => toggleTask(task.id)}
                          className={`flex items-center gap-3 px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors ${i < taskList.length - 1 ? "border-b border-gray-100" : ""}`}
                        >
                          {/* Checkbox */}
                          <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                            {task.done && (
                              <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            )}
                          </div>
                          {/* Priority dot */}
                          <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === "high" ? "bg-red-400" : task.priority === "med" ? "bg-yellow-400" : "bg-green-400"}`} />
                          {/* Text */}
                          <span className={`flex-1 text-sm min-w-0 truncate ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>
                            {task.text}
                          </span>
                          {/* Due */}
                          <span className={`text-xs font-semibold whitespace-nowrap ${task.due === "Today" ? "text-red-500" : "text-gray-400"}`}>
                            {task.due}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>

                {/* Right col (1/3) — same style as agency "Team" + "Growth" panels */}
                <div className="flex flex-col gap-5">

                  {/* Team */}
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-gray-500">👥</span> Team
                    </h2>
                    <div className="flex flex-col gap-3">
                      {TEAM.map((m, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className={`w-7 h-7 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold text-gray-600 relative`}>
                              {m.initial}
                              {m.me && <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white" />}
                            </div>
                            <span className={`text-sm ${m.me ? "font-semibold text-gray-900" : "text-gray-800"}`}>
                              {m.name}{m.me && <span className="text-xs text-gray-400 font-normal ml-1">(you)</span>}
                            </span>
                          </div>
                          <span className={`text-xs font-semibold px-2 py-0.5 rounded ${m.roleColor}`}>{m.role}</span>
                        </div>
                      ))}
                    </div>
                    <button className="mt-4 text-sm text-gray-500 hover:text-gray-700 w-full text-center">
                      Manage Team →
                    </button>
                  </div>

                  {/* My Permissions */}
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span>🔒</span> My Permissions
                    </h2>
                    <div className="grid grid-cols-2 gap-2">
                      {PERMISSIONS.map((p, i) => (
                        <div key={i} className={`flex items-center gap-1.5 text-xs font-medium px-2.5 py-2 rounded-lg border ${p.allowed ? "bg-green-50 border-green-200 text-green-700" : "bg-red-50 border-red-200 text-red-600"}`}>
                          <span>{p.allowed ? "✅" : "🚫"}</span>
                          <span className="truncate">{p.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Growth */}
                  <div className="border border-gray-100 rounded-xl p-5 bg-gray-50">
                    <h2 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
                      <span className="text-green-500">📈</span> Growth
                    </h2>
                    <div className="flex flex-col gap-2.5">
                      {[
                        { label: "Agency",        value: "TechVision Digital" },
                        { label: "My Role",        value: "Developer"          },
                        { label: "Joined",         value: "3 months ago"       },
                        { label: "Projects Done",  value: "4"                  },
                        { label: "Rating",         value: "⭐ 4.9 (12)"       },
                      ].map((row, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-sm text-gray-400">{row.label}</span>
                          <span className="text-sm text-gray-800 font-medium">{row.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* Bottom row — Recent Activity + Skills */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-6">

                {/* Recent Activity */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <h2 className="font-semibold text-gray-900">Recent Activity</h2>
                    <span className="text-sm text-blue-500 cursor-pointer hover:text-blue-600 font-medium">View all</span>
                  </div>
                  <div className="border border-gray-200 rounded-xl overflow-hidden">
                    {ACTIVITIES.map((a, i) => (
                      <div key={i} className={`flex items-start gap-3 px-4 py-3 ${i < ACTIVITIES.length - 1 ? "border-b border-gray-100" : ""}`}>
                        <span className={`w-2.5 h-2.5 rounded-full mt-1 flex-shrink-0 ${a.dot}`} />
                        <div>
                          <div className="text-sm text-gray-700 leading-snug">{a.text}</div>
                          <div className="text-xs text-gray-400 mt-0.5">{a.time}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* My Skills */}
                <div>
                  <h2 className="font-semibold text-gray-900 mb-3">My Skills</h2>
                  <div className="border border-gray-200 rounded-xl p-5">
                    {SKILLS.map((s, i) => (
                      <div key={i} className={`${i < SKILLS.length - 1 ? "mb-4" : ""}`}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-sm text-gray-700">{s.label}</span>
                          <span className="text-sm font-bold text-gray-900">{s.pct}%</span>
                        </div>
                        <div className="w-full bg-gray-100 rounded-full h-1.5">
                          <div className="h-1.5 rounded-full" style={{ width: `${s.pct}%`, background: "linear-gradient(90deg,#3db54a,#2563eb)" }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* ── TASKS TAB ── */}
          {activeTab === "Tasks" && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">My Tasks</h2>
                  <p className="text-xs text-gray-400 mt-0.5">{taskList.filter(t => !t.done).length} pending · {taskList.filter(t => t.done).length} completed</p>
                </div>
                <span className="bg-blue-50 border border-blue-200 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">{taskList.filter(t => !t.done).length} pending</span>
              </div>
              {/* Priority legend */}
              <div className="flex items-center gap-4 mb-4 text-xs text-gray-400">
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-400 inline-block" /> High</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-400 inline-block" /> Medium</span>
                <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-400 inline-block" /> Low</span>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {taskList.map((task, i) => (
                  <div key={task.id} onClick={() => toggleTask(task.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 cursor-pointer hover:bg-gray-50 transition-colors ${i < taskList.length - 1 ? "border-b border-gray-100" : ""}`}>
                    <div className={`w-5 h-5 rounded-md flex items-center justify-center flex-shrink-0 border transition-colors ${task.done ? "bg-green-500 border-green-500" : "border-gray-300"}`}>
                      {task.done && <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5l2.5 2.5 4.5-4.5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                    </div>
                    <span className={`w-2 h-2 rounded-full flex-shrink-0 ${task.priority === "high" ? "bg-red-400" : task.priority === "med" ? "bg-yellow-400" : "bg-green-400"}`} />
                    <span className={`flex-1 text-sm ${task.done ? "line-through text-gray-400" : "text-gray-700"}`}>{task.text}</span>
                    <span className={`text-xs font-semibold whitespace-nowrap px-2.5 py-1 rounded-full ${task.due === "Today" ? "bg-red-50 text-red-500 border border-red-200" : task.due === "Tomorrow" ? "bg-yellow-50 text-yellow-600 border border-yellow-200" : "bg-gray-100 text-gray-400 border border-gray-200"}`}>
                      {task.due}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── PROJECTS TAB ── */}
          {activeTab === "Projects" && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">My Projects</h2>
                  <p className="text-xs text-gray-400 mt-0.5">Projects you're assigned to</p>
                </div>
                <span className="text-xs bg-green-50 border border-green-200 text-green-600 font-semibold px-2.5 py-1 rounded-full">2 Active</span>
              </div>
              <div className="flex flex-col gap-4">
                {PROJECTS.map((p, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden hover:border-green-300 hover:shadow-sm transition-all cursor-pointer group">
                    <div className="p-5">
                      <div className="flex flex-wrap items-start justify-between gap-3 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-gray-900 group-hover:text-green-700 transition-colors">{p.name}</h3>
                          <div className="text-sm text-gray-500 mt-0.5">Client: {p.client}</div>
                        </div>
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="flex items-center gap-1.5 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                            <span className="w-1.5 h-1.5 rounded-full bg-white inline-block" />ACTIVE
                          </span>
                          <span className={`text-xs font-semibold px-3 py-1 rounded-full border ${p.riskColor}`}>{p.status}</span>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                        <span>Budget: {p.budget}</span>
                        <span>{p.progress}% complete</span>
                        <span className="text-blue-500 font-medium">My Role: {p.role}</span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div className="h-1.5 rounded-full" style={{ width: `${p.progress}%`, background: "linear-gradient(90deg,#3db54a,#2563eb)" }} />
                      </div>
                    </div>
                    <div className="border-t border-gray-100 px-5 py-3 flex flex-wrap gap-2 bg-gray-50">
                      <button onClick={e => e.stopPropagation()} className="border border-gray-200 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Open ProjectStream</button>
                      <button onClick={e => e.stopPropagation()} className="border border-gray-200 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Upload Deliverable</button>
                      <button onClick={e => e.stopPropagation()} className="border border-gray-200 bg-white text-gray-700 text-xs px-3 py-1.5 rounded-lg hover:bg-gray-100 transition-colors">Message Client</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── MESSAGES TAB ── */}
          {activeTab === "Messages" && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">Messages</h2>
                  <p className="text-xs text-gray-400 mt-0.5">3 unread messages</p>
                </div>
              </div>
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                {[
                  { from: "Raj Kumar (Admin)", msg: "Hey Mike, can you check the checkout API?", time: "10 min ago",   unread: true,  initial: "R", bg: "bg-red-100"    },
                  { from: "Sara M.",           msg: "PR #47 looks good, just one comment left", time: "1 hour ago",   unread: true,  initial: "S", bg: "bg-blue-100"   },
                  { from: "Priya S.",          msg: "Can you review the new UI mockups?",       time: "3 hours ago",  unread: true,  initial: "P", bg: "bg-purple-100" },
                  { from: "ByteEats Co.",      msg: "When will milestone 2 be ready?",          time: "Yesterday",    unread: false, initial: "B", bg: "bg-green-100"  },
                  { from: "GlobalShop",        msg: "Thanks for the update on the platform",    time: "2 days ago",   unread: false, initial: "G", bg: "bg-yellow-100" },
                ].map((m, i, arr) => (
                  <div key={i} className={`flex items-center gap-3 px-4 py-4 cursor-pointer hover:bg-gray-50 transition-colors ${i < arr.length - 1 ? "border-b border-gray-100" : ""} ${m.unread ? "bg-blue-50/40" : ""}`}>
                    <div className={`w-9 h-9 rounded-full ${m.bg} flex items-center justify-center text-sm font-bold text-gray-600 flex-shrink-0`}>{m.initial}</div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`text-sm ${m.unread ? "font-bold text-gray-900" : "font-medium text-gray-700"}`}>{m.from}</span>
                        <span className="text-xs text-gray-400 whitespace-nowrap">{m.time}</span>
                      </div>
                      <div className={`text-sm truncate mt-0.5 ${m.unread ? "text-gray-700" : "text-gray-400"}`}>{m.msg}</div>
                    </div>
                    {m.unread && <span className="w-2.5 h-2.5 rounded-full bg-blue-500 flex-shrink-0" />}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ── TIME LOGS TAB ── */}
          {activeTab === "Time Logs" && (
            <div className="p-4 sm:p-6">
              <div className="flex items-center justify-between mb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">Time Logs</h2>
                  <p className="text-xs text-gray-400 mt-0.5">This week's activity</p>
                </div>
                <span className="bg-yellow-50 border border-yellow-200 text-yellow-700 text-xs font-semibold px-3 py-1 rounded-full">28h this week</span>
              </div>
              {/* Summary cards */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
                {[
                  { label: "Today",      val: "6h 30m", color: "text-green-600"  },
                  { label: "This Week",  val: "28h",    color: "text-blue-600"   },
                  { label: "This Month", val: "96h",    color: "text-purple-600" },
                ].map((s, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-4 bg-white text-center">
                    <div className={`text-xl font-bold ${s.color}`}>{s.val}</div>
                    <div className="text-xs text-gray-400 mt-1">{s.label}</div>
                  </div>
                ))}
              </div>
              {/* Log entries */}
              <div className="border border-gray-200 rounded-xl overflow-hidden">
                <div className="px-4 py-3 bg-gray-50 border-b border-gray-100 grid grid-cols-4 text-xs font-semibold text-gray-400 uppercase tracking-wide">
                  <span>Date</span><span>Project</span><span>Task</span><span className="text-right">Hours</span>
                </div>
                {[
                  { date: "Today",      project: "Food Delivery App",   task: "Checkout API",    hours: "3h 30m" },
                  { date: "Today",      project: "Food Delivery App",   task: "Cart Bug Fix",    hours: "3h 00m" },
                  { date: "Yesterday",  project: "E-commerce Platform", task: "DB Schema",       hours: "4h 00m" },
                  { date: "Yesterday",  project: "Food Delivery App",   task: "Auth Module",     hours: "4h 00m" },
                  { date: "Mon",        project: "E-commerce Platform", task: "API Integration", hours: "6h 00m" },
                  { date: "Mon",        project: "Food Delivery App",   task: "Code Review",     hours: "2h 00m" },
                  { date: "Sun",        project: "Food Delivery App",   task: "Unit Tests",      hours: "5h 30m" },
                ].map((log, i, arr) => (
                  <div key={i} className={`grid grid-cols-4 items-center px-4 py-3 text-sm ${i < arr.length - 1 ? "border-b border-gray-100" : ""} hover:bg-gray-50 transition-colors`}>
                    <span className="text-gray-400 text-xs">{log.date}</span>
                    <span className="text-gray-700 font-medium truncate pr-2">{log.project}</span>
                    <span className="text-gray-500 truncate pr-2">{log.task}</span>
                    <span className="text-right font-bold text-gray-900">{log.hours}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </main>
    </div>
  );
}