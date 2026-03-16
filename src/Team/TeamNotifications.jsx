import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-tn-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-tn-fonts"; l.rel = "stylesheet";
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
};
const FONT = "'Plus Jakarta Sans', sans-serif";

const TYPE_META = {
  project:      { icon:"📋", color:"#2563eb", bg:"#eff6ff", border:"#bfdbfe", label:"Projects"      },
  task:         { icon:"✅", color:G.greenDark, bg:G.greenBg, border:G.greenBorder, label:"Tasks"   },
  task_due:     { icon:"⏰", color:"#d97706", bg:"#fef3c7", border:"#fde68a", label:"Tasks"         },
  message:      { icon:"💬", color:"#4f46e5", bg:"#eef2ff", border:"#c7d2fe", label:"Messages"      },
  milestone:    { icon:"🔔", color:G.greenDark, bg:G.greenBg, border:G.greenBorder, label:"Projects" },
  deadline:     { icon:"⏰", color:"#dc2626", bg:"#fef2f2", border:"#fecaca", label:"Tasks"         },
  approved:     { icon:"👏", color:G.greenDark, bg:G.greenBg, border:G.greenBorder, label:"Projects" },
  hold:         { icon:"⚠️", color:"#c2410c", bg:"#fff7ed", border:"#fed7aa", label:"Projects"      },
  review:       { icon:"🏅", color:"#7c3aed", bg:"#f5f3ff", border:"#ddd6fe", label:"Projects"      },
  security:     { icon:"🔐", color:"#dc2626", bg:"#fef2f2", border:"#fecaca", label:"Security"      },
  announcement: { icon:"📣", color:"#0891b2", bg:"#ecfeff", border:"#a5f3fc", label:"Announcements" },
};

const ALL_NOTIFS = [
  { id:"TN001", type:"task_due",     read:false, time:"Just now",   title:"Task Due Tomorrow",              desc:"'Build product listing page' for ShopEasy Retail is due tomorrow, Mar 28. Don't forget to update the status!", action:"Open Task",      link:"/team/projects"      },
  { id:"TN002", type:"message",      read:false, time:"15 min ago", title:"New Message from Raj Kumar",     desc:"Raj Kumar sent a message in ShopEasy Retail — Channel 2: 'Sara, can you check the cart module today?'",       action:"Open Channel",   link:"/agency/channel2/1"  },
  { id:"TN003", type:"approved",     read:false, time:"2 hrs ago",  title:"Deliverable Approved! 🎉",       desc:"Your deliverable 'UX Wireframes & Prototype' for ShopEasy Retail was approved by the client.",                 action:"View Project",   link:"/team/projects"      },
  { id:"TN004", type:"project",      read:false, time:"5 hrs ago",  title:"New Project Assigned",           desc:"You've been assigned to the TravelNest project (CON-2026-003) as Frontend Developer. Project starts Mar 12.", action:"View Project",   link:"/team/projects"      },
  { id:"TN005", type:"task",         read:false, time:"6 hrs ago",  title:"Task Status Updated",            desc:"Raj Kumar updated the status of 'Architecture document review' to Done in TravelNest project.",               action:null,             link:null                  },
  { id:"TN006", type:"milestone",    read:true,  time:"Yesterday",  title:"Milestone Started",              desc:"M2 'Core Backend Build' has started for ShopEasy Retail. Your tasks are now unlocked. Deadline: Apr 15.",    action:"View Project",   link:"/team/projects"      },
  { id:"TN007", type:"announcement", read:true,  time:"Yesterday",  title:"Agency Announcement",            desc:"TechVision Solutions: Office closed on Mar 25 (Holi). Remote work is optional. Deadlines remain unchanged.", action:null,             link:null                  },
  { id:"TN008", type:"hold",         read:true,  time:"2 days ago", title:"Project Put On Hold",            desc:"HealthFirst Clinic project (CON-2026-004) has been put on hold by the client pending legal clearance.",       action:null,             link:null                  },
  { id:"TN009", type:"review",       read:true,  time:"2 days ago", title:"Performance Feedback Received",  desc:"Raj Kumar left Sprint 2 feedback: 'Sara's work on the product listing has been exceptional.'",                action:null,             link:null                  },
  { id:"TN010", type:"task",         read:true,  time:"3 days ago", title:"New Task Assigned",              desc:"'Responsive mobile layout' has been assigned to you for ShopEasy Retail. Due Apr 10, 2026. Priority: Medium.", action:"View Task",     link:"/team/projects"      },
  { id:"TN011", type:"message",      read:true,  time:"3 days ago", title:"New Message in TravelNest",      desc:"Aditya Bose sent a message in TravelNest — Channel 1: 'The architecture doc looks great!'",                   action:"Open Channel",   link:"/agency/channel2/3"  },
  { id:"TN012", type:"deadline",     read:true,  time:"4 days ago", title:"Upcoming Deadline Reminder",     desc:"'Component library setup' was due Mar 22 for ShopEasy Retail. Please mark it done if completed.",              action:"View Task",      link:"/team/projects"      },
  { id:"TN013", type:"security",     read:true,  time:"5 days ago", title:"New Login Detected",             desc:"New login from Chrome on iPhone, Mumbai, India on Mar 8, 2026. Not you? Contact admin.",                      action:"Contact Admin",  link:"/team/profile"       },
  { id:"TN014", type:"project",      read:true,  time:"1 week ago", title:"Added to ShopEasy Project",      desc:"You've been added to the E-Commerce Platform Revamp project (CON-2026-001) as Lead Frontend Developer.",       action:"View Project",   link:"/team/projects"      },
  { id:"TN015", type:"announcement", read:true,  time:"1 week ago", title:"Agency Policy Update",           desc:"TechVision Solutions has updated the code review policy. All PRs now require 2 approvals before merging.",     action:null,             link:null                  },
];

