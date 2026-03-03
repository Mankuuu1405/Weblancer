import { useState } from "react";

const roles = ["Project Manager", "Developer", "Designer", "QA", "Finance"];

const pendingInvites = [
  { email: "sarah@example.com", role: "Developer", date: "2026-02-08" },
];

export default function StepInvite() {
  const [email,          setEmail]          = useState("");
  const [role,           setRole]           = useState("Developer");
  const [dropdownOpen,   setDropdownOpen]   = useState(false);
  const [invites,        setInvites]        = useState(pendingInvites);

  const sendInvite = () => {
    if (!email.trim()) return;
    setInvites([...invites, { email, role, date: new Date().toISOString().slice(0, 10) }]);
    setEmail("");
  };

  const removeInvite = (i) => setInvites(invites.filter((_, idx) => idx !== i));

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Invite Team Members</h2>
      <p className="text-sm text-gray-500 mb-6">Add your team to start collaborating on projects</p>

      {/* Add Team Member */}
      <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-5">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M10.667 14v-1.333A2.667 2.667 0 008 10H3.333a2.667 2.667 0 00-2.666 2.667V14" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="5.667" cy="5.333" r="2.667" stroke="#3b82f6" strokeWidth="1.3"/>
            <path d="M13.333 5.333v4M11.333 7.333h4" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Add Team Member
        </p>

        {/* Email + Role + Button — stack on mobile, row on sm+ */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-start gap-3">

          {/* Email */}
          <div className="flex-1">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Email Address *</label>
            <div className="flex items-center gap-2 border border-gray-200 rounded-lg px-3 py-2.5 bg-white focus-within:ring-2 focus-within:ring-blue-200 focus-within:border-blue-400">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                <rect x="1" y="2.5" width="12" height="9" rx="1.2" stroke="#9ca3af" strokeWidth="1.2"/>
                <path d="M1 4.5l6 4 6-4" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
              </svg>
              <input
                type="email"
                placeholder="member@email.com"
                className="flex-1 text-sm text-gray-700 placeholder-gray-400 focus:outline-none min-w-0"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Role dropdown */}
          <div className="relative sm:w-[150px]">
            <label className="text-xs font-semibold text-gray-600 mb-1.5 block">Assign Role *</label>
            <button
              onClick={() => setDropdownOpen(!dropdownOpen)}
              className="w-full flex items-center justify-between gap-2 border border-gray-200 rounded-lg px-4 py-2.5 bg-white text-sm text-gray-700 hover:bg-gray-50"
            >
              {role}
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="flex-shrink-0">
                <path d="M2 4l4 4 4-4" stroke="#6b7280" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
            {dropdownOpen && (
              <div className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 w-full py-1 overflow-hidden">
                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => { setRole(r); setDropdownOpen(false); }}
                    className={`w-full flex items-center gap-2.5 px-4 py-2.5 text-sm text-left transition-colors ${role === r ? "bg-blue-500 text-white" : "text-gray-700 hover:bg-gray-50"}`}
                  >
                    {role === r
                      ? <svg width="12" height="12" viewBox="0 0 12 12" fill="none"><path d="M2 6l3 3 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      : <span className="w-3" />}
                    {r}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Send button */}
          <div className="sm:pt-[22px]">
            <button
              onClick={sendInvite}
              className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium px-5 py-2.5 rounded-lg transition-colors whitespace-nowrap"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M12.5 1.5L6.5 7.5M12.5 1.5H8.5M12.5 1.5V5.5M5.5 3.5H2.5a1 1 0 00-1 1v7a1 1 0 001 1h7a1 1 0 001-1v-3" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Send Invite
            </button>
          </div>
        </div>
      </div>

      {/* Pending Invitations */}
      {invites.length > 0 && (
        <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
          <p className="text-sm font-semibold text-gray-800 mb-3">Pending Invitations</p>
          <div className="flex flex-col gap-2">
            {invites.map((inv, i) => (
              <div key={i} className="flex flex-wrap items-center justify-between gap-2 border border-gray-100 rounded-lg px-4 py-3 bg-gray-50">
                <div className="flex items-center gap-2.5 min-w-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="flex-shrink-0">
                    <rect x="1" y="2.5" width="12" height="9" rx="1.2" stroke="#9ca3af" strokeWidth="1.2"/>
                    <path d="M1 4.5l6 4 6-4" stroke="#9ca3af" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  <span className="text-sm text-gray-700 truncate">{inv.email}</span>
                  <span className="text-xs text-gray-400 flex-shrink-0">{inv.date}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className="text-xs font-semibold bg-yellow-100 text-yellow-600 px-2.5 py-1 rounded-full">PENDING</span>
                  <button className="text-gray-400 hover:text-blue-500 p-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M12 7a5 5 0 11-5-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                      <path d="M9 2l3 1-1 3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button onClick={() => removeInvite(i)} className="text-gray-400 hover:text-red-500 p-1">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 2l10 10M12 2L2 12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}