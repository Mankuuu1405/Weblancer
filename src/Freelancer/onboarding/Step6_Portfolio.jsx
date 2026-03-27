




// import { useState, useRef } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// export default function Step6_Portfolio({ onNext, onBack, currentStep = 6, totalSteps = 12 }) {
//   const [githubUrl, setGithubUrl]             = useState("");
//   const [githubAnalyzed, setGithubAnalyzed]   = useState(false);
//   const [githubAnalyzing, setGithubAnalyzing] = useState(false);
//   const [githubResult, setGithubResult]       = useState(null);
//   const [projectLinks, setProjectLinks]       = useState([""]);
//   const [analyzedLinks, setAnalyzedLinks]     = useState({});
//   const [analyzingLink, setAnalyzingLink]     = useState(null);
//   const [uploadedDocs, setUploadedDocs]       = useState([]);
//   const fileRef = useRef();

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   const handleGithubAnalyze = () => {
//     if (!githubUrl.trim()) return;
//     setGithubAnalyzing(true);
//     setTimeout(() => {
//       setGithubAnalyzed(true);
//       setGithubAnalyzing(false);
//       setGithubResult({
//         repos: Math.floor(Math.random() * 40 + 10),
//         commits: Math.floor(Math.random() * 800 + 200),
//         languages: ["JavaScript", "TypeScript", "Python"],
//         complexity: "High",
//         score: Math.floor(Math.random() * 30 + 70)
//       });
//     }, 2000);
//   };

//   const handleAddLink    = () => setProjectLinks(prev => [...prev, ""]);
//   const handleLinkChange = (i, val) => {
//     const updated = [...projectLinks]; updated[i] = val; setProjectLinks(updated);
//   };
//   const handleRemoveLink = (i) => setProjectLinks(prev => prev.filter((_, idx) => idx !== i));
//   const handleAnalyzeLink = (i) => {
//     if (!projectLinks[i].trim()) return;
//     setAnalyzingLink(i);
//     setTimeout(() => {
//       setAnalyzedLinks(prev => ({
//         ...prev,
//         [i]: {
//           performance: Math.floor(Math.random() * 30 + 70),
//           stack: ["React", "Node.js", "MongoDB"][Math.floor(Math.random() * 3)],
//           ux: ["Good", "Excellent", "Strong"][Math.floor(Math.random() * 3)]
//         }
//       }));
//       setAnalyzingLink(null);
//     }, 1800);
//   };

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setUploadedDocs(prev => [...prev, ...files.map(f => f.name)]);
//   };
//   const handleRemoveDoc = (i) => setUploadedDocs(prev => prev.filter((_, idx) => idx !== i));

//   const getInsights = () => {
//     const insights = [];
//     insights.push({ status: "tip", msg: "Connecting GitHub gives instant AI skill validation." });
//     if (githubAnalyzed && githubResult) {
//       insights.push({ status: "good", msg: `GitHub scanned: ${githubResult.repos} repos, score ${githubResult.score}/100.` });
//       insights.push({ status: "good", msg: `Top languages: ${githubResult.languages.join(", ")}.` });
//     }
//     const analyzedCount = Object.keys(analyzedLinks).length;
//     if (analyzedCount > 0) insights.push({ status: "good", msg: `${analyzedCount} project link${analyzedCount > 1 ? "s" : ""} analyzed by AI.` });
//     if (uploadedDocs.length > 0) insights.push({ status: "good", msg: `${uploadedDocs.length} document${uploadedDocs.length > 1 ? "s" : ""} uploaded.` });
//     if (!githubAnalyzed && projectLinks.every(l => !l.trim()) && uploadedDocs.length === 0) {
//       insights.push({ status: "warn", msg: "Add at least one portfolio item to stand out." });
//     }
//     return insights;
//   };
//   const insights = getInsights();

//   const spinKeyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif; }
//         ${spinKeyframes}
//         .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
//         .wbl-text-blue { color: #1B72C0; }
//         .wbl-btn-primary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color:#fff; border:none; cursor:pointer;
//           font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
//           box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
//         }
//         .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
//         .wbl-btn-secondary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
//           font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
//         }
//         .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
//         .wbl-btn-inline {
//           display:inline-flex; align-items:center; justify-content:center; gap:6px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color:#fff; border:none; cursor:pointer; font-weight:600;
//           border-radius:10px; padding:9px 14px; font-size:12px; transition:all .2s; white-space:nowrap;
//         }
//         .wbl-btn-inline:disabled { opacity:0.4; cursor:not-allowed; }
//         .wbl-btn-inline:not(:disabled):hover { opacity:0.9; }
//         .spin { animation: spin 1s linear infinite; }
//         .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
//         .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
//         .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
//         .section-card { border:1.5px solid #e5e7eb; border-radius:16px; padding:20px; background:white; }
//         .field-input {
//           flex:1; border:1.5px solid #e5e7eb; border-radius:10px;
//           padding:10px 14px; font-size:13px; outline:none; background:#f8fafc;
//           transition:border-color .2s; box-sizing:border-box;
//         }
//         .field-input:focus { border-color:#1B72C0; }
//         .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
//         .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
//         .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
//         .remove-btn { background:none; border:none; cursor:pointer; color:#d1d5db; padding:4px; transition:color .15s; }
//         .remove-btn:hover { color:#ef4444; }
//         .add-link-btn { display:flex; align-items:center; gap:6px; background:none; border:none; cursor:pointer; font-size:13px; font-weight:600; color:#1B72C0; padding:4px 0; transition:opacity .15s; }
//         .add-link-btn:hover { opacity:0.75; }
//         .upload-btn { display:flex; align-items:center; gap:8px; padding:10px 16px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; font-weight:600; background:white; cursor:pointer; color:#374151; transition:all .15s; }
//         .upload-btn:hover { background:#f9fafb; border-color:#d1d5db; }
//         .dot-blue  { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#0D2855,#1B72C0); flex-shrink:0; }
//         .dot-green { width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0; }
//         .dot-purple{ width:8px; height:8px; border-radius:50%; background:#a855f7; flex-shrink:0; }
//       `}</style>

//       <div className="min-h-screen pb-20" style={{ background:"#F4F9FF" }}>

//         {/* Navbar */}
// <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//   <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
//   <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
//     <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//     </svg>
//     Save &amp; Exit
//   </button>
// </header>

//         {/* Step Progress */}
//         <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
//           <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
//             <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
//             <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
//           </div>
//           <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//             <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
//             <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
//             {stepLabels.map((label, i) => {
//               const isActive = i + 1 === currentStep;
//               const isDone   = i + 1 < currentStep;
//               return (
//                 <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
//                   <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
//                     style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
//                     {isDone ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i+1}
//                   </div>
//                   <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Layout */}
//         <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

//           {/* Main Card */}
//           <div style={{ flex:1, minWidth:0 }}>
//             <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

//               <div style={{ marginBottom:16 }}>
//                 <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #1B72C0", color:"#1B72C0", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
//                   Portfolio Validation
//                 </span>
//               </div>
//               <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Let AI Validate Your Work</h1>
//               <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>Connect your work for automated portfolio analysis</p>

//               <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

//                 {/* GitHub Section */}
//                 <div className="section-card">
//                   <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
//                     <svg width="20" height="20" fill="#1f2937" viewBox="0 0 24 24">
//                       <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
//                     </svg>
//                     <span style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>GitHub Profile</span>
//                     <span style={{ fontSize:10, fontWeight:800, background:"#dcfce7", color:"#16a34a", border:"1px solid #86efac", padding:"2px 8px", borderRadius:100 }}>Recommended</span>
//                   </div>
//                   <p style={{ fontSize:12, color:"#6b7280", marginBottom:14 }}>
//                     AI scans: Code structure, commit history, language frequency, project complexity
//                   </p>

//                   <div style={{ display:"flex", gap:8 }}>
//                     <input className="field-input" type="text" value={githubUrl}
//                       onChange={e => { setGithubUrl(e.target.value); setGithubAnalyzed(false); setGithubResult(null); }}
//                       placeholder="github.com/username" />
//                     <button className="wbl-btn-inline" onClick={handleGithubAnalyze}
//                       disabled={!githubUrl.trim() || githubAnalyzing}
//                       style={{ padding:"10px 16px", fontSize:13, borderRadius:10 }}>
//                       {githubAnalyzing ? (
//                         <><svg className="spin" width="14" height="14" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Analyzing...</>
//                       ) : (
//                         <><svg width="14" height="14" fill="white" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/></svg> Connect &amp; Analyze</>
//                       )}
//                     </button>
//                   </div>

//                   {githubAnalyzed && githubResult && (
//                     <div style={{ marginTop:14, background:"#f0fdf4", border:"1px solid #86efac", borderRadius:12, padding:16 }}>
//                       <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
//                         <svg width="16" height="16" fill="#22c55e" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                         <span style={{ fontSize:13, fontWeight:700, color:"#166534" }}>GitHub Analysis Complete</span>
//                         <span style={{ marginLeft:"auto", fontSize:13, fontWeight:800, color:"#15803d" }}>Score: {githubResult.score}/100</span>
//                       </div>
//                       <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:10, marginBottom:10 }}>
//                         {[["Repos", githubResult.repos], ["Commits", githubResult.commits], ["Complexity", githubResult.complexity]].map(([label, val]) => (
//                           <div key={label} style={{ background:"white", borderRadius:10, padding:"10px 8px", textAlign:"center" }}>
//                             <p style={{ fontSize:16, fontWeight:800, color:"#1f2937", margin:0 }}>{val}</p>
//                             <p style={{ fontSize:11, color:"#6b7280", margin:0 }}>{label}</p>
//                           </div>
//                         ))}
//                       </div>
//                       <div style={{ display:"flex", flexWrap:"wrap", gap:6 }}>
//                         {githubResult.languages.map(lang => (
//                           <span key={lang} style={{ fontSize:11, background:"#dbeafe", color:"#1d4ed8", fontWeight:600, padding:"3px 8px", borderRadius:100 }}>{lang}</span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* Live Project Links */}
//                 <div className="section-card">
//                   <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
//                     <svg width="18" height="18" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
//                     </svg>
//                     <span style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>Live Project Links</span>
//                   </div>
//                   <p style={{ fontSize:12, color:"#6b7280", marginBottom:14 }}>
//                     AI scans: Load performance, tech stack detection, UI/UX quality signals
//                   </p>

//                   <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
//                     {projectLinks.map((link, i) => (
//                       <div key={i}>
//                         <div style={{ display:"flex", gap:8, alignItems:"center" }}>
//                           <input className="field-input" type="url" value={link}
//                             onChange={e => handleLinkChange(i, e.target.value)}
//                             placeholder="https://your-project.com" />
//                           {link.trim() && !analyzedLinks[i] && (
//                             <button className="wbl-btn-inline" onClick={() => handleAnalyzeLink(i)}
//                               disabled={analyzingLink === i}>
//                               {analyzingLink === i ? (
//                                 <svg className="spin" width="12" height="12" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
//                               ) : (
//                                 <svg width="12" height="12" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
//                               )}
//                               {analyzingLink === i ? "Scanning..." : "Scan"}
//                             </button>
//                           )}
//                           {projectLinks.length > 1 && (
//                             <button className="remove-btn" onClick={() => handleRemoveLink(i)}>
//                               <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                               </svg>
//                             </button>
//                           )}
//                           {i === projectLinks.length - 1 && !link.trim() && (
//                             <button onClick={handleAddLink}
//                               style={{ width:36, height:36, borderRadius:10, border:"2px dashed #d1d5db", background:"white", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"#9ca3af", flexShrink:0, transition:"all .15s" }}
//                               onMouseEnter={e => { e.currentTarget.style.borderColor="#1B72C0"; e.currentTarget.style.color="#1B72C0"; }}
//                               onMouseLeave={e => { e.currentTarget.style.borderColor="#d1d5db"; e.currentTarget.style.color="#9ca3af"; }}>
//                               <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
//                             </button>
//                           )}
//                         </div>

//                         {analyzedLinks[i] && (
//                           <div style={{ marginTop:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"10px 14px", display:"flex", gap:16, flexWrap:"wrap" }}>
//                             {[["Performance", `${analyzedLinks[i].performance}/100`], ["Stack", analyzedLinks[i].stack], ["UX", analyzedLinks[i].ux]].map(([k, v]) => (
//                               <div key={k} style={{ fontSize:12, color:"#1d4ed8", fontWeight:600 }}>{k}: {v}</div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     {projectLinks[projectLinks.length - 1]?.trim() && (
//                       <button className="add-link-btn" onClick={handleAddLink}>
//                         <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
//                         Add another link
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* Portfolio Documents */}
//                 <div className="section-card">
//                   <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
//                     <svg width="18" height="18" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
//                     </svg>
//                     <span style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>Portfolio Documents</span>
//                   </div>
//                   <p style={{ fontSize:12, color:"#6b7280", marginBottom:14 }}>
//                     Upload case studies, project writeups, or work samples (PDF, DOC)
//                   </p>

