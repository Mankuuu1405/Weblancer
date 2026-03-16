// import React from "react";
// import { BsCurrencyDollar } from "react-icons/bs";

// const escrowData = [
//   { id: 1, project: "Food Delivery App", client: "John D.",    provider: "TechVision Agency", total: 42000, released: 8400, held: 33600, status: "ACTIVE"   },
//   { id: 2, project: "Brand Identity",    client: "StartupX",   provider: "Sara M.",           total: 3500,  released: 0,    held: 3500,  status: "DISPUTED" },
//   { id: 3, project: "API Integration",   client: "DataCo",     provider: "Dev Mike",          total: 8000,  released: 4000, held: 4000,  status: "ACTIVE"   },
//   { id: 4, project: "E-commerce Site",   client: "FashionHub", provider: "CodeCraft",         total: 28000, released: 0,    held: 28000, status: "DISPUTED" },
// ];

// const fmt = (n) => `$${n.toLocaleString()}`;

// const Payments = () => {
//   const totalVolume = escrowData.reduce((s, e) => s + e.total, 0);
//   const inEscrow    = escrowData.reduce((s, e) => s + e.held, 0);
//   const released    = escrowData.reduce((s, e) => s + e.released, 0);
//   const disputed    = escrowData.filter((e) => e.status === "DISPUTED").reduce((s, e) => s + e.held, 0);

