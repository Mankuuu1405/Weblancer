import { useState } from "react";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};
const FONT = "'Poppins', sans-serif";

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

// Reusable Styles
const badgeSty = { display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, padding: "4px 12px", borderRadius: 99 };
const statusBadge = {
  confirmed:   <span style={{ ...badgeSty, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}` }}>✓ Confirmed</span>,
  pending:     <span style={{ ...badgeSty, background: G.amberBg, color: "#92400e", border: `1px solid ${G.amberBorder}` }}>⏳ Pending</span>,
  rescheduled: <span style={{ ...badgeSty, background: G.blueBg, color: G.blue, border: `1px solid ${G.blueBorder}` }}>↻ Rescheduled</span>,
  completed:   <span style={{ ...badgeSty, background: G.bg, color: G.sub, border: `1px solid ${G.border}` }}>✓ Completed</span>,
  cancelled:   <span style={{ ...badgeSty, background: G.redBg, color: "#dc2626", border: `1px solid ${G.redBorder}` }}>✕ Cancelled</span>,
};

const actionBtnSty = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, fontFamily: FONT, background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}`, padding: "6px 14px", borderRadius: 8, cursor: "pointer" };
const labelSty = { fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 };
const inputSty = { width: "100%", border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "9px 14px", fontSize: 13, fontFamily: FONT, color: G.text, background: G.white, outline: "none", boxSizing: "border-box" };
const pillBtn = (primary = false, disabled = false) => ({
  display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT, padding: "7px 18px", borderRadius: 100, cursor: disabled ? "not-allowed" : "pointer",
  ...(primary ? { background: disabled ? G.border : G.gradNavy, color: disabled ? G.muted : G.white, border: "none", boxShadow: disabled ? "none" : "0 3px 12px rgba(15,26,59,0.25)" } : { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` }),
});

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
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: G.bg, fontFamily: FONT }}>
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} textarea{resize:none;} ::-webkit-scrollbar {width: 6px;} ::-webkit-scrollbar-thumb {background: #d4edbb; border-radius: 10px;}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyItems: "space-between", padding: "14px 20px", background: G.white, borderBottom: `1px solid ${G.greenBorder}`, flexShrink: 0, gap: 10, boxShadow: "0 2px 8px rgba(110,192,48,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1 }}>
          <span style={{ fontSize: 20 }}>📅</span>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 800, color: G.text, margin: 0 }}>Meetings</h2>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>
              {meetings.upcoming.length} upcoming · {meetings.past.length} past · {meetings.cancelled.length} cancelled
            </p>
          </div>
        </div>
        <button onClick={() => setShowSchedule(true)} style={pillBtn(true)}>
          <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" />
          </svg>
          Schedule Meeting
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", background: G.white, borderBottom: `1px solid ${G.greenBorder}`, padding: "0 20px", flexShrink: 0 }}>
        {tabs.map((tab) => {
          const active = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex", alignItems: "center", gap: 8, padding: "12px 16px",
                background: "none", border: "none", borderBottom: `2px solid ${active ? G.greenDeep : "transparent"}`,
                color: active ? G.greenDeep : G.sub, fontWeight: active ? 700 : 600, fontSize: 13, cursor: "pointer",
                transition: "all 0.2s"
              }}
            >
              {tab.label}
              <span style={{ 
                background: active ? G.greenBg : G.bg, color: active ? G.greenDeep : G.muted, 
                padding: "2px 8px", borderRadius: 100, fontSize: 10, fontWeight: 800 
              }}>
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20 }}>

        {/* Upcoming Tab */}
        {activeTab === "upcoming" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {meetings.upcoming.length === 0 ? (
              <div style={{ background: G.white, border: `1px dashed ${G.greenBorder}`, borderRadius: 14, padding: "32px", textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: G.sub, margin: 0 }}>No upcoming meetings</p>
                <p style={{ fontSize: 11, color: G.muted, margin: "4px 0 0" }}>Schedule one using the button above</p>
              </div>
            ) : meetings.upcoming.map((m) => (
              <div key={m.id} style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 14, padding: "16px 20px", boxShadow: "0 2px 8px rgba(110,192,48,0.04)" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 10, marginBottom: 6 }}>
                      <span style={{ fontSize: 18, marginTop: -2 }}>{getPurposeIcon(m.purpose)}</span>
                      <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0, lineHeight: 1.3 }}>{m.title}</p>
                    </div>
                    <p style={{ fontSize: 12, color: G.sub, margin: "0 0 2px 34px", fontWeight: 500 }}>{m.date} · {m.time} · {m.duration} min</p>
                    <p style={{ fontSize: 11, color: G.muted, margin: "0 0 0 34px" }}>Participants: {m.participants.join(" · ")}</p>

                    {m.history && m.history.length > 0 && (
                      <div style={{ margin: "10px 0 0 34px", display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: G.blue, background: G.blueBg, border: `1px solid ${G.blueBorder}`, padding: "4px 10px", borderRadius: 8 }}>
                        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                        </svg>
                        Rescheduled {m.history.length} time{m.history.length > 1 ? "s" : ""} — {m.history[m.history.length - 1].reason}
                      </div>
                    )}
                  </div>
                  <div>{statusBadge[m.status]}</div>
                </div>

                {/* Actions */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 16, flexWrap: "wrap" }}>
                  {m.status === "confirmed" && (
                    <button style={{ ...actionBtnSty, background: G.greenDeep, color: G.white, border: "none" }}>
                      Join
                    </button>
                  )}
                  <button onClick={() => setShowAgenda(m)} style={actionBtnSty}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" /></svg>
                    Agenda
                  </button>
                  <button onClick={() => setEditMeeting(m)} style={actionBtnSty}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                    Reschedule
                  </button>
                  <button onClick={() => setShowCancelModal(m)} style={{ ...actionBtnSty, color: "#dc2626", borderColor: G.redBorder, background: G.redBg }}>
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Past Tab */}
        {activeTab === "past" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {meetings.past.map((m) => (
              <div key={m.id} style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 20px" }}>
                <div style={{ display: "flex", alignItems: "flex-start", justifyItems: "space-between", gap: 12 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>{m.title}</p>
                    <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>
                      Duration: {m.duration} min · Participants: {m.participants.length} · Summary: Posted ✓
                    </p>
                  </div>
                  <div>{statusBadge[m.status]}</div>
                </div>
                <div style={{ display: "flex", gap: 8, marginTop: 14 }}>
                  <button onClick={() => setShowSummary(m)} style={actionBtnSty}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    View Summary
                  </button>
                  <button onClick={() => handleDownloadPDF(m)} style={actionBtnSty}>
                    <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Download PDF
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Cancelled Tab */}
        {activeTab === "cancelled" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {meetings.cancelled.length === 0 ? (
              <div style={{ background: G.white, border: `1px dashed ${G.greenBorder}`, borderRadius: 14, padding: "32px", textAlign: "center" }}>
                <p style={{ fontSize: 13, fontWeight: 600, color: G.sub, margin: 0 }}>No cancelled meetings</p>
              </div>
            ) : (
              <>
                <div style={{ display: "flex", alignItems: "center", gap: 8, background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 10, padding: "10px 16px", marginBottom: 8 }}>
                  <svg width="16" height="16" fill="currentColor" color="#dc2626" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <p style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", margin: 0 }}>Cancelled meetings are kept for audit purposes and cannot be deleted.</p>
                </div>

                {meetings.cancelled.map((m) => (
                  <div key={m.id} style={{ background: G.white, border: `1px solid ${G.redBorder}`, borderRadius: 14, padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>{m.title}</p>
                        <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>Was scheduled: {m.originalDate} · {m.originalTime}</p>
                        <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0" }}>Participants: {m.participants.join(", ")}</p>
                      </div>
                      <div>{statusBadge["cancelled"]}</div>
                    </div>

                    <div style={{ marginTop: 14, background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 10, padding: "10px 14px" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 4 }}>
                        <svg width="12" height="12" fill="currentColor" color="#dc2626" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        <p style={{ fontSize: 11, fontWeight: 700, color: "#dc2626", margin: 0 }}>Cancelled by {m.cancelledBy} on {m.cancelledAt}</p>
                      </div>
                      <p style={{ fontSize: 12, color: G.sub, fontStyle: "italic", margin: "0 0 0 18px" }}>"{m.reason}"</p>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        )}
      </div>

      {/* Modals */}
      {showSchedule && <ScheduleMeetingModal participants={participants} onClose={() => setShowSchedule(false)} onSchedule={handleSchedule} />}
      {editMeeting && <ScheduleMeetingModal participants={participants} onClose={() => setEditMeeting(null)} onSchedule={handleEdit} existing={editMeeting} />}
      {showAgenda && <AgendaModal meeting={showAgenda} onClose={() => setShowAgenda(null)} />}
      {showSummary && <SummaryModal meeting={showSummary} onClose={() => setShowSummary(null)} />}
      {showCancelModal && <CancelModal meeting={showCancelModal} onClose={() => setShowCancelModal(null)} onConfirm={handleCancel} />}
    </div>
  );
}

// ── Modals Wrapper ─────────────────────────────────────────

function ModalShell({ title, subtitle, maxWidth = 440, onClose, children, footer }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,26,59,0.35)", padding: 16 }}>
      <div style={{ background: G.white, borderRadius: 20, width: "100%", maxWidth, display: "flex", flexDirection: "column", maxHeight: "90vh", overflow: "hidden", boxShadow: "0 8px 40px rgba(15,26,59,0.18)" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg, display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 800, color: G.greenDeep, display: "block" }}>{title}</span>
            {subtitle && <span style={{ fontSize: 11, color: G.sub, fontWeight: 500 }}>{subtitle}</span>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: G.muted, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: 20, overflowY: "auto", flex: 1 }}>{children}</div>
        {footer && <div style={{ padding: "16px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.bg, display: "flex", justifyContent: "flex-end", gap: 10, flexShrink: 0 }}>{footer}</div>}
      </div>
    </div>
  );
}

// ── Cancel Confirmation Modal ──────────────────────────────────
function CancelModal({ meeting, onClose, onConfirm }) {
  const [reason, setReason] = useState("");
  return (
    <ModalShell title="Cancel Meeting" subtitle={meeting.title} onClose={onClose} footer={
      <>
        <button onClick={onClose} style={pillBtn()}>Keep Meeting</button>
        <button onClick={() => onConfirm(meeting, reason)} style={{ ...pillBtn(true), background: G.red, boxShadow: "none" }}>Yes, Cancel</button>
      </>
    }>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: "10px 14px", display: "flex", gap: 8 }}>
          <span style={{ fontSize: 16 }}>⚠️</span>
          <p style={{ fontSize: 11, fontWeight: 700, color: "#92400e", margin: 0 }}>This will be permanently recorded in the cancelled meetings log.</p>
        </div>
        <div>
          <label style={labelSty}>Reason for cancellation</label>
          <textarea
            value={reason} onChange={(e) => setReason(e.target.value)}
            placeholder="Why is this meeting being cancelled?"
            rows={3} style={inputSty}
          />
        </div>
      </div>
    </ModalShell>
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
    participants: prev.participants.includes(name) ? prev.participants.filter((p) => p !== name) : [...prev.participants, name],
  }));

  const isValid = form.title && form.purpose && form.date && form.time && form.participants.length > 0 && (!isEdit || rescheduleReason.trim());

  return (
    <ModalShell 
      title={isEdit ? "Reschedule Meeting" : "Schedule New Meeting"} 
      subtitle={`Step ${step} of 2 — ${step === 1 ? "Meeting Details" : "Preview & Confirm"}`} 
      maxWidth={500} 
      onClose={onClose}
      footer={
        <>
          <button onClick={step === 1 ? onClose : () => setStep(1)} style={pillBtn()}>{step === 1 ? "Cancel" : "Back"}</button>
          {step === 1 ? (
            <button onClick={() => setStep(2)} disabled={!isValid} style={pillBtn(true, !isValid)}>Preview →</button>
          ) : (
            <button onClick={() => onSchedule({ ...form, id: existing?.id, rescheduleReason })} style={pillBtn(true)}>
              {isEdit ? "Save Changes ✓" : "Confirm & Schedule ✓"}
            </button>
          )}
        </>
      }
    >
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {[1, 2].map((s) => (
          <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? G.green : G.border }} />
        ))}
      </div>

      {step === 1 ? (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={labelSty}>Title <span style={{ color: G.red }}>*</span></label>
            <input type="text" value={form.title} onChange={(e) => update("title", e.target.value)} placeholder="e.g. Sprint Review — Milestone 2" style={inputSty} />
          </div>
          <div>
            <label style={labelSty}>Purpose <span style={{ color: G.red }}>*</span></label>
            <select value={form.purpose} onChange={(e) => update("purpose", e.target.value)} style={inputSty}>
              <option value="">Select purpose</option>
              {purposeOptions.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelSty}>Date <span style={{ color: G.red }}>*</span></label>
              <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} style={inputSty} />
            </div>
            <div>
              <label style={labelSty}>Time <span style={{ color: G.red }}>*</span></label>
              <input type="time" value={form.time} onChange={(e) => update("time", e.target.value)} style={inputSty} />
            </div>
          </div>
          <div>
            <label style={labelSty}>Duration</label>
            <select value={form.duration} onChange={(e) => update("duration", e.target.value)} style={inputSty}>
              {[15, 30, 45, 60, 90, 120].map((d) => <option key={d} value={d}>{d < 60 ? `${d} minutes` : `${d / 60} hour${d > 60 ? "s" : ""}`}</option>)}
            </select>
          </div>
          <div>
            <label style={labelSty}>Invite Members <span style={{ color: G.red }}>*</span></label>
            <div style={{ maxHeight: 130, overflowY: "auto", border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: 8, display: "flex", flexDirection: "column", gap: 4 }}>
              {(participants || []).map((p) => {
                const checked = form.participants.includes(p.name);
                return (
                  <label key={p.id || p.name} style={{ display: "flex", alignItems: "center", gap: 8, padding: "6px 10px", borderRadius: 8, cursor: "pointer", background: checked ? G.greenBg : "transparent" }}>
                    <input type="checkbox" checked={checked} onChange={() => toggleParticipant(p.name)} style={{ accentColor: G.greenDeep, width: 14, height: 14 }} />
                    <span style={{ fontSize: 13, fontWeight: 600, color: G.text, flex: 1 }}>{p.name}</span>
                    <span style={{ fontSize: 11, color: G.muted, textTransform: "capitalize" }}>{p.role?.replace("_", " ")}</span>
                  </label>
                )
              })}
            </div>
          </div>
          <div>
            <label style={labelSty}>Agenda / Topics to Discuss</label>
            <textarea value={form.agenda} onChange={(e) => update("agenda", e.target.value)} placeholder="1. Topic one&#10;2. Topic two" rows={3} style={inputSty} />
          </div>
          <div>
            <label style={labelSty}>Additional Notes <span style={{ color: G.muted, fontWeight: 500, textTransform: "none" }}>(optional)</span></label>
            <textarea value={form.notes} onChange={(e) => update("notes", e.target.value)} placeholder="Any preparation needed..." rows={2} style={inputSty} />
          </div>

          {isEdit && (
            <div style={{ background: G.blueBg, border: `1px solid ${G.blueBorder}`, borderRadius: 10, padding: 14, marginTop: 8 }}>
              <label style={{ ...labelSty, color: G.blue }}>Reason for Rescheduling <span style={{ color: G.red }}>*</span></label>
              <textarea
                value={rescheduleReason} onChange={(e) => setRescheduleReason(e.target.value)}
                placeholder="Why is this meeting being rescheduled?" rows={2}
                style={{ ...inputSty, borderColor: G.blueBorder }}
              />
              {!rescheduleReason.trim() && <p style={{ fontSize: 10, color: G.blue, margin: "4px 0 0", fontWeight: 700 }}>Required — this will be logged in meeting history.</p>}
            </div>
          )}
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 14, padding: 20 }}>
            <p style={{ fontSize: 16, fontWeight: 800, color: G.greenDeep, margin: "0 0 16px" }}>{form.title}</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
              <div><span style={labelSty}>Purpose</span><p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{form.purpose}</p></div>
              <div><span style={labelSty}>Duration</span><p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{form.duration} min</p></div>
              <div><span style={labelSty}>Date</span><p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{form.date}</p></div>
              <div><span style={labelSty}>Time</span><p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{form.time}</p></div>
            </div>
            <div style={{ marginBottom: 16 }}>
              <span style={labelSty}>Participants</span>
              <p style={{ fontSize: 13, fontWeight: 600, color: G.text, margin: 0 }}>{form.participants.join(", ")}</p>
            </div>
            {form.agenda && <div style={{ marginBottom: 16 }}><span style={labelSty}>Agenda</span><p style={{ fontSize: 13, color: G.text, margin: 0, whiteSpace: "pre-line" }}>{form.agenda}</p></div>}
            {form.notes && <div><span style={labelSty}>Notes</span><p style={{ fontSize: 13, color: G.sub, fontStyle: "italic", margin: 0 }}>{form.notes}</p></div>}
            {isEdit && rescheduleReason && (
              <div style={{ background: G.white, border: `1px solid ${G.blueBorder}`, borderRadius: 10, padding: "10px 14px", marginTop: 16 }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: G.blue, textTransform: "uppercase", letterSpacing: "0.06em" }}>↻ Reason for Rescheduling</span>
                <p style={{ fontSize: 12, color: G.sub, fontStyle: "italic", margin: "4px 0 0" }}>"{rescheduleReason}"</p>
              </div>
            )}
          </div>
          <p style={{ fontSize: 11, color: G.muted, textAlign: "center", fontWeight: 600 }}>All participants will be notified via platform notifications.</p>
        </div>
      )}
    </ModalShell>
  );
}

function AgendaModal({ meeting, onClose }) {
  return (
    <ModalShell title="Meeting Agenda" subtitle={`${meeting.date} · ${meeting.time}`} onClose={onClose} footer={<button onClick={onClose} style={pillBtn()}>Close</button>}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: G.text, margin: "0 0 4px" }}>{meeting.title}</p>
        <div><p style={labelSty}>Purpose</p><p style={{ fontSize: 13, color: G.text, margin: 0 }}>{meeting.purpose}</p></div>
        <div><p style={labelSty}>Participants</p><p style={{ fontSize: 13, color: G.text, margin: 0 }}>{meeting.participants.join(", ")}</p></div>
        {meeting.agenda && <div><p style={labelSty}>Agenda</p><p style={{ fontSize: 13, color: G.text, margin: 0, whiteSpace: "pre-line" }}>{meeting.agenda}</p></div>}
        {meeting.notes && (
          <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: 14, marginTop: 8 }}>
            <p style={{ fontSize: 11, fontWeight: 700, color: "#92400e", textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 4px" }}>Notes for participants</p>
            <p style={{ fontSize: 12, color: G.sub, fontStyle: "italic", margin: 0 }}>{meeting.notes}</p>
          </div>
        )}
      </div>
    </ModalShell>
  );
}

function SummaryModal({ meeting, onClose }) {
  return (
    <ModalShell title="Meeting Summary" subtitle={`${meeting.date} · ${meeting.duration} min`} onClose={onClose} footer={
      <>
        <button onClick={onClose} style={pillBtn()}>Close</button>
        <button onClick={() => handleDownloadPDF(meeting)} style={pillBtn(true)}>
          Download PDF
        </button>
      </>
    }>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <p style={{ fontSize: 16, fontWeight: 800, color: G.text, margin: 0 }}>{meeting.title}</p>
        <p style={{ fontSize: 12, color: G.muted, margin: 0, fontWeight: 500 }}>Participants: {meeting.participants.join(", ")}</p>
        <div style={{ background: G.bg, border: `1px solid ${G.border}`, borderRadius: 14, padding: 16 }}>
          <p style={{ fontSize: 13, color: G.text, lineHeight: 1.6, margin: 0 }}>{meeting.summary}</p>
        </div>
      </div>
    </ModalShell>
  );
}

function handleDownloadPDF(meeting) {
  const win = window.open("", "_blank");
  win.document.write(`<html><head><title>Summary — ${meeting.title}</title><style>body{font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;padding:32px;color:#111;}h2{font-size:18px;}p{font-size:13px;line-height:1.6;color:#444;}.box{background:#f9fafb;border:1px solid #e5e7eb;border-radius:12px;padding:20px;margin-top:16px;}</style></head><body><h2>${meeting.title}</h2><p><strong>Date:</strong> ${meeting.date} · <strong>Duration:</strong> ${meeting.duration} min</p><p><strong>Participants:</strong> ${meeting.participants.join(", ")}</p><div class="box">${meeting.summary.replace(/\n/g, "<br/>")}</div></body></html>`);
  win.document.close();
  win.print();
}

function getPurposeIcon(purpose) {
  const map = { "Progress Review": "💬", "Requirement Clarification": "🔍", "Delivery Review": "📦", "Team Sync": "👥", "Kickoff Meeting": "🚀", "Issue Resolution": "⚡" };
  return map[purpose] || "📅";
}