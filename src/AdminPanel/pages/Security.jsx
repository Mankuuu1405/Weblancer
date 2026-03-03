import React from "react";
import { MdOutlineLock, MdOutlineShield, MdOutlineWarningAmber } from "react-icons/md";
import { BsCheckCircleFill } from "react-icons/bs";

const sslCoverage = ["arclancer.com", "api.arclancer.com", "admin.arclancer.com"];

const rateLimits = [
  { route: "/api/auth/login",    limit: "5 attempts / 15 min", type: "IP-BASED"   },
  { route: "/api/auth/register", limit: "3 attempts / 1 hour", type: "IP-BASED"   },
  { route: "/api/chat/send",     limit: "60 messages / min",   type: "USER-BASED" },
  { route: "/api/files/upload",  limit: "20 uploads / hour",   type: "USER-BASED" },
  { route: "/api/search",        limit: "100 requests / min",  type: "USER-BASED" },
];

const suspiciousActivity = [
  { risk: "HIGH RISK",   time: "14:32", title: "Multiple login failures — IP: 198.51.100.0",          action: "→ Auto-blocked for 1 hour", riskStyle: "bg-red-100 text-red-600",    cardStyle: "bg-red-50 border-red-200"    },
  { risk: "MEDIUM RISK", time: "14:15", title: "Unusual file upload pattern — User: john@email.com",  action: "→ Flagged for review",      riskStyle: "bg-amber-100 text-amber-700", cardStyle: "bg-amber-50 border-amber-200" },
  { risk: "LOW RISK",    time: "13:45", title: "New device login — User: sara@biz.com",               action: "→ User notified",           riskStyle: "bg-emerald-100 text-emerald-700", cardStyle: "bg-emerald-50 border-emerald-200" },
];

const Security = () => (
  <div className="flex flex-col gap-5">

    {/* SSL Certificate */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <MdOutlineLock className="text-emerald-500 text-xl" />
        SSL Certificate
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-10">
        {/* Info */}
        <div className="flex flex-col">
          {[
            { k: "Domain",       v: "arclancer.com",   green: false },
            { k: "Certificate",  v: "Let's Encrypt",   green: false },
            { k: "Valid Until",  v: "Dec 15, 2026",    green: false },
            { k: "Auto-renewal", v: "Enabled ✓",       green: true  },
          ].map((row) => (
            <div key={row.k} className="flex gap-6 py-2.5 border-b border-gray-50 last:border-0 text-sm">
              <span className="text-gray-500 min-w-[110px]">{row.k}</span>
              <span className={`font-medium ${row.green ? "text-emerald-500 font-semibold" : "text-gray-900"}`}>{row.v}</span>
            </div>
          ))}
        </div>
        {/* Coverage */}
        <div>
          <div className="text-xs text-gray-400 mb-2.5">Coverage:</div>
          {sslCoverage.map((c, i) => (
            <div key={i} className="flex items-center gap-2 text-sm text-gray-700 mb-2">
              <BsCheckCircleFill className="text-emerald-500 text-sm shrink-0" />
              <span>{c}</span>
            </div>
          ))}
        </div>
      </div>
    </div>

    {/* Rate Limiting */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <MdOutlineShield className="text-blue-500 text-xl" />
        Rate Limiting
      </div>
      <div className="flex flex-col">
        {rateLimits.map((r, i) => (
          <div key={i} className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 py-3.5 border-b border-gray-100 last:border-0">
            <span className="text-sm text-blue-500 font-mono font-medium">{r.route}</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-500">{r.limit}</span>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-md
                ${r.type === "IP-BASED" ? "bg-blue-100 text-blue-800" : "bg-violet-100 text-violet-700"}`}>
                {r.type}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Suspicious Activity */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <MdOutlineWarningAmber className="text-amber-400 text-xl" />
        Suspicious Activity
      </div>
      <div className="flex flex-col gap-3">
        {suspiciousActivity.map((s, i) => (
          <div key={i} className={`rounded-xl px-4 sm:px-5 py-4 border ${s.cardStyle}`}>
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2.5">
                <span className={`text-xs font-bold px-2.5 py-1 rounded-md ${s.riskStyle}`}>{s.risk}</span>
                <span className="text-xs text-gray-400">{s.time}</span>
              </div>
              <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors bg-transparent border-none cursor-pointer">
                View
              </button>
            </div>
            <div className="text-sm font-medium text-gray-900 mb-1">{s.title}</div>
            <div className="text-xs text-gray-500">{s.action}</div>
          </div>
        ))}
      </div>
    </div>

  </div>
);

export default Security;