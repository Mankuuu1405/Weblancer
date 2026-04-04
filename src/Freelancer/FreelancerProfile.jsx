// // import React, { useState } from "react";
// // import { FiArrowLeft, FiMapPin, FiClock } from "react-icons/fi";
// // import { BsGithub, BsLinkedin, BsGlobe, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
// // import { MdVerified } from "react-icons/md";
// // import { HiOutlineMail } from "react-icons/hi";
// // import { RiSendPlaneLine } from "react-icons/ri";

// // const STYLE = `
// //   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
// //   .fp-root { font-family: 'Poppins', sans-serif; }
// //   .fp-btn-green {
// //     background: #6FDA44; color: #fff; border: none; cursor: pointer;
// //     font-weight: 600; border-radius: 10px; transition: all .18s;
// //   }
// //   .fp-btn-green:hover { background: #5ec938; transform: translateY(-1px); }
// //   .fp-btn-outline {
// //     background: #fff; color: #1a1a1a; border: 1.5px solid #e5e7eb;
// //     cursor: pointer; font-weight: 500; border-radius: 10px; transition: all .18s;
// //   }
// //   .fp-btn-outline:hover { border-color: #6FDA44; color: #3a8c1c; }
// //   .fp-tab-active {
// //     background: #fff !important; color: #1a1a1a !important;
// //     font-weight: 700 !important; box-shadow: 0 1px 6px rgba(0,0,0,0.08);
// //   }
// //   .fp-skill-tag {
// //     display: inline-flex; align-items: center; gap: 5px;
// //     padding: 4px 12px; border-radius: 20px;
// //     border: 1.5px solid #e5e7eb;
// //     font-size: 12px; font-weight: 500; color: #374151; background: #fff;
// //   }
// //   .fp-dot-bg {
// //     background-image: radial-gradient(circle, #6FDA44 1px, transparent 1px);
// //     background-size: 28px 28px;
// //   }
// //   .fp-section-card {
// //     background: #fff; border-radius: 16px;
// //     padding: 28px 32px; border: 1px solid #f0f0f0;
// //   }
// // `;

// // const user = {
// //   name: "John Smith",
// //   title: "Full-Stack React & Node.js Developer",
// //   location: "Mumbai, India",
// //   timezone: "IST",
// //   projects: 3,
// //   rating: 4.9,
// //   rate: "$75/hr",
// //   availability: "Available Immediately",
// //   hours: "40h/week",
// //   avatar: "J",
// //   skills: [
// //     { label: "Pro+ React.js",      color: "#3b82f6" },
// //     { label: "Verified Node.js",   color: "#10b981", verified: true },
// //     { label: "Elite UI/UX Design", color: "#8b5cf6" },
// //     { label: "Pro+ TypeScript",    color: "#3b82f6" },
// //   ],
// //   about:
// //     "John is a full-stack React and Node.js developer with 5+ years of experience building production-grade web applications. Specializing in e-commerce and SaaS platforms, he has delivered 23 projects across 8 countries with a 4.9-star client satisfaction rating. His code quality is AI-verified at 84/100, and his portfolio includes 3 live applications serving 50K+ users. Available immediately for full-time engagement.",
// //   links: [
// //     { icon: <BsGithub />,   label: "github.com/johnsmith"      },
// //     { icon: <BsLinkedin />, label: "linkedin.com/in/johnsmith" },
// //     { icon: <BsGlobe />,    label: "johnsmith.dev"             },
// //   ],
// // };

// // const TABS = ["About", "Skills & Scores", "Portfolio", "Reviews", "Trust & Reliability"];

// // const StarRating = ({ rating }) => {
// //   const full = Math.floor(rating);
// //   const half = rating % 1 >= 0.5;
// //   return (
// //     <span className="inline-flex items-center gap-0.5">
// //       {[...Array(5)].map((_, i) =>
// //         i < full ? (
// //           <BsStarFill key={i} className="text-amber-400 text-sm" />
// //         ) : i === full && half ? (
// //           <BsStarHalf key={i} className="text-amber-400 text-sm" />
// //         ) : (
// //           <BsStar key={i} className="text-gray-300 text-sm" />
// //         )
// //       )}
// //     </span>
// //   );
// // };

// // /* ── Tab content components ── */

// // const AboutTab = () => (
// //   <div className="flex flex-col gap-5">
// //     <div className="fp-section-card">
// //       <h3 className="text-base font-bold text-gray-900 mb-3">About</h3>
// //       <p className="text-sm text-gray-600 leading-relaxed">{user.about}</p>
// //       <div className="flex flex-wrap gap-5 mt-5">
// //         {user.links.map((l, i) => (
// //           <span key={i} className="flex items-center gap-2 text-sm text-gray-500">
// //             <span className="text-gray-400">{l.icon}</span>
// //             {l.label}
// //           </span>
// //         ))}
// //       </div>
// //     </div>
// //     <div className="fp-section-card">
// //       <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
// //         <BsStarFill className="text-amber-400" /> Star Progression
// //       </h3>
// //       <p className="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
// //         <BsStarFill className="text-amber-400" />
// //         1 star per completed project · Current:{" "}
// //         <StarRating rating={3} />
// //         <span className="text-gray-500">(3)</span>
// //       </p>
// //       <p className="text-xs text-gray-400 mt-2">Bio auto-updates as projects are completed.</p>
// //     </div>
// //   </div>
// // );

// // const SkillsTab = () => (
// //   <div className="fp-section-card">
// //     <h3 className="text-base font-bold text-gray-900 mb-5">Skills & Scores</h3>
// //     <div className="flex flex-col gap-5">
// //       {[
// //         { skill: "React.js",     score: 92, level: "Pro+",     color: "#3b82f6" },
// //         { skill: "Node.js",      score: 88, level: "Verified", color: "#10b981" },
// //         { skill: "UI/UX Design", score: 95, level: "Elite",    color: "#8b5cf6" },
// //         { skill: "TypeScript",   score: 85, level: "Pro+",     color: "#3b82f6" },
// //       ].map((s) => (
// //         <div key={s.skill}>
// //           <div className="flex justify-between items-center mb-1.5">
// //             <span className="text-sm font-semibold text-gray-800">{s.skill}</span>
// //             <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: s.color }}>
// //               {s.level}
// //             </span>
// //           </div>
// //           <div className="w-full bg-gray-100 rounded-full h-2">
// //             <div className="h-2 rounded-full" style={{ width: `${s.score}%`, background: s.color }} />
// //           </div>
// //           <div className="text-xs text-gray-400 mt-1">AI Score: {s.score}/100</div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const PortfolioTab = () => (
// //   <div className="fp-section-card">
// //     <h3 className="text-base font-bold text-gray-900 mb-5">Portfolio</h3>
// //     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
// //       {[
// //         { title: "E-Commerce SaaS",    tech: "React, Node.js", users: "20K+ users" },
// //         { title: "Food Delivery App",  tech: "React Native",   users: "15K+ users" },
// //         { title: "Brand Dashboard",    tech: "Next.js, TS",    users: "10K+ users" },
// //       ].map((p) => (
// //         <div key={p.title} className="border border-gray-200 rounded-xl p-4 hover:border-green-300 transition-colors">
// //           <div className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-3xl"
// //                style={{ background: "linear-gradient(135deg,#f0fde8,#e8f4ff)" }}>💻</div>
// //           <div className="text-sm font-semibold text-gray-900">{p.title}</div>
// //           <div className="text-xs text-gray-500 mt-1">{p.tech}</div>
// //           <div className="text-xs font-medium mt-1" style={{ color: "#6FDA44" }}>{p.users}</div>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const ReviewsTab = () => (
// //   <div className="fp-section-card">
// //     <h3 className="text-base font-bold text-gray-900 mb-5">Reviews</h3>
// //     <div className="flex flex-col gap-4">
// //       {[
// //         { name: "ByteEats Co.",   rating: 5, text: "Excellent work! Delivered on time and exceeded expectations.", date: "Jan 2026" },
// //         { name: "TechStart Inc.", rating: 5, text: "Very professional, great communication throughout the project.", date: "Dec 2025" },
// //         { name: "DesignHub",      rating: 4, text: "Quality code and clean UI. Would hire again.",                 date: "Nov 2025" },
// //       ].map((r) => (
// //         <div key={r.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
// //           <div className="flex items-center justify-between mb-1">
// //             <span className="text-sm font-semibold text-gray-900">{r.name}</span>
// //             <span className="text-xs text-gray-400">{r.date}</span>
// //           </div>
// //           <StarRating rating={r.rating} />
// //           <p className="text-sm text-gray-600 mt-1">{r.text}</p>
// //         </div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const TrustTab = () => (
// //   <div className="fp-section-card">
// //     <h3 className="text-base font-bold text-gray-900 mb-5">Trust & Reliability</h3>
// //     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
// //       {[
// //         { label: "Projects Done", value: "23",   color: "#6FDA44" },
// //         { label: "On-Time Rate",  value: "97%",  color: "#3b82f6" },
// //         { label: "Response Time", value: "< 2h", color: "#8b5cf6" },
// //         { label: "AI Code Score", value: "84",   color: "#f59e0b" },
// //       ].map((s) => (
// //         <div key={s.label} className="text-center bg-gray-50 rounded-xl py-4 px-2">
// //           <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
// //           <div className="text-xs text-gray-500 mt-1">{s.label}</div>
// //         </div>
// //       ))}
// //     </div>
// //     <div className="flex flex-col gap-2">
// //       {["Identity Verified ✅","Payment Method Verified ✅","No Disputes on Record ✅","Background Check Passed ✅"].map((item) => (
// //         <div key={item} className="text-sm text-gray-700">{item}</div>
// //       ))}
// //     </div>
// //   </div>
// // );

// // const tabContent = {
// //   "About":               <AboutTab />,
// //   "Skills & Scores":     <SkillsTab />,
// //   "Portfolio":           <PortfolioTab />,
// //   "Reviews":             <ReviewsTab />,
// //   "Trust & Reliability": <TrustTab />,
// // };

// // /* ── Main Component ── */
// // const FreelancerProfile = ({ onBack }) => {
// //   const [activeTab, setActiveTab] = useState("About");

// //   return (
// //     <div className="fp-root min-h-screen" style={{ background: "#F6FEF0" }}>
// //       <style>{STYLE}</style>

// //       {/* Navbar */}
// //       <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
// //         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
// //           <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 150 }} />
// //           <button
// //             onClick={onBack}
// //             className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer"
// //           >
// //             <FiArrowLeft /> Back
// //           </button>
// //         </div>
// //       </header>

// //       {/* Page Content */}
// //       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative">

// //         {/* Dot background */}
// //         <div
// //           className="absolute inset-0 pointer-events-none opacity-25"
// //           style={{
// //             backgroundImage: "radial-gradient(circle, #6FDA44 1px, transparent 1px)",
// //             backgroundSize: "28px 28px",
// //           }}
// //         />

// //         <div className="relative z-10 flex flex-col gap-6">

// //           {/* ── Profile Hero ── */}
// //           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
// //             <div className="flex flex-col sm:flex-row sm:items-start gap-6">

