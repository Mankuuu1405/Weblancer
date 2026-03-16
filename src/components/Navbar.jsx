

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";


// const Navbar = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);


//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }


//         .nav-link-tw {
//           position: relative;
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: 'Poppins', sans-serif;
//           font-size: 14px;
//           font-weight: 500;
//           color: #1C1C1C;
//           padding: 6px 2px;
//           transition: color 0.2s;
//         }
//         .nav-link-tw::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0;
//           width: 0%;
//           height: 2px;
//           background: #6FDA44;
//           border-radius: 2px;
//           transition: width 0.22s ease;
//         }
//         .nav-link-tw:hover { color: #1A3D1F; }
//         .nav-link-tw:hover::after { width: 100%; }


//         @keyframes fadeDown {
//           from { opacity:0; transform:translateY(-14px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .a-nav { animation: fadeDown .5s ease both; }


//         /* Green scrollbar */
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: #f1f1f1; }
//         ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
//         ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
//         * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f1f1; }
//       `}</style>


//       {/* Fixed Navbar Wrapper */}
//       <div
//         className="a-nav fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
//         style={{ pointerEvents: "none" }}
//       >
//         <div className="w-full max-w-[860px]" style={{ pointerEvents: "auto" }}>


//           {/* Nav Bar */}
//           <nav
//             className="flex items-center justify-between bg-white rounded-full pl-5 pr-2.5 py-2 border border-[#E4F0DC]"
//             style={{ boxShadow: "0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05)" }}
//           >
//             {/* Logo */}
//             <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//               <img
//                 src="/weblance.jpeg"
//                 alt="Weblance"
//                 className="h-10 w-auto block"
//               />
//             </div>


//             {/* Center Links */}
//             <div className="hidden sm:flex items-center gap-7 flex-1 justify-center">
//               {[
//                 { label: "Features",     path: "/features"     },
//                 { label: "How It Works", path: "/how-it-works" },
//                 { label: "Hire Talent",  path: "/hire"         },
//               ].map(({ label, path }) => (
//                 <button key={label} className="nav-link-tw" onClick={() => navigate(path)}>
//                   {label}
//                 </button>
//               ))}
//             </div>


//             {/* Right */}
//             <div className="flex items-center gap-2 flex-shrink-0">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="hidden sm:inline-flex items-center gap-2 bg-[#1A3D1F] text-white text-[13px] font-semibold rounded-full border-none cursor-pointer transition-all duration-200 hover:bg-[#2A5C30] hover:-translate-y-px"
//                 style={{
//                   padding: "10px 20px",
//                   boxShadow: "0 3px 16px rgba(26,61,31,0.28)",
//                   whiteSpace: "nowrap",
//                   fontFamily: "'Poppins', sans-serif",
//                 }}
//               >
//                 Join as Freelancer <FiArrowUpRight size={13} />
//               </button>


//               {/* Hamburger */}
//               <button
//                 className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E8F5E1] bg-transparent text-[#1C1C1C] cursor-pointer"
//                 onClick={() => setMenuOpen(!menuOpen)}
//               >
//                 {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
//               </button>
//             </div>
//           </nav>


//           {/* Mobile Drawer */}
//           {menuOpen && (
//             <div
//               className="sm:hidden mt-2 bg-white rounded-[20px] border border-[#E8F5E1] px-5 pt-2 pb-4"
//               style={{ boxShadow: "0 8px 32px rgba(111,218,68,0.12)" }}
//             >
//               {[
//                 { label: "Features",     path: "/features"     },
//                 { label: "How It Works", path: "/how-it-works" },
//                 { label: "Hire Talent",  path: "/hire"         },
//               ].map(({ label, path }) => (
//                 <button
//                   key={label}
//                   onClick={() => { navigate(path); setMenuOpen(false); }}
//                   className="block w-full text-left bg-transparent border-0 border-b border-[#E8F5E1] py-3 text-[15px] font-medium text-[#1C1C1C] cursor-pointer"
//                   style={{ fontFamily: "'Poppins', sans-serif" }}
//                 >
//                   {label}
//                 </button>
//               ))}
//               <button
//                 className="mt-3 w-full flex items-center justify-center gap-2 bg-[#1A3D1F] text-white font-semibold rounded-full py-3 border-none cursor-pointer"
//                 style={{ fontFamily: "'Poppins', sans-serif", boxShadow: "0 3px 16px rgba(26,61,31,0.28)" }}
//                 onClick={() => { navigate("/register"); setMenuOpen(false); }}
//               >
//                 Join as Freelancer <FiArrowUpRight size={13} />
//               </button>
//             </div>
//           )}


//         </div>
//       </div>


