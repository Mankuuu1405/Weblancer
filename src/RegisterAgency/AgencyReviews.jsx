






import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Rajdhani:wght@500;600;700&family=Nunito:wght@400;500;600;700;800;900&display=swap";
  document.head.appendChild(l);
})();

/* ── WebLance Brand Tokens ── */
const G = {
  navy:        "#0D2855",
  navyMid:     "#1A2B5E",
  blue:        "#1B72C0",
  green:       "#6FDA44",
  greenDark:   "#3db82b",
  greenBg:     "#f0fdf4",
  greenBorder: "#bbf7d0",
  gradNav:     "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  gradBtn:     "linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)",
  gradBar:     "linear-gradient(90deg, #6FDA44, #1B72C0)",
  text:        "#111827",
  sub:         "#6b7280",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
};

const FONT_BODY    = "'Nunito', sans-serif";
const FONT_HEADING = "'Rajdhani', sans-serif";

const REVIEWS = [
  {
    id:"REV-001", client:"Vikram Singh", company:"ShopEasy Retail", avatar:"VS",
    avatarColor:"#1B72C0", project:"E-Commerce Platform Revamp", contractId:"CON-2026-001",
    rating:5, date:"Mar 22, 2026",
    text:"TechVision Solutions delivered an absolutely outstanding e-commerce platform. The team was highly professional, communicated proactively, and delivered ahead of schedule. The code quality is excellent and well-documented. Highly recommend for any complex web project.",
    tags:["Delivered on time","Excellent code quality","Great communication","Above expectations"],
    categories:{ communication:5, quality:5, timeline:5, value:5 },
    reply:"Thank you Vikram! It was a pleasure working with the ShopEasy team. We're proud of the platform we built together and look forward to Phase 2!",
    replyDate:"Mar 23, 2026", helpful:12,
  },
  {
    id:"REV-002", client:"Neha Gupta", company:"Zestify Foods", avatar:"NG",
    avatarColor:"#8b5cf6", project:"Food Delivery App — Phase 1", contractId:"CON-2026-005",
    rating:5, date:"Mar 8, 2026",
    text:"Incredible team. They understood our vision perfectly and translated it into a beautiful, functional app. The project was delivered on time and the post-launch support was excellent. Will definitely work with them again for Phase 2.",
    tags:["Delivered on time","Responsive support","Clean UI design"],
    categories:{ communication:5, quality:5, timeline:5, value:4 },
    reply:"Thank you Neha! The Zestify app was a fantastic project. We're excited for Phase 2 discussions!",
    replyDate:"Mar 9, 2026", helpful:8,
  },
  {
    id:"REV-003", client:"Aditya Bose", company:"TravelNest", avatar:"AB",
    avatarColor:"#f59e0b", project:"Travel Booking Platform", contractId:"CON-2026-003",
    rating:4, date:"Mar 15, 2026",
    text:"Very good team with strong technical skills. Architecture document was thorough and the initial work is promising. Minor communication gaps in week 2 but resolved quickly. Looking forward to the full project completion.",
    tags:["Strong technical skills","Good architecture","Minor delays"],
    categories:{ communication:4, quality:5, timeline:3, value:4 },
    reply:null, helpful:5,
  },
  {
    id:"REV-004", client:"Priya Sharma", company:"MediCare Plus", avatar:"PS",
    avatarColor:"#ef4444", project:"Hospital Management System", contractId:"CON-2025-018",
    rating:5, date:"Jan 12, 2026",
    text:"We had a complex requirement for a hospital management system with real-time data. TechVision not only built it perfectly but also suggested improvements we hadn't thought of. The system has been running flawlessly for 3 months.",
    tags:["Complex project handled well","Proactive suggestions","Reliable post-launch"],
    categories:{ communication:5, quality:5, timeline:5, value:5 },
    reply:"Thank you Priya! Healthcare projects require special attention to detail and we're glad we could deliver. The MediCare team was wonderful to work with.",
    replyDate:"Jan 13, 2026", helpful:19,
  },
  {
    id:"REV-005", client:"Rohit Nair", company:"UrbanRide", avatar:"RN",
    avatarColor:"#06b6d4", project:"Ride-Booking Mobile App", contractId:"CON-2025-014",
    rating:3, date:"Dec 5, 2025",
    text:"Decent work overall. The app functions as expected but there were some delays in the testing phase. The communication could have been more frequent — we had to chase updates multiple times. End result is okay but the process was frustrating.",
    tags:["Functional delivery","Communication gaps","Testing delays"],
    categories:{ communication:2, quality:4, timeline:3, value:3 },
    reply:null, helpful:2,
  },
  {
    id:"REV-006", client:"Kavita Menon", company:"EduSpark", avatar:"KM",
    avatarColor:"#10b981", project:"LMS Platform Build", contractId:"CON-2025-011",
    rating:4, date:"Nov 18, 2025",
    text:"TechVision built our LMS platform with all the features we needed. The quiz engine and progress tracking are particularly impressive. Slight scope creep issues initially but handled professionally. Overall very satisfied.",
    tags:["Feature-rich delivery","Professional handling","Good value"],
    categories:{ communication:4, quality:5, timeline:4, value:5 },
    reply:"Thank you Kavita! The EduSpark platform was a joy to build. The scope discussions helped us deliver exactly what you needed.",
    replyDate:"Nov 19, 2025", helpful:7,
  },
];

