import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-notif-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-notif-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

(() => {
  if (document.getElementById("wl-notif-responsive")) return;
  const s = document.createElement("style");
  s.id = "wl-notif-responsive";
  s.textContent = `
    @media (max-width: 640px) {
      .notif-header-row { flex-direction: column; align-items: flex-start !important; gap: 10px; }
      .notif-tabs { overflow-x: auto; -webkit-overflow-scrolling: touch; }
      .notif-tabs::-webkit-scrollbar { height: 2px; }
      .notif-tab-btn { white-space: nowrap; padding: 10px 10px !important; font-size: 12px !important; }
      .notif-page-header { padding: 0 16px !important; }
      .notif-main { padding: 16px 16px 48px !important; }
      .notif-card { padding: 12px 12px !important; }
      .notif-card-body { flex-direction: column; }
      .notif-title-row { flex-direction: column; align-items: flex-start !important; gap: 4px; }
      .notif-time { margin-left: 0 !important; }
      .notif-navbar { padding: 0 12px !important; }
      .notif-navbar-mid { display: none !important; }
      .notif-card-meta { flex-wrap: wrap; gap: 6px !important; }
    }
    @media (max-width: 400px) {
      .notif-badge-label { display: none; }
    }
  `;
  document.head.appendChild(s);
})();

const G = {
  navy:        "#0D2855",
  blue:        "#1B72C0",
  grad:        "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  red:         "#ef4444",
};

const FONT = "'Plus Jakarta Sans', sans-serif";

const TYPE_META = {
  payment:    { icon:"💰", color:"#1e40af", bg:G.blueBg,   border:G.blueBorder,  label:"Payment"   },
  contract:   { icon:"📋", color:"#2563eb", bg:"#eff6ff",  border:"#bfdbfe",     label:"Contract"  },
  proposal:   { icon:"📨", color:"#7c3aed", bg:"#f5f3ff",  border:"#ddd6fe",     label:"Proposal"  },
  milestone:  { icon:"⏰", color:"#d97706", bg:"#fef3c7",  border:"#fde68a",     label:"Milestone" },
  team:       { icon:"👤", color:"#0891b2", bg:"#ecfeff",  border:"#a5f3fc",     label:"Team"      },
  kyc:        { icon:"🔔", color:G.navy,    bg:G.blueBg,   border:G.blueBorder,  label:"Platform"  },
  warning:    { icon:"⚠️", color:"#dc2626", bg:"#fef2f2",  border:"#fecaca",     label:"Warning"   },
  message:    { icon:"💬", color:"#4f46e5", bg:"#eef2ff",  border:"#c7d2fe",     label:"Message"   },
  review:     { icon:"🌟", color:"#d97706", bg:"#fef3c7",  border:"#fde68a",     label:"Review"    },
  withdrawal: { icon:"📤", color:G.navy,    bg:G.blueBg,   border:G.blueBorder,  label:"Payment"   },
  security:   { icon:"🔒", color:"#dc2626", bg:"#fef2f2",  border:"#fecaca",     label:"Security"  },
};

