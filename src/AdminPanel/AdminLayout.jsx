import { useState } from "react";
import { Link, useLocation } from "react-router-dom";

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
      { label: "Projects",      icon: "⊟", path: "/admin/projects"             },
      { label: "At-Risk",       icon: "⚠", path: "/admin/projects/at-risk"     },
      { label: "ProjectStream", icon: "💬", path: "/admin/projectstream/freeze"  },
      { label: "Disputes",    icon: "⚑", path: "/admin/disputes"   },
      { label: "Payments",    icon: "⊕", path: "/admin/payments"   },
      { label: "Escrow",      icon: "🔐", path: "/admin/escrow"     },
      { label: "Payouts",     icon: "⬆", path: "/admin/payouts"    },
      { label: "Refunds",     icon: "↩", path: "/admin/refunds"    },
      { label: "Commission",  icon: "◈", path: "/admin/commission" },
    ],
  },
  {
    section: "Platform",
    items: [
      { label: "AI Settings",  icon: "◎", path: "/admin/ai-settings"  },
      { label: "AI Logs",      icon: "≋", path: "/admin/ai-logs"      },
      { label: "AI Overrides", icon: "↺", path: "/admin/ai-overrides" },
      { label: "Audit Logs",   icon: "≡", path: "/admin/audit-logs"    },
      { label: "Admin Users",  icon: "⊞", path: "/admin/admins"        },
      { label: "Roles",        icon: "◈", path: "/admin/admins/roles"  },
      { label: "Settings",     icon: "⊙", path: "/admin/settings"            },
      { label: "→ General",     icon: " ", path: "/admin/settings/general"    },
      { label: "→ Commission",  icon: " ", path: "/admin/settings/commission" },
      { label: "→ Policies",    icon: " ", path: "/admin/settings/policies"   },
      { label: "→ Email Tmpl.", icon: " ", path: "/admin/settings/email"      },
      { label: "→ Rules",       icon: " ", path: "/admin/settings/rules"      },
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
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-gray-50 font-sans overflow-hidden">
      {/* Sidebar */}
      <aside
        className={`${
          collapsed ? "w-16" : "w-60"
        } bg-white border-r border-gray-100 flex flex-col transition-all duration-200 shrink-0`}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-100">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center">
                <span className="text-white text-xs font-bold">W</span>
              </div>
              <span className="font-bold text-gray-900 text-sm tracking-tight">
                weblance
                <span className="ml-1 text-[10px] font-semibold text-green-600 bg-green-50 px-1.5 py-0.5 rounded-full">
                  ADMIN
                </span>
              </span>
            </div>
          )}
          {collapsed && (
            <div className="w-7 h-7 bg-green-500 rounded-lg flex items-center justify-center mx-auto">
              <span className="text-white text-xs font-bold">W</span>
            </div>
          )}
          {!collapsed && (
            <button
              onClick={() => setCollapsed(true)}
              className="text-gray-400 hover:text-gray-600 text-xs"
            >
              ◀
            </button>
          )}
        </div>

        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="text-gray-400 hover:text-gray-600 text-xs py-2 text-center"
          >
            ▶
          </button>
        )}

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {navItems.map((group) => (
            <div key={group.section} className="mb-4">
              {!collapsed && (
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-2 mb-1">
                  {group.section}
                </p>
              )}
              {group.items.map((item) => {
                const active = location.pathname === item.path;
                return (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`flex items-center gap-2.5 px-2 py-2 rounded-lg mb-0.5 text-sm transition-all ${
                      active
                        ? "bg-green-50 text-green-700 font-semibold"
                        : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                    }`}
                  >
                    <span className={`text-base ${active ? "text-green-500" : "text-gray-400"}`}>
                      {item.icon}
                    </span>
                    {!collapsed && <span>{item.label}</span>}
                    {active && !collapsed && (
                      <span className="ml-auto w-1.5 h-1.5 rounded-full bg-green-500"></span>
                    )}
                  </Link>
                );
              })}
            </div>
          ))}
        </nav>

        {/* Admin user */}
        {!collapsed && (
          <div className="p-3 border-t border-gray-100">
            <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg bg-gray-50">
              <div className="w-7 h-7 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold shrink-0">
                SA
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold text-gray-800 truncate">Super Admin</p>
                <p className="text-[10px] text-gray-400 truncate">admin@weblance.com</p>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top bar */}
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-gray-300 text-sm">
              {location.pathname.split("/").filter(Boolean).join(" / ")}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-1.5 rounded-lg hover:bg-gray-50 transition-colors">
              <span className="text-gray-500 text-lg">🔔</span>
              <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-red-500 rounded-full border border-white"></span>
            </button>
            <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center text-white text-xs font-bold">
              SA
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}