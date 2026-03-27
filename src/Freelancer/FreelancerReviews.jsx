import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fr-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fr-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#6FDA44",
  greenDark:   "#1A3D1F",
  greenBg:     "#f0fdf4",
  greenBorder: "#E4F0DC",
  greenBorder2:"#E8F5E1",
  navyFrom:    "#0D2855",
  navyTo:      "#1B72C0",
  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
};
const FONT = "'Poppins', sans-serif";

const RECEIVED = [
  { id:"RR-001", client:"Vikram Singh",  company:"ShopEasy Retail", avatar:"VS", avatarColor:"#3b82f6",
    project:"E-Commerce Platform Revamp",           contractId:"CON-2026-001", rating:5, date:"Mar 22, 2026",
    text:"Absolutely outstanding work. Delivered a pixel-perfect, performant React frontend ahead of schedule. The code quality and documentation were exceptional. Will definitely hire again for Phase 2.",
    tags:["Delivered early","Expert React skills","Clean code","Great communication"],
    categories:{ communication:5, quality:5, expertise:5, professionalism:5 },
    reply:"Thank you Vikram! It was a pleasure working on the ShopEasy platform. Looking forward to Phase 2!", replyDate:"Mar 23, 2026", helpful:14 },

  { id:"RR-002", client:"Aditya Bose",   company:"TravelNest",       avatar:"AB", avatarColor:"#f59e0b",
    project:"Travel Booking Platform — Frontend",   contractId:"CON-2026-003", rating:5, date:"Mar 15, 2026",
    text:"One of the best freelancers I've worked with. Deep understanding of React architecture, proactive communication, and always suggests improvements. The hotel search UI was beyond what we expected.",
    tags:["Proactive communication","Above expectations","Architecture expertise"],
    categories:{ communication:5, quality:5, expertise:5, professionalism:4 },
    reply:null, helpful:9 },

  { id:"RR-003", client:"Neha Gupta",    company:"Zestify Foods",    avatar:"NG", avatarColor:"#8b5cf6",
    project:"Food Delivery App — React Native",     contractId:"CON-2025-018", rating:4, date:"Jan 12, 2026",
    text:"Very skilled developer. The app UI is clean and fast. Had a few revision rounds on the cart flow but all resolved quickly. Communication was great throughout.",
    tags:["Clean UI","Responsive","Good communication"],
    categories:{ communication:4, quality:5, expertise:5, professionalism:4 },
    reply:"Thanks Neha! The cart flow revisions helped us nail the UX. Glad you're happy with the final result!", replyDate:"Jan 13, 2026", helpful:6 },

  { id:"RR-004", client:"Rohit Nair",    company:"UrbanRide",        avatar:"RN", avatarColor:"#06b6d4",
    project:"Driver Dashboard UI",                  contractId:"CON-2025-014", rating:3, date:"Nov 5, 2025",
    text:"Decent work overall. The UI was good but there were some delays and the mobile responsiveness needed extra revisions. Communication improved towards the end.",
    tags:["Responsive issues","Communication improved","Decent quality"],
    categories:{ communication:3, quality:3, expertise:4, professionalism:3 },
    reply:null, helpful:2 },

  { id:"RR-005", client:"Priya Sharma",  company:"MediCare Plus",    avatar:"PS", avatarColor:"#ef4444",
    project:"Patient Portal Frontend",              contractId:"CON-2025-011", rating:5, date:"Sep 18, 2025",
    text:"Exceptional freelancer. Arjun built our patient portal with strict HIPAA UI requirements perfectly. He asked all the right questions upfront and delivered flawlessly. Highly recommended.",
    tags:["Domain expertise","Delivered on time","HIPAA compliant UI","Highly professional"],
    categories:{ communication:5, quality:5, expertise:5, professionalism:5 },
    reply:"Thank you Priya! Healthcare UI projects are close to my heart. Hope the portal serves your patients well.", replyDate:"Sep 19, 2025", helpful:21 },
];

const GIVEN = [
  { id:"RG-001", client:"Vikram Singh", company:"ShopEasy Retail", avatar:"VS", avatarColor:"#3b82f6",
    project:"E-Commerce Platform Revamp",       contractId:"CON-2026-001", rating:5, date:"Mar 22, 2026",
    text:"Excellent client. Clear requirements, prompt feedback, and always responsive. Paid on time and appreciated good work. Would love to work with ShopEasy again.", canEdit:false },
  { id:"RG-002", client:"Neha Gupta",   company:"Zestify Foods",  avatar:"NG", avatarColor:"#8b5cf6",
    project:"Food Delivery App — React Native", contractId:"CON-2025-018", rating:4, date:"Jan 13, 2026",
    text:"Good client overall. Requirements changed slightly mid-project but Neha was understanding and communicated well. Would work together again.", canEdit:false },
];

