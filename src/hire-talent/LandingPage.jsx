// import { useNavigate } from "react-router-dom";

// /* ─── Feature card data ─── */
// const FEATURES = [
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <path d="M17 14v6m-3-3h6" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "AI Project Definition",
//     desc: "No technical knowledge needed",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//         <path d="M9 12l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Verified Talent",
//     desc: "Background-checked professionals",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.8"/>
//         <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "Secure Payments",
//     desc: "Pay only when satisfied",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Admin Protection",
//     desc: "You're never alone if issues arise",
//   },
// ];

// const STATS = [
//   { value: "94%",     label: "Completion Rate",       star: false },
//   { value: "12,000+", label: "Active Projects",        star: false },
//   { value: "8,500+",  label: "Verified Professionals", star: false },
//   { value: "4.8",     label: "Avg Rating",             star: true  },
// ];

// /* ─── Component ─── */
// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen font-sans"
//       style={{ backgroundColor: "#eef2ff" }}
//     >

//       {/* ══ NAVBAR ══ */}
//       <nav
//         className="sticky top-0 z-50"
//         style={{
//           backgroundColor: "white",
//           borderBottom: "1px solid #e2e8f0",
//         }}
//       >
//         <div
//           className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
//           style={{ maxWidth: "1280px" }}
//         >
//           <span
//             className="text-2xl font-extrabold cursor-pointer"
//             style={{ color: "#3b5bdb" }}
//             onClick={() => navigate("/hire-talent")}
//           >
//             ArcLancer
//           </span>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="text-sm font-medium px-4 py-2"
//               style={{ color: "#374151" }}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="text-sm font-bold px-5 py-2.5 rounded-lg text-white"
//               style={{ backgroundColor: "#3b5bdb" }}
//             >
//               Hire Talent
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ══ HERO ══ */}
//       <section className="pt-16 pb-12 px-4 text-center">

//         {/* Badge */}
//         <div className="flex justify-center mb-5">
//           <span
//             className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
//             style={{
//               backgroundColor: "#e0e7ff",
//               color: "#3b5bdb",
//               border: "1.5px solid #a5b4fc",
//             }}
//           >
//             Client Platform
//           </span>
//         </div>

//         {/* Heading */}
//         <h1
//           className="font-extrabold leading-tight mb-5 mx-auto"
//           style={{
//             fontSize: "clamp(2.8rem, 6vw, 4rem)",
//             color: "#1e293b",
//             maxWidth: "700px",
//             lineHeight: 1.1,
//           }}
//         >
//           Turn Your Ideas<br />Into Reality
//         </h1>

//         {/* Subtitle */}
//         <p
//           className="text-base mb-10 mx-auto"
//           style={{ color: "#64748b", maxWidth: "500px" }}
//         >
//           AI-powered project planning &bull; Verified talent &bull; Secure payments
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <button
//             onClick={() => navigate("/hire-talent/onboarding")}
//             className="flex items-center gap-2.5 font-bold px-7 py-4 rounded-xl text-white text-base"
//             style={{ backgroundColor: "#3b5bdb" }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="2"/>
//               <path d="M17 14v6m-3-3h6" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//             Hire Talent / Post a Project &rarr;
//           </button>

//           <button
//             onClick={() => document.getElementById("protection-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="flex items-center gap-2.5 font-semibold px-7 py-4 rounded-xl border text-base"
//             style={{
//               backgroundColor: "white",
//               color: "#374151",
//               borderColor: "#d1d5db",
//             }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z"/>
//             </svg>
//             How It Works
//           </button>
//         </div>
//       </section>

//       {/* ══ FEATURE CARDS ══
//           Reference: all 4 cards white with border, same style   */}
//       <section className="pb-16 px-4">
//         <div
//           className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//           style={{ maxWidth: "1100px" }}
//         >
//           {FEATURES.map((f, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center text-center gap-5 px-8 py-12"
//               style={{
//                 backgroundColor: "white",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "16px",
//               }}
//             >
//               {/* Rounded-square icon bg */}
//               <div
//                 className="w-14 h-14 flex items-center justify-center flex-shrink-0"
//                 style={{
//                   backgroundColor: "#e0e7ff",
//                   borderRadius: "14px",
//                   color: "#3b5bdb",
//                 }}
//               >
//                 {f.icon}
//               </div>