const ALL_NOTIFS = [
  { id:"N001", type:"payment",    read:false, time:"2 min ago",  title:"Payment Released",          desc:"M1 payment of ₹56,400 released for ShopEasy Retail contract (CON-2026-001).",               action:"View Earnings",   link:"/agency/earnings"    },
  { id:"N002", type:"contract",   read:false, time:"1 hr ago",   title:"Contract Signed",           desc:"TravelNest (Aditya Bose) has signed the contract CON-2026-003. Project can now begin.",      action:"View Contract",   link:"/agency/contracts"   },
  { id:"N003", type:"milestone",  read:false, time:"3 hrs ago",  title:"Milestone Due Soon",        desc:"M2 'Core Backend Build' for ShopEasy Retail is due in 3 days on Apr 15, 2026.",              action:"View Contract",   link:"/agency/contracts"   },
  { id:"N004", type:"proposal",   read:false, time:"5 hrs ago",  title:"Proposal Accepted",         desc:"LogiTrack Pvt Ltd has accepted your proposal PRO-005 worth ₹2,40,000.",                      action:"Create Contract",  link:"/agency/contracts"   },
  { id:"N005", type:"review",     read:false, time:"6 hrs ago",  title:"New 5★ Review Received",   desc:"Vikram Singh (ShopEasy Retail) left you a 5-star review on your completed project.",          action:"View Review",      link:"/agency/reviews"     },
  { id:"N006", type:"team",       read:true,  time:"Yesterday",  title:"Team Member Joined",        desc:"Sara M. has accepted the invitation and joined TechVision Solutions as Frontend Developer.",  action:"View Team",        link:"/agency/team"        },
  { id:"N007", type:"kyc",        read:true,  time:"Yesterday",  title:"KYC Step 4 Under Review",  desc:"Your business address proof documents are now under review. Expected clearance in 2 days.",   action:"View KYC",         link:"/agency/kyc"         },
  { id:"N008", type:"warning",    read:true,  time:"2 days ago", title:"Contract Put On Hold",     desc:"HealthFirst Clinic (Sneha Kapoor) has put project CON-2026-004 on hold pending legal review.", action:"View Contract",   link:"/agency/contracts"   },
  { id:"N009", type:"message",    read:true,  time:"2 days ago", title:"New Message from Client",  desc:"Vikram Singh sent a message: 'Hey, can we sync tomorrow?'",                                   action:"Open Channel",     link:"/agency/channel2/1"  },
  { id:"N010", type:"proposal",   read:true,  time:"3 days ago", title:"Proposal Viewed",          desc:"FinSmart Solutions viewed your proposal PRO-006 for Investment Portfolio Tracker.",            action:null,              link:null                   },
  { id:"N011", type:"withdrawal", read:true,  time:"3 days ago", title:"Payout Completed",         desc:"₹1,35,760 has been successfully transferred to HDFC Bank ••••4821. Arrives Mar 4.",           action:"View Earnings",   link:"/agency/earnings"    },
  { id:"N012", type:"proposal",   read:true,  time:"4 days ago", title:"Proposal Rejected",        desc:"EduLearn Platform has rejected your proposal PRO-004. Consider revising and resending.",       action:"View Proposals",  link:"/agency/proposals"   },
  { id:"N013", type:"security",   read:true,  time:"5 days ago", title:"New Login Detected",       desc:"New login from Chrome on Windows, Mumbai, India on Mar 8, 2026.",                              action:"Review Sessions",  link:"/agency/settings"    },
  { id:"N014", type:"payment",    read:true,  time:"6 days ago", title:"Invoice Paid",             desc:"TravelNest paid the advance invoice of ₹1,04,000 for CON-2026-003.",                          action:"View Earnings",   link:"/agency/earnings"    },
  { id:"N015", type:"kyc",        read:true,  time:"1 week ago", title:"KYC Step 3 Verified",      desc:"Bank account verification completed successfully. Withdrawals are now unlocked.",              action:"View KYC",         link:"/agency/kyc"         },
];

const TABS = [
  { id:"all",      label:"All"       },
  { id:"payment",  label:"Payments"  },
  { id:"contract", label:"Contracts" },
  { id:"proposal", label:"Proposals" },
  { id:"team",     label:"Team"      },
  { id:"security", label:"Security"  },
];

const TYPE_MAP = {
  payment:  ["payment","withdrawal"],
  contract: ["contract","milestone","warning"],
  proposal: ["proposal"],
  team:     ["team"],
  security: ["security","kyc"],
};

