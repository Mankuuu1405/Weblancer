// import { useState } from "react";
// import {
//   StatCard, Avatar, SearchBar, FilterSelect,
//   ActionBtn, PageHeader, Table, SectionCard
// } from "./AdminComponents";

// /* ── Freelancer Contracts theme tokens ───────────────────────
//    GREEN:  #A8E063 (light) → #6EC030 (mid) → #2E7D1F (deep)
//    NAVY:   #4A6FA5 (light) → #1A2B5E (mid) → #0F1A3B (deep)
//    ──────────────────────────────────────────────────────────── */
// const G = {
//   greenLight:  "#A8E063",
//   green:       "#6EC030",
//   greenDeep:   "#2E7D1F",
//   greenBg:     "#f1fce8",
//   greenBorder: "#d4edbb",

//   navyLight:   "#4A6FA5",
//   navy:        "#1A2B5E",
//   navyDeep:    "#0F1A3B",
//   navyBg:      "#e8edf7",
//   navyBorder:  "#b8c6e0",

//   gradGreen: "linear-gradient(135deg, #A8E063 0%, #2E7D1F 100%)",
//   gradNavy:  "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",

//   text:        "#1C1C1C",
//   sub:         "#4b5563",
//   muted:       "#9ca3af",
//   border:      "#e5e7eb",
//   bg:          "#f9fafb",
//   white:       "#ffffff",

//   amber:       "#f59e0b",
//   amberBg:     "#fffbeb",
//   amberBorder: "#fde68a",
//   amberText:   "#92400e",
//   red:         "#ef4444",
//   redBg:       "#fef2f2",
//   redBorder:   "#fecaca",
//   redText:     "#dc2626",
//   blue:        "#3b82f6",
//   blueBg:      "#eff6ff",
//   blueBorder:  "#bfdbfe",
//   blueText:    "#1d4ed8",
// };
// const FONT = "'Poppins', sans-serif";
// const mockPayments = [
//   { id: "PAY-001", type: "Escrow Deposit", project: "Food Delivery App", from: "ByteEats Co.", to: "Escrow", amount: 240000, status: "Completed", method: "UPI", date: "Jan 10, 2026", commission: 0, flagged: false },
//   { id: "PAY-002", type: "Milestone Release", project: "Food Delivery App", from: "Escrow", to: "TechNova Solutions", amount: 120000, status: "Completed", method: "Bank Transfer", date: "Feb 15, 2026", commission: 7200, flagged: false },
//   { id: "PAY-003", type: "Escrow Deposit", project: "Patient Appointment App", from: "HealthFirst Clinic", to: "Escrow", amount: 160000, status: "Completed", method: "Net Banking", date: "Feb 3, 2026", commission: 0, flagged: false },
//   { id: "PAY-004", type: "Milestone Release", project: "E-Commerce Revamp", from: "Escrow", to: "Rahul Sharma", amount: 46250, status: "Pending", method: "UPI", date: "Mar 12, 2026", commission: 2775, flagged: true },
//   { id: "PAY-005", type: "Refund", project: "Brand Identity Design", from: "Escrow", to: "Meera Joshi", amount: 9000, status: "Completed", method: "UPI", date: "Mar 5, 2026", commission: 0, flagged: false },
//   { id: "PAY-006", type: "Withdrawal", project: "—", from: "Arjun Dev Wallet", to: "Bank Account", amount: 85000, status: "Processing", method: "NEFT", date: "Mar 13, 2026", commission: 0, flagged: false },
//   { id: "PAY-007", type: "Escrow Deposit", project: "Mobile Banking App", from: "Vikram Singh", to: "Escrow", amount: 140000, status: "Frozen", method: "Net Banking", date: "Nov 15, 2025", commission: 0, flagged: true },
//   { id: "PAY-008", type: "Commission", project: "HR Automation Dashboard", from: "Escrow", to: "Weblance Platform", amount: 39000, status: "Completed", method: "Internal", date: "Feb 28, 2026", commission: 0, flagged: false },
// ];

// const typeStyle = {
//   "Escrow Deposit": "bg-blue-50 text-blue-700 border border-blue-200",
//   "Milestone Release": "bg-green-50 text-green-700 border border-green-200",
//   "Refund": "bg-orange-50 text-orange-700 border border-orange-200",
//   "Withdrawal": "bg-purple-50 text-purple-700 border border-purple-200",
//   "Commission": "bg-gray-50 text-gray-600 border border-gray-200",
// };

