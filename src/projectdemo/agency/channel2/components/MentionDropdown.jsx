import { roleColors, roleLabels } from "../data/dummyData";

export default function MentionDropdown({ participants, query, onSelect, position }) {
  const filtered = participants.filter((p) =>
    p.name.toLowerCase().includes(query.toLowerCase())
  );

  if (filtered.length === 0) return null;

  return (
    <div
      className="absolute z-50 bg-white border border-gray-200 rounded-xl shadow-lg overflow-hidden w-64"
      style={{ bottom: position?.bottom || "100%", left: position?.left || 0 }}
    >
      {/* Header */}
      <div className="px-3 py-2 border-b border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400 font-medium">Mention a participant</p>
      </div>

      {/* List */}
      <ul className="max-h-52 overflow-y-auto py-1">
        {filtered.map((participant) => {
          const colors = roleColors[participant.role] || roleColors["developer"];
          return (
            <li key={participant.id}>
              <button
                onMouseDown={(e) => {
                  e.preventDefault();
                  onSelect(participant);
                }}
                className="w-full flex items-center gap-3 px-3 py-2 hover:bg-gray-50 transition-colors text-left"
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 relative ${colors.avatar}`}
                >
                  {participant.avatar}
                  <span
                    className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
                      participant.online ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                </div>

                {/* Name + role */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-800 truncate">
                    {participant.name}
                  </p>
                  <p className="text-xs text-gray-400 truncate">
                    {roleLabels[participant.role] || participant.role}
                  </p>
                </div>

                {/* Role badge */}
                <span
                  className={`text-xs px-1.5 py-0.5 rounded-md font-medium shrink-0 ${colors.badge}`}
                >
                  {participant.role === "platform_admin"
                    ? "Admin"
                    : participant.role === "agency_admin"
                    ? "Agency"
                    : participant.role.charAt(0).toUpperCase() +
                      participant.role.slice(1)}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Footer hint */}
      <div className="px-3 py-1.5 border-t border-gray-100 bg-gray-50">
        <p className="text-xs text-gray-400">Click to mention</p>
      </div>
    </div>
  );
}