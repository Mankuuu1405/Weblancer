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

const ALLOWED_TYPES = [
  "image/png", "image/jpeg", "image/gif", "image/webp",
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "text/plain",
  "application/zip",
];

const MAX_SIZE_MB = 10;

export default function FileUpload({ onFileSelect, onClose }) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validateFile = (file) => {
    if (!ALLOWED_TYPES.includes(file.type)) {
      return "File type not supported. Please upload PDF, Word, Excel, image, or ZIP files.";
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      return `File too large. Maximum size is ${MAX_SIZE_MB}MB.`;
    }
    return null;
  };

  const handleFile = (file) => {
    const err = validateFile(file);
    if (err) {
      setError(err);
      setSelectedFile(null);
      return;
    }
    setError("");
    setSelectedFile(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleConfirm = () => {
    if (!selectedFile) return;
    onFileSelect && onFileSelect(selectedFile);
    onClose && onClose();
  };

  const formatSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  const getFileIcon = (type) => {
    if (type.startsWith("image/")) return "🖼️";
    if (type === "application/pdf") return "📄";
    if (type.includes("word")) return "📝";
    if (type.includes("excel") || type.includes("spreadsheet")) return "📊";
    if (type === "application/zip") return "🗜️";
    return "📁";
  };

  // Button styles
  const btnSty = (primary = false, disabled = false) => ({
    padding: "7px 16px", borderRadius: 100, fontSize: 12, fontWeight: 700, fontFamily: FONT, 
    cursor: disabled ? "not-allowed" : "pointer", display: "inline-flex", alignItems: "center", justifyContent: "center",
    transition: "all 0.2s ease",
    ...(primary 
      ? { 
          background: disabled ? G.bg : G.gradNavy, 
          color: disabled ? G.muted : G.white, 
          border: disabled ? `1px solid ${G.border}` : "none", 
          boxShadow: disabled ? "none" : "0 3px 12px rgba(15,26,59,0.25)" 
        } 
      : { 
          background: G.white, color: G.sub, border: `1px solid ${G.greenBorder}` 
        })
  });

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", background: "rgba(15,26,59,0.35)", padding: 16, fontFamily: FONT }}>
      
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;}`}</style>

      <div style={{ background: G.white, borderRadius: 20, width: "100%", maxWidth: 440, overflow: "hidden", boxShadow: "0 8px 40px rgba(15,26,59,0.18)", display: "flex", flexDirection: "column" }}>

        {/* Header - Matches ModalShell */}
        <div style={{ padding: "16px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 18 }}>📎</span>
            <span style={{ fontSize: 14, fontWeight: 800, color: G.greenDeep, display: "block" }}>Attach File</span>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: 18, color: G.muted, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>
            ✕
          </button>
        </div>

        {/* Drop zone */}
        <div style={{ padding: 20 }}>
          <div
            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onDrop={handleDrop}
            onClick={() => inputRef.current?.click()}
            style={{
              border: `2px dashed ${dragOver ? G.green : selectedFile ? G.greenBorder : G.border}`,
              borderRadius: 16, padding: "32px 20px", textAlign: "center", cursor: "pointer",
              background: dragOver ? G.greenBg : selectedFile ? G.bg : G.white,
              transition: "all 0.2s"
            }}
          >
            <input
              ref={inputRef}
              type="file"
              style={{ display: "none" }}
              accept={ALLOWED_TYPES.join(",")}
              onChange={(e) => e.target.files[0] && handleFile(e.target.files[0])}
            />

            {selectedFile ? (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 36 }}>{getFileIcon(selectedFile.type)}</span>
                <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0, maxWidth: 280, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {selectedFile.name}
                </p>
                <p style={{ fontSize: 11, color: G.muted, margin: 0, fontWeight: 500 }}>
                  {formatSize(selectedFile.size)}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }}
                  style={{ fontSize: 11, color: "#dc2626", fontWeight: 700, background: "none", border: "none", cursor: "pointer", marginTop: 4 }}
                >
                  Remove
                </button>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
                <div style={{ width: 48, height: 48, background: G.bg, borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", color: G.muted, border: `1px solid ${G.border}` }}>
                  <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                </div>
                <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "4px 0 0 0" }}>
                  {dragOver ? "Drop file here" : "Click or drag file here"}
                </p>
                <p style={{ fontSize: 11, color: G.muted, margin: 0, fontWeight: 500 }}>
                  PDF, Word, Excel, Image, ZIP · Max {MAX_SIZE_MB}MB
                </p>
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div style={{ marginTop: 14, display: "flex", alignItems: "center", gap: 8, fontSize: 11, fontWeight: 600, color: "#dc2626", background: G.redBg, border: `1px solid ${G.redBorder}`, borderRadius: 10, padding: "10px 14px" }}>
              <svg width="14" height="14" fill="currentColor" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding: "16px 20px", borderTop: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 10, background: G.bg }}>
          <button onClick={onClose} style={btnSty()}>
            Cancel
          </button>
          <button onClick={handleConfirm} disabled={!selectedFile} style={btnSty(true, !selectedFile)}>
            Attach File
          </button>
        </div>
      </div>
    </div>
  );
}