import { useState } from "react";

// ── Icons ──────────────────────────────────────────────
const IconPin = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" stroke="none"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>);
const IconSend = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>);
const IconStar = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>);
const IconDownload = () => (<svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>);
const IconFile = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>);
const IconCheck = () => (<svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="20 6 9 17 4 12"/></svg>);
const IconDots = () => (<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="5" r="1" fill="currentColor"/><circle cx="12" cy="12" r="1" fill="currentColor"/><circle cx="12" cy="19" r="1" fill="currentColor"/></svg>);
const IconLock = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>);
const IconPinMsg = () => (<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="12" y1="17" x2="12" y2="22"/><path d="M5 17h14v-1.76a2 2 0 0 0-1.11-1.79l-1.78-.9A2 2 0 0 1 15 10.76V6h1a2 2 0 0 0 0-4H8a2 2 0 0 0 0 4h1v4.76a2 2 0 0 1-1.11 1.79l-1.78.9A2 2 0 0 0 5 15.24z"/></svg>);

// ── Avatar ─────────────────────────────────────────────
function Avatar({ name, color }) {
  const bg = color === "red" ? "bg-red-500" : color === "green" ? "bg-green-500" : "bg-blue-500";
  return <div className={"w-8 h-8 md:w-9 md:h-9 rounded-full flex items-center justify-center text-white font-bold text-xs md:text-sm flex-shrink-0 " + bg}>{name[0]}</div>;
}

// ── Role Badge ─────────────────────────────────────────
function RoleBadge({ role }) {
  const m = { ADMIN: "bg-red-100 text-red-600 border border-red-200", CLIENT: "bg-green-500 text-white", FREELANCER: "bg-blue-500 text-white", SUPPORT: "bg-red-500 text-white" };
  return <span className={"text-xs font-bold px-2 py-0.5 rounded-md " + (m[role] || "bg-gray-100 text-gray-600")}>{role}</span>;
}

// ── Type Badge ─────────────────────────────────────────
function TypeBadge({ type }) {
  const m = { DECISION: "bg-orange-100 text-orange-600 border border-orange-200", APPROVAL: "bg-green-100 text-green-600 border border-green-200", DELIVERY: "bg-orange-100 text-orange-600 border border-orange-200", WARNING: "bg-yellow-100 text-yellow-700 border border-yellow-200", UPDATE: "bg-blue-100 text-blue-600 border border-blue-200" };
  const ic = { DECISION: "🔒", APPROVAL: "✅", DELIVERY: "📦", WARNING: "⚠️", UPDATE: "📋" };
  return <span className={"text-xs font-bold px-2 py-0.5 rounded-md flex items-center gap-1 " + (m[type] || "bg-gray-100")}>{ic[type]} {type}</span>;
}

// ── System Message ─────────────────────────────────────
function SystemMsg({ icon, text, date, green }) {
  return (
    <div className="flex justify-center my-3">
      <div className={"max-w-xs md:max-w-lg text-center px-3 md:px-5 py-3 rounded-2xl " + (green ? "bg-green-50 border border-green-100" : "bg-gray-100")}>
        <p className="text-sm text-gray-600">{icon} {text}</p>
        {date && <p className="text-xs text-gray-400 mt-1">{date}</p>}
      </div>
    </div>
  );
}

// ── Date Divider ───────────────────────────────────────
function DateDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-4">
      <div className="flex-1 h-px bg-gray-200" />
      <span className="text-xs text-gray-400 font-medium">{label}</span>
      <div className="flex-1 h-px bg-gray-200" />
    </div>
  );
}

