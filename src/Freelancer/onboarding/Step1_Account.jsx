

// import { useState } from "react";
// import { ChevronDown, Eye, EyeOff, Github, Linkedin, Mail } from "lucide-react";

// const stepLabels = [
//   "Account", "Verify", "Type", "Profile", "Skills",
//   "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
// ];

// const countries = [
//   "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
//   "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
//   "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France",
//   "Germany", "Ghana", "Greece", "Hungary", "India", "Indonesia", "Iran",
//   "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya",
//   "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria",
//   "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
//   "Romania", "Russia", "Saudi Arabia", "South Africa", "South Korea",
//   "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey",
//   "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
//   "United States", "Venezuela", "Vietnam", "Zimbabwe"
// ];

// export default function Step1_Account({ onNext, onBack, currentStep = 1, totalSteps = 12 }) {
//   const [fullName, setFullName]               = useState("");
//   const [email, setEmail]                     = useState("");
//   const [country, setCountry]                 = useState("");
//   const [password, setPassword]               = useState("");
//   const [confirmPassword, setConfirmPassword] = useState("");
//   const [agree, setAgree]                     = useState(false);
//   const [showPassword, setShowPassword]       = useState(false);
//   const [errors, setErrors]                   = useState({});

//   const notAsked = ["Skills", "Portfolio", "Payment details", "Profile bio"];
//   const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);

//   const getPasswordStrength = (pass) => {
//     if (!pass) return null;
//     let score = 0;
//     if (pass.length >= 8)           score++;
//     if (/[A-Z]/.test(pass))         score++;
//     if (/[0-9]/.test(pass))         score++;
//     if (/[^A-Za-z0-9]/.test(pass))  score++;
//     if (score <= 1) return { label: "Weak",   color: "bg-red-400",    bars: 1, textColor: "text-red-500"    };
//     if (score === 2) return { label: "Fair",  color: "bg-yellow-400", bars: 2, textColor: "text-yellow-500" };
//     if (score === 3) return { label: "Good",  color: "bg-blue-400",   bars: 3, textColor: "text-blue-500"   };
//     return                { label: "Strong", color: "bg-green-500",  bars: 4, textColor: "text-green-600"  };
//   };

//   const strength       = getPasswordStrength(password);
//   const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
//   const passwordsBad   = confirmPassword.length > 0 && password !== confirmPassword;

//   const getInsights = () => {
//     const insights = [];
//     if (fullName.trim().length > 0) {
//       if (fullName.trim().split(" ").filter(Boolean).length < 2) {
//         insights.push({ status: "warn", msg: "Please enter both first and last name." });
//       } else {
//         insights.push({ status: "good", msg: "Name looks good." });
//       }
//     }
//     if (email.length > 0) {
//       if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//         insights.push({ status: "good", msg: "Email format valid." });
//       } else {
//         insights.push({ status: "warn", msg: "Email format looks invalid." });
//       }
//     }
//     if (country) insights.push({ status: "good", msg: `Great! ${country} is supported.` });
//     if (password.length > 0 && strength) {
//       if (strength.label === "Weak")   insights.push({ status: "warn", msg: "Weak password — add numbers or symbols." });
//       if (strength.label === "Fair")   insights.push({ status: "warn", msg: "Fair — try adding uppercase letters." });
//       if (strength.label === "Good")   insights.push({ status: "good", msg: "Good password! One more char type for Strong." });
//       if (strength.label === "Strong") insights.push({ status: "good", msg: "Strong password — great choice!" });
//     }
//     if (confirmPassword.length > 0) {
//       if (passwordsMatch) insights.push({ status: "good", msg: "Passwords match — you're all set." });
//       else                insights.push({ status: "warn", msg: "Passwords don't match yet." });
//     }
//     if (agree) insights.push({ status: "good", msg: "Terms accepted. Ready to create account!" });
//     return insights;
//   };

//   const insights    = getInsights();
//   const goodCount   = insights.filter(i => i.status === "good").length;
//   const totalChecks = 6;
//   const fillPercent = Math.round((goodCount / totalChecks) * 100);

//   const validate = () => {
//     const e = {};
//     if (!fullName.trim())                                  e.fullName        = "Full name is required";
//     if (!email.trim())                                     e.email           = "Email is required";
//     else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  e.email           = "Enter a valid email address";
//     if (!country)                                          e.country         = "Please select your country";
//     if (!password)                                         e.password        = "Password is required";
//     else if (password.length < 8)                          e.password        = "Password must be at least 8 characters";
//     if (!confirmPassword)                                  e.confirmPassword = "Please confirm your password";
//     else if (password !== confirmPassword)                 e.confirmPassword = "Passwords do not match";
//     if (!agree)                                            e.agree           = "You must agree to the Terms of Service";
//     setErrors(e);
//     return Object.keys(e).length === 0;
//   };

//   const clearError   = (field) => setErrors(prev => ({ ...prev, [field]: "" }));
//   const handleSubmit = (e) => { e.preventDefault(); if (validate()) onNext && onNext(); };

