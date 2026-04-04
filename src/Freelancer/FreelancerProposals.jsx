import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-fp-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fp-fonts"; l.rel = "stylesheet";
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

const STAGE_STYLE = {
  draft:        { bg:"#f3f4f6",  text:"#6b7280",   dot:"#9ca3af",  label:"Draft"        },
  sent:         { bg:"#eff6ff",  text:"#1d4ed8",   dot:"#3b82f6",  label:"Sent"         },
  under_review: { bg:"#fef3c7",  text:"#92400e",   dot:"#f59e0b",  label:"Under Review" },
  negotiation:  { bg:"#f5f3ff",  text:"#6d28d9",   dot:"#7c3aed",  label:"Negotiation"  },
  accepted:     { bg:G.greenBg,  text:G.greenDark, dot:G.green,    label:"Accepted"     },
  rejected:     { bg:"#fef2f2",  text:"#dc2626",   dot:"#ef4444",  label:"Rejected"     },
  withdrawn:    { bg:"#f3f4f6",  text:"#6b7280",   dot:"#9ca3af",  label:"Withdrawn"    },
};

const PROPOSALS = [
  {
    id:"PRO-001", title:"E-Commerce Platform Revamp", client:"Vikram Singh", company:"ShopEasy Retail",
    clientBudget:"₹1,20,000 – ₹2,00,000", myBid:160000, timeline:45, stage:"accepted",
    sentDate:"Mar 10, 2026", clientActivity:"Accepted Mar 15, 2026", totalBids:12, avgBid:145000,
    matchScore:95, contractId:"CON-2026-001",
    coverLetter:"I have 4+ years of experience building high-performance React e-commerce platforms. I've previously built ShopNow (50K daily users) and ZapCart with similar tech stacks. I can deliver a fully responsive, SEO-optimized storefront with cart, checkout, and admin dashboard within 45 days.",
    milestones:[{name:"Discovery & Architecture",amount:60000},{name:"Core Development",amount:80000},{name:"Testing & Deployment",amount:20000}],
    negotiation:null,
    clientInfo:{ verified:true, hires:8, rating:4.7, location:"Mumbai", since:"Jan 2024" },
    activity:["Mar 10 — Proposal submitted","Mar 12 — Client viewed proposal","Mar 14 — Shortlisted","Mar 15 — Accepted"],
  },
  {
    id:"PRO-002", title:"Travel Booking Platform Frontend", client:"Aditya Bose", company:"TravelNest",
    clientBudget:"₹80,000 – ₹1,50,000", myBid:120000, timeline:60, stage:"negotiation",
    sentDate:"Mar 8, 2026", clientActivity:"Counter-offer sent Mar 12", totalBids:8, avgBid:105000,
    matchScore:91,
    coverLetter:"Building travel UIs is one of my specializations. I've worked on HotelQuick and FlightZap — both high-traffic booking platforms.",
    milestones:[{name:"Hotel Search UI",amount:50000},{name:"Flight Integration",amount:40000},{name:"Booking Flow",amount:30000}],
    negotiation:{ clientBid:100000, clientTimeline:45, clientMessage:"Love your portfolio! Can you do ₹1L? We have a tight deadline of 45 days.", counterAmount:"", counterMsg:"" },
    clientInfo:{ verified:true, hires:4, rating:4.5, location:"Delhi", since:"Aug 2023" },
    activity:["Mar 8 — Proposal submitted","Mar 10 — Client viewed proposal","Mar 12 — Counter-offer received"],
  },
  {
    id:"PRO-003", title:"React Dashboard for FinTech SaaS", client:"Meera Iyer", company:"FinSmart Solutions",
    clientBudget:"₹1,50,000 – ₹2,50,000", myBid:210000, timeline:50, stage:"under_review",
    sentDate:"Mar 6, 2026", clientActivity:"Client viewed 2 hrs ago", totalBids:15, avgBid:188000,
    matchScore:88,
    coverLetter:"FinTech dashboards require precision, performance and security. I've built complex data visualization dashboards with React, D3.js and Recharts for 3 fintech startups.",
    milestones:[{name:"Design System",amount:50000},{name:"Core Dashboard",amount:100000},{name:"Charts & Analytics",amount:60000}],
    negotiation:null,
    clientInfo:{ verified:true, hires:2, rating:4.2, location:"Bangalore", since:"Mar 2024" },
    activity:["Mar 6 — Proposal submitted","Mar 7 — Client viewed proposal","Mar 11 — Client viewed again"],
  },
  {
    id:"PRO-004", title:"Hospital Management System UI", client:"Sneha Kapoor", company:"HealthFirst Clinic",
    clientBudget:"₹2,00,000 – ₹3,50,000", myBid:280000, timeline:90, stage:"under_review",
    sentDate:"Mar 3, 2026", clientActivity:"Client last active 2 days ago", totalBids:6, avgBid:260000,
    matchScore:82,
    coverLetter:"Healthcare UIs demand accessibility, clarity and HIPAA-aware design. I've built a patient portal for MediCare Plus that handles 5,000 daily users.",
    milestones:[{name:"UX Design",amount:60000},{name:"Patient Module",amount:80000},{name:"Admin & Reports",amount:80000},{name:"Integration & Testing",amount:60000}],
    negotiation:null,
    clientInfo:{ verified:false, hires:1, rating:null, location:"Pune", since:"Feb 2025" },
    activity:["Mar 3 — Proposal submitted","Mar 5 — Client viewed proposal"],
  },
  {
    id:"PRO-005", title:"Logistics Tracking Dashboard", client:"Raj Mehta", company:"LogiTrack Pvt Ltd",
    clientBudget:"₹1,00,000 – ₹1,80,000", myBid:150000, timeline:40, stage:"sent",
    sentDate:"Mar 1, 2026", clientActivity:"Client last active 1 day ago", totalBids:19, avgBid:132000,
    matchScore:79,
    coverLetter:"Real-time tracking UIs are complex — I've built fleet and delivery dashboards with live map integrations using Google Maps and Leaflet.",
    milestones:[{name:"Map Integration",amount:60000},{name:"Dashboard UI",amount:60000},{name:"Reports",amount:30000}],
    negotiation:null,
    clientInfo:{ verified:true, hires:6, rating:4.8, location:"Mumbai", since:"Jun 2022" },
    activity:["Mar 1 — Proposal submitted"],
  },
  {
    id:"PRO-006", title:"Food Delivery App — React Native", client:"Neha Gupta", company:"Zestify Foods",
    clientBudget:"₹80,000 – ₹1,30,000", myBid:110000, timeline:35, stage:"accepted",
    sentDate:"Jan 5, 2026", clientActivity:"Accepted Jan 10, 2026", totalBids:9, avgBid:98000,
    matchScore:93, contractId:"CON-2025-018",
    coverLetter:"React Native food delivery apps are a specialty of mine. I've shipped DelivNow and QuickEats to both App Store and Play Store.",
    milestones:[{name:"UI Design",amount:30000},{name:"App Build",amount:50000},{name:"Testing",amount:30000}],
    negotiation:null,
    clientInfo:{ verified:true, hires:3, rating:4.6, location:"Bangalore", since:"Oct 2023" },
    activity:["Jan 5 — Submitted","Jan 7 — Viewed","Jan 10 — Accepted"],
  },
  {
    id:"PRO-007", title:"LMS Platform — Student Portal", client:"Kavita Menon", company:"EduLearn Platform",
    clientBudget:"₹60,000 – ₹90,000", myBid:85000, timeline:30, stage:"rejected",
    sentDate:"Feb 20, 2026", clientActivity:"Rejected Feb 25, 2026", totalBids:22, avgBid:72000,
    matchScore:71,
    coverLetter:"I have experience building LMS portals with quiz engines and progress tracking.",
    milestones:[{name:"Course UI",amount:40000},{name:"Quiz Engine",amount:30000},{name:"Progress",amount:15000}],
    negotiation:null,
    clientInfo:{ verified:true, hires:5, rating:4.3, location:"Chennai", since:"Apr 2023" },
    activity:["Feb 20 — Submitted","Feb 22 — Viewed","Feb 25 — Rejected","Feb 25 — Feedback: 'Selected a candidate with LMS-specific experience'"],
  },
  {
    id:"PRO-008", title:"Investment Portfolio Tracker", client:"Arjun Kapoor", company:"WealthWise",
    clientBudget:"₹1,20,000 – ₹2,00,000", myBid:165000, timeline:55, stage:"draft",
    sentDate:null, clientActivity:"Not sent yet", totalBids:0, avgBid:0,
    matchScore:85,
    coverLetter:"", milestones:[], negotiation:null,
    clientInfo:{ verified:true, hires:2, rating:4.1, location:"Mumbai", since:"Nov 2024" },
    activity:[],
  },
];

