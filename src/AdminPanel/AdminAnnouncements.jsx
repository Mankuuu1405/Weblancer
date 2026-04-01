// import { useState } from "react";
// import { ActionBtn, PageHeader, StatCard, SectionCard } from "./AdminComponents";



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

//   text:        "#1C1C1C",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
//   border:      "#e5e7eb",
//   bg:          "#f9fafb",
//   white:       "#ffffff",

//   amber:       "#f59e0b",
//   amberBg:     "#fffbeb",
//   amberBorder: "#fde68a",
//   amberText:   "#92400e",
//   red:         "#ef4444",
//   redBg:       "#fef2f2",
//   redBorder:   "#fecaca",
//   redText:     "#dc2626",
//   blue:        "#3b82f6",
//   blueBg:      "#eff6ff",
//   blueBorder:  "#bfdbfe",
//   blueText:    "#1d4ed8",
// };
// const FONT = "'Poppins', sans-serif";


// const btnNavy = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100,
//   padding: "8px 18px", cursor: "pointer",
//   boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   whiteSpace: "nowrap",
// };
// const btnGreen = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradGreen, color: G.white,
//   border: "none", borderRadius: 100,
//   padding: "8px 18px", cursor: "pointer",
//   boxShadow: "0 2px 10px rgba(46,125,31,0.22)",
//   whiteSpace: "nowrap",
// };
// const btnOutline = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.greenBg, color: G.greenDeep,
//   border: `1px solid ${G.greenBorder}`,
//   borderRadius: 100, padding: "8px 18px", cursor: "pointer",
//   whiteSpace: "nowrap",
// };
// const btnWarning = {
//   ...btnOutline,
//   background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`,
// };
// const btnDanger = {
//   ...btnOutline,
//   background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
// };
 
// const mockAnnouncements = [
//   { id:"ANN-001", title:"Platform Maintenance — Mar 20, 2026", body:"The platform will undergo scheduled maintenance on March 20th from 2:00 AM to 4:00 AM IST. All services will be temporarily unavailable.", target:"All Users", status:"Scheduled", scheduledAt:"Mar 19, 2026 · 11:00 PM", publishedAt:null, reach:0, readRate:0, createdBy:"Super Admin", createdAt:"Mar 14, 2026" },
//   { id:"ANN-002", title:"New Feature: AI Meeting Scheduler Live!", body:"We've launched in-project meeting scheduling. Book, record, and log meetings directly inside ProjectStream. Available for all active projects.", target:"All Users", status:"Published", scheduledAt:null, publishedAt:"Mar 10, 2026", reach:847, readRate:62, createdBy:"Platform Admin", createdAt:"Mar 9, 2026" },
//   { id:"ANN-003", title:"Commission Rate Update — Effective Apr 1", body:"Platform commission will remain at 6% for all plans. Elite++ freelancers will receive a reduced rate of 4% starting April 1st.", target:"Freelancers", status:"Published", scheduledAt:null, publishedAt:"Mar 8, 2026", reach:312, readRate:78, createdBy:"Super Admin", createdAt:"Mar 7, 2026" },
//   { id:"ANN-004", title:"Agency Capacity Limits — Policy Update", body:"Agencies with teams under 5 members will be limited to 3 concurrent projects. This policy takes effect from March 25th.", target:"Agencies", status:"Draft", scheduledAt:null, publishedAt:null, reach:0, readRate:0, createdBy:"Platform Admin", createdAt:"Mar 13, 2026" },
//   { id:"ANN-005", title:"KYC Verification Now Mandatory for Payouts > ₹50k", body:"Effective immediately, all payouts above ₹50,000 require verified KYC. Please ensure your documents are up to date.", target:"Freelancers", status:"Published", scheduledAt:null, publishedAt:"Feb 28, 2026", reach:289, readRate:91, createdBy:"Finance Admin", createdAt:"Feb 27, 2026" },
// ];

// const ANN_STATUS = {
//   Published: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep, dot: G.green  },
//   Scheduled: { bg: G.blueBg,   border: G.blueBorder,  text: G.blue,      dot: G.blue   },
//   Draft:     { bg: G.bg,       border: G.border,       text: G.muted,     dot: G.muted  },
//   Archived:  { bg: G.bg,       border: G.border,       text: G.muted,     dot: G.border },
// };

// const ANN_TARGET = {
//   "All Users":   { bg: G.purpleBg, border: G.purpleBorder, text: G.purple, icon:"◈" },
//   "Freelancers": { bg: G.blueBg,   border: G.blueBorder,   text: G.blue,   icon:"⟡" },
//   "Agencies":    { bg: G.amberBg,  border: G.amberBorder,  text:"#92400e", icon:"⬡" },
//   "Clients":     { bg: G.greenBg,  border: G.greenBorder,  text: G.greenDeep, icon:"◉" },
// };

// function StatusChip({ status }) {
//   const s = ANN_STATUS[status] || ANN_STATUS.Draft;
//   return (
//     <span style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, background:s.bg, color:s.text, border:`1px solid ${s.border}`, padding:"3px 10px", borderRadius:99 }}>
//       <span style={{ width:5, height:5, borderRadius:"50%", background:s.dot }} />
//       {status}
//     </span>
//   );
// }

// function TargetChip({ target }) {
//   const s = ANN_TARGET[target] || ANN_TARGET["All Users"];
//   return (
//     <span style={{ fontSize:11, fontWeight:700, background:s.bg, color:s.text, border:`1px solid ${s.border}`, padding:"3px 10px", borderRadius:99 }}>
//       {s.icon} {target}
//     </span>
//   );
// }

// const inputStyle = {
//   width:"100%", fontSize:13, fontFamily:FONT,
//   border:`1.5px solid ${G.greenBorder}`, borderRadius:10,
//   padding:"9px 14px", background:G.white, color:G.text,
//   boxSizing:"border-box", outline:"none",
// };

// export function AdminAnnouncements() {
//   const [announcements, setAnnouncements] = useState(mockAnnouncements);
//   const [activeTab,   setActiveTab]   = useState("all");
//   const [showCompose, setShowCompose] = useState(false);
//   const [selected,    setSelected]    = useState(null);
//   const [form, setForm] = useState({ title:"", body:"", target:"All Users", scheduleType:"now", scheduleDate:"", scheduleTime:"" });