// //               {/* Avatar + Info */}
// //               <div className="flex gap-5 flex-1 min-w-0">
// //                 <div
// //                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0"
// //                   style={{ background: "#e8fde0", color: "#3a8c1c" }}
// //                 >
// //                   {user.avatar}
// //                 </div>
// //                 <div className="flex flex-col gap-2 min-w-0">
// //                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h1>
// //                   <p className="text-sm text-gray-500">{user.title}</p>
// //                   <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
// //                     <span className="flex items-center gap-1"><FiMapPin />{user.location}</span>
// //                     <span className="flex items-center gap-1"><FiClock />{user.timezone}</span>
// //                     <span className="flex items-center gap-1">
// //                       <BsStarFill className="text-amber-400" />{user.projects} projects
// //                     </span>
// //                     <span>★ {user.rating} avg rating</span>
// //                   </div>
// //                   <div className="flex flex-wrap gap-2 mt-1">
// //                     {user.skills.map((s) => (
// //                       <span key={s.label} className="fp-skill-tag">
// //                         {s.verified
// //                           ? <MdVerified style={{ color: s.color }} />
// //                           : <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />}
// //                         {s.label}
// //                       </span>
// //                     ))}
// //                   </div>
// //                   <div className="flex items-center flex-wrap gap-4 mt-1 text-sm">
// //                     <span className="font-bold text-gray-900">{user.rate}</span>
// //                     <span className="font-medium flex items-center gap-1.5" style={{ color: "#3a8c1c" }}>
// //                       <span className="w-2 h-2 rounded-full bg-green-500" />
// //                       {user.availability}
// //                     </span>
// //                     <span className="text-gray-500">{user.hours}</span>
// //                   </div>
// //                 </div>
// //               </div>

// //               {/* Action Buttons */}
// //               <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0">
// //                 <button className="fp-btn-green inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
// //                   <RiSendPlaneLine /> Invite to Project
// //                 </button>
// //                 <button className="fp-btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
// //                   👁 View Portfolio
// //                 </button>
// //                 <button className="fp-btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
// //                   <HiOutlineMail /> Message
// //                 </button>
// //               </div>
// //             </div>
// //           </div>

// //           {/* ── Tabs ── */}
// //           <div className="bg-gray-100 rounded-full p-1 flex gap-1 overflow-x-auto">
// //             {TABS.map((tab) => (
// //               <button
// //                 key={tab}
// //                 onClick={() => setActiveTab(tab)}
// //                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all cursor-pointer border-none font-medium
// //                   ${activeTab === tab ? "fp-tab-active" : "bg-transparent text-gray-500 hover:text-gray-800"}`}
// //               >
// //                 {tab}
// //               </button>
// //             ))}
// //           </div>

// //           {/* ── Tab Content ── */}
// //           {tabContent[activeTab]}

// //         </div>
// //       </div>
// //     </div>
// //   );
// // };

// // export default FreelancerProfile;







// import React, { useState } from "react";
// import { FiArrowLeft, FiMapPin, FiClock } from "react-icons/fi";
// import { BsGithub, BsLinkedin, BsGlobe, BsStar, BsStarFill, BsStarHalf } from "react-icons/bs";
// import { MdVerified } from "react-icons/md";
// import { HiOutlineMail } from "react-icons/hi";
// import { RiSendPlaneLine } from "react-icons/ri";

// const STYLE = `
//   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//   .fp-root { font-family: 'Poppins', sans-serif; }
//   .fp-btn-primary {
//     background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//     color: #fff; border: none; cursor: pointer;
//     font-weight: 600; border-radius: 10px; transition: all .18s;
//     box-shadow: 0 3px 14px rgba(13,40,85,0.22);
//   }
//   .fp-btn-primary:hover { opacity: 0.88; transform: translateY(-1px); }
//   .fp-btn-outline {
//     background: #fff; color: #0D2855; border: 1.5px solid #e5e7eb;
//     cursor: pointer; font-weight: 500; border-radius: 10px; transition: all .18s;
//   }
//   .fp-btn-outline:hover { border-color: #1B72C0; color: #1B72C0; background: #f0f7ff; }
//   .fp-tab-bar { background: #f1f5f9; }
//   .fp-tab-active {
//     background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//     color: #fff !important; font-weight: 700 !important;
//     box-shadow: 0 2px 10px rgba(13,40,85,0.25);
//   }
//   .fp-skill-tag {
//     display: inline-flex; align-items: center; gap: 5px;
//     padding: 4px 12px; border-radius: 20px; border: 1.5px solid #e5e7eb;
//     font-size: 12px; font-weight: 500; color: #374151; background: #fff;
//   }
//   .fp-section-card {
//     background: #fff; border-radius: 16px;
//     padding: 28px 32px; border: 1px solid #eef2f7;
//     box-shadow: 0 1px 6px rgba(13,40,85,0.05);
//   }
//   .fp-avail { color: #1B72C0; }
//   .fp-progress-bar { background: linear-gradient(90deg, #0D2855, #1B72C0); }
//   .fp-stat-card { background: #f8faff; border-radius: 12px; }
// `;

// const user = {
//   name: "John Smith",
//   title: "Full-Stack React & Node.js Developer",
//   location: "Mumbai, India",
//   timezone: "IST",
//   projects: 3,
//   rating: 4.9,
//   rate: "$75/hr",
//   availability: "Available Immediately",
//   hours: "40h/week",
//   avatar: "J",
//   skills: [
//     { label: "Pro+ React.js",      color: "#3b82f6" },
//     { label: "Verified Node.js",   color: "#10b981", verified: true },
//     { label: "Elite UI/UX Design", color: "#8b5cf6" },
//     { label: "Pro+ TypeScript",    color: "#3b82f6" },
//   ],
//   about:
//     "John is a full-stack React and Node.js developer with 5+ years of experience building production-grade web applications. Specializing in e-commerce and SaaS platforms, he has delivered 23 projects across 8 countries with a 4.9-star client satisfaction rating. His code quality is AI-verified at 84/100, and his portfolio includes 3 live applications serving 50K+ users. Available immediately for full-time engagement.",
//   links: [
//     { icon: <BsGithub />,   label: "github.com/johnsmith"      },
//     { icon: <BsLinkedin />, label: "linkedin.com/in/johnsmith" },
//     { icon: <BsGlobe />,    label: "johnsmith.dev"             },
//   ],
// };

// const TABS = ["About", "Skills & Scores", "Portfolio", "Reviews", "Trust & Reliability"];

// const StarRating = ({ rating }) => {
//   const full = Math.floor(rating);
//   const half = rating % 1 >= 0.5;
//   return (
//     <span className="inline-flex items-center gap-0.5">
//       {[...Array(5)].map((_, i) =>
//         i < full ? (
//           <BsStarFill key={i} className="text-amber-400 text-sm" />
//         ) : i === full && half ? (
//           <BsStarHalf key={i} className="text-amber-400 text-sm" />
//         ) : (
//           <BsStar key={i} className="text-gray-300 text-sm" />
//         )
//       )}
//     </span>
//   );
// };

// /* ── Tab content components ── */

// const AboutTab = () => (
//   <div className="flex flex-col gap-5">
//     <div className="fp-section-card">
//       <h3 className="text-base font-bold text-gray-900 mb-3">About</h3>
//       <p className="text-sm text-gray-600 leading-relaxed">{user.about}</p>
//       <div className="flex flex-wrap gap-5 mt-5">
//         {user.links.map((l, i) => (
//           <span key={i} className="flex items-center gap-2 text-sm text-gray-500">
//             <span className="text-gray-400">{l.icon}</span>
//             {l.label}
//           </span>
//         ))}
//       </div>
//     </div>
//     <div className="fp-section-card">
//       <h3 className="text-base font-bold text-gray-900 mb-3 flex items-center gap-2">
//         <BsStarFill className="text-amber-400" /> Star Progression
//       </h3>
//       <p className="text-sm text-gray-600 flex items-center gap-2 flex-wrap">
//         <BsStarFill className="text-amber-400" />
//         1 star per completed project · Current:{" "}
//         <StarRating rating={3} />
//         <span className="text-gray-500">(3)</span>
//       </p>
//       <p className="text-xs text-gray-400 mt-2">Bio auto-updates as projects are completed.</p>
//     </div>
//   </div>
// );

// const SkillsTab = () => (
//   <div className="fp-section-card">
//     <h3 className="text-base font-bold text-gray-900 mb-5">Skills & Scores</h3>
//     <div className="flex flex-col gap-5">
//       {[
//         { skill: "React.js",     score: 92, level: "Pro+",     color: "#3b82f6" },
//         { skill: "Node.js",      score: 88, level: "Verified", color: "#10b981" },
//         { skill: "UI/UX Design", score: 95, level: "Elite",    color: "#8b5cf6" },
//         { skill: "TypeScript",   score: 85, level: "Pro+",     color: "#3b82f6" },
//       ].map((s) => (
//         <div key={s.skill}>
//           <div className="flex justify-between items-center mb-1.5">
//             <span className="text-sm font-semibold text-gray-800">{s.skill}</span>
//             <span className="text-xs font-bold px-2.5 py-0.5 rounded-full text-white" style={{ background: s.color }}>
//               {s.level}
//             </span>
//           </div>
//           <div className="w-full bg-gray-100 rounded-full h-2">
//             <div className="h-2 rounded-full fp-progress-bar" style={{ width: `${s.score}%` }} />
//           </div>
//           <div className="text-xs text-gray-400 mt-1">AI Score: {s.score}/100</div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const PortfolioTab = () => (
//   <div className="fp-section-card">
//     <h3 className="text-base font-bold text-gray-900 mb-5">Portfolio</h3>
//     <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//       {[
//         { title: "E-Commerce SaaS",    tech: "React, Node.js", users: "20K+ users" },
//         { title: "Food Delivery App",  tech: "React Native",   users: "15K+ users" },
//         { title: "Brand Dashboard",    tech: "Next.js, TS",    users: "10K+ users" },
//       ].map((p) => (
//         <div key={p.title} className="border border-gray-200 rounded-xl p-4 hover:border-blue-300 transition-colors">
//           <div className="w-full h-20 rounded-lg mb-3 flex items-center justify-center text-3xl"
//                style={{ background: "linear-gradient(135deg,#f0fde8,#e8f4ff)" }}>💻</div>
//           <div className="text-sm font-semibold text-gray-900">{p.title}</div>
//           <div className="text-xs text-gray-500 mt-1">{p.tech}</div>
//           <div className="text-xs font-medium mt-1" style={{ color: "#1B72C0" }}>{p.users}</div>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const ReviewsTab = () => (
//   <div className="fp-section-card">
//     <h3 className="text-base font-bold text-gray-900 mb-5">Reviews</h3>
//     <div className="flex flex-col gap-4">
//       {[
//         { name: "ByteEats Co.",   rating: 5, text: "Excellent work! Delivered on time and exceeded expectations.", date: "Jan 2026" },
//         { name: "TechStart Inc.", rating: 5, text: "Very professional, great communication throughout the project.", date: "Dec 2025" },
//         { name: "DesignHub",      rating: 4, text: "Quality code and clean UI. Would hire again.",                 date: "Nov 2025" },
//       ].map((r) => (
//         <div key={r.name} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
//           <div className="flex items-center justify-between mb-1">
//             <span className="text-sm font-semibold text-gray-900">{r.name}</span>
//             <span className="text-xs text-gray-400">{r.date}</span>
//           </div>
//           <StarRating rating={r.rating} />
//           <p className="text-sm text-gray-600 mt-1">{r.text}</p>
//         </div>
//       ))}
//     </div>
//   </div>
// );

