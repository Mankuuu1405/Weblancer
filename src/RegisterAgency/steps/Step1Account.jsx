// Step1Account.jsx
import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

/* ── WebLance 3-color tokens ── */
const G = {
  green:"#6EC030", greenDeep:"#2E7D1F", greenBg:"#f1fce8", greenBorder:"#d4edbb",
  navyLight:"#4A6FA5", navy:"#1A2B5E", navyDeep:"#0F1A3B", navyBg:"#e8edf7", navyBorder:"#b8c6e0",
  gradNavy:"linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
  mixedGrad:"linear-gradient(90deg, #6EC030 0%, #2E7D1F 45%, #1A2B5E 100%)",
  sub:"#4b5563", muted:"#9ca3af", error:"#ef4444",
};

function getStrength(pwd) {
  if (!pwd) return { score:0, label:"", color:"" };
  let s=0;
  if (pwd.length>=8) s++; if (pwd.length>=12) s++;
  if (/[A-Z]/.test(pwd)) s++; if (/[0-9]/.test(pwd)) s++; if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s<=1) return { score:1, label:"Weak",   color:"#ef4444" };
  if (s<=2) return { score:2, label:"Fair",   color:"#f59e0b" };
  if (s<=3) return { score:3, label:"Good",   color:G.navyLight };
  return           { score:4, label:"Strong", color:G.green };
}

function isFree(email) {
  const d = email.split("@")[1];
  return d && FREE_DOMAINS.includes(d.toLowerCase());
}

function isValidEmail(e) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e); }

/* ── Username validation ── */
function checkUsername(username, agencyName) {
  const normalizedUsername   = username.trim().toLowerCase();
  const normalizedAgencyName = agencyName.trim().toLowerCase();
  if (!normalizedUsername) return "";
  if (normalizedUsername === normalizedAgencyName)
    return "Username cannot be the same as your agency name.";
  const nameParts = normalizedAgencyName.split(/\s+/).filter(Boolean);
  const containsPart = nameParts.some(
    part => part.length > 2 && normalizedUsername.includes(part)
  );
  if (containsPart) return "Username should not contain your agency name.";
  return "";
}

const inputBase  = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]";
const idleField   = "border border-gray-200 bg-white hover:border-gray-300";
const errorField  = "border-[1.5px] border-[#ef4444] bg-[#fff5f5] shadow-[0_0_0_3px_rgba(239,68,68,0.10)]";

const InsightCard = ({ type, children }) => {
  const s = {
    warn:    "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-[#f1fce8] border-[#d4edbb] text-[#2E7D1F]",
    error:   "bg-red-50 border-red-200 text-red-800",
    info:    "bg-[#e8edf7] border-[#b8c6e0] text-[#1A2B5E]",
  };
  return (
    <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>
      {children}
    </div>
  );
};

const ErrMsg = ({ msg }) => msg
  ? <p className="text-xs mt-1 font-medium" style={{ color: G.error }}>⚠ {msg}</p>
  : null;

