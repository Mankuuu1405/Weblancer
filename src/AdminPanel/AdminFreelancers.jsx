// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { mockFreelancers } from "./mockData";

// // /* ── Theme tokens ── */
// // const G = {
// //   greenLight:  "#A8E063",
// //   green:       "#6EC030",
// //   greenDeep:   "#2E7D1F",
// //   greenBg:     "#f1fce8",
// //   greenBorder: "#d4edbb",

// //   navyLight:   "#4A6FA5",
// //   navy:        "#1A2B5E",
// //   navyDeep:    "#0F1A3B",

// //   gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

// //   text:   "#1C1C1C",
// //   sub:    "#4b5563",
// //   muted:  "#9ca3af",
// //   border: "#e5e7eb",
// //   bg:     "#f9fafb",
// //   white:  "#ffffff",

// //   amber:       "#f59e0b",
// //   amberBg:     "#fffbeb",
// //   amberBorder: "#fde68a",
// //   red:         "#ef4444",
// //   redBg:       "#fef2f2",
// //   redBorder:   "#fecaca",
// //   purple:      "#7c3aed",
// //   purpleBg:    "#f5f3ff",
// //   purpleBorder:"#ddd6fe",
// //   blue:        "#2563eb",
// //   blueBg:      "#eff6ff",
// //   blueBorder:  "#bfdbfe",
// // };

// // const FONT = "'Poppins', sans-serif";

// // /* ── Stat card ── */
// // const STAT_COLOR = {
// //   gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
// //   green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
// //   orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
// //   red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
// // };

// // function StatCard({ label, value, sub, color = "gray" }) {
// //   const c = STAT_COLOR[color];
// //   return (
// //     <div style={{
// //       background: c.bg, border: `1px solid ${c.border}`,
// //       borderRadius: 14, padding: "16px 20px", flex: 1,
// //       boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
// //     }}>
// //       <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
// //       <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
// //       {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
// //     </div>
// //   );
// // }

// // /* ── Avatar ── */
// // function Avatar({ name }) {
// //   const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
// //   const idx = name.charCodeAt(0) % colors.length;
// //   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
// //   return (
// //     <div style={{
// //       width: 32, height: 32, borderRadius: "50%",
// //       background: colors[idx] + "22", border: `1.5px solid ${colors[idx]}44`,
// //       display: "flex", alignItems: "center", justifyContent: "center",
// //       fontSize: 11, fontWeight: 700, color: colors[idx], flexShrink: 0,
// //     }}>{initials}</div>
// //   );
// // }

// // /* ── Badge ── */
// // const BADGE_STYLE = {
// //   "Elite++": { bg: G.purpleBg, border: G.purpleBorder, text: G.purple },
// //   "Pro+":    { bg: G.blueBg,   border: G.blueBorder,   text: G.blue   },
// //   "Verified":{ bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep },
// // };

// // function Badge({ label }) {
// //   const s = BADGE_STYLE[label] || BADGE_STYLE["Verified"];
// //   return (
// //     <span style={{
// //       fontSize: 10, fontWeight: 700,
// //       background: s.bg, color: s.text,
// //       border: `1px solid ${s.border}`,
// //       padding: "2px 9px", borderRadius: 99,
// //     }}>{label}</span>
// //   );
// // }

// // /* ── Visibility badge ── */
// // const VIS_STYLE = {
// //   Boosted: { bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep, dot: G.green  },
// //   Normal:  { bg: G.bg,       border: G.border,        text: G.sub,       dot: G.muted  },
// //   Reduced: { bg: G.amberBg,  border: G.amberBorder,  text: "#92400e",   dot: G.amber  },
// //   Hidden:  { bg: G.redBg,    border: G.redBorder,     text: "#dc2626",   dot: G.red    },
// // };

// // function VisBadge({ label }) {
// //   const s = VIS_STYLE[label] || VIS_STYLE.Normal;
// //   return (
// //     <span style={{
// //       display: "inline-flex", alignItems: "center", gap: 5,
// //       fontSize: 10, fontWeight: 700,
// //       background: s.bg, color: s.text,
// //       border: `1px solid ${s.border}`,
// //       padding: "2px 9px", borderRadius: 99,
// //     }}>
// //       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
// //       {label}
// //     </span>
// //   );
// // }