//               <div>
//                 <h3
//                   className="font-bold text-base mb-1.5"
//                   style={{ color: "#1e293b" }}
//                 >
//                   {f.title}
//                 </h3>
//                 <p
//                   className="text-sm leading-relaxed"
//                   style={{ color: "#94a3b8" }}
//                 >
//                   {f.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ PROTECTION SECTION ══ */}
//       <section id="protection-section" className="pb-14 px-4">
//         <div
//           className="mx-auto rounded-3xl p-10 sm:p-14"
//           style={{
//             maxWidth: "860px",
//             backgroundColor: "white",
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           <h2
//             className="font-extrabold text-center mb-10"
//             style={{
//               fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)",
//               color: "#1e293b",
//             }}
//           >
//             You won't be left alone if something goes wrong
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
//             {/* Left */}
//             <div className="flex flex-col gap-5">
//               {["Escrow protection", "Quality guarantees", "Dispute resolution"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//             {/* Right */}
//             <div className="flex flex-col gap-5">
//               {["Milestone approvals", "24/7 admin support"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ STATS ══
//           Reference: plain numbers directly on page bg, no card   */}
//       <section className="pb-24 px-4">
//         <div
//           className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
//           style={{ maxWidth: "860px" }}
//         >
//           {STATS.map((s, i) => (
//             <div key={i} className="flex flex-col items-center">
//               <div className="flex items-center gap-1.5">
//                 <span
//                   className="font-extrabold tracking-tight"
//                   style={{
//                     fontSize: "clamp(2rem, 4vw, 2.8rem)",
//                     color: "#1e293b",
//                   }}
//                 >
//                   {s.value}
//                 </span>
//                 {s.star && (
//                   <span style={{ fontSize: "1.6rem", color: "#f59e0b", lineHeight: 1 }}>
//                     ★
//                   </span>
//                 )}
//               </div>
//               <span
//                 className="text-sm font-medium mt-1"
//                 style={{ color: "#64748b" }}
//               >
//                 {s.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// }

// /* ─── Helper ─── */
// function ProtectionItem({ label }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span
//         className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
//         style={{ backgroundColor: "#dcfce7" }}
//       >
//         <svg
//           className="w-3.5 h-3.5"
//           fill="none"
//           stroke="#22c55e"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M5 13l4 4L19 7"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </span>
//       <span className="text-base" style={{ color: "#374151" }}>
//         {label}
//       </span>
//     </div>
//   );
// }



// import { useNavigate } from "react-router-dom";

// const FEATURES = [
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <path d="M17 14v6m-3-3h6" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "AI Project Definition",
//     desc: "No technical knowledge needed",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//         <path d="M9 12l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Verified Talent",
//     desc: "Background-checked professionals",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.8"/>
//         <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "Secure Payments",
//     desc: "Pay only when satisfied",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Admin Protection",
//     desc: "You're never alone if issues arise",
//   },
// ];

// const STATS = [
//   { value: "94%",     label: "Completion Rate"       },
//   { value: "12,000+", label: "Active Projects"        },
//   { value: "8,500+",  label: "Verified Professionals" },
//   { value: "4.8 ★",   label: "Avg Rating"             },
// ];

// export default function HireTalentLandingPage() {
//   const navigate = useNavigate();

//   return (
//     <>
//       <style>{`
//         .wbl-bg {
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//         }
//         .wbl-btn-primary {
//           display: inline-flex; align-items: center; justify-content: center; gap: 8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color: #fff; border: none; cursor: pointer; font-weight: 700;
//           border-radius: 12px; padding: 14px 32px; font-size: 15px;
//           box-shadow: 0 4px 20px rgba(13,40,85,0.30); transition: all .2s;
//         }
//         .wbl-btn-primary:hover { opacity: 0.92; transform: translateY(-2px); }
//         .wbl-btn-outline {
//           display: inline-flex; align-items: center; justify-content: center; gap: 8px;
//           background: #fff; color: #0D2855; border: 2px solid #1B72C0; cursor: pointer;
//           font-weight: 600; border-radius: 12px; padding: 14px 32px; font-size: 15px;
//           transition: all .2s;
//         }
//         .wbl-btn-outline:hover { background: #F6FEF0; }
//         .wbl-feature-card {
//           background: #fff;
//           border: 1px solid #e2e8f0;
//           border-radius: 16px;
//           transition: box-shadow .2s, transform .2s;
//         }
//         .wbl-feature-card:hover { box-shadow: 0 8px 32px rgba(13,40,85,0.10); transform: translateY(-3px); }
//         .wbl-icon-bg {
//           background: linear-gradient(135deg, #e8f4ff 0%, #dff5e8 100%);
//           color: #1B72C0;
//           border-radius: 14px;
//         }
//         .wbl-stat-value {
//           background: linear-gradient(135deg, #0D2855, #1B72C0);
//           -webkit-background-clip: text;
//           -webkit-text-fill-color: transparent;
//           background-clip: text;
//         }
//         .wbl-hero-bg {
//           background: linear-gradient(160deg, #f0f7ff 0%, #F6FEF0 60%, #ffffff 100%);
//         }
//         .wbl-protection-card {
//           background: #fff;
//           border: 1px solid #e2e8f0;
//           border-radius: 24px;
//         }
//       `}</style>

