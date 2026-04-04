import { useState, useMemo } from "react";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Argentina","Australia","Austria",
  "Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia",
  "Croatia","Czech Republic","Denmark","Egypt","Ethiopia","Finland",
  "France","Germany","Ghana","Greece","Hungary","India","Indonesia",
  "Iran","Iraq","Ireland","Israel","Italy","Japan","Jordan","Kenya",
  "Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria",
  "Norway","Pakistan","Peru","Philippines","Poland","Portugal",
  "Romania","Russia","Saudi Arabia","Singapore","South Africa",
  "South Korea","Spain","Sri Lanka","Sweden","Switzerland","Taiwan",
  "Thailand","Turkey","Ukraine","United Arab Emirates",
  "United Kingdom","United States","Vietnam",
];

/* ── WebLance tokens ── */
const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  gradGreen:"linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af",
};

function getStrength(pwd) {
  if (!pwd) return { score:0, label:"", bars:0, clr:"#e2e8f0" };
  let score=0;
  if (pwd.length>=8) score++; if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++; if (/[^A-Za-z0-9]/.test(pwd)) score++;
  const map = {
    1:{ label:"Weak",   bars:1, clr:"#ef4444" },
    2:{ label:"Fair",   bars:2, clr:"#f97316" },
    3:{ label:"Good",   bars:3, clr:G.navyLight },
    4:{ label:"Strong", bars:4, clr:G.green },
  };
  return map[score] || { label:"", bars:0, clr:"#e2e8f0" };
}

/* ─── Username validation helper ────────────────────────── */
function checkUsername(username, fullName) {
  const normalizedUsername = username.trim().toLowerCase();
  const normalizedFullName = fullName.trim().toLowerCase();

  if (!normalizedUsername) return "";

  if (normalizedUsername === normalizedFullName)
    return "Username cannot be your full name.";

  const nameParts = normalizedFullName.split(/\s+/).filter(Boolean);
  const containsNamePart = nameParts.some(
    part => part.length > 2 && normalizedUsername.includes(part)
  );

  if (containsNamePart)
    return "Username should not contain your first or last name.";

  return "";
}

const inputStyle = { border:`1px solid ${G.greenBorder}`, backgroundColor:"white", color:"#1e293b" };
const focusColor = G.navyLight;

