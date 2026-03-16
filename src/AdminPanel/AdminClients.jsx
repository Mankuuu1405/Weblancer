import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockClients } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
  SearchBar, FilterSelect, ActionBtn, PageHeader, Table,
  SectionCard, InfoRow
} from "./AdminComponents";

// ─── LIST PAGE ─────────────────────────────────────────────────────────────
export function AdminClients() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [verFilter, setVerFilter] = useState("");

  const filtered = mockClients.filter((c) => {
    const q = search.toLowerCase();
    const matchSearch = c.name.toLowerCase().includes(q) || c.email.toLowerCase().includes(q) || (c.company || "").toLowerCase().includes(q);
    const matchType = !typeFilter || c.clientType === typeFilter;
    const matchRisk = !riskFilter || c.riskLevel === riskFilter;
    const matchVer = !verFilter || c.verificationStatus === verFilter;
    return matchSearch && matchType && matchRisk && matchVer;
  });

  const payColor = { Excellent: "text-green-600", Average: "text-yellow-600", Poor: "text-red-500", Unknown: "text-gray-400" };
  const scopeColor = { Low: "text-green-600", Medium: "text-yellow-600", High: "text-red-500", "N/A": "text-gray-400" };

  return (
    <div className="p-6">
      <PageHeader
        title="Clients"
        subtitle="Monitor the demand side — who is posting, paying & behaving"
        actions={<ActionBtn label="⬇ Export" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Clients" value={mockClients.length} color="gray" />
        <StatCard label="Verified" value={mockClients.filter((c) => c.verificationStatus === "Verified").length} color="green" />
        <StatCard label="AI Flagged" value={mockClients.filter((c) => c.aiFlag).length} sub="Needs review" color="orange" />
        <StatCard
          label="Total Spent (All)"
          value={`₹${(mockClients.reduce((s, c) => s + (c.totalSpent || 0), 0) / 100000).toFixed(1)}L`}
          color="blue"
        />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, company, email...">
            <FilterSelect
              value={typeFilter}
              onChange={setTypeFilter}
              label="All Types"
              options={[{ value: "Individual", label: "Individual" }, { value: "Startup", label: "Startup" }, { value: "Enterprise", label: "Enterprise" }]}
            />
            <FilterSelect
              value={verFilter}
              onChange={setVerFilter}
              label="All KYC"
              options={[{ value: "Verified", label: "Verified" }, { value: "Unverified", label: "Unverified" }, { value: "Rejected", label: "Rejected" }]}
            />
            <FilterSelect
              value={riskFilter}
              onChange={setRiskFilter}
              label="All Risk"
              options={[{ value: "Low", label: "Low" }, { value: "Medium", label: "Medium" }, { value: "High", label: "High" }]}
            />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>

        <Table headers={["Client", "Type", "KYC", "Trust", "Projects", "Spent", "Active", "Disputes", "Pay Reliability", "Scope Changes", "Risk", "Actions"]}>
          {filtered.map((c) => (
            <tr
              key={c.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/admin/clients/${c.id}`)}
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={c.name} size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <p className="text-sm font-semibold text-gray-800">{c.name}</p>
                      {c.aiFlag && (
                        <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">AI⚑</span>
                      )}
                    </div>
                    {c.company && <p className="text-xs text-gray-400">{c.company}</p>}
                    <p className="text-xs text-gray-400">{c.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="text-xs text-gray-600 font-medium">{c.clientType}</span>
              </td>
              <td className="py-3 pr-4"><StatusBadge status={c.verificationStatus} /></td>
              <td className="py-3 pr-4"><TrustScore score={c.trustScore} /></td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{c.totalProjects}</span>
              </td>
              <td className="py-3 pr-4 text-sm font-semibold text-gray-700">
                {c.totalSpent > 0 ? `₹${(c.totalSpent / 1000).toFixed(0)}k` : "—"}
              </td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{c.activeProjects}</span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${c.disputeInitiationRate !== "N/A" && parseInt(c.disputeInitiationRate) > 20 ? "text-red-500" : "text-gray-600"}`}>
                  {c.disputeInitiationRate}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${payColor[c.paymentReliability]}`}>
                  {c.paymentReliability}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${scopeColor[c.scopeChangeFreq]}`}>
                  {c.scopeChangeFreq}
                </span>
              </td>
              <td className="py-3 pr-4"><RiskFlag level={c.riskLevel} /></td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ActionBtn label="View" variant="primary" onClick={(e) => { e.stopPropagation(); navigate(`/admin/clients/${c.id}`); }} />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No clients match your filters</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockClients.length} clients</span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ────────────────────────────────────────────────────────────
export function AdminClientDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const c = mockClients.find((x) => x.id === id);

  if (!c) return (
    <div className="p-6 text-center py-24">
      <p className="text-gray-400">Client not found</p>
      <ActionBtn label="← Back" onClick={() => navigate("/admin/clients")} />
    </div>
  );

  const tabs = ["overview", "projects", "financials", "behavior", "admin"];
  const payColor = { Excellent: "text-green-600", Average: "text-yellow-600", Poor: "text-red-500", Unknown: "text-gray-400" };

  return (
    <div className="p-6">
      <button onClick={() => navigate("/admin/clients")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4">
        ← All Clients
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={c.name} size="lg" />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">{c.name}</h1>
              <StatusBadge status={c.verificationStatus} />
              {c.aiFlag && (
                <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-semibold">⚑ AI Flagged</span>
              )}
              {c.warnings > 0 && (
                <span className="text-[10px] bg-yellow-50 text-yellow-600 border border-yellow-200 px-2 py-0.5 rounded-full font-semibold">
                  ⚠ {c.warnings} Warning{c.warnings > 1 ? "s" : ""}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">
              {c.email} · {c.id} · {c.clientType}{c.company ? ` · ${c.company}` : ""}
            </p>
            <div className="flex items-center gap-4 mt-2">
              <TrustScore score={c.trustScore} />
              <RiskFlag level={c.riskLevel} />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionBtn label="Send Warning" variant="warning" size="md" />
          <ActionBtn label="Restrict Posting" size="md" />
          <ActionBtn label="Suspend" variant="danger" size="md" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Total Projects", value: c.totalProjects, color: "text-gray-800" },
          { label: "Total Spent", value: c.totalSpent > 0 ? `₹${(c.totalSpent / 1000).toFixed(0)}k` : "—", color: "text-blue-600" },
          { label: "Active Projects", value: c.activeProjects, color: "text-green-600" },
          { label: "Escrow Locked", value: c.escrowLocked > 0 ? `₹${(c.escrowLocked / 1000).toFixed(0)}k` : "—", color: "text-orange-500" },
          { label: "Warnings Issued", value: c.warnings, color: c.warnings > 0 ? "text-red-500" : "text-gray-400" },
        ].map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-3 shadow-sm text-center">
            <p className="text-xs text-gray-400 mb-1">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-100 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 text-sm font-medium capitalize transition-colors ${
              activeTab === tab ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {activeTab === "overview" && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          <div className="lg:col-span-2 space-y-5">
            <SectionCard title="Client Identity">
              <InfoRow label="Full Name" value={c.name} />
              <InfoRow label="Email" value={c.email} />
              <InfoRow label="Company" value={c.company || "—"} />
              <InfoRow label="Client Type" value={c.clientType} />
              <InfoRow label="Country" value={c.country} />
              <InfoRow label="Preferred Currency" value={c.preferredCurrency} />
              <InfoRow label="Billing Address" value={c.billingAddress || "—"} />
              <InfoRow label="Joined" value={c.joinDate} />
            </SectionCard>

            <SectionCard title="Refund History">
              {c.refundHistory.length > 0 ? (
                <div className="space-y-2">
                  {c.refundHistory.map((r, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-red-50 rounded-lg border border-red-100">
                      <div>
                        <p className="text-sm font-medium text-gray-800">{r.reason}</p>
                        <p className="text-xs text-gray-500">{r.date}</p>
                      </div>
                      <span className="text-sm font-bold text-red-500">₹{r.amount.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-400 text-center py-4">No refunds issued</p>
              )}
            </SectionCard>
          </div>

          <div className="space-y-5">
            <SectionCard title="Behavior Profile">
              <div className="space-y-3">
                {[
                  { label: "Payment Reliability", value: c.paymentReliability, color: payColor[c.paymentReliability] },
                  { label: "Scope Change Freq.", value: c.scopeChangeFreq, color: c.scopeChangeFreq === "High" ? "text-red-500" : c.scopeChangeFreq === "Medium" ? "text-yellow-600" : "text-green-600" },
                  { label: "Dispute Rate", value: c.disputeInitiationRate, color: c.disputeInitiationRate !== "N/A" && parseInt(c.disputeInitiationRate) > 20 ? "text-red-500" : "text-gray-700" },
                  { label: "Risk Level", value: <RiskFlag level={c.riskLevel} /> },
                  { label: "KYC Status", value: <StatusBadge status={c.verificationStatus} /> },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between py-1.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400">{item.label}</span>
                    {typeof item.value === "string" ? (
                      <span className={`text-xs font-semibold ${item.color}`}>{item.value}</span>
                    ) : item.value}
                  </div>
                ))}
              </div>
            </SectionCard>

            <SectionCard title="Admin Notes (Internal)">
              <div className="space-y-2 mb-3">
                {notes.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No notes yet</p>}
                {notes.map((n, i) => (
                  <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                    <p className="text-xs text-gray-700">{n.text}</p>
                    <p className="text-[10px] text-gray-400 mt-0.5">Super Admin · {n.date}</p>
                  </div>
                ))}
              </div>
              <textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Internal note (not visible to client)..."
                className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                rows={3}
              />
              <ActionBtn
                label="Save Note"
                variant="primary"
                onClick={() => { if (note.trim()) { setNotes([{ text: note, date: "Mar 14, 2026" }, ...notes]); setNote(""); } }}
              />
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === "projects" && (
        <SectionCard title="Project History">
          <div className="space-y-2">
            {[
              { name: "Patient Appointment App", talent: "HealthFirst Dev Team", status: "In Progress", budget: "₹3,20,000" },
              { name: "Website Revamp", talent: "Arjun Dev", status: "Completed", budget: "₹85,000" },
            ].map((p, i) => (
              <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                <div>
                  <p className="text-sm font-semibold text-gray-800">{p.name}</p>
                  <p className="text-xs text-gray-500">{p.talent}</p>
                </div>
                <div className="text-right">
                  <StatusBadge status={p.status} />
                  <p className="text-sm font-bold text-gray-700 mt-1">{p.budget}</p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>
      )}

      {activeTab === "financials" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Spent", value: c.totalSpent > 0 ? `₹${c.totalSpent.toLocaleString()}` : "₹0", color: "text-blue-600" },
            { label: "Escrow Locked", value: c.escrowLocked > 0 ? `₹${c.escrowLocked.toLocaleString()}` : "₹0", color: "text-orange-500" },
            { label: "Total Refunds", value: c.refundHistory.length > 0 ? `₹${c.refundHistory.reduce((s, r) => s + r.amount, 0).toLocaleString()}` : "₹0", color: "text-red-500" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "behavior" && (
        <SectionCard title="AI Behavior Analysis">
          <div className="p-4 rounded-xl mb-4 border" style={{ background: c.riskLevel === "High" ? "#fef2f2" : "#f0fdf4", borderColor: c.riskLevel === "High" ? "#fecaca" : "#bbf7d0" }}>
            <p className="text-sm font-semibold mb-1" style={{ color: c.riskLevel === "High" ? "#dc2626" : "#15803d" }}>
              AI Assessment
            </p>
            <p className="text-sm" style={{ color: c.riskLevel === "High" ? "#b91c1c" : "#166534" }}>
              {c.riskLevel === "High"
                ? "This client shows patterns of dispute abuse, scope manipulation, and payment delays. Recommend enhanced monitoring and restrict high-value project posting."
                : c.riskLevel === "Medium"
                ? "This client shows moderate scope change frequency. AI recommends stricter milestone agreements for future projects."
                : "This client demonstrates consistent, professional behavior with strong payment reliability and low dispute history."}
            </p>
          </div>
          <InfoRow label="Comm. Tone Trend" value="Professional" />
          <InfoRow label="Scope Compliance" value={c.scopeChangeFreq === "Low" ? "High" : "Low"} />
          <InfoRow label="Policy Violations" value={c.warnings > 0 ? `${c.warnings} recorded` : "None"} />
          <InfoRow label="Platform Policy" value={c.warnings > 0 ? "Warning issued" : "Compliant"} />
        </SectionCard>
      )}

      {activeTab === "admin" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Admin Control Panel">
            <div className="space-y-2">
              {[
                { label: "Send Official Warning", variant: "warning" },
                { label: "Force Escrow Pre-funding", variant: "default" },
                { label: "Restrict Project Posting", variant: "default" },
                { label: "Restrict Hiring", variant: "default" },
                { label: "Suspend Account", variant: "danger" },
              ].map((action) => (
                <button key={action.label} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${action.variant === "danger" ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" : action.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Audit Log">
            {c.warnings > 0 ? (
              <div className="space-y-2">
                {[...Array(c.warnings)].map((_, i) => (
                  <div key={i} className="flex items-start gap-3 p-2.5 bg-yellow-50 rounded-lg border border-yellow-100">
                    <div className="w-1.5 h-1.5 rounded-full mt-1.5 bg-yellow-400 shrink-0" />
                    <div>
                      <p className="text-xs font-medium text-gray-700">Warning issued — policy violation</p>
                      <p className="text-[10px] text-gray-400 mt-0.5">Platform Admin · Feb 2026</p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">No admin actions recorded</p>
            )}
          </SectionCard>
        </div>
      )}
    </div>
  );
}