//     <div className="min-h-screen font-sans wbl-hero-bg">

//       {/* ══ NAVBAR ══ */}
//       <nav className="sticky top-0 z-50 bg-white border-b border-gray-200">
//         <div className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between" style={{ maxWidth: "1280px" }}>
//           <img
//             src="/weblance.jpeg"
//             alt="Weblance"
//             style={{ height: 44, width: "auto", cursor: "pointer" }}
//             onClick={() => navigate("/hire-talent")}
//           />
//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="text-sm font-medium px-4 py-2 text-gray-600 hover:text-gray-900 transition"
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="wbl-btn-primary"
//               style={{ padding: "10px 22px", fontSize: "14px", borderRadius: "10px" }}
//             >
//               Hire Talent
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ══ HERO ══ */}
//       <section className="pt-20 pb-14 px-4 text-center">

//         {/* Badge */}
//         <div className="flex justify-center mb-6">
//           <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase"
//             style={{ background: "linear-gradient(135deg,#e8f4ff,#dff5e8)", color: "#1B72C0", border: "1.5px solid #b3d9f5" }}>
//             Client Platform
//           </span>
//         </div>

//         {/* Heading */}
//         <h1 className="font-extrabold leading-tight mb-5 mx-auto"
//           style={{ fontSize: "clamp(2.8rem,6vw,4rem)", color: "#0D2855", maxWidth: "700px", lineHeight: 1.1 }}>
//           Turn Your Ideas<br />
//           <span style={{ background: "linear-gradient(135deg,#1B72C0,#6FDA44)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
//             Into Reality
//           </span>
//         </h1>

//         {/* Subtitle */}
//         <p className="text-base mb-10 mx-auto" style={{ color: "#64748b", maxWidth: "500px" }}>
//           AI-powered project planning &bull; Verified talent &bull; Secure payments
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <button onClick={() => navigate("/hire-talent/onboarding")} className="wbl-btn-primary">
//             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="2"/>
//               <path d="M17 14v6m-3-3h6" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//             Hire Talent / Post a Project →
//           </button>

//           <button
//             onClick={() => document.getElementById("protection-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="wbl-btn-outline"
//           >
//             <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z"/>
//             </svg>
//             How It Works
//           </button>
//         </div>

//         {/* Trust strip */}
//         <div className="flex items-center justify-center gap-6 mt-10 flex-wrap">
//           {["No upfront fees", "Hire in 48hrs", "100% secure escrow"].map((t, i) => (
//             <span key={i} className="flex items-center gap-1.5 text-sm text-gray-500 font-medium">
//               <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
//                 <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//               </svg>
//               {t}
//             </span>
//           ))}
//         </div>
//       </section>

//       {/* ══ FEATURE CARDS ══ */}
//       <section className="pb-16 px-4">
//         <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5" style={{ maxWidth: "1100px" }}>
//           {FEATURES.map((f, i) => (
//             <div key={i} className="wbl-feature-card flex flex-col items-center text-center gap-5 px-8 py-12">
//               <div className="w-14 h-14 flex items-center justify-center flex-shrink-0 wbl-icon-bg">
//                 {f.icon}
//               </div>
//               <div>
//                 <h3 className="font-bold text-base mb-1.5" style={{ color: "#0D2855" }}>{f.title}</h3>
//                 <p className="text-sm leading-relaxed" style={{ color: "#94a3b8" }}>{f.desc}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ PROTECTION SECTION ══ */}
//       <section id="protection-section" className="pb-14 px-4">
//         <div className="mx-auto wbl-protection-card p-10 sm:p-14" style={{ maxWidth: "860px" }}>

