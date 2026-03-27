

//  import React, { useEffect, useRef } from "react";
// import { useNavigate } from "react-router-dom";
// import { FaUser } from "react-icons/fa";
// import { FiArrowUpRight } from "react-icons/fi";
// import { HiOutlineOfficeBuilding, HiArrowRight, HiOutlineUserGroup } from "react-icons/hi";
// import { RiShieldCheckLine } from "react-icons/ri";
// import { BiMessageSquareDetail } from "react-icons/bi";
// import { BsRobot, BsShieldCheck, BsCurrencyDollar, BsShield } from "react-icons/bs";

// /* ─────────────────────────────────────────────────────
//    WEBLANCE PALETTE (Logo-inspired)
//    Green  : #6FDA44  →  #42A82D
//    Blue   : #1B72C0  →  #0D4A8F
//    Navy   : #0D2855
//    ───────────────────────────────────────────────────── */

// const NeuralBg = () => {
//   const canvasRef = useRef(null);

//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");

//     let animationId;
//     let nodes = [];
//     const NODE_COUNT = 68;
//     const MAX_DIST = 160;

//     const resize = () => {
//       canvas.width = canvas.offsetWidth;
//       canvas.height = canvas.offsetHeight;
//     };

//     const initNodes = () => {
//       nodes = Array.from({ length: NODE_COUNT }, () => ({
//         x: Math.random() * canvas.width,
//         y: Math.random() * canvas.height,
//         vx: (Math.random() - 0.5) * 0.45,
//         vy: (Math.random() - 0.5) * 0.45,
//         r: Math.random() < 0.18 ? 3.8 : Math.random() < 0.45 ? 2.5 : 1.8,
//         opacity: 0.22 + Math.random() * 0.32,
//         isBlue: Math.random() > 0.55,
//       }));
//     };

//     const draw = () => {
//       ctx.clearRect(0, 0, canvas.width, canvas.height);
//       nodes.forEach(n => {
//         n.x += n.vx;
//         n.y += n.vy;
//         if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
//         if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
//       });
//       for (let i = 0; i < nodes.length; i++) {
//         for (let j = i + 1; j < nodes.length; j++) {
//           const dx = nodes[i].x - nodes[j].x;
//           const dy = nodes[i].y - nodes[j].y;
//           const dist = Math.sqrt(dx * dx + dy * dy);
//           if (dist < MAX_DIST) {
//             const alpha = (1 - dist / MAX_DIST) * 0.22;
//             const lineColor = (nodes[i].isBlue && nodes[j].isBlue)
//               ? `rgba(27,114,192,${alpha})`
//               : (!nodes[i].isBlue && !nodes[j].isBlue)
//               ? `rgba(111,218,68,${alpha})`
//               : `rgba(80,160,120,${alpha})`;
//             ctx.beginPath();
//             ctx.strokeStyle = lineColor;
//             ctx.lineWidth = 1;
//             ctx.moveTo(nodes[i].x, nodes[i].y);
//             ctx.lineTo(nodes[j].x, nodes[j].y);
//             ctx.stroke();
//           }
//         }
//       }
//       nodes.forEach(n => {
//         ctx.beginPath();
//         ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
//         ctx.fillStyle = n.isBlue
//           ? `rgba(27,114,192,${n.opacity})`
//           : `rgba(111,218,68,${n.opacity})`;
//         ctx.fill();
//       });
//       animationId = requestAnimationFrame(draw);
//     };

//     resize();
//     initNodes();
//     draw();

//     const observer = new ResizeObserver(() => { resize(); initNodes(); });
//     observer.observe(canvas);

//     return () => {
//       cancelAnimationFrame(animationId);
//       observer.disconnect();
//     };
//   }, []);

//   return (
//     <canvas
//       ref={canvasRef}
//       style={{ position:"absolute", inset:0, width:"100%", height:"100%", pointerEvents:"none", display:"block" }}
//     />
//   );
// };

// const Hero = () => {
//   const navigate = useNavigate();

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Poppins:wght@300;400;500;600;700&display=swap');

//         * { font-family: 'Poppins', sans-serif; }

//         @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
//         @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
//         @keyframes scaleIn  { from{opacity:0;transform:scale(0.96)}       to{opacity:1;transform:scale(1)}     }
//         @keyframes blink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
//         @keyframes swoosh   { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

//         .a-badge { animation:scaleIn .5s .05s ease both }
//         .a-h1    { animation:fadeDown .6s .15s ease both }
//         .a-sub   { animation:fadeUp .6s .28s ease both }
//         .a-btns  { animation:fadeUp .6s .38s ease both }
//         .a-links { animation:fadeUp .6s .46s ease both }
//         .a-comp  { animation:fadeUp .6s .54s ease both }
//         .a-feat  { animation:fadeUp .6s .62s ease both }
//         .a-stats { animation:fadeUp .6s .70s ease both }
//         .a-cta   { animation:fadeUp .6s .78s ease both }

