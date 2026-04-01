// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

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
//   purple:      "#7c3aed",
//   purpleBg:    "#f5f3ff",
//   purpleBorder:"#ddd6fe",
// };

// const FONT = "'Poppins', sans-serif";

// /* ══════════════════ SHARED SUB-COMPONENTS ══════════════════ */

// const STAT_COLOR = {
//   gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
//   green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
//   orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
//   red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
//   blue:   { bg: G.blueBg,   border: G.blueBorder,   val: G.blue,      label: G.blue     },
// };

// function StatCard({ label, value, sub, color = "gray" }) {
//   const c = STAT_COLOR[color] || STAT_COLOR.gray;
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

// function SectionCard({ title, children }) {
//   return (
//     <div style={{
//       background: G.white, border: `1px solid ${G.greenBorder}`,
//       borderRadius: 16, overflow: "hidden",
//       boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
//     }}>
//       <div style={{ padding: "12px 20px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
//         <p style={{ fontSize: 12, fontWeight: 800, color: G.greenDeep, margin: 0, textTransform: "uppercase", letterSpacing: "0.06em" }}>{title}</p>
//       </div>
//       <div style={{ padding: "20px" }}>{children}</div>
//     </div>
//   );
// }

// /* ── Shared nav tabs ── */
// function ReportNav({ active }) {
//   const navigate = useNavigate();
//   const tabs = [
//     { key: "revenue",  label: "Revenue",        path: "/admin/reports/revenue"  },
//     { key: "users",    label: "User Growth",     path: "/admin/reports/users"    },
//     { key: "projects", label: "Project Success", path: "/admin/reports/projects" },
//     { key: "disputes", label: "Dispute Trends",  path: "/admin/reports/disputes" },
//   ];
//   return (
//     <div style={{
//       display: "flex", gap: 2,
//       borderBottom: `2px solid ${G.greenBorder}`,
//       marginBottom: 24,
//     }}>
//       {tabs.map(tab => (
//         <button key={tab.key} onClick={() => navigate(tab.path)} style={{
//           fontSize: 13, fontWeight: 700, fontFamily: FONT,
//           padding: "10px 18px", cursor: "pointer",
//           background: "none", border: "none",
//           borderBottom: active === tab.key ? `2px solid ${G.green}` : "2px solid transparent",
//           color: active === tab.key ? G.greenDeep : G.muted,
//           marginBottom: -2, whiteSpace: "nowrap",
//           transition: "color 0.15s",
//         }}>{tab.label}</button>
//       ))}
//     </div>
//   );
// }

// /* ── Bar chart ── */
// function BarChart({ data, valueKey, labelKey, color = G.green, prefix = "₹", suffix = "", height = 140 }) {
//   const [hov, setHov] = useState(null);
//   const max = Math.max(...data.map(d => d[valueKey])) || 1;
//   return (
//     <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height }}>
//       {data.map((d, i) => {
//         const pct = (d[valueKey] / max) * 100;
//         const label = typeof d[valueKey] === "number" && d[valueKey] >= 1000
//           ? `${prefix}${(d[valueKey]/1000).toFixed(0)}k${suffix}`
//           : `${prefix}${d[valueKey]}${suffix}`;
//         return (
//           <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}
//             onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
//             <div style={{ position: "relative", width: "100%", display: "flex", alignItems: "flex-end", height: height - 24 }}>
//               {/* Tooltip */}
//               {hov === i && (
//                 <div style={{
//                   position: "absolute", top: -28, left: "50%", transform: "translateX(-50%)",
//                   background: G.navyDeep, color: G.white,
//                   fontSize: 10, fontWeight: 700, padding: "3px 8px", borderRadius: 6,
//                   whiteSpace: "nowrap", zIndex: 10,
//                 }}>{label}</div>
//               )}
//               <div style={{
//                 width: "100%", borderRadius: "4px 4px 0 0",
//                 background: hov === i ? color : color + "cc",
//                 height: `${pct}%`,
//                 transition: "background 0.12s",
//               }} />
//             </div>
//             <span style={{ fontSize: 10, color: G.muted, textAlign: "center", width: "100%", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
//               {d[labelKey]}
//             </span>
//           </div>
//         );
//       })}
//     </div>
//   );
// }

// /* ── Line chart ── */
// function LineChart({ data, valueKey, color = G.green, height = 100 }) {
//   const max = Math.max(...data.map(d => d[valueKey]));
//   const min = Math.min(...data.map(d => d[valueKey]));
//   const range = max - min || 1;
//   const W = 600; const H = height;
//   const pts = data.map((d, i) => {
//     const x = (i / (data.length - 1)) * W;
//     const y = H - ((d[valueKey] - min) / range) * (H - 20) - 10;
//     return [x, y];
//   });
//   const ptStr = pts.map(([x, y]) => `${x},${y}`).join(" ");
//   const area  = `0,${H} ${ptStr} ${W},${H}`;
//   return (
//     <svg viewBox={`0 0 ${W} ${H}`} style={{ width: "100%", height }}>
//       <defs>
//         <linearGradient id={`lg_${valueKey}`} x1="0" y1="0" x2="0" y2="1">
//           <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
//           <stop offset="100%" stopColor={color} stopOpacity="0"    />
//         </linearGradient>
//       </defs>
//       <polygon points={area} fill={`url(#lg_${valueKey})`} />
//       <polyline points={ptStr} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
//       {pts.map(([x, y], i) => (
//         <circle key={i} cx={x} cy={y} r="4" fill={color} />
//       ))}
//     </svg>
//   );
// }

// /* ── Progress bar row ── */
// function ProgressRow({ label, value, pct, color = G.green, note }) {
//   return (
//     <div style={{ marginBottom: 14 }}>
//       <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 6 }}>
//         <span style={{ fontWeight: 600, color: G.sub }}>{label}</span>
//         <span style={{ fontWeight: 700, color: G.text }}>{value}</span>
//       </div>
//       <div style={{ height: 8, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//         <div style={{ width: `${pct}%`, height: "100%", background: color, borderRadius: 99 }} />
//       </div>
//       {note && <p style={{ fontSize: 10, color: G.muted, marginTop: 4 }}>{note}</p>}
//     </div>
//   );
// }

// /* ── Info banner ── */
// function InfoBanner({ icon, title, body, color = "orange" }) {
//   const map = {
//     orange: { bg: G.amberBg,  border: G.amberBorder, title: "#92400e",   body: "#92400e"   },
//     blue:   { bg: G.blueBg,   border: G.blueBorder,  title: G.blue,      body: G.navy      },
//     green:  { bg: G.greenBg,  border: G.greenBorder, title: G.greenDeep, body: G.greenDeep },
//   };
//   const s = map[color] || map.orange;
//   return (
//     <div style={{
//       padding: "10px 14px", marginTop: 16,
//       background: s.bg, border: `1px solid ${s.border}`, borderRadius: 10,
//     }}>
//       {title && <p style={{ fontSize: 12, fontWeight: 800, color: s.title, margin: "0 0 3px" }}>{icon} {title}</p>}
//       <p style={{ fontSize: 12, color: s.body, margin: 0, lineHeight: 1.6 }}>{body}</p>
//     </div>
//   );
// }

// /* ── Page wrapper ── */
// function ReportPage({ active, period, setPeriod, title, subtitle, children }) {
//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//         select, button { font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>{title}</h1>
//           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>{subtitle}</p>
//         </div>
//         <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
//           {setPeriod && (
//             <div style={{ display: "flex", border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, overflow: "hidden" }}>
//               {["3m","6m","1y","All"].map(p => (
//                 <button key={p} onClick={() => setPeriod(p)} style={{
//                   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//                   padding: "7px 14px", border: "none", cursor: "pointer",
//                   background: period === p ? G.gradNavy : G.white,
//                   color: period === p ? G.white : G.sub,
//                   transition: "all 0.12s",
//                 }}>{p}</button>
//               ))}
//             </div>
//           )}
//           <button style={{
//             display: "inline-flex", alignItems: "center", gap: 6,
//             fontSize: 12, fontWeight: 700, fontFamily: FONT,
//             background: G.gradNavy, color: G.white,
//             border: "none", borderRadius: 100, padding: "8px 16px",
//             cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//           }}>⬇ Export PDF</button>
//         </div>
//       </div>

