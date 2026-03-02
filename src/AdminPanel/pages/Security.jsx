import React from "react";
import { MdOutlineLock } from "react-icons/md";
import { MdOutlineShield } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";
import "./Security.css";

const sslCoverage = ["arclancer.com", "api.arclancer.com", "admin.arclancer.com"];

const rateLimits = [
  { route: "/api/auth/login",    limit: "5 attempts / 15 min",  type: "IP-BASED"   },
  { route: "/api/auth/register", limit: "3 attempts / 1 hour",  type: "IP-BASED"   },
  { route: "/api/chat/send",     limit: "60 messages / min",    type: "USER-BASED" },
  { route: "/api/files/upload",  limit: "20 uploads / hour",    type: "USER-BASED" },
  { route: "/api/search",        limit: "100 requests / min",   type: "USER-BASED" },
];

const suspiciousActivity = [
  {
    risk: "HIGH RISK",
    time: "14:32",
    title: "Multiple login failures — IP: 198.51.100.0",
    action: "→ Auto-blocked for 1 hour",
    riskClass: "risk-high",
    cardClass: "sus-card-high",
  },
  {
    risk: "MEDIUM RISK",
    time: "14:15",
    title: "Unusual file upload pattern — User: john@email.com",
    action: "→ Flagged for review",
    riskClass: "risk-medium",
    cardClass: "sus-card-medium",
  },
  {
    risk: "LOW RISK",
    time: "13:45",
    title: "New device login — User: sara@biz.com",
    action: "→ User notified",
    riskClass: "risk-low",
    cardClass: "sus-card-low",
  },
];

const Security = () => (
  <div className="sec-page">

    {/* SSL Certificate */}
    <div className="sec-card">
      <div className="sec-card-title">
        <MdOutlineLock className="sec-title-icon green" />
        SSL Certificate
      </div>

      <div className="ssl-grid">
        <div className="ssl-info">
          <div className="ssl-row">
            <span className="ssl-key">Domain</span>
            <span className="ssl-val">arclancer.com</span>
          </div>
          <div className="ssl-row">
            <span className="ssl-key">Certificate</span>
            <span className="ssl-val">Let's Encrypt</span>
          </div>
          <div className="ssl-row">
            <span className="ssl-key">Valid Until</span>
            <span className="ssl-val">Dec 15, 2026</span>
          </div>
          <div className="ssl-row">
            <span className="ssl-key">Auto-renewal</span>
            <span className="ssl-val green-text">Enabled ✓</span>
          </div>
        </div>

        <div className="ssl-coverage">
          <div className="ssl-coverage-label">Coverage:</div>
          {sslCoverage.map((c, i) => (
            <div key={i} className="ssl-coverage-row">
              <BsCheckCircleFill className="ssl-check-icon" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Rate Limiting */}
    <div className="sec-card">
      <div className="sec-card-title">
        <MdOutlineShield className="sec-title-icon blue" />
        Rate Limiting
      </div>

      <div className="rate-list">
        {rateLimits.map((r, i) => (
          <div key={i} className="rate-row">
            <span className="rate-route">{r.route}</span>
            <div className="rate-right">
              <span className="rate-limit">{r.limit}</span>
              <span className={`rate-type ${r.type === "IP-BASED" ? "type-ip" : "type-user"}`}>
                {r.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Suspicious Activity */}
    <div className="sec-card">
      <div className="sec-card-title">
        <MdOutlineWarningAmber className="sec-title-icon orange" />
        Suspicious Activity
      </div>

      <div className="sus-list">
        {suspiciousActivity.map((s, i) => (
          <div key={i} className={`sus-card ${s.cardClass}`}>
            <div className="sus-top">
              <div className="sus-left">
                <span className={`sus-risk ${s.riskClass}`}>{s.risk}</span>
                <span className="sus-time">{s.time}</span>
              </div>
              <button className="sus-view-btn">View</button>
            </div>
            <div className="sus-title">{s.title}</div>
            <div className="sus-action">{s.action}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
);

export default Security;