import React, { useState } from "react";
import "./AdminPanel.css";
import Projects from "./pages/Projects";
import Users from "./pages/Users";
import Support from "./pages/Support";
import Payments from "./pages/Payments";
import Monitoring from "./pages/Monitoring";
import BackgroundTasks from "./pages/BackgroundTasks";
import Security from "./pages/Security";
import LegalPages from "./pages/LegalPages";

const tabs = [
  { id: "projects", label: "Projects", icon: "▦" },
  { id: "users", label: "Users", icon: "👤" },
  { id: "support", label: "Support", icon: "💬", badge: 2 },
  { id: "payments", label: "Payments", icon: "$" },
  { id: "monitoring", label: "Monitoring", icon: "📊" },
  { id: "background", label: "Background Tasks", icon: "⚙" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "legal", label: "Legal Pages", icon: "📄" },
];

const AdminPanel = ({ onHome }) => {
  const [activeTab, setActiveTab] = useState("projects");

  const renderPage = () => {
    switch (activeTab) {
      case "projects": return <Projects />;
      case "users": return <Users />;
      case "support": return <Support />;
      case "payments": return <Payments />;
      case "monitoring": return <Monitoring />;
      case "background": return <BackgroundTasks />;
      case "security": return <Security />;
      case "legal": return <LegalPages />;
      default: return <Projects />;
    }
  };

  return (
    <div className="admin-wrapper">
      {/* Top Nav */}
      <div className="admin-topnav">
        <span className="admin-brand">Admin Panel</span>
        <div className="admin-topnav-right">
          <span className="admin-badge-pill">ADMIN</span>
          <span className="admin-home-link" onClick={onHome}>Home</span>
        </div>
      </div>

      {/* Header */}
      <div className="admin-header">
        <h1>System Administration</h1>
        <p>Monitor projects, manage users, handle support, and configure security</p>
      </div>

      {/* Tab Bar */}
      <div className="admin-tabs">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className={`admin-tab ${activeTab === tab.id ? "active" : ""}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.label}
            {tab.badge && <span className="tab-badge">{tab.badge}</span>}
          </button>
        ))}
      </div>

      {/* Page Content */}
      <div className="admin-content">
        {renderPage()}
      </div>
    </div>
  );
};

export default AdminPanel;