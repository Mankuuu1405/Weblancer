// ── MeetingsView.jsx ───────────────────────────────────
import { useState } from "react";
import { MEETINGS_DATA } from "./ProjectData";

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

const MEETING_TYPES = [
  { icon: "⚪", label: "Project Discussion",        desc: "General project progress, questions, alignment",       adminNote: null },
  { icon: "🔵", label: "Requirement Clarification", desc: "Clear up ambiguous requirements or scope",             adminNote: null },
  { icon: "🟠", label: "Delivery Review",           desc: "Review submitted milestone deliverables",              adminNote: null },
  { icon: "⚠️", label: "Dispute Discussion",        desc: "Resolve a disagreement between parties",              adminNote: "⚠ Admin will be auto-added to this meeting" },
  { icon: "📋", label: "Scope Change Discussion",   desc: "Discuss modifying the original project agreement",     adminNote: null },
];

const inputSty = {
  width: "100%", fontSize: 13, fontFamily: FONT,
  border: `1.5px solid ${G.greenBorder}`, borderRadius: 10,
  padding: "9px 14px", background: G.white, color: G.text,
  outline: "none", boxSizing: "border-box",
};

function ScheduleModal({ onClose }) {
  const [step,         setStep]         = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [duration,     setDuration]     = useState("45 min");
  const [purpose,      setPurpose]      = useState("");
  const [topics,       setTopics]       = useState([""]);
  const STEPS = 5;

  const STEP_LABELS = ["Meeting Type","Participants","Date, Time & Duration","Meeting Agenda","Review & Confirm"];

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(15,26,59,0.35)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 16 }}>
      <div style={{ background: G.white, borderRadius: 20, boxShadow: "0 8px 40px rgba(15,26,59,0.18)", width: "100%", maxWidth: 480, overflow: "hidden" }}>

        {/* Header */}
        <div style={{ padding: "20px 24px 12px", background: G.greenBg, borderBottom: `1px solid ${G.greenBorder}` }}>
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 800, color: G.text, margin: "0 0 4px", display: "flex", alignItems: "center", gap: 8 }}>
                📅 Schedule a Meeting
              </h3>
              <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>
                Step {step} of {STEPS} — {STEP_LABELS[step - 1]}
              </p>
            </div>
            <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: G.muted, cursor: "pointer" }}>✕</button>
          </div>
          {/* Progress */}
          <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
            {[1,2,3,4,5].map(s => (
              <div key={s} style={{ flex: 1, height: 4, borderRadius: 99, background: s <= step ? G.green : G.border }} />
            ))}
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "20px 24px", maxHeight: 380, overflowY: "auto" }}>

          {step === 1 && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 12 }}>What is this meeting about?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {MEETING_TYPES.map(mt => (
                  <label key={mt.label} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "10px 14px", borderRadius: 10, cursor: "pointer",
                    border: `1.5px solid ${selectedType === mt.label ? G.green : G.greenBorder}`,
                    background: selectedType === mt.label ? G.greenBg : G.white,
                    transition: "all 0.1s",
                  }}>
                    <input type="radio" name="meetingType" checked={selectedType === mt.label} onChange={() => setSelectedType(mt.label)} style={{ marginTop: 2, accentColor: G.green }} />
                    <div>
                      <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 2px" }}>{mt.icon} {mt.label}</p>
                      <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{mt.desc}</p>
                      {mt.adminNote && <p style={{ fontSize: 11, color: "#b45309", marginTop: 3 }}>{mt.adminNote}</p>}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <p style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 12 }}>Who should attend?</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {[
                  { name: "Alex R. (You — auto-included)", role: "CLIENT",       locked: true,  roleColor: { bg: G.greenBg, text: G.greenDeep } },
                  { name: "TechCorp Agency",               role: "AGENCY ADMIN", locked: false, roleColor: { bg: G.blueBg,  text: G.blue      } },
                  { name: "Platform Admin",                role: "ADMIN",        locked: false, roleColor: { bg: G.redBg,   text: "#dc2626"   } },
                ].map(p => (
                  <div key={p.name} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "10px 14px", border: `1px solid ${G.greenBorder}`, borderRadius: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{
                        width: 20, height: 20, borderRadius: "50%",
                        border: `2px solid ${p.locked ? G.green : G.border}`,
                        background: p.locked ? G.green : "transparent",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        {p.locked && <span style={{ color: G.white, fontSize: 11 }}>✓</span>}
                      </div>
                      <span style={{ fontSize: 12, color: G.text }}>{p.name}</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, background: p.roleColor.bg, color: p.roleColor.text, padding: "2px 8px", borderRadius: 99 }}>{p.role}</span>
                      {p.locked && <span style={{ fontSize: 10, color: G.muted, border: `1px solid ${G.border}`, borderRadius: 6, padding: "1px 6px" }}>Locked</span>}
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 10, padding: "8px 12px", background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10 }}>
                <p style={{ fontSize: 11, color: "#92400e", margin: 0 }}>⚠️ Role restrictions apply. Some participants require approval before attending.</p>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <p style={{ fontSize: 11, color: G.muted, marginBottom: 10 }}>Your timezone: IST (GMT+5:30)</p>
              <input type="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} style={{ ...inputSty, marginBottom: 16 }} />
              {selectedDate && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 8 }}>Available Time Slots (IST):</p>
                  <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 8 }}>
                    {["9:00 AM","10:00 AM","11:00 AM","12:00 PM","1:00 PM","2:00 PM","3:00 PM","4:00 PM","5:00 PM"].map(t => (
                      <button key={t} onClick={() => setSelectedTime(t)} style={{
                        fontSize: 12, fontWeight: selectedTime === t ? 700 : 500,
                        border: `1.5px solid ${selectedTime === t ? G.green : G.greenBorder}`,
                        borderRadius: 8, padding: "8px 4px", cursor: "pointer", fontFamily: FONT,
                        background: selectedTime === t ? G.greenBg : G.white,
                        color: selectedTime === t ? G.greenDeep : G.sub,
                      }}>{t}</button>
                    ))}
                  </div>
                </div>
              )}
              <div>
                <p style={{ fontSize: 13, fontWeight: 600, color: G.text, marginBottom: 8 }}>Duration:</p>
                <div style={{ display: "flex", gap: 8 }}>
                  {["30 min","45 min","60 min","90 min"].map(d => (
                    <button key={d} onClick={() => setDuration(d)} style={{
                      fontSize: 12, fontWeight: duration === d ? 700 : 500,
                      border: `1.5px solid ${duration === d ? G.green : G.greenBorder}`,
                      borderRadius: 100, padding: "6px 14px", cursor: "pointer", fontFamily: FONT,
                      background: duration === d ? G.gradNavy : G.white,
                      color: duration === d ? G.white : G.sub,
                    }}>{d}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <div style={{ padding: "8px 12px", background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, marginBottom: 14 }}>
                <p style={{ fontSize: 11, color: "#92400e", margin: 0 }}>⚠️ Meeting agenda is required. This prevents random calls and ensures focused time.</p>
              </div>
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.sub, marginBottom: 6 }}>Meeting Purpose (required):</p>
                <input value={purpose} onChange={e => setPurpose(e.target.value)} placeholder="e.g., Review Milestone 2 backend API" style={inputSty} />
              </div>
              <div style={{ marginBottom: 14 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.sub, marginBottom: 6 }}>Topics to discuss:</p>
                {topics.map((t, i) => (
                  <div key={i} style={{ display: "flex", gap: 8, marginBottom: 8 }}>
                    <span style={{ fontSize: 12, color: G.muted, marginTop: 10 }}>{i + 1}.</span>
                    <input value={t} onChange={e => { const u = [...topics]; u[i] = e.target.value; setTopics(u); }} placeholder="Topic..." style={{ ...inputSty, flex: 1 }} />
                  </div>
                ))}
                <button onClick={() => setTopics([...topics, ""])} style={{ fontSize: 12, fontWeight: 700, color: G.greenDeep, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>+ Add topic</button>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.sub, marginBottom: 6 }}>Additional notes:</p>
                <textarea placeholder="Optional notes..." rows={3} style={{ ...inputSty, resize: "none" }} />
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 12, padding: 16 }}>
              <p style={{ fontSize: 13, fontWeight: 800, color: G.greenDeep, margin: "0 0 12px" }}>🟠 {selectedType || "Delivery Review"}</p>
              <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 12 }}>
                {[
                  ["Date:",     selectedDate || "Mar 19, 2026"],
                  ["Time:",     `${selectedTime || "1:00 PM"} IST`],
                  ["Duration:", duration],
                ].map(([label, value]) => (
                  <div key={label} style={{ display: "flex", gap: 10, fontSize: 13 }}>
                    <span style={{ color: G.muted, width: 70 }}>{label}</span>
                    <span style={{ fontWeight: 700, color: G.text }}>{value}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 12, borderTop: `1px solid ${G.greenBorder}` }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: G.greenDeep, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Participants</p>
                {[
                  { name: "Alex R.", role: "CLIENT",       status: "Auto-confirmed", statusColor: G.greenDeep },
                  { name: "TechCorp Agency", role: "AGENCY ADMIN", status: "Awaiting confirmation", statusColor: G.muted },
                ].map(p => (
                  <div key={p.name} style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
                    <span style={{ fontWeight: 600, color: G.text }}>{p.name}</span>
                    <span style={{ color: p.statusColor }}>{p.status}</span>
                  </div>
                ))}
              </div>
              <div style={{ paddingTop: 12, borderTop: `1px solid ${G.greenBorder}`, marginTop: 4 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>Agenda: {purpose || "—"}</p>
                <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>Topics: {topics.filter(Boolean).length} items</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 24px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
          {step > 1
            ? <button onClick={() => setStep(step - 1)} style={{ fontSize: 13, color: G.muted, background: "none", border: "none", cursor: "pointer", fontFamily: FONT }}>← Back</button>
            : <div />}
          <div style={{ display: "flex", gap: 8 }}>
            <button onClick={onClose} style={{ fontSize: 12, color: G.muted, background: "none", border: `1px solid ${G.border}`, borderRadius: 100, padding: "7px 16px", cursor: "pointer", fontFamily: FONT }}>Cancel</button>
            {step < STEPS
              ? <button onClick={() => setStep(step + 1)} style={{ fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "8px 20px", cursor: "pointer", boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }}>Next →</button>
              : <button onClick={onClose} style={{ fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "8px 20px", cursor: "pointer", boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }}>Send Meeting Request →</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const MEETING_STATUS = {
  Confirmed: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
  Pending:   { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"  },
  Completed: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
};

export default function MeetingsView() {
  const [showModal, setShowModal] = useState(false);

  const pillBtn = (variant = "ghost") => ({
    display: "inline-flex", alignItems: "center", gap: 5,
    fontSize: 11, fontWeight: 700, fontFamily: FONT,
    padding: "6px 14px", borderRadius: 100, cursor: "pointer",
    ...(variant === "primary"  ? { background: G.gradNavy, color: G.white, border: "none",                   boxShadow: "0 2px 8px rgba(15,26,59,0.2)" } :
        variant === "danger"   ? { background: G.redBg,    color: "#dc2626", border: `1px solid ${G.redBorder}` } :
        { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` }),
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24, fontFamily: FONT, background: G.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;}`}</style>
      {showModal && <ScheduleModal onClose={() => setShowModal(false)} />}

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>📅 Meetings</h2>
        <button onClick={() => setShowModal(true)} style={{ fontSize: 12, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "9px 18px", cursor: "pointer", boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }}>
          + Schedule New Meeting
        </button>
      </div>

      {/* Upcoming */}
      <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, marginBottom: 12 }}>UPCOMING</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12, marginBottom: 28 }}>
        {MEETINGS_DATA.upcoming.map(m => {
          const s = MEETING_STATUS[m.status] || MEETING_STATUS.Pending;
          return (
            <div key={m.id} style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>{m.icon} {m.title}</p>
                  <p style={{ fontSize: 11, color: G.muted, margin: "0 0 2px" }}>{m.date}</p>
                  <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{m.participants}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>
                  {m.status === "Confirmed" ? "✓ " : ""}{m.status}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
                {m.actions.map(a => (
                  <button key={a} style={pillBtn(a === "Join" ? "primary" : a === "Cancel" ? "danger" : "ghost")}>{a}</button>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Past */}
      <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, marginBottom: 12 }}>PAST MEETINGS</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {MEETINGS_DATA.past.map(m => {
          const s = MEETING_STATUS[m.status] || MEETING_STATUS.Completed;
          return (
            <div key={m.id} style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 14, padding: "14px 16px", boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 4px" }}>{m.icon} {m.title}</p>
                  <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>Duration: {m.duration} · Participants: {m.participants} · Summary: {m.summary}</p>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 99, flexShrink: 0 }}>✓ {m.status}</span>
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button style={pillBtn()}>📄 View Summary</button>
                <button style={pillBtn()}>⬇ Download PDF</button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}