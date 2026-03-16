import { useState, useRef } from "react";

// ─── ALL TIMELINE EVENTS (tagged by category for filtering) ───────────────────
const ALL_EVENTS = [
  {
    date: "March 1, 2026",
    dotColor: "bg-green-500",
    time: "10:00 AM",
    by: null,
    locked: true,
    category: "admin",
    icon: "🏢",
    content: "ProjectStream (Channel A) for 'E-Commerce Platform' has been created. All communication, deliverables, decisions, and payments for this project will be tracked here. This space is permanent and legally logged.",
  },
  {
    date: "March 1, 2026",
    dotColor: "bg-green-500",
    time: "10:00 AM",
    by: null,
    locked: true,
    category: "payment",
    icon: "💰",
    content: "Escrow funded: $85,000 secured for this project.",
  },
  {
    date: "March 1, 2026",
    dotColor: "bg-gray-300",
    time: "11:00 AM",
    by: "TechCorp Agency",
    locked: false,
    category: "milestone",
    icon: "📋",
    content: "TechCorp Agency confirmed scope and assigned Maya S. (Frontend Lead) and Dev K. (Backend). Team structure approved.",
  },
  {
    date: "March 2, 2026",
    dotColor: "bg-gray-300",
    time: "12:30 PM",
    by: "TechCorp Agency",
    locked: true,
    category: "decision",
    icon: "🔒",
    content: "Persistent filters confirmed as Milestone 1 requirement. Agency Admin commitment logged by system.",
  },
  {
    date: "March 20, 2026",
    dotColor: "bg-green-500",
    time: "5:10 PM",
    by: "Dev K.",
    locked: true,
    category: "milestone",
    icon: "📦",
    content: "Milestone 1 deliverables submitted by agency. Client has 7 business days to review.",
  },
  {
    date: "March 22, 2026",
    dotColor: "bg-green-500",
    time: "2:00 PM",
    by: "Alex R.",
    locked: false,
    category: "approval",
    icon: "✅",
    content: "Client approved Milestone 1 deliverables. Prototype accepted. Proceeding to Milestone 2 — Backend Integration.",
  },
  {
    date: "March 22, 2026",
    dotColor: "bg-red-400",
    time: "2:30 PM",
    by: "Platform Admin",
    locked: true,
    category: "admin",
    icon: "🔴",
    content: "Platform Admin: Milestone 1 officially approved. Payment of $21,250 released from escrow. Decision is final and non-reversible.",
  },
  {
    date: "March 22, 2026",
    dotColor: "bg-green-500",
    time: "2:32 PM",
    by: null,
    locked: true,
    category: "payment",
    icon: "💰",
    content: "Client approved Milestone 1 — $21,250 released from escrow. Agency account updated.",
  },
  {
    date: "April 1, 2026",
    dotColor: "bg-gray-300",
    time: "10:00 AM",
    by: "TechCorp Agency",
    locked: false,
    category: "milestone",
    icon: "🚀",
    content: "Milestone 2 (Backend Integration) officially started. API architecture document submitted to client for review.",
  },
];

const FILTERS = [
  { label: "All Events", value: "all", icon: "📋" },
  { label: "Payments & Escrow", value: "payment", icon: "💰" },
  { label: "Milestones", value: "milestone", icon: "📦" },
  { label: "Admin Actions", value: "admin", icon: "🔴" },
  { label: "Approvals", value: "approval", icon: "✅" },
  { label: "Decisions", value: "decision", icon: "🔒" },
];

// ─── GROUP EVENTS BY DATE ─────────────────────────────────────────────────────
function groupByDate(events) {
  const map = {};
  events.forEach((ev) => {
    if (!map[ev.date]) map[ev.date] = [];
    map[ev.date].push(ev);
  });
  return Object.entries(map).map(([date, evs]) => ({ date, events: evs }));
}

