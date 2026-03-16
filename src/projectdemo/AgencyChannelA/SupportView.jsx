import { useState } from "react";
import { SUPPORT_DATA } from "./ProjectData";

const SUPPORT_CATEGORIES = [
  { icon: "💰", label: "Payment or escrow issue" },
  { icon: "📦", label: "Dispute about deliverables" },
  { icon: "👤", label: "Issue with the other party" },
  { icon: "⚙️", label: "Platform / technical issue" },
  { icon: "📋", label: "Contract or scope question" },
  { icon: "📅", label: "Deadline or timeline concern" },
  { icon: "❓", label: "General question" },
];

function NewSupportForm({ onClose }) {
  const [selected, setSelected] = useState(null);

  return (
    <div className="bg-white border border-gray-100 rounded-2xl p-4 md:p-6 shadow-sm mb-6">
      <p className="font-semibold text-gray-800 mb-4">What do you need help with?</p>
      <div className="space-y-2 mb-6">
        {SUPPORT_CATEGORIES.map((c) => (
          <label
            key={c.label}
            className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-colors ${
              selected === c.label ? "border-green-400 bg-green-50" : "border-gray-100 hover:bg-gray-50"
            }`}
          >
            <input
              type="radio"
              name="supportCat"
              checked={selected === c.label}
              onChange={() => setSelected(c.label)}
              className="accent-green-500 shrink-0"
            />
            <span className="text-sm">{c.icon} {c.label}</span>
          </label>
        ))}
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">Brief description:</label>
        <textarea
          placeholder="Describe your issue..."
          className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-green-400"
          rows={4}
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-6">
        <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
          📁 From project files
        </button>
        <button className="flex items-center gap-1 text-sm text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
          📸 Screenshot
        </button>
      </div>

      <div className="flex items-center gap-3">
        <button
          onClick={onClose}
          className="flex-1 text-sm text-gray-500 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
        >
          Cancel
        </button>
        <button className="flex-1 bg-green-500 hover:bg-green-600 text-white rounded-xl py-2.5 text-sm font-semibold">
          Submit Request
        </button>
      </div>
    </div>
  );
}

export default function SupportView() {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">

      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800 flex items-center gap-2">
          🎧 Support
        </h2>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 whitespace-nowrap">
            📋 <span>History</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 whitespace-nowrap">
            📞 <span>Call</span>
          </button>
          <button
            onClick={() => setShowForm(!showForm)}
            className="bg-green-500 hover:bg-green-600 text-white px-3 py-2 rounded-xl text-xs font-semibold whitespace-nowrap"
          >
            + New
          </button>
        </div>
      </div>

      {/* New form */}
      {showForm && <NewSupportForm onClose={() => setShowForm(false)} />}

      {/* Existing tickets */}
      <div className="space-y-4">
        {SUPPORT_DATA.map((ticket) => (
          <div key={ticket.id} className="bg-white border border-gray-100 rounded-2xl p-4 md:p-5 shadow-sm">
            {/* Ticket header */}
            <div className="flex items-start justify-between gap-2 mb-3">
              <div className="min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <p className="font-semibold text-gray-800 text-sm">💰 {ticket.title}</p>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${ticket.priorityColor}`}>
                    {ticket.priority}
                  </span>
                  <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${ticket.statusColor}`}>
                    {ticket.status === "Resolved" ? "✓ " : "⏱ "}{ticket.status}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-1 break-words">{ticket.id} · {ticket.date}</p>
              </div>
            </div>

            <p className="text-sm text-gray-600 mb-3">{ticket.description}</p>

            {/* Response */}
            {ticket.response && (
              <div className="border-l-4 border-red-300 bg-red-50 rounded-r-xl p-3 mb-3">
                <div className="flex items-center gap-2 flex-wrap mb-1">
                  <span className="text-xs font-bold text-red-600">🔵 {ticket.response.by}</span>
                  <span className="text-xs text-red-400 bg-red-100 px-1.5 py-0.5 rounded font-medium">SUPPORT</span>
                  <span className="text-xs text-gray-400">{ticket.response.date}</span>
                </div>
                <p className="text-sm text-gray-700">{ticket.response.content}</p>
                {ticket.response.resolvedOn && (
                  <p className="text-xs text-green-600 mt-2 font-medium">Resolved on {ticket.response.resolvedOn}</p>
                )}
                <p className="text-xs text-gray-400 mt-1">Seen by: Client ✓ · Agency Admin ✓</p>
              </div>
            )}

            {!ticket.response && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                <p className="text-xs text-yellow-700">
                  ⏱ This ticket is visible to all project participants. Admin response expected within 4 hours.
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}