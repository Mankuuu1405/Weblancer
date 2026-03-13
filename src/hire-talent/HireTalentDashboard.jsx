import React, { useState } from 'react';
import {
  MessageSquare,
  FileText,
  Phone,
  Star,
  DollarSign,
  CheckCircle,
  AlertCircle,
  Calendar,
  Bell,
  Settings,
  ArrowRight,
  MoreVertical,
  ChevronDown,
  Plus,
} from 'lucide-react';

const HireTalentDashboard = () => {
  const [projects] = useState([
    {
      id: 1,
      title: 'Food Delivery Mobile App',
      status: 'Active',
      client: 'TechVision Agency',
      rating: 4.9,
      milestone: 'Design & Planning',
      progress: 40,
      daysAhead: 3,
      budget: 42000,
      spent: 8400,
      timeline: 90,
      communication: 90,
      quality: 100,
    },
  ]);

  const [activeTab, setActiveTab] = useState('overview');
  const [expandedMilestone, setExpandedMilestone] = useState(0);
  const [showAIBreakdown, setShowAIBreakdown] = useState(false);
  const [aiOverviewTab, setAIOverviewTab] = useState('overview');

  const milestones = [
    {
      id: 1,
      number: 1,
      title: 'Design & Planning',
      dueDate: 'Mar 11, 2026',
      amount: '$8,400',
      status: 'In Review',
      statusColor: 'yellow',
      deliverable: 'Deliverables ready for review',
    },
    {
      id: 2,
      number: 2,
      title: 'Core Development',
      dueDate: 'May 20, 2026',
      amount: '$21,000',
      status: 'Pending',
      statusColor: 'gray',
    },
    {
      id: 3,
      number: 3,
      title: 'Advanced Features',
      dueDate: 'Jul 1, 2026',
      amount: '$8,820',
      status: 'Pending',
      statusColor: 'gray',
    },
    {
      id: 4,
      number: 4,
      title: 'Testing & Launch',
      dueDate: 'Jul 25, 2026',
      amount: '$3,780',
      status: 'Pending',
      statusColor: 'gray',
    },
  ];

  const stats = [
    { label: 'Active Projects', value: '1', icon: CheckCircle, color: 'blue' },
    { label: 'In Escrow', value: '$42,000', icon: DollarSign, color: 'green' },
    { label: 'Messages', value: '3', icon: MessageSquare, color: 'purple' },
    { label: 'Trust Score', value: '75/100', icon: Star, color: 'yellow' },
  ];

  const upcomingDeadlines = [
    { title: 'Review wireframes', date: 'Feb 14', highlight: true },
    { title: 'Weekly check-in call', date: 'Feb 16', highlight: false },
    { title: 'Milestone 1 delivery', date: 'Mar 11', highlight: false },
  ];

  const insights = [
    { text: 'Your project is performing excellently', status: 'success' },
    { text: 'TechVision Agency is highly responsive', status: 'success' },
    { text: 'Timeline buffer exists for flexibility', status: 'success' },
    { text: 'Consider scheduling next milestone review early', status: 'warning' },
  ];

  const quickActions = [
    { title: 'Review Deliverables', icon: CheckCircle },
    { title: 'Message Team', icon: MessageSquare },
    { title: 'View Contract', icon: FileText },
    { title: 'Get Help', icon: AlertCircle },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-600',
      green: 'bg-green-100 text-green-600',
      purple: 'bg-purple-100 text-purple-600',
      yellow: 'bg-yellow-100 text-yellow-600',
    };
    return colors[color];
  };

  const getStatusBadgeColor = (status) => {
    switch (status) {
      case 'In Review':
        return 'bg-yellow-100 text-yellow-700';
      case 'Pending':
        return 'bg-gray-100 text-gray-600';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl sm:text-3xl font-bold text-blue-600">ArcLancer</h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition hidden sm:block">
                <Bell size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <button className="p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition hidden sm:block">
                <Settings size={20} />
              </button>
              <span className="text-sm font-medium text-gray-700 hidden sm:inline">Client</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-lg p-5 sm:p-6 shadow-sm border border-gray-200">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-gray-600 text-sm font-medium">{stat.label}</p>
                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${getColorClasses(stat.color)}`}>
                    <Icon size={24} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content - 2/3 width */}
          <div className="lg:col-span-2 space-y-6">
            {/* Project Card with Tabs */}
            {projects.map((project) => (
              <div key={project.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                {/* Project Header */}
                <div className="p-5 sm:p-6 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <h2 className="text-lg sm:text-xl font-bold text-gray-900">{project.title}</h2>
                        <span className="inline-block bg-green-100 text-green-700 text-xs font-semibold px-3 py-1 rounded-full">
                          {project.status}
                        </span>
                      </div>
                      <p className="text-gray-600 text-sm">{project.client} • ⭐ {project.rating}</p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
                      <button className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium text-sm border border-gray-300 hover:bg-gray-50 rounded transition">
                        <MessageSquare size={16} />
                        Message
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium text-sm border border-gray-300 hover:bg-gray-50 rounded transition">
                        <FileText size={16} />
                        Files
                      </button>
                      <button className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium text-sm border border-gray-300 hover:bg-gray-50 rounded transition">
                        <Phone size={16} />
                        Call
                      </button>
                    </div>
                  </div>

                  {/* Milestone Progress */}
                  <div className="mb-4">
                    <p className="text-gray-900 font-semibold text-sm mb-2">
                      Current: Milestone 1 — {project.milestone}
                    </p>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div
                        className="bg-blue-500 h-2.5 rounded-full transition-all duration-300"
                        style={{ width: `${project.progress}%` }}
                      ></div>
                    </div>
                    <p className="text-blue-600 text-xs font-medium mt-2">
                      ✓ {project.daysAhead} days ahead of schedule
                    </p>
                  </div>

                  {/* Budget Info */}
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 text-sm">
                      ${project.spent.toLocaleString()} of ${project.budget.toLocaleString()} in progress
                    </p>
                    <span className="text-gray-900 font-semibold text-sm">{project.progress}% overall</span>
                  </div>
                </div>

                {/* Tabs */}
                <div className="px-5 sm:px-6 border-b border-gray-200 flex gap-8 overflow-x-auto">
                  {['Overview', 'Milestones', 'Files', 'Payments', 'AI Builder', 'Talent'].map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab.toLowerCase())}
                      className={`py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                        activeTab === tab.toLowerCase()
                          ? 'border-blue-600 text-blue-600'
                          : 'border-transparent text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                {activeTab === 'overview' && (
                  <div className="p-5 sm:p-6">
                    <p className="text-gray-600 text-sm">Project overview content</p>
                  </div>
                )}

                {activeTab === 'milestones' && (
                  <div className="p-5 sm:p-6 space-y-4">
                    {milestones.map((milestone, idx) => (
                      <div key={milestone.id} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          onClick={() => setExpandedMilestone(expandedMilestone === idx ? -1 : idx)}
                          className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition flex items-center justify-between"
                        >
                          <div className="flex items-center gap-4 flex-1 text-left">
                            <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 font-semibold flex items-center justify-center text-sm">
                              {milestone.number}
                            </div>
                            <div className="flex-1">
                              <p className="font-semibold text-gray-900">{milestone.title}</p>
                              <p className="text-sm text-gray-600">Due: {milestone.dueDate}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="font-semibold text-gray-900">{milestone.amount}</p>
                              <span className={`text-xs font-semibold px-2 py-1 rounded ${getStatusBadgeColor(milestone.status)}`}>
                                {milestone.status}
                              </span>
                            </div>
                            <ChevronDown
                              size={20}
                              className={`text-gray-400 transition ${expandedMilestone === idx ? 'rotate-180' : ''}`}
                            />
                          </div>
                        </button>

                        {expandedMilestone === idx && milestone.deliverable && (
                          <div className="p-4 bg-yellow-50 border-t border-gray-200">
                            <p className="text-sm text-gray-700 mb-4">{milestone.deliverable}</p>
                            <div className="flex gap-3">
                              <button className="px-3 py-1.5 bg-blue-600 text-white font-medium text-sm rounded hover:bg-blue-700 transition">
                                Review Now
                              </button>
                              <button className="px-3 py-1.5 bg-white border border-gray-300 text-gray-700 font-medium text-sm rounded hover:bg-gray-50 transition">
                                View Files
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'files' && (
                  <div className="p-5 sm:p-6 space-y-4">
                    {[
                      {
                        name: 'Wireframes_v1.pdf',
                        size: '2.4 MB',
                        time: '2 hours ago',
                        status: 'In Review',
                        statusColor: 'bg-yellow-100 text-yellow-700',
                      },
                      {
                        name: 'Requirements_Doc.docx',
                        size: '1.1 MB',
                        time: '3 days ago',
                        status: 'Approved',
                        statusColor: 'bg-green-100 text-green-700',
                      },
                      {
                        name: 'Design_System.fig',
                        size: '8.2 MB',
                        time: '1 hour ago',
                        status: 'New',
                        statusColor: 'bg-blue-100 text-blue-700',
                      },
                    ].map((file, idx) => (
                      <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                        <div className="flex items-center gap-4 flex-1">
                          <FileText className="text-gray-400 flex-shrink-0" size={24} />
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">{file.size} • {file.time}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className={`text-xs font-semibold px-3 py-1 rounded ${file.statusColor}`}>
                            {file.status}
                          </span>
                          <button className="px-4 py-2 text-blue-600 font-medium text-sm hover:bg-blue-50 rounded-lg transition">
                            Download
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === 'payments' && (
                  <div className="p-5 sm:p-6 space-y-6">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-4">Escrow Overview</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-600 text-sm font-medium mb-2">Funded</p>
                          <p className="text-2xl font-bold text-gray-900">$42,000</p>
                        </div>
                        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                          <p className="text-gray-600 text-sm font-medium mb-2">Released</p>
                          <p className="text-2xl font-bold text-gray-900">$0</p>
                        </div>
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <p className="text-green-700 text-sm font-medium mb-2">Remaining</p>
                          <p className="text-2xl font-bold text-green-700">$42,000</p>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div className="space-y-3">
                        {[
                          { title: 'Design & Planning', amount: '$8,400', status: 'In Review', color: 'yellow' },
                          { title: 'Core Development', amount: '$21,000', status: 'Pending', color: 'gray' },
                          { title: 'Advanced Features', amount: '$8,820', status: 'Pending', color: 'gray' },
                          { title: 'Testing & Launch', amount: '$3,780', status: 'Pending', color: 'gray' },
                        ].map((milestone, idx) => (
                          <div key={idx} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">M{idx + 1} — {milestone.title}</p>
                            </div>
                            <div className="flex items-center gap-4">
                              <span className="font-semibold text-gray-900">{milestone.amount}</span>
                              <span className={`text-xs font-semibold px-3 py-1 rounded ${
                                milestone.color === 'yellow' 
                                  ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-gray-100 text-gray-600'
                              }`}>
                                {milestone.status}
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'ai builder' && !showAIBreakdown && (
                  <div className="p-5 sm:p-6 space-y-6">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">✨</span>
                        <h3 className="text-xl font-bold text-gray-900">What do you want to build?</h3>
                      </div>
                      <p className="text-gray-600 text-sm mb-4">Describe your project in plain English</p>
                      <textarea
                        className="w-full p-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                        rows="5"
                        placeholder="e.g., I want a food delivery app..."
                        defaultValue="e.g., I want a food delivery app for my city. Users should be able to order from local restaurants, track their delivery in real time, and pay securely..."
                      ></textarea>
                      <div className="flex gap-3 mt-4">
                        <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm">
                          🎤 Speak instead
                        </button>
                        <button className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition text-sm">
                          📎 Upload brief/document
                        </button>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-5">
                      <p className="font-semibold text-gray-900 mb-3">Examples to inspire you:</p>
                      <div className="space-y-2 mb-4">
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm">"E-commerce site for handmade jewelry"</p>
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm">"HR management system for my 50-person company"</p>
                        <p className="text-blue-600 hover:underline cursor-pointer text-sm">"AI chatbot for my customer support team"</p>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>No technical knowledge required</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <CheckCircle size={16} className="text-green-500" />
                          <span>AI will translate your idea</span>
                        </div>
                      </div>
                      <button 
                        onClick={() => setShowAIBreakdown(true)}
                        className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                      >
                        <ArrowRight size={18} />
                        Analyze My Project
                      </button>
                    </div>
                  </div>
                )}

                {activeTab === 'ai builder' && showAIBreakdown && (
                  <div className="p-5 sm:p-6 space-y-6">
                    <div className="flex items-center justify-between">
                      <h2 className="text-2xl font-bold text-gray-900">AI Project Breakdown</h2>
                      <button 
                        onClick={() => setShowAIBreakdown(false)}
                        className="text-blue-600 font-medium hover:text-blue-700"
                      >
                        ← Edit Description
                      </button>
                    </div>

                    <div className="border-b border-gray-200 flex gap-8 overflow-x-auto">
                      {['Overview', 'Scope & Budget', 'Milestones', 'Talent Match', 'Validation'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setAIOverviewTab(tab.toLowerCase())}
                          className={`py-4 font-medium text-sm border-b-2 transition whitespace-nowrap ${
                            aiOverviewTab === tab.toLowerCase()
                              ? 'border-blue-600 text-blue-600'
                              : 'border-transparent text-gray-600 hover:text-gray-900'
                          }`}
                        >
                          {tab}
                          {tab === 'Validation' && <span className="ml-2 text-yellow-500">⚠️</span>}
                        </button>
                      ))}
                    </div>

                    {/* Overview Tab */}
                    {aiOverviewTab === 'overview' && (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-3">
                            <h3 className="text-base font-bold text-gray-900">AI-Generated Project Brief</h3>
                            <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2 py-0.5 rounded">
                              AI GENERATED
                            </span>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-gray-600 text-xs font-medium mb-1">Project Name:</p>
                              <p className="text-gray-900 font-semibold text-sm">Food Delivery Platform</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-gray-600 text-xs font-medium mb-1">Type:</p>
                              <p className="text-gray-900 font-semibold text-sm">Mobile App + Web Admin</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-gray-600 text-xs font-medium mb-1">Industry:</p>
                              <p className="text-gray-900 font-semibold text-sm">Food & Restaurant Tech</p>
                            </div>
                            <div className="bg-gray-50 p-3 rounded">
                              <p className="text-gray-600 text-xs font-medium mb-1">Complexity:</p>
                              <p className="text-gray-900 font-semibold text-sm">Medium-High ●●●●○</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-3">Core Features (must-have)</h3>
                          <div className="space-y-2">
                            {[
                              'User registration & login (social + email)',
                              'Restaurant browse & search with filters',
                              'Menu display with photos & pricing',
                              'Shopping cart & order placement',
                              'Real-time order tracking (GPS)',
                              'Payment gateway integration',
                              'Push notifications (order updates)',
                              'Restaurant admin panel (order management)',
                            ].map((feature, idx) => (
                              <label key={idx} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600" />
                                <span className="text-gray-900 text-sm">{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h3 className="text-base font-bold text-gray-900 mb-3">Optional Features (nice-to-have)</h3>
                          <div className="space-y-2">
                            {[
                              'In-app chat (customer ↔ restaurant)',
                              'Ratings & reviews system',
                              'Promo codes & loyalty rewards',
                              'Analytics dashboard for restaurants',
                            ].map((feature, idx) => (
                              <label key={idx} className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer">
                                <input type="checkbox" className="w-4 h-4 accent-blue-600" />
                                <span className="text-gray-700 text-sm">{feature}</span>
                              </label>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-3 pt-4 border-t border-gray-200">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            <Plus size={16} />
                            Add Feature
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            <FileText size={16} />
                            Edit Features
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Scope & Budget Tab */}
                    {aiOverviewTab === 'scope & budget' && (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <Calendar className="text-gray-600" size={20} />
                            <h3 className="text-lg font-bold text-gray-900">Timeline Estimate</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700">Discovery & Planning</p>
                              <p className="text-gray-900 font-semibold">2–3 weeks</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700">UI/UX Design</p>
                              <p className="text-gray-900 font-semibold">4–6 weeks</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700">Development</p>
                              <p className="text-gray-900 font-semibold">12–16 weeks</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700">Testing & Launch</p>
                              <p className="text-gray-900 font-semibold">2–4 weeks</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-white rounded-lg border-2 border-blue-200">
                              <p className="font-bold text-gray-900">Total</p>
                              <p className="text-blue-600 font-bold">20–29 weeks (5–7 months)</p>
                            </div>
                          </div>
                        </div>

                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <DollarSign className="text-gray-600" size={20} />
                            <h3 className="text-lg font-bold text-gray-900">Budget Range</h3>
                          </div>
                          <div className="space-y-3">
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700 font-medium">Conservative</p>
                              <p className="text-gray-900 font-semibold">$18,000 – $28,000</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border-2 border-blue-300">
                              <p className="text-gray-900 font-medium">Realistic</p>
                              <p className="text-blue-600 font-bold">$28,000 – $45,000</p>
                            </div>
                            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-200">
                              <p className="text-gray-700 font-medium">Comfortable</p>
                              <p className="text-gray-900 font-semibold">$45,000 – $65,000</p>
                            </div>
                          </div>

                          <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="font-semibold text-gray-900 mb-3">Breakdown:</p>
                            <div className="space-y-2">
                              <div className="flex items-center justify-between">
                                <p className="text-gray-700">Design (20%)</p>
                                <p className="text-gray-900 font-semibold">$5,600 – $13,000</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-gray-700">Development (60%)</p>
                                <p className="text-gray-900 font-semibold">$16,800 – $39,000</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-gray-700">Testing/QA (10%)</p>
                                <p className="text-gray-900 font-semibold">$2,800 – $6,500</p>
                              </div>
                              <div className="flex items-center justify-between">
                                <p className="text-gray-700">Project Management</p>
                                <p className="text-gray-900 font-semibold">$2,800 – $6,500</p>
                              </div>
                            </div>
                          </div>

                          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                            <p className="text-gray-700">
                              <span className="font-semibold">Complexity & Risk Score:</span>
                              <span className="font-bold text-gray-900 ml-2">Medium (6.5/10)</span>
                            </p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Milestones Tab */}
                    {aiOverviewTab === 'milestones' && (
                      <div className="space-y-6">
                        <h3 className="text-xl font-bold text-gray-900">AI-Generated Milestone Plan</h3>
                        
                        <div className="space-y-6">
                          {[
                            {
                              number: 1,
                              title: 'Discovery & Design',
                              amount: '$8,400',
                              percent: '20%',
                              weeks: '3 weeks',
                              deliverables: ['Complete wireframes', 'High-fidelity UI designs', 'Technical architecture document', 'API design specification'],
                            },
                            {
                              number: 2,
                              title: 'Core Development',
                              amount: '$21,000',
                              percent: '50%',
                              weeks: '12 weeks',
                              deliverables: ['User app (iOS + Android)', 'Restaurant admin panel (web)', 'Payment integration', 'Core backend APIs'],
                            },
                            {
                              number: 3,
                              title: 'Advanced Features',
                              amount: '$8,820',
                              percent: '21%',
                              weeks: '6 weeks',
                              deliverables: ['Real-time tracking', 'Push notifications', 'Performance optimization'],
                            },
                            {
                              number: 4,
                              title: 'Testing & Launch',
                              amount: '$3,780',
                              percent: '9%',
                              weeks: '2 weeks',
                              deliverables: ['Full QA testing report', 'App store submission', 'Production deployment'],
                            },
                          ].map((milestone) => (
                            <div key={milestone.number} className="border-l-4 border-blue-500 pl-4">
                              <div className="flex items-start justify-between mb-3">
                                <div>
                                  <div className="flex items-center gap-2 mb-1">
                                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded text-sm font-bold">M{milestone.number}</span>
                                    <h4 className="text-lg font-bold text-gray-900">{milestone.title}</h4>
                                  </div>
                                </div>
                                <div className="text-right">
                                  <p className="font-bold text-gray-900">{milestone.amount} <span className="text-gray-600 font-normal">({milestone.percent})</span></p>
                                  <p className="text-sm text-gray-600">{milestone.weeks}</p>
                                </div>
                              </div>
                              <div className="mt-3">
                                <p className="text-gray-700 font-medium text-sm mb-2">Deliverables:</p>
                                <ul className="space-y-1">
                                  {milestone.deliverables.map((item, idx) => (
                                    <li key={idx} className="flex items-center gap-2 text-gray-700 text-sm">
                                      <CheckCircle size={16} className="text-teal-500 flex-shrink-0" />
                                      {item}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            </div>
                          ))}
                        </div>

                        <div className="flex gap-3 pt-6 border-t border-gray-200">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            <FileText size={16} />
                            Edit Milestones
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            <Plus size={16} />
                            Add Milestone
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Talent Match Tab */}
                    {aiOverviewTab === 'talent match' && (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-4">
                            <span className="text-xl">👥</span>
                            <h3 className="text-lg font-bold text-gray-900">Best Talent Type for Your Project</h3>
                          </div>

                          {/* Recommended */}
                          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3 mb-3">
                              <CheckCircle className="text-green-600 flex-shrink-0" size={20} />
                              <h4 className="font-bold text-gray-900">Recommended: Mobile App Development Agency</h4>
                            </div>
                            <ul className="space-y-2 ml-8">
                              <li className="text-gray-700 text-sm">Multi-platform (iOS + Android) needed</li>
                              <li className="text-gray-700 text-sm">Design services required</li>
                              <li className="text-gray-700 text-sm">Budget supports agency pricing</li>
                              <li className="text-gray-700 text-sm">Timeline matches agency capacity</li>
                            </ul>
                          </div>

                          {/* Alternative */}
                          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4">
                            <h4 className="font-bold text-gray-900 mb-2">Alternative: Senior Freelancer + Designer</h4>
                            <p className="text-gray-700 text-sm">Estimated savings: 25-30% • Risk: Higher coordination overhead</p>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 flex-wrap">
                            <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm">
                              <span>🔍</span>
                              Find Agencies
                            </button>
                            <button className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                              <span>👤</span>
                              Find Freelancers
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Validation Tab */}
                    {aiOverviewTab === 'validation' && (
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <span className="text-xl">⚠️</span>
                              <h3 className="text-lg font-bold text-gray-900">AI Validation Results</h3>
                            </div>
                            <span className="bg-yellow-100 text-yellow-700 text-xs font-bold px-3 py-1 rounded">
                              MEDIUM RISK ●●●○○
                            </span>
                          </div>

                          {/* Warning 1 - Timeline */}
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3 mb-2">
                              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                              <h4 className="font-bold text-gray-900">Timeline may be aggressive</h4>
                            </div>
                            <p className="text-gray-700 text-sm mb-3 ml-8">Your target of 3 months is 40% shorter than typical. This increases cost and risk.</p>
                            <button className="ml-8 flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
                              <ArrowRight size={16} />
                              Extend to 5 months
                            </button>
                          </div>

                          {/* Warning 2 - Budget */}
                          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                            <div className="flex items-start gap-3 mb-2">
                              <AlertCircle className="text-yellow-600 flex-shrink-0 mt-0.5" size={20} />
                              <h4 className="font-bold text-gray-900">Budget slightly below market</h4>
                            </div>
                            <p className="text-gray-700 text-sm mb-3 ml-8">Your budget of $20,000 is 30% below the realistic range for this scope.</p>
                            <button className="ml-8 flex items-center gap-2 text-blue-600 font-medium text-sm hover:text-blue-700">
                              <ArrowRight size={16} />
                              Increase to $28,000+
                            </button>
                          </div>

                          {/* Info - First-time client */}
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
                            <div className="flex items-start gap-3">
                              <CheckCircle className="text-blue-600 flex-shrink-0 mt-0.5" size={20} />
                              <div>
                                <h4 className="font-bold text-gray-900">First-time client — enhanced monitoring</h4>
                                <p className="text-gray-700 text-sm">Your first project will have admin oversight at every milestone.</p>
                              </div>
                            </div>
                          </div>

                          {/* Action Buttons */}
                          <div className="flex gap-3 flex-wrap">
                            <button className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition text-sm">
                              Apply Suggestions
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                              Continue Anyway
                            </button>
                            <button className="px-4 py-2 bg-white border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                              Revise Project
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'talent' && (
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">AI Found 4 Matches</h3>
                      <p className="text-gray-600 text-sm">For your Food Delivery Platform project</p>
                    </div>

                    {[
                      {
                        number: 1,
                        name: 'TechVision Agency',
                        type: 'Agency',
                        location: 'Mumbai, India',
                        match: '98% Match',
                        rating: '4.9 (47 projects)',
                        available: 'Available Now',
                        budget: '$25K-$60K',
                        similar: 8,
                        disputes: 0,
                        risk: 'LOW',
                        icon: '🏆',
                      },
                      {
                        number: 2,
                        name: 'John Smith',
                        type: 'Freelancer',
                        location: 'Bangalore',
                        match: '91% Match',
                        rating: '4.8 (23 projects)',
                        available: 'Available in 1 week',
                        budget: '$15K-$35K',
                        similar: 5,
                        disputes: 0,
                        risk: 'LOW',
                        icon: '👤',
                      },
                      {
                        number: 3,
                        name: 'CodeCraft Agency',
                        type: 'Agency',
                        location: 'Delhi, India',
                        match: '89% Match',
                        rating: '4.7 (31 projects)',
                        available: 'Available in 1 week',
                        budget: '$20K-$50K',
                        similar: 5,
                        disputes: 1,
                        risk: 'MEDIUM',
                        icon: '👤',
                      },
                      {
                        number: 4,
                        name: 'Maria Chen',
                        type: 'Freelancer',
                        location: 'Singapore',
                        match: '85% Match',
                        rating: '4.6 (18 projects)',
                        available: 'Available in 2 weeks',
                        budget: '$12K-$28K',
                        similar: 3,
                        disputes: 0,
                        risk: 'LOW',
                        icon: 'M',
                      },
                    ].map((talent) => (
                      <div key={talent.number} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-start gap-3 flex-1">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                              {talent.icon}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 flex-wrap mb-1">
                                <h4 className="font-bold text-gray-900">#{talent.number} — {talent.name}</h4>
                                <span className="text-blue-600 text-sm font-medium">{talent.match}</span>
                              </div>
                              <p className="text-gray-600 text-sm">{talent.type} • {talent.location}</p>
                              <div className="flex items-center gap-1 mt-1">
                                <span className="text-yellow-500">⭐</span>
                                <span className="text-gray-600 text-sm">{talent.rating} • {talent.available}</span>
                              </div>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded flex-shrink-0 ${
                            talent.risk === 'LOW' 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-yellow-100 text-yellow-700'
                          }`}>
                            {talent.risk}
                          </span>
                        </div>

                        <div className="mb-3 text-sm text-gray-600 ml-13">
                          <span>Budget: {talent.budget}</span>
                          <span className="mx-4">Similar projects: {talent.similar}</span>
                          <span>Disputes: {talent.disputes}</span>
                        </div>

                        <div className="flex gap-2 ml-13">
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            👁️ View Profile
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white font-medium rounded text-sm hover:bg-blue-700 transition">
                            📧 Invite
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition">
                            ⚖️ Compare
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {/* Recent Activity */}
            {activeTab === 'overview' && (
              <>
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Activity</h3>
                  <div className="space-y-4">
                    <div className="flex gap-3">
                      <FileText className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Wireframes uploaded for review</p>
                        <p className="text-gray-500 text-xs">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Phone className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Kickoff meeting completed</p>
                        <p className="text-gray-500 text-xs">Yesterday</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <CheckCircle className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Project started</p>
                        <p className="text-gray-500 text-xs">2 days ago</p>
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <DollarSign className="text-gray-400 flex-shrink-0" size={20} />
                      <div>
                        <p className="font-medium text-gray-900 text-sm">Escrow funded: $44,100</p>
                        <p className="text-gray-500 text-xs">3 days ago</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-lg ${
                          deadline.highlight
                            ? 'bg-yellow-50 border border-yellow-200'
                            : 'bg-gray-50 border border-gray-200'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Calendar className={deadline.highlight ? 'text-yellow-600' : 'text-gray-400'} size={20} />
                          <p className="font-medium text-gray-900 text-sm">{deadline.title}</p>
                        </div>
                        <span className="text-gray-600 text-sm font-medium">{deadline.date}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-6">Project Health</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-700 font-medium text-sm">Timeline</p>
                        <span className="text-gray-900 font-bold text-sm">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-blue-600 text-xs font-medium mt-2">3 days ahead</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-700 font-medium text-sm">Budget</p>
                        <span className="text-gray-900 font-bold text-sm">20%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-green-500 h-2 rounded-full" style={{ width: '20%' }}></div>
                      </div>
                      <p className="text-green-600 text-xs font-medium mt-2">On track</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-700 font-medium text-sm">Communication</p>
                        <span className="text-gray-900 font-bold text-sm">90%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-blue-600 text-xs font-medium mt-2">Excellent</p>
                    </div>

                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-gray-700 font-medium text-sm">Quality</p>
                        <span className="text-gray-900 font-bold text-sm">100%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-blue-500 h-2 rounded-full" style={{ width: '100%' }}></div>
                      </div>
                      <p className="text-blue-600 text-xs font-medium mt-2">No revisions</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white font-bold text-lg">SJ</span>
                </div>
                <div className="min-w-0">
                  <h4 className="font-bold text-gray-900">Sarah Johnson</h4>
                  <p className="text-gray-600 text-sm">Project Success Manager</p>
                </div>
              </div>

              <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                  <p className="text-gray-700 text-sm">Response time: &lt; 4 hours</p>
                </div>
              </div>

              <button className="w-full py-3 px-4 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-sm mb-3 flex items-center justify-center gap-2">
                💬 Live Chat
              </button>
              <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                📞 Schedule Call
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-0">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      className="w-full flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition group border-b border-gray-100 last:border-b-0"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <Icon className="text-gray-400 group-hover:text-gray-600 flex-shrink-0" size={20} />
                        <span className="text-gray-700 font-medium text-sm">{action.title}</span>
                      </div>
                      <ArrowRight className="text-gray-300 group-hover:text-gray-400 flex-shrink-0" size={18} />
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                ✨ Insights
              </h3>
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {insight.status === 'success' ? (
                        <CheckCircle className="text-green-500" size={18} />
                      ) : (
                        <AlertCircle className="text-yellow-500" size={18} />
                      )}
                    </div>
                    <p className="text-gray-700 text-sm">{insight.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default HireTalentDashboard;
