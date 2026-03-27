import { useState } from "react";
import { useNavigate, useLocation, Outlet } from "react-router-dom";

(() => {
  if (document.getElementById("wl-team-layout-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-team-layout-fonts"; l.rel = "stylesheet";
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
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const NAV = [
  { label: "Overview",      path: "/team/dashboard",      icon: "⚡"                    },
  { label: "My Projects",   path: "/team/projects",       icon: "🗂️", badge: 2          },
  { label: "Notifications", path: "/team/notifications",  icon: "🔔", badge: 5          },
  { label: "Profile",       path: "/team/profile",        icon: "👤"                    },
];

export default function TeamLayout() {
  const navigate      = useNavigate();
  const location      = useLocation();
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActive = (path) =>
    location.pathname === path ||
    (path !== "/team/dashboard" && location.pathname.startsWith(path));

  const handleNav = (item) => {
    setSidebarOpen(false);
    navigate(item.path);
  };

  return (
    <div style={{ display: "flex", height: "100vh", background: G.bg, fontFamily: FONT, overflow: "hidden" }}>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.45)", zIndex: 30 }} />
      )}

      {/* ════ SIDEBAR ════ */}
      <aside style={{
        width: 220,
        flexShrink: 0,
        background: G.white,
        borderRight: `1px solid ${G.border}`,
        display: "flex",
        flexDirection: "column",
        overflowY: "auto",
        zIndex: 31,
        position: "relative",
      }}>

        {/* Logo + Member info */}
        <div style={{ padding: "16px 18px 12px", borderBottom: `1px solid #f3f4f6`, flexShrink: 0 }}>
          <span style={{ fontWeight: 800, fontSize: 20, letterSpacing: "-0.5px", fontFamily: FONT }}>
            <span style={{ color: G.green }}>web</span>
            <span style={{ color: G.text }}>lance</span>
          </span>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 10 }}>
            <div style={{
              width: 32, height: 32, borderRadius: 9,
              background: "linear-gradient(135deg,#22c55e,#16a34a)",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 800, color: G.white, flexShrink: 0,
            }}>SM</div>
            <div>
              <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0, lineHeight: 1.2 }}>Sara Mehta</p>
              <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>Frontend Developer</p>
            </div>
            <div style={{ marginLeft: "auto" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: G.green, display: "inline-block" }} />
            </div>
          </div>
        </div>

        {/* Agency badge */}
        <div style={{ padding: "8px 14px", background: G.greenBg, borderBottom: `1px solid ${G.greenBorder}` }}>
          <p style={{ fontSize: 10, color: G.greenDark, fontWeight: 700, margin: 0 }}>🏢 TechVision Solutions</p>
        </div>

        {/* Navigation */}
        <nav style={{ flex: 1, padding: "10px 10px", overflowY: "auto" }}>
          {NAV.map((item) => {
            const active = isActive(item.path) && !item.hash;
            return (
              <button
                key={item.label}
                onClick={() => handleNav(item)}
                style={{
                  display: "flex", alignItems: "center", gap: 9,
                  width: "100%", padding: "9px 10px", borderRadius: 9,
                  marginBottom: 2,
                  background: active ? G.greenBg : "transparent",
                  border: `1.5px solid ${active ? G.greenBorder : "transparent"}`,
                  color: active ? G.greenDark : G.sub,
                  fontWeight: active ? 700 : 500,
                  fontSize: 13, cursor: "pointer", textAlign: "left",
                  transition: "all 0.12s", fontFamily: FONT,
                }}
                onMouseEnter={e => { if (!active) { e.currentTarget.style.background = "#f3f4f6"; e.currentTarget.style.color = G.text; } }}
                onMouseLeave={e => { if (!active) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = G.sub; } }}
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
              </button>
            );
          })}
        </nav>

        {/* Bottom — workload / status */}
        <div style={{ padding: "12px 14px", borderTop: `1px solid #f3f4f6`, flexShrink: 0 }}>
          <div style={{ background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 9, padding: "9px 11px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 5 }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: G.greenDark, margin: 0, textTransform: "uppercase", letterSpacing: "0.07em" }}>This Week</p>
              <span style={{ fontSize: 10, fontWeight: 700, color: G.greenDark }}>28h / 40h</span>
            </div>
            <div style={{ background: "#bbf7d0", borderRadius: 99, height: 4, overflow: "hidden" }}>
              <div style={{ width: "70%", height: "100%", background: G.green, borderRadius: 99 }} />
            </div>
            <p style={{ fontSize: 10, color: G.muted, margin: "5px 0 0" }}>2 active projects</p>
          </div>
        </div>
      </aside>

      {/* ════ MAIN COLUMN ════ */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", minWidth: 0 }}>

        {/* ── HEADER ── */}
        <header style={{
          height: 54,
          background: G.white,
          borderBottom: `1px solid ${G.border}`,
          display: "flex",
          alignItems: "center",
          padding: "0 22px",
          gap: 12,
          flexShrink: 0,
          zIndex: 20,
          position: "relative",
        }}>
          {/* Page title */}
          <div style={{ flex: 1 }}>
            {(() => {
              const current = NAV.find(n => isActive(n.path) && !n.hash);
              return (
                <>
                  <p style={{ fontSize: 15, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.3px" }}>
                    {current ? current.label : "Team Dashboard"}
                  </p>
                  <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>TechVision Solutions · Member</p>
                </>
              );
            })()}
          </div>

          {/* Notification bell */}
          <button
            onClick={() => navigate("/team/notifications")}
            style={{ position: "relative", background: "none", border: "none", cursor: "pointer", padding: 4 }}
          >
            <div style={{
              width: 34, height: 34, borderRadius: 9,
              background: G.bg, border: `1px solid ${G.border}`,
              display: "flex", alignItems: "center", justifyContent: "center", fontSize: 15,
            }}>🔔</div>
            <div style={{ position: "absolute", top: 4, right: 4, width: 8, height: 8, borderRadius: "50%", background: G.red, border: `2px solid ${G.white}` }} />
          </button>

          {/* Profile dropdown */}
          <div style={{ position: "relative" }}>
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
              <div style={{
                width: 28, height: 28, borderRadius: "50%",
                background: "linear-gradient(135deg,#22c55e,#16a34a)",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 800, color: G.white,
              }}>SM</div>
              <div style={{ textAlign: "left" }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>Sara Mehta</p>
                <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>Team Member</p>
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
                <div style={{
                  position: "absolute", right: 0, top: 46,
                  background: G.white, border: `1px solid ${G.border}`,
                  borderRadius: 12, boxShadow: "0 8px 30px rgba(0,0,0,0.10)",
                  zIndex: 50, width: 210, padding: "6px 0",
                }}>
                  {/* Member info */}
                  <div style={{ padding: "10px 14px 8px", borderBottom: `1px solid #f3f4f6` }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 9, background: "linear-gradient(135deg,#22c55e,#16a34a)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 800, color: G.white }}>SM</div>
                      <div>
                        <p style={{ fontSize: 12, fontWeight: 700, color: G.text, margin: 0 }}>Sara Mehta</p>
                        <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>Frontend Developer · Active</p>
                      </div>
                    </div>
                  </div>

                  {[
                    { icon: "👁",  label: "View Public Profile", path: "/team/profile"        },
                    { icon: "⚙️", label: "Settings",             path: "/team/profile"        },
                    { icon: "🔔", label: "Notifications",        path: "/team/notifications"  },
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

        {/* ── PAGE CONTENT via Outlet ── */}
        <div style={{ flex: 1, overflowY: "auto" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}