//                   <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} style={{ display:"none" }} />

//                   {uploadedDocs.length === 0 ? (
//                     <button className="upload-btn" onClick={() => fileRef.current.click()}>
//                       <svg width="15" height="15" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
//                       </svg>
//                       Upload PDF / Case Study
//                     </button>
//                   ) : (
//                     <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                       {uploadedDocs.map((doc, i) => (
//                         <div key={i} style={{ display:"flex", alignItems:"center", gap:8, background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"8px 12px" }}>
//                           <svg width="15" height="15" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
//                           </svg>
//                           <span style={{ fontSize:12, color:"#1d4ed8", fontWeight:600, flex:1, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc}</span>
//                           <button className="remove-btn" onClick={() => handleRemoveDoc(i)}>
//                             <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
//                           </button>
//                         </div>
//                       ))}
//                       <button className="add-link-btn" onClick={() => fileRef.current.click()}>
//                         <svg width="14" height="14" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
//                         Upload another document
//                       </button>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//             {/* Navigation */}
//             <div style={{ display:"flex", justifyContent:"space-between", marginTop:20 }}>
//               <button className="wbl-btn-secondary" onClick={onBack}>← Back</button>
//               <button className="wbl-btn-primary" onClick={onNext}>
//                 Continue to Work History
//                 <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div style={{ width:280, flexShrink:0 }}>
//             <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