//   const TABS = [
//     { key:"all",       label:"All"       },
//     { key:"published", label:"Published" },
//     { key:"scheduled", label:"Scheduled" },
//     { key:"draft",     label:"Drafts"    },
//   ];

//   const filtered = announcements.filter(a => {
//     if (activeTab === "all")       return true;
//     if (activeTab === "published") return a.status === "Published";
//     if (activeTab === "scheduled") return a.status === "Scheduled";
//     if (activeTab === "draft")     return a.status === "Draft";
//     return true;
//   });

//   const handlePublish = () => {
//     if (!form.title.trim() || !form.body.trim()) return;
//     const newAnn = {
//       id: `ANN-00${announcements.length + 1}`,
//       title: form.title, body: form.body, target: form.target,
//       status: form.scheduleType === "now" ? "Published" : "Scheduled",
//       scheduledAt: form.scheduleType === "schedule" ? `${form.scheduleDate} · ${form.scheduleTime}` : null,
//       publishedAt: form.scheduleType === "now" ? "Mar 14, 2026" : null,
//       reach: 0, readRate: 0, createdBy: "Super Admin", createdAt: "Mar 14, 2026",
//     };
//     setAnnouncements([newAnn, ...announcements]);
//     setForm({ title:"", body:"", target:"All Users", scheduleType:"now", scheduleDate:"", scheduleTime:"" });
//     setShowCompose(false);
//   };

//   const updateStatus = (id, status, extra = {}) =>
//     setAnnouncements(p => p.map(a => a.id === id ? { ...a, status, ...extra } : a));

//   const tabBtn = (active) => ({
//     fontSize: 13, fontWeight: 700, fontFamily: FONT,
//     padding: "10px 18px", cursor: "pointer",
//     background: "none", border: "none",
//     borderBottom: active ? `2px solid ${G.green}` : "2px solid transparent",
//     color: active ? G.greenDeep : G.muted,
//     marginBottom: -2, transition: "color 0.15s",
//   });

//   const actionBtn = (variant = "ghost") => {
//     const v = {
//       primary: { background: G.gradNavy, color: G.white, border: "none", boxShadow: "0 3px 12px rgba(15,26,59,0.25)" },
//       ghost:   { background: G.bg,       color: G.sub,   border: `1px solid ${G.border}`,  boxShadow: "none" },
//       warning: { background: G.amberBg,  color:"#92400e",border: `1px solid ${G.amberBorder}`, boxShadow:"none" },
//       danger:  { background: G.redBg,    color:"#dc2626",border: `1px solid ${G.redBorder}`,   boxShadow:"none" },
//       outline: { background: G.greenBg,  color: G.greenDeep, border:`1px solid ${G.greenBorder}`, boxShadow:"none" },
//     };
//     const s = v[variant] || v.ghost;
//     return { fontSize:12, fontWeight:700, fontFamily:FONT, padding:"8px 16px", borderRadius:100, cursor:"pointer", width:"100%", ...s };
//   };

//   return (
//     <div style={{ padding:"28px 28px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family:'Poppins',sans-serif; }
//         input,select,textarea { outline:none; font-family:'Poppins',sans-serif; }
//         input[type=date],input[type=time] { color-scheme:light; }
//       `}</style>

//       {/* Header */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
//         <div>
//           <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Announcements</h1>
//           <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Broadcast platform-wide messages to users</p>
//         </div>
//         <button onClick={() => { setShowCompose(true); setSelected(null); }} style={{
//           display:"inline-flex", alignItems:"center", gap:6,
//           fontSize:12, fontWeight:700, fontFamily:FONT,
//           background:G.gradNavy, color:G.white,
//           border:"none", borderRadius:100, padding:"8px 16px",
//           cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)",
//         }}>+ New Announcement</button>
//       </div>

//       {/* Stats */}
//       <div style={{ display:"flex", gap:14, marginBottom:24 }}>
//         <StatCard label="Total"     value={announcements.length}                                    color="gray"   />
//         <StatCard label="Published" value={announcements.filter(a=>a.status==="Published").length}  color="green"  />
//         <StatCard label="Scheduled" value={announcements.filter(a=>a.status==="Scheduled").length}  color="blue"   />
//         <StatCard label="Drafts"    value={announcements.filter(a=>a.status==="Draft").length}      color="orange" />
//       </div>

//       <div style={{ display:"flex", gap:20, alignItems:"flex-start" }}>

//         {/* ── List ── */}
//         <div style={{ flex:1, minWidth:0 }}>
//           {/* Tabs */}
//           <div style={{ display:"flex", gap:2, borderBottom:`2px solid ${G.greenBorder}`, marginBottom:20 }}>
//             {TABS.map(t => (
//               <button key={t.key} onClick={() => setActiveTab(t.key)} style={tabBtn(activeTab === t.key)}>{t.label}</button>
//             ))}
//           </div>

//           <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//             {filtered.map(ann => (
//               <div
//                 key={ann.id}
//                 onClick={() => { setSelected(ann); setShowCompose(false); }}
//                 style={{
//                   background:G.white, borderRadius:16, cursor:"pointer",
//                   border:`1.5px solid ${selected?.id === ann.id ? G.green : G.greenBorder}`,
//                   boxShadow: selected?.id === ann.id
//                     ? `0 0 0 3px ${G.greenBorder}, 0 4px 16px rgba(110,192,48,0.12)`
//                     : "0 2px 8px rgba(110,192,48,0.05)",
//                   transition:"all 0.12s",
//                 }}
//               >
//                 <div style={{ padding:18 }}>
//                   <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:12, marginBottom:10 }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
//                       <StatusChip status={ann.status} />
//                       <TargetChip target={ann.target} />
//                     </div>
//                     <span style={{ fontSize:10, color:G.muted, flexShrink:0 }}>{ann.createdAt}</span>
//                   </div>

//                   <h3 style={{ fontSize:14, fontWeight:700, color:G.text, margin:"0 0 6px" }}>{ann.title}</h3>
//                   <p style={{ fontSize:12, color:G.muted, margin:0, lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
//                     {ann.body}
//                   </p>

