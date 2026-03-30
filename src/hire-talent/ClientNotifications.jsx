import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  DollarSign,
  MessageSquare,
  FileText,
  Clock,
  Shield,
  Star,
  Flag,
  Zap,
  X,
  Check,
  Filter,
  Trash2,
  Eye,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK NOTIFICATIONS
───────────────────────────────────────*/
const INITIAL_NOTIFICATIONS = [
  {
    id: 1,
    type: 'milestone',
    title: 'Milestone 1 ready for review',
    message: 'TechVision Agency has submitted deliverables for Milestone 1 — Discovery & Design. Please review and approve.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '2 hours ago',
    date: 'Today',
    read: false,
    actionLabel: 'Review Now',
    actionRoute: '/hire-talent/projects/1',
    priority: 'high',
  },
  {
    id: 2,
    type: 'message',
    title: 'New message from Arjun Mehta',
    message: 'We have uploaded the wireframes. Please review at your earliest convenience and share feedback.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '2 hours ago',
    date: 'Today',
    read: false,
    actionLabel: 'View Message',
    actionRoute: '/project-stream',
    priority: 'normal',
  },
  {
    id: 3,
    type: 'admin',
    title: 'Platform Admin update',
    message: 'Your project is 3 days ahead of schedule. TechVision Agency is performing excellently. No action needed.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '3 hours ago',
    date: 'Today',
    read: false,
    actionLabel: 'View Project',
    actionRoute: '/hire-talent/projects/1',
    priority: 'normal',
  },
  {
    id: 4,
    type: 'payment',
    title: 'Escrow funded successfully',
    message: '$42,000 has been locked in escrow for Food Delivery Mobile App. Work will begin shortly.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '3 days ago',
    date: 'Feb 11, 2026',
    read: true,
    actionLabel: 'View Payments',
    actionRoute: '/hire-talent/projects/1',
    priority: 'normal',
  },
  {
    id: 5,
    type: 'dispute',
    title: 'Dispute update — AI Chatbot Integration',
    message: 'Admin has reviewed your dispute and requested a response from DevPro Solutions. Decision expected in 3 business days.',
    project: 'AI Chatbot Integration',
    projectId: 4,
    time: '2 days ago',
    date: 'Feb 12, 2026',
    read: true,
    actionLabel: 'View Dispute',
    actionRoute: '/hire-talent/disputes',
    priority: 'high',
  },
  {
    id: 6,
    type: 'review',
    title: 'Leave a review for John Smith',
    message: 'E-Commerce Website Redesign has been completed. Share your experience to help other clients.',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    time: '3 months ago',
    date: 'Dec 20, 2025',
    read: true,
    actionLabel: 'Leave Review',
    actionRoute: '/hire-talent/reviews',
    priority: 'low',
  },
  {
    id: 7,
    type: 'payment',
    title: 'Payment released — E-Commerce Redesign',
    message: 'Final payment of $18,500 has been released to John Smith. Project is now closed.',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    time: '3 months ago',
    date: 'Dec 20, 2025',
    read: true,
    actionLabel: 'View Project',
    actionRoute: '/hire-talent/projects/2',
    priority: 'normal',
  },
  {
    id: 8,
    type: 'system',
    title: 'Auto-approval reminder',
    message: 'Milestone 1 deliverables will be auto-approved in 71 hours if no action is taken. Please review now.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '1 hour ago',
    date: 'Today',
    read: false,
    actionLabel: 'Review Now',
    actionRoute: '/hire-talent/projects/1',
    priority: 'high',
  },
  {
    id: 9,
    type: 'milestone',
    title: 'Milestone 2 scheduled to begin',
    message: 'Core Development phase will begin on Mar 12, 2026 after Milestone 1 approval.',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    time: '1 day ago',
    date: 'Feb 13, 2026',
    read: true,
    actionLabel: 'View Milestones',
    actionRoute: '/hire-talent/projects/1',
    priority: 'low',
  },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function getNotifConfig(type) {
  switch (type) {
    case 'milestone': return {
      icon: CheckCircle,
      iconBg: 'bg-blue-100',
      iconColor: 'text-blue-600',
      border: 'border-l-blue-500',
      label: 'Milestone',
    };
    case 'message': return {
      icon: MessageSquare,
      iconBg: 'bg-purple-100',
      iconColor: 'text-purple-600',
      border: 'border-l-purple-500',
      label: 'Message',
    };
    case 'admin': return {
      icon: Shield,
      iconBg: 'bg-red-100',
      iconColor: 'text-red-600',
      border: 'border-l-red-500',
      label: 'Admin',
    };
    case 'payment': return {
      icon: DollarSign,
      iconBg: 'bg-green-100',
      iconColor: 'text-green-600',
      border: 'border-l-green-500',
      label: 'Payment',
    };
    case 'dispute': return {
      icon: Flag,
      iconBg: 'bg-orange-100',
      iconColor: 'text-orange-600',
      border: 'border-l-orange-500',
      label: 'Dispute',
    };
    case 'review': return {
      icon: Star,
      iconBg: 'bg-amber-100',
      iconColor: 'text-amber-600',
      border: 'border-l-amber-500',
      label: 'Review',
    };
    case 'system': return {
      icon: Zap,
      iconBg: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      border: 'border-l-yellow-500',
      label: 'System',
    };
    default: return {
      icon: Bell,
      iconBg: 'bg-gray-100',
      iconColor: 'text-gray-500',
      border: 'border-l-gray-400',
      label: 'Notification',
    };
  }
}

function getPriorityBadge(priority) {
  switch (priority) {
    case 'high': return 'bg-red-50 text-red-600 border border-red-200';
    case 'low':  return 'bg-gray-100 text-gray-500 border border-gray-200';
    default:     return null;
  }
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientNotifications() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const projectFilter = searchParams.get('project');
  const typeFilter    = searchParams.get('type');

  const [notifications, setNotifications] = useState(
    INITIAL_NOTIFICATIONS.filter(n => {
      if (projectFilter && n.projectId !== Number(projectFilter)) return false;
      if (typeFilter && n.type !== typeFilter) return false;
      return true;
    })
  );
  const [activeFilter, setActiveFilter] = useState('all');
  const [activeType, setActiveType]     = useState('all');

  const projectName = projectFilter
    ? INITIAL_NOTIFICATIONS.find(n => n.projectId === Number(projectFilter))?.project
    : null;

  const unreadCount = notifications.filter(n => !n.read).length;

  /* ── filter logic ── */
  const filtered = notifications
    .filter(n => {
      if (activeFilter === 'unread') return !n.read;
      if (activeFilter === 'read')   return n.read;
      return true;
    })
    .filter(n => activeType === 'all' || n.type === activeType);

  /* ── grouped by date ── */
  const grouped = filtered.reduce((acc, notif) => {
    if (!acc[notif.date]) acc[notif.date] = [];
    acc[notif.date].push(notif);
    return acc;
  }, {});

  /* ── actions ── */
  const markRead = (id) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const dismiss = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications(prev => prev.filter(n => !n.read));
  };

  const TYPE_FILTERS = [
    { key: 'all',       label: 'All' },
    { key: 'milestone', label: 'Milestones' },
    { key: 'message',   label: 'Messages' },
    { key: 'payment',   label: 'Payments' },
    { key: 'dispute',   label: 'Disputes' },
    { key: 'admin',     label: 'Admin' },
    { key: 'system',    label: 'System' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
            >
              <ArrowLeft size={18} />
            </button>
            <span className="text-xl font-extrabold tracking-tight select-none">
              <span className="text-green-500">Web</span>
              <span className="text-[#1a3a5c]">Lance</span>
            </span>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
              CL
            </div>
          </div>
        </div>
      </header> */}




      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-3xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
    
    {/* Left Side */}
    <div className="flex items-center gap-3">
      
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 transition"
      >
        <ArrowLeft size={18} />
      </button>

      {/* Logo (WebLance removed) */}
      <img
        src="/image-removebg-preview.png"
        alt="Logo"
        className="h-8 w-auto cursor-pointer"
        onClick={() => navigate("/")}
      />
    </div>

    {/* Right Side */}
    <div className="flex items-center gap-2">
      <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
        <Settings size={18} />
      </button>

      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
        CL
      </div>
    </div>

  </div>
</header>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page heading ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-[#1a3a5c]">
                {projectName
                  ? 'Project Notifications'
                  : typeFilter
                  ? `${typeFilter.charAt(0).toUpperCase() + typeFilter.slice(1)} Notifications`
                  : 'Notifications'}
              </h1>
              {unreadCount > 0 && (
                <span className="px-2.5 py-0.5 bg-red-500 text-white text-xs font-bold rounded-full">
                  {unreadCount} new
                </span>
              )}
            </div>
            {projectName && (
              <p className="text-sm text-gray-400 mt-0.5">{projectName}</p>
            )}
          </div>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <button
                onClick={markAllRead}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition"
              >
                <Check size={13} /> Mark all read
              </button>
            )}
            {notifications.some(n => n.read) && (
              <button
                onClick={clearAll}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition"
              >
                <Trash2 size={13} /> Clear read
              </button>
            )}
          </div>
        </div>

        {/* ── Read / Unread toggle ── */}
        <div className="flex gap-2 mb-4">
          {[
            { key: 'all',    label: 'All',    count: notifications.length },
            { key: 'unread', label: 'Unread', count: notifications.filter(n => !n.read).length },
            { key: 'read',   label: 'Read',   count: notifications.filter(n => n.read).length },
          ].map(f => (
            <button
              key={f.key}
              onClick={() => setActiveFilter(f.key)}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium border transition ${
                activeFilter === f.key
                  ? 'text-white border-transparent'
                  : 'bg-white text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
              style={activeFilter === f.key ? { background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' } : {}}
            >
              {f.label}
              <span className={`text-xs px-1.5 py-0.5 rounded-full font-bold ${
                activeFilter === f.key ? 'bg-white/20 text-white' : 'bg-gray-100 text-gray-500'
              }`}>
                {f.count}
              </span>
            </button>
          ))}
        </div>

        {/* ── Type filter chips — only show on global notifications ── */}
        {!typeFilter && !projectFilter && (
          <div className="flex gap-2 overflow-x-auto pb-1 mb-6">
            {TYPE_FILTERS.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveType(f.key)}
                className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap border transition ${
                  activeType === f.key
                    ? 'text-white border-transparent'
                    : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'
                }`}
                style={activeType === f.key ? { background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' } : {}}
              >
                {f.label}
              </button>
            ))}
          </div>
        )}

        {/* ── Empty state ── */}
        {filtered.length === 0 && (
          <div className="bg-white rounded-2xl border border-dashed border-gray-300 p-16 text-center">
            <Bell size={36} className="text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">No notifications here</p>
            <p className="text-gray-400 text-sm mt-1">You are all caught up!</p>
          </div>
        )}

        {/* ── Grouped notifications ── */}
        <div className="space-y-6">
          {Object.entries(grouped).map(([date, items]) => (
            <div key={date}>
              {/* Date label */}
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs font-semibold text-gray-400 uppercase tracking-wide">{date}</span>
                <div className="flex-1 h-px bg-gray-200" />
              </div>

              {/* Notification items */}
              <div className="space-y-2">
                {items.map(notif => {
                  const cfg = getNotifConfig(notif.type);
                  const Icon = cfg.icon;
                  const priorityBadge = getPriorityBadge(notif.priority);

                  return (
                    <div
                      key={notif.id}
                      className={`relative bg-white rounded-2xl shadow-sm overflow-hidden transition-all ${
                        !notif.read
                          ? 'border border-gray-200 border-l-4 border-l-blue-500'
                          : 'border border-gray-100 opacity-80'
                      }`}
                    >
                      {/* Unread dot */}
                      {!notif.read && (
                        <div className="absolute top-4 right-4 w-2 h-2 rounded-full bg-red-500" />
                      )}

                      <div className="p-4 pr-8">
                        <div className="flex items-start gap-3">

                          {/* Icon */}
                          <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.iconBg}`}>
                            <Icon size={17} className={cfg.iconColor} />
                          </div>

                          {/* Content */}
                          <div className="flex-1 min-w-0">
                            <div className="flex flex-wrap items-center gap-2 mb-0.5">
                              <p className={`text-sm font-bold ${notif.read ? 'text-gray-500' : 'text-[#1a3a5c]'}`}>
                                {notif.title}
                              </p>
                              {priorityBadge && (
                                <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${priorityBadge}`}>
                                  {notif.priority === 'high' ? '⚡ Urgent' : 'Low'}
                                </span>
                              )}
                              <span className="text-xs text-gray-300 bg-gray-100 px-2 py-0.5 rounded-full">
                                {cfg.label}
                              </span>
                            </div>
                            <p className="text-sm text-gray-500 leading-relaxed mb-2">{notif.message}</p>
                            <div className="flex flex-wrap items-center gap-3">
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <Clock size={11} /> {notif.time}
                              </span>
                              {notif.project && (
                                <span className="text-xs text-gray-400">
                                  · {notif.project}
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Action buttons */}
                        <div className="flex items-center gap-2 mt-3 ml-12">
                          <button
                            onClick={() => { markRead(notif.id); navigate(notif.actionRoute); }}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition"
                            style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                          >
                            {notif.actionLabel}
                          </button>
                          {!notif.read && (
                            <button
                              onClick={() => markRead(notif.id)}
                              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-500 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
                            >
                              <Eye size={12} /> Mark read
                            </button>
                          )}
                          <button
                            onClick={() => dismiss(notif.id)}
                            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition"
                          >
                            <X size={12} /> Dismiss
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}