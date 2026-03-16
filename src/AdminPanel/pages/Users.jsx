// import React, { useState } from "react";
// import { FiSearch, FiEye } from "react-icons/fi";
// import { MdOutlineCancel, MdVerified, MdOutlineHourglassEmpty } from "react-icons/md";

// const usersData = [
//   { id: 1, name: "John D.",          email: "john@techvision.com",  role: "CLIENT",     trust: 75, status: "ACTIVE",    projects: 2, disputes: 0, kyc: "Verified" },
//   { id: 2, name: "Sara M.",          email: "sara@email.com",       role: "FREELANCER", trust: 88, status: "ACTIVE",    projects: 5, disputes: 0, kyc: "Verified" },
//   { id: 3, name: "TechVision Agency",email: "admin@techvision.io",  role: "AGENCY",     trust: 86, status: "ACTIVE",    projects: 3, disputes: 0, kyc: "Verified" },
//   { id: 4, name: "Dev Mike",         email: "mike@dev.com",         role: "FREELANCER", trust: 72, status: "ACTIVE",    projects: 4, disputes: 1, kyc: "Verified" },
//   { id: 5, name: "StartupX Corp",    email: "hello@startupx.com",   role: "CLIENT",     trust: 45, status: "PENDING",   projects: 0, disputes: 0, kyc: "Pending"  },
//   { id: 6, name: "Spam User",        email: "spam@temp.com",        role: "FREELANCER", trust: 12, status: "SUSPENDED", projects: 0, disputes: 3, kyc: "Pending"  },
// ];

// const roleBadge = {
//   CLIENT:     "bg-emerald-100 text-emerald-800",
//   FREELANCER: "bg-amber-100 text-amber-800",
//   AGENCY:     "bg-blue-100 text-blue-800",
// };

// const statusBadge = {
//   ACTIVE:    "bg-emerald-100 text-emerald-700",
//   PENDING:   "bg-amber-100 text-amber-700",
//   SUSPENDED: "bg-red-100 text-red-600",
// };

// const getTrustColor = (t) => t >= 70 ? "text-emerald-500" : t >= 40 ? "text-amber-400" : "text-red-500";

// const Users = () => {
//   const [search, setSearch]       = useState("");
//   const [roleFilter, setRoleFilter] = useState("All");

//   const filtered = usersData.filter((u) => {
//     const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
//     const matchRole   = roleFilter === "All" || u.role === roleFilter.toUpperCase();
//     return matchSearch && matchRole;
//   });

//   const total     = usersData.length;
//   const active    = usersData.filter((u) => u.status === "ACTIVE").length;
//   const pending   = usersData.filter((u) => u.kyc === "Pending").length;
//   const suspended = usersData.filter((u) => u.status === "SUSPENDED").length;

//   return (
//     <div className="flex flex-col gap-6">

//       {/* Stat Cards */}
//       <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
//         {[
//           { num: total,     label: "Total Users", color: "text-gray-900"    },
//           { num: active,    label: "Active",      color: "text-emerald-500" },
//           { num: pending,   label: "Pending KYC", color: "text-amber-400"   },
//           { num: suspended, label: "Suspended",   color: "text-red-500"     },
//         ].map((s) => (
//           <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-7 text-center shadow-sm hover:shadow-md transition-shadow">
//             <div className={`text-4xl sm:text-5xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
//             <div className="text-sm text-gray-500 font-medium">{s.label}</div>
//           </div>
//         ))}
//       </div>

