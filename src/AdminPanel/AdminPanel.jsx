import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Projects      from './pages/Projects';
import Users         from './pages/Users';
import Support       from './pages/Support';
import Payments      from './pages/Payments';
import Monitoring    from './pages/Monitoring';
import BackgroundTasks from './pages/BackgroundTasks';
import Security      from './pages/Security';
import LegalPages    from './pages/LegalPages';

const tabs = [
  { id: 'projects',   label: 'Projects',          icon: '▦'  },
  { id: 'users',      label: 'Users',              icon: '👤' },
  { id: 'support',    label: 'Support',            icon: '💬', badge: 2 },
  { id: 'payments',   label: 'Payments',           icon: '$'  },
  { id: 'monitoring', label: 'Monitoring',         icon: '📊' },
  { id: 'background', label: 'Background Tasks',   icon: '⚙'  },
  { id: 'security',   label: 'Security',           icon: '🔒' },
  { id: 'legal',      label: 'Legal Pages',        icon: '📄' },
];

const AdminPanel = () => {
  const [activeTab, setActiveTab] = useState('projects');
  const [menuOpen,  setMenuOpen]  = useState(false);
  const navigate = useNavigate();

  const renderPage = () => {
    switch (activeTab) {
      case 'projects':   return <Projects />;
      case 'users':      return <Users />;
      case 'support':    return <Support />;
      case 'payments':   return <Payments />;
      case 'monitoring': return <Monitoring />;
      case 'background': return <BackgroundTasks />;
      case 'security':   return <Security />;
      case 'legal':      return <LegalPages />;
      default:           return <Projects />;
    }
  };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }

        /* Green scrollbar */
        ::-webkit-scrollbar { width: 7px; height: 7px; }
        ::-webkit-scrollbar-track { background: #f1f5f9; }
        ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f5f9; }

        /* Hide tabs scrollbar */
        .tabs-no-scroll { overflow-x: auto; scrollbar-width: none; -ms-overflow-style: none; }
        .tabs-no-scroll::-webkit-scrollbar { display: none; }

        /* Nav underline animation */
        .nav-lnk {
          position: relative;
          background: none; border: none; cursor: pointer;
          font-family: 'Poppins', sans-serif;
          font-size: 14px; font-weight: 500; color: #1C1C1C;
          padding: 6px 2px; transition: color 0.2s;
        }
        .nav-lnk::after {
          content: ''; position: absolute; bottom: 0; left: 0;
          width: 0%; height: 2px; background: #6FDA44;
          border-radius: 2px; transition: width 0.22s ease;
        }
        .nav-lnk:hover { color: #1A3D1F; }
        .nav-lnk:hover::after { width: 100%; }

        /* Tab active indicator */
        .tab-btn {
          position: relative;
          white-space: nowrap;
          transition: color 0.18s;
        }
        .tab-btn::after {
          content: ''; position: absolute; bottom: -1px; left: 0; right: 0;
          height: 2.5px; border-radius: 2px;
          background: linear-gradient(90deg, #6FDA44, #1A3D1F);
          transform: scaleX(0); transform-origin: left;
          transition: transform 0.22s ease;
        }
        .tab-btn.tab-active::after { transform: scaleX(1); }

        @keyframes fadeDown {
          from { opacity:0; transform:translateY(-12px); }
          to   { opacity:1; transform:translateY(0); }
        }
        .a-nav { animation: fadeDown .45s ease both; }
      `}</style>

      <div className="min-h-screen bg-[#F7FAF7] font-[Poppins,sans-serif]">

        {/* ══ TOP NAVBAR ══ */}
        <div
          className="a-nav fixed top-4 left-0 right-0 z-50 flex justify-center px-6"
          style={{ pointerEvents: 'none' }}
        >
          <div className="w-full max-w-[960px]" style={{ pointerEvents: 'auto' }}>
            <nav
              className="flex items-center justify-between bg-white rounded-full pl-5 pr-2.5 py-2 border border-[#E4F0DC]"
              style={{ boxShadow: '0 4px 24px rgba(111,218,68,0.10), 0 1px 4px rgba(0,0,0,0.05)' }}
            >
              {/* Logo */}
              <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate('/')}>
                <img src="/image-removebg-preview.png" alt="Weblance" className="h-10 w-auto block" />
              </div>

              {/* Center — empty spacer */}
              <div className="flex-1" />

              {/* Right */}
              <div className="flex items-center gap-2 flex-shrink-0">
                <button
                  className="nav-lnk hidden sm:block"
                  onClick={() => navigate('/')}
                >
                  Home
                </button>
                {/* Admin avatar pill */}
                <div
                  className="inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-white text-[12px] font-semibold"
                  style={{ background: 'linear-gradient(135deg,#1A3D1F,#2A5C30)', boxShadow: '0 2px 8px rgba(26,61,31,0.25)' }}
                >
                  <span className="w-5 h-5 rounded-full bg-[#6FDA44] flex items-center justify-center text-[10px] font-bold text-[#1A3D1F]">A</span>
                  Admin
                </div>

                {/* Mobile hamburger */}
                <button
                  className="sm:hidden flex items-center justify-center w-9 h-9 rounded-full border border-[#E8F5E1] bg-transparent text-[#1C1C1C] cursor-pointer"
                  onClick={() => setMenuOpen(!menuOpen)}
                >
                  {menuOpen ? '✕' : '☰'}
                </button>
              </div>
            </nav>

            {/* Mobile drawer */}
            {menuOpen && (
              <div className="sm:hidden mt-2 bg-white rounded-[20px] border border-[#E8F5E1] px-5 pt-2 pb-4"
                style={{ boxShadow: '0 8px 32px rgba(111,218,68,0.12)' }}>
                <button
                  className="block w-full text-left bg-transparent border-none py-3 text-[14px] font-medium text-[#1C1C1C] cursor-pointer border-b border-[#E8F5E1]"
                  onClick={() => { navigate('/'); setMenuOpen(false); }}
                >
                  ← Back to Home
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Spacer for fixed nav */}
        <div className="h-24" />

        {/* ══ PAGE HEADER ══ */}
        <header className="px-6 sm:px-10 pt-6 pb-4 max-w-[960px] mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0D1B2A]">System Administration</h1>
          <p className="mt-1.5 text-[13.5px] text-gray-500">
            Monitor projects, manage users, handle support, and configure security
          </p>
        </header>

        {/* ══ TABS ══ */}
        <div className="px-6 sm:px-10 max-w-[960px] mx-auto">
          <div
            className="tabs-no-scroll flex gap-0 bg-white rounded-2xl border border-[#E4F0DC] p-1.5"
            style={{
              boxShadow: '0 2px 12px rgba(111,218,68,0.07)',
            }}
          >
            <style>{`.tabs-scroll::-webkit-scrollbar { display: none; }`}</style>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`tab-btn flex items-center gap-1.5 px-3.5 py-2.5 text-[12.5px] font-medium rounded-xl border-none cursor-pointer transition-all duration-200 whitespace-nowrap
                  ${activeTab === tab.id
                    ? 'tab-active text-[#1A3D1F] font-semibold'
                    : 'text-gray-400 hover:text-[#1A3D1F] bg-transparent'
                  }`}
                style={{ background: 'transparent' }}
              >
                <span className="text-sm">{tab.icon}</span>
                {tab.label}
                {tab.badge !== undefined && (
                  <span className="flex items-center justify-center w-[18px] h-[18px] text-[10px] font-bold rounded-full"
                    style={activeTab === tab.id
                      ? { background: 'rgba(255,255,255,0.25)', color: '#fff' }
                      : { background: 'linear-gradient(135deg,#6FDA44,#0e7490)', color: '#fff' }
                    }>
                    {tab.badge}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* ══ CONTENT ══ */}
        <main className="px-6 sm:px-10 py-7 pb-20 max-w-[960px] mx-auto">
          {renderPage()}
        </main>
      </div>
    </>
  );
};

export default AdminPanel;
