import { useState } from "react";

const dummyTickets = [
  {
    id: "SUP-20260310-0891",
    title: "Team member access issue",
    category: "Team & Access",
    description: "Dev Mike is unable to access the project files section. Getting a 403 error since yesterday.",
    urgency: "high",
    status: "resolved",
    createdAt: "Mar 10, 2026 · 10:00 AM",
    resolvedAt: "Mar 11, 2026",
    by: "Raj Kumar",
    document: null,
    adminReply: {
      by: "Platform Support",
      at: "Mar 10, 2026 · 2:30 PM",
      message: "Hi Raj, we have reviewed Dev Mike's access permissions. The issue was a role mismatch after a recent system update. It has been corrected. Dev Mike should now have full access to project files. Please confirm.",
    },
  },
  {
    id: "SUP-20260312-1042",
    title: "Contract or scope question",
    category: "Contract & Scope",
    description: "Need clarification on whether the restaurant management dashboard is within the original scope or requires a separate agreement.",
    urgency: "normal",
    status: "open",
    createdAt: "Mar 12, 2026 · 3:00 PM",
    resolvedAt: null,
    by: "Raj Kumar",
    document: null,
    adminReply: null,
  },
  {
    id: "SUP-20260313-1150",
    title: "Milestone deadline extension request",
    category: "Milestone & Deadline",
    description: "Requesting a 3-day extension on Milestone 2 due to API integration complexity. Team needs until March 18 instead of March 15.",
    urgency: "emergency",
    status: "under_review",
    createdAt: "Mar 13, 2026 · 11:50 AM",
    resolvedAt: null,
    by: "Raj Kumar",
    document: null,
    adminReply: null,
  },
];

const categories = [
  "Team & Access",
  "Contract & Scope",
  "Milestone & Deadline",
  "Payment Issue",
  "Technical Problem",
  "Policy Clarification",
  "Other",
];

const callTypes = ["Video Call", "Audio Call", "Screen Share Session"];

const urgencyConfig = {
  normal: { label: "Normal", bg: "bg-gray-100 text-gray-600 border-gray-200" },
  high: { label: "High", bg: "bg-orange-100 text-orange-600 border-orange-200" },
  emergency: { label: "Emergency", bg: "bg-red-100 text-red-600 border-red-200" },
};

const statusConfig = {
  open: { label: "Open", bg: "bg-amber-50 text-amber-600 border-amber-200" },
  under_review: { label: "Under Review", bg: "bg-blue-50 text-blue-600 border-blue-200" },
  resolved: { label: "Resolved", bg: "bg-green-100 text-green-700 border-green-200" },
  closed: { label: "Closed", bg: "bg-gray-100 text-gray-500 border-gray-200" },
};

