import React, { useState } from "react";
import { BsCloudArrowUp } from "react-icons/bs";
import { BsXCircle } from "react-icons/bs";
import "./Step5Portfolio.css";

const Step5Portfolio = ({ formData, updateData, next, prev }) => {
  const [links,     setLinks]     = useState(formData.portfolioLinks || [""]);
  const [caseStudy, setCaseStudy] = useState(formData.caseStudy      || "");

  const addLink    = () => setLinks((l) => [...l, ""]);
  const removeLink = (i) => setLinks((l) => l.filter((_, idx) => idx !== i));
  const updateLink = (i, val) => setLinks((l) => l.map((x, idx) => idx === i ? val : x));

  const handleNext = () => {
    updateData({ portfolioLinks: links, caseStudy });
    next();
  };

  return (
    <>
      <div className="s5-card">
        <h2 className="s5-title">Portfolio & Past Work</h2>
        <p className="s5-subtitle">Showcase your best work to build client trust</p>
        <div className="s5-badge">STEP 5 OF 9 – PORTFOLIO</div>

        <div className="s5-form-group">
          <label className="s5-label">Upload Portfolio Files</label>
          <div className="s5-upload-box">
            <div className="s5-upload-icon"><BsCloudArrowUp /></div>
            <div className="s5-upload-text">Drag & drop files here, or click to browse</div>
            <div className="s5-upload-sub">PDF, PNG, JPG, ZIP — max 20MB per file</div>
          </div>
        </div>

        <div className="s5-form-group">
          <label className="s5-label">Portfolio / Project Links</label>
          {links.map((link, i) => (
            <div key={i} className="s5-link-row">
              <input
                className="s5-input"
                placeholder={`https://project-${i + 1}.com`}
                value={link}
                onChange={(e) => updateLink(i, e.target.value)}
              />
              {links.length > 1 && (
                <BsXCircle className="s5-remove-icon" onClick={() => removeLink(i)} />
              )}
            </div>
          ))}
          <button className="s5-add-btn" onClick={addLink}>+ Add another link</button>
        </div>

        <div className="s5-form-group">
          <label className="s5-label">
            Featured Case Study <span className="s5-label-hint">(optional)</span>
          </label>
          <textarea
            className="s5-textarea"
            placeholder="Describe a successful project — the challenge, your approach, and the results..."
            rows={4}
            value={caseStudy}
            onChange={(e) => setCaseStudy(e.target.value)}
            maxLength={600}
          />
          <div className="s5-char">{caseStudy.length}/600 characters</div>
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Verification →</button>
      </div>
    </>
  );
};

export default Step5Portfolio;