const WIN_RATES = [
  { cat:"React / Frontend", rate:50, sent:8 },
  { cat:"Mobile Apps",      rate:33, sent:6 },
  { cat:"Full Stack",       rate:40, sent:5 },
  { cat:"UI/UX Design",     rate:25, sent:4 },
  { cat:"Data Viz",         rate:60, sent:3 },
];

const fmt = n => "₹" + Number(n).toLocaleString("en-IN");

const btnPrimary = {
  display:"inline-flex", alignItems:"center", gap:8,
  fontSize:13, fontWeight:700, fontFamily:FONT,
  background:`linear-gradient(135deg, #0D2855 0%, #1B72C0 100%)`,
  color:G.white, border:"none", borderRadius:100,
  padding:"10px 20px", cursor:"pointer",
  boxShadow:"0 3px 16px rgba(13,40,85,0.28)",
  transition:"all 0.2s", whiteSpace:"nowrap",
  textDecoration:"none",
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

export default function FreelancerProposals() {
  const [tab,       setTab]       = useState("all");
  const [proposals, setProposals] = useState(PROPOSALS);
  const [detail,    setDetail]    = useState(null);
  const [showNew,   setShowNew]   = useState(false);

  const stats = useMemo(() => ({
    total:       proposals.length,
    accepted:    proposals.filter(p => p.stage === "accepted").length,
    review:      proposals.filter(p => p.stage === "under_review").length,
    negotiation: proposals.filter(p => p.stage === "negotiation").length,
    sent:        proposals.filter(p => p.stage === "sent").length,
    rate:        Math.round((proposals.filter(p => p.stage === "accepted").length / proposals.filter(p => p.stage !== "draft").length) * 100),
  }), [proposals]);

  const TABS = [
    { id:"all",          label:"All"          },
    { id:"draft",        label:"Draft"        },
    { id:"sent",         label:"Sent"         },
    { id:"under_review", label:"Under Review" },
    { id:"negotiation",  label:"Negotiation"  },
    { id:"accepted",     label:"Accepted"     },
    { id:"rejected",     label:"Rejected"     },
  ];

  const rows = useMemo(() => tab === "all" ? proposals : proposals.filter(p => p.stage === tab), [proposals, tab]);

  const acceptNegotiation = (id) => {
    setProposals(prev => prev.map(p => p.id === id ? { ...p, stage:"accepted" } : p));
    setDetail(null);
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
          <div style={{ display:"flex", alignItems:"flex-end", justifyContent:"space-between", padding:"20px 0 0" }}>
            <div>
              <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>My Proposals</h1>
              <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Track and manage all your client proposals</p>
            </div>
            <button onClick={() => setShowNew(true)} style={{ ...btnPrimary, marginBottom:4 }}>
              ✏️ New Proposal
            </button>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:18, borderTop:`1px solid ${G.greenBorder}` }}>
            {[
              { label:"Total Sent",      val:proposals.filter(p => p.stage !== "draft").length, accent:G.text             },
              { label:"Acceptance Rate", val:stats.rate + "%",                                  accent:G.greenDark, big:true },
              { label:"Under Review",    val:stats.review,                                      accent:"#d97706"          },
              { label:"Negotiations",    val:stats.negotiation,                                 accent:"#7c3aed"          },
              { label:"Accepted",        val:stats.accepted,                                    accent:G.green            },
              { label:"This Month",      val:proposals.filter(p => p.sentDate?.includes("Mar 2026")).length, accent:G.sub },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:s.big ? 1.2 : 1, paddingBottom:16,
                borderRight:i < arr.length - 1 ? `1px solid ${G.greenBorder}` : "none",
                paddingLeft:i === 0 ? 0 : 20 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:s.big ? 24 : 20, fontWeight:800, color:s.accent, margin:0 }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Tabs */}
          <div style={{ display:"flex", marginTop:4, borderTop:`1px solid ${G.greenBorder}` }}>
            {TABS.map(t => {
              const cnt    = t.id === "all" ? proposals.length : proposals.filter(p => p.stage === t.id).length;
              const active = tab === t.id;
              const isNeg  = t.id === "negotiation" && stats.negotiation > 0;
              return (
                <button key={t.id} onClick={() => setTab(t.id)}
                  style={{ display:"flex", alignItems:"center", gap:6, padding:"10px 12px",
                    fontSize:13, fontWeight:active ? 700 : 500,
                    color:active ? G.greenDark : G.sub, background:"none", border:"none",
                    borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent",
                    cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {t.label}
                  {isNeg && <span style={{ width:7, height:7, borderRadius:"50%", background:"#7c3aed" }} />}
                  <span style={{ fontSize:11, fontWeight:700,
                    background:active ? G.green : "#f3f4f6",
                    color:active ? G.white : G.muted, padding:"1px 7px", borderRadius:99 }}>{cnt}</span>
                </button>
              );
            })}
          </div>
        </div>
      </header>

      <main style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:20 }}>

          {/* Left */}
          <div style={{ display:"flex", flexDirection:"column", gap:12 }}>

            {/* Under review checklist */}
            {tab === "under_review" && (
              <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"16px 20px", display:"flex", alignItems:"flex-start", gap:16, boxShadow:"0 2px 10px rgba(111,218,68,0.08)" }}>
                <span style={{ fontSize:24 }}>💡</span>
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:700, color:G.greenDark, marginBottom:10 }}>While your proposals are under review…</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:6 }}>
                    {[
                      { ok:true,  text:"Profile completion: 94%"        },
                      { ok:true,  text:"Portfolio: 6 projects"           },
                      { ok:false, text:"Response time: 2.4d (aim < 1d)" },
                      { ok:true,  text:"JSS Score: 96% ✨"              },
                    ].map((c, i) => (
                      <div key={i} style={{ display:"flex", alignItems:"center", gap:7 }}>
                        <span style={{ fontSize:13 }}>{c.ok ? "✅" : "⚠️"}</span>
                        <span style={{ fontSize:12, color:c.ok ? G.greenDark : "#92400e" }}>{c.text}</span>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize:11, color:G.muted, marginTop:8 }}>💡 Follow up after 3 days if no response</p>
                </div>
              </div>
            )}

            {/* Proposal cards */}
            {rows.map(p => (
              <ProposalCard key={p.id} proposal={p}
                onOpen={() => setDetail(p)}
                onAcceptNeg={() => acceptNegotiation(p.id)} />
            ))}

            {rows.length === 0 && (
              <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, textAlign:"center", padding:"56px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
                <p style={{ fontSize:36, marginBottom:8 }}>📨</p>
                <p style={{ fontSize:15, fontWeight:700, color:G.text }}>No proposals here</p>
                <p style={{ fontSize:13, color:G.muted, marginTop:4 }}>Start sending proposals to land projects</p>
                <button onClick={() => setShowNew(true)} style={{ ...btnPrimary, marginTop:14 }}>
                  ✏️ Write a Proposal
                </button>
              </div>
            )}
          </div>

          {/* Right sidebar */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Win rate */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:14 }}>Win Rate by Category</p>
              {WIN_RATES.map(w => (
                <div key={w.cat} style={{ marginBottom:12 }}>
                  <div style={{ display:"flex", justifyContent:"space-between", marginBottom:4 }}>
                    <span style={{ fontSize:12, color:G.sub }}>{w.cat}</span>
                    <span style={{ fontSize:12, fontWeight:700, color:G.greenDark }}>{w.rate}%</span>
                  </div>
                  <div style={{ background:"#f3f4f6", borderRadius:99, height:6, overflow:"hidden" }}>
                    <div style={{ width:`${w.rate}%`, height:"100%", background:G.green, borderRadius:99 }} />
                  </div>
                  <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>{w.sent} sent</p>
                </div>
              ))}
            </div>

            {/* Tips */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:12 }}>💡 Proposal Tips</p>
              {[
                "Mention client's specific requirements",
                "Add 1–2 relevant portfolio samples",
                "Keep cover letter 150–300 words",
                "Propose milestone-based payment",
                "Respond to counter-offers within 24 hrs",
              ].map((tip, i) => (
                <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
                  <span style={{ color:G.green, fontWeight:700, fontSize:13 }}>→</span>
                  <p style={{ fontSize:12, color:G.sub, lineHeight:1.5 }}>{tip}</p>
                </div>
              ))}
            </div>

            {/* Recent activity */}
            <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:16, padding:"18px 20px", boxShadow:"0 2px 10px rgba(111,218,68,0.06)" }}>
              <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:12 }}>Recent Activity</p>
              {[
                { icon:"👁️", text:"FinSmart viewed your proposal", time:"2 hrs ago" },
                { icon:"🔔", text:"Counter-offer from TravelNest", time:"3 hrs ago" },
                { icon:"✅", text:"ShopEasy accepted PRO-001",      time:"Mar 15"   },
                { icon:"📤", text:"PRO-005 sent to LogiTrack",      time:"Mar 1"    },
              ].map((a, i) => (
                <div key={i} style={{ display:"flex", gap:10, marginBottom:10, alignItems:"flex-start" }}>
                  <span style={{ fontSize:14 }}>{a.icon}</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:12, color:G.text, fontWeight:500 }}>{a.text}</p>
                    <p style={{ fontSize:11, color:G.muted }}>{a.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>

      {detail  && <DetailModal proposal={detail} onClose={() => setDetail(null)} onAccept={() => acceptNegotiation(detail.id)} />}
      {showNew && <NewProposalModal onClose={() => setShowNew(false)} />}
    </div>
  );
}