export default function AccountStep({ formData, updateData, next }) {
  const [showPwd, setShowPwd]         = useState(false);
  const [agreed, setAgreed]           = useState(false);
  const [usernameMsg, setUsernameMsg] = useState("");
  const [local, setLocal]             = useState({
    fullName:        formData?.fullName        || "",
    email:           formData?.email           || "",
    country:         formData?.country         || "",
    username:        formData?.username        || "",
    password:        formData?.password        || "",
    confirmPassword: formData?.confirmPassword || "",
  });

  const set = (field) => (e) => setLocal(f=>({...f,[field]:e.target.value}));

  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setLocal(f => ({ ...f, username: val }));
    setUsernameMsg(checkUsername(val, local.fullName));
  };

  const handleFullNameChange = (e) => {
    const val = e.target.value;
    setLocal(f => ({ ...f, fullName: val }));
    if (local.username) setUsernameMsg(checkUsername(local.username, val));
  };

  const strength    = useMemo(()=>getStrength(local.password),[local.password]);
  const nameValid   = local.fullName.trim().length >= 2;
  const emailValid  = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(local.email);
  const pwdMatch    = local.password && local.confirmPassword && local.password===local.confirmPassword;
  const pwdMismatch = local.confirmPassword && local.password!==local.confirmPassword;

  const canSubmit = nameValid && emailValid && local.country && local.username.trim() &&
    !usernameMsg && local.password.length>=8 && pwdMatch && agreed;

  const insights = [
    nameValid  && { text:"Name looks good." },
    emailValid && { text:"Email format valid." },
    local.country && { text:`Country set: ${local.country}` },
    local.username && !usernameMsg && { text:"Username looks good." },
    strength.label==="Strong" && { text:"Password is strong." },
    pwdMatch   && { text:"Passwords match ✓" },
  ].filter(Boolean);

  const handleNext = () => { updateData(local); next(); };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ══ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 4px 24px rgba(110,192,48,0.08)" }}>
          {/* Top accent */}
          <div style={{ height:4, background:G.mixedGrad }}/>

          <div className="p-8 sm:p-10">
            <h1 className="text-2xl font-extrabold mb-1" style={{ color:G.navyDeep }}>Let's Get Started</h1>
            <p className="text-sm mb-6" style={{ color:G.sub }}>Takes less than 60 seconds</p>

            {/* Badge — Navy */}
            <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
              style={{ backgroundColor:G.navyBg, color:G.navy, border:`1px solid ${G.navyBorder}` }}>
              Client Account
            </span>

            {/* Info box */}
            <div className="rounded-xl px-5 py-4 mb-6 text-sm"
              style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
              We keep signup simple. You'll provide details when needed, not all at once.
            </div>

            {/* Social buttons */}
            <div className="flex flex-col gap-3 mb-5">
              <SocialButton label="Continue with Google" icon={
                <svg className="w-5 h-5" viewBox="0 0 48 48">
                  <path fill="#FFC107" d="M43.6 20H24v8h11.3C33.7 33.4 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20c11 0 20-9 20-20 0-1.3-.1-2.7-.4-4z"/>
                  <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.6 15.1 19 12 24 12c3.1 0 5.8 1.1 7.9 3l5.7-5.7C34.2 6.5 29.4 4 24 4 16.3 4 9.7 8.4 6.3 14.7z"/>
                  <path fill="#4CAF50" d="M24 44c5.2 0 9.9-1.9 13.5-5L31 33.5C29.1 34.8 26.7 36 24 36c-5.3 0-9.7-3.6-11.3-8.4l-6.6 5C9.7 39.5 16.3 44 24 44z"/>
                  <path fill="#1976D2" d="M43.6 20H24v8h11.3c-.8 2.2-2.2 4-4 5.3L37.5 39c3.4-3.2 5.5-7.7 5.5-15 0-1.3-.1-2.7-.4-4z"/>
                </svg>
              }/>
              <SocialButton label="Continue with LinkedIn" icon={
                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              }/>
            </div>

            {/* Divider */}
            <div className="flex items-center gap-3 mb-6">
              <div className="flex-1 h-px" style={{ backgroundColor:G.greenBorder }}/>
              <span className="text-sm" style={{ color:G.muted }}>or sign up with email</span>
              <div className="flex-1 h-px" style={{ backgroundColor:G.greenBorder }}/>
            </div>

            {/* Fields */}
            <div className="flex flex-col gap-5">

              <Field label="Full Name *">
                <input type="text" placeholder="John Smith" value={local.fullName} onChange={handleFullNameChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={e=>e.target.style.borderColor=focusColor} onBlur={e=>e.target.style.borderColor=G.greenBorder}/>
              </Field>

              <Field label="Username *">
                <input type="text" placeholder="@John12" value={local.username} onChange={handleUsernameChange}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    ...inputStyle,
                    borderColor: usernameMsg ? "#ef4444" : G.greenBorder,
                    backgroundColor: usernameMsg ? "#fef2f2" : "white",
                  }}
                  onFocus={e=>e.target.style.borderColor=usernameMsg ? "#ef4444" : focusColor}
                  onBlur={e=>e.target.style.borderColor=usernameMsg ? "#ef4444" : G.greenBorder}/>
                {usernameMsg && (
                  <span className="flex items-center gap-1.5 text-xs font-semibold mt-1" style={{ color: "#ef4444" }}>
                    <svg className="w-3.5 h-3.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                    </svg>
                    {usernameMsg}
                  </span>
                )}
              </Field>

              <Field label="Email Address *">
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2" style={{ color:G.muted }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                  <input type="email" placeholder="you@example.com" value={local.email} onChange={set("email")}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={e=>e.target.style.borderColor=focusColor} onBlur={e=>e.target.style.borderColor=G.greenBorder}/>
                </div>
              </Field>

              <Field label="Country *">
                <div className="relative">
                  <select value={local.country} onChange={set("country")}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none transition-all"
                    style={{ ...inputStyle, color:local.country?"#1e293b":G.muted }}
                    onFocus={e=>e.target.style.borderColor=focusColor} onBlur={e=>e.target.style.borderColor=G.greenBorder}>
                    <option value="" disabled>Select country</option>
                    {COUNTRIES.map(c=><option key={c} value={c} style={{ color:"#1e293b" }}>{c}</option>)}
                  </select>
                  <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none" style={{ color:G.muted }}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </span>
                </div>
              </Field>

              {/* Password row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>Password *</label>
                  <div className="relative">
                    <input type={showPwd?"text":"password"} placeholder="8+ characters" value={local.password} onChange={set("password")}
                      className="w-full px-4 py-3 pr-11 rounded-xl text-sm outline-none transition-all"
                      style={inputStyle}
                      onFocus={e=>e.target.style.borderColor=focusColor} onBlur={e=>e.target.style.borderColor=G.greenBorder}/>
                    <button type="button" onClick={()=>setShowPwd(p=>!p)}
                      className="absolute right-3 top-1/2 -translate-y-1/2" style={{ color:G.muted }}>
                      {showPwd
                        ? <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.8"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="1.8"/></svg>}
                    </button>
                  </div>
                  {local.password && (
                    <div className="flex flex-col gap-1 mt-1">
                      <div className="flex gap-1">
                        {[1,2,3,4].map(i=>(
                          <div key={i} className="flex-1 h-1.5 rounded-full transition-all duration-300"
                            style={{ backgroundColor:i<=strength.bars?strength.clr:"#e2e8f0" }}/>
                        ))}
                      </div>
                      <span className="text-xs font-semibold" style={{ color:strength.clr }}>{strength.label}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>Confirm Password *</label>
                  <input type="password" placeholder="Re-enter password" value={local.confirmPassword} onChange={set("confirmPassword")}
                    className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={{ ...inputStyle, borderColor:pwdMismatch?"#ef4444":pwdMatch?G.green:G.greenBorder }}
                    onFocus={e=>e.target.style.borderColor=focusColor}
                    onBlur={e=>e.target.style.borderColor=pwdMismatch?"#ef4444":pwdMatch?G.green:G.greenBorder}/>
                  {local.confirmPassword && (
                    <span className="text-xs font-semibold mt-1" style={{ color:pwdMatch?G.green:"#ef4444" }}>
                      {pwdMatch?"Passwords match ✓":"Passwords do not match"}
                    </span>
                  )}
                </div>
              </div>

              {/* Role pill — Navy */}
              <div className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                style={{ backgroundColor:G.navyBg, border:`1px solid ${G.navyBorder}` }}>
                <span className="text-xs font-bold px-2 py-0.5 rounded" style={{ backgroundColor:G.navy, color:"#fff" }}>Client</span>
                <span style={{ color:G.sub }}>Role auto-selected: Posting Projects</span>
              </div>

              {/* What's NOT asked */}
              <div className="rounded-xl px-6 py-5" style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}` }}>
                <p className="text-sm font-semibold mb-3" style={{ color:G.navyDeep }}>What's NOT asked yet:</p>
                <div className="flex flex-col gap-2">
                  {["Company information","Payment details","Project requirements"].map(item=>(
                    <div key={item} className="flex items-center gap-2.5 text-sm" style={{ color:G.sub }}>
                      <span className="text-base">❌</span>{item}
                    </div>
                  ))}
                </div>
              </div>

              {/* Terms */}
              <label className="flex items-start gap-3 cursor-pointer text-sm" style={{ color:"#374151" }}>
                <input type="checkbox" checked={agreed} onChange={e=>setAgreed(e.target.checked)}
                  className="mt-0.5 w-4 h-4 rounded flex-shrink-0" style={{ accentColor:G.navyLight }}/>
                <span>
                  I agree to the{" "}
                  <a href="#" className="font-semibold underline" style={{ color:G.navy }}>Terms of Service</a>
                  {" "}and{" "}
                  <a href="#" className="font-semibold underline" style={{ color:G.navy }}>Privacy Policy</a>
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Button — gradNavy */}
        <div className="flex justify-end mt-6 pb-10">
          <button disabled={!canSubmit} onClick={handleNext}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-full text-white text-sm transition-all"
            style={{ background:canSubmit?G.gradNavy:"#d1d5db", boxShadow:canSubmit?"0 3px 14px rgba(15,26,59,0.30)":"none", cursor:canSubmit?"pointer":"not-allowed" }}
            onMouseEnter={e=>{ if(canSubmit) e.currentTarget.style.opacity="0.88"; }}
            onMouseLeave={e=>e.currentTarget.style.opacity="1"}>
            Create Account
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT: AI Insights ══ */}
      <div className="hidden lg:flex flex-col gap-3 w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5" style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, boxShadow:"0 2px 12px rgba(110,192,48,0.06)" }}>
          <div className="flex items-center gap-2 mb-4">
            <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}>
              <svg className="w-4 h-4 text-white" fill="none" stroke="white" viewBox="0 0 24 24"><path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <span className="font-bold text-sm" style={{ color:G.navyDeep }}>AI Insights</span>
          </div>
          {insights.length===0
            ? <p className="text-xs" style={{ color:G.muted }}>Start filling in the form to see real-time feedback.</p>
            : <div className="flex flex-col gap-2">
                {insights.map((item,i)=>(
                  <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                    style={{ backgroundColor:G.greenBg, border:`1px solid ${G.greenBorder}`, color:G.greenDeep }}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke={G.green} viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                    {item.text}
                  </div>
                ))}
              </div>
          }
        </div>
      </div>
    </div>
  );
}

function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold" style={{ color:G.navyDeep }}>{label}</label>
      {children}
    </div>
  );
}

function SocialButton({ label, icon }) {
  return (
    <button className="w-full flex items-center justify-center gap-3 px-5 py-3.5 rounded-xl text-sm font-semibold transition-all"
      style={{ backgroundColor:"white", border:`1px solid ${G.greenBorder}`, color:"#374151" }}
      onMouseOver={e=>e.currentTarget.style.borderColor=G.navyLight}
      onMouseOut={e=>e.currentTarget.style.borderColor=G.greenBorder}>
      {icon}{label}
    </button>
  );
}