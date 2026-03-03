import { useState } from "react";
import { ChevronDown, Eye, EyeOff, Github, Linkedin, Mail } from "lucide-react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Australia", "Austria",
  "Bangladesh", "Belgium", "Brazil", "Canada", "Chile", "China", "Colombia",
  "Croatia", "Czech Republic", "Denmark", "Egypt", "Finland", "France",
  "Germany", "Ghana", "Greece", "Hungary", "India", "Indonesia", "Iran",
  "Iraq", "Ireland", "Israel", "Italy", "Japan", "Jordan", "Kenya",
  "Malaysia", "Mexico", "Morocco", "Netherlands", "New Zealand", "Nigeria",
  "Norway", "Pakistan", "Peru", "Philippines", "Poland", "Portugal",
  "Romania", "Russia", "Saudi Arabia", "South Africa", "South Korea",
  "Spain", "Sri Lanka", "Sweden", "Switzerland", "Thailand", "Turkey",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom",
  "United States", "Venezuela", "Vietnam", "Zimbabwe"
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

  /* ── Password Strength ── */
  const getPasswordStrength = (pass) => {
    if (!pass) return null;
    let score = 0;
    if (pass.length >= 8)           score++;
    if (/[A-Z]/.test(pass))         score++;
    if (/[0-9]/.test(pass))         score++;
    if (/[^A-Za-z0-9]/.test(pass))  score++;
    if (score <= 1) return { label: "Weak",   color: "bg-red-400",    bars: 1, textColor: "text-red-500"    };
    if (score === 2) return { label: "Fair",  color: "bg-yellow-400", bars: 2, textColor: "text-yellow-500" };
    if (score === 3) return { label: "Good",  color: "bg-blue-400",   bars: 3, textColor: "text-blue-500"   };
    return                { label: "Strong", color: "bg-green-500",  bars: 4, textColor: "text-green-600"  };
  };

  const strength       = getPasswordStrength(password);
  const passwordsMatch = confirmPassword.length > 0 && password === confirmPassword;
  const passwordsBad   = confirmPassword.length > 0 && password !== confirmPassword;

  /* ── AI Insights ── */
  const getInsights = () => {
    const insights = [];

    if (fullName.trim().length === 0) {
      // silent — don't nag before they start
    } else if (fullName.trim().split(" ").filter(Boolean).length < 2) {
      insights.push({ status: "warn", msg: "Please enter both first and last name." });
    } else {
      insights.push({ status: "good", msg: "Name looks good." });
    }

    if (email.length > 0) {
      if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        insights.push({ status: "good", msg: "Email format valid." });
      } else {
        insights.push({ status: "warn", msg: "Email format looks invalid." });
      }
    }

    if (country) {
      insights.push({ status: "good", msg: `Great! ${country} is supported.` });
    }

    if (password.length > 0 && strength) {
      if (strength.label === "Weak")   insights.push({ status: "warn", msg: "Weak password — add numbers or symbols." });
      if (strength.label === "Fair")   insights.push({ status: "warn", msg: "Fair — try adding uppercase letters." });
      if (strength.label === "Good")   insights.push({ status: "good", msg: "Good password! One more char type for Strong." });
      if (strength.label === "Strong") insights.push({ status: "good", msg: "Strong password — great choice!" });
    }

    if (confirmPassword.length > 0) {
      if (passwordsMatch) insights.push({ status: "good", msg: "Passwords match — you're all set." });
      else                insights.push({ status: "warn", msg: "Passwords don't match yet." });
    }

    if (agree) {
      insights.push({ status: "good", msg: "Terms accepted. Ready to create account!" });
    }

    return insights;
  };

  const insights   = getInsights();
  const goodCount  = insights.filter(i => i.status === "good").length;
  const totalChecks = 6;
  const fillPercent = Math.round((goodCount / totalChecks) * 100);

  /* ── Validation ── */
  const validate = () => {
    const e = {};
    if (!fullName.trim())                                  e.fullName        = "Full name is required";
    if (!email.trim())                                     e.email           = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))  e.email           = "Enter a valid email address";
    if (!country)                                          e.country         = "Please select your country";
    if (!password)                                         e.password        = "Password is required";
    else if (password.length < 8)                          e.password        = "Password must be at least 8 characters";
    if (!confirmPassword)                                  e.confirmPassword = "Please confirm your password";
    else if (password !== confirmPassword)                 e.confirmPassword = "Passwords do not match";
    if (!agree)                                            e.agree           = "You must agree to the Terms of Service";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const clearError   = (field) => setErrors(prev => ({ ...prev, [field]: "" }));
  const handleSubmit = (e) => { e.preventDefault(); if (validate()) onNext(); };

  /* ── Helpers ── */
  const inputClass = (field) =>
    `w-full p-3 border rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-blue-100
    ${errors[field]
      ? "border-red-400 bg-red-50 focus:border-red-400"
      : "border-gray-200 bg-gray-50 focus:border-blue-400"}`;

  const ErrorMsg = ({ field }) =>
    errors[field] ? (
      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
        </svg>
        {errors[field]}
      </p>
    ) : null;

  /* ════════════════════════════════════════ */
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
          <div className="absolute top-3.5 sm:top-4 left-0 w-full h-0.5 bg-gray-200 z-0"></div>
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
                <span className={`text-[9px] sm:text-xs mt-1 font-medium hidden sm:block
                  ${isActive ? "text-blue-600" : "text-gray-400"}`}>
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

          {/* ── Main Form Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Create Your Freelancer Account</h1>
              <p className="text-sm text-gray-500 mb-5">Takes less than 2 minutes</p>

              <div className="mb-4">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Freelancer Account
                </span>
              </div>

              <div className="border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-500 mb-6">
                We keep signup fast. Your full profile setup comes next.
              </div>

              {/* Social Buttons */}
              <div className="flex flex-col gap-3 mb-5">
                <button type="button" className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition">
                  <svg className="w-5 h-5 flex-shrink-0" viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Continue with Google
                </button>
                <button type="button" className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition">
                  <Github size={18} className="flex-shrink-0" />
                  <span>Continue with GitHub</span>
                  <span className="text-xs bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded-full whitespace-nowrap">Recommended for Devs</span>
                </button>
                <button type="button" className="flex items-center justify-center gap-3 w-full border border-gray-200 rounded-xl py-3 text-sm font-medium hover:bg-gray-50 transition">
                  <Linkedin size={18} className="text-blue-600 flex-shrink-0" />
                  Continue with LinkedIn
                </button>
              </div>

              {/* Divider */}
              <div className="flex items-center gap-3 mb-5">
                <div className="flex-1 h-px bg-gray-200"></div>
                <span className="text-xs text-gray-400 whitespace-nowrap">or sign up with email</span>
                <div className="flex-1 h-px bg-gray-200"></div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} noValidate className="space-y-4">

                {/* Full Name */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" value={fullName} placeholder="Jane Smith"
                    onChange={(e) => { setFullName(e.target.value); clearError("fullName"); }}
                    className={inputClass("fullName")} />
                  <ErrorMsg field="fullName" />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
                    <input type="email" value={email} placeholder="you@example.com"
                      onChange={(e) => { setEmail(e.target.value); clearError("email"); }}
                      className={`${inputClass("email")} pl-10`} />
                  </div>
                  <ErrorMsg field="email" />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-semibold mb-1.5">Country <span className="text-red-500">*</span></label>
                  <div className="relative">
                    <select value={country}
                      onChange={(e) => { setCountry(e.target.value); clearError("country"); }}
                      className={`${inputClass("country")} appearance-none pr-10`}>
                      <option value="">Select country</option>
                      {countries.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                    <ChevronDown className="absolute right-3 top-3.5 text-gray-400 pointer-events-none" size={16} />
                  </div>
                  <ErrorMsg field="country" />
                </div>

                {/* Password Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Password <span className="text-red-500">*</span></label>
                    <div className="relative">
                      <input type={showPassword ? "text" : "password"} value={password} placeholder="8+ characters"
                        onChange={(e) => { setPassword(e.target.value); clearError("password"); }}
                        className={`${inputClass("password")} pr-10`} />
                      <button type="button" onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600 transition">
                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                      </button>
                    </div>
                    {password && (
                      <div className="mt-2">
                        <div className="flex gap-1 mb-1">
                          {[1,2,3,4].map(bar => (
                            <div key={bar} className={`h-1.5 flex-1 rounded-full transition-all duration-300
                              ${strength && bar <= strength.bars ? strength.color : "bg-gray-200"}`} />
                          ))}
                        </div>
                        <span className={`text-xs font-semibold ${strength?.textColor}`}>{strength?.label}</span>
                      </div>
                    )}
                    <ErrorMsg field="password" />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-1.5">Confirm Password <span className="text-red-500">*</span></label>
                    <input type="password" value={confirmPassword} placeholder="Re-enter password"
                      onChange={(e) => { setConfirmPassword(e.target.value); clearError("confirmPassword"); }}
                      className={`w-full p-3 border rounded-xl text-sm outline-none transition focus:ring-2 focus:ring-blue-100
                        ${passwordsMatch ? "border-green-400 bg-green-50 focus:border-green-400"
                          : errors.confirmPassword || passwordsBad ? "border-red-400 bg-red-50 focus:border-red-400"
                          : "border-gray-200 bg-gray-50 focus:border-blue-400"}`} />
                    {passwordsMatch && (
                      <p className="text-green-600 text-xs mt-1 flex items-center gap-1 font-medium">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"/>
                        </svg>
                        Passwords match ✓
                      </p>
                    )}
                    {passwordsBad && (
                      <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                        <svg className="w-3 h-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                        Passwords do not match
                      </p>
                    )}
                    <ErrorMsg field="confirmPassword" />
                  </div>
                </div>

                {/* Role Badge */}
                <div className="border border-gray-200 rounded-xl px-4 py-3 flex items-center gap-3 bg-blue-50">
                  <span className="text-xs font-bold bg-green-100 text-green-700 px-2 py-1 rounded-lg whitespace-nowrap">Freelancer</span>
                  <span className="text-sm text-blue-700 font-medium">Role auto-selected: Solo Professional</span>
                </div>

                {/* What's NOT asked */}
                <div className="border border-gray-200 rounded-xl px-4 py-4">
                  <h4 className="text-sm font-semibold text-gray-700 mb-3">What's NOT asked yet:</h4>
                  <ul className="space-y-2">
                    {notAsked.map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-sm text-gray-500">
                        <span className="text-red-500 font-bold text-base">✕</span> {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Terms */}
                <div>
                  <label className="flex items-start gap-2 cursor-pointer select-none">
                    <input type="checkbox" checked={agree}
                      onChange={(e) => { setAgree(e.target.checked); clearError("agree"); }}
                      className="w-4 h-4 mt-0.5 rounded border-gray-300 accent-blue-500 flex-shrink-0" />
                    <span className="text-sm text-gray-600">
                      I agree to the <a href="#" className="text-blue-500 hover:underline">Terms of Service</a> and <a href="#" className="text-blue-500 hover:underline">Privacy Policy</a>
                    </span>
                  </label>
                  <ErrorMsg field="agree" />
                </div>

                {/* Submit */}
                <div className="flex justify-end pt-2">
                  <button type="submit"
                    className="bg-blue-500 hover:bg-blue-600 active:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center justify-center gap-2 transition shadow-sm w-full sm:w-auto">
                    Create Account
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

              {/* Header */}
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                  <svg className="w-4 h-4 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                </div>
                <span className="font-bold text-gray-800 text-sm">AI Insights</span>
              </div>

              {/* Insights List */}
              {insights.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-8 px-2">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  Start filling the form to see real-time AI feedback.
                </div>
              ) : (
                <div className="space-y-2">
                  {insights.map((insight, i) => (
                    <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                      ${insight.status === "good"
                        ? "bg-green-50 border border-green-100 text-green-800"
                        : "bg-yellow-50 border border-yellow-100 text-yellow-800"}`}>
                      {insight.status === "good" ? (
                        <svg className="w-4 h-4 text-green-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4 text-yellow-500 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                        </svg>
                      )}
                      {insight.msg}
                    </div>
                  ))}
                </div>
              )}

              {/* Form Completion Progress */}
              {insights.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Form completion</span>
                    <span className="font-semibold text-blue-600">{fillPercent}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${fillPercent}%` }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}