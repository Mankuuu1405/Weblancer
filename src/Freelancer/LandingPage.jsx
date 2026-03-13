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













// import React, { useEffect, useRef } from "react";
// import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";
// import { FiArrowUpRight } from "react-icons/fi";

// /* ── Neural Background (same as Hero) ─────────────────── */
// const NeuralBg = () => {
//   const canvasRef = useRef(null);
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     let animationId, nodes = [];
//     const NODE_COUNT = 90, MAX_DIST = 180;

//     const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };

//     const initNodes = () => {
//       nodes = Array.from({ length: NODE_COUNT }, () => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.60,
//         vy: (Math.random() - 0.5) * 0.60,
//         r: Math.random() < 0.18 ? 4.2 : Math.random() < 0.45 ? 2.8 : 1.9,
//         opacity: 0.32 + Math.random() * 0.40,
//         isBlue: Math.random() > 0.55,
//         pulse: Math.random() * Math.PI * 2,
//         pulseSpeed: 0.02 + Math.random() * 0.025,
//       }));
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       nodes.forEach(n => {
//         n.x += n.vx; n.y += n.vy; n.pulse += n.pulseSpeed;
//         if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
//         if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
//       });
//       // connections
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
//           const dist = Math.sqrt(dx*dx + dy*dy);
//           if (dist < MAX_DIST) {
//             const a = (1 - dist/MAX_DIST) * 0.38;
//             ctx.beginPath();
//             ctx.strokeStyle = (nodes[i].isBlue && nodes[j].isBlue) ? `rgba(27,114,192,${a})`
//               : (!nodes[i].isBlue && !nodes[j].isBlue) ? `rgba(111,218,68,${a})`
//               : `rgba(60,170,130,${a})`;
//             ctx.lineWidth = 1.1;
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//       // dots
//       nodes.forEach(n => {
//         const pr = n.r + Math.sin(n.pulse) * 0.9;
//         const op = n.opacity + Math.sin(n.pulse) * 0.12;
//         const grd = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, pr * 3.2);
//         grd.addColorStop(0, n.isBlue ? `rgba(27,114,192,${op*0.45})` : `rgba(111,218,68,${op*0.45})`);
//         grd.addColorStop(1, "rgba(255,255,255,0)");
//         ctx.beginPath(); ctx.arc(n.x, n.y, pr*3.2, 0, Math.PI*2); ctx.fillStyle = grd; ctx.fill();
//         ctx.beginPath(); ctx.arc(n.x, n.y, pr, 0, Math.PI*2);
//         ctx.fillStyle = n.isBlue ? `rgba(27,114,192,${op})` : `rgba(111,218,68,${op})`;
//         ctx.fill();
//       });
//       animationId = requestAnimationFrame(draw);
//     };

//     resize(); initNodes(); draw();
//     const obs = new ResizeObserver(() => { resize(); initNodes(); });
//     obs.observe(canvas);
//     return () => { cancelAnimationFrame(animationId); obs.disconnect(); };
//   }, []);

//   return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", display:"block" }} />;
// };

// /* ── Main Component ─────────────────────────────────────── */
// const LandingPage = ({ onJoinClick }) => {

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         .lp-root * { font-family: 'Poppins', sans-serif; }

//         @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
//         .lp-nav-anim { animation: fadeDown .5s ease both; }

//         /* Floating pill navbar */
//         .lp-nav {
//           display: flex;
//           align-items: center;
//           justify-content: space-between;
//           background: #fff;
//           border-radius: 100px;
//           border: 1px solid #E4F0DC;
//           padding: 6px 10px 6px 14px;
//           box-shadow: 0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05);
//         }

//         .lp-sign-in {
//           background: none; border: none; cursor: pointer;
//           font-family: 'Poppins', sans-serif; font-size: 14px;
//           font-weight: 500; color: #4B5563; transition: color .2s;
//           padding: 6px 12px;
//         }
//         .lp-sign-in:hover { color: #0D2855; }

//         .lp-join-btn {
//           display: inline-flex; align-items: center; gap: 7px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color: #fff; border: none; cursor: pointer;
//           font-family: 'Poppins', sans-serif; font-weight: 600;
//           font-size: 13.5px; padding: 10px 22px; border-radius: 100px;
//           box-shadow: 0 3px 14px rgba(13,40,85,0.26); transition: all .2s;
//           white-space: nowrap;
//         }
//         .lp-join-btn:hover {
//           background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
//           transform: translateY(-1px); box-shadow: 0 5px 20px rgba(13,40,85,0.36);
//         }

//         .lp-btn-primary {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color: #fff; border: none; cursor: pointer;
//           font-family: 'Poppins', sans-serif; font-weight: 600;
//           border-radius: 12px; padding: 13px 32px; font-size: 15px;
//           box-shadow: 0 3px 18px rgba(13,40,85,0.28); transition: all .2s;
//         }
//         .lp-btn-primary:hover {
//           background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
//           transform: translateY(-1px); box-shadow: 0 5px 22px rgba(13,40,85,0.38);
//         }

//         .lp-btn-ghost {
//           display: inline-flex; align-items: center; gap: 8px;
//           background: #fff; color: #1C1C1C; border: 1.5px solid #D1E8FF;
//           cursor: pointer; font-family: 'Poppins', sans-serif; font-weight: 500;
//           border-radius: 12px; padding: 12px 32px; font-size: 15px; transition: all .2s;
//         }
//         .lp-btn-ghost:hover {
//           border-color: #1B72C0; color: #0D2855; background: #F0F7FF; transform: translateY(-1px);
//         }

//         .lp-feat-card {
//           background: #fff; border-radius: 16px; padding: 32px; text-align: center;
//           border: 1px solid #E8F5E1; box-shadow: 0 2px 8px rgba(0,0,0,0.04);
//           transition: all .22s ease; cursor: default;
//         }
//         .lp-feat-card:hover {
//           transform: translateY(-4px); box-shadow: 0 10px 32px rgba(27,114,192,0.13);
//           border-color: #6FDA44;
//         }

//         .lp-stat { transition: transform .2s; cursor: default; }
//         .lp-stat:hover { transform: translateY(-3px); }

//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: #f1f1f1; }
//         ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
//         ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
//       `}</style>

//       <div className="lp-root min-h-screen" style={{ background: "#FFFFFF" }}>

//         {/* ══ FLOATING PILL NAVBAR ══ */}
//         <div className="lp-nav-anim" style={{ position:"fixed", top:16, left:0, right:0, zIndex:50, display:"flex", justifyContent:"center", padding:"0 24px", pointerEvents:"none" }}>
//           <div style={{ width:"100%", maxWidth:860, pointerEvents:"auto" }}>
//             <div className="lp-nav">
//               {/* Logo — bigger */}
//               <img src="/weblance.jpeg" alt="Weblance" style={{ height: 55, width: 160, display: "block" }} />

//               {/* Right side */}
//               <div style={{ display:"flex", alignItems:"center", gap:4 }}>
//                 <button className="lp-sign-in">Sign In</button>
//                 <button className="lp-join-btn" onClick={onJoinClick}>
//                   Join as Freelancer <FiArrowUpRight size={13} />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Spacer */}
//         <div style={{ height: 90 }} />

//         {/* ══ HERO — full neural bg ══ */}
//         <section className="text-center py-20 px-6" style={{ position:"relative", overflow:"hidden" }}>
//           {/* Neural canvas covers entire hero */}
//           <NeuralBg />
//           {/* White centre glow so text is readable */}
//           <div style={{
//             position:"absolute", inset:0, pointerEvents:"none",
//             background:"radial-gradient(ellipse 70% 65% at 50% 50%, rgba(255,255,255,0.78) 0%, rgba(255,255,255,0.35) 52%, rgba(255,255,255,0.05) 78%, transparent 100%)",
//           }} />

//           <div className="max-w-4xl mx-auto" style={{ position:"relative", zIndex:10 }}>

//             <span style={{
//               display:"inline-block", background:"#DCFCE7", color:"#1A3D1F",
//               padding:"5px 18px", borderRadius:100, fontSize:12, fontWeight:600,
//               letterSpacing:"2px", textTransform:"uppercase", marginBottom:24,
//               border:"1px solid #D1FAE5",
//             }}>
//               FREELANCER PLATFORM
//             </span>

//             <h2 style={{
//               fontFamily:"'Poppins',sans-serif", fontSize:"clamp(32px,5vw,58px)",
//               fontWeight:800, lineHeight:1.15, color:"#0D2855", marginBottom:20,
//             }}>
//               Get Hired for Work <br />
//               <span style={{
//                 background:"linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%)",
//                 WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
//               }}>You Love</span>
//             </h2>

//             <p style={{ color:"#6B7280", fontSize:17, maxWidth:520, margin:"0 auto 36px" }}>
//               Build your profile, showcase your skills, get matched with verified clients
//             </p>

//             <div className="flex flex-col sm:flex-row justify-center gap-4">
//               <button className="lp-btn-primary" onClick={onJoinClick}>
//                 Join as a Freelancer →
//               </button>
//               <button className="lp-btn-ghost">
//                 ▶ See How It Works
//               </button>
//             </div>
//           </div>
//         </section>

//         {/* ══ FEATURES ══ */}
//         <section className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
//           <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
//             <FeatureCard icon={<ShieldCheck size={28} />} title="Verified Clients Only"     desc="No fake leads, no wasted time" />
//             <FeatureCard icon={<DollarSign size={28} />}  title="Secure Milestone Payments" desc="Get paid for every milestone you complete" />
//             <FeatureCard icon={<Briefcase size={28} />}   title="AI-Matched Projects"       desc="No bidding wars, no spam proposals" />
//             <FeatureCard icon={<Scale size={28} />}       title="Platform Protection"       desc="You're protected if a client doesn't pay" />
//           </div>
//         </section>

//         {/* ══ WHY SECTION ══ */}
//         <section className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
//           <div className="max-w-5xl mx-auto rounded-2xl p-10"
//             style={{ background:"#fff", border:"1px solid #DBEAFE", boxShadow:"0 4px 24px rgba(27,114,192,0.07)" }}>
//             <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:"#0D2855", textAlign:"center", marginBottom:32 }}>
//               Why Freelancers Choose Weblance
//             </h3>
//             <div className="grid md:grid-cols-2 gap-6">
//               <CheckItem text="No hidden fees until you earn" />
//               <CheckItem text="Keep up to 90% of every project" />
//               <CheckItem text="Cancel or pause anytime" />
//               <CheckItem text="Admin support 24/7" />
//             </div>
//           </div>
//         </section>

//         {/* ══ STATS ══ */}
//         <section className="px-6 pb-24" style={{ background:"#FFFFFF" }}>
//           <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
//             <Stat number="8,500+" label="Verified Professionals" />
//             <Stat number="94%"    label="Completion Rate" />
//             <Stat number="$12M+"  label="Paid to Freelancers" />
//             <Stat number="4.8 ★"  label="Avg Rating" />
//           </div>
//         </section>

//       </div>
//     </>
//   );
// };

// // ══ REUSABLE COMPONENTS ══════════════════════════════════

// const FeatureCard = ({ icon, title, desc }) => (
//   <div className="lp-feat-card">
//     <div style={{
//       width:56, height:56, margin:"0 auto 16px",
//       display:"flex", alignItems:"center", justifyContent:"center",
//       borderRadius:"50%", background:"linear-gradient(135deg,#DCFCE7,#DBEAFE)",
//       color:"#1B72C0", border:"1px solid #D1FAE5",
//     }}>{icon}</div>
//     <h4 style={{ fontWeight:600, fontSize:15, marginBottom:8, color:"#0D2855" }}>{title}</h4>
//     <p style={{ color:"#6B7280", fontSize:13 }}>{desc}</p>
//   </div>
// );

// const CheckItem = ({ text }) => (
//   <div className="flex items-center gap-3">
//     <CheckCircle size={20} style={{ color:"#6FDA44", flexShrink:0 }} />
//     <p style={{ fontSize:14, color:"#374151" }}>{text}</p>
//   </div>
// );

// const Stat = ({ number, label }) => (
//   <div className="lp-stat">
//     <h4 style={{ fontSize:30, fontWeight:800, color:"#0D2855", fontFamily:"'Poppins',sans-serif" }}>{number}</h4>
//     <p style={{ color:"#6B7280", marginTop:8, fontSize:13 }}>{label}</p>
//   </div>
// );

// export default LandingPage;










import React, { useEffect, useRef } from "react";
import { ShieldCheck, DollarSign, Briefcase, Scale, CheckCircle } from "lucide-react";
import { FiArrowUpRight } from "react-icons/fi";

/* ── Neural Background ─────────────────── */
const NeuralBg = () => {
  const canvasRef = useRef(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let animationId, nodes = [];
    const NODE_COUNT = 38, MAX_DIST = 100; // ← kam nodes, chhoti reach

    const resize = () => { canvas.width = canvas.offsetWidth; canvas.height = canvas.offsetHeight; };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.60,
        vy: (Math.random() - 0.5) * 0.60,
        r: Math.random() < 0.18 ? 4.2 : Math.random() < 0.45 ? 2.8 : 1.9,
        opacity: 0.10 + Math.random() * 0.15, // ← bahut faded dots
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
      // connections — very faded lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x, dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          if (dist < MAX_DIST) {
            const a = (1 - dist/MAX_DIST) * 0.10; // ← 0.38 → 0.10 (bahut faded)
            ctx.beginPath();
            ctx.strokeStyle = (nodes[i].isBlue && nodes[j].isBlue) ? `rgba(27,114,192,${a})`
              : (!nodes[i].isBlue && !nodes[j].isBlue) ? `rgba(111,218,68,${a})`
              : `rgba(60,170,130,${a})`;
            ctx.lineWidth = 0.6; // ← 1.1 → 0.6 (patli lines)
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      // dots
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

  return <canvas ref={canvasRef} style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", display:"block" }} />;
};

/* ── Main Component ─────────────────────────────────────── */
const LandingPage = ({ onJoinClick }) => {
     const handleRole = (role)=>{
   localStorage.setItem('role',role);
   navigate('/signin');
  }

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
        <div className="lp-nav-anim" style={{ position:"fixed", top:16, left:0, right:0, zIndex:50, display:"flex", justifyContent:"center", padding:"0 24px", pointerEvents:"none" }}>
          <div style={{ width:"100%", maxWidth:860, pointerEvents:"auto" }}>
            <div className="lp-nav">
              <img src="/weblance.jpeg" alt="Weblance" style={{ height: 55, width: 160, display: "block" }} />
              <div style={{ display:"flex", alignItems:"center", gap:4 }}>
                <button className="lp-sign-in">Sign In</button>
                <button className="lp-join-btn" onClick={onJoinClick}>
                  Join as Freelancer <FiArrowUpRight size={13} />
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
          {/* Strong white glow to further fade animation */}
          <div style={{
            position:"absolute", inset:0, pointerEvents:"none",
            background:"radial-gradient(ellipse 80% 70% at 50% 50%, rgba(255,255,255,0.92) 0%, rgba(255,255,255,0.60) 50%, rgba(255,255,255,0.15) 80%, transparent 100%)",
          }} />

          <div className="max-w-4xl mx-auto" style={{ position:"relative", zIndex:10 }}>

            <span style={{
              display:"inline-block", background:"#DCFCE7", color:"#1A3D1F",
              padding:"5px 18px", borderRadius:100, fontSize:12, fontWeight:600,
              letterSpacing:"2px", textTransform:"uppercase", marginBottom:24,
              border:"1px solid #D1FAE5",
            }}>
              FREELANCER PLATFORM
            </span>

            <h2 style={{
              fontFamily:"'Poppins',sans-serif", fontSize:"clamp(32px,5vw,58px)",
              fontWeight:800, lineHeight:1.15, color:"#0D2855", marginBottom:20,
            }}>
              Get Hired for Work <br />
              <span style={{
                background:"linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%)",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", backgroundClip:"text",
              }}>You Love</span>
            </h2>

            <p style={{ color:"#6B7280", fontSize:17, maxWidth:520, margin:"0 auto 36px" }}>
              Build your profile, showcase your skills, get matched with verified clients
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="lp-btn-primary" onClick={onJoinClick}>
                Join as a Freelancer →
              </button>
              <button className="lp-btn-ghost">
                ▶ See How It Works
              </button>
            </div>
          </div>
        </section>

        {/* ══ FEATURES ══ */}
        <section className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
          <div className="max-w-7xl mx-auto grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard icon={<ShieldCheck size={28} />} title="Verified Clients Only"     desc="No fake leads, no wasted time" />
            <FeatureCard icon={<DollarSign size={28} />}  title="Secure Milestone Payments" desc="Get paid for every milestone you complete" />
            <FeatureCard icon={<Briefcase size={28} />}   title="AI-Matched Projects"       desc="No bidding wars, no spam proposals" />
            <FeatureCard icon={<Scale size={28} />}       title="Platform Protection"       desc="You're protected if a client doesn't pay" />
          </div>
        </section>

        {/* ══ WHY SECTION ══ */}
        <section className="px-6 pb-20" style={{ background:"#FFFFFF" }}>
          <div className="max-w-5xl mx-auto rounded-2xl p-10"
            style={{ background:"#fff", border:"1px solid #DBEAFE", boxShadow:"0 4px 24px rgba(27,114,192,0.07)" }}>
            <h3 style={{ fontFamily:"'Poppins',sans-serif", fontWeight:700, fontSize:22, color:"#0D2855", textAlign:"center", marginBottom:32 }}>
              Why Freelancers Choose Weblance
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <CheckItem text="No hidden fees until you earn" />
              <CheckItem text="Keep up to 90% of every project" />
              <CheckItem text="Cancel or pause anytime" />
              <CheckItem text="Admin support 24/7" />
            </div>
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="px-6 pb-24" style={{ background:"#FFFFFF" }}>
          <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center gap-8">
            <Stat number="8,500+" label="Verified Professionals" />
            <Stat number="94%"    label="Completion Rate" />
            <Stat number="$12M+"  label="Paid to Freelancers" />
            <Stat number="4.8 ★"  label="Avg Rating" />
          </div>
        </section>

      </div>
    </>
  );
};

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
    <CheckCircle size={20} style={{ color:"#6FDA44", flexShrink:0 }} />
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








