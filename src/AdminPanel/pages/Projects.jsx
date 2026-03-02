import React, { useState } from "react";
import "./Projects.css";

const projectsData = [
  { id: 1, name: "Food Delivery App", client: "John D.", freelancer: "TechVision Agency", type: "agency", amount: 42000, status: "healthy", milestone: "M2 — Core Dev (55%)", alert: null, tickets: 0, silence: null, frozen: false },
  { id: 2, name: "Brand Identity Package", client: "StartupX", freelancer: "Sara M.", type: "freelancer", amount: 3500, status: "warning", milestone: "M1 — Concepts (80%)", alert: "Silence alert: 5 days no response from freelancer", tickets: 1, silence: "5D SILENCE", frozen: false },
  { id: 3, name: "API Integration", client: "DataCo", freelancer: "Dev Mike", type: "freelancer", amount: 8000, status: "healthy", milestone: "M2 — Implementation (30%)", alert: null, tickets: 0, silence: null, frozen: false },
  { id: 4, name: "E-commerce Site", client: "FashionHub", freelancer: "CodeCraft Agency", type: "agency", amount: 28000, status: "frozen", milestone: "M1 — Design (100%)", alert: "Frozen: Active dispute over milestone scope", tickets: 2, silence: null, frozen: true },
];

const Projects = () => {
  const [projects] = useState(projectsData);
  const healthy = projects.filter((p) => p.status === "healthy").length;
  const warning = projects.filter((p) => p.status === "warning").length;
  const frozen  = projects.filter((p) => p.status === "frozen").length;

  const getStatusIcon = (status) => {
    if (status === "healthy") return <span className="proj-status-icon green">✓</span>;
    if (status === "warning") return <span className="proj-status-icon yellow">⚠</span>;
    if (status === "frozen")  return <span className="proj-status-icon blue">❄</span>;
  };

  return (
    <div>
      <div className="projects-stats">
        <div className="projects-stat-card">
          <div className="projects-stat-num">{projects.length}</div>
          <div className="projects-stat-label">Active Projects</div>
        </div>
        <div className="projects-stat-card">
          <div className="projects-stat-num green">{healthy}</div>
          <div className="projects-stat-label">Healthy</div>
        </div>
        <div className="projects-stat-card">
          <div className="projects-stat-num orange">{warning}</div>
          <div className="projects-stat-label">Needs Attention</div>
        </div>
        <div className="projects-stat-card">
          <div className="projects-stat-num blue">{frozen}</div>
          <div className="projects-stat-label">Frozen</div>
        </div>
      </div>

      {projects.map((p) => (
        <div key={p.id} className={`proj-card ${p.status}`}>
          <div className="proj-top">
            <div>
              <div className="proj-title-row">
                {getStatusIcon(p.status)}
                <h3>{p.name}</h3>
              </div>
              <div className="proj-meta">{p.client} → {p.freelancer} ({p.type})</div>
              {p.alert && <div className="proj-alert">⚠ {p.alert}</div>}
            </div>
            <div className="proj-right">
              <span className="proj-amount">${p.amount.toLocaleString()}</span>
              {p.tickets > 0 && <span className="proj-pill ticket">🎫 {p.tickets} TICKET{p.tickets > 1 ? "S" : ""}</span>}
              {p.silence  && <span className="proj-pill silence">⏰ {p.silence}</span>}
              {p.frozen   && <span className="proj-pill frozen">❄ FROZEN</span>}
            </div>
          </div>
          <div className="proj-bottom">
            <span className="proj-milestone">{p.milestone}</span>
            <div className="proj-actions">
              <button className="proj-btn">👁 Open Stream</button>
              <button className="proj-btn">💬 Post Message</button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Projects;