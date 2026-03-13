import React, { useState } from "react";
import { MdAutoAwesome, MdCheckCircleOutline, MdOutlineWarningAmber, MdLockOutline } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";

const PAYOUT_METHODS = ["Bank Transfer","PayPal Business","Payoneer","Other"];

const inputBase = "w-full px-4 py-3.5 rounded-xl text-sm text-gray-700 outline-none transition-all";
const activeField = "border-[1.5px] border-blue-400 bg-blue-50 shadow-[0_0_0_3px_rgba(79,124,255,0.1)]";
const idleField = "border border-gray-200 bg-white";

const InsightCard = ({ type, children }) => {
  const s = { warn:"bg-amber-50 border-amber-200 text-amber-800", success:"bg-green-50 border-green-200 text-green-800", info:"bg-blue-50 border-blue-200 text-blue-800" };
  return <div className={`flex gap-2.5 items-start border rounded-xl px-3.5 py-3 text-xs leading-relaxed ${s[type]}`}>{children}</div>;
};

const Step7Payment = ({ formData = {}, updateData = () => {}, next = () => {}, prev = () => {} }) => {
  const legalName = formData.legalName || "";
  const [bankName,   setBankName]   = useState(formData.bankName   || "");
  const [accNumber,  setAccNumber]  = useState(formData.accNumber  || "");
  const [swiftCode,  setSwiftCode]  = useState(formData.swiftCode  || "");
  const [holderName, setHolderName] = useState(formData.holderName || "");
  const [payout,     setPayout]     = useState(formData.payout     || "Bank Transfer");
  const [taxId,      setTaxId]      = useState(formData.taxId      || "");

  const holderFilled = holderName.trim().length > 2;
  const nameMismatch = holderFilled && legalName && !holderName.toLowerCase().includes(legalName.toLowerCase().split(" ")[0]);

  const handleNext = () => { updateData({ bankName, accNumber, swiftCode, holderName, payout, taxId }); next(); };

  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-6 sm:px-11 py-10 shadow-sm">
          <h2 className="text-2xl font-extrabold text-gray-900 mb-1.5">Payment & Finance Setup</h2>
          <p className="text-sm text-gray-500 mb-4">Configure how your agency receives payments</p>

          <div className="inline-block bg-blue-50 text-blue-500 text-[11px] font-bold px-3.5 py-1.5 rounded-md border border-blue-200 tracking-wide mb-5">PAYMENT SETUP</div>

          <div className="flex gap-2.5 items-center bg-sky-50 border border-sky-200 rounded-xl px-4 py-3.5 mb-6">
            <span className="text-base shrink-0">💵</span>
            <span className="text-xs text-sky-700">Platform pays only the agency. Team members are paid internally by your agency.</span>
          </div>

          {/* Legal Name — disabled */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Legal Entity Name</label>
            <div className="flex items-center gap-2.5 px-4 py-3.5 rounded-xl border border-gray-200 bg-gray-50">
              <MdLockOutline className="text-gray-400 text-sm shrink-0" />
              <span className="text-sm text-gray-400">{legalName || "Your Company Ltd."}</span>
            </div>
            <div className="text-xs text-gray-400 mt-1">Auto-filled from business profile — must match documents</div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Bank Name *</label>
              <div className={`flex items-center gap-2.5 px-4 py-3.5 rounded-xl border transition-all ${bankName ? activeField : idleField}`}>
                <BsBank2 className="text-gray-400 text-sm shrink-0" />
                <input type="text" placeholder="e.g., Demo Bank" value={bankName} onChange={e => setBankName(e.target.value)}
                  className="flex-1 border-none outline-none bg-transparent text-sm text-gray-700" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Account Number *</label>
              <input type="text" placeholder="1234567890" value={accNumber} onChange={e => setAccNumber(e.target.value)}
                className={`${inputBase} ${accNumber ? activeField : idleField}`} />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Routing / SWIFT Code</label>
              <input type="text" placeholder="e.g., BOFAUS3N" value={swiftCode} onChange={e => setSwiftCode(e.target.value)}
                className={`${inputBase} ${swiftCode ? activeField : idleField}`} />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">Account Holder Name *</label>
              <input type="text" placeholder="As per bank records" value={holderName} onChange={e => setHolderName(e.target.value)}
                className={`${inputBase} ${holderName ? activeField : idleField}`} />
            </div>
          </div>

          {/* Payout Method */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-3">Payout Method *</label>
            <div className="flex gap-2.5 flex-wrap">
              {PAYOUT_METHODS.map(m => (
                <button key={m} onClick={() => setPayout(m)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-xl cursor-pointer text-xs font-medium transition-all
                    ${payout === m ? "border-2 border-blue-400 bg-blue-50 text-blue-500 font-semibold" : "border-[1.5px] border-gray-200 bg-white text-gray-700"}`}>
                  <div className={`w-3.5 h-3.5 rounded-full shrink-0 ${payout === m ? "border-4 border-blue-400 bg-white" : "border-2 border-gray-300 bg-white"}`} />
                  {m}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-900 mb-2">Tax Identification Number</label>
            <input type="text" placeholder="e.g., EIN, VAT, GST" value={taxId} onChange={e => setTaxId(e.target.value)}
              className={`${inputBase} ${taxId ? activeField : idleField}`} />
          </div>

          <div className="flex items-center gap-2.5 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3">
            <MdLockOutline className="text-gray-400 text-sm shrink-0" />
            <span className="text-xs text-gray-500">All payment data is encrypted and stored securely</span>
          </div>
        </div>

        <div className="flex justify-between items-center pt-5">
          <button onClick={prev} className="bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer">← Back</button>
          <button onClick={handleNext} className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all">
            Continue to Permissions →
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
            <InsightCard type="info"><span className="text-sm shrink-0">💡</span>Platform pays only the agency. Team members are paid internally.</InsightCard>
            {holderFilled  && <InsightCard type="success"><MdCheckCircleOutline className="shrink-0 text-sm" />Account holder name will be matched against legal entity.</InsightCard>}
            {nameMismatch  && <InsightCard type="warn"><MdOutlineWarningAmber className="shrink-0 mt-0.5 text-sm" />Holder name may not match legal entity. Verify before submitting.</InsightCard>}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Step7Payment;
