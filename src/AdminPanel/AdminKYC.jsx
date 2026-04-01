// import { useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";

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

// /* ══════════════════ MOCK DATA ══════════════════ */
// const mockKYC = [
//   {
//     id: "KYC-001", userId: "FL-001", name: "Rahul Sharma", email: "rahul@gmail.com",
//     type: "Freelancer", subType: "Individual",
//     status: "Pending", priority: "Normal",
//     submittedDate: "Mar 12, 2026", waitDays: 2,
//     documents: [
//       { name: "Aadhaar Card",   docType: "Government ID",   status: "Submitted", aiCheck: "Pass",   aiScore: 94, note: "" },
//       { name: "PAN Card",       docType: "Tax ID",          status: "Submitted", aiCheck: "Pass",   aiScore: 91, note: "" },
//       { name: "Bank Statement", docType: "Financial Proof", status: "Submitted", aiCheck: "Review", aiScore: 72, note: "Low resolution — may need re-upload" },
//     ],
//     aiOverallScore: 86, aiRecommendation: "Approve",
//     previousAttempts: 0, country: "India", payoutBlocked: false,
//   },
//   {
//     id: "KYC-002", userId: "AG-003", name: "PixelCraft Studio", email: "hello@pixelcraft.design",
//     type: "Agency", subType: "Design Studio",
//     status: "Pending", priority: "High",
//     submittedDate: "Mar 10, 2026", waitDays: 4,
//     documents: [
//       { name: "Business Registration Certificate", docType: "Business Proof",      status: "Submitted", aiCheck: "Pass",   aiScore: 88, note: "" },
//       { name: "GST Certificate",                   docType: "Tax Registration",     status: "Submitted", aiCheck: "Pass",   aiScore: 85, note: "" },
//       { name: "Director Aadhaar",                  docType: "Authorized Person ID", status: "Submitted", aiCheck: "Review", aiScore: 68, note: "Name mismatch with company records — verify manually" },
//       { name: "Address Proof",                     docType: "Business Address",     status: "Submitted", aiCheck: "Pass",   aiScore: 90, note: "" },
//     ],
//     aiOverallScore: 72, aiRecommendation: "Manual Review",
//     previousAttempts: 0, country: "India", payoutBlocked: true,
//   },
//   {
//     id: "KYC-003", userId: "FL-003", name: "Karan Malhotra", email: "karan.m@tech.com",
//     type: "Freelancer", subType: "Individual",
//     status: "Pending", priority: "Normal",
//     submittedDate: "Mar 13, 2026", waitDays: 1,
//     documents: [
//       { name: "Aadhaar Card", docType: "Government ID", status: "Submitted", aiCheck: "Pass", aiScore: 96, note: "" },
//       { name: "PAN Card",     docType: "Tax ID",        status: "Submitted", aiCheck: "Pass", aiScore: 93, note: "" },
//     ],
//     aiOverallScore: 95, aiRecommendation: "Approve",
//     previousAttempts: 0, country: "India", payoutBlocked: false,
//   },
//   {
//     id: "KYC-004", userId: "FL-004", name: "Priya Menon", email: "priya.m@freelance.com",
//     type: "Freelancer", subType: "Individual",
//     status: "Re-upload Required", priority: "Low",
//     submittedDate: "Mar 1, 2026", waitDays: 13,
//     documents: [
//       { name: "Aadhaar Card", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 31, note: "Document appears tampered — rejected" },
//       { name: "PAN Card",     docType: "Tax ID",        status: "Rejected", aiCheck: "Fail", aiScore: 28, note: "Name does not match account registration" },
//     ],
//     aiOverallScore: 29, aiRecommendation: "Reject",
//     previousAttempts: 2, country: "India", payoutBlocked: true,
//   },
//   {
//     id: "KYC-005", userId: "FL-005", name: "Neha Gupta", email: "neha@designcraft.in",
//     type: "Freelancer", subType: "Individual",
//     status: "Approved", priority: "Normal",
//     submittedDate: "Jun 8, 2024", waitDays: 0,
//     documents: [
//       { name: "Aadhaar Card", docType: "Government ID", status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
//       { name: "PAN Card",     docType: "Tax ID",        status: "Approved", aiCheck: "Pass", aiScore: 95, note: "" },
//     ],
//     aiOverallScore: 96, aiRecommendation: "Approve",
//     previousAttempts: 0, country: "India", payoutBlocked: false,
//   },
//   {
//     id: "KYC-006", userId: "AG-001", name: "TechNova Solutions", email: "admin@technova.io",
//     type: "Agency", subType: "Pvt Ltd",
//     status: "Approved", priority: "Normal",
//     submittedDate: "Mar 6, 2025", waitDays: 0,
//     documents: [
//       { name: "Certificate of Incorporation", docType: "Business Proof",      status: "Approved", aiCheck: "Pass", aiScore: 99, note: "" },
//       { name: "GST Certificate",              docType: "Tax Registration",     status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
//       { name: "Director PAN",                 docType: "Authorized Person ID", status: "Approved", aiCheck: "Pass", aiScore: 98, note: "" },
//       { name: "Bank Statement",               docType: "Financial Proof",      status: "Approved", aiCheck: "Pass", aiScore: 94, note: "" },
//     ],
//     aiOverallScore: 97, aiRecommendation: "Approve",
//     previousAttempts: 0, country: "India", payoutBlocked: false,
//   },
//   {
//     id: "KYC-007", userId: "CL-005", name: "FakeUser999", email: "fakeuser@temp.xyz",
//     type: "Freelancer", subType: "Individual",
//     status: "Rejected", priority: "High",
//     submittedDate: "Feb 28, 2026", waitDays: 0,
//     documents: [
//       { name: "ID Document", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 8, note: "Fake document detected by AI — possible fraud" },
//     ],
//     aiOverallScore: 8, aiRecommendation: "Reject + Flag",
//     previousAttempts: 3, country: "Unknown", payoutBlocked: true,
//   },
// ];

// /* ══════════════════ SHARED SUB-COMPONENTS ══════════════════ */

// function Avatar({ name }) {
//   const colors = ["#3b82f6","#8b5cf6","#f59e0b","#ef4444","#6EC030","#1A2B5E"];
//   const idx = name.charCodeAt(0) % colors.length;
//   const initials = name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
//   return (
//     <div style={{
//       width: 32, height: 32, borderRadius: "50%",
//       background: colors[idx] + "22", border: `1.5px solid ${colors[idx]}44`,
//       display: "flex", alignItems: "center", justifyContent: "center",
//       fontSize: 11, fontWeight: 700, color: colors[idx], flexShrink: 0,
//     }}>{initials}</div>
//   );
// }

// const STAT_COLOR = {
//   gray:   { bg: G.bg,       border: G.border,       val: G.text,      label: G.muted    },
//   green:  { bg: G.greenBg,  border: G.greenBorder,  val: G.greenDeep, label: G.greenDeep },
//   orange: { bg: G.amberBg,  border: G.amberBorder,  val: "#b45309",   label: "#b45309"  },
//   red:    { bg: G.redBg,    border: G.redBorder,     val: "#dc2626",   label: "#dc2626"  },
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

// /* ── Status badge ── */
// const STATUS_MAP = {
//   "Pending":            { bg: G.amberBg,  border: G.amberBorder, text: "#92400e",   dot: G.amber    },
//   "Approved":           { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep, dot: G.green    },
//   "Rejected":           { bg: G.redBg,    border: G.redBorder,   text: "#dc2626",   dot: G.red      },
//   "Re-upload Required": { bg: G.amberBg,  border: G.amberBorder, text: "#92400e",   dot: G.amber    },
//   "Under Review":       { bg: G.blueBg,   border: G.blueBorder,  text: G.blue,      dot: G.blue     },
// };

// function StatusBadge({ status }) {
//   const s = STATUS_MAP[status] || { bg: G.bg, border: G.border, text: G.muted, dot: G.muted };
//   return (
//     <span style={{
//       display: "inline-flex", alignItems: "center", gap: 5,
//       fontSize: 11, fontWeight: 700,
//       background: s.bg, color: s.text,
//       border: `1px solid ${s.border}`,
//       padding: "3px 10px", borderRadius: 99,
//     }}>
//       <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
//       {status}
//     </span>
//   );
// }

// /* ── AI check badge ── */
// const AI_CHECK_MAP = {
//   Pass:   { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
//   Review: { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   },
//   Fail:   { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   },
// };

// function AICheckBadge({ check }) {
//   const s = AI_CHECK_MAP[check] || AI_CHECK_MAP.Review;
//   return (
//     <span style={{
//       fontSize: 10, fontWeight: 700,
//       background: s.bg, color: s.text,
//       border: `1px solid ${s.border}`,
//       padding: "2px 8px", borderRadius: 99,
//     }}>{check}</span>
//   );
// }

// /* ── AI recommendation badge ── */
// function AIRecBadge({ rec }) {
//   const isApprove = rec === "Approve";
//   const isReject  = rec.includes("Reject");
//   const s = isApprove
//     ? { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep }
//     : isReject
//     ? { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   }
//     : { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   };
//   return (
//     <span style={{
//       fontSize: 10, fontWeight: 700,
//       background: s.bg, color: s.text,
//       border: `1px solid ${s.border}`,
//       padding: "2px 8px", borderRadius: 99,
//     }}>{rec}</span>
//   );
// }

