import React, { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FiEye } from "react-icons/fi";
import { MdOutlineCancel } from "react-icons/md";
import { MdVerified } from "react-icons/md";
import { MdOutlineHourglassEmpty } from "react-icons/md";
import "./Users.css";

const usersData = [
  {
    id: 1,
    name: "John D.",
    email: "john@techvision.com",
    role: "CLIENT",
    trust: 75,
    status: "ACTIVE",
    projects: 2,
    disputes: 0,
    kyc: "Verified",
  },
  {
    id: 2,
    name: "Sara M.",
    email: "sara@email.com",
    role: "FREELANCER",
    trust: 88,
    status: "ACTIVE",
    projects: 5,
    disputes: 0,
    kyc: "Verified",
  },
  {
    id: 3,
    name: "TechVision Agency",
    email: "admin@techvision.io",
    role: "AGENCY",
    trust: 86,
    status: "ACTIVE",
    projects: 3,
    disputes: 0,
    kyc: "Verified",
  },
  {
    id: 4,
    name: "Dev Mike",
    email: "mike@dev.com",
    role: "FREELANCER",
    trust: 72,
    status: "ACTIVE",
    projects: 4,
    disputes: 1,
    kyc: "Verified",
  },
  {
    id: 5,
    name: "StartupX Corp",
    email: "hello@startupx.com",
    role: "CLIENT",
    trust: 45,
    status: "PENDING",
    projects: 0,
    disputes: 0,
    kyc: "Pending",
  },
  {
    id: 6,
    name: "Spam User",
    email: "spam@temp.com",
    role: "FREELANCER",
    trust: 12,
    status: "SUSPENDED",
    projects: 0,
    disputes: 3,
    kyc: "Pending",
  },
];

const roleClass = {
  CLIENT: "role-client",
  FREELANCER: "role-freelancer",
  AGENCY: "role-agency",
};

const statusClass = {
  ACTIVE: "status-active",
  PENDING: "status-pending",
  SUSPENDED: "status-suspended",
};

const getTrustColor = (trust) => {
  if (trust >= 70) return "#10b981";
  if (trust >= 40) return "#f59e0b";
  return "#ef4444";
};

const Users = () => {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = usersData.filter((u) => {
    const matchSearch =
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole =
      roleFilter === "All" || u.role === roleFilter.toUpperCase();
    return matchSearch && matchRole;
  });

  const total     = usersData.length;
  const active    = usersData.filter((u) => u.status === "ACTIVE").length;
  const pending   = usersData.filter((u) => u.kyc === "Pending").length;
  const suspended = usersData.filter((u) => u.status === "SUSPENDED").length;

  return (
    <div className="users-page">
      {/* Stat Cards */}
      <div className="users-stats">
        <div className="users-stat-card">
          <div className="users-stat-num">{total}</div>
          <div className="users-stat-label">Total Users</div>
        </div>
        <div className="users-stat-card">
          <div className="users-stat-num green">{active}</div>
          <div className="users-stat-label">Active</div>
        </div>
        <div className="users-stat-card">
          <div className="users-stat-num orange">{pending}</div>
          <div className="users-stat-label">Pending KYC</div>
        </div>
        <div className="users-stat-card">
          <div className="users-stat-num red">{suspended}</div>
          <div className="users-stat-label">Suspended</div>
        </div>
      </div>

      {/* Search + Filter */}
      <div className="users-toolbar">
        <div className="users-search-wrap">
          <FiSearch className="search-icon" />
          <input
            className="users-search"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="users-role-filters">
          {["All", "Client", "Freelancer", "Agency"].map((f) => (
            <button
              key={f}
              className={`role-filter-btn ${roleFilter === f ? "active" : ""}`}
              onClick={() => setRoleFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="users-table-wrap">
        <table className="users-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Role</th>
              <th>Trust</th>
              <th>Status</th>
              <th>Projects</th>
              <th>KYC</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((u) => (
              <tr key={u.id}>
                {/* User */}
                <td>
                  <div className="user-name-main">{u.name}</div>
                  <div className="user-email">{u.email}</div>
                </td>

                {/* Role */}
                <td>
                  <span className={`role-badge ${roleClass[u.role]}`}>
                    {u.role}
                  </span>
                </td>

                {/* Trust */}
                <td>
                  <span
                    className="trust-score"
                    style={{ color: getTrustColor(u.trust) }}
                  >
                    {u.trust}/100
                  </span>
                </td>

                {/* Status */}
                <td>
                  <span className={`status-badge ${statusClass[u.status]}`}>
                    {u.status}
                  </span>
                </td>

                {/* Projects */}
                <td>
                  <span className="projects-cell">
                    {u.projects}
                    {u.disputes > 0 && (
                      <span className="dispute-tag">
                        ({u.disputes} dispute{u.disputes > 1 ? "s" : ""})
                      </span>
                    )}
                  </span>
                </td>

                {/* KYC */}
                <td>
                  {u.kyc === "Verified" ? (
                    <span className="kyc-verified">
                      <MdVerified className="kyc-icon" /> Verified
                    </span>
                  ) : (
                    <span className="kyc-pending">
                      <MdOutlineHourglassEmpty className="kyc-icon" /> Pending
                    </span>
                  )}
                </td>

                {/* Actions */}
                <td>
                  <div className="user-actions">
                    <button className="action-view">
                      <FiEye /> View
                    </button>
                    {u.status !== "SUSPENDED" && (
                      <button className="action-suspend">
                        <MdOutlineCancel /> Suspend
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Users;