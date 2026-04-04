// ── FilesView.jsx ──────────────────────────────────────
import { FILES_DATA } from "./ProjectData";

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

const STATUS_STYLE = {
  APPROVED: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
  REPLACED: { bg: G.bg,       border: G.border,       text: G.muted    },
  PENDING:  { bg: G.amberBg,  border: G.amberBorder,  text: "#92400e"  },
};

const MS_STATUS_STYLE = {
  "COMPLETED":   { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
  "IN PROGRESS": { bg: G.blueBg,   border: G.blueBorder,  text: G.blue      },
};

function StatusChip({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE.REPLACED;
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "2px 8px", borderRadius: 99, fontFamily: FONT }}>
      {status === "APPROVED" ? "✅ " : ""}{status}
    </span>
  );
}

const pillBtn = (primary = false) => ({
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  padding: "7px 14px", borderRadius: 100, cursor: "pointer",
  ...(primary
    ? { background: G.gradNavy, color: G.white, border: "none", boxShadow: "0 3px 10px rgba(15,26,59,0.2)" }
    : { background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` }),
});

function FileRow({ file }) {
  return (
    <div style={{ border: `1px solid ${G.greenBorder}`, borderRadius: 12, padding: "14px 16px", background: G.white, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10 }}>
        <div style={{ display: "flex", alignItems: "flex-start", gap: 12, minWidth: 0 }}>
          <span style={{ fontSize: 20, color: G.muted, flexShrink: 0, marginTop: 2 }}>📄</span>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 4 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: G.text, wordBreak: "break-all" }}>{file.name}</span>
              {file.status && <StatusChip status={file.status} />}
            </div>
            <p style={{ fontSize: 11, color: G.muted, margin: "0 0 2px" }}>Uploaded by: {file.uploader} · {file.date}</p>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{file.version}</p>
          </div>
        </div>
        <span style={{ fontSize: 11, color: G.muted, flexShrink: 0 }}>{file.size}</span>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: 12 }}>
        {[
          { label: "👁 Preview",      primary: false },
          { label: "⬇ Download",      primary: true  },
          { label: "📋 View History", primary: false },
        ].map(({ label, primary }) => (
          <button key={label} style={pillBtn(primary)}>{label}</button>
        ))}
      </div>
    </div>
  );
}

export default function FilesView() {
  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "24px", fontFamily: FONT, background: G.bg }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 24 }}>
        <h2 style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: 0 }}>📁 Project Files</h2>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
          <button style={pillBtn()}>⬆ Upload</button>
          <button style={pillBtn()}>📋 Request</button>
        </div>
      </div>

      {/* Milestone sections */}
      {FILES_DATA.milestones.map((ms, i) => (
        <div key={i} style={{ marginBottom: 32 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 12 }}>
            <span style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep }}>{ms.label}</span>
            {ms.status && (() => {
              const s = MS_STATUS_STYLE[ms.status] || { bg: G.bg, border: G.border, text: G.muted };
              return (
                <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "2px 9px", borderRadius: 99, fontFamily: FONT }}>
                  {ms.status}
                </span>
              );
            })()}
          </div>
          {ms.files.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {ms.files.map((f, fi) => <FileRow key={fi} file={f} />)}
            </div>
          ) : (
            <div style={{ background: G.bg, border: `1.5px dashed ${G.greenBorder}`, borderRadius: 12, padding: 16, textAlign: "center" }}>
              <p style={{ fontSize: 13, color: G.muted, margin: 0 }}>🟡 No files submitted yet for this milestone.</p>
            </div>
          )}
        </div>
      ))}

      {/* Project Documents */}
      <div style={{ marginBottom: 24 }}>
        <p style={{ fontSize: 10, fontWeight: 800, textTransform: "uppercase", letterSpacing: "0.08em", color: G.greenDeep, marginBottom: 12 }}>PROJECT DOCUMENTS</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {FILES_DATA.documents.map((doc, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, border: `1px solid ${G.greenBorder}`, borderRadius: 10, padding: "10px 16px", background: G.white }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0 }}>
                <span style={{ color: G.muted }}>📄</span>
                <span style={{ fontSize: 13, color: G.text, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{doc.name}</span>
              </div>
              <button style={pillBtn()}>View</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}