// /* ── AI score bar ── */
// function AIScoreBar({ score }) {
//   const color = score >= 80 ? G.greenDeep : score >= 60 ? "#b45309" : "#dc2626";
//   const barColor = score >= 80 ? G.green   : score >= 60 ? G.amber  : G.red;
//   const bg    = score >= 80 ? G.greenBg   : score >= 60 ? G.amberBg  : G.redBg;
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
//       <div style={{ width: 44, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
//         <div style={{ width: `${score}%`, height: "100%", background: barColor, borderRadius: 99 }} />
//       </div>
//       <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
//     </div>
//   );
// }

// /* ── Priority dot ── */
// const PRIORITY_DOT = {
//   High:   G.red,
//   Normal: G.muted,
//   Low:    G.border,
// };

// function PriorityIndicator({ priority }) {
//   return (
//     <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
//       <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_DOT[priority] || G.muted, flexShrink: 0 }} />
//       <span style={{ fontSize: 12, color: G.sub }}>{priority}</span>
//     </div>
//   );
// }

// /* ── Wait days ── */
// function WaitDays({ days }) {
//   if (days === 0) return <span style={{ fontSize: 12, color: G.border }}>—</span>;
//   const color = days > 3 ? "#dc2626" : days > 1 ? "#b45309" : G.muted;
//   return <span style={{ fontSize: 12, fontWeight: 700, color }}>{days}d</span>;
// }

// const btnNavy = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100, padding: "8px 16px",
//   cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   whiteSpace: "nowrap",
// };
// const btnOutline = {
//   ...btnNavy,
//   background: G.greenBg, color: G.greenDeep,
//   border: `1px solid ${G.greenBorder}`,
//   boxShadow: "none",
// };

// const HEADERS = ["Applicant","Type","Status","AI Score","AI Rec.","Docs","Wait","Attempts","Priority","Actions"];

// /* ══════════════════ KYC TABLE ══════════════════ */
// function KYCTable({ data, onSelect, hovRow, setHovRow }) {
//   return (
//     <div style={{ overflowX: "auto" }}>
//       <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
//         <thead>
//           <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
//             {HEADERS.map(h => (
//               <th key={h} style={{
//                 padding: "10px 14px", fontSize: 10, fontWeight: 700,
//                 color: G.muted, textTransform: "uppercase",
//                 letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap",
//               }}>{h}</th>
//             ))}
//           </tr>
//         </thead>
//         <tbody>
//           {data.map(k => (
//             <tr
//               key={k.id}
//               style={{
//                 borderBottom: `1px solid ${G.border}`,
//                 background: hovRow === k.id ? G.greenBg : G.white,
//                 cursor: "pointer", transition: "background 0.1s",
//               }}
//               onMouseEnter={() => setHovRow(k.id)}
//               onMouseLeave={() => setHovRow(null)}
//               onClick={() => onSelect(k)}
//             >
//               {/* Applicant */}
//               <td style={{ padding: "12px 14px" }}>
//                 <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
//                   <Avatar name={k.name} />
//                   <div>
//                     <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{k.name}</p>
//                     <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{k.email}</p>
//                     <p style={{ fontSize: 10, color: G.border, margin: 0 }}>{k.id}</p>
//                   </div>
//                 </div>
//               </td>
//               <td style={{ padding: "12px 14px" }}>
//                 <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>{k.type}</p>
//                 <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{k.subType}</p>
//               </td>
//               <td style={{ padding: "12px 14px" }}><StatusBadge status={k.status} /></td>
//               <td style={{ padding: "12px 14px" }}><AIScoreBar score={k.aiOverallScore} /></td>
//               <td style={{ padding: "12px 14px" }}><AIRecBadge rec={k.aiRecommendation} /></td>
//               <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{k.documents.length}</td>
//               <td style={{ padding: "12px 14px" }}><WaitDays days={k.waitDays} /></td>
//               <td style={{ padding: "12px 14px", textAlign: "center" }}>
//                 <span style={{ fontSize: 12, fontWeight: 700, color: k.previousAttempts > 1 ? "#dc2626" : G.sub }}>
//                   {k.previousAttempts}
//                 </span>
//               </td>
//               <td style={{ padding: "12px 14px" }}><PriorityIndicator priority={k.priority} /></td>
//               <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
//                 <div style={{ opacity: hovRow === k.id ? 1 : 0, transition: "opacity 0.15s" }}>
//                   <button
//                     onClick={e => { e.stopPropagation(); onSelect(k); }}
//                     style={{
//                       fontSize: 11, fontWeight: 700, fontFamily: FONT,
//                       background: G.gradNavy, color: G.white,
//                       border: "none", borderRadius: 100, padding: "6px 12px",
//                       cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)",
//                     }}>Review</button>
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

// /* ══════════════════ KYC DRAWER ══════════════════ */
// function KYCDrawer({ kyc, onClose, onAction }) {
//   const [decision,     setDecision]     = useState("");
//   const [rejectReason, setRejectReason] = useState("");
//   const [reuploadNote, setReuploadNote] = useState("");

//   if (!kyc) return null;

//   const isPending = kyc.status === "Pending" || kyc.status === "Under Review";
//   const scoreColor  = kyc.aiOverallScore >= 80 ? G.greenDeep : kyc.aiOverallScore >= 60 ? "#b45309" : "#dc2626";
//   const scoreBg     = kyc.aiOverallScore >= 80 ? G.greenBg   : kyc.aiOverallScore >= 60 ? G.amberBg  : G.redBg;
//   const scoreBorder = kyc.aiOverallScore >= 80 ? G.greenBorder : kyc.aiOverallScore >= 60 ? G.amberBorder : G.redBorder;
//   const scoreBar    = kyc.aiOverallScore >= 80 ? G.green       : kyc.aiOverallScore >= 60 ? G.amber       : G.red;

//   const DECISIONS = [
//     { key: "approve",  label: "✓ Approve KYC",        desc: "All docs verified — account fully unlocked",    activeBg: G.greenBg,  activeBorder: G.green,      activeText: G.greenDeep },
//     { key: "reject",   label: "✕ Reject KYC",          desc: "Documents invalid or fraudulent",               activeBg: G.redBg,    activeBorder: G.red,        activeText: "#dc2626"   },
//     { key: "reupload", label: "↩ Request Re-upload",   desc: "Some documents need to be resubmitted",         activeBg: G.amberBg,  activeBorder: G.amber,      activeText: "#92400e"   },
//     { key: "review",   label: "⏳ Mark Under Review",  desc: "Flag for deeper manual review",                  activeBg: G.blueBg,   activeBorder: G.blue,       activeText: G.blue      },
//   ];

//   const REJECT_REASONS = [
//     "Document appears tampered or forged",
//     "Name mismatch with account",
//     "Expired document submitted",
//     "Poor image quality — unreadable",
//     "Wrong document type",
//     "Other",
//   ];

//   return (
//     <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={onClose}>
//       <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.18)" }} />
//       <div
//         style={{
//           position: "relative", width: "100%", maxWidth: 520,
//           background: G.white, height: "100%", overflowY: "auto",
//           boxShadow: "-8px 0 40px rgba(15,26,59,0.15)",
//         }}
//         onClick={e => e.stopPropagation()}
//       >
//         {/* Sticky header */}
//         <div style={{
//           padding: "16px 20px",
//           borderBottom: `1px solid ${G.greenBorder}`,
//           display: "flex", alignItems: "center", justifyContent: "space-between",
//           position: "sticky", top: 0, background: G.white, zIndex: 10,
//           boxShadow: "0 2px 8px rgba(110,192,48,0.07)",
//         }}>
//           <div>
//             <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
//               <span style={{ fontSize: 15, fontWeight: 800, color: G.text }}>{kyc.name}</span>
//               <StatusBadge status={kyc.status} />
//             </div>
//             <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{kyc.id} · {kyc.type} · {kyc.email}</p>
//           </div>
//           <button onClick={onClose} style={{
//             background: G.bg, border: `1px solid ${G.border}`,
//             borderRadius: "50%", width: 30, height: 30,
//             display: "flex", alignItems: "center", justifyContent: "center",
//             fontSize: 14, color: G.muted, cursor: "pointer", fontFamily: FONT,
//             flexShrink: 0,
//           }}>✕</button>
//         </div>

//         <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>

//           {/* AI Score Banner */}
//           <div style={{
//             padding: 16, borderRadius: 14,
//             background: scoreBg, border: `1px solid ${scoreBorder}`,
//           }}>
//             <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
//               <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>◎ AI Pre-Check Result</span>
//               <span style={{ fontSize: 24, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
//                 {kyc.aiOverallScore}<span style={{ fontSize: 13, fontWeight: 400 }}>/100</span>
//               </span>
//             </div>
//             <div style={{ height: 8, background: "rgba(255,255,255,0.6)", borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
//               <div style={{ width: `${kyc.aiOverallScore}%`, height: "100%", background: scoreBar, borderRadius: 99 }} />
//             </div>
//             <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
//               <span style={{ color: scoreColor, fontWeight: 600 }}>AI Recommendation</span>
//               <span style={{ fontWeight: 800, color: scoreColor }}>{kyc.aiRecommendation}</span>
//             </div>
//           </div>

