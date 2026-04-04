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

import { roleColors, roleLabels } from "../data/dummyData";
 
const ROLE_INLINE = {
  platform_admin: { avatarBg:G.red+"20",   avatarText:G.red,      badgeBg:G.redBg,    badgeText:G.redText,   badgeBorder:G.redBorder,   label:"Admin"       },
  agency_admin:   { avatarBg:G.blue+"20",  avatarText:G.blue,     badgeBg:G.blueBg,   badgeText:G.blueText,  badgeBorder:G.blueBorder,  label:"Agency"      },
  agency_team:    { avatarBg:G.amber+"20", avatarText:G.amberText,badgeBg:G.amberBg,  badgeText:G.amberText, badgeBorder:G.amberBorder, label:"Team"        },
  developer:      { avatarBg:G.navy+"20",  avatarText:G.navy,     badgeBg:G.navyBg,   badgeText:G.navy,      badgeBorder:G.navyBorder,  label:"Developer"   },
  designer:       { avatarBg:G.purple+"20",avatarText:G.purple,   badgeBg:G.purpleBg, badgeText:G.purpleText,badgeBorder:G.purpleBorder,label:"Designer"    },
  client:         { avatarBg:G.green+"20", avatarText:G.greenDeep,badgeBg:G.greenBg,  badgeText:G.greenDeep, badgeBorder:G.greenBorder, label:"Client"      },
};
 
function getRoleStyle(role) {
  return ROLE_INLINE[role] || ROLE_INLINE.developer;
}
 
export function MentionDropdown({ participants, query, onSelect, position }) {
  const filtered = participants.filter(p => p.name.toLowerCase().includes((query || "").toLowerCase()));
  if (filtered.length === 0) return null;
 
  return (
    <div style={{
      position:"absolute", zIndex:50, bottom: position?.bottom || "100%", left: position?.left || 0,
      width:"min(260px, 90vw)",
      background:G.white, border:`1px solid ${G.greenBorder}`,
      borderRadius:14, boxShadow:"0 8px 32px rgba(15,26,59,0.12)",
      overflow:"hidden", fontFamily:FONT,
    }}>
      {/* Header */}
      <div style={{ padding:"8px 14px 6px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}` }}>
        <p style={{ fontSize:10, fontWeight:800, color:G.greenDeep, textTransform:"uppercase", letterSpacing:"0.08em", margin:0 }}>Mention a participant</p>
      </div>
 
      {/* List */}
      <ul style={{ maxHeight:208, overflowY:"auto", padding:"6px 0", listStyle:"none", margin:0 }}>
        {filtered.map(participant => {
          const s = getRoleStyle(participant.role);
          const roleLabel = roleLabels?.[participant.role] || participant.role;
          return (
            <li key={participant.id}>
              <button
                onMouseDown={e => { e.preventDefault(); onSelect(participant); }}
                style={{ width:"100%", display:"flex", alignItems:"center", gap:10, padding:"9px 14px", background:"none", border:"none", cursor:"pointer", textAlign:"left", fontFamily:FONT, transition:"background 0.1s" }}
                onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
                onMouseLeave={e => e.currentTarget.style.background = "none"}
              >
                {/* Avatar */}
                <div style={{ position:"relative", flexShrink:0 }}>
                  <div style={{ width:30, height:30, borderRadius:"50%", background:s.avatarBg, border:`1.5px solid ${s.avatarText}33`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:800, color:s.avatarText }}>
                    {participant.avatar || participant.name[0]}
                  </div>
                  <span style={{ position:"absolute", bottom:0, right:0, width:8, height:8, borderRadius:"50%", background:participant.online ? G.green : G.muted, border:`1.5px solid ${G.white}` }} />
                </div>
 
                {/* Name + role */}
                <div style={{ flex:1, minWidth:0 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:G.text, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{participant.name}</p>
                  <p style={{ fontSize:11, color:G.muted, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{roleLabel}</p>
                </div>
 
                {/* Role badge */}
                <span style={{ fontSize:10, fontWeight:700, background:s.badgeBg, color:s.badgeText, border:`1px solid ${s.badgeBorder}`, padding:"2px 8px", borderRadius:6, flexShrink:0 }}>
                  {s.label}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
 
      {/* Footer */}
      <div style={{ padding:"6px 14px 8px", borderTop:`1px solid ${G.greenBorder}`, background:G.greenBg }}>
        <p style={{ fontSize:10, color:G.muted, margin:0, fontWeight:600 }}>Click to mention</p>
      </div>
    </div>
  );
}
 
export default MentionDropdown;