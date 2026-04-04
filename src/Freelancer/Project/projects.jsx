import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const projectsData = [
 {
  id: 1,
  name: "Food Delivery App",
  client: "ByteEats Co.",
  clientVerified: true,
  budget: "$42,000",
  released: "$18,200",
  remaining: "$23,800",
  progress: 65,
  status: "ON TRACK",
  riskLevel: "MEDIUM",
  riskColor: "yellow",
  startDate: "Jan 15, 2026",
  deadline: "May 30, 2026",
  category: "Mobile Development",
  description: "A full-featured food delivery mobile application with real-time order tracking, restaurant management portal, driver app, and customer-facing iOS/Android apps. Integrated payment gateways and AI-based ETA prediction.",
  team: [
   { name: "Raj Kumar", role: "Lead / Full Stack", initial: "R", bg: "bg-blue-100", color: "text-blue-700", hours: "30h/week", workload: 95, workloadLabel: "High", workloadColor: "text-red-500" },
   { name: "Dev Mike", role: "Backend", initial: "D", bg: "bg-blue-100", color: "text-blue-700", hours: "40h/week", workload: 65, workloadLabel: "Medium", workloadColor: "text-yellow-500" },
   { name: "James L.", role: "DevOps", initial: "J", bg: "bg-gray-100", color: "text-gray-700", hours: "20h/week", workload: 50, workloadLabel: "Healthy", workloadColor: "text-green-600" },
  ],
  milestones: [
   { id: "M1", label: "Architecture & Design", amount: "$8,000", status: "done", completedDate: "Feb 10, 2026" },
   { id: "M2", label: "Core Features", amount: "$14,000", status: "inprogress", pct: 65, dueDate: "Apr 20, 2026" },
   { id: "M3", label: "Advanced Features", amount: "$12,000", status: "pending", dueDate: "May 10, 2026" },
   { id: "M4", label: "Testing & Launch", amount: "$8,000", status: "pending", dueDate: "May 30, 2026" },
  ],
  tasks: {
   todo: [{ title: "Restaurant dashboard UI", assigned: "Raj Kumar", priority: "high", est: "16h" }, { title: "Payment gateway integration", assigned: "Dev Mike", priority: "high", est: "20h" }],
   inprogress: [{ title: "Real-time order tracking", assigned: "Dev Mike", priority: "high", est: "24h", due: "Apr 18" }],
   review: [{ title: "Driver mobile app", assigned: "Raj Kumar", priority: "medium", est: "30h", reviewer: "James L." }],
   done: [{ title: "System architecture", assigned: "Raj Kumar", est: "12h" }, { title: "Database schema", assigned: "Dev Mike", est: "8h" }, { title: "Auth system", assigned: "Dev Mike", est: "10h" }, { title: "API gateway setup", assigned: "James L.", est: "6h" }],
  },
  recentActivity: [
   { icon: "✅", text: "M1: Architecture completed", time: "2 days ago" },
   { icon: "💬", text: "Client approved design mockups", time: "3 days ago" },
   { icon: "📎", text: "Dev Mike uploaded backend specs", time: "5 days ago" },
  ],
  aiInsights: [
   "Raj Kumar is at 95% capacity — consider reassigning tasks to free up bandwidth before M3.",
   "M2 is 65% complete with 10 days remaining — delivery is on track but tight.",
   "Client ByteEats has been highly responsive (avg 2h reply time) — good engagement signal.",
  ],
 },
 {
  id: 2,
  name: "E-commerce Platform",
  client: "GlobalShop",
  clientVerified: true,
  budget: "$20,000",
  released: "$4,200",
  remaining: "$15,800",
  progress: 30,
  status: "ON TRACK",
  riskLevel: "LOW",
  riskColor: "green",
  startDate: "Feb 01, 2026",
  deadline: "Jun 15, 2026",
  category: "Web Frontend",
  description: "A scalable e-commerce platform with multi-vendor support, AI-powered product recommendations, advanced search & filtering, real-time inventory management, and integrated analytics dashboard for merchants.",
  team: [
   { name: "Raj Kumar", role: "Lead / Full Stack", initial: "R", bg: "bg-blue-100", color: "text-blue-700", hours: "30h/week", workload: 95, workloadLabel: "High", workloadColor: "text-red-500" },
   { name: "Sara M.", role: "Frontend", initial: "S", bg: "bg-pink-100", color: "text-pink-700", hours: "25h/week", workload: 62, workloadLabel: "Healthy", workloadColor: "text-green-600" },
   { name: "Dev Mike", role: "Backend", initial: "D", bg: "bg-blue-100", color: "text-blue-700", hours: "30h/week", workload: 65, workloadLabel: "Medium", workloadColor: "text-yellow-500" },
  ],
  milestones: [
   { id: "M1", label: "Architecture", amount: "$4,200", status: "done", completedDate: "Mar 01, 2026" },
   { id: "M2", label: "Core Features", amount: "$8,400", status: "inprogress", pct: 55, dueDate: "May 15, 2026" },
   { id: "M3", label: "Advanced Features", amount: "$5,040", status: "pending", dueDate: "Jun 01, 2026" },
   { id: "M4", label: "Testing & Launch", amount: "$2,360", status: "pending", dueDate: "Jun 15, 2026" },
  ],
  tasks: {
   todo: [{ title: "Cart system", assigned: "Sara M.", priority: "medium", est: "8h" }, { title: "Checkout flow", assigned: "Dev Mike", priority: "high", est: "12h" }],
   inprogress: [{ title: "Product search API", assigned: "Sara M.", priority: "high", est: "12h", due: "May 15" }],
   review: [{ title: "User auth", assigned: "Dev Mike", priority: "medium", est: "6h", reviewer: "Raj Kumar" }],
   done: [{ title: "DB schema", assigned: "Dev Mike", est: "4h" }, { title: "Auth endpoints", assigned: "Dev Mike", est: "8h" }, { title: "Category API", assigned: "Sara M.", est: "6h" }],
  },
  recentActivity: [
   { icon: "✅", text: "M1: Architecture approved & paid out", time: "12 days ago" },
   { icon: "🔄", text: "User auth moved to review", time: "1 day ago" },
   { icon: "💬", text: "GlobalShop requested design review call", time: "4 hours ago" },
  ],
  aiInsights: [
   "Sara M. is at healthy 62% capacity — she can absorb 1–2 more tasks before M2 deadline.",
   "M2 is 30 days away with 55% complete — pace needs to increase by ~15% to hit deadline.",
   "Low risk classification: no disputes, all milestones on schedule, client is verified.",
  ],
 },
 {
  id: 3,
  name: "Healthcare Patient Portal",
  client: "MediCore Health",
  clientVerified: true,
  budget: "$68,000",
  released: "$31,500",
  remaining: "$36,500",
  progress: 48,
  status: "AT RISK",
  riskLevel: "HIGH",
  riskColor: "red",
  startDate: "Dec 10, 2025",
  deadline: "Jun 30, 2026",
  category: "Web Application",
  description: "A HIPAA-compliant patient portal enabling appointment scheduling, teleconsultation, electronic health records (EHR) access, prescription tracking, and secure messaging between patients and physicians. Includes an admin panel for hospital staff.",
  team: [
   { name: "Priya Nair", role: "Lead / Full Stack", initial: "P", bg: "bg-purple-100", color: "text-purple-700", hours: "40h/week", workload: 88, workloadLabel: "High", workloadColor: "text-red-500" },
   { name: "Tom Chen", role: "Backend / Security", initial: "T", bg: "bg-gray-100", color: "text-gray-700", hours: "35h/week", workload: 78, workloadLabel: "Medium", workloadColor: "text-yellow-500" },
   { name: "Anita Roy", role: "Frontend", initial: "A", bg: "bg-pink-100", color: "text-pink-700", hours: "30h/week", workload: 55, workloadLabel: "Healthy", workloadColor: "text-green-600" },
   { name: "Carlos D.", role: "QA / Compliance", initial: "C", bg: "bg-green-100", color: "text-green-700", hours: "25h/week", workload: 70, workloadLabel: "Medium", workloadColor: "text-yellow-500" },
  ],
  milestones: [
   { id: "M1", label: "Compliance & Architecture", amount: "$12,000", status: "done", completedDate: "Jan 20, 2026" },
   { id: "M2", label: "EHR & Auth Module", amount: "$18,000", status: "done", completedDate: "Feb 28, 2026" },
   { id: "M3", label: "Teleconsult & Scheduling", amount: "$22,000", status: "inprogress", pct: 40, dueDate: "May 15, 2026" },
   { id: "M4", label: "QA, Audit & Launch", amount: "$16,000", status: "pending", dueDate: "Jun 30, 2026" },
  ],
  tasks: {
   todo: [{ title: "Video call integration", assigned: "Tom Chen", priority: "high", est: "28h" }, { title: "Notification service", assigned: "Anita Roy", priority: "medium", est: "12h" }],
   inprogress: [{ title: "Appointment scheduler UI", assigned: "Anita Roy", priority: "high", est: "20h", due: "Apr 25" }, { title: "HIPAA audit logging", assigned: "Tom Chen", priority: "high", est: "16h", due: "Apr 30" }],
   review: [{ title: "Prescription tracker module", assigned: "Priya Nair", priority: "high", est: "22h", reviewer: "Carlos D." }],
   done: [{ title: "Patient auth & roles", assigned: "Tom Chen", est: "14h" }, { title: "EHR data model", assigned: "Priya Nair", est: "10h" }, { title: "Admin panel base", assigned: "Anita Roy", est: "8h" }, { title: "Compliance checklist", assigned: "Carlos D.", est: "6h" }],
  },
  recentActivity: [
   { icon: "⚠️", text: "M3 flagged at risk — video call module delayed", time: "1 day ago" },
   { icon: "✅", text: "M2: EHR module signed off by MediCore", time: "3 days ago" },
   { icon: "💬", text: "Client requested HIPAA audit report by Apr 30", time: "5 days ago" },
   { icon: "📎", text: "Carlos D. uploaded compliance checklist v2", time: "1 week ago" },
  ],
  aiInsights: [
   "M3 is only 40% complete with 25 days to deadline — video call integration is the main blocker. Consider bringing in an extra resource.",
   "Tom Chen at 78% workload handling both backend and security — HIPAA audit logging should be prioritized before new features.",
   "Carlos D. is the only QA resource. If M3 slips, M4 QA window compresses to under 3 weeks — high risk.",
   "MediCore Health has been slower to respond (avg 18h reply) — schedule a sync call to unblock pending decisions.",
  ],
 },
 {
  id: 4,
  name: "AI-Powered CRM System",
  client: "SalesForge Inc.",
  clientVerified: false,
  budget: "$55,000",
  released: "$11,000",
  remaining: "$44,000",
  progress: 20,
  status: "ON TRACK",
  riskLevel: "LOW",
  riskColor: "green",
  startDate: "Mar 01, 2026",
  deadline: "Aug 31, 2026",
  category: "SaaS / Web App",
  description: "A next-generation CRM platform with AI-driven lead scoring, automated follow-up sequences, pipeline analytics, email & calendar integrations, and a GPT-powered sales assistant that summarizes customer history and suggests next actions.",
  team: [
   { name: "Leo Zhang", role: "Lead / AI Engineer", initial: "L", bg: "bg-indigo-100", color: "text-indigo-700", hours: "40h/week", workload: 72, workloadLabel: "Medium", workloadColor: "text-yellow-500" },
   { name: "Nina Patel", role: "Frontend", initial: "N", bg: "bg-pink-100", color: "text-pink-700", hours: "30h/week", workload: 45, workloadLabel: "Healthy", workloadColor: "text-green-600" },
   { name: "Sam Ortega", role: "Backend", initial: "S", bg: "bg-orange-100", color: "text-orange-700", hours: "35h/week", workload: 60, workloadLabel: "Healthy", workloadColor: "text-green-600" },
   { name: "Mei Lin", role: "ML / Data", initial: "M", bg: "bg-teal-100", color: "text-teal-700", hours: "30h/week", workload: 55, workloadLabel: "Healthy", workloadColor: "text-green-600" },
  ],
  milestones: [
   { id: "M1", label: "Architecture & Data Model", amount: "$11,000", status: "done", completedDate: "Mar 28, 2026" },
   { id: "M2", label: "Core CRM Features", amount: "$18,000", status: "inprogress", pct: 25, dueDate: "Jun 01, 2026" },
   { id: "M3", label: "AI Features & Integrations", amount: "$16,000", status: "pending", dueDate: "Jul 31, 2026" },
   { id: "M4", label: "Testing, Polish & Launch", amount: "$10,000", status: "pending", dueDate: "Aug 31, 2026" },
  ],
  tasks: {
   todo: [{ title: "Contact & deal pipeline UI", assigned: "Nina Patel", priority: "high", est: "18h" }, { title: "Email integration API", assigned: "Sam Ortega", priority: "medium", est: "14h" }, { title: "Lead scoring ML model", assigned: "Mei Lin", priority: "high", est: "32h" }],
   inprogress: [{ title: "User roles & permissions", assigned: "Sam Ortega", priority: "high", est: "10h", due: "Apr 28" }, { title: "Dashboard layout", assigned: "Nina Patel", priority: "medium", est: "12h", due: "May 5" }],
   review: [{ title: "Auth & onboarding flow", assigned: "Leo Zhang", priority: "medium", est: "8h", reviewer: "Nina Patel" }],
   done: [{ title: "DB schema & ERD", assigned: "Sam Ortega", est: "6h" }, { title: "API architecture doc", assigned: "Leo Zhang", est: "4h" }, { title: "Tech stack setup", assigned: "Leo Zhang", est: "5h" }],
  },
  recentActivity: [
   { icon: "✅", text: "M1: Architecture signed off & payment released", time: "3 days ago" },
   { icon: "🤖", text: "Mei Lin started ML model research & data pipeline", time: "2 days ago" },
   { icon: "💬", text: "SalesForge requested GPT assistant demo by May 15", time: "1 day ago" },
   { icon: "📎", text: "Leo Zhang shared AI feature spec document", time: "6 hours ago" },
  ],
  aiInsights: [
   "All 4 team members are under 75% workload — the project has strong capacity buffer heading into M2.",
   "GPT assistant demo requested by client for May 15 — Mei Lin's ML model needs to be prioritized now to meet that.",
   "SalesForge Inc. is unverified — recommend completing client verification before M2 payment release.",
   "M2 is only 25% complete but 60+ days remain — pace is healthy, no action needed yet.",
  ],
 },
 {
  id: 5,
  name: "Real Estate Listing Platform",
  client: "PropNest Ltd.",
  clientVerified: true,
  budget: "$34,000",
  released: "$34,000",
  remaining: "$0",
  progress: 100,
  status: "COMPLETED",
  riskLevel: "LOW",
  riskColor: "green",
  startDate: "Oct 01, 2025",
  deadline: "Mar 01, 2026",
  category: "Web Platform",
  description: "A full-stack real estate listing and search platform with advanced geo-filters, virtual tour integration, mortgage calculator, agent dashboards, lead management, and an AI-powered property valuation engine. Delivered on time and within budget.",
  team: [
   { name: "Raj Kumar", role: "Lead / Full Stack", initial: "R", bg: "bg-blue-100", color: "text-blue-700", hours: "35h/week", workload: 20, workloadLabel: "Free", workloadColor: "text-green-600" },
   { name: "Sara M.", role: "Frontend", initial: "S", bg: "bg-pink-100", color: "text-pink-700", hours: "30h/week", workload: 15, workloadLabel: "Free", workloadColor: "text-green-600" },
   { name: "Dev Mike", role: "Backend", initial: "D", bg: "bg-blue-100", color: "text-blue-700", hours: "35h/week", workload: 10, workloadLabel: "Free", workloadColor: "text-green-600" },
   { name: "James L.", role: "DevOps / Infra", initial: "J", bg: "bg-gray-100", color: "text-gray-700", hours: "20h/week", workload: 10, workloadLabel: "Free", workloadColor: "text-green-600" },
  ],
  milestones: [
   { id: "M1", label: "Design & Architecture", amount: "$6,000", status: "done", completedDate: "Oct 28, 2025" },
   { id: "M2", label: "Core Listings & Search", amount: "$12,000", status: "done", completedDate: "Dec 10, 2025" },
   { id: "M3", label: "AI Valuation & Agent CRM", amount: "$10,000", status: "done", completedDate: "Jan 25, 2026" },
   { id: "M4", label: "Testing & Launch", amount: "$6,000", status: "done", completedDate: "Feb 28, 2026" },
  ],
  tasks: {
   todo: [],
   inprogress: [],
   review: [],
   done: [
    { title: "Geo-filter & map search", assigned: "Sara M.", est: "20h" },
    { title: "Virtual tour embed", assigned: "Dev Mike", est: "14h" },
    { title: "Mortgage calculator widget", assigned: "Sara M.", est: "8h" },
    { title: "Agent dashboard & leads", assigned: "Dev Mike", est: "16h" },
    { title: "AI property valuation model", assigned: "Raj Kumar", est: "30h" },
    { title: "CI/CD pipeline & deployment", assigned: "James L.", est: "12h" },
    { title: "SEO & performance optimization", assigned: "Sara M.", est: "10h" },
    { title: "Final QA & bug fixes", assigned: "Raj Kumar", est: "18h" },
   ],
  },
  recentActivity: [
   { icon: "🎉", text: "Project successfully launched — PropNest live!", time: "12 days ago" },
   { icon: "✅", text: "M4: Final payment of $6,000 released", time: "12 days ago" },
   { icon: "⭐", text: "Client left 5-star review: 'Exceeded expectations'", time: "10 days ago" },
   { icon: "📊", text: "Post-launch report shared with PropNest Ltd.", time: "8 days ago" },
  ],
  aiInsights: [
   "Project delivered on time and on budget — strong candidate for a case study or portfolio feature.",
   "All 4 team members are now free — ideal time to assign them to new projects or discovery phases.",
   "PropNest Ltd. gave a 5-star review — high potential for a referral or follow-on contract. Consider reaching out.",
   "Full $34,000 released with zero disputes — this client is a strong trust signal for future engagements.",
  ],
 },
];

