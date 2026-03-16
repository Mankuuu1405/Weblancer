import { useEffect, useRef, useState } from "react";
import MessageBubble from "./MessageBubble";
import SystemMessage from "./SystemMessage";
import MessageInput from "./MessageInput";

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

  return (
    <div className="flex flex-col h-full overflow-hidden">

      {/* Channel header */}
      <div className="px-5 py-3 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-gray-100 flex items-center justify-center">
          <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-semibold text-gray-800">
            Internal Governance — {project.name}
          </p>
          <p className="text-xs text-gray-400">
            Agency Admin · Team Members · Weblance Admin · {participants.length} participants
          </p>
        </div>

        <div className="flex-1" />

        {/* Status badge */}
        <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
          project.status === "on_track"
            ? "bg-green-50 text-green-700 border border-green-200"
            : "bg-red-50 text-red-700 border border-red-200"
        }`}>
          {project.status === "on_track" ? "On Track" : "At Risk"}
        </span>
      </div>

      {/* Messages scroll area */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-5 py-4 space-y-1"
      >
        {Object.entries(groupedMessages).map(([date, msgs]) => (
          <div key={date}>
            {/* Date separator */}
            <div className="flex items-center gap-3 my-4">
              <div className="flex-1 h-px bg-gray-200" />
              <span className="text-xs text-gray-400 font-medium px-2">{date}</span>
              <div className="flex-1 h-px bg-gray-200" />
            </div>

            {msgs.map((message, index) => {
              const prevMessage = msgs[index - 1];
              const isSameSender =
                prevMessage && prevMessage.sender_id === message.sender_id;

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

        <div ref={bottomRef} />
      </div>

      {/* Scroll to bottom button */}
      {!isAtBottom && (
        <div className="absolute bottom-20 right-6">
          <button
            onClick={() => {
              bottomRef.current?.scrollIntoView({ behavior: "smooth" });
              setIsAtBottom(true);
            }}
            className="w-9 h-9 bg-white border border-gray-200 rounded-full shadow-sm flex items-center justify-center hover:bg-gray-50 transition-colors"
          >
            <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      )}

      {/* Message input */}
      <div className="shrink-0 border-t border-gray-100 bg-white">
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