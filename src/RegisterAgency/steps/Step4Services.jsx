import React, { useState } from "react";
import "./Step4Services.css";

const ALL_SERVICES = [
  "Web Development", "Mobile App Development", "UI/UX Design", "Branding & Identity",
  "SEO & Marketing", "Content Writing", "Video Production", "Data Science & AI",
  "Cloud & DevOps", "Cybersecurity", "E-commerce", "Game Development",
  "3D & Animation", "Blockchain", "QA & Testing", "IT Consulting",
];

const BUDGETS     = ["$500 – $2,000", "$2,000 – $10,000", "$10,000 – $50,000", "$50,000+"];
const TURNAROUNDS = ["Less than 1 week", "1–2 weeks", "2–4 weeks", "1–3 months", "3+ months"];

const Step4Services = ({ formData, updateData, next, prev }) => {
  const [selected,   setSelected]   = useState(formData.services   || []);
  const [minBudget,  setMinBudget]  = useState(formData.minBudget  || "");
  const [turnaround, setTurnaround] = useState(formData.turnaround || "");

  const toggle = (s) =>
    setSelected((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s]);

  const handleNext = () => {
    updateData({ services: selected, minBudget, turnaround });
    next();
  };

  return (
    <>
      <div className="s4-card">
        <h2 className="s4-title">Services & Expertise</h2>
        <p className="s4-subtitle">Select the services your agency offers to attract the right clients</p>
        <div className="s4-badge">STEP 4 OF 9 – SERVICES</div>

        <div className="s4-form-group">
          <label className="s4-label">
            Select Your Services * <span className="s4-label-hint">(choose all that apply)</span>
          </label>
          <div className="s4-tag-grid">
            {ALL_SERVICES.map((s) => (
              <div
                key={s}
                className={`s4-tag-chip ${selected.includes(s) ? "selected" : ""}`}
                onClick={() => toggle(s)}
              >
                {s}
              </div>
            ))}
          </div>
          {selected.length > 0 && (
            <div className="s4-count">{selected.length} selected</div>
          )}
        </div>

        <div className="s4-row">
          <div className="s4-form-group">
            <label className="s4-label">Minimum Project Budget *</label>
            <select className="s4-select" value={minBudget} onChange={(e) => setMinBudget(e.target.value)}>
              <option value="">Select budget range</option>
              {BUDGETS.map((b) => <option key={b}>{b}</option>)}
            </select>
          </div>
          <div className="s4-form-group">
            <label className="s4-label">Typical Turnaround Time *</label>
            <select className="s4-select" value={turnaround} onChange={(e) => setTurnaround(e.target.value)}>
              <option value="">Select turnaround</option>
              {TURNAROUNDS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
        </div>
      </div>

      <div className="ra-bottom-bar">
        <button className="ra-btn-back" onClick={prev}>← Back</button>
        <button className="ra-btn-next" onClick={handleNext}>Continue to Portfolio →</button>
      </div>
    </>
  );
};

export default Step4Services;