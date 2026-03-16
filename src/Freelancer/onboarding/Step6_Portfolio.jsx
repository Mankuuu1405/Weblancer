// import { useState, useRef } from "react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// export default function Step6_Portfolio({ onNext, onBack, currentStep = 6, totalSteps = 12 }) {
//   const [githubUrl, setGithubUrl]         = useState("");
//   const [githubAnalyzed, setGithubAnalyzed] = useState(false);
//   const [githubAnalyzing, setGithubAnalyzing] = useState(false);
//   const [githubResult, setGithubResult]   = useState(null);
//   const [projectLinks, setProjectLinks]   = useState([""]);
//   const [analyzedLinks, setAnalyzedLinks] = useState({});
//   const [analyzingLink, setAnalyzingLink] = useState(null);
//   const [uploadedDocs, setUploadedDocs]   = useState([]);
//   const fileRef = useRef();

//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
//   const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

//   /* ── GitHub Analyze ── */
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

//   /* ── Project Links ── */
//   const handleAddLink = () => setProjectLinks(prev => [...prev, ""]);
//   const handleLinkChange = (i, val) => {
//     const updated = [...projectLinks];
//     updated[i] = val;
//     setProjectLinks(updated);
//   };
//   const handleRemoveLink = (i) => {
//     setProjectLinks(prev => prev.filter((_, idx) => idx !== i));
//   };
//   const handleAnalyzeLink = (i) => {
//     const url = projectLinks[i];
//     if (!url.trim()) return;
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

//   /* ── File Upload ── */
//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     setUploadedDocs(prev => [...prev, ...files.map(f => f.name)]);
//   };
//   const handleRemoveDoc = (i) => setUploadedDocs(prev => prev.filter((_, idx) => idx !== i));

//   /* ── AI Insights ── */
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

//   return (
//     <div className="min-h-screen bg-blue-50 text-gray-900 pb-20">

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
//         <span className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight">ArcLancer</span>
//         <div className="flex items-center gap-2 sm:gap-3">
//           <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
//             <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//             </svg>
//             <span className="hidden sm:inline">Save &amp; Exit</span>
//           </button>
          
//         </div>
//       </header>

//       {/* ── Progress Steps ── */}
//       <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
//         <div className="flex justify-between text-xs sm:text-sm mb-3">
//           <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
//           <span className="text-blue-600 font-semibold">{percentComplete}% Complete</span>
//         </div>
//         <div className="relative flex items-start justify-between">
//           <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
//           <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500"
//             style={{ width: progressWidth }}></div>
//           {stepLabels.map((label, index) => {
//             const isActive = index + 1 === currentStep;
//             const isDone   = index + 1 < currentStep;
//             return (
//               <div key={index} className="flex flex-col items-center z-10 relative">
//                 <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
//                   ${isActive ? "bg-white border-blue-500 text-blue-600 shadow-md"
//                     : isDone  ? "bg-blue-500 border-blue-500 text-white"
//                     :           "bg-white border-gray-300 text-gray-400"}`}>
//                   {isDone
//                     ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
//                       </svg>
//                     : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
//                 </div>
//                 <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
//                   ${isActive ? "text-blue-600" : "text-gray-400"}`}>
//                   {label}
//                 </span>
//               </div>
//             );
//           })}
//         </div>
//       </div>

//       {/* ── Two-Column Layout ── */}
//       <div className="max-w-6xl mx-auto px-4 sm:px-6">
//         <div className="flex flex-col lg:flex-row gap-6 items-start">

//           {/* ── Main Card ── */}
//           <div className="w-full lg:flex-1 min-w-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

//               <h1 className="text-xl sm:text-2xl font-bold mb-1">Let AI Validate Your Work</h1>
//               <p className="text-sm text-gray-500 mb-5">Connect your work for automated portfolio analysis</p>

//               <div className="mb-7">
//                 <span className="text-xs font-bold border border-blue-400 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
//                   Portfolio Validation
//                 </span>
//               </div>

//               <div className="space-y-5">

//                 {/* ── GitHub Profile ── */}
//                 <div className="border border-gray-200 rounded-xl p-5">
//                   <div className="flex items-center gap-2 mb-1">
//                     <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
//                       <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
//                     </svg>
//                     <span className="text-sm font-bold text-gray-800">GitHub Profile</span>
//                     <span className="text-xs font-bold text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-full">
//                       Recommended
//                     </span>
//                   </div>
//                   <p className="text-xs text-gray-500 mb-4">
//                     AI scans: Code structure, commit history, language frequency, project complexity
//                   </p>

