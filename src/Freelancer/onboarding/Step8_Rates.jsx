import { useState, useRef, useEffect } from "react";

const stepLabels = [
  "Account", "Verify", "Type", "Profile", "Skills",
  "Portfolio", "History", "Rates", "KYC", "Payment", "Trust", "Go Live"
];

const currencies = ["USD", "EUR", "GBP", "INR", "CAD", "AUD", "SGD"];
const currencySymbols = { USD: "$", EUR: "€", GBP: "£", INR: "₹", CAD: "CA$", AUD: "A$", SGD: "S$" };

const durationOptions = ["No minimum", "1 week", "2 weeks", "1 month", "3 months+"];

const marketRates = {
  "Full Stack Developer": { low: 30, avg: 65, high: 120 },
  "Frontend Developer":   { low: 25, avg: 55, high: 100 },
  "Backend Developer":    { low: 30, avg: 60, high: 110 },
  "UI/UX Designer":       { low: 25, avg: 50, high: 95  },
  "Data Scientist":       { low: 35, avg: 75, high: 130 },
  "DevOps Engineer":      { low: 40, avg: 80, high: 140 },
};
const ROLE = "Full Stack Developer";
const market = marketRates[ROLE];

/* Custom dropdown */
function Dropdown({ options, value, onChange, symbol, showCheck = false }) {
  const [open, setOpen] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        className="flex items-center gap-1.5 border border-gray-200 bg-white rounded-xl px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition min-w-[80px] justify-between"
      >
        {symbol ? `${symbol} ${value}` : value}
        <svg className={`w-4 h-4 text-gray-400 transition-transform ${open ? "rotate-180" : ""}`}
          fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
        </svg>
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg z-30 min-w-[120px] py-1 overflow-hidden">
          {options.map(opt => (
            <button
              key={opt}
              type="button"
              onClick={() => { onChange(opt); setOpen(false); }}
              className={`w-full text-left px-4 py-2.5 text-sm flex items-center gap-2 hover:bg-blue-50 transition
                ${opt === value ? "text-blue-600 font-semibold bg-blue-50" : "text-gray-700"}`}
            >
              {showCheck && opt === value && (
                <svg className="w-4 h-4 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7"/>
                </svg>
              )}
              {showCheck && opt !== value && <span className="w-4"/>}
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* Toggle switch */
function Toggle({ value, onChange }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!value)}
      className={`relative w-12 h-6 rounded-full transition-colors duration-200 flex-shrink-0
        ${value ? "bg-blue-500" : "bg-gray-300"}`}
    >
      <span className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-200
        ${value ? "translate-x-6" : "translate-x-0"}`}/>
    </button>
  );
}

export default function Step8_Rates({ onNext, onBack, currentStep = 8, totalSteps = 12 }) {
  const [currency, setCurrency]         = useState("USD");
  const [hourlyRate, setHourlyRate]     = useState(65);
  const [minBudget, setMinBudget]       = useState("");
  const [duration, setDuration]         = useState("No minimum");
  const [showExact, setShowExact]       = useState(true);
  const [allowOffers, setAllowOffers]   = useState(true);

  const sym = currencySymbols[currency] || "$";

  const percentComplete = Math.round(((currentStep - 1) / totalSteps) * 100);
  const progressWidth   = `${((currentStep - 1) / (totalSteps - 1)) * 100}%`;

  /* Rate position relative to market */
  const getRateInsight = () => {
    if (hourlyRate < market.low)  return { status: "warn", msg: `Your rate (${sym}${hourlyRate}/hr) is below market low. Consider raising it.` };
    if (hourlyRate > market.high) return { status: "warn", msg: `Your rate (${sym}${hourlyRate}/hr) is above market. May reduce invitations.` };
    if (Math.abs(hourlyRate - market.avg) <= 10) return { status: "good", msg: "Your rate aligns with market averages." };
    if (hourlyRate > market.avg)  return { status: "good", msg: `Your rate is above average — signals strong expertise.` };
    return { status: "good", msg: `Your rate is competitive — good for new freelancers.` };
  };

  const getInsights = () => {
    const insights = [getRateInsight()];
    if (minBudget && parseInt(minBudget) >= 500) insights.push({ status: "good", msg: `Min budget ${sym}${minBudget} filters low-value projects.` });
    if (!showExact) insights.push({ status: "tip", msg: 'Hidden rate shows "Budget: Negotiable" to clients.' });
    if (allowOffers) insights.push({ status: "tip", msg: "Allowing offers increases your chances of getting hired." });
    return insights;
  };
  const insights = getInsights();

  /* Slider fill % */
  const sliderPct = ((hourlyRate - 5) / (300 - 5)) * 100;

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

              <h1 className="text-xl sm:text-2xl font-bold mb-1">Set Your Rates</h1>
              <p className="text-sm text-gray-500 mb-5">Clear pricing helps you get hired faster</p>

              <div className="mb-6">
                <span className="text-xs font-bold border border-blue-400 text-blue-600 px-3 py-1 rounded-full uppercase tracking-wide">
                  Pricing
                </span>
              </div>

              {/* Info banner */}
              <div className="flex items-start gap-3 bg-yellow-50 border border-yellow-200 rounded-xl px-4 py-3.5 mb-6">
                <span className="text-lg flex-shrink-0">💡</span>
                <p className="text-sm text-yellow-800">
                  You can always update rates later. These are starting rates — you can negotiate per project.
                </p>
              </div>

              {/* ── Hourly Rate section ── */}
              <div className="border border-gray-200 rounded-xl p-5 mb-5">

                {/* Header row */}
                <div className="flex items-center justify-between mb-5">
                  <span className="text-sm font-bold text-gray-800">Hourly Rate</span>
                  <Dropdown
                    options={currencies}
                    value={currency}
                    onChange={setCurrency}
                    showCheck
                  />
                </div>

                {/* Big rate display */}
                <div className="text-center mb-5">
                  <span className="text-5xl font-black text-gray-900 tracking-tight">
                    {sym}{hourlyRate}
                  </span>
                  <span className="text-xl text-gray-400 font-medium">/hr</span>
                </div>

                {/* Slider */}
                <div className="mb-2">
                  <input
                    type="range"
                    min={5}
                    max={300}
                    step={5}
                    value={hourlyRate}
                    onChange={e => setHourlyRate(Number(e.target.value))}
                    className="w-full h-2 rounded-full appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #3b82f6 0%, #3b82f6 ${sliderPct}%, #e5e7eb ${sliderPct}%, #e5e7eb 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-gray-400 mt-1.5">
                    <span>{sym}5/hr</span>
                    <span>{sym}300/hr</span>
                  </div>
                </div>

                {/* Market rates card */}
                <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mt-4">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-base">📊</span>
                    <span className="text-sm font-semibold text-gray-700">
                      Market Rates for {ROLE}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 text-center gap-2">
                    {[
                      { label: "Low",     val: market.low,  active: hourlyRate <= market.low },
                      { label: "Average", val: market.avg,  active: Math.abs(hourlyRate - market.avg) <= 10 },
                      { label: "High",    val: market.high, active: hourlyRate >= market.high },
                    ].map(m => (
                      <div key={m.label}
                        className={`rounded-lg py-2.5 px-1 transition
                          ${m.active ? "bg-blue-50 border border-blue-200" : ""}`}>
                        <p className={`text-base font-bold ${m.active ? "text-blue-700" : "text-gray-800"}`}>
                          {sym}{m.val}/hr
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
                      </div>
                    ))}
                  </div>

                  {/* Rate indicator bar */}
                  <div className="mt-3 relative h-2 bg-gradient-to-r from-gray-200 via-blue-300 to-gray-200 rounded-full">
                    <div
                      className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-blue-500 border-2 border-white shadow transition-all duration-300"
                      style={{
                        left: `${Math.min(98, Math.max(2, ((hourlyRate - market.low) / (market.high - market.low)) * 100))}%`,
                        transform: "translateX(-50%) translateY(-50%)"
                      }}
                    />
                  </div>
                  <div className="flex justify-between text-xs text-gray-400 mt-1">
                    <span>{sym}{market.low}</span>
                    <span>{sym}{market.avg} avg</span>
                    <span>{sym}{market.high}</span>
                  </div>
                </div>
              </div>

              {/* ── Min Budget + Duration ── */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Project Budget
                  </label>
                  <input
                    type="number"
                    value={minBudget}
                    onChange={e => setMinBudget(e.target.value)}
                    placeholder="e.g. 500"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-gray-50 focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                  />
                  <p className="text-xs text-gray-400 mt-1.5">Projects below this won't be shown to you</p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Minimum Project Duration
                  </label>
                  <div className="relative">
                    <select
                      value={duration}
                      onChange={e => setDuration(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-gray-50 appearance-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100 transition"
                    >
                      {durationOptions.map(d => <option key={d}>{d}</option>)}
                    </select>
                    <svg className="absolute right-3 top-3 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                    </svg>
                  </div>
                </div>
              </div>

              {/* ── Rate Visibility ── */}
              <div className="border-t border-gray-100 pt-5">
                <h3 className="text-sm font-bold text-gray-800 mb-4">Rate Visibility</h3>

                <div className="space-y-4">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Show exact rate to clients</p>
                      <p className="text-xs text-gray-400 mt-0.5">"Off" shows "Budget: Negotiable"</p>
                    </div>
                    <Toggle value={showExact} onChange={setShowExact}/>
                  </div>

                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-800">Allow clients to make offers</p>
                      <p className="text-xs text-gray-400 mt-0.5">Clients can propose a different rate</p>
                    </div>
                    <Toggle value={allowOffers} onChange={setAllowOffers}/>
                  </div>
                </div>
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
                Continue to Verification
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

              {/* Rate summary */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-semibold text-gray-600 mb-2">Your pricing summary:</p>
                <div className="space-y-1.5 text-xs text-gray-600">
                  <div className="flex justify-between">
                    <span>Hourly rate</span>
                    <span className="font-bold text-gray-800">{sym}{hourlyRate}/hr</span>
                  </div>
                  {minBudget && (
                    <div className="flex justify-between">
                      <span>Min budget</span>
                      <span className="font-bold text-gray-800">{sym}{minBudget}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span>Min duration</span>
                    <span className="font-bold text-gray-800">{duration}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rate visibility</span>
                    <span className={`font-bold ${showExact ? "text-green-600" : "text-gray-500"}`}>
                      {showExact ? "Visible" : "Negotiable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}