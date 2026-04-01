// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

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
//   purple:      "#8b5cf6",
//   purpleBg:    "#f5f3ff",
//   purpleBorder:"#ddd6fe",
//   purpleText:  "#6d28d9",
// };
// const FONT = "'Poppins', sans-serif";

// /* ── Health / milestone / timeline style maps ── */
// const HEALTH_STYLE = {
//   "On Track":  { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
//   "At Risk":   { bg: G.amberBg,  text: G.amberText, dot: G.amber  },
//   "Delayed":   { bg: "#fff7ed",  text: "#c2410c",   dot: "#f97316"},
//   "Disputed":  { bg: G.redBg,    text: G.redText,   dot: G.red    },
//   "Completed": { bg: G.navyBg,   text: G.navy,      dot: G.navyLight },
//   "Pending":   { bg: G.blueBg,   text: G.blueText,  dot: G.blue   },
// };
// const MS_STYLE = {
//   "Completed":   { bg: G.greenBg,   text: G.greenDeep, dot: G.green  },
//   "In Progress": { bg: G.blueBg,    text: G.blueText,  dot: G.blue   },
//   "Pending":     { bg: G.bg,        text: G.muted,     dot: G.muted  },
//   "Disputed":    { bg: G.redBg,     text: G.redText,   dot: G.red    },
// };
// const TL_ICON = {
//   system:   { icon: "⊙", bg: G.bg,         text: G.muted     },
//   payment:  { icon: "⊕", bg: G.greenBg,    text: G.greenDeep },
//   action:   { icon: "◎", bg: G.blueBg,     text: G.blueText  },
//   delivery: { icon: "⊟", bg: G.purpleBg,   text: G.purpleText},
//   approval: { icon: "✓", bg: G.greenBg,    text: G.greenDeep },
//   alert:    { icon: "⚑", bg: G.redBg,      text: G.redText   },
//   warning:  { icon: "⚠", bg: G.amberBg,    text: G.amberText },
// };
// const MSG_STYLE = {
//   red:    { border: G.red,    bg: G.redBg,    badge: { bg: G.redBg,    text: G.redText   } },
//   blue:   { border: G.blue,   bg: G.blueBg,   badge: { bg: G.blueBg,   text: G.blueText  } },
//   yellow: { border: G.amber,  bg: G.amberBg,  badge: { bg: G.amberBg,  text: G.amberText } },
//   green:  { border: G.green,  bg: G.greenBg,  badge: { bg: G.greenBg,  text: G.greenDeep } },
// };

// /* ═══════════════════════════════════════════════
//    SHARED MINI-COMPONENTS
// ═══════════════════════════════════════════════ */
// function Avatar({ name, size = "sm" }) {
//   const palette = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E","#0ea5e9","#ec4899"];
//   const color   = palette[name.charCodeAt(0) % palette.length];
//   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//   const sz = size === "lg" ? 52 : size === "md" ? 40 : 30;
//   return (
//     <div style={{
//       width: sz, height: sz, borderRadius: "50%",
//       background: color + "20", border: `1.5px solid ${color}44`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: size === "lg" ? 15 : size === "md" ? 13 : 10,
//       fontWeight: 700, color, flexShrink: 0,
//     }}>{initials}</div>
//   );
// }

// function HealthBadge({ health }) {
//   const s = HEALTH_STYLE[health] || HEALTH_STYLE["Pending"];
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, padding: "3px 10px", borderRadius: 99 }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />{health}
//     </span>
//   );
// }

// function StatusBadge({ status }) {
//   const map = {
//     "In Progress": { bg: G.blueBg,   text: G.blueText,  dot: G.blue   },
//     "Completed":   { bg: G.greenBg,  text: G.greenDeep, dot: G.green  },
//     "Disputed":    { bg: G.redBg,    text: G.redText,   dot: G.red    },
//     "Pending":     { bg: G.bg,       text: G.muted,     dot: G.muted  },
//   };
//   const s = map[status] || { bg: G.bg, text: G.muted, dot: G.muted };
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: s.bg, color: s.text, padding: "3px 10px", borderRadius: 99 }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />{status}
//     </span>
//   );
// }

// function RiskPill({ level }) {
//   const c = level === "High" ? G.redText : level === "Medium" ? G.amberText : G.greenDeep;
//   const bg = level === "High" ? G.redBg  : level === "Medium" ? G.amberBg  : G.greenBg;
//   const border = level === "High" ? G.redBorder : level === "Medium" ? G.amberBorder : G.greenBorder;
//   return (
//     <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 700, background: bg, color: c, border: `1px solid ${border}`, padding: "3px 10px", borderRadius: 99 }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: c }} />{level}
//     </span>
//   );
// }

// function StatCard({ label, value, sub, color = "gray" }) {
//   const map = {
//     gray:   { bg: G.bg,      border: G.border,       val: G.text,     lbl: G.muted      },
//     green:  { bg: G.greenBg, border: G.greenBorder,  val: G.greenDeep,lbl: G.greenDeep  },
//     orange: { bg: G.amberBg, border: G.amberBorder,  val: "#b45309",  lbl: "#b45309"    },
//     red:    { bg: G.redBg,   border: G.redBorder,    val: G.redText,  lbl: G.redText    },
//     blue:   { bg: G.blueBg,  border: G.blueBorder,   val: G.blueText, lbl: G.blueText   },
//   };
//   const c = map[color] || map.gray;
//   return (
//     <div style={{ background: c.bg, border: `1px solid ${c.border}`, borderRadius: 14, padding: "14px 18px", flex: 1, minWidth: 0, boxShadow: "0 2px 8px rgba(110,192,48,0.05)" }}>
//       <p style={{ fontSize: 10, fontWeight: 700, color: c.lbl, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 5 }}>{label}</p>
//       <p style={{ fontSize: 22, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
//       {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 4 }}>{sub}</p>}
//     </div>
//   );
// }

// function SectionCard({ title, children }) {
//   return (
//     <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
//       <div style={{ padding: "12px 18px", borderBottom: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
//         <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{title}</p>
//       </div>
//       <div style={{ padding: "16px 18px" }}>{children}</div>
//     </div>
//   );
// }

// function InfoRow({ label, value }) {
//   return (
//     <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "8px 0", borderBottom: `1px solid ${G.border}` }}>
//       <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>{label}</span>
//       <span style={{ fontSize: 12, fontWeight: 600, color: G.text }}>{value}</span>
//     </div>
//   );
// }

// const btnNavy   = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradNavy,color:G.white,border:"none",borderRadius:100,padding:"8px 16px",cursor:"pointer",boxShadow:"0 3px 12px rgba(15,26,59,0.25)",whiteSpace:"nowrap" };
// const btnGreen  = { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.gradGreen,color:G.white,border:"none",borderRadius:100,padding:"8px 16px",cursor:"pointer",boxShadow:"0 2px 10px rgba(46,125,31,0.22)",whiteSpace:"nowrap" };
// const btnOutline= { display:"inline-flex",alignItems:"center",gap:6,fontSize:12,fontWeight:700,fontFamily:FONT,background:G.greenBg,color:G.greenDeep,border:`1px solid ${G.greenBorder}`,borderRadius:100,padding:"8px 16px",cursor:"pointer",whiteSpace:"nowrap" };
// const btnWarn   = { ...btnOutline, background:G.amberBg, color:G.amberText, border:`1px solid ${G.amberBorder}` };
// const btnDanger = { ...btnOutline, background:G.redBg,   color:G.redText,   border:`1px solid ${G.redBorder}`  };

// /* ═══════════════════════════════════════════════
//    MOCK DATA
// ═══════════════════════════════════════════════ */
// const mockProjects = [
//   { id:"PRJ-001", title:"Food Delivery App", client:{name:"ByteEats Co.",id:"CL-004",email:"projects@byteeats.in",type:"Startup"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"}, status:"In Progress", health:"On Track", budget:480000, escrow:240000, commission:28800, milestones:[{name:"UI Design",amount:60000,status:"Completed",dueDate:"Feb 1, 2026",deliveredDate:"Jan 30, 2026"},{name:"Backend API",amount:120000,status:"In Progress",dueDate:"Apr 15, 2026",deliveredDate:null},{name:"Mobile App",amount:180000,status:"Pending",dueDate:"May 10, 2026",deliveredDate:null},{name:"Testing & Launch",amount:120000,status:"Pending",dueDate:"Jun 1, 2026",deliveredDate:null}], deadline:"Jun 1, 2026", startDate:"Jan 10, 2026", riskLevel:"Low", aiFlag:false, progress:55, projectType:"Fixed Price", category:"Mobile App", scopeChanges:1, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project is progressing normally. Backend API milestone is on schedule. No risk signals detected.", timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Jan 10, 2026",type:"system"},{event:"Escrow funded — ₹2,40,000",actor:"System",time:"Jan 10, 2026",type:"payment"},{event:"Milestone 1 delivered",actor:"TechNova Solutions",time:"Jan 30, 2026",type:"delivery"},{event:"Milestone 1 approved",actor:"ByteEats Co.",time:"Feb 2, 2026",type:"approval"},{event:"Milestone 1 payment released",actor:"System",time:"Feb 2, 2026",type:"payment"}], files:[{name:"UI_Design_v2.fig",size:"8.2 MB",uploadedBy:"TechNova Solutions",date:"Jan 30, 2026",milestone:"Milestone 1",version:2},{name:"API_Documentation.pdf",size:"1.1 MB",uploadedBy:"TechNova Solutions",date:"Mar 5, 2026",milestone:"Milestone 2",version:1}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"Please ensure all deliverables are uploaded before the deadline.",time:"04:30 PM",type:"Normal"},{sender:"Priya S.",role:"team",color:"yellow",text:"UI screens for milestone 3 are ready for review. Should I share in the client channel?",time:"05:00 PM",type:"Normal"},{sender:"Raj Kumar",role:"agency",color:"blue",text:"Yes Priya, share them in Channel 1 with the client. Good work!",time:"05:15 PM",type:"Normal"}] },
//   { id:"PRJ-002", title:"Patient Appointment App", client:{name:"HealthFirst Clinic",id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"}, talent:{name:"Arjun Dev",id:"FL-002",type:"Freelancer",email:"arjun@devcraft.io"}, status:"In Progress", health:"At Risk", budget:320000, escrow:160000, commission:19200, milestones:[{name:"Requirements & Design",amount:48000,status:"Completed",dueDate:"Feb 20, 2026",deliveredDate:"Feb 19, 2026"},{name:"Core Features",amount:144000,status:"In Progress",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Testing & Launch",amount:128000,status:"Pending",dueDate:"Apr 25, 2026",deliveredDate:null}], deadline:"Apr 25, 2026", startDate:"Feb 3, 2026", riskLevel:"Medium", aiFlag:true, progress:35, projectType:"Fixed Price", category:"Mobile App", scopeChanges:3, clientSilenceDays:8, talentSilenceDays:0, aiHealthSummary:"Client has been unresponsive for 8 days. Scope changed 3 times. Moderate risk of deadline breach. Admin attention recommended.", timeline:[{event:"Project created",actor:"HealthFirst Clinic",time:"Feb 3, 2026",type:"system"},{event:"Milestone 1 delivered",actor:"Arjun Dev",time:"Feb 19, 2026",type:"delivery"},{event:"Scope change request #1",actor:"HealthFirst Clinic",time:"Mar 1, 2026",type:"warning"},{event:"AI flagged: client silent 8 days",actor:"AI System",time:"Mar 10, 2026",type:"alert"}], files:[{name:"Requirements_v1.pdf",size:"2.1 MB",uploadedBy:"HealthFirst Clinic",date:"Feb 5, 2026",milestone:"Milestone 1",version:1}], messages:[{sender:"Arjun Dev",role:"talent",color:"blue",text:"Milestone 2 is 60% done. Waiting for client feedback on appointment flow.",time:"Mar 8, 2026 · 10:00 AM",type:"Update"},{sender:"Weblance Admin",role:"admin",color:"red",text:"⚠ Client has been unresponsive for 8 days. Reminder sent.",time:"Mar 10, 2026 · 09:00 AM",type:"Warning"}] },
//   { id:"PRJ-003", title:"E-Commerce Platform Revamp", client:{name:"ShopEasy Retail",id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"Rahul Sharma",id:"FL-001",type:"Freelancer",email:"rahul@gmail.com"}, status:"In Progress", health:"Delayed", budget:185000, escrow:92500, commission:11100, milestones:[{name:"Frontend Redesign",amount:55500,status:"Completed",dueDate:"Feb 15, 2026",deliveredDate:"Feb 28, 2026"},{name:"Backend Integration",amount:74000,status:"In Progress",dueDate:"Mar 25, 2026",deliveredDate:null},{name:"QA & Deployment",amount:55500,status:"Pending",dueDate:"Apr 10, 2026",deliveredDate:null}], deadline:"Apr 10, 2026", startDate:"Jan 20, 2026", riskLevel:"High", aiFlag:true, progress:28, projectType:"Fixed Price", category:"Web Development", scopeChanges:5, clientSilenceDays:5, talentSilenceDays:2, aiHealthSummary:"Milestone 1 delivered 13 days late. Scope changed 5 times without approval. Client silence and talent inactivity detected. High risk of dispute.", timeline:[{event:"Project created",actor:"ShopEasy Retail",time:"Jan 20, 2026",type:"system"},{event:"Milestone 1 OVERDUE",actor:"AI System",time:"Feb 15, 2026",type:"alert"},{event:"Milestone 1 delivered (13 days late)",actor:"Rahul Sharma",time:"Feb 28, 2026",type:"delivery"},{event:"Scope change #3 — new features",actor:"ShopEasy Retail",time:"Mar 2, 2026",type:"warning"},{event:"AI flagged: High risk project",actor:"AI System",time:"Mar 10, 2026",type:"alert"}], files:[], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"⚠ High risk project flagged. Scope changes must be formally approved.",time:"Mar 10, 2026 · 08:00 AM",type:"Warning"}] },
//   { id:"PRJ-004", title:"HR Automation Dashboard", client:{name:"ByteEats Co.",id:"CL-004",email:"projects@byteeats.in",type:"Startup"}, talent:{name:"BuildRight Agency",id:"AG-002",type:"Agency",email:"ops@buildright.co"}, status:"Completed", health:"Completed", budget:650000, escrow:0, commission:39000, milestones:[{name:"Discovery & Design",amount:97500,status:"Completed",dueDate:"Oct 20, 2025",deliveredDate:"Oct 18, 2025"},{name:"Backend Development",amount:195000,status:"Completed",dueDate:"Nov 30, 2025",deliveredDate:"Nov 28, 2025"},{name:"Frontend Development",amount:162500,status:"Completed",dueDate:"Jan 10, 2026",deliveredDate:"Jan 8, 2026"},{name:"QA & Testing",amount:97500,status:"Completed",dueDate:"Feb 10, 2026",deliveredDate:"Feb 8, 2026"},{name:"Deployment & Handover",amount:97500,status:"Completed",dueDate:"Feb 28, 2026",deliveredDate:"Feb 25, 2026"}], deadline:"Feb 28, 2026", startDate:"Oct 1, 2025", riskLevel:"Low", aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed successfully. All milestones on time. Client satisfaction: 4.8/5. No disputes.", timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Oct 1, 2025",type:"system"},{event:"All milestones completed",actor:"BuildRight Agency",time:"Feb 25, 2026",type:"delivery"},{event:"Final payment released — ₹6,50,000",actor:"System",time:"Feb 28, 2026",type:"payment"},{event:"Project closed",actor:"System",time:"Feb 28, 2026",type:"system"}], files:[{name:"Final_Delivery_Package.zip",size:"124 MB",uploadedBy:"BuildRight Agency",date:"Feb 25, 2026",milestone:"Milestone 5",version:1},{name:"Deployment_Guide.pdf",size:"3.4 MB",uploadedBy:"BuildRight Agency",date:"Feb 25, 2026",milestone:"Milestone 5",version:1}], messages:[] },
//   { id:"PRJ-005", title:"Brand Identity Design", client:{name:"Meera Joshi",id:"CL-003",email:"meera@startup.co",type:"Individual"}, talent:{name:"Neha Gupta",id:"FL-005",type:"Freelancer",email:"neha@designcraft.in"}, status:"Pending", health:"Pending", budget:45000, escrow:0, commission:2700, milestones:[{name:"Brand Discovery & Moodboard",amount:13500,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Final Brand Kit",amount:31500,status:"Pending",dueDate:"Apr 20, 2026",deliveredDate:null}], deadline:"Apr 20, 2026", startDate:"Mar 14, 2026", riskLevel:"Low", aiFlag:false, progress:0, projectType:"Fixed Price", category:"Design", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project just started. Waiting for client to fund escrow before work begins.", timeline:[{event:"Project created",actor:"Meera Joshi",time:"Mar 14, 2026",type:"system"},{event:"Neha Gupta accepted invite",actor:"Neha Gupta",time:"Mar 14, 2026",type:"action"},{event:"Waiting for escrow funding",actor:"System",time:"Mar 14, 2026",type:"alert"}], files:[], messages:[] },
//   { id:"PRJ-006", title:"Mobile Banking App", client:{name:"Vikram Singh",id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"}, status:"Disputed", health:"Disputed", budget:280000, escrow:140000, commission:16800, milestones:[{name:"UX Design",amount:42000,status:"Completed",dueDate:"Dec 10, 2025",deliveredDate:"Dec 9, 2025"},{name:"Core Banking API",amount:84000,status:"Completed",dueDate:"Jan 20, 2026",deliveredDate:"Jan 22, 2026"},{name:"Mobile Frontend",amount:84000,status:"Disputed",dueDate:"Mar 10, 2026",deliveredDate:null},{name:"Security & Launch",amount:70000,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null}], deadline:"Apr 5, 2026", startDate:"Nov 15, 2025", riskLevel:"High", aiFlag:true, progress:50, projectType:"Fixed Price", category:"Mobile App", scopeChanges:2, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Active dispute on Milestone 3. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault — 60% Agency, 40% Client.", timeline:[{event:"Project created",actor:"Vikram Singh",time:"Nov 15, 2025",type:"system"},{event:"Milestone 3 submitted",actor:"TechNova Solutions",time:"Mar 8, 2026",type:"delivery"},{event:"Client raised dispute DSP-002",actor:"Vikram Singh",time:"Mar 8, 2026",type:"alert"},{event:"Escrow frozen",actor:"System",time:"Mar 8, 2026",type:"payment"},{event:"AI analysis completed",actor:"AI System",time:"Mar 9, 2026",type:"action"}], files:[{name:"Milestone3_Partial_Build.apk",size:"18.3 MB",uploadedBy:"TechNova Solutions",date:"Mar 8, 2026",milestone:"Milestone 3",version:1}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"🔒 Chat frozen pending dispute resolution. Only official messages allowed.",time:"Mar 8, 2026 · 06:00 PM",type:"Warning"}] },
//   { id:"PRJ-007", title:"Logistics Tracking System", client:{name:"Sneha Kapoor",id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"}, talent:{name:"BuildRight Agency",id:"AG-002",type:"Agency",email:"ops@buildright.co"}, status:"Completed", health:"Completed", budget:390000, escrow:0, commission:23400, milestones:[{name:"System Architecture",amount:58500,status:"Completed",dueDate:"Sep 20, 2025",deliveredDate:"Sep 19, 2025"},{name:"Backend & APIs",amount:136500,status:"Completed",dueDate:"Oct 31, 2025",deliveredDate:"Oct 29, 2025"},{name:"Dashboard UI",amount:117000,status:"Completed",dueDate:"Dec 15, 2025",deliveredDate:"Dec 12, 2025"},{name:"Testing & Launch",amount:78000,status:"Completed",dueDate:"Jan 30, 2026",deliveredDate:"Jan 28, 2026"}], deadline:"Jan 30, 2026", startDate:"Sep 5, 2025", riskLevel:"Low", aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software", scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed. All milestones on time. Client rating: 4.9/5.", timeline:[{event:"Project created",actor:"Sneha Kapoor",time:"Sep 5, 2025",type:"system"},{event:"Project completed",actor:"System",time:"Jan 30, 2026",type:"system"}], files:[], messages:[] },
// ];