//       {/* Spacer */}
//       <div className="h-24" />
//     </>
//   );
// };


// export default Navbar;

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";

// const Navbar = () => {
//   const navigate = useNavigate();
//   const [menuOpen, setMenuOpen] = useState(false);

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Poppins', sans-serif; }

//         .nav-link-tw {
//           position: relative;
//           background: none;
//           border: none;
//           cursor: pointer;
//           font-family: 'Poppins', sans-serif;
//           font-size: 14px;
//           font-weight: 500;
//           color: #1C1C1C;
//           padding: 6px 2px;
//           transition: color 0.2s;
//         }
//         .nav-link-tw::after {
//           content: '';
//           position: absolute;
//           bottom: 0; left: 0;
//           width: 0%;
//           height: 2px;
//           background: #6FDA44;
//           border-radius: 2px;
//           transition: width 0.22s ease;
//         }
//         .nav-link-tw:hover { color: #1A3D1F; }
//         .nav-link-tw:hover::after { width: 100%; }

//         @keyframes fadeDown {
//           from { opacity:0; transform:translateY(-14px); }
//           to   { opacity:1; transform:translateY(0); }
//         }
//         .a-nav { animation: fadeDown .5s ease both; }

//         /* Same gradient as Hero btn-primary */
//         .btn-nav-primary {
//           display: inline-flex;
//           align-items: center;
//           gap: 8px;
//           border: none;
//           cursor: pointer;
//           font-size: 13px;
//           font-family: 'Poppins', sans-serif;
//           font-weight: 600;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
//           color: #fff;
//           padding: 10px 20px;
//           border-radius: 100px;
//           box-shadow: 0 3px 16px rgba(13,40,85,0.28);
//           transition: all 0.2s;
//           white-space: nowrap;
//         }
//         .btn-nav-primary:hover {
//           background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
//           transform: translateY(-1px);
//           box-shadow: 0 5px 22px rgba(13,40,85,0.40);
//         }

//         /* Green scrollbar */
//         ::-webkit-scrollbar { width: 8px; }
//         ::-webkit-scrollbar-track { background: #f1f1f1; }
//         ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
//         ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
//         * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f1f1; }
//       `}</style>

//       {/* Fixed Navbar Wrapper */}
//       <div
//         className="a-nav fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
//         style={{ pointerEvents: "none" }}
//       >
//         <div className="w-full max-w-[860px]" style={{ pointerEvents: "auto" }}>

//           {/* Nav Bar */}
//           <nav
//             className="flex items-center justify-between bg-white rounded-full pl-3 pr-2.5 py-1.5 border border-[#E4F0DC]"
//             style={{ boxShadow: "0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05)" }}
//           >
//             {/* Logo — bigger size */}
//             <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
//               <img
//                 src="/weblance.jpeg"
//                 alt="Weblance"
//                 style={{ height: 60, width: 200, display: "block" }}
//               />
//             </div>

//             {/* Center Links */}
//             <div className="hidden sm:flex items-center gap-7 flex-1 justify-center">
//               {[
//                 { label: "Features",     path: "/features"     },
//                 { label: "How It Works", path: "/how-it-works" },
//                 { label: "Hire Talent",  path: "/hire"         },
//               ].map(({ label, path }) => (
//                 <button key={label} className="nav-link-tw" onClick={() => navigate(path)}>
//                   {label}
//                 </button>
//               ))}
//             </div>

//             {/* Right — Gradient button */}
//             <div className="flex items-center gap-2 flex-shrink-0">
//               <button
//                 onClick={() => navigate("/register")}
//                 className="hidden sm:inline-flex btn-nav-primary"
//               >
//                 Join as Freelancer <FiArrowUpRight size={13} />
//               </button>

//               {/* Hamburger */}
//               <button
//                 className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E8F5E1] bg-transparent text-[#1C1C1C] cursor-pointer"
//                 onClick={() => setMenuOpen(!menuOpen)}
//               >
//                 {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
//               </button>
//             </div>
//           </nav>

//           {/* Mobile Drawer */}
//           {menuOpen && (
//             <div
//               className="sm:hidden mt-2 bg-white rounded-[20px] border border-[#E8F5E1] px-5 pt-2 pb-4"
//               style={{ boxShadow: "0 8px 32px rgba(111,218,68,0.12)" }}
//             >
//               {[
//                 { label: "Features",     path: "/features"     },
//                 { label: "How It Works", path: "/how-it-works" },
//                 { label: "Hire Talent",  path: "/hire"         },
//               ].map(({ label, path }) => (
//                 <button
//                   key={label}
//                   onClick={() => { navigate(path); setMenuOpen(false); }}
//                   className="block w-full text-left bg-transparent border-0 border-b border-[#E8F5E1] py-3 text-[15px] font-medium text-[#1C1C1C] cursor-pointer"
//                   style={{ fontFamily: "'Poppins', sans-serif" }}
//                 >
//                   {label}
//                 </button>
//               ))}
//               <button
//                 className="mt-3 w-full flex items-center justify-center gap-2 rounded-full py-3 btn-nav-primary"
//                 onClick={() => { navigate("/register"); setMenuOpen(false); }}
//               >
//                 Join as Freelancer <FiArrowUpRight size={13} />
//               </button>
//             </div>
//           )}

