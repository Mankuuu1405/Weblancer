// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { mockAgencies } from "./mockData";

// /* ── Theme tokens ── */
// const G = {
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",

//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

//   text:        "#1C1C1C",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
//   border:      "#e5e7eb",
//   bg:          "#f9fafb",
//   white:       "#ffffff",

//   amber:       "#f59e0b",
//   amberBg:     "#fffbeb",
//   amberBorder: "#fde68a",
//   red:         "#ef4444",
//   redBg:       "#fef2f2",
//   redBorder:   "#fecaca",
//   blue:        "#2563eb",
//   blueBg:      "#eff6ff",
//   blueBorder:  "#bfdbfe",
// };

// const FONT = "'Poppins', sans-serif";

// /* ── Shared sub-components ── */

// function Avatar({ name, size = "sm" }) {
//   const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
//   const idx = name.charCodeAt(0) % colors.length;
//   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//   const dim = size === "lg" ? 48 : 32;
//   return (
//     <div style={{
//       width: dim, height: dim, borderRadius: "50%",
//       background: colors[idx] + "22", border: `1.5px solid ${colors[idx]}44`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size === "lg" ? 16 : 11, fontWeight: 700, color: colors[idx], flexShrink: 0,
//     }}>{initials}</div>
//   );
// }

// const STAT_COLOR = {
//   gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
//   green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
//   orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
//   red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
//   blue:   { bg: G.blueBg,   border: G.blueBorder,   val: G.blue,      label: G.blue     },
// };

// function StatCard({ label, value, sub, color = "gray" }) {
//   const c = STAT_COLOR[color];
//   return (
//     <div style={{
//       background: c.bg, border: `1px solid ${c.border}`,
//       borderRadius: 14, padding: "16px 20px", flex: 1,
//       boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
//     }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
//       <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
//       {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
//     </div>
//   );
// }

// function MiniStatCard({ label, value, color = "gray" }) {
//   const c = STAT_COLOR[color];
//   return (
//     <div style={{
//       background: c.bg, border: `1px solid ${c.border}`,
//       borderRadius: 12, padding: "12px 16px", textAlign: "center",
//       boxShadow: "0 2px 8px rgba(110,192,48,0.04)",
//     }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
//       <p style={{ fontSize: 20, fontWeight: 800, color: c.val, margin: 0 }}>{value}</p>
//     </div>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     Verified:   { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
//     Pending:    { bg: G.amberBg,  text: "#92400e",   dot: G.amber  },
//     Rejected:   { bg: G.redBg,    text: "#dc2626",   dot: G.red    },
//     Active:     { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
//     Suspended:  { bg: G.amberBg,  text: "#92400e",   dot: G.amber  },
//     Banned:     { bg: G.redBg,    text: "#dc2626",   dot: G.red    },
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

// function TrustScore({ score }) {
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

// function CapabilityBar({ score }) {
//   const color = score >= 75 ? G.green : score >= 50 ? G.amber : G.red;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//       <div style={{ width: 52, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//         <div style={{ width: `${score}%`, height: "100%", background: color, borderRadius: 99 }} />
//       </div>
//       <span style={{ fontSize: 11, fontWeight: 700, color: G.sub }}>{score}</span>
//     </div>
//   );
// }

// const RISK_COLOR = {
//   Low:    { text: G.greenDeep, bg: G.greenBg  },
//   Medium: { text: "#b45309",   bg: G.amberBg  },
//   High:   { text: "#dc2626",   bg: G.redBg    },
// };

// function RiskText({ level }) {
//   const s = RISK_COLOR[level] || RISK_COLOR.Low;
//   return <span style={{ fontSize: 12, fontWeight: 700, color: s.text }}>{level}</span>;
// }

// function OverloadBadge() {
//   return (
//     <span style={{
//       fontSize: 10, fontWeight: 700,
//       background: G.amberBg, color: "#92400e",
//       border: `1px solid ${G.amberBorder}`,
//       padding: "2px 9px", borderRadius: 99,
//     }}>⚠ Overloaded</span>
//   );
// }

// function SectionCard({ title, children }) {
//   return (
//     <div style={{
//       background: G.white,
//       border: `1px solid ${G.greenBorder}`,
//       borderRadius: 16, overflow: "hidden",
//       boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//     }}>
//       <div style={{
//         padding: "12px 20px",
//         borderBottom: `1px solid ${G.greenBorder}`,
//         background: G.greenBg,
//       }}>
//         <p style={{ fontSize: 12, fontWeight: 800, color: G.greenDeep, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
//       </div>
//       <div style={{ padding: "20px" }}>{children}</div>
//     </div>
//   );
// }

// function InfoRow({ label, value }) {
//   return (
//     <div style={{
//       display: "flex", justifyContent: "space-between", alignItems: "center",
//       padding: "9px 0", borderBottom: `1px solid ${G.border}`,
//     }}>
//       <span style={{ fontSize: 12, color: G.muted, fontWeight: 600 }}>{label}</span>
//       <span style={{ fontSize: 12, color: G.text, fontWeight: 700 }}>{value}</span>
//     </div>
//   );
// }