// const statusStyle = {
//   Completed: "bg-green-50 text-green-700 border border-green-200",
//   Pending: "bg-yellow-50 text-yellow-700 border border-yellow-200",
//   Processing: "bg-blue-50 text-blue-700 border border-blue-200",
//   Frozen: "bg-red-50 text-red-600 border border-red-200",
//   Failed: "bg-red-50 text-red-600 border border-red-200",
// };

// export default function AdminPayments() {
//   const [search, setSearch] = useState("");
//   const [typeFilter, setTypeFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [activeTab, setActiveTab] = useState("all");

//   const filtered = mockPayments.filter((p) => {
//     const q = search.toLowerCase();
//     const matchSearch = p.project.toLowerCase().includes(q) || p.from.toLowerCase().includes(q) || p.to.toLowerCase().includes(q) || p.id.toLowerCase().includes(q);
//     const matchType = !typeFilter || p.type === typeFilter;
//     const matchStatus = !statusFilter || p.status === statusFilter;
//     const matchTab = activeTab === "all" || (activeTab === "flagged" && p.flagged) || (activeTab === "frozen" && p.status === "Frozen") || (activeTab === "pending" && (p.status === "Pending" || p.status === "Processing"));
//     return matchSearch && matchType && matchStatus && matchTab;
//   });

//   const totalEscrow = mockPayments.filter(p => p.type === "Escrow Deposit" && p.status !== "Frozen").reduce((s, p) => s + p.amount, 0);
//   const totalCommission = mockPayments.filter(p => p.type === "Commission").reduce((s, p) => s + p.amount, 0);
//   const totalPending = mockPayments.filter(p => p.status === "Pending" || p.status === "Processing").reduce((s, p) => s + p.amount, 0);
//   const totalFrozen = mockPayments.filter(p => p.status === "Frozen").reduce((s, p) => s + p.amount, 0);

//    const btnNavy = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.gradNavy, color: G.white,
//   border: "none", borderRadius: 100,
//   padding: "8px 18px", cursor: "pointer",
//   boxShadow: "0 3px 12px rgba(15,26,59,0.25)",
//   whiteSpace: "nowrap",
// };

// const btnOutline = {
//   display: "inline-flex", alignItems: "center", gap: 6,
//   fontSize: 12, fontWeight: 700, fontFamily: FONT,
//   background: G.greenBg, color: G.greenDeep,
//   border: `1px solid ${G.greenBorder}`,
//   borderRadius: 100, padding: "8px 18px", cursor: "pointer",
//   whiteSpace: "nowrap",
// };

// const btnWarning = {
//   ...btnOutline,
//   background: G.amberBg, color: G.amberText, border: `1px solid ${G.amberBorder}`,
// };
//   return (
//     <div className="p-6">
//       <PageHeader
//         title="Payments"
//         subtitle="Full escrow ledger — every rupee tracked, every move logged"
//         actions={<ActionBtn label="⬇ Export Ledger" style={btnNavy}/>}
//       />

//       {/* Stats */}
//       <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
//         <StatCard label="Total Escrow Active" value={`₹${(totalEscrow / 100000).toFixed(1)}L`} color="blue" bg="blue" border="blue"/>
//         <StatCard label="Platform Commission" value={`₹${(totalCommission / 1000).toFixed(0)}k`} sub="All time" color="green " bg="green" border="green" />
//         <StatCard label="Pending / Processing" value={`₹${(totalPending / 1000).toFixed(0)}k`} color="orange" border="orange" bg="orange"/>
//         <StatCard label="Frozen (Disputed)" value={`₹${(totalFrozen / 1000).toFixed(0)}k`} color="red" border="red" bg="red" />
//       </div>

//       {/* Tabs */}
//       <div className="flex gap-1 border-b border-gray-100 mb-4">
//         {[
//           { key: "all", label: "All Transactions" },
//           { key: "pending", label: `Pending / Processing (${mockPayments.filter(p => p.status === "Pending" || p.status === "Processing").length})` },
//           { key: "frozen", label: `Frozen (${mockPayments.filter(p => p.status === "Frozen").length})` },
//           { key: "flagged", label: `Flagged (${mockPayments.filter(p => p.flagged).length})` },
//         ].map((tab) => (
//           <button key={tab.key} onClick={() => setActiveTab(tab.key)}
//             className={`px-4 py-2 text-sm font-medium whitespace-nowrap transition-colors ${activeTab === tab.key ? "text-green-600 border-b-2 border-green-500 -mb-px" : "text-gray-500 hover:text-gray-700"}`}>
//             {tab.label}
//           </button>
//         ))}
//       </div>

//       <div className="bg-white rounded-xl border border-gray-100 shadow-lg overflow-hidden p-3">
//         <div className="p-4 border-b border-gray-50 flex flex-wrap gap-3 items-center justify-between rounded-2xl">
//           <SearchBar value={search} onChange={setSearch} placeholder="Search ID, project, name...">
//             <FilterSelect value={typeFilter} onChange={setTypeFilter} label="All Types"
//               options={[
//                 { value: "Escrow Deposit", label: "Escrow Deposit" },
//                 { value: "Milestone Release", label: "Milestone Release" },
//                 { value: "Refund", label: "Refund" },
//                 { value: "Withdrawal", label: "Withdrawal" },
//                 { value: "Commission", label: "Commission" },
//               ]} />
//             <FilterSelect value={statusFilter} onChange={setStatusFilter} label="All Status"
//               options={[
//                 { value: "Completed", label: "Completed" },
//                 { value: "Pending", label: "Pending" },
//                 { value: "Processing", label: "Processing" },
//                 { value: "Frozen", label: "Frozen" },
//               ]} />
//           </SearchBar>
//           <span className="text-xs text-gray-400">{filtered.length} results</span>
//         </div>

//         <Table headers={["Txn ID", "Type", "Project", "From", "To", "Amount", "Commission", "Status", "Method", "Date", "Actions"]}>
//           {filtered.map((p) => (
//             <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
//               <td className="py-3 pr-4">
//                 <div className="flex items-center gap-1.5">
//                   <span className="text-xs font-mono font-semibold text-gray-500">{p.id}</span>
//                   {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
//                 </div>
//               </td>
//               <td className="py-3 pr-4">
//                 <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeStyle[p.type]}`}>{p.type}</span>
//               </td>
//               <td className="py-3 pr-4 text-xs text-gray-600 max-w-[120px] truncate">{p.project}</td>
//               <td className="py-3 pr-4 text-xs text-gray-600">{p.from}</td>
//               <td className="py-3 pr-4 text-xs text-gray-600">{p.to}</td>
//               <td className="py-3 pr-4">
//                 <span className={`text-sm font-bold ${p.type === "Refund" ? "text-orange-500" : p.type === "Commission" ? "text-green-600" : "text-gray-800"}`}>
//                   ₹{p.amount.toLocaleString()}
//                 </span>
//               </td>
//               <td className="py-3 pr-4 text-xs text-gray-500">
//                 {p.commission > 0 ? `₹${p.commission.toLocaleString()}` : "—"}
//               </td>
//               <td className="py-3 pr-4">
//                 <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
//               </td>
//               <td className="py-3 pr-4 text-xs text-gray-500">{p.method}</td>
//               <td className="py-3 pr-4 text-xs text-gray-500 whitespace-nowrap">{p.date}</td>
//               <td className="py-3">
//                 <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
//                   {p.status === "Frozen" && <ActionBtn label="Unfreeze" variant="warning" style={btnOutline}/>}
//                   {p.status === "Pending" && <ActionBtn label="Force Release" variant="primary" style={btnWarning}/>}
//                   <ActionBtn label="⋯" />
//                 </div>
//               </td>
//             </tr>
//           ))}
//         </Table>

//         {filtered.length === 0 && (
//           <div className="py-16 text-center"><p className="text-gray-400 text-sm">No transactions found</p></div>
//         )}
//         <div className="px-4 py-3 border-t border-gray-100 flex items-center justify-between">
//           <span className="text-xs text-gray-400">Showing {filtered.length} of {mockPayments.length} transactions</span>
//           <span className="text-xs font-semibold text-gray-600">
//             Total shown: ₹{filtered.reduce((s, p) => s + p.amount, 0).toLocaleString()}
//           </span>
//         </div>
//       </div>
//     </div>
//   );
// }








import { useState } from "react";
import {
  StatCard, Avatar, SearchBar, FilterSelect,
  ActionBtn, PageHeader, Table, SectionCard
} from "./AdminComponents";

const G = {
  green:       "#6EC030",
  greenDeep:   "#2E7D1F",
  greenBg:     "#f1fce8",
  greenBorder: "#d4edbb",
  navy:        "#1A2B5E",
  navyDeep:    "#0F1A3B",
  gradNavy:    "linear-gradient(135deg, #4A6FA5 0%, #0F1A3B 100%)",
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
};
const FONT = "'Poppins', sans-serif";

const mockPayments = [
  { id:"PAY-001", type:"Escrow Deposit",    project:"Food Delivery App",         from:"ByteEats Co.",          to:"Escrow",              amount:240000, status:"Completed",  method:"UPI",          date:"Jan 10, 2026", commission:0,    flagged:false },
  { id:"PAY-002", type:"Milestone Release", project:"Food Delivery App",         from:"Escrow",                to:"TechNova Solutions",  amount:120000, status:"Completed",  method:"Bank Transfer", date:"Feb 15, 2026", commission:7200, flagged:false },
  { id:"PAY-003", type:"Escrow Deposit",    project:"Patient Appointment App",   from:"HealthFirst Clinic",    to:"Escrow",              amount:160000, status:"Completed",  method:"Net Banking",   date:"Feb 3, 2026",  commission:0,    flagged:false },
  { id:"PAY-004", type:"Milestone Release", project:"E-Commerce Revamp",         from:"Escrow",                to:"Rahul Sharma",        amount:46250,  status:"Pending",    method:"UPI",           date:"Mar 12, 2026", commission:2775, flagged:true  },
  { id:"PAY-005", type:"Refund",            project:"Brand Identity Design",     from:"Escrow",                to:"Meera Joshi",         amount:9000,   status:"Completed",  method:"UPI",           date:"Mar 5, 2026",  commission:0,    flagged:false },
  { id:"PAY-006", type:"Withdrawal",        project:"—",                         from:"Arjun Dev Wallet",      to:"Bank Account",        amount:85000,  status:"Processing", method:"NEFT",          date:"Mar 13, 2026", commission:0,    flagged:false },
  { id:"PAY-007", type:"Escrow Deposit",    project:"Mobile Banking App",        from:"Vikram Singh",          to:"Escrow",              amount:140000, status:"Frozen",     method:"Net Banking",   date:"Nov 15, 2025", commission:0,    flagged:true  },
  { id:"PAY-008", type:"Commission",        project:"HR Automation Dashboard",   from:"Escrow",                to:"Weblance Platform",   amount:39000,  status:"Completed",  method:"Internal",      date:"Feb 28, 2026", commission:0,    flagged:false },
];

const typeStyle = {
  "Escrow Deposit":    "bg-blue-50 text-blue-700 border border-blue-200",
  "Milestone Release": "bg-green-50 text-green-700 border border-green-200",
  "Refund":            "bg-orange-50 text-orange-700 border border-orange-200",
  "Withdrawal":        "bg-purple-50 text-purple-700 border border-purple-200",
  "Commission":        "bg-gray-50 text-gray-600 border border-gray-200",
};
const statusStyle = {
  Completed:  "bg-green-50 text-green-700 border border-green-200",
  Pending:    "bg-yellow-50 text-yellow-700 border border-yellow-200",
  Processing: "bg-blue-50 text-blue-700 border border-blue-200",
  Frozen:     "bg-red-50 text-red-600 border border-red-200",
  Failed:     "bg-red-50 text-red-600 border border-red-200",
};

const btnNavy = { display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.gradNavy, color:G.white, border:"none", borderRadius:100, padding:"7px 14px", cursor:"pointer", boxShadow:"0 3px 12px rgba(15,26,59,0.25)", whiteSpace:"nowrap" };
const btnOutline = { display:"inline-flex", alignItems:"center", gap:6, fontSize:11, fontWeight:700, fontFamily:FONT, background:G.greenBg, color:G.greenDeep, border:`1px solid ${G.greenBorder}`, borderRadius:100, padding:"7px 14px", cursor:"pointer", whiteSpace:"nowrap" };
const btnWarning = { ...btnOutline, background:G.amberBg, color:G.amberText, border:`1px solid ${G.amberBorder}` };

export default function AdminPayments() {
  const [search,       setSearch]       = useState("");
  const [typeFilter,   setTypeFilter]   = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [activeTab,    setActiveTab]    = useState("all");

  const filtered = mockPayments.filter(p => {
    const q = search.toLowerCase();
    const matchSearch = p.project.toLowerCase().includes(q)||p.from.toLowerCase().includes(q)||p.to.toLowerCase().includes(q)||p.id.toLowerCase().includes(q);
    const matchType   = !typeFilter   || p.type   === typeFilter;
    const matchStatus = !statusFilter || p.status === statusFilter;
    const matchTab    = activeTab==="all"     ||
                        (activeTab==="flagged" && p.flagged) ||
                        (activeTab==="frozen"  && p.status==="Frozen") ||
                        (activeTab==="pending" && (p.status==="Pending"||p.status==="Processing"));
    return matchSearch && matchType && matchStatus && matchTab;
  });

  const totalEscrow      = mockPayments.filter(p=>p.type==="Escrow Deposit"&&p.status!=="Frozen").reduce((s,p)=>s+p.amount,0);
  const totalCommission  = mockPayments.filter(p=>p.type==="Commission").reduce((s,p)=>s+p.amount,0);
  const totalPending     = mockPayments.filter(p=>p.status==="Pending"||p.status==="Processing").reduce((s,p)=>s+p.amount,0);
  const totalFrozen      = mockPayments.filter(p=>p.status==="Frozen").reduce((s,p)=>s+p.amount,0);

  const TABS = [
    { key:"all",     label:"All" },
    { key:"pending", label:`Pending (${mockPayments.filter(p=>p.status==="Pending"||p.status==="Processing").length})` },
    { key:"frozen",  label:`Frozen (${mockPayments.filter(p=>p.status==="Frozen").length})` },
    { key:"flagged", label:`Flagged (${mockPayments.filter(p=>p.flagged).length})` },
  ];

  // Mobile payment card
  const MobileCard = ({ p }) => (
    <div style={{ background:G.white, border:`1px solid ${G.greenBorder}`, borderRadius:14, padding:14 }}>
      <div style={{ display:"flex", alignItems:"flex-start", justifyContent:"space-between", gap:8, marginBottom:10 }}>
        <div>
          <div style={{ display:"flex", alignItems:"center", gap:6, marginBottom:4 }}>
            <span style={{ fontSize:10, fontFamily:"monospace", fontWeight:600, color:G.muted }}>{p.id}</span>
            {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
          </div>
          <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${typeStyle[p.type]}`}>{p.type}</span>
        </div>
        <div style={{ textAlign:"right" }}>
          <p style={{ fontSize:15, fontWeight:800, color:p.type==="Refund"?"#f97316":p.type==="Commission"?G.greenDeep:G.text, margin:0 }}>₹{p.amount.toLocaleString()}</p>
          <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span>
        </div>
      </div>
      <div style={{ fontSize:11, color:G.muted, marginBottom:8, lineHeight:1.6 }}>
        <span style={{ color:G.text, fontWeight:600 }}>{p.from}</span> → <span style={{ color:G.text, fontWeight:600 }}>{p.to}</span>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", flexWrap:"wrap", gap:6 }}>
        <div style={{ display:"flex", gap:12 }}>
          <span style={{ fontSize:10, color:G.muted }}>{p.method}</span>
          <span style={{ fontSize:10, color:G.muted }}>{p.date}</span>
          {p.commission > 0 && <span style={{ fontSize:10, color:G.greenDeep, fontWeight:600 }}>Com: ₹{p.commission.toLocaleString()}</span>}
        </div>
        <div style={{ display:"flex", gap:6 }}>
          {p.status==="Frozen"  && <button style={{ ...btnWarning, padding:"4px 10px", fontSize:10 }}>Unfreeze</button>}
          {p.status==="Pending" && <button style={{ ...btnNavy,    padding:"4px 10px", fontSize:10 }}>Release</button>}
        </div>
      </div>
    </div>
  );

  return (
    <div className="p-3 sm:p-5 lg:p-6">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap');
        * { font-family:'Poppins',sans-serif; box-sizing:border-box; }

        .pay-table-wrap { display:none; overflow-x:auto; }
        .pay-cards-wrap { display:flex; flex-direction:column; gap:10px; }
        @media (min-width:900px) {
          .pay-table-wrap { display:block; }
          .pay-cards-wrap { display:none; }
        }

        .pay-tabs { display:flex; overflow-x:auto; -webkit-overflow-scrolling:touch; }
        .pay-tabs::-webkit-scrollbar { display:none; }
      `}</style>

      <PageHeader
        title="Payments"
        subtitle="Full escrow ledger — every rupee tracked"
        actions={<ActionBtn label="⬇ Export" style={btnNavy} />}
      />

      {/* Stats: 2-col mobile, 4-col tablet+ */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
        <StatCard label="Escrow Active"  value={`₹${(totalEscrow/100000).toFixed(1)}L`}      color="blue"   bg="blue"   border="blue"   />
        <StatCard label="Commission"     value={`₹${(totalCommission/1000).toFixed(0)}k`}     color="green"  bg="green"  border="green"  />
        <StatCard label="Pending"        value={`₹${(totalPending/1000).toFixed(0)}k`}        color="orange" bg="orange" border="orange" />
        <StatCard label="Frozen"         value={`₹${(totalFrozen/1000).toFixed(0)}k`}         color="red"    bg="red"    border="red"    />
      </div>

      {/* Tabs — horizontally scrollable */}
      <div className="pay-tabs border-b border-gray-100 mb-3 sm:mb-4">
        {TABS.map(tab => (
          <button key={tab.key} onClick={() => setActiveTab(tab.key)}
            className={`px-3 sm:px-4 py-2 text-xs sm:text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeTab===tab.key?"text-green-600 border-b-2 border-green-500 -mb-px":"text-gray-500"}`}>
            {tab.label}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        {/* Filter bar */}
        <div className="p-3 sm:p-4 border-b border-gray-50">
          <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between">
            <SearchBar value={search} onChange={setSearch} placeholder="Search ID, project, name...">
              <FilterSelect value={typeFilter}   onChange={setTypeFilter}   label="Type"
                options={["Escrow Deposit","Milestone Release","Refund","Withdrawal","Commission"].map(v=>({value:v,label:v}))} />
              <FilterSelect value={statusFilter} onChange={setStatusFilter} label="Status"
                options={["Completed","Pending","Processing","Frozen"].map(v=>({value:v,label:v}))} />
            </SearchBar>
            <span className="text-[10px] sm:text-xs text-gray-400 shrink-0">{filtered.length} results</span>
          </div>
        </div>

        {/* Desktop Table */}
        <div className="pay-table-wrap">
          <Table headers={["Txn ID","Type","Project","From","To","Amount","Commission","Status","Method","Date","Actions"]}>
            {filtered.map(p => (
              <tr key={p.id} className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors group">
                <td className="py-3 pr-3">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-mono font-semibold text-gray-500">{p.id}</span>
                    {p.flagged && <span className="text-[10px] bg-red-50 text-red-500 border border-red-200 px-1.5 py-0.5 rounded-full font-semibold">⚑</span>}
                  </div>
                </td>
                <td className="py-3 pr-3"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${typeStyle[p.type]}`}>{p.type}</span></td>
                <td className="py-3 pr-3 text-xs text-gray-600 max-w-[110px] truncate">{p.project}</td>
                <td className="py-3 pr-3 text-xs text-gray-600">{p.from}</td>
                <td className="py-3 pr-3 text-xs text-gray-600">{p.to}</td>
                <td className="py-3 pr-3"><span className={`text-sm font-bold ${p.type==="Refund"?"text-orange-500":p.type==="Commission"?"text-green-600":"text-gray-800"}`}>₹{p.amount.toLocaleString()}</span></td>
                <td className="py-3 pr-3 text-xs text-gray-500">{p.commission>0?`₹${p.commission.toLocaleString()}`:"—"}</td>
                <td className="py-3 pr-3"><span className={`text-[11px] font-semibold px-2 py-0.5 rounded-full ${statusStyle[p.status]}`}>{p.status}</span></td>
                <td className="py-3 pr-3 text-xs text-gray-500">{p.method}</td>
                <td className="py-3 pr-3 text-xs text-gray-500 whitespace-nowrap">{p.date}</td>
                <td className="py-3">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity flex gap-1.5">
                    {p.status==="Frozen"  && <ActionBtn label="Unfreeze"      variant="warning" style={btnWarning} />}
                    {p.status==="Pending" && <ActionBtn label="Force Release" variant="primary" style={btnNavy}    />}
                    <ActionBtn label="⋯" />
                  </div>
                </td>
              </tr>
            ))}
          </Table>
        </div>

        {/* Mobile Cards */}
        <div className="pay-cards-wrap p-3">
          {filtered.map(p => <MobileCard key={p.id} p={p} />)}
        </div>

        {filtered.length === 0 && (
          <div className="py-12 sm:py-16 text-center"><p className="text-gray-400 text-sm">No transactions found</p></div>
        )}

        <div className="px-3 sm:px-4 py-2.5 sm:py-3 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2">
          <span className="text-[10px] sm:text-xs text-gray-400">Showing {filtered.length} of {mockPayments.length} transactions</span>
          <span className="text-[10px] sm:text-xs font-semibold text-gray-600">
            Total: ₹{filtered.reduce((s,p)=>s+p.amount,0).toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}