//                   {ann.status === "Published" && (
//                     <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", gap:16, flexWrap:"wrap" }}>
//                       <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12 }}>
//                         <span style={{ color:G.muted }}>Reach</span>
//                         <span style={{ fontWeight:700, color:G.text }}>{ann.reach.toLocaleString()} users</span>
//                       </div>
//                       <div style={{ display:"flex", alignItems:"center", gap:6, fontSize:12 }}>
//                         <span style={{ color:G.muted }}>Read rate</span>
//                         <div style={{ width:60, height:5, background:G.border, borderRadius:99, overflow:"hidden" }}>
//                           <div style={{ width:`${ann.readRate}%`, height:"100%", background:G.green, borderRadius:99 }} />
//                         </div>
//                         <span style={{ fontWeight:700, color:G.greenDeep }}>{ann.readRate}%</span>
//                       </div>
//                       <span style={{ fontSize:11, color:G.muted, marginLeft:"auto" }}>Published {ann.publishedAt}</span>
//                     </div>
//                   )}

//                   {ann.status === "Scheduled" && (
//                     <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${G.greenBorder}` }}>
//                       <p style={{ fontSize:12, color:G.blue, fontWeight:600, margin:0 }}>🕐 Scheduled for {ann.scheduledAt}</p>
//                     </div>
//                   )}

//                   {ann.status === "Draft" && (
//                     <div style={{ marginTop:12, paddingTop:12, borderTop:`1px solid ${G.greenBorder}`, display:"flex", gap:8 }}>
//                       <button onClick={e => { e.stopPropagation(); setSelected(ann); setShowCompose(false); }}
//                         style={{ fontSize:12, fontWeight:700, fontFamily:FONT, padding:"6px 14px", borderRadius:100, cursor:"pointer", background:G.bg, color:G.sub, border:`1px solid ${G.border}` }}>
//                         Edit Draft
//                       </button>
//                       <button onClick={e => { e.stopPropagation(); updateStatus(ann.id, "Published", { publishedAt:"Mar 14, 2026", reach:0 }); }}
//                         style={{ fontSize:12, fontWeight:700, fontFamily:FONT, padding:"6px 14px", borderRadius:100, cursor:"pointer", background:G.gradNavy, color:G.white, border:"none", boxShadow:"0 2px 8px rgba(15,26,59,0.2)" }}>
//                         Publish Now
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             ))}

//             {filtered.length === 0 && (
//               <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"48px 20px", textAlign:"center" }}>
//                 <div style={{ width:48, height:48, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>◎</div>
//                 <p style={{ fontSize:14, fontWeight:700, color:G.text }}>No announcements in this tab</p>
//               </div>
//             )}
//           </div>
//         </div>

//         {/* ── Right panel ── */}
//         <div style={{ width:320, flexShrink:0, position:"sticky", top:24 }}>

