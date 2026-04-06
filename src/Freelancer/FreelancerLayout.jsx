import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
  greenDeep:   "#14532d",
  greenBg:     "#f0fdf4",
  greenBorder: "#bbf7d0",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  sidebar:     "#0f1f0f",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const NAV = [
  {
    section: "OVERVIEW",
    items: [
      { label: "Dashboard",     icon: "⊞", path: "/dashboard"                                    },
    ]
  },
  {
    section: "WORK",
    items: [
      { label: "Proposals",     icon: "📨", path: "/freelancer/proposals",  badge: 2              },
      { label: "Contracts",     icon: "📋", path: "/freelancer/contracts"                         },
      { label: "Reviews",       icon: "⭐", path: "/freelancer/reviews"                           },
    ]
  },
  {
    section: "FINANCE",
    items: [
      { label: "Earnings",      icon: "💰", path: "/freelancer/earnings"                          },
      { label: "Withdrawals",   icon: "📤", path: "/freelancer/withdrawals"                       },
    ]
  },
  {
    section: "ACCOUNT",
    items: [
      { label: "My Plan",       icon: "💳", path: "/freelancer/plan"                                           },
      { label: "KYC",           icon: "🪪", path: "/freelancer/kyc",         badge: "!", badgeColor: "#f59e0b" },
      { label: "Notifications", icon: "🔔", path: "/freelancer/notifications",badge: 6             },
    ]
  }
];

// Map routes to page titles
const PAGE_TITLES = {
  "/dashboard":                    { title: "Dashboard",     sub: "Overview · March 2026"                    },
  "/freelancer/proposals":         { title: "My Proposals",  sub: "Track and manage all your proposals"      },
  "/freelancer/contracts":         { title: "My Contracts",  sub: "Manage active projects and track payments" },
  "/freelancer/reviews":           { title: "My Reviews",    sub: "Client feedback and your reputation"      },
  "/freelancer/earnings":          { title: "Earnings",      sub: "Your wallet and transaction history"      },
  "/freelancer/withdrawals":       { title: "Withdrawals",   sub: "Request payouts to your bank or UPI"      },
  "/freelancer/plan":            { title: "My Plan",       sub: "Manage your subscription and add-ons"         },
  "/freelancer/kyc":               { title: "KYC Verification", sub: "Complete identity verification"        },
  "/freelancer/notifications":     { title: "Notifications", sub: "Stay on top of proposals and payments"    },
};