// ── Chat Message ───────────────────────────────────────
function ChatMessage({ msg }) {
  const borderMap = { ADMIN: "border-l-red-400", CLIENT: "border-l-green-400", FREELANCER: "border-l-blue-400" };
  const bgMap = { ADMIN: "bg-red-50", CLIENT: "bg-green-50", FREELANCER: "bg-blue-50" };
  return (
    <div className={"rounded-xl border-l-4 px-3 md:px-4 py-2.5 md:py-3 mb-3 border border-gray-100 " + (borderMap[msg.role] || "border-l-gray-300") + " " + (bgMap[msg.role] || "bg-white")}>
      <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <Avatar name={msg.author} color={msg.role === "ADMIN" ? "red" : msg.role === "CLIENT" ? "green" : "blue"} />
          <span className="font-bold text-gray-900 text-sm">{msg.author}</span>
          <RoleBadge role={msg.role} />
          {msg.msgType && <TypeBadge type={msg.msgType} />}
        </div>
        <div className="flex items-center gap-2 text-gray-400">
          {msg.pinned && <span className="text-gray-400"><IconPinMsg /></span>}
          {msg.locked && <span className="text-yellow-500"><IconLock /></span>}
          <span className="text-xs">{msg.time}</span>
          {msg.hasMenu && <button className="hover:text-gray-600"><IconDots /></button>}
        </div>
      </div>
      {msg.lockedDecision && (
        <p className="text-xs text-yellow-600 font-semibold mb-2 ml-8 md:ml-11">🔒 LOCKED DECISION — Cannot be edited or reversed</p>
      )}
      <div className="ml-8 md:ml-11">
        <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-line">{msg.body}</p>
        {msg.attachments && (
          <div className="mt-3 space-y-2">
            {msg.attachments.map((a, i) => (
              <div key={i} className="flex items-center gap-3 bg-white border border-gray-200 rounded-lg px-3 py-2.5">
                <IconFile />
                <span className="text-sm text-gray-700 flex-1 truncate min-w-0">{a.name}</span>
                <span className="text-xs text-gray-400">{a.size}</span>
                <button className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 hover:text-blue-600 border border-gray-200 rounded-md px-2 py-1">
                  <IconDownload /> Download
                </button>
              </div>
            ))}
          </div>
        )}
        {msg.acknowledge && (
          <div className="mt-3 border border-orange-200 rounded-lg p-3 bg-orange-50">
            <p className="text-xs text-orange-600 font-semibold mb-2">⚠️ Certain actions are blocked until acknowledged.</p>
            <button className="bg-yellow-500 hover:bg-yellow-600 text-white text-sm font-bold px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
              <IconCheck /> I have read and understood this message
            </button>
          </div>
        )}
        {msg.commitment && <p className="text-xs text-red-500 font-medium mt-2">📌 Commitment logged by system</p>}
        {msg.seenBy && <p className="text-xs text-gray-400 mt-2 flex items-center gap-1"><IconCheck /> Seen by: {msg.seenBy}</p>}
      </div>
    </div>
  );
}

// ── Support Card ───────────────────────────────────────
function SupportCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 mb-3">
      <p className="text-sm font-bold text-gray-900 mb-3">🎫 <span className="text-gray-500 font-mono text-xs">[SYSTEM]</span> Support Request Opened</p>
      <div className="space-y-1 text-sm text-gray-700 mb-3">
        <p><span className="text-gray-500">Ticket:</span> <span className="font-semibold">#SUP-20260318-1042</span></p>
        <p><span className="text-gray-500">Category:</span> 📋 Contract or scope question</p>
        <p><span className="text-gray-500">Urgency:</span> Normal</p>
        <p><span className="text-gray-500">Submitted by:</span> Sara M. (freelancer)</p>
        <p><span className="text-gray-500">Status:</span> ⏳ Awaiting admin</p>
      </div>
      <div className="border-t border-gray-100 pt-2 text-xs text-gray-400 mb-4">
        <p>This ticket is visible to all project participants.</p>
        <p>Admin response expected within 4 hours.</p>
      </div>
      <div className="border-l-4 border-red-400 pl-4 py-2">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-blue-600 font-bold text-xs">🛡️ Platform Support</span>
          <RoleBadge role="SUPPORT" />
          <span className="text-xs text-gray-400 ml-auto">Feb 12, 2:30 PM</span>
        </div>
        <p className="text-xs text-gray-500 mb-1">Re: Ticket #SUP-20260212-0891 — Payment or escrow issue</p>
        <p className="text-sm text-gray-700 leading-relaxed">Hi John, we have reviewed your case. The payment release for Milestone 1 is currently processing. It will appear in the agency account within 24 business hours. No action needed on your end. If not resolved by Feb 14, please reply here.</p>
        <p className="text-xs text-gray-400 mt-2">Ticket remains open until confirmed resolved.</p>
        <p className="text-xs text-gray-400">Seen by: Client ✓ · Agency Admin ✓</p>
      </div>
    </div>
  );
}

