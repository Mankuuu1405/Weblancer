import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
  ArrowLeft,
  Bell,
  Settings,
  MessageSquare,
  FileText,
  Phone,
  CheckCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Calendar,
  Shield,
  Download,
  ChevronDown,
  ChevronUp,
  Users,
  Flag,
  Eye,
  ThumbsUp,
  RotateCcw,
  XCircle,
  Info,
  Zap,
  Award,
  Star,
} from 'lucide-react';

/* ── MOCK DATA ── */
const PROJECT = {
  id: 1,
  title: 'Food Delivery Mobile App',
  status: 'active',
  progress: 40,
  daysAhead: 3,
  startDate: 'Feb 11, 2026',
  deadline: 'Jul 25, 2026',
  budget: 42000,
  spent: 8400,
  escrow: 42000,
  released: 0,
  commission: 6,
  tags: ['Mobile App', 'React Native', 'UI/UX', 'Node.js'],
  description:
    'A full-featured food delivery platform for a city-wide restaurant network. Customers can browse restaurants, order meals, track delivery in real-time, and pay securely. Restaurants get an admin panel to manage orders and menus.',
  talent: {
    name: 'TechVision Agency',
    type: 'Agency',
    initials: 'TV',
    rating: 4.9,
    totalProjects: 47,
    disputes: 0,
    responseTime: '< 2 hours',
    location: 'Mumbai, India',
    members: [
      { name: 'Arjun Mehta', role: 'Project Manager', initials: 'AM' },
      { name: 'Priya Shah', role: 'Lead Developer', initials: 'PS' },
      { name: 'Ravi Kumar', role: 'UI/UX Designer', initials: 'RK' },
      { name: 'Neha Joshi', role: 'QA Engineer', initials: 'NJ' },
    ],
  },
  manager: {
    name: 'Sarah Johnson',
    role: 'Project Success Manager',
    initials: 'SJ',
    responseTime: '< 4 hours',
  },
  milestones: [
    {
      id: 1,
      title: 'Discovery & Design',
      weeks: 3,
      amount: 8400,
      percent: 20,
      status: 'in_review',
      dueDate: 'Mar 11, 2026',
      deliverables: [
        { name: 'Complete wireframes', done: true },
        { name: 'High-fidelity UI designs', done: true },
        { name: 'Technical architecture document', done: true },
        { name: 'API design specification', done: false },
      ],
    },
    {
      id: 2,
      title: 'Core Development',
      weeks: 12,
      amount: 21000,
      percent: 50,
      status: 'pending',
      dueDate: 'May 20, 2026',
      deliverables: [
        { name: 'User app (iOS + Android)', done: false },
        { name: 'Restaurant admin panel (web)', done: false },
        { name: 'Payment integration', done: false },
        { name: 'Core backend APIs', done: false },
      ],
    },
    {
      id: 3,
      title: 'Advanced Features',
      weeks: 6,
      amount: 8820,
      percent: 21,
      status: 'pending',
      dueDate: 'Jul 1, 2026',
      deliverables: [
        { name: 'Real-time tracking', done: false },
        { name: 'Push notifications', done: false },
        { name: 'Performance optimization', done: false },
      ],
    },
    {
      id: 4,
      title: 'Testing & Launch',
      weeks: 2,
      amount: 3780,
      percent: 9,
      status: 'pending',
      dueDate: 'Jul 25, 2026',
      deliverables: [
        { name: 'Full QA testing report', done: false },
        { name: 'App store submission', done: false },
        { name: 'Production deployment', done: false },
      ],
    },
  ],
  files: [
    { name: 'Wireframes_v1.pdf', size: '2.4 MB', uploadedBy: 'Priya Shah', time: '2 hours ago', status: 'in_review' },
    { name: 'Requirements_Doc.docx', size: '1.1 MB', uploadedBy: 'Arjun Mehta', time: '3 days ago', status: 'approved' },
    { name: 'Design_System.fig', size: '8.2 MB', uploadedBy: 'Ravi Kumar', time: '1 hour ago', status: 'new' },
    { name: 'Tech_Architecture.pdf', size: '3.7 MB', uploadedBy: 'Priya Shah', time: '1 day ago', status: 'approved' },
  ],
  messages: [
    { id: 1, sender: 'Arjun Mehta', role: 'PM', type: 'blue', initials: 'AM', time: '10:30 AM', text: 'Good morning! We have uploaded the wireframes for Milestone 1. Please review and share your feedback.', isSystem: false },
    { id: 2, sender: 'System', role: 'system', type: 'system', initials: '⚙', time: '10:31 AM', text: 'Wireframes_v1.pdf has been uploaded and linked to Milestone 1 — Discovery & Design.', isSystem: true },
    { id: 3, sender: 'You', role: 'client', type: 'green', initials: 'CL', time: '11:15 AM', text: 'Thanks! I will review them today and get back to you.', isSystem: false },
    { id: 4, sender: 'Sarah Johnson', role: 'Admin', type: 'red', initials: 'SJ', time: '11:45 AM', text: 'Great progress on Milestone 1! You are 3 days ahead of schedule. Keep it up.', isSystem: false },
    { id: 5, sender: 'Ravi Kumar', role: 'Designer', type: 'yellow', initials: 'RK', time: '2:00 PM', text: 'I have also uploaded the Design System file. It includes all color variables, typography and component specs.', isSystem: false },
  ],
  timeline: [
    { event: 'Escrow funded — $44,100', time: '3 days ago', icon: 'money' },
    { event: 'Project started & team assigned', time: '2 days ago', icon: 'start' },
    { event: 'Kickoff meeting completed', time: 'Yesterday', icon: 'meeting' },
    { event: 'Requirements_Doc.docx approved', time: '1 day ago', icon: 'file' },
    { event: 'Design_System.fig uploaded', time: '1 hour ago', icon: 'file' },
    { event: 'Wireframes_v1.pdf submitted for review', time: '2 hours ago', icon: 'review' },
  ],
};

