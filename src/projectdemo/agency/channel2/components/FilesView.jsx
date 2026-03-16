import { useState, useRef } from "react";

const dummyFiles = [
  {
    id: "f1",
    name: "wireframes_v2.pdf",
    type: "pdf",
    milestone: "Milestone 1: UI Design",
    milestoneStatus: "completed",
    uploadedBy: "Sara M.",
    uploadedByRole: "developer",
    uploadedAt: "Mar 11, 2026 · 4:20 PM",
    version: "2 of 2",
    replaces: "wireframes_v1.pdf",
    note: "Updated screens 5 and 9 per meeting notes",
    status: "approved",
    size: "2.4 MB",
  },
  {
    id: "f2",
    name: "wireframes_v1.pdf",
    type: "pdf",
    milestone: "Milestone 1: UI Design",
    milestoneStatus: "completed",
    uploadedBy: "Sara M.",
    uploadedByRole: "developer",
    uploadedAt: "Mar 9, 2026 · 2:00 PM",
    version: "1 of 2",
    replaces: null,
    note: null,
    status: "replaced",
    size: "2.1 MB",
  },
  {
    id: "f3",
    name: "design_system.fig",
    type: "fig",
    milestone: "Milestone 1: UI Design",
    milestoneStatus: "completed",
    uploadedBy: "Priya S.",
    uploadedByRole: "designer",
    uploadedAt: "Mar 10, 2026 · 11:00 AM",
    version: "1 of 1",
    replaces: null,
    note: null,
    status: "approved",
    size: "5.8 MB",
  },
  {
    id: "f4",
    name: "tech_architecture.pdf",
    type: "pdf",
    milestone: "Milestone 1: UI Design",
    milestoneStatus: "completed",
    uploadedBy: "Dev Mike",
    uploadedByRole: "developer",
    uploadedAt: "Mar 8, 2026 · 3:30 PM",
    version: "1 of 1",
    replaces: null,
    note: null,
    status: "approved",
    size: "1.2 MB",
  },
];

const milestoneGroups = [
  { id: "m1", label: "Milestone 1: UI Design", status: "completed" },
  { id: "m2", label: "Milestone 2: Backend API", status: "in_progress" },
  { id: "m3", label: "Milestone 3: Mobile App", status: "pending" },
  { id: "m4", label: "Milestone 4: Testing & Launch", status: "pending" },
];

const projectDocs = [
  {
    id: "d1",
    name: "project_brief.pdf",
    type: "pdf",
    uploadedBy: "Raj Kumar",
    uploadedByRole: "agency_admin",
    uploadedAt: "Mar 5, 2026 · 10:00 AM",
    status: "active",
    size: "0.8 MB",
  },
  {
    id: "d2",
    name: "nda_signed.pdf",
    type: "pdf",
    uploadedBy: "Platform Admin",
    uploadedByRole: "platform_admin",
    uploadedAt: "Mar 5, 2026 · 9:30 AM",
    status: "locked",
    size: "0.3 MB",
  },
];

