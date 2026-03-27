import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Briefcase,
  Building2,
  UserCheck,
  ShieldCheck,
  FolderKanban,
  AlertTriangle,
  MessageSquare,
  Swords,
  CreditCard,
  Lock,
  ArrowUpCircle,
  RotateCcw,
  Percent,
  Bot,
  ScrollText,
  RefreshCw,
  ClipboardList,
  UserCog,
  Shield,
  Settings,
  SlidersHorizontal,
  FileText,
  Mail,
  BarChart2,
  TrendingUp,
  CheckCircle2,
  Activity,
  Bell,
  Megaphone,
  ChevronLeft,
  ChevronRight,
  BookOpen,
  BadgeDollarSign,
} from "lucide-react";

const navItems = [
  {
    section: "Overview",
    items: [
      { label: "Dashboard", icon: LayoutDashboard, path: "/admin" },
    ],
  },
  {
    section: "User Management",
    items: [
      { label: "All Users",   icon: Users,      path: "/admin/users"       },
      { label: "Freelancers", icon: Briefcase,  path: "/admin/freelancers" },
      { label: "Agencies",    icon: Building2,  path: "/admin/agencies"    },
      { label: "Clients",     icon: UserCheck,  path: "/admin/clients"     },
      { label: "KYC",         icon: ShieldCheck,path: "/admin/kyc"         },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Projects",       icon: FolderKanban,   path: "/admin/projects"            },
      { label: "At-Risk",        icon: AlertTriangle,  path: "/admin/projects/at-risk"    },
      { label: "ProjectStream",  icon: MessageSquare,  path: "/admin/projectstream/freeze"},
      { label: "Disputes",       icon: Swords,         path: "/admin/disputes"            },
      { label: "Payments",       icon: CreditCard,     path: "/admin/payments"            },
      { label: "Escrow",         icon: Lock,           path: "/admin/escrow"              },
      { label: "Payouts",        icon: ArrowUpCircle,  path: "/admin/payouts"             },
      { label: "Refunds",        icon: RotateCcw,      path: "/admin/refunds"             },
      { label: "Commission",     icon: Percent,        path: "/admin/commission"          },
    ],
  },
  {
    section: "Platform",
    items: [
      { label: "AI Settings",  icon: Bot,           path: "/admin/ai-settings"          },
      { label: "AI Logs",      icon: ScrollText,    path: "/admin/ai-logs"              },
      { label: "AI Overrides", icon: RefreshCw,     path: "/admin/ai-overrides"         },
      { label: "Audit Logs",   icon: ClipboardList, path: "/admin/audit-logs"           },
      { label: "Admin Users",  icon: UserCog,       path: "/admin/admins"               },
      { label: "Roles",        icon: Shield,        path: "/admin/admins/roles"         },
      { label: "Settings",     icon: Settings,      path: "/admin/settings"             },
      { label: "General",      icon: SlidersHorizontal, path: "/admin/settings/general",    sub: true },
      { label: "Commission",   icon: BadgeDollarSign,   path: "/admin/settings/commission", sub: true },
      { label: "Policies",     icon: FileText,          path: "/admin/settings/policies",   sub: true },
      { label: "Email Tmpl.",  icon: Mail,              path: "/admin/settings/email",      sub: true },
      { label: "Rules",        icon: BookOpen,          path: "/admin/settings/rules",      sub: true },
    ],
  },
  {
    section: "Reports",
    items: [
      { label: "Revenue",         icon: BarChart2,   path: "/admin/reports/revenue"  },
      { label: "User Growth",     icon: TrendingUp,  path: "/admin/reports/users"    },
      { label: "Project Success", icon: CheckCircle2,path: "/admin/reports/projects" },
      { label: "Dispute Trends",  icon: Activity,    path: "/admin/reports/disputes" },
    ],
  },
  {
    section: "Communications",
    items: [
      { label: "Notifications", icon: Bell,     path: "/admin/notifications" },
      { label: "Announcements", icon: Megaphone,path: "/admin/announcements" },
    ],
  },
];