export default function AgencyNotifications() {
  const [notifs, setNotifs] = useState(ALL_NOTIFS);
  const [tab,    setTab]    = useState("all");

  const unreadCount = notifs.filter(n => !n.read).length;

  const rows = useMemo(() => {
    if (tab === "all") return notifs;
    return notifs.filter(n => (TYPE_MAP[tab] || [tab]).includes(n.type));
  }, [notifs, tab]);

  const markAllRead = () => setNotifs(prev => prev.map(n => ({ ...n, read: true })));
  const markRead    = (id) => setNotifs(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  const dismiss     = (id) => setNotifs(prev => prev.filter(n => n.id !== id));

  const groups = useMemo(() => {
    const todayTimes = ["2 min ago","1 hr ago","3 hrs ago","5 hrs ago","6 hrs ago"];
    const today     = rows.filter(n => todayTimes.includes(n.time));
    const yesterday = rows.filter(n => n.time === "Yesterday");
    const older     = rows.filter(n => !today.includes(n) && !yesterday.includes(n));
    return [
      { label:"Today",     items: today     },
      { label:"Yesterday", items: yesterday },
      { label:"Earlier",   items: older     },
    ].filter(g => g.items.length > 0);
  }, [rows]);

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar unread={unreadCount} />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:800, margin:"0 auto" }}>
          <div className="notif-header-row notif-page-header" style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"20px 28px 0" }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                <h1 style={{ fontSize:"clamp(18px,4vw,22px)", fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px" }}>Notifications</h1>
                {unreadCount > 0 && (
                  <span style={{ background:G.blue, color:G.white, fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>
                    {unreadCount} new
                  </span>
                )}
              </div>
              <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Stay on top of your agency activity</p>
            </div>
            {unreadCount > 0 && (
              <button onClick={markAllRead}
                style={{ fontSize:12, fontWeight:700, color:G.navy, background:G.blueBg,
                  border:`1px solid ${G.blueBorder}`, borderRadius:8, padding:"7px 14px",
                  cursor:"pointer", marginBottom:4, fontFamily:FONT, flexShrink:0 }}>
                ✓ Mark all read
              </button>
            )}
          </div>

          {/* Tabs */}
          <div className="notif-tabs notif-page-header" style={{ display:"flex", gap:0, marginTop:14, borderTop:"1px solid #f3f4f6", padding:"0 28px" }}>
            {TABS.map(t => {
              const cnt    = t.id === "all" ? notifs.length : notifs.filter(n => (TYPE_MAP[t.id] || [t.id]).includes(n.type)).length;
              const unread = t.id === "all" ? unreadCount   : notifs.filter(n => !n.read && (TYPE_MAP[t.id] || [t.id]).includes(n.type)).length;
              const active = tab === t.id;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  className="notif-tab-btn"
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px",
                    fontSize:13, fontWeight:active ? 700 : 400,
                    color:active ? G.navy : G.sub,
                    background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.blue}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {t.label}
                  {unread > 0 && <span style={{ width:7, height:7, borderRadius:"50%", background:G.blue }} />}
                  <span style={{ fontSize:11, fontWeight:700,
                    background:active ? G.blue : "#f3f4f6",
                    color:active ? G.white : G.muted,
                    padding:"1px 6px", borderRadius:99 }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="notif-main" style={{ maxWidth:800, margin:"0 auto", padding:"24px 28px 64px" }}>
        {rows.length === 0 ? (
          <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14,
            textAlign:"center", padding:"64px 20px" }}>
            <p style={{ fontSize:36, marginBottom:12 }}>🔔</p>
            <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No notifications</p>
            <p style={{ fontSize:13, color:G.muted, marginTop:4 }}>You're all caught up!</p>
          </div>
        ) : (
          <div style={{ display:"flex", flexDirection:"column", gap:24 }}>
            {groups.map(grp => (
              <div key={grp.label}>
                <p style={{ fontSize:11, fontWeight:700, color:G.muted,
                  textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:10 }}>
                  {grp.label}
                </p>
                <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
                  {grp.items.map(n => {
                    const tm = TYPE_META[n.type] || TYPE_META.kyc;
                    return (
                      <div key={n.id} onClick={() => markRead(n.id)}
                        className="notif-card"
                        style={{ background:n.read ? G.white : G.blueBg,
                          border:`1px solid ${n.read ? G.border : G.blueBorder}`,
                          borderLeft:`3px solid ${n.read ? G.border : G.blue}`,
                          borderRadius:12, padding:"14px 16px",
                          display:"flex", alignItems:"flex-start", gap:14,
                          cursor:"pointer", transition:"all 0.12s" }}
                        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 2px 12px rgba(27,114,192,0.10)"}
                        onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>

                        {/* Icon badge */}
                        <div style={{ width:38, height:38, borderRadius:11,
                          background:tm.bg, border:`1px solid ${tm.border}`,
                          display:"flex", alignItems:"center", justifyContent:"center",
                          fontSize:17, flexShrink:0 }}>
                          {tm.icon}
                        </div>

                        {/* Body */}
                        <div style={{ flex:1, minWidth:0 }}>
                          <div className="notif-title-row" style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:3 }}>
                            <div className="notif-card-meta" style={{ display:"flex", alignItems:"center", gap:8, flexWrap:"wrap" }}>
                              <p style={{ fontSize:13, fontWeight:n.read ? 600 : 700, color:G.text }}>{n.title}</p>
                              {!n.read && <span style={{ width:7, height:7, borderRadius:"50%", background:G.blue, flexShrink:0 }} />}
                              <span className="notif-badge-label" style={{ fontSize:10, fontWeight:700,
                                background:tm.bg, color:tm.color, border:`1px solid ${tm.border}`,
                                padding:"1px 7px", borderRadius:99 }}>{tm.label}</span>
                            </div>
                            <p className="notif-time" style={{ fontSize:11, color:G.muted, flexShrink:0, marginLeft:12 }}>{n.time}</p>
                          </div>
                          <p style={{ fontSize:12, color:G.sub, lineHeight:1.65, marginBottom:n.action ? 10 : 0, wordBreak:"break-word" }}>{n.desc}</p>
                          {n.action && (
                            <a href={n.link || "#"} onClick={e => e.stopPropagation()}
                              style={{ fontSize:12, fontWeight:700, color:G.navy,
                                background:G.blueBg, border:`1px solid ${G.blueBorder}`,
                                borderRadius:7, padding:"4px 12px",
                                textDecoration:"none", display:"inline-block" }}>
                              {n.action} →
                            </a>
                          )}
                        </div>

                        {/* Dismiss */}
                        <button onClick={e => { e.stopPropagation(); dismiss(n.id); }}
                          style={{ width:24, height:24, borderRadius:7,
                            border:`1px solid ${G.border}`, background:G.bg,
                            display:"flex", alignItems:"center", justifyContent:"center",
                            cursor:"pointer", flexShrink:0, color:G.muted, fontSize:12 }}>
                          ✕
                        </button>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}

            <div style={{ textAlign:"center", paddingTop:8 }}>
              <a href="/agency/settings"
                style={{ fontSize:13, color:G.sub, textDecoration:"none",
                  display:"inline-flex", alignItems:"center", gap:6 }}>
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
    <nav className="notif-navbar" style={{ height:56, background:G.white, borderBottom:`1px solid ${G.border}`,
      display:"flex", alignItems:"center", padding:"0 28px", gap:12,
      position:"sticky", top:0, zIndex:1 }}>
      <img src="/weblance.jpeg" alt="Weblance" style={{ height:44, width:"auto" }} />
      <div className="notif-navbar-mid" style={{ display:"flex", alignItems:"center", gap:12 }}>
        <div style={{ width:1, height:20, background:G.border }} />
        <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
        <span style={{ fontSize:12, color:G.border }}>/</span>
        <span style={{ fontSize:12, color:G.navy, fontWeight:600 }}>Notifications</span>
        {unread > 0 && (
          <span style={{ background:G.blue, color:G.white, fontSize:11, fontWeight:700,
            padding:"2px 8px", borderRadius:99 }}>{unread}</span>
        )}
        <div style={{ display:"flex", alignItems:"center", gap:5, background:G.blueBg,
          border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px" }}>
          <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span style={{ fontSize:11, color:G.navy, fontWeight:700 }}>Agency Admin only</span>
        </div>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%",
          background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.grad,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white, marginLeft:8, fontFamily:FONT }}>RK</div>
    </nav>
  );
}