// const TrustTab = () => (
//   <div className="fp-section-card">
//     <h3 className="text-base font-bold text-gray-900 mb-5">Trust & Reliability</h3>
//     <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
//       {[
//         { label: "Projects Done", value: "23",   color: "#6FDA44" },
//         { label: "On-Time Rate",  value: "97%",  color: "#3b82f6" },
//         { label: "Response Time", value: "< 2h", color: "#8b5cf6" },
//         { label: "AI Code Score", value: "84",   color: "#f59e0b" },
//       ].map((s) => (
//         <div key={s.label} className="text-center fp-stat-card py-4 px-2">
//           <div className="text-2xl font-extrabold" style={{ color: s.color }}>{s.value}</div>
//           <div className="text-xs text-gray-500 mt-1">{s.label}</div>
//         </div>
//       ))}
//     </div>
//     <div className="flex flex-col gap-2">
//       {["Identity Verified ✅","Payment Method Verified ✅","No Disputes on Record ✅","Background Check Passed ✅"].map((item) => (
//         <div key={item} className="text-sm text-gray-700">{item}</div>
//       ))}
//     </div>
//   </div>
// );

// const tabContent = {
//   "About":               <AboutTab />,
//   "Skills & Scores":     <SkillsTab />,
//   "Portfolio":           <PortfolioTab />,
//   "Reviews":             <ReviewsTab />,
//   "Trust & Reliability": <TrustTab />,
// };

// /* ── Main Component ── */
// const FreelancerProfile = ({ onBack }) => {
//   const [activeTab, setActiveTab] = useState("About");

//   return (
//     <div className="fp-root min-h-screen" style={{ background: "#fff" }}>
//       <style>{STYLE}</style>

//       {/* Navbar */}
//       <header className="sticky top-0 z-10 bg-white border-b border-gray-100 shadow-sm">
//         <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between">
//           <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 160 }} />
//           <button
//             onClick={onBack}
//             className="flex items-center gap-1.5 text-sm font-medium transition-colors bg-transparent border-none cursor-pointer" style={{color:"#1B72C0"}}
//           >
//             <FiArrowLeft /> Back
//           </button>
//         </div>
//       </header>

//       {/* Page Content */}
//       <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 relative">

//         {/* Dot background */}
//         <div
//           className="absolute inset-0 pointer-events-none opacity-25"
//           style={{
//             backgroundImage: "radial-gradient(circle, #1B72C0 1px, transparent 1px)",
//             backgroundSize: "28px 28px",
//           }}
//         />

//         <div className="relative z-10 flex flex-col gap-6">

//           {/* ── Profile Hero ── */}
//           <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">
//             <div className="flex flex-col sm:flex-row sm:items-start gap-6">

//               {/* Avatar + Info */}
//               <div className="flex gap-5 flex-1 min-w-0">
//                 <div
//                   className="w-20 h-20 sm:w-24 sm:h-24 rounded-full flex items-center justify-center text-3xl sm:text-4xl font-bold flex-shrink-0"
//                   style={{ background: "linear-gradient(135deg,#e8f0fb,#dbeafe)", color: "#0D2855" }}
//                 >
//                   {user.avatar}
//                 </div>
//                 <div className="flex flex-col gap-2 min-w-0">
//                   <h1 className="text-xl sm:text-2xl font-bold text-gray-900">{user.name}</h1>
//                   <p className="text-sm text-gray-500">{user.title}</p>
//                   <div className="flex items-center flex-wrap gap-x-4 gap-y-1 text-xs text-gray-500">
//                     <span className="flex items-center gap-1"><FiMapPin />{user.location}</span>
//                     <span className="flex items-center gap-1"><FiClock />{user.timezone}</span>
//                     <span className="flex items-center gap-1">
//                       <BsStarFill className="text-amber-400" />{user.projects} projects
//                     </span>
//                     <span>★ {user.rating} avg rating</span>
//                   </div>
//                   <div className="flex flex-wrap gap-2 mt-1">
//                     {user.skills.map((s) => (
//                       <span key={s.label} className="fp-skill-tag">
//                         {s.verified
//                           ? <MdVerified style={{ color: s.color }} />
//                           : <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />}
//                         {s.label}
//                       </span>
//                     ))}
//                   </div>
//                   <div className="flex items-center flex-wrap gap-4 mt-1 text-sm">
//                     <span className="font-bold text-gray-900">{user.rate}</span>
//                     <span className="fp-avail font-medium flex items-center gap-1.5">
//                       <span className="w-2 h-2 rounded-full" style={{background:"#6FDA44"}} />
//                       {user.availability}
//                     </span>
//                     <span className="text-gray-500">{user.hours}</span>
//                   </div>
//                 </div>
//               </div>

//               {/* Action Buttons */}
//               <div className="flex flex-row sm:flex-col gap-3 flex-shrink-0">
//                 <button className="fp-btn-primary inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
//                   <RiSendPlaneLine /> Invite to Project
//                 </button>
//                 <button className="fp-btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
//                   👁 View Portfolio
//                 </button>
//                 <button className="fp-btn-outline inline-flex items-center gap-2 px-5 py-2.5 text-sm sm:w-44 justify-center">
//                   <HiOutlineMail /> Message
//                 </button>
//               </div>
//             </div>
//           </div>

//           {/* ── Tabs ── */}
//           <div className="fp-tab-bar rounded-full p-1 flex gap-1 overflow-x-auto">
//             {TABS.map((tab) => (
//               <button
//                 key={tab}
//                 onClick={() => setActiveTab(tab)}
//                 className={`px-4 py-2 rounded-full text-sm whitespace-nowrap transition-all cursor-pointer border-none font-medium
//                   ${activeTab === tab ? "fp-tab-active" : "bg-transparent text-gray-500 hover:text-gray-800"}`}
//               >
//                 {tab}
//               </button>
//             ))}
//           </div>

//           {/* ── Tab Content ── */}
//           {tabContent[activeTab]}

//         </div>
//       </div>
//     </div>
//   );
// };

// export default FreelancerProfile;







// import { useState, useRef } from "react";

// const WBL_CSS = `
//   @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//   .wbl-root { font-family: 'Poppins', sans-serif; }
//   .wbl-btn { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff !important; border: none; cursor: pointer; font-weight: 600; border-radius: 10px; transition: all .18s; box-shadow: 0 3px 14px rgba(13,40,85,0.18); }
//   .wbl-btn:hover { opacity: 0.88; transform: translateY(-1px); }
//   .wbl-btn-outline { background: #fff; color: #1B72C0; border: 1.5px solid #1B72C0; cursor: pointer; font-weight: 600; border-radius: 10px; transition: all .18s; }
//   .wbl-btn-outline:hover { background: #eff6ff; }
//   .wbl-input { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 14px; font-size: 14px; font-family: 'Poppins', sans-serif; outline: none; width: 100%; background: #fff; transition: border .15s, box-shadow .15s; color: #1a1a2e; }
//   .wbl-input:focus { border-color: #1B72C0; box-shadow: 0 0 0 3px rgba(27,114,192,0.10); }
//   .wbl-input::placeholder { color: #b0b8c9; }
//   .wbl-label { font-size: 11px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: #6b7280; margin-bottom: 6px; display: block; }
//   .wbl-cat-active { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff !important; border-color: transparent !important; }
//   .wbl-cat { background: #fff; color: #374151; border: 1.5px solid #d1d5db; cursor: pointer; border-radius: 999px; padding: 5px 16px; font-size: 13px; font-weight: 500; transition: all .15s; }
//   .wbl-cat:hover:not(.wbl-cat-active) { border-color: #1B72C0; color: #1B72C0; background: #eff6ff; }
//   .wbl-section-card { background: #fff; border: 1.5px solid #e5e7eb; border-radius: 18px; padding: 28px 28px; margin-bottom: 20px; }
//   .wbl-logo-box { width: 72px; height: 72px; border-radius: 14px; background: #f0f7ff; border: 1.5px dashed #b8d9f5; display: flex; align-items: center; justify-content: center; overflow: hidden; cursor: pointer; transition: border-color .15s; }
//   .wbl-logo-box:hover { border-color: #1B72C0; }
//   .wbl-divider { border: none; border-top: 1.5px solid #f0f2f5; margin: 22px 0; }
//   .wbl-toast { position: fixed; bottom: 32px; right: 32px; background: linear-gradient(135deg,#0D2855,#1B72C0); color: #fff; padding: 13px 22px; border-radius: 12px; font-size: 14px; font-weight: 600; box-shadow: 0 6px 24px rgba(13,40,85,0.22); z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideUp .3s ease; }
//   @keyframes slideUp { from { transform: translateY(20px); opacity:0; } to { transform: translateY(0); opacity:1; } }
//   .wbl-select { border: 1.5px solid #e5e7eb; border-radius: 10px; padding: 10px 36px 10px 14px; font-size: 14px; font-family: 'Poppins', sans-serif; outline: none; width: 100%; background: #fff url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%236b7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E") no-repeat right 12px center; appearance: none; color: #1a1a2e; transition: border .15s; }
//   .wbl-select:focus { border-color: #1B72C0; box-shadow: 0 0 0 3px rgba(27,114,192,0.10); }
// `;

// const ALL_CATEGORIES = [
//   "Web Development", "Mobile Apps", "UI/UX Design",
//   "AI & ML", "DevOps", "Data Engineering",
//   "Blockchain", "QA Testing", "Cybersecurity",
// ];

// const TIMEZONES = [
//   "Asia/Kolkata (IST)", "Asia/Dubai (GST)", "Asia/Singapore (SGT)",
//   "Europe/London (GMT)", "Europe/Paris (CET)", "America/New_York (EST)",
//   "America/Los_Angeles (PST)", "America/Chicago (CST)", "Pacific/Auckland (NZST)",
// ];

// const CURRENCIES = [
//   { code: "INR", symbol: "₹", label: "INR (₹)" },
//   { code: "USD", symbol: "$", label: "USD ($)" },
//   { code: "EUR", symbol: "€", label: "EUR (€)" },
//   { code: "GBP", symbol: "£", label: "GBP (£)" },
//   { code: "AED", symbol: "د.إ", label: "AED (د.إ)" },
//   { code: "SGD", symbol: "S$", label: "SGD (S$)" },
// ];

// export default function AgencyProfile({ onBack }) {
//   const [logo, setLogo] = useState(null);
//   const [agencyName, setAgencyName] = useState("TechVision Solutions");
//   const [tagline, setTagline] = useState("Full-Stack Web & Mobile Agency");
//   const [bio, setBio] = useState(
//     "We build scalable, modern web and mobile applications for businesses across India. Specializing in React, Node.js, and React Native with a focus on clean code and great UX."
//   );
//   const [website, setWebsite] = useState("https://techvision.in");
//   const [github, setGithub] = useState("https://github.com/techvision-in");
//   const [linkedin, setLinkedin] = useState("");
//   const [timezone, setTimezone] = useState("Asia/Kolkata (IST)");
//   const [currency, setCurrency] = useState("INR (₹)");
//   const [categories, setCategories] = useState(["Web Development", "Mobile Apps", "UI/UX Design"]);
//   const [toast, setToast] = useState(false);
//   const [errors, setErrors] = useState({});
//   const fileRef = useRef();

//   const handleLogoChange = (e) => {
//     const file = e.target.files?.[0];
//     if (!file) return;
//     if (file.size > 2 * 1024 * 1024) {
//       setErrors(prev => ({ ...prev, logo: "Max file size is 2MB" }));
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (ev) => setLogo(ev.target.result);
//     reader.readAsDataURL(file);
//     setErrors(prev => ({ ...prev, logo: null }));
//   };

//   const toggleCategory = (cat) => {
//     setCategories(prev =>
//       prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
//     );
//   };

//   const validate = () => {
//     const errs = {};
//     if (!agencyName.trim()) errs.agencyName = "Agency name is required";
//     if (!tagline.trim()) errs.tagline = "Tagline is required";
//     if (!bio.trim()) errs.bio = "About / Bio is required";
//     if (website && !/^https?:\/\//.test(website)) errs.website = "Enter a valid URL (https://...)";
//     if (github && !/^https?:\/\//.test(github)) errs.github = "Enter a valid URL";
//     if (linkedin && !/^https?:\/\//.test(linkedin)) errs.linkedin = "Enter a valid URL";
//     if (categories.length === 0) errs.categories = "Select at least one category";
//     return errs;
//   };

//   const handleSave = () => {
//     const errs = validate();
//     if (Object.keys(errs).length > 0) { setErrors(errs); return; }
//     setErrors({});
//     setToast(true);
//     setTimeout(() => setToast(false), 3200);
//   };

//   return (
//     <div className="min-h-screen wbl-root" style={{ background: "#f8fafc" }}>
//       <style>{WBL_CSS}</style>

//       {/* ── Navbar ── */}
//       <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
//         <img src="/weblance.jpeg" alt="Weblance" style={{ height: 44, width: "auto" }} />
//         <div className="flex items-center gap-3">
//           {onBack && (
//             <button
//               onClick={onBack}
//               className="flex items-center gap-1.5 text-sm font-semibold px-4 py-2 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 transition"
//             >
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/>
//               </svg>
//               Back
//             </button>
//           )}
//           <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
//             style={{ background: "linear-gradient(135deg,#0D2855,#1B72C0)" }}>A</div>
//         </div>
//       </header>

//       {/* ── Page Body ── */}
//       <div className="max-w-3xl mx-auto px-4 py-10">

//         {/* Page heading */}
//         <div className="mb-8">
//           <h1 className="text-2xl font-bold" style={{ color: "#0D2855" }}>Agency Profile</h1>
//           <p className="text-sm text-gray-500 mt-1">Public-facing agency information</p>
//         </div>

//         {/* ─── Agency Logo ─── */}
//         <div className="wbl-section-card">
//           <h2 className="text-base font-bold text-gray-800 mb-1">Agency Logo</h2>
//           <p className="text-xs text-gray-400 mb-5">PNG or JPG, max 2MB · 400×400px recommended</p>

//           <div className="flex items-center gap-5">
//             {/* Logo preview */}
//             <div className="wbl-logo-box flex-shrink-0" onClick={() => fileRef.current?.click()}>
//               {logo ? (
//                 <img src={logo} alt="Agency logo" className="w-full h-full object-cover rounded-[13px]" />
//               ) : (
//                 <svg className="w-8 h-8" fill="none" stroke="#1B72C0" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
//                     d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
//                 </svg>
//               )}
//             </div>

//             <div className="flex flex-col gap-2">
//               <div className="flex gap-2">
//                 <button className="wbl-btn text-xs px-4 py-2" onClick={() => fileRef.current?.click()}>
//                   Upload Logo
//                 </button>
//                 {logo && (
//                   <button className="wbl-btn-outline text-xs px-4 py-2" onClick={() => setLogo(null)}>
//                     Remove
//                   </button>
//                 )}
//               </div>
//               {errors.logo && <p className="text-xs text-red-500">{errors.logo}</p>}
//             </div>

//             <input ref={fileRef} type="file" accept="image/png,image/jpeg"
//               className="hidden" onChange={handleLogoChange} />
//           </div>
//         </div>

//         {/* ─── Basic Info ─── */}
//         <div className="wbl-section-card">
//           <h2 className="text-base font-bold text-gray-800 mb-6">Basic Information</h2>

//           {/* Agency Name */}
//           <div className="mb-5">
//             <label className="wbl-label">Agency Name</label>
//             <input
//               type="text"
//               value={agencyName}
//               onChange={e => { setAgencyName(e.target.value); setErrors(p => ({ ...p, agencyName: null })); }}
//               className="wbl-input"
//               placeholder="Your Agency Name"
//             />
//             {errors.agencyName && <p className="text-xs text-red-500 mt-1">{errors.agencyName}</p>}
//           </div>

//           {/* Tagline */}
//           <div className="mb-5">
//             <label className="wbl-label">Tagline</label>
//             <input
//               type="text"
//               value={tagline}
//               onChange={e => { setTagline(e.target.value); setErrors(p => ({ ...p, tagline: null })); }}
//               className="wbl-input"
//               placeholder="e.g. Full-Stack Web & Mobile Agency"
//             />
//             {errors.tagline && <p className="text-xs text-red-500 mt-1">{errors.tagline}</p>}
//           </div>

//           {/* About / Bio */}
//           <div>
//             <label className="wbl-label">About / Bio</label>
//             <textarea
//               value={bio}
//               onChange={e => { setBio(e.target.value); setErrors(p => ({ ...p, bio: null })); }}
//               rows={4}
//               className="wbl-input"
//               style={{ resize: "vertical", minHeight: 100 }}
//               placeholder="Describe your agency, expertise, and what makes you different..."
//             />
//             <div className="flex justify-between items-center mt-1">
//               {errors.bio
//                 ? <p className="text-xs text-red-500">{errors.bio}</p>
//                 : <span />
//               }
//               <span className="text-xs text-gray-400 ml-auto">{bio.length}/500</span>
//             </div>
//           </div>
//         </div>

//         {/* ─── Links & Location ─── */}
//         <div className="wbl-section-card">
//           <h2 className="text-base font-bold text-gray-800 mb-6">Links &amp; Location</h2>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
//             {/* Website */}
//             <div>
//               <label className="wbl-label">Website</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2">
//                   <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
//                       d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9"/>
//                   </svg>
//                 </span>
//                 <input type="url" value={website}
//                   onChange={e => { setWebsite(e.target.value); setErrors(p => ({ ...p, website: null })); }}
//                   className="wbl-input" style={{ paddingLeft: 34 }}
//                   placeholder="https://yoursite.com"/>
//               </div>
//               {errors.website && <p className="text-xs text-red-500 mt-1">{errors.website}</p>}
//             </div>

//             {/* GitHub */}
//             <div>
//               <label className="wbl-label">GitHub</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 font-bold text-sm">
//                   <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z"/>
//                   </svg>
//                 </span>
//                 <input type="url" value={github}
//                   onChange={e => { setGithub(e.target.value); setErrors(p => ({ ...p, github: null })); }}
//                   className="wbl-input" style={{ paddingLeft: 34 }}
//                   placeholder="https://github.com/your-org"/>
//               </div>
//               {errors.github && <p className="text-xs text-red-500 mt-1">{errors.github}</p>}
//             </div>
//           </div>

//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
//             {/* LinkedIn */}
//             <div>
//               <label className="wbl-label">LinkedIn</label>
//               <div className="relative">
//                 <span className="absolute left-3 top-1/2 -translate-y-1/2">
//                   <svg className="w-4 h-4 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
//                     <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
//                   </svg>
//                 </span>
//                 <input type="url" value={linkedin}
//                   onChange={e => { setLinkedin(e.target.value); setErrors(p => ({ ...p, linkedin: null })); }}
//                   className="wbl-input" style={{ paddingLeft: 34 }}
//                   placeholder="https://linkedin.com/company/"/>
//               </div>
//               {errors.linkedin && <p className="text-xs text-red-500 mt-1">{errors.linkedin}</p>}
//             </div>

//             {/* Timezone */}
//             <div>
//               <label className="wbl-label">Timezone</label>
//               <select value={timezone} onChange={e => setTimezone(e.target.value)} className="wbl-select">
//                 {TIMEZONES.map(tz => <option key={tz}>{tz}</option>)}
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ─── Preferences ─── */}
//         <div className="wbl-section-card">
//           <h2 className="text-base font-bold text-gray-800 mb-6">Preferences</h2>

//           {/* Currency */}
//           <div className="mb-6" style={{ maxWidth: 260 }}>
//             <label className="wbl-label">Currency</label>
//             <select value={currency} onChange={e => setCurrency(e.target.value)} className="wbl-select">
//               {CURRENCIES.map(c => <option key={c.code}>{c.label}</option>)}
//             </select>
//           </div>

//           <hr className="wbl-divider" />

//           {/* Service Categories */}
//           <div>
//             <label className="wbl-label">Service Categories</label>
//             <p className="text-xs text-gray-400 mb-3">Select all that apply — visible to clients searching for your services</p>
//             <div className="flex flex-wrap gap-2">
//               {ALL_CATEGORIES.map(cat => (
//                 <button
//                   key={cat}
//                   onClick={() => toggleCategory(cat)}
//                   className={`wbl-cat ${categories.includes(cat) ? "wbl-cat-active" : ""}`}
//                 >
//                   {categories.includes(cat) && (
//                     <span className="mr-1 text-xs">✓</span>
//                   )}
//                   {cat}
//                 </button>
//               ))}
//             </div>
//             {errors.categories && <p className="text-xs text-red-500 mt-2">{errors.categories}</p>}
//             <p className="text-xs text-gray-400 mt-3">
//               {categories.length} selected · {ALL_CATEGORIES.length - categories.length} available
//             </p>
//           </div>
//         </div>

//         {/* ─── Save Bar ─── */}
//         <div className="flex items-center justify-between bg-white border border-gray-200 rounded-2xl px-6 py-4 sticky bottom-5 shadow-lg"
//           style={{ boxShadow: "0 8px 32px rgba(13,40,85,0.10)" }}>
//           <p className="text-xs text-gray-400">
//             Last saved: <span className="font-semibold text-gray-600">Today, 10:32 AM</span>
//           </p>
//           <div className="flex gap-3">
//             <button
//               className="wbl-btn-outline text-sm px-5 py-2.5"
//               onClick={() => {
//                 setAgencyName("TechVision Solutions");
//                 setTagline("Full-Stack Web & Mobile Agency");
//                 setBio("We build scalable, modern web and mobile applications for businesses across India. Specializing in React, Node.js, and React Native with a focus on clean code and great UX.");
//                 setWebsite("https://techvision.in");
//                 setGithub("https://github.com/techvision-in");
//                 setLinkedin("");
//                 setTimezone("Asia/Kolkata (IST)");
//                 setCurrency("INR (₹)");
//                 setCategories(["Web Development", "Mobile Apps", "UI/UX Design"]);
//                 setErrors({});
//               }}
//             >
//               Reset
//             </button>
//             <button className="wbl-btn text-sm px-7 py-2.5 flex items-center gap-2" onClick={handleSave}>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/>
//               </svg>
//               Save Changes
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* ── Toast ── */}
//       {toast && (
//         <div className="wbl-toast">
//           <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//             <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//           </svg>
//           Agency profile saved successfully!
//         </div>
//       )}
//     </div>
//   );
// }




// import { useState } from "react";

// (() => {
//   if (document.getElementById("wl-fonts")) return;
//   const l = document.createElement("link");
//   l.id = "wl-fonts"; l.rel = "stylesheet";
//   l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
//   document.head.appendChild(l);
// })();

// /* ── Design tokens matching the weblance dashboard ── */
// const G = {
//   green:    "#22c55e",   // logo green
//   greenDark:"#16a34a",
//   greenBg:  "#f0fdf4",
//   greenBorder:"#bbf7d0",
//   text:     "#111827",
//   sub:      "#6b7280",
//   muted:    "#9ca3af",
//   border:   "#e5e7eb",
//   bg:       "#f9fafb",
//   white:    "#ffffff",
//   red:      "#ef4444",
//   redBg:    "#fef2f2",
//   redBorder:"#fecaca",
//   yellow:   "#f59e0b",
//   yellowBg: "#fffbeb",
//   yellowBorder:"#fde68a",
// };

// const NAV_SECTIONS = [
//   { id:"profile",      icon:"👤", label:"Agency Profile"   },
//   { id:"business",     icon:"🏢", label:"Business Details" },
//   { id:"notifications",icon:"🔔", label:"Notifications"    },
//   { id:"security",     icon:"🔐", label:"Security"         },
//   { id:"billing",      icon:"💳", label:"Billing & Plan"   },
//   { id:"danger",       icon:"⚠️", label:"Danger Zone"      },
// ];

// const NOTIF_ROWS = [
//   { label:"Payment released",       email:true,  app:true,  sms:false },
//   { label:"Milestone due reminder", email:true,  app:true,  sms:true  },
//   { label:"Contract signed",        email:true,  app:true,  sms:false },
//   { label:"Proposal accepted",      email:true,  app:true,  sms:false },
//   { label:"Proposal rejected",      email:true,  app:true,  sms:false },
//   { label:"New client message",     email:false, app:true,  sms:false },
//   { label:"Team member joined",     email:true,  app:true,  sms:false },
//   { label:"KYC status update",      email:true,  app:true,  sms:false },
//   { label:"Weekly earnings report", email:true,  app:false, sms:false },
//   { label:"Security alerts",        email:true,  app:true,  sms:true  },
// ];

// const SESSIONS = [
//   { device:"Chrome on Windows", location:"Mumbai, India", ip:"103.21.xx.xx", time:"Active now",   current:true  },
//   { device:"Safari on iPhone",  location:"Mumbai, India", ip:"103.21.xx.xx", time:"2 hrs ago",    current:false },
//   { device:"Chrome on MacBook", location:"Pune, India",   ip:"117.55.xx.xx", time:"Mar 10, 2026", current:false },
//   { device:"Firefox on Windows",location:"Delhi, India",  ip:"182.68.xx.xx", time:"Mar 8, 2026",  current:false },
// ];

// const INVOICES = [
//   { id:"INV-2026-03", date:"Mar 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
//   { id:"INV-2026-02", date:"Feb 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
//   { id:"INV-2026-01", date:"Jan 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
// ];

// const FONT = "'Plus Jakarta Sans', sans-serif";

// /* ── Shared styles ── */
// const inp = {
//   width:"100%", fontSize:13, border:`1.5px solid ${G.border}`,
//   borderRadius:8, padding:"9px 12px", outline:"none",
//   color:G.text, boxSizing:"border-box", fontFamily:FONT,
//   background:G.white, transition:"border-color 0.15s",
// };
// const sbtn = {
//   fontSize:13, fontWeight:700, padding:"9px 22px",
//   border:"none", background:G.green, color:"#fff",
//   borderRadius:8, cursor:"pointer", fontFamily:FONT,
//   transition:"background 0.15s",
// };

// /* ════════════════════════════════════════════════════════════ */
// export default function AgencySettings() {
//   const [active,       setActive]       = useState("profile");
//   const [saved,        setSaved]        = useState(false);
//   const [notifRows,    setNotifRows]    = useState(NOTIF_ROWS);
//   const [twoFA,        setTwoFA]        = useState(false);
//   const [sessions,     setSessions]     = useState(SESSIONS);
//   const [deleteConfirm,setDeleteConfirm]= useState("");

//   const [profile, setProfile] = useState({
//     name:"TechVision Solutions",
//     tagline:"Full-Stack Web & Mobile Agency",
//     bio:"We build scalable, modern web and mobile applications for businesses across India. Specializing in React, Node.js, and React Native with a focus on clean code and great UX.",
//     website:"https://techvision.in",
//     linkedin:"",
//     github:"https://github.com/techvision-in",
//     timezone:"Asia/Kolkata (IST)",
//     currency:"INR (₹)",
//     categories:["Web Development","Mobile Apps","UI/UX Design"],
//   });
//   const up = (k, v) => setProfile(p => ({ ...p, [k]: v }));

//   const handleSave = () => {
//     setSaved(true);
//     setTimeout(() => setSaved(false), 3000);
//   };

//   const toggleNotif = (idx, col) => {
//     setNotifRows(prev => prev.map((r, i) => i === idx ? { ...r, [col]: !r[col] } : r));
//   };

//   return (
//     <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
//       <Navbar />

//       {/* Page header */}
//       <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
//         <div style={{ maxWidth:1160, margin:"0 auto", padding:"20px 28px 16px" }}>
//           <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px", fontFamily:FONT }}>Settings</h1>
//           <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Manage your agency profile, security and preferences</p>
//         </div>
//       </header>

//       {/* Toast */}
//       {saved && (
//         <div style={{ position:"fixed", top:64, right:24, zIndex:100, background:G.white, border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 18px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(34,197,94,0.15)" }}>
//           <span style={{ fontSize:15 }}>✅</span>
//           <span style={{ fontSize:13, fontWeight:700, color:G.greenDark, fontFamily:FONT }}>Settings saved successfully</span>
//         </div>
//       )}

//       <div style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px", display:"grid", gridTemplateColumns:"210px 1fr", gap:20 }}>

//         {/* ── Sidebar nav ── */}
//         <div>
//           <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden", position:"sticky", top:68 }}>
//             {NAV_SECTIONS.map((s, i) => {
//               const isActive = active === s.id;
//               const isDanger = s.id === "danger";
//               return (
//                 <button key={s.id} onClick={() => setActive(s.id)} style={{
//                   display:"flex", alignItems:"center", gap:9, width:"100%",
//                   padding:"11px 14px", fontSize:13,
//                   fontWeight: isActive ? 700 : 500,
//                   color: isDanger ? G.red : isActive ? G.greenDark : G.text,
//                   background: isActive ? G.greenBg : G.white,
//                   border:"none",
//                   borderLeft: isActive ? `3px solid ${G.green}` : "3px solid transparent",
//                   borderBottom: i < NAV_SECTIONS.length - 1 ? `1px solid #f3f4f6` : "none",
//                   cursor:"pointer", textAlign:"left",
//                   transition:"all 0.12s", fontFamily:FONT,
//                 }}>
//                   <span style={{ fontSize:15 }}>{s.icon}</span>
//                   {s.label}
//                 </button>
//               );
//             })}
//           </div>
//         </div>

//         {/* ── Main panel ── */}
//         <div>

//           {/* ─ AGENCY PROFILE ─ */}
//           {active === "profile" && (
//             <SCard title="Agency Profile" desc="Public-facing agency information">
//               {/* Logo upload */}
//               <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22, paddingBottom:22, borderBottom:`1px solid #f3f4f6` }}>
//                 <div style={{ width:68, height:68, borderRadius:14, background:G.greenBg, border:`2px dashed ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
//                   <span style={{ fontSize:24 }}>🏢</span>
//                 </div>
//                 <div>
//                   <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:4 }}>Agency Logo</p>
//                   <p style={{ fontSize:12, color:G.muted, marginBottom:8 }}>PNG or JPG, max 2MB · 400×400px recommended</p>
//                   <div style={{ display:"flex", gap:8 }}>
//                     <label style={{ fontSize:12, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>
//                       Upload Logo <input type="file" style={{ display:"none" }} />
//                     </label>
//                     <button style={{ fontSize:12, color:G.muted, background:"#f3f4f6", border:"none", borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>Remove</button>
//                   </div>
//                 </div>
//               </div>

//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
//                 <FRow label="Agency Name" full>
//                   <input value={profile.name} onChange={e => up("name", e.target.value)} style={inp} />
//                 </FRow>
//                 <FRow label="Tagline" full>
//                   <input value={profile.tagline} onChange={e => up("tagline", e.target.value)} placeholder="e.g. Full-Stack Web & Mobile Agency" style={inp} />
//                 </FRow>
//                 <FRow label="About / Bio" full>
//                   <textarea value={profile.bio} onChange={e => up("bio", e.target.value)} rows={4} style={{ ...inp, resize:"none" }} />
//                 </FRow>
//                 <FRow label="Website">
//                   <input value={profile.website} onChange={e => up("website", e.target.value)} placeholder="https://" style={inp} />
//                 </FRow>
//                 <FRow label="GitHub">
//                   <input value={profile.github} onChange={e => up("github", e.target.value)} placeholder="https://github.com/" style={inp} />
//                 </FRow>
//                 <FRow label="LinkedIn">
//                   <input value={profile.linkedin} onChange={e => up("linkedin", e.target.value)} placeholder="https://linkedin.com/company/" style={inp} />
//                 </FRow>
//                 <FRow label="Timezone">
//                   <select value={profile.timezone} onChange={e => up("timezone", e.target.value)} style={{ ...inp }}>
//                     {["Asia/Kolkata (IST)","Asia/Dubai (GST)","Europe/London (GMT)","America/New_York (EST)"].map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </FRow>
//                 <FRow label="Currency">
//                   <select value={profile.currency} onChange={e => up("currency", e.target.value)} style={{ ...inp }}>
//                     {["INR (₹)","USD ($)","EUR (€)","GBP (£)"].map(c => <option key={c}>{c}</option>)}
//                   </select>
//                 </FRow>
//               </div>

//               <div style={{ marginTop:18 }}>
//                 <p style={{ fontSize:11, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Service Categories</p>
//                 <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
//                   {["Web Development","Mobile Apps","UI/UX Design","AI & ML","DevOps","Data Engineering"].map(cat => {
//                     const sel = profile.categories.includes(cat);
//                     return (
//                       <button key={cat}
//                         onClick={() => up("categories", sel ? profile.categories.filter(c => c !== cat) : [...profile.categories, cat])}
//                         style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:99, border:`1.5px solid ${sel ? G.green : G.border}`, background:sel ? G.greenBg : G.white, color:sel ? G.greenDark : G.sub, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
//                         {cat}
//                       </button>
//                     );
//                   })}
//                 </div>
//               </div>
//               <SaveRow onSave={handleSave} />
//             </SCard>
//           )}

//           {/* ─ BUSINESS DETAILS ─ */}
//           {active === "business" && (
//             <SCard title="Business Details" desc="Legal and official business information">
//               <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:10, padding:"10px 14px", marginBottom:18, display:"flex", gap:8, alignItems:"flex-start" }}>
//                 <span style={{ fontSize:14 }}>🔒</span>
//                 <p style={{ fontSize:12, color:"#92400e", fontFamily:FONT }}>
//                   Sensitive fields (PAN, Aadhaar, GST) are managed through KYC.{" "}
//                   <a href="/agency/kyc" style={{ color:G.greenDark, fontWeight:700 }}>Edit in KYC →</a>
//                 </p>
//               </div>
//               <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
//                 <FRow label="Legal Business Name" full>
//                   <input defaultValue="TechVision Solutions Private Limited" style={inp} />
//                 </FRow>
//                 <FRow label="Registration Type">
//                   <select style={{ ...inp }}>
//                     {["Private Limited","LLP","Proprietorship","Partnership"].map(t => <option key={t}>{t}</option>)}
//                   </select>
//                 </FRow>
//                 <FRow label="Founded Year">
//                   <input defaultValue="2020" style={inp} />
//                 </FRow>
//                 <FRow label="Team Size">
//                   <select style={{ ...inp }}>
//                     {["1–5","6–15","16–50","51–100","100+"].map(s => <option key={s}>{s}</option>)}
//                   </select>
//                 </FRow>
//                 <FRow label="GST Number" full>
//                   <div style={{ position:"relative" }}>
//                     <input defaultValue="27AABCT3518Q1Z2" style={inp} />
//                     <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, padding:"2px 8px", borderRadius:99 }}>VERIFIED ✓</span>
//                   </div>
//                 </FRow>
//                 <FRow label="Registered Address" full>
//                   <textarea defaultValue="401, Tech Park, Andheri East, Mumbai – 400069, Maharashtra" rows={2} style={{ ...inp, resize:"none" }} />
//                 </FRow>
//               </div>
//               <SaveRow onSave={handleSave} />
//             </SCard>
//           )}

//           {/* ─ NOTIFICATIONS ─ */}
//           {active === "notifications" && (
//             <SCard title="Notification Preferences" desc="Choose how you want to be notified">
//               <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
//                 {/* Table header */}
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
//                   <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>Event</p>
//                   {["Email","In-App","SMS"].map(h => (
//                     <p key={h} style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"center" }}>{h}</p>
//                   ))}
//                 </div>
//                 {notifRows.map((row, i) => (
//                   <div key={i}
//                     style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 16px", borderBottom:i < notifRows.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center", transition:"background 0.1s" }}
//                     onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
//                     onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
//                     <p style={{ fontSize:13, color:G.text, fontFamily:FONT }}>{row.label}</p>
//                     {["email","app","sms"].map(col => (
//                       <div key={col} style={{ display:"flex", justifyContent:"center" }}>
//                         <Toggle on={row[col]} onChange={() => toggleNotif(i, col)} />
//                       </div>
//                     ))}
//                   </div>
//                 ))}
//               </div>
//               <SaveRow onSave={handleSave} />
//             </SCard>
//           )}

//           {/* ─ SECURITY ─ */}
//           {active === "security" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//               {/* Change password */}
//               <SCard title="Change Password" desc="Update your account password">
//                 <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
//                   {["Current Password","New Password","Confirm New Password"].map(label => (
//                     <FRow key={label} label={label}>
//                       <input type="password" placeholder="••••••••••••" style={inp} />
//                     </FRow>
//                   ))}
//                 </div>
//                 <div style={{ marginTop:16 }}>
//                   <button onClick={handleSave} style={sbtn}>Update Password</button>
//                 </div>
//               </SCard>

//               {/* 2FA */}
//               <SCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
//                 <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", border:`1.5px solid ${twoFA ? G.greenBorder : G.border}`, borderRadius:10, background:twoFA ? G.greenBg : G.white, transition:"all 0.15s" }}>
//                   <div style={{ display:"flex", alignItems:"center", gap:12 }}>
//                     <span style={{ fontSize:20 }}>🔐</span>
//                     <div>
//                       <p style={{ fontSize:13, fontWeight:600, color:G.text }}>Authenticator App (TOTP)</p>
//                       <p style={{ fontSize:12, color:G.muted }}>Use Google Authenticator or Authy</p>
//                     </div>
//                   </div>
//                   <div style={{ display:"flex", alignItems:"center", gap:10 }}>
//                     {twoFA && <span style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px" }}>Enabled</span>}
//                     <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />
//                   </div>
//                 </div>
//               </SCard>

//               {/* Active sessions */}
//               <SCard title="Active Sessions" desc="Devices currently logged in to your account">
//                 <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                   {sessions.map((s, i) => (
//                     <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1.5px solid ${s.current ? G.greenBorder : G.border}`, borderRadius:10, background:s.current ? G.greenBg : G.white }}>
//                       <span style={{ fontSize:18 }}>{s.device.includes("iPhone") ? "📱" : "💻"}</span>
//                       <div style={{ flex:1 }}>
//                         <div style={{ display:"flex", alignItems:"center", gap:8 }}>
//                           <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{s.device}</p>
//                           {s.current && <span style={{ fontSize:10, fontWeight:700, background:G.green, color:"#fff", borderRadius:99, padding:"2px 8px" }}>Current</span>}
//                         </div>
//                         <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{s.location} · {s.ip} · {s.time}</p>
//                       </div>
//                       {!s.current && (
//                         <button onClick={() => setSessions(prev => prev.filter((_, j) => j !== i))}
//                           style={{ fontSize:11, fontWeight:700, color:G.red, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontFamily:FONT }}>
//                           Revoke
//                         </button>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               </SCard>
//             </div>
//           )}

//           {/* ─ BILLING ─ */}
//           {active === "billing" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//               <SCard title="Current Plan" desc="Your Weblance subscription and commission details">
//                 <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:12, padding:"20px 22px" }}>
//                   <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//                     <div>
//                       <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Current Plan</p>
//                       <p style={{ fontSize:26, fontWeight:800, color:G.green, fontFamily:FONT, letterSpacing:"-0.5px" }}>Agency Pro</p>
//                       <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:4 }}>6% platform commission · No monthly fee</p>
//                     </div>
//                     <span style={{ background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.3)", borderRadius:99, padding:"5px 14px", fontSize:12, fontWeight:700, color:G.green }}>Active</span>
//                   </div>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:18 }}>
//                     {[["Commission Rate","6% per transaction"],["Billing Model","Pay as you earn"],["Payout","Anytime, min ₹1,000"]].map(([k, v]) => (
//                       <div key={k} style={{ background:"rgba(255,255,255,0.07)", borderRadius:9, padding:"10px 12px" }}>
//                         <p style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>{k}</p>
//                         <p style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.8)" }}>{v}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               </SCard>

//               <SCard title="Billing Email" desc="Invoices and billing notifications are sent here">
//                 <FRow label="Billing Email">
//                   <input defaultValue="billing@techvision.in" style={inp} />
//                 </FRow>
//                 <SaveRow onSave={handleSave} />
//               </SCard>

//               <SCard title="Invoice History" desc="Download past commission summaries">
//                 <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
//                   <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
//                     {["Invoice","Date","Amount","Type",""].map(h => (
//                       <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
//                     ))}
//                   </div>
//                   {INVOICES.map((inv, i) => (
//                     <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"12px 16px", borderBottom:i < INVOICES.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center" }}>
//                       <p style={{ fontSize:12, fontWeight:600, color:G.text }}>{inv.id}</p>
//                       <p style={{ fontSize:12, color:G.sub }}>{inv.date}</p>
//                       <p style={{ fontSize:12, color:G.sub }}>{inv.amount}</p>
//                       <p style={{ fontSize:12, color:G.sub }}>{inv.type}</p>
//                       <button style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>⬇ PDF</button>
//                     </div>
//                   ))}
//                 </div>
//               </SCard>
//             </div>
//           )}

//           {/* ─ DANGER ZONE ─ */}
//           {active === "danger" && (
//             <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
//               {/* Export */}
//               <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"22px" }}>
//                 <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//                   <div>
//                     <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:4 }}>Export All Data</p>
//                     <p style={{ fontSize:13, color:G.sub, lineHeight:1.6 }}>Download all your agency data including contracts, proposals, earnings and team info as a JSON archive.</p>
//                   </div>
//                   <button style={{ fontSize:12, fontWeight:700, color:"#2563eb", background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>⬇ Export Data</button>
//                 </div>
//               </div>

//               {/* Deactivate */}
//               <div style={{ background:G.white, border:`1px solid ${G.yellowBorder}`, borderRadius:12, padding:"22px" }}>
//                 <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//                   <div>
//                     <p style={{ fontSize:14, fontWeight:700, color:"#92400e", marginBottom:4 }}>Deactivate Agency Account</p>
//                     <p style={{ fontSize:13, color:G.sub, lineHeight:1.6 }}>Temporarily deactivate your agency. Your profile will be hidden and you won't receive new projects. Reactivate anytime.</p>
//                   </div>
//                   <button style={{ fontSize:12, fontWeight:700, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>Deactivate</button>
//                 </div>
//               </div>

//               {/* Delete */}
//               <div style={{ background:G.white, border:`1px solid ${G.redBorder}`, borderRadius:12, padding:"22px" }}>
//                 <p style={{ fontSize:14, fontWeight:700, color:G.red, marginBottom:4 }}>Delete Agency Account</p>
//                 <p style={{ fontSize:13, color:G.sub, lineHeight:1.6, marginBottom:16 }}>
//                   Permanently delete your agency, all contracts, proposals, earnings history and team data. This action <strong>cannot be undone</strong>.
//                 </p>
//                 <div style={{ marginBottom:12 }}>
//                   <p style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>
//                     Type <strong>TechVision Solutions</strong> to confirm:
//                   </p>
//                   <input
//                     value={deleteConfirm}
//                     onChange={e => setDeleteConfirm(e.target.value)}
//                     placeholder="Type agency name here"
//                     style={{ ...inp, borderColor:deleteConfirm === "TechVision Solutions" ? G.red : G.border, maxWidth:360 }}
//                   />
//                 </div>
//                 <button
//                   disabled={deleteConfirm !== "TechVision Solutions"}
//                   style={{ fontSize:13, fontWeight:700, padding:"9px 20px", borderRadius:8, border:"none", background:deleteConfirm === "TechVision Solutions" ? G.red : "#f3f4f6", color:deleteConfirm === "TechVision Solutions" ? "#fff" : G.muted, cursor:deleteConfirm === "TechVision Solutions" ? "pointer" : "not-allowed", fontFamily:FONT, transition:"all 0.15s" }}>
//                   Delete Agency Permanently
//                 </button>
//               </div>
//             </div>
//           )}

//         </div>
//       </div>
//     </div>
//   );
// }

// /* ── Primitives ── */
// function SCard({ title, desc, children }) {
//   return (
//     <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
//       <div style={{ padding:"16px 22px 14px", borderBottom:`1px solid #f3f4f6` }}>
//         <p style={{ fontSize:15, fontWeight:700, color:G.text, marginBottom:3, fontFamily:FONT }}>{title}</p>
//         <p style={{ fontSize:12, color:G.muted, fontFamily:FONT }}>{desc}</p>
//       </div>
//       <div style={{ padding:"20px 22px" }}>{children}</div>
//     </div>
//   );
// }

// function FRow({ label, children, full }) {
//   return (
//     <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
//       <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>
//         {label}
//       </label>
//       {children}
//     </div>
//   );
// }

// function SaveRow({ onSave }) {
//   return (
//     <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6` }}>
//       <button onClick={onSave} style={sbtn}>Save Changes</button>
//     </div>
//   );
// }

// function Toggle({ on, onChange }) {
//   return (
//     <div onClick={onChange} style={{ width:36, height:20, borderRadius:99, background:on ? G.green : "#e5e7eb", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
//       <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:on ? 18 : 2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }} />
//     </div>
//   );
// }

// function Navbar() {
//   return (
//     <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
//       {/* Logo matching reference image */}
//       <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
//         <span style={{ color:G.green }}>web</span>lance
//       </span>
//       <div style={{ width:1, height:20, background:G.border, marginLeft:4 }} />
//       <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
//       <span style={{ fontSize:12, color:G.border }}>/</span>
//       <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Settings</span>
//       <div style={{ flex:1 }} />
//       {/* Notification bell */}
//       <div style={{ position:"relative", cursor:"pointer" }}>
//         <span style={{ fontSize:18 }}>🔔</span>
//         <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
//       </div>
//       {/* Avatar */}
//       <div style={{ width:32, height:32, borderRadius:"50%", background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.greenDark, marginLeft:8 }}>
//         RK
//       </div>
//     </nav>
//   );
// }











import { useState } from "react";

/* ── Design tokens — Weblance theme ── */
const G = {
  navy:      "#0D2855",
  blue:      "#1B72C0",
  grad:      "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  blueBg:    "#eff6ff",
  blueBorder:"#bfdbfe",
  text:      "#111827",
  sub:       "#6b7280",
  muted:     "#9ca3af",
  border:    "#e5e7eb",
  bg:        "#f8fafc",
  white:     "#ffffff",
  red:       "#ef4444",
  redBg:     "#fef2f2",
  redBorder: "#fecaca",
  yellow:    "#f59e0b",
  yellowBg:  "#fffbeb",
  yellowBorder:"#fde68a",
};

