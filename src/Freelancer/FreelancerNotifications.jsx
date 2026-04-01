import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fn-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fn-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

/* ── Two color families — green + navy ───────────────────────
   GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
   NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
   ──────────────────────────────────────────────────────────── */
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

const TYPE_META = {
  payment:    { icon:"💰", color:G.greenDeep,  bg:G.greenBg,  border:G.greenBorder, label:"Payment"   },
  contract:   { icon:"📋", color:G.navy,       bg:G.navyBg,   border:G.navyBorder,  label:"Contract"  },
  proposal:   { icon:"📨", color:"#7c3aed",    bg:"#f5f3ff",  border:"#ddd6fe",     label:"Proposal"  },
  invite:     { icon:"🎯", color:"#0891b2",    bg:"#ecfeff",  border:"#a5f3fc",     label:"Proposal"  },
  milestone:  { icon:"⏰", color:"#d97706",    bg:"#fef3c7",  border:"#fde68a",     label:"Contract"  },
  message:    { icon:"💬", color:"#4f46e5",    bg:"#eef2ff",  border:"#c7d2fe",     label:"Messages"  },
  review:     { icon:"🌟", color:"#d97706",    bg:"#fef3c7",  border:"#fde68a",     label:"Contract"  },
  withdrawal: { icon:"📤", color:G.greenDeep,  bg:G.greenBg,  border:G.greenBorder, label:"Payment"   },
  profile:    { icon:"🔔", color:G.navy,       bg:G.navyBg,   border:G.navyBorder,  label:"Platform"  },
  ranking:    { icon:"📈", color:G.greenDeep,  bg:G.greenBg,  border:G.greenBorder, label:"Platform"  },
  security:   { icon:"🔐", color:"#dc2626",    bg:"#fef2f2",  border:"#fecaca",     label:"Platform"  },
  match:      { icon:"🎯", color:"#7c3aed",    bg:"#f5f3ff",  border:"#ddd6fe",     label:"Proposals" },
  hold:       { icon:"⚠️", color:"#c2410c",    bg:"#fff7ed",  border:"#fed7aa",     label:"Contract"  },
  platform:   { icon:"📣", color:G.navy,       bg:G.navyBg,   border:G.navyBorder,  label:"Platform"  },
};

