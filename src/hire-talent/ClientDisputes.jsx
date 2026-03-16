import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  Search,
  AlertCircle,
  CheckCircle,
  Clock,
  XCircle,
  FileText,
  MessageSquare,
  Calendar,
  Shield,
  ChevronDown,
  ChevronUp,
  Flag,
  User,
  DollarSign,
  Info,
  MoreVertical,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK DATA
───────────────────────────────────────*/
const DISPUTES = [
  {
    id: 'DSP-2025-011',
    projectId: 4,
    project: 'AI Chatbot Integration',
    talent: 'DevPro Solutions',
    talentInitials: 'DP',
    talentType: 'Agency',
    status: 'under_review',
    raisedDate: 'Jan 15, 2026',
    lastUpdate: '2 hours ago',
    reason: 'Deliverable quality',
    description:
      'Milestone 2 deliverables were submitted but the core NLP integration is not working as agreed. The chatbot fails to understand basic intents and the accuracy is below 40% while the contract promised 85%+.',
    amountDisputed: 8000,
    milestone: 'Milestone 2 — Core Development',
    evidence: [
      { name: 'test_results.pdf', size: '1.2 MB' },
      { name: 'contract_clause.pdf', size: '0.8 MB' },
      { name: 'chatbot_demo_fail.mp4', size: '12 MB' },
    ],
    adminNote: 'We have reviewed your submission and have requested a detailed response from DevPro Solutions. Decision expected within 3 business days.',
    adminName: 'Sarah Johnson',
    timeline: [
      { event: 'Dispute raised by client', time: 'Jan 15, 2026 · 10:30 AM', type: 'raised' },
      { event: 'Evidence submitted (3 files)', time: 'Jan 15, 2026 · 10:45 AM', type: 'evidence' },
      { event: 'Admin notified & case opened', time: 'Jan 15, 2026 · 11:00 AM', type: 'admin' },
      { event: 'DevPro Solutions responded', time: 'Jan 16, 2026 · 2:00 PM', type: 'response' },
      { event: 'Admin reviewing both sides', time: 'Jan 17, 2026 · 9:00 AM', type: 'admin' },
    ],
  },
  {
    id: 'DSP-2025-004',
    projectId: 2,
    project: 'E-Commerce Website Redesign',
    talent: 'John Smith',
    talentInitials: 'JS',
    talentType: 'Freelancer',
    status: 'resolved',
    raisedDate: 'Nov 20, 2025',
    lastUpdate: 'Dec 5, 2025',
    reason: 'Missed deadline',
    description:
      'Freelancer missed the Milestone 2 deadline by 8 days without prior communication. Requested a partial refund for the delay.',
    amountDisputed: 3000,
    milestone: 'Milestone 2 — Development',
    evidence: [
      { name: 'contract_timeline.pdf', size: '0.5 MB' },
    ],
    adminNote: 'After reviewing both sides, we have decided a partial refund of $1,500 to the client and released $1,500 to the freelancer. Both parties agreed.',
    adminName: 'Sarah Johnson',
    resolution: 'Partial refund of $1,500 issued to client.',
    resolvedDate: 'Dec 5, 2025',
    outcome: 'partial_refund',
    timeline: [
      { event: 'Dispute raised by client', time: 'Nov 20, 2025', type: 'raised' },
      { event: 'Evidence submitted (1 file)', time: 'Nov 20, 2025', type: 'evidence' },
      { event: 'Admin reviewed case', time: 'Nov 25, 2025', type: 'admin' },
      { event: 'Partial refund decision made', time: 'Dec 5, 2025', type: 'resolved' },
      { event: 'Dispute closed', time: 'Dec 5, 2025', type: 'closed' },
    ],
  },
];