const Step1Account = ({ formData={}, updateData=()=>{}, next=()=>{} }) => {
  const [agencyName, setAgencyName] = useState(formData.agencyName || "");
  const [email,      setEmail]      = useState(formData.email      || "");
  const [country,    setCountry]    = useState(formData.country    || "");
  const [password,   setPassword]   = useState(formData.password   || "");
  const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");
  const [username,   setUsername]   = useState(formData.username   || "");
  const [usernameMsg, setUsernameMsg] = useState("");
  const [touched,    setTouch]      = useState({});

  const touch = f => setTouch(p => ({ ...p, [f]: true }));

  const errors = {
    agencyName: !agencyName.trim() ? "Agency name is required" : agencyName.trim().length < 3 ? "Minimum 3 characters required" : "",
    email:      !email.trim() ? "Email is required" : !isValidEmail(email) ? "Enter a valid email address" : "",
    country:    !country ? "Please select a country" : "",
    password:   !password ? "Password is required" : password.length < 8 ? "Minimum 8 characters required" : "",
    confirm:    !confirm ? "Please confirm your password" : confirm !== password ? "Passwords do not match" : "",
    username:   usernameMsg || "",
  };

  const isValid = Object.values(errors).every(e => e === "");

  /* ── Handlers ── */
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    setUsernameMsg(checkUsername(val, agencyName));
  };

  const handleAgencyNameChange = (e) => {
    const val = e.target.value;
    setAgencyName(val);
    if (username) setUsernameMsg(checkUsername(username, val));
  };

  const handleNext = () => {
    setTouch({ agencyName:true, email:true, country:true, password:true, confirm:true, username:true });
    if (!isValid) return;
    updateData({ agencyName, email, country, password, confirmPassword: confirm, username });
    next();
  };

  const strength       = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;
  const freeEmail      = email.includes("@") && isFree(email);
  const bizEmail       = email.includes("@") && !isFree(email) && isValidEmail(email);
  const nameGood       = agencyName.trim().length >= 5;
  const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
  const hasInsights    = freeEmail || nameGood || bizEmail || (password.length > 0 && password.length < 8) || (username && !usernameMsg);

  const getFieldClass = (field, hasValue) => {
    if (touched[field] && errors[field]) return `${inputBase} ${errorField}`;
    if (hasValue) return `${inputBase} ${activeField}`;
    return `${inputBase} ${idleField}`;
  };

  return (
    <div className="w-full flex justify-center">
      <div className="w-full max-w-4xl flex flex-col lg:flex-row gap-5 items-start">

        {/* ── Form Card ── */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div style={{ height:4, background:G.mixedGrad }} />

            <div className="px-6 sm:px-10 py-9">
              <h2 className="text-2xl font-extrabold mb-1.5" style={{ color:G.navyDeep }}>
                Create Your Agency Account
              </h2>
              <p className="text-sm mb-5" style={{ color:G.sub }}>
                Start by setting up your agency's identity on the platform
              </p>

              <div className="inline-block text-[11px] font-bold px-3.5 py-1.5 rounded-md border tracking-wide mb-5"
                style={{ background:G.navyBg, color:G.navy, borderColor:G.navyBorder }}>
                ACCOUNT CREATED – NOT CONFIGURED
              </div>

              <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
                <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
                <span className="text-xs text-amber-800 leading-relaxed">
                  After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.
                </span>
              </div>

              {/* Agency Name */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
                  Agency Name (Display Name) *
                </label>
                <input type="text" placeholder="e.g., TechVision Digital Agency"
                  value={agencyName} maxLength={50}
                  onChange={handleAgencyNameChange}
                  onBlur={() => touch("agencyName")}
                  className={getFieldClass("agencyName", !!agencyName)} />
                <div className="flex justify-between mt-1">
                  <ErrMsg msg={touched.agencyName && errors.agencyName} />
                  <span className="text-xs ml-auto" style={{ color:G.muted }}>{agencyName.length}/50</span>
                </div>
              </div>

              {/* Username */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
                  Username *
                </label>
                <input type="text" placeholder="e.g. @digital12"
                  value={username} maxLength={30}
                  onChange={handleUsernameChange}
                  onBlur={() => touch("username")}
                  className={getFieldClass("username", !!username)} />
                <ErrMsg msg={(touched.username && usernameMsg) || ""} />
              </div>

              {/* Email */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
                  Business Email Address *
                </label>
                <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all ${
                  touched.email && errors.email ? "border-[#ef4444] bg-[#fff5f5]"
                  : freeEmail ? "border-amber-300 bg-amber-50"
                  : bizEmail  ? "border-[#4A6FA5] bg-[#e8edf7] shadow-[0_0_0_3px_rgba(74,111,165,0.12)]"
                  : "border-gray-200 bg-white"
                }`}>
                  <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
                  <input type="email" placeholder="you@youragency.com" value={email}
                    onChange={e => setEmail(e.target.value)}
                    onBlur={() => touch("email")}
                    className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none" />
                </div>
                <ErrMsg msg={touched.email && errors.email} />
                {!errors.email && freeEmail && (
                  <p className="text-xs text-amber-600 font-semibold mt-1">
                    <MdOutlineWarningAmber size={13} className="inline" /> Business email preferred
                  </p>
                )}
              </div>

              {/* Country */}
              <div className="mb-5">
                <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>
                  Country of Registration *
                </label>
                <div className="relative">
                  <select value={country}
                    onChange={e => setCountry(e.target.value)}
                    onBlur={() => touch("country")}
                    className={`${getFieldClass("country", !!country)} appearance-none cursor-pointer`}>
                    <option value="">Select country</option>
                    {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
                </div>
                <ErrMsg msg={touched.country && errors.country} />
              </div>

              {/* Password Row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Password *</label>
                  <input type="password" placeholder="Min. 8 characters" value={password}
                    onChange={e => setPassword(e.target.value)}
                    onBlur={() => touch("password")}
                    className={getFieldClass("password", !!password)} />
                  {password && (
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex gap-1 flex-1">
                        {bars.map((c, i) => (
                          <div key={i} style={{ background:c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />
                        ))}
                      </div>
                      <span className="text-xs font-semibold" style={{ color:strength.color }}>{strength.label}</span>
                    </div>
                  )}
                  <ErrMsg msg={touched.password && errors.password} />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2" style={{ color:G.navyDeep }}>Confirm Password *</label>
                  <input type="password" placeholder="Re-enter password" value={confirm}
                    onChange={e => setConfirm(e.target.value)}
                    onBlur={() => touch("confirm")}
                    className={getFieldClass("confirm", !!confirm)} />
                  {passwordsMatch && (
                    <p className="text-xs font-semibold mt-1.5 flex items-center gap-1" style={{ color:G.green }}>
                      <MdCheckCircleOutline size={13}/> Passwords match ✓
                    </p>
                  )}
                  <ErrMsg msg={touched.confirm && errors.confirm} />
                </div>
              </div>

              {/* Global error hint */}
              {!isValid && Object.values(touched).some(Boolean) && (
                <div className="mt-5 flex gap-2.5 items-center bg-red-50 border border-red-200 rounded-xl px-4 py-3">
                  <span className="text-red-500 text-base shrink-0">⚠</span>
                  <span className="text-xs text-red-700 font-medium">
                    Please fill all required fields correctly before continuing.
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-end pt-5">
            <button onClick={handleNext}
              className="hover:-translate-y-px text-white border-none rounded-full px-8 py-3.5 text-sm font-bold cursor-pointer transition-all"
              style={{
                background: isValid ? G.gradNavy : "#d1d5db",
                boxShadow: isValid ? "0 3px 14px rgba(15,26,59,0.30)" : "none",
                cursor: isValid ? "pointer" : "not-allowed",
              }}
              onMouseEnter={e => { if(isValid) e.currentTarget.style.opacity="0.88"; }}
              onMouseLeave={e => e.currentTarget.style.opacity="1"}>
              Continue to Admin Setup →
            </button>
          </div>
        </div>

        {/* ── AI Insights ── */}
        <div className="w-full lg:w-[280px] lg:shrink-0 lg:sticky lg:top-6">
          <div className="bg-white rounded-2xl p-5 shadow-sm" style={{ border:`1px solid ${G.greenBorder}` }}>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-xl flex items-center justify-center" style={{ background:G.gradNavy }}>
                <MdAutoAwesome className="text-white text-sm"/>
              </div>
              <span className="text-sm font-bold" style={{ color:G.navyDeep }}>AI Insights</span>
            </div>
            <div className="flex flex-col gap-2.5">
              {freeEmail && (
                <InsightCard type="warn">
                  <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>
                  Business email preferred. Free providers may reduce trust.
                </InsightCard>
              )}
              {nameGood && (
                <InsightCard type="success">
                  <MdCheckCircleOutline className="shrink-0 text-sm"/>
                  Agency name looks good.
                </InsightCard>
              )}
              {bizEmail && !freeEmail && (
                <InsightCard type="success">
                  <MdCheckCircleOutline className="shrink-0 text-sm"/>
                  Business email detected. Great for client trust!
                </InsightCard>
              )}
              {username && !usernameMsg && (
                <InsightCard type="success">
                  <MdCheckCircleOutline className="shrink-0 text-sm"/>
                  Username looks good.
                </InsightCard>
              )}
              {usernameMsg && (
                <InsightCard type="error">
                  <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>
                  {usernameMsg}
                </InsightCard>
              )}
              {password.length > 0 && password.length < 8 && (
                <InsightCard type="error">
                  <MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm"/>
                  Password must be at least 8 characters.
                </InsightCard>
              )}
              {!hasInsights && (
                <div className="text-center py-4">
                  <div className="w-9 h-9 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background:G.greenBg }}>
                    <MdAutoAwesome style={{ color:G.green, fontSize:16 }}/>
                  </div>
                  <p className="text-xs text-center" style={{ color:G.muted }}>
                    Start filling the form to see AI suggestions...
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Step1Account;