// ── Helpers ──
const ClockIcon = () => (
 <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
  <circle cx="6" cy="6" r="5" stroke="#9ca3af" strokeWidth="1.1" />
  <path d="M6 3v3l1.5 1.5" stroke="#9ca3af" strokeWidth="1.1" strokeLinecap="round" />
 </svg>
);

function StatusBadge({ status, riskLevel, riskColor }) {
 const s = {
  green: "bg-green-50 border-green-300 text-green-700",
  yellow: "bg-yellow-50 border-yellow-300 text-yellow-700",
  red: "bg-red-50 border-red-300 text-red-700",
 };
 const d = { green: "bg-green-500", yellow: "bg-yellow-400", red: "bg-red-500" };
 return (
  <div className="flex items-center gap-2 flex-wrap">
   <span className="border border-gray-300 text-gray-700 text-xs font-bold px-3 py-1 rounded-full">{status}</span>
   <span className={`flex items-center gap-1.5 border text-xs font-bold px-3 py-1 rounded-full ${s[riskColor]}`}>
    <span className={`w-1.5 h-1.5 rounded-full ${d[riskColor]}`} /> {riskLevel} RISK
   </span>
  </div>
 );
}

function MilestoneCard({ m }) {
 const s = {
  done: { wrap: "border-green-200 bg-green-50", label: "text-green-800", amount: "text-green-600" },
  inprogress: { wrap: "border-blue-300 bg-white", label: "text-blue-800", amount: "text-blue-500" },
  pending: { wrap: "border-gray-200 bg-gray-50", label: "text-gray-500", amount: "text-gray-400" },
 }[m.status];
 return (
  <div className={`rounded-xl border ${s.wrap} p-4 flex flex-col gap-1.5`}>
   <div className="flex items-center justify-between">
    <span className={`text-xs font-bold uppercase tracking-wider ${s.label}`}>{m.id}</span>
    {m.status === "done" && (
     <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="7" stroke="#10b981" strokeWidth="1.3" />
      <path d="M4.5 8l2.5 2.5 4.5-4.5" stroke="#10b981" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
     </svg>
    )}
    {m.status === "inprogress" && (
     <span className="text-xs font-bold text-blue-500 bg-blue-50 border border-blue-200 px-2 py-0.5 rounded-full">{m.pct}%</span>
    )}
   </div>
   <div className={`text-sm font-semibold ${s.label}`}>{m.label}</div>
   <div className={`text-sm font-bold ${s.amount}`}>{m.amount}</div>
   {m.status === "inprogress" && (
    <div className="w-full bg-blue-100 rounded-full h-1.5 mt-1">
     <div className="bg-blue-500 h-1.5 rounded-full" style={{ width: `${m.pct}%` }} />
    </div>
   )}
   {m.completedDate && <div className="text-xs text-green-600 mt-0.5">✓ {m.completedDate}</div>}
   {m.dueDate && m.status !== "done" && (
    <div className="text-xs text-gray-400 flex items-center gap-1 mt-0.5">
     <ClockIcon /> Due {m.dueDate}
    </div>
   )}
  </div>
 );
}

