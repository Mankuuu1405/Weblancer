import { roleColors, roleLabels } from "../data/dummyData";

function MessageBubble({ message, currentUser, isSameSender }) {
  const colors = roleColors[message.sender_role] || roleColors["developer"];

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const getTypeBadge = (type) => {
    switch (type) {
      case "update":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-blue-50 text-blue-600 border border-blue-200 font-medium">Update</span>;
      case "decision":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-green-50 text-green-600 border border-green-200 font-medium">Decision</span>;
      case "warning":
        return <span className="text-xs px-2 py-0.5 rounded-full bg-amber-50 text-amber-600 border border-amber-200 font-medium">Warning</span>;
      default:
        return null;
    }
  };

  const getBubbleStyle = (role, type) => {
    if (type === "warning") return "bg-amber-50 border border-amber-200";
    if (type === "decision") return "bg-green-50 border border-green-200";
    if (type === "update") return "bg-blue-50 border border-blue-200";
    switch (role) {
      case "platform_admin": return "bg-red-50 border border-red-200";
      case "agency_admin": return "bg-blue-50 border border-blue-200";
      default: return "bg-yellow-50 border border-yellow-200";
    }
  };

  return (
    <div className={`flex gap-3 ${isSameSender ? "mt-0.5" : "mt-4"}`}>
      {/* Avatar */}
      <div className="shrink-0 mt-0.5">
        {!isSameSender ? (
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold ${colors.avatar}`}>
            {message.avatar}
          </div>
        ) : (
          <div className="w-8" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        {!isSameSender && (
          <div className="flex items-center gap-2 mb-1 flex-wrap">
            <span className="text-sm font-semibold text-gray-800">{message.sender_name}</span>
            <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium ${colors.badge}`}>
              {roleLabels[message.sender_role] || message.sender_role}
            </span>
            {getTypeBadge(message.type)}
            <span className="text-xs text-gray-400">{formatTime(message.timestamp)}</span>
          </div>
        )}

        {/* Bubble */}
        <div className={`inline-block max-w-xl px-4 py-2.5 rounded-2xl rounded-tl-sm text-sm text-gray-800 leading-relaxed ${getBubbleStyle(message.sender_role, message.type)}`}>
          <MentionText content={message.content} />

          {/* Decision lock */}
          {message.is_locked && (
            <div className="flex items-center gap-1 mt-2 pt-2 border-t border-green-200">
              <svg className="w-3 h-3 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-green-600 font-medium">Locked decision — cannot be edited</span>
            </div>
          )}
        </div>

        {isSameSender && (
          <p className="text-xs text-gray-400 mt-0.5 ml-1">{formatTime(message.timestamp)}</p>
        )}
      </div>
    </div>
  );
}

function MentionText({ content }) {
  if (!content) return null;
  const parts = content.split(/(@[\w\s]+?)(?=\s|$|[^a-zA-Z\s])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("@") ? (
          <span key={i} className="font-semibold text-green-700 bg-green-50 px-1 rounded">{part}</span>
        ) : (
          <span key={i}>{part}</span>
        )
      )}
    </>
  );
}

export default MessageBubble;