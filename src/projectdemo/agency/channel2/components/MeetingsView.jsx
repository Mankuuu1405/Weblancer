import { useState } from "react";

const dummyMeetings = {
  upcoming: [
    {
      id: "m1",
      title: "Project Discussion — Milestone 2 progress check and demo review",
      date: "Mar 20, 2026",
      time: "2:00 PM IST",
      duration: 60,
      status: "confirmed",
      participants: ["Raj Kumar", "Sara M.", "Platform Admin"],
      purpose: "Progress Review",
      agenda: "1. Review Backend API progress\n2. Demo payment integration\n3. Discuss blockers\n4. Set next milestone targets",
      notes: "Please prepare your progress updates before the meeting.",
      history: [],
    },
    {
      id: "m2",
      title: "Requirement Clarification — Clarify payment flow requirements",
      date: "Mar 25, 2026",
      time: "11:00 AM EST",
      duration: 30,
      status: "rescheduled",
      participants: ["Sara M.", "Dev Mike"],
      purpose: "Requirement Clarification",
      agenda: "1. Payment gateway options\n2. Checkout flow UX",
      notes: "",
      history: [
        { action: "rescheduled", by: "Raj Kumar", at: "Mar 12, 2026 · 10:00 AM", reason: "Rescheduled from Mar 18 to Mar 25 due to team availability." },
      ],
    },
  ],
  past: [
    {
      id: "p1",
      title: "Delivery Review — Feb 18, 2026",
      date: "Feb 18, 2026",
      time: "2:00 PM IST",
      duration: 43,
      status: "completed",
      participants: ["Raj Kumar", "Sara M."],
      summary: "Team reviewed Milestone 1 deliverables. All wireframes approved. Sara committed to delivering updated screens by Feb 20.",
      history: [],
    },
  ],
  cancelled: [
    {
      id: "c1",
      title: "Sprint Planning — Week 2 kickoff",
      originalDate: "Mar 8, 2026",
      originalTime: "10:00 AM IST",
      cancelledBy: "Raj Kumar",
      cancelledAt: "Mar 7, 2026 · 9:00 PM",
      reason: "Agency admin unavailable due to client emergency. Will reschedule.",
      participants: ["Raj Kumar", "Sara M.", "Dev Mike", "Priya S."],
    },
    {
      id: "c2",
      title: "Design Review — Mobile screens walkthrough",
      originalDate: "Mar 10, 2026",
      originalTime: "3:00 PM IST",
      cancelledBy: "Priya S.",
      cancelledAt: "Mar 10, 2026 · 1:30 PM",
      reason: "Design files not ready. Meeting postponed to next week.",
      participants: ["Raj Kumar", "Priya S."],
    },
  ],
};

const purposeOptions = [
  "Progress Review", "Requirement Clarification", "Delivery Review",
  "Team Sync", "Issue Resolution", "Kickoff Meeting", "Other",
];

const statusBadge = {
  confirmed: <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">✓ Confirmed</span>,
  pending: <span className="flex items-center gap-1 text-xs bg-amber-50 text-amber-600 border border-amber-200 px-2.5 py-1 rounded-full font-medium">⏳ Pending</span>,
  rescheduled: <span className="flex items-center gap-1 text-xs bg-blue-50 text-blue-600 border border-blue-200 px-2.5 py-1 rounded-full font-medium">↻ Rescheduled</span>,
  completed: <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 border border-green-200 px-2.5 py-1 rounded-full font-medium">✓ Completed</span>,
  cancelled: <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2.5 py-1 rounded-full font-medium">✕ Cancelled</span>,
};