const PENDING_RECEIVED = [
  { contract:"CON-2026-003", client:"Aditya Bose", project:"Travel Booking Platform", lastReminder:"Mar 20, 2026", daysAgo:3 },
];
const PENDING_GIVEN = [
  { contract:"CON-2026-003", client:"Aditya Bose", project:"Travel Booking Platform", completed:"Mar 15, 2026" },
  { contract:"CON-2025-014", client:"Rohit Nair",  project:"Driver Dashboard UI",     completed:"Nov 8, 2025"  },
];

const Stars = ({ rating, size=14, color="#f59e0b", interactive=false, onRate }) => (
  <span style={{ display:"inline-flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} fill={i <= rating ? color : "#e5e7eb"} viewBox="0 0 20 20"
        style={{ cursor:interactive ? "pointer" : "default" }}
        onClick={() => interactive && onRate && onRate(i)}>
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </span>
);

const btnPrimary = {
  display:"inline-flex", alignItems:"center", gap:8,
  fontSize:13, fontWeight:700, fontFamily:FONT,
  background:`linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)`,
  color:"#ffffff", border:"none", borderRadius:100,
  padding:"10px 20px", cursor:"pointer",
  boxShadow:"0 3px 16px rgba(13,40,85,0.28)",
  transition:"all 0.2s", whiteSpace:"nowrap",
};

const btnGreen = {
  fontSize:12, fontWeight:700, padding:"7px 14px",
  borderRadius:100, cursor:"pointer", fontFamily:FONT,
  background:G.green, color:G.white, border:"none",
  boxShadow:"0 2px 8px rgba(111,218,68,0.22)",
};

const btnOutline = {
  fontSize:12, fontWeight:700, padding:"7px 14px",
  borderRadius:100, cursor:"pointer", fontFamily:FONT,
  background:G.greenBg, color:G.greenDark,
  border:`1px solid ${G.greenBorder}`,
};

export default function FreelancerReviews() {
  const [tab,            setTab]            = useState("received");
  const [filter,         setFilter]         = useState("all");
  const [sort,           setSort]           = useState("newest");
  const [replyOpen,      setReplyOpen]      = useState(null);
  const [replyText,      setReplyText]      = useState("");
  const [reviews,        setReviews]        = useState(RECEIVED);
  const [showWriteModal, setShowWriteModal] = useState(null);

  const stats = useMemo(() => {
    const avg  = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    const dist = [5,4,3,2,1].map(s => ({ star:s, count:reviews.filter(r => r.rating === s).length }));
    const cats = ["communication","quality","expertise","professionalism"].map(c => ({
      name: c.charAt(0).toUpperCase() + c.slice(1),
      avg:  reviews.reduce((s, r) => s + (r.categories[c] || 0), 0) / reviews.length,
    }));
    const replied = reviews.filter(r => r.reply).length;
    return { avg, dist, cats, replied, total:reviews.length, jss:96, repeated:2 };
  }, [reviews]);

  const rows = useMemo(() => {
    let r = tab === "received" ? [...reviews] : [...GIVEN];
    if (tab === "received") {
      if (filter !== "all") r = r.filter(x => x.rating === Number(filter));
      if (sort === "oldest")  r.sort((a, b) => a.date.localeCompare(b.date));
      if (sort === "highest") r.sort((a, b) => b.rating - a.rating);
      if (sort === "lowest")  r.sort((a, b) => a.rating - b.rating);
    }
    return r;
  }, [reviews, tab, filter, sort]);

  const submitReply = (id) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply:replyText, replyDate:"Mar 13, 2026" } : r));
    setReplyOpen(null); setReplyText("");
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Poppins', sans-serif; }
        ::-webkit-scrollbar { width: 8px; }
        ::-webkit-scrollbar-track { background: #f1f1f1; }
        ::-webkit-scrollbar-thumb { background: #6FDA44; border-radius: 8px; }
        ::-webkit-scrollbar-thumb:hover { background: #1A3D1F; }
        * { scrollbar-width: thin; scrollbar-color: #6FDA44 #f1f1f1; }
      `}</style>

      <Navbar />

      <header style={{ background:G.white, borderBottom:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(111,218,68,0.06)" }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>My Reviews</h1>
              {stats.avg >= 4.7 && (
                <span style={{ display:"flex", alignItems:"center", gap:5,
                  background:"linear-gradient(135deg,#fef3c7,#fde68a)", border:"1px solid #f59e0b",
                  borderRadius:99, padding:"4px 12px", fontSize:12, fontWeight:700, color:"#92400e" }}>
                  🏆 Top Rated Freelancer
                </span>
              )}
            </div>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Client feedback and your professional reputation</p>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:18, borderTop:`1px solid ${G.greenBorder}` }}>
            {[
              { label:"Overall Rating", val:stats.avg.toFixed(1)+"★",                                   accent:"#f59e0b", big:true },
              { label:"Total Reviews",  val:stats.total,                                                 accent:G.greenDark        },
              { label:"5★ Reviews",     val:stats.dist[0].count,                                        accent:G.green            },
              { label:"JSS Score",      val:stats.jss+"%",                                               accent:G.navyTo           },
              { label:"Response Rate",  val:Math.round((stats.replied / stats.total) * 100)+"%",         accent:G.greenDark        },
              { label:"Repeat Clients", val:stats.repeated,                                              accent:"#7c3aed"          },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:s.big ? 1.3 : 1, paddingBottom:16,
                borderRight:i < arr.length - 1 ? `1px solid ${G.greenBorder}` : "none",
                paddingLeft:i === 0 ? 0 : 20 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:s.big ? 26 : 20, fontWeight:800, color:s.accent, margin:0, letterSpacing:"-0.4px" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Tabs + filters */}
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:4, borderTop:`1px solid ${G.greenBorder}` }}>
            <div style={{ display:"flex" }}>
              {[["received","Reviews I Received",reviews.length],["given","Reviews I Gave",GIVEN.length]].map(([id, label, cnt]) => {
                const active = tab === id;
                return (
                  <button key={id} onClick={() => { setTab(id); setFilter("all"); }}
                    style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 14px",
                      fontSize:13, fontWeight:active ? 700 : 500,
                      color:active ? G.greenDark : G.sub, background:"none", border:"none",
                      borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent",
                      cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                    {label}
                    <span style={{ fontSize:11, fontWeight:700, background:active ? G.green : "#f3f4f6", color:active ? G.white : G.muted, padding:"1px 7px", borderRadius:99 }}>{cnt}</span>
                  </button>
                );
              })}
            </div>
            {tab === "received" && (
              <div style={{ display:"flex", gap:8, paddingBottom:4 }}>
                <div style={{ display:"flex", gap:0 }}>
                  {[["all","All"],["5","5★"],["4","4★"],["3","3★"],["2","2★"],["1","1★"]].map(([id, label]) => {
                    const active = filter === id;
                    return (
                      <button key={id} onClick={() => setFilter(id)}
                        style={{ padding:"5px 10px", fontSize:12, fontWeight:active ? 700 : 400,
                          color:active ? G.greenDark : G.sub,
                          background:active ? G.greenBg : G.white,
                          border:`1px solid ${active ? G.green : G.greenBorder}`,
                          borderRadius:id === "all" ? "100px 0 0 100px" : id === "1" ? "0 100px 100px 0" : "0",
                          cursor:"pointer", fontFamily:FONT }}>
                        {label}
                      </button>
                    );
                  })}
                </div>
                <select value={sort} onChange={e => setSort(e.target.value)}
                  style={{ fontSize:12, fontWeight:600, border:`1.5px solid ${G.greenBorder}`, borderRadius:100, padding:"5px 12px", outline:"none", color:G.text, background:G.white, cursor:"pointer", fontFamily:FONT }}>
                  <option value="newest">Newest</option>
                  <option value="oldest">Oldest</option>
                  <option value="highest">Highest</option>
                  <option value="lowest">Lowest</option>
                </select>
              </div>
            )}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

          {/* LEFT */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>

            {/* RECEIVED */}
            {tab === "received" && rows.map(rev => (
              <div key={rev.id} style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, overflow:"hidden", transition:"box-shadow 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(111,218,68,0.10)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                <div style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{ width:44, height:44, borderRadius:12,
                        background:rev.avatarColor+"20", border:`1px solid ${rev.avatarColor}30`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:14, fontWeight:700, color:rev.avatarColor }}>{rev.avatar}</div>
                      <div>
                        <p style={{ fontSize:14, fontWeight:700, color:G.text }}>{rev.client}</p>
                        <p style={{ fontSize:12, color:G.sub }}>{rev.company}</p>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <Stars rating={rev.rating} size={15} />
                      <p style={{ fontSize:11, color:G.muted, marginTop:3 }}>{rev.date}</p>
                    </div>
                  </div>

                  <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                    <span style={{ fontSize:11, fontWeight:600, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"3px 10px", borderRadius:99 }}>📋 {rev.project}</span>
                    <span style={{ fontSize:11, color:G.muted, background:"#f3f4f6", padding:"3px 10px", borderRadius:99 }}>{rev.contractId}</span>
                  </div>

                  <p style={{ fontSize:13, color:G.sub, lineHeight:1.75, marginBottom:12 }}>{rev.text}</p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {rev.tags.map(t => (
                      <span key={t} style={{ fontSize:11, fontWeight:500, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"3px 10px", borderRadius:99 }}>{t}</span>
                    ))}
                  </div>

                  {/* Category ratings */}
                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14, padding:"12px 14px", background:G.greenBg, borderRadius:12, border:`1px solid ${G.greenBorder}` }}>
                    {Object.entries(rev.categories).map(([k, v]) => (
                      <div key={k} style={{ textAlign:"center" }}>
                        <p style={{ fontSize:10, color:G.muted, fontWeight:600, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{k}</p>
                        <Stars rating={v} size={11} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:12, color:G.muted }}>👍 {rev.helpful} helpful</span>
                    {!rev.reply && (
                      <button onClick={() => setReplyOpen(replyOpen === rev.id ? null : rev.id)}
                        style={{ ...btnOutline, fontSize:12 }}>
                        {replyOpen === rev.id ? "Cancel" : "Reply"}
                      </button>
                    )}
                  </div>
                </div>

                {replyOpen === rev.id && !rev.reply && (
                  <div style={{ padding:"0 20px 18px", borderTop:`1px solid ${G.greenBorder}`, paddingTop:16 }}>
                    <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                      placeholder="Write a professional reply…" rows={3}
                      style={{ width:"100%", fontSize:13, border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 12px", outline:"none", resize:"none", color:G.text, fontFamily:FONT, boxSizing:"border-box", background:G.greenBg }} />
                    <div style={{ display:"flex", gap:8, marginTop:8 }}>
                      <button onClick={() => { setReplyOpen(null); setReplyText(""); }}
                        style={{ padding:"7px 16px", fontSize:12, fontWeight:600, border:`1px solid ${G.greenBorder}`, background:G.white, color:G.sub, borderRadius:100, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
                      <button onClick={() => submitReply(rev.id)} style={{ ...btnGreen }}>Post Reply</button>
                    </div>
                  </div>
                )}

                {rev.reply && (
                  <div style={{ padding:"14px 20px", borderTop:`1px solid ${G.greenBorder}`, background:G.greenBg }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <div style={{ width:24, height:24, borderRadius:"50%",
                        background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:10, fontWeight:700, color:G.white,
                        boxShadow:"0 1px 6px rgba(13,40,85,0.22)" }}>AJ</div>
                      <p style={{ fontSize:12, fontWeight:700, color:G.greenDark }}>Arjun Joshi (You)</p>
                      <p style={{ fontSize:11, color:G.muted }}>· {rev.replyDate}</p>
                    </div>
                    <p style={{ fontSize:13, color:G.greenDark, lineHeight:1.7 }}>{rev.reply}</p>
                  </div>
                )}
              </div>
            ))}

            {/* GIVEN */}
            {tab === "given" && (
              <>
                {rows.map(rev => (
                  <div key={rev.id} style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", transition:"box-shadow 0.15s" }}
                    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(111,218,68,0.10)"}
                    onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>
                    <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                      <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                        <div style={{ width:44, height:44, borderRadius:12, background:rev.avatarColor+"20", border:`1px solid ${rev.avatarColor}30`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:14, fontWeight:700, color:rev.avatarColor }}>{rev.avatar}</div>
                        <div>
                          <p style={{ fontSize:14, fontWeight:700, color:G.text }}>{rev.client}</p>
                          <p style={{ fontSize:12, color:G.sub }}>{rev.company}</p>
                        </div>
                      </div>
                      <div style={{ textAlign:"right" }}>
                        <Stars rating={rev.rating} size={15} />
                        <p style={{ fontSize:11, color:G.muted, marginTop:3 }}>{rev.date}</p>
                      </div>
                    </div>
                    <div style={{ display:"flex", gap:6, marginBottom:10 }}>
                      <span style={{ fontSize:11, fontWeight:600, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"3px 10px", borderRadius:99 }}>📋 {rev.project}</span>
                    </div>
                    <p style={{ fontSize:13, color:G.sub, lineHeight:1.75 }}>{rev.text}</p>
                  </div>
                ))}

                {PENDING_GIVEN.length > 0 && (
                  <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
                    <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:4 }}>Pending Reviews to Give</p>
                    <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>You haven't reviewed these clients yet</p>
                    {PENDING_GIVEN.map((r, i) => (
                      <div key={i} style={{ border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:"12px 14px", marginBottom:10, display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                        <div>
                          <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{r.client} · {r.project}</p>
                          <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Completed {r.completed}</p>
                        </div>
                        <button onClick={() => setShowWriteModal(r)} style={{ ...btnPrimary, fontSize:12, padding:"7px 16px" }}>
                          ✍️ Write Review
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </>
            )}
          </div>

          {/* RIGHT sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Rating breakdown */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:16 }}>Rating Breakdown</p>
              {stats.dist.map(d => (
                <div key={d.star} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:G.sub, width:14 }}>{d.star}</span>
                  <svg width="12" height="12" fill="#f59e0b" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <div style={{ flex:1, background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden" }}>
                    <div style={{ width:`${stats.total > 0 ? (d.count / stats.total) * 100 : 0}%`, height:"100%",
                      background:d.star >= 4 ? G.green : d.star === 3 ? "#f59e0b" : "#ef4444", borderRadius:99 }} />
                  </div>
                  <span style={{ fontSize:12, color:G.muted, width:14, textAlign:"right" }}>{d.count}</span>
                </div>
              ))}
              <div style={{ borderTop:`1px solid ${G.greenBorder}`, marginTop:14, paddingTop:14 }}>
                <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>By Category</p>
                {stats.cats.map(c => (
                  <div key={c.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:8 }}>
                    <span style={{ fontSize:12, color:G.sub }}>{c.name}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <Stars rating={Math.round(c.avg)} size={11} />
                      <span style={{ fontSize:12, fontWeight:700, color:G.text }}>{c.avg.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* JSS card — navy gradient */}
            <div style={{
              background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`,
              borderRadius:16, padding:"18px 20px", position:"relative", overflow:"hidden",
              boxShadow:"0 4px 20px rgba(13,40,85,0.25)",
            }}>
              <div style={{ position:"absolute", top:-30, right:-30, width:100, height:100, borderRadius:"50%", background:"rgba(111,218,68,0.10)", pointerEvents:"none" }} />
              <div style={{ position:"absolute", bottom:-20, left:-20, width:70, height:70, borderRadius:"50%", background:"rgba(111,218,68,0.06)", pointerEvents:"none" }} />
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:8 }}>Job Success Score</p>
              <p style={{ fontSize:36, fontWeight:800, color:G.green, marginBottom:4, fontFamily:FONT }}>{stats.jss}%</p>
              <div style={{ background:"rgba(255,255,255,0.12)", borderRadius:99, height:6, overflow:"hidden", marginBottom:10 }}>
                <div style={{ width:`${stats.jss}%`, height:"100%", background:`linear-gradient(90deg, ${G.green}, #a3e07a)`, borderRadius:99 }} />
              </div>
              <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", lineHeight:1.6 }}>Based on completed contracts, on-time delivery, client satisfaction and repeat business.</p>
            </div>

            {/* Awaiting reviews */}
            {PENDING_RECEIVED.length > 0 && (
              <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:4 }}>Awaiting Reviews</p>
                <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>Clients who haven't reviewed yet</p>
                {PENDING_RECEIVED.map((r, i) => (
                  <div key={i} style={{ border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:"12px 14px", marginBottom:10 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:2 }}>{r.client}</p>
                    <p style={{ fontSize:11, color:G.muted, marginBottom:2 }}>{r.project}</p>
                    <p style={{ fontSize:11, color:G.muted, marginBottom:10 }}>Last reminder: {r.lastReminder} ({r.daysAgo}d ago)</p>
                    <button style={{ ...btnOutline, width:"100%", justifyContent:"center", fontSize:12, padding:"8px" }}>
                      📤 Send Reminder
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {showWriteModal && <WriteReviewModal client={showWriteModal} onClose={() => setShowWriteModal(null)} />}
    </div>
  );
}

/* ── Write Review Modal ─────────────────────────────────────── */
function WriteReviewModal({ client, onClose }) {
  const [rating,  setRating]  = useState(0);
  const [cats,    setCats]    = useState({ communication:0, quality:0, expertise:0, professionalism:0 });
  const [text,    setText]    = useState("");
  const [selTags, setSelTags] = useState([]);
  const TAGS = ["Clear requirements","Prompt feedback","Paid on time","Good communication","Flexible","Professional","Would hire again","Respectful"];

  const ok = rating > 0 && text.trim().length > 10;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:520, background:G.white, borderRadius:20, overflow:"hidden", boxShadow:"0 32px 80px rgba(13,40,85,0.22)" }}>

        {/* Navy gradient header */}
        <div style={{ background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`, padding:"18px 22px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start" }}>
            <div>
              <p style={{ fontSize:17, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>Review {client.client}</p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:3 }}>{client.project}</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.6)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
        </div>

        <div style={{ padding:"20px 22px", display:"flex", flexDirection:"column", gap:16 }}>
          <div>
            <p style={{ fontSize:12, fontWeight:700, color:G.sub, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>Overall Rating *</p>
            <Stars rating={rating} size={28} interactive onRate={setRating} />
          </div>
          <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
            {Object.keys(cats).map(c => (
              <div key={c}>
                <p style={{ fontSize:11, fontWeight:600, color:G.sub, marginBottom:5, textTransform:"capitalize" }}>{c}</p>
                <Stars rating={cats[c]} size={18} interactive onRate={v => setCats(p => ({ ...p, [c]:v }))} />
              </div>
            ))}
          </div>
          <div>
            <p style={{ fontSize:12, fontWeight:700, color:G.sub, marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Your Review *</p>
            <textarea value={text} onChange={e => setText(e.target.value)}
              placeholder="Share your experience working with this client…" rows={4}
              style={{ width:"100%", fontSize:13, border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"10px 12px", outline:"none", resize:"none", color:G.text, fontFamily:FONT, boxSizing:"border-box" }} />
          </div>
          <div>
            <p style={{ fontSize:12, fontWeight:700, color:G.sub, marginBottom:8, textTransform:"uppercase", letterSpacing:"0.06em" }}>Tags (optional)</p>
            <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
              {TAGS.map(t => {
                const sel = selTags.includes(t);
                return (
                  <button key={t} onClick={() => setSelTags(sel ? selTags.filter(x => x !== t) : [...selTags, t])}
                    style={{ fontSize:11, fontWeight:600, padding:"4px 12px", borderRadius:99,
                      border:`1.5px solid ${sel ? G.green : G.greenBorder}`,
                      background:sel ? G.greenBg : G.white,
                      color:sel ? G.greenDark : G.sub,
                      cursor:"pointer", fontFamily:FONT }}>
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          <div style={{ display:"flex", gap:8, paddingTop:4 }}>
            <button onClick={onClose} style={{ flex:1, padding:"10px", fontSize:13, fontWeight:600, border:`1px solid ${G.greenBorder}`, background:G.white, color:G.sub, borderRadius:100, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
            <button disabled={!ok}
              style={{ flex:1, padding:"10px", fontSize:13, fontWeight:700, border:"none",
                background:ok ? `linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)` : "#e5e7eb",
                color:ok ? G.white : G.muted,
                borderRadius:100, cursor:ok ? "pointer" : "not-allowed", fontFamily:FONT,
                boxShadow:ok ? "0 3px 16px rgba(13,40,85,0.28)" : "none",
              }}>
              Submit Review
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{
      height:56, background:G.white,
      borderBottom:`1px solid ${G.greenBorder}`,
      boxShadow:"0 2px 12px rgba(111,218,68,0.08)",
      display:"flex", alignItems:"center",
      padding:"0 28px", gap:12,
      position:"sticky", top:0, zIndex:40,
      overflow:"hidden"
    }}>
      <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", fontFamily:FONT }}>
          <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 62, width: 130, display: "block" }}
              />
            </div>
      </span>
      <div style={{ width:1, height:20, background:G.greenBorder }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.greenBorder }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Reviews</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <span style={{ fontSize:10 }}>💼</span>
        <span style={{ fontSize:11, color:G.greenDark, fontWeight:700 }}>Freelancer</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:"#ef4444", border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{
        width:34, height:34, borderRadius:"50%",
        background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`,
        display:"flex", alignItems:"center", justifyContent:"center",
        fontSize:12, fontWeight:700, color:G.white,
        marginLeft:8, fontFamily:FONT,
        boxShadow:"0 2px 8px rgba(13,40,85,0.28)",
      }}>AJ</div>
    </nav>
  );
}