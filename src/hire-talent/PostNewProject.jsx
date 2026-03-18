import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  ArrowRight,
  Bell,
  Settings,
  CheckCircle,
  AlertCircle,
  Plus,
  X,
  Upload,
  Mic,
  Paperclip,
  DollarSign,
  Calendar,
  Clock,
  Users,
  Zap,
  Shield,
  Star,
  ChevronDown,
  Info,
} from 'lucide-react';

/* ─────────────────────────────────────────
   STEP CONFIG
───────────────────────────────────────── */
const STEPS = [
  { id: 1, label: 'Project Idea' },
  { id: 2, label: 'AI Breakdown' },
  { id: 3, label: 'Scope & Budget' },
  { id: 4, label: 'Milestones' },
  { id: 5, label: 'Payment Model' },
  { id: 6, label: 'Review & Post' },
];

/* ─────────────────────────────────────────
   SKILL TAGS
───────────────────────────────────────── */
const SKILL_OPTIONS = [
  'React', 'Node.js', 'Python', 'Django', 'Flutter', 'React Native',
  'UI/UX Design', 'Figma', 'PHP', 'Laravel', 'Vue.js', 'Angular',
  'Machine Learning', 'AI/NLP', 'Blockchain', 'DevOps', 'AWS',
  'Shopify', 'WordPress', 'iOS', 'Android', 'Data Analytics',
];

