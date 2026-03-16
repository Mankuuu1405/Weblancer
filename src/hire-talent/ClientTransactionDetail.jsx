import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  CheckCircle,
  DollarSign,
  Calendar,
  Shield,
  Download,
  FileText,
  Clock,
  ArrowUpRight,
  ArrowDownLeft,
  ExternalLink,
} from 'lucide-react';

/* ─────────────────────────────────────
   MOCK DATA — same as ClientPayments
───────────────────────────────────────*/
const TRANSACTIONS = {
  'TXN-2026-001': {
    id: 'TXN-2026-001',
    invoiceNo: 'INV-2026-001',
    label: 'Project Payment',
    project: 'Food Delivery Mobile App',
    projectId: 1,
    talent: 'TechVision Agency',
    talentType: 'Agency',
    talentInitials: 'TV',
    type: 'escrow',
    amount: 42000,
    platformFee: 2520,
    netAmount: 39480,
    direction: 'out',
    date: 'Feb 11, 2026',
    time: '10:02 AM',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
    paymentMethod: 'Credit Card •••• 4242',
    milestone: null,
    timeline: [
      { event: 'Payment initiated by client',        time: 'Feb 11, 2026 · 10:00 AM' },
      { event: 'Payment confirmed by gateway',       time: 'Feb 11, 2026 · 10:01 AM' },
      { event: 'Funds locked in escrow',             time: 'Feb 11, 2026 · 10:02 AM' },
      { event: 'TechVision Agency notified',         time: 'Feb 11, 2026 · 10:03 AM' },
    ],
  },
  'TXN-2025-018': {
    id: 'TXN-2025-018',
    invoiceNo: 'INV-2025-018',
    label: 'Payment Released to Talent',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    talent: 'John Smith',
    talentType: 'Freelancer',
    talentInitials: 'JS',
    type: 'released',
    amount: 18500,
    platformFee: 1110,
    netAmount: 17390,
    direction: 'out',
    date: 'Dec 20, 2025',
    time: '3:15 PM',
    status: 'completed',
    note: 'All milestones approved, full payment released to talent',
    paymentMethod: 'Escrow Release',
    milestone: 'Milestone 3 — Testing & Launch',
    timeline: [
      { event: 'Milestone 3 submitted by John Smith', time: 'Dec 18, 2025 · 2:00 PM' },
      { event: 'Client approved milestone 3',         time: 'Dec 20, 2025 · 3:10 PM' },
      { event: 'Escrow released to John Smith',       time: 'Dec 20, 2025 · 3:15 PM' },
      { event: 'Project marked as completed',         time: 'Dec 20, 2025 · 3:16 PM' },
    ],
  },
  'TXN-2025-017': {
    id: 'TXN-2025-017',
    invoiceNo: 'INV-2025-017',
    label: 'Refund Received',
    project: 'AI Chatbot Integration',
    projectId: 4,
    talent: 'DevPro Solutions',
    talentType: 'Agency',
    talentInitials: 'DP',
    type: 'refund',
    amount: 1500,
    platformFee: 0,
    netAmount: 1500,
    direction: 'in',
    date: 'Dec 5, 2025',
    time: '11:30 AM',
    status: 'completed',
    note: 'Partial refund issued after dispute resolution by admin',
    paymentMethod: 'Refund to original payment method',
    milestone: 'Milestone 2 — Core Development',
    timeline: [
      { event: 'Dispute raised by client',            time: 'Nov 20, 2025 · 10:30 AM' },
      { event: 'Admin reviewed dispute',              time: 'Nov 25, 2025 · 2:00 PM' },
      { event: 'Partial refund decision made',        time: 'Dec 5, 2025 · 11:00 AM' },
      { event: '$1,500 refunded to client',           time: 'Dec 5, 2025 · 11:30 AM' },
    ],
  },
  'TXN-2025-012': {
    id: 'TXN-2025-012',
    invoiceNo: 'INV-2025-012',
    label: 'Payment Released to Talent',
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    talent: 'CodeCraft Agency',
    talentType: 'Agency',
    talentInitials: 'CC',
    type: 'released',
    amount: 31000,
    platformFee: 1860,
    netAmount: 29140,
    direction: 'out',
    date: 'Sep 28, 2025',
    time: '5:00 PM',
    status: 'completed',
    note: 'All 4 milestones approved and project closed',
    paymentMethod: 'Escrow Release',
    milestone: 'Milestone 4 — Testing & Launch',
    timeline: [
      { event: 'Milestone 4 submitted by CodeCraft',  time: 'Sep 26, 2025 · 1:00 PM' },
      { event: 'Client approved milestone 4',         time: 'Sep 28, 2025 · 4:50 PM' },
      { event: 'Escrow released to CodeCraft Agency', time: 'Sep 28, 2025 · 5:00 PM' },
      { event: 'Project marked as completed',         time: 'Sep 28, 2025 · 5:01 PM' },
    ],
  },
  'TXN-2025-006': {
    id: 'TXN-2025-006',
    invoiceNo: 'INV-2025-006',
    label: 'Project Payment',
    project: 'AI Chatbot Integration',
    projectId: 4,
    talent: 'DevPro Solutions',
    talentType: 'Agency',
    talentInitials: 'DP',
    type: 'escrow',
    amount: 14000,
    platformFee: 840,
    netAmount: 13160,
    direction: 'out',
    date: 'Nov 10, 2025',
    time: '9:00 AM',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
    paymentMethod: 'Credit Card •••• 4242',
    milestone: null,
    timeline: [
      { event: 'Payment initiated by client',        time: 'Nov 10, 2025 · 8:58 AM' },
      { event: 'Payment confirmed by gateway',       time: 'Nov 10, 2025 · 8:59 AM' },
      { event: 'Funds locked in escrow',             time: 'Nov 10, 2025 · 9:00 AM' },
      { event: 'DevPro Solutions notified',          time: 'Nov 10, 2025 · 9:01 AM' },
    ],
  },
  'TXN-2025-005': {
    id: 'TXN-2025-005',
    invoiceNo: 'INV-2025-005',
    label: 'Payment Released to Talent',
    project: 'Company Brand Identity Design',
    projectId: 5,
    talent: 'Maria Chen',
    talentType: 'Freelancer',
    talentInitials: 'MC',
    type: 'released',
    amount: 8500,
    platformFee: 510,
    netAmount: 7990,
    direction: 'out',
    date: 'Jun 20, 2025',
    time: '2:30 PM',
    status: 'completed',
    note: 'Both milestones approved, project completed',
    paymentMethod: 'Escrow Release',
    milestone: 'Milestone 2 — Final Delivery',
    timeline: [
      { event: 'Milestone 2 submitted by Maria Chen', time: 'Jun 18, 2025 · 10:00 AM' },
      { event: 'Client approved milestone 2',         time: 'Jun 20, 2025 · 2:25 PM' },
      { event: 'Escrow released to Maria Chen',       time: 'Jun 20, 2025 · 2:30 PM' },
      { event: 'Project marked as completed',         time: 'Jun 20, 2025 · 2:31 PM' },
    ],
  },
  'TXN-2025-004': {
    id: 'TXN-2025-004',
    invoiceNo: 'INV-2025-004',
    label: 'Project Payment',
    project: 'CRM Dashboard for Internal Team',
    projectId: 3,
    talent: 'CodeCraft Agency',
    talentType: 'Agency',
    talentInitials: 'CC',
    type: 'escrow',
    amount: 31000,
    platformFee: 1860,
    netAmount: 29140,
    direction: 'out',
    date: 'Jul 1, 2025',
    time: '11:00 AM',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
    paymentMethod: 'Net Banking',
    milestone: null,
    timeline: [
      { event: 'Payment initiated by client',        time: 'Jul 1, 2025 · 10:58 AM' },
      { event: 'Payment confirmed by gateway',       time: 'Jul 1, 2025 · 10:59 AM' },
      { event: 'Funds locked in escrow',             time: 'Jul 1, 2025 · 11:00 AM' },
      { event: 'CodeCraft Agency notified',          time: 'Jul 1, 2025 · 11:01 AM' },
    ],
  },
  'TXN-2025-003': {
    id: 'TXN-2025-003',
    invoiceNo: 'INV-2025-003',
    label: 'Project Payment',
    project: 'Company Brand Identity Design',
    projectId: 5,
    talent: 'Maria Chen',
    talentType: 'Freelancer',
    talentInitials: 'MC',
    type: 'escrow',
    amount: 8500,
    platformFee: 510,
    netAmount: 7990,
    direction: 'out',
    date: 'May 15, 2025',
    time: '10:00 AM',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
    paymentMethod: 'UPI',
    milestone: null,
    timeline: [
      { event: 'Payment initiated by client',  time: 'May 15, 2025 · 9:58 AM' },
      { event: 'Payment confirmed by gateway', time: 'May 15, 2025 · 9:59 AM' },
      { event: 'Funds locked in escrow',       time: 'May 15, 2025 · 10:00 AM' },
      { event: 'Maria Chen notified',          time: 'May 15, 2025 · 10:01 AM' },
    ],
  },
  'TXN-2025-001': {
    id: 'TXN-2025-001',
    invoiceNo: 'INV-2025-001',
    label: 'Project Payment',
    project: 'E-Commerce Website Redesign',
    projectId: 2,
    talent: 'John Smith',
    talentType: 'Freelancer',
    talentInitials: 'JS',
    type: 'escrow',
    amount: 18500,
    platformFee: 1110,
    netAmount: 17390,
    direction: 'out',
    date: 'Oct 5, 2025',
    time: '9:30 AM',
    status: 'completed',
    note: 'Funds locked in escrow before project start',
    paymentMethod: 'Credit Card •••• 4242',
    milestone: null,
    timeline: [
      { event: 'Payment initiated by client',  time: 'Oct 5, 2025 · 9:28 AM' },
      { event: 'Payment confirmed by gateway', time: 'Oct 5, 2025 · 9:29 AM' },
      { event: 'Funds locked in escrow',       time: 'Oct 5, 2025 · 9:30 AM' },
      { event: 'John Smith notified',          time: 'Oct 5, 2025 · 9:31 AM' },
    ],
  },
};