//           {/* Applicant Info */}
//           <SectionCard title="Applicant Information">
//             <InfoRow label="Full Name"     value={kyc.name} />
//             <InfoRow label="Email"         value={kyc.email} />
//             <InfoRow label="Type"          value={`${kyc.type} — ${kyc.subType}`} />
//             <InfoRow label="Country"       value={kyc.country} />
//             <InfoRow label="Submitted"     value={kyc.submittedDate} />
//             <InfoRow label="Past Attempts" value={
//               kyc.previousAttempts > 0
//                 ? <span style={{ color: "#dc2626", fontWeight: 700 }}>{kyc.previousAttempts} failed</span>
//                 : "First submission"
//             } />
//             <InfoRow label="Payout Status" value={
//               kyc.payoutBlocked
//                 ? <span style={{ color: "#dc2626", fontWeight: 700 }}>Blocked — pending KYC</span>
//                 : <span style={{ color: G.greenDeep, fontWeight: 700 }}>Unlocked</span>
//             } />
//           </SectionCard>

//           {/* Documents */}
//           <SectionCard title={`Documents — ${kyc.documents.length} submitted`}>
//             <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
//               {kyc.documents.map((doc, i) => (
//                 <div key={i} style={{
//                   padding: 14, background: G.bg,
//                   borderRadius: 12, border: `1px solid ${G.border}`,
//                 }}>
//                   <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10 }}>
//                     <div>
//                       <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{doc.name}</p>
//                       <p style={{ fontSize: 11, color: G.muted, margin: "3px 0 0" }}>{doc.docType}</p>
//                     </div>
//                     <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
//                       <AICheckBadge check={doc.aiCheck} />
//                       <span style={{
//                         fontSize: 11, fontWeight: 700,
//                         color: doc.aiScore >= 80 ? G.greenDeep : doc.aiScore >= 60 ? "#b45309" : "#dc2626",
//                       }}>{doc.aiScore}%</span>
//                     </div>
//                   </div>

//                   {/* Doc preview placeholder */}
//                   <div style={{
//                     height: 60, background: G.white,
//                     borderRadius: 10, border: `1.5px dashed ${G.greenBorder}`,
//                     display: "flex", flexDirection: "column",
//                     alignItems: "center", justifyContent: "center", marginBottom: 10,
//                   }}>
//                     <span style={{ fontSize: 20 }}>📄</span>
//                     <p style={{ fontSize: 10, color: G.muted, margin: "2px 0 0" }}>{doc.name}</p>
//                   </div>

//                   {doc.note && (
//                     <div style={{
//                       display: "flex", alignItems: "flex-start", gap: 8,
//                       padding: "8px 12px",
//                       background: G.amberBg, border: `1px solid ${G.amberBorder}`,
//                       borderRadius: 8, marginBottom: 10,
//                     }}>
//                       <span style={{ color: G.amber, fontSize: 12, marginTop: 1, flexShrink: 0 }}>⚠</span>
//                       <p style={{ fontSize: 12, color: "#92400e", margin: 0 }}>{doc.note}</p>
//                     </div>
//                   )}

//                   <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
//                     <button style={{ fontSize: 12, color: G.blue, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0 }}>View Full</button>
//                     <button style={{ fontSize: 12, color: G.blue, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0 }}>Download</button>
//                     {doc.status !== "Approved" && (
//                       <button style={{ fontSize: 12, color: G.red, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0, marginLeft: "auto" }}>Flag</button>
//                     )}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </SectionCard>

//           {/* Decision Panel */}
//           {isPending ? (
//             <SectionCard title="Admin Decision">
//               <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
//                 {DECISIONS.map(d => (
//                   <button key={d.key} onClick={() => setDecision(decision === d.key ? "" : d.key)}
//                     style={{
//                       width: "100%", textAlign: "left",
//                       padding: "10px 14px", borderRadius: 10,
//                       border: `1.5px solid ${decision === d.key ? d.activeBorder : G.border}`,
//                       background: decision === d.key ? d.activeBg : G.white,
//                       cursor: "pointer", transition: "all 0.12s", fontFamily: FONT,
//                     }}>
//                     <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: decision === d.key ? d.activeText : G.text }}>{d.label}</p>
//                     <p style={{ fontSize: 11, color: G.muted, margin: "3px 0 0" }}>{d.desc}</p>
//                   </button>
//                 ))}
//               </div>

//               {decision === "reject" && (
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Select rejection reason *</p>
//                   <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
//                     {REJECT_REASONS.map(r => (
//                       <label key={r} style={{
//                         display: "flex", alignItems: "center", gap: 10,
//                         padding: "8px 12px", borderRadius: 8, cursor: "pointer",
//                         border: `1.5px solid ${rejectReason === r ? G.red : G.border}`,
//                         background: rejectReason === r ? G.redBg : G.white,
//                         fontSize: 13, color: rejectReason === r ? "#dc2626" : G.sub,
//                         fontWeight: rejectReason === r ? 700 : 500,
//                         transition: "all 0.1s",
//                       }}>
//                         <input
//                           type="radio" name="rejectReason" value={r}
//                           checked={rejectReason === r}
//                           onChange={() => setRejectReason(r)}
//                           style={{ accentColor: G.red }}
//                         />
//                         {r}
//                       </label>
//                     ))}
//                   </div>
//                 </div>
//               )}

//               {decision === "reupload" && (
//                 <div style={{ marginBottom: 16 }}>
//                   <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Re-upload instructions *</p>
//                   <textarea
//                     value={reuploadNote}
//                     onChange={e => setReuploadNote(e.target.value)}
//                     placeholder="Explain what needs to be re-uploaded and why..."
//                     rows={3}
//                     style={{
//                       width: "100%", fontSize: 13, fontFamily: FONT,
//                       border: `1.5px solid ${G.greenBorder}`, borderRadius: 10,
//                       padding: "10px 14px", background: G.white, color: G.text,
//                       resize: "none", outline: "none", boxSizing: "border-box",
//                     }}
//                   />
//                 </div>
//               )}

//               {decision && (
//                 <button
//                   onClick={() => { onAction(kyc.id, decision, rejectReason || reuploadNote); onClose(); }}
//                   style={{
//                     width: "100%", padding: "12px 0",
//                     fontSize: 13, fontWeight: 800, fontFamily: FONT,
//                     borderRadius: 10, border: "none", cursor: "pointer",
//                     background: decision === "approve" ? G.gradNavy
//                       : decision === "reject"   ? G.red
//                       : decision === "reupload" ? G.amber
//                       : G.blue,
//                     color: G.white,
//                     boxShadow: "0 3px 12px rgba(15,26,59,0.2)",
//                   }}
//                 >
//                   Confirm —{" "}
//                   {decision === "approve"  ? "Approve KYC"
//                   : decision === "reject"   ? "Reject KYC"
//                   : decision === "reupload" ? "Send Re-upload Request"
//                   : "Mark Under Review"}
//                 </button>
//               )}
//             </SectionCard>
//           ) : (
//             <div style={{
//               padding: 16, borderRadius: 14,
//               background: kyc.status === "Approved" ? G.greenBg : kyc.status === "Rejected" ? G.redBg : G.amberBg,
//               border: `1px solid ${kyc.status === "Approved" ? G.greenBorder : kyc.status === "Rejected" ? G.redBorder : G.amberBorder}`,
//             }}>
//               <p style={{
//                 fontSize: 14, fontWeight: 800, margin: "0 0 4px",
//                 color: kyc.status === "Approved" ? G.greenDeep : kyc.status === "Rejected" ? "#dc2626" : "#92400e",
//               }}>
//                 {kyc.status === "Approved" ? "✓ KYC Approved" : kyc.status === "Rejected" ? "✕ KYC Rejected" : "↩ Re-upload Requested"}
//               </p>
//               <p style={{ fontSize: 12, color: G.muted, margin: 0 }}>This KYC has already been processed.</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// /* ══════════════════ SHARED LIST PAGE ══════════════════ */
// function KYCListPage({ filterType }) {
//   const navigate = useNavigate();
//   const [kycData,      setKycData]      = useState(mockKYC);
//   const [search,       setSearch]       = useState("");
//   const [statusFilter, setStatus]       = useState("");
//   const [selected,     setSelected]     = useState(null);
//   const [hovRow,       setHovRow]       = useState(null);

//   const isAll    = !filterType;
//   const isAgency = filterType === "Agency";

//   const base = isAll ? kycData : kycData.filter(k => k.type === filterType);

//   const filtered = base.filter(k => {
//     const q = search.toLowerCase();
//     return (
//       (k.name.toLowerCase().includes(q) || k.email.toLowerCase().includes(q) || k.id.toLowerCase().includes(q)) &&
//       (!statusFilter || k.status === statusFilter)
//     );
//   });

