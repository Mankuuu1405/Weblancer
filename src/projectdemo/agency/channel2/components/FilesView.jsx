import { useState, useRef } from "react";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};
const FONT = "'Poppins', sans-serif";

const dummyFiles = [
  { id: "f1", name: "wireframes_v2.pdf", type: "pdf", milestone: "Milestone 1: UI Design", milestoneStatus: "completed", uploadedBy: "Sara M.", uploadedByRole: "developer", uploadedAt: "Mar 11, 2026 · 4:20 PM", version: "2 of 2", replaces: "wireframes_v1.pdf", note: "Updated screens 5 and 9 per meeting notes", status: "approved", size: "2.4 MB" },
  { id: "f2", name: "wireframes_v1.pdf", type: "pdf", milestone: "Milestone 1: UI Design", milestoneStatus: "completed", uploadedBy: "Sara M.", uploadedByRole: "developer", uploadedAt: "Mar 9, 2026 · 2:00 PM", version: "1 of 2", replaces: null, note: null, status: "replaced", size: "2.1 MB" },
  { id: "f3", name: "design_system.fig", type: "fig", milestone: "Milestone 1: UI Design", milestoneStatus: "completed", uploadedBy: "Priya S.", uploadedByRole: "designer", uploadedAt: "Mar 10, 2026 · 11:00 AM", version: "1 of 1", replaces: null, note: null, status: "approved", size: "5.8 MB" },
  { id: "f4", name: "tech_architecture.pdf", type: "pdf", milestone: "Milestone 1: UI Design", milestoneStatus: "completed", uploadedBy: "Dev Mike", uploadedByRole: "developer", uploadedAt: "Mar 8, 2026 · 3:30 PM", version: "1 of 1", replaces: null, note: null, status: "approved", size: "1.2 MB" },
];

const milestoneGroups = [
  { id: "m1", label: "Milestone 1: UI Design", status: "completed" },
  { id: "m2", label: "Milestone 2: Backend API", status: "in_progress" },
  { id: "m3", label: "Milestone 3: Mobile App", status: "pending" },
  { id: "m4", label: "Milestone 4: Testing & Launch", status: "pending" },
];

const projectDocs = [
  { id: "d1", name: "project_brief.pdf", type: "pdf", uploadedBy: "Raj Kumar", uploadedByRole: "agency_admin", uploadedAt: "Mar 5, 2026 · 10:00 AM", status: "active", size: "0.8 MB" },
  { id: "d2", name: "nda_signed.pdf", type: "pdf", uploadedBy: "Platform Admin", uploadedByRole: "platform_admin", uploadedAt: "Mar 5, 2026 · 9:30 AM", status: "locked", size: "0.3 MB" },
];

