import React, { useState } from "react";
import { BsPersonBadge } from "react-icons/bs";
import { BsBuilding } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { BsPhone } from "react-icons/bs";
import "./Step6Verify.css";

const verifyItems = [
  { icon: <BsPersonBadge />, iconBg: "#eff4ff", iconColor: "#4f7cff", title: "Government ID / Admin Identity",   sub: "Passport, National ID, or Driver's License"   },
  { icon: <BsBuilding />,    iconBg: "#f0fdf4", iconColor: "#10b981", title: "Business Registration Document",    sub: "Certificate of Incorporation or equivalent"    },
  { icon: <BsGlobe />,       iconBg: "#fefce8", iconColor: "#f59e0b", title: "Website Domain Verification",      sub: "Verify ownership via DNS TXT record"           },
  { icon: <BsPhone />,       iconBg: "#fdf4ff", iconColor: "#8b5cf6", title: "Phone Number Verification",        sub: "SMS OTP sent to your registered number"        },
];

const Step6Verify = ({ formData, updateData, next, prev }) => {
  const [statuses, setStatuses] = useState(
    formData.verifyStatuses || { 0: "pending", 1: "pending", 2: "pending", 3: "pending" }
  );

  const handleVerify = (i) =>
    setStatuses((prev) => ({ ...prev, [i]: "verified" }));

  const handleNext = () => {
    updateData({ verifyStatuses: statuses });
    next();
  };

  return (
    <>
      <div className="s6-card">
        <h2 className="s6-title">Identity & Business Verification</h2>
        <p className="s6-subtitle">Complete verification to unlock full agency features and client trust</p>
        <div className="s6-badge">STEP 6 OF 9 – VERIFICATION</div>

        <div className="s6-verify-list">
          {verifyItems.map((item, i) => (
            <div key={i} className="s6-verify-item">
              <div className="s6-verify-left">
                <div
                  className="s6-verify-icon-box"
                  style={{ background: item.iconBg, color: item.iconColor }}
                >
                  {item.icon}
                </div>
                <div>
                  <div className="s6-verify-title">{item.title}</div>
                  <div className="s6-verify-sub">{item.sub}</div>
                </div>
              </div>
              {statuses[i] === "verified" ? (
                <span className="s6-badge-verified">✓ Verified</span>
              ) : (
                <span className="s6-badge-action" onClick={() => handleVerify(i)}>
                  {i === 2 ? "Start Verification →" : "Upload Document →"}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Payment →</button>
      </div>
    </>
  );
};

export default Step6Verify;