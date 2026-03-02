import React, { useState } from "react";
import { FiEye } from "react-icons/fi";
import { BiMessageSquareDetail } from "react-icons/bi";
import { MdOutlineEmergency } from "react-icons/md";
import { BsCircleFill } from "react-icons/bs";
import "./Support.css";

const ticketsData = [
  {
    id: "0891",
    title: "Payment Issue",
    unread: true,
    from: "John D. (Client)",
    project: "Food Delivery App",
    priority: "HIGH",
    time: "2h ago",
    status: "Open",
    assigned: null,
    actions: ["assign", "viewproject", "openticket"],
  },
  {
    id: "0890",
    title: "Scope dispute",
    unread: false,
    from: "Sara M. (Freelancer)",
    project: "Brand Identity Package",
    priority: "NORMAL",
    time: "5h ago",
    status: "In Progress",
    assigned: "Admin Sarah",
    actions: ["viewproject", "openticket"],
  },
  {
    id: "0889",
    title: "Technical issue",
    unread: false,
    from: "Dev Mike (Team)",
    project: "E-commerce Platform",
    priority: "NORMAL",
    time: "1d ago",
    status: "Open",
    assigned: null,
    actions: ["viewproject", "openticket"],
  },
  {
    id: "0888",
    title: "Account security",
    unread: true,
    from: "ByteEats Co. (Client)",
    project: "N/A",
    priority: "EMERGENCY",
    time: "30min ago",
    status: "Open",
    assigned: null,
    actions: ["assign", "viewproject", "openticket"],
  },
];

const Support = () => {
  const [filter, setFilter] = useState("All");

  const open       = ticketsData.filter((t) => t.status === "Open").length;
  const inProgress = ticketsData.filter((t) => t.status === "In Progress").length;

  const filtered =
    filter === "All"
      ? ticketsData
      : ticketsData.filter((t) => t.status === filter);

  const getPriorityClass = (p) => {
    if (p === "HIGH")      return "priority-high";
    if (p === "EMERGENCY") return "priority-emergency";
    return "priority-normal";
  };

  const getCardClass = (t) => {
    if (t.unread) return "ticket-card unread-card";
    return "ticket-card";
  };

  return (
    <div className="support-page">

      {/* Stat Cards */}
      <div className="support-stats">
        <div className="support-stat-card">
          <div className="support-stat-num orange">{open}</div>
          <div className="support-stat-label">Open</div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-num blue">{inProgress}</div>
          <div className="support-stat-label">In Progress</div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-num green">847</div>
          <div className="support-stat-label">Resolved</div>
        </div>
        <div className="support-stat-card">
          <div className="support-stat-num dark">2.1h</div>
          <div className="support-stat-label">Avg Response</div>
        </div>
      </div>

      {/* Filter Chips */}
      <div className="support-chips">
        {["All", "Open", "In Progress", "Resolved"].map((f) => (
          <button
            key={f}
            className={`support-chip ${filter === f ? "active" : ""}`}
            onClick={() => setFilter(f)}
          >
            {f}
            {f === "Open" && (
              <span className="chip-badge">{open}</span>
            )}
          </button>
        ))}
      </div>

      {/* Ticket Cards */}
      <div className="tickets-list">
        {filtered.map((t) => (
          <div key={t.id} className={getCardClass(t)}>
            <div className="ticket-top">
              {/* Left: title + meta */}
              <div className="ticket-left">
                <div className="ticket-title-row">
                  <span className="ticket-id">#{t.id}</span>
                  <span className="ticket-title">{t.title}</span>
                  {t.unread && <span className="unread-badge">Unread</span>}
                </div>
                <div className="ticket-meta">
                  {t.from} · Project: {t.project}
                </div>
              </div>

              {/* Right: priority + time */}
              <div className="ticket-right">
                <span className={`priority-badge ${getPriorityClass(t.priority)}`}>
                  {t.priority === "HIGH" && <BsCircleFill className="priority-dot" />}
                  {t.priority === "EMERGENCY" && <MdOutlineEmergency className="priority-dot" />}
                  {t.priority}
                </span>
                <span className="ticket-time">{t.time}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="ticket-actions">
              {t.actions.includes("assign") && (
                <button className="ticket-btn assign-btn">
                  <BiMessageSquareDetail /> Assign to me
                </button>
              )}
              {t.actions.includes("viewproject") && (
                <button className="ticket-btn secondary-btn">
                  <FiEye /> View Project
                </button>
              )}
              {t.actions.includes("openticket") && (
                <button className="ticket-btn secondary-btn">
                  Open Ticket
                </button>
              )}
            </div>

            {/* Assigned to */}
            {t.assigned && (
              <div className="ticket-assigned">
                Assigned to: {t.assigned}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Support;