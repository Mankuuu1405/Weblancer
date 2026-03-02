import React, { useState } from "react";
import "./Step3Business.css";

const Step3Business = ({ formData, updateData, next, prev }) => {
  const [bizType,   setBizType]   = useState(formData.bizType   || "");
  const [regNumber, setRegNumber] = useState(formData.regNumber || "");
  const [website,   setWebsite]   = useState(formData.website   || "");
  const [founded,   setFounded]   = useState(formData.founded   || "");
  const [teamSize,  setTeamSize]  = useState(formData.teamSize  || "");
  const [bio,       setBio]       = useState(formData.bio       || "");

  const handleNext = () => {
    updateData({ bizType, regNumber, website, founded, teamSize, bio });
    next();
  };

  return (
    <>
      <div className="s3-card">
        <h2 className="s3-title">Business Information</h2>
        <p className="s3-subtitle">Tell clients about your agency's background and structure</p>
        <div className="s3-badge">STEP 3 OF 9 – BUSINESS DETAILS</div>

        <div className="s3-row">
          <div className="s3-form-group">
            <label className="s3-label">Business Type *</label>
            <select className="s3-select" value={bizType} onChange={(e) => setBizType(e.target.value)}>
              <option value="">Select type</option>
              <option>Sole Proprietorship</option>
              <option>Partnership</option>
              <option>Private Limited (Pvt. Ltd.)</option>
              <option>LLC</option>
              <option>Corporation</option>
            </select>
          </div>
          <div className="s3-form-group">
            <label className="s3-label">Registration Number</label>
            <input className="s3-input" placeholder="e.g., CIN / EIN / Company No." value={regNumber} onChange={(e) => setRegNumber(e.target.value)} />
          </div>
        </div>

        <div className="s3-row">
          <div className="s3-form-group">
            <label className="s3-label">Website URL</label>
            <input className="s3-input" placeholder="https://yourwebsite.com" value={website} onChange={(e) => setWebsite(e.target.value)} />
          </div>
          <div className="s3-form-group">
            <label className="s3-label">Year Founded *</label>
            <input className="s3-input" placeholder="e.g., 2018" value={founded} onChange={(e) => setFounded(e.target.value)} />
          </div>
        </div>

        <div className="s3-form-group">
          <label className="s3-label">Team Size *</label>
          <select className="s3-select" value={teamSize} onChange={(e) => setTeamSize(e.target.value)}>
            <option value="">Select team size</option>
            <option>1–5 members</option>
            <option>6–15 members</option>
            <option>16–50 members</option>
            <option>51–100 members</option>
            <option>100+ members</option>
          </select>
        </div>

        <div className="s3-form-group">
          <label className="s3-label">Agency Bio / Description *</label>
          <textarea
            className="s3-textarea"
            placeholder="Describe your agency — what you do, your strengths, and what makes you unique..."
            rows={4}
            value={bio}
            maxLength={500}
            onChange={(e) => setBio(e.target.value)}
          />
          <div className="s3-char">{bio.length}/500 characters</div>
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Services →</button>
      </div>
    </>
  );
};

export default Step3Business;