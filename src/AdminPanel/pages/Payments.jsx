import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";
import "./Payments.css";

const escrowData = [
  {
    id: 1,
    project: "Food Delivery App",
    client: "John D.",
    provider: "TechVision Agency",
    total: 42000,
    released: 8400,
    held: 33600,
    status: "ACTIVE",
  },
  {
    id: 2,
    project: "Brand Identity",
    client: "StartupX",
    provider: "Sara M.",
    total: 3500,
    released: 0,
    held: 3500,
    status: "DISPUTED",
  },
  {
    id: 3,
    project: "API Integration",
    client: "DataCo",
    provider: "Dev Mike",
    total: 8000,
    released: 4000,
    held: 4000,
    status: "ACTIVE",
  },
  {
    id: 4,
    project: "E-commerce Site",
    client: "FashionHub",
    provider: "CodeCraft",
    total: 28000,
    released: 0,
    held: 28000,
    status: "DISPUTED",
  },
];

const fmt = (n) => `$${n.toLocaleString()}`;

const Payments = () => {
  const totalVolume = escrowData.reduce((s, e) => s + e.total, 0);
  const inEscrow    = escrowData.reduce((s, e) => s + e.held, 0);
  const released    = escrowData.reduce((s, e) => s + e.released, 0);
  const disputed    = escrowData.filter((e) => e.status === "DISPUTED").reduce((s, e) => s + e.held, 0);

  return (
    <div className="payments-page">

      {/* Stat Cards */}
      <div className="pay-stats">
        <div className="pay-stat-card">
          <div className="pay-stat-num dark">{fmt(totalVolume)}</div>
          <div className="pay-stat-label">Total Platform Volume</div>
        </div>
        <div className="pay-stat-card">
          <div className="pay-stat-num orange">{fmt(inEscrow)}</div>
          <div className="pay-stat-label">In Escrow</div>
        </div>
        <div className="pay-stat-card">
          <div className="pay-stat-num green">{fmt(released)}</div>
          <div className="pay-stat-label">Released</div>
        </div>
        <div className="pay-stat-card">
          <div className="pay-stat-num red">{fmt(disputed)}</div>
          <div className="pay-stat-label">Disputed</div>
        </div>
      </div>

      {/* Escrow Table */}
      <div className="escrow-box">
        <div className="escrow-header">
          <BsCurrencyDollar className="escrow-icon" />
          <span className="escrow-title">Escrow Accounts</span>
        </div>

        <table className="pay-table">
          <thead>
            <tr>
              <th>Project</th>
              <th>Client → Provider</th>
              <th>Total</th>
              <th>Released</th>
              <th>Held</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {escrowData.map((e) => (
              <tr key={e.id}>
                <td className="pay-project">{e.project}</td>
                <td className="pay-route">{e.client} → {e.provider}</td>
                <td className="pay-total">{fmt(e.total)}</td>
                <td className="pay-released">{fmt(e.released)}</td>
                <td className="pay-held">{fmt(e.held)}</td>
                <td>
                  <span className={`pay-status ${e.status === "ACTIVE" ? "status-active" : "status-disputed"}`}>
                    {e.status}
                  </span>
                </td>
                <td>
                  <div className="pay-actions">
                    <button className="pay-btn view-btn">View</button>
                    {e.status === "DISPUTED" && (
                      <button className="pay-btn resolve-btn">Resolve</button>
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

export default Payments;