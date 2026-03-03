export default function StepPerms() {
  const canDo = [
    "Chat in project channels",
    "Upload code files",
    "Comment on tasks",
    "View assigned projects",
    "Update task status",
  ];

  const cannotDo = [
    "Approve milestones (PM/Admin only)",
    "Access financial details (Finance/Admin only)",
    "Message clients directly (unless approved)",
    "Change project scope (Admin only)",
  ];

  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 mb-1">Your Permissions</h2>
      <p className="text-sm text-gray-500 mb-5">What you can and can't do as a Developer</p>

      {/* Role badge */}
      <div className="flex items-center gap-2 mb-5">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M7 1.167L2.333 3.208v3.5C2.333 9.275 4.421 11.585 7 12.25c2.579-.665 4.667-2.975 4.667-5.542v-3.5L7 1.167z" stroke="#6b7280" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/></svg>
        <span className="text-xs text-gray-500">Your permissions as</span>
        <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded">DEVELOPER</span>
      </div>

      <div className="flex flex-col gap-4">
        {/* Can Do */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-green-600 mb-4">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#10b981" strokeWidth="1.3"/><path d="M4.5 7.5l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
            What You CAN Do
          </h3>
          <div className="flex flex-col gap-2.5">
            {canDo.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#10b981" strokeWidth="1.3"/><path d="M4.5 7.5l2 2 4-4" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/></svg>
                {item}
              </div>
            ))}
          </div>
        </div>

        {/* Cannot Do */}
        <div className="border border-gray-200 rounded-xl p-5">
          <h3 className="flex items-center gap-2 text-sm font-semibold text-red-500 mb-4">
            <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#ef4444" strokeWidth="1.3"/><path d="M5 5l5 5M10 5l-5 5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
            What You CANNOT Do
          </h3>
          <div className="flex flex-col gap-2.5">
            {cannotDo.map((item, i) => (
              <div key={i} className="flex items-center gap-2.5 text-sm text-gray-700">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><circle cx="7.5" cy="7.5" r="6.5" stroke="#ef4444" strokeWidth="1.3"/><path d="M5 5l5 5M10 5l-5 5" stroke="#ef4444" strokeWidth="1.3" strokeLinecap="round"/></svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}