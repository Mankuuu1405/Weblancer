import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { StatCard, ActionBtn, PageHeader, SectionCard } from "./AdminComponents";

// ─── SHARED NAV TABS ──────────────────────────────────────────────────────────
function ReportNav({ active }) {
  const navigate = useNavigate();
  const tabs = [
    { key: "revenue",  label: "Revenue",        path: "/admin/reports/revenue"  },
    { key: "users",    label: "User Growth",     path: "/admin/reports/users"    },
    { key: "projects", label: "Project Success", path: "/admin/reports/projects" },
    { key: "disputes", label: "Dispute Trends",  path: "/admin/reports/disputes" },
  ];
  return (
    <div className="flex gap-1 border-b border-gray-100 mb-6">
      {tabs.map(tab => (
        <button key={tab.key} onClick={() => navigate(tab.path)}
          className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${active === tab.key ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
          {tab.label}
        </button>
      ))}
    </div>
  );
}

// ─── SIMPLE BAR CHART ────────────────────────────────────────────────────────
function BarChart({ data, valueKey, labelKey, color = "bg-green-500", prefix = "₹", suffix = "", height = 140 }) {
  const max = Math.max(...data.map(d => d[valueKey]));
  return (
    <div className="flex items-end gap-2" style={{ height }}>
      {data.map((d, i) => {
        const pct = max > 0 ? (d[valueKey] / max) * 100 : 0;
        return (
          <div key={i} className="flex-1 flex flex-col items-center gap-1 group">
            <div className="relative w-full flex items-end" style={{ height: height - 32 }}>
              <div className={`w-full rounded-t-md ${color} opacity-80 group-hover:opacity-100 transition-opacity`}
                style={{ height: `${pct}%` }} />
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-gray-800 text-white text-[10px] font-bold px-1.5 py-0.5 rounded whitespace-nowrap">
                {prefix}{typeof d[valueKey] === "number" && d[valueKey] >= 1000
                  ? `${(d[valueKey]/1000).toFixed(0)}k` : d[valueKey]}{suffix}
              </div>
            </div>
            <span className="text-[10px] text-gray-400 truncate w-full text-center">{d[labelKey]}</span>
          </div>
        );
      })}
    </div>
  );
}

// ─── LINE CHART (simple SVG) ──────────────────────────────────────────────────
function LineChart({ data, valueKey, color = "#22c55e", height = 100 }) {
  const max = Math.max(...data.map(d => d[valueKey]));
  const min = Math.min(...data.map(d => d[valueKey]));
  const range = max - min || 1;
  const w = 600; const h = height;
  const pts = data.map((d, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - ((d[valueKey] - min) / range) * (h - 20) - 10;
    return `${x},${y}`;
  });
  const area = `0,${h} ${pts.join(" ")} ${w},${h}`;
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full" style={{ height }}>
      <defs>
        <linearGradient id="areaGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={color} stopOpacity="0.2" />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </linearGradient>
      </defs>
      <polygon points={area} fill="url(#areaGrad)" />
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      {data.map((d, i) => {
        const x = (i / (data.length - 1)) * w;
        const y = h - ((d[valueKey] - min) / range) * (h - 20) - 10;
        return <circle key={i} cx={x} cy={y} r="4" fill={color} />;
      })}
    </svg>
  );
}

