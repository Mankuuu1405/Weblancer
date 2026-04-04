// ── SupportView.jsx (Agency version) ──────────────────
import { useState } from "react";
import { SUPPORT_DATA } from "./ProjectData";

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

const SUPPORT_CATEGORIES = [
  { icon: "💰", label: "Payment or escrow issue"    },
  { icon: "📦", label: "Dispute about deliverables" },
  { icon: "👤", label: "Issue with the other party" },
  { icon: "⚙️", label: "Platform / technical issue" },
  { icon: "📋", label: "Contract or scope question" },
  { icon: "📅", label: "Deadline or timeline concern"},
  { icon: "❓", label: "General question"            },
];

const inputSty = {
  width: "100%", fontSize: 13, fontFamily: FONT,
  border: `1.5px solid ${G.greenBorder}`, borderRadius: 10,
  padding: "9px 14px", background: G.white, color: G.text,
  outline: "none", boxSizing: "border-box",
};

function NewSupportForm({ onClose }) {
  const [selected, setSelected] = useState(null);

  const pillBtn = (primary = false) => ({
    flex: 1, fontSize: 13, fontWeight: 700, fontFamily: FONT,
    padding: "10px 0", borderRadius: 100, cursor: "pointer", border: "none",
    ...(primary
      ? { background: G.gradNavy, color: G.white, boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }
      : { background: G.bg, color: G.sub, border: `1px solid ${G.border}` }),
  });

  return (
    <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, padding: "20px", boxShadow: "0 4px 20px rgba(110,192,48,0.1)", marginBottom: 20 }}>
      <p style={{ fontSize: 14, fontWeight: 800, color: G.text, marginBottom: 14 }}>What do you need help with?</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 18 }}>
        {SUPPORT_CATEGORIES.map(c => (
          <label key={c.label} style={{
            display: "flex", alignItems: "center", gap: 12,
            padding: "10px 14px", borderRadius: 10, cursor: "pointer",
            border: `1.5px solid ${selected === c.label ? G.green : G.greenBorder}`,
            background: selected === c.label ? G.greenBg : G.white,
            transition: "all 0.1s",
          }}>
            <input type="radio" name="supportCat" checked={selected === c.label} onChange={() => setSelected(c.label)} style={{ accentColor: G.green, flexShrink: 0 }} />
            <span style={{ fontSize: 13, color: G.text }}>{c.icon} {c.label}</span>
          </label>
        ))}
      </div>

      <div style={{ marginBottom: 14 }}>
        <p style={{ fontSize: 12, fontWeight: 700, color: G.sub, marginBottom: 6 }}>Brief description:</p>
        <textarea placeholder="Describe your issue..." rows={4} style={{ ...inputSty, resize: "none" }} />
      </div>

      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>
        {["📁 From project files", "📸 Screenshot"].map(label => (
          <button key={label} style={{ fontSize: 12, fontWeight: 600, fontFamily: FONT, color: G.sub, border: `1px solid ${G.greenBorder}`, borderRadius: 100, padding: "6px 14px", background: G.white, cursor: "pointer" }}>{label}</button>
        ))}
      </div>

      <div style={{ display: "flex", gap: 10 }}>
        <button onClick={onClose} style={pillBtn(false)}>Cancel</button>
        <button style={pillBtn(true)}>Submit Request</button>
      </div>
    </div>
  );
}

const STATUS_CHIP = {
  Resolved: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
  Open:     { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   },
};

const PRIORITY_CHIP = {
  High:   { bg: G.redBg,   border: G.redBorder,   text: "#dc2626" },
  Normal: { bg: G.bg,      border: G.border,       text: G.muted   },
};

export default function SupportView() {
  const [showForm, setShowForm] = useState(false);

  const pillBtn = (primary = false) => ({
    display: "inline-flex", alignItems: "center", gap: 6,
    fontSize: 11, fontWeight: 700, fontFamily: FONT,
    padding: "6px 14px", borderRadius: 100, cursor: "pointer",
    ...(primary
      ? { background: G.gradNavy, color: G.white, border: "none", boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }
      : { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` }),
  });

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: 24, fontFamily: FONT, background: G.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,textarea{outline:none;}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: 0, display: "flex", alignItems: "center", gap: 8 }}>🎧 Support</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button style={pillBtn()}>📋 History</button>
          <button style={pillBtn()}>📞 Call</button>
          <button onClick={() => setShowForm(!showForm)} style={pillBtn(true)}>+ New</button>
        </div>
      </div>

      {showForm && <NewSupportForm onClose={() => setShowForm(false)} />}

      {/* Tickets */}
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        {SUPPORT_DATA.map(ticket => {
          const st = STATUS_CHIP[ticket.status]   || STATUS_CHIP.Open;
          const pr = PRIORITY_CHIP[ticket.priority] || PRIORITY_CHIP.Normal;
          return (
            <div key={ticket.id} style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, padding: "16px 20px", boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 10 }}>
                <div style={{ minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>💰 {ticket.title}</p>
                    <span style={{ fontSize: 10, fontWeight: 700, background: pr.bg, color: pr.text, border: `1px solid ${pr.border}`, padding: "2px 8px", borderRadius: 99 }}>{ticket.priority}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, background: st.bg, color: st.text, border: `1px solid ${st.border}`, padding: "2px 8px", borderRadius: 99 }}>
                      {ticket.status === "Resolved" ? "✓ " : "⏱ "}{ticket.status}
                    </span>
                  </div>
                  <p style={{ fontSize: 11, color: G.muted, margin: 0, wordBreak: "break-all" }}>{ticket.id} · {ticket.date}</p>
                </div>
              </div>

              <p style={{ fontSize: 13, color: G.sub, marginBottom: 12, lineHeight: 1.6 }}>{ticket.description}</p>

              {ticket.response ? (
                <div style={{ borderLeft: `4px solid ${G.green}`, background: G.greenBg, borderRadius: "0 10px 10px 0", padding: "10px 14px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 6 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: G.greenDeep }}>🟢 {ticket.response.by}</span>
                    <span style={{ fontSize: 10, fontWeight: 700, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}`, padding: "1px 7px", borderRadius: 99 }}>SUPPORT</span>
                    <span style={{ fontSize: 11, color: G.muted }}>{ticket.response.date}</span>
                  </div>
                  <p style={{ fontSize: 13, color: G.text, margin: 0, lineHeight: 1.7 }}>{ticket.response.content}</p>
                  {ticket.response.resolvedOn && (
                    <p style={{ fontSize: 11, color: G.greenDeep, fontWeight: 700, marginTop: 6 }}>Resolved on {ticket.response.resolvedOn}</p>
                  )}
                  <p style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>Seen by: Client ✓ · Agency Admin ✓</p>
                </div>
              ) : (
                <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 10, padding: "8px 12px" }}>
                  <p style={{ fontSize: 11, color: "#92400e", margin: 0 }}>⏱ This ticket is visible to all project participants. Admin response expected within 4 hours.</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}