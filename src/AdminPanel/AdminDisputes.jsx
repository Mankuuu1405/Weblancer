import { useState } from "react";
import {
  StatusBadge, StatCard, Avatar, SearchBar,
  FilterSelect, ActionBtn, PageHeader, Table, SectionCard, InfoRow
} from "./AdminComponents";

const mockDisputes = [
  { id: "DSP-001", project: "E-Commerce Platform Revamp", projectId: "PRJ-003", client: "Vikram Singh", talent: "Rahul Sharma", talentType: "Freelancer", status: "Open", priority: "High", raisedBy: "Client", reason: "Deliverable does not match agreed scope", amountDisputed: 92500, aiVerdict: "Partial fault — Freelancer", aiConfidence: 71, raisedDate: "Mar 10, 2026", lastActivity: "2h ago", evidence: 4, chatSummary: "Client claims backend features were incomplete. Freelancer submitted partial delivery without milestone sign-off. Timeline shows 2 missed deadlines." },
  { id: "DSP-002", project: "Mobile Banking App", projectId: "PRJ-006", client: "Vikram Singh", talent: "TechNova Solutions", talentType: "Agency", status: "Under Review", priority: "High", raisedBy: "Client", reason: "Project abandoned after 50% delivery", amountDisputed: 140000, aiVerdict: "Fault — Agency", aiConfidence: 84, raisedDate: "Mar 8, 2026", lastActivity: "1d ago", evidence: 7, chatSummary: "Agency failed to deliver milestone 3 after 3 deadline extensions. Client funded escrow in full. Admin needs to review agency capacity at time of acceptance." },
  { id: "DSP-003", project: "Patient Appointment App", projectId: "PRJ-002", client: "HealthFirst Clinic", talent: "Arjun Dev", talentType: "Freelancer", status: "Open", priority: "Medium", raisedBy: "Talent", reason: "Client refusing to approve completed milestone", amountDisputed: 80000, aiVerdict: "Partial fault — Client", aiConfidence: 68, raisedDate: "Mar 12, 2026", lastActivity: "5h ago", evidence: 3, chatSummary: "Freelancer submitted milestone 2 on time. Client has been silent for 8 days. AI flagged client for approval delay pattern." },
  { id: "DSP-004", project: "Brand Identity Design", projectId: "PRJ-005", client: "Meera Joshi", talent: "Neha Gupta", talentType: "Freelancer", status: "Resolved", priority: "Low", raisedBy: "Client", reason: "Design not aligned with brief", amountDisputed: 22500, aiVerdict: "Split — 60/40", aiConfidence: 90, raisedDate: "Feb 20, 2026", lastActivity: "10d ago", evidence: 5, chatSummary: "Both parties agreed to partial refund of ₹9,000 after admin mediation. Resolved amicably." },
];

const priorityStyle = {
  High: "bg-red-50 text-red-600 border border-red-200",
  Medium: "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Low: "bg-green-50 text-green-700 border border-green-200",
};

const statusStyle = {
  Open: "bg-red-50 text-red-600 border border-red-200",
  "Under Review": "bg-blue-50 text-blue-700 border border-blue-200",
  Resolved: "bg-green-50 text-green-700 border border-green-200",
  Closed: "bg-gray-50 text-gray-600 border border-gray-200",
};

