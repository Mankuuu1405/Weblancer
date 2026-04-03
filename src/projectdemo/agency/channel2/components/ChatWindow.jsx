// ── ChatWindow.jsx ─────────────────────────────────────
import { useEffect, useRef, useState } from "react";
import MessageBubble  from "./MessageBubble";
import SystemMessage  from "./SystemMessage";
import MessageInput   from "./MessageInput";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
};
const FONT = "'Poppins', sans-serif";

export default function ChatWindow({ messages, currentUser, participants, project, onSendMessage }) {
  const bottomRef = useRef(null);
  const scrollRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);

  const isTrack = project.status === "on_track";

  useEffect(() => {
    if (isAtBottom) bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    setIsAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60);
  };

  const groupedMessages = groupByDate(messages);

  return (
    <div style={{ display: "flex", flexDirection: "column", height: "100%", overflow: "hidden", position: "relative", fontFamily: FONT, background: G.bg }}>

      {/* Channel header */}
      <div style={{
        padding: "10px 16px", background: G.white,
        borderBottom: `1px solid ${G.greenBorder}`,
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0,
        boxShadow: "0 2px 8px rgba(110,192,48,0.04)", zIndex: 10,
        flexWrap: "wrap",
      }}>
        <div style={{
          width: 34, height: 34, borderRadius: 10, background: G.greenBg,
          display: "flex", alignItems: "center", justifyContent: "center",
          color: G.greenDeep, flexShrink: 0,
        }}>
          <svg width="17" height="17" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div style={{ minWidth: 0 }}>
          <p style={{ margin: 0, fontSize: 13, fontWeight: 700, color: G.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
            Internal Governance — {project.name}
          </p>
          <p style={{ margin: "1px 0 0", fontSize: 11, color: G.sub, fontWeight: 500 }}>
            Agency Admin · Team · Weblance Admin · {participants.length} participants
          </p>
        </div>
        <div style={{ flex: 1 }} />
        <span style={{
          fontSize: 11, padding: "3px 10px", borderRadius: 99, fontWeight: 700, flexShrink: 0,
          background: isTrack ? G.greenBg : G.redBg,
          color: isTrack ? G.greenDeep : "#dc2626",
          border: `1px solid ${isTrack ? G.greenBorder : G.redBorder}`,
        }}>
          {isTrack ? "On Track" : "At Risk"}
        </span>
      </div>

      {/* Messages */}
      <div ref={scrollRef} onScroll={handleScroll} style={{ flex: 1, overflowY: "auto", padding: "12px 16px", display: "flex", flexDirection: "column", gap: 6 }}>
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            {/* Date separator */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "14px 0 6px" }}>
              <div style={{ flex: 1, height: 1, background: G.greenBorder }} />
              <span style={{ fontSize: 10, color: G.greenDeep, fontWeight: 700, letterSpacing: "0.06em", textTransform: "uppercase" }}>{date}</span>
              <div style={{ flex: 1, height: 1, background: G.greenBorder }} />
            </div>
            {msgs.map((message, index) => {
              const isSameSender = msgs[index - 1]?.sender_id === message.sender_id;
              if (message.is_system) return <SystemMessage key={message.id} message={message} />;
              return <MessageBubble key={message.id} message={message} currentUser={currentUser} isSameSender={isSameSender} />;
            })}
          </div>
        ))}
        <div ref={bottomRef} style={{ height: 4 }} />
      </div>

      {/* Scroll to bottom */}
      {!isAtBottom && (
        <button onClick={() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); setIsAtBottom(true); }} style={{
          position: "absolute", bottom: 88, right: 20, zIndex: 20,
          width: 38, height: 38, borderRadius: "50%", cursor: "pointer",
          background: G.white, border: `1.5px solid ${G.greenBorder}`, color: G.greenDeep,
          display: "flex", alignItems: "center", justifyContent: "center",
          boxShadow: "0 4px 12px rgba(110,192,48,0.18)", transition: "transform 0.2s",
        }}
          onMouseEnter={e => e.currentTarget.style.transform = "scale(1.08)"}
          onMouseLeave={e => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Message input */}
      <div style={{ flexShrink: 0, borderTop: `1px solid ${G.greenBorder}`, background: G.white, zIndex: 10 }}>
        <MessageInput currentUser={currentUser} participants={participants} onSendMessage={onSendMessage} project={project} />
      </div>
    </div>
  );
}

function groupByDate(messages) {
  return messages.reduce((acc, message) => {
    const date      = new Date(message.timestamp);
    const today     = new Date();
    const yesterday = new Date(); yesterday.setDate(today.getDate() - 1);
    let label;
    if (date.toDateString() === today.toDateString())     label = "Today";
    else if (date.toDateString() === yesterday.toDateString()) label = "Yesterday";
    else label = date.toLocaleDateString("en-IN", { day:"numeric", month:"short", year:"numeric" });
    if (!acc[label]) acc[label] = [];
    acc[label].push(message);
    return acc;
  }, {});
}