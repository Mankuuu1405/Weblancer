import React, { useState } from "react";
import { MdOutlineEmail, MdOutlineWarningAmber, MdCheckCircleOutline, MdAutoAwesome } from "react-icons/md";

const COUNTRIES = ["India","United States","United Kingdom","Canada","Australia","Germany","France","Singapore","UAE","Pakistan","Bangladesh","Nigeria","South Africa","Brazil","Philippines"];
const FREE_DOMAINS = ["gmail.com","yahoo.com","hotmail.com","outlook.com","aol.com","icloud.com","protonmail.com","ymail.com"];

function getStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "" };
  let s = 0;
  if (pwd.length >= 8)          s++;
  if (pwd.length >= 12)         s++;
  if (/[A-Z]/.test(pwd))        s++;
  if (/[0-9]/.test(pwd))        s++;
  if (/[^A-Za-z0-9]/.test(pwd)) s++;
  if (s <= 1) return { score: 1, label: "Weak",   color: "#ef4444" };
  if (s <= 2) return { score: 2, label: "Fair",   color: "#f59e0b" };
  if (s <= 3) return { score: 3, label: "Good",   color: "#3b82f6" };
  return       { score: 4, label: "Strong", color: "#22c55e" };
}

function isFree(email) {
  const d = email.split("@")[1];
  return d && FREE_DOMAINS.includes(d.toLowerCase());
}

/* ── Username validation ── */
function checkUsername(username, agencyName) {
  const normalizedUsername  = username.trim().toLowerCase();
  const normalizedAgencyName = agencyName.trim().toLowerCase();

  if (!normalizedUsername) return "";

  if (normalizedUsername === normalizedAgencyName)
    return "Username cannot be the same as your agency name.";

  const nameParts = normalizedAgencyName.split(/\s+/).filter(Boolean);
  const containsPart = nameParts.some(
    part => part.length > 2 && normalizedUsername.includes(part)
  );

  if (containsPart)
    return "Username should not contain your agency name.";

  return "";
}

const inputBase   = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const inputActive = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
const inputIdle   = "border border-gray-200 bg-white";
const inputError  = "border-[1.5px] border-red-400 bg-red-50 shadow-[0_0_0_3px_rgba(239,68,68,0.1)]";

const InsightCard = ({ type, children }) => {
  const styles = {
    warn:    "bg-amber-50 border-amber-200 text-amber-800",
    success: "bg-green-50 border-green-200 text-green-800",
    error:   "bg-red-50 border-red-200 text-red-800",
    info:    "bg-blue-50 border-blue-200 text-blue-800",
  };
  return (
    <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${styles[type]}`}>
      {children}
    </div>
  );
};

const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
  const [agencyName, setAgencyName] = useState(formData.agencyName || "");
  const [email,      setEmail]      = useState(formData.email      || "");
  const [country,    setCountry]    = useState(formData.country    || "");
  const [password,   setPassword]   = useState(formData.password   || "");
  const [confirm,    setConfirm]    = useState(formData.confirmPassword || "");
  const [username,   setUsername]   = useState(formData.username   || "");
  const [usernameMsg, setUsernameMsg] = useState("");

  const strength       = getStrength(password);
  const passwordsMatch = password && confirm && password === confirm;
  const tooShort       = password.length > 0 && password.length < 8;
  const freeEmail      = email.includes("@") && isFree(email);
  const bizEmail       = email.includes("@") && !isFree(email) && email.split("@")[1]?.includes(".");
  const nameGood       = agencyName.trim().length >= 5;
  const bars           = [1,2,3,4].map(i => password && i <= strength.score ? strength.color : "#e5e7eb");
  const hasInsights    = freeEmail || nameGood || bizEmail || tooShort || (username && !usernameMsg);

  /* ── Handlers ── */
  const handleUsernameChange = (e) => {
    const val = e.target.value;
    setUsername(val);
    setUsernameMsg(checkUsername(val, agencyName));
  };

  const handleAgencyNameChange = (e) => {
    const val = e.target.value;
    setAgencyName(val);
    // Re-run check when agency name changes too
    if (username) setUsernameMsg(checkUsername(username, val));
  };

  const handleNext = () => {
    updateData({ agencyName, email, country, password, confirmPassword: confirm, username });
    next();
  };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">

      {/* Form */}
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Create Your Agency Account</h2>
          <p className="text-sm text-gray-500 mb-5">Start by setting up your agency's identity on the platform</p>

          <div className="inline-block bg-gray-100 text-gray-500 text-[11px] font-bold px-3.5 py-1.5 rounded-md border border-gray-200 tracking-wide mb-5">
            ACCOUNT CREATED – NOT CONFIGURED
          </div>

          <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
            <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
            <span className="text-xs text-amber-800 leading-relaxed">After this step, you cannot browse projects, receive invites, or appear in search until configuration is complete.</span>
          </div>

          {/* Agency Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Agency Name (Display Name) *</label>
            <input type="text" placeholder="e.g., TechVision Digital Agency" value={agencyName} maxLength={50}
              onChange={handleAgencyNameChange}
              className={`${inputBase} ${agencyName ? inputActive : inputIdle}`} />
            <div className="text-xs text-gray-400 mt-1">{agencyName.length}/50 characters</div>
          </div>

          {/* Email */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Business Email Address *</label>
            <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border text-sm transition-all
              ${freeEmail ? "border-amber-300 bg-amber-50 shadow-[0_0_0_3px_rgba(245,158,11,0.1)]"
                : bizEmail ? "border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]"
                : "border-gray-200 bg-white"}`}>
              <MdOutlineEmail className="text-gray-400 text-base shrink-0" />
              <input type="email" placeholder="you@youragency.com" value={email} onChange={e => setEmail(e.target.value)}
                className="flex-1 outline-none bg-transparent text-sm text-gray-700 border-none" />
            </div>
            {freeEmail && (
              <div className="flex items-center gap-1 text-xs text-amber-600 font-semibold mt-1">
                <MdOutlineWarningAmber size={13} /> Business email preferred
              </div>
            )}
          </div>

          {/* Country */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Country of Registration *</label>
            <div className="relative">
              <select value={country} onChange={e => setCountry(e.target.value)}
                className={`${inputBase} appearance-none cursor-pointer ${country ? inputActive : inputIdle}`}>
                <option value="">Select country</option>
                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
              <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
            </div>
          </div>

          {/* Username */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Username *</label>
            <input
              type="text"
              placeholder="e.g. @digital12"
              value={username}
              maxLength={30}
              onChange={handleUsernameChange}
              className={`${inputBase} ${usernameMsg ? inputError : username ? inputActive : inputIdle}`}
            />
            {usernameMsg && (
              <div className="flex items-center gap-1 text-xs text-red-600 font-semibold mt-1">
                <MdOutlineWarningAmber size={13} /> {usernameMsg}
              </div>
            )}
          </div>

          {/* Password Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Password *</label>
              <input type="password" placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)}
                className={`${inputBase} ${inputIdle}`} />
              {password && (
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex gap-1 flex-1">
                    {bars.map((c, i) => <div key={i} style={{ background: c }} className="h-1.5 flex-1 rounded-full transition-all duration-300" />)}
                  </div>
                  <span className="text-xs font-semibold" style={{ color: strength.color }}>{strength.label}</span>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Confirm Password *</label>
              <input type="password" placeholder="Re-enter password" value={confirm} onChange={e => setConfirm(e.target.value)}
                className={`${inputBase} ${inputIdle}`} />
              {passwordsMatch && (
                <div className="flex items-center gap-1 text-xs text-green-600 font-semibold mt-1.5">
                  <MdCheckCircleOutline size={13} /> Passwords match ✓
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-5">
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Admin Setup →
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="w-full lg:w-[290px] lg:shrink-0 lg:sticky lg:top-6">
        <div className="bg-white border border-violet-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
              <MdAutoAwesome className="text-violet-700 text-sm" />
            </div>
            <span className="text-sm font-bold text-violet-700">AI Insights</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {freeEmail && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Business email preferred. Free email providers may reduce trust.</InsightCard>}
            {nameGood  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Agency name looks good.</InsightCard>}
            {bizEmail && !freeEmail && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Business email detected. Great for client trust!</InsightCard>}
            {tooShort  && <InsightCard type="error"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Password must be at least 8 characters long.</InsightCard>}
            {username && !usernameMsg && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Username looks good.</InsightCard>}
            {usernameMsg && <InsightCard type="error"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />{usernameMsg}</InsightCard>}
            {!hasInsights && !usernameMsg && <p className="text-xs text-gray-400 text-center py-2">Start filling the form to see AI suggestions...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step1Account;