const ALL_NOTIFS = [
  { id:"FN001", type:"payment",    read:false, time:"5 min ago",  title:"Payment Released 💰",          desc:"₹56,400 has been released for M1 'Discovery & Architecture' milestone on ShopEasy Retail contract.",                    action:"View Earnings",   link:"/freelancer/earnings"   },
  { id:"FN002", type:"match",      read:false, time:"1 hr ago",   title:"New Project Match 🎯",          desc:"A new project 'React Dashboard for FinTech SaaS' matches your skills. Budget: ₹1,80,000. Client: Mumbai-based startup.", action:"View Project",    link:"/hire-talent/dashboard" },
  { id:"FN003", type:"message",    read:false, time:"2 hrs ago",  title:"New Message from Vikram Singh", desc:"Vikram Singh (ShopEasy Retail): 'Hey Arjun, can we hop on a quick call tomorrow at 11am to review the cart flow?'",    action:"Reply",           link:"/project-stream"        },
  { id:"FN004", type:"contract",   read:false, time:"3 hrs ago",  title:"Contract Signed ✅",            desc:"TravelNest (Aditya Bose) has signed the contract CON-2026-003 for Travel Booking Platform Frontend. Project begins Mar 12.", action:"View Contract", link:"/freelancer/contracts"  },
  { id:"FN005", type:"review",     read:false, time:"5 hrs ago",  title:"New 5★ Review! 🌟",            desc:"Vikram Singh (ShopEasy Retail) left you a 5-star review: 'Outstanding work, delivered ahead of schedule...'",           action:"View Review",     link:"/freelancer/reviews"    },
  { id:"FN006", type:"proposal",   read:false, time:"6 hrs ago",  title:"Proposal Accepted 🎉",          desc:"LogiTrack Pvt Ltd has accepted your proposal PRO-005 worth ₹2,40,000. Time to create the contract!",                    action:"Create Contract", link:"/freelancer/contracts"  },
  { id:"FN007", type:"ranking",    read:true,  time:"Yesterday",  title:"Profile Ranking Improved 📈",   desc:"Your profile moved to #3 in 'React Developer Mumbai' search results. Keep your profile updated for better visibility.",  action:"View Profile",    link:"/profile/1"             },
  { id:"FN008", type:"milestone",  read:true,  time:"Yesterday",  title:"Milestone Due in 3 Days ⏰",    desc:"M2 'Core Backend Build' for ShopEasy Retail is due on Apr 15, 2026. Raise invoice after completion.",                    action:"View Contract",   link:"/freelancer/contracts"  },
  { id:"FN009", type:"invite",     read:true,  time:"Yesterday",  title:"Project Invite Received",       desc:"MediCare Plus has personally invited you to bid on their 'Hospital Patient Portal' project. Budget: ₹3,50,000.",         action:"View Invite",     link:"/hire-talent/dashboard" },
  { id:"FN010", type:"proposal",   read:true,  time:"2 days ago", title:"Proposal Viewed",               desc:"FinSmart Solutions viewed your proposal PRO-006 for Investment Portfolio Tracker. They spent 4 minutes reading it.",     action:null,              link:null                     },
  { id:"FN011", type:"withdrawal", read:true,  time:"3 days ago", title:"Payout Completed",              desc:"₹95,000 has been successfully transferred to HDFC Bank ••••4821. Expected arrival: Mar 4, 2026.",                      action:"View Earnings",   link:"/freelancer/earnings"   },
  { id:"FN012", type:"profile",    read:true,  time:"3 days ago", title:"Profile Activity",              desc:"Your profile was viewed 18 times this week — up 42% from last week. 3 clients saved your profile.",                     action:"View Profile",    link:"/profile/1"             },
  { id:"FN013", type:"proposal",   read:true,  time:"4 days ago", title:"Proposal Rejected",             desc:"EduLearn Platform has rejected your proposal PRO-004. Consider updating your approach and resending.",                   action:"View Proposals",  link:"/freelancer/proposals"  },
  { id:"FN014", type:"hold",       read:true,  time:"5 days ago", title:"Contract On Hold ⚠️",           desc:"HealthFirst Clinic (Sneha Kapoor) has put CON-2026-004 on hold pending legal clearance. Your timeline will be adjusted.", action:"View Contract",  link:"/freelancer/contracts"  },
  { id:"FN015", type:"security",   read:true,  time:"5 days ago", title:"New Login Detected 🔐",         desc:"New login from Chrome on Windows, Mumbai, India on Mar 8, 2026. Not you? Secure your account.",                         action:"Check Security",  link:"/freelancer/settings"   },
  { id:"FN016", type:"platform",   read:true,  time:"1 week ago", title:"Weblance Update",               desc:"Weblance has launched new proposal templates. Use AI-powered templates to improve your proposal acceptance rate.",        action:"Try Templates",   link:"/freelancer/proposals"  },
  { id:"FN017", type:"contract",   read:true,  time:"1 week ago", title:"KYC Step 2 Verified ✅",        desc:"Your address verification has been approved. Only bank account verification (Step 3) remains to unlock full withdrawals.", action:"View KYC",       link:"/freelancer/kyc"        },
];

const TABS = [
  { id:"all",       label:"All"       },
  { id:"payments",  label:"Payments"  },
  { id:"contracts", label:"Contracts" },
  { id:"proposals", label:"Proposals" },
  { id:"messages",  label:"Messages"  },
  { id:"platform",  label:"Platform"  },
];

const TAB_MAP = {
  payments:  ["payment","withdrawal"],
  contracts: ["contract","milestone","hold","review"],
  proposals: ["proposal","invite","match"],
  messages:  ["message"],
  platform:  ["profile","ranking","security","platform"],
};