//           {/* Section label */}
//           <div className="flex justify-center mb-4">
//             <span className="text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest"
//               style={{ background: "#F6FEF0", color: "#1B72C0", border: "1px solid #b3f0c5" }}>
//               Client Protection
//             </span>
//           </div>

//           <h2 className="font-extrabold text-center mb-10"
//             style={{ fontSize: "clamp(1.2rem,2.8vw,1.6rem)", color: "#0D2855" }}>
//             You won't be left alone if something goes wrong
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
//             <div className="flex flex-col gap-5">
//               {["Escrow protection", "Quality guarantees", "Dispute resolution"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//             <div className="flex flex-col gap-5">
//               {["Milestone approvals", "24/7 admin support"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ STATS ══ */}
//       <section className="pb-24 px-4">
//         <div className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center" style={{ maxWidth: "860px" }}>
//           {STATS.map((s, i) => (
//             <div key={i} className="flex flex-col items-center">
//               <span className="font-extrabold tracking-tight wbl-stat-value"
//                 style={{ fontSize: "clamp(2rem,4vw,2.8rem)" }}>
//                 {s.value}
//               </span>
//               <span className="text-sm font-medium mt-1" style={{ color: "#64748b" }}>{s.label}</span>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ FOOTER CTA ══ */}
//       <section className="pb-20 px-4 text-center">
//         <div className="mx-auto wbl-bg rounded-3xl p-12 sm:p-16" style={{ maxWidth: "760px" }}>
//           <h2 className="font-extrabold text-white mb-3" style={{ fontSize: "clamp(1.6rem,3vw,2.2rem)" }}>
//             Ready to build something great?
//           </h2>
//           <p className="text-blue-200 mb-8 text-base">Post your project in minutes — no credit card required.</p>
//           <button onClick={() => navigate("/hire-talent/onboarding")}
//             className="inline-flex items-center gap-2 bg-white font-bold px-8 py-4 rounded-xl text-base transition hover:bg-green-50"
//             style={{ color: "#0D2855", boxShadow: "0 4px 20px rgba(0,0,0,0.15)" }}>
//             Get Started Free →
//           </button>
//         </div>
//       </section>

//     </div>
//     </>
//   );
// }

// function ProtectionItem({ label }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
//         style={{ background: "linear-gradient(135deg,#6FDA44,#1B72C0)" }}>
//         <svg className="w-3.5 h-3.5" fill="none" stroke="white" viewBox="0 0 24 24">
//           <path d="M5 13l4 4L19 7" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
//         </svg>
//       </span>
//       <span className="text-base font-medium" style={{ color: "#374151" }}>{label}</span>
//     </div>
//   );
// }





// import { useNavigate } from "react-router-dom";

// /* ─── Feature card data ─── */
// const FEATURES = [
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="1.8"/>
//         <path d="M17 14v6m-3-3h6" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "AI Project Definition",
//     desc: "No technical knowledge needed",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//         <path d="M9 12l2 2 4-4" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Verified Talent",
//     desc: "Background-checked professionals",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <rect x="5" y="11" width="14" height="10" rx="2" strokeWidth="1.8"/>
//         <path d="M8 11V7a4 4 0 018 0v4" strokeWidth="1.8" strokeLinecap="round"/>
//       </svg>
//     ),
//     title: "Secure Payments",
//     desc: "Pay only when satisfied",
//   },
//   {
//     icon: (
//       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeWidth="1.8" strokeLinejoin="round"/>
//       </svg>
//     ),
//     title: "Admin Protection",
//     desc: "You're never alone if issues arise",
//   },
// ];

// const STATS = [
//   { value: "94%",     label: "Completion Rate",       star: false },
//   { value: "12,000+", label: "Active Projects",        star: false },
//   { value: "8,500+",  label: "Verified Professionals", star: false },
//   { value: "4.8",     label: "Avg Rating",             star: true  },
// ];

// /* ─── Component ─── */
// export default function LandingPage() {
//   const navigate = useNavigate();

//   return (
//     <div
//       className="min-h-screen font-sans"
//       style={{ backgroundColor: "#eef2ff" }}
//     >