//       {/* Toolbar */}
//       <div className="flex flex-col sm:flex-row gap-3">
//         {/* Search */}
//         <div className="flex items-center gap-2.5 flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-blue-400 focus-within:shadow-[0_0_0_3px_rgba(79,124,255,0.1)] transition-all">
//           <FiSearch className="text-gray-400 text-base shrink-0" />
//           <input
//             className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
//             placeholder="Search users..."
//             value={search}
//             onChange={(e) => setSearch(e.target.value)}
//           />
//         </div>
//         {/* Role Filters */}
//         <div className="flex gap-2 flex-wrap">
//           {["All", "Client", "Freelancer", "Agency"].map((f) => (
//             <button
//               key={f}
//               onClick={() => setRoleFilter(f)}
//               className={`px-4 py-2.5 border rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
//                 ${roleFilter === f
//                   ? "bg-blue-500 text-white border-blue-500"
//                   : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-500"
//                 }`}
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
//         <div className="overflow-x-auto">
//           <table className="w-full border-collapse">
//             <thead>
//               <tr>
//                 {["User", "Role", "Trust", "Status", "Projects", "KYC", "Actions"].map((h) => (
//                   <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 border-b border-gray-200 whitespace-nowrap">
//                     {h}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {filtered.map((u) => (
//                 <tr key={u.id} className="hover:bg-gray-50">
//                   <td className="px-5 py-4 border-b border-gray-100 last:border-0">
//                     <div className="text-sm font-semibold text-gray-900 mb-0.5">{u.name}</div>
//                     <div className="text-xs text-gray-400">{u.email}</div>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${roleBadge[u.role]}`}>
//                       {u.role}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     <span className={`text-sm font-bold ${getTrustColor(u.trust)}`}>{u.trust}/100</span>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     <span className={`inline-block px-3.5 py-1 rounded-lg text-xs font-bold ${statusBadge[u.status]}`}>
//                       {u.status}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     <span className="text-sm text-gray-700 flex items-center gap-1.5">
//                       {u.projects}
//                       {u.disputes > 0 && (
//                         <span className="text-xs text-amber-500 font-medium">
//                           ({u.disputes} dispute{u.disputes > 1 ? "s" : ""})
//                         </span>
//                       )}
//                     </span>
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     {u.kyc === "Verified" ? (
//                       <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
//                         <MdVerified className="text-base" /> Verified
//                       </span>
//                     ) : (
//                       <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
//                         <MdOutlineHourglassEmpty className="text-base" /> Pending
//                       </span>
//                     )}
//                   </td>
//                   <td className="px-5 py-4 border-b border-gray-100">
//                     <div className="flex items-center gap-4">
//                       <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none">
//                         <FiEye /> View
//                       </button>
//                       {u.status !== "SUSPENDED" && (
//                         <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none">
//                           <MdOutlineCancel /> Suspend
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

// export default Users;








import React, { useState } from "react";
import { FiSearch, FiEye } from "react-icons/fi";
import { MdOutlineCancel, MdVerified, MdOutlineHourglassEmpty } from "react-icons/md";

const WBL_CSS = `
  .wbl-btn { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); color: #fff !important; border: none; cursor: pointer; }
  .wbl-btn:hover { opacity: 0.88; }
  .wbl-active { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%) !important; color: #fff !important; border-color: transparent !important; }
  .wbl-badge { background: linear-gradient(135deg, #0D2855 0%, #1B72C0 100%); }
  .wbl-unread { border-left-color: #1B72C0 !important; }
  .wbl-tab { border-bottom-color: #1B72C0 !important; color: #0D2855 !important; font-weight: 700 !important; }
`;


const usersData = [
  { id: 1, name: "John D.",          email: "john@techvision.com",  role: "CLIENT",     trust: 75, status: "ACTIVE",    projects: 2, disputes: 0, kyc: "Verified" },
  { id: 2, name: "Sara M.",          email: "sara@email.com",       role: "FREELANCER", trust: 88, status: "ACTIVE",    projects: 5, disputes: 0, kyc: "Verified" },
  { id: 3, name: "TechVision Agency",email: "admin@techvision.io",  role: "AGENCY",     trust: 86, status: "ACTIVE",    projects: 3, disputes: 0, kyc: "Verified" },
  { id: 4, name: "Dev Mike",         email: "mike@dev.com",         role: "FREELANCER", trust: 72, status: "ACTIVE",    projects: 4, disputes: 1, kyc: "Verified" },
  { id: 5, name: "StartupX Corp",    email: "hello@startupx.com",   role: "CLIENT",     trust: 45, status: "PENDING",   projects: 0, disputes: 0, kyc: "Pending"  },
  { id: 6, name: "Spam User",        email: "spam@temp.com",        role: "FREELANCER", trust: 12, status: "SUSPENDED", projects: 0, disputes: 3, kyc: "Pending"  },
];

const roleBadge = {
  CLIENT:     "bg-emerald-100 text-emerald-800",
  FREELANCER: "bg-amber-100 text-amber-800",
  AGENCY:     "bg-blue-100 text-blue-800",
};

const statusBadge = {
  ACTIVE:    "bg-emerald-100 text-emerald-700",
  PENDING:   "bg-amber-100 text-amber-700",
  SUSPENDED: "bg-red-100 text-red-600",
};

const getTrustColor = (t) => t >= 70 ? "text-emerald-500" : t >= 40 ? "text-amber-400" : "text-red-500";

const Users = () => {
  const [search, setSearch]       = useState("");
  const [roleFilter, setRoleFilter] = useState("All");

  const filtered = usersData.filter((u) => {
    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) || u.email.toLowerCase().includes(search.toLowerCase());
    const matchRole   = roleFilter === "All" || u.role === roleFilter.toUpperCase();
    return matchSearch && matchRole;
  });

  const total     = usersData.length;
  const active    = usersData.filter((u) => u.status === "ACTIVE").length;
  const pending   = usersData.filter((u) => u.kyc === "Pending").length;
  const suspended = usersData.filter((u) => u.status === "SUSPENDED").length;

  return (
    <div className="flex flex-col gap-6">
      <style>{WBL_CSS}</style>

      {/* Stat Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {[
          { num: total,     label: "Total Users", color: "text-gray-900"    },
          { num: active,    label: "Active",      color: "text-emerald-500" },
          { num: pending,   label: "Pending KYC", color: "text-amber-400"   },
          { num: suspended, label: "Suspended",   color: "text-red-500"     },
        ].map((s) => (
          <div key={s.label} className="bg-white border border-gray-200 rounded-2xl px-4 py-7 text-center shadow-sm hover:shadow-md transition-shadow">
            <div className={`text-4xl sm:text-5xl font-extrabold leading-none mb-2 ${s.color}`}>{s.num}</div>
            <div className="text-sm text-gray-500 font-medium">{s.label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex flex-col sm:flex-row gap-3">
        {/* Search */}
        <div className="flex items-center gap-2.5 flex-1 bg-white border border-gray-200 rounded-xl px-4 py-2.5 focus-within:border-blue-400 focus-within:shadow-[0_0_0_3px_rgba(79,124,255,0.1)] transition-all">
          <FiSearch className="text-gray-400 text-base shrink-0" />
          <input
            className="flex-1 border-none outline-none text-sm text-gray-700 placeholder-gray-400 bg-transparent"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        {/* Role Filters */}
        <div className="flex gap-2 flex-wrap">
          {["All", "Client", "Freelancer", "Agency"].map((f) => (
            <button
              key={f}
              onClick={() => setRoleFilter(f)}
              className={`px-4 py-2.5 border rounded-xl text-sm font-medium whitespace-nowrap transition-all cursor-pointer
                ${roleFilter === f
                  ? "wbl-active"
                  : "bg-white text-gray-500 border-gray-200 hover:border-blue-400 hover:text-blue-500"
                }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr>
                {["User", "Role", "Trust", "Status", "Projects", "KYC", "Actions"].map((h) => (
                  <th key={h} className="px-5 py-3.5 text-left text-xs font-semibold text-gray-500 border-b border-gray-200 whitespace-nowrap">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((u) => (
                <tr key={u.id} className="hover:bg-gray-50">
                  <td className="px-5 py-4 border-b border-gray-100 last:border-0">
                    <div className="text-sm font-semibold text-gray-900 mb-0.5">{u.name}</div>
                    <div className="text-xs text-gray-400">{u.email}</div>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    <span className={`inline-block px-3 py-1 rounded-md text-xs font-bold ${roleBadge[u.role]}`}>
                      {u.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    <span className={`text-sm font-bold ${getTrustColor(u.trust)}`}>{u.trust}/100</span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    <span className={`inline-block px-3.5 py-1 rounded-lg text-xs font-bold ${statusBadge[u.status]}`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    <span className="text-sm text-gray-700 flex items-center gap-1.5">
                      {u.projects}
                      {u.disputes > 0 && (
                        <span className="text-xs text-amber-500 font-medium">
                          ({u.disputes} dispute{u.disputes > 1 ? "s" : ""})
                        </span>
                      )}
                    </span>
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    {u.kyc === "Verified" ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-emerald-500">
                        <MdVerified className="text-base" /> Verified
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium text-amber-400">
                        <MdOutlineHourglassEmpty className="text-base" /> Pending
                      </span>
                    )}
                  </td>
                  <td className="px-5 py-4 border-b border-gray-100">
                    <div className="flex items-center gap-4">
                      <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-gray-700 hover:text-gray-900 transition-colors cursor-pointer bg-transparent border-none">
                        <FiEye /> View
                      </button>
                      {u.status !== "SUSPENDED" && (
                        <button className="inline-flex items-center gap-1.5 text-sm font-semibold text-red-500 hover:opacity-75 transition-opacity cursor-pointer bg-transparent border-none">
                          <MdOutlineCancel /> Suspend
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

export default Users;