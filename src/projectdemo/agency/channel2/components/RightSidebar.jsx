import { roleColors, roleLabels } from "../data/dummyData";

export default function RightSidebar({ participants, project, currentUser }) {
  const agencyParticipants = participants.filter((p) => p.role === "agency_admin");
  const teamParticipants = participants.filter((p) => p.role !== "platform_admin" && p.role !== "agency_admin");
  const adminParticipants = participants.filter((p) => p.role === "platform_admin");

  const nextMilestone = project.milestones.find(
    (m) => m.status === "in_progress" || m.status === "pending"
  );
  const completedCount = project.milestones.filter((m) => m.status === "completed").length;

  return (
    <div className="flex flex-col h-full text-sm">

      {/* Admin monitoring warning */}
      <div className="mx-3 mt-3 p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2">
        <svg className="w-3.5 h-3.5 text-red-500 shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
        </svg>
        <p className="text-xs text-red-600 font-medium leading-tight">Admin is monitoring this channel</p>
      </div>

      {/* Project Info — no budget */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Project Info</p>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Project</span>
            <span className="text-xs font-medium text-gray-800">{project.name}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Client</span>
            <span className="text-xs font-medium text-gray-800">{project.client}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-xs text-gray-500">Deadline</span>
            <span className="text-xs font-medium text-gray-800">{project.deadline}</span>
          </div>
        </div>

        {/* Progress */}
        <div className="mt-3">
          <div className="flex justify-between mb-1">
            <span className="text-xs text-gray-500">Progress</span>
            <span className="text-xs font-semibold text-green-700">{project.progress}%</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-green-500 h-1.5 rounded-full" style={{ width: `${project.progress}%` }} />
          </div>
        </div>
      </div>

      {/* Next Deadline */}
      {nextMilestone && (
        <div className="p-4 border-b border-gray-100">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Next Deadline</p>
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-3">
            <p className="text-xs font-semibold text-amber-800">{project.deadline}</p>
            <p className="text-xs text-amber-700 mt-0.5">
              Milestone {completedCount + 1} — {nextMilestone.title}
            </p>
            <div className="flex items-center gap-1 mt-1.5">
              <svg className="w-3 h-3 text-amber-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
              </svg>
              <span className="text-xs text-amber-600 font-medium">Approaching deadline</span>
            </div>
          </div>
        </div>
      )}

      {/* Milestones */}
      <div className="p-4 border-b border-gray-100">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Milestones ({completedCount}/{project.milestones.length})
        </p>
        <div className="space-y-2">
          {project.milestones.map((m) => (
            <div key={m.id} className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full shrink-0 ${
                m.status === "completed" ? "bg-green-500" :
                m.status === "in_progress" ? "bg-blue-500" : "bg-gray-300"
              }`} />
              <span className={`text-xs flex-1 truncate ${
                m.status === "completed" ? "text-gray-400 line-through" : "text-gray-700"
              }`}>
                {m.title}
              </span>
              <span className={`text-xs font-medium capitalize ${
                m.status === "completed" ? "text-green-600" :
                m.status === "in_progress" ? "text-blue-600" : "text-gray-400"
              }`}>
                {m.status.replace("_", " ")}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Participants */}
      <div className="p-4 flex-1 overflow-y-auto">
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
          Participants ({participants.length})
        </p>

        {adminParticipants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Platform</p>
            {adminParticipants.map((p) => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}

        {agencyParticipants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Agency Admin</p>
            {agencyParticipants.map((p) => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}

        {teamParticipants.length > 0 && (
          <div className="mb-4">
            <p className="text-xs text-gray-400 mb-2">Team Members</p>
            {teamParticipants.map((p) => (
              <ParticipantRow key={p.id} participant={p} isCurrentUser={p.id === currentUser.id} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function ParticipantRow({ participant, isCurrentUser }) {
  const colors = roleColors[participant.role] || roleColors["developer"];
  return (
    <div className="flex items-center gap-2 mb-2">
      <div className={`relative w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 ${colors.avatar}`}>
        {participant.avatar}
        <span className={`absolute bottom-0 right-0 w-2 h-2 rounded-full border border-white ${
          participant.online ? "bg-green-500" : "bg-gray-300"
        }`} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 truncate">
          {participant.name}
          {isCurrentUser && <span className="text-gray-400 font-normal ml-1">(you)</span>}
        </p>
        <p className="text-xs text-gray-400 truncate">
          {roleLabels[participant.role] || participant.role}
        </p>
      </div>
      <span className={`text-xs px-1.5 py-0.5 rounded-md font-medium shrink-0 ${colors.badge}`}>
        {participant.role === "platform_admin" ? "Admin" :
         participant.role === "agency_admin" ? "Agency" :
         participant.role.charAt(0).toUpperCase() + participant.role.slice(1)}
      </span>
    </div>
  );
}