const WBL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
  .wbl-root { font-family: 'Poppins', sans-serif; }
  .wbl-nav-item { transition: all 0.12s; }
  .wbl-nav-item:hover { background: #eff6ff !important; }
  .wbl-save-btn { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff; border: none; cursor: pointer; font-weight: 600; border-radius: 9px; padding: 9px 22px; font-size: 13px; font-family: 'Poppins', sans-serif; transition: all .18s; box-shadow: 0 3px 14px rgba(13,40,85,0.18); }
  .wbl-save-btn:hover { opacity: 0.88; transform: translateY(-1px); }
  .wbl-cat-btn { font-size: 12px; font-weight: 600; padding: 6px 14px; border-radius: 99px; cursor: pointer; font-family: 'Poppins', sans-serif; transition: all 0.12s; }
  .wbl-toggle-track { cursor: pointer; position: relative; transition: background 0.2s; }
  .wbl-toggle-thumb { position: absolute; top: 2px; border-radius: 50%; background: #fff; transition: left 0.2s; box-shadow: 0 1px 3px rgba(0,0,0,0.15); }
  .wbl-toast { position: fixed; bottom: 28px; right: 28px; background: linear-gradient(135deg,#0D2855,#1B72C0); color: #fff; padding: 12px 20px; border-radius: 12px; font-size: 13px; font-weight: 600; box-shadow: 0 6px 24px rgba(13,40,85,0.22); z-index: 9999; display: flex; align-items: center; gap: 10px; animation: slideUp .3s ease; font-family: 'Poppins', sans-serif; }
  @keyframes slideUp { from { transform: translateY(16px); opacity:0; } to { transform: translateY(0); opacity:1; } }
`;

const NAV_SECTIONS = [
  { id:"profile",       icon:"👤", label:"Freelancer Profile" },
  { id:"notifications", icon:"🔔", label:"Notifications"      },
  { id:"security",      icon:"🔐", label:"Security"           },
  { id:"billing",       icon:"💳", label:"Billing & Plan"     },
  { id:"danger",        icon:"⚠️", label:"Danger Zone"        },
];

const NOTIF_ROWS = [
  { label:"Payment released",         email:true,  app:true,  sms:false },
  { label:"Milestone due reminder",   email:true,  app:true,  sms:true  },
  { label:"Contract signed",          email:true,  app:true,  sms:false },
  { label:"Proposal accepted",        email:true,  app:true,  sms:false },
  { label:"Proposal rejected",        email:true,  app:true,  sms:false },
  { label:"New client message",       email:false, app:true,  sms:false },
  { label:"New project invitation",   email:true,  app:true,  sms:false },
  { label:"KYC status update",        email:true,  app:true,  sms:false },
  { label:"Weekly earnings report",   email:true,  app:false, sms:false },
  { label:"Security alerts",          email:true,  app:true,  sms:true  },
];

const SESSIONS = [
  { device:"Chrome on Windows", location:"Mumbai, India", ip:"103.21.xx.xx", time:"Active now",   current:true  },
  { device:"Safari on iPhone",  location:"Mumbai, India", ip:"103.21.xx.xx", time:"2 hrs ago",    current:false },
  { device:"Chrome on MacBook", location:"Pune, India",   ip:"117.55.xx.xx", time:"Mar 10, 2026", current:false },
  { device:"Firefox on Windows",location:"Delhi, India",  ip:"182.68.xx.xx", time:"Mar 8, 2026",  current:false },
];

const INVOICES = [
  { id:"INV-2026-03", date:"Mar 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
  { id:"INV-2026-02", date:"Feb 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
  { id:"INV-2026-01", date:"Jan 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
];

const FONT = "'Poppins', sans-serif";

const inp = {
  width:"100%", fontSize:13, border:`1.5px solid ${G.border}`,
  borderRadius:8, padding:"9px 12px", outline:"none",
  color:G.text, boxSizing:"border-box", fontFamily:FONT,
  background:G.white, transition:"border-color 0.15s",
};

/* ════════════════════════════════ */
export default function FreelancerSettings({ onBack }) {
  const [active,        setActive]        = useState("profile");
  const [toast,         setToast]         = useState(false);
  const [notifRows,     setNotifRows]     = useState(NOTIF_ROWS);
  const [twoFA,         setTwoFA]         = useState(false);
  const [sessions,      setSessions]      = useState(SESSIONS);
  const [deleteConfirm, setDeleteConfirm] = useState("");

  const [profile, setProfile] = useState({
    name:      "John Smith",
    tagline:   "Full-Stack React & Node.js Developer",
    bio:       "Full-stack React and Node.js developer with 5+ years of experience building production-grade web applications. Specializing in e-commerce and SaaS platforms.",
    website:   "https://johnsmith.dev",
    linkedin:  "https://linkedin.com/in/johnsmith",
    github:    "https://github.com/johnsmith",
    timezone:  "Asia/Kolkata (IST)",
    currency:  "INR (₹)",
    categories:["Web Development","Mobile Apps","UI/UX Design"],
  });
  const up = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    setToast(true);
    setTimeout(() => setToast(false), 3000);
  };

  const toggleNotif = (idx, col) =>
    setNotifRows(prev => prev.map((r, i) => i === idx ? { ...r, [col]: !r[col] } : r));

  return (
    <div className="wbl-root" style={{ minHeight:"100vh", background:G.bg }}>
      <style>{WBL_CSS}</style>

      {/* ── Navbar ── */}
      <nav style={{ height:56, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 24px", gap:12, position:"sticky", top:0, zIndex:40 }}>
        <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />

        <div style={{ flex:1 }} />

        {/* Back button */}
        <button
          onClick={onBack}
          style={{ display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600, color:G.blue, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:10, padding:"7px 14px", cursor:"pointer", fontFamily:FONT, transition:"all .15s" }}
        >
          <svg width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
            <path d="M15 19l-7-7 7-7"/>
          </svg>
          Back
        </button>

        {/* Avatar */}
        <div style={{ width:34, height:34, borderRadius:"50%", background:G.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:13, fontWeight:700, color:"#fff", marginLeft:4 }}>
          J
        </div>
      </nav>

      {/* ── Page header ── */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1100, margin:"0 auto", padding:"20px 28px 16px" }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px", fontFamily:FONT }}>Settings</h1>
          <p style={{ fontSize:13, color:G.muted, marginTop:3, fontFamily:FONT }}>Manage your freelancer profile, security and preferences</p>
        </div>
      </header>

      {/* ── Body ── */}
      <div style={{ maxWidth:1100, margin:"0 auto", padding:"24px 28px 80px", display:"grid", gridTemplateColumns:"210px 1fr", gap:20 }}>

        {/* ── Sidebar ── */}
        <div>
          <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden", position:"sticky", top:72 }}>
            {NAV_SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              const isDanger = s.id === "danger";
              return (
                <button key={s.id} onClick={() => setActive(s.id)}
                  className="wbl-nav-item"
                  style={{
                    display:"flex", alignItems:"center", gap:9, width:"100%",
                    padding:"11px 14px", fontSize:13,
                    fontWeight: isActive ? 700 : 500,
                    color: isDanger ? G.red : isActive ? G.blue : G.text,
                    background: isActive ? G.blueBg : G.white,
                    border:"none",
                    borderLeft: isActive ? `3px solid ${G.blue}` : "3px solid transparent",
                    borderBottom: i < NAV_SECTIONS.length - 1 ? `1px solid #f3f4f6` : "none",
                    cursor:"pointer", textAlign:"left", fontFamily:FONT,
                  }}>
                  <span style={{ fontSize:15 }}>{s.icon}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main panel ── */}
        <div>

          {/* ─── FREELANCER PROFILE ─── */}
          {active === "profile" && (
            <SCard title="Freelancer Profile" desc="Public-facing profile information visible to clients">
              {/* Avatar */}
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22, paddingBottom:22, borderBottom:`1px solid #f3f4f6` }}>
                <div style={{ width:68, height:68, borderRadius:"50%", background:G.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:26, fontWeight:700, color:"#fff", flexShrink:0 }}>
                  J
                </div>
                <div>
                  <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:4 }}>Profile Photo</p>
                  <p style={{ fontSize:12, color:G.muted, marginBottom:8 }}>PNG or JPG, max 2MB · Square image recommended</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:G.blue, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:8, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>
                      Upload Photo <input type="file" accept="image/*" style={{ display:"none" }} />
                    </label>
                    <button style={{ fontSize:12, color:G.muted, background:"#f3f4f6", border:"none", borderRadius:8, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>Remove</button>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <FRow label="Full Name" full>
                  <input value={profile.name} onChange={e => up("name", e.target.value)} style={inp} />
                </FRow>
                <FRow label="Professional Title" full>
                  <input value={profile.tagline} onChange={e => up("tagline", e.target.value)} placeholder="e.g. Full-Stack React & Node.js Developer" style={inp} />
                </FRow>
                <FRow label="About / Bio" full>
                  <textarea value={profile.bio} onChange={e => up("bio", e.target.value)} rows={4} style={{ ...inp, resize:"vertical" }} />
                </FRow>
                <FRow label="Website">
                  <input value={profile.website} onChange={e => up("website", e.target.value)} placeholder="https://" style={inp} />
                </FRow>
                <FRow label="GitHub">
                  <input value={profile.github} onChange={e => up("github", e.target.value)} placeholder="https://github.com/" style={inp} />
                </FRow>
                <FRow label="LinkedIn">
                  <input value={profile.linkedin} onChange={e => up("linkedin", e.target.value)} placeholder="https://linkedin.com/in/" style={inp} />
                </FRow>
                <FRow label="Timezone">
                  <WblSelect value={profile.timezone} onChange={v => up("timezone", v)}
                    options={["Asia/Kolkata (IST)","Asia/Dubai (GST)","Asia/Singapore (SGT)","Europe/London (GMT)","America/New_York (EST)","America/Los_Angeles (PST)"]} />
                </FRow>
                <FRow label="Currency">
                  <WblSelect value={profile.currency} onChange={v => up("currency", v)}
                    options={["INR (₹)","USD ($)","EUR (€)","GBP (£)","AED (د.إ)","SGD (S$)"]} />
                </FRow>
              </div>

              {/* Skill Categories */}
              <div style={{ marginTop:18 }}>
                <p style={{ fontSize:11, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Skill Categories</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Web Development","Mobile Apps","UI/UX Design","AI & ML","DevOps","Data Engineering","Blockchain","QA Testing"].map(cat => {
                    const sel = profile.categories.includes(cat);
                    return (
                      <button key={cat}
                        className="wbl-cat-btn"
                        onClick={() => up("categories", sel ? profile.categories.filter(c => c !== cat) : [...profile.categories, cat])}
                        style={{ border:`1.5px solid ${sel ? G.blue : G.border}`, background:sel ? G.grad : G.white, color:sel ? "#fff" : G.sub }}>
                        {sel && <span style={{ marginRight:4 }}>✓</span>}{cat}
                      </button>
                    );
                  })}
                </div>
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─── NOTIFICATIONS ─── */}
          {active === "notifications" && (
            <SCard title="Notification Preferences" desc="Choose how you want to be notified for each event">
              <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                  <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>Event</p>
                  {["Email","In-App","SMS"].map(h => (
                    <p key={h} style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"center" }}>{h}</p>
                  ))}
                </div>
                {notifRows.map((row, i) => (
                  <div key={i}
                    style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 16px", borderBottom:i < notifRows.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#f8faff"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <p style={{ fontSize:13, color:G.text, fontFamily:FONT }}>{row.label}</p>
                    {["email","app","sms"].map(col => (
                      <div key={col} style={{ display:"flex", justifyContent:"center" }}>
                        <Toggle on={row[col]} onChange={() => toggleNotif(i, col)} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─── SECURITY ─── */}
          {active === "security" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Password */}
              <SCard title="Change Password" desc="Update your account password">
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {["Current Password","New Password","Confirm New Password"].map(label => (
                    <FRow key={label} label={label}>
                      <input type="password" placeholder="••••••••••••" style={inp} />
                    </FRow>
                  ))}
                </div>
                <div style={{ marginTop:16 }}>
                  <button className="wbl-save-btn" onClick={handleSave}>Update Password</button>
                </div>
              </SCard>

              {/* 2FA */}
              <SCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", border:`1.5px solid ${twoFA ? G.blueBorder : G.border}`, borderRadius:10, background:twoFA ? G.blueBg : G.white, transition:"all 0.15s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:20 }}>🔐</span>
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:G.text, fontFamily:FONT }}>Authenticator App (TOTP)</p>
                      <p style={{ fontSize:12, color:G.muted, fontFamily:FONT }}>Use Google Authenticator or Authy</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {twoFA && <span style={{ fontSize:11, fontWeight:700, color:G.blue, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px", fontFamily:FONT }}>Enabled</span>}
                    <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />
                  </div>
                </div>
              </SCard>

              {/* Sessions */}
              <SCard title="Active Sessions" desc="Devices currently logged in to your account">
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {sessions.map((s, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1.5px solid ${s.current ? G.blueBorder : G.border}`, borderRadius:10, background:s.current ? G.blueBg : G.white }}>
                      <span style={{ fontSize:18 }}>{s.device.includes("iPhone") ? "📱" : "💻"}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <p style={{ fontSize:13, fontWeight:600, color:G.text, fontFamily:FONT }}>{s.device}</p>
                          {s.current && (
                            <span style={{ fontSize:10, fontWeight:700, background:G.grad, color:"#fff", borderRadius:99, padding:"2px 8px", fontFamily:FONT }}>Current</span>
                          )}
                        </div>
                        <p style={{ fontSize:11, color:G.muted, marginTop:2, fontFamily:FONT }}>{s.location} · {s.ip} · {s.time}</p>
                      </div>
                      {!s.current && (
                        <button onClick={() => setSessions(prev => prev.filter((_, j) => j !== i))}
                          style={{ fontSize:11, fontWeight:700, color:G.red, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontFamily:FONT }}>
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SCard>
            </div>
          )}

          {/* ─── BILLING ─── */}
          {active === "billing" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <SCard title="Current Plan" desc="Your Weblance subscription and commission details">
                <div style={{ background:G.grad, borderRadius:12, padding:"20px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                    <div>
                      <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6, fontFamily:FONT }}>Current Plan</p>
                      <p style={{ fontSize:26, fontWeight:800, color:"#fff", fontFamily:FONT, letterSpacing:"-0.5px" }}>Freelancer Pro</p>
                      <p style={{ fontSize:13, color:"rgba(255,255,255,0.6)", marginTop:4, fontFamily:FONT }}>6% platform commission · No monthly fee</p>
                    </div>
                    <span style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:99, padding:"5px 14px", fontSize:12, fontWeight:700, color:"#fff", fontFamily:FONT }}>Active</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:18 }}>
                    {[["Commission Rate","6% per transaction"],["Billing Model","Pay as you earn"],["Payout","Anytime, min ₹1,000"]].map(([k, v]) => (
                      <div key={k} style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"10px 12px" }}>
                        <p style={{ fontSize:10, color:"rgba(255,255,255,0.5)", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em", fontFamily:FONT }}>{k}</p>
                        <p style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.85)", fontFamily:FONT }}>{v}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SCard>

              <SCard title="Billing Email" desc="Invoices and billing notifications are sent here">
                <FRow label="Billing Email">
                  <input defaultValue="john@johnsmith.dev" style={inp} />
                </FRow>
                <SaveRow onSave={handleSave} />
              </SCard>

              <SCard title="Invoice History" desc="Download past commission summaries">
                <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                    {["Invoice","Date","Amount","Type",""].map(h => (
                      <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", fontFamily:FONT }}>{h}</p>
                    ))}
                  </div>
                  {INVOICES.map((inv, i) => (
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"12px 16px", borderBottom:i < INVOICES.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center" }}>
                      <p style={{ fontSize:12, fontWeight:600, color:G.blue, fontFamily:FONT }}>{inv.id}</p>
                      <p style={{ fontSize:12, color:G.sub, fontFamily:FONT }}>{inv.date}</p>
                      <p style={{ fontSize:12, color:G.sub, fontFamily:FONT }}>{inv.amount}</p>
                      <p style={{ fontSize:12, color:G.sub, fontFamily:FONT }}>{inv.type}</p>
                      <button style={{ fontSize:11, fontWeight:700, color:G.blue, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>⬇ PDF</button>
                    </div>
                  ))}
                </div>
              </SCard>
            </div>
          )}

          {/* ─── DANGER ZONE ─── */}
          {active === "danger" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              {/* Export */}
              <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"22px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:4, fontFamily:FONT }}>Export All Data</p>
                    <p style={{ fontSize:13, color:G.sub, lineHeight:1.6, fontFamily:FONT }}>Download all your freelancer data including contracts, proposals, earnings and activity as a JSON archive.</p>
                  </div>
                  <button style={{ fontSize:12, fontWeight:700, color:G.blue, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>⬇ Export Data</button>
                </div>
              </div>

              {/* Deactivate */}
              <div style={{ background:G.white, border:`1px solid ${G.yellowBorder}`, borderRadius:12, padding:"22px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:"#92400e", marginBottom:4, fontFamily:FONT }}>Deactivate Freelancer Account</p>
                    <p style={{ fontSize:13, color:G.sub, lineHeight:1.6, fontFamily:FONT }}>Temporarily deactivate your account. Your profile will be hidden and you won't receive new project invitations. Reactivate anytime.</p>
                  </div>
                  <button style={{ fontSize:12, fontWeight:700, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>Deactivate</button>
                </div>
              </div>

              {/* Delete */}
              <div style={{ background:G.white, border:`1px solid ${G.redBorder}`, borderRadius:12, padding:"22px" }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.red, marginBottom:4, fontFamily:FONT }}>Delete Freelancer Account</p>
                <p style={{ fontSize:13, color:G.sub, lineHeight:1.6, marginBottom:16, fontFamily:FONT }}>
                  Permanently delete your account, all contracts, proposals, earnings history and data. This action <strong>cannot be undone</strong>.
                </p>
                <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:6, fontFamily:FONT }}>
                    Type <strong>John Smith</strong> to confirm:
                  </p>
                  <input
                    value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder="Type your name here"
                    style={{ ...inp, borderColor: deleteConfirm === "John Smith" ? G.red : G.border, maxWidth:360 }}
                  />
                </div>
                <button
                  disabled={deleteConfirm !== "John Smith"}
                  style={{ fontSize:13, fontWeight:700, padding:"9px 20px", borderRadius:8, border:"none", background:deleteConfirm === "John Smith" ? G.red : "#f3f4f6", color:deleteConfirm === "John Smith" ? "#fff" : G.muted, cursor:deleteConfirm === "John Smith" ? "pointer" : "not-allowed", fontFamily:FONT, transition:"all 0.15s" }}>
                  Delete Account Permanently
                </button>
              </div>
            </div>
          )}

        </div>
      </div>

      {/* ── Toast ── */}
      {toast && (
        <div className="wbl-toast">
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
          </svg>
          Settings saved successfully!
        </div>
      )}
    </div>
  );
}

/* ── Primitives ── */
function SCard({ title, desc, children }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
      <div style={{ padding:"16px 22px 14px", borderBottom:`1px solid #f3f4f6` }}>
        <p style={{ fontSize:15, fontWeight:700, color:G.navy, marginBottom:3, fontFamily:FONT }}>{title}</p>
        <p style={{ fontSize:12, color:G.muted, fontFamily:FONT }}>{desc}</p>
      </div>
      <div style={{ padding:"20px 22px" }}>{children}</div>
    </div>
  );
}

function FRow({ label, children, full }) {
  return (
    <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveRow({ onSave }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6` }}>
      <button className="wbl-save-btn" onClick={onSave}>Save Changes</button>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange}
      className="wbl-toggle-track"
      style={{ width:36, height:20, borderRadius:99, background:on ? G.blue : "#e5e7eb" }}>
      <div className="wbl-toggle-thumb"
        style={{ width:16, height:16, left:on ? 18 : 2 }} />
    </div>
  );
}

function WblSelect({ value, onChange, options }) {
  return (
    <div style={{ position:"relative" }}>
      <select value={value} onChange={e => onChange(e.target.value)}
        style={{ ...inp, paddingRight:32, appearance:"none", cursor:"pointer" }}>
        {options.map(o => <option key={o}>{o}</option>)}
      </select>
      <svg style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", pointerEvents:"none" }}
        width="14" height="14" fill="none" stroke={G.muted} strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
      </svg>
    </div>
  );
}