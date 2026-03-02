import React from "react";
import { TbActivity } from "react-icons/tb";
import { BsServer } from "react-icons/bs";
import { BsLightningCharge } from "react-icons/bs";
import { MdOutlineEmail } from "react-icons/md";
import { BsDatabase } from "react-icons/bs";
import { BsCloudArrowUp } from "react-icons/bs";
import { BsGlobe } from "react-icons/bs";
import { MdOutlineShield } from "react-icons/md";
import { MdBarChart } from "react-icons/md";
import { MdOutlineWarningAmber } from "react-icons/md";
import "./Monitoring.css";

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
  <div className="mon-page">

    {/* System Health */}
    <div className="mon-card">
      <div className="mon-card-head">
        <div className="mon-card-title">
          <TbActivity className="mon-icon green" />
          System Health
        </div>
        <span className="mon-all-ok">ALL SYSTEMS OPERATIONAL</span>
      </div>

      <div className="mon-services-grid">
        {services.map((s, i) => (
          <div key={i} className="mon-service-row">
            <div className="mon-service-left">
              <span className="mon-service-icon">{s.icon}</span>
              <span className="mon-service-name">{s.name}</span>
            </div>
            <div className="mon-service-right">
              <span className="mon-service-stat">{s.stat}</span>
              <span className="mon-dot green-dot" />
            </div>
          </div>
        ))}
      </div>
    </div>

    {/* Performance */}
    <div className="mon-card">
      <div className="mon-card-head">
        <div className="mon-card-title">
          <MdBarChart className="mon-icon blue" />
          Performance (Last 7 Days)
        </div>
      </div>
      <div className="mon-perf-grid">
        {perfMetrics.map((m, i) => (
          <div key={i} className="mon-perf-item">
            <div className="mon-perf-label">{m.label}</div>
            <div className="mon-perf-value">{m.value}</div>
            <div className={`mon-perf-trend ${m.up ? "trend-up" : "trend-dn"}`}>{m.trend}</div>
          </div>
        ))}
      </div>
    </div>

    {/* Error Log */}
    <div className="mon-card">
      <div className="mon-card-head">
        <div className="mon-card-title">
          <MdOutlineWarningAmber className="mon-icon orange" />
          Error Log (24h)
        </div>
        <span className="mon-log-summary">
          Total: 14 &nbsp;
          <span className="log-critical">Critical: 0</span> &nbsp;
          <span className="log-warnings">Warnings: 3</span>
        </span>
      </div>

      <table className="mon-log-table">
        <thead>
          <tr>
            <th>Time</th>
            <th>Level</th>
            <th>Error</th>
            <th>Affected</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {errorLogs.map((l, i) => (
            <tr key={i}>
              <td className="mon-time">{l.time}</td>
              <td>
                <span className={`mon-level ${l.level === "WARNING" ? "lvl-warning" : "lvl-info"}`}>
                  {l.level}
                </span>
              </td>
              <td className="mon-err-text">{l.error}</td>
              <td className="mon-affected">{l.affected}</td>
              <td>
                <span className={`mon-status ${l.status === "RESOLVED" ? "st-resolved" : "st-retried"}`}>
                  {l.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

  </div>
);

export default Monitoring;