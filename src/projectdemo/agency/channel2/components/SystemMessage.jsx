const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",
  gradGreen:   "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
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
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";
 
/* ── Event type → tonal style ── */
const TYPE_STYLE = {
  system:       { bg: G.bg,       text: G.muted,      border: G.border,       dot: G.muted     },
  admin_action: { bg: G.redBg,    text: G.redText,    border: G.redBorder,    dot: G.red       },
  milestone:    { bg: G.greenBg,  text: G.greenDeep,  border: G.greenBorder,  dot: G.green     },
  approval:     { bg: G.blueBg,   text: G.blueText,   border: G.blueBorder,   dot: G.blue      },
  decision:     { bg: G.purpleBg, text: G.purpleText, border: G.purpleBorder, dot: G.purple    },
  update:       { bg: G.amberBg,  text: G.amberText,  border: G.amberBorder,  dot: G.amber     },
};
 
 
 
 function SystemMessage({ message }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };
 
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", margin:"12px 0", fontFamily:FONT }}>
      <div style={{
        display:"inline-flex", alignItems:"center", gap:8,
        background: G.greenBg,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 99,
        padding: "5px 16px",
        maxWidth: 520,
      }}>
        {/* Info icon */}
        <svg width="13" height="13" fill="none" stroke={G.green} strokeWidth={2} viewBox="0 0 24 24" style={{ flexShrink:0 }}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>
        {/* Content */}
        <span style={{ fontSize:12, color:G.greenDeep, fontWeight:500 }}>{message.content}</span>
        {/* Time */}
        {message.timestamp && (
          <span style={{ fontSize:11, color:G.green, flexShrink:0, fontWeight:600 }}>
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}

export default SystemMessage;