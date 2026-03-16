import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { mockUsers } from "./mockData";
import {
  StatusBadge, TrustScore, RiskFlag, StatCard, Avatar,
  SearchBar, FilterSelect, ActionBtn, PageHeader, Table
} from "./AdminComponents";

export default function AdminUsers() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [riskFilter, setRiskFilter] = useState("");
  const [selected, setSelected] = useState([]);

  const filtered = mockUsers.filter((u) => {
    const q = search.toLowerCase();
    const matchSearch = u.name.toLowerCase().includes(q) || u.email.toLowerCase().includes(q) || u.id.toLowerCase().includes(q);
    const matchRole = !roleFilter || u.role === roleFilter;
    const matchStatus = !statusFilter || u.status === statusFilter;
    const matchRisk = !riskFilter || u.riskLevel === riskFilter;
    return matchSearch && matchRole && matchStatus && matchRisk;
  });

  const stats = {
    total: mockUsers.length,
    active: mockUsers.filter((u) => u.status === "Active").length,
    flagged: mockUsers.filter((u) => u.aiFlag).length,
    suspended: mockUsers.filter((u) => u.status === "Suspended" || u.status === "Banned").length,
  };

  const toggleSelect = (id) =>
    setSelected((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]);

  const toggleAll = () =>
    setSelected(selected.length === filtered.length ? [] : filtered.map((u) => u.id));

  const roleIcon = { Freelancer: "⟡", Agency: "⬡", Client: "◈" };

  return (
    <div className="p-6">
      <PageHeader
        title="All Users"
        subtitle="Every account on the Weblance platform"
        actions={
          <>
            {selected.length > 0 && (
              <div className="flex items-center gap-2 mr-2">
                <span className="text-xs text-gray-500 font-medium">{selected.length} selected</span>
                <ActionBtn label="Warn" variant="warning" />
                <ActionBtn label="Suspend" variant="danger" />
                <ActionBtn label="Export" />
              </div>
            )}
            <ActionBtn label="⬇ Export All" />
          </>
        }
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Users" value={stats.total} color="gray" />
        <StatCard label="Active" value={stats.active} sub={`${Math.round((stats.active / stats.total) * 100)}% of total`} color="green" />
        <StatCard label="AI Flagged" value={stats.flagged} sub="Needs review" color="orange" />
        <StatCard label="Suspended / Banned" value={stats.suspended} color="red" />
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search name, email, ID...">
            <FilterSelect
              value={roleFilter}
              onChange={setRoleFilter}
              label="All Roles"
              options={[{ value: "Freelancer", label: "Freelancer" }, { value: "Agency", label: "Agency" }, { value: "Client", label: "Client" }]}
            />
            <FilterSelect
              value={statusFilter}
              onChange={setStatusFilter}
              label="All Status"
              options={[{ value: "Active", label: "Active" }, { value: "Pending", label: "Pending" }, { value: "Suspended", label: "Suspended" }, { value: "Banned", label: "Banned" }]}
            />
            <FilterSelect
              value={riskFilter}
              onChange={setRiskFilter}
              label="All Risk"
              options={[{ value: "Low", label: "Low Risk" }, { value: "Medium", label: "Medium Risk" }, { value: "High", label: "High Risk" }]}
            />
          </SearchBar>
          <span className="text-xs text-gray-400 font-medium">{filtered.length} results</span>
        </div>

        <Table
          headers={["", "User", "Role", "Status", "Trust Score", "KYC", "Risk", "Last Active", "Joined", "Actions"]}
        >
          <tr>
            <td colSpan={10} className="pb-0 pt-0">
              <div className="flex items-center px-4 py-2 bg-gray-50 border-b border-gray-100">
                <input
                  type="checkbox"
                  checked={selected.length === filtered.length && filtered.length > 0}
                  onChange={toggleAll}
                  className="accent-green-500"
                />
                <span className="text-xs text-gray-400 ml-2">Select all</span>
              </div>
            </td>
          </tr>
          {filtered.map((user) => (
            <tr
              key={user.id}
              className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group cursor-pointer"
              onClick={() => navigate(`/admin/users/${user.id}`)}
            >
              <td className="py-3 pr-4 pl-4" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={selected.includes(user.id)}
                  onChange={() => toggleSelect(user.id)}
                  className="accent-green-500"
                />
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2.5">
                  <Avatar name={user.name} size="sm" />
                  <div>
                    <div className="flex items-center gap-1.5">
                      <span className="text-sm font-semibold text-gray-800">{user.name}</span>
                      {user.aiFlag && (
                        <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">AI⚑</span>
                      )}
                    </div>
                    <span className="text-xs text-gray-400">{user.email}</span>
                    <span className="text-[10px] text-gray-300 block">{user.id}</span>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className="flex items-center gap-1.5 text-sm text-gray-600">
                  <span className="text-base">{roleIcon[user.role]}</span>
                  {user.role}
                </span>
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={user.status} />
              </td>
              <td className="py-3 pr-4">
                <TrustScore score={user.trustScore} />
              </td>
              <td className="py-3 pr-4">
                <StatusBadge status={user.verification} />
              </td>
              <td className="py-3 pr-4">
                <RiskFlag level={user.riskLevel} />
              </td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{user.lastActive}</td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{user.joinDate}</td>
              <td className="py-3">
                <div className="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ActionBtn
                    label="View"
                    variant="primary"
                    onClick={(e) => { e.stopPropagation(); navigate(`/admin/users/${user.id}`); }}
                  />
                  <ActionBtn
                    label="⋯"
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center mb-3">
              <span className="text-gray-400 text-xl">◎</span>
            </div>
            <p className="text-gray-500 text-sm">No users match your filters</p>
          </div>
        )}

        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockUsers.length} users</span>
          <div className="flex items-center gap-1">
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">← Prev</button>
            <button className="px-3 py-1.5 text-xs rounded-lg border border-gray-200 text-gray-600 hover:bg-gray-50">Next →</button>
          </div>
        </div>
      </div>
    </div>
  );
}