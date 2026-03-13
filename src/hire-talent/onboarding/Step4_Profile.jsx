import { useState, useMemo } from "react";

const TIMEZONES = [
  "(GMT-8) Pacific Time",
  "(GMT-7) Mountain Time",
  "(GMT-6) Central Time",
  "(GMT-5) Eastern Time",
  "(GMT+0) London",
  "(GMT+1) Berlin",
  "(GMT+5:30) Mumbai",
  "(GMT+8) Singapore",
  "(GMT+9) Tokyo",
];

const LANGUAGES = [
  "English","Spanish","French","German","Chinese",
  "Japanese","Arabic","Hindi","Portuguese","Russian",
];

/* Profile strength fields and their weights */
const STRENGTH_FIELDS = [
  { key: "timezone",  label: "Timezone",             points: 20 },
  { key: "languages", label: "Languages",            points: 20 },
  { key: "website",   label: "Website (+10 trust)",  points: 20 },
  { key: "linkedin",  label: "LinkedIn (+15 trust)", points: 20 },
  { key: "bio",       label: "Bio (+5 trust)",       points: 20 },
];

const inputStyle = {
  border: "1px solid #e2e8f0",
  backgroundColor: "white",
  color: "#1e293b",
};

export default function Step4_Profile({ formData, updateData, next, prev }) {
  const [timezone,  setTimezone]  = useState(formData?.timezone  || "");
  const [languages, setLanguages] = useState(formData?.languages || []);
  const [website,   setWebsite]   = useState(formData?.website   || "");
  const [linkedin,  setLinkedin]  = useState(formData?.linkedin  || "");
  const [bio,       setBio]       = useState(formData?.bio       || "");

  /* ── Profile strength ── */
  const strength = useMemo(() => {
    let pts = 0;
    if (timezone)            pts += 20;
    if (languages.length)    pts += 20;
    if (website.trim())      pts += 20;
    if (linkedin.trim())     pts += 20;
    if (bio.trim().length > 10) pts += 20;
    return pts;
  }, [timezone, languages, website, linkedin, bio]);

  /* completed field keys for pill indicators */
  const completedKeys = {
    timezone:  !!timezone,
    languages: languages.length > 0,
    website:   !!website.trim(),
    linkedin:  !!linkedin.trim(),
    bio:       bio.trim().length > 10,
  };

  /* ── Language toggle (max 3) ── */
  const toggleLang = (lang) => {
    setLanguages(prev =>
      prev.includes(lang)
        ? prev.filter(l => l !== lang)
        : prev.length < 3 ? [...prev, lang] : prev
    );
  };

  const canContinue = !!timezone && languages.length > 0;

  const handleNext = () => {
    updateData({ timezone, languages, website, linkedin, bio });
    next();
  };

  /* AI insight based on strength */
  const insight = strength === 100
    ? "Great job! Your profile is 100% complete."
    : strength >= 60
    ? "Almost there — a few more fields will boost your trust score."
    : "Complete your profile for better talent matching.";

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT: Main card ══════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl p-8 sm:p-10"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
            Complete Your Profile
          </h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            Better profiles get faster, higher-quality responses
          </p>

          {/* ── Profile Strength bar ── */}
          <div className="rounded-xl px-5 py-4 mb-8"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-semibold" style={{ color: "#1e293b" }}>
                Profile Strength
              </span>
              <span className="text-sm font-bold" style={{ color: "#3b5bdb" }}>
                {strength}%
              </span>
            </div>

            {/* Bar */}
            <div className="w-full h-2 rounded-full mb-3" style={{ backgroundColor: "#e2e8f0" }}>
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${strength}%`,
                  backgroundColor: strength === 100 ? "#22c55e" : "#3b5bdb",
                }}
              />
            </div>

            {/* Field pills */}
            <div className="flex flex-wrap gap-2">
              {STRENGTH_FIELDS.map(f => (
                <span
                  key={f.key}
                  className="flex items-center gap-1 text-xs px-2 py-0.5 rounded-full"
                  style={{
                    backgroundColor: completedKeys[f.key] ? "#dcfce7" : "#f1f5f9",
                    color:           completedKeys[f.key] ? "#16a34a" : "#64748b",
                    border: `1px solid ${completedKeys[f.key] ? "#bbf7d0" : "#e2e8f0"}`,
                  }}
                >
                  <span>{completedKeys[f.key] ? "●" : "○"}</span>
                  {f.label}
                </span>
              ))}
            </div>
          </div>

          {/* ── Work Preferences ── */}
          <h2 className="text-base font-bold mb-5" style={{ color: "#1e293b" }}>
            Work Preferences
          </h2>

          {/* Timezone */}
          <div className="flex flex-col gap-1.5 mb-6">
            <label className="text-sm font-semibold" style={{ color: "#374151" }}>
              Preferred Timezone *
            </label>
            <div className="relative">
              <select
                value={timezone}
                onChange={e => setTimezone(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none appearance-none transition-all"
                style={{ ...inputStyle, color: timezone ? "#1e293b" : "#94a3b8" }}
                onFocus={e => e.target.style.borderColor = "#3b5bdb"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              >
                <option value="" disabled>Select timezone</option>
                {TIMEZONES.map(tz => (
                  <option key={tz} value={tz} style={{ color: "#1e293b" }}>{tz}</option>
                ))}
              </select>
              <span className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none"
                    style={{ color: "#94a3b8" }}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M19 9l-7 7-7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </div>
          </div>

          {/* Languages */}
          <div className="flex flex-col gap-2 mb-8">
            <div className="flex items-center justify-between">
              <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                Preferred Languages * <span style={{ color: "#94a3b8", fontWeight: 400 }}>(up to 3)</span>
              </label>
              <span className="text-sm" style={{ color: "#94a3b8" }}>
                {languages.length}/3
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {LANGUAGES.map(lang => {
                const active = languages.includes(lang);
                return (
                  <button
                    key={lang}
                    onClick={() => toggleLang(lang)}
                    className="px-4 py-2 rounded-xl text-sm font-medium transition-all"
                    style={{
                      border:          active ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                      backgroundColor: active ? "#e0e7ff"           : "white",
                      color:           active ? "#3b5bdb"           : "#374151",
                    }}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ── Optional Details ── */}
          <div className="flex items-center gap-2 mb-5">
            <h2 className="text-base font-bold" style={{ color: "#1e293b" }}>
              Optional Details
            </h2>
            <span className="text-sm" style={{ color: "#94a3b8" }}>(Strongly Encouraged)</span>
          </div>

          <div className="flex flex-col gap-5">

            {/* Company Website */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "#374151" }}>
                <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                  <path d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Company Website
                <span className="text-xs font-semibold" style={{ color: "#3b5bdb" }}>+10 trust</span>
              </label>
              <input
                type="url"
                placeholder="https://yourcompany.com"
                value={website}
                onChange={e => setWebsite(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b5bdb"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* LinkedIn */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold flex items-center gap-2" style={{ color: "#374151" }}>
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="#0077B5">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
                LinkedIn Profile
                <span className="text-xs font-semibold" style={{ color: "#3b5bdb" }}>+15 trust</span>
              </label>
              <input
                type="url"
                placeholder="https://linkedin.com/in/yourprofile"
                value={linkedin}
                onChange={e => setLinkedin(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b5bdb"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              />
            </div>

            {/* Professional Bio */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                Professional Bio
              </label>
              <textarea
                rows={4}
                placeholder="Tell us about your business and what you're looking to achieve"
                value={bio}
                onChange={e => { if (e.target.value.length <= 200) setBio(e.target.value); }}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none transition-all"
                style={inputStyle}
                onFocus={e => e.target.style.borderColor = "#3b5bdb"}
                onBlur={e  => e.target.style.borderColor = "#e2e8f0"}
              />
              <div className="text-xs text-right" style={{ color: "#94a3b8" }}>
                {bio.length}/200
              </div>
            </div>

            {/* Benefits section */}
            <div className="rounded-xl px-6 py-5"
                 style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
              <p className="text-sm font-bold mb-4" style={{ color: "#1e293b" }}>
                Benefits of completing your profile:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    text: "Better talent matching",
                    icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24"><path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" strokeWidth="1.8"/><path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" strokeWidth="1.8"/></svg>,
                  },
                  {
                    text: "Faster responses",
                    icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24"><path d="M13 10V3L4 14h7v7l9-11h-7z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  },
                  {
                    text: "Improved communication",
                    icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24"><path d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  },
                  {
                    text: "Higher trust from providers",
                    icon: <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/></svg>,
                  },
                ].map(b => (
                  <div key={b.text} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
                    {b.icon}
                    {b.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Nav buttons ── */}
        <div className="flex items-center justify-between mt-6 pb-10">
          <button onClick={prev}
                  className="flex items-center gap-2 text-sm font-semibold"
                  style={{ color: "#374151" }}>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M19 12H5M12 19l-7-7 7-7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Back
          </button>

          <button
            onClick={handleNext}
            disabled={!canContinue}
            className="flex items-center gap-2 font-bold px-7 py-3.5 rounded-xl text-white text-sm transition-all"
            style={{
              backgroundColor: canContinue ? "#3b5bdb" : "#93c5fd",
              cursor: canContinue ? "pointer" : "not-allowed",
            }}
          >
            Save &amp; Continue
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M5 12h14M12 5l7 7-7 7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>

      {/* ══ RIGHT: AI Insights ══════════════════════════════ */}
      <div className="hidden lg:block w-72 flex-shrink-0 sticky top-24">
        <div className="rounded-2xl p-5"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>
          <div className="flex items-center gap-2 mb-4">
            <svg className="w-5 h-5" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="font-bold text-sm" style={{ color: "#1e293b" }}>AI Insights</span>
          </div>

          <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
               style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
            <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {insight}
          </div>

          {strength > 0 && (
            <div className="mt-3 flex items-center gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Profile strength: {strength}%
            </div>
          )}
        </div>
      </div>

    </div>
  );
}