const fileIcons = {
  pdf: (
    <svg width="20" height="20" color={G.red} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
  fig: (
    <div style={{ width: 20, height: 20, borderRadius: 4, background: "#8b5cf6", display: "flex", alignItems: "center", justifyContent: "center", color: G.white, fontSize: 10, fontWeight: 800 }}>F</div>
  ),
  doc: (
    <svg width="20" height="20" color={G.blue} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
    </svg>
  ),
  default: (
    <svg width="20" height="20" color={G.muted} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
    </svg>
  ),
};

const badgeSty = { display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 99 };
const statusBadge = {
  approved: <span style={{ ...badgeSty, background: G.greenBg, color: G.greenDeep, border: `1px solid ${G.greenBorder}` }}>✓ Approved</span>,
  replaced: <span style={{ ...badgeSty, background: G.bg, color: G.sub, border: `1px solid ${G.border}` }}>↩ Replaced</span>,
  pending:  <span style={{ ...badgeSty, background: G.amberBg, color: "#92400e", border: `1px solid ${G.amberBorder}` }}>⏳ Pending</span>,
  active:   <span style={{ ...badgeSty, background: G.blueBg, color: G.blue, border: `1px solid ${G.blueBorder}` }}>● Active</span>,
  locked:   <span style={{ ...badgeSty, background: G.redBg, color: "#dc2626", border: `1px solid ${G.redBorder}` }}>🔒 Locked</span>,
};

const actionBtnSty = { display: "inline-flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, fontFamily: FONT, background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}`, padding: "5px 12px", borderRadius: 8, cursor: "pointer" };

export default function FilesView({ project }) {
  const [showUpload, setShowUpload] = useState(false);
  const [showHistory, setShowHistory] = useState(null);
  const [showRequestDeliverable, setShowRequestDeliverable] = useState(false);
  const [files, setFiles] = useState(dummyFiles);
  const fileInputRef = useRef(null);

  const getFilesForMilestone = (milestoneLabel) => files.filter((f) => f.milestone === milestoneLabel);

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

  const pillBtn = (primary = false) => ({
    display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, fontWeight: 700, fontFamily: FONT, padding: "7px 16px", borderRadius: 100, cursor: "pointer",
    ...(primary ? { background: G.gradNavy, color: G.white, border: "none", boxShadow: "0 3px 12px rgba(15,26,59,0.25)" } : { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` }),
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, overflow: "hidden", background: G.bg, fontFamily: FONT }}>
      
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "14px 20px", background: G.white, borderBottom: `1px solid ${G.greenBorder}`, flexShrink: 0, flexWrap: "wrap", gap: 10, boxShadow: "0 2px 8px rgba(110,192,48,0.06)" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{ fontSize: 20 }}>📁</span>
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 800, color: G.text, margin: 0 }}>Project Files</h2>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{files.length} files · Milestone deliverables and docs</p>
          </div>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <button onClick={() => setShowRequestDeliverable(true)} style={pillBtn()}>
            Request Deliverable
          </button>
          <button onClick={() => fileInputRef.current?.click()} style={pillBtn(true)}>
            <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
            </svg>
            Upload File
          </button>
          <input ref={fileInputRef} type="file" style={{ display: "none" }} onChange={handleUpload} />
        </div>
      </div>

      {/* Content */}
      <div style={{ flex: 1, overflowY: "auto", padding: 20, display: "flex", flexDirection: "column", gap: 24 }}>
        
        {/* Milestone groups */}
        {milestoneGroups.map((mg) => {
          const mgFiles = getFilesForMilestone(mg.label);
          return (
            <div key={mg.id}>
              {/* Milestone label */}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
                <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: 0 }}>{mg.label}</p>
                {mg.status === "in_progress" && (
                  <span style={{ fontSize: 10, fontWeight: 700, color: G.greenDeep }}>(In Progress)</span>
                )}
              </div>

              {mgFiles.length === 0 ? (
                <div style={{ background: G.white, border: `1px dashed ${G.greenBorder}`, borderRadius: 12, padding: "14px 16px", display: "flex", alignItems: "center", gap: 10 }}>
                  <span style={{ fontSize: 16 }}>📦</span>
                  <p style={{ fontSize: 12, color: G.muted, margin: 0, fontWeight: 500 }}>No files submitted yet for this milestone.</p>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                  {mgFiles.map((file) => (
                    <FileCard key={file.id} file={file} onHistory={() => setShowHistory(file)} />
                  ))}
                </div>
              )}
            </div>
          );
        })}

        {/* Project Documents */}
        <div>
          <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", margin: "0 0 12px 0" }}>Project Documents</p>
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {projectDocs.map((file) => (
              <FileCard key={file.id} file={file} onHistory={() => setShowHistory(file)} isDoc />
            ))}
          </div>
        </div>
        <div style={{ height: 16 }} />
      </div>

      {/* History Modal */}
      {showHistory && <HistoryModal file={showHistory} onClose={() => setShowHistory(null)} />}

      {/* Request Deliverable Modal */}
      {showRequestDeliverable && <RequestDeliverableModal onClose={() => setShowRequestDeliverable(false)} />}
    </div>
  );
}

function FileCard({ file, onHistory, isDoc }) {
  const isReplaced = file.status === "replaced";

  return (
    <div style={{ 
      background: G.white, border: `1px solid ${isReplaced ? G.border : G.greenBorder}`, 
      borderRadius: 14, padding: "16px 20px", opacity: isReplaced ? 0.7 : 1,
      boxShadow: isReplaced ? "none" : "0 2px 8px rgba(110,192,48,0.04)"
    }}>
      <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>
        
        {/* Icon */}
        <div style={{ flexShrink: 0, marginTop: 2 }}>
          {fileIcons[file.type] || fileIcons.default}
        </div>

        {/* Info */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>{file.name}</p>
            {statusBadge[file.status]}
          </div>
          <p style={{ fontSize: 11, color: G.muted, margin: "0 0 2px 0", fontWeight: 500 }}>
            Uploaded by {file.uploadedBy} · {file.uploadedAt}
          </p>
          <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>
            Version {file.version} {file.replaces && `· Replaces: ${file.replaces}`} · {file.size}
          </p>
          
          {file.note && (
            <div style={{ background: G.greenBg, borderLeft: `3px solid ${G.green}`, padding: "6px 12px", borderRadius: "0 6px 6px 0", marginTop: 8 }}>
              <p style={{ fontSize: 12, color: G.sub, margin: 0, fontStyle: "italic" }}>"{file.note}"</p>
            </div>
          )}
          
          {isReplaced && (
            <p style={{ fontSize: 11, color: "#92400e", fontWeight: 700, margin: "6px 0 0 0" }}>⚠ Older version</p>
          )}

          {/* Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 12, flexWrap: "wrap" }}>
            <button style={actionBtnSty}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
              Preview
            </button>
            <button style={actionBtnSty}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Download
            </button>
            <button onClick={onHistory} style={actionBtnSty}>
              <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              History
            </button>
            {file.status === "locked" && (
              <span style={{ fontSize: 11, color: "#dc2626", fontWeight: 600, marginLeft: 4 }}>
                🔒 Locked
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Modals ───────────────────────────────────────────

function ModalShell({ title, subtitle, onClose, children }) {
  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,26,59,0.35)", padding: 16 }}>
      <div style={{ background: G.white, borderRadius: 20, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 8px 40px rgba(15,26,59,0.18)" }}>
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <span style={{ fontSize: 14, fontWeight: 800, color: G.greenDeep, display: "block" }}>{title}</span>
            {subtitle && <span style={{ fontSize: 11, color: G.sub, fontWeight: 500 }}>{subtitle}</span>}
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: G.muted, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: 20 }}>{children}</div>
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
    <ModalShell title="File History" subtitle={file.name} onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
        {history.map((h, i) => (
          <div key={i} style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
            <div style={{ 
              width: 28, height: 28, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
              fontSize: 11, fontWeight: 700, 
              background: h.status === "Current" ? G.greenBg : G.bg, 
              color: h.status === "Current" ? G.greenDeep : G.sub,
              border: `1px solid ${h.status === "Current" ? G.greenBorder : G.border}`
            }}>
              {h.version}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{h.action}</p>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 6px", borderRadius: 4, background: h.status === "Current" ? G.greenBg : G.bg, color: h.status === "Current" ? G.greenDeep : G.sub }}>
                  {h.status}
                </span>
              </div>
              <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0 0" }}>{h.date} · by {h.by}</p>
            </div>
          </div>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 24 }}>
        <button onClick={onClose} style={{ padding: "7px 16px", borderRadius: 100, border: `1px solid ${G.greenBorder}`, background: G.white, color: G.sub, fontSize: 12, fontWeight: 700, cursor: "pointer", fontFamily: FONT }}>
          Close
        </button>
      </div>
    </ModalShell>
  );
}

function RequestDeliverableModal({ onClose }) {
  const [milestone, setMilestone] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const fieldLabel = { fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", display: "block", marginBottom: 6 };
  const inputSty = { width: "100%", border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "9px 14px", fontSize: 13, fontFamily: FONT, color: G.text, background: G.white, outline: "none", boxSizing: "border-box" };
  const btnSty = (primary = false, disabled = false) => ({
    padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: FONT, cursor: disabled ? "not-allowed" : "pointer",
    ...(primary 
      ? { background: disabled ? G.border : G.gradNavy, color: disabled ? G.muted : G.white, border: "none", boxShadow: disabled ? "none" : "0 3px 12px rgba(15,26,59,0.25)" } 
      : { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` })
  });

  return (
    <ModalShell title="Request Deliverable" onClose={onClose}>
      <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
        <div>
          <label style={fieldLabel}>Milestone</label>
          <select value={milestone} onChange={(e) => setMilestone(e.target.value)} style={inputSty}>
            <option value="">Select milestone...</option>
            {milestoneGroups.map((m) => (
              <option key={m.id} value={m.label}>{m.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label style={fieldLabel}>What do you need?</label>
          <textarea
            value={description} onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the deliverable you are requesting..."
            rows={3} style={{ ...inputSty, resize: "none" }}
          />
        </div>
        <div>
          <label style={fieldLabel}>Expected by</label>
          <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} style={inputSty} />
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 20 }}>
        <button onClick={onClose} style={btnSty()}>Cancel</button>
        <button 
          onClick={onClose} 
          disabled={!milestone || !description} 
          style={btnSty(true, !milestone || !description)}
        >
          Send Request
        </button>
      </div>
    </ModalShell>
  );
}