// // /* ── Risk flag ── */
// // const RISK_STYLE = {
// //   Low:    { bg: G.greenBg, border: G.greenBorder, text: G.greenDeep, dot: G.green },
// //   Medium: { bg: G.amberBg, border: G.amberBorder, text: "#92400e",   dot: G.amber },
// //   High:   { bg: G.redBg,   border: G.redBorder,   text: "#dc2626",   dot: G.red   },
// // };

// // function RiskFlag({ level }) {
// //   const s = RISK_STYLE[level] || RISK_STYLE.Low;
// //   return (
// //     <span style={{
// //       display: "inline-flex", alignItems: "center", gap: 5,
// //       fontSize: 10, fontWeight: 700,
// //       background: s.bg, color: s.text,
// //       border: `1px solid ${s.border}`,
// //       padding: "2px 9px", borderRadius: 99,
// //     }}>
// //       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
// //       {level}
// //     </span>
// //   );
// // }

// // /* ── Trust score bar ── */
// // function TrustScore({ score }) {
// //   const color = score >= 75 ? G.greenDeep : score >= 50 ? "#b45309" : "#dc2626";
// //   const bg    = score >= 75 ? G.greenBg   : score >= 50 ? G.amberBg  : G.redBg;
// //   return (
// //     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //       <div style={{ width: 48, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
// //         <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
// //       </div>
// //       <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
// //     </div>
// //   );
// // }

// // /* ── Skill score bar ── */
// // function SkillScore({ score }) {
// //   const color = score >= 75 ? G.green : score >= 50 ? G.amber : G.red;
// //   return (
// //     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
// //       <div style={{ width: 52, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
// //         <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
// //       </div>
// //       <span style={{ fontSize: 11, fontWeight: 700, color: G.sub }}>{score}</span>
// //     </div>
// //   );
// // }

// // /* ── Dispute / on-time coloured text ── */
// // function DisputeRate({ val }) {
// //   const n = parseInt(val);
// //   const color = n > 10 ? "#dc2626" : n > 5 ? "#b45309" : G.greenDeep;
// //   return <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>;
// // }

// // function OnTime({ val }) {
// //   const n = parseInt(val);
// //   const color = n >= 90 ? G.greenDeep : n >= 75 ? "#b45309" : "#dc2626";
// //   return <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>;
// // }

// // const HEADERS = ["Freelancer","Primary Skill","Badge","Skill Score","Trust","Active","Completed","Dispute%","On-Time","Visibility","Risk","Actions"];

// // export default function AdminFreelancers() {
// //   const navigate = useNavigate();
// //   const [search,            setSearch]            = useState("");
// //   const [badgeFilter,       setBadgeFilter]       = useState("");
// //   const [visibilityFilter,  setVisibilityFilter]  = useState("");
// //   const [riskFilter,        setRiskFilter]        = useState("");
// //   const [hovRow,            setHovRow]            = useState(null);

// //   const filtered = mockFreelancers.filter((f) => {
// //     const q = search.toLowerCase();
// //     const matchSearch = f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q) || f.primarySkill.toLowerCase().includes(q);
// //     const matchBadge  = !badgeFilter      || f.badge      === badgeFilter;
// //     const matchVis    = !visibilityFilter || f.visibility === visibilityFilter;
// //     const matchRisk   = !riskFilter       || f.riskFlag   === riskFilter;
// //     return matchSearch && matchBadge && matchVis && matchRisk;
// //   });

// //   const stats = {
// //     total:    mockFreelancers.length,
// //     elite:    mockFreelancers.filter(f => f.badge !== "Verified").length,
// //     dispute:  mockFreelancers.filter(f => parseInt(f.disputeRate) > 10).length,
// //     reduced:  mockFreelancers.filter(f => f.visibility === "Reduced" || f.visibility === "Hidden").length,
// //   };

// //   const selectStyle = (active) => ({
// //     fontSize: 12, fontWeight: 600, fontFamily: FONT,
// //     border: `1.5px solid ${active ? G.green : G.greenBorder}`,
// //     borderRadius: 100, padding: "8px 14px",
// //     background: active ? G.greenBg : G.white,
// //     color: active ? G.greenDeep : G.sub,
// //     cursor: "pointer",
// //   });

