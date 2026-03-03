import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";
import { BsFileText } from "react-icons/bs";

const CLIENT_TYPES = ["Startup","Mid-size","Enterprise"];
const emptyCaseStudy = () => ({ id: Date.now(), title:"", clientType:"", problem:"", solution:"", teamSize:"" });

const inputBase = "w-full px-3.5 py-3 rounded-xl text-xs text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-blue-400 bg-blue-50";
const idleField = "border border-gray-200 bg-white";

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step5Portfolio = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [caseStudies, setCaseStudies] = useState(formData.caseStudies?.length ? formData.caseStudies : [emptyCaseStudy()]);

  const updateCS  = (id, field, value) => setCaseStudies(cs => cs.map(c => c.id === id ? { ...c, [field]: value } : c));
  const addCS     = () => setCaseStudies(cs => [...cs, emptyCaseStudy()]);
  const removeCS  = id => setCaseStudies(cs => cs.filter(c => c.id !== id));

  const completedCount = caseStudies.filter(c => c.title && c.clientType && c.problem && c.solution).length;
  const hasEnterprise  = caseStudies.some(c => c.clientType === "Enterprise");
  const contentOriginal= completedCount >= 1;
  const needsMore      = caseStudies.length < 2 && !hasEnterprise;

  const handleNext = () => { updateData({ caseStudies }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Showcase Your Work</h2>
          <p className="text-sm text-gray-500 mb-5">Minimum 1 enterprise project or 2 detailed case studies</p>

          <div className="flex gap-2.5 items-center bg-blue-50 border border-blue-200 rounded-xl px-4 py-3 mb-4">
            <BsFileText className="text-blue-500 text-sm shrink-0" />
            <span className="text-xs text-blue-700">Required: Minimum 1 enterprise-level project OR 2 detailed case studies</span>
          </div>

          <div className="text-xs text-gray-500 font-medium mb-5">{completedCount}/{caseStudies.length} Case Studies Complete</div>

          {caseStudies.map((cs, idx) => (
            <div key={cs.id} className="border border-gray-200 rounded-xl p-6 mb-4">
              <div className="flex justify-between items-center mb-5">
                <span className="text-sm font-bold text-gray-700">Case Study #{idx + 1}</span>
                {caseStudies.length > 1 && (
                  <button onClick={() => removeCS(cs.id)} className="bg-transparent border-none text-gray-400 cursor-pointer text-lg leading-none hover:text-gray-600">×</button>
                )}
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Project Title *</label>
                <input type="text" placeholder="e.g., ByteEats Food Delivery Platform" value={cs.title} onChange={e => updateCS(cs.id, "title", e.target.value)}
                  className={`${inputBase} ${cs.title ? activeField : idleField}`} />
              </div>

              <div className="mb-4">
                <label className="block text-xs font-semibold text-gray-700 mb-2">Client Type *</label>
                <div className="flex gap-2.5 flex-wrap">
                  {CLIENT_TYPES.map(ct => (
                    <button key={ct} onClick={() => updateCS(cs.id, "clientType", ct)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-lg cursor-pointer text-xs transition-all
                        ${cs.clientType === ct ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
                      <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${cs.clientType === ct ? "border-4 border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
                      {ct}
                    </button>
                  ))}
                </div>
              </div>

              {[
                { field:"problem",  label:"Problem Statement *",  ph:"Describe the client's problem..." },
                { field:"solution", label:"Solution Delivered *", ph:"Describe your solution..."        },
              ].map(({ field, label, ph }) => (
                <div key={field} className="mb-4">
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">{label}</label>
                  <textarea placeholder={ph} value={cs[field]} onChange={e => updateCS(cs.id, field, e.target.value)} rows={3}
                    className={`${inputBase} resize-y font-[inherit] leading-relaxed ${cs[field] ? activeField : idleField}`} />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">Team Size Involved *</label>
                <input type="number" placeholder="e.g., 5" value={cs.teamSize} onChange={e => updateCS(cs.id, "teamSize", e.target.value)}
                  className={`${inputBase} ${cs.teamSize ? activeField : idleField}`} />
              </div>
            </div>
          ))}

          <button onClick={addCS}
            className="w-full py-3.5 rounded-xl cursor-pointer border-[1.5px] border-dashed border-gray-300 bg-white text-sm font-semibold text-gray-500 flex items-center justify-center gap-2 hover:border-gray-400 hover:text-gray-700 transition-all">
            + Add Another Case Study
          </button>
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Verification →
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
            {contentOriginal && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Content appears original.</InsightCard>}
            {hasEnterprise   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Enterprise project boosts agency credibility!</InsightCard>}
            {needsMore && contentOriginal && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Add 1 more case study or mark one as Enterprise to meet requirements.</InsightCard>}
            {!contentOriginal && caseStudies[0]?.title && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Complete all required fields in the case study.</InsightCard>}
            {!contentOriginal && !caseStudies[0]?.title && <p className="text-xs text-gray-400 text-center py-2">Start adding your case studies to see AI suggestions...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step5Portfolio;