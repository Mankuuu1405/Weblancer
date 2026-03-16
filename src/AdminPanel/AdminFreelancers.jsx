import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockFreelancers } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
  SearchBar, FilterSelect, ActionBtn, PageHeader, Table
} from "./AdminComponents";

export default function AdminFreelancers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [badgeFilter, setBadgeFilter] = useState("");
  const [visibilityFilter, setVisibilityFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");

  const filtered = mockFreelancers.filter((f) => {
    const q = search.toLowerCase();
    const matchSearch = f.name.toLowerCase().includes(q) || f.email.toLowerCase().includes(q) || f.primarySkill.toLowerCase().includes(q);
    const matchBadge = !badgeFilter || f.badge === badgeFilter;
    const matchVis = !visibilityFilter || f.visibility === visibilityFilter;
    const matchRisk = !riskFilter || f.riskFlag === riskFilter;
    return matchSearch && matchBadge && matchVis && matchRisk;
  });

  const badgeStyle = {
    "Elite++": "bg-purple-50 text-purple-700 border border-purple-200",
    "Pro+": "bg-blue-50 text-blue-700 border border-blue-200",
    "Verified": "bg-green-50 text-green-700 border border-green-200",
  };

  const visStyle = {
    Boosted: "bg-green-50 text-green-700",
    Normal: "bg-gray-50 text-gray-600",
    Reduced: "bg-yellow-50 text-yellow-700",
    Hidden: "bg-red-50 text-red-600",
  };

  return (
    <div className="p-6">
      <PageHeader
        title="Freelancers"
        subtitle="Manage & monitor your freelancer workforce quality"
        actions={<ActionBtn label="⬇ Export" />}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Freelancers" value={mockFreelancers.length} color="gray" />
        <StatCard label="Elite++ / Pro+" value={mockFreelancers.filter((f) => f.badge !== "Verified").length} color="green" />
        <StatCard label="High Dispute Rate" value={mockFreelancers.filter((f) => parseInt(f.disputeRate) > 10).length} sub="> 10% disputes" color="orange" />
        <StatCard label="Visibility Reduced" value={mockFreelancers.filter((f) => f.visibility === "Reduced" || f.visibility === "Hidden").length} color="red" />
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, skill, email...">
            <FilterSelect
              value={badgeFilter}
              onChange={setBadgeFilter}
              label="All Badges"
              options={[{ value: "Elite++", label: "Elite++" }, { value: "Pro+", label: "Pro+" }, { value: "Verified", label: "Verified" }]}
            />
            <FilterSelect
              value={visibilityFilter}
              onChange={setVisibilityFilter}
              label="All Visibility"
              options={[{ value: "Boosted", label: "Boosted" }, { value: "Normal", label: "Normal" }, { value: "Reduced", label: "Reduced" }, { value: "Hidden", label: "Hidden" }]}
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

        <Table headers={["Freelancer", "Primary Skill", "Badge", "Skill Score", "Trust", "Active", "Completed", "Dispute%", "On-Time", "Visibility", "Risk", "Actions"]}>
          {filtered.map((f) => (
            <tr
              key={f.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/admin/freelancers/${f.id}`)}
            >
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={f.name} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{f.name}</p>
                    <p className="text-xs text-gray-400">{f.email}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-sm text-gray-600">{f.primarySkill}</td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${badgeStyle[f.badge]}`}>
                  {f.badge}
                </span>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className="h-full bg-green-500 rounded-full" style={{ width: `${f.skillScore}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-700">{f.skillScore}</span>
                </div>
              </td>
              <td className="py-3 pr-4"><TrustScore score={f.trustScore} /></td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{f.activeProjects}</span>
              </td>
              <td className="py-3 pr-4 text-center">
                <span className="text-sm font-semibold text-gray-700">{f.completedProjects}</span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${parseInt(f.disputeRate) > 10 ? "text-red-500" : parseInt(f.disputeRate) > 5 ? "text-yellow-600" : "text-green-600"}`}>
                  {f.disputeRate}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-xs font-semibold ${parseInt(f.onTimeDelivery) >= 90 ? "text-green-600" : parseInt(f.onTimeDelivery) >= 75 ? "text-yellow-600" : "text-red-500"}`}>
                  {f.onTimeDelivery}
                </span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${visStyle[f.visibility]}`}>
                  {f.visibility}
                </span>
              </td>
              <td className="py-3 pr-4"><RiskFlag level={f.riskFlag} /></td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  <ActionBtn label="View" variant="primary" onClick={(e) => { e.stopPropagation(); navigate(`/admin/freelancers/${f.id}`); }} />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 text-sm">No freelancers match your filters</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockFreelancers.length} freelancers</span>
        </div>
      </div>
    </div>
  );
}