//   const handleAction = (id, decision) => {
//     const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
//     setKycData(prev => prev.map(k => k.id === id ? { ...k, status: map[decision] } : k));
//     setSelected(prev => prev ? { ...prev, status: map[decision] } : null);
//   };

//   const pending  = base.filter(k => k.status === "Pending").length;
//   const approved = base.filter(k => k.status === "Approved").length;
//   const rejected = base.filter(k => k.status === "Rejected" || k.status === "Re-upload Required").length;
//   const highPri  = base.filter(k => k.priority === "High" && k.status === "Pending").length;

//   const selectStyle = (active) => ({
//     fontSize: 12, fontWeight: 600, fontFamily: FONT,
//     border: `1.5px solid ${active ? G.green : G.greenBorder}`,
//     borderRadius: 100, padding: "8px 14px",
//     background: active ? G.greenBg : G.white,
//     color: active ? G.greenDeep : G.sub,
//     cursor: "pointer", outline: "none",
//   });

//   const TAB_ROUTES = [
//     { label: "All KYC",     path: "/admin/kyc",              active: isAll             },
//     { label: "Freelancers", path: "/admin/kyc/freelancers",  active: !isAll && !isAgency },
//     { label: "Agencies",    path: "/admin/kyc/agencies",     active: isAgency          },
//   ];

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }
//         input, select, textarea { outline: none; font-family: 'Poppins', sans-serif; }
//       `}</style>

//       {/* Header */}
//       <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 24 }}>
//         <div>
//           <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>
//             {isAll ? "KYC & Verification" : isAgency ? "Agency KYC" : "Freelancer KYC"}
//           </h1>
//           <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>
//             {isAll    ? "Review identity & business documents before unlocking accounts"
//             : isAgency ? "Business document verification for agencies & companies"
//             :            "Identity verification for individual freelancers"}
//           </p>
//         </div>
//         <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
//           {!isAll      && <button style={btnOutline} onClick={() => navigate("/admin/kyc")}>← All KYC</button>}
//           {isAll       && <button style={btnOutline} onClick={() => navigate("/admin/kyc/freelancers")}>Freelancer KYC</button>}
//           {isAll       && <button style={btnNavy}    onClick={() => navigate("/admin/kyc/agencies")}>Agency KYC</button>}
//           {isAgency    && <button style={btnNavy}    onClick={() => navigate("/admin/kyc/freelancers")}>Freelancer KYC →</button>}
//           {!isAgency && filterType && <button style={btnNavy} onClick={() => navigate("/admin/kyc/agencies")}>Agency KYC →</button>}
//         </div>
//       </div>

//       {/* Stats */}
//       <div style={{ display: "flex", gap: 14, marginBottom: 24 }}>
//         <StatCard label="Pending Review"    value={pending}  sub="Awaiting decision" color="orange" />
//         <StatCard label="High Priority"     value={highPri}  sub="Waiting > 3 days"  color="red"    />
//         <StatCard label="Approved"          value={approved}                          color="green"  />
//         <StatCard label="Rejected / Issues" value={rejected}                          color="gray"   />
//       </div>

//       {/* Agency info banner */}
//       {isAgency && (
//         <div style={{
//           display: "flex", alignItems: "flex-start", gap: 10,
//           padding: "12px 16px", marginBottom: 20,
//           background: G.blueBg, border: `1px solid ${G.blueBorder}`,
//           borderRadius: 12,
//         }}>
//           <span style={{ color: G.blue, fontSize: 14, marginTop: 1, flexShrink: 0 }}>ℹ</span>
//           <p style={{ fontSize: 12, color: G.blue, margin: 0, lineHeight: 1.6 }}>
//             Agency KYC requires: Business Registration Certificate, GST/VAT, Authorized Person ID, and Address Proof.
//             All documents must match the legal entity name.
//           </p>
//         </div>
//       )}

//       {/* Tab nav */}
//       <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
//         {TAB_ROUTES.map(tab => (
//           <button key={tab.label} onClick={() => navigate(tab.path)} style={{
//             fontSize: 12, fontWeight: 700, fontFamily: FONT,
//             padding: "8px 18px", borderRadius: 100, cursor: "pointer",
//             border: `1.5px solid ${tab.active ? G.green : G.greenBorder}`,
//             background: tab.active ? G.gradNavy : G.white,
//             color: tab.active ? G.white : G.greenDeep,
//             transition: "all 0.12s",
//           }}>{tab.label}</button>
//         ))}
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
//                 placeholder="Search name, email, KYC ID…"
//                 style={{
//                   width: "100%", fontSize: 12, fontWeight: 500,
//                   border: `1.5px solid ${G.greenBorder}`, borderRadius: 100,
//                   padding: "8px 12px 8px 32px", background: G.white,
//                   color: G.text, boxSizing: "border-box",
//                 }}
//               />
//             </div>
//             {isAll && (
//               <select style={selectStyle(false)} defaultValue="">
//                 <option value="">All Types</option>
//                 <option value="Freelancer">Freelancer</option>
//                 <option value="Agency">Agency</option>
//               </select>
//             )}
//             <select value={statusFilter} onChange={e => setStatus(e.target.value)} style={selectStyle(!!statusFilter)}>
//               <option value="">All Status</option>
//               {["Pending","Under Review","Approved","Rejected","Re-upload Required"].map(o => (
//                 <option key={o} value={o}>{o}</option>
//               ))}
//             </select>
//           </div>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
//         </div>

//         <KYCTable data={filtered} onSelect={setSelected} hovRow={hovRow} setHovRow={setHovRow} />

//         {filtered.length === 0 && (
//           <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
//             <div style={{
//               width: 52, height: 52, borderRadius: "50%",
//               background: G.greenBg, border: `1px solid ${G.greenBorder}`,
//               display: "flex", alignItems: "center", justifyContent: "center",
//               fontSize: 22, marginBottom: 12,
//             }}>◎</div>
//             <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No KYC records match your filters</p>
//             <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
//           </div>
//         )}

//         <div style={{ padding: "12px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
//           <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
//             Showing {filtered.length} of {base.length} submissions
//           </span>
//         </div>
//       </div>

//       <KYCDrawer kyc={selected} onClose={() => setSelected(null)} onAction={handleAction} />
//     </div>
//   );
// }

// /* ══════════════════ PAGE EXPORTS ══════════════════ */
// export function AdminKYC()           { return <KYCListPage filterType={null} />; }
// export function AdminKYCAgencies()   { return <KYCListPage filterType="Agency" />; }
// export function AdminKYCFreelancers(){ return <KYCListPage filterType="Freelancer" />; }

// export function AdminKYCDetail() {
//   const { id } = useParams();
//   const navigate = useNavigate();
//   const [kycData, setKycData] = useState(mockKYC);

//   const handleAction = (kycId, decision) => {
//     const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
//     setKycData(prev => prev.map(k => k.id === kycId ? { ...k, status: map[decision] } : k));
//   };

//   const kyc = kycData.find(k => k.id === id);

//   if (!kyc) return (
//     <div style={{ padding: 48, textAlign: "center", fontFamily: FONT }}>
//       <p style={{ color: G.muted, marginBottom: 16 }}>KYC record not found</p>
//       <button style={btnNavy} onClick={() => navigate("/admin/kyc")}>← Back to KYC</button>
//     </div>
//   );

//   return (
//     <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
//       <button onClick={() => navigate("/admin/kyc")} style={{
//         background: "none", border: "none", cursor: "pointer",
//         fontSize: 13, color: G.muted, fontWeight: 600, fontFamily: FONT,
//         display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: 0,
//       }}>← All KYC</button>
//       <KYCDrawer kyc={kyc} onClose={() => navigate("/admin/kyc")} onAction={handleAction} />
//     </div>
//   );
// }









import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

/* ── Theme tokens ── */
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