//                   <div className="flex gap-2">
//                     <input
//                       type="text"
//                       value={githubUrl}
//                       onChange={e => { setGithubUrl(e.target.value); setGithubAnalyzed(false); setGithubResult(null); }}
//                       placeholder="github.com/username"
//                       className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-gray-50"
//                     />
//                     <button
//                       onClick={handleGithubAnalyze}
//                       disabled={!githubUrl.trim() || githubAnalyzing}
//                       className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed
//                         bg-blue-500 hover:bg-blue-600 whitespace-nowrap"
//                     >
//                       {githubAnalyzing ? (
//                         <>
//                           <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
//                             <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                             <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                           </svg>
//                           Analyzing...
//                         </>
//                       ) : (
//                         <>
//                           <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                             <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
//                           </svg>
//                           Connect &amp; Analyze
//                         </>
//                       )}
//                     </button>
//                   </div>

//                   {/* GitHub Analysis Result */}
//                   {githubAnalyzed && githubResult && (
//                     <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
//                       <div className="flex items-center gap-2 mb-3">
//                         <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                         <span className="text-sm font-bold text-green-800">GitHub Analysis Complete</span>
//                         <span className="ml-auto text-sm font-bold text-green-700">Score: {githubResult.score}/100</span>
//                       </div>
//                       <div className="grid grid-cols-3 gap-3 text-center">
//                         <div className="bg-white rounded-lg py-2 px-1">
//                           <p className="text-lg font-bold text-gray-800">{githubResult.repos}</p>
//                           <p className="text-xs text-gray-500">Repos</p>
//                         </div>
//                         <div className="bg-white rounded-lg py-2 px-1">
//                           <p className="text-lg font-bold text-gray-800">{githubResult.commits}</p>
//                           <p className="text-xs text-gray-500">Commits</p>
//                         </div>
//                         <div className="bg-white rounded-lg py-2 px-1">
//                           <p className="text-sm font-bold text-gray-800">{githubResult.complexity}</p>
//                           <p className="text-xs text-gray-500">Complexity</p>
//                         </div>
//                       </div>
//                       <div className="mt-2 flex flex-wrap gap-1.5">
//                         {githubResult.languages.map(lang => (
//                           <span key={lang} className="text-xs bg-blue-100 text-blue-700 font-medium px-2 py-0.5 rounded-full">{lang}</span>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>

//                 {/* ── Live Project Links ── */}
//                 <div className="border border-gray-200 rounded-xl p-5">
//                   <div className="flex items-center gap-2 mb-1">
//                     <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
//                     </svg>
//                     <span className="text-sm font-bold text-gray-800">Live Project Links</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mb-4">
//                     AI scans: Load performance, tech stack detection, UI/UX quality signals
//                   </p>

//                   <div className="space-y-3">
//                     {projectLinks.map((link, i) => (
//                       <div key={i}>
//                         <div className="flex gap-2 items-center">
//                           <input
//                             type="url"
//                             value={link}
//                             onChange={e => handleLinkChange(i, e.target.value)}
//                             placeholder="https://your-project.com"
//                             className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition bg-gray-50"
//                           />
//                           {/* Analyze button */}
//                           {link.trim() && !analyzedLinks[i] && (
//                             <button
//                               onClick={() => handleAnalyzeLink(i)}
//                               disabled={analyzingLink === i}
//                               className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white bg-blue-500 hover:bg-blue-600 transition disabled:opacity-50 whitespace-nowrap"
//                             >
//                               {analyzingLink === i ? (
//                                 <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
//                                   <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
//                                   <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
//                                 </svg>
//                               ) : (
//                                 <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                                 </svg>
//                               )}
//                               {analyzingLink === i ? "Scanning..." : "Scan"}
//                             </button>
//                           )}
//                           {/* Remove button */}
//                           {projectLinks.length > 1 && (
//                             <button onClick={() => handleRemoveLink(i)}
//                               className="text-gray-300 hover:text-red-400 transition p-1 flex-shrink-0">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                               </svg>
//                             </button>
//                           )}
//                           {/* Add button on last row */}
//                           {i === projectLinks.length - 1 && !link.trim() && (
//                             <button onClick={handleAddLink}
//                               className="w-9 h-9 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:border-blue-400 hover:text-blue-500 transition flex-shrink-0">
//                               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
//                               </svg>
//                             </button>
//                           )}
//                         </div>

