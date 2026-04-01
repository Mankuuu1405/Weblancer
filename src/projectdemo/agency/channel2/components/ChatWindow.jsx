import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";
import MessageInput from "./MessageInput";

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

export default function ChatWindow({
  messages,
  currentUser,
  participants,
  project,
  onSendMessage,
}) {
  const bottomRef = useRef(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const scrollRef = useRef(null);

  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (isAtBottom) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isAtBottom]);

  const handleScroll = () => {
    const el = scrollRef.current;
    if (!el) return;
    const atBottom = el.scrollHeight - el.scrollTop - el.clientHeight < 60;
    setIsAtBottom(atBottom);
  };

  // Group messages by date
  const groupedMessages = groupByDate(messages);

  const isTrack = project.status === "on_track";

  return (
    <div style={{ 
      display: "flex", flexDirection: "column", height: "100%", 
      overflow: "hidden", position: "relative", fontFamily: FONT, background: G.bg 
    }}>

      {/* Channel header */}
      <div style={{ 
        padding: "12px 20px", background: G.white, borderBottom: `1px solid ${G.greenBorder}`, 
        display: "flex", alignItems: "center", gap: 12, flexShrink: 0, 
        boxShadow: "0 2px 8px rgba(110,192,48,0.04)", zIndex: 10 
      }}>
        
        {/* Header Icon */}
        <div style={{ 
          width: 36, height: 36, borderRadius: 10, background: G.greenBg, 
          display: "flex", alignItems: "center", justifyContent: "center", color: G.greenDeep 
        }}>
          <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>

        {/* Header Info */}
        <div>
          <p style={{ margin: 0, fontSize: 14, fontWeight: 700, color: G.text }}>
            Internal Governance — {project.name}
          </p>
          <p style={{ margin: "2px 0 0", fontSize: 11, color: G.sub, fontWeight: 500 }}>
            Agency Admin · Team Members · Weblance Admin · {participants.length} participants
          </p>
        </div>

        <div style={{ flex: 1 }} />

        {/* Status badge */}
        <span style={{ 
          fontSize: 11, padding: "4px 12px", borderRadius: 99, fontWeight: 700,
          background: isTrack ? G.greenBg : G.redBg,
          color: isTrack ? G.greenDeep : "#dc2626",
          border: `1px solid ${isTrack ? G.greenBorder : G.redBorder}`
        }}>
          {isTrack ? "On Track" : "At Risk"}
        </span>
      </div>

      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        style={{ 
          flex: 1, overflowY: "auto", padding: "16px 20px", 
          display: "flex", flexDirection: "column", gap: 8 
        }}
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date} style={{ display: "flex", flexDirection: "column", gap: 4 }}>
            
            {/* Date separator */}
            <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0 8px" }}>
              <div style={{ flex: 1, height: 1, background: G.greenBorder }} />
              <span style={{ fontSize: 11, color: G.greenDeep, fontWeight: 700, letterSpacing: "0.03em", textTransform: "uppercase" }}>
                {date}
              </span>
              <div style={{ flex: 1, height: 1, background: G.greenBorder }} />
            </div>

            {msgs.map((message, index) => {
              const prevMessage = msgs[index - 1];
              const isSameSender = prevMessage && prevMessage.sender_id === message.sender_id;

              if (message.is_system) {
                return <SystemMessage key={message.id} message={message} />;
              }

              return (
                <MessageBubble
                  key={message.id}
                  message={message}
                  currentUser={currentUser}
                  isSameSender={isSameSender}
                />
              );
            })}
          </div>
        ))}

        {/* Scroll anchor */}
        <div ref={bottomRef} style={{ height: 4 }} />
      </div>

      {/* Scroll to bottom button */}
      {!isAtBottom && (
        <button
          onClick={() => {
            bottomRef.current?.scrollIntoView({ behavior: "smooth" });
            setIsAtBottom(true);
          }}
          style={{
            position: "absolute", bottom: 85, right: 24, zIndex: 20,
            width: 40, height: 40, borderRadius: "50%", cursor: "pointer",
            background: G.white, border: `1.5px solid ${G.greenBorder}`, color: G.greenDeep,
            display: "flex", alignItems: "center", justifyContent: "center",
            boxShadow: "0 4px 12px rgba(110,192,48,0.18)", transition: "transform 0.2s"
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.05)"}
          onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
        >
          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      )}

      {/* Message input */}
      <div style={{ 
        flexShrink: 0, borderTop: `1px solid ${G.greenBorder}`, 
        background: G.white, zIndex: 10 
      }}>
        <MessageInput
          currentUser={currentUser}
          participants={participants}
          onSendMessage={onSendMessage}
          project={project}
        />
      </div>
    </div>
  );
}

// Helper: group messages by date
function groupByDate(messages) {
  return messages.reduce((acc, message) => {
    const date = new Date(message.timestamp);
    const today = new Date();
    const yesterday = new Date();
    yesterday.setDate(today.getDate() - 1);

    let label;
    if (date.toDateString() === today.toDateString()) {
      label = "Today";
    } else if (date.toDateString() === yesterday.toDateString()) {
      label = "Yesterday";
    } else {
      label = date.toLocaleDateString("en-IN", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    }

    if (!acc[label]) acc[label] = [];
    acc[label].push(message);
    return acc;
  }, {});
}