const STATS = [
  { label: 'Total Disputes',   value: '2',      color: 'blue',   icon: Flag },
  { label: 'Under Review',     value: '1',      color: 'yellow', icon: Clock },
  { label: 'Resolved',         value: '1',      color: 'green',  icon: CheckCircle },
  { label: 'Amount Disputed',  value: '$11,000', color: 'navy',   icon: DollarSign },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function getStatusCfg(status) {
  switch (status) {
    case 'under_review': return {
      label: 'Under Review',
      cls: 'bg-yellow-50 text-yellow-700 border border-yellow-200',
      dot: 'bg-yellow-500',
      icon: <Clock size={11} className="inline mr-1 text-yellow-600" />,
    };
    case 'resolved': return {
      label: 'Resolved',
      cls: 'bg-green-50 text-green-700 border border-green-200',
      dot: 'bg-green-500',
      icon: <CheckCircle size={11} className="inline mr-1 text-green-600" />,
    };
    case 'closed': return {
      label: 'Closed',
      cls: 'bg-gray-100 text-gray-500 border border-gray-200',
      dot: 'bg-gray-400',
      icon: <XCircle size={11} className="inline mr-1 text-gray-400" />,
    };
    default: return {
      label: status,
      cls: 'bg-gray-100 text-gray-500 border border-gray-200',
      dot: 'bg-gray-400',
      icon: null,
    };
  }
}

function getTimelineIcon(type) {
  switch (type) {
    case 'raised':   return <Flag size={13} className="text-white" />;
    case 'evidence': return <FileText size={13} className="text-white" />;
    case 'admin':    return <Shield size={13} className="text-white" />;
    case 'response': return <MessageSquare size={13} className="text-white" />;
    case 'resolved': return <CheckCircle size={13} className="text-white" />;
    case 'closed':   return <XCircle size={13} className="text-white" />;
    default:         return <Clock size={13} className="text-white" />;
  }
}

function getStatGradient(color) {
  const map = {
    blue:   'from-blue-500 to-blue-700',
    yellow: 'from-amber-400 to-orange-500',
    green:  'from-green-500 to-emerald-600',
    navy:   'from-[#1a3a5c] to-[#0d2137]',
  };
  return map[color] || 'from-gray-400 to-gray-600';
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientDisputes() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [expanded, setExpanded]         = useState(DISPUTES[0]?.id ?? null);
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [raiseForm, setRaiseForm]       = useState({ project: '', reason: '', description: '' });

  const filters = [
    { key: 'all',          label: 'All',          count: DISPUTES.length },
    { key: 'under_review', label: 'Under Review',  count: DISPUTES.filter(d => d.status === 'under_review').length },
    { key: 'resolved',     label: 'Resolved',      count: DISPUTES.filter(d => d.status === 'resolved').length },
    { key: 'closed',       label: 'Closed',        count: DISPUTES.filter(d => d.status === 'closed').length },
  ];

  const filtered = DISPUTES
    .filter(d => activeFilter === 'all' || d.status === activeFilter)
    .filter(d =>
      d.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.talent.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.id.toLowerCase().includes(searchQuery.toLowerCase())
    );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/hire-talent/dashboard')}
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
            <button
              onClick={() => navigate('/hire-talent/notifications?type=dispute')}
              className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
            >
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

      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* ── Heading ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-[#1a3a5c]">My Disputes</h1>
            <p className="text-gray-400 text-sm mt-0.5">Track status of all disputes you have raised.</p>
          </div>
          <button
            onClick={() => setShowRaiseModal(true)}
            className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition"
          >
            <Flag size={15} /> Raise New Dispute
          </button>
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
                <div>
                  <p className="text-xs text-gray-400 font-medium">{stat.label}</p>
                  <p className="text-lg font-bold text-[#1a3a5c]">{stat.value}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* ── Admin note ── */}
        <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
          <Info size={15} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-sm text-blue-700">
            All disputes are handled by our admin team. We aim to resolve disputes within <strong>5 business days</strong>. All decisions are final and binding. Evidence must be submitted within the platform.
          </p>
        </div>

        {/* ── Search + Filter ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <div className="relative mb-3">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by project, talent or dispute ID..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-0.5">
            {filters.map(f => (
              <button
                key={f.key}
                onClick={() => setActiveFilter(f.key)}
                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap border transition ${
                  activeFilter === f.key
                    ? 'text-white border-transparent shadow-sm'
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
        </div>

        {/* ── Dispute Cards ── */}
        <div className="space-y-4">
          {filtered.length === 0 && (
            <div className="bg-white rounded-xl border border-dashed border-gray-300 p-16 text-center">
              <Flag size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No disputes found</p>
              <p className="text-gray-400 text-sm mt-1">You have not raised any disputes yet.</p>
            </div>
          )}

          {filtered.map(dispute => {
            const cfg = getStatusCfg(dispute.status);
            const isOpen = expanded === dispute.id;

            return (
              <div
                key={dispute.id}
                className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden"
              >
                {/* Top accent */}
                {dispute.status === 'under_review' && (
                  <div className="h-[3px] bg-gradient-to-r from-orange-400 to-red-500" />
                )}
                {dispute.status === 'resolved' && (
                  <div className="h-[3px] bg-gradient-to-r from-green-400 to-blue-600" />
                )}

                {/* Card header — always visible */}
                <div className="p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">

                    {/* Avatar */}
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                      {dispute.talentInitials}
                    </div>

                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-1">
                        <span className="text-xs font-mono font-bold text-gray-400">{dispute.id}</span>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.cls}`}>
                          {cfg.icon}{cfg.label}
                        </span>
                      </div>
                      <h2 className="text-[15px] font-bold text-[#1a3a5c] mb-1">{dispute.project}</h2>
                      <p className="text-sm text-gray-500 mb-2">
                        <span className="font-semibold text-gray-700">{dispute.talent}</span>
                        {' '}· {dispute.talentType}
                        {' '}· {dispute.milestone}
                      </p>
                      <p className="text-sm text-gray-600 line-clamp-2">{dispute.description}</p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-3 flex-shrink-0 sm:min-w-[160px]">
                      <div className="text-right">
                        <p className="text-lg font-bold text-red-600">${dispute.amountDisputed.toLocaleString()}</p>
                        <p className="text-xs text-gray-400">Amount disputed</p>
                      </div>
                      <div className="text-right text-xs text-gray-400 space-y-0.5">
                        <div className="flex items-center gap-1 justify-end">
                          <Calendar size={11} />
                          <span>Raised {dispute.raisedDate}</span>
                        </div>
                        <div className="flex items-center gap-1 justify-end">
                          <Clock size={11} />
                          <span>Updated {dispute.lastUpdate}</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => navigate(`/hire-talent/projects/${dispute.projectId}`)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition"
                          style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                        >
                          View Project
                        </button>
                        <button
                          onClick={() => setExpanded(isOpen ? null : dispute.id)}
                          className="flex items-center gap-1 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-gray-100 border border-gray-200 rounded-lg hover:bg-gray-200 transition"
                        >
                          {isOpen ? <ChevronUp size={13} /> : <ChevronDown size={13} />}
                          {isOpen ? 'Less' : 'Details'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Expanded detail */}
                {isOpen && (
                  <div className="border-t border-gray-100 px-5 pb-5">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-5">

                      {/* Left: Admin note + evidence + resolution */}
                      <div className="space-y-4">

                        {/* Admin note */}
                        <div className="p-4 bg-blue-50 border border-blue-100 rounded-xl">
                          <div className="flex items-center gap-2 mb-2">
                            <Shield size={14} className="text-blue-600" />
                            <p className="text-xs font-bold text-blue-800">Admin Note</p>
                            <span className="text-xs text-blue-600 ml-auto">{dispute.adminName}</span>
                          </div>
                          <p className="text-sm text-blue-700 leading-relaxed">{dispute.adminNote}</p>
                        </div>

                        {/* Resolution */}
                        {dispute.resolution && (
                          <div className="p-4 bg-green-50 border border-green-200 rounded-xl">
                            <div className="flex items-center gap-2 mb-2">
                              <CheckCircle size={14} className="text-green-600" />
                              <p className="text-xs font-bold text-green-800">Resolution</p>
                              <span className="text-xs text-green-600 ml-auto">{dispute.resolvedDate}</span>
                            </div>
                            <p className="text-sm text-green-700">{dispute.resolution}</p>
                          </div>
                        )}

                        {/* Evidence */}
                        <div>
                          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">
                            Evidence Submitted ({dispute.evidence.length} files)
                          </p>
                          <div className="space-y-2">
                            {dispute.evidence.map((file, i) => (
                              <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                                  <FileText size={14} className="text-blue-500" />
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs font-semibold text-[#1a3a5c] truncate">{file.name}</p>
                                  <p className="text-xs text-gray-400">{file.size}</p>
                                </div>
                                <button className="text-xs text-blue-600 font-medium hover:underline flex-shrink-0">
                                  View
                                </button>
                              </div>
                            ))}
                          </div>

                          {/* Add more evidence — only if under review */}
                          {dispute.status === 'under_review' && (
                            <button className="mt-2 w-full py-2 text-xs font-medium text-gray-500 border border-dashed border-gray-300 rounded-xl hover:border-blue-400 hover:text-blue-600 transition">
                              + Add More Evidence
                            </button>
                          )}
                        </div>
                      </div>

                      {/* Right: Timeline */}
                      <div>
                        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-4">Dispute Timeline</p>
                        <div className="relative pl-6">
                          <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200" />
                          <div className="space-y-5">
                            {dispute.timeline.map((item, i) => (
                              <div key={i} className="relative flex items-start gap-3">
                                <div
                                  className="absolute -left-[19px] w-5 h-5 rounded-full flex items-center justify-center border-2 border-white flex-shrink-0"
                                  style={{ background: item.type === 'resolved' || item.type === 'closed'
                                    ? '#22c55e'
                                    : item.type === 'raised'
                                    ? '#ef4444'
                                    : item.type === 'admin'
                                    ? '#1d4ed8'
                                    : 'linear-gradient(135deg,#22c55e,#1d4ed8)'
                                  }}
                                >
                                  {getTimelineIcon(item.type)}
                                </div>
                                <div>
                                  <p className="text-sm font-semibold text-[#1a3a5c]">{item.event}</p>
                                  <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                                </div>
                              </div>
                            ))}

                            {/* Pending dot if under review */}
                            {dispute.status === 'under_review' && (
                              <div className="relative flex items-start gap-3">
                                <div className="absolute -left-[19px] w-5 h-5 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center flex-shrink-0 bg-white">
                                  <div className="w-1.5 h-1.5 rounded-full bg-gray-300 animate-pulse" />
                                </div>
                                <p className="text-xs text-gray-400 italic">Awaiting admin decision...</p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </main>

      {/* ── Raise New Dispute Modal ── */}
      {showRaiseModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">

            {/* Modal header */}
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-red-50 border border-red-200 flex items-center justify-center">
                  <Flag size={15} className="text-red-600" />
                </div>
                <h3 className="text-lg font-bold text-[#1a3a5c]">Raise a Dispute</h3>
              </div>
              <button
                onClick={() => setShowRaiseModal(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition"
              >
                <XCircle size={18} />
              </button>
            </div>

            {/* Admin notice */}
            <div className="flex items-start gap-2.5 p-3 bg-blue-50 border border-blue-100 rounded-xl mb-4">
              <Info size={13} className="text-blue-600 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-blue-700">
                Admin will be notified immediately. All disputes are reviewed within <strong>5 business days</strong>. Be clear and factual.
              </p>
            </div>

            {/* Project selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Select Project
              </label>
              <select
                value={raiseForm.project}
                onChange={e => setRaiseForm(f => ({ ...f, project: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-700"
              >
                <option value="">— Choose a project —</option>
                <option value="Food Delivery Mobile App">Food Delivery Mobile App</option>
                <option value="AI Chatbot Integration">AI Chatbot Integration</option>
                <option value="E-Commerce Website Redesign">E-Commerce Website Redesign</option>
              </select>
            </div>

            {/* Reason selector */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Reason
              </label>
              <select
                value={raiseForm.reason}
                onChange={e => setRaiseForm(f => ({ ...f, reason: e.target.value }))}
                className="w-full px-3 py-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-400 bg-white text-gray-700"
              >
                <option value="">— Select a reason —</option>
                <option value="Deliverable quality">Deliverable quality not as agreed</option>
                <option value="Missed deadline">Missed deadline</option>
                <option value="Incomplete work">Incomplete work submitted</option>
                <option value="No response">Talent not responding</option>
                <option value="Scope violation">Scope was changed without approval</option>
                <option value="Other">Other</option>
              </select>
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">
                Describe the Issue
              </label>
              <textarea
                rows={4}
                placeholder="Explain the problem clearly. Include what was agreed, what was delivered, and how it differs..."
                value={raiseForm.description}
                onChange={e => setRaiseForm(f => ({ ...f, description: e.target.value }))}
                className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none"
              />
              <p className="text-xs text-gray-400 mt-1">{raiseForm.description.length}/500 characters</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => { setShowRaiseModal(false); setRaiseForm({ project: '', reason: '', description: '' }); }}
                className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
              >
                Cancel
              </button>
              <button
                disabled={!raiseForm.project || !raiseForm.reason || !raiseForm.description.trim()}
                onClick={() => { setShowRaiseModal(false); setRaiseForm({ project: '', reason: '', description: '' }); }}
                className={`flex-1 py-2.5 text-white text-sm font-semibold rounded-xl transition ${
                  !raiseForm.project || !raiseForm.reason || !raiseForm.description.trim()
                    ? 'bg-gray-300 cursor-not-allowed'
                    : 'bg-red-600 hover:bg-red-700'
                }`}
              >
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}