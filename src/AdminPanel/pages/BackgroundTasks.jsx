// BackgroundTasks.jsx
import React from "react";
import { BsCheckCircle, BsLightningCharge, BsCircleFill } from "react-icons/bs";

const scheduledTasks = [
  { name: "Silence timer check",       frequency: "Every 5 min",  lastRun: "2 min ago",  status: "Active" },
  { name: "Deadline reminders",        frequency: "Daily 8am",    lastRun: "Yesterday",  status: "Active" },
  { name: "Auto-approval trigger",     frequency: "Every 30 min", lastRun: "28 min ago", status: "Active" },
  { name: "Payout queue processor",    frequency: "Daily 6am",    lastRun: "Today 6am",  status: "Active" },
  { name: "Trust score recalculator",  frequency: "Daily 2am",    lastRun: "Today 2am",  status: "Active" },
  { name: "Inactive account reminder", frequency: "Weekly",       lastRun: "3 days ago", status: "Active" },
  { name: "Report generator",          frequency: "Monthly",      lastRun: "Jan 31",     status: "Active" },
  { name: "Backup trigger",            frequency: "Daily 3am",    lastRun: "Today",      status: "Active" },
];

const silenceSteps = [
  { color: "#10b981", label: "After 24 hours silence", desc: "Send reminder email + in-app notification" },
  { color: "#f59e0b", label: "After 48 hours silence", desc: "Send urgent reminder + admin notification" },
  { color: "#3b82f6", label: "After 72 hours silence", desc: "Admin escalation alert + manual options"   },
  { color: "#ef4444", label: "After 7 days silence",   desc: "System auto-closes project"                },
];

const taskLog = [
  { time: "14:32", task: "Silence Timer",     trigger: "Auto",            result: "SUCCESS", details: "3 emails sent"   },
  { time: "14:30", task: "Auto-approval",     trigger: "Milestone #1042", result: "SUCCESS", details: "$800 released"   },
  { time: "14:15", task: "Deadline Reminder", trigger: "Daily",           result: "SUCCESS", details: "12 reminders"    },
  { time: "13:45", task: "Trust Recalc",      trigger: "Score change",    result: "SUCCESS", details: "8 users updated" },
  { time: "12:00", task: "Payout Queue",      trigger: "Daily",           result: "FAILED",  details: "Bank error"      },
];

const BackgroundTasks = () => (
  <div className="flex flex-col gap-5">

    {/* Stats */}
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {[
        { num: "23", label: "Pending",     color: "text-gray-900" },
        { num: "3",  label: "Running Now", color: "text-blue-500" },
        { num: "1",  label: "Failed (24h)", color: "text-red-500" },
      ].map((s) => (
        <div
          key={s.label}
          className="bg-white border border-gray-200 rounded-2xl px-5 py-7 text-center shadow-sm hover:shadow-md transition-shadow"
        >
          <div className={`text-5xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
          <div className="text-sm text-gray-500 font-medium">{s.label}</div>
        </div>
      ))}
    </div>

    {/* Scheduled Tasks */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <BsCheckCircle className="text-emerald-500 text-lg" />
        Scheduled Tasks
      </div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Task", "Frequency", "Last Run", "Status"].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {scheduledTasks.map((t, i) => (
              <tr key={i} className="hover:bg-gray-50 group">
                <td className="px-3.5 py-4 text-sm font-semibold text-gray-900 border-b border-gray-100 last:border-0">{t.name}</td>
                <td className="px-3.5 py-4 text-xs text-gray-500 border-b border-gray-100">{t.frequency}</td>
                <td className="px-3.5 py-4 text-xs text-gray-500 font-mono border-b border-gray-100">{t.lastRun}</td>
                <td className="px-3.5 py-4 border-b border-gray-100">
                  <span className="inline-flex items-center gap-1.5 text-emerald-500 text-xs font-semibold">
                    <BsCheckCircle className="text-xs" /> Active
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

    {/* Silence Timer Automation */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="flex items-center gap-2.5 text-base font-bold text-gray-900 mb-5">
        <BsLightningCharge className="text-amber-400 text-lg" />
        Silence Timer Automation
      </div>
      <div className="flex flex-col">
        {silenceSteps.map((s, i) => (
          <div
            key={i}
            className={`flex items-start gap-3.5 py-3.5 ${i !== silenceSteps.length - 1 ? "border-b border-gray-50" : ""}`}
          >
            <div className="mt-0.5 shrink-0">
              <BsCircleFill style={{ color: s.color, fontSize: "12px" }} />
            </div>
            <div>
              <div className="text-sm font-semibold text-gray-900 mb-0.5">{s.label}</div>
              <div className="text-xs text-gray-400">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Task Log */}
    <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
      <div className="text-base font-bold text-gray-900 mb-4">Recent Task Log</div>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr>
              {["Time", "Task", "Trigger", "Result", "Details"].map((h) => (
                <th key={h} className="px-3.5 py-2.5 text-left text-xs text-gray-400 font-medium border-b border-gray-100">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {taskLog.map((l, i) => (
              <tr key={i} className="hover:bg-gray-50">
                <td className="px-3.5 py-4 text-xs text-gray-500 font-mono border-b border-gray-100 last:border-0">{l.time}</td>
                <td className="px-3.5 py-4 text-sm font-semibold text-gray-900 border-b border-gray-100">{l.task}</td>
                <td className="px-3.5 py-4 text-xs text-gray-500 border-b border-gray-100">{l.trigger}</td>
                <td className="px-3.5 py-4 border-b border-gray-100">
                  <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold
                    ${l.result === "SUCCESS" ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
                    {l.result}
                  </span>
                </td>
                <td className="px-3.5 py-4 text-xs text-gray-500 border-b border-gray-100">{l.details}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  </div>
);

export default BackgroundTasks;