//           {/* Compose */}
//           {showCompose && (
//             <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px rgba(110,192,48,0.1)" }}>
//               <div style={{ padding:"14px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                 <p style={{ fontSize:13, fontWeight:800, color:G.greenDeep, margin:0 }}>New Announcement</p>
//                 <button onClick={() => setShowCompose(false)} style={{ background:"none", border:"none", fontSize:14, color:G.muted, cursor:"pointer" }}>✕</button>
//               </div>
//               <div style={{ padding:20, display:"flex", flexDirection:"column", gap:14 }}>
//                 {/* Title */}
//                 <div>
//                   <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Title *</p>
//                   <input value={form.title} onChange={e => setForm({...form, title:e.target.value})}
//                     placeholder="Announcement title..." style={inputStyle} />
//                 </div>
//                 {/* Body */}
//                 <div>
//                   <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Message *</p>
//                   <textarea value={form.body} onChange={e => setForm({...form, body:e.target.value})}
//                     placeholder="Write your announcement..." rows={4}
//                     style={{ ...inputStyle, resize:"none" }} />
//                 </div>
//                 {/* Target */}
//                 <div>
//                   <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Target Audience</p>
//                   <select value={form.target} onChange={e => setForm({...form, target:e.target.value})} style={inputStyle}>
//                     {["All Users","Freelancers","Agencies","Clients"].map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </div>
//                 {/* Schedule type */}
//                 <div>
//                   <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 8px" }}>Publish</p>
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     {[
//                       { key:"now",      label:"Publish immediately" },
//                       { key:"schedule", label:"Schedule for later"  },
//                       { key:"draft",    label:"Save as draft"       },
//                     ].map(t => (
//                       <label key={t.key} style={{
//                         display:"flex", alignItems:"center", gap:10,
//                         padding:"10px 12px", borderRadius:10, cursor:"pointer",
//                         border:`1.5px solid ${form.scheduleType===t.key ? G.green : G.greenBorder}`,
//                         background: form.scheduleType===t.key ? G.greenBg : G.white,
//                         fontSize:13, color: form.scheduleType===t.key ? G.greenDeep : G.sub,
//                         fontWeight: form.scheduleType===t.key ? 700 : 500,
//                         transition:"all 0.1s",
//                       }}>
//                         <input type="radio" name="scheduleType" value={t.key}
//                           checked={form.scheduleType===t.key}
//                           onChange={() => setForm({...form, scheduleType:t.key})}
//                           style={{ accentColor:G.green }} />
//                         {t.label}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//                 {/* Date/time picker */}
//                 {form.scheduleType === "schedule" && (
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
//                     <div>
//                       <p style={{ fontSize:11, color:G.muted, margin:"0 0 5px" }}>Date</p>
//                       <input type="date" value={form.scheduleDate} onChange={e => setForm({...form, scheduleDate:e.target.value})}
//                         style={{ ...inputStyle, padding:"7px 10px" }} />
//                     </div>
//                     <div>
//                       <p style={{ fontSize:11, color:G.muted, margin:"0 0 5px" }}>Time</p>
//                       <input type="time" value={form.scheduleTime} onChange={e => setForm({...form, scheduleTime:e.target.value})}
//                         style={{ ...inputStyle, padding:"7px 10px" }} />
//                     </div>
//                   </div>
//                 )}
//                 {/* Preview */}
//                 {form.title && (
//                   <div style={{ padding:12, background:G.bg, borderRadius:10, border:`1px solid ${G.greenBorder}` }}>
//                     <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Preview</p>
//                     <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>{form.title}</p>
//                     <p style={{ fontSize:12, color:G.muted, margin:"0 0 8px", lineHeight:1.6 }}>{form.body || "Message will appear here…"}</p>
//                     {form.target && <TargetChip target={form.target} />}
//                   </div>
//                 )}
//                 {/* Actions */}
//                 <div style={{ display:"flex", gap:8 }}>
//                   <button onClick={() => setShowCompose(false)} style={{ flex:"0 0 auto", fontSize:12, fontWeight:700, fontFamily:FONT, padding:"9px 16px", borderRadius:100, cursor:"pointer", background:G.bg, color:G.sub, border:`1px solid ${G.border}` }}>
//                     Cancel
//                   </button>
//                   <button onClick={handlePublish} disabled={!form.title.trim()||!form.body.trim()} style={{
//                     flex:1, fontSize:13, fontWeight:800, fontFamily:FONT,
//                     padding:"10px 0", borderRadius:100, border:"none", cursor:"pointer",
//                     background: (!form.title.trim()||!form.body.trim()) ? G.border : G.gradNavy,
//                     color: (!form.title.trim()||!form.body.trim()) ? G.muted : G.white,
//                     boxShadow: (!form.title.trim()||!form.body.trim()) ? "none" : "0 3px 12px rgba(15,26,59,0.2)",
//                     transition:"all 0.15s",
//                   }}>
//                     {form.scheduleType==="now" ? "Publish Now" : form.scheduleType==="schedule" ? "Schedule" : "Save Draft"}
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Detail view */}
//           {selected && !showCompose && (
//             <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px rgba(110,192,48,0.1)" }}>
//               <div style={{ padding:"14px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//                 <p style={{ fontSize:13, fontWeight:800, color:G.greenDeep, margin:0 }}>Details</p>
//                 <button onClick={() => setSelected(null)} style={{ background:"none", border:"none", fontSize:14, color:G.muted, cursor:"pointer" }}>✕</button>
//               </div>
//               <div style={{ padding:20, display:"flex", flexDirection:"column", gap:16 }}>
//                 <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
//                   <StatusChip status={selected.status} />
//                   <TargetChip target={selected.target} />
//                 </div>
//                 <div>
//                   <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:"0 0 6px" }}>{selected.title}</p>
//                   <p style={{ fontSize:12, color:G.muted, margin:0, lineHeight:1.7 }}>{selected.body}</p>
//                 </div>
//                 <div style={{ paddingTop:12, borderTop:`1px solid ${G.border}`, display:"flex", flexDirection:"column", gap:8 }}>
//                   {[
//                     { label:"ID",           value:selected.id         },
//                     { label:"Created by",   value:selected.createdBy  },
//                     { label:"Created",      value:selected.createdAt  },
//                     selected.publishedAt && { label:"Published",  value:selected.publishedAt },
//                     selected.scheduledAt && { label:"Scheduled for", value:selected.scheduledAt },
//                   ].filter(Boolean).map(item => (
//                     <div key={item.label} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
//                       <span style={{ color:G.muted }}>{item.label}</span>
//                       <span style={{ fontWeight:700, color:G.text }}>{item.value}</span>
//                     </div>
//                   ))}
//                 </div>

//                 {selected.status === "Published" && (
//                   <div style={{ padding:14, background:G.greenBg, borderRadius:12, border:`1px solid ${G.greenBorder}` }}>
//                     <p style={{ fontSize:11, fontWeight:700, color:G.greenDeep, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 10px" }}>Reach & Engagement</p>
//                     <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                       <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
//                         <span style={{ color:G.muted }}>Total reached</span>
//                         <span style={{ fontWeight:700, color:G.text }}>{selected.reach.toLocaleString()} users</span>
//                       </div>
//                       <div>
//                         <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
//                           <span style={{ color:G.muted }}>Read rate</span>
//                           <span style={{ fontWeight:700, color:G.greenDeep }}>{selected.readRate}%</span>
//                         </div>
//                         <div style={{ height:6, background:G.border, borderRadius:99, overflow:"hidden" }}>
//                           <div style={{ width:`${selected.readRate}%`, height:"100%", background:G.green, borderRadius:99 }} />
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                 )}

//                 <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                   {selected.status==="Draft" && (
//                     <button onClick={() => { updateStatus(selected.id,"Published",{publishedAt:"Mar 14, 2026"}); setSelected(null); }}
//                       style={{ ...actionBtn("primary"), borderRadius:100 }}>Publish Now</button>
//                   )}
//                   {selected.status==="Scheduled" && (
//                     <button onClick={() => { updateStatus(selected.id,"Draft",{scheduledAt:null}); setSelected(null); }}
//                       style={{ ...actionBtn("warning"), borderRadius:100 }}>Cancel Schedule</button>
//                   )}
//                   {selected.status==="Published" && (
//                     <button onClick={() => { updateStatus(selected.id,"Archived"); setSelected(null); }}
//                       style={{ ...actionBtn("ghost"), borderRadius:100 }}>Archive</button>
//                   )}
//                   <button onClick={() => { setAnnouncements(p=>p.filter(a=>a.id!==selected.id)); setSelected(null); }}
//                     style={{ ...actionBtn("danger"), borderRadius:100 }}>Delete</button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Default empty */}
//           {!selected && !showCompose && (
//             <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"40px 20px", textAlign:"center", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
//               <div style={{ width:48, height:48, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>📢</div>
//               <p style={{ fontSize:13, color:G.muted, marginBottom:16 }}>Select an announcement to view details</p>
//               <button onClick={() => setShowCompose(true)} style={{
//                 fontSize:12, fontWeight:700, fontFamily:FONT,
//                 background:G.gradNavy, color:G.white,
//                 border:"none", borderRadius:100, padding:"8px 20px",
//                 cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)",
//               }}>+ New Announcement</button>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AdminAnnouncements;











import { useState } from "react";
import { ActionBtn, PageHeader, StatCard, SectionCard } from "./AdminComponents";

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

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

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
};
const FONT = "'Poppins', sans-serif";

