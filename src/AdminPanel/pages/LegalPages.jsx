import React, { useState } from "react";
import { BsFileText } from "react-icons/bs";
import { BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineWarningAmber } from "react-icons/md";
import "./LegalPages.css";

const legalData = [
  { id: 1, title: "Privacy Policy",       lastUpdated: "Feb 10, 2026", exists: true  },
  { id: 2, title: "Terms of Service",     lastUpdated: "Feb 10, 2026", exists: true  },
  { id: 3, title: "Refund Policy",        lastUpdated: "Feb 10, 2026", exists: true  },
  { id: 4, title: "Cookie Policy",        lastUpdated: null,           exists: false },
  { id: 5, title: "Freelancer Agreement", lastUpdated: null,           exists: false },
  { id: 6, title: "Agency Agreement",     lastUpdated: null,           exists: false },
];

const LegalPages = () => {
  const [pages, setPages] = useState(legalData);

  const handleCreate = (id) => {
    setPages((prev) =>
      prev.map((p) =>
        p.id === id
          ? { ...p, exists: true, lastUpdated: "Mar 2, 2026" }
          : p
      )
    );
  };

  return (
    <div className="legal-page">
      <div className="legal-box">

        {/* Header */}
        <div className="legal-box-header">
          <div className="legal-box-title">
            <BsFileText className="legal-box-icon" />
            <span>Legal & Compliance Pages</span>
          </div>
          <p className="legal-box-sub">
            Required for payment gateways, OAuth providers, and user trust
          </p>
        </div>

        {/* List */}
        <div className="legal-list">
          {pages.map((p) => (
            <div key={p.id} className="legal-row">
              <div className="legal-row-left">
                {p.exists ? (
                  <BsCheckCircleFill className="legal-row-icon exists" />
                ) : (
                  <MdOutlineWarningAmber className="legal-row-icon missing" />
                )}
                <div>
                  <div className="legal-row-title">{p.title}</div>
                  {p.exists ? (
                    <div className="legal-row-date">Last updated: {p.lastUpdated}</div>
                  ) : (
                    <div className="legal-row-missing">Missing — required before launch</div>
                  )}
                </div>
              </div>

              <div className="legal-row-right">
                {p.exists ? (
                  <>
                    <button className="legal-text-btn">Edit</button>
                    <button className="legal-text-btn">Preview</button>
                  </>
                ) : (
                  <button
                    className="legal-create-btn"
                    onClick={() => handleCreate(p.id)}
                  >
                    <BsFileText /> Create from Template
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default LegalPages;