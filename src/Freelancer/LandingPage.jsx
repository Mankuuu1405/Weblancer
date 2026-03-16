// import React from "react";
// import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";

// const LandingPage = ({ onJoinClick }) => {

//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">

//       {/* ================= NAVBAR ================= */}
//       <header className="bg-white border-b">
//         <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
//           <h1 className="text-2xl font-bold text-blue-600">
//             Arc<span className="text-indigo-600">Lancer</span>
//           </h1>

//           <div className="hidden md:flex items-center gap-6">
//             <button className="text-gray-600 hover:text-black">
//               Sign In
//             </button>

//             <button 
//               onClick={onJoinClick} 
//               className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
//             >
//               Join as Freelancer
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ================= HERO ================= */}
//       <section className="text-center py-20 px-6">
//         <div className="max-w-4xl mx-auto">

//           <span className="inline-block bg-green-100 text-green-600 px-4 py-1 rounded-full text-sm font-medium mb-6">
//             FREELANCER PLATFORM
//           </span>

//           <h2 className="text-4xl md:text-6xl font-extrabold leading-tight">
//             Get Hired for Work <br />
//             You Love
//           </h2>

//           <p className="mt-6 text-gray-600 text-lg md:text-xl">
//             Build your profile, showcase your skills, get matched with verified clients
//           </p>

//           <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
            
//             {/* ✅ Added onClick here */}
//             <button 
//               onClick={onJoinClick}
//               className="px-8 py-3 bg-blue-600 text-white rounded-xl font-medium hover:bg-blue-700 transition"
//             >
//               Join as a Freelancer →
//             </button>

//             <button className="px-8 py-3 border rounded-xl font-medium hover:bg-gray-100 transition">
//               ▶ See How It Works
//             </button>

//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section className="px-6 pb-20">
//         <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

//           <FeatureCard
//             icon={<ShieldCheck size={28} />}
//             title="Verified Clients Only"
//             desc="No fake leads, no wasted time"
//           />

//           <FeatureCard
//             icon={<DollarSign size={28} />}
//             title="Secure Milestone Payments"
//             desc="Get paid for every milestone you complete"
//           />

//           <FeatureCard
//             icon={<Briefcase size={28} />}
//             title="AI-Matched Projects"
//             desc="No bidding wars, no spam proposals"
//           />

//           <FeatureCard
//             icon={<Scale size={28} />}
//             title="Platform Protection"
//             desc="You're protected if a client doesn't pay"
//           />
//         </div>
//       </section>

//       {/* ================= WHY SECTION ================= */}
//       <section className="px-6 pb-20">
//         <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-sm p-10">
//           <h3 className="text-2xl font-bold text-center mb-10">
//             Why Freelancers Choose ArcLancer
//           </h3>

//           <div className="grid md:grid-cols-2 gap-6 text-gray-700">
//             <CheckItem text="No hidden fees until you earn" />
//             <CheckItem text="Keep up to 90% of every project" />
//             <CheckItem text="Cancel or pause anytime" />
//             <CheckItem text="Admin support 24/7" />
//           </div>
//         </div>
//       </section>

//       {/* ================= STATS ================= */}
//       <section className="px-6 pb-24">
//         <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
//           <Stat number="8,500+" label="Verified Professionals" />
//           <Stat number="94%" label="Completion Rate" />
//           <Stat number="$12M+" label="Paid to Freelancers" />
//           <Stat number="4.8 ★" label="Avg Rating" />
//         </div>
//       </section>

//     </div>
//   );
// };

// // ================= REUSABLE COMPONENTS =================

// const FeatureCard = ({ icon, title, desc }) => {
//   return (
//     <div className="bg-white rounded-xl p-8 text-center shadow-sm hover:shadow-md transition">
//       <div className="w-14 h-14 mx-auto mb-4 flex items-center justify-center rounded-full bg-green-100 text-green-600">
//         {icon}
//       </div>
//       <h4 className="font-semibold text-lg mb-2">{title}</h4>
//       <p className="text-gray-500 text-sm">{desc}</p>
//     </div>
//   );
// };

// const CheckItem = ({ text }) => {
//   return (
//     <div className="flex items-center gap-3">
//       <CheckCircle className="text-green-500" size={20} />
//       <p>{text}</p>
//     </div>
//   );
// };

// const Stat = ({ number, label }) => {
//   return (
//     <div>
//       <h4 className="text-3xl font-bold">{number}</h4>
//       <p className="text-gray-500 mt-2">{label}</p>
//     </div>
//   );
// };

// export default LandingPage;   



// idea 2
// import React from "react";
// import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";

// const LandingPage = ({ onJoinClick }) => {
//   return (
//     <div style={{ fontFamily: "'Roboto', sans-serif" }} className="min-h-screen bg-white text-gray-900">

//       {/* Google Fonts - Roboto */}
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');

//         * { font-family: 'Roboto', sans-serif; }

//         .hero-bg {
//           background: linear-gradient(160deg, #ffffff 55%, #edf7ee 100%);
//           position: relative;
//           overflow: hidden;
//         }
//         .hero-bg::before {
//           content: '';
//           position: absolute;
//           inset: 0;
//           background-image:
//             linear-gradient(rgba(42,184,54,0.06) 1px, transparent 1px),
//             linear-gradient(90deg, rgba(42,184,54,0.06) 1px, transparent 1px);
//           background-size: 72px 72px;
//           mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
//           pointer-events: none;
//         }
//         .orb {
//           position: absolute;
//           border-radius: 50%;
//           filter: blur(80px);
//           pointer-events: none;
//         }
//         .orb-1 {
//           width: 420px; height: 420px;
//           background: radial-gradient(circle, rgba(42,184,54,0.13) 0%, transparent 70%);
//           top: -80px; right: -60px;
//           animation: floatOrb 9s ease-in-out infinite;
//         }
//         .orb-2 {
//           width: 280px; height: 280px;
//           background: radial-gradient(circle, rgba(61,214,74,0.09) 0%, transparent 70%);
//           bottom: 40px; left: -50px;
//           animation: floatOrb 9s ease-in-out infinite 3s;
//         }
//         @keyframes floatOrb {
//           0%, 100% { transform: translateY(0); }
//           50% { transform: translateY(-26px); }
//         }
//         .badge-dot {
//           width: 6px; height: 6px;
//           background: #2AB836;
//           border-radius: 50%;
//           display: inline-block;
//           animation: pulseDot 2s infinite;
//         }
//         @keyframes pulseDot {
//           0%, 100% { opacity: 1; transform: scale(1); }
//           50% { opacity: 0.4; transform: scale(0.7); }
//         }
//         .btn-primary {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: #2AB836;
//           color: #fff;
//           border: none;
//           padding: 14px 28px;
//           border-radius: 10px;
//           font-family: 'Roboto', sans-serif;
//           font-size: 15px;
//           font-weight: 700;
//           cursor: pointer;
//           transition: all 0.22s;
//           text-decoration: none;
//         }
//         .btn-primary:hover {
//           background: #1E8F28;
//           transform: translateY(-2px);
//           box-shadow: 0 12px 32px rgba(42,184,54,0.28);
//         }
//         .btn-outline {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: transparent;
//           color: #111B12;
//           border: 1.5px solid #D4E8D6;
//           padding: 13px 26px;
//           border-radius: 10px;
//           font-family: 'Roboto', sans-serif;
//           font-size: 15px;
//           font-weight: 500;
//           cursor: pointer;
//           transition: all 0.22s;
//         }
//         .btn-outline:hover {
//           border-color: #2AB836;
//           color: #2AB836;
//           background: #E8F9EA;
//         }
//         .feature-card {
//           background: #fff;
//           border: 1.5px solid #D4E8D6;
//           border-radius: 16px;
//           padding: 36px 28px;
//           text-align: center;
//           transition: all 0.28s;
//           position: relative;
//           overflow: hidden;
//         }
//         .feature-card::after {
//           content: '';
//           position: absolute; bottom: 0; left: 0; right: 0;
//           height: 3px;
//           background: linear-gradient(90deg, #3DD64A, #1E8F28);
//           transform: scaleX(0);
//           transform-origin: left;
//           transition: transform 0.32s ease;
//         }
//         .feature-card:hover {
//           transform: translateY(-4px);
//           border-color: rgba(42,184,54,0.4);
//           box-shadow: 0 12px 36px rgba(42,184,54,0.1);
//         }
//         .feature-card:hover::after { transform: scaleX(1); }

//         .icon-wrap {
//           width: 52px; height: 52px;
//           margin: 0 auto 18px;
//           display: flex; align-items: center; justify-content: center;
//           border-radius: 14px;
//           background: #E8F9EA;
//           border: 1px solid rgba(42,184,54,0.2);
//           color: #1E8F28;
//           transition: all 0.25s;
//         }
//         .feature-card:hover .icon-wrap {
//           background: rgba(42,184,54,0.15);
//           transform: scale(1.06);
//         }
//         .why-card {
//           background: #fff;
//           border: 1.5px solid #D4E8D6;
//           border-radius: 14px;
//           padding: 22px 26px;
//           display: flex;
//           align-items: center;
//           gap: 14px;
//           transition: all 0.22s;
//           box-shadow: 0 2px 12px rgba(42,184,54,0.06);
//         }
//         .why-card:hover {
//           border-color: rgba(42,184,54,0.4);
//           transform: translateX(4px);
//           box-shadow: 0 6px 20px rgba(42,184,54,0.1);
//         }
//         .check-circle {
//           width: 30px; height: 30px;
//           background: #E8F9EA;
//           border-radius: 50%;
//           display: flex; align-items: center; justify-content: center;
//           color: #1E8F28;
//           flex-shrink: 0;
//         }
//         .stat-item {
//           text-align: center;
//           padding: 0 48px;
//           border-right: 1.5px solid #D4E8D6;
//         }
//         .stat-item:last-child { border-right: none; }
//         .stat-number {
//           font-size: 38px;
//           font-weight: 900;
//           color: #2AB836;
//           line-height: 1;
//           margin-bottom: 6px;
//         }
//         .stat-label {
//           font-size: 13px;
//           color: #5A7360;
//           font-weight: 400;
//         }
//         .nav-wrapper {
//           position: sticky; top: 0; z-index: 100;
//           background: rgba(255,255,255,0.92);
//           backdrop-filter: blur(16px);
//           border-bottom: 1px solid #D4E8D6;
//         }
//         .reveal {
//           animation: fadeUp 0.55s ease both;
//         }
//         @keyframes fadeUp {
//           from { opacity: 0; transform: translateY(22px); }
//           to   { opacity: 1; transform: translateY(0); }
//         }
//       `}</style>

//       {/* ================= NAVBAR ================= */}
//       <header className="nav-wrapper">
//         <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">

//           {/* Logo */}
//           <img
//             src="/weblance-logo.jpeg"
//             alt="Weblance"
//             style={{ height: 30, width: "auto" }}
//             onError={(e) => {
//               e.target.style.display = "none";
//               e.target.nextSibling.style.display = "block";
//             }}
//           />
//           <span style={{
//             display: "none",
//             fontWeight: 900,
//             fontSize: 22,
//             background: "linear-gradient(135deg, #3DD64A, #0F5C1A)",
//             WebkitBackgroundClip: "text",
//             WebkitTextFillColor: "transparent"
//           }}>
//             weblance
//           </span>

//           <div className="flex items-center gap-3">
//             <button style={{
//               background: "none", border: "1.5px solid #D4E8D6",
//               color: "#111B12", padding: "8px 20px", borderRadius: 8,
//               fontFamily: "Roboto, sans-serif", fontSize: 14, fontWeight: 500,
//               cursor: "pointer", transition: "all 0.2s"
//             }}>
//               Sign In
//             </button>
//             <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }} onClick={onJoinClick}>
//               Join as Freelancer
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* ================= HERO ================= */}
//       <section className="hero-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "28px 24px 32px" }}>
//         <div className="orb orb-1" />
//         <div className="orb orb-2" />

//         <div className="reveal" style={{ textAlign: "center", maxWidth: 820, position: "relative", zIndex: 2 }}>

//           {/* Badge */}
//           <div style={{
//             display: "inline-flex", alignItems: "center", gap: 8,
//             background: "#E8F9EA", border: "1px solid rgba(42,184,54,0.25)",
//             borderRadius: 100, padding: "6px 16px",
//             fontSize: 11, color: "#1E8F28", fontWeight: 600,
//             letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16
//           }}>
//             <span className="badge-dot" />
//             FREELANCER PLATFORM
//           </div>

//           <h2 style={{
//             fontSize: "clamp(44px, 6vw, 78px)",
//             fontWeight: 900, lineHeight: 1.0,
//             letterSpacing: "-0.03em", marginBottom: 14, color: "#111B12"
//           }}>
//             Get Hired for Work<br />
//             <span style={{
//               background: "linear-gradient(135deg, #3DD64A 0%, #2AB836 50%, #0F5C1A 100%)",
//               WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
//             }}>
//               You Love
//             </span>
//           </h2>

//           <p style={{ fontSize: 17, color: "#5A7360", fontWeight: 400, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 28px" }}>
//             Build your profile, showcase your skills, get matched with verified clients
//           </p>

//           <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
//             <button className="btn-primary" onClick={onJoinClick}>
//               Join as a Freelancer &nbsp;→
//             </button>
//             <button className="btn-outline">
//               <span style={{
//                 width: 22, height: 22, background: "#E8F9EA", borderRadius: "50%",
//                 display: "flex", alignItems: "center", justifyContent: "center",
//                 fontSize: 8, color: "#2AB836"
//               }}>▶</span>
//               See How It Works
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* ================= FEATURES ================= */}
//       <section style={{ padding: "88px 24px", background: "#fff" }}>
//         <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
//           <FeatureCard icon={<ShieldCheck size={24} />} title="Verified Clients Only" desc="No fake leads, no wasted time" />
//           <FeatureCard icon={<DollarSign size={24} />} title="Secure Milestone Payments" desc="Get paid for every milestone you complete" />
//           <FeatureCard icon={<Briefcase size={24} />} title="AI-Matched Projects" desc="No bidding wars, no spam proposals" />
//           <FeatureCard icon={<Scale size={24} />} title="Platform Protection" desc="You're protected if a client doesn't pay" />
//         </div>
//       </section>

//       {/* ================= WHY SECTION ================= */}
//       <section style={{ padding: "0 24px 88px", background: "#F6FAF6" }}>
//         <div style={{ maxWidth: 780, margin: "0 auto", background: "#fff", borderRadius: 20, border: "1.5px solid #D4E8D6", padding: "52px 48px", boxShadow: "0 4px 24px rgba(42,184,54,0.07)" }}>

//           <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 40, color: "#111B12" }}>
//             Why Freelancers Choose Weblance
//           </h3>

//           <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
//             <CheckItem text="No hidden fees until you earn" />
//             <CheckItem text="Keep up to 90% of every project" />
//             <CheckItem text="Cancel or pause anytime" />
//             <CheckItem text="Admin support 24/7" />
//           </div>
//         </div>
//       </section>

//       {/* ================= STATS ================= */}
//       <section style={{ background: "#fff", borderTop: "1.5px solid #D4E8D6", borderBottom: "1.5px solid #D4E8D6", padding: "44px 24px" }}>
//         <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center" }}>
//           <Stat number="8,500+" label="Verified Professionals" />
//           <Stat number="94%" label="Completion Rate" />
//           <Stat number="$12M+" label="Paid to Freelancers" />
//           <Stat number="4.8 ★" label="Avg Rating" />
//         </div>
//       </section>

//       {/* ================= FOOTER ================= */}
//       <footer style={{ background: "#F6FAF6", borderTop: "1px solid #D4E8D6", padding: "28px 32px", textAlign: "center" }}>
//         <p style={{ fontSize: 13, color: "#5A7360" }}>© 2026 Weblance. All rights reserved.</p>
//       </footer>

//     </div>
//   );
// };

// // ================= REUSABLE COMPONENTS =================

// const FeatureCard = ({ icon, title, desc }) => (
//   <div className="feature-card">
//     <div className="icon-wrap">{icon}</div>
//     <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "#111B12" }}>{title}</h4>
//     <p style={{ color: "#5A7360", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
//   </div>
// );

// const CheckItem = ({ text }) => (
//   <div className="why-card">
//     <div className="check-circle">
//       <CheckCircle size={16} />
//     </div>
//     <p style={{ fontSize: 15, color: "#111B12", fontWeight: 500 }}>{text}</p>
//   </div>
// );

// const Stat = ({ number, label }) => (
//   <div className="stat-item">
//     <div className="stat-number">{number}</div>
//     <div className="stat-label">{label}</div>
//   </div>
// );

// export default LandingPage;


import React from "react";
import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";

const LOGO_SRC = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/2wBDAQMDAwQDBAgEBAgQCwkLEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBAQEBD/wAARCAJEBOIDASIAAhEBAxEB/8QAHgABAAAGAwEAAAAAAAAAAAAAAAECBgcICQMEBQr/xAByEAABAwMBBQQFBAkLChAMBAcBAAIDBAURBgcIEiExE0FRYQkicYGRFBUjMkJSYoKVobHR0hYXGDNDcpKUwdPwJFNXg4STorLU4RklNDVER1RjZnN1hZajwsMmN0ZVZHSGpLPE4vE2SHa0JzhFVlhlpf/EABwBAQABBQEBAAAAAAAAAAAAAAAEAQIDBQYHCP/EAEERAAIBAgMFAwoEBQQBBQEAAAABAgMEBREhBhIxQVETkaEUFSIyUmFxgbHRFkLB4QcjM1PwJENicjQXY5Ki8cL/2gAMAwEAAhEDEQA/ANqCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCIiAIiIAiIgCI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";

const LandingPage = ({ onJoinClick }) => {
  return (
    <div style={{ fontFamily: "'Roboto', sans-serif" }} className="min-h-screen bg-white text-gray-900">

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap');
        * { font-family: 'Roboto', sans-serif; }

        .hero-bg {
          background: #ffffff;
          position: relative;
          overflow: hidden;
        }
        .hero-bg::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image:
            linear-gradient(rgba(25,96,210,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(42,184,54,0.05) 1px, transparent 1px);
          background-size: 72px 72px;
          mask-image: radial-gradient(ellipse 80% 60% at 50% 50%, black 30%, transparent 100%);
          pointer-events: none;
        }
        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .orb-1 {
          width: 420px; height: 420px;
          background: radial-gradient(circle, rgba(25,96,210,0.12) 0%, transparent 70%);
          top: -80px; right: -60px;
          animation: floatOrb 9s ease-in-out infinite;
        }
        .orb-2 {
          width: 280px; height: 280px;
          background: radial-gradient(circle, rgba(42,184,54,0.10) 0%, transparent 70%);
          bottom: 40px; left: -50px;
          animation: floatOrb 9s ease-in-out infinite 3s;
        }
        @keyframes floatOrb {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-26px); }
        }
        .badge-dot {
          width: 6px; height: 6px;
          background: #1960d2;
          border-radius: 50%;
          display: inline-block;
          animation: pulseDot 2s infinite;
        }
        @keyframes pulseDot {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.7); }
        }
        .btn-primary {
          display: inline-flex; align-items: center; gap: 8px;
          background: linear-gradient(135deg, #1960d2, #0f44a8);
          color: #fff;
          border: none;
          padding: 14px 28px;
          border-radius: 10px;
          font-family: 'Roboto', sans-serif;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.22s;
        }
        .btn-primary:hover {
          background: linear-gradient(135deg, #0f44a8, #0a2f7a);
          transform: translateY(-2px);
          box-shadow: 0 12px 32px rgba(25,96,210,0.32);
        }
        .btn-outline {
          display: inline-flex; align-items: center; gap: 8px;
          background: transparent;
          color: #1a2a5e;
          border: 1.5px solid #c5d8f5;
          padding: 13px 26px;
          border-radius: 10px;
          font-family: 'Roboto', sans-serif;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.22s;
        }
        .btn-outline:hover {
          border-color: #1960d2;
          color: #1960d2;
          background: #eef4ff;
        }
        .feature-card {
          background: #fff;
          border: 1.5px solid #d0e2fb;
          border-radius: 16px;
          padding: 36px 28px;
          text-align: center;
          transition: all 0.28s;
          position: relative;
          overflow: hidden;
        }
        .feature-card::after {
          content: '';
          position: absolute; bottom: 0; left: 0; right: 0;
          height: 3px;
          background: linear-gradient(90deg, #2AB836, #1960d2);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.32s ease;
        }
        .feature-card:hover {
          transform: translateY(-4px);
          border-color: rgba(25,96,210,0.35);
          box-shadow: 0 12px 36px rgba(25,96,210,0.1);
        }
        .feature-card:hover::after { transform: scaleX(1); }
        .icon-wrap {
          width: 52px; height: 52px;
          margin: 0 auto 18px;
          display: flex; align-items: center; justify-content: center;
          border-radius: 14px;
          background: linear-gradient(135deg, #eef4ff, #e8f9ea);
          border: 1px solid rgba(25,96,210,0.15);
          color: #1960d2;
          transition: all 0.25s;
        }
        .feature-card:hover .icon-wrap {
          background: linear-gradient(135deg, #ddeaff, #d5f5d8);
          transform: scale(1.06);
        }
        .why-card {
          background: #fff;
          border: 1.5px solid #d0e2fb;
          border-radius: 14px;
          padding: 22px 26px;
          display: flex;
          align-items: center;
          gap: 14px;
          transition: all 0.22s;
          box-shadow: 0 2px 12px rgba(25,96,210,0.06);
        }
        .why-card:hover {
          border-color: rgba(25,96,210,0.4);
          transform: translateX(4px);
          box-shadow: 0 6px 20px rgba(25,96,210,0.1);
        }
        .check-circle {
          width: 30px; height: 30px;
          background: linear-gradient(135deg, #eef4ff, #e8f9ea);
          border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          color: #2AB836;
          flex-shrink: 0;
        }
        .stat-item {
          text-align: center;
          padding: 0 48px;
          border-right: 1.5px solid #d0e2fb;
        }
        .stat-item:last-child { border-right: none; }
        .stat-number {
          font-size: 38px;
          font-weight: 900;
          background: linear-gradient(135deg, #1960d2, #2AB836);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 6px;
        }
        .stat-label {
          font-size: 13px;
          color: #4a5c8a;
          font-weight: 400;
        }
        .nav-wrapper {
          position: sticky; top: 0; z-index: 100;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid #d0e2fb;
        }
        .reveal {
          animation: fadeUp 0.55s ease both;
        }
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(22px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* NAVBAR */}
      <header className="nav-wrapper">
        <div className="max-w-7xl mx-auto px-8 h-16 flex justify-between items-center">
          <img src={LOGO_SRC} alt="WebLance Logo" style={{ height: 40, width: "auto", objectFit: "contain" }} />
          <div className="flex items-center gap-3">
            <button style={{
              background: "none", border: "1.5px solid #d0e2fb",
              color: "#1a2a5e", padding: "8px 20px", borderRadius: 8,
              fontFamily: "Roboto, sans-serif", fontSize: 14, fontWeight: 500,
              cursor: "pointer", transition: "all 0.2s"
            }}>
              Sign In
            </button>
            <button className="btn-primary" style={{ padding: "9px 20px", fontSize: 14 }} onClick={onJoinClick}>
              Join as Freelancer
            </button>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero-bg" style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: "60px 24px 72px" }}>
        <div className="orb orb-1" />
        <div className="orb orb-2" />
        <div className="reveal" style={{ textAlign: "center", maxWidth: 820, position: "relative", zIndex: 2 }}>
          <div style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            background: "linear-gradient(135deg, #eef4ff, #e8f9ea)",
            border: "1px solid rgba(25,96,210,0.2)",
            borderRadius: 100, padding: "6px 16px",
            fontSize: 11, color: "#1960d2", fontWeight: 600,
            letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20
          }}>
            <span className="badge-dot" />
            FREELANCER PLATFORM
          </div>
          <h2 style={{
            fontSize: "clamp(44px, 6vw, 78px)",
            fontWeight: 900, lineHeight: 1.0,
            letterSpacing: "-0.03em", marginBottom: 16, color: "#0d1f4a"
          }}>
            Get Hired for Work<br />
            <span style={{
              background: "linear-gradient(135deg, #2AB836 0%, #1960d2 100%)",
              WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text"
            }}>
              You Love
            </span>
          </h2>
          <p style={{ fontSize: 17, color: "#4a5c8a", fontWeight: 400, lineHeight: 1.7, maxWidth: 500, margin: "0 auto 32px" }}>
            Build your profile, showcase your skills, get matched with verified clients
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center", flexWrap: "wrap" }}>
            <button className="btn-primary" onClick={onJoinClick}>
              Join as a Freelancer &nbsp;→
            </button>
            <button className="btn-outline">
              <span style={{
                width: 22, height: 22, background: "#eef4ff", borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 8, color: "#1960d2"
              }}>▶</span>
              See How It Works
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section style={{ padding: "88px 24px", background: "#fff" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gap: 20, gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))" }}>
          <FeatureCard icon={<ShieldCheck size={24} />} title="Verified Clients Only" desc="No fake leads, no wasted time" />
          <FeatureCard icon={<DollarSign size={24} />} title="Secure Milestone Payments" desc="Get paid for every milestone you complete" />
          <FeatureCard icon={<Briefcase size={24} />} title="AI-Matched Projects" desc="No bidding wars, no spam proposals" />
          <FeatureCard icon={<Scale size={24} />} title="Platform Protection" desc="You're protected if a client doesn't pay" />
        </div>
      </section>

      {/* WHY SECTION */}
      <section style={{ padding: "0 24px 88px", background: "#fff" }}>
        <div style={{ maxWidth: 780, margin: "0 auto", background: "#fff", borderRadius: 20, border: "1.5px solid #d0e2fb", padding: "52px 48px", boxShadow: "0 4px 24px rgba(25,96,210,0.08)" }}>
          <h3 style={{ fontSize: "clamp(24px, 3vw, 36px)", fontWeight: 900, letterSpacing: "-0.02em", textAlign: "center", marginBottom: 40, color: "#0d1f4a" }}>
            Why Freelancers Choose WebLance
          </h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }}>
            <CheckItem text="No hidden fees until you earn" />
            <CheckItem text="Keep up to 90% of every project" />
            <CheckItem text="Cancel or pause anytime" />
            <CheckItem text="Admin support 24/7" />
          </div>
        </div>
      </section>

      {/* STATS */}
      <section style={{ background: "#fff", borderTop: "1.5px solid #d0e2fb", borderBottom: "1.5px solid #d0e2fb", padding: "44px 24px" }}>
        <div style={{ maxWidth: 900, margin: "0 auto", display: "flex", justifyContent: "center" }}>
          <Stat number="8,500+" label="Verified Professionals" />
          <Stat number="94%" label="Completion Rate" />
          <Stat number="$12M+" label="Paid to Freelancers" />
          <Stat number="4.8 ★" label="Avg Rating" />
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: "#fff", padding: "28px 32px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "#4a5c8a" }}>© 2026 WebLance. All rights reserved.</p>
      </footer>

    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="feature-card">
    <div className="icon-wrap">{icon}</div>
    <h4 style={{ fontWeight: 700, fontSize: 17, marginBottom: 8, color: "#0d1f4a" }}>{title}</h4>
    <p style={{ color: "#4a5c8a", fontSize: 14, lineHeight: 1.6 }}>{desc}</p>
  </div>
);

const CheckItem = ({ text }) => (
  <div className="why-card">
    <div className="check-circle">
      <CheckCircle size={16} />
    </div>
    <p style={{ fontSize: 15, color: "#0d1f4a", fontWeight: 500 }}>{text}</p>
  </div>
);

const Stat = ({ number, label }) => (
  <div className="stat-item">
    <div className="stat-number">{number}</div>
    <div className="stat-label">{label}</div>
  </div>
);

export default LandingPage;