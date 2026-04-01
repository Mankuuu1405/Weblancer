import { useState, useRef, useEffect } from "react";
import {
  ROLES,
  MESSAGE_TYPES,
  CURRENT_USERS,
  INITIAL_MESSAGES,
} from "./ProjectData";

/* ── Freelancer Contracts theme tokens ── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",
  gradGreen:   "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
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
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
};
const FONT = "'Poppins', sans-serif";

/* ── Role → inline style map ── */
const ROLE_INLINE = {
  admin:        { border: G.red,    bg: G.redBg,    badgeBg: G.redBg,    badgeText: G.redText,   badgeBorder: G.redBorder,   label: "ADMIN",        avatarBg: G.red    },
  agency_admin: { border: G.blue,   bg: G.blueBg,   badgeBg: G.blueBg,   badgeText: G.blueText,  badgeBorder: G.blueBorder,  label: "AGENCY ADMIN", avatarBg: G.blue   },
  agency_team:  { border: G.amber,  bg: G.amberBg,  badgeBg: G.amberBg,  badgeText: G.amberText, badgeBorder: G.amberBorder, label: "AGENCY TEAM",  avatarBg: G.amber  },
  client:       { border: G.green,  bg: G.greenBg,  badgeBg: G.greenBg,  badgeText: G.greenDeep, badgeBorder: G.greenBorder, label: "CLIENT",       avatarBg: G.green  },
};

/* ── Msg type → inline style ── */
const TYPE_INLINE = {
  APPROVAL:       { bg: G.greenBg,   text: G.greenDeep, border: G.greenBorder,  icon: "✅" },
  DECISION:       { bg: G.amberBg,   text: G.amberText, border: G.amberBorder,  icon: "🔒" },
  DELIVERY:       { bg: G.blueBg,    text: G.blueText,  border: G.blueBorder,   icon: "📦" },
  "DISPUTE NOTE": { bg: G.redBg,     text: G.redText,   border: G.redBorder,    icon: "⚠️" },
  CLARIFICATION:  { bg: G.purpleBg,  text: G.purpleText,border: G.purpleBorder, icon: "❓" },
};

const ADMIN_MENTION_REASONS = [
  "Payment or escrow concern",
  "Dispute escalation",
  "Policy clarification needed",
  "Deadline extension request",
  "Urgent project risk",
];

const MENTIONABLE_PARTICIPANTS = [
  { name: "Alex R.",         role: "client",       tag: "@Alex R."         },
  { name: "TechCorp Agency", role: "agency_admin", tag: "@TechCorp Agency" },
  { name: "Maya S.",         role: "agency_team",  tag: "@Maya S."         },
  { name: "Dev K.",          role: "agency_team",  tag: "@Dev K."          },
  { name: "Platform Admin",  role: "admin",        tag: "@Platform Admin", requiresReason: true },
];

/* ── Badge ── */
function Badge({ role }) {
  const s = ROLE_INLINE[role] || { badgeBg: G.bg, badgeText: G.muted, badgeBorder: G.border, label: role };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: s.badgeBg, color: s.badgeText, border: `1px solid ${s.badgeBorder}`, padding: "2px 8px", borderRadius: 6, fontFamily: FONT }}>
      {s.label}
    </span>
  );
}

/* ── MsgType Badge ── */
function MsgTypeBadge({ type }) {
  if (!type || type === "Normal") return null;
  const s = TYPE_INLINE[type];
  if (!s) return null;
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 10, fontWeight: 800, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "2px 9px", borderRadius: 99, fontFamily: FONT }}>
      {s.icon} {type}
    </span>
  );
}

/* ── System Message ── */
function SystemMessage({ msg }) {
  return (
    <div style={{ display: "flex", justifyContent: "center", margin: "12px 0" }}>
      <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 14, padding: "10px 20px", textAlign: "center", maxWidth: 560 }}>
        <p style={{ fontSize: 13, color: G.amberText, margin: 0 }}>{msg.content}</p>
        <p style={{ fontSize: 11, color: G.amber, marginTop: 4 }}>{msg.timestamp}</p>
      </div>
    </div>
  );
}

