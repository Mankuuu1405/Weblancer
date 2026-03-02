import React, { useState } from "react";
import "./Step7Payment.css";

const PAY_OPTIONS = [
  { id: "bank",   title: "Bank Transfer",       sub: "Direct deposit to your bank account" },
  { id: "paypal", title: "PayPal",               sub: "Instant transfers via PayPal"        },
  { id: "stripe", title: "Stripe",               sub: "Stripe Connect for fast payouts"     },
  { id: "wise",   title: "Wise (Transferwise)",  sub: "Low-fee international transfers"     },
];

const Step7Payment = ({ formData, updateData, next, prev }) => {
  const [payMethod,   setPayMethod]   = useState(formData.payMethod   || "");
  const [accountName, setAccountName] = useState(formData.accountName || "");
  const [accountNum,  setAccountNum]  = useState(formData.accountNum  || "");
  const [ifsc,        setIfsc]        = useState(formData.ifsc        || "");
  const [paypal,      setPaypal]      = useState(formData.paypal      || "");

  const handleNext = () => {
    updateData({ payMethod, accountName, accountNum, ifsc, paypal });
    next();
  };

  return (
    <>
      <div className="s7-card">
        <h2 className="s7-title">Payment Setup</h2>
        <p className="s7-subtitle">Set up how you'll receive payments from completed projects</p>
        <div className="s7-badge">STEP 7 OF 9 – PAYMENT</div>

        <div className="s7-form-group">
          <label className="s7-label">Preferred Payout Method *</label>
          <div className="s7-pay-grid">
            {PAY_OPTIONS.map((opt) => (
              <div
                key={opt.id}
                className={`s7-pay-option ${payMethod === opt.id ? "selected" : ""}`}
                onClick={() => setPayMethod(opt.id)}
              >
                <div className="s7-pay-option-title">{opt.title}</div>
                <div className="s7-pay-option-sub">{opt.sub}</div>
              </div>
            ))}
          </div>
        </div>

        {payMethod === "bank" && (
          <>
            <div className="s7-section-title">Bank Account Details</div>
            <div className="s7-form-group">
              <label className="s7-label">Account Holder Name *</label>
              <input className="s7-input" placeholder="As on bank records" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
            </div>
            <div className="s7-row">
              <div className="s7-form-group">
                <label className="s7-label">Account Number *</label>
                <input className="s7-input" placeholder="Enter account number" value={accountNum} onChange={(e) => setAccountNum(e.target.value)} />
              </div>
              <div className="s7-form-group">
                <label className="s7-label">IFSC / SWIFT / Routing Code *</label>
                <input className="s7-input" placeholder="e.g., HDFC0001234" value={ifsc} onChange={(e) => setIfsc(e.target.value)} />
              </div>
            </div>
          </>
        )}

        {payMethod === "paypal" && (
          <>
            <div className="s7-section-title">PayPal Details</div>
            <div className="s7-form-group">
              <label className="s7-label">PayPal Email *</label>
              <input className="s7-input" type="email" placeholder="paypal@youragency.com" value={paypal} onChange={(e) => setPaypal(e.target.value)} />
            </div>
          </>
        )}

        <div className="s7-secure-box">
          <span style={{ fontSize: "15px", flexShrink: 0 }}>🔒</span>
          <span>Your payment details are encrypted and stored securely. ArcLancer never shares them with third parties.</span>
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Permissions →</button>
      </div>
    </>
  );
};

export default Step7Payment;