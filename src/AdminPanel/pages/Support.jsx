import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineEmergency } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";

const ticketsData = [
  { id: "0891", title: "Payment Issue",    unread: true,  from: "John D. (Client)",       project: "Food Delivery App",       priority: "HIGH",      time: "2h ago",   status: "Open",        assigned: null,         actions: ["assign", "viewproject", "openticket"] },
  { id: "0890", title: "Scope dispute",    unread: false, from: "Sara M. (Freelancer)",   project: "Brand Identity Package",  priority: "NORMAL",    time: "5h ago",   status: "In Progress", assigned: "Admin Sarah", actions: ["viewproject", "openticket"]           },
  { id: "0889", title: "Technical issue",  unread: false, from: "Dev Mike (Team)",        project: "E-commerce Platform",     priority: "NORMAL",    time: "1d ago",   status: "Open",        assigned: null,         actions: ["viewproject", "openticket"]           },
  { id: "0888", title: "Account security", unread: true,  from: "ByteEats Co. (Client)",  project: "N/A",                     priority: "EMERGENCY", time: "30min ago",status: "Open",        assigned: null,         actions: ["assign", "viewproject", "openticket"] },
];

const priorityStyle = {
  HIGH:      "bg-red-100 text-red-600",
  NORMAL:    "bg-gray-100 text-gray-600",
  EMERGENCY: "bg-pink-100 text-pink-700 border border-pink-200",
};

const Support = () => {
  const [filter, setFilter] = useState("All");

  const open       = ticketsData.filter((t) => t.status === "Open").length;
  const inProgress = ticketsData.filter((t) => t.status === "In Progress").length;

  const filtered = filter === "All" ? ticketsData : ticketsData.filter((t) => t.status === filter);

  return (
    <div className="flex flex-col gap-6">

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { num: open,       label: "Open",         color: "text-amber-400"   },
          { num: inProgress, label: "In Progress",  color: "text-blue-500"    },
          { num: 847,        label: "Resolved",     color: "text-emerald-500" },
          { num: "2.1h",     label: "Avg Response", color: "text-gray-900"    },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-7 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-4xl sm:text-5xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
            <div className="text-sm text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Filter Chips */}
      <div className="flex gap-2 flex-wrap">
        {["All", "Open", "In Progress", "Resolved"].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-full border text-sm font-medium transition-all cursor-pointer
              ${filter === f
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-700 border-gray-200 hover:border-blue-400 hover:text-blue-500"
              }`}
          >
            {f}
            {f === "Open" && (
              <span className={`text-xs font-bold w-[18px] h-[18px] rounded-full flex items-center justify-center
                ${filter === f ? "bg-white text-blue-500" : "bg-amber-400 text-white"}`}>
                {open}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Ticket Cards */}
      <div className="flex flex-col gap-3">
        {filtered.map((t) => (
          <div
            key={t.id}
            className={`bg-white border border-gray-200 rounded-xl px-5 sm:px-6 py-5 shadow-sm hover:shadow-md transition-shadow
              ${t.unread ? "border-l-4 border-l-blue-500" : "border-l-4 border-l-transparent"}`}
          >
            {/* Top */}
            <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
              <div className="flex flex-col gap-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900">#{t.id}</span>
                  <span className="text-sm font-semibold text-gray-900">{t.title}</span>
                  {t.unread && (
                    <span className="text-xs font-bold bg-blue-500 text-white px-2.5 py-0.5 rounded-full">Unread</span>
                  )}
                </div>
                <div className="text-xs text-gray-500">{t.from} · Project: {t.project}</div>
              </div>
              <div className="flex items-center gap-3 shrink-0">
                <span className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg text-xs font-bold ${priorityStyle[t.priority]}`}>
                  {t.priority === "HIGH"      && <BsCircleFill className="text-[9px]" />}
                  {t.priority === "EMERGENCY" && <MdOutlineEmergency className="text-sm" />}
                  {t.priority}
                </span>
                <span className="text-xs text-gray-400 whitespace-nowrap">{t.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-2 flex-wrap">
              {t.actions.includes("assign") && (
                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-semibold rounded-lg transition-colors cursor-pointer border-none">
                  <BiMessageSquareDetail /> Assign to me
                </button>
              )}
              {t.actions.includes("viewproject") && (
                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  <FiEye /> View Project
                </button>
              )}
              {t.actions.includes("openticket") && (
                <button className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 text-xs font-semibold rounded-lg transition-colors cursor-pointer">
                  Open Ticket
                </button>
              )}
            </div>

            {/* Assigned */}
            {t.assigned && (
              <div className="mt-3 text-xs text-gray-400">Assigned to: {t.assigned}</div>
            )}
          </div>
        ))}
      </div>

    </div>
  );
};

export default Support;