//   const stats = [
//     { num: fmt(totalVolume), label: "Total Platform Volume", color: "text-gray-900"   },
//     { num: fmt(inEscrow),    label: "In Escrow",             color: "text-amber-400"  },
//     { num: fmt(released),    label: "Released",              color: "text-emerald-500"},
//     { num: fmt(disputed),    label: "Disputed",              color: "text-red-500"    },
//   ];

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Stat Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {stats.map((s) => (
//           <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-7 text-center shadow-sm hover:shadow-md transition-shadow">
//             <div className={`text-2xl sm:text-3xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
//             <div className="text-xs text-gray-500 font-medium">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Escrow Table */}
//       <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
//         <div className="flex items-center gap-2.5 mb-6">
//           <BsCurrencyDollar className="text-blue-500 text-2xl" />
//           <span className="text-lg font-bold text-gray-900">Escrow Accounts</span>
//         </div>

//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 {["Project", "Client → Provider", "Total", "Released", "Held", "Status", "Actions"].map((h) => (
//                   <th key={h} className="px-3.5 py-2.5 text-left text-xs text-gray-400 font-medium border-b border-gray-100 whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {escrowData.map((e) => (
//                 <tr key={e.id} className="hover:bg-gray-50">
//                   <td className="px-3.5 py-4 text-sm font-bold text-gray-900 border-b border-gray-100 whitespace-nowrap">{e.project}</td>
//                   <td className="px-3.5 py-4 text-sm text-gray-500 border-b border-gray-100 whitespace-nowrap">{e.client} → {e.provider}</td>
//                   <td className="px-3.5 py-4 text-sm font-semibold text-gray-900 border-b border-gray-100">{fmt(e.total)}</td>
//                   <td className="px-3.5 py-4 text-sm font-semibold text-emerald-500 border-b border-gray-100">{fmt(e.released)}</td>
//                   <td className="px-3.5 py-4 text-sm font-semibold text-amber-400 border-b border-gray-100">{fmt(e.held)}</td>
//                   <td className="px-3.5 py-4 border-b border-gray-100">
//                     <span className={`inline-block px-3.5 py-1 rounded-lg text-xs font-bold tracking-wide
//                       ${e.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
//                       {e.status}
//                     </span>
//                   </td>
//                   <td className="px-3.5 py-4 border-b border-gray-100">
//                     <div className="flex items-center gap-3">
//                       <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none">
//                         View
//                       </button>
//                       {e.status === "DISPUTED" && (
//                         <button className="text-sm font-semibold text-amber-500 hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none">
//                           Resolve
//                         </button>
//                       )}
//                     </div>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       </div>

//     </div>
//   );
// };

// export default Payments;





import React from "react";
import { BsCurrencyDollar } from "react-icons/bs";

const WBL_CSS = `
  .wbl-btn { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff !important; border: none; cursor: pointer; }
  .wbl-btn:hover { opacity: 0.88; }
  .wbl-active { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; color: #fff !important; border-color: transparent !important; }
  .wbl-badge { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
  .wbl-unread { border-left-color: #1B72C0 !important; }
  .wbl-tab { border-bottom-color: #1B72C0 !important; color: #0D2855 !important; font-weight: 700 !important; }
`;


const escrowData = [
  { id: 1, project: "Food Delivery App", client: "John D.",    provider: "TechVision Agency", total: 42000, released: 8400, held: 33600, status: "ACTIVE"   },
  { id: 2, project: "Brand Identity",    client: "StartupX",   provider: "Sara M.",           total: 3500,  released: 0,    held: 3500,  status: "DISPUTED" },
  { id: 3, project: "API Integration",   client: "DataCo",     provider: "Dev Mike",          total: 8000,  released: 4000, held: 4000,  status: "ACTIVE"   },
  { id: 4, project: "E-commerce Site",   client: "FashionHub", provider: "CodeCraft",         total: 28000, released: 0,    held: 28000, status: "DISPUTED" },
];

const fmt = (n) => `$${n.toLocaleString()}`;

const Payments = () => {
  const totalVolume = escrowData.reduce((s, e) => s + e.total, 0);
  const inEscrow    = escrowData.reduce((s, e) => s + e.held, 0);
  const released    = escrowData.reduce((s, e) => s + e.released, 0);
  const disputed    = escrowData.filter((e) => e.status === "DISPUTED").reduce((s, e) => s + e.held, 0);

  const stats = [
    { num: fmt(totalVolume), label: "Total Platform Volume", color: "text-gray-900"   },
    { num: fmt(inEscrow),    label: "In Escrow",             color: "text-amber-400"  },
    { num: fmt(released),    label: "Released",              color: "text-emerald-500"},
    { num: fmt(disputed),    label: "Disputed",              color: "text-red-500"    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <style>{WBL_CSS}</style>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stats.map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-7 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-2xl sm:text-3xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
            <div className="text-xs text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Escrow Table */}
      <div className="bg-white border border-gray-200 rounded-2xl px-5 sm:px-7 py-6 shadow-sm">
        <div className="flex items-center gap-2.5 mb-6">
          <BsCurrencyDollar className="text-blue-500 text-2xl" />
          <span className="text-lg font-bold text-gray-900">Escrow Accounts</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["Project", "Client → Provider", "Total", "Released", "Held", "Status", "Actions"].map((h) => (
                  <th key={h} className="px-3.5 py-2.5 text-left text-xs text-gray-400 font-medium border-b border-gray-100 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {escrowData.map((e) => (
                <tr key={e.id} className="hover:bg-gray-50">
                  <td className="px-3.5 py-4 text-sm font-bold text-gray-900 border-b border-gray-100 whitespace-nowrap">{e.project}</td>
                  <td className="px-3.5 py-4 text-sm text-gray-500 border-b border-gray-100 whitespace-nowrap">{e.client} → {e.provider}</td>
                  <td className="px-3.5 py-4 text-sm font-semibold text-gray-900 border-b border-gray-100">{fmt(e.total)}</td>
                  <td className="px-3.5 py-4 text-sm font-semibold text-emerald-500 border-b border-gray-100">{fmt(e.released)}</td>
                  <td className="px-3.5 py-4 text-sm font-semibold text-amber-400 border-b border-gray-100">{fmt(e.held)}</td>
                  <td className="px-3.5 py-4 border-b border-gray-100">
                    <span className={`inline-block px-3.5 py-1 rounded-lg text-xs font-bold tracking-wide
                      ${e.status === "ACTIVE" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-600"}`}>
                      {e.status}
                    </span>
                  </td>
                  <td className="px-3.5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-3">
                      <button className="text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none">
                        View
                      </button>
                      {e.status === "DISPUTED" && (
                        <button className="text-sm font-semibold text-amber-500 hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none">
                          Resolve
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};

export default Payments;