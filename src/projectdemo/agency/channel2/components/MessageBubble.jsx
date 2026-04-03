import { roleColors, roleLabels } from "../data/dummyData";
 
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

const BUBBLE_ROLE = {
  platform_admin: { bg:G.redBg,    border:G.redBorder,    avatarBg:G.red+"20",    avatarText:G.red,      badgeBg:G.redBg,    badgeText:G.redText,   badgeBorder:G.redBorder   },
  agency_admin:   { bg:G.blueBg,   border:G.blueBorder,   avatarBg:G.blue+"20",   avatarText:G.blue,     badgeBg:G.blueBg,   badgeText:G.blueText,  badgeBorder:G.blueBorder  },
  agency_team:    { bg:G.amberBg,  border:G.amberBorder,  avatarBg:G.amber+"20",  avatarText:G.amberText,badgeBg:G.amberBg,  badgeText:G.amberText, badgeBorder:G.amberBorder },
  developer:      { bg:G.navyBg,   border:G.navyBorder,   avatarBg:G.navy+"20",   avatarText:G.navy,     badgeBg:G.navyBg,   badgeText:G.navy,      badgeBorder:G.navyBorder  },
  designer:       { bg:G.purpleBg, border:G.purpleBorder, avatarBg:G.purple+"20", avatarText:G.purple,   badgeBg:G.purpleBg, badgeText:G.purpleText,badgeBorder:G.purpleBorder},
  client:         { bg:G.greenBg,  border:G.greenBorder,  avatarBg:G.green+"20",  avatarText:G.greenDeep,badgeBg:G.greenBg,  badgeText:G.greenDeep, badgeBorder:G.greenBorder },
};
 
const MSG_TYPE_OVERRIDE = {
  warning:  { bg:G.amberBg,  border:G.amberBorder,  badge:{ bg:G.amberBg,  text:G.amberText, border:G.amberBorder,  label:"Warning"  } },
  decision: { bg:G.greenBg,  border:G.greenBorder,  badge:{ bg:G.greenBg,  text:G.greenDeep, border:G.greenBorder,  label:"Decision" } },
  update:   { bg:G.blueBg,   border:G.blueBorder,   badge:{ bg:G.blueBg,   text:G.blueText,  border:G.blueBorder,   label:"Update"   } },
};
 
function MentionText({ content }) {
  if (!content) return null;
  const parts = content.split(/(@[\w\s]+?)(?=\s|$|[^a-zA-Z\s])/g);
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith("@")
          ? <span key={i} style={{ fontWeight:700, color:G.greenDeep, background:G.greenBg, padding:"0 5px", borderRadius:4 }}>{part}</span>
          : <span key={i}>{part}</span>
      )}
    </>
  );
}
 
export function MessageBubble({ message, currentUser, isSameSender }) {
  const roleS = BUBBLE_ROLE[message.sender_role] || BUBBLE_ROLE.developer;
  const typeO  = MSG_TYPE_OVERRIDE[message.type];
 
  const bubbleBg     = typeO?.bg     || roleS.bg;
  const bubbleBorder = typeO?.border || roleS.border;
 
  const formatTime = ts => new Date(ts).toLocaleTimeString("en-IN", { hour:"2-digit", minute:"2-digit", hour12:true });
  const roleLabel  = roleLabels?.[message.sender_role] || message.sender_role;
 
  return (
    <div style={{ display:"flex", gap:10, marginTop: isSameSender ? 2 : 16, fontFamily:FONT, width:"100%" }}>
      {/* Avatar column */}
      <div style={{ flexShrink:0, marginTop:2, width:32 }}>
        {!isSameSender ? (
          <div style={{ width:32, height:32, borderRadius:"50%", background:roleS.avatarBg, border:`1.5px solid ${roleS.avatarText}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:roleS.avatarText }}>
            {message.avatar || (message.sender_name || "?")[0]}
          </div>
        ) : null}
      </div>
 
      {/* Content */}
      <div style={{ flex:1, minWidth:0 }}>
        {!isSameSender && (
          <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:6, flexWrap:"wrap" }}>
            <span style={{ fontSize:13, fontWeight:700, color:G.text }}>{message.sender_name}</span>
            <span style={{ fontSize:10, fontWeight:700, background:roleS.badgeBg, color:roleS.badgeText, border:`1px solid ${roleS.badgeBorder}`, padding:"2px 8px", borderRadius:6 }}>{roleLabel}</span>
            {typeO && (
              <span style={{ fontSize:10, fontWeight:700, background:typeO.badge.bg, color:typeO.badge.text, border:`1px solid ${typeO.badge.border}`, padding:"2px 8px", borderRadius:99 }}>{typeO.badge.label}</span>
            )}
            <span style={{ fontSize:11, color:G.muted }}>{formatTime(message.timestamp)}</span>
          </div>
        )}
 
        {/* Bubble */}
        <div style={{
          display:"inline-block", maxWidth:"min(560px, 100%)",
          padding:"10px 14px", borderRadius:"14px 14px 14px 4px",
          fontSize:13, color:G.text, lineHeight:1.6,
          background:bubbleBg, border:`1px solid ${bubbleBorder}`,
          wordBreak:"break-word",
        }}>
          <MentionText content={message.content} />
 
          {message.is_locked && (
            <div style={{ display:"flex", alignItems:"center", gap:6, marginTop:8, paddingTop:8, borderTop:`1px solid ${G.greenBorder}` }}>
              <svg width="12" height="12" fill={G.greenDeep} viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
              </svg>
              <span style={{ fontSize:11, color:G.greenDeep, fontWeight:600 }}>Locked decision — cannot be edited</span>
            </div>
          )}
        </div>
 
        {isSameSender && (
          <p style={{ fontSize:11, color:G.muted, marginTop:3, marginLeft:4 }}>{formatTime(message.timestamp)}</p>
        )}
      </div>
    </div>
  );
}
 
export default MessageBubble;