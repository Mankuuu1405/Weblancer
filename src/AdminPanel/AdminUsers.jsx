// import { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { mockUsers } from "./mockData";
// import {
//   StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
//   SearchBar, FilterSelect, ActionBtn, PageHeader, Table
// } from "./AdminComponents";

// /* ── Freelancer Contracts theme tokens ───────────────────────
//    GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
//    NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
//    ──────────────────────────────────────────────────────────── */
// const G = {
//   greenLight:  "#A8E063",
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",

//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   navyBg:      "#e8edf7",
//   navyBorder:  "#b8c6e0",

//   gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
//   gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

//   text:   "#1C1C1C",
//   sub:    "#4b5563",
//   muted:  "#9ca3af",
//   border: "#e5e7eb",
//   bg:     "#f9fafb",
//   white:  "#ffffff",

//   amber:       "#f59e0b",
//   amberBg:     "#fffbeb",
//   amberBorder: "#fde68a",
//   red:         "#ef4444",
//   redBg:       "#fef2f2",
//   redBorder:   "#fecaca",
// };

// const FONT = "'Poppins', sans-serif";

// /* ── Stat card colours ── */
// const STAT_COLOR = {
//   gray:   { bg: G.bg,       border: G.border,       val: G.text,     label: G.muted    },
//   green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep,label: G.greenDeep },
//   orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",  label: "#b45309"  },
//   red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",  label: "#dc2626"  },
// };

// /* ── Small reusable pieces ── */
// function InlineStatCard({ label, value, sub, color = "gray" }) {
//   const c = STAT_COLOR[color] || STAT_COLOR.gray;
//   return (
//     <div style={{
//       background: c.bg,
//       border: `1px solid ${c.border}`,
//       borderRadius: 14,
//       padding: "16px 20px",
//       flex: 1,
//       minWidth: 0,
//       boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
//     }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
//       <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
//       {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
//     </div>
//   );
// }

// function InlineStatusBadge({ status }) {
//   const map = {
//     Active:    { bg: G.greenBg,  text: G.greenDeep, dot: G.green    },
//     Pending:   { bg: G.amberBg,  text: "#92400e",   dot: G.amber    },
//     Suspended: { bg: G.amberBg,  text: "#92400e",   dot: G.amber    },
//     Banned:    { bg: G.redBg,    text: "#dc2626",   dot: G.red      },
//     Verified:  { bg: G.greenBg,  text: G.greenDeep, dot: G.green    },
//     Unverified:{ bg: G.bg,       text: G.muted,     dot: G.muted    },
//     Rejected:  { bg: G.redBg,    text: "#dc2626",   dot: G.red      },
//   };
//   const s = map[status] || { bg: G.bg, text: G.muted, dot: G.muted };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       fontSize: 11, fontWeight: 700,
//       background: s.bg, color: s.text,
//       padding: "3px 10px", borderRadius: 99,
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
//       {status}
//     </span>
//   );
// }

// function InlineTrustScore({ score }) {
//   const color = score >= 75 ? G.greenDeep : score >= 50 ? "#b45309" : "#dc2626";
//   const bg    = score >= 75 ? G.greenBg   : score >= 50 ? G.amberBg  : G.redBg;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//       <div style={{ width: 48, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//         <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
//       </div>
//       <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
//     </div>
//   );
// }

// function InlineRiskFlag({ level }) {
//   const map = {
//     Low:    { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
//     Medium: { bg: G.amberBg,  text: "#92400e",   dot: G.amber  },
//     High:   { bg: G.redBg,    text: "#dc2626",   dot: G.red    },
//   };
//   const s = map[level] || map.Low;
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       fontSize: 11, fontWeight: 700,
//       background: s.bg, color: s.text,
//       padding: "3px 10px", borderRadius: 99,
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
//       {level}
//     </span>
//   );
// }

// function InlineAvatar({ name }) {
//   const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
//   const idx    = name.charCodeAt(0) % colors.length;
//   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//   return (
//     <div style={{
//       width: 32, height: 32, borderRadius: "50%",
//       background: colors[idx] + "22",
//       border: `1.5px solid ${colors[idx]}44`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: 11, fontWeight: 700, color: colors[idx],
//       flexShrink: 0,
//     }}>{initials}</div>
//   );
// }

