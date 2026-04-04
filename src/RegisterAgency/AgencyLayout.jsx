import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

(() => {
  if (document.getElementById("wl-agency-layout-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-agency-layout-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
  greenBg:     "#f0fdf4",
  greenBorder: "#bbf7d0",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  yellow:      "#f59e0b",
  yellowBg:    "#fffbeb",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const NAV = [
  { label: "Overview",       path: "/agency/dashboard",      icon: "⚡" },
  { label: "Proposals",      path: "/agency/proposals",      icon: "📨", badge: 3 },
  { label: "Contracts",      path: "/agency/contracts",      icon: "📋", badge: 2 },
  { label: "Client Stream",  path: "/agency-channel-a",      icon: "💬", external: true },
  { label: "Team Channel",   path: "/agency/channel2/1",     icon: "👥", external: true },
  { label: "Earnings",       path: "/agency/earnings",       icon: "💰" },
  { label: "Withdrawals",    path: "/agency/withdrawals",    icon: "📤" },
  { label: "KYC",            path: "/agency/kyc",            icon: "🔐", dot: "yellow" },
  { label: "Reviews",        path: "/agency/reviews",        icon: "🌟" },
  { label: "Notifications",  path: "/agency/notifications",  icon: "🔔", badge: 5 },
  { label: "Settings",       path: "/agency/settings",       icon: "⚙️" },
];

export default function AgencyLayout() {
  const navigate    = useNavigate();
  const location    = useLocation();
  const [profileOpen,  setProfileOpen]  = useState(false);
  const [sidebarOpen,  setSidebarOpen]  = useState(false);

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/agency/dashboard" && location.pathname.startsWith(path));

  const handleNav = (item) => {
    setSidebarOpen(false);
    navigate(item.path);
  };

  return (
    <>
      <style>{`
        /* ══ LAYOUT SHELL ══ */
        .aly-root {
          display: flex;
          height: 100vh;
          background: ${G.bg};
          font-family: ${FONT};
          overflow: hidden;
        }

        /* ══ SIDEBAR ══ */
        .aly-sidebar {
          width: 224px;
          flex-shrink: 0;
          background: ${G.white};
          border-right: 1px solid ${G.border};
          display: flex;
          flex-direction: column;
          overflow-y: auto;
          z-index: 31;
          transition: transform 0.25s ease;
        }

        /* ══ MAIN COLUMN ══ */
        .aly-main {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow: hidden;
          min-width: 0;
        }

        /* ══ HEADER ══ */
        .aly-header {
          height: 54px;
          background: ${G.white};
          border-bottom: 1px solid ${G.border};
          display: flex;
          align-items: center;
          padding: 0 22px;
          gap: 12px;
          flex-shrink: 0;
          z-index: 20;
          position: relative;
        }

        /* Hamburger — hidden on desktop */
        .aly-hamburger {
          display: none;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 9px;
          border: 1px solid ${G.border};
          background: ${G.bg};
          cursor: pointer;
          flex-shrink: 0;
          font-size: 18px;
        }

        /* ══ MOBILE OVERLAY ══ */
        .aly-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.45);
          z-index: 30;
        }

        /* Profile dropdown */
        .aly-profile-name { display: block; }
        .aly-profile-role { display: block; }

        /* ══ RESPONSIVE ══ */

        /* Tablet ≤900px: narrow sidebar */
        @media (max-width: 900px) {
          .aly-sidebar { width: 190px; }
        }

        /* Mobile ≤768px: sidebar becomes slide-in drawer */
        @media (max-width: 768px) {
          .aly-sidebar {
            position: fixed;
            top: 0;
            left: 0;
            height: 100%;
            width: 230px;
            transform: translateX(-100%);
            box-shadow: 4px 0 24px rgba(0,0,0,0.12);
          }
          .aly-sidebar.open {
            transform: translateX(0);
          }
          .aly-hamburger {
            display: flex;
          }
          .aly-header {
            padding: 0 14px;
            gap: 8px;
          }
        }

        /* Small phone ≤480px */
        @media (max-width: 480px) {
          .aly-profile-name { display: none; }
          .aly-profile-role { display: none; }
          .aly-header { padding: 0 10px; gap: 6px; }
        }

        /* Page content scroll area */
        .aly-content {
          flex: 1;
          overflow-y: auto;
        }

        /* ══ NAV BUTTON ══ */
        .aly-nav-btn {
          display: flex;
          align-items: center;
          gap: 9px;
          width: 100%;
          padding: 9px 10px;
          border-radius: 9px;
          margin-bottom: 2px;
          border: 1.5px solid transparent;
          font-size: 13px;
          cursor: pointer;
          text-align: left;
          transition: all 0.12s;
          font-family: ${FONT};
          background: transparent;
          color: ${G.sub};
          font-weight: 500;
        }
        .aly-nav-btn.active {
          background: ${G.greenBg};
          border-color: ${G.greenBorder};
          color: ${G.greenDark};
          font-weight: 700;
        }
        .aly-nav-btn:hover:not(.active) {
          background: #f3f4f6;
          color: ${G.text};
        }
      `}</style>

      <div className="aly-root">

        {/* ══ MOBILE OVERLAY ══ */}
        {sidebarOpen && (
          <div className="aly-overlay" onClick={() => setSidebarOpen(false)} />
        )}

        {/* ══ SIDEBAR ══ */}
        <aside className={`aly-sidebar ${sidebarOpen ? "open" : ""}`}>

          {/* Logo + Agency info */}
          <div style={{ padding: "16px 18px 12px", borderBottom: "1px solid #f3f4f6", flexShrink: 0 }}>
            <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", fontFamily: FONT }}>
              <span style={{ color: G.green }}>web</span>
              <span style={{ color: G.text }}>lance</span>
            </span>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
              <div style={{
                width: 32, height: 32, borderRadius: 9,
                background: G.greenBg, border: `1.5px solid ${G.greenBorder}`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 800, color: G.greenDark, flexShrink: 0,
              }}>TV</div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0, lineHeight: 1.2 }}>TechVision</p>
                <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>Agency Pro</p>
              </div>
              <div style={{ marginLeft: "auto" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, display: "inline-block" }} />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
            {NAV.map((item) => {
              const active = isActive(item.path);
              return (
                <button
                  key={item.path}
                  onClick={() => handleNav(item)}
                  className={`aly-nav-btn ${active ? "active" : ""}`}
                >
                  <span style={{ fontSize: 15, width: 20, textAlign: "center", flexShrink: 0 }}>{item.icon}</span>
                  <span style={{ flex: 1 }}>{item.label}</span>
                  {item.badge && (
                    <span style={{
                      fontSize: 10, fontWeight: 700,
                      background: active ? G.green : "#f3f4f6",
                      color: active ? G.white : G.muted,
                      padding: "1px 6px", borderRadius: 99,
                    }}>{item.badge}</span>
                  )}
                  {item.dot === "yellow" && !item.badge && (
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.yellow, display: "inline-block" }} />
                  )}
                  {item.external && (
                    <svg width="11" height="11" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ opacity: 0.5 }}>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  )}
                </button>
              );
            })}
          </nav>

          {/* KYC status chip */}
          <div style={{ padding: "12px 14px", borderTop: "1px solid #f3f4f6", flexShrink: 0 }}>
            <button
              onClick={() => navigate("/agency/kyc")}
              style={{ width: "100%", background: G.yellowBg, border: "1px solid #fde68a", borderRadius: 9, padding: "9px 11px", cursor: "pointer", textAlign: "left", fontFamily: FONT }}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
                <p style={{ fontSize: 10, fontWeight: 700, color: "#92400e", margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>KYC Status</p>
                <span style={{ fontSize: 10, fontWeight: 700, color: "#92400e" }}>75%</span>
              </div>
              <p style={{ fontSize: 11, color: "#78350f", margin: "0 0 5px" }}>Step 4 under review</p>
              <div style={{ background: "#fde68a", borderRadius: 99, height: 4, overflow: "hidden" }}>
                <div style={{ width: "75%", height: "100%", background: G.yellow, borderRadius: 99 }} />
              </div>
            </button>
          </div>
        </aside>

        {/* ══ MAIN COLUMN ══ */}
        <div className="aly-main">

          {/* ── HEADER ── */}
          <header className="aly-header">

            {/* Hamburger (mobile only) */}
            <button
              className="aly-hamburger"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Open menu"
            >
              {sidebarOpen ? "✕" : "☰"}
            </button>

            {/* Current page title */}
            <div style={{ flex: 1, minWidth: 0 }}>
              {(() => {
                const current = NAV.find(n => isActive(n.path));
                return (
                  <>
                    <p style={{ fontSize: 15, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.3px", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                      {current ? current.label : "Agency"}
                    </p>
                    <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>TechVision Solutions</p>
                  </>
                );
              })()}
            </div>

            {/* Notification bell */}
            <button
              onClick={() => navigate("/agency/notifications")}
              style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4, flexShrink: 0 }}
            >
              <div style={{ width: 34, height: 34, borderRadius: 9, background: G.bg, border: `1px solid ${G.border}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15 }}>🔔</div>
              <div style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: G.red, border: `2px solid ${G.white}` }} />
            </button>

            {/* Profile dropdown trigger */}
            <div style={{ position: "relative", flexShrink: 0 }}>
              <button
                onClick={() => setProfileOpen(!profileOpen)}
                style={{
                  display: "flex", alignItems: "center", gap: 8,
                  background: profileOpen ? G.greenBg : G.bg,
                  border: `1px solid ${profileOpen ? G.greenBorder : G.border}`,
                  borderRadius: 10, padding: "5px 10px",
                  cursor: "pointer", transition: "all 0.15s", fontFamily: FONT,
                }}
              >
                <div style={{ width: 28, height: 28, borderRadius: "50%", background: G.greenBg, border: `1.5px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 800, color: G.greenDark }}>RK</div>
                <div style={{ textAlign: "left" }}>
                  <p className="aly-profile-name" style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>Raj Kumar</p>
                  <p className="aly-profile-role" style={{ fontSize: 10, color: G.muted, margin: 0 }}>Agency Admin</p>
                </div>
                <svg width="11" height="11" fill="none" stroke={G.muted} viewBox="0 0 24 24"
                  style={{ transform: profileOpen ? "rotate(180deg)" : "none", transition: "transform 0.2s" }}>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown */}
              {profileOpen && (
                <>
                  <div onClick={() => setProfileOpen(false)} style={{ position: "fixed", inset: 0, zIndex: 40 }} />
                  <div style={{ position: "absolute", right: 0, top: 46, background: G.white, border: `1px solid ${G.border}`, borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.10)", zIndex: 50, width: 210, padding: "6px 0" }}>
                    <div style={{ padding: "10px 14px 8px", borderBottom: "1px solid #f3f4f6" }}>
                      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                        <div style={{ width: 32, height: 32, borderRadius: 9, background: G.greenBg, border: `1px solid ${G.greenBorder}`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: G.greenDark }}>TV</div>
                        <div>
                          <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>TechVision Solutions</p>
                          <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>Agency Pro · Active</p>
                        </div>
                      </div>
                    </div>
                    {[
                      { icon: "👁",  label: "View Public Profile", path: "/agency/tv-001"        },
                      { icon: "⚙️", label: "Settings",             path: "/agency/settings"      },
                      { icon: "🔔", label: "Notifications",        path: "/agency/notifications" },
                    ].map(item => (
                      <button key={item.label}
                        onClick={() => { setProfileOpen(false); navigate(item.path); }}
                        style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: G.text, fontFamily: FONT, textAlign: "left" }}
                        onMouseEnter={e => e.currentTarget.style.background = G.bg}
                        onMouseLeave={e => e.currentTarget.style.background = "none"}>
                        <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>{item.icon}</span>
                        {item.label}
                      </button>
                    ))}
                    <div style={{ height: 1, background: "#f3f4f6", margin: "4px 0" }} />
                    <button
                      onClick={() => { setProfileOpen(false); navigate("/"); }}
                      style={{ width: "100%", display: "flex", alignItems: "center", gap: 10, padding: "9px 14px", background: "none", border: "none", cursor: "pointer", fontSize: 13, color: G.red, fontFamily: FONT, textAlign: "left" }}
                      onMouseEnter={e => e.currentTarget.style.background = G.redBg}
                      onMouseLeave={e => e.currentTarget.style.background = "none"}>
                      <span style={{ fontSize: 15, width: 20, textAlign: "center" }}>🚪</span>
                      Logout
                    </button>
                  </div>
                </>
              )}
            </div>
          </header>

          {/* ── PAGE CONTENT ── */}
          <div className="aly-content">
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
}