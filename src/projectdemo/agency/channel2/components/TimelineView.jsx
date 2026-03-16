import { useState } from "react";

const timelineEvents = [
  {
    id: "t1",
    date: "2026-03-10",
    time: "09:00 AM",
    type: "system",
    icon: "🔔",
    content: "Internal governance channel created for Food Delivery App project.",
    by: "Platform Admin",
    locked: true,
  },
  {
    id: "t2",
    date: "2026-03-10",
    time: "09:30 AM",
    type: "admin_action",
    icon: "🔐",
    content: "Agency Admin (Raj Kumar) assigned team members to the project.",
    by: "Raj Kumar",
    locked: true,
  },
  {
    id: "t3",
    date: "2026-03-10",
    time: "10:00 AM",
    type: "milestone",
    icon: "🏁",
    content: "Milestone 1 (UI Design) marked as completed and submitted for review.",
    by: "Sara M.",
    locked: false,
  },
  {
    id: "t4",
    date: "2026-03-10",
    time: "10:30 AM",
    type: "approval",
    icon: "✅",
    content: "UI Design milestone deliverables approved by Agency Admin.",
    by: "Raj Kumar",
    locked: true,
  },
  {
    id: "t5",
    date: "2026-03-11",
    time: "09:15 AM",
    type: "milestone",
    icon: "🏁",
    content: "Milestone 2 (Backend API) started. Team assigned: Sara M. and Dev Mike.",
    by: "Raj Kumar",
    locked: false,
  },
  {
    id: "t6",
    date: "2026-03-11",
    time: "11:00 AM",
    type: "decision",
    icon: "⚖️",
    content: "Decision: Sara M. will own payment integration. Dev Mike will complete order management APIs. Deadline set to March 15.",
    by: "Raj Kumar",
    locked: true,
  },
  {
    id: "t7",
    date: "2026-03-11",
    time: "02:00 PM",
    type: "admin_action",
    icon: "🔐",
    content: "Platform Admin flagged Milestone 2 deadline as critical — team notified.",
    by: "Platform Admin",
    locked: true,
  },
  {
    id: "t8",
    date: "2026-03-12",
    time: "10:00 AM",
    type: "update",
    icon: "📋",
    content: "Dev Mike submitted progress update: Database schema complete, order APIs 70% done.",
    by: "Dev Mike",
    locked: false,
  },
  {
    id: "t9",
    date: "2026-03-12",
    time: "11:30 AM",
    type: "update",
    icon: "📋",
    content: "Sara M. submitted progress update: Authentication done, payment integration in progress.",
    by: "Sara M.",
    locked: false,
  },
  {
    id: "t10",
    date: "2026-03-13",
    time: "09:00 AM",
    type: "admin_action",
    icon: "🔐",
    content: "Platform Admin joined channel monitoring. All decisions are being recorded.",
    by: "Platform Admin",
    locked: true,
  },
];

const FILTER_OPTIONS = [
  { value: "all", label: "All Events" },
  { value: "milestone", label: "Milestones" },
  { value: "decision", label: "Decisions" },
  { value: "approval", label: "Approvals" },
  { value: "admin_action", label: "Admin Actions" },
  { value: "update", label: "Team Updates" },
];

const typeColors = {
  system: "bg-gray-100 text-gray-500 border-gray-200",
  admin_action: "bg-red-50 text-red-600 border-red-200",
  milestone: "bg-green-50 text-green-700 border-green-200",
  approval: "bg-blue-50 text-blue-700 border-blue-200",
  decision: "bg-purple-50 text-purple-700 border-purple-200",
  update: "bg-amber-50 text-amber-700 border-amber-200",
};

const typeDotColors = {
  system: "bg-gray-400",
  admin_action: "bg-red-500",
  milestone: "bg-green-500",
  approval: "bg-blue-500",
  decision: "bg-purple-500",
  update: "bg-amber-500",
};

export default function TimelineView({ project }) {
  const [filter, setFilter] = useState("all");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const filtered =
    filter === "all"
      ? timelineEvents
      : timelineEvents.filter((e) => e.type === filter);

  // Group by date
  const grouped = filtered.reduce((acc, event) => {
    const date = new Date(event.date).toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
    if (!acc[date]) acc[date] = [];
    acc[date].push(event);
    return acc;
  }, {});

  const handleExportPDF = () => {
    const printContent = `
      <html>
      <head>
        <title>Timeline — ${project.name}</title>
        <style>
          body { font-family: Arial, sans-serif; padding: 32px; color: #111; }
          h1 { font-size: 20px; margin-bottom: 4px; }
          .subtitle { font-size: 13px; color: #666; margin-bottom: 24px; }
          .date-group { margin-bottom: 20px; }
          .date-label { font-size: 13px; font-weight: bold; color: #333; border-bottom: 1px solid #eee; padding-bottom: 6px; margin-bottom: 10px; }
          .event { padding: 10px 14px; border: 1px solid #eee; border-radius: 8px; margin-bottom: 8px; }
          .event-content { font-size: 13px; color: #222; }
          .event-meta { font-size: 11px; color: #888; margin-top: 4px; }
          .locked { float: right; font-size: 11px; color: #d97706; }
          .filter-note { font-size: 12px; color: #888; margin-bottom: 16px; }
        </style>
      </head>
      <body>
        <h1>Project Timeline — ${project.name}</h1>
        <div class="subtitle">Client: ${project.client} · Generated: ${new Date().toLocaleString("en-IN")}</div>
        <div class="filter-note">Filter: ${FILTER_OPTIONS.find(f => f.value === filter)?.label}</div>
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
          </div>
        `).join("")}
      </body>
      </html>
    `;
    const win = window.open("", "_blank");
    win.document.write(printContent);
    win.document.close();
    win.print();
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <div className="w-8 h-8 bg-green-50 rounded-lg flex items-center justify-center">
            <svg className="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <p className="text-sm font-semibold text-gray-800">Project Timeline</p>
            <p className="text-xs text-gray-400">{project.name} · Internal View · {filtered.length} events</p>
          </div>
        </div>

        {/* Filter dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2 text-sm border border-green-300 text-green-700 px-3 py-1.5 rounded-lg hover:bg-green-50 transition-colors font-medium"
          >
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L13 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 017 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
            </svg>
            {FILTER_OPTIONS.find((f) => f.value === filter)?.label}
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-50 w-48 py-1 overflow-hidden">
              {FILTER_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => { setFilter(opt.value); setDropdownOpen(false); }}
                  className={`w-full text-left px-4 py-2 text-sm transition-colors flex items-center gap-2 ${
                    filter === opt.value
                      ? "bg-green-50 text-green-700 font-medium"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  {filter === opt.value && (
                    <svg className="w-3.5 h-3.5 text-green-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  )}
                  {filter !== opt.value && <span className="w-3.5 shrink-0" />}
                  {opt.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Export PDF */}
        <button
          onClick={handleExportPDF}
          className="flex items-center gap-2 text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export PDF
        </button>
      </div>

      {/* Timeline content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">
        {Object.keys(grouped).length === 0 ? (
          <div className="flex flex-col items-center justify-center h-48 text-center">
            <p className="text-sm text-gray-500">No events found for this filter</p>
          </div>
        ) : (
          Object.entries(grouped).map(([date, events]) => (
            <div key={date} className="mb-8">
              {/* Date header */}
              <div className="flex items-center gap-3 mb-4">
                <div className="w-2.5 h-2.5 rounded-full bg-green-500 shrink-0" />
                <h3 className="text-sm font-bold text-gray-800">{date}</h3>
              </div>

              {/* Events */}
              <div className="ml-5 border-l-2 border-gray-100 pl-5 space-y-3">
                {events.map((event) => (
                  <div
                    key={event.id}
                    className="relative bg-white border border-gray-100 rounded-xl px-4 py-3 hover:border-gray-200 transition-colors"
                  >
                    {/* Type badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-start gap-2.5 flex-1 min-w-0">
                        {/* Dot on timeline line */}
                        <div className={`absolute -left-7 top-4 w-2.5 h-2.5 rounded-full border-2 border-white ${typeDotColors[event.type] || "bg-gray-400"}`} />

                        <span className="text-base shrink-0 mt-0.5">{event.icon}</span>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-gray-800 leading-relaxed">{event.content}</p>
                          <div className="flex items-center gap-2 mt-1.5 flex-wrap">
                            <span className="text-xs text-gray-400">{event.time}</span>
                            {event.by && (
                              <>
                                <span className="text-gray-300 text-xs">·</span>
                                <span className="text-xs text-gray-500">by {event.by}</span>
                              </>
                            )}
                            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${typeColors[event.type]}`}>
                              {FILTER_OPTIONS.find((f) => f.value === event.type)?.label || event.type}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Locked badge */}
                      {event.locked && (
                        <div className="flex items-center gap-1 shrink-0 text-amber-600 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded-full">
                          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs font-medium">Locked</span>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}