// const btnPrimary = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100,
//   padding: "8px 16px", cursor: "pointer",
//   boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   transition: "all 0.15s", whiteSpace: "nowrap",
// };

// const btnOutline = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.greenBg, color: G.greenDeep,
//   border: `1px solid ${G.greenBorder}`,
//   borderRadius: 100, padding: "8px 16px", cursor: "pointer",
//   transition: "all 0.15s", whiteSpace: "nowrap",
// };

// const btnWarning = {
//   ...btnOutline,
//   background: G.amberBg, color: "#92400e",
//   border: `1px solid ${G.amberBorder}`,
// };

// const btnDanger = {
//   ...btnOutline,
//   background: G.redBg, color: "#dc2626",
//   border: `1px solid ${G.redBorder}`,
// };

// const roleIcon = { Freelancer: "⟡", Agency: "⬡", Client: "◈" };

// const COL_WIDTHS = ["36px","220px","100px","100px","130px","110px","90px","110px","110px","100px"];
// const HEADERS    = ["","User","Role","Status","Trust Score","KYC","Risk","Last Active","Joined","Actions"];

// export default function AdminUsers() {
//   const navigate = useNavigate();
//   const [search,       setSearch]       = useState("");
//   const [roleFilter,   setRoleFilter]   = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [riskFilter,   setRiskFilter]   = useState("");
//   const [selected,     setSelected]     = useState([]);
//   const [hovRow,       setHovRow]       = useState(null);

//   const filtered = mockUsers.filter((u) => {
//     const q           = search.toLowerCase();
//     const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
//     const matchRole   = !roleFilter   || u.role      === roleFilter;
//     const matchStatus = !statusFilter || u.status    === statusFilter;
//     const matchRisk   = !riskFilter   || u.riskLevel === riskFilter;
//     return matchSearch && matchRole && matchStatus && matchRisk;
//   });

//   const stats = {
//     total:     mockUsers.length,
//     active:    mockUsers.filter((u) => u.status === "Active").length,
//     flagged:   mockUsers.filter((u) => u.aiFlag).length,
//     suspended: mockUsers.filter((u) => u.status === "Suspended" || u.status === "Banned").length,
//   };

//   const toggleSelect = (id) =>
//     setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);
//   const toggleAll = () =>
//     setSelected(selected.length === filtered.length ? [] : filtered.map((u) => u.id));

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//         input[type=checkbox] { accent-color: ${G.green}; width: 14px; height: 14px; cursor: pointer; }
//         input[type=text], select { outline: none; font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* ── Page header ── */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>All Users</h1>
//           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Every account on the Weblance platform</p>
//         </div>
//         <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
//           {selected.length > 0 && (
//             <>
//               <span style={{ fontSize: 12, color: G.muted, fontWeight: 600, marginRight: 4 }}>{selected.length} selected</span>
//               <button style={btnWarning}>Warn</button>
//               <button style={btnDanger}>Suspend</button>
//               <button style={btnOutline}>Export</button>
//             </>
//           )}
//           <button style={btnPrimary}>⬇ Export All</button>
//         </div>
//       </div>

//       {/* ── Stats strip ── */}
//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <InlineStatCard label="Total Users"         value={stats.total}     color="gray"   />
//         <InlineStatCard label="Active"              value={stats.active}    color="green"  sub={`${Math.round((stats.active / stats.total) * 100)}% of total`} />
//         <InlineStatCard label="AI Flagged"          value={stats.flagged}   color="orange" sub="Needs review" />
//         <InlineStatCard label="Suspended / Banned"  value={stats.suspended} color="red"    />
//       </div>

//       {/* ── Table card ── */}
//       <div style={{
//         background: G.white,
//         border: `1px solid ${G.greenBorder}`,
//         borderRadius: 16,
//         overflow: "hidden",
//         boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//       }}>

