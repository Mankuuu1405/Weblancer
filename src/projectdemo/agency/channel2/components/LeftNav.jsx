export default function LeftNav({ activeView, setActiveView, project, messages }) {
  const unreadCount = messages?.filter((m) => !m.is_system).length || 0;

  const navItems = [
    {
      id: "chat",
      label: "Project Stream",
      badge: unreadCount,
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
    },
    {
      id: "timeline",
      label: "Timeline",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
    },
    {
      id: "files",
      label: "Files",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
        </svg>
      ),
    },
    {
      id: "meetings",
      label: "Meetings",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        </svg>
      ),
    },
    {
      id: "support",
      label: "Support",
      icon: (
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
            d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      ),
    },
  ];

  return (
    <div className="w-52 shrink-0 border-r border-gray-200 bg-white flex flex-col overflow-y-auto">

      {/* Channels label */}
      <div className="px-4 pt-4 pb-2">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Channels</p>
      </div>

      {/* Nav items */}
      <nav className="px-2 space-y-0.5">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id)}
            className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors text-left ${
              activeView === item.id
                ? "bg-green-50 text-green-700 font-medium"
                : "text-gray-600 hover:bg-gray-50 hover:text-gray-800"
            }`}
          >
            <span className={activeView === item.id ? "text-green-600" : "text-gray-400"}>
              {item.icon}
            </span>
            <span className="flex-1 truncate">{item.label}</span>
            {item.badge > 0 && (
              <span className="text-xs bg-green-600 text-white px-1.5 py-0.5 rounded-full font-medium min-w-5 text-center">
                {item.badge}
              </span>
            )}
          </button>
        ))}
      </nav>

      <div className="flex-1" />

      {/* Project progress at bottom */}
      <div className="p-3 m-3 bg-gray-50 border border-gray-200 rounded-xl">
        <p className="text-xs font-medium text-gray-700 truncate">{project.name}</p>
        <div className="flex items-center gap-1 mt-1.5">
          <div className="flex-1 bg-gray-200 rounded-full h-1">
            <div className="bg-green-500 h-1 rounded-full" style={{ width: `${project.progress}%` }} />
          </div>
          <span className="text-xs text-green-700 font-medium">{project.progress}%</span>
        </div>
      </div>
    </div>
  );
}