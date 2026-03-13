import { useNavigate } from "react-router-dom";

const teamDirectory = [
  { initial:"J", bg:"bg-blue-100",  color:"text-blue-600", name:"John Doe",   role:"AGENCY ADMIN", roleColor:"text-orange-500", status:"ACTIVE" },
  { initial:"S", bg:"bg-blue-100",  color:"text-blue-600", name:"Sarah Chen", role:"DEVELOPER",    roleColor:"text-blue-500",   status:"ACTIVE" },
];

const restrictions = [
  "Cannot bypass agency admin",
  "Contact support through your agency",
  "Cannot claim individual projects",
  "No direct payments from clients",
];

export default function StepActive({ onGoToDashboard }) {
  const navigate = useNavigate();

  const handleDashboard = () => {
    if (onGoToDashboard) onGoToDashboard();
    navigate("/agency/dashboard");
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-6">You're All Set!</h2>

      {/* Success */}
      <div className="text-center py-5 sm:py-6 mb-6">
        <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
          <svg width="30" height="30" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="#10b981" strokeWidth="2"/>
            <path d="M9 16l5 5 9-9" stroke="#10b981" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-gray-900">You're Active in TechVision Digital Agency</h3>
        <p className="text-sm text-gray-400 mt-1">Ready for project assignments</p>
      </div>

      {/* Team Directory */}
      <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">
        <p className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-4">
          <svg width="15" height="15" viewBox="0 0 15 15" fill="none" className="flex-shrink-0">
            <path d="M10 13v-1.25A2.5 2.5 0 007.5 9.25h-4A2.5 2.5 0 001 11.75V13" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            <circle cx="5.5" cy="5" r="2.5" stroke="#3b82f6" strokeWidth="1.3"/>
            <path d="M13 13v-1.25a2.5 2.5 0 00-2-2.45" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round"/>
            <path d="M10 2.55a2.5 2.5 0 010 4.85" stroke="#3b82f6" strokeWidth="1.3" strokeLinecap="round"/>
          </svg>
          Team Directory
        </p>
        <div className="flex flex-col gap-2">
          {teamDirectory.map((m, i) => (
            <div key={i} className="flex flex-wrap items-center justify-between gap-2 border border-gray-100 rounded-lg px-4 py-3">
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full ${m.bg} flex items-center justify-center text-xs font-bold ${m.color} flex-shrink-0`}>{m.initial}</div>
                <span className="text-sm font-semibold text-gray-800">{m.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`text-xs font-bold ${m.roleColor}`}>{m.role}</span>
                <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded">{m.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Restrictions */}
      <div className="border border-gray-100 bg-gray-50 rounded-xl p-4 sm:p-5 mb-6">
        <p className="text-sm font-semibold text-gray-800 mb-3">Restrictions:</p>
        <div className="flex flex-col gap-2">
          {restrictions.map((r, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-600">
              <span className="text-red-400 font-bold text-base leading-none flex-shrink-0">×</span>
              {r}
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <button
        onClick={handleDashboard}
        className="w-full flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-3 rounded-xl transition-colors text-sm"
      >
        Go to My Dashboard →
      </button>
    </div>
  );
}