//         {/* Filter bar */}
//         <div style={{
//           padding: "14px 20px",
//           borderBottom: `1px solid ${G.greenBorder}`,
//           display: "flex", flexWrap: "wrap", gap: 10,
//           alignItems: "center", justifyContent: "space-between",
//           background: G.greenBg,
//         }}>
//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
//             {/* Search */}
//             <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
//               <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
//               <input
//                 value={search}
//                 onChange={(e) => setSearch(e.target.value)}
//                 placeholder="Search name, email, ID…"
//                 style={{
//                   width: "100%", fontSize: 12, fontWeight: 500,
//                   border: `1.5px solid ${G.greenBorder}`,
//                   borderRadius: 100, padding: "8px 12px 8px 32px",
//                   background: G.white, color: G.text,
//                   boxSizing: "border-box",
//                 }}
//               />
//             </div>

//             {/* Role filter */}
//             {[
//               { value: roleFilter,   setter: setRoleFilter,   label: "All Roles",   opts: ["Freelancer","Agency","Client"]                },
//               { value: statusFilter, setter: setStatusFilter, label: "All Status",  opts: ["Active","Pending","Suspended","Banned"]       },
//               { value: riskFilter,   setter: setRiskFilter,   label: "All Risk",    opts: ["Low","Medium","High"]                         },
//             ].map(({ value, setter, label, opts }) => (
//               <select key={label} value={value} onChange={(e) => setter(e.target.value)}
//                 style={{
//                   fontSize: 12, fontWeight: 600,
//                   border: `1.5px solid ${value ? G.green : G.greenBorder}`,
//                   borderRadius: 100, padding: "8px 14px",
//                   background: value ? G.greenBg : G.white,
//                   color: value ? G.greenDeep : G.sub,
//                   cursor: "pointer",
//                 }}>
//                 <option value="">{label}</option>
//                 {opts.map((o) => <option key={o} value={o}>{o}</option>)}
//               </select>
//             ))}
//           </div>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600, whiteSpace: "nowrap" }}>{filtered.length} results</span>
//         </div>

//         {/* Select-all bar */}
//         <div style={{
//           display: "flex", alignItems: "center", gap: 8,
//           padding: "8px 20px",
//           background: G.bg,
//           borderBottom: `1px solid ${G.border}`,
//         }}>
//           <input
//             type="checkbox"
//             checked={selected.length === filtered.length && filtered.length > 0}
//             onChange={toggleAll}
//           />
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>Select all</span>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
//             <thead>
//               <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
//                 {HEADERS.map((h, i) => (
//                   <th key={h} style={{
//                     padding: "10px 14px",
//                     fontSize: 10, fontWeight: 700,
//                     color: G.muted,
//                     textTransform: "uppercase", letterSpacing: "0.07em",
//                     textAlign: "left",
//                     width: COL_WIDTHS[i],
//                     whiteSpace: "nowrap",
//                   }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((user) => (
//                 <tr
//                   key={user.id}
//                   style={{
//                     borderBottom: `1px solid ${G.border}`,
//                     background: hovRow === user.id ? G.greenBg : G.white,
//                     cursor: "pointer",
//                     transition: "background 0.1s",
//                   }}
//                   onMouseEnter={() => setHovRow(user.id)}
//                   onMouseLeave={() => setHovRow(null)}
//                   onClick={() => navigate(`/admin/users/${user.id}`)}
//                 >
//                   {/* Checkbox */}
//                   <td style={{ padding: "12px 14px" }} onClick={(e) => e.stopPropagation()}>
//                     <input
//                       type="checkbox"
//                       checked={selected.includes(user.id)}
//                       onChange={() => toggleSelect(user.id)}
//                     />
//                   </td>

//                   {/* User */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <InlineAvatar name={user.name} />
//                       <div>
//                         <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                           <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>{user.name}</span>
//                           {user.aiFlag && (
//                             <span style={{
//                               fontSize: 9, fontWeight: 700,
//                               background: G.redBg, color: G.red,
//                               border: `1px solid ${G.redBorder}`,
//                               padding: "1px 6px", borderRadius: 99,
//                             }}>AI⚑</span>
//                           )}
//                         </div>
//                         <span style={{ fontSize: 11, color: G.muted, display: "block" }}>{user.email}</span>
//                         <span style={{ fontSize: 10, color: G.border, display: "block" }}>{user.id}</span>
//                       </div>
//                     </div>
//                   </td>