const mockAnnouncements = [
  { id:"ANN-001", title:"Platform Maintenance — Mar 20, 2026", body:"The platform will undergo scheduled maintenance on March 20th from 2:00 AM to 4:00 AM IST. All services will be temporarily unavailable.", target:"All Users", status:"Scheduled", scheduledAt:"Mar 19, 2026 · 11:00 PM", publishedAt:null, reach:0, readRate:0, createdBy:"Super Admin", createdAt:"Mar 14, 2026" },
  { id:"ANN-002", title:"New Feature: AI Meeting Scheduler Live!", body:"We've launched in-project meeting scheduling. Book, record, and log meetings directly inside ProjectStream. Available for all active projects.", target:"All Users", status:"Published", scheduledAt:null, publishedAt:"Mar 10, 2026", reach:847, readRate:62, createdBy:"Platform Admin", createdAt:"Mar 9, 2026" },
  { id:"ANN-003", title:"Commission Rate Update — Effective Apr 1", body:"Platform commission will remain at 6% for all plans. Elite++ freelancers will receive a reduced rate of 4% starting April 1st.", target:"Freelancers", status:"Published", scheduledAt:null, publishedAt:"Mar 8, 2026", reach:312, readRate:78, createdBy:"Super Admin", createdAt:"Mar 7, 2026" },
  { id:"ANN-004", title:"Agency Capacity Limits — Policy Update", body:"Agencies with teams under 5 members will be limited to 3 concurrent projects. This policy takes effect from March 25th.", target:"Agencies", status:"Draft", scheduledAt:null, publishedAt:null, reach:0, readRate:0, createdBy:"Platform Admin", createdAt:"Mar 13, 2026" },
  { id:"ANN-005", title:"KYC Verification Now Mandatory for Payouts > ₹50k", body:"Effective immediately, all payouts above ₹50,000 require verified KYC. Please ensure your documents are up to date.", target:"Freelancers", status:"Published", scheduledAt:null, publishedAt:"Feb 28, 2026", reach:289, readRate:91, createdBy:"Finance Admin", createdAt:"Feb 27, 2026" },
];

const ANN_STATUS = {
  Published: { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep, dot: G.green  },
  Scheduled: { bg: G.blueBg,   border: G.blueBorder,  text: G.blue,      dot: G.blue   },
  Draft:     { bg: G.bg,       border: G.border,       text: G.muted,     dot: G.muted  },
  Archived:  { bg: G.bg,       border: G.border,       text: G.muted,     dot: G.border },
};

const ANN_TARGET = {
  "All Users":   { bg: "#f5f3ff", border: "#e9d5ff", text: "#7c3aed", icon:"◈" },
  "Freelancers": { bg: G.blueBg,  border: G.blueBorder, text: G.blue,  icon:"⟡" },
  "Agencies":    { bg: G.amberBg, border: G.amberBorder, text:"#92400e", icon:"⬡" },
  "Clients":     { bg: G.greenBg, border: G.greenBorder, text: G.greenDeep, icon:"◉" },
};

function StatusChip({ status }) {
  const s = ANN_STATUS[status] || ANN_STATUS.Draft;
  return (
    <span style={{
      display:"inline-flex", alignItems:"center", gap:5,
      fontSize:10, fontWeight:700,
      background:s.bg, color:s.text,
      border:`1px solid ${s.border}`,
      padding:"3px 8px", borderRadius:99,
      whiteSpace:"nowrap",
    }}>
      <span style={{ width:5, height:5, borderRadius:"50%", background:s.dot, flexShrink:0 }} />
      {status}
    </span>
  );
}

function TargetChip({ target }) {
  const s = ANN_TARGET[target] || ANN_TARGET["All Users"];
  return (
    <span style={{
      fontSize:10, fontWeight:700,
      background:s.bg, color:s.text,
      border:`1px solid ${s.border}`,
      padding:"3px 8px", borderRadius:99,
      whiteSpace:"nowrap",
    }}>
      {s.icon} {target}
    </span>
  );
}

const inputStyle = {
  width:"100%", fontSize:13, fontFamily:FONT,
  border:`1.5px solid ${G.greenBorder}`, borderRadius:10,
  padding:"9px 14px", background:G.white, color:G.text,
  boxSizing:"border-box", outline:"none",
};