//       <ReportNav active={active} />
//       {children}
//     </div>
//   );
// }

// /* ══════════════════ PAGE 1: REVENUE ══════════════════ */
// export function AdminRevenueReport() {
//   const [period, setPeriod] = useState("6m");

//   const monthly = [
//     { month:"Oct", revenue:120000, commission:7200,  projects:3 },
//     { month:"Nov", revenue:180000, commission:10800, projects:4 },
//     { month:"Dec", revenue:150000, commission:9000,  projects:3 },
//     { month:"Jan", revenue:234000, commission:14040, projects:5 },
//     { month:"Feb", revenue:650000, commission:39000, projects:6 },
//     { month:"Mar", revenue:480000, commission:28800, projects:5 },
//   ];

//   const byType = [
//     { type:"Agency Projects",     amount:1520000, pct:79 },
//     { type:"Freelancer Projects", amount:394000,  pct:21 },
//   ];

//   const topProjects = [
//     { project:"HR Automation Dashboard",  client:"ByteEats Co.",       amount:650000, commission:39000, status:"Completed" },
//     { project:"Food Delivery App",         client:"ByteEats Co.",       amount:480000, commission:28800, status:"Active"    },
//     { project:"Logistics Tracking System", client:"Sneha Kapoor",       amount:390000, commission:23400, status:"Completed" },
//     { project:"Patient Appointment App",   client:"HealthFirst Clinic", amount:320000, commission:19200, status:"Active"    },
//     { project:"Mobile Banking App",        client:"Vikram Singh",        amount:280000, commission:16800, status:"Frozen"    },
//   ];

//   const totalRevenue    = monthly.reduce((s, m) => s + m.revenue, 0);
//   const totalCommission = monthly.reduce((s, m) => s + m.commission, 0);
//   const momGrowth = ((monthly[5].revenue - monthly[4].revenue) / monthly[4].revenue * 100).toFixed(0);

//   const STATUS_CHIP = {
//     Completed: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
//     Active:    { bg: G.blueBg,   border: G.blueBorder,  text: G.blue      },
//     Frozen:    { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   },
//   };

//   return (
//     <ReportPage active="revenue" period={period} setPeriod={setPeriod}
//       title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">

//       {/* Stats */}
//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total GMV (6m)"    value={`₹${(totalRevenue/100000).toFixed(1)}L`}      sub="Gross platform volume" color="gray"  />
//         <StatCard label="Commission Earned" value={`₹${(totalCommission/1000).toFixed(0)}k`}     sub="6% of GMV"             color="green" />
//         <StatCard label="This Month"        value={`₹${(monthly[5].revenue/1000).toFixed(0)}k`}  sub="Mar 2026"              color="green" />
//         <StatCard label="MoM Growth"        value={`${Number(momGrowth)>=0?"+":""}${momGrowth}%`} sub="vs last month"        color={Number(momGrowth)>=0?"green":"red"} />
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
//         {/* Revenue chart */}
//         <SectionCard title="Monthly Revenue Trend">
//           <BarChart data={monthly} valueKey="revenue" labelKey="month" color={G.green} />
//           <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${G.border}`, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 12, textAlign: "center" }}>
//             {[
//               { label:"Peak Month",     value:"Feb 2026",                                          sub:"₹6.5L"          },
//               { label:"Avg / Month",    value:`₹${(totalRevenue/monthly.length/1000).toFixed(0)}k`, sub:"6-month avg"   },
//               { label:"Total Projects", value:monthly.reduce((s,m)=>s+m.projects,0),               sub:"Across 6 months" },
//             ].map(s => (
//               <div key={s.label}>
//                 <p style={{ fontSize: 15, fontWeight: 800, color: G.text, margin: 0 }}>{s.value}</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: "3px 0 0" }}>{s.label}</p>
//                 <p style={{ fontSize: 10, color: G.border, margin: "2px 0 0" }}>{s.sub}</p>
//               </div>
//             ))}
//           </div>
//         </SectionCard>

//         {/* Commission chart */}
//         <SectionCard title="Commission Trend">
//           <p style={{ fontSize: 24, fontWeight: 900, color: G.greenDeep, margin: "0 0 4px" }}>₹{totalCommission.toLocaleString()}</p>
//           <p style={{ fontSize: 11, color: G.muted, margin: "0 0 14px" }}>Total commission (6 months)</p>
//           <LineChart data={monthly} valueKey="commission" color={G.green} />
//           <div style={{ marginTop: 12, display: "flex", flexDirection: "column", gap: 6 }}>
//             {monthly.slice(-3).reverse().map((m, i) => (
//               <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//                 <span style={{ color: G.muted }}>{m.month} 2026</span>
//                 <span style={{ fontWeight: 700, color: G.greenDeep }}>₹{m.commission.toLocaleString()}</span>
//               </div>
//             ))}
//           </div>
//         </SectionCard>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20 }}>
//         {/* Revenue by type */}
//         <SectionCard title="Revenue by Talent Type">
//           <div style={{ marginBottom: 16 }}>
//             {byType.map(t => (
//               <ProgressRow key={t.type} label={t.type}
//                 value={`₹${(t.amount/100000).toFixed(1)}L (${t.pct}%)`}
//                 pct={t.pct} color={G.green} />
//             ))}
//           </div>
//           <div style={{ paddingTop: 14, borderTop: `1px solid ${G.border}`, display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//             <span style={{ color: G.muted }}>Platform Rate</span>
//             <span style={{ fontWeight: 700, color: G.greenDeep }}>6% flat</span>
//           </div>
//         </SectionCard>

//         {/* Top projects */}
//         <SectionCard title="Top Revenue Projects">
//           <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
//             {topProjects.map((p, i) => {
//               const chip = STATUS_CHIP[p.status] || STATUS_CHIP.Active;
//               return (
//                 <div key={i} style={{
//                   display: "flex", alignItems: "center", gap: 12,
//                   padding: "10px 0", borderBottom: i < topProjects.length-1 ? `1px solid ${G.border}` : "none",
//                 }}>
//                   <span style={{ fontSize: 13, fontWeight: 900, color: G.greenBorder, width: 20, flexShrink: 0 }}>{i+1}</span>
//                   <div style={{ flex: 1, minWidth: 0 }}>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.project}</p>
//                     <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{p.client}</p>
//                   </div>
//                   <div style={{ textAlign: "right", flexShrink: 0 }}>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>₹{(p.amount/1000).toFixed(0)}k</p>
//                     <p style={{ fontSize: 10, color: G.greenDeep, margin: 0 }}>+₹{(p.commission/1000).toFixed(0)}k comm.</p>
//                   </div>
//                   <span style={{
//                     fontSize: 10, fontWeight: 700, flexShrink: 0,
//                     background: chip.bg, color: chip.text,
//                     border: `1px solid ${chip.border}`,
//                     padding: "2px 8px", borderRadius: 99,
//                   }}>{p.status}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </SectionCard>
//       </div>
//     </ReportPage>
//   );
// }

// /* ══════════════════ PAGE 2: USER GROWTH ══════════════════ */
// export function AdminUsersReport() {
//   const monthly = [
//     { month:"Oct", signups:12, freelancers:7,  agencies:1, clients:4,  verified:9  },
//     { month:"Nov", signups:18, freelancers:10, agencies:2, clients:6,  verified:15 },
//     { month:"Dec", signups:14, freelancers:8,  agencies:1, clients:5,  verified:11 },
//     { month:"Jan", signups:22, freelancers:12, agencies:3, clients:7,  verified:19 },
//     { month:"Feb", signups:31, freelancers:17, agencies:4, clients:10, verified:27 },
//     { month:"Mar", signups:28, freelancers:15, agencies:3, clients:10, verified:24 },
//   ];

//   const funnel = [
//     { stage:"Signed Up",        count:125, pct:100 },
//     { stage:"Email Verified",    count:112, pct:90  },
//     { stage:"Profile Completed", count:98,  pct:78  },
//     { stage:"KYC Verified",      count:81,  pct:65  },
//     { stage:"First Project",     count:54,  pct:43  },
//   ];

//   const roleBreakdown = [
//     { role:"Freelancers", count:69, pct:55, color: G.blue   },
//     { role:"Clients",     count:42, pct:34, color: G.green  },
//     { role:"Agencies",    count:14, pct:11, color: G.amber  },
//   ];

