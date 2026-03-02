import React, { useState, useEffect } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import { MdCheckCircleOutline } from "react-icons/md";
import { MdAutoAwesome } from "react-icons/md";
import "./Step1Account.css";

const COUNTRIES = [
  "India", "United States", "United Kingdom", "Canada", "Australia",
  "Germany", "France", "Singapore", "UAE", "Pakistan", "Bangladesh",
  "Nigeria", "South Africa", "Brazil", "Philippines",
];

const FREE_EMAIL_DOMAINS = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "aol.com", "icloud.com"];

function getPasswordStrength(pwd) {
  if (!pwd) return { score: 0, label: "", color: "" };
  let score = 0;
  if (pwd.length >= 8) score++;
  if (pwd.length >= 12) score++;
  if (/[A-Z]/.test(pwd)) score++;
  if (/[0-9]/.test(pwd)) score++;
  if (/[^A-Za-z0-9]/.test(pwd)) score++;

  if (score <= 1) return { score: 1, label: "Weak", color: "#ef4444" };
  if (score <= 2) return { score: 2, label: "Fair", color: "#f59e0b" };
  if (score <= 3) return { score: 3, label: "Good", color: "#3b82f6" };
  return { score: 4, label: "Strong", color: "#22c55e" };
}

function isFreeEmail(email) {
  const domain = email.split("@")[1];
  return domain && FREE_EMAIL_DOMAINS.includes(domain.toLowerCase());
}

const Step1Account = ({ formData = {}, updateData = () => {}, next = () => {} }) => {
  const [agencyName,      setAgencyName]  = useState(formData.agencyName      || "");
  const [email,           setEmail]       = useState(formData.email           || "");
  const [country,         setCountry]     = useState(formData.country         || "");
  const [password,        setPassword]    = useState(formData.password        || "");
  const [confirmPassword, setConfirm]     = useState(formData.confirmPassword || "");

  const strength = getPasswordStrength(password);
  const passwordsMatch = password && confirmPassword && password === confirmPassword;
  const freeEmail = email.includes("@") && isFreeEmail(email);
  const agencyNameLooksGood = agencyName.trim().length >= 5;

  const handleNext = () => {
    updateData({ agencyName, email, country, password, confirmPassword });
    next();
  };

  return (
    <div className="s1-layout">
      {/* Main Card */}
      <div className="s1-main">
        <div className="s1-card">
          <h2 className="s1-title">Create Your Agency Account</h2>
          <p className="s1-subtitle">Start by setting up your agency's identity on the platform</p>

          <div className="s1-badge">ACCOUNT CREATED – NOT CONFIGURED</div>

          <div className="s1-warning">
            <MdOutlineWarningAmber className="s1-warn-icon" />
            <span className="s1-warn-text">
              After this step, you cannot browse projects, receive invites, or appear in search until
              configuration is complete.
            </span>
          </div>

          {/* Agency Name */}
          <div className="s1-form-group">
            <label className="s1-label">Agency Name (Display Name) *</label>
            <input
              className="s1-input"
              placeholder="e.g., TechVision Digital Agency"
              value={agencyName}
              maxLength={50}
              onChange={(e) => setAgencyName(e.target.value)}
            />
            <div className="s1-char">{agencyName.length}/50 characters</div>
          </div>

          {/* Email */}
          <div className="s1-form-group">
            <label className="s1-label">Business Email Address *</label>
            <div className={`s1-input-wrap ${freeEmail ? "s1-input-warn" : ""}`}>
              <MdOutlineEmail className="s1-input-icon" />
              <input
                className="s1-input"
                type="email"
                placeholder="you@youragency.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {freeEmail && (
              <div className="s1-field-warn">
                <MdOutlineWarningAmber size={13} /> Business email preferred
              </div>
            )}
          </div>

          {/* Country */}
          <div className="s1-form-group">
            <label className="s1-label">Country of Registration *</label>
            <select
              className="s1-select"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            >
              <option value="">Select country</option>
              {COUNTRIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Password */}
          <div className="s1-row">
            <div className="s1-form-group">
              <label className="s1-label">Password *</label>
              <input
                className="s1-input"
                type="password"
                placeholder="Min. 8 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {password && (
                <div className="s1-strength-wrap">
                  <div className="s1-strength-bars">
                    {[1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className="s1-strength-bar"
                        style={{
                          background: i <= strength.score ? strength.color : "#e5e7eb",
                        }}
                      />
                    ))}
                  </div>
                  <span className="s1-strength-label" style={{ color: strength.color }}>
                    {strength.label}
                  </span>
                </div>
              )}
            </div>
            <div className="s1-form-group">
              <label className="s1-label">Confirm Password *</label>
              <input
                className="s1-input"
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {passwordsMatch && (
                <div className="s1-match-text">
                  <MdCheckCircleOutline size={13} /> Passwords match ✓
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="ra-bottom-bar">
          <button className="ra-btn-next" onClick={handleNext}>
            Continue to Admin Setup →
          </button>
        </div>
      </div>

      {/* AI Insights Sidebar */}
      <div className="s1-sidebar">
        <div className="s1-insights-card">
          <div className="s1-insights-header">
            <MdAutoAwesome className="s1-insights-icon" />
            <span className="s1-insights-title">AI Insights</span>
          </div>

          <div className="s1-insights-list">
            <div className={`s1-insight-item ${freeEmail ? "s1-insight-warn" : "s1-insight-neutral"}`}>
              <MdOutlineWarningAmber className="s1-insight-icon-warn" />
              <span>Business email preferred. Free email providers may reduce trust.</span>
            </div>

            {agencyNameLooksGood && (
              <div className="s1-insight-item s1-insight-good">
                <MdCheckCircleOutline className="s1-insight-icon-good" />
                <span>Agency name looks good.</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Step1Account;