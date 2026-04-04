const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  // ... rest of your G tokens
};
const FONT = "'Poppins', sans-serif";

function SystemMessage({ message }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit", minute: "2-digit", hour12: true,
    });
  };

  return (
    <div style={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: "12px 0",
      fontFamily: FONT,
      padding: "0 12px",        // ← gutters so it never bleeds to screen edge
      boxSizing: "border-box",
    }}>
      <div style={{
        display: "inline-flex",
        alignItems: "flex-start",   // ← flex-start so icon stays top-aligned if text wraps
        flexWrap: "wrap",           // ← lets time badge drop below on very narrow screens
        gap: 8,
        background: G.greenBg,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 99,
        padding: "5px 16px",
        width: "min(520px, 100%)",  // ← replaces maxWidth; fills narrow viewports properly
        boxSizing: "border-box",
      }}>
        {/* Icon — stays pinned, never shrinks */}
        <svg
          width="13" height="13"
          fill="none" stroke={G.green} strokeWidth={2}
          viewBox="0 0 24 24"
          style={{ flexShrink: 0, marginTop: 1 }}   // ← tiny nudge to optically align with text cap-height
        >
          <path strokeLinecap="round" strokeLinejoin="round"
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
        </svg>

        {/* Content — allowed to grow and wrap */}
        <span style={{
          fontSize: 12,
          color: G.greenDeep,
          fontWeight: 500,
          flex: 1,               // ← takes all available space, pushes time to the right
          minWidth: 0,           // ← lets flex item shrink below its content size
          wordBreak: "break-word",
        }}>
          {message.content}
        </span>

        {/* Time — shrinks last, wraps below if truly no room */}
        {message.timestamp && (
          <span style={{
            fontSize: 11,
            color: G.green,
            flexShrink: 0,
            fontWeight: 600,
            whiteSpace: "nowrap",
          }}>
            {formatTime(message.timestamp)}
          </span>
        )}
      </div>
    </div>
  );
}

export default SystemMessage;