//                         {/* Link analysis result */}
//                         {analyzedLinks[i] && (
//                           <div className="mt-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2.5 flex items-center gap-4 flex-wrap">
//                             <div className="flex items-center gap-1.5 text-xs text-blue-700">
//                               <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                               </svg>
//                               <span className="font-semibold">Performance: {analyzedLinks[i].performance}/100</span>
//                             </div>
//                             <div className="text-xs text-blue-700">
//                               <span className="font-semibold">Stack: {analyzedLinks[i].stack}</span>
//                             </div>
//                             <div className="text-xs text-blue-700">
//                               <span className="font-semibold">UX: {analyzedLinks[i].ux}</span>
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     ))}

//                     {/* Add more button if last row is filled */}
//                     {projectLinks[projectLinks.length - 1].trim() && (
//                       <button onClick={handleAddLink}
//                         className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 font-medium transition mt-1">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
//                         </svg>
//                         Add another link
//                       </button>
//                     )}
//                   </div>
//                 </div>

//                 {/* ── Portfolio Documents ── */}
//                 <div className="border border-gray-200 rounded-xl p-5">
//                   <div className="flex items-center gap-2 mb-1">
//                     <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
//                     </svg>
//                     <span className="text-sm font-bold text-gray-800">Portfolio Documents</span>
//                   </div>
//                   <p className="text-xs text-gray-500 mb-4">
//                     Upload case studies, project writeups, or work samples (PDF, DOC)
//                   </p>

//                   <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} className="hidden"/>

//                   {uploadedDocs.length === 0 ? (
//                     <button onClick={() => fileRef.current.click()}
//                       className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
//                       <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
//                       </svg>
//                       Upload PDF / Case Study
//                     </button>
//                   ) : (
//                     <div className="space-y-2">
//                       {uploadedDocs.map((doc, i) => (
//                         <div key={i} className="flex items-center gap-2 bg-blue-50 border border-blue-100 rounded-lg px-3 py-2">
//                           <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
//                           </svg>
//                           <span className="text-xs text-blue-700 font-medium flex-1 truncate">{doc}</span>
//                           <button onClick={() => handleRemoveDoc(i)}
//                             className="text-blue-300 hover:text-red-400 transition flex-shrink-0">
//                             <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
//                             </svg>
//                           </button>
//                         </div>
//                       ))}
//                       <button onClick={() => fileRef.current.click()}
//                         className="flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 font-medium transition mt-1">
//                         <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
//                         </svg>
//                         Upload another document
//                       </button>
//                     </div>
//                   )}
//                 </div>

//               </div>
//             </div>

//             {/* Navigation */}
//             <div className="flex justify-between mt-6">
//               <button onClick={onBack}
//                 className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
//                 ← Back
//               </button>
//               <button onClick={onNext}
//                 className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
//                 Continue to Work History
//                 <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                 </svg>
//               </button>
//             </div>
//           </div>

//           {/* ── AI Insights Panel ── */}
//           <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
//             <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">

//               <div className="flex items-center gap-2 mb-4">
//                 <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
//                   <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span className="font-bold text-gray-800 text-sm">AI Insights</span>
//               </div>

//               <div className="space-y-2">
//                 {insights.map((insight, i) => (
//                   <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
//                     ${insight.status === "good"
//                       ? "bg-green-50 border border-green-100 text-green-800"
//                       : insight.status === "warn"
//                       ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
//                       : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
//                     {insight.status === "good" ? (
//                       <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                       </svg>
//                     ) : insight.status === "warn" ? (
//                       <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
//                         <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                       </svg>
//                     ) : (
//                       <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                       </svg>
//                     )}
//                     {insight.msg}
//                   </div>
//                 ))}
//               </div>

//               {/* Portfolio completion summary */}
//               {(githubAnalyzed || Object.keys(analyzedLinks).length > 0 || uploadedDocs.length > 0) && (
//                 <div className="mt-4 pt-4 border-t border-gray-100">
//                   <p className="text-xs font-semibold text-gray-600 mb-2">Portfolio items added:</p>
//                   <div className="space-y-1.5">
//                     {githubAnalyzed && (
//                       <div className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 flex-shrink-0"></div>
//                         <span className="text-xs text-gray-600">GitHub Profile (Score: {githubResult?.score}/100)</span>
//                       </div>
//                     )}
//                     {Object.keys(analyzedLinks).map(i => (
//                       <div key={i} className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0"></div>
//                         <span className="text-xs text-gray-600 truncate">Live project #{parseInt(i) + 1}</span>
//                       </div>
//                     ))}
//                     {uploadedDocs.map((doc, i) => (
//                       <div key={i} className="flex items-center gap-2">
//                         <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
//                         <span className="text-xs text-gray-600 truncate">{doc}</span>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </div>
//   );
// }

