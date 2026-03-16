import { useState, useRef, useEffect } from "react";
import {
  ROLES,
  MESSAGE_TYPES,
  CURRENT_USERS,
  INITIAL_MESSAGES,
} from "./ProjectData";

// ─── MENTION RULES (from document) ────────────────────────────────────────────
// - Anyone can @mention client, agency admin, agency team members
// - Mentioning Platform Admin requires: reason selection + confirmation dialog
// - Admin mentions are rate-limited: max 3 per project per day
// - Agency team members CANNOT mention admin (must go via Agency Admin)

const MENTIONABLE_PARTICIPANTS = [
  { name: "Alex R.", role: "client", tag: "@Alex R." },
  { name: "TechCorp Agency", role: "agency_admin", tag: "@TechCorp Agency" },
  { name: "Maya S.", role: "agency_team", tag: "@Maya S." },
  { name: "Dev K.", role: "agency_team", tag: "@Dev K." },
  { name: "Platform Admin", role: "admin", tag: "@Platform Admin", requiresReason: true },
];

const ADMIN_MENTION_REASONS = [
  "Payment or escrow concern",
  "Dispute escalation",
  "Policy clarification needed",
  "Deadline extension request",
  "Urgent project risk",
];

// ─── BADGE ─────────────────────────────────────────────────────────────────────
function Badge({ role }) {
  const r = ROLES[role];
  return (
    <span className={`text-xs font-semibold px-2 py-0.5 rounded ${r.badgeClass}`}>
      {r.label}
    </span>
  );
}