/* ─────────────────────────────────────
   HELPERS
───────────────────────────────────────*/
function getTypeCfg(type) {
  switch (type) {
    case 'escrow':   return { label: 'Escrow',   bg: 'bg-emerald-50', border: 'border-emerald-200', text: 'text-emerald-700', icon: Shield,         iconBg: 'bg-emerald-100', iconColor: 'text-emerald-600' };
    case 'released': return { label: 'Released', bg: 'bg-blue-50',    border: 'border-blue-200',    text: 'text-blue-700',    icon: ArrowUpRight,   iconBg: 'bg-blue-100',    iconColor: 'text-blue-600' };
    case 'refund':   return { label: 'Refund',   bg: 'bg-amber-50',   border: 'border-amber-200',   text: 'text-amber-700',   icon: ArrowDownLeft,  iconBg: 'bg-amber-100',   iconColor: 'text-amber-600' };
    default:         return { label: type,       bg: 'bg-gray-50',    border: 'border-gray-200',    text: 'text-gray-600',    icon: DollarSign,     iconBg: 'bg-gray-100',    iconColor: 'text-gray-500' };
  }
}

/* ─────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────*/
export default function ClientTransactionDetail() {
  const navigate = useNavigate();
  const { id } = useParams();

  const tx = TRANSACTIONS[id];

  // Not found
  if (!tx) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-500 font-semibold text-lg mb-2">Transaction not found</p>
          <button
            onClick={() => navigate('/hire-talent/payments')}
            className="text-blue-600 text-sm font-medium hover:underline"
          >
            ← Back to Payment History
          </button>
        </div>
      </div>
    );
  }

  const cfg = getTypeCfg(tx.type);
  const TypeIcon = cfg.icon;

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
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

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-5">

        {/* ── Invoice Header card ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="h-1 w-full bg-gradient-to-r from-green-400 to-blue-600" />
          <div className="p-6">

            {/* Top row */}
            <div className="flex items-start justify-between mb-6">
              <div>
                <p className="text-xs font-mono text-gray-400 mb-1">{tx.invoiceNo}</p>
                <h1 className="text-xl font-bold text-[#1a3a5c]">{tx.label}</h1>
                <div className="flex items-center gap-2 mt-2">
                  <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${cfg.bg} ${cfg.border} ${cfg.text}`}>
                    {cfg.label}
                  </span>
                  <span className="flex items-center gap-1 text-xs text-green-600 font-semibold">
                    <CheckCircle size={12} /> Completed
                  </span>
                </div>
              </div>
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${cfg.iconBg}`}>
                <TypeIcon size={26} className={cfg.iconColor} />
              </div>
            </div>

            {/* Amount breakdown */}
            <div className={`rounded-2xl border p-5 mb-5 ${cfg.bg} ${cfg.border}`}>
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm text-gray-500 font-medium">
                  {tx.type === 'refund' ? 'Refund Amount' : 'Amount Paid'}
                </p>
                <p className={`text-3xl font-bold ${cfg.text}`}>
                  {tx.direction === 'in' ? '+' : '-'}${tx.amount.toLocaleString()}
                </p>
              </div>

              {/* Escrow — simple note, no fee breakdown */}
              {tx.type === 'escrow' && (
                <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
                  <Shield size={13} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-emerald-700">
                    This amount is <strong>locked in escrow</strong> and will only be released to {tx.talent} after you approve each milestone. Your money is safe.
                  </p>
                </div>
              )}

              {/* Released — show full fee breakdown */}
              {tx.type === 'released' && (
                <div className="space-y-2 pt-3 border-t border-gray-200">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Amount from Escrow</span>
                    <span className="text-xs font-semibold text-[#1a3a5c]">${tx.amount.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-gray-500">Platform Fee (6%)</span>
                    <span className="text-xs font-semibold text-gray-500">- ${tx.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-gray-200">
                    <span className="text-xs font-bold text-[#1a3a5c]">Net Received by Talent</span>
                    <span className="text-xs font-bold text-[#1a3a5c]">${tx.netAmount.toLocaleString()}</span>
                  </div>
                </div>
              )}

              {/* Refund — simple note */}
              {tx.type === 'refund' && (
                <div className="flex items-start gap-2 pt-3 border-t border-gray-200">
                  <CheckCircle size={13} className="text-amber-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-amber-700">
                    This refund was issued after admin dispute resolution. No platform fee is charged on refunds.
                  </p>
                </div>
              )}
            </div>

            {/* Download button */}
            <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
              <Download size={15} /> Download Invoice PDF
            </button>
          </div>
        </div>

        {/* ── Transaction Details ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-[#1a3a5c] mb-4">Transaction Details</h3>
          <div className="space-y-3">
            {[
              { label: 'Transaction ID', value: tx.id, mono: true },
              { label: 'Invoice No',     value: tx.invoiceNo, mono: true },
              { label: 'Date & Time',    value: `${tx.date} · ${tx.time}` },
              { label: 'Payment Method', value: tx.paymentMethod },
              { label: 'Status',         value: 'Completed', green: true },
              ...(tx.milestone ? [{ label: 'Milestone', value: tx.milestone }] : []),
              { label: 'Note', value: tx.note },
            ].map((row, i) => (
              <div key={i} className="flex items-start justify-between py-2 border-b border-gray-100 last:border-0 gap-4">
                <span className="text-xs text-gray-400 font-medium flex-shrink-0">{row.label}</span>
                <span className={`text-xs text-right ${
                  row.mono  ? 'font-mono text-[#1a3a5c]' :
                  row.green ? 'text-green-600 font-semibold' :
                  'text-gray-700 font-medium'
                }`}>
                  {row.value}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Project & Talent ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-[#1a3a5c] mb-4">Project & Talent</h3>

          {/* Project */}
          <div
            onClick={() => navigate(`/hire-talent/projects/${tx.projectId}`)}
            className="flex items-center justify-between p-3 bg-gray-50 rounded-xl border border-gray-200 hover:bg-gray-100 cursor-pointer transition mb-3"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <FileText size={14} className="text-blue-600" />
              </div>
              <div>
                <p className="text-sm font-semibold text-[#1a3a5c]">{tx.project}</p>
                <p className="text-xs text-gray-400">View project details</p>
              </div>
            </div>
            <ExternalLink size={14} className="text-gray-400" />
          </div>

          {/* Talent */}
          <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-600 flex items-center justify-center text-white text-xs font-bold flex-shrink-0">
              {tx.talentInitials}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#1a3a5c]">{tx.talent}</p>
              <p className="text-xs text-gray-400">{tx.talentType}</p>
            </div>
          </div>
        </div>

        {/* ── Timeline ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-sm font-bold text-[#1a3a5c] mb-5">Transaction Timeline</h3>
          <div className="relative pl-6">
            <div className="absolute left-2.5 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-5">
              {tx.timeline.map((item, i) => (
                <div key={i} className="relative flex items-start gap-3">
                  <div
                    className="absolute -left-[19px] w-4 h-4 rounded-full border-2 border-white flex-shrink-0"
                    style={{ background: i === tx.timeline.length - 1 ? '#22c55e' : 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                  />
                  <div>
                    <p className="text-sm font-semibold text-[#1a3a5c]">{item.event}</p>
                    <p className="text-xs text-gray-400 mt-0.5 flex items-center gap-1">
                      <Clock size={10} /> {item.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Escrow protection note ── */}
        <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 rounded-2xl">
          <Shield size={16} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-[#1a3a5c]">Platform Protected Transaction</p>
            <p className="text-xs text-gray-500 mt-0.5">
              All transactions on WebLance are secured and logged. This record is permanent and cannot be altered.
              For any issues, contact <span className="text-blue-600 font-medium">support@weblance.com</span>
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}