// /* ═══════════════════════════════════════════════
//    LIST PAGE
// ═══════════════════════════════════════════════ */
// export function AdminProjects() {
//   const navigate = useNavigate();
//   const [search,       setSearch]       = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [typeFilter,   setTypeFilter]   = useState("");
//   const [riskFilter,   setRiskFilter]   = useState("");
//   const [activeTab,    setActiveTab]    = useState("all");
//   const [hovRow,       setHovRow]       = useState(null);

//   const totalEscrow = mockProjects.reduce((s, p) => s + p.escrow, 0);
//   const atRisk      = mockProjects.filter(p => ["At Risk","Delayed","Disputed"].includes(p.health)).length;

//   const tabFiltered = mockProjects.filter(p => {
//     if (activeTab === "active")    return p.status === "In Progress";
//     if (activeTab === "at-risk")   return ["At Risk","Delayed","Disputed"].includes(p.health);
//     if (activeTab === "completed") return p.status === "Completed";
//     return true;
//   });
//   const filtered = tabFiltered.filter(p => {
//     const q = search.toLowerCase();
//     return (p.title.toLowerCase().includes(q) || p.client.name.toLowerCase().includes(q) || p.talent.name.toLowerCase().includes(q) || p.id.toLowerCase().includes(q))
//       && (!statusFilter || p.status    === statusFilter)
//       && (!typeFilter   || p.talent.type === typeFilter)
//       && (!riskFilter   || p.riskLevel === riskFilter);
//   });

//   const TABS = [
//     { key: "all",       label: `All (${mockProjects.length})`                                              },
//     { key: "active",    label: `Active (${mockProjects.filter(p => p.status === "In Progress").length})`   },
//     { key: "at-risk",   label: `At Risk (${atRisk})`                                                       },
//     { key: "completed", label: `Completed (${mockProjects.filter(p => p.status === "Completed").length})`  },
//   ];
//   const HEADERS = ["Project","Client","Talent","Health","Progress","Milestones","Budget","Escrow","Deadline","Risk","Actions"];

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
//       <style>{`@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap'); *{font-family:'Poppins',sans-serif;} input,select{outline:none;font-family:'Poppins',sans-serif;}`}</style>

//       {/* Header */}
//       <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:24 }}>
//         <div>
//           <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Projects</h1>
//           <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Monitor all active, completed &amp; disputed projects</p>
//         </div>
//         <button style={btnNavy}>⬇ Export</button>
//       </div>

//       {/* Stats */}
//       <div style={{ display:"flex", gap:14, marginBottom:24 }}>
//         <StatCard label="Total"              value={mockProjects.length}                                        color="gray"  />
//         <StatCard label="In Progress"        value={mockProjects.filter(p=>p.status==="In Progress").length}   color="blue"   />
//         <StatCard label="Completed"          value={mockProjects.filter(p=>p.status==="Completed").length}     color="green"  />
//         <StatCard label="At Risk / Disputed" value={atRisk}                                                    color="orange" sub="Needs attention" />
//         <StatCard label="Escrow Locked"      value={`₹${(totalEscrow/100000).toFixed(1)}L`}                    color="blue"   />
//       </div>

//       {/* Tabs */}
//       <div style={{ display:"flex", borderBottom:`1px solid ${G.greenBorder}`, marginBottom:16 }}>
//         {TABS.map(t => {
//           const active = activeTab === t.key;
//           return (
//             <button key={t.key} onClick={() => setActiveTab(t.key)} style={{
//               padding:"10px 14px", fontSize:13, fontWeight: active ? 700 : 500,
//               color: active ? G.navy : G.muted,
//               background:"none", border:"none",
//               borderBottom: active ? `2px solid ${G.green}` : "2px solid transparent",
//               cursor:"pointer", whiteSpace:"nowrap", fontFamily:FONT,
//               transition:"all 0.12s", marginBottom:-1,
//             }}>{t.label}</button>
//           );
//         })}
//       </div>

//       {/* Table card */}
//       <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>

//         {/* Filter bar */}
//         <div style={{ padding:"14px 20px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", flexWrap:"wrap", gap:10, alignItems:"center", justifyContent:"space-between" }}>
//           <div style={{ display:"flex", gap:10, flexWrap:"wrap", alignItems:"center", flex:1 }}>
//             <div style={{ position:"relative", flex:"1 1 200px", maxWidth:280 }}>
//               <span style={{ position:"absolute", left:11, top:"50%", transform:"translateY(-50%)", fontSize:13, color:G.muted }}>🔍</span>
//               <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search project, client, talent…"
//                 style={{ width:"100%", fontSize:12, fontWeight:500, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"8px 12px 8px 32px", background:G.white, color:G.text, boxSizing:"border-box" }} />
//             </div>
//             {[
//               { value:statusFilter, setter:setStatusFilter, label:"All Status", opts:["In Progress","Completed","Disputed","Pending"] },
//               { value:typeFilter,   setter:setTypeFilter,   label:"All Talent", opts:["Freelancer","Agency"]                         },
//               { value:riskFilter,   setter:setRiskFilter,   label:"All Risk",   opts:["Low","Medium","High"]                         },
//             ].map(({ value, setter, label, opts }) => (
//               <select key={label} value={value} onChange={e=>setter(e.target.value)}
//                 style={{ fontSize:12, fontWeight:600, border:`1.5px solid ${value?G.green:G.greenBorder}`, borderRadius:100, padding:"8px 14px", background:value?G.greenBg:G.white, color:value?G.greenDeep:G.sub, cursor:"pointer" }}>
//                 <option value="">{label}</option>
//                 {opts.map(o=><option key={o} value={o}>{o}</option>)}
//               </select>
//             ))}
//           </div>
//           <span style={{ fontSize:11, color:G.muted, fontWeight:600 }}>{filtered.length} results</span>
//         </div>