/* ── Proposal Card ──────────────────────────────────────────── */
function ProposalCard({ proposal:p, onOpen, onAcceptNeg }) {
  const [hov, setHov] = useState(false);
  const ss    = STAGE_STYLE[p.stage] || STAGE_STYLE.sent;
  const isNeg = p.stage === "negotiation";

  return (
    <div style={{ background:G.white,
      border:`1.5px solid ${isNeg ? "#a78bfa" : hov ? G.green : G.greenBorder}`,
      borderRadius:16, overflow:"hidden", transition:"all 0.15s",
      boxShadow:hov ? "0 4px 20px rgba(111,218,68,0.12)" : "0 2px 8px rgba(111,218,68,0.04)" }}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}>

      {/* Negotiation banner — navy gradient */}
      {isNeg && (
        <div style={{ background:`linear-gradient(90deg, ${G.navyFrom}, ${G.navyTo})`, padding:"8px 20px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <p style={{ fontSize:12, fontWeight:700, color:G.white }}>🔔 Counter-offer received from {p.client} — Action needed</p>
          <span style={{ fontSize:11, fontWeight:700, color:"rgba(255,255,255,0.85)", background:"rgba(255,255,255,0.12)", padding:"2px 10px", borderRadius:99 }}>Respond within 24 hrs</span>
        </div>
      )}

      <div style={{ padding:"16px 20px" }}>
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
          <div style={{ flex:1 }}>
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:4 }}>
              <p style={{ fontSize:15, fontWeight:700, color:G.text }}>{p.title}</p>
              <span style={{ display:"inline-flex", alignItems:"center", gap:4, fontSize:11, fontWeight:700, background:ss.bg, color:ss.text, padding:"3px 9px", borderRadius:99 }}>
                <span style={{ width:5, height:5, borderRadius:"50%", background:ss.dot }} />
                {ss.label}
              </span>
              <span style={{ fontSize:11, fontWeight:600, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"2px 8px", borderRadius:99 }}>
                🎯 {p.matchScore}% match
              </span>
            </div>
            <p style={{ fontSize:13, color:G.sub }}>{p.client} · {p.company}</p>
          </div>
          {p.sentDate && <p style={{ fontSize:11, color:G.muted, flexShrink:0, marginLeft:12 }}>{p.sentDate}</p>}
        </div>

        {/* Bid info pills */}
        <div style={{ display:"flex", gap:10, marginBottom:12, flexWrap:"wrap" }}>
          <div style={{ background:G.bg, borderRadius:12, padding:"8px 14px", border:`1px solid ${G.greenBorder}` }}>
            <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Client Budget</p>
            <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.clientBudget}</p>
          </div>
          <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:"8px 14px" }}>
            <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Your Bid</p>
            <p style={{ fontSize:14, fontWeight:700, color:G.greenDark }}>{fmt(p.myBid)}</p>
          </div>
          <div style={{ background:G.bg, borderRadius:12, padding:"8px 14px", border:`1px solid ${G.greenBorder}` }}>
            <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Timeline</p>
            <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.timeline} days</p>
          </div>
          {p.totalBids > 0 && (
            <div style={{ background:G.bg, borderRadius:12, padding:"8px 14px", border:`1px solid ${G.greenBorder}` }}>
              <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>Competition</p>
              <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.totalBids} bids · Avg {fmt(p.avgBid)}</p>
            </div>
          )}
        </div>

        <p style={{ fontSize:12, color:G.muted, marginBottom:14 }}>
          {p.stage === "negotiation" ? "🔔" : "👁️"} {p.clientActivity}
        </p>

        {/* Negotiation counter preview */}
        {isNeg && p.negotiation && (
          <div style={{ background:"#f5f3ff", border:"1px solid #ddd6fe", borderRadius:12, padding:"12px 14px", marginBottom:14 }}>
            <p style={{ fontSize:12, fontWeight:700, color:"#6d28d9", marginBottom:6 }}>Client's Counter-offer</p>
            <div style={{ display:"flex", gap:12, marginBottom:8 }}>
              <span style={{ fontSize:12, color:G.sub }}>Revised budget: <strong style={{ color:"#6d28d9" }}>{fmt(p.negotiation.clientBid)}</strong></span>
              <span style={{ fontSize:12, color:G.sub }}>Timeline: <strong style={{ color:"#6d28d9" }}>{p.negotiation.clientTimeline} days</strong></span>
            </div>
            <p style={{ fontSize:12, color:G.sub, fontStyle:"italic" }}>"{p.negotiation.clientMessage}"</p>
          </div>
        )}

        {/* Actions */}
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {p.stage === "draft" && (
            <button style={{ ...btnGreen }}>✏️ Edit & Send</button>
          )}
          {p.stage === "sent" && (
            <button style={{ fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:100, cursor:"pointer", fontFamily:FONT, color:"#dc2626", background:"#fef2f2", border:"1px solid #fecaca" }}>Withdraw</button>
          )}
          {p.stage === "under_review" && (
            <button style={{ ...btnOutline }}>📤 Send Follow-up</button>
          )}
          {p.stage === "negotiation" && (
            <>
              <button onClick={onAcceptNeg} style={{ ...btnGreen }}>✅ Accept Offer</button>
              <button onClick={onOpen} style={{ fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:100, cursor:"pointer", fontFamily:FONT, color:"#6d28d9", background:"#f5f3ff", border:"1px solid #ddd6fe" }}>↩ Counter Again</button>
              <button style={{ fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:100, cursor:"pointer", fontFamily:FONT, color:"#dc2626", background:"#fef2f2", border:"1px solid #fecaca" }}>Decline</button>
            </>
          )}
          {p.stage === "accepted" && (
            <a href="/freelancer/contracts" style={{ ...btnGreen, textDecoration:"none" }}>📋 View Contract →</a>
          )}
          {p.stage === "rejected" && (
            <button onClick={onOpen} style={{ fontSize:12, fontWeight:700, padding:"7px 14px", borderRadius:100, cursor:"pointer", fontFamily:FONT, color:G.sub, background:"#f3f4f6", border:"none" }}>View Feedback</button>
          )}
          <button onClick={onOpen} style={{ ...btnOutline }}>View Details</button>
        </div>
      </div>
    </div>
  );
}