function TaskColumn({ label, count, tasks, accent }) {
 const pc = { high: "text-red-500", medium: "text-yellow-500", low: "text-green-500" };
 const hc = { todo: "text-gray-500", inprogress: "text-blue-600", review: "text-purple-600", done: "text-green-600" };
 return (
  <div className="flex flex-col gap-3">
   <div className={`text-xs font-bold uppercase tracking-wider ${hc[accent]}`}>
    {label} <span className="opacity-60">({count})</span>
   </div>
   {tasks.map((t, i) => (
    <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow">
     <div className="font-semibold text-gray-900 text-sm mb-1">{t.title}</div>
     <div className="text-xs text-gray-500 mb-1">→ {t.assigned}</div>
     {t.due && <div className="text-xs text-gray-400 mb-1 flex items-center gap-1"><ClockIcon />{t.due}</div>}
     {t.priority && <span className={`text-xs font-semibold ${pc[t.priority]}`}>● {t.priority}</span>}
     {t.reviewer && <div className="text-xs text-gray-400 mt-1">Reviewer: {t.reviewer}</div>}
     <div className="text-xs text-gray-300 mt-2 pt-2 border-t border-gray-100">Est: {t.est}</div>
    </div>
   ))}
   {tasks.length === 0 && (
    <div className="border-2 border-dashed border-gray-100 rounded-xl p-4 text-center text-xs text-gray-300">Empty</div>
   )}
  </div>
 );
}