export default function FreelancerNotifications() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [tab,    setTab]    = useState("all");

  const unreadCount = notifs.filter(n => !n.read).length;

  const rows = useMemo(() => {
    if (tab === "all") return notifs;
    return notifs.filter(n => (TAB_MAP[tab] || []).includes(n.type));
  }, [notifs, tab]);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read:true })));
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read:true } : n));
  const dismiss     = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const groups = useMemo(() => {
    const todayTimes = ["5 min ago","1 hr ago","2 hrs ago","3 hrs ago","5 hrs ago","6 hrs ago"];
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
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6EC030; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #2E7D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6EC030 #f1f1f1; }
      `}</style>

      <Navbar unread={unreadCount} />

      <header style={{ background:G.white, borderBottom:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
        <div style={{ maxWidth:800, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"20px 0 0" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Notifications</h1>
                {unreadCount > 0 && (
                  <span style={{
                    background: G.gradNavy,
                    color:G.white, fontSize:12, fontWeight:700,
                    padding:"3px 10px", borderRadius:99,
                    boxShadow:"0 2px 8px rgba(15,26,59,0.24)",
                  }}>{unreadCount} new</span>
                )}
              </div>
              <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Stay on top of proposals, contracts and payments</p>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ fontSize:12, fontWeight:700, color:G.greenDeep, background:G.greenBg,
                  border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 16px",
                  cursor:"pointer", marginBottom:4, fontFamily:FONT,
                  boxShadow:"0 1px 6px rgba(110,192,48,0.12)",
                }}>
                ✓ Mark all read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", gap:0, marginTop:14, borderTop:`1px solid ${G.greenBorder}` }}>
            {TABS.map(t => {
              const cnt    = t.id === "all" ? notifs.length : notifs.filter(n => (TAB_MAP[t.id] || []).includes(n.type)).length;
              const unread = t.id === "all" ? unreadCount   : notifs.filter(n => !n.read && (TAB_MAP[t.id] || []).includes(n.type)).length;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px",
                    fontSize:13, fontWeight:active ? 700 : 500,
                    color:active ? G.navy : G.sub, background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.navy}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {t.label}
                  {unread > 0 && <span style={{ width:7, height:7, borderRadius:"50%", background:G.green }} />}
                  <span style={{
                    fontSize:11, fontWeight:700,
                    background:active ? G.navy : "#f3f4f6",
                    color:active ? G.white : G.muted,
                    padding:"1px 6px", borderRadius:99,
                  }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:800, margin:"0 auto", padding:"24px 28px 64px" }}>
        {rows.length === 0 ? (
          <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, textAlign:"center", padding:"64px 20px", boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
            <p style={{ fontSize:36, marginBottom:12 }}>🔔</p>
            <p style={{ fontSize:14, fontWeight:600, color:G.text }}>All caught up!</p>
            <p style={{ fontSize:13, color:G.muted, marginTop:4 }}>No notifications in this category</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {groups.map(grp => (
              <div key={grp.label}>
                <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:10 }}>
                  <p style={{ fontSize:11, fontWeight:700, color:G.greenDeep, textTransform:"uppercase", letterSpacing:"0.08em" }}>{grp.label}</p>
                  <div style={{ flex:1, height:1, background:G.greenBorder }} />
                  <span style={{ fontSize:11, color:G.muted }}>{grp.items.filter(n => !n.read).length} unread</span>
                </div>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {grp.items.map(n => {
                    const tm       = TYPE_META[n.type] || TYPE_META.platform;
                    const isUrgent = n.type === "milestone" || n.type === "hold";
                    return (
                      <div key={n.id} onClick={() => markRead(n.id)}
                        style={{
                          background:n.read ? G.white : G.greenBg,
                          border:`1px solid ${G.greenBorder}`,
                          borderLeft:`3px solid ${n.read ? G.greenBorder : isUrgent ? "#ef4444" : G.green}`,
                          borderRadius:14, padding:"14px 16px",
                          display:"flex", alignItems:"flex-start", gap:14,
                          cursor:"pointer", transition:"all 0.12s",
                          boxShadow: n.read ? "none" : "0 2px 10px rgba(110,192,48,0.07)",
                        }}
                        onMouseEnter={e => { e.currentTarget.style.boxShadow = "0 4px 16px rgba(110,192,48,0.12)"; e.currentTarget.style.background = G.white; }}
                        onMouseLeave={e => { e.currentTarget.style.boxShadow = n.read ? "none" : "0 2px 10px rgba(110,192,48,0.07)"; e.currentTarget.style.background = n.read ? G.white : G.greenBg; }}>

                        {/* Icon */}
                        <div style={{ width:42, height:42, borderRadius:12,
                          background:tm.bg, border:`1px solid ${tm.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:19, flexShrink:0 }}>{tm.icon}</div>

                        <div style={{ flex:1, minWidth:0 }}>
                          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:4 }}>
                            <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                              <p style={{ fontSize:13, fontWeight:n.read ? 600 : 700, color:G.text }}>{n.title}</p>
                              {!n.read && <span style={{ width:7, height:7, borderRadius:"50%", background:isUrgent ? "#ef4444" : G.green, flexShrink:0 }} />}
                              <span style={{ fontSize:10, fontWeight:600, background:tm.bg, color:tm.color, border:`1px solid ${tm.border}`, padding:"1px 8px", borderRadius:99 }}>{tm.label}</span>
                              {isUrgent && !n.read && <span style={{ fontSize:10, fontWeight:700, background:"#fef2f2", color:"#dc2626", border:"1px solid #fecaca", padding:"1px 8px", borderRadius:99 }}>⚡ Action needed</span>}
                            </div>
                            <p style={{ fontSize:11, color:G.muted, flexShrink:0, marginLeft:10, whiteSpace:"nowrap" }}>{n.time}</p>
                          </div>
                          <p style={{ fontSize:12, color:G.sub, lineHeight:1.65, marginBottom:n.action ? 10 : 0 }}>{n.desc}</p>
                          {n.action && (
                            <a href={n.link || "#"} onClick={e => e.stopPropagation()}
                              style={{
                                fontSize:12, fontWeight:700,
                                color:G.white,
                                background: G.gradNavy,
                                borderRadius:100, padding:"5px 14px",
                                textDecoration:"none", display:"inline-block",
                                boxShadow:"0 2px 8px rgba(15,26,59,0.24)",
                                transition:"opacity 0.12s",
                              }}
                              onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
                              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
                              {n.action} →
                            </a>
                          )}
                        </div>

                        {/* Dismiss */}
                        <button onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                          style={{ width:24, height:24, borderRadius:8,
                            border:`1px solid ${G.greenBorder}`,
                            background:G.greenBg, display:"flex", alignItems:"center", justifyContent:"center",
                            cursor:"pointer", flexShrink:0, color:G.muted, fontSize:12 }}>✕</button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
            <div style={{ textAlign:"center", paddingTop:8 }}>
              <a href="/freelancer/settings" style={{ fontSize:13, color:G.sub, textDecoration:"none", display:"inline-flex", alignItems:"center", gap:6 }}>
                ⚙️ <span style={{ textDecoration:"underline" }}>Manage notification preferences</span>
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
    <nav style={{
      height:56, background:G.white,
      borderBottom:`1px solid ${G.greenBorder}`,
      boxShadow:"0 2px 12px rgba(110,192,48,0.08)",
      display:"flex", alignItems:"center",
      padding:"0 28px", gap:12,
      position:"sticky", top:0, zIndex:40,
      overflow:"hidden",
    }}>
      <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", fontFamily:FONT }}>
       <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 65, width: 130, display: "block" }}
              />
            </div>
      </span>
      <div style={{ width:1, height:20, background:G.greenBorder }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.greenBorder }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Notifications</span>
      {unread > 0 && (
        <span style={{
          background: G.gradNavy,
          color:G.white, fontSize:11, fontWeight:700,
          padding:"2px 8px", borderRadius:99, marginLeft:2,
          boxShadow:"0 2px 6px rgba(15,26,59,0.24)",
        }}>{unread}</span>
      )}
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>💼</span>
        <span style={{ fontSize:11, color:G.greenDeep, fontWeight:700 }}>Freelancer</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{
        width:34, height:34, borderRadius:"50%",
        background: G.gradNavy,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white,
        marginLeft:8, fontFamily:FONT,
        boxShadow:"0 2px 8px rgba(15,26,59,0.28)",
      }}>AJ</div>
    </nav>
  );
}