/* ── Detail Modal ───────────────────────────────────────────── */
function DetailModal({ proposal:p, onClose, onAccept }) {
  const [tab,    setTab]    = useState("overview");
  const [negAmt, setNegAmt] = useState("");
  const [negMsg, setNegMsg] = useState("");
  const ss = STAGE_STYLE[p.stage] || STAGE_STYLE.sent;

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:700, maxHeight:"90vh", background:G.white, borderRadius:20, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 32px 80px rgba(13,40,85,0.22)" }}>

        {/* Navy gradient header */}
        <div style={{ background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`, padding:"20px 24px 0" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <p style={{ fontSize:18, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>{p.title}</p>
                <span style={{ fontSize:11, fontWeight:700, background:ss.bg, color:ss.text, padding:"3px 10px", borderRadius:99 }}>{ss.label}</span>
              </div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{p.client} · {p.company} · {p.id}</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", cursor:"pointer", color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          {/* Bid strip */}
          <div style={{ display:"flex", gap:16, paddingBottom:14 }}>
            {[["Your Bid",fmt(p.myBid),G.green],["Timeline",p.timeline+" days","rgba(255,255,255,0.75)"],["Client Budget",p.clientBudget,"rgba(255,255,255,0.5)"],["Match",p.matchScore+"%",G.green]].map(([k, v, c]) => (
              <div key={k}>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.3)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:3 }}>{k}</p>
                <p style={{ fontSize:14, fontWeight:700, color:c }}>{v}</p>
              </div>
            ))}
          </div>
          {/* Tabs */}
          <div style={{ display:"flex" }}>
            {["overview","client","activity","messages"].map(t => (
              <button key={t} onClick={() => setTab(t)}
                style={{ padding:"10px 14px", fontSize:13, fontWeight:tab === t ? 700 : 400,
                  color:tab === t ? G.white : "rgba(255,255,255,0.4)",
                  background:"none", border:"none",
                  borderBottom:tab === t ? `2px solid ${G.green}` : "2px solid transparent",
                  cursor:"pointer", textTransform:"capitalize", marginBottom:-1, fontFamily:FONT }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"20px 24px" }}>

          {tab === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div>
                <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8 }}>Cover Letter</p>
                <p style={{ fontSize:13, color:G.sub, lineHeight:1.8 }}>{p.coverLetter || "(Draft — cover letter not written yet)"}</p>
              </div>
              {p.milestones.length > 0 && (
                <div>
                  <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Milestone Breakdown</p>
                  {p.milestones.map((m, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", padding:"10px 14px", background:i % 2 === 0 ? G.bg : G.white, borderRadius:10, marginBottom:4 }}>
                      <span style={{ fontSize:13, color:G.text }}>M{i + 1} — {m.name}</span>
                      <span style={{ fontSize:13, fontWeight:700, color:G.greenDark }}>{fmt(m.amount)}</span>
                    </div>
                  ))}
                  <div style={{ display:"flex", justifyContent:"space-between", padding:"10px 14px", background:G.greenBg, borderRadius:10, border:`1px solid ${G.greenBorder}`, marginTop:4 }}>
                    <span style={{ fontSize:13, fontWeight:700, color:G.text }}>Total</span>
                    <span style={{ fontSize:14, fontWeight:800, color:G.greenDark }}>{fmt(p.milestones.reduce((s, m) => s + m.amount, 0))}</span>
                  </div>
                </div>
              )}
              {/* Negotiation form */}
              {p.stage === "negotiation" && p.negotiation && (
                <div style={{ background:"#f5f3ff", border:"1px solid #ddd6fe", borderRadius:14, padding:"16px" }}>
                  <p style={{ fontSize:13, fontWeight:700, color:"#6d28d9", marginBottom:12 }}>↩ Counter-offer Response</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:12 }}>
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:5 }}>Your Counter Amount (₹)</label>
                      <input value={negAmt} onChange={e => setNegAmt(e.target.value)} placeholder={String(p.myBid)} style={{ width:"100%", fontSize:13, border:"1px solid #ddd6fe", borderRadius:10, padding:"9px 11px", outline:"none", fontFamily:FONT, boxSizing:"border-box" }} />
                    </div>
                    <div>
                      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:5 }}>Your Timeline (days)</label>
                      <input defaultValue={p.timeline} style={{ width:"100%", fontSize:13, border:"1px solid #ddd6fe", borderRadius:10, padding:"9px 11px", outline:"none", fontFamily:FONT, boxSizing:"border-box" }} />
                    </div>
                  </div>
                  <textarea value={negMsg} onChange={e => setNegMsg(e.target.value)} placeholder="Your message to client…" rows={3}
                    style={{ width:"100%", fontSize:13, border:"1px solid #ddd6fe", borderRadius:10, padding:"9px 11px", outline:"none", resize:"none", fontFamily:FONT, boxSizing:"border-box", marginBottom:10 }} />
                  <div style={{ display:"flex", gap:8 }}>
                    <button onClick={onAccept} style={{ flex:1, padding:"9px", fontSize:13, fontWeight:700, background:G.green, color:G.white, border:"none", borderRadius:100, cursor:"pointer", fontFamily:FONT, boxShadow:"0 2px 8px rgba(111,218,68,0.25)" }}>✅ Accept Client's Offer</button>
                    <button style={{ flex:1, padding:"9px", fontSize:13, fontWeight:700, background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`, color:G.white, border:"none", borderRadius:100, cursor:"pointer", fontFamily:FONT, boxShadow:"0 2px 8px rgba(13,40,85,0.22)" }}>↩ Send Counter</button>
                  </div>
                </div>
              )}
            </div>
          )}

          {tab === "client" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ display:"flex", alignItems:"center", gap:14, padding:"16px", border:`1px solid ${G.greenBorder}`, borderRadius:14 }}>
                <div style={{ width:48, height:48, borderRadius:14,
                  background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`,
                  display:"flex", alignItems:"center", justifyContent:"center",
                  fontSize:16, fontWeight:700, color:G.white, flexShrink:0,
                  boxShadow:"0 2px 10px rgba(13,40,85,0.22)" }}>
                  {p.client.split(" ").map(n => n[0]).join("")}
                </div>
                <div>
                  <p style={{ fontSize:15, fontWeight:700, color:G.text }}>{p.client}</p>
                  <p style={{ fontSize:12, color:G.sub }}>{p.company} · {p.clientInfo.location}</p>
                  <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>Member since {p.clientInfo.since}</p>
                </div>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                {[
                  ["Payment Verified", p.clientInfo.verified ? "✅ Yes" : "❌ No"],
                  ["Previous Hires",   p.clientInfo.hires],
                  ["Avg Rating Given", p.clientInfo.rating ? "⭐ " + p.clientInfo.rating : "No reviews yet"],
                  ["Location",         p.clientInfo.location],
                  ["Total Proposals",  p.totalBids + " submitted"],
                  ["Avg Bid",          p.avgBid > 0 ? fmt(p.avgBid) : "—"],
                ].map(([k, v]) => (
                  <div key={k} style={{ padding:"12px 14px", border:`1px solid ${G.greenBorder}`, borderRadius:12 }}>
                    <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:4 }}>{k}</p>
                    <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{v}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "activity" && (
            <div style={{ position:"relative", paddingLeft:20 }}>
              <div style={{ position:"absolute", left:6, top:0, bottom:0, width:2, background:G.greenBorder }} />
              {(p.activity.length > 0 ? p.activity : ["No activity yet"]).map((a, i) => (
                <div key={i} style={{ paddingBottom:18, position:"relative" }}>
                  <div style={{ width:10, height:10, borderRadius:"50%", background:G.green, border:"2px solid #fff", boxShadow:`0 0 0 2px ${G.green}`, position:"absolute", left:-16, top:3 }} />
                  <p style={{ fontSize:13, color:G.text, fontWeight:500 }}>{a}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "messages" && (
            <div style={{ textAlign:"center", padding:"40px 20px" }}>
              <p style={{ fontSize:32, marginBottom:8 }}>💬</p>
              <p style={{ fontSize:14, fontWeight:600, color:G.text }}>Pre-Contract Messages</p>
              <p style={{ fontSize:13, color:G.muted, marginTop:4, marginBottom:16 }}>Message the client before signing a contract</p>
              <textarea placeholder="Type a message to the client…" rows={4}
                style={{ width:"100%", fontSize:13, border:`1.5px solid ${G.greenBorder}`, borderRadius:12, padding:"10px 12px", outline:"none", resize:"none", fontFamily:FONT, boxSizing:"border-box", marginBottom:10 }} />
              <button style={{ ...btnPrimary, width:"100%", justifyContent:"center", borderRadius:100, padding:"11px" }}>Send Message</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

/* ── New Proposal Modal ─────────────────────────────────────── */
function NewProposalModal({ onClose }) {
  const [step,       setStep]       = useState(1);
  const [amount,     setAmount]     = useState("");
  const [timeline,   setTimeline]   = useState("");
  const [letter,     setLetter]     = useState("");
  const [aiLoading,  setAiLoading]  = useState(false);
  const [milestones, setMilestones] = useState([{ name:"", amount:"" }]);
  const STEPS = ["Project","Bid","Cover Letter","Attachments","Review"];

  const simulateAI = () => {
    setAiLoading(true);
    setTimeout(() => {
      setLetter("I have 4+ years of experience building high-performance React applications. Having worked on similar projects like ShopNow and ZapCart, I understand the specific challenges of this domain.\n\nMy approach would be to start with a thorough discovery phase to understand your requirements, followed by iterative development with regular check-ins. I deliver clean, well-documented code with comprehensive testing.\n\nI'm confident I can deliver this project within the proposed timeline, and I'm available for a quick call to discuss further details.");
      setAiLoading(false);
    }, 1800);
  };

  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, background:"rgba(17,24,39,0.45)", backdropFilter:"blur(4px)", display:"flex", alignItems:"center", justifyContent:"center", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", maxWidth:620, maxHeight:"92vh", background:G.white, borderRadius:20, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 32px 80px rgba(13,40,85,0.22)" }}>

        {/* Navy gradient header */}
        <div style={{ background:`linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`, padding:"18px 24px" }}>
          <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:14 }}>
            <p style={{ fontSize:17, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>New Proposal — Step {step} of {STEPS.length}</p>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:8, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", cursor:"pointer", color:"rgba(255,255,255,0.6)", display:"flex", alignItems:"center", justifyContent:"center" }}>✕</button>
          </div>
          <div style={{ display:"flex", gap:4 }}>
            {STEPS.map((s, i) => (
              <div key={i} style={{ flex:1, height:3, borderRadius:99, background:i < step ? G.green : "rgba(255,255,255,0.12)", transition:"background 0.2s" }} />
            ))}
          </div>
          <div style={{ display:"flex", gap:0, marginTop:10 }}>
            {STEPS.map((s, i) => (
              <p key={i} style={{ flex:1, fontSize:10, fontWeight:i + 1 === step ? 700 : 400, color:i + 1 === step ? G.green : "rgba(255,255,255,0.25)", textAlign:"center" }}>{s}</p>
            ))}
          </div>
        </div>

        {/* Body */}
        <div style={{ flex:1, overflowY:"auto", padding:"22px 24px" }}>
          {step === 1 && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:4 }}>Select a Project</p>
              {[
                { title:"Investment Portfolio Tracker", company:"WealthWise",  budget:"₹1,20,000 – ₹2,00,000", bids:7  },
                { title:"HR Management Dashboard",      company:"PeopleFirst", budget:"₹80,000 – ₹1,20,000",   bids:11 },
                { title:"Real Estate Listing Portal",   company:"HomeFinder",  budget:"₹1,50,000 – ₹2,50,000", bids:4  },
              ].map((proj, i) => (
                <div key={i} style={{ border:`1.5px solid ${G.greenBorder}`, borderRadius:14, padding:"14px 16px", cursor:"pointer", transition:"all 0.12s" }}
                  onMouseEnter={e => { e.currentTarget.style.borderColor = G.green; e.currentTarget.style.background = G.greenBg; }}
                  onMouseLeave={e => { e.currentTarget.style.borderColor = G.greenBorder; e.currentTarget.style.background = G.white; }}>
                  <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:3 }}>{proj.title}</p>
                  <p style={{ fontSize:12, color:G.sub, marginBottom:3 }}>{proj.company}</p>
                  <div style={{ display:"flex", gap:10 }}>
                    <span style={{ fontSize:11, color:G.greenDark, fontWeight:600 }}>{proj.budget}</span>
                    <span style={{ fontSize:11, color:G.muted }}>{proj.bids} proposals</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {step === 2 && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text }}>Your Bid Details</p>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Bid Amount (₹)</label>
                  <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="e.g. 150000" style={finp} />
                </div>
                <div>
                  <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em" }}>Delivery Timeline (days)</label>
                  <input value={timeline} onChange={e => setTimeline(e.target.value)} placeholder="e.g. 45" style={finp} />
                </div>
              </div>
              <div>
                <p style={{ fontSize:12, fontWeight:700, color:G.text, marginBottom:10 }}>Milestones (optional)</p>
                {milestones.map((m, i) => (
                  <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 120px 32px", gap:8, marginBottom:8 }}>
                    <input value={m.name} onChange={e => setMilestones(prev => prev.map((x, j) => j === i ? { ...x, name:e.target.value } : x))} placeholder={`Milestone ${i + 1} name`} style={finp} />
                    <input value={m.amount} onChange={e => setMilestones(prev => prev.map((x, j) => j === i ? { ...x, amount:e.target.value } : x))} placeholder="₹ amount" style={finp} />
                    {milestones.length > 1 && <button onClick={() => setMilestones(prev => prev.filter((_, j) => j !== i))} style={{ fontSize:16, background:"#fef2f2", border:"1px solid #fecaca", borderRadius:10, cursor:"pointer", color:"#dc2626" }}>✕</button>}
                  </div>
                ))}
                {milestones.length < 5 && (
                  <button onClick={() => setMilestones(prev => [...prev, { name:"", amount:"" }])} style={{ ...btnOutline, fontSize:12 }}>
                    + Add Milestone
                  </button>
                )}
              </div>
            </div>
          )}

          {step === 3 && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.text }}>Cover Letter</p>
                <button onClick={simulateAI} disabled={aiLoading}
                  style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700,
                    color:G.white,
                    background:aiLoading ? G.muted : `linear-gradient(135deg, ${G.navyFrom} 0%, ${G.navyTo} 100%)`,
                    border:"none", borderRadius:100, padding:"6px 14px", cursor:"pointer", fontFamily:FONT,
                    boxShadow:"0 2px 8px rgba(13,40,85,0.22)" }}>
                  {aiLoading ? "⏳ Generating…" : "✨ AI Assist"}
                </button>
              </div>
              <textarea value={letter} onChange={e => setLetter(e.target.value)}
                placeholder="Write your cover letter here… Mention your relevant experience, approach, and why you're the best fit for this project." rows={10}
                style={{ ...finp, resize:"none", lineHeight:1.75 }} />
              <div style={{ display:"flex", justifyContent:"space-between" }}>
                <span style={{ fontSize:11, color:letter.split(" ").filter(Boolean).length > 300 ? "#dc2626" : G.muted }}>{letter.split(" ").filter(Boolean).length}/300 words</span>
                <div style={{ display:"flex", gap:6 }}>
                  {["Technical","Design","Long-term"].map(t => (
                    <button key={t} onClick={() => setLetter(`[${t} template] I bring specialized expertise in ${t.toLowerCase()} projects...`)}
                      style={{ fontSize:11, color:G.sub, background:"#f3f4f6", border:"none", borderRadius:100, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>{t}</button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text }}>Attachments</p>
              <p style={{ fontSize:12, color:G.muted }}>Max 5 files · 10MB each</p>
              <div style={{ border:`2px dashed ${G.green}`, borderRadius:14, padding:"28px", textAlign:"center", background:G.greenBg, cursor:"pointer" }}>
                <p style={{ fontSize:24, marginBottom:8 }}>📎</p>
                <p style={{ fontSize:13, fontWeight:600, color:G.greenDark }}>Drop files or click to upload</p>
                <p style={{ fontSize:12, color:G.muted, marginTop:3 }}>Portfolio samples, work examples, resume</p>
              </div>
              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {["ShopNow_case_study.pdf","ZapCart_screenshots.zip"].map((f, i) => (
                  <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", border:`1px solid ${G.greenBorder}`, borderRadius:12 }}>
                    <span style={{ fontSize:18 }}>📄</span>
                    <span style={{ flex:1, fontSize:12, color:G.text }}>{f}</span>
                    <button style={{ fontSize:11, color:"#dc2626", background:"none", border:"none", cursor:"pointer" }}>✕</button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {step === 5 && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <p style={{ fontSize:14, fontWeight:700, color:G.text }}>Review Your Proposal</p>
              <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:"16px" }}>
                <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10, marginBottom:14 }}>
                  {[["Bid Amount",amount ? fmt(Number(amount)) : "—"],["Timeline",timeline ? timeline + " days" : "—"],["Milestones",milestones.filter(m => m.name).length],["Attachments","2 files"]].map(([k, v]) => (
                    <div key={k} style={{ padding:"10px 12px", background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:10 }}>
                      <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:3 }}>{k}</p>
                      <p style={{ fontSize:14, fontWeight:700, color:G.greenDark }}>{v}</p>
                    </div>
                  ))}
                </div>
                <p style={{ fontSize:12, color:G.sub, lineHeight:1.7 }}>{letter.slice(0, 200)}{letter.length > 200 ? "…" : ""}</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div style={{ padding:"14px 24px", borderTop:`1px solid ${G.greenBorder}`, display:"flex", justifyContent:"space-between", alignItems:"center", background:G.bg }}>
          <button onClick={() => step > 1 && setStep(s => s - 1)} disabled={step === 1}
            style={{ fontSize:13, fontWeight:600, padding:"9px 18px", border:`1px solid ${G.greenBorder}`, background:G.white, color:step === 1 ? G.muted : G.text, borderRadius:100, cursor:step === 1 ? "not-allowed" : "pointer", fontFamily:FONT }}>← Back</button>
          <div style={{ display:"flex", gap:8 }}>
            <button style={{ fontSize:13, fontWeight:600, padding:"9px 18px", border:`1px solid ${G.greenBorder}`, background:G.white, color:G.sub, borderRadius:100, cursor:"pointer", fontFamily:FONT }}>Save Draft</button>
            {step < STEPS.length
              ? <button onClick={() => setStep(s => s + 1)} style={{ ...btnPrimary }}>Next →</button>
              : <button style={{ ...btnPrimary }}>📤 Send Proposal</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}

const finp = { width:"100%", fontSize:13, border:`1.5px solid ${G.greenBorder}`, borderRadius:10, padding:"9px 11px", outline:"none", color:G.text, fontFamily:FONT, boxSizing:"border-box" };

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
                style={{ height: 65, width: 130, display: "block" }}
              />
            </div>
      </span>
      <div style={{ width:1, height:20, background:G.greenBorder }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Freelancer</span>
      <span style={{ fontSize:12, color:G.greenBorder }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Proposals</span>
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