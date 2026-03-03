import React from "react";
import { TbActivity } from "react-icons/tb";
import { BsServer, BsLightningCharge, BsDatabase, BsCloudArrowUp, BsGlobe } from "react-icons/bs";
import { MdOutlineEmail, MdOutlineShield, MdBarChart, MdOutlineWarningAmber } from "react-icons/md";

const services = [
  { icon: <BsServer />,          name: "API Server",      stat: "124ms avg", ok: true },
  { icon: <BsDatabase />,        name: "Database",        stat: "45ms avg",  ok: true },
  { icon: <BsLightningCharge />, name: "WebSocket",       stat: "847 conns", ok: true },
  { icon: <BsCloudArrowUp />,    name: "File Storage",    stat: "89ms",      ok: true },
  { icon: <MdOutlineEmail />,    name: "Email Service",   stat: "3 pending", ok: true },
  { icon: <MdOutlineShield />,   name: "Payment Gateway", stat: "Healthy",   ok: true },
];

const perfMetrics = [
  { label: "Page Load",    value: "1.2s",   trend: "↓ improved", up: false },
  { label: "API Response", value: "124ms",  trend: "↓ improved", up: false },
  { label: "DB Queries",   value: "45ms",   trend: "↑ slight",   up: true  },
  { label: "Uptime",       value: "99.97%", trend: "45min down", up: false },
];

const errorLogs = [
  { time: "14:32", level: "WARNING", error: "Payment webhook retry", affected: "None",           status: "RESOLVED"     },
  { time: "13:15", level: "INFO",    error: "File upload timeout",   affected: "john@email.com", status: "AUTO-RETRIED" },
  { time: "11:42", level: "WARNING", error: "OAuth token refresh",   affected: "2 users",        status: "RESOLVED"     },
];

const Monitoring = () => (
  <div className="flex flex-col gap-5">

    {/* System Health */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
          <TbActivity className="text-emerald-500 text-xl" />
          System Health
        </div>
        <span className="text-xs font-bold text-emerald-500 bg-emerald-50 px-3.5 py-1.5 rounded-full tracking-wide">
          ALL SYSTEMS OPERATIONAL
        </span>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-100">
        {services.map((s, i) => (
          <div
            key={i}
            className={`flex justify-between items-center px-3 py-3.5 border-b border-gray-100
              ${i % 2 === 1 ? "sm:border-l" : ""}
              ${i >= services.length - 2 ? "sm:border-b-0" : ""}
              ${i === services.length - 1 ? "border-b-0" : ""}
            `}
          >
            <div className="flex items-center gap-2.5">
              <span className="text-gray-500 text-sm">{s.icon}</span>
              <span className="text-sm font-medium text-gray-700">{s.name}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <span className="text-xs text-gray-400">{s.stat}</span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.45)] shrink-0" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Performance */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <MdBarChart className="text-blue-500 text-xl" />
        Performance (Last 7 Days)
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 border border-gray-100 rounded-xl overflow-hidden">
        {perfMetrics.map((m, i) => (
          <div
            key={i}
            className={`px-4 sm:px-5 py-5 ${i !== perfMetrics.length - 1 ? "border-b sm:border-b-0 sm:border-r border-gray-100" : ""}`}
          >
            <div className="text-xs text-gray-400 mb-2">{m.label}</div>
            <div className="text-2xl sm:text-3xl font-extrabold text-gray-900 leading-none mb-1">{m.value}</div>
            <div className={`text-xs font-medium ${m.up ? "text-amber-400" : "text-emerald-500"}`}>{m.trend}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Error Log */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div className="flex items-center gap-2.5 text-base font-bold text-gray-900">
          <MdOutlineWarningAmber className="text-amber-400 text-xl" />
          Error Log (24h)
        </div>
        <span className="text-xs text-gray-500">
          Total: 14 &nbsp;
          <span className="text-gray-500">Critical: 0</span> &nbsp;
          <span className="text-amber-500 font-semibold">Warnings: 3</span>
        </span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Time", "Level", "Error", "Affected", "Status"].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {errorLogs.map((l, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3.5 py-4 text-xs text-gray-500 font-mono border-b border-gray-100 last:border-0">{l.time}</td>
                <td className="px-3.5 py-4 border-b border-gray-100">
                  <span className={`inline-block px-2.5 py-0.5 rounded-md text-xs font-bold
                    ${l.level === "WARNING" ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-800"}`}>
                    {l.level}
                  </span>
                </td>
                <td className="px-3.5 py-4 text-sm text-gray-700 border-b border-gray-100">{l.error}</td>
                <td className="px-3.5 py-4 text-xs text-gray-500 border-b border-gray-100">{l.affected}</td>
                <td className="px-3.5 py-4 border-b border-gray-100">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold
                    ${l.status === "RESOLVED" ? "bg-emerald-100 text-emerald-600" : "bg-blue-100 text-blue-700"}`}>
                    {l.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);

export default Monitoring;