/* ─────────────────────────────────────────
   MAIN COMPONENT
───────────────────────────────────────── */
export default function PostNewProject() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [aiGenerated, setAiGenerated] = useState(false);
  const [aiLoading, setAiLoading] = useState(false);

  /* ── form state ── */
  const [form, setForm] = useState({
    // Step 1
    projectIdea: '',
    projectType: '',         // web / mobile / both / other

    // Step 2 – AI generated (editable)
    projectName: 'Food Delivery Platform',
    projectCategory: 'Mobile App + Web Admin',
    industry: 'Food & Restaurant Tech',
    complexity: 'medium-high',
    coreFeatures: [
      'User registration & login (social + email)',
      'Restaurant browse & search with filters',
      'Menu display with photos & pricing',
      'Shopping cart & order placement',
      'Real-time order tracking (GPS)',
      'Payment gateway integration',
      'Push notifications (order updates)',
      'Restaurant admin panel',
    ],
    optionalFeatures: [
      'In-app chat (customer ↔ restaurant)',
      'Ratings & reviews system',
      'Promo codes & loyalty rewards',
    ],
    selectedOptional: [],
    customFeature: '',
    skills: ['React Native', 'Node.js', 'UI/UX Design'],

    // Step 3
    budgetTier: 'realistic',   // conservative / realistic / comfortable / custom
    customBudget: '',
    timelineTier: 'standard',  // fast / standard / relaxed / custom
    customWeeks: '',
    talentType: 'agency',      // freelancer / agency / hybrid

    // Step 4
    milestones: [
      { title: 'Discovery & Design', weeks: 3, percent: 20, deliverables: ['Wireframes', 'UI designs', 'Tech architecture'] },
      { title: 'Core Development', weeks: 12, percent: 50, deliverables: ['User app', 'Admin panel', 'Payment integration'] },
      { title: 'Advanced Features', weeks: 6, percent: 21, deliverables: ['Real-time tracking', 'Push notifications'] },
      { title: 'Testing & Launch', weeks: 2, percent: 9, deliverables: ['QA report', 'App store submission', 'Deployment'] },
    ],

    // Step 5
    paymentModel: 'milestone',  // milestone / hourly / single
    escrowAgreed: false,

    // Step 6
    visibility: 'ai-matched',   // ai-matched / public
    urgency: 'normal',          // normal / urgent
  });

  /* ── helpers ── */
  const set = (key, val) => setForm(f => ({ ...f, [key]: val }));

  const simulateAI = () => {
    setAiLoading(true);
    setTimeout(() => { setAiLoading(false); setAiGenerated(true); setStep(2); }, 1800);
  };

  const totalBudget = () => {
    if (form.budgetTier === 'conservative') return '$18,000 – $28,000';
    if (form.budgetTier === 'realistic') return '$28,000 – $45,000';
    if (form.budgetTier === 'comfortable') return '$45,000 – $65,000';
    return form.customBudget ? `$${form.customBudget}` : '—';
  };

  const totalWeeks = () => {
    if (form.timelineTier === 'fast') return '12–16 weeks';
    if (form.timelineTier === 'standard') return '20–29 weeks';
    if (form.timelineTier === 'relaxed') return '30–40 weeks';
    return form.customWeeks ? `${form.customWeeks} weeks` : '—';
  };

  const toggleOptional = (feat) => {
    set('selectedOptional',
      form.selectedOptional.includes(feat)
        ? form.selectedOptional.filter(f => f !== feat)
        : [...form.selectedOptional, feat]
    );
  };

  const toggleSkill = (s) => {
    set('skills',
      form.skills.includes(s)
        ? form.skills.filter(x => x !== s)
        : [...form.skills, s]
    );
  };

  const addMilestone = () => {
    set('milestones', [...form.milestones, { title: '', weeks: 2, percent: 0, deliverables: [''] }]);
  };

  const removeMilestone = (i) => {
    set('milestones', form.milestones.filter((_, idx) => idx !== i));
  };

  const updateMilestone = (i, key, val) => {
    const updated = form.milestones.map((m, idx) => idx === i ? { ...m, [key]: val } : m);
    set('milestones', updated);
  };

  /* ── validation warnings ── */
  const budgetWarning = form.budgetTier === 'conservative';
  const timelineWarning = form.timelineTier === 'fast';

  /* ─────────────────────────────────────────
     RENDER
  ───────────────────────────────────────── */
  return (
    <div className="min-h-screen bg-gray-50">

      {/* ── Header ──
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/hire-talent/projects')}
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
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
              CL
            </div>
          </div>
        </div>
      </header> */}





      {/* ── Header ── */}
<header className="bg-white border-b border-gray-200 sticky top-0 z-50">
  <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
    
    {/* Left Side */}
    <div className="flex items-center gap-3">
      
      {/* Back Button */}
      <button
        onClick={() => navigate('/hire-talent/projects')}
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
        onClick={() => navigate('/hire-talent/notifications')}
        className="relative p-2 text-gray-400 hover:bg-gray-100 rounded-lg transition"
      >
        <Bell size={18} />
        <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-red-500 rounded-full" />
      </button>

      <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-400 to-blue-700 flex items-center justify-center text-white text-xs font-bold">
        CL
      </div>
    </div>

  </div>
</header>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">

        {/* ── Page title ── */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#1a3a5c]">Post a New Project</h1>
          <p className="text-gray-400 text-sm mt-0.5">AI will help you define, structure and match your project.</p>
        </div>

        {/* ── Stepper ── */}
        <div className="mb-8">
          <div className="flex items-center gap-0 overflow-x-auto pb-2">
            {STEPS.map((s, idx) => {
              const done = step > s.id;
              const active = step === s.id;
              return (
                <React.Fragment key={s.id}>
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold border-2 transition-all ${
                      done
                        ? 'bg-gradient-to-br from-green-400 to-blue-600 border-transparent text-white'
                        : active
                        ? 'border-blue-600 text-blue-600 bg-white'
                        : 'border-gray-200 text-gray-400 bg-white'
                    }`}>
                      {done ? <CheckCircle size={14} /> : s.id}
                    </div>
                    <span className={`text-xs mt-1 font-medium whitespace-nowrap ${active ? 'text-blue-600' : done ? 'text-green-600' : 'text-gray-400'}`}>
                      {s.label}
                    </span>
                  </div>
                  {idx < STEPS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-1 mt-[-10px] min-w-[20px] rounded-full ${done ? 'bg-gradient-to-r from-green-400 to-blue-500' : 'bg-gray-200'}`} />
                  )}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        {/* ══════════════════════════════════════
            STEP 1 — Project Idea
        ══════════════════════════════════════ */}
        {step === 1 && (
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">✨</span>
              <h2 className="text-xl font-bold text-[#1a3a5c]">What do you want to build?</h2>
            </div>
            <p className="text-gray-400 text-sm mb-6">Describe your idea in plain English — no technical knowledge needed.</p>

            {/* Text area */}
            <textarea
              className="w-full p-4 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none text-gray-700 text-sm leading-relaxed"
              rows={5}
              placeholder="e.g. I want a food delivery app for my city where users can order from local restaurants, track delivery in real time, and pay securely online..."
              value={form.projectIdea}
              onChange={e => set('projectIdea', e.target.value)}
            />

            {/* Input options */}
            <div className="flex gap-3 mt-2 mb-6">
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg text-xs font-medium transition">
                <Mic size={14} /> Speak instead
              </button>
              <button className="flex items-center gap-1.5 px-3 py-1.5 text-gray-500 hover:bg-gray-100 rounded-lg text-xs font-medium transition">
                <Paperclip size={14} /> Upload brief / doc
              </button>
            </div>

            {/* Project type */}
            <p className="text-sm font-semibold text-[#1a3a5c] mb-3">What type of project is this?</p>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
              {[
                { key: 'web', label: '🌐 Web App', desc: 'Website or web platform' },
                { key: 'mobile', label: '📱 Mobile App', desc: 'iOS / Android' },
                { key: 'both', label: '🖥️ Web + Mobile', desc: 'Full product' },
                { key: 'other', label: '⚙️ Other', desc: 'API, AI, design etc.' },
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => set('projectType', opt.key)}
                  className={`p-3 rounded-xl border-2 text-left transition ${
                    form.projectType === opt.key
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-gray-300 bg-white'
                  }`}
                >
                  <p className="text-sm font-semibold text-[#1a3a5c]">{opt.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{opt.desc}</p>
                </button>
              ))}
            </div>

            {/* Examples */}
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-6">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Examples to inspire you</p>
              <div className="space-y-1.5">
                {[
                  '"E-commerce site for handmade jewelry with Stripe payments"',
                  '"HR management system for my 50-person company"',
                  '"AI chatbot for my customer support team"',
                  '"Restaurant booking & table management app"',
                ].map((ex, i) => (
                  <button
                    key={i}
                    onClick={() => set('projectIdea', ex.replace(/"/g, ''))}
                    className="block text-left text-sm text-blue-600 hover:text-blue-700 hover:underline"
                  >
                    {ex}
                  </button>
                ))}
              </div>
            </div>

            {/* AI note */}
            <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-100 rounded-xl mb-6">
              <Zap size={16} className="text-blue-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-blue-700">AI will analyze your idea</p>
                <p className="text-xs text-blue-600 mt-0.5">
                  Our AI reads your description and generates a full project structure — features, milestones, budget range, and recommended talent type.
                </p>
              </div>
            </div>

            <button
              onClick={() => form.projectIdea.trim() && form.projectType ? simulateAI() : null}
              disabled={!form.projectIdea.trim() || !form.projectType || aiLoading}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-xl text-white font-semibold text-sm transition ${
                !form.projectIdea.trim() || !form.projectType
                  ? 'opacity-40 cursor-not-allowed bg-gray-400'
                  : 'hover:opacity-90 shadow-sm'
              }`}
              style={form.projectIdea.trim() && form.projectType ? { background: 'linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)' } : {}}
            >
              {aiLoading ? (
                <>
                  <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                  AI is analyzing your project...
                </>
              ) : (
                <><Zap size={16} /> Analyze My Project with AI</>
              )}
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 2 — AI Breakdown
        ══════════════════════════════════════ */}
        {step === 2 && (
          <div className="space-y-5">
            {/* Header card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-[#1a3a5c]">AI-Generated Project Brief</h2>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700">AI GENERATED</span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  { label: 'Project Name', val: form.projectName },
                  { label: 'Type', val: form.projectCategory },
                  { label: 'Industry', val: form.industry },
                  { label: 'Complexity', val: 'Medium-High ●●●●○' },
                ].map((item, i) => (
                  <div key={i} className="bg-gray-50 rounded-xl p-3">
                    <p className="text-xs text-gray-400 font-medium mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-[#1a3a5c]">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Core features */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#1a3a5c] mb-1">Core Features <span className="text-gray-400 font-normal text-sm">(must-have)</span></h3>
              <p className="text-xs text-gray-400 mb-4">Uncheck anything you don't need.</p>
              <div className="space-y-2">
                {form.coreFeatures.map((feat, i) => (
                  <label key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer group">
                    <input type="checkbox" defaultChecked className="w-4 h-4 accent-blue-600 rounded flex-shrink-0" />
                    <span className="text-sm text-gray-700">{feat}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Optional features */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#1a3a5c] mb-1">Optional Features <span className="text-gray-400 font-normal text-sm">(nice-to-have)</span></h3>
              <p className="text-xs text-gray-400 mb-4">Check what you want to include.</p>
              <div className="space-y-2 mb-4">
                {form.optionalFeatures.map((feat, i) => (
                  <label key={i} className="flex items-center gap-3 p-2.5 rounded-lg hover:bg-gray-50 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={form.selectedOptional.includes(feat)}
                      onChange={() => toggleOptional(feat)}
                      className="w-4 h-4 accent-blue-600 rounded flex-shrink-0"
                    />
                    <span className="text-sm text-gray-600">{feat}</span>
                  </label>
                ))}
              </div>
              {/* Add custom feature */}
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Add a custom feature..."
                  value={form.customFeature}
                  onChange={e => set('customFeature', e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={() => {
                    if (form.customFeature.trim()) {
                      set('optionalFeatures', [...form.optionalFeatures, form.customFeature.trim()]);
                      toggleOptional(form.customFeature.trim());
                      set('customFeature', '');
                    }
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition flex items-center gap-1"
                >
                  <Plus size={14} /> Add
                </button>
              </div>
            </div>

            {/* Skills */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#1a3a5c] mb-1">Tech Stack / Skills Needed</h3>
              <p className="text-xs text-gray-400 mb-4">AI suggested these — add or remove as needed.</p>
              <div className="flex flex-wrap gap-2">
                {SKILL_OPTIONS.map(s => (
                  <button
                    key={s}
                    onClick={() => toggleSkill(s)}
                    className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition ${
                      form.skills.includes(s)
                        ? 'text-white border-transparent'
                        : 'bg-gray-100 text-gray-600 border-gray-200 hover:border-gray-300'
                    }`}
                    style={form.skills.includes(s) ? { background: 'linear-gradient(135deg, #22c55e, #1d4ed8)' } : {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            <NavButtons step={step} setStep={setStep} totalSteps={STEPS.length} />
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 3 — Scope & Budget
        ══════════════════════════════════════ */}
        {step === 3 && (
          <div className="space-y-5">

            {/* Budget */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <DollarSign size={18} className="text-green-500" />
                <h2 className="text-lg font-bold text-[#1a3a5c]">Budget Range</h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">AI estimated based on your features. You can adjust.</p>

              <div className="space-y-3">
                {[
                  { key: 'conservative', label: 'Conservative', range: '$18,000 – $28,000', note: 'Lower quality risk' },
                  { key: 'realistic', label: 'Realistic ⭐ Recommended', range: '$28,000 – $45,000', note: 'Best for your scope' },
                  { key: 'comfortable', label: 'Comfortable', range: '$45,000 – $65,000', note: 'Premium talent & faster' },
                  { key: 'custom', label: 'Custom Budget', range: null, note: 'Enter your own amount' },
                ].map(opt => (
                  <label key={opt.key} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.budgetTier === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="budget"
                        checked={form.budgetTier === opt.key}
                        onChange={() => set('budgetTier', opt.key)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1a3a5c]">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.note}</p>
                      </div>
                    </div>
                    {opt.range
                      ? <span className="text-sm font-bold text-[#1a3a5c]">{opt.range}</span>
                      : (
                        <input
                          type="number"
                          placeholder="Enter amount..."
                          value={form.customBudget}
                          onChange={e => set('customBudget', e.target.value)}
                          onClick={e => e.stopPropagation()}
                          className="w-32 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      )
                    }
                  </label>
                ))}
              </div>

              {budgetWarning && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <AlertCircle size={15} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    Conservative budgets may attract lower-quality bids. Consider increasing for better results.
                  </p>
                </div>
              )}
            </div>

            {/* Timeline */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <Calendar size={18} className="text-blue-500" />
                <h2 className="text-lg font-bold text-[#1a3a5c]">Timeline</h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">How quickly do you need this delivered?</p>

              <div className="space-y-3">
                {[
                  { key: 'fast', label: 'Fast Track', range: '12–16 weeks', note: 'Higher cost, more pressure' },
                  { key: 'standard', label: 'Standard ⭐ Recommended', range: '20–29 weeks', note: 'Best quality/speed balance' },
                  { key: 'relaxed', label: 'Relaxed', range: '30–40 weeks', note: 'More affordable, less rushed' },
                  { key: 'custom', label: 'Custom Timeline', range: null, note: 'Enter your own' },
                ].map(opt => (
                  <label key={opt.key} className={`flex items-center justify-between p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.timelineTier === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="timeline"
                        checked={form.timelineTier === opt.key}
                        onChange={() => set('timelineTier', opt.key)}
                        className="accent-blue-600 w-4 h-4"
                      />
                      <div>
                        <p className="text-sm font-semibold text-[#1a3a5c]">{opt.label}</p>
                        <p className="text-xs text-gray-400">{opt.note}</p>
                      </div>
                    </div>
                    {opt.range
                      ? <span className="text-sm font-bold text-[#1a3a5c]">{opt.range}</span>
                      : (
                        <div className="flex items-center gap-2">
                          <input
                            type="number"
                            placeholder="Weeks"
                            value={form.customWeeks}
                            onChange={e => set('customWeeks', e.target.value)}
                            onClick={e => e.stopPropagation()}
                            className="w-24 px-3 py-1.5 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                          <span className="text-xs text-gray-400">weeks</span>
                        </div>
                      )
                    }
                  </label>
                ))}
              </div>

              {timelineWarning && (
                <div className="mt-4 flex items-start gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <AlertCircle size={15} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                  <p className="text-xs text-yellow-700">
                    Fast-track timelines increase cost by 20–30% and may reduce quality. Only choose if truly urgent.
                  </p>
                </div>
              )}
            </div>

            {/* Talent type */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="flex items-center gap-2 mb-1">
                <Users size={18} className="text-purple-500" />
                <h2 className="text-lg font-bold text-[#1a3a5c]">Who should work on this?</h2>
              </div>
              <p className="text-xs text-gray-400 mb-5">AI recommends based on your scope and budget.</p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  {
                    key: 'agency',
                    label: '🏢 Agency',
                    desc: 'Full team, structured delivery, best for complex projects.',
                    recommended: true,
                  },
                  {
                    key: 'freelancer',
                    label: '👤 Freelancer',
                    desc: 'Cost-effective, good for focused tasks and smaller budgets.',
                    recommended: false,
                  },
                  {
                    key: 'hybrid',
                    label: '🔀 Hybrid',
                    desc: 'Lead freelancer + specialist support. Flexible approach.',
                    recommended: false,
                  },
                ].map(opt => (
                  <button
                    key={opt.key}
                    onClick={() => set('talentType', opt.key)}
                    className={`relative p-4 rounded-xl border-2 text-left transition ${
                      form.talentType === opt.key
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {opt.recommended && (
                      <span className="absolute top-2 right-2 text-xs font-bold px-2 py-0.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)', color: '#fff' }}>
                        AI Pick
                      </span>
                    )}
                    <p className="text-sm font-bold text-[#1a3a5c] mb-1">{opt.label}</p>
                    <p className="text-xs text-gray-500">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>

            <NavButtons step={step} setStep={setStep} totalSteps={STEPS.length} />
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 4 — Milestones
        ══════════════════════════════════════ */}
        {step === 4 && (
          <div className="space-y-5">
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1a3a5c] mb-1">Project Milestones</h2>
              <p className="text-xs text-gray-400 mb-6">
                Milestones protect your money. Each payment releases only when you approve delivery.
              </p>

              <div className="space-y-4">
                {form.milestones.map((m, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl overflow-hidden">
                    {/* Milestone header */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 border-b border-gray-200">
                      <div className="w-7 h-7 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                        {i + 1}
                      </div>
                      <input
                        type="text"
                        value={m.title}
                        onChange={e => updateMilestone(i, 'title', e.target.value)}
                        placeholder="Milestone title..."
                        className="flex-1 text-sm font-semibold text-[#1a3a5c] bg-transparent focus:outline-none"
                      />
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <div className="flex items-center gap-1">
                          <Clock size={12} className="text-gray-400" />
                          <input
                            type="number"
                            value={m.weeks}
                            onChange={e => updateMilestone(i, 'weeks', Number(e.target.value))}
                            className="w-12 text-xs text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                          <span className="text-xs text-gray-400">wks</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign size={12} className="text-gray-400" />
                          <input
                            type="number"
                            value={m.percent}
                            onChange={e => updateMilestone(i, 'percent', Number(e.target.value))}
                            className="w-12 text-xs text-center border border-gray-200 rounded px-1 py-0.5 focus:outline-none focus:ring-1 focus:ring-blue-400"
                          />
                          <span className="text-xs text-gray-400">%</span>
                        </div>
                        {form.milestones.length > 1 && (
                          <button onClick={() => removeMilestone(i)} className="text-gray-300 hover:text-red-400 transition">
                            <X size={15} />
                          </button>
                        )}
                      </div>
                    </div>

                    {/* Deliverables */}
                    <div className="p-4">
                      <p className="text-xs text-gray-400 font-medium mb-2">Deliverables</p>
                      <div className="space-y-1.5">
                        {m.deliverables.map((d, di) => (
                          <div key={di} className="flex items-center gap-2">
                            <CheckCircle size={12} className="text-green-400 flex-shrink-0" />
                            <input
                              type="text"
                              value={d}
                              onChange={e => {
                                const updated = [...m.deliverables];
                                updated[di] = e.target.value;
                                updateMilestone(i, 'deliverables', updated);
                              }}
                              className="flex-1 text-xs text-gray-700 bg-transparent focus:outline-none border-b border-transparent focus:border-blue-300 pb-0.5"
                            />
                            {m.deliverables.length > 1 && (
                              <button
                                onClick={() => {
                                  const updated = m.deliverables.filter((_, j) => j !== di);
                                  updateMilestone(i, 'deliverables', updated);
                                }}
                                className="text-gray-300 hover:text-red-400"
                              >
                                <X size={12} />
                              </button>
                            )}
                          </div>
                        ))}
                      </div>
                      <button
                        onClick={() => updateMilestone(i, 'deliverables', [...m.deliverables, ''])}
                        className="mt-2 text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1"
                      >
                        <Plus size={12} /> Add deliverable
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Total % check */}
              <div className={`mt-4 flex items-center justify-between p-3 rounded-xl border ${
                form.milestones.reduce((s, m) => s + m.percent, 0) === 100
                  ? 'bg-green-50 border-green-200'
                  : 'bg-yellow-50 border-yellow-200'
              }`}>
                <span className="text-xs font-semibold text-gray-600">Total Budget Split</span>
                <span className={`text-sm font-bold ${
                  form.milestones.reduce((s, m) => s + m.percent, 0) === 100 ? 'text-green-600' : 'text-yellow-600'
                }`}>
                  {form.milestones.reduce((s, m) => s + m.percent, 0)}%
                  {form.milestones.reduce((s, m) => s + m.percent, 0) !== 100 && ' (must equal 100%)'}
                </span>
              </div>

              <button
                onClick={addMilestone}
                className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 border-2 border-dashed border-gray-300 rounded-xl text-sm text-gray-500 font-medium hover:border-blue-400 hover:text-blue-600 transition"
              >
                <Plus size={15} /> Add Milestone
              </button>
            </div>

            <NavButtons step={step} setStep={setStep} totalSteps={STEPS.length} />
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 5 — Payment Model
        ══════════════════════════════════════ */}
        {step === 5 && (
          <div className="space-y-5">

            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1a3a5c] mb-1">Payment Model</h2>
              <p className="text-xs text-gray-400 mb-6">How do you prefer to pay your talent?</p>

              <div className="space-y-3 mb-6">
                {[
                  {
                    key: 'milestone',
                    label: '🎯 Milestone-Based',
                    desc: 'Pay per approved milestone. Maximum protection. Strongly recommended.',
                    recommended: true,
                  },
                  {
                    key: 'hourly',
                    label: '⏱️ Hourly',
                    desc: 'Pay for hours worked. Best for ongoing or undefined scope projects.',
                    recommended: false,
                  },
                  {
                    key: 'single',
                    label: '💳 Single Payment',
                    desc: 'Pay full amount at end. Only available for verified clients with track record.',
                    recommended: false,
                    restricted: true,
                  },
                ].map(opt => (
                  <label key={opt.key} className={`relative flex items-start gap-4 p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.paymentModel === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  } ${opt.restricted ? 'opacity-60' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      checked={form.paymentModel === opt.key}
                      onChange={() => !opt.restricted && set('paymentModel', opt.key)}
                      disabled={opt.restricted}
                      className="accent-blue-600 w-4 h-4 mt-0.5 flex-shrink-0"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-bold text-[#1a3a5c]">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                      {opt.restricted && (
                        <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                          <Shield size={11} /> Not available for new clients
                        </p>
                      )}
                    </div>
                    {opt.recommended && (
                      <span className="text-xs font-bold px-2 py-0.5 rounded-full flex-shrink-0"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)', color: '#fff' }}>
                        Recommended
                      </span>
                    )}
                  </label>
                ))}
              </div>

              {/* Escrow explanation */}
              <div className="p-5 bg-gradient-to-br from-green-50 to-blue-50 border border-blue-100 rounded-xl mb-5">
                <div className="flex items-center gap-2 mb-3">
                  <Shield size={18} className="text-blue-600" />
                  <h3 className="text-sm font-bold text-[#1a3a5c]">How Escrow Protects You</h3>
                </div>
                <div className="space-y-2">
                  {[
                    'Your money is locked securely before work begins',
                    'Talent gets paid only after you approve each milestone',
                    'If talent disappears, your funds are returned',
                    'Admin-backed dispute resolution if anything goes wrong',
                  ].map((point, i) => (
                    <div key={i} className="flex items-start gap-2">
                      <CheckCircle size={13} className="text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-xs text-gray-700">{point}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Escrow agreement */}
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.escrowAgreed}
                  onChange={e => set('escrowAgreed', e.target.checked)}
                  className="w-4 h-4 accent-blue-600 mt-0.5 flex-shrink-0"
                />
                <p className="text-xs text-gray-600">
                  I understand that escrow funding is required before the project starts. My payment will be held securely and released milestone by milestone upon my approval.
                </p>
              </label>
            </div>

            <NavButtons step={step} setStep={setStep} totalSteps={STEPS.length} disabled={!form.escrowAgreed} />
          </div>
        )}

        {/* ══════════════════════════════════════
            STEP 6 — Review & Post
        ══════════════════════════════════════ */}
        {step === 6 && (
          <div className="space-y-5">

            {/* Summary */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-[#1a3a5c] mb-5">Project Summary</h2>

              <div className="space-y-4">
                <SummaryRow label="Project Name" value={form.projectName} />
                <SummaryRow label="Type" value={form.projectCategory} />
                <SummaryRow label="Skills" value={form.skills.join(', ')} />
                <SummaryRow label="Budget" value={totalBudget()} />
                <SummaryRow label="Timeline" value={totalWeeks()} />
                <SummaryRow label="Talent Type" value={form.talentType.charAt(0).toUpperCase() + form.talentType.slice(1)} />
                <SummaryRow label="Payment Model" value={form.paymentModel === 'milestone' ? 'Milestone-Based (Escrow)' : form.paymentModel} />
                <SummaryRow label="Milestones" value={`${form.milestones.length} milestones defined`} />
              </div>
            </div>

            {/* Milestones preview */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#1a3a5c] mb-4">Milestone Plan</h3>
              <div className="space-y-3">
                {form.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 bg-gray-50 rounded-xl">
                    <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                      style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)' }}>
                      {i + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-[#1a3a5c]">{m.title || `Milestone ${i + 1}`}</p>
                      <p className="text-xs text-gray-400">{m.weeks} weeks · {m.deliverables.filter(Boolean).length} deliverables</p>
                    </div>
                    <span className="text-sm font-bold text-[#1a3a5c]">{m.percent}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visibility */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h3 className="text-base font-bold text-[#1a3a5c] mb-4">How should talent find your project?</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {[
                  {
                    key: 'ai-matched',
                    label: '🤖 AI Shortlisted',
                    desc: 'AI handpicks top matching talent. You review & invite. No spam bids.',
                    recommended: true,
                  },
                  {
                    key: 'public',
                    label: '🌐 Public Post',
                    desc: 'Anyone can bid. More options but more noise to filter.',
                    recommended: false,
                  },
                ].map(opt => (
                  <label key={opt.key} className={`relative flex items-start gap-3 p-4 rounded-xl border-2 cursor-pointer transition ${
                    form.visibility === opt.key ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                  }`}>
                    <input
                      type="radio"
                      name="visibility"
                      checked={form.visibility === opt.key}
                      onChange={() => set('visibility', opt.key)}
                      className="accent-blue-600 w-4 h-4 mt-0.5"
                    />
                    <div>
                      <p className="text-sm font-bold text-[#1a3a5c]">{opt.label}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{opt.desc}</p>
                    </div>
                    {opt.recommended && (
                      <span className="absolute top-2 right-2 text-xs font-bold px-1.5 py-0.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg,#22c55e,#1d4ed8)', color: '#fff' }}>
                        Recommended
                      </span>
                    )}
                  </label>
                ))}
              </div>
            </div>

            {/* AI Risk check */}
            <div className="bg-yellow-50 border border-yellow-200 rounded-2xl p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertCircle size={16} className="text-yellow-600" />
                <h3 className="text-sm font-bold text-yellow-800">AI Risk Check</h3>
                <span className="ml-auto text-xs font-bold px-2 py-0.5 bg-yellow-200 text-yellow-800 rounded-full">MEDIUM RISK</span>
              </div>
              <div className="space-y-2">
                {budgetWarning && (
                  <p className="text-xs text-yellow-700 flex items-start gap-1.5">
                    <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                    Budget is below recommended range — may reduce talent quality.
                  </p>
                )}
                {timelineWarning && (
                  <p className="text-xs text-yellow-700 flex items-start gap-1.5">
                    <AlertCircle size={12} className="flex-shrink-0 mt-0.5" />
                    Fast-track timeline increases cost and pressure on talent.
                  </p>
                )}
                <p className="text-xs text-blue-700 flex items-start gap-1.5">
                  <Info size={12} className="flex-shrink-0 mt-0.5" />
                  First-time client — enhanced admin monitoring will be active throughout.
                </p>
              </div>
            </div>

            {/* Post button */}
            <button
              className="w-full py-4 rounded-xl text-white font-bold text-base shadow-md hover:opacity-90 transition flex items-center justify-center gap-2"
              style={{ background: 'linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)' }}
            >
              <CheckCircle size={20} />
              Post Project & Find Talent
            </button>

            <button
              onClick={() => setStep(5)}
              className="w-full py-3 rounded-xl text-gray-500 text-sm font-medium hover:bg-gray-100 transition"
            >
              ← Go Back & Edit
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

/* ─────────────────────────────────────────
   NAV BUTTONS (prev / next)
───────────────────────────────────────── */
function NavButtons({ step, setStep, totalSteps, disabled = false }) {
  return (
    <div className="flex items-center justify-between pt-2">
      <button
        onClick={() => setStep(s => s - 1)}
        className="flex items-center gap-2 px-5 py-2.5 border border-gray-200 rounded-xl text-sm font-semibold text-gray-600 hover:bg-gray-50 transition"
      >
        <ArrowLeft size={15} /> Back
      </button>
      <button
        onClick={() => !disabled && setStep(s => s + 1)}
        disabled={disabled}
        className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-white text-sm font-semibold shadow-sm transition ${
          disabled ? 'opacity-40 cursor-not-allowed bg-gray-400' : 'hover:opacity-90'
        }`}
        style={!disabled ? { background: 'linear-gradient(135deg, #22c55e 0%, #1d4ed8 100%)' } : {}}
      >
        Continue <ArrowRight size={15} />
      </button>
    </div>
  );
}

/* ─────────────────────────────────────────
   SUMMARY ROW
───────────────────────────────────────── */
function SummaryRow({ label, value }) {
  return (
    <div className="flex items-start justify-between py-2.5 border-b border-gray-100 last:border-0">
      <span className="text-sm text-gray-400 font-medium">{label}</span>
      <span className="text-sm font-semibold text-[#1a3a5c] text-right max-w-[60%]">{value}</span>
    </div>
  );
}