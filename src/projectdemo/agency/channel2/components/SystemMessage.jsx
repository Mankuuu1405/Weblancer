export default function SystemMessage({ message }) {
  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  return (
    <div className="flex items-center justify-center my-3">
      <div className="flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-full px-4 py-1.5 max-w-lg">
        {/* Icon */}
        <svg
          className="w-3.5 h-3.5 text-gray-400 shrink-0"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>

        {/* Text */}
        <span className="text-xs text-gray-500 text-center">{message.content}</span>

        {/* Time */}
        <span className="text-xs text-gray-400 shrink-0">
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}