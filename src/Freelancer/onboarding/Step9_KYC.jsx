import { useState, useRef } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const idTypes = ["Choose document type", "Passport", "National ID Card", "Driver's License"];

// Passport = front only; others = front + back
const idConfig = {
  "Passport":         { sides: ["Front"] },
  "National ID Card": { sides: ["Front", "Back"] },
  "Driver's License": { sides: ["Front", "Back"] },
};

const DocIcon = () => (
  <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5}
      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/>
  </svg>
);

function UploadSlot({ label, onUpload, uploaded }) {
  const ref = useRef();
  return (
    <div className={`border-2 border-dashed rounded-xl p-5 flex flex-col items-center justify-center gap-3 transition min-h-[160px]
      ${uploaded ? "border-green-300 bg-green-50" : "border-gray-200 bg-white hover:border-blue-300 hover:bg-blue-50"}`}>
      {uploaded ? (
        <>
          <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
            <svg className="w-6 h-6 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
            </svg>
          </div>
          <p className="text-sm font-semibold text-green-700">{label} — Uploaded</p>
          <button onClick={() => ref.current.click()}
            className="text-xs text-blue-500 hover:underline">Change file</button>
        </>
      ) : (
        <>
          <DocIcon/>
          <p className="text-sm font-semibold text-gray-600">{label}</p>
          <button onClick={() => ref.current.click()}
            className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-100 transition">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
            </svg>
            Upload
          </button>
        </>
      )}
      <input ref={ref} type="file" accept="image/*,.pdf" onChange={() => onUpload()} className="hidden"/>
    </div>
  );
}

export default function Step9_KYC({ onNext, onBack, currentStep = 9, totalSteps = 12 }) {
  const [idType, setIdType]           = useState("Choose document type");
  const [idOpen, setIdOpen]           = useState(false);
  const [uploads, setUploads]         = useState({ front: false, back: false });
  const [addressUploaded, setAddressUploaded] = useState(false);
  const [selfieVerified, setSelfieVerified]   = useState(false);
  const [selfieLoading, setSelfieLoading]     = useState(false);
  const addressRef = useRef();
  const selfieRef  = useRef();

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  const config      = idConfig[idType];
  const needsBack   = config?.sides.length === 2;
  const idSelected  = idType !== "Choose document type";
  const frontDone   = uploads.front;
  const backDone    = !needsBack || uploads.back;
  const idComplete  = idSelected && frontDone && backDone;

  const handleSelfie = () => {
    if (selfieVerified) return;
    setSelfieLoading(true);
    setTimeout(() => { setSelfieVerified(true); setSelfieLoading(false); }, 1800);
  };

  const getInsights = () => {
    const insights = [];
    if (!idSelected) insights.push({ status: "tip", msg: "Upload a government ID to enable payments." });
    if (idSelected && !idComplete) insights.push({ status: "warn", msg: `Upload your ${idType} to continue.` });
    if (idComplete) insights.push({ status: "good", msg: `${idType} uploaded successfully.` });
    if (addressUploaded) insights.push({ status: "good", msg: "Address proof verified." });
    if (selfieVerified) insights.push({ status: "good", msg: "Selfie verified — +20 trust points added!" });
    if (idComplete && addressUploaded && !selfieVerified) {
      insights.push({ status: "tip", msg: "Take a selfie for +20 bonus trust points." });
    }
    return insights;
  };
  const insights = getInsights();

  const canSubmit = idComplete;

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
          <div className="absolute top-3.5 sm:top-4 left-0 w-full h-1 bg-gray-200 z-0 rounded-full"/>
          <div className="absolute top-3.5 sm:top-4 left-0 h-1 bg-blue-500 z-0 rounded-full transition-all duration-500"
            style={{ width: progressWidth }}/>
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

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Verify Your Identity</h1>
              <p className="text-sm text-gray-500 mb-5">Required for receiving payments and accessing premium projects</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-green-500 text-green-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  KYC Verification
                </span>
              </div>

              {/* Required banner */}
              <div className="flex items-start gap-3 bg-orange-50 border border-orange-200 rounded-xl px-4 py-3.5 mb-6">
                <span className="text-base flex-shrink-0">🔒</span>
                <div className="text-sm text-orange-800">
                  <span className="font-semibold">Identity verification is required to:</span>
                  <p className="mt-0.5 text-xs leading-relaxed">
                    ✓ Receive milestone payments &nbsp;•&nbsp; ✓ Withdraw earnings &nbsp;•&nbsp; ✓ Access $5,000+ projects &nbsp;•&nbsp; ✓ Build client trust
                  </p>
                </div>
              </div>

              {/* ── Select ID Type ── */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-800 mb-2">
                  Select ID Type <span className="text-red-500">*</span>
                </label>

                {/* Custom dropdown */}
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setIdOpen(o => !o)}
                    className={`w-full flex items-center justify-between border-2 rounded-xl px-4 py-3 text-sm transition
                      ${idSelected ? "border-blue-400 bg-white text-gray-800 font-semibold" : "border-gray-200 bg-gray-50 text-gray-500"}`}
                  >
                    {idType}
                    <svg className={`w-4 h-4 text-gray-400 transition-transform ${idOpen ? "rotate-180" : ""}`}
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </button>

                  {idOpen && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-20 overflow-hidden py-1">
                      {idTypes.slice(1).map(opt => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setIdType(opt);
                            setIdOpen(false);
                            setUploads({ front: false, back: false });
                          }}
                          className={`w-full text-left px-5 py-3 text-sm flex items-center gap-2 hover:bg-blue-50 transition
                            ${opt === idType ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"}`}
                        >
                          {opt === idType && (
                            <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                            </svg>
                          )}
                          {opt !== idType && <span className="w-4"/>}
                          {opt}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* ID Upload slots — shown after selection */}
                {idSelected && config && (
                  <div className={`mt-4 grid gap-4 ${config.sides.length === 2 ? "grid-cols-2" : "grid-cols-1 max-w-xs"}`}>
                    <UploadSlot
                      label={`${idType} — Front`}
                      uploaded={uploads.front}
                      onUpload={() => setUploads(p => ({ ...p, front: true }))}
                    />
                    {needsBack && (
                      <UploadSlot
                        label={`${idType} — Back`}
                        uploaded={uploads.back}
                        onUpload={() => setUploads(p => ({ ...p, back: true }))}
                      />
                    )}
                  </div>
                )}
              </div>

              {/* ── Address Proof ── */}
              <div className="mb-5">
                <label className="block text-sm font-semibold text-gray-800 mb-3">Address Proof</label>
                <div className={`flex items-center gap-4 border rounded-xl px-4 py-3.5 transition
                  ${addressUploaded ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
                  <div className="w-9 h-9 rounded-lg bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">Utility bill, bank statement, or government letter</p>
                    <p className="text-xs text-gray-500 mt-0.5">Must be issued within the last 3 months</p>
                  </div>
                  {addressUploaded ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      ✓ UPLOADED
                    </span>
                  ) : (
                    <>
                      <button onClick={() => addressRef.current.click()}
                        className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex-shrink-0">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/>
                        </svg>
                        Upload
                      </button>
                      <input ref={addressRef} type="file" accept="image/*,.pdf"
                        onChange={() => setAddressUploaded(true)} className="hidden"/>
                    </>
                  )}
                </div>
              </div>

              {/* ── Selfie / Liveness Check ── */}
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-800 mb-1">
                  Selfie / Liveness Check{" "}
                  <span className="text-gray-400 font-normal text-xs">(Optional — +20 trust pts)</span>
                </label>
                <div className={`flex items-center gap-4 border rounded-xl px-4 py-3.5 transition
                  ${selfieVerified ? "border-green-200 bg-green-50" : "border-gray-200 bg-white"}`}>
                  <div className="w-9 h-9 rounded-lg bg-purple-50 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800">Quick selfie to confirm your identity</p>
                    <p className="text-xs text-gray-500 mt-0.5">Compared to your ID photo automatically</p>
                  </div>
                  {selfieVerified ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-700 bg-green-100 px-2.5 py-1 rounded-full whitespace-nowrap flex-shrink-0">
                      ✓ VERIFIED
                    </span>
                  ) : (
                    <button onClick={handleSelfie} disabled={selfieLoading}
                      className="flex items-center gap-1.5 px-4 py-2 border border-gray-200 rounded-xl text-xs font-semibold text-gray-700 hover:bg-gray-50 transition flex-shrink-0 disabled:opacity-50">
                      {selfieLoading ? (
                        <svg className="w-4 h-4 animate-spin text-purple-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                        </svg>
                      ) : (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"/>
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"/>
                        </svg>
                      )}
                      {selfieLoading ? "Verifying..." : "Take Selfie"}
                    </button>
                  )}
                </div>
              </div>

              {/* ── Until verified warning ── */}
              <div className="border border-orange-200 bg-orange-50 rounded-xl px-4 py-3.5">
                <p className="text-sm font-semibold text-orange-700 flex items-center gap-1.5 mb-1.5">
                  <svg className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                  </svg>
                  Until identity is verified:
                </p>
                <p className="text-xs text-orange-700 leading-relaxed">
                  ❌ Cannot withdraw earnings &nbsp;•&nbsp; ❌ Cannot access $5,000+ projects &nbsp;•&nbsp; ✓ Can still browse and apply to small projects
                </p>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex justify-between mt-6">
              <button onClick={onBack}
                className="flex items-center gap-2 px-6 py-3 border border-gray-200 bg-white rounded-xl text-sm font-medium hover:bg-gray-50 transition">
                ← Back
              </button>
              <button onClick={onNext} disabled={!canSubmit}
                className={`font-semibold px-6 sm:px-8 py-3 rounded-xl flex items-center gap-2 transition shadow-sm
                  ${canSubmit
                    ? "bg-blue-500 hover:bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                Submit for Verification
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                </svg>
              </button>
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
                  <div key={i} className={`flex items-start gap-2.5 px-3 py-2.5 rounded-xl text-xs font-medium
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

              {/* KYC checklist */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">Verification checklist:</p>
                <div className="space-y-2">
                  {[
                    { label: "Government ID",  done: idComplete    },
                    { label: "Address Proof",  done: addressUploaded },
                    { label: "Selfie Check",   done: selfieVerified, optional: true },
                  ].map(item => (
                    <div key={item.label} className="flex items-center gap-2">
                      <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0
                        ${item.done ? "bg-green-500" : "border-2 border-gray-300"}`}>
                        {item.done && (
                          <svg className="w-2.5 h-2.5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/>
                          </svg>
                        )}
                      </div>
                      <span className={`text-xs ${item.done ? "text-green-700 font-semibold" : "text-gray-500"}`}>
                        {item.label}
                        {item.optional && <span className="text-gray-400 font-normal"> (+20 pts)</span>}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}