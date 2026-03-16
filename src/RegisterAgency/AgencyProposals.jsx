import { useState, useMemo } from "react";

(() => {
  if (document.getElementById("wl-pr-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-pr-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

/* ── Tokens ── */
const G = {
  green:      "#22c55e",
  greenDark:  "#16a34a",
  greenDeep:  "#15803d",
  greenBg:    "#f0fdf4",
  greenBorder:"#bbf7d0",
  text:       "#111827",
  sub:        "#6b7280",
  muted:      "#9ca3af",
  border:     "#e5e7eb",
  bg:         "#f9fafb",
  white:      "#ffffff",
  red:        "#ef4444",
  redBg:      "#fef2f2",
  redBorder:  "#fecaca",
  yellow:     "#f59e0b",
  yellowBg:   "#fffbeb",
  yellowBorder:"#fde68a",
};

const FONT = "'Plus Jakarta Sans', sans-serif";
const fmt  = (n, cur, type) => `${cur}${Number(n).toLocaleString("en-IN")}${type === "Hourly" ? "/hr" : ""}`;

/* ── Stage colours ── */
const S_COLOR = {
  draft:        { pill:"#f3f4f6", text:"#6b7280",  dot:"#9ca3af"  },
  sent:         { pill:"#eff6ff", text:"#2563eb",  dot:"#3b82f6"  },
  under_review: { pill:"#fffbeb", text:"#92400e",  dot:"#f59e0b"  },
  negotiation:  { pill:"#fff7ed", text:"#c2410c",  dot:"#f97316"  },
  accepted:     { pill:G.greenBg, text:G.greenDark,dot:G.green    },
  rejected:     { pill:"#fef2f2", text:"#dc2626",  dot:"#ef4444"  },
};

const STAGES   = ["all","draft","sent","under_review","negotiation","accepted","rejected"];
const S_LABEL  = { all:"All", draft:"Draft", sent:"Sent", under_review:"Under Review", negotiation:"Negotiation", accepted:"Accepted", rejected:"Rejected" };
const SERVICES = ["Web Development","Mobile App","UI/UX Design","Branding","DevOps","AI/ML","Other"];
const SOURCES  = ["Platform","Referral","Direct","LinkedIn","Cold Outreach"];

const PROPOSALS = [
  {
    id:"PRO-001", client:"Aryan Mehta", company:"FoodRush Technologies", email:"aryan@foodrush.in", source:"Platform",
    title:"Restaurant Management Dashboard", service:"Web Development",
    scope:"Full-stack restaurant management system with order tracking, inventory, staff management, and analytics dashboard.",
    timeline:"8 weeks", pricingType:"Fixed", amount:185000, currency:"₹",
    milestones:[{name:"UI Design & Wireframes",amount:35000},{name:"Backend API Development",amount:80000},{name:"Frontend Integration",amount:50000},{name:"Testing & Deployment",amount:20000}],
    paymentTerms:"30% advance, 40% on milestone 2, 30% on delivery",
    conditions:"All source code to be delivered. 3 months post-launch support included.",
    validUntil:"Mar 30, 2026", notes:"Client seems serious. Budget is flexible. Push for ₹2L if possible.",
    doc:"FoodRush_Proposal_v2.pdf", stage:"negotiation", created:"Mar 3, 2026", daysAgo:8,
    history:[{e:"Created",d:"Mar 3",by:"Raj Kumar"},{e:"Sent to client",d:"Mar 5",by:"Raj Kumar"},{e:"Viewed",d:"Mar 6",by:"Aryan Mehta"},{e:"Counter offer received",d:"Mar 9",by:"Aryan Mehta"}],
    feedback:"Budget is a bit high. Can we do ₹1,60,000 with same scope?",
    negotiations:[{round:1,ask:185000,offer:160000,note:"Client wants 15% cut.",date:"Mar 9"},{round:2,ask:175000,offer:165000,note:"We reduced ₹10K.",date:"Mar 11"}],
  },
  {
    id:"PRO-002", client:"Sneha Kapoor", company:"HealthFirst Clinic", email:"sneha@healthfirst.in", source:"Referral",
    title:"Patient Appointment Mobile App", service:"Mobile App",
    scope:"Cross-platform mobile app for appointment booking, doctor profiles, and telemedicine video calls.",
    timeline:"12 weeks", pricingType:"Fixed", amount:320000, currency:"₹",
    milestones:[], paymentTerms:"50% advance, 50% on delivery", conditions:"HIPAA-compliant data handling required.",
    validUntil:"Apr 5, 2026", notes:"Healthcare client. Compliance mandatory. Don't reduce below ₹2.8L.",
    doc:null, stage:"sent", created:"Mar 8, 2026", daysAgo:3,
    history:[{e:"Created",d:"Mar 8",by:"Raj Kumar"},{e:"Sent to client",d:"Mar 10",by:"Raj Kumar"}],
    feedback:null, negotiations:[],
  },
  {
    id:"PRO-003", client:"Vikram Singh", company:"ShopEasy Retail", email:"vikram@shopeasy.com", source:"LinkedIn",
    title:"E-Commerce Platform Revamp", service:"Web Development",
    scope:"Complete redesign of e-commerce platform with new UI, faster checkout, and mobile optimization.",
    timeline:"16 weeks", pricingType:"Hourly", amount:2800, currency:"₹",
    milestones:[], paymentTerms:"Weekly billing, net 7 days", conditions:"Client has existing React codebase.",
    validUntil:"Mar 25, 2026", notes:"Long-term potential. They have 3 more sub-brands.",
    doc:"ShopEasy_Proposal.pdf", stage:"accepted", created:"Feb 25, 2026", daysAgo:13,
    history:[{e:"Created",d:"Feb 25",by:"Sara M."},{e:"Sent",d:"Feb 28",by:"Sara M."},{e:"Viewed",d:"Mar 1",by:"Vikram Singh"},{e:"Accepted",d:"Mar 3",by:"Vikram Singh"}],
    feedback:"Looks great! Ready to proceed. Please send the contract.", negotiations:[],
  },
  {
    id:"PRO-004", client:"Priya Nair", company:"EduLearn Platform", email:"priya@edulearn.io", source:"Direct",
    title:"LMS with AI Quiz Generator", service:"Web Development",
    scope:"Learning management system with course builder, student progress tracking, and AI quiz generation.",
    timeline:"20 weeks", pricingType:"Fixed", amount:450000, currency:"₹",
    milestones:[], paymentTerms:"25% advance, milestone-based", conditions:"AI features via OpenAI API.",
    validUntil:"Mar 20, 2026", notes:"Complex project. Confirm team capacity before accepting.",
    doc:null, stage:"rejected", created:"Feb 28, 2026", daysAgo:12,
    history:[{e:"Created",d:"Feb 28",by:"Raj Kumar"},{e:"Sent",d:"Mar 1",by:"Raj Kumar"},{e:"Rejected",d:"Mar 5",by:"Priya Nair"}],
    feedback:"We decided to go with an in-house team. Thank you.", negotiations:[],
  },
  {
    id:"PRO-005", client:"Rohit Sharma", company:"LogiTrack Pvt Ltd", email:"rohit@logitrack.in", source:"Platform",
    title:"Fleet Management Dashboard", service:"Web Development",
    scope:"Real-time fleet tracking with GPS integration, driver management, and delivery reports.",
    timeline:"10 weeks", pricingType:"Fixed", amount:240000, currency:"₹",
    milestones:[], paymentTerms:"40% advance, 60% on delivery", conditions:"GPS API costs borne by client.",
    validUntil:"Apr 10, 2026", notes:"Good lead. Follow up every 3 days.", doc:null, stage:"draft",
    created:"Mar 13, 2026", daysAgo:0, history:[{e:"Created",d:"Mar 13",by:"Raj Kumar"}], feedback:null, negotiations:[],
  },
  {
    id:"PRO-006", client:"Meera Iyer", company:"FinSmart Solutions", email:"meera@finsmart.in", source:"Referral",
    title:"Investment Portfolio Tracker", service:"Web Development",
    scope:"Web app for tracking investment portfolios, mutual funds, stock alerts, and tax reports with real-time data sync.",
    timeline:"14 weeks", pricingType:"Fixed", amount:290000, currency:"₹",
    milestones:[{name:"UX Research & Design",amount:50000},{name:"Backend & APIs",amount:120000},{name:"Frontend Build",amount:90000},{name:"QA & Launch",amount:30000}],
    paymentTerms:"25% advance, 50% mid-milestone, 25% delivery",
    conditions:"Integration with NSE & BSE data APIs required.", validUntil:"Apr 12, 2026",
    notes:"Finance domain — strict compliance. Ask about data API budget separately.",
    doc:"FinSmart_TechProposal.pdf", stage:"under_review", created:"Mar 7, 2026", daysAgo:6,
    history:[{e:"Created",d:"Mar 7",by:"Sara M."},{e:"Sent to client",d:"Mar 8",by:"Sara M."},{e:"Opened by client",d:"Mar 9",by:"Meera Iyer"},{e:"Moved to Under Review",d:"Mar 10",by:"Meera Iyer"}],
    feedback:"We are evaluating 2 more vendors. Will revert by Mar 18.", negotiations:[],
    reviewDeadline:"Mar 18, 2026", reviewNote:"Competing with 2 other agencies.",
  },
  {
    id:"PRO-007", client:"Aditya Bose", company:"TravelNest", email:"aditya@travelnest.in", source:"LinkedIn",
    title:"Travel Booking Platform", service:"Web Development",
    scope:"Full travel booking platform with hotel listings, flight search, payment gateway, and itinerary management.",
    timeline:"18 weeks", pricingType:"Fixed", amount:520000, currency:"₹",
    milestones:[{name:"Discovery & Architecture",amount:60000},{name:"Core Platform Build",amount:240000},{name:"Payment & Integrations",amount:140000},{name:"Testing & Launch",amount:80000}],
    paymentTerms:"20% advance, 4 milestone payments",
    conditions:"Amadeus or similar GDS integration required. Not included in quote.",
    validUntil:"Apr 20, 2026", notes:"High-value client. Do not discount more than 5%.",
    doc:"TravelNest_Proposal_v1.pdf", stage:"under_review", created:"Mar 5, 2026", daysAgo:8,
    history:[{e:"Created",d:"Mar 5",by:"Raj Kumar"},{e:"Sent",d:"Mar 6",by:"Raj Kumar"},{e:"Call scheduled",d:"Mar 8",by:"Raj Kumar"},{e:"Post-call — moved to review",d:"Mar 10",by:"Aditya Bose"}],
    feedback:"Had a great call. Reviewing internally before decision. Timeline looks tight.",
    negotiations:[], reviewDeadline:"Mar 22, 2026", reviewNote:"Post-discovery call — positive signals.",
  },
];

/* ── Shared primitives ── */
const inp = { width:"100%", fontSize:13, border:`1.5px solid ${G.border}`, borderRadius:8, padding:"9px 12px", outline:"none", color:G.text, boxSizing:"border-box", fontFamily:FONT, background:G.white };
const lbl = { fontSize:12, fontWeight:600, color:G.sub, display:"block", marginBottom:6, fontFamily:FONT };

function Pill({ stage }) {
  const c = S_COLOR[stage] || S_COLOR.draft;
  return (
    <span style={{ background:c.pill, color:c.text, display:"inline-flex", alignItems:"center", gap:5, fontSize:11, fontWeight:600, padding:"3px 9px", borderRadius:99, whiteSpace:"nowrap", fontFamily:FONT }}>
      <span style={{ width:6, height:6, borderRadius:"50%", background:c.dot, flexShrink:0 }}/>
      {S_LABEL[stage] || stage}
    </span>
  );
}

function Lbl({ children, style = {} }) {
  return <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:8, ...style }}>{children}</p>;
}
function Box({ children, style = {} }) {
  return <div style={{ background:G.bg, border:`1px solid #f3f4f6`, borderRadius:12, padding:"14px 16px", ...style }}>{children}</div>;
}
function FI({ label, req, children }) {
  return <div><label style={lbl}>{label}{req && <span style={{ color:G.red, marginLeft:2 }}>*</span>}</label>{children}</div>;
}
function Btn({ children, onClick, disabled, style = {} }) {
  return (
    <button onClick={onClick} disabled={disabled}
      style={{ fontSize:13, fontWeight:500, border:`1px solid ${G.border}`, background:G.white, color:G.text, borderRadius:8, padding:"8px 14px", cursor:disabled ? "not-allowed" : "pointer", fontFamily:FONT, ...style }}>
      {children}
    </button>
  );
}
function Overlay({ children, onClose }) {
  return (
    <div onClick={onClose} style={{ position:"fixed", inset:0, zIndex:50, display:"flex", alignItems:"center", justifyContent:"center", background:"rgba(0,0,0,0.4)", padding:20 }}>
      <div onClick={e => e.stopPropagation()} style={{ width:"100%", display:"contents" }}>{children}</div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   ROOT
════════════════════════════════════════════════════════════ */
export default function AgencyProposals() {
  const [list,    setList]    = useState(PROPOSALS);
  const [stage,   setStage]   = useState("all");
  const [search,  setSearch]  = useState("");
  const [svc,     setSvc]     = useState("");
  const [showNew, setShowNew] = useState(false);
  const [detail,  setDetail]  = useState(null);

  const stats = useMemo(() => {
    const acc  = list.filter(p => p.stage === "accepted").length;
    const pipe = list.filter(p => ["sent","under_review","negotiation"].includes(p.stage)).length;
    const val  = list.filter(p => p.pricingType === "Fixed").reduce((s, p) => s + p.amount, 0);
    const win  = list.length ? Math.round(acc / list.length * 100) : 0;
    return { total:list.length, acc, pipe, win, val };
  }, [list]);

  const rows = useMemo(() => list.filter(p => {
    if (stage !== "all" && p.stage !== stage) return false;
    if (search && ![p.client, p.company, p.title].join(" ").toLowerCase().includes(search.toLowerCase())) return false;
    if (svc && p.service !== svc) return false;
    return true;
  }), [list, stage, search, svc]);

  const underReview = list.filter(p => p.stage === "under_review");

  const addProposal = (d) => { setList(prev => [{ id:`PRO-00${prev.length + 1}`, ...d, daysAgo:0, history:[{e:"Created",d:"Mar 13",by:"Raj Kumar"}], feedback:null, negotiations:[] }, ...prev]); setShowNew(false); };
  const duplicate   = (p) => setList(prev => [{ ...p, id:`PRO-DUP-${Date.now()}`, stage:"draft", title:p.title + " (Copy)" }, ...prev]);
  const archive     = (id) => setList(prev => prev.filter(p => p.id !== id));
  const chStage     = (id, s) => { setList(prev => prev.map(p => p.id === id ? { ...p, stage:s } : p)); setDetail(prev => prev?.id === id ? { ...prev, stage:s } : prev); };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar onNew={() => setShowNew(true)} />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1200, margin:"0 auto", padding:"0 24px" }}>
          <div style={{ padding:"20px 0 0" }}>
            <h1 style={{ fontSize:22, fontWeight:800, color:G.text, margin:0, letterSpacing:"-0.4px" }}>Deal Pipeline</h1>
            <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Track, negotiate and close proposals from one place</p>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6` }}>
            {[
              { label:"Total",          val:stats.total,                              color:G.text        },
              { label:"Accepted",       val:stats.acc,                                color:G.greenDark   },
              { label:"In Pipeline",    val:stats.pipe,                               color:"#2563eb"     },
              { label:"Win Rate",       val:`${stats.win}%`,                          color:G.yellow      },
              { label:"Pipeline Value", val:`₹${(stats.val / 100000).toFixed(1)}L`,  color:G.greenDark   },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:1, paddingBottom:16, borderRight:i < arr.length - 1 ? `1px solid #f3f4f6` : "none", paddingLeft:i === 0 ? 0 : 22, paddingRight:22 }}>
                <p style={{ fontSize:10, color:G.muted, fontWeight:700, marginBottom:5, textTransform:"uppercase", letterSpacing:"0.07em" }}>{s.label}</p>
                <p style={{ fontSize:20, fontWeight:800, color:s.color, margin:0, letterSpacing:"-0.4px" }}>{s.val}</p>
              </div>
            ))}
          </div>

          {/* Stage tabs */}
          <div style={{ display:"flex", gap:0, marginTop:0, borderTop:`1px solid #f3f4f6` }}>
            {STAGES.map(s => {
              const cnt    = s === "all" ? list.length : list.filter(p => p.stage === s).length;
              const active = stage === s;
              return (
                <button key={s} onClick={() => setStage(s)} style={{ display:"flex", alignItems:"center", gap:5, padding:"10px 12px", fontSize:13, fontWeight:active ? 700 : 500, color:active ? G.greenDark : G.sub, background:"none", border:"none", borderBottom:active ? `2px solid ${G.green}` : "2px solid transparent", cursor:"pointer", marginBottom:-1, transition:"all 0.12s", fontFamily:FONT }}>
                  {S_LABEL[s]}
                  <span style={{ fontSize:11, fontWeight:700, background:active ? G.green : "#f3f4f6", color:active ? G.white : G.muted, padding:"1px 7px", borderRadius:99, transition:"all 0.12s" }}>{cnt}</span>
                </button>
              );
            })}
            <div style={{ flex:1 }} />
            <div style={{ display:"flex", gap:8, alignItems:"center", paddingBottom:4 }}>
              <div style={{ position:"relative" }}>
                <svg style={{ position:"absolute", left:9, top:"50%", transform:"translateY(-50%)", color:G.muted }} width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search…" style={{ paddingLeft:28, paddingRight:10, paddingTop:6, paddingBottom:6, fontSize:12, border:`1.5px solid ${G.border}`, borderRadius:7, outline:"none", width:160, color:G.text, background:G.white, fontFamily:FONT }} />
              </div>
              <select value={svc} onChange={e => setSvc(e.target.value)} style={{ fontSize:12, border:`1.5px solid ${G.border}`, borderRadius:7, padding:"6px 10px", color:G.text, background:G.white, outline:"none", fontFamily:FONT }}>
                <option value="">All Services</option>
                {SERVICES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main style={{ maxWidth:1200, margin:"0 auto", padding:"24px 24px 60px" }}>

        {stage === "under_review" && underReview.length > 0 && (
          <UnderReviewPage proposals={underReview} onOpen={setDetail} />
        )}

        {stage !== "under_review" && (
          <>
            <p style={{ fontSize:11, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:16 }}>
              {rows.length} proposal{rows.length !== 1 ? "s" : ""}{stage !== "all" && ` · ${S_LABEL[stage]}`}
            </p>
            {rows.length === 0 ? (
              <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, textAlign:"center", padding:"56px 20px" }}>
                <p style={{ fontSize:32, marginBottom:10 }}>📭</p>
                <p style={{ fontSize:14, fontWeight:600, color:G.text }}>No proposals found</p>
                <p style={{ fontSize:13, color:G.muted, marginTop:4 }}>Adjust filters or create a new proposal</p>
              </div>
            ) : (
              <div style={{ display:"grid", gridTemplateColumns:"repeat(3,1fr)", gap:12 }}>
                {rows.map(p => <Card key={p.id} p={p} onClick={() => setDetail(p)} onDuplicate={() => duplicate(p)} onArchive={() => archive(p.id)} />)}
              </div>
            )}
          </>
        )}
      </main>

      {showNew && <NewModal onClose={() => setShowNew(false)} onSubmit={addProposal} />}
      {detail   && <DetailModal p={detail} onClose={() => setDetail(null)} onStage={chStage} onDuplicate={() => { duplicate(detail); setDetail(null); }} />}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   UNDER REVIEW PAGE
