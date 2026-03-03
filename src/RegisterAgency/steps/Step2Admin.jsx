import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline } from "react-icons/md";
import { FiUser, FiPhone } from "react-icons/fi";
import { FaLinkedinIn } from "react-icons/fa";

const COUNTRY_CODES = [
  { code: "+1" },{ code: "+44" },{ code: "+91" },{ code: "+61" },
  { code: "+49" },{ code: "+33" },{ code: "+65" },{ code: "+971" },{ code: "+92" },{ code: "+55" },
];
const ROLES = ["Founder", "Director", "Manager"];

const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
const idleField = "border border-gray-200 bg-white";

const InsightCard = ({ type, children }) => {
  const s = { success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
  return <div className={`flex gap-2.5 items-center border rounded-xl px-3.5 py-3 text-xs ${s[type]}`}>{children}</div>;
};

const Step2Admin = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const [firstName,   setFirstName]   = useState(formData.firstName   || "");
  const [lastName,    setLastName]    = useState(formData.lastName    || "");
  const [role,        setRole]        = useState(formData.adminRole   || "");
  const [countryCode, setCountryCode] = useState(formData.countryCode || "+1");
  const [phone,       setPhone]       = useState(formData.phone       || "");
  const [linkedin,    setLinkedin]    = useState(formData.linkedin    || "");
  const [verified,    setVerified]    = useState(false);

  const linkedinFilled = linkedin.trim().length > 0;
  const phoneFilled    = phone.trim().length >= 7;

  const handleNext = () => { updateData({ firstName, lastName, adminRole: role, countryCode, phone, linkedin }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Who Controls This Agency?</h2>
          <p className="text-sm text-gray-500 mb-8">We need one accountable human for legal and dispute purposes</p>

          {/* Name Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">First Name *</label>
              <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${firstName ? activeField : idleField}`}>
                <FiUser className="text-gray-400 text-sm shrink-0" />
                <input type="text" placeholder="John" value={firstName} onChange={e => setFirstName(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Last Name *</label>
              <input type="text" placeholder="Doe" value={lastName} onChange={e => setLastName(e.target.value)}
                className={`${inputBase} ${lastName ? activeField : idleField}`} />
            </div>
          </div>

          {/* Role */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Agency Admin Role *</label>
            <div className="flex gap-3 flex-wrap">
              {ROLES.map(r => (
                <button key={r} onClick={() => setRole(r)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-xl cursor-pointer text-sm font-medium transition-all
                    ${role === r ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
                  <div className={`w-4 h-4 rounded-full shrink-0 transition-all ${role === r ? "border-[5px] border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
                  {r}
                </button>
              ))}
            </div>
          </div>

          {/* Phone */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Admin Phone Number *</label>
            <div className="flex gap-2.5 flex-wrap sm:flex-nowrap">
              <div className="relative">
                <select value={countryCode} onChange={e => setCountryCode(e.target.value)}
                  className="px-3 pr-8 py-3.5 rounded-xl border border-gray-200 bg-white text-sm text-gray-700 outline-none appearance-none cursor-pointer min-w-[72px]">
                  {COUNTRY_CODES.map(c => <option key={c.code} value={c.code}>{c.code}</option>)}
                </select>
                <div className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none text-[10px]">▼</div>
              </div>
              <div className={`flex-1 flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${phone ? activeField : idleField}`}>
                <FiPhone className="text-gray-400 text-sm shrink-0" />
                <input type="tel" placeholder="1234567890" value={phone} onChange={e => setPhone(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
              </div>
              <button onClick={() => phoneFilled && setVerified(true)}
                className={`px-5 py-3.5 rounded-xl cursor-pointer text-sm font-semibold whitespace-nowrap transition-all
                  ${verified ? "border-[1.5px] border-green-400 bg-green-50 text-green-600" : "border-[1.5px] border-blue-400 bg-white text-blue-500"}`}>
                {verified ? "✓ Verified" : "Verify"}
              </button>
            </div>
          </div>

          {/* LinkedIn */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Admin LinkedIn Profile <span className="text-xs text-gray-400 font-normal">(Optional - helps build trust)</span>
            </label>
            <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${linkedinFilled ? activeField : idleField}`}>
              <FaLinkedinIn className="text-[#0077b5] text-sm shrink-0" />
              <input type="url" placeholder="https://linkedin.com/in/yourprofile" value={linkedin} onChange={e => setLinkedin(e.target.value)}
                className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Business Profile →
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
            {!linkedinFilled && <InsightCard type="info"><span className="text-base shrink-0">💡</span>Adding your LinkedIn profile helps build trust with potential clients.</InsightCard>}
            {linkedinFilled && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />LinkedIn added — boosts trust score!</InsightCard>}
            {verified && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Phone number verified successfully!</InsightCard>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step2Admin;