// ─── MSG TYPE BADGE ────────────────────────────────────────────────────────────
function MsgTypeBadge({ type }) {
  if (!type || type === "Normal") return null;
  const map = {
    APPROVAL: "bg-green-100 text-green-700",
    DECISION: "bg-orange-100 text-orange-700",
    "DISPUTE NOTE": "bg-red-100 text-red-700",
    CLARIFICATION: "bg-purple-100 text-purple-700",
    DELIVERY: "bg-blue-100 text-blue-700",
  };
  const icons = { APPROVAL: "✅", DECISION: "🔒", DELIVERY: "📦", "DISPUTE NOTE": "⚠️", CLARIFICATION: "❓" };
  return (
    <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${map[type] || "bg-gray-100 text-gray-600"}`}>
      {icons[type]} {type}
    </span>
  );
}

// ─── SYSTEM MESSAGE ────────────────────────────────────────────────────────────
function SystemMessage({ msg }) {
  return (
    <div className="flex justify-center my-3">
      <div className="bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-center max-w-xl">
        <p className="text-sm text-amber-800">{msg.content}</p>
        <p className="text-xs text-amber-500 mt-1">{msg.timestamp}</p>
      </div>
    </div>
  );
}

// ─── CHAT BUBBLE ───────────────────────────────────────────────────────────────
function ChatBubble({ msg }) {
  const r = ROLES[msg.role];

  // Highlight @mentions in blue
  const renderContent = (text) => {
    const parts = text.split(/(@[\w][\w\s.]*)/g);
    return parts.map((part, i) =>
      part.startsWith("@") ? (
        <span key={i} className="bg-blue-100 text-blue-700 rounded px-1 font-medium">
          {part}
        </span>
      ) : (
        <span key={i}>{part}</span>
      )
    );
  };

  return (
    <div className={`rounded-xl p-4 mb-1 ${r.bubbleClass}`}>
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <div className={`w-8 h-8 rounded-full ${r.avatarBg} flex items-center justify-center text-white text-xs font-bold shrink-0`}>
            {msg.avatar}
          </div>
          <span className="font-semibold text-sm text-gray-800">{msg.sender}</span>
          <Badge role={msg.role} />
          <MsgTypeBadge type={msg.msgType} />
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <span className="text-xs text-gray-400">⏱ {msg.timestamp}</span>
          <button className="text-gray-300 hover:text-gray-500 text-sm">⋮</button>
        </div>
      </div>

      {msg.locked && msg.lockedLabel && (
        <div className="flex items-center gap-1 text-xs text-orange-600 font-semibold mb-2">
          🔒 <span>{msg.lockedLabel}</span>
        </div>
      )}

      <p className="text-sm text-gray-700 leading-relaxed">{renderContent(msg.content)}</p>

      {msg.commitmentLogged && (
        <div className="mt-2 flex items-center gap-1 text-xs text-red-500 font-medium">
          🔴 Commitment logged by system
        </div>
      )}

      {msg.files && (
        <div className="mt-3 space-y-2">
          {msg.files.map((f, i) => (
            <div key={i} className="flex items-center justify-between bg-white border border-gray-200 rounded-lg px-3 py-2">
              <div className="flex items-center gap-2">
                <span className="text-gray-400 text-sm">📄</span>
                <span className="text-sm text-gray-700">{f.name}</span>
                <span className="text-xs text-gray-400">{f.size}</span>
              </div>
              <button className="text-xs text-blue-600 font-medium hover:underline">Download</button>
            </div>
          ))}
        </div>
      )}

      {msg.seenBy && (
        <div className="mt-2 flex items-center gap-1 text-xs text-gray-400">
          <span>✓✓</span>
          <span>Seen by: {msg.seenBy.join(" · ")}</span>
        </div>
      )}
    </div>
  );
}

// ─── ADMIN MENTION MODAL ───────────────────────────────────────────────────────
function AdminMentionModal({ mentionsUsed, onConfirm, onCancel }) {
  const [reason, setReason] = useState("");
  const remaining = 3 - mentionsUsed;

  return (
    <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-red-500 text-xl">🔴</span>
          <h3 className="font-bold text-gray-800">Mention Platform Admin</h3>
        </div>
        <p className="text-xs text-gray-500 mb-4">
          Admin mentions are rate-limited. You have{" "}
          <span className={`font-bold ${remaining <= 1 ? "text-red-500" : "text-orange-500"}`}>
            {remaining} mention{remaining !== 1 ? "s" : ""}
          </span>{" "}
          remaining today.
        </p>

        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3 mb-4">
          <p className="text-xs text-yellow-700">
            ⚠️ Mentioning admin creates an alert and requires a valid reason. Misuse reduces your trust score.
          </p>
        </div>

        <label className="block text-sm font-medium text-gray-700 mb-2">Select a reason (required):</label>
        <div className="space-y-2 mb-5">
          {ADMIN_MENTION_REASONS.map((r) => (
            <label
              key={r}
              className={`flex items-center gap-3 p-2.5 rounded-xl border cursor-pointer transition-colors ${
                reason === r ? "border-red-400 bg-red-50" : "border-gray-200 hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name="adminReason"
                checked={reason === r}
                onChange={() => setReason(r)}
                className="accent-red-500"
              />
              <span className="text-sm text-gray-700">{r}</span>
            </label>
          ))}
        </div>

        <div className="flex gap-3">
          <button
            onClick={onCancel}
            className="flex-1 text-sm text-gray-500 border border-gray-200 rounded-xl py-2.5 hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            disabled={!reason}
            onClick={() => onConfirm(reason)}
            className={`flex-1 text-sm font-semibold rounded-xl py-2.5 transition-colors ${
              reason ? "bg-red-500 hover:bg-red-600 text-white" : "bg-gray-100 text-gray-400 cursor-not-allowed"
            }`}
          >
            Confirm Mention
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── MENTION DROPDOWN ──────────────────────────────────────────────────────────
function MentionDropdown({ viewingAs, adminMentionsUsed, onSelect, onClose }) {
  const me = CURRENT_USERS[viewingAs];

  const filtered = MENTIONABLE_PARTICIPANTS.filter((p) => {
    if (p.name === me.name) return false; // don't show yourself
    if (viewingAs === "agency_team" && p.role === "admin") return false; // team can't mention admin
    return true;
  });

  return (
    <div className="absolute bottom-full mb-2 left-0 bg-white border border-gray-200 rounded-xl shadow-xl z-20 w-72 py-2">
      <div className="px-3 py-1.5 border-b border-gray-100 mb-1">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Mention a participant</p>
      </div>

      {filtered.map((p) => (
        <button
          key={p.name}
          onClick={() => onSelect(p)}
          disabled={p.requiresReason && adminMentionsUsed >= 3}
          className={`w-full flex items-center justify-between px-3 py-2.5 transition-colors ${
            p.requiresReason && adminMentionsUsed >= 3
              ? "opacity-40 cursor-not-allowed bg-gray-50"
              : "hover:bg-gray-50"
          }`}
        >
          <div className="flex items-center gap-2">
            <div className={`w-7 h-7 rounded-full ${ROLES[p.role].avatarBg} flex items-center justify-center text-white text-xs font-bold`}>
              {p.name.charAt(0)}
            </div>
            <span className="text-sm text-gray-700">{p.name}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <Badge role={p.role} />
            {p.requiresReason && adminMentionsUsed < 3 && (
              <span className="text-xs text-orange-500 font-medium">needs reason</span>
            )}
            {p.requiresReason && adminMentionsUsed >= 3 && (
              <span className="text-xs text-red-500 font-medium">🔒 limit reached</span>
            )}
          </div>
        </button>
      ))}

      {/* Agency team restriction notice */}
      {viewingAs === "agency_team" && (
        <div className="px-3 py-2 border-t border-gray-100 mt-1">
          <p className="text-xs text-yellow-600 bg-yellow-50 rounded-lg p-2">
            🔒 Agency team members cannot mention Admin directly. Contact your Agency Admin to escalate.
          </p>
        </div>
      )}

      {/* Rate limit indicator */}
      {viewingAs !== "agency_team" && (
        <div className="px-3 py-2 border-t border-gray-100 mt-1">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-400">Admin mentions today:</p>
            <div className="flex gap-1">
              {[0, 1, 2].map((i) => (
                <div key={i} className={`w-2 h-2 rounded-full ${i < adminMentionsUsed ? "bg-orange-400" : "bg-gray-200"}`} />
              ))}
            </div>
            <p className="text-xs text-gray-400">{3 - adminMentionsUsed}/3 left</p>
          </div>
        </div>
      )}

      <button onClick={onClose} className="w-full text-center text-xs text-gray-400 py-1.5 hover:text-gray-600 border-t border-gray-100 mt-1">
        Close
      </button>
    </div>
  );
}

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function AgencyProjectStreamChat({ viewingAs }) {
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [input, setInput] = useState("");
  const [msgType, setMsgType] = useState("Normal");
  const [showTypeDropdown, setShowTypeDropdown] = useState(false);
  const [showBanner, setShowBanner] = useState(true);
  const [pinnedExpanded, setPinnedExpanded] = useState(false);
  const [showMentionDropdown, setShowMentionDropdown] = useState(false);
  const [showAdminModal, setShowAdminModal] = useState(false);
  const [pendingMention, setPendingMention] = useState(null);
  const [adminMentionsUsed, setAdminMentionsUsed] = useState(1); // 1 already used today as demo
  const [attachedFiles, setAttachedFiles] = useState([]);
  const bottomRef = useRef(null);
  const textareaRef = useRef(null);
  const fileInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const PINNED_MESSAGES = [
    { icon: "🏢", text: "ProjectStream (Channel A) for 'E-Commerce Platform' has been created...", time: "Mar 1, 10:00 AM" },
    { icon: "🔒", text: "Persistent filters confirmed as Milestone 1 requirement. Dev K. will implement...", time: "Mar 2, 12:30 PM" },
    { icon: "📦", text: "Milestone 1 deliverables submitted. Frontend prototype includes: product listing...", time: "Mar 20, 5:10 PM" },
    { icon: "✅", text: "The prototype looks excellent! Filters work as expected. Approved to proceed...", time: "Mar 22, 2:00 PM" },
    { icon: "🔒", text: "Milestone 1 officially approved. Payment of $21,250 will release within 24h...", time: "Mar 22, 2:30 PM" },
  ];

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const currentUser = CURRENT_USERS[viewingAs];

  // ── File attach handlers ─────────────────────────────────────────────────────
  function handleFileChange(e) {
    const files = Array.from(e.target.files);
    const mapped = files.map((f) => ({ name: f.name, size: formatSize(f.size) }));
    setAttachedFiles((prev) => [...prev, ...mapped]);
    e.target.value = "";
  }

  function formatSize(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }

  function removeAttached(index) {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  }

  // ── Mention select handler ───────────────────────────────────────────────────
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
    // Remove trailing @ if user typed it before clicking button
    const base = input.endsWith("@") ? input.slice(0, -1) : input;
    setInput(base + tag + " ");
    setTimeout(() => textareaRef.current?.focus(), 0);
  }

  function handleAdminMentionConfirm(reason) {
    setShowAdminModal(false);
    setAdminMentionsUsed((prev) => prev + 1);
    insertMention(pendingMention.tag);
    // System message logged for the escalation
    setMessages((prev) => [
      ...prev,
      {
        id: Date.now(),
        type: "system",
        content: `⚠️ Admin mentioned by ${currentUser.name} — Reason: "${reason}". Platform Admin has been notified and will respond shortly.`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
    setPendingMention(null);
  }

  // ── Typing @ auto-opens mention dropdown ────────────────────────────────────
  function handleInputChange(e) {
    const val = e.target.value;
    setInput(val);
    if (val.endsWith("@")) {
      setShowMentionDropdown(true);
    } else if (showMentionDropdown && !val.includes("@")) {
      setShowMentionDropdown(false);
    }
  }

  // ── Send ─────────────────────────────────────────────────────────────────────
  function sendMessage() {
    if (!input.trim() && attachedFiles.length === 0) return;
    setMessages((prev) => [
      ...prev,
      {
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
      },
    ]);
    setInput("");
    setMsgType("Normal");
    setAttachedFiles([]);
    setShowMentionDropdown(false);
  }

  return (
    <div className="flex-1 flex flex-col min-w-0 h-full">

      {/* ── Pinned bar ── */}
      <div className="bg-white border-b border-gray-100 shrink-0">
        <div className="px-4 py-2 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <span>📌</span>
            <span className="font-medium text-orange-600">★ Pinned (5)</span>
          </div>
          <button
            onClick={() => setPinnedExpanded(!pinnedExpanded)}
            className="text-gray-300 hover:text-gray-500 text-lg leading-none transition-transform duration-200"
            style={{ transform: pinnedExpanded ? "rotate(0deg)" : "rotate(180deg)" }}
          >
            ⌃
          </button>
        </div>
        {pinnedExpanded && (
          <div className="border-t border-gray-100">
            {PINNED_MESSAGES.map((p, i) => (
              <div key={i} className="flex items-center justify-between px-4 py-2 hover:bg-gray-50 cursor-pointer border-b border-gray-50 last:border-0">
                <div className="flex items-center gap-2 min-w-0">
                  <span className="text-sm shrink-0">{p.icon}</span>
                  <span className="text-sm text-gray-600 truncate">{p.text}</span>
                </div>
                <span className="text-xs text-gray-400 shrink-0 ml-4">{p.time}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ── Channel A banner ── */}
      {showBanner && (
        <div className="bg-blue-50 border-b border-blue-200 px-4 py-2 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 text-xs text-blue-700">
            <span>📢</span>
            <span>
              <strong>Channel A — Official Project Channel.</strong> Requirements, deliverables, approvals and disputes
              are governed here. Only <strong>Agency Admin</strong> can make binding commitments on behalf of the team.
            </span>
          </div>
          <button onClick={() => setShowBanner(false)} className="text-blue-400 hover:text-blue-600 ml-2 text-sm">✕</button>
        </div>
      )}

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-2">
        {messages.map((msg) =>
          msg.type === "system" ? <SystemMessage key={msg.id} msg={msg} /> : <ChatBubble key={msg.id} msg={msg} />
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Input area ── */}
      <div className="bg-white border-t border-gray-200 px-4 py-3 shrink-0">

        {/* Message type selector */}
        <div className="flex items-center gap-2 mb-2 relative">
          <span className="text-sm text-gray-500">Type:</span>
          <button
            onClick={() => setShowTypeDropdown(!showTypeDropdown)}
            className="flex items-center gap-1 border border-gray-200 rounded-lg px-3 py-1 text-sm bg-white hover:bg-gray-50"
          >
            {msgType} <span className="text-xs text-gray-400">▼</span>
          </button>
          {showTypeDropdown && (
            <div className="absolute top-8 left-12 bg-white border border-gray-200 rounded-xl shadow-lg z-10 min-w-44 py-1">
              {MESSAGE_TYPES.map((t) => (
                <button
                  key={t.label}
                  onClick={() => { setMsgType(t.label); setShowTypeDropdown(false); }}
                  className="w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center gap-2"
                >
                  <span className={t.color}>{t.icon}</span>
                  {t.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Textarea + Send button */}
        <div className="flex items-end gap-3">
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleInputChange}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
              if (e.key === "Escape") setShowMentionDropdown(false);
            }}
            placeholder="Write your message... (Shift+Enter for new line)"
            className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm resize-none focus:outline-none focus:border-green-400 min-h-[52px] max-h-32"
            rows={2}
          />
          <button
            onClick={sendMessage}
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-3 rounded-xl text-sm font-semibold flex items-center gap-1 transition-colors"
          >
            ✈ Send
          </button>
        </div>

        {/* Attached files preview */}
        {attachedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {attachedFiles.map((f, i) => (
              <div key={i} className="flex items-center gap-1.5 bg-gray-100 border border-gray-200 rounded-lg px-2 py-1">
                <span className="text-xs text-gray-500">📄</span>
                <span className="text-xs text-gray-700 max-w-32 truncate">{f.name}</span>
                <span className="text-xs text-gray-400">{f.size}</span>
                <button onClick={() => removeAttached(i)} className="text-gray-400 hover:text-red-500 ml-1 text-xs">✕</button>
              </div>
            ))}
          </div>
        )}

        {/* Action buttons row */}
        <div className="flex items-center gap-1 mt-2 relative">

          {/* Hidden file inputs */}
          <input
            ref={fileInputRef}
            type="file"
            multiple
            className="hidden"
            onChange={handleFileChange}
          />
          <input
            ref={imageInputRef}
            type="file"
            multiple
            accept="image/*"
            className="hidden"
            onChange={handleFileChange}
          />

          {/* 📎 Attach file */}
          <button
            title="Attach file"
            onClick={() => fileInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13" />
            </svg>
          </button>

          {/* 🖼 Attach image */}
          <button
            title="Attach image"
            onClick={() => imageInputRef.current?.click()}
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* @ Mention — with rate limit counter */}
          <div className="relative">
            <button
              onClick={() => setShowMentionDropdown(!showMentionDropdown)}
              title={
                viewingAs === "agency_team"
                  ? "Mention participant (Admin restricted for team members)"
                  : `Mention participant — ${3 - adminMentionsUsed}/3 admin mentions left today`
              }
              className={`p-2 rounded-lg transition-colors flex items-center gap-0.5 ${
                showMentionDropdown ? "text-blue-600 bg-blue-50" : "text-gray-400 hover:text-gray-600 hover:bg-gray-100"
              }`}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
              </svg>
              {/* Rate limit dots — only show for non-team members */}
              {viewingAs !== "agency_team" && (
                <span className={`text-xs font-bold leading-none ${
                  adminMentionsUsed >= 3 ? "text-red-500" : adminMentionsUsed === 2 ? "text-orange-500" : "text-gray-400"
                }`}>
                  {3 - adminMentionsUsed}
                </span>
              )}
            </button>

            {showMentionDropdown && (
              <MentionDropdown
                viewingAs={viewingAs}
                adminMentionsUsed={adminMentionsUsed}
                onSelect={handleMentionSelect}
                onClose={() => setShowMentionDropdown(false)}
              />
            )}
          </div>

          {/* 📅 Schedule meeting */}
          <button title="Schedule meeting" className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Inline rate limit warning */}
          {adminMentionsUsed >= 3 && viewingAs !== "agency_team" && (
            <span className="ml-1 text-xs text-red-500 font-medium">🔒 Admin mention limit reached</span>
          )}
          {adminMentionsUsed === 2 && viewingAs !== "agency_team" && (
            <span className="ml-1 text-xs text-orange-500">⚠ 1 admin mention left today</span>
          )}
        </div>
      </div>

      {/* ── Admin Mention Modal ── */}
      {showAdminModal && (
        <AdminMentionModal
          mentionsUsed={adminMentionsUsed}
          onConfirm={handleAdminMentionConfirm}
          onCancel={() => { setShowAdminModal(false); setPendingMention(null); }}
        />
      )}
    </div>
  );
}