// ─── PAGE 1: /admin/reports/revenue ──────────────────────────────────────────
export function AdminRevenueReport() {
  const [period, setPeriod] = useState("6m");

  const monthly = [
    { month:"Oct", revenue:120000, commission:7200,  projects:3 },
    { month:"Nov", revenue:180000, commission:10800, projects:4 },
    { month:"Dec", revenue:150000, commission:9000,  projects:3 },
    { month:"Jan", revenue:234000, commission:14040, projects:5 },
    { month:"Feb", revenue:650000, commission:39000, projects:6 },
    { month:"Mar", revenue:480000, commission:28800, projects:5 },
  ];

  const byType = [
    { type:"Agency Projects",     amount:1520000, pct:79 },
    { type:"Freelancer Projects", amount:394000,  pct:21 },
  ];

  const topProjects = [
    { project:"HR Automation Dashboard",   client:"ByteEats Co.",      amount:650000, commission:39000, status:"Completed" },
    { project:"Food Delivery App",          client:"ByteEats Co.",      amount:480000, commission:28800, status:"Active"    },
    { project:"Logistics Tracking System",  client:"Sneha Kapoor",      amount:390000, commission:23400, status:"Completed" },
    { project:"Patient Appointment App",    client:"HealthFirst Clinic", amount:320000, commission:19200, status:"Active"    },
    { project:"Mobile Banking App",         client:"Vikram Singh",       amount:280000, commission:16800, status:"Frozen"    },
  ];

  const totalRevenue    = monthly.reduce((s, m) => s + m.revenue, 0);
  const totalCommission = monthly.reduce((s, m) => s + m.commission, 0);
  const momGrowth = ((monthly[5].revenue - monthly[4].revenue) / monthly[4].revenue * 100).toFixed(0);

  return (
    <div className="p-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform performance, growth & financial insights"
        actions={
          <div className="flex gap-2">
            <div className="flex rounded-lg border border-gray-200 overflow-hidden">
              {["3m","6m","1y","All"].map(p => (
                <button key={p} onClick={() => setPeriod(p)}
                  className={`px-3 py-1.5 text-xs font-medium transition-colors ${period === p ? "bg-green-500 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}>
                  {p}
                </button>
              ))}
            </div>
            <ActionBtn label="⬇ Export PDF" />
          </div>
        }
      />
      <ReportNav active="revenue" />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total GMV (6m)"       value={`₹${(totalRevenue/100000).toFixed(1)}L`}    sub="Gross platform volume" color="gray"  />
        <StatCard label="Commission Earned"    value={`₹${(totalCommission/1000).toFixed(0)}k`}   sub="6% of GMV"             color="green" />
        <StatCard label="This Month"           value={`₹${(monthly[5].revenue/1000).toFixed(0)}k`} sub="Mar 2026"             color="green" />
        <StatCard label="MoM Growth"           value={`${momGrowth > 0 ? "+" : ""}${momGrowth}%`} sub="vs last month"         color={Number(momGrowth) >= 0 ? "green" : "red"} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Revenue Chart */}
        <div className="lg:col-span-2">
          <SectionCard title="Monthly Revenue Trend">
            <BarChart data={monthly} valueKey="revenue" labelKey="month" color="bg-green-400" />
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-4 text-center">
              {[
                { label:"Peak Month",    value:"Feb 2026",  sub:"₹6.5L" },
                { label:"Avg / Month",   value:`₹${(totalRevenue/monthly.length/1000).toFixed(0)}k`, sub:"6-month avg" },
                { label:"Total Projects",value:monthly.reduce((s,m)=>s+m.projects,0), sub:"Across 6 months" },
              ].map(s => (
                <div key={s.label}>
                  <p className="text-sm font-bold text-gray-800">{s.value}</p>
                  <p className="text-[10px] text-gray-400">{s.label}</p>
                  <p className="text-[10px] text-gray-300">{s.sub}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Commission Chart */}
        <SectionCard title="Commission Trend">
          <div className="mb-3">
            <p className="text-2xl font-black text-green-600">₹{totalCommission.toLocaleString()}</p>
            <p className="text-xs text-gray-400">Total commission (6 months)</p>
          </div>
          <LineChart data={monthly} valueKey="commission" />
          <div className="mt-3 space-y-1.5">
            {monthly.slice(-3).reverse().map((m, i) => (
              <div key={i} className="flex justify-between text-xs">
                <span className="text-gray-500">{m.month} 2026</span>
                <span className="font-bold text-green-600">₹{m.commission.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Revenue by Type */}
        <SectionCard title="Revenue by Talent Type">
          <div className="space-y-4">
            {byType.map(t => (
              <div key={t.type}>
                <div className="flex justify-between text-xs text-gray-600 mb-1.5">
                  <span className="font-medium">{t.type}</span>
                  <span className="font-bold">₹{(t.amount/100000).toFixed(1)}L ({t.pct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${t.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Platform Rate</span>
              <span className="font-bold text-green-600">6% flat</span>
            </div>
          </div>
        </SectionCard>

        {/* Top Projects */}
        <div className="lg:col-span-2">
          <SectionCard title="Top Revenue Projects">
            <div className="space-y-2">
              {topProjects.map((p, i) => (
                <div key={i} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-sm font-black text-gray-300 w-5 shrink-0">{i + 1}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.project}</p>
                    <p className="text-xs text-gray-400">{p.client}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-bold text-gray-700">₹{(p.amount/1000).toFixed(0)}k</p>
                    <p className="text-[10px] text-green-600">+₹{(p.commission/1000).toFixed(0)}k comm.</p>
                  </div>
                  <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0 ${p.status === "Completed" ? "bg-green-50 text-green-700 border border-green-200" : p.status === "Frozen" ? "bg-red-50 text-red-600 border border-red-200" : "bg-blue-50 text-blue-700 border border-blue-200"}`}>
                    {p.status}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 2: /admin/reports/users ────────────────────────────────────────────
export function AdminUsersReport() {
  const monthly = [
    { month:"Oct", signups:12, freelancers:7, agencies:1, clients:4, verified:9  },
    { month:"Nov", signups:18, freelancers:10,agencies:2, clients:6, verified:15 },
    { month:"Dec", signups:14, freelancers:8, agencies:1, clients:5, verified:11 },
    { month:"Jan", signups:22, freelancers:12,agencies:3, clients:7, verified:19 },
    { month:"Feb", signups:31, freelancers:17,agencies:4, clients:10,verified:27 },
    { month:"Mar", signups:28, freelancers:15,agencies:3, clients:10,verified:24 },
  ];

  const funnel = [
    { stage:"Signed Up",           count:125, pct:100 },
    { stage:"Email Verified",       count:112, pct:90  },
    { stage:"Profile Completed",    count:98,  pct:78  },
    { stage:"KYC Verified",         count:81,  pct:65  },
    { stage:"First Project",        count:54,  pct:43  },
  ];

  const roleBreakdown = [
    { role:"Freelancers", count:69, color:"bg-blue-400",   pct:55 },
    { role:"Clients",     count:42, color:"bg-green-400",  pct:34 },
    { role:"Agencies",    count:14, color:"bg-orange-400", pct:11 },
  ];

  const totalSignups = monthly.reduce((s, m) => s + m.signups, 0);
  const retentionRate = 78;
  const churnRate = 8;

  return (
    <div className="p-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform performance, growth & financial insights"
        actions={<ActionBtn label="⬇ Export PDF" />}
      />
      <ReportNav active="users" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users"     value={125}            sub="All time"           color="gray"  />
        <StatCard label="New This Month"  value={28}             sub="Mar 2026"           color="green" />
        <StatCard label="Retention Rate"  value={`${retentionRate}%`} sub="30-day retention" color="blue"  />
        <StatCard label="Churn Rate"      value={`${churnRate}%`}     sub="Monthly"          color="orange"/>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-5">
        {/* Signup Trend */}
        <div className="lg:col-span-2">
          <SectionCard title="Monthly Signups Trend">
            <BarChart data={monthly} valueKey="signups" labelKey="month" color="bg-blue-400" prefix="" />
            <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3">
              {[
                { label:"Freelancers",  value:monthly.reduce((s,m)=>s+m.freelancers,0), color:"text-blue-600"   },
                { label:"Clients",      value:monthly.reduce((s,m)=>s+m.clients,0),     color:"text-green-600"  },
                { label:"Agencies",     value:monthly.reduce((s,m)=>s+m.agencies,0),    color:"text-orange-500" },
              ].map(s => (
                <div key={s.label} className="text-center bg-gray-50 rounded-lg p-2">
                  <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
                  <p className="text-[10px] text-gray-400">{s.label}</p>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        {/* Role Breakdown */}
        <SectionCard title="User Role Split">
          <div className="space-y-4 mb-4">
            {roleBreakdown.map(r => (
              <div key={r.role}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700">{r.role}</span>
                  <span className="font-bold text-gray-800">{r.count} ({r.pct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="pt-3 border-t border-gray-100">
            <div className="flex justify-between text-xs">
              <span className="text-gray-400">Total Users</span>
              <span className="font-bold text-gray-800">125</span>
            </div>
            <div className="flex justify-between text-xs mt-1">
              <span className="text-gray-400">KYC Verified</span>
              <span className="font-bold text-green-600">81 (65%)</span>
            </div>
          </div>
        </SectionCard>
      </div>

      {/* Verification Funnel */}
      <SectionCard title="Onboarding Funnel">
        <div className="space-y-3">
          {funnel.map((f, i) => (
            <div key={i} className="flex items-center gap-4">
              <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-[10px] font-bold shrink-0">
                {i + 1}
              </div>
              <div className="flex-1">
                <div className="flex justify-between text-xs mb-1">
                  <span className="font-medium text-gray-700">{f.stage}</span>
                  <span className="font-bold text-gray-800">{f.count} users ({f.pct}%)</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${f.pct > 70 ? "bg-green-500" : f.pct > 50 ? "bg-yellow-400" : "bg-orange-400"}`}
                    style={{ width: `${f.pct}%` }} />
                </div>
              </div>
              {i > 0 && (
                <span className="text-[10px] text-gray-400 shrink-0 w-16 text-right">
                  -{funnel[i-1].pct - f.pct}% drop
                </span>
              )}
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-orange-50 rounded-xl border border-orange-100">
          <p className="text-xs text-orange-800 font-semibold mb-0.5">Biggest Drop-off</p>
          <p className="text-xs text-orange-700">Profile → KYC: 17% drop. Consider simplifying KYC flow.</p>
        </div>
      </SectionCard>
    </div>
  );
}

// ─── PAGE 3: /admin/reports/projects ─────────────────────────────────────────
export function AdminProjectsReport() {
  const monthly = [
    { month:"Oct", started:3, completed:2, disputed:0, successRate:67 },
    { month:"Nov", started:4, completed:3, disputed:1, successRate:75 },
    { month:"Dec", started:3, completed:3, disputed:0, successRate:100},
    { month:"Jan", started:5, completed:4, disputed:0, successRate:80 },
    { month:"Feb", started:6, completed:5, disputed:1, successRate:83 },
    { month:"Mar", started:5, completed:2, disputed:2, successRate:40 },
  ];

  const byCategory = [
    { category:"Mobile App",          count:4, successRate:75, avgValue:320000 },
    { category:"Web Development",     count:2, successRate:50, avgValue:332500 },
    { category:"Enterprise Software", count:3, successRate:100,avgValue:346667 },
    { category:"Design",              count:1, successRate:100,avgValue:45000  },
  ];

  const byTalentType = [
    { type:"Agency",     completed:7, disputed:2, onTime:5, avgDelay:3, successRate:78 },
    { type:"Freelancer", completed:5, disputed:2, onTime:3, avgDelay:8, successRate:60 },
  ];

  const totalCompleted  = monthly.reduce((s, m) => s + m.completed, 0);
  const totalDisputed   = monthly.reduce((s, m) => s + m.disputed, 0);
  const avgSuccessRate  = Math.round(monthly.reduce((s, m) => s + m.successRate, 0) / monthly.length);
  const onTimeRate      = 72;

  return (
    <div className="p-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform performance, growth & financial insights"
        actions={<ActionBtn label="⬇ Export PDF" />}
      />
      <ReportNav active="projects" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Projects"   value={10}                    color="gray"   />
        <StatCard label="Completed"        value={totalCompleted}         sub="All time" color="green"  />
        <StatCard label="Avg Success Rate" value={`${avgSuccessRate}%`}   color="blue"   />
        <StatCard label="On-Time Delivery" value={`${onTimeRate}%`}       sub="All projects" color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Success Rate Trend */}
        <SectionCard title="Monthly Success Rate">
          <div className="mb-3">
            <LineChart data={monthly} valueKey="successRate" color="#22c55e" height={80} />
          </div>
          <div className="flex items-end gap-2 h-24 mt-2">
            {monthly.map((m, i) => (
              <div key={i} className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full flex flex-col gap-0.5" style={{ height: 72 }}>
                  <div className="w-full bg-green-400 rounded-sm" style={{ height: `${(m.completed/Math.max(...monthly.map(x=>x.started)))*100}%` }} title={`Completed: ${m.completed}`} />
                  {m.disputed > 0 && <div className="w-full bg-red-400 rounded-sm" style={{ height: `${(m.disputed/Math.max(...monthly.map(x=>x.started)))*100}%` }} title={`Disputed: ${m.disputed}`} />}
                </div>
                <span className="text-[10px] text-gray-400">{m.month}</span>
              </div>
            ))}
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-green-400 rounded-sm" /><span className="text-xs text-gray-500">Completed</span></div>
            <div className="flex items-center gap-1.5"><div className="w-3 h-3 bg-red-400 rounded-sm" /><span className="text-xs text-gray-500">Disputed</span></div>
          </div>
        </SectionCard>

        {/* By Talent Type */}
        <SectionCard title="Performance by Talent Type">
          <div className="space-y-4">
            {byTalentType.map(t => (
              <div key={t.type} className="p-4 bg-gray-50 rounded-xl border border-gray-100">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-bold text-gray-800">{t.type}</p>
                  <span className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${t.successRate >= 75 ? "bg-green-50 text-green-700 border border-green-200" : "bg-yellow-50 text-yellow-700 border border-yellow-200"}`}>
                    {t.successRate}% success
                  </span>
                </div>
                <div className="grid grid-cols-4 gap-2 text-center">
                  {[
                    { label:"Completed", value:t.completed, color:"text-green-600"  },
                    { label:"Disputed",  value:t.disputed,  color:"text-red-500"    },
                    { label:"On Time",   value:t.onTime,    color:"text-blue-600"   },
                    { label:"Avg Delay", value:`${t.avgDelay}d`, color:"text-orange-500" },
                  ].map(s => (
                    <div key={s.label} className="bg-white rounded-lg p-2">
                      <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
                      <p className="text-[10px] text-gray-400">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* By Category */}
      <SectionCard title="Success Rate by Category">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {byCategory.map(c => (
            <div key={c.category} className="bg-gray-50 rounded-xl border border-gray-100 p-4 text-center">
              <p className="text-sm font-bold text-gray-800 mb-1">{c.category}</p>
              <p className={`text-2xl font-black mb-0.5 ${c.successRate === 100 ? "text-green-600" : c.successRate >= 75 ? "text-blue-600" : "text-orange-500"}`}>
                {c.successRate}%
              </p>
              <p className="text-[10px] text-gray-400">{c.count} projects</p>
              <p className="text-[10px] text-gray-400">avg ₹{(c.avgValue/1000).toFixed(0)}k</p>
              <div className="mt-2 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${c.successRate === 100 ? "bg-green-500" : c.successRate >= 75 ? "bg-blue-400" : "bg-orange-400"}`}
                  style={{ width: `${c.successRate}%` }} />
              </div>
            </div>
          ))}
        </div>
      </SectionCard>
    </div>
  );
}

// ─── PAGE 4: /admin/reports/disputes ─────────────────────────────────────────
export function AdminDisputesReport() {
  const monthly = [
    { month:"Oct", raised:0, resolved:0, pending:0, avgDays:0  },
    { month:"Nov", raised:1, resolved:1, pending:0, avgDays:8  },
    { month:"Dec", raised:0, resolved:0, pending:0, avgDays:0  },
    { month:"Jan", raised:1, resolved:1, pending:0, avgDays:12 },
    { month:"Feb", raised:2, resolved:2, pending:0, avgDays:9  },
    { month:"Mar", raised:3, resolved:1, pending:2, avgDays:5  },
  ];

  const byReason = [
    { reason:"Incomplete deliverable",       count:2, pct:43 },
    { reason:"Client approval delay",        count:1, pct:22 },
    { reason:"Scope mismatch",               count:1, pct:22 },
    { reason:"Design not matching brief",    count:1, pct:13 },
  ];

  const resolutionType = [
    { type:"Admin Decision",   count:2, pct:50, color:"bg-green-400"  },
    { type:"AI Auto-resolved", count:1, pct:25, color:"bg-blue-400"   },
    { type:"Mutual Agreement", count:1, pct:25, color:"bg-purple-400" },
  ];

  const totalRaised   = monthly.reduce((s, m) => s + m.raised, 0);
  const totalResolved = monthly.reduce((s, m) => s + m.resolved, 0);
  const avgResolutionDays = Math.round(monthly.filter(m=>m.avgDays>0).reduce((s,m)=>s+m.avgDays,0)/monthly.filter(m=>m.avgDays>0).length);
  const disputeRate   = 42; // % of projects

  return (
    <div className="p-6">
      <PageHeader
        title="Reports & Analytics"
        subtitle="Platform performance, growth & financial insights"
        actions={<ActionBtn label="⬇ Export PDF" />}
      />
      <ReportNav active="disputes" />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Disputes"    value={totalRaised}              sub="All time"            color="gray"   />
        <StatCard label="Resolved"          value={totalResolved}            sub={`${Math.round(totalResolved/totalRaised*100)}% resolution rate`} color="green" />
        <StatCard label="Avg Resolution"    value={`${avgResolutionDays}d`}  sub="Days to close"       color="blue"   />
        <StatCard label="Dispute Rate"      value={`${disputeRate}%`}        sub="Of active projects"  color="orange" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-5">
        {/* Dispute Trend */}
        <SectionCard title="Dispute Volume Trend">
          <BarChart data={monthly} valueKey="raised" labelKey="month" color="bg-red-400" prefix="" />
          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="p-3 bg-orange-50 rounded-xl border border-orange-100">
              <p className="text-xs font-bold text-orange-800">⚠ March Spike</p>
              <p className="text-xs text-orange-700 mt-0.5">
                3 disputes in March — highest monthly count. Correlates with 2 high-risk projects (PRJ-003, PRJ-006) going into delayed status.
              </p>
            </div>
          </div>
        </SectionCard>

        {/* Resolution Time Trend */}
        <SectionCard title="Avg Resolution Time (Days)">
          <BarChart data={monthly.filter(m=>m.avgDays>0)} valueKey="avgDays" labelKey="month" color="bg-blue-400" prefix="" suffix="d" />
          <div className="mt-4 pt-4 border-t border-gray-100 grid grid-cols-3 gap-3 text-center">
            {[
              { label:"Fastest",  value:"5d",   sub:"Mar 2026" },
              { label:"Slowest",  value:"12d",  sub:"Jan 2026" },
              { label:"Average",  value:`${avgResolutionDays}d`, sub:"All time" },
            ].map(s => (
              <div key={s.label} className="bg-gray-50 rounded-lg p-2">
                <p className="text-lg font-bold text-gray-800">{s.value}</p>
                <p className="text-[10px] text-gray-400">{s.label}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* By Reason */}
        <SectionCard title="Top Dispute Reasons">
          <div className="space-y-3">
            {byReason.map((r, i) => (
              <div key={i} className="flex items-center gap-3">
                <span className="text-sm font-black text-gray-200 w-4 shrink-0">{i + 1}</span>
                <div className="flex-1">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-medium text-gray-700">{r.reason}</span>
                    <span className="font-bold text-gray-800">{r.count} ({r.pct}%)</span>
                  </div>
                  <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-red-400 rounded-full" style={{ width: `${r.pct}%` }} />
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p className="text-xs text-blue-800 font-semibold mb-0.5">◎ AI Insight</p>
            <p className="text-xs text-blue-700">
              43% of disputes are from incomplete deliverables. Stricter milestone sign-off could reduce this significantly.
            </p>
          </div>
        </SectionCard>

        {/* Resolution Type */}
        <SectionCard title="How Disputes Were Resolved">
          <div className="space-y-4">
            {resolutionType.map(r => (
              <div key={r.type}>
                <div className="flex justify-between text-xs mb-1.5">
                  <span className="font-medium text-gray-700">{r.type}</span>
                  <span className="font-bold text-gray-800">{r.count} ({r.pct}%)</span>
                </div>
                <div className="h-2.5 bg-gray-100 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${r.color}`} style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 space-y-2">
            {[
              { label:"Amount refunded",      value:"₹9,000",    color:"text-orange-500" },
              { label:"Escrow released",      value:"₹1,56,000", color:"text-green-600"  },
              { label:"Currently frozen",     value:"₹2,32,500", color:"text-red-500"    },
            ].map(s => (
              <div key={s.label} className="flex justify-between text-xs">
                <span className="text-gray-400">{s.label}</span>
                <span className={`font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>
    </div>
  );
}