════════════════════════════════════════════════════════════ */
function UnderReviewPage({ proposals, onOpen }) {
  return (
    <div>
      {/* Banner */}
      <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", borderRadius:14, padding:"24px 28px", marginBottom:20, position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-40, top:-40, width:200, height:200, borderRadius:"50%", background:"rgba(34,197,94,0.1)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", right:60, bottom:-60, width:150, height:150, borderRadius:"50%", background:"rgba(34,197,94,0.06)", pointerEvents:"none" }} />
        <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:8 }}>
              <span style={{ fontSize:22 }}>🔍</span>
              <span style={{ fontSize:20, fontWeight:800, color:G.white, fontFamily:FONT }}>Under Review</span>
              <span style={{ background:"rgba(34,197,94,0.2)", color:G.green, fontSize:12, fontWeight:700, padding:"3px 10px", borderRadius:99 }}>{proposals.length} active</span>
            </div>
            <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", maxWidth:460, lineHeight:1.6 }}>
              These proposals are currently being evaluated by the client. Track deadlines, follow up at the right time, and be ready to negotiate.
            </p>
          </div>
          <div style={{ textAlign:"right" }}>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>Total Value at Stake</p>
            <p style={{ fontSize:28, fontWeight:800, color:G.green, fontFamily:FONT }}>₹{proposals.reduce((s, p) => s + p.amount, 0).toLocaleString("en-IN")}</p>
          </div>
        </div>
        <div style={{ display:"flex", gap:12, marginTop:20 }}>
          {[
            { label:"Avg Days in Review", val:Math.round(proposals.reduce((s, p) => s + p.daysAgo, 0) / proposals.length), unit:"days"      },
            { label:"Deadlines This Week", val:proposals.filter(p => p.reviewDeadline).length,                              unit:"proposals" },
            { label:"Positive Signals",   val:proposals.filter(p => p.feedback).length,                                    unit:"responses" },
          ].map((s, i) => (
            <div key={i} style={{ background:"rgba(255,255,255,0.07)", border:"1px solid rgba(255,255,255,0.08)", borderRadius:10, padding:"12px 16px", flex:1 }}>
              <p style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:6 }}>{s.label}</p>
              <p style={{ fontSize:20, fontWeight:800, color:G.white }}>
                {s.val} <span style={{ fontSize:12, fontWeight:400, color:"rgba(255,255,255,0.35)" }}>{s.unit}</span>
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Deadlines strip */}
      <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"16px 20px", marginBottom:20 }}>
        <p style={{ fontSize:11, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:14 }}>📅 Review Deadlines</p>
        <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
          {proposals.filter(p => p.reviewDeadline).map(p => {
            const urgent = p.daysAgo >= 6;
            return (
              <div key={p.id} style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:8, height:8, borderRadius:"50%", background:urgent ? G.red : G.green, flexShrink:0 }} />
                <div style={{ flex:1 }}>
                  <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.title}</p>
                  <p style={{ fontSize:12, color:G.sub }}>{p.company}</p>
                </div>
                <div style={{ textAlign:"right" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:urgent ? G.red : G.greenDark }}>{p.reviewDeadline}</p>
                  <p style={{ fontSize:11, color:G.muted }}>{p.reviewNote}</p>
                </div>
                <div style={{ background:urgent ? G.redBg : G.greenBg, border:`1px solid ${urgent ? G.redBorder : G.greenBorder}`, borderRadius:6, padding:"4px 10px" }}>
                  <span style={{ fontSize:11, fontWeight:700, color:urgent ? "#dc2626" : G.greenDark }}>{urgent ? "⚡ Urgent" : "On Track"}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Cards */}
      <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14, marginBottom:20 }}>
        {proposals.map(p => <UnderReviewCard key={p.id} p={p} onOpen={() => onOpen(p)} />)}
      </div>

      <FollowUpChecklist proposals={proposals} onOpen={onOpen} />
    </div>
  );
}

