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

        <div className="inline-block px-4 py-2 bg-[#e4ebf7] text-[#15337c] text-xs font-bold rounded-full tracking-widest mb-8">
          AI-POWERED FREELANCE INTELLIGENCE
        </div>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.1] text-[#010101] mb-6">
          Verified Talent.<br />
          Governed Projects.<br />
          <span className="bg-gradient-to-r from-[#265cff] to-[#2b2057] bg-clip-text text-transparent">
            Guaranteed Results.
          </span>
        </h1>

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

          <button className="flex items-center gap-2.5 px-6 py-4 rounded-[14px] bg-white border border-gray-300 text-gray-900 text-lg font-semibold hover:bg-[#9bb9ff70] hover:text-[#234898] transition-all cursor-pointer">
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
          <div className="flex items-center gap-2 cursor-pointer px-5 py-2.5 rounded-xl hover:bg-[#9bb9ff70] hover:text-[#113a91] transition-all">
            <BiMessageSquareDetail /> ProjectStream Demo
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;