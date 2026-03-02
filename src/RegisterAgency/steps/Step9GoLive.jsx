import React from "react";
import "./Step9GoLive.css";

const CHECKS = [
  { label: "Agency account created",           ok: true  },
  { label: "Admin profile configured",         ok: true  },
  { label: "Business information filled",      ok: true  },
  { label: "Services selected",                ok: true  },
  { label: "Portfolio uploaded",               ok: true  },
  { label: "Identity verification submitted",  ok: false },
  { label: "Payment method connected",         ok: true  },
  { label: "Permissions configured",           ok: true  },
];

const Step9GoLive = ({ prev, onExit }) => (
  <>
    <div className="s9-card">
      <h2 className="s9-title">🚀 Ready to Go Live?</h2>
      <p className="s9-subtitle">Review your setup checklist before publishing your agency profile</p>
      <div className="s9-badge">STEP 9 OF 9 – FINAL REVIEW</div>

      <div className="s9-checklist">
        {CHECKS.map((c, i) => (
          <div key={i} className={`s9-check-item ${c.ok ? "ok" : "warn"}`}>
            <span className="s9-check-icon">{c.ok ? "✅" : "⚠️"}</span>
            <span>{c.label}</span>
          </div>
        ))}
      </div>

      <div className="s9-warning-box">
        <span style={{ fontSize: "15px", flexShrink: 0 }}>⚠️</span>
        <span>
          Identity verification is pending. Your agency will be visible but marked as{" "}
          <strong>Unverified</strong> until review is complete (usually within 24–48 hours).
        </span>
      </div>

      <button className="s9-launch-btn">
        🎉 Launch My Agency Profile
      </button>
    </div>

    <div className="ra-bottom-bar">
      <button className="ra-btn-back" onClick={prev}>← Back</button>
      <button className="ra-btn-back" onClick={onExit}>Save &amp; Exit</button>
    </div>
  </>
);

export default Step9GoLive;