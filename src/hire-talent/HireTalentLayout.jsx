import React, { useState } from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard, FileText, Briefcase, Users,
  Settings, LogOut, ChevronsLeft, ChevronsRight,
  Shield, CreditCard, Flag, Bell, Star,
} from 'lucide-react';

const NAV_SECTIONS = [
  {
    label: 'OVERVIEW',
    items: [
      { icon: LayoutDashboard, label: 'Dashboard',     route: '/hire-talent/dashboard', badge: null },
    ],
  },
  {
    label: 'WORK',
    items: [
      { icon: Briefcase,  label: 'Projects',   route: '/hire-talent/projects',      badge: null },
      { icon: Users,      label: 'Talent',     route: '/hire-talent/talent',        badge: null },
      { icon: FileText,   label: 'Contracts',  route: '/hire-talent/contracts',     badge: null },
      { icon: Star,       label: 'Reviews',    route: '/hire-talent/reviews',       badge: null },
    ],
  },
  {
    label: 'FINANCE',
    items: [
      { icon: Shield,     label: 'Escrow',     route: '/hire-talent/payments',      badge: null },
      { icon: CreditCard, label: 'Payments',   route: '/hire-talent/payments',      badge: null },
      { icon: Flag,       label: 'Disputes',   route: '/hire-talent/disputes',      badge: '1'  },
    ],
  },
  {
    label: 'ACCOUNT',
    items: [
      { icon: Settings,   label: 'Settings',      route: '/hire-talent/settings',      badge: '!' },
      { icon: Bell,       label: 'Notifications', route: '/hire-talent/notifications', badge: '3' },
    ],
  },
];

const styles = `
  .htl-root { display: flex; height: 100vh; overflow: hidden; background: #f4f7fb; }

  .htl-sidebar {
    width: 220px; min-width: 220px;
    background: linear-gradient(160deg, #0e6ea8 0%, #0a5a9e 50%, #1e3a5f 100%);
    display: flex; flex-direction: column;
    transition: width .25s ease, min-width .25s ease;
    overflow: hidden; flex-shrink: 0;
    box-shadow: 3px 0 20px rgba(14,110,168,.25);
  }
  .htl-sidebar.col { width: 64px; min-width: 64px; }

  .htl-sb-logo {
    display: flex; align-items: center; gap: 10px;
    padding: 20px 14px 16px;
    border-bottom: 1px solid rgba(255,255,255,.1); flex-shrink: 0;
  }
  .htl-sb-logo-icon {
    width: 36px; height: 36px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg,#22c55e,#0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-weight: 800; font-size: 15px; color: #fff;
  }
  .htl-sb-logo-name { font-weight: 800; font-size: 16px; color: #fff; white-space: nowrap; overflow: hidden; }
  .htl-sb-logo-role { font-size: 10px; color: rgba(255,255,255,.45); text-transform: uppercase; letter-spacing: .06em; white-space: nowrap; }

  .htl-sb-nav { flex: 1; overflow-y: auto; padding: 8px 0; scrollbar-width: none; }
  .htl-sb-nav::-webkit-scrollbar { display: none; }

  .htl-sb-section-label {
    font-size: 9px; font-weight: 700; color: rgba(255,255,255,.35);
    letter-spacing: .1em; text-transform: uppercase;
    padding: 12px 16px 4px; white-space: nowrap; overflow: hidden;
  }
  .htl-sidebar.col .htl-sb-section-label { opacity: 0; height: 0; padding: 0; }

  .htl-sb-item {
    display: flex; align-items: center; gap: 10px;
    padding: 9px 12px; margin: 1px 7px; border-radius: 10px;
    cursor: pointer; transition: background .15s;
    border: none; background: transparent; width: calc(100% - 14px);
    color: rgba(255,255,255,.65); position: relative; font-family: inherit;
  }
  .htl-sb-item:hover { background: rgba(255,255,255,.1); color: #fff; }
  .htl-sb-item.active { background: rgba(255,255,255,.15); color: #fff; }
  .htl-sb-item.active::before {
    content: ''; position: absolute; left: -7px; top: 50%; transform: translateY(-50%);
    width: 3px; height: 18px; border-radius: 0 3px 3px 0;
    background: linear-gradient(180deg,#22c55e,#0ea5e9);
  }
  .htl-sb-label { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; }

  .htl-sb-badge {
    margin-left: auto; min-width: 17px; height: 17px; border-radius: 9px;
    background: #ef4444; color: #fff; font-size: 9px; font-weight: 700;
    display: flex; align-items: center; justify-content: center; padding: 0 4px; flex-shrink: 0;
  }
  .htl-sb-badge.warn { background: #f59e0b; }
  .htl-sidebar.col .htl-sb-badge {
    position: absolute; top: 4px; right: 4px;
    min-width: 8px; height: 8px; border-radius: 50%; padding: 0; font-size: 0;
  }

  .htl-sb-collapse { padding: 10px 7px; border-top: 1px solid rgba(255,255,255,.1); flex-shrink: 0; }
  .htl-collapse-btn {
    width: 100%; display: flex; align-items: center; gap: 8px; padding: 8px 10px;
    border-radius: 9px; background: rgba(255,255,255,.07); border: none; cursor: pointer;
    color: rgba(255,255,255,.55); font-size: 12px; font-weight: 500;
    font-family: inherit; transition: background .15s, color .15s;
    white-space: nowrap; overflow: hidden;
  }
  .htl-collapse-btn:hover { background: rgba(255,255,255,.12); color: #fff; }

  .htl-sb-user {
    display: flex; align-items: center; gap: 10px;
    padding: 13px 14px; border-top: 1px solid rgba(255,255,255,.1); flex-shrink: 0;
  }
  .htl-sb-avatar {
    width: 33px; height: 33px; border-radius: 9px; flex-shrink: 0;
    background: linear-gradient(135deg,#22c55e,#0ea5e9);
    display: flex; align-items: center; justify-content: center;
    font-weight: 700; font-size: 12px; color: #fff;
  }
  .htl-sb-uname { font-size: 12px; font-weight: 600; color: #fff; white-space: nowrap; overflow: hidden; }
  .htl-sb-urole  { font-size: 10px; color: rgba(255,255,255,.4); white-space: nowrap; }

  .htl-main { flex: 1; display: flex; flex-direction: column; overflow: hidden; min-width: 0; }

  .htl-topbar {
    display: flex; align-items: center; justify-content: space-between;
    padding: 0 22px; height: 58px; background: #fff;
    border-bottom: 1px solid #e8eef5; flex-shrink: 0;
  }

  .htl-content { flex: 1; overflow-y: auto; }
`;

