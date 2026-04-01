// // AdminPanel.jsx
// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// import Projects from './pages/Projects';
// import Users from './pages/Users';
// import Support from './pages/Support';
// import Payments from './pages/Payments';
// import Monitoring from './pages/Monitoring';
// import BackgroundTasks from './pages/BackgroundTasks';
// import Security from './pages/Security';
// import LegalPages from './pages/LegalPages';

// const tabs = [
//   { id: 'projects', label: 'Projects', icon: '▦' },
//   { id: 'users', label: 'Users', icon: '👤' },
//   { id: 'support', label: 'Support', icon: '💬', badge: 2 },
//   { id: 'payments', label: 'Payments', icon: '$' },
//   { id: 'monitoring', label: 'Monitoring', icon: '📊' },
//   { id: 'background', label: 'Background Tasks', icon: '⚙' },
//   { id: 'security', label: 'Security', icon: '🔒' },
//   { id: 'legal', label: 'Legal Pages', icon: '📄' },
// ];

// const AdminPanel = () => {
//   const [activeTab, setActiveTab] = useState('projects');
//   const navigate = useNavigate();

//   const renderPage = () => {
//     switch (activeTab) {
//       case 'projects':   return <Projects />;
//       case 'users':      return <Users />;
//       case 'support':    return <Support />;
//       case 'payments':   return <Payments />;
//       case 'monitoring': return <Monitoring />;
//       case 'background': return <BackgroundTasks />;
//       case 'security':   return <Security />;
//       case 'legal':      return <LegalPages />;
//       default:           return <Projects />;
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-50 font-sans">
//       {/* Top Navbar */}
//       <nav className="flex items-center justify-between px-8 sm:px-10 py-4 bg-white border-b border-gray-200">
//         <div className="text-xl font-bold text-red-500">Admin Panel</div>

//         <div className="flex items-center gap-4">
//           <span className="px-3 py-1 text-xs font-bold tracking-wide text-red-600 bg-red-50 rounded-full uppercase">
//             ADMIN
//           </span>
//           <button
//             onClick={() => navigate('/')}
//             className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
//           >
//             Home
//           </button>
//         </div>
//       </nav>

//       {/* Header */}
//       <header className="px-8 sm:px-10 pt-9 pb-2">
//         <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
//         <p className="mt-2 text-gray-600">
//           Monitor projects, manage users, handle support, and configure security
//         </p>
//       </header>

//       {/* Tabs */}
//       <div className="px-8 sm:px-10 border-b border-gray-200">
//         <div className="flex gap-1 overflow-x-auto pb-1 -mb-px">
//           {tabs.map((tab) => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`
//                 flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap
//                 border-b-2 transition-colors
//                 ${
//                   activeTab === tab.id
//                     ? 'border-gray-900 text-gray-900 font-semibold'
//                     : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
//                 }
//               `}
//             >
//               <span>{tab.icon}</span>
//               {tab.label}
//               {tab.badge !== undefined && (
//                 <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
//                   {tab.badge}
//                 </span>
//               )}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Content */}
//       <main className="px-8 sm:px-10 py-8 pb-16">{renderPage()}</main>
//     </div>
//   );
// };

// export default AdminPanel;







import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import Projects from './pages/Projects';
import Users from './pages/Users';
import Support from './pages/Support';
import Payments from './pages/Payments';
import Monitoring from './pages/Monitoring';
import BackgroundTasks from './pages/BackgroundTasks';
import Security from './pages/Security';
import LegalPages from './pages/LegalPages';

const tabs = [
  { id: 'projects',   label: 'Projects',          icon: '▦'  },
  { id: 'users',      label: 'Users',             icon: '👤' },
  { id: 'support',    label: 'Support',           icon: '💬', badge: 2 },
  { id: 'payments',   label: 'Payments',          icon: '$'  },
  { id: 'monitoring', label: 'Monitoring',        icon: '📊' },
  { id: 'background', label: 'Background Tasks',  icon: '⚙'  },
  { id: 'security',   label: 'Security',          icon: '🔒' },
  { id: 'legal',      label: 'Legal Pages',       icon: '📄' },
];