/* ══════════════════ MOCK DATA ══════════════════ */
const mockKYC = [
  {
    id: "KYC-001", userId: "FL-001", name: "Rahul Sharma", email: "rahul@gmail.com",
    type: "Freelancer", subType: "Individual",
    status: "Pending", priority: "Normal",
    submittedDate: "Mar 12, 2026", waitDays: 2,
    documents: [
      { name: "Aadhaar Card",   docType: "Government ID",   status: "Submitted", aiCheck: "Pass",   aiScore: 94, note: "" },
      { name: "PAN Card",       docType: "Tax ID",          status: "Submitted", aiCheck: "Pass",   aiScore: 91, note: "" },
      { name: "Bank Statement", docType: "Financial Proof", status: "Submitted", aiCheck: "Review", aiScore: 72, note: "Low resolution — may need re-upload" },
    ],
    aiOverallScore: 86, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-002", userId: "AG-003", name: "PixelCraft Studio", email: "hello@pixelcraft.design",
    type: "Agency", subType: "Design Studio",
    status: "Pending", priority: "High",
    submittedDate: "Mar 10, 2026", waitDays: 4,
    documents: [
      { name: "Business Registration Certificate", docType: "Business Proof",      status: "Submitted", aiCheck: "Pass",   aiScore: 88, note: "" },
      { name: "GST Certificate",                   docType: "Tax Registration",     status: "Submitted", aiCheck: "Pass",   aiScore: 85, note: "" },
      { name: "Director Aadhaar",                  docType: "Authorized Person ID", status: "Submitted", aiCheck: "Review", aiScore: 68, note: "Name mismatch with company records — verify manually" },
      { name: "Address Proof",                     docType: "Business Address",     status: "Submitted", aiCheck: "Pass",   aiScore: 90, note: "" },
    ],
    aiOverallScore: 72, aiRecommendation: "Manual Review",
    previousAttempts: 0, country: "India", payoutBlocked: true,
  },
  {
    id: "KYC-003", userId: "FL-003", name: "Karan Malhotra", email: "karan.m@tech.com",
    type: "Freelancer", subType: "Individual",
    status: "Pending", priority: "Normal",
    submittedDate: "Mar 13, 2026", waitDays: 1,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Submitted", aiCheck: "Pass", aiScore: 96, note: "" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Submitted", aiCheck: "Pass", aiScore: 93, note: "" },
    ],
    aiOverallScore: 95, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-004", userId: "FL-004", name: "Priya Menon", email: "priya.m@freelance.com",
    type: "Freelancer", subType: "Individual",
    status: "Re-upload Required", priority: "Low",
    submittedDate: "Mar 1, 2026", waitDays: 13,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 31, note: "Document appears tampered — rejected" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Rejected", aiCheck: "Fail", aiScore: 28, note: "Name does not match account registration" },
    ],
    aiOverallScore: 29, aiRecommendation: "Reject",
    previousAttempts: 2, country: "India", payoutBlocked: true,
  },
  {
    id: "KYC-005", userId: "FL-005", name: "Neha Gupta", email: "neha@designcraft.in",
    type: "Freelancer", subType: "Individual",
    status: "Approved", priority: "Normal",
    submittedDate: "Jun 8, 2024", waitDays: 0,
    documents: [
      { name: "Aadhaar Card", docType: "Government ID", status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
      { name: "PAN Card",     docType: "Tax ID",        status: "Approved", aiCheck: "Pass", aiScore: 95, note: "" },
    ],
    aiOverallScore: 96, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-006", userId: "AG-001", name: "TechNova Solutions", email: "admin@technova.io",
    type: "Agency", subType: "Pvt Ltd",
    status: "Approved", priority: "Normal",
    submittedDate: "Mar 6, 2025", waitDays: 0,
    documents: [
      { name: "Certificate of Incorporation", docType: "Business Proof",      status: "Approved", aiCheck: "Pass", aiScore: 99, note: "" },
      { name: "GST Certificate",              docType: "Tax Registration",     status: "Approved", aiCheck: "Pass", aiScore: 97, note: "" },
      { name: "Director PAN",                 docType: "Authorized Person ID", status: "Approved", aiCheck: "Pass", aiScore: 98, note: "" },
      { name: "Bank Statement",               docType: "Financial Proof",      status: "Approved", aiCheck: "Pass", aiScore: 94, note: "" },
    ],
    aiOverallScore: 97, aiRecommendation: "Approve",
    previousAttempts: 0, country: "India", payoutBlocked: false,
  },
  {
    id: "KYC-007", userId: "CL-005", name: "FakeUser999", email: "fakeuser@temp.xyz",
    type: "Freelancer", subType: "Individual",
    status: "Rejected", priority: "High",
    submittedDate: "Feb 28, 2026", waitDays: 0,
    documents: [
      { name: "ID Document", docType: "Government ID", status: "Rejected", aiCheck: "Fail", aiScore: 8, note: "Fake document detected by AI — possible fraud" },
    ],
    aiOverallScore: 8, aiRecommendation: "Reject + Flag",
    previousAttempts: 3, country: "Unknown", payoutBlocked: true,
  },
];

/* ══════════════════ SHARED SUB-COMPONENTS ══════════════════ */
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
      borderRadius: 14, padding: "16px 20px", flex: 1, minWidth: 0,
      boxShadow: "0 2px 8px rgba(110,192,48,0.05)",
    }}>
      <p style={{ fontSize: 10, fontWeight: 700, color: c.label, textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: 6 }}>{label}</p>
      <p style={{ fontSize: 22, fontWeight: 800, color: c.val, margin: 0, lineHeight: 1 }}>{value}</p>
      {sub && <p style={{ fontSize: 11, color: G.muted, marginTop: 5 }}>{sub}</p>}
    </div>
  );
}

function SectionCard({ title, children }) {
  return (
    <div style={{
      background: G.white, border: `1px solid ${G.greenBorder}`,
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
    }}>
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

const STATUS_MAP = {
  "Pending":            { bg: G.amberBg,  border: G.amberBorder, text: "#92400e",   dot: G.amber    },
  "Approved":           { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep, dot: G.green    },
  "Rejected":           { bg: G.redBg,    border: G.redBorder,   text: "#dc2626",   dot: G.red      },
  "Re-upload Required": { bg: G.amberBg,  border: G.amberBorder, text: "#92400e",   dot: G.amber    },
  "Under Review":       { bg: G.blueBg,   border: G.blueBorder,  text: G.blue,      dot: G.blue     },
};
function StatusBadge({ status }) {
  const s = STATUS_MAP[status] || { bg: G.bg, border: G.border, text: G.muted, dot: G.muted };
  return (
    <span style={{
      display: "inline-flex", alignItems: "center", gap: 5,
      fontSize: 11, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "3px 10px", borderRadius: 99,
    }}>
      <span style={{ width: 5, height: 5, borderRadius: "50%", background: s.dot }} />
      {status}
    </span>
  );
}

const AI_CHECK_MAP = {
  Pass:   { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep },
  Review: { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   },
  Fail:   { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   },
};
function AICheckBadge({ check }) {
  const s = AI_CHECK_MAP[check] || AI_CHECK_MAP.Review;
  return (
    <span style={{
      fontSize: 10, fontWeight: 700,
      background: s.bg, color: s.text,
      border: `1px solid ${s.border}`,
      padding: "2px 8px", borderRadius: 99,
    }}>{check}</span>
  );
}

function AIRecBadge({ rec }) {
  const isApprove = rec === "Approve";
  const isReject  = rec.includes("Reject");
  const s = isApprove
    ? { bg: G.greenBg,  border: G.greenBorder, text: G.greenDeep }
    : isReject
    ? { bg: G.redBg,    border: G.redBorder,   text: "#dc2626"   }
    : { bg: G.amberBg,  border: G.amberBorder, text: "#92400e"   };
  return (
    <span style={{ fontSize: 10, fontWeight: 700, background: s.bg, color: s.text, border: `1px solid ${s.border}`, padding: "2px 8px", borderRadius: 99 }}>{rec}</span>
  );
}

function AIScoreBar({ score }) {
  const color    = score >= 80 ? G.greenDeep : score >= 60 ? "#b45309" : "#dc2626";
  const barColor = score >= 80 ? G.green     : score >= 60 ? G.amber   : G.red;
  const bg       = score >= 80 ? G.greenBg   : score >= 60 ? G.amberBg  : G.redBg;
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
      <div style={{ width: 44, height: 5, background: G.border, borderRadius: 99, overflow: "hidden" }}>
        <div style={{ width: `${score}%`, height: "100%", background: barColor, borderRadius: 99 }} />
      </div>
      <span style={{ fontSize: 11, fontWeight: 700, color, background: bg, padding: "2px 7px", borderRadius: 99 }}>{score}</span>
    </div>
  );
}

const PRIORITY_DOT = { High: G.red, Normal: G.muted, Low: G.border };
function PriorityIndicator({ priority }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <span style={{ width: 7, height: 7, borderRadius: "50%", background: PRIORITY_DOT[priority] || G.muted, flexShrink: 0 }} />
      <span style={{ fontSize: 12, color: G.sub }}>{priority}</span>
    </div>
  );
}

function WaitDays({ days }) {
  if (days === 0) return <span style={{ fontSize: 12, color: G.border }}>—</span>;
  const color = days > 3 ? "#dc2626" : days > 1 ? "#b45309" : G.muted;
  return <span style={{ fontSize: 12, fontWeight: 700, color }}>{days}d</span>;
}

const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100, padding: "8px 16px",
  cursor: "pointer", boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};
const btnOutline = {
  ...btnNavy,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  boxShadow: "none",
};

const HEADERS = ["Applicant","Type","Status","AI Score","AI Rec.","Docs","Wait","Attempts","Priority","Actions"];

