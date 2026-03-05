import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FiArrowRight } from "react-icons/fi";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { RiShieldCheckLine } from "react-icons/ri";
import { BiMessageSquareDetail } from "react-icons/bi";
import { BsRobot, BsShieldCheck, BsCurrencyDollar, BsShield } from "react-icons/bs";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="bg-[rgb(249,250,252)] px-5 pt-16 pb-20 text-center">
      <div className="max-w-[1000px] mx-auto">

        {/* Badge */}
        <div className="inline-block px-4 py-2 bg-[#e4ebf7] text-[#15337c] text-xs font-bold rounded-full tracking-widest mb-8">
          AI-POWERED FREELANCE INTELLIGENCE
        </div>

        {/* Title */}
        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#010101] mb-6">
          Verified Talent.<br />
          Governed Projects.<br />
          <span className="bg-gradient-to-r from-[#265cff] to-[#2b2057] bg-clip-text text-transparent">
            Guaranteed Results.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl text-slate-500 max-w-[750px] mx-auto mb-12 leading-relaxed">
          ArcLancer connects you with AI-verified professionals, governs every project
          with smart automation, and protects every dollar in escrow.
        </p>

        {/* Buttons */}
        <div className="flex justify-center items-center gap-4 flex-wrap mb-10">
          <button
            onClick={() => navigate("/freelancer")}
            className="flex items-center gap-2.5 px-6 py-4 rounded-[14px] bg-gradient-to-r from-[#4f7cff] to-[#5a67ff] text-white text-lg font-semibold shadow-[0_10px_25px_rgba(79,124,255,0.25)] hover:-translate-y-0.5 transition-all cursor-pointer border-none"
          >
            <FaUser /> Join as Freelancer <FiArrowRight />
          </button>
          <button
            onClick={() => navigate("/hire-talent")}
            className="flex items-center gap-2.5 px-6 py-4 rounded-[14px] bg-white border border-gray-300 text-gray-900 text-lg font-semibold hover:bg-[#9bb9ff70] hover:text-[#234898] transition-all cursor-pointer"
          >
            <HiOutlineOfficeBuilding /> Hire Talent
          </button>
          <button
            onClick={() => navigate("/register-agency")}
            className="flex items-center gap-2.5 px-4 py-4 rounded-[14px] bg-transparent text-gray-900 text-lg font-semibold hover:bg-[#9bb9ff70] hover:text-[#234898] transition-all cursor-pointer border-none"
          >
            <HiOutlineOfficeBuilding /> Register Agency
          </button>
        </div>

        {/* Links */}
        <div className="flex justify-center gap-8 sm:gap-10 flex-wrap text-lg text-gray-900 -mt-2">
          <div
            className="flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl hover:bg-[#9bb9ff70] hover:text-[#113a91] transition-all"
            onClick={() => navigate("/admin")}
          >
            <RiShieldCheckLine /> Admin Panel
          </div>
          <div
            className="flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl hover:bg-[#9bb9ff70] hover:text-[#113a91] transition-all"
            onClick={() => navigate("/project-stream")}
          >
            <BiMessageSquareDetail /> ProjectStream Demo
          </div>
        </div>

        {/* Comparison Box */}
        <div className="bg-white mx-auto mt-24 mb-10 px-8 sm:px-16 py-10 rounded-3xl border border-gray-100 shadow-[0_10px_40px_rgba(0,0,0,0.03)] max-w-[850px]">
          <h2 className="text-center text-2xl sm:text-[26px] font-extrabold text-slate-900 mb-12 tracking-tight">
            ArcLancer vs The Rest
          </h2>
          <div className="flex flex-col gap-8 max-w-[700px] mx-auto">
            {[
              { name: "Upwork:",     desc: "Post & hope",  arc: "AI-guided always"  },
              { name: "Fiverr:",     desc: "Gig browsing", arc: "Curated matching"  },
              { name: "Truelancer:", desc: "Manual trust", arc: "AI-verified trust" },
            ].map((row) => (
              <div key={row.name} className="flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-0">
                <div className="flex items-center gap-6 sm:gap-8 flex-1 text-slate-400 text-lg">
                  <span className="min-w-[120px] text-left font-medium">{row.name}</span>
                  <span className="font-[450]">{row.desc}</span>
                </div>
                <FiArrowRight className="text-[#4f7cff] text-xl sm:mx-4 rotate-90 sm:rotate-0 shrink-0" />
                <div className="flex-1 text-left text-slate-900 font-semibold text-lg">
                  {row.arc}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 mt-20">
          {[
            { icon: <BsRobot />,          title: "AI-Powered Matching",        desc: "No bidding wars — AI matches verified talent to your exact project needs" },
            { icon: <BsShieldCheck />,    title: "Verified Professionals",     desc: "Every freelancer and agency is AI-tested and identity-verified"           },
            { icon: <BsCurrencyDollar />, title: "Secure Escrow Payments",     desc: "Money is protected until milestones are approved — no risk"               },
            { icon: <BsShield />,         title: "Platform-Governed Projects", desc: "Admin-backed dispute resolution, silence timers, and full audit trail"    },
          ].map((f) => (
            <div key={f.title} className="flex gap-5 bg-[#f1f3f6] p-7 rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
              <div className="w-14 h-14 bg-[#e4ebf7] rounded-2xl flex items-center justify-center text-2xl text-[#4f7cff] shrink-0">
                {f.icon}
              </div>
              <div className="text-left">
                <h3 className="text-lg font-semibold mb-2">{f.title}</h3>
                <p className="text-slate-500 leading-relaxed">{f.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-12 sm:gap-20 mt-28 text-center flex-wrap">
          {[
            { num: "8,500+", label: "Verified Professionals" },
            { num: "94%",    label: "Completion Rate"        },
            { num: "$12M+",  label: "Paid to Talent"         },
            { num: "4.8 ★",  label: "Avg Rating", star: true },
          ].map((s) => (
            <div key={s.label}>
              <h3 className={`text-4xl sm:text-5xl font-extrabold text-slate-900 mb-2 ${s.star ? "[&>span]:text-amber-400" : ""}`}>
                {s.star ? <>{s.num.split(" ")[0]} <span>★</span></> : s.num}
              </h3>
              <p className="text-lg text-slate-500">{s.label}</p>
            </div>
          ))}
        </div>

        {/* CTA Box */}
        <div className="mt-16 px-8 py-12 bg-[#e8edf7] rounded-2xl border border-[#d1d9f0] text-center">
          <p className="text-lg sm:text-xl text-slate-800 mb-8">🚀 Ready to build your verified professional profile?</p>
          <button
            onClick={() => navigate("/freelancer")}
            className="flex items-center gap-2 mx-auto px-6 py-4 rounded-[14px] bg-gradient-to-r from-[#4f7cff] to-[#5a67ff] text-white text-lg font-semibold shadow-[0_10px_25px_rgba(79,124,255,0.25)] hover:-translate-y-0.5 transition-all cursor-pointer border-none"
          >
            Get Started Free <span>→</span>
          </button>
        </div>

      </div>
    </section>
  );
};

export default Hero;