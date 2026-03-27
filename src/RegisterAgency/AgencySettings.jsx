


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

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      {/* Page header */}
      <header style={{ background:G.white, borderBottom:`1px solid ${G.border}` }}>
        <div style={{ maxWidth:1160, margin:"0 auto", padding:"20px 28px 16px" }}>
          <h1 style={{ fontSize:22, fontWeight:800, color:G.navy, margin:0, letterSpacing:"-0.4px", fontFamily:FONT }}>Settings</h1>
          <p style={{ fontSize:13, color:G.muted, marginTop:3 }}>Manage your agency profile, security and preferences</p>
        </div>
      </header>

      {/* Toast */}
      {saved && (
        <div style={{ position:"fixed", top:64, right:24, zIndex:100, background:G.white, border:`1.5px solid ${G.blueBorder}`, borderRadius:10, padding:"10px 18px", display:"flex", alignItems:"center", gap:8, boxShadow:"0 4px 20px rgba(27,114,192,0.15)" }}>
          <span style={{ fontSize:15 }}>✅</span>
          <span style={{ fontSize:13, fontWeight:700, color:G.navy, fontFamily:FONT }}>Settings saved successfully</span>
        </div>
      )}

      <div style={{ maxWidth:1160, margin:"0 auto", padding:"24px 28px 64px", display:"grid", gridTemplateColumns:"210px 1fr", gap:20 }}>

        {/* ── Sidebar nav ── */}
        <div>
          <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, overflow:"hidden", position:"sticky", top:68 }}>
            {NAV_SECTIONS.map((s, i) => {
              const isActive = active === s.id;
              const isDanger = s.id === "danger";
              return (
                <button key={s.id} onClick={() => setActive(s.id)} style={{
                  display:"flex", alignItems:"center", gap:9, width:"100%",
                  padding:"11px 14px", fontSize:13,
                  fontWeight: isActive ? 700 : 500,
                  color: isDanger ? G.red : isActive ? G.navy : G.text,
                  background: isActive ? G.blueBg : G.white,
                  border:"none",
                  borderLeft: isActive ? `3px solid ${G.blue}` : "3px solid transparent",
                  borderBottom: i < NAV_SECTIONS.length - 1 ? `1px solid #f3f4f6` : "none",
                  cursor:"pointer", textAlign:"left",
                  transition:"all 0.12s", fontFamily:FONT,
                }}>
                  <span style={{ fontSize:15 }}>{s.icon}</span>
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
              <div style={{ display:"flex", alignItems:"center", gap:16, marginBottom:22, paddingBottom:22, borderBottom:`1px solid #f3f4f6` }}>
                <div style={{ width:68, height:68, borderRadius:14, background:G.blueBg, border:`2px dashed ${G.blueBorder}`, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, cursor:"pointer" }}>
                  <span style={{ fontSize:24 }}>🏢</span>
                </div>
                <div>

                  <p style={{ fontSize:13, fontWeight:600, color:G.text, marginBottom:4 }}>Agency Logo</p>
                  <p style={{ fontSize:12, color:G.muted, marginBottom:8 }}>PNG or JPG, max 2MB · 400×400px recommended</p>
                  <div style={{ display:"flex", gap:8 }}>
                    <label style={{ fontSize:12, fontWeight:700, color:G.navy, background:G.blueBg, border:`1.5px solid ${G.blueBorder}`, borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>
                      Upload Logo <input type="file" style={{ display:"none" }} />
                    </label>
                    <button style={{ fontSize:12, color:G.muted, background:"#f3f4f6", border:"none", borderRadius:7, padding:"5px 12px", cursor:"pointer", fontFamily:FONT }}>Remove</button>
                  </div>
                </div>
              </div>

              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
                <FRow label="Agency Name" full>
                  <input value={profile.name} onChange={e => up("name", e.target.value)} style={inp} />
                </FRow>
                <FRow label="Tagline" full>
                  <input value={profile.tagline} onChange={e => up("tagline", e.target.value)} placeholder="e.g. Full-Stack Web & Mobile Agency" style={inp} />
                </FRow>
                <FRow label="About / Bio" full>
                  <textarea value={profile.bio} onChange={e => up("bio", e.target.value)} rows={4} style={{ ...inp, resize:"none" }} />
                </FRow>
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

              <div style={{ marginTop:18 }}>
                <p style={{ fontSize:11, fontWeight:700, color:G.sub, marginBottom:10, textTransform:"uppercase", letterSpacing:"0.06em" }}>Service Categories</p>
                <div style={{ display:"flex", flexWrap:"wrap", gap:8 }}>
                  {["Web Development","Mobile Apps","UI/UX Design","AI & ML","DevOps","Data Engineering"].map(cat => {
                    const sel = profile.categories.includes(cat);
                    return (
                      <button key={cat}
                        onClick={() => up("categories", sel ? profile.categories.filter(c => c !== cat) : [...profile.categories, cat])}
                        style={{ fontSize:12, fontWeight:600, padding:"6px 14px", borderRadius:99, border:`1.5px solid ${sel ? G.blue : G.border}`, background:sel ? G.blueBg : G.white, color:sel ? G.navy : G.sub, cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
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
              <div style={{ background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:10, padding:"10px 14px", marginBottom:18, display:"flex", gap:8, alignItems:"flex-start" }}>
                <span style={{ fontSize:14 }}>🔒</span>
                <p style={{ fontSize:12, color:"#92400e", fontFamily:FONT }}>
                  Sensitive fields (PAN, Aadhaar, GST) are managed through KYC.{" "}
                  <a href="/agency/kyc" style={{ color:G.navy, fontWeight:700 }}>Edit in KYC →</a>
                </p>
              </div>
              <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
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
                    <span style={{ position:"absolute", right:10, top:"50%", transform:"translateY(-50%)", fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, padding:"2px 8px", borderRadius:99 }}>VERIFIED ✓</span>
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
                <div style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                  <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>Event</p>
                  {["Email","In-App","SMS"].map(h => (
                    <p key={h} style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", textAlign:"center" }}>{h}</p>
                  ))}
                </div>
                {notifRows.map((row, i) => (
                  <div key={i}
                    style={{ display:"grid", gridTemplateColumns:"1fr 80px 80px 80px", padding:"12px 16px", borderBottom:i < notifRows.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center", transition:"background 0.1s" }}
                    onMouseEnter={e => e.currentTarget.style.background = "#fafafa"}
                    onMouseLeave={e => e.currentTarget.style.background = "transparent"}>
                    <p style={{ fontSize:13, color:G.text, fontFamily:FONT }}>{row.label}</p>
                    {["email","app","sms"].map(col => (
                      <div key={col} style={{ display:"flex", justifyContent:"center" }}>
                        <Toggle on={row[col]} onChange={() => toggleNotif(i, col)} />
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <SaveRow onSave={handleSave} />
            </SCard>
          )}

          {/* ─ SECURITY ─ */}
          {active === "security" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <SCard title="Change Password" desc="Update your account password">
                <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                  {["Current Password","New Password","Confirm New Password"].map(label => (
                    <FRow key={label} label={label}>
                      <input type="password" placeholder="••••••••••••" style={inp} />
                    </FRow>
                  ))}
                </div>
                <div style={{ marginTop:16 }}>
                  <button onClick={handleSave} style={sbtn}>Update Password</button>
                </div>
              </SCard>

              <SCard title="Two-Factor Authentication" desc="Add an extra layer of security to your account">
                <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 16px", border:`1.5px solid ${twoFA ? G.blueBorder : G.border}`, borderRadius:10, background:twoFA ? G.blueBg : G.white, transition:"all 0.15s" }}>
                  <div style={{ display:"flex", alignItems:"center", gap:12 }}>
                    <span style={{ fontSize:20 }}>🔐</span>
                    <div>
                      <p style={{ fontSize:13, fontWeight:600, color:G.text }}>Authenticator App (TOTP)</p>
                      <p style={{ fontSize:12, color:G.muted }}>Use Google Authenticator or Authy</p>
                    </div>
                  </div>
                  <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                    {twoFA && <span style={{ fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px" }}>Enabled</span>}
                    <Toggle on={twoFA} onChange={() => setTwoFA(!twoFA)} />
                  </div>
                </div>
              </SCard>

              <SCard title="Active Sessions" desc="Devices currently logged in to your account">
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {sessions.map((s, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:12, padding:"12px 14px", border:`1.5px solid ${s.current ? G.blueBorder : G.border}`, borderRadius:10, background:s.current ? G.blueBg : G.white }}>
                      <span style={{ fontSize:18 }}>{s.device.includes("iPhone") ? "📱" : "💻"}</span>
                      <div style={{ flex:1 }}>
                        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
                          <p style={{ fontSize:13, fontWeight:600, color:G.text }}>{s.device}</p>
                          {s.current && (
                            <span style={{ fontSize:10, fontWeight:700, background:G.grad, color:"#fff", borderRadius:99, padding:"2px 8px" }}>Current</span>
                          )}
                        </div>
                        <p style={{ fontSize:11, color:G.muted, marginTop:2 }}>{s.location} · {s.ip} · {s.time}</p>
                      </div>
                      {!s.current && (
                        <button onClick={() => setSessions(prev => prev.filter((_, j) => j !== i))}
                          style={{ fontSize:11, fontWeight:700, color:G.red, background:G.redBg, border:`1px solid ${G.redBorder}`, borderRadius:7, padding:"5px 10px", cursor:"pointer", fontFamily:FONT }}>
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
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <SCard title="Current Plan" desc="Your Weblance subscription and commission details">
                <div style={{ background:G.grad, borderRadius:12, padding:"20px 22px" }}>
                  <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                    <div>
                      <p style={{ fontSize:11, color:"rgba(255,255,255,0.4)", fontWeight:700, textTransform:"uppercase", letterSpacing:"0.08em", marginBottom:6 }}>Current Plan</p>
                      <p style={{ fontSize:26, fontWeight:800, color:"#bfdbfe", fontFamily:FONT, letterSpacing:"-0.5px" }}>Agency Pro</p>
                      <p style={{ fontSize:13, color:"rgba(255,255,255,0.5)", marginTop:4 }}>6% platform commission · No monthly fee</p>
                    </div>
                    <span style={{ background:"rgba(255,255,255,0.15)", border:"1px solid rgba(255,255,255,0.25)", borderRadius:99, padding:"5px 14px", fontSize:12, fontWeight:700, color:"#fff" }}>Active</span>
                  </div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr", gap:12, marginTop:18 }}>
                    {[["Commission Rate","6% per transaction"],["Billing Model","Pay as you earn"],["Payout","Anytime, min ₹1,000"]].map(([k, v]) => (
                      <div key={k} style={{ background:"rgba(255,255,255,0.10)", borderRadius:9, padding:"10px 12px" }}>
                        <p style={{ fontSize:10, color:"rgba(255,255,255,0.4)", fontWeight:600, marginBottom:4, textTransform:"uppercase", letterSpacing:"0.05em" }}>{k}</p>
                        <p style={{ fontSize:12, fontWeight:600, color:"rgba(255,255,255,0.85)" }}>{v}</p>
                      </div>
                    ))}
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
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"10px 16px", background:"#fafafa", borderBottom:`1px solid #f3f4f6` }}>
                    {["Invoice","Date","Amount","Type",""].map(h => (
                      <p key={h} style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em" }}>{h}</p>
                    ))}
                  </div>
                  {INVOICES.map((inv, i) => (
                    <div key={i} style={{ display:"grid", gridTemplateColumns:"1fr 1fr 1fr 1fr 100px", padding:"12px 16px", borderBottom:i < INVOICES.length - 1 ? `1px solid #f9fafb` : "none", alignItems:"center" }}>
                      <p style={{ fontSize:12, fontWeight:600, color:G.navy }}>{inv.id}</p>
                      <p style={{ fontSize:12, color:G.sub }}>{inv.date}</p>
                      <p style={{ fontSize:12, color:G.sub }}>{inv.amount}</p>
                      <p style={{ fontSize:12, color:G.sub }}>{inv.type}</p>
                      <button style={{ fontSize:11, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>⬇ PDF</button>
                    </div>
                  ))}
                </div>
              </SCard>
            </div>
          )}

          {/* ─ DANGER ZONE ─ */}
          {active === "danger" && (
            <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
              <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:12, padding:"22px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:G.text, marginBottom:4 }}>Export All Data</p>
                    <p style={{ fontSize:13, color:G.sub, lineHeight:1.6 }}>Download all your agency data including contracts, proposals, earnings and team info as a JSON archive.</p>
                  </div>
                  <button style={{ fontSize:12, fontWeight:700, color:G.navy, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>⬇ Export Data</button>
                </div>
              </div>

              <div style={{ background:G.white, border:`1px solid ${G.yellowBorder}`, borderRadius:12, padding:"22px" }}>
                <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
                  <div>
                    <p style={{ fontSize:14, fontWeight:700, color:"#92400e", marginBottom:4 }}>Deactivate Agency Account</p>
                    <p style={{ fontSize:13, color:G.sub, lineHeight:1.6 }}>Temporarily deactivate your agency. Your profile will be hidden and you won't receive new projects. Reactivate anytime.</p>
                  </div>
                  <button style={{ fontSize:12, fontWeight:700, color:"#92400e", background:G.yellowBg, border:`1px solid ${G.yellowBorder}`, borderRadius:8, padding:"8px 16px", cursor:"pointer", fontFamily:FONT, flexShrink:0, marginLeft:16 }}>Deactivate</button>
                </div>
              </div>

              <div style={{ background:G.white, border:`1px solid ${G.redBorder}`, borderRadius:12, padding:"22px" }}>
                <p style={{ fontSize:14, fontWeight:700, color:G.red, marginBottom:4 }}>Delete Agency Account</p>
                <p style={{ fontSize:13, color:G.sub, lineHeight:1.6, marginBottom:16 }}>
                  Permanently delete your agency, all contracts, proposals, earnings history and team data. This action <strong>cannot be undone</strong>.
                </p>
                <div style={{ marginBottom:12 }}>
                  <p style={{ fontSize:12, fontWeight:600, color:"#374151", marginBottom:6 }}>
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
                  style={{ fontSize:13, fontWeight:700, padding:"9px 20px", borderRadius:8, border:"none", background:deleteConfirm === "TechVision Solutions" ? G.red : "#f3f4f6", color:deleteConfirm === "TechVision Solutions" ? "#fff" : G.muted, cursor:deleteConfirm === "TechVision Solutions" ? "pointer" : "not-allowed", fontFamily:FONT, transition:"all 0.15s" }}>
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
      <div style={{ padding:"16px 22px 14px", borderBottom:`1px solid #f3f4f6` }}>
        <p style={{ fontSize:15, fontWeight:700, color:G.navy, marginBottom:3, fontFamily:FONT }}>{title}</p>
        <p style={{ fontSize:12, color:G.muted, fontFamily:FONT }}>{desc}</p>
      </div>
      <div style={{ padding:"20px 22px" }}>{children}</div>
    </div>
  );
}

function FRow({ label, children, full }) {
  return (
    <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:6, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>
        {label}
      </label>
      {children}
    </div>
  );
}

function SaveRow({ onSave }) {
  return (
    <div style={{ display:"flex", justifyContent:"flex-end", marginTop:18, paddingTop:16, borderTop:`1px solid #f3f4f6` }}>
      <button onClick={onSave} style={sbtn}>Save Changes</button>
    </div>
  );
}

function Toggle({ on, onChange }) {
  return (
    <div onClick={onChange} style={{ width:36, height:20, borderRadius:99, background:on ? G.blue : "#e5e7eb", cursor:"pointer", position:"relative", transition:"background 0.2s", flexShrink:0 }}>
      <div style={{ width:16, height:16, borderRadius:"50%", background:"#fff", position:"absolute", top:2, left:on ? 18 : 2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.15)" }} />
    </div>
  );
}

function Navbar() {
  return (
    <nav style={{ height:56, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <img src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block"}} />
      <div style={{ width:1, height:20, background:G.border, marginLeft:4 }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Agency</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.navy, fontWeight:600 }}>Settings</span>
      <div style={{ display:"flex", alignItems:"center", gap:5, background:G.blueBg, border:`1px solid ${G.blueBorder}`, borderRadius:99, padding:"3px 10px", marginLeft:4 }}>
        <svg width="10" height="10" fill={G.navy} viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
        </svg>
        <span style={{ fontSize:11, color:G.navy, fontWeight:700 }}>Agency Admin only</span>
      </div>
      <div style={{ flex:1 }} />
      <div style={{ position:"relative", cursor:"pointer" }}>
        <span style={{ fontSize:18 }}>🔔</span>
        <div style={{ position:"absolute", top:-1, right:-1, width:8, height:8, borderRadius:"50%", background:G.red, border:`1.5px solid ${G.white}` }} />
      </div>
      <div style={{ width:32, height:32, borderRadius:"50%", background:G.grad, display:"flex", alignItems:"center", justifyContent:"center", fontSize:12, fontWeight:700, color:G.white, marginLeft:8, fontFamily:FONT }}>
        RK
      </div>
    </nav>
  );
}