//       {/* ══ NAVBAR ══ */}
//       <nav
//         className="sticky top-0 z-50"
//         style={{
//           backgroundColor: "white",
//           borderBottom: "1px solid #e2e8f0",
//         }}
//       >
//         <div
//           className="mx-auto px-6 lg:px-10 h-16 flex items-center justify-between"
//           style={{ maxWidth: "1280px" }}
//         >
//           <span
//             className="text-2xl font-extrabold cursor-pointer"
//             style={{ color: "#3b5bdb" }}
//             onClick={() => navigate("/hire-talent")}
//           >
//             ArcLancer
//           </span>

//           <div className="flex items-center gap-3">
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="text-sm font-medium px-4 py-2"
//               style={{ color: "#374151" }}
//             >
//               Sign In
//             </button>
//             <button
//               onClick={() => navigate("/hire-talent/onboarding")}
//               className="text-sm font-bold px-5 py-2.5 rounded-lg text-white"
//               style={{ backgroundColor: "#3b5bdb" }}
//             >
//               Hire Talent
//             </button>
//           </div>
//         </div>
//       </nav>

//       {/* ══ HERO ══ */}
//       <section className="pt-16 pb-12 px-4 text-center">

//         {/* Badge */}
//         <div className="flex justify-center mb-5">
//           <span
//             className="inline-block px-4 py-1 rounded-full text-xs font-bold tracking-widest uppercase"
//             style={{
//               backgroundColor: "#e0e7ff",
//               color: "#3b5bdb",
//               border: "1.5px solid #a5b4fc",
//             }}
//           >
//             Client Platform
//           </span>
//         </div>

//         {/* Heading */}
//         <h1
//           className="font-extrabold leading-tight mb-5 mx-auto"
//           style={{
//             fontSize: "clamp(2.8rem, 6vw, 4rem)",
//             color: "#1e293b",
//             maxWidth: "700px",
//             lineHeight: 1.1,
//           }}
//         >
//           Turn Your Ideas<br />Into Reality
//         </h1>

//         {/* Subtitle */}
//         <p
//           className="text-base mb-10 mx-auto"
//           style={{ color: "#64748b", maxWidth: "500px" }}
//         >
//           AI-powered project planning &bull; Verified talent &bull; Secure payments
//         </p>

//         {/* Buttons */}
//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <button
//             onClick={() => navigate("/hire-talent/onboarding")}
//             className="flex items-center gap-2.5 font-bold px-7 py-4 rounded-xl text-white text-base"
//             style={{ backgroundColor: "#3b5bdb" }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//               <rect x="3"  y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="14" y="3"  width="7" height="7" rx="1" strokeWidth="2"/>
//               <rect x="3"  y="14" width="7" height="7" rx="1" strokeWidth="2"/>
//               <path d="M17 14v6m-3-3h6" strokeWidth="2" strokeLinecap="round"/>
//             </svg>
//             Hire Talent / Post a Project &rarr;
//           </button>

//           <button
//             onClick={() => document.getElementById("protection-section")?.scrollIntoView({ behavior: "smooth" })}
//             className="flex items-center gap-2.5 font-semibold px-7 py-4 rounded-xl border text-base"
//             style={{
//               backgroundColor: "white",
//               color: "#374151",
//               borderColor: "#d1d5db",
//             }}
//           >
//             <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
//               <path d="M8 5v14l11-7z"/>
//             </svg>
//             How It Works
//           </button>
//         </div>
//       </section>

//       {/* ══ FEATURE CARDS ══
//           Reference: all 4 cards white with border, same style   */}
//       <section className="pb-16 px-4">
//         <div
//           className="mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
//           style={{ maxWidth: "1100px" }}
//         >
//           {FEATURES.map((f, i) => (
//             <div
//               key={i}
//               className="flex flex-col items-center text-center gap-5 px-8 py-12"
//               style={{
//                 backgroundColor: "white",
//                 border: "1px solid #e2e8f0",
//                 borderRadius: "16px",
//               }}
//             >
//               {/* Rounded-square icon bg */}
//               <div
//                 className="w-14 h-14 flex items-center justify-center flex-shrink-0"
//                 style={{
//                   backgroundColor: "#e0e7ff",
//                   borderRadius: "14px",
//                   color: "#3b5bdb",
//                 }}
//               >
//                 {f.icon}
//               </div>

