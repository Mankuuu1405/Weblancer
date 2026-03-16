import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  DollarSign,
  Search,
  Download,
  CheckCircle,
  Calendar,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK DATA
───────────────────────────────────────*/
const TRANSACTIONS = [
  {
    id: 'TXN-2026-001',
    label: 'Escrow funded — Food Delivery Mobile App',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    type: 'escrow',
    amount: 42000,
    direction: 'out',
    date: 'Feb 11, 2026',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
  },
  {
    id: 'TXN-2025-018',
    label: 'Final payment — E-Commerce Website Redesign',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    type: 'released',
    amount: 18500,
    direction: 'out',
    date: 'Dec 20, 2025',
    status: 'completed',
    note: 'All milestones approved, full payment released',
  },
  {
    id: 'TXN-2025-017',
    label: 'Dispute refund — AI Chatbot Integration',
    project: 'AI Chatbot Integration',
    projectId: 4,
    type: 'refund',
    amount: 1500,
    direction: 'in',
    date: 'Dec 5, 2025',
    status: 'completed',
    note: 'Partial refund issued after dispute resolution',
  },
  {
    id: 'TXN-2025-012',
    label: 'Final payment — CRM Dashboard',
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    type: 'released',
    amount: 31000,
    direction: 'out',
    date: 'Sep 28, 2025',
    status: 'completed',
    note: 'All 4 milestones approved and closed',
  },
  {
    id: 'TXN-2025-006',
    label: 'Escrow funded — AI Chatbot Integration',
    project: 'AI Chatbot Integration',
    projectId: 4,
    type: 'escrow',
    amount: 14000,
    direction: 'out',
    date: 'Nov 10, 2025',
    status: 'completed',
    note: 'Funds locked before project start',
  },
  {
    id: 'TXN-2025-005',
    label: 'Final payment — Brand Identity Design',
    project: 'Company Brand Identity Design',
    projectId: 5,
    type: 'released',
    amount: 8500,
    direction: 'out',
    date: 'Jun 20, 2025',
    status: 'completed',
    note: 'Both milestones approved',
  },
  {
    id: 'TXN-2025-004',
    label: 'Escrow funded — CRM Dashboard',
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    type: 'escrow',
    amount: 31000,
    direction: 'out',
    date: 'Jul 1, 2025',
    status: 'completed',
    note: 'Funds locked before project start',
  },
  {
    id: 'TXN-2025-003',
    label: 'Escrow funded — Brand Identity Design',
    project: 'Company Brand Identity Design',
    projectId: 5,
    type: 'escrow',
    amount: 8500,
    direction: 'out',
    date: 'May 15, 2025',
    status: 'completed',
    note: 'Funds locked before project start',
  },
  {
    id: 'TXN-2025-001',
    label: 'Escrow funded — E-Commerce Redesign',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    type: 'escrow',
    amount: 18500,
    direction: 'out',
    date: 'Oct 5, 2025',
    status: 'completed',
    note: 'Funds locked before project start',
  },
];

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function getTypeCfg(type) {
  switch (type) {
    case 'escrow':   return { label: 'Escrow',   bg: 'bg-emerald-100', color: 'text-emerald-600', badge: 'bg-emerald-50 text-emerald-700 border border-emerald-200' };
    case 'released': return { label: 'Released', bg: 'bg-blue-100',    color: 'text-blue-600',    badge: 'bg-blue-50 text-blue-700 border border-blue-200' };
    case 'refund':   return { label: 'Refund',   bg: 'bg-amber-100',   color: 'text-amber-600',   badge: 'bg-amber-50 text-amber-700 border border-amber-200' };
    default:         return { label: type,       bg: 'bg-gray-100',    color: 'text-gray-500',    badge: 'bg-gray-100 text-gray-500' };
  }
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientPayments() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');
  const [searchQuery, setSearchQuery]   = useState('');
  const [sortBy, setSortBy]             = useState('recent');

  const filters = [
    { key: 'all',      label: 'All',      count: TRANSACTIONS.length },
    { key: 'escrow',   label: 'Escrow',   count: TRANSACTIONS.filter(t => t.type === 'escrow').length },
    { key: 'released', label: 'Released', count: TRANSACTIONS.filter(t => t.type === 'released').length },
    { key: 'refund',   label: 'Refunds',  count: TRANSACTIONS.filter(t => t.type === 'refund').length },
  ];

  const filtered = TRANSACTIONS
    .filter(t => activeFilter === 'all' || t.type === activeFilter)
    .filter(t =>
      t.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === 'recent') return b.id.localeCompare(a.id);
      if (sortBy === 'highest') return b.amount - a.amount;
      if (sortBy === 'lowest')  return a.amount - b.amount;
      return 0;
    });

  const totalFiltered = filtered.reduce((sum, t) =>
    t.direction === 'out' ? sum - t.amount : sum + t.amount, 0
  );

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
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
            <button
              onClick={() => navigate('/hire-talent/notifications')}
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
            <h1 className="text-2xl font-bold text-[#1a3a5c]">Payment History</h1>
            <p className="text-gray-400 text-sm mt-0.5">All transactions across your projects.</p>
          </div>
          <button className="self-start sm:self-auto flex items-center gap-2 px-4 py-2 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition shadow-sm">
            <Download size={15} /> Export CSV
          </button>
        </div>

        {/* ── Search + Sort + Filter ── */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-4 mb-5">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search by project, transaction ID..."
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
              <option value="highest">Highest Amount</option>
              <option value="lowest">Lowest Amount</option>
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

        {/* ── Transactions List ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">

          {/* Table header */}
          <div className="hidden sm:grid grid-cols-12 gap-4 px-5 py-3 bg-gray-50 border-b border-gray-200 text-xs font-semibold text-gray-400 uppercase tracking-wide">
            <div className="col-span-1">Type</div>
            <div className="col-span-4">Description</div>
            <div className="col-span-3">Project</div>
            <div className="col-span-2">Date</div>
            <div className="col-span-2 text-right">Amount</div>
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="p-16 text-center">
              <DollarSign size={36} className="text-gray-300 mx-auto mb-3" />
              <p className="text-gray-500 font-medium">No transactions found</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          )}

          {/* Rows */}
          <div className="divide-y divide-gray-100">
            {filtered.map((tx, i) => {
              const cfg = getTypeCfg(tx.type);
              return (
                <div
                  key={tx.id}
                  onClick={() => navigate(`/hire-talent/payments/${tx.id}`)}
                  className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-5 py-4 hover:bg-gray-50 transition items-center cursor-pointer"
                >
                  {/* Type icon */}
                  <div className="sm:col-span-1 flex items-center gap-2 sm:block">
                    <div className={`w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.bg}`}>
                      <DollarSign size={16} className={cfg.color} />
                    </div>
                  </div>

                  {/* Description */}
                  <div className="sm:col-span-4 min-w-0">
                    <p className="text-sm font-semibold text-[#1a3a5c] truncate">{tx.label}</p>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.badge}`}>
                        {cfg.label}
                      </span>
                      <span className="text-xs font-mono text-gray-400">{tx.id}</span>
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5">{tx.note}</p>
                  </div>

                  {/* Project */}
                  <div className="sm:col-span-3">
                    <button
                      onClick={() => navigate(`/hire-talent/projects/${tx.projectId}`)}
                      className="text-xs text-blue-600 font-medium hover:underline text-left"
                    >
                      {tx.project}
                    </button>
                  </div>

                  {/* Date */}
                  <div className="sm:col-span-2">
                    <div className="flex items-center gap-1 text-xs text-gray-400">
                      <Calendar size={11} />
                      <span>{tx.date}</span>
                    </div>
                    <div className="flex items-center gap-1 mt-0.5">
                      <CheckCircle size={11} className="text-green-500" />
                      <span className="text-xs text-green-600 font-medium">Completed</span>
                    </div>
                  </div>

                  {/* Amount */}
                  <div className="sm:col-span-2 sm:text-right">
                    <p className={`text-base font-bold ${
                      tx.direction === 'in' ? 'text-amber-600' : 'text-[#1a3a5c]'
                    }`}>
                      {tx.direction === 'in' ? '+' : '-'}${tx.amount.toLocaleString()}
                    </p>
                    <button className="text-xs text-gray-400 hover:text-blue-600 transition flex items-center gap-1 sm:ml-auto mt-0.5">
                      <Download size={11} /> Invoice
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Footer total */}
          {filtered.length > 0 && (
            <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-t border-gray-200">
              <p className="text-sm text-gray-500 font-medium">
                {filtered.length} transaction{filtered.length !== 1 ? 's' : ''}
              </p>
              <div className="text-right">
                <p className="text-xs text-gray-400 mb-0.5">Net Total</p>
                <p className={`text-lg font-bold ${totalFiltered >= 0 ? 'text-emerald-600' : 'text-[#1a3a5c]'}`}>
                  {totalFiltered >= 0 ? '+' : '-'}${Math.abs(totalFiltered).toLocaleString()}
                </p>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}