function UnderReviewCard({ p, onOpen }) {
  const [hov, setHov] = useState(false);
  return (
    <div onClick={onOpen} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:G.white, border:`1.5px solid ${hov ? G.green : G.border}`, borderRadius:12, padding:"20px", cursor:"pointer", transition:"all 0.15s", boxShadow:hov ? "0 8px 28px rgba(34,197,94,0.1)" : "0 1px 4px rgba(0,0,0,0.04)", transform:hov ? "translateY(-2px)" : "none", position:"relative", overflow:"hidden" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:3, background:`linear-gradient(90deg,${G.green},${G.greenBg})`, borderRadius:"12px 12px 0 0", opacity:hov ? 1 : 0.5, transition:"opacity 0.15s" }} />

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
        <div>
          <p style={{ fontSize:11, color:G.muted, fontWeight:600 }}>{p.id}</p>
          <p style={{ fontSize:12, color:G.sub, marginTop:2 }}>{p.company}</p>
        </div>
        <div style={{ display:"flex", flexDirection:"column", alignItems:"flex-end", gap:5 }}>
          <Pill stage="under_review" />
          {p.reviewDeadline && (
            <span style={{ fontSize:11, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:6, padding:"2px 8px", fontWeight:600 }}>
              ⏰ Due {p.reviewDeadline}
            </span>
          )}
        </div>
      </div>

      <p style={{ fontSize:14, fontWeight:700, color:G.text, lineHeight:1.4, marginBottom:4, letterSpacing:"-0.1px" }}>{p.title}</p>
      <p style={{ fontSize:12, color:G.sub, marginBottom:14 }}>👤 {p.client}</p>
      <p style={{ fontSize:12, color:G.muted, lineHeight:1.6, marginBottom:14, display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical", overflow:"hidden" }}>{p.scope}</p>

      {p.milestones?.length > 0 && (
        <div style={{ display:"flex", gap:4, flexWrap:"wrap", marginBottom:14 }}>
          {p.milestones.map((m, i) => (
            <span key={i} style={{ fontSize:10, fontWeight:600, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"2px 8px", borderRadius:6 }}>
              M{i + 1}: ₹{m.amount.toLocaleString("en-IN")}
            </span>
          ))}
        </div>
      )}

      {p.feedback && (
        <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:8, padding:"8px 12px", marginBottom:12 }}>
          <p style={{ fontSize:11, color:"#92400e", fontWeight:700, marginBottom:3 }}>💬 Client Says</p>
          <p style={{ fontSize:12, color:"#78350f", fontStyle:"italic", lineHeight:1.5 }}>"{p.feedback}"</p>
        </div>
      )}

      {p.reviewNote && (
        <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 10px", marginBottom:12 }}>
          <p style={{ fontSize:11, color:G.greenDark, fontWeight:600 }}>📝 {p.reviewNote}</p>
        </div>
      )}

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", paddingTop:12, borderTop:`1px solid #f3f4f6` }}>
        <div>
          <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Budget</p>
          <p style={{ fontSize:18, fontWeight:800, color:G.greenDark, letterSpacing:"-0.3px" }}>{fmt(p.amount, p.currency, p.pricingType)}</p>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>In Review For</p>
          <p style={{ fontSize:12, color:G.sub, fontWeight:500 }}>{p.daysAgo} day{p.daysAgo !== 1 ? "s" : ""}</p>
        </div>
      </div>
    </div>
  );
}

