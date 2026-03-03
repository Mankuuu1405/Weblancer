import { useState, useRef } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const timezones = [
  "UTC-12:00", "UTC-11:00", "UTC-10:00 (Hawaii)", "UTC-09:00 (Alaska)",
  "UTC-08:00 (PST)", "UTC-07:00 (MST)", "UTC-06:00 (CST)", "UTC-05:00 (EST)",
  "UTC-04:00 (AST)", "UTC-03:00 (BRT)", "UTC+00:00 (GMT/UTC)", "UTC+01:00 (CET)",
  "UTC+02:00 (EET)", "UTC+03:00 (MSK)", "UTC+04:00 (GST)", "UTC+05:00 (PKT)",
  "UTC+05:30 (IST)", "UTC+06:00 (BST)", "UTC+07:00 (ICT)", "UTC+08:00 (CST/SGT)",
  "UTC+09:00 (JST/KST)", "UTC+10:00 (AEST)", "UTC+12:00 (NZST)"
];

const experienceOptions = ["Less than 1 year", "1-2 years", "3-5 years", "6-10 years", "10+ years"];

export default function Step4_Profile({ onNext, onBack, currentStep = 4, totalSteps = 12 }) {
  const [photo, setPhoto]           = useState(null);
  const [headline, setHeadline]     = useState("");
  const [bio, setBio]               = useState("");
  const [experience, setExperience] = useState("");
  const [timezone, setTimezone]     = useState("");
  const [availability, setAvailability] = useState(20);
  const [github, setGithub]         = useState("");
  const [linkedin, setLinkedin]     = useState("");
  const [portfolio, setPortfolio]   = useState("");
  const [errors, setErrors]         = useState({});
  const fileRef = useRef();

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const wordCount = bio.trim() === "" ? 0 : bio.trim().split(/\s+/).length;

  /* ── Availability label ── */
  const getAvailLabel = (v) => {
    if (v <= 10)  return "Part-time";
    if (v <= 30)  return "Full-time";
    return "Open to more";
  };

  /* ── Profile Strength ── */
  const calcStrength = () => {
    let score = 0;
    if (photo)                              score += 20;
    if (headline.trim().length >= 10)       score += 20;
    if (wordCount >= 30)                    score += 20;
    if (experience)                         score += 10;
    if (timezone)                           score += 10;
    if (github.trim())                      score += 10;
    if (linkedin.trim())                    score += 10;
    return score;
  };
  const strength = calcStrength();
  const strengthColor = strength < 40 ? "bg-red-400" : strength < 70 ? "bg-yellow-400" : "bg-green-500";
  const strengthLabel = strength < 40 ? "Weak" : strength < 70 ? "Good" : "Strong";

  /* ── AI Insights ── */
  const getInsights = () => {
    const insights = [];
    if (!github.trim())    insights.push({ status: "tip",  msg: "Adding GitHub gives +15 trust points." });
    if (!linkedin.trim())  insights.push({ status: "tip",  msg: "Adding LinkedIn gives +15 trust points." });
    if (!portfolio.trim()) insights.push({ status: "tip",  msg: "Adding portfolio gives +10 trust points." });
    if (photo)             insights.push({ status: "good", msg: "Profile photo added — builds trust with clients." });
    if (headline.length >= 10) insights.push({ status: "good", msg: "Headline looks great!" });
    if (wordCount >= 30)   insights.push({ status: "good", msg: "Bio is detailed — clients love this." });
    if (wordCount > 0 && wordCount < 30) insights.push({ status: "warn", msg: `Bio needs more detail (${wordCount}/30 words min).` });
    if (github.trim())     insights.push({ status: "good", msg: "GitHub linked — +15 trust points earned!" });
    if (linkedin.trim())   insights.push({ status: "good", msg: "LinkedIn linked — +15 trust points earned!" });
    if (portfolio.trim())  insights.push({ status: "good", msg: "Portfolio linked — +10 trust points earned!" });
    return insights;
  };
  const insights = getInsights();

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!photo)                        e.photo      = "Profile photo is required";
    if (headline.trim().length < 5)    e.headline   = "Please enter a professional headline";
    if (wordCount < 10)                e.bio        = "Bio must be at least 10 words";
    if (!experience)                   e.experience = "Please select years of experience";
    if (!timezone)                     e.timezone   = "Please select your timezone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError   = (f) => setErrors(p => ({ ...p, [f]: "" }));
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onNext(); };

  const handlePhoto = (e) => {
    const file = e.target.files[0];
    if (file) { setPhoto(URL.createObjectURL(file)); clearError("photo"); }
  };

  const inputClass = (field) =>
    `w-full p-3 border rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-blue-100
    ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-blue-400"}`;

  const ErrorMsg = ({ field }) => errors[field]
    ? <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        {errors[field]}
      </p>
    : null;

  return (
    <div className="min-h-screen bg-blue-50 text-gray-900 pb-20">

      {/* ── Navbar ── */}
      <header className="bg-white border-b border-gray-200 px-4 sm:px-6 py-3 flex items-center justify-between">
        <span className="text-blue-600 font-bold text-lg sm:text-xl tracking-tight">ArcLancer</span>
        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="hidden sm:inline">Save &amp; Exit</span>
          </button>
          <button type="button" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-700 border border-gray-300 rounded-lg px-2 sm:px-4 py-2 hover:bg-gray-50 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.069A1 1 0 0121 8.82v6.36a1 1 0 01-1.447.894L15 14M3 8a2 2 0 012-2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V8z"/>
            </svg>
            Demo
          </button>
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-3">
          <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-blue-600 font-semibold">{percentComplete}% Complete</span>
        </div>
        <div className="relative flex items-start justify-between">
          <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500" style={{ width: progressWidth }}></div>
          {stepLabels.map((label, index) => {
            const isActive = index + 1 === currentStep;
            const isDone   = index + 1 < currentStep;
            return (
              <div key={index} className="flex flex-col items-center z-10 relative">
                <div className={`w-7 h-7 sm:w-9 sm:h-9 rounded-full flex items-center justify-center border-2 text-xs font-bold transition-all
                  ${isActive ? "bg-white border-blue-500 text-blue-600 shadow-md"
                    : isDone  ? "bg-blue-500 border-blue-500 text-white"
                    :           "bg-white border-gray-300 text-gray-400"}`}>
                  {isDone
                    ? <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                      </svg>
                    : <span className="text-[10px] sm:text-xs">{index + 1}</span>}
                </div>
                <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block ${isActive ? "text-blue-600" : "text-gray-400"}`}>
                  {label}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col lg:flex-row gap-6 items-start">

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Build Your Professional Profile</h1>
              <p className="text-sm text-gray-500 mb-5">This is what clients see when they receive your proposal</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Profile Setup
                </span>
              </div>

              <form onSubmit={handleSubmit} noValidate className="space-y-6">

                {/* Profile Photo */}
                <div>
                  <div className="flex items-center gap-5">
                    <button type="button" onClick={() => fileRef.current.click()}
                      className={`w-20 h-20 rounded-full flex-shrink-0 flex items-center justify-center overflow-hidden border-2 transition
                        ${errors.photo ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-100 hover:bg-gray-200"}`}>
                      {photo
                        ? <img src={photo} className="w-full h-full object-cover" alt="Profile"/>
                        : <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>}
                    </button>
                    <div>
                      <p className="text-sm font-semibold text-gray-800">
                        Profile Photo <span className="text-red-500">*</span>
                      </p>
                      <p className="text-xs text-gray-500 mt-0.5">Min 400×400px, JPG or PNG</p>
                      <button type="button" onClick={() => fileRef.current.click()}
                        className="mt-2 text-xs text-blue-500 hover:underline font-medium">
                        {photo ? "Change photo" : "Upload photo"}
                      </button>
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} className="hidden"/>
                  <ErrorMsg field="photo"/>
                </div>

                {/* Professional Headline */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Professional Headline <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal ml-2">({headline.length}/80)</span>
                  </label>
                  <input type="text" maxLength={80} value={headline} placeholder='e.g. "Full-Stack React & Node.js Developer"'
                    onChange={e => { setHeadline(e.target.value); clearError("headline"); }}
                    className={inputClass("headline")}/>
                  <ErrorMsg field="headline"/>
                </div>

                {/* Professional Bio */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">
                    Professional Bio <span className="text-red-500">*</span>
                    <span className="text-gray-400 font-normal ml-2">({wordCount} words)</span>
                  </label>
                  <textarea value={bio} rows={5} placeholder="Mention your specialty, years of experience, and what makes you unique..."
                    onChange={e => { setBio(e.target.value); clearError("bio"); }}
                    className={`${inputClass("bio")} resize-y min-h-[120px]`}/>
                  <ErrorMsg field="bio"/>
                </div>

                {/* Experience + Timezone Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Years of Experience <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select value={experience}
                        onChange={e => { setExperience(e.target.value); clearError("experience"); }}
                        className={`${inputClass("experience")} appearance-none pr-10`}>
                        <option value="">Select</option>
                        {experienceOptions.map(o => <option key={o}>{o}</option>)}
                      </select>
                      <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <ErrorMsg field="experience"/>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5">
                      Timezone <span className="text-red-500">*</span>
                    </label>
                    <div className="relative">
                      <select value={timezone}
                        onChange={e => { setTimezone(e.target.value); clearError("timezone"); }}
                        className={`${inputClass("timezone")} appearance-none pr-10`}>
                        <option value="">Select timezone</option>
                        {timezones.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    <ErrorMsg field="timezone"/>
                  </div>
                </div>

                {/* Availability Slider */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Availability: <span className="text-blue-600">{availability} hrs/week</span>
                  </label>
                  <input type="range" min={5} max={60} step={5} value={availability}
                    onChange={e => setAvailability(Number(e.target.value))}
                    className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-blue-500 bg-gray-200"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${((availability - 5) / 55) * 100}%, #e5e7eb ${((availability - 5) / 55) * 100}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>Part-time</span>
                    <span>Full-time</span>
                    <span>Open to more</span>
                  </div>
                  <p className="text-xs text-blue-600 font-medium mt-1">{getAvailLabel(availability)}</p>
                </div>

                {/* Online Presence */}
                <div>
                  <label className="block text-sm font-semibold mb-3">
                    Online Presence <span className="text-gray-400 font-normal">(Optional but scored)</span>
                  </label>
                  <div className="space-y-2.5">
                    {/* GitHub */}
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
                      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
                      </svg>
                      <input type="url" value={github} placeholder="https://github.com/username"
                        onChange={e => setGithub(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"/>
                      <span className="text-green-600 text-xs font-bold whitespace-nowrap">+15 pts</span>
                    </div>

                    {/* LinkedIn */}
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
                      <svg className="w-5 h-5 text-blue-600 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.083v1.562h.044c.429-.815 1.476-1.674 3.037-1.674 3.246 0 3.845 2.137 3.845 4.915v6.649zM5.337 7.433a1.789 1.789 0 11.001-3.578 1.789 1.789 0 010 3.578zm1.543 13.019H3.792V9h3.088v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <input type="url" value={linkedin} placeholder="https://linkedin.com/in/username"
                        onChange={e => setLinkedin(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"/>
                      <span className="text-green-600 text-xs font-bold whitespace-nowrap">+15 pts</span>
                    </div>

                    {/* Portfolio */}
                    <div className="flex items-center gap-3 border border-gray-200 rounded-xl px-3 py-2.5 bg-gray-50 focus-within:border-blue-400 focus-within:ring-2 focus-within:ring-blue-100 transition">
                      <svg className="w-5 h-5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                      <input type="url" value={portfolio} placeholder="https://yourportfolio.com"
                        onChange={e => setPortfolio(e.target.value)}
                        className="flex-1 bg-transparent text-sm outline-none text-gray-700 placeholder-gray-400"/>
                      <span className="text-green-600 text-xs font-bold whitespace-nowrap">+10 pts</span>
                    </div>
                  </div>
                </div>

                {/* Profile Strength */}
                <div className="border border-gray-200 rounded-xl p-4">
                  <div className="flex justify-between text-sm font-semibold text-gray-700 mb-2">
                    <span>Profile Strength</span>
                    <span className={strength >= 70 ? "text-green-600" : strength >= 40 ? "text-yellow-600" : "text-red-500"}>
                      {strength}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div className={`h-2.5 rounded-full transition-all duration-500 ${strengthColor}`}
                      style={{ width: `${strength}%` }}/>
                  </div>
                  <p className={`text-xs mt-1.5 font-medium ${strength >= 70 ? "text-green-600" : strength >= 40 ? "text-yellow-600" : "text-gray-400"}`}>
                    {strength === 0 ? "Fill in your profile to increase strength" : `${strengthLabel} profile`}
                  </p>
                </div>

                {/* Submit */}
                <div className="flex justify-between pt-2">
                  <button type="button" onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                    ← Back
                  </button>
                  <button type="submit"
                    className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
                    Continue to Skills
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* ── AI Insights Panel ── */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 lg:sticky lg:top-6">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-sm">AI Insights</span>
              </div>

              <div className="space-y-2">
                {insights.map((insight, i) => (
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                    ${insight.status === "good"
                      ? "bg-green-50 border border-green-100 text-green-800"
                      : insight.status === "warn"
                      ? "bg-yellow-50 border border-yellow-100 text-yellow-800"
                      : "bg-purple-50 border border-purple-100 text-purple-800"}`}>
                    {insight.status === "good" ? (
                      <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg className="w-4 h-4 text-purple-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              {/* Profile strength summary */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                  <span>Profile strength</span>
                  <span className="font-semibold text-blue-600">{strength}%</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div className={`h-1.5 rounded-full transition-all duration-500 ${strengthColor}`}
                    style={{ width: `${strength}%` }}/>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}