//   const roleTextColor = { [G.blue]: G.blue, [G.green]: G.greenDeep, [G.amber]: "#b45309" };

//   return (
//     <ReportPage active="users" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">

//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total Users"    value={125}   sub="All time"          color="gray"   />
//         <StatCard label="New This Month" value={28}    sub="Mar 2026"          color="green"  />
//         <StatCard label="Retention Rate" value="78%"   sub="30-day retention"  color="blue"   />
//         <StatCard label="Churn Rate"     value="8%"    sub="Monthly"           color="orange" />
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 20, marginBottom: 20 }}>
//         {/* Signup trend */}
//         <SectionCard title="Monthly Signups Trend">
//           <BarChart data={monthly} valueKey="signups" labelKey="month" color={G.blue} prefix="" />
//           <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${G.border}`, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
//             {[
//               { label:"Freelancers", value:monthly.reduce((s,m)=>s+m.freelancers,0), color: G.blue      },
//               { label:"Clients",     value:monthly.reduce((s,m)=>s+m.clients,0),     color: G.greenDeep },
//               { label:"Agencies",    value:monthly.reduce((s,m)=>s+m.agencies,0),    color: "#b45309"   },
//             ].map(s => (
//               <div key={s.label} style={{ textAlign: "center", background: G.bg, borderRadius: 10, padding: "10px 8px" }}>
//                 <p style={{ fontSize: 18, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: "4px 0 0" }}>{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </SectionCard>

//         {/* Role breakdown */}
//         <SectionCard title="User Role Split">
//           <div style={{ marginBottom: 16 }}>
//             {roleBreakdown.map(r => (
//               <ProgressRow key={r.role} label={r.role}
//                 value={`${r.count} (${r.pct}%)`}
//                 pct={r.pct} color={r.color} />
//             ))}
//           </div>
//           <div style={{ paddingTop: 14, borderTop: `1px solid ${G.border}`, display: "flex", flexDirection: "column", gap: 6 }}>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//               <span style={{ color: G.muted }}>Total Users</span>
//               <span style={{ fontWeight: 700, color: G.text }}>125</span>
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//               <span style={{ color: G.muted }}>KYC Verified</span>
//               <span style={{ fontWeight: 700, color: G.greenDeep }}>81 (65%)</span>
//             </div>
//           </div>
//         </SectionCard>
//       </div>

//       {/* Onboarding funnel */}
//       <SectionCard title="Onboarding Funnel">
//         <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//           {funnel.map((f, i) => {
//             const barColor = f.pct > 70 ? G.green : f.pct > 50 ? G.amber : "#f97316";
//             return (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: 14 }}>
//                 <div style={{
//                   width: 26, height: 26, borderRadius: "50%",
//                   background: G.gradNavy, color: G.white,
//                   display: "flex", alignItems: "center", justifyContent: "center",
//                   fontSize: 10, fontWeight: 800, flexShrink: 0,
//                 }}>{i+1}</div>
//                 <div style={{ flex: 1 }}>
//                   <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, marginBottom: 5 }}>
//                     <span style={{ fontWeight: 600, color: G.sub }}>{f.stage}</span>
//                     <span style={{ fontWeight: 700, color: G.text }}>{f.count} users ({f.pct}%)</span>
//                   </div>
//                   <div style={{ height: 7, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//                     <div style={{ width: `${f.pct}%`, height: "100%", background: barColor, borderRadius: 99 }} />
//                   </div>
//                 </div>
//                 {i > 0 && (
//                   <span style={{ fontSize: 10, color: G.muted, flexShrink: 0, width: 56, textAlign: "right" }}>
//                     -{funnel[i-1].pct - f.pct}% drop
//                   </span>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//         <InfoBanner color="orange" icon="⚠" title="Biggest Drop-off"
//           body="Profile → KYC: 17% drop. Consider simplifying KYC flow." />
//       </SectionCard>
//     </ReportPage>
//   );
// }

// /* ══════════════════ PAGE 3: PROJECT SUCCESS ══════════════════ */
// export function AdminProjectsReport() {
//   const monthly = [
//     { month:"Oct", started:3, completed:2, disputed:0, successRate:67  },
//     { month:"Nov", started:4, completed:3, disputed:1, successRate:75  },
//     { month:"Dec", started:3, completed:3, disputed:0, successRate:100 },
//     { month:"Jan", started:5, completed:4, disputed:0, successRate:80  },
//     { month:"Feb", started:6, completed:5, disputed:1, successRate:83  },
//     { month:"Mar", started:5, completed:2, disputed:2, successRate:40  },
//   ];

//   const byCategory = [
//     { category:"Mobile App",          count:4, successRate:75,  avgValue:320000 },
//     { category:"Web Development",     count:2, successRate:50,  avgValue:332500 },
//     { category:"Enterprise Software", count:3, successRate:100, avgValue:346667 },
//     { category:"Design",              count:1, successRate:100, avgValue:45000  },
//   ];

//   const byTalentType = [
//     { type:"Agency",     completed:7, disputed:2, onTime:5, avgDelay:3, successRate:78 },
//     { type:"Freelancer", completed:5, disputed:2, onTime:3, avgDelay:8, successRate:60 },
//   ];

//   const totalCompleted = monthly.reduce((s, m) => s + m.completed, 0);
//   const avgSuccessRate = Math.round(monthly.reduce((s, m) => s + m.successRate, 0) / monthly.length);
//   const maxStarted = Math.max(...monthly.map(m => m.started));

//   return (
//     <ReportPage active="projects" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">

//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total Projects"   value={10}                  color="gray"   />
//         <StatCard label="Completed"        value={totalCompleted}       sub="All time" color="green"  />
//         <StatCard label="Avg Success Rate" value={`${avgSuccessRate}%`} color="blue"   />
//         <StatCard label="On-Time Delivery" value="72%"                  sub="All projects" color="orange" />
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
//         {/* Success rate trend */}
//         <SectionCard title="Monthly Success Rate">
//           <LineChart data={monthly} valueKey="successRate" color={G.green} height={80} />
//           <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 96, marginTop: 12 }}>
//             {monthly.map((m, i) => (
//               <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
//                 <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, height: 72, justifyContent: "flex-end" }}>
//                   <div style={{ width: "100%", background: G.green + "cc", borderRadius: 3, height: `${(m.completed/maxStarted)*100}%` }} />
//                   {m.disputed > 0 && (
//                     <div style={{ width: "100%", background: G.red + "cc", borderRadius: 3, height: `${(m.disputed/maxStarted)*100}%` }} />
//                   )}
//                 </div>
//                 <span style={{ fontSize: 10, color: G.muted }}>{m.month}</span>
//               </div>
//             ))}
//           </div>
//           <div style={{ display: "flex", gap: 16, marginTop: 10 }}>
//             {[{ color: G.green, label:"Completed" }, { color: G.red, label:"Disputed" }].map(l => (
//               <div key={l.label} style={{ display: "flex", alignItems: "center", gap: 6 }}>
//                 <div style={{ width: 10, height: 10, background: l.color + "cc", borderRadius: 2 }} />
//                 <span style={{ fontSize: 11, color: G.muted }}>{l.label}</span>
//               </div>
//             ))}
//           </div>
//         </SectionCard>

//         {/* By talent type */}
//         <SectionCard title="Performance by Talent Type">
//           <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
//             {byTalentType.map(t => {
//               const chipColor = t.successRate >= 75
//                 ? { bg: G.greenBg, border: G.greenBorder, text: G.greenDeep }
//                 : { bg: G.amberBg, border: G.amberBorder, text: "#92400e"   };
//               return (
//                 <div key={t.type} style={{
//                   padding: 14, background: G.bg,
//                   borderRadius: 12, border: `1px solid ${G.border}`,
//                 }}>
//                   <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{t.type}</p>
//                     <span style={{
//                       fontSize: 10, fontWeight: 700,
//                       background: chipColor.bg, color: chipColor.text,
//                       border: `1px solid ${chipColor.border}`,
//                       padding: "2px 9px", borderRadius: 99,
//                     }}>{t.successRate}% success</span>
//                   </div>
//                   <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8 }}>
//                     {[
//                       { label:"Completed", value:t.completed,      color: G.greenDeep  },
//                       { label:"Disputed",  value:t.disputed,        color: "#dc2626"    },
//                       { label:"On Time",   value:t.onTime,          color: G.blue       },
//                       { label:"Avg Delay", value:`${t.avgDelay}d`,  color: "#b45309"    },
//                     ].map(s => (
//                       <div key={s.label} style={{ textAlign: "center", background: G.white, borderRadius: 8, padding: "8px 4px" }}>
//                         <p style={{ fontSize: 14, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
//                         <p style={{ fontSize: 10, color: G.muted, margin: "3px 0 0" }}>{s.label}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             })}
//           </div>
//         </SectionCard>
//       </div>