//         {/* Table */}
//         <div style={{ overflowX:"auto" }}>
//           <table style={{ width:"100%", borderCollapse:"collapse", minWidth:1100 }}>
//             <thead>
//               <tr style={{ background:G.bg, borderBottom:`1px solid ${G.greenBorder}` }}>
//                 {HEADERS.map(h => (
//                   <th key={h} style={{ padding:"10px 14px", fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map(p => (
//                 <tr key={p.id}
//                   style={{ borderBottom:`1px solid ${G.border}`, background:hovRow===p.id?G.greenBg:G.white, cursor:"pointer", transition:"background 0.1s" }}
//                   onMouseEnter={()=>setHovRow(p.id)} onMouseLeave={()=>setHovRow(null)}
//                   onClick={()=>navigate(`/admin/projects/${p.id}`)}
//                 >
//                   {/* Project */}
//                   <td style={{ padding:"12px 14px" }}>
//                     <div style={{ display:"flex", alignItems:"flex-start", gap:8 }}>
//                       <div>
//                         <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{p.title}</p>
//                         <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>{p.id} · {p.category}</p>
//                       </div>
//                       {p.aiFlag && <span style={{ fontSize:9, fontWeight:700, background:G.redBg, color:G.red, border:`1px solid ${G.redBorder}`, padding:"1px 6px", borderRadius:99, flexShrink:0 }}>AI⚑</span>}
//                     </div>
//                   </td>
//                   {/* Client */}
//                   <td style={{ padding:"12px 14px" }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                       <Avatar name={p.client.name} size="sm" />
//                       <div>
//                         <p style={{ fontSize:12, fontWeight:600, color:G.text, margin:0 }}>{p.client.name}</p>
//                         <p style={{ fontSize:10, color:G.muted }}>{p.client.type}</p>
//                       </div>
//                     </div>
//                   </td>
//                   {/* Talent */}
//                   <td style={{ padding:"12px 14px" }}>
//                     <p style={{ fontSize:12, fontWeight:600, color:G.text, margin:0 }}>{p.talent.name}</p>
//                     <p style={{ fontSize:10, color:G.muted }}>{p.talent.type}</p>
//                   </td>
//                   {/* Health */}
//                   <td style={{ padding:"12px 14px" }}><HealthBadge health={p.health} /></td>
//                   {/* Progress */}
//                   <td style={{ padding:"12px 14px" }}>
//                     <div style={{ display:"flex", alignItems:"center", gap:8, minWidth:80 }}>
//                       <div style={{ flex:1, height:6, background:G.border, borderRadius:99, overflow:"hidden" }}>
//                         <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background: p.progress===100?G.green:p.riskLevel==="High"?"#f97316":G.blue }} />
//                       </div>
//                       <span style={{ fontSize:11, fontWeight:700, color:G.sub }}>{p.progress}%</span>
//                     </div>
//                   </td>
//                   {/* Milestones */}
//                   <td style={{ padding:"12px 14px", textAlign:"center" }}>
//                     <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{p.milestones.filter(m=>m.status==="Completed").length}/{p.milestones.length}</span>
//                   </td>
//                   {/* Budget */}
//                   <td style={{ padding:"12px 14px" }}>
//                     <span style={{ fontSize:13, fontWeight:700, color:G.text }}>₹{(p.budget/1000).toFixed(0)}k</span>
//                   </td>
//                   {/* Escrow */}
//                   <td style={{ padding:"12px 14px" }}>
//                     {p.escrow > 0
//                       ? <span style={{ fontSize:13, fontWeight:700, color:"#b45309" }}>₹{(p.escrow/1000).toFixed(0)}k</span>
//                       : <span style={{ fontSize:12, color:G.muted }}>—</span>}
//                   </td>
//                   {/* Deadline */}
//                   <td style={{ padding:"12px 14px", fontSize:12, color:G.muted, whiteSpace:"nowrap" }}>{p.deadline}</td>
//                   {/* Risk */}
//                   <td style={{ padding:"12px 14px" }}><RiskPill level={p.riskLevel} /></td>
//                   {/* Actions */}
//                   <td style={{ padding:"12px 14px" }} onClick={e=>e.stopPropagation()}>
//                     <div style={{ opacity:hovRow===p.id?1:0, transition:"opacity 0.15s" }}>
//                       <button onClick={e=>{e.stopPropagation();navigate(`/admin/projects/${p.id}`);}}
//                         style={{ fontSize:11, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"6px 14px", cursor:"pointer", boxShadow:"0 2px 8px rgba(15,26,59,0.22)" }}>View</button>
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {filtered.length === 0 && (
//           <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"56px 20px", textAlign:"center" }}>
//             <div style={{ width:52, height:52, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:22, marginBottom:12 }}>⊟</div>
//             <p style={{ fontSize:14, fontWeight:700, color:G.text }}>No projects match your filters</p>
//           </div>
//         )}

//         <div style={{ padding:"12px 20px", background:G.greenBg, borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//           <span style={{ fontSize:11, color:G.muted, fontWeight:600 }}>Showing {filtered.length} of {mockProjects.length} projects</span>
//           <div style={{ display:"flex", gap:6 }}>
//             {["← Prev","Next →"].map(label => (
//               <button key={label} style={{ fontSize:12, fontWeight:600, fontFamily:FONT, padding:"7px 14px", border:`1px solid ${G.greenBorder}`, borderRadius:100, background:G.white, color:G.greenDeep, cursor:"pointer" }}
//                 onMouseEnter={e=>{e.currentTarget.style.background=G.greenBg;e.currentTarget.style.borderColor=G.green;}}
//                 onMouseLeave={e=>{e.currentTarget.style.background=G.white;e.currentTarget.style.borderColor=G.greenBorder;}}
//               >{label}</button>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ═══════════════════════════════════════════════
//    DETAIL PAGE
// ═══════════════════════════════════════════════ */
// export function AdminProjectDetail() {
//   const { id }       = useParams();
//   const navigate     = useNavigate();
//   const [activeTab,  setActiveTab]  = useState("overview");
//   const [chatFrozen, setChatFrozen] = useState(false);
//   const [adminMsg,   setAdminMsg]   = useState("");

//   const p = mockProjects.find(x => x.id === id);
//   if (!p) return (
//     <div style={{ padding:48, textAlign:"center", fontFamily:FONT }}>
//       <p style={{ color:G.muted, marginBottom:16 }}>Project not found</p>
//       <button onClick={()=>navigate("/admin/projects")} style={btnOutline}>← Back to Projects</button>
//     </div>
//   );

//   const completedMilestones = p.milestones.filter(m => m.status === "Completed").length;
//   const tabs = ["overview","milestones","projectstream","files","timeline","admin"];

//   /* AI health banner colours */
//   const aiBanner = p.riskLevel === "High"
//     ? { bg:G.redBg,   border:G.redBorder,   icon:"text-red-500",   title:G.redText,   body:"#b91c1c" }
//     : p.riskLevel === "Medium"
//     ? { bg:G.amberBg, border:G.amberBorder, icon:G.amber,          title:G.amberText, body:"#92400e" }
//     : p.status === "Completed"
//     ? { bg:G.greenBg, border:G.greenBorder, icon:G.green,          title:G.greenDeep, body:"#166534" }
//     : { bg:G.blueBg,  border:G.blueBorder,  icon:G.blue,           title:G.blueText,  body:"#1e40af" };

//   return (
//     <div style={{ padding:"28px 28px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
//       <style>{`*{font-family:'Poppins',sans-serif;} input,select,textarea{outline:none;font-family:'Poppins',sans-serif;}`}</style>

//       {/* Back */}
//       <button onClick={()=>navigate("/admin/projects")}
//         style={{ display:"inline-flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600, color:G.sub, background:"none", border:"none", cursor:"pointer", marginBottom:18, padding:0 }}
//         onMouseEnter={e=>e.currentTarget.style.color=G.text}
//         onMouseLeave={e=>e.currentTarget.style.color=G.sub}
//       >← All Projects</button>

//       {/* ── Profile header ── */}
//       <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"20px 24px", marginBottom:20, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
//         <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:16 }}>
//           <div>
//             <div style={{ display:"flex", alignItems:"center", gap:10, flexWrap:"wrap", marginBottom:6 }}>
//               <h1 style={{ fontSize:20, fontWeight:800, color:G.text, margin:0 }}>{p.title}</h1>
//               <HealthBadge health={p.health} />
//               <StatusBadge status={p.status} />
//               {p.aiFlag && <span style={{ fontSize:10, fontWeight:700, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, padding:"2px 8px", borderRadius:99 }}>⚑ AI Flagged</span>}
//             </div>
//             <p style={{ fontSize:12, color:G.muted, margin:0 }}>{p.id} · {p.category} · {p.projectType}</p>
//           </div>
//           <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
//             {p.status==="In Progress" && <button style={btnWarn} onClick={()=>setChatFrozen(true)}>Freeze Project</button>}
//             {p.status==="In Progress" && <button style={btnDanger}>Escalate to Dispute</button>}
//             <button style={btnOutline}>Send Notice</button>
//           </div>
//         </div>
//       </div>

//       {/* Quick stats */}
//       <div style={{ display:"flex", gap:12, marginBottom:20, flexWrap:"wrap" }}>
//         {[
//           { label:"Progress",   value:`${p.progress}%`,                                                            color: p.progress===100 ? "green" : "blue"   },
//           { label:"Milestones", value:`${completedMilestones}/${p.milestones.length}`,                             color:"gray"                                   },
//           { label:"Budget",     value:`₹${(p.budget/1000).toFixed(0)}k`,                                           color:"gray"                                   },
//           { label:"Escrow",     value: p.escrow>0 ? `₹${(p.escrow/1000).toFixed(0)}k` : "Released",               color: p.escrow>0 ? "orange" : "green"         },
//           { label:"Risk",       value: p.riskLevel,                                                                color: p.riskLevel==="High"?"red":p.riskLevel==="Medium"?"orange":"green" },
//         ].map(s => <StatCard key={s.label} {...s} />)}
//       </div>

//       {/* AI Health Banner */}
//       <div style={{ padding:"16px 18px", borderRadius:14, border:`1px solid ${aiBanner.border}`, background:aiBanner.bg, marginBottom:20, display:"flex", alignItems:"flex-start", gap:12 }}>
//         <span style={{ fontSize:20, color:aiBanner.icon, flexShrink:0, marginTop:2 }}>◎</span>
//         <div>
//           <p style={{ fontSize:13, fontWeight:700, color:aiBanner.title, marginBottom:4 }}>AI Health Summary</p>
//           <p style={{ fontSize:12, color:aiBanner.body, lineHeight:1.6, margin:0 }}>{p.aiHealthSummary}</p>
//         </div>
//       </div>

//       {/* Tabs */}
//       <div style={{ display:"flex", background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:"12px 12px 0 0", overflow:"hidden", marginBottom:20 }}>
//         {tabs.map(tab => {
//           const active = activeTab === tab;
//           return (
//             <button key={tab} onClick={()=>setActiveTab(tab)} style={{
//               padding:"12px 16px", fontSize:13, fontWeight:active?700:500,
//               color:active?G.navy:G.muted, background:active?G.greenBg:"none",
//               border:"none", borderBottom:active?`2px solid ${G.green}`:"2px solid transparent",
//               cursor:"pointer", textTransform:"capitalize", fontFamily:FONT, whiteSpace:"nowrap",
//             }}>{tab==="projectstream"?"ProjectStream":tab}</button>
//           );
//         })}
//       </div>

//       {/* ── OVERVIEW ── */}
//       {activeTab==="overview" && (
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 320px", gap:20 }}>
//           <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//             <SectionCard title="Project Details">
//               <InfoRow label="Project ID"    value={p.id} />
//               <InfoRow label="Category"      value={p.category} />
//               <InfoRow label="Type"          value={p.projectType} />
//               <InfoRow label="Start Date"    value={p.startDate} />
//               <InfoRow label="Deadline"      value={p.deadline} />
//               <InfoRow label="Scope Changes" value={
//                 p.scopeChanges > 0
//                   ? <span style={{ fontSize:12, fontWeight:700, color:p.scopeChanges>2?G.redText:G.amberText }}>{p.scopeChanges} changes</span>
//                   : <span style={{ fontSize:12, fontWeight:700, color:G.greenDeep }}>None</span>
//               } />
//             </SectionCard>

//             <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
//               {/* Client card */}
//               <SectionCard title="Client">
//                 <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
//                   <Avatar name={p.client.name} size="md" />
//                   <div>
//                     <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{p.client.name}</p>
//                     <p style={{ fontSize:11, color:G.muted }}>{p.client.type}</p>
//                   </div>
//                 </div>
//                 <InfoRow label="Email"     value={p.client.email} />
//                 <InfoRow label="Client ID" value={p.client.id} />
//                 <InfoRow label="Silence"   value={
//                   p.clientSilenceDays > 0
//                     ? <span style={{ fontSize:12, fontWeight:700, color:p.clientSilenceDays>5?G.redText:G.amberText }}>{p.clientSilenceDays}d</span>
//                     : <span style={{ fontSize:12, fontWeight:700, color:G.greenDeep }}>Active</span>
//                 } />
//                 <div style={{ marginTop:12 }}>
//                   <button style={btnOutline} onClick={()=>navigate(`/admin/clients/${p.client.id}`)}>View Client</button>
//                 </div>
//               </SectionCard>
//               {/* Talent card */}
//               <SectionCard title={p.talent.type}>
//                 <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:14 }}>
//                   <Avatar name={p.talent.name} size="md" />
//                   <div>
//                     <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{p.talent.name}</p>
//                     <p style={{ fontSize:11, color:G.muted }}>{p.talent.type}</p>
//                   </div>
//                 </div>
//                 <InfoRow label="Email"     value={p.talent.email} />
//                 <InfoRow label="Talent ID" value={p.talent.id} />
//                 <InfoRow label="Silence"   value={
//                   p.talentSilenceDays > 0
//                     ? <span style={{ fontSize:12, fontWeight:700, color:p.talentSilenceDays>2?G.redText:G.amberText }}>{p.talentSilenceDays}d</span>
//                     : <span style={{ fontSize:12, fontWeight:700, color:G.greenDeep }}>Active</span>
//                 } />
//                 <div style={{ marginTop:12 }}>
//                   <button style={btnOutline} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}>View {p.talent.type}</button>
//                 </div>
//               </SectionCard>
//             </div>
//           </div>

//           <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//             <SectionCard title="Financial Summary">
//               {[
//                 { label:"Total Budget",   value:`₹${p.budget.toLocaleString()}`,                                                                                        color:G.text       },
//                 { label:"Escrow Locked",  value:p.escrow>0?`₹${p.escrow.toLocaleString()}`:"Released",                                                                  color:p.escrow>0?"#b45309":G.greenDeep },
//                 { label:"Commission (6%)",value:`₹${p.commission.toLocaleString()}`,                                                                                    color:G.greenDeep  },
//                 { label:"Paid to Talent", value:`₹${p.milestones.filter(m=>m.status==="Completed").reduce((s,m)=>s+m.amount,0).toLocaleString()}`,                     color:G.blueText   },
//               ].map(item => (
//                 <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"9px 0", borderBottom:`1px solid ${G.border}` }}>
//                   <span style={{ fontSize:12, color:G.muted }}>{item.label}</span>
//                   <span style={{ fontSize:13, fontWeight:700, color:item.color }}>{item.value}</span>
//                 </div>
//               ))}
//             </SectionCard>

//             <SectionCard title="Progress">
//               <div style={{ marginBottom:16 }}>
//                 <div style={{ display:"flex", justifyContent:"space-between", marginBottom:8 }}>
//                   <span style={{ fontSize:12, color:G.muted }}>Completion</span>
//                   <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{p.progress}%</span>
//                 </div>
//                 <div style={{ height:10, background:G.border, borderRadius:99, overflow:"hidden" }}>
//                   <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background:p.progress===100?G.green:p.riskLevel==="High"?"#f97316":G.blue, transition:"width 0.3s" }} />
//                 </div>
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, textAlign:"center" }}>
//                 <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 8px" }}>
//                   <p style={{ fontSize:22, fontWeight:800, color:G.greenDeep, margin:0 }}>{completedMilestones}</p>
//                   <p style={{ fontSize:10, color:G.muted, marginTop:3 }}>Completed</p>
//                 </div>
//                 <div style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:10, padding:"10px 8px" }}>
//                   <p style={{ fontSize:22, fontWeight:800, color:G.sub, margin:0 }}>{p.milestones.length - completedMilestones}</p>
//                   <p style={{ fontSize:10, color:G.muted, marginTop:3 }}>Remaining</p>
//                 </div>
//               </div>
//             </SectionCard>
//           </div>
//         </div>
//       )}