//               <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
//                 <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                   <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
//               </div>

//               <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                 {insights.map((insight, i) => (
//                   <div key={i} className={insight.status === "good" ? "insight-good" : insight.status === "warn" ? "insight-warn" : "insight-tip"}
//                     style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
//                     {insight.status === "good" ? (
//                       <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                       </svg>
//                     ) : insight.status === "warn" ? (
//                       <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                       </svg>
//                     ) : (
//                       <svg width="15" height="15" fill="none" stroke="#9333ea" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                       </svg>
//                     )}
//                     {insight.msg}
//                   </div>
//                 ))}
//               </div>

//               {(githubAnalyzed || Object.keys(analyzedLinks).length > 0 || uploadedDocs.length > 0) && (
//                 <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
//                   <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>Portfolio items added:</p>
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     {githubAnalyzed && (
//                       <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                         <div className="dot-green"></div>
//                         <span style={{ fontSize:12, color:"#374151" }}>GitHub Profile (Score: {githubResult?.score}/100)</span>
//                       </div>
//                     )}
//                     {Object.keys(analyzedLinks).map(i => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
//                         <div className="dot-blue"></div>
//                         <span style={{ fontSize:12, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>Live project #{parseInt(i)+1}</span>
//                       </div>
//                     ))}
//                     {uploadedDocs.map((doc, i) => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:8 }}>
//                         <div className="dot-purple"></div>
//                         <span style={{ fontSize:12, color:"#374151", overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap" }}>{doc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }







import { useState, useRef } from "react";

const stepLabels =[
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

export default function Step6_Portfolio({ onNext, onBack, currentStep = 6, totalSteps = 12 }) {
  const [githubUrl, setGithubUrl]             = useState("");
  const[githubAnalyzed, setGithubAnalyzed]   = useState(false);
  const [githubAnalyzing, setGithubAnalyzing] = useState(false);
  const [githubResult, setGithubResult]       = useState(null);
  const[projectLinks, setProjectLinks]       = useState([""]);
  const [analyzedLinks, setAnalyzedLinks]     = useState({});
  const [analyzingLink, setAnalyzingLink]     = useState(null);
  const[uploadedDocs, setUploadedDocs]       = useState([]);
  const fileRef = useRef();

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const handleGithubAnalyze = () => {
    if (!githubUrl.trim()) return;
    setGithubAnalyzing(true);
    setTimeout(() => {
      setGithubAnalyzed(true);
      setGithubAnalyzing(false);
      setGithubResult({
        repos: Math.floor(Math.random() * 40 + 10),
        commits: Math.floor(Math.random() * 800 + 200),
        languages: ["JavaScript", "TypeScript", "Python"],
        complexity: "High",
        score: Math.floor(Math.random() * 30 + 70)
      });
    }, 2000);
  };

  const handleAddLink    = () => setProjectLinks(prev => [...prev, ""]);
  const handleLinkChange = (i, val) => {
    const updated = [...projectLinks]; updated[i] = val; setProjectLinks(updated);
  };
  const handleRemoveLink = (i) => setProjectLinks(prev => prev.filter((_, idx) => idx !== i));
  const handleAnalyzeLink = (i) => {
    if (!projectLinks[i].trim()) return;
    setAnalyzingLink(i);
    setTimeout(() => {
      setAnalyzedLinks(prev => ({
        ...prev,
        [i]: {
          performance: Math.floor(Math.random() * 30 + 70),
          stack:["React", "Node.js", "MongoDB"][Math.floor(Math.random() * 3)],
          ux: ["Good", "Excellent", "Strong"][Math.floor(Math.random() * 3)]
        }
      }));
      setAnalyzingLink(null);
    }, 1800);
  };

  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedDocs(prev =>[...prev, ...files.map(f => f.name)]);
  };
  const handleRemoveDoc = (i) => setUploadedDocs(prev => prev.filter((_, idx) => idx !== i));

  const getInsights = () => {
    const insights =[];
    insights.push({ status: "tip", msg: "Connecting GitHub gives instant AI skill validation." });
    if (githubAnalyzed && githubResult) {
      insights.push({ status: "good", msg: `GitHub scanned: ${githubResult.repos} repos, score ${githubResult.score}/100.` });
      insights.push({ status: "good", msg: `Top languages: ${githubResult.languages.join(", ")}.` });
    }
    const analyzedCount = Object.keys(analyzedLinks).length;
    if (analyzedCount > 0) insights.push({ status: "good", msg: `${analyzedCount} project link${analyzedCount > 1 ? "s" : ""} analyzed by AI.` });
    if (uploadedDocs.length > 0) insights.push({ status: "good", msg: `${uploadedDocs.length} document${uploadedDocs.length > 1 ? "s" : ""} uploaded.` });
    if (!githubAnalyzed && projectLinks.every(l => !l.trim()) && uploadedDocs.length === 0) {
      insights.push({ status: "warn", msg: "Add at least one portfolio item to stand out." });
    }
    return insights;
  };
  const insights = getInsights();

  const spinKeyframes = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        ${spinKeyframes}
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
        .wbl-text-blue { color: #1B72C0; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }
        .wbl-btn-inline {
          display:inline-flex; align-items:center; justify-content:center; gap:6px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer; font-weight:600;
          border-radius:10px; padding:9px 14px; font-size:12px; transition:all .2s; white-space:nowrap;
        }
        .wbl-btn-inline:disabled { opacity:0.4; cursor:not-allowed; }
        .wbl-btn-inline:not(:disabled):hover { opacity:0.9; }
        .spin { animation: spin 1s linear infinite; }
        .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
        .section-card { border:1.5px solid #e5e7eb; border-radius:16px; padding:20px; background:white; }
        .field-input {
          flex:1; border:1.5px solid #e5e7eb; border-radius:10px;
          padding:10px 14px; font-size:13px; outline:none; background:#f8fafc;
          transition:border-color .2s; box-sizing:border-box; width: 100%;
        }
        .field-input:focus { border-color:#1B72C0; }
        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .insight-tip  { background:#f5f3ff; border:1px solid #ddd6fe; color:#6b21a8; }
        .remove-btn { background:none; border:none; cursor:pointer; color:#d1d5db; padding:4px; transition:color .15s; }
        .remove-btn:hover { color:#ef4444; }
        .add-link-btn { display:flex; align-items:center; gap:6px; background:none; border:none; cursor:pointer; font-size:13px; font-weight:600; color:#1B72C0; padding:4px 0; transition:opacity .15s; }
        .add-link-btn:hover { opacity:0.75; }
        .upload-btn { display:flex; align-items:center; justify-content:center; gap:8px; padding:10px 16px; border:1.5px solid #e5e7eb; border-radius:10px; font-size:13px; font-weight:600; background:white; cursor:pointer; color:#374151; transition:all .15s; width:100%; sm:width:auto; }
        .upload-btn:hover { background:#f9fafb; border-color:#d1d5db; }
        .dot-blue  { width:8px; height:8px; border-radius:50%; background:linear-gradient(135deg,#0D2855,#1B72C0); flex-shrink:0; }
        .dot-green { width:8px; height:8px; border-radius:50%; background:#22c55e; flex-shrink:0; }
        .dot-purple{ width:8px; height:8px; border-radius:50%; background:#a855f7; flex-shrink:0; }
        /* Hide scrollbar for progress bar on mobile */
        .scrollbar-hide::-webkit-scrollbar { display: none; }
        .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

      <div className="min-h-screen text-gray-900 pb-20" style={{ background:"#F4F9FF" }}>

        {/* ── Navbar ── */}
        <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
          <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block"}} />
          <button className="wbl-btn-secondary px-3 py-2 sm:px-4 sm:py-2 text-xs sm:text-sm">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="hidden sm:inline">Save &amp; Exit</span>
          </button>
        </header>

        {/* ── Step Progress ── */}
        <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
          <div className="flex justify-between text-xs sm:text-sm mb-3">
            <span className="font-semibold text-gray-700">Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue font-bold">{percentComplete}% Complete</span>
          </div>
          
          <div className="overflow-x-auto pb-4 -mx-4 px-4 sm:mx-0 sm:px-0 sm:pb-0 scrollbar-hide">
            <div className="relative flex items-start justify-between min-w-[500px] sm:min-w-0">
              <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
              <div className="absolute top-3.5 sm:top-4 left-0 h-1 wbl-gradient z-0 rounded-full transition-all duration-500"
                style={{ width: progressWidth }}></div>
              {stepLabels.map((label, i) => {
                const isActive = i + 1 === currentStep;
                const isDone   = i + 1 < currentStep;
                return (
                  <div key={i} className="flex flex-col items-center z-10 relative">
                    <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
                      ${isDone ? "step-done" : isActive ? "step-active shadow-md" : "step-inactive"}`}>
                      {isDone ? (
                        <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                        </svg>
                      ) : i + 1}
                    </div>
                    <span className={`text-[9px] sm:text-xs mt-1 font-semibold hidden sm:block
                      ${isActive ? "wbl-text-blue" : "text-gray-400"}`}>
                      {label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Main Layout ── */}
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-8">

              <div className="mb-4">
                <span className="text-[10px] sm:text-xs font-bold border-2 border-blue-600 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wider">
                  Portfolio Validation
                </span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Let AI Validate Your Work</h1>
              <p className="text-sm text-gray-500 mb-6">Connect your work for automated portfolio analysis</p>

              <div className="flex flex-col gap-4 sm:gap-6">

                {/* GitHub Section */}
                <div className="section-card">
                  <div className="flex flex-wrap items-center gap-2 mb-1">
                    <svg className="w-5 h-5 flex-shrink-0" fill="#1f2937" viewBox="0 0 24 24">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">GitHub Profile</span>
                    <span className="text-[10px] font-bold bg-green-100 text-green-700 border border-green-300 px-2 py-0.5 rounded-full">
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    AI scans: Code structure, commit history, language frequency, project complexity
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                    <input className="field-input w-full" type="text" value={githubUrl}
                      onChange={e => { setGithubUrl(e.target.value); setGithubAnalyzed(false); setGithubResult(null); }}
                      placeholder="github.com/username" />
                    <button className="wbl-btn-inline w-full sm:w-auto" onClick={handleGithubAnalyze}
                      disabled={!githubUrl.trim() || githubAnalyzing}
                      style={{ padding:"10px 16px", fontSize:13, borderRadius:10 }}>
                      {githubAnalyzing ? (
                        <><svg className="spin w-3.5 h-3.5" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Analyzing...</>
                      ) : (
                        <><svg className="w-3.5 h-3.5" fill="white" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/></svg> Connect &amp; Analyze</>
                      )}
                    </button>
                  </div>

                  {githubAnalyzed && githubResult && (
                    <div className="mt-4 bg-green-50 border border-green-300 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-green-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-xs sm:text-sm font-bold text-green-800">GitHub Analysis Complete</span>
                        <span className="ml-auto text-xs sm:text-sm font-bold text-green-700">Score: {githubResult.score}/100</span>
                      </div>
                      <div className="grid grid-cols-3 gap-2 sm:gap-3 mb-3">
                        {[["Repos", githubResult.repos], ["Commits", githubResult.commits], ["Complexity", githubResult.complexity]].map(([label, val]) => (
                          <div key={label} className="bg-white rounded-lg p-2 sm:p-2.5 text-center border border-green-100">
                            <p className="text-sm sm:text-base font-bold text-gray-800 m-0 leading-none">{val}</p>
                            <p className="text-[10px] sm:text-xs text-gray-500 m-0 mt-1">{label}</p>
                          </div>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-1.5 sm:gap-2">
                        {githubResult.languages.map(lang => (
                          <span key={lang} className="text-[10px] sm:text-xs bg-blue-100 text-blue-700 font-semibold px-2 py-1 rounded-full">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Live Project Links */}
                <div className="section-card">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">Live Project Links</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    AI scans: Load performance, tech stack detection, UI/UX quality signals
                  </p>

                  <div className="flex flex-col gap-3">
                    {projectLinks.map((link, i) => (
                      <div key={i}>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-2 items-stretch sm:items-center">
                          <input className="field-input w-full" type="url" value={link}
                            onChange={e => handleLinkChange(i, e.target.value)}
                            placeholder="https://your-project.com" />
                          
                          <div className="flex items-center gap-2 mt-2 sm:mt-0">
                            {link.trim() && !analyzedLinks[i] && (
                              <button className="wbl-btn-inline flex-1 sm:flex-none" onClick={() => handleAnalyzeLink(i)}
                                disabled={analyzingLink === i}>
                                {analyzingLink === i ? (
                                  <svg className="spin w-3 h-3" fill="none" viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" stroke="rgba(255,255,255,0.3)" strokeWidth="4"/><path fill="white" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                                ) : (
                                  <svg className="w-3 h-3" fill="none" stroke="white" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                                )}
                                {analyzingLink === i ? "Scanning..." : "Scan"}
                              </button>
                            )}
                            {projectLinks.length > 1 && (
                              <button className="remove-btn" onClick={() => handleRemoveLink(i)}>
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                                </svg>
                              </button>
                            )}
                            {i === projectLinks.length - 1 && !link.trim() && (
                              <button onClick={handleAddLink}
                                className="flex-shrink-0 w-9 h-9 sm:w-10 sm:h-10 border-2 border-dashed border-gray-300 rounded-xl bg-white flex items-center justify-center cursor-pointer text-gray-400 transition-all hover:border-blue-600 hover:text-blue-600">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                              </button>
                            )}
                          </div>
                        </div>

                        {analyzedLinks[i] && (
                          <div className="mt-2 bg-blue-50 border border-blue-200 rounded-xl p-2.5 sm:p-3 flex gap-3 sm:gap-4 flex-wrap">
                            {[["Performance", `${analyzedLinks[i].performance}/100`], ["Stack", analyzedLinks[i].stack], ["UX", analyzedLinks[i].ux]].map(([k, v]) => (
                              <div key={k} className="text-[11px] sm:text-xs text-blue-800 font-semibold">{k}: {v}</div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}

                    {projectLinks[projectLinks.length - 1]?.trim() && (
                      <button className="add-link-btn w-max" onClick={handleAddLink}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                        Add another link
                      </button>
                    )}
                  </div>
                </div>

                {/* Portfolio Documents */}
                <div className="section-card">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">Portfolio Documents</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Upload case studies, project writeups, or work samples (PDF, DOC)
                  </p>

                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} className="hidden" />

                  {uploadedDocs.length === 0 ? (
                    <button className="upload-btn w-full sm:w-max" onClick={() => fileRef.current.click()}>
                      <svg className="w-4 h-4" fill="none" stroke="#6b7280" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                      Upload PDF / Case Study
                    </button>
                  ) : (
                    <div className="flex flex-col gap-2">
                      {uploadedDocs.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded-xl px-3 py-2">
                          <svg className="w-3.5 h-3.5 flex-shrink-0" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                          <span className="text-xs text-blue-700 font-semibold flex-1 truncate">{doc}</span>
                          <button className="remove-btn" onClick={() => handleRemoveDoc(i)}>
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
                          </button>
                        </div>
                      ))}
                      <button className="add-link-btn w-max mt-1" onClick={() => fileRef.current.click()}>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/></svg>
                        Upload another document
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Navigation Buttons (Responsive) */}
            <div className="flex flex-col-reverse sm:flex-row sm:justify-between gap-4 mt-6">
              <button className="w-full sm:w-auto wbl-btn-secondary" onClick={onBack}>← Back</button>
              <button className="w-full sm:w-auto wbl-btn-primary" onClick={onNext}>
                Continue to Work History
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── Sidebar (AI Insights) ── */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">

              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-sm text-gray-800">AI Insights</span>
              </div>

              <div className="flex flex-col gap-2">
                {insights.map((insight, i) => (
                  <div key={i} className={`flex items-start gap-2 p-3 rounded-xl text-xs font-medium ${
                    insight.status === "good" ? "insight-good" : insight.status === "warn" ? "insight-warn" : "insight-tip"
                  }`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="#22c55e" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="#f59e0b" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {(githubAnalyzed || Object.keys(analyzedLinks).length > 0 || uploadedDocs.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-bold text-gray-700 mb-2.5">Portfolio items added:</p>
                  <div className="flex flex-col gap-1.5">
                    {githubAnalyzed && (
                      <div className="flex items-center gap-2">
                        <div className="dot-green"></div>
                        <span className="text-xs text-gray-700">GitHub Profile (Score: {githubResult?.score}/100)</span>
                      </div>
                    )}
                    {Object.keys(analyzedLinks).map(i => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="dot-blue"></div>
                        <span className="text-xs text-gray-700 truncate">Live project #{parseInt(i)+1}</span>
                      </div>
                    ))}
                    {uploadedDocs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="dot-purple"></div>
                        <span className="text-xs text-gray-700 truncate" title={doc}>{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}