//                   {/* Role */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 12, color: G.sub, fontWeight: 600 }}>
//                       <span style={{ fontSize: 14 }}>{roleIcon[user.role]}</span>
//                       {user.role}
//                     </span>
//                   </td>

//                   {/* Status */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <InlineStatusBadge status={user.status} />
//                   </td>

//                   {/* Trust score */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <InlineTrustScore score={user.trustScore} />
//                   </td>

//                   {/* KYC */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <InlineStatusBadge status={user.verification} />
//                   </td>

//                   {/* Risk */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <InlineRiskFlag level={user.riskLevel} />
//                   </td>

//                   {/* Last active */}
//                   <td style={{ padding: "12px 14px", fontSize: 12, color: G.muted, whiteSpace: "nowrap" }}>{user.lastActive}</td>

//                   {/* Joined */}
//                   <td style={{ padding: "12px 14px", fontSize: 12, color: G.muted, whiteSpace: "nowrap" }}>{user.joinDate}</td>

//                   {/* Actions */}
//                   <td style={{ padding: "12px 14px" }} onClick={(e) => e.stopPropagation()}>
//                     <div style={{
//                       display: "flex", alignItems: "center", gap: 6,
//                       opacity: hovRow === user.id ? 1 : 0,
//                       transition: "opacity 0.15s",
//                     }}>
//                       <button
//                         onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${user.id}`); }}
//                         style={{
//                           fontSize: 11, fontWeight: 700, fontFamily: FONT,
//                           background: G.gradNavy, color: G.white,
//                           border: "none", borderRadius: 100,
//                           padding: "6px 12px", cursor: "pointer",
//                           boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
//                         }}>View</button>
//                       <button
//                         onClick={(e) => e.stopPropagation()}
//                         style={{
//                           fontSize: 13, fontWeight: 700, fontFamily: FONT,
//                           background: G.bg, color: G.sub,
//                           border: `1px solid ${G.border}`,
//                           borderRadius: 100, padding: "5px 10px",
//                           cursor: "pointer",
//                         }}>⋯</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Empty state */}
//         {filtered.length === 0 && (
//           <div style={{
//             display: "flex", flexDirection: "column", alignItems: "center",
//             justifyContent: "center", padding: "56px 20px", textAlign: "center",
//           }}>
//             <div style={{
//               width: 52, height: 52, borderRadius: "50%",
//               background: G.greenBg, border: `1px solid ${G.greenBorder}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 22, marginBottom: 12,
//             }}>◎</div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No users match your filters</p>
//             <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
//           </div>
//         )}

//         {/* Pagination footer */}
//         <div style={{
//           padding: "12px 20px",
//           borderTop: `1px solid ${G.greenBorder}`,
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           background: G.greenBg,
//         }}>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
//             Showing {filtered.length} of {mockUsers.length} users
//           </span>
//           <div style={{ display: "flex", gap: 6 }}>
//             {["← Prev", "Next →"].map((label) => (
//               <button key={label} style={{
//                 fontSize: 12, fontWeight: 600, fontFamily: FONT,
//                 padding: "7px 14px",
//                 border: `1px solid ${G.greenBorder}`,
//                 borderRadius: 100,
//                 background: G.white, color: G.greenDeep,
//                 cursor: "pointer", transition: "all 0.12s",
//               }}
//                 onMouseEnter={e => { e.currentTarget.style.background = G.greenBg; e.currentTarget.style.borderColor = G.green; }}
//                 onMouseLeave={e => { e.currentTarget.style.background = G.white;   e.currentTarget.style.borderColor = G.greenBorder; }}
//               >{label}</button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }










import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
  SearchBar, FilterSelect, ActionBtn, PageHeader, Table
} from "./AdminComponents";