//       {/* ── MILESTONES ── */}
//       {activeTab==="milestones" && (
//         <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
//           {p.milestones.map((m, i) => {
//             const ms = MS_STYLE[m.status] || MS_STYLE["Pending"];
//             const numBg = m.status==="Completed"?G.green:m.status==="In Progress"?G.blue:m.status==="Disputed"?G.red:G.muted;
//             return (
//               <div key={i} style={{ background:G.white, border:`1px solid ${m.status==="Disputed"?G.redBorder:m.status==="Completed"?G.greenBorder:G.border}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
//                 <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
//                   <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                     <div style={{ width:34, height:34, borderRadius:"50%", background:numBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:G.white, flexShrink:0 }}>
//                       {m.status==="Completed"?"✓":i+1}
//                     </div>
//                     <div>
//                       <p style={{ fontSize:14, fontWeight:700, color:G.text, margin:0 }}>{m.name}</p>
//                       <p style={{ fontSize:11, color:G.muted }}>Milestone {i+1} of {p.milestones.length}</p>
//                     </div>
//                   </div>
//                   <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                     <span style={{ fontSize:17, fontWeight:800, color:G.text }}>₹{m.amount.toLocaleString()}</span>
//                     <span style={{ fontSize:11, fontWeight:700, background:ms.bg, color:ms.text, padding:"3px 10px", borderRadius:99 }}>{m.status}</span>
//                   </div>
//                 </div>
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10 }}>
//                   {[
//                     { label:"Due Date",  value:m.dueDate,             color:G.text                                                          },
//                     { label:"Delivered", value:m.deliveredDate||"Not yet", color:m.deliveredDate?G.text:G.muted                            },
//                     { label:"Escrow",    value:m.status==="Completed"?"Released":m.status==="Disputed"?"Frozen":"Locked",
//                       color:m.status==="Completed"?G.greenDeep:m.status==="Disputed"?G.redText:"#b45309"                                   },
//                   ].map(s => (
//                     <div key={s.label} style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:10, padding:"10px 12px" }}>
//                       <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{s.label}</p>
//                       <p style={{ fontSize:13, fontWeight:600, color:s.color, margin:0 }}>{s.value}</p>
//                     </div>
//                   ))}
//                 </div>
//                 {m.status==="In Progress" && (
//                   <div style={{ display:"flex", gap:8, marginTop:14 }}>
//                     <button style={btnGreen}>Force Release</button>
//                     <button style={btnOutline}>Extend Deadline</button>
//                     <button style={btnWarn}>Freeze</button>
//                   </div>
//                 )}
//                 {m.status==="Disputed" && (
//                   <div style={{ display:"flex", gap:8, marginTop:14 }}>
//                     <button style={btnDanger} onClick={()=>navigate("/admin/disputes")}>View Dispute</button>
//                     <button style={btnGreen}>Force Release</button>
//                   </div>
//                 )}
//               </div>
//             );
//           })}
//         </div>
//       )}

//       {/* ── PROJECTSTREAM ── */}
//       {activeTab==="projectstream" && (
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>
//           <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
//             {/* Chat header */}
//             <div style={{ padding:"14px 20px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//               <div>
//                 <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>ProjectStream — {p.title}</p>
//                 <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Read-only admin view</p>
//               </div>
//               <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                 {chatFrozen && <span style={{ fontSize:11, fontWeight:700, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, padding:"2px 8px", borderRadius:99 }}>🔒 Frozen</span>}
//                 <button style={chatFrozen?btnOutline:btnWarn} onClick={()=>setChatFrozen(!chatFrozen)}>{chatFrozen?"Unfreeze":"Freeze Chat"}</button>
//               </div>
//             </div>
//             {chatFrozen && (
//               <div style={{ padding:"8px 20px", background:G.redBg, borderBottom:`1px solid ${G.redBorder}` }}>
//                 <p style={{ fontSize:12, color:G.redText, fontWeight:600, margin:0 }}>⚠ Chat frozen — only admin can send messages</p>
//               </div>
//             )}
//             {/* Messages */}
//             <div style={{ padding:20, minHeight:280, display:"flex", flexDirection:"column", gap:12 }}>
//               {p.messages.length === 0
//                 ? <p style={{ color:G.muted, fontSize:13, textAlign:"center", padding:"40px 0" }}>No messages yet</p>
//                 : p.messages.map((msg, i) => {
//                   const ms = MSG_STYLE[msg.color] || MSG_STYLE.blue;
//                   return (
//                     <div key={i} style={{ padding:"12px 14px", borderRadius:12, background:ms.bg, borderLeft:`3px solid ${ms.border}` }}>
//                       <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
//                         <Avatar name={msg.sender} size="sm" />
//                         <span style={{ fontSize:13, fontWeight:700, color:G.text }}>{msg.sender}</span>
//                         <span style={{ fontSize:10, fontWeight:700, background:ms.badge.bg, color:ms.badge.text, padding:"2px 8px", borderRadius:99 }}>
//                           {msg.role==="admin"?"Admin":msg.role==="team"?"Team":msg.role==="agency"?"Agency Admin":"Talent"}
//                         </span>
//                         <span style={{ fontSize:10, color:G.muted, marginLeft:"auto" }}>{msg.time}</span>
//                       </div>
//                       <p style={{ fontSize:13, color:G.text, margin:0, lineHeight:1.5 }}>{msg.text}</p>
//                     </div>
//                   );
//                 })
//               }
//             </div>
//             {/* Input */}
//             <div style={{ padding:"14px 20px", borderTop:`1px solid ${G.greenBorder}` }}>
//               <p style={{ fontSize:11, color:G.muted, fontWeight:600, marginBottom:8 }}>Send official admin message</p>
//               <div style={{ display:"flex", gap:8 }}>
//                 <input value={adminMsg} onChange={e=>setAdminMsg(e.target.value)} placeholder="Type official message…"
//                   style={{ flex:1, fontSize:13, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"9px 14px", color:G.text, background:G.white, boxSizing:"border-box" }}
//                   onFocus={e=>e.target.style.borderColor=G.green}
//                   onBlur={e=>e.target.style.borderColor=G.greenBorder}
//                 />
//                 <button style={btnNavy} onClick={()=>setAdminMsg("")}>Send</button>
//               </div>
//             </div>
//           </div>

//           <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//             <SectionCard title="Chat Controls">
//               <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                 {[
//                   { label:chatFrozen?"Unfreeze Chat":"Freeze Chat", style:chatFrozen?btnOutline:btnWarn,   action:()=>setChatFrozen(!chatFrozen) },
//                   { label:"Export Chat History",                      style:btnOutline,                     action:()=>{}                         },
//                   { label:"Flag Conversation",                        style:btnDanger,                      action:()=>{}                         },
//                 ].map(a => (
//                   <button key={a.label} style={{ ...a.style, width:"100%", justifyContent:"flex-start", borderRadius:10 }} onClick={a.action}>{a.label}</button>
//                 ))}
//               </div>
//             </SectionCard>
//             <SectionCard title="Participants">
//               <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//                 {[
//                   { name:"Weblance Admin", role:"Platform",    color:G.red   },
//                   { name:p.client.name,   role:"Client",      color:G.green },
//                   { name:p.talent.name,   role:p.talent.type, color:G.blue  },
//                 ].map(pt => (
//                   <div key={pt.name} style={{ display:"flex", alignItems:"center", gap:10 }}>
//                     <div style={{ width:30, height:30, borderRadius:"50%", background:pt.color+"20", border:`1.5px solid ${pt.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:pt.color, flexShrink:0 }}>
//                       {pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}
//                     </div>
//                     <div>
//                       <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{pt.name}</p>
//                       <p style={{ fontSize:10, color:G.muted }}>{pt.role}</p>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </SectionCard>
//           </div>
//         </div>
//       )}

//       {/* ── FILES ── */}
//       {activeTab==="files" && (
//         <SectionCard title={`Files & Deliverables (${p.files.length})`}>
//           {p.files.length === 0
//             ? <p style={{ fontSize:13, color:G.muted, textAlign:"center", padding:"32px 0" }}>No files uploaded yet</p>
//             : (
//               <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//                 {p.files.map((f, i) => {
//                   const fileIcon = f.name.endsWith(".pdf")?"📄":f.name.endsWith(".fig")?"🎨":f.name.endsWith(".zip")?"🗜️":f.name.endsWith(".apk")?"📱":"📁";
//                   return (
//                     <div key={i} style={{ display:"flex", alignItems:"center", gap:14, padding:"12px 16px", background:G.bg, border:`1px solid ${G.greenBorder}`, borderRadius:12 }}>
//                       <div style={{ width:40, height:40, background:G.white, border:`1px solid ${G.border}`, borderRadius:10, display:"flex", alignItems:"center", justifyContent:"center", fontSize:18, flexShrink:0 }}>{fileIcon}</div>
//                       <div style={{ flex:1, minWidth:0 }}>
//                         <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</p>
//                         <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{f.size} · {f.uploadedBy} · {f.date}</p>
//                         <p style={{ fontSize:10, color:G.muted }}>{f.milestone} · v{f.version}</p>
//                       </div>
//                       <div style={{ display:"flex", gap:6, flexShrink:0 }}>
//                         <button style={btnOutline}>View</button>
//                         <button style={btnGreen}>Download</button>
//                         <button style={btnDanger}>Flag</button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>
//             )
//           }
//         </SectionCard>
//       )}

//       {/* ── TIMELINE ── */}
//       {activeTab==="timeline" && (
//         <SectionCard title="Project Timeline (Auto-Generated)">
//           <div style={{ position:"relative", paddingLeft:20 }}>
//             <div style={{ position:"absolute", left:14, top:0, bottom:0, width:2, background:G.greenBorder }} />
//             <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
//               {p.timeline.map((t, i) => {
//                 const cfg = TL_ICON[t.type] || TL_ICON.system;
//                 return (
//                   <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:14, paddingBottom:20 }}>
//                     <div style={{ width:28, height:28, borderRadius:"50%", background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, color:cfg.text, flexShrink:0, zIndex:1, marginLeft:-6, border:`2px solid ${G.white}` }}>{cfg.icon}</div>
//                     <div style={{ flex:1, paddingBottom:4 }}>
//                       <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
//                         <p style={{ fontSize:13, fontWeight:600, color:G.text, margin:0 }}>{t.event}</p>
//                         <span style={{ fontSize:11, color:G.muted }}>{t.time}</span>
//                       </div>
//                       <p style={{ fontSize:11, color:G.muted, marginTop:3 }}>by {t.actor}</p>
//                     </div>
//                   </div>
//                 );
//               })}
//             </div>
//           </div>
//         </SectionCard>
//       )}

//       {/* ── ADMIN ── */}
//       {activeTab==="admin" && (
//         <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:20 }}>
//           <SectionCard title="Admin Actions">
//             <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//               {[
//                 { label:"Freeze Project",                    style:btnWarn   },
//                 { label:"Force release next milestone",      style:btnGreen  },
//                 { label:"Extend deadline",                   style:btnOutline},
//                 { label:"Escalate to Dispute",               style:btnDanger },
//                 { label:"Send notice to both parties",       style:btnOutline},
//                 { label:"Lock scope",                        style:btnOutline},
//                 { label:"Cancel project & trigger refund",   style:btnDanger },
//               ].map(a => (
//                 <button key={a.label} style={{ ...a.style, width:"100%", justifyContent:"flex-start", borderRadius:10 }}>{a.label}</button>
//               ))}
//             </div>
//           </SectionCard>

//           <div style={{ display:"flex", flexDirection:"column", gap:20 }}>
//             <SectionCard title="Risk Indicators">
//               {[
//                 { label:"AI Health",      value:p.health,                                              warn:["At Risk","Delayed","Disputed"].includes(p.health) },
//                 { label:"Risk Level",     value:p.riskLevel,                                           warn:p.riskLevel!=="Low"                                 },
//                 { label:"Scope Changes",  value:`${p.scopeChanges}`,                                  warn:p.scopeChanges>2                                    },
//                 { label:"Client Silence", value:p.clientSilenceDays>0?`${p.clientSilenceDays} days`:"Active", warn:p.clientSilenceDays>3                       },
//                 { label:"Talent Silence", value:p.talentSilenceDays>0?`${p.talentSilenceDays} days`:"Active", warn:p.talentSilenceDays>2                       },
//               ].map(r => (
//                 <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${G.border}` }}>
//                   <span style={{ fontSize:12, color:G.muted }}>{r.label}</span>
//                   <span style={{ fontSize:12, fontWeight:700, color:r.warn?G.redText:G.greenDeep }}>{r.value}</span>
//                 </div>
//               ))}
//             </SectionCard>

//             <SectionCard title="Quick Links">
//               <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                 <button style={btnOutline} onClick={()=>navigate(`/admin/clients/${p.client.id}`)}>View Client — {p.client.name}</button>
//                 <button style={btnOutline} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}>View {p.talent.type} — {p.talent.name}</button>
//                 {p.status==="Disputed" && <button style={btnDanger} onClick={()=>navigate("/admin/disputes")}>View Dispute</button>}
//                 <button style={btnOutline} onClick={()=>navigate("/admin/payments")}>View Payments</button>
//               </div>
//             </SectionCard>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default AdminProjects;











import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

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

const HEALTH_STYLE = {
  "On Track":  { bg:G.greenBg,  text:G.greenDeep, dot:G.green     },
  "At Risk":   { bg:G.amberBg,  text:G.amberText, dot:G.amber     },
  "Delayed":   { bg:"#fff7ed",  text:"#c2410c",   dot:"#f97316"   },
  "Disputed":  { bg:G.redBg,    text:G.redText,   dot:G.red       },
  "Completed": { bg:G.navyBg,   text:G.navy,      dot:G.navyLight },
  "Pending":   { bg:G.blueBg,   text:G.blueText,  dot:G.blue      },
};
const MS_STYLE = {
  "Completed":   { bg:G.greenBg, text:G.greenDeep, dot:G.green  },
  "In Progress": { bg:G.blueBg,  text:G.blueText,  dot:G.blue   },
  "Pending":     { bg:G.bg,      text:G.muted,     dot:G.muted  },
  "Disputed":    { bg:G.redBg,   text:G.redText,   dot:G.red    },
};
const TL_ICON = {
  system:   { icon:"⊙", bg:G.bg,         text:G.muted        },
  payment:  { icon:"⊕", bg:G.greenBg,    text:G.greenDeep    },
  action:   { icon:"◎", bg:G.blueBg,     text:G.blueText     },
  delivery: { icon:"⊟", bg:G.purpleBg,   text:G.purpleText   },
  approval: { icon:"✓", bg:G.greenBg,    text:G.greenDeep    },
  alert:    { icon:"⚑", bg:G.redBg,      text:G.redText      },
  warning:  { icon:"⚠", bg:G.amberBg,    text:G.amberText    },
};
const MSG_STYLE = {
  red:    { border:G.red,   bg:G.redBg,   badge:{bg:G.redBg,   text:G.redText   } },
  blue:   { border:G.blue,  bg:G.blueBg,  badge:{bg:G.blueBg,  text:G.blueText  } },
  yellow: { border:G.amber, bg:G.amberBg, badge:{bg:G.amberBg, text:G.amberText } },
  green:  { border:G.green, bg:G.greenBg, badge:{bg:G.greenBg, text:G.greenDeep } },
};