//         .ai-badge {
//           display:inline-flex; align-items:center; gap:8px;
//           border-radius:100px; padding:7px 18px; margin-bottom:28px;
//           font-size:10.5px; font-weight:600; letter-spacing:2.5px;
//           text-transform:uppercase; font-family:'Poppins',sans-serif;
//           background:#FFFFFF; color:#0D2855;
//           border:1.5px solid transparent; background-clip:padding-box; position:relative;
//         }
//         .ai-badge::before {
//           content:''; position:absolute; inset:-1.5px; border-radius:100px;
//           background:linear-gradient(135deg,#6FDA44 0%,#1B72C0 60%,#0D4A8F 100%); z-index:-1;
//         }

//         .gradient-text {
//           background:linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%);
//           background-size:200% 200%; animation:swoosh 4s ease infinite;
//           -webkit-background-clip:text; -webkit-text-fill-color:transparent; background-clip:text;
//         }

//         .feat-card { transition:all .22s ease }
//         .feat-card:hover { transform:translateY(-3px); box-shadow:0 8px 28px rgba(27,114,192,0.13)!important; border-color:#1B72C0!important }
//         .feat-card.green:hover { box-shadow:0 8px 28px rgba(111,218,68,0.14)!important; border-color:#6FDA44!important }
//         .comp-row { transition:background .2s }
//         .comp-row:hover { background:#EFF6FF!important; border-radius:12px }

//         .btn-primary {
//           display:flex; align-items:center; gap:8px; border:none; cursor:pointer;
//           font-size:13.5px; font-family:'Poppins',sans-serif; font-weight:600;
//           background:linear-gradient(135deg,#0D2855 0%,#1B72C0 100%);
//           color:#fff; padding:12px 26px; border-radius:100px;
//           box-shadow:0 3px 18px rgba(13,40,85,0.30); transition:all .2s;
//         }
//         .btn-primary:hover { background:linear-gradient(135deg,#163580 0%,#0D4A8F 100%); transform:translateY(-1px); box-shadow:0 5px 22px rgba(13,40,85,0.40) }

//         .btn-ghost {
//           display:flex; align-items:center; gap:8px; cursor:pointer;
//           font-size:13.5px; font-family:'Poppins',sans-serif; font-weight:500;
//           background:#FFFFFF; color:#1C1C1C; border:1.5px solid #D1E8FF;
//           padding:12px 24px; border-radius:100px; transition:all .2s;
//         }
//         .btn-ghost:hover { border-color:#1B72C0; color:#0D2855; transform:translateY(-1px); background:#F0F7FF }

//         .stat-item { transition:transform .2s }
//         .stat-item:hover { transform:translateY(-2px) }

//         .quick-link {
//           display:flex; align-items:center; gap:6px; background:transparent; border:none;
//           cursor:pointer; font-size:12px; font-family:'Poppins',sans-serif; color:#9CA3AF; transition:color .2s;
//         }
//         .quick-link:hover { color:#1B72C0 }
//       `}</style>

//       <div style={{ background:"#FFFFFF", fontFamily:"'Poppins',sans-serif", minHeight:"100vh" }}>

//         {/* ══ HERO ══ */}
//         <section className="relative overflow-hidden" style={{ paddingTop:110, paddingBottom:60 }}>
//           <NeuralBg />
//           <div className="relative z-10 flex flex-col items-center text-center px-6 mx-auto" style={{ maxWidth:760 }}>

//             {/* Badge */}
//             <div className="a-badge ai-badge">
//               <span style={{ width:6, height:6, borderRadius:"50%", flexShrink:0, background:"linear-gradient(135deg,#6FDA44,#1B72C0)", animation:"blink 2.2s ease infinite", display:"inline-block" }} />
//               AI-POWERED FREELANCE INTELLIGENCE
//             </div>

//             {/* Headline */}
//             <h1 className="a-h1 text-center mb-5" style={{ lineHeight:1.1, letterSpacing:-0.5 }}>
//               <span style={{ fontSize:"clamp(34px,5vw,62px)", fontWeight:800, color:"#1C1C1C", fontFamily:"'Montserrat',sans-serif" }}>Verified </span>
//               <span style={{ fontSize:"clamp(34px,5vw,62px)", fontFamily:"'Montserrat',sans-serif", fontStyle:"italic", fontWeight:800, color:"#1C1C1C" }}>Talent.</span>
//               <br />
//               <span style={{ fontSize:"clamp(34px,5vw,62px)", fontWeight:800, color:"#1C1C1C", fontFamily:"'Montserrat',sans-serif" }}>Governed </span>
//               <span style={{ fontSize:"clamp(34px,5vw,62px)", fontFamily:"'Montserrat',sans-serif", fontStyle:"italic", fontWeight:800, color:"#1C1C1C" }}>Projects.</span>
//               <br />
//               <span className="gradient-text" style={{ fontSize:"clamp(34px,5vw,62px)", fontWeight:900, fontFamily:"'Montserrat',sans-serif" }}>
//                 Guaranteed Results.
//               </span>
//             </h1>

