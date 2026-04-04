import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  Search,
  FileText,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  Shield,
  Download,
  Eye,
  MoreVertical,
  ChevronRight,
  XCircle,
  Lock,
  Unlock,
  Star,
  Users,
  Filter,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK DATA
───────────────────────────────────────*/
const CONTRACTS = [
  {
    id: 'WL-2026-001',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    talent: 'TechVision Agency',
    talentType: 'Agency',
    talentInitials: 'TV',
    talentRating: 4.9,
    status: 'active',
    paymentModel: 'Milestone',
    startDate: 'Feb 11, 2026',
    endDate: 'Jul 25, 2026',
    totalValue: 42000,
    paid: 0,
    remaining: 42000,
    escrowLocked: 42000,
    milestones: 4,
    milestonesCompleted: 0,
    currentMilestone: 'Milestone 1 — Discovery & Design',
    signedDate: 'Feb 10, 2026',
    tags: ['Mobile App', 'React Native'],
  },
  {
    id: 'WL-2025-008',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    talent: 'John Smith',
    talentType: 'Freelancer',
    talentInitials: 'JS',
    talentRating: 4.8,
    status: 'completed',
    paymentModel: 'Milestone',
    startDate: 'Oct 5, 2025',
    endDate: 'Dec 20, 2025',
    totalValue: 18500,
    paid: 18500,
    remaining: 0,
    escrowLocked: 0,
    milestones: 3,
    milestonesCompleted: 3,
    currentMilestone: 'All milestones completed',
    signedDate: 'Oct 4, 2025',
    tags: ['Web Design', 'Shopify'],
    myRating: 5,
  },
  {
    id: 'WL-2025-005',
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    talent: 'CodeCraft Agency',
    talentType: 'Agency',
    talentInitials: 'CC',
    talentRating: 4.7,
    status: 'completed',
    paymentModel: 'Milestone',
    startDate: 'Jul 1, 2025',
    endDate: 'Sep 28, 2025',
    totalValue: 31000,
    paid: 31000,
    remaining: 0,
    escrowLocked: 0,
    milestones: 4,
    milestonesCompleted: 4,
    currentMilestone: 'All milestones completed',
    signedDate: 'Jun 30, 2025',
    tags: ['React', 'Django'],
    myRating: 4,
  },
  {
    id: 'WL-2025-011',
    project: 'AI Chatbot Integration',
    projectId: 4,
    talent: 'DevPro Solutions',
    talentType: 'Agency',
    talentInitials: 'DP',
    talentRating: 3.2,
    status: 'disputed',
    paymentModel: 'Milestone',
    startDate: 'Nov 10, 2025',
    endDate: 'Jan 30, 2026',
    totalValue: 14000,
    paid: 6000,
    remaining: 8000,
    escrowLocked: 8000,
    milestones: 3,
    milestonesCompleted: 1,
    currentMilestone: 'Milestone 2 — Disputed',
    signedDate: 'Nov 9, 2025',
    tags: ['AI', 'Python'],
  },
  {
    id: 'WL-2025-003',
    project: 'Company Brand Identity Design',
    projectId: 5,
    talent: 'Maria Chen',
    talentType: 'Freelancer',
    talentInitials: 'MC',
    talentRating: 5.0,
    status: 'completed',
    paymentModel: 'Fixed',
    startDate: 'May 15, 2025',
    endDate: 'Jun 20, 2025',
    totalValue: 8500,
    paid: 8500,
    remaining: 0,
    escrowLocked: 0,
    milestones: 2,
    milestonesCompleted: 2,
    currentMilestone: 'All milestones completed',
    signedDate: 'May 14, 2025',
    tags: ['Branding', 'Figma'],
    myRating: 5,
  },
  {
    id: 'WL-2026-002',
    project: 'Inventory Management System',
    projectId: 6,
    talent: 'QuickCode Labs',
    talentType: 'Agency',
    talentInitials: 'QC',
    talentRating: 3.8,
    status: 'cancelled',
    paymentModel: 'Milestone',
    startDate: 'Jan 2, 2026',
    endDate: 'Apr 15, 2026',
    totalValue: 22000,
    paid: 0,
    remaining: 0,
    escrowLocked: 0,
    milestones: 5,
    milestonesCompleted: 0,
    currentMilestone: 'Cancelled before work began',
    signedDate: 'Jan 1, 2026',
    tags: ['ERP', 'Python'],
  },
];

const STATS = [
  { label: 'Total Contracts', value: '6',          icon: FileText,  color: 'blue',  sub: '1 active' },
  { label: 'Total Value',     value: '$1,36,000',   icon: DollarSign,color: 'green', sub: 'All contracts' },
  { label: 'Escrow Locked',   value: '$42,000',     icon: Lock,      color: 'navy',  sub: 'Protected funds' },
  { label: 'Completed',       value: '3',           icon: CheckCircle,color: 'teal', sub: 'Successfully closed' },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function getStatusCfg(status) {
  switch (status) {
    case 'active':    return { label: 'Active',    cls: 'bg-emerald-50 text-emerald-700 border border-emerald-200', dot: 'bg-emerald-500', pulse: true };
    case 'completed': return { label: 'Completed', cls: 'bg-blue-50 text-blue-700 border border-blue-200',         dot: 'bg-blue-500',    pulse: false };
    case 'disputed':  return { label: 'Disputed',  cls: 'bg-red-50 text-red-700 border border-red-200',           dot: 'bg-red-500',     pulse: false };
    case 'cancelled': return { label: 'Cancelled', cls: 'bg-gray-100 text-gray-500 border border-gray-200',       dot: 'bg-gray-400',    pulse: false };
    default:          return { label: status,      cls: 'bg-gray-100 text-gray-500 border border-gray-200',       dot: 'bg-gray-400',    pulse: false };
  }
}

function getStatGradient(color) {
  const map = {
    blue:  'from-blue-500 to-blue-700',
    green: 'from-green-500 to-emerald-600',
    navy:  'from-[#1a3a5c] to-[#0d2137]',
    teal:  'from-teal-500 to-cyan-600',
  };
  return map[color] || 'from-gray-400 to-gray-600';
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientContracts() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [sortBy, setSortBy]             = useState('recent');
  const [openMenu, setOpenMenu]         = useState(null);
  const [selected, setSelected]         = useState(null); // contract id for detail drawer

  const filters = [
    { key: 'all',       label: 'All',       count: CONTRACTS.length },
    { key: 'active',    label: 'Active',    count: CONTRACTS.filter(c => c.status === 'active').length },
    { key: 'completed', label: 'Completed', count: CONTRACTS.filter(c => c.status === 'completed').length },
    { key: 'disputed',  label: 'Disputed',  count: CONTRACTS.filter(c => c.status === 'disputed').length },
    { key: 'cancelled', label: 'Cancelled', count: CONTRACTS.filter(c => c.status === 'cancelled').length },
  ];

  const filtered = CONTRACTS
    .filter(c => activeFilter === 'all' || c.status === activeFilter)
    .filter(c =>
      c.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.talent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent')  return b.id.localeCompare(a.id);
      if (sortBy === 'value')   return b.totalValue - a.totalValue;
      if (sortBy === 'paid')    return b.paid - a.paid;
      return 0;
    });

  const selectedContract = CONTRACTS.find(c => c.id === selected);

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/client/dashboard')}
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
            <button className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
              <Bell size={18} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
            </button>
            <button className="p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition">
              <Settings size={18} />
            </button>
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold ml-1">
              CL
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Page Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a5c]">My Contracts</h1>
            <p className="text-gray-400 text-sm mt-0.5">All signed agreements between you and your talent.</p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STATS.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div key={i} className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 flex items-center gap-4">
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

        {/* ── Search + Filter + Sort ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by project, talent or contract ID..."
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
              <option value="value">Value (High → Low)</option>
              <option value="paid">Amount Paid</option>
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
        </div>

        {/* ── Main layout: list + drawer ── */}
        <div className={`flex gap-5 ${selectedContract ? 'items-start' : ''}`}>

          {/* ── Contract Cards ── */}
          <div className={`space-y-4 ${selectedContract ? 'flex-1 min-w-0' : 'w-full'}`}>
            {filtered.length === 0 && (
              <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 text-center">
                <FileText size={36} className="text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500 font-medium">No contracts found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
              </div>
            )}

            {filtered.map(contract => {
              const cfg = getStatusCfg(contract.status);
              const isSelected = selected === contract.id;
              const paidPercent = contract.totalValue > 0
                ? Math.round((contract.paid / contract.totalValue) * 100)
                : 0;

              return (
                <div
                  key={contract.id}
                  className={`bg-white rounded-xl border shadow-sm hover:shadow-md transition-shadow overflow-hidden ${
                    isSelected ? 'border-blue-400 ring-2 ring-blue-100' : 'border-gray-200'
                  }`}
                >
                  {/* Status accent top bar */}
                  {contract.status === 'active'    && <div className="h-[3px] bg-gradient-to-r from-green-400 to-blue-600" />}
                  {contract.status === 'disputed'  && <div className="h-[3px] bg-gradient-to-r from-orange-400 to-red-500" />}
                  {contract.status === 'completed' && <div className="h-[3px] bg-gradient-to-r from-blue-400 to-blue-600" />}

                  <div className="p-5">
                    <div className="flex flex-col sm:flex-row gap-4">

                      {/* Avatar */}
                      <div className="flex-shrink-0">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm shadow-sm">
                          {contract.talentInitials}
                        </div>
                      </div>

                      {/* Main info */}
                      <div className="flex-1 min-w-0">

                        {/* Contract ID + status */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-xs font-mono font-bold text-gray-400">{contract.id}</span>
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} ${cfg.pulse ? 'animate-pulse' : ''}`} />
                            {cfg.label}
                          </span>
                          {contract.status === 'disputed' && (
                            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full font-semibold border border-red-200">
                              ⚠ Admin Reviewing
                            </span>
                          )}
                        </div>

                        {/* Project name */}
                        <h2 className="text-[15px] font-bold text-[#1a3a5c] mb-1">{contract.project}</h2>

                        {/* Talent */}
                        <p className="text-sm text-gray-500 mb-3">
                          <span className="font-semibold text-gray-700">{contract.talent}</span>
                          {' '}· {contract.talentType}
                          {' '}· ⭐ {contract.talentRating}
                          {' '}· {contract.paymentModel}
                        </p>

                        {/* Payment progress bar */}
                        {contract.status !== 'cancelled' && (
                          <div className="mb-3">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-xs text-gray-400">
                                {contract.milestonesCompleted}/{contract.milestones} milestones · {contract.currentMilestone}
                              </span>
                              <span className="text-xs font-bold text-[#1a3a5c]">{paidPercent}% paid</span>
                            </div>
                            <div className="w-full bg-gray-100 rounded-full h-1.5">
                              <div
                                className={`h-1.5 rounded-full ${
                                  contract.status === 'disputed'
                                    ? 'bg-gradient-to-r from-orange-400 to-red-500'
                                    : contract.status === 'completed'
                                    ? 'bg-gradient-to-r from-blue-400 to-blue-600'
                                    : 'bg-gradient-to-r from-green-400 to-blue-600'
                                }`}
                                style={{ width: `${paidPercent}%` }}
                              />
                            </div>
                          </div>
                        )}

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5">
                          {contract.tags.map((tag, i) => (
                            <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Right panel */}
                      <div className="flex flex-col items-end gap-3 flex-shrink-0 sm:min-w-[180px]">

                        {/* Value */}
                        <div className="text-right">
                          <p className="text-lg font-bold text-[#1a3a5c]">${contract.totalValue.toLocaleString()}</p>
                          <p className="text-xs text-gray-400">
                            ${contract.paid.toLocaleString()} paid
                            {contract.escrowLocked > 0 && (
                              <span className="ml-1 text-emerald-600 font-semibold">
                                · ${contract.escrowLocked.toLocaleString()} locked
                              </span>
                            )}
                          </p>
                        </div>

                        {/* Dates */}
                        <div className="text-right text-xs text-gray-400 space-y-0.5">
                          <div className="flex items-center gap-1 justify-end">
                            <Calendar size={11} />
                            <span>Signed {contract.signedDate}</span>
                          </div>
                          <div className="flex items-center gap-1 justify-end">
                            <Clock size={11} />
                            <span>{contract.startDate} → {contract.endDate}</span>
                          </div>
                        </div>

                        {/* My rating */}
                        {contract.myRating && (
                          <div className="flex items-center gap-0.5 bg-amber-50 border border-amber-200 px-2 py-1 rounded-lg">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                size={11}
                                className={i < contract.myRating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}
                              />
                            ))}
                            <span className="text-xs text-amber-700 font-medium ml-1">You rated</span>
                          </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelected(isSelected ? null : contract.id)}
                            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-lg transition ${
                              isSelected
                                ? 'bg-blue-600 text-white'
                                : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                            }`}
                          >
                            <Eye size={12} />
                            {isSelected ? 'Close' : 'View'}
                          </button>
                          <button
                            onClick={() => navigate(`/hire-talent/projects/${contract.projectId}`)}
                            className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition"
                            style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                          >
                            Project <ChevronRight size={12} />
                          </button>

                          {/* 3-dot menu */}
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenu(openMenu === contract.id ? null : contract.id)}
                              className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                            >
                              <MoreVertical size={15} />
                            </button>
                            {openMenu === contract.id && (
                              <div className="absolute right-0 top-8 bg-white border border-gray-200 rounded-xl shadow-lg py-1 z-20 w-44">
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <Download size={13} className="text-gray-400" /> Download PDF
                                </button>
                                <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2">
                                  <FileText size={13} className="text-gray-400" /> View Invoice
                                </button>
                                {contract.status === 'active' && (
                                  <button className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2">
                                    <AlertCircle size={13} className="text-red-400" /> Raise Dispute
                                  </button>
                                )}
                                {contract.status === 'completed' && !contract.myRating && (
                                  <button className="w-full text-left px-4 py-2 text-sm text-amber-700 hover:bg-amber-50 flex items-center gap-2">
                                    <Star size={13} className="text-amber-400" /> Leave Review
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

          {/* ── Contract Detail Drawer ── */}
          {selectedContract && (
            <div className="w-80 flex-shrink-0 bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
              {/* Drawer header */}
              <div className="h-[3px] bg-gradient-to-r from-green-400 to-blue-600" />
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono font-bold text-gray-400">{selectedContract.id}</p>
                  <p className="text-sm font-bold text-[#1a3a5c]">Contract Details</p>
                </div>
                <button
                  onClick={() => setSelected(null)}
                  className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
                >
                  <XCircle size={16} />
                </button>
              </div>

              <div className="p-4 space-y-4 overflow-y-auto" style={{ maxHeight: 'calc(100vh - 200px)' }}>

                {/* Project + talent */}
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {selectedContract.talentInitials}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-[#1a3a5c]">{selectedContract.project}</p>
                    <p className="text-xs text-gray-500">{selectedContract.talent} · {selectedContract.talentType}</p>
                  </div>
                </div>

                {/* Status */}
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                  <span className="text-xs text-gray-500 font-medium">Status</span>
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${getStatusCfg(selectedContract.status).cls}`}>
                    {getStatusCfg(selectedContract.status).label}
                  </span>
                </div>

                {/* Financial breakdown */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Financials</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Contract Value', value: `$${selectedContract.totalValue.toLocaleString()}`, bold: true },
                      { label: 'Amount Paid',    value: `$${selectedContract.paid.toLocaleString()}`,       color: 'text-green-600' },
                      { label: 'Remaining',      value: `$${selectedContract.remaining.toLocaleString()}`,  color: 'text-amber-600' },
                      { label: 'Escrow Locked',  value: `$${selectedContract.escrowLocked.toLocaleString()}`, color: 'text-blue-600' },
                      { label: 'Payment Model',  value: selectedContract.paymentModel },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <span className={`text-xs font-semibold ${row.color || 'text-[#1a3a5c]'}`}>{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Milestones */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Milestones</p>
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                    <span className="text-xs text-gray-500">Progress</span>
                    <span className="text-xs font-bold text-[#1a3a5c]">
                      {selectedContract.milestonesCompleted}/{selectedContract.milestones} completed
                    </span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div
                      className="h-2 rounded-full bg-gradient-to-r from-green-400 to-blue-600"
                      style={{ width: `${(selectedContract.milestonesCompleted / selectedContract.milestones) * 100}%` }}
                    />
                  </div>
                </div>

                {/* Dates */}
                <div>
                  <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Timeline</p>
                  <div className="space-y-2">
                    {[
                      { label: 'Signed',    value: selectedContract.signedDate },
                      { label: 'Started',   value: selectedContract.startDate },
                      { label: 'End Date',  value: selectedContract.endDate },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <span className="text-xs font-semibold text-[#1a3a5c]">{row.value}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Escrow protection */}
                {selectedContract.escrowLocked > 0 && (
                  <div className="flex items-start gap-2.5 p-3 bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 rounded-xl">
                    <Shield size={14} className="text-blue-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-600">
                      <span className="font-semibold text-[#1a3a5c]">${selectedContract.escrowLocked.toLocaleString()}</span> is safely locked in escrow. Released only on your milestone approval.
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="space-y-2 pt-1">
                  <button
                    onClick={() => navigate(`/hire-talent/projects/${selectedContract.projectId}`)}
                    className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                  >
                    View Project <ChevronRight size={14} />
                  </button>
                  <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                    <Download size={14} /> Download Contract PDF
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}