export default function MeetingsView({ participants }) {
  const [meetings, setMeetings] = useState(dummyMeetings);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showAgenda, setShowAgenda] = useState(null);
  const [showSummary, setShowSummary] = useState(null);
  const [editMeeting, setEditMeeting] = useState(null);
  const [showCancelModal, setShowCancelModal] = useState(null);
  const [activeTab, setActiveTab] = useState("upcoming");

  const handleCancel = (meeting, reason) => {
    setMeetings((prev) => ({
      ...prev,
      upcoming: prev.upcoming.filter((m) => m.id !== meeting.id),
      cancelled: [
        {
          id: meeting.id,
          title: meeting.title,
          originalDate: meeting.date,
          originalTime: meeting.time,
          cancelledBy: "Raj Kumar",
          cancelledAt: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
          reason: reason || "No reason provided.",
          participants: meeting.participants,
        },
        ...prev.cancelled,
      ],
    }));
    setShowCancelModal(null);
  };

  const handleSchedule = (data) => {
    const newMeeting = { id: `m${Date.now()}`, ...data, status: "pending", history: [] };
    setMeetings((prev) => ({ ...prev, upcoming: [newMeeting, ...prev.upcoming] }));
    setShowSchedule(false);
  };

  const handleEdit = (data) => {
    setMeetings((prev) => ({
      ...prev,
      upcoming: prev.upcoming.map((m) =>
        m.id === data.id
          ? {
              ...m, ...data, status: "rescheduled",
              history: [
                ...(m.history || []),
                {
                  action: "rescheduled",
                  by: "Raj Kumar",
                  at: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
                  reason: data.rescheduleReason || `Rescheduled to ${data.date} at ${data.time}.`,
                },
              ],
            }
          : m
      ),
    }));
    setEditMeeting(null);
  };

  const tabs = [
    { id: "upcoming", label: "Upcoming", count: meetings.upcoming.length },
    { id: "past", label: "Past", count: meetings.past.length },
    { id: "cancelled", label: "Cancelled", count: meetings.cancelled.length },
  ];

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">📅</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Meetings</p>
            <p className="text-xs text-gray-400">
              {meetings.upcoming.length} upcoming · {meetings.past.length} past · {meetings.cancelled.length} cancelled
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowSchedule(true)}
          className="flex items-center gap-2 text-sm px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          Schedule New Meeting
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-6 shrink-0">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-green-600 text-green-700"
                : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              activeTab === tab.id ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4">

        {/* Upcoming Tab */}
        {activeTab === "upcoming" && (
          <div className="space-y-3">
            {meetings.upcoming.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-6 text-center">
                <p className="text-sm text-gray-500">No upcoming meetings</p>
                <p className="text-xs text-gray-400 mt-1">Schedule one using the button above</p>
              </div>
            ) : meetings.upcoming.map((m) => (
              <div key={m.id} className="bg-white border border-gray-100 rounded-xl px-4 py-4 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start gap-2 mb-1">
                      <span className="text-base shrink-0 mt-0.5">{getPurposeIcon(m.purpose)}</span>
                      <p className="text-sm font-semibold text-gray-800 leading-tight">{m.title}</p>
                    </div>
                    <p className="text-xs text-gray-500 ml-6">{m.date} · {m.time} · {m.duration} min</p>
                    <p className="text-xs text-gray-400 ml-6 mt-0.5">Participants: {m.participants.join(" · ")}</p>

                    {/* Rescheduled history tag */}
                    {m.history && m.history.length > 0 && (
                      <div className="ml-6 mt-2 flex items-center gap-1.5 text-xs text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-2.5 py-1 w-fit">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Rescheduled {m.history.length} time{m.history.length > 1 ? "s" : ""} — {m.history[m.history.length - 1].reason}
                      </div>
                    )}
                  </div>
                  {statusBadge[m.status]}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-3 flex-wrap">
                  {m.status === "confirmed" && (
                    <button className="text-xs bg-green-600 text-white px-3 py-1.5 rounded-lg hover:bg-green-700 font-medium">
                      Join
                    </button>
                  )}
                  <button onClick={() => setShowAgenda(m)}
                    className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    View Agenda
                  </button>
                  <button onClick={() => setEditMeeting(m)}
                    className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Reschedule
                  </button>
                  <button onClick={() => setShowCancelModal(m)}
                    className="text-xs text-red-500 hover:text-red-700 px-2.5 py-1.5 transition-colors">
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Tab */}
        {activeTab === "past" && (
          <div className="space-y-3">
            {meetings.past.map((m) => (
              <div key={m.id} className="bg-white border border-gray-100 rounded-xl px-4 py-4 hover:border-gray-200 transition-colors">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">{m.title}</p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      Duration: {m.duration} min · Participants: {m.participants.length} · Summary: Posted ✓
                    </p>
                  </div>
                  {statusBadge[m.status]}
                </div>
                <div className="flex gap-2 mt-3">
                  <button onClick={() => setShowSummary(m)}
                    className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    View Summary
                  </button>
                  <button onClick={() => handleDownloadPDF(m)}
                    className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50">
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancelled Tab */}
        {activeTab === "cancelled" && (
          <div className="space-y-3">
            {meetings.cancelled.length === 0 ? (
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-6 text-center">
                <p className="text-sm text-gray-500">No cancelled meetings</p>
              </div>
            ) : (
              <>
                <div className="flex items-center gap-2 bg-red-50 border border-red-100 rounded-xl px-4 py-2.5 mb-2">
                  <svg className="w-4 h-4 text-red-500 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p className="text-xs text-red-600">Cancelled meetings are kept for audit purposes and cannot be deleted.</p>
                </div>

                {meetings.cancelled.map((m) => (
                  <div key={m.id} className="bg-white border border-red-100 rounded-xl px-4 py-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-700">{m.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          Was scheduled: {m.originalDate} · {m.originalTime}
                        </p>
                        <p className="text-xs text-gray-400">
                          Participants: {m.participants.join(", ")}
                        </p>
                      </div>
                      {statusBadge["cancelled"]}
                    </div>

                    {/* Cancel details */}
                    <div className="mt-3 bg-red-50 border border-red-100 rounded-lg px-3 py-2.5 space-y-1">
                      <div className="flex items-center gap-1.5">
                        <svg className="w-3 h-3 text-red-400 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p className="text-xs text-red-600 font-medium">Cancelled by {m.cancelledBy} on {m.cancelledAt}</p>
                      </div>
                      <p className="text-xs text-gray-600 italic ml-4.5">"{m.reason}"</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showSchedule && (
        <ScheduleMeetingModal participants={participants} onClose={() => setShowSchedule(false)} onSchedule={handleSchedule} />
      )}
      {editMeeting && (
        <ScheduleMeetingModal participants={participants} onClose={() => setEditMeeting(null)} onSchedule={handleEdit} existing={editMeeting} />
      )}
      {showAgenda && <AgendaModal meeting={showAgenda} onClose={() => setShowAgenda(null)} />}
      {showSummary && <SummaryModal meeting={showSummary} onClose={() => setShowSummary(null)} />}
      {showCancelModal && (
        <CancelModal meeting={showCancelModal} onClose={() => setShowCancelModal(null)} onConfirm={handleCancel} />
      )}
    </div>
  );
}

// ── Cancel Confirmation Modal ──────────────────────────────────
function CancelModal({ meeting, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">Cancel Meeting</p>
          <p className="text-xs text-gray-400 mt-0.5 truncate">{meeting.title}</p>
        </div>
        <div className="p-5 space-y-3">
          <div className="bg-amber-50 border border-amber-200 rounded-lg px-3 py-2.5 flex items-start gap-2">
            <svg className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <p className="text-xs text-amber-700">This will be permanently recorded in the cancelled meetings log.</p>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Reason for cancellation</label>
            <textarea
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Why is this meeting being cancelled?"
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-200 resize-none placeholder-gray-300"
            />
          </div>
        </div>
        <div className="px-5 pb-4 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Keep Meeting</button>
          <button
            onClick={() => onConfirm(meeting, reason)}
            className="text-sm px-4 py-2 rounded-lg bg-red-600 text-white hover:bg-red-700 font-medium"
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Schedule / Edit Modal ──────────────────────────────────────
function ScheduleMeetingModal({ participants = [], onClose, onSchedule, existing }) {
  const isEdit = !!existing;
  const [step, setStep] = useState(1);
  const [rescheduleReason, setRescheduleReason] = useState("");
  const [form, setForm] = useState({
    title: existing?.title || "",
    purpose: existing?.purpose || "",
    date: existing?.date || "",
    time: existing?.time || "",
    duration: existing?.duration || 60,
    participants: existing?.participants || (participants?.map((p) => p.name) || []),
    agenda: existing?.agenda || "",
    notes: existing?.notes || "",
  });

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const toggleParticipant = (name) => setForm((prev) => ({
    ...prev,
    participants: prev.participants.includes(name)
      ? prev.participants.filter((p) => p !== name)
      : [...prev.participants, name],
  }));

  const isValid = form.title && form.purpose && form.date && form.time && form.participants.length > 0 && (!isEdit || rescheduleReason.trim());

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-800">{isEdit ? "Reschedule Meeting" : "Schedule New Meeting"}</p>
            <p className="text-xs text-gray-400">Step {step} of 2 — {step === 1 ? "Meeting Details" : "Preview & Confirm"}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="flex px-5 pt-3 gap-2 shrink-0">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-green-500" : "bg-gray-200"}`} />
          ))}
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {step === 1 ? (
            <>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Title <span className="text-red-400">*</span></label>
                <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)}
                  placeholder="e.g. Sprint Review — Milestone 2"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-gray-300" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Purpose <span className="text-red-400">*</span></label>
                <select value={form.purpose} onChange={(e) => update("purpose", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
                  <option value="">Select purpose</option>
                  {purposeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Date <span className="text-red-400">*</span></label>
                  <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">Time <span className="text-red-400">*</span></label>
                  <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)}
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Duration</label>
                <select value={form.duration} onChange={(e) => update("duration", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
                  {[15, 30, 45, 60, 90, 120].map((d) => <option key={d} value={d}>{d < 60 ? `${d} minutes` : `${d / 60} hour${d > 60 ? "s" : ""}`}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Invite Members <span className="text-red-400">*</span></label>
                <div className="space-y-1 max-h-32 overflow-y-auto border border-gray-100 rounded-lg p-2">
                  {(participants || []).map((p) => (
                    <label key={p.id || p.name} className="flex items-center gap-2 cursor-pointer hover:bg-gray-50 px-2 py-1 rounded-lg">
                      <input type="checkbox" checked={form.participants.includes(p.name)}
                        onChange={() => toggleParticipant(p.name)} className="accent-green-600 w-3.5 h-3.5" />
                      <span className="text-sm text-gray-700">{p.name}</span>
                      <span className="text-xs text-gray-400 capitalize">{p.role?.replace("_", " ")}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Agenda / Topics to Discuss</label>
                <textarea value={form.agenda} onChange={(e) => update("agenda", e.target.value)}
                  placeholder="1. Topic one&#10;2. Topic two" rows={4}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300" />
              </div>
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
                <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
                  placeholder="Any preparation needed..." rows={2}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300" />
              </div>

              {/* Reschedule reason — only shown when editing */}
              {isEdit && (
                <div>
                  <label className="block text-xs font-medium text-gray-600 mb-1">
                    Reason for Rescheduling <span className="text-red-400">*</span>
                  </label>
                  <textarea
                    value={rescheduleReason}
                    onChange={(e) => setRescheduleReason(e.target.value)}
                    placeholder="Why is this meeting being rescheduled?"
                    rows={3}
                    className="w-full text-sm border border-blue-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none placeholder-gray-300 bg-blue-50"
                  />
                  {!rescheduleReason.trim() && (
                    <p className="text-xs text-blue-500 mt-1">Required — this will be logged in meeting history.</p>
                  )}
                </div>
              )}
            </>
          ) : (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 space-y-3">
                <p className="text-sm font-semibold text-gray-800">{form.title}</p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div><span className="text-gray-400">Purpose</span><p className="font-medium text-gray-700 mt-0.5">{form.purpose}</p></div>
                  <div><span className="text-gray-400">Duration</span><p className="font-medium text-gray-700 mt-0.5">{form.duration} min</p></div>
                  <div><span className="text-gray-400">Date</span><p className="font-medium text-gray-700 mt-0.5">{form.date}</p></div>
                  <div><span className="text-gray-400">Time</span><p className="font-medium text-gray-700 mt-0.5">{form.time}</p></div>
                </div>
                <div><span className="text-xs text-gray-400">Participants</span><p className="text-xs font-medium text-gray-700 mt-0.5">{form.participants.join(", ")}</p></div>
                {form.agenda && <div><span className="text-xs text-gray-400">Agenda</span><p className="text-xs text-gray-700 mt-0.5 whitespace-pre-line">{form.agenda}</p></div>}
                {form.notes && <div><span className="text-xs text-gray-400">Notes</span><p className="text-xs text-gray-700 mt-0.5 italic">{form.notes}</p></div>}
                {isEdit && rescheduleReason && (
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-2.5 mt-1">
                    <span className="text-xs text-amber-600 font-semibold">↻ Reason for Rescheduling</span>
                    <p className="text-xs text-gray-700 mt-0.5 italic">"{rescheduleReason}"</p>
                  </div>
                )}
              </div>
              <p className="text-xs text-gray-400 text-center">All participants will be notified via platform notifications.</p>
            </div>
          )}
        </div>
        <div className="px-5 py-3 border-t border-gray-100 flex items-center justify-between shrink-0">
          <button onClick={step === 1 ? onClose : () => setStep(1)}
            className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
            {step === 1 ? "Cancel" : "Back"}
          </button>
          {step === 1 ? (
            <button onClick={() => setStep(2)} disabled={!isValid}
              className={`text-sm px-4 py-2 rounded-lg font-medium ${isValid ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
              Preview →
            </button>
          ) : (
            <button onClick={() => onSchedule({ ...form, id: existing?.id, rescheduleReason })}
              className="text-sm px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700">
              {isEdit ? "Save Changes ✓" : "Confirm & Schedule ✓"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

function AgendaModal({ meeting, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Meeting Agenda</p>
            <p className="text-xs text-gray-400">{meeting.date} · {meeting.time}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{meeting.title}</p>
          <div><p className="text-xs text-gray-400 mb-1">Purpose</p><p className="text-sm text-gray-700">{meeting.purpose}</p></div>
          <div><p className="text-xs text-gray-400 mb-1">Participants</p><p className="text-sm text-gray-700">{meeting.participants.join(", ")}</p></div>
          {meeting.agenda && <div><p className="text-xs text-gray-400 mb-1">Agenda</p><p className="text-sm text-gray-700 whitespace-pre-line">{meeting.agenda}</p></div>}
          {meeting.notes && (
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-3">
              <p className="text-xs text-amber-600 font-medium mb-0.5">Notes for participants</p>
              <p className="text-xs text-gray-700 italic">{meeting.notes}</p>
            </div>
          )}
        </div>
        <div className="px-5 pb-4 flex justify-end">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Close</button>
        </div>
      </div>
    </div>
  );
}

function SummaryModal({ meeting, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">Meeting Summary</p>
            <p className="text-xs text-gray-400">{meeting.date} · {meeting.duration} min</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="p-5 space-y-3">
          <p className="text-sm font-semibold text-gray-800">{meeting.title}</p>
          <p className="text-xs text-gray-400">Participants: {meeting.participants.join(", ")}</p>
          <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
            <p className="text-sm text-gray-700 leading-relaxed">{meeting.summary}</p>
          </div>
        </div>
        <div className="px-5 pb-4 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Close</button>
          <button onClick={() => handleDownloadPDF(meeting)}
            className="flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-gray-800 text-white hover:bg-gray-900">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
            </svg>
            Download PDF
          </button>
        </div>
      </div>
    </div>
  );
}

function handleDownloadPDF(meeting) {
  const win = window.open("", "_blank");
  win.document.write(`<html><head><title>Summary — ${meeting.title}</title><style>body{font-family:Arial;padding:32px;color:#111;}h2{font-size:16px;}p{font-size:13px;line-height:1.6;color:#444;}.box{background:#f9f9f9;border:1px solid #eee;border-radius:8px;padding:16px;margin-top:12px;}</style></head><body><h2>${meeting.title}</h2><p>${meeting.date} · Duration: ${meeting.duration} min</p><p>Participants: ${meeting.participants.join(", ")}</p><div class="box">${meeting.summary}</div></body></html>`);
  win.document.close();
  win.print();
}

function getPurposeIcon(purpose) {
  const map = { "Progress Review": "💬", "Requirement Clarification": "🔍", "Delivery Review": "📦", "Team Sync": "👥", "Kickoff Meeting": "🚀", "Issue Resolution": "⚡" };
  return map[purpose] || "📅";
}