function FollowUpChecklist({ proposals, onOpen }) {
  const [checked, setChecked] = useState({});
  const tasks = proposals.flatMap(p => [
    { id:`${p.id}-f1`, label:`Send follow-up email to ${p.client} (${p.company})`,            proposal:p },
    { id:`${p.id}-f2`, label:`Verify ${p.company} has received all documents`,               proposal:p },
    { id:`${p.id}-f3`, label:`Prepare negotiation counter if ${p.company} asks for discount`, proposal:p },
  ]);
  const toggle = (id) => setChecked(prev => ({ ...prev, [id]:!prev[id] }));
  const done   = Object.values(checked).filter(Boolean).length;

  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"20px" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", marginBottom:16 }}>
        <div>
          <p style={{ fontSize:13, fontWeight:700, color:G.text }}>📋 Follow-Up Checklist</p>
          <p style={{ fontSize:12, color:G.muted, marginTop:2 }}>Action items to move these deals forward</p>
        </div>
        <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"6px 12px" }}>
          <span style={{ fontSize:12, fontWeight:700, color:G.greenDark }}>{done}/{tasks.length} done</span>
        </div>
      </div>

      <div style={{ background:"#f3f4f6", borderRadius:99, height:6, marginBottom:16, overflow:"hidden" }}>
        <div style={{ height:"100%", width:`${(done / tasks.length) * 100}%`, background:`linear-gradient(90deg,${G.green},#86efac)`, borderRadius:99, transition:"width 0.3s" }} />
      </div>

      <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
        {tasks.map(t => (
          <div key={t.id} onClick={() => toggle(t.id)}
            style={{ display:"flex", alignItems:"flex-start", gap:10, padding:"10px 12px", borderRadius:8, background:checked[t.id] ? G.bg : G.white, border:`1px solid ${checked[t.id] ? G.border : "#f3f4f6"}`, cursor:"pointer", transition:"all 0.12s" }}>
            <div style={{ width:18, height:18, borderRadius:5, border:`2px solid ${checked[t.id] ? G.green : "#d1d5db"}`, background:checked[t.id] ? G.green : G.white, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1, transition:"all 0.15s" }}>
              {checked[t.id] && <svg width="10" height="10" fill="none" stroke="#fff" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>}
            </div>
            <div style={{ flex:1 }}>
              <p style={{ fontSize:13, color:checked[t.id] ? G.muted : G.text, textDecoration:checked[t.id] ? "line-through" : "none", lineHeight:1.4 }}>{t.label}</p>
              <p style={{ fontSize:11, color:G.greenDark, marginTop:2, fontWeight:600 }} onClick={e => { e.stopPropagation(); onOpen(t.proposal); }}>→ {t.proposal.company}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   CARD
════════════════════════════════════════════════════════════ */
function Card({ p, onClick, onDuplicate, onArchive }) {
  const [menu, setMenu] = useState(false);
  const [hov,  setHov]  = useState(false);
  return (
    <div onClick={onClick} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{ background:G.white, border:`1px solid ${hov ? "#d1d5db" : G.border}`, borderRadius:12, padding:"18px", cursor:"pointer", transition:"border-color 0.15s, box-shadow 0.15s", boxShadow:hov ? "0 4px 16px rgba(0,0,0,0.07)" : "none", position:"relative" }}>

      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:12 }}>
        <div>
          <p style={{ fontSize:11, color:G.muted, fontWeight:600, marginBottom:2 }}>{p.id}</p>
          <p style={{ fontSize:12, color:G.sub }}>{p.company}</p>
        </div>
        <div style={{ display:"flex", alignItems:"center", gap:6 }} onClick={e => e.stopPropagation()}>
          <Pill stage={p.stage} />
          <div style={{ position:"relative" }}>
            <button onClick={e => { e.stopPropagation(); setMenu(!menu); }}
              style={{ width:26, height:26, borderRadius:6, border:`1px solid ${G.border}`, background:G.bg, display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:G.muted, opacity:hov ? 1 : 0, transition:"opacity 0.15s" }}>
              <svg width="13" height="13" fill="currentColor" viewBox="0 0 24 24"><path d="M12 5a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3zm0 7a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"/></svg>
            </button>
            {menu && (
              <div style={{ position:"absolute", right:0, top:30, background:G.white, border:`1px solid ${G.border}`, borderRadius:10, boxShadow:"0 8px 24px rgba(0,0,0,0.08)", zIndex:30, width:130, padding:"4px 0" }}>
                <button onClick={() => { setMenu(false); onDuplicate(); }} style={{ width:"100%", textAlign:"left", background:"none", border:"none", padding:"9px 14px", fontSize:12, color:G.text, cursor:"pointer", fontWeight:500, fontFamily:FONT }}>Duplicate</button>
                <button onClick={() => { setMenu(false); onArchive(); }}  style={{ width:"100%", textAlign:"left", background:"none", border:"none", padding:"9px 14px", fontSize:12, color:G.red,  cursor:"pointer", fontWeight:500, fontFamily:FONT }}>Archive</button>
              </div>
            )}
          </div>
        </div>
      </div>

      <p style={{ fontSize:14, fontWeight:600, color:G.text, lineHeight:1.4, marginBottom:4, letterSpacing:"-0.1px" }}>{p.title}</p>
      <p style={{ fontSize:12, color:G.sub, marginBottom:14 }}>👤 {p.client}</p>

      <div style={{ display:"flex", flexWrap:"wrap", gap:6, marginBottom:16 }}>
        {[p.service, `⏱ ${p.timeline}`, ...(p.daysAgo > 0 ? [`${p.daysAgo}d ago`] : [])].map(t => (
          <span key={t} style={{ fontSize:11, fontWeight:500, background:"#f3f4f6", color:G.sub, padding:"3px 8px", borderRadius:6 }}>{t}</span>
        ))}
      </div>

      <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", paddingTop:14, borderTop:`1px solid #f3f4f6` }}>
        <div>
          <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Budget</p>
          <p style={{ fontSize:18, fontWeight:700, color:G.text, letterSpacing:"-0.3px" }}>{fmt(p.amount, p.currency, p.pricingType)}</p>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontSize:10, color:G.muted, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.06em", marginBottom:2 }}>Valid until</p>
          <p style={{ fontSize:12, color:G.sub, fontWeight:500 }}>{p.validUntil}</p>
        </div>
      </div>
      {p.negotiations?.length > 0 && (
        <div style={{ marginTop:10, fontSize:11, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:6, padding:"5px 10px" }}>
          🤝 {p.negotiations.length} negotiation round{p.negotiations.length > 1 ? "s" : ""}
        </div>
      )}
    </div>
  );
}