//   const inputClass = (field) =>
//     `w-full p-3 border rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-green-100
//     ${errors[field]
//       ? "border-red-400 bg-red-50 focus:border-red-400"
//       : "border-gray-200 bg-gray-50 focus:border-green-400"}`;

//   const ErrorMsg = ({ field }) =>
//     errors[field] ? (
//       <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
//         <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
//           <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//         </svg>
//         {errors[field]}
//       </p>
//     ) : null;

//   return (
//     <>
//       <style>{`
//         @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
//         * { font-family: 'Plus Jakarta Sans', sans-serif; }
//         .wbl-bg { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
//         .wbl-btn-primary {
//           display:inline-flex; align-items:center; justify-content:center; gap:8px;
//           background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important;
//           color:#fff !important; border:none; cursor:pointer;
//           font-weight:700; border-radius:12px; padding:13px 32px; font-size:15px;
//           box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
//         }
//         .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); box-shadow:0 6px 24px rgba(13,40,85,0.4); }
//         .wbl-text-blue { color:#1B72C0 !important; }
//         .wbl-progress-fill { background: linear-gradient(90deg, #6FDA44, #1B72C0); }
//         .social-btn {
//           display:flex; align-items:center; justify-content:center; gap:10px;
//           width:100%; border:1.5px solid #e5e7eb; border-radius:12px; padding:11px 16px;
//           font-size:14px; font-weight:600; background:#fff; cursor:pointer;
//           transition:all .18s; color:#374151;
//         }
//         .social-btn:hover { background:#f9fafb; border-color:#d1d5db; transform:translateY(-1px); box-shadow:0 2px 12px rgba(0,0,0,0.07); }
//         .insight-card-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
//         .insight-card-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
//         .step-done { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
//         .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
//         .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }
//         .form-card { background:white; border-radius:20px; border:1px solid #f0f0f0; box-shadow:0 2px 20px rgba(0,0,0,0.06); }
//         .sidebar-card { background:white; border-radius:20px; border:1px solid #f0f0f0; box-shadow:0 2px 20px rgba(0,0,0,0.06); }
//       `}</style>

//       <div className="min-h-screen pb-20" style={{ background: "#F4F9FF" }}>
//  {/* Navbar */}
// <header style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
//   <img src="/weblance.jpeg" alt="Weblance" style={{ height:52, width:150}} />
//   <button className="wbl-btn-secondary" style={{ padding:"8px 18px", fontSize:13 }}>
//     <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
//     </svg>
//     Save &amp; Exit
//   </button>
// </header>
//         {/* Step Progress */}
//         <div style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
//           <div style={{ display:"flex", justifyContent:"space-between", marginBottom:12, fontSize:13 }}>
//             <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
//             <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
//           </div>
//           <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
//             <div style={{ position:"absolute", top:14, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0 }}></div>
//             <div style={{ position:"absolute", top:14, left:0, width:`${((currentStep-1)/(totalSteps-1))*100}%`, height:2, zIndex:1 }} className="wbl-progress-fill"></div>
//             {stepLabels.map((label, i) => {
//               const isActive = i + 1 === currentStep;
//               const isDone   = i + 1 < currentStep;
//               return (
//                 <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
//                   <div className={isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}
//                     style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700, transition:"all .2s" }}>
//                     {isDone
//                       ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
//                       : i + 1}
//                   </div>
//                   <span style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af", display:"block" }}>{label}</span>
//                 </div>
//               );
//             })}
//           </div>
//         </div>

//         {/* Layout */}
//         <div style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

//           {/* Form */}
//           <div style={{ flex:1, minWidth:0 }}>
//             <div className="form-card" style={{ padding:"32px" }}>

//               <div style={{ marginBottom:20 }}>
//                 <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
//                   Freelancer Account
//                 </span>
//               </div>

//               <h1 style={{ fontSize:24, fontWeight:800, color:"#0f172a", marginBottom:4 }}>Create Your Freelancer Account</h1>
//               <p style={{ fontSize:13, color:"#94a3b8", marginBottom:24 }}>Takes less than 2 minutes · No credit card required</p>

//               <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, padding:"12px 16px", fontSize:13, color:"#64748b", marginBottom:24 }}>
//                 ✨ We keep signup fast. Your full profile setup comes next.
//               </div>

//               {/* Social Buttons */}
//               <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:20 }}>
//                 <button type="button" className="social-btn">
//                   <svg width="18" height="18" viewBox="0 0 24 24">
//                     <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
//                     <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
//                     <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
//                     <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
//                   </svg>
//                   Continue with Google
//                 </button>
//                 <button type="button" className="social-btn">
//                   <Github size={17} />
//                   Continue with GitHub
//                   <span style={{ fontSize:11, background:"#dcfce7", color:"#166534", fontWeight:700, padding:"3px 8px", borderRadius:100 }}>Recommended for Devs</span>
//                 </button>
//                 <button type="button" className="social-btn">
//                   <Linkedin size={17} color="#0a66c2" />
//                   Continue with LinkedIn
//                 </button>
//               </div>