// ── Main export — reads :id from URL, renders matching project ──
export default function ProjectDetailPage() {
 const { id } = useParams();
 const navigate = useNavigate();
 const [subTab, setSubTab] = useState("Overview");

 // Match project from URL param
 const project = projectsData
  .map(({ team, ...rest }) => rest)
  .find(p => p.id === Number(id));

 if (!project) {
  return (
   <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-gray-50">
    <div className="text-4xl">🔍</div>
    <p className="text-lg font-semibold text-gray-700">Project not found</p>
    <button onClick={() => navigate("/dashboard")} className="text-sm text-blue-500 hover:underline">
     ← Back to Dashboard
    </button>
   </div>
  );
 }

 // All values derived from the matched project — nothing hardcoded
 const budgetNum = parseInt(project?.budget?.replace(/\D/g, "") || 0);
 const releasedNum = parseInt(project?.released?.replace(/\D/g, "") || 0);
 const releasedPct = budgetNum > 0 ? Math.round((releasedNum / budgetNum) * 100) : 0;
const activeMilestone = project?.milestones?.find(m => m.status === "inprogress");
const nextMilestone = project?.milestones?.find(m => m.status === "pending");

 return (
  <div className="min-h-screen bg-gray-50">

   {/* Sticky header */}
   <div className="bg-white border-b border-gray-200 px-4 sm:px-8 py-3.5 sticky top-0 z-20">
    <div className="max-w-6xl mx-auto flex items-center justify-between gap-4 flex-wrap">
     <div className="flex items-center gap-3">
      <button
       onClick={() => navigate("/dashboard")}
       className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-900 transition-colors font-medium border border-gray-200 px-3 py-1.5 rounded-lg hover:bg-gray-50"
      >
       <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
        <path d="M10 4L6 8l4 4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
       </svg>
       Back
      </button>
      <span className="text-gray-200">|</span>
      <span className="font-bold text-gray-900">{project.name}</span>
      <span className="text-gray-300 hidden sm:inline">·</span>
      <span className="text-sm text-gray-500 hidden sm:inline">
       {project.client}
       {project.clientVerified && (
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none" className="inline ml-1">
         <circle cx="6.5" cy="6.5" r="5.5" stroke="#10b981" strokeWidth="1.2" />
         <path d="M4 6.5l2 2 3.5-3.5" stroke="#10b981" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
       )}
      </span>
     </div>
     <StatusBadge status={project.status} riskLevel={project.riskLevel} riskColor={project.riskColor} />
    </div>
   </div>

   <div className="max-w-6xl mx-auto px-4 sm:px-8 py-6 flex flex-col gap-5">

    {/* Stats row */}
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
     {[
      { label: "Total Budget", value: project.budget, icon: "💰", color: "text-gray-900" },
      { label: "Released", value: project.released, icon: "✅", color: "text-green-600" },
      { label: "Remaining", value: project.remaining, icon: "⏳", color: "text-blue-600" },
      { label: "Progress", value: `${project.progress}%`, icon: "📊", color: "text-gray-900" },
     ].map((s, i) => (
      <div key={i} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
       <div className="text-xl mb-1">{s.icon}</div>
       <div className={`text-xl font-bold ${s.color}`}>{s.value}</div>
       <div className="text-xs text-gray-400 mt-0.5">{s.label}</div>
      </div>
     ))}
    </div>

    {/* Progress bar */}
    <div className="bg-white border border-gray-200 rounded-xl px-6 py-4 shadow-sm">
     <div className="flex items-center justify-between mb-2">
      <span className="text-sm font-semibold text-gray-700">Overall Progress</span>
      <div className="flex items-center gap-3">
       <span className="text-xs text-gray-400">{project.startDate} → {project.deadline}</span>
       <span className="text-sm font-bold text-gray-900">{project.progress}%</span>
      </div>
     </div>

     {/* Active milestone banner — only renders when a milestone is in-progress */}
     {activeMilestone && (
      <div className="bg-gray-50 border border-gray-200 rounded-xl px-4 py-3.5 mb-4">
       <div className="flex items-center justify-between mb-2">
        <p className="text-sm font-bold text-gray-800">Current: {activeMilestone.label}</p>
        <div className="flex items-center gap-4 text-xs text-gray-500">
         {activeMilestone.dueDate && (
          <span className="flex items-center gap-1">
           <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
           </svg>
           Due: {activeMilestone.dueDate}
          </span>
         )}
         <span className="flex items-center gap-1">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          In Escrow: {activeMilestone.amount}
         </span>
        </div>
       </div>
       <div className="flex items-center gap-3">
        <div className="flex-1 bg-gray-200 rounded-full h-2">
         <div className="bg-blue-500 h-2 rounded-full" style={{ width: `${activeMilestone.pct}%` }} />
        </div>
        <button
         onClick={() => setSubTab("Overview")}
         className="text-xs font-semibold text-blue-600 hover:text-blue-800 whitespace-nowrap hover:underline transition-colors"
        >
         View Details →
        </button>
       </div>
      </div>
     )}

     <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
      <div
       className="h-3 rounded-full"
       style={{ width: `${project.progress}%`, background: "linear-gradient(90deg,#3db54a,#2563eb)" }}
      />
     </div>
     <div className="flex justify-between mt-1.5">
      <span className="text-xs text-gray-400">Budget released: {releasedPct}%</span>
      <span className="text-xs text-gray-400">Category: {project.category}</span>
     </div>
    </div>

    {/* Sub-tabs */}
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
     <div className="flex border-b border-gray-100 px-4 overflow-x-auto">
      {["Overview", "Task Board", "Finance", "AI Insights"].map(t => (
       <button key={t} onClick={() => setSubTab(t)}
        className={`px-4 py-3.5 text-sm font-medium whitespace-nowrap transition-colors ${subTab === t ? "text-gray-900 border-b-2 border-green-500" : "text-gray-400 hover:text-gray-700"
         }`}>
        {t === "AI Insights" ? "🤖 " : ""}{t}
       </button>
      ))}
     </div>

     <div className="p-5 sm:p-6">

      {subTab === "Overview" && (
       <div className="flex flex-col gap-6">
        <div>
         <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">Project Description</h3>
         <p className="text-sm text-gray-700 leading-relaxed">{project.description}</p>
        </div>
        <div>
         <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Milestones</h3>
         <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {project.milestones.map((m) => <MilestoneCard key={m.id} m={m} />)}
         </div>
        </div>
        <div>
         <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Recent Activity</h3>
         <div className="flex flex-col gap-2">
          {project.recentActivity.map((a, i) => (
           <div key={i} className="flex items-start gap-3 bg-gray-50 rounded-lg px-4 py-3">
            <span className="text-base flex-shrink-0">{a.icon}</span>
            <span className="flex-1 text-sm text-gray-700">{a.text}</span>
            <span className="text-xs text-gray-400 whitespace-nowrap">{a.time}</span>
           </div>
          ))}
         </div>
        </div>
        <div className="flex flex-wrap gap-2 pt-1">
         {[
          "Open ProjectStream",
          activeMilestone ? `Submit ${activeMilestone.id}` : nextMilestone ? `Upcoming: ${nextMilestone.id}` : "All Done ✓",
          "Message Client",
          "Upload Deliverable",
         ].map((btn, i) => (
          <button key={i} className={`text-sm px-4 py-2 rounded-lg border transition-colors font-medium ${i === 1 ? "bg-green-500 hover:bg-green-600 text-white border-green-500" : "border-gray-200 text-gray-700 hover:bg-gray-50"
           }`}>
           {btn}
          </button>
         ))}
        </div>
       </div>
      )}

      {subTab === "Task Board" && (
       <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <TaskColumn label="To Do" count={project.tasks.todo.length} tasks={project.tasks.todo} accent="todo" />
        <TaskColumn label="In Progress" count={project.tasks.inprogress.length} tasks={project.tasks.inprogress} accent="inprogress" />
        <TaskColumn label="In Review" count={project.tasks.review.length} tasks={project.tasks.review} accent="review" />
        <TaskColumn label="Done" count={project.tasks.done.length} tasks={project.tasks.done} accent="done" />
       </div>
      )}
      {subTab === "Finance" && (
       <div className="flex flex-col gap-4">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
         {[
          { label: "Contract Value", value: project.budget, sub: "Agreed total", color: "text-gray-900" },
          { label: "Paid Out", value: project.released, sub: `${releasedPct}% of total`, color: "text-green-600" },
          { label: "In Escrow", value: project.remaining, sub: "Held by platform", color: "text-blue-600" },
         ].map((s, i) => (
          <div key={i} className="border border-gray-200 rounded-xl p-5 bg-white">
           <div className={`text-2xl font-bold ${s.color}`}>{s.value}</div>
           <div className="text-sm font-semibold text-gray-700 mt-1">{s.label}</div>
           <div className="text-xs text-gray-400 mt-0.5">{s.sub}</div>
          </div>
         ))}
        </div>
        <div className="border border-gray-200 rounded-xl p-5">
         <h3 className="font-semibold text-gray-900 mb-4">Milestone Payments</h3>
         {project.milestones.map((m, i) => (
          <div key={i} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
           <div className="flex items-center gap-3">
            <span className={`w-2 h-2 rounded-full inline-block ${m.status === "done" ? "bg-green-500" : m.status === "inprogress" ? "bg-blue-400" : "bg-gray-200"
             }`} />
            <span className="text-sm text-gray-700">{m.id}: {m.label}</span>
           </div>
           <div className="flex items-center gap-3">
            <span className="text-sm font-semibold text-gray-900">{m.amount}</span>
            <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${m.status === "done" ? "bg-green-50 text-green-600" :
              m.status === "inprogress" ? "bg-blue-50 text-blue-600" :
               "bg-gray-100 text-gray-400"
             }`}>
             {m.status === "done" ? "Released" : m.status === "inprogress" ? "In Escrow" : "Locked"}
            </span>
           </div>
          </div>
         ))}
        </div>
       </div>
      )}

      {subTab === "AI Insights" && (
       <div className="flex flex-col gap-4">
        <div className="border border-green-200 bg-green-50 rounded-xl p-4">
         <div className="font-semibold text-gray-900 text-sm mb-1 flex items-center gap-2">🤖 AI Project Intelligence</div>
         <p className="text-xs text-gray-500">Auto-generated insights based on team activity, deadlines, and project health.</p>
        </div>
        {project.aiInsights.map((ins, i) => (
         <div key={i} className="flex items-start gap-3 bg-white border border-gray-200 rounded-xl px-5 py-4 shadow-sm">
          <span className="text-base flex-shrink-0">🤖</span>
          <p className="text-sm text-gray-700 leading-relaxed">{ins}</p>
         </div>
        ))}
       </div>
      )}

     </div>
    </div>
   </div>
  </div>
 );
}