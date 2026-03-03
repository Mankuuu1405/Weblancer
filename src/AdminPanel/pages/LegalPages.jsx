import React, { useState } from "react";
import { BsFileText, BsCheckCircleFill } from "react-icons/bs";
import { MdOutlineWarningAmber } from "react-icons/md";

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
        p.id === id ? { ...p, exists: true, lastUpdated: "Mar 2, 2026" } : p
      )
    );
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">

        {/* Header */}
        <div className="px-5 sm:px-7 pt-6 pb-4 border-b border-gray-100">
          <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-1.5">
            <BsFileText className="text-blue-500 text-lg shrink-0" />
            <span>Legal & Compliance Pages</span>
          </div>
          <p className="text-xs text-gray-500 ml-7">
            Required for payment gateways, OAuth providers, and user trust
          </p>
        </div>

        {/* List */}
        <div className="flex flex-col">
          {pages.map((p) => (
            <div
              key={p.id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-5 sm:px-7 py-5 border-b border-gray-100 last:border-0 hover:bg-gray-50 transition-colors"
            >
              {/* Left */}
              <div className="flex items-start gap-3">
                {p.exists ? (
                  <BsCheckCircleFill className="text-emerald-500 text-xl mt-0.5 shrink-0" />
                ) : (
                  <MdOutlineWarningAmber className="text-amber-400 text-xl mt-0.5 shrink-0" />
                )}
                <div>
                  <div className="text-sm font-semibold text-gray-900 mb-0.5">{p.title}</div>
                  {p.exists ? (
                    <div className="text-xs text-gray-400">Last updated: {p.lastUpdated}</div>
                  ) : (
                    <div className="text-xs text-amber-500 font-medium">Missing — required before launch</div>
                  )}
                </div>
              </div>

              {/* Right */}
              <div className="flex items-center gap-4 shrink-0 ml-7 sm:ml-0">
                {p.exists ? (
                  <>
                    <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer">
                      Edit
                    </button>
                    <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer">
                      Preview
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => handleCreate(p.id)}
                    className="inline-flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold px-4 py-2.5 rounded-lg transition-colors cursor-pointer"
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