export default function AdminLayout({ children }) {
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  const breadcrumb = location.pathname
    .split("/")
    .filter(Boolean)
    .map((s) => s.charAt(0).toUpperCase() + s.slice(1))
    .join(" › ");

  return (
    <div
      style={{
        fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
        display: "flex",
        height: "100vh",
        background: "#f0f4ff",
        overflow: "hidden",
      }}
    >
      {/* ── Sidebar ── */}
      <aside
        style={{
          width: collapsed ? 64 : 240,
          minWidth: collapsed ? 64 : 240,
          background: "#ffffff",
          display: "flex",
          flexDirection: "column",
          transition: "width 0.22s cubic-bezier(.4,0,.2,1)",
          overflow: "hidden",
          boxShadow: "4px 0 20px rgba(10,36,68,0.07)",
          borderRight: "1px solid #eaeef6",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Logo row */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: collapsed ? "center" : "space-between",
            padding: collapsed ? "18px 0" : "18px 16px",
            borderBottom: "1px solid #eaeef6",
          }}
        >
          {/* Logo mark */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: 9,
                background: "linear-gradient(135deg, #3ddc84 0%, #1ab5c8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                boxShadow: "0 2px 12px rgba(61,220,132,0.35)",
              }}
            >
              <span style={{ color: "#fff", fontWeight: 800, fontSize: 14, letterSpacing: -0.5 }}>W</span>
            </div>
            {!collapsed && (
              <div>
                <span style={{ color: "#0d1b3e", fontWeight: 700, fontSize: 15, letterSpacing: -0.3 }}>
                  weblance
                </span>
                <span
                  style={{
                    marginLeft: 6,
                    fontSize: 9,
                    fontWeight: 700,
                    color: "#3ddc84",
                    background: "rgba(61,220,132,0.12)",
                    padding: "2px 6px",
                    borderRadius: 20,
                    letterSpacing: 0.8,
                  }}
                >
                  ADMIN
                </span>
              </div>
            )}
          </div>

          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              style={{
                background: "#f4f7ff",
                border: "1px solid #eaeef6",
                borderRadius: 6,
                padding: "4px 6px",
                cursor: "pointer",
                color: "#8a9ab5",
                display: "flex",
                alignItems: "center",
              }}
            >
              <ChevronLeft size={14} />
            </button>
          )}
        </div>

        {/* Expand button when collapsed */}
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            style={{
              background: "#f4f7ff",
              border: "1px solid #eaeef6",
              margin: "8px auto",
              borderRadius: 6,
              padding: "5px 7px",
              cursor: "pointer",
              color: "#8a9ab5",
              display: "flex",
              alignItems: "center",
            }}
          >
            <ChevronRight size={14} />
          </button>
        )}

        {/* Nav */}
        <nav
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "10px 8px",
            scrollbarWidth: "none",
          }}
        >
          {navItems.map((group) => (
            <div key={group.section} style={{ marginBottom: 6 }}>
              {!collapsed && (
                <p
                  style={{
                    fontSize: 9.5,
                    fontWeight: 700,
                    color: "#b0bcce",
                    letterSpacing: 1.4,
                    textTransform: "uppercase",
                    padding: "8px 10px 4px",
                    margin: 0,
                  }}
                >
                  {group.section}
                </p>
              )}
              {collapsed && (
                <div
                  style={{
                    height: 1,
                    background: "#eaeef6",
                    margin: "8px 10px 6px",
                  }}
                />
              )}

              {group.items.map((item) => {
                const active = location.pathname === item.path;
                const Icon = item.icon;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 9,
                      padding: item.sub && !collapsed ? "6px 10px 6px 28px" : "7px 10px",
                      borderRadius: 8,
                      marginBottom: 2,
                      textDecoration: "none",
                      transition: "all 0.15s",
                      background: active
                        ? "linear-gradient(90deg, rgba(61,220,132,0.12) 0%, rgba(26,181,200,0.07) 100%)"
                        : "transparent",
                      position: "relative",
                      justifyContent: collapsed ? "center" : "flex-start",
                    }}
                  >
                    {/* Active left bar */}
                    {active && (
                      <div
                        style={{
                          position: "absolute",
                          left: 0,
                          top: "20%",
                          bottom: "20%",
                          width: 3,
                          borderRadius: 4,
                          background: "linear-gradient(180deg, #3ddc84, #1ab5c8)",
                        }}
                      />
                    )}

                    <Icon
                      size={item.sub ? 13 : 15}
                      style={{
                        color: active ? "#1ab5c8" : "#9aabbe",
                        flexShrink: 0,
                      }}
                    />

                    {!collapsed && (
                      <span
                        style={{
                          fontSize: item.sub ? 12 : 13,
                          fontWeight: active ? 600 : 400,
                          color: active ? "#0d1b3e" : "#6b7f99",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.label}
                      </span>
                    )}

                    {active && !collapsed && (
                      <div
                        style={{
                          marginLeft: "auto",
                          width: 6,
                          height: 6,
                          borderRadius: "50%",
                          background: "linear-gradient(135deg, #3ddc84, #1ab5c8)",
                          boxShadow: "0 0 6px #3ddc84",
                        }}
                      />
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Admin user footer */}
        {!collapsed && (
          <div
            style={{
              padding: "12px 10px",
              borderTop: "1px solid #eaeef6",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                background: "#f4f7ff",
                borderRadius: 10,
                padding: "9px 11px",
                border: "1px solid #eaeef6",
              }}
            >
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  fontSize: 11,
                  fontWeight: 800,
                  color: "#fff",
                  border: "2px solid #e2e8f5",
                }}
              >
                SA
              </div>
              <div style={{ minWidth: 0 }}>
                <p style={{ margin: 0, fontSize: 12, fontWeight: 600, color: "#0d1b3e" }}>
                  Super Admin
                </p>
                <p style={{ margin: 0, fontSize: 10.5, color: "#8a9ab5" }}>
                  admin@weblance.com
                </p>
              </div>
            </div>
          </div>
        )}

        {collapsed && (
          <div style={{ padding: "12px 0", borderTop: "1px solid #eaeef6", display: "flex", justifyContent: "center" }}>
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                border: "2px solid #e2e8f5",
              }}
            >
              SA
            </div>
          </div>
        )}
      </aside>

      {/* ── Main ── */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden" }}>
        {/* Top bar */}
        <header
          style={{
            background: "#fff",
            borderBottom: "1px solid #e8edf5",
            padding: "0 24px",
            height: 56,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
            boxShadow: "0 1px 6px rgba(10,36,68,0.06)",
          }}
        >
          {/* Breadcrumb */}
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <span
              style={{
                fontSize: 13,
                color: "#8a9ab5",
                fontWeight: 500,
                letterSpacing: 0.2,
              }}
            >
              {breadcrumb}
            </span>
          </div>

          {/* Right controls */}
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            {/* Search pill */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#f4f7ff",
                border: "1px solid #e2e8f5",
                borderRadius: 20,
                padding: "6px 14px",
              }}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#8a9ab5" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <span style={{ fontSize: 12, color: "#8a9ab5" }}>Search…</span>
            </div>

            {/* Bell */}
            <button
              style={{
                position: "relative",
                background: "#f4f7ff",
                border: "1px solid #e2e8f5",
                borderRadius: 10,
                padding: "7px 8px",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
              }}
            >
              <Bell size={16} color="#5a6e8a" />
              <span
                style={{
                  position: "absolute",
                  top: 5,
                  right: 5,
                  width: 7,
                  height: 7,
                  background: "linear-gradient(135deg, #3ddc84, #1ab5c8)",
                  borderRadius: "50%",
                  border: "1.5px solid #fff",
                }}
              />
            </button>

            {/* Avatar */}
            <div
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                background: "linear-gradient(135deg, #0d1b3e 0%, #1ab5c8 100%)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 11,
                fontWeight: 800,
                color: "#fff",
                cursor: "pointer",
                border: "2px solid #e2e8f5",
              }}
            >
              SA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            background: "#f0f4ff",
          }}
        >
          {children ?? (
            /* ── placeholder dashboard ── */
            <div style={{ padding: 28 }}>
              {/* Stat cards */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: 18,
                  marginBottom: 24,
                }}
              >
                {[
                  { label: "Total Users",    value: "24,812", delta: "+8.4%", color: "#0d1b3e" },
                  { label: "Active Projects",value: "1,340",  delta: "+3.1%", color: "#0a2444" },
                  { label: "Revenue (₹)",    value: "₹42.6L", delta: "+12%",  color: "#0b3255" },
                  { label: "Disputes Open",  value: "38",     delta: "-5.2%", color: "#0e3b60" },
                ].map((c) => (
                  <div
                    key={c.label}
                    style={{
                      background: c.color,
                      borderRadius: 14,
                      padding: "20px 22px",
                      color: "#fff",
                      boxShadow: "0 4px 20px rgba(10,36,68,0.14)",
                      position: "relative",
                      overflow: "hidden",
                    }}
                  >
                    {/* Decorative circle */}
                    <div
                      style={{
                        position: "absolute",
                        right: -18,
                        top: -18,
                        width: 80,
                        height: 80,
                        borderRadius: "50%",
                        background: "rgba(61,220,132,0.12)",
                      }}
                    />
                    <p style={{ margin: "0 0 6px", fontSize: 11.5, color: "rgba(255,255,255,0.5)", fontWeight: 600, letterSpacing: 0.4 }}>
                      {c.label}
                    </p>
                    <p style={{ margin: "0 0 8px", fontSize: 26, fontWeight: 800, letterSpacing: -0.5 }}>
                      {c.value}
                    </p>
                    <span
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        color: c.delta.startsWith("+") ? "#3ddc84" : "#ff6b6b",
                        background: c.delta.startsWith("+") ? "rgba(61,220,132,0.15)" : "rgba(255,107,107,0.15)",
                        padding: "2px 8px",
                        borderRadius: 20,
                      }}
                    >
                      {c.delta} this month
                    </span>
                  </div>
                ))}
              </div>

              {/* Bottom placeholder cards */}
              <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 18 }}>
                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: 24,
                    boxShadow: "0 2px 12px rgba(10,36,68,0.07)",
                    minHeight: 220,
                  }}
                >
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 15, color: "#0d1b3e" }}>
                    Revenue Overview
                  </p>
                  <p style={{ margin: 0, fontSize: 12, color: "#8a9ab5" }}>Monthly breakdown</p>
                  <div
                    style={{
                      marginTop: 20,
                      display: "flex",
                      alignItems: "flex-end",
                      gap: 8,
                      height: 120,
                    }}
                  >
                    {[55, 72, 60, 88, 76, 95, 82, 100, 90, 78, 86, 94].map((h, i) => (
                      <div
                        key={i}
                        style={{
                          flex: 1,
                          height: `${h}%`,
                          borderRadius: "5px 5px 0 0",
                          background:
                            i === 11
                              ? "linear-gradient(180deg, #3ddc84, #1ab5c8)"
                              : "linear-gradient(180deg, #c8d9f5, #dce8ff)",
                        }}
                      />
                    ))}
                  </div>
                </div>

                <div
                  style={{
                    background: "#fff",
                    borderRadius: 14,
                    padding: 24,
                    boxShadow: "0 2px 12px rgba(10,36,68,0.07)",
                  }}
                >
                  <p style={{ margin: "0 0 4px", fontWeight: 700, fontSize: 15, color: "#0d1b3e" }}>
                    Quick Actions
                  </p>
                  <p style={{ margin: "0 0 16px", fontSize: 12, color: "#8a9ab5" }}>Common tasks</p>
                  {["Review KYC Requests", "Approve Payouts", "Check Disputes", "View AI Logs"].map((label) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "10px 12px",
                        background: "#f4f7ff",
                        borderRadius: 9,
                        marginBottom: 8,
                        cursor: "pointer",
                        fontSize: 13,
                        fontWeight: 500,
                        color: "#0d1b3e",
                      }}
                    >
                      {label}
                      <ChevronRight size={14} color="#1ab5c8" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}