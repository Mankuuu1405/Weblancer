import { useState } from "react";

// ── Files Data ─────────────────────────────────────────
const milestones = [
  {
    id: 1,
    label: "MILESTONE 1: DESIGN & PLANNING",
    status: null,
    files: [
      {
        id: 1,
        name: "wireframes_v2.pdf",
        type: "pdf",
        icon: "doc",
        status: "APPROVED",
        uploadedBy: "Sara M. (freelancer)",
        date: "Mar 11, 4:20 PM",
        version: "Version 2 of 2",
        replaces: "wireframes_v1.pdf",
        note: "Updated screens 5 and 9 per meeting notes",
        hasHistory: true,
        older: false,
      },
      {
        id: 2,
        name: "wireframes_v1.pdf",
        type: "pdf",
        icon: "doc",
        status: "REPLACED",
        uploadedBy: "Sara M. (freelancer)",
        date: "Mar 9, 2:00 PM",
        version: "Version 1 of 2",
        replaces: null,
        note: null,
        hasHistory: true,
        older: true,
      },
      {
        id: 3,
        name: "design_system.fig",
        type: "fig",
        icon: "palette",
        status: "APPROVED",
        uploadedBy: "Sara M. (freelancer)",
        date: "Mar 10, 11:00 AM",
        version: "Version 1 of 1",
        replaces: null,
        note: null,
        hasHistory: false,
        older: false,
      },
      {
        id: 4,
        name: "tech_architecture.pdf",
        type: "pdf",
        icon: "doc",
        status: "APPROVED",
        uploadedBy: "Sara M. (freelancer)",
        date: "Mar 8, 3:30 PM",
        version: "Version 1 of 1",
        replaces: null,
        note: null,
        hasHistory: false,
        older: false,
      },
    ],
  },
  {
    id: 2,
    label: "MILESTONE 2: CORE DEVELOPMENT",
    status: "IN PROGRESS",
    files: [],
  },
  {
    id: 3,
    label: "MILESTONE 3: ADVANCED FEATURES",
    status: null,
    files: [],
  },
  {
    id: 4,
    label: "MILESTONE 4: TESTING & LAUNCH",
    status: null,
    files: [],
  },
];

const projectDocs = [
  { id: 1, name: "Contract.pdf (signed)", icon: "doc" },
  { id: 2, name: "NDA.pdf (signed)", icon: "doc" },
];

// ── Icons ──────────────────────────────────────────────
const IconUpload = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="17 8 12 3 7 8" />
    <line x1="12" y1="3" x2="12" y2="15" />
  </svg>
);
const IconDownload = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);
const IconEye = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const IconHistory = () => (
  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="1 4 1 10 7 10" />
    <path d="M3.51 15a9 9 0 1 0 .49-4.5" />
  </svg>
);
const IconDoc = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
  </svg>
);
const IconPalette = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#f97316" strokeWidth="1.5">
    <circle cx="12" cy="12" r="10" />
    <circle cx="8" cy="14" r="1.5" fill="#ef4444" stroke="none" />
    <circle cx="12" cy="8" r="1.5" fill="#3b82f6" stroke="none" />
    <circle cx="16" cy="14" r="1.5" fill="#22c55e" stroke="none" />
  </svg>
);
const IconBox = () => <span className="text-base">📦</span>;
const IconRequest = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="12" y1="18" x2="12" y2="12" />
    <line x1="9" y1="15" x2="15" y2="15" />
  </svg>
);

// ── File Row Component ─────────────────────────────────
function FileRow({ file }) {
  return (
    <div className={"bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 " + (file.older ? "opacity-70" : "")}>
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className="mt-0.5 flex-shrink-0">
          {file.icon === "palette" ? <IconPalette /> : <IconDoc />}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2 mb-1">
            <span className="font-semibold text-gray-900 text-sm">{file.name}</span>

            {/* Status badge */}
            {file.status === "APPROVED" && (
              <span className="inline-flex items-center gap-1 bg-green-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">
                ✓ APPROVED
              </span>
            )}
            {file.status === "REPLACED" && (
              <span className="inline-flex items-center gap-1 bg-gray-100 text-gray-500 text-xs font-bold px-2 py-0.5 rounded-md border border-gray-200">
                REPLACED
              </span>
            )}
          </div>

          <p className="text-xs text-gray-400">
            Uploaded by: {file.uploadedBy} · {file.date}
          </p>
          <p className="text-xs text-gray-400 mt-0.5">
            {file.version}
            {file.replaces && <span> · Replaces: {file.replaces}</span>}
          </p>

          {file.note && (
            <p className="text-xs text-gray-500 italic mt-1">"{file.note}"</p>
          )}
          {file.older && (
            <p className="text-xs text-amber-500 font-medium mt-1 flex items-center gap-1">
              ⚠ Older version
            </p>
          )}

          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 mt-3">
            <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <IconEye /> Preview
            </button>
            <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
              <IconDownload /> Download
            </button>
            {file.hasHistory && (
              <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                <IconHistory /> View History
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── FilesView Component ────────────────────────────────
export default function FilesView() {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">

      {/* ── Header ── */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-3 md:px-6 py-3 md:py-4 bg-white border-b border-gray-200 flex-shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-xl">📁</span>
          <h2 className="text-sm md:text-base font-bold text-gray-900">Project Files</h2>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <IconUpload /> Upload File
          </button>
          <button className="inline-flex items-center gap-1.5 border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
            <IconRequest /> Request Deliverable
          </button>
        </div>
      </div>

      {/* ── Scrollable Content ── */}
      <div className="flex-1 overflow-y-auto px-3 md:px-6 py-4 space-y-6 md:space-y-8">

        {/* Milestones */}
        {milestones.map((ms) => (
          <div key={ms.id}>
            {/* Milestone label */}
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs font-bold tracking-widest uppercase text-gray-400">
                {ms.label}
              </span>
              {ms.status && (
                <span className="text-xs font-bold text-blue-500">({ms.status})</span>
              )}
            </div>

            {/* Files list or empty state */}
            {ms.files.length === 0 ? (
              <div className="bg-white border border-gray-200 rounded-xl px-5 py-4 flex items-center gap-2 text-gray-400">
                <IconBox />
                <span className="text-sm">No files submitted yet for this milestone.</span>
              </div>
            ) : (
              <div className="space-y-3">
                {ms.files.map((file) => (
                  <FileRow key={file.id} file={file} />
                ))}
              </div>
            )}
          </div>
        ))}

        {/* Project Documents */}
        <div>
          <div className="mb-3">
            <span className="text-xs font-bold tracking-widest uppercase text-gray-500">
              Project Documents
            </span>
          </div>
          <div className="space-y-3">
            {projectDocs.map((doc) => (
              <div key={doc.id} className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 flex items-center gap-3">
                <IconDoc />
                <span className="text-sm font-medium text-gray-700 flex-1">{doc.name}</span>
                <button className="border border-gray-200 rounded-lg px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                  View
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom padding */}
        <div className="h-4" />
      </div>
    </div>
  );
}