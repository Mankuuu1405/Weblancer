import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

(() => {
  if (document.getElementById("wl-admin-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-admin-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();


const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:   "#1C1C1C",
  sub:    "#4b5563",
  muted:  "#9ca3af",
  border: "#e5e7eb",
  bg:     "#f9fafb",
  white:  "#ffffff",
};
const FONT = "'Poppins', sans-serif";

const navItems = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", icon: "⊞", path: "/admin" },
    ],
  },
  {
    section: "User Management",
    items: [
      { label: "All Users",   icon: "◉", path: "/admin/users"       },
      { label: "Freelancers", icon: "⟡", path: "/admin/freelancers" },
      { label: "Agencies",    icon: "⬡", path: "/admin/agencies"    },
      { label: "Clients",     icon: "◈", path: "/admin/clients"     },
      { label: "KYC",         icon: "✦", path: "/admin/kyc"         },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Projects",      icon: "⊟", path: "/admin/projects"              },
      { label: "At-Risk",       icon: "⚠", path: "/admin/projects/at-risk"      },
      { label: "ProjectStream", icon: "💬", path: "/admin/projectstream/freeze"  },
      { label: "Disputes",      icon: "⚑", path: "/admin/disputes"              },
      { label: "Payments",      icon: "⊕", path: "/admin/payments"              },
      { label: "Escrow",        icon: "🔐", path: "/admin/escrow"                },
      { label: "Payouts",       icon: "⬆", path: "/admin/payouts"               },
      { label: "Refunds",       icon: "↩", path: "/admin/refunds"               },
      { label: "Commission",    icon: "◈", path: "/admin/commission"            },
    ],
  },
  {
    section: "Platform",
    items: [
      { label: "AI Settings",  icon: "◎", path: "/admin/ai-settings"           },
      { label: "AI Logs",      icon: "≋", path: "/admin/ai-logs"               },
      { label: "AI Overrides", icon: "↺", path: "/admin/ai-overrides"          },
      { label: "Audit Logs",   icon: "≡", path: "/admin/audit-logs"            },
      { label: "Admin Users",  icon: "⊞", path: "/admin/admins"                },
      { label: "Roles",        icon: "◈", path: "/admin/admins/roles"          },
      { label: "Settings",     icon: "⊙", path: "/admin/settings"              },
      { label: "→ General",    icon: " ", path: "/admin/settings/general"      },
      { label: "→ Commission", icon: " ", path: "/admin/settings/commission"   },
      { label: "→ Policies",   icon: " ", path: "/admin/settings/policies"     },
      { label: "→ Email Tmpl.",icon: " ", path: "/admin/settings/email"        },
      { label: "→ Rules",      icon: " ", path: "/admin/settings/rules"        },
    ],
  },
  {
    section: "Reports",
    items: [
      { label: "Revenue",         icon: "₹", path: "/admin/reports/revenue"  },
      { label: "User Growth",     icon: "◉", path: "/admin/reports/users"    },
      { label: "Project Success", icon: "⊟", path: "/admin/reports/projects" },
      { label: "Dispute Trends",  icon: "⚑", path: "/admin/reports/disputes" },
    ],
  },
  {
    section: "Communications",
    items: [
      { label: "Notifications", icon: "🔔", path: "/admin/notifications" },
      { label: "Announcements", icon: "📢", path: "/admin/announcements" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const location  = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" / ");

  return (
    <div style={{ display: "flex", height: "100vh", background: G.bg, fontFamily: FONT, overflow: "hidden" }}>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; box-sizing: border-box; }
        ::-webkit-scrollbar { width: 0px; height: 0px; }
        * { scrollbar-width: none; }
        a { text-decoration: none; }
      `}</style>

      {/* ── Sidebar ── */}
      <aside style={{
        width: collapsed ? 60 : 232,
        background: "linear-gradient(160deg, #1e3a1e 0%, #1A2B5E 35%, #0F1A3B 65%, #0a1628 100%)",
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
        transition: "width 0.2s ease",
        overflow: "hidden",
        boxShadow: "4px 0 24px rgba(15,26,59,0.18)",
      }}>

        {/* Logo row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
          padding: collapsed ? "12px 0" : "6px 14px 6px 10px",
          borderBottom: `1px solid rgba(255,255,255,0.07)`,
          minHeight: 60,
        }}>
          {!collapsed ? (
            <>
              <div style={{ overflow: "hidden", display: "flex", alignItems: "center", gap: 8 }}>
                <img src="/weblance.png" alt="Weblance"
                  style={{ height: 42, width: 99, display: "block", borderRadius: 6 }} />
                <span style={{
                  fontSize: 10, fontWeight: 700, color: G.green,
                  background: "rgba(110,192,48,0.15)",
                  border: `1px solid rgba(110,192,48,0.3)`,
                  padding: "2px 8px", borderRadius: 99, letterSpacing: "0.08em",
                }}>ADMIN</span>
              </div>
              <button onClick={() => setCollapsed(true)} style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                borderRadius: 8,
                color: "rgba(255,255,255,0.4)",
                cursor: "pointer", fontSize: 11,
                width: 26, height: 26,
                display: "flex", alignItems: "center", justifyContent: "center",
                flexShrink: 0,
              }}>◀</button>
            </>
          ) : (
            <button onClick={() => setCollapsed(false)} style={{
              width: 36, height: 36, borderRadius: 10,
              background: G.gradGreen,
              border: "none",
              display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer",
              boxShadow: "0 2px 10px rgba(46,125,31,0.35)",
            }}>
              <span style={{ color: G.white, fontSize: 14, fontWeight: 800 }}>W</span>
            </button>
          )}
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, overflowY: "auto", padding: "12px 8px" }}>
          {navItems.map((group) => (
            <div key={group.section} style={{ marginBottom: 20 }}>
              {!collapsed && (
                <p style={{
                  fontSize: 9, fontWeight: 700,
                  color: "rgba(255,255,255,0.25)",
                  textTransform: "uppercase", letterSpacing: "0.1em",
                  padding: "0 8px", marginBottom: 4,
                }}>
                  {group.section}
                </p>
              )}
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link key={item.path} to={item.path} style={{
                    display: "flex",
                    alignItems: "center",
                    gap: collapsed ? 0 : 8,
                    justifyContent: collapsed ? "center" : "flex-start",
                    padding: collapsed ? "9px 0" : "8px 10px",
                    borderRadius: 10,
                    marginBottom: 2,
                    background: active ? "rgba(110,192,48,0.15)" : "transparent",
                    border: active ? `1px solid rgba(110,192,48,0.25)` : "1px solid transparent",
                    transition: "all 0.12s",
                    cursor: "pointer",
                  }}
                    onMouseEnter={e => {
                      if (!active) {
                        e.currentTarget.style.background = "rgba(255,255,255,0.05)";
                        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
                      }
                    }}
                    onMouseLeave={e => {
                      if (!active) {
                        e.currentTarget.style.background = "transparent";
                        e.currentTarget.style.borderColor = "transparent";
                      }
                    }}
                  >
                    <span style={{
                      fontSize: 14,
                      color: active ? G.green : "rgba(255,255,255,0.35)",
                      flexShrink: 0,
                      width: collapsed ? "auto" : 18,
                      textAlign: "center",
                    }}>
                      {item.icon}
                    </span>
                    {!collapsed && (
                      <>
                        <span style={{
                          fontSize: 12,
                          fontWeight: active ? 700 : 500,
                          color: active ? G.greenLight : "rgba(255,255,255,0.55)",
                          flex: 1,
                        }}>
                          {item.label}
                        </span>
                        {active && (
                          <span style={{
                            width: 6, height: 6, borderRadius: "50%",
                            background: G.green,
                            flexShrink: 0,
                          }} />
                        )}
                      </>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Admin user footer */}
        {!collapsed && (
          <div style={{
            padding: "12px 10px",
            borderTop: `1px solid rgba(255,255,255,0.07)`,
          }}>
            <div style={{
              display: "flex", alignItems: "center", gap: 10,
              padding: "10px 12px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 12,
            }}>
              <div style={{
                width: 32, height: 32, borderRadius: "50%",
                background: G.gradGreen,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 12, fontWeight: 700, color: G.white,
                flexShrink: 0,
                boxShadow: "0 2px 8px rgba(46,125,31,0.35)",
              }}>SA</div>
              <div style={{ minWidth: 0 }}>
                <p style={{ fontSize: 12, fontWeight: 700, color: G.white, margin: 0 }}>Super Admin</p>
                <p style={{ fontSize: 10, color: "rgba(255,255,255,0.3)", margin: 0, marginTop: 1 }}>admin@weblance.com</p>
              </div>
            </div>
          </div>
        )}

        {/* Collapsed avatar */}
        {collapsed && (
          <div style={{ padding: "12px 0", display: "flex", justifyContent: "center", borderTop: `1px solid rgba(255,255,255,0.07)` }}>
            <div style={{
              width: 32, height: 32, borderRadius: "50%",
              background: G.gradGreen,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 700, color: G.white,
              boxShadow: "0 2px 8px rgba(46,125,31,0.35)",
            }}>SA</div>
          </div>
        )}
      </aside>

      {/* ── Main content ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>

        {/* Top bar */}
        <header style={{
          background: G.white,
          borderBottom: `1px solid ${G.greenBorder}`,
          boxShadow: "0 2px 12px rgba(110,192,48,0.06)",
          padding: "0 24px",
          height: 56,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexShrink: 0,
        }}>
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: 13, fontWeight: 700, color: G.navy }}>Weblance</span>
            <span style={{ color: G.greenBorder, fontSize: 13 }}>/</span>
            <span style={{ fontSize: 12, color: G.muted, fontWeight: 500 }}>
              {breadcrumb || "Dashboard"}
            </span>
          </div>

          {/* Right actions */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Notification bell */}
            <button style={{
              position: "relative",
              background: "none", border: "none",
              padding: 6, borderRadius: 10,
              cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}
              onMouseEnter={e => e.currentTarget.style.background = G.greenBg}
              onMouseLeave={e => e.currentTarget.style.background = "none"}
            >
              <span style={{ fontSize: 18, color: G.muted }}>🔔</span>
              <span style={{
                position: "absolute", top: 4, right: 4,
                width: 8, height: 8, borderRadius: "50%",
                background: "#ef4444",
                border: `1.5px solid ${G.white}`,
              }} />
            </button>

            {/* Divider */}
            <div style={{ width: 1, height: 22, background: G.greenBorder }} />

            {/* Admin badge */}
            <div style={{
              display: "flex", alignItems: "center", gap: 6,
              background: G.greenBg,
              border: `1px solid ${G.greenBorder}`,
              borderRadius: 99,
              padding: "4px 12px 4px 6px",
            }}>
              <div style={{
                width: 26, height: 26, borderRadius: "50%",
                background: `linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)`,
                display: "flex", alignItems: "center", justifyContent: "center",
                fontSize: 10, fontWeight: 700, color: G.white,
                boxShadow: "0 2px 6px rgba(15,26,59,0.28)",
              }}>SA</div>
              <div>
                <p style={{ fontSize: 11, fontWeight: 700, color: G.navy, margin: 0, lineHeight: 1.2 }}>Super Admin</p>
                <p style={{ fontSize: 9, color: G.muted, margin: 0, lineHeight: 1.2 }}>admin@weblance.com</p>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, overflowY: "auto" }}>
          {children}
        </main>
      </div>
    </div>
  );
}