/* Mobile card for KYC */
function KYCCard({ k, onSelect }) {
  return (
    <div
      onClick={() => onSelect(k)}
      style={{
        background: G.white,
        border: `1px solid ${G.greenBorder}`,
        borderRadius: 14,
        padding: 16,
        cursor: "pointer",
        boxShadow: "0 1px 6px rgba(110,192,48,0.07)",
      }}
    >
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 10, marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
          <Avatar name={k.name} />
          <div style={{ minWidth: 0 }}>
            <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{k.name}</p>
            <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{k.email}</p>
          </div>
        </div>
        <StatusBadge status={k.status} />
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 12 }}>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Type</p>
          <p style={{ fontSize: 12, color: G.text, fontWeight: 700, margin: 0 }}>{k.type}</p>
          <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{k.subType}</p>
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>AI Score</p>
          <AIScoreBar score={k.aiOverallScore} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>AI Rec.</p>
          <AIRecBadge rec={k.aiRecommendation} />
        </div>
        <div>
          <p style={{ fontSize: 10, color: G.muted, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 3 }}>Wait / Docs</p>
          <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}><WaitDays days={k.waitDays} /> · {k.documents.length} docs</p>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 6 }}>
        <PriorityIndicator priority={k.priority} />
        <span style={{ fontSize: 11, color: k.previousAttempts > 1 ? "#dc2626" : G.muted, fontWeight: k.previousAttempts > 1 ? 700 : 500 }}>
          {k.previousAttempts} attempt{k.previousAttempts !== 1 ? "s" : ""}
        </span>
      </div>
    </div>
  );
}