/* ── Chat Bubble ── */
function ChatBubble({ msg }) {
  const s = ROLE_INLINE[msg.role] || ROLE_INLINE.client;

  const renderContent = (text) => {
    const parts = text.split(/(@[\w][\w\s.]*)/g);
    return parts.map((part, i) =>
      part.startsWith("@")
        ? <span key={i} style={{ background: G.blueBg, color: G.blueText, borderRadius: 4, padding: "0 5px", fontWeight: 600 }}>{part}</span>
        : <span key={i}>{part}</span>
    );
  };

  return (
    <div style={{ borderRadius: 14, borderLeft: `4px solid ${s.border}`, padding: "12px 16px", marginBottom: 8, background: s.bg }}>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap" }}>
          <div style={{ width: 32, height: 32, borderRadius: "50%", background: s.avatarBg + "25", border: `2px solid ${s.avatarBg}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: s.avatarBg, flexShrink: 0 }}>
            {msg.avatar}
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{msg.sender}</span>
          <Badge role={msg.role} />
          <MsgTypeBadge type={msg.msgType} />
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span style={{ fontSize: 11, color: G.muted }}>⏱ {msg.timestamp}</span>
          <button style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, fontSize: 16 }}>⋮</button>
        </div>
      </div>

      {/* Locked label */}
      {msg.locked && msg.lockedLabel && (
        <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: G.amberText, fontWeight: 700, marginBottom: 8 }}>
          🔒 <span>{msg.lockedLabel}</span>
        </div>
      )}

      <p style={{ fontSize: 13, color: G.text, lineHeight: 1.6, margin: 0 }}>{renderContent(msg.content)}</p>

      {/* Commitment */}
      {msg.commitmentLogged && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: G.redText, fontWeight: 600 }}>
          🔴 Commitment logged by system
        </div>
      )}

      {/* Files */}
      {msg.files && (
        <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 8 }}>
          {msg.files.map((f, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 10, padding: "8px 14px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 14 }}>📄</span>
                <span style={{ fontSize: 13, color: G.text }}>{f.name}</span>
                <span style={{ fontSize: 11, color: G.muted }}>{f.size}</span>
              </div>
              <button style={{ fontSize: 11, fontWeight: 700, color: G.greenDeep, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 8, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>Download</button>
            </div>
          ))}
        </div>
      )}

      {/* Seen by */}
      {msg.seenBy && (
        <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: G.muted }}>
          <span>✓✓</span>
          <span>Seen by: {msg.seenBy.join(" · ")}</span>
        </div>
      )}
    </div>
  );
}

/* ── Admin Mention Modal ── */
function AdminMentionModal({ mentionsUsed, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");
  const remaining = 3 - mentionsUsed;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(17,24,39,0.45)", backdropFilter: "blur(4px)", zIndex: 50, display: "flex", alignItems: "center", justifyContent: "center", padding: 20 }}>
      <div style={{ background: G.white, borderRadius: 20, boxShadow: "0 32px 80px rgba(15,26,59,0.22)", width: "100%", maxWidth: 440, overflow: "hidden" }}>
        {/* Header */}
        <div style={{ background: G.gradNavy, padding: "18px 22px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 20 }}>🔴</span>
            <p style={{ fontSize: 16, fontWeight: 800, color: G.white, margin: 0, fontFamily: FONT }}>Mention Platform Admin</p>
          </div>
          <p style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 6 }}>
            Admin mentions are rate-limited. You have{" "}
            <span style={{ fontWeight: 800, color: remaining <= 1 ? "#fca5a5" : G.greenLight }}>{remaining} mention{remaining !== 1 ? "s" : ""}</span> remaining today.
          </p>
        </div>

        <div style={{ padding: "20px 22px" }}>
          <div style={{ background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 12, padding: "12px 14px", marginBottom: 16 }}>
            <p style={{ fontSize: 12, color: G.amberText, margin: 0 }}>⚠️ Mentioning admin creates an alert and requires a valid reason. Misuse reduces your trust score.</p>
          </div>

          <label style={{ fontSize: 12, fontWeight: 700, color: G.sub, display: "block", marginBottom: 10, textTransform: "uppercase", letterSpacing: "0.06em" }}>Select a reason (required):</label>
          <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 20 }}>
            {ADMIN_MENTION_REASONS.map(r => (
              <label key={r} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 12px", borderRadius: 10, border: `1.5px solid ${reason === r ? G.red : G.border}`, background: reason === r ? G.redBg : G.white, cursor: "pointer", transition: "all 0.12s" }}>
                <input type="radio" name="adminReason" checked={reason === r} onChange={() => setReason(r)} style={{ accentColor: G.red }} />
                <span style={{ fontSize: 13, color: G.text }}>{r}</span>
              </label>
            ))}
          </div>

          <div style={{ display: "flex", gap: 10 }}>
            <button onClick={onCancel} style={{ flex: 1, fontSize: 13, fontWeight: 600, fontFamily: FONT, border: `1px solid ${G.greenBorder}`, background: G.white, color: G.sub, borderRadius: 100, padding: "10px", cursor: "pointer" }}>Cancel</button>
            <button disabled={!reason} onClick={() => onConfirm(reason)}
              style={{ flex: 1, fontSize: 13, fontWeight: 700, fontFamily: FONT, background: reason ? G.redText : G.border, color: G.white, border: "none", borderRadius: 100, padding: "10px", cursor: reason ? "pointer" : "not-allowed", boxShadow: reason ? "0 3px 12px rgba(220,38,38,0.25)" : "none" }}>
              Confirm Mention
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Mention Dropdown ── */
function MentionDropdown({ viewingAs, adminMentionsUsed, onSelect, onClose }) {
  const me = CURRENT_USERS[viewingAs];
  const filtered = MENTIONABLE_PARTICIPANTS.filter(p => {
    if (p.name === me.name) return false;
    if (viewingAs === "agency_team" && p.role === "admin") return false;
    return true;
  });

  return (
    <div style={{ position: "absolute", bottom: "100%", marginBottom: 8, left: 0, background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 14, boxShadow: "0 8px 32px rgba(15,26,59,0.12)", zIndex: 20, width: 280, paddingBottom: 8 }}>
      <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid ${G.greenBorder}`, marginBottom: 4 }}>
        <p style={{ fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.08em", margin: 0 }}>Mention a participant</p>
      </div>
      {filtered.map(p => {
        const s = ROLE_INLINE[p.role] || ROLE_INLINE.client;
        const disabled = p.requiresReason && adminMentionsUsed >= 3;
        return (
          <button key={p.name} onClick={() => !disabled && onSelect(p)} disabled={disabled}
            style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 14px", background: "none", border: "none", cursor: disabled ? "not-allowed" : "pointer", opacity: disabled ? 0.4 : 1, transition: "background 0.1s" }}
            onMouseEnter={e => { if (!disabled) e.currentTarget.style.background = G.greenBg; }}
            onMouseLeave={e => { e.currentTarget.style.background = "none"; }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: s.avatarBg + "20", border: `1.5px solid ${s.avatarBg}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: s.avatarBg }}>
                {p.name.charAt(0)}
              </div>
              <span style={{ fontSize: 13, color: G.text, fontWeight: 500 }}>{p.name}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <Badge role={p.role} />
              {p.requiresReason && adminMentionsUsed < 3 && <span style={{ fontSize: 10, color: G.amberText, fontWeight: 600 }}>needs reason</span>}
              {p.requiresReason && adminMentionsUsed >= 3 && <span style={{ fontSize: 10, color: G.redText, fontWeight: 600 }}>🔒 limit reached</span>}
            </div>
          </button>
        );
      })}

      {viewingAs === "agency_team" && (
        <div style={{ padding: "8px 14px", borderTop: `1px solid ${G.greenBorder}`, marginTop: 4 }}>
          <p style={{ fontSize: 11, color: G.amberText, background: G.amberBg, borderRadius: 8, padding: "6px 10px", margin: 0 }}>🔒 Agency team members cannot mention Admin directly. Contact your Agency Admin to escalate.</p>
        </div>
      )}

      {viewingAs !== "agency_team" && (
        <div style={{ padding: "8px 14px", borderTop: `1px solid ${G.greenBorder}`, marginTop: 4 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <span style={{ fontSize: 11, color: G.muted }}>Admin mentions today:</span>
            <div style={{ display: "flex", gap: 4 }}>
              {[0, 1, 2].map(i => (
                <div key={i} style={{ width: 8, height: 8, borderRadius: "50%", background: i < adminMentionsUsed ? G.amber : G.border }} />
              ))}
            </div>
            <span style={{ fontSize: 11, color: G.muted }}>{3 - adminMentionsUsed}/3 left</span>
          </div>
        </div>
      )}

      <button onClick={onClose} style={{ width: "100%", textAlign: "center", fontSize: 11, color: G.muted, padding: "8px", background: "none", border: "none", borderTop: `1px solid ${G.greenBorder}`, marginTop: 4, cursor: "pointer", fontFamily: FONT }}
        onMouseEnter={e => e.currentTarget.style.color = G.text}
        onMouseLeave={e => e.currentTarget.style.color = G.muted}>
        Close
      </button>
    </div>
  );
}

/* ── Main Component ── */
export default function AgencyProjectStreamChat({ viewingAs }) {
  const [messages,            setMessages]            = useState(INITIAL_MESSAGES);
  const [input,               setInput]               = useState("");
  const [msgType,             setMsgType]             = useState("Normal");
  const [showTypeDropdown,    setShowTypeDropdown]     = useState(false);
  const [showBanner,          setShowBanner]           = useState(true);
  const [pinnedExpanded,      setPinnedExpanded]       = useState(false);
  const [showMentionDropdown, setShowMentionDropdown]  = useState(false);
  const [showAdminModal,      setShowAdminModal]       = useState(false);
  const [pendingMention,      setPendingMention]       = useState(null);
  const [adminMentionsUsed,   setAdminMentionsUsed]    = useState(1);
  const [attachedFiles,       setAttachedFiles]        = useState([]);
  const bottomRef    = useRef(null);
  const textareaRef  = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef= useRef(null);

  const PINNED_MESSAGES = [
    { icon: "🏢", text: "ProjectStream (Channel A) for 'E-Commerce Platform' has been created...", time: "Mar 1, 10:00 AM" },
    { icon: "🔒", text: "Persistent filters confirmed as Milestone 1 requirement. Dev K. will implement...", time: "Mar 2, 12:30 PM" },
    { icon: "📦", text: "Milestone 1 deliverables submitted. Frontend prototype includes: product listing...", time: "Mar 20, 5:10 PM" },
    { icon: "✅", text: "The prototype looks excellent! Filters work as expected. Approved to proceed...", time: "Mar 22, 2:00 PM" },
    { icon: "🔒", text: "Milestone 1 officially approved. Payment of $21,250 will release within 24h...", time: "Mar 22, 2:30 PM" },
  ];

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages]);

  const currentUser = CURRENT_USERS[viewingAs];

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    setAttachedFiles(prev => [...prev, ...files.map(f => ({ name: f.name, size: formatSize(f.size) }))]);
    e.target.value = "";
  }

  function removeAttached(i) { setAttachedFiles(prev => prev.filter((_, j) => j !== i)); }

  function handleMentionSelect(participant) {
    setShowMentionDropdown(false);
    if (participant.requiresReason) {
      if (adminMentionsUsed >= 3) return;
      setPendingMention(participant);
      setShowAdminModal(true);
    } else {
      insertMention(participant.tag);
    }
  }

  function insertMention(tag) {
    const base = input.endsWith("@") ? input.slice(0, -1) : input;
    setInput(base + tag + " ");
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function handleAdminMentionConfirm(reason) {
    setShowAdminModal(false);
    setAdminMentionsUsed(prev => prev + 1);
    insertMention(pendingMention.tag);
    setMessages(prev => [...prev, {
      id: Date.now(), type: "system",
      content: `⚠️ Admin mentioned by ${currentUser.name} — Reason: "${reason}". Platform Admin has been notified.`,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }]);
    setPendingMention(null);
  }

  function handleInputChange(e) {
    const val = e.target.value;
    setInput(val);
    if (val.endsWith("@")) setShowMentionDropdown(true);
    else if (showMentionDropdown && !val.includes("@")) setShowMentionDropdown(false);
  }

  function sendMessage() {
    if (!input.trim() && attachedFiles.length === 0) return;
    setMessages(prev => [...prev, {
      id: Date.now(),
      role: currentUser.role,
      sender: currentUser.name,
      avatar: currentUser.avatar,
      msgType,
      content: input.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      seenBy: [],
      locked: msgType === "DECISION",
      lockedLabel: msgType === "DECISION" ? "LOCKED DECISION — Cannot be edited or reversed" : null,
      commitmentLogged: msgType === "DECISION" && (viewingAs === "agency_admin" || viewingAs === "admin"),
      files: attachedFiles.length > 0 ? attachedFiles : undefined,
    }]);
    setInput(""); setMsgType("Normal"); setAttachedFiles([]); setShowMentionDropdown(false);
  }

  const iconBtn = (title, onClick, children, extra = {}) => (
    <button title={title} onClick={onClick}
      style={{ padding: 8, background: "none", border: "none", cursor: "pointer", color: G.muted, borderRadius: 8, display: "flex", alignItems: "center", transition: "all 0.12s", ...extra }}
      onMouseEnter={e => { e.currentTarget.style.background = G.greenBg; e.currentTarget.style.color = G.greenDeep; }}
      onMouseLeave={e => { e.currentTarget.style.background = "none"; e.currentTarget.style.color = G.muted; }}>
      {children}
    </button>
  );

  return (
    <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, height: "100%", fontFamily: FONT }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;}`}</style>

      {/* ── Pinned bar ── */}
      <div style={{ background: G.white, borderBottom: `1px solid ${G.greenBorder}`, flexShrink: 0 }}>
        <div style={{ padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: G.sub }}>
            <span>📌</span>
            <span style={{ fontWeight: 700, color: G.amber }}>★ Pinned (5)</span>
          </div>
          <button onClick={() => setPinnedExpanded(!pinnedExpanded)}
            style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, fontSize: 16, transform: pinnedExpanded ? "rotate(0deg)" : "rotate(180deg)", transition: "transform 0.2s" }}>⌃</button>
        </div>
        {pinnedExpanded && (
          <div style={{ borderTop: `1px solid ${G.greenBorder}` }}>
            {PINNED_MESSAGES.map((p, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "9px 16px", borderBottom: i < PINNED_MESSAGES.length - 1 ? `1px solid ${G.border}` : "none", cursor: "pointer", transition: "background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                onMouseLeave={e => e.currentTarget.style.background = "none"}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, minWidth: 0, flex: 1 }}>
                  <span style={{ fontSize: 14, flexShrink: 0 }}>{p.icon}</span>
                  <span style={{ fontSize: 12, color: G.sub, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.text}</span>
                </div>
                <span style={{ fontSize: 11, color: G.muted, flexShrink: 0, marginLeft: 12 }}>{p.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Channel A banner ── */}
      {showBanner && (
        <div style={{ background: G.navyBg, borderBottom: `1px solid ${G.navyBorder}`, padding: "9px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: G.navy, flex: 1 }}>
            <span>📢</span>
            <span><b>Channel A — Official Project Channel.</b> Requirements, deliverables, approvals and disputes are governed here. Only <b>Agency Admin</b> can make binding commitments on behalf of the team.</span>
          </div>
          <button onClick={() => setShowBanner(false)} style={{ background: "none", border: "none", cursor: "pointer", color: G.navyLight, marginLeft: 10, fontSize: 14 }}>✕</button>
        </div>
      )}

      {/* ── Messages ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "16px", display: "flex", flexDirection: "column", gap: 4 }}>
        {messages.map(msg =>
          msg.type === "system"
            ? <SystemMessage key={msg.id} msg={msg} />
            : <ChatBubble key={msg.id} msg={msg} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div style={{ background: G.white, borderTop: `1px solid ${G.greenBorder}`, padding: "12px 16px", flexShrink: 0 }}>

        {/* Type selector */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10, position: "relative" }}>
          <span style={{ fontSize: 12, color: G.muted }}>Type:</span>
          <button onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            style={{ display: "flex", alignItems: "center", gap: 6, border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "5px 14px", fontSize: 12, fontWeight: 600, color: G.greenDeep, background: G.greenBg, cursor: "pointer", fontFamily: FONT }}>
            {msgType} <span style={{ fontSize: 10, color: G.muted }}>▼</span>
          </button>
          {showTypeDropdown && (
            <div style={{ position: "absolute", top: 36, left: 52, background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 12, boxShadow: "0 8px 24px rgba(15,26,59,0.1)", zIndex: 10, minWidth: 180, padding: "6px 0" }}>
              {MESSAGE_TYPES.map(t => (
                <button key={t.label} onClick={() => { setMsgType(t.label); setShowTypeDropdown(false); }}
                  style={{ width: "100%", display: "flex", alignItems: "center", gap: 8, padding: "9px 16px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: G.text, fontFamily: FONT, textAlign: "left" }}
                  onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                  onMouseLeave={e => e.currentTarget.style.background = "none"}>
                  {t.icon} {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Attached files preview */}
        {attachedFiles.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
            {attachedFiles.map((f, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 8, padding: "4px 10px" }}>
                <span style={{ fontSize: 12 }}>📄</span>
                <span style={{ fontSize: 11, color: G.text, maxWidth: 120, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</span>
                <span style={{ fontSize: 10, color: G.muted }}>{f.size}</span>
                <button onClick={() => removeAttached(i)} style={{ background: "none", border: "none", cursor: "pointer", color: G.muted, fontSize: 12, marginLeft: 2 }}
                  onMouseEnter={e => e.currentTarget.style.color = G.redText}
                  onMouseLeave={e => e.currentTarget.style.color = G.muted}>✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Textarea + Send */}
        <div style={{ display: "flex", alignItems: "flex-end", gap: 10 }}>
          <textarea ref={textareaRef} value={input} onChange={handleInputChange}
            onKeyDown={e => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              if (e.key === "Escape") setShowMentionDropdown(false);
            }}
            placeholder="Write your message... (Shift+Enter for new line)"
            rows={2}
            style={{ flex: 1, border: `1.5px solid ${G.greenBorder}`, borderRadius: 14, padding: "10px 14px", fontSize: 13, resize: "none", color: G.text, background: G.white, fontFamily: FONT, minHeight: 52, maxHeight: 128 }}
            onFocus={e => e.target.style.borderColor = G.green}
            onBlur={e => e.target.style.borderColor = G.greenBorder}
          />
          <button onClick={sendMessage}
            style={{ background: G.gradNavy, color: G.white, border: "none", borderRadius: 14, padding: "12px 22px", fontSize: 13, fontWeight: 700, fontFamily: FONT, cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)", whiteSpace: "nowrap" }}>
            ✈ Send
          </button>
        </div>

        {/* Action row */}
        <div style={{ display: "flex", alignItems: "center", gap: 4, marginTop: 10, position: "relative" }}>
          <input ref={fileInputRef}  type="file" multiple style={{ display: "none" }} onChange={handleFileChange} />
          <input ref={imageInputRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={handleFileChange} />

          {iconBtn("Attach file",  () => fileInputRef.current?.click(),
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
          )}
          {iconBtn("Attach image", () => imageInputRef.current?.click(),
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          )}

          {/* @ mention button */}
          <div style={{ position: "relative" }}>
            <button onClick={() => setShowMentionDropdown(!showMentionDropdown)}
              style={{ display: "flex", alignItems: "center", gap: 4, padding: "6px 10px", background: showMentionDropdown ? G.greenBg : "none", border: showMentionDropdown ? `1px solid ${G.greenBorder}` : "1px solid transparent", color: showMentionDropdown ? G.greenDeep : G.muted, borderRadius: 8, cursor: "pointer", fontFamily: FONT, fontSize: 12, fontWeight: 600 }}>
              <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"/></svg>
              {viewingAs !== "agency_team" && (
                <span style={{ fontSize: 11, fontWeight: 800, color: adminMentionsUsed >= 3 ? G.redText : adminMentionsUsed === 2 ? G.amberText : G.muted }}>{3 - adminMentionsUsed}</span>
              )}
            </button>
            {showMentionDropdown && (
              <MentionDropdown viewingAs={viewingAs} adminMentionsUsed={adminMentionsUsed} onSelect={handleMentionSelect} onClose={() => setShowMentionDropdown(false)} />
            )}
          </div>

          {iconBtn("Schedule meeting", () => {},
            <svg width="18" height="18" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          )}

          {adminMentionsUsed >= 3 && viewingAs !== "agency_team" && (
            <span style={{ fontSize: 11, color: G.redText, fontWeight: 600, marginLeft: 4 }}>🔒 Admin mention limit reached</span>
          )}
          {adminMentionsUsed === 2 && viewingAs !== "agency_team" && (
            <span style={{ fontSize: 11, color: G.amberText, marginLeft: 4 }}>⚠ 1 admin mention left today</span>
          )}
        </div>
      </div>

      {showAdminModal && (
        <AdminMentionModal mentionsUsed={adminMentionsUsed} onConfirm={handleAdminMentionConfirm} onCancel={() => { setShowAdminModal(false); setPendingMention(null); }} />
      )}
    </div>
  );
}