export default function AdminDisputes() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = mockDisputes.filter((d) => {
    const q = search.toLowerCase();
    const matchSearch = d.project.toLowerCase().includes(q) || d.client.toLowerCase().includes(q) || d.talent.toLowerCase().includes(q) || d.id.toLowerCase().includes(q);
    const matchStatus = !statusFilter || d.status === statusFilter;
    const matchPriority = !priorityFilter || d.priority === priorityFilter;
    return matchSearch && matchStatus && matchPriority;
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Disputes"
        subtitle="AI investigates, admin decides — every dispute tracked"
        actions={<ActionBtn label="⬇ Export" />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Disputes" value={mockDisputes.length} color="gray" />
        <StatCard label="Open" value={mockDisputes.filter(d => d.status === "Open").length} sub="Needs action" color="red" />
        <StatCard label="Under Review" value={mockDisputes.filter(d => d.status === "Under Review").length} color="blue" />
        <StatCard label="Amount Disputed" value={`₹${(mockDisputes.filter(d => d.status !== "Resolved").reduce((s, d) => s + d.amountDisputed, 0) / 1000).toFixed(0)}k`} color="orange" />
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search dispute, project, user...">
            <FilterSelect value={statusFilter} onChange={setStatusFilter} label="All Status"
              options={[{ value: "Open", label: "Open" }, { value: "Under Review", label: "Under Review" }, { value: "Resolved", label: "Resolved" }]} />
            <FilterSelect value={priorityFilter} onChange={setPriorityFilter} label="All Priority"
              options={[{ value: "High", label: "High" }, { value: "Medium", label: "Medium" }, { value: "Low", label: "Low" }]} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>

        <Table headers={["Dispute ID", "Project", "Client", "Talent", "Status", "Priority", "Raised By", "Amount", "AI Verdict", "Confidence", "Evidence", "Last Activity", "Actions"]}>
          {filtered.map((d) => (
            <tr key={d.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group" onClick={() => setSelected(d)}>
              <td className="py-3 pr-4">
                <span className="text-xs font-mono font-semibold text-gray-500">{d.id}</span>
              </td>
              <td className="py-3 pr-4">
                <p className="text-sm font-semibold text-gray-800">{d.project}</p>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <Avatar name={d.client} size="sm" />
                  <span className="text-xs text-gray-600">{d.client}</span>
                </div>
              </td>
              <td className="py-3 pr-4">
                <div>
                  <p className="text-xs text-gray-700">{d.talent}</p>
                  <p className="text-[10px] text-gray-400">{d.talentType}</p>
                </div>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[d.status]}`}>{d.status}</span>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[d.priority]}`}>{d.priority}</span>
              </td>
              <td className="py-3 pr-4 text-xs text-gray-600">{d.raisedBy}</td>
              <td className="py-3 pr-4 text-sm font-semibold text-orange-500">₹{(d.amountDisputed / 1000).toFixed(0)}k</td>
              <td className="py-3 pr-4">
                <p className="text-xs text-gray-700 max-w-[120px] truncate">{d.aiVerdict}</p>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1.5">
                  <div className="w-12 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${d.aiConfidence >= 80 ? "bg-green-500" : d.aiConfidence >= 60 ? "bg-yellow-400" : "bg-red-400"}`}
                      style={{ width: `${d.aiConfidence}%` }} />
                  </div>
                  <span className="text-xs font-semibold text-gray-600">{d.aiConfidence}%</span>
                </div>
              </td>
              <td className="py-3 pr-4 text-center">
                <span className="text-xs font-semibold text-gray-600">{d.evidence} files</span>
              </td>
              <td className="py-3 pr-4 text-xs text-gray-400">{d.lastActivity}</td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                  <ActionBtn label="Review" variant="primary" onClick={(e) => { e.stopPropagation(); setSelected(d); }} />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && (
          <div className="py-16 text-center"><p className="text-gray-400 text-sm">No disputes found</p></div>
        )}
        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockDisputes.length} disputes</span>
        </div>
      </div>

      {/* Dispute Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative w-full max-w-xl bg-white h-full overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="p-5 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="text-base font-bold text-gray-900">{selected.id}</h2>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[selected.status]}`}>{selected.status}</span>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${priorityStyle[selected.priority]}`}>{selected.priority}</span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">{selected.project}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>

            <div className="p-5 space-y-5">
              {/* AI Summary */}
              <div className="p-4 bg-blue-50 rounded-xl border border-blue-100">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-blue-500 font-bold text-sm">◎ AI Analysis</span>
                  <span className="text-xs text-blue-400">Confidence: {selected.aiConfidence}%</span>
                </div>
                <p className="text-sm text-blue-800 leading-relaxed">{selected.chatSummary}</p>
                <div className="mt-3 p-2.5 bg-white rounded-lg border border-blue-200">
                  <p className="text-xs text-gray-500 mb-0.5">AI Verdict</p>
                  <p className="text-sm font-bold text-gray-800">{selected.aiVerdict}</p>
                </div>
              </div>

              {/* Parties */}
              <SectionCard title="Parties Involved">
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-green-50 rounded-lg border border-green-100">
                    <p className="text-[10px] text-gray-400 mb-1">CLIENT</p>
                    <div className="flex items-center gap-2">
                      <Avatar name={selected.client} size="sm" />
                      <p className="text-sm font-semibold text-gray-800">{selected.client}</p>
                    </div>
                  </div>
                  <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="text-[10px] text-gray-400 mb-1">{selected.talentType.toUpperCase()}</p>
                    <div className="flex items-center gap-2">
                      <Avatar name={selected.talent} size="sm" />
                      <p className="text-sm font-semibold text-gray-800">{selected.talent}</p>
                    </div>
                  </div>
                </div>
              </SectionCard>

              {/* Details */}
              <SectionCard title="Dispute Details">
                <InfoRow label="Dispute ID" value={selected.id} />
                <InfoRow label="Raised By" value={selected.raisedBy} />
                <InfoRow label="Reason" value={selected.reason} />
                <InfoRow label="Amount Disputed" value={`₹${selected.amountDisputed.toLocaleString()}`} />
                <InfoRow label="Raised On" value={selected.raisedDate} />
                <InfoRow label="Evidence Files" value={`${selected.evidence} files submitted`} />
              </SectionCard>

              {/* Admin Decision */}
              <SectionCard title="Admin Decision">
                <div className="space-y-2 mb-4">
                  {[
                    { label: `Rule in favor of Client — Full refund (₹${(selected.amountDisputed / 1000).toFixed(0)}k)`, variant: "default" },
                    { label: `Rule in favor of Talent — Full release to talent`, variant: "default" },
                    { label: `Split — Follow AI verdict (${selected.aiVerdict})`, variant: "primary" },
                    { label: "Escalate — Request more evidence", variant: "warning" },
                    { label: "Close dispute — No action", variant: "default" },
                  ].map((a) => (
                    <button key={a.label} className={`w-full text-left px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors ${a.variant === "primary" ? "border-green-400 bg-green-50 text-green-700 hover:bg-green-100" : a.variant === "warning" ? "border-yellow-200 text-yellow-700 bg-yellow-50 hover:bg-yellow-100" : "border-gray-200 text-gray-700 hover:bg-gray-50"}`}>
                      {a.label}
                    </button>
                  ))}
                </div>
                <textarea
                  placeholder="Add decision note (will be sent to both parties)..."
                  className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none"
                  rows={3}
                />
                <ActionBtn label="Confirm Decision" variant="primary" size="md" />
              </SectionCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}