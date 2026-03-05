import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { BsUpload, BsClockHistory } from "react-icons/bs";

const DOCS = [
  { id:"brc",  label:"Business Registration Certificate",          required:true  },
  { id:"tax",  label:"Tax Registration Document (GST/VAT/EIN)",    required:true  },
  { id:"sig",  label:"Authorized Signatory ID Proof",              required:true  },
  { id:"addr", label:"Address Proof (Utility bill/Bank statement)", required:true  },
  { id:"iso",  label:"ISO or Industry Certifications",             required:false },
];

const badgeStyle = {
  VERIFIED:         "bg-green-50 text-green-700 border-green-200",
  "PENDING REVIEW": "bg-amber-50 text-amber-700 border-amber-200",
  "NOT UPLOADED":   "bg-gray-100 text-gray-500 border-gray-200",
};
const cardStyle = {
  VERIFIED:         "bg-green-50 border-green-200",
  "PENDING REVIEW": "bg-amber-50 border-amber-200",
  "NOT UPLOADED":   "bg-gray-50 border-gray-200",
};

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step6Verify = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [docStatus, setDocStatus] = useState({
    brc:"VERIFIED", tax:"PENDING REVIEW", sig:"VERIFIED", addr:"NOT UPLOADED", iso:"NOT UPLOADED"
  });

  const handleUpload = (id) => {
    setDocStatus(p => ({ ...p, [id]:"PENDING REVIEW" }));
    setTimeout(() => setDocStatus(p => ({ ...p, [id]:"VERIFIED" })), 2500);
  };

  const verifiedCount  = Object.values(docStatus).filter(s => s === "VERIFIED").length;
  const hasUnuploaded  = DOCS.filter(d => d.required).some(d => docStatus[d.id] === "NOT UPLOADED");
  const allMandatoryOk = DOCS.filter(d => d.required).every(d => docStatus[d.id] === "VERIFIED");

  const handleNext = () => { updateData({ docStatus }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Business Verification (KYC)</h2>
          <p className="text-sm text-gray-500 mb-5">Without verification, you cannot receive serious projects</p>

          <div className="flex gap-2.5 items-center bg-rose-50 border border-rose-200 rounded-xl px-4 py-3.5 mb-5">
            <span className="text-rose-500 text-base shrink-0">⊘</span>
            <span className="text-xs text-rose-800">Hard Gate: Without verification, you cannot receive serious projects.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 mb-6">
            <span className="text-xs font-bold text-amber-600 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-md tracking-wide">VERIFICATION PENDING</span>
            <span className="flex items-center gap-1.5 text-xs text-gray-500"><BsClockHistory /> Estimated: 24–48 hours</span>
          </div>

          <div className="flex flex-col gap-2.5 mb-6">
            {DOCS.map(doc => {
              const status = docStatus[doc.id];
              return (
                <div key={doc.id} className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-4 py-4 rounded-xl border ${cardStyle[status]}`}>
                  <div className="flex items-center gap-3">
                    {status === "VERIFIED" ? <MdCheckCircleOutline className="text-green-600 text-lg" />
                      : status === "PENDING REVIEW" ? <BsClockHistory className="text-amber-600 text-base" />
                      : <BsUpload className="text-gray-400 text-base" />}
                    <div>
                      <div className="text-xs font-semibold text-gray-700">
                        {doc.label}{doc.required && <span className="text-red-500"> *</span>}
                      </div>
                      <div className="text-[11px] text-gray-400 mt-0.5">PDF, JPG, PNG – max 5MB</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2.5 ml-7 sm:ml-0">
                    <span className={`text-[11px] font-bold px-3 py-1 rounded-md border tracking-wide ${badgeStyle[status]}`}>{status}</span>
                    {status === "NOT UPLOADED" && (
                      <button onClick={() => handleUpload(doc.id)}
                        className="px-4 py-1.5 rounded-lg cursor-pointer border-[1.5px] border-blue-400 bg-white text-xs font-semibold text-blue-500 hover:bg-blue-50 transition-colors">
                        Upload
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-4">
            <div className="text-xs font-semibold text-gray-700 mb-2.5">Until verified:</div>
            {["No large projects","No escrow above threshold"].map(item => (
              <div key={item} className="flex items-center gap-2 text-xs text-gray-500 mb-1.5">
                <span className="text-red-500 font-bold">✕</span> {item}
              </div>
            ))}
          </div>
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Payment →
          </button>
        </div>
      </div>

      {/* AI Insights */}
      <div className="w-full lg:w-[290px] lg:shrink-0 lg:sticky lg:top-6">
        <div className="bg-white border border-violet-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-7 h-7 rounded-lg bg-violet-50 flex items-center justify-center">
              <MdAutoAwesome className="text-violet-700 text-sm" />
            </div>
            <span className="text-sm font-bold text-violet-700">AI Insights</span>
          </div>
          <div className="flex flex-col gap-2.5">
            {verifiedCount > 0 && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />{verifiedCount} document(s) auto-approved.</InsightCard>}
            {hasUnuploaded     && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Upload all mandatory documents to proceed.</InsightCard>}
            {allMandatoryOk   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />All mandatory docs verified. You're good to go!</InsightCard>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step6Verify;