const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
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
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
};
const FONT = "'Poppins', sans-serif";

const STAT_COLOR = {
  gray:   { bg:G.bg,      border:G.border,       val:G.text,      label:G.muted     },
  green:  { bg:G.greenBg, border:G.greenBorder,  val:G.greenDeep, label:G.greenDeep },
  orange: { bg:G.amberBg, border:G.amberBorder,  val:"#b45309",   label:"#b45309"   },
  red:    { bg:G.redBg,   border:G.redBorder,    val:"#dc2626",   label:"#dc2626"   },
};

function InlineStatCard({ label, value, sub, color="gray" }) {
  const c = STAT_COLOR[color]||STAT_COLOR.gray;
  return (
    <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:14, padding:"12px 14px", flex:1, minWidth:0 }}>
      <p style={{ fontSize:9, fontWeight:700, color:c.label, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</p>
      <p style={{ fontSize:20, fontWeight:800, color:c.val, margin:0, lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontSize:10, color:G.muted, marginTop:3 }}>{sub}</p>}
    </div>
  );
}

function InlineStatusBadge({ status }) {
  const map = {
    Active:    { bg:G.greenBg, text:G.greenDeep, dot:G.green  },
    Pending:   { bg:G.amberBg, text:"#92400e",   dot:G.amber  },
    Suspended: { bg:G.amberBg, text:"#92400e",   dot:G.amber  },
    Banned:    { bg:G.redBg,   text:"#dc2626",   dot:G.red    },
    Verified:  { bg:G.greenBg, text:G.greenDeep, dot:G.green  },
    Unverified:{ bg:G.bg,      text:G.muted,     dot:G.muted  },
    Rejected:  { bg:G.redBg,   text:"#dc2626",   dot:G.red    },
  };
  const s = map[status]||{ bg:G.bg, text:G.muted, dot:G.muted };
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:s.bg, color:s.text, padding:"2px 8px", borderRadius:99, whiteSpace:"nowrap" }}>
      <span style={{ width:4, height:4, borderRadius:"50%", background:s.dot }} />{status}
    </span>
  );
}

function InlineTrustScore({ score }) {
  const color = score>=75?G.greenDeep:score>=50?"#b45309":"#dc2626";
  const bg    = score>=75?G.greenBg:score>=50?G.amberBg:G.redBg;
  return (
    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
      <div style={{ width:40, height:4, background:G.border, borderRadius:99, overflow:"hidden" }}>
        <div style={{ width:`${score}%`, height:"100%", background:color, borderRadius:99 }} />
      </div>
      <span style={{ fontSize:10, fontWeight:700, color, background:bg, padding:"1px 6px", borderRadius:99 }}>{score}</span>
    </div>
  );
}

function InlineRiskFlag({ level }) {
  const map = {
    Low:    { bg:G.greenBg, text:G.greenDeep, dot:G.green  },
    Medium: { bg:G.amberBg, text:"#92400e",   dot:G.amber  },
    High:   { bg:G.redBg,   text:"#dc2626",   dot:G.red    },
  };
  const s = map[level]||map.Low;
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:s.bg, color:s.text, padding:"2px 8px", borderRadius:99, whiteSpace:"nowrap" }}>
      <span style={{ width:4, height:4, borderRadius:"50%", background:s.dot }} />{level}
    </span>
  );
}

