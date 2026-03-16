import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
  ChevronDown,
  Plus,
} from 'lucide-react';

const HireTalentDashboard = () => {
  const navigate = useNavigate();

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
    { title: 'Review Deliverables', icon: CheckCircle,  action: () => navigate('/hire-talent/projects/1') },
    { title: 'Message Team',        icon: MessageSquare, action: () => navigate('/project-stream') },
    { title: 'My Projects',         icon: FileText,      action: () => navigate('/hire-talent/projects') },
    { title: 'My Reviews',          icon: Star,          action: () => navigate('/hire-talent/reviews') },
    { title: 'Disputes',            icon: AlertCircle,   action: () => navigate('/hire-talent/disputes') },
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
      case 'In Review': return 'bg-yellow-100 text-yellow-700';
      case 'Pending':   return 'bg-gray-100 text-gray-600';
      default:          return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1
              className="text-2xl sm:text-3xl font-bold cursor-pointer select-none"
              onClick={() => navigate('/hire-talent')}
            >
              <span className="text-green-500">Web</span>
              <span className="text-[#1a3a5c]">Lance</span>
            </h1>
            <div className="flex items-center gap-2 sm:gap-4">
              <button
                onClick={() => navigate('/hire-talent/notifications')}
                className="relative p-2 text-gray-600 hover:bg-gray-100 rounded-lg transition hidden sm:block"
              >
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
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
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
                      <button
                        onClick={() => navigate('/project-stream')}
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium text-sm border border-gray-300 hover:bg-gray-50 rounded transition"
                      >
                        <MessageSquare size={16} />
                        Message
                      </button>
                      <button
                        onClick={() => navigate(`/hire-talent/projects/${project.id}`)}
                        className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium text-sm border border-gray-300 hover:bg-gray-50 rounded transition"
                      >
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
                  {['Overview', 'Milestones', 'Files', 'Transactions', 'AI Builder', 'Talent'].map((tab) => (
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
                      { name: 'Wireframes_v1.pdf', size: '2.4 MB', time: '2 hours ago', status: 'In Review', statusColor: 'bg-yellow-100 text-yellow-700' },
                      { name: 'Requirements_Doc.docx', size: '1.1 MB', time: '3 days ago', status: 'Approved', statusColor: 'bg-green-100 text-green-700' },
                      { name: 'Design_System.fig', size: '8.2 MB', time: '1 hour ago', status: 'New', statusColor: 'bg-blue-100 text-blue-700' },
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

                {activeTab === 'transactions' && (
                  <div className="p-5 sm:p-6 space-y-5">

                    {/* Global summary cards */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
                        <p className="text-gray-500 text-xs font-medium mb-1">Total Spent (All Time)</p>
                        <p className="text-2xl font-bold text-[#1a3a5c]">$1,24,500</p>
                        <p className="text-xs text-gray-400 mt-1">Across 6 projects</p>
                      </div>
                      <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
                        <p className="text-emerald-600 text-xs font-medium mb-1">Total In Escrow</p>
                        <p className="text-2xl font-bold text-emerald-600">$42,000</p>
                        <p className="text-xs text-gray-400 mt-1">Locked & safe</p>
                      </div>
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                        <p className="text-blue-600 text-xs font-medium mb-1">Released to Talent</p>
                        <p className="text-2xl font-bold text-blue-600">$82,500</p>
                        <p className="text-xs text-gray-400 mt-1">Across completed milestones</p>
                      </div>
                    </div>

                    {/* Recent transactions list */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <h3 className="text-sm font-bold text-[#1a3a5c]">Recent Transactions</h3>
                        <button
                          onClick={() => navigate('/hire-talent/payments')}
                          className="text-xs text-blue-600 font-medium hover:underline"
                        >
                          View all →
                        </button>
                      </div>
                      <div className="space-y-2">
                        {[
                          { label: 'Escrow funded — Food Delivery App',      amount: '+$42,000', date: 'Feb 11, 2026', type: 'escrow',   color: 'text-emerald-600' },
                          { label: 'Final payment — E-Commerce Redesign',    amount: '-$18,500', date: 'Dec 20, 2025', type: 'released', color: 'text-blue-600' },
                          { label: 'Final payment — CRM Dashboard',          amount: '-$31,000', date: 'Sep 28, 2025', type: 'released', color: 'text-blue-600' },
                          { label: 'Final payment — Brand Identity Design',  amount: '-$8,500',  date: 'Jun 20, 2025', type: 'released', color: 'text-blue-600' },
                          { label: 'Dispute refund — AI Chatbot',            amount: '+$1,500',  date: 'Dec 5, 2025',  type: 'refund',   color: 'text-amber-600' },
                        ].map((tx, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-gray-50 border border-gray-100 rounded-xl hover:bg-gray-100 transition">
                            <div className="flex items-center gap-3">
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                                tx.type === 'escrow'   ? 'bg-emerald-100' :
                                tx.type === 'refund'   ? 'bg-amber-100' :
                                'bg-blue-100'
                              }`}>
                                <DollarSign size={14} className={
                                  tx.type === 'escrow'   ? 'text-emerald-600' :
                                  tx.type === 'refund'   ? 'text-amber-600' :
                                  'text-blue-600'
                                } />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-900">{tx.label}</p>
                                <p className="text-xs text-gray-400">{tx.date}</p>
                              </div>
                            </div>
                            <span className={`text-sm font-bold ${tx.color}`}>{tx.amount}</span>
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
                      ></textarea>
                    </div>
                    <button
                      onClick={() => setShowAIBreakdown(true)}
                      className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition"
                    >
                      <ArrowRight size={18} />
                      Analyze My Project
                    </button>
                  </div>
                )}

                {activeTab === 'talent' && (
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="mb-4">
                      <h3 className="text-lg font-bold text-gray-900 mb-1">AI Found 4 Matches</h3>
                      <p className="text-gray-600 text-sm">For your Food Delivery Platform project</p>
                    </div>
                    {[
                      { number: 1, name: 'TechVision Agency', type: 'Agency', location: 'Mumbai, India', match: '98% Match', rating: '4.9 (47 projects)', risk: 'LOW' },
                      { number: 2, name: 'John Smith', type: 'Freelancer', location: 'Bangalore', match: '91% Match', rating: '4.8 (23 projects)', risk: 'LOW' },
                    ].map((talent) => (
                      <div key={talent.number} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex items-start gap-3">
                            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center text-sm font-bold">
                              {talent.number}
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900">#{talent.number} — {talent.name}</h4>
                              <p className="text-gray-600 text-sm">{talent.type} • {talent.location}</p>
                              <p className="text-gray-600 text-sm">⭐ {talent.rating} • {talent.match}</p>
                            </div>
                          </div>
                          <span className={`text-xs font-bold px-2 py-1 rounded ${talent.risk === 'LOW' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                            {talent.risk}
                          </span>
                        </div>
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => navigate(`/profile/${talent.number}`)}
                            className="flex items-center gap-2 px-3 py-1.5 text-gray-600 border border-gray-300 rounded text-sm hover:bg-gray-50 transition"
                          >
                            👁️ View Profile
                          </button>
                          <button className="flex items-center gap-2 px-3 py-1.5 bg-blue-600 text-white font-medium rounded text-sm hover:bg-blue-700 transition">
                            📧 Invite
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
                    {[
                      { icon: FileText, text: 'Wireframes uploaded for review', time: '2 hours ago' },
                      { icon: Phone,    text: 'Kickoff meeting completed',       time: 'Yesterday' },
                      { icon: CheckCircle, text: 'Project started',              time: '2 days ago' },
                      { icon: DollarSign,  text: 'Escrow funded: $44,100',       time: '3 days ago' },
                    ].map((item, idx) => {
                      const Icon = item.icon;
                      return (
                        <div key={idx} className="flex gap-3">
                          <Icon className="text-gray-400 flex-shrink-0" size={20} />
                          <div>
                            <p className="font-medium text-gray-900 text-sm">{item.text}</p>
                            <p className="text-gray-500 text-xs">{item.time}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Upcoming Deadlines</h3>
                  <div className="space-y-3">
                    {upcomingDeadlines.map((deadline, idx) => (
                      <div
                        key={idx}
                        className={`flex items-center justify-between p-4 rounded-lg ${deadline.highlight ? 'bg-yellow-50 border border-yellow-200' : 'bg-gray-50 border border-gray-200'}`}
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
                    {[
                      { label: 'Timeline',      value: 90,  note: '3 days ahead', color: 'blue' },
                      { label: 'Budget',        value: 20,  note: 'On track',     color: 'green' },
                      { label: 'Communication', value: 90,  note: 'Excellent',    color: 'blue' },
                      { label: 'Quality',       value: 100, note: 'No revisions', color: 'blue' },
                    ].map((h, idx) => (
                      <div key={idx}>
                        <div className="flex items-center justify-between mb-2">
                          <p className="text-gray-700 font-medium text-sm">{h.label}</p>
                          <span className="text-gray-900 font-bold text-sm">{h.value}%</span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div className={`${h.color === 'green' ? 'bg-green-500' : 'bg-blue-500'} h-2 rounded-full`} style={{ width: `${h.value}%` }}></div>
                        </div>
                        <p className={`${h.color === 'green' ? 'text-green-600' : 'text-blue-600'} text-xs font-medium mt-2`}>{h.note}</p>
                      </div>
                    ))}
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
              <div className="flex items-center gap-2 mb-6 pb-6 border-b border-gray-200">
                <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></div>
                <p className="text-gray-700 text-sm">Response time: &lt; 4 hours</p>
              </div>
              <button
                onClick={() => navigate('/project-stream')}
                className="w-full py-3 px-4 bg-blue-50 text-blue-600 font-semibold rounded-lg hover:bg-blue-100 transition text-sm mb-3 flex items-center justify-center gap-2"
              >
                💬 Live Chat
              </button>
              <button className="w-full py-3 px-4 border border-gray-300 text-gray-700 font-semibold rounded-lg hover:bg-gray-50 transition text-sm">
                📞 Schedule Call
              </button>
            </div>

            {/* Quick Actions */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Quick Actions</h3>
              <div className="space-y-0">
                {quickActions.map((action, idx) => {
                  const Icon = action.icon;
                  return (
                    <button
                      key={idx}
                      onClick={action.action}
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

            {/* Insights */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-5 sm:p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                ✨ Insights
              </h3>
              <div className="space-y-3">
                {insights.map((insight, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-0.5">
                      {insight.status === 'success'
                        ? <CheckCircle className="text-green-500" size={18} />
                        : <AlertCircle className="text-yellow-500" size={18} />
                      }
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