const PENDING_REQUESTS = [
  { contract:"CON-2026-001", client:"ShopEasy Retail",   project:"E-Commerce Platform Revamp",  lastReminder:"Mar 20, 2026", daysAgo:3  },
  { contract:"CON-2025-009", client:"GreenLeaf Organic", project:"Inventory Management System", lastReminder:"Feb 28, 2026", daysAgo:13 },
];

const Stars = ({ rating, size = 14, color = "#f59e0b" }) => (
  <span style={{ display:"inline-flex", gap:2 }}>
    {[1,2,3,4,5].map(i => (
      <svg key={i} width={size} height={size} fill={i <= rating ? color : "#e5e7eb"} viewBox="0 0 20 20">
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
      </svg>
    ))}
  </span>
);

/* ════════════════════════════════════════════════════════════ */
export default function AgencyReviews() {
  const [filter,    setFilter]    = useState("all");
  const [sort,      setSort]      = useState("newest");
  const [replyOpen, setReplyOpen] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [reviews,   setReviews]   = useState(REVIEWS);

  const stats = useMemo(() => {
    const avg  = reviews.reduce((s, r) => s + r.rating, 0) / reviews.length;
    const dist = [5,4,3,2,1].map(s => ({ star:s, count:reviews.filter(r => r.rating === s).length }));
    const cats = ["communication","quality","timeline","value"].map(c => ({
      name: c.charAt(0).toUpperCase() + c.slice(1),
      avg:  reviews.reduce((s, r) => s + (r.categories[c] || 0), 0) / reviews.length,
    }));
    const replied = reviews.filter(r => r.reply).length;
    return { avg, dist, cats, replied, total:reviews.length };
  }, [reviews]);

  const rows = useMemo(() => {
    let r = [...reviews];
    if (filter !== "all") r = r.filter(x => x.rating === Number(filter));
    if (sort === "oldest")  r.sort((a, b) => a.date.localeCompare(b.date));
    if (sort === "highest") r.sort((a, b) => b.rating - a.rating);
    if (sort === "lowest")  r.sort((a, b) => a.rating - b.rating);
    return r;
  }, [reviews, filter, sort]);

  const submitReply = (id) => {
    if (!replyText.trim()) return;
    setReviews(prev => prev.map(r => r.id === id ? { ...r, reply:replyText, replyDate:"Mar 13, 2026" } : r));
    setReplyOpen(null);
    setReplyText("");
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT_BODY }}>
      <Navbar page="Reviews" />

      {/* ── Page header ── */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 28px" }}>
          <div style={{ padding:"22px 0 0" }}>
            <div style={{ display:"flex", alignItems:"center", gap:12 }}>
              <h1 style={{ fontSize:26, fontWeight:700, color:G.navy, margin:0, letterSpacing:"0.02em", fontFamily:FONT_HEADING }}>
                Reviews
              </h1>
              {stats.avg >= 4.5 && (
                <span style={{ display:"flex", alignItems:"center", gap:5, background:"linear-gradient(135deg,#fef3c7,#fde68a)", border:"1px solid #f59e0b", borderRadius:99, padding:"4px 12px", fontSize:12, fontWeight:700, color:"#92400e", fontFamily:FONT_BODY }}>
                  🏆 Top Rated Agency
                </span>
              )}
            </div>
            <p style={{ fontSize:13, color:G.muted, marginTop:3, fontFamily:FONT_BODY }}>Client feedback and agency reputation</p>
          </div>

          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6` }}>
            {[
              { label:"Overall Rating", val:stats.avg.toFixed(1) + "★", color:"#f59e0b", big:true },
              { label:"Total Reviews",  val:stats.total,                 color:G.navy              },
              { label:"5★ Reviews",     val:stats.dist[0].count,         color:G.greenDark         },
              { label:"Replied",        val:stats.replied,               color:G.blue              },
              { label:"Response Rate",  val:Math.round((stats.replied / stats.total) * 100) + "%", color:G.greenDark },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:s.big ? 1.2 : 1, paddingBottom:16, borderRight:i < arr.length - 1 ? `1px solid #f3f4f6` : "none", paddingLeft:i === 0 ? 0 : 22, paddingRight:22 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em", fontFamily:FONT_BODY }}>{s.label}</p>
                <p style={{ fontSize:s.big ? 24 : 20, fontWeight:700, color:s.color, margin:0, letterSpacing:"0.02em", fontFamily:FONT_HEADING }}>{s.val}</p>
              </div>
            ))}
          </div>

          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginTop:0, paddingTop:2, borderTop:`1px solid #f3f4f6` }}>
            <div style={{ display:"flex", gap:0 }}>
              {[["all","All"],["5","5★"],["4","4★"],["3","3★"],["2","2★"],["1","1★"]].map(([id, label]) => {
                const cnt    = id === "all" ? reviews.length : reviews.filter(r => r.rating === Number(id)).length;
                const active = filter === id;
                return (
                  <button key={id} onClick={() => setFilter(id)} style={{
                    display:"flex", alignItems:"center", gap:5,
                    padding:"10px 12px", fontSize:13,
                    fontWeight:active ? 700 : 500,
                    color:active ? G.navy : G.sub,
                    background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT_BODY
                  }}>
                    {label}
                    <span style={{
                      fontSize:11, fontWeight:700,
                      background:active ? G.green : "#f3f4f6",
                      color:active ? G.white : G.muted,
                      padding:"1px 7px", borderRadius:99, transition:"all 0.12s"
                    }}>{cnt}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display:"flex", alignItems:"center", gap:8, paddingBottom:4 }}>
              <span style={{ fontSize:12, color:G.muted, fontFamily:FONT_BODY }}>Sort:</span>
              <select value={sort} onChange={e => setSort(e.target.value)}
                style={{ fontSize:12, fontWeight:600, border:`1.5px solid ${G.border}`, borderRadius:7, padding:"5px 10px", outline:"none", color:G.navy, background:G.white, cursor:"pointer", fontFamily:FONT_BODY }}>
                <option value="newest">Newest</option>
                <option value="oldest">Oldest</option>
                <option value="highest">Highest Rated</option>
                <option value="lowest">Lowest Rated</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ── */}
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 290px", gap:20 }}>

          {/* Reviews list */}
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {rows.map(rev => (
              <div key={rev.id}
                style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden", transition:"box-shadow 0.15s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(13,40,85,0.08)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}>

                <div style={{ padding:"18px 20px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
                    <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                      <div style={{
                        width:44, height:44, borderRadius:12,
                        background:`linear-gradient(135deg, ${rev.avatarColor}22, ${rev.avatarColor}44)`,
                        border:`1.5px solid ${rev.avatarColor}55`,
                        display:"flex", alignItems:"center", justifyContent:"center",
                        fontSize:13, fontWeight:700, color:rev.avatarColor, flexShrink:0,
                        fontFamily:FONT_HEADING, letterSpacing:"0.04em"
                      }}>{rev.avatar}</div>
                      <div>
                        <p style={{ fontSize:15, fontWeight:700, color:G.navy, fontFamily:FONT_HEADING, letterSpacing:"0.02em", margin:0 }}>{rev.client}</p>
                        <p style={{ fontSize:12, color:G.sub, fontFamily:FONT_BODY, margin:0 }}>{rev.company}</p>
                      </div>
                    </div>
                    <div style={{ textAlign:"right" }}>
                      <Stars rating={rev.rating} size={15} />
                      <p style={{ fontSize:11, color:G.muted, marginTop:3, fontFamily:FONT_BODY }}>{rev.date}</p>
                    </div>
                  </div>

                  <div style={{ display:"flex", gap:6, marginBottom:12 }}>
                    <span style={{ fontSize:11, fontWeight:600, background:"#e3f0fc", color:G.blue, border:`1px solid #90caf9`, padding:"3px 10px", borderRadius:99, fontFamily:FONT_BODY }}>📋 {rev.project}</span>
                    <span style={{ fontSize:11, color:G.muted, background:"#f3f4f6", padding:"3px 10px", borderRadius:99, fontFamily:FONT_BODY }}>{rev.contractId}</span>
                  </div>

                  <p style={{ fontSize:13, color:G.sub, lineHeight:1.8, marginBottom:12, fontFamily:FONT_BODY }}>{rev.text}</p>

                  <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:14 }}>
                    {rev.tags.map(t => (
                      <span key={t} style={{ fontSize:11, fontWeight:500, background:"#f3f4f6", color:G.sub, padding:"3px 10px", borderRadius:99, fontFamily:FONT_BODY }}>{t}</span>
                    ))}
                  </div>

                  <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:10, marginBottom:14, padding:"12px 14px", background:"#f8fafc", borderRadius:10, border:`1px solid ${G.border}` }}>
                    {Object.entries(rev.categories).map(([k, v]) => (
                      <div key={k} style={{ textAlign:"center" }}>
                        <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4, fontFamily:FONT_BODY }}>{k}</p>
                        <Stars rating={v} size={11} />
                      </div>
                    ))}
                  </div>

                  <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                    <span style={{ fontSize:12, color:G.muted, fontFamily:FONT_BODY }}>👍 {rev.helpful} found this helpful</span>
                    {!rev.reply && (
                      <button onClick={() => setReplyOpen(replyOpen === rev.id ? null : rev.id)}
                        style={{ fontSize:12, fontWeight:700, color:G.white, background:G.gradBtn, border:"none", borderRadius:8, padding:"7px 16px", cursor:"pointer", fontFamily:FONT_BODY, boxShadow:"0 2px 8px rgba(13,40,85,0.2)" }}>
                        {replyOpen === rev.id ? "Cancel" : "↩ Reply"}
                      </button>
                    )}
                  </div>
                </div>

                {replyOpen === rev.id && !rev.reply && (
                  <div style={{ padding:"14px 20px 18px", borderTop:`1px solid #f3f4f6` }}>
                    <textarea value={replyText} onChange={e => setReplyText(e.target.value)}
                      placeholder="Write your reply to this review…" rows={3}
                      style={{ width:"100%", fontSize:13, border:`1.5px solid #90caf9`, borderRadius:9, padding:"10px 12px", outline:"none", resize:"none", color:G.text, fontFamily:FONT_BODY, boxSizing:"border-box", background:"#e3f0fc" }} />
                    <div style={{ display:"flex", gap:8, marginTop:8 }}>
                      <button onClick={() => { setReplyOpen(null); setReplyText(""); }}
                        style={{ padding:"7px 14px", fontSize:12, fontWeight:600, border:`1px solid ${G.border}`, background:G.white, color:G.sub, borderRadius:8, cursor:"pointer", fontFamily:FONT_BODY }}>
                        Cancel
                      </button>
                      <button onClick={() => submitReply(rev.id)}
                        style={{ padding:"7px 18px", fontSize:12, fontWeight:700, border:"none", background:G.gradBtn, color:G.white, borderRadius:8, cursor:"pointer", fontFamily:FONT_BODY, boxShadow:"0 2px 8px rgba(13,40,85,0.2)" }}>
                        Post Reply
                      </button>
                    </div>
                  </div>
                )}

                {rev.reply && (
                  <div style={{ padding:"14px 20px", borderTop:`1px solid #f3f4f6`, background:"#e3f0fc" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:8 }}>
                      <div style={{ width:26, height:26, borderRadius:8, background:G.gradBtn, display:"flex", alignItems:"center", justifyContent:"center", fontSize:10, fontWeight:700, color:G.white, fontFamily:FONT_HEADING }}>WL</div>
                      <p style={{ fontSize:12, fontWeight:700, color:G.navy, fontFamily:FONT_HEADING, letterSpacing:"0.03em", margin:0 }}>WebLance Agency</p>
                      <p style={{ fontSize:11, color:G.muted, fontFamily:FONT_BODY, margin:0 }}>· {rev.replyDate}</p>
                    </div>
                    <p style={{ fontSize:13, color:G.blue, lineHeight:1.75, fontFamily:FONT_BODY, margin:0 }}>{rev.reply}</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* ── Right sidebar ── */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"18px 20px" }}>
              <p style={{ fontSize:15, fontWeight:700, color:G.navy, marginBottom:16, fontFamily:FONT_HEADING, letterSpacing:"0.03em" }}>Rating Breakdown</p>
              {stats.dist.map(d => (
                <div key={d.star} style={{ display:"flex", alignItems:"center", gap:10, marginBottom:9 }}>
                  <span style={{ fontSize:12, fontWeight:600, color:G.sub, width:14, fontFamily:FONT_BODY }}>{d.star}</span>
                  <svg width="12" height="12" fill="#f59e0b" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                  </svg>
                  <div style={{ flex:1, background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden" }}>
                    <div style={{
                      width:`${stats.total > 0 ? (d.count / stats.total) * 100 : 0}%`,
                      height:"100%",
                      background: d.star >= 4 ? G.gradBar : d.star === 3 ? "#f59e0b" : G.red,
                      borderRadius:99, transition:"width 0.3s"
                    }} />
                  </div>
                  <span style={{ fontSize:12, color:G.muted, width:14, textAlign:"right", fontFamily:FONT_BODY }}>{d.count}</span>
                </div>
              ))}

              <div style={{ borderTop:`1px solid #f3f4f6`, marginTop:14, paddingTop:14 }}>
                <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10, fontFamily:FONT_BODY }}>By Category</p>
                {stats.cats.map(c => (
                  <div key={c.name} style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:9 }}>
                    <span style={{ fontSize:12, color:G.sub, fontFamily:FONT_BODY }}>{c.name}</span>
                    <div style={{ display:"flex", alignItems:"center", gap:6 }}>
                      <Stars rating={Math.round(c.avg)} size={11} />
                      <span style={{ fontSize:12, fontWeight:700, color:G.navy, fontFamily:FONT_HEADING }}>{c.avg.toFixed(1)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:"18px 20px" }}>
              <p style={{ fontSize:15, fontWeight:700, color:G.navy, marginBottom:4, fontFamily:FONT_HEADING, letterSpacing:"0.03em" }}>Review Requests</p>
              <p style={{ fontSize:12, color:G.muted, marginBottom:14, fontFamily:FONT_BODY }}>Completed contracts without a review</p>
              {PENDING_REQUESTS.map((r, i) => (
                <div key={i} style={{ border:`1px solid ${G.border}`, borderRadius:10, padding:"12px 14px", marginBottom:10 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:G.navy, marginBottom:2, fontFamily:FONT_HEADING, letterSpacing:"0.02em" }}>{r.client}</p>
                  <p style={{ fontSize:11, color:G.muted, marginBottom:2, fontFamily:FONT_BODY }}>{r.project}</p>
                  <p style={{ fontSize:11, color:G.muted, marginBottom:10, fontFamily:FONT_BODY }}>Last reminder: {r.lastReminder} ({r.daysAgo}d ago)</p>
                  <button style={{ width:"100%", padding:"8px", fontSize:12, fontWeight:700, background:G.gradBtn, color:G.white, border:"none", borderRadius:8, cursor:"pointer", fontFamily:FONT_BODY, boxShadow:"0 2px 8px rgba(13,40,85,0.18)" }}>
                    📤 Send Reminder
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ════════════ NAVBAR — White, matching UI screenshot ════════════ */
function Navbar({ page }) {
  return (
    <nav style={{
      height: 56,
      /* ── White background (same as screenshot) ── */
      background: G.white,
      borderBottom: `1px solid ${G.border}`,
      display: "flex", alignItems: "center",
      padding: "0 24px", gap: 12,
      position: "sticky", top: 0, zIndex: 40,
      boxShadow: "0 1px 6px rgba(0,0,0,0.06)",
    }}>

      {/* ── Logo ── */}
      <img
        src="/weblance.jpeg"
        alt="WebLance"
        style={{ height: 54, width: 155, display: "block" }}
      />

      {/* Divider */}
      <div style={{ width: 1, height: 22, background: G.border, margin: "0 4px" }} />

      {/* Breadcrumb */}
      <span style={{ fontSize: 12, color: G.muted, fontWeight: 500, fontFamily: FONT_BODY }}>Agency</span>
      <span style={{ fontSize: 12, color: G.muted, fontFamily: FONT_BODY }}>/</span>
      <span style={{ fontSize: 13, color: G.navy, fontWeight: 700, fontFamily: FONT_HEADING, letterSpacing: "0.04em" }}>{page}</span>

      {/* ── Agency Admin only badge — navy outline (matches screenshot) ── */}
      <div style={{
        display: "flex", alignItems: "center", gap: 5,
        background: G.white,
        border: `1.5px solid ${G.navyMid}`,
        borderRadius: 99, padding: "3px 12px", marginLeft: 4,
      }}>
        {/* Lock icon — navy */}
        <svg width="10" height="10" fill={G.navyMid} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
        </svg>
        <span style={{ fontSize: 11, color: G.navyMid, fontWeight: 700, fontFamily: FONT_BODY }}>Agency Admin only</span>
      </div>

      {/* Spacer */}
      <div style={{ flex: 1 }} />

      {/* Bell — amber/yellow like screenshot */}
      <div style={{ position: "relative", cursor: "pointer" }}>
        <div style={{
          width: 36, height: 36, borderRadius: "50%",
          background: "#fffbeb",
          border: "1px solid #fde68a",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <svg width="16" height="16" fill="none" stroke="#f59e0b" strokeWidth="1.8" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
          </svg>
        </div>
        {/* Green dot */}
        <div style={{
          position: "absolute", top: 2, right: 2,
          width: 8, height: 8, borderRadius: "50%",
          background: G.green, border: `2px solid ${G.white}`,
        }} />
      </div>

      {/* Avatar — navy gradient, white text (matches screenshot) */}
      <div style={{
        width: 36, height: 36, borderRadius: "50%",
        background: G.gradNav,
        border: `2px solid ${G.border}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: 12, fontWeight: 700, color: G.white,
        marginLeft: 4, fontFamily: FONT_HEADING, letterSpacing: "0.05em",
        cursor: "pointer",
      }}>
        RK
      </div>
    </nav>
  );
}