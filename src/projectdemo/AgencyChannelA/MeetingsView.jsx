import { useState } from "react";
import { MEETINGS_DATA } from "./ProjectData";

// ─── SCHEDULE MEETING MODAL ────────────────────────────────────────────────────
const MEETING_TYPES = [
  { icon: "⚪", label: "Project Discussion", desc: "General project progress, questions, alignment", adminNote: null },
  { icon: "🔵", label: "Requirement Clarification", desc: "Clear up ambiguous requirements or scope", adminNote: null },
  { icon: "🟠", label: "Delivery Review", desc: "Review submitted milestone deliverables", adminNote: null },
  {
    icon: "⚠️",
    label: "Dispute Discussion",
    desc: "Resolve a disagreement between parties",
    adminNote: "⚠ Admin will be auto-added to this meeting",
  },
  { icon: "📋", label: "Scope Change Discussion", desc: "Discuss modifying the original project agreement", adminNote: null },
];

function ScheduleModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration, setDuration] = useState("45 min");
  const [purpose, setPurpose] = useState("");
  const [topics, setTopics] = useState([""]);

  const STEPS = 5;
  const progress = (step / STEPS) * 100;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg">
        {/* Header */}
        <div className="flex items-center justify-between p-6 pb-2">
          <div>
            <h3 className="font-bold text-gray-800 flex items-center gap-2">
              <span>📅</span> Schedule a Meeting
            </h3>
            <p className="text-xs text-gray-400 mt-0.5">
              Step {step} of {STEPS} —{" "}
              {["Meeting Type", "Participants", "Date, Time & Duration", "Meeting Agenda", "Review & Confirm"][step - 1]}
            </p>
          </div>
          <button onClick={onClose} className="text-gray-300 hover:text-gray-500 text-xl">
            ✕
          </button>
        </div>

        {/* Progress */}
        <div className="px-6 mb-4">
          <div className="w-full bg-gray-100 rounded-full h-1.5 flex gap-1 overflow-hidden">
            {[1, 2, 3, 4, 5].map((s) => (
              <div key={s} className={`flex-1 rounded-full ${s <= step ? "bg-green-500" : "bg-gray-100"}`} />
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="px-6 pb-4 max-h-96 overflow-y-auto">
          {step === 1 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">What is this meeting about?</p>
              <div className="space-y-2">
                {MEETING_TYPES.map((mt) => (
                  <label
                    key={mt.label}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
                      selectedType === mt.label ? "border-green-400 bg-green-50" : "border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    <input
                      type="radio"
                      name="meetingType"
                      className="mt-0.5"
                      checked={selectedType === mt.label}
                      onChange={() => setSelectedType(mt.label)}
                    />
                    <div>
                      <p className="text-sm font-medium text-gray-800">
                        {mt.icon} {mt.label}
                      </p>
                      <p className="text-xs text-gray-400">{mt.desc}</p>
                      {mt.adminNote && <p className="text-xs text-orange-500 mt-1">{mt.adminNote}</p>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p className="text-sm font-medium text-gray-700 mb-3">Who should attend?</p>
              <div className="space-y-2">
                {[
                  { name: "Alex R. (You — auto-included)", role: "CLIENT", locked: true },
                  { name: "TechCorp Agency", role: "AGENCY ADMIN", locked: false },
                  { name: "Platform Admin", role: "ADMIN", locked: false },
                ].map((p) => (
                  <div
                    key={p.name}
                    className="flex items-center justify-between p-3 rounded-xl border border-gray-200"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          p.locked ? "border-green-500 bg-green-500" : "border-gray-300"
                        }`}
                      >
                        {p.locked && <span className="text-white text-xs">✓</span>}
                      </div>
                      <span className="text-sm text-gray-700">{p.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          p.role === "CLIENT"
                            ? "bg-green-100 text-green-700"
                            : p.role === "AGENCY ADMIN"
                            ? "bg-blue-100 text-blue-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {p.role}
                      </span>
                      {p.locked && <span className="text-xs text-gray-400 border border-gray-200 rounded px-1.5 py-0.5">Locked</span>}
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-xs text-yellow-600 mt-3 bg-yellow-50 border border-yellow-200 rounded-lg p-2">
                ⚠️ Role restrictions apply. Some participants require approval before attending.
              </p>
            </div>
          )}

          {step === 3 && (
            <div>
              <p className="text-xs text-gray-400 mb-3">Your timezone: IST (GMT+5:30)</p>
              <input
                type="date"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm mb-4"
              />
              {selectedDate && (
                <div className="mb-4">
                  <p className="text-sm font-medium text-gray-700 mb-2">Available Time Slots (IST):</p>
                  <div className="grid grid-cols-3 gap-2">
                    {["9:00 AM", "10:00 AM", "11:00 AM", "12:00 PM", "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM", "5:00 PM"].map(
                      (t) => (
                        <button
                          key={t}
                          onClick={() => setSelectedTime(t)}
                          className={`text-sm border rounded-lg py-2 transition-colors ${
                            selectedTime === t
                              ? "bg-green-500 text-white border-green-500"
                              : "border-gray-200 hover:bg-gray-50"
                          }`}
                        >
                          {t}
                        </button>
                      )
                    )}
                  </div>
                </div>
              )}
              <div>
                <p className="text-sm font-medium text-gray-700 mb-2">Duration:</p>
                <div className="flex gap-2">
                  {["30 min", "45 min", "60 min", "90 min"].map((d) => (
                    <button
                      key={d}
                      onClick={() => setDuration(d)}
                      className={`text-sm border rounded-lg px-3 py-2 transition-colors ${
                        duration === d ? "bg-green-500 text-white border-green-500" : "border-gray-200 hover:bg-gray-50"
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <p className="text-xs text-orange-500 bg-orange-50 border border-orange-200 rounded-lg p-2 mb-4">
                ⚠️ Meeting agenda is required. This prevents random calls and ensures focused time.
              </p>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Purpose (required):</label>
                <input
                  value={purpose}
                  onChange={(e) => setPurpose(e.target.value)}
                  placeholder="e.g., Review Milestone 2 backend API"
                  className="w-full border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-green-400"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">Topics to discuss (add at least one):</label>
                {topics.map((t, i) => (
                  <div key={i} className="flex gap-2 mb-2">
                    <span className="text-sm text-gray-400 mt-2.5">{i + 1}.</span>
                    <input
                      value={t}
                      onChange={(e) => {
                        const updated = [...topics];
                        updated[i] = e.target.value;
                        setTopics(updated);
                      }}
                      placeholder="Topic..."
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-green-400"
                    />
                  </div>
                ))}
                <button
                  onClick={() => setTopics([...topics, ""])}
                  className="text-sm text-green-600 hover:text-green-700"
                >
                  + Add topic
                </button>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Additional notes for participants:</label>
                <textarea
                  placeholder="Optional notes..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm resize-none focus:outline-none focus:border-green-400"
                  rows={3}
                />
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                <p className="font-semibold text-gray-700 mb-3">🟠 {selectedType || "Delivery Review"}</p>
                <div className="space-y-1.5 text-sm">
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20">Date:</span>
                    <span className="font-medium">{selectedDate || "Thursday, Mar 19, 2026"}</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20">Time:</span>
                    <span className="font-medium">{selectedTime || "1:00 PM"} IST</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="text-gray-400 w-20">Duration:</span>
                    <span className="font-medium bg-green-100 text-green-700 px-2 py-0.5 rounded">{duration}</span>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700 mb-2">
                    <span className="bg-green-100 text-green-700 px-2 py-0.5 rounded text-xs font-bold">Participants:</span>
                  </p>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-green-500">✓</span>
                        <span className="bg-green-100 text-green-700 text-xs font-bold px-1.5 rounded">Alex R.</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-green-100 text-green-700 px-1.5 rounded font-semibold">CLIENT</span>
                        <span className="text-xs text-green-600">Auto-confirmed</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-300">⏱</span>
                        <span>TechCorp Agency</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <span className="text-xs bg-blue-100 text-blue-700 px-1.5 rounded font-semibold">AGENCY ADMIN</span>
                        <span className="text-xs text-gray-400">Awaiting confirmation</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-sm font-medium text-gray-700">Agenda: {purpose || "hjkkj"}</p>
                  <p className="text-xs text-gray-400">Topics: {topics.filter(Boolean).length} items</p>
                </div>
                <div className="mt-3 pt-3 border-t border-gray-200">
                  <p className="text-xs text-gray-500 font-medium mb-1">Once sent:</p>
                  <ul className="text-xs text-gray-500 space-y-0.5">
                    <li>• Meeting request posted in ProjectStream</li>
                    <li>• All participants notified with agenda</li>
                    <li>• Pending until other party confirms</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100">
          {step > 1 ? (
            <button onClick={() => setStep(step - 1)} className="text-sm text-gray-500 hover:text-gray-700">
              ← Back
            </button>
          ) : (
            <div />
          )}
          <div className="flex items-center gap-2">
            <button onClick={onClose} className="text-sm text-gray-500 hover:text-gray-700 px-3 py-2">
              Cancel
            </button>
            {step < STEPS ? (
              <button
                onClick={() => setStep(step + 1)}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
              >
                Next →
              </button>
            ) : (
              <button
                onClick={onClose}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-medium"
              >
                Send Meeting Request →
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── MAIN ──────────────────────────────────────────────────────────────────────
export default function MeetingsView() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-6">
      {showModal && <ScheduleModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span>📅</span> Meetings
        </h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-xl text-sm font-semibold"
        >
          + Schedule New Meeting
        </button>
      </div>

      {/* Upcoming */}
      <div className="mb-8">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">UPCOMING</p>
        <div className="space-y-3">
          {MEETINGS_DATA.upcoming.map((m) => (
            <div key={m.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    {m.icon} {m.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">{m.date}</p>
                  <p className="text-xs text-gray-400">{m.participants}</p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.statusColor}`}>{m.status === "Confirmed" ? "✓ " : ""}{m.status}</span>
              </div>
              <div className="flex items-center gap-2 mt-3 flex-wrap">
                {m.actions.map((a) => (
                  <button
                    key={a}
                    className={`text-xs px-3 py-1.5 rounded-lg border font-medium ${
                      a === "Join"
                        ? "bg-green-500 text-white border-green-500 hover:bg-green-600"
                        : a === "Cancel"
                        ? "text-red-500 border-red-200 hover:bg-red-50"
                        : "text-gray-600 border-gray-200 hover:bg-gray-50"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Past Meetings */}
      <div>
        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">PAST MEETINGS</p>
        <div className="space-y-3">
          {MEETINGS_DATA.past.map((m) => (
            <div key={m.id} className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-sm text-gray-800">
                    {m.icon} {m.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-0.5">
                    Duration: {m.duration} · Participants: {m.participants} · Summary: {m.summary}
                  </p>
                </div>
                <span className={`text-xs font-semibold px-2 py-1 rounded-full ${m.statusColor}`}>✓ {m.status}</span>
              </div>
              <div className="flex items-center gap-2 mt-3">
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  📄 View Summary
                </button>
                <button className="text-xs px-3 py-1.5 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">
                  ⬇ Download PDF
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}