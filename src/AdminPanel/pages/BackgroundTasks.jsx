import React from "react";
import { BsCheckCircle } from "react-icons/bs";
import { BsLightningCharge } from "react-icons/bs";
import { BsCircleFill } from "react-icons/bs";
import { MdOutlineWarningAmber } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import "./BackgroundTasks.css";

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
  { color: "#3b82f6", label: "After 72 hours silence", desc: "Admin escalation alert + manual options"  },
  { color: "#ef4444", label: "After 7 days silence",   desc: "System auto-closes project"               },
];

const taskLog = [
  { time: "14:32", task: "Silence Timer",    trigger: "Auto",           result: "SUCCESS", details: "3 emails sent"   },
  { time: "14:30", task: "Auto-approval",    trigger: "Milestone #1042",result: "SUCCESS", details: "$800 released"   },
  { time: "14:15", task: "Deadline Reminder",trigger: "Daily",          result: "SUCCESS", details: "12 reminders"    },
  { time: "13:45", task: "Trust Recalc",     trigger: "Score change",   result: "SUCCESS", details: "8 users updated" },
  { time: "12:00", task: "Payout Queue",     trigger: "Daily",          result: "FAILED",  details: "Bank error"      },
];

const BackgroundTasks = () => (
  <div className="bg-page">

    {/* Stats */}
    <div className="bg-stats">
      <div className="bg-stat-card">
        <div className="bg-stat-num dark">23</div>
        <div className="bg-stat-label">Pending</div>
      </div>
      <div className="bg-stat-card">
        <div className="bg-stat-num blue">3</div>
        <div className="bg-stat-label">Running Now</div>
      </div>
      <div className="bg-stat-card">
        <div className="bg-stat-num red">1</div>
        <div className="bg-stat-label">Failed (24h)</div>
      </div>
    </div>

    {/* Scheduled Tasks */}
    <div className="bg-card">
      <div className="bg-card-title">
        <BsCheckCircle className="bg-title-icon green" />
        Scheduled Tasks
      </div>
      <table className="bg-table">
        <thead>
          <tr>
            <th>Task</th>
            <th>Frequency</th>
            <th>Last Run</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {scheduledTasks.map((t, i) => (
            <tr key={i}>
              <td className="bg-task-name">{t.name}</td>
              <td className="bg-task-freq">{t.frequency}</td>
              <td className="bg-task-last">{t.lastRun}</td>
              <td>
                <span className="bg-active-status">
                  <BsCheckCircle className="bg-check-icon" /> Active
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Silence Timer Automation */}
    <div className="bg-card">
      <div className="bg-card-title">
        <BsLightningCharge className="bg-title-icon yellow" />
        Silence Timer Automation
      </div>
      <div className="silence-steps">
        {silenceSteps.map((s, i) => (
          <div key={i} className="silence-row">
            <div className="silence-dot-wrap">
              <BsCircleFill style={{ color: s.color, fontSize: "12px" }} />
            </div>
            <div>
              <div className="silence-label">{s.label}</div>
              <div className="silence-desc">{s.desc}</div>
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Recent Task Log */}
    <div className="bg-card">
      <div className="bg-card-title" style={{ marginBottom: "16px" }}>
        Recent Task Log
      </div>
      <table className="bg-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Task</th>
            <th>Trigger</th>
            <th>Result</th>
            <th>Details</th>
          </tr>
        </thead>
        <tbody>
          {taskLog.map((l, i) => (
            <tr key={i}>
              <td className="bg-task-last">{l.time}</td>
              <td className="bg-task-name">{l.task}</td>
              <td className="bg-task-freq">{l.trigger}</td>
              <td>
                <span className={`bg-result ${l.result === "SUCCESS" ? "result-success" : "result-failed"}`}>
                  {l.result}
                </span>
              </td>
              <td className="bg-task-freq">{l.details}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

export default BackgroundTasks;