//               {/* Divider */}
//               <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20 }}>
//                 <div style={{ flex:1, height:1, background:"#e5e7eb" }}></div>
//                 <span style={{ fontSize:12, color:"#94a3b8", whiteSpace:"nowrap" }}>or sign up with email</span>
//                 <div style={{ flex:1, height:1, background:"#e5e7eb" }}></div>
//               </div>

//               {/* Form Fields */}
//               <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:16 }}>

//                 {/* Full Name */}
//                 <div>
//                   <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>Full Name <span style={{color:"#ef4444"}}>*</span></label>
//                   <input type="text" value={fullName} placeholder="Jane Smith"
//                     onChange={e => { setFullName(e.target.value); clearError("fullName"); }}
//                     className={inputClass("fullName")} />
//                   <ErrorMsg field="fullName" />
//                 </div>

//                 {/* Email */}
//                 <div>
//                   <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>Email Address <span style={{color:"#ef4444"}}>*</span></label>
//                   <div style={{ position:"relative" }}>
//                     <Mail size={15} style={{ position:"absolute", left:12, top:13, color:"#9ca3af", pointerEvents:"none" }} />
//                     <input type="email" value={email} placeholder="you@example.com"
//                       onChange={e => { setEmail(e.target.value); clearError("email"); }}
//                       className={inputClass("email")} style={{ paddingLeft:36 }} />
//                   </div>
//                   <ErrorMsg field="email" />
//                 </div>

//                 {/* Country */}
//                 <div>
//                   <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>Country <span style={{color:"#ef4444"}}>*</span></label>
//                   <div style={{ position:"relative" }}>
//                     <select value={country}
//                       onChange={e => { setCountry(e.target.value); clearError("country"); }}
//                       className={inputClass("country")} style={{ appearance:"none", paddingRight:36 }}>
//                       <option value="">Select country</option>
//                       {countries.map(c => <option key={c} value={c}>{c}</option>)}
//                     </select>
//                     <ChevronDown size={15} style={{ position:"absolute", right:12, top:13, color:"#9ca3af", pointerEvents:"none" }} />
//                   </div>
//                   <ErrorMsg field="country" />
//                 </div>

//                 {/* Passwords */}
//                 <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
//                   <div>
//                     <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>Password <span style={{color:"#ef4444"}}>*</span></label>
//                     <div style={{ position:"relative" }}>
//                       <input type={showPassword ? "text" : "password"} value={password} placeholder="8+ characters"
//                         onChange={e => { setPassword(e.target.value); clearError("password"); }}
//                         className={inputClass("password")} style={{ paddingRight:36 }} />
//                       <button type="button" onClick={() => setShowPassword(!showPassword)}
//                         style={{ position:"absolute", right:12, top:12, color:"#9ca3af", background:"none", border:"none", cursor:"pointer", padding:0 }}>
//                         {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
//                       </button>
//                     </div>
//                     {password && strength && (
//                       <div style={{ marginTop:8 }}>
//                         <div style={{ display:"flex", gap:4, marginBottom:4 }}>
//                           {[1,2,3,4].map(bar => (
//                             <div key={bar} className={bar <= strength.bars ? strength.color : "bg-gray-200"}
//                               style={{ height:5, flex:1, borderRadius:3, transition:"all .3s" }} />
//                           ))}
//                         </div>
//                         <span className={strength.textColor} style={{ fontSize:11, fontWeight:700 }}>{strength.label}</span>
//                       </div>
//                     )}
//                     <ErrorMsg field="password" />
//                   </div>

//                   <div>
//                     <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:6, color:"#374151" }}>Confirm Password <span style={{color:"#ef4444"}}>*</span></label>
//                     <input type="password" value={confirmPassword} placeholder="Re-enter password"
//                       onChange={e => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
//                       style={{
//                         width:"100%", padding:"12px", border:`1.5px solid ${passwordsMatch ? "#22c55e" : (errors.confirmPassword || passwordsBad) ? "#f87171" : "#e5e7eb"}`,
//                         borderRadius:12, fontSize:13, outline:"none", background: passwordsMatch ? "#f0fdf4" : (errors.confirmPassword || passwordsBad) ? "#fef2f2" : "#f8fafc",
//                         boxSizing:"border-box"
//                       }} />
//                     {passwordsMatch && <p style={{ color:"#16a34a", fontSize:11, marginTop:4, fontWeight:600 }}>✓ Passwords match</p>}
//                     {passwordsBad  && <p style={{ color:"#ef4444", fontSize:11, marginTop:4 }}>✗ Passwords do not match</p>}
//                     <ErrorMsg field="confirmPassword" />
//                   </div>
//                 </div>

//                 {/* Role */}
//                 <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12, padding:"12px 16px", display:"flex", alignItems:"center", gap:10 }}>
//                   <span style={{ fontSize:11, fontWeight:800, background:"#dcfce7", color:"#166534", padding:"3px 10px", borderRadius:100 }}>Freelancer</span>
//                   <span style={{ fontSize:13, color:"#1d4ed8", fontWeight:600 }}>Role auto-selected: Solo Professional</span>
//                 </div>