// ── Meeting Request Card ───────────────────────────────
function MeetingRequestCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 mb-3">
      <p className="text-sm font-bold text-gray-900 mb-3">🗓️ <span className="text-gray-500 font-mono text-xs">[SYSTEM]</span> Meeting Requested</p>
      <div className="space-y-1 text-sm text-gray-700 mb-3">
        <p><span className="text-gray-500">Type:</span> 🔍 Requirement Clarification</p>
        <p><span className="text-gray-500">Requested by:</span> Sara M. (freelancer)</p>
        <p><span className="text-gray-500">Date:</span> <span className="font-semibold">Wednesday, Mar 25, 2026 · 11:00 AM EST</span></p>
        <p><span className="text-gray-500">Duration:</span> 30 minutes</p>
      </div>
      <p className="text-xs text-gray-500 font-semibold mb-2">Participants:</p>
      <div className="space-y-1.5 mb-3">
        {[{name:"Sara M.",role:"FREELANCER",st:"Confirmed",ic:"✅"},{name:"John D.",role:"CLIENT",st:"Pending",ic:"⏳"}].map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <span>{p.ic}</span><span className="text-sm font-medium text-gray-800">{p.name}</span>
            <RoleBadge role={p.role} /><span className="ml-auto text-xs text-gray-400">{p.st}</span>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <p className="text-xs text-gray-500 font-semibold mb-1">Agenda:</p>
        <p className="text-sm font-semibold text-gray-800">Clarify payment flow requirements for checkout module</p>
        <p className="text-xs text-gray-400 mt-0.5">Topics: Payment gateway preferences · Guest checkout vs. registered users</p>
      </div>
      <div className="mb-3">
        <span className="text-xs font-bold text-yellow-500 border border-yellow-300 bg-yellow-50 px-2 py-1 rounded-full">⏳ PENDING — Awaiting confirmation</span>
      </div>
      <div className="flex flex-wrap gap-2">
        <button className="bg-green-500 hover:bg-green-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Accept ✅</button>
        <button className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">Decline ✕</button>
        <button className="border border-gray-200 text-gray-700 text-sm font-semibold px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors">Propose New Time 🕐</button>
      </div>
    </div>
  );
}

// ── Meeting Confirmed Card ─────────────────────────────
function MeetingConfirmedCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 mb-3">
      <p className="text-sm font-bold text-gray-900 mb-3">🗓️ <span className="text-gray-500 font-mono text-xs">[SYSTEM]</span> Meeting Confirmed ✅</p>
      <div className="space-y-1 text-sm text-gray-700 mb-3">
        <p><span className="text-gray-500">Type:</span> 💬 Project Discussion</p>
        <p><span className="text-gray-500">Requested by:</span> John D. (client)</p>
        <p><span className="text-gray-500">Date:</span> <span className="font-semibold">Friday, Mar 20, 2026 · 2:00 PM IST</span></p>
        <p><span className="text-gray-500">Duration:</span> 60 minutes</p>
      </div>
      <p className="text-xs text-gray-500 font-semibold mb-2">Participants:</p>
      <div className="space-y-1.5 mb-3">
        {[{name:"John D.",role:"CLIENT"},{name:"Sara M.",role:"FREELANCER"},{name:"Platform Admin",role:"ADMIN"}].map(p => (
          <div key={p.name} className="flex items-center gap-2">
            <span>✅</span><span className="text-sm font-medium text-gray-800">{p.name}</span>
            <RoleBadge role={p.role} /><span className="ml-auto text-xs text-gray-400">Confirmed</span>
          </div>
        ))}
      </div>
      <div className="mb-3">
        <p className="text-xs text-gray-500 font-semibold mb-1">Agenda:</p>
        <p className="text-sm font-semibold text-gray-800">Milestone 2 progress check and demo review</p>
        <p className="text-xs text-gray-400">Topics: Review order tracking module demo · Discuss API integration progress · Plan remaining sprint work</p>
      </div>
      <div className="mb-3"><span className="text-xs font-bold text-white bg-green-500 px-2 py-1 rounded-full">✅ CONFIRMED</span></div>
      <div className="flex flex-wrap gap-2">
        {["Add to Google Calendar","Add to Outlook","Add to Apple Calendar"].map(l => (
          <button key={l} className="border border-gray-200 text-gray-700 text-xs font-medium px-3 py-1.5 rounded-lg hover:bg-gray-50 transition-colors">{l}</button>
        ))}
      </div>
    </div>
  );
}

// ── Meeting Starting Soon ──────────────────────────────
function MeetingStartingSoonCard() {
  return (
    <div className="bg-blue-50 border border-blue-100 rounded-xl px-3 md:px-5 py-3 md:py-4 mb-3">
      <p className="text-sm font-bold text-gray-900 mb-2">🗓️ Meeting Starting Soon!</p>
      <p className="text-sm text-gray-700 font-medium">💬 Project Discussion — Mar 20, 2:00 PM IST</p>
      <p className="text-xs text-gray-500 mb-4">Starts in: 24151 minutes</p>
      <p className="text-xs text-gray-500 font-semibold mb-2">Participants joining:</p>
      <div className="space-y-1.5 mb-4">
        {["John D.", "Sara M.", "Platform Admin"].map(name => (
          <div key={name} className="flex items-center gap-2">
            <span>⏳</span><span className="text-sm text-gray-700">{name}</span>
            <span className="ml-auto text-xs text-gray-400">Not joined yet</span>
          </div>
        ))}
      </div>
      <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-3 rounded-xl mb-3 transition-colors">Join Meeting Now →</button>
      <p className="text-xs text-gray-500 font-semibold mb-1">Meeting Agenda (quick reference):</p>
      {["Review order tracking module demo","Discuss API integration progress","Plan remaining sprint work"].map(i => (
        <p key={i} className="text-xs text-gray-600">• {i}</p>
      ))}
    </div>
  );
}

// ── Official Meeting Notes ─────────────────────────────
function MeetingNotesCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl mb-3 overflow-hidden">
      <div className="border-l-4 border-red-400 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white font-bold text-sm">P</div>
          <span className="font-bold text-gray-900 text-sm">Platform Admin</span>
          <RoleBadge role="ADMIN" />
        </div>
        <span className="text-xs text-gray-400">Feb 18, 4:45 PM</span>
      </div>
      <div className="px-3 md:px-5 py-3 md:py-4">
        <p className="text-xs font-bold text-gray-500 tracking-widest mb-3">[OFFICIAL MEETING NOTES]</p>
        <div className="border-b border-gray-100 pb-3 mb-3">
          <p className="text-sm font-bold text-gray-900 mb-1">📋 Meeting Summary — Delivery Review</p>
          <p className="text-xs text-gray-500">Feb 18, 2026 · 3:00 PM · Duration: 43 min</p>
          <p className="text-xs text-gray-500">Attendees: John D. · Sara M.</p>
        </div>
        <p className="text-xs text-blue-600 font-semibold mb-1">What was discussed:</p>
        <p className="text-sm text-gray-700 mb-3 leading-relaxed">Reviewed all 12 wireframe screens for the food delivery app. Client provided feedback on navigation flow and visual design preferences.</p>
        <p className="text-xs text-green-600 font-semibold mb-1">✅ Decisions Made:</p>
        <ol className="list-decimal list-inside text-sm text-gray-700 mb-3 space-y-0.5">
          <li>Wireframes approved with 2 minor changes</li>
          <li>Color scheme Option B selected</li>
        </ol>
        <p className="text-xs text-orange-600 font-semibold mb-1">📋 Action Items:</p>
        <ol className="list-decimal list-inside text-sm text-gray-700 mb-3 space-y-0.5">
          <li>Sara M. → Update wireframe screens 5 and 9 <span className="text-blue-500 font-semibold">Due: Feb 20, 2026</span></li>
          <li>Sara M. → Begin Design phase after Feb 20 <span className="text-blue-500 font-semibold">Due: Feb 21, 2026</span></li>
        </ol>
        <p className="text-xs text-yellow-600">🔒 This summary is official and locked. It forms part of the project record.</p>
        <p className="text-xs text-gray-400 mt-2">Seen by: John D. ✓ · Sara M. ✓</p>
      </div>
    </div>
  );
}