// //   return (
// //     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

// //       <style>{`
// //         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
// //         * { font-family: 'Poppins', sans-serif; }
// //         input[type=text], select { outline: none; font-family: 'Poppins', sans-serif; }
// //       `}</style>

// //       {/* ── Page header ── */}
// //       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
// //         <div>
// //           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Freelancers</h1>
// //           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Manage & monitor your freelancer workforce quality</p>
// //         </div>
// //         <button style={{
// //           display: "inline-flex", alignItems: "center", gap: 6,
// //           fontSize: 12, fontWeight: 700, fontFamily: FONT,
// //           background: G.gradNavy, color: G.white,
// //           border: "none", borderRadius: 100, padding: "8px 16px",
// //           cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
// //         }}>⬇ Export</button>
// //       </div>

// //       {/* ── Stats strip ── */}
// //       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
// //         <StatCard label="Total Freelancers"   value={stats.total}   color="gray"   />
// //         <StatCard label="Elite++ / Pro+"      value={stats.elite}   color="green"  />
// //         <StatCard label="High Dispute Rate"   value={stats.dispute} color="orange" sub="> 10% disputes" />
// //         <StatCard label="Visibility Reduced"  value={stats.reduced} color="red"    />
// //       </div>

// //       {/* ── Table card ── */}
// //       <div style={{
// //         background: G.white,
// //         border: `1px solid ${G.greenBorder}`,
// //         borderRadius: 16, overflow: "hidden",
// //         boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
// //       }}>

// //         {/* Filter bar */}
// //         <div style={{
// //           padding: "14px 20px",
// //           borderBottom: `1px solid ${G.greenBorder}`,
// //           display: "flex", flexWrap: "wrap", gap: 10,
// //           alignItems: "center", justifyContent: "space-between",
// //           background: G.greenBg,
// //         }}>
// //           <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
// //             {/* Search */}
// //             <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
// //               <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
// //               <input
// //                 value={search}
// //                 onChange={(e) => setSearch(e.target.value)}
// //                 placeholder="Search name, skill, email…"
// //                 style={{
// //                   width: "100%", fontSize: 12, fontWeight: 500,
// //                   border: `1.5px solid ${G.greenBorder}`,
// //                   borderRadius: 100, padding: "8px 12px 8px 32px",
// //                   background: G.white, color: G.text, boxSizing: "border-box",
// //                 }}
// //               />
// //             </div>
// //             {/* Dropdowns */}
// //             {[
// //               { value: badgeFilter,      setter: setBadgeFilter,      label: "All Badges",     opts: ["Elite++","Pro+","Verified"]                  },
// //               { value: visibilityFilter, setter: setVisibilityFilter, label: "All Visibility", opts: ["Boosted","Normal","Reduced","Hidden"]         },
// //               { value: riskFilter,       setter: setRiskFilter,       label: "All Risk",       opts: ["Low","Medium","High"]                         },
// //             ].map(({ value, setter, label, opts }) => (
// //               <select key={label} value={value} onChange={(e) => setter(e.target.value)} style={selectStyle(!!value)}>
// //                 <option value="">{label}</option>
// //                 {opts.map(o => <option key={o} value={o}>{o}</option>)}
// //               </select>
// //             ))}
// //           </div>
// //           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{filtered.length} results</span>
// //         </div>

// //         {/* Table */}
// //         <div style={{ overflowX: "auto" }}>
// //           <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
// //             <thead>
// //               <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
// //                 {HEADERS.map(h => (
// //                   <th key={h} style={{
// //                     padding: "10px 14px", fontSize: 10, fontWeight: 700,
// //                     color: G.muted, textTransform: "uppercase",
// //                     letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap",
// //                   }}>{h}</th>
// //                 ))}
// //               </tr>
// //             </thead>
// //             <tbody>
// //               {filtered.map((f) => (
// //                 <tr
// //                   key={f.id}
// //                   style={{
// //                     borderBottom: `1px solid ${G.border}`,
// //                     background: hovRow === f.id ? G.greenBg : G.white,
// //                     cursor: "pointer", transition: "background 0.1s",
// //                   }}
// //                   onMouseEnter={() => setHovRow(f.id)}
// //                   onMouseLeave={() => setHovRow(null)}
// //                   onClick={() => navigate(`/admin/freelancers/${f.id}`)}
// //                 >
// //                   {/* Freelancer */}
// //                   <td style={{ padding: "12px 14px" }}>
// //                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
// //                       <Avatar name={f.name} />
// //                       <div>
// //                         <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{f.name}</p>
// //                         <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{f.email}</p>
// //                       </div>
// //                     </div>
// //                   </td>
// //                   <td style={{ padding: "12px 14px", fontSize: 12, color: G.sub }}>{f.primarySkill}</td>
// //                   <td style={{ padding: "12px 14px" }}><Badge label={f.badge} /></td>
// //                   <td style={{ padding: "12px 14px" }}><SkillScore score={f.skillScore} /></td>
// //                   <td style={{ padding: "12px 14px" }}><TrustScore score={f.trustScore} /></td>
// //                   <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{f.activeProjects}</td>
// //                   <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{f.completedProjects}</td>
// //                   <td style={{ padding: "12px 14px" }}><DisputeRate val={f.disputeRate} /></td>
// //                   <td style={{ padding: "12px 14px" }}><OnTime val={f.onTimeDelivery} /></td>
// //                   <td style={{ padding: "12px 14px" }}><VisBadge label={f.visibility} /></td>
// //                   <td style={{ padding: "12px 14px" }}><RiskFlag level={f.riskFlag} /></td>
// //                   <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
// //                     <div style={{ opacity: hovRow === f.id ? 1 : 0, transition: "opacity 0.15s" }}>
// //                       <button
// //                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/freelancers/${f.id}`); }}
// //                         style={{
// //                           fontSize: 11, fontWeight: 700, fontFamily: FONT,
// //                           background: G.gradNavy, color: G.white,
// //                           border: "none", borderRadius: 100, padding: "6px 12px",
// //                           cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
// //                         }}>View</button>
// //                     </div>
// //                   </td>
// //                 </tr>
// //               ))}
// //             </tbody>
// //           </table>
// //         </div>

// //         {/* Empty state */}
// //         {filtered.length === 0 && (
// //           <div style={{
// //             display: "flex", flexDirection: "column", alignItems: "center",
// //             justifyContent: "center", padding: "56px 20px", textAlign: "center",
// //           }}>
// //             <div style={{
// //               width: 52, height: 52, borderRadius: "50%",
// //               background: G.greenBg, border: `1px solid ${G.greenBorder}`,
// //               display: "flex", alignItems: "center", justifyContent: "center",
// //               fontSize: 22, marginBottom: 12,
// //             }}>◎</div>
// //             <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No freelancers match your filters</p>
// //             <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
// //           </div>
// //         )}

// //         {/* Footer */}
// //         <div style={{
// //           padding: "12px 20px",
// //           borderTop: `1px solid ${G.greenBorder}`,
// //           background: G.greenBg,
// //         }}>
// //           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
// //             Showing {filtered.length} of {mockFreelancers.length} freelancers
// //           </span>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }














import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockFreelancers } from "./mockData";