const PAGE_TITLES = {
  '/hire-talent/dashboard':     'Dashboard',
  '/hire-talent/projects':      'Projects',
  '/hire-talent/talent':        'Talent',
  '/hire-talent/contracts':     'Contracts',
  '/hire-talent/reviews':       'Reviews',
  '/hire-talent/payments':      'Payments',
  '/hire-talent/disputes':      'Disputes',
  '/hire-talent/settings':      'Settings',
  '/hire-talent/notifications': 'Notifications',
};

export default function HireTalentLayout() {
  const navigate  = useNavigate();
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const pageTitle = PAGE_TITLES[location.pathname] ?? 'Hire Talent';

  return (
    <>
      <style>{styles}</style>
      <div className="htl-root">

        {/* ── SIDEBAR ── */}
        <div className={`htl-sidebar${collapsed ? ' col' : ''}`}>

          <div className="htl-sb-logo">
            <div className="htl-sb-logo-icon">W</div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div className="htl-sb-logo-name">WebLance</div>
                <div className="htl-sb-logo-role">Hire Talent</div>
              </div>
            )}
          </div>

          <nav className="htl-sb-nav">
            {NAV_SECTIONS.map(sec => (
              <div key={sec.label}>
                <div className="htl-sb-section-label">{sec.label}</div>
                {sec.items.map(item => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.route;
                  return (
                    <button key={item.label}
                      className={`htl-sb-item${isActive ? ' active' : ''}`}
                      onClick={() => navigate(item.route)}
                      title={collapsed ? item.label : undefined}>
                      <Icon size={16} style={{ flexShrink: 0 }} />
                      {!collapsed && <span className="htl-sb-label">{item.label}</span>}
                      {item.badge && (
                        <span className={`htl-sb-badge${item.badge === '!' ? ' warn' : ''}`}>
                          {collapsed ? '' : item.badge}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
            <button className="htl-sb-item" onClick={() => navigate('/')} title={collapsed ? 'Log Out' : undefined}>
              <LogOut size={16} style={{ flexShrink: 0 }} />
              {!collapsed && <span className="htl-sb-label">Log Out</span>}
            </button>
          </nav>

          <div className="htl-sb-collapse">
            <button className="htl-collapse-btn" onClick={() => setCollapsed(c => !c)}>
              {collapsed
                ? <ChevronsRight size={15} style={{ flexShrink: 0 }} />
                : <><ChevronsLeft size={15} style={{ flexShrink: 0 }} /><span>Collapse</span></>}
            </button>
          </div>

          <div className="htl-sb-user">
            <div className="htl-sb-avatar">AK</div>
            {!collapsed && (
              <div style={{ overflow: 'hidden' }}>
                <div className="htl-sb-uname">Arjun Kapoor</div>
                <div className="htl-sb-urole">Trust: 75 · Good Standing</div>
              </div>
            )}
          </div>
        </div>

        {/* ── MAIN ── */}
        <div className="htl-main">
          <div className="htl-topbar">
            <div>
              <p style={{ fontSize: 17, fontWeight: 800, color: '#1e3a5f', margin: 0 }}>{pageTitle}</p>
              <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>Overview · March 2026</p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => navigate('/hire-talent/notifications')}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: '#f1f5f9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Bell size={16} color="#1e3a5f" />
                </div>
                <span style={{ position: 'absolute', top: -2, right: -2, width: 14, height: 14, background: '#ef4444', borderRadius: '50%', fontSize: 8, fontWeight: 700, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '2px solid #fff' }}>3</span>
              </div>
              <div style={{ width: 34, height: 34, borderRadius: 9, background: 'linear-gradient(135deg,#22c55e,#0ea5e9)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 12, cursor: 'pointer' }}>AK</div>
            </div>
          </div>

          <div className="htl-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}