// ── Project Completed ──────────────────────────────────
function ProjectCompletedCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 md:px-5 py-3 md:py-4 mb-3">
      <p className="text-sm font-bold text-gray-900 mb-3">🎉 <span className="text-gray-500 font-mono text-xs">[SYSTEM]</span> Project Completed!</p>
      <div className="text-sm text-gray-700 space-y-1 mb-3">
        <p>All 4 milestones have been approved.</p>
        <p>Total paid: <span className="text-green-600 font-bold">$42,000</span> (released from escrow)</p>
        <p>Project duration: 22 weeks (on schedule ✓)</p>
      </div>
      <div className="border-t border-gray-100 pt-3 mb-3">
        <p className="text-sm font-bold text-gray-800 mb-1">Final steps required:</p>
        <ol className="list-decimal list-inside text-sm text-gray-700 space-y-0.5">
          <li>Client: Leave a review for Sara M.</li>
          <li>Provider: Leave a review for John D. (TechVision Co.)</li>
        </ol>
      </div>
      <p className="text-xs text-gray-400 italic mb-3">This ProjectStream will be archived in 48 hours. You will retain read-only access permanently.</p>
      <button className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow hover:shadow-md transition-all">
        <IconStar /> Leave Review →
      </button>
    </div>
  );
}

// ── Pinned Banner ──────────────────────────────────────
function PinnedBanner({ collapsed, onToggle }) {
  return (
    <div className="bg-white border-b border-gray-200 px-3 md:px-4 py-2 md:py-2.5 flex items-center gap-2 flex-shrink-0 cursor-pointer hover:bg-gray-50" onClick={onToggle}>
      <span className="text-red-400"><IconPin /></span>
      <span className="text-sm font-semibold text-gray-700">📌 Pinned (5)</span>
      <span className="ml-auto text-gray-400 text-xs">{collapsed ? "▼" : "▲"}</span>
    </div>
  );
}

// ── Composer ───────────────────────────────────────────
function Composer() {
  return (
    <div className="border-t border-gray-200 bg-white px-2 md:px-4 py-2 md:py-3 flex-shrink-0">
      <div className="flex items-center gap-2 mb-2 text-xs text-gray-500">
        <span className="font-medium">Type:</span>
        <select className="border border-gray-200 rounded-lg px-2 py-1 text-xs text-gray-700 bg-white focus:outline-none focus:ring-1 focus:ring-blue-300">
          <option>Normal</option><option>Decision</option><option>Action Item</option><option>Question</option>
        </select>
      </div>
      <div className="border border-gray-200 rounded-xl px-4 py-3 bg-gray-50 min-h-14 text-sm text-gray-400 cursor-text">
        Write your message... (Shift+Enter for new line)
      </div>
      <div className="flex items-center justify-between mt-2.5">
        <div className="flex gap-3 text-gray-400">
          {[
            <svg key="a" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>,
            <svg key="b" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/></svg>,
            <svg key="c" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="4"/><path d="M16 8v5a3 3 0 0 0 6 0v-1a10 10 0 1 0-3.92 7.94"/></svg>,
            <svg key="d" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
          ].map((icon, i) => <button key={i} className="hover:text-blue-500 transition-colors">{icon}</button>)}
        </div>
        <button className="inline-flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-all">
          <IconSend /> Send
        </button>
      </div>
    </div>
  );
}

