import React from "react";
import { useNavigate } from "react-router-dom";
import { MdCheckCircleOutline } from "react-icons/md";

const TRUST_SCORES = [
  { label:"Profile",      pct:100, color:"#4f7cff" },
  { label:"Verification", pct:100, color:"#4f7cff" },
  { label:"Portfolio",    pct:70,  color:"#a78bfa" },
  { label:"Team Setup",   pct:80,  color:"#a78bfa" },
];

const GROWTH_STAGES = [
  { label:"Starter",     sub:"0–5 projects",  price:"$5,000/project",   active:true  },
  { label:"Growing",     sub:"6–15 projects", price:"$10,000/project",  active:false },
  { label:"Established", sub:"16+ projects",  price:"$25,000+/project", active:false },
];

const Step9GoLive = ({ formData = {}, prev = () => {} }) => {
  const navigate   = useNavigate();

   const handleRole = (role)=>{
   localStorage.setItem('role',role);
   navigate('/signin');
  }
  

  const agencyName = formData.agencyName || "TechVision Digital Agency";
  const firstName  = formData.firstName  || "John";
  const lastName   = formData.lastName   || "Doe";
  const trustScore = 65;

   
  return (
    <div className="flex flex-col lg:flex-row gap-5 items-start w-full">
      <div className="flex-1 min-w-0">
        <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-11 py-8 sm:py-10 shadow-sm">
          <h2 className="text-xl sm:text-2xl font-extrabold text-gray-900 mb-6 sm:mb-8">Agency Activation</h2>

          {/* Success */}
          <div className="flex flex-col items-center mb-6 sm:mb-8">
            <div className="w-16 h-16 sm:w-[72px] sm:h-[72px] rounded-full bg-gradient-to-br from-[#4f7cff] to-[#7c3aed] flex items-center justify-center mb-4 shadow-[0_8px_24px_rgba(79,124,255,0.3)]">
              <MdCheckCircleOutline className="text-white text-3xl sm:text-4xl" />
            </div>
            <h3 className="text-lg sm:text-xl font-extrabold text-gray-900 mb-1.5 text-center">🎉 Your Agency is Active!</h3>
            <p className="text-sm text-gray-500 text-center">You're ready to start building your reputation</p>
          </div>

          {/* Summary cards row 1 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-2.5">
            {[
              { label:"Agency", value:agencyName },
              { label:"Admin",  value:`${firstName} ${lastName}` },
              { label:"Status", value:"ACTIVE", badge:true, color:"text-green-700", bg:"bg-green-50", border:"border-green-200" },
            ].map(item => (
              <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
                <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
                {item.badge
                  ? <span className={`text-xs font-bold px-3 py-1 rounded-md border ${item.color} ${item.bg} ${item.border}`}>{item.value}</span>
                  : <div className="text-xs font-bold text-gray-900 break-words">{item.value}</div>}
              </div>
            ))}
          </div>

          {/* Summary cards row 2 */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-6">
            {[
              { label:"Verification", value:"VERIFIED",   color:"text-green-700",  bg:"bg-green-50",  border:"border-green-200"  },
              { label:"Payment",      value:"READY",      color:"text-blue-700",   bg:"bg-blue-50",   border:"border-blue-200"   },
              { label:"Permissions",  value:"CONFIGURED", color:"text-violet-700", bg:"bg-violet-50", border:"border-violet-200" },
            ].map(item => (
              <div key={item.label} className="px-4 py-4 border border-gray-200 rounded-xl text-center">
                <div className="text-[11px] text-gray-400 font-medium mb-1.5">{item.label}</div>
                <span className={`text-xs font-bold px-3 py-1 rounded-md border ${item.color} ${item.bg} ${item.border}`}>{item.value}</span>
              </div>
            ))}
          </div>

          {/* Growth Path */}
          <div className="border border-gray-200 rounded-xl p-4 sm:p-5 mb-4">
            <div className="text-sm font-bold text-gray-900 mb-4">📈 Growth Path</div>

            {/* Progress bar */}
            <div className="flex mb-4">
              {GROWTH_STAGES.map((stage, i) => (
                <div key={stage.label} className="flex-1">
                  <div style={{
                    height: "4px",
                    background: stage.active ? "#4f7cff" : "#e5e7eb",
                    borderRadius: i === 0 ? "999px 0 0 999px" : i === GROWTH_STAGES.length - 1 ? "0 999px 999px 0" : "0"
                  }} />
                </div>
              ))}
            </div>

            {/* Stage labels — stack vertically on mobile, horizontal on sm+ */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-0">
              {GROWTH_STAGES.map((stage, i) => (
                <div key={stage.label} className={`flex sm:flex-col sm:flex-1 items-center sm:items-start gap-3 sm:gap-0 sm:pr-2
                  ${i !== 0 ? "sm:border-l-0 border-t border-gray-100 sm:border-t-0 pt-3 sm:pt-0" : ""}`}>
                  {/* Dot indicator on mobile */}
                  <div className={`w-2 h-2 rounded-full shrink-0 sm:hidden ${stage.active ? "bg-blue-500" : "bg-gray-300"}`} />
                  <div>
                    <div className={`text-xs font-bold mb-0.5 ${stage.active ? "text-blue-500" : "text-gray-700"}`}>{stage.label}</div>
                    <div className="text-[11px] text-gray-400 mb-0.5">{stage.sub}</div>
                    <div className={`text-xs font-semibold ${stage.active ? "text-blue-500" : "text-gray-500"}`}>{stage.price}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trust Score */}
          <div className="border border-gray-200 rounded-xl p-4 sm:p-5">
            <div className="text-sm font-bold text-gray-900 mb-4">⭐ Trust Score</div>
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-5 sm:items-start">
              {/* Score number */}
              <div className="flex sm:flex-col items-center sm:items-center gap-2 sm:gap-0 shrink-0">
                <div className="flex items-baseline gap-0.5">
                  <span className="text-4xl sm:text-3xl font-extrabold text-gray-900">{trustScore}</span>
                  <span className="text-base text-gray-400 font-medium">/100</span>
                </div>
                {/* Mini ring indicator on mobile */}
                <div className="flex-1 sm:hidden h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div style={{ width:`${trustScore}%`, background:"#4f7cff" }} className="h-full rounded-full" />
                </div>
              </div>

              {/* Score bars */}
              <div className="flex-1">
                {TRUST_SCORES.map(item => (
                  <div key={item.label} className="flex items-center gap-2.5 mb-2.5">
                    <div className="text-xs text-gray-500 w-20 shrink-0">{item.label}</div>
                    <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <div style={{ width:`${item.pct}%`, background:item.color }} className="h-full rounded-full transition-all duration-700" />
                    </div>
                    <div className="text-xs font-semibold text-gray-700 w-9 text-right">{item.pct}%</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom buttons */}
        <div className="flex justify-between items-center m-3">
          <button
            onClick={prev}
            className=" bg-transparent border-none text-sm font-semibold text-gray-500 hover:text-gray-800 cursor-pointer transition-colors"
          >
            ← Back
          </button>
          <button
            onClick={() => handleRole("agency")}
            className="bg-[#4f7cff] hover:bg-[#3b6bef] hover:-translate-y-px text-white border-none rounded-xl px-8 py-3.5 text-sm font-bold cursor-pointer shadow-[0_4px_14px_rgba(79,124,255,0.3)] transition-all"
          >
           Sign in → 
          </button>
        </div>
      </div>

      {/* Intentionally empty sidebar placeholder */}
      <div className="hidden lg:block lg:w-[290px] lg:shrink-0" />
    </div>
  );
};

export default Step9GoLive;
