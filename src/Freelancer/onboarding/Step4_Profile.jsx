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
  const [photo, setPhoto]               = useState(null);
  const [headline, setHeadline]         = useState("");
  const [bio, setBio]                   = useState("");
  const [experience, setExperience]     = useState("");
  const [timezone, setTimezone]         = useState("");
  const [availability, setAvailability] = useState(20);
  const [github, setGithub]             = useState("");
  const [linkedin, setLinkedin]         = useState("");
  const [portfolio, setPortfolio]       = useState("");
  const [errors, setErrors]             = useState({});
  const fileRef = useRef();

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;
  const wordCount       = bio.trim() === "" ? 0 : bio.trim().split(/\s+/).length;

  const getAvailLabel = (v) => {
    if (v <= 10) return "Part-time";
    if (v <= 30) return "Full-time";
    return "Open to more";
  };

  const calcStrength = () => {
    let score = 0;
    if (photo)                        score += 20;
    if (headline.trim().length >= 10) score += 20;
    if (wordCount >= 30)              score += 20;
    if (experience)                   score += 10;
    if (timezone)                     score += 10;
    if (github.trim())                score += 10;
    if (linkedin.trim())              score += 10;
    return score;
  };
  const strength      = calcStrength();
  const strengthColor = strength < 40 ? "#f87171" : strength < 70 ? "#facc15" : "#22c55e";
  const strengthLabel = strength < 40 ? "Weak" : strength < 70 ? "Good" : "Strong";

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

  const validate = () => {
    const e = {};
    if (!photo)                     e.photo      = "Profile photo is required";
    if (headline.trim().length < 5) e.headline   = "Please enter a professional headline";
    if (wordCount < 10)             e.bio        = "Bio must be at least 10 words";
    if (!experience)                e.experience = "Please select years of experience";
    if (!timezone)                  e.timezone   = "Please select your timezone";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError   = (f) => setErrors(p => ({ ...p, [f]: "" }));
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onNext && onNext(); };
  const handlePhoto  = (e) => {
    const file = e.target.files[0];
    if (file) { setPhoto(URL.createObjectURL(file)); clearError("photo"); }
  };

  const sliderPct = ((availability - 5) / 55) * 100;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        * { font-family: 'Plus Jakarta Sans', sans-serif; }
        .wbl-gradient { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
        .wbl-text-blue { color: #1B72C0; }

        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer;
          font-weight:700; border-radius:12px; padding:12px 28px; font-size:14px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }

        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:12px 24px; font-size:14px; transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; border-color:#d1d5db; }

        .field-input {
          width:100%; padding:11px 14px; border:1.5px solid #e5e7eb; border-radius:12px;
          font-size:13px; outline:none; background:#f8fafc; transition:border-color .2s, background .2s;
          box-sizing:border-box; color:#1f2937;
        }
        .field-input:focus  { border-color:#1B72C0; background:white; }
        .field-input.error  { border-color:#f87171; background:#fef2f2; }
        .field-textarea     { resize:vertical; min-height:120px; }
        .field-select       { appearance:none; }

        .social-row {
          display:flex; align-items:center; gap:10px;
          border:1.5px solid #e5e7eb; border-radius:12px; padding:10px 14px;
          background:#f8fafc; transition:border-color .2s;
        }
        .social-row:focus-within { border-color:#1B72C0; background:white; }
        .social-input { flex:1; background:transparent; border:none; outline:none; font-size:13px; color:#374151; min-width:0; }

        .insight-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .insight-tip  { background:#faf5ff; border:1px solid #e9d5ff; color:#6b21a8; }

        .step-done    { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active  { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }

        input[type=range] { -webkit-appearance:none; appearance:none; width:100%; height:6px; border-radius:99px; outline:none; cursor:pointer; }
        input[type=range]::-webkit-slider-thumb { -webkit-appearance:none; width:18px; height:18px; border-radius:50%; background:linear-gradient(135deg,#0D2855,#1B72C0); cursor:pointer; box-shadow:0 2px 6px rgba(13,40,85,0.3); }

        /* ── Step progress ── */
        .step-progress-wrap {
          position:relative; display:flex; align-items:flex-start;
          justify-content:space-between; overflow-x:auto; padding-bottom:4px;
        }
        .step-dot-wrap { display:flex; flex-direction:column; align-items:center; z-index:10; position:relative; flex-shrink:0; }
        .step-label { font-size:10px; margin-top:5px; font-weight:600; }

        /* ── Layout ── */
        .wbl-layout  { max-width:1100px; margin:0 auto; padding:0 24px; display:flex; gap:24px; align-items:flex-start; flex-wrap:wrap; }
        .wbl-main    { flex:1; min-width:0; }
        .wbl-sidebar { width:280px; flex-shrink:0; }

        /* ── Experience + Timezone grid ── */
        .exp-tz-grid { display:grid; grid-template-columns:1fr 1fr; gap:16px; }

        /* ── Nav ── */
        .nav-row { display:flex; justify-content:space-between; }

        /* ────────────────────────────
           RESPONSIVE
        ──────────────────────────── */
        @media (max-width: 900px) {
          .wbl-sidebar { width:100%; }
        }

        @media (max-width: 640px) {
          .wbl-header-img { height:36px !important; }
          .wbl-header-btn { padding:6px 12px !important; font-size:12px !important; }

          .wbl-progress-section { padding:0 16px !important; margin-top:20px !important; }
          .step-dot-wrap .step-label { display:none; }

          .wbl-layout    { padding:0 16px; gap:16px; }
          .wbl-main-card { padding:20px !important; }
          .wbl-main-card h1 { font-size:20px !important; }

          /* Experience + timezone → stacked */
          .exp-tz-grid { grid-template-columns:1fr; }

          /* Social row: hide pts label on tiny screens */
          .social-pts { display:none; }

          /* Nav → stacked */
          .nav-row { flex-direction:column-reverse; gap:10px; }
          .nav-row .wbl-btn-primary,
          .nav-row .wbl-btn-secondary { width:100%; justify-content:center; }
        }

        @media (max-width: 400px) {
          .step-done, .step-active, .step-inactive {
            width:22px !important; height:22px !important; font-size:9px !important;
          }
        }
      `}</style>

      <div className="min-h-screen pb-20" style={{ background: "#F4F9FF" }}>

        {/* Navbar */}
        <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img className="wbl-header-img" src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
          <button className="wbl-btn-secondary wbl-header-btn" style={{ padding:"8px 18px", fontSize:13 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            Save &amp; Exit
          </button>
        </header>

        {/* Progress */}
        <div className="wbl-progress-section" style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div className="step-progress-wrap">
            <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0, borderRadius:99 }}></div>
            <div className="wbl-gradient" style={{ position:"absolute", top:14, left:0, width:progressWidth, height:2, zIndex:1, borderRadius:99, transition:"width .5s ease" }}></div>
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} className="step-dot-wrap">
                  <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
                    {isDone
                      ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                      : i + 1}
                  </div>
                  <span className="step-label" style={{ color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="wbl-layout">

          {/* Main Card */}
          <div className="wbl-main">
            <div className="wbl-main-card" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:16 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  Profile Setup
                </span>
              </div>
              <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Build Your Professional Profile</h1>
              <p style={{ fontSize:13, color:"#94a3b8", marginBottom:28 }}>This is what clients see when they receive your proposal</p>

              <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:22 }}>

                {/* Photo */}
                <div>
                  <div style={{ display:"flex", alignItems:"center", gap:20 }}>
                    <button type="button" onClick={() => fileRef.current.click()}
                      style={{ width:80, height:80, borderRadius:"50%", flexShrink:0, display:"flex", alignItems:"center", justifyContent:"center", overflow:"hidden",
                        border: errors.photo ? "2px solid #f87171" : "2px dashed #d1d5db",
                        background: photo ? "transparent" : "#f8fafc", cursor:"pointer", transition:"border-color .2s" }}>
                      {photo
                        ? <img src={photo} style={{ width:"100%", height:"100%", objectFit:"cover" }} alt="Profile"/>
                        : <svg width="28" height="28" fill="none" stroke="#9ca3af" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                          </svg>}
                    </button>
                    <div>
                      <p style={{ fontSize:14, fontWeight:700, color:"#1f2937" }}>Profile Photo <span style={{color:"#ef4444"}}>*</span></p>
                      <p style={{ fontSize:12, color:"#94a3b8", marginTop:2 }}>Min 400×400px, JPG or PNG</p>
                      <button type="button" onClick={() => fileRef.current.click()}
                        className="wbl-text-blue" style={{ fontSize:12, fontWeight:600, background:"none", border:"none", cursor:"pointer", padding:"6px 0 0", display:"block" }}>
                        {photo ? "Change photo" : "Upload photo"}
                      </button>
                    </div>
                  </div>
                  <input ref={fileRef} type="file" accept="image/*" onChange={handlePhoto} style={{ display:"none" }}/>
                  {errors.photo && <p style={{ color:"#ef4444", fontSize:11, marginTop:6 }}>⚠ {errors.photo}</p>}
                </div>

                {/* Headline */}
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>
                    Professional Headline <span style={{color:"#ef4444"}}>*</span>
                    <span style={{ color:"#9ca3af", fontWeight:400, marginLeft:6 }}>({headline.length}/80)</span>
                  </label>
                  <input type="text" maxLength={80} value={headline}
                    placeholder='e.g. "Full-Stack React & Node.js Developer"'
                    onChange={e => { setHeadline(e.target.value); clearError("headline"); }}
                    className={`field-input ${errors.headline ? "error" : ""}`} />
                  {errors.headline && <p style={{ color:"#ef4444", fontSize:11, marginTop:4 }}>⚠ {errors.headline}</p>}
                </div>

                {/* Bio */}
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>
                    Professional Bio <span style={{color:"#ef4444"}}>*</span>
                    <span style={{ color:"#9ca3af", fontWeight:400, marginLeft:6 }}>({wordCount} words)</span>
                  </label>
                  <textarea value={bio} rows={5}
                    placeholder="Mention your specialty, years of experience, and what makes you unique..."
                    onChange={e => { setBio(e.target.value); clearError("bio"); }}
                    className={`field-input field-textarea ${errors.bio ? "error" : ""}`} />
                  {errors.bio && <p style={{ color:"#ef4444", fontSize:11, marginTop:4 }}>⚠ {errors.bio}</p>}
                </div>

                {/* Experience + Timezone */}
                <div className="exp-tz-grid">
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>
                      Years of Experience <span style={{color:"#ef4444"}}>*</span>
                    </label>
                    <div style={{ position:"relative" }}>
                      <select value={experience}
                        onChange={e => { setExperience(e.target.value); clearError("experience"); }}
                        className={`field-input field-select ${errors.experience ? "error" : ""}`}
                        style={{ paddingRight:36 }}>
                        <option value="">Select</option>
                        {experienceOptions.map(o => <option key={o}>{o}</option>)}
                      </select>
                      <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
                        style={{ position:"absolute", right:12, top:13, pointerEvents:"none" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    {errors.experience && <p style={{ color:"#ef4444", fontSize:11, marginTop:4 }}>⚠ {errors.experience}</p>}
                  </div>
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>
                      Timezone <span style={{color:"#ef4444"}}>*</span>
                    </label>
                    <div style={{ position:"relative" }}>
                      <select value={timezone}
                        onChange={e => { setTimezone(e.target.value); clearError("timezone"); }}
                        className={`field-input field-select ${errors.timezone ? "error" : ""}`}
                        style={{ paddingRight:36 }}>
                        <option value="">Select timezone</option>
                        {timezones.map(t => <option key={t}>{t}</option>)}
                      </select>
                      <svg width="14" height="14" fill="none" stroke="#9ca3af" viewBox="0 0 24 24"
                        style={{ position:"absolute", right:12, top:13, pointerEvents:"none" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                      </svg>
                    </div>
                    {errors.timezone && <p style={{ color:"#ef4444", fontSize:11, marginTop:4 }}>⚠ {errors.timezone}</p>}
                  </div>
                </div>

                {/* Availability Slider */}
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:12, color:"#374151" }}>
                    Availability: <span className="wbl-text-blue">{availability} hrs/week</span>
                  </label>
                  <input type="range" min={5} max={60} step={5} value={availability}
                    onChange={e => setAvailability(Number(e.target.value))}
                    style={{ background:`linear-gradient(to right, #1B72C0 0%, #1B72C0 ${sliderPct}%, #e5e7eb ${sliderPct}%, #e5e7eb 100%)` }}
                  />
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#9ca3af", marginTop:6 }}>
                    <span>Part-time</span><span>Full-time</span><span>Open to more</span>
                  </div>
                  <p className="wbl-text-blue" style={{ fontSize:12, fontWeight:600, marginTop:4 }}>{getAvailLabel(availability)}</p>
                </div>

                {/* Online Presence */}
                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:12, color:"#374151" }}>
                    Online Presence <span style={{ color:"#9ca3af", fontWeight:400 }}>(Optional but scored)</span>
                  </label>
                  <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
                    {/* GitHub */}
                    <div className="social-row">
                      <svg width="18" height="18" fill="#374151" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                        <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.54-3.87-1.54-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.02 1.75 2.68 1.24 3.33.95.1-.74.4-1.24.73-1.53-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.29 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11.05 11.05 0 012.89-.39c.98 0 1.97.13 2.89.39 2.2-1.49 3.16-1.18 3.16-1.18.63 1.59.23 2.76.11 3.05.74.8 1.18 1.83 1.18 3.09 0 4.43-2.69 5.41-5.25 5.69.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A10.51 10.51 0 0023.5 12C23.5 5.73 18.27.5 12 .5z"/>
                      </svg>
                      <input type="url" value={github} placeholder="https://github.com/username"
                        onChange={e => setGithub(e.target.value)} className="social-input" />
                      <span className="social-pts" style={{ fontSize:11, fontWeight:800, color:"#16a34a", whiteSpace:"nowrap" }}>+15 pts</span>
                    </div>
                    {/* LinkedIn */}
                    <div className="social-row">
                      <svg width="18" height="18" fill="#0a66c2" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                        <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.985V9h3.083v1.562h.044c.429-.815 1.476-1.674 3.037-1.674 3.246 0 3.845 2.137 3.845 4.915v6.649zM5.337 7.433a1.789 1.789 0 11.001-3.578 1.789 1.789 0 010 3.578zm1.543 13.019H3.792V9h3.088v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                      </svg>
                      <input type="url" value={linkedin} placeholder="https://linkedin.com/in/username"
                        onChange={e => setLinkedin(e.target.value)} className="social-input" />
                      <span className="social-pts" style={{ fontSize:11, fontWeight:800, color:"#16a34a", whiteSpace:"nowrap" }}>+15 pts</span>
                    </div>
                    {/* Portfolio */}
                    <div className="social-row">
                      <svg width="18" height="18" fill="none" stroke="#6b7280" viewBox="0 0 24 24" style={{ flexShrink:0 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"/>
                      </svg>
                      <input type="url" value={portfolio} placeholder="https://yourportfolio.com"
                        onChange={e => setPortfolio(e.target.value)} className="social-input" />
                      <span className="social-pts" style={{ fontSize:11, fontWeight:800, color:"#16a34a", whiteSpace:"nowrap" }}>+10 pts</span>
                    </div>
                  </div>
                </div>

                {/* Profile Strength Bar */}
                <div style={{ border:"1.5px solid #f0f0f0", borderRadius:14, padding:"16px 18px" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:13, fontWeight:700, color:"#374151", marginBottom:8 }}>
                    <span>Profile Strength</span>
                    <span style={{ color: strengthColor }}>{strength}%</span>
                  </div>
                  <div style={{ background:"#f3f4f6", borderRadius:99, height:8 }}>
                    <div style={{ width:`${strength}%`, height:"100%", borderRadius:99, background: strengthColor, transition:"width .5s ease" }} />
                  </div>
                  <p style={{ fontSize:12, marginTop:6, fontWeight:600, color: strength === 0 ? "#9ca3af" : strengthColor }}>
                    {strength === 0 ? "Fill in your profile to increase strength" : `${strengthLabel} profile`}
                  </p>
                </div>

                {/* Navigation */}
                <div className="nav-row" style={{ paddingTop:4 }}>
                  <button type="button" className="wbl-btn-secondary" onClick={onBack}>← Back</button>
                  <button type="submit" className="wbl-btn-primary">
                    Continue to Skills
                    <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="wbl-sidebar">
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>

              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                {insights.map((insight, i) => (
                  <div key={i} className={insight.status === "good" ? "insight-good" : insight.status === "warn" ? "insight-warn" : "insight-tip"}
                    style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                    {insight.status === "good" ? (
                      <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                      </svg>
                    ) : insight.status === "warn" ? (
                      <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                      </svg>
                    ) : (
                      <svg width="15" height="15" fill="none" stroke="#9333ea" viewBox="0 0 24 24" style={{ flexShrink:0, marginTop:1 }}>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                      </svg>
                    )}
                    {insight.msg}
                  </div>
                ))}
              </div>

              <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
                <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:5 }}>
                  <span>Profile strength</span>
                  <span className="wbl-text-blue" style={{ fontWeight:800 }}>{strength}%</span>
                </div>
                <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
                  <div style={{ width:`${strength}%`, height:"100%", borderRadius:100, background: strengthColor, transition:"width .5s ease" }} />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}