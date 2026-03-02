// AdminPanel.jsx
import React, { useState } from 'react';

import Projects from './pages/Projects';
import Users from './pages/Users';
import Support from './pages/Support';
import Payments from './pages/Payments';
import Monitoring from './pages/Monitoring';
import BackgroundTasks from './pages/BackgroundTasks';
import Security from './pages/Security';
import LegalPages from './pages/LegalPages';

const tabs = [
  { id: 'projects', label: 'Projects', icon: '▦' },
  { id: 'users', label: 'Users', icon: '👤' },
  { id: 'support', label: 'Support', icon: '💬', badge: 2 },
  { id: 'payments', label: 'Payments', icon: '$' },
  { id: 'monitoring', label: 'Monitoring', icon: '📊' },
  { id: 'background', label: 'Background Tasks', icon: '⚙' },
  { id: 'security', label: 'Security', icon: '🔒' },
  { id: 'legal', label: 'Legal Pages', icon: '📄' },
];

const AdminPanel = ({ onHome }) => {
  const [activeTab, setActiveTab] = useState('projects');

  const renderPage = () => {
    switch (activeTab) {
      case 'projects':
        return <Projects />;
      case 'users':
        return <Users />;
      case 'support':
        return <Support />;
      case 'payments':
        return <Payments />;
      case 'monitoring':
        return <Monitoring />;
      case 'background':
        return <BackgroundTasks />;
      case 'security':
        return <Security />;
      case 'legal':
        return <LegalPages />;
      default:
        return <Projects />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      {/* Top Navbar */}
      <nav className="flex items-center justify-between px-8 sm:px-10 py-4 bg-white border-b border-gray-200">
        <div className="text-xl font-bold text-red-500">Admin Panel</div>

        <div className="flex items-center gap-4">
          <span className="px-3 py-1 text-xs font-bold tracking-wide text-red-600 bg-red-50 rounded-full uppercase">
            ADMIN
          </span>
          <button
            onClick={onHome}
            className="text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors"
          >
            Home
          </button>
        </div>
      </nav>

      {/* Header */}
      <header className="px-8 sm:px-10 pt-9 pb-2">
        <h1 className="text-3xl font-bold text-gray-900">System Administration</h1>
        <p className="mt-2 text-gray-600">
          Monitor projects, manage users, handle support, and configure security
        </p>
      </header>

      {/* Tabs */}
      <div className="px-8 sm:px-10 border-b border-gray-200">
        <div className="flex gap-1 overflow-x-auto pb-1 -mb-px">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`
                flex items-center gap-2 px-5 py-3 text-sm font-medium whitespace-nowrap
                border-b-2 transition-colors
                ${
                  activeTab === tab.id
                    ? 'border-gray-900 text-gray-900 font-semibold'
                    : 'border-transparent text-gray-500 hover:text-gray-800 hover:border-gray-300'
                }
              `}
            >
              <span>{tab.icon}</span>
              {tab.label}
              {tab.badge !== undefined && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-500 rounded-full">
                  {tab.badge}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <main className="px-8 sm:px-10 py-8 pb-16">{renderPage()}</main>
    </div>
  );
};

export default AdminPanel;