import { useState, useRef } from "react";

export default function Step6_Portfolio({ onNext, onBack, currentStep = 6, totalSteps = 12 }) {
  const [githubUrl, setGithubUrl]             = useState("");
  const [githubAnalyzed, setGithubAnalyzed]   = useState(false);
  const [githubAnalyzing, setGithubAnalyzing] = useState(false);
  const [githubResult, setGithubResult]       = useState(null);
  const [projectLinks, setProjectLinks]       = useState([""]);
  const [analyzedLinks, setAnalyzedLinks]     = useState({});
  const [analyzingLink, setAnalyzingLink]     = useState(null);
  const [uploadedDocs, setUploadedDocs]       = useState([]);
  const fileRef = useRef();

  /* ── GitHub Analyze ── */
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

  /* ── Project Links ── */
  const handleAddLink    = () => setProjectLinks(prev => [...prev, ""]);
  const handleLinkChange = (i, val) => { const u = [...projectLinks]; u[i] = val; setProjectLinks(u); };
  const handleRemoveLink = (i) => setProjectLinks(prev => prev.filter((_, idx) => idx !== i));
  const handleAnalyzeLink = (i) => {
    if (!projectLinks[i].trim()) return;
    setAnalyzingLink(i);
    setTimeout(() => {
      setAnalyzedLinks(prev => ({
        ...prev,
        [i]: {
          performance: Math.floor(Math.random() * 30 + 70),
          stack: ["React", "Node.js", "MongoDB"][Math.floor(Math.random() * 3)],
          ux: ["Good", "Excellent", "Strong"][Math.floor(Math.random() * 3)]
        }
      }));
      setAnalyzingLink(null);
    }, 1800);
  };

  /* ── File Upload ── */
  const handleFileUpload = (e) => {
    const files = Array.from(e.target.files);
    setUploadedDocs(prev => [...prev, ...files.map(f => f.name)]);
  };
  const handleRemoveDoc = (i) => setUploadedDocs(prev => prev.filter((_, idx) => idx !== i));

  /* ── AI Insights ── */
  const getInsights = () => {
    const insights = [];
    insights.push({ status: "tip", msg: "Connecting GitHub gives instant AI skill validation." });
    if (githubAnalyzed && githubResult) {
      insights.push({ status: "good", msg: `GitHub scanned: ${githubResult.repos} repos, score ${githubResult.score}/100.` });
      insights.push({ status: "good", msg: `Top languages: ${githubResult.languages.join(", ")}.` });
    }
    const analyzedCount = Object.keys(analyzedLinks).length;
    if (analyzedCount > 0) insights.push({ status: "good", msg: `${analyzedCount} project link${analyzedCount > 1 ? "s" : ""} analyzed by AI.` });
    if (uploadedDocs.length > 0) insights.push({ status: "good", msg: `${uploadedDocs.length} document${uploadedDocs.length > 1 ? "s" : ""} uploaded.` });
    if (!githubAnalyzed && projectLinks.every(l => !l.trim()) && uploadedDocs.length === 0)
      insights.push({ status: "warn", msg: "Add at least one portfolio item to stand out." });
    return insights;
  };
  const insights = getInsights();

  const btnGradient = { background: "linear-gradient(135deg,#1960d2,#0f44a8)" };

  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col xl:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full xl:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Let AI Validate Your Work</h1>
              <p className="text-sm text-gray-500 mb-5">Connect your work for automated portfolio analysis</p>

              <div className="mb-7">
                <span className="text-xs font-bold border px-3 py-1 rounded-full uppercase tracking-wide"
                  style={{ borderColor: "#1960d2", color: "#1960d2" }}>
                  Portfolio Validation
                </span>
              </div>

              <div className="space-y-5">

                {/* ── GitHub Profile ── */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-gray-700 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">GitHub Profile</span>
                    <span className="text-xs font-bold px-2 py-0.5 rounded-full" style={{ color: "#2AB836", background: "#e8f9ea", border: "1px solid #c3f0c8" }}>
                      Recommended
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    AI scans: Code structure, commit history, language frequency, project complexity
                  </p>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={githubUrl}
                      onChange={e => { setGithubUrl(e.target.value); setGithubAnalyzed(false); setGithubResult(null); }}
                      placeholder="github.com/username"
                      className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-gray-50"
                    />
                    <button
                      onClick={handleGithubAnalyze}
                      disabled={!githubUrl.trim() || githubAnalyzing}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition disabled:opacity-40 disabled:cursor-not-allowed whitespace-nowrap"
                      style={btnGradient}
                      onMouseEnter={e => { if (!githubAnalyzing) e.currentTarget.style.background = "linear-gradient(135deg,#0f44a8,#0a2f7a)"; }}
                      onMouseLeave={e => e.currentTarget.style.background = btnGradient.background}
                    >
                      {githubAnalyzing ? (
                        <><svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg> Analyzing...</>
                      ) : (
                        <><svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/></svg> Connect &amp; Analyze</>
                      )}
                    </button>
                  </div>

                  {/* GitHub Analysis Result */}
                  {githubAnalyzed && githubResult && (
                    <div className="mt-4 bg-green-50 border border-green-200 rounded-xl p-4">
                      <div className="flex items-center gap-2 mb-3">
                        <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                        <span className="text-sm font-bold text-green-800">GitHub Analysis Complete</span>
                        <span className="ml-auto text-sm font-bold text-green-700">Score: {githubResult.score}/100</span>
                      </div>
                      <div className="grid grid-cols-3 gap-3 text-center">
                        <div className="bg-white rounded-lg py-2 px-1">
                          <p className="text-lg font-bold text-gray-800">{githubResult.repos}</p>
                          <p className="text-xs text-gray-500">Repos</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-1">
                          <p className="text-lg font-bold text-gray-800">{githubResult.commits}</p>
                          <p className="text-xs text-gray-500">Commits</p>
                        </div>
                        <div className="bg-white rounded-lg py-2 px-1">
                          <p className="text-sm font-bold text-gray-800">{githubResult.complexity}</p>
                          <p className="text-xs text-gray-500">Complexity</p>
                        </div>
                      </div>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {githubResult.languages.map(lang => (
                          <span key={lang} className="text-xs font-medium px-2 py-0.5 rounded-full"
                            style={{ background: "#eef4ff", color: "#1960d2" }}>{lang}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* ── Live Project Links ── */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 flex-shrink-0" style={{ color: "#1960d2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">Live Project Links</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    AI scans: Load performance, tech stack detection, UI/UX quality signals
                  </p>

                  <div className="space-y-3">
                    {projectLinks.map((link, i) => (
                      <div key={i}>
                        <div className="flex gap-2 items-center">
                          <input
                            type="url"
                            value={link}
                            onChange={e => handleLinkChange(i, e.target.value)}
                            placeholder="https://your-project.com"
                            className="flex-1 border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition bg-gray-50"
                          />
                          {link.trim() && !analyzedLinks[i] && (
                            <button
                              onClick={() => handleAnalyzeLink(i)}
                              disabled={analyzingLink === i}
                              className="flex items-center gap-1.5 px-3 py-2.5 rounded-xl text-xs font-semibold text-white transition disabled:opacity-50 whitespace-nowrap"
                              style={btnGradient}
                            >
                              {analyzingLink === i ? (
                                <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/></svg>
                              ) : (
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/></svg>
                              )}
                              {analyzingLink === i ? "Scanning..." : "Scan"}
                            </button>
                          )}
                          {projectLinks.length > 1 && (
                            <button onClick={() => handleRemoveLink(i)}
                              className="text-gray-300 hover:text-red-400 transition p-1 flex-shrink-0">
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                              </svg>
                            </button>
                          )}
                          {i === projectLinks.length - 1 && !link.trim() && (
                            <button onClick={handleAddLink}
                              className="w-9 h-9 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400 hover:text-blue-500 transition flex-shrink-0"
                              style={{ borderColor: undefined }}
                              onMouseEnter={e => e.currentTarget.style.borderColor = "#1960d2"}
                              onMouseLeave={e => e.currentTarget.style.borderColor = ""}>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                              </svg>
                            </button>
                          )}
                        </div>

                        {analyzedLinks[i] && (
                          <div className="mt-2 rounded-lg px-3 py-2.5 flex items-center gap-4 flex-wrap"
                            style={{ background: "#eef4ff", border: "1px solid #c5d8f5" }}>
                            <div className="flex items-center gap-1.5 text-xs" style={{ color: "#1960d2" }}>
                              <svg className="w-3.5 h-3.5 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                              </svg>
                              <span className="font-semibold">Performance: {analyzedLinks[i].performance}/100</span>
                            </div>
                            <div className="text-xs font-semibold" style={{ color: "#1960d2" }}>Stack: {analyzedLinks[i].stack}</div>
                            <div className="text-xs font-semibold" style={{ color: "#1960d2" }}>UX: {analyzedLinks[i].ux}</div>
                          </div>
                        )}
                      </div>
                    ))}

                    {projectLinks[projectLinks.length - 1].trim() && (
                      <button onClick={handleAddLink}
                        className="flex items-center gap-2 text-sm font-medium transition mt-1 hover:underline"
                        style={{ color: "#1960d2" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Add another link
                      </button>
                    )}
                  </div>
                </div>

                {/* ── Portfolio Documents ── */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                    </svg>
                    <span className="text-sm font-bold text-gray-800">Portfolio Documents</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4">
                    Upload case studies, project writeups, or work samples (PDF, DOC)
                  </p>

                  <input ref={fileRef} type="file" accept=".pdf,.doc,.docx" multiple onChange={handleFileUpload} className="hidden"/>

                  {uploadedDocs.length === 0 ? (
                    <button onClick={() => fileRef.current.click()}
                      className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                      </svg>
                      Upload PDF / Case Study
                    </button>
                  ) : (
                    <div className="space-y-2">
                      {uploadedDocs.map((doc, i) => (
                        <div key={i} className="flex items-center gap-2 rounded-lg px-3 py-2"
                          style={{ background: "#eef4ff", border: "1px solid #c5d8f5" }}>
                          <svg className="w-4 h-4 flex-shrink-0" style={{ color: "#1960d2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
                          </svg>
                          <span className="text-xs font-medium flex-1 truncate" style={{ color: "#1960d2" }}>{doc}</span>
                          <button onClick={() => handleRemoveDoc(i)}
                            className="text-blue-300 hover:text-red-400 transition flex-shrink-0">
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/>
                            </svg>
                          </button>
                        </div>
                      ))}
                      <button onClick={() => fileRef.current.click()}
                        className="flex items-center gap-2 text-sm font-medium transition mt-1 hover:underline"
                        style={{ color: "#1960d2" }}>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4"/>
                        </svg>
                        Upload another document
                      </button>
                    </div>
                  )}
                </div>

              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext}
                className="text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm"
                style={btnGradient}
                onMouseEnter={e => e.currentTarget.style.background = "linear-gradient(135deg,#0f44a8,#0a2f7a)"}
                onMouseLeave={e => e.currentTarget.style.background = btnGradient.background}>
                Continue to Work History
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
            </div>
          </div>

          {/* ── AI Insights Panel ── */}
          <div className="w-full xl:w-72 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 xl:sticky xl:top-6">

              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: "linear-gradient(135deg,#eef4ff,#e8f9ea)" }}>
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-sm">AI Insights</span>
              </div>

              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                    ${insight.status === "good"
                      ? "bg-green-50 border border-green-100 text-green-800"
                      : insight.status === "warn"
                      ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
                      : "bg-blue-50 border border-blue-100 text-blue-800"}`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: "#1960d2" }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {/* Portfolio completion summary */}
              {(githubAnalyzed || Object.keys(analyzedLinks).length > 0 || uploadedDocs.length > 0) && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-xs font-semibold text-gray-600 mb-2">Portfolio items added:</p>
                  <div className="space-y-1.5">
                    {githubAnalyzed && (
                      <div className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#2AB836" }}></div>
                        <span className="text-xs text-gray-600">GitHub Profile (Score: {githubResult?.score}/100)</span>
                      </div>
                    )}
                    {Object.keys(analyzedLinks).map(i => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: "#1960d2" }}></div>
                        <span className="text-xs text-gray-600 truncate">Live project #{parseInt(i) + 1}</span>
                      </div>
                    ))}
                    {uploadedDocs.map((doc, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-500 flex-shrink-0"></div>
                        <span className="text-xs text-gray-600 truncate">{doc}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}