//         </div>
//       </div>

//       {/* Spacer */}
//       <div className="h-24" />
//     </>
//   );
// };

// export default Navbar;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowUpRight, FiMenu, FiX } from "react-icons/fi";
import {ChevronRight} from 'lucide-react'
const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }

        .nav-link-tw {
          position: relative;
          background: none;
          border: none;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 14px;
          font-weight: 500;
          color: #1C1C1C;
          padding: 6px 2px;
          transition: color 0.2s;
        }
        .nav-link-tw::after {
          content: '';
          position: absolute;
          bottom: 0; left: 0;
          width: 0%;
          height: 2px;
          background: #6FDA44;
          border-radius: 2px;
          transition: width 0.22s ease;
        }
        .nav-link-tw:hover { color: #1A3D1F; }
        .nav-link-tw:hover::after { width: 100%; }

        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-14px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .a-nav { animation: fadeDown .5s ease both; }

        /* Same gradient as Hero btn-primary */
        .btn-nav-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          font-size: 13px;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color: #fff;
          padding: 10px 20px;
          border-radius: 100px;
          box-shadow: 0 3px 16px rgba(13,40,85,0.28);
          transition: all 0.2s;
          white-space: nowrap;
        }
        .btn-nav-primary:hover {
          background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 22px rgba(13,40,85,0.40);
        }

        /* Green scrollbar */
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f1f1; }
      `}</style>

      {/* Fixed Navbar Wrapper */}
      <div
        className="a-nav fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
        style={{ pointerEvents: "none" }}
      >
        <div className="w-full max-w-[860px]" style={{ pointerEvents: "auto" }}>

          {/* Nav Bar */}
          <nav
            className="flex items-center justify-between bg-white rounded-full pl-3 pr-2.5 py-1.5 border border-[#E4F0DC]"
            style={{ boxShadow: "0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05)" }}
          >
            {/* Logo — bigger size */}
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 60, width: 200, display: "block" }}
              />
            </div>

            {/* Center Links */}
            <div className="hidden sm:flex items-center gap-7 flex-1 justify-center">
              {[
                { label: "Features",     path: "/features"     },
                { label: "How It Works", path: "/how-it-works" },
              ].map(({ label, path }) => (
                <button key={label} className="nav-link-tw" onClick={() => navigate(path)}>
                  {label}
                </button>
              ))}
            </div>

            {/* Right — Gradient button */}
            <div className="flex items-center flex-shrink-0">
              <button
                onClick={() => navigate("/signin")}
                className="hidden sm:inline-flex btn-nav-primary"
              >
                Sign in <ChevronRight size={18}/>
              </button>

              {/* Hamburger */}
              <button
                className="sm:hidden flex items-center justify-center w-10 h-10 rounded-full border border-[#E8F5E1] bg-transparent text-[#1C1C1C] cursor-pointer"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </nav>

          {/* Mobile Drawer */}
          {menuOpen && (
            <div
              className="sm:hidden mt-2 bg-white rounded-[20px] border border-[#E8F5E1] px-5 pt-2 pb-4"
              style={{ boxShadow: "0 8px 32px rgba(111,218,68,0.12)" }}
            >
              {[
                { label: "Features",     path: "/features"     },
                { label: "How It Works", path: "/how-it-works" },
                { label: "Hire Talent",  path: "/hire"         },
              ].map(({ label, path }) => (
                <button
                  key={label}
                  onClick={() => { navigate(path); setMenuOpen(false); }}
                  className="block w-full text-left bg-transparent border-0 border-b border-[#E8F5E1] py-3 text-[15px] font-medium text-[#1C1C1C] cursor-pointer"
                  style={{ fontFamily: "'Poppins', sans-serif" }}
                >
                  {label}
                </button>
              ))}
              <button
                className="mt-3 w-full flex items-center justify-center gap-2 rounded-full py-3 btn-nav-primary"
                onClick={() => { navigate("/freelancer"); setMenuOpen(false); }}
              >
                Join as Freelancer <FiArrowUpRight size={13} />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Spacer */}
      <div className="h-24" />
    </>
  );
};

export default Navbar;