//                 {/* Not Asked */}
//                 <div style={{ border:"1px solid #f0f0f0", borderRadius:12, padding:"14px 16px" }}>
//                   <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:10 }}>What's NOT asked yet:</p>
//                   <div style={{ display:"flex", flexDirection:"column", gap:6 }}>
//                     {notAsked.map((item, i) => (
//                       <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#6b7280" }}>
//                         <span style={{ color:"#ef4444", fontWeight:700 }}>✕</span> {item}
//                       </div>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Terms */}
//                 <div>
//                   <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer" }}>
//                     <input type="checkbox" checked={agree}
//                       onChange={e => { setAgree(e.target.checked); clearError("agree"); }}
//                       style={{ width:16, height:16, marginTop:2, flexShrink:0, accentColor:"#1B72C0" }} />
//                     <span style={{ fontSize:13, color:"#6b7280" }}>
//                       I agree to the <a href="#" className="wbl-text-blue" style={{ fontWeight:600, textDecoration:"none" }}>Terms of Service</a> and <a href="#" className="wbl-text-blue" style={{ fontWeight:600, textDecoration:"none" }}>Privacy Policy</a>
//                     </span>
//                   </label>
//                   <ErrorMsg field="agree" />
//                 </div>

//                 {/* Submit */}
//                 <div style={{ display:"flex", justifyContent:"flex-end", paddingTop:4 }}>
//                   <button type="submit" className="wbl-btn-primary" style={{ width:"100%" }}>
//                     Create Account
//                     <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
//                     </svg>
//                   </button>
//                 </div>
//               </form>
//             </div>
//           </div>

//           {/* Sidebar */}
//           <div style={{ width:280, flexShrink:0 }}>
//             <div className="sidebar-card" style={{ padding:20, position:"sticky", top:24 }}>

//               <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:16 }}>
//                 <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
//                   <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                 </div>
//                 <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
//               </div>

//               {insights.length === 0 ? (
//                 <div style={{ textAlign:"center", padding:"24px 8px", color:"#94a3b8", fontSize:12 }}>
//                   <svg width="32" height="32" fill="none" stroke="#d1d5db" viewBox="0 0 24 24" style={{ margin:"0 auto 8px" }}>
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
//                   </svg>
//                   Start filling the form to see real-time AI feedback.
//                 </div>
//               ) : (
//                 <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
//                   {insights.map((insight, i) => (
//                     <div key={i} className={insight.status === "good" ? "insight-card-good" : "insight-card-warn"}
//                       style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
//                       {insight.status === "good" ? (
//                         <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                           <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
//                         </svg>
//                       ) : (
//                         <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}>
//                           <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
//                         </svg>
//                       )}
//                       {insight.msg}
//                     </div>
//                   ))}
//                 </div>
//               )}

//               {insights.length > 0 && (
//                 <div style={{ marginTop:16, paddingTop:16, borderTop:"1px solid #f0f0f0" }}>
//                   <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:6 }}>
//                     <span>Form completion</span>
//                     <span className="wbl-text-blue" style={{ fontWeight:800 }}>{fillPercent}%</span>
//                   </div>
//                   <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
//                     <div className="wbl-progress-fill" style={{ width:`${fillPercent}%`, height:"100%", borderRadius:100, transition:"width .5s ease" }} />
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>

//         </div>
//       </div>
//     </>
//   );
// }









import { useState } from "react";
import { ChevronDown, Eye, EyeOff, Github, Linkedin, Mail } from "lucide-react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const countries = [
  "Afghanistan","Albania","Algeria","Argentina","Australia","Austria",
  "Bangladesh","Belgium","Brazil","Canada","Chile","China","Colombia",
  "Croatia","Czech Republic","Denmark","Egypt","Finland","France",
  "Germany","Ghana","Greece","Hungary","India","Indonesia","Iran",
  "Iraq","Ireland","Israel","Italy","Japan","Jordan","Kenya",
  "Malaysia","Mexico","Morocco","Netherlands","New Zealand","Nigeria",
  "Norway","Pakistan","Peru","Philippines","Poland","Portugal",
  "Romania","Russia","Saudi Arabia","South Africa","South Korea",
  "Spain","Sri Lanka","Sweden","Switzerland","Thailand","Turkey",
  "Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Venezuela","Vietnam","Zimbabwe"
];

export default function Step1_Account({ onNext, onBack, currentStep = 1, totalSteps = 12 }) {
  const [fullName, setFullName]               = useState("");
  const [email, setEmail]                     = useState("");
  const [country, setCountry]                 = useState("");
  const [password, setPassword]               = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree]                     = useState(false);
  const [showPassword, setShowPassword]       = useState(false);
  const [errors, setErrors]                   = useState({});

  const notAsked = ["Skills", "Portfolio", "Payment details", "Profile bio"];
  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);

  const getPasswordStrength = (pass) => {
    if (!pass) return null;
    let score = 0;
    if (pass.length >= 8)          score++;
    if (/[A-Z]/.test(pass))        score++;
    if (/[0-9]/.test(pass))        score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;
    if (score <= 1) return { label:"Weak",   color:"bg-red-400",    bars:1, textColor:"text-red-500"    };
    if (score === 2)return { label:"Fair",   color:"bg-yellow-400", bars:2, textColor:"text-yellow-500" };
    if (score === 3)return { label:"Good",   color:"bg-blue-400",   bars:3, textColor:"text-blue-500"   };
    return             { label:"Strong", color:"bg-green-500",  bars:4, textColor:"text-green-600"  };
  };

  const strength       = getPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsBad   = confirmPassword.length > 0 && password !== confirmPassword;

  const getInsights = () => {
    const insights = [];
    if (fullName.trim().length > 0) {
      insights.push(fullName.trim().split(" ").filter(Boolean).length < 2
        ? { status:"warn", msg:"Please enter both first and last name." }
        : { status:"good", msg:"Name looks good." });
    }
    if (email.length > 0)
      insights.push(/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
        ? { status:"good", msg:"Email format valid." }
        : { status:"warn", msg:"Email format looks invalid." });
    if (country) insights.push({ status:"good", msg:`Great! ${country} is supported.` });
    if (password.length > 0 && strength) {
      const msgs = { Weak:"Weak password — add numbers or symbols.", Fair:"Fair — try adding uppercase letters.", Good:"Good password! One more char type for Strong.", Strong:"Strong password — great choice!" };
      insights.push({ status: strength.label === "Strong" || strength.label === "Good" ? "good" : "warn", msg: msgs[strength.label] });
    }
    if (confirmPassword.length > 0)
      insights.push(passwordsMatch
        ? { status:"good", msg:"Passwords match — you're all set." }
        : { status:"warn", msg:"Passwords don't match yet." });
    if (agree) insights.push({ status:"good", msg:"Terms accepted. Ready to create account!" });
    return insights;
  };

  const insights    = getInsights();
  const goodCount   = insights.filter(i => i.status === "good").length;
  const fillPercent = Math.round((goodCount / 6) * 100);

  const validate = () => {
    const e = {};
    if (!fullName.trim())                                 e.fullName        = "Full name is required";
    if (!email.trim())                                    e.email           = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) e.email           = "Enter a valid email address";
    if (!country)                                         e.country         = "Please select your country";
    if (!password)                                        e.password        = "Password is required";
    else if (password.length < 8)                         e.password        = "Password must be at least 8 characters";
    if (!confirmPassword)                                 e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)                e.confirmPassword = "Passwords do not match";
    if (!agree)                                           e.agree           = "You must agree to the Terms of Service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError   = (field) => setErrors(prev => ({ ...prev, [field]: "" }));
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onNext && onNext(); };

  const inputClass = (field) =>
    `w-full p-3 border rounded-xl text-sm outline-none transition
    ${errors[field] ? "border-red-400 bg-red-50" : "border-gray-200 bg-gray-50 focus:border-green-400"}`;

  const ErrorMsg = ({ field }) =>
    errors[field] ? <p style={{ color:"#ef4444", fontSize:11, marginTop:4, display:"flex", alignItems:"center", gap:4 }}>⚠ {errors[field]}</p> : null;

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        *, *::before, *::after { font-family: 'Plus Jakarta Sans', sans-serif; box-sizing: border-box; }

        .wbl-bg { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; }
        .wbl-btn-primary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%);
          color:#fff; border:none; cursor:pointer; font-weight:700;
          border-radius:12px; padding:13px 32px; font-size:15px;
          box-shadow:0 4px 20px rgba(13,40,85,0.3); transition:all .2s;
        }
        .wbl-btn-primary:hover { opacity:0.92; transform:translateY(-1px); }
        .wbl-btn-secondary {
          display:inline-flex; align-items:center; justify-content:center; gap:8px;
          background:white; color:#374151; border:1.5px solid #e5e7eb; cursor:pointer;
          font-weight:600; border-radius:12px; padding:8px 18px; font-size:13px; transition:all .2s;
        }
        .wbl-btn-secondary:hover { background:#f9fafb; }
        .wbl-text-blue { color:#1B72C0; }
        .wbl-progress-fill { background: linear-gradient(90deg, #6FDA44, #1B72C0); }
        .social-btn {
          display:flex; align-items:center; justify-content:center; gap:10px;
          width:100%; border:1.5px solid #e5e7eb; border-radius:12px; padding:11px 16px;
          font-size:14px; font-weight:600; background:#fff; cursor:pointer; transition:all .18s; color:#374151;
        }
        .social-btn:hover { background:#f9fafb; border-color:#d1d5db; transform:translateY(-1px); }
        .insight-card-good { background:#f0fdf4; border:1px solid #bbf7d0; color:#166534; }
        .insight-card-warn { background:#fffbeb; border:1px solid #fde68a; color:#92400e; }
        .step-done   { background:linear-gradient(135deg,#6FDA44,#1B72C0); border-color:transparent; color:white; }
        .step-active { border-color:#1B72C0; color:#1B72C0; background:white; box-shadow:0 0 0 3px rgba(27,114,192,0.15); }
        .step-inactive { border-color:#e5e7eb; color:#9ca3af; background:white; }

        /* ══ RESPONSIVE ══ */
        @media (max-width: 640px) {
          .progress-wrap   { padding: 0 14px !important; margin: 20px auto 14px !important; }
          .layout-wrap     { flex-direction: column !important; padding: 0 14px !important; gap: 16px !important; }
          .sidebar-col     { width: 100% !important; position: static !important; }
          .main-card       { padding: 20px 16px !important; border-radius: 16px !important; }
        }
        @media (max-width: 520px) {
          .step-label { display: none !important; }
          .step-dot   { width: 22px !important; height: 22px !important; font-size: 9px !important; }
        }
        @media (max-width: 480px) {
          .page-header    { padding: 8px 12px !important; }
          .header-logo    { height: 36px !important; }
          .header-save-btn { padding: 6px 10px !important; font-size: 11px !important; }
          .header-save-label { display: none !important; }
          .social-btn     { font-size: 13px !important; padding: 10px 12px !important; }
          .wbl-btn-primary { padding: 12px 20px !important; font-size: 14px !important; width: 100% !important; }
        }
        @media (max-width: 540px) {
          .password-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 360px) {
          .step-dot { width: 18px !important; height: 18px !important; }
          .main-card { padding: 16px 12px !important; }
          .layout-wrap { padding: 0 10px !important; }
        }
      `}</style>

      <div style={{ minHeight:"100vh", paddingBottom:80, background:"#F4F9FF" }}>

        {/* Navbar */}
        <header className="page-header" style={{ background:"white", borderBottom:"1px solid #f0f0f0", padding:"12px 24px", display:"flex", alignItems:"center", justifyContent:"space-between" }}>
          <img className="header-logo" src="/weblance.jpeg" alt="Weblance" style={{ height: 54, width: 155, display: "block" }} />
          <button className="wbl-btn-secondary header-save-btn" style={{ display:"flex", alignItems:"center", gap:6 }}>
            <svg width="15" height="15" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"/>
            </svg>
            <span className="header-save-label">Save &amp; Exit</span>
          </button>
        </header>

        {/* Step Progress */}
        <div className="progress-wrap" style={{ maxWidth:1100, margin:"32px auto 24px", padding:"0 24px" }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, fontSize:13 }}>
            <span style={{ fontWeight:600, color:"#374151" }}>Step {currentStep} of {totalSteps}</span>
            <span className="wbl-text-blue" style={{ fontWeight:700 }}>{percentComplete}% Complete</span>
          </div>
          <div style={{ position:"relative", display:"flex", alignItems:"flex-start", justifyContent:"space-between" }}>
            <div style={{ position:"absolute", top:13, left:0, width:"100%", height:2, background:"#e5e7eb", zIndex:0 }} />
            <div className="wbl-progress-fill" style={{ position:"absolute", top:13, left:0, width:`${((currentStep-1)/(totalSteps-1))*100}%`, height:2, zIndex:1 }} />
            {stepLabels.map((label, i) => {
              const isActive = i + 1 === currentStep;
              const isDone   = i + 1 < currentStep;
              return (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", zIndex:10, position:"relative" }}>
                  <div className={`step-dot ${isDone ? "step-done" : isActive ? "step-active" : "step-inactive"}`}
                    style={{ width:28, height:28, borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center", border:"2px solid", fontSize:11, fontWeight:700 }}>
                    {isDone ? <svg width="13" height="13" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg> : i+1}
                  </div>
                  <span className="step-label" style={{ fontSize:10, marginTop:5, fontWeight:600, color: isActive ? "#1B72C0" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Layout */}
        <div className="layout-wrap" style={{ maxWidth:1100, margin:"0 auto", padding:"0 24px", display:"flex", gap:24, alignItems:"flex-start", flexWrap:"wrap" }}>

          {/* Form */}
          <div style={{ flex:1, minWidth:0 }}>
            <div className="main-card" style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:32 }}>

              <div style={{ marginBottom:18 }}>
                <span style={{ fontSize:11, fontWeight:800, border:"1.5px solid #22c55e", color:"#16a34a", padding:"4px 12px", borderRadius:100, textTransform:"uppercase", letterSpacing:"0.05em" }}>
                  Freelancer Account
                </span>
              </div>

              <h1 style={{ fontSize:"clamp(18px,4vw,24px)", fontWeight:800, color:"#0f172a", marginBottom:4 }}>Create Your Freelancer Account</h1>
              <p className="page-subtitle" style={{ fontSize:13, color:"#94a3b8", marginBottom:20 }}>Takes less than 2 minutes · No credit card required</p>

              <div style={{ background:"#f8fafc", border:"1px solid #e2e8f0", borderRadius:12, padding:"12px 16px", fontSize:13, color:"#64748b", marginBottom:20 }}>
                ✨ We keep signup fast. Your full profile setup comes next.
              </div>

              {/* Social */}
              <div style={{ display:"flex", flexDirection:"column", gap:10, marginBottom:18 }}>
                <button type="button" className="social-btn">
                  <svg width="18" height="18" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button type="button" className="social-btn">
                  <Github size={17} /> Continue with GitHub
                  <span style={{ fontSize:11, background:"#dcfce7", color:"#166534", fontWeight:700, padding:"3px 8px", borderRadius:100 }}>Recommended for Devs</span>
                </button>
                <button type="button" className="social-btn">
                  <Linkedin size={17} color="#0a66c2" /> Continue with LinkedIn
                </button>
              </div>

              <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:18 }}>
                <div style={{ flex:1, height:1, background:"#e5e7eb" }} />
                <span style={{ fontSize:12, color:"#94a3b8" }}>or sign up with email</span>
                <div style={{ flex:1, height:1, background:"#e5e7eb" }} />
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate style={{ display:"flex", flexDirection:"column", gap:14 }}>

                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:5, color:"#374151" }}>Full Name <span style={{color:"#ef4444"}}>*</span></label>
                  <input type="text" value={fullName} placeholder="Jane Smith"
                    onChange={e => { setFullName(e.target.value); clearError("fullName"); }}
                    className={inputClass("fullName")} style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${errors.fullName ? "#f87171" : "#e5e7eb"}`, borderRadius:12, fontSize:13, outline:"none", background: errors.fullName ? "#fef2f2" : "#f8fafc", boxSizing:"border-box" }} />
                  <ErrorMsg field="fullName" />
                </div>

                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:5, color:"#374151" }}>Email Address <span style={{color:"#ef4444"}}>*</span></label>
                  <div style={{ position:"relative" }}>
                    <Mail size={15} style={{ position:"absolute", left:12, top:13, color:"#9ca3af", pointerEvents:"none" }} />
                    <input type="email" value={email} placeholder="you@example.com"
                      onChange={e => { setEmail(e.target.value); clearError("email"); }}
                      style={{ width:"100%", padding:"11px 14px 11px 36px", border:`1.5px solid ${errors.email ? "#f87171" : "#e5e7eb"}`, borderRadius:12, fontSize:13, outline:"none", background: errors.email ? "#fef2f2" : "#f8fafc", boxSizing:"border-box" }} />
                  </div>
                  <ErrorMsg field="email" />
                </div>

                <div>
                  <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:5, color:"#374151" }}>Country <span style={{color:"#ef4444"}}>*</span></label>
                  <div style={{ position:"relative" }}>
                    <select value={country}
                      onChange={e => { setCountry(e.target.value); clearError("country"); }}
                      style={{ width:"100%", padding:"11px 36px 11px 14px", border:`1.5px solid ${errors.country ? "#f87171" : "#e5e7eb"}`, borderRadius:12, fontSize:13, outline:"none", appearance:"none", background: errors.country ? "#fef2f2" : "#f8fafc", boxSizing:"border-box" }}>
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c}>{c}</option>)}
                    </select>
                    <ChevronDown size={15} style={{ position:"absolute", right:12, top:13, color:"#9ca3af", pointerEvents:"none" }} />
                  </div>
                  <ErrorMsg field="country" />
                </div>

                {/* Passwords */}
                <div className="password-grid" style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:14 }}>
                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:5, color:"#374151" }}>Password <span style={{color:"#ef4444"}}>*</span></label>
                    <div style={{ position:"relative" }}>
                      <input type={showPassword ? "text" : "password"} value={password} placeholder="8+ characters"
                        onChange={e => { setPassword(e.target.value); clearError("password"); }}
                        style={{ width:"100%", padding:"11px 36px 11px 14px", border:`1.5px solid ${errors.password ? "#f87171" : "#e5e7eb"}`, borderRadius:12, fontSize:13, outline:"none", background: errors.password ? "#fef2f2" : "#f8fafc", boxSizing:"border-box" }} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        style={{ position:"absolute", right:12, top:12, color:"#9ca3af", background:"none", border:"none", cursor:"pointer", padding:0 }}>
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {password && strength && (
                      <div style={{ marginTop:6 }}>
                        <div style={{ display:"flex", gap:3, marginBottom:3 }}>
                          {[1,2,3,4].map(bar => (
                            <div key={bar} style={{ height:4, flex:1, borderRadius:2, background: bar <= strength.bars ? (strength.bars === 4 ? "#22c55e" : strength.bars === 3 ? "#60a5fa" : strength.bars === 2 ? "#facc15" : "#f87171") : "#e5e7eb" }} />
                          ))}
                        </div>
                        <span style={{ fontSize:11, fontWeight:700, color: strength.bars === 4 ? "#16a34a" : strength.bars === 3 ? "#1d4ed8" : strength.bars === 2 ? "#ca8a04" : "#dc2626" }}>{strength.label}</span>
                      </div>
                    )}
                    <ErrorMsg field="password" />
                  </div>

                  <div>
                    <label style={{ display:"block", fontSize:13, fontWeight:700, marginBottom:5, color:"#374151" }}>Confirm Password <span style={{color:"#ef4444"}}>*</span></label>
                    <input type="password" value={confirmPassword} placeholder="Re-enter password"
                      onChange={e => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
                      style={{ width:"100%", padding:"11px 14px", border:`1.5px solid ${passwordsMatch ? "#22c55e" : (errors.confirmPassword || passwordsBad) ? "#f87171" : "#e5e7eb"}`, borderRadius:12, fontSize:13, outline:"none", background: passwordsMatch ? "#f0fdf4" : (errors.confirmPassword || passwordsBad) ? "#fef2f2" : "#f8fafc", boxSizing:"border-box" }} />
                    {passwordsMatch && <p style={{ color:"#16a34a", fontSize:11, marginTop:3, fontWeight:600 }}>✓ Passwords match</p>}
                    {passwordsBad  && <p style={{ color:"#ef4444", fontSize:11, marginTop:3 }}>✗ Passwords do not match</p>}
                    <ErrorMsg field="confirmPassword" />
                  </div>
                </div>

                {/* Role */}
                <div style={{ background:"#eff6ff", border:"1px solid #bfdbfe", borderRadius:12, padding:"11px 14px", display:"flex", alignItems:"center", gap:10, flexWrap:"wrap" }}>
                  <span style={{ fontSize:11, fontWeight:800, background:"#dcfce7", color:"#166534", padding:"3px 10px", borderRadius:100 }}>Freelancer</span>
                  <span style={{ fontSize:13, color:"#1d4ed8", fontWeight:600 }}>Role auto-selected: Solo Professional</span>
                </div>

                {/* Not Asked */}
                <div style={{ border:"1px solid #f0f0f0", borderRadius:12, padding:"12px 14px" }}>
                  <p style={{ fontSize:12, fontWeight:700, color:"#374151", marginBottom:8 }}>What's NOT asked yet:</p>
                  {notAsked.map((item, i) => (
                    <div key={i} style={{ display:"flex", alignItems:"center", gap:8, fontSize:13, color:"#6b7280", marginBottom: i < notAsked.length - 1 ? 5 : 0 }}>
                      <span style={{ color:"#ef4444", fontWeight:700 }}>✕</span> {item}
                    </div>
                  ))}
                </div>

                {/* Terms */}
                <div>
                  <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer" }}>
                    <input type="checkbox" checked={agree}
                      onChange={e => { setAgree(e.target.checked); clearError("agree"); }}
                      style={{ width:16, height:16, marginTop:2, flexShrink:0, accentColor:"#1B72C0" }} />
                    <span style={{ fontSize:13, color:"#6b7280" }}>
                      I agree to the <a href="#" className="wbl-text-blue" style={{ fontWeight:600, textDecoration:"none" }}>Terms of Service</a> and <a href="#" className="wbl-text-blue" style={{ fontWeight:600, textDecoration:"none" }}>Privacy Policy</a>
                    </span>
                  </label>
                  <ErrorMsg field="agree" />
                </div>

                <button type="submit" className="wbl-btn-primary" style={{ width:"100%", marginTop:4 }}>
                  Create Account
                  <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-col" style={{ width:280, flexShrink:0 }}>
            <div style={{ background:"white", borderRadius:20, border:"1px solid #f0f0f0", boxShadow:"0 2px 20px rgba(0,0,0,0.06)", padding:20, position:"sticky", top:24 }}>
              <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:14 }}>
                <div style={{ width:34, height:34, borderRadius:10, background:"#f3e8ff", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <svg width="16" height="16" fill="none" stroke="#9333ea" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span style={{ fontWeight:800, fontSize:14, color:"#1f2937" }}>AI Insights</span>
              </div>

              {insights.length === 0 ? (
                <p style={{ textAlign:"center", padding:"20px 8px", color:"#94a3b8", fontSize:12 }}>Start filling the form to see real-time AI feedback.</p>
              ) : (
                <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
                  {insights.map((insight, i) => (
                    <div key={i} className={insight.status === "good" ? "insight-card-good" : "insight-card-warn"}
                      style={{ display:"flex", alignItems:"flex-start", gap:8, padding:"10px 12px", borderRadius:10, fontSize:12, fontWeight:500 }}>
                      {insight.status === "good"
                        ? <svg width="15" height="15" fill="#22c55e" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>
                        : <svg width="15" height="15" fill="#f59e0b" viewBox="0 0 20 20" style={{ flexShrink:0, marginTop:1 }}><path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/></svg>}
                      {insight.msg}
                    </div>
                  ))}
                </div>
              )}

              {insights.length > 0 && (
                <div style={{ marginTop:14, paddingTop:14, borderTop:"1px solid #f0f0f0" }}>
                  <div style={{ display:"flex", justifyContent:"space-between", fontSize:11, color:"#6b7280", marginBottom:5 }}>
                    <span>Form completion</span>
                    <span className="wbl-text-blue" style={{ fontWeight:800 }}>{fillPercent}%</span>
                  </div>
                  <div style={{ background:"#f3f4f6", borderRadius:100, height:6 }}>
                    <div className="wbl-progress-fill" style={{ width:`${fillPercent}%`, height:"100%", borderRadius:100, transition:"width .5s" }} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}