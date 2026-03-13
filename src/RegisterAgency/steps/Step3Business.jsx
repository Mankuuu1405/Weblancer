import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdLocationOn } from "react-icons/md";
import { BsBuilding, BsGlobe } from "react-icons/bs";

const BIZ_TYPES = ["Sole Proprietorship","Partnership","Private Limited","LLC","Corporation","LLP"];

const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
const idleField = "border border-gray-200 bg-white";

const InsightCard = ({ type, children }) => {
  const s = { success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step3Business = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [legalName,   setLegalName]   = useState(formData.legalName   || "");
  const [bizType,     setBizType]     = useState(formData.bizType     || "");
  const [incYear,     setIncYear]     = useState(formData.incYear     || "");
  const [street,      setStreet]      = useState(formData.street      || "");
  const [city,        setCity]        = useState(formData.city        || "");
  const [state,       setState]       = useState(formData.state       || "");
  const [zip,         setZip]         = useState(formData.zip         || "");
  const [sameAddress, setSameAddress] = useState(formData.sameAddress !== false);
  const [website,     setWebsite]     = useState(formData.website     || "");

  const legalNameFilled = legalName.trim().length >= 5;
  const websiteFilled   = website.trim().length > 5;
  const emailDomain     = formData.email ? formData.email.split("@")[1] : "";
  const websiteDomain   = website.replace(/https?:\/\//, "").split("/")[0].replace("www.", "");
  const domainMatches   = websiteFilled && emailDomain && websiteDomain && websiteDomain.includes(emailDomain.split(".")[0]);

  const handleNext = () => { updateData({ legalName, bizType, incYear, street, city, state, zip, sameAddress, website }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Agency Legal & Business Profile</h2>
          <p className="text-sm text-gray-500 mb-7">Legal clarity ensures smooth payments and builds trust</p>

          {/* Legal Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Legal Company Name *</label>
            <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${legalName ? activeField : idleField}`}>
              <BsBuilding className="text-gray-400 text-sm shrink-0" />
              <input type="text" placeholder="e.g., TechVision Solutions Pvt. Ltd." value={legalName} onChange={e => setLegalName(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
            </div>
            <div className="text-xs text-gray-400 mt-1">Must match your registration documents</div>
          </div>

          {/* Biz Type + Year */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Registered Business Type *</label>
              <div className="relative">
                <select value={bizType} onChange={e => setBizType(e.target.value)}
                  className={`${inputBase} appearance-none cursor-pointer ${bizType ? activeField : idleField}`}>
                  <option value="">Select type</option>
                  {BIZ_TYPES.map(t => <option key={t}>{t}</option>)}
                </select>
                <div className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[11px]">▼</div>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Year of Incorporation *</label>
              <input type="text" placeholder="2019" value={incYear} maxLength={4} onChange={e => setIncYear(e.target.value)}
                className={`${inputBase} ${incYear ? activeField : idleField}`} />
            </div>
          </div>

          {/* Address */}
          <div className="mb-5">
            <div className="flex items-center gap-1.5 mb-3.5">
              <MdLocationOn className="text-gray-500 text-base" />
              <span className="text-sm font-bold text-gray-900">Official Registered Address *</span>
            </div>
            <input type="text" placeholder="Street address" value={street} onChange={e => setStreet(e.target.value)}
              className={`${inputBase} mb-2.5 ${street ? activeField : idleField}`} />
            <div className="grid grid-cols-3 gap-2.5 mb-3">
              {[{val:city,set:setCity,ph:"City"},{val:state,set:setState,ph:"State"},{val:zip,set:setZip,ph:"ZIP"}].map(({val,set,ph}) => (
                <input key={ph} type="text" placeholder={ph} value={val} onChange={e => set(e.target.value)}
                  className={`${inputBase} ${val ? activeField : idleField}`} />
              ))}
            </div>
            <div className="flex items-center gap-2 cursor-pointer" onClick={() => setSameAddress(!sameAddress)}>
              <div className={`w-4.5 h-4.5 rounded-md shrink-0 flex items-center justify-center transition-all ${sameAddress ? "bg-blue-500" : "bg-white border-2 border-gray-300"}`}
                style={{width:"18px",height:"18px"}}>
                {sameAddress && <span className="text-white text-[11px] font-bold">✓</span>}
              </div>
              <span className="text-xs text-gray-500">Operating address is the same as registered address</span>
            </div>
          </div>

          {/* Website */}
          <div>
            <div className="flex items-center gap-2.5 mb-2">
              <label className="text-sm font-semibold text-gray-900">Company Website</label>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-200 px-2.5 py-0.5 rounded-full">STRONGLY RECOMMENDED</span>
            </div>
            <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${website ? activeField : idleField}`}>
              <BsGlobe className="text-gray-400 text-sm shrink-0" />
              <input type="url" placeholder="https://yourcompany.com" value={website} onChange={e => setWebsite(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Services →
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
            {legalNameFilled && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Legal name recorded. Will be verified against documents.</InsightCard>}
            {domainMatches   && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 mt-0.5 text-sm" />Website domain matches email domain ✓</InsightCard>}
            {!websiteFilled && legalNameFilled && <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Adding your company website greatly increases trust score.</InsightCard>}
            {!legalNameFilled && <p className="text-xs text-gray-400 text-center py-2">Start filling the form to see AI suggestions...</p>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step3Business;