//               <div>
//                 <h3
//                   className="font-bold text-base mb-1.5"
//                   style={{ color: "#1e293b" }}
//                 >
//                   {f.title}
//                 </h3>
//                 <p
//                   className="text-sm leading-relaxed"
//                   style={{ color: "#94a3b8" }}
//                 >
//                   {f.desc}
//                 </p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </section>

//       {/* ══ PROTECTION SECTION ══ */}
//       <section id="protection-section" className="pb-14 px-4">
//         <div
//           className="mx-auto rounded-3xl p-10 sm:p-14"
//           style={{
//             maxWidth: "860px",
//             backgroundColor: "white",
//             border: "1px solid #e2e8f0",
//           }}
//         >
//           <h2
//             className="font-extrabold text-center mb-10"
//             style={{
//               fontSize: "clamp(1.2rem, 2.8vw, 1.6rem)",
//               color: "#1e293b",
//             }}
//           >
//             You won't be left alone if something goes wrong
//           </h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-5">
//             {/* Left */}
//             <div className="flex flex-col gap-5">
//               {["Escrow protection", "Quality guarantees", "Dispute resolution"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//             {/* Right */}
//             <div className="flex flex-col gap-5">
//               {["Milestone approvals", "24/7 admin support"].map(item => (
//                 <ProtectionItem key={item} label={item} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* ══ STATS ══
//           Reference: plain numbers directly on page bg, no card   */}
//       <section className="pb-24 px-4">
//         <div
//           className="mx-auto grid grid-cols-2 lg:grid-cols-4 gap-6 text-center"
//           style={{ maxWidth: "860px" }}
//         >
//           {STATS.map((s, i) => (
//             <div key={i} className="flex flex-col items-center">
//               <div className="flex items-center gap-1.5">
//                 <span
//                   className="font-extrabold tracking-tight"
//                   style={{
//                     fontSize: "clamp(2rem, 4vw, 2.8rem)",
//                     color: "#1e293b",
//                   }}
//                 >
//                   {s.value}
//                 </span>
//                 {s.star && (
//                   <span style={{ fontSize: "1.6rem", color: "#f59e0b", lineHeight: 1 }}>
//                     ★
//                   </span>
//                 )}
//               </div>
//               <span
//                 className="text-sm font-medium mt-1"
//                 style={{ color: "#64748b" }}
//               >
//                 {s.label}
//               </span>
//             </div>
//           ))}
//         </div>
//       </section>

//     </div>
//   );
// }

// /* ─── Helper ─── */
// function ProtectionItem({ label }) {
//   return (
//     <div className="flex items-center gap-3">
//       <span
//         className="flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center"
//         style={{ backgroundColor: "#dcfce7" }}
//       >
//         <svg
//           className="w-3.5 h-3.5"
//           fill="none"
//           stroke="#22c55e"
//           viewBox="0 0 24 24"
//         >
//           <path
//             d="M5 13l4 4L19 7"
//             strokeWidth="2.5"
//             strokeLinecap="round"
//             strokeLinejoin="round"
//           />
//         </svg>
//       </span>
//       <span className="text-base" style={{ color: "#374151" }}>
//         {label}
//       </span>
//     </div>
//   );
// }






// LandingPage.jsx  (Hire Talent)
import React, { useEffect, useRef } from "react";
import { ShieldCheck, DollarSign, Users, Scale, CheckCircle } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

/* ── Neural Background ── same as freelancer page ── */
const NeuralBg = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId, nodes = [];
    const NODE_COUNT = 38, MAX_DIST = 100;

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.60,
        vy: (Math.random() - 0.5) * 0.60,
        r: Math.random() < 0.18 ? 4.2 : Math.random() < 0.45 ? 2.8 : 1.9,
        opacity: 0.10 + Math.random() * 0.15,
        isBlue: Math.random() > 0.55,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist/MAX_DIST) * 0.10;
            ctx.beginPath();
            ctx.strokeStyle = (nodes[i].isBlue && nodes[j].isBlue)
              ? `rgba(27,114,192,${a})`
              : (!nodes[i].isBlue && !nodes[j].isBlue)
              ? `rgba(111,218,68,${a})`
              : `rgba(60,170,130,${a})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        const pr = n.r + Math.sin(n.pulse) * 0.9;
        const op = n.opacity + Math.sin(n.pulse) * 0.05;
        const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 3.2);
        grd.addColorStop(0, n.isBlue ? `rgba(27,114,192,${op*0.4})` : `rgba(111,218,68,${op*0.4})`);
        grd.addColorStop(1, "rgba(255,255,255,0)");
        ctx.beginPath(); ctx.arc(n.x, n.y, pr*3.2, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
        ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI*2);
        ctx.fillStyle = n.isBlue ? `rgba(27,114,192,${op})` : `rgba(111,218,68,${op})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize(); initNodes(); draw();
    const obs = new ResizeObserver(() => { resize(); initNodes(); });
    obs.observe(canvas);
    return () => { cancelAnimationFrame(animationId); obs.disconnect(); };
  }, []);

  return (
    <canvas ref={canvasRef}
      style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", display:"block" }}/>
  );
};