//       {/* By category */}
//       <SectionCard title="Success Rate by Category">
//         <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14 }}>
//           {byCategory.map(c => {
//             const valColor = c.successRate === 100 ? G.greenDeep : c.successRate >= 75 ? G.blue : "#b45309";
//             const barColor = c.successRate === 100 ? G.green     : c.successRate >= 75 ? G.blue : G.amber;
//             return (
//               <div key={c.category} style={{
//                 background: G.bg, border: `1px solid ${G.border}`,
//                 borderRadius: 12, padding: 16, textAlign: "center",
//               }}>
//                 <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: "0 0 8px" }}>{c.category}</p>
//                 <p style={{ fontSize: 24, fontWeight: 900, color: valColor, margin: "0 0 4px" }}>{c.successRate}%</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: "0 0 2px" }}>{c.count} projects</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: "0 0 10px" }}>avg ₹{(c.avgValue/1000).toFixed(0)}k</p>
//                 <div style={{ height: 6, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//                   <div style={{ width: `${c.successRate}%`, height: "100%", background: barColor, borderRadius: 99 }} />
//                 </div>
//               </div>
//             );
//           })}
//         </div>
//       </SectionCard>
//     </ReportPage>
//   );
// }

// /* ══════════════════ PAGE 4: DISPUTE TRENDS ══════════════════ */
// export function AdminDisputesReport() {
//   const monthly = [
//     { month:"Oct", raised:0, resolved:0, pending:0, avgDays:0  },
//     { month:"Nov", raised:1, resolved:1, pending:0, avgDays:8  },
//     { month:"Dec", raised:0, resolved:0, pending:0, avgDays:0  },
//     { month:"Jan", raised:1, resolved:1, pending:0, avgDays:12 },
//     { month:"Feb", raised:2, resolved:2, pending:0, avgDays:9  },
//     { month:"Mar", raised:3, resolved:1, pending:2, avgDays:5  },
//   ];

//   const byReason = [
//     { reason:"Incomplete deliverable",    count:2, pct:43 },
//     { reason:"Client approval delay",     count:1, pct:22 },
//     { reason:"Scope mismatch",            count:1, pct:22 },
//     { reason:"Design not matching brief", count:1, pct:13 },
//   ];

//   const resolutionType = [
//     { type:"Admin Decision",   count:2, pct:50, color: G.green  },
//     { type:"AI Auto-resolved", count:1, pct:25, color: G.blue   },
//     { type:"Mutual Agreement", count:1, pct:25, color: G.purple },
//   ];

//   const totalRaised   = monthly.reduce((s, m) => s + m.raised, 0);
//   const totalResolved = monthly.reduce((s, m) => s + m.resolved, 0);
//   const withDays      = monthly.filter(m => m.avgDays > 0);
//   const avgResolutionDays = Math.round(withDays.reduce((s, m) => s + m.avgDays, 0) / withDays.length);

//   return (
//     <ReportPage active="disputes" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">

//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Total Disputes"  value={totalRaised}    sub="All time"           color="gray"   />
//         <StatCard label="Resolved"        value={totalResolved}  sub={`${Math.round(totalResolved/totalRaised*100)}% resolution rate`} color="green" />
//         <StatCard label="Avg Resolution"  value={`${avgResolutionDays}d`} sub="Days to close" color="blue" />
//         <StatCard label="Dispute Rate"    value="42%"            sub="Of active projects"  color="orange" />
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
//         {/* Dispute volume */}
//         <SectionCard title="Dispute Volume Trend">
//           <BarChart data={monthly} valueKey="raised" labelKey="month" color={G.red} prefix="" />
//           <InfoBanner color="orange" icon="⚠" title="March Spike"
//             body="3 disputes in March — highest monthly count. Correlates with 2 high-risk projects (PRJ-003, PRJ-006) going into delayed status." />
//         </SectionCard>

//         {/* Resolution time */}
//         <SectionCard title="Avg Resolution Time (Days)">
//           <BarChart data={withDays} valueKey="avgDays" labelKey="month" color={G.blue} prefix="" suffix="d" />
//           <div style={{ marginTop: 16, paddingTop: 16, borderTop: `1px solid ${G.border}`, display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 10 }}>
//             {[
//               { label:"Fastest", value:"5d",                    sub:"Mar 2026" },
//               { label:"Slowest", value:"12d",                   sub:"Jan 2026" },
//               { label:"Average", value:`${avgResolutionDays}d`, sub:"All time" },
//             ].map(s => (
//               <div key={s.label} style={{ textAlign: "center", background: G.bg, borderRadius: 10, padding: "10px 8px" }}>
//                 <p style={{ fontSize: 18, fontWeight: 800, color: G.text, margin: 0 }}>{s.value}</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: "3px 0 0" }}>{s.label}</p>
//               </div>
//             ))}
//           </div>
//         </SectionCard>
//       </div>

//       <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
//         {/* By reason */}
//         <SectionCard title="Top Dispute Reasons">
//           <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 16 }}>
//             {byReason.map((r, i) => (
//               <div key={i} style={{ display: "flex", alignItems: "center", gap: 12 }}>
//                 <span style={{ fontSize: 12, fontWeight: 900, color: G.greenBorder, width: 16, flexShrink: 0 }}>{i+1}</span>
//                 <div style={{ flex: 1 }}>
//                   <ProgressRow label={r.reason} value={`${r.count} (${r.pct}%)`} pct={r.pct} color={G.red} />
//                 </div>
//               </div>
//             ))}
//           </div>
//           <InfoBanner color="blue" icon="◎" title="AI Insight"
//             body="43% of disputes are from incomplete deliverables. Stricter milestone sign-off could reduce this significantly." />
//         </SectionCard>

//         {/* Resolution types */}
//         <SectionCard title="How Disputes Were Resolved">
//           <div style={{ marginBottom: 16 }}>
//             {resolutionType.map(r => (
//               <ProgressRow key={r.type} label={r.type}
//                 value={`${r.count} (${r.pct}%)`}
//                 pct={r.pct} color={r.color} />
//             ))}
//           </div>
//           <div style={{ paddingTop: 14, borderTop: `1px solid ${G.border}`, display: "flex", flexDirection: "column", gap: 6 }}>
//             {[
//               { label:"Amount refunded",  value:"₹9,000",    color: "#b45309"   },
//               { label:"Escrow released",  value:"₹1,56,000", color: G.greenDeep },
//               { label:"Currently frozen", value:"₹2,32,500", color: "#dc2626"   },
//             ].map(s => (
//               <div key={s.label} style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//                 <span style={{ color: G.muted }}>{s.label}</span>
//                 <span style={{ fontWeight: 700, color: s.color }}>{s.value}</span>
//               </div>
//             ))}
//           </div>
//         </SectionCard>
//       </div>
//     </ReportPage>
//   );
// }











import { useState } from "react";
import { useNavigate } from "react-router-dom";

const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navy:"#1A2B5E", navyDeep:"#0F1A3B",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  text:"#1C1C1C", sub:"#4b5563", muted:"#9ca3af", border:"#e5e7eb", bg:"#f9fafb", white:"#ffffff",
  amber:"#f59e0b", amberBg:"#fffbeb", amberBorder:"#fde68a",
  red:"#ef4444", redBg:"#fef2f2", redBorder:"#fecaca",
  blue:"#2563eb", blueBg:"#eff6ff", blueBorder:"#bfdbfe",
  purple:"#7c3aed", purpleBg:"#f5f3ff", purpleBorder:"#ddd6fe",
};
const FONT = "'Poppins', sans-serif";

