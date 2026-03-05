import { useState } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

export default function Step2_Verify({ onNext, onBack, currentStep = 2, totalSteps = 12 }) {
  const [emailVerified, setEmailVerified] = useState(false);
  const [phone, setPhone]                 = useState("");
  const [codeSent, setCodeSent]           = useState(false);
  const [code, setCode]                   = useState("");
  const [phoneVerified, setPhoneVerified] = useState(false);
  const [codeError, setCodeError]         = useState("");

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  /* ── AI Insights ── */
  const getInsights = () => {
    const insights = [];
    if (emailVerified) insights.push({ status: "good", msg: "Email verified successfully." });
    if (phone.length >= 10 && !codeSent) insights.push({ status: "good", msg: "Phone number looks valid." });
    if (codeSent && !phoneVerified)  insights.push({ status: "warn", msg: "Enter the 6-digit code sent to your phone." });
    if (phoneVerified) insights.push({ status: "good", msg: "Phone verified! Identity confirmed." });
    if (emailVerified && phoneVerified) insights.push({ status: "good", msg: "Both verified — you're ready to continue!" });
    return insights;
  };

  const insights = getInsights();

  const handleSendCode = () => {
    if (phone.length >= 6) { setCodeSent(true); setCodeError(""); }
  };

  const handleVerifyCode = () => {
    if (code.length === 6) { setPhoneVerified(true); setCodeError(""); }
    else setCodeError("Please enter the complete 6-digit code.");
  };

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
          
        </div>
      </header>

      {/* ── Progress Steps ── */}
      <div className="max-w-6xl mx-auto mt-6 sm:mt-8 px-4 sm:px-6 mb-6 sm:mb-8">
        <div className="flex justify-between text-xs sm:text-sm mb-3">
          <span className="font-medium text-gray-700">Step {currentStep} of {totalSteps}</span>
          <span className="text-blue-600 font-semibold">{percentComplete}% Complete</span>
        </div>

        <div className="relative flex items-start justify-between">
          {/* Gray base line */}
          <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"></div>
          {/* Blue filled line */}
          <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}></div>

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

          {/* ── Main Card ── */}
          <div className="w-full lg:flex-1 min-w-0">
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6 sm:p-8">

              <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Verify Your Identity</h1>
              <p className="text-sm text-gray-500 mb-8">Email &amp; phone verification builds trust</p>

              {/* Verification Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">

                {/* Email Verification */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
                    </svg>
                    <span className="font-semibold text-sm text-gray-800">Email Verification</span>
                  </div>

                  {emailVerified ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mt-4">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Email Verified ✓
                    </div>
                  ) : (
                    <>
                      <p className="text-xs text-gray-500 mb-4">We sent a verification link to your email.</p>
                      <button
                        onClick={() => setEmailVerified(true)}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 text-sm font-medium text-gray-700 hover:bg-gray-50 transition"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                        </svg>
                        Simulate Verify
                      </button>
                    </>
                  )}
                </div>

                {/* Phone Verification */}
                <div className="border border-gray-200 rounded-xl p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/>
                    </svg>
                    <span className="font-semibold text-sm text-gray-800">Phone Verification</span>
                  </div>

                  {phoneVerified ? (
                    <div className="flex items-center gap-2 text-green-600 font-semibold text-sm mt-2">
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                      </svg>
                      Phone Verified ✓
                    </div>
                  ) : (
                    <>
                      {/* Phone Number Input */}
                      <label className="block text-xs font-medium text-gray-700 mb-1.5">
                        Phone Number <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="tel"
                        placeholder="+1 (555) 000-0000"
                        value={phone}
                        onChange={e => { setPhone(e.target.value); setCodeSent(false); setCode(""); }}
                        className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition mb-3"
                      />

                      {/* Send Code button (before code sent) */}
                      {!codeSent && (
                        <button
                          onClick={handleSendCode}
                          disabled={phone.length < 6}
                          className="w-full py-2.5 rounded-xl text-sm font-semibold transition bg-blue-500 hover:bg-blue-600 disabled:opacity-40 disabled:cursor-not-allowed text-white"
                        >
                          Send Verification Code
                        </button>
                      )}

                      {/* Code entry (after code sent) */}
                      {codeSent && (
                        <>
                          <label className="block text-xs font-medium text-gray-700 mb-1.5 mt-1">
                            Enter 6-digit code
                          </label>
                          <input
                            type="text"
                            inputMode="numeric"
                            maxLength={6}
                            placeholder="_ _ _ _ _ _"
                            value={code}
                            onChange={e => { setCode(e.target.value.replace(/\D/g, "")); setCodeError(""); }}
                            className="w-full border-2 border-blue-400 rounded-xl px-3 py-2.5 text-sm text-center tracking-[0.5em] font-bold outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition mb-3"
                          />
                          {codeError && (
                            <p className="text-red-500 text-xs mb-2">{codeError}</p>
                          )}
                          <div className="flex gap-2">
                            <button
                              onClick={handleVerifyCode}
                              className="flex-1 py-2.5 rounded-xl text-sm font-semibold bg-blue-500 hover:bg-blue-600 text-white transition"
                            >
                              Verify
                            </button>
                            <button
                              onClick={() => { setCodeSent(false); setCode(""); setCodeError(""); }}
                              className="px-3 py-2.5 rounded-xl text-sm font-medium border border-gray-200 text-gray-500 hover:bg-gray-50 transition"
                            >
                              Resend
                            </button>
                          </div>
                        </>
                      )}
                    </>
                  )}
                </div>
              </div>

              {/* Why we verify */}
              <div className="bg-blue-50 border border-blue-100 rounded-xl px-5 py-4 mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">Why we verify:</p>
                <ul className="space-y-1">
                  {["Prevent fake accounts", "Enable important notifications", "Required for secure payments"].map((item, i) => (
                    <li key={i} className="text-sm text-gray-600 flex items-center gap-2">
                      <span className="text-blue-500 font-bold">✓</span> {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Trust badge */}
              <div className="border-t border-gray-100 pt-4">
                <span className="text-xs font-bold tracking-widest text-gray-400 uppercase">
                  Account Trust: Identity Verified
                </span>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext}
                className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm">
                Continue to Profile Setup →
              </button>
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

              {insights.length === 0 ? (
                <div className="text-xs text-gray-400 text-center py-8 px-2">
                  <svg className="w-8 h-8 mx-auto mb-2 text-gray-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                  </svg>
                  Verify your email or phone to see AI feedback.
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

              {/* Progress Bar */}
              {insights.length > 0 && (
                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between text-xs text-gray-500 mb-1.5">
                    <span>Verification progress</span>
                    <span className="font-semibold text-blue-600">
                      {emailVerified && phoneVerified ? 100 : emailVerified || phoneVerified ? 50 : 0}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-1.5">
                    <div
                      className="bg-blue-500 h-1.5 rounded-full transition-all duration-500"
                      style={{ width: `${emailVerified && phoneVerified ? 100 : emailVerified || phoneVerified ? 50 : 0}%` }}
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