const fileIcons = {
  pdf: (
    <svg className="w-5 h-5 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  fig: (
    <div className="w-5 h-5 rounded bg-purple-500 flex items-center justify-center text-white text-xs font-bold">F</div>
  ),
  doc: (
    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  default: (
    <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
        d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
};

const statusBadge = {
  approved: <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 border border-green-200 px-2 py-0.5 rounded-full font-medium">✓ Approved</span>,
  replaced: <span className="flex items-center gap-1 text-xs bg-gray-100 text-gray-500 border border-gray-200 px-2 py-0.5 rounded-full font-medium">↩ Replaced</span>,
  pending: <span className="flex items-center gap-1 text-xs bg-amber-100 text-amber-700 border border-amber-200 px-2 py-0.5 rounded-full font-medium">⏳ Pending</span>,
  active: <span className="flex items-center gap-1 text-xs bg-blue-100 text-blue-700 border border-blue-200 px-2 py-0.5 rounded-full font-medium">● Active</span>,
  locked: <span className="flex items-center gap-1 text-xs bg-red-50 text-red-600 border border-red-200 px-2 py-0.5 rounded-full font-medium">🔒 Locked</span>,
};

export default function FilesView({ project }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showHistory, setShowHistory] = useState(null);
  const [showRequestDeliverable, setShowRequestDeliverable] = useState(false);
  const [files, setFiles] = useState(dummyFiles);
  const fileInputRef = useRef(null);

  const getFilesForMilestone = (milestoneLabel) =>
    files.filter((f) => f.milestone === milestoneLabel);

  const handleUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const newFile = {
      id: `f${Date.now()}`,
      name: file.name,
      type: file.name.split(".").pop(),
      milestone: "Milestone 2: Backend API",
      milestoneStatus: "in_progress",
      uploadedBy: "Raj Kumar",
      uploadedByRole: "agency_admin",
      uploadedAt: new Date().toLocaleString("en-IN", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      version: "1 of 1",
      replaces: null,
      note: null,
      status: "pending",
      size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
    };
    setFiles((prev) => [newFile, ...prev]);
    setShowUpload(false);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden">

      {/* Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-100 flex items-center gap-3 shrink-0">
        <div className="flex items-center gap-2 flex-1">
          <span className="text-lg">📁</span>
          <div>
            <p className="text-sm font-semibold text-gray-800">Project Files</p>
            <p className="text-xs text-gray-400">{files.length} files · Milestone deliverables and documents</p>
          </div>
        </div>

        <button
          onClick={() => setShowRequestDeliverable(true)}
          className="text-sm px-3 py-1.5 border border-gray-200 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors font-medium"
        >
          Request Deliverable
        </button>

        <button
          onClick={() => fileInputRef.current?.click()}
          className="flex items-center gap-2 text-sm px-3 py-1.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors font-medium"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Upload File
        </button>
        <input ref={fileInputRef} type="file" className="hidden" onChange={handleUpload} />
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-6 py-4 space-y-6">

        {/* Milestone groups */}
        {milestoneGroups.map((mg) => {
          const mgFiles = getFilesForMilestone(mg.label);
          return (
            <div key={mg.id}>
              {/* Milestone label */}
              <div className="flex items-center gap-2 mb-3">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-wider">{mg.label}</p>
                {mg.status === "in_progress" && (
                  <span className="text-xs text-green-600 font-semibold">(In Progress)</span>
                )}
              </div>

              {mgFiles.length === 0 ? (
                <div className="bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 flex items-center gap-2">
                  <span className="text-base">📦</span>
                  <p className="text-xs text-gray-400">No files submitted yet for this milestone.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {mgFiles.map((file) => (
                    <FileCard
                      key={file.id}
                      file={file}
                      onHistory={() => setShowHistory(file)}
                    />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Project Documents */}
        <div>
          <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">Project Documents</p>
          <div className="space-y-2">
            {projectDocs.map((file) => (
              <FileCard key={file.id} file={file} onHistory={() => setShowHistory(file)} isDoc />
            ))}
          </div>
        </div>
      </div>

      {/* History Modal */}
      {showHistory && (
        <HistoryModal file={showHistory} onClose={() => setShowHistory(null)} />
      )}

      {/* Request Deliverable Modal */}
      {showRequestDeliverable && (
        <RequestDeliverableModal onClose={() => setShowRequestDeliverable(false)} />
      )}
    </div>
  );
}

function FileCard({ file, onHistory, isDoc }) {
  return (
    <div className={`bg-white border rounded-xl px-4 py-3 transition-colors hover:border-gray-200 ${
      file.status === "replaced" ? "border-gray-100 opacity-75" : "border-gray-100"
    }`}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="shrink-0 mt-0.5">
          {fileIcons[file.type] || fileIcons.default}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-medium text-gray-800">{file.name}</p>
            {statusBadge[file.status]}
          </div>
          <p className="text-xs text-gray-400 mt-0.5">
            Uploaded by {file.uploadedBy} · {file.uploadedAt}
          </p>
          <p className="text-xs text-gray-400">
            Version {file.version} {file.replaces && `· Replaces: ${file.replaces}`} · {file.size}
          </p>
          {file.note && (
            <p className="text-xs text-gray-500 italic mt-1">"{file.note}"</p>
          )}
          {file.status === "replaced" && (
            <p className="text-xs text-amber-500 font-medium mt-0.5">⚠ Older version</p>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="flex items-center gap-2 mt-3 flex-wrap">
        <button className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
          </svg>
          Preview
        </button>
        <button className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Download
        </button>
        <button
          onClick={onHistory}
          className="flex items-center gap-1.5 text-xs border border-gray-200 text-gray-600 px-2.5 py-1.5 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          View History
        </button>
        {file.status === "locked" && (
          <span className="text-xs text-red-500 flex items-center gap-1 ml-1">
            🔒 Locked — cannot be replaced
          </span>
        )}
      </div>
    </div>
  );
}

function HistoryModal({ file, onClose }) {
  const history = [
    { version: "v2", date: "Mar 11, 2026 · 4:20 PM", by: "Sara M.", action: "Replaced v1 with updated screens", status: "Current" },
    { version: "v1", date: "Mar 9, 2026 · 2:00 PM", by: "Sara M.", action: "Initial upload", status: "Replaced" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <div>
            <p className="text-sm font-semibold text-gray-800">File History</p>
            <p className="text-xs text-gray-400">{file.name}</p>
          </div>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-3">
          {history.map((h, i) => (
            <div key={i} className="flex gap-3 items-start">
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${
                h.status === "Current" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-500"
              }`}>
                {h.version}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-xs font-medium text-gray-800">{h.action}</p>
                  <span className={`text-xs px-1.5 py-0.5 rounded-md ${
                    h.status === "Current" ? "bg-green-50 text-green-600" : "bg-gray-100 text-gray-500"
                  }`}>{h.status}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{h.date} · by {h.by}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pb-4 flex justify-end">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Close</button>
        </div>
      </div>
    </div>
  );
}

function RequestDeliverableModal({ onClose }) {
  const [milestone, setMilestone] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">Request Deliverable</p>
          <button onClick={onClose} className="w-7 h-7 rounded-lg hover:bg-gray-100 flex items-center justify-center text-gray-400">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-5 space-y-4">
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Milestone</label>
            <select
              value={milestone}
              onChange={(e) => setMilestone(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 bg-white"
            >
              <option value="">Select milestone</option>
              {milestoneGroups.map((m) => (
                <option key={m.id} value={m.label}>{m.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">What do you need?</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the deliverable you are requesting..."
              rows={3}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300 resize-none placeholder-gray-300"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-600 mb-1">Expected by</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
          </div>
        </div>
        <div className="px-5 pb-4 flex justify-end gap-2">
          <button onClick={onClose} className="text-sm px-4 py-2 rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Cancel</button>
          <button
            onClick={onClose}
            disabled={!milestone || !description}
            className={`text-sm px-4 py-2 rounded-lg font-medium ${
              milestone && description ? "bg-green-600 text-white hover:bg-green-700" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Send Request
          </button>
        </div>
      </div>
    </div>
  );
}