// ── All Messages Data ──────────────────────────────────
const MESSAGES = [
  { id:"s1", kind:"sys", icon:"📌", text:'ProjectStream for "Food Delivery App" has been created. All communication, deliverables, decisions, and payments for this project will be tracked here. This space is permanent and legally logged.', date:"Feb 11, 2026 · 2:14 PM" },
  { id:"s2", kind:"sys", icon:"💰", text:"Escrow funded: $42,000 secured for this project.", date:"Feb 11, 2026 · 2:14 PM" },
  { id:"d1", kind:"date", label:"February 11, 2026" },
  { id:"m1", kind:"msg", author:"Platform Admin", role:"ADMIN", time:"2:30 PM", body:"Welcome to the Food Delivery App project. I'm your platform admin and will be monitoring this project to ensure everything runs smoothly. Please keep all communication within ProjectStream.", seenBy:"John D. · Sara M." },
  { id:"m2", kind:"msg", author:"John D.", role:"CLIENT", time:"9:15 AM", body:"Hi Sara! Excited to get started. I've shared additional wireframe references in the files section. Let me know if you have any questions about the requirements.", seenBy:"Sara M. · Admin" },
  { id:"m3", kind:"msg", author:"Sara M.", role:"FREELANCER", msgType:"DECISION", time:"10:30 AM", pinned:true, body:"I will deliver the complete UI designs by this Friday, Feb 14 by 6pm EST. All 12 screens will be included.", commitment:true, seenBy:"John D. · Admin" },
  { id:"d2", kind:"date", label:"March 11, 2026" },
  { id:"m4", kind:"msg", author:"Sara M.", role:"FREELANCER", msgType:"DELIVERY", time:"4:20 PM", pinned:true, hasMenu:true, body:"Milestone 1 deliverables have been submitted for your review. Please find the wireframes, UI designs, and technical architecture document attached.", attachments:[{name:"wireframes_v2.pdf",size:"2.4 MB"},{name:"design_system.fig",size:"8.1 MB"},{name:"tech_architecture.pdf",size:"1.2 MB"}], seenBy:"John D. · Admin" },
  { id:"s3", kind:"sys", icon:"📦", text:"Freelancer submitted Milestone 1 deliverables. Client has 7 business days to review.", date:"Mar 11, 2026 · 4:20 PM" },
  { id:"d3", kind:"date", label:"March 13, 2026" },
  { id:"m5", kind:"msg", author:"John D.", role:"CLIENT", msgType:"APPROVAL", time:"3:45 PM", pinned:true, body:"The wireframes look great! Approved. Please proceed to the design phase.", seenBy:"Sara M. · Admin" },
  { id:"m6", kind:"msg", author:"Platform Admin", role:"ADMIN", msgType:"DECISION", time:"4:00 PM", locked:true, lockedDecision:true, hasMenu:true, body:"Milestone 1 has been officially approved. Payment of $8,400 will release within 24h. This decision is final and non-reversible.", seenBy:"John D. · Sara M." },
  { id:"s4", kind:"sys", icon:"✅", text:"Client approved Milestone 1 — $8,400 released from escrow.", date:"Mar 13, 2026 · 4:02 PM", green:true },
  { id:"d4", kind:"date", label:"March 15, 2026" },
  { id:"m7", kind:"msg", author:"Platform Admin", role:"ADMIN", msgType:"WARNING", time:"2:00 PM", pinned:true, hasMenu:true, body:'Your project "Food Delivery App" has been flagged for scope creep. The following requests fall outside the original agreement:\n\n1. Restaurant management dashboard\n2. Real-time analytics panel\n\nPlease review and confirm you understand.', acknowledge:true, seenBy:"John D." },
  { id:"d5", kind:"date", label:"March 18, 2026" },
  { id:"m8", kind:"msg", author:"Sara M.", role:"FREELANCER", msgType:"UPDATE", time:"11:00 AM", hasMenu:true, body:"Working on the order tracking module now. The API integration is going smoothly. Should have a demo ready by end of this week.", seenBy:"John D. · Admin" },
  { id:"sp1", kind:"support" },
  { id:"mr1", kind:"meetrequest" },
  { id:"mc1", kind:"meetconfirmed" },
  { id:"ms1", kind:"meetingsoon" },
  { id:"mn1", kind:"meetingnotes" },
  { id:"pc1", kind:"completed" },
];

// ── Main Export ────────────────────────────────────────
export default function ProjectStreamChat() {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-gray-50">
      <PinnedBanner collapsed={collapsed} onToggle={() => setCollapsed(v => !v)} />
      <div className="flex-1 overflow-y-auto px-2 md:px-4 py-3">
        {MESSAGES.map(m => {
          if (m.kind === "sys") return <SystemMsg key={m.id} icon={m.icon} text={m.text} date={m.date} green={m.green} />;
          if (m.kind === "date") return <DateDivider key={m.id} label={m.label} />;
          if (m.kind === "msg") return <ChatMessage key={m.id} msg={m} />;
          if (m.kind === "support") return <SupportCard key={m.id} />;
          if (m.kind === "meetrequest") return <MeetingRequestCard key={m.id} />;
          if (m.kind === "meetconfirmed") return <MeetingConfirmedCard key={m.id} />;
          if (m.kind === "meetingsoon") return <MeetingStartingSoonCard key={m.id} />;
          if (m.kind === "meetingnotes") return <MeetingNotesCard key={m.id} />;
          if (m.kind === "completed") return <ProjectCompletedCard key={m.id} />;
          return null;
        })}
        <div className="h-4" />
      </div>
      <Composer />
    </div>
  );
}