// function Chip({ label, color = "green" }) {
//   const map = {
//     green: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
//     blue:  { bg: G.blueBg,   border: G.blueBorder,  text: G.blue      },
//     gray:  { bg: G.bg,       border: G.border,       text: G.sub       },
//   };
//   const s = map[color] || map.green;
//   return (
//     <span style={{
//       fontSize: 11, fontWeight: 600,
//       background: s.bg, color: s.text,
//       border: `1px solid ${s.border}`,
//       padding: "3px 10px", borderRadius: 99,
//     }}>{label}</span>
//   );
// }

// const btnNavy = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100, padding: "8px 16px",
//   cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   whiteSpace: "nowrap",
// };
// const btnWarning = {
//   ...btnNavy,
//   background: G.amberBg, color: "#92400e",
//   border: `1px solid ${G.amberBorder}`,
//   boxShadow: "none",
// };
// const btnDanger = {
//   ...btnNavy,
//   background: G.redBg, color: "#dc2626",
//   border: `1px solid ${G.redBorder}`,
//   boxShadow: "none",
// };
// const btnGhost = {
//   ...btnNavy,
//   background: G.bg, color: G.sub,
//   border: `1px solid ${G.border}`,
//   boxShadow: "none",
// };

// const HEADERS_LIST = ["Agency","KYC","Team Size","Capability","Risk","Active","Limit","Trust","Overload","Earned","Actions"];

// /* ══════════════════════════════════════════════════
//    LIST PAGE
// ══════════════════════════════════════════════════ */
// export function AdminAgencies() {
//   const navigate = useNavigate();
//   const [search,     setSearch]     = useState("");
//   const [verFilter,  setVerFilter]  = useState("");
//   const [riskFilter, setRiskFilter] = useState("");
//   const [hovRow,     setHovRow]     = useState(null);

//   const filtered = mockAgencies.filter((a) => {
//     const q = search.toLowerCase();
//     const matchSearch = a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
//     const matchVer    = !verFilter  || a.verificationStatus === verFilter;
//     const matchRisk   = !riskFilter || a.deliveryRisk       === riskFilter;
//     return matchSearch && matchVer && matchRisk;
//   });

//   const stats = {
//     total:   mockAgencies.length,
//     verified: mockAgencies.filter(a => a.verificationStatus === "Verified").length,
//     overload: mockAgencies.filter(a => a.overloadFlag).length,
//     pending:  mockAgencies.filter(a => a.verificationStatus === "Pending").length,
//   };

//   const selectStyle = (active) => ({
//     fontSize: 12, fontWeight: 600, fontFamily: FONT,
//     border: `1.5px solid ${active ? G.green : G.greenBorder}`,
//     borderRadius: 100, padding: "8px 14px",
//     background: active ? G.greenBg : G.white,
//     color: active ? G.greenDeep : G.sub,
//     cursor: "pointer", outline: "none",
//   });

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//         input[type=text], select { outline: none; font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Agencies</h1>
//           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Monitor company-level entities, capacity & delivery risk</p>
//         </div>
//         <button style={btnNavy}>⬇ Export</button>
//       </div>

//       {/* Stats */}
//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total Agencies"        value={stats.total}    color="gray"   />
//         <StatCard label="Verified"              value={stats.verified} color="green"  />
//         <StatCard label="Overloaded"            value={stats.overload} color="orange" sub="AI detected" />
//         <StatCard label="Pending Verification"  value={stats.pending}  color="red"    />
//       </div>

//       {/* Table card */}
//       <div style={{
//         background: G.white, border: `1px solid ${G.greenBorder}`,
//         borderRadius: 16, overflow: "hidden",
//         boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//       }}>

