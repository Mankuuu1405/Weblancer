import React, { useState } from "react";
import { MdOutlineEmail } from "react-icons/md";
import { FiPhone } from "react-icons/fi";
import "./Step2Admin.css";

const Step2Admin = ({ formData, updateData, next, prev }) => {
  const [adminName,  setAdminName]  = useState(formData.adminName  || "");
  const [adminEmail, setAdminEmail] = useState(formData.adminEmail || "");
  const [adminPhone, setAdminPhone] = useState(formData.adminPhone || "");
  const [adminRole,  setAdminRole]  = useState(formData.adminRole  || "");

  const handleNext = () => {
    updateData({ adminName, adminEmail, adminPhone, adminRole });
    next();
  };

  return (
    <>
      <div className="s2-card">
        <h2 className="s2-title">Admin Setup</h2>
        <p className="s2-subtitle">Set up the primary administrator for your agency account</p>
        <div className="s2-badge">STEP 2 OF 9 – ADMIN DETAILS</div>

        <div className="s2-form-group">
          <label className="s2-label">Admin Full Name *</label>
          <input
            className="s2-input"
            placeholder="e.g., John Smith"
            value={adminName}
            onChange={(e) => setAdminName(e.target.value)}
          />
        </div>

        <div className="s2-form-group">
          <label className="s2-label">Admin Email Address *</label>
          <div className="s2-input-wrap">
            <MdOutlineEmail className="s2-input-icon" />
            <input
              className="s2-input"
              type="email"
              placeholder="admin@youragency.com"
              value={adminEmail}
              onChange={(e) => setAdminEmail(e.target.value)}
            />
          </div>
        </div>

        <div className="s2-row">
          <div className="s2-form-group">
            <label className="s2-label">Phone Number *</label>
            <div className="s2-input-wrap">
              <FiPhone className="s2-input-icon" />
              <input
                className="s2-input"
                type="tel"
                placeholder="+1 (555) 000-0000"
                value={adminPhone}
                onChange={(e) => setAdminPhone(e.target.value)}
              />
            </div>
          </div>
          <div className="s2-form-group">
            <label className="s2-label">Admin Role / Title *</label>
            <select className="s2-select" value={adminRole} onChange={(e) => setAdminRole(e.target.value)}>
              <option value="">Select role</option>
              <option>CEO / Founder</option>
              <option>CTO</option>
              <option>Operations Manager</option>
              <option>Project Manager</option>
              <option>Other</option>
            </select>
          </div>
        </div>

        <div className="s2-info-box">
          <span style={{ fontSize: "15px", flexShrink: 0 }}>ℹ️</span>
          <span>The admin will have full access to manage team members, projects, and billing. Make sure this is a trusted person.</span>
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Business Info →</button>
      </div>
    </>
  );
};

export default Step2Admin;