/* ════════════════════════════════════════════════════════════
   DETAIL MODAL
════════════════════════════════════════════════════════════ */
function DetailModal({ p, onClose, onStage, onDuplicate }) {
  const [tab, setTab] = useState("overview");
  return (
    <Overlay onClose={onClose}>
      <div style={{ width:"100%", maxWidth:680, maxHeight:"88vh", background:G.white, borderRadius:16, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>

        {/* Header — dark green gradient */}
        <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"18px 22px 0" }}>
          <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", marginBottom:14 }}>
            <div>
              <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:5 }}>
                <p style={{ fontSize:16, fontWeight:700, color:G.white, letterSpacing:"-0.2px", fontFamily:FONT }}>{p.title}</p>
                <Pill stage={p.stage} />
              </div>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>{p.id} · {p.client}, {p.company} · {p.created}</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ display:"flex", gap:0 }}>
            {["overview","timeline","negotiation","notes"].map(t => (
              <button key={t} onClick={() => setTab(t)} style={{ padding:"9px 12px", fontSize:13, fontWeight:tab === t ? 700 : 400, color:tab === t ? G.white : "rgba(255,255,255,0.4)", background:"none", border:"none", borderBottom:tab === t ? `2px solid ${G.green}` : "2px solid transparent", cursor:"pointer", textTransform:"capitalize", marginBottom:-1, transition:"all 0.1s", fontFamily:FONT }}>
                {t}
              </button>
            ))}
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"20px 22px" }}>
          {tab === "overview" && (
            <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>
                <Box>
                  <Lbl>Client</Lbl>
                  <p style={{ fontSize:14, fontWeight:600, color:G.text }}>{p.client}</p>
                  <p style={{ fontSize:12, color:G.sub, marginTop:2 }}>{p.company}</p>
                  <p style={{ fontSize:12, color:G.sub }}>{p.email}</p>
                  <p style={{ fontSize:11, color:G.muted, marginTop:6 }}>Source: {p.source}</p>
                </Box>
                <Box style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}` }}>
                  <Lbl>Budget</Lbl>
                  <p style={{ fontSize:22, fontWeight:800, color:G.greenDark, letterSpacing:"-0.5px" }}>{fmt(p.amount, p.currency, p.pricingType)}</p>
                  <p style={{ fontSize:12, color:G.sub, marginTop:4 }}>{p.pricingType} · {p.timeline}</p>
                  <p style={{ fontSize:12, color:G.sub }}>{p.paymentTerms}</p>
                </Box>
              </div>
              <div><Lbl>Scope</Lbl><p style={{ fontSize:13, color:"#4b5563", lineHeight:1.7 }}>{p.scope}</p></div>
              {p.milestones?.length > 0 && (
                <div>
                  <Lbl>Milestones</Lbl>
                  {p.milestones.map((m, i) => (
                    <div key={i} style={{ display:"flex", justifyContent:"space-between", background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:8, padding:"9px 12px", marginBottom:6 }}>
                      <p style={{ fontSize:13, color:G.sub }}>M{i + 1} — {m.name}</p>
                      <p style={{ fontSize:13, fontWeight:600, color:G.greenDark }}>₹{m.amount.toLocaleString("en-IN")}</p>
                    </div>
                  ))}
                </div>
              )}
              {p.feedback && (
                <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:10, padding:"14px 16px" }}>
                  <Lbl style={{ color:"#2563eb" }}>Client Response</Lbl>
                  <p style={{ fontSize:13, color:"#1e40af", fontStyle:"italic" }}>"{p.feedback}"</p>
                </div>
              )}
              {p.doc && (
                <div style={{ display:"flex", alignItems:"center", gap:10, border:`1px solid ${G.border}`, borderRadius:10, padding:"12px 14px" }}>
                  <span style={{ fontSize:18 }}>📄</span>
                  <div style={{ flex:1 }}>
                    <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{p.doc}</p>
                    <p style={{ fontSize:11, color:G.muted }}>Attached document</p>
                  </div>
                  <button style={{ fontSize:12, color:G.greenDark, fontWeight:600, background:"none", border:"none", cursor:"pointer" }}>Download</button>
                </div>
              )}
            </div>
          )}

          {tab === "timeline" && (
            <div style={{ position:"relative", paddingLeft:22 }}>
              <div style={{ position:"absolute", left:7, top:0, bottom:0, width:2, background:"#f3f4f6" }} />
              {p.history.map((h, i) => (
                <div key={i} style={{ paddingBottom:20, position:"relative" }}>
                  <div style={{ width:12, height:12, borderRadius:"50%", background:G.green, border:"3px solid #fff", boxShadow:`0 0 0 2px ${G.green}`, position:"absolute", left:-18, top:2, zIndex:1 }} />
                  <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:2 }}>{h.e}</p>
                  <p style={{ fontSize:12, color:G.muted }}>{h.d} · by {h.by}</p>
                </div>
              ))}
            </div>
          )}

          {tab === "negotiation" && (
            <div>
              {!p.negotiations?.length ? (
                <div style={{ textAlign:"center", padding:"48px 0" }}>
                  <p style={{ fontSize:32, marginBottom:10 }}>🤝</p>
                  <p style={{ fontSize:14, color:G.sub }}>No negotiation rounds yet</p>
                </div>
              ) : (
                <>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginBottom:20 }}>
                    {[
                      { l:"Original Price", v:`₹${p.negotiations[0].ask.toLocaleString("en-IN")}`,                      bg:G.bg,       c:G.text       },
                      { l:"Current Ask",    v:`₹${p.negotiations[p.negotiations.length-1].ask.toLocaleString("en-IN")}`, bg:G.greenBg,  c:G.greenDark  },
                      { l:"Their Offer",    v:`₹${p.negotiations[p.negotiations.length-1].offer.toLocaleString("en-IN")}`,bg:G.redBg,   c:"#dc2626"    },
                    ].map(s => (
                      <div key={s.l} style={{ background:s.bg, borderRadius:12, padding:14, textAlign:"center", border:`1px solid ${s.bg === G.greenBg ? G.greenBorder : s.bg === G.redBg ? G.redBorder : G.border}` }}>
                        <p style={{ fontSize:11, color:G.muted, fontWeight:700, textTransform:"uppercase", marginBottom:8 }}>{s.l}</p>
                        <p style={{ fontSize:18, fontWeight:700, color:s.c }}>{s.v}</p>
                      </div>
                    ))}
                  </div>
                  {p.negotiations.map(n => (
                    <div key={n.round} style={{ border:`1px solid ${G.border}`, borderRadius:12, padding:16, marginBottom:12 }}>
                      <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12 }}>
                        <span style={{ fontSize:12, fontWeight:700, color:G.sub, textTransform:"uppercase", letterSpacing:"0.06em" }}>Round {n.round}</span>
                        <span style={{ fontSize:12, color:G.muted }}>{n.date}</span>
                      </div>
                      <div style={{ display:"grid", gridTemplateColumns:"1fr auto 1fr", gap:10, alignItems:"center", marginBottom:10 }}>
                        <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:9, padding:"9px 12px" }}>
                          <p style={{ fontSize:11, color:G.green, fontWeight:600 }}>Our Ask</p>
                          <p style={{ fontSize:15, fontWeight:700, color:G.greenDark }}>₹{n.ask.toLocaleString("en-IN")}</p>
                        </div>
                        <svg width="14" height="14" fill="none" stroke="#d1d5db" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4"/></svg>
                        <div style={{ background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:9, padding:"9px 12px" }}>
                          <p style={{ fontSize:11, color:G.red, fontWeight:600 }}>Their Offer</p>
                          <p style={{ fontSize:15, fontWeight:700, color:"#dc2626" }}>₹{n.offer.toLocaleString("en-IN")}</p>
                        </div>
                      </div>
                      <p style={{ fontSize:13, color:G.sub, fontStyle:"italic" }}>"{n.note}"</p>
                    </div>
                  ))}
                </>
              )}
            </div>
          )}

          {tab === "notes" && (
            <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:12, padding:"16px 18px" }}>
              <Lbl style={{ color:G.yellow }}>🔒 Internal Notes — Client Cannot See</Lbl>
              <p style={{ fontSize:13, color:"#78350f", lineHeight:1.7 }}>{p.notes || "No notes added yet."}</p>
            </div>
          )}
        </div>

        <div style={{ padding:"14px 22px", borderTop:`1px solid #f3f4f6`, display:"flex", justifyContent:"space-between", background:G.bg }}>
          <div style={{ display:"flex", gap:8 }}>
            <Btn onClick={onDuplicate}>Duplicate</Btn>
            <Btn onClick={() => { const w = window.open("","_blank"); w.document.write(`<html><head><title>${p.title}</title></head><body style="font-family:Arial;padding:32px"><h2>${p.title}</h2><p><b>Client:</b> ${p.client}, ${p.company}</p><p><b>Budget:</b> ${p.currency}${p.amount.toLocaleString("en-IN")} (${p.pricingType})</p><p><b>Scope:</b> ${p.scope}</p></body></html>`); w.document.close(); w.print(); }}>⬇ PDF</Btn>
          </div>
          <div style={{ display:"flex", gap:8 }}>
            {p.stage !== "accepted" && p.stage !== "rejected" && <Btn onClick={() => onStage(p.id, "rejected")} style={{ color:G.red, borderColor:G.redBorder }}>Reject</Btn>}
            {p.stage !== "accepted" && <Btn onClick={() => onStage(p.id, "accepted")} style={{ background:G.green, color:G.white, border:"none" }}>Mark Accepted ✓</Btn>}
            {p.stage === "draft"    && <Btn onClick={() => onStage(p.id, "sent")}     style={{ background:"#2563eb", color:G.white, border:"none" }}>Send 📤</Btn>}
          </div>
        </div>
      </div>
    </Overlay>
  );
}