function Avatar({ name, size="sm" }) {
  const palette = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E","#0ea5e9","#ec4899"];
  const color   = palette[name.charCodeAt(0) % palette.length];
  const initials = name.split(" ").map(w=>w[0]).join("").slice(0,2).toUpperCase();
  const sz = size==="lg"?44:size==="md"?36:26;
  const fs = size==="lg"?13:size==="md"?11:9;
  return (
    <div style={{ width:sz, height:sz, borderRadius:"50%", background:color+"20", border:`1.5px solid ${color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:fs, fontWeight:700, color, flexShrink:0 }}>{initials}</div>
  );
}
function HealthBadge({ health }) {
  const s = HEALTH_STYLE[health] || HEALTH_STYLE["Pending"];
  return <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:s.bg, color:s.text, padding:"2px 8px", borderRadius:99, whiteSpace:"nowrap" }}><span style={{ width:4, height:4, borderRadius:"50%", background:s.dot }} />{health}</span>;
}
function StatusBadge({ status }) {
  const map = {
    "In Progress":{ bg:G.blueBg,  text:G.blueText,  dot:G.blue  },
    "Completed":  { bg:G.greenBg, text:G.greenDeep, dot:G.green },
    "Disputed":   { bg:G.redBg,   text:G.redText,   dot:G.red   },
    "Pending":    { bg:G.bg,      text:G.muted,     dot:G.muted },
  };
  const s = map[status]||{ bg:G.bg, text:G.muted, dot:G.muted };
  return <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:s.bg, color:s.text, padding:"2px 8px", borderRadius:99, whiteSpace:"nowrap" }}><span style={{ width:4, height:4, borderRadius:"50%", background:s.dot }} />{status}</span>;
}
function RiskPill({ level }) {
  const c=level==="High"?G.redText:level==="Medium"?G.amberText:G.greenDeep;
  const bg=level==="High"?G.redBg:level==="Medium"?G.amberBg:G.greenBg;
  const border=level==="High"?G.redBorder:level==="Medium"?G.amberBorder:G.greenBorder;
  return <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:10, fontWeight:700, background:bg, color:c, border:`1px solid ${border}`, padding:"2px 8px", borderRadius:99, whiteSpace:"nowrap" }}><span style={{ width:4, height:4, borderRadius:"50%", background:c }} />{level}</span>;
}
function StatCard({ label, value, sub, color="gray" }) {
  const map={ gray:{bg:G.bg,border:G.border,val:G.text,lbl:G.muted}, green:{bg:G.greenBg,border:G.greenBorder,val:G.greenDeep,lbl:G.greenDeep}, orange:{bg:G.amberBg,border:G.amberBorder,val:"#b45309",lbl:"#b45309"}, red:{bg:G.redBg,border:G.redBorder,val:G.redText,lbl:G.redText}, blue:{bg:G.blueBg,border:G.blueBorder,val:G.blueText,lbl:G.blueText} };
  const c=map[color]||map.gray;
  return (
    <div style={{ background:c.bg, border:`1px solid ${c.border}`, borderRadius:14, padding:"12px 14px", flex:1, minWidth:0 }}>
      <p style={{ fontSize:9, fontWeight:700, color:c.lbl, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{label}</p>
      <p style={{ fontSize:20, fontWeight:800, color:c.val, margin:0, lineHeight:1 }}>{value}</p>
      {sub && <p style={{ fontSize:10, color:G.muted, marginTop:3 }}>{sub}</p>}
    </div>
  );
}
function SectionCard({ title, children }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
      <div style={{ padding:"11px 16px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg }}>
        <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{title}</p>
      </div>
      <div style={{ padding:"14px 16px" }}>{children}</div>
    </div>
  );
}
function InfoRow({ label, value }) {
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", padding:"8px 0", borderBottom:`1px solid ${G.border}`, gap:8 }}>
      <span style={{ fontSize:11, color:G.muted, fontWeight:500, flexShrink:0 }}>{label}</span>
      <span style={{ fontSize:11, fontWeight:600, color:G.text, textAlign:"right", wordBreak:"break-word", maxWidth:"60%" }}>{value}</span>
    </div>
  );
}

const btnNavy   = { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.gradNavy,  color:G.white,      border:"none",                        borderRadius:100, padding:"7px 14px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)", whiteSpace:"nowrap" };
const btnGreen  = { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.gradGreen, color:G.white,      border:"none",                        borderRadius:100, padding:"7px 14px", cursor:"pointer", whiteSpace:"nowrap" };
const btnOutline= { display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.greenBg,   color:G.greenDeep,  border:`1px solid ${G.greenBorder}`,  borderRadius:100, padding:"7px 14px", cursor:"pointer", whiteSpace:"nowrap" };
const btnWarn   = { ...btnOutline, background:G.amberBg, color:G.amberText, border:`1px solid ${G.amberBorder}` };
const btnDanger = { ...btnOutline, background:G.redBg,   color:G.redText,   border:`1px solid ${G.redBorder}`  };

// ─── Mock Data (shortened ref, same structure as original) ───────────────────
const mockProjects = [
  { id:"PRJ-001", title:"Food Delivery App",          client:{name:"ByteEats Co.",     id:"CL-004",email:"projects@byteeats.in",type:"Startup"},   talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"},    status:"In Progress", health:"On Track", budget:480000, escrow:240000, commission:28800, milestones:[{name:"UI Design",amount:60000,status:"Completed",dueDate:"Feb 1, 2026",deliveredDate:"Jan 30, 2026"},{name:"Backend API",amount:120000,status:"In Progress",dueDate:"Apr 15, 2026",deliveredDate:null},{name:"Mobile App",amount:180000,status:"Pending",dueDate:"May 10, 2026",deliveredDate:null},{name:"Testing & Launch",amount:120000,status:"Pending",dueDate:"Jun 1, 2026",deliveredDate:null}], deadline:"Jun 1, 2026",   startDate:"Jan 10, 2026", riskLevel:"Low",    aiFlag:false, progress:55,  projectType:"Fixed Price", category:"Mobile App",        scopeChanges:1, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project is progressing normally. Backend API milestone is on schedule. No risk signals detected.",                                                                        timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Jan 10, 2026",type:"system"},{event:"Escrow funded — ₹2,40,000",actor:"System",time:"Jan 10, 2026",type:"payment"},{event:"Milestone 1 delivered",actor:"TechNova Solutions",time:"Jan 30, 2026",type:"delivery"},{event:"Milestone 1 approved",actor:"ByteEats Co.",time:"Feb 2, 2026",type:"approval"},{event:"Milestone 1 payment released",actor:"System",time:"Feb 2, 2026",type:"payment"}], files:[{name:"UI_Design_v2.fig",size:"8.2 MB",uploadedBy:"TechNova Solutions",date:"Jan 30, 2026",milestone:"Milestone 1",version:2}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"Please ensure all deliverables are uploaded before the deadline.",time:"04:30 PM",type:"Normal"}] },
  { id:"PRJ-002", title:"Patient Appointment App",    client:{name:"HealthFirst Clinic",id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"},  talent:{name:"Arjun Dev",         id:"FL-002",type:"Freelancer",email:"arjun@devcraft.io"}, status:"In Progress", health:"At Risk", budget:320000, escrow:160000, commission:19200, milestones:[{name:"Requirements & Design",amount:48000,status:"Completed",dueDate:"Feb 20, 2026",deliveredDate:"Feb 19, 2026"},{name:"Core Features",amount:144000,status:"In Progress",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Testing & Launch",amount:128000,status:"Pending",dueDate:"Apr 25, 2026",deliveredDate:null}], deadline:"Apr 25, 2026", startDate:"Feb 3, 2026",  riskLevel:"Medium", aiFlag:true,  progress:35,  projectType:"Fixed Price", category:"Mobile App",        scopeChanges:3, clientSilenceDays:8, talentSilenceDays:0, aiHealthSummary:"Client has been unresponsive for 8 days. Scope changed 3 times. Moderate risk of deadline breach.",                                                                               timeline:[{event:"Project created",actor:"HealthFirst Clinic",time:"Feb 3, 2026",type:"system"},{event:"Scope change request #1",actor:"HealthFirst Clinic",time:"Mar 1, 2026",type:"warning"},{event:"AI flagged: client silent 8 days",actor:"AI System",time:"Mar 10, 2026",type:"alert"}], files:[], messages:[{sender:"Arjun Dev",role:"talent",color:"blue",text:"Milestone 2 is 60% done. Waiting for client feedback.",time:"Mar 8, 2026",type:"Update"}] },
  { id:"PRJ-003", title:"E-Commerce Platform Revamp", client:{name:"ShopEasy Retail",  id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"Rahul Sharma",       id:"FL-001",type:"Freelancer",email:"rahul@gmail.com"},  status:"In Progress", health:"Delayed", budget:185000, escrow:92500,  commission:11100, milestones:[{name:"Frontend Redesign",amount:55500,status:"Completed",dueDate:"Feb 15, 2026",deliveredDate:"Feb 28, 2026"},{name:"Backend Integration",amount:74000,status:"In Progress",dueDate:"Mar 25, 2026",deliveredDate:null},{name:"QA & Deployment",amount:55500,status:"Pending",dueDate:"Apr 10, 2026",deliveredDate:null}], deadline:"Apr 10, 2026", startDate:"Jan 20, 2026", riskLevel:"High",   aiFlag:true,  progress:28,  projectType:"Fixed Price", category:"Web Development",   scopeChanges:5, clientSilenceDays:5, talentSilenceDays:2, aiHealthSummary:"Milestone 1 delivered 13 days late. Scope changed 5 times. High risk of dispute.",                                                                                              timeline:[{event:"Project created",actor:"ShopEasy Retail",time:"Jan 20, 2026",type:"system"},{event:"Milestone 1 OVERDUE",actor:"AI System",time:"Feb 15, 2026",type:"alert"},{event:"Scope change #3",actor:"ShopEasy Retail",time:"Mar 2, 2026",type:"warning"}], files:[], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"⚠ High risk project flagged. Scope changes must be formally approved.",time:"Mar 10, 2026",type:"Warning"}] },
  { id:"PRJ-004", title:"HR Automation Dashboard",    client:{name:"ByteEats Co.",     id:"CL-004",email:"projects@byteeats.in",type:"Startup"},   talent:{name:"BuildRight Agency", id:"AG-002",type:"Agency",email:"ops@buildright.co"},  status:"Completed",   health:"Completed",budget:650000, escrow:0,      commission:39000, milestones:[{name:"Discovery & Design",amount:97500,status:"Completed",dueDate:"Oct 20, 2025",deliveredDate:"Oct 18, 2025"},{name:"Backend Development",amount:195000,status:"Completed",dueDate:"Nov 30, 2025",deliveredDate:"Nov 28, 2025"},{name:"Frontend Development",amount:162500,status:"Completed",dueDate:"Jan 10, 2026",deliveredDate:"Jan 8, 2026"},{name:"QA & Testing",amount:97500,status:"Completed",dueDate:"Feb 10, 2026",deliveredDate:"Feb 8, 2026"},{name:"Deployment & Handover",amount:97500,status:"Completed",dueDate:"Feb 28, 2026",deliveredDate:"Feb 25, 2026"}], deadline:"Feb 28, 2026", startDate:"Oct 1, 2025",  riskLevel:"Low",    aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software",scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed successfully. All milestones on time. Client satisfaction: 4.8/5.",                                                                                                 timeline:[{event:"Project created",actor:"ByteEats Co.",time:"Oct 1, 2025",type:"system"},{event:"All milestones completed",actor:"BuildRight Agency",time:"Feb 25, 2026",type:"delivery"},{event:"Project closed",actor:"System",time:"Feb 28, 2026",type:"system"}], files:[{name:"Final_Delivery_Package.zip",size:"124 MB",uploadedBy:"BuildRight Agency",date:"Feb 25, 2026",milestone:"Milestone 5",version:1}], messages:[] },
  { id:"PRJ-005", title:"Brand Identity Design",      client:{name:"Meera Joshi",      id:"CL-003",email:"meera@startup.co",type:"Individual"},    talent:{name:"Neha Gupta",        id:"FL-005",type:"Freelancer",email:"neha@designcraft.in"},status:"Pending",     health:"Pending",  budget:45000,  escrow:0,      commission:2700,  milestones:[{name:"Brand Discovery",amount:13500,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null},{name:"Final Brand Kit",amount:31500,status:"Pending",dueDate:"Apr 20, 2026",deliveredDate:null}], deadline:"Apr 20, 2026", startDate:"Mar 14, 2026", riskLevel:"Low",    aiFlag:false, progress:0,   projectType:"Fixed Price", category:"Design",            scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Project just started. Waiting for client to fund escrow before work begins.",                                                                                                   timeline:[{event:"Project created",actor:"Meera Joshi",time:"Mar 14, 2026",type:"system"},{event:"Waiting for escrow funding",actor:"System",time:"Mar 14, 2026",type:"alert"}], files:[], messages:[] },
  { id:"PRJ-006", title:"Mobile Banking App",         client:{name:"Vikram Singh",     id:"CL-002",email:"vikram@shopeasy.com",type:"Enterprise"}, talent:{name:"TechNova Solutions",id:"AG-001",type:"Agency",email:"admin@technova.io"},    status:"Disputed",    health:"Disputed", budget:280000, escrow:140000, commission:16800, milestones:[{name:"UX Design",amount:42000,status:"Completed",dueDate:"Dec 10, 2025",deliveredDate:"Dec 9, 2025"},{name:"Core Banking API",amount:84000,status:"Completed",dueDate:"Jan 20, 2026",deliveredDate:"Jan 22, 2026"},{name:"Mobile Frontend",amount:84000,status:"Disputed",dueDate:"Mar 10, 2026",deliveredDate:null},{name:"Security & Launch",amount:70000,status:"Pending",dueDate:"Apr 5, 2026",deliveredDate:null}], deadline:"Apr 5, 2026",   startDate:"Nov 15, 2025", riskLevel:"High",   aiFlag:true,  progress:50,  projectType:"Fixed Price", category:"Mobile App",        scopeChanges:2, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Active dispute on Milestone 3. Escrow ₹1,40,000 frozen. AI verdict: Mixed fault.",                                                                                                timeline:[{event:"Project created",actor:"Vikram Singh",time:"Nov 15, 2025",type:"system"},{event:"Client raised dispute DSP-002",actor:"Vikram Singh",time:"Mar 8, 2026",type:"alert"},{event:"Escrow frozen",actor:"System",time:"Mar 8, 2026",type:"payment"}], files:[{name:"Milestone3_Partial_Build.apk",size:"18.3 MB",uploadedBy:"TechNova Solutions",date:"Mar 8, 2026",milestone:"Milestone 3",version:1}], messages:[{sender:"Weblance Admin",role:"admin",color:"red",text:"🔒 Chat frozen pending dispute resolution.",time:"Mar 8, 2026",type:"Warning"}] },
  { id:"PRJ-007", title:"Logistics Tracking System",  client:{name:"Sneha Kapoor",     id:"CL-001",email:"sneha@healthfirst.in",type:"Startup"},   talent:{name:"BuildRight Agency", id:"AG-002",type:"Agency",email:"ops@buildright.co"},  status:"Completed",   health:"Completed",budget:390000, escrow:0,      commission:23400, milestones:[{name:"System Architecture",amount:58500,status:"Completed",dueDate:"Sep 20, 2025",deliveredDate:"Sep 19, 2025"},{name:"Backend & APIs",amount:136500,status:"Completed",dueDate:"Oct 31, 2025",deliveredDate:"Oct 29, 2025"},{name:"Dashboard UI",amount:117000,status:"Completed",dueDate:"Dec 15, 2025",deliveredDate:"Dec 12, 2025"},{name:"Testing & Launch",amount:78000,status:"Completed",dueDate:"Jan 30, 2026",deliveredDate:"Jan 28, 2026"}], deadline:"Jan 30, 2026", startDate:"Sep 5, 2025",  riskLevel:"Low",    aiFlag:false, progress:100, projectType:"Fixed Price", category:"Enterprise Software",scopeChanges:0, clientSilenceDays:0, talentSilenceDays:0, aiHealthSummary:"Completed. All milestones on time. Client rating: 4.9/5.",                                                                                                                    timeline:[{event:"Project created",actor:"Sneha Kapoor",time:"Sep 5, 2025",type:"system"},{event:"Project completed",actor:"System",time:"Jan 30, 2026",type:"system"}], files:[], messages:[] },
];

/* ═══════════════════════ LIST PAGE ═══════════════════════════ */
export function AdminProjects() {
  const navigate = useNavigate();
  const [search,       setSearch]       = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [riskFilter,   setRiskFilter]   = useState("");
  const [activeTab,    setActiveTab]    = useState("all");
  const [hovRow,       setHovRow]       = useState(null);

  const totalEscrow = mockProjects.reduce((s,p)=>s+p.escrow,0);
  const atRisk      = mockProjects.filter(p=>["At Risk","Delayed","Disputed"].includes(p.health)).length;

  const tabFiltered = mockProjects.filter(p => {
    if (activeTab==="active")    return p.status==="In Progress";
    if (activeTab==="at-risk")   return ["At Risk","Delayed","Disputed"].includes(p.health);
    if (activeTab==="completed") return p.status==="Completed";
    return true;
  });
  const filtered = tabFiltered.filter(p => {
    const q = search.toLowerCase();
    return (p.title.toLowerCase().includes(q)||p.client.name.toLowerCase().includes(q)||p.talent.name.toLowerCase().includes(q)||p.id.toLowerCase().includes(q)) &&
      (!statusFilter||p.status===statusFilter) && (!typeFilter||p.talent.type===typeFilter) && (!riskFilter||p.riskLevel===riskFilter);
  });

  const TABS = [
    { key:"all",       label:`All (${mockProjects.length})` },
    { key:"active",    label:`Active (${mockProjects.filter(p=>p.status==="In Progress").length})` },
    { key:"at-risk",   label:`At Risk (${atRisk})` },
    { key:"completed", label:`Done (${mockProjects.filter(p=>p.status==="Completed").length})` },
  ];

  // Mobile project card
  const MobileCard = ({ p }) => (
    <div onClick={()=>navigate(`/admin/projects/${p.id}`)}
      style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:14, cursor:"pointer", boxShadow:"0 2px 8px rgba(110,192,48,0.05)" }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10 }}>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap", marginBottom:3 }}>
            <span style={{ fontSize:12, fontWeight:700, color:G.text, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{p.title}</span>
            {p.aiFlag && <span style={{ fontSize:8, fontWeight:700, background:G.redBg, color:G.red, border:`1px solid ${G.redBorder}`, padding:"1px 5px", borderRadius:99, flexShrink:0 }}>AI⚑</span>}
          </div>
          <p style={{ fontSize:10, color:G.muted, margin:0 }}>{p.id} · {p.category}</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:4, flexShrink:0 }}>
          <HealthBadge health={p.health} />
          <StatusBadge status={p.status} />
        </div>
      </div>
      {/* Progress bar */}
      <div style={{ marginBottom:10 }}>
        <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
          <span style={{ fontSize:9, color:G.muted, textTransform:"uppercase" }}>Progress</span>
          <span style={{ fontSize:10, fontWeight:700, color:G.text }}>{p.progress}%</span>
        </div>
        <div style={{ height:5, background:G.border, borderRadius:99, overflow:"hidden" }}>
          <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background:p.progress===100?G.green:p.riskLevel==="High"?"#f97316":G.blue }} />
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8, paddingTop:10, borderTop:`1px solid ${G.greenBorder}` }}>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 2px", textTransform:"uppercase" }}>Client</p>
          <span style={{ fontSize:11, fontWeight:600, color:G.text }}>{p.client.name.split(" ")[0]}</span>
        </div>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 2px", textTransform:"uppercase" }}>Budget</p>
          <span style={{ fontSize:11, fontWeight:700, color:G.text }}>₹{(p.budget/1000).toFixed(0)}k</span>
        </div>
        <div>
          <p style={{ fontSize:9, color:G.muted, margin:"0 0 2px", textTransform:"uppercase" }}>Risk</p>
          <RiskPill level={p.riskLevel} />
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ padding:"12px 12px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        input,select { outline:none; font-family:'Poppins',sans-serif; }

        @media (min-width:640px)  { .prj-page { padding:20px 20px 64px !important; } }
        @media (min-width:1024px) { .prj-page { padding:28px 28px 64px !important; } }

        .prj-table-wrap { display:none; overflow-x:auto; }
        .prj-cards-wrap { display:flex; flex-direction:column; gap:10px; }
        @media (min-width:900px) {
          .prj-table-wrap { display:block; }
          .prj-cards-wrap { display:none; }
        }

        .prj-tabs { display:flex; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .prj-tabs::-webkit-scrollbar { display:none; }
      `}</style>

      {/* Header */}
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
        <div>
          <h1 style={{ fontSize:18, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.3px" }}>Projects</h1>
          <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Monitor all active, completed &amp; disputed projects</p>
        </div>
        <button style={btnNavy}>⬇ Export</button>
      </div>

      {/* Stats: 2-col mobile, 5-col desktop */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:10, marginBottom:14 }}
        className="sm:grid-cols-3 lg:grid-cols-5">
        <StatCard label="Total"        value={mockProjects.length}                                       color="gray"   />
        <StatCard label="In Progress"  value={mockProjects.filter(p=>p.status==="In Progress").length}   color="blue"   />
        <StatCard label="Completed"    value={mockProjects.filter(p=>p.status==="Completed").length}     color="green"  />
        <StatCard label="At Risk"      value={atRisk}                                                    color="orange" sub="Needs attention" />
        <StatCard label="Escrow"       value={`₹${(totalEscrow/100000).toFixed(1)}L`}                   color="blue"   />
      </div>

      {/* Tabs */}
      <div className="prj-tabs" style={{ borderBottom:`1px solid ${G.greenBorder}`, marginBottom:14 }}>
        {TABS.map(t => {
          const active = activeTab === t.key;
          return (
            <button key={t.key} onClick={()=>setActiveTab(t.key)} style={{ padding:"9px 12px", fontSize:12, fontWeight:active?700:500, color:active?G.navy:G.muted, background:"none", border:"none", borderBottom:active?`2px solid ${G.green}`:"2px solid transparent", cursor:"pointer", whiteSpace:"nowrap", fontFamily:FONT, flexShrink:0 }}>{t.label}</button>
          );
        })}
      </div>

      {/* Table card */}
      <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
        {/* Filter bar */}
        <div style={{ padding:"12px 14px", background:G.greenBg, borderBottom:`1px solid ${G.greenBorder}`, display:"flex", flexWrap:"wrap", gap:8, alignItems:"center", justifyContent:"space-between" }}>
          <div style={{ display:"flex", gap:8, flexWrap:"wrap", alignItems:"center", flex:1 }}>
            <div style={{ position:"relative", flex:"1 1 160px", maxWidth:260 }}>
              <span style={{ position:"absolute", left:10, top:"50%", transform:"translateY(-50%)", fontSize:12, color:G.muted }}>🔍</span>
              <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search project, client..."
                style={{ width:"100%", fontSize:11, fontWeight:500, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 10px 7px 28px", background:G.white, color:G.text, boxSizing:"border-box" }} />
            </div>
            {[
              { value:statusFilter, setter:setStatusFilter, label:"Status", opts:["In Progress","Completed","Disputed","Pending"] },
              { value:typeFilter,   setter:setTypeFilter,   label:"Talent", opts:["Freelancer","Agency"]                         },
              { value:riskFilter,   setter:setRiskFilter,   label:"Risk",   opts:["Low","Medium","High"]                         },
            ].map(({ value, setter, label, opts }) => (
              <select key={label} value={value} onChange={e=>setter(e.target.value)}
                style={{ fontSize:11, fontWeight:600, border:`1.5px solid ${value?G.green:G.greenBorder}`, borderRadius:100, padding:"7px 10px", background:value?G.greenBg:G.white, color:value?G.greenDeep:G.sub, cursor:"pointer" }}>
                <option value="">{label}</option>
                {opts.map(o=><option key={o} value={o}>{o}</option>)}
              </select>
            ))}
          </div>
          <span style={{ fontSize:10, color:G.muted, fontWeight:600 }}>{filtered.length} results</span>
        </div>

        {/* Desktop Table */}
        <div className="prj-table-wrap">
          <table style={{ width:"100%", borderCollapse:"collapse", minWidth:1000 }}>
            <thead>
              <tr style={{ background:G.bg, borderBottom:`1px solid ${G.greenBorder}` }}>
                {["Project","Client","Talent","Health","Progress","MS","Budget","Escrow","Deadline","Risk",""].map(h => (
                  <th key={h} style={{ padding:"9px 11px", fontSize:9, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"left", whiteSpace:"nowrap" }}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(p => (
                <tr key={p.id}
                  style={{ borderBottom:`1px solid ${G.border}`, background:hovRow===p.id?G.greenBg:G.white, cursor:"pointer", transition:"background 0.1s" }}
                  onMouseEnter={()=>setHovRow(p.id)} onMouseLeave={()=>setHovRow(null)}
                  onClick={()=>navigate(`/admin/projects/${p.id}`)}>
                  <td style={{ padding:"10px 11px" }}>
                    <div style={{ display:"flex", alignItems:"flex-start", gap:6 }}>
                      <div>
                        <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{p.title}</p>
                        <p style={{ fontSize:9, color:G.muted, marginTop:1 }}>{p.id} · {p.category}</p>
                      </div>
                      {p.aiFlag && <span style={{ fontSize:8, fontWeight:700, background:G.redBg, color:G.red, border:`1px solid ${G.redBorder}`, padding:"1px 4px", borderRadius:99, flexShrink:0 }}>AI⚑</span>}
                    </div>
                  </td>
                  <td style={{ padding:"10px 11px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                      <Avatar name={p.client.name} size="sm" />
                      <div><p style={{ fontSize:11, fontWeight:600, color:G.text, margin:0 }}>{p.client.name}</p><p style={{ fontSize:9, color:G.muted }}>{p.client.type}</p></div>
                    </div>
                  </td>
                  <td style={{ padding:"10px 11px" }}>
                    <p style={{ fontSize:11, fontWeight:600, color:G.text, margin:0 }}>{p.talent.name}</p>
                    <p style={{ fontSize:9, color:G.muted }}>{p.talent.type}</p>
                  </td>
                  <td style={{ padding:"10px 11px" }}><HealthBadge health={p.health} /></td>
                  <td style={{ padding:"10px 11px" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:6, minWidth:72 }}>
                      <div style={{ flex:1, height:5, background:G.border, borderRadius:99, overflow:"hidden" }}>
                        <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background:p.progress===100?G.green:p.riskLevel==="High"?"#f97316":G.blue }} />
                      </div>
                      <span style={{ fontSize:10, fontWeight:700, color:G.sub }}>{p.progress}%</span>
                    </div>
                  </td>
                  <td style={{ padding:"10px 11px", textAlign:"center" }}>
                    <span style={{ fontSize:11, fontWeight:700, color:G.text }}>{p.milestones.filter(m=>m.status==="Completed").length}/{p.milestones.length}</span>
                  </td>
                  <td style={{ padding:"10px 11px" }}><span style={{ fontSize:12, fontWeight:700, color:G.text }}>₹{(p.budget/1000).toFixed(0)}k</span></td>
                  <td style={{ padding:"10px 11px" }}>{p.escrow>0?<span style={{ fontSize:12, fontWeight:700, color:"#b45309" }}>₹{(p.escrow/1000).toFixed(0)}k</span>:<span style={{ fontSize:11, color:G.muted }}>—</span>}</td>
                  <td style={{ padding:"10px 11px", fontSize:11, color:G.muted, whiteSpace:"nowrap" }}>{p.deadline}</td>
                  <td style={{ padding:"10px 11px" }}><RiskPill level={p.riskLevel} /></td>
                  <td style={{ padding:"10px 11px" }} onClick={e=>e.stopPropagation()}>
                    <div style={{ opacity:hovRow===p.id?1:0, transition:"opacity 0.15s" }}>
                      <button onClick={e=>{e.stopPropagation();navigate(`/admin/projects/${p.id}`);}}
                        style={{ fontSize:10, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"5px 12px", cursor:"pointer" }}>View</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Cards */}
        <div className="prj-cards-wrap" style={{ padding:12 }}>
          {filtered.map(p => <MobileCard key={p.id} p={p} />)}
        </div>

        {filtered.length===0 && (
          <div style={{ display:"flex", flexDirection:"column", alignItems:"center", padding:"40px 20px", textAlign:"center" }}>
            <div style={{ width:48, height:48, borderRadius:"50%", background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:20, marginBottom:10 }}>⊟</div>
            <p style={{ fontSize:13, fontWeight:700, color:G.text }}>No projects match your filters</p>
          </div>
        )}

        <div style={{ padding:"10px 14px", background:G.greenBg, borderTop:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <span style={{ fontSize:10, color:G.muted, fontWeight:600 }}>Showing {filtered.length} of {mockProjects.length} projects</span>
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

/* ═══════════════════════ DETAIL PAGE ═══════════════════════════ */
export function AdminProjectDetail() {
  const { id }       = useParams();
  const navigate     = useNavigate();
  const [activeTab,  setActiveTab]  = useState("overview");
  const [chatFrozen, setChatFrozen] = useState(false);
  const [adminMsg,   setAdminMsg]   = useState("");

  const p = mockProjects.find(x=>x.id===id);
  if (!p) return (
    <div style={{ padding:48, textAlign:"center", fontFamily:FONT }}>
      <p style={{ color:G.muted, marginBottom:16 }}>Project not found</p>
      <button onClick={()=>navigate("/admin/projects")} style={btnOutline}>← Back to Projects</button>
    </div>
  );

  const completedMilestones = p.milestones.filter(m=>m.status==="Completed").length;
  const tabs = ["overview","milestones","projectstream","files","timeline","admin"];
  const aiBanner = p.riskLevel==="High" ? { bg:G.redBg,   border:G.redBorder,   icon:G.red,     title:G.redText,   body:"#b91c1c" }
    : p.riskLevel==="Medium"            ? { bg:G.amberBg, border:G.amberBorder, icon:G.amber,   title:G.amberText, body:"#92400e" }
    : p.status==="Completed"            ? { bg:G.greenBg, border:G.greenBorder, icon:G.green,   title:G.greenDeep, body:"#166534" }
    : { bg:G.blueBg, border:G.blueBorder, icon:G.blue, title:G.blueText, body:"#1e40af" };

  return (
    <div style={{ padding:"12px 12px 64px", fontFamily:FONT, background:G.bg, minHeight:"100%" }}>
      <style>{`
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }
        input,select,textarea { outline:none; font-family:'Poppins',sans-serif; }
        @media (min-width:640px)  { .pd-page { padding:20px 20px 64px !important; } }
        @media (min-width:1024px) { .pd-page { padding:28px 28px 64px !important; } }

        .pd-tabs { display:flex; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .pd-tabs::-webkit-scrollbar { display:none; }

        .pd-overview-grid { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:1024px) { .pd-overview-grid { display:grid; grid-template-columns:1fr 300px; gap:20px; } }

        .pd-2col { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:640px) { .pd-2col { display:grid; grid-template-columns:1fr 1fr; gap:16px; } }

        .pd-stream-grid { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:1024px) { .pd-stream-grid { display:grid; grid-template-columns:1fr 260px; gap:20px; } }

        .pd-admin-grid { display:flex; flex-direction:column; gap:16px; }
        @media (min-width:640px) { .pd-admin-grid { display:grid; grid-template-columns:1fr 1fr; gap:20px; } }
      `}</style>

      <button onClick={()=>navigate("/admin/projects")}
        style={{ display:"inline-flex", alignItems:"center", gap:5, fontSize:12, fontWeight:600, color:G.sub, background:"none", border:"none", cursor:"pointer", marginBottom:14, padding:0 }}>
        ← All Projects
      </button>

      {/* Profile header */}
      <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"14px 16px", marginBottom:14, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap", marginBottom:5 }}>
              <h1 style={{ fontSize:16, fontWeight:800, color:G.text, margin:0 }}>{p.title}</h1>
              <HealthBadge health={p.health} />
              <StatusBadge status={p.status} />
              {p.aiFlag && <span style={{ fontSize:9, fontWeight:700, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, padding:"2px 7px", borderRadius:99 }}>⚑ AI</span>}
            </div>
            <p style={{ fontSize:11, color:G.muted, margin:0 }}>{p.id} · {p.category} · {p.projectType}</p>
          </div>
          <div style={{ display:"flex", alignItems:"center", gap:6, flexWrap:"wrap" }}>
            {p.status==="In Progress" && <button style={btnWarn}>Freeze</button>}
            {p.status==="In Progress" && <button style={btnDanger}>Escalate</button>}
            <button style={btnOutline}>Notice</button>
          </div>
        </div>
      </div>

      {/* Quick stats */}
      <div style={{ display:"grid", gridTemplateColumns:"repeat(2, 1fr)", gap:10, marginBottom:14 }}
        className="sm:grid-cols-3 lg:grid-cols-5">
        {[
          { label:"Progress",   value:`${p.progress}%`,                                                       color:p.progress===100?"green":"blue"   },
          { label:"Milestones", value:`${completedMilestones}/${p.milestones.length}`,                         color:"gray"                             },
          { label:"Budget",     value:`₹${(p.budget/1000).toFixed(0)}k`,                                       color:"gray"                             },
          { label:"Escrow",     value:p.escrow>0?`₹${(p.escrow/1000).toFixed(0)}k`:"Released",               color:p.escrow>0?"orange":"green"        },
          { label:"Risk",       value:p.riskLevel,                                                             color:p.riskLevel==="High"?"red":p.riskLevel==="Medium"?"orange":"green" },
        ].map(s => <StatCard key={s.label} {...s} />)}
      </div>

      {/* AI Banner */}
      <div style={{ padding:"12px 14px", borderRadius:14, border:`1px solid ${aiBanner.border}`, background:aiBanner.bg, marginBottom:14, display:"flex", alignItems:"flex-start", gap:10 }}>
        <span style={{ fontSize:16, color:aiBanner.icon, flexShrink:0, marginTop:2 }}>◎</span>
        <div>
          <p style={{ fontSize:12, fontWeight:700, color:aiBanner.title, marginBottom:4 }}>AI Health Summary</p>
          <p style={{ fontSize:11, color:aiBanner.body, lineHeight:1.6, margin:0 }}>{p.aiHealthSummary}</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="pd-tabs" style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:"12px 12px 0 0", overflow:"hidden", marginBottom:16 }}>
        {tabs.map(tab => {
          const active = activeTab === tab;
          return (
            <button key={tab} onClick={()=>setActiveTab(tab)} style={{ padding:"10px 12px", fontSize:11, fontWeight:active?700:500, color:active?G.navy:G.muted, background:active?G.greenBg:"none", border:"none", borderBottom:active?`2px solid ${G.green}`:"2px solid transparent", cursor:"pointer", textTransform:"capitalize", fontFamily:FONT, whiteSpace:"nowrap", flexShrink:0 }}>
              {tab==="projectstream"?"Stream":tab}
            </button>
          );
        })}
      </div>

      {/* ── OVERVIEW ── */}
      {activeTab==="overview" && (
        <div className="pd-overview-grid">
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <SectionCard title="Project Details">
              <InfoRow label="Project ID"    value={p.id}         />
              <InfoRow label="Category"      value={p.category}   />
              <InfoRow label="Type"          value={p.projectType}/>
              <InfoRow label="Start Date"    value={p.startDate}  />
              <InfoRow label="Deadline"      value={p.deadline}   />
              <InfoRow label="Scope Changes" value={p.scopeChanges>0?<span style={{ color:p.scopeChanges>2?G.redText:G.amberText, fontWeight:700 }}>{p.scopeChanges} changes</span>:<span style={{ color:G.greenDeep, fontWeight:700 }}>None</span>} />
            </SectionCard>
            <div className="pd-2col">
              {/* Client */}
              <SectionCard title="Client">
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <Avatar name={p.client.name} size="md" />
                  <div><p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{p.client.name}</p><p style={{ fontSize:10, color:G.muted }}>{p.client.type}</p></div>
                </div>
                <InfoRow label="Email"    value={p.client.email} />
                <InfoRow label="Silence"  value={p.clientSilenceDays>0?<span style={{ color:p.clientSilenceDays>5?G.redText:G.amberText, fontWeight:700 }}>{p.clientSilenceDays}d</span>:<span style={{ color:G.greenDeep, fontWeight:700 }}>Active</span>} />
                <div style={{ marginTop:12 }}><button style={btnOutline} onClick={()=>navigate(`/admin/clients/${p.client.id}`)}>View Client</button></div>
              </SectionCard>
              {/* Talent */}
              <SectionCard title={p.talent.type}>
                <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                  <Avatar name={p.talent.name} size="md" />
                  <div><p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{p.talent.name}</p><p style={{ fontSize:10, color:G.muted }}>{p.talent.type}</p></div>
                </div>
                <InfoRow label="Email"    value={p.talent.email} />
                <InfoRow label="Silence"  value={p.talentSilenceDays>0?<span style={{ color:p.talentSilenceDays>2?G.redText:G.amberText, fontWeight:700 }}>{p.talentSilenceDays}d</span>:<span style={{ color:G.greenDeep, fontWeight:700 }}>Active</span>} />
                <div style={{ marginTop:12 }}><button style={btnOutline} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}>View {p.talent.type}</button></div>
              </SectionCard>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <SectionCard title="Financial Summary">
              {[
                { label:"Total Budget",   value:`₹${p.budget.toLocaleString()}`,                                                                                    color:G.text       },
                { label:"Escrow Locked",  value:p.escrow>0?`₹${p.escrow.toLocaleString()}`:"Released",                                                              color:p.escrow>0?"#b45309":G.greenDeep },
                { label:"Commission (6%)",value:`₹${p.commission.toLocaleString()}`,                                                                                color:G.greenDeep  },
                { label:"Paid to Talent", value:`₹${p.milestones.filter(m=>m.status==="Completed").reduce((s,m)=>s+m.amount,0).toLocaleString()}`,                 color:G.blueText   },
              ].map(item => (
                <div key={item.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"8px 0", borderBottom:`1px solid ${G.border}` }}>
                  <span style={{ fontSize:11, color:G.muted }}>{item.label}</span>
                  <span style={{ fontSize:12, fontWeight:700, color:item.color }}>{item.value}</span>
                </div>
              ))}
            </SectionCard>
            <SectionCard title="Progress">
              <div style={{ marginBottom:14 }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}>
                  <span style={{ fontSize:11, color:G.muted }}>Completion</span>
                  <span style={{ fontSize:11, fontWeight:700, color:G.text }}>{p.progress}%</span>
                </div>
                <div style={{ height:8, background:G.border, borderRadius:99, overflow:"hidden" }}>
                  <div style={{ width:`${p.progress}%`, height:"100%", borderRadius:99, background:p.progress===100?G.green:p.riskLevel==="High"?"#f97316":G.blue }} />
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, textAlign:"center" }}>
                <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 8px" }}>
                  <p style={{ fontSize:20, fontWeight:800, color:G.greenDeep, margin:0 }}>{completedMilestones}</p>
                  <p style={{ fontSize:9, color:G.muted, marginTop:3 }}>Completed</p>
                </div>
                <div style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:10, padding:"10px 8px" }}>
                  <p style={{ fontSize:20, fontWeight:800, color:G.sub, margin:0 }}>{p.milestones.length-completedMilestones}</p>
                  <p style={{ fontSize:9, color:G.muted, marginTop:3 }}>Remaining</p>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── MILESTONES ── */}
      {activeTab==="milestones" && (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          {p.milestones.map((m,i) => {
            const ms = MS_STYLE[m.status]||MS_STYLE["Pending"];
            const numBg = m.status==="Completed"?G.green:m.status==="In Progress"?G.blue:m.status==="Disputed"?G.red:G.muted;
            return (
              <div key={i} style={{ background:G.white, border:`1px solid ${m.status==="Disputed"?G.redBorder:m.status==="Completed"?G.greenBorder:G.border}`, borderRadius:14, padding:"14px 16px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12, gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <div style={{ width:30, height:30, borderRadius:"50%", background:numBg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:G.white, flexShrink:0 }}>{m.status==="Completed"?"✓":i+1}</div>
                    <div>
                      <p style={{ fontSize:13, fontWeight:700, color:G.text, margin:0 }}>{m.name}</p>
                      <p style={{ fontSize:10, color:G.muted }}>Milestone {i+1} of {p.milestones.length}</p>
                    </div>
                  </div>
                  <div style={{ textAlign:"right", flexShrink:0 }}>
                    <p style={{ fontSize:14, fontWeight:800, color:G.text, margin:"0 0 4px" }}>₹{m.amount.toLocaleString()}</p>
                    <span style={{ fontSize:10, fontWeight:700, background:ms.bg, color:ms.text, padding:"2px 8px", borderRadius:99 }}>{m.status}</span>
                  </div>
                </div>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:8 }}>
                  {[
                    { label:"Due",       value:m.dueDate,                  color:G.text                                                              },
                    { label:"Delivered", value:m.deliveredDate||"Not yet",  color:m.deliveredDate?G.text:G.muted                                    },
                    { label:"Escrow",    value:m.status==="Completed"?"Released":m.status==="Disputed"?"Frozen":"Locked",
                      color:m.status==="Completed"?G.greenDeep:m.status==="Disputed"?G.redText:"#b45309"                                            },
                  ].map(s => (
                    <div key={s.label} style={{ background:G.bg, border:`1px solid ${G.border}`, borderRadius:9, padding:"8px 10px" }}>
                      <p style={{ fontSize:9, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.05em", marginBottom:2 }}>{s.label}</p>
                      <p style={{ fontSize:11, fontWeight:600, color:s.color, margin:0 }}>{s.value}</p>
                    </div>
                  ))}
                </div>
                {m.status==="In Progress" && (
                  <div style={{ display:"flex", gap:7, marginTop:12, flexWrap:"wrap" }}>
                    <button style={btnGreen}>Force Release</button>
                    <button style={btnOutline}>Extend Deadline</button>
                    <button style={btnWarn}>Freeze</button>
                  </div>
                )}
                {m.status==="Disputed" && (
                  <div style={{ display:"flex", gap:7, marginTop:12, flexWrap:"wrap" }}>
                    <button style={btnDanger} onClick={()=>navigate("/admin/disputes")}>View Dispute</button>
                    <button style={btnGreen}>Force Release</button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── PROJECTSTREAM ── */}
      {activeTab==="projectstream" && (
        <div className="pd-stream-grid">
          <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden" }}>
            <div style={{ padding:"12px 16px", borderBottom:`1px solid ${G.greenBorder}`, background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
              <div>
                <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>ProjectStream — {p.title}</p>
                <p style={{ fontSize:10, color:G.muted, marginTop:1 }}>Read-only admin view</p>
              </div>
              <div style={{ display:"flex", alignItems:"center", gap:7 }}>
                {chatFrozen && <span style={{ fontSize:10, fontWeight:700, background:G.redBg, color:G.redText, border:`1px solid ${G.redBorder}`, padding:"2px 8px", borderRadius:99 }}>🔒 Frozen</span>}
                <button style={chatFrozen?btnOutline:btnWarn} onClick={()=>setChatFrozen(!chatFrozen)}>{chatFrozen?"Unfreeze":"Freeze Chat"}</button>
              </div>
            </div>
            {chatFrozen && (
              <div style={{ padding:"7px 16px", background:G.redBg, borderBottom:`1px solid ${G.redBorder}` }}>
                <p style={{ fontSize:11, color:G.redText, fontWeight:600, margin:0 }}>⚠ Chat frozen</p>
              </div>
            )}
            <div style={{ padding:16, minHeight:220, display:"flex", flexDirection:"column", gap:10 }}>
              {p.messages.length===0
                ? <p style={{ color:G.muted, fontSize:12, textAlign:"center", padding:"32px 0" }}>No messages yet</p>
                : p.messages.map((msg,i) => {
                  const ms = MSG_STYLE[msg.color]||MSG_STYLE.blue;
                  return (
                    <div key={i} style={{ padding:"10px 12px", borderRadius:10, background:ms.bg, borderLeft:`3px solid ${ms.border}` }}>
                      <div style={{ display:"flex", alignItems:"center", gap:7, marginBottom:6, flexWrap:"wrap" }}>
                        <Avatar name={msg.sender} size="sm" />
                        <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{msg.sender}</span>
                        <span style={{ fontSize:9, fontWeight:700, background:ms.badge.bg, color:ms.badge.text, padding:"2px 7px", borderRadius:99 }}>
                          {msg.role==="admin"?"Admin":msg.role==="team"?"Team":msg.role==="agency"?"Agency":"Talent"}
                        </span>
                        <span style={{ fontSize:9, color:G.muted, marginLeft:"auto" }}>{msg.time}</span>
                      </div>
                      <p style={{ fontSize:12, color:G.text, margin:0, lineHeight:1.5 }}>{msg.text}</p>
                    </div>
                  );
                })
              }
            </div>
            <div style={{ padding:"12px 16px", borderTop:`1px solid ${G.greenBorder}` }}>
              <p style={{ fontSize:10, color:G.muted, fontWeight:600, marginBottom:7 }}>Send official admin message</p>
              <div style={{ display:"flex", gap:7 }}>
                <input value={adminMsg} onChange={e=>setAdminMsg(e.target.value)} placeholder="Type official message…"
                  style={{ flex:1, fontSize:12, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"8px 12px", color:G.text, background:G.white, boxSizing:"border-box" }} />
                <button style={btnNavy} onClick={()=>setAdminMsg("")}>Send</button>
              </div>
            </div>
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            <SectionCard title="Chat Controls">
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                {[
                  { label:chatFrozen?"Unfreeze Chat":"Freeze Chat", style:chatFrozen?btnOutline:btnWarn, action:()=>setChatFrozen(!chatFrozen) },
                  { label:"Export History",                         style:btnOutline,                    action:()=>{}                         },
                  { label:"Flag Conversation",                      style:btnDanger,                     action:()=>{}                         },
                ].map(a => <button key={a.label} style={{ ...a.style, width:"100%", justifyContent:"flex-start", borderRadius:10 }} onClick={a.action}>{a.label}</button>)}
              </div>
            </SectionCard>
            <SectionCard title="Participants">
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {[
                  { name:"Weblance Admin", role:"Platform",    color:G.red   },
                  { name:p.client.name,    role:"Client",      color:G.green },
                  { name:p.talent.name,    role:p.talent.type, color:G.blue  },
                ].map(pt => (
                  <div key={pt.name} style={{ display:"flex", alignItems:"center", gap:9 }}>
                    <div style={{ width:28, height:28, borderRadius:"50%", background:pt.color+"20", border:`1.5px solid ${pt.color}44`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:9, fontWeight:700, color:pt.color, flexShrink:0 }}>{pt.name.split(" ").map(n=>n[0]).join("").slice(0,2)}</div>
                    <div><p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0 }}>{pt.name}</p><p style={{ fontSize:10, color:G.muted }}>{pt.role}</p></div>
                  </div>
                ))}
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {/* ── FILES ── */}
      {activeTab==="files" && (
        <SectionCard title={`Files & Deliverables (${p.files.length})`}>
          {p.files.length===0
            ? <p style={{ fontSize:12, color:G.muted, textAlign:"center", padding:"28px 0" }}>No files uploaded yet</p>
            : (
              <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                {p.files.map((f,i) => {
                  const fileIcon = f.name.endsWith(".pdf")?"📄":f.name.endsWith(".fig")?"🎨":f.name.endsWith(".zip")?"🗜️":f.name.endsWith(".apk")?"📱":"📁";
                  return (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", background:G.bg, border:`1px solid ${G.greenBorder}`, borderRadius:12, flexWrap:"wrap" }}>
                      <div style={{ width:36, height:36, background:G.white, border:`1px solid ${G.border}`, borderRadius:9, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16, flexShrink:0 }}>{fileIcon}</div>
                      <div style={{ flex:1, minWidth:120 }}>
                        <p style={{ fontSize:12, fontWeight:700, color:G.text, margin:0, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{f.name}</p>
                        <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>{f.size} · {f.uploadedBy} · v{f.version}</p>
                      </div>
                      <div style={{ display:"flex", gap:6, flexWrap:"wrap" }}>
                        <button style={btnOutline}>View</button>
                        <button style={btnGreen}>Download</button>
                        <button style={btnDanger}>Flag</button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )
          }
        </SectionCard>
      )}

      {/* ── TIMELINE ── */}
      {activeTab==="timeline" && (
        <SectionCard title="Project Timeline">
          <div style={{ position:"relative", paddingLeft:18 }}>
            <div style={{ position:"absolute", left:13, top:0, bottom:0, width:2, background:G.greenBorder }} />
            <div style={{ display:"flex", flexDirection:"column", gap:0 }}>
              {p.timeline.map((t,i) => {
                const cfg = TL_ICON[t.type]||TL_ICON.system;
                return (
                  <div key={i} style={{ display:"flex", alignItems:"flex-start", gap:12, paddingBottom:18 }}>
                    <div style={{ width:26, height:26, borderRadius:"50%", background:cfg.bg, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, color:cfg.text, flexShrink:0, zIndex:1, marginLeft:-5, border:`2px solid ${G.white}` }}>{cfg.icon}</div>
                    <div style={{ flex:1, paddingBottom:4 }}>
                      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, flexWrap:"wrap" }}>
                        <p style={{ fontSize:12, fontWeight:600, color:G.text, margin:0 }}>{t.event}</p>
                        <span style={{ fontSize:10, color:G.muted, flexShrink:0 }}>{t.time}</span>
                      </div>
                      <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>by {t.actor}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </SectionCard>
      )}

      {/* ── ADMIN ── */}
      {activeTab==="admin" && (
        <div className="pd-admin-grid">
          <SectionCard title="Admin Actions">
            <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
              {[
                { label:"Freeze Project",                  style:btnWarn   },
                { label:"Force release next milestone",    style:btnGreen  },
                { label:"Extend deadline",                 style:btnOutline},
                { label:"Escalate to Dispute",             style:btnDanger },
                { label:"Send notice to both parties",     style:btnOutline},
                { label:"Lock scope",                      style:btnOutline},
                { label:"Cancel project & trigger refund", style:btnDanger },
              ].map(a => <button key={a.label} style={{ ...a.style, width:"100%", justifyContent:"flex-start", borderRadius:10 }}>{a.label}</button>)}
            </div>
          </SectionCard>
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <SectionCard title="Risk Indicators">
              {[
                { label:"AI Health",      value:p.health,                                              warn:["At Risk","Delayed","Disputed"].includes(p.health) },
                { label:"Risk Level",     value:p.riskLevel,                                           warn:p.riskLevel!=="Low"                                 },
                { label:"Scope Changes",  value:`${p.scopeChanges}`,                                  warn:p.scopeChanges>2                                    },
                { label:"Client Silence", value:p.clientSilenceDays>0?`${p.clientSilenceDays} days`:"Active", warn:p.clientSilenceDays>3                       },
                { label:"Talent Silence", value:p.talentSilenceDays>0?`${p.talentSilenceDays} days`:"Active", warn:p.talentSilenceDays>2                       },
              ].map(r => (
                <div key={r.label} style={{ display:"flex", justifyContent:"space-between", alignItems:"center", padding:"7px 0", borderBottom:`1px solid ${G.border}` }}>
                  <span style={{ fontSize:11, color:G.muted }}>{r.label}</span>
                  <span style={{ fontSize:11, fontWeight:700, color:r.warn?G.redText:G.greenDeep }}>{r.value}</span>
                </div>
              ))}
            </SectionCard>
            <SectionCard title="Quick Links">
              <div style={{ display:"flex", flexDirection:"column", gap:7 }}>
                <button style={btnOutline} onClick={()=>navigate(`/admin/clients/${p.client.id}`)}>View Client — {p.client.name}</button>
                <button style={btnOutline} onClick={()=>navigate(`/admin/${p.talent.type==="Agency"?"agencies":"freelancers"}/${p.talent.id}`)}>View {p.talent.type} — {p.talent.name}</button>
                {p.status==="Disputed" && <button style={btnDanger} onClick={()=>navigate("/admin/disputes")}>View Dispute</button>}
                <button style={btnOutline} onClick={()=>navigate("/admin/payments")}>View Payments</button>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminProjects;