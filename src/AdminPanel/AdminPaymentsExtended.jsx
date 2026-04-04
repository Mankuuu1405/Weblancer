import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, Table, SectionCard, InfoRow
} from "./AdminComponents";

  /* ── Freelancer Contracts theme tokens ───────────────────────
   GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
   NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
   ──────────────────────────────────────────────────────────── */
const G = {
  greenLight:  "#A8E063",
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",

  navyLight:   "#4A6FA5",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  navyBg:      "#e8edf7",
  navyBorder:  "#b8c6e0",

  gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
  gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

  text:        "#1C1C1C",
  sub:         "#4b5563",
  muted:       "#9ca3af",
  border:      "#e5e7eb",
  bg:          "#f9fafb",
  white:       "#ffffff",

  amber:       "#f59e0b",
  amberBg:     "#fffbeb",
  amberBorder: "#fde68a",
  amberText:   "#92400e",
  red:         "#ef4444",
  redBg:       "#fef2f2",
  redBorder:   "#fecaca",
  redText:     "#dc2626",
  blue:        "#3b82f6",
  blueBg:      "#eff6ff",
  blueBorder:  "#bfdbfe",
  blueText:    "#1d4ed8",
  purple:      "#8b5cf6",
  purpleBg:    "#f5f3ff",
  purpleBorder:"#ddd6fe",
  purpleText:  "#6d28d9",
};
const FONT = "'Poppins', sans-serif";

  const btnNavy = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.gradNavy, color: G.white,
  border: "none", borderRadius: 100,
  padding: "8px 18px", cursor: "pointer",
  boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
  whiteSpace: "nowrap",
};

const btnOutline = {
  display: "inline-flex", alignItems: "center", gap: 6,
  fontSize: 12, fontWeight: 700, fontFamily: FONT,
  background: G.greenBg, color: G.greenDeep,
  border: `1px solid ${G.greenBorder}`,
  borderRadius: 100, padding: "8px 18px", cursor: "pointer",
  whiteSpace: "nowrap",
};

const btnDanger = {
  ...btnOutline,
  background: G.redBg, color: G.redText, border: `1px solid ${G.redBorder}`,
};

// ─── MOCK DATA ────────────────────────────────────────────────────────────────
const mockEscrow = [
  { id:"ESC-001", project:"Food Delivery App",         projectId:"PRJ-001", client:"ByteEats Co.",     talent:"TechNova Solutions", talentType:"Agency",     status:"Active",   totalAmount:480000, locked:240000, released:120000, remaining:120000, milestones:4, completedMilestones:2, deadline:"Jun 1, 2026",  riskLevel:"Low",    disputed:false },
  { id:"ESC-002", project:"Patient Appointment App",   projectId:"PRJ-002", client:"HealthFirst Clinic",talent:"Arjun Dev",          talentType:"Freelancer", status:"Active",   totalAmount:320000, locked:160000, released:48000,  remaining:272000, milestones:3, completedMilestones:1, deadline:"Apr 25, 2026", riskLevel:"Medium", disputed:false },
  { id:"ESC-003", project:"E-Commerce Revamp",         projectId:"PRJ-003", client:"ShopEasy Retail",   talent:"Rahul Sharma",       talentType:"Freelancer", status:"At Risk",  totalAmount:185000, locked:92500,  released:55500,  remaining:129500, milestones:3, completedMilestones:1, deadline:"Apr 10, 2026", riskLevel:"High",   disputed:false },
  { id:"ESC-004", project:"Mobile Banking App",        projectId:"PRJ-006", client:"Vikram Singh",      talent:"TechNova Solutions", talentType:"Agency",     status:"Frozen",   totalAmount:280000, locked:140000, released:84000,  remaining:196000, milestones:4, completedMilestones:2, deadline:"Apr 5, 2026",  riskLevel:"High",   disputed:true  },
  { id:"ESC-005", project:"Brand Identity Design",     projectId:"PRJ-005", client:"Meera Joshi",       talent:"Neha Gupta",         talentType:"Freelancer", status:"Pending",  totalAmount:45000,  locked:0,      released:0,      remaining:45000,  milestones:2, completedMilestones:0, deadline:"Apr 20, 2026", riskLevel:"Low",    disputed:false },
  { id:"ESC-006", project:"HR Automation Dashboard",   projectId:"PRJ-004", client:"ByteEats Co.",      talent:"BuildRight Agency",  talentType:"Agency",     status:"Completed",totalAmount:650000, locked:0,      released:650000, remaining:0,      milestones:5, completedMilestones:5, deadline:"Feb 28, 2026", riskLevel:"Low",    disputed:false },
  { id:"ESC-007", project:"Logistics Tracking System", projectId:"PRJ-007", client:"Sneha Kapoor",      talent:"BuildRight Agency",  talentType:"Agency",     status:"Completed",totalAmount:390000, locked:0,      released:390000, remaining:0,      milestones:4, completedMilestones:4, deadline:"Jan 30, 2026", riskLevel:"Low",    disputed:false },
];

const mockPayouts = [
  { id:"PO-001", talent:"Arjun Dev",          talentId:"FL-002", talentType:"Freelancer", amount:85000,  status:"Pending",    method:"NEFT",          bank:"HDFC Bank ****4521", requestedDate:"Mar 13, 2026", processedDate:null,           kycStatus:"Verified",   taxStatus:"Filed",   project:"Patient Appointment App", notes:"Standard withdrawal",          flagged:false },
  { id:"PO-002", talent:"TechNova Solutions",  talentId:"AG-001", talentType:"Agency",     amount:120000, status:"Processing", method:"NEFT",          bank:"ICICI Bank ****8834", requestedDate:"Mar 12, 2026", processedDate:null,           kycStatus:"Verified",   taxStatus:"Filed",   project:"Food Delivery App",       notes:"Milestone 1 release",          flagged:false },
  { id:"PO-003", talent:"Rahul Sharma",        talentId:"FL-001", talentType:"Freelancer", amount:55500,  status:"Pending",    method:"UPI",           bank:"rahul@upi",           requestedDate:"Mar 11, 2026", processedDate:null,           kycStatus:"Verified",   taxStatus:"Filed",   project:"E-Commerce Revamp",       notes:"Milestone 1 payment",          flagged:true  },
  { id:"PO-004", talent:"BuildRight Agency",   talentId:"AG-002", talentType:"Agency",     amount:340000, status:"Completed",  method:"NEFT",          bank:"Axis Bank ****2267",  requestedDate:"Feb 26, 2026", processedDate:"Feb 28, 2026", kycStatus:"Verified",   taxStatus:"Filed",   project:"HR Automation Dashboard", notes:"Final project payment",         flagged:false },
  { id:"PO-005", talent:"Neha Gupta",          talentId:"FL-005", talentType:"Freelancer", amount:29000,  status:"On Hold",    method:"UPI",           bank:"neha@upi",            requestedDate:"Mar 5, 2026",  processedDate:null,           kycStatus:"Verified",   taxStatus:"Pending", project:"Brand Identity Design",   notes:"Tax documents pending",        flagged:false },
  { id:"PO-006", talent:"Karan Malhotra",      talentId:"FL-003", talentType:"Freelancer", amount:42000,  status:"Completed",  method:"NEFT",          bank:"SBI Bank ****9921",   requestedDate:"Mar 1, 2026",  processedDate:"Mar 3, 2026",  kycStatus:"Verified",   taxStatus:"Filed",   project:"Mobile App Project",      notes:"Regular withdrawal",           flagged:false },
  { id:"PO-007", talent:"Priya Menon",         talentId:"FL-004", talentType:"Freelancer", amount:32000,  status:"Rejected",   method:"UPI",           bank:"priya@upi",           requestedDate:"Feb 20, 2026", processedDate:"Feb 22, 2026", kycStatus:"Verified",   taxStatus:"Filed",   project:"Various",                 notes:"Account suspended — rejected", flagged:true  },
];

const mockRefunds = [
  { id:"REF-001", client:"Vikram Singh",     clientId:"CL-002", project:"Mobile Banking App",        projectId:"PRJ-006", amount:84000,  status:"Pending",   reason:"Deliverable incomplete — milestone 3 not finished", disputeId:"DSP-002", requestedDate:"Mar 8, 2026",  processedDate:null,           aiRecommendation:"Partial refund — 60%", escrowAvailable:140000, flagged:true  },
  { id:"REF-002", client:"Meera Joshi",      clientId:"CL-003", project:"Brand Identity Design",     projectId:"PRJ-005", amount:9000,   status:"Approved",  reason:"Design not matching initial brief — resolved amicably", disputeId:"DSP-004", requestedDate:"Feb 20, 2026", processedDate:"Mar 5, 2026",  aiRecommendation:"Partial refund — 30%", escrowAvailable:0,      flagged:false },
  { id:"REF-003", client:"HealthFirst Clinic",clientId:"CL-001", project:"Patient Appointment App",   projectId:"PRJ-002", amount:48000,  status:"Pending",   reason:"Scope change led to unmet expectations on milestone 1", disputeId:null,      requestedDate:"Mar 10, 2026", processedDate:null,           aiRecommendation:"Reject — work delivered", escrowAvailable:160000, flagged:false },
  { id:"REF-004", client:"ShopEasy Retail",   clientId:"CL-002", project:"E-Commerce Revamp",         projectId:"PRJ-003", amount:92500,  status:"Under Review", reason:"Multiple deadline misses — client requesting full refund", disputeId:null,   requestedDate:"Mar 12, 2026", processedDate:null,           aiRecommendation:"Partial refund — 40%", escrowAvailable:92500,  flagged:true  },
  { id:"REF-005", client:"ByteEats Co.",      clientId:"CL-004", project:"Food Delivery App",         projectId:"PRJ-001", amount:15000,  status:"Rejected",  reason:"Requested refund after approving milestone — invalid", disputeId:null,      requestedDate:"Feb 10, 2026", processedDate:"Feb 12, 2026", aiRecommendation:"Reject — approved delivery", escrowAvailable:0, flagged:false },
];

const mockCommission = {
  totalLifetime: 121000,
  thisMonth: 28800,
  lastMonth: 39000,
  thisYear: 121000,
  rate: 6,
  byProject: [
    { project:"HR Automation Dashboard", client:"ByteEats Co.",      amount:39000, date:"Feb 28, 2026", status:"Collected" },
    { project:"Food Delivery App",       client:"ByteEats Co.",      amount:28800, date:"Mar (ongoing)", status:"Pending"   },
    { project:"Patient Appointment App", client:"HealthFirst Clinic", amount:19200, date:"Apr (ongoing)", status:"Pending"   },
    { project:"E-Commerce Revamp",       client:"ShopEasy Retail",   amount:11100, date:"Apr (ongoing)", status:"Pending"   },
    { project:"Logistics Tracking",      client:"Sneha Kapoor",      amount:23400, date:"Jan 30, 2026",  status:"Collected" },
    { project:"Mobile Banking App",      client:"Vikram Singh",       amount:16800, date:"Frozen",        status:"Frozen"    },
  ],
  monthly: [
    { month:"Oct 2025", amount:12000 }, { month:"Nov 2025", amount:18000 },
    { month:"Dec 2025", amount:15000 }, { month:"Jan 2026", amount:23400 },
    { month:"Feb 2026", amount:39000 }, { month:"Mar 2026", amount:28800 },
  ],
};

// ─── STYLE MAPS ───────────────────────────────────────────────────────────────
const escrowStatusStyle = {
  Active:    "bg-green-50 text-green-700 border border-green-200",
  Frozen:    "bg-red-50 text-red-600 border border-red-200",
  "At Risk": "bg-orange-50 text-orange-700 border border-orange-200",
  Pending:   "bg-blue-50 text-blue-700 border border-blue-200",
  Completed: "bg-gray-50 text-gray-500 border border-gray-200",
};

const payoutStatusStyle = {
  Pending:    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Completed:  "bg-green-50 text-green-700 border border-green-200",
  "On Hold":  "bg-orange-50 text-orange-700 border border-orange-200",
  Rejected:   "bg-red-50 text-red-600 border border-red-200",
};

const refundStatusStyle = {
  Pending:       "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Approved:      "bg-green-50 text-green-700 border border-green-200",
  Rejected:      "bg-red-50 text-red-600 border border-red-200",
  "Under Review":"bg-blue-50 text-blue-700 border border-blue-200",
};

// ─── PAGE 1: /admin/escrow ────────────────────────────────────────────────────
export function AdminEscrow() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = mockEscrow.filter(e => {
    const q = search.toLowerCase();
    return (
      (e.project.toLowerCase().includes(q) || e.client.toLowerCase().includes(q) || e.talent.toLowerCase().includes(q)) &&
      (!statusFilter || e.status === statusFilter)
    );
  });

  const totalLocked   = mockEscrow.reduce((s, e) => s + e.locked, 0);
  const totalReleased = mockEscrow.reduce((s, e) => s + e.released, 0);
  const frozen        = mockEscrow.filter(e => e.status === "Frozen");



  return (
    <div className="p-6">
      <PageHeader
        title="Escrow Status"
        subtitle="Full visibility into every locked, released & frozen escrow"
        actions={<ActionBtn label="⬇ Export" style={btnNavy}/>}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Locked"    value={`₹${(totalLocked/100000).toFixed(1)}L`}   sub="Currently held " border="orange"       color="orange" bg="orange"/>
        <StatCard label="Total Released"  value={`₹${(totalReleased/100000).toFixed(1)}L`} sub="Paid to talents"      color="green" border="green" bg="green" />
        <StatCard label="Frozen"          value={frozen.length}                              sub="Disputed projects"    color="red" border="red" bg="red"  />
        <StatCard label="Active Escrows"  value={mockEscrow.filter(e=>e.status==="Active").length} color="blue" border="blue" bg="blue"/>
      </div>

      {/* Frozen alert */}
      {frozen.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-5 flex items-start gap-3">
          <span className="text-red-500 text-lg shrink-0">⚑</span>
          <div>
            <p className="text-sm font-bold text-red-800">
              {frozen.length} escrow{frozen.length > 1 ? "s" : ""} frozen — dispute resolution pending
            </p>
            <p className="text-xs text-red-600 mt-0.5">
              ₹{frozen.reduce((s, e) => s + e.locked, 0).toLocaleString()} locked. Resolve disputes to release.
            </p>
          </div>
          <ActionBtn label="View Disputes" variant="danger" onClick={() => navigate("/admin/disputes")} />
        </div>
      )}

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search project, client, talent...">
            <FilterSelect value={statusFilter} onChange={setStatus} label="All Status"
              options={["Active","Frozen","At Risk","Pending","Completed"].map(v=>({value:v,label:v}))} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} escrows</span>
        </div>

        <Table headers={["Project","Client","Talent","Status","Total","Locked","Released","Milestones","Deadline","Actions"]}>
          {filtered.map(e => (
            <tr key={e.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => setSelected(selected?.id === e.id ? null : e)}>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1.5">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{e.project}</p>
                    <p className="text-[10px] text-gray-300">{e.id}</p>
                  </div>
                  {e.disputed && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold shrink-0">⚑</span>}
                </div>
              </td>
              <td className="py-3 pr-4 text-sm text-gray-600">{e.client}</td>
              <td className="py-3 pr-4">
                <p className="text-sm text-gray-700">{e.talent}</p>
                <p className="text-[10px] text-gray-400">{e.talentType}</p>
              </td>
              <td className="py-3 pr-4">
                <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${escrowStatusStyle[e.status]}`}>{e.status}</span>
              </td>
              <td className="py-3 pr-4 text-sm font-semibold text-gray-700">₹{(e.totalAmount/1000).toFixed(0)}k</td>
              <td className="py-3 pr-4">
                {e.locked > 0
                  ? <span className="text-sm font-semibold text-orange-500">₹{(e.locked/1000).toFixed(0)}k</span>
                  : <span className="text-xs text-gray-300">—</span>}
              </td>
              <td className="py-3 pr-4">
                {e.released > 0
                  ? <span className="text-sm font-semibold text-green-600">₹{(e.released/1000).toFixed(0)}k</span>
                  : <span className="text-xs text-gray-300">—</span>}
              </td>
              <td className="py-3 pr-4 text-xs text-gray-600 text-center">{e.completedMilestones}/{e.milestones}</td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{e.deadline}</td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  {e.status === "Frozen" && <ActionBtn label="Unfreeze" variant="warning" style={btnOutline} onClick={e2=>{e2.stopPropagation();}} />}
                  {e.status === "Active" && <ActionBtn label="Release" variant="primary" style={btnNavy} onClick={e2=>{e2.stopPropagation();}} />}
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && <div className="py-16 text-center"><p className="text-gray-400 text-sm">No escrows found</p></div>}
        <div className="px-4 py-3 border-t border-gray-100 flex justify-between items-center">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockEscrow.length} escrows</span>
          <span className="text-xs font-semibold text-gray-600">
            Total locked: ₹{totalLocked.toLocaleString()}
          </span>
        </div>
      </div>

      {/* Detail drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end" onClick={() => setSelected(null)}>
          <div className="absolute inset-0 bg-black/20" />
          <div className="relative w-full max-w-md bg-white h-full overflow-y-auto shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between sticky top-0 bg-white z-10">
              <div>
                <h2 className="text-base font-bold text-gray-900">{selected.project}</h2>
                <p className="text-xs text-gray-400">{selected.id}</p>
              </div>
              <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600 text-lg">✕</button>
            </div>
            <div className="p-5 space-y-5">
              <div className="grid grid-cols-2 gap-3">
                {[
                  { label:"Total Budget",  value:`₹${selected.totalAmount.toLocaleString()}`, color:"text-gray-800" },
                  { label:"Locked",        value:selected.locked>0?`₹${selected.locked.toLocaleString()}`:"—", color:"text-orange-500" },
                  { label:"Released",      value:selected.released>0?`₹${selected.released.toLocaleString()}`:"—", color:"text-green-600" },
                  { label:"Remaining",     value:selected.remaining>0?`₹${selected.remaining.toLocaleString()}`:"—", color:"text-blue-600" },
                ].map(s => (
                  <div key={s.label} className="bg-gray-50 rounded-xl p-3 text-center">
                    <p className="text-[10px] text-gray-400 mb-0.5">{s.label}</p>
                    <p className={`text-base font-bold ${s.color}`}>{s.value}</p>
                  </div>
                ))}
              </div>
              <SectionCard title="Details">
                <InfoRow label="Client"     value={selected.client} />
                <InfoRow label="Talent"     value={`${selected.talent} (${selected.talentType})`} />
                <InfoRow label="Status"     value={<span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${escrowStatusStyle[selected.status]}`}>{selected.status}</span>} />
                <InfoRow label="Milestones" value={`${selected.completedMilestones}/${selected.milestones} completed`} />
                <InfoRow label="Deadline"   value={selected.deadline} />
                <InfoRow label="Risk"       value={selected.riskLevel} />
                <InfoRow label="Disputed"   value={selected.disputed ? <span className="text-red-500 font-semibold text-xs">Yes — active dispute</span> : <span className="text-green-600 font-semibold text-xs">No</span>} />
              </SectionCard>
              <SectionCard title="Admin Actions">
                <div className="space-y-2">
                  {selected.status === "Frozen" && <ActionBtn label="Unfreeze Escrow" variant="warning" size="md" style={btnDanger}/>}
                  {selected.status === "Active" && <ActionBtn label="Force Release Next Milestone" variant="primary" size="md" style={btnNavy} />}
                  {selected.status !== "Completed" && <ActionBtn label="Freeze Escrow" variant="danger" size="md" style={btnDanger} />}
                  <ActionBtn label="View Project" size="md" style={btnOutline} onClick={() => navigate(`/admin/projects/${selected.projectId}`)} />
                </div>
              </SectionCard>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ─── PAGE 2: /admin/payouts ───────────────────────────────────────────────────
export function AdminPayouts() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [activeTab, setActiveTab] = useState("all");

  const tabFiltered = mockPayouts.filter(p => {
    if (activeTab === "pending")    return p.status === "Pending" || p.status === "Processing";
    if (activeTab === "hold")       return p.status === "On Hold";
    if (activeTab === "completed")  return p.status === "Completed";
    if (activeTab === "flagged")    return p.flagged;
    return true;
  });

  const filtered = tabFiltered.filter(p => {
    const q = search.toLowerCase();
    return (
      (p.talent.toLowerCase().includes(q) || p.id.toLowerCase().includes(q) || p.project.toLowerCase().includes(q)) &&
      (!statusFilter || p.status === statusFilter)
    );
  });

  const pendingAmount = mockPayouts.filter(p => p.status === "Pending" || p.status === "Processing").reduce((s, p) => s + p.amount, 0);


  return (
    <div className="p-6">
      <PageHeader
        title="Payout Requests"
        subtitle="Manage withdrawal requests from freelancers & agencies"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="⬇ Export" style={btnNavy} />
            <ActionBtn label="Approve All Pending" variant="primary" size="md" style={btnOutline} />
          </div>
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Pending / Processing" value={mockPayouts.filter(p=>p.status==="Pending"||p.status==="Processing").length} sub={`₹${(pendingAmount/1000).toFixed(0)}k total`} color="orange" bg="orange" border="orange" />
        <StatCard label="On Hold"    value={mockPayouts.filter(p=>p.status==="On Hold").length}   sub="Tax / KYC issue" color="yellow"  />
        <StatCard label="Completed"  value={mockPayouts.filter(p=>p.status==="Completed").length} color="green" border="green" bg="green" />
        <StatCard label="Flagged"    value={mockPayouts.filter(p=>p.flagged).length}               sub="Needs review"   color="red" border="red" bg="red"    />
      </div>

      <div className="flex gap-1 border-b border-gray-100 mb-4">
        {[
          { key:"all",       label:`All (${mockPayouts.length})` },
          { key:"pending",   label:`Pending (${mockPayouts.filter(p=>p.status==="Pending"||p.status==="Processing").length})` },
          { key:"hold",      label:`On Hold (${mockPayouts.filter(p=>p.status==="On Hold").length})` },
          { key:"completed", label:`Completed (${mockPayouts.filter(p=>p.status==="Completed").length})` },
          { key:"flagged",   label:`Flagged (${mockPayouts.filter(p=>p.flagged).length})` },
        ].map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab===tab.key?"text-green-600 border-b-2 border-green-500 -mb-px":"text-gray-500 hover:text-gray-700"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
          <SearchBar value={search} onChange={setSearch} placeholder="Search talent, project, payout ID...">
            <FilterSelect value={statusFilter} onChange={setStatus} label="All Status"
              options={["Pending","Processing","Completed","On Hold","Rejected"].map(v=>({value:v,label:v}))} />
          </SearchBar>
          <span className="text-xs text-gray-400">{filtered.length} results</span>
        </div>

        <Table headers={["Payout ID","Talent","Amount","Status","Method","Bank","Project","KYC","Tax","Requested","Actions"]}>
          {filtered.map(p => (
            <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
              onClick={() => navigate(`/admin/payouts/${p.id}`)}>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-mono font-semibold text-gray-500">{p.id}</span>
                  {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
                </div>
              </td>
              <td className="py-3 pr-4">
                <div className="flex items-center gap-2">
                  <Avatar name={p.talent} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{p.talent}</p>
                    <p className="text-[10px] text-gray-400">{p.talentType}</p>
                  </div>
                </div>
              </td>
              <td className="py-3 pr-4 text-sm font-bold text-gray-800">₹{p.amount.toLocaleString()}</td>
              <td className="py-3 pr-4"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${payoutStatusStyle[p.status]}`}>{p.status}</span></td>
              <td className="py-3 pr-4 text-xs text-gray-600">{p.method}</td>
              <td className="py-3 pr-4 text-xs text-gray-500">{p.bank}</td>
              <td className="py-3 pr-4 text-xs text-gray-600 max-w-[120px] truncate">{p.project}</td>
              <td className="py-3 pr-4"><span className={`text-[11px] font-semibold ${p.kycStatus==="Verified"?"text-green-600":"text-red-500"}`}>{p.kycStatus}</span></td>
              <td className="py-3 pr-4"><span className={`text-[11px] font-semibold ${p.taxStatus==="Filed"?"text-green-600":"text-orange-500"}`}>{p.taxStatus}</span></td>
              <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{p.requestedDate}</td>
              <td className="py-3">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                  {(p.status==="Pending"||p.status==="Processing") && <ActionBtn label="Approve" variant="primary" style={btnNavy} onClick={e=>{e.stopPropagation();}} />}
                  <ActionBtn label="View" style={btnOutline} onClick={e=>{e.stopPropagation();navigate(`/admin/payouts/${p.id}`);}} />
                </div>
              </td>
            </tr>
          ))}
        </Table>

        {filtered.length === 0 && <div className="py-16 text-center"><p className="text-gray-400 text-sm">No payouts found</p></div>}
        <div className="px-4 py-3 border-t border-gray-100">
          <span className="text-xs text-gray-400">Showing {filtered.length} of {mockPayouts.length} payouts</span>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 3: /admin/payouts/:id ───────────────────────────────────────────────
export function AdminPayoutDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState("");
  const [notes, setNotes] = useState([]);

  const p = mockPayouts.find(x => x.id === id);

  if (!p) return (
    <div className="p-6 text-center py-24 space-y-3">
      <p className="text-gray-400">Payout not found</p>
      <ActionBtn label="← Back to Payouts" onClick={() => navigate("/admin/payouts")} size="md" />
    </div>
  );

  return (
    <div className="p-6">
      <button onClick={() => navigate("/admin/payouts")} className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 mb-5">
        ← All Payouts
      </button>

      <div className="flex items-start justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar name={p.talent} size="lg" />
          <div>
            <div className="flex items-center gap-2.5 flex-wrap mb-1">
              <h1 className="text-xl font-bold text-gray-900">{p.talent}</h1>
              <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${payoutStatusStyle[p.status]}`}>{p.status}</span>
              {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-2 py-0.5 rounded-full font-semibold">⚑ Flagged</span>}
            </div>
            <p className="text-sm text-gray-500">{p.id} · {p.talentType} · {p.method}</p>
          </div>
        </div>
        <div className="text-right">
          <p className="text-3xl font-black text-gray-900">₹{p.amount.toLocaleString()}</p>
          <p className="text-xs text-gray-400 mt-0.5">Payout amount</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 space-y-5">
          <SectionCard title="Payout Details">
            <InfoRow label="Payout ID"       value={p.id} />
            <InfoRow label="Talent"          value={p.talent} />
            <InfoRow label="Type"            value={p.talentType} />
            <InfoRow label="Amount"          value={`₹${p.amount.toLocaleString()}`} />
            <InfoRow label="Method"          value={p.method} />
            <InfoRow label="Bank / UPI"      value={p.bank} />
            <InfoRow label="Project"         value={p.project} />
            <InfoRow label="Requested"       value={p.requestedDate} />
            <InfoRow label="Processed"       value={p.processedDate || "Not yet"} />
            <InfoRow label="Notes"           value={p.notes} />
          </SectionCard>

          <SectionCard title="Compliance Check">
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:"KYC Status",    value:p.kycStatus,   ok:p.kycStatus==="Verified"  },
                { label:"Tax Status",    value:p.taxStatus,   ok:p.taxStatus==="Filed"      },
                { label:"Account Status",value:"Active",      ok:true                       },
                { label:"Flagged",       value:p.flagged?"Yes":"No", ok:!p.flagged          },
              ].map(c => (
                <div key={c.label} className={`p-3 rounded-xl border flex items-center justify-between ${c.ok?"bg-green-50 border-green-100":"bg-red-50 border-red-100"}`}>
                  <p className="text-xs text-gray-500">{c.label}</p>
                  <span className={`text-xs font-bold ${c.ok?"text-green-600":"text-red-500"}`}>
                    {c.ok ? "✓ " : "⚠ "}{c.value}
                  </span>
                </div>
              ))}
            </div>
          </SectionCard>
        </div>

        <div className="space-y-5">
          <SectionCard title="Admin Decision">
            <div className="space-y-2 mb-4">
              {[
                { label:"✓ Approve & Process",  variant:"primary",  disabled: p.status==="Completed" || p.status==="Rejected" },
                { label:"⏸ Put on Hold",        variant:"warning",  disabled: p.status==="Completed" || p.status==="Rejected" },
                { label:"✕ Reject Payout",      variant:"danger",   disabled: p.status==="Completed" || p.status==="Rejected" },
              ].map(a => (
                <button key={a.label} disabled={a.disabled}
                  className={`w-full px-3 py-2.5 rounded-lg text-sm font-medium border transition-colors text-left ${
                    a.variant==="primary" ? "border-green-300 bg-green-50 text-green-700 hover:bg-green-100" :
                    a.variant==="warning" ? "border-yellow-200 bg-yellow-50 text-yellow-700 hover:bg-yellow-100" :
                    "border-red-200 bg-red-50 text-red-600 hover:bg-red-100"
                  } disabled:opacity-40 disabled:cursor-not-allowed`}>
                  {a.label}
                </button>
              ))}
            </div>
            {p.status === "Completed" && (
              <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                <p className="text-xs font-semibold text-green-700">✓ Payout completed</p>
                <p className="text-[10px] text-green-600 mt-0.5">Processed on {p.processedDate}</p>
              </div>
            )}
          </SectionCard>

          <SectionCard title="Admin Notes">
            <div className="space-y-2 mb-3">
              {notes.length === 0 && <p className="text-xs text-gray-400 text-center py-2">No notes yet</p>}
              {notes.map((n, i) => (
                <div key={i} className="p-2.5 bg-gray-50 rounded-lg border border-gray-100">
                  <p className="text-xs text-gray-700">{n}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">Super Admin · Mar 14, 2026</p>
                </div>
              ))}
            </div>
            <textarea value={note} onChange={e => setNote(e.target.value)}
              placeholder="Add internal note..."
              className="w-full text-xs border border-gray-200 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-green-500 resize-none placeholder-gray-400"
              rows={3} />
            <ActionBtn label="Save Note" variant="primary" onClick={() => { if(note.trim()){ setNotes([...notes, note]); setNote(""); }}} />
          </SectionCard>
        </div>
      </div>
    </div>
  );
}

// ─── PAGE 4: /admin/refunds ───────────────────────────────────────────────────
export function AdminRefunds() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatus] = useState("");
  const [selected, setSelected] = useState(null);

  const filtered = mockRefunds.filter(r => {
    const q = search.toLowerCase();
    return (
      (r.client.toLowerCase().includes(q) || r.project.toLowerCase().includes(q) || r.id.toLowerCase().includes(q)) &&
      (!statusFilter || r.status === statusFilter)
    );
  });

  return (
    <div className="p-6">
      <PageHeader
        title="Refund Requests"
        subtitle="Review & process client refund requests"
        actions={<ActionBtn label="⬇ Export" style={btnNavy} />}
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Total Requests" value={mockRefunds.length}                                              color="gray"  border="gray" bg="gray" />
        <StatCard label="Pending"        value={mockRefunds.filter(r=>r.status==="Pending"||r.status==="Under Review").length} sub={`₹${(mockRefunds.filter(r=>r.status==="Pending"||r.status==="Under Review").reduce((s,r)=>s+r.amount,0)/1000).toFixed(0)}k at stake`} color="orange" bg="orange" border="orange" />
        <StatCard label="Approved"       value={mockRefunds.filter(r=>r.status==="Approved").length}             color="green" border="green" bg="green"  />
        <StatCard label="Rejected"       value={mockRefunds.filter(r=>r.status==="Rejected").length}             color="red" border="red" bg="red"   />
      </div>

      <div className="flex gap-5">
        <div className="flex-1 min-w-0">
          <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between">
              <SearchBar value={search} onChange={setSearch} placeholder="Search client, project, refund ID...">
                <FilterSelect value={statusFilter} onChange={setStatus} label="All Status"
                  options={["Pending","Under Review","Approved","Rejected"].map(v=>({value:v,label:v}))} />
              </SearchBar>
              <span className="text-xs text-gray-400">{filtered.length} results</span>
            </div>

            <Table headers={["Refund ID","Client","Project","Amount","Status","AI Rec.","Dispute","Requested","Actions"]}>
              {filtered.map(r => (
                <tr key={r.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors cursor-pointer group"
                  onClick={() => setSelected(selected?.id === r.id ? null : r)}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-1.5">
                      <span className="text-xs font-mono font-semibold text-gray-500">{r.id}</span>
                      {r.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <Avatar name={r.client} size="sm" />
                      <span className="text-sm text-gray-700">{r.client}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-600 max-w-[140px] truncate">{r.project}</td>
                  <td className="py-3 pr-4 text-sm font-bold text-orange-500">₹{r.amount.toLocaleString()}</td>
                  <td className="py-3 pr-4"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${refundStatusStyle[r.status]}`}>{r.status}</span></td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs font-semibold ${r.aiRecommendation.includes("Reject")?"text-red-500":r.aiRecommendation.includes("Partial")?"text-yellow-600":"text-green-600"}`}>
                      {r.aiRecommendation}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-500">
                    {r.disputeId
                      ? <span className="text-blue-600 hover:underline cursor-pointer" onClick={e=>{e.stopPropagation();navigate("/admin/disputes");}}>{r.disputeId}</span>
                      : <span className="text-gray-300">—</span>}
                  </td>
                  <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{r.requestedDate}</td>
                  <td className="py-3">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                      <ActionBtn label="Review" variant="primary" style={btnNavy} onClick={e=>{e.stopPropagation();setSelected(r);}} />
                    </div>
                  </td>
                </tr>
              ))}
            </Table>
            {filtered.length === 0 && <div className="py-16 text-center"><p className="text-gray-400 text-sm">No refund requests found</p></div>}
            <div className="px-4 py-3 border-t border-gray-100"><span className="text-xs text-gray-400">Showing {filtered.length} of {mockRefunds.length} refunds</span></div>
          </div>
        </div>

        {/* Detail panel */}
        {selected && (
          <div className="w-80 shrink-0">
            <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden sticky top-6">
              <div className="px-5 py-3.5 border-b border-gray-100 flex items-center justify-between">
                <h3 className="text-sm font-bold text-gray-800">Refund Review</h3>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-600">✕</button>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-bold text-gray-800">{selected.client}</p>
                    <p className="text-xs text-gray-400">{selected.project}</p>
                  </div>
                  <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${refundStatusStyle[selected.status]}`}>{selected.status}</span>
                </div>

                <div className="p-3 bg-orange-50 rounded-xl border border-orange-100 text-center">
                  <p className="text-xs text-gray-500 mb-0.5">Refund Requested</p>
                  <p className="text-2xl font-black text-orange-500">₹{selected.amount.toLocaleString()}</p>
                  {selected.escrowAvailable > 0 && (
                    <p className="text-xs text-gray-400 mt-0.5">₹{selected.escrowAvailable.toLocaleString()} in escrow</p>
                  )}
                </div>

                <div className="p-3 bg-blue-50 rounded-xl border border-blue-100">
                  <p className="text-xs font-bold text-blue-800 mb-1">◎ AI Recommendation</p>
                  <p className={`text-xs font-semibold ${selected.aiRecommendation.includes("Reject")?"text-red-600":selected.aiRecommendation.includes("Partial")?"text-yellow-700":"text-green-700"}`}>
                    {selected.aiRecommendation}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-semibold text-gray-500 mb-1">Client's Reason</p>
                  <p className="text-xs text-gray-700 leading-relaxed bg-gray-50 rounded-lg p-2.5 border border-gray-100">{selected.reason}</p>
                </div>

                {(selected.status === "Pending" || selected.status === "Under Review") && (
                  <div className="space-y-2">
                    <ActionBtn label="✓ Approve Full Refund"    variant="primary" size="md" />
                    <ActionBtn label="≈ Approve Partial Refund" size="md" />
                    <ActionBtn label="✕ Reject Refund"          variant="danger"  size="md" />
                  </div>
                )}

                {selected.disputeId && (
                  <ActionBtn label={`View Dispute ${selected.disputeId}`} variant="default" size="md"
                    onClick={() => navigate("/admin/disputes")} />
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

// ─── PAGE 5: /admin/commission ────────────────────────────────────────────────
export function AdminCommission() {
  const maxBar = Math.max(...mockCommission.monthly.map(m => m.amount));

  return (
    <div className="p-6">
      <PageHeader
        title="Platform Commission"
        subtitle="Weblance earnings — 6% commission on all completed transactions"
        actions={
          <div className="flex gap-2">
            <ActionBtn label="⬇ Export Report" style={btnNavy} />
            <ActionBtn label="Commission Rules →" variant="primary" size="md" style={btnOutline} />
          </div>
        }
      />

      {/* Top Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <StatCard label="Lifetime Earnings"  value={`₹${(mockCommission.totalLifetime/1000).toFixed(0)}k`} color="green" border="green" bg="green"  />
        <StatCard label="This Month"         value={`₹${(mockCommission.thisMonth/1000).toFixed(1)}k`}     sub="Mar 2026"  color="green" border="green" bg="green" />
        <StatCard label="Last Month"         value={`₹${(mockCommission.lastMonth/1000).toFixed(0)}k`}     sub="Feb 2026"  color="blue" border="blue" bg="blue"   />
        <StatCard label="Commission Rate"    value={`${mockCommission.rate}%`}                              sub="Fixed rate" color="gray" border="gray" bg="gray" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Chart */}
        <div className="lg:col-span-2 space-y-5">
          <SectionCard title="Monthly Commission Trend">
            <div className="flex items-end gap-3 h-40 px-2">
              {mockCommission.monthly.map((m, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5">
                  <p className="text-xs font-bold text-green-600">₹{(m.amount/1000).toFixed(0)}k</p>
                  <div className="w-full bg-gray-100 rounded-t-lg overflow-hidden flex items-end" style={{ height: "100px" }}>
                    <div
                      className={`w-full rounded-t-lg transition-all ${i === mockCommission.monthly.length - 1 ? "bg-green-500" : "bg-green-300"}`}
                      style={{ height: `${(m.amount / maxBar) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-gray-400 text-center">{m.month.split(" ")[0]}</p>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
              <div>
                <p className="text-xs text-gray-400">Total this year</p>
                <p className="text-lg font-bold text-green-600">₹{mockCommission.thisYear.toLocaleString()}</p>
              </div>
              <div className="text-right">
                <p className="text-xs text-gray-400">MoM growth</p>
                <p className="text-lg font-bold text-gray-800">
                  {mockCommission.lastMonth > 0
                    ? `${(((mockCommission.thisMonth - mockCommission.lastMonth) / mockCommission.lastMonth) * 100).toFixed(0) > 0 ? "+" : ""}${(((mockCommission.thisMonth - mockCommission.lastMonth) / mockCommission.lastMonth) * 100).toFixed(0)}%`
                    : "—"}
                </p>
              </div>
            </div>
          </SectionCard>

          <SectionCard title="Commission by Project">
            <div className="space-y-2">
              {mockCommission.byProject.map((p, i) => (
                <div key={i} className="flex items-center gap-4 py-2.5 border-b border-gray-50 last:border-0">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-gray-800 truncate">{p.project}</p>
                    <p className="text-xs text-gray-400">{p.client} · {p.date}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${p.status==="Collected"?"text-green-600":p.status==="Frozen"?"text-red-500":"text-orange-500"}`}>
                      ₹{p.amount.toLocaleString()}
                    </p>
                    <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                      p.status==="Collected" ? "bg-green-50 text-green-700 border border-green-200" :
                      p.status==="Frozen"    ? "bg-red-50 text-red-600 border border-red-200" :
                      "bg-orange-50 text-orange-600 border border-orange-200"
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between">
              <span className="text-xs text-gray-400">Collected</span>
              <span className="text-sm font-bold text-green-600">
                ₹{mockCommission.byProject.filter(p=>p.status==="Collected").reduce((s,p)=>s+p.amount,0).toLocaleString()}
              </span>
            </div>
          </SectionCard>
        </div>

        {/* Summary */}
        <div className="space-y-5">
          <SectionCard title="Revenue Summary">
            {[
              { label:"Collected (all time)", value:`₹${mockCommission.byProject.filter(p=>p.status==="Collected").reduce((s,p)=>s+p.amount,0).toLocaleString()}`, color:"text-green-600" },
              { label:"Pending collection",   value:`₹${mockCommission.byProject.filter(p=>p.status==="Pending").reduce((s,p)=>s+p.amount,0).toLocaleString()}`,   color:"text-orange-500" },
              { label:"Frozen (disputed)",    value:`₹${mockCommission.byProject.filter(p=>p.status==="Frozen").reduce((s,p)=>s+p.amount,0).toLocaleString()}`,    color:"text-red-500"    },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2.5 border-b border-gray-50 last:border-0">
                <span className="text-xs text-gray-400">{s.label}</span>
                <span className={`text-sm font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </SectionCard>

          <SectionCard title="Commission Rules">
            <div className="space-y-3">
              {[
                { plan:"All Plans",     rate:"6%",  desc:"Standard commission rate" },
                { plan:"Elite++",       rate:"4%",  desc:"Top freelancer benefit"   },
                { plan:"Enterprise",    rate:"5%",  desc:"Large volume clients"      },
              ].map(r => (
                <div key={r.plan} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-100">
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{r.plan}</p>
                    <p className="text-xs text-gray-400">{r.desc}</p>
                  </div>
                  <span className="text-lg font-black text-green-600">{r.rate}</span>
                </div>
              ))}
            </div>
            <div className="mt-3">
              <ActionBtn label="Edit Commission Rules" size="md" />
            </div>
          </SectionCard>
        </div>
      </div>
    </div>
  );
}