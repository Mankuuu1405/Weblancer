import { useState } from "react";

// ── Meetings Data ──────────────────────────────────────
const upcomingMeetings = [
  {
    id: 1,
    icon: "💬",
    title: "Project Discussion",
    desc: "Milestone 2 progress check and demo review",
    date: "Mar 20, 2026",
    time: "2:00 PM IST",
    participants: ["John D.", "Sara M.", "Platform Admin"],
    status: "Confirmed",
    canJoin: true,
  },
  {
    id: 2,
    icon: "🔍",
    title: "Requirement Clarification",
    desc: "Clarify payment flow requirements for checkout module",
    date: "Mar 25, 2026",
    time: "11:00 AM EST",
    participants: ["Sara M.", "John D."],
    status: "Pending",
    canJoin: false,
  },
];

const pastMeetings = [
  {
    id: 3,
    icon: "📦",
    title: "Delivery Review",
    subtitle: "Feb 18, 2026",
    duration: "43 min",
    participants: 2,
    summary: true,
    status: "Completed",
  },
];

// ── Icons ──────────────────────────────────────────────
const IconCalendar = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);
const IconPlus = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconDoc = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);

// ── Status Badge ───────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "Confirmed") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
        ✓ Confirmed
      </span>
    );
  }
  if (status === "Pending") {
    return (
      <span className="inline-flex items-center gap-1 border border-yellow-400 text-yellow-500 text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap bg-white">
        ⏳ Pending
      </span>
    );
  }
  if (status === "Completed") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
        ✓ Completed
      </span>
    );
  }
  return null;
}

// ── Upcoming Meeting Card ──────────────────────────────
function UpcomingCard({ meeting }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-start gap-2 mb-1 flex-wrap">
            <span className="text-base flex-shrink-0 mt-0.5">{meeting.icon}</span>
            <p className="text-sm font-bold text-gray-900 leading-snug">
              {meeting.title}{" "}
              <span className="font-normal text-gray-700">— {meeting.desc}</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 mt-1 ml-6">
            {meeting.date} · {meeting.time}
          </p>
          <p className="text-xs text-gray-400 mt-0.5 ml-6">
            Participants: {meeting.participants.join(" · ")}
          </p>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={meeting.status} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-3 ml-6">
        {meeting.canJoin && (
          <button className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold px-4 py-2 rounded-lg transition-colors">
            Join
          </button>
        )}
        <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          View Agenda
        </button>
        <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          Reschedule
        </button>
        <button className="inline-flex items-center gap-1.5 text-xs font-medium text-red-500 hover:text-red-600 px-2 py-1.5 transition-colors">
          Cancel
        </button>
      </div>
    </div>
  );
}

// ── Past Meeting Card ──────────────────────────────────
function PastCard({ meeting }) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-base flex-shrink-0">{meeting.icon}</span>
            <p className="text-sm font-bold text-gray-900">
              {meeting.title}{" "}
              <span className="font-normal text-gray-700">— {meeting.subtitle}</span>
            </p>
          </div>
          <p className="text-xs text-gray-400 ml-6">
            Duration: {meeting.duration} · Participants: {meeting.participants} · Summary: Posted ✓
          </p>
        </div>
        <div className="flex-shrink-0">
          <StatusBadge status={meeting.status} />
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex flex-wrap gap-2 mt-3 ml-6">
        <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <IconDoc /> View Summary
        </button>
        <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
          <IconDownload /> Download PDF
        </button>
      </div>
    </div>
  );
}

// ── MeetingsView Main Component ────────────────────────
export default function MeetingsView() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2 text-gray-900">
          <IconCalendar />
          <h2 className="text-base font-bold">Meetings</h2>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors shadow-sm"
        >
          <IconPlus /> Schedule New Meeting
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-1 overflow-y-auto px-6 py-5 space-y-6">

        {/* Upcoming */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
            Upcoming
          </p>
          <div className="space-y-3">
            {upcomingMeetings.map((m) => (
              <UpcomingCard key={m.id} meeting={m} />
            ))}
          </div>
        </div>

        {/* Past Meetings */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
            Past Meetings
          </p>
          <div className="space-y-3">
            {pastMeetings.map((m) => (
              <PastCard key={m.id} meeting={m} />
            ))}
          </div>
        </div>

        <div className="h-4" />
      </div>

      {/* Schedule New Meeting Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Schedule New Meeting</h3>
              <button
                onClick={() => setShowModal(false)}
                className="text-gray-400 hover:text-gray-600 text-xl font-bold"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Meeting Title</label>
                <input
                  type="text"
                  placeholder="e.g. Milestone 3 Review"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1">Time</label>
                  <input
                    type="time"
                    className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={3}
                  placeholder="What will be discussed?"
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button
                onClick={() => setShowModal(false)}
                className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors"
              >
                Schedule Meeting
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}