//         {/* Filter bar */}
//         <div style={{
//           padding: "14px 20px", borderBottom: `1px solid ${G.greenBorder}`,
//           display: "flex", flexWrap: "wrap", gap: 10,
//           alignItems: "center", justifyContent: "space-between",
//           background: G.greenBg,
//         }}>
//           <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
//             <div style={{ position: "relative", flex: "1 1 200px", maxWidth: 280 }}>
//               <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
//               <input
//                 value={search} onChange={e => setSearch(e.target.value)}
//                 placeholder="Search agency name, email…"
//                 style={{
//                   width: "100%", fontSize: 12, fontWeight: 500,
//                   border: `1.5px solid ${G.greenBorder}`, borderRadius: 100,
//                   padding: "8px 12px 8px 32px", background: G.white,
//                   color: G.text, boxSizing: "border-box",
//                 }}
//               />
//             </div>
//             {[
//               { value: verFilter,  setter: setVerFilter,  label: "All Status", opts: ["Verified","Pending","Rejected"] },
//               { value: riskFilter, setter: setRiskFilter, label: "All Risk",   opts: ["Low","Medium","High"]           },
//             ].map(({ value, setter, label, opts }) => (
//               <select key={label} value={value} onChange={e => setter(e.target.value)} style={selectStyle(!!value)}>
//                 <option value="">{label}</option>
//                 {opts.map(o => <option key={o} value={o}>{o}</option>)}
//               </select>
//             ))}
//           </div>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX: "auto" }}>
//           <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
//             <thead>
//               <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
//                 {HEADERS_LIST.map(h => (
//                   <th key={h} style={{
//                     padding: "10px 14px", fontSize: 10, fontWeight: 700,
//                     color: G.muted, textTransform: "uppercase",
//                     letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap",
//                   }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map(a => (
//                 <tr
//                   key={a.id}
//                   style={{
//                     borderBottom: `1px solid ${G.border}`,
//                     background: hovRow === a.id ? G.greenBg : G.white,
//                     cursor: "pointer", transition: "background 0.1s",
//                   }}
//                   onMouseEnter={() => setHovRow(a.id)}
//                   onMouseLeave={() => setHovRow(null)}
//                   onClick={() => navigate(`/admin/agencies/${a.id}`)}
//                 >
//                   {/* Agency */}
//                   <td style={{ padding: "12px 14px" }}>
//                     <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                       <Avatar name={a.name} />
//                       <div>
//                         <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{a.name}</p>
//                         <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{a.email}</p>
//                         <p style={{ fontSize: 10, color: G.border, margin: 0 }}>{a.id}</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td style={{ padding: "12px 14px" }}><StatusBadge status={a.verificationStatus} /></td>
//                   <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{a.teamSize}</td>
//                   <td style={{ padding: "12px 14px" }}><CapabilityBar score={a.capabilityScore} /></td>
//                   <td style={{ padding: "12px 14px" }}><RiskText level={a.deliveryRisk} /></td>
//                   <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{a.activeProjects}</td>
//                   <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 12, color: G.muted }}>{a.activeProjects}/{a.projectLimit}</td>
//                   <td style={{ padding: "12px 14px" }}><TrustScore score={a.trustScore} /></td>
//                   <td style={{ padding: "12px 14px" }}>
//                     {a.overloadFlag
//                       ? <OverloadBadge />
//                       : <span style={{ fontSize: 13, color: G.border }}>—</span>}
//                   </td>
//                   <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: G.greenDeep }}>
//                     ₹{(a.totalEarned / 100000).toFixed(1)}L
//                   </td>
//                   <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
//                     <div style={{ opacity: hovRow === a.id ? 1 : 0, transition: "opacity 0.15s" }}>
//                       <button
//                         onClick={e => { e.stopPropagation(); navigate(`/admin/agencies/${a.id}`); }}
//                         style={{
//                           fontSize: 11, fontWeight: 700, fontFamily: FONT,
//                           background: G.gradNavy, color: G.white,
//                           border: "none", borderRadius: 100, padding: "6px 12px",
//                           cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
//                         }}>View</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filtered.length === 0 && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
//             <div style={{
//               width: 52, height: 52, borderRadius: "50%",
//               background: G.greenBg, border: `1px solid ${G.greenBorder}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 22, marginBottom: 12,
//             }}>◎</div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No agencies match your filters</p>
//             <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
//           </div>
//         )}

//         <div style={{
//           padding: "12px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg,
//         }}>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
//             Showing {filtered.length} of {mockAgencies.length} agencies
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════════════════════════════════════
//    DETAIL PAGE
// ══════════════════════════════════════════════════ */
// export function AdminAgencyDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [activeTab, setActiveTab] = useState("overview");

//   const a = mockAgencies.find(x => x.id === id);

//   if (!a) return (
//     <div style={{ padding: 48, textAlign: "center", fontFamily: FONT }}>
//       <p style={{ color: G.muted, marginBottom: 16 }}>Agency not found</p>
//       <button style={btnNavy} onClick={() => navigate("/admin/agencies")}>← Back</button>
//     </div>
//   );

//   const tabs = ["overview","team","projects","financials","admin"];
//   const capPct = (a.activeProjects / a.projectLimit) * 100;

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* Back link */}
//       <button
//         onClick={() => navigate("/admin/agencies")}
//         style={{
//           background: "none", border: "none", cursor: "pointer",
//           fontSize: 13, color: G.muted, fontWeight: 600, fontFamily: FONT,
//           display: "flex", alignItems: "center", gap: 6, marginBottom: 20,
//           padding: 0,
//         }}
//       >← All Agencies</button>

//       {/* Detail header */}
//       <div style={{
//         background: G.white, border: `1px solid ${G.greenBorder}`,
//         borderRadius: 16, padding: "24px",
//         boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//         marginBottom: 20,
//       }}>
//         <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 16 }}>
//           <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
//             <Avatar name={a.name} size="lg" />
//             <div>
//               <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
//                 <h1 style={{ fontSize: 20, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>{a.name}</h1>
//                 <StatusBadge status={a.verificationStatus} />
//                 {a.overloadFlag && <OverloadBadge />}
//               </div>
//               <p style={{ fontSize: 12, color: G.muted, margin: "0 0 10px" }}>{a.email} · {a.id} · {a.legalName}</p>
//               <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
//                 <TrustScore score={a.trustScore} />
//                 <span style={{ fontSize: 12, color: G.muted }}>Risk: <RiskText level={a.deliveryRisk} /></span>
//                 <span style={{ fontSize: 12, color: G.muted }}>Team: <strong style={{ color: G.text }}>{a.teamSize} members</strong></span>
//               </div>
//             </div>
//           </div>
//           <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//             <button style={btnWarning}>Limit Projects</button>
//             <button style={btnDanger}>Suspend Agency</button>
//             <button style={btnGhost}>⋯ More</button>
//           </div>
//         </div>
//       </div>

//       {/* Quick stats */}
//       <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
//         {[
//           { label: "Capability Score",  value: `${a.capabilityScore}/100`,                            color: "green"  },
//           { label: "Active Projects",   value: `${a.activeProjects}/${a.projectLimit}`,               color: "blue"   },
//           { label: "Team Members",      value: a.teamSize,                                             color: "gray"   },
//           { label: "Total Earned",      value: `₹${(a.totalEarned / 100000).toFixed(1)}L`,            color: "green"  },
//           { label: "Pending Payouts",   value: `₹${(a.pendingPayouts / 1000).toFixed(0)}k`,           color: "orange" },
//         ].map(s => <MiniStatCard key={s.label} {...s} />)}
//       </div>

//       {/* Tabs */}
//       <div style={{
//         display: "flex", gap: 2,
//         borderBottom: `2px solid ${G.greenBorder}`,
//         marginBottom: 24,
//       }}>
//         {tabs.map(tab => (
//           <button key={tab} onClick={() => setActiveTab(tab)} style={{
//             fontSize: 13, fontWeight: 700, fontFamily: FONT,
//             padding: "10px 18px", cursor: "pointer",
//             background: "none", border: "none",
//             borderBottom: activeTab === tab ? `2px solid ${G.green}` : "2px solid transparent",
//             color: activeTab === tab ? G.greenDeep : G.muted,
//             marginBottom: -2,
//             textTransform: "capitalize",
//             transition: "color 0.15s",
//           }}>{tab}</button>
//         ))}
//       </div>

//       {/* ── Overview ── */}
//       {activeTab === "overview" && (
//         <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20 }}>
//           <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
//             <SectionCard title="Agency Identity">
//               <InfoRow label="Brand Name"   value={a.name}       />
//               <InfoRow label="Legal Name"   value={a.legalName}  />
//               <InfoRow label="Country"      value={a.country}    />
//               <InfoRow label="Website"      value={a.website}    />
//               <InfoRow label="Agency Admin" value={a.adminName}  />
//               <InfoRow label="Admin Email"  value={a.adminEmail} />
//               <InfoRow label="KYC Status"   value={<StatusBadge status={a.kycStatus} />} />
//             </SectionCard>

//             <SectionCard title="Services & Industries">
//               <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Primary Services</p>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
//                 {a.services.map(s => <Chip key={s} label={s} color="green" />)}
//               </div>
//               <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Industries</p>
//               <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
//                 {a.industries.map(i => <Chip key={i} label={i} color="blue" />)}
//               </div>
//             </SectionCard>
//           </div>

//           <SectionCard title="Capacity Overview">
//             <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, marginBottom: 4 }}>Project Slots</p>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: G.sub, marginBottom: 6 }}>
//               <span>Used</span>
//               <span style={{ fontWeight: 700 }}>{a.activeProjects}/{a.projectLimit}</span>
//             </div>
//             <div style={{ height: 8, background: G.border, borderRadius: 99, overflow: "hidden", marginBottom: 16 }}>
//               <div style={{
//                 width: `${capPct}%`, height: "100%", borderRadius: 99,
//                 background: capPct > 80 ? G.amber : G.green,
//               }} />
//             </div>
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//                 <span style={{ color: G.muted }}>Delivery Risk</span>
//                 <RiskText level={a.deliveryRisk} />
//               </div>
//               <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//                 <span style={{ color: G.muted }}>Overload Alert</span>
//                 <span style={{ fontWeight: 700, color: a.overloadFlag ? "#b45309" : G.greenDeep }}>
//                   {a.overloadFlag ? "Yes" : "No"}
//                 </span>
//               </div>
//             </div>
//           </SectionCard>
//         </div>
//       )}

//       {/* ── Team ── */}
//       {activeTab === "team" && (
//         <SectionCard title="Team Members">
//           {a.teamMembers.length > 0 ? (
//             <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
//               {a.teamMembers.map((m, i) => (
//                 <div key={i} style={{
//                   display: "flex", alignItems: "center", gap: 12,
//                   padding: 14, background: G.bg,
//                   borderRadius: 12, border: `1px solid ${G.border}`,
//                 }}>
//                   <Avatar name={m.name} />
//                   <div style={{ flex: 1 }}>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 6px" }}>{m.name}</p>
//                     <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
//                       {m.skills.map(s => <Chip key={s} label={s} color="gray" />)}
//                     </div>
//                   </div>
//                   <div style={{ textAlign: "right", flexShrink: 0 }}>
//                     <span style={{ fontSize: 12, fontWeight: 700, color: G.sub, display: "block" }}>{m.role}</span>
//                     <span style={{ fontSize: 11, color: G.muted }}>{m.availability}% available</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           ) : (
//             <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>No team members added yet</p>
//           )}
//         </SectionCard>
//       )}

//       {/* ── Projects ── */}
//       {activeTab === "projects" && (
//         <SectionCard title="Project History">
//           <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>Project history will be displayed here</p>
//         </SectionCard>
//       )}

//       {/* ── Financials ── */}
//       {activeTab === "financials" && (
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16 }}>
//           {[
//             { label: "Total Earned",         value: `₹${a.totalEarned.toLocaleString()}`,                       color: "green"  },
//             { label: "Pending Payouts",       value: `₹${a.pendingPayouts.toLocaleString()}`,                    color: "orange" },
//             { label: "Platform Commission",   value: `₹${Math.round(a.totalEarned * 0.06).toLocaleString()}`,   color: "gray"   },
//           ].map(s => <StatCard key={s.label} {...s} />)}
//         </div>
//       )}

//       {/* ── Admin ── */}
//       {activeTab === "admin" && (
//         <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
//           <SectionCard title="Admin Control Panel">
//             <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
//               {[
//                 { label: "Adjust Project Limit",         style: btnGhost   },
//                 { label: "Force Re-verification",        style: btnGhost   },
//                 { label: "Send Governance Message",      style: btnGhost   },
//                 { label: "Restrict Service Categories",  style: btnWarning },
//                 { label: "Suspend Agency",               style: btnDanger  },
//               ].map(action => (
//                 <button key={action.label} style={{ ...action.style, justifyContent: "flex-start", width: "100%", borderRadius: 10 }}>
//                   {action.label}
//                 </button>
//               ))}
//             </div>
//           </SectionCard>
//           <SectionCard title="Audit Log">
//             <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>No admin actions recorded yet</p>
//           </SectionCard>
//         </div>
//       )}
//     </div>
//   );
// }







import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockAgencies } from "./mockData";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
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

const RESPONSIVE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Poppins', sans-serif; }
  input[type=text], select { outline: none; font-family: 'Poppins', sans-serif; }

  /* ── Stats row ── */
  .ag-stats-row {
    display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap;
  }
  .ag-stats-row > * { flex: 1 1 140px; min-width: 0; }

  /* ── Quick stats grid (detail page) ── */
  .ag-quick-stats {
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    gap: 12px; margin-bottom: 20px;
  }

  /* ── Overview 2-col ── */
  .ag-overview-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 20px;
  }

  /* ── Financials 3-col ── */
  .ag-financials-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 16px;
  }

  /* ── Admin panel 2-col ── */
  .ag-admin-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
  }

  /* ── Detail header ── */
  .ag-detail-header-inner {
    display: flex; align-items: flex-start;
    justify-content: space-between; flex-wrap: wrap; gap: 16px;
  }
  .ag-detail-header-actions {
    display: flex; gap: 8px; flex-wrap: wrap;
  }

  /* ── Tabs strip ── */
  .ag-tabs {
    display: flex; gap: 2px;
    border-bottom: 2px solid ${G.greenBorder};
    margin-bottom: 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .ag-tabs::-webkit-scrollbar { display: none; }

  /* ─────────────────────────────────
     TABLET  ≤1024px
  ───────────────────────────────── */
  @media (max-width: 1024px) {
    .ag-quick-stats { grid-template-columns: repeat(3, 1fr); }
  }

  /* ─────────────────────────────────
     MOBILE  ≤768px
  ───────────────────────────────── */
  @media (max-width: 768px) {
    .ag-overview-grid  { grid-template-columns: 1fr; }
    .ag-admin-grid     { grid-template-columns: 1fr; }
    .ag-financials-grid { grid-template-columns: 1fr 1fr; }
    .ag-quick-stats    { grid-template-columns: repeat(2, 1fr); }
  }

  /* ─────────────────────────────────
     SMALL PHONE  ≤480px
  ───────────────────────────────── */
  @media (max-width: 480px) {
    .ag-padding { padding: 16px 14px 48px !important; }
    .ag-stats-row > * { flex: 1 1 100%; }
    .ag-financials-grid { grid-template-columns: 1fr; }
    .ag-quick-stats     { grid-template-columns: repeat(2, 1fr); }
    /* Hide non-essential table columns */
    .ag-col-hide { display: none; }
  }
`;

/* ── Shared sub-components ── */
function Avatar({ name, size = "sm" }) {
  const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
  const idx      = name.charCodeAt(0) % colors.length;
  const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
  const dim      = size === "lg" ? 48 : 32;
  return (
    <div style={{ width: dim, height: dim, borderRadius: "50%", background: colors[idx]+"22", border: `1.5px solid ${colors[idx]}44`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: size === "lg" ? 16 : 11, fontWeight: 700, color: colors[idx], flexShrink: 0 }}>
      {initials}
    </div>
  );
}

const STAT_COLOR = {
  gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted     },
  green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
  orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"   },
  red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"   },
  blue:   { bg: G.blueBg,   border: G.blueBorder,   val: G.blue,      label: G.blue      },
};

function StatCard({ label, value, sub, color = "gray" }) {
  const c = STAT_COLOR[color];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "16px 20px", flex: 1, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 26, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

function MiniStatCard({ label, value, color = "gray" }) {
  const c = STAT_COLOR[color];
  return (
    <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 12, padding: "12px 16px", textAlign: "center", boxShadow: "0 2px 8px rgba(110,192,48,0.04)" }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 20, fontWeight: 800, color: c.val, margin: 0 }}>{value}</p>
    </div>
  );
}

function StatusBadge({ status }) {
  const map = {
    Verified:  { bg: G.greenBg, text: G.greenDeep, dot: G.green },
    Pending:   { bg: G.amberBg, text: "#92400e",   dot: G.amber },
    Rejected:  { bg: G.redBg,   text: "#dc2626",   dot: G.red   },
    Active:    { bg: G.greenBg, text: G.greenDeep, dot: G.green },
    Suspended: { bg: G.amberBg, text: "#92400e",   dot: G.amber },
    Banned:    { bg: G.redBg,   text: "#dc2626",   dot: G.red   },
  };
  const s = map[status] || { bg: G.bg, text: G.muted, dot: G.muted };
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, padding: "3px 10px", borderRadius: 99 }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {status}
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

function CapabilityBar({ score }) {
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

const RISK_COLOR = {
  Low:    { text: G.greenDeep, bg: G.greenBg },
  Medium: { text: "#b45309",   bg: G.amberBg },
  High:   { text: "#dc2626",   bg: G.redBg   },
};

function RiskText({ level }) {
  const s = RISK_COLOR[level] || RISK_COLOR.Low;
  return <span style={{ fontSize: 12, fontWeight: 700, color: s.text }}>{level}</span>;
}

function OverloadBadge() {
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: G.amberBg, color: "#92400e", border: `1px solid ${G.amberBorder}`, padding: "2px 9px", borderRadius: 99 }}>⚠ Overloaded</span>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
      <div style={{ padding: "12px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
        <p style={{ fontSize: 12, fontWeight: 800, color: G.greenDeep, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
      </div>
      <div style={{ padding: "20px" }}>{children}</div>
    </div>
  );
}

function InfoRow({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "9px 0", borderBottom: `1px solid ${G.border}` }}>
      <span style={{ fontSize: 12, color: G.muted, fontWeight: 600 }}>{label}</span>
      <span style={{ fontSize: 12, color: G.text, fontWeight: 700 }}>{value}</span>
    </div>
  );
}

function Chip({ label, color = "green" }) {
  const map = {
    green: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
    blue:  { bg: G.blueBg,   border: G.blueBorder,  text: G.blue      },
    gray:  { bg: G.bg,       border: G.border,       text: G.sub       },
  };
  const s = map[color] || map.green;
  return <span style={{ fontSize: 11, fontWeight: 600, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "3px 10px", borderRadius: 99 }}>{label}</span>;
}

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100, padding: "8px 16px",
  cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};
const btnWarning = { ...btnNavy, background: G.amberBg, color: "#92400e", border: `1px solid ${G.amberBorder}`, boxShadow: "none" };
const btnDanger  = { ...btnNavy, background: G.redBg,   color: "#dc2626", border: `1px solid ${G.redBorder}`,   boxShadow: "none" };
const btnGhost   = { ...btnNavy, background: G.bg,      color: G.sub,     border: `1px solid ${G.border}`,      boxShadow: "none" };

const HEADERS_LIST = ["Agency","KYC","Team Size","Capability","Risk","Active","Limit","Trust","Overload","Earned","Actions"];

/* ══ LIST PAGE ══════════════════════════════════════════════════════════════ */
export function AdminAgencies() {
  const navigate = useNavigate();
  const [search,     setSearch]     = useState("");
  const [verFilter,  setVerFilter]  = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [hovRow,     setHovRow]     = useState(null);

  const filtered = mockAgencies.filter(a => {
    const q = search.toLowerCase();
    return (
      (a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q)) &&
      (!verFilter  || a.verificationStatus === verFilter) &&
      (!riskFilter || a.deliveryRisk       === riskFilter)
    );
  });

  const stats = {
    total:    mockAgencies.length,
    verified: mockAgencies.filter(a => a.verificationStatus === "Verified").length,
    overload: mockAgencies.filter(a => a.overloadFlag).length,
    pending:  mockAgencies.filter(a => a.verificationStatus === "Pending").length,
  };

  const selectStyle = (active) => ({
    fontSize: 12, fontWeight: 600, fontFamily: FONT,
    border: `1.5px solid ${active ? G.green : G.greenBorder}`,
    borderRadius: 100, padding: "8px 14px",
    background: active ? G.greenBg : G.white,
    color: active ? G.greenDeep : G.sub,
    cursor: "pointer", outline: "none",
  });

  return (
    <div className="ag-padding" style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{RESPONSIVE_CSS}</style>

      {/* Header */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24, flexWrap: "wrap", gap: 12 }}>
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>Agencies</h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>Monitor company-level entities, capacity & delivery risk</p>
        </div>
        <button style={btnNavy}>⬇ Export</button>
      </div>

      {/* Stats */}
      <div className="ag-stats-row">
        <StatCard label="Total Agencies"       value={stats.total}    color="gray"   />
        <StatCard label="Verified"             value={stats.verified} color="green"  />
        <StatCard label="Overloaded"           value={stats.overload} color="orange" sub="AI detected" />
        <StatCard label="Pending Verification" value={stats.pending}  color="red"    />
      </div>

      {/* Table card */}
      <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>

        {/* Filter bar */}
        <div style={{ padding: "14px 20px", borderBottom: `1px solid ${G.greenBorder}`, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center", justifyContent: "space-between", background: G.greenBg }}>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center", flex: 1 }}>
            <div style={{ position: "relative", flex: "1 1 180px", maxWidth: 280 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
              <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search agency name, email…"
                style={{ width: "100%", fontSize: 12, fontWeight: 500, border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "8px 12px 8px 32px", background: G.white, color: G.text, boxSizing: "border-box" }}
              />
            </div>
            {[
              { value: verFilter,  setter: setVerFilter,  label: "All Status", opts: ["Verified","Pending","Rejected"] },
              { value: riskFilter, setter: setRiskFilter, label: "All Risk",   opts: ["Low","Medium","High"]           },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={e => setter(e.target.value)} style={selectStyle(!!value)}>
                <option value="">{label}</option>
                {opts.map(o => <option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 800 }}>
            <thead>
              <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
                {HEADERS_LIST.map((h, i) => (
                  <th key={h} className={i > 4 && i < 10 ? "ag-col-hide" : ""} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(a => (
                <tr key={a.id}
                  style={{ borderBottom: `1px solid ${G.border}`, background: hovRow === a.id ? G.greenBg : G.white, cursor: "pointer", transition: "background 0.1s" }}
                  onMouseEnter={() => setHovRow(a.id)}
                  onMouseLeave={() => setHovRow(null)}
                  onClick={() => navigate(`/admin/agencies/${a.id}`)}
                >
                  {/* Agency */}
                  <td style={{ padding: "12px 14px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <Avatar name={a.name} />
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{a.name}</p>
                        <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{a.email}</p>
                        <p style={{ fontSize: 10, color: G.border, margin: 0 }}>{a.id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "12px 14px" }}><StatusBadge status={a.verificationStatus} /></td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{a.teamSize}</td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px" }}><CapabilityBar score={a.capabilityScore} /></td>
                  <td style={{ padding: "12px 14px" }}><RiskText level={a.deliveryRisk} /></td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{a.activeProjects}</td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px", textAlign: "center", fontSize: 12, color: G.muted }}>{a.activeProjects}/{a.projectLimit}</td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px" }}><TrustScore score={a.trustScore} /></td>
                  <td className="ag-col-hide" style={{ padding: "12px 14px" }}>
                    {a.overloadFlag ? <OverloadBadge /> : <span style={{ fontSize: 13, color: G.border }}>—</span>}
                  </td>
                  <td style={{ padding: "12px 14px", fontSize: 13, fontWeight: 700, color: G.greenDeep }}>₹{(a.totalEarned/100000).toFixed(1)}L</td>
                  <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
                    <div style={{ opacity: hovRow === a.id ? 1 : 0, transition: "opacity 0.15s" }}>
                      <button onClick={e => { e.stopPropagation(); navigate(`/admin/agencies/${a.id}`); }}
                        style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "6px 12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)" }}>
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filtered.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No agencies match your filters</p>
            <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
          </div>
        )}

        <div style={{ padding: "12px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>Showing {filtered.length} of {mockAgencies.length} agencies</span>
        </div>
      </div>
    </div>
  );
}

/* ══ DETAIL PAGE ════════════════════════════════════════════════════════════ */
export function AdminAgencyDetail() {
  const { id }    = useParams();
  const navigate  = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const a = mockAgencies.find(x => x.id === id);

  if (!a) return (
    <div style={{ padding: 48, textAlign: "center", fontFamily: FONT }}>
      <p style={{ color: G.muted, marginBottom: 16 }}>Agency not found</p>
      <button style={btnNavy} onClick={() => navigate("/admin/agencies")}>← Back</button>
    </div>
  );

  const tabs   = ["overview","team","projects","financials","admin"];
  const capPct = (a.activeProjects / a.projectLimit) * 100;

  return (
    <div className="ag-padding" style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <style>{RESPONSIVE_CSS}</style>

      <button onClick={() => navigate("/admin/agencies")}
        style={{ background: "none", border: "none", cursor: "pointer", fontSize: 13, color: G.muted, fontWeight: 600, fontFamily: FONT, display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: 0 }}>
        ← All Agencies
      </button>

      {/* Detail header */}
      <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, padding: "24px", boxShadow: "0 2px 12px rgba(110,192,48,0.06)", marginBottom: 20 }}>
        <div className="ag-detail-header-inner">
          <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1, minWidth: 0 }}>
            <Avatar name={a.name} size="lg" />
            <div style={{ minWidth: 0 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 6 }}>
                <h1 style={{ fontSize: 20, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>{a.name}</h1>
                <StatusBadge status={a.verificationStatus} />
                {a.overloadFlag && <OverloadBadge />}
              </div>
              <p style={{ fontSize: 12, color: G.muted, margin: "0 0 10px" }}>{a.email} · {a.id} · {a.legalName}</p>
              <div style={{ display: "flex", alignItems: "center", gap: 16, flexWrap: "wrap" }}>
                <TrustScore score={a.trustScore} />
                <span style={{ fontSize: 12, color: G.muted }}>Risk: <RiskText level={a.deliveryRisk} /></span>
                <span style={{ fontSize: 12, color: G.muted }}>Team: <strong style={{ color: G.text }}>{a.teamSize} members</strong></span>
              </div>
            </div>
          </div>
          <div className="ag-detail-header-actions">
            <button style={btnWarning}>Limit Projects</button>
            <button style={btnDanger}>Suspend Agency</button>
            <button style={btnGhost}>⋯ More</button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div className="ag-quick-stats">
        {[
          { label: "Capability Score", value: `${a.capabilityScore}/100`,                          color: "green"  },
          { label: "Active Projects",  value: `${a.activeProjects}/${a.projectLimit}`,              color: "blue"   },
          { label: "Team Members",     value: a.teamSize,                                           color: "gray"   },
          { label: "Total Earned",     value: `₹${(a.totalEarned/100000).toFixed(1)}L`,            color: "green"  },
          { label: "Pending Payouts",  value: `₹${(a.pendingPayouts/1000).toFixed(0)}k`,           color: "orange" },
        ].map(s => <MiniStatCard key={s.label} {...s} />)}
      </div>

      {/* Tabs */}
      <div className="ag-tabs">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)} style={{
            fontSize: 13, fontWeight: 700, fontFamily: FONT,
            padding: "10px 18px", cursor: "pointer", background: "none", border: "none",
            borderBottom: activeTab === tab ? `2px solid ${G.green}` : "2px solid transparent",
            color: activeTab === tab ? G.greenDeep : G.muted,
            marginBottom: -2, textTransform: "capitalize", transition: "color 0.15s",
            whiteSpace: "nowrap", flexShrink: 0,
          }}>{tab}</button>
        ))}
      </div>

      {/* ── Overview ── */}
      {activeTab === "overview" && (
        <div className="ag-overview-grid">
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <SectionCard title="Agency Identity">
              <InfoRow label="Brand Name"   value={a.name}       />
              <InfoRow label="Legal Name"   value={a.legalName}  />
              <InfoRow label="Country"      value={a.country}    />
              <InfoRow label="Website"      value={a.website}    />
              <InfoRow label="Agency Admin" value={a.adminName}  />
              <InfoRow label="Admin Email"  value={a.adminEmail} />
              <InfoRow label="KYC Status"   value={<StatusBadge status={a.kycStatus} />} />
            </SectionCard>
            <SectionCard title="Services & Industries">
              <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Primary Services</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
                {a.services.map(s => <Chip key={s} label={s} color="green" />)}
              </div>
              <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Industries</p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
                {a.industries.map(i => <Chip key={i} label={i} color="blue" />)}
              </div>
            </SectionCard>
          </div>

          <SectionCard title="Capacity Overview">
            <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, marginBottom: 4 }}>Project Slots</p>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, color: G.sub, marginBottom: 6 }}>
              <span>Used</span>
              <span style={{ fontWeight: 700 }}>{a.activeProjects}/{a.projectLimit}</span>
            </div>
            <div style={{ height: 8, background: G.border, borderRadius: 99, overflow: "hidden", marginBottom: 16 }}>
              <div style={{ width: `${capPct}%`, height: "100%", borderRadius: 99, background: capPct > 80 ? G.amber : G.green }} />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: G.muted }}>Delivery Risk</span>
                <RiskText level={a.deliveryRisk} />
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
                <span style={{ color: G.muted }}>Overload Alert</span>
                <span style={{ fontWeight: 700, color: a.overloadFlag ? "#b45309" : G.greenDeep }}>
                  {a.overloadFlag ? "Yes" : "No"}
                </span>
              </div>
            </div>
          </SectionCard>
        </div>
      )}

      {/* ── Team ── */}
      {activeTab === "team" && (
        <SectionCard title="Team Members">
          {a.teamMembers.length > 0 ? (
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {a.teamMembers.map((m, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: 14, background: G.bg, borderRadius: 12, border: `1px solid ${G.border}` }}>
                  <Avatar name={m.name} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: "0 0 6px" }}>{m.name}</p>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
                      {m.skills.map(s => <Chip key={s} label={s} color="gray" />)}
                    </div>
                  </div>
                  <div style={{ textAlign: "right", flexShrink: 0 }}>
                    <span style={{ fontSize: 12, fontWeight: 700, color: G.sub, display: "block" }}>{m.role}</span>
                    <span style={{ fontSize: 11, color: G.muted }}>{m.availability}% available</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>No team members added yet</p>
          )}
        </SectionCard>
      )}

      {activeTab === "projects" && (
        <SectionCard title="Project History">
          <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>Project history will be displayed here</p>
        </SectionCard>
      )}

      {activeTab === "financials" && (
        <div className="ag-financials-grid">
          {[
            { label: "Total Earned",       value: `₹${a.totalEarned.toLocaleString()}`,                      color: "green"  },
            { label: "Pending Payouts",    value: `₹${a.pendingPayouts.toLocaleString()}`,                   color: "orange" },
            { label: "Platform Commission",value: `₹${Math.round(a.totalEarned * 0.06).toLocaleString()}`,   color: "gray"   },
          ].map(s => <StatCard key={s.label} {...s} />)}
        </div>
      )}

      {activeTab === "admin" && (
        <div className="ag-admin-grid">
          <SectionCard title="Admin Control Panel">
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { label: "Adjust Project Limit",         style: btnGhost   },
                { label: "Force Re-verification",        style: btnGhost   },
                { label: "Send Governance Message",      style: btnGhost   },
                { label: "Restrict Service Categories",  style: btnWarning },
                { label: "Suspend Agency",               style: btnDanger  },
              ].map(action => (
                <button key={action.label} style={{ ...action.style, justifyContent: "flex-start", width: "100%", borderRadius: 10 }}>
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>
          <SectionCard title="Audit Log">
            <p style={{ fontSize: 13, color: G.muted, textAlign: "center", padding: "32px 0" }}>No admin actions recorded yet</p>
          </SectionCard>
        </div>
      )}
    </div>
  );
}