const RESPONSIVE_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  * { font-family: 'Poppins', sans-serif; }
  select, button { font-family: 'Poppins', sans-serif; }

  /* ── Stats row ── */
  .rpt-stats-row { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
  .rpt-stats-row > * { flex: 1 1 130px; min-width: 0; }

  /* ── Page header ── */
  .rpt-header-row {
    display: flex; align-items: flex-start;
    justify-content: space-between; margin-bottom: 24px;
    flex-wrap: wrap; gap: 12px;
  }
  .rpt-header-right { display: flex; gap: 8px; align-items: center; flex-wrap: wrap; }

  /* ── Nav tabs ── */
  .rpt-nav {
    display: flex; gap: 2px;
    border-bottom: 2px solid ${G.greenBorder};
    margin-bottom: 24px;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  .rpt-nav::-webkit-scrollbar { display: none; }

  /* ── Revenue: 2fr 1fr → 1fr on mobile ── */
  .rpt-rev-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
  .rpt-rev-sub-grid  { display: grid; grid-template-columns: 1fr 2fr; gap: 20px; }

  /* ── Revenue chart footer ── */
  .rpt-rev-chart-footer { display: grid; grid-template-columns: repeat(3,1fr); gap: 12px; }

  /* ── Users: 2fr 1fr ── */
  .rpt-users-main-grid { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
  .rpt-users-sub-grid  { display: grid; grid-template-columns: repeat(3,1fr); gap: 10px; }

  /* ── Projects: 1fr 1fr ── */
  .rpt-proj-main-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .rpt-proj-cat-grid   { display: grid; grid-template-columns: repeat(4,1fr); gap: 14px; }
  .rpt-proj-type-stats { display: grid; grid-template-columns: repeat(4,1fr); gap: 8px; }

  /* ── Disputes: 1fr 1fr ── */
  .rpt-disp-top-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-bottom: 20px; }
  .rpt-disp-bot-grid  { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }

  /* ─────────────────────────────────
     TABLET  ≤1024px
  ───────────────────────────────── */
  @media (max-width: 1024px) {
    .rpt-proj-cat-grid { grid-template-columns: repeat(2,1fr); }
  }

  /* ─────────────────────────────────
     MOBILE  ≤768px
  ───────────────────────────────── */
  @media (max-width: 768px) {
    .rpt-rev-main-grid  { grid-template-columns: 1fr; }
    .rpt-rev-sub-grid   { grid-template-columns: 1fr; }
    .rpt-users-main-grid{ grid-template-columns: 1fr; }
    .rpt-proj-main-grid { grid-template-columns: 1fr; }
    .rpt-disp-top-grid  { grid-template-columns: 1fr; }
    .rpt-disp-bot-grid  { grid-template-columns: 1fr; }
    .rpt-proj-type-stats{ grid-template-columns: repeat(2,1fr); }
  }

  /* ─────────────────────────────────
     SMALL PHONE  ≤480px
  ───────────────────────────────── */
  @media (max-width: 480px) {
    .rpt-padding { padding: 16px 14px 48px !important; }
    .rpt-stats-row > * { flex: 1 1 100%; }
    .rpt-rev-chart-footer { grid-template-columns: 1fr; }
    .rpt-users-sub-grid   { grid-template-columns: 1fr; }
    .rpt-proj-cat-grid    { grid-template-columns: 1fr 1fr; }
  }
`;

const STAT_COLOR = {
  gray:  { bg:G.bg,      border:G.border,      val:G.text,      label:G.muted     },
  green: { bg:G.greenBg, border:G.greenBorder, val:G.greenDeep, label:G.greenDeep },
  orange:{ bg:G.amberBg, border:G.amberBorder, val:"#b45309",   label:"#b45309"   },
  red:   { bg:G.redBg,   border:G.redBorder,   val:"#dc2626",   label:"#dc2626"   },
  blue:  { bg:G.blueBg,  border:G.blueBorder,  val:G.blue,      label:G.blue      },
};

function StatCard({ label, value, sub, color="gray" }) {
  const c = STAT_COLOR[color]||STAT_COLOR.gray;
  return (
    <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:14, padding:"16px 20px", flex:1, boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <p style={{ fontSize:10, fontWeight:700, color:c.label, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{label}</p>
      <p style={{ fontSize:26, fontWeight:800, color:c.val, margin:0, lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontSize:11, color:G.muted, marginTop:5 }}>{sub}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
      <div style={{ padding:"12px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg }}>
        <p style={{ fontSize:12, fontWeight:800, color:G.greenDeep, margin:0, textTransform:"uppercase", letterSpacing:"0.06em" }}>{title}</p>
      </div>
      <div style={{ padding:"20px" }}>{children}</div>
    </div>
  );
}

function ReportNav({ active }) {
  const navigate = useNavigate();
  const tabs = [
    { key:"revenue",  label:"Revenue",        path:"/admin/reports/revenue"  },
    { key:"users",    label:"User Growth",     path:"/admin/reports/users"    },
    { key:"projects", label:"Project Success", path:"/admin/reports/projects" },
    { key:"disputes", label:"Dispute Trends",  path:"/admin/reports/disputes" },
  ];
  return (
    <div className="rpt-nav">
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => navigate(tab.path)} style={{
          fontSize:13, fontWeight:700, fontFamily:FONT, padding:"10px 18px", cursor:"pointer",
          background:"none", border:"none",
          borderBottom: active===tab.key ? `2px solid ${G.green}` : "2px solid transparent",
          color: active===tab.key ? G.greenDeep : G.muted,
          marginBottom:-2, whiteSpace:"nowrap", transition:"color 0.15s", flexShrink:0,
        }}>{tab.label}</button>
      ))}
    </div>
  );
}

function BarChart({ data, valueKey, labelKey, color=G.green, prefix="₹", suffix="", height=140 }) {
  const [hov, setHov] = useState(null);
  const max = Math.max(...data.map(d=>d[valueKey]))||1;
  return (
    <div style={{ display:"flex", alignItems:"flex-end", gap:6, height }}>
      {data.map((d,i) => {
        const pct   = (d[valueKey]/max)*100;
        const label = typeof d[valueKey]==="number" && d[valueKey]>=1000 ? `${prefix}${(d[valueKey]/1000).toFixed(0)}k${suffix}` : `${prefix}${d[valueKey]}${suffix}`;
        return (
          <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}
            onMouseEnter={() => setHov(i)} onMouseLeave={() => setHov(null)}>
            <div style={{ position:"relative", width:"100%", display:"flex", alignItems:"flex-end", height:height-24 }}>
              {hov===i && <div style={{ position:"absolute", top:-28, left:"50%", transform:"translateX(-50%)", background:G.navyDeep, color:G.white, fontSize:10, fontWeight:700, padding:"3px 8px", borderRadius:6, whiteSpace:"nowrap", zIndex:10 }}>{label}</div>}
              <div style={{ width:"100%", borderRadius:"4px 4px 0 0", background:hov===i?color:color+"cc", height:`${pct}%`, transition:"background 0.12s" }} />
            </div>
            <span style={{ fontSize:10, color:G.muted, textAlign:"center", width:"100%", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{d[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineChart({ data, valueKey, color=G.green, height=100 }) {
  const max   = Math.max(...data.map(d=>d[valueKey]));
  const min   = Math.min(...data.map(d=>d[valueKey]));
  const range = max-min||1;
  const W=600; const H=height;
  const pts = data.map((d,i) => [(i/(data.length-1))*W, H-((d[valueKey]-min)/range)*(H-20)-10]);
  const ptStr = pts.map(([x,y])=>`${x},${y}`).join(" ");
  const area  = `0,${H} ${ptStr} ${W},${H}`;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width:"100%", height }}>
      <defs>
        <linearGradient id={`lg_${valueKey}`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor={color} stopOpacity="0.18" />
          <stop offset="100%" stopColor={color} stopOpacity="0"    />
        </linearGradient>
      </defs>
      <polygon points={area} fill={`url(#lg_${valueKey})`} />
      <polyline points={ptStr} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {pts.map(([x,y],i) => <circle key={i} cx={x} cy={y} r="4" fill={color} />)}
    </svg>
  );
}

function ProgressRow({ label, value, pct, color=G.green, note }) {
  return (
    <div style={{ marginBottom:14 }}>
      <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:6 }}>
        <span style={{ fontWeight:600, color:G.sub }}>{label}</span>
        <span style={{ fontWeight:700, color:G.text }}>{value}</span>
      </div>
      <div style={{ height:8, background:G.border, borderRadius:99, overflow:"hidden" }}>
        <div style={{ width:`${pct}%`, height:"100%", background:color, borderRadius:99 }} />
      </div>
      {note && <p style={{ fontSize:10, color:G.muted, marginTop:4 }}>{note}</p>}
    </div>
  );
}

