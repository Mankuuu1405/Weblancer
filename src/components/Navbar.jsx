

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
//                 onClick={() => navigate("/freelancer")}
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
//                 onClick={() => { navigate("/freelancer"); setMenuOpen(false); }}
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

const Navbar = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

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
          white-space: nowrap;
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

        .btn-nav-primary {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          border: none;
          cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-weight: 600;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color: #fff;
          border-radius: 100px;
          box-shadow: 0 3px 16px rgba(13,40,85,0.28);
          transition: all 0.2s;
          white-space: nowrap;
          font-size: 13px;
          padding: 10px 20px;
        }
        .btn-nav-primary:hover {
          background: linear-gradient(135deg, #163580 0%, #0D4A8F 100%);
          transform: translateY(-1px);
          box-shadow: 0 5px 22px rgba(13,40,85,0.40);
        }

        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f1f1; }

        /* ── Responsive overrides ── */

        /* Mobile: ≤480px */
        @media (max-width: 480px) {
          .nav-wrapper { padding: 0 12px !important; }
          .nav-logo img { height: 44px !important; width: 140px !important; }
          .btn-nav-primary { font-size: 12px !important; padding: 9px 14px !important; gap: 5px !important; }
          .mobile-drawer { border-radius: 16px !important; padding: 4px 14px 16px !important; }
          .mobile-drawer-btn { font-size: 14px !important; padding: 12px 0 !important; }
        }

        /* Small tablet: 481–640px */
        @media (min-width: 481px) and (max-width: 640px) {
          .nav-logo img { height: 50px !important; width: 160px !important; }
        }

        /* Tablet: 641–860px */
        @media (min-width: 641px) and (max-width: 860px) {
          .nav-center-links { gap: 18px !important; }
          .nav-link-tw { font-size: 13px !important; }
          .btn-nav-primary { font-size: 12.5px !important; padding: 9px 16px !important; }
        }
      `}</style>

      <div
        className="a-nav"
        style={{
          position: "fixed",
          top: 12,
          left: 0,
          right: 0,
          zIndex: 50,
          display: "flex",
          justifyContent: "center",
          padding: "0 16px",
          pointerEvents: "none",
        }}
      >
        <div className="nav-wrapper" style={{ width: "100%", maxWidth: 860, pointerEvents: "auto" }}>

          {/* ── Main Nav Bar ── */}
          <nav
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#fff",
              borderRadius: 100,
              paddingLeft: 12,
              paddingRight: 10,
              paddingTop: 6,
              paddingBottom: 6,
              border: "1px solid #E4F0DC",
              boxShadow: "0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05)",
            }}
          >
            {/* Logo */}
            <div
              className="nav-logo"
              style={{ flexShrink: 0, cursor: "pointer" }}
              onClick={() => navigate("/")}
            >
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 60, width: 200, display: "block", objectFit: "contain" }}
              />
            </div>

            {/* Center Links — hidden below 640px */}
            <div
              className="nav-center-links"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 28,
                flex: 1,
                justifyContent: "center",
              }}
            >
              <style>{`
                @media (max-width: 639px) { .nav-center-links { display: none !important; } }
              `}</style>
              {[
                { label: "Features",     path: "/features"     },
                { label: "How It Works", path: "/how-it-works" },
                { label: "Hire Talent",  path: "/hire"         },
              ].map(({ label, path }) => (
                <button key={label} className="nav-link-tw" onClick={() => navigate(path)}>
                  {label}
                </button>
              ))}
            </div>

            {/* Right side */}
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              {/* Desktop CTA — hidden below 640px */}
              <div style={{ display: "contents" }}>
                <style>{`@media (max-width: 639px) { .nav-desktop-cta { display: none !important; } }`}</style>
                <button
                  className="nav-desktop-cta btn-nav-primary"
                  onClick={() => navigate("/freelancer")}
                >
                  Join as Freelancer <FiArrowUpRight size={13} />
                </button>
              </div>

              {/* Hamburger — visible below 640px */}
              <div style={{ display: "none" }}>
                <style>{`@media (max-width: 639px) { .nav-hamburger { display: flex !important; } }`}</style>
              </div>
              <button
                className="nav-hamburger"
                style={{
                  display: "none",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 40,
                  height: 40,
                  borderRadius: "50%",
                  border: "1px solid #E8F5E1",
                  background: "transparent",
                  color: "#1C1C1C",
                  cursor: "pointer",
                  flexShrink: 0,
                }}
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label="Toggle menu"
              >
                {menuOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </nav>

          {/* ── Mobile Drawer ── */}
          {menuOpen && (
            <div
              className="mobile-drawer"
              style={{
                marginTop: 8,
                background: "#fff",
                borderRadius: 20,
                border: "1px solid #E8F5E1",
                padding: "4px 20px 16px",
                boxShadow: "0 8px 32px rgba(111,218,68,0.12)",
              }}
            >
              {[
                { label: "Features",     path: "/features"     },
                { label: "How It Works", path: "/how-it-works" },
                { label: "Hire Talent",  path: "/hire"         },
              ].map(({ label, path }, i, arr) => (
                <button
                  key={label}
                  className="mobile-drawer-btn"
                  onClick={() => { navigate(path); setMenuOpen(false); }}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    background: "transparent",
                    border: "none",
                    borderBottom: i < arr.length - 1 ? "1px solid #E8F5E1" : "none",
                    padding: "14px 0",
                    fontSize: 15,
                    fontWeight: 500,
                    color: "#1C1C1C",
                    cursor: "pointer",
                    fontFamily: "'Poppins', sans-serif",
                  }}
                >
                  {label}
                </button>
              ))}
              <button
                className="btn-nav-primary"
                style={{ marginTop: 12, width: "100%", justifyContent: "center" }}
                onClick={() => { navigate("/freelancer"); setMenuOpen(false); }}
              >
                Join as Freelancer <FiArrowUpRight size={13} />
              </button>
            </div>
          )}

        </div>
      </div>

      {/* Spacer */}
      <div style={{ height: 96 }} />
    </>
  );
};

export default Navbar;