import { useState } from "react";
import { useNavigate } from "react-router-dom";

/* ── Circular Trust Score Gauge ── */
function TrustGauge({ score = 78 }) {
  const r = 32, cx = 40, cy = 40;
  const circum = 2 * Math.PI * r;
  const fill = (score / 100) * circum;
  return (
    <svg width="80" height="80" className="flex-shrink-0">
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#e5e7eb" strokeWidth="6"/>
      <circle cx={cx} cy={cy} r={r} fill="none" stroke="#3b82f6" strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${fill} ${circum - fill}`}
        strokeDashoffset={circum * 0.25}
        style={{ transition: "stroke-dasharray 1s ease" }}/>
      <text x={cx} y={cy + 5} textAnchor="middle" fontSize="14" fontWeight="700" fill="#111827">{score}</text>
    </svg>
  );
}

/* ── Tab Button ── */
function Tab({ label, active, badge, onClick }) {
  return (
    <button onClick={onClick}
      className={`px-4 py-3 text-sm font-medium border-b-2 transition-all flex items-center gap-1.5
        ${active ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500 hover:text-gray-800"}`}>
      {label}
      {badge && (
        <span className="bg-blue-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
          {badge}
        </span>
      )}
    </button>
  );
}

/* ── Quick Action Button ── */
function ActionBtn({ icon, label }) {
  return (
    <button className="flex items-center gap-2 px-4 py-2.5 border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700 transition-all">
      {icon}{label}
    </button>
  );
}

/* ── Project Card (Overview tab) ── */
function ProjectCard({ project }) {
  return (
    <div className="border border-gray-200 rounded-xl p-5 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between mb-1">
        <div>
          <h3 className="text-sm font-bold text-gray-900">{project.name}</h3>
          <p className="text-xs text-gray-500 mt-0.5">{project.client} ✓</p>
          <p className="text-xs text-gray-400 mt-0.5">{project.task}</p>
        </div>
        <span className="text-xs font-bold bg-green-100 text-green-700 px-2.5 py-1 rounded-full">
          {project.status}
        </span>
      </div>
      <div className="flex items-center gap-3 my-3">
        <div className="flex-1 h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-blue-500 rounded-full transition-all" style={{ width: `${project.progress}%` }}/>
        </div>
        <span className="text-xs font-semibold text-gray-500 flex-shrink-0">{project.progress}%</span>
      </div>
      <div className="flex gap-2 mt-3">
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
          </svg>
          View
        </button>
        <button className="flex items-center gap-1.5 px-3 py-1.5 border border-gray-200 rounded-lg text-xs font-medium text-gray-600 hover:bg-gray-50 transition">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
          </svg>
          Message
        </button>
      </div>
    </div>
  );
}

/* ════════════════ PROJECTS TAB ════════════════ */
// Status priority order: ACTIVE (1) → IN PROGRESS (2) → AT RISK (3) → COMPLETED (4)
const STATUS_PRIORITY = { "ACTIVE": 1, "IN PROGRESS": 2, "AT RISK": 3, "COMPLETED": 4 };

function ProjectsTab({ navigate }) {
  const projects = [
    // ── ACTIVE (highest priority) ──
    {
      id: 5,
      name: "Healthcare Patient Portal",
      client: "MediCore Health",
      status: "ACTIVE",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      health: "STARTING",
      healthColor: "text-purple-700",
      healthDot: "bg-purple-500",
      current: "Kickoff & Requirements",
      due: "Due: Apr 5 (23 days)",
      escrow: "In Escrow: $12,000",
      progress: 5,
      progressColor: "bg-purple-500",
    },
    {
      id: 6,
      name: "AI-Powered CRM System",
      client: "SalesForge Inc.",
      status: "ACTIVE",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      health: "STARTING",
      healthColor: "text-purple-700",
      healthDot: "bg-purple-500",
      current: "Architecture Planning",
      due: "Due: Apr 10 (28 days)",
      escrow: "In Escrow: $11,000",
      progress: 8,
      progressColor: "bg-purple-500",
    },
    {
      id: 7,
      name: "Real Estate Mobile App",
      client: "PropNest Ltd.",
      status: "ACTIVE",
      statusColor: "bg-purple-50 text-purple-700 border-purple-200",
      health: "STARTING",
      healthColor: "text-purple-700",
      healthDot: "bg-purple-500",
      current: "Design System Setup",
      due: "Due: Apr 20 (38 days)",
      escrow: "In Escrow: $8,500",
      progress: 3,
      progressColor: "bg-purple-500",
    },
    // ── IN PROGRESS ──
    {
      id: 1,
      name: "Food Delivery App",
      client: "ByteEats Co.",
      status: "IN PROGRESS",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      health: "EXCELLENT",
      healthColor: "text-green-700",
      healthDot: "bg-green-500",
      current: "Core Development",
      due: "May 20 (68 days)",
      escrow: "In Escrow: $3,500",
      progress: 40,
      progressColor: "bg-blue-500",
    },
    {
      id: 2,
      name: "E-commerce Dashboard",
      client: "GlobalShop Ltd.",
      status: "IN PROGRESS",
      statusColor: "bg-blue-50 text-blue-700 border-blue-200",
      health: "EXCELLENT",
      healthColor: "text-green-700",
      healthDot: "bg-green-500",
      current: "API Integration",
      due: "Jun 10 (89 days)",
      escrow: "In Escrow: $2,800",
      progress: 30,
      progressColor: "bg-blue-500",
    },
    // ── COMPLETED ──
    {
      id: 3,
      name: "Logo Design",
      client: "StartupX",
      status: "COMPLETED",
      statusColor: "bg-green-50 text-green-700 border-green-200",
      health: "5.0 ★",
      healthColor: "text-green-700",
      healthDot: "bg-green-500",
      current: "Delivered: Final Files",
      due: "Delivered: Feb 1",
      escrow: "Paid: $450",
      progress: 100,
      progressColor: "bg-green-500",
    },
    {
      id: 4,
      name: "API Development",
      client: "DataCo",
      status: "COMPLETED",
      statusColor: "bg-green-50 text-green-700 border-green-200",
      health: "4.8 ★",
      healthColor: "text-green-700",
      healthDot: "bg-green-500",
      current: "Delivered: Milestone 2",
      due: "Delivered: Jan 25",
      escrow: "Paid: $800",
      progress: 100,
      progressColor: "bg-green-500",
    },
  ].sort((a, b) => (STATUS_PRIORITY[a.status] ?? 99) - (STATUS_PRIORITY[b.status] ?? 99));

  const VerifiedBadge = () => (
    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
      <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
    </svg>
  );

  const grouped = projects.reduce((acc, proj) => {
    if (!acc[proj.status]) acc[proj.status] = [];
    acc[proj.status].push(proj);
    return acc;
  }, {});

  const statusOrder = ["ACTIVE", "IN PROGRESS", "AT RISK", "COMPLETED"];
  const statusMeta = {
    "ACTIVE":      { label: "Active — Just Started", dot: "bg-purple-500", text: "text-purple-700", bg: "bg-purple-50", border: "border-purple-200" },
    "IN PROGRESS": { label: "In Progress",           dot: "bg-blue-500",   text: "text-blue-700",   bg: "bg-blue-50",   border: "border-blue-200"   },
    "AT RISK":     { label: "At Risk",               dot: "bg-red-500",    text: "text-red-700",    bg: "bg-red-50",    border: "border-red-200"    },
    "COMPLETED":   { label: "Completed",             dot: "bg-green-500",  text: "text-green-700",  bg: "bg-green-50",  border: "border-green-200"  },
  };

  return (
    <div className="space-y-8">
      {statusOrder.filter(s => grouped[s]).map(status => {
        const meta = statusMeta[status];
        return (
          <div key={status}>
            {/* Section label */}
            <div className={`inline-flex items-center gap-2 text-xs font-bold px-3 py-1.5 rounded-full border mb-4 ${meta.text} ${meta.bg} ${meta.border}`}>
              <span className={`w-2 h-2 rounded-full ${meta.dot}`} />
              {meta.label}
              <span className="opacity-50">({grouped[status].length})</span>
            </div>

            <div className="space-y-4">
              {grouped[status].map((proj) => (
                <div key={proj.id} className="border border-gray-200 rounded-2xl p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900">{proj.name}</h2>
                      <p className="text-sm text-gray-500 mt-0.5 flex items-center gap-1">
                        Client: {proj.client} <VerifiedBadge />
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className={`text-xs font-bold border px-3 py-1 rounded-lg ${proj.statusColor}`}>
                        {proj.status}
                      </span>
                      <span className={`text-xs font-bold flex items-center gap-1 ${proj.healthColor}`}>
                        <span className={`w-2 h-2 rounded-full inline-block ${proj.healthDot}`} />
                        {proj.health}
                      </span>
                    </div>
                  </div>

                  {/* Current milestone info */}
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-sm font-bold text-gray-800">
                      {proj.status === "COMPLETED" ? proj.current : `Current: ${proj.current}`}
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {proj.due}
                      </span>
                      <span className="flex items-center gap-1">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/>
                        </svg>
                        {proj.escrow}
                      </span>
                    </div>
                  </div>

                  {/* Progress bar + View Details */}
                  <div className="flex items-center gap-3">
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div className={`${proj.progressColor} h-2 rounded-full`} style={{ width: `${proj.progress}%` }} />
                    </div>
                    <span className="text-xs text-gray-400 font-medium">{proj.progress}%</span>
                    <button
                      onClick={() => navigate(`/dashboard/project/${proj.id}`)}
                      className="text-xs font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap hover:underline transition-colors"
                    >
                      View Details →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
}

/* ════════════════ ANALYTICS TAB ════════════════ */
function AnalyticsTab() {
  const [disputeProject, setDisputeProject] = useState("Food Delivery App — Milestone 2");
  const [disputeIssue, setDisputeIssue] = useState("");
  const [disputeSubmitted, setDisputeSubmitted] = useState(false);

  const skillEarnings = [
    { skill: "React.js", amount: "$9,200", pct: 49, color: "bg-blue-500" },
    { skill: "Node.js",  amount: "$5,400", pct: 29, color: "bg-green-500" },
    { skill: "UI/UX",   amount: "$4,040", pct: 22, color: "bg-purple-500" },
  ];

  const metricCards = [
    { icon: "❤️", label: "Client Repeat Rate",  value: "42%",    sub: "Industry avg: 28%",  subColor: "text-green-600"  },
    { icon: "💰", label: "Avg Project Value",    value: "$1,864", sub: null                                              },
    { icon: "🎯", label: "Win Rate",             value: "73%",    sub: "Invites → projects", subColor: "text-blue-500"   },
    { icon: "⏱️", label: "Avg Response Time",    value: "1.2h",   sub: "✅ Excellent",        subColor: "text-green-600"  },
    { icon: "👁️", label: "Profile Views",        value: "142",    sub: "↑ 23% this week",    subColor: "text-green-600"  },
    { icon: "⭐", label: "Satisfaction",         value: "4.9/5",  sub: "⭐",                  subColor: "text-yellow-500" },
  ];

  const healthMetrics = [
    { label: "On-time Delivery",   pct: 95,  badge: null },
    { label: "Response Rate",      pct: 98,  badge: null },
    { label: "Dispute Rate",       pct: 100, badge: "✅ 0%", badgeColor: "text-green-600" },
    { label: "Profile Completion", pct: 92,  badge: null },
    { label: "Skill Verification", pct: 82,  badge: null },
  ];

  const growthSuggestions = [
    { label: "Add live portfolio link",         reward: "+8 search rank points", rewardColor: "text-blue-600"   },
    { label: "Respond faster (target < 1 hr)",  reward: "+5 points",             rewardColor: "text-blue-600"   },
    { label: "Complete 1 more project",         reward: "Unlock Top Rated",      rewardColor: "text-purple-600" },
    { label: "Get 2 more 5-star reviews",       reward: "Top search page",       rewardColor: "text-green-600"  },
  ];

  const disputeIssues = [
    "Client not responding to milestone review",
    "Client requesting work outside agreed scope",
    "Client requesting refund unfairly",
    "Other (describe below)",
  ];

  return (
    <div className="space-y-6">

      {/* Skill-wise Earnings */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
          </svg>
          <h2 className="text-base font-bold text-gray-900">Skill-wise Earnings</h2>
        </div>
        <div className="space-y-4">
          {skillEarnings.map((s, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1.5">
                <span className="text-sm font-semibold text-gray-800">{s.skill}</span>
                <span className="text-sm text-gray-500">{s.amount} ({s.pct}%)</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                <div className={`h-2.5 rounded-full ${s.color} transition-all duration-700`} style={{ width: `${s.pct * 2}%` }}/>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6 Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {metricCards.map((m, i) => (
          <div key={i} className="border border-gray-200 rounded-2xl p-5">
            <div className="text-2xl mb-2">{m.icon}</div>
            <p className="text-2xl font-black text-gray-900">{m.value}</p>
            <p className="text-xs text-gray-500 mt-0.5">{m.label}</p>
            {m.sub && <p className={`text-xs font-semibold mt-1 ${m.subColor}`}>{m.sub}</p>}
          </div>
        ))}
      </div>

      {/* AI Career Report */}
      <div className="border-l-4 border-purple-400 border border-purple-100 bg-white rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <span className="text-lg">🤖</span>
            <h2 className="text-base font-bold text-gray-900">AI Career Report</h2>
          </div>
          <span className="text-xs text-gray-400">Week of Feb 10–16, 2026</span>
        </div>
        <div className="space-y-4">
          {[
            {
              icons: "💡 📈", title: "Skills to Learn Next",
              body: "TypeScript is required in 67% of React job postings on ArcLancer. Adding TypeScript could increase your invite rate by ~35%.",
              btn: "Find TypeScript courses",
              btn2: "Add to profile when ready",
            },
            {
              icons: "💲 🔥", title: "Pricing Suggestion",
              body: "Your React rate ($75/hr) is 15% below top-rated peers with similar scores. Consider raising to $85/hr.",
              btn: "→ Update my rate",
            },
            {
              icons: "⚡ 🔍", title: "Profile Improvements",
              body: "Adding a live demo to your portfolio increases invitation rate by 24% based on platform data.",
              btn: "→ Edit portfolio",
            },
          ].map((item, i) => (
            <div key={i} className="bg-gray-50 border border-gray-100 rounded-xl p-4">
              <h3 className="text-sm font-bold text-gray-800 mb-2">{item.icons} {item.title}</h3>
              <p className="text-sm text-gray-600 mb-3 italic">{item.body}</p>
              <div className="flex gap-2">
                <button className="text-xs font-semibold border border-gray-200 bg-white px-3 py-2 rounded-lg hover:bg-gray-50 transition">{item.btn}</button>
                {item.btn2 && <button className="text-xs font-semibold border border-gray-200 bg-white px-3 py-2 rounded-lg hover:bg-gray-50 transition">{item.btn2}</button>}
              </div>
            </div>
          ))}
        </div>
        <p className="text-xs text-gray-400 mt-4">Next report: Feb 17, 2026</p>
      </div>

      {/* Account Health */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>
            </svg>
            <h2 className="text-base font-bold text-gray-900">Account Health</h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-3xl font-black text-gray-900">88</span>
            <span className="text-sm text-gray-400">/100</span>
            <span className="text-sm font-bold text-green-600 ml-1">Excellent</span>
          </div>
        </div>
        <div className="space-y-3 mb-5">
          {healthMetrics.map((m, i) => (
            <div key={i}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm text-gray-700">{m.label}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-800">{m.pct}%</span>
                  {m.badge
                    ? <span className={`text-xs font-bold ${m.badgeColor}`}>{m.badge}</span>
                    : <span className="text-green-500 text-xs">↑</span>}
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
                <div className="h-2 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${m.pct}%` }}/>
              </div>
            </div>
          ))}
        </div>
        <div className="bg-gray-50 border border-gray-100 rounded-xl p-4">
          <p className="text-xs font-bold text-gray-700 mb-2">What this affects:</p>
          <div className="space-y-1.5">
            {["Priority in AI recommendations", "Access to high-value projects", "Faster payment processing", "Higher trust display to clients"].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-sm text-green-600">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                </svg>
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Raise a Dispute */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-2">
          <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
          </svg>
          <h2 className="text-base font-bold text-gray-900">Raise a Dispute</h2>
        </div>
        <p className="text-sm text-gray-500 mb-5">Select a project and milestone if you need to raise an issue.</p>
        {disputeSubmitted ? (
          <div className="bg-green-50 border border-green-200 rounded-xl p-5 text-center">
            <svg className="w-8 h-8 text-green-500 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm font-bold text-green-800">Dispute Submitted</p>
            <p className="text-xs text-green-600 mt-1">Our team will review and respond within 3–5 business days.</p>
          </div>
        ) : (
          <>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Project</label>
              <div className="relative">
                <select value={disputeProject} onChange={e => setDisputeProject(e.target.value)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm text-gray-800 bg-white outline-none appearance-none focus:border-blue-400 focus:ring-2 focus:ring-blue-100">
                  <option>Food Delivery App — Milestone 2</option>
                  <option>E-commerce Dashboard — Milestone 1</option>
                </select>
                <svg className="absolute right-3 top-3.5 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7"/>
                </svg>
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-2">What's the issue?</label>
              <div className="space-y-2">
                {disputeIssues.map((issue, i) => (
                  <label key={i} className={`flex items-center gap-3 border rounded-xl px-4 py-3 cursor-pointer transition
                    ${disputeIssue === issue ? "border-blue-400 bg-blue-50" : "border-gray-200 bg-white hover:bg-gray-50"}`}>
                    <input type="radio" name="issue" value={issue} checked={disputeIssue === issue}
                      onChange={() => setDisputeIssue(issue)} className="accent-blue-500 flex-shrink-0"/>
                    <span className="text-sm text-gray-700">{issue}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Evidence</label>
              <div className="border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 text-center text-sm text-gray-400 hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer">
                <span>📎 Upload files</span>
                <span className="text-gray-300 mx-2">or</span>
                <span>🔗 Link to ProjectStream messages</span>
              </div>
            </div>
            <div className="space-y-1.5 mb-5 text-xs text-gray-500">
              <p>🤖 AI will analyze: Chat history · Files · Timeline</p>
              <p>🔒 Funds status during dispute: Held in escrow</p>
              <p>⏱ Expected resolution: 3–5 business days</p>
            </div>
            <button onClick={() => setDisputeSubmitted(true)} disabled={!disputeIssue}
              className={`flex items-center gap-2 text-sm font-semibold px-6 py-3 rounded-xl transition
                ${disputeIssue ? "bg-blue-500 hover:bg-blue-600 text-white" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/>
              </svg>
              Submit Dispute
            </button>
          </>
        )}
      </div>

      {/* Growth Suggestions */}
      <div className="border border-gray-200 rounded-2xl p-6">
        <div className="flex items-center gap-2 mb-5">
          <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"/>
          </svg>
          <h2 className="text-base font-bold text-gray-900">Growth Suggestions</h2>
        </div>
        <div className="space-y-2">
          {growthSuggestions.map((s, i) => (
            <div key={i} className="flex items-center justify-between border border-gray-100 rounded-xl px-4 py-3.5 hover:bg-gray-50 transition">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-full bg-gray-100 text-gray-600 text-xs font-bold flex items-center justify-center flex-shrink-0">{i + 1}</span>
                <span className="text-sm text-gray-800">{s.label}</span>
              </div>
              <span className={`text-xs font-bold ${s.rewardColor} flex-shrink-0 ml-4`}>{s.reward}</span>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

/* ════════════════ MAIN DASHBOARD ════════════════ */
export default function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [withdrawalAmount, setWithdrawalAmount] = useState("850.00");
  const [withdrawalMethod, setWithdrawalMethod] = useState("bank");

  const stats = [
    { icon: <svg className="w-5 h-5 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7"/></svg>, bg: "bg-blue-50",   label: "Active Projects",    value: "2",       sub: "On track",     subColor: "text-blue-500"   },
    { icon: <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>, bg: "bg-green-50",  label: "In Escrow",          value: "$5,200",  sub: "Protected",    subColor: "text-green-500"  },
    { icon: <svg className="w-5 h-5 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>, bg: "bg-amber-50",  label: "Available Balance",  value: "$2,840",  sub: "Withdraw →",   subColor: "text-amber-500"  },
    { icon: <svg className="w-5 h-5 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"/></svg>, bg: "bg-purple-50", label: "Trust Score",        value: "78/100",  sub: "Rising Talent",subColor: "text-purple-500" },
  ];

  const activeProjects = [
    { name: "Food Delivery App",    client: "ByteEats Co.",    status: "ON TRACK", progress: 40, task: "Core Dev (2/4)" },
    { name: "E-commerce Dashboard", client: "GlobalShop Ltd.", status: "ON TRACK", progress: 30, task: "API (1/3)"      },
  ];

  const invitations = [
    { name: "E-commerce Redesign", time: "2h ago", match: 98 },
    { name: "Mobile App MVP",      time: "5h ago", match: 91 },
    { name: "SaaS Dashboard",      time: "1d ago", match: 82 },
  ];

  const transactionHistory = [
    { date: "Feb 12", project: "Food Delivery App", type: "Milestone 1", amount: "$1,600", fee: "-$160", net: "$1,440", status: "RELEASED" },
    { date: "Feb 1",  project: "Logo Design",        type: "Final",       amount: "$450",   fee: "-$54",  net: "$396",   status: "RELEASED" },
    { date: "Jan 25", project: "API Development",    type: "Milestone 2", amount: "$800",   fee: "-$80",  net: "$720",   status: "RELEASED" },
    { date: "Jan 10", project: "E-commerce Site",    type: "Milestone 1", amount: "$2,200", fee: "-$264", net: "$1,936", status: "RELEASED" },
  ];

  const invoices = [
    { id: "INV-2026-0234", client: "ByteEats",  milestone: "M1",    amount: "$1,800", date: "Feb 13" },
    { id: "INV-2026-0201", client: "GlobalCo",  milestone: "M2",    amount: "$3,200", date: "Feb 2"  },
    { id: "INV-2026-0189", client: "StartupX",  milestone: "Final", amount: "$450",   date: "Jan 25" },
  ];

  const jobListings = [
    {
      tag: "invite", tagLabel: "🔥 Invite-Only", tagExtra: "⏳ Expires in 48 hours",
      title: "E-commerce Platform — React + Node.js",
      company: "GlobalShop Ltd.", verified: true, rating: 4.8, reviews: 12,
      skills: ["React 18", "Node.js", "PostgreSQL ✓"],
      budget: "$8,000–$12,000", duration: "3 months", time: "2h ago", match: 98,
      buttons: [{ label: "✓ Accept Invitation", style: "primary" }, { label: "👁 View Details", style: "outline" }, { label: "✕ Decline", style: "ghost" }],
    },
    {
      tag: "ai", tagLabel: "🤖 AI Recommended",
      title: "Food Delivery App — Mobile (React Native)",
      company: "ByteEats Co.", verified: true, rating: 4.6, reviews: 8,
      skills: ["React Native ✓", "Firebase ✓", "UI/UX"],
      budget: "$5,000–$7,500", duration: "2 months", time: "5h ago", match: 91,
      buttons: [{ label: "✈ Apply Now", style: "primary" }, { label: "👁 View Details", style: "outline" }],
    },
    {
      tag: "open", tagLabel: "📊 Open for Bids",
      title: "SaaS Dashboard UI — Figma + React",
      company: "MetricsPro", verified: false, newClient: true,
      skills: ["React ✓", "Figma", "TypeScript ✓"],
      budget: "$2,000–$3,000", duration: "4 weeks", time: "1d ago", match: 82,
      buttons: [{ label: "✈ Use 1 Bid to Apply", style: "primary" }, { label: "Save for later", style: "ghost" }],
    },
    {
      tag: "ai", tagLabel: "🤖 AI Recommended",
      title: "API Integration Service — Node + AWS",
      company: "DataFlow Inc.", verified: true, rating: 4.9, reviews: 23,
      skills: ["Node.js ✓", "AWS", "REST API"],
      budget: "$3,000–$5,000", duration: "6 weeks", time: "3h ago", match: 76,
      buttons: [{ label: "✈ Apply Now", style: "primary" }, { label: "👁 View Details", style: "outline" }],
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Navbar */}
      <header className="bg-white border-b border-gray-200 px-6 py-3 flex items-center justify-between sticky top-0 z-30">
        <span className="text-blue-600 font-bold text-xl tracking-tight">ArcLancer</span>
        <div className="flex items-center gap-3">
          <span className="text-xs font-bold border-2 border-green-500 text-green-600 px-3 py-1 rounded-full">FREELANCER</span>
          <div className="relative">
            <button className="w-9 h-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-gray-50 transition">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/>
              </svg>
            </button>
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">3</span>
          </div>
          <div className="w-9 h-9 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-sm">A</div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">

        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">Your Freelancer Dashboard</h1>
          <p className="text-sm text-gray-500 mt-1">Manage projects, track earnings, and grow your profile</p>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {stats.map((s, i) => (
            <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-sm transition-all">
              <div className={`w-10 h-10 ${s.bg} rounded-xl flex items-center justify-center mb-3`}>{s.icon}</div>
              <p className="text-2xl font-bold text-gray-900 mb-0.5">{s.value}</p>
              <p className="text-xs text-gray-500">{s.label}</p>
              <p className={`text-xs font-semibold mt-1 ${s.subColor}`}>{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white border border-gray-200 rounded-2xl mb-6 overflow-hidden">
          <div className="flex border-b border-gray-200 px-4 overflow-x-auto">
            {[
              { key: "overview",  label: "Overview"  },
              { key: "foryou",    label: "For You",  badge: 4 },
              { key: "projects",  label: "Projects"  },
              { key: "wallet",    label: "Wallet"    },
              { key: "analytics", label: "Analytics" },
            ].map(t => (
              <Tab key={t.key} label={t.label} badge={t.badge} active={activeTab === t.key} onClick={() => setActiveTab(t.key)}/>
            ))}
          </div>

          <div className="p-6">

            {/* ═══ OVERVIEW ═══ */}
            {activeTab === "overview" && (
              <div className="flex flex-col lg:flex-row gap-6">
                <div className="flex-1 min-w-0 space-y-6">
                  <div>
                    <h2 className="text-sm font-bold text-gray-800 mb-3">Quick Actions</h2>
                    <div className="flex flex-wrap gap-2">
                      <ActionBtn label="Browse Jobs" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>}/>
                      <ActionBtn label="Submit Milestone" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"/></svg>}/>
                      <ActionBtn label="Withdraw" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"/></svg>}/>
                      <ActionBtn label="Analytics" icon={<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>}/>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 10V7"/></svg>
                      <h2 className="text-sm font-bold text-gray-800">Active Projects</h2>
                    </div>
                    <div className="space-y-3">
                      {activeProjects.map((p, i) => <ProjectCard key={i} project={p}/>)}
                    </div>
                  </div>
                </div>

                {/* Sidebar */}
                <div className="w-full lg:w-72 xl:w-80 flex-shrink-0 space-y-4">
                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                      <span className="text-sm font-bold text-gray-800">Trust Score</span>
                    </div>
                    <div className="flex items-center gap-4 mb-3">
                      <TrustGauge score={78}/>
                      <div>
                        <p className="text-base font-bold text-gray-900">Rising Talent</p>
                        <p className="text-xs text-gray-500">Top 25%</p>
                      </div>
                    </div>
                    <div className="w-full bg-gray-100 rounded-full h-1.5 mb-1.5">
                      <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: "78%" }}/>
                    </div>
                    <p className="text-xs text-gray-400">Next: Top Rated (81+)</p>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
                      <span className="text-sm font-bold text-gray-800">New Invitations</span>
                    </div>
                    <div className="space-y-3">
                      {invitations.map((inv, i) => (
                        <div key={i} className="flex items-center justify-between">
                          <div>
                            <p className="text-xs font-semibold text-gray-800">{inv.name}</p>
                            <p className="text-xs text-gray-400">{inv.time}</p>
                          </div>
                          <span className="text-xs font-bold text-green-600">{inv.match}%</span>
                        </div>
                      ))}
                    </div>
                    <button className="flex items-center gap-1 text-xs font-semibold text-blue-500 hover:text-blue-700 transition mt-4">
                      View All
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7"/></svg>
                    </button>
                  </div>

                  <div className="bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="flex items-center gap-2 mb-4">
                      <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/></svg>
                      <span className="text-sm font-bold text-gray-800">This Month</span>
                    </div>
                    <div className="space-y-2.5">
                      {[
                        { label: "Earned",        value: "$2,050", color: "text-gray-900"   },
                        { label: "Response Time", value: "1.2h ✓", color: "text-green-600"  },
                        { label: "Win Rate",      value: "73%",    color: "text-gray-900"   },
                        { label: "Satisfaction",  value: "⭐ 4.9",  color: "text-gray-900"   },
                      ].map((item, i) => (
                        <div key={i} className="flex justify-between items-center">
                          <span className="text-xs text-gray-500">{item.label}</span>
                          <span className={`text-xs font-bold ${item.color}`}>{item.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ FOR YOU ═══ */}
            {activeTab === "foryou" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between bg-white border border-gray-200 rounded-xl px-4 py-3">
                  <div className="flex items-center gap-3">
                    <svg className="w-5 h-5 text-blue-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                    <div>
                      <p className="text-sm text-gray-700">Bids remaining today: <span className="font-bold text-blue-600">1 of 3</span></p>
                      <p className="text-xs text-gray-400">Resets at midnight · AI checks bid relevance before submission</p>
                    </div>
                  </div>
                  <div className="flex gap-1.5 flex-shrink-0">
                    {[1,2,3].map(i => <div key={i} className={`h-2 w-8 rounded-full ${i <= 1 ? "bg-blue-500" : "bg-gray-200"}`}/>)}
                  </div>
                </div>

                <div className="flex items-center justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"/></svg>
                    <h2 className="text-sm font-bold text-gray-800">Jobs Matched for You</h2>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {["All Skills", "Budget", "Best Match", "Most Recent"].map(f => (
                      <button key={f} className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition
                        ${f === "Best Match" ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"}`}>{f}</button>
                    ))}
                  </div>
                </div>

                <div className="border border-gray-200 rounded-xl overflow-hidden">
                  <div className="flex items-center gap-2 px-5 py-3.5 border-b border-gray-100 bg-gray-50">
                    <svg className="w-4 h-4 text-yellow-500" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                    <span className="text-sm font-bold text-gray-800">Recent Invitations</span>
                  </div>
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-gray-100">
                        {["Project","Client","Budget","Sent","Status"].map(h => (
                          <th key={h} className="text-left px-5 py-3 text-xs font-semibold text-gray-500">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        { project: "E-commerce Platform", client: "GlobalShop", budget: "$10K",  sent: "Today",     status: "PENDING"  },
                        { project: "Logo Design",          client: "StartupX",   budget: "$500",  sent: "Yesterday", status: "ACCEPTED" },
                        { project: "API Dev",              client: "DataCo",     budget: "$3K",   sent: "3d ago",    status: "DECLINED" },
                      ].map((row, i) => (
                        <tr key={i} className="border-b border-gray-50 hover:bg-gray-50 transition">
                          <td className="px-5 py-3.5 font-medium text-gray-900">{row.project}</td>
                          <td className="px-5 py-3.5 text-gray-600">{row.client}</td>
                          <td className="px-5 py-3.5 text-gray-600">{row.budget}</td>
                          <td className="px-5 py-3.5 text-gray-500">{row.sent}</td>
                          <td className="px-5 py-3.5">
                            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-bold
                              ${row.status === "PENDING"  ? "bg-yellow-50 text-yellow-700 border border-yellow-200" :
                                row.status === "ACCEPTED" ? "bg-green-50 text-green-700 border border-green-200" :
                                                            "bg-red-50 text-red-700 border border-red-200"}`}>
                              {row.status === "PENDING" ? "⏳" : row.status === "ACCEPTED" ? "✅" : "❌"} {row.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {jobListings.map((job, i) => (
                  <div key={i} className="border border-gray-200 rounded-xl p-5 hover:shadow-sm hover:border-blue-200 transition-all">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg
                            ${job.tag === "invite" ? "bg-orange-50 text-orange-600 border border-orange-200" :
                              job.tag === "ai"     ? "bg-green-50 text-green-600 border border-green-200" :
                                                     "bg-blue-50 text-blue-600 border border-blue-200"}`}>
                            {job.tagLabel}
                          </span>
                          {job.tagExtra && <span className="text-xs text-amber-600 font-medium">{job.tagExtra}</span>}
                        </div>
                        <h3 className="text-base font-bold text-gray-900 mb-1">{job.title}</h3>
                        <div className="flex items-center gap-1.5 mb-3 text-sm text-gray-500 flex-wrap">
                          <span>{job.company}</span>
                          {job.verified && <span className="text-green-600 font-semibold text-xs">✓ Verified</span>}
                          {job.newClient && <span className="text-amber-500 font-semibold text-xs">⚠ New Client</span>}
                          {job.rating && <span className="text-xs">⭐ {job.rating} ({job.reviews})</span>}
                        </div>
                        <div className="flex flex-wrap gap-1.5 mb-3">
                          {job.skills.map(s => (
                            <span key={s} className={`text-xs px-2.5 py-0.5 rounded-full font-medium border
                              ${s.includes("✓") ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-gray-100 text-gray-600 border-gray-200"}`}>{s}</span>
                          ))}
                        </div>
                        <div className="flex items-center gap-4 text-xs text-gray-500 mb-4">
                          <span>{job.budget}</span>
                          <span>{job.duration}</span>
                          <span>{job.time}</span>
                        </div>
                        <div className="flex gap-2 flex-wrap">
                          {job.buttons.map((btn, bi) => (
                            <button key={bi} className={`text-xs font-semibold px-4 py-2 rounded-xl transition
                              ${btn.style === "primary" ? "bg-blue-500 hover:bg-blue-600 text-white" :
                                btn.style === "outline" ? "border border-gray-200 text-gray-700 hover:bg-gray-50" :
                                                          "text-gray-500 hover:text-gray-700"}`}>
                              {btn.label}
                            </button>
                          ))}
                        </div>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-2xl font-black text-green-600">{job.match}%</p>
                        <p className="text-xs text-gray-400">Match</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ═══ PROJECTS ═══ */}
            {activeTab === "projects" && <ProjectsTab navigate={navigate} />}

            {/* ═══ WALLET ═══ */}
            {activeTab === "wallet" && (
              <div className="space-y-7">
                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-4">Wallet Overview</h2>
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    {[
                      { label: "Available Balance", value: "$2,840.00", color: "text-blue-600",   bg: "bg-blue-50",   btn: "Withdraw →"    },
                      { label: "Pending (Escrow)",  value: "$5,200.00", color: "text-green-600",  bg: "bg-green-50",  btn: "View Projects" },
                      { label: "Held (Dispute)",    value: "$0.00",     color: "text-yellow-600", bg: "bg-yellow-50", btn: "Details"       },
                      { label: "Total Earned",      value: "$18,640",   color: "text-purple-600", bg: "bg-purple-50", btn: "History"       },
                    ].map((b, i) => (
                      <div key={i} className={`${b.bg} border border-gray-200 rounded-xl p-4`}>
                        <p className="text-xs text-gray-500 mb-1">{b.label}</p>
                        <p className={`text-xl font-black ${b.color} mb-3`}>{b.value}</p>
                        <button className="text-xs font-semibold text-gray-600 border border-gray-200 bg-white px-3 py-1.5 rounded-lg hover:bg-gray-50 w-full transition">{b.btn}</button>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-5">
                  <h3 className="text-sm font-bold text-gray-800 mb-3">This Month (FEB 2026)</h3>
                  <div className="flex gap-8">
                    {[{ label: "Earned", val: "$2,050", c: "text-gray-900" }, { label: "Platform fee", val: "-$246", c: "text-red-600" }, { label: "Net", val: "$1,804", c: "text-green-600" }].map(item => (
                      <div key={item.label}>
                        <p className="text-xs text-gray-500">{item.label}</p>
                        <p className={`text-xl font-bold ${item.c}`}>{item.val}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-4">Withdraw Earnings</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
                    {[
                      { id: "bank",     name: "Bank Transfer", fee: "1%",   icon: "🏦" },
                      { id: "paypal",   name: "PayPal",        fee: "2.5%", icon: "🅿️" },
                      { id: "payoneer", name: "Payoneer",      fee: "2%",   icon: "💳" },
                      { id: "wise",     name: "Wise",          fee: "1.5%", icon: "🪙" },
                    ].map(m => (
                      <button key={m.id} onClick={() => setWithdrawalMethod(m.id)}
                        className={`p-3 rounded-xl border-2 text-center transition
                          ${withdrawalMethod === m.id ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white hover:border-blue-300"}`}>
                        <div className="text-2xl mb-1">{m.icon}</div>
                        <p className="text-xs font-semibold text-gray-800">{m.name}</p>
                        <p className="text-xs text-gray-400">Fee: {m.fee}</p>
                      </button>
                    ))}
                  </div>
                  <div className="border border-gray-200 rounded-xl p-5 bg-gray-50 max-w-md">
                    <label className="block text-xs font-semibold text-gray-700 mb-1.5">Amount ($)</label>
                    <input type="number" value={withdrawalAmount} onChange={e => setWithdrawalAmount(e.target.value)}
                      className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm outline-none bg-white focus:border-blue-400 focus:ring-2 focus:ring-blue-100 mb-1"/>
                    <p className="text-xs text-gray-400 mb-4">Min: $50 · Available: $2,840.00</p>
                    <div className="bg-white border border-gray-200 rounded-xl p-3 mb-4 space-y-2 text-xs">
                      <div className="flex justify-between"><span className="text-gray-500">Amount:</span><span className="font-semibold">${withdrawalAmount}</span></div>
                      <div className="flex justify-between"><span className="text-gray-500">Fee (1%):</span><span className="text-red-500 font-semibold">-${(withdrawalAmount * 0.01).toFixed(2)}</span></div>
                      <div className="flex justify-between border-t border-gray-100 pt-2"><span className="text-gray-500">You'll receive:</span><span className="text-green-600 font-bold">${(withdrawalAmount * 0.99).toFixed(2)}</span></div>
                      <p className="text-gray-400">Est. arrival: 3-5 business days</p>
                    </div>
                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white text-sm font-semibold py-2.5 rounded-xl transition">Confirm Withdrawal</button>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-4">Transaction History</h2>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>{["Date","Project","Type","Amount","Fee","Net","Status"].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {transactionHistory.map((tx, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-gray-600">{tx.date}</td>
                            <td className="px-4 py-3 text-gray-800 font-medium">{tx.project}</td>
                            <td className="px-4 py-3 text-gray-600">{tx.type}</td>
                            <td className="px-4 py-3 text-gray-800 font-semibold">{tx.amount}</td>
                            <td className="px-4 py-3 text-red-500 font-semibold">{tx.fee}</td>
                            <td className="px-4 py-3 text-green-600 font-semibold">{tx.net}</td>
                            <td className="px-4 py-3"><span className="bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold">{tx.status}</span></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div>
                  <h2 className="text-base font-bold text-gray-900 mb-3">Invoices &amp; Tax</h2>
                  <div className="flex gap-2 mb-4">
                    {["Tax Summary PDF", "Export Excel"].map(l => (
                      <button key={l} className="flex items-center gap-1.5 text-xs font-semibold border border-gray-200 rounded-lg px-3 py-2 text-gray-600 hover:bg-gray-50 transition">
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                        {l}
                      </button>
                    ))}
                  </div>
                  <div className="overflow-x-auto rounded-xl border border-gray-200">
                    <table className="w-full text-xs">
                      <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>{["Invoice","Client","Milestone","Amount","Date","Action"].map(h => (
                          <th key={h} className="text-left px-4 py-3 font-semibold text-gray-600">{h}</th>
                        ))}</tr>
                      </thead>
                      <tbody>
                        {invoices.map((inv, i) => (
                          <tr key={i} className="border-b border-gray-100 hover:bg-gray-50">
                            <td className="px-4 py-3 text-blue-600 font-semibold">{inv.id}</td>
                            <td className="px-4 py-3 text-gray-700">{inv.client}</td>
                            <td className="px-4 py-3 text-gray-700">{inv.milestone}</td>
                            <td className="px-4 py-3 text-gray-800 font-semibold">{inv.amount}</td>
                            <td className="px-4 py-3 text-gray-600">{inv.date}</td>
                            <td className="px-4 py-3">
                              <button className="flex items-center gap-1 text-blue-500 hover:text-blue-700 font-semibold">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"/></svg>
                                Download
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {/* ═══ ANALYTICS ═══ */}
            {activeTab === "analytics" && <AnalyticsTab />}

          </div>
        </div>
      </div>
    </div>
  );
}