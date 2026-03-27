import { useState } from "react";
import { useNavigate } from "react-router-dom";

(() => {
  if (document.getElementById("wl-team-dash-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-team-dash-fonts"; l.rel = "stylesheet";
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
  yellow:      "#f59e0b",
  yellowBg:    "#fffbeb",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
};
const FONT = "'Plus Jakarta Sans', sans-serif";

// ── Data ──
const STATS = [
  { icon: "✅", label: "Tasks Done",       value: "2/5",  sub: "3 pending today",    color: G.green,      bg: G.greenBg  },
  { icon: "🗂️", label: "Active Projects",  value: "2",    sub: "2 on track",          color: G.blue,       bg: G.blueBg   },
  { icon: "⏱️", label: "Hours This Week",  value: "28h",  sub: "40h total capacity",  color: G.yellow,     bg: G.yellowBg },
  { icon: "⭐", label: "Perf. Score",      value: "4.9",  sub: "Rated by agency PM",  color: G.purple,     bg: G.purpleBg },
];

const PROJECTS = [
  { id: 1, name: "Food Delivery App",   client: "ByteEats Co.", budget: "$42K", progress: 65, role: "Backend Dev",  status: "ON TRACK", riskColor: "#f59e0b", riskBg: "#fffbeb", riskBorder: "#fde68a", channel: "/agency/channel2/1" },
  { id: 2, name: "E-commerce Platform", client: "GlobalShop",   budget: "$28K", progress: 30, role: "Full Stack",   status: "ON TRACK", riskColor: G.greenDark, riskBg: G.greenBg, riskBorder: G.greenBorder, channel: "/agency/channel2/1" },
];

const TASKS = [
  { id: 1, text: "Implement checkout API integration", priority: "high", done: false, due: "Today"    },
  { id: 2, text: "Fix cart UI bug on mobile",          priority: "high", done: false, due: "Today"    },
  { id: 3, text: "Write unit tests for auth module",   priority: "med",  done: false, due: "Tomorrow" },
  { id: 4, text: "Code review: Sara's PR #47",         priority: "med",  done: true,  due: "Done"     },
  { id: 5, text: "Update README for payment service",  priority: "low",  done: true,  due: "Done"     },
];

const TEAM = [
  { name: "Raj Kumar", role: "ADMIN",     initial: "R", bg: "#fee2e2", color: "#dc2626", status: "available"  },
  { name: "Sara M.",   role: "DEVELOPER", initial: "S", bg: G.blueBg,  color: G.blue,    status: "available",  me: true },
  { name: "Dev Mike",  role: "DEVELOPER", initial: "D", bg: G.blueBg,  color: G.blue,    status: "on_project" },
  { name: "Priya S.",  role: "DESIGNER",  initial: "P", bg: G.purpleBg,color: G.purple,  status: "available"  },
  { name: "James L.",  role: "DEVOPS",    initial: "J", bg: "#f3f4f6", color: "#374151", status: "on_project" },
];

const ACTIVITIES = [
  { text: "You uploaded deliverable: checkout-api-v2.zip", time: "2 hrs ago",  dot: G.green   },
  { text: "PM assigned you: Fix cart UI bug",              time: "4 hrs ago",  dot: G.blue    },
  { text: "Raj Kumar commented on your PR #47",            time: "Yesterday",  dot: G.yellow  },
  { text: "Milestone approved: Authentication Module",     time: "2 days ago", dot: G.green   },
  { text: "You joined Food Delivery App project",          time: "1 week ago", dot: G.muted   },
];

const PERMISSIONS = [
  { label: "Chat with Client",   allowed: true  },
  { label: "Upload Files",       allowed: true  },
  { label: "View Tasks",         allowed: true  },
  { label: "Approve Milestones", allowed: false },
  { label: "View Finance",       allowed: false },
  { label: "Change Scope",       allowed: false },
];

const SKILLS = [
  { label: "React",      pct: 90 },
  { label: "Node.js",    pct: 82 },
  { label: "PostgreSQL", pct: 70 },
  { label: "Docker",     pct: 60 },
];

export default function TeamMemberDashboard() {
  const navigate  = useNavigate();
  const [taskList, setTaskList] = useState(TASKS);
  const pending = taskList.filter(t => !t.done).length;
  const toggleTask = (id) => setTaskList(p => p.map(t => t.id === id ? { ...t, done: !t.done } : t));

  return (
    <div style={{ padding: "20px 24px 40px", fontFamily: FONT, background: G.bg, minHeight: "100%" }}>

      {/* Welcome */}
      <div style={{ marginBottom: 20 }}>
        <p style={{ fontSize: 20, fontWeight: 800, color: G.text, margin: 0, letterSpacing: "-0.3px" }}>
          Welcome back, Sara Mehta 👋
        </p>
        <p style={{ fontSize: 12, color: G.muted, margin: "3px 0 0" }}>Here's your member overview for today</p>
      </div>

      {/* ── STAT CARDS ── */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 14, marginBottom: 20 }}>
        {STATS.map((s, i) => (
          <div key={i} style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, padding: "16px 18px", display: "flex", alignItems: "center", gap: 14, boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: s.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>{s.icon}</div>
            <div>
              <p style={{ fontSize: 20, fontWeight: 800, color: s.color, margin: 0, letterSpacing: "-0.4px" }}>{s.value}</p>
              <p style={{ fontSize: 11, fontWeight: 600, color: G.text, margin: "2px 0 1px" }}>{s.label}</p>
              <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{s.sub}</p>
            </div>
          </div>
        ))}
      </div>

      {/* ── ROW 1: Projects + Tasks ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Active Projects */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>Active Projects</p>
              <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0" }}>Assigned to you by agency</p>
            </div>
            <button onClick={() => navigate("/team/projects")}
              style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
              View All
            </button>
          </div>

          {PROJECTS.map((p, i) => (
            <div key={p.id} onClick={() => navigate("/team/projects")}
              style={{ padding: "14px 18px", borderBottom: i < PROJECTS.length - 1 ? `1px solid #f9fafb` : "none", cursor: "pointer", transition: "background 0.12s" }}
              onMouseEnter={e => e.currentTarget.style.background = G.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 8 }}>
                <div>
                  <p style={{ fontSize: 13, fontWeight: 700, color: G.text, margin: 0 }}>{p.name}</p>
                  <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0" }}>
                    {p.client} · <span style={{ color: G.blue, fontWeight: 600 }}>{p.role}</span>
                  </p>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, background: p.riskBg, color: p.riskColor, border: `1px solid ${p.riskBorder}`, padding: "2px 8px", borderRadius: 99, flexShrink: 0 }}>
                  {p.status}
                </span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 5 }}>
                <div style={{ flex: 1, background: "#f3f4f6", borderRadius: 99, height: 5, overflow: "hidden" }}>
                  <div style={{ width: `${p.progress}%`, height: "100%", background: `linear-gradient(90deg,${G.green},#2563eb)`, borderRadius: 99 }} />
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: G.text, flexShrink: 0 }}>{p.progress}%</span>
              </div>
              <button onClick={e => { e.stopPropagation(); navigate(p.channel); }}
                style={{ fontSize: 10, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 6, padding: "3px 9px", cursor: "pointer", fontFamily: FONT }}>
                💬 Open Channel 2
              </button>
            </div>
          ))}
        </div>

        {/* My Tasks */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>My Tasks</p>
            <span style={{ fontSize: 11, fontWeight: 700, background: G.blueBg, color: G.blue, border: `1px solid #bfdbfe`, padding: "3px 10px", borderRadius: 99 }}>
              {pending} pending
            </span>
          </div>
          {taskList.map((task, i) => (
            <div key={task.id} onClick={() => toggleTask(task.id)}
              style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 18px", borderBottom: i < taskList.length - 1 ? `1px solid #f9fafb` : "none", cursor: "pointer", transition: "background 0.1s" }}
              onMouseEnter={e => e.currentTarget.style.background = G.bg}
              onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
              {/* Checkbox */}
              <div style={{ width: 18, height: 18, borderRadius: 5, border: `2px solid ${task.done ? G.green : G.greenBorder}`, background: task.done ? G.green : G.white, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, transition: "all 0.15s" }}>
                {task.done && <svg width="10" height="10" fill="none" viewBox="0 0 10 10"><path d="M2 5l2.5 2.5 3.5-3.5" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
              </div>
              {/* Priority dot */}
              <span style={{ width: 7, height: 7, borderRadius: "50%", flexShrink: 0, background: task.priority === "high" ? G.red : task.priority === "med" ? G.yellow : G.green }} />
              {/* Text */}
              <span style={{ flex: 1, fontSize: 12, color: task.done ? G.muted : G.text, textDecoration: task.done ? "line-through" : "none", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                {task.text}
              </span>
              {/* Due */}
              <span style={{ fontSize: 10, fontWeight: 700, flexShrink: 0, color: task.due === "Today" ? G.red : G.muted }}>
                {task.due}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* ── ROW 2: Activity + Skills + Team ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>

        {/* Recent Activity */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>Recent Activity</p>
          </div>
          <div style={{ padding: "6px 0" }}>
            {ACTIVITIES.map((a, i) => (
              <div key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "9px 18px", borderBottom: i < ACTIVITIES.length - 1 ? `1px solid #f9fafb` : "none" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.dot, flexShrink: 0, marginTop: 5 }} />
                <div>
                  <p style={{ fontSize: 12, color: G.text, margin: 0, lineHeight: 1.4 }}>{a.text}</p>
                  <p style={{ fontSize: 10, color: G.muted, margin: "2px 0 0" }}>{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* My Skills */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6`, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>My Skills</p>
            <button onClick={() => navigate("/team/profile")}
              style={{ fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 7, padding: "4px 10px", cursor: "pointer", fontFamily: FONT }}>
              Edit
            </button>
          </div>
          <div style={{ padding: "14px 18px" }}>
            {SKILLS.map((s, i) => (
              <div key={i} style={{ marginBottom: i < SKILLS.length - 1 ? 14 : 0 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}>
                  <span style={{ fontSize: 12, color: G.text, fontWeight: 500 }}>{s.label}</span>
                  <span style={{ fontSize: 12, fontWeight: 700, color: G.greenDark }}>{s.pct}%</span>
                </div>
                <div style={{ background: "#f3f4f6", borderRadius: 99, height: 5, overflow: "hidden" }}>
                  <div style={{ width: `${s.pct}%`, height: "100%", background: `linear-gradient(90deg,${G.green},#86efac)`, borderRadius: 99 }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Team */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>My Team</p>
            <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0" }}>TechVision Solutions</p>
          </div>
          <div style={{ padding: "6px 0" }}>
            {TEAM.map((m, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "8px 18px", borderBottom: i < TEAM.length - 1 ? `1px solid #f9fafb` : "none" }}
                onMouseEnter={e => e.currentTarget.style.background = G.bg}
                onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                <div style={{ position: "relative", flexShrink: 0 }}>
                  <div style={{ width: 28, height: 28, borderRadius: "50%", background: m.bg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: m.color }}>
                    {m.initial}
                  </div>
                  {m.me && (
                    <span style={{ position: "absolute", bottom: -1, right: -1, width: 9, height: 9, borderRadius: "50%", background: G.green, border: `2px solid ${G.white}` }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: 12, fontWeight: m.me ? 700 : 600, color: G.text, margin: 0 }}>
                    {m.name}{m.me && <span style={{ fontSize: 10, color: G.muted, fontWeight: 400, marginLeft: 5 }}>(you)</span>}
                  </p>
                  <p style={{ fontSize: 10, color: G.muted, margin: 0 }}>{m.role}</p>
                </div>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: m.status === "available" ? G.green : G.blue, flexShrink: 0 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── ROW 3: Permissions + Quick Links ── */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>

        {/* My Permissions */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>My Permissions</p>
            <p style={{ fontSize: 11, color: G.muted, margin: "2px 0 0" }}>Set by agency admin</p>
          </div>
          <div style={{ padding: "14px 18px" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {PERMISSIONS.map((p, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 7, padding: "7px 10px", borderRadius: 8, background: p.allowed ? G.greenBg : G.redBg, border: `1px solid ${p.allowed ? G.greenBorder : "#fecaca"}` }}>
                  <span style={{ fontSize: 12 }}>{p.allowed ? "✅" : "🚫"}</span>
                  <span style={{ fontSize: 11, fontWeight: 600, color: p.allowed ? G.greenDark : "#dc2626" }}>{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links + Growth */}
        <div style={{ background: G.white, border: `1px solid ${G.border}`, borderRadius: 14, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px 12px", borderBottom: `1px solid #f3f4f6` }}>
            <p style={{ fontSize: 14, fontWeight: 700, color: G.text, margin: 0 }}>My Profile</p>
          </div>
          <div style={{ padding: "14px 18px" }}>
            {/* Stats */}
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                { label: "Projects Done",  value: "4",         color: G.blue      },
                { label: "Rating",         value: "⭐ 4.9",    color: G.yellow    },
                { label: "Joined",         value: "3 mo ago",  color: G.muted     },
                { label: "Tasks Done",     value: "47",        color: G.greenDark },
              ].map((s, i) => (
                <div key={i} style={{ background: G.bg, borderRadius: 9, padding: "9px 11px" }}>
                  <p style={{ fontSize: 14, fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
                  <p style={{ fontSize: 10, color: G.muted, margin: "2px 0 0" }}>{s.label}</p>
                </div>
              ))}
            </div>

            {/* Quick action buttons */}
            <div style={{ display: "flex", gap: 8 }}>
              <button onClick={() => navigate("/team/profile")}
                style={{ flex: 1, fontSize: 11, fontWeight: 700, color: G.greenDark, background: G.greenBg, border: `1px solid ${G.greenBorder}`, borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: FONT }}>
                👤 Edit Profile
              </button>
              <button onClick={() => navigate("/team/notifications")}
                style={{ flex: 1, fontSize: 11, fontWeight: 700, color: G.blue, background: G.blueBg, border: `1px solid #bfdbfe`, borderRadius: 8, padding: "8px", cursor: "pointer", fontFamily: FONT }}>
                🔔 Notifications
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}