function InlineAvatar({ name }) {
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
  const idx    = name.charCodeAt(0) % colors.length;
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  return (
    <div style={{ width:28, height:28, borderRadius:"50%", background:colors[idx]+"22", border:`1.5px solid ${colors[idx]}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:colors[idx], flexShrink:0 }}>
      {initials}
    </div>
  );
}

const btnPrimary = { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"7px 14px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)", whiteSpace:"nowrap" };
const btnOutline = { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 14px", cursor:"pointer", whiteSpace:"nowrap" };
const btnWarning = { ...btnOutline, background:G.amberBg, color:"#92400e", border:`1px solid ${G.amberBorder}` };
const btnDanger  = { ...btnOutline, background:G.redBg,   color:"#dc2626",  border:`1px solid ${G.redBorder}`  };

const roleIcon = { Freelancer:"⟡", Agency:"⬡", Client:"◈" };
const HEADERS  = ["","User","Role","Status","Trust","KYC","Risk","Last Active","Joined","Actions"];

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search,       setSearch]       = useState("");
  const [roleFilter,   setRoleFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter,   setRiskFilter]   = useState("");
  const [selected,     setSelected]     = useState([]);
  const [hovRow,       setHovRow]       = useState(null);

  const filtered = mockUsers.filter(u => {
    const q = search.toLowerCase();
    return (u.name.toLowerCase().includes(q)||u.email.toLowerCase().includes(q)||u.id.toLowerCase().includes(q)) &&
      (!roleFilter||u.role===roleFilter) &&
      (!statusFilter||u.status===statusFilter) &&
      (!riskFilter||u.riskLevel===riskFilter);
  });

  const stats = {
    total:     mockUsers.length,
    active:    mockUsers.filter(u=>u.status==="Active").length,
    flagged:   mockUsers.filter(u=>u.aiFlag).length,
    suspended: mockUsers.filter(u=>u.status==="Suspended"||u.status==="Banned").length,
  };

  const toggleSelect = (id) => setSelected(prev=>prev.includes(id)?prev.filter(x=>x!==id):[...prev,id]);
  const toggleAll    = ()   => setSelected(selected.length===filtered.length?[]:filtered.map(u=>u.id));

  // Mobile card for each user
  const MobileCard = ({ user }) => (
    <div
      onClick={() => navigate(`/admin/users/${user.id}`)}
      style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:14, cursor:"pointer", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", gap:10, marginBottom:10 }}>
        <div style={{ display:"flex", alignItems:"center", gap:4 }} onClick={e=>e.stopPropagation()}>
          <input type="checkbox" checked={selected.includes(user.id)} onChange={()=>toggleSelect(user.id)}
            style={{ accentColor:G.green, width:13, height:13, cursor:"pointer" }} />
        </div>
        <InlineAvatar name={user.name} />
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:2 }}>
            <span style={{ fontSize:13, fontWeight:700, color:G.text }}>{user.name}</span>
            {user.aiFlag && <span style={{ fontSize:9, fontWeight:700, background:G.redBg, color:G.red, border:`1px solid ${G.redBorder}`, padding:"1px 5px", borderRadius:99 }}>AI⚑</span>}
          </div>
          <span style={{ fontSize:10, color:G.muted, display:"block" }}>{user.email}</span>
          <span style={{ fontSize:9, color:G.border, display:"block" }}>{user.id}</span>
        </div>
        <div style={{ flexShrink:0 }}>
          <InlineStatusBadge status={user.status} />
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, paddingTop:10, borderTop:`1px solid ${G.greenBorder}` }}>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Trust</p>
          <InlineTrustScore score={user.trustScore} />
        </div>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>KYC</p>
          <InlineStatusBadge status={user.verification} />
        </div>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 3px", textTransform:"uppercase", letterSpacing:"0.05em" }}>Risk</p>
          <InlineRiskFlag level={user.riskLevel} />
        </div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:8, paddingTop:8, borderTop:`1px solid ${G.greenBorder}` }}>
        <span style={{ fontSize:10, color:G.muted }}>{user.role} · {user.lastActive}</span>
        <button onClick={e=>{e.stopPropagation();navigate(`/admin/users/${user.id}`);}} style={{ ...btnPrimary, padding:"5px 12px", fontSize:10 }}>View →</button>
      </div>
    </div>
  );

  return (
    <div style={{ padding:"12px 12px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        input[type=checkbox] { accent-color:${G.green}; width:13px; height:13px; cursor:pointer; }
        input[type=text], select { outline:none; font-family:'Poppins',sans-serif; }

        @media (min-width:640px)  { .usr-page { padding:20px 20px 64px !important; } }
        @media (min-width:1024px) { .usr-page { padding:28px 28px 64px !important; } }

        .usr-table-wrap { display:none; overflow-x:auto; }
        .usr-cards-wrap { display:flex; flex-direction:column; gap:10px; }
        @media (min-width:860px) {
          .usr-table-wrap { display:block; }
          .usr-cards-wrap { display:none; }
        }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14, gap:10, flexWrap:"wrap" }}>
        <div>
          <h1 style={{ fontSize:18, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.3px" }}>All Users</h1>
          <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Every account on the Weblance platform</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
          {selected.length>0 && (
            <>
              <span style={{ fontSize:11, color:G.muted, fontWeight:600 }}>{selected.length} selected</span>
              <button style={btnWarning}>Warn</button>
              <button style={btnDanger}>Suspend</button>
              <button style={btnOutline}>Export</button>
            </>
          )}
          <button style={btnPrimary}>⬇ Export All</button>
        </div>
      </div>

      {/* Stats: 2-col mobile, 4-col tablet+ */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:10, marginBottom:14 }}
        className="sm:grid-cols-4">
        <InlineStatCard label="Total Users"        value={stats.total}     color="gray"   />
        <InlineStatCard label="Active"             value={stats.active}    color="green"  sub={`${Math.round((stats.active/stats.total)*100)}% of total`} />
        <InlineStatCard label="AI Flagged"         value={stats.flagged}   color="orange" sub="Needs review" />
        <InlineStatCard label="Suspended / Banned" value={stats.suspended} color="red"    />
      </div>

      {/* Table card */}
      <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>

        {/* Filter bar */}
        <div style={{ padding:"12px 14px", borderBottom:`1px solid ${G.greenBorder}`, display:"flex", flexWrap:"wrap", gap:8, alignItems:"center", justifyContent:"space-between", background:G.greenBg }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", flex:1 }}>
            <div style={{ position:"relative", flex:"1 1 160px", maxWidth:260 }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:G.muted }}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search name, email, ID…"
                style={{ width:"100%", fontSize:11, fontWeight:500, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 10px 7px 28px", background:G.white, color:G.text, boxSizing:"border-box" }} />
            </div>
            {[
              { value:roleFilter,   setter:setRoleFilter,   label:"Role",   opts:["Freelancer","Agency","Client"]           },
              { value:statusFilter, setter:setStatusFilter, label:"Status", opts:["Active","Pending","Suspended","Banned"]  },
              { value:riskFilter,   setter:setRiskFilter,   label:"Risk",   opts:["Low","Medium","High"]                    },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={e=>setter(e.target.value)}
                style={{ fontSize:11, fontWeight:600, border:`1.5px solid ${value?G.green:G.greenBorder}`, borderRadius:100, padding:"7px 10px", background:value?G.greenBg:G.white, color:value?G.greenDeep:G.sub, cursor:"pointer" }}>
                <option value="">{label}</option>
                {opts.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize:10, color:G.muted, fontWeight:600, whiteSpace:"nowrap" }}>{filtered.length} results</span>
        </div>

        {/* Select-all bar */}
        <div style={{ display:"flex", alignItems:"center", gap:8, padding:"7px 14px", background:G.bg, borderBottom:`1px solid ${G.border}` }}>
          <input type="checkbox" checked={selected.length===filtered.length&&filtered.length>0} onChange={toggleAll} />
          <span style={{ fontSize:10, color:G.muted, fontWeight:600 }}>Select all ({filtered.length})</span>
        </div>

        {/* Desktop Table */}
        <div className="usr-table-wrap">
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:860 }}>
            <thead>
              <tr style={{ background:G.bg, borderBottom:`1px solid ${G.greenBorder}` }}>
                {HEADERS.map(h => (
                  <th key={h} style={{ padding:"9px 11px", fontSize:9, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(user => (
                <tr key={user.id}
                  style={{ borderBottom:`1px solid ${G.border}`, background:hovRow===user.id?G.greenBg:G.white, cursor:"pointer", transition:"background 0.1s" }}
                  onMouseEnter={()=>setHovRow(user.id)} onMouseLeave={()=>setHovRow(null)}
                  onClick={()=>navigate(`/admin/users/${user.id}`)}>
                  {/* Checkbox */}
                  <td style={{ padding:"10px 11px" }} onClick={e=>e.stopPropagation()}>
                    <input type="checkbox" checked={selected.includes(user.id)} onChange={()=>toggleSelect(user.id)} />
                  </td>
                  {/* User */}
                  <td style={{ padding:"10px 11px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                      <InlineAvatar name={user.name} />
                      <div>
                        <div style={{ display:"flex", alignItems:"center", gap:5 }}>
                          <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{user.name}</span>
                          {user.aiFlag && <span style={{ fontSize:8, fontWeight:700, background:G.redBg, color:G.red, border:`1px solid ${G.redBorder}`, padding:"1px 4px", borderRadius:99 }}>AI⚑</span>}
                        </div>
                        <span style={{ fontSize:10, color:G.muted, display:"block" }}>{user.email}</span>
                        <span style={{ fontSize:9, color:G.border, display:"block" }}>{user.id}</span>
                      </div>
                    </div>
                  </td>
                  {/* Role */}
                  <td style={{ padding:"10px 11px" }}>
                    <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, color:G.sub, fontWeight:600 }}>
                      <span style={{ fontSize:13 }}>{roleIcon[user.role]}</span>{user.role}
                    </span>
                  </td>
                  {/* Status */}
                  <td style={{ padding:"10px 11px" }}><InlineStatusBadge status={user.status} /></td>
                  {/* Trust */}
                  <td style={{ padding:"10px 11px" }}><InlineTrustScore score={user.trustScore} /></td>
                  {/* KYC */}
                  <td style={{ padding:"10px 11px" }}><InlineStatusBadge status={user.verification} /></td>
                  {/* Risk */}
                  <td style={{ padding:"10px 11px" }}><InlineRiskFlag level={user.riskLevel} /></td>
                  {/* Last active */}
                  <td style={{ padding:"10px 11px", fontSize:11, color:G.muted, whiteSpace:"nowrap" }}>{user.lastActive}</td>
                  {/* Joined */}
                  <td style={{ padding:"10px 11px", fontSize:11, color:G.muted, whiteSpace:"nowrap" }}>{user.joinDate}</td>
                  {/* Actions */}
                  <td style={{ padding:"10px 11px" }} onClick={e=>e.stopPropagation()}>
                    <div style={{ display:"flex", alignItems:"center", gap:5, opacity:hovRow===user.id?1:0, transition:"opacity 0.15s" }}>
                      <button onClick={e=>{e.stopPropagation();navigate(`/admin/users/${user.id}`);}}
                        style={{ fontSize:10, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"5px 11px", cursor:"pointer" }}>View</button>
                      <button onClick={e=>e.stopPropagation()}
                        style={{ fontSize:12, fontWeight:700, fontFamily:FONT, background:G.bg, color:G.sub, border:`1px solid ${G.border}`, borderRadius:100, padding:"4px 9px", cursor:"pointer" }}>⋯</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="usr-cards-wrap" style={{ padding:12 }}>
          {filtered.map(user => <MobileCard key={user.id} user={user} />)}
        </div>

        {/* Empty */}
        {filtered.length===0 && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 20px", textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:10 }}>◎</div>
            <p style={{ fontSize:13, fontWeight:700, color:G.text }}>No users match your filters</p>
            <p style={{ fontSize:11, color:G.muted, marginTop:3 }}>Try adjusting the search or filter criteria</p>
          </div>
        )}

        {/* Footer */}
        <div style={{ padding:"10px 14px", borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", background:G.greenBg, flexWrap:"wrap", gap:8 }}>
          <span style={{ fontSize:10, color:G.muted, fontWeight:600 }}>Showing {filtered.length} of {mockUsers.length} users</span>
          <div style={{ display:"flex", gap:6 }}>
            {["← Prev","Next →"].map(label => (
              <button key={label} style={{ fontSize:11, fontWeight:600, fontFamily:FONT, padding:"6px 12px", border:`1px solid ${G.greenBorder}`, borderRadius:100, background:G.white, color:G.greenDeep, cursor:"pointer" }}>{label}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}