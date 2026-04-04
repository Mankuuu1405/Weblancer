import { useState } from "react";
import AboutTab        from "./AboutTab";
import SkillsScoresTab from "./SkillsScoresTab";
import PortfolioTab    from "./PortfolioTab";
import ReviewsTab      from "./ReviewsTab";
import TrustTab        from "./TrustTab";

/* ── Two color families only ─────────────────────────────────
   GREEN family:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
   NAVY family:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
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

function SkillBadge({ label, type }) {
  const map = {
    "pro+":     { bg:G.navyBg,  text:G.navy,      border:G.navyBorder,
                  dot:<span style={{ width:7, height:7, borderRadius:"50%", background:G.navy, display:"inline-block" }}/> },
    "verified": { bg:G.greenBg, text:G.greenDeep,  border:G.greenBorder,
                  dot:(
                    <svg style={{ width:13, height:13, color:G.green }} fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                    </svg>
                  )},
    "elite":    { bg:G.navyBg,  text:G.navyDeep,   border:G.navyBorder,
                  dot:<span style={{ width:7, height:7, borderRadius:"50%", background:G.navyDeep, display:"inline-block" }}/> },
  };
  const s = map[type] || map["verified"];
  return (
    <span style={{ display:"inline-flex", alignItems:"center", gap:6,
      fontSize:11, fontWeight:700, background:s.bg, color:s.text,
      border:`1px solid ${s.border}`, padding:"3px 10px", borderRadius:99, fontFamily:FONT }}>
      {s.dot}{label}
    </span>
  );
}

function Tab({ label, active, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding:"12px 16px", fontSize:13,
      fontWeight: active ? 700 : 500,
      color: active ? G.navy : G.sub,
      background:"none", border:"none",
      borderBottom: active ? `2px solid ${G.navy}` : "2px solid transparent",
      cursor:"pointer", whiteSpace:"nowrap",
      transition:"all 0.12s", fontFamily:FONT, marginBottom:-1,
    }}>{label}</button>
  );
}

export default function PublicProfile({ onBack }) {
  const [activeTab,   setActiveTab]   = useState("about");
  const [messageSent, setMessageSent] = useState(false);

  const tabs = [
    { key:"about",     label:"About"               },
    { key:"skills",    label:"Skills & Scores"     },
    { key:"portfolio", label:"Portfolio"            },
    { key:"reviews",   label:"Reviews"             },
    { key:"trust",     label:"Trust & Reliability" },
  ];

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

      {/* Navbar */}
      <header style={{
        background: G.white,
        borderBottom: `1px solid ${G.greenBorder}`,
        boxShadow: "0 2px 12px rgba(110,192,48,0.08)",
        padding: "0 28px", height: 60,
        display:"flex", alignItems:"center", justifyContent:"space-between",
        position:"sticky", top:0, zIndex:30,
        overflow:"hidden",
      }}>
        <span style={{ fontWeight:800, fontSize:20, letterSpacing:"-0.5px", fontFamily:FONT }}>
            <div className="flex-shrink-0 cursor-pointer" onClick={() => navigate("/")}>
              <img
                src="/weblance.jpeg"
                alt="Weblance"
                style={{ height: 65, width: 150, display: "block" }}
              />
            </div>
        </span>
        <button onClick={onBack} style={{
          display:"flex", alignItems:"center", gap:6, fontSize:13, fontWeight:600,
          color:G.sub, background:"none", border:"none", cursor:"pointer",
          fontFamily:FONT, transition:"color 0.12s",
        }}
          onMouseEnter={e => e.currentTarget.style.color = G.navy}
          onMouseLeave={e => e.currentTarget.style.color = G.sub}>
          <svg style={{ width:16, height:16 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18"/>
          </svg>
          Back
        </button>
      </header>

      <div style={{ maxWidth:960, margin:"0 auto", padding:"28px 24px" }}>

        {/* Hero Card */}
        <div style={{
          background: G.white,
          border: `1px solid ${G.greenBorder}`,
          borderRadius:20, padding:"24px 28px", marginBottom:20,
          boxShadow:"0 4px 24px rgba(110,192,48,0.08)",
        }}>
          <div style={{ display:"flex", alignItems:"flex-start", gap:24 }}>

            {/* Avatar — navy light → deep */}
            <div style={{
              width:80, height:80, borderRadius:"50%", flexShrink:0,
              background: G.gradNavy,
              display:"flex", alignItems:"center", justifyContent:"center",
              fontSize:32, fontWeight:800, color:G.white,
              boxShadow:"0 4px 20px rgba(15,26,59,0.28)",
            }}>J</div>

            <div style={{ flex:1, minWidth:0 }}>
              <h1 style={{ fontSize:24, fontWeight:800, color:G.text, margin:"0 0 4px", letterSpacing:"-0.4px" }}>John Smith</h1>
              <p style={{ fontSize:14, color:G.sub, marginBottom:10 }}>Full-Stack React & Node.js Developer</p>

              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:14, fontSize:12, color:G.muted, marginBottom:12 }}>
                <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <svg style={{ width:13, height:13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                  </svg>
                  Mumbai, India
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:4 }}>
                  <svg style={{ width:13, height:13 }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                  </svg>
                  IST
                </span>
                <span style={{ display:"flex", alignItems:"center", gap:2 }}>
                  {[1,2,3,4,5].map(s => (
                    <svg key={s} width="13" height="13" fill={s <= 4 ? "#f59e0b" : "#e5e7eb"} viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                  ))}
                </span>
                <span>3 projects</span>
                <span>⭐ 4.9 avg rating</span>
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginBottom:14 }}>
                <SkillBadge label="Pro+ React.js"      type="pro+"     />
                <SkillBadge label="Verified Node.js"   type="verified" />
                <SkillBadge label="Elite UI/UX Design" type="elite"    />
                <SkillBadge label="Pro+ TypeScript"    type="pro+"     />
              </div>

              <div style={{ display:"flex", flexWrap:"wrap", alignItems:"center", gap:16, fontSize:13 }}>
                <span style={{ fontWeight:700, color:G.text }}>$75/hr</span>
                <span style={{ fontWeight:700, color:G.greenDeep,
                  background:G.greenBg, border:`1px solid ${G.greenBorder}`,
                  padding:"2px 10px", borderRadius:99, fontSize:12 }}>
                  ● Available Immediately
                </span>
                <span style={{ color:G.muted }}>40h/week</span>
              </div>
            </div>

            {/* Action buttons */}
            <div style={{ display:"flex", flexDirection:"column", gap:8, flexShrink:0, width:172 }}>

              {/* Primary — navy light → deep */}
              <button style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                background: G.gradNavy,
                color:G.white, fontSize:13, fontWeight:700,
                border:"none", borderRadius:100, padding:"11px 20px",
                cursor:"pointer", fontFamily:FONT,
                boxShadow:"0 3px 14px rgba(15,26,59,0.30)",
                transition:"all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity="0.88"; e.currentTarget.style.boxShadow="0 5px 20px rgba(15,26,59,0.42)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity="1";    e.currentTarget.style.boxShadow="0 3px 14px rgba(15,26,59,0.30)"; }}>
                Invite to Project
              </button>

              {/* Secondary — green light → deep */}
              <button onClick={() => setActiveTab("portfolio")} style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                background: G.gradGreen,
                color:G.white, fontSize:13, fontWeight:700,
                border:"none", borderRadius:100, padding:"11px 20px",
                cursor:"pointer", fontFamily:FONT,
                boxShadow:"0 3px 14px rgba(46,125,31,0.24)",
                transition:"all 0.15s",
              }}
                onMouseEnter={e => { e.currentTarget.style.opacity="0.88"; e.currentTarget.style.boxShadow="0 5px 20px rgba(46,125,31,0.36)"; }}
                onMouseLeave={e => { e.currentTarget.style.opacity="1";    e.currentTarget.style.boxShadow="0 3px 14px rgba(46,125,31,0.24)"; }}>
                View Portfolio
              </button>

              {/* Tertiary — navy outline */}
              <button onClick={() => setMessageSent(true)} style={{
                display:"flex", alignItems:"center", justifyContent:"center",
                background: messageSent ? G.navyBg : G.white,
                color: messageSent ? G.navy : G.sub,
                border: `1.5px solid ${messageSent ? G.navy : G.navyBorder}`,
                fontSize:13, fontWeight:600,
                borderRadius:100, padding:"10px 20px",
                cursor:"pointer", fontFamily:FONT, transition:"all 0.15s",
              }}>
                {messageSent ? "✓ Message Sent" : "Message"}
              </button>
            </div>
          </div>
        </div>

        {/* Tabs panel */}
        <div style={{
          background:G.white,
          border:`1px solid ${G.greenBorder}`,
          borderRadius:20, overflow:"hidden",
          boxShadow:"0 2px 12px rgba(110,192,48,0.06)",
        }}>
          <div style={{ display:"flex", borderBottom:`1px solid ${G.navyBorder}`, paddingLeft:16, overflowX:"auto" }}>
            {tabs.map(t => <Tab key={t.key} label={t.label} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}/>)}
          </div>
          <div style={{ padding:24 }}>
            {activeTab === "about"     && <AboutTab />}
            {activeTab === "skills"    && <SkillsScoresTab />}
            {activeTab === "portfolio" && <PortfolioTab />}
            {activeTab === "reviews"   && <ReviewsTab />}
            {activeTab === "trust"     && <TrustTab />}
          </div>
        </div>

      </div>
    </div>
  );
}