//             {/* Subtitle */}
//             <p className="a-sub text-center leading-relaxed mb-8" style={{ color:"#6B7280", maxWidth:480, fontWeight:400, fontSize:15 }}>
//               Weblance connects you with{" "}
//               <strong style={{ color:"#1C1C1C", fontWeight:600 }}>AI-verified professionals</strong>
//               , governs every project with smart automation, and protects every dollar in escrow.
//             </p>

//             {/* Buttons */}
//             <div className="a-btns flex flex-wrap items-center justify-center gap-3 mb-5">
//               <button className="btn-primary" onClick={() => navigate("/freelancer")}>
//                 <FaUser size={12} /> Join as Freelancer <FiArrowUpRight size={13} />
//               </button>
//               <button className="btn-ghost" onClick={() => navigate("/hire-talent")}>
//                 <HiOutlineOfficeBuilding size={15} /> Hire Talent
//               </button>
//               <button className="btn-ghost" onClick={() => navigate("/register-agency")} style={{ whiteSpace:"nowrap" }}>
//                 <HiOutlineUserGroup size={15} /> Register Agency
//               </button>
//             </div>

//             {/* Quick links */}
//             <div className="a-links flex gap-6">
//               {[
//                 { icon:<RiShieldCheckLine size={12} />,     label:"Admin Panel",        path:"/admin"          },
//                 { icon:<BiMessageSquareDetail size={12} />, label:"ProjectStream Demo", path:"/project-stream" },
//               ].map(({ icon, label, path }) => (
//                 <button key={label} className="quick-link" onClick={() => navigate(path)}>
//                   {icon} {label}
//                 </button>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══ COMPARISON ══ */}
//         <section className="a-comp px-6 pb-8 relative z-10" style={{ background:"#FFFFFF" }}>
//           <div className="mx-auto rounded-2xl p-7" style={{ maxWidth:680, background:"#FFFFFF", border:"1px solid #DBEAFE", boxShadow:"0 4px 24px rgba(27,114,192,0.07)" }}>
//             <h2 className="text-center font-bold text-base mb-6" style={{ fontFamily:"'Montserrat',sans-serif", color:"#0D2855" }}>
//               Weblance vs The Rest
//             </h2>
//             <div className="flex flex-col">
//               {[
//                 { name:"Upwork",     them:"Post & hope",  us:"AI-guided always"  },
//                 { name:"Fiverr",     them:"Gig browsing", us:"Curated matching"  },
//                 { name:"Truelancer", them:"Manual trust", us:"AI-verified trust" },
//               ].map(({ name, them, us }, i) => (
//                 <div key={name} className="comp-row flex items-center gap-3 py-3.5 px-2" style={{ borderBottom: i < 2 ? "1px solid #DBEAFE" : "none" }}>
//                   <div className="w-36">
//                     <span style={{ fontSize:13, fontWeight:600, color:"#1C1C1C" }}>{name}:</span>
//                   </div>
//                   <div className="flex-1">
//                     <span style={{ fontSize:13, fontStyle:"italic", color:"#9CA3AF" }}>{them}</span>
//                   </div>
//                   <div className="flex items-center justify-center flex-shrink-0"
//                     style={{ width:24, height:24, borderRadius:"50%", background:"linear-gradient(135deg,#6FDA44,#1B72C0)" }}>
//                     <HiArrowRight size={11} color="#fff" />
//                   </div>
//                   <div className="flex-1">
//                     <span style={{ fontSize:13, fontWeight:600, color:"#0D2855" }}>{us}</span>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         {/* ══ FEATURES 2×2 ══ */}
//         <section className="a-feat px-6 pb-8 relative z-10" style={{ background:"#FFFFFF" }}>
//           <div className="mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3" style={{ maxWidth:780 }}>
//             {[
//               { icon:<BsRobot size={17} />,          title:"AI-Powered Matching",        desc:"No bidding wars — AI matches verified talent to your exact project needs", isBlue:false },
//               { icon:<BsShieldCheck size={17} />,    title:"Verified Professionals",     desc:"Every freelancer and agency is AI-tested and identity-verified",           isBlue:true  },
//               { icon:<BsCurrencyDollar size={17} />, title:"Secure Escrow Payments",     desc:"Money is protected until milestones are approved — no risk",              isBlue:true  },
//               { icon:<BsShield size={17} />,         title:"Platform-Governed Projects", desc:"Admin-backed dispute resolution, silence timers, and full audit trail",   isBlue:false },
//             ].map(({ icon, title, desc, isBlue }) => (
//               <div key={title} className={`feat-card ${isBlue ? "" : "green"} flex items-start gap-3.5 rounded-2xl p-5 cursor-default`}
//                 style={{ background:"#FFFFFF", border:`1px solid ${isBlue ? "#DBEAFE" : "#E8F5E1"}`, boxShadow:"0 2px 8px rgba(0,0,0,0.04)" }}>
//                 <div className="flex items-center justify-center rounded-xl flex-shrink-0"
//                   style={{ width:40, height:40, background:isBlue?"#EFF6FF":"#DCFCE7", color:isBlue?"#1B72C0":"#2A6020", border:`1px solid ${isBlue?"#BFDBFE":"#D1FAE5"}` }}>
//                   {icon}
//                 </div>
//                 <div>
//                   <h3 style={{ fontWeight:700, fontSize:13.5, marginBottom:4, color:"#0D2855" }}>{title}</h3>
//                   <p style={{ fontSize:12, lineHeight:1.6, color:"#6B7280" }}>{desc}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </section>

//         {/* ══ STATS ══ */}
//         <section className="a-stats px-6 relative z-10" style={{ paddingBottom:0 }}>
//           <div className="mx-auto rounded-2xl" style={{ maxWidth:780, background:"linear-gradient(135deg,#F0FDF4 0%,#EFF6FF 100%)", border:"1px solid #DBEAFE", boxShadow:"0 2px 16px rgba(27,114,192,0.08)" }}>
//             <div className="flex flex-wrap items-center justify-center gap-10 py-8 px-6">
//               {[
//                 { v:"8,500+", l:"Verified Professionals", color:"#0D2855" },
//                 { v:"94%",    l:"Completion Rate",         color:"#1B72C0" },
//                 { v:"$12M+",  l:"Paid to Talent",          color:"#0D2855" },
//                 { v:"4.8",    l:"Avg Rating", star:true,   color:"#1B72C0" },
//               ].map(({ v, l, star, color }) => (
//                 <div key={l} className="stat-item text-center cursor-default">
//                   <div className="font-black text-3xl mb-1 flex items-center gap-1.5 justify-center"
//                     style={{ fontFamily:"'Montserrat',sans-serif", fontWeight:800, color }}>
//                     {v}
//                     {star && <span style={{ color:"#F59E0B", fontSize:24 }}>★</span>}
//                   </div>
//                   <div style={{ fontSize:11, color:"#6B7280" }}>{l}</div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </section>

//         <div style={{ height:48 }} />

//         {/* ══ CTA ══ */}
//         <section className="a-cta px-6 pb-16 relative z-10" style={{ background:"#FFFFFF" }}>
//           <div className="mx-auto flex flex-wrap items-center justify-between gap-4 px-10"
//             style={{ maxWidth:820, paddingTop:28, paddingBottom:28, background:"linear-gradient(135deg,#0D2855 0%,#1B72C0 100%)", borderRadius:20, boxShadow:"0 4px 28px rgba(13,40,85,0.22)" }}>
//             <p style={{ fontSize:15, fontWeight:500, color:"#FFFFFF", margin:0 }}>
//               🚀 Ready to build your verified professional profile?
//             </p>
//             <button style={{ display:"flex", alignItems:"center", gap:8, border:"none", cursor:"pointer", fontSize:13.5, fontFamily:"'Poppins',sans-serif", fontWeight:600, background:"#6FDA44", color:"#0D2855", padding:"12px 26px", borderRadius:"100px", boxShadow:"0 3px 16px rgba(111,218,68,0.35)", transition:"all .2s", flexShrink:0 }}>
//               Get Started Free <FiArrowUpRight size={14} />
//             </button>
//           </div>
//         </section>

//       </div>
//     </>
//   );
// };

// export default Hero;







import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineOfficeBuilding, HiArrowRight, HiOutlineUserGroup } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsRobot, BsShieldCheck, BsCurrencyDollar, BsShield } from "react-icons/bs";

const NeuralBg = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let animationId;
    let nodes = [];
    const NODE_COUNT = 68;
    const MAX_DIST = 160;

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const initNodes = () => {
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        r: Math.random() < 0.18 ? 3.8 : Math.random() < 0.45 ? 2.5 : 1.8,
        opacity: 0.22 + Math.random() * 0.32,
        isBlue: Math.random() > 0.55,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width)  n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            const lineColor = (nodes[i].isBlue && nodes[j].isBlue)
              ? `rgba(27,114,192,${alpha})`
              : (!nodes[i].isBlue && !nodes[j].isBlue)
              ? `rgba(111,218,68,${alpha})`
              : `rgba(80,160,120,${alpha})`;
            ctx.beginPath();
            ctx.strokeStyle = lineColor;
            ctx.lineWidth = 1;
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }
      nodes.forEach(n => {
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = n.isBlue ? `rgba(27,114,192,${n.opacity})` : `rgba(111,218,68,${n.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize(); initNodes(); draw();
    const observer = new ResizeObserver(() => { resize(); initNodes(); });
    observer.observe(canvas);
    return () => { cancelAnimationFrame(animationId); observer.disconnect(); };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", display: "block" }}
    />
  );
};

const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,700;0,800;0,900;1,700;1,800;1,900&family=Poppins:wght@300;400;500;600;700&display=swap');

        *, *::before, *::after { box-sizing: border-box; }
        * { font-family: 'Poppins', sans-serif; }

        @keyframes fadeDown { from{opacity:0;transform:translateY(-14px)} to{opacity:1;transform:translateY(0)} }
        @keyframes fadeUp   { from{opacity:0;transform:translateY(16px)}  to{opacity:1;transform:translateY(0)} }
        @keyframes scaleIn  { from{opacity:0;transform:scale(0.96)}       to{opacity:1;transform:scale(1)}     }
        @keyframes blink    { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.5;transform:scale(.75)} }
        @keyframes swoosh   { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }

        .a-badge { animation:scaleIn .5s .05s ease both }
        .a-h1    { animation:fadeDown .6s .15s ease both }
        .a-sub   { animation:fadeUp .6s .28s ease both }
        .a-btns  { animation:fadeUp .6s .38s ease both }
        .a-links { animation:fadeUp .6s .46s ease both }
        .a-comp  { animation:fadeUp .6s .54s ease both }
        .a-feat  { animation:fadeUp .6s .62s ease both }
        .a-stats { animation:fadeUp .6s .70s ease both }
        .a-cta   { animation:fadeUp .6s .78s ease both }

        .ai-badge {
          display: inline-flex; align-items: center; gap: 8px;
          border-radius: 100px; padding: 7px 18px; margin-bottom: 28px;
          font-size: 10.5px; font-weight: 600; letter-spacing: 2.5px;
          text-transform: uppercase; font-family: 'Poppins', sans-serif;
          background: #FFFFFF; color: #0D2855;
          border: 1.5px solid transparent; background-clip: padding-box; position: relative;
        }
        .ai-badge::before {
          content: ''; position: absolute; inset: -1.5px; border-radius: 100px;
          background: linear-gradient(135deg,#6FDA44 0%,#1B72C0 60%,#0D4A8F 100%); z-index: -1;
        }

        .gradient-text {
          background: linear-gradient(100deg,#6FDA44 0%,#1B72C0 55%,#0D2855 100%);
          background-size: 200% 200%; animation: swoosh 4s ease infinite;
          -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;
        }

        .feat-card { transition: all .22s ease }
        .feat-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px rgba(27,114,192,0.13) !important; border-color: #1B72C0 !important }
        .feat-card.green:hover { box-shadow: 0 8px 28px rgba(111,218,68,0.14) !important; border-color: #6FDA44 !important }

        .comp-row { transition: background .2s }
        .comp-row:hover { background: #EFF6FF !important; border-radius: 12px }

        .btn-primary {
          display: flex; align-items: center; gap: 8px; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 600;
          background: linear-gradient(135deg,#0D2855 0%,#1B72C0 100%);
          color: #fff; border-radius: 100px;
          box-shadow: 0 3px 18px rgba(13,40,85,0.30); transition: all .2s;
          white-space: nowrap;
          font-size: 13.5px; padding: 12px 26px;
        }
        .btn-primary:hover { background: linear-gradient(135deg,#163580 0%,#0D4A8F 100%); transform: translateY(-1px); box-shadow: 0 5px 22px rgba(13,40,85,0.40) }

        .btn-ghost {
          display: flex; align-items: center; gap: 8px; cursor: pointer;
          font-family: 'Poppins', sans-serif; font-weight: 500;
          background: #FFFFFF; color: #1C1C1C; border: 1.5px solid #D1E8FF;
          border-radius: 100px; transition: all .2s; white-space: nowrap;
          font-size: 13.5px; padding: 12px 24px;
        }
        .btn-ghost:hover { border-color: #1B72C0; color: #0D2855; transform: translateY(-1px); background: #F0F7FF }

        .stat-item { transition: transform .2s }
        .stat-item:hover { transform: translateY(-2px) }

        .quick-link {
          display: flex; align-items: center; gap: 6px; background: transparent; border: none;
          cursor: pointer; font-family: 'Poppins', sans-serif; color: #9CA3AF; transition: color .2s;
          font-size: 12px;
        }
        .quick-link:hover { color: #1B72C0 }

        /* ════════════════════════════════
           RESPONSIVE BREAKPOINTS
        ════════════════════════════════ */

        /* ── Small Mobile: ≤360px ── */
        @media (max-width: 360px) {
          .hero-section { padding-top: 80px !important; padding-bottom: 40px !important; }
          .hero-inner { padding: 0 14px !important; }
          .ai-badge { font-size: 8.5px !important; letter-spacing: 1.5px !important; padding: 6px 12px !important; margin-bottom: 18px !important; }
          .btn-primary { font-size: 12px !important; padding: 10px 16px !important; }
          .btn-ghost { font-size: 12px !important; padding: 10px 14px !important; }
          .hero-btns { gap: 8px !important; flex-direction: column !important; align-items: stretch !important; }
          .hero-btns .btn-primary,
          .hero-btns .btn-ghost { width: 100% !important; justify-content: center !important; }
          .quick-links { gap: 14px !important; flex-wrap: wrap !important; justify-content: center !important; }
          .comp-box { padding: 16px !important; }
          .comp-row { flex-wrap: wrap !important; gap: 4px !important; }
          .comp-name { width: 100% !important; }
          .stats-row { gap: 20px !important; padding: 20px 14px !important; }
          .cta-box { flex-direction: column !important; align-items: center !important; text-align: center !important; padding: 20px 16px !important; }
          .cta-btn { width: 100% !important; justify-content: center !important; }
        }

        /* ── Mobile: 361–480px ── */
        @media (min-width: 361px) and (max-width: 480px) {
          .hero-section { padding-top: 90px !important; padding-bottom: 44px !important; }
          .hero-inner { padding: 0 16px !important; }
          .ai-badge { font-size: 9px !important; letter-spacing: 1.8px !important; padding: 6px 14px !important; }
          .hero-btns { gap: 10px !important; }
          .hero-btns .btn-primary,
          .hero-btns .btn-ghost { font-size: 12.5px !important; padding: 11px 18px !important; }
          .comp-box { padding: 18px !important; }
          .comp-row { flex-wrap: wrap !important; }
          .comp-name { min-width: 80px !important; }
          .stats-row { gap: 24px !important; padding: 22px 16px !important; }
          .stat-value { font-size: 26px !important; }
          .cta-box { flex-direction: column !important; align-items: center !important; text-align: center !important; padding: 22px 18px !important; }
          .cta-btn { width: 100% !important; justify-content: center !important; }
        }

        /* ── Large Mobile / Small Tablet: 481–640px ── */
        @media (min-width: 481px) and (max-width: 640px) {
          .hero-section { padding-top: 100px !important; padding-bottom: 50px !important; }
          .hero-inner { padding: 0 20px !important; }
          .hero-btns { gap: 10px !important; flex-wrap: wrap !important; justify-content: center !important; }
          .feat-grid { grid-template-columns: 1fr !important; }
          .stats-row { gap: 28px !important; padding: 24px 18px !important; }
          .stat-value { font-size: 28px !important; }
          .cta-box { flex-direction: column !important; align-items: center !important; text-align: center !important; gap: 16px !important; }
          .cta-btn { width: auto !important; }
        }

        /* ── Tablet: 641–900px ── */
        @media (min-width: 641px) and (max-width: 900px) {
          .hero-section { padding-top: 100px !important; }
          .hero-inner { padding: 0 24px !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
          .stats-row { gap: 32px !important; }
          .cta-box { flex-direction: row !important; }
        }

        /* ── All screens ≤640px: hide comparison arrows if too cramped ── */
        @media (max-width: 480px) {
          .comp-arrow { display: none !important; }
          .comp-them { font-size: 11px !important; }
          .comp-us { font-size: 11px !important; }
        }
      `}</style>

      <div style={{ background: "#FFFFFF", fontFamily: "'Poppins',sans-serif", minHeight: "100vh" }}>

        {/* ══ HERO ══ */}
        <section
          className="hero-section"
          style={{ position: "relative", overflow: "hidden", paddingTop: 110, paddingBottom: 60 }}
        >
          <NeuralBg />
          <div
            className="hero-inner"
            style={{
              position: "relative", zIndex: 10,
              display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center",
              padding: "0 24px", margin: "0 auto", maxWidth: 760,
            }}
          >
            {/* Badge */}
            <div className="a-badge ai-badge">
              <span style={{ width: 6, height: 6, borderRadius: "50%", flexShrink: 0, background: "linear-gradient(135deg,#6FDA44,#1B72C0)", animation: "blink 2.2s ease infinite", display: "inline-block" }} />
              AI-POWERED FREELANCE INTELLIGENCE
            </div>

            {/* Headline */}
            <h1 className="a-h1" style={{ lineHeight: 1.1, letterSpacing: -0.5, marginBottom: 20, textAlign: "center" }}>
              <span style={{ fontSize: "clamp(28px,6vw,62px)", fontWeight: 800, color: "#1C1C1C", fontFamily: "'Montserrat',sans-serif" }}>Verified </span>
              <span style={{ fontSize: "clamp(28px,6vw,62px)", fontFamily: "'Montserrat',sans-serif", fontStyle: "italic", fontWeight: 800, color: "#1C1C1C" }}>Talent.</span>
              <br />
              <span style={{ fontSize: "clamp(28px,6vw,62px)", fontWeight: 800, color: "#1C1C1C", fontFamily: "'Montserrat',sans-serif" }}>Governed </span>
              <span style={{ fontSize: "clamp(28px,6vw,62px)", fontFamily: "'Montserrat',sans-serif", fontStyle: "italic", fontWeight: 800, color: "#1C1C1C" }}>Projects.</span>
              <br />
              <span className="gradient-text" style={{ fontSize: "clamp(28px,6vw,62px)", fontWeight: 900, fontFamily: "'Montserrat',sans-serif" }}>
                Guaranteed Results.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="a-sub" style={{ color: "#6B7280", maxWidth: 480, fontWeight: 400, fontSize: "clamp(13px,2vw,15px)", lineHeight: 1.7, marginBottom: 32, textAlign: "center" }}>
              Weblance connects you with{" "}
              <strong style={{ color: "#1C1C1C", fontWeight: 600 }}>AI-verified professionals</strong>
              , governs every project with smart automation, and protects every dollar in escrow.
            </p>

            {/* Buttons */}
            <div
              className="a-btns hero-btns"
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 20 }}
            >
              <button className="btn-primary" onClick={() => navigate("/freelancer")}>
                <FaUser size={12} /> Join as Freelancer <FiArrowUpRight size={13} />
              </button>
              <button className="btn-ghost" onClick={() => navigate("/hire-talent")}>
                <HiOutlineOfficeBuilding size={15} /> Hire Talent
              </button>
              <button className="btn-ghost" onClick={() => navigate("/register-agency")}>
                <HiOutlineUserGroup size={15} /> Register Agency
              </button>
            </div>

            {/* Quick links */}
            <div className="a-links quick-links" style={{ display: "flex", gap: 24, flexWrap: "wrap", justifyContent: "center" }}>
              {[
                { icon: <RiShieldCheckLine size={12} />,     label: "Admin Panel",        path: "/admin"          },
                { icon: <BiMessageSquareDetail size={12} />, label: "ProjectStream Demo", path: "/project-stream" },
              ].map(({ icon, label, path }) => (
                <button key={label} className="quick-link" onClick={() => navigate(path)}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARISON ══ */}
        <section className="a-comp" style={{ background: "#FFFFFF", padding: "0 16px 32px", position: "relative", zIndex: 10 }}>
          <div
            className="comp-box"
            style={{ margin: "0 auto", borderRadius: 16, padding: 28, maxWidth: 680, background: "#FFFFFF", border: "1px solid #DBEAFE", boxShadow: "0 4px 24px rgba(27,114,192,0.07)" }}
          >
            <h2 style={{ textAlign: "center", fontWeight: 700, fontSize: "clamp(13px,2vw,16px)", marginBottom: 24, fontFamily: "'Montserrat',sans-serif", color: "#0D2855" }}>
              Weblance vs The Rest
            </h2>
            <div style={{ display: "flex", flexDirection: "column" }}>
              {[
                { name: "Upwork",     them: "Post & hope",  us: "AI-guided always"  },
                { name: "Fiverr",     them: "Gig browsing", us: "Curated matching"  },
                { name: "Truelancer", them: "Manual trust", us: "AI-verified trust" },
              ].map(({ name, them, us }, i) => (
                <div
                  key={name}
                  className="comp-row"
                  style={{ display: "flex", alignItems: "center", gap: 12, padding: "14px 8px", borderBottom: i < 2 ? "1px solid #DBEAFE" : "none" }}
                >
                  <div className="comp-name" style={{ width: 100, flexShrink: 0 }}>
                    <span style={{ fontSize: 13, fontWeight: 600, color: "#1C1C1C" }}>{name}:</span>
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="comp-them" style={{ fontSize: 13, fontStyle: "italic", color: "#9CA3AF" }}>{them}</span>
                  </div>
                  <div
                    className="comp-arrow"
                    style={{ width: 24, height: 24, borderRadius: "50%", background: "linear-gradient(135deg,#6FDA44,#1B72C0)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
                  >
                    <HiArrowRight size={11} color="#fff" />
                  </div>
                  <div style={{ flex: 1 }}>
                    <span className="comp-us" style={{ fontSize: 13, fontWeight: 600, color: "#0D2855" }}>{us}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES 2×2 ══ */}
        <section className="a-feat" style={{ background: "#FFFFFF", padding: "0 16px 32px", position: "relative", zIndex: 10 }}>
          <div
            className="feat-grid"
            style={{ margin: "0 auto", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 12, maxWidth: 780 }}
          >
            {[
              { icon: <BsRobot size={17} />,          title: "AI-Powered Matching",        desc: "No bidding wars — AI matches verified talent to your exact project needs", isBlue: false },
              { icon: <BsShieldCheck size={17} />,    title: "Verified Professionals",     desc: "Every freelancer and agency is AI-tested and identity-verified",           isBlue: true  },
              { icon: <BsCurrencyDollar size={17} />, title: "Secure Escrow Payments",     desc: "Money is protected until milestones are approved — no risk",              isBlue: true  },
              { icon: <BsShield size={17} />,         title: "Platform-Governed Projects", desc: "Admin-backed dispute resolution, silence timers, and full audit trail",   isBlue: false },
            ].map(({ icon, title, desc, isBlue }) => (
              <div
                key={title}
                className={`feat-card ${isBlue ? "" : "green"}`}
                style={{ display: "flex", alignItems: "flex-start", gap: 14, borderRadius: 16, padding: 20, cursor: "default", background: "#FFFFFF", border: `1px solid ${isBlue ? "#DBEAFE" : "#E8F5E1"}`, boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}
              >
                <div
                  style={{ width: 40, height: 40, borderRadius: 12, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, background: isBlue ? "#EFF6FF" : "#DCFCE7", color: isBlue ? "#1B72C0" : "#2A6020", border: `1px solid ${isBlue ? "#BFDBFE" : "#D1FAE5"}` }}
                >
                  {icon}
                </div>
                <div>
                  <h3 style={{ fontWeight: 700, fontSize: "clamp(12px,1.8vw,13.5px)", marginBottom: 4, color: "#0D2855" }}>{title}</h3>
                  <p style={{ fontSize: "clamp(11px,1.6vw,12px)", lineHeight: 1.6, color: "#6B7280", margin: 0 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="a-stats" style={{ padding: "0 16px 0", position: "relative", zIndex: 10 }}>
          <div style={{ margin: "0 auto", borderRadius: 16, maxWidth: 780, background: "linear-gradient(135deg,#F0FDF4 0%,#EFF6FF 100%)", border: "1px solid #DBEAFE", boxShadow: "0 2px 16px rgba(27,114,192,0.08)" }}>
            <div
              className="stats-row"
              style={{ display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "center", gap: 36, padding: "32px 24px" }}
            >
              {[
                { v: "8,500+", l: "Verified Professionals", color: "#0D2855" },
                { v: "94%",    l: "Completion Rate",         color: "#1B72C0" },
                { v: "$12M+",  l: "Paid to Talent",          color: "#0D2855" },
                { v: "4.8",    l: "Avg Rating", star: true,  color: "#1B72C0" },
              ].map(({ v, l, star, color }) => (
                <div key={l} className="stat-item" style={{ textAlign: "center", cursor: "default" }}>
                  <div
                    className="stat-value"
                    style={{ fontFamily: "'Montserrat',sans-serif", fontWeight: 800, color, fontSize: "clamp(24px,4vw,30px)", marginBottom: 4, display: "flex", alignItems: "center", gap: 6, justifyContent: "center" }}
                  >
                    {v}
                    {star && <span style={{ color: "#F59E0B", fontSize: 22 }}>★</span>}
                  </div>
                  <div style={{ fontSize: "clamp(10px,1.5vw,11px)", color: "#6B7280" }}>{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <div style={{ height: 48 }} />

        {/* ══ CTA ══ */}
        <section className="a-cta" style={{ background: "#FFFFFF", padding: "0 16px 64px", position: "relative", zIndex: 10 }}>
          <div
            className="cta-box"
            style={{ margin: "0 auto", maxWidth: 820, display: "flex", flexWrap: "wrap", alignItems: "center", justifyContent: "space-between", gap: 16, padding: "24px 40px", background: "linear-gradient(135deg,#0D2855 0%,#1B72C0 100%)", borderRadius: 20, boxShadow: "0 4px 28px rgba(13,40,85,0.22)" }}
          >
            <p style={{ fontSize: "clamp(13px,2vw,15px)", fontWeight: 500, color: "#FFFFFF", margin: 0 }}>
              🚀 Ready to build your verified professional profile?
            </p>
            <button
              className="cta-btn"
              style={{ display: "flex", alignItems: "center", gap: 8, border: "none", cursor: "pointer", fontSize: "clamp(12px,1.8vw,13.5px)", fontFamily: "'Poppins',sans-serif", fontWeight: 600, background: "#6FDA44", color: "#0D2855", padding: "12px 26px", borderRadius: 100, boxShadow: "0 3px 16px rgba(111,218,68,0.35)", transition: "all .2s", flexShrink: 0, whiteSpace: "nowrap" }}
            >
              Get Started Free <FiArrowUpRight size={14} />
            </button>
          </div>
        </section>

      </div>
    </>
  );
};

export default Hero;