export default function FreelancerLayout() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const [collapsed, setCollapsed]     = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef  = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (profileRef.current && !profileRef.current.contains(e.target)) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const currentPath = location.pathname;
  const pageInfo    = PAGE_TITLES[currentPath] || { title: "Freelancer", sub: "" };

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: ${FONT}; }

        .fl-sb-item {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 10px;
          cursor: pointer; transition: all 0.15s;
          border: none; background: none; width: 100%; text-align: left;
          font-family: ${FONT}; font-size: 13px; font-weight: 500;
          color: rgba(255,255,255,0.5); position: relative;
        }
        .fl-sb-item:hover { background: rgba(34,197,94,0.1); color: rgba(255,255,255,0.88); }
        .fl-sb-item.fl-active { background: rgba(34,197,94,0.18); color: ${G.green}; font-weight: 700; }

        .fl-dd-item {
          display: flex; align-items: center; gap: 10px;
          padding: 11px 16px; font-size: 13px; font-weight: 600;
          color: ${G.text}; cursor: pointer; transition: background 0.12s;
          border: none; background: none; width: 100%; text-align: left;
          font-family: ${FONT};
        }
        .fl-dd-item:hover { background: ${G.greenBg}; color: ${G.greenDark}; }
        .fl-dd-item.danger:hover { background: #fef2f2; color: #dc2626; }

        .fl-profile-dropdown {
          position: absolute; top: calc(100% + 8px); right: 0;
          background: ${G.white}; border: 1px solid ${G.border};
          border-radius: 14px; min-width: 216px;
          box-shadow: 0 12px 40px rgba(0,0,0,0.12);
          overflow: hidden; z-index: 200;
          animation: flDropIn 0.15s ease both;
        }
        @keyframes flDropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Hide the internal Navbar that exists in each sub-page */
        .fl-page-content nav[style*="height:52"] ,
        .fl-page-content > div > nav {
          display: none !important;
        }

        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: ${G.greenBorder}; border-radius: 99px; }
      `}</style>

      <div style={{ display: "flex", height: "100vh", overflow: "hidden", background: G.bg, fontFamily: FONT }}>

        {/* ══ SIDEBAR ══════════════════════════════════════════ */}
        <aside style={{
          width: collapsed ? 62 : 232,
          height: "100vh",
          background: G.sidebar,
          display: "flex", flexDirection: "column",
          transition: "width 0.22s ease",
          overflow: "hidden", flexShrink: 0, zIndex: 40,
          position: "relative",
        }}>

          {/* Logo */}
          <div style={{ padding: "16px 12px 12px", display: "flex", alignItems: "center", gap: 9, borderBottom: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ width: 32, height: 32, borderRadius: 9, background: G.green, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 800, color: G.white, flexShrink: 0, fontFamily: FONT }}>W</div>
            {!collapsed && (
              <div style={{ flex: 1, overflow: "hidden" }}>
                <p style={{ fontSize: 15, fontWeight: 800, color: G.white, letterSpacing: "-0.3px", fontFamily: FONT, whiteSpace: "nowrap" }}>
                  web<span style={{ color: G.green }}>lance</span>
                </p>
                <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.22)", letterSpacing: "1.5px", textTransform: "uppercase", marginTop: 1 }}>FREELANCER</p>
              </div>
            )}
            <button
              onClick={() => setCollapsed(c => !c)}
              style={{ width: 24, height: 24, borderRadius: 6, border: "1px solid rgba(255,255,255,0.1)", background: "rgba(255,255,255,0.04)", cursor: "pointer", color: "rgba(255,255,255,0.35)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}
            >
              <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={collapsed ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7"} />
              </svg>
            </button>
          </div>

          {/* Nav groups */}
          <div style={{ flex: 1, overflowY: "auto", padding: "10px 8px" }}>
            {NAV.map((group, gi) => (
              <div key={gi} style={{ marginBottom: 4 }}>
                {!collapsed && (
                  <p style={{ fontSize: 9, fontWeight: 700, color: "rgba(255,255,255,0.18)", letterSpacing: "1.5px", textTransform: "uppercase", padding: "10px 6px 4px", fontFamily: FONT }}>
                    {group.section}
                  </p>
                )}
                {collapsed && gi > 0 && <div style={{ height: 1, background: "rgba(255,255,255,0.05)", margin: "7px 4px" }} />}
                {group.items.map((item, ii) => {
                  const isActive = currentPath === item.path;
                  return (
                    <button
                      key={ii}
                      onClick={() => navigate(item.path)}
                      className={`fl-sb-item${isActive ? " fl-active" : ""}`}
                      style={{ justifyContent: collapsed ? "center" : "flex-start" }}
                      title={collapsed ? item.label : ""}
                    >
                      <span style={{ fontSize: 15, flexShrink: 0 }}>{item.icon}</span>
                      {!collapsed && (
                        <>
                          <span style={{ flex: 1 }}>{item.label}</span>
                          {item.badge && (
                            <span style={{ fontSize: 10, fontWeight: 700, background: item.badgeColor || G.green, color: G.white, borderRadius: 99, padding: "1px 7px", flexShrink: 0 }}>
                              {item.badge}
                            </span>
                          )}
                        </>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* User footer */}
          <div style={{ padding: "10px 8px 14px", borderTop: "1px solid rgba(255,255,255,0.06)", flexShrink: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, padding: "8px 6px", borderRadius: 10 }}>
              <div style={{ width: 32, height: 32, borderRadius: 9, background: `linear-gradient(135deg,${G.green},${G.greenDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: G.white, flexShrink: 0, fontFamily: FONT }}>AJ</div>
              {!collapsed && (
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <p style={{ fontSize: 12, fontWeight: 700, color: G.white, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>Arjun Joshi</p>
                  <p style={{ fontSize: 10, color: "rgba(255,255,255,0.28)" }}>Trust: 78 · Rising Talent</p>
                </div>
              )}
            </div>
          </div>
        </aside>

        {/* ══ RIGHT PANEL ══════════════════════════════════════ */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0, overflow: "hidden" }}>

          {/* ── Topbar ── */}
          <header style={{
            height: 56, background: G.white,
            borderBottom: `1px solid ${G.border}`,
            display: "flex", alignItems: "center",
            padding: "0 24px", gap: 12,
            flexShrink: 0, zIndex: 30, position: "relative",
          }}>
            <div>
              <p style={{ fontSize: 15, fontWeight: 800, color: G.text, fontFamily: FONT }}>{pageInfo.title}</p>
              {pageInfo.sub && <p style={{ fontSize: 11, color: G.muted }}>{pageInfo.sub}</p>}
            </div>
            <div style={{ flex: 1 }} />

            {/* Bell */}
            <div style={{ position: "relative", cursor: "pointer" }} onClick={() => navigate("/freelancer/notifications")}>
              <div style={{ width: 36, height: 36, borderRadius: 10, border: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center", background: G.white }}>
                <svg width="16" height="16" fill="none" stroke={G.sub} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
                </svg>
              </div>
              <span style={{ position: "absolute", top: -3, right: -3, width: 17, height: 17, borderRadius: "50%", background: "#ef4444", border: `2px solid ${G.white}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700, color: G.white, fontFamily: FONT }}>6</span>
            </div>

            {/* Profile button + dropdown */}
            <div ref={profileRef} style={{ position: "relative" }}>
              <button
                onClick={() => setProfileOpen(o => !o)}
                style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 10px 5px 5px", borderRadius: 10, border: `1.5px solid ${profileOpen ? G.greenBorder : G.border}`, background: profileOpen ? G.greenBg : G.white, cursor: "pointer", transition: "all 0.15s", fontFamily: FONT }}
              >
                <div style={{ width: 28, height: 28, borderRadius: 8, background: `linear-gradient(135deg,${G.green},${G.greenDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: G.white, fontFamily: FONT }}>AJ</div>
                <span style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Arjun Joshi</span>
                <svg width="11" height="11" fill="none" stroke={G.sub} viewBox="0 0 24 24" style={{ transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform 0.15s" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </button>

              {profileOpen && (
                <div className="fl-profile-dropdown">
                  {/* User info */}
                  <div style={{ padding: "14px 16px 10px", borderBottom: `1px solid ${G.border}` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 38, height: 38, borderRadius: 11, background: `linear-gradient(135deg,${G.green},${G.greenDark})`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 800, color: G.white, fontFamily: FONT }}>AJ</div>
                      <div>
                        <p style={{ fontSize: 13, fontWeight: 700, color: G.text }}>Arjun Joshi</p>
                        <p style={{ fontSize: 11, color: G.muted }}>arjun.joshi@gmail.com</p>
                      </div>
                    </div>
                    <div style={{ marginTop: 10, display: "flex", gap: 6 }}>
                      <span style={{ fontSize: 10, fontWeight: 700, background: G.green, color: G.white, borderRadius: 99, padding: "2px 9px" }}>✓ KYC Verified</span>
                      <span style={{ fontSize: 10, fontWeight: 600, background: G.greenBg, color: G.greenDark, border: `1px solid ${G.greenBorder}`, borderRadius: 99, padding: "2px 9px" }}>Rising Talent</span>
                    </div>
                  </div>
                  {/* Menu items */}
                  <div style={{ padding: "6px 0" }}>
                    <button className="fl-dd-item" onClick={() => { navigate("/profile/1"); setProfileOpen(false); }}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/></svg>
                      View Public Profile
                    </button>
                    <button className="fl-dd-item" onClick={() => { navigate("/freelancer/notifications"); setProfileOpen(false); }}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/></svg>
                      Notifications
                      <span style={{ marginLeft: "auto", fontSize: 10, fontWeight: 700, background: G.green, color: G.white, borderRadius: 99, padding: "1px 7px" }}>6</span>
                    </button>
                    <button className="fl-dd-item" onClick={() => { navigate("/freelancer/kyc"); setProfileOpen(false); }}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/></svg>
                      Settings
                    </button>
                  </div>
                  {/* Logout */}
                  <div style={{ borderTop: `1px solid ${G.border}`, padding: "6px 0" }}>
                    <button className="fl-dd-item danger" onClick={() => { navigate("/"); setProfileOpen(false); }}>
                      <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/></svg>
                      Log Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </header>

          {/* ── Page content (child route renders here) ── */}
          <div className="fl-page-content" style={{ flex: 1, overflowY: "auto" }}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}