function InfoBanner({ icon, title, body, color="orange" }) {
  const map = {
    orange:{ bg:G.amberBg,  border:G.amberBorder, title:"#92400e",   body:"#92400e"   },
    blue:  { bg:G.blueBg,   border:G.blueBorder,  title:G.blue,      body:G.navy      },
    green: { bg:G.greenBg,  border:G.greenBorder, title:G.greenDeep, body:G.greenDeep },
  };
  const s = map[color]||map.orange;
  return (
    <div style={{ padding:"10px 14px", marginTop:16, background:s.bg, border:`1px solid ${s.border}`, borderRadius:10 }}>
      {title && <p style={{ fontSize:12, fontWeight:800, color:s.title, margin:"0 0 3px" }}>{icon} {title}</p>}
      <p style={{ fontSize:12, color:s.body, margin:0, lineHeight:1.6 }}>{body}</p>
    </div>
  );
}

function ReportPage({ active, period, setPeriod, title, subtitle, children }) {
  return (
    <div className="rpt-padding" style={{ padding:"28px 28px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{RESPONSIVE_CSS}</style>

      <div className="rpt-header-row">
        <div>
          <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>{title}</h1>
          <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>{subtitle}</p>
        </div>
        <div className="rpt-header-right">
          {setPeriod && (
            <div style={{ display:"flex", border:`1.5px solid ${G.greenBorder}`, borderRadius:100, overflow:"hidden" }}>
              {["3m","6m","1y","All"].map(p => (
                <button key={p} onClick={() => setPeriod(p)} style={{
                  fontSize:12, fontWeight:700, fontFamily:FONT, padding:"7px 14px", border:"none", cursor:"pointer",
                  background:period===p?G.gradNavy:G.white, color:period===p?G.white:G.sub, transition:"all 0.12s",
                }}>{p}</button>
              ))}
            </div>
          )}
          <button style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"8px 16px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)" }}>⬇ Export PDF</button>
        </div>
      </div>

      <ReportNav active={active} />
      {children}
    </div>
  );
}

/* ══ PAGE 1: REVENUE ═════════════════════════════════════════════════════════ */
export function AdminRevenueReport() {
  const [period, setPeriod] = useState("6m");
  const monthly = [
    { month:"Oct", revenue:120000, commission:7200,  projects:3 },
    { month:"Nov", revenue:180000, commission:10800, projects:4 },
    { month:"Dec", revenue:150000, commission:9000,  projects:3 },
    { month:"Jan", revenue:234000, commission:14040, projects:5 },
    { month:"Feb", revenue:650000, commission:39000, projects:6 },
    { month:"Mar", revenue:480000, commission:28800, projects:5 },
  ];
  const byType = [
    { type:"Agency Projects",     amount:1520000, pct:79 },
    { type:"Freelancer Projects", amount:394000,  pct:21 },
  ];
  const topProjects = [
    { project:"HR Automation Dashboard",  client:"ByteEats Co.",       amount:650000, commission:39000, status:"Completed" },
    { project:"Food Delivery App",        client:"ByteEats Co.",       amount:480000, commission:28800, status:"Active"    },
    { project:"Logistics Tracking System",client:"Sneha Kapoor",       amount:390000, commission:23400, status:"Completed" },
    { project:"Patient Appointment App",  client:"HealthFirst Clinic", amount:320000, commission:19200, status:"Active"    },
    { project:"Mobile Banking App",       client:"Vikram Singh",       amount:280000, commission:16800, status:"Frozen"    },
  ];
  const totalRevenue    = monthly.reduce((s,m)=>s+m.revenue,0);
  const totalCommission = monthly.reduce((s,m)=>s+m.commission,0);
  const momGrowth = ((monthly[5].revenue-monthly[4].revenue)/monthly[4].revenue*100).toFixed(0);
  const STATUS_CHIP = {
    Completed:{ bg:G.greenBg, border:G.greenBorder, text:G.greenDeep },
    Active:   { bg:G.blueBg,  border:G.blueBorder,  text:G.blue      },
    Frozen:   { bg:G.redBg,   border:G.redBorder,   text:"#dc2626"   },
  };
  return (
    <ReportPage active="revenue" period={period} setPeriod={setPeriod} title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">
      <div className="rpt-stats-row">
        <StatCard label="Total GMV (6m)"    value={`₹${(totalRevenue/100000).toFixed(1)}L`}      sub="Gross platform volume" color="gray"  />
        <StatCard label="Commission Earned" value={`₹${(totalCommission/1000).toFixed(0)}k`}     sub="6% of GMV"             color="green" />
        <StatCard label="This Month"        value={`₹${(monthly[5].revenue/1000).toFixed(0)}k`}  sub="Mar 2026"              color="green" />
        <StatCard label="MoM Growth"        value={`${Number(momGrowth)>=0?"+":""}${momGrowth}%`} sub="vs last month"        color={Number(momGrowth)>=0?"green":"red"} />
      </div>
      <div className="rpt-rev-main-grid">
        <SectionCard title="Monthly Revenue Trend">
          <BarChart data={monthly} valueKey="revenue" labelKey="month" color={G.green} />
          <div className="rpt-rev-chart-footer" style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${G.border}` }}>
            {[
              { label:"Peak Month",     value:"Feb 2026",                                          sub:"₹6.5L"           },
              { label:"Avg / Month",    value:`₹${(totalRevenue/monthly.length/1000).toFixed(0)}k`, sub:"6-month avg"   },
              { label:"Total Projects", value:monthly.reduce((s,m)=>s+m.projects,0),               sub:"Across 6 months" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center" }}>
                <p style={{ fontSize:15, fontWeight:800, color:G.text, margin:0 }}>{s.value}</p>
                <p style={{ fontSize:10, color:G.muted, margin:"3px 0 0" }}>{s.label}</p>
                <p style={{ fontSize:10, color:G.border, margin:"2px 0 0" }}>{s.sub}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Commission Trend">
          <p style={{ fontSize:24, fontWeight:900, color:G.greenDeep, margin:"0 0 4px" }}>₹{totalCommission.toLocaleString()}</p>
          <p style={{ fontSize:11, color:G.muted, margin:"0 0 14px" }}>Total commission (6 months)</p>
          <LineChart data={monthly} valueKey="commission" color={G.green} />
          <div style={{ marginTop:12, display:"flex", flexDirection:"column", gap:6 }}>
            {monthly.slice(-3).reverse().map((m,i) => (
              <div key={i} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                <span style={{ color:G.muted }}>{m.month} 2026</span>
                <span style={{ fontWeight:700, color:G.greenDeep }}>₹{m.commission.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="rpt-rev-sub-grid">
        <SectionCard title="Revenue by Talent Type">
          <div style={{ marginBottom:16 }}>
            {byType.map(t => <ProgressRow key={t.type} label={t.type} value={`₹${(t.amount/100000).toFixed(1)}L (${t.pct}%)`} pct={t.pct} color={G.green} />)}
          </div>
          <div style={{ paddingTop:14, borderTop:`1px solid ${G.border}`, display:"flex", justifyContent:"space-between", fontSize:12 }}>
            <span style={{ color:G.muted }}>Platform Rate</span>
            <span style={{ fontWeight:700, color:G.greenDeep }}>6% flat</span>
          </div>
        </SectionCard>
        <SectionCard title="Top Revenue Projects">
          <div style={{ display:"flex", flexDirection:"column", gap:2 }}>
            {topProjects.map((p,i) => {
              const chip = STATUS_CHIP[p.status]||STATUS_CHIP.Active;
              return (
                <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"10px 0", borderBottom:i<topProjects.length-1?`1px solid ${G.border}`:"none" }}>
                  <span style={{ fontSize:13, fontWeight:900, color:G.greenBorder, width:20, flexShrink:0 }}>{i+1}</span>
                  <div style={{ flex:1, minWidth:0 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, whiteSpace:"nowrap", overflow:"hidden", textOverflow:"ellipsis" }}>{p.project}</p>
                    <p style={{ fontSize:11, color:G.muted, margin:0 }}>{p.client}</p>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>₹{(p.amount/1000).toFixed(0)}k</p>
                    <p style={{ fontSize:10, color:G.greenDeep, margin:0 }}>+₹{(p.commission/1000).toFixed(0)}k</p>
                  </div>
                  <span style={{ fontSize:10, fontWeight:700, flexShrink:0, background:chip.bg, color:chip.text, border:`1px solid ${chip.border}`, padding:"2px 8px", borderRadius:99 }}>{p.status}</span>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
    </ReportPage>
  );
}

/* ══ PAGE 2: USER GROWTH ═════════════════════════════════════════════════════ */
export function AdminUsersReport() {
  const monthly = [
    { month:"Oct", signups:12, freelancers:7,  agencies:1, clients:4,  verified:9  },
    { month:"Nov", signups:18, freelancers:10, agencies:2, clients:6,  verified:15 },
    { month:"Dec", signups:14, freelancers:8,  agencies:1, clients:5,  verified:11 },
    { month:"Jan", signups:22, freelancers:12, agencies:3, clients:7,  verified:19 },
    { month:"Feb", signups:31, freelancers:17, agencies:4, clients:10, verified:27 },
    { month:"Mar", signups:28, freelancers:15, agencies:3, clients:10, verified:24 },
  ];
  const funnel = [
    { stage:"Signed Up",        count:125, pct:100 },
    { stage:"Email Verified",   count:112, pct:90  },
    { stage:"Profile Completed",count:98,  pct:78  },
    { stage:"KYC Verified",     count:81,  pct:65  },
    { stage:"First Project",    count:54,  pct:43  },
  ];
  const roleBreakdown = [
    { role:"Freelancers", count:69, pct:55, color:G.blue   },
    { role:"Clients",     count:42, pct:34, color:G.green  },
    { role:"Agencies",    count:14, pct:11, color:G.amber  },
  ];
  return (
    <ReportPage active="users" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">
      <div className="rpt-stats-row">
        <StatCard label="Total Users"    value={125}  sub="All time"         color="gray"   />
        <StatCard label="New This Month" value={28}   sub="Mar 2026"         color="green"  />
        <StatCard label="Retention Rate" value="78%"  sub="30-day retention" color="blue"   />
        <StatCard label="Churn Rate"     value="8%"   sub="Monthly"          color="orange" />
      </div>
      <div className="rpt-users-main-grid">
        <SectionCard title="Monthly Signups Trend">
          <BarChart data={monthly} valueKey="signups" labelKey="month" color={G.blue} prefix="" />
          <div className="rpt-users-sub-grid" style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${G.border}` }}>
            {[
              { label:"Freelancers", value:monthly.reduce((s,m)=>s+m.freelancers,0), color:G.blue      },
              { label:"Clients",     value:monthly.reduce((s,m)=>s+m.clients,0),     color:G.greenDeep },
              { label:"Agencies",    value:monthly.reduce((s,m)=>s+m.agencies,0),    color:"#b45309"   },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center", background:G.bg, borderRadius:10, padding:"10px 8px" }}>
                <p style={{ fontSize:18, fontWeight:800, color:s.color, margin:0 }}>{s.value}</p>
                <p style={{ fontSize:10, color:G.muted, margin:"4px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="User Role Split">
          <div style={{ marginBottom:16 }}>
            {roleBreakdown.map(r => <ProgressRow key={r.role} label={r.role} value={`${r.count} (${r.pct}%)`} pct={r.pct} color={r.color} />)}
          </div>
          <div style={{ paddingTop:14, borderTop:`1px solid ${G.border}`, display:"flex", flexDirection:"column", gap:6 }}>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}><span style={{ color:G.muted }}>Total Users</span><span style={{ fontWeight:700, color:G.text }}>125</span></div>
            <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}><span style={{ color:G.muted }}>KYC Verified</span><span style={{ fontWeight:700, color:G.greenDeep }}>81 (65%)</span></div>
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Onboarding Funnel">
        <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
          {funnel.map((f,i) => {
            const barColor = f.pct>70?G.green:f.pct>50?G.amber:"#f97316";
            return (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:14, flexWrap:"wrap" }}>
                <div style={{ width:26, height:26, borderRadius:"50%", background:G.gradNavy, color:G.white, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:800, flexShrink:0 }}>{i+1}</div>
                <div style={{ flex:1, minWidth:200 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                    <span style={{ fontWeight:600, color:G.sub }}>{f.stage}</span>
                    <span style={{ fontWeight:700, color:G.text }}>{f.count} users ({f.pct}%)</span>
                  </div>
                  <div style={{ height:7, background:G.border, borderRadius:99, overflow:"hidden" }}>
                    <div style={{ width:`${f.pct}%`, height:"100%", background:barColor, borderRadius:99 }} />
                  </div>
                </div>
                {i>0 && <span style={{ fontSize:10, color:G.muted, flexShrink:0 }}>-{funnel[i-1].pct-f.pct}% drop</span>}
              </div>
            );
          })}
        </div>
        <InfoBanner color="orange" icon="⚠" title="Biggest Drop-off" body="Profile → KYC: 17% drop. Consider simplifying KYC flow." />
      </SectionCard>
    </ReportPage>
  );
}

