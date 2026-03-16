import { useState } from "react";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, Table, SectionCard
} from "./AdminComponents";

const mockPayments = [
  { id: "PAY-001", type: "Escrow Deposit", project: "Food Delivery App", from: "ByteEats Co.", to: "Escrow", amount: 240000, status: "Completed", method: "UPI", date: "Jan 10, 2026", commission: 0, flagged: false },
  { id: "PAY-002", type: "Milestone Release", project: "Food Delivery App", from: "Escrow", to: "TechNova Solutions", amount: 120000, status: "Completed", method: "Bank Transfer", date: "Feb 15, 2026", commission: 7200, flagged: false },
  { id: "PAY-003", type: "Escrow Deposit", project: "Patient Appointment App", from: "HealthFirst Clinic", to: "Escrow", amount: 160000, status: "Completed", method: "Net Banking", date: "Feb 3, 2026", commission: 0, flagged: false },
  { id: "PAY-004", type: "Milestone Release", project: "E-Commerce Revamp", from: "Escrow", to: "Rahul Sharma", amount: 46250, status: "Pending", method: "UPI", date: "Mar 12, 2026", commission: 2775, flagged: true },
  { id: "PAY-005", type: "Refund", project: "Brand Identity Design", from: "Escrow", to: "Meera Joshi", amount: 9000, status: "Completed", method: "UPI", date: "Mar 5, 2026", commission: 0, flagged: false },
  { id: "PAY-006", type: "Withdrawal", project: "—", from: "Arjun Dev Wallet", to: "Bank Account", amount: 85000, status: "Processing", method: "NEFT", date: "Mar 13, 2026", commission: 0, flagged: false },
  { id: "PAY-007", type: "Escrow Deposit", project: "Mobile Banking App", from: "Vikram Singh", to: "Escrow", amount: 140000, status: "Frozen", method: "Net Banking", date: "Nov 15, 2025", commission: 0, flagged: true },
  { id: "PAY-008", type: "Commission", project: "HR Automation Dashboard", from: "Escrow", to: "Weblance Platform", amount: 39000, status: "Completed", method: "Internal", date: "Feb 28, 2026", commission: 0, flagged: false },
];

const typeStyle = {
  "Escrow Deposit": "bg-blue-50 text-blue-700 border border-blue-200",
  "Milestone Release": "bg-green-50 text-green-700 border border-green-200",
  "Refund": "bg-orange-50 text-orange-700 border border-orange-200",
  "Withdrawal": "bg-purple-50 text-purple-700 border border-purple-200",
  "Commission": "bg-gray-50 text-gray-600 border border-gray-200",
};

const statusStyle = {
  Completed: "bg-green-50 text-green-700 border border-green-200",
  Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Frozen: "bg-red-50 text-red-600 border border-red-200",
  Failed: "bg-red-50 text-red-600 border border-red-200",
};

export default function AdminPayments() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const filtered = mockPayments.filter((p) => {
    const q = search.toLowerCase();
    const matchSearch = p.project.toLowerCase().includes(q) || p.from.toLowerCase().includes(q) || p.to.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
    const matchType = !typeFilter || p.type === typeFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchTab = activeTab === "all" || (activeTab === "flagged" && p.flagged) || (activeTab === "frozen" && p.status === "Frozen") || (activeTab === "pending" && (p.status === "Pending" || p.status === "Processing"));
    return matchSearch && matchType && matchStatus && matchTab;
  });

  const totalEscrow = mockPayments.filter(p => p.type === "Escrow Deposit" && p.status !== "Frozen").reduce((s, p) => s + p.amount, 0);
  const totalCommission = mockPayments.filter(p => p.type === "Commission").reduce((s, p) => s + p.amount, 0);
  const totalPending = mockPayments.filter(p => p.status === "Pending" || p.status === "Processing").reduce((s, p) => s + p.amount, 0);
  const totalFrozen = mockPayments.filter(p => p.status === "Frozen").reduce((s, p) => s + p.amount, 0);

  return (
    <div className="p-6">
      <PageHeader
        title="Payments"
        subtitle="Full escrow ledger — every rupee tracked, every move logged"
        actions={<ActionBtn label="⬇ Export Ledger" />}
      />

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Escrow Active" value={`₹${(totalEscrow / 100000).toFixed(1)}L`} color="blue" />
        <StatCard label="Platform Commission" value={`₹${(totalCommission / 1000).toFixed(0)}k`} sub="All time" color="green" />
        <StatCard label="Pending / Processing" value={`₹${(totalPending / 1000).toFixed(0)}k`} color="orange" />
        <StatCard label="Frozen (Disputed)" value={`₹${(totalFrozen / 1000).toFixed(0)}k`} color="red" />
      </div>

      {/* Tabs */}
      <div className="flex gap-1 border-b border-gray-100 mb-4">
        {[
          { key: "all", label: "All Transactions" },
          { key: "pending", label: `Pending / Processing (${mockPayments.filter(p => p.status === "Pending" || p.status === "Processing").length})` },
          { key: "frozen", label: `Frozen (${mockPayments.filter(p => p.status === "Frozen").length})` },
          { key: "flagged", label: `Flagged (${mockPayments.filter(p => p.flagged).length})` },
        ].map((tab) => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search ID, project, name...">
            <FilterSelect value={typeFilter} onChange={setTypeFilter} label="All Types"
              options={[
                { value: "Escrow Deposit", label: "Escrow Deposit" },
                { value: "Milestone Release", label: "Milestone Release" },
                { value: "Refund", label: "Refund" },
                { value: "Withdrawal", label: "Withdrawal" },
                { value: "Commission", label: "Commission" },
              ]} />
            <FilterSelect value={statusFilter} onChange={setStatusFilter} label="All Status"
              options={[
                { value: "Completed", label: "Completed" },
                { value: "Pending", label: "Pending" },
                { value: "Processing", label: "Processing" },
                { value: "Frozen", label: "Frozen" },
              ]} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>

        <Table headers={["Txn ID", "Type", "Project", "From", "To", "Amount", "Commission", "Status", "Method", "Date", "Actions"]}>
          {filtered.map((p) => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-semibold text-gray-500">{p.id}</span>
                  {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeStyle[p.type]}`}>{p.type}</span>
              </td>
              <td className="py-3 pr-4 text-xs text-gray-600 max-w-[120px] truncate">{p.project}</td>
              <td className="py-3 pr-4 text-xs text-gray-600">{p.from}</td>
              <td className="py-3 pr-4 text-xs text-gray-600">{p.to}</td>
              <td className="py-3 pr-4">
                <span className={`text-sm font-bold ${p.type === "Refund" ? "text-orange-500" : p.type === "Commission" ? "text-green-600" : "text-gray-800"}`}>
                  ₹{p.amount.toLocaleString()}
                </span>
              </td>
              <td className="py-3 pr-4 text-xs text-gray-500">
                {p.commission > 0 ? `₹${p.commission.toLocaleString()}` : "—"}
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
              </td>
              <td className="py-3 pr-4 text-xs text-gray-500">{p.method}</td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{p.date}</td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  {p.status === "Frozen" && <ActionBtn label="Unfreeze" variant="warning" />}
                  {p.status === "Pending" && <ActionBtn label="Force Release" variant="primary" />}
                  <ActionBtn label="⋯" />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">No transactions found</p></div>
        )}
        <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockPayments.length} transactions</span>
          <span className="text-xs font-semibold text-gray-600">
            Total shown: ₹{filtered.reduce((s, p) => s + p.amount, 0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}