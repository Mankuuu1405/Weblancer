import { useState, useRef } from "react";
import MessageTypeSelector from "./MessageTypeSelector";
import MentionDropdown from "./MentionDropdown";
import MeetingScheduler from "./MeetingScheduler";
import FileUpload from "./FileUpload";

export default function MessageInput({ currentUser, participants, onSendMessage, project }) {
  const [content, setContent] = useState("");
  const [messageType, setMessageType] = useState("normal");
  const [showMention, setShowMention] = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMeeting, setShowMeeting] = useState(false);
  const [showFileUpload, setShowFileUpload] = useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const inputRef = useRef(null);

  const handleInput = (e) => {
    const val = e.target.value;
    setContent(val);
    const cursor = e.target.selectionStart;
    const textBeforeCursor = val.slice(0, cursor);
    const mentionMatch = textBeforeCursor.match(/@(\w*)$/);
    if (mentionMatch) {
      setMentionQuery(mentionMatch[1]);
      setShowMention(true);
    } else {
      setShowMention(false);
      setMentionQuery("");
    }
  };

  const handleMentionSelect = (participant) => {
    const cursor = inputRef.current.selectionStart;
    const before = content.slice(0, cursor).replace(/@(\w*)$/, `@${participant.name} `);
    const after = content.slice(cursor);
    setContent(before + after);
    setShowMention(false);
    setMentionQuery("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
    if (e.key === "Escape") setShowMention(false);
  };

  const handleSend = () => {
    if (!content.trim() && !attachedFile) return;
    let messageContent = content.trim();
    if (attachedFile) {
      messageContent += (messageContent ? "\n" : "") + `📎 Attached: ${attachedFile.name}`;
    }
    onSendMessage({ content: messageContent, type: messageType });
    setContent("");
    setMessageType("normal");
    setAttachedFile(null);
    setShowMention(false);
    inputRef.current?.focus();
  };

  const handleScheduleMeeting = (meetingData) => {
    onSendMessage({
      content: `📅 Meeting scheduled: "${meetingData.title}" on ${meetingData.date} at ${meetingData.time} (${meetingData.duration} mins)${meetingData.agenda ? `\nAgenda: ${meetingData.agenda}` : ""}`,
      type: "update",
    });
  };

  const handleFileSelect = (file) => {
    setAttachedFile(file);
    setShowFileUpload(false);
  };

  const getBorderStyle = () => {
    switch (messageType) {
      case "warning": return "border-amber-300 bg-amber-50";
      case "decision": return "border-green-300 bg-green-50";
      case "update": return "border-blue-300 bg-blue-50";
      default: return "border-gray-200 bg-white";
    }
  };

  return (
    <div className="px-4 py-3 relative">

      {/* @Mention Dropdown */}
      {showMention && (
        <div className="absolute bottom-full left-4 mb-2 z-50">
          <MentionDropdown
            participants={participants}
            query={mentionQuery}
            onSelect={handleMentionSelect}
          />
        </div>
      )}

      {/* Meeting Scheduler */}
      {showMeeting && (
        <MeetingScheduler
          participants={participants}
          onClose={() => setShowMeeting(false)}
          onSchedule={handleScheduleMeeting}
        />
      )}

      {/* File Upload Modal */}
      {showFileUpload && (
        <FileUpload
          onFileSelect={handleFileSelect}
          onClose={() => setShowFileUpload(false)}
        />
      )}

      {/* Message Type Selector */}
      <div className="mb-2 flex items-center gap-2">
        <span className="text-xs text-gray-400 font-medium">Type:</span>
        <MessageTypeSelector selected={messageType} onSelect={setMessageType} />
      </div>

      {/* Attached file preview */}
      {attachedFile && (
        <div className="mb-2 flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-lg px-3 py-1.5">
          <svg className="w-3.5 h-3.5 text-blue-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
              d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
          </svg>
          <span className="text-xs text-blue-700 truncate flex-1">{attachedFile.name}</span>
          <button onClick={() => setAttachedFile(null)} className="text-blue-400 hover:text-red-500 transition-colors">
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
      )}

      {/* Input box */}
      <div className={`flex items-end gap-2 border rounded-xl px-3 py-2 transition-all ${getBorderStyle()}`}>

        {/* Action buttons */}
        <div className="flex items-center gap-1 mb-1 shrink-0">
          <button
            onClick={() => setShowFileUpload(true)}
            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            title="Attach file"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>
          <button
            onClick={() => setShowMeeting(true)}
            className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400 hover:text-gray-600 transition-colors"
            title="Schedule meeting"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>
        </div>

        {/* Textarea */}
        <textarea
          ref={inputRef}
          value={content}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder={getPlaceholder(messageType)}
          rows={1}
          className="flex-1 resize-none text-sm bg-transparent outline-none text-gray-800 placeholder-gray-400 max-h-32 py-1"
          style={{ minHeight: "32px" }}
          onInput={(e) => {
            e.target.style.height = "auto";
            e.target.style.height = Math.min(e.target.scrollHeight, 128) + "px";
          }}
        />

        {/* Send button */}
        <button
          onClick={handleSend}
          disabled={!content.trim() && !attachedFile}
          className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mb-0.5 transition-all ${
            content.trim() || attachedFile
              ? "bg-green-600 text-white hover:bg-green-700"
              : "bg-gray-100 text-gray-300 cursor-not-allowed"
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
          </svg>
        </button>
      </div>

      {/* Hint */}
      <p className="text-xs text-gray-400 mt-1 ml-1">
        Press <kbd className="bg-gray-100 px-1 rounded text-gray-500">Enter</kbd> to send ·{" "}
        <kbd className="bg-gray-100 px-1 rounded text-gray-500">Shift+Enter</kbd> new line ·{" "}
        Type <kbd className="bg-gray-100 px-1 rounded text-gray-500">@</kbd> to mention
      </p>
    </div>
  );
}

function getPlaceholder(type) {
  switch (type) {
    case "update": return "Share a progress update with the team...";
    case "decision": return "Record a decision (will be locked after sending)...";
    case "warning": return "Post a warning or alert to the team...";
    default: return "Type a message... Use @ to mention someone";
  }
}