/* ════════════════════════════════════════════════════════════
   NEW PROPOSAL MODAL
════════════════════════════════════════════════════════════ */
function NewModal({ onClose, onSubmit }) {
  const T = 5;
  const [step, setStep] = useState(1);
  const [f, setF] = useState({ client:"", company:"", email:"", source:"", title:"", service:"", scope:"", timeline:"", pricingType:"Fixed", amount:"", currency:"₹", milestones:[], paymentTerms:"", conditions:"", validUntil:"", notes:"", doc:null, stage:"draft" });
  const u   = (k, v) => setF(p => ({ ...p, [k]:v }));
  const ok  = { 1:f.client && f.company && f.email && f.source, 2:f.title && f.service && f.scope && f.timeline, 3:!!f.amount, 4:true, 5:true };
  const titles = ["Client Info","Project Details","Pricing","Terms & Notes","Preview"];
  const addM = () => setF(p => ({ ...p, milestones:[...p.milestones, { name:"", amount:"" }] }));
  const updM = (i, k, v) => setF(p => { const m = [...p.milestones]; m[i] = { ...m[i], [k]:v }; return { ...p, milestones:m }; });
  const remM = (i) => setF(p => ({ ...p, milestones:p.milestones.filter((_, j) => j !== i) }));

  return (
    <Overlay onClose={onClose}>
      <div style={{ width:"100%", maxWidth:500, maxHeight:"92vh", background:G.white, borderRadius:16, display:"flex", flexDirection:"column", overflow:"hidden", boxShadow:"0 24px 64px rgba(0,0,0,0.2)" }}>

        <div style={{ background:"linear-gradient(135deg,#14532d,#166534)", padding:"18px 22px 0" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:14 }}>
            <div>
              <p style={{ fontSize:17, fontWeight:800, color:G.white, margin:0, fontFamily:FONT }}>New Proposal</p>
              <p style={{ fontSize:12, color:"rgba(255,255,255,0.4)", marginTop:3 }}>Step {step} of {T} — {titles[step - 1]}</p>
            </div>
            <button onClick={onClose} style={{ width:28, height:28, borderRadius:7, border:"1px solid rgba(255,255,255,0.15)", background:"rgba(255,255,255,0.08)", display:"flex", alignItems:"center", justifyContent:"center", cursor:"pointer", color:"rgba(255,255,255,0.5)" }}>
              <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          </div>
          <div style={{ display:"flex", gap:4, paddingBottom:18 }}>
            {Array.from({ length:T }).map((_, i) => (
              <div key={i} style={{ flex:1, height:3, borderRadius:99, background:i < step ? G.green : "rgba(255,255,255,0.1)", transition:"background 0.3s" }} />
            ))}
          </div>
        </div>

        <div style={{ flex:1, overflowY:"auto", padding:"18px 22px" }}>
          <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
            {step === 1 && <>
              <FI label="Client Name" req><input value={f.client}  onChange={e => u("client", e.target.value)}  placeholder="e.g. Aryan Mehta"           style={inp} /></FI>
              <FI label="Company"     req><input value={f.company} onChange={e => u("company", e.target.value)} placeholder="e.g. FoodRush Technologies" style={inp} /></FI>
              <FI label="Email"       req><input type="email" value={f.email} onChange={e => u("email", e.target.value)} placeholder="client@company.com" style={inp} /></FI>
              <FI label="Lead Source" req><select value={f.source} onChange={e => u("source", e.target.value)} style={{ ...inp }}><option value="">Select source</option>{SOURCES.map(s => <option key={s} value={s}>{s}</option>)}</select></FI>
            </>}
            {step === 2 && <>
              <FI label="Project Title" req><input value={f.title}   onChange={e => u("title", e.target.value)}   placeholder="e.g. Restaurant Dashboard" style={inp} /></FI>
              <FI label="Service"       req><select value={f.service} onChange={e => u("service", e.target.value)} style={{ ...inp }}><option value="">Select</option>{SERVICES.map(s => <option key={s} value={s}>{s}</option>)}</select></FI>
              <FI label="Scope"         req><textarea value={f.scope}    onChange={e => u("scope", e.target.value)}    placeholder="Describe what will be built…" rows={4} style={{ ...inp, resize:"none" }} /></FI>
              <FI label="Timeline"      req><input value={f.timeline} onChange={e => u("timeline", e.target.value)} placeholder="e.g. 8 weeks"              style={inp} /></FI>
            </>}
            {step === 3 && <>
              <FI label="Pricing Type" req>
                <div style={{ display:"flex", gap:8 }}>
                  {["Fixed","Hourly"].map(t => (
                    <button key={t} onClick={() => u("pricingType", t)}
                      style={{ flex:1, padding:9, fontSize:13, fontWeight:600, borderRadius:8, border:`1.5px solid ${f.pricingType === t ? G.green : G.border}`, background:f.pricingType === t ? G.greenBg : G.white, color:f.pricingType === t ? G.greenDark : G.muted, cursor:"pointer", fontFamily:FONT }}>
                      {t === "Fixed" ? "💰 Fixed" : "⏱ Hourly"}
                    </button>
                  ))}
                </div>
              </FI>
              <FI label="Amount" req>
                <div style={{ display:"flex", gap:8 }}>
                  <select value={f.currency} onChange={e => u("currency", e.target.value)} style={{ ...inp, width:58 }}>{["₹","$","€"].map(c => <option key={c} value={c}>{c}</option>)}</select>
                  <input type="number" value={f.amount} onChange={e => u("amount", e.target.value)} placeholder="0" style={{ ...inp, flex:1 }} />
                </div>
              </FI>
              <FI label="Payment Terms"><input value={f.paymentTerms} onChange={e => u("paymentTerms", e.target.value)} placeholder="30% advance, 70% delivery" style={inp} /></FI>
              {f.pricingType === "Fixed" && (
                <div>
                  <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
                    <label style={lbl}>Milestones <span style={{ color:G.muted, fontWeight:400 }}>(optional)</span></label>
                    <button onClick={addM} style={{ fontSize:12, color:G.greenDark, fontWeight:700, background:"none", border:"none", cursor:"pointer" }}>+ Add</button>
                  </div>
                  {f.milestones.map((m, i) => (
                    <div key={i} style={{ display:"flex", gap:8, marginBottom:8 }}>
                      <input value={m.name} onChange={e => updM(i, "name", e.target.value)} placeholder="Name" style={{ ...inp, flex:1 }} />
                      <input type="number" value={m.amount} onChange={e => updM(i, "amount", e.target.value)} placeholder="₹" style={{ ...inp, width:80 }} />
                      <button onClick={() => remM(i)} style={{ color:G.red, background:"none", border:"none", cursor:"pointer", fontSize:16, padding:"0 4px" }}>✕</button>
                    </div>
                  ))}
                </div>
              )}
            </>}
            {step === 4 && <>
              <FI label="Conditions"><textarea value={f.conditions} onChange={e => u("conditions", e.target.value)} placeholder="Special requirements…" rows={3} style={{ ...inp, resize:"none" }} /></FI>
              <FI label="Valid Until"><input type="date" value={f.validUntil} onChange={e => u("validUntil", e.target.value)} style={inp} /></FI>
              <FI label="Internal Notes">
                <textarea value={f.notes} onChange={e => u("notes", e.target.value)} placeholder="Team-only notes…" rows={3} style={{ ...inp, resize:"none" }} />
                <p style={{ fontSize:11, color:G.yellow, marginTop:4, fontWeight:600 }}>🔒 Client cannot see this</p>
              </FI>
              <FI label="Attach Document">
                <label style={{ display:"flex", alignItems:"center", gap:10, border:`1.5px dashed ${G.border}`, borderRadius:9, padding:"11px 14px", cursor:"pointer" }}>
                  <span style={{ fontSize:18 }}>📎</span>
                  <span style={{ fontSize:13, color:f.doc ? G.greenDark : G.muted, fontWeight:f.doc ? 600 : 400 }}>{f.doc || "Upload PDF"}</span>
                  <input type="file" accept=".pdf,.doc,.docx" style={{ display:"none" }} onChange={e => { if (e.target.files[0]) u("doc", e.target.files[0].name); }} />
                </label>
              </FI>
            </>}
            {step === 5 && (
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                <div style={{ background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:12, padding:18 }}>
                  <p style={{ fontSize:15, fontWeight:800, color:G.text, marginBottom:12, fontFamily:FONT }}>{f.title || "—"}</p>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:10 }}>
                    {[["Client",`${f.client}, ${f.company}`],["Source",f.source],["Service",f.service],["Timeline",f.timeline],["Payment",f.paymentTerms || "—"],["Valid Until",f.validUntil || "—"]].map(([k, v]) => (
                      <div key={k}>
                        <p style={{ fontSize:11, color:G.muted, fontWeight:500, marginBottom:2 }}>{k}</p>
                        <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{v}</p>
                      </div>
                    ))}
                  </div>
                  <div style={{ marginTop:14, paddingTop:14, borderTop:`1px solid ${G.greenBorder}` }}>
                    <p style={{ fontSize:11, color:G.muted, fontWeight:500, marginBottom:3 }}>Budget</p>
                    <p style={{ fontSize:22, fontWeight:800, color:G.greenDark, letterSpacing:"-0.5px" }}>{f.currency}{Number(f.amount || 0).toLocaleString("en-IN")}{f.pricingType === "Hourly" ? "/hr" : ""}</p>
                  </div>
                </div>
                <FI label="Save as">
                  <div style={{ display:"flex", gap:8 }}>
                    {["draft","sent"].map(s => (
                      <button key={s} onClick={() => u("stage", s)}
                        style={{ flex:1, padding:9, fontSize:13, fontWeight:600, borderRadius:8, border:`1.5px solid ${f.stage === s ? G.green : G.border}`, background:f.stage === s ? G.greenBg : G.white, color:f.stage === s ? G.greenDark : G.muted, cursor:"pointer", fontFamily:FONT }}>
                        {s === "draft" ? "💾 Draft" : "📤 Send Now"}
                      </button>
                    ))}
                  </div>
                </FI>
              </div>
            )}
          </div>
        </div>

        <div style={{ padding:"14px 22px", borderTop:`1px solid #f3f4f6`, display:"flex", justifyContent:"space-between", background:G.bg }}>
          <Btn onClick={step === 1 ? onClose : () => setStep(step - 1)}>{step === 1 ? "Cancel" : "← Back"}</Btn>
          {step < T
            ? <Btn onClick={() => setStep(step + 1)} disabled={!ok[step]} style={{ background:ok[step] ? G.green : "#e5e7eb", color:ok[step] ? G.white : G.muted, border:"none", cursor:ok[step] ? "pointer" : "not-allowed" }}>Next →</Btn>
            : <Btn onClick={() => onSubmit(f)} style={{ background:G.green, color:G.white, border:"none" }}>{f.stage === "sent" ? "Send Proposal" : "Save Draft"}</Btn>
          }
        </div>
      </div>
    </Overlay>
  );
}

/* ════════════════════════════════════════════════════════════
   NAVBAR
════════════════════════════════════════════════════════════ */
function Navbar({ onNew }) {
  return (
    <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 24px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <span style={{ color:G.green }}>web</span>lance
      </span>
      <div style={{ width:1, height:20, background:G.border, marginLeft:4 }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Proposals</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <svg width="10" height="10" fill={G.greenDark} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd"/>
        </svg>
        <span style={{ fontSize:11, color:G.greenDark, fontWeight:700 }}>Agency Admin only</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.greenBg, border:`1.5px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.greenDark, marginLeft:8, fontFamily:FONT }}>
        RK
      </div>
      <button onClick={onNew} style={{ display:"flex", alignItems:"center", gap:6, background:G.green, color:G.white, border:"none", borderRadius:8, padding:"7px 14px", fontSize:12, fontWeight:700, cursor:"pointer", fontFamily:FONT, marginLeft:4 }}>
        <svg width="12" height="12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4"/></svg>
        New Proposal
      </button>
    </nav>
  );
}