// Bottom nav shows only first 4 tabs on mobile for space
const BOTTOM_TABS = tabs.slice(0, 4);

const AdminPanel = () => {
  const [activeTab,    setActiveTab]    = useState('projects');
  const [menuOpen,     setMenuOpen]     = useState(false);
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

  const currentTab = tabs.find(t => t.id === activeTab);

  const handleTabSelect = (id) => {
    setActiveTab(id);
    setMenuOpen(false);
  };

  return (
    <div style={{ minHeight:'100vh', background:'#f9fafb', fontFamily:"'Poppins', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { box-sizing:border-box; font-family:'Poppins',sans-serif; }

        /* ── Responsive layout ── */
        .ap-navbar-desktop-tabs { display:none; }
        .ap-hamburger { display:flex; }
        .ap-main { padding:0 0 72px; }  /* bottom nav space on mobile */

        @media (min-width:768px) {
          .ap-hamburger { display:none; }
          .ap-navbar-desktop-tabs { display:flex; }
          .ap-main { padding:0; }
          .ap-bottom-nav { display:none !important; }
          .ap-mobile-menu-backdrop { display:none !important; }
        }

        /* Navbar */
        .ap-navbar {
          display:flex; align-items:center; justify-content:space-between;
          padding:0 16px; height:56px;
          background:white; border-bottom:1px solid #e5e7eb;
          position:sticky; top:0; z-index:30;
        }
        @media (min-width:640px) { .ap-navbar { padding:0 24px; } }
        @media (min-width:1024px) { .ap-navbar { padding:0 40px; } }

        /* Desktop tab bar */
        .ap-tabbar {
          display:none;
          padding:0 24px;
          border-bottom:1px solid #e5e7eb;
          background:white;
          overflow-x:auto;
          -webkit-overflow-scrolling:touch;
        }
        .ap-tabbar::-webkit-scrollbar { display:none; }
        @media (min-width:768px) {
          .ap-tabbar { display:flex; }
        }
        @media (min-width:1024px) { .ap-tabbar { padding:0 40px; } }

        /* Header */
        .ap-header {
          padding:20px 16px 8px;
        }
        @media (min-width:640px) { .ap-header { padding:28px 24px 10px; } }
        @media (min-width:1024px) { .ap-header { padding:36px 40px 10px; } }

        /* Content */
        .ap-content {
          padding:0 0 16px;
        }
        @media (min-width:640px) { .ap-content { padding:0 0 24px; } }

        /* Bottom nav (mobile only) */
        .ap-bottom-nav {
          position:fixed; bottom:0; left:0; right:0;
          height:64px; background:white;
          border-top:1px solid #e5e7eb;
          display:flex; align-items:stretch;
          z-index:30;
          padding-bottom:env(safe-area-inset-bottom, 0px);
        }

        /* Mobile menu drawer */
        .ap-mobile-menu-backdrop {
          position:fixed; inset:0; z-index:40;
          background:rgba(0,0,0,0.3);
        }
        .ap-mobile-menu {
          position:fixed; top:0; right:0; bottom:0;
          width:min(280px, 85vw);
          background:white;
          z-index:50;
          box-shadow:-8px 0 32px rgba(0,0,0,0.12);
          overflow-y:auto;
          display:flex; flex-direction:column;
        }
        .ap-mobile-menu-header {
          display:flex; align-items:center; justify-content:space-between;
          padding:16px; border-bottom:1px solid #e5e7eb;
          position:sticky; top:0; background:white; z-index:1;
        }
      `}</style>

      {/* ── Top Navbar ── */}
      <nav className="ap-navbar">
        {/* Logo */}
        <div style={{ fontSize:16, fontWeight:800, color:'#ef4444', letterSpacing:'-0.3px' }}>
          Admin Panel
        </div>

        {/* Desktop right side */}
        <div style={{ display:'flex', alignItems:'center', gap:12 }}>
          <span style={{ padding:'3px 10px', fontSize:10, fontWeight:700, letterSpacing:'0.08em', color:'#dc2626', background:'#fef2f2', borderRadius:99, textTransform:'uppercase' }}>
            ADMIN
          </span>
          <button onClick={()=>navigate('/')}
            style={{ fontSize:12, fontWeight:600, color:'#374151', background:'none', border:'none', cursor:'pointer', padding:'6px 12px', borderRadius:8 }}>
            Home
          </button>
          {/* Hamburger (mobile only) */}
          <button
            className="ap-hamburger"
            onClick={()=>setMenuOpen(true)}
            style={{ background:'none', border:'1px solid #e5e7eb', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', flexDirection:'column', gap:4, padding:8 }}>
            <span style={{ display:'block', width:16, height:2, background:'#374151', borderRadius:2 }} />
            <span style={{ display:'block', width:16, height:2, background:'#374151', borderRadius:2 }} />
            <span style={{ display:'block', width:12, height:2, background:'#374151', borderRadius:2 }} />
          </button>
        </div>
      </nav>

      {/* ── Desktop Tab Bar ── */}
      <div className="ap-tabbar">
        {tabs.map(tab => (
          <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
            style={{
              display:'flex', alignItems:'center', gap:7,
              padding:'12px 14px',
              fontSize:13, fontWeight:activeTab===tab.id?700:500,
              color:activeTab===tab.id?'#111827':'#6b7280',
              background:'none', border:'none', cursor:'pointer',
              borderBottom:activeTab===tab.id?'2px solid #111827':'2px solid transparent',
              whiteSpace:'nowrap', flexShrink:0,
              transition:'color 0.12s',
            }}>
            <span>{tab.icon}</span>
            {tab.label}
            {tab.badge!==undefined && (
              <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:18, height:18, fontSize:10, fontWeight:700, color:'white', background:'#ef4444', borderRadius:'50%' }}>
                {tab.badge}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* ── Page Header ── */}
      <div className="ap-header">
        <h1 style={{ fontSize:'clamp(20px, 4vw, 28px)', fontWeight:800, color:'#111827', margin:0, letterSpacing:'-0.4px' }}>
          System Administration
        </h1>
        <p style={{ marginTop:4, fontSize:13, color:'#6b7280' }}>
          Monitor projects, manage users, handle support &amp; configure security
        </p>
        {/* Mobile breadcrumb showing current tab */}
        <div style={{ display:'flex', alignItems:'center', gap:6, marginTop:10 }}
          className="md:hidden">
          <span style={{ fontSize:13 }}>{currentTab?.icon}</span>
          <span style={{ fontSize:13, fontWeight:700, color:'#111827' }}>{currentTab?.label}</span>
          {currentTab?.badge && (
            <span style={{ fontSize:9, fontWeight:700, color:'white', background:'#ef4444', padding:'1px 6px', borderRadius:99 }}>{currentTab.badge}</span>
          )}
        </div>
      </div>

      {/* ── Main Content ── */}
      <main className="ap-content ap-main">
        {renderPage()}
      </main>

      {/* ── Mobile Bottom Nav (4 primary tabs) ── */}
      <div className="ap-bottom-nav">
        {BOTTOM_TABS.map(tab => {
          const active = activeTab === tab.id;
          return (
            <button key={tab.id} onClick={()=>setActiveTab(tab.id)}
              style={{
                flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
                gap:3, background:'none', border:'none', cursor:'pointer',
                color:active?'#111827':'#9ca3af',
                borderTop:active?'2px solid #111827':'2px solid transparent',
                transition:'color 0.12s', position:'relative', padding:'6px 4px',
              }}>
              <span style={{ fontSize:16, lineHeight:1 }}>{tab.icon}</span>
              <span style={{ fontSize:9, fontWeight:active?700:500, whiteSpace:'nowrap', letterSpacing:'0.01em' }}>{tab.label}</span>
              {tab.badge && (
                <span style={{ position:'absolute', top:4, right:'50%', transform:'translateX(8px)', display:'flex', alignItems:'center', justifyContent:'center', width:14, height:14, fontSize:8, fontWeight:800, color:'white', background:'#ef4444', borderRadius:'50%' }}>
                  {tab.badge}
                </span>
              )}
            </button>
          );
        })}
        {/* "More" button opens the full menu drawer */}
        <button onClick={()=>setMenuOpen(true)}
          style={{
            flex:1, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
            gap:3, background:'none', border:'none', cursor:'pointer',
            color:'#9ca3af', borderTop:'2px solid transparent', padding:'6px 4px',
          }}>
          <span style={{ fontSize:16, lineHeight:1 }}>⋯</span>
          <span style={{ fontSize:9, fontWeight:500, whiteSpace:'nowrap' }}>More</span>
        </button>
      </div>

      {/* ── Mobile Slide-in Menu ── */}
      {menuOpen && (
        <>
          <div className="ap-mobile-menu-backdrop" onClick={()=>setMenuOpen(false)} />
          <div className="ap-mobile-menu">
            <div className="ap-mobile-menu-header">
              <span style={{ fontSize:14, fontWeight:800, color:'#ef4444' }}>Admin Panel</span>
              <button onClick={()=>setMenuOpen(false)}
                style={{ background:'none', border:'1px solid #e5e7eb', borderRadius:8, width:32, height:32, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', fontSize:14, color:'#6b7280' }}>✕</button>
            </div>

            <div style={{ padding:12 }}>
              <p style={{ fontSize:9, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', padding:'4px 8px 8px' }}>Navigation</p>
              {tabs.map(tab => {
                const active = activeTab === tab.id;
                return (
                  <button key={tab.id} onClick={()=>handleTabSelect(tab.id)}
                    style={{
                      width:'100%', display:'flex', alignItems:'center', gap:12,
                      padding:'12px 14px', borderRadius:10, marginBottom:2,
                      background:active?'#f1fce8':'none',
                      border:active?'1px solid #d4edbb':'1px solid transparent',
                      cursor:'pointer', textAlign:'left',
                    }}>
                    <span style={{ fontSize:18, width:24, textAlign:'center', flexShrink:0 }}>{tab.icon}</span>
                    <span style={{ fontSize:13, fontWeight:active?700:500, color:active?'#2E7D1F':'#374151', flex:1 }}>{tab.label}</span>
                    {tab.badge && (
                      <span style={{ display:'flex', alignItems:'center', justifyContent:'center', width:20, height:20, fontSize:10, fontWeight:800, color:'white', background:'#ef4444', borderRadius:'50%', flexShrink:0 }}>{tab.badge}</span>
                    )}
                    {active && <span style={{ fontSize:12, color:'#6EC030', flexShrink:0 }}>●</span>}
                  </button>
                );
              })}

              <div style={{ borderTop:'1px solid #e5e7eb', marginTop:8, paddingTop:12 }}>
                <p style={{ fontSize:9, fontWeight:700, color:'#9ca3af', textTransform:'uppercase', letterSpacing:'0.08em', padding:'0 8px 8px' }}>Account</p>
                <button onClick={()=>{ navigate('/'); setMenuOpen(false); }}
                  style={{ width:'100%', display:'flex', alignItems:'center', gap:12, padding:'12px 14px', borderRadius:10, background:'none', border:'1px solid transparent', cursor:'pointer', textAlign:'left' }}>
                  <span style={{ fontSize:18, width:24, textAlign:'center', flexShrink:0 }}>🏠</span>
                  <span style={{ fontSize:13, fontWeight:500, color:'#374151' }}>Back to Home</span>
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminPanel;