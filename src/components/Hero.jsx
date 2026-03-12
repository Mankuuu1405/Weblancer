import React, { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiArrowUpRight } from "react-icons/fi";
import { HiOutlineOfficeBuilding, HiArrowRight, HiOutlineUserGroup } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsRobot, BsShieldCheck, BsCurrencyDollar, BsShield } from "react-icons/bs";

/* ─── Animated Neural Canvas BG ─────────────────────────────── */
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
    const NODE_COLOR = "rgba(111, 218, 68,";
    const LINE_COLOR = "rgba(111, 218, 68,";

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
        opacity: 0.28 + Math.random() * 0.38,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes.forEach(n => {
        n.x += n.vx;
        n.y += n.vy;
        if (n.x < 0 || n.x > canvas.width) n.vx *= -1;
        if (n.y < 0 || n.y > canvas.height) n.vy *= -1;
      });
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.28;
            ctx.beginPath();
            ctx.strokeStyle = `${LINE_COLOR}${alpha})`;
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
        ctx.fillStyle = `${NODE_COLOR}${n.opacity})`;
        ctx.fill();
      });
      animationId = requestAnimationFrame(draw);
    };

    resize();
    initNodes();
    draw();

    const observer = new ResizeObserver(() => { resize(); initNodes(); });
    observer.observe(canvas);

    return () => {
      cancelAnimationFrame(animationId);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none block"
      style={{ zIndex: 0 }}
    />
  );
};

/* ════════════════════════
   HERO SECTION ONLY
════════════════════════ */
const Hero = () => {
  const navigate = useNavigate();

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,700;1,800;1,900&display=swap');
        * { box-sizing: border-box; font-family: 'Poppins', sans-serif; }

        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes fadeUp {
          from { opacity:0; transform:translateY(16px); }
          to   { opacity:1; transform:translateY(0); }
        }
        @keyframes scaleIn {
          from { opacity:0; transform:scale(0.96); }
          to   { opacity:1; transform:scale(1); }
        }
        @keyframes blink {
          0%,100% { opacity:1; transform:scale(1); }
          50%      { opacity:.5; transform:scale(.75); }
        }

        .a-badge { animation: scaleIn  .5s .10s ease both; }
        .a-h1    { animation: fadeDown .6s .20s ease both; }
        .a-sub   { animation: fadeUp   .6s .32s ease both; }
        .a-btns  { animation: fadeUp   .6s .42s ease both; }
        .a-links { animation: fadeUp   .6s .50s ease both; }
        .a-comp  { animation: fadeUp   .6s .58s ease both; }
        .a-feat  { animation: fadeUp   .6s .66s ease both; }
        .a-stats { animation: fadeUp   .6s .74s ease both; }
        .a-cta   { animation: fadeUp   .6s .82s ease both; }

        /* Badge gradient border */
        .ai-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border-radius: 100px;
          padding: 7px 18px;
          margin-bottom: 32px;
          font-size: 10.5px;
          font-weight: 600;
          letter-spacing: 2.5px;
          text-transform: uppercase;
          background: #FFFFFF;
          color: #1A3D1F;
          border: 2px solid rgb(111, 218, 68);
          position: relative;
        }
        .ai-badge::before {
          content: '';
          position: absolute;
          inset: -1.5px;
          border-radius: 100px;
          background: rgb(220, 252, 231);
          z-index: -1;
        }

        /* Gradient headline text */
        .gradient-text {
          background: linear-gradient(135deg, #6FDA44 0%, #3aad1e 50%, #1A3D1F 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Nav underline link */
        .quick-link-tw {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: transparent;
          border: none;
          cursor: pointer;
          font-size: 12px;
          font-family: 'Poppins', sans-serif;
          color: #9CA3AF;
          transition: color .2s;
        }
        .quick-link-tw:hover { color: #1A3D1F; }

        /* Feature card hover */
        .feat-card-tw {
          transition: all .22s ease;
        }
        .feat-card-tw:hover {
          transform: translateY(-3px);
          box-shadow: 0 8px 28px rgba(111,218,68,0.14) !important;
          border-color: #6FDA44 !important;
        }

        /* Comparison row hover */
        .comp-row-tw { transition: background .2s; }
        .comp-row-tw:hover { background: #F6FEF0 !important; border-radius: 12px; }

        /* Stat hover */
        .stat-item-tw { transition: transform .2s; }
        .stat-item-tw:hover { transform: translateY(-2px); }

        /* Blink dot */
        .blink-dot { animation: blink 2.2s ease infinite; }
      `}</style>

      <div className="bg-white min-h-screen">

        {/* ══ HERO SECTION ══ */}
        <section className="relative overflow-hidden bg-white pt-16 pb-16">
          <NeuralBg />

          <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-[720px] mx-auto">

            {/* Badge */}
            <div className="a-badge ai-badge">
              <span className="blink-dot w-1.5 h-1.5 rounded-full bg-[#6FDA44] flex-shrink-0 inline-block" />
              AI-POWERED FREELANCE INTELLIGENCE
            </div>

            {/* H1 */}
            <h1 className="a-h1 text-center mb-6" style={{ lineHeight: 1.08, letterSpacing: -1 }}>
              <span className="text-[clamp(38px,5.5vw,68px)] font-semibold text-[#1C1C1C]">Verified </span>
              <span className="text-[clamp(38px,5.5vw,68px)] font-normal italic text-[#1C1C1C]">Talent.</span>
              <br />
              <span className="text-[clamp(38px,5.5vw,68px)] font-semibold text-[#1C1C1C]">Governed </span>
              <span className="text-[clamp(38px,5.5vw,68px)] font-normal italic text-[#1C1C1C]">Projects.</span>
              <br />
              <span className="gradient-text text-[clamp(38px,5.5vw,68px)] font-semibold">
                Guaranteed Results.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="a-sub text-[#6B7280] max-w-[460px] font-normal text-[15px] leading-7 mb-9 text-center">
              Weblance connects you with{" "}
              <strong className="text-[#1C1C1C] font-semibold">AI-verified professionals</strong>
              , governs every project with smart automation, and protects every dollar in escrow.
            </p>

            {/* Buttons */}
            <div className="a-btns flex flex-wrap items-center justify-center gap-3 mb-5">
              {/* Primary */}
              <button
                onClick={() => navigate("/register")}
                className="inline-flex items-center gap-2 bg-[#1A3D1F] text-white text-[13.5px] font-semibold rounded-full border-none cursor-pointer transition-all duration-200 hover:bg-[#2A5C30] hover:-translate-y-px"
                style={{ padding: "12px 26px", boxShadow: "0 3px 16px rgba(26,61,31,0.28)", fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}
              >
                <FaUser size={12} /> Join as Freelancer <FiArrowUpRight size={13} />
              </button>

              {/* Ghost */}
              <button
                onClick={() => navigate("/hire")}
                className="inline-flex items-center gap-2 bg-white text-[#1C1C1C] text-[13.5px] font-medium rounded-full cursor-pointer transition-all duration-200 hover:border-[#6FDA44] hover:text-[#1A3D1F] hover:-translate-y-px"
                style={{ padding: "12px 24px", border: "1.5px solid #D1D5DB", fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}
              >
                <HiOutlineOfficeBuilding size={15} /> Hire Talent
              </button>

              <button
                onClick={() => navigate("/register-agency")}
                className="inline-flex items-center gap-2 bg-white text-[#1C1C1C] text-[13.5px] font-medium rounded-full cursor-pointer transition-all duration-200 hover:border-[#6FDA44] hover:text-[#1A3D1F] hover:-translate-y-px"
                style={{ padding: "12px 24px", border: "1.5px solid #D1D5DB", fontFamily: "'Poppins',sans-serif", whiteSpace: "nowrap" }}
              >
                <HiOutlineUserGroup size={15} /> Register Agency
              </button>
            </div>

            {/* Quick Links */}
            <div className="a-links flex gap-6">
              {[
                { icon: <RiShieldCheckLine size={12} />,     label: "Admin Panel",        path: "/admin"          },
                { icon: <BiMessageSquareDetail size={12} />, label: "ProjectStream Demo", path: "/project-stream" },
              ].map(({ icon, label, path }) => (
                <button key={label} className="quick-link-tw" onClick={() => navigate(path)}>
                  {icon} {label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ══ COMPARISON ══ */}
        <section className="a-comp bg-white px-6 pb-10">
          <div
            className="max-w-[640px] mx-auto bg-white rounded-[20px] px-8 py-7 border border-[#E4F0DC]"
            style={{ boxShadow: "0 4px 24px rgba(111,218,68,0.07)" }}
          >
            <h2 className="text-center font-bold text-base mb-5 text-[#1C1C1C]">
              Weblance vs The Rest
            </h2>
            <div>
              {[
                { name: "Upwork:",     them: "Post & hope",  us: "AI-guided always"  },
                { name: "Fiverr:",     them: "Gig browsing", us: "Curated matching"  },
                { name: "Truelancer:", them: "Manual trust", us: "AI-verified trust" },
              ].map(({ name, them, us }, i) => (
                <div
                  key={name}
                  className="comp-row-tw flex items-center gap-3 py-3.5 px-2"
                  style={{ borderBottom: i < 2 ? "1px solid #EEF7E6" : "none" }}
                >
                  <div className="w-[110px] flex-shrink-0">
                    <span className="text-[13px] font-semibold text-[#1C1C1C]">{name}</span>
                  </div>
                  <div className="flex-1">
                    <span className="text-[13px] italic text-[#9CA3AF]">{them}</span>
                  </div>
                  <div className="w-[22px] h-[22px] rounded-full bg-[#6FDA44] flex items-center justify-center flex-shrink-0">
                    <HiArrowRight size={11} color="#fff" />
                  </div>
                  <div className="flex-1">
                    <span className="text-[13px] font-semibold text-[#1A3D1F]">{us}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ FEATURES 2×2 ══ */}
        <section className="a-feat bg-white px-6 pb-10">
          <div className="max-w-[780px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {[
              { icon: <BsRobot size={18} />,          title: "AI-Powered Matching",        desc: "No bidding wars — AI matches verified talent to your exact project needs" },
              { icon: <BsShieldCheck size={18} />,    title: "Verified Professionals",     desc: "Every freelancer and agency is AI-tested and identity-verified"           },
              { icon: <BsCurrencyDollar size={18} />, title: "Secure Escrow Payments",     desc: "Money is protected until milestones are approved — no risk"              },
              { icon: <BsShield size={18} />,         title: "Platform-Governed Projects", desc: "Admin-backed dispute resolution, silence timers, and full audit trail"   },
            ].map(({ icon, title, desc }) => (
              <div
                key={title}
                className="feat-card-tw flex items-start gap-4 rounded-[18px] p-5 bg-white border border-[#E4F0DC]"
                style={{ boxShadow: "0 2px 10px rgba(0,0,0,0.04)" }}
              >
                <div className="w-[42px] h-[42px] bg-[#EDFCE3] text-[#1A3D1F] border border-[#D1FAE5] rounded-xl flex items-center justify-center flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <h3 className="font-bold text-[14px] mb-1 text-[#1C1C1C]">{title}</h3>
                  <p className="text-[12.5px] leading-relaxed text-[#6B7280] m-0">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══ STATS ══ */}
        <section className="a-stats bg-white px-6 pb-12">
          <div className="max-w-[780px] mx-auto">
            <div className="flex flex-wrap items-center justify-center gap-12 py-2">
              {[
                { v: "8,500+", l: "Verified Professionals" },
                { v: "94%",    l: "Completion Rate"        },
                { v: "$12M+",  l: "Paid to Talent"         },
                { v: "4.8",    l: "Avg Rating", star: true  },
              ].map(({ v, l, star }) => (
                <div key={l} className="stat-item-tw text-center cursor-default">
                  <div className="font-extrabold text-[#1C1C1C] text-3xl mb-1 flex items-center gap-1.5 justify-center">
                    {v}
                    {star && <span className="text-[#F59E0B] text-[22px]">★</span>}
                  </div>
                  <div className="text-[11.5px] text-[#6B7280]">{l}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══ CTA ══ */}
        <section className="a-cta bg-white px-6 pb-20">
          <div
            className="max-w-[560px] mx-auto bg-white border border-[#E4F0DC] rounded-[20px] flex flex-col items-center text-center px-8 py-7 gap-4"
            style={{ boxShadow: "0 4px 24px rgba(111,218,68,0.07)" }}
          >
            <p className="text-[14.5px] font-medium text-[#1C1C1C] m-0">
              🚀 Ready to build your verified professional profile?
            </p>
            <button
              onClick={() => navigate("/register")}
              className="inline-flex items-center gap-2 bg-[#1A3D1F] text-white text-[13.5px] font-semibold rounded-full border-none cursor-pointer transition-all duration-200 hover:bg-[#2A5C30] hover:-translate-y-px"
              style={{ padding: "12px 26px", boxShadow: "0 3px 16px rgba(26,61,31,0.28)", fontFamily: "'Poppins',sans-serif" }}
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