import { useState } from "react";

(() => {
  if (document.getElementById("wl-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
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
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  yellow:      "#f59e0b",
  yellowBg:    "#fffbeb",
  yellowBorder:"#fde68a",
};

const NAV_SECTIONS = [
  { id:"profile",      icon:"👤", label:"Agency Profile"   },
  { id:"business",     icon:"🏢", label:"Business Details" },
  { id:"notifications",icon:"🔔", label:"Notifications"    },
  { id:"security",     icon:"🔐", label:"Security"         },
  { id:"billing",      icon:"💳", label:"Billing & Plan"   },
  { id:"danger",       icon:"⚠️", label:"Danger Zone"      },
];

const NOTIF_ROWS = [
  { label:"Payment released",       email:true,  app:true,  sms:false },
  { label:"Milestone due reminder", email:true,  app:true,  sms:true  },
  { label:"Contract signed",        email:true,  app:true,  sms:false },
  { label:"Proposal accepted",      email:true,  app:true,  sms:false },
  { label:"Proposal rejected",      email:true,  app:true,  sms:false },
  { label:"New client message",     email:false, app:true,  sms:false },
  { label:"Team member joined",     email:true,  app:true,  sms:false },
  { label:"KYC status update",      email:true,  app:true,  sms:false },
  { label:"Weekly earnings report", email:true,  app:false, sms:false },
  { label:"Security alerts",        email:true,  app:true,  sms:true  },
];

const SESSIONS = [
  { device:"Chrome on Windows", location:"Mumbai, India", ip:"103.21.xx.xx", time:"Active now",   current:true  },
  { device:"Safari on iPhone",  location:"Mumbai, India", ip:"103.21.xx.xx", time:"2 hrs ago",    current:false },
  { device:"Chrome on MacBook", location:"Pune, India",   ip:"117.55.xx.xx", time:"Mar 10, 2026", current:false },
  { device:"Firefox on Windows",location:"Delhi, India",  ip:"182.68.xx.xx", time:"Mar 8, 2026",  current:false },
];

const INVOICES = [
  { id:"INV-2026-03", date:"Mar 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
  { id:"INV-2026-02", date:"Feb 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
  { id:"INV-2026-01", date:"Jan 1, 2026",  amount:"₹0", type:"Commission (6%)", status:"Auto-deducted" },
];

const FONT = "'Plus Jakarta Sans', sans-serif";

const inp = {
  width:"100%", fontSize:13, border:`1.5px solid ${G.border}`,
  borderRadius:8, padding:"9px 12px", outline:"none",
  color:G.text, boxSizing:"border-box", fontFamily:FONT,
  background:G.white, transition:"border-color 0.15s",
};
const sbtn = {
  fontSize:13, fontWeight:700, padding:"9px 22px",
  border:"none", background:G.grad, color:"#fff",
  borderRadius:8, cursor:"pointer", fontFamily:FONT,
  transition:"opacity 0.15s",
};

export default function AgencySettings() {
  const [active,        setActive]        = useState("profile");
  const [saved,         setSaved]         = useState(false);
  const [notifRows,     setNotifRows]     = useState(NOTIF_ROWS);
  const [twoFA,         setTwoFA]         = useState(false);
  const [sessions,      setSessions]      = useState(SESSIONS);
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [showMobileNav, setShowMobileNav] = useState(false);

  const [profile, setProfile] = useState({
    name:"TechVision Solutions",
    tagline:"Full-Stack Web & Mobile Agency",
    bio:"We build scalable, modern web and mobile applications for businesses across India. Specializing in React, Node.js, and React Native with a focus on clean code and great UX.",
    website:"https://techvision.in",
    linkedin:"",
    github:"https://github.com/techvision-in",
    timezone:"Asia/Kolkata (IST)",
    currency:"INR (₹)",
    categories:["Web Development","Mobile Apps","UI/UX Design"],
  });
  const up = (k, v) => setProfile(p => ({ ...p, [k]: v }));

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const toggleNotif = (idx, col) => {
    setNotifRows(prev => prev.map((r, i) => i === idx ? { ...r, [col]: !r[col] } : r));
  };

  const selectSection = (id) => {
    setActive(id);
    setShowMobileNav(false);
  };

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"16px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:8 }}>
            <div>
              <h1 style={{ fontSize:20, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px", fontFamily:FONT }}>Settings</h1>
              <p style={{ fontSize:12, color:G.muted, marginTop:3 }}>Manage your agency profile, security and preferences</p>
            </div>
            {/* Mobile menu button */}
            <button
              onClick={() => setShowMobileNav(!showMobileNav)}
              style={{ display:"none", padding:"8px", background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:8, cursor:"pointer" }}
              className="mobile-menu-btn">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={G.navy} strokeWidth="2">
                <path d="M3 12h18M3 6h18M3 18h18" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          
          {/* Mobile section selector */}
          <div className="mobile-section-select" style={{ display:"none", marginTop:12 }}>
            <select
              value={active}
              onChange={(e) => setActive(e.target.value)}
              style={{ ...inp, padding:"10px 12px", fontSize:14, fontWeight:600, color:G.navy }}>
              {NAV_SECTIONS.map(s => (
                <option key={s.id} value={s.id}>{s.icon} {s.label}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <style>{`
        @media (max-width: 768px) {
          .mobile-menu-btn { display: block !important; }
          .mobile-section-select { display: block !important; }
          .desktop-sidebar { display: none !important; }
        }
        @media (min-width: 769px) {
          .settings-grid {
            grid-template-columns: 210px 1fr !important;
          }
        }
      `}</style>

      {/* Toast */}
      {saved && (
        <div style={{ position:"fixed", top:64, right:16, zIndex:100, background:G.white, border:`1.5px solid ${G.blueBorder}`, borderRadius:10, padding:"10px 16px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(27,114,192,0.15)" }}>
          <span style={{ fontSize:14 }}>✅</span>
          <span style={{ fontSize:12, fontWeight:700, color:G.navy, fontFamily:FONT }}>Settings saved successfully</span>
        </div>
      )}

      <div className="settings-grid" style={{ maxWidth:1160, margin:"0 auto", padding:"20px 16px 64px", display:"grid", gridTemplateColumns:"1fr", gap:16 }}>

        {/* ── Sidebar nav (Desktop only) ── */}
        <div className="desktop-sidebar">
          <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden", position:"sticky", top:68 }}>
            {NAV_SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              const isDanger = s.id === "danger";
              return (
                <button key={s.id} onClick={() => selectSection(s.id)} style={{
                  display:"flex", alignItems:"center", gap:9, width:"100%",
                  padding:"10px 14px", fontSize:12,
                  fontWeight: isActive ? 700 : 500,
                  color: isDanger ? G.red : isActive ? G.navy : G.text,
                  background: isActive ? G.blueBg : G.white,
                  border:"none",
                  borderLeft: isActive ? `3px solid ${G.blue}` : "3px solid transparent",
                  borderBottom: i < NAV_SECTIONS.length - 1 ? `1px solid #f3f4f6` : "none",
                  cursor:"pointer", textAlign:"left",
                  transition:"all 0.12s", fontFamily:FONT,
                }}>
                  <span style={{ fontSize:14 }}>{s.icon}</span>
                  {s.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* ── Main panel ── */}
        <div>

          {/* ─ AGENCY PROFILE ─ */}
          {active === "profile" && (
            <SCard title="Agency Profile" desc="Public-facing agency information">
              {/* Logo upload */}
              <div style={{ display:"flex", alignItems:"center", gap:14, marginBottom:20, paddingBottom:20, borderBottom:`1px solid #f3f4f6`, flexWrap:"wrap" }}>
                <div style={{ width:64, height:64, borderRadius:14, background:G.blueBg, border:`2px dashed ${G.blueBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
                  <span style={{ fontSize:22 }}>🏢</span>
                </div>
                <div style={{ flex:1, minWidth:200 }}>
                  <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:4 }}>Agency Logo</p>
                  <p style={{ fontSize:11, color:G.muted, marginBottom:8 }}>PNG or JPG, max 2MB · 400×400px recommended</p>
                  <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
                    <label style={{ fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>
                      Upload Logo <input type="file" style={{ display:"none" }} />
                    </label>
                    <button style={{ fontSize:11, color:G.muted, background:"#f3f4f6", border:"none", borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>Remove</button>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <style>{`
                  @media (min-width: 640px) {
                    .profile-grid { grid-template-columns: 1fr 1fr !important; }
                  }
                `}</style>
                <div className="profile-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                  <FRow label="Agency Name" full>
                    <input value={profile.name} onChange={e => up("name", e.target.value)} style={inp} />
                  </FRow>
                  <FRow label="Tagline" full>
                    <input value={profile.tagline} onChange={e => up("tagline", e.target.value)} placeholder="e.g. Full-Stack Web & Mobile Agency" style={inp} />
                  </FRow>
                </div>
                <FRow label="About / Bio" full>
                  <textarea value={profile.bio} onChange={e => up("bio", e.target.value)} rows={4} style={{ ...inp, resize:"none" }} />
                </FRow>
                <div className="profile-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                  <FRow label="Website">
                    <input value={profile.website} onChange={e => up("website", e.target.value)} placeholder="https://" style={inp} />
                  </FRow>
                  <FRow label="GitHub">
                    <input value={profile.github} onChange={e => up("github", e.target.value)} placeholder="https://github.com/" style={inp} />
                  </FRow>
                  <FRow label="LinkedIn">
                    <input value={profile.linkedin} onChange={e => up("linkedin", e.target.value)} placeholder="https://linkedin.com/company/" style={inp} />
                  </FRow>
                  <FRow label="Timezone">
                    <select value={profile.timezone} onChange={e => up("timezone", e.target.value)} style={{ ...inp }}>
                      {["Asia/Kolkata (IST)","Asia/Dubai (GST)","Europe/London (GMT)","America/New_York (EST)"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </FRow>
                  <FRow label="Currency">
                    <select value={profile.currency} onChange={e => up("currency", e.target.value)} style={{ ...inp }}>
                      {["INR (₹)","USD ($)","EUR (€)","GBP (£)"].map(c => <option key={c}>{c}</option>)}
                    </select>
                  </FRow>
                </div>
              </div>

              <div style={{ marginTop:16 }}>
                <p style={{ fontSize:10, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Service Categories</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Web Development","Mobile Apps","UI/UX Design","AI & ML","DevOps","Data Engineering"].map(cat => {
                    const sel = profile.categories.includes(cat);
                    return (
                      <button key={cat}
                        onClick={() => up("categories", sel ? profile.categories.filter(c => c !== cat) : [...profile.categories, cat])}
                        style={{ fontSize:11, fontWeight:600, padding:"6px 12px", borderRadius:99, border:`1.5px solid ${sel ? G.blue : G.border}`, background:sel ? G.blueBg : G.white, color:sel ? G.navy : G.sub, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                        {cat}
                      </button>
                    );
                  })}
                </div>
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─ BUSINESS DETAILS ─ */}
          {active === "business" && (
            <SCard title="Business Details" desc="Legal and official business information">
              <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:10, padding:"10px 12px", marginBottom:16, display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ fontSize:13, flexShrink:0 }}>🔒</span>
                <p style={{ fontSize:11, color:"#92400e", fontFamily:FONT, lineHeight:1.5 }}>
                  Sensitive fields (PAN, Aadhaar, GST) are managed through KYC.{" "}
                  <a href="/agency/kyc" style={{ color:G.navy, fontWeight:700 }}>Edit in KYC →</a>
                </p>
              </div>
              <div className="profile-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:14 }}>
                <FRow label="Legal Business Name" full>
                  <input defaultValue="TechVision Solutions Private Limited" style={inp} />
                </FRow>
                <FRow label="Registration Type">
                  <select style={{ ...inp }}>
                    {["Private Limited","LLP","Proprietorship","Partnership"].map(t => <option key={t}>{t}</option>)}
                  </select>
                </FRow>
                <FRow label="Founded Year">
                  <input defaultValue="2020" style={inp} />
                </FRow>
                <FRow label="Team Size">
                  <select style={{ ...inp }}>
                    {["1–5","6–15","16–50","51–100","100+"].map(s => <option key={s}>{s}</option>)}
                  </select>
                </FRow>
                <FRow label="GST Number" full>
                  <div style={{ position:"relative" }}>
                    <input defaultValue="27AABCT3518Q1Z2" style={inp} />
                    <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:10, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, padding:"2px 7px", borderRadius:99 }}>VERIFIED ✓</span>
                  </div>
                </FRow>
                <FRow label="Registered Address" full>
                  <textarea defaultValue="401, Tech Park, Andheri East, Mumbai – 400069, Maharashtra" rows={2} style={{ ...inp, resize:"none" }} />
                </FRow>
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─ NOTIFICATIONS ─ */}
          {active === "notifications" && (
            <SCard title="Notification Preferences" desc="Choose how you want to be notified">
              <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
                {/* Desktop header */}
                <div className="notif-desktop-header" style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 14px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                  <style>{`
                    @media (max-width: 640px) {
                      .notif-desktop-header { display: none !important; }
                    }
                  `}</style>
                  <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>Event</p>
                  {["Email","In-App","SMS"].map(h => (
                    <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"center" }}>{h}</p>
                  ))}
                </div>
                
                {notifRows.map((row, i) => (
                  <div key={i}>
                    {/* Desktop layout */}
                    <div className="notif-desktop-row"
                      style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"11px 14px", borderBottom:i < notifRows.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center", transition:"background 0.1s" }}
                      onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                      onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                      <style>{`
                        @media (max-width: 640px) {
                          .notif-desktop-row { display: none !important; }
                        }
                      `}</style>
                      <p style={{ fontSize:12, color:G.text, fontFamily:FONT }}>{row.label}</p>
                      {["email","app","sms"].map(col => (
                        <div key={col} style={{ display:"flex", justifyContent:"center" }}>
                          <Toggle on={row[col]} onChange={() => toggleNotif(i, col)} />
                        </div>
                      ))}
                    </div>
                    
                    {/* Mobile layout */}
                    <div className="notif-mobile-row" style={{ display:"none", padding:"12px 14px", borderBottom:i < notifRows.length - 1 ? `1px solid #f9fafb` : "none" }}>
                      <style>{`
                        @media (max-width: 640px) {
                          .notif-mobile-row { display: block !important; }
                        }
                      `}</style>
                      <p style={{ fontSize:12, fontWeight:600, color:G.text, marginBottom:10, fontFamily:FONT }}>{row.label}</p>
                      <div style={{ display:"grid", gridTemplateColumns:"repeat(3, 1fr)", gap:8 }}>
                        {[["email","Email"],["app","In-App"],["sms","SMS"]].map(([col, label]) => (
                          <div key={col} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:6, padding:"8px", background:row[col] ? G.blueBg : "#fafafa", borderRadius:8, border:`1px solid ${row[col] ? G.blueBorder : "#f3f4f6"}` }}>
                            <span style={{ fontSize:10, fontWeight:600, color:G.sub }}>{label}</span>
                            <Toggle on={row[col]} onChange={() => toggleNotif(i, col)} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─ SECURITY ─ */}
          {active === "security" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <SCard title="Change Password" desc="Update your account password">
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {["Current Password","New Password","Confirm New Password"].map(label => (
                    <FRow key={label} label={label}>
                      <input type="password" placeholder="••••••••••••" style={inp} />
                    </FRow>
                  ))}
                </div>
                <div style={{ marginTop:14 }}>
                  <button onClick={handleSave} style={sbtn}>Update Password</button>
                </div>
              </SCard>

              <SCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"12px 14px", border:`1.5px solid ${twoFA ? G.blueBorder : G.border}`, borderRadius:10, background:twoFA ? G.blueBg : G.white, transition:"all 0.15s", flexWrap:"wrap", gap:10 }}>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    <span style={{ fontSize:18 }}>🔐</span>
                    <div>
                      <p style={{ fontSize:12, fontWeight:600, color:G.text }}>Authenticator App (TOTP)</p>
                      <p style={{ fontSize:11, color:G.muted }}>Use Google Authenticator or Authy</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {twoFA && <span style={{ fontSize:10, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 9px" }}>Enabled</span>}
                    <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />
                  </div>
                </div>
              </SCard>

              <SCard title="Active Sessions" desc="Devices currently logged in to your account">
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {sessions.map((s, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:10, padding:"11px 12px", border:`1.5px solid ${s.current ? G.blueBorder : G.border}`, borderRadius:10, background:s.current ? G.blueBg : G.white, flexWrap:"wrap" }}>
                      <span style={{ fontSize:16, flexShrink:0 }}>{s.device.includes("iPhone") ? "📱" : "💻"}</span>
                      <div style={{ flex:1, minWidth:160 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:7, flexWrap:"wrap" }}>
                          <p style={{ fontSize:12, fontWeight:600, color:G.text }}>{s.device}</p>
                          {s.current && (
                            <span style={{ fontSize:9, fontWeight:700, background:G.grad, color:"#fff", borderRadius:99, padding:"2px 7px" }}>Current</span>
                          )}
                        </div>
                        <p style={{ fontSize:10, color:G.muted, marginTop:2 }}>{s.location} · {s.ip} · {s.time}</p>
                      </div>
                      {!s.current && (
                        <button onClick={() => setSessions(prev => prev.filter((_, j) => j !== i))}
                          style={{ fontSize:10, fontWeight:700, color:G.red, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:7, padding:"4px 9px", cursor:"pointer", fontFamily:FONT, flexShrink:0 }}>
                          Revoke
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </SCard>
            </div>
          )}

          {/* ─ BILLING ─ */}
          {active === "billing" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <SCard title="Current Plan" desc="Your Weblance subscription and commission details">
                <div style={{ background:G.grad, borderRadius:12, padding:"18px 20px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:10 }}>
                    <div>
                      <p style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:5 }}>Current Plan</p>
                      <p style={{ fontSize:22, fontWeight:800, color:"#bfdbfe", fontFamily:FONT, letterSpacing:"-0.5px" }}>Agency Pro</p>
                      <p style={{ fontSize:12, color:"rgba(255,255,255,0.5)", marginTop:4 }}>6% platform commission · No monthly fee</p>
                    </div>
                    <span style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:99, padding:"4px 12px", fontSize:11, fontWeight:700, color:"#fff" }}>Active</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr", gap:10, marginTop:16 }}>
                    <style>{`
                      @media (min-width: 640px) {
                        .plan-grid { grid-template-columns: repeat(3, 1fr) !important; }
                      }
                    `}</style>
                    <div className="plan-grid" style={{ display:"grid", gridTemplateColumns:"1fr", gap:10 }}>
                      {[["Commission Rate","6% per transaction"],["Billing Model","Pay as you earn"],["Payout","Anytime, min ₹1,000"]].map(([k, v]) => (
                        <div key={k} style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"9px 11px" }}>
                          <p style={{ fontSize:9, color:"rgba(255,255,255,0.4)", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>{k}</p>
                          <p style={{ fontSize:11, fontWeight:600, color:"rgba(255,255,255,0.85)" }}>{v}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SCard>

              <SCard title="Billing Email" desc="Invoices and billing notifications are sent here">
                <FRow label="Billing Email">
                  <input defaultValue="billing@techvision.in" style={inp} />
                </FRow>
                <SaveRow onSave={handleSave} />
              </SCard>

              <SCard title="Invoice History" desc="Download past commission summaries">
                <div style={{ border:`1px solid ${G.border}`, borderRadius:10, overflow:"hidden" }}>
                  {/* Desktop table */}
                  <div className="invoice-desktop" style={{ display:"block" }}>
                    <style>{`
                      @media (max-width: 768px) {
                        .invoice-desktop { display: none !important; }
                        .invoice-mobile { display: block !important; }
                      }
                    `}</style>
                    <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"10px 14px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                      {["Invoice","Date","Amount","Type",""].map(h => (
                        <p key={h} style={{ fontSize:9, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
                      ))}
                    </div>
                    {INVOICES.map((inv, i) => (
                      <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"11px 14px", borderBottom:i < INVOICES.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center" }}>
                        <p style={{ fontSize:11, fontWeight:600, color:G.navy }}>{inv.id}</p>
                        <p style={{ fontSize:11, color:G.sub }}>{inv.date}</p>
                        <p style={{ fontSize:11, color:G.sub }}>{inv.amount}</p>
                        <p style={{ fontSize:11, color:G.sub }}>{inv.type}</p>
                        <button style={{ fontSize:10, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:7, padding:"4px 9px", cursor:"pointer", fontFamily:FONT }}>⬇ PDF</button>
                      </div>
                    ))}
                  </div>
                  
                  {/* Mobile cards */}
                  <div className="invoice-mobile" style={{ display:"none" }}>
                    {INVOICES.map((inv, i) => (
                      <div key={i} style={{ padding:"12px 14px", borderBottom:i < INVOICES.length - 1 ? `1px solid #f9fafb` : "none" }}>
                        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-start", marginBottom:8 }}>
                          <div>
                            <p style={{ fontSize:12, fontWeight:600, color:G.navy, marginBottom:2 }}>{inv.id}</p>
                            <p style={{ fontSize:11, color:G.muted }}>{inv.date}</p>
                          </div>
                          <button style={{ fontSize:10, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:7, padding:"4px 9px", cursor:"pointer", fontFamily:FONT }}>⬇ PDF</button>
                        </div>
                        <p style={{ fontSize:11, color:G.sub, marginBottom:2 }}>{inv.type}</p>
                        <p style={{ fontSize:12, fontWeight:600, color:G.text }}>{inv.amount} · {inv.status}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </SCard>
            </div>
          )}

          {/* ─ DANGER ZONE ─ */}
          {active === "danger" && (
            <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
              <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                  <div style={{ flex:1, minWidth:200 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:G.text, marginBottom:4 }}>Export All Data</p>
                    <p style={{ fontSize:12, color:G.sub, lineHeight:1.6 }}>Download all your agency data including contracts, proposals, earnings and team info as a JSON archive.</p>
                  </div>
                  <button style={{ fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:8, padding:"8px 14px", cursor:"pointer", fontFamily:FONT, flexShrink:0 }}>⬇ Export Data</button>
                </div>
              </div>

              <div style={{ background:G.white, border:`1px solid ${G.yellowBorder}`, borderRadius:12, padding:"18px 20px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", flexWrap:"wrap", gap:12 }}>
                  <div style={{ flex:1, minWidth:200 }}>
                    <p style={{ fontSize:13, fontWeight:700, color:"#92400e", marginBottom:4 }}>Deactivate Agency Account</p>
                    <p style={{ fontSize:12, color:G.sub, lineHeight:1.6 }}>Temporarily deactivate your agency. Your profile will be hidden and you won't receive new projects. Reactivate anytime.</p>
                  </div>
                  <button style={{ fontSize:11, fontWeight:700, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:8, padding:"8px 14px", cursor:"pointer", fontFamily:FONT, flexShrink:0 }}>Deactivate</button>
                </div>
              </div>

              <div style={{ background:G.white, border:`1px solid ${G.redBorder}`, borderRadius:12, padding:"18px 20px" }}>
                <p style={{ fontSize:13, fontWeight:700, color:G.red, marginBottom:4 }}>Delete Agency Account</p>
                <p style={{ fontSize:12, color:G.sub, lineHeight:1.6, marginBottom:14 }}>
                  Permanently delete your agency, all contracts, proposals, earnings history and team data. This action <strong>cannot be undone</strong>.
                </p>
                <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:11, fontWeight:600, color:"#374151", marginBottom:6 }}>
                    Type <strong>TechVision Solutions</strong> to confirm:
                  </p>
                  <input
                    value={deleteConfirm}
                    onChange={e => setDeleteConfirm(e.target.value)}
                    placeholder="Type agency name here"
                    style={{ ...inp, borderColor:deleteConfirm === "TechVision Solutions" ? G.red : G.border, maxWidth:360 }}
                  />
                </div>
                <button
                  disabled={deleteConfirm !== "TechVision Solutions"}
                  style={{ fontSize:12, fontWeight:700, padding:"9px 18px", borderRadius:8, border:"none", background:deleteConfirm === "TechVision Solutions" ? G.red : "#f3f4f6", color:deleteConfirm === "TechVision Solutions" ? "#fff" : G.muted, cursor:deleteConfirm === "TechVision Solutions" ? "pointer" : "not-allowed", fontFamily:FONT, transition:"all 0.15s" }}>
                  Delete Agency Permanently
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}

/* ── Primitives ── */
function SCard({ title, desc, children }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden" }}>
      <div style={{ padding:"14px 20px 12px", borderBottom:`1px solid #f3f4f6` }}>
        <p style={{ fontSize:14, fontWeight:700, color:G.navy, marginBottom:3, fontFamily:FONT }}>{title}</p>
        <p style={{ fontSize:11, color:G.muted, fontFamily:FONT }}>{desc}</p>
      </div>
      <div style={{ padding:"18px 20px" }}>{children}</div>
    </div>
  );
}

function FRow({ label, children, full }) {
  return (
    <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize:10, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveRow({ onSave }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", marginTop:16, paddingTop:14, borderTop:`1px solid #f3f4f6` }}>
      <button onClick={onSave} style={sbtn}>Save Changes</button>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{ width:34, height:19, borderRadius:99, background:on ? G.blue : "#e5e7eb", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ width:15, height:15, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:on ? 17 : 2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{ minHeight:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 16px", gap:8, position:"sticky", top:0, zIndex:40, flexWrap:"wrap" }}>
      <img src="/weblance.jpeg" alt="Weblance" style={{ height:38, width:"auto" }} />
      <div style={{ width:1, height:18, background:G.border, marginLeft:2 }} className="hide-mobile" />
      <style>{`
        @media (max-width: 640px) {
          .hide-mobile { display: none !important; }
          .admin-badge { display: none !important; }
        }
      `}</style>
      <span style={{ fontSize:11, color:G.muted, fontWeight:500 }} className="hide-mobile">Agency</span>
      <span style={{ fontSize:11, color:G.border }} className="hide-mobile">/</span>
      <span style={{ fontSize:11, color:G.navy, fontWeight:600 }}>Settings</span>
      <div className="admin-badge" style={{ display:"flex", alignItems:"center", gap:4, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"2px 8px", marginLeft:2 }}>
        <svg width="9" height="9" fill={G.navy} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span style={{ fontSize:10, color:G.navy, fontWeight:700 }}>Agency Admin only</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:16 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:7, height:7, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:30, height:30, borderRadius:"50%", background:G.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:11, fontWeight:700, color:G.white, marginLeft:6, fontFamily:FONT }}>
        RK
      </div>
    </nav>
  );
}