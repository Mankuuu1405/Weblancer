import { useState } from "react";

const PAYMENT_METHODS = [
  {
    id: "card",
    label: "Credit/Debit Card",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="1" y="4" width="22" height="16" rx="2" strokeWidth="1.8"/>
        <path d="M1 10h22" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
  {
    id: "bank",
    label: "Bank Transfer",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path d="M3 21h18M3 10h18M5 6l7-3 7 3M4 10v11M8 10v11M12 10v11M16 10v11M20 10v11"
              strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    id: "paypal",
    label: "PayPal",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.8"/>
        <path d="M2 10h20" strokeWidth="1.8" strokeLinecap="round"/>
        <circle cx="7" cy="15" r="1" fill="currentColor"/>
        <circle cx="10" cy="15" r="1" fill="currentColor"/>
      </svg>
    ),
  },
  {
    id: "other",
    label: "Other",
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="2" y="5" width="20" height="14" rx="2" strokeWidth="1.8"/>
        <path d="M6 12h4m4 0h4" strokeWidth="1.8" strokeLinecap="round"/>
      </svg>
    ),
  },
];

const SECURITY_ITEMS = [
  { icon: "🔒", text: "256-bit Encryption" },
  { icon: "💳", text: "PCI-DSS Level 1" },
  { icon: "🏛️", text: "Tokenization" },
  { icon: "💧", text: "AI Fraud Detection" },
];

const inputStyle = {
  border: "1px solid #e2e8f0",
  backgroundColor: "white",
  color: "#1e293b",
};

const focusStyle = (e) => (e.target.style.borderColor = "#3b5bdb");
const blurStyle  = (e) => (e.target.style.borderColor = "#e2e8f0");

