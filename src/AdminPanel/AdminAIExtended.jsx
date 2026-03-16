import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, SectionCard
} from "./AdminComponents";

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockAILogs = [
  { id:"AIL-001", action:"Auto-suspended account",       target:"Priya Menon (FL-004)",            confidence:92, outcome:"Executed",    timestamp:"Mar 14, 2026 · 11:42 AM", category:"User",    reason:"Dispute rate 32% — crossed 30% threshold", overridden:false, overrideBy:null,      overrideReason:null },
  { id:"AIL-002", action:"Auto-flagged suspicious signup",target:"FakeUser999 (CL-005)",            confidence:97, outcome:"Executed",    timestamp:"Mar 14, 2026 · 09:15 AM", category:"User",    reason:"Duplicate device + disposable email detected", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-003", action:"Auto-reduced visibility",      target:"Priya Menon (FL-004)",            confidence:88, outcome:"Executed",    timestamp:"Mar 12, 2026 · 07:00 AM", category:"User",    reason:"Dispute rate crossed 30% visibility threshold", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-004", action:"Dispute pre-analysis",         target:"DSP-001 — E-Commerce Revamp",     confidence:71, outcome:"Notified Admin", timestamp:"Mar 10, 2026 · 09:30 AM", category:"Dispute", reason:"Confidence 71% — below auto-action threshold (90%)", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-005", action:"Dispute pre-analysis",         target:"DSP-002 — Mobile Banking App",    confidence:84, outcome:"Notified Admin", timestamp:"Mar 9, 2026 · 09:00 AM",  category:"Dispute", reason:"Confidence 84% — below auto-action threshold (90%)", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-006", action:"Auto-approved milestone",      target:"PRJ-004 — Milestone 5",           confidence:95, outcome:"Executed",    timestamp:"Feb 28, 2026 · 08:00 AM", category:"Project", reason:"Client silent 7 days — auto-approval policy triggered", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-007", action:"Agency overload detected",     target:"TechNova Solutions (AG-001)",     confidence:89, outcome:"Executed",    timestamp:"Mar 7, 2026 · 07:00 AM",  category:"User",    reason:"Team capacity 95% — project limit warning issued", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-008", action:"Project health flagged",       target:"PRJ-003 — E-Commerce Revamp",     confidence:91, outcome:"Executed",    timestamp:"Mar 10, 2026 · 06:00 AM", category:"Project", reason:"Milestone 1 was 13 days late + 5 scope changes", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-009", action:"Client silence reminder sent", target:"HealthFirst Clinic — PRJ-002",    confidence:99, outcome:"Executed",    timestamp:"Mar 10, 2026 · 09:00 AM", category:"Project", reason:"Client silent 72 hours — reminder policy triggered", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-010", action:"Auto-boosted visibility",      target:"Arjun Dev (FL-002)",              confidence:94, outcome:"Executed",    timestamp:"Mar 5, 2026 · 08:00 AM",  category:"User",    reason:"Elite++ badge + 99% delivery + 0% dispute rate", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-011", action:"Matching recommendation",      target:"PRJ-005 — Brand Identity Design", confidence:87, outcome:"Executed",    timestamp:"Mar 14, 2026 · 01:00 PM", category:"Matching",reason:"Neha Gupta matched 94% to project requirements", overridden:false, overrideBy:null, overrideReason:null },
  { id:"AIL-012", action:"Fraud pattern detected",       target:"FakeUser999 (CL-005)",            confidence:98, outcome:"Executed",    timestamp:"Feb 28, 2026 · 09:00 AM", category:"User",    reason:"3 failed KYC attempts + mismatched identity signals", overridden:false, overrideBy:null, overrideReason:null },
];

const mockOverrides = [
  { id:"OVR-001", aiAction:"Auto-suspend account",       aiVerdict:"Suspend — high risk",         adminDecision:"Reduced visibility only",       adminBy:"Platform Admin", date:"Mar 12, 2026", target:"Karan Malhotra (FL-003)", aiConfidence:78, category:"User",    reason:"Admin disagreed — single high-risk event, not pattern", impactScore:"Medium" },
  { id:"OVR-002", aiAction:"Dispute auto-decision",      aiVerdict:"Full refund to client (95%)", adminDecision:"Partial refund — 60% to client", adminBy:"Super Admin",    date:"Mar 5, 2026",  target:"DSP-004 — Brand Identity",   aiConfidence:90, category:"Dispute", reason:"Brief was genuinely vague — not fully client's fault", impactScore:"High"   },
  { id:"OVR-003", aiAction:"Block payout",               aiVerdict:"Hold payout — risk flag",     adminDecision:"Approve payout",                adminBy:"Finance Admin",   date:"Feb 22, 2026", target:"PO-006 — Karan Malhotra",     aiConfidence:72, category:"Payment", reason:"AI risk flag was based on outdated dispute data", impactScore:"Low"    },
  { id:"OVR-004", aiAction:"Agency project limit",       aiVerdict:"Reduce limit to 3 projects",  adminDecision:"Keep limit at 6 projects",       adminBy:"Platform Admin", date:"Feb 10, 2026", target:"BuildRight Agency (AG-002)",  aiConfidence:81, category:"User",    reason:"Agency proved capacity with updated team documents", impactScore:"High"   },
  { id:"OVR-005", aiAction:"Auto-flag account",          aiVerdict:"Flag as suspicious",          adminDecision:"No action — false positive",     adminBy:"Support Admin",   date:"Jan 25, 2026", target:"Sneha Kapoor (CL-001)",       aiConfidence:62, category:"User",    reason:"AI triggered on VPN usage — legitimate enterprise client", impactScore:"Low" },
];

const categoryColor = {
  User:    "bg-green-100 text-green-700",
  Dispute: "bg-red-100 text-red-700",
  Project: "bg-purple-100 text-purple-700",
  Payment: "bg-blue-100 text-blue-700",
  Matching:"bg-orange-100 text-orange-700",
};

const outcomeStyle = {
  "Executed":      "bg-green-50 text-green-700 border border-green-200",
  "Notified Admin":"bg-yellow-50 text-yellow-700 border border-yellow-200",
  "Blocked":       "bg-red-50 text-red-600 border border-red-200",
  "Overridden":    "bg-orange-50 text-orange-700 border border-orange-200",
};

const impactStyle = {
  High:   "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low:    "bg-gray-50 text-gray-500 border border-gray-200",
};

// ─── PAGE 1: /admin/ai-logs ───────────────────────────────────────────────────
export function AdminAILogs() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategory] = useState("");
  const [outcomeFilter, setOutcome] = useState("");
  const [expanded, setExpanded] = useState(null);

  const filtered = mockAILogs.filter(l => {
    const q = search.toLowerCase();
    return (
      (l.action.toLowerCase().includes(q) || l.target.toLowerCase().includes(q) || l.id.toLowerCase().includes(q)) &&
      (!categoryFilter || l.category === categoryFilter) &&
      (!outcomeFilter  || l.outcome === outcomeFilter)
    );
  });

  const autoActed    = mockAILogs.filter(l => l.outcome === "Executed").length;
  const notified     = mockAILogs.filter(l => l.outcome === "Notified Admin").length;
  const overridden   = mockAILogs.filter(l => l.overridden).length;
  const avgConfidence = Math.round(mockAILogs.reduce((s, l) => s + l.confidence, 0) / mockAILogs.length);

  return (
    <div className="p-6">
      <PageHeader
        title="AI Decisions Log"
        subtitle="Every AI action — what it did, why, and how confident it was"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="AI Settings →" onClick={() => navigate("/admin/ai-settings")} />
            <ActionBtn label="Admin Overrides →" onClick={() => navigate("/admin/ai-overrides")} />
            <ActionBtn label="⬇ Export" />
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total AI Actions" value={mockAILogs.length}   color="gray"   />
        <StatCard label="Auto-Executed"    value={autoActed}            sub="No admin needed" color="green"  />
        <StatCard label="Notified Admin"   value={notified}             sub="Needed review"   color="orange" />
        <StatCard label="Avg Confidence"   value={`${avgConfidence}%`}  color="blue"   />
      </div>

      {/* Info Banner */}
      <div className="bg-blue-50 border border-blue-100 rounded-xl p-3.5 mb-5 flex items-start gap-3">
        <span className="text-blue-500 text-sm shrink-0 mt-0.5">◎</span>
        <p className="text-xs text-blue-700 leading-relaxed">
          AI acts automatically when confidence ≥ 90%. Between 65–90%, admin is notified. Below 65%, manual review only.
          Every decision here is immutable and logged permanently.
        </p>
        <ActionBtn label="Change Thresholds" onClick={() => navigate("/admin/ai-settings")} />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search action, target, log ID...">
            <FilterSelect value={categoryFilter} onChange={setCategory} label="All Categories"
              options={["User","Dispute","Project","Payment","Matching"].map(v => ({ value:v, label:v }))} />
            <FilterSelect value={outcomeFilter} onChange={setOutcome} label="All Outcomes"
              options={["Executed","Notified Admin","Overridden"].map(v => ({ value:v, label:v }))} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} of {mockAILogs.length} logs</span>
        </div>

        <div className="divide-y divide-gray-50">
          {filtered.map(log => (
            <div key={log.id} className="hover:bg-gray-50/50 transition-colors">
              <div className="flex items-start gap-4 p-4 cursor-pointer"
                onClick={() => setExpanded(expanded === log.id ? null : log.id)}>

                {/* Category icon */}
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold shrink-0 mt-0.5 ${categoryColor[log.category] || "bg-gray-100 text-gray-500"}`}>
                  ◎
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap mb-0.5">
                    <span className="text-sm font-bold text-gray-800">{log.action}</span>
                    <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${outcomeStyle[log.outcome]}`}>
                      {log.outcome}
                    </span>
                    {log.overridden && (
                      <span className="text-[11px] bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">
                        Overridden
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 truncate">→ {log.target}</p>
                </div>

                {/* Confidence */}
                <div className="flex items-center gap-2 shrink-0">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${log.confidence >= 90 ? "bg-green-500" : log.confidence >= 65 ? "bg-yellow-400" : "bg-red-400"}`}
                      style={{ width: `${log.confidence}%` }} />
                  </div>
                  <span className={`text-xs font-bold w-8 text-right ${log.confidence >= 90 ? "text-green-600" : log.confidence >= 65 ? "text-yellow-600" : "text-red-500"}`}>
                    {log.confidence}%
                  </span>
                </div>

                <div className="text-right shrink-0 ml-2">
                  <p className="text-xs text-gray-400">{log.timestamp}</p>
                  <p className="text-[10px] text-gray-300">{log.id}</p>
                </div>

                <span className={`text-gray-400 text-xs mt-1.5 shrink-0 transition-transform ${expanded === log.id ? "rotate-90" : ""}`}>▶</span>
              </div>

              {expanded === log.id && (
                <div className="px-4 pb-4 ml-12">
                  <div className="bg-gray-50 rounded-xl border border-gray-100 p-4 space-y-2">
                    {[
                      { label:"Log ID",      value:log.id           },
                      { label:"Action",      value:log.action       },
                      { label:"Target",      value:log.target       },
                      { label:"Category",    value:log.category     },
                      { label:"Outcome",     value:log.outcome      },
                      { label:"Confidence",  value:`${log.confidence}%` },
                      { label:"Reason",      value:log.reason       },
                      { label:"Timestamp",   value:log.timestamp    },
                    ].map(item => (
                      <div key={item.label} className="flex items-start gap-3">
                        <span className="text-[10px] text-gray-400 font-semibold uppercase tracking-wide w-20 shrink-0 pt-0.5">{item.label}</span>
                        <span className="text-xs text-gray-700 font-medium">{item.value}</span>
                      </div>
                    ))}
                    {!log.overridden && log.outcome === "Executed" && (
                      <div className="pt-2 border-t border-gray-200">
                        <ActionBtn
                          label="Override This Decision"
                          variant="warning"
                          onClick={() => navigate("/admin/ai-overrides")}
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">No AI logs match your filters</p></div>
        )}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockAILogs.length} AI actions</span>
          <ActionBtn label="⬇ Export Logs" />
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 2: /admin/ai-overrides ─────────────────────────────────────────────
export function AdminAIOverrides() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategory] = useState("");
  const [impactFilter, setImpact] = useState("");
  const [selected, setSelected] = useState(null);
  const [showAddOverride, setShowAddOverride] = useState(false);
  const [newOverride, setNewOverride] = useState({ logId:"", reason:"" });

  const filtered = mockOverrides.filter(o => {
    const q = search.toLowerCase();
    return (
      (o.target.toLowerCase().includes(q) || o.adminBy.toLowerCase().includes(q) || o.id.toLowerCase().includes(q)) &&
      (!categoryFilter || o.category === categoryFilter) &&
      (!impactFilter   || o.impactScore === impactFilter)
    );
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Admin Overrides"
        subtitle="Cases where admin overruled AI — used to improve the model"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="AI Logs →"      onClick={() => navigate("/admin/ai-logs")} />
            <ActionBtn label="AI Settings →"  onClick={() => navigate("/admin/ai-settings")} />
            <ActionBtn label="+ Add Override" variant="primary" size="md" onClick={() => setShowAddOverride(true)} />
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Overrides"   value={mockOverrides.length}                                             color="gray"   />
        <StatCard label="High Impact"       value={mockOverrides.filter(o => o.impactScore === "High").length}       sub="Major AI correction"  color="red"    />
        <StatCard label="False Positives"   value={mockOverrides.filter(o => o.aiConfidence < 80).length}            sub="AI was uncertain"     color="orange" />
        <StatCard label="Avg AI Confidence" value={`${Math.round(mockOverrides.reduce((s,o)=>s+o.aiConfidence,0)/mockOverrides.length)}%`} sub="At time of override" color="blue" />
      </div>

      {/* Learning loop banner */}
      <div className="bg-purple-50 border border-purple-100 rounded-xl p-4 mb-5 flex items-start gap-3">
        <span className="text-purple-500 text-lg shrink-0">◎</span>
        <div>
          <p className="text-sm font-bold text-purple-800">AI Learning Loop</p>
          <p className="text-xs text-purple-600 mt-0.5">
            Every admin override is fed back into the AI model during retraining. Overrides with clear reasons improve accuracy.
            High-impact overrides are prioritized in the next training cycle.
          </p>
        </div>
        <span className="text-[11px] bg-purple-100 text-purple-700 border border-purple-200 px-2 py-0.5 rounded-full font-semibold shrink-0">
          {mockOverrides.length} overrides queued
        </span>
      </div>

      <div className="flex gap-5">
        {/* List */}
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
              <SearchBar value={search} onChange={setSearch} placeholder="Search target, admin, override ID...">
                <FilterSelect value={categoryFilter} onChange={setCategory} label="All Categories"
                  options={["User","Dispute","Project","Payment"].map(v=>({value:v,label:v}))} />
                <FilterSelect value={impactFilter} onChange={setImpact} label="All Impact"
                  options={["High","Medium","Low"].map(v=>({value:v,label:v}))} />
              </SearchBar>
              <span className="text-xs text-gray-400">{filtered.length} overrides</span>
            </div>

            <div className="divide-y divide-gray-50">
              {filtered.map(o => (
                <div key={o.id}
                  onClick={() => setSelected(selected?.id === o.id ? null : o)}
                  className={`p-4 cursor-pointer hover:bg-gray-50/50 transition-colors ${selected?.id === o.id ? "bg-green-50/30" : ""}`}>

                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div>
                      <div className="flex items-center gap-2 flex-wrap mb-0.5">
                        <span className="text-xs font-mono text-gray-400">{o.id}</span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${impactStyle[o.impactScore]}`}>
                          {o.impactScore} Impact
                        </span>
                        <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${categoryColor[o.category] || "bg-gray-100 text-gray-500"}`}>
                          {o.category}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-800">{o.target}</p>
                      <p className="text-xs text-gray-400 mt-0.5">{o.date} · by {o.adminBy}</p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div className={`h-full rounded-full ${o.aiConfidence >= 80 ? "bg-green-500" : o.aiConfidence >= 65 ? "bg-yellow-400" : "bg-red-400"}`}
                          style={{ width: `${o.aiConfidence}%` }} />
                      </div>
                      <span className="text-xs font-bold text-gray-500">{o.aiConfidence}%</span>
                    </div>
                  </div>

                  {/* AI vs Admin */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-100">
                      <p className="text-[10px] text-blue-500 font-semibold mb-0.5">◎ AI SAID</p>
                      <p className="text-xs text-blue-800 font-medium">{o.aiVerdict}</p>
                    </div>
                    <div className="p-2.5 bg-green-50 rounded-lg border border-green-100">
                      <p className="text-[10px] text-green-500 font-semibold mb-0.5">👤 ADMIN DECIDED</p>
                      <p className="text-xs text-green-800 font-medium">{o.adminDecision}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {filtered.length === 0 && (
              <div className="py-16 text-center"><p className="text-gray-400 text-sm">No overrides found</p></div>
            )}
            <div className="px-4 py-3 border-t border-gray-100">
              <span className="text-xs text-gray-400">Showing {filtered.length} of {mockOverrides.length} overrides</span>
            </div>
          </div>
        </div>

        {/* Detail / Add Override Panel */}
        <div className="w-72 shrink-0">
          {showAddOverride ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Add Override</h3>
                <button onClick={() => setShowAddOverride(false)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">AI Log ID *</label>
                  <input value={newOverride.logId}
                    onChange={e => setNewOverride({...newOverride, logId: e.target.value})}
                    placeholder="e.g. AIL-001"
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 placeholder-gray-400" />
                </div>
                <div>
                  <label className="text-xs font-semibold text-gray-500 block mb-1.5">Override Reason *</label>
                  <textarea value={newOverride.reason}
                    onChange={e => setNewOverride({...newOverride, reason: e.target.value})}
                    placeholder="Why are you overriding this AI decision? Be specific — this improves the model."
                    className="w-full text-sm border border-gray-200 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
                    rows={4} />
                </div>
                <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-100">
                  <p className="text-xs text-yellow-700">
                    ⚠ Your override will be logged permanently and used to retrain the AI model.
                  </p>
                </div>
                <div className="flex gap-2">
                  <ActionBtn label="Cancel" onClick={() => setShowAddOverride(false)} />
                  <button
                    disabled={!newOverride.logId || !newOverride.reason}
                    className="flex-1 py-2 text-sm font-bold bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    onClick={() => setShowAddOverride(false)}>
                    Submit Override
                  </button>
                </div>
              </div>
            </div>
          ) : selected ? (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Override Detail</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${impactStyle[selected.impactScore]}`}>
                    {selected.impactScore} Impact
                  </span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${categoryColor[selected.category]}`}>
                    {selected.category}
                  </span>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-0.5">Target</p>
                  <p className="text-sm font-bold text-gray-800">{selected.target}</p>
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-[10px] text-blue-500 font-semibold mb-1">◎ AI DECISION ({selected.aiConfidence}% confidence)</p>
                  <p className="text-sm text-blue-800 font-medium">{selected.aiVerdict}</p>
                </div>

                <div className="p-3 bg-green-50 rounded-xl border border-green-100">
                  <p className="text-[10px] text-green-500 font-semibold mb-1">👤 ADMIN DECISION</p>
                  <p className="text-sm text-green-800 font-medium">{selected.adminDecision}</p>
                </div>

                <div>
                  <p className="text-xs text-gray-400 mb-1 font-semibold">Override Reason</p>
                  <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-2.5 border border-gray-100">
                    {selected.reason}
                  </p>
                </div>

                <div className="space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Override ID</span>
                    <span className="font-mono font-semibold text-gray-600">{selected.id}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">By</span>
                    <span className="font-semibold text-gray-700">{selected.adminBy}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Date</span>
                    <span className="font-semibold text-gray-700">{selected.date}</span>
                  </div>
                </div>

                <div className="p-3 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="text-[10px] text-purple-600 font-semibold">◎ AI LEARNING STATUS</p>
                  <p className="text-xs text-purple-700 mt-0.5">Queued for next model retraining cycle</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm p-8 text-center sticky top-6">
              <div className="w-10 h-10 rounded-full bg-purple-50 flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-400 text-lg">◎</span>
              </div>
              <p className="text-sm text-gray-500 mb-3">Select an override to view details</p>
              <ActionBtn label="+ Add Override" variant="primary" onClick={() => setShowAddOverride(true)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}