/* ══════════════════ KYC TABLE ══════════════════ */
function KYCTable({ data, onSelect, hovRow, setHovRow }) {
  return (
    <div style={{ overflowX: "auto", WebkitOverflowScrolling: "touch" }}>
      <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 1000 }}>
        <thead>
          <tr style={{ background: G.bg, borderBottom: `1px solid ${G.greenBorder}` }}>
            {HEADERS.map(h => (
              <th key={h} style={{ padding: "10px 14px", fontSize: 10, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.07em", textAlign: "left", whiteSpace: "nowrap" }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map(k => (
            <tr
              key={k.id}
              style={{
                borderBottom: `1px solid ${G.border}`,
                background: hovRow === k.id ? G.greenBg : G.white,
                cursor: "pointer", transition: "background 0.1s",
              }}
              onMouseEnter={() => setHovRow(k.id)}
              onMouseLeave={() => setHovRow(null)}
              onClick={() => onSelect(k)}
            >
              <td style={{ padding: "12px 14px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <Avatar name={k.name} />
                  <div>
                    <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{k.name}</p>
                    <p style={{ fontSize: 11, color: G.muted, margin: 0 }}>{k.email}</p>
                    <p style={{ fontSize: 10, color: G.border, margin: 0 }}>{k.id}</p>
                  </div>
                </div>
              </td>
              <td style={{ padding: "12px 14px" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>{k.type}</p>
                <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{k.subType}</p>
              </td>
              <td style={{ padding: "12px 14px" }}><StatusBadge status={k.status} /></td>
              <td style={{ padding: "12px 14px" }}><AIScoreBar score={k.aiOverallScore} /></td>
              <td style={{ padding: "12px 14px" }}><AIRecBadge rec={k.aiRecommendation} /></td>
              <td style={{ padding: "12px 14px", textAlign: "center", fontSize: 13, fontWeight: 700, color: G.text }}>{k.documents.length}</td>
              <td style={{ padding: "12px 14px" }}><WaitDays days={k.waitDays} /></td>
              <td style={{ padding: "12px 14px", textAlign: "center" }}>
                <span style={{ fontSize: 12, fontWeight: 700, color: k.previousAttempts > 1 ? "#dc2626" : G.sub }}>{k.previousAttempts}</span>
              </td>
              <td style={{ padding: "12px 14px" }}><PriorityIndicator priority={k.priority} /></td>
              <td style={{ padding: "12px 14px" }} onClick={e => e.stopPropagation()}>
                <div style={{ opacity: hovRow === k.id ? 1 : 0, transition: "opacity 0.15s" }}>
                  <button
                    onClick={e => { e.stopPropagation(); onSelect(k); }}
                    style={{ fontSize: 11, fontWeight: 700, fontFamily: FONT, background: G.gradNavy, color: G.white, border: "none", borderRadius: 100, padding: "6px 12px", cursor: "pointer", boxShadow: "0 2px 8px rgba(15,26,59,0.22)" }}>Review</button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ══════════════════ KYC DRAWER ══════════════════ */
function KYCDrawer({ kyc, onClose, onAction }) {
  const [decision,     setDecision]     = useState("");
  const [rejectReason, setRejectReason] = useState("");
  const [reuploadNote, setReuploadNote] = useState("");

  if (!kyc) return null;

  const isPending = kyc.status === "Pending" || kyc.status === "Under Review";
  const scoreColor  = kyc.aiOverallScore >= 80 ? G.greenDeep : kyc.aiOverallScore >= 60 ? "#b45309" : "#dc2626";
  const scoreBg     = kyc.aiOverallScore >= 80 ? G.greenBg   : kyc.aiOverallScore >= 60 ? G.amberBg  : G.redBg;
  const scoreBorder = kyc.aiOverallScore >= 80 ? G.greenBorder : kyc.aiOverallScore >= 60 ? G.amberBorder : G.redBorder;
  const scoreBar    = kyc.aiOverallScore >= 80 ? G.green       : kyc.aiOverallScore >= 60 ? G.amber       : G.red;

  const DECISIONS = [
    { key: "approve",  label: "✓ Approve KYC",       desc: "All docs verified — account fully unlocked",   activeBg: G.greenBg, activeBorder: G.green,  activeText: G.greenDeep },
    { key: "reject",   label: "✕ Reject KYC",         desc: "Documents invalid or fraudulent",              activeBg: G.redBg,   activeBorder: G.red,    activeText: "#dc2626"   },
    { key: "reupload", label: "↩ Request Re-upload",  desc: "Some documents need to be resubmitted",        activeBg: G.amberBg, activeBorder: G.amber,  activeText: "#92400e"   },
    { key: "review",   label: "⏳ Mark Under Review", desc: "Flag for deeper manual review",                 activeBg: G.blueBg,  activeBorder: G.blue,   activeText: G.blue      },
  ];

  const REJECT_REASONS = [
    "Document appears tampered or forged",
    "Name mismatch with account",
    "Expired document submitted",
    "Poor image quality — unreadable",
    "Wrong document type",
    "Other",
  ];

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 50, display: "flex", justifyContent: "flex-end" }} onClick={onClose}>
      <div style={{ position: "absolute", inset: 0, background: "rgba(15,26,59,0.18)" }} />
      <div
        style={{
          position: "relative",
          width: "100%",
          maxWidth: 520,
          background: G.white,
          height: "100%",
          overflowY: "auto",
          boxShadow: "-8px 0 40px rgba(15,26,59,0.15)",
        }}
        onClick={e => e.stopPropagation()}
      >
        {/* Sticky header */}
        <div style={{
          padding: "16px 20px",
          borderBottom: `1px solid ${G.greenBorder}`,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          position: "sticky", top: 0, background: G.white, zIndex: 10,
          boxShadow: "0 2px 8px rgba(110,192,48,0.07)",
        }}>
          <div style={{ minWidth: 0, marginRight: 12 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 4 }}>
              <span style={{ fontSize: 15, fontWeight: 800, color: G.text }}>{kyc.name}</span>
              <StatusBadge status={kyc.status} />
            </div>
            <p style={{ fontSize: 11, color: G.muted, margin: 0, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{kyc.id} · {kyc.type} · {kyc.email}</p>
          </div>
          <button onClick={onClose} style={{
            background: G.bg, border: `1px solid ${G.border}`,
            borderRadius: "50%", width: 30, height: 30,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 14, color: G.muted, cursor: "pointer", fontFamily: FONT,
            flexShrink: 0,
          }}>✕</button>
        </div>

        <div style={{ padding: 20, display: "flex", flexDirection: "column", gap: 20 }}>
          {/* AI Score Banner */}
          <div style={{ padding: 16, borderRadius: 14, background: scoreBg, border: `1px solid ${scoreBorder}` }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: scoreColor }}>◎ AI Pre-Check Result</span>
              <span style={{ fontSize: 24, fontWeight: 900, color: scoreColor, lineHeight: 1 }}>
                {kyc.aiOverallScore}<span style={{ fontSize: 13, fontWeight: 400 }}>/100</span>
              </span>
            </div>
            <div style={{ height: 8, background: "rgba(255,255,255,0.6)", borderRadius: 99, overflow: "hidden", marginBottom: 10 }}>
              <div style={{ width: `${kyc.aiOverallScore}%`, height: "100%", background: scoreBar, borderRadius: 99 }} />
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12 }}>
              <span style={{ color: scoreColor, fontWeight: 600 }}>AI Recommendation</span>
              <span style={{ fontWeight: 800, color: scoreColor }}>{kyc.aiRecommendation}</span>
            </div>
          </div>

          {/* Applicant Info */}
          <SectionCard title="Applicant Information">
            <InfoRow label="Full Name"     value={kyc.name} />
            <InfoRow label="Email"         value={kyc.email} />
            <InfoRow label="Type"          value={`${kyc.type} — ${kyc.subType}`} />
            <InfoRow label="Country"       value={kyc.country} />
            <InfoRow label="Submitted"     value={kyc.submittedDate} />
            <InfoRow label="Past Attempts" value={
              kyc.previousAttempts > 0
                ? <span style={{ color: "#dc2626", fontWeight: 700 }}>{kyc.previousAttempts} failed</span>
                : "First submission"
            } />
            <InfoRow label="Payout Status" value={
              kyc.payoutBlocked
                ? <span style={{ color: "#dc2626", fontWeight: 700 }}>Blocked — pending KYC</span>
                : <span style={{ color: G.greenDeep, fontWeight: 700 }}>Unlocked</span>
            } />
          </SectionCard>

          {/* Documents */}
          <SectionCard title={`Documents — ${kyc.documents.length} submitted`}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {kyc.documents.map((doc, i) => (
                <div key={i} style={{ padding: 14, background: G.bg, borderRadius: 12, border: `1px solid ${G.border}` }}>
                  <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 10, flexWrap: "wrap", gap: 8 }}>
                    <div style={{ minWidth: 0 }}>
                      <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{doc.name}</p>
                      <p style={{ fontSize: 11, color: G.muted, margin: "3px 0 0" }}>{doc.docType}</p>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
                      <AICheckBadge check={doc.aiCheck} />
                      <span style={{ fontSize: 11, fontWeight: 700, color: doc.aiScore >= 80 ? G.greenDeep : doc.aiScore >= 60 ? "#b45309" : "#dc2626" }}>{doc.aiScore}%</span>
                    </div>
                  </div>
                  <div style={{ height: 60, background: G.white, borderRadius: 10, border: `1.5px dashed ${G.greenBorder}`, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", marginBottom: 10 }}>
                    <span style={{ fontSize: 20 }}>📄</span>
                    <p style={{ fontSize: 10, color: G.muted, margin: "2px 0 0" }}>{doc.name}</p>
                  </div>
                  {doc.note && (
                    <div style={{ display: "flex", alignItems: "flex-start", gap: 8, padding: "8px 12px", background: G.amberBg, border: `1px solid ${G.amberBorder}`, borderRadius: 8, marginBottom: 10 }}>
                      <span style={{ color: G.amber, fontSize: 12, marginTop: 1, flexShrink: 0 }}>⚠</span>
                      <p style={{ fontSize: 12, color: "#92400e", margin: 0 }}>{doc.note}</p>
                    </div>
                  )}
                  <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}>
                    <button style={{ fontSize: 12, color: G.blue, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0 }}>View Full</button>
                    <button style={{ fontSize: 12, color: G.blue, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0 }}>Download</button>
                    {doc.status !== "Approved" && (
                      <button style={{ fontSize: 12, color: G.red, background: "none", border: "none", cursor: "pointer", fontFamily: FONT, fontWeight: 600, padding: 0, marginLeft: "auto" }}>Flag</button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </SectionCard>

          {/* Decision Panel */}
          {isPending ? (
            <SectionCard title="Admin Decision">
              <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                {DECISIONS.map(d => (
                  <button key={d.key} onClick={() => setDecision(decision === d.key ? "" : d.key)}
                    style={{
                      width: "100%", textAlign: "left",
                      padding: "10px 14px", borderRadius: 10,
                      border: `1.5px solid ${decision === d.key ? d.activeBorder : G.border}`,
                      background: decision === d.key ? d.activeBg : G.white,
                      cursor: "pointer", transition: "all 0.12s", fontFamily: FONT,
                    }}>
                    <p style={{ fontSize: 13, fontWeight: 700, margin: 0, color: decision === d.key ? d.activeText : G.text }}>{d.label}</p>
                    <p style={{ fontSize: 11, color: G.muted, margin: "3px 0 0" }}>{d.desc}</p>
                  </button>
                ))}
              </div>

              {decision === "reject" && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Select rejection reason *</p>
                  <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                    {REJECT_REASONS.map(r => (
                      <label key={r} style={{
                        display: "flex", alignItems: "center", gap: 10,
                        padding: "8px 12px", borderRadius: 8, cursor: "pointer",
                        border: `1.5px solid ${rejectReason === r ? G.red : G.border}`,
                        background: rejectReason === r ? G.redBg : G.white,
                        fontSize: 13, color: rejectReason === r ? "#dc2626" : G.sub,
                        fontWeight: rejectReason === r ? 700 : 500,
                      }}>
                        <input type="radio" name="rejectReason" value={r} checked={rejectReason === r} onChange={() => setRejectReason(r)} style={{ accentColor: G.red }} />
                        {r}
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {decision === "reupload" && (
                <div style={{ marginBottom: 16 }}>
                  <p style={{ fontSize: 11, fontWeight: 700, color: G.muted, textTransform: "uppercase", letterSpacing: "0.06em", marginBottom: 8 }}>Re-upload instructions *</p>
                  <textarea
                    value={reuploadNote}
                    onChange={e => setReuploadNote(e.target.value)}
                    placeholder="Explain what needs to be re-uploaded and why..."
                    rows={3}
                    style={{ width: "100%", fontSize: 13, fontFamily: FONT, border: `1.5px solid ${G.greenBorder}`, borderRadius: 10, padding: "10px 14px", background: G.white, color: G.text, resize: "none", outline: "none", boxSizing: "border-box" }}
                  />
                </div>
              )}

              {decision && (
                <button
                  onClick={() => { onAction(kyc.id, decision, rejectReason || reuploadNote); onClose(); }}
                  style={{
                    width: "100%", padding: "12px 0",
                    fontSize: 13, fontWeight: 800, fontFamily: FONT,
                    borderRadius: 10, border: "none", cursor: "pointer",
                    background: decision === "approve" ? G.gradNavy : decision === "reject" ? G.red : decision === "reupload" ? G.amber : G.blue,
                    color: G.white,
                    boxShadow: "0 3px 12px rgba(15,26,59,0.2)",
                  }}
                >
                  Confirm — {decision === "approve" ? "Approve KYC" : decision === "reject" ? "Reject KYC" : decision === "reupload" ? "Send Re-upload Request" : "Mark Under Review"}
                </button>
              )}
            </SectionCard>
          ) : (
            <div style={{
              padding: 16, borderRadius: 14,
              background: kyc.status === "Approved" ? G.greenBg : kyc.status === "Rejected" ? G.redBg : G.amberBg,
              border: `1px solid ${kyc.status === "Approved" ? G.greenBorder : kyc.status === "Rejected" ? G.redBorder : G.amberBorder}`,
            }}>
              <p style={{ fontSize: 14, fontWeight: 800, margin: "0 0 4px", color: kyc.status === "Approved" ? G.greenDeep : kyc.status === "Rejected" ? "#dc2626" : "#92400e" }}>
                {kyc.status === "Approved" ? "✓ KYC Approved" : kyc.status === "Rejected" ? "✕ KYC Rejected" : "↩ Re-upload Requested"}
              </p>
              <p style={{ fontSize: 12, color: G.muted, margin: 0 }}>This KYC has already been processed.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ══════════════════ SHARED LIST PAGE ══════════════════ */
function KYCListPage({ filterType }) {
  const navigate = useNavigate();
  const [kycData,      setKycData]  = useState(mockKYC);
  const [search,       setSearch]   = useState("");
  const [statusFilter, setStatus]   = useState("");
  const [selected,     setSelected] = useState(null);
  const [hovRow,       setHovRow]   = useState(null);

  const isAll    = !filterType;
  const isAgency = filterType === "Agency";

  const base = isAll ? kycData : kycData.filter(k => k.type === filterType);
  const filtered = base.filter(k => {
    const q = search.toLowerCase();
    return (
      (k.name.toLowerCase().includes(q) || k.email.toLowerCase().includes(q) || k.id.toLowerCase().includes(q)) &&
      (!statusFilter || k.status === statusFilter)
    );
  });

  const handleAction = (id, decision) => {
    const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
    setKycData(prev => prev.map(k => k.id === id ? { ...k, status: map[decision] } : k));
    setSelected(prev => prev ? { ...prev, status: map[decision] } : null);
  };

  const pending  = base.filter(k => k.status === "Pending").length;
  const approved = base.filter(k => k.status === "Approved").length;
  const rejected = base.filter(k => k.status === "Rejected" || k.status === "Re-upload Required").length;
  const highPri  = base.filter(k => k.priority === "High" && k.status === "Pending").length;

  const selectStyle = (active) => ({
    fontSize: 12, fontWeight: 600, fontFamily: FONT,
    border: `1.5px solid ${active ? G.green : G.greenBorder}`,
    borderRadius: 100, padding: "8px 14px",
    background: active ? G.greenBg : G.white,
    color: active ? G.greenDeep : G.sub,
    cursor: "pointer", outline: "none",
  });

  const TAB_ROUTES = [
    { label: "All KYC",     path: "/admin/kyc",             active: isAll              },
    { label: "Freelancers", path: "/admin/kyc/freelancers", active: !isAll && !isAgency },
    { label: "Agencies",    path: "/admin/kyc/agencies",    active: isAgency           },
  ];

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        input, select, textarea { outline: none; font-family: 'Poppins', sans-serif; }

        .wl-kyc-page { padding: 28px 28px 64px; }
        .wl-kyc-stat-strip { display: flex; gap: 14px; margin-bottom: 24px; flex-wrap: wrap; }
        .wl-kyc-stat-strip > * { flex: 1 1 120px; }

        /* Table vs cards */
        .wl-kyc-table-wrap { display: block; }
        .wl-kyc-card-list  { display: none; gap: 12px; flex-direction: column; padding: 16px; }

        .wl-kyc-header-row { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 24px; gap: 16px; flex-wrap: wrap; }
        .wl-kyc-header-btns { display: flex; gap: 8px; flex-wrap: wrap; }

        .wl-kyc-filter-bar { padding: 14px 20px; border-bottom: 1px solid ${G.greenBorder}; display: flex; flex-wrap: wrap; gap: 10px; align-items: center; justify-content: space-between; background: ${G.greenBg}; }
        .wl-kyc-filter-inner { display: flex; gap: 10px; flex-wrap: wrap; align-items: center; flex: 1; }
        .wl-kyc-search-wrap { position: relative; flex: 1 1 200px; max-width: 280px; }

        @media (max-width: 1024px) {
          .wl-kyc-table-wrap { display: none; }
          .wl-kyc-card-list  { display: flex; }
        }

        @media (max-width: 640px) {
          .wl-kyc-page { padding: 16px 16px 64px !important; }
          .wl-kyc-stat-strip { gap: 10px; }
          .wl-kyc-header-row { flex-direction: column; align-items: flex-start; }
          .wl-kyc-header-btns { width: 100%; }
          .wl-kyc-header-btns button { flex: 1 1 auto; justify-content: center; }
          .wl-kyc-filter-bar { padding: 12px; gap: 8px; }
          .wl-kyc-filter-inner { flex-direction: column; align-items: stretch; }
          .wl-kyc-search-wrap { max-width: 100%; }
          .wl-kyc-filter-inner select { width: 100%; }

          /* KYC drawer full width on mobile */
          .wl-kyc-drawer { max-width: 100% !important; }
        }
      `}</style>

      {/* Header */}
      <div className="wl-kyc-header-row">
        <div>
          <h1 style={{ fontSize: 22, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.4px" }}>
            {isAll ? "KYC & Verification" : isAgency ? "Agency KYC" : "Freelancer KYC"}
          </h1>
          <p style={{ fontSize: 13, color: G.muted, marginTop: 3 }}>
            {isAll    ? "Review identity & business documents before unlocking accounts"
            : isAgency ? "Business document verification for agencies & companies"
            :            "Identity verification for individual freelancers"}
          </p>
        </div>
        <div className="wl-kyc-header-btns">
          {!isAll      && <button style={btnOutline} onClick={() => navigate("/admin/kyc")}>← All KYC</button>}
          {isAll       && <button style={btnOutline} onClick={() => navigate("/admin/kyc/freelancers")}>Freelancer KYC</button>}
          {isAll       && <button style={btnNavy}    onClick={() => navigate("/admin/kyc/agencies")}>Agency KYC</button>}
          {isAgency    && <button style={btnNavy}    onClick={() => navigate("/admin/kyc/freelancers")}>Freelancer KYC →</button>}
          {!isAgency && filterType && <button style={btnNavy} onClick={() => navigate("/admin/kyc/agencies")}>Agency KYC →</button>}
        </div>
      </div>

      {/* Stats */}
      <div className="wl-kyc-stat-strip">
        <StatCard label="Pending Review"    value={pending}  sub="Awaiting decision" color="orange" />
        <StatCard label="High Priority"     value={highPri}  sub="Waiting > 3 days"  color="red"    />
        <StatCard label="Approved"          value={approved}                          color="green"  />
        <StatCard label="Rejected / Issues" value={rejected}                          color="gray"   />
      </div>

      {/* Agency info banner */}
      {isAgency && (
        <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", marginBottom: 20, background: G.blueBg, border: `1px solid ${G.blueBorder}`, borderRadius: 12 }}>
          <span style={{ color: G.blue, fontSize: 14, marginTop: 1, flexShrink: 0 }}>ℹ</span>
          <p style={{ fontSize: 12, color: G.blue, margin: 0, lineHeight: 1.6 }}>
            Agency KYC requires: Business Registration Certificate, GST/VAT, Authorized Person ID, and Address Proof. All documents must match the legal entity name.
          </p>
        </div>
      )}

      {/* Tab nav */}
      <div style={{ display: "flex", gap: 6, marginBottom: 20, flexWrap: "wrap" }}>
        {TAB_ROUTES.map(tab => (
          <button key={tab.label} onClick={() => navigate(tab.path)} style={{
            fontSize: 12, fontWeight: 700, fontFamily: FONT,
            padding: "8px 18px", borderRadius: 100, cursor: "pointer",
            border: `1.5px solid ${tab.active ? G.green : G.greenBorder}`,
            background: tab.active ? G.gradNavy : G.white,
            color: tab.active ? G.white : G.greenDeep,
            transition: "all 0.12s",
          }}>{tab.label}</button>
        ))}
      </div>

      {/* Table card */}
      <div style={{ background: G.white, border: `1px solid ${G.greenBorder}`, borderRadius: 16, overflow: "hidden", boxShadow: "0 2px 12px rgba(110,192,48,0.06)" }}>
        {/* Filter bar */}
        <div className="wl-kyc-filter-bar">
          <div className="wl-kyc-filter-inner">
            <div className="wl-kyc-search-wrap">
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", fontSize: 13, color: G.muted }}>🔍</span>
              <input
                value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search name, email, KYC ID…"
                style={{ width: "100%", fontSize: 12, fontWeight: 500, border: `1.5px solid ${G.greenBorder}`, borderRadius: 100, padding: "8px 12px 8px 32px", background: G.white, color: G.text, boxSizing: "border-box" }}
              />
            </div>
            {isAll && (
              <select style={selectStyle(false)} defaultValue="">
                <option value="">All Types</option>
                <option value="Freelancer">Freelancer</option>
                <option value="Agency">Agency</option>
              </select>
            )}
            <select value={statusFilter} onChange={e => setStatus(e.target.value)} style={selectStyle(!!statusFilter)}>
              <option value="">All Status</option>
              {["Pending","Under Review","Approved","Rejected","Re-upload Required"].map(o => (
                <option key={o} value={o}>{o}</option>
              ))}
            </select>
          </div>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>{filtered.length} results</span>
        </div>

        {/* Desktop Table */}
        <div className="wl-kyc-table-wrap">
          <KYCTable data={filtered} onSelect={setSelected} hovRow={hovRow} setHovRow={setHovRow} />
        </div>

        {/* Mobile/Tablet Card List */}
        <div className="wl-kyc-card-list">
          {filtered.map(k => (
            <KYCCard key={k.id} k={k} onSelect={setSelected} />
          ))}
        </div>

        {filtered.length === 0 && (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "56px 20px", textAlign: "center" }}>
            <div style={{ width: 52, height: 52, borderRadius: "50%", background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 22, marginBottom: 12 }}>◎</div>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text }}>No KYC records match your filters</p>
            <p style={{ fontSize: 12, color: G.muted, marginTop: 4 }}>Try adjusting the search or filter criteria</p>
          </div>
        )}

        <div style={{ padding: "12px 20px", borderTop: `1px solid ${G.greenBorder}`, background: G.greenBg }}>
          <span style={{ fontSize: 11, color: G.muted, fontWeight: 600 }}>
            Showing {filtered.length} of {base.length} submissions
          </span>
        </div>
      </div>

      <KYCDrawer kyc={selected} onClose={() => setSelected(null)} onAction={handleAction} />
    </div>
  );
}

/* ══════════════════ PAGE EXPORTS ══════════════════ */
export function AdminKYC()            { return <KYCListPage filterType={null} />; }
export function AdminKYCAgencies()    { return <KYCListPage filterType="Agency" />; }
export function AdminKYCFreelancers() { return <KYCListPage filterType="Freelancer" />; }

export function AdminKYCDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [kycData, setKycData] = useState(mockKYC);

  const handleAction = (kycId, decision) => {
    const map = { approve: "Approved", reject: "Rejected", reupload: "Re-upload Required", review: "Under Review" };
    setKycData(prev => prev.map(k => k.id === kycId ? { ...k, status: map[decision] } : k));
  };

  const kyc = kycData.find(k => k.id === id);

  if (!kyc) return (
    <div style={{ padding: 48, textAlign: "center", fontFamily: FONT }}>
      <p style={{ color: G.muted, marginBottom: 16 }}>KYC record not found</p>
      <button style={btnNavy} onClick={() => navigate("/admin/kyc")}>← Back to KYC</button>
    </div>
  );

  return (
    <div style={{ padding: "28px 28px 64px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>
      <button onClick={() => navigate("/admin/kyc")} style={{
        background: "none", border: "none", cursor: "pointer",
        fontSize: 13, color: G.muted, fontWeight: 600, fontFamily: FONT,
        display: "flex", alignItems: "center", gap: 6, marginBottom: 20, padding: 0,
      }}>← All KYC</button>
      <KYCDrawer kyc={kyc} onClose={() => navigate("/admin/kyc")} onAction={handleAction} />
    </div>
  );
}