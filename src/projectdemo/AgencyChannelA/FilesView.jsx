import { FILES_DATA } from "./ProjectData";

const STATUS_STYLES = {
  APPROVED: "bg-green-100 text-green-700",
  REPLACED: "bg-gray-100 text-gray-500",
  PENDING:  "bg-yellow-100 text-yellow-700",
};

function FileRow({ file }) {
  return (
    <div className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm">
      {/* Top row: icon + name + size */}
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 min-w-0">
          <span className="text-gray-400 text-xl mt-0.5 shrink-0">📄</span>
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-medium text-sm text-gray-800 break-all">{file.name}</span>
              {file.status && (
                <span className={`text-xs font-semibold px-2 py-0.5 rounded-full shrink-0 ${STATUS_STYLES[file.status] || "bg-gray-100 text-gray-500"}`}>
                  {file.status === "APPROVED" && "✅ "}{file.status}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-400 mt-0.5 break-words">
              Uploaded by: {file.uploader} · {file.date}
            </p>
            <p className="text-xs text-gray-400">{file.version}</p>
          </div>
        </div>
        <span className="text-xs text-gray-400 shrink-0 ml-1">{file.size}</span>
      </div>

      {/* Action buttons — wrap on small screens */}
      <div className="flex flex-wrap items-center gap-2 mt-3">
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5">
          👁 Preview
        </button>
        <button className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-800 border border-blue-200 rounded-lg px-3 py-1.5">
          ⬇ Download
        </button>
        <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1.5">
          📋 View History
        </button>
      </div>
    </div>
  );
}

export default function FilesView() {
  return (
    <div className="flex-1 overflow-y-auto p-4 md:p-6">
      {/* Header */}
      <div className="flex items-center justify-between gap-2 mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-800">📁 Project Files</h2>
        <div className="flex items-center gap-2 shrink-0">
          <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 whitespace-nowrap">
            ⬆ <span>Upload</span>
          </button>
          <button className="flex items-center gap-1.5 text-xs text-gray-600 border border-gray-200 rounded-lg px-3 py-2 hover:bg-gray-50 whitespace-nowrap">
            📋 <span>Request</span>
          </button>
        </div>
      </div>

      {/* Milestone sections */}
      {FILES_DATA.milestones.map((ms, i) => (
        <div key={i} className="mb-8">
          <div className="flex items-center gap-2 flex-wrap mb-3">
            <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">{ms.label}</span>
            {ms.status && (
              <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                ms.status === "COMPLETED"    ? "bg-green-100 text-green-700" :
                ms.status === "IN PROGRESS" ? "bg-blue-100 text-blue-700"  :
                "bg-gray-100 text-gray-500"
              }`}>
                {ms.status}
              </span>
            )}
          </div>

          {ms.files.length > 0 ? (
            <div className="space-y-3">
              {ms.files.map((f, fi) => <FileRow key={fi} file={f} />)}
            </div>
          ) : (
            <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl p-4 text-center">
              <p className="text-sm text-gray-400">🟡 No files submitted yet for this milestone.</p>
            </div>
          )}
        </div>
      ))}

      {/* Project Documents */}
      <div className="mb-6">
        <p className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">PROJECT DOCUMENTS</p>
        <div className="space-y-2">
          {FILES_DATA.documents.map((doc, i) => (
            <div key={i} className="flex items-center justify-between gap-2 border border-gray-100 rounded-xl px-4 py-3 bg-white">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-gray-400 shrink-0">📄</span>
                <span className="text-sm text-gray-700 truncate">{doc.name}</span>
              </div>
              <button className="text-sm text-gray-500 hover:text-gray-700 border border-gray-200 rounded-lg px-3 py-1 shrink-0">
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}