/* ── Theme tokens ── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:   "#1C1C1C",
  sub:    "#4b5563",
  muted:  "#9ca3af",
  border: "#e5e7eb",
  bg:     "#f9fafb",
  white:  "#ffffff",
  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  purple:      "#7c3aed",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  blue:        "#2563eb",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
};
const FONT = "'Poppins', sans-serif";

const STAT_COLOR = {
  gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
  green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
  orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
  red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
};

function StatCard({ label, value, sub, color = "gray" }) {
  const c = STAT_COLOR[color];
  return (
    <div style={{
      background: c.bg, border: `1px solid ${c.border}`,
      borderRadius: 14, padding: "16px 20px", flex: 1,
      boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
      minWidth: 0,
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

function Avatar({ name }) {
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
  const idx = name.charCodeAt(0) % colors.length;
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  return (
    <div style={{
      width: 32, height: 32, borderRadius: "50%",
      background: colors[idx] + "22", border: `1.5px solid ${colors[idx]}44`,
      display: "flex", alignItems: "center", justifyContent: "center",
      fontSize: 11, fontWeight: 700, color: colors[idx], flexShrink: 0,
    }}>{initials}</div>
  );
}

const BADGE_STYLE = {
  "Elite++": { bg: G.purpleBg, border: G.purpleBorder, text: G.purple },
  "Pro+":    { bg: G.blueBg,   border: G.blueBorder,   text: G.blue   },
  "Verified":{ bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep },
};
function Badge({ label }) {
  const s = BADGE_STYLE[label] || BADGE_STYLE["Verified"];
  return (
    <span style={{
      fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 9px", borderRadius: 99,
    }}>{label}</span>
  );
}

const VIS_STYLE = {
  Boosted: { bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep, dot: G.green  },
  Normal:  { bg: G.bg,       border: G.border,        text: G.sub,       dot: G.muted  },
  Reduced: { bg: G.amberBg,  border: G.amberBorder,  text: "#92400e",   dot: G.amber  },
  Hidden:  { bg: G.redBg,    border: G.redBorder,     text: "#dc2626",   dot: G.red    },
};
function VisBadge({ label }) {
  const s = VIS_STYLE[label] || VIS_STYLE.Normal;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 9px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {label}
    </span>
  );
}

const RISK_STYLE = {
  Low:    { bg: G.greenBg, border: G.greenBorder, text: G.greenDeep, dot: G.green },
  Medium: { bg: G.amberBg, border: G.amberBorder, text: "#92400e",   dot: G.amber },
  High:   { bg: G.redBg,   border: G.redBorder,   text: "#dc2626",   dot: G.red   },
};
function RiskFlag({ level }) {
  const s = RISK_STYLE[level] || RISK_STYLE.Low;
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 9px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {level}
    </span>
  );
}

function TrustScore({ score }) {
  const color = score >= 75 ? G.greenDeep : score >= 50 ? "#b45309" : "#dc2626";
  const bg    = score >= 75 ? G.greenBg   : score >= 50 ? G.amberBg  : G.redBg;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 48, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
    </div>
  );
}

function SkillScore({ score }) {
  const color = score >= 75 ? G.green : score >= 50 ? G.amber : G.red;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 52, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color: G.sub }}>{score}</span>
    </div>
  );
}

function DisputeRate({ val }) {
  const n = parseInt(val);
  const color = n > 10 ? "#dc2626" : n > 5 ? "#b45309" : G.greenDeep;
  return <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>;
}

function OnTime({ val }) {
  const n = parseInt(val);
  const color = n >= 90 ? G.greenDeep : n >= 75 ? "#b45309" : "#dc2626";
  return <span style={{ fontSize: 12, fontWeight: 700, color }}>{val}</span>;
}

/* Mobile Card View for each freelancer */
function FreelancerCard({ f, onView }) {
  return (
    <div
      onClick={onView}
      style={{
        background: G.white,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
        transition: "box-shadow 0.15s",
        boxShadow: "0 1px 6px rgba(110,192,48,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <Avatar name={f.name} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{f.name}</p>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{f.email}</p>
          </div>
        </div>
        <Badge label={f.badge} />
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Skill</p>
          <p style={{ fontSize: 12, color: G.sub, fontWeight: 600, margin: 0 }}>{f.primarySkill}</p>
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Projects</p>
          <p style={{ fontSize: 12, color: G.text, fontWeight: 700, margin: 0 }}>{f.activeProjects} active · {f.completedProjects} done</p>
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Trust</p>
          <TrustScore score={f.trustScore} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Skill Score</p>
          <SkillScore score={f.skillScore} />
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
          <VisBadge label={f.visibility} />
          <RiskFlag level={f.riskFlag} />
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <span style={{ fontSize: 11, color: G.muted }}>Dispute: <DisputeRate val={f.disputeRate} /></span>
          <span style={{ fontSize: 11, color: G.muted }}>OT: <OnTime val={f.onTimeDelivery} /></span>
        </div>
      </div>
    </div>
  );
}

const HEADERS = ["Freelancer","Primary Skill","Badge","Skill Score","Trust","Active","Completed","Dispute%","On-Time","Visibility","Risk","Actions"];

export default function AdminFreelancers() {
  const navigate = useNavigate();
  const [search,            setSearch]            = useState("");
  const [badgeFilter,       setBadgeFilter]       = useState("");
  const [visibilityFilter,  setVisibilityFilter]  = useState("");
  const [riskFilter,        setRiskFilter]        = useState("");
  const [hovRow,            setHovRow]            = useState(null);

  const filtered = mockFreelancers.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch = f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q) || f.primarySkill.toLowerCase().includes(q);
    const matchBadge  = !badgeFilter      || f.badge      === badgeFilter;
    const matchVis    = !visibilityFilter || f.visibility === visibilityFilter;
    const matchRisk   = !riskFilter       || f.riskFlag   === riskFilter;
    return matchSearch && matchBadge && matchVis && matchRisk;
  });

  const stats = {
    total:    mockFreelancers.length,
    elite:    mockFreelancers.filter(f => f.badge !== "Verified").length,
    dispute:  mockFreelancers.filter(f => parseInt(f.disputeRate) > 10).length,
    reduced:  mockFreelancers.filter(f => f.visibility === "Reduced" || f.visibility === "Hidden").length,
  };

  const selectStyle = (active) => ({
    fontSize: 12, fontWeight: 600, fontFamily: FONT,
    border: `1.5px solid ${active ? G.green : G.greenBorder}`,
    borderRadius: 100, padding: "8px 14px",
    background: active ? G.greenBg : G.white,
    color: active ? G.greenDeep : G.sub,
    cursor: "pointer",
  });

  return (
    <div className="wl-page-padding" style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        input[type=text], select { outline: none; font-family: 'Poppins', sans-serif; }

        .wl-fl-stat-strip { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
        .wl-fl-stat-strip > * { flex: 1 1 120px; }

        .wl-fl-table-wrap { display: block; }
        .wl-fl-card-list { display: none; gap: 12px; flex-direction: column; padding: 16px; }

        .wl-fl-filter-bar {
          padding: 14px 20px;
          border-bottom: 1px solid ${G.greenBorder};
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          align-items: center;
          justify-content: space-between;
          background: ${G.greenBg};
        }
        .wl-fl-filter-inner {
          display: flex;
          gap: 10px;
          flex-wrap: wrap;
          align-items: center;
          flex: 1;
        }
        .wl-fl-search-wrap {
          position: relative;
          flex: 1 1 200px;
          max-width: 280px;
        }

        @media (max-width: 1024px) {
          .wl-fl-table-wrap { display: none; }
          .wl-fl-card-list { display: flex; }
        }

        @media (max-width: 640px) {
          .wl-fl-stat-strip { gap: 10px; }
          .wl-fl-filter-bar { padding: 12px; gap: 8px; }
          .wl-fl-filter-inner { flex-direction: column; align-items: stretch; }
          .wl-fl-search-wrap { max-width: 100%; }
          .wl-fl-filter-inner select { width: 100%; }
          .wl-fl-page-header { flex-direction: column; align-items: flex-start; gap: 10px; }
        }
      `}</style>

      {/* ── Page header ── */}
      <div className="wl-fl-page-header" style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Freelancers</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Manage & monitor your freelancer workforce quality</p>
        </div>
        <button style={{
          display: "inline-flex", alignItems: "center", gap: 6,
          fontSize: 12, fontWeight: 700, fontFamily: FONT,
          background: G.gradNavy, color: G.white,
          border: "none", borderRadius: 100, padding: "8px 16px",
          cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
          whiteSpace: "nowrap",
        }}>⬇ Export</button>
      </div>

      {/* ── Stats strip ── */}
      <div className="wl-fl-stat-strip">
        <StatCard label="Total Freelancers"   value={stats.total}   color="gray"   />
        <StatCard label="Elite++ / Pro+"      value={stats.elite}   color="green"  />
        <StatCard label="High Dispute Rate"   value={stats.dispute} color="orange" sub="> 10% disputes" />
        <StatCard label="Visibility Reduced"  value={stats.reduced} color="red"    />
      </div>

      {/* ── Table card ── */}
      <div style={{
        background: G.white,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 16, overflow: "hidden",
        boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
      }}>

        {/* Filter bar */}
        <div className="wl-fl-filter-bar">
          <div className="wl-fl-filter-inner">
            <div className="wl-fl-search-wrap">
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search name, skill, email…"
                style={{
                  width: "100%", fontSize: 12, fontWeight: 500,
                  border: `1.5px solid ${G.greenBorder}`,
                  borderRadius: 100, padding: "8px 12px 8px 32px",
                  background: G.white, color: G.text, boxSizing: "border-box",
                }}
              />
            </div>
            {[
              { value: badgeFilter,      setter: setBadgeFilter,      label: "All Badges",     opts: ["Elite++","Pro+","Verified"] },
              { value: visibilityFilter, setter: setVisibilityFilter, label: "All Visibility", opts: ["Boosted","Normal","Reduced","Hidden"] },
              { value: riskFilter,       setter: setRiskFilter,       label: "All Risk",       opts: ["Low","Medium","High"] },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={(e) => setter(e.target.value)} style={selectStyle(!!value)}>
                <option value="">{label}</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{filtered.length} results</span>
        </div>

        {/* ── Desktop Table ── */}
        <div className="wl-fl-table-wrap" style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1100 }}>
            <thead>
              <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
                {HEADERS.map(h => (
                  <th key={h} style={{
                    padding: "10px 14px", fontSize: 10, fontWeight: 700,
                    color: G.muted, textTransform: "uppercase",
                    letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap",
                  }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((f) => (
                <tr
                  key={f.id}
                  style={{
                    borderBottom: `1px solid ${G.border}`,
                    background: hovRow === f.id ? G.greenBg : G.white,
                    cursor: "pointer", transition: "background 0.1s",
                  }}
                  onMouseEnter={() => setHovRow(f.id)}
                  onMouseLeave={() => setHovRow(null)}
                  onClick={() => navigate(`/admin/freelancers/${f.id}`)}
                >
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={f.name} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{f.name}</p>
                        <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{f.email}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 12, color: G.sub }}>{f.primarySkill}</td>
                  <td style={{ padding: "12px 14px" }}><Badge label={f.badge} /></td>
                  <td style={{ padding: "12px 14px" }}><SkillScore score={f.skillScore} /></td>
                  <td style={{ padding: "12px 14px" }}><TrustScore score={f.trustScore} /></td>
                  <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{f.activeProjects}</td>
                  <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{f.completedProjects}</td>
                  <td style={{ padding: "12px 14px" }}><DisputeRate val={f.disputeRate} /></td>
                  <td style={{ padding: "12px 14px" }}><OnTime val={f.onTimeDelivery} /></td>
                  <td style={{ padding: "12px 14px" }}><VisBadge label={f.visibility} /></td>
                  <td style={{ padding: "12px 14px" }}><RiskFlag level={f.riskFlag} /></td>
                  <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
                    <div style={{ opacity: hovRow === f.id ? 1 : 0, transition: "opacity 0.15s" }}>
                      <button
                        onClick={(e) => { e.stopPropagation(); navigate(`/admin/freelancers/${f.id}`); }}
                        style={{
                          fontSize: 11, fontWeight: 700, fontFamily: FONT,
                          background: G.gradNavy, color: G.white,
                          border: "none", borderRadius: 100, padding: "6px 12px",
                          cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
                        }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* ── Mobile/Tablet Card List ── */}
        <div className="wl-fl-card-list">
          {filtered.map(f => (
            <FreelancerCard
              key={f.id}
              f={f}
              onView={() => navigate(`/admin/freelancers/${f.id}`)}
            />
          ))}
        </div>

        {/* Empty state */}
        {filtered.length === 0 && (
          <div style={{
            display: "flex", flexDirection: "column", alignItems: "center",
            justifyContent: "center", padding: "56px 20px", textAlign: "center",
          }}>
            <div style={{
              width: 52, height: 52, borderRadius: "50%",
              background: G.greenBg, border: `1px solid ${G.greenBorder}`,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 22, marginBottom: 12,
            }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No freelancers match your filters</p>
            <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
          </div>
        )}

        {/* Footer */}
        <div style={{
          padding: "12px 20px",
          borderTop: `1px solid ${G.greenBorder}`,
          background: G.greenBg,
        }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
            Showing {filtered.length} of {mockFreelancers.length} freelancers
          </span>
        </div>
      </div>
    </div>
  );
}