export default function TimelineView() {
  const [filter, setFilter] = useState("all");
  const [showFilterDropdown, setShowFilterDropdown] = useState(false);
  const [exporting, setExporting] = useState(false);
  const printRef = useRef(null);

  const activeFilter = FILTERS.find((f) => f.value === filter);

  const filtered = filter === "all"
    ? ALL_EVENTS
    : ALL_EVENTS.filter((ev) => ev.category === filter);

  const grouped = groupByDate(filtered);

  // ── Export PDF via print ──────────────────────────────────────────────────────
  function handleExportPDF() {
    setExporting(true);
    setTimeout(() => {
      const content = printRef.current;
      const printWindow = window.open("", "_blank");
      printWindow.document.write(`
        <html>
          <head>
            <title>Project Timeline — E-Commerce Platform</title>
            <style>
              body { font-family: Arial, sans-serif; padding: 32px; color: #1f2937; }
              h1 { font-size: 22px; font-weight: bold; margin-bottom: 4px; }
              .subtitle { font-size: 13px; color: #6b7280; margin-bottom: 24px; }
              .date-header { font-weight: bold; font-size: 15px; color: #374151; margin: 20px 0 8px; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
              .event { border: 1px solid #e5e7eb; border-radius: 8px; padding: 12px 16px; margin-bottom: 8px; background: #f9fafb; }
              .event-content { font-size: 13px; color: #374151; margin-bottom: 6px; line-height: 1.5; }
              .event-meta { font-size: 11px; color: #9ca3af; display: flex; gap: 12px; }
              .locked { background: #fff7ed; border-color: #fed7aa; }
              .locked-badge { font-size: 10px; background: #fff7ed; color: #c2410c; border: 1px solid #fed7aa; padding: 2px 6px; border-radius: 9999px; }
              .filter-note { font-size: 12px; color: #6b7280; margin-bottom: 16px; }
              .footer { font-size: 11px; color: #9ca3af; margin-top: 32px; border-top: 1px solid #e5e7eb; padding-top: 12px; }
            </style>
          </head>
          <body>
            <h1>📋 Project Timeline</h1>
            <div class="subtitle">E-Commerce Platform · Exported ${new Date().toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric", hour: "2-digit", minute: "2-digit" })}</div>
            <div class="filter-note">Filter: ${activeFilter.label} (${filtered.length} event${filtered.length !== 1 ? "s" : ""})</div>
            ${grouped.map(group => `
              <div class="date-header">${group.date}</div>
              ${group.events.map(ev => `
                <div class="event ${ev.locked ? "locked" : ""}">
                  <div class="event-content">${ev.icon} ${ev.content}</div>
                  <div class="event-meta">
                    <span>${ev.time}</span>
                    ${ev.by ? `<span>by ${ev.by}</span>` : ""}
                    ${ev.locked ? `<span class="locked-badge">🔒 LOCKED</span>` : ""}
                  </div>
                </div>
              `).join("")}
            `).join("")}
            <div class="footer">
              This timeline is auto-generated and forms part of the official project record on Weblancer platform.
              All locked events are legally binding and cannot be modified.
            </div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      setTimeout(() => {
        printWindow.print();
        printWindow.close();
        setExporting(false);
      }, 500);
    }, 100);
  }

  return (
    <div className="flex-1 overflow-y-auto p-6" ref={printRef}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800">Project Timeline</h2>
        <div className="flex items-center gap-3">

          {/* Filter dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowFilterDropdown(!showFilterDropdown)}
              className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-1.5 text-sm bg-white hover:bg-gray-50 min-w-44"
            >
              <span>🔽</span>
              <span className="flex-1 text-left">{activeFilter.label}</span>
              <span className="text-gray-400 text-xs">▼</span>
            </button>

            {showFilterDropdown && (
              <div className="absolute top-full mt-1 left-0 bg-white border border-gray-200 rounded-xl shadow-lg z-20 min-w-48 py-1">
                {FILTERS.map((f) => (
                  <button
                    key={f.value}
                    onClick={() => { setFilter(f.value); setShowFilterDropdown(false); }}
                    className={`w-full flex items-center gap-2 px-4 py-2.5 text-sm hover:bg-gray-50 transition-colors ${
                      filter === f.value ? "text-green-700 font-medium" : "text-gray-700"
                    }`}
                  >
                    {filter === f.value && <span className="text-green-500">✓</span>}
                    {filter !== f.value && <span className="w-4" />}
                    <span>{f.icon}</span>
                    <span>{f.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Export PDF */}
          <button
            onClick={handleExportPDF}
            disabled={exporting}
            className={`flex items-center gap-1.5 text-sm border border-gray-200 rounded-lg px-3 py-1.5 transition-colors ${
              exporting ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "text-gray-600 hover:bg-gray-50"
            }`}
          >
            {exporting ? (
              <>
                <span className="animate-spin">⏳</span> Generating...
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Export PDF
              </>
            )}
          </button>
        </div>
      </div>

      {/* Active filter badge */}
      {filter !== "all" && (
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-green-50 text-green-700 border border-green-200 text-xs font-medium px-3 py-1 rounded-full flex items-center gap-1">
            {activeFilter.icon} {activeFilter.label}
            <button onClick={() => setFilter("all")} className="ml-1 text-green-500 hover:text-green-700">✕</button>
          </span>
          <span className="text-xs text-gray-400">{filtered.length} event{filtered.length !== 1 ? "s" : ""}</span>
        </div>
      )}

      {/* Empty state */}
      {grouped.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <span className="text-4xl mb-3">📭</span>
          <p className="text-gray-500 font-medium">No {activeFilter.label.toLowerCase()} yet</p>
          <p className="text-xs text-gray-400 mt-1">Events will appear here as the project progresses</p>
          <button onClick={() => setFilter("all")} className="mt-4 text-sm text-green-600 hover:underline">
            Show all events
          </button>
        </div>
      )}

      {/* Timeline */}
      <div className="space-y-6">
        {grouped.map((group, gi) => (
          <div key={gi}>
            {/* Date header */}
            <div className="flex items-center gap-3 mb-3">
              <span className={`w-3 h-3 rounded-full ${group.events[0].dotColor} shrink-0`} />
              <span className="font-semibold text-gray-700">{group.date}</span>
            </div>

            {/* Events under this date */}
            <div className="ml-6 space-y-3">
              {group.events.map((ev, ei) => (
                <div key={ei} className="flex items-start gap-3 pl-4 border-l-2 border-gray-100">
                  <div className={`flex-1 bg-white border rounded-xl p-3 shadow-sm ${ev.locked ? "border-orange-100" : "border-gray-100"}`}>
                    <p className="text-sm text-gray-700 leading-relaxed">
                      <span className="mr-1">{ev.icon}</span>
                      {ev.content}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <span>{ev.time}</span>
                        {ev.by && <span>· by <span className="text-gray-500 font-medium">{ev.by}</span></span>}
                      </div>
                      {ev.locked && (
                        <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-medium">
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