export default function SupportView() {
  const [tickets, setTickets] = useState(dummyTickets);
  const [activeTab, setActiveTab] = useState("active");
  const [showNewRequest, setShowNewRequest] = useState(false);
  const [showRequestCall, setShowRequestCall] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [expandedTicket, setExpandedTicket] = useState(null);

  const activeTickets = tickets.filter((t) => t.status !== "resolved" && t.status !== "closed");
  const historyTickets = tickets.filter((t) => t.status === "resolved" || t.status === "closed");

  const handleNewRequest = (data) => {
    const newTicket = {
      id: `SUP-${Date.now()}`,
      ...data,
      status: "open",
      createdAt: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      resolvedAt: null,
      by: "Raj Kumar",
      adminReply: null,
    };
    setTickets((prev) => [newTicket, ...prev]);
    setShowNewRequest(false);
  };

  const tabs = [
    { id: "active", label: "Active", count: activeTickets.length },
    { id: "resolved", label: "Resolved", count: historyTickets.length },
  ];

  const displayTickets = activeTab === "active" ? activeTickets : historyTickets;

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">🎫</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Support</p>
            <p className="text-xs text-gray-400">{activeTickets.length} active · {historyTickets.length} resolved</p>
          </div>
        </div>

        <button
          onClick={() => setShowHistory(true)}
          className="flex items-center gap-1.5 text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          History
        </button>

        <button
          onClick={() => setShowRequestCall(true)}
          className="flex items-center gap-1.5 text-sm border border-gray-200 text-gray-600 px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
          Request Call
        </button>

        <button
          onClick={() => setShowNewRequest(true)}
          className="flex items-center gap-2 text-sm px-4 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          New Support Request
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-gray-100 bg-white px-6 shrink-0">
        {tabs.map((tab) => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-1.5 px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id ? "border-green-600 text-green-700" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}>
            {tab.label}
            <span className={`text-xs px-1.5 py-0.5 rounded-full font-medium ${
              activeTab === tab.id ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
            }`}>{tab.count}</span>
          </button>
        ))}
      </div>

      {/* Tickets list */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-3">
        {displayTickets.length === 0 ? (
          <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-8 text-center">
            <p className="text-sm text-gray-500">No {activeTab} tickets</p>
            <p className="text-xs text-gray-400 mt-1">
              {activeTab === "active" ? "All issues resolved!" : "No resolved tickets yet"}
            </p>
          </div>
        ) : (
          displayTickets.map((ticket) => (
            <TicketCard
              key={ticket.id}
              ticket={ticket}
              isExpanded={expandedTicket === ticket.id}
              onToggle={() => setExpandedTicket(expandedTicket === ticket.id ? null : ticket.id)}
            />
          ))
        )}
      </div>

      {/* Modals */}
      {showNewRequest && <NewRequestModal onClose={() => setShowNewRequest(false)} onSubmit={handleNewRequest} />}
      {showRequestCall && <RequestCallModal onClose={() => setShowRequestCall(false)} />}
      {showHistory && <HistoryModal tickets={historyTickets} onClose={() => setShowHistory(false)} />}
    </div>
  );
}

