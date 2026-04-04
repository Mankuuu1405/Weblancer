import { useState, useRef, useEffect } from "react";
import MessageTypeSelector  from "./MessageTypeSelector";
import { MentionDropdown }      from "./MentionDropdown";
import MeetingScheduler          from "./MeetingScheduler";
import FileUpload                from "./FileUpload";
 

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
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";
 
// ── Shared button styles ──
const btnNavy = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradNavy,color:G.white,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",boxShadow:"0 3px 12px rgba(15,26,59,0.25)",whiteSpace:"nowrap" };
const btnGreen= { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradGreen,color:G.white,border:"none",borderRadius:100,padding:"8px 18px",cursor:"pointer",boxShadow:"0 2px 10px rgba(46,125,31,0.22)",whiteSpace:"nowrap" };
const btnOutline={ display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.greenBg,color:G.greenDeep,border:`1px solid ${G.greenBorder}`,borderRadius:100,padding:"8px 18px",cursor:"pointer",whiteSpace:"nowrap" };
 
const labelSty = { fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", display:"block", marginBottom:6 };
const inputSty = { width:"100%", border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"9px 14px", fontSize:13, fontFamily:FONT, color:G.text, background:G.white, outline:"none", boxSizing:"border-box" };
const PLACEHOLDER_MAP = {
  update:   "Share a progress update with the team...",
  decision: "Record a decision (will be locked after sending)...",
  warning:  "Post a warning or alert to the team...",
  normal:   "Type a message... Use @ to mention someone",
};
 
const MSG_BOX_STYLE = {
  warning:  { border:`1.5px solid ${G.amberBorder}`, background:G.amberBg  },
  decision: { border:`1.5px solid ${G.greenBorder}`, background:G.greenBg  },
  update:   { border:`1.5px solid ${G.blueBorder}`,  background:G.blueBg   },
  normal:   { border:`1.5px solid ${G.greenBorder}`, background:G.white    },
};
 
export function MessageInput({ participants, onSendMessage }) {
  const [content,      setContent]      = useState("");
  const [messageType,  setMessageType]  = useState("normal");
  const [showMention,  setShowMention]  = useState(false);
  const [mentionQuery, setMentionQuery] = useState("");
  const [showMeeting,  setShowMeeting]  = useState(false);
  const [showFileUpload,setShowFileUpload]=useState(false);
  const [attachedFile, setAttachedFile] = useState(null);
  const [isFocused,    setIsFocused]    = useState(false);
  const inputRef = useRef(null);
 
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.style.height = "auto";
      inputRef.current.style.height = `${Math.min(inputRef.current.scrollHeight, 128)}px`;
    }
  }, [content]);
 
  const handleInput = e => {
    const val = e.target.value;
    setContent(val);
    const cursor = e.target.selectionStart;
    const textBefore = val.slice(0, cursor);
    const lastAt = textBefore.lastIndexOf("@");
    if (lastAt !== -1) {
      const q = textBefore.slice(lastAt + 1);
      if (!q.includes(" ")) { setMentionQuery(q); setShowMention(true); return; }
    }
    setShowMention(false); setMentionQuery("");
  };
 
  const handleMentionSelect = participant => {
    const cursor = inputRef.current.selectionStart;
    const before = content.slice(0, cursor);
    const after  = content.slice(cursor);
    const lastAt = before.lastIndexOf("@");
    if (lastAt !== -1) setContent(`${before.slice(0, lastAt)}@${participant.name} ${after}`);
    setShowMention(false); setMentionQuery("");
    setTimeout(() => inputRef.current?.focus(), 0);
  };
 
  const handleKeyDown = e => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
    if (e.key === "Escape") setShowMention(false);
  };
 
  const handleSend = () => {
    if (!content.trim() && !attachedFile) return;
    let msg = content.trim();
    if (attachedFile) msg += (msg ? "\n" : "") + `📎 Attached: ${attachedFile.name}`;
    onSendMessage({ content: msg, type: messageType });
    setContent(""); setMessageType("normal"); setAttachedFile(null); setShowMention(false);
    inputRef.current?.focus();
  };
 
  const handleScheduleMeeting = data => {
    const agenda = data.agenda ? `\nAgenda: ${data.agenda}` : "";
    onSendMessage({ content:`📅 Meeting scheduled: "${data.title}" on ${data.date} at ${data.time} (${data.duration} mins)${agenda}`, type:"update" });
    setShowMeeting(false);
  };
 
  const boxStyle = MSG_BOX_STYLE[messageType] || MSG_BOX_STYLE.normal;
  const canSend  = !!(content.trim() || attachedFile);
 
  const toolBtn = (title, onClick, icon) => (
    <button type="button" title={title} onClick={onClick}
      style={{ width:32, height:32, borderRadius:8, background:"none", border:"none", cursor:"pointer", color:G.muted, display:"flex", alignItems:"center", justifyContent:"center", transition:"all 0.1s", flexShrink:0 }}
      onMouseEnter={e => { e.currentTarget.style.background=G.greenBg; e.currentTarget.style.color=G.greenDeep; }}
      onMouseLeave={e => { e.currentTarget.style.background="none";    e.currentTarget.style.color=G.muted; }}>
      {icon}
    </button>
  );
 
  return (
    <div style={{ padding:"10px 14px", position:"relative", fontFamily:FONT, background:G.white }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} textarea{resize:none;outline:none;}`}</style>
 
      {/* Mention dropdown */}
      {showMention && (
        <div style={{ position:"absolute", bottom:"100%", left:14, marginBottom:8, zIndex:50 }}>
          <MentionDropdown participants={participants} query={mentionQuery} onSelect={handleMentionSelect} />
        </div>
      )}
 
      {/* Meeting / File modals */}
      {showMeeting    && <MeetingScheduler participants={participants} onClose={() => setShowMeeting(false)}    onSchedule={handleScheduleMeeting} />}
      {showFileUpload && <FileUpload onFileSelect={f => { setAttachedFile(f); setShowFileUpload(false); }} onClose={() => setShowFileUpload(false)} />}
 
      {/* Type selector row */}
      <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
        <span style={{ fontSize:11, color:G.muted, fontWeight:600 }}>Type:</span>
        <MessageTypeSelector selectedType={messageType} onSelect={setMessageType} />
      </div>
 
      {/* Attached file chip */}
      {attachedFile && (
        <div style={{ display:"inline-flex", alignItems:"center", gap:8, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"5px 10px", marginBottom:8, maxWidth:"100%", overflow:"hidden" }}>
          <svg width="13" height="13" fill="none" stroke={G.greenDeep} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
          <span style={{ fontSize:11, color:G.greenDeep, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", flex:1 }}>{attachedFile.name}</span>
          <button onClick={() => setAttachedFile(null)} style={{ background:"none", border:"none", cursor:"pointer", color:G.muted, display:"flex", padding:2 }}
            onMouseEnter={e => e.currentTarget.style.color = G.redText}
            onMouseLeave={e => e.currentTarget.style.color = G.muted}>
            <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
          </button>
        </div>
      )}
 
      {/* Input box */}
      <div style={{ display:"flex", alignItems:"flex-end", gap:8, borderRadius:14, padding:"8px 8px 8px 12px", transition:"border-color 0.12s", ...boxStyle, ...(isFocused?{boxShadow:`0 0 0 3px ${G.greenBorder}`}:{}) }}>
        {/* Tool buttons */}
        <div style={{ display:"flex", alignItems:"center", gap:2, marginBottom:4, flexShrink:0 }}>
          {toolBtn("Attach file",      () => setShowFileUpload(true),
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"/></svg>
          )}
          {toolBtn("Schedule meeting", () => setShowMeeting(true),
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
          )}
        </div>
 
        {/* Textarea */}
        <textarea ref={inputRef} value={content} onChange={handleInput} onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)} onBlur={() => setIsFocused(false)}
          placeholder={PLACEHOLDER_MAP[messageType] || PLACEHOLDER_MAP.normal}
          rows={1}
          style={{ flex:1, background:"transparent", border:"none", fontSize:13, color:G.text, lineHeight:1.5, padding:"4px 0", minHeight:32, maxHeight:128, fontFamily:FONT }}
        />
 
        {/* Send */}
        <button onClick={handleSend} disabled={!canSend}
          style={{ width:34, height:34, borderRadius:10, border:"none", cursor:canSend?"pointer":"not-allowed", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginBottom:4, background:canSend?G.gradNavy:G.border, color:canSend?G.white:G.muted, boxShadow:canSend?"0 3px 10px rgba(15,26,59,0.25)":"none", transition:"all 0.15s" }}>
          <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
        </button>
      </div>
 
      {/* Hint row */}
      <div style={{ display:"flex", flexWrap:"wrap", gap:4, marginTop:6, marginLeft:4 }}>
        {[["Enter","send"],["Shift+Enter","new line"],["@","mention"]].map(([key, desc]) => (
          <span key={key} style={{ fontSize:10, color:G.muted }}>
            <kbd style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:4, padding:"1px 5px", fontSize:10, color:G.greenDeep, fontFamily:FONT }}>{key}</kbd>
            {" "}{desc}
            {desc !== "mention" && " · "}
          </span>
        ))}
      </div>
    </div>
  );
}
 
export default MessageInput