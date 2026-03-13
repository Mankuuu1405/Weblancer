import { useState } from "react";

// ── Support Data ───────────────────────────────────────
const supportTickets = [
  {
    id: 1,
    icon: "💰",
    title: "Payment or escrow issue",
    ticketNo: "#SUP-20260212-0891",
    date: "Feb 12, 2026",
    time: "10:00 AM",
    priority: "High",
    status: "Resolved",
    body: "Milestone 1 payment was approved 3 days ago but has not appeared in my account yet. Need confirmation on payment processing timeline.",
    reply: {
      from: "Platform Support",
      time: "Feb 12, 2:30 PM",
      text: "Hi John, we have reviewed your case. The payment release for Milestone 1 is currently processing. It will appear in the agency account within 24 business hours. No action needed on your end. If not resolved by Feb 14, please reply here.",
    },
    resolvedOn: "Feb 14, 2026",
  },
  {
    id: 2,
    icon: "📋",
    title: "Contract or scope question",
    ticketNo: "#SUP-20260318-1042",
    date: "Mar 18, 2026",
    time: "3:00 PM",
    priority: "Normal",
    status: "Open",
    body: "Need clarification on whether the restaurant management dashboard is within the original scope or requires a separate agreement.",
    reply: null,
    resolvedOn: null,
  },
];

// ── Icons ──────────────────────────────────────────────
const IconHistory = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
  </svg>
);
const IconPhone = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.61 3.18 2 2 0 0 1 3.6 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.6a16 16 0 0 0 6 6l.96-.96a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
  </svg>
);
const IconPlus = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);
const IconShield = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="#3b82f6" stroke="#3b82f6" strokeWidth="1">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// ── Priority Badge ─────────────────────────────────────
function PriorityBadge({ priority }) {
  if (priority === "High") {
    return (
      <span className="inline-flex items-center gap-1 bg-orange-400 text-white text-xs font-bold px-2.5 py-1 rounded-full">
        🔴 High
      </span>
    );
  }
  return (
    <span className="inline-flex items-center border border-gray-300 text-gray-600 text-xs font-medium px-2.5 py-1 rounded-full bg-white">
      Normal
    </span>
  );
}

// ── Status Badge ───────────────────────────────────────
function StatusBadge({ status }) {
  if (status === "Resolved") {
    return (
      <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
        ✓ Resolved
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 border border-yellow-400 text-yellow-500 text-xs font-bold px-2.5 py-1 rounded-full bg-white">
      ⏳ Open
    </span>
  );
}

// ── Ticket Card ────────────────────────────────────────
function TicketCard({ ticket }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 shadow-sm">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3 flex-wrap">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-base">{ticket.icon}</span>
            <span className="text-sm font-bold text-gray-900">{ticket.title}</span>
          </div>
          <p className="text-xs text-gray-400">
            {ticket.ticketNo} · {ticket.date} · {ticket.time}
          </p>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <PriorityBadge priority={ticket.priority} />
          <StatusBadge status={ticket.status} />
        </div>
      </div>

      {/* Body */}
      <p className="text-sm text-gray-600 mt-3 leading-relaxed">{ticket.body}</p>

      {/* Platform Support Reply */}
      {ticket.reply && (
        <div className="mt-3 bg-red-50 border-l-4 border-red-400 rounded-r-lg px-4 py-3">
          <p className="text-xs font-bold text-blue-600 flex items-center gap-1.5 mb-1.5">
            <IconShield />
            Platform Support · {ticket.reply.time}
          </p>
          <p className="text-sm text-gray-700 leading-relaxed">{ticket.reply.text}</p>
        </div>
      )}

      {/* Resolved note */}
      {ticket.resolvedOn && (
        <p className="text-xs text-green-600 font-semibold mt-3">
          Resolved on {ticket.resolvedOn}
        </p>
      )}

      {/* Reply input for open tickets */}
      {ticket.status === "Open" && (
        <div className="mt-4">
          <textarea
            rows={2}
            placeholder="Write a reply..."
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none bg-gray-50"
          />
          <div className="flex justify-end mt-2">
            <button className="bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold px-4 py-1.5 rounded-lg transition-colors">
              Send Reply
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ── SupportView Main ───────────────────────────────────
export default function SupportView() {
  const [showModal, setShowModal] = useState(false);
  const [showHistory, setShowHistory] = useState(false);

  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">

      {/* Header */}
      <div className="flex items-center justify-between px-3 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 flex-shrink-0 flex-wrap gap-2">
        <div className="flex items-center gap-2">
          <span className="text-xl">🎫</span>
          <h2 className="text-base font-bold text-gray-900">Support</h2>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => setShowHistory(true)}
            className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
          >
            <IconHistory /> History
          </button>
          <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-full px-4 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <IconPhone /> Request Call
          </button>
          <button
            onClick={() => setShowModal(true)}
            className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-full transition-colors shadow-sm"
          >
            <IconPlus /> New Support Request
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-3 md:space-y-4">
        {supportTickets.map((ticket) => (
          <TicketCard key={ticket.id} ticket={ticket} />
        ))}
        <div className="h-4" />
      </div>

      {/* New Support Request Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">New Support Request</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Issue Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                  <option>Payment or escrow issue</option>
                  <option>Contract or scope question</option>
                  <option>Technical problem</option>
                  <option>Dispute</option>
                  <option>Other</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Priority</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 bg-white">
                  <option>Normal</option>
                  <option>High</option>
                  <option>Urgent</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  placeholder="Describe your issue in detail..."
                  className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-300 resize-none"
                />
              </div>
            </div>
            <div className="flex justify-end gap-2 mt-5">
              <button onClick={() => setShowModal(false)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50 transition-colors">
                Cancel
              </button>
              <button onClick={() => setShowModal(false)} className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg px-4 py-2 text-sm font-semibold transition-colors">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      )}

      {/* History Modal */}
      {showHistory && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-base font-bold text-gray-900">Support History</h3>
              <button onClick={() => setShowHistory(false)} className="text-gray-400 hover:text-gray-600 text-xl font-bold">✕</button>
            </div>
            <div className="space-y-3">
              {supportTickets.filter(t => t.status === "Resolved").map(t => (
                <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-100">
                  <div>
                    <p className="text-sm font-medium text-gray-800">{t.title}</p>
                    <p className="text-xs text-gray-400">{t.ticketNo} · {t.date}</p>
                  </div>
                  <span className="text-xs text-green-600 font-semibold">Resolved</span>
                </div>
              ))}
              {supportTickets.filter(t => t.status === "Resolved").length === 0 && (
                <p className="text-sm text-gray-400 text-center py-4">No resolved tickets yet.</p>
              )}
            </div>
            <div className="flex justify-end mt-4">
              <button onClick={() => setShowHistory(false)} className="border border-gray-200 rounded-lg px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-50">Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}