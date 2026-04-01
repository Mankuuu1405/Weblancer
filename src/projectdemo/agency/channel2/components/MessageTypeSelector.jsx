// ── MessageTypeSelector.jsx ────────────────────────────
import { useState, useRef, useEffect } from "react";
import { messageTypes } from "../data/dummyData";

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
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};
const FONT = "'Poppins', sans-serif";

const TYPE_STYLE = {
  normal:   { bg: G.bg,      border: G.border,       text: G.sub,       dot: G.muted    },
  update:   { bg: G.blueBg,  border: G.blueBorder,   text: G.blue,      dot: G.blue     },
  decision: { bg: G.greenBg, border: G.greenBorder,  text: G.greenDeep, dot: G.green    },
  warning:  { bg: G.amberBg, border: G.amberBorder,  text: "#92400e",   dot: G.amber    },
};

const TYPE_DESC = {
  normal:   "Regular message",
  update:   "Progress or task update",
  decision: "Final decision — locked",
  warning:  "Urgent alert or risk",
};

export default function MessageTypeSelector({ selectedType, onSelect }) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);
  const current = messageTypes.find(t => t.value === selectedType) || messageTypes[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const s = TYPE_STYLE[selectedType] || TYPE_STYLE.normal;

  return (
    <div style={{ position: "relative", fontFamily: FONT }} ref={dropdownRef}>

      {/* Trigger pill */}
      <button type="button" onClick={() => setIsOpen(p => !p)} style={{
        display: "flex", alignItems: "center", gap: 6,
        padding: "5px 12px", borderRadius: 100, cursor: "pointer",
        fontSize: 11, fontWeight: 700, fontFamily: FONT,
        background: s.bg, color: s.text,
        border: `1.5px solid ${s.border}`,
        transition: "all 0.1s",
      }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flexShrink: 0 }} />
        {current.label}
        <svg style={{ width: 11, height: 11, transition: "transform 0.15s", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Dropdown */}
      {isOpen && (
        <div style={{
          position: "absolute", bottom: "calc(100% + 8px)", left: 0,
          width: 220, background: G.white,
          border: `1px solid ${G.greenBorder}`,
          borderRadius: 12, boxShadow: "0 4px 20px rgba(110,192,48,0.12)",
          overflow: "hidden", zIndex: 50,
        }}>
          {/* Dropdown header */}
          <div style={{ padding: "8px 12px 6px", background: G.greenBg, borderBottom: `1px solid ${G.greenBorder}` }}>
            <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, margin: 0 }}>
              Message Type
            </p>
          </div>

          <div style={{ padding: 6 }}>
            {messageTypes.map(type => {
              const ts = TYPE_STYLE[type.value] || TYPE_STYLE.normal;
              const isSelected = selectedType === type.value;
              return (
                <button key={type.value} type="button"
                  onClick={() => { onSelect(type.value); setIsOpen(false); }}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", gap: 10,
                    padding: "8px 10px", borderRadius: 8, cursor: "pointer",
                    border: isSelected ? `1.5px solid ${ts.border}` : "1.5px solid transparent",
                    background: isSelected ? ts.bg : "transparent",
                    textAlign: "left", fontFamily: FONT, transition: "all 0.1s",
                  }}
                  onMouseEnter={e => { if (!isSelected) e.currentTarget.style.background = G.bg; }}
                  onMouseLeave={e => { if (!isSelected) e.currentTarget.style.background = "transparent"; }}
                >
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: ts.dot, flexShrink: 0 }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 12, fontWeight: 700, color: ts.text, margin: "0 0 1px" }}>{type.label}</p>
                    <p style={{ fontSize: 10, color: G.muted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                      {TYPE_DESC[type.value]}
                    </p>
                  </div>
                  {isSelected && (
                    <svg style={{ width: 13, height: 13, color: G.greenDeep, flexShrink: 0 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}