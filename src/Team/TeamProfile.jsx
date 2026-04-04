import { useState } from "react";

(() => {
  if (document.getElementById("wl-tp-fonts")) return;
  const l = document.createElement("link");
  l.id = "wl-tp-fonts"; l.rel = "stylesheet";
  l.href = "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap";
  document.head.appendChild(l);
})();

const G = {
  green:       "#22c55e",
  greenDark:   "#16a34a",
  greenDeep:   "#15803d",
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

const MEMBER = {
  name:"Sara Mehta", initials:"SM", designation:"Frontend Developer",
  department:"Engineering", agency:"TechVision Solutions",
  email:"sara.m@techvision.in", phone:"+91 98765 43210",
  city:"Mumbai", timezone:"Asia/Kolkata (IST)", memberSince:"Feb 10, 2026",
  status:"available",
  bio:"Frontend developer with 4 years of experience building modern web apps. Passionate about clean UI, accessibility, and performance. Love working with React and design systems.",
  level:"Senior", availability:"Full-time", workHours:"10:00 AM – 7:00 PM IST", maxProjects:3,
  skills:["React","TypeScript","Tailwind CSS","Figma","Next.js","Redux","Jest","GraphQL"],
  languages:["English","Hindi"],
  github:"https://github.com/sara-mehta",
  linkedin:"https://linkedin.com/in/sara-mehta",
  website:"https://saramehta.dev",
  behance:"", dribbble:"",
  stats:{ projects:4, milestones:12, rating:4.8, tasks:47 },
};

const ALL_SKILLS = ["React","TypeScript","Tailwind CSS","Figma","Next.js","Redux","Jest","GraphQL","Vue","Angular","Node.js","Python","Svelte","Docker","AWS","CSS3","HTML5","Storybook"];

const STATUS_OPTS = [
  { id:"available", label:"Available",  dot:G.green,   bg:G.greenBg,  text:G.greenDark },
  { id:"busy",      label:"Busy",       dot:"#f59e0b", bg:"#fef3c7",  text:"#92400e"   },
  { id:"away",      label:"Away",       dot:"#9ca3af", bg:"#f3f4f6",  text:"#6b7280"   },
];

export default function TeamProfile() {
  const [member,  setMember]  = useState(MEMBER);
  const [editing, setEditing] = useState(null);
  const [saved,   setSaved]   = useState(false);
  const [pwForm,  setPwForm]  = useState({ current:"", next:"", confirm:"" });

  const up   = (k, v) => setMember(p => ({ ...p, [k]: v }));
  const save = () => { setEditing(null); setSaved(true); setTimeout(() => setSaved(false), 3000); };
  const toggleSkill = (skill) => up("skills", member.skills.includes(skill)
    ? member.skills.filter(s => s !== skill)
    : [...member.skills, skill]);

  const currentStatus = STATUS_OPTS.find(s => s.id === member.status) || STATUS_OPTS[0];

  return (
    <div style={{ minHeight:"100vh", background:G.bg, fontFamily:FONT }}>
      <Navbar />

      {/* Save toast */}
      {saved && (
        <div style={{ position:"fixed", top:64, right:24, zIndex:100,
          background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:10,
          padding:"10px 18px", display:"flex", alignItems:"center", gap:8,
          boxShadow:"0 4px 20px rgba(34,197,94,0.18)" }}>
          <span>✅</span>
          <span style={{ fontSize:13, fontWeight:700, color:G.greenDark }}>Profile saved successfully</span>
        </div>
      )}

      {/* Hero banner — dark green gradient */}
      <div style={{ background:"linear-gradient(135deg,#14532d 0%,#166534 60%,#15803d 100%)",
        padding:"32px 28px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-60, right:-60, width:220, height:220,
          borderRadius:"50%", background:"rgba(34,197,94,0.07)", pointerEvents:"none" }} />
        <div style={{ position:"absolute", bottom:-40, left:120, width:160, height:160,
          borderRadius:"50%", background:"rgba(34,197,94,0.05)", pointerEvents:"none" }} />

        <div style={{ maxWidth:940, margin:"0 auto" }}>
          <div style={{ display:"flex", alignItems:"flex-end", gap:20 }}>
            {/* Avatar */}
            <div style={{ position:"relative", flexShrink:0 }}>
              <div style={{ width:88, height:88, borderRadius:22,
                background:`linear-gradient(135deg,${G.green},${G.greenDark})`,
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:28, fontWeight:800, color:G.white, fontFamily:FONT,
                border:"3px solid rgba(255,255,255,0.15)", boxShadow:"0 8px 24px rgba(0,0,0,0.25)" }}>
                {member.initials}
              </div>
              <div style={{ position:"absolute", bottom:4, right:4, width:16, height:16,
                borderRadius:"50%", background:currentStatus.dot,
                border:"2px solid #fff", boxShadow:"0 0 0 2px rgba(0,0,0,0.15)" }} />
            </div>

            {/* Name + meta */}
            <div style={{ flex:1, paddingBottom:20 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:5 }}>
                <h1 style={{ fontSize:24, fontWeight:800, color:G.white, margin:0,
                  letterSpacing:"-0.4px", fontFamily:FONT }}>{member.name}</h1>
                <span style={{ fontSize:12, fontWeight:700,
                  background:"rgba(34,197,94,0.18)", border:"1px solid rgba(34,197,94,0.3)",
                  color:"#86efac", borderRadius:99, padding:"3px 10px" }}>{member.level}</span>
              </div>
              <p style={{ fontSize:14, color:"rgba(255,255,255,0.55)", marginBottom:8 }}>
                {member.designation} · {member.department}
              </p>
              <div style={{ display:"flex", alignItems:"center", gap:12, flexWrap:"wrap" }}>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>🏢 {member.agency}</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>· Member since {member.memberSince}</span>
                <span style={{ fontSize:12, color:"rgba(255,255,255,0.4)" }}>· 📍 {member.city}</span>
              </div>
            </div>

            {/* Status + Edit */}
            <div style={{ display:"flex", gap:8, paddingBottom:20, flexShrink:0 }}>
              <select value={member.status} onChange={e => up("status", e.target.value)}
                style={{ appearance:"none", fontSize:12, fontWeight:700, padding:"7px 14px",
                  borderRadius:99, border:"none", background:currentStatus.bg,
                  color:currentStatus.text, cursor:"pointer", fontFamily:FONT }}>
                {STATUS_OPTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
              <button onClick={() => setEditing(editing ? "" : null)}
                style={{ display:"flex", alignItems:"center", gap:6, fontSize:12, fontWeight:700,
                  background:"rgba(255,255,255,0.1)", border:"1px solid rgba(255,255,255,0.15)",
                  color:"rgba(255,255,255,0.85)", borderRadius:9, padding:"7px 14px",
                  cursor:"pointer", fontFamily:FONT }}>
                ✏️ Edit Profile
              </button>
            </div>
          </div>

          {/* Stats strip */}
          <div style={{ display:"flex", gap:0, borderTop:"1px solid rgba(255,255,255,0.08)", marginTop:4 }}>
            {[
              { label:"Projects",        val:member.stats.projects              },
              { label:"Milestones Done", val:member.stats.milestones            },
              { label:"Avg PM Rating",   val:member.stats.rating + "★"          },
              { label:"Tasks Completed", val:member.stats.tasks                 },
            ].map((s, i, arr) => (
              <div key={i} style={{ flex:1, padding:"14px 0", paddingLeft:i > 0 ? 20 : 0,
                borderRight:i < arr.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none" }}>
                <p style={{ fontSize:10, color:"rgba(255,255,255,0.35)", fontWeight:600,
                  textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{s.label}</p>
                <p style={{ fontSize:22, fontWeight:800, color:"#86efac", margin:0, fontFamily:FONT }}>{s.val}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <main style={{ maxWidth:940, margin:"0 auto", padding:"24px 28px 64px" }}>
        <div style={{ display:"grid", gridTemplateColumns:"1fr 300px", gap:20 }}>

          {/* LEFT */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Personal Info */}
            <Section title="Personal Info" icon="👤" onEdit={() => setEditing(editing === "personal" ? null : "personal")}>
              {editing === "personal" ? (
                <EditGrid>
                  <FRow label="Full Name"><input defaultValue={member.name} onChange={e => up("name", e.target.value)} style={inp} /></FRow>
                  <FRow label="Phone"><input value={member.phone} onChange={e => up("phone", e.target.value)} style={inp} /></FRow>
                  <FRow label="City"><input value={member.city} onChange={e => up("city", e.target.value)} style={inp} /></FRow>
                  <FRow label="Timezone">
                    <select value={member.timezone} onChange={e => up("timezone", e.target.value)} style={{ ...inp, background:G.white }}>
                      {["Asia/Kolkata (IST)","Asia/Dubai (GST)","Europe/London (GMT)","America/New_York (EST)"].map(t => <option key={t}>{t}</option>)}
                    </select>
                  </FRow>
                  <FRow label="Bio" full>
                    <textarea value={member.bio} onChange={e => up("bio", e.target.value)} rows={3} style={{ ...inp, resize:"none", width:"100%" }} />
                  </FRow>
                  <SaveCancel onSave={save} onCancel={() => setEditing(null)} />
                </EditGrid>
              ) : (
                <ViewGrid>
                  <VRow label="Email">
                    {member.email}
                    <span style={{ fontSize:10, color:G.muted, background:"#f3f4f6", padding:"1px 7px", borderRadius:99, marginLeft:6 }}>Set by agency</span>
                  </VRow>
                  <VRow label="Phone">{member.phone}</VRow>
                  <VRow label="City">{member.city}</VRow>
                  <VRow label="Timezone">{member.timezone}</VRow>
                  <VRow label="Bio" full><p style={{ fontSize:13, color:G.sub, lineHeight:1.7, margin:0 }}>{member.bio}</p></VRow>
                </ViewGrid>
              )}
            </Section>

            {/* Role & Skills */}
            <Section title="Role & Skills" icon="🛠️" onEdit={() => setEditing(editing === "skills" ? null : "skills")}>
              {editing === "skills" ? (
                <div>
                  <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12, marginBottom:16 }}>
                    <FRow label="Experience Level">
                      <select value={member.level} onChange={e => up("level", e.target.value)} style={{ ...inp, background:G.white }}>
                        {["Junior","Mid","Senior","Lead"].map(l => <option key={l}>{l}</option>)}
                      </select>
                    </FRow>
                    <FRow label="Languages">
                      <input defaultValue={member.languages.join(", ")} style={inp} />
                    </FRow>
                  </div>
                  <FRow label="Skills (click to toggle)">
                    <div style={{ display:"flex", flexWrap:"wrap", gap:8, marginTop:8 }}>
                      {ALL_SKILLS.map(skill => {
                        const sel = member.skills.includes(skill);
                        return (
                          <button key={skill} onClick={() => toggleSkill(skill)}
                            style={{ fontSize:12, fontWeight:600, padding:"5px 12px", borderRadius:8,
                              border:`1.5px solid ${sel ? G.green : G.border}`,
                              background:sel ? G.greenBg : G.white,
                              color:sel ? G.greenDark : G.sub,
                              cursor:"pointer", fontFamily:FONT, transition:"all 0.12s" }}>
                            {skill}
                          </button>
                        );
                      })}
                    </div>
                  </FRow>
                  <SaveCancel onSave={save} onCancel={() => setEditing(null)} style={{ marginTop:16 }} />
                </div>
              ) : (
                <div>
                  <ViewGrid>
                    <VRow label="Designation">
                      {member.designation}
                      <span style={{ fontSize:10, color:G.muted, background:"#f3f4f6", padding:"1px 7px", borderRadius:99, marginLeft:6 }}>Set by agency</span>
                    </VRow>
                    <VRow label="Department">{member.department}</VRow>
                    <VRow label="Level">{member.level}</VRow>
                    <VRow label="Languages">{member.languages.join(", ")}</VRow>
                  </ViewGrid>
                  <div style={{ marginTop:14 }}>
                    <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:10 }}>Skills</p>
                    <div style={{ display:"flex", flexWrap:"wrap", gap:7 }}>
                      {member.skills.map(s => (
                        <span key={s} style={{ fontSize:12, fontWeight:600, background:G.greenBg, color:G.greenDark, border:`1px solid ${G.greenBorder}`, padding:"4px 12px", borderRadius:8 }}>{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </Section>

            {/* Work Preferences */}
            <Section title="Work Preferences" icon="⚙️" onEdit={() => setEditing(editing === "prefs" ? null : "prefs")}>
              {editing === "prefs" ? (
                <EditGrid>
                  <FRow label="Availability">
                    <select value={member.availability} onChange={e => up("availability", e.target.value)} style={{ ...inp, background:G.white }}>
                      {["Full-time","Part-time","Project-based"].map(a => <option key={a}>{a}</option>)}
                    </select>
                  </FRow>
                  <FRow label="Working Hours">
                    <input value={member.workHours} onChange={e => up("workHours", e.target.value)} style={inp} />
                  </FRow>
                  <FRow label="Max Concurrent Projects">
                    <select value={member.maxProjects} onChange={e => up("maxProjects", Number(e.target.value))} style={{ ...inp, background:G.white }}>
                      {[1,2,3,4,5].map(n => <option key={n} value={n}>{n} project{n > 1 ? "s" : ""}</option>)}
                    </select>
                  </FRow>
                  <SaveCancel onSave={save} onCancel={() => setEditing(null)} />
                </EditGrid>
              ) : (
                <ViewGrid>
                  <VRow label="Availability">{member.availability}</VRow>
                  <VRow label="Working Hours">{member.workHours}</VRow>
                  <VRow label="Max Concurrent Projects">{member.maxProjects} project{member.maxProjects > 1 ? "s" : ""}</VRow>
                </ViewGrid>
              )}
            </Section>

            {/* Change Password */}
            <Section title="Change Password" icon="🔐">
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {[["Current Password","current"],["New Password","next"],["Confirm New Password","confirm"]].map(([label, key]) => (
                  <FRow key={key} label={label}>
                    <input type="password" value={pwForm[key]} onChange={e => setPwForm(p => ({ ...p, [key]:e.target.value }))} placeholder="••••••••••••" style={inp} />
                  </FRow>
                ))}
                <button onClick={save} style={{ alignSelf:"flex-start", ...sbtn }}>Update Password</button>
              </div>
            </Section>
          </div>

          {/* RIGHT SIDEBAR */}
          <div style={{ display:"flex", flexDirection:"column", gap:16 }}>

            {/* Portfolio links */}
            <Section title="Portfolio & Links" icon="🔗" onEdit={() => setEditing(editing === "links" ? null : "links")}>
              {editing === "links" ? (
                <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                  {[["GitHub","github","https://github.com/"],["LinkedIn","linkedin","https://linkedin.com/in/"],["Website","website","https://"],["Behance","behance","https://behance.net/"],["Dribbble","dribbble","https://dribbble.com/"]].map(([label, key, ph]) => (
                    <FRow key={key} label={label}>
                      <input value={member[key]} onChange={e => up(key, e.target.value)} placeholder={ph} style={inp} />
                    </FRow>
                  ))}
                  <SaveCancel onSave={save} onCancel={() => setEditing(null)} />
                </div>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {[
                    { label:"GitHub",   icon:"🐙", url:member.github   },
                    { label:"LinkedIn", icon:"💼", url:member.linkedin },
                    { label:"Website",  icon:"🌐", url:member.website  },
                    { label:"Behance",  icon:"🎨", url:member.behance  },
                    { label:"Dribbble", icon:"🏀", url:member.dribbble },
                  ].filter(l => l.url).map(link => (
                    <a key={link.label} href={link.url} target="_blank" rel="noreferrer"
                      style={{ display:"flex", alignItems:"center", gap:10, padding:"9px 12px",
                        border:`1px solid ${G.border}`, borderRadius:10, textDecoration:"none", transition:"all 0.12s" }}
                      onMouseEnter={e => e.currentTarget.style.borderColor = G.greenBorder}
                      onMouseLeave={e => e.currentTarget.style.borderColor = G.border}>
                      <span style={{ fontSize:16 }}>{link.icon}</span>
                      <div style={{ flex:1 }}>
                        <p style={{ fontSize:12, fontWeight:600, color:G.text }}>{link.label}</p>
                        <p style={{ fontSize:11, color:G.muted, overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap", maxWidth:180 }}>{link.url.replace("https://","")}</p>
                      </div>
                      <svg width="12" height="12" fill="none" stroke={G.muted} viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/>
                      </svg>
                    </a>
                  ))}
                  {![member.github,member.linkedin,member.website,member.behance,member.dribbble].some(Boolean) && (
                    <p style={{ fontSize:13, color:G.muted, textAlign:"center", padding:"16px 0" }}>No links added yet</p>
                  )}
                </div>
              )}
            </Section>

            {/* Agency Info */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Agency Info</p>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:12 }}>
                <div style={{ width:36, height:36, borderRadius:10, background:G.greenBg, border:`1px solid ${G.greenBorder}`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:16 }}>🏢</div>
                <div>
                  <p style={{ fontSize:13, fontWeight:700, color:G.text }}>{member.agency}</p>
                  <p style={{ fontSize:11, color:G.muted }}>Agency Admin: Raj Kumar</p>
                </div>
              </div>
              {[["Member Since", member.memberSince],["Email", member.email]].map(([k, v]) => (
                <div key={k} style={{ display:"flex", justifyContent:"space-between", marginBottom:7 }}>
                  <span style={{ fontSize:12, color:G.muted }}>{k}</span>
                  <span style={{ fontSize:12, fontWeight:600, color:G.text }}>{v}</span>
                </div>
              ))}
              <div style={{ marginTop:12, paddingTop:12, borderTop:"1px solid #f3f4f6" }}>
                <p style={{ fontSize:11, color:G.muted, lineHeight:1.6 }}>Role and designation are managed by your Agency Admin.</p>
              </div>
            </div>

            {/* Quick Notifications */}
            <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, padding:16 }}>
              <p style={{ fontSize:11, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:12 }}>Quick Notifications</p>
              {[
                { label:"Task reminders",  on:true  },
                { label:"Project updates", on:true  },
                { label:"Team messages",   on:true  },
                { label:"Announcements",   on:false },
              ].map((n, i) => <NotifToggleRow key={i} label={n.label} defaultOn={n.on} />)}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

/* ── Primitives ─────────────────────────────────────────────── */
const inp  = { width:"100%", fontSize:13, border:`1.5px solid ${G.border}`, borderRadius:8, padding:"9px 11px", outline:"none", color:G.text, boxSizing:"border-box", fontFamily:FONT };
const sbtn = { fontSize:13, fontWeight:700, padding:"9px 18px", border:"none", background:G.green, color:G.white, borderRadius:9, cursor:"pointer", fontFamily:FONT };

function Section({ title, icon, children, onEdit }) {
  return (
    <div style={{ background:G.white, border:`1px solid ${G.border}`, borderRadius:14, overflow:"hidden" }}>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"14px 18px", borderBottom:"1px solid #f9fafb" }}>
        <div style={{ display:"flex", alignItems:"center", gap:8 }}>
          <span style={{ fontSize:16 }}>{icon}</span>
          <p style={{ fontSize:14, fontWeight:700, color:G.text }}>{title}</p>
        </div>
        {onEdit && (
          <button onClick={onEdit} style={{ fontSize:11, fontWeight:700, color:G.greenDark, background:G.greenBg, border:`1px solid ${G.greenBorder}`, borderRadius:7, padding:"4px 10px", cursor:"pointer", fontFamily:FONT }}>Edit</button>
        )}
      </div>
      <div style={{ padding:"16px 18px" }}>{children}</div>
    </div>
  );
}
function ViewGrid({ children }) { return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>{children}</div>; }
function EditGrid({ children }) { return <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 }}>{children}</div>; }
function VRow({ label, children, full }) {
  return (
    <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
      <p style={{ fontSize:10, fontWeight:700, color:G.muted, textTransform:"uppercase", letterSpacing:"0.07em", marginBottom:4 }}>{label}</p>
      <p style={{ fontSize:13, color:G.text, fontWeight:500 }}>{children}</p>
    </div>
  );
}
function FRow({ label, children, full }) {
  return (
    <div style={{ gridColumn:full ? "1 / -1" : "auto" }}>
      <label style={{ fontSize:11, fontWeight:700, color:G.sub, display:"block", marginBottom:5, textTransform:"uppercase", letterSpacing:"0.06em", fontFamily:FONT }}>{label}</label>
      {children}
    </div>
  );
}
function SaveCancel({ onSave, onCancel }) {
  return (
    <div style={{ gridColumn:"1 / -1", display:"flex", gap:8, paddingTop:4 }}>
      <button onClick={onCancel} style={{ padding:"7px 14px", fontSize:12, fontWeight:600, border:`1px solid ${G.border}`, background:G.white, color:G.sub, borderRadius:8, cursor:"pointer", fontFamily:FONT }}>Cancel</button>
      <button onClick={onSave} style={{ ...sbtn, fontSize:12, padding:"7px 14px" }}>Save</button>
    </div>
  );
}
function NotifToggleRow({ label, defaultOn }) {
  const [on, setOn] = useState(defaultOn);
  return (
    <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:10 }}>
      <span style={{ fontSize:12, color:G.sub }}>{label}</span>
      <div onClick={() => setOn(!on)} style={{ width:34, height:18, borderRadius:99, background:on ? G.green : G.border, cursor:"pointer", position:"relative", transition:"background 0.2s" }}>
        <div style={{ width:14, height:14, borderRadius:"50%", background:G.white, position:"absolute", top:2, left:on ? 18 : 2, transition:"left 0.2s", boxShadow:"0 1px 3px rgba(0,0,0,0.2)" }} />
      </div>
    </div>
  );
}
function Navbar() {
  return (
    <nav style={{ height:52, background:G.white, borderBottom:`1px solid ${G.border}`, display:"flex", alignItems:"center", padding:"0 28px", gap:12, position:"sticky", top:0, zIndex:40 }}>
      <span style={{ fontWeight:800, fontSize:18, color:G.text, letterSpacing:"-0.5px", fontFamily:FONT }}>
        <span style={{ color:G.green }}>web</span>lance
      </span>
      <div style={{ width:1, height:20, background:G.border }} />
      <span style={{ fontSize:12, color:G.muted, fontWeight:500 }}>Team</span>
      <span style={{ fontSize:12, color:G.border }}>/</span>
      <span style={{ fontSize:12, color:G.text, fontWeight:600 }}>Profile</span>
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