export default function Step10_PaySetup({ formData, updateData, next, prev }) {
  const [billingName,  setBillingName]  = useState("");
  const [billingEmail, setBillingEmail] = useState("");
  const [street,       setStreet]       = useState("");
  const [city,         setCity]         = useState("");
  const [state,        setState]        = useState("");
  const [zip,          setZip]          = useState("");
  const [payMethod,    setPayMethod]    = useState("card");
  const [cardNumber,   setCardNumber]   = useState("");
  const [expiry,       setExpiry]       = useState("");
  const [cvv,          setCvv]          = useState("");

  /* Format card number as groups of 4 */
  const handleCard = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 16);
    setCardNumber(raw.replace(/(.{4})/g, "$1 ").trim());
  };

  /* Format MM/YY */
  const handleExpiry = (e) => {
    const raw = e.target.value.replace(/\D/g, "").slice(0, 4);
    setExpiry(raw.length > 2 ? raw.slice(0, 2) + "/" + raw.slice(2) : raw);
  };

  const canContinue = billingName && billingEmail && street && city && zip &&
    (payMethod !== "card" || (cardNumber.replace(/\s/g, "").length === 16 && expiry.length === 5 && cvv.length >= 3));

  const handleNext = () => {
    updateData({ billing: { billingName, billingEmail, street, city, state, zip }, payMethod });
    next();
  };

  return (
    <div className="flex gap-6 items-start">

      {/* ══ LEFT ════════════════════════════════════════════ */}
      <div className="flex-1 min-w-0">
        <div className="rounded-2xl p-8 sm:p-10"
             style={{ backgroundColor: "white", border: "1px solid #e2e8f0" }}>

          <h1 className="text-2xl font-extrabold mb-1" style={{ color: "#1e293b" }}>
            Set Up Your Payment Profile
          </h1>
          <p className="text-sm mb-6" style={{ color: "#64748b" }}>
            No money will be charged yet — this confirms you're ready to pay when hiring
          </p>

          {/* Badge */}
          <span className="inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded mb-6"
                style={{ backgroundColor: "#dcfce7", color: "#16a34a", border: "1px solid #bbf7d0" }}>
            Payment Setup
          </span>

          {/* Info notice */}
          <div className="flex items-center gap-3 px-5 py-3.5 rounded-xl mb-7"
               style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe" }}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
              <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                    strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="text-sm" style={{ color: "#1d4ed8" }}>
              Your card will NOT be charged until you approve a milestone. This is just verification.
            </span>
          </div>

          {/* ── Billing Information ── */}
          <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>Billing Information</h2>

          <div className="flex flex-col gap-4 mb-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                  Billing Name *
                </label>
                <input
                  type="text" placeholder="Full legal name" value={billingName}
                  onChange={e => setBillingName(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                  Billing Email *
                </label>
                <input
                  type="email" placeholder="billing@company.com" value={billingEmail}
                  onChange={e => setBillingEmail(e.target.value)}
                  className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>
            </div>

            {/* Street */}
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                Street Address *
              </label>
              <input
                type="text" placeholder="123 Main St" value={street}
                onChange={e => setStreet(e.target.value)}
                className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
              />
            </div>

            {/* City / State / Zip */}
            <div className="grid grid-cols-3 gap-4">
              {[
                { label: "City *",  val: city,  set: setCity,  ph: "" },
                { label: "State",   val: state, set: setState, ph: "" },
                { label: "Zip *",   val: zip,   set: setZip,   ph: "" },
              ].map(f => (
                <div key={f.label} className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: "#374151" }}>{f.label}</label>
                  <input
                    type="text" value={f.val} onChange={e => f.set(e.target.value)}
                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* ── Payment Method ── */}
          <h2 className="text-base font-bold mb-4" style={{ color: "#1e293b" }}>Payment Method</h2>
          <div className="grid grid-cols-4 gap-3 mb-6">
            {PAYMENT_METHODS.map(m => {
              const sel = payMethod === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setPayMethod(m.id)}
                  className="flex flex-col items-center gap-2 py-4 rounded-xl transition-all text-sm font-semibold"
                  style={{
                    border:          sel ? "2px solid #3b5bdb" : "1px solid #e2e8f0",
                    backgroundColor: sel ? "#f0f4ff"          : "white",
                    color:           sel ? "#3b5bdb"          : "#64748b",
                  }}
                >
                  {m.icon}
                  <span className="text-xs text-center leading-tight">{m.label}</span>
                </button>
              );
            })}
          </div>

          {/* ── Card fields (only when card selected) ── */}
          {payMethod === "card" && (
            <div className="rounded-xl p-6 flex flex-col gap-5 mb-6"
                 style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>

              {/* Card Number */}
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                  Card Number *
                </label>
                <input
                  type="text" placeholder="•••• •••• •••• ••••"
                  value={cardNumber} onChange={handleCard}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none tracking-widest transition-all"
                  style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                />
              </div>

              {/* Expiry + CVV */}
              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: "#374151" }}>
                    Expiration *
                  </label>
                  <input
                    type="text" placeholder="MM/YY" value={expiry}
                    onChange={handleExpiry}
                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-sm font-semibold" style={{ color: "#374151" }}>CVV *</label>
                  <input
                    type="password" placeholder="•••" maxLength={4}
                    value={cvv} onChange={e => setCvv(e.target.value.replace(/\D/g, ""))}
                    className="px-4 py-3 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle} onFocus={focusStyle} onBlur={blurStyle}
                  />
                  <span className="text-xs" style={{ color: "#94a3b8" }}>Not stored</span>
                </div>
              </div>

              {/* Verify card button */}
              <button
                className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-bold transition-all"
                style={{ backgroundColor: "#93c5fd", color: "white", cursor: "default" }}
              >
                <svg className="w-4 h-4" fill="none" stroke="white" viewBox="0 0 24 24">
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                        strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Verify Card ($1 micro-authorization, refunded immediately)
              </button>
            </div>
          )}

          {/* ── How we protect your information ── */}
          <div className="rounded-xl px-6 py-5"
               style={{ border: "1px solid #e2e8f0", backgroundColor: "#fafafa" }}>
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-4 h-4" fill="none" stroke="#3b5bdb" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-sm font-bold" style={{ color: "#1e293b" }}>
                How we protect your information
              </span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              {SECURITY_ITEMS.map(s => (
                <div key={s.text} className="flex items-center gap-2 text-sm" style={{ color: "#475569" }}>
                  <span>{s.icon}</span>
                  {s.text}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Nav buttons */}
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
            Save Payment Profile
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
          <div className="flex flex-col gap-3">
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", color: "#15803d" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="#22c55e" viewBox="0 0 24 24">
                <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Your payment is protected by escrow until you approve work.
            </div>
            <div className="flex items-start gap-3 px-4 py-3 rounded-xl text-sm"
                 style={{ backgroundColor: "#eff6ff", border: "1px solid #bfdbfe", color: "#1d4ed8" }}>
              <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                      strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              The $1 verification is refunded within 24 hours.
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