/* ── Main Component ── */
const LandingPage = () => {
  const navigate = useNavigate();
  const toOnboarding = () => navigate("/hire-talent/onboarding");

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        .lp-root * { font-family: 'Poppins', sans-serif; }

        @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        .lp-nav-anim { animation: fadeDown .5s ease both; }

        .lp-nav {
          display: flex; align-items: center; justify-content: space-between;
          background: #fff; border-radius: 100px; border: 1px solid #E4F0DC;
          padding: 6px 10px 6px 14px;
          box-shadow: 0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05);
        }

        .lp-sign-in {
          background: none; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-size: 14px;
          font-weight: 500; color: #4B5563; transition: color .2s; padding: 6px 12px;
        }
        .lp-sign-in:hover { color: #0D2855; }

        .lp-join-btn {
          display: inline-flex; align-items: center; gap: 7px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color: #fff; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          font-size: 13.5px; padding: 10px 22px; border-radius: 100px;
          box-shadow: 0 3px 14px rgba(13,40,85,0.26); transition: all .2s; white-space: nowrap;
        }
        .lp-join-btn:hover {
          background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
          transform: translateY(-1px); box-shadow: 0 5px 20px rgba(13,40,85,0.36);
        }

        .lp-btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color: #fff; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          border-radius: 12px; padding: 13px 32px; font-size: 15px;
          box-shadow: 0 3px 18px rgba(13,40,85,0.28); transition: all .2s;
        }
        .lp-btn-primary:hover {
          background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
          transform: translateY(-1px); box-shadow: 0 5px 22px rgba(13,40,85,0.38);
        }

        .lp-btn-ghost {
          display: inline-flex; align-items: center; gap: 8px;
          background: #fff; color: #1C1C1C; border: 1.5px solid #D1E8FF;
          cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 500;
          border-radius: 12px; padding: 12px 32px; font-size: 15px; transition: all .2s;
        }
        .lp-btn-ghost:hover {
          border-color: #1B72C0; color: #0D2855; background: #F0F7FF; transform: translateY(-1px);
        }

        .lp-feat-card {
          background: #fff; border-radius: 16px; padding: 32px; text-align: center;
          border: 1px solid #E8F5E1; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
          transition: all .22s ease; cursor: default;
        }
        .lp-feat-card:hover {
          transform: translateY(-4px); box-shadow: 0 10px 32px rgba(27,114,192,0.13); border-color: #6FDA44;
        }

        .lp-stat { transition: transform .2s; cursor: default; }
        .lp-stat:hover { transform: translateY(-3px); }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
      `}</style>

      <div className="lp-root min-h-screen" style={{ background: "#FFFFFF" }}>

        {/* ══ FLOATING PILL NAVBAR ══ */}
        <div className="lp-nav-anim"
          style={{ position:"fixed", top:16, left:0, right:0, zIndex:50,
            display:"flex", justifyContent:"center", padding:"0 24px", pointerEvents:"none" }}>
          <div style={{ width:"100%", maxWidth:860, pointerEvents:"auto" }}>
            <div className="lp-nav">
              {/* ── Logo ── */}
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                onClick={() => navigate("/hire-talent")}
                style={{ height:55, width:160, display:"block", cursor:"pointer" }}
              />
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <button className="lp-sign-in" onClick={toOnboarding}>Sign In</button>
                <button className="lp-join-btn" onClick={toOnboarding}>
                  Hire Talent <FiArrowUpRight size={13} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Spacer */}
        <div style={{ height: 90 }} />

        {/* ══ HERO ══ */}
        <section className="text-center py-20 px-6" style={{ position:"relative", overflow:"hidden" }}>
          <NeuralBg />
          {/* White radial glow to fade animation */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
          }}/>

          <div className="max-w-4xl mx-auto" style={{ position:"relative", zIndex:10 }}>

            {/* Badge — Green pill (same as freelancer page) */}
            <span style={{
              display:"inline-block", background:"#DCFCE7", color:"#1A3D1F",
              padding:"5px 18px", borderRadius:100, fontSize:12, fontWeight:600,
              letterSpacing:"2px", textTransform:"uppercase", marginBottom:24,
              border:"1px solid #D1FAE5",
            }}>
              CLIENT PLATFORM
            </span>

            {/* Heading */}
            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontSize:"clamp(32px,5vw,58px)",
              fontWeight:800, lineHeight:1.15, color:"#0D2855", marginBottom:20,
            }}>
              Turn Your Ideas <br />
              <span style={{
                background:"linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>Into Reality</span>
            </h2>

            <p style={{ color:"#6B7280", fontSize:17, maxWidth:520, margin:"0 auto 36px" }}>
              AI-powered project planning &bull; Verified talent &bull; Secure payments
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="lp-btn-primary" onClick={toOnboarding}>
                Hire Talent / Post a Project →
              </button>
              <button className="lp-btn-ghost"
                onClick={() => document.getElementById("protection-section")?.scrollIntoView({ behavior:"smooth" })}>
                ▶ How It Works
              </button>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<Users size={28}/>}       title="Verified Talent Only"       desc="Background-checked professionals, no fake profiles" />
            <FeatureCard icon={<DollarSign size={28}/>}  title="Secure Milestone Payments"  desc="Pay only when you approve each milestone" />
            <FeatureCard icon={<ShieldCheck size={28}/>} title="AI Project Definition"      desc="No technical knowledge needed — AI guides you" />
            <FeatureCard icon={<Scale size={28}/>}       title="Admin Protection"           desc="You're never alone if something goes wrong" />
          </div>
        </section>

        {/* ══ WHY SECTION ══ */}
        <section id="protection-section" className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
          <div className="max-w-5xl mx-auto rounded-2xl p-10"
            style={{ background:"#fff", border:"1px solid #DBEAFE", boxShadow:"0 4px 24px rgba(27,114,192,0.07)" }}>
            <h3 style={{
              fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22,
              color:"#0D2855", textAlign:"center", marginBottom:32,
            }}>
              You won't be left alone if something goes wrong
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <CheckItem text="Escrow protection on every project" />
              <CheckItem text="Dispute resolution by admin team" />
              <CheckItem text="Milestone approvals — pay only when satisfied" />
              <CheckItem text="24/7 admin support" />
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="px-6 pb-24" style={{ background:"#FFFFFF" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
            <Stat number="94%"     label="Completion Rate" />
            <Stat number="12,000+" label="Active Projects" />
            <Stat number="8,500+"  label="Verified Professionals" />
            <Stat number="4.8 ★"   label="Avg Rating" />
          </div>
        </section>

      </div>
    </>
  );
};

/* ── Sub-components ── identical style to freelancer page ── */
const FeatureCard = ({ icon, title, desc }) => (
  <div className="lp-feat-card">
    <div style={{
      width:56, height:56, margin:"0 auto 16px",
      display:"flex", alignItems:"center", justifyContent:"center",
      borderRadius:"50%", background:"linear-gradient(135deg,#DCFCE7,#DBEAFE)",
      color:"#1B72C0", border:"1px solid #D1FAE5",
    }}>{icon}</div>
    <h4 style={{ fontWeight:600, fontSize:15, marginBottom:8, color:"#0D2855" }}>{title}</h4>
    <p style={{ color:"#6B7280", fontSize:13 }}>{desc}</p>
  </div>
);

const CheckItem = ({ text }) => (
  <div className="flex items-center gap-3">
    <CheckCircle size={20} style={{ color:"#6FDA44", flexShrink:0 }}/>
    <p style={{ fontSize:14, color:"#374151" }}>{text}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="lp-stat">
    <h4 style={{ fontSize:30, fontWeight:800, color:"#0D2855", fontFamily:"'Poppins',sans-serif" }}>{number}</h4>
    <p style={{ color:"#6B7280", marginTop:8, fontSize:13 }}>{label}</p>
  </div>
);

export default LandingPage;