import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search,
  Plus,
  ChevronRight,
  CheckCircle,
  AlertCircle,
  DollarSign,
  Calendar,
  Star,
  MoreVertical,
  Bell,
  Settings,
  Briefcase,
  Shield,
  MessageSquare,
  Clock,
  XCircle,
} from 'lucide-react';

const ProjectList = () => {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [sortBy, setSortBy]             = useState('recent');
  const [openMenu, setOpenMenu]         = useState(null);
  const [reviewModal, setReviewModal]   = useState(null); // project object
  const [rating, setRating]             = useState(0);
  const [hoverRating, setHoverRating]   = useState(0);
  const [reviewText, setReviewText]     = useState('');
  const [submitted, setSubmitted]       = useState(false);

  const stats = [
    { label: 'Total Projects', value: '6', icon: Briefcase, color: 'blue', sub: '1 active now' },
    { label: 'Total Spent', value: '$1,24,500', icon: DollarSign, color: 'green', sub: 'All time' },
    { label: 'In Escrow', value: '$42,000', icon: Shield, color: 'navy', sub: 'Locked & safe' },
    { label: 'Avg Rating Given', value: '4.8 ★', icon: Star, color: 'yellow', sub: 'To talent' },
  ];

  const projects = [
    {
      id: 1,
      title: 'Food Delivery Mobile App',
      status: 'active',
      talent: 'TechVision Agency',
      talentType: 'Agency',
      talentInitials: 'TV',
      rating: 4.9,
      currentMilestone: 'Design & Planning',
      milestoneNum: 1,
      totalMilestones: 4,
      progress: 40,
      daysAhead: 3,
      budget: 42000,
      spent: 8400,
      escrow: 42000,
      startDate: 'Feb 11, 2026',
      deadline: 'Jul 25, 2026',
      tags: ['Mobile App', 'React Native', 'UI/UX'],
      messages: 3,
      health: 'excellent',
    },
    {
      id: 2,
      title: 'E-Commerce Website Redesign',
      status: 'completed',
      talent: 'John Smith',
      talentType: 'Freelancer',
      talentInitials: 'JS',
      rating: 4.8,
      currentMilestone: 'All Milestones Done',
      milestoneNum: 3,
      totalMilestones: 3,
      progress: 100,
      daysAhead: 0,
      budget: 18500,
      spent: 18500,
      escrow: 0,
      startDate: 'Oct 5, 2025',
      deadline: 'Dec 20, 2025',
      tags: ['Web Design', 'Shopify', 'SEO'],
      messages: 0,
      health: 'good',
      myRating: 5,
    },
    {
      id: 3,
      title: 'CRM Dashboard for Internal Team',
      status: 'completed',
      talent: 'CodeCraft Agency',
      talentType: 'Agency',
      talentInitials: 'CC',
      rating: 4.7,
      currentMilestone: 'All Milestones Done',
      milestoneNum: 4,
      totalMilestones: 4,
      progress: 100,
      daysAhead: 0,
      budget: 31000,
      spent: 31000,
      escrow: 0,
      startDate: 'Jul 1, 2025',
      deadline: 'Sep 28, 2025',
      tags: ['React', 'Django', 'Analytics'],
      messages: 0,
      health: 'good',
      myRating: 4,
    },
    {
      id: 4,
      title: 'AI Chatbot Integration',
      status: 'disputed',
      talent: 'DevPro Solutions',
      talentType: 'Agency',
      talentInitials: 'DP',
      rating: 3.2,
      currentMilestone: 'Core Development — Disputed',
      milestoneNum: 2,
      totalMilestones: 3,
      progress: 45,
      daysAhead: -5,
      budget: 14000,
      spent: 6000,
      escrow: 8000,
      startDate: 'Nov 10, 2025',
      deadline: 'Jan 30, 2026',
      tags: ['AI', 'Python', 'NLP'],
      messages: 7,
      health: 'critical',
    },
    {
      id: 5,
      title: 'Company Brand Identity Design',
      status: 'completed',
      talent: 'Maria Chen',
      talentType: 'Freelancer',
      talentInitials: 'MC',
      rating: 5.0,
      currentMilestone: 'All Milestones Done',
      milestoneNum: 2,
      totalMilestones: 2,
      progress: 100,
      daysAhead: 2,
      budget: 8500,
      spent: 8500,
      escrow: 0,
      startDate: 'May 15, 2025',
      deadline: 'Jun 20, 2025',
      tags: ['Branding', 'Logo', 'Figma'],
      messages: 0,
      health: 'excellent',
      myRating: 5,
    },
    {
      id: 6,
      title: 'Inventory Management System',
      status: 'cancelled',
      talent: 'QuickCode Labs',
      talentType: 'Agency',
      talentInitials: 'QC',
      rating: 3.8,
      currentMilestone: 'Cancelled Before Start',
      milestoneNum: 0,
      totalMilestones: 5,
      progress: 0,
      daysAhead: 0,
      budget: 22000,
      spent: 0,
      escrow: 0,
      startDate: 'Jan 2, 2026',
      deadline: 'Apr 15, 2026',
      tags: ['ERP', 'Python', 'Database'],
      messages: 0,
      health: 'cancelled',
    },
  ];

  const filters = [
    { key: 'all', label: 'All Projects', count: projects.length },
    { key: 'active', label: 'Active', count: projects.filter(p => p.status === 'active').length },
    { key: 'completed', label: 'Completed', count: projects.filter(p => p.status === 'completed').length },
    { key: 'disputed', label: 'Disputed', count: projects.filter(p => p.status === 'disputed').length },
    { key: 'cancelled', label: 'Cancelled', count: projects.filter(p => p.status === 'cancelled').length },
  ];

  const filtered = projects.filter(p => {
    const matchesFilter = activeFilter === 'all' || p.status === activeFilter;
    const matchesSearch =
      p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.talent.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'recent') return b.id - a.id;
    if (sortBy === 'budget') return b.budget - a.budget;
    if (sortBy === 'progress') return b.progress - a.progress;
    return 0;
  });

  const getStatusConfig = (status) => {
    switch (status) {
      case 'active':
        return {
          label: 'Active',
          classes: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
          icon: <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse inline-block mr-1.5" />,
        };
      case 'completed':
        return {
          label: 'Completed',
          classes: 'bg-blue-50 text-blue-700 border border-blue-200',
          icon: <CheckCircle size={11} className="inline mr-1 text-blue-600" />,
        };
      case 'disputed':
        return {
          label: 'Disputed',
          classes: 'bg-red-50 text-red-700 border border-red-200',
          icon: <AlertCircle size={11} className="inline mr-1 text-red-600" />,
        };
      case 'cancelled':
        return {
          label: 'Cancelled',
          classes: 'bg-gray-100 text-gray-500 border border-gray-200',
          icon: <XCircle size={11} className="inline mr-1 text-gray-400" />,
        };
      default:
        return { label: status, classes: 'bg-gray-100 text-gray-600 border border-gray-200', icon: null };
    }
  };

  const getBarClass = (health) => {
    if (health === 'excellent') return 'bg-gradient-to-r from-green-400 to-emerald-500';
    if (health === 'good') return 'bg-gradient-to-r from-blue-400 to-blue-600';
    if (health === 'critical') return 'bg-gradient-to-r from-orange-400 to-red-500';
    return 'bg-gray-300';
  };

  const getStatGradient = (color) => {
    const map = {
      blue: 'from-blue-500 to-blue-700',
      green: 'from-green-500 to-emerald-600',
      navy: 'from-[#1a3a5c] to-[#0d2137]',
      yellow: 'from-amber-400 to-orange-500',
    };
    return map[color] || 'from-gray-400 to-gray-600';
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-extrabold tracking-tight select-none">
              <span className="text-green-500">Web</span>
              <span className="text-[#1a3a5c]">Lance</span>
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate('/hire-talent/notifications')}
                className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
              >
                <Bell size={20} />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
                <Settings size={20} />
              </button>
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
                CL
              </div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a5c]">My Projects</h1>
            <p className="text-gray-400 text-sm mt-0.5">Track, manage, and review all your projects in one place.</p>
          </div>
          <button
            onClick={() => navigate('/hire-talent/post-project')}
            className="self-start sm:self-auto flex items-center gap-2 px-5 py-2.5 rounded-lg text-white text-sm font-semibold shadow hover:opacity-90 transition"
            style={{ background: 'linear-gradient(135deg, #4ade80 0%, #1d4ed8 100%)' }}
          >
            <Plus size={17} />
            Post New Project
          </button>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, idx) => {
            const Icon = stat.icon;
            return (
              <div key={idx} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
                <div className={`w-11 h-11 rounded-xl bg-gradient-to-br ${getStatGradient(stat.color)} flex items-center justify-center flex-shrink-0`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-[#1a3a5c] leading-tight">{stat.value}</p>
                  <p className="text-xs text-gray-400">{stat.sub}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Search + Filter + Sort bar ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects or talent name..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value)}
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-600"
            >
              <option value="recent">Most Recent</option>
              <option value="budget">Budget (High → Low)</option>
              <option value="progress">Progress</option>
            </select>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mt-3 overflow-x-auto pb-0.5">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition ${
                  activeFilter === f.key
                    ? 'text-white border-transparent shadow-sm'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                }`}
                style={activeFilter === f.key ? { background: 'linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)' } : {}}
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
        </div>

        {/* ── Project Cards ── */}
        <div className="space-y-4">
          {sorted.length === 0 && (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 text-center">
              <Briefcase size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No projects found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          )}

          {sorted.map(project => {
            const statusCfg = getStatusConfig(project.status);
            const barClass = getBarClass(project.health);
            const isMenuOpen = openMenu === project.id;

            return (
              <div
                key={project.id}
                className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden"
              >
                {/* Top colored accent line */}
                {project.status === 'active' && (
                  <div className="h-[3px] w-full bg-gradient-to-r from-green-400 via-teal-400 to-blue-600" />
                )}
                {project.status === 'disputed' && (
                  <div className="h-[3px] w-full bg-gradient-to-r from-orange-400 to-red-500" />
                )}
                {project.status === 'completed' && (
                  <div className="h-[3px] w-full bg-gradient-to-r from-blue-400 to-blue-600" />
                )}

                <div className="p-5 sm:p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                        {project.talentInitials}
                      </div>
                    </div>

                    {/* Main info */}
                    <div className="flex-1 min-w-0">
                      {/* Title + badges */}
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <h2 className="text-[15px] font-bold text-[#1a3a5c]">{project.title}</h2>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusCfg.classes}`}>
                          {statusCfg.icon}{statusCfg.label}
                        </span>
                        {project.messages > 0 && (
                          <span className="flex items-center gap-1 bg-red-50 text-red-600 text-xs font-semibold px-2 py-0.5 rounded-full border border-red-200">
                            <MessageSquare size={10} />{project.messages} new
                          </span>
                        )}
                      </div>

                      {/* Talent line */}
                      <p className="text-sm text-gray-500 mb-3">
                        <span className="font-semibold text-gray-700">{project.talent}</span>
                        {' '}· {project.talentType} · ⭐ {project.rating}
                      </p>

                      {/* Progress bar */}
                      {project.status !== 'cancelled' && (
                        <div className="mb-3">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-gray-400">
                              M{project.milestoneNum}/{project.totalMilestones} — {project.currentMilestone}
                            </span>
                            <span className="text-xs font-bold text-[#1a3a5c]">{project.progress}%</span>
                          </div>
                          <div className="w-full bg-gray-100 rounded-full h-1.5">
                            <div
                              className={`h-1.5 rounded-full transition-all ${barClass}`}
                              style={{ width: `${project.progress}%` }}
                            />
                          </div>
                          {project.status === 'active' && project.daysAhead > 0 && (
                            <p className="text-xs text-emerald-600 font-semibold mt-1">
                              ✓ {project.daysAhead} days ahead of schedule
                            </p>
                          )}
                          {project.status === 'disputed' && (
                            <p className="text-xs text-red-500 font-semibold mt-1">
                              ⚠ Dispute in progress — Admin reviewing
                            </p>
                          )}
                        </div>
                      )}

                      {/* Tags */}
                      <div className="flex flex-wrap gap-1.5">
                        {project.tags.map((tag, i) => (
                          <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>

                    {/* Right panel */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0 sm:min-w-[175px]">

                      {/* Budget */}
                      <div className="text-right">
                        <p className="text-lg font-bold text-[#1a3a5c]">${project.budget.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">
                          ${project.spent.toLocaleString()} spent
                          {project.escrow > 0 && (
                            <span className="ml-1 text-emerald-600 font-semibold">
                              · ${project.escrow.toLocaleString()} in escrow
                            </span>
                          )}
                        </p>
                      </div>

                      {/* Dates */}
                      <div className="text-right text-xs text-gray-400 space-y-0.5">
                        <div className="flex items-center gap-1 justify-end">
                          <Calendar size={11} />
                          <span>Started {project.startDate}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <Clock size={11} />
                          <span>Due {project.deadline}</span>
                        </div>
                      </div>

                      {/* Stars if rated */}
                      {project.myRating && (
                        <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={11}
                              className={i < project.myRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                            />
                          ))}
                          <span className="text-xs text-amber-700 font-medium ml-1">You rated</span>
                        </div>
                      )}

                      {/* Leave review prompt for completed unrated */}
                      {project.status === 'completed' && !project.myRating && (
                        <button
                          onClick={() => { setReviewModal(project); setRating(0); setReviewText(''); setSubmitted(false); }}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 rounded-lg hover:bg-amber-100 transition"
                        >
                          <Star size={12} className="text-amber-500" />
                          Leave a Review
                        </button>
                      )}

                      {/* CTA + 3-dot */}
                      <div className="flex items-center gap-2">
                        {project.status === 'active' && (
                          <button
                            onClick={() => navigate(`/hire-talent/projects/${project.id}`)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded-lg shadow-sm hover:opacity-90 transition"
                            style={{ background: 'linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)' }}
                          >
                            View Project <ChevronRight size={13} />
                          </button>
                        )}
                        {project.status === 'completed' && (
                          <button
                            onClick={() => navigate(`/hire-talent/projects/${project.id}`)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                            View Report <ChevronRight size={13} />
                          </button>
                        )}
                        {project.status === 'disputed' && (
                          <button
                            onClick={() => navigate('/hire-talent/disputes')}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-red-700 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition">
                            View Dispute <ChevronRight size={13} />
                          </button>
                        )}
                        {project.status === 'cancelled' && (
                          <button
                            onClick={() => navigate(`/hire-talent/projects/${project.id}`)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition">
                            View Details <ChevronRight size={13} />
                          </button>
                        )}

                        {/* 3-dot menu */}
                        <div className="relative">
                          <button
                            onClick={() => setOpenMenu(isMenuOpen ? null : project.id)}
                            className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                          >
                            <MoreVertical size={15} />
                          </button>
                          {isMenuOpen && (
                            <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 w-44">
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                View Contract
                              </button>
                              <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50">
                                Download Invoice
                              </button>
                              {project.status === 'active' && (
                                <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50">
                                  Raise Dispute
                                </button>
                              )}
                              {project.status === 'completed' && !project.myRating && (
                                <button
                                  onClick={() => { setOpenMenu(null); setReviewModal(project); setRating(0); setReviewText(''); setSubmitted(false); }}
                                  className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50"
                                >
                                  Leave a Review
                                </button>
                              )}
                              {project.status === 'completed' && project.myRating && (
                                <button
                                  onClick={() => { setOpenMenu(null); navigate('/hire-talent/reviews'); }}
                                  className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50"
                                >
                                  View My Review
                                </button>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Bottom CTA ── */}

      </main>

      {/* ── Leave a Review Modal ── */}
      {reviewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">

            {!submitted ? (
              <>
                {/* Header */}
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#1a3a5c]">Leave a Review</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{reviewModal.project || reviewModal.title}</p>
                  </div>
                  <button
                    onClick={() => setReviewModal(null)}
                    className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                  >
                    <XCircle size={18} />
                  </button>
                </div>

                {/* Talent info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {reviewModal.talentInitials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a3a5c]">{reviewModal.talent}</p>
                    <p className="text-xs text-gray-400">{reviewModal.talentType}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your Rating</p>
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star
                          size={32}
                          className={`transition-colors ${
                            star <= (hoverRating || rating)
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-gray-200 fill-gray-200'
                          }`}
                        />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="text-sm font-semibold text-amber-600 ml-2">
                        {rating === 1 ? 'Poor' : rating === 2 ? 'Fair' : rating === 3 ? 'Good' : rating === 4 ? 'Very Good' : 'Excellent'}
                      </span>
                    )}
                  </div>
                </div>

                {/* Review categories */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {[
                    { label: 'Communication', key: 'comm' },
                    { label: 'Quality',        key: 'qual' },
                    { label: 'Timeliness',     key: 'time' },
                    { label: 'Professionalism',key: 'prof' },
                  ].map(cat => (
                    <div key={cat.key} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1.5">{cat.label}</p>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={14}
                            className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Review text */}
                <div className="mb-5">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Write Your Review</p>
                  <textarea
                    rows={4}
                    placeholder="Share your experience working with this talent. What went well? What could be improved?"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{reviewText.length}/500 characters</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-3">
                  <button
                    onClick={() => setReviewModal(null)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    Cancel
                  </button>
                  <button
                    disabled={rating === 0 || !reviewText.trim()}
                    onClick={() => setSubmitted(true)}
                    className={`flex-1 py-2.5 text-white text-sm font-semibold rounded-xl transition ${
                      rating === 0 || !reviewText.trim()
                        ? 'bg-gray-300 cursor-not-allowed'
                        : 'hover:opacity-90'
                    }`}
                    style={rating > 0 && reviewText.trim() ? { background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' } : {}}
                  >
                    Submit Review
                  </button>
                </div>
              </>
            ) : (
              /* Success state */
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Review Submitted!</h3>
                <p className="text-sm text-gray-500 mb-2">
                  Thank you for reviewing <strong>{reviewModal.talent}</strong>.
                </p>
                <div className="flex justify-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={20}
                      className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                    />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button
                    onClick={() => setReviewModal(null)}
                    className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => { setReviewModal(null); navigate('/hire-talent/reviews'); }}
                    className="flex-1 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                  >
                    View All Reviews
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

    </div>
  );
};

export default ProjectList;