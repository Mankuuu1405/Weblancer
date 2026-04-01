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

export default function MeetingScheduler({ onClose, onSchedule, participants }) {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [duration, setDuration] = useState("60");
  const [selectedParticipants, setSelectedParticipants] = useState(
    participants.map((p) => p.id)
  );
  const [agenda, setAgenda] = useState("");

  const toggleParticipant = (id) => {
    setSelectedParticipants((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const handleSubmit = () => {
    if (!title || !date || !time) return;
    onSchedule({
      title,
      date,
      time,
      duration,
      participants: selectedParticipants,
      agenda,
    });
    onClose();
  };

  const today = new Date().toISOString().split("T")[0];

  // Shared styles
  const labelSty = { fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 };
  const inputSty = { width: "100%", border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "9px 14px", fontSize: 13, fontFamily: FONT, color: G.text, background: G.white, outline: "none", boxSizing: "border-box" };
  const btnSty = (primary = false, disabled = false) => ({
    padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: FONT, 
    cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s ease",
    ...(primary 
      ? { 
          background: disabled ? G.bg : G.gradNavy, 
          color: disabled ? G.muted : G.white, 
          border: disabled ? `1px solid ${G.border}` : "none", 
          boxShadow: disabled ? "none" : "0 3px 12px rgba(15,26,59,0.25)" 
        } 
      : { 
          background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` 
        })
  });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,26,59,0.35)", padding: 16, fontFamily: FONT }}>
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} ::-webkit-scrollbar {width: 6px;} ::-webkit-scrollbar-thumb {background: #d4edbb; border-radius: 10px;}`}</style>

      <div style={{ background: G.white, borderRadius: 20, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 8px 40px rgba(15,26,59,0.18)", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📅</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: G.greenDeep, display: "block" }}>Schedule Meeting</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: G.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>

        {/* Form */}
        <div style={{ padding: "20px", display: "flex", flexDirection: "column", gap: 16, maxHeight: "65vh", overflowY: "auto" }}>

          {/* Meeting title */}
          <div>
            <label style={labelSty}>
              Meeting Title <span style={{ color: G.red }}>*</span>
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Sprint review, API progress check"
              style={inputSty}
            />
          </div>

          {/* Date + Time */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            <div>
              <label style={labelSty}>
                Date <span style={{ color: G.red }}>*</span>
              </label>
              <input
                type="date"
                value={date}
                min={today}
                onChange={(e) => setDate(e.target.value)}
                style={inputSty}
              />
            </div>
            <div>
              <label style={labelSty}>
                Time <span style={{ color: G.red }}>*</span>
              </label>
              <input
                type="time"
                value={time}
                onChange={(e) => setTime(e.target.value)}
                style={inputSty}
              />
            </div>
          </div>

          {/* Duration */}
          <div>
            <label style={labelSty}>Duration</label>
            <select
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              style={inputSty}
            >
              <option value="30">30 minutes</option>
              <option value="60">1 hour</option>
              <option value="90">1.5 hours</option>
              <option value="120">2 hours</option>
            </select>
          </div>

          {/* Participants */}
          <div>
            <label style={{ ...labelSty, marginBottom: 8 }}>
              Participants ({selectedParticipants.length} selected)
            </label>
            <div style={{ display: "flex", flexDirection: "column", gap: 4, maxHeight: 130, overflowY: "auto", paddingRight: 4 }}>
              {participants.map((p) => (
                <label
                  key={p.id}
                  style={{ 
                    display: "flex", alignItems: "center", gap: 10, cursor: "pointer", 
                    padding: "6px 10px", borderRadius: 10, transition: "background 0.2s",
                    background: selectedParticipants.includes(p.id) ? G.greenBg : "transparent",
                    border: `1px solid ${selectedParticipants.includes(p.id) ? G.greenBorder : "transparent"}`
                  }}
                >
                  <input
                    type="checkbox"
                    checked={selectedParticipants.includes(p.id)}
                    onChange={() => toggleParticipant(p.id)}
                    style={{ width: 14, height: 14, accentColor: G.greenDeep, cursor: "pointer" }}
                  />
                  <span style={{ fontSize: 13, fontWeight: 600, color: G.text, flex: 1 }}>{p.name}</span>
                  <span style={{ fontSize: 11, color: G.muted, textTransform: "capitalize", fontWeight: 500 }}>
                    {p.role.replace("_", " ")}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Agenda */}
          <div>
            <label style={labelSty}>
              Agenda <span style={{ fontWeight: 500, textTransform: "none", color: G.muted }}>(optional)</span>
            </label>
            <textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder="What will be discussed?"
              rows={2}
              style={{ ...inputSty, resize: "none" }}
            />
          </div>
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, background: G.bg }}>
          <button onClick={onClose} style={btnSty()}>
            Cancel
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={!title || !date || !time} 
            style={btnSty(true, !title || !date || !time)}
          >
            Schedule Meeting
          </button>
        </div>
      </div>
    </div>
  );
}