/* ── HELPERS ── */
function getMilestoneStatus(status) {
  switch (status) {
    case 'completed': return { label: 'Completed', cls: 'bg-blue-50 text-blue-700 border border-blue-200' };
    case 'in_review': return { label: 'In Review', cls: 'bg-yellow-50 text-yellow-700 border border-yellow-200' };
    case 'approved':  return { label: 'Approved',  cls: 'bg-green-50 text-green-700 border border-green-200' };
    default:          return { label: 'Pending',   cls: 'bg-gray-100 text-gray-500 border border-gray-200' };
  }
}

function getFileStatusCls(status) {
  switch (status) {
    case 'approved':  return 'bg-green-50 text-green-700 border border-green-200';
    case 'in_review': return 'bg-yellow-50 text-yellow-700 border border-yellow-200';
    case 'new':       return 'bg-blue-50 text-blue-700 border border-blue-200';
    default:          return 'bg-gray-100 text-gray-500';
  }
}

function getMsgStyle(type) {
  switch (type) {
    case 'red':    return { bubble: 'bg-red-50 border border-red-100',     name: 'text-red-700',    avatar: 'from-red-400 to-red-600' };
    case 'blue':   return { bubble: 'bg-blue-50 border border-blue-100',   name: 'text-blue-700',   avatar: 'from-blue-400 to-blue-600' };
    case 'yellow': return { bubble: 'bg-amber-50 border border-amber-100', name: 'text-amber-700',  avatar: 'from-amber-400 to-orange-500' };
    case 'green':  return { bubble: 'bg-green-50 border border-green-100', name: 'text-green-700',  avatar: 'from-green-400 to-emerald-600' };
    default:       return { bubble: 'bg-gray-50 border border-gray-200',   name: 'text-gray-500',   avatar: 'from-gray-300 to-gray-500' };
  }
}

/* ── PROJECTS MAP ── */
const PROJECTS = {
  1: PROJECT,
  2: {
    ...PROJECT,
    id: 2,
    title: 'E-Commerce Website Redesign',
    status: 'completed',
    progress: 100,
    daysAhead: 0,
    startDate: 'Oct 5, 2025',
    deadline: 'Dec 20, 2025',
    budget: 18500,
    spent: 18500,
    escrow: 0,
    released: 18500,
    tags: ['Web Design', 'Shopify', 'SEO'],
    description: 'Complete redesign of an e-commerce website built on Shopify. Includes new UI/UX, product page optimization, checkout flow improvements, and SEO enhancements.',
    talent: { ...PROJECT.talent, name: 'John Smith', type: 'Freelancer', initials: 'JS', rating: 4.8, totalProjects: 23, location: 'Bangalore, India',
      members: [{ name: 'John Smith', role: 'Full Stack Developer', initials: 'JS' }] },
  },
  3: {
    ...PROJECT,
    id: 3,
    title: 'CRM Dashboard for Internal Team',
    status: 'completed',
    progress: 100,
    daysAhead: 0,
    startDate: 'Jul 1, 2025',
    deadline: 'Sep 28, 2025',
    budget: 31000,
    spent: 31000,
    escrow: 0,
    released: 31000,
    tags: ['React', 'Django', 'Analytics'],
    description: 'A custom CRM dashboard for managing internal sales team operations, lead tracking, pipeline management, and performance analytics.',
    talent: { ...PROJECT.talent, name: 'CodeCraft Agency', initials: 'CC', rating: 4.7, totalProjects: 31, location: 'Delhi, India' },
  },
  4: {
    ...PROJECT,
    id: 4,
    title: 'AI Chatbot Integration',
    status: 'disputed',
    progress: 45,
    daysAhead: -5,
    startDate: 'Nov 10, 2025',
    deadline: 'Jan 30, 2026',
    budget: 14000,
    spent: 6000,
    escrow: 8000,
    released: 0,
    tags: ['AI', 'Python', 'NLP'],
    description: 'Integration of an AI-powered chatbot into the company website for customer support automation using NLP and intent recognition.',
    talent: { ...PROJECT.talent, name: 'DevPro Solutions', initials: 'DP', rating: 3.2, totalProjects: 12, location: 'Pune, India' },
  },
  5: {
    ...PROJECT,
    id: 5,
    title: 'Company Brand Identity Design',
    status: 'completed',
    progress: 100,
    daysAhead: 2,
    startDate: 'May 15, 2025',
    deadline: 'Jun 20, 2025',
    budget: 8500,
    spent: 8500,
    escrow: 0,
    released: 8500,
    tags: ['Branding', 'Logo', 'Figma'],
    description: 'Complete brand identity design including logo, color palette, typography, brand guidelines, and marketing material templates.',
    talent: { ...PROJECT.talent, name: 'Maria Chen', type: 'Freelancer', initials: 'MC', rating: 5.0, totalProjects: 18, location: 'Singapore',
      members: [{ name: 'Maria Chen', role: 'Brand Designer', initials: 'MC' }] },
  },
};

/* ── MAIN ── */
export default function ClientProjectDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [activeTab, setActiveTab]             = useState('overview');
  const [expandedMilestone, setExpanded]      = useState(0);
  const [showDisputeModal, setDisputeModal]   = useState(false);
  const [showApproveModal, setApproveModal]   = useState(null);
  const [showReviewModal, setReviewModal]     = useState(false);
  const [rating, setRating]                   = useState(0);
  const [hoverRating, setHoverRating]         = useState(0);
  const [reviewText, setReviewText]           = useState('');
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  const p = PROJECTS[Number(id)] || PROJECT;

  const TABS = ['Overview', 'Milestones', 'Files', 'Payments', 'Timeline', 'Team'];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ── */}
      {/* <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
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
              onClick={() => navigate(`/hire-talent/notifications?project=${p.id}`)}
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
      </header> */}



      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
    
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
      <button
        onClick={() => navigate(`/hire-talent/notifications?project=${p.id}`)}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">

        {/* ── Project Title Bar ── */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex flex-wrap items-center gap-3">
            <h1 className="text-xl font-bold text-[#1a3a5c]">{p.title}</h1>
            <span className="flex items-center gap-1.5 text-sm font-semibold text-gray-600">
              <span className="text-gray-400">·</span>
              {p.talent.name}
              <CheckCircle size={14} className="text-green-500" />
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-sm font-semibold text-[#1a3a5c] shadow-sm">
              ON TRACK
            </span>
            <span className="px-3 py-1.5 bg-amber-50 border border-amber-200 rounded-lg text-sm font-semibold text-amber-700 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              MEDIUM RISK
            </span>
          </div>
        </div>

        {/* ── 4 Stat Cards ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {/* Total Budget */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="text-2xl mb-2">💰</div>
            <p className="text-2xl font-bold text-[#1a3a5c]">${p.budget.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">Total Budget</p>
          </div>

          {/* Released */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center mb-2">
              <CheckCircle size={18} className="text-green-600" />
            </div>
            <p className="text-2xl font-bold text-green-600">${p.released.toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">Released</p>
          </div>

          {/* Remaining / In Escrow */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="text-2xl mb-2">⏳</div>
            <p className="text-2xl font-bold text-amber-500">${(p.escrow - p.released).toLocaleString()}</p>
            <p className="text-sm text-gray-400 mt-1">Remaining</p>
          </div>

          {/* Progress */}
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5">
            <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center mb-2">
              <span className="text-blue-600 font-bold text-xs">📊</span>
            </div>
            <p className="text-2xl font-bold text-[#1a3a5c]">{p.progress}%</p>
            <p className="text-sm text-gray-400 mt-1">Progress</p>
          </div>
        </div>

        {/* ── Overall Progress Bar ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-5 mb-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-semibold text-gray-600">Overall Progress</span>
            <div className="flex items-center gap-4">
              <span className="text-xs text-gray-400">{p.startDate} → {p.deadline}</span>
              <span className="text-sm font-bold text-[#1a3a5c]">{p.progress}%</span>
            </div>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-3 mb-2">
            <div
              className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-600 transition-all"
              style={{ width: `${p.progress}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="text-xs text-gray-400">
              Budget released: {Math.round((p.released / p.budget) * 100)}%
            </span>
            <span className="text-xs text-gray-400">Category: Mobile Development</span>
          </div>

          {/* Action buttons */}
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => navigate('/project-stream')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white rounded-lg shadow-sm hover:opacity-90 transition"
                style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
              >
                <MessageSquare size={15} /> Message Team
              </button>
              <button
                onClick={() => setActiveTab('files')}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
              >
                <FileText size={15} /> View Files
              </button>
              <button className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                <Phone size={15} /> Schedule Call
              </button>
              <button
                onClick={() => setDisputeModal(true)}
                className="flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-red-600 bg-red-50 border border-red-200 rounded-lg hover:bg-red-100 transition ml-auto"
              >
                <Flag size={15} /> Raise Dispute
              </button>
            </div>
          </div>
        </div>

        {/* ── Tabs ── */}
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          <div className="flex overflow-x-auto border-b border-gray-200 px-2">
            {TABS.map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab.toLowerCase())}
                className={`py-4 px-4 text-sm font-semibold border-b-2 whitespace-nowrap transition ${
                  activeTab === tab.toLowerCase()
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab}
                {tab === 'Files' && <span className="ml-1.5 text-xs bg-blue-500 text-white rounded-full px-1.5 py-0.5">4</span>}
              </button>
            ))}
          </div>

          <div className="p-5 sm:p-6">

            {/* ── OVERVIEW ── */}
            {activeTab === 'overview' && (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">

                  {/* Review prompt — shows when project completed and no review given */}
                  {p.status === 'completed' && (
                    <div className="flex items-center justify-between p-4 bg-amber-50 border border-amber-200 rounded-xl">
                      <div className="flex items-center gap-3">
                        <Star size={18} className="text-amber-500 fill-amber-500 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-semibold text-amber-800">How was your experience?</p>
                          <p className="text-xs text-amber-600 mt-0.5">Leave a review for {p.talent.name} to help other clients.</p>
                        </div>
                      </div>
                      <button
                        onClick={() => { setReviewModal(true); setRating(0); setReviewText(''); setReviewSubmitted(false); }}
                        className="flex-shrink-0 flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white rounded-lg hover:opacity-90 transition"
                        style={{ background: 'linear-gradient(135deg,#f59e0b,#d97706)' }}
                      >
                        <Star size={12} /> Leave Review
                      </button>
                    </div>
                  )}

                  {/* Project Description */}
                  <div>
                    <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-2">Project Description</p>
                    <p className="text-sm text-gray-600 leading-relaxed">{p.description}</p>
                    <div className="flex flex-wrap gap-1.5 mt-3">
                      {p.tags.map((tag, i) => (
                        <span key={i} className="text-xs px-2 py-0.5 bg-gray-100 text-gray-600 rounded-md font-medium">{tag}</span>
                      ))}
                    </div>
                  </div>

                  {/* Health */}
                  <div>
                    <h3 className="text-base font-bold text-[#1a3a5c] mb-3">Project Health</h3>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                      {[
                        { label: 'Timeline',      value: 90,  note: '3 days ahead', green: false },
                        { label: 'Budget',        value: 20,  note: 'On track',     green: true },
                        { label: 'Communication', value: 90,  note: 'Excellent',    green: false },
                        { label: 'Quality',       value: 100, note: 'No revisions', green: false },
                      ].map((h, i) => (
                        <div key={i} className="bg-gray-50 rounded-xl p-3 border border-gray-200">
                          <div className="flex justify-between mb-1.5">
                            <span className="text-xs text-gray-500 font-medium">{h.label}</span>
                            <span className="text-xs font-bold text-[#1a3a5c]">{h.value}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5 mb-1">
                            <div
                              className={`h-1.5 rounded-full ${h.green ? 'bg-green-500' : 'bg-gradient-to-r from-green-400 to-blue-600'}`}
                              style={{ width: `${h.value}%` }}
                            />
                          </div>
                          <p className="text-xs text-gray-400">{h.note}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Recent Activity */}
                  <div>
                    <h3 className="text-base font-bold text-[#1a3a5c] mb-3">Recent Activity</h3>
                    <div className="space-y-2">
                      {p.timeline.slice(0, 4).map((item, i) => (
                        <div key={i} className="flex items-start gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                            {item.icon === 'money'   && <DollarSign size={13} className="text-white" />}
                            {item.icon === 'start'   && <Zap size={13} className="text-white" />}
                            {item.icon === 'meeting' && <Users size={13} className="text-white" />}
                            {(item.icon === 'file' || item.icon === 'review') && <FileText size={13} className="text-white" />}
                          </div>
                          <div>
                            <p className="text-sm text-gray-700 font-medium">{item.event}</p>
                            <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Deadlines */}
                  <div>
                    <h3 className="text-base font-bold text-[#1a3a5c] mb-3">Upcoming Deadlines</h3>
                    <div className="space-y-2">
                      {[
                        { label: 'Review Wireframes_v1.pdf', date: 'Today', urgent: true },
                        { label: 'Milestone 1 due', date: 'Mar 11, 2026', urgent: false },
                        { label: 'Milestone 2 start', date: 'Mar 12, 2026', urgent: false },
                      ].map((d, i) => (
                        <div key={i} className={`flex items-center justify-between p-3 rounded-xl border ${d.urgent ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}>
                          <div className="flex items-center gap-2">
                            <Calendar size={14} className={d.urgent ? 'text-yellow-600' : 'text-gray-400'} />
                            <span className="text-sm font-medium text-gray-700">{d.label}</span>
                            {d.urgent && <span className="text-xs bg-yellow-200 text-yellow-800 px-1.5 py-0.5 rounded-full font-semibold">Urgent</span>}
                          </div>
                          <span className="text-xs text-gray-500 font-medium">{d.date}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="space-y-4">
                  {/* Manager */}
                  <div className="bg-white border border-gray-200 rounded-2xl p-4">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide mb-3">Your Success Manager</p>
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                        {p.manager.initials}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-[#1a3a5c]">{p.manager.name}</p>
                        <p className="text-xs text-gray-400">{p.manager.role}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 mb-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full" />
                      <p className="text-xs text-gray-500">Response {p.manager.responseTime}</p>
                    </div>
                    <button
                      onClick={() => navigate('/project-stream')}
                      className="w-full py-2 text-sm font-semibold text-blue-700 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition"
                    >
                      💬 Live Chat
                    </button>
                  </div>

                  {/* Dates */}
                  <div className="bg-gray-50 border border-gray-200 rounded-2xl p-4 space-y-2.5">
                    <p className="text-xs text-gray-400 font-semibold uppercase tracking-wide">Project Info</p>
                    {[
                      { label: 'Started',       val: p.startDate },
                      { label: 'Deadline',      val: p.deadline },
                      { label: 'Platform Fee',  val: `${p.commission}%` },
                    ].map((row, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <span className="text-xs text-gray-500">{row.label}</span>
                        <span className="text-xs font-semibold text-[#1a3a5c]">{row.val}</span>
                      </div>
                    ))}
                  </div>

                  {/* AI Insights */}
                  <div className="bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 rounded-2xl p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Zap size={14} className="text-blue-600" />
                      <p className="text-xs font-bold text-[#1a3a5c]">AI Insights</p>
                    </div>
                    <div className="space-y-2">
                      {[
                        { text: 'Project performing excellently', ok: true },
                        { text: 'Agency is highly responsive', ok: true },
                        { text: 'Good timeline buffer available', ok: true },
                        { text: 'Review Milestone 1 deliverables soon', ok: false },
                      ].map((ins, i) => (
                        <div key={i} className="flex items-start gap-2">
                          {ins.ok
                            ? <CheckCircle size={12} className="text-green-500 flex-shrink-0 mt-0.5" />
                            : <AlertCircle size={12} className="text-yellow-500 flex-shrink-0 mt-0.5" />}
                          <p className="text-xs text-gray-700">{ins.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── MILESTONES ── */}
            {activeTab === 'milestones' && (
              <div className="space-y-3">
                {p.milestones.map((m, idx) => {
                  const cfg = getMilestoneStatus(m.status);
                  const isOpen = expandedMilestone === idx;
                  const doneCount = m.deliverables.filter(d => d.done).length;
                  return (
                    <div key={m.id} className="border border-gray-200 rounded-2xl overflow-hidden">
                      <button
                        onClick={() => setExpanded(isOpen ? -1 : idx)}
                        className="w-full flex items-center gap-3 p-4 sm:p-5 bg-gray-50 hover:bg-gray-100 transition text-left"
                      >
                        <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                          style={{ background: m.status === 'completed' ? '#22c55e' : m.status === 'in_review' ? '#f59e0b' : 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                          {m.status === 'completed' ? <CheckCircle size={14} /> : m.id}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-0.5">
                            <p className="text-sm font-bold text-[#1a3a5c]">{m.title}</p>
                            <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${cfg.cls}`}>{cfg.label}</span>
                          </div>
                          <p className="text-xs text-gray-400">Due {m.dueDate} · {m.weeks} wks · {doneCount}/{m.deliverables.length} done</p>
                        </div>
                        <div className="flex items-center gap-3 flex-shrink-0">
                          <div className="text-right hidden sm:block">
                            <p className="text-sm font-bold text-[#1a3a5c]">${m.amount.toLocaleString()}</p>
                            <p className="text-xs text-gray-400">{m.percent}%</p>
                          </div>
                          {isOpen ? <ChevronUp size={16} className="text-gray-400" /> : <ChevronDown size={16} className="text-gray-400" />}
                        </div>
                      </button>

                      {isOpen && (
                        <div className="p-4 sm:p-5 border-t border-gray-200">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Deliverables</p>
                              <div className="space-y-2">
                                {m.deliverables.map((d, di) => (
                                  <div key={di} className={`flex items-center gap-2.5 p-2.5 rounded-lg ${d.done ? 'bg-green-50' : 'bg-gray-50'}`}>
                                    <CheckCircle size={14} className={d.done ? 'text-green-500' : 'text-gray-300'} />
                                    <span className={`text-sm ${d.done ? 'text-gray-700' : 'text-gray-400'}`}>{d.name}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                            <div>
                              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Actions</p>
                              <div className="space-y-2">
                                {m.status === 'in_review' && (
                                  <>
                                    <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-xl text-xs text-yellow-800 flex items-start gap-2">
                                      <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                                      Deliverables submitted. Please review and approve or request changes.
                                    </div>
                                    <button
                                      onClick={() => setApproveModal(m.id)}
                                      className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-white rounded-xl hover:opacity-90 transition"
                                      style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
                                    >
                                      <ThumbsUp size={14} /> Approve & Release ${m.amount.toLocaleString()}
                                    </button>
                                    <button className="w-full flex items-center justify-center gap-2 py-2.5 text-sm font-semibold text-orange-700 bg-orange-50 border border-orange-200 rounded-xl hover:bg-orange-100 transition">
                                      <RotateCcw size={14} /> Request Revision
                                    </button>
                                  </>
                                )}
                                {m.status === 'pending' && (
                                  <div className="p-3 bg-gray-50 border border-gray-200 rounded-xl text-xs text-gray-500 flex items-start gap-2">
                                    <Clock size={12} className="flex-shrink-0 mt-0.5" />
                                    This milestone starts after the previous one is approved.
                                  </div>
                                )}
                                <button className="w-full flex items-center justify-center gap-2 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-xl hover:bg-gray-200 transition">
                                  <Eye size={13} /> View Related Files
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}

            {/* ── FILES ── */}
            {activeTab === 'files' && (
              <div className="space-y-3">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-500">{p.files.length} files across all milestones</p>
                </div>
                {p.files.map((file, i) => (
                  <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center flex-shrink-0">
                        <FileText size={18} className="text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[#1a3a5c] truncate">{file.name}</p>
                        <p className="text-xs text-gray-400">{file.size} · {file.uploadedBy} · {file.time}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0 ml-3">
                      <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${getFileStatusCls(file.status)}`}>
                        {file.status === 'in_review' ? 'In Review' : file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                      </span>
                      <button className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-blue-600 bg-blue-50 border border-blue-200 rounded-lg hover:bg-blue-100 transition">
                        <Download size={12} /> Download
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── PAYMENTS ── */}
            {activeTab === 'payments' && (
              <div className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Total Funded', value: `$${p.escrow.toLocaleString()}`,              sub: 'Locked in escrow',  cls: 'bg-blue-50 border-blue-200 text-[#1a3a5c]' },
                    { label: 'Released',     value: `$${p.released.toLocaleString()}`,            sub: 'To talent so far',  cls: 'bg-green-50 border-green-200 text-green-700' },
                    { label: 'Remaining',    value: `$${(p.escrow - p.released).toLocaleString()}`, sub: 'Still locked',    cls: 'bg-gray-50 border-gray-200 text-[#1a3a5c]' },
                  ].map((card, i) => (
                    <div key={i} className={`rounded-2xl p-5 border ${card.cls}`}>
                      <p className="text-xs font-medium text-gray-500 mb-1">{card.label}</p>
                      <p className={`text-2xl font-bold ${i === 1 ? 'text-green-700' : 'text-[#1a3a5c]'}`}>{card.value}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{card.sub}</p>
                    </div>
                  ))}
                </div>

                <h3 className="text-base font-bold text-[#1a3a5c]">Milestone Payment Plan</h3>
                <div className="space-y-2">
                  {p.milestones.map((m, i) => {
                    const cfg = getMilestoneStatus(m.status);
                    return (
                      <div key={i} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                        <div className="flex items-center gap-3">
                          <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                            style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                            {i + 1}
                          </div>
                          <div>
                            <p className="text-sm font-semibold text-[#1a3a5c]">{m.title}</p>
                            <p className="text-xs text-gray-400">Due {m.dueDate}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-bold text-[#1a3a5c]">${m.amount.toLocaleString()}</span>
                          <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${cfg.cls}`}>{cfg.label}</span>
                        </div>
                      </div>
                    );
                  })}
                </div>

                <div className="flex items-start gap-3 p-4 bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 rounded-2xl">
                  <Shield size={17} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm font-bold text-[#1a3a5c]">Your money is protected</p>
                    <p className="text-xs text-gray-500 mt-0.5">Funds held in escrow, released only on your approval per milestone. Admin-backed dispute resolution if needed.</p>
                  </div>
                </div>

                {/* ── Contract Details ── */}
                <div className="border border-gray-200 rounded-2xl overflow-hidden">
                  {/* Header */}
                  <div className="flex items-center justify-between px-5 py-4 bg-gray-50 border-b border-gray-200">
                    <div className="flex items-center gap-3">
                      <FileText size={16} className="text-gray-400" />
                      <div>
                        <p className="text-sm font-bold text-[#1a3a5c]">Contract Details</p>
                        <p className="text-xs font-mono text-gray-400">WL-2026-001</p>
                      </div>
                    </div>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-gray-600 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition">
                      <Download size={12} /> Download PDF
                    </button>
                  </div>

                  <div className="p-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Financials */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Financials</p>
                      <div className="space-y-2.5">
                        {[
                          { label: 'Contract Value', value: `$${p.budget.toLocaleString()}`,                        cls: 'text-[#1a3a5c]' },
                          { label: 'Amount Paid',    value: `$${p.released.toLocaleString()}`,                      cls: 'text-green-600' },
                          { label: 'Remaining',      value: `$${(p.budget - p.released).toLocaleString()}`,         cls: 'text-amber-600' },
                          { label: 'Escrow Locked',  value: `$${p.escrow.toLocaleString()}`,                        cls: 'text-blue-600' },
                          { label: 'Platform Fee',   value: `${p.commission}% (${`$${Math.round(p.budget * p.commission / 100).toLocaleString()}`})`, cls: 'text-gray-600' },
                          { label: 'Payment Model',  value: 'Milestone-Based',                                      cls: 'text-gray-600' },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                            <span className="text-xs text-gray-500">{row.label}</span>
                            <span className={`text-xs font-semibold ${row.cls}`}>{row.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Timeline + milestones */}
                    <div>
                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Timeline</p>
                      <div className="space-y-2.5 mb-4">
                        {[
                          { label: 'Signed',    value: 'Feb 10, 2026' },
                          { label: 'Started',   value: p.startDate },
                          { label: 'End Date',  value: p.deadline },
                        ].map((row, i) => (
                          <div key={i} className="flex items-center justify-between py-1.5 border-b border-gray-100 last:border-0">
                            <span className="text-xs text-gray-500">{row.label}</span>
                            <span className="text-xs font-semibold text-[#1a3a5c]">{row.value}</span>
                          </div>
                        ))}
                      </div>

                      <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide mb-3">Milestones</p>
                      <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl mb-2">
                        <span className="text-xs text-gray-500">Progress</span>
                        <span className="text-xs font-bold text-[#1a3a5c]">
                          {p.milestones.filter(m => m.status === 'completed').length}/{p.milestones.length} completed
                        </span>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-1.5">
                        <div
                          className="h-1.5 rounded-full bg-gradient-to-r from-green-400 to-blue-600"
                          style={{ width: `${(p.milestones.filter(m => m.status === 'completed').length / p.milestones.length) * 100}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ── TIMELINE ── */}
            {activeTab === 'timeline' && (
              <div className="relative pl-7">
                <div className="absolute left-3 top-0 bottom-0 w-0.5 bg-gray-200" />
                <div className="space-y-6">
                  {p.timeline.map((item, i) => (
                    <div key={i} className="relative flex items-start gap-4">
                      <div className="absolute -left-[22px] w-4 h-4 rounded-full border-2 border-white"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }} />
                      <div>
                        <p className="text-sm font-semibold text-[#1a3a5c]">{item.event}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{item.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ── TEAM ── */}
            {activeTab === 'team' && (
              <div className="space-y-5">
                <div className="flex items-start gap-4 p-5 bg-gray-50 border border-gray-200 rounded-2xl">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0"
                    style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                    {p.talent.initials}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[#1a3a5c]">{p.talent.name}</h3>
                      <span className="text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full font-semibold">{p.talent.type}</span>
                      <span className="flex items-center gap-1 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">
                        <Award size={10} /> Verified
                      </span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">{p.talent.location}</p>
                    <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                      <span>⭐ {p.talent.rating} rating</span>
                      <span>📁 {p.talent.totalProjects} projects</span>
                      <span>⚡ {p.talent.responseTime}</span>
                      <span>🏳️ {p.talent.disputes} disputes</span>
                    </div>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-[#1a3a5c]">Assigned Team Members</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {p.talent.members.map((member, i) => (
                    <div key={i} className="flex items-center gap-3 p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                        {member.initials}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-[#1a3a5c]">{member.name}</p>
                        <p className="text-xs text-gray-400">{member.role}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-2.5 p-4 bg-blue-50 border border-blue-100 rounded-xl">
                  <Info size={13} className="text-blue-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-blue-700">
                    For official decisions, communicate with the Agency Admin (Arjun Mehta, PM) via ProjectStream chat.
                  </p>
                </div>
              </div>
            )}

          </div>
        </div>
      </main>

      {/* ── Approve Modal ── */}
      {showApproveModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Approve & Release Payment</h3>
            <p className="text-sm text-gray-500 mb-5">
              You are approving <strong>Milestone 1 — Discovery & Design</strong> and releasing{' '}
              <strong className="text-green-600">$8,400</strong> to TechVision Agency. This cannot be undone.
            </p>
            <div className="flex gap-3">
              <button onClick={() => setApproveModal(null)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button
                onClick={() => setApproveModal(null)}
                className="flex-1 py-2.5 text-white text-sm font-semibold rounded-xl hover:opacity-90 transition"
                style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}
              >
                ✓ Confirm & Release
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Dispute Modal ── */}
      {showDisputeModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-red-700">Raise a Dispute</h3>
              <button onClick={() => setDisputeModal(false)} className="text-gray-400 hover:text-gray-600">
                <XCircle size={20} />
              </button>
            </div>
            <p className="text-sm text-gray-500 mb-4">Admin will be notified immediately. Describe the issue clearly.</p>
            <textarea
              rows={4}
              placeholder="Describe the issue in detail..."
              className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-red-400 resize-none mb-4"
            />
            <div className="flex gap-3">
              <button onClick={() => setDisputeModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                Cancel
              </button>
              <button onClick={() => { setDisputeModal(false); navigate('/hire-talent/disputes'); }} className="flex-1 py-2.5 bg-red-600 text-white text-sm font-semibold rounded-xl hover:bg-red-700 transition">
                Submit Dispute
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── Review Modal ── */}
      {showReviewModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl p-6 max-w-md w-full">
            {!reviewSubmitted ? (
              <>
                <div className="flex items-center justify-between mb-5">
                  <div>
                    <h3 className="text-lg font-bold text-[#1a3a5c]">Leave a Review</h3>
                    <p className="text-xs text-gray-400 mt-0.5">{p.title}</p>
                  </div>
                  <button onClick={() => setReviewModal(false)} className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 transition">
                    <XCircle size={18} />
                  </button>
                </div>

                {/* Talent info */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-xl border border-gray-200 mb-5">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                    {p.talent.initials}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-[#1a3a5c]">{p.talent.name}</p>
                    <p className="text-xs text-gray-400">{p.talent.type}</p>
                  </div>
                </div>

                {/* Star rating */}
                <div className="mb-4">
                  <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Your Rating</p>
                  <div className="flex items-center gap-2">
                    {[1,2,3,4,5].map(star => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="transition-transform hover:scale-110"
                      >
                        <Star size={32} className={`transition-colors ${
                          star <= (hoverRating || rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'
                        }`} />
                      </button>
                    ))}
                    {rating > 0 && (
                      <span className="text-sm font-semibold text-amber-600 ml-2">
                        {['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'][rating]}
                      </span>
                    )}
                  </div>
                </div>

                {/* Category ratings */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  {['Communication', 'Quality', 'Timeliness', 'Professionalism'].map(cat => (
                    <div key={cat} className="p-2.5 bg-gray-50 rounded-xl border border-gray-200">
                      <p className="text-xs text-gray-500 font-medium mb-1.5">{cat}</p>
                      <div className="flex gap-1">
                        {[1,2,3,4,5].map(s => (
                          <Star key={s} size={13} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
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
                    placeholder="Share your experience. What went well? What could be improved?"
                    value={reviewText}
                    onChange={e => setReviewText(e.target.value)}
                    className="w-full p-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 resize-none"
                  />
                  <p className="text-xs text-gray-400 mt-1">{reviewText.length}/500 characters</p>
                </div>

                <div className="flex gap-3">
                  <button onClick={() => setReviewModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                    Cancel
                  </button>
                  <button
                    disabled={rating === 0 || !reviewText.trim()}
                    onClick={() => setReviewSubmitted(true)}
                    className={`flex-1 py-2.5 text-white text-sm font-semibold rounded-xl transition ${
                      rating === 0 || !reviewText.trim() ? 'bg-gray-300 cursor-not-allowed' : 'hover:opacity-90'
                    }`}
                    style={rating > 0 && reviewText.trim() ? { background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' } : {}}
                  >
                    Submit Review
                  </button>
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-green-500" />
                </div>
                <h3 className="text-lg font-bold text-[#1a3a5c] mb-2">Review Submitted!</h3>
                <p className="text-sm text-gray-500 mb-2">Thank you for reviewing <strong>{p.talent.name}</strong>.</p>
                <div className="flex justify-center gap-1 mb-5">
                  {[1,2,3,4,5].map(s => (
                    <Star key={s} size={20} className={s <= rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'} />
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => setReviewModal(false)} className="flex-1 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition">
                    Close
                  </button>
                  <button
                    onClick={() => { setReviewModal(false); navigate('/hire-talent/reviews'); }}
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
}