/* ══ PAGE 3: PROJECT SUCCESS ═════════════════════════════════════════════════ */
export function AdminProjectsReport() {
  const monthly = [
    { month:"Oct", started:3, completed:2, disputed:0, successRate:67  },
    { month:"Nov", started:4, completed:3, disputed:1, successRate:75  },
    { month:"Dec", started:3, completed:3, disputed:0, successRate:100 },
    { month:"Jan", started:5, completed:4, disputed:0, successRate:80  },
    { month:"Feb", started:6, completed:5, disputed:1, successRate:83  },
    { month:"Mar", started:5, completed:2, disputed:2, successRate:40  },
  ];
  const byCategory = [
    { category:"Mobile App",          count:4, successRate:75,  avgValue:320000 },
    { category:"Web Development",     count:2, successRate:50,  avgValue:332500 },
    { category:"Enterprise Software", count:3, successRate:100, avgValue:346667 },
    { category:"Design",              count:1, successRate:100, avgValue:45000  },
  ];
  const byTalentType = [
    { type:"Agency",     completed:7, disputed:2, onTime:5, avgDelay:3, successRate:78 },
    { type:"Freelancer", completed:5, disputed:2, onTime:3, avgDelay:8, successRate:60 },
  ];
  const totalCompleted = monthly.reduce((s,m)=>s+m.completed,0);
  const avgSuccessRate = Math.round(monthly.reduce((s,m)=>s+m.successRate,0)/monthly.length);
  const maxStarted = Math.max(...monthly.map(m=>m.started));
  return (
    <ReportPage active="projects" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">
      <div className="rpt-stats-row">
        <StatCard label="Total Projects"   value={10}                  color="gray"   />
        <StatCard label="Completed"        value={totalCompleted}       sub="All time" color="green"  />
        <StatCard label="Avg Success Rate" value={`${avgSuccessRate}%`} color="blue"   />
        <StatCard label="On-Time Delivery" value="72%"                  sub="All projects" color="orange" />
      </div>
      <div className="rpt-proj-main-grid">
        <SectionCard title="Monthly Success Rate">
          <LineChart data={monthly} valueKey="successRate" color={G.green} height={80} />
          <div style={{ display:"flex", alignItems:"flex-end", gap:6, height:96, marginTop:12 }}>
            {monthly.map((m,i) => (
              <div key={i} style={{ flex:1, display:"flex", flexDirection:"column", alignItems:"center", gap:4 }}>
                <div style={{ width:"100%", display:"flex", flexDirection:"column", gap:2, height:72, justifyContent:"flex-end" }}>
                  <div style={{ width:"100%", background:G.green+"cc", borderRadius:3, height:`${(m.completed/maxStarted)*100}%` }} />
                  {m.disputed>0 && <div style={{ width:"100%", background:G.red+"cc", borderRadius:3, height:`${(m.disputed/maxStarted)*100}%` }} />}
                </div>
                <span style={{ fontSize:10, color:G.muted }}>{m.month}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", gap:16, marginTop:10 }}>
            {[{color:G.green,label:"Completed"},{color:G.red,label:"Disputed"}].map(l => (
              <div key={l.label} style={{ display:"flex", alignItems:"center", gap:6 }}>
                <div style={{ width:10, height:10, background:l.color+"cc", borderRadius:2 }} />
                <span style={{ fontSize:11, color:G.muted }}>{l.label}</span>
              </div>
            ))}
          </div>
        </SectionCard>
        <SectionCard title="Performance by Talent Type">
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {byTalentType.map(t => {
              const chipColor = t.successRate>=75 ? { bg:G.greenBg, border:G.greenBorder, text:G.greenDeep } : { bg:G.amberBg, border:G.amberBorder, text:"#92400e" };
              return (
                <div key={t.type} style={{ padding:14, background:G.bg, borderRadius:12, border:`1px solid ${G.border}` }}>
                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:12, flexWrap:"wrap", gap:8 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{t.type}</p>
                    <span style={{ fontSize:10, fontWeight:700, background:chipColor.bg, color:chipColor.text, border:`1px solid ${chipColor.border}`, padding:"2px 9px", borderRadius:99 }}>{t.successRate}% success</span>
                  </div>
                  <div className="rpt-proj-type-stats">
                    {[
                      { label:"Completed", value:t.completed, color:G.greenDeep },
                      { label:"Disputed",  value:t.disputed,  color:"#dc2626"   },
                      { label:"On Time",   value:t.onTime,    color:G.blue      },
                      { label:"Avg Delay", value:`${t.avgDelay}d`, color:"#b45309" },
                    ].map(s => (
                      <div key={s.label} style={{ textAlign:"center", background:G.white, borderRadius:8, padding:"8px 4px" }}>
                        <p style={{ fontSize:14, fontWeight:800, color:s.color, margin:0 }}>{s.value}</p>
                        <p style={{ fontSize:10, color:G.muted, margin:"3px 0 0" }}>{s.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </SectionCard>
      </div>
      <SectionCard title="Success Rate by Category">
        <div className="rpt-proj-cat-grid">
          {byCategory.map(c => {
            const valColor = c.successRate===100?G.greenDeep:c.successRate>=75?G.blue:"#b45309";
            const barColor = c.successRate===100?G.green:c.successRate>=75?G.blue:G.amber;
            return (
              <div key={c.category} style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:12, padding:16, textAlign:"center" }}>
                <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:"0 0 8px" }}>{c.category}</p>
                <p style={{ fontSize:24, fontWeight:900, color:valColor, margin:"0 0 4px" }}>{c.successRate}%</p>
                <p style={{ fontSize:10, color:G.muted, margin:"0 0 2px" }}>{c.count} projects</p>
                <p style={{ fontSize:10, color:G.muted, margin:"0 0 10px" }}>avg ₹{(c.avgValue/1000).toFixed(0)}k</p>
                <div style={{ height:6, background:G.border, borderRadius:99, overflow:"hidden" }}>
                  <div style={{ width:`${c.successRate}%`, height:"100%", background:barColor, borderRadius:99 }} />
                </div>
              </div>
            );
          })}
        </div>
      </SectionCard>
    </ReportPage>
  );
}

/* ══ PAGE 4: DISPUTE TRENDS ══════════════════════════════════════════════════ */
export function AdminDisputesReport() {
  const monthly = [
    { month:"Oct", raised:0, resolved:0, pending:0, avgDays:0  },
    { month:"Nov", raised:1, resolved:1, pending:0, avgDays:8  },
    { month:"Dec", raised:0, resolved:0, pending:0, avgDays:0  },
    { month:"Jan", raised:1, resolved:1, pending:0, avgDays:12 },
    { month:"Feb", raised:2, resolved:2, pending:0, avgDays:9  },
    { month:"Mar", raised:3, resolved:1, pending:2, avgDays:5  },
  ];
  const byReason = [
    { reason:"Incomplete deliverable",    count:2, pct:43 },
    { reason:"Client approval delay",     count:1, pct:22 },
    { reason:"Scope mismatch",            count:1, pct:22 },
    { reason:"Design not matching brief", count:1, pct:13 },
  ];
  const resolutionType = [
    { type:"Admin Decision",   count:2, pct:50, color:G.green  },
    { type:"AI Auto-resolved", count:1, pct:25, color:G.blue   },
    { type:"Mutual Agreement", count:1, pct:25, color:G.purple },
  ];
  const totalRaised   = monthly.reduce((s,m)=>s+m.raised,0);
  const totalResolved = monthly.reduce((s,m)=>s+m.resolved,0);
  const withDays      = monthly.filter(m=>m.avgDays>0);
  const avgResolutionDays = Math.round(withDays.reduce((s,m)=>s+m.avgDays,0)/withDays.length);
  return (
    <ReportPage active="disputes" title="Reports & Analytics" subtitle="Platform performance, growth & financial insights">
      <div className="rpt-stats-row">
        <StatCard label="Total Disputes" value={totalRaised}   sub="All time"           color="gray"   />
        <StatCard label="Resolved"       value={totalResolved} sub={`${Math.round(totalResolved/totalRaised*100)}% resolution rate`} color="green" />
        <StatCard label="Avg Resolution" value={`${avgResolutionDays}d`} sub="Days to close" color="blue" />
        <StatCard label="Dispute Rate"   value="42%"           sub="Of active projects"  color="orange" />
      </div>
      <div className="rpt-disp-top-grid">
        <SectionCard title="Dispute Volume Trend">
          <BarChart data={monthly} valueKey="raised" labelKey="month" color={G.red} prefix="" />
          <InfoBanner color="orange" icon="⚠" title="March Spike" body="3 disputes in March — highest monthly count. Correlates with 2 high-risk projects." />
        </SectionCard>
        <SectionCard title="Avg Resolution Time (Days)">
          <BarChart data={withDays} valueKey="avgDays" labelKey="month" color={G.blue} prefix="" suffix="d" />
          <div style={{ marginTop:16, paddingTop:16, borderTop:`1px solid ${G.border}`, display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:10 }}>
            {[
              { label:"Fastest", value:"5d",                    sub:"Mar 2026" },
              { label:"Slowest", value:"12d",                   sub:"Jan 2026" },
              { label:"Average", value:`${avgResolutionDays}d`, sub:"All time" },
            ].map(s => (
              <div key={s.label} style={{ textAlign:"center", background:G.bg, borderRadius:10, padding:"10px 8px" }}>
                <p style={{ fontSize:18, fontWeight:800, color:G.text, margin:0 }}>{s.value}</p>
                <p style={{ fontSize:10, color:G.muted, margin:"3px 0 0" }}>{s.label}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
      <div className="rpt-disp-bot-grid">
        <SectionCard title="Top Dispute Reasons">
          <div style={{ display:"flex", flexDirection:"column", gap:14, marginBottom:16 }}>
            {byReason.map((r,i) => (
              <div key={i} style={{ display:"flex", alignItems:"center", gap:12 }}>
                <span style={{ fontSize:12, fontWeight:900, color:G.greenBorder, width:16, flexShrink:0 }}>{i+1}</span>
                <div style={{ flex:1 }}><ProgressRow label={r.reason} value={`${r.count} (${r.pct}%)`} pct={r.pct} color={G.red} /></div>
              </div>
            ))}
          </div>
          <InfoBanner color="blue" icon="◎" title="AI Insight" body="43% of disputes are from incomplete deliverables. Stricter milestone sign-off could reduce this significantly." />
        </SectionCard>
        <SectionCard title="How Disputes Were Resolved">
          <div style={{ marginBottom:16 }}>
            {resolutionType.map(r => <ProgressRow key={r.type} label={r.type} value={`${r.count} (${r.pct}%)`} pct={r.pct} color={r.color} />)}
          </div>
          <div style={{ paddingTop:14, borderTop:`1px solid ${G.border}`, display:"flex", flexDirection:"column", gap:6 }}>
            {[
              { label:"Amount refunded",  value:"₹9,000",    color:"#b45309"   },
              { label:"Escrow released",  value:"₹1,56,000", color:G.greenDeep },
              { label:"Currently frozen", value:"₹2,32,500", color:"#dc2626"   },
            ].map(s => (
              <div key={s.label} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                <span style={{ color:G.muted }}>{s.label}</span>
                <span style={{ fontWeight:700, color:s.color }}>{s.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </ReportPage>
  );
}