import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full bg-[rgb(255,251,248)] border-b border-gray-300">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">

        {/* Logo */}
        <div className="text-2xl font-bold tracking-wide">
          <span className="text-[#1960d2]">Arc</span>
          <span className="text-[#4a3b87]">Lancer</span>
        </div>

        {/* Right Side */}
        <div className="flex items-center gap-3 sm:gap-5">
          <button className="hidden sm:block bg-transparent border-none text-sm font-medium text-gray-700 hover:text-black transition-colors cursor-pointer">
            Team Member
          </button>
          <button className="px-4 sm:px-5 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors cursor-pointer">
            Hire Talent
          </button>
          <button className="px-4 sm:px-5 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium shadow-[0_2px_6px_rgba(59,130,246,0.2)] transition-all cursor-pointer border-none">
            Join as Freelancer
          </button>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;