import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockAgencies } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
  SearchBar, FilterSelect, ActionBtn, PageHeader, Table,
  SectionCard, InfoRow
} from "./AdminComponents";

// ─── LIST PAGE ───────────────────────────────────────────────────────────────
export function AdminAgencies() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [verFilter, setVerFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const filtered = mockAgencies.filter((a) => {
    const q = search.toLowerCase();
    const matchSearch = a.name.toLowerCase().includes(q) || a.email.toLowerCase().includes(q);
    const matchVer = !verFilter || a.verificationStatus === verFilter;
    const matchRisk = !riskFilter || a.deliveryRisk === riskFilter;
    return matchSearch && matchVer && matchRisk;
  });

  const riskColor = { Low: "text-green-600", Medium: "text-yellow-600", High: "text-red-500" };

  return (
    <div className="p-6">
      <PageHeader
        title="Agencies"
        subtitle="Monitor company-level entities, capacity & delivery risk"
        actions={<ActionBtn label="⬇ Export" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Agencies" value={mockAgencies.length} color="gray" />
        <StatCard label="Verified" value={mockAgencies.filter((a) => a.verificationStatus === "Verified").length} color="green" />
        <StatCard label="Overloaded" value={mockAgencies.filter((a) => a.overloadFlag).length} sub="AI detected" color="orange" />
        <StatCard label="Pending Verification" value={mockAgencies.filter((a) => a.verificationStatus === "Pending").length} color="red" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search agency name, email...">
            <FilterSelect
              value={verFilter}
              onChange={setVerFilter}
              label="All Status"
              options={[{ value: "Verified", label: "Verified" }, { value: "Pending", label: "Pending" }, { value: "Rejected", label: "Rejected" }]}
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

        <Table headers={["Agency", "KYC", "Team Size", "Capability", "Risk", "Active", "Limit", "Trust", "Overload", "Earned", "Actions"]}>
          {filtered.map((a) => (
            <tr
              key={a.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/admin/agencies/${a.id}`)}
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={a.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{a.name}</p>
                    <p className="text-xs text-gray-400">{a.email}</p>
                    <p className="text-[10px] text-gray-300">{a.id}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4"><StatusBadge status={a.verificationStatus} /></td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{a.teamSize}</span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-14 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${a.capabilityScore}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{a.capabilityScore}</span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${riskColor[a.deliveryRisk]}`}>{a.deliveryRisk}</span>
              </td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{a.activeProjects}</span>
              </td>
              <td className="py-3 pr-4 text-center">
                <span className="text-xs text-gray-500">{a.activeProjects}/{a.projectLimit}</span>
              </td>
              <td className="py-3 pr-4"><TrustScore score={a.trustScore} /></td>
              <td className="py-3 pr-4">
                {a.overloadFlag ? (
                  <span className="text-[11px] bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">⚠ Overloaded</span>
                ) : (
                  <span className="text-xs text-gray-300">—</span>
                )}
              </td>
              <td className="py-3 pr-4 text-sm font-semibold text-green-600">
                ₹{(a.totalEarned / 100000).toFixed(1)}L
              </td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ActionBtn label="View" variant="primary" onClick={(e) => { e.stopPropagation(); navigate(`/admin/agencies/${a.id}`); }} />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockAgencies.length} agencies</span>
        </div>
      </div>
    </div>
  );
}

// ─── DETAIL PAGE ─────────────────────────────────────────────────────────────
export function AdminAgencyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("overview");

  const a = mockAgencies.find((x) => x.id === id);

  if (!a) return (
    <div className="p-6 text-center py-24">
      <p className="text-gray-400">Agency not found</p>
      <ActionBtn label="← Back" onClick={() => navigate("/admin/agencies")} />
    </div>
  );

  const tabs = ["overview", "team", "projects", "financials", "admin"];
  const riskColor = { Low: "text-green-600", Medium: "text-yellow-600", High: "text-red-500" };

  return (
    <div className="p-6">
      <button onClick={() => navigate("/admin/agencies")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-4">
        ← All Agencies
      </button>

      {/* Header */}
      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={a.name} size="lg" />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="text-xl font-bold text-gray-900">{a.name}</h1>
              <StatusBadge status={a.verificationStatus} />
              {a.overloadFlag && (
                <span className="text-[11px] bg-orange-50 text-orange-600 border border-orange-200 px-2 py-0.5 rounded-full font-semibold">⚠ Overloaded</span>
              )}
            </div>
            <p className="text-sm text-gray-500 mt-0.5">{a.email} · {a.id} · {a.legalName}</p>
            <div className="flex items-center gap-4 mt-2">
              <TrustScore score={a.trustScore} />
              <span className={`text-xs font-semibold ${riskColor[a.deliveryRisk]}`}>
                Risk: {a.deliveryRisk}
              </span>
              <span className="text-xs text-gray-500">Team: {a.teamSize} members</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <ActionBtn label="Limit Projects" variant="warning" size="md" />
          <ActionBtn label="Suspend Agency" variant="danger" size="md" />
          <ActionBtn label="⋯ More" size="md" />
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        {[
          { label: "Capability Score", value: `${a.capabilityScore}/100`, color: "text-green-600" },
          { label: "Active Projects", value: `${a.activeProjects}/${a.projectLimit}`, color: "text-blue-600" },
          { label: "Team Members", value: a.teamSize, color: "text-gray-800" },
          { label: "Total Earned", value: `₹${(a.totalEarned / 100000).toFixed(1)}L`, color: "text-green-600" },
          { label: "Pending Payouts", value: `₹${(a.pendingPayouts / 1000).toFixed(0)}k`, color: "text-orange-500" },
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
            <SectionCard title="Agency Identity">
              <InfoRow label="Brand Name" value={a.name} />
              <InfoRow label="Legal Name" value={a.legalName} />
              <InfoRow label="Country" value={a.country} />
              <InfoRow label="Website" value={a.website} />
              <InfoRow label="Agency Admin" value={a.adminName} />
              <InfoRow label="Admin Email" value={a.adminEmail} />
              <InfoRow label="KYC Status" value={<StatusBadge status={a.kycStatus} />} />
            </SectionCard>

            <SectionCard title="Services & Industries">
              <div className="mb-3">
                <p className="text-xs text-gray-400 mb-2 font-medium">Primary Services</p>
                <div className="flex flex-wrap gap-2">
                  {a.services.map((s) => (
                    <span key={s} className="text-xs bg-green-50 text-green-700 border border-green-200 px-2.5 py-1 rounded-full">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-xs text-gray-400 mb-2 font-medium">Industries</p>
                <div className="flex flex-wrap gap-2">
                  {a.industries.map((i) => (
                    <span key={i} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2.5 py-1 rounded-full">{i}</span>
                  ))}
                </div>
              </div>
            </SectionCard>
          </div>

          <div className="space-y-5">
            <SectionCard title="Capacity Overview">
              <div className="mb-3">
                <div className="flex justify-between text-xs text-gray-500 mb-1">
                  <span>Project Slots</span>
                  <span className="font-semibold">{a.activeProjects}/{a.projectLimit}</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${a.activeProjects / a.projectLimit > 0.8 ? "bg-orange-400" : "bg-green-500"}`}
                    style={{ width: `${(a.activeProjects / a.projectLimit) * 100}%` }}
                  />
                </div>
              </div>
              <div className="space-y-2 pt-2">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Delivery Risk</span>
                  <span className={`font-semibold ${riskColor[a.deliveryRisk]}`}>{a.deliveryRisk}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Overload Alert</span>
                  <span className={`font-semibold ${a.overloadFlag ? "text-orange-500" : "text-green-600"}`}>
                    {a.overloadFlag ? "Yes" : "No"}
                  </span>
                </div>
              </div>
            </SectionCard>
          </div>
        </div>
      )}

      {activeTab === "team" && (
        <SectionCard title="Team Members">
          {a.teamMembers.length > 0 ? (
            <div className="space-y-3">
              {a.teamMembers.map((m, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <Avatar name={m.name} size="sm" />
                  <div className="flex-1">
                    <p className="text-sm font-semibold text-gray-800">{m.name}</p>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {m.skills.map((s) => (
                        <span key={s} className="text-[10px] bg-white border border-gray-200 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                      ))}
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <span className="text-xs font-semibold text-gray-500 block">{m.role}</span>
                    <span className="text-xs text-gray-400">{m.availability}% available</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400 text-center py-8">No team members added yet</p>
          )}
        </SectionCard>
      )}

      {activeTab === "projects" && (
        <SectionCard title="Project History">
          <p className="text-sm text-gray-400 text-center py-8">Project history will be displayed here</p>
        </SectionCard>
      )}

      {activeTab === "financials" && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { label: "Total Earned", value: `₹${a.totalEarned.toLocaleString()}`, color: "text-green-600" },
            { label: "Pending Payouts", value: `₹${a.pendingPayouts.toLocaleString()}`, color: "text-orange-500" },
            { label: "Platform Commission", value: `₹${Math.round(a.totalEarned * 0.06).toLocaleString()}`, color: "text-gray-600" },
          ].map((s) => (
            <div key={s.label} className="bg-white rounded-xl border border-gray-100 p-4">
              <p className="text-xs text-gray-400 mb-1">{s.label}</p>
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            </div>
          ))}
        </div>
      )}

      {activeTab === "admin" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
          <SectionCard title="Admin Control Panel">
            <div className="space-y-2">
              {[
                { label: "Adjust Project Limit", variant: "default" },
                { label: "Force Re-verification", variant: "default" },
                { label: "Send Governance Message", variant: "default" },
                { label: "Restrict Service Categories", variant: "warning" },
                { label: "Suspend Agency", variant: "danger" },
              ].map((action) => (
                <button key={action.label} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${action.variant === "danger" ? "border-red-200 text-red-600 bg-red-50 hover:bg-red-100" : action.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                  {action.label}
                </button>
              ))}
            </div>
          </SectionCard>

          <SectionCard title="Audit Log">
            <p className="text-sm text-gray-400 text-center py-8">No admin actions recorded yet</p>
          </SectionCard>
        </div>
      )}
    </div>
  );
}