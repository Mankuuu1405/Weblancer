import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber } from "react-icons/md";

const PRIMARY_SERVICES = ["Web Development","Mobile Apps","UI/UX Design","AI/ML","Blockchain","Cloud Services","DevOps","Data Science","Cybersecurity","IoT"];
const TECH_STACK = ["React","Node.js","Python","TypeScript","AWS","Docker","PostgreSQL","MongoDB","Flutter","Swift","Kotlin","Go","Rust","Vue.js","Angular","Django","Rails"];
const INDUSTRIES = ["FinTech","HealthTech","E-commerce","Education","Real Estate","Logistics","Media","Government","Retail","SaaS"];
const MAX_PRIMARY = 5, MAX_TECH = 10, MAX_IND = 5;

const TagChip = ({ label, selected, onClick }) => (
  <button onClick={onClick}
    className={`inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full cursor-pointer text-xs font-medium transition-all
      ${selected ? "bg-blue-500 text-white border-none" : "bg-white text-gray-700 border-[1.5px] border-gray-200 hover:border-blue-300"}`}>
    {label}
    {selected && <span className="text-xs opacity-80">×</span>}
  </button>
);

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step4Services = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [services,   setServices]   = useState(formData.services   || []);
  const [techStack,  setTechStack]  = useState(formData.techStack  || []);
  const [industries, setIndustries] = useState(formData.industries || []);

  const toggle = (list, setList, item, max) => {
    if (list.includes(item)) setList(list.filter(x => x !== item));
    else if (list.length < max) setList([...list, item]);
  };

  const tooManyServices = services.length > 3;
  const techAligns      = techStack.length >= 3 && services.length >= 1;
  const focusTip        = services.length >= 1 && services.length <= 3;

  const handleNext = () => { updateData({ services, techStack, industries }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">What You Offer</h2>
          <p className="text-sm text-gray-500 mb-5">Define your agency's service capabilities</p>

          <div className="flex gap-2.5 items-start bg-amber-50 border border-amber-200 rounded-xl px-4 py-3.5 mb-7">
            <MdOutlineWarningAmber className="text-amber-400 text-base shrink-0 mt-0.5" />
            <span className="text-xs text-amber-800 leading-relaxed">Be strategic: Fewer, accurate services perform better than exaggerated claims.</span>
          </div>

          {[
            { label:"Primary Services *", list:services, setList:setServices, items:PRIMARY_SERVICES, max:MAX_PRIMARY },
            { label:"Technology Stack *",  list:techStack, setList:setTechStack, items:TECH_STACK, max:MAX_TECH },
            { label:"Industries Served *", list:industries, setList:setIndustries, items:INDUSTRIES, max:MAX_IND },
          ].map(({ label, list, setList, items, max }) => (
            <div key={label} className="mb-7 last:mb-0">
              <div className="flex justify-between items-center mb-3">
                <label className="text-sm font-semibold text-gray-900">{label}</label>
                <span className={`text-xs ${list.length >= max ? "text-red-500" : "text-gray-500"}`}>{list.length}/{max} selected</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {items.map(s => <TagChip key={s} label={s} selected={list.includes(s)} onClick={() => toggle(list, setList, s, max)} />)}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Portfolio →
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
            {tooManyServices && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Be strategic: Fewer, accurate services perform better than exaggerated claims.</InsightCard>}
            {focusTip        && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Focus on 2–3 core competencies for better results.</InsightCard>}
            {techAligns      && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Your tech stack selections align well.</InsightCard>}
            {!tooManyServices && !focusTip && !techAligns && <p className="text-xs text-gray-400 text-center py-2">Start selecting services to see AI suggestions...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step4Services;