const TABS = [
  { id:"all",           label:"All"           },
  { id:"projects",      label:"Projects"      },
  { id:"tasks",         label:"Tasks"         },
  { id:"messages",      label:"Messages"      },
  { id:"announcements", label:"Announcements" },
];

const TAB_TYPE_MAP = {
  projects:      ["project","milestone","approved","hold","review"],
  tasks:         ["task","task_due","deadline"],
  messages:      ["message"],
  announcements: ["announcement"],
};

export default function TeamNotifications() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [tab,    setTab]    = useState("all");

  const unreadCount = notifs.filter(n => !n.read).length;

  const rows = useMemo(() => {
    if (tab === "all") return notifs;
    return notifs.filter(n => (TAB_TYPE_MAP[tab] || [tab]).includes(n.type));
  }, [notifs, tab]);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read:true })));
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read:true } : n));
  const dismiss     = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const groups = useMemo(() => {
    const todayTimes = ["Just now","15 min ago","2 hrs ago","5 hrs ago","6 hrs ago"];
    const today     = rows.filter(n => todayTimes.includes(n.time));
    const yesterday = rows.filter(n => n.time === "Yesterday");
    const older     = rows.filter(n => !today.includes(n) && !yesterday.includes(n));
    return [
      { label:"Today",     items:today     },
      { label:"Yesterday", items:yesterday },
      { label:"Earlier",   items:older     },
    ].filter(g => g.items.length > 0);
  }, [rows]);

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar unread={unreadCount} />

      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:780, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"20px 0 0" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Notifications</h1>
                {unreadCount > 0 && (
                  <span style={{ background:G.green, color:G.white, fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>{unreadCount} new</span>
                )}
              </div>
              <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Stay updated on your tasks and projects</p>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ fontSize:12, fontWeight:700, color:G.greenDark, background:G.greenBg,
                  border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"7px 14px",
                  cursor:"pointer", marginBottom:4, fontFamily:FONT }}>
                ✓ Mark all read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:0, marginTop:14, borderTop:"1px solid #f3f4f6" }}>
            {TABS.map(t => {
              const cnt    = t.id === "all" ? notifs.length : notifs.filter(n => (TAB_TYPE_MAP[t.id] || []).includes(n.type)).length;
              const unread = t.id === "all" ? unreadCount   : notifs.filter(n => !n.read && (TAB_TYPE_MAP[t.id] || []).includes(n.type)).length;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px",
                    fontSize:13, fontWeight:active ? 700 : 400,
                    color:active ? G.greenDark : G.sub,
                    background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {t.label}
                  {unread > 0 && <span style={{ width:7, height:7, borderRadius:"50%", background:G.green, flexShrink:0 }} />}
                  <span style={{ fontSize:11, fontWeight:700, background:active ? G.green : "#f3f4f6", color:active ? G.white : G.muted, padding:"1px 6px", borderRadius:99 }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:780, margin:"0 auto", padding:"24px 28px 64px" }}>
        {rows.length === 0 ? (
          <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, textAlign:"center", padding:"64px 20px" }}>
            <p style={{ fontSize:36, marginBottom:12 }}>🔔</p>
            <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No notifications here</p>
            <p style={{ fontSize:13, color:G.muted, marginTop:4 }}>You're all caught up!</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {groups.map(grp => (
              <div key={grp.label}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.08em" }}>{grp.label}</p>
                  <div style={{ flex:1, height:1, background:"#f3f4f6" }} />
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {grp.items.map(n => {
                    const tm       = TYPE_META[n.type] || TYPE_META.project;
                    const isUrgent = n.type === "task_due" || n.type === "deadline";
                    return (
                      <div key={n.id} onClick={() => markRead(n.id)}
                        style={{ background:n.read ? G.white : G.greenBg,
                          border:`1px solid ${n.read ? G.border : G.greenBorder}`,
                          borderLeft:`3px solid ${n.read ? G.border : isUrgent ? "#ef4444" : G.green}`,
                          borderRadius:12, padding:"14px 16px",
                          display:"flex", alignItems:"flex-start", gap:14,
                          cursor:"pointer", transition:"all 0.12s" }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(34,197,94,0.08)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>

                        <div style={{ width:40, height:40, borderRadius:12,
                          background:tm.bg, border:`1px solid ${tm.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:18, flexShrink:0 }}>{tm.icon}</div>

                        <div style={{ flex:1 }}>
                          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:3 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                              <p style={{ fontSize:13, fontWeight:n.read ? 600 : 700, color:G.text }}>{n.title}</p>
                              {!n.read && <span style={{ width:7, height:7, borderRadius:"50%", background:isUrgent ? "#ef4444" : G.green, flexShrink:0 }} />}
                              <span style={{ fontSize:10, fontWeight:600, background:tm.bg, color:tm.color, border:`1px solid ${tm.border}`, padding:"1px 7px", borderRadius:99 }}>{tm.label}</span>
                              {isUrgent && <span style={{ fontSize:10, fontWeight:700, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", padding:"1px 7px", borderRadius:99 }}>⚡ Urgent</span>}
                            </div>
                            <p style={{ fontSize:11, color:G.muted, flexShrink:0, marginLeft:10 }}>{n.time}</p>
                          </div>
                          <p style={{ fontSize:12, color:G.sub, lineHeight:1.65, marginBottom:n.action ? 10 : 0 }}>{n.desc}</p>
                          {n.action && (
                            <a href={n.link || "#"} onClick={e => e.stopPropagation()}
                              style={{ fontSize:12, fontWeight:700, color:G.greenDark,
                                background:G.greenBg, border:`1px solid ${G.greenBorder}`,
                                borderRadius:7, padding:"4px 12px",
                                textDecoration:"none", display:"inline-block" }}>
                              {n.action} →
                            </a>
                          )}
                        </div>

                        <button onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                          style={{ width:24, height:24, borderRadius:7, border:`1px solid ${G.border}`,
                            background:G.bg, display:"flex", alignItems:"center", justifyContent:"center",
                            cursor:"pointer", flexShrink:0, color:G.muted, fontSize:12 }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ textAlign:"center", paddingTop:8 }}>
              <a href="/team/profile" style={{ fontSize:13, color:G.sub, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
                ⚙️ <span style={{ textDecoration:"underline" }}>Manage notification preferences in Profile</span>
              </a>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Navbar({ unread }) {
  return (
    <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <span style={{ color:G.green }}>web</span>lance
      </span>
      <div style={{ width:1, height:20, background:G.border }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Team</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Notifications</span>
      {unread > 0 && <span style={{ background:G.green, color:G.white, fontSize:11, fontWeight:700, padding:"2px 8px", borderRadius:99, marginLeft:2 }}>{unread}</span>}
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>👤</span>
        <span style={{ fontSize:11, color:G.greenDark, fontWeight:700 }}>Team Member</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.greenDark, marginLeft:8, fontFamily:FONT }}>SM</div>
    </nav>
  );
}