// ── Ticket Card ────────────────────────────────────────────────
function TicketCard({ ticket, isExpanded, onToggle }) {
  const urgency = urgencyConfig[ticket.urgency] || urgencyConfig.normal;
  const status = statusConfig[ticket.status] || statusConfig.open;

  return (
    <div className={`bg-white border rounded-xl overflow-hidden transition-all ${
      ticket.urgency === "emergency" ? "border-red-200" :
      ticket.urgency === "high" ? "border-orange-200" : "border-gray-100"
    }`}>
      {/* Top */}
      <div className="px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors" onClick={onToggle}>
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap mb-1">
              <span className="text-base">{getCategoryIcon(ticket.category)}</span>
              <p className="text-sm font-semibold text-gray-800">{ticket.title}</p>
            </div>
            <p className="text-xs text-gray-400">
              {ticket.id} · {ticket.createdAt}
            </p>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${urgency.bg}`}>
              {urgency.label}
            </span>
            <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${status.bg}`}>
              {status.label}
            </span>
            <svg className={`w-4 h-4 text-gray-400 transition-transform ${isExpanded ? "rotate-180" : ""}`}
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        <p className="text-sm text-gray-600 mt-2 leading-relaxed">{ticket.description}</p>

        {ticket.status === "resolved" && ticket.resolvedAt && (
          <p className="text-xs text-green-600 font-medium mt-2">✓ Resolved on {ticket.resolvedAt}</p>
        )}
      </div>

      {/* Expanded — Admin Reply */}
      {isExpanded && (
        <div className="border-t border-gray-100">
          {ticket.adminReply ? (
            <div className="px-4 py-3 bg-red-50 border-l-4 border-red-300">
              <p className="text-xs font-semibold text-red-600 mb-1">
                🛡️ {ticket.adminReply.by} · {ticket.adminReply.at}
              </p>
              <p className="text-sm text-gray-700 leading-relaxed">{ticket.adminReply.message}</p>
            </div>
          ) : (
            <div className="px-4 py-3 bg-gray-50">
              <p className="text-xs text-gray-400 italic">No admin response yet. We typically respond within 24 hours.</p>
            </div>
          )}

          {/* Ticket meta */}
          <div className="px-4 py-2.5 border-t border-gray-100 flex items-center gap-4 bg-white">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
              </svg>
              {ticket.category}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Raised by {ticket.by}
            </div>
            {ticket.document && (
              <div className="flex items-center gap-1.5 text-xs text-blue-600">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                </svg>
                {ticket.document}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

// ── New Support Request Modal ──────────────────────────────────
function NewRequestModal({ onClose, onSubmit }) {
  const [form, setForm] = useState({
    title: "", category: "", description: "", urgency: "normal", document: null,
  });
  const [step, setStep] = useState(1);

  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const isValid = form.title && form.category && form.description;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) update("document", file.name);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden max-h-[90vh] flex flex-col">

        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-800">New Support Request</p>
            <p className="text-xs text-gray-400">Step {step} of 2 — {step === 1 ? "Details" : "Review & Submit"}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        {/* Step bar */}
        <div className="flex px-5 pt-3 gap-2 shrink-0">
          {[1, 2].map((s) => (
            <div key={s} className={`flex-1 h-1 rounded-full ${s <= step ? "bg-green-500" : "bg-gray-200"}`} />
          ))}
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {step === 1 ? (
            <>
              {/* Title */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">What do you need help with? <span className="text-red-400">*</span></label>
                <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)}
                  placeholder="Brief title of your issue"
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 placeholder-gray-300" />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Category <span className="text-red-400">*</span></label>
                <select value={form.category} onChange={(e) => update("category", e.target.value)}
                  className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white">
                  <option value="">Select category</option>
                  {categories.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Brief Description <span className="text-red-400">*</span></label>
                <textarea value={form.description} onChange={(e) => update("description", e.target.value)}
                  placeholder="Describe your issue in detail. Include any relevant context, what you tried, and what you expected to happen..."
                  rows={5} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300" />
              </div>

              {/* Urgency */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-2">Urgency Level</label>
                <div className="flex gap-2">
                  {Object.entries(urgencyConfig).map(([key, val]) => (
                    <button key={key} onClick={() => update("urgency", key)}
                      className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                        form.urgency === key ? val.bg + " ring-2 ring-offset-1 ring-green-300" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                      }`}>
                      {key === "emergency" ? "🚨" : key === "high" ? "🔴" : "⚪"} {val.label}
                    </button>
                  ))}
                </div>
                {form.urgency === "emergency" && (
                  <p className="text-xs text-red-500 mt-1.5">⚠ Emergency tickets are escalated immediately to senior admins.</p>
                )}
              </div>

              {/* Upload Document */}
              <div>
                <label className="block text-xs font-medium text-gray-600 mb-1">Upload Document <span className="text-gray-400 font-normal">(optional)</span></label>
                <label className="flex items-center gap-3 border border-dashed border-gray-200 rounded-xl px-4 py-3 cursor-pointer hover:bg-gray-50 transition-colors">
                  <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
                  </svg>
                  <span className="text-sm text-gray-500">
                    {form.document ? <span className="text-green-600 font-medium">✓ {form.document}</span> : "Click to upload screenshot or document"}
                  </span>
                  <input type="file" className="hidden" onChange={handleFile} accept=".pdf,.png,.jpg,.jpeg,.doc,.docx" />
                </label>
              </div>
            </>
          ) : (
            /* Preview */
            <div className="space-y-4">
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-3">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-gray-800">{form.title}</p>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${urgencyConfig[form.urgency]?.bg}`}>
                    {urgencyConfig[form.urgency]?.label}
                  </span>
                </div>
                <div><span className="text-xs text-gray-400">Category</span><p className="text-sm text-gray-700 mt-0.5">{form.category}</p></div>
                <div><span className="text-xs text-gray-400">Description</span><p className="text-sm text-gray-700 mt-0.5 leading-relaxed">{form.description}</p></div>
                {form.document && <div><span className="text-xs text-gray-400">Attachment</span><p className="text-sm text-blue-600 mt-0.5">📎 {form.document}</p></div>}
              </div>
              <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-3">
                <p className="text-xs text-amber-700 font-medium mb-0.5">A ticket will be generated</p>
                <p className="text-xs text-amber-600">A unique ticket ID will be assigned. Platform Admin typically responds within 24 hours.</p>
              </div>
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
              Review →
            </button>
          ) : (
            <button onClick={() => onSubmit(form)}
              className="text-sm px-4 py-2 rounded-lg font-medium bg-green-600 text-white hover:bg-green-700">
              Submit Support Request ✓
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Request Call Modal ─────────────────────────────────────────
function RequestCallModal({ onClose }) {
  const [form, setForm] = useState({ callType: "", preferredDate: "", preferredTime: "", agenda: "", notes: "" });
  const [submitted, setSubmitted] = useState(false);
  const update = (key, val) => setForm((prev) => ({ ...prev, [key]: val }));
  const isValid = form.callType && form.preferredDate && form.preferredTime && form.agenda;

  if (submitted) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
        <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm mx-4 p-8 text-center">
          <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <p className="text-sm font-semibold text-gray-800 mb-1">Call Request Submitted!</p>
          <p className="text-xs text-gray-400 mb-5">Platform Admin will confirm your {form.callType} request within 24 hours.</p>
          <button onClick={onClose} className="text-sm px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-medium">Done</button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-800">Request a Call</p>
            <p className="text-xs text-gray-400">Schedule a call with Platform Support</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {/* Call Type */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-2">Call Type <span className="text-red-400">*</span></label>
            <div className="flex gap-2">
              {callTypes.map((type) => (
                <button key={type} onClick={() => update("callType", type)}
                  className={`flex-1 py-2 text-xs font-medium rounded-lg border transition-all ${
                    form.callType === type ? "bg-green-50 text-green-700 border-green-300" : "border-gray-200 text-gray-500 hover:bg-gray-50"
                  }`}>
                  {type === "Video Call" ? "📹" : type === "Audio Call" ? "📞" : "🖥️"} {type}
                </button>
              ))}
            </div>
          </div>

          {/* Preferred Date + Time */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Preferred Date <span className="text-red-400">*</span></label>
              <input type="date" value={form.preferredDate} onChange={(e) => update("preferredDate", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Preferred Time <span className="text-red-400">*</span></label>
              <input type="time" value={form.preferredTime} onChange={(e) => update("preferredTime", e.target.value)}
                className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300" />
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Agenda for Call <span className="text-red-400">*</span></label>
            <textarea value={form.agenda} onChange={(e) => update("agenda", e.target.value)}
              placeholder="What would you like to discuss in this call?"
              rows={3} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300" />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Additional Notes <span className="text-gray-400 font-normal">(optional)</span></label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)}
              placeholder="Any context or documents to share before the call..."
              rows={2} className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300" />
          </div>

          <div className="bg-blue-50 border border-blue-100 rounded-xl px-4 py-3">
            <p className="text-xs text-blue-600">Platform Support will confirm availability and send you a meeting link within 24 hours.</p>
          </div>
        </div>

        <div className="px-5 py-3 border-t border-gray-100 flex justify-end gap-2 shrink-0">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button onClick={() => setSubmitted(true)} disabled={!isValid}
            className={`text-sm px-4 py-2 rounded-lg font-medium ${isValid ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"}`}>
            Submit Request
          </button>
        </div>
      </div>
    </div>
  );
}

// ── History Modal ──────────────────────────────────────────────
function HistoryModal({ tickets, onClose }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-lg mx-4 overflow-hidden max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100 shrink-0">
          <div>
            <p className="text-sm font-semibold text-gray-800">Support History</p>
            <p className="text-xs text-gray-400">{tickets.length} resolved tickets</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-3">
          {tickets.length === 0 ? (
            <p className="text-sm text-gray-400 text-center py-8">No resolved tickets yet</p>
          ) : tickets.map((t) => (
            <div key={t.id} className="border border-gray-100 rounded-xl px-4 py-3">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium text-gray-800">{t.title}</p>
                <span className="text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium shrink-0">Resolved</span>
              </div>
              <p className="text-xs text-gray-400 mt-1">{t.id} · {t.createdAt}</p>
              <p className="text-xs text-green-600 mt-0.5">✓ Resolved on {t.resolvedAt}</p>
            </div>
          ))}
        </div>
        <div className="px-5 pb-4 flex justify-end">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Close</button>
        </div>
      </div>
    </div>
  );
}

function getCategoryIcon(category) {
  const map = {
    "Team & Access": "👥", "Contract & Scope": "📋", "Milestone & Deadline": "🏁",
    "Payment Issue": "💳", "Technical Problem": "⚙️", "Policy Clarification": "📜", "Other": "💬",
  };
  return map[category] || "🎫";
}