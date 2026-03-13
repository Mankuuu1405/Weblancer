import { useState } from "react";

export default function StepAccount({ onNext }) {
  const [firstName, setFirstName] = useState("Sarah");
  const [lastName,  setLastName]  = useState("Chen");
  const [password,  setPassword]  = useState("••••••••••••");

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Create Your Account</h2>
      <p className="text-sm text-gray-500 mb-5">You've been invited to join an agency</p>

      {/* Invitation Banner */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-5 sm:p-6 text-center text-white mb-6">
        <div className="flex justify-center mb-3">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
            <rect x="2" y="8" width="28" height="20" rx="3" stroke="white" strokeWidth="1.8"/>
            <path d="M8 8V6a4 4 0 018 0v2" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M8 16h16M8 20h10" stroke="white" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
          </svg>
        </div>
        <p className="font-bold text-sm sm:text-base">You've been invited to join TechVision Digital Agency</p>
        <span className="mt-2 inline-block bg-white/20 text-white text-xs font-bold px-3 py-1 rounded-full">DEVELOPER</span>
      </div>

      {/* Form */}
      <div className="flex flex-col gap-4">

        {/* Name row — stacks on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">First Name *</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              value={firstName}
              onChange={e => setFirstName(e.target.value)}
            />
          </div>
          <div>
            <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Last Name *</label>
            <input
              className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
              value={lastName}
              onChange={e => setLastName(e.target.value)}
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Email</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-400 bg-gray-50 cursor-not-allowed"
            value="sarah@example.com"
            readOnly
          />
          <p className="text-xs text-gray-400 mt-1">Pre-filled from invitation — cannot be changed</p>
        </div>

        {/* Password */}
        <div>
          <label className="text-xs font-semibold text-gray-700 mb-1.5 block">Create Password *</label>
          <input
            className="w-full border border-gray-200 rounded-lg px-4 py-2.5 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-200 focus:border-blue-400"
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>

        {/* What you don't need */}
        <div className="border border-gray-200 rounded-xl p-4 bg-gray-50">
          <p className="text-sm font-semibold text-gray-800 mb-3">What you DON'T need:</p>
          <div className="flex flex-col gap-2">
            {["KYC Documents", "Payment Details", "Portfolio (optional)"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-red-400 font-bold flex-shrink-0">×</span>
                {item}
              </div>
            ))}
            <p className="text-xs text-gray-400 mt-1">The platform pays your agency, not individual team members.</p>
          </div>
        </div>

      </div>
    </div>
  );
}