export function AdminAnnouncements() {
  const [announcements, setAnnouncements] = useState(mockAnnouncements);
  const [activeTab,   setActiveTab]   = useState("all");
  const [showCompose, setShowCompose] = useState(false);
  const [selected,    setSelected]    = useState(null);
  const [showPanel,   setShowPanel]   = useState(false); // mobile: controls right panel visibility
  const [form, setForm] = useState({ title:"", body:"", target:"All Users", scheduleType:"now", scheduleDate:"", scheduleTime:"" });

  const TABS = [
    { key:"all",       label:"All"       },
    { key:"published", label:"Published" },
    { key:"scheduled", label:"Scheduled" },
    { key:"draft",     label:"Drafts"    },
  ];

  const filtered = announcements.filter(a => {
    if (activeTab === "all")       return true;
    if (activeTab === "published") return a.status === "Published";
    if (activeTab === "scheduled") return a.status === "Scheduled";
    if (activeTab === "draft")     return a.status === "Draft";
    return true;
  });

  const handlePublish = () => {
    if (!form.title.trim() || !form.body.trim()) return;
    const newAnn = {
      id: `ANN-00${announcements.length + 1}`,
      title: form.title, body: form.body, target: form.target,
      status: form.scheduleType === "now" ? "Published" : form.scheduleType === "draft" ? "Draft" : "Scheduled",
      scheduledAt: form.scheduleType === "schedule" ? `${form.scheduleDate} · ${form.scheduleTime}` : null,
      publishedAt: form.scheduleType === "now" ? "Mar 14, 2026" : null,
      reach: 0, readRate: 0, createdBy: "Super Admin", createdAt: "Mar 14, 2026",
    };
    setAnnouncements([newAnn, ...announcements]);
    setForm({ title:"", body:"", target:"All Users", scheduleType:"now", scheduleDate:"", scheduleTime:"" });
    setShowCompose(false);
    setShowPanel(false);
  };

  const updateStatus = (id, status, extra = {}) =>
    setAnnouncements(p => p.map(a => a.id === id ? { ...a, status, ...extra } : a));

  const tabBtn = (active) => ({
    fontSize: 12, fontWeight: 700, fontFamily: FONT,
    padding: "8px 12px", cursor: "pointer",
    background: "none", border: "none",
    borderBottom: active ? `2px solid ${G.green}` : "2px solid transparent",
    color: active ? G.greenDeep : G.muted,
    marginBottom: -2, transition: "color 0.15s",
    whiteSpace: "nowrap",
  });

  const actionBtnStyle = (variant = "ghost") => {
    const v = {
      primary: { background: G.gradNavy, color: G.white, border: "none", boxShadow: "0 3px 12px rgba(15,26,59,0.25)" },
      ghost:   { background: G.bg,       color: G.sub,   border: `1px solid ${G.border}`,  boxShadow: "none" },
      warning: { background: G.amberBg,  color:"#92400e",border: `1px solid ${G.amberBorder}`, boxShadow:"none" },
      danger:  { background: G.redBg,    color:"#dc2626",border: `1px solid ${G.redBorder}`,   boxShadow:"none" },
      outline: { background: G.greenBg,  color: G.greenDeep, border:`1px solid ${G.greenBorder}`, boxShadow:"none" },
    };
    const s = v[variant] || v.ghost;
    return { fontSize:12, fontWeight:700, fontFamily:FONT, padding:"8px 16px", borderRadius:100, cursor:"pointer", width:"100%", ...s };
  };

  // Right panel — shown as drawer on mobile, sticky sidebar on desktop
  const RightPanel = () => (
    <>
      {/* Compose */}
      {showCompose && (
        <div style={{
          background:G.white, border:`1px solid ${G.greenBorder}`,
          borderRadius:16, overflow:"hidden",
          boxShadow:"0 4px 24px rgba(110,192,48,0.1)",
        }}>
          <div style={{ padding:"14px 16px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:13, fontWeight:800, color:G.greenDeep, margin:0 }}>New Announcement</p>
            <button onClick={() => { setShowCompose(false); setShowPanel(false); }} style={{ background:"none", border:"none", fontSize:14, color:G.muted, cursor:"pointer" }}>✕</button>
          </div>
          <div style={{ padding:16, display:"flex", flexDirection:"column", gap:12 }}>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Title *</p>
              <input value={form.title} onChange={e => setForm({...form, title:e.target.value})}
                placeholder="Announcement title..." style={inputStyle} />
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Message *</p>
              <textarea value={form.body} onChange={e => setForm({...form, body:e.target.value})}
                placeholder="Write your announcement..." rows={4}
                style={{ ...inputStyle, resize:"none" }} />
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Target Audience</p>
              <select value={form.target} onChange={e => setForm({...form, target:e.target.value})} style={inputStyle}>
                {["All Users","Freelancers","Agencies","Clients"].map(t => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 8px" }}>Publish</p>
              <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                {[
                  { key:"now",      label:"Publish immediately" },
                  { key:"schedule", label:"Schedule for later"  },
                  { key:"draft",    label:"Save as draft"       },
                ].map(t => (
                  <label key={t.key} style={{
                    display:"flex", alignItems:"center", gap:10,
                    padding:"10px 12px", borderRadius:10, cursor:"pointer",
                    border:`1.5px solid ${form.scheduleType===t.key ? G.green : G.greenBorder}`,
                    background: form.scheduleType===t.key ? G.greenBg : G.white,
                    fontSize:13, color: form.scheduleType===t.key ? G.greenDeep : G.sub,
                    fontWeight: form.scheduleType===t.key ? 700 : 500,
                  }}>
                    <input type="radio" name="scheduleType" value={t.key}
                      checked={form.scheduleType===t.key}
                      onChange={() => setForm({...form, scheduleType:t.key})}
                      style={{ accentColor:G.green }} />
                    {t.label}
                  </label>
                ))}
              </div>
            </div>
            {form.scheduleType === "schedule" && (
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                <div>
                  <p style={{ fontSize:11, color:G.muted, margin:"0 0 5px" }}>Date</p>
                  <input type="date" value={form.scheduleDate} onChange={e => setForm({...form, scheduleDate:e.target.value})}
                    style={{ ...inputStyle, padding:"7px 10px" }} />
                </div>
                <div>
                  <p style={{ fontSize:11, color:G.muted, margin:"0 0 5px" }}>Time</p>
                  <input type="time" value={form.scheduleTime} onChange={e => setForm({...form, scheduleTime:e.target.value})}
                    style={{ ...inputStyle, padding:"7px 10px" }} />
                </div>
              </div>
            )}
            {form.title && (
              <div style={{ padding:12, background:G.bg, borderRadius:10, border:`1px solid ${G.greenBorder}` }}>
                <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 6px" }}>Preview</p>
                <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 4px" }}>{form.title}</p>
                <p style={{ fontSize:12, color:G.muted, margin:"0 0 8px", lineHeight:1.6 }}>{form.body || "Message will appear here…"}</p>
                {form.target && <TargetChip target={form.target} />}
              </div>
            )}
            <div style={{ display:"flex", gap:8 }}>
              <button onClick={() => { setShowCompose(false); setShowPanel(false); }} style={{ flex:"0 0 auto", fontSize:12, fontWeight:700, fontFamily:FONT, padding:"9px 16px", borderRadius:100, cursor:"pointer", background:G.bg, color:G.sub, border:`1px solid ${G.border}` }}>
                Cancel
              </button>
              <button onClick={handlePublish} disabled={!form.title.trim()||!form.body.trim()} style={{
                flex:1, fontSize:13, fontWeight:800, fontFamily:FONT,
                padding:"10px 0", borderRadius:100, border:"none", cursor:"pointer",
                background: (!form.title.trim()||!form.body.trim()) ? G.border : G.gradNavy,
                color: (!form.title.trim()||!form.body.trim()) ? G.muted : G.white,
                boxShadow: (!form.title.trim()||!form.body.trim()) ? "none" : "0 3px 12px rgba(15,26,59,0.2)",
              }}>
                {form.scheduleType==="now" ? "Publish Now" : form.scheduleType==="schedule" ? "Schedule" : "Save Draft"}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail view */}
      {selected && !showCompose && (
        <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 4px 24px rgba(110,192,48,0.1)" }}>
          <div style={{ padding:"14px 16px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <p style={{ fontSize:13, fontWeight:800, color:G.greenDeep, margin:0 }}>Details</p>
            <button onClick={() => { setSelected(null); setShowPanel(false); }} style={{ background:"none", border:"none", fontSize:14, color:G.muted, cursor:"pointer" }}>✕</button>
          </div>
          <div style={{ padding:16, display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
              <StatusChip status={selected.status} />
              <TargetChip target={selected.target} />
            </div>
            <div>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:"0 0 6px" }}>{selected.title}</p>
              <p style={{ fontSize:12, color:G.muted, margin:0, lineHeight:1.7 }}>{selected.body}</p>
            </div>
            <div style={{ paddingTop:12, borderTop:`1px solid ${G.border}`, display:"flex", flexDirection:"column", gap:8 }}>
              {[
                { label:"ID",           value:selected.id         },
                { label:"Created by",   value:selected.createdBy  },
                { label:"Created",      value:selected.createdAt  },
                selected.publishedAt && { label:"Published",    value:selected.publishedAt },
                selected.scheduledAt && { label:"Scheduled for",value:selected.scheduledAt },
              ].filter(Boolean).map(item => (
                <div key={item.label} style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                  <span style={{ color:G.muted }}>{item.label}</span>
                  <span style={{ fontWeight:700, color:G.text, textAlign:"right", maxWidth:"60%" }}>{item.value}</span>
                </div>
              ))}
            </div>

            {selected.status === "Published" && (
              <div style={{ padding:14, background:G.greenBg, borderRadius:12, border:`1px solid ${G.greenBorder}` }}>
                <p style={{ fontSize:11, fontWeight:700, color:G.greenDeep, textTransform:"uppercase", letterSpacing:"0.06em", margin:"0 0 10px" }}>Reach &amp; Engagement</p>
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:12 }}>
                    <span style={{ color:G.muted }}>Total reached</span>
                    <span style={{ fontWeight:700, color:G.text }}>{selected.reach.toLocaleString()} users</span>
                  </div>
                  <div>
                    <div style={{ display:"flex", justifyContent:"space-between", fontSize:12, marginBottom:5 }}>
                      <span style={{ color:G.muted }}>Read rate</span>
                      <span style={{ fontWeight:700, color:G.greenDeep }}>{selected.readRate}%</span>
                    </div>
                    <div style={{ height:6, background:G.border, borderRadius:99, overflow:"hidden" }}>
                      <div style={{ width:`${selected.readRate}%`, height:"100%", background:G.green, borderRadius:99 }} />
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
              {selected.status==="Draft" && (
                <button onClick={() => { updateStatus(selected.id,"Published",{publishedAt:"Mar 14, 2026"}); setSelected(null); setShowPanel(false); }}
                  style={{ ...actionBtnStyle("primary"), borderRadius:100 }}>Publish Now</button>
              )}
              {selected.status==="Scheduled" && (
                <button onClick={() => { updateStatus(selected.id,"Draft",{scheduledAt:null}); setSelected(null); setShowPanel(false); }}
                  style={{ ...actionBtnStyle("warning"), borderRadius:100 }}>Cancel Schedule</button>
              )}
              {selected.status==="Published" && (
                <button onClick={() => { updateStatus(selected.id,"Archived"); setSelected(null); setShowPanel(false); }}
                  style={{ ...actionBtnStyle("ghost"), borderRadius:100 }}>Archive</button>
              )}
              <button onClick={() => { setAnnouncements(p=>p.filter(a=>a.id!==selected.id)); setSelected(null); setShowPanel(false); }}
                style={{ ...actionBtnStyle("danger"), borderRadius:100 }}>Delete</button>
            </div>
          </div>
        </div>
      )}

      {/* Default empty */}
      {!selected && !showCompose && (
        <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"40px 20px", textAlign:"center", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
          <div style={{ width:48, height:48, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, margin:"0 auto 12px" }}>📢</div>
          <p style={{ fontSize:13, color:G.muted, marginBottom:16 }}>Select an announcement to view details</p>
          <button onClick={() => { setShowCompose(true); setShowPanel(true); }} style={{
            fontSize:12, fontWeight:700, fontFamily:FONT,
            background:G.gradNavy, color:G.white,
            border:"none", borderRadius:100, padding:"8px 20px",
            cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)",
          }}>+ New Announcement</button>
        </div>
      )}
    </>
  );

  return (
    <div style={{ padding:"16px 12px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        input,select,textarea { outline:none; font-family:'Poppins',sans-serif; }
        input[type=date],input[type=time] { color-scheme:light; }

        @media (min-width: 640px) {
          .ann-page-pad { padding: 20px 20px 64px !important; }
          .ann-header h1 { font-size: 20px !important; }
        }
        @media (min-width: 1024px) {
          .ann-page-pad { padding: 28px 28px 64px !important; }
          .ann-layout { flex-direction: row !important; }
          .ann-sidebar { display: block !important; }
          .ann-mobile-fab { display: none !important; }
          .ann-mobile-drawer-backdrop { display: none !important; }
        }

        .ann-mobile-drawer-backdrop {
          position: fixed; inset: 0; z-index: 40;
          background: rgba(15,26,59,0.3);
          display: flex; align-items: flex-end;
        }
        .ann-mobile-drawer {
          background: white;
          border-radius: 20px 20px 0 0;
          padding: 8px 0 0;
          width: 100%;
          max-height: 92vh;
          overflow-y: auto;
        }
        .ann-drawer-handle {
          width: 36px; height: 4px;
          background: #d1d5db; border-radius: 99px;
          margin: 0 auto 12px;
        }
      `}</style>

      {/* Header */}
      <div className="ann-header" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <h1 style={{ fontSize:18, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Announcements</h1>
          <p style={{ fontSize:12, color:G.muted, marginTop:3 }}>Broadcast platform-wide messages to users</p>
        </div>
        {/* Desktop new button */}
        <button
          className="ann-mobile-fab"
          style={{ display:"none" }}
          onClick={() => { setShowCompose(true); setSelected(null); setShowPanel(true); }}
        >+ New</button>
        <button
          style={{
            display:"inline-flex", alignItems:"center", gap:6,
            fontSize:11, fontWeight:700, fontFamily:FONT,
            background:G.gradNavy, color:G.white,
            border:"none", borderRadius:100, padding:"7px 14px",
            cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)",
            whiteSpace:"nowrap",
          }}
          onClick={() => { setShowCompose(true); setSelected(null); setShowPanel(true); }}
        >+ New</button>
      </div>

      {/* Stats — 2x2 on mobile, 4-col on tablet+ */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:10, marginBottom:16 }}
        className="sm:grid-cols-4">
        <StatCard label="Total"     value={announcements.length}                                   color="gray"   bg="gray"   border="gray"   />
        <StatCard label="Published" value={announcements.filter(a=>a.status==="Published").length} color="green"  bg="green"  border="green"  />
        <StatCard label="Scheduled" value={announcements.filter(a=>a.status==="Scheduled").length} color="blue"   bg="blue"   border="blue"   />
        <StatCard label="Drafts"    value={announcements.filter(a=>a.status==="Draft").length}     color="orange" bg="orange" border="orange" />
      </div>

      {/* Layout: stacked on mobile, side-by-side on desktop */}
      <div className="ann-layout" style={{ display:"flex", flexDirection:"column", gap:16 }}>

        {/* ── List ── */}
        <div style={{ flex:1, minWidth:0 }}>
          {/* Tabs — horizontally scrollable on mobile */}
          <div style={{ display:"flex", gap:0, borderBottom:`2px solid ${G.greenBorder}`, marginBottom:16, overflowX:"auto", WebkitOverflowScrolling:"touch" }}>
            {TABS.map(t => (
              <button key={t.key} onClick={() => setActiveTab(t.key)} style={tabBtn(activeTab === t.key)}>{t.label}</button>
            ))}
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {filtered.map(ann => (
              <div
                key={ann.id}
                onClick={() => { setSelected(ann); setShowCompose(false); setShowPanel(true); }}
                style={{
                  background:G.white, borderRadius:14, cursor:"pointer",
                  border:`1.5px solid ${selected?.id === ann.id ? G.green : G.greenBorder}`,
                  boxShadow: selected?.id === ann.id
                    ? `0 0 0 3px ${G.greenBorder}, 0 4px 16px rgba(110,192,48,0.12)`
                    : "0 2px 8px rgba(110,192,48,0.05)",
                  transition:"all 0.12s",
                }}
              >
                <div style={{ padding:14 }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:8 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
                      <StatusChip status={ann.status} />
                      <TargetChip target={ann.target} />
                    </div>
                    <span style={{ fontSize:10, color:G.muted, flexShrink:0 }}>{ann.createdAt}</span>
                  </div>

                  <h3 style={{ fontSize:13, fontWeight:700, color:G.text, margin:"0 0 5px" }}>{ann.title}</h3>
                  <p style={{ fontSize:12, color:G.muted, margin:0, lineHeight:1.6, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>
                    {ann.body}
                  </p>

                  {ann.status === "Published" && (
                    <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                      <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}>
                        <span style={{ color:G.muted }}>Reach</span>
                        <span style={{ fontWeight:700, color:G.text }}>{ann.reach.toLocaleString()}</span>
                      </div>
                      <div style={{ display:"flex", alignItems:"center", gap:5, fontSize:11 }}>
                        <span style={{ color:G.muted }}>Read</span>
                        <div style={{ width:48, height:4, background:G.border, borderRadius:99, overflow:"hidden" }}>
                          <div style={{ width:`${ann.readRate}%`, height:"100%", background:G.green, borderRadius:99 }} />
                        </div>
                        <span style={{ fontWeight:700, color:G.greenDeep }}>{ann.readRate}%</span>
                      </div>
                      <span style={{ fontSize:10, color:G.muted, marginLeft:"auto" }}>{ann.publishedAt}</span>
                    </div>
                  )}

                  {ann.status === "Scheduled" && (
                    <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${G.greenBorder}` }}>
                      <p style={{ fontSize:11, color:G.blue, fontWeight:600, margin:0 }}>🕐 {ann.scheduledAt}</p>
                    </div>
                  )}

                  {ann.status === "Draft" && (
                    <div style={{ marginTop:10, paddingTop:10, borderTop:`1px solid ${G.greenBorder}`, display:"flex", gap:8 }}>
                      <button onClick={e => { e.stopPropagation(); setSelected(ann); setShowCompose(false); setShowPanel(true); }}
                        style={{ fontSize:11, fontWeight:700, fontFamily:FONT, padding:"5px 12px", borderRadius:100, cursor:"pointer", background:G.bg, color:G.sub, border:`1px solid ${G.border}` }}>
                        Edit
                      </button>
                      <button onClick={e => { e.stopPropagation(); updateStatus(ann.id, "Published", { publishedAt:"Mar 14, 2026", reach:0 }); }}
                        style={{ fontSize:11, fontWeight:700, fontFamily:FONT, padding:"5px 12px", borderRadius:100, cursor:"pointer", background:G.gradNavy, color:G.white, border:"none" }}>
                        Publish
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ))}

            {filtered.length === 0 && (
              <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"40px 20px", textAlign:"center" }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.text }}>No announcements in this tab</p>
              </div>
            )}
          </div>
        </div>

        {/* ── Desktop Sidebar (hidden on mobile, shown on lg) ── */}
        <div className="ann-sidebar" style={{ width:"min(320px, 100%)", flexShrink:0, position:"sticky", top:24 }}>
          <RightPanel />
        </div>
      </div>

      {/* ── Mobile Bottom Drawer ── */}
      {showPanel && (
        <div className="ann-mobile-drawer-backdrop" onClick={() => { setShowPanel(false); }}>
          <div className="ann-mobile-drawer" onClick={e => e.stopPropagation()}>
            <div className="ann-drawer-handle" />
            <div style={{ padding:"0 12px 32px" }}>
              <RightPanel />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminAnnouncements;